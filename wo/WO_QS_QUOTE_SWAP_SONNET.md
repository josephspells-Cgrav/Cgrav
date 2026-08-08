# WO-QS — /quote swap: name+phone BEFORE address, contact-click = first submission

**Read FIRST:** `wo/WO_R2_COMMON.md` (all rules apply) with these OVERRIDES:
- Staging root (NEW session): `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/QS_STAGED_DELIVERABLE/`
  with TWO subtrees: `site/` (repo-relative paths for mabrey-roofing) and `crm/` (repo-relative for mabrey-crm-app).
- CRM repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` branch `showroom-integration` @ HEAD `c127add` (prod == HEAD).
- SITE repo: `C:/Users/josep/Claude Gravity/mabrey-roofing` branch `master` @ HEAD `dd6a588` (live == HEAD). Check its lockfile for the right installer.
- 🔴 **RUN EVERY GATE IN THE FOREGROUND, inline, however long it takes.** Two agents last
  round backgrounded their gates, waited for a notification, and died. Never background.
- Build report: `wo/BUILD_REPORT_QS.md`.

**Also read (the authoritative spec + verbatim intent):** `wo/SPEC_FUNNEL_CONTACT_BEFORE_ADDRESS.md`.
Joseph's boundary is pixel-tight: **identical look, order swapped, the contact button is a
Continue-style next button that ALSO submits the lead.** Implement exactly inside it.

## A. SITE — `components/funnel/QuoteFunnel.tsx`
1. Swap the constant VALUES (lines ~45-46) so `CONTACT_STEP = QUOTE_STEPS.length + 1` (6)
   and `ADDRESS_STEP = QUOTE_STEPS.length + 2` (7). Do NOT reorder JSX blocks — they key on
   the constants. The stepId map (~103) keys on constants too and stays byte-identical;
   after the swap telemetry reports contact=6, address=7 automatically.
2. Back button (~573): becomes `setStep(step === ADDRESS_STEP ? CONTACT_STEP : step - 1)`.
3. **Contact block (~317)** — now step 6:
   - h2: `Where do we reach you?`  (drop "Last step. " — factually no longer last; NOTHING else changes)
   - Button label: `Continue` (was "Get My Free Quote"). Same FbButton, same disabled/loading wiring.
   - onClick → new `submitContact()`:
     - Same validation gates VERBATIM (nameValid, phoneValid, attempted counter, phone focus).
     - `track(EVENTS.quoteStepComplete, { step, stepId: "contact" })`.
     - `track(EVENTS.generateLead, ...)` moves HERE (the lead now exists at this click — same
       semantic moment as today: name+phone captured).
     - `lead.submit()` with the CURRENT payload shape but `address: ""` and NO quizAnswers.zip
       (zip lives on the address screen). consent ✓, message ✓ (all 5 quiz answers exist by now).
       Do NOT pass the quoteComplete event here.
     - Await like today (button shows its existing loading state — that IS today's behavior on
       this same button); on ok → `setStep(ADDRESS_STEP)`; on error → the existing error line +
       retry (unchanged copy).
4. **Address block (~275)** — now step 7, the finisher:
   - h2: `Last step. Where is the roof?`  (the "Last step." signal moves here; sub-copy unchanged)
   - Button label: `Get My Free Quote`, `disabled={!canAddress || lead.submitting}`,
     `loading={lead.submitting}`.
   - onClick → `submitFinal()`: `track(quoteStepComplete, {stepId:"address"})` · the
     `/api/call-window` prefetch moves HERE (success screen renders right after this step) ·
     `lead.submit()` with the FULL payload (address + zip) and the quoteComplete event, with
     the hook's internal lead_submit tracking SUPPRESSED (see A5) · on ok → `setStep(DONE_STEP)`.
5. The `useLead` hook fires an internal `lead_submit` event per call — a completer would now
   double-count. Add an opt (e.g. `{ trackSubmit: false }`, default true so every other caller
   is untouched) and pass it from `submitFinal()` only. Receipt the hook file:line in the report.
6. DONE_STEP and the success screen: UNTOUCHED. The /book CTA reads a field off the submit
   response — verify (receipt) that the response of the FINAL submit still carries it (see B4).
7. Back-then-forward: a user can go back from address, edit phone, hit Continue again — that is
   a second partial POST same session; the CRM upsert (B) makes it an update. No client dedupe
   needed beyond the existing submitting guard.

## B. CRM — teach the intake to UPSERT by funnel session (spec §3 option (a)/(b) hybrid)
Trace the chain first: site POST → (site /api proxy w/ `verifySiteSignature`) → CRM route →
`mapSiteLead` → create. Receipts for each hop in the report.
1. **Upsert rule:** if payload has `visitor_session_id` AND `source_detail LIKE 'quote_funnel%'`
   AND a lead with that (visitor_session_id, quote_funnel source) exists created within 24h →
   UPDATE that lead; else INSERT (current path).
   - UPDATE semantics: overwrite `address_line1` (latest wins) + merge quizAnswers zip; overwrite
     name/phone/email only with non-empty new values; NEVER overwrite non-null attribution
     (`meta_*`, utm), `consent`/`consent_at`, `created_at`, `source*`, `stage`; re-run the
     geocode/address-verify pipeline when address is newly set or changed.
   - **DB invariant (the start_cadence lesson — check-then-act loses races):** additive partial
     unique index, e.g. `CREATE UNIQUE INDEX CONCURRENTLY leads_funnel_session_uq ON leads
     (visitor_session_id) WHERE visitor_session_id IS NOT NULL AND source_detail LIKE
     'quote_funnel%'` — verify `source_detail` is the right column for the funnel marker by
     reading the code (if it is `source`, adapt; receipt it). App path: select→update else
     insert; on unique-violation catch → re-select → update.
   - You do NOT run DDL. Ship `scripts/apply-qs-ddl.mjs` (idempotent, prints ACTUAL vs EXPECTED
     on read-back, ASSERTS its search/DDL took effect) + a pre-flight dupe probe (existing rows
     violating the index → the script REFUSES and prints them; orchestrator rules).
2. **Enrollment fires on CREATE only.** The v2 ladder (`new_lead_followup_v2`) arms with the
   partial — that is the point (the abandonment-recovery protocol). The UPDATE path must never
   enroll, never re-enroll, never reset the 15-min clock. `cadence_runs_active_dedupe_uq` is the
   backstop — receipt that the index exists (schema file:line) and add a test: create → update
   → exactly ONE cadence run.
3. **Missing address on CREATE:** verify (receipts + test) the create path is clean end-to-end
   with `address: ""` — mapSiteLead already `blankToUndef`s it; confirm `leadCreateSchema`
   accepts absent address and geocode/address-verify no-op without error and without landing
   the lead in a bad state (spec §4).
4. **Response parity:** the UPDATE path returns the SAME response shape as create — including
   the /book link/token field the success screen reads (find where create mints/returns it;
   the update must return the SAME lead's existing token, never a new one). Test.
5. **No duplicate outward effects on UPDATE:** no second Slack lead alert, no second Meta CAPI
   lead event from the server side (grep what create fires; suppress all of it on update except
   the address/geocode work). Receipts.
6. **Instant dial:** verify funnel leads (`quote_funnel%`) still have the instant dial retired —
   a partial must NOT ring anyone while they type their address. Receipt file:line (no code
   change expected).
7. **Telemetry consumers:** grep the CRM for readers of `funnel_events.step_index` / `step_id`
   (the /ads funnel drop-off view). contact is now 6, address 7 — fix labels/orderings in the
   same change so no chart silently lies. Receipts.

## C. Tests + gates
- New tests by FULL PATH in package.json's `test` hand-list (union — never reorder/remove).
- Minimum new coverage: upsert create-then-update (one row) · double-POST race backstop
  (unique violation → update) · update never enrolls twice · empty-address create clean ·
  response parity incl. booking field · stale-session (>24h) inserts fresh.
- CRM gates: `npx tsc --noEmit` · `npm test` · `npm run build` — FOREGROUND, tails verbatim
  in the report. Site gates: `tsc --noEmit` (if configured) + `next build` equivalent — state
  honestly which gates the site repo actually has.
- PGlite teardown: delete `touchAttempts` BEFORE `outbox` (FK).

## D. Report (`wo/BUILD_REPORT_QS.md`)
Gate tails · files touched (both repos) · receipts ledger (every "verify" above → file:line) ·
STOP questions for anything the spec/code contradict · REGISTRATION section if any ·
the DDL script's dry-run output. You never deploy; the orchestrator deploys CRM FIRST, then site.
