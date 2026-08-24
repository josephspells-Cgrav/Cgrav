# Summit & Oak Roofing — Competitors, Page Blueprint & SEO Spine

**Dossier 03 · Conversion + SEO research**
**Project:** Summit & Oak Roofing (DEMO) — premium charcoal `#161719` + red `#D8262C` + white; clean-premium-not-dense.
**Market:** Raleigh NC + Cary / Knightdale / Garner / Clayton / Apex.
**Traffic thesis:** cold ORGANIC search, storm/emergency-led. Full ~35-page Next.js SSG spine.
**Two surfaces, one site:** the home/landing is the CONVERSION surface (tight, top-loaded); service + location pages are the RANKING surface (depth that earns organic traffic). **Preserve SEO depth — never thin it to "clean up."**

---

## EXECUTIVE SUMMARY

The win condition for this build is **topical + geographic authority via a hub-and-spoke mesh of ~35 substantive pages**, not page volume. Five load-bearing truths shape the whole dossier:

1. **"Free Inspection / Free Estimate" is the universal primary CTA** across every top-converting roofing site — low-commitment verbs, never "buy." The single biggest conversion gap on regional roofers (vs national brands) is hiding the Google star rating; put **`★ 4.9 · N reviews` in the hero as plain text/image**, not schema.
2. **National exterior-remodelers lead with QUALITY + FINANCING, not storm urgency** — but Summit & Oak's traffic is storm-led, so the model to copy is **RoofClaim's dual/segmented lanes**: a quality-led main hero PLUS a dedicated storm/insurance path. Storm + emergency pages are the **money pages** here.
3. **Self-serving review stars are dead in the SERP.** Google confirms LocalBusiness/Organization schema is *ineligible* for review-snippet rich results when the entity controls its own reviews. Stars come from **Google Business Profile**, not your site. Ship AggregateRating only as honest entity data.
4. **FAQPage rich results are effectively gone for commercial sites** (gov/health only since Aug 2023) — but ship the markup anyway for entity understanding + AI Overview / answer-engine extraction. Don't promise SERP accordions.
5. **The 6 city pages are the doorway-penalty danger zone.** Google's spam policy names "pages targeted at cities that funnel users to one page" and "substantially similar pages" verbatim. The fix is genuinely unique per-city content (real storm history, named neighborhoods, correct permitting authority, first-party projects) — enforced **mechanically at the data layer**, not by prose discipline.

Total recommendation count in this dossier: **62 concrete, implementable items** across the BUILD RECOMMENDATIONS blocks.

---

## SECTION 1 — COMPETITOR TEARDOWNS

Six sites torn down via live page fetches + search corroboration: 4 national exterior-remodeler giants, 1 national tech-funnel roofer (the dual-lane model), 1 strong NC regional roofer (the regional gap study).

### 1.1 Erie Home — eriehome.com (national, roofing + basement)
- **Above-fold:** H1 "The Nation's Most Trusted Roofing and Basement Contractor"; CTA "Get My Free Estimate"; phone 800-998-8301; trust = **4.8★ / 40,000+ reviews** + BBB A+ + Google/Facebook logos; "$0 Down Asphalt Roofing" teaser high on page.
- **Lead capture:** zip-code-first form → in-home appointment (no instant price). Phone co-prominent.
- **Storm vs considered:** **Considered** — durability + financing ("replace your roof for the last time"), not storm urgency.
- **Proof:** 4.8★/40k+, BBB A+, 3 testimonials, before/after gallery, certifications block.
- **Financing:** "$0 Down" + flexible (12–180 mo, third-party lenders); no APR/$mo shown.
- **Structure:** Hero → "How Erie Can Help" cards → gutter section → "Quality Products That Outlast" → financing → reviews → support → nationwide + certs → promo stack → footer. **Has city pages (large `/locations/roofing/{city}-{st}/` set). Cost guide: limited.**

### 1.2 West Shore Home — westshorehome.com (national, exterior + bath)
- **Above-fold:** H1 "Affordable luxury." / "Home remodeling, done right."; **multi-step quiz embedded in hero (Step 1 of 3)** — "What are you looking to remodel?" checkboxes → "Continue"; phone (717) 697-4033; trust = **38,000+ 5★ Google** + BBB A+ + HomeAdvisor 99%; "$0 Down" + "20% Off + 20 Months No Payments" anniversary banner.
- **Lead capture:** **strongest quiz-as-hero pattern** — the funnel IS the above-fold content. Click-only first step, contact deferred.
- **Storm vs considered:** **Fully considered / aspirational** — zero urgency; segments by project type via quiz.
- **Proof:** 38,000+ 5★, BBB A+, HomeAdvisor 99%, testimonials, credentials, "40+ markets."
- **Financing:** triple-placed; 0% plans, **"as low as $89/month,"** deferred up to 12 mo.
- **Structure:** promo banner → hero+quiz → $0 Down → product showcase → colorways → category sections → tech section → geo coverage → testimonials → trust → CTA → footer. **Has city pages (40+ markets). Cost guide: product-led.**

### 1.3 Long Home — longhome.com (national, roofing + bath + windows/doors)
- **Above-fold:** H1 "The Most Trusted Name in Home Improvement"; CTA "GET A FREE ESTIMATE"; phone 1-800-417-5664; trust = "8+ Decades / 90K+ Projects" heritage framing.
- **Lead capture:** **single-step hero form** (name/email/phone + E-SIGN + SMS opt-in checkboxes); no zip field; phone co-primary.
- **Storm vs considered:** **Considered / heritage-trust** — "TRUST goes a LONG way," craftsmanship, warranty.
- **Proof:** heritage counters substitute for a visible star count; reviews mid-page; TV spot (broadcast credibility).
- **Financing:** **weak** — "flexible payment plans," no $0/APR/$mo above fold.
- **Structure:** Hero+form → trust → service highlights → "What Sets Us Apart" → 3-step process → reviews → materials gallery → TV spot → CTA → footer. **Has city pages (multi-location). Cost guide: limited.**

### 1.4 Power Home Remodeling — powerhrg.com (national exterior: windows/siding/roofing/solar)
*(JS-rendered; facts from search + corroborating pages — see UNCERTAIN.)*
- **Above-fold:** brand line "Our Work Shows" + "Over 30 years…"; CTA "Get A Free Quote"/"Schedule Your Free Estimate"; phone 888-736-6335; distinctive hook **"your price is good for up to one full year"** (price-lock).
- **Lead capture:** form → in-home estimate; phone path.
- **Storm vs considered:** **Considered** — quality + energy efficiency; Angi "Best-In-Class," Fortune #14.
- **Proof:** third-party authority badges (Angi, Fortune, "nation's largest exterior remodeler," 30+ yrs).
- **Financing:** offered; standout hook is the **1-year price-lock**; rates not published.
- **Structure:** Hero → services → process → awards → locations → CTA → footer. **Has city pages (27 territories). Cost guide: some (process/news).**

### 1.5 RoofClaim.com — roofclaim.com (national tech-funnel roofer) ← THE MODEL FOR SUMMIT & OAK
- **Above-fold:** H1 "RoofClaim: The Best Roofing Company Near You"; subhead leads with urgency ("when your roof is damaged, leaking, or aging — clear answers fast"); CTA **"Peace of Mind for $0 — Get a Free Roof Inspection & Estimate"**; phone (770) 999-0095; trust = **4.9/5 Google (1,764 reviews)** + BBB A+ + "Million Dollar Guarantee."
- **Lead capture:** "Free Inspection" CTAs → form; **differentiator = virtual / remote inspection** ("no sales rep to start") — lowers friction vs in-home-only competitors.
- **Storm vs considered:** **DUAL / explicitly segmented** — storm track (emergency tarping, 24/7, insurance-claim coordination) AND considered track (aging roof, repair-vs-replace, transparent options). **Only site leaning into insurance-claim help.** This is the lane structure to copy.
- **Proof:** 4.9★/1,764, BBB A+, Million-Dollar Guarantee, reviews carousel, stats band.
- **Financing:** **most concrete of the set** (on `/roof-financing/`): fixed 14.99% APR, **Zero Money Down**, 5- & 10-yr options, **handled in-house**, soft credit check, 675+ standard approval, no origination/early-payment fees.
- **Structure:** Hero → 4 services → BBB → "Why Choose" → **5-step process** → expansion map → stats → reviews carousel → blog/resources → **FAQ** → footer. **Has city pages. Cost guide / resources: YES (blog, finance guides, FAQ).**

