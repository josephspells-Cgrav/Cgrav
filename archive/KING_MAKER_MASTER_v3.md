# KING_MAKER_MASTER.md

**Version:** 3.0
**Last refactor:** April 29, 2026
**Refactor purpose:** Codify everything proven out in the Peak Roofing (kingmaker-demo) reference build and the Baker Roofing (baker-roofing) Layer C build. v3 supersedes v2 with: 10 canonical recipes that capture the patterns we actually shipped, 7 corrections to v2 specs that the build proved necessary, expanded GSAP scope (now permitted for perimeter draws and scrub lines, not just hero gradient + counters), official `@gsap/react` integration via `useGSAP()` per GreenSock guidance, explicit color-contrast minimum (text-white/55), composited animation laws (no `boxShadow` infinite loops), mobile auto-trigger pattern via `useIsMobile`, asset compression standards (ffmpeg recipes), and a documented 3-section Layer C exception path.

---

## 0. Doctrine Architecture

This doctrine is split into three layers + a recipes appendix:

| Layer | Applies to | Flex level |
| :---- | :---- | :---- |
| **Layer A — Universal** | Every build, no exceptions | Locked. Never deviate. |
| **Layer B — King Maker Brand** | kingmakerseo.com only (the agency site) | Locked for King Maker site. Do not apply to client builds. |
| **Layer C — Client Builds** | Client landing pages (e.g. roofers) built by King Maker | Visual identity flexes per client. Technical and animation rules are locked. |
| **Recipes Appendix** | All builds | 10 reusable patterns proven out in production. Reference, don't reinvent. |

When in doubt, ask: *am I building the King Maker agency site, a client site, or neither?* Layer A always applies regardless.

---

# LAYER A — UNIVERSAL RULES

These rules apply to every build, every project, no exceptions.

## A.1 Identity and Mission

The doctrine governs the creation of premium, conversion-focused contractor and agency landing pages that feel cinematic, trustworthy, and expensive without becoming fragile. The system optimizes for speed of iteration, consistency of motion, clarity of trust signaling, and repeatability across future verticals.

### Non-negotiable principles

| Rule ID | Exact rule |
| :---- | :---- |
| I-01 | **One Hero Many Helpers:** Choose ONE dominant high-motion effect for the hero. All other sections use subtle helper effects only. Core conversion elements — phone number and CTA buttons — must remain visually dominant at all times regardless of surrounding effects. |
| I-02 | The hero is the system anchor; if the hero is unstable, the build is not ready for polish. |
| I-03 | Motion parity is mandatory; desktop and mobile must follow the same reveal and interaction logic unless the user explicitly requests different behavior. Touch devices may use the auto-trigger pattern (Recipe 4) to synthesize hover states on scroll-into-view. |
| I-04 | Data comes first and markup comes second; recurring content must be modeled before styling begins. |
| I-05 | Structure comes before motion; layout, spacing, copy fit, and section rhythm must be correct before animations are layered on. |
| I-06 | Shared primitives only; section reveals, counters, headline staggers, review stars, and CTA patterns must be implemented as reusable primitives rather than ad hoc snippets. |
| I-07 | Broad CSS visibility overrides on animated elements are prohibited; any emergency visibility fix must be narrowly scoped. The pattern `* { opacity: 1 !important }` is banned. |
| I-08 | Special-case cards are not allowed inside uniform grids unless the exception is explicitly planned in the schema. |
| I-09 | Verification is a system, not a vibe. Every animation-heavy page requires Playwright-verified desktop and mobile validation, including reload checks. See A.9 for full verification contract. |

## A.2 Build Start Protocol

Every new build, rebuild, or major revision must begin by loading this doctrine and treating it as the active operational standard.

| Rule ID | Exact rule |
| :---- | :---- |
| BSP-01 | Ensure KING_MAKER_MASTER_v3.md is loaded and accessible before starting any build. If the doctrine is already in active context, do not re-read it — reference it in place. Only perform a full read when starting a new session or when the doctrine has been updated since last read. |
| BSP-02 | Begin every build in this order: read the doctrine, identify which layer (B or C) applies, inspect existing project structure and reusable primitives, confirm the narrative order, trust schema, and motion system, and only then begin implementation work. |
| BSP-03 | If a build starts without this doctrine, stop immediately and load it before proceeding. |
| BSP-04 | When starting a new client build, **copy the canonical primitives** from a reference repo (kingmaker-demo or baker-roofing) before writing fresh: `components/ui/Counter.tsx`, `components/ui/CharacterStagger.tsx`, `components/ui/SectionReveal.tsx`, `components/ui/ReviewStars.tsx`, `hooks/useIsMobile.ts`, `playwright.config.ts`, `tests/playwright/verification.spec.ts`. Per FSR-06. |
| BSP-05 | Treat this file as the operating history, failure log, and execution doctrine for the system. |

## A.3 Priority Order

Identity first, structure second, motion third, verification continuously and before any checkpoint.

| Rule ID | Exact rule |
| :---- | :---- |
| PO-01 | Build the visual identity first. (Layer B for King Maker site, Layer C client-flexible for client sites.) |
| PO-02 | Build the content schema second (typed arrays, FDG-01). |
| PO-03 | Build the section skeleton third. |
| PO-04 | Lock responsive geometry fourth. |
| PO-05 | Add shared motion primitives fifth. |
| PO-06 | Add counters sixth (Counter primitive only — never inline setInterval; see Recipe 1). |
| PO-07 | Add headline stagger seventh. |
| PO-08 | Add decorative polish eighth (perimeter draws, hover glows, pulse plates). |
| PO-09 | Run Playwright verification continuously throughout, not only at the end. |
| PO-10 | Checkpoint only when Playwright-verified parity and CTA clarity are confirmed across desktop and mobile. |

## A.4 Universal Technical Stack

The technical stack is locked. These choices apply to every build regardless of layer.

| Standard | Requirement |
| :---- | :---- |
| AS-01 | Use Next.js 16 + TypeScript + App Router when building in Claude Code. Use React + Vite when building in Manus/FORGE. Do not mix shells within a single build. |
| AS-02 | Use Tailwind 4 with design tokens defined in globals.css (Next.js) or index.css (Vite). |
| AS-03 | Use Framer Motion 12+ as the primary motion library for all scroll reveals, hover states, gesture interactions, and component-level animations. |
| AS-04 | **GSAP scope (expanded from v2):** GSAP is permitted for: (a) hero gradient/blob backgrounds, (b) Counter implementations *only when* useMotionValue is unavailable for the use case (default is useMotionValue per Recipe 1), (c) **load-triggered perimeter draws** (Recipe 2), (d) **scroll-scrub perimeter draws** (Recipe 3), (e) **scrub-driven single-line draws** (e.g. progress lines, connector lines), (f) **upward/directional draws** (Recipe 7). GSAP and Framer Motion must NEVER target the same element. GSAP is for line and box draws driven by scroll or load; Framer Motion is for everything else. |
| AS-05 | Three.js may be imported directly when explicitly required by the build. No MCP wrappers. Three.js is optional, not default — use only when the build genuinely benefits from 3D, never to chase visual interest. |
| AS-06 | Components: shadcn/ui foundation + MagicUI + Aceternity UI for visual polish. |
| AS-07 | Routing: Wouter for Vite builds, Next.js App Router for Next builds. Keep routing minimal. |
| AS-08 | Deploy via `npx vercel --prod` from local. Bypass GitHub auto-deploy due to Node version mismatches (local Node v24, Vercel max Node 20.x). |
| AS-09 | Every component using Framer Motion or GSAP MUST have `'use client'` directive in Next.js builds. |
| AS-10 | Install `@gsap/react` alongside `gsap`. Use `useGSAP()` from `@gsap/react` for all GSAP code in React, NOT raw `useEffect + gsap.context()`. See A.15. |
| AS-11 | For verification tooling: use **Playwright CLI** (`npx playwright test`), not Playwright MCP server. CLI is ~4× more token-efficient and Microsoft's own recommendation for coding agents. |

## A.5 Universal Animation Laws

Motion is a governed overlay, not the foundation.

