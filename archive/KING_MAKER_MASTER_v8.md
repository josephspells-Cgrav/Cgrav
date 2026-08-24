# KING MAKER MOTION DOCTRINE

**Version:** 8.0
**Date:** 2026-05-10
**Author:** Joseph Spells
**Purpose:** Universal motion/engineering guide for premium scrolling-first web experiences
**Supersedes:** v7.1 (`KING_MAKER_MASTER_v7.md`). v7's structure is inherited; v8 is a delta — keeping what worked, fixing what didn't, adding the canonical recipes from the King Maker v2 build (`docs/AFTER_ACTION_v7_KINGMAKER.md`).

---

> v8 is leaner than v7 by design. v7 grew across multiple builds and accumulated explanation that was useful in-context but bloated the doctrine for readers. v8 is the consolidated form — every rule earns its place, every recipe is canonical and reusable. When v8 says less than v7, that's intentional. The lesson library is in `AFTER_ACTION_v7_KINGMAKER.md`; the doctrine itself stays focused.

---

## Part 0 — SESSION STARTUP, HIERARCHY & TASTE PROFILE

### 0.0 Pre-Flight Checklist (Run FIRST)

When this doctrine loads in a new session, run this checklist before any build work. Do not skip. Do not assume. Run all steps in parallel where possible.

---

**Step 1 — Discover Available Skills**

Skills appear in `<system-reminder>` messages or as slash commands. Scan the available list and verify the categories below. **If the manifest never injects, check `~/.claude/skills/` directly via Bash — skills on disk are still callable by name.**

**Skill categories to verify:**

| Category | Look For | When To Use |
|---|---|---|
| **Design & Taste** | `design-taste-frontend`, `frontend-design`, `gpt-taste`, `impeccable`, `redesign-existing-projects`, `huashu-design`, `ui-ux-pro-max`, `high-end-visual-design` | DURING build for design guidance + AFTER for polish/critique |
| **Motion & Animation** | `design-motion-principles`, `gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-timeline`, `gsap-plugins`, `gsap-performance` | DURING build for animation patterns + AFTER for motion audit |
| **Asset Generation** | `brandkit`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `image-to-code` | PRE-BUILD for visual brief + DURING for asset creation |
| **Code Quality** | `full-output-enforcement`, `simplify` | ALWAYS active for full output + AFTER for review |
| **Plugins** | `framer-motion@framer-motion-skill` | DURING build for production Framer Motion patterns |

**Skill invocation gates (non-negotiable):**

| Gate | Required | Skip Allowed? |
|---|---|---|
| **PRE-BUILD** | `redesign-existing-projects` (if modernizing) OR `brandkit` (if new brand) | No — invoke at least one |
| **DESIGN** | At least one of `design-taste-frontend`, `frontend-design`, `gpt-taste` | No — invoke at least one before any component design |
| **POST-BUILD** | `design-motion-principles` AND `impeccable` | No — both required before delivery |
| **VERIFICATION** | Chrome MCP visual + Playwright (FULL caps) + axe-core | No — all three required |

**Mid-build skill audit:** at every major iteration boundary, check if relevant skills are at 0% utilization. If yes, invoke them before continuing. v7 lesson: a build with 0% skill invocation despite skills being available is a doctrine violation.

---

**Step 2 — Discover Available MCP Servers & Tools**

Use `ToolSearch` in bulk — never one-at-a-time:

```
ToolSearch({ query: "chrome browser navigate screenshot", max_results: 15 })
ToolSearch({ query: "firecrawl scrape extract", max_results: 10 })
ToolSearch({ query: "generate image video balance models", max_results: 10 })
ToolSearch({ query: "preview screenshot start", max_results: 10 })
ToolSearch({ query: "magic component", max_results: 5 })
ToolSearch({ query: "computer-use", max_results: 30 })
```

**MCP inventory to verify:**

| Capability | Tool Pattern | Used For |
|---|---|---|
| **AI Image/Video** (Higgsfield) | `mcp__*__generate_image`, `mcp__*__generate_video`, `mcp__*__models_explore`, `mcp__*__balance` | Hero videos, service photography |
| **Chrome MCP** (Primary Eyes) | `mcp__Claude_in_Chrome__navigate`, `browser_batch`, `computer`, `gif_creator` | Visual verification, live DOM inspection |
| **Firecrawl** | `firecrawl_scrape`, `firecrawl_crawl`, `firecrawl_extract` | Reference site content extraction |
| **21st.dev Magic** | `mcp__magic__21st_magic_*` | Component inspiration + building |
| **Claude Preview** | `Claude_Preview__preview_*` | Lightweight dev-server preview |
| **Computer Use** | `mcp__computer-use__*` | Desktop app fallback |

---

**Step 3 — Higgsfield Workflow Verification (NEW v8 — explicit)**

If Higgsfield is found, load schemas and verify operations:

```
ToolSearch({ query: "select:mcp__*__models_explore" })
ToolSearch({ query: "select:mcp__*__balance" })
```

Then run `models_explore` + `balance`.

**Model + render time table:**

| Model | Best For | Render Time | Cost Tier |
|---|---|---|---|
| Cinema Studio 3.0 (6s) | Hero video, cinematic loops | 60–120s | Premium |
| Cinema Studio 3.0 (12s) | Premium pull-up reveal (no playbackRate slowdown) | **5–8 min** | Premium |
| Kling 3.0 | Image-to-video animation | 90–180s | Premium |
| Veo 3.1 Lite | Budget fallback when Cinema Studio throttles | 30–60s | Budget |
| Seedance 1.5 / 2.0 | Mid-tier alt | 60–120s | Mid |
| Nano Banana Pro | Fast concept images | 15–30s | Cheap |
| Cinema Studio 2.5 | Cinematic stills | 30–60s | Mid |

