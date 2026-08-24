> [!warning] PROVISIONAL — no load-bearing claim was confirmed (all flagged-uncertain or killed). Treat flagged findings as unverified; see Open questions & gaps.

# What landing-page structure converts cold Meta/Facebook roofing-lead traffic best on mobile (Facebook in-app browser as primary surface) — specifically multi-step quiz funnels vs single-page forms vs calendar-first self-scheduling vs click-to-call — with measured benchmarks, and what door/above-the-fold and contact-step designs measurably raise form-start and completion rates?

## Answer

Build a short multi-step form that ends in a calendar. That is the structure.

The evidence points one direction on each piece:

- **Multi-step beats single-page.** Every dataset in this corpus that compared them found multi-step ahead — 29.76% vs 16.05% (HubSpot survey), 13.85% vs 4.53% (Formstack), 47.3% vs 21.5% completion (Typeform). All vendor/self-report data, all pointing the same way. Meta itself ships its native Instant Form as a multi-screen branching sequence, which is the closest thing to a first-party endorsement of the pattern on this exact surface.
- **Cap it at ~6 question screens.** Typeform's research puts the cliff past six questions (under 50% completion). Sub-60-second forms finish 15% more often. Roofing needs maybe 5: damage type, roof age, property type, name, phone.
- **Put a calendar directly behind the submit.** Chili Piper's ~4M-submission dataset says instant self-scheduling roughly doubles form-to-meeting (30% → 66.7%). Same dataset: a *second separate* booking form after the capture form cuts conversion ~50%. One flow, no handoff. B2B data — the mechanism should transfer, the magnitudes will not.
- **Do not drop the phone field. Explain it instead.** Baymard's n=1,026 study: only 14% of users refuse a phone number outright, and an inline "why we need this" line resolves most of the objection while keeping the field required. HubSpot's 40K-landing-page analysis found simple text inputs (like phone) barely move conversion — the steep drops came from textareas and dropdowns. The scary 37-48% phone-field numbers are single case studies, and the most-cited "42% lift" stat traces back to a source whose actual headline was 275% — citation drift.
- **Keep click-to-call visible but not as the only path.** Invoca: home services converts phone leads at 46%, highest of any vertical, with 37% closing live on the call. But CallRail found home services misses 14% of calls and up to 85% of unanswered callers never call back. Call is the highest-value path and the leakiest one. Calendar is the bounded version of the same intent.

**Above the fold, the highest-leverage lever is speed, not copy.** Google's 11M-page study: 1s → 10s load raises bounce probability 123%, and going from 400 to 6,000 page elements drops conversion probability 95%. Then copy: 5th-7th grade reading level converts at 11.1%, 56% better than 8th-9th grade and 2× better than professional-level prose. Word count and reading time both correlate negatively with conversion.

**The in-app browser is a real, documented failure surface — treat it as an engineering requirement, not a caveat.** Practitioner reports (with Sentry/Clarity instrumentation, cross-confirmed by multiple independent reporters) show blank/gray screens closing in ~1 second, `postMessage: Java object is gone` errors on Android WebView, 65 reported Ads Manager clicks against 17 real sessions, frozen unclickable pages, stripped UTMs, and file-upload breakage. Known concrete fixes: strip `target="_blank"` from forms (breaks submit on FB iOS), disable CSS `@view-transition` for FB/IG user agents, and set explicit `autocomplete="given-name"/"family-name"` attributes because FB's browser only autofills email by default — and autofill there is a user-toggleable setting you cannot rely on. Meta uses a custom WebView rather than SFSafariViewController/Custom Tabs, which is *why* autofill and session behavior degrade.

**Back-button behavior is the specific threat to a multi-step form.** On Android, the system back gesture closes the entire WebView and dumps the user into the feed — not back one step. Do not rely on browser history for step navigation; use in-page state with your own explicit back control.

**The one thing to test yourself, because nobody's data settles it:** in-app form vs your landing page. WordStream's 3,000-campaign data has Meta's native form winning volume (12.54% vs 10.47% click-to-lead) while landing pages win downstream quality (+5.7% qualified-lead rate). Volume vs quality — that's a business decision, not a research answer.

## Key findings

