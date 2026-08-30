# OS68 ITEM 5 — DISPOSITION OF THE 316 MODULE-LEVEL LITERALS
### Census rows **R1 + C1** · WO `WO_OS68_MABREY_MAXWO_20260830.md` §5 item 5
### Run 2026-08-30 by the Sonnet builder seat. **READ-ONLY — zero code edits.**
### Roofing @ `8116226` · Construction @ `38bf696` (see DEVIATION 1)

---

## VERDICT SUMMARY — denominator first

| verdict | roofing | construction | total |
|---|---|---|---|
| `CONTENT` | 113 | 76 | **189** |
| `PRODUCT` | 29 | 20 | **49** |
| `COMPANY-CLAIM` | 42 | 35 | **77** |
| `BLOCKED-FACT` | 1 | 0 | **1** |
| **TOTAL** | **185** | **131** | **316** |

**Zero undispositioned.** 185 + 131 = 316 = the WO's stated population.

---

## THE QUESTION ASKED OF EACH LITERAL

> *Do this literal's entries assert anything about the **COMPANY** — tenure, volume,
> credentials, reviews, geography, dates?*

⚖️ **The grep gave the set; the reading gave the judgment.** `"70 year lifespan"` about
slate is a true sourced product fact. `"15+ Years"` about the company was a banned claim,
cut from ~180 live pages. Same regex, opposite verdicts. A company-claim screen was used to
**narrow what needed close reading — never to decide a verdict.** Every `COMPANY-CLAIM` and
every `BLOCKED-FACT` below was read line-by-line in source.

**Grain note:** the verdict is at the LITERAL grain and the question is existential — a
literal is `COMPANY-CLAIM` if **at least one** of its entries asserts something about the
company. This is why the long article arrays (`lib/articles/*`) verdict `COMPANY-CLAIM`
despite being overwhelmingly industry fact: each contains at least one first-person Mabrey
practice or capability claim.

---

## INSTRUMENT — reproduction, controls, reconciliation

**Command, from each repo root:**
```
node "C:/Users/josep/Claude Gravity/wo/probes/structured-literal-census.mjs" .
```

| repo | files | literals | string entries | positive control | negative control |
|---|---|---|---|---|---|
| mabrey-roofing | 199 | **185** | **9,592** | `HERO_CHIPS` re-derived from `Hero.tsx` by a second path — **FIRED** | sentinel absent — silent (correct) |
| mabrey-construction | 149 | **131** | **7,143** | `HERO_CHIPS` re-derived from the target repo's own `Hero.tsx` — **FIRED** | sentinel absent — silent (correct) |

Both match census rows R1 and C1 exactly, on both axes.

### 🔴 INSTRUMENT FINDING 1 — the `--json` records CANNOT reach 53 of the 316 literals

The probe's `--json` output emits one record per **string entry**. A literal with **zero**
string entries (`CASE_STUDIES: CaseStudy[] = []`, icon maps, numeric bounds, easing arrays)
produces no records and is **invisible in that output**. Grouping the JSON records by
`(file, name)` yields **161 roofing / 102 construction**, not 185 / 131.

**53 literals — 24 roofing + 29 construction, 16.8% of the population — would have been
silently dropped by a disposition driven off the JSON.** Several are exactly the
dormant-by-design surfaces item 7 cares about (`CASE_STUDIES`, `REAL_REVIEWS`,
`REAL_BEFORE_AFTER`, `GALLERY`, `VIDEO_TESTIMONIALS`, `SERVICE_CITY_COMBOS`).

**Resolution — not improvised:** the literal list was re-derived at literal grain by a second
enumerator reproducing the probe's own `DECL_RE` + `captureBalanced` path, emitting one row
per literal including zero-entry ones. It reconciles to **185 / 9,592** and **131 / 7,143** —
both the literal count and the entry count, on both repos, three independent runs.
⚖️ *A count that agrees on only one axis is not a reconciliation.*

### 🔴 INSTRUMENT FINDING 2 — the company-claim screen was ENGLISH-ONLY

The narrowing screen's patterns (`since YEAR`, `N years`, `licensed`, `reviews`, `rating`…)
are English. `app/es/content.ts` is a **Spanish rendered surface, 287 entries, 9 indexed
routes.** A Spanish pass (`reseñas`, `veterano`, `licencia`, `N años`, `garantía`) was run
separately and **found a company claim the English screen missed** — `ES_PAGES` line 188
asserts *"contratista general con licencia … de propiedad de un veterano"*.

⚖️ **A content screen inherits the language of whoever wrote it.** The Spanish surface was
inside the enumerator's universe but outside the screen's. Both defects on the /es surface
below were found by reading, not by the screen.

### EXCLUSION MANIFEST — reproduced verbatim, and it STAYS after any fix

- `node_modules/`, `.next/`, `.git/`, `out/`, `dist/` — build output and vendored code.
- `*.test.ts(x)`, `*.spec.ts(x)`, `tests/`, `__tests__/` — not rendered surface.
- **Roots outside `app/ components/ lib/`** — `scripts/`, `public/*.txt`, `*.json` data files.
- **Literals declared INSIDE a function body** (not module-level). A chip array declared in a
  component body is **NOT enumerated**. A real residue, not a covered case.
- **Template literals and computed/spread entries** are captured as RAW, not as strings.
- `public/llms.txt` / `llms-full.txt` are plain text, not literals — a separate AI-surface pass.
- **ADDED BY THIS PASS:** the screen that narrowed reading was English-only (finding 2); and
  `public/` binary content was never inspected on either repo (largest known gap, inherited).

---

## 🔴 COMPANY-CLAIM FINDINGS — REPORTED, NOT FIXED

**Zero code edits were made.** Per WO item 5: *a fix inside a disposition pass is how a sample
becomes an unbounded fix round.*

### 🔴🔴 F1 — FABRICATED RATING AND REVIEW COUNT ON THE INDEXED SPANISH SURFACE
**`app/es/content.ts:470` — `ES_TRUST_FACTS`**
```
{ label: "Reseñas", value: "4.9 ★ · 312 reseñas" }
```
- The WO §1 closed fact ledger: **`rating` / `reviewCount` = 4.8 / 22**, TRUE, dated
  PROBED-LIVE provenance in `lib/business.ts` (DataForSEO, cid 4184274825738242898).
- This literal hardcodes **4.9 stars and 312 reviews** — a **14× overstatement** of the count
  and a rating the business does not have.
- **It is live and reachable.** Consumed by `app/es/EsPageView.tsx:107`, rendered on `/es` and
  `/es/[slug]`; `ES_PAGES` feeds `app/sitemap.ts` and `lib/sitemap-registry.ts` — **9 indexed
  Spanish routes.**
- **No guard of any kind.** Contrast `lib/reviews.ts`, whose sample seeds are stripped from
  every production build by construction, and whose header comment explicitly says
  *"NEVER seed fabricated reviews here — FTC floor, client's name."*
