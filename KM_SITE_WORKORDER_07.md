# KING MAKER FIRM SITE — WORK ORDER 07

*The concrete maximalist edit batch — Joseph's 8 section-by-section drops. **"Phase B.3c."** Architect: WE15 · 2026-06-26 · Builder: **WARM** (you hold the codebase + WO_04/05/06 + the brief in context — reread ONLY this WO). Lineage: WO_05 (overlay, shallow) → WO_06 (deliver-it-for-real framing) → **07 (the exact edits, from Joseph eyeballing the deployed home)**. Continues `king-maker-site/` (UNCOMMITTED; Vercel CLI deploy). Read alongside: `KM_SITE_WORKORDER_06.md` (the lens + the "obviously changed" bar) + `KM_SITE_MAXIMALIST_BRIEF.md`.*

> These are Joseph's literal edits after seeing the deployed site. Each is concrete + checkable. Execute ALL of them. The bar (WO_06): the home must **obviously, substantially change** — premium, dense, alive — not another 10-20%.

---

## 0. ⭐⭐ THE LENS + THE ANTI-DRIFT MANDATE
- **The standard:** deliver the maximalist transformation FOR REAL — premium depth + alive motion + real density — **through the shared primitives** (so it propagates), **on-brand** (blue = structure/brand, red = damage only), **AI-legible**, and **just under the overstimulation threshold** (`feedback_overstimulation_threshold` — help the reader, never compete; for a 50-60yo on mobile). Density via STRUCTURE, not clutter. Premium AND readable, both.
- ⭐ **COMPONENT-FIRST (Joseph, 2026-06-26 — operating-model shift; `feedback_component_first_builds`).** Don't handcraft what already exists. Where a solved component fits, SCAFFOLD it from a library (Magic MCP / templates) and **edit from there** ("flush it out our own way") instead of building from scratch. The bar is **legible + polished + client-serving + fast** — standard agency components are fine. RELAX the anti-generic / every-pixel-bespoke purism + the strict-square aesthetic. KEEP the functional floor (readability · AI-legibility · don't-overwhelm · mobile · blue/white brand). This also cuts skill-drift — the skills EDIT/POLISH grabbed components, not generate novel ones. (NOTE: WO_07's motion edits — typewriter/underlines/count-ups — stay bespoke; no library ships those. The clear component-first win = the Dashboard via Magic.)
- 🔴🔴 **CONTINUOUS SKILL INVOCATION (Joseph's explicit, emphatic ask — do not drift).** The first pass failed because the builder stopped using the skills mid-build. THIS pass: **re-invoke the relevant skill (via the Skill tool) BEFORE each edit group** per the §4 map — not once-at-the-start-and-coast. The skills-gate is now LIVE + enforcing (it blocks a UI edit until the skills are invoked this session — expected, not a bug), but the gate only guarantees at-least-once; YOU must keep the guidance fresh per edit. Re-read the relevant skill's guidance before each new edit type. Invoking ≠ name-dropping. `verify-before-claim` before any done-claim.

## 1. SITE-WIDE PRIMITIVE CHANGES — DO THESE FIRST (they propagate to every page)
These three are component-level, so one change updates the whole site. Joseph asked for the typewriter + eyebrow **site-wide** ("goes through the entire website").

**P1 · `TypeIn` → AI-SAFE TYPEWRITER + blinking caret** *(Edits 4 + 5; replaces the word-blur reveal everywhere TypeIn is used — the hero H1 + every section H2).*
- 🔴 **AI-LEGIBILITY IS THE #1 RISK — build it the safe way ONLY.** A naive per-letter (inline-block span) typewriter FRAGMENTS rendered innerText ("W E   M A K E…") → breaks crawler/AI extraction + fails the heading-legibility gate. The SAFE technique: keep the heading text as **ONE intact text node** (clean `aria-label` + clean rendered `innerText`), and produce the typewriter LOOK via a **clip-path / mask / width reveal** that uncovers the text left-to-right (use `steps()`-style increments for the char-by-char feel), with a **blinking caret** element (aria-hidden) at the reveal edge. The text node is NEVER split → `textContent` + rendered `innerText` + AI extraction all read the clean phrase. Reduced-motion → full text instant, no caret motion.
- Fires on scroll-into-viewport, **one-shot** (`viewport once`). The caret blink is the ONE allowed continuous motion (idiomatic typewriter caret) — slow, subtle, and it FREEZES under reduced-motion.
- ⚠️ Because this is site-wide: verify the guide pages' H2s still read AI-legible AND don't feel busy (many headers typing on a dense page). Keep the per-char reveal QUICK + one-shot; if a dense page reads busy, that's a checkpoint note for Joseph.

**P2 · `Eyebrow` → 2-3× bigger + fade-in** *(Edit 6; propagates to every section's eyebrow).*
- Scale the eyebrow label up (he said 2-3×). **Calibration:** land it ~2× to taste so it reads bigger/intentional but stays **subordinate to the H2** (the heading must still dominate — balance/`feedback_balance_fulcrum_principle`). Joseph's eyeball calls final size at the checkpoint.
- Add a **fade-in on scroll-into-viewport** to the eyebrow (currently only the hairline draws). One-shot, reduced-motion-safe.

**P3 · "Animated underline beneath a label" pattern** *(Edits 2b + 3; reuse `DrawLine`).* A left-to-right drawn line that animates in under a label, one-shot + reduced-motion-safe. Two variants: **red** (the gap-card damage labels, P-below) and **blue** (the raw-technicals card titles). Make it a clean reusable treatment.

## 2. PER-SECTION EDITS

**Hero** *(Edit 4)* — "WE MAKE KINGS" gets the P1 typewriter + caret (via the TypeIn change). Keep the existing entrance sequence (lede, CTAs, seal, parallax).

**GapSection `#problem`** *(Edits 2 + 7):*
- **Count-ups must FIRE** on the 4 %s (57/70/56/71). They're coded but likely stuck at 0 live (SSR-0 + `whileInView` never triggering). Fix so they count to real values on scroll-in (the WO_06 §2A suppression trap).
- **Red drawn underline** (P3) under each bold label: NO REAL LOCATION PAGES · NO KEYWORD + CITY TITLES · NO BUSINESS SCHEMA · NO LLMS.TXT FILE.
- **Card overhaul:** ➖ remove the red top-accent line · 🔵 add a blue outline · ⬆️ 3D/**lifted** look (elevation shadow off the band) · ⬜ keep square corners · ➕ **add a small red, slow-blinking caret-arrow to the LEFT of each label**, pointing at it (the idiomatic-caret exception — slow, subtle, reduced-motion-freezes) · ➕ **+2 more "what it costs them" bullets each** (3 → ~5), real content from the site's actual logic (not filler). Net: blue frame = structure, red reserved for the damage signals (%, ×, arrow) — on-brand.

**PageSystem `#proof`** *(Edit 1):*
- Keep the bento structure. **Fill the giant Location pages cell** — kill the dead space with real density (a bullet list of what a location page contains / real example coverage, an icon — use the site's real context).
- Fix the **card corner-density** problem (content clusters top, rest empty) — add real density to every card so they read full, not clutter.
- ❌ **Remove "Service-by-city pages"** — not a real page type we offer.
- ⬇️ **Move "Dedicated service pages" to below the Location cell.**
- 🔁 **Top-right card → a different REAL category** (NOT service-by-city). Use the real category set only (dedicated service · location · product & brand · specialty & emergency · cost & pricing · instant estimate · financing · resources cluster · project gallery · trust). **Recommend** promoting **Cost & pricing** or **Specialty & emergency** to that prominent slot — but the exact pick is **Joseph's call at the checkpoint** (he said "something else, I don't know"); surface your choice for his confirm.
- Keep gapless (`grid-flow-dense`, zero empty cells), the 15× anchor, the lever featured.

**RawTechnicals `#system`** *(Edit 3)* — **blue drawn underline** (P3) under each of the 3 card titles: On-page SEO · Technical foundation · AI & machine-readability.

**Dashboard** *(Edit 8 — the heaviest; build it COMPONENT-FIRST):* **scaffold the dashboard structure via Magic MCP (21st.dev — `21st_magic_component_builder` / `_inspiration`), then re-skin 100% to blue/white + square + run the arsenal. Do NOT handcraft the layout from scratch.** Expand the proof chart into a **full agency-style CRM + analytics dashboard** — "as if the client is viewing their own site's dashboard." Default demo company **"Bob's Roofing."** Include: leads with a **converted** status, **appointments set**, the **ranking climb** (keep the win-line draw), traffic/capture metrics — full CRM feel, **very legible**. Same blue/white, square corners, no dark/glass.
- ⚠️ **Motion:** still the instrument → **one-shot reveal + the win-line draw only. NO live-updating / breathing / looping / carousel** dashboard motion (a "CRM dashboard" tempts perpetual motion — locked out).
- ⚠️ **Honesty:** clearly **illustrative/demo** — keep the FlagChip MODELED framing; "Bob's Roofing" + the numbers are a labeled demo, never presented as real client data (FTC honesty rail).

**BookAppointment `#book`** — unchanged (stays calm; conversion point).

## 3. 🔒 HARD LOCKS + PRESERVE-LIST
- 🔴 **AI-legibility** (P1) — heading rendered text stays whole; heading-legibility gate green N/N. The H2s are keyword + **speakable-schema** targets (`#problem h2`, `#proof h2`) — do not fragment them.
- 🔴 **Overstimulation gate** — the ONLY continuous motion allowed is the slow, subtle, reduced-motion-safe **caret blink** (typewriter + the gap-card arrow). Everything else one-shot. NO live dashboard motion.
- **BLUE/WHITE, NOT dark** · no glass · no gradient · **square corners** · two-font system. **INDUSTRY-NEUTRAL.**
- **COPY verbatim + anchor IDs intact**, EXCEPT the two Joseph-directed content changes: the **Dashboard** content expansion (Bob's Roofing/leads/appointments) and the **PageSystem** category changes (remove service-by-city, new top-right category, fuller card content). Everywhere else, copy is untouched.
- Schema @graph + llms.txt + SSR + technical-SEO-as-proof (RawTechnicals claims stay TRUE) · FlagChip MEASURED/MODELED honesty · the `cyber-security-specialist-1` files · the global reduced-motion `@media` rule · reuse the existing motion primitives (extend, don't rebuild).

## 4. ⭐ PER-EDIT SKILL-INVOCATION MAP (the anti-drift spine — invoke BEFORE each group)
| Edit group | Invoke (Skill tool) BEFORE starting |
|---|---|
| P1 TypeIn typewriter · P3 underlines · GapSection count-up fix (motion) | `framer-motion` + `design-motion-principles` (+ re-read the AI-legibility constraint) |
| P2 Eyebrow size+fade | `framer-motion` + `design-motion-principles` + `design-taste-frontend` (hierarchy) |
| GapSection card overhaul (3D/borders/density) | `impeccable` + `high-end-visual-design` + `design-taste-frontend` (+ `framer-motion` for the caret) |
| PageSystem bento (density/gapless) | `gpt-taste` (gapless bento) + `frontend-design` + `ui-ux-pro-max` + `design-taste-frontend` |
| Dashboard CRM atom | the full design arsenal + `framer-motion` + `ui-ux-pro-max` (data legibility) |
| Before any "done/deployed" claim | `verify-before-claim` |
**Rule:** re-invoke before each group; don't invoke once and coast. Output a `Skills loaded:` line per group too (for the gate), but the INVOCATION + applying the guidance is the point.

## 5. VERIFICATION GATES (pixels + DEPLOYED behavior, not code)
- `tsc` 0 · `next build` all SSG.
- 🔴 **AI-LEGIBILITY GREEN (critical):** heading-legibility spec passes N/N — static + rendered innerText + AI extraction all read the clean headings AFTER the typewriter change. This is the gate the typewriter most threatens.
- 🔴 **LIVE-FIRES (deployed page, desktop + mobile 390px):** typewriter types + caret blinks · eyebrows fade in + read bigger · the red/blue underlines draw · the **gap %s count to real values (not stuck at 0)** · the gap-card arrows blink subtly · the dashboard reveals + win-line draws. Code-present ≠ live-firing.
- 🔴 **REDUCED-MOTION:** everything freezes to final state — full heading text shown, carets static, numbers at final value, nothing trapped.
- 🔴 **ONE-SHOT:** scroll past twice — nothing re-animates EXCEPT the idiomatic carets (which must also freeze under reduced-motion). No other looping motion; no live dashboard motion.
- **OBVIOUS TRANSFORMATION:** before/after of the deployed home shows a clear, substantial change (not 10-20%).
- Playwright axe **0 serious + contrast AA** (red-on-white + blue-on-white) · mobile readability + gentle motion · cursor-pointer + no hover layout-shift.
- grep gates (no roofing terms in neutral sections · no stale "143" · "One King" residual resolved · service-by-city removed).
- **prod-byte-check** after deploy (palette `#1d4ed8` + markers).

## 6. 🛑 CADENCE + CHECKPOINT
Invoke skills (per §4, continuously) → **P1-P3 site-wide primitives first** → the per-section edits → run §5 gates (AI-legibility + live-fires especially) → **deploy to prod** (`cd king-maker-site && npm run build && npx --yes vercel@latest deploy --prod --yes`) → verify on the live alias that it OBVIOUSLY changed + the motion FIRES + headings stay AI-legible → **🛑 STOP, report for Joseph's eyeball** (live URL · before/after · what now animates per section · the PageSystem top-right category pick for his confirm · reduced-motion + mobile evidence). The typewriter + eyebrow ship site-wide (per Joseph); the section edits are home — do NOT propagate further maximalist work to other pages until he approves. His eyeball is the final gate and OVERRIDES "looks done in code."

---
*— WE15, 2026-06-26. WO_07 / Phase B.3c: Joseph's 8 concrete maximalist edits. Site-wide primitives first (AI-SAFE typewriter+caret on TypeIn · bigger+fade Eyebrow · drawn-underline pattern), then per-section (gap count-ups-fire + red underlines + card overhaul w/ blue frame/3D/+2 bullets/caret-arrow · PageSystem bento fix + drop service-by-city + move dedicated-service + real top-right category · raw-tech blue underlines · Dashboard→full CRM mock for "Bob's Roofing"). AI-legibility is the #1 risk — typewriter via clip/mask not per-letter spans. Caret blink = the only continuous-motion exception (slow/subtle/reduced-motion-safe). CONTINUOUS per-edit skill invocation (§4) — the anti-drift spine; the gate is live. Verify the home OBVIOUSLY changed + the motion FIRES + headings stay AI-legible. 🛑 Joseph checkpoint.*
