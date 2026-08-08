# BUILD REPORT — BL — Alex must never PROPOSE or write a time inside a booking blackout

Builder: Sonnet-5, judgment-zero. Staging id: **BL**.
Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/BL_SANDBOX` (repo copy minus node_modules/.next/.git, `pnpm install`, all gates run there).
Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/BL_STAGED_DELIVERABLE/`.
CRM repo copied from: `C:/Users/josep/Claude Gravity/mabrey-crm-app`, branch `showroom-integration` @ HEAD `c127add` (matched — verified via `git rev-parse --short HEAD` before copying).

## Gates (all foreground, inline)

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS (exit 0, zero output) |
| Unit tests (own file, isolated) | `npx tsx --test src/lib/assistant-appointment-write-blackout.test.ts` | ✅ 12/12 pass |
| Unit tests (full suite, unioned) | `npm test` | ✅ PASS — 3865/3865, 0 fail |
| Build | `npm run build` | ✅ PASS — compiled successfully |

### `npm test` final tally (verbatim, full unioned suite incl. my new file appended to package.json's hand-list)

```
ℹ tests 3865
ℹ suites 1080
ℹ pass 3865
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 441847.8825
```

3853 pre-existing tests + 12 new = 3865. Ran it TWICE: once before touching `package.json` (3853/3853,
proving zero regressions from the source edits alone) and once after appending my file to the hand-list
(3865/3865, the final union). Both green.

### Own-file isolated run (verbatim)

```
▶ schedule_appointment — proposed path (default) consults blackout
  ✔ a blacked-out date is refused outright — 'not offered', names the reason, zero write
  ✔ the SAME blacked-out call refuses on the bare preview too — no round-trip needed
  ✔ a NON-blacked date is completely unaffected — inserts proposed, audits, byte-identical to before
✔ schedule_appointment — proposed path (default) consults blackout
▶ schedule_appointment — confirmed:true path also consults blackout (already hard-gated by booking-core; message was wrong)
  ✔ a blacked-out date is refused with an HONEST message — never the old 'No lead found' mismap
  ✔ a NON-blacked date still books confirmed and texts, unaffected
✔ schedule_appointment — confirmed:true path also consults blackout
▶ move_appointment — target date consults blackout
  ✔ moving TO a blacked-out date is refused outright at preview — no confusing round-trip
  ✔ a confirm:true call carries the SAME refusal — never depends on confirm state
  ✔ a blackout added in the gap between preview and confirm is honestly refused, never 'appointment not found'
  ✔ a NON-blacked target date moves normally, unaffected
✔ move_appointment — target date consults blackout
▶ blackout range expiry — a range fully in the past gates nothing
  ✔ schedule_appointment onto an unrelated future date succeeds even with an old, expired range on file
✔ blackout range expiry — a range fully in the past gates nothing
▶ blackout-gate membership (WO-BL — the list that must not rot)
  ✔ every known appointment-proposing verb's source references the blackout check
  ✔ every assistant-*.ts file that raw-inserts an appointment row also references the blackout check
✔ blackout-gate membership (WO-BL — the list that must not rot)
ℹ tests 12
ℹ suites 5
ℹ pass 12
```

Also re-ran `assistant-debrief.test.ts` in full within both suite runs — the pre-existing "debrief — the
card" describe block (now including my two split tests) stayed green: 6/6, including
`homeowner_agreed:true — the card says it TEXTS, and books confirmed on write` (unchanged behavior,
proven by the SAME test still passing byte-for-byte).

### `npm run build` tail (verbatim, route table omitted — ~180 routes, all compiled, `/api/assistant`
present and unchanged size)

```
   Creating an optimized production build ...
 ⚠ Compiled with warnings in 10.9s
[... next-auth/jose DecompressionStream Edge Runtime notice — pre-existing, dependency-level,
     unrelated to any file touched here ...]
 ✓ Compiled successfully in 3.9min
   Skipping linting
```

