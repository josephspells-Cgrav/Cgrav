# BUILD REPORT — WO-QS (/quote swap: contact before address)

Builder: QS-BUILDER (judgment-zero Sonnet). Read `wo/WO_QS_QUOTE_SWAP_SONNET.md`,
`wo/WO_R2_COMMON.md`, `wo/SPEC_FUNNEL_CONTACT_BEFORE_ADDRESS.md` before starting.

Sandbox: copied both repos (minus `node_modules/.next/.git`) into
`…/8e136755…/scratchpad/sandbox/{site,crm}`. Never wrote to the real repos.
Site installed with `npm ci` (its own `vercel.json` names that installer).
CRM installed with `pnpm install`. All gates run in the sandbox, foreground,
inline — none backgrounded by choice. One CRM `npm test` run exceeded the
Bash tool's 600s cap and the harness auto-moved it to background; I did not
treat that as fire-and-forget — I actively read the real output file and used
it as the gate receipt (see §2 below), then re-ran the gate twice more in the
foreground for a clean final receipt.

Staged deliverables: `…/scratchpad/QS_STAGED_DELIVERABLE/{site,crm}/…` at
exact repo-relative paths (verified byte-identical to the sandbox source via
`diff -q` on every file — see §6). Never committed, never deployed, never ran
DDL against any database, never touched `.env` files.

---

## 0. TL;DR gate status

| Gate | Result |
|---|---|
| Site `tsc --noEmit` | ✅ PASS (clean) |
| Site `next build` | ✅ PASS (146 routes, `/quote` included) |
| CRM `tsc --noEmit` | ✅ PASS (clean, after one 2-line fix) |
| CRM `npm test` | ✅ PASS — **3868/3868**, 0 fail (final clean run; see §2 for the transient unrelated flake investigated along the way) |
| CRM `npm run build` | ✅ PASS (compiled, types clean, all routes incl. `/api/webhooks/site-lead` generated) |
| DDL script | Written + **dry-run executed** (no DB touched — see §7) |

---

## 1. Site gates

```
$ npx tsc --noEmit
(clean — no output)

$ npm run build
▲ Next.js 16.2.12 (Turbopack)
✓ Compiled successfully in 14.3s
  Running TypeScript ...
  Finished TypeScript in 9.8s ...
✓ Generating static pages using 7 workers (146/146) in 3.4s
...
├ ○ /quote
```

## 2. CRM gates

```
$ npx tsc --noEmit
(clean — no output, after fixing 2 pre-fix errors: phoneAlt type widened to
 string | null | undefined to match normalizePhone's actual return type)

$ npm run build
   ▲ Next.js 15.5.20
 ✓ Compiled successfully in 28.5s
   Checking validity of types ...
 ✓ Generating static pages (9/9)
...
├ ƒ /api/webhooks/site-lead   423 B   103 kB
```

`npm test` — three runs, in order:

