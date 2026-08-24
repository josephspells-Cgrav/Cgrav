# KING MAKER MOTION DOCTRINE

**Version:** 7.0
**Date:** May 10, 2026
**Author:** Joseph Spells
**Purpose:** Universal motion/engineering guide for premium scrolling-first web experiences

---

> This doctrine produces unique sites every time while maintaining the same DNA:
> fluidity, premium motion, scrolling-first architecture, and engineering discipline.
> It is a guide, not a restriction. Creative freedom within structural discipline.
>
> **v7.0 removes auto project-context detection.** Filesystem-based scope inference
> caused wrong-anchoring onto unrelated existing projects that happened to live in
> the working directory. The default assumption is now: every doctrine load = new
> project, unless the user's prompt explicitly says otherwise (e.g. "redesign this
> site", "modernize this codebase"). The user's prompt is the single source of
> truth for scope. The working directory is not.
>
> **v6.0 incorporated Bunns HVAC build learnings** — particularly the visual-first
> verification workflow (Chrome MCP as Primary Eyes), brand-palette discipline,
> scale-to-section-role principle, and the discovery that the doctrine's tools and
> skills are routinely underutilized at 0% even when fully available. The
> verification contract gained a visual layer it never had before.

---

## Part 0 — SESSION STARTUP, HIERARCHY & TASTE PROFILE

### 0.0 Pre-Flight Checklist (Run FIRST — Before Any Other Work)

When this doctrine is loaded into a new session, Claude MUST run this checklist
before starting any build work. Do not skip this. Do not assume what's available.
Check everything explicitly. Run ALL steps in parallel where possible.

---

**Step 1 — Discover Available Skills**

Skills are specialized capabilities installed in Claude Code. They appear in
`<system-reminder>` messages listing available skills, or as slash commands.
Scan the available skills list and check for ALL of the following categories.

**⚠️ Operational reality (added in v6):** The runtime sometimes fails to inject
the skill manifest into session context. If no skills appear in `<system-reminder>`
messages despite the doctrine expecting them, **check `~/.claude/skills/` directly
via Bash before assuming none exist**. Skills on disk are still callable via the
`Skill` tool by exact name. The Bunns build went 0% on every installed skill
because the manifest never surfaced — don't repeat that mistake.

**DESIGN & TASTE Skills (the core aesthetic engine):**

| Skill Name | What It Does | When To Use |
|---|---|---|
| **design-taste-frontend** | Senior UI/UX Engineer persona. Metric-based design rules, anti-LLM-bias enforcement, configurable DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY dials (1-10). | DURING build. Primary design guidance — invoke at the start of any new component or page. |
| **frontend-design** | Production-grade frontend creation. Forces bold aesthetic direction, anti-"AI slop" thinking, distinctive typography, memorable visual identity. | DURING build. Invoke when creating new components or pages from scratch. |
| **gpt-taste** | Elite UX/UI + GSAP motion engineer. Python-driven randomization for layout variance, scroll triggers, pinning, staggered orchestration. | DURING build. When GSAP-heavy motion is needed. |
| **high-end-visual-design** | Exact fonts, spacing, shadows, card structures per high-end agency standards. | DURING build. Reference for visual polish decisions. |
| **minimalist-ui** | Clean editorial interfaces. Warm monochrome, typographic contrast, flat bento grids. | DURING build. When the project calls for editorial/minimal aesthetic. |
| **industrial-brutalist-ui** | Swiss typography meets military terminal aesthetics. Rigid grids, monospaced data, zero softness. | DURING build. When the project calls for brutalist/industrial aesthetic. |
| **impeccable** | Design critique, audit, polish, distill, harden. General-purpose design quality enforcement. | DURING or AFTER build. Quality review of any design decision. |
| **redesign-existing-projects** | Audits existing sites, identifies generic AI patterns, applies premium upgrades incrementally. | DURING modernization workflow. Critical for "take this site and upgrade it" tasks. |
| **ui-ux-pro-max** | Design system data — 67 styles, 96 palettes, 57 font pairings, 25 charts, 13 stacks. | DURING design phase. Typography pairing, color selection, component patterns. |
| **huashu-design** ⭐ NEW in v6 | 花叔Design — HTML hi-fi prototypes, design variant exploration, expert design review. Includes a #0-priority WebSearch fact-verification rule and HTML→MP4/GIF export pipeline. Anti-AI-slop framework with 5-dimension expert review (philosophy/hierarchy/execution/functionality/innovation). | DURING design exploration, OR AFTER build for a 5-dimension expert review pass. Particularly valuable for variant explorations and "is this design actually good?" critique. |
| **taste-skill** ⭐ NEW in v6 | Upstream parent repository for many of the symlinked skills above (brandkit, gpt-taste, imagegen-*, image-to-code, redesign-skill, etc.). "Anti-Slop Frontend Framework for AI Agents." | Reference resource — the umbrella system. Individual symlinked skills are the per-capability invocation surface. |

**MOTION & ANIMATION Skills:**

| Skill Name | What It Does | When To Use |
|---|---|---|
| **design-motion-principles** | Motion audit using Emil Kowalski, Jakub Krehel, and Jhey Tompkins frameworks. Timing, easing, scroll patterns, hover interactions, stagger, cohesion. | AFTER build complete, BEFORE delivery. Post-build quality gate. |
| **gsap-core** | GSAP core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults. | DURING build. When using GSAP animations. |
| **gsap-scrolltrigger** | ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. | DURING build. For scroll-driven GSAP effects. |
| **gsap-timeline** | GSAP timelines — gsap.timeline(), position parameter, nesting, playback. | DURING build. For sequenced GSAP animations. |
| **gsap-react** | GSAP in React — useGSAP hook, refs, gsap.context(), cleanup. | DURING build. For GSAP in React/Next.js components. |
| **gsap-plugins** | GSAP plugins — ScrollToPlugin, ScrollSmoother, Flip, Draggable, etc. | DURING build. When advanced GSAP plugins are needed. |
| **gsap-performance** | GSAP performance — prefer transforms, avoid layout thrashing, will-change, batching. | DURING build. Performance optimization for complex animations. |
| **gsap-frameworks** | GSAP in Vue, Svelte, and other non-React frameworks. | DURING build. If project is not React/Next.js. |
| **gsap-utils** | gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, etc. | DURING build. Utility functions for GSAP. |

**ASSET GENERATION Skills:**

| Skill Name | What It Does | When To Use |
|---|---|---|
| **brandkit** | Premium brand-kit image generation — logo systems, color/typography boards, cinematic atmospheres. | PRE-BUILD. When establishing brand identity for a new project. |
| **imagegen-frontend-web** | Generates premium website mockup images — hero sections, spacing systems, multi-section layouts. | PRE-BUILD. Visual brief before coding starts. |
| **imagegen-frontend-mobile** | Generates iOS/Android mobile app screen flows — app-native design, safe areas, multi-screen consistency. | PRE-BUILD. When mobile app design is needed. |
| **image-to-code** | Converts visual designs/screenshots into implementation code. | DURING build. When working from a design reference image. |

**CODE QUALITY Skills:**

| Skill Name | What It Does | When To Use |
|---|---|---|
| **full-output-enforcement** | Overrides LLM truncation. Bans placeholder patterns, enforces complete code generation. | ALWAYS active. Prevents lazy "// ... rest of code" shortcuts. |
| **simplify** | Reviews changed code for reuse, quality, efficiency. Fixes issues found. | AFTER changes. Code quality pass. |

**UTILITY Skills:**

| Skill Name | What It Does | When To Use |
|---|---|---|
| **anthropic-skills:skill-creator** | Creates and improves skills. Evals and benchmarks. Namespaced under `anthropic-skills:` — invoke as `anthropic-skills:skill-creator`. | If you need a new project-specific skill. |
| **stitch-design-taste** | Generates DESIGN.md files for Google Stitch's screen generation. | When using Google Stitch integration. |
| **anthropic-skills:consolidate-memory** | Reflective pass over memory files — merge duplicates, fix stale facts, prune the index. | Periodic memory hygiene. |
| **update-config** | Configure Claude Code harness via settings.json (hooks, permissions, env vars). | When user requests automated behaviors ("from now on when X") or settings changes. |

**PLUGINS (separate from Skills — different surface):**

| Plugin Name | What It Does | Notes |
|---|---|---|
| **framer-motion@framer-motion-skill** ⭐ Reclassified in v6 | Production-grade Framer Motion patterns. Correct imports, spring configs, AnimatePresence, scroll animations, gestures, layout animations. | This is a PLUGIN, not a Skill — installed via Claude Code marketplace. Invoked differently. v5 incorrectly listed it as a Skill. |

**How to check skills:** Look at the available skills list in `<system-reminder>` messages.
If a skill is listed (with or without a `/` prefix), it's available.
If a skill is NOT listed, **first check `~/.claude/skills/` directly via Bash** before assuming missing.
If genuinely not on disk, note the gap in the pre-flight report.

**Skills that are NOT available don't block the build.** The doctrine itself
contains enough information to proceed without any skill. Skills make
certain phases faster and higher quality.

**Recommended skill invocation order for a full build:**

```
1. PRE-BUILD:    brandkit (if new brand) → imagegen-frontend-web (visual brief)
                 OR redesign-existing-projects (if modernizing existing site)
2. DESIGN PHASE: design-taste-frontend + ui-ux-pro-max + frontend-design
                 (huashu-design optional for variant exploration)
3. BUILD PHASE:  framer-motion plugin + gsap-* (as needed) + full-output-enforcement
4. MODERNIZE:    redesign-existing-projects (if upgrading an existing site)
5. POST-BUILD:   design-motion-principles (motion audit) → impeccable (polish)
                 (huashu-design optional for 5-dimension expert review)
6. VERIFY:       Chrome MCP visual preflight + Playwright + axe-core (Section 1.5)
7. CODE QUALITY: simplify (post-changes review)
```

**Skill Invocation Gates (NEW in v6 — non-negotiable):**

| Gate | Required Skills | Skip Allowed? |
|---|---|---|
| **PRE-BUILD** | `brandkit` (new brand) OR `redesign-existing-projects` (modernization) | No — must invoke at least one. If skipped, document why in build brief. |
| **DESIGN** | At least one of: `design-taste-frontend`, `frontend-design`, `gpt-taste` | No — must invoke at least one before any component design. |
| **POST-BUILD** | `design-motion-principles` AND `impeccable` | No — both required before delivery. |
| **VERIFICATION** | Chrome MCP visual preflight (Section 1.5 VC-00) + Playwright suite + axe-core | No — all three required. |

Skipping a gate without explicit reasoning in the build brief is a doctrine
violation. The Bunns build invoked **zero** skills despite having
`redesign-existing-projects`, `design-taste-frontend`, `impeccable`, and
`huashu-design` available — all directly applicable. v6 makes this a hard gate.

---

**Step 2 — Discover Available MCP Servers & Tools**

Use `ToolSearch` to scan for available MCP tools. Run ALL of these searches
(they can run in parallel):

```
ToolSearch({ query: "generate image video", max_results: 10 })
ToolSearch({ query: "preview screenshot", max_results: 10 })
ToolSearch({ query: "browser chrome navigate screenshot", max_results: 15 })
ToolSearch({ query: "firecrawl scrape", max_results: 10 })
ToolSearch({ query: "magic component", max_results: 10 })
ToolSearch({ query: "computer-use", max_results: 30 })
```

**⚠️ Bulk-load principle (NEW in v6):** When loading deferred tools from a single
MCP server, use a keyword search that returns the entire toolkit in one call —
never `select:tool_name` one-at-a-time. The Chrome MCP toolkit (15+ tools)
should load with a single `ToolSearch({query: "chrome browser navigate screenshot", max_results: 15})`.

**Full MCP inventory — check for ALL of these:**

| Capability | Tool Name Pattern | Used For | Doctrine Reference |
|---|---|---|---|
| **AI Image/Video Generation (Higgsfield)** | `mcp__*__generate_image`, `mcp__*__generate_video`, `mcp__*__models_explore`, `mcp__*__balance` | Hero videos, service photography, aerial shots, image-to-video animation | TP-13, TP-14, Section 2.12 |
| **21st.dev Magic** | `mcp__magic__21st_magic_component_builder`, `mcp__magic__21st_magic_component_inspiration`, `mcp__magic__21st_magic_component_refiner` | Component design inspiration, building premium UI components, refining existing components | Section 2.11 (TFD patterns) |
| **Claude Preview** | `mcp__Claude_Preview__preview_start`, `mcp__Claude_Preview__preview_screenshot`, `mcp__Claude_Preview__preview_click` | Live preview of dev server during build, visual verification (lightweight alternative to Chrome MCP) | VC-00, VC-01 through VC-11 |
| **Chrome Browser Control** ⭐ PROMOTED in v6 to Primary Eyes | `mcp__Claude_in_Chrome__navigate`, `mcp__Claude_in_Chrome__browser_batch`, `mcp__Claude_in_Chrome__computer`, `mcp__Claude_in_Chrome__gif_creator` | **PRIMARY VISUAL VERIFICATION TOOL** — opening live sites, scrolling, screenshotting, recording animation GIFs, inspecting live DOM, reading console/network | Section 1.5 (Verification Contract), Section 1.8 (Tactical Operations) |
| **Firecrawl Web Scraping** | `mcp__firecrawl-mcp__firecrawl_scrape`, `mcp__firecrawl-mcp__firecrawl_crawl`, `mcp__firecrawl-mcp__firecrawl_extract` | Deep extraction of reference site content, structure, and assets — **crawl reference sites yourself, do not ask user to describe them** | Section 2.10, Part 3 |
| **Computer Use** | `mcp__computer-use__screenshot`, `mcp__computer-use__left_click`, `mcp__computer-use__type` | Desktop app interaction, fallback for native-app visual inspection | Fallback only — Chrome MCP preferred for web work |

---

**Step 3 — Load & Verify AI Generation Capabilities**

If Higgsfield (or equivalent) image/video generation tools were found in Step 2,
load their schemas and verify they're operational:

```
ToolSearch({ query: "select:mcp__*__models_explore", max_results: 5 })
ToolSearch({ query: "select:mcp__*__balance", max_results: 5 })
```

Then run:
- `models_explore` — list available generation models (Cinema Studio 2.5, 3.0, Kling 3.0, Nano Banana Pro, etc.)
- `balance` — check remaining credits and plan type

Note which models are available — this determines what assets can be generated:

| Model | Best For | Typical Use | Render Time |
|---|---|---|---|
| Cinema Studio 2.5 | Cinematic still photography | Service cards, hero stills, team photos | 30–60s |
| Cinema Studio 3.0 (6s) | Hero background video | 5-10 second cinematic loops | 60–120s |
| Cinema Studio 3.0 (12s) ⭐ v7.1 | Native-duration cinematic loop (no playbackRate slowdown needed) | Premium 12s pull-up reveal | **5–8 min** |
| Kling 3.0 | Image-to-video animation | Animating a generated still into a looping video | 90–180s |
| Veo 3.1 Lite | Budget fallback when Cinema Studio quota hits | Acceptable-quality batch generation | 30–60s |
| Seedance 1.5 / 2.0 | Reference-driven video | Mid-tier alternative when Cinema Studio is throttled | 60–120s |
| Nano Banana Pro | Fast concept images | Quick exploration, lower quality | 15–30s |

**Higgsfield workflow gotchas (added v7.1 from King Maker v2 build):**
- **Plus monthly plan has a per-month throttle independent of the credit balance.** You can hit "Out of credits" with positive credits showing because the monthly throttle separately limits generations. Plan for 1–2 generations per session on Plus monthly. For high-iteration builds, upgrade to Pro or budget multiple sessions.
- **Always specify realistic anti-prompts when generating real-world contexts.** First HVAC video had the unit unrealistically mounted on a low front wall on the sidewalk. Required regen with explicit negation: "concrete pad on the SIDE of the house, in the side yard, near the electrical meter, NOT on sidewalk, NOT on front wall, NOT on top of a wall." Negative prompts work on Cinema Studio 3.0.
- **Generate at native longer duration instead of using `playbackRate < 1.0`** — see §1.7 Video playback rate rule.
- **Cinema Studio 3.0 at 12s takes 5–8 min.** Don't promise the user "video in 60 seconds" when generating long. Plan polling intervals accordingly.

If NO generation tools are found, note this limitation. TP-14 (proactive image
generation) will fall back to placeholder mode (Section 2.12, Priority 3).

---

**Step 4 — Verify Playwright & Testing Infrastructure**

Playwright is the backbone of the automated verification contract (Section 1.5).
Combined with Chrome MCP (visual layer), they form the complete verification
stack. No Playwright = no automated regression testing = no delivery.

```bash
# Check if Playwright is installed
npx playwright --version

# Check if axe-core is available (required for accessibility audits)
npm list @axe-core/playwright

# Check browser binaries are installed (Playwright needs these)
npx playwright install --dry-run
```

**If Playwright is NOT installed, install it IMMEDIATELY — before any build work:**

```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

This is non-negotiable. Playwright is used for:
- VC-01 through VC-11 (full verification contract — see Section 1.5)
- Desktop viewport testing (1440x900)
- Mobile viewport testing (390x844)
- Accessibility audits via axe-core
- Horizontal overflow detection
- Component count verification
- Form interaction testing
- **Video recording of test runs** (`video: { mode: 'on' }`)
- **Trace files** (timeline + screenshots + DOM + network at every action)
- **`toHaveScreenshot()` pixel-diff regression**
- **Device emulation** (real device profiles, not just viewport size)
- **Network interception** (loading performance, failed requests)
- **Console/error listeners** (uncaught exceptions, hydration mismatches)

Use the FULL Playwright capability set — not just DOM assertions. v5 routinely
treated Playwright as a glorified DOM query tool. v6 expects video, traces,
and pixel-diff regression as standard.

Without Playwright, you cannot complete the verification contract. Do not
proceed without it.

---

**Step 5 — Verify Dev Environment (Everything Else)**

Run these checks (can run in parallel):

```bash
# Check Node.js and package manager
node --version
npm --version