### 1.6 Skywalker Roofing — skywalkerroofingnc.com (NC regional, Triad/Triangle) ← THE REGIONAL GAP STUDY
- **Above-fold:** H1 "Honest roofing. Exceptional Care. Lasting Results"; CTA "Get a FREE Quote" → `/contact`; phone 336-717-0234; trust = **manufacturer cert row: Owens Corning Platinum + CertainTeed ShingleMaster** + HomeAdvisor + Expertise.com awards. **GAP: no Google star count above fold** despite 1,200+ reviews / 4.9★ existing off-site.
- **Lead capture:** **phone-first + button-to-/contact** — no hero form, no quiz. Highest-friction capture of the six (the classic regional gap).
- **Storm vs considered:** **Considered / craft + integrity** — no storm play.
- **Proof:** manufacturer certs are the headline (the credentials nationals bury, Skywalker leads with); testimonials mid-page; strong off-site reviews under-surfaced on-page.
- **Financing:** soft — "flexible financing for qualifying projects," no $0/APR/$mo.
- **Structure:** nav+trust → headline → hero+CTA → service cards → history → certs → testimonials → service areas. **Has city pages (strong NC geo — its real strength). Cost guide / blog: YES.**

### 1.7 COMPARISON TABLE

| Site | Above-fold CTA | Lead capture | Storm vs Considered | Proof shown | Financing | City pages? | Cost guide? |
|---|---|---|---|---|---|---|---|
| **Erie Home** | "Get My Free Estimate" | Zip-first form → appt; phone | **Considered** (durability+financing) | 4.8★ / 40,000+; BBB A+ | "$0 Down" + flexible (12–180mo, 3rd-party); no APR | **Yes** (large) | Limited |
| **West Shore Home** | "Continue" (3-step quiz) | **Multi-step quiz in hero**; phone | **Considered** ("affordable luxury") | 38,000+ 5★; BBB A+; HomeAdvisor 99% | Heavy: $0 down, 0%, **"$89/mo,"** 12mo deferred | **Yes** (40+) | Product-led |
| **Long Home** | "GET A FREE ESTIMATE" | **Single-step hero form** + consent; phone | **Considered** (heritage/trust) | "8+ Decades / 90K+"; TV spot | Weak: "flexible plans" | **Yes** (multi) | Limited |
| **Power HRG** | "Get A Free Quote" | Form → in-home; phone | **Considered** (quality+energy) | Angi Best-In-Class; Fortune #14 | Hook = **1-yr price lock**; rates not published | **Yes** (27) | Some |
| **RoofClaim** | **"Free Roof Inspection — $0"** | "Free Inspection" + **virtual inspection**; phone | **DUAL / segmented** (storm+insurance AND aging) | 4.9★ / 1,764; BBB A+; M$ Guarantee | **Most concrete**: 14.99% APR, $0 down, 5/10-yr, in-house | **Yes** | **Yes** (blog+FAQ) |
| **Skywalker (NC)** | "Get a FREE Quote" | **Phone-first + /contact** (no form) | **Considered** (craft) | OC Platinum + CertainTeed (1,200+/4.9★ off-site) | Soft: "flexible financing" | **Yes** (strong) | **Yes** (blog) |

### 1.8 PATTERNS THAT CONVERT (synthesis)
1. **"Free Estimate / Free Inspection" is the universal primary CTA** — low-commitment verbs, never "buy/purchase."
2. **Aggregate star rating + review count belongs ABOVE the fold, in real numbers** ("4.9 / 1,764"). The clearest national-vs-regional execution gap.
3. **Quiz-as-hero beats button-to-form** (West Shore Step 1 of 3) — start the funnel on the hero with a trivial click-only first question.
4. **Multi-step beats single long form; first step must be friction-free** (click-only choice, contact captured last — sunk-cost / endowed-progress).
5. **Zip-code-first** is the dominant opener for appointment-booking nationals — localizes + qualifies + feels like a tool.
6. **Financing is a hero-level lever** framed as removing the money objection: "$0 Down" + a monthly anchor ("$89/mo") or transparent APR; triple-placed (banner + section + footer).
7. **National remodelers lead with quality/financing, NOT storm urgency** — but storm/insurance is its own segmented lane (RoofClaim) when you serve it.
8. **Storm + insurance = dedicated path, don't blur it** into the main hero.
9. **Manufacturer certifications are underused trust gold** (OC Platinum, CertainTeed ShingleMaster, GAF Master Elite) — verifiable + category-specific.
10. **Phone stays persistently visible in the header** — form-AND-phone, not form-instead-of-phone.
11. **A 3–5 step "How it works" section** pre-answers "what happens after I submit?"
12. **City/location pages are universal; a cost-guide/resource layer separates the SEO leaders.**
13. **Friction-reducers signal modernity + lift conversion:** virtual/photo inspection, price-lock, workmanship guarantee.

### 1.9 BUILD RECOMMENDATIONS — Competitor patterns (for the Next.js builder)
1. **Hero headline pattern:** trust/outcome + locality — e.g. *"Raleigh Roofing Done Honestly — Free Inspection, No Pressure."* One-line subhead on the craft/integrity promise.
2. **Aggregate review badge in the hero** as a data-driven component (`★ 4.9 · 1,247 Google Reviews`), pulled from config/Places API — highest-leverage single addition.
3. **Trust row under the CTA:** Google rating · BBB A+ · GAF/OC/CertainTeed cert · "Licensed & Insured."
4. **Persistent header phone** (`tel:` on mobile) + **sticky mobile bottom bar** `[ Call ] [ Free Inspection ]` (roofing traffic is 70%+ mobile).
5. **Multi-step quiz embedded in the hero** (not a button to a separate page): (1) project type chips [Repair / Replacement / Storm Damage / Inspection] → (2) zip → (3) roof age / "what's going on?" [Leak / Storm / Age / Selling] (also segments storm vs considered) → (4) name + phone + email last. Visible "Step X of 4" progress; consider partial-lead capture on step 3.
6. **TCPA/SMS consent checkboxes** on the contact step (compliance + every national does it).
7. **"Prefer to talk? Call {number}"** fallback under the quiz.
8. **Conditional storm banner / secondary CTA** ("Storm damage? We tarp 24/7 and handle your insurance claim →") routing to `/storm-damage`; keep the main hero on quality/financing.
9. **Financing as a first-class section:** "$0 Down" + a concrete monthly anchor + transparent APR + soft-credit-check reassurance; triple-place it + a `/financing` page.
10. **Reviews component** (real Google reviews + count badge reused in hero) + **before/after gallery slider** + **manufacturer-cert logo strip** as reusable atoms.
11. **"How it works" 3–5 step section** with numbered icons.
12. **Virtual / photo-inspection option** (upload roof photos → remote estimate) — modern, low-commitment, differentiating.
13. **Price-lock / guarantee line** near the CTA ("Your quote is good for 12 months" / workmanship guarantee).

---

## SECTION 2 — THE ~35-PAGE SPINE (full URL list)

37 indexable URLs. ~30 content + 2 legal forms the clean editorial spine; optional pages grow it to ~35–37.