| Rule ID | Exact rule |
| :---- | :---- |
| MSR-01 | Easing palette — pick the right curve per use case, not "the only curve." Defaults: **`cubic-bezier(0.76, 0, 0.24, 1)`** for default UI motion (hover, reveals, transitions). **`cubic-bezier(0.16, 1, 0.3, 1)`** for softer reveals with more anticipation. **`linear` / `ease: "none"`** for scrub-driven animations (mandatory). **`power2.out`** for directional draws (upward lines, slide-ins, anything with implied gravity). **`cubic-bezier(0.45, 0, 0.55, 1)`** for breathing / idle / continuous loops. **Spring (Framer Motion)** for gestures (drag, momentum). NEVER use default `ease-in-out` (it reads as lazy / unintentional). Anything outside this palette requires a one-line justification in the component or commit. |
| MSR-02 | Desktop and mobile use IDENTICAL animation systems. No viewport-specific fallbacks unless user explicitly requests them. Mobile auto-trigger pattern (Recipe 4) is the approved exception for hover synthesis. |
| MSR-03 | All scroll reveals use Framer Motion `whileInView` — never GSAP for this. |
| MSR-04 | All hover states use Framer Motion `whileHover`. |
| MSR-05 | **Default character stagger** (CharacterStagger primitive baseline): 40ms delay between letters (`staggerChildren: 0.04`), `y: 80 → 0`, `opacity: 0 → 1`, `rotateX: -90 → 0`. These are sensible starting values, not locks. Adjust per project's motion intensity — slower for cinematic, faster for snappy, drop rotateX for typewriter feel. MSR-15 is one documented variant; projects may declare others in their CLAUDE.md. |
| MSR-06 | Counters use `useInView` with `once: false` — always reset on every scroll past. Implementation per Recipe 1 (useMotionValue + animate). |
| MSR-07 | **Default viewport trigger:** `viewport={{ once: false, amount: 0.1 }}` for section-level reveals; `amount: 0.5` for card auto-trigger. Tune per element when the default doesn't fit (large heroes may want `0.05`, dense card grids may want `0.3`). The `once: false` part IS locked — replay-on-scroll-past is the doctrine commitment per MSR-13. The `amount` is tunable. |
| MSR-08 | Initial opacity NEVER set to 0 on section wrappers — content always visible by default for SSR safety. Framer Motion handles transform/y only on section wrappers. Per-letter spans inside CharacterStagger may use opacity:0 (they're character-level, not section-level). |
| MSR-09 | Structure before motion always — layout locked before animation begins. |
| MSR-10 | Decorative polish (glows, star fill, border beams) ONLY after base triggers verified via Playwright. |
| MSR-11 | Every shared motion primitive must have one documented trigger contract only; do not mix load triggers, scroll listeners, horizontal gating, and observer thresholds unless the component contract explicitly requires them. |
| MSR-12 | Use one shared reveal primitive (SectionReveal) for section-level motion and one shared stagger primitive (CharacterStagger) for headline-level motion; all reveal behavior must route through those primitives. |
| MSR-13 | Counter components must declare replay semantics explicitly: replay on every viewport re-entry (`once: false`), reset to 0 on viewport exit. |
| MSR-14 | Hero headings above the fold may use deterministic load triggering, but the same trigger path must be used on all viewports. |
| MSR-15 | **Hero typewriter override (NEW in v3):** the hero headline MAY override MSR-05 with a typewriter variant when a more deliberate "typed-in" feel is desired: `opacity: 0 → 1`, `x: -4 → 0`, no rotateX, no large y. Default per-letter duration 0.27s, staggerChildren 0.06s. The override is local to the hero's inline `CharLine` component and does not affect the shared CharacterStagger primitive used in section h2s. |
| MSR-16 | **Per-letter hero hover (NEW in v3):** every hero headline letter MUST have its own `whileHover` for individual amber glow (scale 1.18, color amber, 3-stack textShadow). Spaces are excluded from hover. See Recipe 6. |
| MSR-17 | **No infinite-loop boxShadow animations (NEW in v3):** `animate={{ boxShadow: [...3 stops...] }}` on `repeat: Infinity` is banned. Continuous repaint causes measurable jank. Use the composited pulse plate pattern (Recipe 8): a sibling div with `blur` filter (set once statically) and animated `opacity` + `scale` only. |

## A.6 Frontend Development Guidelines

| Rule ID | Exact rule |
| :---- | :---- |
| FDG-01 | Define all recurring content as typed arrays or objects before writing section markup; services, trust metrics, process steps, reviews, service areas, and CTA copy must be data-first. |
| FDG-02 | Extract any section that requires more than one revision into its own component file immediately after the first approved visual pass. |
| FDG-03 | Keep the hero, trust grid, reviews, process timeline, and contact close as separate section modules. |
| FDG-04 | Lock the trust-card schema before styling; decide whether each cell is a metric, badge, testimonial, or credential, and never mix semantics ad hoc inside the same grid. |
| FDG-05 | If a helper component survives more than one revision cycle, extract it from the page file into a shared component file immediately. |
| FDG-06 | Before building any custom animation-heavy behavior, decide whether it belongs in a shared primitive that can be reused across sections and future client verticals. |
| FDG-07 | Do not let the final project depend on one oversized page file. |
| FDG-08 | **Color contrast minimum (NEW in v3):** body text and small captions on dark backgrounds (`#0d0d0d` to `#161e30` range) MUST be `text-white/55` or higher. Smaller text and lower opacities fail WCAG 2.1 AA contrast (4.5:1) for normal text. Headlines (large text, ≥24px) may use any opacity since WCAG only requires 3:1 for large text. **Bulk-bump rule:** if axe flags color-contrast violations, run a project-wide sed to bump `text-white/{20,22,25,30,35,38,40,42,45}` → `text-white/55`. |
| FDG-09 | **Composited properties only (NEW in v3):** never animate `width`, `height`, `top`, `left`, `margin`, `padding` — they trigger layout reflow. Use `scaleX` / `scaleY` with `transform-origin` instead. Specifically: animated dividers and underlines that grow on hover MUST use `scaleX` not `width`. |

## A.7 Component Contract Rules

| Rule ID | Exact rule |
| :---- | :---- |
| CCR-01 | **CharacterStagger** must accept only clearly documented trigger modes (`hero` for load-on-mount, `inView` for whileInView) and must not contain hidden viewport-specific logic. |
| CCR-02 | **SectionReveal** must use a single visibility model that is replay-safe and cross-viewport consistent. |
| CCR-03 | **Counter** must format values centrally, accept duration and suffix/prefix inputs, own its own in-view reset logic, and **MUST be implemented via Framer Motion's `useMotionValue` + `animate()`** — NOT `setInterval` + `setState`. The setInterval pattern causes ~60 React re-renders per second per counter (compounds badly with 10+ concurrent counters). See Recipe 1. |
| CCR-04 | **ReviewStars** must be implemented as a self-contained component so replay timing and glow treatment are not duplicated across cards. |
| CCR-05 | Inline helper components inside a page are allowed only during first-pass exploration; if they survive beyond one revision, extract them. |
| CCR-06 | **Inline-safe root element (NEW in v3):** any shared primitive that is rendered inside `<p>`, `<h1>..<h6>`, or other inline-only contexts MUST use a `<span>` root, not `<div>`. CharacterStagger and ReviewStars both follow this rule. A `<div>` root in inline context produces invalid HTML and triggers React hydration errors. |

## A.8 Visual Powerhouse Components (Approved Library)

The Visual Powerhouse library is filtered for contractor work. Only the components below are approved.

| Rule ID | Exact rule |
| :---- | :---- |
| VPC-01 | Apply Border Beam on all CTA buttons. |
| VPC-02 | Apply Magic Card on all service cards. |
| VPC-03 | Apply Tracing Beam on all process or timeline sections. |
| VPC-04 | Apply Scroll Based Velocity on service area sections. |
| VPC-05 | Apply Bento Grid for social proof sections. |
| VPC-06 | Apply Glowing Effect for trust and credential badges. |
| VPC-07 | Apply Noise Background for secondary sections. |
| VPC-08 | Apply Sticky Scroll Reveal for detailed process sections. |
| VPC-09 | Apply Marquee for partner and certification strips. |
| VPC-10 | Apply Text Reveal for mission statement lines. |
| VPC-11 | Preserve trust and clarity at all times; visual effects must never hinder access to contact information or service details. |
| VPC-12 | **Use with deliberate justification:** Rainbow Button (reads as crypto/web3 default), Word Rotate in hero (dated 2018-era pattern), Aurora Text (only fits creative/music/lifestyle brands), Wavy Background (only fits wellness/spa brands). Not banned — but if a project uses any of these, the project's CLAUDE.md must document WHY. Default lean: skip. |
| VPC-13 | **VPC-01 through VPC-11 are recommended starting points** for common section patterns — proven, doctrine-aligned, fast to ship. Custom components are *encouraged* when they serve the project's brief better (the perimeter draw, breathing video, ROI calculator, constellation markers, defined-card form, isolated cliffhanger, and others were all built outside this list and now live in PATTERNS / Recipes). When a new pattern proves out across two or more projects, add it to the recipes appendix so the next builder finds it. **There is no implicit ban on components not on this list.** |

## A.9 Verification Contract (Playwright-Only)

Verification is Playwright-only via the **Playwright CLI** (per AS-11). Screenshots are not acceptable evidence under any circumstance. Verification is a continuous practice during development, not a final-gate check.

| Rule ID | Exact rule |
| :---- | :---- |
| VER-01 | All visual and animation verification is done via Playwright CLI. Screenshots — single, multi-frame, or composited — are not acceptable as verification evidence under any circumstances. |
| VER-02 | Playwright must launch a real Chromium instance and confirm animations are actively firing — not just that animated DOM elements have been rendered. |
| VER-03 | Animation verification must capture: initial state, in-view trigger state, and settled post-animation state. Each state must be verified independently via Playwright DOM inspection and computed style checks. |
| VER-04 | Every verification must run against BOTH desktop AND mobile viewports in the same Playwright session. Mobile viewport: 390x844 (iPhone 14, mobile-webkit project). |
| VER-05 | Mobile-specific verification must include: touch interactions, viewport-correct typography rendering (no horizontal scroll, no text overflow), and animations firing on mobile (not silently degraded). |
| VER-06 | Animation performance must be verified via Playwright performance API. **Doctrine budgets:** ≥50fps desktop, ≥55fps mobile (real device). **Test hard floors (NEW in v3):** ≥30fps desktop-chromium, ≥5fps mobile-webkit (headless WebKit on Windows throttles to 8-13fps; the test logs the doctrine budget breach as a warning so it isn't silently swallowed, but the hard floor accommodates the headless environment). Real-device verification is the source of truth for the doctrine budgets. |
| VER-07 | If an animation cannot be verified via Playwright (DOM mutation, computed style change, transform value over time, or scroll position trigger), the animation must be refactored until it is Playwright-verifiable. |
| VER-08 | Playwright verification runs continuously during development, not only at checkpoint. After every meaningful code change, run the relevant verification suite, audit the results, and self-correct any failures before proceeding. |
| VER-09 | Playwright must run automated accessibility audit via `@axe-core/playwright` and report any WCAG 2.1 AA violations. Critical and serious violations block checkpoint. Moderate and minor violations are flagged for review but do not block. |
| VER-10 | When Playwright detects a failure, the agent must: (1) report the specific failure with the failing assertion and observed value, (2) form a hypothesis about the cause, (3) implement the fix, (4) re-run verification, (5) confirm the fix worked before declaring the issue resolved. |
| VER-11 | No checkpoint, preview handoff, or deploy is permitted without a Playwright verification report listing every verification ID confirmed, the specific Playwright assertion used, the viewport tested (desktop AND mobile), and the frame rate / performance metrics observed. |
| VER-12 | The agent must treat Playwright verification mastery as a core competency. Weak verification, skipped checks, or deferred audits are doctrine violations regardless of whether the build appears visually correct. |

### Required Verification States

| State ID | Required check |
| :---- | :---- |
| VS-01 | **Desktop hero settle:** the hero headline must settle correctly after reload. Verified via Playwright reload + character span opacity inspection. |
| VS-02 | **Mobile hero settle:** same as VS-01 at 390x844. |
| VS-03 | **Desktop mid-page:** scroll to mid-page section (Trust+Services or Process), confirm in viewport, confirm key elements rendered. |
| VS-04 | **Mobile mid-page:** same as VS-03 at 390x844. |
| VS-05 | **Counter replay:** counter resets and replays when scrolled away and back. |
| VS-06 | **CTA integrity:** primary and secondary CTAs visible, readable, tap targets ≥44x44px on mobile, no horizontal scroll on mobile. |
| VS-07 | **Performance:** sustained frame rate per VER-06 budgets and floors. |
| VS-08 | **Accessibility:** axe-core audit passes WCAG 2.1 AA at critical and serious levels. |

## A.10 Workflow Rules

| Rule ID | Exact rule |
| :---- | :---- |
| WFR-01 | Freeze section order and content schema before starting motion work. |
| WFR-02 | Run the first full-layout pass on desktop and mobile, and fix spacing, card heights, headline fit, and section rhythm before animation exists. |
| WFR-03 | Apply SectionReveal only after layout stability is confirmed via Playwright, then verify parity across both viewports. |
| WFR-04 | Apply Counter to hero, trust, and review headings only after replay semantics are defined and accepted. |
| WFR-05 | Apply CharacterStagger only to approved headlines that have already passed static-fit validation. |
| WFR-06 | Never call a build done if the hero, trust section, or CTA close still depend on special-case logic; those modules define factory readiness. |

## A.11 Prohibited Patterns + Operating Principles

This section now distinguishes **hard prohibitions** (grep-enforceable, prevent measurable bugs) from **operating principles** (workflow wisdom, judgment-enforced).

### A.11a — Hard prohibitions (grep-enforceable, never bend)

| Rule ID | Exact rule |
| :---- | :---- |
| PP-05 | Do not validate animation behavior with screenshots — see VER-01. |
| PP-07 | Do not declare a verification failure resolved without re-running Playwright and confirming pass. |
| PP-08 | Do not animate `boxShadow` on infinite loops — see MSR-17 and Recipe 8. |
| PP-09 | Do not animate `width`/`height`/`top`/`left` — see FDG-09 and CAL-02. |
| PP-10 | Do not use raw `setInterval` for counters — see CCR-03 and Recipe 1. |

### A.11b — Operating principles (judgment-enforced, mostly true)

These are wisdom from prior builds — not engineering bans. Follow unless you have a specific reason. Document the reason in the project's CLAUDE.md if you do.

| Rule ID | Principle |
| :---- | :---- |
| PP-01 | Prefer either scroll listeners OR IntersectionObserver in a single component, not both. Mixing the two creates debug nightmares; if both are genuinely needed, document why. |
| PP-02 | Don't debug headline animation and responsive typography in the same pass. They interfere with each other; isolate to find the real cause faster. |
| PP-03 | Long-term reusable helpers don't belong embedded in massive page files after revision two. Extract early. |
| PP-04 | Special content requests should not silently mutate a uniform card system. If a card needs a one-off treatment, revisit the schema explicitly so the exception is documented, not hidden. |
| PP-06 | Don't checkpoint a build while hero motion parity is unresolved. The hero is the system anchor (I-02); other sections are downstream of its quality. |

## A.12 Self-Audit Protocol

| Rule ID | Exact rule |
| :---- | :---- |
| SAP-01 | After the first successful visual pass, create a written verification matrix covering all VS states (VS-01 through VS-08). |
| SAP-02 | Validate initial state, in-view state, and settled post-animation state separately via Playwright. |
| SAP-03 | When the user asks for visual parity across viewports, treat that requirement as a top-level contract that supersedes local patches. |
| SAP-04 | When one area enters a second revision cycle, stop and extract the lesson into a project-local manifesto immediately. |

## A.13 Pre-Deploy Checklist

Run these before every deploy. Fix all failures before deploying.

```bash
# 1. No once: true on whileInView (MSR-07)
grep -rE "once:\s*true" components --include="*.tsx"

# 2. No banned easing (MSR-01)
grep -rE "ease.*easeInOut" components --include="*.tsx"
grep -rE "ease:\s*\[0\.16" components --include="*.tsx"

# 3. No low-contrast text (FDG-08)
grep -rE "text-white/(20|22|25|30|35|38|40|42|45)\b" components --include="*.tsx"

# 4. No boxShadow infinite loops (MSR-17)
grep -rE 'animate=\{\{[^}]*boxShadow:[^}]*repeat:\s*Infinity' components --include="*.tsx"

# 5. No animated width/height/top/left (FDG-09)
grep -rE 'whileHover=\{\{[^}]*\b(width|height|top|left)\s*:' components --include="*.tsx"
grep -rE 'animate=\{\{[^}]*\b(width|height|top|left)\s*:' components --include="*.tsx"

# 6. No raw setInterval in counter logic (CCR-03)
grep -rE "setInterval" components --include="*.tsx"

# 7. Every Framer/GSAP component has 'use client'
grep -rL "use client" components --include="*.tsx"

# 8. Build passes
npm run build

# 9. Playwright suite passes (VS-01 through VS-08)
npm test
```

| Rule ID | Exact rule |
| :---- | :---- |
| PDC-01 | Verify animation-heavy pages with Playwright reload checks on both desktop and mobile. |
| PDC-02 | Generate the full Playwright verification report (VER-11) before any deploy. |
| PDC-03 | Do not create the final checkpoint until hero motion parity, trust-grid consistency, CTA readability, and performance budgets are confirmed across mobile and desktop. |
| PDC-04 | All grep checks above MUST return zero matches before deploy. |

## A.14 Factory Scaling Requirements

| Rule ID | Exact rule |
| :---- | :---- |
| FSR-01 | Store section content, trust schemas, review schemas, and CTA variants as reusable data models. |
| FSR-02 | Make all motion primitives fully contract-driven before scaling the system across additional client verticals. |
| FSR-03 | Allow vertical variation through content, token theme, and section ordering rather than by reinventing core component behavior. |
| FSR-04 | Do not treat the system as truly scalable across multiple client verticals until a formal section library, schema-driven content inputs, locked trust/review/process/CTA modules, deterministic Playwright verification routines, and mandatory doctrine loading at build start are all in place. |
| FSR-05 | **(NEW in v3)** Project setup workflow for new client builds:<br>1. Copy entire `kingmaker-demo` or `baker-roofing` directory structure as scaffold<br>2. `npm install` (deps already specified)<br>3. Update `package.json name`, `app/layout.tsx` (fonts, metadata), `app/globals.css` (color tokens for client palette)<br>4. Update `components/animations/variants.ts` glow color (replace amber rgba values with client accent rgba values)<br>5. Build sections (copy patterns from reference repo, swap copy + colors)<br>6. Update `tests/playwright/verification.spec.ts` selectors for client-specific copy<br>7. Run pre-deploy checklist (A.13)<br>8. `npx vercel --prod --yes` |
| FSR-06 | **Reference primitives to consult when starting a new project** (kingmaker-demo or baker-roofing repos):<br>- `components/ui/Counter.tsx` (Recipe 1 — useMotionValue pattern)<br>- `components/ui/CharacterStagger.tsx`<br>- `components/ui/SectionReveal.tsx`<br>- `components/ui/ReviewStars.tsx`<br>- `hooks/useIsMobile.ts`<br>- `playwright.config.ts`<br>- `tests/playwright/verification.spec.ts` (with selector adjustments)<br><br>**These are reference implementations, not mandatory verbatim copies.** Adapt to project — different brands need different motion timings, different palette glows, different verification selectors. Blind verbatim copying is what produces the "every site looks the same" failure mode. The engineering rules they implement (useMotionValue counter pattern, perimeter draw recipe, etc.) DO carry forward; the specific styling and timings should be reconsidered each project. |

## A.15 GSAP-React Integration (NEW in v3)

GSAP code in React/Next.js MUST follow the GreenSock-blessed patterns from the official `@gsap/react` package.

| Rule ID | Exact rule |
| :---- | :---- |
| GSR-01 | Install `@gsap/react` alongside `gsap`: `npm install gsap @gsap/react`. |
| GSR-02 | Use the `useGSAP()` hook from `@gsap/react` for all GSAP setup in React components. NOT raw `useEffect + gsap.context() + ctx.revert()`. The hook handles cleanup, scoping, and `contextSafe` callbacks automatically. |
| GSR-03 | Always pass `scope` to `useGSAP()` (a ref to the component root) so selectors are scoped to the component. |
| GSR-04 | Register GSAP plugins ONCE before any usage: `gsap.registerPlugin(useGSAP, ScrollTrigger)`. Done at module level or in the component file. |
| GSR-05 | For event-handler GSAP code (e.g., button click triggers a tween), use `contextSafe` from useGSAP's callback args to wrap the handler. Otherwise the tween won't be reverted on unmount. |
| GSR-06 | **ScrollTrigger nesting rule:** `scrollTrigger` config goes on the **timeline** (or top-level tween), NEVER on tweens inside a timeline. Wrong: `gsap.timeline().to(".a", { scrollTrigger: {...} })`. Correct: `gsap.timeline({ scrollTrigger: {...} }).to(".a", { x: 100 })`. |
| GSR-07 | **`refreshPriority`:** when multiple ScrollTriggers exist on a page in non-document order, set `refreshPriority` on each so refresh runs in page order (lower number = refreshes first). Critical for pin spacing. |
| GSR-08 | **`ScrollTrigger.refresh()` after dynamic content:** call `ScrollTrigger.refresh()` after fonts load or after dynamic content alters layout. Viewport resize is auto-handled (debounced 200ms); font swaps and image loads are NOT. |
| GSR-09 | **SSR safety:** never call `gsap.*` or `ScrollTrigger.*` during SSR. `useGSAP()` runs client-only by default; if GSAP is imported at top level, the import is fine but execution must be inside `useGSAP()`. |
| GSR-10 | `markers: true` in ScrollTrigger config is dev-only. Strip before production deploy. |

## A.16 Composited Animation Laws (NEW in v3)

These rules ensure 60fps performance by keeping animation work on the GPU compositor (no layout, no paint).

| Rule ID | Exact rule |
| :---- | :---- |
| CAL-01 | Animate `transform` properties (`x`, `y`, `scale`, `scaleX`, `scaleY`, `rotate`) and `opacity` ONLY for any animation that runs continuously, on hover, or in any high-frequency context. These are GPU-composited. |
| CAL-02 | Animating `width`/`height`/`top`/`left`/`margin`/`padding` triggers layout reflow. Banned for hover and continuous animations. Use `scaleX`/`scaleY` with `transform-origin` instead. |
| CAL-03 | Animating `boxShadow` triggers paint. **Banned for `repeat: Infinity` loops.** For one-shot hover transitions, `boxShadow` is acceptable (single paint cost, bounded duration). For glow halos that pulse continuously, use Recipe 8 (composited pulse plate). |
| CAL-04 | Animating `backgroundColor` triggers paint. Bounded use on hover is acceptable. For continuous pulse, layer a colored div with animated opacity instead. |
| CAL-05 | `will-change: transform` belongs in CSS only on elements that animate. Don't apply to every element "just in case." globals.css applies it via `[data-framer-component-type]` selector to scope it to Framer Motion-rendered elements. |
| CAL-06 | `transform: translateZ(0)` on animated elements forces a GPU layer. Already applied via the same globals.css selector. |
| CAL-07 | The Counter implementation (Recipe 1) MUST use `useMotionValue` to avoid React re-renders during the count. With 10+ concurrent counters, setInterval-based counters cause measurable jank. |

## A.17 Mobile Auto-Trigger Pattern (NEW in v3)

Touch devices have no real `:hover` state. To synthesize "hover" feedback on touch, use the auto-trigger pattern.

| Rule ID | Exact rule |
| :---- | :---- |
| MOB-01 | Provide a `useIsMobile()` hook that returns `true` for viewports ≤1023px (matches Tailwind `lg` breakpoint). Implementation in `hooks/useIsMobile.ts`. Uses `window.matchMedia` with `'change'` listener. |
| MOB-02 | For card components that use `whileHover` on desktop, add a `useInView` ref + amount 0.5 trigger. When `isMobile && inView`, the component animates to its `"hovered"` variant. |
| MOB-03 | The "hovered" variant must be reusable for both `whileHover` (desktop) and `animate` (mobile in-view) paths. |
| MOB-04 | Card components using this pattern: ServiceCard (services grid), ReviewCard (reviews grid). |
| MOB-05 | Process step cards on mobile use a separate per-step pattern (per-step perimeter draw + circle pulse + connector line) per Recipe 3 mobile variant. |
| MOB-06 | This pattern is the approved exception to MSR-02's "identical animation system" rule. Behavior parity is preserved (same visual end state); trigger source differs by device capability. |

## A.18 Asset Compression Standards (NEW in v3)

Real assets (videos, photos) must be compressed before deploy to keep page weight reasonable.

| Rule ID | Exact rule |
| :---- | :---- |
| ASC-01 | Hero background videos: H.264, CRF 28, scale max dimension to 1440px, strip audio (background videos play muted), `+faststart` for streaming. ffmpeg: `ffmpeg -i src.mp4 -vf "scale=1440:1440" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart out.mp4`. Typical reduction: 90-95% from raw. |
| ASC-02 | Photo assets (before/after, hero stills): JPEG quality 3 (visually lossless ~q85), scale to 2400px max width. ffmpeg: `ffmpeg -i src.png -vf "scale=2400:-2" -q:v 3 out.jpg`. Typical reduction: 95-98% from raw PNG. |
| ASC-03 | Compressed assets live in `/public/video/` (videos) and `/public/images/` (photos). Reference via standard `<video src="/video/hero-bg.mp4">` or `style={{ backgroundImage: "url(/images/before.jpg)" }}`. |
| ASC-04 | If raw assets exceed 5MB before compression, compress before commit. Don't ship raw 30MB+ assets to Vercel — egress costs and load times suffer. |
| ASC-05 | Hero videos slowed to <100% playback rate must use `videoRef.current.playbackRate = 0.X` in a `useEffect`, AND re-apply on `play` event (some browsers reset playbackRate on loop restart). |

## A.19 Touch-Safe Slider Pattern (NEW in v3)

For before/after sliders or any drag-driven control on mobile.

| Rule ID | Exact rule |
| :---- | :---- |
| TSS-01 | Container MUST have `touchAction: "none"` style — prevents browser from intercepting touch as scroll gesture. |
| TSS-02 | Use `setPointerCapture(e.pointerId)` on `pointerdown` so subsequent `pointermove` events route to the same element even when finger leaves the original target. |
| TSS-03 | Pointer events live on the container, NOT on the handle. Handle is `pointer-events-none` (purely visual). Click anywhere in the slider area = jump there + start drag. |
| TSS-04 | Mobile handle visually larger than desktop (`h-14 w-14` mobile, `h-12 w-12` desktop) for clearer touch affordance. |
| TSS-05 | Same approach applies to any custom-built drag control on mobile (carousels, range pickers). Don't rely on default browser touch handling. |

---

# LAYER B — KING MAKER BRAND RULES

These rules apply ONLY when building or updating kingmakerseo.com (the agency site). Do NOT apply these to client builds.

## B.1 King Maker Visual Identity

| Token | Value |
| :---- | :---- |
| KMB-T-01 | Background: `#0f0f23` — root dark background. |
| KMB-T-02 | Navy: `#16213e` — card backgrounds, section dividers. |
| KMB-T-03 | Charcoal: `#1a1a2e` — secondary section backgrounds. |
| KMB-T-04 | Amber accent: `#EAB308` — CTA highlights, hover states, trust signals only. Never flood a section with this color. |
| KMB-T-05 | Headline font: `Bebas Neue`. |
| KMB-T-06 | Body font: `Playfair Display`. |
| KMB-T-07 | Grain overlay: 3-5% opacity CSS noise filter — apply to hero only unless atmosphere needed elsewhere. |
| KMB-T-08 | Theme: dark by default. No light mode anywhere on King Maker site. |
| KMB-T-09 | **Avoid as sole display font on King Maker site:** Inter, Roboto, Space Grotesk. These are great workhorse body fonts but signal generic AI-template aesthetic when used as the primary display face. Acceptable as a clean *secondary* font paired with a distinctive primary (e.g., "Bodoni Moda + Inter Tight" works; "Inter alone for everything" doesn't). On non–Layer-B builds (client sites, Layer C), no restriction — use whatever serves the client's brand. |

## B.2 King Maker Site Architecture

| Rule ID | Exact rule |
| :---- | :---- |
| KMB-A-01 | The King Maker site uses 5 sections: Hero, Why This Matters, The Process, Why Now (AI bubble frame), CTA. |
| KMB-A-02 | No portfolio. No demo links. No client testimonials. The site itself IS the portfolio. |
| KMB-A-03 | No pricing on the site. Pricing lives in the cold email and is reconfirmed on the call. |
| KMB-A-04 | Single CTA. Calendly embed or contact form with 5 fields max (name, email, phone, city, company). |
| KMB-A-05 | Voice continuity with the cold email. Same operator energy throughout. |

---

# LAYER C — CLIENT BUILD RULES

These rules apply when building client landing pages (e.g. roofers). Layer A technical and animation rules are still locked. Visual identity flexes per client.

## C.1 Visual Identity (Flexible Per Client)

| Rule ID | Exact rule |
| :---- | :---- |
| CBR-V-01 | Visual identity (typography, color palette, aesthetic direction) is determined by the client's existing brand, not King Maker's. Truck wraps, yard signs, existing logos, and reference sites are the brand anchor. |
| CBR-V-02 | If the client has no clear brand, propose 2-3 aesthetic directions matching their market positioning (luxury residential, blue-collar trustworthy, modern commercial, heritage/legacy, etc.) and let them choose before building. |
| CBR-V-03 | Dark theme is preferred but not mandatory for client builds. If the client's brand is light-mode, build light-mode with the same animation rigor. |
| CBR-V-04 | Banned fonts list does NOT apply to client sites. Use whatever fonts match the client's brand. |
| CBR-V-05 | Color palette is determined by the client's brand. Amber accent is King Maker's color — do not impose it on client sites. Update `components/animations/variants.ts` to swap amber rgba values for client's accent rgba values. |

## C.2 Required Page Architecture (Default)

The default narrative order is locked for client sites. Visual identity flexes; conversion architecture does not.

| Section Rule | Requirement and purpose |
| :---- | :---- |
| RPA-01 | The Hero section is required to establish authority, urgency, service geography, and the immediate CTA. |
| RPA-02 | The Services section is required to define the offer and give the visitor language for the problem. |
| RPA-03 | The Trust Grid is required to compress proof points into scan-friendly metrics or credentials. |
| RPA-04 | The Before/After section is required to show transformation and craftsmanship visually. |
| RPA-05 | The Process section is required to reduce anxiety by making the buying experience legible. |
| RPA-06 | The Reviews section is required to supply emotional proof and social validation. |
| RPA-07 | The Coverage section is required to confirm local relevance and search-intent breadth. |
| RPA-08 | The Final CTA section is required to convert intent into a call, form, or estimate action. |
| RPA-09 | The Footer is required to repeat core trust and service geography compactly. |

Default narrative order: hero → services → trust → before/after → process → reviews → coverage → final CTA → footer.

## C.3 Section-Count Exception (NEW in v3)

A client may request a condensed site with fewer than 9 sections. The 3-section variant is documented and supported.

| Rule ID | Exact rule |
| :---- | :---- |
| RPA-10 | **3-section client variant:** if the client wants a condensed page, the approved 3-section composition is: (1) Hero with identity + immediate CTA, (2) Trust + Services merged into a single dense card with perimeter draw, (3) Final CTA with urgency close. Plus footer (footer is structural, not a section). Used for Baker Roofing reference build. |
| RPA-11 | Any other section count or composition requires explicit client approval and documentation in the project's CLAUDE.md. The 9-section default and 3-section variant are the only blessed compositions. |
| RPA-12 | When using the 3-section variant, the Trust+Services merged section uses a scrub-driven perimeter draw (Recipe 3) wrapping both the trust metrics row and the services grid. |

## C.4 Typography and Layout Rules

| Rule ID | Exact rule |
| :---- | :---- |
| TLR-01 | Use a high-contrast display font for primary headlines and a separate serif or humanist body font for supporting copy. Specific fonts vary per client. Never run the entire experience on one neutral sans family. |
| TLR-02 | Approve hero copy length and line breaks in static mode on desktop and mobile before any per-letter animation is added. |
| TLR-03 | Reserve extra horizontal tolerance around animated headlines; do not place per-letter motion inside wrappers sized only to the final static text width with no transform allowance. |
| TLR-04 | Build the hero layout in this order: content block width, line breaks, CTA block, stat rail geometry, and only then motion. |
| TLR-05 | Achieve tight mobile layouts by reducing vertical padding, card minimum heights, and tracking density first; do not solve tightness by deleting visual hierarchy. |
| TLR-06 | Set the stat rail position only after the CTA stack and headline block are final. |
| TLR-07 | **Default: avoid mobile-only headline fallbacks.** They usually indicate desktop-thinking that didn't survive responsive testing — and divergent copy across viewports creates SEO and brand-consistency issues. *However:* when a desktop headline genuinely doesn't fit mobile (long copy, narrow viewport) and shortening hurts the desktop version, a mobile-specific variant is acceptable. Document the variation and the reason in the project's CLAUDE.md so it isn't a hidden inconsistency. |

## C.5 Client Intake Schema

Before beginning any client build, collect and confirm all required fields. Do not initialize the project or write a single line of markup until required fields are complete.

| Field ID | Field | Required / Optional |
| :---- | :---- | :---- |
| CI-01 | Company name | Required |
| CI-02 | City and state | Required |
| CI-03 | Primary phone number | Required |
| CI-04 | Primary services (list up to 6) | Required |
| CI-05 | Number of Google reviews | Required (use 0 if new business) |
| CI-06 | Average star rating | Required |
| CI-07 | Years in business | Required |
| CI-08 | Hero headline | Required |
| CI-09 | Hero stat 1 — label and value | Required |
| CI-10 | Hero stat 2 — label and value | Required |
| CI-11 | Hero stat 3 — label and value | Required |
| CI-12 | Primary CTA copy | Required |
| CI-13 | Service area cities (list up to 10) | Required |
| CI-14 | Brand colors or color preferences | Required |
| CI-15 | Existing logo file | Required |
| CI-16 | Reference sites the client likes (up to 3) | Required |
| CI-17 | License number | Optional |
| CI-18 | BBB rating or accreditation | Optional |
| CI-19 | Hero background video or image URL | Optional |
| CI-20 | Before/after photo URLs | Optional |
| CI-21 | Featured review quotes (up to 3) | Optional |
| CI-22 | Secondary CTA copy | Optional |
| CI-23 | Section count preference (default 9, condensed 3) | Optional |

---

# RECIPES APPENDIX (NEW in v3)

10 reusable patterns proven out in Peak Roofing (kingmaker-demo) and Baker Roofing (baker-roofing). Reference these by number when building. Don't reinvent.

## Recipe 1: Counter on useMotionValue

**Problem:** `setInterval(setCount, 16)` causes ~60 React re-renders per second per counter. With 10+ concurrent counters, this is measurable jank.

**Pattern:** use Framer Motion's `useMotionValue` + `animate()`. Display value updates via direct DOM mutation inside Framer Motion — zero React re-renders.

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'

export function Counter({ target, suffix = '', prefix = '', duration = 2000, format }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false })  // MSR-13: replay on every entry
  const value = useMotionValue(0)
  const display = useTransform(value, (v) => {
    const n = Math.floor(v)
    return `${prefix}${format ? format(n) : n}${suffix}`
  })

  useEffect(() => {
    if (!isInView) { value.set(0); return }
    const controls = animate(value, target, { duration: duration / 1000, ease: 'linear' })
    return () => controls.stop()
  }, [isInView, target, duration, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
```

**Use everywhere counters appear.** Per CCR-03, this is mandatory.

## Recipe 2: Load-Triggered Perimeter Draw

**Problem:** want an amber outline to "draw" around an element on page load (e.g., wrapping the hero headline) for cinematic emphasis.

**Pattern:** 4 absolutely-positioned div lines + GSAP timeline that sequences `scaleX`/`scaleY` from 0→1 with `origin` set to chain the direction continuously.

```tsx
const topRef = useRef<HTMLDivElement>(null)
const rightRef = useRef<HTMLDivElement>(null)
const bottomRef = useRef<HTMLDivElement>(null)
const leftRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const fallback = setTimeout(() => {  // safety: snap to drawn if GSAP doesn't fire
    [topRef, rightRef, bottomRef, leftRef].forEach(r => {
      if (r.current) gsap.set(r.current, { scaleX: 1, scaleY: 1 })
    })
  }, 5500)

  gsap.timeline({ delay: 1.6, onStart: () => clearTimeout(fallback) })
    .to(topRef.current,    { scaleX: 1, duration: 0.55, ease: 'none' })
    .to(rightRef.current,  { scaleY: 1, duration: 0.55, ease: 'none' })
    .to(bottomRef.current, { scaleX: 1, duration: 0.55, ease: 'none' })
    .to(leftRef.current,   { scaleY: 1, duration: 0.55, ease: 'none' })
}, { scope: containerRef })

// JSX:
<div className="relative inline-block px-6 py-5">
  {/* Static white tracks at the perimeter */}
  <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/[0.08]" />
  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-px bg-white/[0.08]" />
  <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-white/[0.08]" />
  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" />

  {/* Animated amber lines */}
  <div ref={topRef}    className="pointer-events-none absolute left-0 right-0 top-0 h-px origin-left bg-amber-400" style={{ transform: 'scaleX(0)', boxShadow: GLOW }} />
  <div ref={rightRef}  className="pointer-events-none absolute right-0 top-0 bottom-0 w-px origin-top bg-amber-400" style={{ transform: 'scaleY(0)', boxShadow: GLOW }} />
  <div ref={bottomRef} className="pointer-events-none absolute left-0 right-0 bottom-0 h-px origin-right bg-amber-400" style={{ transform: 'scaleX(0)', boxShadow: GLOW }} />
  <div ref={leftRef}   className="pointer-events-none absolute left-0 top-0 bottom-0 w-px origin-bottom bg-amber-400" style={{ transform: 'scaleY(0)', boxShadow: GLOW }} />

  {children}
</div>
```

**Timing:** delay 1.6s lets the headline character stagger settle first, then the perimeter draws. 0.55s per side. 5.5s fallback safety net.

**`GLOW`** = `"0 0 12px rgba(251,191,36,0.6), 0 0 24px rgba(251,191,36,0.25)"` (or client accent rgba).

## Recipe 3: Scroll-Scrub Perimeter Draw

Same 4-line setup as Recipe 2, but the GSAP timeline has a `scrollTrigger` with `scrub: 1.5` instead of a delay. Used in TrustBar for below-the-fold sections.

```tsx
useGSAP(() => {
  const fallback = setTimeout(() => { /* same fallback */ }, 1500)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardRef.current,
      start: 'top 85%',
      end: 'bottom 50%',
      scrub: 1.5,
      onEnter: () => clearTimeout(fallback),
    },
  })
  tl.to(topRef.current,    { scaleX: 1, ease: 'none', duration: 1 })
    .to(rightRef.current,  { scaleY: 1, ease: 'none', duration: 1 })
    .to(bottomRef.current, { scaleX: 1, ease: 'none', duration: 1 })
    .to(leftRef.current,   { scaleY: 1, ease: 'none', duration: 1 })
}, { scope: sectionRef })
```

Per GSR-06, ScrollTrigger lives on the timeline, not on individual tweens.

## Recipe 4: Mobile Auto-Trigger (Card Hover Synthesis)

Touch devices have no `:hover`. Synthesize one on scroll-into-view.

```tsx
import { useIsMobile } from '@/hooks/useIsMobile'
import { useInView } from 'framer-motion'