**Higgsfield workflow rules (v8 — non-negotiable):**

1. **Plus monthly plan has a per-month throttle independent of credit balance.** You can hit "Out of credits" with positive credits showing. Plan for 1–2 generations per session on Plus monthly. Upgrade to Pro for high-iteration builds.
2. **Always include realism anti-prompts when generating real-world contexts.** Models default to dramatic/unrealistic placements when not constrained. Example: "HVAC unit on a wall" → unit gets mounted on a wall like decoration. Fix: explicit negation — "on a concrete pad on the SIDE of the house, in the side yard, near the electrical meter, NOT on sidewalk, NOT on front wall." Negative prompts work on Cinema Studio 3.0.
3. **Generate at native longer duration — never use `playbackRate < 1.0`.** Halving playback halves frame rate, producing visible stutter. See §1.7 Video playback rate.
4. **Have a model fallback tier ready.** When Cinema Studio 3.0 quota hits, drop to Veo 3.1 Lite or Seedance 1.5 (30–50% cheaper, acceptable quality for placeholder iterations).
5. **Cinema Studio 3.0 at 12s = 5–8 min.** Don't promise "video in 60 seconds" when generating long. Use this time to build other components in parallel.

---

**Step 4 — Verify Playwright + Testing Infrastructure**

```bash
npx playwright --version
npm list @axe-core/playwright
npx playwright install --dry-run
```

If missing, install immediately:

