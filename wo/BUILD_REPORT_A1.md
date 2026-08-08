# BUILD REPORT — WO-A1 (the attempt ledger + honesty fixes)

Builder: Sonnet-5, judgment-zero, sandbox protocol. Repo:
`C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/A1_SANDBOX/mabrey-crm-app`.
Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/A1_STAGED_DELIVERABLE/`.

No deploy performed. No DDL run against any database. No `.env*` file edited (sandbox
copies of `.env`/`.env.local` were read-only reference — the sandbox's `DATABASE_URL`
was never connected to; `tsx --test` does not auto-load it, confirmed empirically).

## GATES — ALL PASSING

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS — zero errors, zero output |
| Tests | `npm test` (`tsx --test`, 160 files incl. the 2 new ones) | ✅ PASS — see tail below |
| Build | `npm run build` (`next build`) | ✅ PASS — see tail below |

### tsc --noEmit tail
```
(no output — clean exit 0)
```

### npm test tail (final full run, confirmed)
```
ℹ tests 3381
ℹ suites 924
ℹ pass 3381
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 770158.0372
```
(First full run surfaced 21 files failing — a real circular-import TDZ crash
(design note 6) plus a foreign-key cleanup-order gap across 13 files, plus 2
assertion bugs in my own new grounding test. All root-caused and fixed; see
"Test-suite repairs" and design note 6 below. Final run: 3381/3381 green, 0 fail.)

### npm run build tail
```
 ✓ Compiled successfully in 8.8min
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                                Size  First Load JS
[... full route table, all ƒ Dynamic / ○ Static, no errors ...]
+ First Load JS shared by all                                103 kB
ƒ Middleware                                                 132 kB
```
Exit code 0. Zero `error`/`failed` matches anywhere in the full build log (checked by
grep over the complete output, not just the tail). The two Edge-Runtime warnings
about `CompressionStream`/`DecompressionStream` (from `jose`, a `next-auth`
transitive dependency) are pre-existing and unrelated to any file this WO touched.

## FILES TOUCHED

### Created (4)
- `scripts/apply-touch-attempts-ddl.mjs` — the DDL script (§1)
- `src/lib/touch-ledger.ts` — the ONE writer + the pinned outcome-mapping table (§2)
- `src/lib/touch-ledger.test.ts` — §5 test list, group 1
- `src/lib/assistant-honesty-fixes.test.ts` — §5 test list, group 2

### Modified — production code (9)
- `src/lib/db/schema.ts` — `touchAttempts` table + `touchChannelEnum`/`touchStatusEnum` +
  `TouchAttempt`/`TouchChannel`/`TouchStatus` type exports, placed after `takeoffRuns`
- `src/lib/speed-to-lead-call.ts` — §3a wiring (see "3a vs 3b" below)
- `src/lib/cadence.ts` — ONE line: `placeCadenceCall`'s call site now passes
  `contactId`/`leadId` through from `ctx` so cadence-call ledger rows carry the same
  links every cadence SMS/email row already gets. No other edit — §3b's own question
  (double-recording) needed zero code change; see below.
- `src/lib/outbox-transport.ts` — §3c wiring (the real SMS wire-send instrumentation)
- `src/lib/outbox.ts` — §3d wiring (simulated-row instrumentation)
- `src/lib/assistant-tools.ts` — §4b (`pending_booking_requests` window honesty) +
  §4e (`reassign_lead` in-rotation filter)
- `src/lib/assistant-send-text.ts` — §4c (`checkSendAtBounds` + wiring)
- `src/lib/assistant-reader-tools.ts` — §4d (`find_contact_id` required-params fix)
- `src/lib/assistant-grounding.ts` — §4f (org-scope on all 5 queries)

### Modified — test registration (1)
- `package.json` — appended both new test files' full paths to the `test` script's
  hand-list, at the end (unbroken alphabetical-ish tail the file already had going)

### Modified — forced test-suite repairs (13), all mechanical consequences of correctly
implementing the WO, NOT scope creep — see "Test-suite repairs" below for the full
reasoning on each class:
- `src/lib/assistant-send-text.test.ts` — TWO reasons: (a) stale hardcoded `send_at`
  ISO now genuinely in the past vs. the real clock — §4c's new past-refusal correctly
  started catching it; (b) FK-cleanup-order fix (below)
- `src/lib/api-booking.test.ts`, `appt-reminders.test.ts`, `assistant-start-cadence.test.ts`,
  `booking-confirm.test.ts`, `booking-core.test.ts`, `booking-public.test.ts`,
  `cadence-v2.test.ts`, `cadence.test.ts`, `events.test.ts`, `slack-commands.test.ts`,
  `text-alex-auto.test.ts`, `vapi-tools.test.ts` (12 files) — FK-cleanup-order fix only

**Total: 27 files** (4 created, 9 production code, 1 package.json, 13 forced
test-suite repairs).

## 🔴 STOP — §4a calling-window truth (no code change made)

**The WO's premise conflicts with the current code, and following the literal
instruction would make the codebase LESS honest, not more — the opposite of §4a's
purpose. I made NO edit for this item and am surfacing the conflict instead, per the
WO's own escape hatch: "do NOT silently reconcile code behavior... report the
discrepancy."**

**What the WO says:** "`isWithinCallingWindow` (`speed-to-lead-call.ts:224`) is
8am-9pm ET and is the truth. Fix the docs that disagree: `cadence.ts:402,429-430` say
'8am-8pm' — correct those comments to 8am-9pm ET."

**What the code actually does** (verified three independent ways):

1. **The function itself** (`speed-to-lead-call.ts:224-227`):
   ```ts
   export function isWithinCallingWindow(now: Date = new Date()): boolean {
     const hour = easternHour(now);
     return hour >= 8 && hour < 20;
   }
   ```
   `hour < 20` = before 8pm. This is **8am–8pm**, not 8am–9pm.

2. **Its own doc comment, immediately above** (`speed-to-lead-call.ts:213-219`):
   > "Calling-window guard: true ONLY when the time in America/New_York is
   > 08:00:00 ≤ t < 20:00:00 (8am–8pm Eastern)... ⚖️ LOCKED 8am-8pm ET (Joseph,
   > 2026-08-05): 'there's virtually no realm where you can be mad if you got a
   > phone call at 7:50pm.' Narrowed from the federal TCPA 8am-9pm window —
   > compliance-safe (inside the legal line, not on it)."

   This is a **named, dated, reasoned decision** by Joseph — not a stale leftover.

3. **The existing test suite's own describe title** (`outbox.test.ts:33`):
   `describe("nextWindowOpening — 8am-8pm ET calling window (LOCKED 2026-08-05)", ...)`
   — `nextWindowOpening` (outbox.ts) doesn't reimplement the window; it directly
   reuses `isWithinCallingWindow` (outbox.ts:36: "NOT reimplemented here — one clock,
   one place to audit"), so it inherits the same 8pm bound. Its own internal comment
   confirms it: "at/after 8pm ET → push to TOMORROW's opening" (not 9pm).

**So `cadence.ts:401,429`'s "8am-8pm" comments are ALREADY CORRECT** — they match
live, deliberately-locked behavior. If I'd "corrected" them to say 8am-9pm as
literally instructed, I would have written a **false statement** into the one file
§4a exists to make honest.

**What IS actually stale — the opposite direction:** `outbox.ts` header comments
(lines 33 and 84) still say "8am-9pm America/New_York" / "8am-9pm ET TCPA calling
window", describing `nextWindowOpening`, which (per point 3 above) is now
demonstrably 8am-8pm in practice. These are the comments that disagree with reality —
in `outbox.ts`, a file §4a never named.

**Broader picture (context, not something I touched):** the literal string
`8am-9pm` also appears, unedited, in:
- `src/lib/assistant-send-text.ts:161` — the `send_text` tool's own input-schema
  description ("Sends outside 8am-9pm ET are held to the window.")
- `src/lib/assistant-start-cadence.ts`
- `src/lib/ad-schedule.ts`
- `src/lib/speed-to-lead-call.ts` itself, in FOUR other spots not named by §4a: the
  `SpeedToLeadOutcome` type's own comment (`outside_window` variant), a JSDoc bullet,
  a `console.info` log line, and one more inline comment — all describing the SAME
  function whose own primary doc comment (point 2 above) correctly says 8pm.

**Why I did not expand scope to fix any of these:** §4a named exactly one file
(`cadence.ts`) and exactly two behaviors ("comments only," never code). The
discrepancy I found runs the OPPOSITE direction from what §4a assumed, and touching
`outbox.ts` or the other four files would be improvising a different fix in files the
WO never authorized me to edit for this purpose — the same "typist, not designer"
discipline that stopped me from "correcting" `cadence.ts`.

**The actual open question for Joseph:** is 8pm or 9pm the *intended* final bound?
The spec-of-record's §2 FIXES list separately names "window unification to ONE
source (nextWindowOpening; TCPA 9pm bound... Joseph's late-lead ruling + spine truth
reconciled)" as its own line item — worded as if a 9pm-wide unification is DESIRED
future work, distinct from and not yet landed by this WO. If that's right, the
correct fix is not a comment edit at all: it's changing `isWithinCallingWindow`'s
`hour < 20` to `hour < 21` (behavior, explicitly out of scope for §4a — "Do NOT
change any behavior"), and *then* every comment cited above becomes simultaneously
true without further editing. I did not make that change either — it's a real
behavior change (compliance-adjacent: TCPA calling hours) that belongs to whoever
owns that separate "window unification" work item, with Joseph's explicit sign-off,
not a Sonnet-5 judgment call buried inside an "honesty fixes" WO.

**Recommendation:** resolve the 8pm-vs-9pm intent explicitly (this is the one
substantive fact this WO couldn't safely infer), then either (a) if 8pm stays locked
— fix `outbox.ts`'s two stale comments + the other 5 files' `8am-9pm` mentions to
say 8pm, or (b) if 9pm is truly wanted — widen `isWithinCallingWindow` itself (one
line) and every comment becomes correct as a side effect. Either is a small, clean
follow-up; I did not want to guess which one and silently ship the wrong one into a
TCPA-adjacent compliance surface.

## §3a vs §3b — which one covers the cadence call path (explicitly answered)

**3a alone covers it. 3b required zero code change.**

`fireCadenceStep` (`cadence.ts:1148`) calls `placeCadenceCall` (`speed-to-lead-call.ts`)
for every `call`-channel step. §3a instruments `placeCadenceCall` itself: I renamed
its existing body to `placeCadenceCallCore` and added a thin exported
`placeCadenceCall` wrapper that runs the core logic, then calls the shared
`recordCallAttempt` helper on the way out — covering **every** return path
(dormant/skipped/outside_window/error/fired) in one place, per the WO's own "wrap the
body, record once on the way out" option. Since `fireCadenceStep` calls
`placeCadenceCall` (not the internal `*Core`), every cadence call it places now
writes a ledger row automatically — §3b's separate instrumentation would be a
double-write.

I verified this by reading (WO's own instruction), not assuming: `cadence.ts:1156-1158`
still has its original `console.error(\`[cadence] call failed for ${ctx.source}\`, ...)`
— **left untouched, exactly as the WO says to when 3a covers it** ("leave cadence.ts's
console.error alone as a log"). The ONE edit I made to `cadence.ts` (contactId/leadId
passthrough into the `placeCadenceCall` call, see "Files touched" above) is
additive plumbing for §3a's own ledger-row completeness, not a §3b recording change.

## The outbox.ts nextWindowOpening discrepancy §4a asked me to check for

§4a's text: *"If `src/lib/outbox.ts`'s `nextWindowOpening` uses different bounds,
report the discrepancy... do NOT silently reconcile code behavior."*

Checked directly: `nextWindowOpening` does **not** hardcode its own bounds — it
calls `isWithinCallingWindow` directly (`outbox.ts:90`) and only computes the
*next opening instant* from that same boolean. So there is no behavioral fork
between the two functions today; they share one clock, exactly as `outbox.ts`'s own
header claims ("NOT reimplemented here — one clock, one place to audit"). The
discrepancy that DOES exist is the comment-vs-reality one covered fully above.

## House idioms copied (source cited per instance, per the WO's instruction)

| What | Copied from |
|---|---|
| DDL script shape (host print, guarded `CREATE TYPE`, `IF NOT EXISTS`, indexes, read-back verify, exit-code gate) | `scripts/apply-takeoff-ddl.mjs` |
| Schema table shape (`idPk()`/`orgId()`/`createdAt()`/`updatedAt()` helpers, `pgEnum` + `$inferSelect` export, placed near the end) | `src/lib/db/schema.ts`'s `takeoffRuns` (WO-T1) |
| `getScope()`/`whereOrg(scope, col)` org-predicate idiom | `src/lib/assistant-reader-tools.ts` (e.g. `listDocumentsTool`) |
| Window-disclosing empty-state note phrasing | `src/lib/assistant-tools.ts`'s `recentCallsTool` (`` `No calls in the last ${hours} hours.` ``) |
| "Neither param supplied" early-return idiom (`{count:0, ..., note:"Give me a..."}`) | `src/lib/assistant-reader-tools.ts`'s `listDocumentsTool` ("Give me a lead_id or a job_id.") |
| Small pure decision fn, unit-tested directly, consumed by an impure caller (`checkSendAtBounds`) | `src/lib/outbox.ts`'s `outboxGateDecision` / `resolveDemoOrLiveStatus` |
| `writeFailure(reason, message, extra?)` return shape | `src/lib/assistant-floor.ts`, used throughout `assistant-tools.ts` |
| Lazy dynamic `import()` to dodge a static circular-import cycle | `src/lib/assistant-send-text.ts`'s `outboxLib()` |
| Injectable test seam for a DB-touching side effect inside an otherwise-hermetic unit-test file (`recordTouch`, mirroring `stampFirstResponse`) | Same file, `src/lib/speed-to-lead-call.ts`'s existing `FireSpeedToLeadDeps.stampFirstResponse` |
| PGlite + `pg_trgm` + `pushSchema` + `globalThis.__mabreyDb` test harness | `src/lib/wo9h-assistant-writes.test.ts`, `src/lib/outbox-demo-gate.test.ts` |
| `next/headers` `cookies()` mock-patch for flipping `getScope()` in tests | `src/lib/reads-scope-pages-a.test.ts` / `src/lib/money-lifecycle.test.ts` (independently reapplied per that pattern's own documented reason: each `tsx --test` file is its own process) |
| "Hardcoded list beside a growing set rots by default" — derived `CADENCE_SOURCE_KEYS` from `CADENCE_LIBRARY` instead of hand-listing cadence keys | Named as a standing law in `src/lib/assistant-reachability.test.ts`'s own comments |

## Design notes (small judgment calls, none rising to a STOP — all low-risk, documented for transparency)

1. **`source` label for `fireSpeedToLead`'s ledger rows.** The WO's §3a table pins
   `source` only for the cadence-key case; `fireSpeedToLead` (the t=0 auto-dial) has
   no cadence key. I used the literal `"speed_to_lead"` — mirrors the `actor` value
   that same code path already produces, self-describing, zero ambiguity.
2. **`contactId`/`leadId` threaded through the ledger rows.** Not explicitly named
   in §3a's "pass through cadenceRunId, cadenceKey, actor" list, but the schema (§1)
   explicitly carries these FKs and the WO's own mission statement is "did anyone
   call Ann" — unanswerable without linking the row to a contact/lead. Threaded
   through both `placeCadenceCall` (from `cadence.ts`'s `FireStepCtx`) and
   `fireSpeedToLead` (from the `lead.created` payload's `contact.id`/`lead.id`).
3. **`recordTouch` injectability.** `placeCadenceCall`/`fireSpeedToLead` didn't
   previously take a `db` param at all (they call `getDb()` internally via the
   existing `stampFirstResponse` pattern). Making the NEW ledger-write ALSO
   injectable (default: `getDb()` + `recordTouchAttempt`) keeps
   `speed-to-lead-call.test.ts`'s 30+ existing hermetic test cases DB-free, exactly
   matching why `stampFirstResponse` is injectable in the first place. Verified
   empirically: `tsx` does not auto-load `.env.local` (no `DATABASE_URL` at test
   time), so the un-injected default would otherwise fall to the dev-only local
   PGlite fallback and silently no-op (never fail a test) — but would add file I/O
   and console noise across dozens of pre-existing tests. This was avoidable, so I
   avoided it.
4. **§3d scoped to the TRUE `simulated` branch only.** `enqueueOutbox` has three
   OTHER branches that insert `status:'cancelled'` rows (unresolved-merge guard, the
   G8 demo-non-555 hard-cancel, and the suppression/consent gate refusal) — I did
   NOT additionally ledger those. §3d's literal text is "if the transport marks a
   row simulated" — only the real demo/`OUTBOX_LIVE`-unset fork does that; the three
   cancelled-branches already self-document via their own `meta.blocked` reason on
   the `outbox` row. Flagging as a possible future extension, not doing it
   unprompted.
5. **No real email transport exists.** §3c's heading says "The SMS/email send
   point" and tells me to check both `outbox-transport.ts` and `outbox.ts`. I did,
   and confirmed there is no email wire anywhere in this codebase today —
   `outbox-transport.ts`'s drain hard-filters to `channel === 'sms'` only; no
   `sendEmail`-shaped function exists. Instrumented the one channel that actually
   sends. Nothing to fix — this is a fact, not a gap I introduced or left open.
6. **A real circular-import bug, found and fixed during this WO (not pre-existing).**
   My first cut of §3c put a *static* top-level `import { CADENCE_LIBRARY } from
   "@/lib/cadence"` in `outbox-transport.ts`, with an eager
   `new Set(CADENCE_LIBRARY.map(...))` at module-load time. `system-activity.ts`
   ALSO imports `CADENCE_LIBRARY`, and `cadence.ts` itself imports
   `@/lib/outbox` → (now) `@/lib/touch-ledger` — a real cycle that crashed with
   `ReferenceError: Cannot access 'CADENCE_LIBRARY' before initialization` the
   moment any test touched that path (surfaced by `wo10b-activity.test.ts`, which
   imports `system-activity.ts`). Fixed by converting to the SAME lazy
   `await import("@/lib/cadence")` pattern I'd already used in `outbox.ts` for the
   identical reason (`cadence.ts` imports `outbox.ts` directly) — `actorForOutboxSource`
   is now `async` in both files. Caught by the full test-suite run, not by static
   review; flagging so the pattern is understood if it recurs elsewhere.
7. **`reassign_lead`'s ambiguous-match candidates are NOT filtered to in-rotation.**
   §4e's two clauses ("filter the roster" + "say so explicitly for a named-but-
   ineligible match") pull in different directions for the 2-exact-matches case. I
   filter the 0-match SUGGESTION list to in-rotation only (suggestions stay
   actionable) but leave the ambiguous-match list showing real matches regardless of
   rotation (a genuine person matched the query; if the user then re-specifies by
   exact id, the single-match branch's new explicit refusal catches an ineligible
   pick correctly).
8. **`checkSendAtBounds` is a new companion function, not a change to
   `resolveSendAt`'s return contract.** `resolveSendAt` is already directly unit-
   tested in `assistant-send-text.test.ts` (`Date | "invalid" | null`, unchanged).
   Adding a `"past"` sentinel there would have lost the resolved ISO the pinned
   error message needs to echo. Kept `resolveSendAt` a pure NL→Date resolver and
   added the bounds check as its own small pure function in the same file,
   immediately below it — matches this codebase's own established idiom (see house
   idioms table).

## Test-suite repairs — forced by correctly implementing the WO, not scope creep

**1. `assistant-send-text.test.ts`'s hardcoded `send_at: "2026-08-07T13:00:00Z"`.**
This was ALREADY silently invalid before I touched anything: the real wall clock at
the time I ran the gates was 2026-08-07 15:32 UTC (`date -u`), already past the
hardcoded value. §4c's new past-time refusal correctly started rejecting it — the
prior test only ever "passed" by accident of timing. Replaced the magic string with
a value computed relative to `Date.now()` (24h out), so the test is now correct
*and* immune to this class of rot going forward. This is a direct, unavoidable,
one-test consequence of implementing §4c exactly as specified — I did not touch this
test until the gate told me it was now failing for the CORRECT reason.

**2. Thirteen files' cleanup-order fix — `touch_attempts` deleted before `outbox`.**
The WO's own §1 DDL pins `outbox_id uuid REFERENCES outbox(id)` (a real FK, no `ON
DELETE` clause specified — I implemented it exactly as written, default `NO ACTION`).
Once real `touch_attempts` rows exist (via §3c/§3d, exercised by dozens of
pre-existing PGlite-backed tests that legitimately drain/enqueue outbox rows), any
test's `afterEach(() => db.delete(outbox))` now hits a foreign-key violation unless
`touch_attempts` is cleared first. This is a first-order, unavoidable, structural
consequence of adding the pinned FK to a table many existing tests already exercise
indirectly (via `enqueueOutbox`/`drainOutbox`/`advanceCadenceRuns`). I added
`await db.delete(touchAttempts);` immediately before each affected file's
`db.delete(outbox)` call (which was already first in each cleanup, before
`leads`/`contacts` — so this single insertion point also satisfies `touch_attempts`'
`contact_id`/`lead_id` FKs, since those tables get deleted later in the same
sequence). Files: `api-booking`, `appt-reminders`, `assistant-send-text`,
`assistant-start-cadence`, `booking-confirm` (3 call sites), `booking-core`,
`booking-public`, `cadence-v2`, `cadence`, `events`, `slack-commands`,
`text-alex-auto` (2 call sites), `vapi-tools`.

I considered NOT pinning the FK (or adding `ON DELETE SET NULL`) specifically to
avoid this ripple, but the WO's DDL is presented as an exact SQL block, and
production code never hard-deletes `outbox` rows (`cancelOutbox` only updates
`status`) — so the FK is correct as pinned; the fallout is confined to test fixtures,
which is exactly what I fixed.

## Test counts

- New: `src/lib/touch-ledger.test.ts` — 16 tests, 3 suites, all passing.
- New: `src/lib/assistant-honesty-fixes.test.ts` — 17 tests, 5 suites, all passing.
- Both new files together (standalone run): 33 tests / 8 suites, 33 pass, 0 fail.
- Full suite (160 files, incl. both new ones): 3381 tests / 924 suites, **3381 pass,
  0 fail**.

## STOP questions — count and location

**1 STOP** (§4a — calling-window truth; no code change made; full discrepancy
report above). All other §4 items (4b–4f) were implemented as specified with no
open questions.