function ServiceCard({ service, index }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isMobile = useIsMobile()
  const inView = useInView(ref, { amount: 0.5, once: false })
  const showHovered = isMobile && inView

  return (
    <motion.a
      ref={ref}
      initial={{ y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      animate={showHovered ? 'hovered' : 'rest'}  // mobile auto-trigger
      whileHover="hovered"                        // desktop hover
      variants={cardVariants}                     // shared rest/hovered states
      ...
    >
      ...
    </motion.a>
  )
}
```

**`useIsMobile` hook:**

```tsx
"use client"
import { useEffect, useState } from 'react'

export function useIsMobile(maxWidth = 1023): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [maxWidth])
  return isMobile
}
```

## Recipe 5: Stat-Row Alignment to Headline Lines

When a hero has a tall multi-line headline on the left and a stack of 3 stats on the right, align each stat row vertically with each headline line.

```tsx
{/* Right column container: top-padded to match the eyebrow + headline-box-padding offset */}
<motion.div className="lg:col-span-4 lg:col-start-9 lg:pt-[88px]">
  {/* Each row's height = exactly one headline line (font-size × line-height) */}
  <div className="lg:flex lg:items-center lg:h-[calc(clamp(4rem,9.5vw,8.5rem)*0.88)]">
    <StatItem ... />
  </div>
  <div className="lg:flex lg:items-center lg:h-[calc(clamp(4rem,9.5vw,8.5rem)*0.88)]">
    <StatItem ... />
  </div>
  <div className="lg:flex lg:items-center lg:h-[calc(clamp(4rem,9.5vw,8.5rem)*0.88)]">
    <StatItem ... />
  </div>