- Multi-step > single-page across three independent vendor datasets; no corpus source found the reverse.
- ~6 question screens is the ceiling; under a minute is the target.
- Calendar behind the submit ~2× form-to-meeting; a second separate booking form ~halves it.
- Phone field: keep required, add an inline reason. The catastrophic-drop folklore is poorly sourced.
- Phone calls are the highest-converting home-services channel (46%) and the leakiest (14% missed, 85% never retry).
- Speed and element count dominate above-the-fold conversion more than any headline choice.
- 83% of landing-page traffic is mobile, and mobile converts 8% worse — the mobile path is the whole business.
- Meta's in-app browser silently breaks pages while Ads Manager click counts stay flat. Instrument the page (Clarity or equivalent) or you will not see it.

## Evidence ledger

| # | Claim (compressed) | Source | Tier | Adversarial verdict | Confidence |
|---|---|---|---|---|---|
| 3 | Lead ads 12.54% vs LP 10.47% click-to-lead; CPA $17.98 vs $13.26; LPs win qualified-lead rate | WordStream (3,000+ campaigns, $9.5M) | First-party agency data | flagged-uncertain (snippet-faithful=false; SC 1.00, CoVe ok) | Medium |
| 4 | Meta Instant Form is multi-screen + conditional branching + OTP by design | Meta Business Help Center | Official docs | flagged-uncertain at floor; external Meta docs *corroborate* branching + SMS verification | Medium-high |
| 8 | >6 questions → <50% completion; <1 min → +15% completion | Typeform research | First-party vendor | flagged-uncertain (numbers not confirmed in snippet) | Medium |
| 12 | Form+instant scheduling 30%→66.7%; live-call 69.2%; double form-fill −50% | Chili Piper (~4M submissions) | First-party B2B platform data | flagged-uncertain (SC 0.67; exact figures unconfirmed) | Medium (mechanism), Low (magnitudes) |
| 13 | Home services 46% call conversion, 37% convert live, 35% of digital calls qualified | Invoca 2025 (60M+ calls) | Vendor benchmark + trade press | flagged-uncertain at floor; four external sources corroborate the figures; only the "9 industries" framing unresolved | Medium-high |
| 1 | Lead-ads vs LP volume/quality split (WordStream detail) | wordstream.com | First-party | asserted, unverified | Medium |
| 2 | CPL rises sharply past ~5 questions on in-app forms (AdEspresso via WordStream) | wordstream.com | Secondary citation | asserted, unverified | Medium |
| 9 | Median LP conversion 6.6%; paid social 12% (FB 13%, IG 17.9%) > paid search 10.9% | Unbounce (57M conv., 41K pages) | First-party platform data | asserted, unverified | Medium-high |
| 10 | 83% of LP visits mobile; mobile converts 8% worse than desktop | Unbounce | First-party | asserted, unverified | Medium-high |
| 14 | Peer-reviewed HCI: guideline-improved forms → faster completion, fewer errors/trials | Seckler et al. (CHI-adjacent) | Peer-reviewed academic | asserted, unverified | Medium |
| 16 | Multi-step self-reported CVR 29.76% vs single-step 16.05% (+86%) | HubSpot (n=173 marketers) | First-party survey | asserted, unverified | Low-medium (self-report) |
| 17 | Multi-page forms 13.85% vs single-page 4.53% | Formstack via MarketingCharts | Vendor research, secondary | asserted, unverified | Low-medium |
| 18 | Unbounce 2024 benchmark headline figures | unbounce.com | First-party | asserted, unverified | Medium-high |
| 20 | Typeform 47.3% vs 21.5% industry-average completion | Typeform press release | First-party | asserted, unverified | Medium |
| 21 | Required phone −43% conversions, but ~2× phone-reachable leads | Disruptive Advertising A/B test | Agency case study | asserted, unverified | Low-medium |
| 22 | Required phone −47/48% on top-of-funnel ebook page; effect is funnel-stage dependent | Vital Design | Agency case study | asserted, unverified | Low-medium |
| 23 | Only 14% refuse phone ever; inline explanation resolves most concern | Baymard (n=1,026) | UX research institute, primary | asserted, unverified | High |
| 24 | Field count lowers CVR only slightly; text inputs barely; textareas/dropdowns drive drops | HubSpot (40,000+ LPs) | First-party large-N | asserted, unverified | Medium |
| 25 | The cited "42% optional-phone lift" traces to a source whose headline was 275% — citation drift | MarketingExperiments/MECLABS | Primary case study | asserted, unverified | Medium-high |
| 27 | Pay-per-call vendor: calls convert 10-15× forms; 65% prefer calling | resultcalls.com | Vendor blog, self-interested, uncited | asserted, unverified | Low |
| 29 | IG/FB in-app browser blank-screen + `postMessage: Java object is gone`; 65 clicks vs 17 sessions | Meta for Developers forum | Practitioner, instrumented | asserted, unverified | Medium-high |
| 30 | Independent second reporter confirms same symptom cluster | Meta for Developers forum | Practitioner | asserted, unverified | Medium |
| 33 | `target="_blank"` breaks form submit in FB iOS in-app browser; removing it fixes | Support KB, field-diagnosed | Practitioner KB | asserted, unverified | Medium |
| 38 | FB in-app browser exposes user-toggleable autofill settings — not a reliable default | Meta Help Center | Official docs | asserted, unverified | Medium-high |
| 5 | Google/SOASTA: 1s→10s load = +123% bounce; 400→6,000 elements = −95% conversion prob. | Google (11M pages) | First-party primary research | not separately adjudicated | High |
| 6 | 5th-7th grade copy converts 11.1%, +56% vs 8th-9th, 2× vs professional | Unbounce | First-party | not separately adjudicated | Medium-high |
| 7 | Field count matters more than step count; avg 11.3 fields vs ~8 necessary; 17-22% abandon on complexity | Baymard | Primary UX research | not separately adjudicated | High |
| 11 | Home services 14% missed-call rate; up to 85% of unanswered callers never call back | CallRail (1.1M leads) | First-party call data | not separately adjudicated | High |
| 15 | Roofing search benchmarks: 5.66% CTR, $10.70 CPC, 3.70% CVR, $228.15 CPL | LocaliQ (3,200+ campaigns) | First-party, wrong channel (search) | not separately adjudicated | Medium (adjacent-channel only) |
| 19 | Decision rule: single-step at 2-5 fields, multi-step at 6+ | Zuko.io | Vendor blog | not separately adjudicated | Medium |
| 26 | Widely-shared phone-friction stat chain sourced via ChatGPT; "Behemoth Institute" is not a real org | Alan Berg podcast transcript | Secondary, uncited | not separately adjudicated | High (as evidence *of* unreliability) |
| 28 | Aggregator: real phone-field effect ~5% required / ~2% optional — order of magnitude below case studies | digitalapplied.com | Stats aggregator, uncited | not separately adjudicated | Low |
| 31 | FB in-app browser autofills email only until explicit `given-name`/`family-name` attributes added | Stack Overflow | Practitioner Q&A | not separately adjudicated | Medium-high |
| 32/34/35 | IG in-app browser freezes page entirely; Android/Samsung-specific; "Open in Chrome" fixes | Shopify Community | Practitioner forum | not separately adjudicated | Medium |
| 36 | CSS `@view-transition` causes Meta WebView white-screen; UA-gate the rule off | Shopify Community | Practitioner, diagnosed fix | not separately adjudicated | Medium |
| 37 | Meta injects JS into third-party pages via custom WebView, unlike SFSafariViewController/Custom Tabs | Open Web Advocacy + named researcher audit | Advocacy technical explainer | not separately adjudicated | Medium-high |
| 39 | SFSafariViewController natively supports AutoFill — so the breakage is Meta's implementation choice | Apple Developer Docs | Authoritative primary | not separately adjudicated | High |
| 40-46 | In-app browser: cookies off / sessions reset, silent post-click CVR loss with stable clicks, stripped UTMs, back-button closes WebView, history wipe, file-upload breakage | Reddit r/FacebookAds, r/PPC, r/Android, r/apple, r/firefox, HN | Practitioner forums | not separately adjudicated | Medium (HN file-upload: high) |
| 47/48 | Vendor claims: 5-25% uplift from redirecting out of in-app browser; Instant Forms fail without autofill | inappredirect.com, buzzpilot.com.au | Vendor marketing, self-interested | not separately adjudicated | Low |

