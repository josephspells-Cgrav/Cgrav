# BUILD REPORT — WO-A3 (customer-reaching verbs)

Builder: Sonnet-5, judgment-zero. Repo: `mabrey-crm-app` (branch `showroom-integration`), built in an isolated sandbox per protocol. Spec of record: the "⭐ FINAL CONSOLIDATED BUILD SPEC" section of `ALEX_VERB_SPACE_20260807.md`.

## 🔴 INTEGRATION WARNING — read before merging

My sandbox was copied from the repo at session start. **The live repo has since moved**: another parallel builder (A2, `assistant-universal-read.ts` / `query_crm`) has landed changes DIRECTLY in the live working tree to the SAME four shared files I also had to edit:

- `src/lib/assistant.ts` — A2 registered `queryCrmTool` inside `allTools()`; I registered 6 new tools the same way. **Both sets of registrations must survive — do not overwrite one with the other.**
- `package.json` — A2 appended their new test files to the `test` script's single-line string; I appended mine. **Both appends must be present — a blind copy-over of either staged version drops the other builder's test files from the run.**
- `src/lib/assistant-flag.test.ts` — A2 added `query_crm` to `READ_TOOL_NAMES`; I added my 6 verb names to `WRITE_TOOL_NAMES`. Same file, different arrays — mergeable, but not by blind overwrite (the live file already has A2's line-count/order baked into its own assertions).
- `src/lib/assistant.test.ts` — A2 classified `query_crm` in the "confirm coverage registry" (`CONFIRM_REQUIRED`/`NO_CONFIRM_OK`); I classified my 6. Same sets, same file — same merge need.

**What I did NOT do:** pull the live repo's changes into my sandbox mid-build and reconcile. My WO's protocol is build-in-isolation-then-stage; reconciling across parallel builders is the orchestrator's job, not mine, and attempting it blind (without A2's own WO/context) risks introducing a worse inconsistency than the one it would fix. My staged copies of these 4 files are diffs **against my session-start snapshot only.**

**What to do:** for these 4 files specifically, do a real (3-way or manual) merge against current `main`/`showroom-integration`, not a file copy. Everything below names exactly what my edit to each one consists of, so the merge is mechanical.

My other 8 staged files (4 new lib files + 4 new test files, all under WO-A3-unique names) cannot collide with anything — no other builder owns those paths.

## Gates

### 1. `npx tsc --noEmit`
**PASS** — exit 0, zero output. Re-run clean a second time after the final pause-disclosure fix (see below).

