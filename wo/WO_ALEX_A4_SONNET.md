# WO-A4 — Record & lifecycle verbs (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL:** copy the repo (minus node_modules/.next/.git) to your own sandbox,
`pnpm install` (**pnpm, never npm install**), do ALL work + ALL gates there, stage every
created/modified file at exact repo-relative paths into `.../scratchpad/A4_STAGED_DELIVERABLE/`
(under `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/`).
Never commit, never deploy, never run DDL, never touch .env.
Spec of record: the "⭐ FINAL CONSOLIDATED BUILD SPEC" section of
`C:/Users/josep/Claude Gravity/wo/ALEX_VERB_SPACE_20260807.md`. Silent → STOP that item,
record it, continue the rest. **Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.

## PARALLEL-WORK BOUNDARY (other builders own these — do not edit)
`src/lib/touch-ledger.ts` · `src/lib/assistant-grounding.ts` · `src/lib/speed-to-lead-call.ts` ·
`src/lib/assistant-universal-read.ts` · `src/lib/assistant-send-text.ts` ·
`src/lib/assistant-place-call.ts` · `src/lib/assistant-custom-cadence.ts` ·
`src/lib/assistant-outbox-control.ts` · `src/lib/assistant-booking-link.ts` ·
`find_contact_id` / `reassign_lead` / `pending_booking_requests`.
Your only edit to a shared file is your tool registrations inside `allTools()`.