```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

**Use the FULL Playwright capability set** — video recording, traces, `toHaveScreenshot()` pixel-diff, device emulation, network interception, console listeners, accessibility tree snapshots. v5/v6 treated Playwright as a glorified DOM query tool. v7+ expects the full surface.

---

**Step 5 — Verify Dev Environment**

```bash
node --version           # need 20+
npm --version
gh --version             # for repo creation
npm list framer-motion   # required
npm list gsap            # required if using ScrollTrigger
```

Install missing deps. **`framer-motion` is mandatory.** GSAP is required if any recipe uses ScrollTrigger.

---

**Step 6 — Web Scraping Capability Check**

If a reference site modernization is requested, you need to read it yourself:

| Priority | Tool | Method |
|---|---|---|
| 1st | Firecrawl MCP | `firecrawl_scrape` — clean text + structure + screenshot |
| 2nd | Chrome MCP | `read_page` / `get_page_text` — live DOM |
| 3rd | WebFetch | Raw HTTP source |
| 4th | None | Ask user (last resort) |

**Doctrine rule:** if Firecrawl or Chrome MCP is available, **crawl the reference site yourself.** Asking the user to describe a site you can read directly = wasted turns.

---

**Step 7 — Report Capabilities to User**

Present a single consolidated report covering: verification stack, skills (with checkmarks/warnings), MCPs (with checkmarks/credits/notes), dev environment. Then ask the aesthetic-mode question (Step 8).

---

**Step 8 — Aesthetic Mode Selection**

Always ask before building. Present the mode menu. Default to **Default (Taste)** if user gave no preference.

| Mode | What It Is |
|---|---|
| **Default (Taste)** | Anti-slop balanced premium. Spring motion, blur enters, glassmorphism. DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY dials (1-10). |
| **Soft** | $150K agency look. Three sub-vibes: Ethereal Glass, Editorial Luxury, Soft Structuralism. |
| **Minimalist** | Notion-like editorial. Warm monochrome, extreme serif/sans contrast, flat bento. |
| **Brutalist** | Swiss Industrial Print OR Tactical Telemetry CRT terminal. |
| **Color-Blocked Brutalist** | Recipe 29 — color-blocked numbered cards, oversized numerals. |
| **Motion Heavy** | Maximum cinematic motion. GSAP ScrollTrigger pinning, scrub, parallax. |
| **Regal Black + Gold** ⭐ NEW v8 | King Maker v2 DNA. Disciplined two-color palette (gold + alert red), refined dark surfaces, native-1.0x video, scrub-counter dramatics. |
| **Redesign** | Process, not look. Pair with any mode for target aesthetic. |

**Mode + Doctrine layering:** mode controls VISUAL DIRECTION. Doctrine controls MOTION SYSTEM, ENGINEERING, OPERATING PRINCIPLES, TASTE PREFERENCES. They layer simultaneously. Brutalist mode still uses springs, blur enters, verification stack.

---

### 0.1 Instruction Priority

```
Priority 1 (LOWEST)  — Taste Profile
Priority 2           — Doctrine Recipes & Patterns
Priority 3           — Reference Site Direction
Priority 4           — Explicit User Instruction
Priority 5 (HIGHEST) — Engineering Rules + Operating Principles
```

Engineering rules + operating principles are NEVER overridden — not by taste, not by reference, not by user instruction. They prevent broken builds, accessibility violations, performance failures, and blind-build mistakes.

### 0.1.1 Composable Instructions

Instructions stack. The user can combine STRUCTURE + DOCTRINE + TIGHTNESS in one directive:

| User Says | Structure | Doctrine | Tightness |
|---|---|---|---|
| "Roofing company, Charlotte, navy + gold" | Inferred from industry | v8 default | Loose |
| "Take [URL], same structure, v8" | Reference site (exact) | v8 closely | Structure locked, motion upgraded |
| "Take [URL] but v3 style" | Reference site | v3 doctrine | Older motion on new structure |
| "I want this exact site but 2026" | Reference (exact) | v8 strictly | Full upgrade — springs, blur enters, glassmorphism, video hero |

**The Modernization Play (most common):**
1. Crawl reference site yourself via Firecrawl/Chrome MCP — never ask user to describe
2. Lock structure — same sections, same order, same content hierarchy
3. Replace motion system — springs not ease-in-out, blur enters, directional staggers
4. Upgrade components — apply v8 recipes (audit ledger, dual scrub counter, etc.) where they fit without changing structure
5. Apply taste profile (TPs)
6. Generate AI assets where they elevate
7. Present build brief for confirmation before building
8. Run Chrome MCP visual preflight throughout

---

### 0.2 Taste Profile

Soft defaults — what to do when nothing else says otherwise. NOT rules. Yield to reference sites or explicit instruction.

**TP-01 — Typed-in headline animations.** Every section heading uses TypeIn (Recipe 6) — characters reveal left-to-right with stagger. Static headlines feel dead. **v8 sub-rule:** for above-the-fold elements (hero), use the always-visible-fallback initial state — see Recipe 6.

**TP-02 — Selective underlines on key headings.** Use AnimatedUnderline on primary section headings only. Underline must span MULTIPLE words, not a single orphan word.

**TP-03 — Trust banner directly below the hero.** Stats with counter animations.

**TP-04 — Animated fine-line separators.** Thin 1px accent-colored lines (scaleX 0→1) between content zones within sections.

**TP-05 — Counter numbers with stat underlines.** useMotionValue Counter + thin animated underline. Number lands, line confirms.

**TP-06 — Directional card entrances (alternating left/right).** Cards in grids alternate entry directions based on grid position. (See also DAC-15.)

**TP-07 — Stat sections are sacred but supporting.** Don't over-design. Numbers are content. Stats are supporting weight, not main content (see TP-16).

**TP-08 — Split layout for service areas / location sections.** Media one side, content other. Don't overlay text on busy backgrounds.

**TP-09 — Mobile execution is not an afterthought.** Verify on mobile. Video backgrounds fire (autoPlay muted loop playsInline). Split layouts stack. Tag clouds wrap. Card grids single-column. **Sub-rule:** if axe-core false-positives on translucent nav over animated bg, enforce nav backdrop opacity ≥ 40% (see §1.3).

**TP-10 — Featured + supporting review layout.** One hero review (visually dominant), then supporting cards. Hierarchy IS the design.

**TP-11 — Accent-colored category tags on cards.** Per-card accent + small category tag pill. Sub-rule: accents must come from the locked palette (TP-15).

**TP-12 — Process sections with visual connectors.** Animated connecting lines between steps. **v8 sub-rule:** see Recipe — Process Step with Right-Side Stat Callouts for the canonical pattern.

**TP-13 — Video hero by default.** Looping background video unless told otherwise. Fallback chain: Higgsfield generation → animated gradient → static color (last resort, never preferred).

**TP-14 — Proactive image generation.** Generate AI assets where they elevate. Don't make user ask.

**TP-15 — Brand-palette discipline.** Enforce both programmatically (audit `lib/data.ts` accents) AND visually (look at live page through Chrome MCP). Off-brand colors that look fine in isolation accumulate and break cohesion. **Sub-rule (v7.1):** validate token brightness against WCAG AA on each surface BEFORE first build. Default token sets ship too dim — bump aggressively.

**TP-16 — Scale to section role.** Supporting content (trust strips, stat ribbons) starts SMALLER than main content (process steps, hero). Same DNA at wrong size = wrong design.

**TP-17 — Pattern propagation from user signals.** Strong positive signal → catalog pattern, look for adjacent applications. Strong negative signal → catalog rejection, audit other instances. Single-element feedback rarely about a single element. **v8 sub-rule:** when user requests a token-level change ("make it brighter"), audit token usage globally — bump everywhere the token is used in one pass.

**TP-18 — Mid-build skill audit.** Pre-flight discovery is a START gate. At every major iteration, list available skills, which I've invoked, which I should have. Gap = invoke before continuing.

**TP-19 — Source-of-truth constants in `lib/data.ts` ⭐ NEW v8.** When numbers come from a deck/spec/source document, save them as named constants in `lib/data.ts` with a comment citing the source page. Makes iteration easy — change once, reflected site-wide. Example from King Maker v2:

```ts
// Capture-rate progression sourced from sales deck (3-year compounding model).
const YEARS = [
  { y: "Year 1", capture: 0.10, conv: 0.04, close: 0.25 },
  { y: "Year 2", capture: 0.15, conv: 0.05, close: 0.30 },
  { y: "Year 3", capture: 0.20, conv: 0.06, close: 0.32 },
];
```

**TP-20 — Higgsfield realism via anti-prompts ⭐ NEW v8.** When generating real-world contexts (HVAC, signage, vehicles, buildings), include explicit negative qualifiers. Models default to dramatic/unrealistic placements. See §0.0 Step 3 Higgsfield workflow rules for full pattern.

---

### 0.3 Operating Principles (always active, Priority 5)

Mental models that govern HOW Claude works. Cannot be overridden.

**OP-01 — Vision for taste, assertions for correctness.** Screenshots/GIFs answer "does this *feel* right?" DOM assertions answer "is this *technically* right?" Use BOTH. Either alone is insufficient.

**OP-02 — Never build UI blind.** If writing UI code, look at the result after every meaningful change. Continuously, not at the end.

**OP-03 — Recognize inference vs perception.** "The cards should look square because I set `aspect-square`" → inference. "The cards look square in this screenshot" → perception. Always close the loop with perception.

**OP-04 — Scale to section role.** (Also TP-16.) Different elements have different size budgets based on hierarchical role.

**OP-05 — Trust user taste signals broadly.** (Also TP-17.) Single-element feedback rarely about a single element.

**OP-06 — Brand-palette discipline.** (Also TP-15.) Programmatic + visual enforcement.

**OP-07 — Audit tool/skill utilization mid-build.** (Also TP-18.) Pre-flight is a START gate, mid-build audit is mandatory.

**OP-08 — When verification stalls, switch tier ⭐ NEW v8.** When local Chrome MCP screenshots time out from continuous animations (marquees + breathing glows + grain noise), pivot to Vercel deploy-and-verify. Vercel deploys in 30–50s and serves cached assets — more reliable than the CDP retry loop. Don't burn 20+ minutes fighting local CDP. King Maker v2 lesson.

**OP-09 — Save handoff docs to `docs/` ⭐ NEW v8.** When iteration spans many turns, persist state to repo files: `TODO.md` for queued edits, `API_KEYS.md` for env-var checklists, `AFTER_ACTION_*.md` for retrospectives. Files outlive any single conversation and create continuity across sessions.

**OP-10 — Push back when a request risks the goal ⭐ NEW v8.** When user asks for X but Y serves their stated goal better, present 2–3 options with your recommendation rather than executing literally. Antigravity drop, capture → search-capture renames, 500-hour vs 1000-hour — every successful pushback in King Maker v2 came from giving options + recommendation. Users almost always accept the recommendation when reasoning is shown.

---

## Part 1 — ENGINEERING RULES

Hard rules. Never bend. Grep-enforceable or measurably prevent bugs.

### 1.1 Hard Performance Bans

| ID | Ban | Reason |
|---|---|---|
| PP-05 | Visual verification + DOM assertions are BOTH required (per §1.5). Either alone is insufficient. | Bunns build went 3 iterations blind on screenshots-only. |
| PP-07 | No skipping re-verification after changes | Every change gets re-tested. |
| PP-08 | No infinite `boxShadow` animations | Real paint cost. Use opacity or filter. |
| PP-09 | No `width` / `height` / `top` / `left` animations | Layout reflow per frame. Use `transform` and `opacity` only. |
| PP-10 | No `setInterval` counters | Use `requestAnimationFrame` or `useMotionValue`. setInterval drifts and re-renders React. |
| CCR-06 | No `<div>` inside `<span>`, `<p>`, `<a>` | Invalid HTML. Causes hydration mismatches. |
| **PP-11** ⭐ NEW v8 | **No HTML video `playbackRate < 1.0`.** | Halves effective frame rate → visible stutter. Generate at native longer duration. |

### 1.2 Hydration & Framework Rules

| Rule | Detail |
|---|---|
| `'use client'` directive | Required on EVERY component using Framer Motion or GSAP. No exceptions. |
| `useGSAP()` hook | All GSAP in React MUST use `useGSAP()` from `@gsap/react`. Never raw `useEffect` + `gsap.context`. |
| GSAP + Framer Motion separation | Never target the same DOM element with both. They fight over transform ownership. One element, one animation system. |
| Framer Motion ownership | If a component uses `motion.div`, Framer owns its transforms. GSAP can target children/siblings only. |
| GSAP ScrollTrigger cleanup | Every ScrollTrigger killed on unmount. `useGSAP` handles this — another reason to never use raw useEffect. |
| **Hooks-in-loop is fatal in React 19 strict** ⭐ NEW v8 | **NEVER call Framer Motion hooks (useTransform, useMotionValueEvent, useScroll) inside `.map()` or any loop, even over a constant-length array.** React 19 strict mode treats this as a fatal error — the parent component renders empty with no console warning. **Fix:** extract the loop body to a child component so the hook is called at component-top-level inside the child. |

**Hooks-in-loop fix pattern (canonical):**

```tsx
// ❌ BAD — kills the entire component silently in React 19 strict
{COPY_MOMENTS.map((m, i) => {
  const opacity = useTransform(progress, [m.range[0], m.range[1]], [0, 1]);
  return <motion.p style={{ opacity }}>{m.text}</motion.p>;
})}

