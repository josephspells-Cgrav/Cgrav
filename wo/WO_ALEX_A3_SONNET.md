# WO-A3 — Customer-reaching verbs (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL:** copy the repo (minus node_modules/.next/.git) to your own sandbox,
`pnpm install` (**pnpm, never npm install**), do ALL work + ALL gates there, stage every
created/modified file at exact repo-relative paths into
`.../scratchpad/A3_STAGED_DELIVERABLE/` (under
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/`).
You never commit, never deploy, never run DDL, never touch .env.
Spec of record: the "⭐ FINAL CONSOLIDATED BUILD SPEC" section of
`C:/Users/josep/Claude Gravity/wo/ALEX_VERB_SPACE_20260807.md` (everything above it is
superseded history). Where this WO is silent → STOP that item, record it, continue the rest.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.

## PARALLEL-WORK BOUNDARY (do not edit these — other builders own them)
`src/lib/touch-ledger.ts` (NEW, owned by A1 — you CONSUME its contract, see §0) ·
`src/lib/assistant-grounding.ts` · `src/lib/speed-to-lead-call.ts` ·
`src/lib/assistant-universal-read.ts` (NEW, A2) · `src/lib/assistant-send-text.ts` ·
`find_contact_id` / `reassign_lead` / `pending_booking_requests`.
You create NEW files and register tools inside `allTools()` — that registration line is your
only edit to shared verb files.

## §0 CONTRACT YOU CODE AGAINST (A1 ships it; assume it exists)
```ts
// src/lib/touch-ledger.ts
recordTouchAttempt(db, { channel:"call"|"sms"|"email", toAddress, actor, source?, status?,
  outcome?, detail?, externalId?, outboxId?, cadenceRunId?, contactId?, leadId?, meta? })
  : Promise<{id:string}|null>   // NEVER throws
settleTouchAttempt(db, id, { status, outcome?, detail?, externalId? }): Promise<void>
```
If the file does not exist in your sandbox, CREATE A MINIMAL STUB matching this signature so
you can compile and test, put the stub in a clearly-marked file
`src/lib/touch-ledger.STUB-DO-NOT-STAGE.ts`, and DO NOT stage it. Say so in your report.

## THE FLOOR (non-negotiable, applies to every verb here)
1. **Two-phase confirm ALWAYS** — copy the exact pattern from `src/lib/assistant-send-text.ts`
   (preview quotes the EXACT body/destination; confirm re-runs every guard).
2. **STOP/suppression is unclimbable** — re-check at confirm, never overridable.
3. **A pause is DISCLOSED and LIFTED, never obeyed** when the operator explicitly asks for the
   action (house ruling) — mirror `send_text`'s existing handling exactly.
4. **Side-effect disclosure lives IN the preview string returned by the tool** (code), never
   only in the description — it must survive a model swap.
5. **Ship-dormant:** `place_call` and `custom_cadence` are gated behind settings rows and
   refuse when absent. Copy the gate pattern from `src/lib/assistant-start-cadence.ts`
   (`start_cadence_enabled`). Keys: `place_call_enabled`, `custom_cadence_enabled`.
6. Every attempt records to the touch ledger (§0).

## 1. `place_call` — `src/lib/assistant-place-call.ts`
Dials a lead/contact NOW through the same VAPI path cadences use.
- Gate: `place_call_enabled` (absent ⇒ refuse, naming the setting).
- **Spoken copy is NOT freeform.** Input `purpose` is an ENUM of blessed purposes, each with a
  PINNED opener template (a spoken sentence is gone the instant it lands — there is no confirm
  window on the wire):
  - `follow_up` → `"Hi {first}, this is Alex with Mabrey Roofing following up on the estimate request you sent in. Wanna get that free inspection on the calendar?"`
  - `reschedule` → `"Hi {first}, this is Alex with Mabrey Roofing about your roof inspection. I wanted to see about moving that to a better time for you."`
  - `confirm_appointment` → `"Hi {first}, this is Alex with Mabrey Roofing, just confirming your roof inspection. Does that still work for you?"`
  - `callback` → `"Hi {first}, this is Alex with Mabrey Roofing returning your call. How can I help?"`
  A freeform opener is REFUSED with a named reason pointing at the purpose enum.
- Calling window: reuse `isWithinCallingWindow` — outside it, REFUSE (a call cannot be
  queued the way an SMS can) and say when the window opens.
- Preview shows: who (name + masked-tail number), the EXACT opener that will be spoken, the
  purpose, and any live ladder/appointment on that person (from `list_cadence_runs`-style
  read — disclose, do not act).
- On confirm: dial via the house cadence-call path, record the touch attempt with actor
  `"assistant"`, source `place_call:<purpose>`, mapping the outcome union exactly as A1's WO
  pins it. Report the TRUE outcome word — never "called" on a `dormant`/`error` result.

## 2. `custom_cadence` — `src/lib/assistant-custom-cadence.ts`
Operator-designed follow-up: "start a cadence at 11am, again at 3, again at 7."
- Gate: `custom_cadence_enabled`.
- Input: `{ contact_id | lead_id, steps: [{ at: string, channel:"sms"|"call", body?: string,
  purpose?: <place_call purpose> }], confirm? }`. `at` accepts ISO or natural times resolved
  the way `send_text`'s `resolveSendAt` does (reuse it — import, don't reimplement); a time
  that cannot be read is REFUSED, and a resolved time in the past is REFUSED.
- **Copy law:** an SMS step's `body` is OPERATOR-DICTATED (like `send_text`) or, if omitted,
  refuses — this verb never invents customer-facing copy. A `call` step uses the §1 purpose
  templates only.
- **ONE live custom ladder per handset:** the run's `cadence_key` is the literal
  `custom_outreach` for every custom cadence. This makes the existing partial unique index
  (`cadence_runs_active_dedupe_uq` on `(dedupe_key, cadence_key) WHERE active`) do the work:
  a second custom ladder on the same phone is refused by the DATABASE. On that refusal the
  tool reports the existing run and offers to cancel-then-start (a second confirm), never
  silently stacking.
- **COLLISION LAW (the heart of this verb):** before the preview, enumerate EVERYTHING already
  aimed at that phone — active `cadence_runs`, pending `outbox` rows (incl. `alex_suggested`
  DRAFTS, labelled as drafts that will never fire on their own), upcoming appointments, and
  recent touches. The preview PROPOSES per item — keep / cancel / leave-alone — and **acts
  only on confirm**. Manual/assistant-sourced outbox rows are NEVER auto-cancelled; they are
  listed for the operator to choose. **Re-run the enumeration at confirm** and abort with a
  diff if it changed.
- Rows generated by the run carry `meta.cadenceRunId` so the existing `cancelCadence` drain
  cancels them as a unit.
- Order of writes on confirm: cancel-old BEFORE insert-new (a crash must lose a touch, never
  double one).

## 3. `cancel_scheduled_send` — `src/lib/assistant-outbox-control.ts`
- Input `{ outbox_id, confirm? }`. Preview quotes the body + destination + scheduled time.
- On confirm: **single conditional UPDATE** `SET status='cancelled' WHERE id=$1 AND
  status='pending'`. **0 rows → re-read the row and report its TRUE terminal state**
  (`"it already went out at 4:02pm"` / `"that row was already cancelled"`). Never say
  "cancelled" for a row the drain already fired.
- Also in this file: `resend_failed_send` — takes a `failed` outbox row, previews it, and on
  confirm enqueues a NEW row through `enqueueOutbox` (every gate re-runs; never flip the old
  row's status back to pending).

## 4. `send_booking_link` — `src/lib/assistant-booking-link.ts`
Mints (or reuses) the lead's self-serve booking token and texts the link.
- Reuse the existing token-minting path in the booking-public lib — do NOT write tokens
  yourself; grep for where `leads.booking_token` is lazily minted and call that.
- Body is a PINNED template: `"Hi {first} — here's a link to pick a time for your free roof
  inspection: {url}"` (operator may supply a custom body; then it is operator-dictated copy).
- Preview shows the exact body INCLUDING the resolved URL, and the destination number.
- Sends through `enqueueOutbox` (purpose transactional), records the touch attempt.

## 5. `check_stop_status` — read-only, same file as §3
Given a phone/contact: is this person suppressed / STOP'd / DNC / paused? Returns the reason
and the timestamp. Empty result discloses what it searched (`suppressions` + contact flags).

## 6. TESTS (register EVERY new test file by FULL PATH in package.json's `test` hand-list)
`src/lib/assistant-place-call.test.ts` — dormant refusal names the setting · freeform opener
refused · each purpose renders its pinned opener verbatim · outside-window refusal states the
opening time · preview shows masked number + exact opener · outcome mapping (fired/error/
dormant) reported truthfully · ledger recorded once per attempt.
`src/lib/assistant-custom-cadence.test.ts` — unreadable/past time refused · missing SMS body
refused · second custom ladder on the same phone hits the dedupe index and is reported with a
cancel-then-start offer · collision enumeration lists active runs + pending outbox + drafts
(drafts labelled) · nothing is cancelled without confirm · manual rows never auto-cancelled ·
enumeration re-runs at confirm and aborts on change · generated rows carry meta.cadenceRunId.
`src/lib/assistant-outbox-control.test.ts` — cancel on a pending row succeeds · cancel on an
already-sent row reports the true state and does NOT claim cancellation · resend creates a NEW
row and never mutates the failed one · check_stop_status discloses its search space.
`src/lib/assistant-booking-link.test.ts` — token reused when present, minted when absent ·
preview contains the resolved URL · suppressed recipient refused at confirm.
Use the existing DB-test harness idiom (see `src/lib/delete-rules.test.ts` /
`src/lib/assistant-start-cadence.test.ts`).

## 7. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_A3.md`
Gate tails verbatim · files touched · STOP questions · whether the A1 ledger existed or you
stubbed it · house idioms copied (name the source file per instance) · every place you had to
choose between two readings, with the reading you took.
