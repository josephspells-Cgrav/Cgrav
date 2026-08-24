# TRAFFIC DECK 2.0 — Sales-Deck Strategy & Build Brief

> **For:** the Traffic Deck agent (gamma) + Joseph. **From:** strategy sessions 2026-06-01/02. **Status:** BRIEF — not built. **Do not build until Joseph gives the go.**
>
> **What this is:** the upgrade of the live Traffic Deck (`kingmaker-growth-plan.vercel.app`) from a search-volume → jobs calculator into a **full self-standing sales deck** that delivers the *logical yes*. This doc is the complete strategy + the proposed structure. Read it whole; some of it is deck slides, some is context for Joseph's verbal — clearly marked.

---

## 0 · THE CORE THESIS (read this first)

The prospect's **emotional yes is free** — *of course* they want more jobs. What loses deals is the unanswered **logical yes**: *"okay, but mechanically HOW does his site get me those jobs?"* A sharp contractor parks at "sounds nice, everyone says that" until the logic is satisfied.

**The deck's one job: satisfy the logical brain.** It must prove — affirmatively, on its own legs — *why a premium site mechanically produces more jobs, at higher tickets, that compound over time.*

It does NOT lean on "here's your current site's gap." (See §9 — the audit is deferred on purpose.) It stands alone.

**Hard constraints (inherited locks — do not break):**
- **JOBS-ONLY.** No ROI / revenue / dollar projections anywhere. The *only* dollar figure allowed is the **$497/mo** price.
- **Per-lead personalized** via existing URL params: `?business=&city=&niche=&phone=`.
- **Live URL unchanged** (`kingmaker-growth-plan.vercel.app`) — the n8n per-lead contract points there; do not rename.
- **Preserve the design DNA** from the de-salesify pass: ADHD-proof, sunlight-legible (pure-white text, big gold labels), simple, skimmable. **2.0 ADDS depth without rebuilding the wall-of-text we deliberately removed.**

---

## 1 · THE THREE VALUE LEVERS (the spine of the whole pitch)

The site touches the **entire revenue chain**, not just the top. Three levers:

### Lever 1 — GET FOUND (the site feeds the ranking)
The site is NOT just the conversion half — it materially boosts the **map-pack ranking** itself. Google ranks local on **Relevance · Distance · Prominence**. Distance is fixed; the site feeds the other two (the two you can influence):
- **Relevance** — dedicated **service pages + city pages** (80–90% unique content) tell Google "this business is relevant to '[trade] [city]'" → lifts the map-pack ranking for those searches.
- **Prominence** — site authority + **NAP consistency** + LocalBusiness **schema** strengthen the listing.
- **Reviews** — the built-in **review button** drives reviews, one of the strongest ranking levers you can grow.
- **Engagement** — a fast, trustworthy site keeps clickers from bouncing back to Google to pick a competitor (a bad site quietly *hurts* you).

> **Honesty boundary (must hold):** the site is a **force-multiplier on ranking — it works *with* the Google profile, not instead of it.** NEVER claim "the website alone ranks you #1." Defensible line: *"your website is the half of the ranking equation you can fully control."*

### Lever 2 — GET THE CALL (the 2–5% conversion — the site's home turf)
The deck's existing math: `searches → ~3% reach a site → 2–5% of visits become a job → 1–3 jobs`. **The 2–5% is NOT a given.** A slow, dated, hard-to-call site converts ~1% of visitors; a fast, trustworthy, call-optimized site converts 2–5%. **That swing is entirely the site's doing — the difference between 1 job and 3.**
- One-liner: *"My site is the difference between a click that bounces and a click that calls."*

### Lever 3 — CLOSE IT BIGGER (the premium halo — NEW)
A premium site doesn't stop at the lead. It lifts the *sale itself*:
- **Higher close rate** — the site pre-loads trust; they research you before/after, you walk in already credentialed.
- **Higher average ticket** — premium presentation = premium positioning = **less haggling.** If nothing about you looks premium, you get price-shopped.
- **More referrals** — people are proud to refer a quality operation, and it's easy ("just look at their site").

> **Honesty boundary:** keep Lever 3 **directional/qualitative** in the printed deck — do NOT print a hard "+15% ticket" number. Joseph can voice his own experience-based estimate (~10–20%) on the call; the deck stays defensible.

---

## 2 · THE FLYWHEEL (the centerpiece "how it works" diagram)