// ✅ GOOD — extract to child component, hook is at top level of child
function CopyMoment({ progress, range, text }) {
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  return <motion.p style={{ opacity }}>{text}</motion.p>;
}
{COPY_MOMENTS.map((m, i) => (
  <CopyMoment key={i} progress={progress} range={m.range} text={m.text} />
))}
```

### 1.3 Accessibility Requirements

Non-negotiable. Legal requirements, not suggestions.

| Rule | Standard | Detail |
|---|---|---|
| Color contrast | WCAG 2.1 AA | Min 4.5:1 normal text, 3:1 large text |
| `prefers-reduced-motion` | WCAG 2.1 | Honor preference. Disable continuous loops. Keep opacity reveals. |
| axe-core verification | Zero tolerance | 0 critical, 0 serious. Run on every page. |
| Decorative elements | ARIA | `aria-hidden="true"` on glows, lines, particles, decorative chars |
| Keyboard nav | WCAG 2.1 AA | All interactive elements reachable. Focus indicators visible. |
| Semantic HTML | HTML5 | Use `<section>`, `<nav>`, `<main>`. Not everything is a `<div>`. |
| **Translucent nav backdrop** ⭐ NEW v8 | axe-core compatibility | Fixed-position translucent navs MUST have base background opacity ≥ 40% at all scroll positions. Fully-transparent nav over animated content fails axe contrast checks even when rendered contrast is fine — axe can't compute through `backdrop-blur`. |
| **Form input labeling** ⭐ NEW v8 | WCAG 2.1 AA | Every `<input>` MUST have paired `<label htmlFor="..." />` with matching `id`, OR explicit `aria-label`. Range sliders need `aria-label`. Decorative prefix glyphs (`$`, `/mo`) need `aria-hidden="true"`. |
| **Token brightness validation** ⭐ NEW v8 | WCAG 2.1 AA | Validate every text token against every surface token at AA contrast BEFORE first build. Provide a contrast matrix in starter palette. Default sets often ship too dim (King Maker v2's `--text-dim: #5C5240` was 2.57:1 — failed). Bump aggressively. See Recipe — Starter Palette. |

