# WO — Ladder v2 "relentless-15" (judgment-zero build, CRM repo only)

Every judgment in this WO is already made (Fable plan → Kimi 17-finding audit → disposition
ledger `KIMI_LEDGER_LADDER_V2_20260806-2210.md`). Where this WO is silent, STOP and say so in
your report — do not guess. Build + test ONLY: no deploys, no DB connections, no env pulls, no
scripts that need DATABASE_URL. Repo: the CRM worktree you are in.

## 0. HOUSE LAWS (violating any = rejected)
- node:test; NEW test files registered BY FULL PATH in package.json "test" (hand-listed).
- `npx tsc --noEmit` clean · `npm test` fully green (baseline 3107) · `npm run build` clean.
- Match surrounding style; comments explain WHY; read neighboring file headers first.
- NEVER edit: `new_lead_followup` (the OLD key — 2 real customers mid-run), anything under
  `scripts/`, deploy config, env files. NEVER touch VAPI config.
- Import cycles: `assistant-*` files sit on a cycle through `cadence.ts` (see
  assistant-start-cadence.ts header). New leaf modules import cleanly; when in doubt, lazy
  `await import()` inside function bodies (house pattern).

## 1. Engine: wall-clock steps (the ONE engine change)
`CadenceStep` gains optional `atHourET?: number` (mutually exclusive with `afterHours`; tsc
should not enforce — a runtime guard in startCadence/advance returns `{ok:false,
error:"bad_step_def"}` on a step carrying both or neither).
- Next-fire for an `atHourET` step = the NEXT FUTURE instant where America/New_York wall-clock
  reads that hour:00 — computed with TZDate ("compute the wall hour in ET, then convert to an
  instant"; NEVER add 24h to a UTC instant). Each step's fire time is computed AT
  fire/advance time of the previous step, not precomputed at enroll.
- DST test vectors REQUIRED: across Nov 1 2026 (fall back) and Mar 8 2027 (spring forward),
  a 9 AM beat lands at 9:00 ET wall-clock on both sides.
- Sweep-claim atomicity: in `advanceCadenceRuns`, the per-run claim becomes a single
  conditional `UPDATE cadence_runs SET … WHERE id = ? AND status = 'active'` whose row-count
  gates the fire (0 rows = claimed/cancelled elsewhere → skip). neon-http has no transactions;
  the conditional UPDATE is the arbiter.

## 2. The new cadence: key `new_lead_followup_v2` (NEW — never modify the old key)
Purpose `transactional`. Steps:
- **Step 0:** `afterHours: 0.25` (+15 min) · channels ["call"] · smsOnNoAnswer = COPY #1.
- **Steps 1..15:** `atHourET` beats — 9, 14, 18 — repeating for the **5 calendar ET days
  following the enroll date**. Encode as 15 steps each carrying `atHourET` (9/14/18 cycle) and
  a `dayOffset` is NOT needed: advance computes "next future occurrence", and the run ends by
  the exhaustion rule below.
- **ENTRY RULE:** the first grid beat is the next grid hour whose instant is ≥ (beat-0's
  ACTUAL fire time + 2 h). **COLLIDING BEATS ARE CONSUMED, NEVER PUSHED** — the grid never
  drifts; total touches ≤ 16 and that is the honest spec.
- **EXHAUSTION:** after the 18:00 beat of enroll-date + 5 days (ET), the run goes
  `completed / end_reason "exhausted"` even if fewer than 16 beats fired. Emit the terse Slack
  exhaustion line (§6).
- **DEAD NUMBER:** 2 CONSECUTIVE dials ending failed/busy/invalid (endedReason class) with
  duration < 8s → cancel run `end_reason "dead_number"` + terse Slack line.
- **Windows:** grid hours are inside 8–8 by construction; step 0 inherits the existing
  window-hold (no new code).
- **Taper:** registry flag `registry:cadence:ladder_taper` (default absent=OFF), read
  PER-BEAT at fire time: when ON, beats on enroll-date+3/+4/+5 with `atHourET === 14` are
  consumed unfired.

## 3. Copy — the EXACT pool (ASCII only; render-tested; no edits)
Vars: `{firstName}` (fallback "there" when empty; strip non-GSM-7 from interpolations),
`{bookingLink}` (see §4), phone literal (919) 645-0762.
1. "Hey {firstName}, it's Alex with Mabrey Roofing - just tried you about the free roof
   inspection. Grab any time that works here: {bookingLink} or call (919) 645-0762. Reply STOP to opt out."
2. "Hey {firstName}, Alex with Mabrey Roofing - pick any day that works and we'll be there: {bookingLink}"
3. "The inspection is free and takes about 30 minutes - straight answers, no pressure. Times here: {bookingLink} - Mabrey Roofing"
4. "Hey {firstName}, Alex with Mabrey Roofing. Mornings and evenings both open this week: {bookingLink}"
5. "If the roof's got years left, we'll say so and get out of your hair. 10 seconds to book: {bookingLink} - Mabrey Roofing"
6. "Hey {firstName}, Alex with Mabrey Roofing - still happy to take a look whenever suits you: {bookingLink}"
7. "Were you still looking to get the roof checked out, {firstName}? Open times from Mabrey Roofing: {bookingLink}"
8. "Quick one from Mabrey Roofing - want us out this week? Tap a day, done: {bookingLink}"
9. "Hey {firstName}, roof stuff is easier to catch early. Free look, your schedule: {bookingLink} - Mabrey Roofing"
10. "Alex with Mabrey Roofing - let us know whenever you want that free inspection: {bookingLink} or call (919) 645-0762. Reply STOP to opt out."
**Rotation table (beat → copy #):** 0→1 · d1: 9am→2, 2pm→3, 6pm→4 · d2: 5, 6, 7 · d3: 8, 9, 2 ·
d4: 3, 5, 6 · d5: 7, 9, 10. A consumed beat consumes its copy slot (no re-use logic).
Tests: every rendered string ≤320 chars, GSM-7 clean, contains "Mabrey Roofing" and a resolved
link or phone; #1 and #10 contain "STOP".

## 4. Booking link plumbing
- At v2 enroll: `ensureBookingToken(db, leadId)` (idempotent — probe-confirmed). Store nothing;
  at TEXT enqueue time resolve `{bookingLink}` = `https://mabreyroofing.com/book?t=<token>`.
- **Token-mint/lookup failure at render:** send the text WITHOUT the link sentence — the
  builder implements per-variant link-sentence removal such that grammar survives (each
  variant's link clause is droppable: "…: {bookingLink}" → strip the clause). A literal
  `{bookingLink}` in a sent SMS is a rejected build; add an outbox-side guard: any body
  containing "{" + "}" merge braces at enqueue → the row is created `cancelled`
  `meta.blocked:"unresolved_merge"` + console.error.

## 5. Triggers + gates
- **F1 gate:** `cancelCadence(db, runId, reason)` ADDITIONALLY cancels pending outbox rows
  whose `meta.cadenceRunId === runId` (status pending → cancelled, meta.blocked
  "run_cancelled"). Test trio: booked minute-14 (no call), minute-17 (call fired, queued text
  DIES), minute-28 (same via later cancel).
- **Enroll branch (events.ts `lead.created`):** funnel leads (`source_detail LIKE
  'quote_funnel%'`; NULL → non-funnel) → enroll `new_lead_followup_v2` with step 0 LIVE
  (no skipFirstStep — but note step 0 has afterHours 0.25 so nothing fires inline; verify
  startCadence handles a non-zero first step without skip/defer flags by scheduling it — if it
  fires step 0 inline today for afterHours>0, use `deferFirstStep: true` which parks at step 0
  with nextFireAt = its due time; STATE in your report which path you took and why).
- **Dial retirement:** `shouldFireSpeedToLead` returns false for funnel leads (same predicate).
  Non-funnel leads: dial unchanged + v2 enroll WITH `skipFirstStep` (their t=0 dial is touch 1).
- **Intake response:** the funnel intake route's response JSON gains `bookingUrl` (minted
  token) — locate the /quote intake route (site-lead / funnel ingest), additive field only.
- Consent gate on enroll: UNCHANGED (consent === true auto-enrolls, others don't).

## 6. Terse Slack call reports (ALL VAPI call posts — one composer, `src/lib/slack.ts`)
Replace the narrative+transcript post with ONE line:
`📞 {who} · {dur} · {outcome} · {linkage}` where:
- `{who}` = "First Last" if matched else the dialed number; append " (#2)" when two active
  leads share a first name that day (skip if complex — then always "First Last").
- `{dur}` = "16s" / "2m 10s".
- `{outcome}` (from the machine-transcript classifier + booking state): `answered - booked
  {Day} {time}` · `answered, not booked - {classifier one-line summary}` · `hung up early
  (<20s)` · `voicemail (nothing left)` · `screener` · `no answer` · `dead number`.
- `{linkage}` = "lead: First Last" when matched to an open lead · "orphan" otherwise.
- Voicemail-classified call with duration > 10s → SECOND line: `⚠️ opener leaked to VM ({dur})`.
- Exhaustion (from §2): `📞 run exhausted · {n} touches · no contact · {who}`.
- Transcript + AI summary: CRM-only (remove from Slack entirely). BOOKED + lead-alert posts:
  UNTOUCHED.
- Pin every outcome-class format with a test.

## 7. Tests (register by FULL PATH) — minimum set
Engine wall-clock (incl. both DST vectors, entry rule, consumed-collision, exhaustion day-5,
taper per-beat, conditional-UPDATE claim) · v2 shape + rotation table + rendered-copy
assertions · F1 trio · enroll branch (funnel live-step-0 / non-funnel skip) · dial retirement
(funnel no-dial, non-funnel dial) · intake response bookingUrl · unresolved-merge outbox guard ·
dead-number cancel · terse Slack formats · old-key untouched pin (a mid-ladder
`new_lead_followup` run's remaining schedule is BYTE-IDENTICAL before/after this change).

## 8. REPORT BACK (raw data)
Files changed + one-line each · the step-0 scheduling path you took (§5) and why · test
counts + names of new files · any WO silence you hit (STOPPED, not guessed) · out-of-scope
observations (not fixed).
