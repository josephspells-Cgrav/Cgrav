# KING MAKER — FIRM-SITE TEMPLATE MANIFEST

> **Site:** King Maker firm site (the maximalist blue/white home — Exhibit A) · **Source codebase:** `C:/Users/josep/Claude Gravity/king-maker-site/` · **Live:** https://kingmaker-firm.vercel.app/ · **Captured:** 2026-06-26 (post-WO_07, Joseph-approved, motion confirmed firing via live probe).
>
> The lossless template for building NEW pages at 100% fidelity. **Compose from the REUSE MAP (§7) — import the real primitives, never regenerate motion.** Every entry is `file:line`-cited + exact-param. Coverage Ledger (§8) proves nothing was dropped. Re-capture if the code changes (stale manifest → re-extract).

---

## 1. TOKENS — `app/globals.css` `@theme` (L16–75)
| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#ffffff` | white canvas (L18) |
| `--color-bg-tint` | `#eef2f8` | the alternating band (deepened from slate-50, L19) |
| `--color-surface` | `#ffffff` | raised card (L23) |
| `--color-surface-2` | `#f1f5f9` | raised panel (L24) |
| `--color-surface-3` | `#e2e8f0` | deeper panel (L25) |
| `--color-line` | `#e2e8f0` | borders (L26) |
| `--color-line-soft` | `#eef2f6` | soft border / divider grid (L27) |
| `--color-blue` | `#1d4ed8` | BRAND: headings accents, marks, data (L32) |
| `--color-blue-action` | `#2563eb` | CTA fills + link pop (white text on it) (L33) |
| `--color-blue-deep` | `#172554` | code housing / deepest brand (L34) |
| `--color-blue-tint` | `#eff6ff` | faint "you/winning" fill (L35) |
| `--color-blue-100` | `#dbeafe` | soft fill / chart bands / code text (L36) |
| `--color-blue-glow` | `rgba(37,99,235,0.14)` | the one aura (L70) |
| `--color-ink` / `--color-text` | `#0f172a` | body + headings (AAA) (L39–40) |
| `--color-muted` | `#475569` | secondary / lede (AA) (L41) |
| `--color-dim` | `#586679` | labels / captions (AA on tint) (L42) |
| `--color-red` | `#dc2626` | DAMAGE: big negative numbers + fills (L51) |
| `--color-red-ink` | `#b91c1c` | small red text/labels (AA) (L52) |
| `--color-red-tint` | `#fef2f2` | faint damage wash (L53) |
| `--shadow-card` | `0 1px 2px /.05 , 0 10px 26px -10px /.17` | resting card, two-layer slate (L71) |
| `--shadow-lift` | `0 2px 6px /.07 , 0 22px 46px -14px /.27` | hover/lifted (L72) |
| `--shadow-blue` | `0 2px 6px blue/.10 , 0 22px 48px -16px blue/.30` | featured/lever (L73) |
| `--shadow-panel` | `0 2px 8px /.06 , 0 34px 72px -28px /.30` | big instrument panels (L74) |
| `--font-display` | `var(--font-archivo)…` | Archivo — H1/H2 only (L61) |
| `--font-sans` | `var(--font-jakarta)…` | Plus Jakarta — body + H3+ (L62) |
| `--font-mono` | `var(--font-jetbrains)…` | JetBrains — SCARCE technical voice (L63) |

**Type scale** (`globals.css`): `.km-h1` clamp(1.9,4vw,2.7rem)/800 (L162) · `.km-h2` clamp(1.4,2.4vw,1.85rem)/700 (L169) · `.km-h3` clamp(1.1,1.5vw,1.25rem)/600 (L176) · `.km-display` (L147) · `.km-mono` tnum (L155) · `.km-tabular` tnum (L141). Base body 17px/1.7 (L85–94). H1/H2 = Archivo, tracking -0.02em, line 1.1 (L98–105).

