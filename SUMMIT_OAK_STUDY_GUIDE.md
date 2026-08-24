# Summit & Oak — Operator's Study Guide
*Become the expert on your own machine. Live audit of `kingmaker-summit-oak-roofing.vercel.app` — 146 pages, by category.*
*Built 2026-06-28 from the live sitemap (ground truth) + our verified claim library. Every number is graded so you never repeat a stat that gets you caught.*

---

## How to read the numbers (the honesty rail)
The **mechanisms** are bulletproof. The **percentages** are where the industry lies. Grading:

- ✅ **SAY IT** — primary source (Google, Verisk, a controlled split-test). State as fact + name the source.
- 🟡 **RANGE ONLY** — vendor/case-study/survey. Say "roughly," "in one case study," "industry-reported." Never a hard fact.
- 🔴 **DON'T SAY** — unsupported, inflated, or commonly-misattributed. Use only as "people claim X — the honest version is Y."

Source of truth for every figure: `KM_VALUEPROP_CLAIM_LIBRARY.md` (55 claims, adversarially verified).

---

## PART 0 — How Google decides what ranks (read this first)
Everything below ladders up to **one thing**: Google's job is to return the most relevant, trustworthy, genuinely-helpful result for a query. It "cares" about a page only insofar as that page proves one of three things:

1. **Relevance** — does this page *match the specific query?* Google wants one clean page per intent. Specificity wins; one page trying to be about everything matches nothing well.
2. **Authority / Prominence** — is this source *trusted + known?* Built from links (internal + external), brand entity signals, and associations with known entities (GAF, your GBP, BBB).
3. **Helpfulness / Experience** — is this *actually useful, written by someone who's done it?* Google's helpful-content system + E-E-A-T (Experience, Expertise, Authoritativeness, Trust). The **March 2026 core update amplified "Experience" above all.**