### 1.4 Animation Behavior Rules

```
RULE: once: false on whileInView / useInView for SCROLL-DRIVEN reveals.
For ABOVE-THE-FOLD elements (hero), use once: true + amount: 0.01
OR initial state that's visible (so content reads even if observer never fires).
```

```
RULE: Motion parity — desktop and mobile use IDENTICAL animation systems.
Never strip animations on mobile. Adjust timing/scale, never remove.
```

```
RULE: Mobile auto-trigger pattern.
Touch devices have no hover. Synthesize hover states via in-view detection.
```

### 1.5 Verification Contract

**Three-layer stack. All three required. Skipping any = incomplete verification.**

```
Layer 1: VISUAL (Chrome MCP — Primary Eyes)
   ↓
Layer 2: AUTOMATED (Playwright FULL capabilities — not just DOM)
   ↓
Layer 3: ACCESSIBILITY (axe-core)
```

**Playwright Full Capability Set — use all of these:**

| Capability | When |
|---|---|
| Video recording (`video: { mode: 'on' }`) | Every motion-heavy build |
| Trace files | Debug failed tests, verify complex sequences |
| `toHaveScreenshot()` pixel-diff | Catch unintended regressions |
| Device emulation | Mobile testing — real device profiles, not just viewport size |
| Network interception | Loading performance, broken images, missing assets |
| Console listeners | Uncaught exceptions, hydration mismatches |
| Accessibility tree | Beyond axe — verify semantic structure, focus order |
| DOM assertions | Standard correctness verification |

**Verification Checklist:**

| ID | Check | Pass | Layer |
|---|---|---|---|
| VC-00 | Visual preflight via Chrome MCP — screenshot every section at desktop + mobile | All visible, no regressions, palette consistent | Visual |
| VC-01 | Reload stability | Hero settles to final state. No stuck animations. | Auto |
| VC-02 | FPS budget desktop | 50fps sustained. Floor 30fps. | Auto |
| VC-03 | FPS budget mobile | 5fps headless floor (verify on physical) | Auto |
| VC-04 | Horizontal overflow | No scrollbar at 390px width | Auto |
| VC-05 | Stat container fit | Numbers fit containers. No overflow. | Auto |
| VC-06 | Accessibility | axe-core: 0 critical, 0 serious | A11y |
| VC-07 | Contrast | 4.5:1 against backgrounds (text over images/video too) | A11y |
| VC-08 | Reduced motion | Continuous loops stop with `prefers-reduced-motion: reduce` | A11y |
| VC-09 | Cross-viewport | Both 1440x900 AND 390x844 pass | Auto |
| VC-10 | Asset weight | Total < 5MB. Hero video < 3MB. | Auto |
| VC-11 | Post-deploy visual confirmation | Production URL serves the new build, changes visible to a real user | Visual |

### 1.6 Technical Stack

| Layer | Tech | Version Floor |
|---|---|---|
| Framework | Next.js + App Router | 16+ |
| Language | TypeScript | Strict |
| Styling | Tailwind CSS | 4+ |
| Design tokens | `globals.css` custom properties | — |
| Component animation | Framer Motion | 12+ |
| Advanced animation | GSAP (perimeter draws, scrub lines, ScrollTrigger pin) | 3.12+ |
| Testing | Playwright + @axe-core/playwright | Latest |
| Build | Next.js built-in (Turbopack default in 16) | — |

### 1.7 Asset Compression Standards

| Asset | Format | Target | Max |
|---|---|---|---|
| Hero video | H.264, CRF 28 | < 2MB | 3MB |
| Video resolution | — | 1920x1080 | Never above 1080p |
| Images (photo) | JPEG q3 / WebP q80 | < 200KB each | — |
| Images (graphic) | WebP or SVG | < 100KB each | — |
| Total page weight | — | < 3MB | 5MB |
| Font files | WOFF2 | < 100KB per weight | — |
| **Video playback rate** ⭐ v8 | — | Always 1.0x | Never `playbackRate < 1.0` — see PP-11 |

### 1.8 Tactical Operations

Every tip exists because its absence cost time during a real build.

---

**Chrome MCP — Bulk-load and batch.**

```
ToolSearch({ query: "chrome browser navigate screenshot", max_results: 15 })
```

Always `browser_batch` for multi-step sequences. Single round-trip dramatically faster.

