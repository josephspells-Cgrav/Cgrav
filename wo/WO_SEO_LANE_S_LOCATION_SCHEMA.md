# WO — SEO LANE S: structured data on the 20 location pages — ULTRA-LEAN
**Date:** 2026-08-20 ~4:45am ET · **Orchestrator:** OS60 · **WO drafted on fable-5.**
**Mode:** ULTRA-LEAN (Kimi K3 HIGH builds; Kimi static judge; orchestrator gates/merges/deploys).
**Repo:** mabrey-roofing · **Branch:** `seo-s-location-schema` cut from `master @ f475d19` (deploy tip, probed 4:40am).
**Worktree:** `C:/Users/josep/Claude Gravity/.wt-seo-s`.
**Floor surfaces touched:** customer-facing (SERP presentation of the 20 highest-value local pages).

## 0. WHY
Location pages are the site's core local-SEO surface and carry ZERO structured data
(PROBED 4:40am: no JsonLd import anywhere under app/locations/). Every comparable page
class (glossary terms, /faq, articles, about) already emits a full JSON-LD graph via
lib/schema.ts helpers. GSC shows 56 valid Breadcrumbs — locations are the missing set.

## 1. CURRENT BEHAVIOR (PROBED)
- `app/locations/[city]/page.tsx`: renders from `lib/cities.ts` CITY entries (each has
  `faqs: CityFaq[]` = 3-4 {q,a} pairs, `name`, `slug`, county, etc.). NO JsonLd, NO schema import.
- `app/locations/[city]/[sub]/page.tsx` exists (legacy combo route — middleware 301s
  combos to the city hub; page is vestigial). DO NOT TOUCH IT.
- `lib/schema.ts` exports ready helpers: `webPageNode` (line 198, supports `speakable`),
  `breadcrumbNode` (224), `faqNode` (281 — FAQPage from {q,a}[]), `locationNode` (328 —
  read it before deciding whether to use it), `buildGraph`, and the `JsonLd` component
  at `components/JsonLd.tsx`.
- The exemplar wiring pattern: `app/resources/glossary/[term]/page.tsx` lines 55-80
  (buildGraph([webPageNode, breadcrumbNode, extra-node]) → `<JsonLd graph={graph} />`).
- FAQ-dedup law (lib/faqs.ts:48-60): a question may appear in ONLY ONE FAQPage block
  site-wide. City FAQs are per-city unique (doorway gate enforces textual uniqueness)
  and none are marked up anywhere today — so marking each city's own faqs is safe.
- The `.seo-answer` block exists on location pages (the answer field renders there).

## 2. TARGET BEHAVIOR
`app/locations/[city]/page.tsx` emits ONE JsonLd graph per page containing EXACTLY:
1. `webPageNode({ url: /locations/<slug>, name: <the page's existing title phrasing>,
   description: <the city metaDescription or its existing fallback>, speakable: [".seo-answer"] })`
2. `breadcrumbNode([Home /, Service Areas /service-areas, <City name> /locations/<slug>])`
   — verify /service-areas is the real hub route (probe it; if the site's breadcrumb
   convention elsewhere differs, follow the existing convention and record it).
3. `faqNode(city.faqs)` — the city's OWN faqs only.
HARD PROHIBITIONS: NO aggregateRating anywhere (Google self-serving-reviews policy —
standing law) · NO new LocalBusiness/Organization/RoofingContractor node on these pages
(the org entity has ONE canonical node; a second node risks Google merging conflicting
data onto the @id — see the warning comment in app/contact/page.tsx:25-28). If
`locationNode` (lib/schema.ts:328) turns out to mint a LocalBusiness-type node, DO NOT
use it — the three nodes above are the complete set. If it's a Place/geo node that
composes cleanly per its own doc comment, you MAY add it as a fourth node — decide from
reading it and RECORD the decision + reasoning in the report.

## 3. ONLY-THESE-FILES
`app/locations/[city]/page.tsx`. (lib/schema.ts is read-only; if a helper is missing
something, STOP and report — do not edit lib.)

## 4. NEVER-TOUCH
`app/locations/[city]/[sub]/page.tsx` · `lib/**` · `components/**` · `middleware.ts` ·
`scripts/**` · every other app/ route · `package.json` · tests.

## 5. INVARIANTS
- **I1** Rendered HTML of every location page gains exactly ONE new `<script type="application/ld+json">` block; page's visible content byte-identical otherwise.
- **I2** The JSON parses; @types present: WebPage, BreadcrumbList, FAQPage; FAQPage mainEntity count == that city's faqs.length.
- **I3** Strings "aggregateRating" and "AggregateRating" appear NOWHERE in the new output.
- **I4** No LocalBusiness/Organization/RoofingContractor @type in the new graph (unless the recorded locationNode decision adds a pure Place node).
- **I5** All existing gates stay green (typecheck, build, spam-410-guard, doorway-check, reachability).
- **I6** FAQ questions marked up == the city's own faqs verbatim (no rewording — markup mirrors rendered text per Google's FAQ policy).

## 6. GATES (verbatim; server on :3220 — kill prior listeners, prove BUILD_ID freshness first)
```
npm run typecheck
npm run build
PORT=3220 npm run spam-410-guard
PORT=3220 npm run doorway-check
PORT=3220 npm run reachability-check
```

## 7. ORACLE (mechanical, all 20 cities)
Script it: for each of the 20 city slugs, GET /locations/<slug>, extract all ld+json
blocks, JSON.parse, and assert: WebPage+BreadcrumbList+FAQPage present · FAQPage count
== cities.ts faqs.length for that slug · zero aggregateRating · breadcrumb item 3 name
== city name. Print a 20-row table. Also print one full graph (cary-nc) verbatim in the
report for human eyes.

## 8. REPORT
`wo/BUILD_REPORT_SEO_LANE_S.md`: gate exits · the 20-row oracle table · the cary-nc
graph verbatim · the locationNode decision + reasoning · the breadcrumb-convention probe
result. Commit on the branch (message: `seo-lane-s: JSON-LD graph on location pages —
WebPage + breadcrumbs + FAQPage`). Do not push.

## 9. THE SIX NEVERS
NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push · modify
gates. A red gate is fixed in the code, never in the gate.