## Calibrated confidence

Confidence is scored on evidence count × source tier × self-consistency vote × adversarial verdict.

**High confidence (multiple sources, primary tier, no contradicting evidence found):**
- Mobile speed and DOM weight are the dominant above-the-fold conversion levers. Google's own 11M-page research, no counter-evidence in corpus.
- Field count matters more than step count. Baymard primary research, n large, mechanism consistent with the multi-step datasets.
- Phone-field friction folklore is unreliable. Three independent lines converge: the 275%-vs-42% citation drift, the fabricated "Behemoth Institute" chain, and the ~5%/2% average estimate against 43-48% case-study claims.
- Meta's in-app browser breaks pages in ways Ads Manager cannot see. Multiple independent practitioner reports with instrumentation, plus authoritative Apple/OWA documentation on *why*.

**Medium confidence (converging direction, but every source is vendor-first-party or self-report; all five load-bearing claims sit at flagged-uncertain because snippet-faithfulness failed):**
- Multi-step > single-page. Three datasets agree on direction. All three have commercial interest in the answer. HubSpot's is self-reported by marketers. Directionally trust; do not quote the percentages.
- Calendar-behind-submit roughly doubles form-to-meeting. Chili Piper is B2B, SC vote 0.67, exact figures unconfirmed against source. The *mechanism* (remove the handoff, book while intent is hot) is well-supported by the double-form-fill penalty in the same dataset. The magnitude will not transfer to cold roofing traffic.
- Meta's own product being multi-step and branching. Independently corroborated by Meta help-center pages on conditional answers and SMS verification, but the floor verdict holds.
- Invoca's 46% home-services call conversion. Corroborated across four sources including Invoca's own report page and PR Newswire; only the "9 industries" framing is unresolved.