### 2. `npm test` (full suite, 162 files after my 4 additions)
**PASS** — re-run to completion AFTER the pause-disclosure fix below (the true final run). Verbatim summary:
```
ℹ tests 3417
ℹ pass 3417
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 656019.8389
```
(An earlier full run, before I found and fixed the two defects in the section below, showed 9 failures — all 9 inside my own 4 new test files, all traced to test-authoring bugs or one real cross-file TDZ bug, none in any pre-existing test. Every OTHER file in the suite — all 3384 of that run's other tests — passed clean on the first try, confirming my edits to the 4 shared files carry no wider blast radius.)

### 3. `npm run build`
**PASS** — exit 0. Full route manifest rendered (165 routes, all ƒ/○ resolved, no `Failed to compile`, no `Type error`, no `Cannot find module`). Verbatim tail:
```
> mabrey-crm@0.1.0 build
> next build

   ▲ Next.js 15.5.20
   - Environments: .env.local, .env

   Creating an optimized production build ...
 ⚠ Compiled with warnings in 21.2s

./node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/deflate.js
A Node.js API is used (CompressionStream at line: 10) which is not supported in the Edge Runtime.
[…Edge Runtime warnings continue, all originating from next-auth's own
  `jose` dependency (CompressionStream/DecompressionStream) — PRE-EXISTING,
  not from any file I touched. Same warning class ships on main today.]

Route (app)                                                Size  First Load JS
┌ ○ /                                                     167 B         103 kB
[…165 routes total, every one resolved…]
└ ƒ /workcenter                                             808 B         103 kB
+ First Load JS shared by all                              103 kB

ƒ Middleware                                               132 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
(The only "warnings" anywhere in the log are the pre-existing `jose`/`next-auth` Edge Runtime notices — confirmed via grep that no `warn`/`error`/`fail` string appears anywhere else in the 235-line log.)

## Files touched (12 total)

**New (8, zero collision risk):**
- `src/lib/assistant-place-call.ts` + `.test.ts`
- `src/lib/assistant-custom-cadence.ts` + `.test.ts`
- `src/lib/assistant-outbox-control.ts` + `.test.ts`
- `src/lib/assistant-booking-link.ts` + `.test.ts`

**Edited (4, SEE INTEGRATION WARNING above):**
- `src/lib/assistant.ts` — added 6 imports (top) + 6 tool registrations inside `allTools()`'s write-flag branch, after `sendTextTool`. No other line touched.
- `package.json` — appended 4 filenames to the end of the `test` script's string (after `takeoff-extract.test.ts`). No other line touched.
- `src/lib/assistant-flag.test.ts` — appended 6 names to `WRITE_TOOL_NAMES` (after `"send_text"`), updated one test-title string ("27" → "34" — now stale again post-A2's own edit, they'll have their own number). No other line touched.
- `src/lib/assistant.test.ts` — appended 4 names to `CONFIRM_REQUIRED`, 2 names to `NO_CONFIRM_OK`. No other line touched.

**NOT staged (per WO §0 instruction):**
- `src/lib/touch-ledger.STUB-DO-NOT-STAGE.ts` — the stub implementation.
- `src/lib/touch-ledger.ts` — a one-line re-export shim so `@/lib/touch-ledger` resolves in-sandbox. A1's real file did not exist in my sandbox at any point this session (confirmed absent again post-discovery of A2's landed work — A1 has not landed yet).

## The A1 touch-ledger — stubbed, not present

`src/lib/touch-ledger.ts` did not exist anywhere in my sandbox (verified at start and re-verified after discovering A2's live-repo changes — still absent). Per WO §0 I built a minimal, in-memory (never touches `db`, never runs DDL) stub matching the exact contract: `recordTouchAttempt(db, input): Promise<{id}|null>` (never throws) and `settleTouchAttempt(db, id, input): Promise<void>`. All 4 of my new verb files import from `@/lib/touch-ledger` (the REAL eventual path) — once A1's file lands there for real, my files need zero changes; the stub's `__allTouchAttemptsForTests()`/`__resetTouchLedgerForTests()` (test-only) let my own tests assert "recorded once per attempt, settled with a terminal status" concretely.

## STOP items (2) — recorded, not silently worked around

1. **`custom_cadence` call steps cannot be scheduled for later — only "now."** Verified against source: `fireCadenceStep` (cadence.ts) dials a call step DIRECTLY the instant it fires ("a call step DIALS; it does not queue" — its own comment); the only mechanism that fires future-dated work off a `cadence_runs` row is `advanceCadenceRuns`, which is wired to a real cron (`/api/cadence/advance`) but only recognizes keys registered in `CADENCE_LIBRARY` — `custom_outreach` (this verb's key) deliberately is not one (a static library can't hold a per-invocation operator-composed step list anyway). Rather than silently drop a call step the operator asked for, or build new dial-later infrastructure (out of this WO's scope — this is the same class of gap the spec doc already flags: "Cadence step reschedule/shift… no mutation/operator API exists"), a call step whose resolved time isn't "now" is REFUSED at validation (`future_call_unsupported`), naming the gap and suggesting the operator either make it "now" or drop it. SMS steps have no such limit (the outbox's own `scheduledFor` already handles arbitrary future sends).
2. **`resend_failed_send` refuses a `channel:"call"` row outright**, pointing at `place_call` instead. `enqueueOutbox` (the only mechanism this verb has to "resend") cannot make a call actually happen — outbox's own drain (`outbox-transport.ts`) only ever fires `channel==="sms"` rows; a re-queued call row would sit inert forever, a false "resent" signal. Refused rather than silently no-op-disguised-as-success.

## House idioms copied (source file named per instance)

- Two-phase confirm mechanic (`isConfirmed`/`needsConfirmation`/`CONFIRM_PROPERTY`, re-run every guard at confirm) — `assistant-send-text.ts`.
- Ship-dormant settings-flag gate shape (`is<Verb>Enabled`/`<VERB>_FLAG`, `getSettingValue`) — `assistant-start-cadence.ts`'s `isStartCadenceEnabled`/`START_CADENCE_FLAG`.
- Lazy dynamic import of `@/lib/outbox` / `@/lib/cadence` / `@/lib/speed-to-lead-call` (the documented import cycle: `assistant-start-cadence → cadence → speed-to-lead-call → briefing → … → assistant → assistant-comms-tools → assistant-start-cadence`) — `assistant-send-text.ts` and `assistant-start-cadence.ts` headers, both copied verbatim into all 4 of my new files.
- Exactly-one-of `lead_id`/`contact_id` target resolution shape (`resolveTarget`) — `assistant-start-cadence.ts`'s private `resolve()`.
- Local `formatEt` ET-timestamp formatter — duplicated verbatim from `assistant-send-text.ts`/`assistant-start-cadence.ts` (matches this codebase's own per-file-duplication convention for this exact helper, rather than a shared import).
- `greetingFirst`/`PLACEHOLDER_FIRST_NAMES` (never greet a blank or a placeholder name) — `cadence.ts`'s `greetingName`.
- Pause DISCLOSED in preview, LIFTED before the write (never obeyed) — `assistant-send-text.ts` and `assistant-start-cadence.ts`.
- STOP wall re-checked at BOTH preview and confirm — `assistant-send-text.ts`.
- `assertDeclarable("<tool>", ["contact_id"])` (the ARMED≠REACHABLE fix: `contact_id` sits in `FORBIDDEN_WRITE_FIELDS`, so any tool accepting it as an ADDRESS param must declare it owned or `floorRefusal` refuses every call) — `assistant-comms-tools.ts`'s `pause_alex`/`set_do_not_contact`, and `assistant-floor.ts`'s own header docs the historical bug this guards against.
- `resolveSendAt` reused by direct import (never reimplemented) — `assistant-send-text.ts`, per WO's explicit instruction.
- `place_call`'s 4 pinned openers reused by direct import in `custom_cadence`'s call steps (never re-typed, zero drift risk) — `assistant-place-call.ts`.
- `cancelCadence` reused (lazy import) for `custom_cadence`'s replace-flow — `cadence.ts`, same call `assistant-comms-tools.ts`'s `cancel_cadence` makes.
- `isUniqueViolation` catch-and-map on the `cadence_runs` insert (the DB is the arbiter, not an earlier SELECT) — `cadence.ts`'s own `startCadence`.
- `dedupeKey = normalizePhone(phone) ?? contactId` — `cadence.ts`'s `startCadence`.
- `ensureBookingToken`/`buildBookingUrl` reused by direct import (never mint a token by hand) — `booking-public.ts`, per WO's explicit instruction.
- Test-only clock seam (`__setClockForTests`, mirroring `__resetWalletAlertCooldownForTests`) — `speed-to-lead-call.ts` — needed because `AssistantTool.execute(input, db)` has no room for an injected `now` and `place_call`'s calling-window check is genuinely wall-clock-coupled; without this seam, an "outside window" test would be flaky (green/red depending on when it happens to run).
- PGlite + `pushSchema` ephemeral-DB test harness shape — `assistant-start-cadence.test.ts`.

## Notable defects caught and fixed mid-build (not WO ambiguities — real bugs)

1. **A multi-file `node:test` run (the SAME way `npm test` actually runs — all files in one process) crashed** with `ReferenceError: Cannot access 'PLACE_CALL_PURPOSES' before initialization` inside `assistant-place-call.ts`. Root cause: `assistant-custom-cadence.ts`'s top-level `customCadenceTool` object literal (module-eval-time, same as every other tool) spread an IMPORTED value (`[...PLACE_CALL_PURPOSES]`) into its JSON-schema enum — when Node's test runner loads multiple test files' module graphs and their loading interleaves, this can read the import before `assistant-place-call.ts` finishes initializing (the exact TDZ class the codebase's own lazy-import convention exists to prevent, just triggered by test-runner concurrency rather than a require cycle). Fixed by hardcoding that ONE schema-hint array (`["follow_up","reschedule","confirm_appointment","callback"]`, purely advisory to the model — the REAL validation and REAL spoken copy still go through the imported `PLACE_CALL_PURPOSES`/`renderPlaceCallOpener` used only inside function bodies, safe) and pinning the two lists identical via a direct unit test so they can never silently drift.
2. **`resend_failed_send` was silently missing THE FLOOR rule #3** (pause disclosed-and-lifted). Found on a final re-read against the WO's own floor rule ("applies to every verb here"), not by a test failure: without the fix, a resend to a paused contact would enqueue "successfully," the tool would report "queued," and the outbox drain would LATER silently cancel it (`blocked:"alex_paused"`) — a customer-safe outcome but a dishonest report (operator told "queued" for a send that was never going out). Fixed to match every other verb's shape exactly: disclose in preview, lift before enqueue, name it in the final summary. Regression test added.

Confirmed fixed: after both fixes, `npx tsc --noEmit` passed clean twice, the 8-file targeted re-run (my 4 files + `assistant.test.ts`/`assistant-flag.test.ts`/`assistant-reachability.test.ts`/`assistant-authz.test.ts`) passed 135/135, and the full suite is confirmed at the count in the gate tail above (0 failures).

## Every place I had to choose between two readings

1. **`custom_cadence`'s `next_fire_at`** — left `NULL` on the run row, never a real timestamp. Verified `advanceCadenceRuns` is wired to a live cron (`/api/cadence/advance`, `egress-session-gate.test.ts` confirms it's bearer-gated and real) and only recognizes `CADENCE_LIBRARY` keys; a real timestamp would let that sweep silently mark the run `'completed'` the moment the earliest step's time passed (its own "unknown cadence key" branch), which would ALSO break `cancel_cadence`'s ability to stop the remaining steps (`cancelCadence` requires `status==='active'`). This was proactively verified against source, not assumed — a regression test pins `next_fire_at === null` after confirm.
2. **"Recent touches" in the collision enumeration** sources from the pre-existing `calls` + recently-resolved `outbox` tables (7-day window, capped), not the touch ledger — §0's given contract is write-only (`recordTouchAttempt`/`settleTouchAttempt`, no read/query surface).
3. **"Enumeration re-runs at confirm and aborts on change"** with no persisted server-side session state available (every tool call in this codebase is stateless by design — `assistant-floor.ts`'s own law: "never trusts anything but the literal fields on THIS call, never conversation history or the prior echo"). Built a `collision_token`: a deterministic fingerprint of the enumerated collision set, echoed in the preview's `echo` object as a real (described) input-schema property, recomputed fresh at confirm and string-compared. Fails OPEN when no token is supplied (a model that doesn't echo it back isn't blocked); fails CLOSED on a mismatch (hands back a FRESH preview reflecting current reality, never a bare error — the operator/model still has a path forward).
4. **`resend_failed_send` reuses the ORIGINAL row's `purpose` tier**, never hardcodes `"transactional"` — so a marketing-tier resend still re-checks consent through `enqueueOutbox`'s own gate, rather than being silently downgraded to a laxer tier just because it's a retry.
5. **`cancel_scheduled_send`'s atomic UPDATE widens the WO's literal SQL** (`WHERE id=$1 AND status='pending'`) to also include the org-scope predicate (`whereOrg`) — an ADDITIVE safety scope matching this codebase's blanket org-isolation law everywhere else, never a narrowing of the WO's semantics.
6. **`send_booking_link` mints the token at PREVIEW time**, a narrow deliberate exception to "a preview never writes" — the WO explicitly requires the preview to show the resolved URL, and `ensureBookingToken` is idempotent and inert (reaches nobody, mints nothing customer-visible).
7. **`send_booking_link`'s operator-supplied custom body gets the resolved URL appended automatically if it never referenced `{url}`** — this verb's entire purpose is delivering a working link; a custom body that forgot the token must not ship linkless.
8. **`place_call`'s one-off VAPI dial carries a FRESH `randomUUID()` as the `cadenceRunId` metadata**, never a real row id and never a fabricated/prefixed string. Verified against `cadence-call-outcome.ts` source that both its "run not found" and "key not in `CADENCE_LIBRARY`" branches no-op cleanly (no throw, no cross-run interference) — chosen specifically because a non-UUID sentinel string would throw a Postgres type-cast error on literally every single `place_call` dial's end-of-call webhook (caught by the route's own try/catch, so not a crash, but a guaranteed, avoidable error-log line on every call).
9. **`custom_cadence`'s immediate call steps DO carry the REAL `cadence_runs.id`** (unlike `place_call`) — this means an ANSWERED call correctly auto-cancels the rest of that same custom plan via the existing webhook machinery, a verified-safe, deliberately-chosen emergent property, not an oversight.
10. **`check_stop_status` and `cancel_scheduled_send` classified `NO_CONFIRM_OK`** in `assistant.test.ts`'s confirm-coverage registry (matching the existing `cancel_cadence` precedent: read-only, or the safe "stopping" direction) even though `cancel_scheduled_send`'s own code still fully implements two-phase confirm — `NO_CONFIRM_OK` only means the registry doesn't REQUIRE the schema field, not that the verb lacks one. The other 4 write verbs (`place_call`, `custom_cadence`, `send_booking_link`, `resend_failed_send`) classified `CONFIRM_REQUIRED`.
11. **All 6 new tools registered together in the SAME `ASSISTANT_WRITES_LIVE==="1"` branch** of `allTools()` (matching `send_text`/`start_cadence`'s exact placement) rather than splitting the read-only `check_stop_status` into the always-available read branch — simpler, lower-risk, and consistent with `cancel_cadence`/`pause_alex` (also not "money" verbs) being gated the same uniform way.
12. **`contact_id`/`lead_id`/`outbox_id` kept OUT of every new schema's `required` array** (present as optional properties, validated at runtime) — specifically to stay clear of `assistant-reachability.test.ts`'s mechanical "every required `*_id` needs a declared supplier" gate. `outbox_id` has no DECLARED supplier in that test's hardcoded `ID_SUPPLIERS` map (a real, open gap at the mechanical-gate level) — though per the live-repo discovery above, A2's `query_crm` (universal read) explicitly includes `outbox` in its table list, so the id is likely already FETCHABLE in practice; someone should add an `outbox_id: ["query_crm"]` entry to that map so the mechanical gate reflects reality. This matches the established house pattern (`send_text`/`start_cadence` keep `lead_id`/`contact_id` out of `required` for the identical reason).
13. **place_call's preview masks the phone number's middle digits** (`(***) ***-6983`), unlike `send_text`'s full-number preview — per the WO's explicit instruction for this verb specifically, not a general house pattern.
