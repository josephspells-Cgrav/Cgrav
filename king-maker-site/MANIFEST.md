# KM FIRM SITE — CANONICAL COMPONENT + ROUTE MANIFEST (WO_02 §5)

> Published BEFORE building (M3). Build to THESE names. Resolves the companion
> I2/I3/I7 collisions. The enemy is the generic 10-page **brochure** (M1), not
> GoHighLevel. One page-count = **147** (M5). Every taught stat = `FlagChip` +
> a `<table>` twin (M8). Word-level headings only.

## ROUTES (one family = `/guides/`; `/resources/*` is STRUCK)
- `/` (RESHAPE) · `/guides` (pillar hub) · `/guides/[slug]` · `/guides/trades` · `/guides/trades/[trade]` · `/guides/the-honesty-layer`
- `/playbook` (KEEP) · `/playbook/[chapter]` (Phase 2) · `/work` (RESHAPE) · `/system` (extend) · `/firm` (KEEP) · `/apply` (KEEP+wire)
- `/audit` (v1 checklist) · `/glossary` · `/privacy` · `/terms` · system (sitemap/robots/llms/404)

## CHARTS (`components/charts/`) — hand-rolled SVG, SSG, each wrapped in `<DataFigure>`
| Component | Renders (viz #) |
|---|---|
| `CompoundingCurve` | V1 organic-vs-flat-paid · V4B CPL crossover · A17 you-vs-frozen-competitor |
| `BarCompare` | V2 per-trade page-count · V4A CPL snapshot · V5 conversion bands |
| `GapStatWall` | V3 the gap wall (broad corrected stats) |
| `StackedShareBar` | V6 page-age top-10 |
| `LongTailCurve` | V10 query-surface |
| `MatrixGrid` | V8 service×location |
| `GeoGrid` | V9 geo heatmap (OPTIONAL/last — gold-intensity ramp) |
| `CWVGauge` | CWV/INP threshold meters |
| `JourneyTimeline` | V7 considered-buyer |
| `MechanismDiagram` | V12 site-wins-the-tie · V13 flywheel · A15 rented-vs-owned · A18 quadrant |
| `EnterprisePageAnatomy` | A16 (REQUIRED — hero of `/guides/enterprise-website-anatomy`) |

## RESOURCE ATOMS (`components/resource/`)
`KeyTakeaway` · `ComparisonTable` (generalize `SIDE_BY_SIDE`) · `DefinitionBlock` · `SpecBlock` (mono) · `StatBlock` (from `ProofBar`) · `ExpandableDetail` (`<details>`) · `PriceRangeCard` · `DebunkBlock` · `AntiDoorway`

## GUIDE ATOMS (`components/guide/`)
`StickyTOC` (scrollspy + mobile "On this page ▾" dropdown — NOT accordion) · `GuideHero` · `AnswerBlock` (answer-first H2 + Speakable) · `RelatedGuides` · `ChapterPager` · `Breadcrumbs` · `SoftCapture` (1-field) · `GuideLayout` (the two-column reference shell)

## SHARED INFRA
- `lib/chart.ts` — pure `scaleLinear`/`toPath`/`toBars`/`niceTicks` (no client JS for static charts)
- `<DataFigure>` (`components/charts/DataFigure.tsx`) — `<figure>` + headline `<h3>` + SVG (aria-hidden) + `FlagChip` + `<details>` table/`<dl>`/`<ol>` twin + `<figcaption>`
- `lib/claims.ts` — typed flag-carrying exports: `TRADE_PAGES`, `GAP_WALL`, `TRADE_TABLE`, `COMPOUNDING`, `CHANNEL_CPL`, `CPL_CURVE`, `CONVERSION`, `AEO`, `PAGE_AGE`, `LONGTAIL`, `JOURNEY`
- `lib/guides.ts` — slug → {title, section, blurb, related, readTime}
- `lib/sitemap-registry.ts` — extend · `articleNode` per guide in the @graph

## TYPE SCALE (shared, locked — fixes per-component clamp drift)
- Page H1 (interior, calm): `clamp(2rem, 4vw, 3rem)` Archivo · Home hero only: the big brand moment
- Section H2: `clamp(1.4rem, 2.4vw, 1.9rem)` Archivo · H3+ = Plus Jakarta 600, 18–20px
- Body 16px / line-height 1.6 · eyebrow 12–13px · `.km-tabular` on every number
- Display goes DOWN the page, never up. Mono = technical tokens only (scarce).

## SPACING SCALE (4px base): `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`
Library pages run denser (`py-16/20`) than marketing (`py-24/32`).

## SERIES-COLOR LAW (charts)
gold `#ffb900` = the ONE you/winning/authority series · muted `#6b5a2e` / `gold-deep #856709` = them/baseline · terracotta = errors ONLY (never a chart color) · gold marks the one takeaway.
