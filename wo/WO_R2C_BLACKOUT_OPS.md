# WO-R2C — Blackout ops: Alex sets and sees Sean's days off (Sonnet-5, judgment-zero)

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` FIRST. Your staging id: **R2C**.

## THE MISSION
Sean's unavailable days already work end-to-end (`src/lib/booking-blackouts.ts`, settings key
`booking_blackouts`, live in prod: Aug 10-12 blocked). Two gaps remain:
1. Joseph must run a CLI script to change them — he wants to say it in Slack.
2. Alex cannot SEE them, so it will happily propose a blacked-out time in a debrief or a
   custom cadence.

## 1. `set_booking_blackout` — `src/lib/assistant-blackout-tools.ts`
Two-phase confirm. Actions: `add` · `remove` · `list`.
```
{ action: "add"|"remove"|"list", start?: "YYYY-MM-DD", end?: "YYYY-MM-DD",
  reason?: string, confirm?: boolean }
```
- `add`: `end` defaults to `start` (a one-day block). Reversed range refused. A range longer
  than 60 days refused (fat-finger guard) with a named reason.
- 🔴 **THE DISCLOSURE THAT MATTERS:** before confirming an `add`, query `appointments` for
  live rows (`status in ('proposed','confirmed')`) whose `starts_at` falls inside the range.
  If any exist, the preview LISTS them by day/time/customer-first-name and says plainly:
  **"blacking these dates out does NOT cancel these appointments — cancel or move them
  yourself."** This is the whole reason a human confirms.
- `remove`: matches by `start` date; refuses (listing what exists) if no range starts there.
- `list`: ranges + the expanded date list + a count of live appointments inside each.
- Writes the same `settings.booking_blackouts` shape the existing module reads — reuse
  `loadBlackoutDates` / the range type from `src/lib/booking-blackouts.ts`; do not duplicate
  the parsing.
- Malformed existing settings value must never break the verb (mirror the module's
  ignore-and-warn behavior).
- Live (not dormant): it changes availability, never contacts a customer.

## 2. ALEX SEES BLACKOUTS — ambient grounding
`src/lib/assistant-grounding.ts` gains a compact line when any blackout range covers today or
the next 21 days, e.g.:
`Booking blackouts: Aug 10-12 (Sean unavailable) — do not propose these dates.`
- Absent/empty settings → the line is OMITTED entirely (never "no blackouts", which is noise).
- Keep it one line; grounding is a budget.
- ⚠️ Grounding queries are org-scoped as of WO-A1 — match that pattern exactly.

## 3. `lead_history` / availability truthfulness
If `src/lib/assistant-history-tools.ts` or any read tool surfaces upcoming availability, it
must respect blackouts. Read it; if it does not touch availability, say so in the report and
skip — do NOT invent a change.

## TESTS — `src/lib/assistant-blackout-tools.test.ts` (+ a grounding case)
PGlite harness; **delete `touchAttempts` BEFORE `outbox`**.
add creates the range and read-back matches · reversed range refused · >60 days refused ·
**an add covering a date with a live appointment lists it and says it will NOT be cancelled** ·
confirm actually writes; preview writes nothing · remove by start date · remove of a
non-existent start refuses and lists what exists · list shows expanded dates · malformed
existing value does not throw · grounding line appears only when a range is within 21 days and
is omitted when none · grounding query is org-scoped.
