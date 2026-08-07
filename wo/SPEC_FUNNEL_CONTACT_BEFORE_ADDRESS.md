# SPEC — swap /quote: name+phone BEFORE address (Joseph, 2026-08-07 5:30pm ET)

**Status: SPEC'D, NOT BUILT.** Banked at the handoff. Repo: `mabrey-roofing`
(`components/funnel/QuoteFunnel.tsx`), plus a CRM-side decision (§4).

## JOSEPH'S ASK, VERBATIM INTENT (do not creatively reinterpret)
> *"I want it to look IDENTICAL to what it is, just swap the order — we get their name
> and number first, and when they click that button it DOES get submitted, but I don't
> want to change it to like a submit. Keep the button the same where they just click
> next, and then we get that info, and then they go to submit their address — which will
> probably increase the conversion rate as well."*

So: **zero visual change.** The contact screen's button still reads/behaves as a
"Continue"-style next button. It just ALSO captures the lead behind the scenes. The
address screen becomes the final step.

## WHY (the evidence that drove it — 3 consecutive days)
The form dies at the ADDRESS screen — the first screen that asks for typing, and the
highest-commitment field (home address, before any human contact).
- 08-07: 24 sessions, **3 reached the address screen, 0 finished, 0 funnel leads.**
  All three: single-family · roof replacement · monthly payments; one said *within 30
  days*. Textbook buyers, zero contact info captured because name/phone came AFTER.
- 08-06 8:15pm: one session completed address, reached contact, quit there.
- Receipts: `funnel_events`, probed 08-07 5:20pm.
⇒ Whoever quits at address becomes UNREACHABLE FOREVER. Swapping means they leave a
callable lead. Secondary upside Joseph named: likely higher completion (easy ask first).

## 1. THE SWAP (mechanical)
`components/funnel/QuoteFunnel.tsx`:
- Constants (~line 44-46): `CONTACT_STEP = QUOTE_STEPS.length + 1` ·
  `ADDRESS_STEP = QUOTE_STEPS.length + 2`. The render blocks are keyed on these
  constants, so swapping the numbers swaps the order — do NOT reorder the JSX.
- stepId map (~line 103): `step === ADDRESS_STEP ? "address" : "contact"` still holds;
  verify the telemetry `step_index` now reports contact=6, address=7 (the funnel
  dashboards read these — see §5).
- Back button (~line 573): `setStep(step === CONTACT_STEP ? ADDRESS_STEP : step - 1)`
  is now BACKWARDS — invert it.
- Copy: the contact screen currently says **"Last step. Where do we reach you?"** — it
  is no longer last. The address screen becomes the finisher. Keep both headings'
  register identical to today (FB-sheet voice); change only what is now factually
  wrong. ⚠️ **Joseph's copy beats invented copy** — propose, don't ship new wording
  silently.

## 2. THE CAPTURE (the part that actually delivers the abandonment protocol)
Clicking the contact screen's Continue button must POST the lead — name, phone,
consent, and the five quiz answers — with **address empty**. Validation gates stay
exactly as they are (`nameValid`, `phoneValid`, the structural 10-digit rule, the
shake-on-failed-tap counter). Consent lives on this screen already, so TCPA basis is
captured with the partial. ✅

Then the address screen's button completes the lead with the address.

## 3. ⚠️ THE DUPLICATE PROBLEM — THE ONE REAL DESIGN DECISION LEFT
`src/lib/site-lead.ts` (CRM) **always INSERTs** — probed 08-07, no update-by-session
path exists. So a naive second POST creates TWO leads for every completer.
Options, in order of preference:
- **(a) POST once at contact; PATCH the address on.** Needs a small CRM route that
  updates a lead's address by `visitor_session_id` (already stored — `site-lead.ts:324`)
  within a short window. Cleanest; the lead exists the moment a human is contactable.
- (b) POST at contact, POST again at address, teach `site-lead.ts` to UPDATE when
  `visitor_session_id` matches a lead created in the last ~hour.
- (c) POST only at contact and treat address as fully optional (no second write) — the
  address then never reaches the CRM for completers, which is a REGRESSION. Rejected.
Pick (a) or (b); both touch the CRM repo, so this ships as a TWO-REPO change with both
deploys (site: vercel CLI **with `--scope team_NkPhIBvoJCuw96qNM5jblP4J`**, see §6).

## 4. BEHAVIOR CHECKS BEFORE SHIPPING (probe, don't assume)
- **Speed-to-lead dial:** funnel leads (`quote_funnel%`) had the instant dial RETIRED
  in the booking-first cutover — verify that still holds, so a partial lead does NOT
  ring someone's phone while they are still typing their address.
- **Ladder arming:** confirm the partial arms `new_lead_followup_v2` exactly once, and
  that the completer's address write does not arm a second (the
  `cadence_runs_active_dedupe_uq` index should make a double-arm impossible — verify).
- **Address-verify / geocode pipeline:** it runs on the address; make sure a lead with
  an empty address does not error or land in a bad state.
- **The success screen** must still be the booking-first "Pick my time →" CTA into
  `/book` — that is downstream of final submit; confirm it did not move.

## 5. TELEMETRY
`funnel_events.step_index` semantics change (contact becomes 6, address 7). Anything
reading step numbers — the `/ads` funnel drop-off view, any saved analysis — must be
re-read against the new order, or a chart silently lies. Fix the consumer in the same
change; do not leave the two out of sync.

## 6. DEPLOY NOTE (learned 08-07)
`mabrey-roofing` refuses a plain `vercel deploy --prod` with "Not authorized" — it needs
`--scope team_NkPhIBvoJCuw96qNM5jblP4J`. The CRM deploys fine without it.

## 7. TIMING
Joseph green-lit this at 5:30pm 08-07. Note the standing PoC rule (run 3-5 days
untouched before optimizing) — he has consciously overridden it here because the
change is about CAPTURING otherwise-lost leads, not tuning delivery. Ship it; do not
re-litigate.
