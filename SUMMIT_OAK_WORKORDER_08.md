# WORK ORDER 08 — Summit & Oak (on-page SEO maximization → 9.5)

**From:** WE10 (architect) · **To:** Builder (WARM / active) · **Date:** 2026-06-17
**Compounds on:** WO_01–07. **Goal:** take ON-PAGE SEO/traffic to **9.5/10**, matching the 9.5 conversion. (Off-page — backlinks, GBP, citations — is the post-launch ops layer, per client; NOT this WO.)

## 0. CURRENT STATE (WE10 audit) — already strong, PRESERVE
Unique keyword+geo titles · unique meta descriptions · canonical + OG on every page · robots.txt + 34-page sitemap · broad JSON-LD (FAQPage, Service, BreadcrumbList, AggregateRating, Organization, WebSite, City, GeoCoordinates, OpeningHours, PostalAddress, Article). **Keep all of it.** This WO fills GAPS + adds MAXIMIZERS.

## 1. PRIMARY LEVERS (the real traffic gains)
1. **Topical-authority content layer — the #1 add.** Build a `/resources` (or `/blog`) hub + a cluster of **genuinely-useful supporting ARTICLES** (~1,000–1,500 words, real depth, factual + locally-grounded, plain grade-5 voice — NOT padded/AI-fluff; same uniqueness discipline that made the city pages pass the doorway audit). Each is driven by a real "People Also Ask" / informational query: H1 = the query, a concise snippet-optimized answer up top, then depth, `Article`/`BlogPosting` + FAQ schema, and **contextual internal links to the relevant money page + related articles.** Seed clusters (~12–15 articles):
   - **Insurance:** "Does homeowners insurance cover roof replacement?" · "ACV vs RCV roofing claims" · "What to do if your roof claim is denied" (deepen the existing insurance page).
   - **Cost:** "How much does a roof cost in [Raleigh/Cary/…]" · "Metal vs shingle cost" · "What drives roof replacement cost".
   - **Decision/maintenance:** "How long does a roof last" · "Signs you need a new roof" · "Repair vs replace" · "Best roofing material for NC heat + storms".
   - **Storm:** "How to spot hail damage" · "What to do after a storm" · "Wind damage signs".
   This is what takes the site from "ranks for its money terms" to **owning the topic** — capturing top-of-funnel + long-tail and feeding internal links down to the converting pages. Keep each article genuinely useful (thin/padded articles are a doorway liability — don't ship those).
2. **Schema precision.** Ensure the PRIMARY business entity is typed **`RoofingContractor`** (a LocalBusiness subtype) — not just Organization — with full NAP + geo + OpeningHours + **`areaServed`** (all 6 cities) + **`sameAs`** (social profiles) + `aggregateRating`. Add individual **`Review`** items (review rich snippets, not just the aggregate). Add `Article`/`BlogPosting` to the new cluster pages. Validate the entire set in Google Rich Results — zero errors.
3. **Internal-linking mesh.** Dense, logical, contextual: service↔city↔brand↔article; every page → its hub + the money pages; each supporting article → the money page it supports + related articles. **No orphan pages.** Verify the mesh.

## 2. POLISH TO 9.5
4. **Core Web Vitals.** Mobile LCP < 2s (hero video lazy-loads behind the poster — confirm), CLS ~0 (all media/embeds sized), healthy INP. Verify via Lighthouse/PSI; fix regressions. CWV is a ranking factor.
5. **Image SEO + alt text.** Every meaningful image: descriptive non-stuffed alt (SEO + a11y), modern format (webp/avif), lazy-load below the fold.
6. **E-E-A-T.** The About page carries real experience/expertise/credential signals (team, years, certifications, license #) — model the entity-trust a real client needs.
7. **Housekeeping.** New cluster pages in the sitemap (with lastmod); per-page OG images that are page-relevant (not all identical); breadcrumb on every deep page.

## 3. VERIFICATION
- Google Rich Results: all schema types valid, zero errors (spot-check home, a service, a city, cost, a new article).
- Lighthouse (mobile): SEO ~100, CWV green; axe 0-serious.
- Sitemap includes every page incl. the new cluster; no orphan pages (all reachable via internal links).
- `/resources` hub + articles live, each internal-linked to a money page.
- build/render/PIXELS/mobile/reduced-motion/deployed-content.

## 4. PRESERVE
Everything from WO_01–07 (conversion, balance/Fulcrum both axes, NC compliance, rounded prices, insurance promotion, de-redded calm mobile hero, in-fold decide-inputs) + the §0 SEO foundations. This is ADDITIVE depth + precision — new content must NOT re-break balance or re-clutter the mobile hero.

## 5. OPERATING
Genuinely-useful content only (no thin/AI-padded articles). Fix to the standard; extrapolate. ON-PAGE max only — off-page (links/GBP/citations) is the per-client post-launch ops layer. Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the new cluster + schema additions + Lighthouse/CWV scores + an internal-linking summary.

---
*— WE10, 2026-06-17. On-page SEO to 9.5 = the technical/schema foundation (already strong) + a genuine topical-authority content layer (the big add) + entity-schema precision + dense internal linking + CWV/E-E-A-T. Off-page is the next layer, per client, post-launch.*