```
browser_batch({ actions: [
  { name: "resize_window", input: { tabId: X, width: 1440, height: 900 } },
  { name: "navigate", input: { tabId: X, url: "..." } },
  { name: "computer", input: { action: "wait", tabId: X, duration: 3 } },
  { name: "computer", input: { action: "screenshot", tabId: X } }
]})
```

**Recovery patterns:**

| Symptom | Fix |
|---|---|
| Screenshot times out (CDP frozen) | Retry alone. Often clears on second attempt. |
| Tab unresponsive | Close via `tabs_close_mcp`, then `tabs_create_mcp` + `tabs_context_mcp({createIfEmpty: true})` |
| Page hangs after navigate | Wait 5+s, retry screenshot |
| Render hangs after viewport change | **Resize window FIRST** before navigating |
| Tab ID errors across multiple tabs | Get fresh `tabs_context_mcp({createIfEmpty: true})` before each batch |
| **Repeated screenshot timeouts on local dev** ⭐ NEW v8 | **Pivot to Vercel deploy-and-verify.** Continuous animations freeze CDP for 30+s on `npm run dev`. Vercel deploys in 30–50s and serves cached assets. More reliable than the CDP retry loop. King Maker v2 lost 20+ minutes here before pivoting. |

---

**Vercel Deploy via `npx` (NEW v8 — no CLI install).**

```bash
cd <project-dir> && npx vercel@latest --yes --prod
```

`npx` auto-installs `vercel@latest` on first run. Auto-aliases to `<project>.vercel.app`. Tested across 15+ deploys in King Maker v2 with no install drift. Faster iteration than installing the CLI globally.

---

**Vercel Deploy from a Worktree.**

When working in a Claude Code worktree where the repo state is messy or untracked:

1. Check `<project-dir>/.vercel/project.json` — if present, the dir is linked.
2. Deploy: `cd <project-dir> && npx vercel --prod --yes`
3. Auto-aliases to production URL.
4. **Verify with Chrome MCP after deploy** (VC-11). Don't trust "build succeeded" as confirmation.

---

**Skill Discovery Fallback.**

If no skills appear in `<system-reminder>` despite expecting them, the manifest didn't inject:

```bash
ls -la ~/.claude/skills/
```

Skills on disk are still callable by `Skill` tool with exact name. Don't repeat Bunns-build mistake (0% utilization because manifest didn't surface).

---

**Mid-Build Tool & Skill Audit Cadence.**

| Checkpoint | Question |
|---|---|
| Kickoff (after pre-flight) | Which tools/skills are available AND relevant? |
| After 3-5 components | Have I invoked any of the relevant skills yet? |
| Before major design decision | Is there a skill that should weigh in? |
| Before delivery | Did I run `design-motion-principles` and `impeccable`? |

---

## Part 2 — RECIPE LIBRARY

The canonical patterns. Each recipe is named, has a clear use case, and has a working implementation reference.

**Naming convention:** Recipe-NN — Pattern Name.

The full v3-v7 recipe library (Recipes 1–29) is inherited from v7 wholesale. v8 adds Recipes 30–37 from the King Maker v2 build:

### Recipe 30 — Audit Ledger Card (NEW v8)

**Use case:** "Here's a mock data view that proves the problem you have." Visualizes a diagnosis, audit, or comparison concretely. The Regional Visibility Audit pattern from King Maker v2.

**Key elements:**
- Fixed-width tabular columns: `grid-cols-[1fr_72px_72px_56px]` — explicit pixel widths on numeric columns prevents number "walking" between rows
- Per-row stagger reveal: each row has its own `useInView` trigger so it reveals individually as it crosses the viewport line, NOT all-at-once when the card enters
- Counter animations on numeric values via `useMotionValue` (see Recipe 1)
- Hover glow on the entire card (Framer Motion `whileHover` + boxShadow)
- Bordered alert-tinted callout footer for the takeaway statement
- Mono-font column headers in `--text-muted`, bold city/row name in `--text` (white)
- Alert color (`--alert`) for "bad" values, gold (`--gold`) for "good" values — both drawn from locked palette

**Implementation reference:** `kingmaker-v2/components/sections/Problem.tsx`

### Recipe 31 — Dual Scrub Counter (Pinned ScrollTrigger) (NEW v8)

**Use case:** "Watch the impact accumulate as you scroll." Two related metrics ticking in lockstep, plus a timeline progress bar, plus copy moments fading in/out. The Compounding Counter section from King Maker v2.

**Key elements:**
- **Section height = sticky_height + (sticky_height × 0.3)** for a punchy pin (e.g. 130vh section + 100vh sticky = 30vh of pin scroll). 
- `useScroll({ target: sectionRef, offset: ["start start", "end end"] })` for progress 0→1
- `useTransform(progress, [0.05, 0.95], [0, finalValue])` for primary scrubbing counter
- Second `useTransform` for derived secondary counter (e.g. `jobs × ticket = revenue`)
- Timeline progress bar: `<motion.div style={{ width: timelineProgress }}>` filling left-to-right
- Multiple text moments fading via the **`<CopyMoment>` extracted-component pattern** (avoids hooks-in-loop — see §1.2)
- Pad section height carefully — too tall = "dead zone" after pin ends (see §1.4 + L03 in after-action)

**Implementation reference:** `kingmaker-v2/components/sections/Urgency.tsx`

### Recipe 32 — Scrolling Brand Bar (NEW v8)

**Use case:** Tooling stack reveal, trust signals strip, partner logos band, social-proof marquee. The Cursor/Claude/Higgsfield/Playwright bar from King Maker v2.

