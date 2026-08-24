# Global Claude Instructions

## Workflow — static-first contractor sites (post-pivot 2026-05-18)

For any frontend contractor-trade work (plumber, HVAC, electrician, roofer,
painter, kitchen remodel, general contractor, landscape, hardscape):

**Phase 1 — Static generation (default, auto-fires at session start).**
Build the bones. Atoms, typography, copy, palette, layout, accessibility,
SEO essentials. Baseline output target: 6–7 quality. User workshops to 9.5
via Phase 2 + manual polish.

**Phase 2 — Motion application (manual, voice-driven, user-triggered).**
Walk top-to-bottom through the static draft, applying motion section by
section per user voice instructions. Each application is copy-paste from
the playbook, NOT improvisation from the catalog.

**Why static-first:** motion catalog precision values (cascade ladder
0.00s/0.50s/0.45s/3.2s/3.4s, ambient 2.4s/1.8s, hover 300ms/200ms,
spring stiffness 260 damping 18) bypass under generation compression.
Two days of iteration on motion-heavy first-draft failed across three
sessions. Static has variance tolerance (automatable); motion has zero
variance tolerance (human craft). Sort work by tolerance, assign to the
right executor.

---

## Phase 1 — what's banned (HARD CONTRACT)

During Phase 1, the agent MUST NOT ship:

- Any import from `components/motion/` or equivalent (`FadeUp`, `Stagger`,
  `StaggerItem`, `TypeIn`, `HeadingWithUnderline`, `AnimatedUnderline`,
  `SlideIn`, `Marquee`, `StatCounter`, `PerimeterDraw`)
- Any `motion.X` Framer Motion component (`motion.div`, `motion.section`, etc.)
- Any `whileHover` / `whileInView` / `whileTap` / `whileDrag` / `whileFocus` prop
- Any `initial` / `animate` / `exit` / `variants` / `transition` prop
- Any `useReducedMotion` / `useScroll` / `useTransform` / `useMotionValue` /
  `useInView` / `useAnimate` / `useAnimation` hook usage
- Any Tailwind `animate-*` utility (`animate-pulse`, `animate-spin`, etc.)
- Any Tailwind `transition-*` utility outside the standard browser default
  for `:focus` ring transitions on form inputs
- Any GSAP / `gsap.to()` / `useGSAP()` / ScrollTrigger usage
- Any `@keyframes` CSS rule
- Any `transform: scale/translate/rotate` in inline style with hover/scroll intent
- Any `transition-duration` / `transition-delay` / `transition-property` /
  `transition-timing-function` in inline style or Tailwind class
- Any `aria-live` region whose purpose is animation announcement
- Any cascade delay values (`delay: 0.5`, `delay-500`, etc.)

What's allowed in Phase 1:

- Pure JSX with static atoms
- Tailwind layout, typography, color, spacing, sizing, border, shadow utilities
- Standard `:focus` ring transitions on form inputs (browser default)
- Standard `cursor-pointer` / `pointer-events` utilities (not animation)
- Static SVG (no animated paths, no `<animateTransform>`)
- Static accessibility props (`aria-label`, `aria-hidden`, `role`)

Shipping a single motion-bearing line during Phase 1 = pivot failure.
Refuse the change, refer back to this contract.

---

## File loading map

**Auto-loaded at session start:**
- `C:\Users\josep\.claude\CLAUDE.md` (this file)
- `C:\Users\josep\Claude Gravity\STRUCTURE_DOCTRINE.html` (the only Phase 1
  generation contract)
- 6 ALWAYS skills (see below)
- `~/.claude/projects/<project-slug>/memory/*` if present

**Loads on Phase 2 trigger:**
- `C:\Users\josep\Claude Gravity\MOTION_PLAYBOOK.html` (section-pattern-keyed
  motion application catalog — the new artifact)
- `design-motion-principles` skill (conditional)

Phase 2 trigger phrases (any of these from the user activates Phase 2):
- "phase 2" / "Phase 2"
- "add motion" / "let's add motion" / "now let's animate" / "motion it up"
- "load the playbook" / "load motion playbook"
- "let's wrap [section] in [motion vocab]"

If the user mentions motion vocabulary mid-Phase-1 without an explicit
trigger ("this should have a typed-in"), ask: "Want to enter Phase 2 and
start motion application?" Don't silently load the playbook.

**Browse on demand only (never auto-loaded):**
- `C:\Users\josep\Claude Gravity\MOTION_DOCTRINE.html` — deep motion
  reference; consult only when MOTION_PLAYBOOK doesn't cover a specific
  Phase 2 case
- `C:\Users\josep\Claude Gravity\REFERENCE_LIBRARY.html` — rendered patterns,
  recipes, anti-patterns, TPs/OPs, flagship case studies, full SEO doctrine