## FLOOR (every verb here)
Two-phase confirm on every WRITE (copy `src/lib/assistant-send-text.ts`'s pattern) ·
**side-effect disclosure lives IN the returned preview string, never only in the description**
(must survive a model swap) · ambiguous referent ⇒ refuse and LIST candidates, never guess ·
after a write, the reply reflects a RE-READ of the row, not the intent.

## 1. `set_appointment_status` — `src/lib/assistant-appointment-tools.ts`
Transitions an appointment to `completed` | `no_show` | `cancelled`.
- `status` is a floor-forbidden field: declare it as an OWNED field, the way `set_task_status`
  does (read `src/lib/assistant-floor.ts` + `set_task_status`'s declaration and copy the idiom).
- Route through `src/lib/booking-core.ts` if it owns these transitions (grep it first); only
  fall back to a direct update if booking-core has no path — and say which you used, and why,
  in the build report.
- 🔴 **DISCLOSURE (in the preview string):** marking `no_show` makes the customer ELIGIBLE for
  the missed-appointment ladder. **Before building, VERIFY whether anything auto-enrolls on a
  no_show transition** (grep `events.ts`, `no_show` across `src/`), and:
  - if auto-enroll EXISTS → the preview must say "this will START the missed-appointment
    ladder (calls/texts her)" and the verb is treated as customer-reaching (STOP re-check at
    confirm).
  - if it does NOT → the preview says "this makes her eligible for the no_show ladder; nothing
    is sent until you start it."
  Report which you found, with the file:line receipt.

## 2. `cancel_appointment` / `move_appointment` — same file
- **Route through booking-core's supersede/cancel path ONLY.** Never raw drizzle updates on
  `appointments` — the public /book page writes the same rows and the DB unique index
  (`appointments_org_slot_uq`) arbitrates.
- `move_appointment` re-reads the appointment at confirm; a conflict (409 / unique violation)
  is translated to plain speech: `"that slot just got taken — here are the next open ones"`
  (fetch a few from the same availability source /book uses). Never surface a raw error.
- Preview discloses whether the customer gets a text (booking-core's own behavior — read it,
  state the truth; do not assume).

## 3. `add_lead` · `add_contact` · `edit_contact` — `src/lib/assistant-contact-tools.ts`
- `add_lead`: creates a contact (or attaches to an existing one when the phone matches — say
  which in the preview) plus a lead row, `source` = `"assistant"`, `source_detail` naming the
  operator's words. ⚠️ **DISCLOSE in the preview whether creating this lead ARMS an automatic
  follow-up ladder** — verify by reading the lead-intake path (`src/lib/events.ts` /
  `src/lib/site-lead.ts`) and state the truth with a file:line receipt in your report. If it
  does auto-arm, the preview says so plainly ("this will start the new-lead follow-up: a call
  then texts").
- `edit_contact`: name / phone / address / email. Phone changes are high-blast-radius — the
  preview shows old → new and warns that cadences key on the phone. Re-normalize via the
  house `normalizePhone`. **Address edit closes a known gap** (a repeat lead never updates an
  existing contact's address) — state in the tool description that this is the way to fix a
  stale address.
- `add_contact`: contact only, no lead.
- All three: duplicate detection FIRST (same phone / very-close name) → preview lists the
  match and asks which, rather than creating a second record.

## 4. `reschedule_cadence_step` — `src/lib/assistant-cadence-control.ts`
"Move the 2pm to 4." Shifts an ACTIVE run's `next_fire_at`.
- Input `{ cadence_run_id, at, confirm? }`. Resolve `at` with the same helper `send_text` uses;
  past times refused; outside the calling window → allowed but the preview echoes the REAL
  fire time the spine will use (never claim a time the spine will not honor).
- Use a **conditional UPDATE** guarding on the run still being `active` with the same
  `next_fire_at` you previewed; 0 rows ⇒ re-read and report what actually happened (it may
  have fired in between). Model on `claimCadenceRunForFire` in `src/lib/cadence.ts`.
- Preview lists the run's key, current step, current next-fire, and the queued outbox rows
  that belong to it (`meta.cadenceRunId`) — moving the run does NOT move already-queued rows;
  say so explicitly and offer nothing you cannot do.

## 5. `lead_history` (read) — `src/lib/assistant-history-tools.ts`
Everything that ever happened with one person, assembled SERVER-SIDE in ONE tool call (never
N model round-trips): calls (direction, outcome, duration, summary), texts both directions,
outbox rows incl. **pending / failed / DRAFT(`alex_suggested`)**, activities, appointments,
cadence runs, touch attempts if the table exists.
- Sort by EFFECTIVE time; a row held for the calling window renders at its HOLD time, labelled.
- **Three visual classes, explicitly labelled in the text output:** `LIVE` (pending/held),
  `DONE` (sent/delivered/failed — failed clearly marked), `DRAFT` (`alex_suggested` —
  "awaiting approval, will not send on its own").
- Empty result discloses exactly what was searched.
- Cap the output (most recent 40 events) and say so when truncated — a truncated history must
  never read as a complete one.

## 6. TESTS (register EVERY new test file by FULL PATH in package.json's `test` hand-list)
`src/lib/assistant-appointment-tools.test.ts` — status transitions write through the chosen
path · no_show preview contains the ladder disclosure matching what you VERIFIED · move
re-reads at confirm · a taken slot yields plain-speech alternatives, never a raw 409 · owned
`status` passes the floor.
`src/lib/assistant-contact-tools.test.ts` — duplicate phone detected and offered instead of
created · add_lead preview discloses auto-arm truthfully · phone edit warns about cadence
keying · address edit updates the contact.
`src/lib/assistant-cadence-control.test.ts` — past time refused · conditional update guards on
active+next_fire_at · 0-rows reports the true state · preview names queued rows that will NOT
move.
`src/lib/assistant-history-tools.test.ts` — pending/failed/draft rows appear in their correct
classes with the draft caveat · held rows render at hold time · truncation disclosed · empty
result names the search space.
Use the DB-test harness idiom from `src/lib/delete-rules.test.ts`.

## 7. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_A4.md`
Gate tails verbatim · files touched · STOP questions · **the two verification results with
file:line receipts (no_show auto-enroll? add_lead auto-arm?)** · whether booking-core owned
the transitions or you fell back · house idioms copied (name source files).