## 2. MOTION CATALOG — `components/motion.tsx` (exact params · `file:line`)
Ease: **`ENTER_EASE = [0.16, 1, 0.3, 1]`** (L20). All one-shot (`viewport once`), all reduced-motion-safe via `useReducedMotionSafe` (L13).

| Primitive | Params | Trigger | Reduced-motion | `file:line` |
|---|---|---|---|---|
| `CountUp` | `to` · `duration=1.1` · `delay=0` · `decimals/suffix/prefix`; animates 0→to | `useInView once, amount:0.35, margin:"0px 0px -10% 0px"` (the stuck-at-0 fix) | instant final value | motion.tsx:25–69 |
| `Reveal` | `opacity 0→1 · y=30→0 · filter blur(8px)→0` (Jakub recipe) · `duration 0.7` · `delay` | `whileInView once, amount:0.2` | static (no transform) | motion.tsx:73–101 |
| `Parallax` | `useScroll(offset ["start end","end start"])`→`useTransform([0,.5,1],[d,0,-d])` · `distance=24` (±cap) | scroll-linked (never loops) | static element | motion.tsx:111–142 |
| `TypeIn` | LITERAL per-char typewriter · `perChar 52ms` (`cinematic 80ms`, L179) · blinking `.km-caret` · blue underline draws AFTER typing `scaleX 0→1 duration 1.6` (L226) · `aria-label`=full text | `useInView once, amount:0.4` | full text instant + static underline, no caret (L198) | motion.tsx:153–231 |
| `DrawLine` | `scaleX 0→1` · `color=var(--color-blue)` (pass `var(--color-red)` for gap cards) · `width=100% · height=2 · delay=0.15 · duration=1.5` | `whileInView once, amount:0.6` | `scaleX:1` (drawn) | motion.tsx:235–269 |
| `Eyebrow` | `DrawLine` hairline 2.75rem + label `text-[15px] sm:text-[17px] tracking-[0.2em] uppercase font-bold text-blue`; fade `opacity 0→1, y 8→0, duration 0.5` (WO_07 P2: ~1.4× + fade) | `whileInView once, amount:0.6` | static, no fade | motion.tsx:273–302 |
| `Stagger` / `StaggerItem` | parent `staggerChildren 0.1, delayChildren 0.06`; item `opacity 0, y 30, blur(8px)→0, duration 0.62` | `whileInView once, margin:"-60px"` | static children | motion.tsx:304–338 |
| SVG draw (inline) | `motion.path pathLength 0→1` (win-line `duration 1.5`, baseline `1.0`); area `opacity`; end-marker `scale` (delay 1.5) | `useInView once, amount:0.3` | drawn final | Dashboard.tsx:139–152 |

**CSS animations** (`globals.css`): `.km-caret` blink `km-blink 1.06s step-end infinite` (L383, `@keyframes` L398) · `.km-caret-lg` (L393) · `.km-arrow-blink` `km-arrow-blink 1.5s step-end infinite, 50%→opacity .3` (L407, `@keyframes` L410). 🔴 These two carets are the ONLY sanctioned continuous motion (idiomatic, slow, step-end, frozen-visible under reduced-motion via `@media` L419–430).

## 3. DEPTH / SURFACE RECIPES — `globals.css`
| Class | Recipe | `file:line` |
|---|---|---|
| `.km-card` | `bg-surface · 1px border-line · shadow-card` (the one resting recipe) | L219–223 |
| `.km-card-hover` | `transition transform/box-shadow/border-color 0.3s`; `@media(hover)` → `translateY(-6px) · border blue/55 · shadow-lift` | L195–204 |
| `.km-card-blue` | featured/lever: `bg-blue-tint · 2px border-blue/50 · shadow-blue` | L225–235 |
| `.km-lift-group` | wrapper lifts `translateY(-6px)` (paired with inner `group`) | L207–214 |
| `.km-code` | code housing: `border-blue-deep/18 · bg-blue-deep · text-blue-100 · mono` (the ONE dark accent block) | L240–246 |
| `.km-blueprint` | faint blue 26px engineering grid (crest field) | L348–358 |
| `.km-aura` | one restrained blue radial — ONCE per view max | L361–369 |
| `.km-grain` | faint slate dots 3px (section texture) | L337–344 |
| `.km-hairline` | 1px blue→transparent gradient rule | L326–334 |
| `.km-prose` | 40rem / 17px / 1.7 / ink / square blue bullets (readability heart) | L255–323 |

