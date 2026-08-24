I have everything I need. Critical findings for the honesty layer:

- **Long-tail: 95%** of queries have ≤10 monthly searches (Ahrefs) — the brief's "91.8% by count" is in-range; I'll cite the well-sourced 95% / 92.42% figures MEASURED.
- **Conversion (2.4% vs 1.3%):** I could NOT source this specific pairing. Benchmarks show organic ~2-4% and paid often *comparable or higher* on high-intent. This means the brief's "organic closes better" framing is **partially contestable** — and the HONESTY RAILS say lead with measured gaps and concede paid's role. I'll spec viz #5 with the honest reframe: organic wins on *cost-efficiency + volume at scale + trust*, NOT necessarily a higher click-conversion rate — and flag the 2.4/1.3 numbers ILLUSTRATIVE, not MEASURED.
- **94-day journey:** no hard contractor-specific source for "94 days"; B2B avg journey is 272 days (Dreamdata) and 78% shortlist 3 vendors. I'll flag the home-improvement 94-day figure ILLUSTRATIVE and anchor the defensible parts (shortlist ≤3, 95% go to Day-One shortlist) as MEASURED.

I have enough to write the full catalog. This is the deliverable — no files, returned as my message.

---

# KING MAKER — DATA-VIZ / GRAPH CATALOG

Built to extend the existing `Dashboard.tsx` pattern: hand-rolled SVG, `viewBox` + `role="img"` + descriptive `aria-label`, framer-motion `pathLength`/opacity draw-ins, `km-tabular` numerals, the `FlagChip` honesty system, gold reserved for the hero/"you" series, `#6b5a2e`/`gold-deep` for the muted "them" baseline. Every viz ships with a real `<table>` twin for crawlers/AI/screen-readers.

## GLOBAL DESIGN SYSTEM FOR ALL VIZ (the lock)

**Canvas/surface:** `bg` `#0a0a0a` or `surface-2` `#1f1a10` panel, 1px `line` `#2d2516` border, top `km-hairline` gold rule. Square corners (radius 0), flat, no gradients/glow except the existing `gold-glow` alpha sparingly on a single hero point.

**Series color law (AA+ verified on `#0a0a0a`):**
| Role | Token | Hex | Use |
|---|---|---|---|
| HERO / "you / organic / authority / system" | `gold` | `#ffb900` (11.4:1) | exactly ONE series per chart — the win line/bars |
| Peak accent | `gold-bright` | `#ffd24a` | single end-dot / crossover marker |
| BASELINE / "them / paid / brochure / thin" | custom muted | `#6b5a2e` (matches existing) | the losing series, dashed or hollow |
| Deep baseline fill | `gold-deep` | `#856709` | bar fills for "them" |
| Gridlines | `line` | `#2d2516` | 1px, 4-5 lines max |
| Axis labels | `dim` | `#a0926e` (≥4.6:1) | 11-12px |
| Body/caption | `muted` | `#b5a982` | takeaway captions |

**Typography in viz:** Archivo (`km-display`) for headline numbers, `km-tabular` on every numeral (no wiggle on count-up), `dim` uppercase `tracking-[0.22em]` axis labels.

**Motion law:** one-shot, `viewport={{ once:true }}`, `ENTER_EASE [0.16,1,0.3,1]`, draw-in ≤1.5s, `useReducedMotionSafe()` → instant static render. Never loop.

**Accessibility/AI-legibility twin (NON-NEGOTIABLE):** every chart is `aria-hidden` visually + paired with a `<table class="sr-only md:not-sr-only">` (or a `<details>` "See the data" disclosure) carrying identical numbers. This is the AI-legibility law applied to charts — a box-tokenizing extractor reads the table, not the SVG path. The headline "so-what" is a real `<h3>`/`<p>` above the SVG, never baked into the image.

**Implementation verdict — hand-rolled SVG, NOT a charting lib.** Recharts/visx pull client JS, fight SSG, and bury text in `<tspan>` soup that AI extractors mangle. The existing `Dashboard.tsx` proves hand-rolled SVG + framer-motion is the house style and it's fully SSG + AI-legible. Build a small `lib/chart.ts` of pure helpers (`scaleLinear`, `toPath`, `toBars`, `niceTicks`) + thin server-rendered SVG shells with a `"use client"` motion leaf only where a draw-in is wanted. Charts that don't animate (tables, the matrix grid, the gap wall) stay 100% server components.

---

## VIZ 1 — THE SIGNATURE: COMPOUNDING ORGANIC vs FLAT PAID (24 mo)