</motion.div>
```

The clamp formula MUST match the headline's `fontSize` clamp (here `clamp(4rem, 9.5vw, 8.5rem)`) multiplied by its `line-height` (here 0.88). Both columns scale together responsively.

## Recipe 6: Per-Letter Typewriter + Hover (Hero CharLine)

Per MSR-15 + MSR-16. Hero override of MSR-05.

```tsx
function CharLine({ text, accent }: { text: string; accent: boolean }) {
  return (
    <div className="flex leading-[0.88]">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, x: -4 },
            visible: { opacity: 1, x: 0, transition: { ease: EASE, duration: 0.27 } },
          }}
          whileHover={
            char === ' ' ? undefined : {
              scale: 1.18,
              color: '#fbbf24',  // or client accent
              textShadow: '0 0 22px rgba(251,191,36,0.95), 0 0 44px rgba(251,191,36,0.55), 0 0 80px rgba(251,191,36,0.25)',
              transition: { ease: EASE, duration: 0.4 },
            }
          }
          className={char === ' ' ? 'inline-block w-[0.25em]' : 'cursor-default'}
          style={{
            display: 'inline-block',
            color: accent ? '#fbbf24' : '#f5f5f0',
            transformOrigin: 'center bottom',
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </div>
  )
}
```

**Parent stagger:** `staggerChildren: 0.06`, `delayChildren: 0.35`.

## Recipe 7: Animated Upward Draw (Stat-Stack Left Line)

Vertical accent line that draws upward from bottom on load.

```tsx
const lineRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const fallback = setTimeout(() => {
    if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 })
  }, 4500)
  gsap.fromTo(
    lineRef.current,
    { scaleY: 0 },
    { scaleY: 1, duration: 1.4, ease: 'power2.out', delay: 1.2,
      onStart: () => clearTimeout(fallback) }
  )
}, { scope: sectionRef })

