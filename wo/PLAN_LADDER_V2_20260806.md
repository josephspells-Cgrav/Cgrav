# PLAN — "Relentless-15" new-lead ladder v2 + composition fixes (OS47, Fable-authored)

Joseph's directive, 2026-08-06 10:01pm ET, verbatim intent: *"if the appointment doesn't get
scheduled after 15 minutes → call, no answer → text 2 minutes after. Then 9 AM / 2 PM / 6 PM
attempts — call, no answer, text — for five days. No voicemail ever. Make sure lead-generated
and appointment-scheduled notifications both fire. Terse Slack call reports."* Confirmed scope
+ three defaults he accepted: retire the instant t=0 dial for funnel leads · booking link in
every text · taper as config defaulting OFF.

## A. What exists (all probe-confirmed today — the plan composes, it does not invent)
1. `startCadence` engine: relative `afterHours` steps, `skipFirstStep`/`deferFirstStep`, window-hold,
   registry timing read-through. Sweep = `advanceCadenceRuns` via `/api/cadence/advance` cron **every 15 min**.
2. Call→text mechanic: cadence CALL fires; **`smsOnNoAnswer` is sent ~2 min later by the VAPI
   end-of-call webhook only when unanswered** — exactly his "text 2 minutes after the call."
3. VAPI voicemail detection ARMED tonight (non-blocking, `provider:"vapi"`), `voicemailMessage=""`
   → machine calls end clean, nothing left. Post-call classifier (machine-transcript.ts) files
   truth; `call_answered` auto-cancel is now trustworthy.
4. Booking kills ladders (`cancelRunsForContact(contact,"appointment_booked")` inside `bookAppointment`).
   BOOKED Slack ping = the appointment-scheduled notification. Lead alert = lead-generated. Both live.
5. Self-serve /book live (token, 6 days, 9/11/1/3/5/6 slots, 7pm cutoff). `ensureBookingToken` mints per lead.
6. Intake auto-enroll: `events.ts` `lead.created` → speed-to-lead dial (t=0) + `startCadence("new_lead_followup", skipFirstStep)` — **gated on `consent === true`** (Ann, consent:false, got neither).
7. Stop triggers live: inbound reply · callback · answered · STOP/suppression · booking.

## B. The ladder spec
**Key:** replace `new_lead_followup`'s shape (same key — every existing consumer keeps working).

| Beat | When | What |
|---|---|---|
| 0 | **+15 min** after lead | CALL → unanswered → TEXT +2 min |
| 1..15 | **9:00 AM · 2:00 PM · 6:00 PM ET daily**, 5 calendar days | CALL → unanswered → TEXT +2 min |

- **Wall-clock engine extension** (the one real engine change): `CadenceStep` gains optional
  `atHourET: number`. For such steps, next-fire = the next FUTURE occurrence of that ET hour
  (TZDate math, DST-safe). Relative steps unchanged. The 15-min sweep cron grants ≤15-min accuracy — acceptable.
- **Collision guard:** a grid beat fires only if ≥2 h since the run's previous touch (a 5:50 pm
  lead's +15 min call at 6:05 pm must not be followed by the 6:00 pm grid beat… nor 9 pm same-day; first grid beat = next 9 AM).