This is the single most important new element — the one visual that gives the logical brain its *"ah, I see how this compounds"* moment.

```
        Better site
            │
   ┌────────┴───────────────────────────────┐
   │                                         │
ranks HIGHER in the map pack          converts MORE clicks → calls
(relevance + prominence)              (speed + trust + UX)
   │                                         │
   └──────────────► more JOBS ◄──────────────┘
                       │
              more happy customers
                       │
            more REVIEWS (review button)
                       │
              ranks even HIGHER ──► more traffic ──► (loop)

      + every job closes BIGGER and REFERS more (Lever 3)
```

**Why the flywheel matters to the business model (say this):**
1. **It justifies the monthly fee** — not a one-time site, a machine that gets *better every month.*
2. **It explains the 90-day ramp** — flywheels start slow, then accelerate. "It takes 90 days" becomes *how flywheels work*, not an apology.
3. **It powers retention** — month 6 beating month 1 (shown in the monthly report) is the loop visibly turning.

---

## 3 · THE SPEC SHEET (the under-the-hood proof / trust artifact)

Raw mechanics of a 10/10 site. **Design intent: built to be FELT, not read** — heavy, organized, skimmable; Joseph translates the 3 that matter on the call. Each line = **spec (the jargon) + a short plain-English "so-what."** Frame on-page items as *"feeds your Google ranking,"* not just "ranks the website."

**⚙️ Technical SEO**
- Server-side rendered (Next.js) → *Google reads every word*
- Core Web Vitals: LCP <2.5s · INP <200ms · CLS <0.1 → *passes Google's speed test*
- PageSpeed 90+/100 mobile → *loads before they bounce*
- Schema: LocalBusiness · Service · AggregateRating · FAQ · Breadcrumb → *rich results*
- Mobile-first responsive → *perfect where 60% search*
- HTTPS · sitemap · clean semantic HTML · canonical → *Google trusts the structure*
- Edge CDN · WebP · lazy-load → *fast everywhere*

**📄 On-page SEO (all "feeds your Google ranking")**
- A dedicated page per **service** ("[service] [city]") → *ranks for each money term*
- A dedicated page per **city/town** in the service area → *ranks in every town you serve*
- Dedicated **brand pages** → *captures "[brand] installer [city]" + manufacturer credibility*
- Service **hub** + 80–90% **unique** content per page → *no thin/duplicate penalty; ranks broad*
- Keyword-optimized titles + meta per page → *click magnets in results*
- **NAP consistency** + embedded map + internal links + alt text → *full local signal stack*

**🎯 Conversion / UX (the 2–5% lever)**
- Click-to-call on every screen (sticky header + hero + footer) → *one tap to call*
- Trust signals above the fold: rating, reviews, license #, insurance, guarantee → *instant credibility*
- Real before/after photos → *proof, not stock*
- **Review button** (top) → Google review link → *feeds the reviews engine*
- Linked socials (FB/IG/X) + Resend contact form → *more proof + captured leads*

---

## 4 · THE TRUST STACK (trust = the conversion multiplier)

A homeowner can't judge your roofing from a website — so he judges *you* by proxy, and the site is the biggest proxy. **Premium look isn't vanity; it's the trust signal that makes him hand over a $15k check.** Stack the factors so the weight is undeniable (*"this is not a random $300 template"*):

| Trust factor | What it signals |
|---|---|
| Speed | competent, modern, "they've got it together" |
| Premium design + pacing/whitespace | established, successful, careful |
| Smooth motion | craft + attention to detail (jank = cheap) |
| Real photos (work, crew, trucks) | "real people who do real work" |
| Reviews/ratings surfaced | social proof |
| License · insurance · years · awards | legitimacy |
| Helpful info density (process, FAQ) | expertise + honesty |

Trust → higher conversion (Lever 2) **and** higher close rate + ticket (Lever 3). It's the multiplier under everything.

---

## 5 · "WHAT IT TAKES FROM YOU" — the requirements box (the honesty weapon)

A deck slide that closes the loop: *"the site does its 100% perfectly — here are the 3 things on YOU."* This is honesty-as-sales-weapon **and** churn insurance (when month 2 doubts come, point at what they agreed to).

