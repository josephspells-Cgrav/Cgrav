I now have a complete picture. The codebase fully matches the live site. I have everything needed to produce the inventory and the KEEP/RESHAPE/ADD judgment. Let me also confirm the privacy/terms/not-found exist as expected (already listed in app/). I have enough to write the structured inventory.

---

# KING MAKER FIRM SITE — CURRENT-BUILD INVENTORY + EDUCATION-FIRST REFRAME JUDGMENT

Codebase: `C:/Users/josep/Claude Gravity/king-maker-site/`. Live: https://kingmaker-firm.vercel.app. Stack: Next 16 SSG + Tailwind 4 (`@theme`) + framer-motion. Codebase and live site are in sync.

## 1. PAGES + SECTIONS (with component names)

**Home — `app/page.tsx`** (order = render order):
1. `Hero` (`components/home/Hero.tsx`) — "WE MAKE KINGS" word-level TypeIn, crest, dual CTA (Apply / See the Proof), "143 GoHighLevel sites scrubbed" seal.
2. `ProofBar` (`components/home/ProofBar.tsx`) — 4 measured stats (143 / 141 / 9-10 / 73%) + Summit & Oak reference link. All stats GHL-framed.
3. `ProblemReframe` (`components/home/ProblemReframe.tsx`) — **"GoHighLevel sells a $297 brochure"** + the 8-cell `MEASURED_GAPS` grid ("What we found across 143 of their sites"). **The core GHL teardown.**
4. `ProofSpine` (`components/home/ProofSpine.tsx`) — "We build a ranking system" + 3-row side-by-side comparison table (`SIDE_BY_SIDE`) + 13× relevancy stat.
5. `Dashboard` (`components/home/Dashboard.tsx`) — the animated SVG win-line chart (#42→#4 organic climb vs flat baseline). The only real graph.
6. `TheOS` (`components/home/TheOS.tsx`) — "The Kingmaker Agentic OS" 3 pillars + the tech-stack marquee.
7. `TrustMove` (`components/home/TrustMove.tsx`) — "audit my audit with any AI" + ChatGPT/Gemini/Claude/Perplexity row.
8. `Selectivity` (`components/home/Selectivity.tsx`) — "One king per city, per vertical" close + Apply CTA.

**`/work`** (`app/work/page.tsx`) — PageHero + reference-build card + **"The GoHighLevel teardown"** (143 + median 45) + `ComingOnline` shell + CTA.
**`/system`** (`app/system/page.tsx`) — PageHero + thesis ¶ + 4-step `ARC` grid (Foundation/Prominence/Dominance/Expansion) + `ComingOnline` shell + CTA.
**`/playbook`** (`app/playbook/page.tsx`) — PageHero + argument ¶ + 10-chapter `CHAPTERS` grid (titles + blurbs only, **no chapter bodies**) + `ComingOnline` + CTA. The intended education hub — currently a shell.
**`/apply`** (`app/apply/page.tsx`) — PageHero + 3 qualifiers + `ApplyForm`.
**`/firm`** (`app/firm/page.tsx`) — PageHero + positioning copy + "The standard" card + CTA.
**Legal/system:** `app/privacy`, `app/terms`, `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts` (8 URLs registered in `lib/sitemap-registry.ts`).

## 2. DESIGN TOKENS + SYSTEM (`app/globals.css`)

- **Colors** (`@theme`): bg `#0a0a0a`; surfaces `#15110a`/`#1f1a10`/`#2a2415`; lines `#2d2516`/`#1f1b12`. Gold ramp: `--color-gold #ffb900` (signature), `gold-bright #ffd24a`, `gold-deep #856709`, `gold-dim #584509`. Text: white / muted `#b5a982` / dim `#a0926e`. Rare secondary `--color-terracotta #c25a3a` (errors only). Contrast bonds documented AAA/AA in-file.
- **Type:** `--font-display` = Archivo (700+, tracking −0.02em, line-height 1.02, `text-wrap:balance` on h1–h3); `--font-sans` = Plus Jakarta Sans. Loaded in `app/layout.tsx`. Type sizing is per-component `clamp()` (no shared scale variable) — headings `clamp(1.9rem,4vw,3rem)` → hero `clamp(2.75rem,10.5vw,7rem)`; body 13–18.5px.
- **Spacing:** `Container` = max-w 1180px, px-6/8. `Section` = py-24/32. No spacing-token scale; Tailwind utilities throughout.
- **Corners:** radius 0 everywhere (base reset on button/input/select/textarea; explicit `borderRadius:0` on dots). Institutional.
- **Gold usage today:** scarce + flat — eyebrow hairline, crest, win-line, CTAs, stat numerals, measured-flag dots. No gradients/glass. One `.km-aura` radial per view max (anti-glow-soup).
- **Primitives:** `.km-tabular` (tnum), `.km-display`, `.km-hairline` (gold gradient rule), `.km-grain` (dot texture), `.km-aura` (single radial), `.km-marquee` (42s infinite). Full `prefers-reduced-motion` freeze block.
- **Motion conventions** (`components/motion.tsx`): `ENTER_EASE [0.16,1,0.3,1]`; `Reveal` (fade-up), `TypeIn` (**word-level** blur-reveal — AI-legibility law, aria-label clean), `DrawLine`, `Eyebrow`, `Stagger`/`StaggerItem`. `useReducedMotionSafe` (hydration-safe).

## 3. GRAPHS / VISUALS / DATA COMPONENTS

- **The win-line chart** — `components/home/Dashboard.tsx`. Hand-built SVG (640×340), animated `pathLength` draw, `CountUp` (reduced-motion-safe), gridlines, dual series, peak dot, legend, flag chip, aria-label. **The only true chart.** ILLUSTRATIVE.
- **Stat blocks:** `ProofBar` (4 measured) + `MEASURED_GAPS` 8-cell gap grid (`ProblemReframe`).
- **Comparison table:** `SIDE_BY_SIDE` 3-row brochure-vs-system (`ProofSpine`).
- **`FlagChip`** (`components/ui.tsx`) — the MEASURED/MODELED/ILLUSTRATIVE evidence badge; the honesty rails made visible. Reused across every number.
- **Marquee:** tech-stack ticker (`TheOS`).
- No reusable chart abstraction — the chart is bespoke to Dashboard. There are **no** bar charts, no comparison bars, no CWV/speed gauges, no cost/range tables, no funnel/flow diagrams.

## 4. NAV + LEAD CAPTURE

- **Nav** (`components/Header.tsx`): fixed, scroll-darkening, crest + wordmark. Items = The Work / The System / The Playbook + gold **Apply** CTA. Mobile hamburger. No dropdowns, no resource/topic nav.
- **Footer** (`components/Footer.tsx`): 2 link columns (The Firm / Engage) + brand + email + Privacy/Terms.
- **Lead form** (`components/ApplyForm.tsx`): client component, 7 fields (name, company, vertical select, revenue select, market, email, situation) + honeypot, success/error states.
- **API** (`app/api/lead/route.ts`): POST, zod-validated, honeypot drop, **no persistence — `TODO(phase-2)` CRM/n8n wiring** returns `{ok:true}`.

## 5. REUSABLE ATOMS

`components/ui.tsx`: `Container`, `Section` (tone bg/surface), `Button` (primary/secondary), `FlagChip`, `Hairline`, `Label`. `components/motion.tsx`: `Reveal`, `TypeIn`, `DrawLine`, `Eyebrow`, `Stagger`/`StaggerItem`. `components/PageHero.tsx`: `PageHero` + `ComingOnline`. `components/Crest.tsx` (KM crest SVG), `JsonLd.tsx`. **Schema** (`lib/schema.ts`): `organizationNode` (@graph spine), `websiteNode`, `founderNode`, `serviceNode`, `webPageNode` (+speakable), `breadcrumbNode`, `articleNode`, `buildGraph`. Config: `lib/site.config.ts` (SITE/FIRM/ANALYTICS), `lib/claims.ts` (every number + flag), `lib/text.ts` (`bindLastTwoWords`).

---

## JUDGMENT vs the EDUCATION-FIRST REFRAME

The current build is a **tight sales/proof site framed as a GoHighLevel teardown** — exactly what the brief says it must NOT be. ~40% of home real estate (ProofBar + ProblemReframe + Work-page teardown) is GHL-specific. The infra, design system, schema, motion, and honesty rails are excellent and education-ready. The gap is **content depth**: the locked 13-section topic map is ~10% present; the Playbook (the actual resource) is a shell. The brand/design constraint ("practical, not super-editorial") is already satisfied — this is premium-utilitarian, not fashion-editorial. Do not redesign the look; **build the library inside it.**

### KEEP AS-IS
- **Entire design system** — `globals.css` tokens, Archivo/Jakarta, gold-scarce discipline, square corners, `.km-*` primitives. On-brand and practical. ✅
- **Motion layer** — `motion.tsx`, word-level `TypeIn` (AI-legibility law), reduced-motion freeze. ✅
- **Schema spine** — `lib/schema.ts` Organization @graph, all node builders. Reuse for every new resource page (`articleNode` is ready for chapters).
- **`FlagChip` + `lib/claims.ts` honesty pattern** — this is the differentiator for an education platform; every taught stat must wear a flag. Keep and extend.
- **Dashboard win-line chart** — keep as a reusable graph pattern (it's the seed for the chart library §below).
- **Header/Footer/PageHero/Section/Button/Container** shells, `ApplyForm` UI, `Selectivity` close, `TheOS`, `TrustMove`.
- **Nav skeleton** (extend, don't replace).

### RESHAPE (esp. GHL-teardown → brochure-teardown + education)
- **`ProblemReframe`** — RESHAPE from "GoHighLevel sells a $297 brochure" → **"A brochure DESCRIBES a business; an authority site IS a ranking system"** (topic-map §1/§3). Keep the gap grid but reframe it as "the % of *contractor sites* missing the fundamentals" (topic-map §6 GAP STAT WALL), not "their 143 GHL sites." GHL becomes one *example* of a brochure platform, not the enemy.
- **`ProofBar`** — RESHAPE the 4 GHL-anchored stats → education-anchored proof (query-surface math, % missing schema/CWV, organic-vs-paid close rate). Demote "143 GHL audited" to one supporting data point.
- **`/work`** — RESHAPE "The GoHighLevel teardown" → **"brochure vs authority anatomy"** teardown using the reference build; keep Summit & Oak.
- **`ProofSpine`** — KEEP the table, relabel "$297 brochure" column → "10-page brochure" (de-GHL the headline; topic-map §3 query-surface math).
- **`lib/claims.ts`** — RESHAPE labels: `STRUCTURAL_KILLER`, `MEASURED_GAPS`, `SIDE_BY_SIDE` headers from "GoHighLevel/their sites" → "brochure sites." Data stays; framing de-GHLs.
- **Hero subhead + `llms.txt` + layout metadata** — soften "Not a $297 brochure" / GHL-centric description toward the education premise ("THIS is why you need an enterprise-grade website").
- **`/api/lead`** — wire the `TODO(phase-2)` CRM sink before launch (currently drops leads).
- **Header nav** — add a **Resources/Guides** entry (the education hub) alongside Playbook.

### ADD (missing for a resource / buyer's-guide platform)
The locked 13-section topic map needs real content surface. Concretely:
- **Build out `/playbook` chapters** — the 10 `CHAPTERS` are titles+blurbs only. Each needs a real `app/playbook/[chapter]/page.tsx` with `articleNode` schema, word-level headings, answer-first blocks, `speakable`. This IS the education platform.
- **New resource page-type / route family** — e.g. `/resources/[slug]` or `/guides/[slug]` mapping to topic-map §2,5,7,8,9,10 (anatomy of an enterprise site; how Google picks the winner; AEO/AI-answer; site equity & compounding; what good content gives the buyer; the honesty layer). None exist yet.
- **A reusable CHART/VISUAL library** (the brief: "graphs + design elements genuinely fleshed out"). Currently one bespoke chart. Need atoms for: bar/comparison charts (query-surface, CPL-by-trade §7), the **compounding curve** (organic vs flat paid §8), a **gap stat wall** visual (§6), **per-trade page-count bars** (§12: roofing 147 / k&b 166 / HVAC 165 / outdoor 296 / plumbing 300+ / painting 144), price-range/material-comparison tables (§9), a CWV/speed gauge. Generalize `Dashboard`'s SVG approach into `components/charts/`.
- **The honesty/"what we won't claim" section** (§13) — a debunk module (domain-age, DA score, "nobody clicks ads"). The credibility moat; pairs with existing `FlagChip`. Not built.
- **Per-trade breakdown page** (§12) — the 6-trade build matrix (brochure ~10 vs authority, service×location multiplier). Not built.
- **Anti-doorway / "delete-the-city-name test" explainer** (§11) — referenced in OS pillars but not taught.
- **Buyer-guide content components** — price-range cards, material-comparison tables, how-to-choose / what-to-expect blocks, financing/warranty/insurance explainers (§9). No atoms exist.
- **A real `/work` case-study / teardown depth layer** (currently `ComingOnline` shell).

**Bottom line:** the chassis (design, motion, schema, honesty rails, chart seed) is launch-grade and on-brief; the GHL-teardown framing needs a global relabel to brochure-teardown + education; and the actual *resource library* (Playbook chapters + a guides route-family + a fleshed-out chart/visual atom set covering the 13-section topic map) is the bulk of what's missing.