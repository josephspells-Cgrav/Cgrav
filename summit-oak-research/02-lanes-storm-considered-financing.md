# Summit & Oak Roofing — Conversion Research: Storm/Emergency vs. Considered Lanes + Financing

**Project:** Summit & Oak Roofing (DEMO) · Raleigh NC + Cary / Knightdale / Garner / Clayton / Apex
**Traffic model:** cold ORGANIC search (high-intent). Default lane = storm/emergency-led.
**Identity:** premium charcoal `#161719` + red `#D8262C` + white; clean-premium-not-dense.
**Builder target:** Next.js. Lead form is a placeholder; the **financing calculator must be REAL/working**.
**Compliance (NON-NEGOTIABLE, NC):** NO waiving deductibles · NO acting as a public adjuster · NO guaranteeing insurance approval · NO unattributed stats.
**Research window:** prioritized 2024–2026 sources. Compiled 2026-06-17.

---

## EXECUTIVE SUMMARY

1. **Build ONE storm-LED site that flips to a considered frame on scroll, not two sites.** High-intent organic splits into two buyer states: panicked (storm/leak → wants to *call now*) and deliberate (planned replacement → wants *proof + price + payments*). The hero serves the storm caller (urgency + click-to-call). Everything below the fold progressively serves the considered buyer (before/after, reviews, warranty, financing, objection handling). A persistent click-to-call bar keeps the emergency path open the whole scroll. (See Q1, Q6.)

2. **Click-to-call dominates the emergency lane and mobile is where it happens.** 60%+ of roofing searches are on phones; mobile converts roughly a third as well as desktop (1.5% vs 4.1%), so the mobile emergency path must be a thumb-sized phone number, not a form. Above-fold CTA placement and sub-2s load are the highest-leverage mechanics. (Q1.)

