# KING MAKER MOTION DOCTRINE

**Version:** 4.0
**Date:** April 30, 2026
**Author:** Joseph Spells
**Purpose:** Universal motion/engineering guide for premium scrolling-first web experiences

---

> This doctrine produces unique sites every time while maintaining the same DNA:
> fluidity, premium motion, scrolling-first architecture, and engineering discipline.
> It is a guide, not a restriction. Creative freedom within structural discipline.

---

## Part 1 — ENGINEERING RULES

Hard rules only. Never bend. Grep-enforceable or measurably prevent bugs.

If a rule cannot be enforced by grep, it is taste or wisdom — not engineering.
Such rules belong in operating principles (Part 2), not here.

---

### 1.1 Hard Performance Bans

These are non-negotiable. Every one of them exists because it caused a real,
measurable problem during a production build.

| ID | Ban | Reason |
|---|---|---|
| PP-05 | No screenshot-based verification | Use Playwright assertions and DOM inspection. Screenshots lie about layout, overflow, and accessibility. |
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

### 1.5 Verification Contract

Every build is verified against these criteria before delivery.

**Testing Infrastructure:**
- Playwright CLI (NOT Playwright MCP) for all testing
- `@axe-core/playwright` for accessibility verification
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844

**Verification Checklist:**

| ID | Check | Pass Criteria |
|---|---|---|
| VC-01 | Reload stability | Hero must settle to final state after full page reload. No stuck animations, no missing elements. |
| VC-02 | FPS budget (desktop) | 50fps sustained during scroll. Hard floor: never below 30fps. |
| VC-03 | FPS budget (mobile) | Headless mobile: 5fps floor (verify real performance on physical device). |
| VC-04 | Horizontal overflow | No horizontal scrollbar on mobile at 390px width. Test at 375px for safety margin. |
| VC-05 | Stat container fit | All stat numbers, labels, and units must fit within their card containers. No overflow, no clipping. |
| VC-06 | Accessibility | axe-core: 0 critical, 0 serious violations. |
| VC-07 | Contrast | All text meets 4.5:1 against its background (including text over images/video). |
| VC-08 | Reduced motion | With `prefers-reduced-motion: reduce`, continuous loops stop, reveals still play (opacity-only). |
| VC-09 | Cross-viewport | Run full test suite at both 1440x900 AND 390x844. Both must pass. |
| VC-10 | Asset weight | Total page weight < 5MB. Hero video < 3MB. |

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

At any given scroll position, at least 3 of these 4 categories must be active.
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

### 2.3 Easing Palette

Six curves. Each has a purpose. Never use the browser default `ease-in-out` —
it reads as lazy and unintentional.

| Curve | CSS / GSAP Value | Name | Use For |
|---|---|---|---|
| Default UI | `cubic-bezier(0.76, 0, 0.24, 1)` | Snap | Hover states, reveals, transitions. Sharp and decisive. |
| Soft Reveal | `cubic-bezier(0.16, 1, 0.3, 1)` | Anticipation | Section entrances, stagger cascades. More buildup before release. |
| Scrub | `linear` / `ease: "none"` | Direct | All scroll-linked animations. Mandatory — eased scrub feels laggy and disconnected. |
| Gravity Draw | `power2.out` | Fall | Directional line draws (vertical lines, downward reveals). Implies weight. |
| Breathing | `cubic-bezier(0.45, 0, 0.55, 1)` | Symmetric | Idle loops, continuous ambient motion. Equal in and out for smooth cycling. |
| Physical | Spring `{ stiffness, damping, mass }` | Momentum | Framer Motion gestures, drag interactions, momentum-based animation. Feels physical. |

**Anti-pattern:** `ease-in-out` / `ease` / unspecified easing. If you don't choose
a curve, you didn't design the motion — you let the browser decide. That's not design.

### 2.4 Proven Recipes

21 recipes. Each one was built, broken, debugged, and verified. The implementation
detail listed is the one that makes it actually work — the thing you'd waste an hour
discovering on your own.

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

### 2.5 Design Audit Checklist (DAC)

13 rules proven during production builds. Each one exists because its absence
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

### 2.6 Section Pattern Library

Proven narrative arcs. The project picks one at kickoff, or invents a new one.
Hero is always first. CTA/application is always last.
Everything between is chosen per project.

| Pattern | Sections | Flow Logic | Status |
|---|---|---|---|
| **Show-Frame-Prove-Act** | 7 | Hero → credentials → process → proof → math → urgency → CTA | Proven (King Maker) |
| **Direct Trust** | 3 | Hero → proof/portfolio → CTA | Proven (Baker Roofing) |
| **Full Service** | 9 | Hero → services → trust → before/after → process → video → reviews → areas → CTA | Proven (Peak Roofing) |
| **Storyteller** | 5-6 | Hero → origin story → problem → solution → social proof → CTA | Available |
| **Ladder** | 4-5 | Hero → tier comparison → middle-tier deep-dive → premium reveal → CTA | Available |
| **Magazine** | 6-8 | Hero → editorial scroll → sticky parallax feature → stats → testimonial marquee → team → CTA | Available |
| **Single Product** | 4-5 | Hero → product deep-dive → specs/features → reviews → CTA | Available |