Exit code 0 (confirmed via a separate `npm run build; echo $?` run → `0`).

## §1 — Enumeration with receipts

Grepped every `src/lib/assistant-*.ts` (non-test) for (a) `.insert(appointments)` / `.update(appointments)`
/ `bookAppointment(` / `rescheduleAppointment(` / `confirmAppointment(` / `cancelAppointment(`, and (b) any
preview/copy string naming a specific date. Full file list that touches the `appointments` table at all: 10
files. Verdicts:

| File:line | What it does | Verdict |
|---|---|---|
| `assistant-tools.ts` — `scheduleAppointmentTool`, `confirmed:true` branch (was ~1114, `bookAppointment(...)` call, no `allowBlackout`) | Books CONFIRMED via `bookAppointment` | **Gated already** (booking-core's own `isBlockedByBlackout` hard-blocks it — no override passed) — but the error-mapping on refusal was **a real bug**: `result.error === "blackout"` fell through to `writeFailure("lead_not_found", "No lead found with id ...")`, a false statement (the lead plainly exists). **FIXED** (see §2). |
| `assistant-tools.ts` — `scheduleAppointmentTool`, default/proposed branch (was ~1147-1189, raw `.insert(appointments)`, only `findConflict`-guarded) | Books PROPOSED via a raw insert | **GAP — the primary one.** Zero blackout awareness: no disclosure, no refusal. This is the file `assistant-debrief.ts`'s own header cites verbatim ("proposed path — byte-identical to today") as the pattern it mirrored — so the gap existed in TWO places from one root. Success message before the fix: `Scheduled a ${kind} appointment for ${name} on ${when} (ET).` — an unqualified success statement on a blacked-out day. This is the literal match for the WO's "worse, can say a blacked-out day is fine." **FIXED** (see §2). |
| `assistant-debrief.ts` — `resolveDebrief`, appointment block (was lines 416-423) | Computes `blackoutReason()` for both the confirmed AND proposed paths, but only the CONFIRMED path (via `bookAppointment(..., allowBlackout:true)`) ever consulted it at the WRITE layer | **Split verdict.** CONFIRMED branch: **gated already**, by deliberate, already-recorded judgment call (WO-R2A) — disclose-only, operator override, unchanged. PROPOSED branch (raw `.insert(appointments)`, `findConflict`-guarded only): **GAP**, explicitly named in the WO. **FIXED** (see §2). |
| `assistant-appointment-tools.ts` — `moveAppointmentTool` (preview ~547-559 before the fix; confirm branch's `rescheduleAppointment(...)` call, no `allowBlackout`) | Reschedules via `rescheduleAppointment` | **Split verdict.** The WRITE: **gated already** (`rescheduleAppointment` hard-blocks, no override ever passed here). The PREVIEW: **gap** — zero blackout disclosure, so an operator would preview a doomed move with no warning. The confirm-time error mapping: **gap/bug**, identical shape to schedule_appointment's — `result.error === "blackout"` fell into `` `No appointment found with id "${appointmentId}".` ``, false. **FIXED** (see §2). |
| `assistant-appointment-tools.ts` — `setAppointmentStatusTool` (`completed`/`no_show`/`cancelled`) | Never picks or writes a NEW date — flips status only, or routes `cancelled` through `cancelAppointment` (no blackout check by design, correctly — cancelling doesn't touch `startsAt`) | **Out of scope** — no date is ever proposed or written. |
| `assistant-appointment-tools.ts` — `cancelAppointmentTool` | Same reasoning — cancel never picks a date | **Out of scope.** |
| `assistant-blackout-tools.ts` — `setBookingBlackoutTool` | READS `appointments` (live-appointment count for the disclosure when adding/listing a range) | **Out of scope** — read-only against `appointments`; this is the tool that WRITES the blackout row itself, not one that could violate it. |
| `assistant-custom-cadence.ts` | READS `appointments` (eligibility check: is there an upcoming one) | **Out of scope**, and explicitly named as such in the WO ("touches are texts/calls, not Sean's calendar"). Confirmed by reading: no write to `appointments` anywhere in the file. |
| `assistant-start-cadence.ts` | READS `appointments` (no-show eligibility check) | **Out of scope** — read-only, no date proposed. |
| `assistant-history-tools.ts` | READS `appointments` (merged history/timeline view) | **Out of scope** — every appointment returned already exists with its own real status; never computes or offers an open slot. |
| `assistant-grounding.ts` | READS `loadBlackoutRanges` for the ambient "Booking blackouts: …" disclosure line | **Out of scope for a code change** (WO step 4 — receipt only, see §4). This is the ambient/model-facing layer the WO explicitly says not to rely on alone ("never rely on the model") — my §2 fixes are the TOOL-layer backstop this line's own "do not propose these dates" instruction was resting on unenforced. |
| `assistant-universal-read.ts` | Lists `"appointments"` as a readable table name for `query_crm`'s read surface (deep-access-gated, SELECT-only) | **Out of scope** — read-only by construction (the whole tool is a read-only SQL surface). |

**Explicitly out of scope per the WO, confirmed by reading (not just trusting the WO's framing):**
`custom_cadence`/outbox scheduling — grepped, no `appointments` write anywhere in that file, confirmed.
`send_booking_link` — sends the existing `/book` URL only; the grid it points at (`publicSlotGrid`) already
filters blackout dates at the source (`booking-public.ts`), so there is nothing for this tool itself to gate.

"Any 'reschedule'/'next available' composition anywhere in assistant-*" — swept every `assistant-*.ts` file
for `appointments` references (10 files, table above) and separately for `.insert(appointments)` specifically
(exactly 2 files: `assistant-tools.ts`, `assistant-debrief.ts` — both fixed). No other composition of a
date/time preview string exists outside the files listed above.

## §2 — What changed (the fixes)

All three fixes follow the same shape: check `blackoutReason(etDateOf(date), await loadBlackoutRanges(db))`
— REUSED, never re-implemented — as early as possible in `execute()`, before any preview is built, and
refuse outright (`writeFailure("blackout", ...)`) when it's non-null. None of the three fixed tools had an
existing operator-override lane (no `allowBlackout`-equivalent field on their schemas), so early refusal is
strictly more honest than a round-trip that was always going to dead-end — and it's re-checked FRESH on
every `execute()` invocation (preview AND confirm are separate calls; nothing is cached), closing the
"state moves in the gap" race the same way `findConflict`'s pre-check / `not_actionable` re-reads already do
elsewhere in this codebase. Register: "not offered", never "taken" — matches `booking-public.ts`'s own
documented distinction (`SlotUnavailableReason = "unavailable" | "taken"`) and `assistant-grounding.ts`'s
existing "Booking blackouts: … — do not propose these dates" phrasing.

**`src/lib/assistant-tools.ts`** (`scheduleAppointmentTool`):
- Import added: `blackoutReason, etDateOf, loadBlackoutRanges` from `@/lib/booking-blackouts` (line ~24).
- One shared check at line 1107-1114, before the `confirmed`/proposed branch split — covers BOTH paths.
- Defense-in-depth: `result.error === "blackout"` now handled explicitly at line 1166 inside the confirmed
  branch's error mapping (was silently mismapped to `lead_not_found`). In practice this branch is now
  unreachable except in the sub-millisecond intra-call window between the early check and the
  `bookAppointment` call itself — kept anyway, cheap and correctly written, same spirit as OS47's DB-level
  unique-index belt for the conflict race.
- Tool description text updated to disclose the new behavior to the model (documentation only — the WO's
  "never rely on the model" is honored; this doesn't gate anything, the code above does).

**`src/lib/assistant-debrief.ts`** (`resolveDebrief`):
- Same three-helper import added (line ~96, existing import line extended — `blackoutReason`/`loadBlackoutRanges`/`etDateOf` were already imported for the CONFIRMED path's disclosure; nothing new to add there).
- New check at line 443: `if (blackout && !homeownerAgreed)` → refuses (`error: "blackout"`), same pattern
  as this function's own pre-existing `invalid_kind`/`invalid_start` refusals (return `{error}` from
  `resolveDebrief`, which the tool's `execute()` surfaces on the FIRST preview call — no confirm round-trip
  needed, exactly like those siblings).
- The CONFIRMED branch (`homeowner_agreed:true`) is **completely unchanged** — still disclose-only, still
  passes `allowBlackout:true` to `bookAppointment`. This was a deliberate, already-recorded judgment call
  (WO-R2A) that the operator's real-time homeowner agreement is a legitimate override signal; this WO's own
  language ("non-confirmed appointment") scopes the gap to the OTHER branch. See STOP questions for why I
  did not extend the override to `schedule_appointment`'s confirmed branch too, despite the surface
  similarity.
- File header's judgment call #2 rewritten to describe the split (was describing only the confirmed case
  and a since-superseded observation about the proposed path having "no gate to bypass").

**`src/lib/assistant-appointment-tools.ts`** (`moveAppointmentTool`):
- Import added: `blackoutReason, etDateOf, loadBlackoutRanges` (line ~7).
- New check at line 559-566, placed after the `not_actionable` re-check and before the conflict pre-check /
  preview construction — refuses before a doomed preview is ever shown.
- Defense-in-depth at line 634: `result.error === "blackout"` now handled (was mismapped to
  `` `No appointment found with id "${appointmentId}".` ``). Unlike `schedule_appointment`'s narrow
  intra-call race, this one is REAL and human-timescale (preview and confirm are genuinely separate calls
  with operator think-time between them) — proven directly by a test that adds a blackout row in that exact
  gap (see §5).
- Tool description text updated (documentation only, same as above).

**Existing test corrected — `src/lib/assistant-debrief.test.ts`:** one pre-existing test,
`"a blacked-out appointment date is DISCLOSED but the operator may still proceed"`, on close reading
exercised the PROPOSED path (its `slots.appointment` never set `homeowner_agreed`) and asserted
`res.ok === true` — i.e. it was the live, passing encoding of the exact gap this WO closes. Split into two
correctly-scoped tests: PROPOSED now asserts `error: "blackout"` + zero write; CONFIRMED
(`homeowner_agreed:true`, added explicitly) keeps the original assertion, unchanged. Both pass. This is a
required correction, not scope creep — the WO's own step 5 names this exact case ("proposed-appointment on
a blacked-out date → refused with reason").

## §3 — The membership test (never rot)

`src/lib/assistant-appointment-write-blackout.test.ts`, `describe("blackout-gate membership...")`, two tests:

1. **Hand-list** (matches the house `OS48` "deep-gate membership" pattern in `assistant-deep-gate.test.ts`
   verbatim — same shape, `fs.readFile` + regex): `schedule_appointment` / `move_appointment` / `debrief` →
   each file's source must reference `blackoutReason(`/`loadBlackoutRanges(`/`loadBlackoutDates(`.
2. **Dynamic sweep** (stronger than a hand-list, which rots beside a growing set): reads every
   `src/lib/assistant-*.ts` file, and for any that contain `.insert(appointments)` — the exact bypass shape
   BOTH real gaps took (a raw insert instead of routing through booking-core, which enforces the check
   itself) — asserts it ALSO references the blackout check. A NEW verb that raw-inserts an appointment row
   is caught automatically, no list to remember to update.

**Verified these have real teeth**, not vacuous passes: ran a negative control (Node one-liner, not
committed) that strips the `blackoutReason(`/`loadBlackoutRanges(` calls from a COPY of `assistant-tools.ts`
in memory and confirms the detector regex flips to `false` — i.e. the exact same regression this test exists
to catch would in fact fail it.

## §4 — Grounding receipt (WO step 4 — no code change expected, receipted)

`assistant-grounding.ts`'s WO-R2C blackout line already has real test coverage
(`assistant-blackout-tools.test.ts`, `describe("grounding — booking blackout line")`, 4 tests, all green in
every run above) using RELATIVE date offsets (`Date.now() + N days`) — deliberately, so the coverage doesn't
bit-rot as calendar time passes, matching that file's own house convention. The most directly relevant of
those (`"appears when a range falls within the next 21 days..."`, a range starting `now+3days`) is exactly
the live shape: today is 2026-08-07, Sean's real row is Aug 10-12 — 3 days out.

Beyond citing that coverage, I ran a **one-time, uncommitted receipt script**
(`grounding_receipt.mts`, PGlite harness identical to the test files, deleted after use — never staged, no
time-bomb risk from hardcoding "Aug 10-12" into the permanent suite) that seeds a settings row shaped exactly
like the WO's description and calls `buildGroundingBlock()` for real against the ACTUAL system clock:

```
System clock right now: 2026-08-07T23:05:49.260Z
=== buildGroundingBlock() output ===
CURRENT CRM PICTURE (auto-refreshed; same data as your read tools):
Booking blackouts: Aug 10-12 (Sean unavailable) — do not propose these dates.
=== blackout line present: true ===
```

Confirmed live, end-to-end. One caveat: I do not have access to the real settings row's actual stored
`reason` text (never touched the real DB, per the hard rails) — `"Sean unavailable"` here is my best-guess
text matching the WO's own description, so this receipt proves the MECHANISM against the described shape,
not a byte-for-byte read of the production value.

## §5 — Behavior tests (WO step 5 — all four required cases)

All in `src/lib/assistant-appointment-write-blackout.test.ts` (12 tests) plus the 2 split tests in
`assistant-debrief.test.ts`:

- **Proposed-appointment on a blacked-out date → refused with reason**: `schedule_appointment` (proposed
  branch) and `debrief` (proposed branch) — both refuse with `error: "blackout"`, message names the reason
  text, zero DB write.
- **Non-blacked date → unchanged behavior**: explicit tests for `schedule_appointment` (both branches) and
  `move_appointment` on an open date, PLUS the entire pre-existing 3853-test suite staying green proves this
  mechanically for every path I didn't intend to touch, not just the ones I remembered to spot-check.
- **Move to a blacked-out date → refused**: `move_appointment`, both at bare preview and at an explicit
  `confirm:true` call (proves the refusal never depends on confirm state).
- **Blackout range expiry (a past range gates nothing)**: dedicated test — a range ending ~395 days before
  "now" (relative offset, not a hardcoded date, so it never bit-rots) must not gate an unrelated far-future
  date via `schedule_appointment`.

Bonus, beyond the WO's literal four: a **preview→confirm gap-race test** for `move_appointment` (blackout
row inserted BETWEEN a clean preview and its confirm call) — proves the check re-validates fresh on every
`execute()` invocation, not just at first preview, and that the confirm-time message is honest either way.

## STOP questions / judgment calls

1. **Did NOT extend `debrief`'s CONFIRMED-branch override (`allowBlackout:true` on real-time homeowner
   agreement) to `schedule_appointment`'s `confirmed:true` branch**, even though both represent "the
   homeowner explicitly agreed to this exact time." Kept `schedule_appointment`'s confirmed branch as a hard
   block (matching booking-core's un-overridden default), fixing only its error-message honesty. Reasoning:
   the WO scopes the gap explicitly to "propose a time or write a NON-confirmed appointment" — `debrief`'s
   override was a specific, already-recorded (WO-R2A) judgment call I was not asked to relitigate or extend,
   and doing so unilaterally would be a real behavior change with customer-facing consequence (a
   successfully-booked, blackout-day, customer-texted confirmation) that the WO never asked for. Flagging
   for Joseph/the orchestrator: if the intent IS for `schedule_appointment`'s confirmed branch to carry the
   same override as `debrief`'s, that's a one-line change (`allowBlackout: true` in the `bookAppointment`
   call at `assistant-tools.ts` ~line 1130) plus a preview-time disclosure line — I did not make it because
   the WO didn't ask for it and it changes what customers experience.
2. **Chose hard-refuse-at-preview over "disclose and let it through"** for all three gaps closed here (none
   had a pre-existing override lane on their own schema). The WO's own wording allowed either ("the tool
   refuses OR re-previews with `blackoutReason()`'s string") — hard-refuse was the more defensible default
   given `confirmAppointment`'s own documented invariant ("whoever picked that `startsAt` already went
   through `bookAppointment`, which DOES carry the check") would otherwise be silently violated by an
   ungated `proposed` row that could later be confirmed with zero check.
3. **`assistant-tools.ts`'s file-level comment ("proposed path — byte-identical to today") is now only
   true for non-blacked-out dates** — updated the comment in place rather than leaving it stale, since
   `assistant-debrief.ts`'s own header quotes it verbatim as justification for its own pattern; a future
   reader following that citation needs the caveat.

Zero items skipped. Everything the WO asked for is done; the one item above is a considered "did not extend
beyond the literal ask" call, not a gap.

## REGISTRATION

**None needed.** All three files touched (`assistant-tools.ts`, `assistant-debrief.ts`,
`assistant-appointment-tools.ts`) export tools that are ALREADY wired into `assistant.ts`'s `allTools()` —
this WO modifies existing verbs' internal gating, it does not add a new verb. No new export, no new tool
name, nothing for the orchestrator to register. `assistant.ts` / `assistant.test.ts` / `assistant-flag.test.ts`
were not touched, per the hard rail — confirmed by `diff` against the untouched sandbox copy (not staged;
not part of this deliverable).

## Files touched

Staged at `BL_STAGED_DELIVERABLE/` (repo-relative):

- `src/lib/assistant-tools.ts` — edited (§2).
- `src/lib/assistant-debrief.ts` — edited (§2).
- `src/lib/assistant-appointment-tools.ts` — edited (§2).
- `src/lib/assistant-debrief.test.ts` — edited (one pre-existing test corrected + split, §2).
- `src/lib/assistant-appointment-write-blackout.test.ts` — **new**, 12 tests (§3, §5).
- `package.json` — appended `src/lib/assistant-appointment-write-blackout.test.ts` to the end of the `test`
  script's file list. Nothing reordered or removed (verified: valid JSON, new entry present).

Not staged (throwaway, sandbox-only, deleted after use): `grounding_receipt.mts` (§4).

## House idioms copied (source cited)

- Membership-over-hand-list test shape — `assistant-deep-gate.test.ts`'s OS48 "deep-gate membership" test
  (`fs.readFile` + regex, `missing: string[]`, `assert.deepEqual(missing, [])`).
- "State moves in the gap" re-read-fresh-at-confirm — `assistant-appointment-tools.ts`'s own pre-existing
  `move_appointment` re-read (`fresh = await findAppointment(...)`) and its "re-reads at confirm" test shape
  in `assistant-appointment-tools.test.ts`, copied for my own gap-race test.
- `setBlackout()` PGlite fixture helper — copied verbatim from `assistant-debrief.test.ts` (it already had
  one; I match its exact shape in my new file rather than inventing a second one).
- Relative-date-offset test fixtures (never hardcode a date that will pass) — `assistant-blackout-tools.test.ts`'s
  own grounding-line tests.
- "not offered" / "taken" register — `booking-public.ts`'s own documented `SlotUnavailableReason` distinction.
- `autoConfirmRun`/`wrapWithAutoConfirm` bridging for the token-based confirm flow — `assistant-test-support.ts`,
  used exactly as `wo9h-assistant-writes.test.ts` and `assistant-appointment-tools.test.ts` already use it.
