# KINGMAKER DESIGN DOCTRINE — the Density Era (v14 · 2026-07-05)

**Scope: CLIENT contractor sites** (Summit & Oak + every client build). The FIRM site
(kingmakerseo.com) is EXEMPT — it stays blue/white readable-first for the 50-60yo-on-phone
buyer. Two registers, never crossed.
**Supersedes:** the "dial back when in doubt" default of the June overstimulation-threshold
era (that instinct survives ONLY as the firm-site register + the trim-time veto below).
KING_MAKER_v13 remains archived; this file + the component library + the launch-builder
skill ARE the operating doctrine.

---

## 1 ⭐⭐ THE WATER-BOTTLE LAW (the prime directive)
Build every section at **90-110% of the line — deliberately over-poured.** It is cheap to
pour off 5%; it is expensive to discover a section at 30% and iterate it upward. Joseph:
*"I'd rather the site come out a little choked than flat and bland."*
- **DEFAULT DENSER.** When any call is uncertain — add the rail, add the stat, add the
  band, fill the zone. Empty space is the failure mode, not clutter.
- **EMPTY SPACE IS A BUG.** Dead right-rails, hollow card interiors, single-paragraph
  sections floating in padding, 50%-empty folds — treat exactly like a console error.
- **SHOW HEAVY, NEVER SELF-TRIM.** Present the full 110% every time. Only Joseph trims.
  The ONLY self-fixes allowed pre-show: mechanical breakage (clipped text, broken wrap,
  x-overflow, layout collapse) — never density.
- **THE TRIM IS THE TASTE GATE.** Balance (the fulcrum principle — a section must not
  "tip") is enforced AT TRIM TIME by Joseph's eyeball, never pre-emptively by the model.
  Do not pre-balance by emptying.

## 2 THE DENSITY DIAL (the working vocabulary — execute literally)
- **"200% / 300% / 500% more density"** — multiply the INFORMATION in the section by
  roughly that factor: more real rows, stats, rails, chips, notes. Never decorative fill.
- **"Make it cluttered" / "overstimulating"** — drive to the saturation point: info in
  every zone, opposing rails + middle mass ([[km-density-card-standard]]).
- **"Trim it back"** — remove the named element(s) only; do not rebalance the rest.
- **"10,000% remix"** — same content, completely different anatomy, built ONLY from
  blessed grammar (see §4). Remix = reinvent the composition, never invent new chrome.
- Density is INFORMATION density: real stats, real rows, real claims (honest-counts,
  real-or-absent). A fabricated stat to fill a zone is a firing offense.

## 3 THE FLOORS (never traded, at any density)
1. **a11y:** axe 0 serious/critical on shipped pages (run under reduced-motion — axe
   races framer reveals). Text ≥ AA on real backgrounds. aria-hidden on decoration.
2. **Readability of the money copy:** answers, prices, CTAs stay legible; density
   surrounds the message, never buries it.
3. **Motion:** one-shot in-view reveals, reduced-motion-safe, GPU-only transforms.
   Numbers GLOW (`text-redink` + the GLOW_STAT shadow) — **no ghost/faded numerals in
   new work, ever.** Micro-labels (9-11px) do NOT glow.
4. **Honesty:** every displayed count derived from real data; trust signals real-or-
   absent; NC insurance compliance (no deductible games, no public-adjuster claims).
5. **SEO spine:** `.seo-answer` speakable intact, full answer in DOM, heading-clean
   extraction (nothing textual inside h1-h3 but the heading), JSON-LD untouched,
   internal-link parity on any restructure.
6. **The red-glow language IS the brand on client sites** — applied densely (glowing
   stats, dots, underline draws everywhere). Within it, CTA hierarchy still holds: the
   filled red button remains the action; don't create button-lookalikes.

## 4 ⭐⭐ THE TRANSPLANT LAW (how pages get built — the WO_26 lesson)
**Never compose, only transplant.** The unit of reuse is the whole blessed SECTION —
same component or byte-copied JSX — with only strings/arrays/hrefs swapped.
- A new PAGE TYPE = a **playlist** of existing blessed sections + a data mapping.
  Joseph approves the playlist (60-second text gate), then it's mechanical.
- Data conforms to sections — reshape CONTENT to fit a blessed anatomy; never invent
  a new anatomy to fit awkward data. (FieldNoteBoard — board chrome around a lone
  paragraph — was the canonical failure. It is dead. Do not resurrect it.)
- **LOW-N LAW:** content with fewer than ~4 items never wears a high-N frame — a
  glowing "3" aggregate in a frame built for 8-14 *advertises* thinness. Pick the
  anatomy the content SATURATES (3 items → the numeral-rail trio, not a ledger board).
