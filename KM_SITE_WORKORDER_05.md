# KING MAKER FIRM SITE — WORK ORDER 05

*The MAXIMALIST POLISH + FLUIDITY overlay — **"Phase B.3."** Architect: WE15 · 2026-06-26 · Builder: NEW/COLD (reads the WO + the dossier + the codebase). Lineage: WO_03 (blue/white + readability) → WO_04 / Phase B.2 (the 5 home fold-ins, BUILT on-disk) → **05 / Phase B.3 (this — the visual + motion overlay)** → THEN Phase C (the site-wide guide-readability roll-out). Continues `king-maker-site/` (UNCOMMITTED; deploys via Vercel CLI).*

> **Source of truth for the vision:** `KM_SITE_MAXIMALIST_BRIEF.md` (Joseph's direction). This WO is the authoritative synthesis; the brief is the intent.
> **This is a VISUAL + MOTION OVERLAY — NOT a rewrite.** Do NOT change copy, page architecture, section order, anchor IDs, or links. You are flushing a clean-but-flat blue/white home into a **modern, polished, FLUID, dense, high-status asset that stays maximally readable.** Every section already exists and is built (WO_04). You are adding depth, motion, and structural density on top of it.

---

## 0. ⭐⭐ THE GOVERNING PRINCIPLE — the lens (internalize before editing)

**"JUST UNDER THE THRESHOLD OF OVERSTIMULATING."** Every motion choice and every density choice passes ONE binary test: **does it HELP the reader, or COMPETE with them?**

- The reader = a **50–60yo contractor**, often on a **phone**, skimming dense material. They must feel the site is *alive, substantial, premium* — and find reading it *effortless.* Never distracted, fatigued, or overwhelmed.
- **When in doubt, DIAL BACK.** "Full, not overstuffed." Fluid, not busy. Maximalist *and* disciplined — **that needle IS the job.** A choice that makes the page feel richer but makes a sentence harder to read FAILS the test.
- This is the standard the whole WO works to. If any directive below, executed literally, would tip a section into noise — execute it to the *standard* (help the reader), not the letter.

## 1. SCOPE + CADENCE

**Overlay, not teardown.** The home is built (`app/page.tsx`: Hero → GapSection → PageSystem → Dashboard → RawTechnicals → BookAppointment). You re-skin and animate it; you do not rebuild it.

**Two-stage cadence — HOME FIRST, then site-wide (this WO covers stage 1 only):**
1. **STAGE 1 (this WO):** Build the maximalist **DESIGN SYSTEM** (global tokens + primitives in `app/globals.css` + `components/motion.tsx` — EXTEND, never replace) **+ apply it to the HOME only** (the showcase). → 🛑 **DESIGN-DIRECTION CHECKPOINT** (§7): deploy to prod + report for **Joseph's eyeball BEFORE propagating.**
2. **STAGE 2 (a LATER WO — do NOT start it here):** Propagate the system site-wide (the `/guides` cluster + all ~30 pages) — dovetails with the WO_03 Phase-C readability roll-out. **Stop at the checkpoint.** Do not touch any page other than the home in this WO.

## 2. THE MAXIMALIST DESIGN SYSTEM (build this FIRST — `globals.css` + `motion.tsx`)

The motion foundation **already exists and is disciplined** — `motion.tsx` ships `Reveal`, `Stagger`/`StaggerItem`, `CountUp`, `TypeIn` (word-level), `DrawLine`, `Eyebrow`, all gated on `useReducedMotionSafe()` + `viewport once`. **EXTEND it.** Do not rewrite the primitives; add the missing pieces and apply them consistently.

### 2A · DEPTH primitives (off the flat/wireframe) — `globals.css`
- **Thin, crisp, semi-transparent borders.** Layering borders use the line token at reduced opacity (`border-line/60`-style) — crisp, never heavy black. Keep square corners (institutional lock).
- **Layered surfaces.** White cards (`bg-surface`) sit on faint tint **section bands** to break flat solid white — the existing `bg-tint` (#f8fafc) alternation + the blue `--color-blue-tint` (#eff6ff) as the occasional accent wash. A *whisper* of variation — **NOT glows, NOT glass, NOT gradients** (beyond the one existing disciplined hairline + the single `km-aura`).
- **Unified hover-lift** (`.km-card-hover` recipe, or a documented class set) for every interactive card: `hover:-translate-y-1` + border-shift (`border-line` → `border-blue/40`) + soft shadow-on-lift (use the existing `--shadow-lift` / `--shadow-blue` tokens) + arrow-reveal on text links (`group-hover:translate-x-1`), all `transition-[transform,box-shadow,border-color] ~300ms ease-out`. (PageSystem + RawTechnicals already do this — make it consistent across ALL cards.)
- **Code-housing** (`.km-code` recipe): the technical code teasers sit in a styled housing block. RawTechnicals' current deep-blue field (`bg-blue-deep` #172554 + `text-blue-100`) IS the approved "ONE restrained dark accent block" — **keep it; do NOT go slate-950 / emerald / dark-everywhere.**
- **Typographic contrast:** Archivo extrabold tracking-tight H1/H2 (present) + the `Eyebrow` (drawn blue hairline + uppercase tracking-widest small-caps, present) above every section header. Keep the scale locked to `.km-h1/h2/h3` — readable, not oversized.
- **Tabular MONO for all data** (`km-tabular` + `km-mono`, present): every stat / axis number / spec token. Make it universal.

### 2B · FLUIDITY primitives (in-viewport scroll motion) — `motion.tsx`
- **REUSE the existing** `Reveal` (fade + translate-up), `Stagger`/`StaggerItem` (staggered children), `CountUp` (scroll-in count-up), `TypeIn` (word-level heading), `DrawLine`. These are the backbone — apply them consistently (§3).
- **ADD `Parallax`** — a wrapper using `useScroll` + `useTransform` for a **very gentle** background/element drift (translateY ceiling **±24px**, never more), reduced-motion-safe (returns a static element when reduced). Used ONLY on the hero + 1–2 section background accents. Strict low ceiling = anti-overstimulation.
- The chart-draw (SVG `pathLength`) + bar-grow already live inline in `Dashboard` — **reuse that pattern**; only generalize into a primitive if a new section needs an SVG draw (none does here).
- 🔴 **THE DISCIPLINE — encode it, it is the #1 risk of this WO:**
  - **One-shot only** (`viewport={{ once: true }}` everywhere — never re-animate on a scroll-by).
  - **`prefers-reduced-motion` → freeze to FINAL state** (full content visible, stats at final value, chart drawn, no parallax). Content must NEVER be trapped behind an animation.
  - Durations ~300–600ms (reveals up to ~700ms ok), ease-out (`ENTER_EASE`).
  - **NO continuous / looping / auto-playing motion** that wiggles while someone reads. (The old `km-marquee` belonged to the cut trust-bar — it is unused on the home; do not reintroduce any loop.)
  - Motion **assists the reading rhythm** (content arrives as you reach it) — it never competes with the text.

### 2C · APPLICATION conventions (make these universal on the home)
- Every **section header** = `Eyebrow` + `TypeIn` h2 (word-level) + `Reveal` lede.
- Every **card grid** = `Stagger` + `StaggerItem`.
- Every **headline number/stat** = `CountUp` (this is the gap to close — see §3).
- Every **interactive card** = the unified hover-lift.
- **Gentle parallax** = hero + at most 1–2 section background accents. Nowhere else.

## 3. PER-SECTION OVERLAY DIRECTIVES (copy + anchors PRESERVED — add depth/motion only)

**① Hero** *(no anchor)* — flush the flattest section. Add **gentle `Parallax`** to the crest + the single `km-aura` (subtle drift on scroll, ±24px ceiling). Lift it off flat white with one layered/framing touch (keep the ONE-aura rule — anti glow-soup). Keep `TypeIn "WE MAKE KINGS"`, the `Reveal` lede + sequence, both CTAs, and the "We scanned 1,017 contractor sites" seal — **verbatim.**

**② GapSection** *(`#problem`)* — **the agency showcase; make it sing.** (a) The four big red percentages → **`CountUp`** (count to 57 / 70 / 56 / 71, `%` suffix, red `#dc2626`, tabular). (b) Add the **hover-lift** to the two-part cards (subtle — informational, so a gentle lift + border-shift; never hurts readability). (c) Deepen the two-part-card depth (red top-accent header card + info card — keep the structure; add shadow-on-lift). (d) Keep the `Stagger` reveal, the `FlagChip`, the "absence, not fakes" line, and the reference-build line — **verbatim.** Preserve the `#problem` section + its `<h2>` (schema `speakable` references `#problem h2`).

**③ PageSystem** *(`#proof`)* — **the biggest density win.** (a) Convert the uniform 11-card grid → a **structured BENTO / geometric grid**: make **"Location pages — the lever"** a **featured anchor cell** (larger / spans more / tint + accent outline) so the eye lands on the lever; the other 10 categories in a clean geometric grid around it. Dense but ordered — *structure, not clutter.* (b) The **15×** anchor → `CountUp`. (c) Keep the existing hover-lift, the icons, the "the lever" badge. (d) Preserve all 11 categories + examples + the `#proof` `<h2>` (schema `speakable`) — **verbatim.** Mobile: bento collapses to clean single-column.

**④ Dashboard** *(no anchor)* — **already fully fluid** (chart draws via `pathLength`, `CountUp` stats, bars grow). **Overlay = depth polish ONLY.** Give the instrument panel the crisp layered-surface treatment (borders, the hairline, shadow off the band). 🔴 **Do NOT add parallax or any extra motion to the chart** — it is an instrument; this is where "motion must not compete" bites hardest. Keep every existing animation + the worked-example copy + `FlagChip` + the "illustrative of the model, not a forecast" honesty line — **verbatim.**

**⑤ RawTechnicals** *(`#system`)* — **already strong** (hover-lift, the deep-blue code-housing, PROOF cards). **Overlay = consistency polish:** unify the code teaser under the `.km-code` housing, confirm hover-lift + eyebrow/type-contrast match the system. Keep the 01/02/03 cards, the mono code teasers (they must stay **TRUE** of this site), the PROOF lines, and the `#system` anchor — **verbatim.**

**⑥ BookAppointment** *(`#book`)* — the conversion point: **keep it CALM.** Add depth to the form card (crisp border + shadow-on-lift) and a subtle `Reveal`/`Stagger` on the "what you get" checklist. 🔴 **No parallax, no distracting motion near the form** — nothing should move while someone is filling it out. Preserve every field, the trade dropdown, the "one contractor per market" scarcity line, the `#book` anchor, and the `/api/lead` POST contract — **verbatim.**

## 4. CROSS-CUTTING
- **Band rhythm:** ensure **consecutive same-tone sections don't blur** into one flat white wall (Dashboard + RawTechnicals are both `bg`-toned) — separate them with a divider, a tint shift, or a band. This is "layered surfaces breaking flat white" in practice.
- **MOBILE stays airy + readable** (the priority surface): every dense desktop layout (bento, multi-column) collapses to a clean single column; motion stays gentle; the `~17px / 1.7`, short-measure readability system (WO_03) is untouched. A 55yo on a phone must never feel overwhelmed.
- **Fix to the STANDARD, extrapolate:** a hover/reveal/depth treatment defined once applies to every equivalent element on the home — don't half-apply it.

## 5. 🔒 PRESERVE / DON'T-BREAK (the locks)
- 🔒 **COPY — every word verbatim.** Page **architecture + section order + anchor IDs** (`#problem`, `#proof`, `#system`, `#book`) + all links/hrefs. This is an overlay; zero rewrites.
- 🔒 **BLUE/WHITE + MAX READABILITY. NOT dark.** A dark "premium SaaS" overlay (slate-900/950, glass-blur, glows, emerald) was **explicitly rejected** — it fights readability for this audience + breaks the no-glass/no-gradient brand rule. Palette locked: ink `#0f172a` · blue `#1d4ed8` · action `#2563eb` · deep `#172554` · **red `#dc2626` = damage** · tint `#eff6ff` · white/slate base.
- 🔒 **INDUSTRY-NEUTRAL site-wide** — no roofing-specific terms (Asphalt/GAF/Hail/Storm) in the neutral sections; roofers = the audit *sample* only.
- 🔒 **AI-LEGIBILITY = word-level `TypeIn` only** (never per-letter — it fragments rendered text for crawlers/AI). The heading-legibility Playwright gate stays green (static + rendered innerText + AI-extraction N/N).
- 🔒 The **WO_04 fold-in structure** (the 4 red two-part gap cards · the 11 neutral page-categories + the 15× · the 01/02/03 raw-technicals + code teasers · the book-an-appointment form). Don't undo a fold-in.
- 🔒 **Schema @graph + llms.txt + SSG + technical-SEO-as-proof** (RawTechnicals' PROOF claims must stay literally true — the site still passes its own audit). 🔒 **FlagChip MEASURED/MODELED honesty** (no debunked stat; the 1,017 numbers are static-HTML-MEASURED, conversion DIRECTIONAL).
- 🔒 The **two-font system** + the **security layer** — do NOT clobber `cyber-security-specialist-1`'s files (`app/api/lead`, `lib/server/*`, `next.config.ts`, `scripts/security-audit.mjs`). 🔒 The global reduced-motion `@media` rule in `globals.css`.

## 6. VERIFICATION GATES (before "done" — pixels + deployed content, not DOM/200)
- `tsc --noEmit` 0 errors · `next build` all SSG routes compile.
- Playwright **desktop + mobile (390px)**: **axe 0 serious** + **contrast AA** — verify red-on-white (`#dc2626`) AND blue-on-white (`#1d4ed8`/`#2563eb`) both pass, including the count-up FINAL states + hover states.
- **heading-legibility spec GREEN** (word-level `TypeIn` intact; static + rendered innerText + AI-extraction N/N clean).
- 🔴 **REDUCED-MOTION GATE (load-bearing — the #1 risk of a fluidity overlay):** with `prefers-reduced-motion: reduce`, EVERY animation freezes to its FINAL state — all content visible, all stats at final value, the chart fully drawn, no parallax, **nothing trapped at 0-opacity / off-position.** Capture a reduced-motion screenshot; confirm nothing is missing or clipped.
- 🔴 **ONE-SHOT GATE:** scroll past every section twice — **nothing re-animates**, no continuous/looping/wiggling motion anywhere.
- **MOBILE readability pass** — the home reads clean one-handed; bento/multi-col collapsed to single column; motion gentle; the 17px/1.7 system intact.
- **grep gates** — no roofing-specific terms in the neutral sections · no stale "143" · the cut sections (trust-bar marquee, ProofBar, TrustMove, Selectivity) stay cut.
- **OVERSTIMULATION self-check** (the §0 lens): render the finished home and ask, section by section — does any motion or density choice COMPETE with reading? Dial back any that does.
- **PIXELS vision pass** — premium + fluid + dense + readable; off the flat/wireframe feel; red reads as "bad"; "full, not overstuffed."
- **DEPLOYED-render + 0 orphans + the PROD-STALE check** — fetch the deployed HTML and confirm the prod alias actually serves THIS build (palette grep `#1d4ed8` + the markers "1,017" / "Book my appointment"). The prod alias was stale before — do not trust it; verify the bytes.
- `/api/lead` POST contract intact (the form still posts). Real-sink wiring is tracked in WO_04 §1 — note if it is still the `{ok:true}` no-op.

## 7. 🛑 THE CHECKPOINT + PROD-STALE HANDLING
1. Build the design system + apply to the HOME only.
2. Run ALL §6 gates green.
3. **Deploy to prod via Vercel CLI** (`cd king-maker-site && npm run build && npx --yes vercel@latest deploy --prod --yes` → `kingmaker-firm.vercel.app`). ⚠️ The prod alias was **STALE** — after deploy, fetch the live HTML and confirm it serves the maximalist blue/white build (the palette + marker grep above), not the old gold/cream.
4. **🛑 STOP. Report for Joseph's eyeball** (live URL + per-section evidence + the reduced-motion + mobile captures). Do **NOT** propagate the system to the guides or any other page until he approves. The HOME is the design-direction proof; his eyeball is the final gate. He iterates hard on design — expect a round.

---
*— WE15, 2026-06-26. WO_05 / Phase B.3: the maximalist polish + fluidity + density overlay on the home — premium depth (off the wireframe), in-viewport fluidity (one-shot, reduced-motion-safe), structural density — ALL calibrated **just under the overstimulation line** (does it HELP the reader or COMPETE). Blue/white locked, overlay-not-rewrite, copy/architecture/anchors verbatim, word-level headings, industry-neutral. EXTEND `motion.tsx` + `globals.css`; build the system + HOME → deploy to prod (mind the stale alias) → 🛑 Joseph checkpoint BEFORE site-wide. Carries WO_03 + WO_04 + the locks forward. Joseph's eyeball is the final gate.*