- ⚖️ **Why every prior sweep missed it:** the tenure/claims sweeps excluded `es/` (recorded in
  the census exclusion manifest), and the structural screens were English. The exclusion and
  the language gap overlapped on the same file.

### 🔴 F2 — SPANISH BEFORE/AFTER CARRIES POSITIONAL PLACE CLAIMS (DORMANT)
**`app/es/content.ts:425` — `ES_BA_COPY`**
- Three entries assert specific job locations: `"North Hills, Raleigh"`, `"Preston, Cary"`,
  `"Creekside, Garner"`.
- **Internally contradictory:** entry 1's `city` is `"North Hills, Raleigh"` while its `alt`
  says *"una casa de North Hills en **Durham**, NC"*. North Hills is in Raleigh.
- **Dormant today:** `ES_BEFORE_AFTER = BEFORE_AFTER.map(...)` and `BEFORE_AFTER` is empty in
  production, so it renders nothing.
- 🔴 **The trap is the activation shape, not today's output:** the copy is zipped onto photos
  **by index**. The moment real photos land in `REAL_BEFORE_AFTER`, these three place claims
  attach positionally to whatever three photos arrive first. See
  `OS68_ACTIVATION_TRIGGERS.md` row A2. **Frame law: the caption converts the photo into an
  evidentiary place claim.**

### 🔴 F3 — CONSTRUCTION'S TRUSTBAR CONTRADICTS ITS OWN HONEST-ABSENCE CONTRACT (DORMANT)
**`mabrey-construction/components/TrustBar.tsx:56` — `LOCKUPS`**
- `lib/business.ts` sets `rating: 0`, `reviewCount: 0` and states in its header:
  *"No GBP exists for this entity yet — rating/reviewCount are 0 and **NOTHING renders them**
  until the profile is live."*
- `LOCKUPS` interpolates both **with no empty-guard**:
  `` `${BUSINESS.rating} ★ Google Rated` `` / `` `${BUSINESS.reviewCount} reviews` `` →
  would render **"0 ★ Google Rated · 0 reviews"**.
- **Dormant by accident, not by design: `TrustBar` has ZERO importers in the construction
  repo.** The file comment's claim is true only because nothing mounts the component.
- ⚖️ *An honest-absence contract enforced by non-use is not enforced.* Roofing's identical
  `LOCKUPS` is safe only because 4.8/22 are real numbers.

### F4 — `roofsInstalled: "500+"` — the single `BLOCKED-FACT`
**`mabrey-roofing/lib/business.ts:10` — `BUSINESS`** → verdict **`BLOCKED-FACT`**
- Carried per WO §1: *UNSOURCED — do not render newly, do not extend. Not in scope to fix here.*
- **Read for provenance, not fixed:** the in-file comment documents a real derivation — the
  per-city `N completed roofs` figures summed off prerendered output (durham 176, raleigh 114,
  cary 67 … = 569 → `"500+"`), and it self-declares its own weakness:
  *"UNVERIFIED: could not tell … whether 'completed roofs' is a full-replacement-only count or
  also includes repairs."*
- So the input figures are CRM-sourced but the **unit is undefined**. The claim is not
  fabricated; it is **unfalsifiable as stated**. That is why it stays `BLOCKED-FACT` rather
  than becoming `COMPANY-CLAIM (sourced)`.

### F5 — THE PER-CITY VOLUME CLAIMS ARE SOURCED (a NON-finding, recorded because it looked like one)
**`lib/cities.ts:57` — `CITIES`** and **`lib/locations.ts:237` — `SERVICE_CITY_COMBOS`**
- A raw grep showed apparently contradictory counts for the same city — raleigh `114` **and**
  `73`; durham `176` **and** `190`; burlington `26` **and** `50`.
- **The reading dissolved every one of them:**
  - `73` / `190` / `118` appear **only inside correction comments** documenting a previously
    fixed defect (all-jobs totals retired in favour of completed-only). The literal census
    correctly excludes comments; only the raw grep saw them.
  - `50` is an explicit **Alamance-cluster total** (Burlington 26 + Gibsonville + Whitsett +
    Graham + Elon) — a superset, not a contradiction.
- **Basis verified:** *production CRM jobs table, queried 2026-08-27*, recorded at
  `wo/OS65_COUNT_BASIS.json` — **confirmed present on disk.**
- ⚖️ Recorded because a grep-only pass would have reported three false claim-contradictions.
  **The instrument that found them is the same one that would have shipped them.**

