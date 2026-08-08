# BUILD REPORT — WO_ALEX_A4 (Sonnet-5 builder, judgment-zero)

Repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
Built in an isolated sandbox per the WO's protocol; nothing committed, nothing deployed, no DDL run, `.env*` untouched.

## Gate tails

**`npx tsc --noEmit`** — ✅ PASS. Clean, zero errors, exit 0.

**`npm test`** — ✅ PASS.
```
ℹ tests 3400
ℹ suites 935
ℹ pass 3400
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 922749.1702
```
All 4 new test files' describe blocks individually confirmed passing (appointment tools: 5/5 describes, 15/15 its; contact tools: 4/4 describes; cadence-control: 4/4 describes; history: 6/6 describes) — verified by name-matching every `✔` line against the source, not just the aggregate count.

**`npm run build`** — ✅ PASS. `next build` completed successfully (compiled, typechecked, page data collected, static generation finished) with zero errors. Two pre-existing WARNINGS (unrelated to this WO — `jose`/`next-auth`'s Edge Runtime `CompressionStream`/`DecompressionStream` usage, a dependency-stack characteristic that predates this build) — no errors.

## Files touched — new (8)
- `src/lib/assistant-appointment-tools.ts` — `set_appointment_status`, `cancel_appointment`, `move_appointment`
- `src/lib/assistant-contact-tools.ts` — `add_lead`, `add_contact`, `edit_contact`
- `src/lib/assistant-cadence-control.ts` — `reschedule_cadence_step`
- `src/lib/assistant-history-tools.ts` — `lead_history` (read)
- `src/lib/assistant-appointment-tools.test.ts`
- `src/lib/assistant-contact-tools.test.ts`
- `src/lib/assistant-cadence-control.test.ts`
- `src/lib/assistant-history-tools.test.ts`

## Files touched — modified, shared (6)
- `src/lib/assistant.ts` — `allTools()` registers all 8 new tools as individual identifiers inside the function body (never a module-level array — the house TDZ law), `lead_history` in all three branches (readOnly / flag-on / flag-off, since it's SELECT-only), the 7 write verbs in the flag-on branch only.
- `src/lib/assistant-tools.ts` — `list_appointments` now returns `appointment_id` per row. Necessary fix: without it, none of the 3 new appointment verbs had a reachable id (the exact "armed ≠ reachable" class this codebase has a standing law about).
- `src/lib/assistant-reachability.test.ts` — `ID_SUPPLIERS` gains `appointment_id: ["list_appointments"]`.
- `src/lib/assistant-flag.test.ts` — `READ_TOOL_NAMES`/`WRITE_TOOL_NAMES` extended with the 8 new tool names, in the exact order `allTools()` now returns them (this test does an exhaustive ordered `deepEqual` against the live registry).
- `src/lib/assistant.test.ts` — `CONFIRM_REQUIRED` extended with the 7 new write verbs (all require two-phase confirm per the WO's floor; none qualified for the safe-direction `NO_CONFIRM_OK` set); `leadHistoryTool` imported and added to the `readNames` set so the mechanical write-verb classifier doesn't flag it UNCLASSIFIED.
- `package.json` — `test` script's one-line file list gains the 4 new test files, appended at the end, full repo-relative paths.

## The two VERIFICATION results (file:line receipts)

### 1. Does anything auto-enroll a cadence when an appointment becomes `no_show`?
**YES — the auto-enroll code path EXISTS**, live-gated by the `LADDERS_ARMED` env var (not a secret; a feature-flag list).
- `src/app/api/appointments/[id]/route.ts:136` — `const becomingNoShow = nextStatus === "no_show" && existing.status !== "no_show";`
- `src/app/api/appointments/[id]/route.ts:253` (inside the `becomingNoShow` branch, `218-259`) — `await runNoShowCadence(db, existing.leadId);`
- `src/lib/events.ts:619-637` — `export async function runNoShowCadence(db, leadId)`: line 620 `if (!isLadderArmed("no_show")) return;`; line 630 `startCadence(db, "no_show", { contactId, leadId, to: {sms, email}, consent: lead.consent })`.
- `src/lib/ladders-armed.ts:55-57` — `isLadderArmed(key)` reads `process.env.LADDERS_ARMED` (comma-separated cadence keys) at CALL time. Unset (the shipped-dormant default) → every ladder unarmed.

Because armed-state is a live env read, not a compile-time constant, `set_appointment_status`'s no_show branch calls `isLadderArmed("no_show")` itself, live, at BOTH preview and confirm, rather than freezing a guess into the tool's copy. It also re-checks STOP/suppression before calling `runNoShowCadence` — that function does not check suppression before creating the `cadence_runs` row itself (only the eventual outbox enqueue does, per `src/lib/outbox.ts`'s rule 1), so this is a deliberate belt-and-suspenders addition, matching what `send_text`/`start_cadence` already do. Preview branches three ways: **armed** ("this will START the missed-appointment ladder (calls/texts her)"), **armed but the customer is suppressed** (discloses the ladder starts but nothing actually sends), **not armed** ("this makes her eligible for the no_show ladder; nothing is sent until you start it" — the WO's own exact phrasing for that case).

### 2. Does creating a lead auto-arm the new-lead follow-up ladder?
**NO — verified it does not**, by construction of the source allowlist (not by omission).
- `src/lib/lead-ingest.ts:295` — `emitEvent("lead.created", lead.id, { lead, contact, intake: d });` fires on every genuinely new lead row (a `dedupe_key` replay returns before this line, per `ingestLead`'s own idempotency check at lines 177-191).
- `src/lib/events.ts:277-288` — `deliverLeadCadence` gates on `isEligibleForAutoOutreach(payload)` (a cheap pre-check) before scheduling `runLeadCadenceV2` inside `after()`.
- `src/lib/speed-to-lead-call.ts:306-315` — `isEligibleForAutoOutreach` requires `isAutoCallSource(lead.source)` (line 309) **and** `lead.consent === true` (line 310, strict).
- `src/lib/speed-to-lead-call.ts:268-272` — `export const AUTO_CALL_SOURCES: readonly LeadSource[] = ["website_form", "referral", "meta_lead_ad"];`
- `src/lib/db/schema.ts:28-60` — `leadSourceEnum` (12 values: website_form, gbp_call, dni_organic, dni_lsa, dni_ads, social_form, inbound_call, referral, manual, leap_import, other, meta_lead_ad) has **no `"assistant"` value** — the WO's literal spec text (`source = "assistant"`) names a value that does not exist in the DB enum, and adding one is a DDL migration, forbidden by this build's protocol (see Deviation #1 below).

`add_lead` uses `source: "manual"` — not on `AUTO_CALL_SOURCES` — so `isEligibleForAutoOutreach` returns false regardless of consent, and the ladder never enrolls. `add_lead`'s preview states this plainly: *"This does NOT start any automated follow-up."*

## Booking-core routing — which was used, and why (grepped first, per the WO)
- **`cancel_appointment`** and **`set_appointment_status`'s `cancelled` branch** → **`booking-core`'s own `cancelAppointment()`**. Booking-core owns this transition — it's one of its four documented verbs (book/confirm/reschedule/cancel). Never a raw update.
- **`move_appointment`** → **`booking-core`'s `rescheduleAppointment()`** ONLY. Same reasoning — the public `/book` page and this tool write the same `appointments` rows, and `appointments_org_slot_uq` (a partial unique index on `(org_id, starts_at)` for live statuses) is the database's own arbiter of a same-instant race, not app code.
- **`set_appointment_status`'s `completed` and `no_show` branches** → **direct conditional update** (fell back). Booking-core has **no function** that transitions a row into either state — grepped `booking-core.ts` for "completed"/"no_show"; the only hits are a comment in `supersedePriorAppointments`'s doc confirming both statuses are explicitly excluded from what it touches (`'proposed'/'confirmed' only — completed and no_show stay untouched`). The existing `PATCH /api/appointments/[id]` route independently confirms this split: it routes `confirmed`/`cancelled` through booking-core but handles `no_show` with a direct conditional update + explicit side effects (`src/app/api/appointments/[id]/route.ts:218-259`), and falls through to a generic plain-update path for `completed` (no special handling exists there at all — mirrored here, since marking an appointment "completed" has no side effects anywhere in the codebase; grepped, confirmed absent).

## Deviations from the WO's literal spec text (recorded, not hidden)
1. **`source: "manual"` instead of `"assistant"`** (`add_lead`). `leadSourceEnum` has no `"assistant"` value; adding one is a DDL migration, forbidden by this build's protocol ("never run DDL"). Used `"manual"` instead — the exact value the CRM's own "+ New lead" dialog uses (`src/components/board/new-lead-dialog.tsx:41,51`), the correct semantic bucket for a human-relayed lead. The operator's actual words are preserved in `source_detail` (composed internally as `"assistant: <details>"`, never a raw wire field — see the floor note in the file), so the provenance signal the WO wanted survives even though the literal enum string doesn't.
2. **`reschedule_cadence_step`'s id field is named `run_id`, not `cadence_run_id`** (the WO draft's literal text: `Input { cadence_run_id, at, confirm? }`). Renamed to match `cancel_cadence`'s existing field name exactly (`src/lib/assistant-comms-tools.ts`) — same entity, same file family — and because `run_id` is the literal key `assistant-reachability.test.ts`'s `ID_SUPPLIERS` map already wires to `list_cadence_runs`. Using the WO's literal name would have introduced a second, unreachable id-shape (no read tool would have returned a `cadence_run_id`-named field); reusing the established name keeps the verb mechanically reachable without inventing a new supplier mapping for an identical concept.

## House idioms copied (source files named in the code itself)
- Two-phase confirm + integrity floor kit — `src/lib/assistant-send-text.ts`, `src/lib/assistant-floor.ts`.
- `status` declared as an OWNED field — `assertDeclarable("set_appointment_status", ["status"])`, the exact idiom `set_task_status` uses (`src/lib/assistant-production-tools.ts:196`).
- Conditional-UPDATE-guards-the-race — modeled on `claimCadenceRunForFire` (`src/lib/cadence.ts:992-999`).
- `resolveSendAt` — imported directly from `src/lib/assistant-send-text.ts` and reused verbatim for `reschedule_cadence_step`'s `at` parsing, per the WO's explicit instruction.
- `nextWindowOpening` — lazily imported from `src/lib/outbox.ts` inside `assistant-cadence-control.ts`, mirroring `assistant-send-text.ts`'s own documented lazy-import pattern for the identical module (both avoid the documented `assistant-start-cadence → cadence → speed-to-lead-call → briefing → … → assistant` cycle).
- `normalizeEmailEdit` / `addressFieldsChanged` — reused from `src/lib/contact-edit.ts`, the same helpers `PATCH /api/contacts/:id` uses for the CRM's own "Edit customer" dialog.
- `ingestLead()` — reused directly from `src/lib/lead-ingest.ts` for `add_lead` (round-robin assignment, geocode scheduling, and the audit row all inherited for free, identical to every other lead-intake surface).
- pg_trgm `similarity()` at threshold `0.25` — the same constant `src/lib/mcp-tools.ts`'s `crm_search` tool uses for fuzzy name matching.
- `buildCustomerCommsItems` — reused directly from `src/lib/customer-comms.ts` for `lead_history`'s "texts both directions" dedup — the identical merge Customer-360's own "full contact history" already ships.
- DB-test harness (PGlite + pg_trgm + `drizzle-kit`'s `pushSchema` + the `globalThis.__mabreyDb` singleton) — `src/lib/delete-rules.test.ts` / `src/lib/assistant-send-text.test.ts`.
- `isAfterOutsideRequestScope` recovery (in `add_lead`'s production code, not just its test) — modeled on `src/lib/lead-ingest-scope.test.ts`'s documented, pre-existing characteristic of `ingestLead()`'s synchronous `emitEvent("lead.created")` (a listener calls `next/server`'s `after()` unconditionally, which throws outside a real request scope). Treated as a real correctness case rather than only a test artifact: the contact+lead rows are already written by the time the throw happens (no transaction), so silently reporting "write failed" would be a false negative. The tool now recovers by re-reading the just-written row by phone.

## STOP questions
1. **`edit_contact`'s duplicate-detection scope.** The WO's "All three: duplicate detection FIRST (same phone / very-close name)" line groups `add_lead`/`add_contact`/`edit_contact` together. Implemented: `edit_contact` hard-refuses on an exact-phone COLLISION (the new number belongs to a different existing contact) but does **not** run the close-NAME similarity check the two CREATE tools run. Reasoning: the "rather than creating a second record" clause is about CREATE tools; editing an existing row creates nothing, so the only real "duplicate" risk on an edit is the phone collision (which IS hard-walled, never bypassable). Flagging this interpretation rather than silently deciding it — a close-name warning on `edit_contact` (e.g. "renaming this contact to a name close to an existing one") would be a small, contained addition if wanted.
2. **The literal "0 rows from the conditional UPDATE" race in `reschedule_cadence_step` is not independently reproduced by a unit test**, though the OBSERVABLE contract it exists to guarantee is fully tested. Traced precisely: the tool re-reads the run fresh at the top of its own confirmed branch and guards the UPDATE on that SAME fresh read, so the 0-rows path can only fire from a genuine concurrent write landing inside the few-millisecond gap between that read and that write inside ONE call — not reproducible by any sequence of calls to the tool alone (an earlier draft of this test incorrectly asserted the 0-rows outcome by mutating the DB *before* the call; traced through the code and confirmed the fresh-read design correctly treats that as a legitimate prior state change, not a race, and moves cleanly from it instead of refusing — the test was rewritten to assert the correct behavior). This mirrors `claimCadenceRunForFire` (`src/lib/cadence.ts`) itself, which has the identical shape and the identical testability limit. What IS fully tested: "if the run isn't in the expected state by the time this call runs, report the truth, never claim a false success" — via the not-active and stopped-before-this-call cases.

## Notes for whoever integrates the staged deliverables
- `src/lib/assistant.ts`, `src/lib/assistant-tools.ts`, `src/lib/assistant-reachability.test.ts`, `src/lib/assistant-flag.test.ts`, `src/lib/assistant.test.ts`, and `package.json` are shared touchpoints every parallel WO_ALEX builder registering a new verb must also edit (`allTools()` registration + the drift-proof pinned-list tests + the test-file hand-list). This sandbox's versions carry ONLY the A4 additions on top of the `showroom-integration` snapshot taken at build start — reconciling against sibling builders' concurrent edits to these same files (place_call, custom_cadence, universal_read, outbox_control, booking_link, per the WO's own PARALLEL-WORK BOUNDARY list) needs a real merge, not a blind overwrite.

## Deliverable location
`C:\Users\josep\AppData\Local\Temp\claude\C--Users-josep-Claude-Gravity\9abb4478-bd56-45f8-a92a-6440c2f775a0\scratchpad\A4_STAGED_DELIVERABLE\` — 14 files at exact repo-relative paths (8 new + 6 modified).