- **(a) So-what:** *"Paid traffic is rent — it stops the day you stop paying. Organic is equity — it compounds and keeps climbing after the spend flattens."*
- **(b) Data (ILLUSTRATIVE — labeled; shape is the claim, not the units). Monthly sessions:**
  - **Organic (gold):** mo 1-6 slow ramp `8,14,22,35,55,90` → inflection mo 7-12 `140,210,300,410,540,690` → durable mo 13-24 `860,1040,1230,1430,1640,1860,2090,2330,2580,2840,3110,3390`.
  - **Paid (muted, flat):** holds `~620` ±5% the whole 24 mo (constant spend = constant rented flow): `590,610,630,615,625,640,600,635,620,610,630,615,625,640,600,635,620,610,630,615,625,640,600,635`.
  - **Crossover** ≈ mo 11-12, annotated with a `gold-bright` dot + vertical hairline: *"Month ~12: organic overtakes paid — and never looks back."*
- **(c) Chart type + why:** dual-line area chart. A line shows the *trajectory divergence* (compounding curve vs flat) better than bars; a faint `gold` area fill under the organic line past the crossover visualizes accumulated "equity."
- **(d) Treatment:** `surface-2` panel, gold organic line `strokeWidth 2.75` + 8%-alpha gold area fill after crossover; paid line `#6b5a2e` `strokeWidth 1.5` dashed `3 4`. Crossover: vertical `line` `dim` dashed + `gold-bright` r5 dot. End-of-organic-line label "+3,390/mo" in `km-display`.
- **(e) Annotations:** y-axis "Monthly organic sessions" (`dim`); x-axis "Mo 1 · Mo 12 · Mo 24"; two inline series labels at line-ends (no separate legend needed); headline number = the crossover month.
- **(f) Mode:** **scroll-animated** — both lines `pathLength 0→1` (paid draws fast/flat in 0.8s, organic draws slow→accelerating in 1.6s so the divergence *feels* like compounding), area fill `opacity 0→1` after, crossover dot pops last. This is THE hero viz — earns the most motion.
- **(g) Implementation:** extend `Dashboard.tsx` geometry exactly. `FlagChip flag="ILLUSTRATIVE"`. Table twin: 24-row month/organic/paid. `aria-label`: "Organic monthly traffic compounding from 8 to roughly 3,390 sessions over 24 months while paid traffic stays flat near 620; organic overtakes paid around month 12."

---

## VIZ 2 — BROCHURE vs AUTHORITY PAGE-COUNT, PER TRADE (bars)