**The three enforcement systems that decide your fate (know these cold):**
- **Helpful-content classifier** — site-wide. Thin/templated pages don't just fail themselves — they drag your *good* pages down too. ✅ (Google primary.) This is why every page is genuinely written.
- **Doorway / scaled-content spam policy** — ✅ Google names both as enforceable violations. Multiple near-identical pages aimed at cities = doorway. AI-spun pages at scale = scaled content. This is *why* we de-matrixed.
- **E-E-A-T (from Google's Quality Rater Guidelines)** — Trust is the most important letter; Experience is the newest + (since March 2026) the most rewarded. About/credentials/named authors/real photos feed this.

**The technical floor Google rewards + a $297 GHL template can't clear:**
- **Static HTML (SSG)** — Google (and AI crawlers) read raw HTML. ✅ AI crawlers (GPTBot, ClaudeBot) *don't execute JavaScript* (500M+ fetches, Vercel). A client-side GHL page is an empty shell to them.
- **Crawl efficiency** — clean internal mesh = Google finds + recrawls everything fast. No orphans.
- **Schema (JSON-LD)** — Google doesn't *have* to guess what your page is; you hand it the facts in a language it parses. Confirmed live on Raleigh: RoofingContractor, Service, FAQPage, BreadcrumbList, 15× Review, AggregateRating, Person, GeoCoordinates, Speakable, Offer.
- **Core Web Vitals** — ✅ a Google-confirmed signal; slow mobile pages get suppressed + bounce (+123% bounce probability 1s→10s load, Google).

Keep those three pillars + three enforcement systems in your head. Every "Why Google cares" line below is just one of them applied.

---

## PART 1 — The 13 categories
*Each: What it is · Why Google cares (the mechanism) · Why it drives traffic · Why it converts · Numbers (graded) · How to say it · Content angle.*

### 1. Home (`/`)
**What:** the conversion hub — hero, trust strip, service/area/proof links, primary CTA.
**Why Google cares:** it's your **entity root.** Google reads the home page to answer "who is this business?" — name, location, schema, what you do. It's also where authority concentrates and flows out through your internal links. Get the entity clear here and every other page inherits it.
**Why traffic:** ranks for brand + "[city] roofing contractor" head term; the internal-link launchpad that pushes authority to money pages.
**Why convert:** sets the frame in the first scroll — trust signals + a single dominant CTA. Conversion is decided above the fold.
**Numbers:** ✅ speed-to-lead — 5 min vs 30 min raises contact odds **~100×**, qualify odds **~21×** (MIT/InsideSales original study). The home CTA starts that clock.
**How to say it:** "The homepage's only job is to make one promise and route attention. Most contractor homepages make twelve and route nothing."
**→ Content angle:** "I graded 5 roofer homepages in 60 seconds — the one thing they all get wrong."

### 2. Service Pages (`/services` + 10, plus `/commercial-roofing`)
**What:** dedicated page per service — replacement, repair, emergency, storm-repair, inspection, maintenance, metal, ventilation, gutters, skylights, + commercial.
**Why Google cares:** **query-to-page matching.** Google wants ONE clean, canonical page per intent. Someone searching "emergency roof repair" and someone searching "roof maintenance plan" are different queries — Google rewards a specific page for each and struggles to rank a single page that mushes them together. Ten real pages = ten precise relevance matches.
**Why traffic:** ✅ a single deep, top-ranking page also ranks top-10 for **~1,000 other long-tail keywords** (Ahrefs) — one real page harvests variations a brochure can't.
**Why convert:** service-specific intent gets a service-specific answer + CTA (dual-intent: urgent = call-first; planned = estimate).
**Numbers:** 🟡 deep-vs-thin clusters at **~2–4× traffic / ~1.5–3× leads** (vendor case studies). ✅ thin/templated pages cause **site-wide drag** (Google's unhelpful-content classifier).
**How to say it:** "Ten real service pages aren't ten pages — they're ten front doors, each catching a different search."
**→ Content angle:** "One 'Services' page vs ten service pages — why the roofer with one is invisible."

### 3. Roofing Materials (`/materials` + 7)
**What:** asphalt shingles, metal, tile, slate, cedar shake, synthetic/composite, flat-roof systems.
**Why Google cares:** **topical authority + coverage.** Google's helpful-content system rewards sites that cover the *whole* subject, not just the sell page. A roofer who has a real page on every material reads as a genuine expert on roofing — so Google trusts the *whole site* more, including the money pages. Also fills **informational intent** Google needs results for.
**Why traffic:** catches the **research-stage** buyer ("metal vs shingles," "best shingle for NC heat") — high-volume, low-competition long-tail.
**Why convert:** demonstrates expertise + range; warms a researcher before a competitor reaches them. Material = where ticket size is decided (slate/metal = 2–4× an asphalt ticket).
**Numbers:** 🟡 answer-first format lifts AI-citation ~27% (directional). Real win = **keyword surface area** (8 pages = 8 clusters).
**How to say it:** "Material pages meet the buyer six weeks before they're ready — and own the question they're Googling."
**→ Content angle:** "Metal vs shingle in NC, honestly" (each material = one video).

### 4. Brand Pages (`/brands` + GAF, Owens Corning, CertainTeed)
**What:** a page per manufacturer the company is certified with.
**Why Google cares:** **entity association.** Google already understands GAF / Owens Corning as major entities in its knowledge graph. When you associate your business with them (certified-installer pages, `sameAs` links), Google strengthens its picture of *what* you are and *how trusted* you are — prominence by association. Google verifies authority partly by who/what you're connected to.
**Why traffic:** intercepts **brand + intent** searches ("GAF roofer near me," "Owens Corning installer [area]") — high-intent, low-competition.
**Why convert:** **borrowed authority** — "GAF Master Elite" is real scarcity (~top 2% of roofers); the page makes it legible + searchable.
**Numbers:** no clean stat — a **trust + intent-capture** play. Don't invent a %.
**How to say it:** "When you're GAF Master Elite, a brand page isn't bragging — it catches the homeowner who already trusts GAF and just needs to know you carry it."
**→ Content angle:** "What 'GAF Master Elite' actually means (and why 98% of roofers can't say it)."

### 5. Storm Damage Pages (`/storm-damage` + hail, wind, tree, insurance-claims)
**What:** hub + four damage-type pages including the insurance-claims funnel.
**Why Google cares:** **intent-match for surging, high-urgency queries + freshness.** When a storm hits, Google sees a spike in "[hail/wind] roof damage [area]" searches and needs a relevant, recent, authoritative *local* page to serve. A standing, well-structured storm page is exactly what it reaches for — versus a generic homepage it has to settle for.
**Why traffic:** captures the **post-storm surge** — highest-intent, highest-urgency, highest-ticket search there is.
**Why convert:** storm = insurance = five-figure job + a scared homeowner who needs a guide. The insurance page positions you as the expert who handles the carrier.
**Numbers:** ✅ storm roof = **five-figure** ($17,631 avg, Verisk 2025, national; $14,747 avg wind/hail claim — **NATIONAL not NC**; $30B+ US roof claims 2024). 🟡 post-storm **+300–800%** search 48h, **45–65%** close (industry-reported). 🔴 "1 in 5 re-roofs storm-driven" / "74% calls unanswered" — inflated; honest = "a meaningful share" / "~45% mid-point, a range."
**How to say it:** "A storm page is a net you hang before the wind blows. When hail hits, the roofer with the page catches the search; everyone else is door-knocking."
**→ Content angle:** "What we actually see after a Triangle hailstorm" + "read your own roof after a storm."

### 6. Service Areas / Location Pages (`/service-areas` + 14 cities)
**What:** Raleigh, Cary, Apex, Durham, Wake Forest, Holly Springs, Fuquay-Varina, Garner, Clayton, Morrisville, Knightdale, Wendell, Zebulon, Rolesville.
**Why Google cares:** **geo-relevance — but ONLY if it's real.** For "[service] [city]" queries, Google's *organic* algorithm wants a page genuinely about that city. The catch: it runs the **doorway filter** to reject thin city-swaps. So Google cares about a location page that proves local relevance (local jobs, reviews, landmarks, ~7k unique words like Raleigh) — and *penalizes* one that just find-replaces the city name. Depth is both the unlock and the safety. **Separately:** the *map pack* is gated by physical proximity (geometry), which a page can't change — so these win **organic, not the pack**, in no-office towns.
**Why traffic:** ✅ dedicated service-area pages rank you **organically in cities with no office** (Whitespark; Sterling Sky 8,186-business study). 14 towns from one address.
**Why convert:** local proof converts a stranger. Raleigh page = **7,100+ words, 159 "Raleigh" mentions, 15 reviews, local project schema** — passes the **"delete the city name" test.**
**Numbers:** ✅ organic-in-no-office = yes / pack = nearly impossible (proximity). 🟡 one case: service-area pages → **+340% leads** over 2 yrs. ✅ thin city-swap = **doorway risk.**
**How to say it:** "A location page doesn't put you in the Raleigh map pack from Clayton — that's proximity, that's geometry. It puts you in the **organic** results for all 14 towns. That's the half of Google nobody optimizes."
**→ Content angle:** "Why your competitor ranks in 12 towns and you rank in 1" (organic vs pack — your most differentiated argument).

### 7. Resources Hub + Articles (`/resources` + 34 articles)
**What:** the topical-authority cluster — cost drivers, insurance (ACV vs RCV, denied claims, supplements), material guides, timing, contractor-selection, NC-specific (pine pollen, algae, Triangle weather).
**Why Google cares:** this is **textbook helpful content + topical authority.** Google's entire 2022→2026 direction rewards genuinely useful pages that fully answer a query. 34 articles = 34 satisfied intents + hard proof you're a real authority on roofing (not a lead-gen shell). It also lifts the *whole site's* trust under the helpful-content system, and the internal links from these articles physically pass authority to your money pages.
**Why traffic:** **34 long-tail nets** — the engine of the deep-site thesis.
**Why convert:** answers the objection *before* the call → leads arrive pre-sold + educated.
**Numbers:** ✅ firms crossing **311+ indexed pages had >2× median leads** (HubSpot, 1,400 firms, correlation). ✅ internal links from articles = the **+25%** lift (SearchPilot, causal). 🟡 long content tends to earn more links (Backlinko — flagged, don't quote the exact %).
**How to say it:** "34 articles isn't a blog — it's 34 more ways to be the answer to a question the brochure sites don't even have a page for."
**→ Content angle:** this folder = **34 pre-written video scripts.**

### 8. Roofing Cost Guide + Calculators (`/roofing-cost`, `/roof-cost-calculator`, `/financing/payment-calculator`)
**What:** cost guide (editorial) + instant cost estimator + monthly-payment calculator.
**Why Google cares:** **high-intent query satisfaction + engagement signals.** "Roof cost" is one of the highest-volume queries in the trade; Google wants to serve a page that genuinely answers it. A calculator makes users *interact and stay* — dwell time + task completion are positive behavioral signals that the result satisfied the searcher.
**Why traffic:** "roof cost" is the **highest-volume, highest-intent** research query — owning it intercepts nearly every buyer at the money moment.
**Why convert:** calculator captures a lead *during* research (not after) + **qualifies ticket size** before a human spends a minute.
**Numbers:** 🟡 modeled **value-per-lead ~$2,400** ($12k ticket × ~20% close; band $1,425–$4,500). ✅ instant result starts the 5-min speed-to-lead clock.
**How to say it:** "The cost page is the busiest intersection in the trade. A calculator turns that traffic into a qualified, ticket-sized lead while the competitor's form just says 'we'll get back to you.'"
**→ Content angle:** "What actually drives your roof's price" (disarms the 'why so expensive' objection).

### 9. Glossary (`/resources/glossary` + 20 terms)
**What:** 20 defined terms — drip edge, flashing, ACV/RCV, class-4 shingles, ice-and-water-shield, roofing square, etc.
**Why Google cares:** **entity / knowledge-graph building.** Google constructs its understanding of a topic from clear, structured definitional content. Clean term definitions help Google (and AI engines) *confirm* you genuinely know the domain — it's a topical-authority + trust signal. It's also the most AI-extractable format there is (definitions + structure).
**Why traffic:** definition/entity capture ("what is a roofing square," "ACV vs RCV") — tiny individually, large in aggregate.
**Why convert:** indirect — builds authority + arms the homeowner with vocabulary that makes your estimate legible.
**Numbers:** no volume stat. 🟡 stats/definitions lift AI-extractability ~22–40% (directional). Don't put a traffic % on it.
**How to say it:** "A glossary isn't for traffic — it's how Google and ChatGPT confirm you're a real roofer, not a lead-gen shell. Almost no competitor has one."
**→ Content angle:** "roofing terms your contractor hopes you don't know" (20 quick clips).

### 10. Blog (`/blog` + 6 posts)
**What:** voice/POV content — full tear-off, storm-chaser warnings, Master Elite, post-hailstorm, homeowner FAQs.
**Why Google cares:** **freshness + first-hand Experience (E-E-A-T).** Google favors sites that are actively maintained (a recently-updated site signals a live business), and post-March-2026 it specifically rewards content that shows real first-hand experience. "What we see after a Triangle hailstorm" written by someone who was on the roof = exactly the Experience signal the core update amplified.
**Why traffic:** freshness + POV keywords; ~29% of AI citations are recent-dated.
**Why convert:** where **brand voice + trust** live — "spotting a storm chaser" positions you as the honest local. Pre-sells integrity.
**Numbers:** no clean stat — freshness + voice. Don't fabricate.
**How to say it:** "The blog is where you sound like a human who's been on 1,000 roofs, not a website. That's what makes someone pick you over the cheaper guy."
**→ Content angle:** the posts ARE your strongest scripts — already in your voice.

### 11. Projects / Portfolio (`/projects` + 15 case studies)
**What:** 15 real, named jobs — Brier Creek tear-off, North Hills wind claim, Twelve Oaks hail restoration, Heritage standing-seam, etc.
**Why Google cares:** this is **E-E-A-T "Experience" made literal — the single thing the March 2026 core update rewards most.** Google's helpful-content guidance literally asks "does this content show first-hand expertise and a depth of knowledge?" Real named jobs + original photos + problem→solution story is the strongest possible *yes*. You're not claiming experience; you're documenting it — and Google now ranks the documenting.
**Why traffic:** local + long-tail proof ("[neighborhood] roof replacement") + feeds `Project` schema seen on location pages.
**Why convert:** **proof is the #1 conversion lever** — "they've done my exact roof, on my street."
**Numbers:** ✅ original job photos + named experience = the **#1 content lift** post-March-2026 (rubric, grounded in Google's helpful-content direction).
**How to say it:** "15 named jobs with photos beat any 'we're the best' headline. It's the difference between claiming experience and showing it — and Google now ranks the showing."
**→ Content angle:** each project = a before/after teardown video. Your richest, most credible vein.

### 12. Financing (`/financing` + payment calculator)
**What:** financing options + monthly-payment calculator.
**Why Google cares:** **intent coverage.** Less a "Google loves it," more that "roof financing / payment plan" is a real query cluster Google needs a result for — and a site that covers it is more complete. Mild topical-completeness signal; the heavy lifting here is conversion, not ranking.
**Why traffic:** captures the **budget-constrained but motivated** buyer ("roof financing," "payment plan").
**Why convert:** **reframes the ticket** from a $12k wall to "$X/month." Removes the #1 silent objection; widens the buyer pool.
**Numbers:** no honest universal stat (industry "financing lifts close 20–30%" = vendor, don't repeat). Mechanism — payment-framing beats price-framing — is the argument.
**How to say it:** "A financing page turns 'I can't afford that' into 'what's the monthly?' — not a discount, a different question, and it closes deals price-framing kills."
**→ Content angle:** "The real reason roofers lose the $12k job (and it's not price)."

### 13. About / Trust Cluster (`/about`, `/certifications`, `/reviews`, `/warranty`, `/faq`, `/gallery`, `/contact`)
**What:** the E-E-A-T + conversion-support pages.
**Why Google cares:** **Trust — the most important letter in E-E-A-T.** Google's Quality Rater Guidelines put Trust at the center; for a business that takes your money (a "Your Money or Your Life" topic — a roof is a major financial transaction), Google wants evidence a real, accountable, credentialed business is behind the site. About/certifications/warranty/named team = the exact trust signals raters and ranking systems look for. `/faq` also feeds `FAQPage` schema.
**Why traffic:** modest direct; `/faq` catches question-keywords + feeds schema.
**Why convert:** this cluster **closes** — About (the humans), certs/warranty (risk reversal), reviews (social proof), contact (destination).
**Numbers:** ✅ reviews = **16%** of local-pack weight; GBP+reviews ≈ **52%** (Whitespark/BrightLocal). 🔴 don't claim self-serving review **stars** show in Google search — ignored since 2019.
**How to say it:** "The About page is the most-skipped, most-important page — where a stranger decides you're a real local business, not a call center. Trust is the last conversion step."
**→ Content angle:** "Why I always do a full tear-off" / founder-voice trust content.

---

## PART 2 — The numbers cheat-sheet (tape this to the wall)

**✅ SAY AS FACT (name the source):**
- A deep top-ranking page also ranks top-10 for **~1,000 other keywords** (Ahrefs).
- Internal links lifted organic traffic **+25%** in a controlled split-test (SearchPilot).
- AI crawlers **don't run JavaScript** — 500M+ fetches (Vercel). Client-side site = invisible to them.
- Service-area pages rank you **organically in no-office cities**; **cannot** win the map pack there (proximity — Whitespark, Sterling Sky 8,186 businesses).
- Storm roof = **five-figure** ($17,631 avg, Verisk 2025, national; $30B+ US roof claims 2024).
- 5-min vs 30-min response = **~100× contact / ~21× qualify** odds (MIT/InsideSales — "in the original study").
- Reviews = **16%** of local-pack weight; GBP+reviews ≈ **52%** (Whitespark/BrightLocal).
- Only **1.74%** of new pages rank top-10 within a year; avg #1 page is **5 years old** (Ahrefs) — *SEO is a 6–12 month build, not a switch.*
- **No one can guarantee a #1 ranking** — Google's own words; ranking guarantees are FTC-actionable (NC UDTPA = mandatory treble damages).

**🟡 RANGE / "IN ONE CASE STUDY" ONLY:**
- Deep-vs-thin: **~2–4× traffic, ~1.5–3× leads** (vendor case studies).
- Service-area pages: **+340% leads** in one 2-year roofing case.
- Post-storm: **+300–800%** search 48h; **45–65%** storm close (industry-reported).
- Schema lifts rich-result/AI eligibility **~2–4×**; answer-first **~27%** AI-citation (directional).
- Modeled value-per-lead **~$2,400** revenue (band $1,425–$4,500).

**🔴 NEVER SAY (the traps):**
- "Proximity is **55%** of the pack" — doesn't trace to any real table. Say "one of the top factors."
- "**74%** of calls go unanswered" — inflated. Honest: a range, ~45% mid-point.
- "1 in 5 re-roofs is storm-driven" — single-origin. Say "a meaningful share."
- "We'll get you to **#1** / guaranteed top-3" — FTC + Google violation. Describe the **mechanism**, never promise a position.
- "**Bank-level / SOC 2** security" — actionable even with zero breach. Say "OWASP-hardened, zero stored data."
- Self-serving **review stars** showing in Google search — they don't (since 2019).

---

## PART 3 — Categories → your content map
Every category is also a video vein. Richest first:
1. **Projects (15)** → before/after teardowns. Most credible, most reusable.
2. **Resources (34) + Glossary (20)** → 54 pre-written explainer scripts.
3. **Location vs pack** → "why your competitor ranks in 12 towns" — your most differentiated argument.
4. **Service pages / Materials** → "one page vs ten" + per-material explainers.
5. **Storm + Insurance** → urgency/authority ("read your own roof after hail").
6. **The GHL contrast** → "what your $297/mo actually buys."

*The teardown vein alone could carry the channel. The site isn't the content topic — it's the proof you point the camera at.*

---
*Sources: live sitemap (146 URLs, 2026-06-28) · `KM_VALUEPROP_CLAIM_LIBRARY.md` (55 verified claims) · `reference_seo_2026_rubric` · `reference_contractor_site_quality_bar`. Honesty corrections are load-bearing — don't revert them.*
