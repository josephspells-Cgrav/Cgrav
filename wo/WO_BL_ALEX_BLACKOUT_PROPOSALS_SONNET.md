# WO-BL — Alex must never PROPOSE or write a time inside a booking blackout

**Read FIRST:** `wo/WO_R2_COMMON.md` (all rules apply) with these OVERRIDES:
- Staging root: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/BL_STAGED_DELIVERABLE/` (repo-relative paths, CRM only).
- CRM repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` branch `showroom-integration` @ HEAD `c127add`.
- 🔴 **GATES IN THE FOREGROUND, inline, never backgrounded.**
- Build report: `wo/BUILD_REPORT_BL.md`.

## Context
`booking_blackouts` (settings row) is LIVE — Sean is out Aug 10-12. The three PRIMARY slot
surfaces already read it (the /book grid, voice `check_availability`, booking-core's
`bookAppointment` write path), and the grounding block carries a "Booking blackouts: …" line
(WO-R2C). The REMAINING GAP (handoff-named): assistant paths that PROPOSE a time or write a
non-confirmed appointment do NOT consult blackouts. `src/lib/assistant-debrief.ts`'s own
header says it: the **proposed-appointment path is a plain `findConflict`-guarded insert with
no blackout gate** — Alex can land a `proposed` appointment on a day Sean is out, and worse,
can *say* a blacked-out day is fine.

Helpers already exist — REUSE, never re-implement: `src/lib/booking-blackouts.ts`
(`loadBlackoutDates` · `isBlackedOut` · `blackoutReason` · `loadBlackoutRanges`).

## The work
1. **Enumerate with receipts.** Grep every `assistant-*.ts` tool for paths that (a) INSERT or
   UPDATE an appointment row in any status, or (b) compose a preview/copy string naming a
   specific date or day. For each: file:line + verdict (gated already / gap / out-of-scope).
   Known candidates: `assistant-debrief.ts` (appointment slot, proposed insert) ·
   `assistant-appointment-tools.ts` (set/move/cancel — check the move/set target-date path
   and its preview) · any "reschedule"/"next available" composition anywhere in assistant-*.
   EXPLICITLY OUT OF SCOPE (state why in the report): `custom_cadence` + outbox scheduling
   (touches are texts/calls, not Sean's calendar — blackouts govern appointments, not sends) ·
   `send_booking_link` (the /book grid already filters).
2. **Close every gap at the TOOL layer** (never rely on the model): before writing/proposing a
   date that falls on a blacked-out day, the tool refuses or re-previews with
   `blackoutReason()`'s string in the SAME register booking-core uses ("not offered" truth,
   never "taken" — those are different truths). The refusal/disclosure lives in the preview
   string the tool RETURNS (survives a model swap), before any confirm can land it.
3. **Test the LIST, not just the behavior** (the debrief-gate lesson): add a membership-style
   test that reads each appointment-writing assistant tool's source and FAILS if it doesn't
   reference the blackout check — so the next appointment-touching verb can't ship outside the
   gate silently.
4. **Grounding receipt:** verify (test or receipt) the R2C grounding line actually renders for
   the live Aug 10-12 row shape — no code change expected, receipt it.
5. Behavior tests: proposed-appointment on a blacked-out date → refused with reason ·
   non-blacked date → unchanged behavior (byte-identical previews where untouched) · move to a
   blacked-out date → refused · blackout range expiry (a past range gates nothing).

## Gates + report
- `npx tsc --noEmit` · `npm test` · `npm run build` — FOREGROUND, tails verbatim.
- New tests by FULL PATH in the hand-list · PGlite teardown: `touchAttempts` before `outbox`.
- NO edits to `assistant.ts` / `assistant.test.ts` / `assistant-flag.test.ts` — REGISTRATION
  section in the report if anything needs wiring (none expected; you touch existing tool files).
- `wo/BUILD_REPORT_BL.md`: the enumeration table with verdicts · gate tails · receipts · STOPs.
You never deploy; the orchestrator integrates, re-runs gates, deploys.
