# KING MAKER FIRM SITE — WORK ORDER 08

*Build out the **rest of the site** — propagate the shipped home's design VOCABULARY to every
non-home page, dialed for READABILITY. **"Phase D — the propagation pass."** Architect: WE16 ·
2026-06-26 · Builder: **NEW / COLD — fully autonomous, runs all the way through, reports at the
end** (Joseph fires it; he goes into `edit-mode` after to tune). Lineage: WO_05 (overlay) → WO_06
(deliver-for-real) → WO_07 (the 8 home edits, SHIPPED + approved) → **08 (carry the look to the
whole site, readable-first)**. Continues `king-maker-site/` (UNCOMMITTED; Vercel CLI deploy → 
`kingmaker-firm.vercel.app`). Compose from `KING_MAKER_TEMPLATE_MANIFEST.md` §7 (the reuse map).*

> The home is the shipped standard. This WO carries its **vocabulary** — TypeIn headings, DrawLine
> underlines, `.km-card` density, square-blue bullets, Eyebrow, Stagger — to the rest of the site,
> **with the motion DIALED DOWN to heading-level liveliness**. Readability is the ceiling. The site
> must not "go to pieces" as it scales: every page heavily sectioned, no walls of text, content
> pulled apart into scannable bullets/cards, simplified where dense. Joseph re-words copy after.

---

## 0. ⭐⭐ THE LENS + THE ANTI-DRIFT MANDATE
- **Component-first (`feedback_component_first_builds`).** Don't handcraft what exists. Compose from
  the manifest's real primitives + the existing resource/chart blocks. Where a net-new section needs
  a solved pattern, scaffold via Magic MCP (`21st_magic_component_builder`) then re-skin 100% to
  blue/white + square. Bar = **legible + polished + client-serving + fast**.