- **Exhaustion:** after the day-5 6 PM beat → `completed / exhausted`.
- **No voicemail ever:** VM detection ends the call; the unanswered path still fires the text (the text IS the message).
- **Window:** 9/14/18 ET are all inside 8–8 by construction; step 0 at +15 min inherits the
  existing window-hold (a 9 pm lead's first call holds to 8 am — correct and already law).
- **Taper config:** registry flag `ladder_taper` default OFF; ON = days 3–5 skip the 2 PM beat.
- **Consent gate unchanged:** consent:true auto-enrolls (today's law). consent:false/null stays
  manual via `start_cadence` (Ann-class). NOT widened by this build.

## C. Copy — 16 texts, rotation pool of 10, all carry `{bookingLink}`
Seeded from the six Sean-blessed lines; STOP rides text #1 only (A2P filing); ≤320 chars;
GSM-7; no pricing. Draft pool (Joseph eyeballs, tweaks welcome; “perfect” not required per his call):
1. (beat 0) "Hey {firstName}, this is Alex with Mabrey Roofing — just tried you about the free
   roof inspection you requested. Grab a time that works here and you're set: {bookingLink} Reply STOP to opt out."
2. "Hey {firstName}, just checking back. Pick any day that works and we'll be there: {bookingLink}"
3. "The inspection is free and takes about 30 minutes — straight answers, no pressure. Times here: {bookingLink}"
4. "Hey {firstName}, Alex with Mabrey Roofing. Mornings and evenings both open this week: {bookingLink}"
5. "If the roof's got years left, we'll say so and get out of your hair. 10 seconds to book: {bookingLink}"
6. "Hey {firstName}, still happy to take a look whenever suits you: {bookingLink}"
7. "Were you still looking to get that roof inspected, {firstName}? Open times: {bookingLink}"
8. "Quick one — want us out this week? Tap a day, done: {bookingLink}"
9. "Hey {firstName}, roof stuff is easier to catch early. Free look, your schedule: {bookingLink}"
10. "Let us know if you ever want that inspection — book anytime here: {bookingLink}" (final-day closer)
Assignment: beat 0 → #1; beats 1-15 rotate #2-#9 morning/afternoon/evening-appropriate; last beat → #10.
`{bookingLink}` = `https://mabreyroofing.com/book?t=<token>`, token minted at enroll (`ensureBookingToken`).

## D. Funnel t=0 dial retirement
`shouldFireSpeedToLead` gains: if the lead's `source_detail` contains `quote_funnel` → NO instant
dial (they are on /book with a 15-minute window; dialing them mid-page is today's clunk). All
other sources (inbound-call leads, referral, imports w/ consent) keep the instant dial. The
ladder covers funnel leads from beat 0.
🔴 REQUIRED PAIRING: /quote success screen must surface the booking link (the CRM intake
RESPONSE already tells the form what to say — extend it to carry `bookingUrl`; the site renders
"Pick your time now" instead of only "Alex is calling"). Without this, retiring the dial removes
a touch and gives nothing back.

## E. Terse Slack call reports
Replace the narrative call post with ONE line:
`📞 {name|number} · {dur} · {outcome phrase} · {linkage}` — outcome phrases: `answered → hung up
mid-question` / `voicemail (nothing left)` / `screener` / `no answer` / `booked {day time}`.
Transcript + AI summary stay CRM-side only. BOOKED/lead alerts unchanged.

## F. Tests + sandbox (builder gates)
- Engine: wall-clock next-fire math (incl. DST boundary + midnight), collision guard, exhaustion
  at day 5, taper flag, deferred step-0 window-hold.
- Enrollment race: booked at minute 14 → zero beats ever fire (cancel beats the first fire).
- Copy: every text has {bookingLink} resolved, STOP only on #1, all ≤320 GSM-7.
- Funnel-dial retirement: quote_funnel lead → no speed-to-lead call, run created firing +15 min;
  inbound-call lead → dial unchanged.
- Slack: terse line format pinned per outcome class.
- Sandbox (prod): 555-01XX fixture, OUTBOX_LIVE unset posture (rows simulated/terminal) + the
  dialer's structural 555 refusal = zero wire even if the 15-min cron claims the run. Assert:
  run row + correct nextFireAt grid + zero real sends + full verified teardown.
- Full suite green (3107 baseline), tsc, build; register new test files BY FULL PATH.

## G. Rollout
Sonnet-5 builder (worktree, judgment-zero WO) → OS47 verifies gates personally → merge → prod
sandbox → paranoia sweep → deploy → health-SHA → live-watch the first real lead through the
funnel. The new shape auto-applies to NEW leads only (existing active runs keep their old
schedule — no migration; the only active runs today are Randy's + Stanley's, both mid-ladder).