```
HOME & CORE
/                                          Home (CONVERSION surface)
/about                                     About
/contact                                   Contact
/gallery                                   Project gallery
/financing                                 Financing
/reviews                                   Reviews/testimonials (optional)

SERVICES (hub + 6 detail)
/services                                  Services hub
/services/roof-replacement
/services/roof-repair
/services/storm-damage-roof-repair         (service-level; ties to storm hub)
/services/roof-inspection
/services/metal-roofing
/services/gutters

STORM-DAMAGE CLUSTER (hub + 3 sub)         ← MONEY CLUSTER (storm-led traffic)
/storm-damage                              Storm-damage hub
/storm-damage/hail-damage
/storm-damage/wind-damage
/storm-damage/insurance-claims

SERVICE AREAS (hub + 6 city)
/service-areas                             Service-areas hub
/service-areas/raleigh
/service-areas/cary
/service-areas/knightdale
/service-areas/garner
/service-areas/clayton
/service-areas/apex

BRANDS (hub + 3 brand)
/brands                                    Brands hub
/brands/gaf
/brands/owens-corning
/brands/certainteed

RESOURCES / MONEY-CONTENT
/roofing-cost                              Cost guide (pillar) ← slug locked per brief

LEGAL / UTILITY
/privacy-policy
/terms

SYSTEM (not content)
/sitemap.xml
/robots.txt
```

**To hit a hard 35 indexable content URLs immediately**, the cleanest genuinely-useful additions:
- `/services/emergency-roof-repair` (24/7 high-intent storm-led landing)
- `/services/roof-maintenance` (recurring-revenue; ranks "roof tune-up/maintenance")
- `/services/commercial-roofing` (only if in scope)
- `/blog` (a true content-engine seed — the scalable, doorway-safe way to grow topical authority)

> **Storm-led note:** treat `/storm-damage`, `/storm-damage/hail-damage`, `/storm-damage/insurance-claims`, `/services/emergency-roof-repair`, and the 6 city pages as **money pages** — most internal-link equity, strongest CTAs, most unique-content investment.