# Check if Framer Motion is available
npm list framer-motion

# Check if GSAP is available (optional — only needed for some recipes)
npm list gsap

# Check if the project directory exists (for continuing builds)
ls [project-dir]/package.json
```

**Install missing dependencies as needed:**

```bash
# Framer Motion (REQUIRED — per Section 1.6)
npm install framer-motion

# GSAP (only if recipes 2, 3, 8, or advanced timelines are planned)
npm install gsap @gsap/react
```

---

**Step 6 — Check Web Scraping Capabilities**

If a reference site modernization is requested (or likely to be), Claude needs
to know how it can read the source site. Check what's available from Step 2:

| Priority | Tool Available | Scraping Method | Quality |
|---|---|---|---|
| 1st | Firecrawl MCP | `firecrawl_scrape` — full page content, structured extraction | Best — gets clean text, images, links, structure |
| 2nd | Chrome MCP | `read_page` / `get_page_text` — live DOM inspection | Good — sees rendered page as a browser would |
| 3rd | WebFetch (built-in) | Basic HTTP fetch for raw HTML source | OK — gets source but not JS-rendered content |
| 4th | None of the above | Ask user to paste content or provide screenshots | Fallback — manual but workable |

**⚠️ Doctrine rule (NEW in v6):** If Firecrawl or Chrome MCP is available,
**crawl/read the reference site yourself**. Do NOT ask the user to describe a
site you can read directly. Asking is wasted turns when the tool exists.

---

**Step 7 — Report Full Capabilities to User**

After completing Steps 1-6, present a single consolidated report:

```
## Pre-Flight Complete

### Verification Stack (Section 1.5)
🎯 PRIMARY EYES: Chrome MCP — connected, ready for visual verification
   or ⚠️ Chrome MCP NOT CONNECTED — Preview MCP fallback available
   or 🚨 NO VISUAL VERIFICATION TOOL — verification contract incomplete
✅ Playwright: [version] — browsers installed, full capabilities ready
   (video recording, traces, toHaveScreenshot, device emulation, network/console)
✅ axe-core: Available — accessibility audits enabled
   or 🚨 Playwright: NOT INSTALLED — installing now...
   (Playwright is mandatory. Build cannot proceed without it.)

### Skills — Design & Taste
✅ design-taste-frontend — Primary design guidance (metric-based, anti-slop)
✅ frontend-design — Bold aesthetic direction
✅ gpt-taste — GSAP motion + randomized layouts
✅ high-end-visual-design — Agency-grade visual polish
✅ minimalist-ui / industrial-brutalist-ui — Aesthetic modes available
✅ impeccable — Design critique & polish
✅ redesign-existing-projects — Modernization audit engine
✅ ui-ux-pro-max — Design system data (67 styles, 96 palettes, 57 fonts)
✅ huashu-design — HTML hi-fi prototypes + 5-dim expert review (NEW v6)
✅ taste-skill — Anti-Slop Frontend Framework parent (NEW v6)
   or ⚠️ [skill name] — Not found

### Skills — Motion & Animation
✅ design-motion-principles — Post-build motion audit (Emil/Jakub/Jhey)
✅ gsap-core / gsap-scrolltrigger / gsap-react / gsap-timeline — GSAP suite
   or ⚠️ [skill name] — Not found

### Skills — Asset Generation
✅ brandkit — Brand identity board generation
✅ imagegen-frontend-web — Website mockup generation
✅ image-to-code — Visual design → code conversion
   or ⚠️ [skill name] — Not found

### Skills — Code Quality
✅ full-output-enforcement — No placeholder/truncation allowed
✅ simplify — Code reuse & efficiency review
   or ⚠️ [skill name] — Not found

### Plugins
✅ framer-motion@framer-motion-skill — Production Framer Motion patterns
   (NOTE: This is a Plugin, not a Skill — different invocation surface)

### MCP Servers
✅ AI Generation: Higgsfield AI — Cinema Studio 2.5, 3.0 / Kling 3.0
   💰 Credits: [X] remaining on [plan] plan
   or ⚠️ AI Generation: Not available — will use placeholders
✅ 21st.dev Magic: Component builder + inspiration available
   or ⚠️ 21st.dev Magic: Not found
✅ Web Scraping: Firecrawl available (preferred) / Chrome MCP / WebFetch
   or ⚠️ Web Scraping: Limited — may need user to provide reference content
✅ Preview: Claude Preview available
   or ⚠️ Preview: Not available — Chrome MCP will handle visual verification
✅ Computer Use: Available

### Dev Environment
✅ Node.js: [version]
✅ Framer Motion: [version]
✅ GSAP: [version] (or ⚠️ Not installed — will install if needed)

Ready to build. What are we making?
```

---

**Step 8 — Ask: Aesthetic Mode Selection (BEFORE Building)**

After reporting capabilities, Claude MUST present the aesthetic mode menu
and ask the user to pick one BEFORE any build work begins. This is not optional.
Do not assume a mode — always ask.

Present this exactly:

```
## Choose Your Aesthetic Mode

Before we start, which design direction do you want?

| Mode | What You Get |
|---|---|
| **Default (Taste)** | Balanced premium — anti-slop enforcement, spring motion, blur enters, glassmorphism cards. What Summit Air looks like. Configurable dials: DESIGN_VARIANCE (1-10), MOTION_INTENSITY (1-10), VISUAL_DENSITY (1-10). |
| **Soft** | $150K agency look — ethereal glass, ultra-diffused shadows, frosted blur panels, massive Grotesk typography. Three sub-vibes: Ethereal Glass (SaaS/AI), Editorial Luxury (real estate/agency), Soft Structuralism (consumer/portfolio). |
| **Minimalist** | Notion-like editorial — warm monochrome palette, extreme serif/sans-serif contrast, flat bento grids, nearly invisible animations. No gradients, no heavy shadows, no neon. |
| **Brutalist** | Raw mechanical — Swiss Industrial Print (light mode, rigid grids, oversized numerals, primary red accents) OR Tactical Telemetry (dark mode, CRT scanlines, monospaced everything, military terminal aesthetic). Zero softness. |
| **Color-Blocked Brutalist** ⭐ NEW v6 | Recipe 29 DNA — color-blocked numbered cards (navy/cream/yellow/red rotation), oversized numerals, top tag bars, theme-tinted icon tiles. Brutalist energy with full color palette discipline. The "Bunns Process" pattern. |
| **Motion Heavy** | Maximum cinematic motion — GSAP scroll triggers, pinning, scrub animations, staggered orchestration, parallax layers. Same anti-slop principles but motion IS the product. Best for agency portfolios, creative studios. |
| **Redesign** | Not a look — a process. Takes an existing site, audits every generic pattern, and applies premium upgrades incrementally without rewriting from scratch. Pair with any mode above for the target aesthetic. |

**You can also dial specific values:**
- "Motion heavy, but dial variance down to 5" → MOTION_INTENSITY: 9, DESIGN_VARIANCE: 5
- "Soft mode, editorial luxury sub-vibe" → Warm creams, serif headings, film grain
- "Brutalist, tactical telemetry" → Dark mode CRT terminal aesthetic
- "Default but crank motion to 9" → Standard taste with cinematic motion intensity
- "Redesign + soft mode" → Audit existing site, upgrade toward the soft aesthetic
- "Color-blocked brutalist + motion heavy" → Recipe 29 cards with cinematic scroll choreography