1. **Review velocity** — ≥ ~2/mo (or a commitment to start). The fuel for getting found. *The site makes it easy (review button); you have to ask.*
2. **Speed to lead** — answer inbound leads within ~5 min. (Respond in 5 vs 30 min → ~21× more likely to qualify; ~78% of jobs go to the first responder.) *The site hands you the lead hot; don't call back tomorrow.*
3. **Close rate** — 25–33% floor. *The site lifts this (Lever 3) but you still have to be able to close at all.*

---

## 6 · PROPOSED DECK STRUCTURE (for gamma to build)

Evolve the existing 5-section deck; **target ~7–9 CLEAN, skimmable sections** — do **not** recreate the wall-of-text the de-salesify pass removed. Suggested flow:

1. **Cover** — personalized: *"Growth Plan prepared for &lt;company&gt;"* (existing)
2. **The Numbers** — their market search volume → jobs (existing math, KEEP)
3. **How it works: THE FLYWHEEL** (new centerpiece — §2)
4. **The 3 Levers** — get found / get the call / close bigger (§1; can fold into the flywheel slide)
5. **Under the Hood** — the spec sheet (§3; the "felt" trust artifact)
6. **The Trust Stack** (§4; can merge with §5 if cleaner)
7. **What it takes from you** — requirements box (§5)
8. **Live in 7 days** (existing, KEEP)
9. **The offer — $497/mo** (existing, KEEP)

Fold where it keeps things tight. Legibility > completeness on any given slide.

---

## 7 · CONTEXT (NOT deck slides — for Joseph's verbal / future deliverables)

These informed the strategy but are **not** slides:
- **Client qualification rule (count vs. velocity):** few reviews + low velocity + no commitment → decline/coach ("bare minimum to get a result at all"). Big existing base (50+) → take even at lower velocity (banked authority; site converts traffic they already get found by). **Ideal client = lots of reviews + a bad site** (already found, leaking conversions; site = low-risk pure upside).
- **Monthly report (retention, separate deliverable):** the monthly re-sell. Lead with **calls/leads (Resend form-fills + GBP calls), NOT raw visitors** (vanity, can backfire). Prereq: wire GA4 + Search Console + GBP performance into client onboarding.
- **Enrichment agent + per-lead audit:** deferred (see §9), feeds Joseph's verbal later — not the deck.
- **GMB-posting automation:** phase 2 — but strategically it's the delivery engine of the SEO upsell + retention, not a nice-to-have.

---

## 8 · HONESTY GUARDRAILS (for the copy)

- **Jobs, not dollars** (only the $497/mo price).
- **Never** "the website alone ranks you #1" — it's a force-multiplier *with* the Google profile.
- **Lever 3 stays directional** — no fake-precise ticket %.
- **Conservative jobs math** — frame search volume as the *opportunity ceiling* vs the conservative *1–3 jobs near-term ramp* (so a sharp contractor never catches a "you said 8 jobs").
- **No fake reviews / no fake GBP** ever.

---

## 9 · SCOPE — IN vs OUT for v2

**IN:** the 3 levers · the flywheel · the spec sheet · the trust stack · the requirements box · KEEP the existing per-lead search-volume math + "live in 7 days" + the $497 offer + jobs-only + per-lead personalization.

**OUT (deferred — Joseph's call 2026-06-02):** the **per-lead site AUDIT / "here's your current gap" section.** Rationale: the premium demo + this deck is likely the **first experience like this the prospect has had** — the contrast makes their current site's shortcomings **self-evident**, so calling them out is unnecessary (and risks insulting them). The audit intel still feeds Joseph's *verbal* on the call later (via the future enrichment agent) — it just isn't printed in the deck.

**DON'T TOUCH:** the live URL, the n8n per-lead contract, `job-math.json` data shape (search volume → jobs tiers, 775 NC towns), jobs-only framing.

---

## 10 · EXISTING DECK FACTS (build on what's live)

- Live: `kingmaker-growth-plan.vercel.app` (+ `/control.html` admin). Per-lead params `?business=&city=&niche=&phone=`.
- Current state: de-salesified, 5 sections (Cover → The Numbers → Capture→Jobs → Live in 7 days → $497 offer), ADHD-proof, sunlight-legible (pure-white text, big gold labels), jobs-only.
- Data: `job-math.json` — volume-tiered jobs, 2.5%/5% conversion shown, real per-town 30-mi search volume (775 NC towns).
- **Build 2.0 as an evolution of this, not a teardown.**

---

*Strategy captured 2026-06-02. Reflects 6 planning turns. Nothing here ships until Joseph approves. Questions → reply on the blackboard.*
