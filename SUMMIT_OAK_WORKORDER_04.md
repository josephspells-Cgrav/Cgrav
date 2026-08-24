# WORK ORDER 04 — Summit & Oak (micro-polish: hero orphan + price consistency)

**From:** WE10 (architect) · **To:** Builder (WARM — current) · **Date:** 2026-06-17
**Compounds on:** WO_01–03. Tiny pass — 2 items, touch nothing else.

## 1. THE TWO FIXES
- **A · Hero H1 orphan.** "Storm Damage in Raleigh? We Respond 24/7." strands **"24/7."** alone on its own line on mobile. Apply the no-orphan/widow rule (WO_02 §1b) to the HERO H1 — `text-wrap: balance` + a non-breaking space binding the last two words (e.g. "Respond&nbsp;24/7."). **Audit EVERY page's hero H1** for the same and fix all — the rule must cover heroes, not just section headings.
- **B · Price-range consistency.** The hero price anchor must read **identical** on desktop + mobile and on every page/section that shows it. (Audit flagged desktop "$8k–$26k" vs mobile "$9k–$26k"; the DOM read $9k on desktop — verify the true intended value, then make ALL instances match from a single source of truth, e.g. one constant.)

## 2. VERIFICATION
- Every hero H1, desktop + mobile: no stranded single-word last line.
- Price range string identical across all breakpoints + all pages/sections.
- build green · render every route (200 + 0 errors + correct content) · PIXELS · axe 0-serious · mobile + reduced-motion · deployed-content check.

## 3. PRESERVE
Everything — this is micro-polish. Touch only the hero H1 wrap and the price string. Do NOT regress balance, conversion, the in-fold decide-inputs, or any copy.

Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the live URL + confirmation of both fixes + verification.
