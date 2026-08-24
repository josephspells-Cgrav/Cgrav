> [!warning] PROVISIONAL — 1 load-bearing claim(s) killed/unrecovered: c11. Treat flagged findings as unverified; see Open questions & gaps.

# question

What is Buildertrend (buildertrend.com) — complete current feature inventory, pricing/packaging, real-user strengths/complaints, roofing-specific fit vs trade competitors, and hard technical/business moats — as the verified evidence base for a recreate-difficulty tier list (S = a 2-person AI-driven shop with a live custom Next.js/Postgres roofing CRM can recreate or beat it; F = virtually impossible to recreate)?

## Answer

**Bottom line: Buildertrend's moat is breadth, integrations, and incumbency — not technology. Nothing in it is algorithmically hard.** It is a wide, deeply cross-wired CRUD + workflow suite (leads→jobs, scheduling, daily logs, estimates, takeoff, change orders, selections, budget/job-costing, invoicing, client/sub portals, reports, time clock, payments). A 2-person AI-driven shop on Next.js/Postgres can recreate any single module without difficulty.

**The tier answer is scope-dependent, and that split is the whole decision:**

- **Beat it on a roofing slice → achievable, S/A-tier for the shop.** Buildertrend was built for custom home builders/remodelers on 6-month projects and maps only *partially* onto roofing (c66, survived). It lacks roofing-native table stakes: aerial roof measurement (EagleView) and roofing-supplier integrations (ABC Supply, SRS, QXO) — the exact things AccuLynx/JobNimbus/Roofr win on. A focused custom roofing CRM can out-fit it and beat it on UX and price transparency.
- **Recreate the *whole* incumbent → F-tier, near-impossible.** Not because any piece is hard, but because of (a) enormous surface area kept coherent by cross-module coupling, (b) a partnership web (QuickBooks/Xero/Sage/Gusto two-way sync, ~2.99% payments processing, Aeris weather feed), and (c) distribution/incumbency: self-reported 20,000 contractors, 1M+ users, ~5,000 reviews at ~4.5★, 500k+ app downloads (c1, flagged-uncertain — all self-reported/aggregated).

**The real difficulty is distribution and breadth, not code.** That is the load-bearing insight for the tier list.

**Where Buildertrend is actively weak (your opening to beat it):** mobile-app reliability (crashes, thin offline mode, clunky job-switching), no meaningful sales-tax handling, slow bill entry vs QuickBooks, recurring QuickBooks-sync failure modes, no bulk data export (lock-in that breeds churn resentment), a steep/click-heavy UX, and volume-based pricing that balloons unpredictably (one churned user: ~$4,300/yr → $17,000+/yr, c41). Pricing is now fully delisted behind a quote form (c1).

## Key findings

- **Feature inventory is broad and real (mostly first-party-documented).** Sales (CRM Hub, Proposals, Email Marketing — bundled), lead→job one-click conversion that carries all data/files/proposals (c9), scheduling (Gantt/critical-path/dependencies/templates/baseline + cross-module coupling to budget/CO/invoices/selections), daily logs with Aeris weather + read receipts, estimates + native Takeoff, change orders, rebuilt Selections/Allowances, job-costing budget, six financial reports, time clock with geofencing, client + sub portals, warranty (claims-management-first), payments, and 2025-26 AI features (AI Client Updates, Bill Pay).
- **The coupling is the hard-to-copy part, not any single feature.** Lead→job carries data forward (c9); schedule ↔ budget ↔ change orders ↔ selections update each other via shared cost codes. Rebuilding one module is easy; rebuilding the *coherent web* of them is the labor moat.
- **Integrations are a curated single-digit list, not a marketplace.** QuickBooks, Xero, Sage Intacct, Gusto, Pro Xtra (financial); HubSpot, Salesforce, Pipedrive (CRM). Two-way QBO/Xero sync is a genuine build-and-partner cost — but it is also Buildertrend's #1 complaint surface (duplicate transactions, change orders not posting, portal payments not reconciling, one-directional edits).
- **Roofing fit is partial by design.** Strengths (sub portals, change-order workflows, daily logs, plan-sets, phase cost codes, draw/milestone billing) roll onto *new-construction* roofing; it lacks aerial measurement and roofing-supplier integrations that roofing-native tools own (c66).
- **Pricing is opaque and volume-scaled.** Delisted mid-2026; third-party proxy estimates ~$399-499 / ~$699-799 / ~$999-1,099/mo, unlimited users/projects (c39, corrected). The "CRM bundled at entry tier" claim is **unconfirmed** — one pricing breakdown lists Essential features without CRM/lead-management. Bills scale with volume and can far exceed list (c41).
- **Two-way calendar sync is unverified.** The compound scheduling claim was **killed** on its "two-way Google/Outlook sync" clause — the closest comparable (CoConstruct) documents one-way, read-only iCal push. Treat Buildertrend calendar sync as likely one-way until proven otherwise (c11).
- **Switching-cost lock-in is real and resented.** No bulk export; users report paying indefinitely just to retain historical records — a moat that simultaneously fuels churn.