- **Run 1** (before test-file fixes): `tests 3868 · pass 3863 · fail 5`. All 5
  failures were in my own new file
  (`src/lib/lead-ingest-funnel-upsert.test.ts`), all the SAME root cause: my
  update path calls `scheduleGeocode(contact)` (WO §B1's "re-run the
  geocode… pipeline"), and `scheduleGeocode` itself calls `next/server`'s
  `after()` unconditionally (`src/lib/geocode.ts:42`) — outside a real
  request scope that throws, the SAME pre-existing class of artifact
  `src/lib/lead-ingest-scope.test.ts`'s own header already documents for
  `emitEvent`→`deliverSpeedToLead`. Fixed by wrapping every CREATE-shaped
  call (and any UPDATE call that supplies a geocode-recoverable address) in
  the SAME `ingestLeadTolerant` pattern that file established, and asserting
  on re-queried DB state instead of trusting a possibly-swallowed return
  value — the exact house convention, not a new pattern.
- **Run 2** (after fixes, full suite): `tests 3869 · pass 3868 · fail 1`. My
  file was 100% green. The ONE failure was in `src/lib/speed-to-lead-call.test.ts`
  — a file I never touched — with a `relation "touch_attempts" does not
  exist` error inside `recordTouchAttempt`'s own "never throws" swallow
  point. Investigated: ran that file in isolation → **68/68 pass, 0 fail**.
  Consistent with a cross-file race on the `globalThis.__mabreyDb` singleton
  pattern (many test files each build their own PGlite instance and point
  the same global at it; node's test runner does not fully isolate files
  scheduled in the same process) — a pre-existing test-harness
  characteristic, not something my diff touches or introduces.
- **Run 3** (full suite, identical code, no changes since Run 2): `tests 3868
  · pass 3868 · fail 0`. Fully clean, confirming Run 2's single failure was
  non-reproducible flakiness, not a regression.

```
ℹ tests 3868
ℹ suites 1082
ℹ pass 3868
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 466997.9038
```

PGlite teardown rule (WO_R2_COMMON): not applicable to my new test file — no
`touchAttempts`/`outbox` deletes were needed (I used unique
phone/session-id-per-test fixtures, the same collision-avoidance idiom
`lead-ingest-scope.test.ts`'s `nextPhone()` already establishes, so no
DELETE-based teardown was required at all).

---

## 3. Files touched

**Site repo** (`mabrey-roofing`, branch `master` @ `dd6a588`):
- `components/funnel/QuoteFunnel.tsx` — the swap (constants, back button,
  contact/address block content + handlers, split `submit()` into
  `submitContact()`/`submitFinal()`).
- `components/funnel/useLeadSubmit.tsx` — added the `trackSubmit` opt.

**CRM repo** (`mabrey-crm-app`, branch `showroom-integration` @ `c127add`):
- `src/lib/db/schema.ts` — new partial unique index `leads_funnel_session_uq`.
- `src/lib/lead-ingest.ts` — the funnel-session upsert (core logic).
- `src/lib/funnel-shared.ts` — `QUOTE_STEP_ORDER` reordered (contact before
  address) + doc.
- `src/lib/funnel-analytics.test.ts` — one existing test updated to match the
  new order (see §D receipt below — this is a necessary in-place fix, not a
  new test-list entry).
- `src/app/api/webhooks/site-lead/route.ts` — response `updated` field +
  status-code correctness (200 for update, matching dedupe; 201 reserved for
  a genuine fresh insert).
- `scripts/apply-qs-ddl.mjs` — new DDL script.
- `src/lib/lead-ingest-funnel-upsert.test.ts` — new test file (added to
  `package.json`'s test hand-list, appended, nothing reordered/removed).
- `package.json` — one append to the `test` script string.

---

## 4. Receipts ledger (every WO "verify" → file:line)

### A. Site

- **A1 constants swap** — `components/funnel/QuoteFunnel.tsx:50-51`
  (`CONTACT_STEP = QUOTE_STEPS.length + 1`, `ADDRESS_STEP = … + 2`). JSX
  blocks NOT reordered — verified by diff: only the two `const` lines and
  their surrounding comment changed; the `{step === ADDRESS_STEP && (…)}` /
  `{step === CONTACT_STEP && (…)}` blocks are byte-identical in position.
  stepId map at (now) line ~108 (`step <= LAST_QUESTION ? … : step ===
  ADDRESS_STEP ? "address" : "contact"`) — untouched, confirmed it
  auto-resolves correctly post-swap (contact=6, address=7) with zero edits,
  exactly as the WO predicted.
- **A2 back button** — `components/funnel/QuoteFunnel.tsx:624`:
  `onClick={() => setStep(step === ADDRESS_STEP ? CONTACT_STEP : step - 1)}`.
- **A3 contact block (now step 6)** — h2 copy dropped "Last step. " (line
  ~375); button label → `Continue`, `onClick={submitContact}`, same
  `disabled={lead.submitting} loading={lead.submitting}` wiring unchanged
  (line ~455); `submitContact()` (lines 193-221): validation gates verbatim,
  `track(quoteStepComplete,{stepId:"contact"})` then `track(generateLead,…)`,
  `lead.submit()` with `address:""` and no `quizAnswers.zip`, no `opts.event`
  → on ok `setStep(ADDRESS_STEP)`.
- **A4 address block (now step 7, finisher)** — h2 → `Last step. Where is
  the roof?` (line ~327); button `disabled={!canAddress || lead.submitting}
  loading={lead.submitting} onClick={submitFinal}` (lines 358-364, both
  `lead.submitting` checks are NEW — today's address button had neither);
  `submitFinal()` (lines 226-264): `track(quoteStepComplete,{stepId:"address"})`
  first, `/api/call-window` prefetch moved here, full payload +
  `quizAnswers.zip`, `{event:quoteComplete, trackSubmit:false}` → on ok
  `setStep(DONE_STEP)`.
- **A5 hook opt** — `components/funnel/useLeadSubmit.tsx:79` (new
  `trackSubmit?: boolean` in the opts type) and `:113`
  (`if (opts?.trackSubmit ?? true) track(EVENTS.leadSubmit, opts?.params);`
  — was the unconditional `track(EVENTS.leadSubmit, opts?.params);` at the
  pre-edit file's line 98). Passed `trackSubmit:false` from `submitFinal()`
  only (line ~260); every other caller (site-wide: the quiz, cost calculator,
  financing calculator, and `submitContact()` itself) omits it → unchanged
  default-true behavior.
- **A6 DONE_STEP / booking field** — untouched (verified by diff: zero
  changes inside the `step === DONE_STEP` block). Receipt that the FINAL
  submit's response still carries `bookingUrl`: `useLeadSubmit.tsx`'s success
  path reads `body?.bookingUrl` off whatever response `lead.submit()`'s
  fetch received (unconditional, not gated by `trackSubmit`); CRM's
  `src/app/api/webhooks/site-lead/route.ts` calls `ensureBookingToken(getDb(),
  result.leadId)` **unconditionally after every successful `ingestLead` call**
  (create AND update), and `ensureBookingToken` (`src/lib/booking-public.ts:76-87`)
  is idempotent by construction (selects the existing token first, only mints
  if absent) — since the update path returns the SAME `leadId` as the create,
  the SAME token comes back. Proven dynamically by the new test in §B4 below.
- **A7 back-then-forward** — no client dedupe added, per spec; the CRM upsert
  (B1) is what makes a second contact-partial POST from the SAME session an
  UPDATE, not a duplicate. The existing `lead.submitting` guard is unchanged.

### B. CRM

**Chain traced** (per-hop, as the WO asked): site `POST /api/lead`
(`app/api/lead/route.ts`, site repo) → `forwardLead()`
(`lib/server/forwardLead.ts`, HMAC-signed, site repo) → CRM
`POST /api/webhooks/site-lead` (`src/app/api/webhooks/site-lead/route.ts`) →
`verifySiteSignature` + `mapSiteLead` (`src/lib/site-lead.ts`) →
`leadCreateSchema.safeParse` → `ingestLead(getDb(), parsed.data)`
(`src/lib/lead-ingest.ts`).

- **B1 upsert rule** — `src/lib/lead-ingest.ts`: `isQuoteFunnelSession`
  (line 190), `findFunnelSessionLead` (line 219, 24h-bounded by default,
  `ignoreAgeWindow` opt for the DB-proven-conflict fallback), wired into
  `ingestLead` at line 413 (`const funnelSession = isQuoteFunnelSession(d);`),
  match-and-return at lines 414-419. `source_detail` confirmed (not `source`)
  as the funnel marker — receipt: `src/lib/site-lead.ts:313`
  (`source: "website_form", // ALWAYS`) proves `source` can never carry the
  marker; `mapSiteLead`'s composition leads `source_detail` with `formId`
  ("quote_funnel") when present (site-lead.ts's `sourceDetail` builder) —
  **no adaptation needed, the WO's own hedge resolved to "no change."**
  UPDATE semantics (`updateFunnelSessionLead`, line 269): `address_line1`
  latest-wins unconditional (line ~287); `zip` merge, presence-gated (line
  ~289); `first_name`/`last_name`/`phone`/`phone_alt`/`email` non-empty-only
  (lines ~291-297); NEVER touches `source`/`source_detail`/`division`/
  `stage`/`consent`/`consent_at`/`created_at`/`dedupe_key`/attribution IDs
  (verified by the dedicated test in §4-tests below, not just by inspection).
  DB invariant: `leads_funnel_session_uq`, `src/lib/db/schema.ts:624`.
  App path "select→update else insert; on unique-violation catch →
  re-select → update": `ingestLead` lines 413-419 (select→update) and
  485-532 (insert wrapped in try/catch, `isUniqueViolation` check at line
  529, `ignoreAgeWindow:true` re-select on catch). Pre-flight dupe probe +
  idempotent apply script: `scripts/apply-qs-ddl.mjs` (§7).
- **B2 enrollment CREATE-only** — `updateFunnelSessionLead` never calls
  `emitEvent` or `assignLead` — proven TWO ways: (1) a static source-grep
  test asserting neither string appears in the function's body; (2) a
  dynamic test that enrolls once via the exported, directly-awaitable
  `runLeadCadenceV2` (`src/lib/events.ts`, the SAME testability seam the file
  documents for exactly this reason), then runs the funnel-session UPDATE and
  asserts `cadence_runs` stays at exactly 1 row, then deliberately calls
  `runLeadCadenceV2` AGAIN and confirms `cadence_runs_active_dedupe_uq`
  refuses the second enrollment at the DB (observed in the test log:
  `[events] new-lead cadence v2 not started: already_enrolled`).
- **B3 empty-address create clean** — `leadCreateSchema.address_line1` is
  `z.string().optional()` (`src/lib/lead-ingest.ts:55`, no min-length);
  `scheduleGeocode`'s own early-return on no usable address
  (`src/lib/geocode.ts:39-40`, `oneLineAddress` returns null on missing
  street). Tested end-to-end (create with no address → one clean row,
  `addressLine1` stays `null`, never a placeholder).
- **B4 response parity** — `src/app/api/webhooks/site-lead/route.ts:121`
  (`result.deduped || result.updated ? 200 : 201`) + the additive `updated`
  field in the JSON body. Tested end-to-end through the REAL route (not a
  direct `ingestLead` call): two POSTs, same session, asserts identical
  `lead_id`/`contact_id`/`bookingUrl` across both responses and the address
  landed on the right contact row.
- **B5 no duplicate outward effects on update** — `updateFunnelSessionLead`
  never calls `emitEvent("lead.created", …)` at all (the single call that
  fans out to `deliverToN8n`, `deliverToSlack`, `deliverSpeedToLead`,
  `deliverLeadCadence`, `deliverMetaCapi`, `deliverOwnerAlert` —
  `src/lib/events.ts` lines 1587-1619), so ALL of them are structurally
  suppressed on update, not just Slack/CAPI. Additional receipt on CAPI
  specifically: `deliverMetaCapi`'s `lead.created` branch is ALREADY gated
  to `source === "meta_lead_ad"` (`src/lib/events.ts:1351`) — since every
  site lead (funnel or not) is `source:"website_form"` (site-lead.ts:313),
  the CRM's own `meta-capi.ts` dispatch was UNREACHABLE for quote_funnel
  leads even before this WO; the real duplicate-CAPI risk for this lead type
  lives entirely in the SITE repo (see STOP #1 below).
- **B6 instant dial retirement** — `isFunnelLead`
  (`src/lib/speed-to-lead-call.ts:330`, `sourceDetail.startsWith("quote_funnel")`)
  and `shouldFireSpeedToLead` (line 341, returns false when `isFunnelLead`).
  No code change (matches the WO's own expectation) — tested directly with a
  `quote_funnel`-tagged payload.
- **B7 telemetry consumers** — grepped `stepIndex`/`step_index` across the
  ENTIRE `src/` tree: `funnel_events.step_index` (the DB column,
  `src/lib/funnel-ingest.ts:118` writes it) has **zero readers anywhere in
  the CRM** — every other `stepIndex` hit is the unrelated CADENCE system's
  own step-numbering concept. The ACTUAL ordering mechanism that drives
  `/ads` is `QUOTE_STEP_ORDER` (`src/lib/funnel-shared.ts:68-76`), a
  STRING-keyed array — `funnel-analytics.ts`'s `quoteFunnel()` uses
  `known[known.length-1]` (whichever `stepId` is LAST in this array) to
  decide which step's "completed" count comes from `convertedSessions`
  rather than a raw count, and `sessionSummaries`' `furthestStep` is this
  array's INDEX order. Fixed: swapped `contact`/`address` positions in the
  array (line 74-75) so `address` is last again post-swap, matching the
  site's new real order. Updated the one existing test
  (`funnel-analytics.test.ts`, "the FINAL step counts conversions") whose
  fixture encoded the OLD order's assumption. This is a MORE PRECISE
  diagnosis than the WO's literal "contact is now 6, address 7" framing
  (which described the numeric step values) — the numeric column is
  write-only/unread, so nothing there needed fixing; the STRING-keyed array
  is what actually drives the dashboard, and it needed exactly this swap.

---

## 5. Tests — coverage vs. the WO's minimum list

New file: `src/lib/lead-ingest-funnel-upsert.test.ts` (16 tests, 7 describe
blocks), added to `package.json`'s test hand-list by append only.

| WO-required coverage | Where |
|---|---|
| upsert create-then-update (one row) | "funnel-session upsert: create then update" describe block, 4 tests incl. field-by-field merge rules and the full never-overwrite list |
| double-POST race backstop (unique violation → update) | "double-POST race backstop" describe block — a DETERMINISTIC version (a stale row manufactures the exact same unique-violation-then-catch code path a true race would — see the caveat in §D below) plus a best-effort TRUE-CONCURRENCY version via `Promise.all` on two real `ingestLead` calls |
| update never enrolls twice | "update never enrolls twice" describe block — static source check + dynamic DB-row-count proof + the DB invariant's own refusal, observed live |
| empty-address create clean | "empty-address create is clean end-to-end" describe block |
| response parity incl. booking field | "response parity across the two-POST flow" describe block, through the REAL route |
| stale-session (>24h) inserts fresh | "stale-session (>24h) window" describe block — see §D's receipted DB-vs-app-window tension for exactly what this proves and why a LITERAL "inserts a second row for the identical session_id" isn't achievable given the WO's own permanent-index DDL text |

Plus a regression-control describe block proving non-funnel payloads
(no `visitor_session_id`, or a `source_detail` that doesn't start with
`quote_funnel`) never enter the new code path at all — a repeat POST for a
plain contact-form submission with the same session id still inserts a
SECOND row, unaffected.

---

## 6. Staging verification

```
$ diff -q <sandbox file> <staged file>   # every one of the 10 touched files
schema.ts: MATCH
lead-ingest.ts: MATCH
lead-ingest-funnel-upsert.test.ts: MATCH
funnel-shared.ts: MATCH
funnel-analytics.test.ts: MATCH
site-lead/route.ts: MATCH
apply-qs-ddl.mjs: MATCH
package.json: MATCH
QuoteFunnel.tsx: MATCH
useLeadSubmit.tsx: MATCH
```

Staged at `…/scratchpad/QS_STAGED_DELIVERABLE/{site,crm}/…`, repo-relative
paths, verified byte-identical to the gate-passing sandbox source.

---

## 7. DDL script — `scripts/apply-qs-ddl.mjs`

Idempotent (`CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS`), pre-flight
dupe probe that REFUSES on any existing violation, verifies by reading back
from `pg_indexes` (never trusts the DDL call's own return value). Defaults to
**dry-run** (no DB connection opened at all); the real-run path requires an
explicit env-file argument AND `--apply`, and **I never invoked it** — this
build only ran the dry-run, satisfying "never run DDL against any database."
Dry-run output (captured verbatim):

```
=== WO-QS DDL — leads_funnel_session_uq ===

DRY RUN (default) — no database connection opened, nothing executed.
Real-run: node scripts/apply-qs-ddl.mjs <envfile-with-DATABASE_URL> --apply

Pre-flight dupe probe (REFUSES to apply if this returns any row):
SELECT "visitor_session_id", count(*) AS n
    FROM "leads"
   WHERE "visitor_session_id" IS NOT NULL
     AND "source_detail" LIKE 'quote_funnel%'
   GROUP BY "visitor_session_id"
  HAVING count(*) > 1

-- leads_funnel_session_uq
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS "leads_funnel_session_uq"
     ON "leads" USING btree ("visitor_session_id")
   WHERE "visitor_session_id" IS NOT NULL AND "source_detail" LIKE 'quote_funnel%'

Verify (reads back from pg_indexes — never trusts the DDL call's own return value):
SELECT indexname, indexdef FROM pg_indexes
   WHERE tablename = 'leads' AND indexname = 'leads_funnel_session_uq'

EXPECTED after apply: 1 row(s) from the verify query.
```

The orchestrator runs the real-run path against the actual target after
reviewing the script.

---

## 8. REGISTRATION section

**N/A.** This WO never touches `src/lib/assistant.ts`, `assistant.test.ts`,
or `assistant-flag.test.ts`, and registers no new Alex/assistant tool. The
Round-2 registration collision (WO_R2_COMMON's `## 🔴 THE REGISTRATION RULE`)
does not apply to this build.

---

## 9. STOP / flagged findings — things the spec/code left silent or that I

discovered mid-build and did not resolve unilaterally where resolving them
meant going outside the WO's explicit file scope:

1. **🔴 Highest-signal finding — the SITE's own `/api/lead/route.ts` fires a
   server-side Meta CAPI "Lead" event UNCONDITIONALLY on every POST that
   passes bot checks, independent of anything the CRM does** —
   `app/api/lead/route.ts:158` (`sendLeadCapiEvent(…)`, via
   `lib/server/capi.ts`, using the SITE's OWN `LEAD_CAPI_PIXEL_ID`/
   `FB_CAPI_ACCESS_TOKEN`, distinct from the CRM's `meta-capi.ts`). Since a
   completer now genuinely produces TWO real POSTs to `/api/lead` (contact +
   address), each carrying its OWN freshly-generated `requestId`
   (`app/api/lead/route.ts`'s `requestId()`, called once per request), this
   route will independently fire the SAME server-side CAPI "Lead" event
   TWICE per completer — a duplicate ad-conversion signal the CRM-side
   upsert (this WO's whole point) has no visibility into and cannot
   suppress, because it happens entirely in the SITE repo, before the CRM is
   ever involved, at a POINT the WO's Section A never named (Section A's
   scope is `components/funnel/QuoteFunnel.tsx` only). **Did not touch this
   file** — outside my explicit edit scope, and it's a money/ad-spend-
   adjacent decision (full-deliberation territory), not something to
   silently patch. Flagging for a real decision: candidates are (a) gate the
   site's CAPI dispatch to fire only on the FINAL (address) POST, (b) forward
   a "final:boolean" flag from the funnel so the route can decide, or (c)
   accept the double-signal as tolerable (some businesses treat over-
   counting conversions as harmless noise; this one explicitly does not per
   `lib/server/capi.ts`'s own dedup-law comment).
2. **Same root cause, client-side half**: `trackMetaLead()`
   (`components/funnel/useLeadSubmit.tsx:129`) fires the Meta Pixel `Lead`
   event unconditionally on EVERY successful `submit()` call — NOT gated by
   the new `trackSubmit` opt (the WO's A5 named only the internal
   `EVENTS.leadSubmit` dataLayer event for suppression, and I implemented
   exactly that, no more). This means the browser pixel will ALSO fire twice
   per completer, with two different `eventID`s (the two different
   `requestId`s from #1) — the second one has no CAPI counterpart to dedupe
   against once #1 is resolved either way. Same decision as #1 covers this
   too (whatever fix gates the server CAPI call should very likely gate this
   client call identically).
3. **The 24h app-level window vs. the WO's own literal "permanent" DB DDL**
   — `CREATE UNIQUE INDEX … ON leads (visitor_session_id) WHERE … ` (as the
   WO specifies it, and as I built it) has NO time bound — Postgres partial-
   index predicates can't reference `now()` (not IMMUTABLE), so a genuinely
   ROLLING 24h constraint cannot exist at the DB layer. In the (not expected
   in production — `visitor_session_id` is a fresh `crypto.randomUUID()` per
   browser tab) case of an EXACT session-id collision beyond 24h, my code
   resolves it by UPDATING the stale row rather than crashing (see
   `findFunnelSessionLead`'s doc, `src/lib/lead-ingest.ts:195-211`) — a
   judgment call in the direction of "never lose a lead," but it means "a
   stale session inserts fresh" is only TRUE in the sense the tests prove
   (the app-level SELECT correctly excludes an old row from being treated as
   an in-flight continuation; a genuinely different/fresh session always
   gets its own row) — not in the sense of "the exact same key can produce
   two physical rows," which the DDL as specified makes impossible by
   design. Flagging in case the WO's author intended something else by
   "inserts fresh" for that exact edge.
4. **Phone-collision retry on the update path** — `updateFunnelSessionLead`
   (`src/lib/lead-ingest.ts:299-326`) catches a `contacts.phone` UNIQUE
   violation (the back-then-forward path, A7, editing to a DIFFERENT
   existing customer's exact phone) and retries the contact update without
   the phone field rather than crashing. The WO's §B1 says "overwrite …
   phone … only with non-empty new values" without discussing this nested
   collision; I applied this codebase's own repeatedly-established "never
   crash intake on a secondary field" convention (the same shape as
   `assignLead`'s try/catch, `scheduleGeocode`'s try/catch, the booking-token
   mint's try/catch) rather than inventing new behavior — flagging since it
   is a judgment call beyond the WO's literal text.
5. **Address-screen error paragraph** — added a `{lead.error && …}` block to
   the (now finisher) address screen, mirroring the contact screen's
   EXISTING, verbatim copy ("That did not go through — please tap the
   button again.") — see `components/funnel/QuoteFunnel.tsx:349-357`.
   Structurally necessary (the address button now does the real completing
   submit and can fail on a network hiccup, same as the contact button
   always could) but not explicitly spelled out by the WO/spec — no new
   wording invented, reused verbatim, but flagging the addition itself per
   "propose, don't ship new wording silently."
6. **`IngestLeadResult.updated` + the site-lead route's status-code fix** —
   both additive/backward-compatible, not explicitly named by the WO but
   directly serving §B4's "response parity" ask; flagging as a small
   judgment call rather than burying it.

None of the above blocked the build — every item above is either (a) already
handled correctly by design, receipted, and just flagged for awareness, or
(b) a real open decision explicitly deferred rather than resolved by
guessing at customer-facing or money-adjacent intent.

---

## 10. Deploy note (for the orchestrator, not executed here)

Per the WO: CRM deploys FIRST, then site (the site's swap POSTs a payload
shape the CRM must already know how to upsert). Site's `vercel deploy --prod`
needs `--scope team_NkPhIBvoJCuw96qNM5jblP4J` (SPEC §6) — not exercised, no
deploy was run.