- **SILHOUETTE ALTERNATION:** adjacent sections never share the same silhouette.
  Alternate split ⟷ grid ⟷ board ⟷ band down the page. Same-box-repeated = the
  WO_26 monotony failure. At zoom-out the page must read as varied masses.
- **CHROME LAW (multi-page templates):** no fixed string runs ≥5 words without a
  per-page data token (the doorway 5-gram gate is blocking).
- New anatomies are FORGED only: Joseph + the architect, live on localhost, blessed
  by eyeball, then captured to the library. Never invented inside a rollout.
- ⭐ **THE FAIL-LOUD LAW (WE24, 2026-07-12 — the WO_01→05 flat-body drift):**
  registry-conditional renders with silent fallbacks (`x in REGISTRY ? blessed :
  flat`) are drift landmines — they fail OPEN, so every content/structure gate
  stays green while the design degrades. Rollout conditionals get REMOVED when
  the rollout completes (or keyed so a missing entry is a tsc/build error);
  intentionally-empty registries carry `scan-ok: empty-by-design (<reason>)` in
  code; a declared-temporary degrade carries a NAMED RESTORER (`RESTORED BY:
  WO_XX`) or it will dissolve between handoffs — WO_01 declared "the carded
  exemplar returns in WO_02" and the obligation silently died. Machinery:
  `vault/component-library/render-path-scan.mjs` (enumerator) · per-repo
  `anatomy-check` (the gate) · wo-audit Laws 11+12 (authoring) · kmwe preflight
  (self-tests all of it at session start).

## 5 THE FORGE LOOP (the build workflow — locked)
FORGE 1-2 exemplars live (edit-mode, Joseph's eyeball, density-first) → CAPTURE
(capture-component / create-template → the library) → AUTHOR judgment-zero WOs
(launch-builder: the TEN laws + `wo-audit.mjs` green before emit) → EXECUTE (builder
per the model ladder) → ARCHITECT RE-VERIFY → Joseph's eyeball → deploy.
**Builders never think.** A WO containing a judgment call is a defective WO — the
authoring failure, not the builder's. All taste is spent at forge + playlist time.

## 6 ⭐ THE OPERATING CALIBRATION (the speed contract — model-agnostic)
Client-site sessions run DE-CAUTIONED **on whatever model is running** (Opus
full-time as of 2026-07-07; originally written for Opus 4.8, briefly carried by
Fable 5 — the contract outlives every model swap):
- **Bias:** when in doubt, DENSER and BOLDER. Never present the conservative/empty
  variant. The blessed corpus is the prior — match its saturation, not training-data
  minimalism. A too-heavy miss costs one trim; a too-light miss costs a rebuild.
- **Edits: first workable option, executed immediately.** No option surveys, no
  "we could do A/B/C" — pick per this doctrine and cut. Target 30-60s per edit.
- **Batch verification:** during edit loops, NO per-edit probes — edit, hot-reload,
  next. One curl/probe batch every 3-5 edits or at section end. Full gates only at
  ship time. (Config/route/token edits still verify immediately — HMR lies there.)
- **Zero-search library access:** load `vault/component-library/PLAYBOOK.md` at
  session start (kmwe does it) — every slot's component, path, and blessed instance
  is pre-resolved. If you are grepping the repo to find a section, you skipped the
  playbook.
- **Deep thinking is reserved** for: WO authoring, gate-failure diagnosis
  (oracle-vs-defect first), and forge-session composition. Never for an edit loop.
- Deviating from a blessed anatomy "to be safe" IS the unsafe move. Caution = drift.
- **⚠️ Model-transition note (2026-07-06):** the prior Fable-era split ("trim-after
  net → Fable · one-shot → Opus", OS15 handoff §4) is RETIRED — it mapped two
  behavior MODES onto two models, and the modes are the doctrine: trim-after net →
  maximal-draft (this §6, unchanged); one-shot/irreversible → full deliberation.
  A model's absence is never a license to re-cautiousify the edit loop. If you are
  reading this fresh: §6 is YOUR contract, not a description of some other model.

## 7 POINTERS (the doctrine's working parts)
- **Library registry:** `vault/component-library/INDEX.md` · **instant lookup:**
  `vault/component-library/PLAYBOOK.md` · **board grammar:** `sections/_board-grammar.md`
- **WO machinery:** `~/.claude/skills/launch-builder/SKILL.md` (judgment-zero class,
  TEN laws, model ladder, `wo-audit.mjs`)
- **Gates:** the S&O suite (tsc·build·security·doorway·reachability·Playwright vs
  :3210 prod build; axe under reduced-motion) — gates green ≠ blessed; Joseph's
  eyeball is always the final gate.
- Blessed exemplars (2026-07-05): S&O homepage · `/services/roof-replacement` ·
  the transplant-pass city template (`components/location/CityBoards.tsx` v3).