Pick a mode (or describe what you want and I'll map it):
```

**If the user already specified a mode in their initial instruction**, skip the
question and confirm the choice.

**If the user gave a vague instruction with no mode preference**, default to
**Default (Taste)** but still ask to confirm.

**Mode + Doctrine interaction:**

The aesthetic mode controls the VISUAL DIRECTION. The doctrine (v6) controls
the MOTION SYSTEM and ENGINEERING RULES. They layer together:

| Layer | Source | Controls |
|---|---|---|
| Engineering rules | Doctrine Part 1 (always active) | Performance, accessibility, hydration, verification |
| Motion system | Doctrine Part 2 (always active) | Springs, blur enters, stagger patterns, scroll-linked motion |
| Operating principles | Doctrine 0.3 (always active) | Vision-vs-assertion, scale-to-role, brand discipline, etc. |
| Taste preferences | Doctrine 0.2 / TP-01–TP-18 (soft defaults) | Headlines, underlines, trust banners, video heroes, etc. |
| Visual direction | Aesthetic mode (user choice) | Colors, typography, shadows, card styles, layout philosophy |

All five layers are active simultaneously. The aesthetic mode does NOT override
the doctrine — it sits on top of it. A "Brutalist" mode site still uses springs,
blur enters, and the verification contract. It just LOOKS brutalist.

---

**Do NOT skip this checklist.** In previous sessions, critical tools (like AI image
generation, Chrome MCP, and ALL installed skills) were available but undiscovered
or unused for the entire session, causing rework and oversized stat cards that
took three iterations to fix. The 90 seconds this checklist takes saves hours.

**Run the checklist even if the user jumps straight to instructions.** Complete the
pre-flight, report the results, then immediately proceed with their request.

---

### 0.1 Instruction Priority (What Overrides What)

When instructions conflict, follow this priority order. Higher numbers win.

```
Priority 1 (LOWEST)  — Taste Profile (Section 0.2)
                        Soft defaults. What to do when nothing else says otherwise.
                        Always yielded to any explicit instruction.

Priority 2           — Doctrine Recipes & Patterns (Part 2)
                        Proven patterns and motion standards. Use as the toolkit.
                        Can be overridden by reference sites or explicit user direction.

Priority 3           — Reference Site Direction
                        "Make it feel like [URL]" or "Use this site as a reference."
                        Overrides taste defaults and recipe selection, but NOT
                        engineering rules or accessibility requirements.

Priority 4           — Explicit User Instruction
                        "Follow this structure exactly" or "I want X, not Y."
                        Overrides everything below. If the user says "no underlines,"
                        there are no underlines — regardless of taste profile.

Priority 5 (HIGHEST) — Engineering Rules (Part 1) + Operating Principles (0.3)
                        Hard rules. Never overridden. Not by taste, not by reference
                        sites, not by explicit instruction. These exist to prevent
                        broken builds, accessibility violations, performance failures,
                        AND blind-build mistakes (visual verification is mandatory).
```

**How this plays out in practice:**

| Scenario | What Happens |
|---|---|
| Vague instruction, no reference site | Taste Profile (0.2) drives all aesthetic choices. Recipes selected to match. |
| "Use [URL] as a reference" | Reference site's layout/vibe takes priority over taste defaults. Motion system, engineering rules, AND visual verification still apply. |
| "Follow this structure exactly" | Hard constraint. Replicate the structure. Apply motion recipes to elevate it. Taste profile only fills gaps the instruction doesn't cover. |
| "I want it minimal, no animations on the cards" | Explicit instruction overrides taste defaults and recipe selection. Cards render without entrance animations. Engineering rules still apply (accessibility, semantic HTML, etc.). |
| "Give it a 2026 makeover" | Keep the existing structure and content. Apply current motion recipes, spring system, blur enters, glassmorphism upgrades. Taste profile guides which recipes to apply. |
| "Skip Chrome MCP verification this time" | **REJECTED.** Visual verification is in Priority 5 (engineering rules). Cannot be overridden by user instruction. Explain why and proceed with verification. |

### 0.1.1 Composable Instructions (Blending Modes)

Instructions are stackable. The user can combine multiple constraints in a single
directive, and Claude resolves them using the priority system above. This is the
core flexibility mechanism — the user is never locked into one mode.

**The three building blocks:**

```
STRUCTURE  — What sections exist, what order, what layout.
             Source: reference site, explicit list, or inferred from industry.

DOCTRINE   — What motion system, animation recipes, spring constants, blur enters.
             Source: this document (v6 or any specified version).

TIGHTNESS  — How closely to follow each source. "Closely" vs. "loosely."
             Applies independently to structure AND doctrine.
```

**Common instruction patterns and how Claude resolves them:**

| User Says | Structure Source | Doctrine Source | Tightness |
|---|---|---|---|
| "Roofing company, Charlotte, navy + gold" | Inferred from industry (Part 3) | v6 (current) | Loose — Claude makes all choices |
| "Take [URL], same structure, v6 doctrine" | Reference site (exact) | v6 closely | Structure locked, motion upgraded |
| "Take [URL], loosely follow the layout" | Reference site (loose — adapt freely) | v6 default | Claude can rearrange, add/remove sections |
| "Follow v6 very closely" | Inferred or provided | v6 strictly | Every TP preference active, all recipe patterns applied |
| "Use [URL] but follow v3 style" | Reference site | v3 doctrine (GSAP-heavy, perimeter draws, scrub lines) | Older motion system applied to new structure |
| "Take [URL], keep structure, v6 makeover" | Reference site (exact) | v6 closely | THE MODERNIZATION PLAY — same bones, new muscle |
| "I want this exact site but 2026" | Reference site (exact) | v6 strictly | Full recipe upgrade: springs, blur enters, glassmorphism, video hero, color-blocked cards |

**The Modernization Play (most common use case):**

```
Input:   "Take this site [URL]. Keep the exact same structure.
          Follow v6 closely."

Claude does:
  1. CRAWL the reference site yourself via Firecrawl/Chrome MCP
     (do NOT ask the user to describe it — that's wasted turns)
  2. Lock the structure — same sections, same order, same content hierarchy
  3. Replace the motion system — springs instead of ease-in-out, blur enters,
     directional staggers, animated separators
  4. Upgrade components — glassmorphism cards (R22), photography cards (R23),
     split layouts (R24), color-blocked cards (R29) where they fit WITHOUT
     changing the structure
  5. Apply taste profile — video hero (TP-13), trust banner after hero (TP-03),
     typed-in headlines (TP-01), animated underlines (TP-02), brand-palette
     discipline (TP-15), scale-to-section-role (TP-16), etc.
  6. Generate AI assets where they elevate the design (TP-14, Section 2.12)
  7. Present build brief for confirmation before building
  8. Run Chrome MCP visual preflight throughout the build (Section 1.5)
```

**Doctrine version mixing:**

The user can reference any previous doctrine version. When they do:

| Instruction | Effect |
|---|---|
| "Follow v6" (default) | Spring-first, blur enters, glassmorphism, color-blocked brutalist, all 29 recipes available, full visual verification stack |
| "Follow v5" | Same as v6 but without Recipe 29 (color-blocked cards), without operating principles enforcement, and without the visual verification layer (legacy assertion-only mode) |
| "Follow v3 style" | GSAP-heavy (perimeter draws, scrub lines, directional draws), cubic-bezier easing, 3-layer architecture, 10 original recipes |
| "v6 motion but v3 cards" | Spring/blur system from v6, but card style from v3 (icon-top centered, perimeter draw borders, scrub-driven accents) |
| "Mix of v3 and v6" | Claude picks the best of both per component, presents choices in build brief |

The doctrine versions are NOT mutually exclusive. They're ingredient lists.
Claude can pull recipes from any version and combine them. The build brief
(Section 3.3) is where Claude shows the user what it picked and why.

**Key principle:** The user should be able to describe what they want in
natural language — vague, specific, or anywhere in between — and Claude
resolves it into a concrete build plan. The user never needs to know recipe
numbers, section names, or technical details. Those are Claude's job.
The user's job is to say what they want. Claude's job is to figure out how.

### 0.2 Taste Profile — Owner Preferences

These are Joseph's aesthetic preferences. They are NOT rules. They are soft defaults —
what Claude should lean toward when no other instruction overrides them.

Think of these as "when in doubt, do this." If a reference site or explicit instruction
says otherwise, follow the reference/instruction. If nothing says otherwise, follow these.

---

**TP-01 — Typed-in headline animations (left to right)**

Every section heading should use the TypeInHeading pattern (Recipe 6) — characters
revealing left-to-right with a slight stagger. This is the signature headline treatment.
Static headlines feel dead in comparison. The typed-in effect gives every section
a moment of arrival.

**TP-02 — Selective underlines on key headings**

Use AnimatedUnderline (Recipe 7) on primary section headings ("WHAT WE DO",
"HOW IT WORKS", "REAL STORIES. REAL COMFORT.") but NOT on subtitles or supporting
text beneath them. The underline marks the section anchor — the main statement.
The subtitle/tagline below it should NOT be underlined. The contrast between
underlined heading and un-underlined subtitle creates clear visual hierarchy.

**Important sub-rule (added v6):** The AnimatedUnderline must span MULTIPLE WORDS,
not a single orphan word. If your heading is "Where Comfort Meets Community."
across two lines, the underline should wrap something like "Meets Community." —
not just "Community." Single-word underlines look unintentional.

**TP-03 — Trust banner directly below the hero**

Every site should have a trust/credentials strip immediately after the hero section.
Not services, not "about us" — trust signals first. The trust banner is the first
thing the user sees after the hero's emotional hook. It answers "why should I trust
you?" before the user has time to ask. Stats (years in business, jobs completed,
rating, response time) with counter animations (Recipe 1).

**TP-04 — Animated fine-line separators**

Thin 1px accent-colored lines that animate across (scaleX from 0 to 1) between
content zones within sections. These are NOT section dividers — they're internal
rhythm markers. The scroll progress bar at the top of card sections, the divider
inside glassmorphism cards, the connecting line between process step markers.
Subtle, thin, animated. They add rhythm without taking visual space.

**TP-05 — Counter numbers with stat underlines**

Stat numbers should use the useMotionValue Counter (Recipe 1) and each stat item
should have a thin animated underline or accent line beneath it. The number animates
up, then the underline draws in beneath it. Two-part reveal: number lands, line confirms.

**TP-06 — Directional card entrances (alternating left/right)**

Cards in grids should NOT all enter from the same direction. Alternate entry directions
based on grid position — left column enters from left, right column from right,
center/bottom from below. This choreographed variety is what separates premium motion
from generic fade-in. (See also DAC-15.)

**TP-07 — "Numbers don't lie" stat sections are sacred**

The stat/trust section with large counter numbers, clean layout, and simple
presentation works every time. Don't over-design it. Don't add images or icons
that compete with the numbers. The numbers ARE the content. Clean background,
big animated numbers, short labels, subtle accent lines.

**Important sub-rule (added v6, see TP-16):** Stat sections are SUPPORTING content.
Their visual weight should be smaller than main content sections (Process, Services).
The Bunns build initially scaled stat cards to Process-card size — the user
called them "too big, too flat." They needed to be 1/3 to 1/4 the size as a
single-row supporting strip. Sacred ≠ dominant.

**TP-08 — Split layout for service areas / location sections**

When showing service areas with a map, aerial photo, or video, use the split
layout (Recipe 24) — media on one side, content on the other. Don't overlay text
on busy backgrounds. The split layout solves readability without sacrificing visual impact.
This pattern works exceptionally well on mobile (media stacks on top, content below).

**TP-09 — Mobile execution is not an afterthought**

Every design decision should be verified on mobile. Specifically:
- Video backgrounds should fire cleanly on mobile (autoPlay muted loop playsInline)
- Split layouts should stack gracefully (media 300px on top, content below)
- Tag clouds should wrap naturally without horizontal overflow
- Card grids should go single-column on mobile with full-width cards
- The mobile experience should feel intentional, not compressed

**Sub-rule (added v7.1 from King Maker v2 build):** axe-core sometimes false-positives on mobile when the nav is translucent over an animated/colored background. The button text might be 13:1 contrast in reality but axe sees an intermediate value through the backdrop-blur and flags it. Either: (a) accept as known false-positive and document, or (b) enforce nav `bg-bg/55 backdrop-blur-md` minimum at all scroll positions. Option (b) is the durable fix — see §1.3 Translucent nav backdrop rule.

**TP-10 — Featured + supporting review layout**

Reviews should have one featured/hero review that's visually dominant (larger,
more padding, prominent quote), followed by smaller supporting review cards in a grid.
The featured review carries the emotional weight. The supporting reviews provide volume
and variety. Don't make all reviews the same size — the hierarchy IS the design.

**TP-11 — Accent-colored category tags on cards**

Each card in a grid should have its own accent color and a small category tag pill
(e.g., "COOLING", "EMERGENCY", "DIAGNOSTICS"). The per-card accent color prevents
the grid from looking monotone. The tag pill gives instant context about what
the card covers without reading the description.

**Important sub-rule (added v6, see TP-15):** "Per-card accent color" does NOT mean
"any color goes." Accents must come from the project's defined brand palette.
The Bunns build initially had blue, orange, green, purple, and red accents
sneaking into services because each looked fine in isolation — but together they
violated the navy/yellow/red brand discipline. Every accent in `lib/data.ts`
must be a palette color.

**TP-12 — Process sections with visual connectors**

Process/timeline sections should have visible connecting elements between steps —
animated lines, dots, circles, progress bars. The connection between steps is as
important as the steps themselves. Disconnected process cards look like a random
collection. Connected steps tell a story of progression.

**TP-13 — Video hero by default**

Unless told otherwise, the hero section uses a looping background video (Recipe 28).
Not a gradient, not a static image — a video. The video hero is the single biggest
differentiator between a site that feels premium and one that feels like a template.

If no video is available or provided, Claude should:
1. First, check if AI video generation is available (Higgsfield, etc.) and offer to generate one
2. If no generation is possible, fall back to an animated gradient hero
3. Never fall back to a flat static color — that's the one outcome that's not acceptable

The video should be cinematic (industry-relevant footage), dark enough for text
contrast (use neutral overlays per Recipe 28), and looping seamlessly. The nav
adapts via Recipe 27 (transparent over video, frosted glass when scrolled past).
Pair with Recipe 12 (Breathing Hero Video) for the play-once + crossfade-to-still
+ idle drift pattern.

This is a soft default. If the user says "I want a gradient hero" or "static image,"
that explicit instruction overrides this. But the STARTING assumption is video.

**TP-14 — Proactive image generation everywhere it helps**

Claude should proactively generate images and video wherever they elevate the design
(see Section 2.12 for the full strategy). The user should NOT need to ask for images —
Claude identifies where photography, aerial shots, or video would improve a section
and generates them as part of the build process.

When modernizing a reference site, Claude regenerates all images with fresh
AI-generated versions that match the original intent (Section 2.12, Priority 1).
When building fresh, Claude generates assets based on industry, service type, and
context. The user reviews everything in the build brief before code is written.

This is not "add stock photos." This is "generate cinematic, industry-specific
photography that makes the site look like it had a $5,000 photo shoot."

---

**TP-15 — Brand-palette discipline (NEW in v6)**

If a project has a strict brand palette (e.g., navy/yellow/red), enforce it
**both programmatically AND visually**. Programmatic enforcement: every accent
color in `lib/data.ts` (or equivalent data file) must be from the defined
palette — no "decorative" off-palette colors. Visual enforcement: open the
live site and look at all the cards/sections together. Off-brand colors that
look fine in isolation accumulate and undermine cohesion.

**Why:** The Bunns build had six service cards with green, purple, blue, and
orange accents that "looked fine each on their own" but together looked
chaotic and broke the navy/yellow/red brand. Only caught when I actually
looked at the live site through Chrome MCP.

**How to apply:**
- Audit the data file's accent values BEFORE rendering: every value must match a palette color
- Audit the rendered site AFTER rendering: open it in Chrome MCP and look at all instances together
- If a project doesn't have an explicit palette, ASK before introducing accent colors
- Star colors, tag pill colors, accent line colors, hover glow colors — all must be palette-compliant

**Sub-rule (added v7.1 from King Maker v2 build):** **Token brightness must be validated against WCAG AA contrast on each surface BEFORE first build.** Default token sets often ship too dim — King Maker v2's `--text-dim` at `#5C5240` against `#0A0A0A` gave only 2.57:1 contrast (AA needs 4.5:1). Caused multiple a11y test failures + multiple user-feedback rounds. Bump aggressively. Provide a contrast matrix per palette: for each text token × each surface token, compute and document the ratio. See §1.3 Token brightness validation.

---

**TP-16 — Scale to section role (NEW in v6)**

Supporting content (trust strips, stat ribbons, micro-CTAs) should start
SMALLER than main content (process steps, feature cards, hero). A card pattern
that's gorgeous at hero scale is oppressive at supporting-strip scale. Same
DNA, wrong size = wrong design.

**Why:** The Bunns Stats section took THREE iterations because the Process
card DNA (which the user loved at Process scale) was applied at Process card
size in a supporting-strip context. Cards were 720px tall when they should
have been ~200px tall as a single-row trust strip.

**How to apply:**
- Before sizing any new section, ask: "What is this element's role in the section's hierarchy?"
- Decoration < anchor < main content
- When designing supporting content, START SMALL and earn more space if needed
- Never start big and shrink — you'll over-shrink trying to compensate
- Multi-column compact strips beat 2x2 oversized grids for trust signals

---

**TP-17 — Pattern propagation from user signals (NEW in v6)**

When the user reacts strongly POSITIVE to a pattern, look for OTHER places to
apply it. When they react strongly NEGATIVE, look for OTHER places to root it
out. Don't treat single-element feedback as a single-element fix.

**Why:** When the user said the Process cards were "fucking gas," I built Stats
cards using the same DNA — that was the right move, but I should have also
asked: "Where else could this pattern apply? Service cards? Review cards?"
When the user said "too big, too flat," I should have audited every other
place I might have made the same scale mistake.

**How to apply:**
- Strong positive signal → catalog the praised pattern, look for adjacent applications
- Strong negative signal → catalog the rejected pattern, audit other instances
- "I love this" = "I love THIS pattern, find more places for it"
- "This sucks" = "This pattern sucks, find other places I made the same mistake"

---

**TP-18 — Mid-build skill audit (NEW in v6)**

Pre-flight skill discovery (Section 0.0 Step 1) is a START gate. Mid-build,
explicitly check: "Of the relevant skills available, which have I actually
invoked?" 0% utilization on a relevant skill is a red flag — same as 0% MCP
utilization.

**Why:** The Bunns build invoked ZERO skills despite having `redesign-existing-projects`,
`design-taste-frontend`, `impeccable`, and `huashu-design` available — every
one directly applicable. The pre-flight discovery wasn't enough; mid-build
enforcement was missing.

**How to apply:**
- At any major iteration boundary (kickoff, mid-build, pre-deploy), list:
  - Available skills (from Section 0.0 Step 1)
  - Which I've invoked
  - Which I should have invoked but didn't
- If gap exists, invoke the missing skills before continuing
- Same audit for MCP tools — don't leave Chrome MCP at 0% if you're building UI

---

**Using the Taste Profile:**

When building from vague instructions, treat every TP item as an active default.
If the user says "build me a plumber's site in Denver, blue and silver color scheme,"
Claude should apply ALL 18 TP preferences unless the instruction or reference
site specifically contradicts one.

When building from a reference site, taste preferences yield to the reference site's
established patterns. If the reference site doesn't use typed-in headlines, don't
force them in. But if the reference site has no opinion on a particular element
(e.g., it doesn't have a service areas section), fall back to the taste profile
for that element.

When given an explicit hard rule ("follow this structure exactly"), the taste profile
only fills gaps that the hard rule doesn't cover. The structure is locked, but motion
treatment, animation timing, and visual polish still follow the taste profile.

When the user says "follow v6 closely," that means activate ALL 18 TP preferences
and apply recipes aggressively. When they say "follow v6 loosely," that means use
the motion system (springs, blur enters) but don't force every TP preference —
let the content and reference site guide which ones apply naturally.

---

### 0.3 Operating Principles (NEW in v6 — Always Active)

These are mental models that govern HOW Claude works on UI builds, not WHAT
gets built. They are at Priority 5 (Engineering Rules) — they cannot be
overridden by user instruction or reference site. They exist because their
absence caused real, expensive failures during the Bunns HVAC build.

---

**OP-01 — Vision for taste, assertions for correctness**

Screenshots and GIFs answer "does this *feel* right?" DOM assertions answer
"is this *technically* right?" **Use both. Neither alone is verification.**

A test passing `cards have equal width` is meaningless if the cards are 720px
tall when they should be 200px. A test passing `color === #f0df25` is meaningless
if the color sits on top of an image that destroys contrast.

The user is asking design questions ("does this feel premium?", "is this too big?")
— answer them with eyes, not with `getBoundingClientRect()`.

---

**OP-02 — Never build UI blind**

If you're writing UI code, you should be **looking at the result** after every
meaningful change. Not at the end. Not after a deploy. Continuously.

The user shouldn't have to be your eyes. If they're describing visual problems
to you that you could see yourself, you're doing it wrong.

Before claiming a fix works: open the page (Chrome MCP), scroll to the element,
screenshot it, look at it.

---

**OP-03 — Recognize inference vs. perception**

- "The cards should look square because I set `aspect-square`" → inference
- "The cards look square in this screenshot" → perception

Inference is fragile. Perception is grounded. Always close the loop with
perception before you say something is done.

The Bunns Stats section had 14/14 passing Playwright assertions verifying
"uniform width and square aspect ratio." Those assertions were technically
correct AND the cards were visually wrong (twice the size they should be).
Inference was fine. Perception was missing.

---

**OP-04 — Scale to section role (also TP-16)**

Different elements have different size budgets based on their hierarchical role.
A pattern that works at hero scale doesn't work at trust-strip scale.

Always ask: "What is this element's role in the section's hierarchy?"
Decoration vs. anchor vs. main content all have different size budgets.

---

**OP-05 — Trust user taste signals broadly (also TP-17)**

When the user reacts strongly to ONE element, the signal applies to similar
elements throughout the site. "Fucking gas" = catalog the pattern, find more
places for it. "Too big, too flat" = catalog the failure pattern, root it out
elsewhere.

Single-element feedback is rarely about a single element.

---

**OP-06 — Brand-palette discipline (also TP-15)**

If a project has a defined palette, enforce it programmatically (audit
`lib/data.ts` accent values) AND visually (look at the live page to catch
sneaky off-brand colors). Off-palette colors that look fine in isolation
accumulate and undermine cohesion.

---

**OP-07 — Audit tool/skill utilization mid-build (also TP-18)**

Pre-flight discovery is a START gate. At any major iteration, ask: "Am I using
all the tools and skills available to me?" 0% utilization on a relevant
capability is a red flag.

The Bunns build had Chrome MCP, Preview MCP, Firecrawl, ALL 26 installed
skills, and the framer-motion plugin available. It used 0% of them for the
first portion of the build. That failure was preventable with a mid-build audit.

---

## Part 1 — ENGINEERING RULES

Hard rules only. Never bend. Grep-enforceable or measurably prevent bugs.

If a rule cannot be enforced by grep, it is taste or wisdom — not engineering.
Such rules belong in operating principles (Section 0.3) or recipes (Part 2), not here.

---

### 1.1 Hard Performance Bans

These are non-negotiable. Every one of them exists because it caused a real,
measurable problem during a production build.

| ID | Ban | Reason |
|---|---|---|
| **PP-05** ⭐ REFRAMED in v6 | **Visual verification cannot be replaced by DOM assertions, but DOM assertions cannot be replaced by screenshots either.** Use BOTH in parallel (per Section 1.5). Screenshots alone miss overflow, hydration mismatches, accessibility violations. DOM assertions alone miss visual hierarchy mistakes, off-brand colors, oversized supporting content. Either alone is insufficient — combined they are the contract. | The original v5 PP-05 banned screenshots outright, which led to the Bunns build going through 3 Stats card iterations completely blind. The fix isn't to ban one or the other — it's to require both. |
| PP-07 | No skipping re-verification after changes | Every change gets re-tested. No exceptions. "I only changed a color" has broken layouts. |
| PP-08 | No infinite `boxShadow` animations | Real paint cost. Measured. Use opacity or filter instead. |
| PP-09 | No `width` / `height` / `top` / `left` animations | Layout reflow on every frame. Use `transform` and `opacity` exclusively for animation. |
| PP-10 | No `setInterval` counters | Use `requestAnimationFrame` or Framer Motion `useMotionValue`. setInterval drifts, blocks, and re-renders React. |
| CCR-06 | No `<div>` inside inline primitives | `<div>` inside `<span>`, `<p>`, `<a>` is invalid HTML. Causes hydration mismatches and unpredictable layout. |

### 1.2 Hydration & Framework Rules

These prevent the most common Next.js + animation library failures.

| Rule | Detail |
|---|---|
| `'use client'` directive | Required on EVERY component that uses Framer Motion or GSAP. No exceptions. Server components cannot run animation code. |
| `useGSAP()` hook | All GSAP in React MUST use `useGSAP()` from `@gsap/react`. Do NOT use raw `useEffect` + `gsap.context`. The hook handles cleanup, strict mode, and React 18+ double-mount correctly. |
| GSAP + Framer Motion separation | GSAP and Framer Motion must NEVER target the same DOM element. They fight over transform ownership. One element, one animation system. |
| Framer Motion ownership | If a component uses `motion.div`, Framer Motion owns that element's transforms. GSAP can target children, siblings, or wrapper elements — never the motion element itself. |
| GSAP ScrollTrigger cleanup | Every ScrollTrigger instance must be killed on unmount. `useGSAP` handles this automatically — another reason to never use raw useEffect. |

### 1.3 Accessibility Requirements

Non-negotiable. These are legal requirements, not suggestions.

| Rule | Standard | Detail |
|---|---|---|
| Color contrast | WCAG 2.1 AA | Minimum 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+ regular) |
| `prefers-reduced-motion` | WCAG 2.1 | Honor the user preference. Disable continuous loops and ambient motion. Keep reveals (opacity transitions are fine). |
| axe-core verification | Zero tolerance | 0 critical violations, 0 serious violations. Run `@axe-core/playwright` on every page. |
| Decorative elements | ARIA | `aria-hidden="true"` on all decorative/presentational elements (animated backgrounds, glows, lines, particles). |
| Keyboard navigation | WCAG 2.1 AA | All interactive elements reachable and operable via keyboard. Focus indicators visible. |
| Semantic HTML | HTML5 | Use `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`. Not everything is a `<div>`. |
| Translucent nav backdrop | axe-core compatibility | Fixed-position translucent navigation surfaces MUST have base background opacity ≥ 40% at all scroll positions. Fully-transparent nav over animated content fails axe-core contrast checks even when rendered contrast is fine, because axe cannot reliably compute effective color through `backdrop-blur`. **Added v7.1 from King Maker v2 build.** |
| Form input labeling | WCAG 2.1 AA | Every `<input>` MUST have a paired `<label htmlFor="...">` with matching `id`, OR an explicit `aria-label`. Range sliders need `aria-label`. Decorative prefix/suffix glyphs (`$`, `/mo`) need `aria-hidden="true"`. **Added v7.1.** |
| Token brightness validation | WCAG 2.1 AA | Validate every text token against every surface token at WCAG AA contrast BEFORE first build. Default token sets often ship too dim — `--text-dim` at `#5C5240` on `#0A0A0A` is only 2.57:1 (fails). Bump aggressively. **Added v7.1 from King Maker v2 build.** |

### 1.4 Animation Behavior Rules

These define the scrolling-first contract.

```
RULE: once: false on ALL whileInView / useInView

This is mandatory. Animations re-trigger when elements scroll back into view.
This is the ONLY way to make a scrolling-first experience feel alive on revisit.
A user who scrolls back up should see the page wake up again, not a dead layout.
```

```
RULE: Motion parity — desktop and mobile use IDENTICAL animation systems

Do not strip animations on mobile. Do not create a "lite" mobile experience.
The same animation plays on both viewports. Adjust timing or scale if needed,
but never remove the animation entirely.
```

```
RULE: Mobile auto-trigger pattern

Touch devices have no hover. Use the mobile auto-trigger pattern (Recipe 4)
to synthesize hover states when elements scroll into view on touch devices.
Every hover interaction must have a mobile equivalent.
```

### 1.5 Verification Contract ⭐ MAJOR REFRAME in v6

Every build is verified against these criteria before delivery. v6 reframes
the contract as a **three-layer stack**, not a single tool.

**The Verification Stack:**

```
Layer 1: VISUAL (Chrome MCP — Primary Eyes)
   ↓
Layer 2: AUTOMATED (Playwright FULL capabilities — not just DOM)
   ↓
Layer 3: ACCESSIBILITY (axe-core)
```

All three layers run on every build. Skipping any layer = incomplete verification.

**Testing Infrastructure:**
- Chrome MCP for visual verification (PRIMARY — see Section 1.8 tactical guidance)
- Claude Preview MCP as lightweight alternative if Chrome MCP not connected
- Playwright CLI (NOT Playwright MCP) for all automated testing
- `@axe-core/playwright` for accessibility verification
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844

**Playwright Full Capability Set (use all of these, not just DOM assertions):**

| Capability | Purpose | When to Use |
|---|---|---|
| **Video recording** (`video: { mode: 'on' }`) | Watch animations play back | Every motion-heavy build — record scroll-throughs to verify animation feel |
| **Trace files** | Full timeline + screenshots + DOM + network at every action | Debug failed tests, verify complex interaction sequences |
| **`toHaveScreenshot()`** | Pixel-diff regression testing | Catch unintended visual regressions when refactoring |
| **Device emulation** | Real device profiles (touch, pixel ratio, user agent) | Mobile testing — not just viewport resize, real device behavior |
| **Network interception** | Loading performance, failed request detection | Catch broken images, slow API calls, missing assets |
| **Console listeners** | Uncaught exceptions, React errors, hydration mismatches | Catch runtime errors that don't break the page but indicate bugs |
| **Accessibility tree snapshots** | Full a11y tree dump (beyond axe-core violations) | Verify semantic structure, focus order, ARIA correctness |
| **DOM assertions** | Element counts, computed styles, dimensions, overflow | Standard correctness verification |

v5 routinely treated Playwright as a glorified DOM query tool. v6 expects video,
traces, and pixel-diff regression as standard for any motion-heavy build.

**Verification Checklist:**

| ID | Check | Pass Criteria | Layer |
|---|---|---|---|
| **VC-00** ⭐ NEW v6 | **Visual preflight via Chrome MCP** — open the page, screenshot every section at desktop AND mobile widths, manually compare against intent before running automated tests | Every section visible, no obvious visual regressions, brand palette consistent, scale-to-role correct | Visual |
| VC-01 | Reload stability | Hero must settle to final state after full page reload. No stuck animations, no missing elements. | Automated |
| VC-02 | FPS budget (desktop) | 50fps sustained during scroll. Hard floor: never below 30fps. | Automated |
| VC-03 | FPS budget (mobile) | Headless mobile: 5fps floor (verify real performance on physical device). | Automated |
| VC-04 | Horizontal overflow | No horizontal scrollbar on mobile at 390px width. Test at 375px for safety margin. | Automated |
| VC-05 | Stat container fit | All stat numbers, labels, and units must fit within their card containers. No overflow, no clipping. | Automated |
| VC-06 | Accessibility | axe-core: 0 critical, 0 serious violations. | A11y |
| VC-07 | Contrast | All text meets 4.5:1 against its background (including text over images/video). | A11y |
| VC-08 | Reduced motion | With `prefers-reduced-motion: reduce`, continuous loops stop, reveals still play (opacity-only). | A11y |
| VC-09 | Cross-viewport | Run full test suite at both 1440x900 AND 390x844. Both must pass. | Automated |
| VC-10 | Asset weight | Total page weight < 5MB. Hero video < 3MB. | Automated |
| **VC-11** ⭐ NEW v6 | **Post-deploy visual confirmation** — after deploying to production, navigate to production URL via Chrome MCP, screenshot the changes, confirm they're visible to a real user | Production URL serves the new build, all visual changes from the iteration are visible | Visual |

### 1.6 Technical Stack

The default stack for Claude Code builds. Projects may deviate with documentation.

| Layer | Technology | Version Floor |
|---|---|---|
| Framework | Next.js + App Router | 16+ |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | 4+ |
| Design tokens | `globals.css` custom properties | — |
| Component animation | Framer Motion | 12+ |
| Advanced animation | GSAP (perimeter draws, scrub lines, directional draws, hero video timing) | 3.12+ |
| Testing | Playwright + @axe-core/playwright | Latest |
| Build | Vite or Next.js built-in | — |

**When to use which animation library:**

| Use Framer Motion for | Use GSAP for |
|---|---|
| Reveals (whileInView, variants) | Perimeter draw sequences |
| Hover/gesture interactions | ScrollTrigger scrub animations |
| AnimatePresence enter/exit | Directional line draws (up, down, left, right) |
| Layout animations | Complex multi-element timelines |
| useMotionValue counters | Hero video timing coordination |
| Spring physics (drag, momentum) | clipPath polygon animations |

### 1.7 Asset Compression Standards

| Asset | Codec / Format | Target | Max |
|---|---|---|---|
| Hero video | H.264, CRF 28 | < 2MB | 3MB hard limit |
| Video resolution | — | 1920 x 1080 | Never above 1080p |
| Images (photo) | JPEG quality 3 (ffmpeg) or WebP quality 80 | < 200KB each | — |
| Images (graphic) | WebP or SVG | < 100KB each | — |
| Total page weight | — | < 3MB | 5MB hard limit |
| Font files | WOFF2 only | < 100KB per weight | — |
| **Video playback rate** ⭐ v7.1 | — | Always 1.0x | **Never use HTML video `playbackRate < 1.0` for slow-motion effect.** Halving playback rate halves effective frame rate, producing visible stutter. Generate the asset at native longer duration instead (e.g. 12s native > 6s native @ 0.5x). King Maker v2 hit this; one extra Higgsfield generation eliminated the choppiness entirely. |

### 1.8 Tactical Operations (NEW in v6)

Operational knowledge that prevents wasted turns. Every tip in this section
exists because its absence cost time during the Bunns HVAC build.

---

**Chrome MCP — Tactical Patterns**

The Chrome MCP toolkit is deferred — load it ALL in one keyword search:

```
ToolSearch({ query: "chrome browser navigate screenshot", max_results: 15 })
```

**Never** load Chrome MCP tools one-at-a-time with `select:tool_name`. The
keyword search returns the entire toolkit (15+ tools) in a single round-trip.
The `select:` form is only for cherry-picking 1-2 tools from different MCPs.

**Always use `browser_batch` for multi-step sequences.** Single round-trip is
dramatically faster than separate calls. Example:

```
browser_batch({
  actions: [
    { name: "resize_window", input: { tabId: X, width: 1440, height: 900 } },
    { name: "navigate", input: { tabId: X, url: "https://..." } },
    { name: "computer", input: { action: "wait", tabId: X, duration: 3 } },
    { name: "computer", input: { action: "scroll", tabId: X, ...} },
    { name: "computer", input: { action: "screenshot", tabId: X } }
  ]
})
```

**Recovery patterns when things go wrong:**

| Symptom | Fix |
|---|---|
| `screenshot` times out (CDP frozen) | Retry the screenshot alone — don't rebuild the whole batch. Often clears on second attempt. |
| Tab gets stuck unresponsive | Close the tab via `tabs_close_mcp`, then `tabs_create_mcp` + `tabs_context_mcp({createIfEmpty: true})` to start fresh |
| Page loading hangs after navigate | Wait 5+ seconds and try the screenshot again. The `executeScript` waited-for-document_idle timeout is real. |
| Render hangs after viewport change mid-session | **Resize the window FIRST** (`resize_window` to 1440×900 desktop or 390×844 mobile) before navigating. Viewport changes mid-session cause CDP issues. |
| Tab ID errors when working across multiple tabs | Get fresh context with `tabs_context_mcp({createIfEmpty: true})` before each batch — tab IDs change |
| **Repeated screenshot timeouts on local dev server** ⭐ v7.1 | **Pivot to Vercel deploy-and-verify.** Continuous animations (marquees + breathing glows + grain noise overlays) can freeze CDP screenshots for 30+s on `npm run dev`. Vercel deploys in 30–50s and serves cached assets — verification on production is faster AND more reliable than retrying local CDP. King Maker v2 build relied on this pattern after losing 20+ minutes to local screenshot timeouts. |

---

**Vercel Deploy via `npx` (NEW v7.1 — no CLI install needed)**

```bash
cd <project-dir> && npx vercel@latest --yes --prod
```

`npx` auto-installs `vercel@latest` on first run, deploys to production, and auto-aliases to the project's `<project>.vercel.app` URL. Faster iteration than installing the CLI globally. Tested across 15+ deploys during the King Maker v2 build with no install drift.

---

**Vercel Deploy from a Worktree (no git push needed)**

When working in a Claude Code worktree where the bunns-site/repo is
"untracked" or in a messy git state, you can still deploy directly:

1. Check for `.vercel/project.json` in the project root:
   ```
   ls -la [project-dir]/.vercel/project.json
   cat [project-dir]/.vercel/project.json
   ```
   If present, the directory is linked to a Vercel project ID.

2. Deploy directly:
   ```
   cd [project-dir] && npx vercel --prod --yes
   ```
   (npx installs `vercel@latest` on first run.)

3. The deploy auto-aliases to the project's production URL (e.g.
   `the-bunns-rework.vercel.app`).

4. **Verify with Chrome MCP after deploy** (VC-11). Don't trust "build succeeded"
   as confirmation — confirm the change is visible to a real user.

This works even when:
- The worktree's git state is messy
- The worktree is detached from any branch
- The bunns-site directory is untracked
- No git push has happened

---

**Skill Discovery Fallback**

If no skills appear in `<system-reminder>` messages despite the doctrine
expecting them, the runtime failed to inject the manifest into session context.

**Workaround:**
```bash
ls -la ~/.claude/skills/
```

This lists all installed skills (including symlinks to `~/.agents/skills/`).
Skills on disk are still callable via the `Skill` tool by exact name — the
manifest just isn't surfaced in your session.

The Bunns build went 0% on every installed skill because the manifest never
surfaced. Don't repeat that mistake — when in doubt, check the disk.

---

**Mid-Build Tool & Skill Audit Cadence**

Run an audit at these checkpoints:

| Checkpoint | Question |
|---|---|
| Kickoff (after pre-flight) | Which tools/skills are available AND relevant? |
| After 3-5 components built | Have I invoked any of the relevant skills yet? |
| Before major design decision | Is there a skill that should weigh in? |
| Before delivery | Did I run `design-motion-principles` and `impeccable`? |
| After verification | Did I use Chrome MCP visual preflight (VC-00)? |

0% utilization on a relevant capability at any checkpoint = red flag = invoke
before continuing.

---

## Part 2 — MOTION RECIPES & PATTERNS

The portable IP. Proven patterns to reference, copy, and adapt.
Every recipe here was built, tested, and verified in production.

---

### 2.1 The Fluidity Mandate

This is the core philosophy. Everything else serves this idea.

> Every site built under this doctrine is a scrolling-first experience. The entire
> page should feel like one continuous, flowing, living document — not a stack of
> static sections bolted together. Motion is not decoration; motion IS the credibility
> argument. The site should feel expensive because it moves like something expensive.

The scroll is the primary interaction. Not clicks, not hovers, not navigation.
The user scrolls, and the page responds. Every pixel of scroll travel should
produce visible, intentional motion somewhere in the viewport.

**The Four Motion Categories (DAC-13):**

| # | Category | Examples | Role |
|---|---|---|---|
| 1 | **Triggered** | Scroll reveals, whileInView entrances, stagger cascades | Punchline delivery — the big moments |
| 2 | **Continuous Ambient** | Breathing loops, subtle scale pulses, idle glow shifts | Keeps the page alive between scroll events |
| 3 | **Cursor-Responsive** | Spotlight gradients, 3D tilt, hover glows, magnetic buttons | Rewards exploration, adds depth |
| 4 | **Scroll-Linked** | Scrub lines, parallax layers, progress indicators, sticky transforms | Connects the user's input to the page's response |

**The DAC-13 Rule:**

At least 3 of these 4 categories must be active at any given scroll position.
Triggered motion alone leaves dead air between scroll events. The site goes
silent, and silence reads as cheap.

A premium experience never stops moving. It breathes.

### 2.2 Universal Constants

These patterns appear in every build. They are the DNA.

| Constant | Detail |
|---|---|
| Hero is always atmospheric | Video background, animated gradient, or equivalent. Never a static flat color. The hero sets the tone — it must move. |
| Hero video plays at 0.67x speed | Cinematic, not frenetic. Real-time video looks like stock footage. Slowed video looks like a film. |
| Every section entrance uses whileInView + stagger | Nothing pops in all at once. Elements cascade in sequence. The stagger IS the premium feel. |
| Every headline gets character or word animation | Static headlines are dead on arrival. TypeInHeading, CharLine, or equivalent on every heading. |
| Accent color for emphasis | Glow, underlines, draws, counters. One accent color threads through the entire site as the energy color. Chosen per project. |
| Dark backgrounds as default | Near-black (#0a0a0a to #1a1a1a range). Light modes are opt-in per project. Dark backgrounds make motion, glow, and video pop. |
| `once: false` everywhere | Animations replay on scroll-back. The page is alive in both directions. |

### 2.3 Spring-First Motion System

**v5.0 — replaces the cubic-bezier easing palette from v4 as the default for Framer Motion components.**

Springs produce physically-grounded motion that cubic-bezier curves cannot replicate.
They respond to interruption naturally, have no fixed duration ceiling, and feel alive.
This system was proven across the Summit Air HVAC build (6 sections, 40+ animated elements)
and reaffirmed in the Bunns HVAC build (12 sections, 60+ animated elements).

**Spring Constants:**

```tsx
// The two constants. Define once at file top. Use everywhere.
const SPRING = { type: "spring" as const, duration: 0.55, bounce: 0 };
const SPRING_SLOW = { type: "spring" as const, duration: 0.7, bounce: 0 };
```

| Constant | Duration | Bounce | Use For |
|---|---|---|---|
| `SPRING` | 0.55s | 0 | Default for all viewport entries, reveals, staggers, hover states |
| `SPRING_SLOW` | 0.70s | 0 | Featured elements, hero content, large cards, important transitions |

**Override pattern — spread first, override after:**

```tsx
// ✅ Correct — spread SPRING first, then override duration
transition={{ ...SPRING, duration: 0.8 }}

// ❌ Wrong — SPRING's duration overwrites yours (TypeScript error)
transition={{ duration: 0.8, ...SPRING }}
```

This is a real TS error that appeared 21 times across 9 files during the Summit Air build.
The spread must come first so your override wins.

**When to still use cubic-bezier:**

| Use Case | Curve |
|---|---|
| GSAP ScrollTrigger animations | `power2.out` or `ease: "none"` (scrub) |
| CSS transitions (non-Framer) | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Breathing / idle loops | `cubic-bezier(0.45, 0, 0.55, 1)` |
| AnimatedUnderline (background-size) | `cubic-bezier(0.25, 0.1, 0.25, 1)` |

Springs are for Framer Motion component animation. Cubic-bezier is for CSS and GSAP.
Do not mix them on the same element.

### 2.4 Blur-Enter Standard

**v5.0 — every viewport entry animation includes filter blur.**

The blur-enter creates a focal-depth effect: elements appear to shift from out-of-focus
to in-focus as they enter the viewport. This is the single biggest upgrade from generic
fade-in reveals to premium-feeling motion.

**The standard enter recipe:**

```tsx
initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={SPRING}
```

**Variations by context:**

| Context | Y offset | Blur | Transition |
|---|---|---|---|
| Standard element | `y: 12` | `blur(4px)` | `SPRING` |
| Card or large block | `y: 24` | `blur(6px)` | `SPRING_SLOW` |
| Small pill / tag | `y: 10` | `blur(4px)` | `SPRING` with stagger delay |
| Directional (from left) | `x: -40, y: 0` | `blur(6px)` | `SPRING_SLOW` |
| Directional (from right) | `x: 40, y: 0` | `blur(6px)` | `SPRING_SLOW` |
| Scale entrance | `scale: 0.9` | `blur(4px)` | `SPRING` |

**Key detail:** Always animate blur to `"blur(0px)"`, not remove it. Animating to an
explicit zero value ensures the filter transition is smooth. Removing the property
entirely causes a snap.

### 2.5 Proven Recipes

29 recipes (Recipe 29 NEW in v6). Each one was built, broken, debugged, and
verified. The implementation detail listed is the one that makes it actually
work — the thing you'd waste an hour discovering on your own.

---

**Recipe 1 — useMotionValue Counter**

Animate a number from 0 to N on scroll-into-view. Uses Framer Motion
`useMotionValue` + `animate()` + `useTransform` for display formatting.
No `setInterval`, no React state updates, no re-renders during animation.

*Key detail:* Set a duration floor of 0.8s even for small targets (like 0→1).
Without the floor, small numbers resolve instantly and the animation is invisible.

---

**Recipe 2 — Perimeter Draw (Load-Triggered)**

GSAP timeline sequences `scaleX` / `scaleY` on 4 absolute-positioned 1px divs
arranged as top, right, bottom, left borders. Transform origins: left, top, right,
bottom respectively. The line traces the full perimeter of its container.

*Key detail:* Start the draw after the hero typewriter settles (~2.4s delay).
If it fires during other entrance animations, it gets lost in the noise.

---

**Recipe 3 — Perimeter Draw (Scrub-Driven)**

Same visual effect as Recipe 2, but driven by ScrollTrigger with `scrub: 1.5`.
The border line traces as the user scrolls through the section. Gives the user
direct control over the animation — pure scroll-linked motion.

*Key detail:* Use `scrub: 1.5` (not `scrub: true`). The float value adds
smooth interpolation. `scrub: true` is 1:1 and feels jittery.

---

**Recipe 4 — Mobile Auto-Trigger**

`useIsMobile()` hook detects touch devices. Combined with `useInView`, it
auto-fires hover states (glows, border draws, spotlight effects) when elements
scroll into the viewport on mobile. Synthesizes the hover experience without
requiring touch interaction.

*Key detail:* Gate the auto-trigger behind `useIsMobile()`, not viewport width.
A 1024px tablet in landscape still needs auto-trigger. Width alone misses it.

---

**Recipe 5 — Per-Letter Typewriter + Hover Glow**

CharLine component splits text into word groups (`inline-block`, `white-space: nowrap`)
containing individual `motion.span` characters. Each character fades in + slides
from the left sequentially (0.06s stagger between characters).

Hover on any individual character scales it to 1.18x with an accent-colored
`textShadow` glow. Creates an interactive, exploratory headline.

*Key detail:* The word-group wrapper with `nowrap` prevents mid-word line breaks.
Without it, responsive layouts break words at random character boundaries.

---

**Recipe 6 — TypeInHeading (Word-Split Reveal)**

Fast left-to-right per-character reveal for section headlines. Splits text by
spaces into atomic `inline-block` word spans. Characters animate inside each word
(opacity 0→1, x: -6→0, 0.025s stagger per character).

*Key detail:* Each word is an `inline-block` container that wraps naturally.
This means multi-line text on mobile just works — words wrap to the next line,
characters still animate correctly within each word.

---

**Recipe 7 — AnimatedUnderline (Background Gradient)**

Wraps text in a `motion.span` with `background-image: linear-gradient(color, color)`
positioned at `left bottom`. Animates `background-size` from `0% Npx` to `100% Npx`
on scroll-into-view, drawing an underline from left to right.

*Key detail:* Use the background-image approach, not an absolute-positioned pseudo-element.
The absolute approach breaks when the text wraps to multiple lines or when the parent
element has `overflow: hidden`. Background-image works on inline text regardless of wrapping.

*⚠️ v6 warning — multi-word phrases only:* The AnimatedUnderline must wrap a
multi-word phrase, NOT a single orphan word. If your heading is "Where Comfort
Meets Community." across two lines, do NOT wrap just "Community." — wrap "Meets
Community." instead. Single-word underlines look unintentional and create visual
imbalance. The Bunns build had 5 sections with this mistake — caught only via
visual verification (Chrome MCP), not via DOM assertions. See TP-02 sub-rule.

---

**Recipe 8 — Scrub-Driven Vertical Line**

Single accent-colored 1px div with `transform-origin: top`, animated from
`scaleY: 0` to `scaleY: 1` via ScrollTrigger scrub. Functions as the visual
spine of timeline, process, or step-sequence sections.

*Key detail:* Set the line's height to match the full section content area.
Use the scrub to control how much of it is visible. The line exists at full
height from the start — scaleY just reveals it.

---

**Recipe 9 — RandomCounter (Slot Machine)**

`requestAnimationFrame` loop displays random numbers cycling between 0 and a
`spinMax` ceiling for `spinDurationMs`, then snaps to the target number. Used
for punchline stat reveals where the number landing IS the dramatic payoff.

*Key detail:* The spin phase must show numbers in the same digit range as the
target. If the target is 847, spin through 100-999, not 0-9999. Mismatched
digit counts break the slot-machine illusion.

---

**Recipe 10 — StatCard (Rich Interactive)**

A single card component with 5 layered motion systems:
(a) Stagger entrance on scroll-into-view
(b) Cursor spotlight — radial accent gradient follows mouse position via `useMotionValue`
(c) 3D tilt on hover — `rotateX`/`rotateY` at +/-5deg via spring physics
(d) Continuous breathing — number element pulses `scale: 1 → 1.012 → 1` on a 5s loop
(e) Hover border-draw — accent border traces in on mouseEnter

*Key detail:* The breathing animation (d) runs on the number element INSIDE the card,
not the card itself. Breathing the whole card is nauseating. Breathing just the number
adds life without motion sickness.

---

**Recipe 11 — Cycling Word Swap (TFD-01)**

`AnimatePresence` with `mode="wait"` cycles through an array of words on a
`setTimeout` loop (2.4s per word). Each word slides in from `y: 100%`, holds,
then exits to `y: -100%`.

*Key detail:* Reserve `min-width: 10ch` (or appropriate for your longest word)
on the container. Without it, the container width changes with each word,
causing layout reflow that shifts surrounding text.

---

**Recipe 12 — Breathing Hero Video**

Three-phase hero lifecycle:
Phase 1 — Video plays at 0.67x speed. Full atmospheric motion.
Phase 2 — On `ended` event, crossfade (opacity transition) to a static last-frame image.
Phase 3 — Static image breathes: `scale: 1 → 1.02 → 1` + subtle opacity pulse on a 7s loop.

The site feels alive continuously, even after the video ends.

*Key detail:* Capture the last frame as a static image asset. Don't rely on the
video's frozen last frame — some browsers show a black frame, others show artifacts.
A real image guarantees a clean transition.

---

**Recipe 13 — Live ROI Calculator**

`useMotionValue`-driven output display. User types a number (ticket size, revenue, etc.)
and the output animates to the calculated result in real time. On scroll-into-view,
an animated placeholder counts 0 → default value (e.g., 15,000), previewing the
behavior before the user interacts. Placeholder hides when user starts typing.

*Key detail:* The animated placeholder demonstrates the interaction pattern before
the user touches anything. It answers the question "what does this do?" without
instructions.

---

**Recipe 14 — Constellation Pillar Markers**

Unique SVG icon per list item (not repeated generic icons). Each marker has two
states: idle (muted, standard scale) and active (1.3x scale + stacked drop-shadows
+ brighter strokes + center node pulse animation). Active state triggers via `useInView`.

*Key detail:* Each SVG must be genuinely different. Repeated icons defeat the purpose —
the visual variety is what makes each item feel considered and unique.

---

**Recipe 15 — Conditional CTA Reveal**

Form submit button only renders when all required fields have valid values.
Uses `AnimatePresence` for the entrance animation. Prevents empty-form submissions
and creates a micro-reward moment when the button materializes.

*Key detail:* Validate on value, not on focus. A focused-but-empty field shouldn't
trigger the button. Check `field.value.length > 0` plus any format validation.

---

**Recipe 16 — Defined-Card Form**

The form lives inside a dark card container (`bg-[#0f0f0f]`, `border border-accent/25`,
`p-8 rounded-xl`). Not floating inputs on a bare background. The card boundary
defines the form's territory and gives it visual weight.

*Key detail:* The card must have enough internal padding (32px+) to prevent inputs
from touching the border. Cramped forms feel cheap regardless of animation quality.

---

**Recipe 17 — Isolated Cliffhanger**

Typography-only section between image-heavy content blocks. Large italic serif text,
a thin accent line (horizontal or vertical), generous vertical whitespace (120px+ padding).
Functions as a chapter break to prevent visual fatigue.

*Key detail:* No images, no cards, no icons in this section. The restraint IS the
design. It works because everything around it is visually dense. Contrast creates impact.

---

**Recipe 18 — Sticky Parallax Content (TFD-02)**

`useScroll` + `useTransform` drives scale and opacity on a sticky-positioned image
while overlay text content translates upward on scroll. Creates an editorial,
magazine-style reveal pattern where content slides over/alongside the image.

*Key detail:* The sticky element needs a tall scroll container (200vh+) to give the
parallax effect enough scroll runway. Short containers make the effect feel rushed.

---

**Recipe 19 — ClipPath Wipe (TFD-03)**

Image reveal using `clipPath: inset(0 100% 0 0)` animating to `inset(0 0% 0 0)`,
driven by scroll progress. The image is revealed as a horizontal wipe from left to right.

*Key detail:* The image must be fully loaded before the wipe begins. Use `onLoad`
to gate the animation, or the wipe reveals a loading placeholder instead of the image.

---

**Recipe 20 — Text Shimmer**

CSS `background-image: linear-gradient` with `background-clip: text` and
`-webkit-text-fill-color: transparent`. Animate `background-position` to create
a shimmering highlight that sweeps across the text.

*Key detail:* Set `background-size: 200% 100%` and animate position from `100%` to
`-100%`. Single-width backgrounds produce a hard edge instead of a smooth shimmer.

---

**Recipe 21 — ClipPath Intro Reveal (TFD-07)**

Page entrance ceremony. A percentage counter animates upward (0% → 100%), then the
full page content is revealed via `clipPath: inset(0 0 100% 0)` → `inset(0)`.
The counter frame fades out as the real content clips in.

*Key detail:* The intro reveal must be skippable (click/tap to skip). Users returning
to the site don't want to watch the ceremony every time. Store a session flag.

---

**Recipe 22 — Glassmorphism Card (Two-Zone)**

**v5.0 — proven in Summit Air Process + Reviews sections.**

Premium card with two distinct zones separated by a thin divider line:
- **Header zone**: Tinted with the card's accent color at ~6-10% opacity. Contains
  the card's identity elements (number badge, icon, category tag, rating).
- **Content zone**: Clean white/neutral. Contains description text, feature pills,
  attribution, CTAs.

```tsx
// The glassmorphism base
style={{
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  boxShadow: `
    0px 0px 0px 1px rgba(255,255,255,0.8),
    0px 0px 0px 1px ${accent}10,
    0px 1px 2px 0px rgba(0,0,0,0.04),
    0px 4px 12px -2px rgba(0,0,0,0.06),
    0px 12px 36px -4px rgba(0,0,0,0.08)
  `,
}}

// Header zone tint
style={{
  background: `linear-gradient(135deg, ${accent}0A 0%, ${accent}04 100%)`,
}}

// Divider between zones
<div className="h-px" style={{ background: `${accent}15` }} />

// Bottom accent bar (animated)
<motion.div
  className="h-[3px] w-full origin-left"
  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}30)` }}
  initial={{ scaleX: 0 }}
  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
  transition={{ ...SPRING_SLOW, delay: 0.3 }}
