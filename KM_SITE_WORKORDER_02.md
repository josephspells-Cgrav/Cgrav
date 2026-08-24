# KING MAKER FIRM SITE — WORK ORDER 02

*The education-first contractor BUYER'S-GUIDE / resource platform. Architect: WE14 · 2026-06-25 · Builder: **ULTRACODE** (continues the `king-maker-site/` build — Phase 2). Lineage: KM_SITE WO_01 → **02**. This is the resolved design-direction + the Phase-2 build-out.*

> **This WO is the SINGLE SOURCE OF TRUTH.** It was synthesized from a 5-agent spec swarm (inventory · design · data-viz · IA · completeness-critic). The 4 companion docs at cg-main root carry the full detail — **`KM_SITE_WO02_{INVENTORY,DESIGN,DATAVIZ,IA,CRITIQUE}.md`** — but where any companion conflicts with §2 / §5 / §8 of THIS file, **this file wins** (the critic found real seams between the specs; §2 resolves them).

---

## 0. WHAT THIS IS · THE REFRAME · BUILDER MODE

- **Deliverable:** evolve the existing King Maker firm site (`C:/Users/josep/Claude Gravity/king-maker-site/`, live preview `https://kingmaker-firm.vercel.app`) into an **education-first resource / buyer's-guide platform for contractors** — a reference they actually USE. The premise running through everything: **"THIS is why you need an enterprise-grade website to hit your growth goals."** Educate broad, funnel narrow.
- 🔁 **THE REFRAME (load-bearing):** the enemy is the **generic 10-page BROCHURE site** — NOT GoHighLevel. GHL becomes ONE example of the brochure problem; the 143-site GHL audit stays as KM's strongest **measured sample** of that problem, reframed (not as "the villain"). De-center GHL end-to-end (§2 M1).
- 🎨 **DESIGN = PRACTICAL, NOT EDITORIAL.** It must look expensive but be utilitarian, scannable, dense-but-organized — **premium B2B documentation / data-journalism**, NOT a fashion-editorial spread. "Look really fucking good in a PRACTICAL sense." The chassis already satisfies this; the work is building the *library* inside it (§4).
- **Builder mode:** continues the existing `king-maker-site/` codebase (Next 16 SSG + Tailwind 4 + framer-motion). Design-skill-led. **The chassis is KEPT and reused** — do NOT restyle the look (§11). This is Phase 2 of WO_01 (which stopped at the mandatory design-direction checkpoint); Joseph's direction here IS the resolved checkpoint input, with a fresh mid-build checkpoint baked in (§12).
- **NOT:** a Summit & Oak clone (that's the homeowner-facing editorial conversion machine — this is the opposite axis, see §4.10), NOT a redesign of the brand or chassis, NOT a headless run.

---

## 1. THE PRINCIPLE / LENS — "THE SITE IS THE PROOF, BUILT AS A REFERENCE"

King Maker sells enterprise authority websites. So this site must BE one — and a contractor must be able to **audit it themselves** and find it immaculate. Two faces of the one lens:
- **Practical-premium documentation:** the visitor is a contractor who *returns to look things up*, scans for their answer, and audits the claims — so the site is a **scan → land → drill** reference, not an editorial walk-to-CTA. The data is the hero; charts and tables carry it, not photography.
- **Every claim verifiable, every number flagged:** the `FlagChip` (MEASURED / MODELED / ILLUSTRATIVE) on every taught stat is the differentiator AND the proof. The honesty discipline is the weapon — "audit my audit with any AI." The site passes its own no-orphan / CWV / schema / AI-legibility gates, live.

When a decision is ambiguous: pick the option that is **more practical, more scannable, more verifiable** — never the more editorial one.

---

## 2. ⭐ THE 8 MUST-NAIL DECISIONS (resolved + LOCKED — these override any companion-spec conflict)

**M1 · Resolve GHL→brochure ONCE, through the DATA LAYER.** The enemy = the generic 10-page brochure; GHL = one example; the 143-audit = a measured SAMPLE of the brochure problem (keep it — it's the strongest proof — reframe the framing). Edit in lockstep: `lib/claims.ts` (`ONE_LINE`, `STRUCTURAL_KILLER`, `MEASURED_GAPS` framing → "contractor brochure sites," not "GoHighLevel sells a $297 brochure"), `ProofBar`, `ProblemReframe`, `/work`, and Viz 3. If the data layer still says "GoHighLevel sells a $297/mo brochure," the reframe is fake.

**M2 · Lock the DUAL chapter systems — Playbook ≠ Guides.** `/playbook` = the **business-growth narrative** ($1M→$10M, the 10 chapters already named in `app/playbook/page.tsx`). `/guides` = the **website-mechanics buyer's guide** (the locked 13-section topic map). They CROSS-LINK, they do NOT merge. Override the inventory's "playbook IS the education platform" framing — pouring §2/§3/§6 mechanics content into chapter shells titled "The $1–2M Ceiling" is the failure mode.

**M3 · Publish ONE canonical component + route manifest BEFORE building (§5).** One route family = **`/guides/`** (strike every `/resources/` reference). One name per chart atom, one per resource atom, one mobile-nav pattern. Resolves the I2/I3/I7 collisions so the builder doesn't ship duplicate `LineChart`/`CompoundingCurve`/`BarCompare`.

**M4 · Push the honesty corrections into EVERY surface, especially Home (§8).** The data-viz pass found stats the other specs still carry stale. Use the corrected ledger in §8 everywhere — the home page must NOT ship a stat the §13 honesty page disowns.

**M5 · ONE page-count number = 147 (MEASURED, shipped roofing).** Fix `claims.ts` (`enterpriseUrls:141`, `enterprisePages:130`, REFERENCE_BUILD blurb) → **147**; every viz + trade page pulls from the constant, never hardcodes. Derive multiples from it (147 vs 10 ≈ "~15×"; state conservatively + flagged). Cross-component drift on the central proof stat is the most embarrassing possible failure for an "audit it yourself" site.

**M6 · Wire the funnel's ends.** `/api/lead` currently returns `{ok:true}` and drops every lead — **wire a real sink** (n8n webhook preferred — coordinate via the blackboard with `n8n-claude-architect-1`; Resend-email fallback) before any launch claim. `/audit` = scope **v1 = a static guided self-audit checklist** (no backend, ships now, = a tier-2 soft-capture) ; v2 = a real URL scanner, explicitly DEFERRED to a later WO.

**M7 · "Practical not editorial" is a BUILD GATE, and the chart catalog is RANKED (§6).** 18 viz is a lot. Build the high-MEASURED ones first (Viz 1, 14, 2, 6, 10, 3, 8); treat the showpiece-leaning ones (geo-grid heatmap V9, flywheel V13, channel quadrant A18) as OPTIONAL/last. Every chart must earn its place by teaching a topic-map section — takeaway-titled, direct-labeled, FlagChip'd, table-twin, left-aligned, gold = one takeaway. No chart ships to "look impressive."

**M8 · Every taught stat wears a FlagChip + ships an AI-legible TABLE TWIN — incl. conceptual diagrams.** The `<DataFigure>` shell (§6). The resource atoms (KeyTakeaway, ComparisonTable, DefinitionBlock) too. The site being machine-readable to every crawler/AI IS Exhibit A for what KM sells. Word-level heading reveals only (never per-letter — the AI-legibility law).

---

## 3. INFORMATION ARCHITECTURE (full detail: `KM_SITE_WO02_IA.md`)

**Top-level (header):** `/` Home (RESHAPE) · `/guides` (ADD — the keystone pillar hub) · `/playbook` (KEEP+build the 10 growth chapters) · `/work` (RESHAPE: reference build + per-trade proof) · `/system` (KEEP+extend: the OS + anti-doorway) · `/firm` (KEEP) · `/apply` (KEEP UI + WIRE).

**The `/guides` cluster (the 13-section topic map → 9 fundamental guides), all ADD** `/guides/[slug]`:
`enterprise-website-anatomy` (§2) · `why-a-brochure-cant-win` (§1+3) · `why-your-worse-competitor-ranks` (§4) · `how-google-picks-the-winner` (§5) · `the-gap-most-sites-have` (§6) · `organic-vs-paid` (§7) · `your-site-is-an-asset` (§8) · `what-good-content-gives-buyers` (§9) · `winning-the-ai-answer` (§10). Plus `/guides/the-honesty-layer` (§13). Plus `/guides/trades/[trade]` × 6 (roofing 147 · kitchen-bath 166 · hvac 165 · outdoor-living 296 · plumbing 300+ · painting 144) + a `/guides/trades` index.

**Supporting (ADD):** `/audit` (the interactive self-audit, v1 checklist — the conversion hinge) · `/glossary` (DefinitionBlock terms + `DefinedTerm`/`DefinedTermSet` schema — also entity/sameAs SEO).

**Page-count delta:** ~8 routes → ~36. The site's own depth becomes Exhibit A for the §12 "authority sites = 150–300 pages" claim.

**Nav:** header adds a **Guides ▾** dropdown (2 cols: Fundamentals + By Trade) + a **Playbook ▾**; two CTAs — **Audit Your Site** (ghost, the low-commitment researcher entry) + **Apply** (gold, BOFU). Footer → **4 columns** (The Guides · By Trade · The Firm · Engage) = the no-orphan static-HTML backstop. In-page: sticky left topic tree + sticky right "On This Page" scrollspy TOC + breadcrumb + prev/next pager + related-guides.

**Lead flow (value NEVER gated):** read (full guide, free) → tier-1 soft capture ("email me this guide as a PDF" — **1 field**, inline-delivered) → tier-2 **`/audit`** (the verify-it-yourself hinge) → tier-3 `/apply` (full BOFU form). Every guide ends `Audit Your Site` then `Apply` (low-commitment first).

**No-orphan (≤2 clicks, 3 redundant paths):** header dropdowns + 4-col footer + pillar/related mesh. **Self-test it as a build gate** — the site must pass the same no-orphan BFS it teaches.

---

## 4. THE DESIGN DIRECTION (full detail: `KM_SITE_WO02_DESIGN.md`)

**The one-line:** premium B2B documentation, not a magazine. Stripe-docs-crossed-with-an-FT-data-feature. Evolve the chassis; do not redesign.

1. **The defining move — a two-column reference shell** (the biggest practical-vs-editorial signal, currently absent): sticky **left topic tree** (~240–260px) + **main prose column max-width 720–760px** (~70–80ch, NOT the 1180px container for body) + sticky **right "On this page" TOC** (~200px, scrollspy + reading progress). **Data modules break full-bleed** to 1180px — prose is narrow, data is wide. Mobile: the right TOC collapses to ONE pattern — a sticky **"On this page ▾" dropdown** (NOT an accordion; pick one — resolves I7).
2. **Type (Archivo + Plus Jakarta — LOCKED):** lock a SHARED tight utilitarian scale (the per-component clamp drift is a bug). Display (Archivo) reserved for page **H1 + section H2 only**; H3+ and body = Plus Jakarta. Body **16px / line-height 1.6**. Display goes DOWN the page, not up — the home hero is the biggest type; interior library H1s are calm/smaller, NOT 7rem. Tabular numerals (`.km-tabular`) on every number; right-align numeric columns.
3. **Spacing:** adopt an explicit 4px token scale (`4/8/12/16/24/32/48/64/96`) — the build has none. Library pages run **denser** than marketing (`py-16/20` vs `py-24/32`) — add the mechanism (a `density` prop on `Section` or a `LibrarySection`; resolves I9). No whitespace-for-its-own-sake. **Left-align everything**; centered only on the home hero + final CTA.
4. **Color (LOCKED — gold scarce + flat, black 60–70% of every page):** the series-color law for all charts (§6) — gold = the KM/winning/"you" series (exactly ONE per chart = the takeaway); muted `#6b5a2e`/`gold-deep` = the "them/baseline" series; terracotta stays errors-only (never a chart color). Gold marks the ONE number to leave with.
5. **Component library — the bulk of new work:** `components/charts/` + `components/resource/` + `components/guide/` (§5 manifest). The data-journalism text kit on every chart (takeaway title, direct labels not legends, source + FlagChip).
6. **Motion:** restrained + functional. Keep word-level `TypeIn` (page H1s only) + the chart `DrawLine`/`CountUp`. **Demote the rest** — library prose/tables get a 150–250ms fade or nothing; NO staggered card cascades on reference pages. Extend the reduced-motion freeze to every new atom.
7. **Iconography:** ONE thin-stroke (~1.5px) square-corner line set (Lucide subset). Functional markers, not decoration. Gold reserved for the action/winning state.
8. **A NEW mono face (scarce):** a single monospace for technical tokens / `FlagChip` / schema+llms.txt snippets / inline `LocalBusiness`,`INP` tokens. ⚠️ This is a **deliberate brand-lock exception** (brand = 2 fonts) — defensible (it's the "site is the proof" technical voice) but **flagged for Joseph's veto** (§15). Mono is seasoning, never body.

**Anti-editorial guardrails (DON'Ts):** ❌ no giant hero whitespace canyons below the home hero · no oversized editorial display type on interior pages · no magazine pull-quotes-as-decoration (a `KeyTakeaway` is a labeled functional callout, not a blown-up sentence) · no centered-everything · no generic 3-card feature grids (parallel items → table or labeled list) · no rainbow charts · no gradients/glass/glow/blob mush · no staggered scroll theater · no "Figure 3"-style dead chart titles (every title states the conclusion).

---

## 5. ⭐ THE CANONICAL COMPONENT + ROUTE MANIFEST (build to THESE names — resolves I2/I3)

**Routes:** `/guides`, `/guides/[slug]`, `/guides/trades`, `/guides/trades/[trade]`, `/guides/the-honesty-layer`, `/playbook/[chapter]`, `/audit`, `/glossary`. **Strike `/resources/*` entirely.**

**Charts (`components/charts/`) — generalize `Dashboard.tsx`; each wrapped in `<DataFigure>`:**
| Component | Renders (viz #) |
|---|---|
| `CompoundingCurve` | V1 organic-vs-flat-paid · V4B amortized CPL crossover · A17 you-vs-frozen-competitor |
| `BarCompare` | V2 per-trade page-count · V4A CPL snapshot · V5 conversion bands |
| `GapStatWall` | V3 the gap wall (evolve `MEASURED_GAPS`) |
| `StackedShareBar` | V6 page-age top-10 |
| `LongTailCurve` | V10 query-surface |
| `MatrixGrid` | V8 service×location |
| `GeoGrid` | V9 geo heatmap (OPTIONAL) |
| `CWVGauge` | CWV/INP threshold meters |
| `JourneyTimeline` | V7 considered-buyer |
| `MechanismDiagram` | V12 site-wins-the-tie · V13 flywheel · A15 rented-vs-owned ledger · A18 quadrant (server-rendered, no SVG lib) |
| `EnterprisePageAnatomy` | A16 (REQUIRED — hero visual of `/guides/enterprise-website-anatomy`) |

**Resource atoms (`components/resource/`):** `KeyTakeaway` · `ComparisonTable` (generalize `SIDE_BY_SIDE`) · `DefinitionBlock` · `SpecBlock` (mono/code-like) · `StatBlock` (extract from `ProofBar`) · `ExpandableDetail` (`<details>`) · `PriceRangeCard` · `DebunkBlock` (myth → reality → why-it-persists, for §13) · `AntiDoorway` (real-job→page + the delete-the-city-name test, for §11).

**Guide atoms (`components/guide/`):** `StickyTOC` (scrollspy + mobile dropdown) · `GuideHero` (title + answer-first one-liner + read-time + "what you'll learn" + last-updated→`dateModified`) · `AnswerBlock` (answer-first H2 + Speakable) · `RelatedGuides` · `ChapterPager` · `Breadcrumbs` · `SoftCapture` (1-field).

**Shared infra:** `lib/chart.ts` (pure `scaleLinear`/`toPath`/`toBars`/`niceTicks` — no client JS for static charts) · `<DataFigure>` shell = `<figure>` + headline `<h3>` + SVG (`aria-hidden`) + `FlagChip` + `<details>` table/`<dl>`/`<ol>` twin + `<figcaption>` · extend `lib/claims.ts` with typed flag-carrying exports (`TRADE_PAGES`, `GAP_WALL`, `CHANNEL_CPL`, `CPL_CURVE`, `CONVERSION`, `AEO`, `PAGE_AGE`, `LONGTAIL`, `JOURNEY`, `TRADE_TABLE`) · `lib/guides.ts` (slug→title/§/blurb/related) · extend `lib/sitemap-registry.ts` + an `articleNode` per guide in the @graph.

---

## 6. THE DATA-VIZ CATALOG (full spec: `KM_SITE_WO02_DATAVIZ.md` — 14 core + 4 additional, each fully fleshed out)

**Build priority (M7):** **V1** (signature: compounding organic-vs-paid) → **V14** (trade page-count table) → **V2** (page-count bars) → **V6** (page-age) → **V10** (long-tail) → **V3** (gap wall) → **V8** (matrix) → **A16** (enterprise-page anatomy, REQUIRED) → then V4, V5, V7, V12, A15, A17 → **OPTIONAL/last:** V9 geo-grid, V13 flywheel, A18 quadrant.

**The lock (every viz):** hand-rolled SVG (NOT a charting lib — libs fight SSG + bury text in `<tspan>` soup AI can't read); the series-color law (§4.4); takeaway-title `<h3>` ABOVE the SVG (never baked into the image); direct labels not legends; one-shot motion `viewport once` + `useReducedMotionSafe`→static; **a real `<table>`/`<dl>`/`<ol>` twin per viz** (the AI-legibility law for charts); `FlagChip` on every figure. The signature V1 earns the most motion (paid draws flat-fast, organic draws slow→accelerating so divergence *feels* like compounding; crossover ~mo 12). Full per-viz data values + treatments are in the companion.

⚠️ **The geo-grid (V9):** the red→green ramp fights the gold/black brand — use a **single-hue gold-intensity ramp** (gold-deep buried → gold-bright winning) with rank numbers in-cell, square cells, and the **personalization caveat as visible on-screen text** ("shown from the *customer's* location, never the contractor's").

---

## 7. THE CONTENT (the 13-section topic map → the pages)

The topic map is locked (carried from the prior turn). Map: §1+3→`why-a-brochure-cant-win`; §2→`enterprise-website-anatomy` (hero viz = `EnterprisePageAnatomy` A16); §4→`why-your-worse-competitor-ranks`; §5→`how-google-picks-the-winner`; §6→`the-gap-most-sites-have`; §7→`organic-vs-paid`; §8→`your-site-is-an-asset`; §9→`what-good-content-gives-buyers`; §10→`winning-the-ai-answer`; §11→`/system` + `AntiDoorway`; §12→`/guides/trades/*`; §13→`/guides/the-honesty-layer`.

**Per-guide template (every cluster page):** breadcrumb · `GuideHero` (+ read-time + "what you'll learn" + last-updated) · sticky TOC · answer-first H2 (Speakable) · the de-hype/body (1,500–3,000w, scannable, a visual ~every 2 scroll-heights) · `KeyTakeaway` per section · one honesty callout · `RelatedGuides` + `ChapterPager` · `SoftCapture` + end CTA (`Audit` then `Apply`). Voice = Howard Roark (declarative, cause→effect, no hedge).

**The pillar `/guides`** = a real 3,000w+ document that is itself proof of pillar-cluster done right: premise (200w) → a ~150–250w answer-first summary block per topic-map section that LINKS DOWN to the full guide → the gap stat wall as centerpiece → the 6-trade strip → the honesty-layer teaser → embedded `/audit` mini-CTA → soft capture.

**Close the under-specced sections (critic G1/G2/G5/G6):**
- **§13 honesty page** = `DebunkBlock` × ~6: domain-age-is-a-ranking-factor · "DA score" · "E-E-A-T score" · "topical-authority score" · "nobody clicks ads" · "guaranteed #1" · llms.txt-as-magic · self-serving review stars. Each: myth → reality → why-it-persists → source. This is the credibility moat — give it a real page, not a footnote.
- **§9 buyer content** = REAL example content that demonstrates itself: a sample roofing **price-range table** (`PriceRangeCard`) + a shingle-vs-metal **`ComparisonTable`** + a "what to expect" timeline + financing/warranty/insurance explainer. ⚠️ **NC-insurance-compliant** copy (no $0-deductible / public-adjuster / guarantee-outcome language).
- **§11 anti-doorway** = a named `AntiDoorway` explainer (real-job→page + the delete-the-city-name test), on `/system` + each trade page (not a caption).
- **`/glossary`** = `DefinitionBlock` set (LocalBusiness, schema, CWV, INP, topical authority, grandfathering, AEO, hreflang, …) + `DefinedTerm`/`DefinedTermSet` schema.

**Home (RESHAPE, critic G8 — the most-seen surface):** keep the crest + "WE MAKE KINGS" brand moment + word-level TypeIn, but the framing leads with the **education premise + brochure-teardown** (a brochure DESCRIBES a business; an authority site IS a system), the gap stat wall relabeled "contractor sites" (not "143 GHL sites"), the query-surface contrast, the win-line (kept), a small 6-trade page-count strip, the OS moat (kept), verify-with-any-AI → now also routes to `/audit`, the selectivity close. **Replace the "143 GoHighLevel sites scrubbed" seal** with a brochure-framed proof seal. Dual CTA → **Read the Guides** + **Audit Your Site**. (Final hero copy = Roark voice, builder-drafted, flagged for Joseph's eyeball — §15.)

---

## 8. ⭐ THE HONESTY-CORRECTION LEDGER (use these EXACT framings everywhere — the data-viz pass caught the others carrying stale numbers)

- ❌ "60% of SMBs have no dedicated site" → ✅ **~27% no dedicated site** (Clutch 2025, MEASURED). Push into the Home gap wall + §6.
- ❌ "99.5% of AI citations come from top-10 organic" → ✅ reframe: **88% of AI-cited URLs do NOT rank top-10 — AI citation is its own surface you must structure for** (the brochure is invisible to it). (§10)
- ❌ "organic converts 2.4% vs paid 1.3%" (not cleanly sourceable, likely overstates organic) → ✅ **organic wins on cost + durable volume + trust, NOT a higher click-conversion rate**; lead with the sourced **"+27% conversions / +50% clicks when running both channels"**; if the paired bars appear, flag ILLUSTRATIVE + "directional, varies by intent." (§7, Viz 5)
- "~94-day research window" → flag **ILLUSTRATIVE**; anchor the MEASURED parts: **78% shortlist 3 vendors · 95% pick a Day-One shortlist name** (offer 272-day B2B journey as the defensible alt). (Viz 7)
- Page-age = **72.9%** of top-10 are 3+ yrs · avg #1 = **5 years** (MEASURED, clean). Long-tail = **95%** of queries ≤10 searches/mo · **96.55%** of pages get zero Google traffic (MEASURED).
- The map pack: **"authority organic wins the considered research; the map pack catches proximity; ads catch emergency."** NEVER "nobody clicks ads." Ranges not hype. The 143-GHL audit is a measured SAMPLE, not the villain. Audit the EXISTING home `SIDE_BY_SIDE` illustrative numbers too (the "2 jobs/month from a brochure" precise-but-unsourced claim → use ranges + ILLUSTRATIVE, or lead with the measured page/schema/CWV contrast instead).

---

## 9. LEAD CAPTURE · /audit · /api/lead

- **`/audit` v1** = a static **guided self-audit checklist** (no backend): the contractor walks their own site against ~10 enterprise criteria (schema? location pages? CWV? answer-first? AI-legible? no-orphan?), sees their gap score, and the result CTA = "this is what we fix → Apply." Doubles as the tier-2 soft capture (email the report). **v2** (real URL scanner — Lighthouse/schema probe) = a later WO, explicitly deferred.
- **`/api/lead`** = WIRE the dead `TODO(phase-2)` sink to a real destination (n8n webhook preferred — coordinate via the blackboard with `n8n-claude-architect-1`; Resend-email fallback). No launch claim while leads drop.
- **`/apply`** keeps the 7-field form (BOFU is fine to gate) + reframe the 3 qualifiers to education-first selectivity + add a "not ready? audit your site first →" light path so the funnel doesn't dead-end the not-yet-ready.

---

## 10. TECHNICAL-SEO-AS-PROOF + AI-LEGIBILITY (the site passes its own audit — own-the-standard)
SSG everywhere (content in static HTML) · **word-level heading reveals only** (never per-letter — the AI-legibility law; the heading-legibility spec is ported, keep it green) · the `@graph` schema spine extended (`articleNode` per guide, `DefinedTermSet` for the glossary, `Speakable` on answer blocks, breadcrumbs) · honest `llms.txt` (present — we ding sites for missing it) · fast CWV (LCP/INP/CLS budgets; charts are SSG, lazy below-fold, aspect-reserved) · **the no-orphan BFS self-test as a build gate** (the site must pass the reachability check it teaches). Every chart's table-twin keeps the data crawlable/AI-extractable.

## 11. PRESERVE-LIST (KEEP — do NOT restyle/regress)
🔒 The **chassis**: `app/globals.css` tokens, Archivo + Plus Jakarta, gold-scarce + flat, square corners, the `.km-*` primitives, `components/motion.tsx` (word-level `TypeIn`), `components/ui.tsx` (`FlagChip` + Button/Container/Section/Label), `PageHero`, `Header`/`Footer` shells, `Crest`, `lib/schema.ts`. 🔒 The **brand lock** (#ffb900/#0a0a0a, crest, the locked type, Roark voice) — the only deviation is the scoped mono face (§15, flagged). 🔒 The **honesty rails + FlagChip discipline** (§8). 🔒 The **AI-legibility law** (word-level headings, the green spec). 🔒 The **security layer** if present (don't clobber — `cyber-security-specialist-1` owns it). 🔒 **The "practical not editorial" constraint is already satisfied by the chassis** — build the library inside it, resist every pull back toward editorial.

## 12. BUILD PHASING (ultracode)
- **Phase 0 — manifest + content spine:** publish the §5 manifest, fix the data layer (M1 GHL→brochure, M5 →147, M4/§8 corrections in `claims.ts`), build `lib/chart.ts` + `<DataFigure>` + the shared type/spacing-token scale, scaffold the `/guides` route family + `lib/guides.ts`.
- **Phase 1 — the design-direction sample → 🛑 CHECKPOINT:** build the **two-column reference shell** + the RESHAPED **Home** + the **`/guides` pillar** + **ONE full sample guide** (`enterprise-website-anatomy`, with the `EnterprisePageAnatomy` A16 + V1 the signature chart) + the V1/V14/V2 charts. **Deploy + STOP for Joseph's eyeball** (the practical-premium direction + the reframe + the chart quality, before propagating to ~30 pages). Resume on his go.
- **Phase 2 — build-out:** the remaining 8 guides + 6 trade pages + the playbook chapters + §13 honesty + `/audit` v1 + `/glossary` + the rest of the chart catalog (priority order) + reshape `/work` + extend `/system` + wire `/api/lead`.
- **Phase 3 — verify + deploy + report.**

## 13. VERIFICATION GATES (all green before "done")
`tsc` 0 · `next build` all routes SSG · Playwright desktop+mobile **axe 0 serious/critical** · the **heading-legibility spec green** (word-level, N/N) · **no-orphan BFS ≤2-click self-test** (the site passes what it teaches) · CWV (LCP/INP/CLS budgets; charts lazy+aspect-reserved) · **every taught number traces to `claims.ts` with a FlagChip + a table-twin** (grep: no hardcoded page counts; no "GoHighLevel sells"; no "60% no site"; no "99.5%") · pixels vision pass (practical-premium, not editorial; gold-scarce held) · deployed-render check (content in static HTML, `/api/lead` hits a real sink).

## 14. CARRIED LOCKED DECISIONS (do not relitigate)
The KM brand (#ffb900/#0a0a0a, crest, Archivo+Jakarta, gold-scarce, square, Roark voice, dashboard-as-proof) · the site is the proof / own-the-standard / verify-it-yourself · AI-legibility = word-level headings · organic-over-mappack (organic = the engine; pack = proximity-capped byproduct; never "only 19%", never pivot a site-question to off-page) · content-first/practitioner-authority GTM · GHL-as-sample-not-villain · defensible-not-optimistic (promise the floor, project the ceiling) · NEVER SOC2/bank-level security claims · NC-insurance-compliant where relevant · Joseph's eyeball is the final gate (overrides a vision SHIP).

## 15. OPEN FLAGS FOR JOSEPH (resolved autonomously with defaults — veto any)
1. **Mono font** = a deliberate brand-lock exception (scoped to technical tokens). Default: ALLOW (it reinforces "the site is the proof"). Veto → use Jakarta for tokens.
2. **Home hero copy** — builder drafts the education-first premise headline in Roark voice (keeps "WE MAKE KINGS" + crest); flagged for your eyeball at the Phase-1 checkpoint.
3. **`/audit` v1 = checklist** (URL-scanner v2 deferred). Veto → scope v2 now (bigger).
4. **Page-count locked to 147**; the relevancy multiple stated conservatively (~15×, flagged). Set a different number if you prefer the round "~130/~150."

---
*— WE14, 2026-06-25. KM_SITE WO_02: turn the firm site into the education-first contractor buyer's-guide platform — practical-premium documentation, brochure-teardown (not GHL), every claim flagged + AI-legible, the site its own proof. Companions: `KM_SITE_WO02_{INVENTORY,DESIGN,DATAVIZ,IA,CRITIQUE}.md`. Builder = ultracode, continues `king-maker-site/`. Phase 0 manifest+data-layer → Phase 1 sample (Home+pillar+1 guide) → 🛑 Joseph checkpoint → build-out → verify → deploy → report. §2 (the 8 must-nails) overrides any companion conflict. Joseph's eyeball is the final gate.*
