# KING MAKER FIRM SITE — WORK ORDER 06

*The MAXIMALIST TRANSFORMATION — deliver it for real. **"Phase B.3b."** Architect: WE15 · 2026-06-26 · Builder: **NEW / COLD** (fresh session; full reread). Lineage: WO_05 (maximalist overlay — shipped, but only **~10-20%** of the vision landed) → **06 (deliver the full transformation the first pass missed)**. Continues `king-maker-site/` (UNCOMMITTED; deploys via Vercel CLI). Source vision: `KM_SITE_MAXIMALIST_BRIEF.md` + `KM_SITE_WORKORDER_05.md` (read both — 05 is the full maximalist spec; 06 says **execute it for real, motion-first**).*

> **🔴 WHY THIS WO EXISTS — read carefully.** WO_05 specified a maximalist polish + fluidity + density transformation. The first builder delivered **~10-20% of it** (Joseph's eyeball — the final gate). At a glance the site **did not visibly change** — it still reads as the pre-maximalist blue/white wireframe with a few subtle tweaks (a 24px parallax drift, count-up numbers, one `col-span-2` cell, a hover-lift). Those exist in code + are live on prod (prod is NOT stale — verified), but they're imperceptible. **Root cause: skill-invocation drift** — the builder never loaded `framer-motion` / `design-motion-principles` / the design arsenal, so it did shallow, mechanical work. That hole is now closed: the skills-gate v2 mechanically blocks UI edits until the skills are actually invoked (verified live this session). **Your job: DELIVER THE TRANSFORMATION — depth + density + motion — aggressively enough that Joseph says "yeah, that clearly changed."** The bar is a visible, obvious transformation, not incremental polish.

---

## 0. ⭐⭐ THE LENS + THE BAR
- **THE BAR (how you know you succeeded):** capture the current deployed home as a BEFORE; after your pass, the AFTER must be **obviously, substantially different** — premium, dense, alive — to a contractor glancing at it. 10-20% is failure. A clear before/after delta is the target.
- **AGGRESSIVE ON THE SKIN, CONSERVATIVE ON THE BONES.** Transform the VISUAL + MOTION layer hard (this is a redesign-existing-projects upgrade — audit current → kill generic/flat patterns → apply premium standards). But do NOT rewrite the COPY, page architecture, section order, or anchor IDs — preserve the bones exactly (§3).
- **THE OVERSTIMULATION THRESHOLD — "help the reader or compete?"** Maximalist *and* disciplined, for a 50-60yo contractor on mobile. Density via STRUCTURE, not clutter. When in doubt, dial back — but "dialed back" is NOT "barely changed." Premium + dense + readable, all at once.
- **GOLDEN RULE OF MOTION (Jakub-primary for a marketing site):** depth = *orchestration + craft*, not more things moving. One well-timed, layered reveal per section beats scattered micro-motion. Never distract a reader.
- 🔴 **SKILL-INVOCATION DISCIPLINE (the fix for the 10-20%).** BEFORE any motion code, actually INVOKE (Skill tool, not name-drop) `framer-motion` + `design-motion-principles`. BEFORE any UI edit, the 6 design skills (`impeccable`, `design-taste-frontend`, `frontend-design`, `ui-ux-pro-max`, `high-end-visual-design`, `gpt-taste`). BEFORE any done-claim, `verify-before-claim`. The gate now ENFORCES this — own it anyway.

## 1. WHAT EXISTS — REUSE THE PRIMITIVES, TRANSFORM THE SECTIONS
`components/motion.tsx` ships good primitives (all `viewport once` + reduced-motion-safe): `Reveal`, `Stagger`/`StaggerItem`, `CountUp`, `TypeIn` (word-level — AI-legibility lock), `DrawLine`, `Eyebrow`, `Parallax` (capped ±24px). **REUSE these — don't rebuild them.** The failure wasn't the primitives; it was that the SECTIONS got a token application instead of a real transformation. Extend/compose the primitives richly; build new section structure where the brief calls for it.

## 2. THE TRANSFORMATION (the real work — all 3 WO_05 pillars, motion-first)

### 2A · STEP ONE — BASELINE + LIVE-DIAGNOSE (before changing anything)
Render the DEPLOYED site (`kingmaker-firm.vercel.app`) in a real browser (Playwright / Chrome MCP), desktop + mobile 390px. **Capture the BEFORE** (you'll prove the after clearly differs). While there, catch the suppression traps that can make work invisible: **count-ups stuck at 0** (they SSR at 0, animate only on client mount + in-view; if `whileInView` never fires they stay "0%"), `whileInView` blocks that never appear (the "screenshot = false void" trap), reduced-motion false-positives. Fix suppression first — a stuck count-up is a bug, not a depth problem.

### 2B · PILLAR 1 — PREMIUM DEPTH (off the wireframe — this is most of the "didn't change")
Per `impeccable` / `high-end-visual-design` / `frontend-design`, adapted to the square-corner blue/white brand: real **typographic contrast** (Archivo extrabold tight headers + tracking-widest small-caps eyebrows); **layered surfaces** (white cards on faint tint section bands — a "tray" depth via crisp semi-transparent borders + tinted shadow-on-lift, NOT glass); **unified hover-lift** on every interactive card (transform + shadow + border-shift, no layout shift, cursor-pointer); the **code-housing** treatment on the technical teasers; **tabular mono** on all data. The page should read **agency-grade, not template** — that's the gap to close.

### 2C · PILLAR 2 — MOTION (the priority — choreograph real depth, don't sprinkle)
Build ON the primitives. Per `framer-motion` + `design-motion-principles`:
- **Hero** — a real orchestrated entrance (eyebrow → TypeIn → lede → CTAs → seal), each with the Jakub recipe (`opacity + translateY:8 + blur(4px)` → settled, ease-out ~450-600ms, no bounce); layered gentle Parallax depth (capped).
- **Per section** — one deliberate staggered reveal (cards cascade with intent, not all-at-once); count-ups that actually fire to real values; hover-lift everywhere.
- **Dashboard** — make the win-line draw THE climax moment (line draws → area fills → marker pops → numbers count, sequenced). 🔴 No parallax / no extra motion ON the chart while reading.
- **BookAppointment** — CALM (conversion point): gentle reveal on the value list; the form stays still; no parallax near it.
- **Discipline (cross-skill consensus):** transform + opacity ONLY (never width/height/top/left/box-shadow → use `filter: drop-shadow()` / pseudo-element); **MotionValues** for scroll/parallax (NEVER `useState` per frame); `whileInView` + `viewport once`; ease-out `ENTER_EASE`; ~300-600ms (reveals ≤ ~700ms); `"use client"` on motion files; one-shot only; reduced-motion freezes to final state.

### 2D · PILLAR 3 — DENSITY (structure, not clutter)
Fill the wireframe-y space with STRUCTURE + visual anchors. **PageSystem → a real gapless BENTO** (`grid-flow-dense`, the "Location pages — the lever" cell featured/anchored, zero empty cells, staggered in). Multi-column rhythm, dividers, eyebrows, badges, stat blocks where they earn it. Mobile collapses dense layouts to clean single-column. "Full, not overstuffed."

### 2E · WHERE THE LOUD SKILLS ARE WRONG FOR THIS BRAND (reject these defaults)
`design-taste-frontend` / `high-end-visual-design` / `gpt-taste` push **perpetual/infinite micro-motion** (Float/Pulse/Shimmer/marquee), **dark/glass/squircle**, and **GSAP**. ALL OUT: NO continuous/looping/auto-playing motion (overstimulation lock); NOT dark, no glass, no gradient, **square corners** (brand lock); framer-motion only (no GSAP). Harvest their depth/stagger/hover/bento/spacing craft; drop their aesthetics + their perpetual motion.

## 3. 🔒 PRESERVE / LOCKS (the bones — verbatim)
COPY · page architecture · section order · anchor IDs (`#problem`/`#proof`/`#system`/`#book`) · links — EXACTLY intact. **BLUE/WHITE + MAX READABILITY, NOT dark** (the dark "premium SaaS" overlay was explicitly rejected; no glass, no gradient, square corners, the two-font system). **INDUSTRY-NEUTRAL.** **Word-level `TypeIn` only** (heading-legibility gate green). The WO_04 fold-in structure. Schema @graph + llms.txt + SSR + technical-SEO-as-proof (RawTechnicals claims stay TRUE). FlagChip MEASURED/MODELED honesty. The `cyber-security-specialist-1` files (`app/api/lead`, `lib/server/*`, `next.config.ts`, `scripts/security-audit.mjs`). The global reduced-motion `@media` rule. Reuse the motion primitives — don't rebuild them. *(Minor flag: `"One King"` still appears on prod — likely leftover selectivity copy F5 meant to cut; confirm + neutralize if so.)*

## 4. VERIFICATION GATES (pixels + DEPLOYED behavior, not code)
- `tsc` 0 · `next build` all SSG.
- 🔴 **OBVIOUS TRANSFORMATION:** before/after of the deployed home shows a clear, substantial visual change (depth + density + motion) — not 10-20%. If a glance doesn't read "this clearly changed," it's not done.
- 🔴 **LIVE MOTION FIRES:** on the DEPLOYED page (desktop + mobile 390px), scroll through — reveals animate, the gap %s / 15× / dashboard numbers count to REAL values (not stuck at 0), the win-line draws, parallax drifts. Code-present ≠ live-firing. Capture evidence.
- 🔴 **REDUCED-MOTION:** every animation freezes to final state; all content + final numbers visible; nothing trapped at 0.
- 🔴 **ONE-SHOT:** scroll past twice — nothing re-animates; no looping motion.
- Playwright desktop + mobile: **axe 0 serious + contrast AA** (red-on-white + blue-on-white) · **heading-legibility green** · mobile readability + gentle motion · cursor-pointer + no hover layout-shift.
- grep gates (no roofing terms in neutral sections · no stale "143" · cut sections stay cut).
- **DEPLOYED-render + prod-byte-check:** after deploy, fetch live HTML, confirm the new build serves (palette `#1d4ed8` + markers).

## 5. 🛑 CADENCE + CHECKPOINT
Invoke the skills → baseline + live-diagnose → **transform the HOME** (depth + density + motion) → run §4 gates (incl. obvious-transformation + live-fires) → **deploy to prod** (`cd king-maker-site && npm run build && npx --yes vercel@latest deploy --prod --yes`) → verify on the live alias that it CLEARLY changed → **🛑 STOP, report for Joseph's eyeball** (live URL + before/after + what now animates per section + reduced-motion + mobile evidence). Do NOT propagate site-wide until he approves. His eyeball is the final gate and OVERRIDES "looks done in code" — the 10-20% miss is exactly why.

---
*— WE15, 2026-06-26. WO_06 / Phase B.3b: DELIVER the maximalist transformation WO_05 only 10-20% landed (skill-drift root cause, now mechanically fixed + verified). Aggressive on the visual/motion skin (depth + density + motion, motion-first, per the full arsenal — Jakub-primary restraint, golden-rule), conservative on the bones (copy/architecture/anchors/locks verbatim). Reject perpetual-motion + dark/glass/GSAP. Baseline + live-diagnose first; verify the home OBVIOUSLY changed + the motion FIRES on the deployed page. Invoke the skill arsenal FIRST. 🛑 Joseph checkpoint before site-wide.*