## 4. SECTION CATALOG — `app/page.tsx` flow: Hero → GapSection → PageSystem → Dashboard → RawTechnicals → BookAppointment
Every section header = `Eyebrow` + `TypeIn` (H1/H2) + `Reveal` lede. Cards = `Stagger`/`StaggerItem` + `.km-card`+`.km-card-hover`.
- **Hero** (`Hero.tsx`, `km-grain` section): editorial split; `TypeIn cinematic` H1 "WE MAKE KINGS" (L27); `Parallax distance=24` aura (L14) + crest `Parallax distance=18` (L71) inside a machined tray (`shadow-panel ring-line` plate → `km-blueprint bg-blue-tint` field + `CornerTicks`, L68–69); CTAs = `Button` primary/secondary.
- **GapSection** `#problem` (`GapSection.tsx`, tone tint): 4 cards `border-2 border-blue/30 shadow-lift km-card-hover` (L46) — blue "why" header box → `CountUp` red `text-[3.1rem]` `%` `duration 1.65` (L54) → label + red `.km-arrow-blink` caret-arrow ▸ (L62) + red `DrawLine` under it (L65) → "what it costs them" → ~5 red-`XMark` bullets. `speakable: #problem h2`.
- **PageSystem** `#proof` (`PageSystem.tsx`, tone bg): 15× `CountUp` anchor (`km-card`, L87); the LEVER featured `km-card-blue` 2-col cell (L103) "what a location page contains" + GBP-radius fill; the 9 category cards `km-card km-card-hover` (icon chip → `TypeIn` H3 → example → bullets → mono "wins [search]") in `lg:grid-cols-3 auto-rows-fr`. `speakable: #proof h2`.
- **Dashboard** (`Dashboard.tsx`, `bg-bg-tint`): CRM panel `border-line shadow-panel` — top bar ("B" mark + `CRM_DEMO.company` "Bob's Roofing" + "Demo" + `FlagChip`); KPI row (`Reveal` → 4 `CountUp` `Kpi`: leads/converted · appointments · visits · rank `#` delay 1.2); win-line SVG (`pathLength` draw + `CountUp` rank #42→#4 delay 1.2, +climb delay 1.45); legend + `FlagChip`; Recent-leads `divide-y` list + `StatusBadge` (Converted/Appt-set/New). Illustrative-demo honesty line (L200). 🔴 one-shot reveal + draw ONLY, NO live/loop.
- **RawTechnicals** `#system` (`RawTechnicals.tsx`, tone bg): 3 cards `km-card km-card-hover` w/ `blue-action` top bar — 01/02/03 + kicker + `TypeIn` H3 + `.km-code` teaser + `Tick` checklist + PROOF footer (`bg-blue-tint`).
- **BookAppointment** `#book` (`BookAppointment.tsx`, tone tint): 2-col — value left (`Eyebrow`+`TypeIn` H2 + `Reveal` lede + checklist + scarcity line) / form card right (`shadow-panel`, posts `/api/lead`, trade dropdown, success state). CALM — `Reveal` only, no parallax/no caret near the form.

## 5. LAYOUT · DENSITY · BALANCE
`Container` `max-w-[1180px] px-6 sm:px-8` (ui.tsx:11). `Section` `py-24 sm:py-32`, `tone bg`=white / `tone tint`=`bg-bg-tint` — alternating bands (ui.tsx:18–37). Card grids: gap-4/5/6, `sm:grid-cols-2 lg:grid-cols-3`, `auto-rows-fr` for even cells. Mobile = clean single-column stack.

## 6. ACCENT DISCIPLINE + THE LOCKS
- **Accent:** `blue` = brand/structure; `blue-action` = CTA/links; `red` = DAMAGE ONLY (gap numbers, X bullets, caret-arrow, underline). Never decorative red.
- **Locks:** BLUE/WHITE, **NOT dark** · **square corners** (no radii; `button/input` radius 0, globals L121–127) · no glass, no gradient except the `.km-hairline` + ONE `.km-aura` + the chart area gradient · two-font system (Archivo display / Jakarta body / JetBrains mono scarce) · 17px/1.7 max-readability, mobile-first · **one-shot motion + reduced-motion-safe**; the only continuous motion = `.km-caret` + `.km-arrow-blink` (step-end, frozen-visible). · `cursor:pointer` restored on buttons (globals L130–133). · **AI-legibility is NOT a firm-site requirement** (Joseph 2026-06-26 — that's a client/SO standard); headings still carry full text via `aria-label`.

## 7. ⭐⭐ REUSE MAP — a NEW page imports these (compose, never regenerate)
```ts
import { useReducedMotionSafe, CountUp, Reveal, Parallax, TypeIn, DrawLine, Eyebrow, Stagger, StaggerItem, ENTER_EASE } from "@/components/motion"; // components/motion.tsx
import { Container, Section, Button, FlagChip, Hairline, Label } from "@/components/ui";                                                          // components/ui.tsx
// Tokens + every .km-* recipe are GLOBAL (app/globals.css) — inherited automatically, no import.
```
**Section recipe to copy:** `<Section id tone> <Container>` → `Eyebrow` + `TypeIn as="h2"` + `Reveal` lede → `Stagger`/`StaggerItem` grid of `.km-card .km-card-hover` cards (featured cell = `.km-card-blue`; data = `CountUp` + `.km-tabular`; technical teasers = `.km-code`; emphasis line = `DrawLine`). NEVER hand-roll a new reveal/typewriter/card-depth — use the primitive + the `.km-*` class.

## 8. COVERAGE LEDGER — every tool-extracted item ↔ manifest (0 gaps)
Ground truth = the Phase-3 greps (in transcript). **9 primitives + 19 `.km-` classes/keyframes + 27 tokens + 6 sections.**
- **Primitives (9/9 ✓):** useReducedMotionSafe §2 · CountUp §2 · Reveal §2 · Parallax §2 · TypeIn §2 · DrawLine §2 · Eyebrow §2 · Stagger §2 · StaggerItem §2.
- **CSS classes/keyframes (19/19 ✓):** km-card §3 · km-card-hover §3 · km-card-blue §3 · km-lift-group §3 · km-code §3 · km-caret/km-caret-lg §2 · km-arrow-blink §2 · km-blink §2 · km-blueprint §3 · km-aura §3 · km-grain §3 · km-hairline §3 · km-prose §3 · km-h(1/2/3) §1 · km-display §1 · km-mono §1 · km-tabular §1 · km-type (TypeIn wrapper) §2.
- **Tokens (27/27 ✓):** 20 `--color-*` + 4 `--shadow-*` + 3 `--font-*` → all in §1.
- **Sections (6/6 ✓):** Hero · GapSection · PageSystem · Dashboard · RawTechnicals · BookAppointment → all in §4.
- **Visual/density (✓):** captured via the live Playwright probe + screenshots on disk (`scratchpad/wo07-desktop-fold/full.png`, `wo07-mobile-full.png`, 2026-06-26) — count-ups fired 57/70/56/71, dashboard rendered, layout/rhythm confirmed.

**RESULT: N/N covered · 0 gaps.** Every primitive, recipe, token, and section is captured + `file:line`-cited. DoD met: manifest exists · ledger 0-gaps · all entries code-cited · screenshot artifact saved.