3. **NC insurance language is a minefield with a narrow safe corridor.** NC has no single "roofer insurance ad" statute, but the same conduct is illegal via three vehicles: the public-adjuster licensing law (Ch. 58 Art. 33A), the insurance-fraud statute (§ 58-2-161), and a 2021 dual-role ban (SB 205). Safe verbs: *inspect, document, meet, coordinate, provide, work with*. Trip-wire verbs: *negotiate, settle, adjust, represent, maximize, guarantee, waive*. Full SAFE/BANNED lists in Q2. **Write to the Texas DOI standard** (it's the most explicit and produces the same result).

4. **Considered-lane conversion is built on proof density, not copy volume.** Before/after sliders, reviews placed *adjacent to CTAs* (not siloed in a testimonials section), specific warranty framing, transparent cost ranges, and objection-handling FAQ. Reviews displayed prominently are cited at large conversion lifts; the durable principle is **trust signal next to the conversion point.** (Q3.)

5. **Financing is the single biggest considered-lane lever — and it works by reframing the number.** "$89/mo" defuses the "$14k" sticker shock that kills planned-replacement deals. Lead with the monthly figure; place financing both inline near the cost section AND as the working calculator. $0-down and 0%-promo are the headline offers. (Q4.)

6. **The financing calculator is fully spec'd and ready to build** (Q5): project-cost slider $9k–$45k (default $15k), term button-group `[24,36,48,60,72,84,120,144]` (default 120), APR via credit-tier buttons (7.99 / 13.99 / 22.99 / 29.99 / 0% promo) or a slider, standard amortization formula with the **r=0 → P/n** branch, big hero monthly number, real-time slider updates, disclaimer adjacent to the result. JS snippet included.

**Total BUILD RECOMMENDATIONS across this dossier: 47** (counted at the end of each section).

---

## Q1 — STORM / EMERGENCY LANE: conversion mechanics

### Findings

**The emergency buyer's mental state defines the UI.** Someone searching "emergency roof repair" mid-storm calls the first site that loads. This makes two things non-negotiable: **speed** and a **frictionless call path**. Every one-second load delay is cited at ~7% fewer conversions; target sub-2s. ([800.com](https://www.800.com/blog/digital-marketing-for-roofers-2024-complete-guide/), [salesgenie.com](https://www.salesgenie.com/blog/roofing-lead-playbook-storm-response-seo-field-execution-tips/), [ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))

**Click-to-call dominates; mobile is the battleground.**
- 60%+ of roofing searches happen on phones. ([ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))
- Mobile converts at ~1.5% vs desktop ~4.1% — so the *mobile* emergency experience is where conversions leak, and a giant tap-to-call number recovers them. ([ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))
- The recommended emergency pattern: **a huge clickable phone number, an ultra-simple form (Name / Phone / one-line description), and a callback promise** (e.g., "within 15 minutes"). ([800.com](https://www.800.com/blog/digital-marketing-for-roofers-2024-complete-guide/))

**The Emergency Alert Bar is the signature storm pattern.** A thin, high-contrast bar fixed to the top of the page with urgent copy + phone, e.g. *"24/7 Emergency Leak Repair | Call Now: (xxx) xxx-xxxx."* Running a top-of-page storm-recovery banner during storm season is cited as converting better than long hero prose. ([800.com](https://www.800.com/blog/digital-marketing-for-roofers-2024-complete-guide/), [ppc.io](https://ppc.io/roofing-landing-page-examples))

**Urgency cues that convert (storm context):**
- 24/7 availability + emergency response, stated explicitly ("24/7 Emergency Repairs").
- "Free storm inspection" / "free storm damage inspection" — standard, expected, and legal (see Q2).
- Hail / wind / hurricane damage framing tied to the local market ("wind & hail damage across the Triangle").
- Damage-is-hard-to-see framing: storm damage often isn't visible from the ground → drives the inspection booking.
- The real, factual urgency lever: **damage worsens fast + the claim-filing window is finite** (NC storm claims generally filable within ~1–3 years, but a leak compounds now). This gives genuine urgency without any insurance *guarantee*.

**Benchmarks to design against:**
- Average roofing site converts 0.5–2%; healthy 3–5%; high-performing 5–8%+; elite local pages 8%+. ([ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))
- Storm-damage landing pages are targeted at ~15% conversion in aggressive playbooks (aspirational, not a floor). ([salesgenie.com](https://www.salesgenie.com/blog/roofing-lead-playbook-storm-response-seo-field-execution-tips/))
- Above-the-fold CTA placement, personalized CTA copy, and white space around CTAs are all cited with large lifts (treat magnitudes as directional, not as quotable hard stats on the demo). ([ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))

### BUILD RECOMMENDATIONS — Q1

1. **Sticky emergency bar (top, full-width, charcoal `#161719` w/ red `#D8262C` accent):** `24/7 Storm & Leak Response — Call (xxx) xxx-xxxx`. Phone is a `tel:` link. Persists on scroll. On mobile, this is the single most important element — keep it pinned.
2. **Hero = storm-led:** headline names the emergency + locale ("Storm Damage in Raleigh? We Respond 24/7"), one-line subhead, **primary CTA = click-to-call** (red button, `tel:` link), secondary CTA = "Free Storm Inspection" (opens placeholder form).
3. **Mobile-first call path:** a fixed bottom call button (thumb zone) on mobile in addition to the top bar. Tap target ≥ 48px.
4. **Sub-2s load gate:** hero image optimized/`next/image`, no render-blocking; this is a conversion mechanic, not just perf hygiene.
5. **"Free storm inspection" offer block** with the legal framing from Q2 (document damage, meet your adjuster on-site) + a "no-obligation" trust line.
6. **Damage-education micro-section:** "Storm damage is hard to spot from the ground" with hail/wind/hurricane bullet types → CTA to book inspection.
7. **Callback-speed promise** ("We call back fast") near the form — converts on responsiveness, not on any insurance outcome.
8. **Honest urgency, not fake scarcity:** lead urgency from "damage worsens + filing window" — never countdown timers or "claim expires today."

---

## Q2 — INSURANCE-CLAIM ASSISTANCE: compliant in NC + converting

### Findings (NC legal landscape)

**Three statutes do the work of Texas's single roofer-ad law:**

- **Public-adjuster licensing — NC Gen Stat Ch. 58, Art. 33A.** A "public adjuster" (§ 58-33A-5(7)) is anyone who, *for compensation, on behalf of the insured,* (a) acts/aids in **negotiating for or effecting settlement** of a claim, (b) advertises/represents themselves **as a public adjuster**, or (c) **investigates or adjusts losses or advises an insured about first-party claims**. § 58-33A-10(a): you may not "act or hold himself out as a public adjuster" without an NCDOI license. A roofer doing any of those acts for the homeowner, for value, without a license = unlicensed public adjusting (illegal). ([ncleg.gov Art. 33A](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_58/Article_33A.html), [§ 58-33A-10 Justia](https://law.justia.com/codes/north-carolina/chapter-58/article-33a/section-58-33a-10/))
- **Insurance fraud — NC Gen Stat § 58-2-161.** Unlawful to present any "statement" (defined to include any *estimate of property damages, invoice, bill for services*) "knowing that the statement contains false or misleading information… material to the claim." Penalty: Class H felony (<$100k) / Class C felony (≥$100k). **This is the vehicle that makes deductible-waiver illegal in NC** — see below. ([ncleg.gov § 58-2-161](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_58/GS_58-2-161.html))
- **Dual-role ban — 2021 Senate Bill 205.** A roofing contractor may not also act as the adjuster on the same project/claim. Contractor OR adjuster, never both on the same loss. ([SB 205](https://www.ncleg.gov/Sessions/2021/Bills/Senate/PDF/S205v1.pdf))

**Deductible waiver = insurance fraud in NC (no separate statute needed).** The carrier pays *total cost minus deductible*; the homeowner owes the deductible. If the roofer "eats" the deductible, the estimate/invoice submitted to the insurer is inflated above what the homeowner actually pays — a false "estimate of property damages / bill for services" under § 58-2-161. NC DOJ's consumer Roofers page and NC DOI warn homeowners the deductible is theirs to pay. **Only safe deductible posture: "your deductible is your responsibility," or don't mention a dollar figure at all.** ([NC DOJ Roofers](https://ncdoj.gov/protecting-consumers/home-repair-and-products/roofers/), [Litespeed Construction NC](https://litespeedconstructionashevilleroofing.com/can-a-roofing-contractor-pay-your-insurance-deductible/))

**"Free inspection" is fine; the risk is the claim-promises bolted onto it.** No FTC roofing-specific rule exists; the most explicit, quotable regulator is **Texas DOI's "Roofing and insurance: Know the law,"** and because NC's Art. 33A + § 58-2-161 produce the same prohibitions, the TDI list is a reliable NC-safe checklist. TDI's enumerated prohibited conduct includes: offering to negotiate settlements or file a claim for the policyholder; promising to recover "every dime you are owed"; advertising to help avoid "incorrect settlement pricing"; telling anyone (incl. insurers) you represent the policyholder; offering to waive/rebate/absorb the deductible. TDI also notes **websites count as advertisements** (Tex. Admin. Code § 21.102) — homepage copy is regulated speech. ([Texas DOI](https://www.tdi.texas.gov/consumer/storms/roofing-and-insurance-know-the-law.html), [Property Insurance Coverage Law Blog](https://www.propertyinsurancecoveragelaw.com/blog/roofing-contractors-are-not-legal-insurance-claims-experts/))

**Real compliant copy in the wild (quoted from live roofing sites):**
- Best Roofing Now (Charlotte NC): *"Our team meets with your insurance adjuster on-site to walk through every item of damage."* · *"We inspect your entire roof and document all storm damage with detailed photos, drone footage, and written assessment."*
- Mighty Dog Roofing: *"free drone inspections to document damaged areas with photo and video evidence… provides the documentation your adjuster needs."*
- Roof Squad: *"direct communication with your adjuster… can meet them on your roof when possible."*

> ⚠️ **Real-world caution — even big players cross the line.** Best Roofing Now *also* runs *"We handle the entire insurance process,"* *"help maximize your claim,"* and *"Most homeowners pay only their deductible."* Those are exactly the phrasings TDI flags as risky (handle-everything / maximize / deductible-absorption inference). **Do NOT copy these** — proof that "what a competitor does" ≠ "what's compliant."

### The line: DOCUMENTING (legal) vs. ADJUSTING (illegal) in NC

| You're the expert on the **roof** → LEGAL | You'd be acting as an **adjuster** → ILLEGAL |
|---|---|
| Inspect, photograph, measure damage | Negotiate the *settlement amount* with the insurer |
| Write your own repair estimate / scope of work | Interpret or argue the homeowner's *policy coverage* |
| Be present at the adjuster's inspection; point out damage | Tell the carrier you "represent" the policyholder |
| Hand the homeowner documentation to submit themselves | Handle / "file" the claim *on the homeowner's behalf* |
| Explain *your scope of work* | Take a fee contingent on the *claim outcome* |

**Copywriter mantra: advocate for your scope of work, never for the settlement.** Statutory trip-wires: *negotiate, settle, adjust, represent, advise-on-the-claim* — all "for compensation, on behalf of the insured."

### SAFE-LANGUAGE LIST (compliant in NC + converts) — use these

1. **"Free, no-obligation storm damage inspection."** — free inspection is standard + legal; "no-obligation" converts on trust.
2. **"We document your storm damage with detailed photos, drone footage, and a written report."** — pure documentation = legal.
3. **"We'll meet your insurance adjuster on-site and walk them through every area of damage."** — coordination / presence = legal; high trust.
4. **"Storm damage is hard to spot from the ground — our inspection shows you exactly what's up there."** — urgency + value, no claim promise.
5. **"We provide the documentation you need to file your claim with confidence."** — you supply docs; the homeowner files.
6. **"Wind, hail, and hurricane damage are commonly covered by NC homeowner policies — an inspection tells you where you stand."** — educational + factual; "commonly," not "guaranteed."
7. **"Licensed, local, and experienced with the storm-damage roofing process across the Triangle."** — authority + locality, no guarantee.
8. **"We work directly with insurance companies throughout the process."** — "work with," not "negotiate against / represent you."
9. **"Your deductible is your responsibility — we'll give you an honest, detailed estimate so there are no surprises."** — compliant deductible posture reframed as transparency.
10. **"No pressure, no hidden fees — just a straight assessment of your roof's condition."** — trust without insurance promises.
11. **"Damage worsens fast — schedule your inspection now."** — real urgency, factual.
12. **"From inspection to the final nail, we stand behind our work with a workmanship warranty."** — guarantee the WORK, never the claim.

### BANNED-LANGUAGE LIST (never use) — each with why

1. **"We waive / cover / absorb your deductible"** — insurance fraud (§ 58-2-161); inflates the estimate to the carrier.
2. **"You pay $0 out of pocket"** — implies deductible absorption = same fraud.
3. **"Free roof if your claim is approved"** — deductible-waiver + outcome guarantee in one.
4. **"We guarantee your claim will be approved"** — false promise; you can't control the carrier.
5. **"We negotiate with your insurance company for you"** — public adjusting (§ 58-33A-5(7)); unlicensed = illegal.
6. **"We handle the entire insurance claim for you"** — reads as adjusting on the insured's behalf; dual-role ban (SB 205).
7. **"We represent you to your insurer"** — statutory PA language ("on behalf of the insured").
8. **"We'll maximize your settlement / get you more money"** — adjusting the claim value = PA activity.
9. **"We fight the insurance company for you"** — negotiating the settlement on the insured's behalf.
10. **"We're your insurance claim experts / specialists"** — implies advising on coverage/claims; holding out as an adjuster.
11. **"We file your claim for you"** — TDI explicitly prohibits "file a claim for the policyholder."
12. **"We recover every dime you're owed"** — TDI-named banned phrase; settlement/outcome promise.
13. **"Most homeowners pay only their deductible"** — implies the roofer absorbs any gap (deductible-waiver inference) + outcome promise.

### BUILD RECOMMENDATIONS — Q2

9. **Insurance section copy must use only SAFE-list verbs** (`inspect / document / meet / coordinate / provide / work with`). Route any insurance copy through the SAFE/BANNED lists before shipping.
10. **Add a one-line on-page disclaimer near the insurance section:** "Summit & Oak documents storm damage and works with your insurer; we are not a public adjuster and do not negotiate claims or guarantee coverage." (Turns compliance into a trust signal.)
11. **Deductible posture:** if mentioned at all, state "your deductible is your responsibility" — never a $0/absorb/waive claim.
12. **No unattributed stats anywhere on the rendered site.** Any number must be either self-evidently the company's own (e.g., "500+ Triangle roofs") or sourced. Do not paste research percentages into UI copy.
13. **"Meet your adjuster on-site" as a headline trust block** — it's the highest-converting *and* fully legal insurance message; make it a feature card.
14. **Demo guardrail comment in code:** annotate the insurance component with the SAFE/BANNED rule so future edits don't reintroduce banned phrasing.

---

## Q3 — CONSIDERED / PLANNED-REPLACEMENT LANE: what lifts conversion

### Findings

**Proof > promises.** For the deliberate buyer, the conversion engine is social proof + objection removal, not urgency.
- **Before/after sliders:** an interactive single-photo before/after slider is cited as an engaging, trust-building element; before/after galleries are repeatedly named as core proof. ([podium.com](https://www.podium.com/article/conversion-rate-optimization-roofing), [duskdigital.io](https://www.duskdigital.io/roofing-landing-page-for-maximum-conversions/))
- **Reviews placed prominently** are cited at very large conversion lifts; the durable, defensible principle is **place the trust signal adjacent to the conversion point** (reviews next to CTAs, not siloed). ([ghostrep.ai](https://www.ghostrep.ai/blog/roofing-website-conversion-rate))
- **Warranty framing must be specific.** "We have a warranty" is weak; state *what it covers* and *for how long*, and distinguish **manufacturer (material)** vs **workmanship (labor)** warranties. Vague warranties read as hollow. ([wppip.com](https://wppip.com/blog/2025/08/20/50-roofing-website-ideas-that-convert-visitors-into-customers-2025-edition/))
- **Objection handling** = surfacing and answering the concerns that block the sale *before* they fester (price, disruption, "will you still be here in 10 years," cleanup, timeline). An FAQ that pre-empts objections lifts conversion. ([boagworld.com](https://boagworld.com/marketing/objection-handling/), [podium.com](https://www.podium.com/article/conversion-rate-optimization-roofing))
- **Cost transparency:** the considered buyer is price-shopping; a transparent range + the financing reframe (Q4) reduces the bounce-to-compare behavior. Financing options should be "prominently displayed." ([podium.com](https://www.podium.com/article/conversion-rate-optimization-roofing), [creativeroofingmarketing.com](https://creativeroofingmarketing.com/top-7-tips-for-a-high-converting-roofing-landing-page/))

**Trust-signal density beats long copy.** Pages with 10+ heavy sections dilute conversion; the move is *dense proof near each decision point*, not more prose. ([uwindi.com](https://uwindi.com/mastering-your-roofing-landing-page-for-optimal-lead-generation/), [ppc.io](https://ppc.io/roofing-landing-page-examples))

### BUILD RECOMMENDATIONS — Q3

15. **Before/after slider component** (draggable handle), 3–5 real Triangle project pairs. Premium charcoal frame, red handle. Single component, reused.
16. **Distribute reviews — don't silo them.** Put a 1–2 review snippet (★ + name + town) *directly adjacent to every primary CTA* (hero, mid-page, financing, final), in addition to a reviews strip. Trust-next-to-conversion-point.
17. **Aggregate rating chip** ("4.9 ★ · 200+ Google reviews" — only if a real number; otherwise a generic "rated 5 stars by Triangle homeowners" with no fabricated count).
18. **Specific warranty block:** two cards — *Manufacturer Warranty* (material, e.g. "up to 50-yr / lifetime per shingle line") + *Workmanship Warranty* (labor, "X-year Summit & Oak guarantee"). State coverage + duration explicitly.
19. **Objection-handling FAQ** (accordion) answering: cost/financing, project duration, cleanup/property protection, licensing & insurance, "what if it rains," warranty longevity, why-not-cheapest-bid.
20. **Cost-transparency section** with honest ranges ("most Triangle roof replacements run $9k–$45k depending on size, pitch, and material") feeding directly into the financing calculator CTA.
21. **Material tier cards** (Good / Better / Best — architectural / designer / premium) to anchor value and pre-qualify away from cheapest-bid shoppers.
22. **"Why Summit & Oak" trust row:** licensed/insured, local, years in Triangle, crews-not-subs (whatever's true) — authority signals for the deliberate buyer.
23. **Process/timeline strip** ("Inspection → Estimate → Schedule → Install → Cleanup → Warranty") to remove disruption anxiety.

---

## Q4 — FINANCING as a conversion lever

### Findings

**Financing converts by defusing sticker shock.** Many homeowners delay/abandon projects purely on the upfront number; financing lets them say yes at "$X/mo." It's repeatedly named a *critical* conversion lever and should be "prominently displayed." ([denefits.com](https://www.denefits.com/home-improvement-financing-for-contractors/), [handoff.ai](https://www.handoff.ai/blog/how-to-offer-financing-as-a-residential-construction-contractor-in-2025), [podium.com](https://www.podium.com/article/conversion-rate-optimization-roofing))

**The reframe is the mechanic: monthly, not total.** Lead with the small monthly figure; de-emphasize the project total. Lead-gen calculators (HFS, Roofle) deliberately show *only* the monthly number to keep focus there. The "$89/mo instead of $14k" framing is the whole psychological point. ([hfsfinancial.net](https://www.hfsfinancial.net/roof-loan-calculator/), [roofle.com](https://www.roofle.com/roof-loan-calculator))

**Headline offers in the market:** $0 down, and 0%-for-6/12/18-months promos ("12 months no interest, no payments, no money down"; "18-month same-as-cash"). These are the hooks that move planned-replacement buyers. ([cmkconstructioninc.com](https://www.cmkconstructioninc.com/offers/financing/), [improveitusa.com](https://www.improveitusa.com/financing/), [medallionbank.com](https://www.medallionbank.com/blog/home-improvement-financing-for-contractors/))

**Where to place it (considered lane):** (a) inline at the cost section as the reframe ("or as low as $X/mo"), (b) as the working calculator block, (c) a review snippet beside it for trust, (d) referenced in the objection-handling FAQ ("Do you offer financing? Yes — $0 down…").

### BUILD RECOMMENDATIONS — Q4

24. **Lead every price mention with the monthly reframe:** show "as low as $XX/mo" as the primary, project total as secondary/de-emphasized.
25. **Financing hook band** above the calculator: "$0 Down · Flexible Monthly Payments · 0% Promo Options (on approved credit)."
26. **Place the calculator in the considered flow** — after cost transparency / material tiers, before the final CTA (so the buyer hits proof → price → "I can afford this" → convert).
27. **Pair the calculator with a review snippet + CTA** ("Get my exact rate" / "Request a free estimate") — never a naked calculator.
28. **Keep 0%/promo as a clearly-labeled toggle or footnote,** distinguished from the blended default (and distinguish true-0% from deferred-interest in any explainer copy).
29. **Mention financing in the objection-handling FAQ** to catch buyers who don't scroll to the calculator.

---

## Q5 — FINANCING CALCULATOR: complete build spec (THIS GETS BUILT)

> Real, functional monthly-payment estimator. Roof projects $9,000–$45,000. Next.js. Every number cited; conflicts in the UNCERTAIN section.

### 5.1 The formula (CONFIRMED correct)

Standard amortizing-loan / EMI formula, verified against Wikipedia (EMI), Chase, Bankrate:

```
M = P · [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]
```
- **P** = principal (amount financed = project cost − down payment)
- **r** = monthly rate = APR / 100 / 12
- **n** = term in months
- **M** = monthly payment

**0% APR edge case (must branch):** when `r = 0` the formula divides by zero. The limit is an even split:
```
M = P / n
```
0% promos are real and common (Wisetack offers true 0%), so this branch is mandatory.

### 5.2 Drop-in JavaScript (handles r=0)

```js
/**
 * Monthly payment for a fixed-rate amortizing loan.
 * @param {number} principal  Amount financed (project cost minus down payment), dollars.
 * @param {number} aprPercent Annual percentage rate as a percent, e.g. 12.99 (not 0.1299).
 * @param {number} months     Term in months (n).
 * @returns {number} monthly payment in dollars (unrounded).
 */
function monthlyPayment(principal, aprPercent, months) {
  if (principal <= 0 || months <= 0) return 0;
  const r = aprPercent / 100 / 12;            // monthly rate
  if (r === 0) return principal / months;     // 0% promo: even split, no divide-by-zero
  const growth = Math.pow(1 + r, months);     // (1+r)^n
  return (principal * r * growth) / (growth - 1);
}

/** Derived outputs from the same inputs. */
function loanSummary(principal, aprPercent, months) {
  const m = monthlyPayment(principal, aprPercent, months);
  const totalPaid = m * months;               // total of payments
  const totalInterest = totalPaid - principal;
  return {
    monthlyPayment: m,
    totalOfPayments: totalPaid,
    totalInterest: Math.max(0, totalInterest), // clamp tiny float negatives at r=0
  };
}
```

**Dev notes:** pass APR as a percent (`12.99`), not a decimal — the `/100/12` converts. Round **only for display** (`toLocaleString('en-US',{style:'currency',currency:'USD'})`), never the stored value. Guard `principal<=0` / `months<=0` so cleared inputs don't render `NaN`/`Infinity`. The `Math.max(0,…)` keeps `totalInterest` clean at exactly 0%. (Sources: [Wikipedia EMI](https://en.wikipedia.org/wiki/Equated_monthly_installment), [Chase amortization](https://www.chase.com/personal/mortgage/education/financing-a-home/loan-amortization), [Bankrate](https://www.bankrate.com/mortgages/amortization-calculator/))

### 5.3 Inputs (type / min / max / step / default)

| Input | Type | Min | Max | Step | Default | Notes |
|---|---|---|---|---|---|---|
| **Project cost** | Slider + synced number field (+ optional preset chips) | **$9,000** | **$45,000** | $500 | **$15,000** | Matches the stated roof range. Weather Shield defaults $15k + preset chips. |
| **Down payment** *(optional)* | Preset buttons ($0 / 10% / 15% / 20%) or slider | $0 | 50% of cost | $500 | **$0** | $0-down is the headline offer; default $0. |
| **Loan term (months)** | **Button group / segmented control** (NOT a slider) | — | — | — | **120** (10 yr) | Discrete. Real calcs never use a slider for term. |
| **APR** | **Credit-tier preset buttons** (recommended) *or* slider | 0% | 35.99% | 0.5% (slider) | **12.99%** blended (or 7.99% on "Excellent") | See APR handling below. |

**Term option set (canonical):** `[24, 36, 48, 60, 72, 84, 120, 144]` months, default **120**. Longer terms are what make the monthly number small for roof-sized balances. (Sources: [weathershieldroofers.com](https://weathershieldroofers.com/roof-financing-calculator/), [roofle.com](https://www.roofle.com/roof-loan-calculator), [instantroofer.com](https://www.instantroofer.com/roof-financing-calculator/))

**APR handling — pick one (recommended = credit-tier buttons):**
- **Credit-tier preset buttons (RECOMMENDED):** user taps their band; each maps to a fixed representative APR. Best UX, self-documents the estimate, soft-qualifies the lead (Weather Shield does exactly this):
  - **0%** — "Promo (12-mo, on approved credit)"
  - **7.99%** — Excellent (720+)
  - **13.99%** — Good (690–719)
  - **22.99%** — Fair (630–689)
  - **29.99%** — Building (<630)
- **Raw APR slider** 0%–35.99%, default 12.99% (simplest; Roofle/HVAC do this; downside: users can dial an unrealistic rate).
- ❌ Do **not** show a single hard payment with **no APR visible** — that's the compliance trap (§5.6). Whatever pattern you pick, the APR used must be displayed next to the result.

### 5.4 Outputs

| Output | Prominence | Default? | Pattern |
|---|---|---|---|
| **Estimated monthly payment** | **Big hero number** `$XXX/mo` (48–64px) — the focal point | **Yes (primary)** | Universal |
| Amount financed (cost − down) | Secondary line | Yes | Weather Shield / HVAC |
| APR used | Secondary line (required next to payment, compliance) | Yes | Weather Shield |
| Term | Secondary ("for 120 months") | Yes | Universal |
| Total of payments (M × n) | Secondary breakdown | Yes (expandable OK) | Premium calcs |
| Total interest (total − principal) | Secondary breakdown | Yes (expandable OK) | Premium calcs |

**Trust posture:** show the monthly number big, with total interest + total cost available (a secondary row or "see full breakdown" expander). Lead-gen calcs hide the total to inflate the perceived deal; a *trustworthy* roofing site shows it. (Sources: [weathershieldroofers.com](https://weathershieldroofers.com/roof-financing-calculator/), [hvacloadcalculate.com](https://hvacloadcalculate.com/hvac-financing-calculator/), [hfsfinancial.net](https://www.hfsfinancial.net/roof-loan-calculator/))

### 5.5 Defaults + realistic 2025–2026 APR ranges

| Parameter | Default | Range |
|---|---|---|
| Project cost | **$15,000** | $9,000–$45,000 (slider, $500 step) |
| Down payment | **$0** | $0–50% |
| Term | **120 months** | 24–144 mo (button set) |
| APR (single blended) | **12.99%** | 0%–35.99% |
| APR (excellent / "as low as") | **7.99%** | — (don't advertise sub-6% — teaser nobody hits) |

**Recommended hard-coded APR band: 7.99% – 35.99%.** Anchors: average personal-loan APR ~12.3% (Bankrate, Jun 2026); the 36% ceiling is the confirmed practical/legal max for mainstream unsecured lenders. Real provider ranges: **Wisetack 0%–35.9%** (published), **Hearth ~5%–35.99%**, **Acorn 6.99%–~36%**, **Foundation Finance ~6.90%–17.99%**, **Synchrony HOME 26.99%/34.99%**, **GreenSky not publicly disclosed** (do not show a precise APR). $0-down + 0% promos are real; keep 0% as a separate labeled toggle and distinguish **true 0%** (Wisetack) from **deferred-interest** (GreenSky/Synchrony — full retroactive interest if not paid in window). (Sources: [wisetack.com/consumers](https://www.wisetack.com/consumers), [Bankrate personal loan rates](https://www.bankrate.com/loans/personal-loans/rates/), [NerdWallet personal loan rates](https://www.nerdwallet.com/article/loans/personal-loans/personal-loan-interest-rates), [acornfinance.com](https://www.acornfinance.com/), [gethearth.com](https://www.gethearth.com/))

### 5.6 Premium UI pattern + accessibility

**Layout:** desktop = two-column (inputs left, **sticky result card right**); mobile = **result card on top, inputs below**. The non-negotiable is the **big monthly number** as the focal point.

**Patterns that convert + feel premium:**
- Result as a giant number (`$199/mo`), everything else secondary.
- **Real-time update on slider drag** — recompute on every `input` event; the formula is trivially cheap (no Calculate button, no debounce needed).
- The **"$X/mo instead of $Y total" reframe** — lead with monthly, de-emphasize total.
- **Preset cost chips** (Repair / Partial / Full Replacement / Premium) so users don't cold-start at $0.
- **Credit-tier APR buttons** double as soft qualification.
- **Disclaimer adjacent to the result** (not footer fine print).
- A **CTA beside the result** ("Get my exact rate" / "Request a free estimate") + micro-copy ("checking won't affect your credit score" — only if a real partner offers a soft pull; otherwise omit).

**Accessibility (required):** visible `<label>` per slider; `aria-valuemin/max/now` + `aria-valuetext` formatted as "$15,000"; full keyboard (arrows = step, Home/End = min/max); slider paired with a synced typed number field; result in an `aria-live="polite"` region; AA contrast on the hero number AND the disclaimer (no 8px light-gray); honor `prefers-reduced-motion` on any count-up animation.

**Clone targets:** Weather Shield Roofers (preset cost chips + credit-tier APR buttons + term button group + hero monthly + total-interest breakdown) is the best overall; Roofle for the clean real-time slider→hero-number feel.

### 5.7 Compliance — disclaimer copy + the TILA rule

> Not legal advice — TILA / Regulation Z ([12 CFR §1026.24](https://www.consumerfinance.gov/rules-policy/regulations/1026/24/)) is a real federal rule with penalties. Final copy should get counsel / financing-partner compliance review. (For the DEMO, the disclaimer below is the safe default.)

**The trigger-term rule:** if a credit ad states any one of — (1) down payment amount/%, (2) number of payments/repayment period, (3) **amount of any payment** ← *a monthly estimator hits this*, (4) amount of any finance charge — it must **also clearly disclose all three of:** (a) down payment, (b) full repayment terms, (c) the rate labeled **"APR."** Stating APR alone is NOT a trigger; "low monthly payments" alone is NOT a trigger. (Sources: [CFPB Reg Z §1026.24](https://www.consumerfinance.gov/rules-policy/regulations/1026/24/), [Fed Reserve — Reg Z Advertising](https://www.consumercomplianceoutlook.org/2021/first-issue/understanding-regulation-zs-advertising-requirements/))

Two compliant builds: **(A)** output a clearly-labeled estimate/range, don't pre-fill a specific advertised APR; or **(B, recommended)** show the payment WITH APR (labeled) + down payment + full term beside it — the representative-example pattern. Your calc shows term + payment anyway, so B is natural; just label the rate "APR" and keep it visible.

**Ready-to-paste disclaimer (place adjacent to the result, legible — not footer fine print):**
> **Estimate only — not a financing offer or commitment to lend.** The payment shown is an illustration based on the amount, term, and a representative APR you selected; it is not a quote, approval, or guaranteed rate. Your actual rate, term, and monthly payment depend on your creditworthiness and are subject to credit approval. Financing is provided by third-party lenders, not by Summit & Oak Roofing.

**Real disclaimer language to model (verbatim):** Wisetack — *"All financing is subject to credit approval. Your terms may vary… Offers range from 0% to 35.9% APR based on amount requested and creditworthiness."* ([wisetack.com/consumers](https://www.wisetack.com/consumers)); U.S. Bank — *"This is not a credit decision or a commitment to lend… for education purposes only."* ([usbank.com](https://www.usbank.com/home-loans/home-improvement-loan-calculator.html)); Acorn — *"Estimated interest rates, APRs, and other terms are not binding in any way."* ([acornfinance.com](https://www.acornfinance.com/home-improvement/home-improvement-loan-calculator/)).

**What NOT to do:** ❌ single hard payment with no APR/term beside it · ❌ the words "rate/quote/offer/pre-approval/guaranteed/you qualify" · ❌ disclaimer in tiny gray footer · ❌ invented representative-example numbers · ❌ omitting the third-party-lender line.

### BUILD RECOMMENDATIONS — Q5

30. **Build the calculator as a self-contained client component** using the `monthlyPayment()` + `loanSummary()` snippets above (with the r=0 branch).
31. **Project-cost slider** $9k–$45k, step $500, default $15k, synced to a typed number field + optional preset chips.
32. **Term as a button group** `[24,36,48,60,72,84,120,144]`, default 120.
33. **APR via credit-tier buttons** (0 / 7.99 / 13.99 / 22.99 / 29.99) — default 12.99% blended; show the APR used next to the result.
34. **Down-payment control** defaulting to $0 (preset buttons $0/10/15/20%).
35. **Hero monthly number** (48–64px, charcoal w/ red accent), real-time on slider drag, secondary rows for amount financed / APR / term / total interest / total cost (breakdown can be an expander).
36. **Disclaimer block adjacent to the result** using the ready-to-paste copy (Summit & Oak named as non-lender).
37. **CTA beside the result** ("Request a free estimate" → placeholder form).
38. **Full a11y pass** (labels, aria-valuetext as currency, keyboard, aria-live result, AA contrast on number + disclaimer, reduced-motion).
39. **No fabricated representative example** — if one is shown, base it on a real lender's published numbers (e.g., Hearth's $10,000 / 14.50% / 36 mo / $344.21).

---

## Q6 — ONE site, storm-LED, that also converts considered buyers

### Findings

**Don't build two sites — build one with a storm-led top and a considered-led body.** The two buyer states arrive on the *same* high-intent organic pages; the page must serve both without forcing a choice. ([ppc.io](https://ppc.io/roofing-landing-page-examples), [duskdigital.io](https://www.duskdigital.io/roofing-landing-page-for-maximum-conversions/))

**Mechanics for serving both:**
- **Persistent emergency path:** the sticky call bar (Q1) keeps the storm caller's path open during the entire considered-buyer scroll. The emergency buyer never has to scroll to convert; the considered buyer scrolls past it harmlessly.
- **Hero serves the emergency lane** (urgency + click-to-call); **the body progressively serves the considered lane** (proof → warranty → cost → financing → objections).
- **Service routing via the nav / service cards:** specialty entries (Storm Damage, Roof Replacement, Repair) pre-qualify and route intent; a top-of-page storm banner runs hot during storm season. ([ppc.io](https://ppc.io/roofing-landing-page-examples), [800.com](https://www.800.com/blog/digital-marketing-for-roofers-2024-complete-guide/))
- **Don't bloat:** 10+ heavy sections dilute urgency for the 30-second caller. Keep the storm path short and the considered proof dense-but-tight. ([uwindi.com](https://uwindi.com/mastering-your-roofing-landing-page-for-optimal-lead-generation/))

**Recommended section order (single home page):**
1. Sticky emergency call bar (persistent)
2. Storm-led hero (urgency + click-to-call + secondary "Free Inspection")
3. Trust bar (licensed/insured · local · rating · years)
4. Storm/emergency block (24/7, free inspection, "meet your adjuster on-site," damage-education) — *serves the panicked buyer; SAFE-list language*
5. Before/after slider (transition into proof)
6. Reviews strip + review snippets seeded near CTAs
7. "Why Summit & Oak" / authority row
8. Material tier cards (Good/Better/Best)
9. Cost transparency → leads into financing
10. **Financing calculator** (the working tool) + financing hook band + review snippet + CTA
11. Process/timeline strip (removes disruption anxiety)
12. Objection-handling FAQ (incl. financing, deductible posture, warranty longevity)
13. Final CTA (call + form) with a review snippet
14. Footer (NAS, service-area towns, licensing, insurance disclaimer line)

This order takes the panicked buyer straight to a call (bar + hero) and walks the deliberate buyer through proof → value → affordability → objection-removal → convert.

### BUILD RECOMMENDATIONS — Q6

40. **Single page, storm-led hero + considered body** — do not fork into separate emergency/considered sites.
41. **Persistent sticky call bar** across the whole scroll (the emergency lane's always-on exit).
42. **Hero for emergency, body for considered** — section order per the list above.
43. **Service routing in nav + cards** (Storm Damage / Roof Replacement / Repair) to pre-qualify intent; storm banner toggle for storm-season.
44. **Seed reviews + CTAs at every decision point** (hero, storm block, after before/after, at financing, final) rather than one testimonials silo.
45. **Keep the storm path to ≤ ~2 scrolls to a call;** push depth (proof/financing/FAQ) below it so neither buyer is taxed.
46. **Insurance disclaimer line in footer** (the Q2 non-PA disclaimer) so it's site-wide, not just in one section.
47. **Optional storm-mode flag** (config boolean) that swaps hero headline + intensifies the alert bar during active storm events — single-site way to get "hero variants" without a second site.

---

## SOURCES

**Storm/emergency + general CRO**
- [800.com — Digital Marketing for Roofers 2024](https://www.800.com/blog/digital-marketing-for-roofers-2024-complete-guide/)
- [Salesgenie — Roofing Lead Playbook: Storm Response](https://www.salesgenie.com/blog/roofing-lead-playbook-storm-response-seo-field-execution-tips/)
- [GhostRep — Roofing Website Conversion Rate benchmarks](https://www.ghostrep.ai/blog/roofing-website-conversion-rate)
- [Wp PiP — 50+ Roofing Website Ideas That Convert (2025)](https://wppip.com/blog/2025/08/20/50-roofing-website-ideas-that-convert-visitors-into-customers-2025-edition/)
- [ALM Corp — Roofing SEO 2026](https://almcorp.com/blog/roofing-seo-2026-complete-guide/)
- [PPC.io — Roofing Landing Page Examples](https://ppc.io/roofing-landing-page-examples)
- [Uwindi — Roofing Landing Page Design](https://uwindi.com/mastering-your-roofing-landing-page-for-optimal-lead-generation/)
- [DUSK Digital — Roofing Landing Page for Max Conversions](https://www.duskdigital.io/roofing-landing-page-for-maximum-conversions/)
- [Three Bird Creative — Anatomy of a Perfect Roofing Landing Page](https://threebirdcreative.com/anatomy-of-a-perfect-landing-page-for-roofing-contractors/)
- [Podium — CRO for Roofing (2024)](https://www.podium.com/article/conversion-rate-optimization-roofing)
- [Boagworld — Objection Handling](https://boagworld.com/marketing/objection-handling/)
- [Creative Roofing Marketing — High-Converting Roofing Landing Page](https://creativeroofingmarketing.com/top-7-tips-for-a-high-converting-roofing-landing-page/)

**NC insurance compliance**
- [NC Gen Stat Ch. 58 Art. 33A — Public Adjusters (full text)](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_58/Article_33A.html)
- [NC Gen Stat § 58-33A-10 — License required (Justia)](https://law.justia.com/codes/north-carolina/chapter-58/article-33a/section-58-33a-10/)
- [NC Gen Stat § 58-33A-80 — Standards of conduct (Justia)](https://law.justia.com/codes/north-carolina/chapter-58/article-33a/section-58-33a-80/)
- [NC Gen Stat § 58-2-161 — False statements (insurance fraud)](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_58/GS_58-2-161.html)
- [NC Senate Bill 205 (2021) — roofer/adjuster dual-role](https://www.ncleg.gov/Sessions/2021/Bills/Senate/PDF/S205v1.pdf)
- [NC DOJ — Consumer Roofers guidance](https://ncdoj.gov/protecting-consumers/home-repair-and-products/roofers/)
- [NC DOI — Consumer's Guide to Public Adjusters](https://www.ncdoi.gov/consumer-guide-public-adjusters/open)
- [Texas DOI — Roofing and insurance: Know the law](https://www.tdi.texas.gov/consumer/storms/roofing-and-insurance-know-the-law.html)
- [Property Insurance Coverage Law Blog — Roofers Are Not Insurance Claims Experts](https://www.propertyinsurancecoveragelaw.com/blog/roofing-contractors-are-not-legal-insurance-claims-experts/)
- [Litespeed Construction (Asheville NC) — Can a Roofer Pay Your Deductible?](https://litespeedconstructionashevilleroofing.com/can-a-roofing-contractor-pay-your-insurance-deductible/)

**Financing + calculator**
- [Weather Shield Roofers — Roof Financing Calculator (clone target)](https://weathershieldroofers.com/roof-financing-calculator/)
- [Roofle — Roof Loan Calculator](https://www.roofle.com/roof-loan-calculator)
- [Instant Roofer — Roof Financing Calculator](https://www.instantroofer.com/roof-financing-calculator/)
- [HFS Financial — Roof Loan Calculator](https://www.hfsfinancial.net/roof-loan-calculator/)
- [Wisetack — Home Services Calculator](https://www.wisetack.com/calculator/home-services) · [Wisetack consumer disclosures](https://www.wisetack.com/consumers)
- [HVAC Load Calculate — Financing Calculator](https://hvacloadcalculate.com/hvac-financing-calculator/)
- [U.S. Bank — Home Improvement Loan Calculator](https://www.usbank.com/home-loans/home-improvement-loan-calculator.html)
- [Denefits — Home Improvement Financing for Contractors](https://www.denefits.com/home-improvement-financing-for-contractors/)
- [Handoff.ai — How Contractors Offer Financing (2025)](https://www.handoff.ai/blog/how-to-offer-financing-as-a-residential-construction-contractor-in-2025)
- [ImproveItUSA — Financing](https://www.improveitusa.com/financing/) · [CMK Construction — Financing offer](https://www.cmkconstructioninc.com/offers/financing/) · [Medallion Bank — Home Improvement Financing](https://www.medallionbank.com/blog/home-improvement-financing-for-contractors/)

**Formula + APR**
- [Wikipedia — Equated monthly installment](https://en.wikipedia.org/wiki/Equated_monthly_installment)
- [Chase — Loan amortization](https://www.chase.com/personal/mortgage/education/financing-a-home/loan-amortization)
- [Bankrate — Amortization calculator](https://www.bankrate.com/mortgages/amortization-calculator/) · [Bankrate — Personal loan rates](https://www.bankrate.com/loans/personal-loans/rates/)
- [NerdWallet — Personal loan interest rates](https://www.nerdwallet.com/article/loans/personal-loans/personal-loan-interest-rates)
- [Acorn Finance](https://www.acornfinance.com/) · [Hearth](https://www.gethearth.com/) · [GreenSky disclosures](https://www.greensky.com/disclosures/)

**Compliance (financing)**
- [CFPB — Regulation Z §1026.24 (Advertising)](https://www.consumerfinance.gov/rules-policy/regulations/1026/24/)
- [Federal Reserve — Understanding Reg Z's Advertising Requirements](https://www.consumercomplianceoutlook.org/2021/first-issue/understanding-regulation-zs-advertising-requirements/)

---

## UNCERTAIN / CONFLICTING

**Compliance (insurance)**
- **No single NC "roofer insurance-advertising" statute.** NC's prohibitions are assembled from Art. 33A + § 58-2-161 + SB 205. High confidence the *conduct* is illegal; lower confidence a regulator pursues mere website *wording* (e.g. "we handle the claim") as aggressively as Texas can under Tex. Admin. Code § 21.102. **Safe posture: write to the Texas standard anyway** — costs nothing, removes doubt.
- **"Free inspection" is unambiguously legal**; the only uncertainty is when it's bundled with claim-outcome promises.
- **§ 58-33A-80 exact subsection** for the roofing-specific dual-role bar traces to SB 205 rather than sitting verbatim in -80; confirm the section number against enrolled SB 205 before quoting a cite in legal-facing copy.
- **"Most homeowners pay only their deductible"** is used by real NC roofers but implies the contractor eats the gap (fraud risk). Flagged banned out of caution; omit for the demo.
- **Not legal advice** — synthesis from primary statutes + regulator guidance. A real client should get NC-licensed attorney / NCDOI review before shipping insurance copy.

**Financing calculator**
- **APR floor wobbles 6% vs 7.99%.** Use **7.99% as the realistic floor**; show 6.99% only if footnoted "excellent credit + autopay." Don't default to sub-6% (teaser almost nobody gets).
- **GreenSky has no official public APR range** (third-party 6%–29.99%); if listed as a partner, describe as "deferred-interest promo plans, APR not publicly disclosed" — no precise number.
- **Service Finance 2.99%–12.99%** comes from a 2022 dealer FAQ; structure durable, endpoints may have drifted — re-verify before publishing as a hard quote.
- **Hearth's own floor is internally inconsistent** (5% vs 7.99%); it's a broker, rates explicitly illustrative.
- **Mosaic / GoodLeap / Sunlight are solar-first** — their low APRs are tax-credit/dealer-fee-structured and NOT representative of a plain roof loan; Sunlight's $10k minimum even excludes a $9,000 roof. Don't benchmark roofing rates against them.
- **36% ceiling is solid** (Bankrate/NerdWallet/LendingTree agree); **~12.3% average** well-corroborated (Bankrate Jun 2026 + Experian/Fed) — the two most trustworthy anchors.
- **TILA/Reg Z trigger depends on layout** (proximity/conspicuousness). The safe build (representative-example, APR labeled + visible next to the payment) + partner/counsel sign-off is the durable answer. NC may add state interest-cap/disclosure requirements.

**CRO stats**
- Many cited conversion-lift magnitudes (e.g. "reviews +270%," "above-fold +317%," "personalized CTA +202%") come from marketing-vendor blogs, not peer-reviewed studies. **Treat as directional, not load-bearing — and never paste them into rendered site copy (unattributed-stats rule).** The defensible takeaways are the *patterns* (trust-next-to-CTA, above-fold CTA, sub-2s load, mobile-first call path), not the exact percentages.
- **Mobile vs desktop conversion (1.5% vs 4.1%) and 60%+ mobile traffic** are consistent across multiple roofing-CRO sources and directionally reliable; exact figures will vary by market.