**Archived — DO NOT LOAD:**
- `C:\Users\josep\Claude Gravity\KING_MAKER_v13.html` (monolithic precursor)
- `C:\Users\josep\Claude Gravity\KING_MAKER_MASTER_v8.md` (older retired)
- `C:\Users\josep\Claude Gravity\KING_MAKER_MASTER_v7.md` (older retired)
- Any `docs/KING_MAKER_v*.html` inside project repos (project supplements, retired)

Loading any archived file alongside the current architecture duplicates
content and re-introduces the compression failure the split fixed.

---

## Skills — 6 ALWAYS (trimmed 2026-05-18 post-pivot from 7)

For any Phase 1 UI Edit/Write, the literal output line must list all 6:

`Skills loaded: impeccable, design-taste-frontend, frontend-design, ui-ux-pro-max, high-end-visual-design, gpt-taste`

`~/.claude/hooks/skills-gate.mjs` enforces this mechanically — UI Edit/Write
tool calls are blocked until the line appears in transcript.

**Conditional skills (invoke via Skill tool only when trigger applies):**
- `design-motion-principles` — loads with MOTION_PLAYBOOK on Phase 2 trigger
- `brandkit` — brand-kit image generation (client onboarding)
- `contractor-ad-research` — Meta ad sweeps (competitor research)
- `imagegen-frontend-web` / `imagegen-frontend-mobile` — reference image generation

---

## The Phase 1 generation reflex (memorize)

Before writing any frontend section JSX, answer these out loud:

1. **Which existing section atom does this content map to?**
   See REFERENCE_LIBRARY §14 (AM palette: BrandLinesGrid, ProcessSteps,
   FaqSection, ServicesGrid, ReviewsSection, etc.), §06 (universal pattern
   library), §14B (KMv2 palette).
2. **If no atom fits, propose extending an atom or proposing a new named atom.**
   Never inline-compose from primitives. Never ship a flat editorial card.
3. **What's the variance composition?** Lock 5 — 10-line block per
   STRUCTURE §00 (Buttons / Dividers / Heading / Trust / Image / Form /
   Footer / Voice / Glyph / Grid pattern). Output before any UI Edit.
4. **Then write JSX.** Atom-based, copy-filled, palette-correct,
   layout-correct, accessibility-correct. ZERO motion code (see ban list above).

---

## The Phase 2 application reflex (when user triggers)

1. Load `MOTION_PLAYBOOK.html`. Output: `Motion playbook loaded — Phase 2 active.`
2. User identifies section + vocabulary ("typed-in on the hero H1",
   "underline left-to-right on these headings", "stagger cards from left,
   center comes up", "hover lift on cards").
3. Look up section + vocabulary in playbook. Copy-paste the exact block.
4. After each application: one-line description of what landed, ready for
   next instruction.
5. Verification screenshots at user discretion (Playwright capture spec wired).

---

## Memory layer

Project memory at `~/.claude/projects/<project-slug>/memory/` auto-loads at
session start when working in that project. Standard files:

- `MEMORY.md` — index of all memory files (always kept under ~200 lines)
- `feedback_*` — user corrections + validated approaches
- `project_*` — project-specific facts and decisions
- `reference_*` — pointers to external systems
- `user_*` — user role and preferences

Add a `feedback_design_preferences_<project>.md` per project as preferences
accumulate during Phase 2 workshopping — "User prefers X intro pattern,
dislikes Y card layout, has shipped Z for prior clients." This is the
long-tail consistency lever.

For active `American Master Works Redaux`:
- See MEMORY.md index for current entries

---

## Why this architecture (2026-05-18 pivot)

Previous architecture: load MOTION + STRUCTURE doctrine at session start,
generate motion-heavy first-draft. Repeatedly failed across three sessions:
motion catalog precision values bypassed under generation compression even
after splitting v13 into three files. Cedar Creek Plumbing solo run
(2026-05-18) confirmed file split alone wasn't sufficient.

Current architecture: Phase 1 ships static-only (high variance tolerance →
automatable). Phase 2 applies motion manually via section-pattern-keyed
playbook (low variance tolerance → human craft). User does speech-to-text
vibe-coding; Phase 2 voice-driven section-by-section application matches the
input modality.

Total expected per-site time: structural draft in ~30 min via Phase 1 +
~2-4 hours manual motion application via Phase 2. Shorter than days of
failed automation.

Audit findings + rationale live in:
- `~/.claude/projects/<am-redaux>/memory/v13_audit_findings.md` —
  full 22-violation post-mortem from the deep-remix experiment
- `~/.claude/projects/<am-redaux>/memory/feedback_visual_verification.md` —
  DOM-inspection-isn't-perception lesson
- `~/.claude/projects/<am-redaux>/memory/feedback_skill_audit.md` —
  invoking a skill is not using it

---

## Future v14

When the next milestone arrives (new flagship static-baseline shipped,
playbook stabilizes after ~10+ projects, ~90+ days of production data),
the next iteration writes a fresh **self-contained v14** — full rewrite of
STRUCTURE_DOCTRINE + MOTION_PLAYBOOK + REFERENCE_LIBRARY together. The
supplement model is permanently retired.