/>

// Hover glow ring
<div
  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
             transition-opacity duration-500 group-hover:opacity-100"
  style={{ boxShadow: `0 0 30px ${accent}15, 0 0 60px ${accent}08` }}
  aria-hidden="true"
/>
```

**Layer system (5 layers, bottom to top):**
1. Multi-layer box-shadow (depth without borders)
2. Frosted glass background (`rgba(255,255,255,0.7)` + `backdrop-filter: blur(20px)`)
3. Accent-tinted header zone
4. Content with feature pills and animated elements
5. Hover glow ring (opacity 0 → 1 on hover)

**Supporting elements:**
- Ghost numbers: 10rem accent-colored text at 6% opacity, absolute-positioned behind header
- Feature pills: Small rounded tags with accent dot + label, staggered entrance
- Pulsing dot: `animate-pulse` on status/detail indicators
- Avatar circles: Accent-tinted circle with initial letter
- Bottom accent bar: `scaleX: 0 → 1` with `origin-left`, accent gradient

*Key detail:* The multi-layer box-shadow is critical. A single `box-shadow` looks flat.
The 5-layer stack (white ring, accent ring, close shadow, medium shadow, far shadow)
creates the frosted-glass-floating-above-surface illusion. Remove any layer and
the effect collapses.

*⚠️ v6 warning — brand-palette discipline for per-card accents:* If the project has
a strict brand palette (e.g., navy/yellow/red), use ONLY palette colors as per-card
accents. Off-palette decorative colors (green, purple, blue when not in palette)
look fine in isolation but accumulate visually and undermine brand cohesion.
Audit `lib/data.ts` accent values against the brand palette BEFORE rendering.
The Bunns build had blue, orange, green, and purple accents sneaking into Services
and Reviews because each looked fine alone — caught only via Chrome MCP visual
inspection of all cards together. See TP-15.

---

**Recipe 23 — Photography Service Card**

**v5.0 — proven in Summit Air Services section.**

Full-bleed photography card with dark gradient overlay and text pinned to the bottom.
Each card uses a unique cinematic photograph as the background (Next.js `<Image fill />`).

```tsx
// Image with hover zoom
<Image
  src={service.image}
  alt={service.title}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover transition-transform duration-700 group-hover:scale-105"