### 2.1 BUILD RECOMMENDATIONS — URL spine
14. **App Router + SSG** with `generateStaticParams` for each dynamic family: `app/services/[service]`, `app/storm-damage/[type]`, `app/service-areas/[city]`, `app/brands/[brand]`. Static one-offs as their own `page.tsx`.
15. **Typed config content layer** (mirrors the project's template doctrine): `lib/services.ts`, `lib/cities.ts`, `lib/brands.ts`, `lib/storm.ts` hold per-entity unique copy/FAQs/projects. Components stay pure shells — fill content, never edit components.
16. **Flat keyword-clean slugs** exactly as listed (`/services/roof-replacement`, not `/services/roofing-replacement-services-raleigh-nc`).
17. **`app/sitemap.ts` + `app/robots.ts`** (Next metadata routes) emitting from the same slug arrays — single source of truth.
18. **One H1 per page**, enforced in the shared page shell; H2/H3 from a structured sections array.

---

## SECTION 3 — PER-FAMILY SECTION BLUEPRINTS (convert + rank)

Each family lists sections to **(a) CONVERT** and **(b) RANK**. Recurring principle: one H1 (keyword+location), logical H2/H3 hierarchy, genuine unique copy, proof (photos/case studies), local signals, CTA above fold + repeated.

### HOME (`/`) — the conversion surface
- **Convert:** hero (value prop + tap-to-call + "Free Inspection" above fold) · trust bar (years, # roofs, GAF/OC/CT + BBB + Google rating as text/image, NOT schema stars) · storm/emergency callout band · 6 service cards → detail pages · "Why Summit & Oak" differentiators · 1-2-3 process · featured gallery strip · review carousel (display) · financing teaser · service-area map/list · final CTA band with form.
- **Rank:** H1 "Raleigh Roofing Contractor | Summit & Oak Roofing" · keyword-rich intro (Raleigh + Triangle + replacement/repair/storm) · links to all 6 services + storm hub + 6 cities + cost guide · `LocalBusiness`/`RoofingContractor` + `WebSite` + `Organization` schema · NAP in footer.

### SERVICES HUB (`/services`)
- **Convert:** intro positioning · grid of 6 services (icon + 1-line benefit + "Learn more" + inline CTA) · trust strip · CTA band.
- **Rank:** H1 "Roofing Services in Raleigh, NC" · 150–250 unique words · descriptive contextual links to all 6 detail pages (spoke distribution) · `BreadcrumbList` + `ItemList` · links to cost guide + storm hub.

### SERVICE-DETAIL (×6 — the workhorse template)
- **Convert:** hero (H1 service+Raleigh, dual CTA) · "what's included" bullets · process/what-to-expect (numbered) · "signs you need this" (repair/inspection/storm) · materials/options (→ brand pages) · pricing teaser / "factors that affect cost" (→ `/roofing-cost`) · before/after + mini case study · warranty/cert callout · service-relevant reviews · service-area mini-list (→ 6 cities) · FAQ (5–8) · final CTA + form.
- **Rank:** ONE H1 service+location · H2s for benefits/process/signs/cost-factors/areas/FAQ · 800–1,500+ unique words · `Service` + `FAQPage` + `BreadcrumbList` + `WebPage` (+`ImageObject` on photos) · contextual links UP to `/services`, ACROSS to related services, OUT to cities + brands + cost guide.
- **Per-service intent:** Replacement = highest commercial intent (tie to cost + financing + brands). Repair = emergency-leak angle (→ storm + emergency). Storm-damage-repair = *service* framing distinct from the *topic* hub (avoid duplication — doorway risk). Inspection = free lead-magnet ("what we check" checklist). Metal = material-specialty (cost-premium, longevity). Gutters = cross-sell.

### STORM-DAMAGE HUB (`/storm-damage`) + 3 sub-pages — the money cluster
- **Hub Convert:** emergency hero (24/7, tap-to-call, "we handle the insurance paperwork") · "Hit by a storm? Start here" 3-step · cards to hail/wind/insurance · "we work with all carriers" · before/after storm gallery · CTA.
- **Hub Rank:** H1 "Storm Damage Roof Repair in Raleigh & the Triangle" · broad pillar copy (hail+wind+insurance overview, each linking its deep sub-page) · `Service` + `FAQPage` + `BreadcrumbList` · links to all 6 cities + `/services/roof-repair` + `/services/roof-inspection`.
- **`/storm-damage/hail-damage`:** what hail damage looks like (granule loss, dents, bruising — photos) · why fast inspection matters · NC/Triangle hail context · free-inspection CTA · insurance tie-in link · FAQ.
- **`/storm-damage/wind-damage`:** missing/lifted shingles, flashing · what to do immediately · tarping/emergency · FAQ.
- **`/storm-damage/insurance-claims`** (THE conversion page for storm traffic): step-by-step claim process · "document everything before repairs" checklist · deductible / ACV vs RCV explainer · **"you are NOT required to use your insurer's preferred contractor"** · "we work directly with adjusters" · supplemental claims · carrier-agnostic · heavy FAQ. Earns long-tail "roof insurance claim [carrier] raleigh."

### SERVICE-AREAS HUB (`/service-areas`) + 6 city pages
*(Full anti-doorway recipe in Section 5.)*
- **Hub Convert:** map graphic · "Proudly serving the Triangle" · card per city (photo + 1-line + link) · CTA.
- **Hub Rank:** H1 "Roofing Service Areas — Raleigh & Surrounding Triangle" · links to all 6 cities · `BreadcrumbList` + `ItemList`.
- **City pages (×6) Convert:** H1 "Roofing Contractor in [City], NC" · local hero (real city photo) · local CTA (call + estimate) · services-here grid (→ 6 service pages) · **local testimonials from that city** · **city-specific project / before-after** · local trust (neighborhoods, "X roofs in [City]", landmarks/ZIPs) · financing + storm callout · CTA + form.
- **City pages Rank:** ONE H1 city+service · unique local content (neighborhoods, local roofing considerations, permitting note) · `Service`+`areaServed` (or city-scoped `RoofingContractor`) + `BreadcrumbList` + `FAQPage` · contextual links to each service + storm hub + 1–2 adjacent cities · NAP.

### BRANDS HUB (`/brands`) + 3 brand pages
- **Hub:** H1 "Roofing Brands & Materials We Install" · 3 brand cards · "what certification means for you" (warranty protection) · links to brand pages + cost guide · `BreadcrumbList` + `ItemList`.
- **`/brands/gaf`:** lead with **GAF Master Elite** (~2–3% of contractors qualify) + **Golden Pledge warranty** (strongest in industry) · Timberline HDZ etc. · → replacement + cost guide.
- **`/brands/owens-corning`:** OC Platinum Preferred (if certified), Duration shingles, SureNail, warranty.
- **`/brands/certainteed`:** CertainTeed SELECT ShingleMaster (if certified), Landmark, warranty.
- **Rank (all):** H1 "[Brand] Certified Roofer in Raleigh" · unique framing (NOT manufacturer marketing verbatim — duplicate-content risk) · `Service`/`Brand` mention + `BreadcrumbList` + `FAQPage` · links to replacement + cost guide + about.

### GALLERY (`/gallery`)
- **Convert:** filterable grid (service/city), before/after pairs, "your project here" CTA.
- **Rank:** H1 "Roofing Project Gallery — Raleigh & the Triangle" · `ImageObject` schema · descriptive alt text + captions (service + city per project) · captions link to relevant service/city pages.

### CONTACT (`/contact`)
- **Convert:** form above fold, tap-to-call, address, hours, map embed, response-time promise.
- **Rank:** H1 "Contact Summit & Oak Roofing" · full NAP · **canonical `RoofingContractor`/`LocalBusiness` with PostalAddress + geo + OpeningHoursSpecification** (the authoritative home for the full entity) · `BreadcrumbList` + `ContactPage`.

### ABOUT (`/about`)
- **Convert:** story, team/owner photos, credentials (licensed/insured/certs), years/roofs counters, community involvement, CTA.
- **Rank:** H1 "About Summit & Oak Roofing" · E-E-A-T (experience, licensing, certs, awards) · `Organization` + `AboutPage` · links to brands/services/reviews.

### FINANCING (`/financing`)
- **Convert:** options, "monthly payment" framing, apply/qualify CTA, partner logos, "affordable new roof" angle.
- **Rank:** H1 "Roof Financing in Raleigh — Affordable Payment Options" · unique copy · `WebPage` · links from cost guide + replacement (funnel: cost → "can I afford it?" → financing → estimate).

### 3.1 BUILD RECOMMENDATIONS — Section blueprints
19. **Shared page shell + sections array** — every template renders an ordered `sections[]` from config; one H1 enforced.
20. **Reusable atoms:** `<Hero>`, `<TrustBar>`, `<ServiceCards>`, `<ProcessSteps>`, `<BeforeAfter>`, `<ReviewCarousel>`, `<CertStrip>`, `<FaqAccordion>` (emits FAQPage JSON-LD), `<FinanceTeaser>`, `<CtaBand>`.
21. **Differentiate storm-service vs storm-hub copy** at the data layer (service = "our process," hub = "topic + insurance education") to avoid duplicate-content/doorway flags.
22. **Make `localProject` + `localTestimonial` + `uniqueLocalContent` REQUIRED TypeScript fields** on city/service configs so a thin clone won't compile.

---

## SECTION 4 — SEO STRUCTURE & SCHEMA SPEC

### 4.1 Headline schema facts (load-bearing — cite these)
1. **Use the specific subtype `RoofingContractor`** (`HomeAndConstructionBusiness` → `LocalBusiness`). Prefer the most specific type over generic `LocalBusiness`.
2. **Self-controlled review stars are INELIGIBLE for rich results.** Google: *"If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for the star review feature."* (current 2024–2026). **Stars come from Google Business Profile, not your site.** Display reviews in HTML; include AggregateRating only as honest entity data (real counts) — never as a star-snippet strategy.
3. **FAQPage rich results effectively gone for commercial sites** (gov/health only since Aug 2023). Ship the markup for entity understanding + AI Overview / answer-engine extraction; don't promise SERP accordions.
4. **JSON-LD is Google's preferred format**; use a **single `@graph` per page** so all entities (Organization, WebPage, BreadcrumbList, Service, FAQPage) reference each other by `@id`.

### 4.2 Schema stack per page type (one `@graph` per page)

| Page type | JSON-LD stack | Notes |
|---|---|---|
| **Home** | `Organization` + `RoofingContractor`(LocalBusiness) + `WebSite`(+SearchAction) | Full NAP, geo, openingHoursSpecification, areaServed (6 cities), sameAs (GBP/FB/BBB). AggregateRating optional (entity only). |
| **Services hub** | `WebPage` + `BreadcrumbList` + `ItemList` (6 services) | ItemList maps the spokes. |
| **Service detail** (×6) | `Service` + `FAQPage` + `BreadcrumbList` + `WebPage` (+`ImageObject`) | `Service.provider`→Org `@id`; `areaServed`→cities; `serviceType`. |
| **Storm hub** | `Service` (or `WebPage`) + `FAQPage` + `BreadcrumbList` | Pillar. |
| **Storm sub-pages** | `Service` + `FAQPage` + `BreadcrumbList` + `WebPage` | Insurance page = heavy FAQPage. |
| **Service-areas hub** | `WebPage` + `BreadcrumbList` + `ItemList` (6 cities) | |
| **City pages** (×6) | `Service`+`areaServed`(that city) + `BreadcrumbList` + `FAQPage` (or city-scoped `RoofingContractor`) | Pick ONE pattern; keep NAP consistent. Do NOT invent per-city addresses. |
| **Brands hub** | `WebPage` + `BreadcrumbList` + `ItemList` | |
| **Brand pages** (×3) | `Service` (or `WebPage`) + `Brand` mention + `BreadcrumbList` + `FAQPage` | Your service is primary entity; brand is referenced. |
| **Cost guide** | `Article`/`WebPage` + `FAQPage` + `BreadcrumbList` | Article = freshness + author E-E-A-T. No Google "Table" rich type. |
| **Gallery** | `WebPage` + `BreadcrumbList` + `ImageObject` (per image) | |
| **Contact** | `RoofingContractor`/`LocalBusiness` (canonical full entity) + `ContactPage` + `BreadcrumbList` | Authoritative home for the complete LocalBusiness node. |
| **About** | `Organization` + `AboutPage` + `BreadcrumbList` | E-E-A-T. |
| **Financing** | `WebPage` + `BreadcrumbList` (+`FAQPage` if Q&As) | |

**Sitewide rule:** define the Organization + RoofingContractor entity ONCE with a stable `@id` (e.g. `https://summitandoak.com/#organization`); every page's WebPage node does `isPartOf`/`publisher` → that `@id`.

### 4.3 Title-tag patterns (≤60 chars, front-load keyword + location + outcome)

| Page | Pattern | Example |
|---|---|---|
| Home | `{Service} {City} \| {Brand}` | `Raleigh Roofing Contractor \| Summit & Oak Roofing` |
| Service | `{Service} in {City}, NC \| {Brand}` | `Roof Replacement in Raleigh, NC \| Summit & Oak` |
| Storm sub | `{Type} Roof Repair {Metro} \| {Brand}` | `Hail Damage Roof Repair Raleigh NC \| Summit & Oak` |
| Insurance | `Roof Insurance Claims Help {Metro} \| {Brand}` | `Roof Insurance Claim Help Raleigh NC \| Summit & Oak` |
| City | `{Service} {City}, NC \| {Brand} Roofing` | `Roofing Contractor Cary, NC \| Summit & Oak Roofing` |
| Brand | `{Mfr} Certified Roofer in {City} \| {Brand}` | `GAF Master Elite Roofer Raleigh \| Summit & Oak` |
| Cost | `{Topic} ({Year}) \| {Metro} {Brand}` | `Roof Replacement Cost in Raleigh (2026) \| Summit & Oak` |

### 4.4 Meta-description patterns (120–160 chars, value prop + CTA; CTR-only, not a ranking factor)
- **Service:** `Need {service} in {city}? {Brand}, a GAF-certified Raleigh roofer, offers free inspections & financing. Call {phone} for a fast estimate.`
- **Storm/insurance:** `Storm or hail damage in {city}? We document the damage, handle your insurance claim, and restore your roof fast. Free inspection — call {phone}.`
- **City:** `{Brand} is {city}'s trusted roofing contractor — replacement, repair & storm restoration. Licensed, insured, 5-star rated. Free estimate today.`
- **Cost:** `How much does a new roof cost in {metro}? 2026 price ranges by material, size & cost factors, plus financing. Get a free, no-pressure quote.`

### 4.5 Canonical + OpenGraph
- **Self-referencing canonical on every page**; pick one host + one trailing-slash convention and 301 the rest (Next App Router defaults to no trailing slash — set `trailingSlash` deliberately).
- **Never canonical city pages to a generic page** (defeats their purpose + signals doorway behavior).
- **OG per page:** `og:title`, `og:description`, `og:url`(=canonical), `og:type` (`website`; `article` for cost/blog), `og:image` (1200×630, **a real project photo per city/service** beats a generic logo), `og:site_name`, `og:locale en_US`. Twitter: `summary_large_image` + title/description/image.

### 4.6 BUILD RECOMMENDATIONS — SEO/schema
23. **Metadata API, not next/head** (App Router): `generateMetadata()` per dynamic route + static `metadata` on static pages; drive `title`/`description`/`alternates.canonical`/`openGraph`/`twitter` from the same `lib/` config so they can't drift. Set `metadataBase` in root layout for absolute OG/canonical URLs.
24. **JSON-LD via `<script type="application/ld+json">`** rendered in the component tree; one `buildGraph(page)` helper returns the `@graph` array + `JSON.stringify`s it. Centralize the Organization/RoofingContractor node so `@id` stays consistent.
25. **Validate** every template with Google Rich Results Test + Schema.org validator pre-launch; monitor GSC Enhancements (FAQ, Breadcrumb) post-launch.
26. **Do NOT inject fake review stars.** AggregateRating only with real GBP numbers; set client expectation that SERP stars come from GBP.
27. **Per-city / per-service OG images** (local project shots) — reinforces uniqueness + social presentation.
28. **Submit `sitemap.xml` in GSC**; `robots.txt` references it.

### 4.7 Internal-linking mesh
**Model: hub-and-spoke, layered, with service↔city cross-linking.** Contextual body links > footer lists; every page needs ≥2 inbound internal links (no orphans); descriptive keyword anchors, never "click here."

- **Global nav (every page):** Home · Services (dropdown→6) · Storm Damage (dropdown→hail/wind/insurance) · Service Areas (dropdown→6 cities) · Financing · About · Contact + persistent tap-to-call + "Free Inspection."
- **Footer mega-nav:** Services(6) · Service Areas(6) · Storm Damage(hub+3) · Brands(3) · Company(About/Gallery/Financing/Reviews/Contact) · NAP + GBP link.
- **Hub → spoke** (contextual card/body links, descriptive anchors): each hub → its detail pages; Home → all hubs + 6 services + storm hub + cost guide + top cities.
- **Spoke → hub** via breadcrumb + a contextual in-body link. Breadcrumbs sitewide (`Home > Services > Roof Replacement`, etc.).
- **Service ↔ City cross-link (the highest local-SEO value):** each service page has a "Where we offer [service]" block → all 6 cities; each city page has an "Our roofing services in [City]" block → all 6 services. This builds the combinatorial "roof repair raleigh / storm damage cary" relevance **without** creating 36 thin service×city pages (which is doorway abuse).
- **Service ↔ Service lateral:** Replacement↔Repair↔Inspection; Storm↔Repair↔Inspection↔Insurance; Metal↔Replacement↔Cost; Gutters↔Replacement/Repair.
- **City ↔ adjacent City** (light): Cary↔Apex, Garner↔Clayton, Raleigh↔Knightdale, Raleigh↔Cary (1–2 contextual links).
- **Money-page authority funneling:** storm hub / hail / insurance / replacement / 6 cities get the most inbound contextual links, placed HIGH on linking pages. The **cost guide is the top-of-funnel authority sink** → route its equity DOWN to replacement, financing, brands, and cities.
- **Anchor text:** descriptive + keyword-relevant, mixing exact / partial / branded to the same destination (avoid 100% exact-match over-optimization).

### 4.8 BUILD RECOMMENDATIONS — internal linking
29. **Centralize the link graph in config:** `lib/related.ts` exporting `relatedServices[slug]`, `relatedCities`, `serviceToCities`, `cityToServices` → guarantees no orphans + ≥2 inbound + consistent anchors.
30. **Reusable link components:** `<Breadcrumbs items={…} />` (renders nav + emits BreadcrumbList JSON-LD), `<ServiceAreaLinks service={slug} />`, `<ServicesInCity city={slug} />`, `<RelatedServices current={slug} />`.
31. **Anchor text from data, not hardcoded** (store exact/partial/branded variants).
32. **`next/link`** for all internal links (client nav + prefetch; renders crawlable anchors).
33. **HTML sitemap page (or rich footer)** to reinforce indexation.

---

## SECTION 5 — CITY PAGES WITHOUT THIN/DOORWAY CONTENT

### 5.1 The doorway / scaled-content risk (2024–2026 Google stance)
Google's **Spam Policies** name two separate violations a templated city rollout can trip:
- **Doorway abuse** — verbatim: *"sites or pages created to rank for specific, similar search queries [that] lead users to intermediate pages that are not as useful as the final destination."* Examples mapping to city pages: *"multiple domain names or pages targeted at specific regions or cities that funnel users to one page"* and *"substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy."*
- **Scaled content abuse** (broadened March 2024) — *"many pages generated for the primary purpose of manipulating rankings and not helping users… large amounts of unoriginal content… no matter how it's created."* The **"no matter how it's created"** clause means **hand-written templated pages are judged the same as AI-spun ones.**

**Concrete penalty triggers:** city-name token swap (#1 killer) · funneling to one page · footer/hidden city-link dumps (high link-to-text ratio) · orphan pages · generic "local" filler · mass simultaneous publish on a young domain · synonym spinning per city.

**The defensible test (Sterling Sky / Whitespark):** *"Would this page still be useful to a Raleigh homeowner if every other city page didn't exist?"* A legitimate location page is a **standalone mini-homepage** for that city with **first-party local proof** (real projects, real city reviews, real photos), **verifiable local specifics** (neighborhoods, correct permitting authority, documented weather), and is **reachable through normal navigation**.

### 5.2 Per-city master reference table

| City | County | Permitting authority (reroof) | Notable neighborhoods | Local weather / storm hook | Housing-stock note |
|---|---|---|---|---|---|
| **Raleigh** | Wake | **City of Raleigh** Dev. Services (in-city); Wake County (unincorporated). Inspection ~48 hrs post-completion. | Five Points, Hayes Barton, North Hills, Brier Creek, NW Raleigh, ITB historic districts | **April 16, 2011 EF3** (Sanford→Raleigh, ~67 mi, up to 160 mph, ~$178M); Wake Co. **69 severe-weather events in 2025** (NOAA, secondary cite). Straight-line wind/microbursts #1; hail less frequent, latent damage. | Extreme age spread: pre-WWII ITB (old decking, slate/architectural) + 2000s+ suburban. 2018 NC code, 115 mph gust, Exposure B. |
| **Cary** | Wake | **Town of Cary** Inspections & Permits | **Preston** (Prestonwood CC, ~1,625 homes), **MacGregor Downs** (lakeside), **Lochmere**, Regency Park | Same Triangle wind/hail; mature tree canopy → wind-thrown limb impact + heavy organic debris accelerating shingle wear. | ~180K pop, ~68% owner-occ, median ~$356K. **Heavy HOA prevalence** — architectural-committee approval for roof color/material. |
| **Knightdale** | Wake | **Town of Knightdale** (building services); Wake County backstop | **Mingo Creek**, Old Town, Langston Ridge, Amber Ridge, Planters Walk | East-Wake, open/less-canopied newer subdivisions → more exposed roof planes to straight-line wind. | **Fastest-growing** (11K→19K 2010–2020, ~22K now). **Young stock** (much post-2010) entering 12–20 yr first-replacement window. |
| **Garner** | Wake | **Town of Garner** Inspections; Wake County for unincorporated | **Creekside**, **Cleveland Bluffs**, **Lake Benson** area, White Oak corridor | Triangle wind/hail; **Lake Benson/Lake Wheeler** proximity → higher humidity, moss/algae on north slopes. | ~34K, semi-rural→suburban. Mixed: 1990s–2000s detached + booming townhomes. Permits +25% 2022–24. |
| **Clayton** | **Johnston** (NOT Wake) | **Town of Clayton / Johnston County** — *different jurisdiction from the other five* | **Flowers Plantation** (~3,000 ac, $279K–$890K), Riverwood | Central-NC storm corridor; newer open subdivisions → wind exposure. | **Fastest-growing in Johnston Co.** (~32K, doubled since 2000), biotech-driven (Novo Nordisk/Grifols). Heavy new-construction builder-grade roofs entering early upgrade cycle. |
| **Apex** | Wake | **Town of Apex** Building Inspections | **Downtown/Salem Street historic district** (1800s, Nat'l Register), Villages of Apex, neighborhoods ringed by the **Apex Peakway** | Triangle wind/hail; historic-downtown homes = older roof structures + possible historic-overlay considerations. | ~85K, ~26,500 units, mostly recent suburban + a historic-downtown pocket. PeakFest (~25K, early May). |

*(The Wake-vs-Johnston split for Clayton is the most important non-obvious fact — get the permitting authority right or the page loses local credibility instantly.)*

### 5.3 Per-city prose recipe (hooks a writer builds around)
- **RALEIGH** (anchor page) — lead with the **April 16, 2011 EF3** (documented, citable, resonant) + the NOAA event-count stat. Differentiate on Raleigh's **extreme roof-age spread** (ITB historic vs Brier Creek 2000s builds). Cover the city-vs-unincorporated permitting split + ~48-hr inspection. Landmarks: North Hills, downtown, NC State.
- **CARY** — make it about **HOA-governed planned communities** (Cary's defining roofing reality). Name Preston / MacGregor Downs / Lochmere. Real value-content: getting roof color/material approved by an architectural review committee, matching neighborhood profiles. Mature canopy = limb impact + debris. Affluent → premium architectural/designer shingles.
- **KNIGHTDALE** — hook: **young stock hitting its first replacement cycle**. Post-2010 builder-grade roofs in Mingo Creek / Langston Ridge / Amber Ridge now 12–20 yrs old. East-Wake openness = wind-exposed planes. Educate a first-time-replacing homeowner.
- **GARNER** — hook: **semi-rural→suburban transition + lake humidity**. Lake Benson proximity → algae streaking + moss on north slopes → algae-resistant shingles + roof cleaning. Mixed stock addresses both reroofs + newer townhomes. +25% permit surge.
- **CLAYTON** — hook #1: **Johnston County, NOT Wake** — explicitly state you handle Johnston/Town of Clayton permitting (proves you work there). Hook #2: **Flowers Plantation** + biotech boom → new-construction builder-grade roofs entering early upgrade window. Repair-vs-upgrade conversation for 5–15-yr builds.
- **APEX** — hook: **historic Salem Street downtown** (1800s, Nat'l Register) vs modern suburban builds ringed by the **Apex Peakway**. Unique angle: historic homes (older structures, steeper/complex Victorian rooflines, historic-district sensitivity) vs the bulk of recent suburban stock. "Best place to live" + PeakFest = local-color signals. Higher-income → architectural/premium.

### 5.4 City-page section structure (rank + convert) + word count
11 sections (order should **vary per city** so pages aren't structurally cloned):
1. **Hero** (H1 city+service, city-specific image, local phone/call-tracking, storm-led subhead)
2. **Local intro** (authored, unique — the "standalone mini-homepage" opener)
3. **Local storm/weather context** (the documented hook)
4. **Services in [City]** (framed to local stock; links to service pages)
5. **Neighborhoods we serve** (named, **in prose with context**, not a bare list)
6. **Local proof — projects** (2–4 real jobs in-city, photos, neighborhood)
7. **Local proof — reviews** (from that city's customers; varied formats)
8. **Permitting & local process** (correct authority; Wake-vs-Johnston for Clayton; ~48-hr inspection)
9. **City-specific FAQ** (4–6 Q&As that change per city; FAQPage schema)
10. **Service-area map** (embedded, centered on city)
11. **Local CTA band** ("Talk to a roofer who knows [City]")

**Word count:** no official Google number (length isn't a ranking factor per se). Target **~700–900 words/page where the majority is city-specific**. A 650-word 70%-local page beats a 1,200-word 80%-boilerplate page.

### 5.5 Anti-duplication tactics
**DO:** hand-write intro + storm hook per city · localized FAQ (different questions, not swapped) · city-specific imagery + alt text ("Architectural shingle replacement on a Preston home in Cary, NC") · real local project examples · embed per-city map · **vary section order/emphasis** (lead Clayton with permitting, Knightdale with "first replacement," Cary with HOA) · contextual links to relevant service pages + nearby cities · reference only verifiable local specifics (don't invent landmarks).

**NEVER:** ❌ city-name token swap · ❌ synonym spinning · ❌ footer city-link dumps / high link-to-text ratio · ❌ orphan pages · ❌ bare keyword-stuffed neighborhood lists · ❌ generic "We proudly serve [City] with quality roofing you can trust" filler · ❌ mass simultaneous publish on a young domain · ❌ a page-per-neighborhood on top of city pages (thin-page sprawl; cap city pages at ~10–15).

### 5.6 BUILD RECOMMENDATIONS — city pages
34. **Typed per-city data object** (`lib/cities.ts`) with fields: `slug`, `name`, `county`, `permitAuthority`, `permitNote`, `neighborhoods[]`, `stormHook`, `housingStock`, `localConsiderations[]`, `landmarks[]`, `localProjects[]`, `localReviews[]`, `faqs[]`, `intro`, `heroImage{src,alt}`.
35. **Rule:** `stormHook`, `intro`, `housingStock`, `faqs[].answer`, `localProjects`, `localReviews` MUST be unique strings per city — **no shared template literals, no `` `We serve ${city}...` `` interpolation in body fields.** Shared *service* facts (warranty, process) live in a separate component (fine to repeat).
36. **Build-time uniqueness gate:** a CI script renders all 6 city pages, strips shared-component markup, computes pairwise body-text similarity (shingling / Jaccard on n-grams), and **fails the build if any pair exceeds ~40% similarity** on local content. Converts "don't write doorway pages" from discipline into a gate.
37. **Lint the data layer:** assert `intro`/`stormHook`/`housingStock`/FAQ answers are not byte-identical across cities and contain no `${...}` city interpolation in body fields.
38. **Per-city alt-text rule:** assert each `heroImage.alt` + project alt is unique and contains the city or a named local place.
39. **Internal-link assertion:** every city page renders ≥1 link from the Service Areas hub + ≥2 contextual service-page links — test for it.
40. **Stagger publishing:** ship the hub + 1–2 highest-intent cities (Raleigh first) and add the rest on a ~weekly cadence (young-domain risk reduction).
41. **One `<CityPage data={cityData} />` shell** renders all 11 sections from the per-city object (shell DRY, content unique) + injects per-city JSON-LD (areaServed, reviews, FAQs).
42. **Per-city call-tracking numbers** if available (also measures which city pages convert).
43. **Gate the rollout on a uniqueness budget** (≥60% city-specific body text); if a smaller town lacks genuinely unique material, ship fewer strong pages first.

---

## SECTION 6 — THE `/roofing-cost` GUIDE (rank + convert)

**Why it matters:** "how much does a new roof cost" + "roof replacement cost [city]" are among the highest-volume, highest-commercial-intent roofing queries. The cost guide is the #1 organic magnet AND a pre-qualifier — it ranks broadly (informational) and converts (researchers ready to buy). It's the pillar page; its outbound internal links sink the most authority into money pages.

**What makes it RANK:** comprehensive + current (year in title/body, refreshed annually) with **real numbers and ranges** (per-sq-ft + totals); **localized to Raleigh/Triangle** (most cost guides aren't — that's the wedge to outrank national content); structured for featured-snippet + AI-Overview capture (clear "average cost" answer up top, scannable tables, strong FAQ); E-E-A-T (Article schema w/ author, "based on our X local jobs").

**What makes it CONVERT:** price *ranges* (not exact quotes) that set expectations without scaring → "the only way to know your exact price is a free inspection" CTA; financing tie-in (sticker shock → monthly payments); repeated soft CTAs + a hard CTA; optional cost-calculator lead hook.

### 6.1 Section blueprint (top → bottom)
1. **H1 + intro** — "Roof Replacement Cost in Raleigh, NC (2026 Guide)." First paragraph answers immediately with the headline range (snippet bait): "Most Raleigh homeowners pay **$X–$Y**…" + tap-to-call.
2. **Quick-answer cost box** — average + per-sq-ft range, callout-styled (featured-snippet target).
3. **Cost by roof size** — table: 1,000 / 1,500 / 2,000 / 2,500 / 3,000 sq ft → ranges.
4. **Cost by material type** — table: 3-tab / architectural / metal / premium (slate/tile) → $/sq ft + total + lifespan. Cross-link each material (metal → `/services/metal-roofing`; shingles → `/brands/*`).
5. **Cost factors** (depth that ranks) — pitch/complexity, tear-off & disposal, decking repair, layers, accessibility, permits, gutters/flashing/ventilation add-ons, labor (40–60%), 2025–26 material inflation. H3 per factor.
6. **Repair vs replace cost** — when each makes sense (links repair ↔ replacement).
7. **Does insurance cover it?** — bridge to storm: when storm/hail means insurance pays → link `/storm-damage/insurance-claims`. **Turns a cost researcher into a claim lead** (huge for storm-led traffic).
8. **Financing / making it affordable** — monthly-payment framing → link `/financing`. Conversion pivot.
9. **What's included in our pricing** — transparency/trust (warranty, cleanup, certified install) → differentiator vs cheap bids.
10. **How to get an accurate quote** — "ranges only go so far; get a free, no-pressure inspection" → primary CTA + form.
11. **Cost by city** (optional, strong) — mini-rows/links: "Roof replacement cost in Cary / Apex / …" → the 6 city pages (reinforces geo-mesh, captures "[city] roof cost").
12. **FAQ** (8–12) — "How much does a new roof cost in Raleigh?", "Is metal worth it?", "Will insurance pay?", "How long does a roof last?", "Can I finance a roof?" — answers visible, FAQPage schema, each links the relevant page.
13. **Final CTA band** — free inspection + phone + form.

### 6.2 BUILD RECOMMENDATIONS — cost guide
44. **Static page** (`app/roofing-cost/page.tsx`) with price data in `lib/costData.ts` (size table, material table, factors) — annual updates = one-file edit; year/title stay in sync.
45. **Tables = semantic HTML `<table>`** (accessible + scannable). No Google "Table" rich result — value is UX + snippet eligibility from clean structure.
46. **Schema:** `Article` (author / datePublished / dateModified for freshness E-E-A-T) + `FAQPage` + `BreadcrumbList`; update `dateModified` on each refresh.
47. **Metadata:** title injects current year via `generateMetadata`; description leads with "how much does a new roof cost in Raleigh."
48. **Wire outbound contextual links** to replacement, metal, brands, financing, insurance-claims, and the 6 cities — this page funnels the most authority, so its outbound links matter most.
49. **Optional client cost estimator** (sq ft × material → range) as a lead hook (email-gate the detailed estimate → `/api/lead`).

---

## SECTION 7 — CROSS-CUTTING BUILD RECOMMENDATIONS

50. **Two-surface discipline:** keep `/` tight + top-loaded (conversion); never thin the service/city/storm/cost pages to "clean up" — their depth IS the organic traffic. Preserve SEO depth.
51. **Mobile-first:** sticky bottom call/inspect bar; tap-to-call everywhere; 70%+ of roofing traffic is mobile.
52. **`/api/lead` endpoint** receiving the multi-step quiz + all forms; consider partial-lead capture on quiz step 3.
53. **Image strategy:** real local project photos (per city/service) for heroes + OG + gallery; descriptive alt text with city/service/neighborhood; `next/image` for perf.
54. **Reduced-motion + axe pass** per the project's verification stack before any "shipped" claim.
55. **One canonical NAP** across footer + Contact schema + GBP — never fabricate per-city addresses.
56. **GBP is the star engine** — set client expectation: on-site stars won't render; pour review effort into Google Business Profile (also powers the local 3-pack).
57. **Annual refresh cadence** on `/roofing-cost` (and storm pages post-season) — keeps freshness signals + accuracy.
58. **Blog/content engine (`/blog`)** as the scalable, doorway-safe path to grow topical authority beyond the 35-page spine.
59. **Required-unique-field TypeScript pattern** applied to BOTH city AND service configs so thin clones won't compile.
60. **Breadcrumbs sitewide** (component emits both nav + BreadcrumbList JSON-LD) reinforcing the browseable hierarchy Google rewards.
61. **Treat storm + emergency + insurance as the money cluster** — most internal-link equity, strongest CTAs, deepest unique content (matches the storm-led traffic thesis).
62. **Stagger the city-page launch** + run the pairwise-similarity gate in CI on every build.

---

## SOURCES

**Competitor teardowns**
- Erie Home — https://eriehome.com/ · /free-estimate/ · /roofing/ · /locations/roofing/
- West Shore Home — https://westshorehome.com/ · /finance/ · /offers/
- Long Home — https://www.longhome.com/
- Power Home Remodeling — https://www.powerhrg.com/ · /free-quote/ · /services/ · /support/our-process/
- RoofClaim.com — https://roofclaim.com/ · /roof-financing/ · /how-roofclaim-works/ · /how-to-finance-a-new-roof/
- LeafFilter — https://www.leaffilter.com/ · /purchase/free-estimate/ · /purchase/pricing/
- Skywalker Roofing (NC) — https://www.skywalkerroofingnc.com/ · /nc/roofing · /about · /blog
- Conversion-element research — https://www.servicetitan.com/blog/roofing-websites · https://www.cyberoptik.net/blog/roofing-website-design-15-converting-elements-every-contractor-needs-in-2025/ · https://www.onthemap.com/roofing-web-design-company/ · https://wppip.com/blog/2025/08/20/50-roofing-website-ideas-that-convert-visitors-into-customers-2025-edition/
- Review corroboration — https://www.consumeraffairs.com/homeowners/west-shore-home.html · https://www.consumeraffairs.com/homeowners/erie-home.html · https://www.bbb.org/us/nc/stokesdale/profile/roofing-contractors/skywalker-roofing-company-0503-33038863 · https://www.guildquality.com/pro/skywalker-roofing-company-3

**SEO structure / schema**
- WebFX Roofing SEO Guide — https://www.webfx.com/blog/home-services/roofing-seo-guide/
- Loopex Digital SEO for Roofing (2026) — https://www.loopexdigital.com/industries/seo-for-roofing
- SEO for Roofers — https://seoforroofers.com/resources/guides/complete-roofing-seo-guide
- LocalMighty Local SEO for Roofing (2026) — https://www.localmighty.com/blog/local-seo-checklist-for-roofing-contractors/
- Google Search Central — Review Snippet structured data — https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- BrightLocal — Review schema rules — https://www.brightlocal.com/learn/review-schema/
- Birdeye — Google star rating rich snippet change — https://birdeye.com/blog/googles-star-rating-rich-snippet-changes-explained/
- Whitespark — JSON-LD Local Business Schema guide — https://whitespark.ca/blog/the-json-ld-markup-guide-to-local-business-schema/
- jsonld.com — Local Business Schema + RoofingContractor subtype — https://jsonld.com/local-business/
- eSEOspace — Schema for Contractor Websites — https://eseospace.com/blog/schema-markup-for-contractor-websites/
- Squin.org — FAQPage Schema 2026 eligibility — https://squin.org/structured-data/faqpage-schema/
- Incremys — FAQ Structured Data (2026) — https://www.incremys.com/en/resources/blog/faq-structured-data
- Brand Vision — Schema for Service Businesses — https://www.brandvm.com/post/schema-markup-service-businesses
- Search Engine Land — Service Area Pages — https://searchengineland.com/guide/service-area-pages
- Search Engine Land — Topic clusters & pillar pages — https://searchengineland.com/guide/topic-clusters
- SEO Local — Internal Linking for Local SEO — https://seolocal.us/website-seo/internal-linking-local-seo
- Ciphers Digital — Hub/Wheel/Spoke local SEO — https://www.ciphersdigital.com/hub-wheel-spoke-local-seo-strategy/
- SEOVendor — Ideal Title & Meta Description (2025) — https://seovendor.co/the-ideal-title-and-meta-description-2025-best-practices/

**City pages / doorway / cost**
- Google Search Central — Spam Policies (doorway + scaled content abuse) — https://developers.google.com/search/docs/essentials/spam-policies
- Sterling Sky — Unique & Helpful Service Area Pages — https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/
- Whitespark — Ranking with Exceptional City Pages — https://whitespark.ca/blog/rank-in-cities-with-no-physical-address/
- RicketyRoo — Location Pages vs Doorway Abuse — https://ricketyroo.com/blog/location-page-spam/
- Orbit Media — Doorway Page Penalty / orphan pages — https://www.orbitmedia.com/blog/doorway-pages-seo/
- April 16, 2011 NC tornado outbreak — https://www.cbs17.com/weather/severe-weather/looking-back-biggest-north-carolina-tornado-outbreak-april-16-2011/ · https://www.ustornadoes.com/2013/04/16/north-carolinas-largest-tornado-outbreak-april-16th-2011/
- Raleigh storm statistics / NOAA Wake events — https://phcrestoration.com/raleigh-storm-damage-statistics/
- NC roofing permit rules — https://homegeniusexteriors.com/blog/permit-to-replace-your-roof-in-nc/ · https://citadel-contracting.com/north-carolina-roofing-regulations/
- Wake County Permits & Inspections — https://www.wake.gov/departments-government/permits-and-inspections · https://raleighnewbuilds.com/research/process/wake-county-permits/
- City of Raleigh residential permits — https://raleighnc.gov/permits/services/how-get-residential-permit
- Town of Apex permitting (PDF) — https://www.apexnc.org/DocumentCenter/View/42996/When-is-a-permit-needed
- Cary neighborhoods/housing — https://raleighrealty.com/blog/best-neighborhoods-cary · https://www.niche.com/places-to-live/cary-wake-nc/
- Knightdale growth/neighborhoods — https://en.wikipedia.org/wiki/Knightdale,_North_Carolina · https://abc11.com/knightdale-growth-boomtown-affordable-housing-wake-county/14388809/
- Garner neighborhoods/housing — https://raleighrealty.com/blog/best-neighborhoods-garner · https://livinginraleighnow.com/post/garner-nc-demographic-evolution
- Clayton / Flowers Plantation — https://raleighrealty.com/blog/best-neighborhoods-clayton · https://abc11.com/clayton-waterfront-district-at-flowers-plantation-johnston-county-business-news-nc-42/12692816/
- Apex history/downtown/Peakway — https://www.apexnc.org/225/Our-History · https://exploreapexnc.com/downtown/ · https://thisisraleigh.com/neighborhoods-in-apex-nc/
- Roofing cost data — https://www.billraganroofing.com/blog/average-cost-replace-roof · https://www.marketingcode.com/roofing-verisk-23b-replacement-17631-claims-down-20-jun-2026/
- GAF Master Elite — https://stonewaterroofing.com/blog/what-is-gaf-master-elite-certification/
- Storm insurance claims — https://www.kellyroofing.com/blog/roof-damage-from-storm-insurance/

---

## UNCERTAIN / CONFLICTING

1. **Self-serving review stars (HIGH CONFIDENCE restricted; workaround is the nuance).** Google is explicit + current: self-controlled LocalBusiness/Organization reviews are **ineligible** for star rich results. Less settled: whether including AggregateRating anyway helps knowledge-panel/AI-engine purposes (some SEO sources advocate it; Google neither forbids nor rewards). **Recommendation:** display reviews in HTML, drive stars via GBP, include on-site AggregateRating only with *real* numbers as optional entity data. Don't promise the client stars from their own site.

2. **FAQPage rich results (HIGH CONFIDENCE restricted; value-of-implementing is the call).** Confirmed gov/health-only since Aug 2023. Sources agree commercial sites won't get the accordion; consensus (and recommendation) is still ship it for entity understanding + AI Overview extraction — NOT a SERP-feature play.

3. **City-page count vs doorway risk (CONTEXT-DEPENDENT).** All 6 cities are real municipalities served — the legitimate use case — *if* each has 40–60% unique local content (unique testimonials + project + local-considerations copy). Risk is purely execution: a thin clone for a smaller town (Knightdale/Garner/Clayton) is the doorway trigger. Gate uniqueness at the data layer; if needed, launch the 3–4 strongest cities first.

4. **City-page schema pattern (PICK ONE; sources differ).** Some mark up each city with a city-scoped `LocalBusiness`/`RoofingContractor` (areaServed = that city); others use `Service`+`areaServed`. With ONE physical address, **do not invent per-city addresses** (NAP-inconsistency + spam risk). Lean `Service`+`areaServed` per city, canonical LocalBusiness entity on Home/Contact. Consistency matters more than the choice.

5. **Total page count is a soft target.** ~30–37 *substantive* pages beats a forced 35 padded with thin pages. The clean 32-page editorial spine grows to ~35–37 with the optional pages. Treat "~35" as the right order of magnitude; let genuine content availability decide the final number. A `/blog` engine is the scalable, doorway-safe growth path.

6. **Live multi-step form field-walks (Erie, LeafFilter, Power, RoofClaim) NOT verified verbatim.** These funnels are JS-rendered; several blocked static fetch. Captured: existence, opener (zip-first vs single form vs quiz), routing — from rendered homepages + search corroboration. The per-step field lists in the BUILD section are best-practice synthesis, not a transcription of any one competitor's form. Power's hero (403s static fetch) is slightly lower confidence than the other five.

7. **RoofClaim "$99/month" NOT confirmed on-site.** Confirmed: fixed 14.99% APR, $0 down, 5/10-yr terms, in-house financing. The $99/mo from the brief may be stale or a product example — verify on live `/roof-financing/` before quoting.

8. **West Shore "20% off + 20 months no payments"** is a time-limited 20th-anniversary promo (likely to rotate). Durable financing facts ("$0 down, 0%, as low as $89/mo, up to 12mo deferred") are the safer citations.

9. **Skywalker certs:** above-fold row shows **Owens Corning Platinum + CertainTeed ShingleMaster** (not a GAF Master Elite badge); search initially suggested GAF/Timberline. Verifiable on-page badges are OC Platinum + CertainTeed. Its 4.9★/1,200+ reviews are real but NOT surfaced above fold (itself a finding).

10. **Per-city specifics to verify before publishing as hard claims:** population figures vary by source/year (attribute them, e.g. "per 2020 Census"); town-specific reroof permit rules for Cary/Knightdale/Garner/Apex/Clayton were inferred from the NC statewide rule (non-structural reroof <$15k generally exempt; >$15k requires a permit; issued by local city OR county) + Wake County/City of Raleigh confirmation — the Apex PDF didn't text-parse and town pages weren't read individually. Safe defensible copy = statewide framing + naming the correct authority (and for Clayton, the Johnston-not-Wake distinction, which is solid). The NOAA "69 Wake events in 2025" is a secondary cite — verify against the NOAA Storm Events Database before stating as fact. Triangle wind (straight-line/microburst) is the more frequent residential-damage cause than hail — lead with storm broadly, use hail as one named peril (don't overstate Triangle hail frequency).

11. **Firecrawl was unavailable** (credits exhausted) for this run — research was done via WebSearch + direct WebFetch of primary sources (Google Search Central, BrightLocal, Search Engine Land, schema guides). Confidence is high on schema/review/doorway facts (pulled from primary/authoritative sources). Highest-value follow-up once credits return: a Firecrawl full-page teardown of 3–4 actual top-*ranking* (not just top-converting) roofing competitors' exact page structures + live schema.