// JSX:
<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-white/[0.12]" />
<div ref={lineRef}
     className="pointer-events-none absolute left-0 top-0 bottom-0 w-px origin-bottom bg-amber-400"
     style={{ transform: 'scaleY(0)', boxShadow: GLOW }} />
```

`power2.out` is the approved ease for upward/directional draws (ease-out feels right for "pulling up").

## Recipe 8: Composited Pulse Plate (CTA Glow Loop)

Replaces banned `boxShadow` infinite-loop animations (MSR-17, PP-08).

```tsx
{/* Container that wraps the button so the pulse plate sits outside any overflow:hidden */}
<div className="relative inline-flex">
  {/* Pulse plate — blurred amber, animates opacity + scale only (composited) */}
  <motion.div
    className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-amber-400 blur-2xl"
    animate={{ opacity: [0.22, 0.55, 0.22], scale: [0.95, 1.08, 0.95] }}
    transition={{ duration: 2.8, repeat: Infinity, ease: EASE }}
    aria-hidden="true"
  />
  <motion.a href="#cta" className="relative inline-flex ..." whileHover="hovered" ...>
    {children}
  </motion.a>
</div>
```

Blur is set ONCE statically; only `opacity` and `scale` animate. Both are GPU-composited. No paint cost during idle pulse.

## Recipe 9: Hover Glow Taxonomy

Shared variants in `components/animations/variants.ts`. Use the named variant; don't duplicate inline.

```tsx
export const logoHover     = { scale: 1.04, color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.7), 0 0 40px rgba(251,191,36,0.35)' }
export const navLinkHover  = { color: '#fbbf24', y: -2, textShadow: '0 0 18px rgba(251,191,36,0.6)' }
export const phoneHover    = { scale: 1.04, color: '#fbbf24', textShadow: '0 0 22px rgba(251,191,36,0.7), 0 0 44px rgba(251,191,36,0.3)' }
export const headlineHover = { scale: 1.015, textShadow: '0 0 30px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.25)' }
export const linkHover     = { color: '#fbbf24', x: 2, textShadow: '0 0 14px rgba(251,191,36,0.5)' }
export const buttonHover   = { scale: 1.03, boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)' }
export const cardHover     = { scale: 1.05, boxShadow: '0 0 25px rgba(234, 179, 8, 0.4)', borderColor: 'rgba(234, 179, 8, 0.8)' }
export const pillHover     = { scale: 1.08, boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)' }
export const hoverTransition = { ease: EASE, duration: 0.28 }
```

**Per-element coverage:** logo (header + footer), nav links (header), phone numbers (header + footer), section h2s, all CTA buttons, all link lists in footer.

## Recipe 10: Touch-Safe Slider (Before/After Drag)

Per A.19. Container handles all pointer events; handle is purely visual.

```tsx
const containerRef = useRef<HTMLDivElement>(null)
const [clipPct, setClipPct] = useState(48)
const [isDragging, setIsDragging] = useState(false)

const updateClip = (clientX: number) => {
  if (!containerRef.current) return
  const rect = containerRef.current.getBoundingClientRect()
  setClipPct(Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100)))
}

const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  setIsDragging(true)
  updateClip(e.clientX)  // jump to wherever tapped
  e.currentTarget.setPointerCapture?.(e.pointerId)
}
const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  if (isDragging) updateClip(e.clientX)
}
const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
  setIsDragging(false)
  e.currentTarget.releasePointerCapture?.(e.pointerId)
}