## Evidence ledger

| ID | Claim (abbrev.) | Source tier | Adversarial verdict | Confidence |
|----|-----------------|-------------|---------------------|-----------|
| c1 | 20k contractors / 1M+ users / ~5k reviews @4.5★ / pricing delisted mid-2026 | First-party self-report + review-site corroboration | **flagged-uncertain** (SC 0.67; self-reported, review count is cross-platform aggregate) | Medium |
| c9 | Lead→job is one-click and carries all data/files/legacy proposals (architectural coupling) | First-party help center | **flagged-uncertain** (SC 0.67; not externally traceable; Salesforce analog shows pattern is standard) | Medium |
| c11 | Scheduling: Gantt/critical-path/dependencies/templates/baseline + **two-way** Google/Outlook sync + bidirectional coupling to budget/CO/invoices/selections | First-party product page | **killed** (SC 0.00; two-way-sync clause unconfirmed — CoConstruct comparable is one-way read-only). *Non-sync scheduling features remain well-supported.* | Low (as-compound) |
| c39 | Three tiers ~$399-499 / ~$699-799 / ~$999-1,099/mo, unlimited users/projects; ~~CRM bundled at entry~~ | Third-party pricing proxy | **corrected** — tiers/prices stand; "CRM bundled at Essential tier" is **unconfirmed** (getonecrew lists Essential without CRM) | Medium |
| c41 | Churned user: quote rose ~$4,300→$17,000+/yr on ~$190K volume; cancelled over price | Review forum (TrustRadius, platform-verified) | **flagged-uncertain** (SC 1.00, CoVe✓; snippet-fidelity risk) | Medium-High |
| c66 | Built for custom home builders/remodelers on 6-mo projects; strengths roll onto roofing only partially | Roofing-CRM comparison (2026) | **survived** (live source + SC 1.00 + faithful snippet) | High |
| — | **Deferred, asserted-unverified (33 claims):** feature-inventory and moat detail drawn from first-party docs + review sites + forums, not independently re-verified this pass — IDs: c67, c3, c6, c10, c14, c20, c23, c26, c27, c30, c31, c32, c37, c40, c42, c44, c45, c46, c47, c48, c50, c53, c54, c55, c56, c57, c58, c59, c60, c61, c65, c68, c69 | Mixed (first-party product/help docs; Capterra/G2/TrustRadius; Reddit; competitor comparisons) | **asserted, unverified** | Corpus-level: Medium (multi-source convergence on the *shape*, per-claim unaudited) |

Corpus note: the 33 deferred claims collectively cover the feature inventory (CRM intake channels, daily logs + Aeris weather, estimates + Takeoff, change orders, Selections/Allowances, job-costing budget, six reports, time-clock geofencing, client/sub portals, warranty, payments ~2.99%, QBO/Xero two-way sync + its failure modes, mobile reliability + offline limits, no-bulk-export lock-in, ~5k reviews/4.5★, roofing scores). They converge across independent source tiers on the same picture even though each is individually unaudited.

## Calibrated confidence

- **Overall tier-list conclusion — HIGH.** The decision ("moat is breadth/integrations/incumbency, not technology; beatable on a roofing slice, near-impossible to recreate whole") rests on ~94 corpus claims converging across all six lenses — first-party docs, review sites, forums, competitor comparisons, press, and app-store data — that agree on the *shape*. The conclusion is robust to any single claim being soft, because no source contradicts the shape.
- **Roofing-fit gap — HIGH.** c66 survived (SC 1.00, faithful, live source) and is reinforced by the roofing-software-guide scoring and the missing aerial-measurement/supplier-integration observations.
- **Scale/pricing figures — MEDIUM.** c1 and c39 are flagged/corrected: self-reported or third-party-proxy, with the "CRM bundled at entry" sub-claim actively unconfirmed. Directionally reliable, not exact.
- **Scheduling two-way sync — LOW/UNCONFIRMED.** c11 killed on the sync-direction clause; treat bidirectional calendar sync as unproven. The rest of scheduling is first-party-documented and credible.
- **Per-feature depth — MEDIUM (corpus), LOW (per-claim).** The 33 deferred claims are asserted-unverified; trust the aggregate pattern, not any single unaudited line.

Net: build the tier list on the *structure* (breadth + integrations + incumbency vs roofing-native gaps), which is high-confidence; caveat exact numbers and the two-way-sync detail.

## Open questions & gaps

