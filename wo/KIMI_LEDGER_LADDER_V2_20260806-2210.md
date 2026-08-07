# DISPOSITION LEDGER — Ladder v2 (KIMI_OUT_LADDER_V2_20260806-2210.md)

OS47, 2026-08-06 ~10:30pm ET. 17 findings + 9 answers. Probes run before dispositioning;
receipts inline. Verdict accepted: one revision pass, no redesign.

## Launch-killers
- **F1 · ✅ ACCEPT — narrowed by probe.** The webhook DOES check `run.status !== "active"`
  (`cadence-call-outcome.ts:175`) — so a cancel that lands before webhook processing already
  kills the text. `[PROBED]` The REAL hole: a text row already enqueued (scheduledFor +2 min)
  SURVIVES the run cancel — nothing drains queued outbox rows on cancellation. This is the
  exact "does cancel_cadence drain queued rows" residual carried from this morning's audit, now
  with a receipt. **Fix (in WO): `cancelCadence` cancels pending outbox rows carrying its
  `cadenceRunId`; minute-14/17/28 test trio.** One gate closes F1 + the carried residual.
- **F2 · ✅ CONFIRMED BY PROBE.** `[PROBED]` `advanceCadenceRuns` resolves `def.steps` LIVE
  from `CADENCE_LIBRARY` at advance (`cadence.ts` sweep) — an in-place reshape rewrites Randy's
  and Stanley's remaining beats mid-flight. **Fix: ship as NEW key `new_lead_followup_v2`;
  repoint the enroll site; old key + its 2 active runs untouched; pin a test.**

## High
- **F3 · ✅ ACCEPT.** Rollout order hardened: site /quote success screen renders `bookingUrl`
  (from the intake response) and is live-verified BEFORE `shouldFireSpeedToLead` flips. Both
  repos are this session's hands — sequenced, not parallel.
- **F4 · ✅ ACCEPT — decision table written into the WO** (Kimi's "9 pm branch" catch was
  right; the example was half-thought): entry rule = first grid hour ≥ beat-0 fire + 2h ·
  colliding beats are **CONSUMED, never pushed** (grid never drifts; "up to 16 touches" is the
  honest spec) · day anchor = the 5 calendar days FOLLOWING the enroll date (ET) · a
  window-held beat 0 does not change the grid days.
- **F5 · ✅ ACCEPT.** Enroll branch spec'd on the SAME predicate as the dial gate: funnel →
  step 0 live (+15 min); non-funnel → `skipFirstStep` (t=0 dial remains their touch 1).

## Med
- **F6 · ✅ ACCEPT.** ASCII hyphens; GSM-7 sanitizer on interpolated fields; test asserts on
  RENDERED strings.
- **F7 · ⛔ REFUTED BY PROBE.** `[PROBED]` Booking tokens have NO TTL (`booking-public.ts` —
  no expiry anywhere; the GRID shows a rolling 6-day window, the token is permanent). "Book
  anytime" is TRUE. No change. (Expired-token page: the invalid-token fallback with the phone
  number already ships.)
- **F8 · ✅ ACCEPT AS NAMED EXPOSURES.** (a) Consent-scope: flagged to Joseph — the funnel
  form's consent language must cover automated calls + texts + AI voice; HIS verify, one look.
  (b) Spam-fingerprint: monitoring line added (delivery-rate + spam-label watch). (c) STOP
  rides #1 AND #10; "or call (919) 645-0762" on #1 + #10; business name in every variant.
- **F9 · ✅ ACCEPT.** Taper stays OFF (his explicit call); flip trigger written: first
  spam-label report or delivery dip → `ladder_taper` ON (registry, no deploy). Read PER-BEAT
  at fire time.
- **F10 · ✅ ACCEPT.** Terse set gains: exhaustion line (`📞 run exhausted · N touches · no
  contact`) and answered-not-booked lines append the classifier's one-line summary. `{linkage}`
  + duration thresholds defined in the WO.
- **F11 · ✅ ACCEPT.** Neutral phrasing everywhere: "about your roof" — no "you requested"
  claims (v2 serves funnel + any manual start).
- **F12 · ✅ ALREADY BUILT (today).** `[PROBED]` `cadence_runs_active_dedupe_uq` (dedupe_key,
  cadence_key) partial unique index — double-enroll impossible at the DB since this morning.
- **F13 · ✅ ACCEPT (small).** 2 consecutive instant-fail dials (failed/busy/invalid
  endedReason, <8s) → run cancelled `dead_number` + terse Slack line.

## Low
- **F14 · ✅ ACCEPT.** Gate = `source_detail LIKE 'quote_funnel%'` exact-prefix against probed
  values (`quote_funnel · pm:…`); NULL → non-funnel.
- **F15 · ✅ ACCEPT.** Voicemail-classified call with >10s duration → `⚠️ opener leaked to VM`
  Slack line (detection-miss tripwire). Opener stays brand-safe.
- **F16 · ⏭️ DEFER, NAMED.** Webhook-miss reconciliation sweep — carried to the watchdog lane;
  not a launch gate (missed webhook = missed TEXT only; the next beat still fires).
- **F17 · ✅ ACCEPT.** Outbox refuses unresolved merge fields; phone fallback on #1/#10 (per
  F8); token-mint failure at enroll → text still sends WITHOUT the link (never a literal
  `{bookingLink}`).

## Answer-level adoptions
- Beat 0 effective window is **15–30 min** (15-min cron phase) — stated to Joseph as a spec
  deviation, and it widens the self-book window (helps criterion 1).
- Claim atomicity: the sweep's run-claim becomes a single conditional
  `UPDATE … SET … WHERE id=? AND status='active'` (idempotence-is-the-transaction law).
- Copy rotation = an explicit beat→variant TABLE in the WO (no taste routed to the builder).
- Slack replacement scope = ALL VAPI call posts (one composer, one format).

*Ledger closed: 13 accepted, 1 refuted-by-probe, 1 already-built, 1 deferred-named, 1 accepted-
narrowed. Both launch-killers resolved by design changes now in the WO (v2 key + cancel-drains-
queued-rows).*
