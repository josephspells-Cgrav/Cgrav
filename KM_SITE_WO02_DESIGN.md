I have comprehensive research across all required reference categories: high-end docs (Stripe/Vercel/Linear), data-journalism (FT/Burn-Murdoch, Datawrapper, Our World in Data), B2B resource centers/buyer guides, technical-documentation readability, and dense data-table UX. The signals converge cleanly and map directly to the locked KM brand and the existing build inventory. I'll synthesize the design direction now.

---

# KING MAKER FIRM SITE — PRACTICAL-PREMIUM DESIGN DIRECTION

The education-first resource/buyer's-guide platform, on the locked KM brand. Builder-actionable. This **evolves the existing build** (keep `globals.css` tokens, Archivo/Jakarta, gold-scarce, square corners, `.km-*` primitives, the `motion.tsx` layer, `FlagChip`, the Dashboard chart seed) — it does not redesign the look. It defines how to build the *library* inside the chassis.

## 0. THE ONE-LINE THESIS

**Premium B2B documentation, not a magazine.** Read like Stripe docs crossed with an FT data feature — expensive YET utilitarian, scannable in seconds, dense-but-organized, usable as a reference a contractor returns to. The research is unanimous on the dividing line: technical/reference design is **left-aligned, scannable, hierarchy-and-annotation-driven**; editorial design is **centered, image-led, pull-quote-decorated, whitespace-as-drama**. KM is the former. The site itself is the proof of what KM sells, so it must be measurably immaculate.

---

## 1. LAYOUT SYSTEM

**The defining move: a two-column reference shell, not a single centered column.** This is the single biggest practical-vs-editorial signal and the current build does not have it. Every resource/guide/playbook-chapter page gets:

- **Persistent left sidebar** (sticky, ~240–260px): section/topic tree for the doc family. Collapsible on the home/marketing pages, always-on inside the library. This is the Stripe/Vercel/Mintlify spine.
- **Main content column** — `max-width 720–760px` for prose (measure: ~70–80ch, the readability ceiling). NOT the current 1180px container for body text. The 1180px `Container` stays for marketing sections and full-bleed data modules.
- **Sticky right "On this page" TOC** (~200px): anchor links to every H2/H3, with a reading-progress indicator and active-section highlight. Desktop ≥1280px shows all three columns; below that the right TOC collapses into a sticky "On this page ▾" dropdown above the content.
- **Full-bleed escape hatch**: data modules (charts, big comparison tables, the gap-stat wall) break out of the 720px prose measure to the full 1180px (or edge-to-edge surface band) so graphs get room. Prose is narrow; data is wide.

**Grid.** 12-col on the content area for module composition; data tables and chart cards snap to it. NO centered hero-and-three-cards template repeated down the page.

**Density.** Tighter than the current `Section py-24/32`. Reference-grade pages use `py-16/20` between major sections and `py-10/12` between subsections. The home/marketing pages can keep the looser rhythm; the *library* pages run denser — a contractor is scanning, not being walked through a pitch.