- **(a) So-what:** *"A brochure ships ~10 pages. An authority site ships 144-300+ — every one a door Google can rank."* (MEASURED — these are real shipped builds.)
- **(b) Data (MEASURED, per the brief's shipped counts):**
  | Trade | Brochure | Authority |
  |---|---|---|
  | Roofing | 10 | 147 |
  | Painting | 10 | 144 |
  | HVAC | 10 | 165 |
  | Kitchen & Bath | 10 | 166 |
  | Outdoor Living | 10 | 296 |
  | Plumbing | 10 | 300+ |
- **(c) Chart type + why:** horizontal grouped/overlaid bars (trade per row). Horizontal because labels are words; the brochure bar as a thin muted stub *inside/behind* the long gold authority bar makes the multiplier instantly legible (the gold bar visually swallows the stub).
- **(d) Treatment:** authority bar = `gold` fill, square ends; brochure stub = `gold-deep`/`#6b5a2e` 10px sliver at bar start; per-row the multiplier badge ("14.7×", "30×") in `gold` `km-tabular` at the bar end. Plumbing's "300+" gets a subtle right-edge fade/arrow to signal "and beyond."
- **(e) Annotations:** value labels at each bar end; a single x-axis tick row "0 · 100 · 200 · 300"; section headline "10 pages vs a system."
- **(f) Mode:** **scroll-animated** — bars `scaleX 0→1` from left origin, staggered top-to-bottom (`staggerChildren 0.08`), value count-up synced to bar growth. Reduced-motion → full bars instant.
- **(g) Implementation:** server SVG + a `"use client"` `Stagger` wrapper for the grow. Table twin already half-built in `claims.ts` style — add a `TRADE_PAGES` export. `aria-label` lists all six counts.

---

## VIZ 3 — THE GAP STAT WALL (% of sites missing fundamentals)

- **(a) So-what:** *"The bar is on the floor. Most sites fail the fundamentals — which is exactly why an enterprise build laps them."* (MEASURED, with corrected figures.)
- **(b) Data — CORRECTED, load-bearing (the brief's 60% "no site" is stale; current = ~27%):**
  | Gap | % | Flag | Source-anchor |
  |---|---|---|---|
  | Homepages with WCAG 2 A/AA failures | **94.8%** | MEASURED | WebAIM Million 2025 |
  | Sites missing LocalBusiness/structured schema | **~96%** | MODELED | (web-crawl est.; flag honestly) |
  | Pages failing Core Web Vitals | **~52%** | MEASURED | (CrUX-based; keep your audited figure) |
  | Small businesses with **no dedicated website** | **~27%** | MEASURED | Clutch/Sonata 2025 (NOT 60%) |
  - Plus your own **143-site GHL audit** wall as a second tab/row group (100% no hreflang, 73% no llms.txt, 53% no location pages, 52% no schema) — this is your *proprietary MEASURED* data and the strongest panel.
- **(c) Chart type + why:** a "wall" of large `km-display` percentage figures, each over a thin horizontal fill-bar (the % filled in gold against a `surface-3` track). Big-number-led, not a traditional chart — reads as a scoreboard, fits "data-journalism" brief better than a bar chart of percentages.
- **(d) Treatment:** 2×2 (or 4-across) grid of `surface-2` cells, square, 1px `line` dividers (bento, gapless). Each cell: giant gold `94.8%`, a one-line label in `muted`, a fill-bar, a `FlagChip` bottom-right. Reserve gold for the *number*; bars in `gold-deep`.
- **(e) Annotations:** each cell self-labels; section headline "The fundamentals nobody ships." A footnote line: corrected-figure honesty note.
- **(f) Mode:** **scroll-animated** count-up per cell (`CountUp` already exists) + fill-bar `scaleX`. Static-safe.
- **(g) Implementation:** pure layout + the existing `CountUp`. Numbers come from a `GAP_WALL` array in `claims.ts` each carrying `{pct,label,flag,note}`. The `<dl>` (definition list) IS the accessible twin — semantic, no separate table needed. **Honesty action:** drop the 60% figure entirely; if Joseph wants the "invisible online" angle, the ~27%-no-site is the defensible version.

---

## VIZ 4 — COST-PER-LEAD BY CHANNEL + AMORTIZED CROSSOVER

- **(a) So-what:** *"Paid leads cost the same on day 1 and day 1,000. Organic lead cost starts high, then falls below paid and keeps dropping — the retainer's flat, the lead volume isn't."*
- **(b) Data — two linked panels:**
  - **Panel A (snapshot, roofing — MEASURED ranges):** LSA `~$162` (range $75-150 typical, $162 competitive) · PPC `~$228` (range $100-500, midpoint) · Organic mature `~$30` (range $10-50). Bars.
  - **Panel B (amortized crossover, ILLUSTRATIVE):** organic effective CPL falls over 18 mo `$300,$210,$150,$110,$85,$68,$55,$46,$40,$36,$33,$31,$29,$27,$26,$25,$24,$23` vs paid flat `~$190` line. **Crossover ≈ mo 5-6.**
  - (HVAC secondary row optional: PPC CPL ~$80-250.)
- **(c) Chart type + why:** Panel A = simple comparative bars (one moment in time). Panel B = the crossover line chart (organic descending gold curve crossing a flat paid line). Two chart types because they answer two different questions — snapshot vs trajectory.
- **(d) Treatment:** Panel A bars: organic `gold`, LSA/PPC `#6b5a2e`. Panel B: organic descending `gold` line, paid flat `#6b5a2e` dashed, `gold-bright` crossover dot + label "Month ~6: organic gets cheaper than paid — permanently."
- **(e) Annotations:** "$" prefixed `km-tabular` values; y "Cost per lead"; x "Month 1 → 18"; the crossover callout is the headline number.
- **(f) Mode:** Panel A static-or-light bar grow; Panel B scroll-animated line draw (reuse Dashboard motion). 
- **(g) Implementation:** `CHANNEL_CPL` + `CPL_CURVE` arrays in `claims.ts`, snapshot flagged MEASURED, curve flagged ILLUSTRATIVE. Two table twins. **Honesty:** show ranges in the table, not just midpoints; the curve is a model of the documented "front-loaded then flattening" dynamic, not a guarantee.

---

## VIZ 5 — ORGANIC vs PAID CONVERSION (HONESTY-REFRAMED)

- **(a) So-what — REFRAMED (the brief's 2.4%/1.3% is not cleanly sourceable; lead honest):** *"Organic and paid convert in the same 2-4% band on click. Organic wins on what comes after the click: lower cost, durable volume, and the trust of an unpaid result."* Do **not** claim organic out-converts paid per-click — benchmarks often show paid equal-or-higher on high-intent.
- **(b) Data:** if Joseph insists on the paired bars, render **organic 2.4% vs paid 1.3% flagged ILLUSTRATIVE** with the visible footnote "directional; benchmarks vary by intent and source." Better: render the **defensible** version — a small paired bar (organic 2-4% band vs paid 2-3% band as ranges, MEASURED) + the real differentiator stat: *brands appearing in both organic + paid see +50% total clicks; +27% conversions* (MEASURED, sourced).
- **(c) Chart type + why:** paired range-bars (show the *band*, not a false-precision single value) — honesty made visual; the overlap of the bands is itself the truthful message.
- **(d) Treatment:** organic band `gold` (lower-alpha fill + solid edge), paid band `#6b5a2e`; overlap zone subtly cross-hatched to show "they overlap — the difference isn't the click rate."
- **(e) Annotations:** "% of visits that convert," range endpoints labeled; headline = the +27%/+50% both-channels stat.
- **(f) Mode:** static or light bar-grow. Low-drama by design — this is the *credibility* viz.
- **(g) Implementation:** `CONVERSION` object in `claims.ts` with bands + flags. **This is the most important honesty fix in the catalog — flag it to Joseph explicitly.**

---

## VIZ 6 — SITE EQUITY / PAGE-AGE (top-10 dominance)

- **(a) So-what:** *"73% of page-one results are 3+ years old. The #1 result averages 5 years. Authority is accumulated time — you can't buy your way past it, you build past it."* (MEASURED — Ahrefs.)
- **(b) Data (MEASURED, Ahrefs page-age study):** Top-10 by age — **<1 yr: 13.7%** · 1-3 yr: 13.4% · **3+ yr: 72.9%**. Plus the headline: **avg #1 page = 5 years old** (was 2 yrs in 2017).
- **(c) Chart type + why:** a single 100% stacked horizontal bar (the "share of page one") split into three age segments — instantly shows 3+ yr dominating ~3/4 of the bar. Cleaner than a pie; one bar = "this is all of page one."
- **(d) Treatment:** 3+ yr segment = `gold` (the prize, the durable zone), 1-3 yr = `gold-deep`, <1 yr = `#6b5a2e` thin sliver. The "5 years" #1-age stat as a giant `km-display` number beside the bar.
- **(e) Annotations:** segment % labels inside each segment; "avg #1 page: 5 yrs" callout; section headline.
- **(f) Mode:** scroll-animated segment grow (each `scaleX` staggered) + "5" count-up. Static-safe.
- **(g) Implementation:** trivial server SVG + `CountUp`. Table twin = 3-row age distribution. Strong, fully-MEASURED, zero honesty risk — a flagship-quality viz.

---

## VIZ 7 — THE CONSIDERED-BUYER JOURNEY/TIMELINE

- **(a) So-what:** *"High-ticket buyers don't decide in a session. They research for weeks, shortlist three, then choose fast — and 95% pick a name that was already on the Day-One list. The deep site is how you make that list."*
- **(b) Data — honesty-split:**
  - **Research window:** label **"~94 days"** but flag **ILLUSTRATIVE** (no clean contractor-specific source; B2B avg journey = 272 days per Dreamdata MEASURED — offer that as the defensible alt).
  - **Shortlist ≤3 vendors: 78%** (Wynter 2024, MEASURED).
  - **95% of deals go to a Day-One shortlist vendor** (MEASURED).
  - Decide-in-~72h sprint at the end = ILLUSTRATIVE.
- **(c) Chart type + why:** horizontal *timeline/journey diagram* with a looping "messy middle" motif — not a quantitative chart but an annotated process line. Three nodes: long Research bar → narrowing Shortlist funnel (→3) → short Decision sprint. A subtle looping arrow over the research segment renders the "messy middle."
- **(d) Treatment:** timeline spine in `dim`; research segment a long `gold-deep` bar; the funnel-to-3 in `gold`; decision node a `gold-bright` dot. Loop arrows hairline `dim`.
- **(e) Annotations:** each node labeled with its stat + flag; the "95% pick a Day-One name" as the punch-line callout.
- **(f) Mode:** scroll-animated left-to-right reveal of the spine + nodes; loop arrow draws subtly. 
- **(g) Implementation:** server SVG (mostly static) + a `Reveal` wrapper. **Honesty:** put the 94-day number behind an ILLUSTRATIVE flag and footnote the 272-day MEASURED B2B figure; never present 94 days as sourced fact.

---

## VIZ 8 — SERVICE × LOCATION MATRIX MULTIPLIER

- **(a) So-what:** *"One 'service areas' page lists your towns. A matrix builds a unique page for every service in every town — that's where the page count (and the rankable surface) explodes."*
- **(b) Data (ILLUSTRATIVE-structural, but the math is real):** left = 1 flat "Service Areas" page listing N towns. Right = a grid: e.g. **6 services × 12 cities = 72 unique pages** (scale the example to a real shipped trade). Show the multiplication explicitly.
- **(c) Chart type + why:** a *grid/matrix diagram* — single page icon on the left, an illuminated N×M cell grid on the right. The visual fills in cell-by-cell = "each cell is a real page = a real ranking surface." Best possible way to show a multiplier (it's literally an area).
- **(d) Treatment:** grid cells `surface-2` with 1px `line`; as they "activate" they fill `gold` (or gold-outline). Row labels = services, column labels = cities, both `dim`. The "= 72 pages" total in `km-display` gold. Anti-doorway honesty note: "each cell is a *real* job/page — delete-the-city-name test, not a template swap."
- **(e) Annotations:** axis labels (services × cities), the product total as headline, the anti-doorway caveat as footnote.
- **(f) Mode:** **scroll-animated** cell-fill cascade (diagonal stagger) — genuinely satisfying and on-message. Reduced-motion → all cells filled.
- **(g) Implementation:** CSS grid of divs + framer `Stagger`, or SVG `<rect>` grid. Accessible twin = a `<table>` with services as rows, cities as columns. Carries the anti-doorway rail visibly.

---

## VIZ 9 — GEO-GRID HEATMAP ("money on a map")

- **(a) So-what:** *"This is a picture of money on a map — your local rank at every pin around a job site. Red is invisible; green is the call. The deep site turns the grid green."*
- **(b) Data:** a 7×7 (or 9×9) grid of rank values 1-20+ around a center point. Two states to show: "before" (mostly red/orange = ranks 11-20+) vs "after" (mostly green = ranks 1-3). Use plausible illustrative rank values; flag ILLUSTRATIVE.
- **(c) Chart type + why:** a true heatmap grid (Local Falcon-style geo-grid) — the single most visceral local-SEO visual; "a picture of money."
- **(d) Treatment — BRAND-CRITICAL CAVEAT:** the house palette is gold/black, so a literal red→green ramp fights the brand. **Two on-brand options:** (1) keep red→amber→green but *desaturate* and set it on the near-black canvas with square cells + thin `line` gutters so it reads as instrumentation, not a default heatmap; or (2) re-skin the ramp to `gold-deep` (buried) → `gold-bright` (winning) — a single-hue intensity ramp that's more on-brand but less universally "rank-grid"-legible. **Recommend option 2** (gold-intensity) for brand cohesion, with rank numbers in each cell for unambiguous reading. Square cells, flat, no glow.
- **(e) Annotations:** rank number inside each cell (`km-tabular`); a center pin marker; legend "buried → winning." **The personalization caveat is load-bearing and must be on-screen:** "Shown from the *customer's* location, never the contractor's — proximity personalizes every grid."
- **(f) Mode:** scroll-animated cell-by-cell color/number transition from "before" to "after" state (a toggle or a one-shot morph). Optionally **interactive** toggle "Brochure site / Authority site" flipping the whole grid.
- **(g) Implementation:** SVG `<rect>` grid + `<text>`, framer color/opacity tween, `useReducedMotionSafe` → show the "after" state static. Accessible twin = a `<table>` of the rank matrix. `FlagChip ILLUSTRATIVE`. **Carry the customer-location caveat as visible text, not a tooltip.**

---

## VIZ 10 — QUERY-SURFACE / LONG-TAIL CAPTURE

- **(a) So-what:** *"95% of searches are long-tail — a handful of words, low volume each, enormous in aggregate. More pages = more of that tail captured. And 96.55% of all pages get zero Google traffic — almost always because they never built the surface to be found."*
- **(b) Data (MEASURED):** long-tail share **95%** of queries have ≤10 monthly searches (Ahrefs) / **92.42%** get ≤10 searches/mo · **96.55%** of pages get zero Google traffic (Ahrefs, 14B pages). Pair with a "pages → captured queries" step relationship (10 pages capture a sliver of the head; 130 pages reach deep into the tail).
- **(c) Chart type + why:** the classic **long-tail demand curve** (a power-law curve: tall short head, long flat tail) with two shaded "capture" regions overlaid — a narrow head-only region (brochure) vs a wide head+tail region (authority). The canonical SEO visual; instantly legible.
- **(d) Treatment:** the demand curve line in `dim`; brochure-capture area = small `#6b5a2e` shaded head region; authority-capture area = wide `gold` shaded region extending down the tail. The 96.55% zero-traffic stat as a giant `km-display` callout beside it.
- **(e) Annotations:** x "search queries, ranked by volume"; y "monthly searches"; two region labels ("brochure captures the head" / "authority captures the tail"); headline = 95% long-tail + 96.55% zero-traffic.
- **(f) Mode:** scroll-animated — curve draws, then the two capture areas fill (brochure first/small, authority second/sweeping). 
- **(g) Implementation:** SVG path for the curve + two `<path>` area fills, framer draw. Table twin = the two stats + a small "pages vs queries captured" table. Fully MEASURED — a flagship viz.

---

## VIZ 11 — AEO / ZERO-CLICK (honesty-reframed)

- **(a) So-what — REFRAMED honest:** *"AI Overviews are cutting clicks — down ~35% in early 2025, ~58% by year-end on position-one queries, with 60% of searches now ending click-free. The play isn't to fight it; it's to BE the cited answer. Sites that get cited in AI answers earn +35% more organic clicks — and a brochure with no structured answers is invisible to the model."*
- **(b) Data (MEASURED, sourced):** AIO CTR impact **−34.5% (Apr 2025) → −58% (Dec 2025)** on top results · **60%** zero-click searches · **+35% organic / +91% paid clicks** when cited in an AIO · **88% of AI-cited URLs don't rank Google top-10** (so AI is a *separate* visibility surface). **Honesty correction:** do NOT use "99.5% of AI citations come from top-10 organic" — the sourced finding is the *opposite* (88% of AI-cited URLs are NOT top-10). Reframe to "AI citation is its own surface you must structure for."
- **(c) Chart type + why:** a paired before/after CTR bar (with-AIO vs without-AIO) + a small "+35% if cited" delta callout. A declining-CTR mini-line over 2025 (Apr→Dec) as a secondary sparkline. Bars communicate the "click loss" loss most bluntly.
- **(d) Treatment:** "without AIO" CTR bar `gold`; "with AIO" bar shrunk + `#6b5a2e` (the loss visualized as a literally-shorter bar); the "+35% if cited" recovery in `gold-bright`. The −58% as the headline number.
- **(e) Annotations:** % labels, the timeline sparkline dated Apr→Dec 2025, the "be the answer" punch-line; every figure flagged MEASURED.
- **(f) Mode:** scroll-animated bar shrink + count to −58%. 
- **(g) Implementation:** bars + `CountUp` + a tiny line. `AEO` object in `claims.ts`. **Honesty action: replace the 99.5%-top-10 claim with the sourced 88%-NOT-top-10 reframe — flag to Joseph.**

---

## VIZ 12 — "SITE WINS THE TIE" MECHANISM (conceptual)

- **(a) So-what:** *"When GBP is equal and review count/velocity is equal, the tiebreaker is the website. The deeper, more relevant site wins — every time."* (This is a LOCKED KM doctrine — `feedback_site_wins_pack` — so it gets a premium conceptual diagram, not a fake quantitative chart.)
- **(b) Data:** conceptual — two competitors, three signal rows (GBP: =, Reviews: =, Website: ▲ vs ▬), resolving to a winner. No invented numbers; the *structure* is the message.
- **(c) Chart type + why:** a balance/scale or a two-column "tale of the tape" comparison resolving to a tiebreaker arrow. A conceptual diagram, not a chart — honest (no fabricated metrics) and matches the "practical B2B explainer" brief.
- **(d) Treatment:** two `surface-2` columns (You vs Competitor), three signal rows with `=` chips for the tied rows (`dim`) and a `gold` ▲ on the Website row for "you," resolving to a `gold` "WINS" badge. Square, flat, institutional.
- **(e) Annotations:** row labels (GBP / Reviews / Website depth), the tiebreaker arrow, the doctrine line as caption: "Equal everything else → the site is the tiebreaker."
- **(f) Mode:** scroll-reveal of rows top-to-bottom, the "WINS" badge lands last. Light motion — it's an explainer.
- **(g) Implementation:** pure layout (server component, no SVG needed). Inherently accessible (it's structured text). **Carry the LOCKED framing verbatim** — and respect the rail: organic wins the *considered research*, map pack catches proximity; don't overstate the pack.

---

## VIZ 13 — AUTHORITY FLYWHEEL (conceptual loop)

- **(a) So-what:** *"Each page you publish ranks faster than the last. Rankings earn links and trust; trust makes the next page rank faster. The system compounds — that's the flywheel a brochure never spins."*
- **(b) Data:** conceptual 4-node loop: **Publish depth → Earn rankings → Accumulate authority/links → Next page ranks faster →** (back to Publish). Optionally annotate with a real supporting stat per node (e.g. the 72.9% page-age dominance from Viz 6).
- **(c) Chart type + why:** a circular flywheel/loop diagram — the canonical way to show a compounding self-reinforcing system. Conceptual, honest, premium.
- **(d) Treatment:** circular arrangement of 4 square nodes (NOT pill-shaped — square corners) connected by curved `gold-deep`→`gold` arrows that brighten as the loop "spins up." Center hub = a `gold` KM crest or "AUTHORITY" label. One node accented `gold`, the rest `surface-2`.
- **(e) Annotations:** each node labeled with its step; the center holds the payoff word; caption ties to the compounding curve (Viz 1).
- **(f) Mode:** scroll-animated — arrows draw sequentially around the loop once (a single rotation), nodes fade in in sequence. **Never auto-loops** (motion law). Reduced-motion → static loop.
- **(g) Implementation:** SVG arcs + `<text>`, framer sequential `pathLength`. Accessible twin = an ordered `<ol>` of the four steps (a flywheel is just a cycle of steps — the list IS the semantics).

---

## VIZ 14 — TRADE PAGE-COUNT COMPARISON TABLE (premium table)

- **(a) So-what:** *"Brochure vs authority, per trade — and the core pages you get before a single location page is built."* The reference table that anchors the whole page-count argument.
- **(b) Data (MEASURED):** columns = Trade · Brochure (~10) · Core (pre-location) · Authority (total) · Multiplier. Rows = the 6 trades from Viz 2. Core-pre-location ≈ a realistic per-trade figure (e.g. roofing ~35-50 core before the service×city matrix multiplies it) — confirm exact core counts with Joseph; flag MEASURED where shipped, MODELED for the core split if estimated.
- **(c) Chart type + why:** a genuine premium `<table>` — the brief explicitly wants this one *as a comparison table*. This is the "data-journalism / premium documentation" anchor and the single best AI-legible artifact on the page (it's literally a table).
- **(d) Treatment:** zebra-free, `line`-divided rows, square; header row `dim` uppercase `tracking-[0.22em]`; the Authority column numbers in `gold` `km-tabular`; the Multiplier column as a `gold` badge per row; sticky header on scroll. Generous row padding (premium = whitespace). Right-aligned numerals.
- **(e) Annotations:** column headers, a totals/footer row (sum or average multiplier), a caption naming the live reference build (Summit & Oak, 147 pages) as proof.
- **(f) Mode:** **static** (a table shouldn't animate its data) — optionally a one-shot row `Reveal` stagger on scroll-in. Numbers never count-up in a reference table (you want them readable/copyable instantly).
- **(g) Implementation:** semantic `<table>` server component, zero JS — the gold standard for SSG + AI-legibility. `TRADE_TABLE` array in `claims.ts`. This table can also serve as the accessible twin for Viz 2 (DRY).

---

## ADDITIONAL VIZ (proposed — strengthen the education)

**A15 — RENTED vs OWNED ledger (paid = expense, organic = asset).** A two-column "balance sheet" diagram: Paid under "Liabilities/Rent" (recurring outflow, $0 residual value when you stop), Organic under "Assets/Equity" (appreciating, retains value). Pairs with the locked "site equity / appreciating asset" doctrine and the honest "2-4× not 13×" rail. Conceptual + a small residual-value-after-stopping bar (paid → 0, organic → retained). **Why:** reframes the whole spend decision in the buyer's own P&L language. MEASURED-adjacent (cite the 73% page-age durability); flag the multiple MODELED.

**A16 — ANATOMY OF AN ENTERPRISE PAGE (annotated exploded diagram).** A single "page" rendered as a labeled stack of its rankable layers (schema @graph · word-level AI-legible headings · internal-link mesh/no-orphan · CWV/INP budget · answer-first content block · service×location relevance). An exploded/annotated diagram, not a chart. **Why:** directly serves topic-map section 2 ("what an enterprise site IS") and is *self-demonstrating* — the diagram describes the very page it's on. Pure SVG/layout, fully accessible, zero honesty risk. Strong candidate for a flagship section.

**A17 — THE COMPOUNDING GAP (you vs frozen competitor, head-to-head over time).** Two trajectories: your authority site climbing vs the "worse site that still ranks" sitting on accumulated-but-static signals — and the moment momentum overtakes the static lead (topic-map section 4, "why your worse-site competitor still ranks → grandfathering is accumulated signals, not domain age"). A line chart where the competitor starts *ahead* and gets passed. **Why:** answers the #1 contractor objection ("but my competitor's ugly site outranks me") visually. ILLUSTRATIVE (label clearly); the *mechanism* (compounding vs static) is the defensible claim, not the exact curves.

**A18 — CHANNEL RISK/CONTROL QUADRANT (optional, lighter).** A 2×2: axes = "you control it" vs "it compounds." Organic lands top-right (owned + compounding), Paid bottom-left (rented + flat), GBP/map-pack mid (proximity-capped), referrals top-left. **Why:** one-glance strategic map that honors the full honesty frame (each channel placed truthfully — pack is proximity-capped, ads catch emergency). Conceptual, no fabricated numbers.

---

## CROSS-CUTTING IMPLEMENTATION + HONESTY SUMMARY

**Build order (priority):** Viz 1 (signature) · 14 (table) · 2 (bars) · 6 (page-age) · 10 (long-tail) · 3 (gap wall) · 8 (matrix) · 9 (geo-grid) — these are the highest-impact + most-MEASURED. Conceptual diagrams (12, 13, 7, A15-A18) are lighter lifts, build after.

**Shared infra to add:** a `lib/chart.ts` (pure scale/path/bar helpers, no JS shipped for static charts) + extend `lib/claims.ts` with typed, flag-carrying data exports (`TRADE_PAGES`, `GAP_WALL`, `CHANNEL_CPL`, `CPL_CURVE`, `CONVERSION`, `AEO`, `PAGE_AGE`, `LONGTAIL`, `JOURNEY`, `TRADE_TABLE`). One `<DataFigure>` shell component = `<figure>` + headline `<h3>` + SVG (aria-hidden) + `FlagChip` + `<details>` data-table twin + `<figcaption>` caption — every viz uses it for consistent accessibility/AI-legibility.

**LOAD-BEARING HONESTY CORRECTIONS to flag to Joseph (the brief's figures vs sourced reality):**
1. **"60% of SMBs have no dedicated site" is STALE/WRONG** — current is ~27% no site / ~83% HAVE one. Use ~27% MEASURED. (Viz 3)
2. **"99.5% of AI citations come from top-10 organic" is contradicted** — sourced finding: 88% of AI-cited URLs do NOT rank top-10. Reframe AEO to "AI is its own visibility surface you must structure for." (Viz 11)
3. **"Organic converts 2.4% vs paid 1.3%" is not cleanly sourceable and likely overstates organic** — benchmarks show paid equal-or-higher per-click on high-intent. Reframe: organic wins on cost + durable volume + trust, not a higher click-conversion rate; flag the paired numbers ILLUSTRATIVE; lead with the sourced "+27% conversions when running both channels." (Viz 5)
4. **"~94-day research window" has no contractor-specific source** — flag ILLUSTRATIVE; the defensible MEASURED anchors are "78% shortlist 3 vendors" and "95% of deals go to a Day-One shortlist." (Viz 7)
5. **Page-age is 72.9% (not 73) and #1 = 5 yrs** — both clean and MEASURED. (Viz 6)
6. **Geo-grid red→green fights the gold/black brand** — recommend a single-hue gold-intensity ramp (gold-deep→gold-bright) with rank numbers in-cell, and the customer-location personalization caveat as visible on-screen text. (Viz 9)

Every "them/baseline" series stays muted `#6b5a2e`/`gold-deep`; gold is reserved exclusively for the you/organic/authority/system series; every projected number wears its `FlagChip`; every chart ships a real `<table>`/`<dl>`/`<ol>` twin. This keeps the catalog SSG, AA-contrast, screen-reader-clean, and AI-legible — the site being its own proof.

**Sources:** [Ahrefs page-age study](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/) · [Ahrefs 96.55% zero-traffic](https://ahrefs.com/blog/search-traffic-study/) · [Ahrefs long-tail](https://ahrefs.com/blog/long-tail-keywords/) · [Ahrefs AI Overviews −58%](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/) · [WebAIM Million 2025](https://webaim.org/projects/million/2025) · [Clutch SMB websites 2025](https://clutch.co/resources/state-of-small-business-websites-2025) · [Gartner B2B buying journey](https://www.gartner.com/en/sales/insights/b2b-buying-journey) · [LocaliQ home-services search benchmarks 2025](https://localiq.com/blog/home-services-search-advertising-benchmarks/) · [Ruler Analytics conversion benchmarks](https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/) · [Geek Powered SEO vs LSA for contractors 2026](https://www.geekpoweredstudios.com/post/seo-vs-google-local-services-ads-contractors-2026)