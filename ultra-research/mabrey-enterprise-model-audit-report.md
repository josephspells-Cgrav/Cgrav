> [!warning] PROVISIONAL — 1 load-bearing claim(s) killed/unrecovered: c21. Treat flagged findings as unverified; see Open questions & gaps.

# question
Red-team/blue-team audit of the Kingmaker SEO enterprise contractor-site business model before the live Mabrey Roofing build: verify every load-bearing internal claim against external 2025-2026 evidence — the client-facing capture metric, the on-page/technical doctrine, Google algorithm assumptions, the highest-ROI DIY off-page levers, GEO/AIO optimization, and any guaranteed-failure pitfalls.

## Answer

**The model is directionally sound but built on one wrong number and several unproven ones. Fix the capture metric before the Mabrey build.**

The single most dangerous internal claim is the conversion rate. Roofing does **not** convert at 10%+. Every independent benchmark puts roofing at the *low end* of home services — a 3-7% on-site visitor-to-lead band, with paid-search click-to-lead at 3.70% (second-lowest of 16 trades). If any client-facing projection assumes a 10% capture baseline, it is claiming top-decile performance as if it were typical. Re-anchor to 3-7%, lead conservative, and the two-tier projection model survives.

The on-page/technical doctrine holds up well. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) **do not execute JavaScript** — this is confirmed by 500M+ server-log fetches. Your `.seo-answer`/server-rendered-HTML discipline is correct and load-bearing; keep it. `llms.txt` is confirmed dead weight — no major AI provider reads it — so don't sell it or spend time on it.

The doorway/scaled-content risk is **real and enforced**, and it is the guaranteed-failure pitfall. Google's spam policy explicitly names city-swap template pages and "multiple sites... to hide the scaled nature of the content" — which describes a cloned-template fleet if the pages aren't genuinely unique per market. The March 2024 enforcement wave deindexed named sites to zero. Mabrey's location pages must carry real local specifics (crews, jobs, permits, neighborhoods), not city-name find-and-replace.

Zero-click is structural and rising (68% of searches, AI Overviews halving top-1 CTR on informational queries) — which *strengthens* the case for winning the local pack and the call, not weakens it. Reviews velocity + GBP are the highest-weight local levers; citations have decayed to ~7%.

**Bottom line for the build:** ship it, but with the conversion number corrected and the location pages genuinely localized. Those two are the difference between a defensible system and a policy casualty.

## Key findings

- **Kill the 10% conversion claim.** Roofing is 3-7% visitor-to-lead, the *low end* of home services (VERIFIED, unanimous support). Paid click-to-lead is 3.70%, 2nd-lowest of 16 trades. Re-anchor every projection conservative-first.
- **Roofing also carries the highest cost-per-lead** ($228) of the trades — long consideration cycle, not emergency intent. Frame expectations accordingly.
- **AI crawlers don't run JavaScript** (VERIFIED, 500M+ fetches). Server-render all load-bearing SEO/answer copy. This validates the existing `.seo-answer` doctrine — do not regress it.
- **`llms.txt` is dead** — 97% of files never fetched, 1.1% of hits from real AI bots, no provider confirms use. Don't build or sell it.
- **Doorway/scaled-content abuse is the failure mode.** Google's policy names city-swap pages and cloned multi-site networks explicitly; enforcement is live (2024 wave deindexed sites to zero). Unique per-market content is mandatory, not optional.
- **The "~15-20 safe city pages" rule is UNVERIFIED and was killed** — no primary source establishes that threshold. Don't cite a number; cite the uniqueness principle instead (Mueller's ~1,300-page doorway warning is real; the safe floor is not).
- **Zero-click + AI Overviews are structural and accelerating** (68% zero-click; AIO cuts top-1 CTR ~34-58% on informational queries). This is an argument *for* pack/call capture, not against the model.
- **Local ranking leverage:** GBP (~32%) + review velocity (fast-rising) dominate the pack; on-page/links (~57% combined) dominate local organic; citations decayed to ~7%. DIY effort goes to reviews + GBP + genuine local content first.
- **Call conversion is the model's strong suit** — home-services phone leads convert at 46% (highest of any industry). The site's job is to *generate the call*; the phone closes it.

## Evidence ledger

| # | Claim | Adversarial verdict | Confidence | Status |
|---|---|---|---|---|
| c1 | Roofing/remodeling on-site conversion is 3-7%, low end of home services, not 10%+ | **survived** | High | VERIFIED (load-bearing) |
| c2 | Roofing below-average-conversion due to longer consideration cycle vs emergency trades | flagged-uncertain | Medium | Open |
| c3 | LocaliQ 2025: Roofing & Gutters click-to-lead 3.70%, 2nd-lowest of 16 (corrected from "lowest") | flagged-uncertain (re-sourced) | Medium-High | Corrected text applied |
| c5 | Cross-industry LP median 6.6%; commercial/prof services 6.1%; top-25% 14.1%+ | flagged-uncertain | Medium | Open |
| c7 | Construction & Engineering converts 4.9%, qualified-lead basis (Ruler, 5M+ conv.) | **survived** | High | VERIFIED |
| c9 | 2026: 68.01% zero-click; 276 clicks/1,000 searches (down from 374 in 2024) | flagged-uncertain | Medium-High | Open (methodology caveats) |
| c17 | Home services call-to-lead 46%, highest of any industry (Invoca 60M+ calls) | flagged-uncertain (re-sourced) | Medium | Sub-claims dropped |
| c18 | Google spam policy names city/region funnel pages as doorway abuse | **survived** | High | VERIFIED |
| c21 | Practitioners draw the line at ~15-20 safe city pages vs ~1,300 abuse | **killed** | — | UNRECOVERED gap |
| c24 | Scaled-content-abuse policy applies to human, AI, or hybrid; "we used humans" is no defense | flagged-uncertain | Medium-High | Open (snippet-fidelity gap) |