- 🔴🔴 **CONTINUOUS SKILL INVOCATION (Joseph's emphatic, recurring ask).** Re-invoke the relevant
  skill (via the Skill tool) **BEFORE each edit group** per §8 — not once-at-start-and-coast. The
  skills-gate is LIVE + enforcing on every `components/` edit (expected, not a bug). Invoking ≠
  name-dropping. `verify-before-claim` before any done-claim.
- **Fully autonomous.** Best judgment 100%, no mid-run questions, report at the end. Joseph's eyeball
  + his post-build `edit-mode` pass are the final gates.

## 1. ⭐ THE DISTILLED PRINCIPLE — "READABLE-FIRST PROPAGATION"
**Carry the vocabulary, dial the motion down.** The inner pages inherit the home's design language
but tip the balance toward CALM:
- **Motion lives mostly at the HEADING level.** Page H1 = the existing per-char `TypeIn` (heroes
  already do this — keep). Section H2s get a LIGHT treatment to "feel alive" — a `Reveal`
  (fade+rise+deblur) + a short blue `DrawLine`/`Eyebrow` accent. **NOT** a full per-char typewriter
  on every H2 (reads busy on a long article), **NOT** the home's count-up walls / parallax /
  dashboard choreography. Joseph: "doesn't have to be as heavy motion — just some on the H1s and H2s
  to make it feel alive."
- **Readability is THE ceiling.** Every page: heavily sectioned · **no walls of text whatsoever** ·
  dense paragraphs broken into short 2–3 sentence chunks + `list` bullet blocks + sub-sections ·
  simplified where dense (even if it means cutting). "Everything pulled apart where it's easy to
  read." 17px/1.7, ~65ch prose runs, mobile-first for a 50–60yo on a phone.
- This is **`feedback_overstimulation_threshold` applied to the build-out**: motion HELPS the reader,
  never COMPETES. On inner pages the dial sits **further toward calm than the home**. When in doubt,
  dial back — readability wins every tie.

## 2. SCOPE INVENTORY — every non-home route (audit each, bring to the standard)
Enumerate the full route set from `generateStaticParams` + the `lib/*` registries; treat EVERY
generated page as in-scope. Current state noted so you don't rebuild what exists:

| Group | Routes | Current state | The work |
|---|---|---|---|
| **Marketing** | `/work` `/system` `/firm` `/audit` `/glossary` `/apply` | THIN shells (e.g. `/work` renders `ComingOnline — next build phase`). `/audit` has `SelfAudit`, `/apply` has `ApplyForm`, `/glossary` likely term list. | **Build real sections** w/ the card-density recipe (§3). Audit each — build out shells; restructure ones that have content. Keep the interactive `SelfAudit` / `ApplyForm` working. |
| **Guides — pillar** | `/guides` | pillar/topic-map | Restructure for scannability + H2 motion; ensure all guides are linked (no orphans). |
| **Guides — articles** | `/guides/[slug]` × **9** (enterprise-website-anatomy, why-a-brochure-cant-win, why-your-worse-competitor-ranks, how-google-picks-the-winner, the-gap-most-sites-have, organic-vs-paid, your-site-is-an-asset, what-good-content-gives-buyers, winning-the-ai-answer) | **FULLY AUTHORED as data** in `lib/guide-content/*` — they render through `GuideArticle`. BUT 8 of 9 are `published:false` (orphan/nav risk) and the prose blocks are **dense (wall-like)**. | **Readability restructure** (break walls → chunks + bullets + sub-sections; §3) + **H2 section motion** + **fix `published`/orphans** (every guide ≤2 clicks from home). Do NOT rewrite substance. |
| **Guides — honesty layer** | `/guides/the-honesty-layer` | own page (myth/reality) | Restructure + motion; preserve every debunk + honesty claim. |
| **Guides — trades** | `/guides/trades` + `/guides/trades/[trade]` × **6** (roofing, hvac, plumbing, painting, kitchen-bath, outdoor-living) | trade-content data | Restructure + motion. **Trade pages are legitimately trade-specific** (the one exception to industry-neutral). |
| **Playbook** | `/playbook` + `/playbook/[chapter]` × **10** | content authored in `lib/playbook-content/*` | Readability restructure + H2 motion. Same renderer (`GuideArticle`). |
| **Legal** | `/privacy` `/terms` | dense legal | LIGHT touch only — heading/chrome consistency, no motion needed. |
| **NET-NEW** | the **pricing guide** (new `/guides/[slug]`) | does not exist | Write it per §5. |

## 3. THE INNER-PAGE RECIPE (concrete — compose from the manifest §7)
Import the real primitives; never regenerate motion:
```ts
import { Reveal, TypeIn, DrawLine, Eyebrow, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { Container, Section, Button, FlagChip } from "@/components/ui";
// .km-card / .km-card-hover / .km-card-blue / .km-prose / km-h2 etc. are GLOBAL (globals.css) — no import.
```
- **Heroes** — `PageHero` (marketing) + `GuideHero` (articles) already do `Eyebrow` + `TypeIn` H1 +
  `Reveal` lede. **Keep; verify firing.** Don't re-build them.
- **Section H2 motion (the key propagation edit — high leverage).** In `GuideArticle.tsx` the section
  header is a STATIC `<h2 className="km-h2">`. Wrap it so each section H2 gets a **`Reveal` + a short
  blue `DrawLine` accent** (or `Eyebrow` above it). One-shot, reduced-motion-safe. This single
  component edit lights up **every guide + playbook + trade page** at once. ⚠️ Keep it SUBTLE — a long
  article has many H2s; a full typewriter on each reads busy (the §1 ceiling). Reveal + a hairline
  draw is the tasteful default; let `design-motion-principles` land the exact feel.
- **Body density / "pull apart the walls."** In the content-data files (`lib/guide-content/*`,
  `lib/playbook-content/*`, `lib/trade-content/*`): break dense `{kind:"p"}` blocks (4–6 sentences)
  into short 2–3 sentence paragraphs; convert enumerations into `{kind:"list"}` bullet blocks (the
  square-blue `.km-prose` bullets); add `navLabel`'d sub-sections where a section runs long; use the
  EXISTING break-up blocks — `takeaway`, `comparison`, `definition`, `debunk`, `priceRange`, `spec`,
  `antiDoorway`, `chart` — to interrupt prose. These are the "pull apart" tools already built.
- **Marketing-page sections.** `Section tone` alternating bands → `Container` → `Eyebrow` + H2
  (`Reveal`) + `Reveal` lede → `Stagger`/`StaggerItem` grid of `.km-card .km-card-hover` cards
  (featured cell = `.km-card-blue`; a stat = `CountUp` + `.km-tabular`, used sparingly). Mobile =
  clean single-column stack.

## 4. PER-PAGE-TYPE EXECUTION NOTES
- **Marketing (build-out):** give each a real spine — `/work` = the live reference build + the 1,017
  teardown as real cards (not "coming next phase"); `/system` = how the build works; `/firm` = who we
  are; `/audit` = keep `SelfAudit` interactive, frame it readable; `/glossary` = scannable term cards;
  `/apply` = keep `ApplyForm`, calm conversion framing. Real content, card density, no walls.
- **Guides / playbook / trades (restructure + motion):** the substance EXISTS and is good — your job
  is **scannability + liveliness, not a rewrite**. Break walls, add bullets/sub-sections, add the H2
  motion. **PRESERVE every claim, number, honesty flag (MEASURED/MODELED/illustrative), internal
  link, anchor `id`, and `speakable` flag verbatim.** Flip `published` true (or otherwise guarantee
  no guide is a nav orphan).
- **Legal:** heading/chrome consistency only.

## 5. ⭐ THE PRICING GUIDE (net-new — Joseph's spec; he re-words after, you nail the READABILITY)
New `lib/guide-content/<slug>.ts` (suggest slug `what-should-a-contractor-website-cost`) → register in
`lib/guide-content/index.ts` + add a `GUIDES[]` entry → it auto-generates `/guides/[slug]` through
`GuideArticle`. Use the `priceRange` + `comparison` + `list` + `takeaway` + `antiDoorway` blocks.
**Premise:** how much site should $297/month actually buy. Structure (short, bulleted, NO walls):
1. **The short answer** (`takeaway`): For ~$297/mo you should have a **10–20 page** site — dedicated
   location pages + dedicated service pages + scheduling + basic on-page & technical SEO — **not a
   5-page brochure**. Most aren't.
2. **What you're probably getting vs what the money should buy** (`comparison`): 5-page brochure ↔
   10–20 page system.
3. **What $297/mo should include at minimum** (`list`):
   - **Dedicated location pages** — one per city/town you actually serve (buyers search service + town)
   - **Dedicated service pages** — one per service (each is its own query)
   - **Online scheduling / booking**
   - **Basic on-page SEO** — titles, headings, meta, internal links ("so Google can find you")
   - **Technical SEO** — fast, mobile, crawlable, sitemap, schema
   - → "That's 10–20 pages, not 5."
4. **What the math says** (`priceRange`): ~$297/mo ≈ $3,564/yr — frame what that should buy.
5. **The reality** (`{flag:"MEASURED"}`, tie to the 1,017-site audit): **half or more** of $297/mo
   contractor sites have **no** dedicated location or service pages.
6. **The honest guardrail** (`antiDoorway`): the dedicated pages must be **real** — one per place you
   actually serve/work — not city-swapped doorway spam.
7. **CTA:** audit your own site (`/audit`) / see the work (`/work`).
- Honesty rails ON: flag the audit stat MEASURED, keep `antiDoorway`, no ranking guarantees.
- **Write it clean + readable; mark it a DRAFT for Joseph's re-word.** Don't agonize over voice.

## 6. 🔒 HARD LOCKS + PRESERVE-LIST + ⭐ CARRY-FORWARD LEDGER (from WO_07 — 0 silent drops)
Each prior locked item → its status in WO_08:
- ✅ **Overstimulation threshold** (motion helps, never competes) — CARRIED, and it is the §1 lens.
- ✅ **Component-first** (compose/scaffold > handcraft) — CARRIED (§0).
- ✅ **Continuous per-edit skill invocation** (gate live) — CARRIED (§0, §8).
- ✅ **BLUE/WHITE not dark · no glass · no gradient** (except `.km-hairline` + one `.km-aura` + chart) ·
  **square corners** · **two-font** (Archivo H1/H2 / Jakarta body / JetBrains mono scarce) — CARRIED.
- ✅ **INDUSTRY-NEUTRAL site-wide** — CARRIED (trade pages are the only legitimate exception).
- ✅ **One-shot motion + reduced-motion-safe**; the ONLY continuous motion = `.km-caret` +
  `.km-arrow-blink` (step-end, frozen-visible) — CARRIED.
- ✅ **Accent discipline:** blue = structure/brand, blue-action = CTA/links, **red = DAMAGE ONLY** —
  CARRIED.
- 🔴 **STRUCK / SUPERSEDED (WE15, post-WO_07, 2026-06-26): AI-legibility is NOT a firm-site
  requirement.** WO_07 framed it as "the #1 risk / build the typewriter via clip-mask" — that is
  DEAD for the firm site (it's a client/Summit-&-Oak standard). The shipped `TypeIn` is a **literal
  per-char** typewriter; headings carry full text via `aria-label`. Do **not** re-introduce the
  clip-mask constraint or an AI-extraction gate here. (Keep `aria-label` on headings — that's free.)
- ✅ **Schema @graph · canonicals · `generateStaticParams` · sitemap-registry · `speakable` flags ·
  llms.txt · SSR/SSG** — PRESERVE (don't break the SEO spine).
- ✅ **FlagChip MEASURED/MODELED/illustrative honesty** — PRESERVE through every restructure.
- ✅ **The `cyber-security-specialist-1` files** (`lib/security.ts`, `app/api/lead`, `next.config.ts`,
  `scripts/security-audit.mjs`) — DO NOT CLOBBER.
- ✅ **Reuse existing motion primitives — EXTEND, don't rebuild.** Composing them in `GuideArticle`
  is fine; **do NOT change `TypeIn`/`Reveal`/etc. behavior in `motion.tsx`** (that would alter the
  shipped HOME). Add the H2 treatment as a wrapper in the article renderer, not by editing primitives.
- 🔵 **LIFTED:** WO_07 §6 held "do NOT propagate maximalist work to other pages until Joseph
  approves." **He has now approved propagation (2026-06-26)** — with the §1 readable-first
  calibration. This WO executes that.
- 🔴 **THE HOME (6 maximalist sections: Hero · GapSection · PageSystem · Dashboard · RawTechnicals ·
  BookAppointment) — DO NOT TOUCH.** It is the shipped, approved standard AND the template source.

## 7. 🚫 OUT OF SCOPE (Joseph: "ignore the blockers for now")
- **Do NOT wire `/api/lead`** — leave the `{ok:true}` no-op as-is (separate task, n8n). Don't break
  the `BookAppointment` / `ApplyForm` UI; just don't make the sink real.
- No off-page / GBP / outreach work. No new images unless a built-out section genuinely needs one
  (prefer the existing chart/figure vocabulary over net-new media).

## 8. ⭐ PER-EDIT SKILL-INVOCATION MAP (invoke BEFORE each group — the anti-drift spine)
| Edit group | Invoke (Skill tool) BEFORE starting |
|---|---|
| H2 section-motion in `GuideArticle` (component + motion) | `framer-motion` + `design-motion-principles` + `impeccable` |
| Marketing-page section build-out (cards/density/layout) | `impeccable` + `frontend-design` + `design-taste-frontend` + `ui-ux-pro-max` (+ `gpt-taste` for bento) |
| Content readability restructure (guides/playbook/trades) | `impeccable` + `frontend-design` (readability/hierarchy) |
| The pricing guide (net-new content) | `frontend-design` + `impeccable` |
| Before any "done / deployed" claim | `verify-before-claim` |
**Rule:** re-invoke before each group; output a `Skills loaded:` line per group too (gate), but the
INVOCATION + applying the guidance is the point.

## 9. VERIFICATION GATES (pixels + DEPLOYED behavior + readability — not just code)
- `tsc` 0 · `next build` — ALL routes SSG; assert every generated route builds + returns 200.
- 🔴 **READABILITY GATE (the principle's own gate — the one Joseph cares most about):** no wall of
  text on ANY page (vision pass per page-type confirms: scannable, sectioned, bulleted, short
  paragraphs, no dense block). 17px/1.7, ~65ch prose. Mobile (390px) single-column, legible for a
  50–60yo. If a page still reads dense → it's not done.
- 🔴 **OVERSTIMULATION GATE:** inner pages read CALM, not busy — motion at heading level only; no
  looping except the sanctioned carets; a dense guide doesn't feel like everything's moving.
- 🔴 **LIVE-FIRES (deployed, desktop + mobile 390px):** hero `TypeIn` types on each page type · H2
  reveals/underlines draw · any `CountUp` reaches its real value (not stuck at 0) · **reduced-motion
  → everything freezes to final state** (full text, static carets, final numbers).
- 🔴 **NO-ORPHAN / reachability:** every route ≤2 clicks from home; no `published:false` guide left
  orphaned (Built ≠ Reachable).
- **INDUSTRY-NEUTRAL grep:** no roofing-specific terms in neutral sections (guides/playbook/marketing).
  Trade pages (`/guides/trades/*`) are the only legitimate exception.
- **HONESTY preserved:** every MEASURED/MODELED/illustrative flag intact; `antiDoorway` present where
  a dedicated-pages claim appears; no NEW unflagged stat introduced.
- **axe 0 serious + contrast AA** (blue/red on white) · cursor-pointer · no hover layout-shift.
- **ONE-SHOT:** scroll past twice — nothing re-animates except the sanctioned carets.
- **prod-byte-check** after deploy (alias actually updated: palette `#1d4ed8` + new page markers).

## 10. 🛑 CADENCE (autonomous full run — phased, then deploy + report; NO mid-run checkpoint)
Joseph wants the entire site built out in one autonomous run, then HE goes into `edit-mode` to tune.
So: run start-to-finish, phase it for systematic coverage, deploy once green, report for his eyeball.
1. **Preflight** — run `kmwe` (it INVOKES the arsenal). king-maker-site is standalone → the
   verify-gate Stop hook does NOT apply here; the **skills-gate DOES** (components/ edits). Run THIS
   WO's §9 gates.
2. **Absorb** — read this WO, then `KING_MAKER_TEMPLATE_MANIFEST.md`, then the codebase; reread in an
   ultrathink loop until a pass surfaces nothing new (min 3).
3. **Execute, phased:** (a) the `GuideArticle` H2-motion component edit (lights up all article pages);
   (b) guides + playbook + trades readability restructure; (c) the 6 marketing pages build-out; (d)
   the pricing guide; (e) fix `published`/orphans; (f) legal light touch. Re-invoke skills per §8
   before each group.
4. **Verify** — run every §9 gate (readability + overstimulation + live-fires especially), desktop +
   mobile + reduced-motion.
5. **Deploy** — `cd king-maker-site && npm run build && npx --yes vercel@latest deploy --prod --yes`.
   Verify the live alias OBVIOUSLY changed + motion fires + readability holds.
6. **🛑 Report for Joseph** — live URL · the route list built/restructured · per-page-type readability
   evidence · reduced-motion + mobile proof · the pricing-guide draft flagged for his re-word · any
   page where density vs liveliness was a judgment call. His eyeball + `edit-mode` are the final gates.

---
*— WE16, 2026-06-26. WO_08 / Phase D: propagate the shipped home's vocabulary to the whole site,
READABLE-FIRST. The lens (§1): carry TypeIn/DrawLine/`.km-card`/square-blue-bullets, but dial motion
to heading-level liveliness — readability is the ceiling, no walls of text, everything pulled apart.
Most of the work = readability restructure of already-authored content-data + one high-leverage
`GuideArticle` H2-motion edit + building out 6 thin marketing pages + the net-new pricing guide.
PRESERVE: the home (untouched), every claim/number/honesty flag/link, the SEO + security spine, the
locks. SUPERSEDED: AI-legibility is NOT a firm-site gate (struck post-WO_07). Blockers (api/lead)
out of scope. Autonomous full run → deploy → report; Joseph tunes in edit-mode after.*