/>

// Dark gradient overlay (bottom-heavy for text readability)
style={{
  background: `linear-gradient(
    to top,
    rgba(0,0,0,0.85) 0%,
    rgba(0,0,0,0.5) 40%,
    rgba(0,0,0,0.15) 70%,
    rgba(0,0,0,0.05) 100%
  )`,
}}

// Accent color tint on hover
<div
  className="absolute inset-0 opacity-0 transition-opacity duration-500
             group-hover:opacity-100"
  style={{
    background: `linear-gradient(135deg, ${accent}25 0%, transparent 60%)`,
  }}
  aria-hidden="true"
/>
```

**Content stack (bottom-pinned):**
1. Category tag pill (accent-colored, backdrop-blurred)
2. Title (Bebas Neue or headline font, white)
3. Description (body font, white at 85%, opacity increases on hover)
4. CTA link with arrow (accent color, gap widens on hover)
5. Bottom accent line (`scaleX: 0 → 1` on viewport entry)

**Directional viewport entries:**
- Even-indexed cards enter from left (`x: -40`)
- Odd-indexed cards enter from right (`x: 40`)
- Last-row cards enter from bottom (`y: 40`)
- All include `blur(6px)` → `blur(0px)`

*Key detail:* The gradient overlay must be bottom-heavy (85% opacity at bottom,
5% at top). Text lives at the bottom of the card. If you distribute the gradient
evenly, the top of the image is too dark and the bottom text area isn't dark enough.
The gradient exists to serve the text, not the image.

---

**Recipe 24 — Split Layout (Media | Content)**

**v5.0 — proven in Summit Air Service Areas section.**

Two-column layout that separates a media-heavy element (video, map, image) from
text content. Solves the readability problem that occurs when text overlays busy
backgrounds. On mobile, stacks vertically (media on top, content below).

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:min-h-[700px]">
  {/* Left — Media (video/image) */}
  <div className="relative h-[300px] md:h-auto overflow-hidden">
    <div className="absolute inset-0">
      <video autoPlay muted loop playsInline
        className="h-full w-full object-cover">
        <source src="/video/aerial.mp4" type="video/mp4" />
      </video>
    </div>

    {/* Edge gradient — blends media into content panel */}
    <div className="absolute inset-0 hidden md:block"
      style={{
        background: "linear-gradient(to right, transparent 60%, #0F2035 100%)",
      }}
    />
    {/* Bottom gradient on mobile */}
    <div className="absolute inset-0 md:hidden"
      style={{
        background: "linear-gradient(to bottom, transparent 50%, #0F2035 100%)",
      }}
    />

    {/* Overlay stats (pinned bottom-left) */}
    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
      {/* Counter stats, location badge, etc. */}
    </div>
  </div>

  {/* Right — Content */}
  <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20">
    {/* Section header, content, CTA */}
  </div>
</div>
```

**Edge gradient system (critical for the split effect):**
- Desktop: `linear-gradient(to right, transparent 60%, [bg-color] 100%)` — blends
  the right edge of the media into the content panel background
- Mobile: `linear-gradient(to bottom, transparent 50%, [bg-color] 100%)` — blends
  the bottom of the media into the content below

The gradient color must EXACTLY match the content panel's background color.
Mismatched colors create a visible seam.

*Key detail:* The media column has no fixed height on desktop (`md:h-auto`) — it
stretches to match the content column. On mobile, set an explicit height (`h-[300px]`)
so the media doesn't collapse to zero or expand too tall. The 300px mobile height
provides enough visual context without pushing content below the fold.

---

**Recipe 25 — Area Tag Cloud**

**v5.0 — proven in Summit Air Service Areas section.**

Flexbox-wrapped grid of location/tag pills. One tag is highlighted as "primary"
(headquarters, main office, etc.) with accent color treatment and a pulsing icon.

```tsx
// Standard tag
<div className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2"
  style={{
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
  }}>
  <span className="h-1.5 w-1.5 shrink-0 rounded-full"
    style={{ background: "rgba(77,168,218,0.4)" }} />
  <span style={{
    fontFamily: "var(--font-heading)",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
  }}>
    {name.toUpperCase()}
  </span>
</div>

// Primary tag (highlighted)
style={{
  background: "rgba(77,168,218,0.15)",
  border: "1px solid rgba(77,168,218,0.35)",
  boxShadow: "0 4px 20px rgba(77,168,218,0.12)",
}}
// With pulsing MapPin icon and "HQ" badge
```

**Stagger pattern:** Each tag enters with `delay: 0.2 + index * 0.03` — fast enough
to feel like a cascade, slow enough to be perceptible. With 24 tags, the full cascade
takes ~0.9s.

*Key detail:* Use `rounded-lg` (8px), not `rounded-full`. Full-round pills look like
buttons and suggest clickability. Slightly-rounded rectangles read as labels/tags.

---

**Recipe 26 — Featured + Grid Review Layout**

**v5.0 — proven in Summit Air Reviews section.**

One large featured review card (full width) followed by a 3-column grid of smaller
review cards. The featured card gets extra visual weight: larger quote text, prominent
highlight stat pill, wider padding.

**Featured card specifics:**
- Two-zone glassmorphism (Recipe 22)
- Large Quote icon (40px, 20% opacity, flipped with `scaleX(-1)`)
- "Featured Review" label with stars
- Highlight stat pill: pulsing accent dot + uppercase label (e.g., "40% ENERGY SAVINGS")
- Quote text at 2xl/2xl (larger than small cards)
- Full-width bottom accent bar

**Small card specifics:**
- Same glassmorphism treatment as featured, but at smaller scale
- Per-card accent color + category tag (must be brand-palette compliant — see TP-15)
- Directional viewport entries: left card from left, center from bottom, right from right
- Quote icon at 20px, flipped
- **Stars always render in brand-yellow for cohesion** (added v6 — chaotic per-card star colors look accidental)

*Key detail:* The featured card must be visually dominant — at least 2x the vertical
height of the small cards. If they're too similar in size, the hierarchy collapses and
the featured review loses its emphasis. The size differential IS the hierarchy.

---

**Recipe 27 — Nav State Manager (Video Hero)**

**v5.0 — proven in Summit Air Hero + Nav.**

When the hero uses a video or dark background, the nav must adapt as the user scrolls
past the hero into lighter content sections.