**Key elements:**
- Triple-array trick: `[...items, ...items, ...items]` rendered in a flex row
- Framer Motion `animate={{ x: ['0%', '-33.333%'] }}` with linear infinite repeat
- 40–60s duration for relaxed pace; faster reads as urgency
- Diamond/dot separators between items in contrasting accent
- `aria-hidden="true"` on the wrapper (purely decorative)
- Cheap, GPU-accelerated, no GSAP needed

**Implementation reference:** `kingmaker-v2/components/ui/BrandBar.tsx`

### Recipe 33 — Perimeter Draw on Cards (NEW v8)

**Use case:** Premium card entry treatment. Adds "this is crafted, not stamped" feeling without performance cost.

**Key elements:**
- SVG `<rect>` with `stroke-dasharray` + `stroke-dashoffset` animation
- IntersectionObserver-triggered (not Framer Motion — pure CSS animation)
- Component takes `delay` prop for staggered card sequences
- `vector-effect: non-scaling-stroke` keeps line at 1.5px regardless of card size
- CSS keyframes drive dashoffset from full to 0 over ~1.6s

**Implementation reference:** `kingmaker-v2/components/ui/PerimeterDraw.tsx`

### Recipe 34 — Process Step with Right-Side Stat Callouts (NEW v8)

**Use case:** Process/timeline cards that originally have dead space on the right side. Adds concrete proof per step.

**Key elements:**
- `grid-cols-[auto_1fr_auto]` — number tile / title+body / stats column
- Stats column min-width (e.g. `min-w-[180px]`), with `border-l` separator
- 2–3 stat pairs per card: large gold value + small mono caption
- Lucide icon next to step title (pairs naturally with the right-side stats)
- Hidden on mobile with `hidden lg:flex` (stack cleanly on small screens)
- Concrete numbers preferred over adjectives ("80–120 pages", "12:1 ROI", "8–10 reviews/mo")

**Implementation reference:** `kingmaker-v2/components/sections/Process.tsx`

### Recipe 35 — Sticky Pin Section (NEW v8)

**Use case:** Any section where you want the user to dwell on a single element while scrolling drives an animation (counters, timelines, before/after, scrub-driven reveals).

**Key formula:**

```
section_height = sticky_height + (sticky_height × pin_factor)

pin_factor:
  0.3–0.6  →  Punchy pin (counter scrubs fast, no dead zone)
  1.0      →  Meditative pin (longer dwell, slight dead zone tolerable)
  > 1.5    →  Always creates noticeable dead zone after pin — avoid
```

**Implementation:**

```tsx
<section ref={ref} style={{ height: "130vh" /* = 100vh sticky + 30vh pin */ }}>
  <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
    {/* content */}
  </div>
</section>
```

Combine with `useScroll({ target: ref, offset: ["start start", "end end"] })` for progress 0→1 across the pin period.

**Implementation reference:** `kingmaker-v2/components/sections/Urgency.tsx`

### Recipe 36 — Optional Service Pattern (Form/API Graceful Degradation) (NEW v8)

**Use case:** Form posts to an external service (Resend, Slack webhook, CRM) that requires an env-var. Want the form to work in dev/staging without forcing full secrets setup.

**Pattern:**

```ts
// app/api/apply/route.ts
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.log("[apply] RESEND_API_KEY missing — logged submission:", data);
  return NextResponse.json({ ok: true, dev: true });
}
const resend = new Resend(apiKey);
// ... real send
```

**Why it works:**
- Dev/staging: form succeeds, payload console-logged, UX unchanged
- Production after key added: real delivery, no code change
- Allows shipping the form before secrets are wired
- King Maker v2 user explicitly relied on this pattern — they deferred Resend setup until they had a real conversion path, but the form was already shipped and tested

### Recipe 37 — Above-the-Fold Reveal (NEW v8 — fix for v7's `useInView` margin bug)

**Use case:** Hero headline / above-the-fold elements that need to typewriter-reveal on first paint. v7's negative-margin `useInView` doesn't trigger because the element starts at viewport top and the IntersectionObserver never fires.

**Fix pattern (canonical TypeIn for above-the-fold):**

```tsx
"use client";
import { motion } from "framer-motion";

export default function TypeIn({ text, as = "h2", className, delay = 0 }) {
  const Tag = as as React.ElementType;
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-pre">
            {Array.from(word).map((ch, ci) => (
              <motion.span
                key={`${wi}-${ci}`}
                initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.55, delay: delay + (wi * word.length + ci) * 0.018 }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
```

**Key differences from v7's TypeIn:**
- `whileInView` instead of `useInView` + animate prop with conditional
- `viewport={{ once: true, amount: 0.01 }}` — triggers on the smallest possible intersection, fires immediately on first paint
- For sections that re-trigger (use `once: false`), the same pattern works — change `once: true` to `once: false`

**Implementation reference:** `kingmaker-v2/components/ui/TypeIn.tsx`

---

## Part 3 — STARTER PALETTE TEMPLATES (NEW v8)

Default palette tokens that ship pre-validated for WCAG AA contrast. Use these as-is OR as starting points to bump for project-specific needs.

### Regal Black + Gold (King Maker v2 — proven)

