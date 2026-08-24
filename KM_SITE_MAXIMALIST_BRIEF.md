# KM FIRM SITE — DIRECTION BRIEF: the MAXIMALIST POLISH + FLUIDITY pass

*For Website Engineer 15. From WE14 (relaying Joseph's direction), 2026-06-26. This is a DIRECTION/VISION brief — you turn it into a work order + launch-builder. Not the WO itself.*

> You're already oriented (the WE15 handoff). Ultrathink-reread THIS brief in a loop until a pass surfaces no new information (min 3 passes), then scope a WO (carrying the WO_04 home fold-ins + the locks forward) and invoke the **launch-builder** skill to hand it to the builder. **This is a VISUAL + MOTION overlay — do NOT change copy, page architecture, or anchor IDs.**

---

## THE VISION (one line)
The blue/white site is clean but reads a little **flat / wireframe-y.** Flush it out into a **modern, polished, FLUID, dense, high-status digital asset** — while keeping it **maximally readable.** Make it feel *alive and substantial*, but make reading it feel *effortless.*

## ⭐⭐ THE GOVERNING RULE — "JUST UNDER THE THRESHOLD OF OVERSTIMULATING"
This is the calibration, and it must be **as explicit as the ambition** (or the builder overshoots into noise). Every motion choice and every density choice passes ONE test: **does it HELP the reader, or COMPETE with them?** The site should feel fluid, dense, premium — but a 50-60yo contractor scanning it (often on a phone) must never feel distracted, fatigued, or overwhelmed. When in doubt, **dial back.** "Full, not overstuffed." Fluid, not busy. Maximalist *and* disciplined — that needle IS the job.

## 🔒 HELD CONSTANT (locked — do NOT touch)
- **BLUE/WHITE + MAXIMUM READABILITY.** NOT dark. (A dark "premium SaaS" overlay — slate-900/950, glass-blur, glows, emerald — was explicitly rejected: dark + glass fights readability for this audience and breaks the no-glass/no-gradient brand rule.) Body ~17px / 1.7, ~65ch prose, bullets, plain English, **MOBILE-FIRST** (the priority surface).
- **INDUSTRY-NEUTRAL site-wide** (every contractor trade; roofers = the audit *sample* only).
- **COPY, page ARCHITECTURE, ANCHOR IDs (`#problem` etc.), and links — EXACTLY intact.** Overlay only; zero rewrites.
- **AI-LEGIBILITY:** word-level heading reveals only (never per-letter — it fragments text for crawlers/AI; keep the heading-legibility gate green).
- The palette: ink `#0f172a` · brand `#1d4ed8` · action `#2563eb` · deep `#172554` · **red `#dc2626` = damage** · tint `#eff6ff` · white/slate base.

## PILLAR 1 — PREMIUM DEPTH (off the flat/wireframe)
- **Typographic contrast:** Archivo extrabold, tracking-tight headers + uppercase **tracking-widest small-caps eyebrows** above them (structural rhythm).
- **Thin, crisp, semi-transparent borders** (light: `border-slate-200/60`) — never heavy black. **Layered surfaces** (white cards on faint `#eff6ff`-tint section bands) to break flat solid white — a whisper of variation, NOT glows/glass.
- **Hover micro-interactions** on every interactive card: smooth lift (`hover:-translate-y-1`) + border-shift + a soft shadow-on-lift + arrow-reveal on text links (`group-hover:translate-x-1`), `transition-all ~300ms ease-out`.
- **Bento / geometric grid** for the dense areas — especially the 11-component "what we build" section (a flat 11-item list is messy; a structured grid reads premium). **Highlight "Location pages = the lever"** with an accent outline / tint to anchor the eye.
- **Tabular MONO** for all data values (the dashboard, the stats — analytical/proof tone). Wrap the technical code teasers (the raw-technicals section) in a **styled code-housing block** (light, or ONE restrained dark accent block — not slate-950/emerald everywhere).
- **Mined from a Gemini source prompt, translated to light:** keep its type contrast, hover micro-interactions, bento grid, mono data, code-housing, two-column CTA. **DROP** its dark surfaces (→ white/tint), its emerald (→ blue/ink), its glass-blur + radial glows.

## PILLAR 2 — FLUIDITY (in-viewport scroll motion — framer-motion is in the stack)
- **In-viewport reveal** on sections/cards/stats: fade + gentle translate-up as they enter the viewport; **staggered children** (cards reveal in sequence). The win-line chart **draws** on scroll-in; the stat numbers **count up** when they enter view.
- **Very gentle parallax / layered movement** on hero + section backgrounds (subtle — under overstimulation).
- 🔴 **THE DISCIPLINE (critical):** **one-shot only** (`viewport once` — never re-animate on every scroll-by); **honor `prefers-reduced-motion`** (freeze to final state); durations ~300-600ms, ease-out; **NO continuous / looping / auto-playing motion** that wiggles while someone is reading. Motion **assists the reading rhythm** (content arrives as you reach it) — it never competes with the text. A reader scanning a guide must never be distracted by motion.

## PILLAR 3 — DENSITY (add density — same under-overstimulation rule)
- **Fill the naked/wireframe space with STRUCTURE + visual anchors** (bento grids, multi-column layouts, data-viz, stat blocks, code-housing, dividers, eyebrows, badges) so sections feel full and substantial, not sparse.
- **Density via structure + rhythm, NOT clutter:** purposeful whitespace, clear grids, strong hierarchy. "Full, not overstuffed."
- **MOBILE stays airy + readable:** dense desktop layouts collapse to clean single-column on mobile. Density must never overwhelm a 55yo contractor on a phone.

## SCOPE + CADENCE (for your WO)
- Establish the maximalist **DESIGN SYSTEM** (global tokens: the type contrast, the border/shadow/hover primitives, the motion primitives — extend `components/motion.tsx` + `app/globals.css`) + apply it to the **HOME first** (the showcase). Then propagate site-wide (the guides + all pages — dovetails with the WO_03 Phase-C readability roll-out).
- 🛑 **DESIGN-DIRECTION CHECKPOINT:** build the system + the polished/fluid HOME → deploy + report for **Joseph's eyeball BEFORE propagating** to all ~30+ pages. He iterates hard on design; his eyeball is the final gate.
- ⚠️ **PROD-STALE trap:** the current blue/white work is **on-disk (`king-maker-site/`, uncommitted) + a preview**, NOT on the prod alias — verify the right surface; **promote to prod** at the checkpoint.

## REFERENCE
`KM_SITE_WORKORDER_04.md` (the home fold-ins) + `KM_SITE_WO03_PHASE_C_FOLDINS.md` (the F1-F5 detail) · `KM_SITE_WORKORDER_03.md` (the blue/white + readability system) · the on-disk `king-maker-site/` build (`components/home/*`, `globals.css`, `motion.tsx`) · the WE15 handoff `AGENT-WEBSITE-ENGINEER-15-2026-06-26.md`.

---
*— Direction brief. Maximalist polish + fluidity + density, all just under the overstimulation line, blue/white, maximally readable, overlay-not-rewrite. Ultrathink it → WO → launch-builder → checkpoint on the HOME. Joseph's eyeball is the final gate.*