1. **Roofing fit vs AccuLynx / JobNimbus / Roofr — no named head-to-head.** Only generic roofing-comparison-site scores seen (e.g., Buildertrend 7.7/10 vs AccuLynx 9.1/10 in one roundup); no direct feature-by-feature matchup against these three specific competitors.
2. **Moats not yet evidenced — CBUSA dealer network, financing product, support-org scale.** QBO sync, payments, and mobile are covered, but the dealer/buying-group network, any financing offering, template library depth, and support-organization scale are not evidenced.
3. **Company scale / history / acquisitions — thin.** Only the self-reported "20,000 contractors / 1M+ users" stat seen; no founding history, funding, or acquisition record (notably the CoConstruct merger, referenced only obliquely via migration complaints).
4. **Killed/unrecovered:** c11 (two-way Google/Outlook calendar sync) — not re-sourced; do not assume bidirectional sync.
5. **Stop reason:** saturated-with-gaps — diverse searches stopped yielding new signal while the three named gaps above remained open.

## Method note

```json
{"tier":"standard","mode":"breadth","rounds":2,"stopReason":"saturated-with-gaps","corpusClaims":94,"droppedDuplicates":0,"lensesExercised":["primary / peer-reviewed / academic","official docs / standards / first-party","COUNTER-EVIDENCE / skeptics / disconfirming","practitioner / field reports / forums","recent news / press / current events","data / benchmarks / primary statistics"],"openGaps":["roofing fit vs AccuLynx/JobNimbus/Roofr — only generic roofing-comparison-site scores seen, no named head-to-head vs these three specific competitors","moats: financing, GPS/mobile-offline depth, CBUSA network, templates, support org — QBO sync/payments/mobile covered, but CBUSA dealer network, financing product, and support-org scale not evidenced yet","company scale/history/acquisitions — only self-reported '20,000 contractors / 1M+ users' stat seen; no founding history, funding, or acquisition record yet"],"checklistAutoDerived":false,"verified":2,"flaggedUncertain":["c1","c9","c41"],"killedUnrecovered":["c11"],"deferredUnverified":["c67","c3","c6","c10","c14","c20","c23","c26","c27","c30","c31","c32","c37","c40","c42","c44","c45","c46","c47","c48","c50","c53","c54","c55","c56","c57","c58","c59","c60","c61","c65","c68","c69"],"initialDraftGatePassed":true,"degraded":{"workerFailures":0,"emptyGatherRounds":0,"dryStreakEmpty":0,"urlChecksDegraded":0,"independentSelectorDegraded":false}}
```
---

# OS18 SYNTHESIS — Recreate-Difficulty Tier List (2026-07-10)

> The decision layer on top of the evidence above, calibrated to the LIVE mabrey-crm codebase. Engine verdict this rests on: "moat is breadth, integrations, and incumbency — not technology" (HIGH confidence, robust to individual soft claims).

**S — already live in our CRM or beat-ready:** lead board w/ source labels · Customer 360 + transcript-searchable calls · global search · roofing-shaped scheduling (their two-way calendar sync claim KILLED in verification) · EagleView-fed options matrix (BT has NO aerial measurement — c66 HIGH) · claim/supplement tracking (BT has no restoration workflow) · photos/docs · commissions + payroll CSV (BT lacks) · install map (BT lacks) · period reports · the AI layer (Alex answers phones; BT's AI writes emails).

**A — clear builds, days-to-weeks each:** client portal · crew/sub portal (rep-tier tokens = groundwork live) · daily logs + weather · change orders as roofing supplements/upgrades · to-dos · proposals + e-sign · email/SMS drips · PWA time clock w/ geofence · invoices + Stripe payment links.

**B — real work, gated on Sean's data not tech:** job costing/budget-vs-actual (price book = the seam) · lite POs · warranty registry · QuickBooks ONE-WAY push (deliberate scope discipline — two-way is BT's #1 complaint surface).

**C — grindy, defer until km-crm-template multi-client scale:** QBO two-way reconciliation · native mobile (Expo wrapper fine; offline-first sync engine is the hard part) · selections/allowances (custom-build concept, roofing barely uses) · blueprint takeoff (wrong trade's problem — EagleView IS roofing takeoff).

**D — partnership/compliance-gated:** embedded payments AS PROCESSOR (Stripe Connect delivers the feature without payfac burden) · embedded financing (partner drop-in doable; being the lender, no) · enterprise accounting/payroll sync tier · GPS fleet/offline field suite.

**F — not software, route around:** 20k-contractor install base/brand/reviews · CBUSA group-purchasing network · 20-yr template library + support org (Buildertrend University) · the certified-partnership web. The judo: F-tier is why nobody recreates the COMPANY — and it's irrelevant inside one roofing company's ops. Instance-per-client sidesteps the entire moat; their no-bulk-export lock-in inverts into our "your instance, your data" pitch.

**Provisional caveats carried:** no named head-to-head vs AccuLynx/JobNimbus/Roofr (generic scores only: BT 7.7 vs AccuLynx 9.1 in one roundup) · CBUSA/financing/support-org scale unevidenced · exact prices directional (delisted mid-2026) · c11 two-way sync killed.
