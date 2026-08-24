# WORK ORDER 15 — Summit & Oak (8 new service-area / location pages — anti-doorway, fully built out)

**From:** WE11 (architect) · **To:** Builder (COLD / FRESH session, running **ULTRACODE**) · **Date:** 2026-06-20
**Compounds on:** WO_01–14 — all locks carry (the 9.5/9.5 reference state, the WO_12 dual-intent, the WO_14 hero, NC compliance, the anti-doorway city architecture). **ADDITIVE ONLY** — config/content layer (8 new `lib/cities.ts` entries + auto-wiring), NOT a component redesign.
**Site:** `summit-oak-roofing/` (Next.js SSG), live `kingmaker-summit-oak-roofing.vercel.app`. Standalone — verify via build + Playwright + the **`.verify-unique.cjs`** gate + render + deployed-content (NOT the flagship `verify.mjs`).

## 0. THE ASK
Add **8 fully-built-out service-area / location pages** to the existing `/service-areas/[city]` system:
**Morrisville · Wake Forest · Holly Springs · Wendell · Fuquay-Varina · Zebulon · Rolesville · Durham** (all NC).
- ⚠️ Verbal-ask corrections: **"Windell" = Wendell**, **"Rollsville" = Rolesville** (the real Wake County towns).
- ⚠️ **APEX IS ALREADY LIVE** (one of the existing 6: raleigh/cary/knightdale/garner/clayton/apex) — **SKIP it** (do not rebuild/duplicate).
- ⚠️ **DURHAM is in DURHAM COUNTY, not Wake** — the different permitting jurisdiction is its hook (handle the county/permit-authority + any Wake-assuming geography/config).

## 1. THE PRINCIPLE (the lens — the make-or-break)
**Anti-doorway uniqueness.** Google penalizes near-duplicate location pages (city-name-swap templates) — the #1 thing that caps local rankings ([[reference_seo_2026_rubric]] factor #2: 40–60% genuinely-unique local value per page). Your existing 6 city pages **passed decisively** (this session's SEO audit: doorway-risk **LOW**, content 9.0/10) — each ~1,270–1,367 words with a **distinct local thesis** (Raleigh=wind/2011-EF3, Cary=HOA covenants, Garner=Lake-Benson humidity…), a per-city `lead` that reshuffles the page, and 7 hand-authored REQUIRED-UNIQUE prose fields. **The 8 new towns MUST hit that exact bar** — thin city-swap pages drag the WHOLE site's local rankings (existential under free-until-rank). This is THE gate.