**Low confidence:** every specific phone-field percentage; the pay-per-call vendor's 10-15× claim; the 5-25% in-app-redirect uplift claim. Directional at best, commercially motivated at worst.

**Not measured anywhere in this corpus:** roofing-specific paid-social funnel benchmarks. The closest same-vertical number (LocaliQ, $228 CPL) is search, not social. Any roofing paid-social number you see quoted should be assumed unsourced until proven otherwise.

## Open questions & gaps

1. **Show rates: self-booked vs rep-scheduled appointments.** *(named gap)* Chili Piper measures form-to-*meeting-booked*, not meeting-*held*. Nobody in this corpus measured whether a cold Meta lead who self-books at 9pm actually opens the door on Thursday at the same rate as one a human scheduled by phone. This is the single number that decides whether calendar-first is genuinely better or just moves the drop-off downstream where you stop counting it. Unresolved.
2. **No roofing-specific paid-social funnel benchmark exists in this corpus.** Every conversion figure here is either cross-industry, B2B, or search-channel.
3. **Volume vs quality on in-app form vs landing page is unresolved for this vertical.** WordStream's split is real but from a different mix of advertisers; whether a Meta Instant Form lead closes at roofing job values is untested here.
4. **Quantified impact of in-app-browser breakage.** All evidence is qualitative or single-case. Nobody has measured "X% of Meta-sourced sessions fail in-app" at scale.
5. **Prevalence of the in-app-browser autofill setting being off.** Documented as a toggle; no data on what share of users have it disabled.
6. **Interaction between phone-field placement and multi-step position.** The phone-field studies are all single-page. Whether asking for phone on step 4 of 5 (post-commitment) behaves like the single-page case is untested.
7. **Optimal number of steps specifically for cold, low-intent traffic.** The 6-question cap comes from mixed-intent form data, not cold paid social.

Killed / unrecovered: none.

Stop reason: saturated-with-gaps.

## Method note

```json
{"tier":"lite","mode":"balanced","rounds":2,"stopReason":"saturated-with-gaps","corpusClaims":49,"droppedDuplicates":0,"lensesExercised":["primary / peer-reviewed / academic","official docs / standards / first-party","COUNTER-EVIDENCE / skeptics / disconfirming","practitioner / field reports / forums"],"openGaps":["show rates: self-booked vs rep-scheduled appointments"],"checklistAutoDerived":false,"verified":0,"flaggedUncertain":["3","4","8","12","13"],"killedUnrecovered":[],"deferredUnverified":["14","16","20","22","24","27","1","2","9","10","17","18","21","23","25","29","30","33","38"],"initialDraftGatePassed":true,"degraded":{"workerFailures":0,"emptyGatherRounds":0,"dryStreakEmpty":0,"criticRoundsDegraded":0,"faithChecksDegraded":0,"coveLegsDegraded":0,"scQuorumFailures":0,"urlChecksDegraded":0,"independentSelectorDegraded":false},"synthesisInputTruncated":false,"dateAnchored":true}
```