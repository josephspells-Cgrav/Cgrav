# WORK ORDER 01 — Summit & Oak (balance pass + edits)

**From:** WE10 (architect) · **To:** Builder (fresh context) · **Date:** 2026-06-17
**Scope:** a refinement pass on the LIVE V2 build (`kingmaker-summit-oak-roofing.vercel.app`, the from-scratch Next.js site). NOT a rebuild — fix to the standard below, then deploy.

> Read §1 (the principle) until it's bone-deep — it is the lens for everything else. Then
> apply §2 (explicit edits) + §3 (site-wide audit findings) + §4 (bugs) + §5 (video). The
> annotations in §2/§3 are SYMPTOMS — fix to the §1 standard and extrapolate across every
> page, don't just patch the flagged instance.

---

## 1. ⭐ THE FULCRUM PRINCIPLE (asymmetrical visual equilibrium) — the north star of this pass

Joseph's taste has moved from **density** (is there enough substance?) to **balance** (is the substance in equilibrium?). This is the deep-rooted print-design principle to internalize:

**Every section is a composition balanced around a central vertical fulcrum. It must not "tip on the pole."** Balance is achieved through VISUAL WEIGHT, not mirroring.

- **Visual weight** = size × density × contrast/color × complexity × isolation. A bordered, filled form with a red button is *heavy*; a line of thin gray text is *light*; a large airy headline has moderate weight from size; saturated red carries weight from contrast; whitespace is light but **active** material.
- **Asymmetrical (dynamic) balance is the target** — a HEAVIER element on one side, counterweighted by a LARGER but LIGHTER mass on the other, so the torques (weight × distance from the fulcrum) cancel. The seesaw: a dense form near the right edge balanced by a big airy headline + text spanning the left. More premium and alive than symmetry, and it creates **focal hierarchy** — the heavy element is the focal point, which is where the eye and the action should go.
- **Why not symmetry:** mirror-symmetry is stable but static and inert; it has no focal hierarchy. Asymmetry holds tension + interest while staying settled. (Avoid the far-side trap too: don't make everything mechanically centered/even — keep rhythm.)
- **Negative space is active and has weight** — but a large *unintentional* void on one side = unbalanced torque = the section tips = reads "unfinished." Counterweight it or rebalance.
- **Density serves balance:** every region must carry enough weight to hold its side. Bare/thin regions are too light → they tip. (This reconciles "add density" with "balance": give every region enough weight, THEN distribute in equilibrium.)
- **Sub-rules:** repeating-element grids balance by EVEN distribution (no orphan cells, equal heights). Full-width centered bands balance by TRUE centering (vertical + horizontal).
- **The HOME HERO is the reference exemplar** — heavy form right, light headline+text left, balanced on the fulcrum. Do NOT degrade it; bring every other section up to its quality of equilibrium.

**The review method (use it to verify your own work):** zoom OUT (full-page / 25–50%) so the eye reads MASS not words → check every section for tip/dead-space. Then 100% zoom → check fold-fit (nothing reads cut off).

**Operational rules (what to actually do):**
1. Every hero gets a right-side counterweight (default = the estimate form, which also converts). Never a dead right half.
2. Heading+body text sections → 2-column split (heading/label left, copy/list right), not a single left-aligned stack in a full-width band.
3. FAQ → center the accordion OR 2-col (intro/contact aside + accordion). No empty right rail.
4. Stat/number bands → put the heavy figure on one side as the counterweight, headline+copy the other.
5. Link/chip grids → card/icon treatment (enough weight) or tighten the band height.
6. Repeating grids → even (no orphan cells, equal heights/weights).
7. Centered bands → truly centered (vertical + horizontal).

## 2. EXPLICIT EDITS (Joseph, this session) — fix + extrapolate
**HERO (home — it's the exemplar; refine, don't break):**
- **Form sits too low / reads cut off at 100% zoom** — the form's bottom is flush with the window bottom. Fit it FULLY in the fold with breathing room below at 100% zoom on common laptops (measurable: form bottom ≤ viewport height − margin; same fold-fit discipline used on the flagship hero). Raise it on desktop AND mobile (on mobile the form currently falls below the fold).
- **Video overlay too dark** — lighten the scrim so the footage actually reads.
- **Not obviously roofing at a glance** — fixing the overlay + camera angle (below) should make the roof visible and make it read "roofing" instantly.

**OTHER SECTIONS:**
- **Home services cards ("Everything Your Roof Needs") too bare** → add density: 2–4 bullets / key inclusions / a "from $" or stat per card. Premium, not overstuffed. + add a **top-right CTA** to the section header (it's left-heavy → balance it).
- **City "Our Roofing Services in [City]" = bare label pills** → real cards (icon + 1-line + link), matching the densified home services-card anatomy. Applies to the services module wherever it renders thin.
- **"Recent Work" grid = 3 cards (orphan slot)** → add a 4th card → even 2×2.
- **Estimate form in EVERY hero, site-wide** (home, services, service-detail, storm, city, brands, cost, financing, etc.). This is both the conversion lever AND the right-side counterweight that fixes the tip-left heroes (see §3). Builder uses judgment on the form variant per page; a form (or equivalent heavy counterweight) is present in every hero.
- **Footer top-row middle column is empty** → fill it (lean conversion: a "Get a Free Estimate" CTA block, trust badges, or a 24/7 storm-response block).
- **Trust bar → super-premium SCROLLING marquee with real brand LOGOS** (GAF, Owens Corning, CertainTeed, BBB + Licensed/Insured), not text. Source actual logo assets; auto-scroll; pause on reduced-motion.
- **"Free Documented Roof Inspection" CTA band → center the content vertically** (it's top-clustered with dead space below).

## 3. SITE-WIDE BALANCE AUDIT (WE10, live-pixel audit at zoom) — apply as GLOBAL rules
Cross-page failures (fix on the template so all instances inherit):
- **Inner-page heroes tip hard-left** (city / service-detail / storm / and by extension brands, cost) — headline + CTAs jammed left, dead right half. → every hero gets the right-side counterweight (the §2 form edit covers this). The home hero is the only one that already solves it.
- **FAQ accordions left-hug with an empty right rail on EVERY page** → §1 rule 3 (center or 2-col).
- **"Heading + body" text bands tip-left** (esp. city: "What Raleigh Roofs Face", "Across Raleigh and Nearby", "Permits in Raleigh") → §1 rule 2 (2-col split).
- **Wide link/chip grids too bare** (city service pills, service-detail "Where We Offer" link grid) → §1 rule 5 (card/icon treatment).
- **Stat/number bands cluster weight one side** (home "512 Reviews" band tips-left; home cost band tips-left) → §1 rule 4 (figure as counterweight).
- Page-specific: home reviews band (tips-left → center the cards / add right counterweight); home cost band (tips-left); city "Recent Work in Raleigh" (sparse, no imagery → 3-card project grid w/ photos); service-detail "Signs to Watch For" (off-center → equal 2-col).
- Exemplars to preserve/match: home hero, storm-hub "Before and After" 3-image grid, service-detail "Last Roof Your Home Will Ever Need" 2-col.

## 4. BUGS CAUGHT (verify + fix)
- **Reviews count inconsistent** — hero/header says "312 Google reviews", reviews band says "512 Reviews". Reconcile to ONE number everywhere.
- **Cost figure renders as "5%–$24k"** (home cost band) — looks broken; verify the price range is correct (e.g., "$9k–$24k") and consistent with other cost figures.
- **React #418 hydration dev-warning** fires on every page (from the `useReducedMotion` SSR mismatch carried in the motion atoms). Dev-only (stripped in prod) but it's a real hydration mismatch — fix with a mount-guard (render motion after mount / `useState`+`useEffect`) or `suppressHydrationWarning` where appropriate. Low priority, but clean it.
- Placeholder phone (919) 555-0185 is fine for the demo; only swap before real traffic.

## 5. HERO VIDEO (regenerate — Higgsfield `generate_video`)
- **Max length** the model allows · **rotating / orbit** shot · **clearly a roof** · **centered on a home** (~3,000–5,000 sq ft, substantial/upscale) · smooth motion · setting matches the charcoal + red palette (moody/dusk so it reads dark with red accent) · best judgment on the rest.
- Lighter overlay than current (so the footage shows). Provide a poster frame (first-frame) for instant paint + reduced-motion. Lazy-load. Vision-QA the result; regenerate if off-palette, janky, or not obviously a roof.

## 6. VERIFICATION (own it — this site is outside the flagship verify-gate)
- **Balance verification (the new gate):** for every page, capture a full-page (zoom-out composition) shot + view it — confirm NO section tips / no dead right-space / no orphan grids / bands centered. Capture the hero at 100% on common laptop heights — confirm the form fits fully in the fold (not cut off).
- Build green (`next build`), headless-render every route (200 + 0 console errors + correct CONTENT), verify rendered PIXELS (not DOM/200), axe 0-serious/0-critical desktop+mobile, mobile pass (sticky bar, tap targets, no overflow), reduced-motion pass.
- After deploy: confirm the live URL serves YOUR new build (unique marker), not a cached version.

## 7. OPERATING RULES
- Fix to the §1 STANDARD, not the literal annotation; extrapolate every fix across all pages/templates.
- PRESERVE the conversion guts + the full 34-page SEO spine + the home hero. This is a refinement, not a teardown.
- Deploy to `kingmaker-summit-oak-roofing.vercel.app`. Report the live URL + a per-page balance-audit (your own zoom-out pass) + verification evidence. Joseph's eyeball is the final gate.

---
*— WE10, 2026-06-17. The Fulcrum Principle is the lens; the edits + audit are its application. Balance every section like weights on a pole — nothing tips, nothing reads unfinished, the heavy element is the focal point.*