```css
:root {
  --bg:           #0A0A0A;       /* near-black base */
  --surface:      #15110A;       /* warm-dark, gold-tinted card base */
  --surface-2:    #1F1A10;       /* elevated cards */
  --surface-3:    #2A2415;       /* hover states */
  --border:       #2D2516;       /* subtle gold-tinted borders */
  --border-soft:  #1F1B12;

  --gold:         #FFB900;       /* primary accent — signature */
  --gold-bright:  #FFD24A;       /* hover/highlight */
  --gold-deep:    #856709;       /* sub-accents */
  --gold-dim:     #584509;       /* backgrounds */
  --gold-glow:    rgba(255, 185, 0, 0.18);

  --text:         #FFFFFF;       /* primary text — 21:1 on bg */
  --text-muted:   #B5A982;       /* warm-gray — 7.6:1 on bg (AAA) */
  --text-dim:     #8E8060;       /* dim labels — 4.6:1 on bg (AA) */

  --success:      #FFB900;       /* gold doubles as positive — disciplined */
  --alert:        #C25A3A;       /* muted brick red — 4.7:1 on bg (AA) */
}
```

**Contrast matrix (validated):**

| Token | On `--bg` (#0A0A0A) | On `--surface` (#15110A) |
|---|---|---|
| `--text` | 21:1 ✅ | 18.2:1 ✅ |
| `--text-muted` | 7.6:1 ✅ AAA | 6.8:1 ✅ AAA |
| `--text-dim` | 4.6:1 ✅ AA | 4.1:1 ⚠ — use only for very large text |
| `--gold` | 11.4:1 ✅ AAA | 10.2:1 ✅ AAA |
| `--gold-deep` | 3.1:1 ⚠ — use only for accent shapes, NOT body text | 2.8:1 ⚠ |
| `--alert` | 4.7:1 ✅ AA | 4.3:1 ⚠ |

**Discipline rule:** any text using `--gold-deep` or `--alert` on lifted surfaces (`--surface` and above) must be 18px+ to satisfy WCAG large-text exemption.

### (Other starter palettes — add as projects accumulate)

- Soft Editorial Luxury (warm cream + serif)
- Brutalist Tactical Telemetry (dark CRT terminal)
- Color-Blocked Brutalist (Recipe 29 DNA)

These should be filled in as builds accumulate. Each palette ships with its own validated contrast matrix.

---

## Part 4 — INDUSTRY TEMPLATES

Inherited from v7 wholesale. SEO marketing site for $3M+ contractors → **King Maker v2** at `https://kingmaker-v2.vercel.app` is now the canonical worked example. Reference its components for any contractor B2B build.

---

## Appendix A — What Changed v7 → v8

**Added:**
- §0.0 Step 3 — Higgsfield workflow rules (throttle, anti-prompts, native duration, model fallback tiers)
- §1.1 PP-11 — No HTML video `playbackRate < 1.0`
- §1.2 — Hooks-in-loop fatal in React 19 strict (with canonical fix pattern)
- §1.3 — Translucent nav backdrop, form input labeling, token brightness validation
- §1.7 — Video playback rate rule
- §1.8 — Local-screenshot pivot, `npx vercel@latest` deploy pattern
- §0.2 TP-19 — Source-of-truth constants in lib/data.ts
- §0.2 TP-20 — Higgsfield realism via anti-prompts
- §0.3 OP-08 — When verification stalls, switch tier
- §0.3 OP-09 — Save handoff docs to /docs/
- §0.3 OP-10 — Push back when request risks the goal
- Recipe 30 — Audit Ledger Card
- Recipe 31 — Dual Scrub Counter (Pinned ScrollTrigger)
- Recipe 32 — Scrolling Brand Bar
- Recipe 33 — Perimeter Draw on Cards
- Recipe 34 — Process Step with Right-Side Stat Callouts
- Recipe 35 — Sticky Pin Section (with explicit pin_factor formula)
- Recipe 36 — Optional Service Pattern (Form/API graceful degradation)
- Recipe 37 — Above-the-Fold Reveal (fixes v7 useInView margin bug)
- Part 3 — Starter Palette Templates (with validated contrast matrix)
- New aesthetic mode — Regal Black + Gold

**Refined (kept core, sharpened):**
- §0.0 pre-flight — Higgsfield model table now has render times
- §1.5 Verification Contract — Playwright FULL caps explicitly listed
- TP-09 — Mobile a11y nav false-positive sub-rule
- TP-15 — Token brightness validation sub-rule

**Removed / deprecated:**
- v7's negative-margin `useInView` defaults in TypeIn — replaced by Recipe 37
- Implication that local-server visual verification is the primary path — replaced by deploy-and-verify-first guidance (OP-08)
- Default palette tokens that fail WCAG AA — replaced by validated starter palette templates (Part 3)

**Inherited wholesale (no changes from v7):**
- Aesthetic modes (Default, Soft, Minimalist, Brutalist, Color-Blocked Brutalist, Motion Heavy, Redesign) — Regal Black + Gold added as new option
- Recipes 1–29 from v3–v7
- Industry templates (Part 3 of v7)
- Build brief structure (Section 3.3 of v7)

---

## Appendix B — Worked Example: King Maker v2

**Production:** https://kingmaker-v2.vercel.app
**Repo:** https://github.com/josephspells-Cgrav/kingmaker-v2
**After-action report:** `kingmaker-v2/docs/AFTER_ACTION_v7_KINGMAKER.md` (read this for the lesson library and full retrospective behind every v8 addition)

This is the canonical worked example for v8. Reference its `globals.css`, `lib/data.ts`, and component implementations for the canonical patterns. **The codebase IS the recipe.**

For any future contractor B2B build, start by reviewing the King Maker v2 repository structure, then apply v8 doctrine on top.
