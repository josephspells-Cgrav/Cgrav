# WO-B1 — Booking blackout dates (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL:** sandbox copy (minus node_modules/.next/.git), `pnpm install` (**pnpm,
never npm**), all work + all gates in the sandbox, stage created/modified files at exact
repo-relative paths into `.../scratchpad/B1_STAGED_DELIVERABLE/` (under
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/`).
Never commit. Never deploy. **Never write to any database** (the orchestrator sets the real
blackout row). Never touch .env.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.
Silent → STOP that item, record it in the build report, continue the rest.

## ⚠️ PARALLEL WORK — six other builders are in this repo right now
**DO NOT TOUCH:** `src/lib/assistant-*` (any file) · `src/lib/touch-ledger.ts` ·
`src/lib/agent-loop.ts` · `src/lib/db/schema.ts` · `src/lib/cadence.ts` ·
`src/lib/speed-to-lead-call.ts` · `src/lib/takeoff-*` · `scripts/takeoff-*`.
**YOUR FILES:** `src/lib/booking-blackouts.ts` (new) · `src/lib/booking-public.ts` ·
`src/lib/scheduling.ts` · `src/lib/booking-core.ts` · `src/lib/vapi-tools.ts` ·
`scripts/set-booking-blackout.mjs` (new) · your new tests · `package.json` test list.

## THE SITUATION (why this exists)
The operator's client (the roofer who runs every inspection himself) is unavailable
**Mon Aug 10, Tue Aug 11, Wed Aug 12 2026**. Those days must stop being offered to
homeowners. He will be unavailable on other days in the future — so **this WO builds a
reusable blackout mechanism, not three hardcoded dates.** Nothing may require a redeploy to
change a date.

**PROBED FACTS (established before this WO — do not re-derive, but do not contradict):**
- ZERO appointments exist on Aug 10-12, and zero upcoming appointments exist at all. So this
  change cancels nothing and no customer must be notified.
- No blackout/unavailability mechanism exists anywhere in the codebase today.
- **THREE independent surfaces offer or accept times** — all three must respect blackouts, or
  the voice agent will offer days the booking page refuses:
  1. `publicSlotGrid()` in `src/lib/booking-public.ts` — the self-serve `/book` page
  2. `freeSlots()` in `src/lib/scheduling.ts` — consumed by `check_availability` in
     `src/lib/vapi-tools.ts` (the VOICE agent's spoken availability)
  3. `booking-core.ts`'s write paths (`bookAppointment`, `rescheduleAppointment`,
     `confirmAppointment`) — the shared write boundary

## 1. `src/lib/booking-blackouts.ts` — ONE source of truth

Storage: a `settings` row, key **`booking_blackouts`**, value:
```json
{ "ranges": [ { "start": "2026-08-10", "end": "2026-08-12", "reason": "Sean unavailable" } ] }
```
`start`/`end` are **inclusive ET calendar dates** in `YYYY-MM-DD`. Absent row ⇒ no blackouts
(the feature is inert until a row exists — that is the correct default).

```ts
export interface BlackoutRange { start: string; end: string; reason?: string }
export async function loadBlackoutDates(db: Db): Promise<Set<string>>  // expanded ET yyyy-mm-dd
export function isBlackedOut(etDate: string, blackouts: Set<string>): boolean
export function etDateOf(instant: Date): string                        // ET yyyy-mm-dd for an instant
export function blackoutReason(etDate: string, ranges: BlackoutRange[]): string | null
```
Rules: malformed rows are IGNORED with a `console.warn` and treated as no-blackout (a broken
settings value must never take the booking page down); ranges expand to a Set of individual
ET dates; a range whose `end` < `start` is ignored the same way. Read the settings row the
same way the house reads other settings rows (grep `from(settings)` for the idiom).

## 2. `/book` — `src/lib/booking-public.ts`

**2a. `publicSlotGrid`:** load blackouts once, then skip a blacked-out day exactly the way
Sunday is skipped today (`continue` WITHOUT incrementing `added`) so the page still offers a
full set of real days.

**2b. 🔴 WIDEN THE WALK BOUND — this is load-bearing, not polish.** The loop is bounded
`d <= DAYS_OFFERED + 2`, which only had to absorb Sundays. Three blackout days plus a Sunday
would exhaust that bound and render a NEARLY EMPTY booking page at the highest-intent moment
in the funnel. Change the bound to **`d <= 21`** (a hard cap so a pathological settings value
cannot loop forever) while keeping `added < DAYS_OFFERED` as the real terminator. If fewer
than `DAYS_OFFERED` days are found within 21 days, return what was found — never throw.

**2c. `isOfferedOpenSlot`** is documented as "the one gate between a client-sent string and
`bookAppointment`" — it MUST also reject blacked-out slots. Read it and make it consult the
same blackout source. This is the guard for a stale browser tab: a homeowner who loaded the
grid before the blackout was set and taps Monday must be refused at the write boundary.

**2d. Honest refusal copy.** Find how the `/book` UI reports a refused slot (the existing
409 path says the slot "just got taken"). A blackout is NOT a taken slot — saying so is a
lie. Add a distinct reason so the page can say something true, e.g.
`"we're not available that day anymore — pick another"`. If the API shape needs a
`reason: "unavailable" | "taken"` discriminator, add it; keep the existing "taken" behavior
byte-identical for real conflicts. **You may edit `mabrey-roofing`'s /book UI only if that
repo is present in your sandbox — it is a SEPARATE repo (`C:/Users/josep/Claude Gravity/mabrey-roofing`) and is NOT yours to edit here.** If the copy change requires that repo,
STOP that item, describe the exact change needed, and report it.

## 3. Voice agent — `src/lib/scheduling.ts` + `src/lib/vapi-tools.ts`
`freeSlots(from, to, confirmed, now)` is pure — keep it pure. Add an OPTIONAL final parameter
`blackoutDates?: Set<string>` and skip any slot whose ET date is in it. Then in
`vapi-tools.ts`'s `check_availability`, load blackouts (it has db access) and pass them
through. **Verify by reading:** every other caller of `freeSlots` must keep working with the
parameter omitted — list every caller in your build report and state that each still compiles.

## 4. Write boundary — `src/lib/booking-core.ts`
Add the blackout check to `bookAppointment` (and `rescheduleAppointment` if it picks the new
time) as a refusal that returns the existing `BookingConflict`/`BookingError` shape with a
distinct reason — do NOT invent a new return type; match what callers already handle.

⚖️ **OPERATOR OVERRIDE (deliberate asymmetry — implement exactly):** customer-driven paths
(the public `/book` route, the voice agent) are HARD-BLOCKED. Operator-driven paths (the CRM
UI, the Slack assistant's `schedule_appointment`, `confirmAppointment`) must be able to
proceed — the operator may know something the calendar doesn't. Implement as an optional
`allowBlackout?: boolean` on the booking input, default `false`; the public route and voice
tool never pass it; operator callers pass `true` **only where they already exist** — do NOT
edit `assistant-*` files (another builder owns them); instead expose the flag and note in
your report that the assistant wiring is the orchestrator's integration step.

## 5. `scripts/set-booking-blackout.mjs` — the operator's no-deploy path
CLI: `node scripts/set-booking-blackout.mjs --db-env <path> --add 2026-08-10:2026-08-12 --reason "Sean unavailable"`
plus `--remove <start>` and `--list`. Reads/writes the single settings row, prints the
resulting ranges AND the expanded date list as a read-back. Copy the env-file-reading and
read-back-print idiom from `scripts/apply-takeoff-ddl.mjs`. **Do not run it.**

## 6. TESTS (register EVERY new test file by FULL PATH in package.json's `test` hand-list)
`src/lib/booking-blackouts.test.ts` — range expansion inclusive on both ends · malformed
value ⇒ empty set + no throw · reversed range ignored · ET date boundary correctness (an
instant at 11:30pm ET on Aug 9 is NOT Aug 10; an instant at 00:30 ET Aug 10 IS).
`src/lib/booking-public-blackout.test.ts` — a blacked-out day is absent from the grid ·
**the grid still returns DAYS_OFFERED days when 3 consecutive days are blacked out** (the
2b regression — assert the count explicitly) · a Sunday inside a blackout doesn't double-skip ·
`isOfferedOpenSlot` returns false for a blacked-out slot that is otherwise free.
`src/lib/scheduling-blackout.test.ts` — freeSlots omits blacked-out days · freeSlots with the
parameter omitted is byte-identical to today's behavior (assert against a fixture).
`src/lib/booking-core-blackout.test.ts` — bookAppointment refuses a blacked-out slot on the
customer path · succeeds with `allowBlackout: true` · the refusal shape matches what callers
already handle.

## 7. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_B1.md`
Gate tails verbatim · files touched · STOP questions · **every caller of `freeSlots` and
confirmation each still compiles** · what the `/book` refusal copy needs (and whether it
lives in the other repo) · whether `isOfferedOpenSlot` needed its own change or inherited it ·
house idioms copied (name the source file per instance).