Deferred claims (c8, c10, c12, c13, c14, c19, c20, c22, c23, c25, c26, c28, c30, c36, c37, c38, c39, c40, c41, c42, c43, c46, c48, c51, c53) are **asserted, unverified** — they were not run through the verification pass this batch and carry no adversarial verdict. Treat as unconfirmed until sourced. These cover the GEO/AIO crawler-behavior specifics, local-ranking-factor weights, review-velocity magnitude, and enforcement-case details that back the narrative above but were not individually gated.

## Calibrated confidence

Confidence is derived from evidence count, source tier, self-consistency (SC) vote, and adversarial verdict — not vibe.

- **HIGH — the conversion correction (c1, c7).** c1: SC 1.00, survived, multiple primary/named-benchmark sources (LocaliQ 3,211 campaigns; Ruler 5M+ conversions), a debunked counter-signal. c7: SC 0.80, survived, primary source direct-fetch confirmed. This is the most-verified finding in the batch and the most decision-relevant. Act on it.
- **HIGH — doorway/scaled-content policy exists and is enforced (c18, c24, plus Google first-party docs).** c18 survived at SC 1.00 against Google's own documentation. Enforcement wave is documented with named casualties. The *policy* is certain; the *specific effect size* for a cloned contractor fleet is not (no rigorous study exists — flagged as a gap).
- **MEDIUM-HIGH — zero-click / AIO structural decline (c9 + Pew + Ahrefs + seoClarity).** Multiple independent primary datasets converge on direction and rough magnitude; a Semrush/Datos counter-study shows the effect is intent-dependent, so the topline number carries methodology caveats (cross-panel stitching, mobile-app exclusion). Direction is solid; exact figure is not.
- **MEDIUM — the surrounding conversion-context claims (c2, c3, c5, c17).** All flagged-uncertain: directionally supported by credible sources but resting on secondary aggregation or snippet-fidelity gaps. Use directionally; don't quote as hard fact client-facing.
- **LOW / NONE — the ~15-20 safe-page threshold (c21).** Killed, SC 0.00, failed faithfulness and consistency. No source establishes it. Do not use.
- **UNCALIBRATED — the 25 deferred claims.** Not gated this batch. The GEO crawler specifics and local-weight figures are well-supported *in the evidence pool* (Vercel/MERJ, Whitespark, Ahrefs llms.txt study are strong), but they did not receive individual adversarial verdicts, so they inherit no calibrated confidence. Verify before any of them become load-bearing in a client deck.

## Open questions & gaps

1. **FTC review-gating / fake-review rule (2024 final rule)** — penalties and a compliant review-collection SOP. Directly relevant since review velocity is a top local lever; gating/incentivizing reviews wrong is now federally actionable. Not covered this batch.
2. **Realistic time-to-rank for a new or rebuilt local contractor site** — months to meaningful traffic. Never directly evidenced.
3. **The 12-month ramp assumption** in the two-tier projection — still not directly evidenced; it's a modeling convention, not a sourced fact.
4. **Duplicate/template footprint risk across cloned client sites** (same design system, different content) — the exact Kingmaker-fleet risk. Named as a Google policy category, but no rigorous study isolates the failure rate or effect size for a cloned contractor fleet. This is the biggest unquantified business-model risk.
5. **First-hand practitioner-forum corroboration** (r/SEO, BlackHatWorld, WebmasterWorld) on AI-backlink-automation penalty outcomes — inferred from policy text, not a confirmed real-world incident. Explicitly flagged as a gap.

Also unrecovered: **c21** (the ~15-20 safe-page threshold) — killed, not re-sourced.

## Method note

```json
{"tier":"max","mode":"balanced","rounds":8,"stopReason":"cap-fired","corpusClaims":367,"droppedDuplicates":0,"lensesExercised":["primary / peer-reviewed / academic","official docs / standards / first-party","COUNTER-EVIDENCE / skeptics / disconfirming","practitioner / field reports / forums","recent news / press / current events","data / benchmarks / primary statistics"],"openGaps":["FTC review gating / fake review rule (2024 final rule) penalties and compliant review SOP","realistic time-to-rank for new or rebuilt local contractor sites (months to meaningful traffic)","12-month ramp assumption for local SEO results — still not directly evidenced","duplicate/template footprint risk across cloned client sites (same design system, different content) — not directly addressed in this batch","first-hand practitioner forum corroboration (r/SEO, BlackHatWorld, WebmasterWorld) on AI backlink automation risk — explicitly flagged as gap in item 52"],"checklistAutoDerived":false,"verified":3,"flaggedUncertain":["c9","c17","c24","c2","c3","c5"],"killedUnrecovered":["c21"],"deferredUnverified":["c8","c10","c12","c13","c14","c19","c20","c22","c23","c25","c26","c28","c30","c36","c37","c38","c39","c40","c41","c42","c43","c46","c48","c51","c53"],"initialDraftGatePassed":true,"degraded":{"workerFailures":0,"emptyGatherRounds":0,"dryStreakEmpty":0,"urlChecksDegraded":0,"independentSelectorDegraded":false}}
```