## 2. THE 8 TOWNS — a DISTINCT seed per town (research + expand each to the existing depth)
No two pages tell the same story. Seeds + a suggested `lead` (spread the lead values to vary page shape — the 6-value enum will repeat across 14 cities; that's fine, the PROSE is the gate):

| Town | County / permit authority | Distinct thesis (the unique angle) | lead |
|---|---|---|---|
| Morrisville | Wake / Town of Morrisville | RTP/RDU tech hub; 90s–2000s builder-grade subdivisions hitting *first-replacement age*; HOA approval + RDU flight-path | lifecycle |
| Wake Forest | Wake / Town of Wake Forest | Historic college town (the original Wake Forest) + explosive new growth; heavy mature tree canopy → limb/debris load | heritage |
| Holly Springs | Wake / Town of Holly Springs | Young-family boomburb, ~all 2000s+ construction → a *synchronized* roof-aging wave (whole subdivisions due at once) | lifecycle |
| Wendell | Wake / Town of Wendell | The Wendell Falls master-planned boom + rural→suburban edge; more open wind exposure | storm |
| Fuquay-Varina | Wake / Town of Fuquay-Varina | Two merged historic downtowns (the hyphen) + fast sprawl; mineral-spring heritage | heritage |
| Zebulon | Wake (far east) / Town of Zebulon | The rural eastern edge of the Triangle; open farmland = more wind, less tree cover than the western towns | storm |
| Rolesville | Wake (north) / Town of Rolesville | One of NC's fastest-growing small towns; almost entirely new construction | lifecycle |
| Durham | **Durham County** / City of Durham + Durham County | Bull City/Duke; the DIFFERENT permitting jurisdiction is the hook + a deep historic stock (Trinity Park/Forest Hills craftsman + 1920s mill houses) | heritage |

**Ground every fact** — research each town's REAL neighborhoods, the ACTUAL permit authority, local storm/weather exposure, housing-stock age, landmarks (web search per town). **NO fabricated neighborhoods/facts** — these are real towns; a wrong permit authority or invented neighborhood is an accuracy + credibility failure. Real specific facts are what rank + read credible.

## 3. THE STANDARD (match the exemplar EXACTLY)
- Add **8 `City` entries to `lib/cities.ts`**, matching the existing `City` type + the file's REQUIRED-UNIQUE doctrine (the header comment is LAW: "every body field is UNIQUE hand-authored prose per city — no shared template literals, no `${city}` interpolation; section emphasis varies per city"). Required-unique fields: `intro, stormHook, housingStock, localConsiderations[], localProjects[], localReviews[], faqs[]` + `county/permitAuthority/permitNote/neighborhoods[]/landmarks[]/lead/heroImage`.
- **Depth bar:** ~1,270–1,367 words per page — fully built out, like the existing 6. Not thin.
- **localReviews** = plausible DEMO reviews (keep the existing demo convention; don't fabricate real-person claims beyond the demo set). **localProjects** = distinct per-town recent-work.
- Study Raleigh / Cary / Garner / Clayton in `lib/cities.ts` as the exemplar; replicate the shape + depth, vary **100% of the prose**.

## 4. ULTRACODE STRUCTURE (parallelize — you're running ultracode)
This parallelizes cleanly — run it as a workflow:
- **8 parallel research+writer agents (one per town)** — each researches its town (real facts) + writes its full `City` entry to the §3 standard + its §2 seed. Pass each: the `City` type schema, ONE exemplar entry, its distinct seed, and the "no shared phrasing across towns" rule.
- **A DOORWAY MERGE-GATE** — after the 8 drafts, run `.verify-unique.cjs` across **all 14** cities; any pair over the similarity threshold → send the offenders back for a rewrite. **Loop until all 14 pass** (the convergence gate).
- **A WIRING + VERIFY stage** — integrate, confirm auto-wiring, run the full verification, deploy.

## 5. DOORWAY GATE (HARD — non-negotiable)
- **`.verify-unique.cjs` passes across all 14 cities** (pairwise similarity below threshold) — regenerate any that don't.
- The type's compile-time clone check passes (a thin clone won't compile).
- Spot-read 2–3 new pages: does each tell a genuinely different local story (no city-swap feel)?

## 6. IMAGES — CONTENT-FIRST (town images are a FAST FOLLOW, per Joseph)
- **Do NOT generate the 8 unique town photos this pass.** Each new city's `heroImage.src` → a **VALID EXISTING roofing image** (reuse a shared one — do NOT reference a non-existent `/cities/{town}.jpg`, which would 404), with **UNIQUE per-town `alt`** (the alt is the SEO/a11y signal — make it town-specific).
- Document the **FOLLOW-UP:** generate `/public/cities/{morrisville,wake-forest,holly-springs,wendell,fuquay-varina,zebulon,rolesville,durham}.jpg` (8 unique town photos, soul_2 + vision-QA) + swap the `heroImage.src`. Separate batch — keeps slop-prone image gen out of this content pass's critical path.

## 7. WIRING (confirm auto-include; update any hardcoded list)
The new cities must appear in: **areaServed** schema (`lib/schema.ts` → RoofingContractor now **14** cities), the **sitemap** (+8 with lastmod), the **/service-areas hub** (`app/service-areas/page.tsx`), **Footer / Header / CrossLinks / related.ts**, and the per-service area links ("ServicesInCity"). Most should auto-iterate `CITIES` — **CONFIRM**, and update any HARDCODED list. **Unique title + meta** per town (keyword+geo, ≤60/≤155). The **GEOGRAPHY** block in `lib/site.config.ts` — add the new towns (+ handle Durham being Durham County, not Wake).

## 8. CONVERSION
City/location pages stay **QUIZ-FIRST** (retail/research intent — per WO_12; NOT call-first). The existing `CityPage` hero pattern applies unchanged.

## 9. PRESERVE (do NOT touch / regress)
The existing 6 city pages (raleigh/cary/knightdale/garner/clayton/apex — leave exactly as-is) · the `CityPage` component + the whole schema/conversion/SEO architecture · the WO_12 dual-intent · the WO_14 hero · NC compliance · the rounded prices. **Purely ADDITIVE** (8 cities.ts entries + auto-wiring) — no component redesign, no edits to the existing cities.

## 10. VERIFICATION
- `npm run build` green — all **8 new routes** prerender (SSG, 200).
- **`.verify-unique.cjs` passes across all 14** (the doorway gate) + the compile-time clone check.
- Playwright/axe **0-serious** on the new routes · the **6 existing cities unchanged** (no regression).
- **Sitemap +8** (lastmod) · **areaServed = 14** · unique title/meta per town · internal mesh includes all 8 (**no orphans** — each new city linked from the hub + footer + cross-links + service area-links, and links out to services/articles).
- Deployed-content check (the 8 live URLs serve their unique content) · deploy to `kingmaker-summit-oak-roofing.vercel.app` · **Joseph eyeballs 2–3 new towns** (the final gate).

## 11. OPERATING
Anti-doorway is THE standard — research-grounded, genuinely-unique, fully-built-out. Parallelize per town + converge on the uniqueness gate. ADDITIVE only — do not regress the existing 6 or any conversion/SEO. Capture your working method (the parallel-city-writer + doorway-gate workflow) to the vault — it's the reusable pattern for every future client's location pages + the eventual service×city matrix. Report the 8 new live URLs + the uniqueness-gate results + the wiring confirmation + verification evidence + the town-image follow-up note.

---
*Source: WE11 ultrathink synthesis, 2026-06-20. Target = Summit & Oak (confirmed). Cold/fresh builder + ultracode. Content-first (town images = fast follow). Corrections: Wendell/Rolesville spelling, Apex skipped (exists), Durham = Durham County. — WE11.*
