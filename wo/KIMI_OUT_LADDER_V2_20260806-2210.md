• **Disclosure:** paths: y · client-names: y · strategy: n · credentials: NONE.
  Audit basis: `wo/PLAN_LADDER_V2_20260806.md` (read in full) + the brief's context block. No codebase access taken; where behavior is unverifiable from the artifact, that absence is itself the finding.

  ## VERDICT

  **DO NOT SHIP AS WRITTEN — one revision pass, not a redesign.** The skeleton is sound (composes existing mechanics, booking-kills-ladder preserved, 8–8 law respected by construction, 5-day bound chosen over the operator's "indefinitely-ish"). But the plan carries two launch-killers — a post-booking text path that booking-cancel never touches, and a flat contradiction between "registry timing read-through" (A.1) and "existing active runs keep their old schedule" (G) — plus three HIGH underspecifications that a judgment-zero builder *cannot* implement without guessing, and a compliance section that names the filing but not the exposure. Every fix is a gate or a decision table, not new architecture. Criterion coverage as written: 1 ❌ · 2 ⚠️ · 3 ❌ · 4 ❌ (unnamed exposure exists) · 5 ⚠️ (ordering hole) · 6 ❌ (two regression vectors live).

  ## FINDINGS

  **F1 · LAUNCH-KILLER — The no-answer SMS path never re-checks booking.**
  Hole: `bookAppointment` cancels cadence *runs*. The beat-0 text is not sent by the cadence engine — it is sent ~2 min later by the VAPI end-of-call webhook (`smsOnNoAnswer`). The plan never states that this webhook path re-checks appointment state before enqueueing. The outbox spine enforces STOP/suppression/consent/window — booking is not in that list.
  Failure: lead doesn't answer the minute-15 call, goes "fine, I'll book," books at minute 16–17, and at minute 18 receives *"just tried you about the free roof inspection… Grab a time that works here: {bookingLink}"*. This is not an edge case — it is the ladder working as designed and then insulting the customer who did the desired thing, on paid traffic, day one. Violates criteria 1 and 3.
  Fix: one gate — no ladder-purpose SMS enqueues while the contact has a future appointment (checked in the webhook before outbox enqueue, or as an outbox rule). Add the minute-17 test (book *between* call and text) next to the plan's minute-14 test.

  **F2 · LAUNCH-KILLER (conditional) — "Registry timing read-through" contradicts "no migration."**
  Hole: A.1 states the engine does "registry timing read-through." G promises existing active runs (Randy, Stanley — real people, mid-ladder) "keep their old schedule — no migration," while B replaces the `new_lead_followup` key's shape in place. If active runs resolve timing from the registry at advance time, merge day silently rewrites Randy's and Stanley's remaining beats. If runs snapshot at enroll, the promise holds — but the plan never defines the snapshot boundary, and the no-regression claim is asserted, not tested.
  Failure: two live customers' ladders change mid-flight — skipped or doubled calls — discovered only when they complain.
  Fix: confirm which semantics exist. If read-through is live: snapshot step schedule onto the run row at enroll, or ship as `new_lead_followup_v2` and repoint the enroll call site. Pin a test: a mid-ladder run's remaining `nextFireAt` set is identical across the registry swap.

  **F3 · HIGH — Funnel dial retirement has a cross-repo ordering hole.**
  Hole: D names the /quote success-screen `bookingUrl` as "🔴 REQUIRED PAIRING," but G's rollout lists CRM and site work in parallel with no sequencing. The site change lives in a different repo/lane with its own deploy.
  Failure: CRM ships first → funnel leads get no t=0 dial *and* no booking link on the success screen — the exact lead-loss criterion 5 exists to prevent. Every hour of the gap burns paid Meta leads.
  Fix: one line in G — site renders `bookingUrl` and is verified live *before* `shouldFireSpeedToLead` flips. Treat as a single atomic rollout with the site half first.

  **F4 · HIGH — The collision guard / grid-entry rule / day anchor are unimplementable as written.**
  Hole (four parts): (a) "first grid beat = next 9 AM" for a 5:50pm enroll requires an entry-slot rule the plan never states (first grid hour ≥ last touch + 2h? ≥ enroll + 2h?). (b) The guard says a beat "fires only if ≥2 h since the run's previous touch" but never says what happens when <2h — skipped-and-consumed (the 16-beat ladder silently becomes 12–14 beats for afternoon enrolls) or pushed (the grid drifts; 9am beats creep). (c) The plan's own example says the 6:05pm call must not be followed by "the 6:00 pm grid beat… *nor 9 pm same-day*" — **9pm is not a grid hour**; the example contains a branch that cannot exist, proof the rule was never fully thought through. (d) "5 calendar days" has no anchor: a 7:59pm lead's beat 0 window-holds to 8:00am — is day 1 the enroll date (they get 4 grid days) or the first-fire date? A judgment-zero builder will guess four different things, and two identical leads enrolled at different hours get materially different ladders.
  Fix: a decision table — enroll-time bucket × first grid beat × beats burned × day count — plus one normative sentence ("colliding beats are consumed, not pushed," or the reverse; pick one).

  **F5 · HIGH — `skipFirstStep` at the enroll call site is never addressed.**
  Hole: today, `lead.created` enrolls with `skipFirstStep` *because* the t=0 dial was the first touch. Post-retirement that premise is true only for non-funnel leads. The plan says "the ladder covers funnel leads from beat 0" but never names the enroll-site branch.
  Failure, either guess: builder keeps `skipFirstStep` for all → funnel leads' first touch is the next grid slot, up to ~15h later (criterion 2 dead, speed-to-lead fully retired by accident); builder drops it for all → non-funnel leads get the t=0 dial *and* a beat-0 call 15 min later — the exact double-dial clunk this plan retires, now inflicted on inbound-call leads.
  Fix: enroll branches on the same predicate as `shouldFireSpeedToLead` — funnel → step 0 live, non-funnel → `skipFirstStep` — written explicitly in the WO.

  **F6 · MED — The copy violates its own GSM-7 constraint.**
  Hole: texts #1, #8, #10 contain em-dashes (—, U+2014), which are not GSM-7. Any one forces UCS-2: 70-char segments, and the plan's own pinned test ("all ≤320 GSM-7") fails on the plan's own copy. Interpolated `firstName` with non-GSM-7 diacritics flips encoding at send time too.
  Failure: builder either silently edits Sean-blessed copy or ships 4-segment texts.
  Fix: ASCII hyphens in the pool, a GSM-7 sanitizer for interpolated fields, and the test asserting on the *rendered* string, not the template.

  **F7 · MED — Text #10 "book anytime here" vs the 6-day token TTL.**
  Hole: /book tokens live 6 days (A.5). Beat 15 fires day 5; the closer says "anytime"; the link dies ~day 6. Every text has the same dead-link tail, and expired-token landing behavior is unspecified anywhere in the plan.
  Failure: the lead who finally re-engages on day 7–9 clicks into a dead or broken page at the exact moment of highest intent.
  Fix: extend ladder-link TTL to ≥10 days, or specify a graceful expiry page ("this link expired — call {number}"); change "anytime" → "this week."

  **F8 · MED — Criterion-4 exposure the plan fails to name.**
  The plan names the A2P filing (STOP on #1) and nothing else. Unnamed:
  - **AI voice = artificial/prerecorded voice under TCPA §227(b).** `consent===true` is a boolean, not a scope check. The plan never states the funnel form's consent language covers automated calls *and* texts *and* AI voice. If it's "contact me about my request," 16 marketing touches sit on thin ice. State the assumption so a human can verify the form language.
  - **Spam-label fingerprint:** 15 unanswered calls / 5 days from one number to one silent number is the canonical Hiya/TNS/First Orion "Spam Likely" profile. No caller-ID reputation mitigation named (CNAM, attestation posture, monitoring). Once labeled, *all* outbound — including to fresh leads — degrades silently.
  - **Link-in-every-text:** a naked URL in 16 consecutive texts to a non-responder is the strongest 10DLC content-filter trigger there is. STOP-on-#1-only satisfies the filing; carriers filter on complaint heuristics, not filings. CTIA best practice is recurring opt-out instructions; texts #2–#10 also mostly drop business identification.
  Fix: name all three in the plan; put "Reply STOP" on final text #10 as well (zero cost, closes the "deleted text #1" hole); add a delivery/spam-label monitoring line to rollout.

  **F9 · MED — Taper default OFF ships without a flip trigger.**
  The flag existing is what makes OFF defensible; the operator chose max frequency explicitly. But days 4–5 calls to a number that ignored 9+ prior touches have near-zero marginal value and compounding label risk, and the plan never says *when* the flag gets flipped. Fix: keep OFF per the operator, add one line — "first spam-label report or delivery-rate dip → `ladder_taper` ON, no deploy needed" (and confirm the flag is read per-beat at fire time, not frozen at enroll — currently unspecified).

  **F10 · MED — Terse Slack deletes the two things needed at 2am.**
  Hole: (a) No terminal-state line exists. A run exhausting after 16 touches is signaled by *silence* — the operator's actual money question ("did this $45 lead die?") gets no message. (b) `answered → hung up mid-question` is the *last* word on a warm lead — answered auto-cancels the run, and the classifier's intel ("she said call after 6") stays CRM-side with no task, no prompt, no next step. The terse format also never defines `{linkage}`, and "hung up mid-question" has no duration threshold — builder invents a number.
  Fix: pin two additions — `run exhausted · 16 touches · 0 contact` (or an owner task), and for answered-not-booked, append the classifier's existing one-line summary. Define `{linkage}` and the outcome thresholds in the WO.

  **F11 · MED — "The free roof inspection you requested" is a false claim for non-funnel enrollees.**
  The same `new_lead_followup` key auto-enrolls inbound-call, referral, and import leads. A referral who requested nothing gets "you requested" — fabricated claim to a real customer; the workspace honesty floor applies to copy, not just stats. Fix: source-aware #1 variant or neutral phrasing ("you asked us about your roof").

  **F12 · MED — No duplicate-run guard.**
  Meta forms double-submit. Two lead rows → two concurrent runs → double beats: up to 6 calls/day to a real person, and the cancel paths only work if both leads resolve to one contact (unspecified). Fix: unique active run per (contact, ladder key); re-enroll no-ops.

  **F13 · MED — No dead-number stop condition.**
  A.7's stop triggers omit failed/landline/disconnected dispositions. As specified, the ladder dials a disconnected number 16 times. Fix: a `disconnected` classifier disposition (or N consecutive instant-fail dials) cancels the run.

  **F14 · LOW — `source_detail contains quote_funnel` is a stringly gate.**
  Case/format drift (`quote-funnel`, `Quote_Funnel`, `website_quote`) silently keeps the t=0 dial (double-touch with beat 0); a stray mention in import notes silently retires it; NULL handling unspecified. Fix: exact match against the probed enum, values enumerated in the WO.

  **F15 · LOW — "No voicemail ever" is enforced by a probabilistic detector, not by construction.**
  Empty `voicemailMessage` covers only the *detected* path. A detection miss means Alex's opener is recorded on the customer's box — a de-facto voicemail, company law broken, armed tonight with zero accuracy data. Fix: the classifier already files voicemail truthfully — alert when a call classified `voicemail` ran >~10s (opener leaked); keep the opener brand-safe for the residual.

  **F16 · LOW — Missed end-of-call webhook = silent text gap.**
  16 dependent webhook deliveries per run, no retry/reconciliation named. A missed webhook is a beat with no text, invisible to everyone. Fix: nightly sweep — terminal unanswered call >10 min old with no SMS row → enqueue or flag.

  **F17 · LOW — Every text is a single-CTA dead end when /book is down or the token is dead.**
  No phone number, no "reply CALL," in any of the 10 texts; runtime behavior for unresolved `{bookingLink}` (token mint failure) unspecified — send with a literal placeholder is the worst string in the system. Fix: outbox refuses sends with unresolved merge fields; add "or call {number}" to #1 and #10.

  ## ANSWERS

  **1. Coverage vs the 6 criteria.** Criterion 1 fails on F1 (text-after-booking) and is unproven against the claim/cancel race (no transactions; the claim must be a single conditional `UPDATE … WHERE status='active'`, plus a recheck immediately before dial — a phone cannot be un-rung, so a seconds-wide residual remains and should be named). Criterion 2 is shape-complete but semantically unpinned (F4): the delivered sequence varies by enroll time in ways the plan never fixes, and "clean exhaustion" has no defined status value or artifact. Criterion 3 fails on F1 (booking leg) and holds on the others, with F15 as a probabilistic voicemail leak. Criterion 4 fails as posed — the criterion is "no exposure the plan fails to *name*," and F8 names three the plan omits. Criterion 5 is named correctly but has a rollout-ordering hole (F3). Criterion 6 fails twice: F2 (Randy/Stanley) and F5 (non-funnel speed-to-lead path), plus the unscoped Slack replacement.

  **2. The 15-minute race.** Three distinct places a booked customer still gets touched: (a) the SMS webhook path (F1) — the likeliest, minutes-wide; (b) the claim-vs-cancel window — cron claims the run in the same seconds `bookAppointment` commits, no transactions to serialize them, narrow but real; (c) a customer who books *while the phone is already ringing* — by design, and both cancel paths catch the run, but the experience should be acknowledged. Cron phase: beat 0 fires at effective minute 15–29:59. Acceptable — it *widens* the booking window, so it helps criterion 1 — provided cancel-at-claim is solid. But it is a spec deviation from the operator's "15 minutes" and should be stated to him, not discovered by him. The minute-14 test must be joined by minute-17 and minute-28 tests.

  **3. The wall-clock engine.** DST: grid hours 9/14/18 are never nonexistent or ambiguous, so the classic DST trap doesn't apply — the real bug shape is computing "tomorrow 9am" by adding 24h to a UTC instant (9am EDT = 13:00Z, 9am EST = 14:00Z). The rule must be "compute the wall hour in America/New_York, then convert to an instant," with Nov 1, 2026 and Mar 2027 vectors in the named DST test. Midnight wrap is fine if each step's fire time is computed at fire time of the previous — which the plan never states. The 5:46–5:59pm cohort inverts the plan's own example unless an entry-slot rule exists (F4). Restarts/redeploys: stateless cron + DB-held `nextFireAt` = no material hazard; in-flight calls survive VAPI-side; webhooks hit the new deploy — fine. Granularity: all beats land 0–14 min late; a 6pm beat's text lands ≤~6:20pm, inside the window; but a beat delayed *past* 8pm (outage) window-holds to 8am, and the cascade into the next day's 9am slot (<2h) is exactly the guard semantics F4 says are undefined. The phantom "9 pm" branch in the plan's example is the tell that this section was never finished.

  **4. The copy pool.** STOP-on-#1-only is filing-compliant but leaves leads who deleted text #1 with zero opt-out instructions across 15 more messages — carriers filter on complaint heuristics, so put STOP on #10 too (F8). The booking-link-in-every-text pattern is the single strongest 10DLC content-filter trigger available; naming that tradeoff is mandatory under criterion 4, and nobody should be surprised when delivery rates dip. #10's "anytime" is false against the 6-day token (F7). GSM-7 fails on the seeded copy's own em-dashes (F6). Business identification drops out of most of #2–#10. And #1's "you requested" is a false claim for non-funnel enrollees (F11).

  **5. Frequency/exposure.** Real lines, named: TCPA §227(b) — VAPI's Alex is artificial voice; defensibility rests entirely on the funnel consent's *scope* (automated calls + texts + AI voice), which the plan never verifies (F8). Revocation must work at any time — the spine handles exact-keyword STOP; non-exact "please stop calling" handling is unstated. Carrier side: 15 unanswered calls / 5 days is a textbook "Spam Likely" fingerprint, and 16 link-bearing texts is a content-filter magnet — both unnamed. State mini-TCPAs (FL/OK class) mostly ride on the same consent scope — worth one sentence. Taper OFF is defensible *only* because the operator chose it explicitly and a no-deploy kill switch exists — but the plan must define the trigger that flips it (F9), or OFF is just unexamined default.

  **6. The funnel dial retirement.** The gate (`source_detail contains quote_funnel`) is fragile string-matching with unstated null/case semantics (F14); false negatives preserve the double-dial clunk, false positives cost non-funnel leads their instant touch. A funnel lead whose token mint fails gets texts with a broken or literal `{bookingLink}` — runtime behavior unspecified (F17). If /book goes down, every text in the ladder is a dead end for its full 5-day run — no phone-number fallback exists in any copy (F17). And the retirement is unsafe to ship before the site's success screen carries the link (F3). What *is* correct and should be stated: a consent:false funnel lead getting neither dial nor ladder but seeing the booking link is right by design.

  **7. Terse Slack reports.** The operator will regret, at 2am: (a) no exhaustion signal — dead paid leads announced by silence; (b) answered-but-unbooked calls terminating the ladder with the classifier's "she said call after 6" intel buried CRM-side and no human ever prompted (F10); (c) undefined `{linkage}` and undefined outcome thresholds, which the builder will invent; (d) `{name|number}` ambiguity once two same-first-name leads run concurrently. The format itself is right; it's the *completeness of the line set* that fails.

  **8. Underspecification sweep.** See MISSING. The pattern: the plan specifies the happy-path shape precisely and leaves every branch condition — guard semantics, entry slot, day anchor, skip branch, token lifecycle, rotation table, registry snapshot boundary — to a builder explicitly forbidden from exercising judgment. That is the single largest class of risk in this document.

  **9. The one thing.** **Close the booking race at both send points before anything else ships:** a fresh "no future appointment + not suppressed" check inside the no-answer SMS webhook *and* an atomic conditional claim in the sweep, with the minute-17 test (book between call and text) as a merge gate. It is the only failure that is near-certain on live paid traffic, insults the customer for doing the desired thing, and costs one gate to fix. F2 runs a close second and must be resolved before the WO is written regardless — it decides whether "no migration" is a promise or a lie.

  ## MISSING

  - Collision guard: skip-vs-push semantics; whether a skipped beat is consumed toward the 15
  - Grid entry-slot rule (first grid beat as a function of enroll time); the example's "nor 9 pm" branch contradicts the 9/14/18 grid
  - "5 calendar days" anchor: enroll date vs first-fire date; the 7:59pm/9pm window-hold cohort's day count
  - `skipFirstStep` conditional at the enroll call site (funnel vs non-funnel)
  - Registry snapshot boundary: do active runs read the registry live or hold a copy? ("read-through" vs "no migration")
  - Exhaustion: exact status value, CRM artifact, Slack/task signal
  - Copy rotation table: explicit beat N → copy #M mapping ("morning/afternoon/evening-appropriate" is a taste call routed to a judgment-zero builder — flag as mis-routed or spell it out)
  - `{linkage}` definition; outcome-phrase duration thresholds ("hung up mid-question")
  - `firstName` empty/non-GSM-7 fallback in templates
  - Token lifecycle: `ensureBookingToken` idempotency; same token in intake response vs ladder texts vs reminders; TTL vs 5-day ladder; expired-token landing page
  - Whether `ladder_taper` is read at enroll or per-beat at fire
  - Claim atomicity mechanism (single conditional UPDATE) absent from the plan despite no-transaction driver
  - Booking-state re-check in the `smsOnNoAnswer` webhook path
  - Duplicate-lead / concurrent-run guard per contact
  - Dead-number (disconnected/landline) stop condition
  - Unresolved-merge-field refusal in the outbox
  - Consent-*scope* statement (calls + texts + AI voice) behind the `consent===true` boolean
  - Slack replacement scope: ladder calls only or all VAPI calls
  - Site-repo owner/lane and deploy-ordering for the /quote `bookingUrl` render
  - Beat-0 effective window (15–30 min) stated to the operator as a deviation from "15 minutes"