**Content max-width discipline:** prose 720px · data modules up to 1180px · never let a paragraph run full-bleed (that's the wall-of-text failure the readability research names).

---

## 2. TYPE USAGE (Archivo display + Plus Jakarta Sans body — LOCKED, no new fonts)

The locked build sizes type per-component with `clamp()` and has NO oversized editorial type. Keep that discipline; codify a **shared utilitarian scale** so the library is consistent (the current per-component clamps drift). Vercel's Geist scale is the model — many tight steps, not three giant ones.

**Display (Archivo, 700, tracking −0.02em, line-height 1.0–1.05):** reserve for page H1 and section H2 *only*. 
- Page H1: `clamp(2rem, 4vw, 3rem)` — the hero "WE MAKE KINGS" treatment stays as the brand moment on home; **interior library pages get a calm, smaller H1**, not a 7rem display. No oversized editorial type below the home hero.
- Section H2: `clamp(1.4rem, 2.4vw, 1.9rem)`.

**Utilitarian (Plus Jakarta Sans) carries everything else** — this is the practical signal:
- H3 / subsection: 18–20px, weight 600, Jakarta (NOT Archivo — drop display weight as you go down the tree).
- Body: **16px** base (current 13–18.5px range is too variable — lock body to 16/16.5px, line-height 1.6). 15px for dense secondary blocks.
- Eyebrow/label: 12–13px, weight 600, letter-spacing +0.08em, uppercase, gold or muted.
- **Data/numeric: tabular (`.km-tabular` tnum) everywhere a number lives** — stat blocks, table cells, chart labels, axis ticks. Right-align numeric table columns.
- **Mono accent (NEW, small, scarce):** introduce a single monospace face (e.g. the system mono or a geist-mono-equivalent) ONLY for: spec/"code-like" blocks, the `FlagChip` evidence tags, schema/llms.txt snippets, and inline technical tokens (`LocalBusiness`, `INP`, `service × location`). This is the Vercel/Stripe "technical voice" cue and it reinforces "the site is the proof." Mono is a seasoning, never body copy.

**Rule:** display type goes DOWN the page, not up. The biggest type is the home hero; every interior heading is smaller and quieter. No pull-quote-sized type in the body. Headlines do the work through **weight and position**, not size.

---

## 3. SPACING / RHYTHM

Functional, not dramatic. The research line: editorial uses "always more space than you'd think"; reference design uses *consistent, controlled* space so scanning works.

- **Adopt an explicit spacing token scale** (the build has none — it's raw Tailwind utilities, which is why density drifts). Use a 4px base: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. Vertical rhythm snaps to it.
- Paragraph spacing: 16–20px between paragraphs, NOT 32px+ (that's editorial air).
- Section gaps in the library: 48–64px between H2 sections, 24–32px between subsections.
- **No whitespace-for-its-own-sake.** Every large gap must be doing a job (separating a data module from prose, marking a section boundary). Empty hero canyons are the anti-pattern.
- Left-aligned everything. The technical-writing research is explicit: centering disrupts white-space control and the scan flow. Centered text appears ONLY for the home hero and final CTA — never in library prose, never on a heading inside a guide.

---

## 4. COLOR DISCIPLINE (LOCKED — gold scarce + flat, black-dominant)

Already correct in the build; the new surface area must HOLD the discipline as content multiplies (the real risk: 40 new pages of charts each grabbing for gold).

- **Black/near-black carries 60–70% of every page.** Gold (#ffb900) is the action + the single most-important-number signal, never a fill, never a gradient, never a glow (one `.km-aura` per view, already enforced).
- **Build a flat semantic data ramp from the existing surfaces** — the charts need 2–4 distinguishable series without inventing new hues. Use: gold = the KM/winning/"authority" series; muted-warm `#b5a982`/`#a0926e` = the baseline/"brochure" series; a desaturated cool gray = neutral/axis/grid. Terracotta `#c25a3a` stays errors-only (do NOT use it as a chart color — it reads as alarm). This keeps charts on-brand and avoids rainbow data-viz slop.
- **Gold = the takeaway.** In any chart, table, or stat block, gold marks the ONE number/line the reader should leave with. If two things are gold, neither is. This is the chart-annotation research applied to brand: guide the eye to the conclusion.
- Surfaces (`#15110a` → `#2a2415`) differentiate cards/tables/callouts from the black page; hairline gold rules (`.km-hairline`) separate, never boxes-in-boxes-in-boxes.

---

## 5. COMPONENT LIBRARY (build these as reusable atoms — the bulk of the new work)

The inventory shows one bespoke chart and a few stat/table blocks. The brief demands "graphs + design elements genuinely fleshed out." Generalize into `components/charts/` and `components/resource/`:

**Data / chart atoms (`components/charts/`)** — generalize the Dashboard SVG approach:
- `LineChart` — the compounding-curve atom (§8 organic-vs-flat-paid; reuse the win-line draw + `CountUp`). Direct-labeled series ends, no legend.
- `BarChart` / `ComparisonBars` — query-surface math (§3), CPL-by-trade (§7), **per-trade page-count bars** (§12: roofing 147 / k&b 166 / HVAC 165 / outdoor 296 / plumbing 300+ / painting 144). Horizontal bars, value labels at bar end, gold = the KM/authority bar.
- `GapStatWall` (§6) — a grid of big tabular percentages (~96% no schema, ~52% fail CWV, ~96% fail WCAG, 60% no dedicated site) each with a `FlagChip` and a one-line source. Evolve the existing `MEASURED_GAPS` 8-cell grid into the reusable atom.
- `Gauge` / `MeterBar` — CWV/speed/INP thresholds (pass/fail bands). Flat, no skeuomorphic dial.
- **Every chart carries the data-journalism text kit:** a *takeaway* title (active sentence — "Organic compounds; paid resets to zero" — NOT "Figure 3: Traffic over time"), a one-line description, **direct labels not legends**, axis units, and a small de-emphasized source/note line at the bottom in muted text with its `FlagChip`. This is non-negotiable per the FT/Datawrapper research and it doubles as the honesty layer.

**Reference / scannability atoms (`components/resource/`):**
- `KeyTakeaway` / callout box — a flat bordered block (gold left-hairline, surface bg, NO rounded glass) with a label ("KEY TAKEAWAY" / "THE NUMBER" / "WHAT THIS MEANS FOR YOU"). Top of every section + at logical stopping points. This is THE scannability primitive.
- `ComparisonTable` — generalize `SIDE_BY_SIDE`. Sticky header row, left-aligned labels, right-aligned/centered values, tabular numerals, subtle row-hover (no zebra unless >8 rows), gold check / muted dash for the brochure-vs-authority binary. Full-bleed escape from prose measure.
- `DefinitionBlock` — term + plain-English definition (for "thin content defined right," "grandfathering," "topical authority," "AEO"). Mono term, sans definition. Builds the buyer's vocabulary.
- `SpecBlock` / "code-like" block — mono, dark surface, for schema snippets, the `service × location` matrix, llms.txt excerpts. Reinforces the proof frame.
- `StatBlock` — single big tabular numeral + label + `FlagChip` + source. Already half-exists in `ProofBar`; extract it.
- `ExpandableDetail` — native `<details>`/accordion for secondary depth (methodology, "show the math," edge cases) so the main scan stays clean. The B2B research: accordions let buyers expand on demand without overwhelming.
- `PriceRangeCard` / `MaterialCompare` (§9 buyer-guide content) — flat tables of ranges, not hero cards.
- `StickyTOC` + `ReadingProgress` — the right-rail anchor nav + a thin top progress bar.

**Anti-pattern guardrail baked into the atoms:** no card has more than one nested level. No "3 generic feature cards in a row" — if content is 3 parallel items, it's a table or a labeled list, not a card grid (the AI-slop tell).

---

## 6. ICONOGRAPHY

- **One thin-stroke line set, consistent weight (~1.5px), square/sharp corners** to match the institutional corner-0 language. Lucide or a custom subset — pick ONE and lock it. No duotone, no filled blobs, no gradient icons (all slop tells).
- Icons are **functional markers** (section anchors, check/dash in tables, flag types, callout-type glyphs), not decoration. The data-journalism research: icons replace text labels to make scanning faster — that's the only reason to use one.
- Gold reserved on icons for the action/winning state; default icon color is muted, not gold (gold scarcity again).

---

## 7. MOTION (restrained + functional — evolve `motion.tsx`, do not add showy reveals)

The locked `motion.tsx` is right; the library must NOT inherit hero-grade reveals on every section.

- **Keep:** word-level `TypeIn` (AI-legibility LAW — never per-letter; the vault's `feedback_ai_legibility_qa` is load-bearing) — but reserve it for page H1s only. Body headings get a plain `Reveal` fade-up or nothing.
- **Charts:** the `DrawLine`/`pathLength` draw and `CountUp` are perfect and on-brand — keep, with reduced-motion freeze. A chart animating once on scroll-in is functional (it shows the trend building); that's allowed.
- **Demote everything else to near-zero:** library prose and tables appear with a 150–250ms fade or instantly. NO staggered card cascades down a reference page (that's the "showy" editorial tell and it slows a scanner). The current `Stagger` is fine for the home marketing sections; do not carry it into the library.
- Hover states: subtle, fast (row-hover on tables, link underlines, TOC active-state). Functional feedback, not delight theater.
- `prefers-reduced-motion` freeze block already exists — extend it to cover every new atom.

---

## 8. SCANNABILITY PATTERNS — how a contractor USES it as a reference

This is the practical core. Every library page must support **scan → land → drill**:

1. **Sticky left topic tree** — where am I in the 13-section map, jump anywhere.
2. **Right "On this page" anchor TOC + reading progress** — scan the section list before reading; the active section highlights as you scroll.
3. **`KeyTakeaway` at the top of each section** — the one-sentence answer first (answer-first / AEO-ready, also feeds `speakable` schema). A contractor who reads only the takeaways gets the whole argument.
4. **Takeaway-titled charts** — the chart title states the conclusion; a scanner gets it without reading the prose.
5. **Comparison tables for any "X vs Y"** — brochure vs authority, organic vs paid, trade-by-trade. Tables scan faster than prose.
6. **`ExpandableDetail` for depth-on-demand** — methodology and "show the math" collapsed by default; the page stays scannable, the proof is one click away (serves the "audit it yourself" frame).
7. **`DefinitionBlock`s inline** — a contractor who doesn't know "topical authority" isn't lost.
8. **`FlagChip` on every number** — MEASURED / MODELED / ILLUSTRATIVE visible at a glance; the honesty rails are a scannability feature, not just ethics.
9. **A "jump to your trade" affordance** on §12 — six trades, the contractor finds theirs instantly.

---

## 9. DO's / DON'Ts (the guardrails)

**DO**
- Left-align prose, headings, tables, lists. Two-column reference shell with sticky nav.
- Narrow prose measure (720px); wide data modules (up to 1180px / full-bleed).
- Lock one tight type scale; display type only at H1/H2; everything else Jakarta utilitarian; mono for technical tokens.
- Tabular numerals + right-aligned numeric columns everywhere.
- Takeaway-first chart titles, direct labels, source + `FlagChip` on every figure.
- `KeyTakeaway` callouts and comparison tables as the primary scanning rails.
- Gold = the single takeaway per module; black carries the page.
- Functional motion: chart draws + fast fades; freeze on reduced-motion.

**DON'T**
- ❌ No giant hero whitespace canyons below the home hero. No oversized editorial display type on interior pages.
- ❌ No magazine pull-quotes-as-decoration. (A `KeyTakeaway` is a labeled functional callout — a pull-quote is a duplicated sentence blown up for vibe. Build the former, never the latter.)
- ❌ No centered-everything. Centering is for the home hero and final CTA only.
- ❌ No generic 3-card feature grids. Parallel items → table or labeled list. No cards-in-cards-in-cards.
- ❌ No rainbow charts. 2–4 flat brand-ramp series max; terracotta stays errors-only; gold = the one takeaway.
- ❌ No gradients / glass / glow / rounded-blob mush / drop-shadow soup (locked brand law).
- ❌ No staggered cascade reveals or showy scroll theater on reference pages.
- ❌ No legends where a direct label works. No decorative icons. No skeuomorphic gauges.
- ❌ No "Figure 3"-style dead chart titles — every title states the conclusion.

---

## 10. HOW THIS DIFFERS FROM THE EDITORIAL SUMMIT & OAK DIRECTION

Summit & Oak is a **conversion machine** — editorial-premium, image-led, persistent-hero, balance/Fulcrum-tuned, a single-flow scroll that *walks one buyer to one CTA*. It leans into hero imagery, generous air, and editorial rhythm because the visitor is a homeowner being persuaded once.

This firm site is a **reference platform** — the visitor is a contractor who *returns to look things up*, scans for their answer, and audits the claims. So it inverts Summit & Oak on the axes that matter:

| | Summit & Oak (editorial-premium) | KM firm site (practical-premium) |
|---|---|---|
| Reading model | Linear scroll, walk-to-CTA | Scan → land → drill, returnable reference |
| Layout | Single flow, image-led, persistent hero | Two-column doc shell, sticky topic tree + TOC |
| Prose width | Wide, editorial | Narrow 720px measure; wide data modules |
| Type | Larger display moments, editorial air | Tight utilitarian scale, display only at H1/H2, mono tokens |
| Imagery | Hero/town photography carries it | Charts and tables carry it; photos minimal |
| Density | Generous, balanced air | Denser, controlled, scannable |
| Motion | Persistent-hero + reveals as polish | Chart draws + fast fades; near-silent on prose |
| Hero | Big persistent editorial hero | Calm interior heads; the data is the hero |
| Center of gravity | Persuasion / feel | Information / proof |

**Same brand DNA** (amber-gold #ffb900 on #0a0a0a, KM crest, Archivo + Jakarta, gold-scarce-and-flat, square corners, Roark voice, no glass/gradient/mush) — **different application**: Summit & Oak reads like a premium editorial landing page; this reads like premium documentation / a data-driven buyer's guide. The chassis already in the build is correct for this; the work is building the two-column library, the chart/resource atom set, and the 13-section content surface *inside* it — and resisting every pull back toward the editorial direction.

---

## Builder-actionable next steps (maps to the inventory's ADD list)
1. Build the **two-column reference shell** (`StickyTOC` + left topic tree + 720px prose / full-bleed data) as the layout for `/playbook/[chapter]` and a new `/resources/[slug]` (or `/guides/[slug]`) route-family.
2. Build `components/charts/` (LineChart, ComparisonBars, GapStatWall, Gauge) by generalizing `Dashboard.tsx`, each with the data-journalism text kit + `FlagChip`.
3. Build `components/resource/` (KeyTakeaway, ComparisonTable, DefinitionBlock, SpecBlock, StatBlock, ExpandableDetail, PriceRangeCard).
4. Lock the **shared type scale + spacing token scale** in `globals.css` (replace per-component clamp drift); add the single mono face.
5. Hold the gold-scarce + left-align + narrow-prose discipline as the 13-section content fills in. Every number wears a `FlagChip`; every chart title states the conclusion.

**Files referenced:** design system to evolve = `C:/Users/josep/Claude Gravity/king-maker-site/app/globals.css`, `components/motion.tsx`, `components/ui.tsx`; chart seed to generalize = `components/home/Dashboard.tsx`; honesty pattern = `components/ui.tsx` (`FlagChip`) + `lib/claims.ts`; new atom homes = `components/charts/` and `components/resource/`; new route-families = `app/playbook/[chapter]/` and `app/resources/[slug]/`.

**Sources:** [Vercel Geist Typography](https://vercel.com/geist/typography) · [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) · [Four design principles behind Stripe, Linear, Vercel](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel) · [Stripe docs design analysis (apidog)](https://apidog.com/blog/stripe-docs/) · [Datawrapper — text in data visualizations](https://www.datawrapper.de/blog/text-in-data-visualizations) · [Data Visualization Standards — Labels](https://xdgov.github.io/data-design-standards/components/labels) · [Technical Writing Essentials — Readability & Document Design](https://opentextbooks.concordia.ca/practical-guide-to-technical-writing/chapter/chapter-3-document-design/) · [Pencil & Paper — enterprise data-table UX patterns](https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables) · [Webstacks — B2B resource-page design](https://www.webstacks.com/blog/resource-page) · [GIJN — Burn-Murdoch / FT data-storytelling tips](https://gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch/)