```tsx
// Over hero (not scrolled): dark gradient fading to transparent, white text
background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%,
  rgba(0,0,0,0.25) 60%, transparent 100%)",
color: "#fff",

// Scrolled past hero: frosted white glass, dark text
background: "rgba(250,252,255,0.92)",
backdropFilter: "blur(12px)",
color: "var(--foreground)",
```

**Link colors must also swap:**
- Over hero: `rgba(255,255,255,0.85)` with hover to `#fff`
- Scrolled: `var(--muted)` with hover to `var(--foreground)`

*Key detail:* The un-scrolled nav needs its OWN dark gradient background
(`rgba(0,0,0,0.5)` → transparent), not just white text. Without the gradient,
white text over bright parts of the video becomes unreadable. The gradient is
a readability safety net that doesn't obscure the video.

---

**Recipe 28 — Looping Background Video**

**v5.0 — proven in Summit Air Hero + Service Areas.**

Background video that loops seamlessly. Used for hero sections and media panels
in split layouts.

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="h-full w-full object-cover"
  style={{ opacity: 0.9 }}
>
  <source src="/video/background.mp4" type="video/mp4" />
</video>

// Overlay gradient (neutral, not colored)
<div className="absolute inset-0" style={{
  background: "linear-gradient(165deg,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.1) 50%,
    rgba(0,0,0,0.25) 100%
  )",
}} />
```

**Video opacity rules:**
- Hero video: 0.85-0.95 (the video IS the background — let it breathe)
- Split layout media: 1.0 (no opacity reduction — edge gradient handles blending)
- Overlay: neutral black only, never colored. Colored overlays wash out the video.

**Required attributes:** `autoPlay muted loop playsInline` — all four are mandatory.
Missing `playsInline` breaks iOS. Missing `muted` blocks autoplay on all browsers.

*Key detail:* Do NOT use colored overlays (navy, blue, brand color) on video.
They wash out the video and make everything look tinted. The overlay exists only
for text contrast — use neutral black at low opacity. If the video looks "too blue"
or "too [color]", the overlay color is wrong.

---

**Recipe 29 — Color-Blocked Brutalist Card** ⭐ NEW in v6

**Proven in Bunns HVAC Process section.** The user called this pattern "fucking gas"
on first sight — that's the single strongest taste signal in the project's history,
making this a proven recipe worthy of standalone status.

Bold brutalist card with color-block theme rotation. Five-card sequence (or any
multiple) cycles through theme variants for visual rhythm. Each card combines
oversized typography, theme-tinted icon tile, top tag bar with index counter,
and animated bottom accent bar. The opposite aesthetic from glassmorphism (R22)
or photography cards (R23) — confident, blocky, deliberately unsubtle.

**Theme rotation system:**

```tsx
type Theme = "navy" | "cream" | "yellow" | "red";

const themeStyles: Record<Theme, {
  bg: string; fg: string; accent: string; accentSoft: string;
  numberColor: string; iconColor: string; border: string;
}> = {
  navy: {
    bg: "var(--brand-navy)",
    fg: "#ffffff",
    accent: "var(--brand-yellow)",
    accentSoft: "rgba(240, 223, 37, 0.18)",
    numberColor: "var(--brand-yellow)",
    iconColor: "var(--brand-yellow)",
    border: "rgba(240, 223, 37, 0.22)",
  },
  cream: {
    bg: "var(--brand-cream)",
    fg: "var(--brand-navy)",
    accent: "var(--brand-navy)",
    accentSoft: "rgba(1, 5, 40, 0.10)",
    numberColor: "var(--brand-navy)",
    iconColor: "var(--brand-navy)",
    border: "rgba(1, 5, 40, 0.12)",
  },
  yellow: {
    bg: "var(--brand-yellow)",
    fg: "var(--brand-navy)",
    accent: "var(--brand-navy)",
    accentSoft: "rgba(1, 5, 40, 0.12)",
    numberColor: "var(--brand-navy)",
    iconColor: "var(--brand-navy)",
    border: "rgba(1, 5, 40, 0.18)",
  },
  red: {
    bg: "var(--brand-red)",
    fg: "#ffffff",
    accent: "var(--brand-yellow)",
    accentSoft: "rgba(255, 255, 255, 0.18)",
    numberColor: "#ffffff",
    iconColor: "var(--brand-yellow)",
    border: "rgba(255, 255, 255, 0.25)",
  },
};
```

**Card structure (top to bottom):**

1. **Top tag bar** (border-bottom, 4-5px tall):
   - Left: tag chip — colored dot + "STEP · [TAG]" or "STAT · [TAG]" in theme accent color
   - Right: index counter — "01 of 04" or "1 of 5" in muted theme foreground
2. **Body** (grid layout):
   - Left: Massive numeral (120-200px on desktop, 56-96px in compact/supporting form)
     in theme.numberColor
   - Center: Icon-in-tile — 64-80px squared, theme.accentSoft background, theme.iconColor
     icon, 1.5px theme.border outline
   - Right: Title (display font, theme.fg) + body copy (serif, theme.fg at 85% opacity)
3. **Bottom accent bar** — animated `scaleX: 0 → 1`, theme.accent color, full-width

**Subtle texture overlay on dark themes (navy, red):**

```tsx
{(theme === "navy" || theme === "red") && (
  <div
    className="pointer-events-none absolute inset-0 opacity-30"
    aria-hidden="true"
    style={{
      background:
        "radial-gradient(ellipse at top right, rgba(255,255,255,0.14) 0%, transparent 60%)",
    }}
  />
)}
```

**Editorial offset rhythm (desktop only):**

Alternate cards nudge horizontally for visual rhythm: `i % 2 === 0 ? "" : "md:ml-12 lg:ml-20"`.
Combined with directional entries (cards 1+2 from left, 3+4 from right per DAC-15).

**Two scale variants:**

| Variant | Use Case | Numeral Size | Card Height |
|---|---|---|---|
| **Main content** (Process steps) | Anchor section, primary user journey | 120-200px | 400-500px tall |
| **Supporting strip** (Stats, trust signals) | Secondary content, trust signals | 44-52px | ~200-240px tall |

**⚠️ Critical — apply TP-16 (scale to section role):** Do NOT use main-content scale
for supporting content. The Bunns Stats section took 3 iterations because the same
DNA was used at Process scale in a stat-strip context. Stats should use the supporting
variant (4-col single row, ~52px numerals, ~200px tall cards). Process should use
the main variant.

**Mobile behavior:**
- Main variant: vertical stack, full-width cards, scaled-down numerals (80-100px)
- Supporting variant: 1-col on mobile, 2-col on small tablet (sm:), 4-col on desktop (lg:)

*Key detail:* The theme rotation is what makes this recipe sing. A single-color
version of these cards looks flat and corporate. The navy/cream/yellow/red rotation
provides visual rhythm and gives each card its own identity within a unified system.
If your project doesn't have at least 3 brand-palette colors, this recipe doesn't fit.

*Key detail #2:* The icon-in-tile MUST be theme-tinted, not white-on-color or
black-on-color. The theme.accentSoft background + theme.iconColor icon creates
cohesion — generic white icons on color blocks look stamped on.

---

### 2.6 Design Audit Checklist (DAC)

16 rules proven during production builds. Each one exists because its absence
caused a visible problem that required a design pass to fix.

| ID | Rule | Detail |
|---|---|---|
| DAC-01 | Break visual fatigue | Insert typography-only breath beats (Recipe 17) between image-heavy or card-heavy sections. Three dense sections in a row causes scroll fatigue. |
| DAC-02 | No hover glow on passive text | Hover effects (glow, scale, color shift) ONLY on clickable/interactive elements. Glowing non-interactive text trains the user to click things that don't respond. |
| DAC-04 | No invisible gradients | Don't render CSS gradients between identical or near-identical colors. It's invisible DOM noise. Delete it. |
| DAC-05 | Rhythm breaker required | Every page needs at least one section that breaks the visual pattern — asymmetric layout, different density, unexpected whitespace. Uniform rhythm is monotonous. |
| DAC-07 | Inline element line-height | Inline animated elements (cycling words, animated spans) must inherit the parent's `line-height`. Otherwise they measure their own height differently and cause false line wraps. |
| DAC-08 | Minimum dark-bg type size | Minimum 16px body text on dark backgrounds. 18px+ for supporting paragraphs in marketing sections. Small text on dark backgrounds is unreadable. Restraint does not mean small. |
| DAC-09 | Static ambient accents allowed | Static accent decoration (persistent glow, always-visible underline) inside interactive zones IS permitted. This is different from DAC-02: static decoration is not a hover effect. |
| DAC-10 | Clarity beats artistry | On sales/pitching pages, use practical layouts (grid, timeline, card stack) and animate them richly — rather than an artsy layout that confuses the user about what to read next. |
| DAC-11 | Animate traditional layouts | Practical layout + rich animation = optimal for decision-makers. Don't abandon grids and cards. Animate them. The animation is the differentiator, not the layout. |
| DAC-12 | Test at narrowest width | Audit at 375px, not 1440px. If it works at 375px, it works everywhere. Run overflow checks before every commit. |
| DAC-13 | 3-of-4 motion rule | At least 3 of the 4 motion categories (triggered, ambient, cursor-responsive, scroll-linked) must be active at any scroll position. See Section 2.1. |
| DAC-14 | Separate media from text when readability suffers | If text over a busy background (aerial photo, detailed image, video) has poor readability even with overlays, use a split layout (Recipe 24) instead of fighting the overlay. Readability always wins over visual density. |
| DAC-15 | Directional entries must vary by position | Cards in a grid should not all enter from the same direction. Alternate left/right/bottom based on grid position. Uniform direction looks robotic. Varied direction looks choreographed. |
| **DAC-16** ⭐ NEW v6 | **Scale to section role** | A card pattern that works at hero/main-content scale doesn't work at supporting-strip scale. Always ask "what is this element's role in the section's hierarchy?" before sizing. Decoration < anchor < main content. The Bunns Stats section needed three iterations because the Process card DNA (loved at Process scale) was applied at Process card size in a supporting-strip context. Same DNA, wrong size = wrong design. See OP-04, TP-16, Recipe 29 sub-section "Two scale variants." |

### 2.7 Section Pattern Library

Proven narrative arcs. The project picks one at kickoff, or invents a new one.
Hero is always first. CTA/application is always last.
Everything between is chosen per project.

| Pattern | Sections | Flow Logic | Status |
|---|---|---|---|
| **Show-Frame-Prove-Act** | 7 | Hero → credentials → process → proof → math → urgency → CTA | Proven (King Maker) |
| **Direct Trust** | 3 | Hero → proof/portfolio → CTA | Proven (Baker Roofing) |
| **Full Service** | 9 | Hero → services → trust → before/after → process → video → reviews → areas → CTA | Proven (Peak Roofing) |
| **Local Authority** | 9 | Hero → services → trust bar → process → reviews → service areas → CTA → footer | Proven (Summit Air HVAC, Bunns HVAC) |
| **Storyteller** | 5-6 | Hero → origin story → problem → solution → social proof → CTA | Available |
| **Ladder** | 4-5 | Hero → tier comparison → middle-tier deep-dive → premium reveal → CTA | Available |
| **Magazine** | 6-8 | Hero → editorial scroll → sticky parallax feature → stats → testimonial marquee → team → CTA | Available |
| **Single Product** | 4-5 | Hero → product deep-dive → specs/features → reviews → CTA | Available |

These are starting points. Combine patterns, add sections, remove sections.
The pattern gives you a narrative backbone — adapt it to the project.

### 2.8 Component Variant Library

Multiple proven implementations per component type. Choose per project.
Do not default to the same variant every time — that produces cookie-cutter sites.

| Component | Variant A | Variant B | Variant C | Variant D | Variant E |
|---|---|---|---|---|---|
| **Hero** | Video background | Animated gradient | Static atmospheric still | 3D scene / WebGL | — |
| **Stat block** | 3-card grid | Asymmetric editorial | Horizontal scroll | Inline counters in text | **Color-blocked compact strip (R29 supporting)** ⭐ |
| **Process** | Vertical timeline + scrub line | 2x2 glassmorphism grid (R22) | Step accordion | Pinned sticky scroll | **Color-blocked brutalist (R29 main)** ⭐ |
| **Cards** | Icon-top centered | Photography full-bleed (R23) | Glassmorphism two-zone (R22) | 3D-tilt interactive | **Color-blocked brutalist (R29)** ⭐ NEW v6 |
| **Testimonial** | Featured + grid (R26) | Auto-scroll marquee | Sticky-scroll single | Hero quote full-bleed | — |
| **Service Areas** | Split layout + tag cloud (R24+R25) | Map with markers | Full-width tag grid | Interactive map embed | — |
| **CTA** | Single-screen form card | Multi-step wizard | Calendly/booking embed | Phone-only with click-to-call | — |
| **Headline** | TypeInHeading (word-split) | CharLine (per-letter typewriter) | Character stagger (random) | Static with AnimatedUnderline | — |
| **Gallery** | Grid with clipPath wipe | Lightbox | Before/after slider | Sticky parallax | — |
| **Nav** | Frosted glass (scrolled) + transparent (hero) | Always frosted | Minimal (logo + CTA only) | Hamburger mobile-first | — |

### 2.9 Typography Pairing Library

Curated starting points. Any project can pick fonts not on this list.
The pairing sets the emotional tone before a single word is read.

| Pair | Vibe | Best For |
|---|---|---|
| Bodoni Moda + EB Garamond | Heritage luxury | Premium services, old-money brands, law firms |
| Cinzel + Crimson Text | Royal heraldic | Theatrical, high-ceremony, event companies |
| Tenor Sans + Inter Tight | Modern editorial | Tech-forward, hedge funds, SaaS |
| Bebas Neue + Lora | Industrial trustworthy | Blue-collar premium, contractors, trades |
| Anton + Source Sans 3 | Bold energy | Fitness, e-commerce, high-energy brands |
| Cormorant + Public Sans | Contemporary classical | Hospitality, lifestyle, boutique brands |
| Space Grotesk + DM Sans | Clean tech | Developer tools, startups, fintech |
| Playfair Display + Raleway | Elegant editorial | Fashion, beauty, luxury retail |
| Anton + Inter + Lora | Brutalist trustworthy | HVAC, contractors, heavy local trades (Bunns build) |

These are not locks. They are conversation starters.
The right font for the project might not be on this list.

### 2.10 Reference-Site Modernization Workflow

Formalized process for when a client says "I like this site, make mine feel like that."

```
Step 0: CRAWL THE REFERENCE SITE YOURSELF (NEW in v6)
  - If Firecrawl MCP available → use firecrawl_scrape on the URL
  - Else if Chrome MCP available → use navigate + read_page / get_page_text
  - Else if WebFetch available → use it as fallback
  - DO NOT ask the user to describe a site you can read directly
  - Asking is wasted turns when the tool exists

Step 1: RECEIVE REFERENCE URL
  - Document the reference site's brand DNA (from Step 0 crawl)
  - Note what the client likes about it (motion? layout? color? vibe?)
  - Note what they want different

Step 2: EXTRACT BRAND IDENTITY
  - Colors (primary, secondary, accent, neutrals, background)
  - Fonts (headings, body, accent)
  - Voice and tone (formal? casual? technical? warm?)
  - Services, geography, key proof points
  - Logo assets, brand guidelines if available

Step 3: PICK SECTION PATTERN
  - Choose from Section Pattern Library (2.7)
  - Or invent a new pattern based on the reference site's structure
  - Map the client's content to the chosen pattern

Step 4: APPLY MOTION RECIPES
  - Select recipes from 2.5 that serve the content
  - Layer in the fluidity DNA (DAC-13: 3-of-4 motion categories)
  - Ensure every section has entrance animation + ambient motion

Step 5: BUILD WITH CLIENT'S BRAND
  - Their colors, their fonts, their voice
  - Our motion architecture, our engineering rules, our animation system
  - The result looks like THEM but moves like US

Step 6: VERIFY (3-layer stack per Section 1.5)
  - Layer 1: Chrome MCP visual preflight (VC-00) — open every section, screenshot, look
  - Layer 2: Playwright FULL capabilities — assertions, video, traces
  - Layer 3: axe-core accessibility audit
  - Both viewports (desktop 1440x900 + mobile 390x844)
  - Performance budget check

Step 7: DEPLOY + VC-11 POST-DEPLOY VISUAL CONFIRM
  - Deploy via Vercel or chosen platform
  - Navigate to production URL via Chrome MCP
  - Screenshot the changes
  - Confirm visible to a real user