return (
  <div
    ref={containerRef}
    className="relative h-[480px] w-full cursor-ew-resize overflow-hidden select-none sm:h-[540px] md:h-[620px] lg:h-[680px]"
    style={{ touchAction: 'none' }}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerEnd}
    onPointerCancel={onPointerEnd}
  >
    {/* AFTER layer (bottom) */}
    <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/after.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

    {/* BEFORE layer (top, clipped) */}
    <div className="absolute inset-0 overflow-hidden" style={{ width: `${clipPct}%` }}>
      <div className="absolute inset-0" style={{
        width: containerRef.current ? `${containerRef.current.getBoundingClientRect().width}px` : '100vw',
        backgroundImage: 'url(/images/before.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
    </div>

    {/* Handle — pointer-events-none, all events go to parent */}
    <div className="pointer-events-none absolute top-0 bottom-0 z-20 flex items-center justify-center"
         style={{ left: `${clipPct}%`, transform: 'translateX(-50%)' }}>
      <div className="absolute top-0 bottom-0 w-[2px] bg-amber-400" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400 bg-[#0d0d0d] sm:h-12 sm:w-12">
        {/* Handle icon */}
      </div>
    </div>
  </div>
)
```

---

## The Standard

This doctrine is the enforcement line between a visually promising build and a true contractor-site factory. The standard is not aesthetics alone; it is repeatability, clarity, and disciplined Playwright-based verification.

| Rule ID | Exact rule |
| :---- | :---- |
| TS-01 | This doctrine is the non-optional start-of-build rulebook. |
| TS-02 | If a proposed change conflicts with this doctrine: **(a) check whether the conflicting rule is hard or soft.** Hard rules — engineering correctness, performance, accessibility, the 5 grep-enforceable bans (PP-05, PP-07, PP-08, PP-09, PP-10), inline-safe roots (CCR-06), useMotionValue counters (CCR-03), `'use client'` on motion components (AS-09), color contrast (FDG-08) — **rework the change**. **(b)** Soft rules — taste, animation values, default tokens, recommended components, easing palette defaults — **deviate and document the reason in the project's CLAUDE.md** so future sites can learn from it. The doctrine's authority is strongest where authority matters (preventing measurable bugs) and yields where designer judgment serves the project better (visual taste). |
| TS-03 | The system is factory-grade only when the next site can be built with fewer rethinks, fewer animation rewrites, less dependence on live debugging, and more reliance on shared contracts and Playwright verification. |
| TS-04 | Treat the useful defaults of the system — Next.js or Vite, Tailwind tokens, Framer Motion, GSAP via useGSAP, useMotionValue counters, perimeter draw recipes, mobile auto-trigger, composited pulse plates, Playwright verification, and checkpoint-based iteration — as disciplined standards rather than optional preferences. |
| TS-05 | Treat broad global CSS overrides, mixed visibility logic inside motion primitives, screenshot-based verification, unverified animation claims, `width`/`height` hover animations, and `boxShadow` infinite loops as anti-patterns that must be eliminated. |
| TS-06 | The agent must develop and maintain Playwright verification mastery as a core competency over time. |
| TS-07 | **(NEW in v3)** Every recipe in the appendix is a battle-tested pattern. When building a new section that resembles one, START from the recipe — don't re-derive from scratch. Doctrine compliance is faster than improvisation.|

---

## Appendix: 21st.dev Audited Pattern Imports (v3.2)

These 7 patterns were audited from 21st.dev's component registry on 2026-04-29 and approved for adaptation. They are NOT mandatory — they are reference patterns to consult when a project's brief calls for them. Adapt to project palette, copy, and motion intensity. Do not copy verbatim; that is the failure mode the v3.2 ban corrections were designed to prevent.

| ID | Pattern | One-line summary | When to reach for it |
|---|---|---|---|
| TFD-01 | **Cycling word swap** | Single headline word cycles through 3-4 variants via `motion.span` y-translate + `setTimeout` rotation. | Hero where one word carries the brand promise across multiple frames. |
| TFD-02 | **Sticky parallax content** | `useScroll` + `useTransform` driving `scale` (1 → 0.85) and `opacity` on a sticky background image while overlay copy translates through. | Editorial reveals between sections; long-scroll storytelling. |
| TFD-03 | **Horizontal clipPath wipe** | `clipPath: inset(0 100% 0 0)` → `inset(0 0% 0 0)` driven by scroll progress. Reveals images as a left-to-right wipe. | Feature reveals where image deserves dramatic entrance. |
| TFD-04 | **GSAP polygon split reveal** | GSAP ScrollTrigger + `clipPath` polygon animates a hero from split-half to full, with multi-layer parallax at different speeds. | High-budget hero moments; luxury-brand client work. Heavy — use with intent. |
| TFD-05 | **3D tilt card** | `useMotionValue` + `useSpring` on `rotateX/rotateY` derived from cursor position over the card. Optional radial-gradient glare follows mouse. | Interactive cards (pricing, feature, portfolio) where hover should feel physical. |
| TFD-06 | **Text-shimmer loader** | Bg gradient on text via `bg-clip-text` + animated `bg-position` shimmer. Pure CSS, no setInterval. | Loading states, "thinking" indicators, in-page generation feedback. |
| TFD-07 | **clipPath intro reveal** | Percentage counter ticks 0→100, then `clipPath: inset(0 0 100% 0)` animates the loading overlay up off the page, revealing content. | Site intros where the loader IS the brand moment. |

**Doctrine notes for these imports:**
- All 7 are composited (transform/opacity/clip-path only) — no PP-09 violations.
- TFD-01 and TFD-07 use `setTimeout`/`requestAnimationFrame` for sequencing (not `setInterval` counters — PP-10 still applies).
- TFD-04 requires GSAP ScrollTrigger; remember GSR-01..10 (`@gsap/react` `useGSAP()` hook).
- TFD-02, TFD-03 are pure Framer Motion — preferred default before reaching for GSAP.
- Aurora/blur-blob backgrounds were AUDITED AND REJECTED. Stay rejected unless a specific brief calls for them with documented reason (per VPC-12 v3.1 framing).

Full audit reasoning lives in the v3.2 conversation transcript. Future audit passes should append new approved patterns here with a `TFD-NN` ID.

---

## Appendix: Design Audit Checklist (DAC) — patterns we keep failing at

This appendix is a **living document**. Every site we ship gets audited against this list before the build is considered complete. New entries get added when we discover a recurring failure mode in the wild. These are operating principles (A.11b — judgment-enforced), not engineering bans.

### TLR-12 — clamp() does not guarantee no-wrap
`clamp()` scales fonts with viewport width but knows nothing about the actual character count of the line of text. A long headline with a forgiving clamp will wrap unexpectedly at certain breakpoints, dropping a single letter to a new line ("CITY", "PURPOSE", "SEARCH").

**Rule:**
- Every headline that MUST stay on one line gets `whiteSpace: nowrap`.
- The clamp range is **calculated against the longest line of text in the headline**, not chosen by feel. Test at the deploy widths (390, 768, 1024, 1280, 1920).
- Add a Playwright test (VS-12 family) that measures `boundingRect.height` against `lineHeight` for each critical headline and fails if the line wraps.
- When using cycling/swap-in elements inside a headline (e.g., TFD-01), set the inline element's `lineHeight: "inherit"` so it doesn't push its row taller than neighbours.

### DAC-01 — No two image-led sections adjacent
Image fatigue. Two consecutive sections with full-bleed photographic headers feel like brochures, not editorial design.

**Rule:** Insert a typography-only interstitial between any two image-led sections. The interstitial uses no images, no eyebrow, no card grid. Pure rest.

### DAC-02 — Hover glow is reserved for interactive elements
When every text element on the page has an amber `whileHover` glow (body paragraphs, eyebrows, passive H2s, decorative captions), the amber stops meaning anything. Brain learns "amber = decoration" instead of "amber = clickable."

**Rule:**
- Amber hover glow ONLY on: links, buttons, inputs, and signature interactive headlines (e.g., the Hero per-letter typewriter is interactive — Recipe 6).
- Passive H2/H3/body text gets no hover state. The CharacterStagger entrance is the moment.
- Decoration-tier `whileHover` on non-interactive surfaces is the failure mode.

### DAC-03 — Interstitials are rest, not pitch
The interstitial between two pitched sections must be **breath**, not another sales hook. Pitching during a transition collapses the rhythm and signals desperation ("we will sell you in every available pixel").

**Rule:**
- Interstitial copy must be contemplative or positional, not promotional.
- Avoid restating the next section's H2 in different words — that creates duplication, not foreshadowing.
- Single line, italic Garamond, large editorial. No CTA, no link.

### DAC-04 — Delete invisible inter-section gradients
Gradients between two identical background colors render as nothing visible but cost DOM weight, accessibility-tree noise, and developer cognitive load every time someone re-reads the section. The doctrine that said "engineer smooth section transitions" was right for image-to-dark, wrong for dark-to-dark.

**Rule:**
- Gradients are kept ONLY over actual visual transitions (image → dark, dark → image, color → color).
- Run `grep -rn "from-\[#XX\] to-transparent\|from-transparent to-\[#XX\]"` against your section files. If the section ABOVE or BELOW is the same color, delete the gradient.

### DAC-05 — Repeated section structure causes pattern fatigue
After the brain pattern-matches "every section has eyebrow + amber rule + CharacterStagger H2 + body + bridge line," it stops feeling each individual section. The 5th instance is invisible.

**Rule:**
- At least one section per page deliberately breaks the rhythm. Different layout, asymmetric grid, no eyebrow, different typography size — anything that resets the brain's pattern.
- Best practice: pick the section with the highest narrative weight (often the stats / proof section) to be the rhythm-breaker.

### DAC-06 — Audit unused CSS classes
If a section references a CSS class (e.g., `.grain-overlay`) that isn't defined anywhere in your stylesheet, the div renders nothing — pure DOM noise. This sneaks in when global CSS gets refactored without auditing the JSX consumers.

**Rule:** Pre-deploy grep: `grep -rn "className=\"[a-z-]*overlay\"\|className=\".*grain\"" components/`. For every match, confirm the class actually exists in `globals.css` and produces a visible style.

### DAC-08 — Minimum body type sizes on dark backgrounds
On near-black backgrounds, low-contrast small body text becomes unreadable, especially in italic or thin typefaces. The earlier doctrine pushed for restraint, which got mistranslated into "smaller is more refined." It isn't.

**Rule (floors, not ceilings):**
- **Eyebrows:** `text-base` (16px) minimum, never `text-sm`/`text-xs`. Bump to `text-lg` on lg+ viewports.
- **Body paragraphs in declarative sections:** `text-lg` (18px) minimum, `text-xl` (20px) on `md:`+.
- **Stat narration / supporting captions under big numbers:** `text-xl` (20px) minimum, `text-2xl` (24px) on `md:`+.
- **Closing/punchline italic copy:** `text-xl` minimum, `text-2xl` on `md:`+.
- **Hero subheads:** `text-xl` minimum, `text-2xl` on `md:`+.
- Body text on dark must use opacity ≥ `/75` (white). `/55` and `/65` are decoration tiers, not body tiers.

**Why this matters:** The brain treats undersized supporting text as "skip this." Then the user is reading numbers without context, headlines without setup, and the copy carrying the actual sales argument is invisible. Scale the supporting text and the structure starts to function.

### DAC-13 — Animation density is layered, not loud
For sites where motion is part of the credibility argument (the site IS the portfolio), **trigger animations alone leave dead air between scroll moments**. Adding more loud-per-element motion produces busy chaos. The fix is **layered subtle motion across multiple categories at once**.

**The four categories of motion every premium-feeling site uses:**

| Category | What it does | Examples |
|---|---|---|
| **Triggered** | Fires on scroll-into-view, then settles | Counter, AnimatedUnderline, TypeInHeading, fade-in |
| **Continuous ambient** | Always-on, never demands attention | Slow-rotating markers, breathing pulse on numbers, headline shimmer sweep |
| **Cursor-responsive** | Reacts to where the cursor is | Cursor spotlight on cards, magnetic CTAs, 3D tilt on hover (TFD-05) |
| **Scroll-linked** | Drives motion off scroll progress directly | Top progress bar, parallax on hero video, clip-path reveal (TFD-03) |

**Rule:**
- A site whose business is design proof must have motion in **at least three of the four categories at all times**. Triggered animations alone read as "designed once, then static."
- Per-element motion stays **subtle** (small scales, low opacities, slow durations). Aggregate density across many elements is what creates the "alive" feel — not any single loud animation.
- **Standard animation kit** (the v3.8 baseline):
  - Section H2s use `<TypeInHeading>` (left-to-right type-in, ~0.6s for a typical headline)
  - All numbers use `<AnimatedCounter>` with `minDurationS: 0.8` so even 0→1 feels deliberate
  - Key sentences (1-2 per section, not every line) get `<AnimatedUnderline>`
  - Cards get cursor spotlight + 3D tilt on hover + continuous breathing pulse on numbers
  - Constellation / marker icons rotate slowly when inactive (continuous ambient)
- **Test:** scroll the page top-to-bottom slowly. If you can find 5 consecutive seconds where nothing is moving on screen, add a continuous-ambient or cursor-responsive layer to fill the gap.
- **Counter-rule:** if any single animation calls attention to itself (the user notices it specifically), it's too loud — dial it back.

This rule was learned in v3.8 after the user reported the v3.7 site felt "1/3 to 1/2 the animation density" needed for the credibility-via-motion strategy.

### DAC-12 — Audit Discipline: catch overflow + style-consistency misses before commit
Two recurring failure modes that the prior audit didn't catch:

**(a) Content overflows its container.** Stat numbers, headlines, and labels are easy to size by feel and ship without measuring against the narrowest container they live in. When the container is a card grid, the narrowest content area is at the `md` breakpoint (3-col layout, full padding) — NOT the desktop view the agent is reviewing. "50–150" looked fine on desktop and overflowed at md.

**(b) Style directive applied inconsistently.** When the user asks for a stylistic treatment on element A (e.g., "Title Case the pillars"), it must be applied to ALL similar elements (the fifth pillar header, eyebrows, any other prominent header text), not just the literal element they pointed at. Missing the consistency sweep makes the user repeat themselves.

**Rule:**
- **Pre-commit overflow audit:** for any change that touches `font-size`, card layout, or stat content, run a Playwright check that measures `scrollWidth` of inner content vs `clientWidth` of the container at all deploy widths (390, 768, 1024, 1280). VS-15 (`stat card numbers fit within card content area`) is the canonical example.
- **Stylistic-directive sweep:** when the user asks for X treatment on element A, grep / scan for all related elements (same role, similar prominence, adjacent in narrative) and apply X to each. Then call out what was changed beyond the literal request, so the user can confirm the sweep was correct.
- **Test at the narrowest deploy width, not the widest.** Card grids are most constrained when they first hit the `md` 3-col breakpoint — that's the audit width that catches overflow.
- **Title Case / casing checks** belong in the pre-commit audit. Grep for `text-transform: uppercase`, `\bCAPS\b` patterns, and any literal UPPERCASE strings in copy after a Title-Case directive.

This rule was learned from two specific misses in v3.6: (a) "50–150" overflowed the climax card on the lg viewport because the default `numberSizeClass` was sized against desktop visual inspection rather than the narrowest md card content area; (b) the fifth-pillar header copy stayed in sentence case even though the user's "Title Case the pillar titles" directive logically extended to it.

### DAC-11 — Practical layout + rich micro-animation = optimal for decision-makers
DAC-10 said "clarity beats artistry on pitching pages." That was correct but incomplete. The fuller synthesis: **traditional/practical layouts (3-card grids, consistent column alignment, predictable rhythms) are NOT flat if every important element is animated.** What made the v2 stat grid feel flat wasn't the grid — it was the lack of motion. The fix isn't to abandon the grid; the fix is to make the grid alive.

**Rule:**
- Default to traditional/practical layout patterns: 3-card pricing stacks, consistent grid alignments, vertical lists. They are scannable in one viewport and read as products, not magazines.
- THEN make every important element have a **visual hook** — entrance animation, counter animation, animated underline, hover lift, border-draw. The viewer feels the page is alive without having to parse an asymmetric layout.
- Avoid "design-driven" asymmetric layouts unless the asymmetry adds information value (e.g., a true visual hierarchy where one item dominates).
- Specific animation hooks that work as the kit:
  - **Stagger entrance** — cards/items slide in left-to-right with 0.08-0.12s offsets
  - **Counter / Range / Random counters** — Recipe 1, AnimatedRange, RandomCounter primitives
  - **AnimatedUnderline on titles** — draws under important words on scroll-in
  - **Hover lift + amber border-draw** — cards transform-up on hover with revealed amber border
  - **Short amber rule per card** — animates in slightly after the card lands
- Test: scroll the page top-to-bottom. Every important number, headline, key sentence should have at least one visual hook. If something is important and static, fix it.

### DAC-10 — Clarity beats artistry on pitching pages
For pages whose job is to convert a decision-maker (contractor, executive, buyer), **layout decoration without information value is a tax on the reader**. Asymmetric grids, staggered alignments, diagonal eye-paths — these are sophisticated for design audiences and friction for buyers.

**Rule:**
- A layout choice (asymmetric stagger, alignment alternation, off-grid composition) must be defended by the information value it adds. "Visual rhythm" is not enough on a pitching page.
- Default to consistent column alignment. Same-side numbers, same-side captions, predictable rhythm.
- Rhythm-breakers (DAC-05) should still add **clarity**, not just visual variety. The "rhythm-break" in WTM is now achieved by a different content structure, not by alternating alignment row to row.
- Editorial / portfolio / agency-marketing pages can flex this rule. Sales pages cannot.
- This rule was learned the hard way after two consecutive "asymmetric editorial" passes (WTM v3 + Citadel v3.4) that both got rejected by user feedback as "artsy for no reason." The user was right.

### DAC-09 — Static ambient amber emphasis is allowed inside interactive zones
DAC-02 banned amber `whileHover` glow on **passive text** (decoration on body paragraphs, eyebrows in non-interactive sections). It did NOT ban **static ambient amber** on text inside an interactive zone — input labels, output captions, the calculator's `/per month`, an eyebrow above a slider.

**Rule:**
- Inside an interactive component (calculator, form, slider, input zone), supporting text MAY use static amber color + a moderate `text-shadow` glow.
- The glow is NOT triggered on hover — it is always-on, signaling "this region is alive."
- Decoration-tier `whileHover` glow on passive text in declarative sections remains banned per DAC-02.
- Test: if the user could hover an element and see new glow appear, and the element isn't a CTA/link/input, that's still a DAC-02 violation. If it's static and lives inside an interactive zone, it's DAC-09 compliant.

### DAC-07 — Match cycling/animated child line-height to parent
When a `motion.span` or animated child sits inside a typography parent with custom `leading-[]`, the child's own `lineHeight` will silently override it inside the inline-flex flow. The visual result is one of the headline rows being taller than the others (and possibly failing TLR-12 single-line measurement).

**Rule:** Animated text children inside headlines must use `lineHeight: "inherit"` unless they have descenders that genuinely require clearance.

---

**Future audit passes append entries here.** When you find yourself fixing a problem you've fixed before on a different site, that's the signal — write the rule.

---

## Version History

**v1.0** — Initial doctrine consolidating Peak Roofing retrospective, build doctrine, and Visual Powerhouse component guidance.

**v2.0** (April 25, 2026) — Major refactor: split into three layers (Universal/King Maker Brand/Client Builds), Playwright-only verification, mobile parity, performance budgets, accessibility audits.

**v3.0** (April 29, 2026) — Patterns Refactor:
- **Codified 10 recipes** in appendix from Peak Roofing + Baker Roofing reference builds: useMotionValue Counter, load-triggered perimeter draw, scroll-scrub perimeter draw, mobile auto-trigger, stat-row alignment, per-letter typewriter+hover, upward draw, composited pulse plate, hover glow taxonomy, touch-safe slider.
- **Expanded GSAP scope (AS-04)** — now permits perimeter draws, scrub-driven line draws, and directional draws beyond just hero gradient + counters.
- **Added GSAP-React integration section (A.15)** — mandates `@gsap/react`'s `useGSAP()` hook, `refreshPriority`, `ScrollTrigger.refresh()` after fonts, SSR safety. Replaces raw `useEffect + gsap.context()` pattern.
- **Added Composited Animation Laws (A.16)** — `transform`/`opacity` only for continuous animations; ban on `width`/`height`/`top`/`left` hovers; ban on `boxShadow` infinite loops.
- **Added Mobile Auto-Trigger Pattern (A.17)** — `useIsMobile` + `useInView` for synthesizing hover on touch devices.
- **Added Asset Compression Standards (A.18)** — ffmpeg recipes for hero videos (CRF 28, 1440 max, no audio) and photos (q3, 2400 max).
- **Added Touch-Safe Slider Pattern (A.19)** — `touchAction:none` + `setPointerCapture` + `pointer-events-none` handle.
- **Added FDG-08 (color contrast minimum)** — `text-white/55` minimum on dark for body text. WCAG 2.1 AA enforcement via axe-core.
- **Added FDG-09 (composited properties only)** — never animate `width`/`height`/`top`/`left`.
- **Added CCR-06 (inline-safe root element)** — shared primitives used in `<p>`/`<h2>` MUST use `<span>` root, not `<div>`.
- **Added MSR-15** (hero typewriter override), **MSR-16** (per-letter hero hover), **MSR-17** (no boxShadow loops).
- **Added GSR-01..10** (full GSAP-React integration spec).
- **Added MOB-01..06** (mobile auto-trigger pattern spec).
- **Added ASC-01..05** (asset compression spec).
- **Added TSS-01..05** (touch-safe slider spec).
- **Added PP-08, PP-09, PP-10** (prohibited patterns: boxShadow loops, layout-trigger hovers, raw setInterval).
- **Added AS-10** (`@gsap/react` install required) and **AS-11** (Playwright CLI over MCP — Microsoft's recommendation, ~4× more token-efficient).
- **Added BSP-04** (copy primitives from reference repo at build start) and **FSR-05/FSR-06** (project setup workflow + canonical primitives list).
- **Added RPA-10/RPA-11/RPA-12** — 3-section client variant exception, used by Baker Roofing.
- **Added VER-06 hard-floor convention** — separates real-device doctrine budget (≥50/55fps) from headless test environment (≥30/5fps).
- **Updated CCR-03** — Counter MUST use `useMotionValue` + `animate()`. setInterval banned.
- **Updated A.13 pre-deploy checklist** — actual grep commands that catch v3 violations.
- **Updated CI-23** — section count preference field added to client intake.
- Reference implementations: kingmaker-demo (Peak Roofing, 9-section v3 reference), baker-roofing (Baker Roofing, 3-section variant reference).

**v3.1** (April 29, 2026) — Ban Correction Pass:
- **Demoted MSR-01** from "the only easing curve" to a 6-curve easing palette with documented usage per type (default UI / softer reveals / scrub / directional / breathing / spring). Anything outside the palette requires inline justification.
- **Demoted VPC-12** from "permanently excluded components" to "use with deliberate justification." Rainbow Button, Word Rotate hero, Aurora Text, Wavy Background are no longer banned — they're flagged as default-skip patterns that require project-level documentation when used.
- **Demoted KMB-T-09** from "banned fonts" to "avoid as sole display font on Layer B." Inter, Roboto, Space Grotesk are acceptable as secondary workhorse fonts paired with a distinctive primary. On Layer C client builds, no restriction.
- **Reframed A.11** — split into A.11a (hard prohibitions, grep-enforceable, never bend: PP-05, PP-07, PP-08, PP-09, PP-10) and A.11b (operating principles, judgment-enforced: PP-01, PP-02, PP-03, PP-04, PP-06). Reflects audit finding that some "bans" were workflow wisdom miscategorized as engineering rules.
- **Diagnostic principle established:** if a rule cannot be enforced by `grep`, it is taste or wisdom — not engineering. Such rules belong in operating principles or per-project CLAUDE.md, not in the doctrine's prohibition list.
- No code changes required — all corrections are doctrinal framing only. Existing builds (kingmaker-demo, baker-roofing, kingmaker-site) remain compliant under the more permissive framing.

**v3.9** (April 30, 2026) — Icon + Polish Pass:
- **Installed `lucide-react`** for clean line-art icons that match the existing geometric/architectural visual language (PillarMarkers).
- **Added optional `icon` prop to `<StatCard>`** — renders top-left, amber/85, drop-shadow glow, scales 1.1× on hover. Stagger entrance with the rest of the card.
- **Citadel cards icons:** Castle / Network / Crown.
- **WTM cards icons:** MousePointerClick / TrendingUp / CircleSlash.
- **Citadel fifth-pillar header font swap:** EB Garamond italic → Bodoni Moda regular. The italic at large sizes felt ornate and hard to read; Bodoni regular is cleaner and matches the THE CITADEL. H2 below it. Both lines now use TypeInHeading; second line wrapped in AnimatedUnderline.
- **WTM headline copy update (Capital Case + new "game" word):** "Local Search Is A Zero-Sum Game." / "Most Contractors Lose By Accident." Card titles also Capital Cased ("Top-Three Rule.", "The Leads They Keep.", "On Purpose.").
- **ROI calculator animated placeholder counter:** the "$15,000" placeholder is now an animated overlay that counts 0 → 15,000 once on scroll-into-view, holds, hides when the user starts typing. Demos the calculator's behavior before the user touches it.
- Tests: VS-09 updated to scope by section id rather than headline text (more resilient to copy changes); climax-title detector switched to case-insensitive match.
- 13/13 desktop tests passing. axe 0/0/0/0.

**v3.8** (April 30, 2026) — Motion Density Pass:
- **Added DAC-13** (animation density is layered, not loud) — codified the four motion categories (triggered / continuous ambient / cursor-responsive / scroll-linked) and the "≥3 of 4 active at all times" rule for sites where motion is the credibility argument.
- **New `<TypeInHeading>` primitive** — fast left-to-right per-character reveal (~0.6s for a typical section H2). Replaces CharacterStagger across all section H2s. Hero retains its slow per-letter typewriter ceremony.
- **New `<AnimatedCounter>` primitive** — shared counter with `minDurationS` floor so even 0→1 feels deliberate. Replaces ad-hoc per-section counter implementations.
- **StatCard motion-density upgrade:** added cursor spotlight (radial amber gradient that follows the mouse), 3D tilt on hover (rotateX/rotateY ±5deg via spring, TFD-05 finally deployed), continuous "breathing" pulse on the number (1 → 1.012 → 1 on a 5s loop). Existing kit (stagger entrance, hover lift + amber border, AnimatedUnderline title, amber rule) retained.
- **Section H2 sweep:** all sections (Process, Citadel, WTM, ROI, WhyNow, WhoIsKingMaker) now use TypeInHeading. Cascade delays so multi-line headings type in sequentially.
- **Citadel cards:** titles changed from poetic ("The keep / The outposts / The territory") to clear stat descriptions ("Primary City Page. / Satellite City Clusters. / Total Authority Pages.") with the cute names retained in captions. Per user feedback "the outpost is too vague at a glance."
- **Citadel closing:** "they're a year behind." → Title Case "They're A Year Behind." with TypeInHeading + AnimatedUnderline. Bigger amber rule under "Now There's Just One Question." cliffhanger.
- **WhoIsKingMaker:** credentials converted to AnimatedCounter (12+, 50+, 1) with 0.8s min duration; credential captions in Title Case + AnimatedUnderline on each. AnimatedUnderlines added to "Most agencies build websites." and "We work with one client per city." subtext lines.
- **Process pillar titles:** wrapped with TypeInHeading inside AnimatedUnderline so each Title Case pillar reads as a discrete designed moment.
- **Tests updated:** VS-11 normalizes NBSP for matching against TypeInHeading-rendered text; VS-12 traverses direct line-wrapper children instead of recursive descendant spans (TypeInHeading nests an extra wrapper); VS-14 validates new clearer card titles.
- 13/13 desktop tests passing. Mobile spot-check on overflow + headline rules also passing.

**v3.7** (April 30, 2026) — Audit Discipline Hardening:
- **Added DAC-12** (catch overflow + style-consistency misses before commit) after two specific misses in v3.6:
  - "50–150" climax card number overflowed its container at lg viewport (sized by desktop visual inspection rather than narrowest md card content area)
  - Fifth-pillar header copy stayed sentence-case even though user's Title-Case directive on pillar titles logically extended to it
- **Fixed both:** fifth-pillar copy → Title Case ("The Fifth Pillar — What Nobody Else Builds."); StatCard default `numberSizeClass` lowered from `clamp(3.5rem,7vw,5.5rem)` → `clamp(2.5rem,5.5vw,4rem)` so "50–150" fits within the narrowest md card content area at all viewports.
- **Added Playwright VS-15** (`stat card numbers fit within card content area`) — canonical pre-commit overflow check that measures `scrollWidth` vs `clientWidth` for every stat-card number and fails on overflow.
- StatCard inner number container gained `min-w-0` so flex/grid parents don't force overflow.

**v3.6** (April 30, 2026) — Practical-Plus-Motion Synthesis:
- **Added DAC-11** (practical layout + rich micro-animation = optimal for decision-makers). The synthesis after three asymmetric attempts: don't abandon traditional layouts — animate them richly. Codified the standard animation kit (stagger entrance, counter/range/random, AnimatedUnderline, hover lift + border-draw, per-card amber rule).
- **New `<RandomCounter>` primitive** — slot-machine spinner that resolves to a target. Used on the WTM "0" card so the punchline lands harder than a static value would. Anticipation → resolution.
- **New `<StatCard>` primitive** — shared card design language for the WTM and Citadel sections. Stagger entrance, hover amber border-draw, AnimatedUnderline title, amber rule, generous padding. Reusable across any future "stat card" placement.
- **WhyThisMatters rebuilt as 3-card stack** — 73% / 90% / 0 in a single-viewport 3-column grid. Each card has its own counter mechanic. The "0" uses RandomCounter for the slot-machine punchline. Replaces the asymmetric editorial layout (v3.5).
- **Citadel rebuilt as 3-card stack** — 1 / 5–15 / 50–150 with explainer captions ("The keep.", "The outposts.", "The territory."). The keep card uses AnimatedSingle counter (0→1), the others use AnimatedRange. Replaces the ascending-scale row layout.
- **Process pillars updated** — titles changed from UPPERCASE to Title Case ("Conversion-Based Design.") and wrapped with AnimatedUnderline so each title gets a scroll-triggered underline as a discrete designed moment.
- New Playwright tests: VS-09 updated for 3-card WTM with RandomCounter resolution check, VS-14 updated for 3-card Citadel with all three card titles + animated range values verified.
- 12/12 desktop tests passing at 60.3fps. axe 0/0/0/0.

**v3.5** (April 30, 2026) — Clarity-over-Artistry Pass:
- **Added DAC-10 (clarity beats artistry on pitching pages).** Two prior asymmetric-editorial designs (WTM v3 + Citadel v3.4) were both rejected by user as "artsy for no reason." The lesson: for pages whose job is to convert decision-makers, layout decoration without information value is friction. Defaulted to consistent column alignment everywhere.
- **New `WhoIsKingMaker` section replaces `Interstitial`** — the breath-beat between Hero and Process became a credibility/trust anchor. Section identifier (II.), bold headline ("Who builds this."), three short paragraphs with one AnimatedUnderline emphasis, plus a credential strip (years / sites / one-per-city positioning).
- **New reusable `<AnimatedUnderline>` primitive** — wraps any inline text with a scroll-triggered amber underline that draws left→right when the element enters view. Used to enforce "must-be-read" emphasis on key sentences.
- **Citadel rebuilt:**
  - Fifth-pillar header bumped to clamp 2-3.75rem ("full send" weight).
  - Intro copy changed from "network" → "territory" (stronger King Maker positioning), bumped to text-2xl/3xl, with AnimatedUnderline on "territory."
  - All rows simplified to consistent center alignment (DAC-10 — no more left/right/center alternation).
  - Climax row (50–150) now uses an `AnimatedRange` primitive that counts both ends from 0 simultaneously when in view.
  - Per-row vertical amber rule removed from climax (per user feedback) but retained on rows 1 & 2 for visual coupling.
  - Climax narration up-sized to text-2xl/3xl with text-shadow glow + AnimatedUnderline.
  - Per-row narration on rows 1 & 2 also gets AnimatedUnderline.
- **WTM rebuilt:**
  - Staggered diagonal layout (73% top-left, 90% bottom-right offset) replaced with consistent left-numbers / right-captions for both stat rows. The static "0" climax remains centered for contrast.
- **Process:**
  - "BUILD THE FOUNDATION. THEN THE KINGDOM." H2 bumped to clamp 2.4-5rem.
  - "These four put you on the map" bridge line now uses AnimatedUnderline so it can't be skipped.
- **ROI:**
  - Eyebrow ("What is dominance worth.") scaled ~50% larger (text-xl/2xl with stronger glow).
  - "Your Average Job" label bumped to text-lg/xl with brighter amber glow.
- New Playwright tests: VS-11 updated for `WhoIsKingMaker`, VS-14 added for Citadel 50→150 animated range.
- 12/12 desktop tests passing at 60.1fps. axe-core 0/0/0/0.

**v3.4** (April 30, 2026) — Readability + Interactive-Zone Pass:
- **Added DAC-08** (minimum body type sizes on dark) — codifies floors for eyebrows (16px+), body (18px+), stat narration (20px+), closing copy (20px+), hero subheads (20px+), and body opacity (white/75 minimum). Discovered after a full kingmaker-site audit revealed undersized supporting text was making readers skip the copy carrying the sales argument.
- **Added DAC-09** (static ambient amber inside interactive zones is allowed) — clarifies that DAC-02's hover-glow ban applies to **passive text** in declarative sections, not to **static** amber emphasis on labels/outputs/captions inside interactive components (calculator, form, slider). Without this clarification, DAC-02 was being over-applied and stripping correct emphasis from interactive zones.
- **kingmaker-site execution updates from this pass:**
  - Hero subhead bumped to text-xl/2xl with leading vertical amber tick mark for presence
  - Interstitial rebuilt with weight: Roman numeral marker (II.), much bigger Bodoni italic (clamp 2.4-5rem), 50vh+ vertical real estate, decisive amber rules. Restraint now reads as designed, not placeholder
  - Citadel header restructured: "Fifth pillar" eyebrow pulled ABOVE image as its own dark band with III. marker — type no longer competes with photograph
  - Citadel rows refactored: tight vertical coupling via short amber rule between number and narration; narration up-sized to text-xl/2xl; alignment alternates left/right/center per row but each row is now a tight vertically-composed artifact
  - Citadel "year behind" closing redesigned as bounded composition with hierarchy split (white setup → amber Bodoni payoff)
  - WTM stat narrations bumped to text-xl/2xl with tighter spacing to numbers
  - WhyNow body bumped to text-xl/2xl, closing TAKE THE THRONE H3 bumped to clamp 2.5-5.5rem with subline at text-xl/2xl
  - ROI calculator: DAC-09 amber emphasis on label, eyebrow, "/per month", and closing line; placeholder gets static amber glow via globals.css `::placeholder` rule (amber-color + text-shadow); closing line gets thin amber underline
  - All eyebrows site-wide bumped from text-sm to text-base/lg
  - Process pillar bodies bumped to text-lg/xl

**v3.3** (April 30, 2026) — Empirical Audit Pass (kingmaker-site polish session):
- **Added Design Audit Checklist (DAC) appendix** with 7 entries: TLR-12 (clamp/no-wrap), DAC-01 (no adjacent image-led sections), DAC-02 (hover glow only on interactive), DAC-03 (interstitials are rest), DAC-04 (delete dark-to-dark gradients), DAC-05 (rhythm-breaker per page), DAC-06 (audit unused CSS classes), DAC-07 (animated children inherit line-height).
- **Established the DAC framework:** living document, every site audited against it before ship. New entries added when a failure mode recurs across sites.
- **Empirical findings from kingmaker-site polish:**
  - Recipe 1 (counter) was in v3 doctrine but unused on this site — kickoff workflow needs an "every stat block defaults to count-up" check.
  - TFD-01 (cycling word) integrated cleanly with CharacterStagger by reserving min-width and inheriting line-height.
  - Three sections had clamp values that wrapped at common viewport widths — the systemic fix produced TLR-12.
  - 5 passive H2/H3 elements had decoration-tier hover glow — produced DAC-02.
  - 3 dark-to-dark gradients were rendering as DOM noise — produced DAC-04.
  - The `.grain-overlay` class was referenced in JSX but undefined in CSS — produced DAC-06.
- New site components: `Interstitial.tsx` (Hero/Process breath beat), `PillarMarkers.tsx` (4 distinct SVG markers replacing repeated ConstellationMarker).
- New Playwright tests: VS-09 (asymmetric stat counters), VS-10 (TFD-01 cycling verb), VS-11 (interstitial), VS-12 (TLR-12 single-line measurement), VS-13 (per-pillar marker distinctness).
- 22/22 tests passing across desktop-chromium and mobile-webkit.

**v3.2** (April 29, 2026) — Ban Correction Pass II (the rules that were producing "King Maker remix" sites):
- **Demoted VPC-13** from blanket component exclusion to "VPC-01..VPC-11 are recommended starting points." Custom components are encouraged when the brief calls for them. There is no implicit ban on components not on the list.
- **Demoted FSR-06** from "copy these primitives verbatim" to "reference implementations — adapt to project." Blind verbatim copying is the failure mode that produces the "every site looks the same" symptom; primitives are jumping-off points, not mandatory artifacts.
- **Split TS-02** (the meta-rule) into hard/soft treatment: hard-rule conflicts (engineering correctness, performance, accessibility, the 5 grep-enforceable bans) → rework the change. Soft-rule conflicts (taste, animation values, default tokens) → deviate and document. This removes the "doctrine wins by default" trap that was suppressing project-specific judgment.
- **Demoted TLR-07** from "no mobile-only headlines" to "default: avoid; acceptable when desktop headline genuinely doesn't fit mobile, with documented variation." Removes the false-positive that flagged legitimate mobile typography work as a violation.
- **Demoted MSR-05** from locked stagger values (40ms / 0.6s / 0.05) to "sensible starting defaults — adjust per project's motion intensity." Character stagger is taste, not engineering.
- **Demoted MSR-07** from locked viewport amount (0.1) to "default — tunable per element." The `once: false` part remains LOCKED (re-trigger discipline is engineering); the `amount` value is taste.
- **Net effect:** doctrine now distinguishes structural/motion/animation engineering (locked) from visual identity, copy, component selection, and value tuning (per-project). Removes the friction that was preventing reference-site modernization workflows and 21st.dev component evaluation.
- No code changes required — existing builds remain compliant.