These are starting points. Combine patterns, add sections, remove sections.
The pattern gives you a narrative backbone — adapt it to the project.

### 2.7 Component Variant Library

Multiple proven implementations per component type. Choose per project.
Do not default to the same variant every time — that produces cookie-cutter sites.

| Component | Variant A | Variant B | Variant C | Variant D |
|---|---|---|---|---|
| **Hero** | Video background | Animated gradient | Static atmospheric still | 3D scene / WebGL |
| **Stat block** | 3-card grid | Asymmetric editorial | Horizontal scroll | Inline counters in text |
| **Process** | Vertical timeline + scrub line | Horizontal scroll | Step accordion | Pinned sticky scroll |
| **Cards** | Icon-top centered | Icon-side horizontal | Numbered sequence | 3D-tilt interactive |
| **Testimonial** | Card grid | Auto-scroll marquee | Sticky-scroll single | Hero quote full-bleed |
| **CTA** | Single-screen form card | Multi-step wizard | Calendly/booking embed | Phone-only with click-to-call |
| **Headline** | TypeInHeading (word-split) | CharLine (per-letter typewriter) | Character stagger (random) | Static with AnimatedUnderline |
| **Gallery** | Grid with clipPath wipe | Lightbox | Before/after slider | Sticky parallax |

### 2.8 Typography Pairing Library

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

These are not locks. They are conversation starters.
The right font for the project might not be on this list.

### 2.9 Reference-Site Modernization Workflow

Formalized process for when a client says "I like this site, make mine feel like that."

```
Step 1: RECEIVE REFERENCE URL
  - Document the reference site's brand DNA
  - Note what the client likes about it (motion? layout? color? vibe?)
  - Note what they want different

Step 2: EXTRACT BRAND IDENTITY
  - Colors (primary, secondary, accent, neutrals, background)
  - Fonts (headings, body, accent)
  - Voice and tone (formal? casual? technical? warm?)
  - Services, geography, key proof points
  - Logo assets, brand guidelines if available

Step 3: PICK SECTION PATTERN
  - Choose from Section Pattern Library (2.6)
  - Or invent a new pattern based on the reference site's structure
  - Map the client's content to the chosen pattern

Step 4: APPLY MOTION RECIPES
  - Select recipes from 2.4 that serve the content
  - Layer in the fluidity DNA (DAC-13: 3-of-4 motion categories)
  - Ensure every section has entrance animation + ambient motion

Step 5: BUILD WITH CLIENT'S BRAND
  - Their colors, their fonts, their voice
  - Our motion architecture, our engineering rules, our animation system
  - The result looks like THEM but moves like US

Step 6: VERIFY
  - Full Part 1 engineering rules verification
  - Both viewports (desktop + mobile)
  - Accessibility audit
  - Performance budget check
```

### 2.10 21st.dev Approved Imports

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

---

## Part 3 — PROJECT KICKOFF TEMPLATE

Copy this section into each new project's `CLAUDE.md` and fill it in.
This is where project-specific decisions live — never in the doctrine itself.

---

```markdown
# [Project Name] — Build Brief

## Doctrine Version
- King Maker Motion Doctrine v4.0

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
- **Stagger default:** 40ms (or custom)
- **Viewport trigger amount:** 0.3 (standard) / 0.1 (eager) / 0.5 (conservative)
- **Easing override:** (if not using default palette from 2.3)
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
- [ ] Recipe 7 — AnimatedUnderline
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

## Component Variants Selected
| Component | Chosen Variant |
|---|---|
| Hero | |
| Stat block | |
| Process | |
| Cards | |
| Testimonial | |
| CTA | |
| Headline animation | |

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

## Version History

| Version | Date | Changes |
|---|---|---|
| **v4.0** | April 30, 2026 | Complete restructure. Replaces the 3-layer architecture (A/B/C) with a universal motion/engineering guide. Removes all brand-specific locks (fonts, palette, section counts, approved component lists). Incorporates all learnings from kingmaker-site build (v3.3 through v3.10 design passes, DAC-01 through DAC-13, 21 recipes, 21st.dev audit, ban demotions from v3.1 and v3.2). Adds Section Pattern Library, Component Variant Library, Typography Pairing Library, Reference-Site Modernization Workflow, and Project Kickoff Template. |
| v3.0–3.2 | 2026 | Restrictive 3-layer doctrine (Layer A: hard bans, Layer B: engineering rules, Layer C: design directives). Effective but too rigid — locked specific fonts, colors, section counts, and approved component lists. Produced consistent but cookie-cutter results. |
| v2.0 | 2025 | Initial codification. Combined King Maker and Peak Roofing learnings into first formal doctrine. Established core motion philosophy and engineering rules. |
| v1.0 | 2025 | Pre-doctrine. Ad hoc notes and patterns from early builds. |

---

*This doctrine is a living document. Update it when new patterns are proven,
new anti-patterns are discovered, or new tools change the engineering landscape.
The recipes grow. The engineering rules only change when the tools change.
The philosophy — scrolling-first, motion-first, fluid-first — does not change.*