```

### 2.11 21st.dev Approved Imports

Patterns evaluated and approved from 21st.dev (April 2026 audit).
Use as references. Adapt to project. Never copy verbatim — compose with existing recipes.

| ID | Pattern | Recipe Cross-Reference | Notes |
|---|---|---|---|
| TFD-01 | Cycling word swap (AnimatePresence) | Recipe 11 | Used in WhyNow-style headlines |
| TFD-02 | Sticky parallax content (useScroll + useTransform) | Recipe 18 | Editorial reveal pattern |
| TFD-03 | ClipPath horizontal wipe (scroll-driven) | Recipe 19 | Image reveal technique |
| TFD-04 | Multi-layer parallax (GSAP ScrollTrigger + clipPath polygon) | — | Complex scene composition |
| TFD-05 | 3D tilt card (useMotionValue + useSpring + cursor glare) | Recipe 10 (layer c) | Interactive card enhancement |
| TFD-06 | Text shimmer (CSS gradient animation) | Recipe 20 | Loading/emphasis idiom |
| TFD-07 | ClipPath intro reveal (counter → page unveil) | Recipe 21 | Page entrance ceremony |

### 2.12 AI Asset Generation Strategy

**v5.0 — proven in Summit Air HVAC build using Higgsfield AI (Cinema Studio, Kling, Nano Banana). Reaffirmed in Bunns HVAC build.**

Images and video are not optional decoration — they are structural components that
elevate a site from template to premium. Claude has creative freedom to generate
and place visual assets wherever they improve the design, using AI generation tools
when available.

---

**Core Principle: Images are a design decision, not a user task.**

Claude should proactively identify where images and video would improve the site
and generate them — the user should not need to say "add images." If a services
section would benefit from photography cards (Recipe 23) instead of icon cards,
Claude should make that call and generate the assets. If a hero section needs
a video, Claude should generate one. This is part of the design process, not a
separate step.

---

**When to generate images (proactive placement):**

| Context | Action |
|---|---|
| **Hero section** | Always generate a video (TP-13) or atmospheric still. Never leave blank. |
| **Services section** | If using photography cards (R23), generate one cinematic photo per service. Each image should be specific to the service, not generic. "AC Installation" gets a photo of a modern AC unit being installed, not a stock photo of a wrench. |
| **About / Trust section** | Generate team or workspace photography if no real assets exist. Professional, authentic feel — not stock-photo sterile. |
| **Service Areas / Location** | Generate aerial/cityscape of the service area. Can be still or video (Kling image-to-video). |
| **Reviews / Testimonials** | Usually NO generated images. Avatar initials (Recipe 22) or real customer photos. Fake headshots break trust. |
| **Process / How It Works** | Usually NO generated images. Color-blocked brutalist cards (R29) or glassmorphism cards (R22) with icons work better. Process sections are about clarity, not photography. |
| **CTA section** | Optional — a subtle background image or gradient. Don't let imagery compete with the form. |

---

**When copying / modernizing an existing site:**

This is the critical workflow. When the user says "take this site and modernize it,"
Claude handles images with this priority order:

```
Priority 1 — REGENERATE MATCHING IMAGES
  If the reference site has images in specific locations (hero, services,
  about section, gallery), generate NEW images that match the intent and
  subject matter of the originals. Don't copy the exact image — generate
  a fresh version that fits the same context.

  Example: Reference site has a photo of roofers working on a shingle roof.
  → Generate a new cinematic photo of roofers working on a shingle roof,
    but with better composition, lighting, and mood.

Priority 2 — GENERATE CONTEXTUAL IMAGES
  If regenerating a close match isn't possible (e.g., the original image
  is very specific or the generation model can't match it), generate an
  image that makes sense for that position based on the surrounding content.

  Example: Reference site has a very specific before/after photo pair.
  → Generate a general "completed project" photo that conveys quality
    craftsmanship in the same trade.

Priority 3 — USE PLACEHOLDER WITH NOTE
  If no generation tool is available, place a sized placeholder div with
  a comment noting what image should go there, and tell the user what's
  needed in the build brief handoff.

  Example: <!-- NEEDS: Professional photo of team, 1200x800, WebP -->
```

---

**Generation tool selection:**

| Asset Type | Recommended Model | Notes |
|---|---|---|
| Cinematic photography (stills) | Cinema Studio 2.5 or equivalent | Best for service cards, hero stills, team photos |
| Hero background video | Cinema Studio 3.0 or equivalent | 5-10 second loops, cinematic, industry-specific |
| Image-to-video (animate a still) | Kling 3.0 or equivalent | Use when a generated still would benefit from subtle motion |
| Quick concept images | Nano Banana Pro or equivalent | Fast generation for exploration, lower quality |

**Prompt engineering for AI-generated assets:**

Write prompts that are specific to the industry, cinematic in tone, and describe
the final composition — not just the subject. Include lighting, mood, angle, and
context.

```
❌ Bad:  "HVAC technician"
✅ Good: "Professional HVAC technician installing a modern white air conditioning
         unit on the side of a contemporary suburban home, golden hour lighting,
         shot from a low angle, shallow depth of field, clean professional look,
         cinematic photography style"

❌ Bad:  "Charlotte skyline"
✅ Good: "Aerial drone shot of Charlotte NC skyline at dusk, city lights beginning
         to glow, Bank of America Stadium visible, warm golden sky fading to deep
         blue, shot from 500ft altitude looking toward Uptown, cinematic 4K quality"
```

---

**Image format and optimization:**

All generated images must be compressed before use:
- Convert to WebP (quality 80) for stills
- Convert to H.264 MP4 (CRF 28) for video
- Verify against asset compression standards (Section 1.7)
- Use Next.js `<Image>` component with proper `sizes` attribute for responsive loading

---

**Creative freedom boundary:**

Claude has full creative freedom to decide WHERE images go and WHAT they depict,
as long as:
1. The images serve the content (not decoration for decoration's sake)
2. They meet the compression standards (Section 1.7)
3. They don't generate fake human faces for testimonials/reviews (breaks trust)
4. They match the project's industry, tone, and color palette
5. The build brief (Section 3.3) lists all generated assets so the user sees
   what was created before the build is finalized

The user should NOT need to micromanage image generation. Claude makes the creative
call, generates the assets, integrates them into the build, and presents the
complete result. If the user doesn't like a specific image, they can request
a regeneration — but the default is that Claude handles it end to end.

---

## Part 3 — QUICK-START BUILDER

**v5.0 — the vague-input-to-built-site workflow.**

This is the system for turning minimal client inputs into a complete build.
When the user provides only a few pieces of information, Claude infers the rest
using industry knowledge, the doctrine's recipe library, and proven patterns.

---

### 3.1 Required Inputs (The Minimum)

The user provides AT MINIMUM these four things. Everything else is inferred.

```
1. COMPANY TYPE     — What industry? (e.g., "roofing company", "HVAC", "plumber",
                       "electrician", "landscaper", "law firm", "restaurant")

2. LOCATION         — Where? (e.g., "Charlotte, NC", "Austin, TX", "Denver, CO")

3. SERVICE AREAS    — Where do they serve? Can be as vague as "greater metro"
                       or as specific as a list of cities/neighborhoods.

4. COLOR SCHEME     — At minimum, one color. Can be a vibe ("navy and gold"),
                       a hex code, or a reference ("like their existing logo").
                       If not provided, Claude picks based on industry + location.
```

### 3.2 What Claude Infers (The Intelligence Layer)

From those 4 inputs, Claude fills in everything needed to build. This is the
value — the user doesn't need to know about font pairings, section patterns,
or motion recipes. Claude does.

**From COMPANY TYPE, Claude infers:**
- Typography pairing (from 2.9) based on industry vibe
- Section pattern (from 2.7) based on what the industry needs to prove
- Service list (common services for that trade)
- Trust signals (what matters to buyers in that industry)
- Review themes (what customers in that industry talk about)
- Process steps (how that type of company typically works)
- CTA type (phone call vs. form vs. booking)

**From LOCATION, Claude infers:**
- Local geography for service areas (nearby cities, suburbs, neighborhoods)
- Weather/climate context for service descriptions
- Regional language and tone (southern hospitality vs. NYC directness)
- Local proof points ("serving [area] since...")

**From SERVICE AREAS, Claude infers:**
- Number of area tags for the Service Areas section
- Primary/HQ location for highlighted tag
- Radius for counter stats
- Map or split-layout approach based on area count

**From COLOR SCHEME, Claude infers:**
- Full palette (primary, secondary, accent, neutral, background)
- Accent color for glows, underlines, counters, draws
- Dark mode treatment (how the color works on near-black backgrounds)
- Gradient pairs for overlays and backgrounds

### 3.3 The Confirmation Checkpoint

**CRITICAL — Claude does NOT start building immediately.**

After receiving the inputs, Claude presents a build brief back to the user
for confirmation. This is a structured summary of what Claude plans to build.

```markdown
## 🏗️ Build Brief — [Company Name]

### Brand Identity
- **Headline font:** [Choice] — [Why]
- **Body font:** [Choice] — [Why]
- **Palette:**
  - Primary: [hex] — [name]
  - Accent: [hex] — [name]
  - Background: [hex]
- **Voice:** [description]

### Section Architecture
Using the **[Pattern Name]** pattern:
1. Hero — [type: video/gradient/still] — "[headline concept]"
2. [Section] — [variant from Component Library]
3. [Section] — [variant]
4. ...
N. CTA — [type]

### Services (inferred)
1. [Service name] — [one-line desc]
2. [Service name] — [one-line desc]
...

### Service Areas ([count] locations)
[List of inferred cities/neighborhoods]
Primary: [HQ city]

### Motion Intensity
- Spring system: SPRING (0.55s) / SPRING_SLOW (0.7s)
- Blur enters: standard (4px)
- Stagger: 30-80ms per element
- Ambient: [subtle/moderate]