### F6 — `"our crews"` renders on the roofing city pages
**`lib/cities.ts:57` — `CITIES`**, multiple entries, e.g. *"part of the smaller slice of Cary
calls **our crews** handle as a repair"*, *"routine work for **our crews**"*.
- Flagged against the standing floor **"client liability is not ours — never 'our crews.'"**
- Reported only; **not fixed** (out of item 5's scope, and the floor as written governs King
  Maker's own voice — whether it binds the client site's first-person copy is Joseph's call).

### F7 — CROSS-TRADE RESIDUE IN THE CONSTRUCTION REPO
Roofing content ships inside `mabrey-construction` with entry counts identical to the roofing
repo: `lib/articles/*` (BLOG_POSTS 254, MATERIALS_ARTICLES 387, REPLACEMENT_ARTICLES 362 …),
`lib/brands.ts` BRANDS 93 (GAF shingle systems), `lib/materials.ts` MATERIALS 737,
`lib/resources.ts` CLUSTERS (*"Roof Replacement"*), `lib/snippet-tables.ts` PERMITTING_TABLE
(*"Do you need a permit to replace a roof"*), `lib/related.ts` RELATED_MATERIALS /
RELATED_RESOURCES (roofing slugs), `components/seo/RoofAnatomyDiagram.tsx`.
**`"Mabrey Roofing"` appears 134 times across 29 files in the construction repo.**
- Reachability was **not** dispositioned here — that is item 6's population, and item 6 found
  construction publishes only 11 `page.tsx` routes. Most of this content has no route.
- Reported as a **discovery-queue row**, not fixed: it is a scope question (does the
  construction site intentionally carry the roofing library?), not a mechanical defect.

---

## FULL DISPOSITION — ALL 316 LITERALS

<!-- Every row carries a verdict and a one-line reason. Sorted by file within repo. -->
### MABREY-ROOFING — 185 literals

| # | file:line | literal | entries | verdict | reason |
|---|---|---|---|---|---|
| 1 | `app/about/page.tsx:22` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 2 | `app/about/page.tsx:27` | `STATS` | 5 | **PRODUCT** | Domain copy carrying rating/ownership; reading finds product/legal fact, no company assertion. |
| 3 | `app/about/page.tsx:33` | `VALUES` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 4 | `app/blog/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 5 | `app/brands/page.tsx:20` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 6 | `app/certifications/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 7 | `app/commercial-roofing/page.tsx:33` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 8 | `app/contact/page.tsx:19` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 9 | `app/es/content.ts:50` | `ES_NAV` | 18 | **CONTENT** | Spanish nav labels + hrefs. |
| 10 | `app/es/content.ts:62` | `ES_PAGES` | 238 | **COMPANY-CLAIM** | Spanish page copy asserts `contratista general con licencia` + `de propiedad de un veterano` + service geography (line 188). Missed by the English-only screen. |
| 11 | `app/es/content.ts:425` | `ES_BA_COPY` | 9 | **COMPANY-CLAIM** | Per-photo place claims (`North Hills, Raleigh`); alt text says `North Hills en Durham, NC` — internally contradictory. Dormant: zipped by index onto BEFORE_AFTER, which is empty in production. |
| 12 | `app/es/content.ts:443` | `ES_BA_LABELS` | 2 | **CONTENT** | `Antes`/`Después` UI labels. |
| 13 | `app/es/content.ts:446` | `ES_SECTION_PHOTOS` | 12 | **CONTENT** | Reused gallery photos with generic `del Triángulo` alt copy — no specific place or job claim. |
| 14 | `app/es/content.ts:470` | `ES_TRUST_FACTS` | 8 | **COMPANY-CLAIM** | 🔴 DEFECT — renders `4.9 ★ · 312 reseñas`; the ledger's PROBED-LIVE value is 4.8 / 22. Fabricated rating AND count (14x) on indexed /es pages. |
| 15 | `app/faq/page.tsx:20` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 16 | `app/financing/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 17 | `app/financing/page.tsx:26` | `HOOKS` | 6 | **PRODUCT** | Domain copy carrying duration; reading finds product/legal fact, no company assertion. |
| 18 | `app/financing/page.tsx:32` | `financeFaqs` | 8 | **COMPANY-CLAIM** | Brand-bearing copy — asserts something about the company. |
| 19 | `app/financing/payment-calculator/page.tsx:20` | `crumbs` | 6 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 20 | `app/financing/payment-calculator/page.tsx:26` | `payFaqs` | 8 | **COMPANY-CLAIM** | Brand-bearing copy — asserts something about the company. |
| 21 | `app/gallery/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 22 | `app/layout.tsx:34` | `metadata` | 16 | **COMPANY-CLAIM** | Root metadata asserts `veteran-owned`, Durham base, and Triangle service area. |
| 23 | `app/materials/page.tsx:24` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 24 | `app/page.tsx:30` | `PROOF_SPLIT` | 9 | **PRODUCT** | Domain copy carrying ownership; reading finds product/legal fact, no company assertion. |
| 25 | `app/page.tsx:36` | `SERVICES` | 54 | **PRODUCT** | Domain copy carrying warranty; reading finds product/legal fact, no company assertion. |
| 26 | `app/page.tsx:45` | `DIVISIONS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 27 | `app/page.tsx:47` | `HOME_GALLERY` | 10 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 28 | `app/page.tsx:55` | `STORM_STEPS` | 6 | **COMPANY-CLAIM** | First-person copy carrying credential assertions. |
| 29 | `app/page.tsx:61` | `NUMBERS` | 8 | **PRODUCT** | Domain copy carrying rating/credential; reading finds product/legal fact, no company assertion. |
| 30 | `app/page.tsx:68` | `FAQS` | 10 | **COMPANY-CLAIM** | Names Mabrey alongside credential/ownership/warranty assertions — a claim about the company, not the product. |
| 31 | `app/privacy-policy/page.tsx:16` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 32 | `app/projects/page.tsx:22` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 33 | `app/resources/glossary/page.tsx:22` | `crumbs` | 6 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 34 | `app/resources/page.tsx:22` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 35 | `app/resources/page.tsx:30` | `CLUSTER_CROSSLINK` | 14 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 36 | `app/review/page.tsx:14` | `metadata` | 3 | **COMPANY-CLAIM** | Brand-bearing page metadata soliciting Google reviews. |
| 37 | `app/review/page.tsx:26` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 38 | `app/reviews/page.tsx:22` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 39 | `app/roof-cost-calculator/page.tsx:20` | `crumbs` | 6 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 40 | `app/roof-cost-calculator/page.tsx:26` | `calcFaqs` | 8 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 41 | `app/roof-cost-calculator/page.tsx:45` | `howToUse` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 42 | `app/roofing-cost/page.tsx:32` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 43 | `app/roofing-cost/page.tsx:37` | `costFaqs` | 10 | **PRODUCT** | Industry/material fact set (duration) — lifespans, costs, warranties as product information, no company assertion. |
| 44 | `app/roofing-cost/page.tsx:47` | `QUICK_DRIVERS` | 6 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 45 | `app/roofing-cost/page.tsx:56` | `QUICK_STATS` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 46 | `app/roofing-cost/page.tsx:67` | `FACTOR_META` | 56 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 47 | `app/roofing-cost/page.tsx:113` | `REPAIR_REPLACE` | 24 | **PRODUCT** | Industry/material fact set (duration) — lifespans, costs, warranties as product information, no company assertion. |
| 48 | `app/service-areas/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 49 | `app/services/page.tsx:21` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 50 | `app/storm-damage/page.tsx:24` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 51 | `app/storm-damage/page.tsx:29` | `START_STEPS` | 9 | **COMPANY-CLAIM** | First-person copy carrying credential assertions. |
| 52 | `app/storm-damage/page.tsx:35` | `hubFaqs` | 6 | **PRODUCT** | Domain copy carrying warranty; reading finds product/legal fact, no company assertion. |
| 53 | `app/terms/page.tsx:15` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 54 | `app/warranty/page.tsx:21` | `crumbs` | 4 | **PRODUCT** | Domain copy carrying warranty; reading finds product/legal fact, no company assertion. |
| 55 | `components/booking/BookingFlow.tsx:39` | `FB` | 8 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 56 | `components/booking/SlotGrid.tsx:55` | `FB` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 57 | `components/booking/SlotGrid.tsx:64` | `pressable` | 5 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 58 | `components/booking/SlotGrid.tsx:86` | `MONTH_NAMES` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 59 | `components/booking/SlotGrid.tsx:94` | `MONTH_ABBR` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 60 | `components/CityPage.tsx:37` | `ORDER` | 42 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 61 | `components/ClaimSteps.tsx:24` | `STEP_ICONS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 62 | `components/CostTeaser.tsx:12` | `HERO_TILE` | 3 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 63 | `components/cta.tsx:17` | `pad` | 2 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 64 | `components/funnel/QuoteFunnel.tsx:32` | `FB` | 9 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 65 | `components/funnel/QuoteFunnel.tsx:205` | `DOOR_ARMS` | 5 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 66 | `components/Header.tsx:17` | `navGroups` | 25 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 67 | `components/Hero.tsx:15` | `HERO_CHIPS` | 3 | **COMPANY-CLAIM** | `Veteran-Owned`, `Licensed NC GC` — the exact literal class that carried the banned `15+ Years` chip. |
| 68 | `components/InsuranceBand.tsx:20` | `CLAIM_STEPS` | 16 | **COMPANY-CLAIM** | First-person copy carrying credential assertions. |
| 69 | `components/location/CityBoards.tsx:130` | `STORM_POINTS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 70 | `components/location/ComboPage.tsx:40` | `MONTHS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 71 | `components/motion.tsx:52` | `ENTER_EASE` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 72 | `components/motion.tsx:312` | `parentVariants` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 73 | `components/motion.tsx:316` | `itemVariants` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 74 | `components/Process.tsx:10` | `STEPS` | 15 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 75 | `components/SecondaryEstimate.tsx:18` | `POINTS` | 3 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 76 | `components/seo/RoofAnatomyDiagram.tsx:11` | `PART_FOR_SLUG` | 21 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 77 | `components/service/CatalogCrossLinks.tsx:30` | `CARDS` | 5 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 78 | `components/service/RelatedBoards.tsx:22` | `SERVICE_ICONS` | 8 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 79 | `components/service/RelatedBoards.tsx:30` | `RELATED_META` | 48 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 80 | `components/service/ServiceContentCards.tsx:28` | `ICONS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 81 | `components/ServiceCards.tsx:40` | `SERVICE_STAT` | 20 | **PRODUCT** | Industry/material fact set (warranty/duration) — lifespans, costs, warranties as product information, no company assertion. |
| 82 | `components/StormBand.tsx:15` | `POINTS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 83 | `components/tools/RoofCostCalculator.tsx:29` | `STORIES` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 84 | `components/TrustBar.tsx:56` | `LOCKUPS` | 12 | **COMPANY-CLAIM** | `Licensed & Insured`, `Veteran-Owned`, `GAF Systems`, plus rating/reviewCount interpolated from BUSINESS (derived, not hardcoded). |
| 85 | `lib/articles/blog-posts.ts:7` | `BLOG_POSTS` | 254 | **COMPANY-CLAIM** | Contains first-person Mabrey practice claims (`Our owner explains why Mabrey Roofing never roofs over old shingles`), not only industry fact. |
| 86 | `lib/articles/cost.ts:3` | `COST_ARTICLES` | 233 | **COMPANY-CLAIM** | Names Mabrey alongside duration/decades/warranty assertions — a claim about the company, not the product. |
| 87 | `lib/articles/decision.ts:5` | `DECISION_ARTICLES` | 261 | **COMPANY-CLAIM** | Names Mabrey alongside duration/rating/award assertions — a claim about the company, not the product. |
| 88 | `lib/articles/glossary.ts:7` | `GLOSSARY_TERMS` | 405 | **COMPANY-CLAIM** | First-person copy carrying credential/rating/geography-claim assertions. |
| 89 | `lib/articles/insurance.ts:3` | `INSURANCE_ARTICLES` | 210 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 90 | `lib/articles/local.ts:7` | `LOCAL_ARTICLES` | 297 | **COMPANY-CLAIM** | Names Mabrey alongside credential/decades/rating/duration/award assertions — a claim about the company, not the product. |
| 91 | `lib/articles/materials.ts:6` | `MATERIALS_ARTICLES` | 387 | **COMPANY-CLAIM** | Names Mabrey alongside decades/duration/rating/warranty/credential/award/review-count assertions — a claim about the company, not the product. |
| 92 | `lib/articles/replacement.ts:6` | `REPLACEMENT_ARTICLES` | 362 | **COMPANY-CLAIM** | Names Mabrey alongside duration/warranty/credential/rating assertions — a claim about the company, not the product. |
| 93 | `lib/articles/storm-insurance-plus.ts:7` | `STORM_INSURANCE_PLUS_ARTICLES` | 293 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 94 | `lib/articles/storm.ts:6` | `STORM_ARTICLES` | 179 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 95 | `lib/attribution.ts:57` | `CAP` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 96 | `lib/blog.ts:15` | `BLOG_POSTS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 97 | `lib/brands.ts:32` | `BRANDS` | 93 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 98 | `lib/business.ts:10` | `BUSINESS` | 26 | **BLOCKED-FACT** | Carries `roofsInstalled: "500+"` — §1 ledger: UNSOURCED, do not render newly, do not extend. rating 4.8 / reviewCount 22 are PROBED-LIVE and sourced in-file; `license` is Joseph-decided. |
| 99 | `lib/business.ts:107` | `OWNER` | 5 | **COMPANY-CLAIM** | Sean's bio — Navy service, ICU nursing, `Veteran-Owned · Licensed NC General Contractor`. Biographical, sourced to the owner. |
| 100 | `lib/cities.ts:57` | `CITIES` | 850 | **COMPANY-CLAIM** | Per-city `N completed roofs` volume claims + `our crews`. SOURCED: production CRM jobs table, queried 2026-08-27, basis recorded in wo/OS65_COUNT_BASIS.json (verified present). |
| 101 | `lib/cities.ts:2080` | `CITY_COORDS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 102 | `lib/commercial.ts:16` | `COMMERCIAL_HUB` | 7 | **COMPANY-CLAIM** | Names Mabrey alongside decades assertions — a claim about the company, not the product. |
| 103 | `lib/commercial.ts:30` | `COMMERCIAL_SYSTEMS` | 121 | **COMPANY-CLAIM** | Names Mabrey alongside duration/decades/warranty assertions — a claim about the company, not the product. |
| 104 | `lib/commercial.ts:177` | `COMMERCIAL_SERVICES_OFFERED` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 105 | `lib/commercial.ts:186` | `COMMERCIAL_PROPERTY_TYPES` | 7 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 106 | `lib/commercial.ts:196` | `COMMERCIAL_FAQS` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 107 | `lib/commercial.ts:204` | `COMMERCIAL_STATS` | 12 | **PRODUCT** | Industry/material fact set (duration/warranty) — lifespans, costs, warranties as product information, no company assertion. |
| 108 | `lib/commercial.ts:217` | `COMMERCIAL_DEPTH` | 61 | **PRODUCT** | Industry/material fact set (warranty) — lifespans, costs, warranties as product information, no company assertion. |
| 109 | `lib/costData.ts:11` | `COST_HEADLINE` | 6 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 110 | `lib/costData.ts:25` | `COST_BY_SIZE` | 15 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 111 | `lib/costData.ts:34` | `COST_BY_MATERIAL` | 28 | **PRODUCT** | Industry/material fact set (duration) — lifespans, costs, warranties as product information, no company assertion. |
| 112 | `lib/costData.ts:78` | `COST_FACTORS` | 16 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 113 | `lib/faqs.ts:9` | `FAQ_GROUPS` | 28 | **COMPANY-CLAIM** | Names Mabrey alongside warranty/credential assertions — a claim about the company, not the product. |
| 114 | `lib/finance.ts:39` | `APR_TIERS` | 10 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 115 | `lib/finance.ts:47` | `TERMS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 116 | `lib/finance.ts:49` | `COST_PRESETS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 117 | `lib/finance.ts:56` | `DOWN_PRESETS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 118 | `lib/finance.ts:58` | `CALC_DEFAULTS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 119 | `lib/funnel-telemetry.ts:67` | `queue` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 120 | `lib/funnel.ts:37` | `COST_MATERIALS` | 20 | **PRODUCT** | Industry/material fact set (duration) — lifespans, costs, warranties as product information, no company assertion. |
| 121 | `lib/funnel.ts:45` | `PITCH_FACTORS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 122 | `lib/funnel.ts:53` | `CALC_BOUNDS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 123 | `lib/funnel.ts:55` | `PITCH_OPTIONS` | 9 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 124 | `lib/funnel.ts:102` | `QUIZ_SITUATIONS` | 16 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 125 | `lib/funnel.ts:112` | `QUIZ_STEPS` | 9 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 126 | `lib/funnel.ts:118` | `QUIZ_VARIANTS` | 10 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 127 | `lib/gallery.ts:20` | `SAMPLE_BEFORE_AFTER` | 15 | **CONTENT** | `SAMPLE` -prefixed placeholder copy, production-stripped by the same NODE_ENV spread as reviews. |
| 128 | `lib/gallery.ts:44` | `REAL_BEFORE_AFTER` | 0 | **CONTENT** | `[]` empty-by-design. |
| 129 | `lib/gallery.ts:46` | `BEFORE_AFTER` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 130 | `lib/gallery.ts:61` | `GALLERY` | 0 | **CONTENT** | `[]` empty-by-design — no real project photos yet. |
| 131 | `lib/leadSchema.ts:171` | `UTM_SNAKE_TO_CAMEL` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 132 | `lib/legacy-url-rules.ts:43` | `LEGACY_301` | 7 | **CONTENT** | 301 rule table — all 7 destinations verified to resolve to real routes (item 6). |
| 133 | `lib/legacy-url-rules.ts:62` | `LEGACY_SLUGS` | 6 | **CONTENT** | Hack-spam residue slugs to 410. Not company copy. |
| 134 | `lib/legacy-url-rules.ts:171` | `KEYWORD_FAMILY` | 26 | **CONTENT** | Gambling-spam keyword family for the 410 matcher. |
| 135 | `lib/legacy-url-rules.ts:182` | `SPAM_410` | 0 | **CONTENT** | Composed at module load from the slug/keyword sources; zero literal strings. |
| 136 | `lib/legacy-url-rules.ts:211` | `WP_QUERY_KEYS` | 6 | **CONTENT** | WordPress permalink query keys for the root-410 rule. |
| 137 | `lib/locations.ts:237` | `SERVICE_CITY_COMBOS` | 1338 | **COMPANY-CLAIM** | Combo-page copy repeats the per-city completed-roof counts and first-person capability claims; same CRM basis as CITIES. |
| 138 | `lib/materials.ts:16` | `MATERIALS` | 737 | **COMPANY-CLAIM** | Names Mabrey alongside duration/rating/credential/decades/warranty/award/review-count assertions — a claim about the company, not the product. |
| 139 | `lib/materials.ts:786` | `MATERIAL_NAV_LABELS` | 2 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 140 | `lib/materials.ts:798` | `MATERIAL_HIGHLIGHTS` | 36 | **PRODUCT** | Industry/material fact set (duration/rating) — lifespans, costs, warranties as product information, no company assertion. |
| 141 | `lib/quote-funnel.ts:60` | `QUOTE_STEPS` | 34 | **PRODUCT** | Domain copy carrying duration; reading finds product/legal fact, no company assertion. |
| 142 | `lib/related.ts:14` | `RELATED_SERVICES` | 40 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 143 | `lib/related.ts:88` | `RELATED_MATERIALS` | 25 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 144 | `lib/related.ts:115` | `RELATED_RESOURCES` | 46 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 145 | `lib/resources.ts:55` | `ARTICLES` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 146 | `lib/resources.ts:85` | `CLUSTERS` | 21 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 147 | `lib/resources.ts:121` | `MONEY_LINK_LABELS` | 52 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 148 | `lib/reviews.ts:29` | `SAMPLE_REVIEWS` | 18 | **CONTENT** | Dev-only seeds: `date: "SAMPLE"` renders visibly and the production spread drops them by construction — a deploy cannot ship them. |
| 149 | `lib/reviews.ts:59` | `REAL_REVIEWS` | 0 | **CONTENT** | `[]` empty-by-design pending Sean's GBP intake. |
| 150 | `lib/reviews.ts:61` | `REVIEWS` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 151 | `lib/reviews.ts:69` | `RATING_DISTRIBUTION` | 0 | **CONTENT** | `[]` empty-by-design — never seed a fabricated distribution. |
| 152 | `lib/schema.ts:239` | `REPLACEMENT_PRICE_RANGE` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 153 | `lib/security.ts:20` | `GA_SCRIPT` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 154 | `lib/security.ts:21` | `GA_CONNECT` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 155 | `lib/security.ts:42` | `META_SCRIPT` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 156 | `lib/security.ts:43` | `META_CONNECT` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 157 | `lib/service-boards.ts:26` | `SERVICE_BOARDS` | 388 | **COMPANY-CLAIM** | First-person copy carrying rating assertions. |
| 158 | `lib/services.ts:45` | `SERVICES` | 672 | **COMPANY-CLAIM** | Names Mabrey alongside duration/ownership/warranty/credential/decades/rating assertions — a claim about the company, not the product. |
| 159 | `lib/services.ts:785` | `SERVICE_HIGHLIGHTS` | 58 | **PRODUCT** | Domain copy carrying warranty/duration; reading finds product/legal fact, no company assertion. |
| 160 | `lib/services.ts:800` | `CORE_SERVICE_SLUGS` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 161 | `lib/services.ts:813` | `SERVICE_NAV_LABELS` | 2 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 162 | `lib/site.config.ts:9` | `SITE` | 5 | **COMPANY-CLAIM** | Brand identity strings for schema `@id` and OG. |
| 163 | `lib/site.config.ts:27` | `GEOGRAPHY` | 20 | **COMPANY-CLAIM** | Declares served geography: 17 Triangle city slugs + `the Triangle` metro. The 23-slug registry is the wider set; this is the Triangle subset. |
| 164 | `lib/site.config.ts:65` | `ANALYTICS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 165 | `lib/site.config.ts:84` | `SECURITY` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 166 | `lib/sitemap-registry.ts:50` | `core` | 31 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 167 | `lib/sitemap-registry.ts:70` | `wsA` | 10 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 168 | `lib/sitemap-registry.ts:82` | `wsB` | 5 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 169 | `lib/sitemap-registry.ts:97` | `wsC` | 13 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 170 | `lib/sitemap-registry.ts:108` | `wsD` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 171 | `lib/sitemap-registry.ts:118` | `wsE` | 10 | **PRODUCT** | Domain copy carrying warranty; reading finds product/legal fact, no company assertion. |
| 172 | `lib/snippet-tables.ts:4` | `LIFESPAN_TABLE` | 35 | **PRODUCT** | Industry/material fact set (duration/decades) — lifespans, costs, warranties as product information, no company assertion. |
| 173 | `lib/snippet-tables.ts:57` | `INSURANCE_CLAIM_TABLE` | 44 | **COMPANY-CLAIM** | Names Mabrey alongside credential assertions — a claim about the company, not the product. |
| 174 | `lib/snippet-tables.ts:119` | `PERMITTING_TABLE` | 36 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 175 | `lib/storm.ts:50` | `STORM_SUBPAGES` | 492 | **COMPANY-CLAIM** | First-person storm/insurance capability claims naming Mabrey. |
| 176 | `lib/storm.ts:579` | `STORM_HUB` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 177 | `lib/track.ts:37` | `META_STANDARD` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 178 | `lib/track.ts:109` | `EVENTS` | 24 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 179 | `lib/trust.ts:58` | `TEAM` | 3 | **COMPANY-CLAIM** | Names and credentials of the company's people. |
| 180 | `lib/trust.ts:86` | `CERTIFICATIONS` | 7 | **COMPANY-CLAIM** | Asserts the company's credentials/certifications. |
| 181 | `lib/trust.ts:111` | `WARRANTIES` | 18 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 182 | `lib/trust.ts:142` | `WARRANTY_FAQS` | 8 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 183 | `lib/trust.ts:171` | `CASE_STUDIES` | 0 | **CONTENT** | `[]` empty-by-design (real-or-absent law). Dormant — see OS68_ACTIVATION_TRIGGERS.md row A1. |
| 184 | `lib/trust.ts:196` | `VIDEO_TESTIMONIALS` | 0 | **CONTENT** | `[]` empty-by-design, real-or-absent law. |
| 185 | `lib/videos.ts:49` | `SITE_VIDEOS` | 7 | **COMPANY-CLAIM** | `Meet Sean Mabrey` — owner identity video. Note `/video/sean-intro-temp.mp4` is a temp asset name. |

### MABREY-CONSTRUCTION — 131 literals

| # | file:line | literal | entries | verdict | reason |
|---|---|---|---|---|---|
| 1 | `app/about/page.tsx:30` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 2 | `app/about/page.tsx:35` | `STATS` | 8 | **PRODUCT** | Domain copy carrying ownership/credential; reading finds product/legal fact, no company assertion. |
| 3 | `app/about/page.tsx:42` | `VALUES` | 6 | **COMPANY-CLAIM** | First-person copy carrying geography-claim assertions. |
| 4 | `app/api/lead/route.ts:30` | `OK` | 0 | **CONTENT** | Zero string entries — response-shape constant on the money path. |
| 5 | `app/contact/page.tsx:19` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 6 | `app/faq/page.tsx:10` | `GENERAL` | 8 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 7 | `app/faq/page.tsx:17` | `PROCESS` | 6 | **COMPANY-CLAIM** | First-person copy carrying first-person-company assertions. |
| 8 | `app/faq/page.tsx:23` | `HOMES` | 6 | **COMPANY-CLAIM** | First-person copy carrying first-person-company assertions. |
| 9 | `app/faq/page.tsx:29` | `ALL` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 10 | `app/financing/page.tsx:12` | `FAQS` | 4 | **COMPANY-CLAIM** | Brand-bearing copy — asserts something about the company. |
| 11 | `app/layout.tsx:32` | `metadata` | 7 | **COMPANY-CLAIM** | Names Mabrey alongside ownership/credential assertions — a claim about the company, not the product. |
| 12 | `app/page.tsx:29` | `PROOF_SPLIT` | 9 | **PRODUCT** | Domain copy carrying ownership; reading finds product/legal fact, no company assertion. |
| 13 | `app/page.tsx:35` | `SERVICES` | 27 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 14 | `app/page.tsx:41` | `LAND_CHIPS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 15 | `app/page.tsx:43` | `HOME_GALLERY` | 10 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 16 | `app/page.tsx:51` | `PROCESS_PHASES` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 17 | `app/page.tsx:57` | `NUMBERS` | 8 | **PRODUCT** | Domain copy carrying credential; reading finds product/legal fact, no company assertion. |
| 18 | `app/page.tsx:64` | `FAQS` | 10 | **COMPANY-CLAIM** | Names Mabrey alongside ownership assertions — a claim about the company, not the product. |
| 19 | `app/privacy-policy/page.tsx:16` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 20 | `app/process/page.tsx:14` | `STEPS` | 28 | **PRODUCT** | Domain copy carrying warranty; reading finds product/legal fact, no company assertion. |
| 21 | `app/process/page.tsx:24` | `FAQS` | 6 | **COMPANY-CLAIM** | First-person copy carrying first-person-company assertions. |
| 22 | `app/services/page.tsx:19` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 23 | `app/terms/page.tsx:15` | `crumbs` | 4 | **CONTENT** | Breadcrumb labels + hrefs — navigation, asserts nothing. |
| 24 | `components/boards.tsx:29` | `ICONS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 25 | `components/CityPage.tsx:37` | `ORDER` | 42 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 26 | `components/ClaimSteps.tsx:24` | `STEP_ICONS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 27 | `components/CostTeaser.tsx:10` | `HERO_TILE` | 3 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 28 | `components/cta.tsx:17` | `pad` | 2 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 29 | `components/Header.tsx:18` | `COMPANY_LINKS` | 8 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 30 | `components/Hero.tsx:18` | `HERO_CHIPS` | 3 | **COMPANY-CLAIM** | `Veteran-Owned`, `Licensed NC GC`, `Fixed-Scope Contracts`. |
| 31 | `components/InsuranceBand.tsx:20` | `CLAIM_STEPS` | 16 | **COMPANY-CLAIM** | First-person copy carrying credential assertions. |
| 32 | `components/location/CityBoards.tsx:130` | `STORM_POINTS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 33 | `components/location/ComboPage.tsx:28` | `MONTHS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 34 | `components/location/ComboPage.tsx:32` | `SERVICE_PHOTO` | 7 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 35 | `components/motion.tsx:52` | `ENTER_EASE` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 36 | `components/motion.tsx:312` | `parentVariants` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 37 | `components/motion.tsx:316` | `itemVariants` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 38 | `components/Process.tsx:10` | `STEPS` | 15 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 39 | `components/SecondaryEstimate.tsx:18` | `POINTS` | 3 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 40 | `components/seo/RoofAnatomyDiagram.tsx:11` | `PART_FOR_SLUG` | 21 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 41 | `components/service/CatalogCrossLinks.tsx:30` | `CARDS` | 5 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 42 | `components/service/RelatedBoards.tsx:22` | `SERVICE_ICONS` | 13 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 43 | `components/service/RelatedBoards.tsx:32` | `RELATED_META` | 78 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 44 | `components/service/ServiceContentCards.tsx:28` | `ICONS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 45 | `components/ServiceCards.tsx:46` | `SERVICE_STAT` | 26 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 46 | `components/StormBand.tsx:15` | `POINTS` | 12 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 47 | `components/tools/RoofCostCalculator.tsx:29` | `STORIES` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 48 | `components/TrustBar.tsx:56` | `LOCKUPS` | 12 | **COMPANY-CLAIM** | 🔴 Would render `0 ★ Google Rated · 0 reviews` — no empty-guard, unlike the honest-absence contract stated in lib/business.ts. DORMANT: zero importers today. |
| 49 | `lib/articles/blog-posts.ts:7` | `BLOG_POSTS` | 254 | **COMPANY-CLAIM** | Roofing-lane article set carrying first-person Mabrey practice claims, shipped inside the CONSTRUCTION repo. |
| 50 | `lib/articles/cost.ts:3` | `COST_ARTICLES` | 233 | **COMPANY-CLAIM** | Names Mabrey alongside duration/decades/warranty assertions — a claim about the company, not the product. |
| 51 | `lib/articles/decision.ts:5` | `DECISION_ARTICLES` | 261 | **COMPANY-CLAIM** | Names Mabrey alongside duration/rating/award assertions — a claim about the company, not the product. |
| 52 | `lib/articles/glossary.ts:7` | `GLOSSARY_TERMS` | 100 | **PRODUCT** | Industry/material fact set (decades/credential/rating/warranty) — lifespans, costs, warranties as product information, no company assertion. |
| 53 | `lib/articles/insurance.ts:3` | `INSURANCE_ARTICLES` | 210 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 54 | `lib/articles/local.ts:7` | `LOCAL_ARTICLES` | 297 | **COMPANY-CLAIM** | Names Mabrey alongside credential/decades/rating/duration/award assertions — a claim about the company, not the product. |
| 55 | `lib/articles/materials.ts:6` | `MATERIALS_ARTICLES` | 387 | **COMPANY-CLAIM** | Names Mabrey alongside decades/duration/rating/warranty/credential/award/review-count assertions — a claim about the company, not the product. |
| 56 | `lib/articles/replacement.ts:6` | `REPLACEMENT_ARTICLES` | 362 | **COMPANY-CLAIM** | Names Mabrey alongside duration/warranty/credential/rating assertions — a claim about the company, not the product. |
| 57 | `lib/articles/storm-insurance-plus.ts:7` | `STORM_INSURANCE_PLUS_ARTICLES` | 293 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 58 | `lib/articles/storm.ts:6` | `STORM_ARTICLES` | 179 | **COMPANY-CLAIM** | Names Mabrey alongside credential/warranty assertions — a claim about the company, not the product. |
| 59 | `lib/blog.ts:15` | `BLOG_POSTS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 60 | `lib/brands.ts:32` | `BRANDS` | 93 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 61 | `lib/business.ts:10` | `BUSINESS` | 26 | **COMPANY-CLAIM** | `rating: 0` / `reviewCount: 0` are the honest absence branch; `license` is Joseph-decided; `stats` values are `—` placeholders. NOTE the file comment claims nothing renders them — see TrustBar row. |
| 62 | `lib/business.ts:58` | `OWNER` | 5 | **COMPANY-CLAIM** | Owner identity + credentials. |
| 63 | `lib/cities.ts:57` | `CITIES` | 512 | **COMPANY-CLAIM** | City copy with service-geography claims; construction carries NO per-city completed-job counts (unlike roofing). |
| 64 | `lib/cities.ts:712` | `CITY_COORDS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 65 | `lib/commercial.ts:16` | `COMMERCIAL_HUB` | 7 | **COMPANY-CLAIM** | Names Mabrey alongside decades assertions — a claim about the company, not the product. |
| 66 | `lib/commercial.ts:30` | `COMMERCIAL_SYSTEMS` | 121 | **COMPANY-CLAIM** | Names Mabrey alongside duration/decades/warranty assertions — a claim about the company, not the product. |
| 67 | `lib/commercial.ts:177` | `COMMERCIAL_SERVICES_OFFERED` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 68 | `lib/commercial.ts:186` | `COMMERCIAL_PROPERTY_TYPES` | 7 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 69 | `lib/commercial.ts:196` | `COMMERCIAL_FAQS` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 70 | `lib/commercial.ts:204` | `COMMERCIAL_STATS` | 12 | **PRODUCT** | Industry/material fact set (duration/warranty) — lifespans, costs, warranties as product information, no company assertion. |
| 71 | `lib/commercial.ts:217` | `COMMERCIAL_DEPTH` | 61 | **PRODUCT** | Industry/material fact set (warranty) — lifespans, costs, warranties as product information, no company assertion. |
| 72 | `lib/costData.ts:12` | `COST_HEADLINE` | 6 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 73 | `lib/costData.ts:22` | `COST_BY_SIZE` | 15 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 74 | `lib/costData.ts:31` | `COST_BY_MATERIAL` | 0 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 75 | `lib/costData.ts:35` | `COST_FACTORS` | 8 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 76 | `lib/faqs.ts:9` | `FAQ_GROUPS` | 28 | **COMPANY-CLAIM** | Names Mabrey alongside warranty/credential assertions — a claim about the company, not the product. |
| 77 | `lib/finance.ts:39` | `APR_TIERS` | 10 | **PRODUCT** | Industry/material fact set (no company signal) — lifespans, costs, warranties as product information, no company assertion. |
| 78 | `lib/finance.ts:47` | `TERMS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 79 | `lib/finance.ts:49` | `COST_PRESETS` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 80 | `lib/finance.ts:56` | `DOWN_PRESETS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 81 | `lib/finance.ts:58` | `CALC_DEFAULTS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 82 | `lib/funnel.ts:37` | `COST_MATERIALS` | 20 | **PRODUCT** | Industry/material fact set (duration) — lifespans, costs, warranties as product information, no company assertion. |
| 83 | `lib/funnel.ts:45` | `PITCH_FACTORS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 84 | `lib/funnel.ts:53` | `CALC_BOUNDS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 85 | `lib/funnel.ts:55` | `PITCH_OPTIONS` | 9 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 86 | `lib/funnel.ts:102` | `QUIZ_SITUATIONS` | 16 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 87 | `lib/funnel.ts:112` | `QUIZ_STEPS` | 9 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 88 | `lib/funnel.ts:118` | `QUIZ_VARIANTS` | 10 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 89 | `lib/gallery.ts:20` | `SAMPLE_BEFORE_AFTER` | 0 | **CONTENT** | `[]` — no sample seeds. |
| 90 | `lib/gallery.ts:22` | `REAL_BEFORE_AFTER` | 0 | **CONTENT** | `[]` empty-by-design. |
| 91 | `lib/gallery.ts:24` | `BEFORE_AFTER` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 92 | `lib/gallery.ts:39` | `GALLERY` | 0 | **CONTENT** | `[]` empty-by-design. |
| 93 | `lib/locations.ts:157` | `SERVICE_CITY_COMBOS` | 0 | **CONTENT** | `[]` empty-by-design — no location pages until the locations WO (anti-doorway). |
| 94 | `lib/materials.ts:16` | `MATERIALS` | 737 | **COMPANY-CLAIM** | Names Mabrey alongside duration/rating/credential/decades/warranty/award/review-count assertions — a claim about the company, not the product. |
| 95 | `lib/materials.ts:786` | `MATERIAL_NAV_LABELS` | 2 | **CONTENT** | 🔴 Cross-trade residue: metal-roofing nav label. |
| 96 | `lib/materials.ts:798` | `MATERIAL_HIGHLIGHTS` | 36 | **PRODUCT** | Industry/material fact set (duration/rating) — lifespans, costs, warranties as product information, no company assertion. |
| 97 | `lib/related.ts:16` | `RELATED_SERVICES` | 52 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 98 | `lib/related.ts:92` | `RELATED_MATERIALS` | 25 | **CONTENT** | 🔴 Cross-trade residue: roofing slugs (`roof-replacement`, `asphalt-shingles`) inside the construction repo. |
| 99 | `lib/related.ts:119` | `RELATED_RESOURCES` | 46 | **CONTENT** | 🔴 Cross-trade residue: roofing resource slugs inside the construction repo. |
| 100 | `lib/resources.ts:55` | `ARTICLES` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 101 | `lib/resources.ts:85` | `CLUSTERS` | 21 | **CONTENT** | 🔴 Cross-trade residue: `Roof Replacement` cluster copy inside the construction repo. |
| 102 | `lib/resources.ts:121` | `MONEY_LINK_LABELS` | 42 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 103 | `lib/reviews.ts:26` | `SAMPLE_REVIEWS` | 0 | **CONTENT** | `[]` — construction ships no sample seeds at all. |
| 104 | `lib/reviews.ts:28` | `REAL_REVIEWS` | 0 | **CONTENT** | `[]` — no GBP exists for this entity. |
| 105 | `lib/reviews.ts:30` | `REVIEWS` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 106 | `lib/reviews.ts:38` | `RATING_DISTRIBUTION` | 0 | **CONTENT** | `[]` empty-by-design. |
| 107 | `lib/schema.ts:248` | `REPLACEMENT_PRICE_RANGE` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 108 | `lib/security.ts:20` | `GA_SCRIPT` | 1 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 109 | `lib/security.ts:21` | `GA_CONNECT` | 4 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 110 | `lib/service-boards.ts:20` | `BOARD_SLUGS` | 13 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 111 | `lib/service-boards.ts:48` | `SERVICE_BOARDS` | 780 | **COMPANY-CLAIM** | First-person copy carrying credential/geography-claim assertions. |
| 112 | `lib/services.ts:45` | `SERVICES` | 988 | **COMPANY-CLAIM** | Names Mabrey alongside credential/decades/geography-claim/ownership assertions — a claim about the company, not the product. |
| 113 | `lib/services.ts:1421` | `SERVICE_HIGHLIGHTS` | 91 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 114 | `lib/services.ts:1438` | `CORE_SERVICE_SLUGS` | 6 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 115 | `lib/services.ts:1451` | `NAV_SERVICE_GROUPS` | 17 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 116 | `lib/services.ts:1460` | `SERVICE_NAV_LABELS` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 117 | `lib/site.config.ts:9` | `SITE` | 5 | **COMPANY-CLAIM** | Brand identity strings. |
| 118 | `lib/site.config.ts:26` | `GEOGRAPHY` | 20 | **COMPANY-CLAIM** | Declares served geography. |
| 119 | `lib/site.config.ts:51` | `ANALYTICS` | 3 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 120 | `lib/site.config.ts:69` | `SECURITY` | 0 | **CONTENT** | Zero string entries — structural/config literal (icons, easings, numeric bounds, or empty-by-design). |
| 121 | `lib/sitemap-registry.ts:28` | `SITEMAP_ENTRIES` | 46 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 122 | `lib/snippet-tables.ts:4` | `LIFESPAN_TABLE` | 35 | **PRODUCT** | Industry/material fact set (duration/decades) — lifespans, costs, warranties as product information, no company assertion. |
| 123 | `lib/snippet-tables.ts:57` | `INSURANCE_CLAIM_TABLE` | 44 | **COMPANY-CLAIM** | Names Mabrey alongside credential assertions — a claim about the company, not the product. |
| 124 | `lib/snippet-tables.ts:119` | `PERMITTING_TABLE` | 36 | **CONTENT** | 🔴 Cross-trade residue: `Do you need a permit to replace a roof` on a construction site. |
| 125 | `lib/track.ts:32` | `EVENTS` | 16 | **CONTENT** | UI/nav/config strings — asserts nothing about the company. |
| 126 | `lib/trust.ts:58` | `TEAM` | 3 | **PRODUCT** | Domain copy carrying credential; reading finds product/legal fact, no company assertion. |
| 127 | `lib/trust.ts:86` | `CERTIFICATIONS` | 8 | **COMPANY-CLAIM** | Names Mabrey alongside credential/ownership assertions — a claim about the company, not the product. |
| 128 | `lib/trust.ts:107` | `WARRANTIES` | 18 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 129 | `lib/trust.ts:138` | `WARRANTY_FAQS` | 8 | **COMPANY-CLAIM** | Names Mabrey alongside warranty assertions — a claim about the company, not the product. |
| 130 | `lib/trust.ts:167` | `CASE_STUDIES` | 0 | **CONTENT** | `[]` empty-by-design; CaseStudyCard also has zero importers here. |
| 131 | `lib/trust.ts:192` | `VIDEO_TESTIMONIALS` | 0 | **CONTENT** | `[]` empty-by-design. |

---

## WHAT THIS DISPOSITION STILL CANNOT SEE — stated, not hidden

- **Function-scoped literals.** Module-level only, by the probe's construction.
- **`public/` binary content** — never inspected on either repo. Largest known gap.
- **Whether a `COMPANY-CLAIM` literal is TRUE.** This pass answers *"does it assert something
  about the company"*, then reads the sourced ones for provenance. Verifying Sean's licence
  number, the CRM's definition of "completed", or the GBP aggregate against Google is an
  **external seat** — it rests on world knowledge this seat cannot reach.
- **Reachability of any literal.** A `COMPANY-CLAIM` in an unrouted file is still a claim in
  the repo but not on the internet. See `OS68_ROUTING_SURFACE_MANIFEST.md`.