### Recipes Selected
- [Recipe #] — [Name] — [Where it's used]
- [Recipe #] — [Name] — [Where it's used]
...

### Taste Profile Applied (TP-01 through TP-18 in v6)
- TP-01: Typed-in headlines — ✅ / ⏭️ skipped (reason)
- TP-02: Selective underlines (multi-word, not single orphan word) — ✅ / ⏭️
- TP-03: Trust banner after hero — ✅ / ⏭️
- TP-04: Animated fine-line separators — ✅ / ⏭️
- TP-05: Counter numbers with stat underlines — ✅ / ⏭️
- TP-06: Directional card entrances — ✅ / ⏭️
- TP-07: Sacred stat sections (supporting scale only) — ✅ / ⏭️
- TP-08: Split layout for service areas — ✅ / ⏭️
- TP-09: Mobile-first verification — ✅ (always)
- TP-10: Featured + supporting reviews — ✅ / ⏭️
- TP-11: Per-card accent colors + tags (palette-compliant) — ✅ / ⏭️
- TP-12: Process visual connectors — ✅ / ⏭️
- TP-13: Video hero — ✅ / ⏭️ (reason)
- TP-14: Proactive image generation — ✅ / ⏭️ (reason)
- TP-15: Brand-palette discipline (NEW v6) — ✅ (always — non-negotiable for palette projects)
- TP-16: Scale to section role (NEW v6) — ✅ (always — supporting < anchor < main)
- TP-17: Pattern propagation from user signals (NEW v6) — ✅ (active throughout)
- TP-18: Mid-build skill audit (NEW v6) — ✅ (run at major iterations)
[For each skipped item, explain why — e.g., "reference site uses gradient hero"]

### Skill Invocation Plan (Section 0.0 Step 1 — Skill Invocation Gates)
- PRE-BUILD: brandkit ✅ / redesign-existing-projects ✅ / both ⏭️ (reason)
- DESIGN: design-taste-frontend ✅ / frontend-design ✅ / gpt-taste ✅
- POST-BUILD: design-motion-principles ✅ + impeccable ✅
- OPTIONAL: huashu-design (5-dim review) ✅ / ⏭️
- VERIFICATION: Chrome MCP preflight ✅ + Playwright full ✅ + axe-core ✅

### Generated Assets Plan
- Hero: [video / still / gradient] — "[prompt description]"
- Services: [count] images — [list subjects]
- Service Areas: [aerial still / video / map]
- Other: [any additional generated assets]
[If regenerating from a reference site, note which originals are being matched]

### Verification Stack (Section 1.5 — 3-layer)
- Chrome MCP visual preflight (VC-00): every section, both viewports
- Playwright FULL: video recording + traces + assertions + a11y
- Post-deploy visual confirm (VC-11): production URL after deploy

### Questions for You
- [Anything Claude is unsure about]
- [Any choice that could go either way]
```

**The user can:**
- ✅ Approve as-is → Claude builds
- 🔄 Adjust specific items → Claude updates and re-presents
- ❌ Reject the approach → Claude starts over with different assumptions

**Only after approval does the build begin.**

### 3.4 Industry Intelligence Database

Quick-reference for what Claude should infer per industry. Not exhaustive —
Claude uses general knowledge to fill gaps. This is the starting DNA.

---

**ROOFING**

| Element | Default |
|---|---|
| Font pairing | Bebas Neue + Lora (industrial trustworthy) |
| Section pattern | Full Service or Local Authority |
| Key services | Roof Replacement, Storm Damage Repair, Inspections, Gutters, Siding, Emergency Tarping |
| Trust signals | Licensed & insured, years in business, 5-star reviews, warranty length, jobs completed |
| Process steps | Inspection → Estimate → Installation → Final Walkthrough |
| CTA type | Form (name + phone + address + service) + phone number |
| Review themes | Speed, storm response, clean crew, fair pricing, warranty honored |
| Color tendency | Navy/slate + gold/amber accents (trust + premium) |
| Hero concept | Aerial drone shot of crew on roof, or completed roof beauty shot |

---

**HVAC**

| Element | Default |
|---|---|
| Font pairing | Anton + Inter + Lora (brutalist trustworthy — Bunns build) OR Bebas Neue + Lora |
| Section pattern | Local Authority (9 sections) |
| Key services | AC Installation, Heating Systems, Air Quality, Repairs, Maintenance, Warranties |
| Trust signals | 24/7 emergency, licensed technicians, same-day service, energy savings stats |
| Process steps | Free Consultation → Custom System Design → Expert Installation → Lifetime Support |
| Process card style | Color-blocked brutalist (R29) — proven in Bunns build |
| CTA type | Form (name + phone + service type + message) + 24/7 emergency phone card |
| Review themes | Emergency response time, energy bill reduction, clean install, honest pricing |
| Color tendency | Navy + yellow + red (Bunns palette) OR cool blue + white (clean air, trust) |
| Hero concept | Modern home exterior at dusk, AC condenser focus, or technician with homeowner |

---

**PLUMBING**

| Element | Default |
|---|---|
| Font pairing | Bebas Neue + Lora or Anton + Source Sans 3 |
| Section pattern | Local Authority or Full Service |
| Key services | Emergency Repairs, Drain Cleaning, Water Heaters, Repiping, Sewer Line, Fixture Install |
| Trust signals | No trip charge, upfront pricing, licensed + insured, same-day available |
| Process steps | Call → Diagnosis → Upfront Quote → Same-Day Repair |
| CTA type | Phone-first with form backup |
| Review themes | Fast arrival, honest diagnosis, no surprise charges, clean work |
| Color tendency | Blue/navy + green accents (water, trust, reliability) |

---

**ELECTRICAL**

| Element | Default |
|---|---|
| Font pairing | Space Grotesk + DM Sans or Bebas Neue + Lora |
| Section pattern | Local Authority |
| Key services | Panel Upgrades, Rewiring, EV Charger Install, Lighting, Generator Install, Code Compliance |
| Trust signals | Master electrician, code-compliant, insured, warranty |
| Process steps | Assessment → Custom Plan → Expert Install → Inspection & Certification |
| CTA type | Form + phone |
| Review themes | Safety, code compliance, clean wiring, professional crew |
| Color tendency | Yellow/amber + dark (energy, caution, warmth) |

---

**LANDSCAPING**

| Element | Default |
|---|---|
| Font pairing | Cormorant + Public Sans or Bebas Neue + Lora |
| Section pattern | Full Service or Magazine |
| Key services | Design & Install, Hardscaping, Irrigation, Lawn Care, Tree Service, Seasonal Cleanup |
| Trust signals | Portfolio/before-after, years in business, awards, design certifications |
| Process steps | Consultation → Design → Installation → Seasonal Maintenance |
| CTA type | Form (name + phone + project type + budget range) |
| Review themes | Design quality, transformation results, reliability, seasonal care |
| Color tendency | Green + earth tones (natural, organic, growth) |

---

**LAW FIRM**

| Element | Default |
|---|---|
| Font pairing | Bodoni Moda + EB Garamond (heritage luxury) |
| Section pattern | Show-Frame-Prove-Act or Storyteller |
| Key services | [Practice-area specific — personal injury, family law, criminal defense, etc.] |
| Trust signals | Years practicing, case results, bar memberships, peer reviews, settlements |
| Process steps | Free Consultation → Case Evaluation → Strategy → Representation |
| CTA type | Form (name + phone + case type + brief description) |
| Review themes | Outcome, communication, compassion, professionalism |
| Color tendency | Navy/charcoal + gold (authority, prestige, trust) |

---

### 3.5 Post-Build Handoff

After the build passes verification (Part 1.5), Claude delivers:

1. **Live dev server** running on localhost for the user to review
2. **Test report** — all Playwright tests passing (count + names) PLUS Chrome MCP visual preflight screenshots
3. **Asset manifest** — all images, videos, fonts with sizes
4. **Quick-change guide** — "To change X, edit Y in file Z"
5. **Production URL + post-deploy screenshots** (per VC-11) — confirmation the changes are live

---

## Part 4 — PROJECT KICKOFF TEMPLATE

For users who want to provide detailed specifications instead of using the
Quick-Start Builder (Part 3). Copy this section into each new project's
`CLAUDE.md` and fill it in.

---

```markdown
# [Project Name] — Build Brief

## Doctrine Version
- King Maker Motion Doctrine v6.0

## Brand Identity
- **Primary font (headlines):**
- **Secondary font (body):**
- **Accent font (optional):**
- **Palette:**
  - Primary:
  - Secondary:
  - Accent:
  - Neutral:
  - Background:
- **Voice/tone:**
- **Reference site:** (URL if modernizing, or "fresh build")
- **Brand assets:** (logo path, brand guide, etc.)

## Section Pattern
- **Pattern chosen:** [from Section Pattern Library, or custom]
- **Sections in order:**
  1. Hero — [type: video bg / gradient / still / 3D]
  2. [Section name]
  3. [Section name]
  4. ...
  N. CTA — [type: form card / multi-step / Calendly / phone]

## Hero Specification
- **Type:** video bg / animated gradient / static still / 3D scene
- **Video source:** (if applicable)
- **Headline animation:** TypeInHeading / CharLine / CharacterStagger / custom
- **Subtext treatment:**

## Motion Intensity
- **Spring default:** SPRING (0.55s) / SPRING_SLOW (0.7s) — or custom
- **Blur enters:** standard (4px) / heavy (6px) / subtle (2px)
- **Stagger default:** 30ms (fast) / 50ms (standard) / 80ms (dramatic)
- **Viewport trigger amount:** 0.3 (standard) / 0.1 (eager) / 0.5 (conservative)
- **Motion density:** standard / high (DAC-13 strictly enforced)
- **Ambient intensity:** subtle / moderate / dramatic

## Recipes in Use
List specific recipes from Part 2 that this project uses:
- [ ] Recipe 1 — useMotionValue Counter
- [ ] Recipe 2 — Perimeter Draw (Load)
- [ ] Recipe 3 — Perimeter Draw (Scrub)
- [ ] Recipe 4 — Mobile Auto-Trigger
- [ ] Recipe 5 — CharLine Typewriter
- [ ] Recipe 6 — TypeInHeading
- [ ] Recipe 7 — AnimatedUnderline (multi-word phrases only — see v6 warning)
- [ ] Recipe 8 — Scrub Vertical Line
- [ ] Recipe 9 — RandomCounter
- [ ] Recipe 10 — StatCard Interactive
- [ ] Recipe 11 — Cycling Word Swap
- [ ] Recipe 12 — Breathing Hero Video
- [ ] Recipe 13 — Live ROI Calculator
- [ ] Recipe 14 — Constellation Markers
- [ ] Recipe 15 — Conditional CTA Reveal
- [ ] Recipe 16 — Defined-Card Form
- [ ] Recipe 17 — Isolated Cliffhanger
- [ ] Recipe 18 — Sticky Parallax
- [ ] Recipe 19 — ClipPath Wipe
- [ ] Recipe 20 — Text Shimmer
- [ ] Recipe 21 — ClipPath Intro Reveal
- [ ] Recipe 22 — Glassmorphism Card (Two-Zone) — palette discipline required
- [ ] Recipe 23 — Photography Service Card
- [ ] Recipe 24 — Split Layout (Media | Content)
- [ ] Recipe 25 — Area Tag Cloud
- [ ] Recipe 26 — Featured + Grid Review Layout (yellow stars across all cards)
- [ ] Recipe 27 — Nav State Manager (Video Hero)
- [ ] Recipe 28 — Looping Background Video
- [ ] Recipe 29 — Color-Blocked Brutalist Card ⭐ NEW v6 (specify scale: main / supporting)

## Component Variants Selected
| Component | Chosen Variant |
|---|---|
| Hero | |
| Stat block | |
| Process | |
| Cards | |
| Testimonial | |
| Service Areas | |
| CTA | |
| Headline animation | |
| Nav | |

## Taste Profile Active (TP-01 through TP-18)
| TP | Active? | Notes |
|---|---|---|
| TP-01 Typed-in headlines | ✅ / ⏭️ | |
| TP-02 Selective underlines (multi-word) | ✅ / ⏭️ | |
| TP-03 Trust banner after hero | ✅ / ⏭️ | |
| TP-04 Animated fine-line separators | ✅ / ⏭️ | |
| TP-05 Counter numbers with stat underlines | ✅ / ⏭️ | |
| TP-06 Directional card entrances | ✅ / ⏭️ | |
| TP-07 Sacred stat sections (supporting scale) | ✅ / ⏭️ | |
| TP-08 Split layout for service areas | ✅ / ⏭️ | |
| TP-09 Mobile-first verification | ✅ (always) | |
| TP-10 Featured + supporting reviews | ✅ / ⏭️ | |
| TP-11 Per-card accents + tags (palette-compliant) | ✅ / ⏭️ | |
| TP-12 Process visual connectors | ✅ / ⏭️ | |
| TP-13 Video hero | ✅ / ⏭️ | |
| TP-14 Proactive image generation | ✅ / ⏭️ | |
| TP-15 Brand-palette discipline ⭐ v6 | ✅ (always for palette projects) | |
| TP-16 Scale to section role ⭐ v6 | ✅ (always) | |
| TP-17 Pattern propagation from user signals ⭐ v6 | ✅ (always active) | |
| TP-18 Mid-build skill audit ⭐ v6 | ✅ (run at major iterations) | |

## Operating Principles (always active — Section 0.3)
- OP-01 Vision for taste, assertions for correctness
- OP-02 Never build UI blind
- OP-03 Recognize inference vs. perception
- OP-04 Scale to section role
- OP-05 Trust user taste signals broadly
- OP-06 Brand-palette discipline
- OP-07 Audit tool/skill utilization mid-build

## Skill Invocation Plan (Section 0.0 Step 1 — non-negotiable gates)
- [ ] PRE-BUILD gate: brandkit OR redesign-existing-projects
- [ ] DESIGN gate: at least one of design-taste-frontend / frontend-design / gpt-taste
- [ ] BUILD: framer-motion plugin + gsap-* (as needed) + full-output-enforcement
- [ ] POST-BUILD gate: design-motion-principles AND impeccable
- [ ] OPTIONAL: huashu-design (5-dimension expert review)
- [ ] CODE QUALITY: simplify (post-changes review)

## Verification Stack (Section 1.5 — 3-layer)
- [ ] Layer 1 VISUAL: Chrome MCP preflight (VC-00) — every section, both viewports
- [ ] Layer 2 AUTOMATED: Playwright FULL (video + traces + assertions + a11y)
- [ ] Layer 3 ACCESSIBILITY: axe-core (0 critical, 0 serious)
- [ ] VC-11 POST-DEPLOY: navigate to production URL, screenshot, confirm visible

## Deviations from Doctrine
Document any rule overrides and the reasoning:
- (none, or list specific deviations)

## Verification Notes
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844
- Narrowest test width: 375px
- Target page weight:
- Special requirements:
```

---

## Part 5 — ANTI-PATTERN CATALOG (NEW in v6)

The doctrine has many "do this" rules. This section catalogs "I actually did
this wrong" — real failures from real builds, written as cautionary tales.

These are not hypotheticals. Each one cost time, caused rework, or required
the user to course-correct what should have been visible to Claude all along.

---

### AP-01 — Wrote 14 passing Playwright assertions, never opened the page

**Source:** Bunns HVAC Stats redesign, May 2026.

**What happened:** After rebuilding the Stats section as a 2x2 square grid of
color-blocked cards, I wrote a Playwright test suite verifying:
- Card count (4)
- Theme attribute on each card (navy/cream/red/yellow)
- Square aspect ratio (`aspect-square` class enforced)
- Uniform width across all 4 cards
- Grid layout (2 columns desktop, 1 column mobile)
- Stat content (numbers, labels, tags) present in each card
- Dark-themed cards use yellow numerals (computed color check)

All 14 assertions passed. I deployed and reported "verified" to the user.

**What was actually wrong:** The cards were ~720px tall — twice the size they
should have been. The 2x2 grid took up nearly two full screens of vertical
scroll. The user opened the live site and immediately saw the problem. I had
"verified" a build that was visually broken in a fundamental way.

**Why it happened:** I treated DOM assertions as verification. They were
correctness checks, not design checks. "Cards are uniform width and square"
is true at any size — including a wrong size.

**The lesson:** OP-01 (vision for taste, assertions for correctness). Open the
page. Look at it. Then run the assertions. Both are required. Neither alone
is verification.

---

### AP-02 — Iterated on Stats card design 3 times without ever looking at the result

**Source:** Bunns HVAC Stats section, May 2026.

**What happened:** The user said the original Stats cards looked "too big and
flat." I iterated:
- Iteration 1: Bento layout — built it, deployed it, never looked at it
- Iteration 2: Mobile carousel — built it, deployed it, never looked at it
- Iteration 3: 2x2 squares with Process card DNA — built it, deployed it, never looked at it

Each time, the user described what they were seeing on the live site. I made
changes based on their description and re-deployed. The fourth iteration —
4-column compact strip — finally fixed it, but only after I started using
Chrome MCP and could see the problem myself.

**Why it happened:** I had Chrome MCP available the entire time. I never used it.
I assumed Playwright tests + verbal user feedback was enough. It wasn't.

**The lesson:** OP-02 (never build UI blind). If you're iterating on a visual
problem, the FIRST thing you do is open the page yourself. The user describing
what they see is a downstream signal — the upstream signal is what's actually
on the screen.

---

### AP-03 — Claimed multi-word underlines were fixed, only fixed in code structure

**Source:** Bunns HVAC, May 2026.

**What happened:** The user said the AnimatedUnderlines were only spanning one
word and looked unintentional. I "fixed" the code by adjusting the JSX
structure across 5 sections. I told the user it was fixed. I deployed.

**What was actually wrong:** The fix was in the JSX structure (proper line
break, AnimatedUnderline wrapping the right phrase) but visually the underline
was STILL only under one word in 4 of 6 sections — because the JSX wrapped
only the second line of the heading and the second line was just one word.

**Why it happened:** I verified the code change, not the visual outcome. "I
moved the line break and the AnimatedUnderline wraps 'Community.' now" is a
code statement. "The underline visually spans multiple words across the
heading" is a visual statement. They're not the same.

**The lesson:** Recipe 7's v6 warning. The AnimatedUnderline must wrap a
multi-word phrase. Verify visually that it does, not just that you wrapped
something.

---

### AP-04 — Left 6 off-brand accent colors in `lib/data.ts` because each looked fine in isolation

**Source:** Bunns HVAC, May 2026.

**What happened:** The Bunns brand palette was navy/yellow/red. The services
data file had per-card accents:
- AC Installation: blue (#3aa5d9)
- AC Repair: orange (#e07b3a)
- Heating: red (#d4382e) ✓
- Heat Pumps: green (#48a85a)
- Maintenance: purple (#9b6cd9)
- Emergency: red (#d4382e) ✓

Same situation in reviews data. Each color "looked fine" in its individual
card during local testing. I never noticed they were off-brand until I opened
the live site through Chrome MCP and saw all six service cards together —
the green and purple jumped out as obviously wrong.

**Why it happened:** I never audited the data file against the brand palette.
And I never looked at all the cards together in a real browser to see the
cumulative effect.

**The lesson:** TP-15 (brand-palette discipline). Audit `lib/data.ts` against
the palette BEFORE rendering. AND look at all instances together AFTER
rendering. Off-palette colors that look fine in isolation accumulate visually.

---

### AP-05 — Asked the user "is there a tool that would help?" instead of auditing my own toolbox

**Source:** Bunns HVAC, May 2026.

**What happened:** Mid-build, the user noticed I was struggling to verify
visual outcomes. We had a conversation:
- User: "Is there something better than Playwright you can use?"
- Me: "Maybe Browserbase? Some kind of cloud browser API?"
- User: "What would give you better eyes?"
- Me: "Screenshots, but you told me not to use them."
- User: "How would you see animations?"
- Me: "GIFs maybe. Is there an API that would help?"
- User: "doesn't the Claude Chrome extension allow you to do that already?"

The Chrome MCP had been in my available tools the entire session. I had access to:
- Live browser navigation
- Page reading
- Scrolling
- Screenshots
- GIF recording
- JS execution
- Viewport resizing

I'd never used any of it. I spent multiple turns discussing hypothetical
solutions before the user pointed me at the tool that was already available.

**Why it happened:** No mid-build tool audit. The pre-flight discovery (if
it had even happened) would have surfaced Chrome MCP, but mid-build I never
asked "am I using everything I have?"

**The lesson:** OP-07 / TP-18 (audit tool & skill utilization mid-build). At
any major iteration boundary, list available tools/skills, list which you've
used, list which you should have used. 0% utilization on a relevant tool is
a red flag.

---

### Pre-existing Wisdom (Carried Forward)

These anti-patterns were established in earlier doctrine versions and remain
valid in v6:

- **Don't ban tools because they were misused once.** v5's PP-05 banned
  screenshot-based verification because screenshots had been used as a
  REPLACEMENT for assertions. The fix wasn't to ban screenshots — it was to
  require both. v6 reframes PP-05.

- **Don't build mobile as a stripped-down desktop.** Motion parity is
  non-negotiable (Section 1.4). The same animations must play on both viewports.

- **Don't use colored overlays on hero video.** Recipe 28 — colored overlays
  wash out the video. Use neutral black at low opacity for text contrast.

- **Don't repeat the same icon across constellation markers.** Recipe 14 —
  repeated icons defeat the visual variety that makes each item feel considered.

- **Don't render gradients between identical colors.** DAC-04 — invisible DOM
  noise. Delete it.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| **v7.0** | May 10, 2026 | **Removes auto project-context detection from Pre-Flight Checklist.** Step 4 (Detect Project Context) and the Project Context block in the Step 8 capabilities report are gone. Filesystem-based scope inference caused wrong-anchoring when the working directory contained an unrelated existing project (Peak Roofing redesign session — doctrine inferred "redesign Peak" because the worktree happened to live inside that repo, when the user wanted a fresh project). New default: every doctrine load = new project, unless the user's prompt explicitly says otherwise ("redesign this site", "modernize this codebase"). The user's prompt is the single source of truth for scope. The working directory is not. Steps 5-9 renumbered to 4-8. Stack adaptation guide preserved conceptually — when the user explicitly says "work on this existing project," adapt to its stack as before; just don't infer that intent from filesystem state alone. |
| v6.0 | May 9, 2026 | **Bunns HVAC build session learnings — major doctrine evolution toward visual-first verification.** Reframes PP-05 (screenshots required *parallel* to assertions, not banned — they were banned in v5 because of misuse, the fix is to require both). Adds VC-00 (visual preflight via Chrome MCP) and VC-11 (post-deploy visual confirmation) to verification contract. Reframes Section 1.5 as a three-layer stack: Chrome MCP (eyes) → Playwright FULL capabilities (video, traces, toHaveScreenshot, device emulation, network/console listeners — not just DOM) → axe-core (a11y). Adds new Section 0.3 Operating Principles (7 principles always active at Priority 5) codifying vision-vs-assertion mental model, never-build-blind, inference-vs-perception, scale-to-section-role, trust-user-signals-broadly, brand-palette discipline, and mid-build tool/skill audit. Adds 4 new Taste Profile items: TP-15 (brand-palette discipline), TP-16 (scale to section role), TP-17 (pattern propagation from user signals), TP-18 (mid-build skill audit). Adds Recipe 29 (Color-Blocked Brutalist Card — the "fucking gas" Process card pattern proven in Bunns build) with main-content vs. supporting-strip scale variants. Adds DAC-16 (scale to section role). Updates Recipe 7 with multi-word-phrase warning. Updates Recipe 22 with brand-palette-discipline warning for per-card accents. Updates Recipe 26 to require yellow stars across all review cards (cohesion). Adds Section 1.8 Tactical Operations (Chrome MCP usage patterns, Vercel-from-worktree deploy, skill discovery fallback, mid-build audit cadence). Adds Skill Invocation Gates to Section 0.0 (PRE-BUILD / DESIGN / POST-BUILD / VERIFICATION — non-negotiable). Adds upfront crawl step to Section 2.10 (modernization workflow): if Firecrawl/Chrome MCP available, crawl reference site yourself — don't ask user to describe it. Updates Section 0.0 Step 1 skills inventory: adds `huashu-design` (HTML hi-fi prototypes + 5-dim expert review) and `taste-skill` (Anti-Slop Frontend Framework parent), reclassifies `framer-motion` as a Plugin (not Skill), notes `skill-creator` is namespaced under `anthropic-skills:`. Updates Section 0.0 Step 8 capabilities report: Chrome MCP gets "Primary Eyes" billing equal to Playwright. Adds "Color-Blocked Brutalist" aesthetic mode (Step 9). Adds new Part 5 Anti-Pattern Catalog with 5 real session failures (AP-01 through AP-05) as cautionary tales. Updates Component Variant Library Cards row with R29 as 5th variant. Adds Anton + Inter + Lora to Typography Pairing Library (brutalist trustworthy — Bunns build). Updates Industry Intelligence Database HVAC entry to reflect Bunns build patterns. Operational note added: when no skills surface in `<system-reminder>`, check `~/.claude/skills/` directly via Bash — runtime sometimes fails to inject manifest. |
| v5.0 | May 1, 2026 | Incorporates Summit Air HVAC build learnings. Adds: Pre-Flight Checklist (Section 0.0) for MCP/skill/tool discovery at session start — prevents the "didn't know Higgsfield existed" problem. Part 0 — Instruction Hierarchy with 5-level priority system, Composable Instructions (blending modes for mixing structure/doctrine/tightness), 14-item Taste Profile (TP-01 through TP-14) codifying owner aesthetic preferences as soft defaults. Spring-first motion system (Section 2.3, replaces cubic-bezier as default), blur-enter standard (Section 2.4), 7 new recipes (22–28: glassmorphism cards, photography service cards, split layout, area tag cloud, featured+grid reviews, nav state manager, looping background video), AI Asset Generation Strategy (Section 2.12) with proactive image/video generation, reference-site image regeneration workflow, prompt engineering guidelines, and creative freedom boundary. 2 new DAC rules (14: separate media from text, 15: directional entry variation). Quick-Start Builder (Part 3) for vague-input-to-built-site workflow with industry intelligence database and confirmation checkpoint including taste profile checklist and generated assets plan. Updated Component Variant Library with new proven variants, new "Local Authority" section pattern. |
| v4.0 | April 30, 2026 | Complete restructure. Replaces the 3-layer architecture (A/B/C) with a universal motion/engineering guide. Removes all brand-specific locks (fonts, palette, section counts, approved component lists). Incorporates all learnings from kingmaker-site build (v3.3 through v3.10 design passes, DAC-01 through DAC-13, 21 recipes, 21st.dev audit, ban demotions from v3.1 and v3.2). Adds Section Pattern Library, Component Variant Library, Typography Pairing Library, Reference-Site Modernization Workflow, and Project Kickoff Template. |
| v3.0–3.2 | 2026 | Restrictive 3-layer doctrine (Layer A: hard bans, Layer B: engineering rules, Layer C: design directives). Effective but too rigid — locked specific fonts, colors, section counts, and approved component lists. Produced consistent but cookie-cutter results. |
| v2.0 | 2025 | Initial codification. Combined King Maker and Peak Roofing learnings into first formal doctrine. Established core motion philosophy and engineering rules. |
| v1.0 | 2025 | Pre-doctrine. Ad hoc notes and patterns from early builds. |

---

*This doctrine is a living document. Update it when new patterns are proven,
new anti-patterns are discovered, or new tools change the engineering landscape.
The recipes grow. The engineering rules only change when the tools change.
The philosophy — scrolling-first, motion-first, fluid-first, **vision-first** — does not change.*
