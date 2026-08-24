# MABREY ROOFING — HOMEPAGE WORK ORDER 01

**Architect:** WE19 · **Date:** 2026-07-05 · **Class:** TASTE WO (theme inversion + transplant re-skin; same-level builder per model-parity) · **Deliverable:** a dense, presentation-ready **homepage mockup** on **localhost** for the Mabrey whale pitch **tomorrow (2026-07-06)**. NOT a deploy. NOT the full site.

> Doctrine: `KINGMAKER_DESIGN_DOCTRINE.md` (density era, water-bottle 90-110%, transplant law, Opus calibration) + `vault/component-library/PLAYBOOK.md` (section→atom lookup). Master plan: `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` v1.1.

---

## §0 · LOCKED DECISIONS (closed before freeze — zero open forks ride into the build)
1. **Base = clone Summit & Oak** (`summit-oak-roofing/` @ `so-visual-pass` @ `3f427a1`) → new repo **`mabrey-roofing/`**. Density grammar + blessed motion + roofing structure come intact.
2. **Positioning = ROOFING-PRIMARY + CUSTOM-HOME PRESTIGE BAND.** Hero, H1, CTAs, service grid lead roofing (the SEO money + the domain). Custom-home building is elevated to ONE craft-authority band + the hero imagery — "the roofer who also builds $750k–1.5M homes." NOT a 50/50 dual-service homepage.
3. **Reviews = real 5-star quotes, NO aggregate number.** Google shows 16 @ 4.4★ (two 1-stars drag it); the site claims 5.0/12. Do NOT headline either number. Show 3–5 real named/geo-tagged 5-star testimonials; carry trust with craft + veteran-owned + certifications instead. ⚠️ Review TEXT is not yet in hand — architect fetches real Google quotes at build time, else flagged placeholder testimonials (clearly marked).
4. **Imagery = all Higgsfield AI** (8 assets generating; §6). Luxury Triangle homes, roof-forward.
5. **Palette = THEIR white/blue/charcoal + scarce RED accent.** Full theme inversion of S&O's dark charcoal (§3).
6. **Deploy target = LOCALHOST ONLY.** Never touch `mabreyroofing.com` (their live domain). No Vercel deploy.
7. **Defaults taken (veto anytime):** dual-intent CTA fork (estimate + call) · upgrade S&O's Newsreader/Jakarta type to a premium display face fit for a builder · flagged placeholders for numbers not in hand (# homes/roofs, license #, founding year, GAF tier) · red hex TBD at forge (a deep confident red near `#c02026`, not fire-engine).

---

## §1 · THE PRINCIPLE / LENS
**Density-era STRUCTURE in a LIGHT register.** Two registers, never crossed: S&O ships red-glow-on-charcoal; Mabrey ships **blue-brand-on-white with scarce red action**. The unit of reuse is the whole blessed SECTION (transplant law — never compose). Build the page over-poured at **90–110%** (water-bottle law: show heavy, only Joseph trims). On white, "density" = information in every zone via **structure** (opposing rails, stat counters, dense cards, the underline-draw H2s + card underlines), NOT glow — glow reads muddy on white and is the forge-live item (§8). Empty space is a bug.

---

## §2 · THE BUILD MECHANICS
1. `git clone`/copy `summit-oak-roofing/` (@ `3f427a1`) → `C:/Users/josep/Claude Gravity/mabrey-roofing/`. Fresh git init (own repo). `npm install`.
2. Run on a **dedicated port** (e.g. `:3200`) so it never collides with the S&O dev server on `:3000` (which is Joseph's eyeball surface for the separate WO_26 v3 work — DO NOT touch `:3000`, do NOT `next build` against the S&O tree).
3. Scope for tomorrow = the **homepage** (`app/page.tsx` + the sections it renders + `globals.css` + `lib/business.ts` + the homepage content). The rest of the cloned site (service/city pages) is re-skinned LATER for the Friday full-site build — out of scope for the mockup, but leave it compiling.

---

## §3 · THE THEME INVERSION + PALETTE MAP (the technical core)
S&O `app/globals.css` `@theme` is a DARK system. Invert it. Exact current → target:

| Token / surface | S&O (dark) | Mabrey (light) |
|---|---|---|
| `--color-ink` (body bg) | `#161719` charcoal | **`#FFFFFF`** page white (section alt = `#F4F6FB` tint) |
| body text | `#FFFFFF` | **`#3A3A3A`** charcoal |
| `--color-surface` (raised panel) | `#202126` | **`#FFFFFF`** card / `#F4F6FB` alt |
| `--color-line` (borders) | `#34353c` | **`#E2E8F0`** slate-200 |
| brand color (was red) | `--color-red #d8262c` | **`--color-blue #1A489A`** (their royal blue) → used for headings, links, brand marks, dots, underline draws |
| brand hover | `--color-redhi #e63a40` | **`#153a80`** deeper blue |
| brand text-on-light | `--color-redink #ff6066` | **`#1A489A`** blue (AA on white = 6.4:1 ✓) |
| **scarce ACTION accent (NEW)** | (red was everywhere) | **`--color-red ≈ #c02026`** reserved ONLY for the primary CTA fill + storm/damage stats. Nothing else. |
| muted text | `--color-mist #a7a9af` (on dark) | **`#64748B`** slate-500 (on white) |
| heading font | Newsreader serif | keep OR upgrade to a premium builder display face (forge call) |
| `--shadow-glow` (red glow) | `rgba(216,38,44,0.5)` | **soft blue/none** — de-glow (§ de-glow rule) |
| elevation (`--elev-1/2/3`, `so-card`, `--inset-hi`) | dark, heavy black shadows + white inset-hi | **light-theme shadows**: softer, cooler (`rgba(15,23,42,0.06–0.12)`), drop the white inset-hi or reduce it |
| `.so-depth-band` / `.so-depth-red` | dark radial on charcoal | white/tint radial; the one accent band = a faint BLUE wash near a CTA |
| `.so-fold` (red corner triangle) | `var(--color-red)` | **`var(--color-blue)`** (or scarce red on the ONE CTA card) |
| hero scrim | dark gradients over video | keep (dark scrim over the photo hero + white text ON the image is correct) |
| `so-step-pill`, range thumb, selection, focus-visible | red | blue (focus/selection), red only where it's a true action |

**DE-GLOW RULE (site-wide, mechanical):** every hardcoded red glow literal in component class strings — `text-shadow:0 0 Npx rgba(216,38,44,…)`, `shadow-[0_0_Npx_rgba(216,38,44,…)]`, `drop-shadow(...rgba(216,38,44...))` — is either **removed** (numerals/stats become solid blue, weight-carried) or replaced with a **very subtle** blue on the 2-3 hero stats only. On white, glow is OUT; hierarchy comes from **size + weight + blue + the underline draw**. This is the §8 forge item — get it 80% mechanically, tune the last 20% live.

**Token-vs-literal note:** `bg-red`/`text-redink`/`text-mist`/`border-line` are token-driven (remap in `@theme` and they cascade). The **glow rgba() literals are NOT token-driven** — they must be edited in the component class strings. Grep the repo for `216,38,44` and `rgba(216` to find every one. That grep is the de-glow worklist.

---

## §4 · THE SECTION PLAYLIST (grounded in the real `app/page.tsx`)
S&O's actual homepage order (verified): Hero → TrustBar → StormBand → Services(ServiceCards) → BeforeAfter → Reviews shell(GoogleReviewsWidget) → Why → Process → CostTeaser → InsuranceBand → Library grid(inline card-style-1) → FAQ(FaqSection) → CtaBand.

**Mabrey homepage playlist** (transplant those sections; re-skin; reorder + 2 additions):

| # | Section | S&O source | Mabrey re-skin |
|---|---|---|---|
| 1 | **Hero** | `Hero.tsx` (persistent-video stage + scrim) | swap video/poster → the Higgsfield hero home (roof-featured); H1 roofing-led with a custom-home prestige line; geo-qualifier subhead (Triangle towns); **dual CTA** (red "Get a Free Estimate" + blue-outline "Call (919) 795-6983"); trust chips (Veteran-Owned · GAF · NAHB · 15+ yrs) |
| 2 | **Trust marquee** | `TrustBar.tsx` | GAF · ShingleMaster/Master Elite (tier TBC) · NAHB · HBA Durham · James Hardie Elite · EagleView · NRCA · Veteran-Owned · BBB |
| 3 | **Straight-answer split** (`.seo-answer` + dual CTA ⟷ 3 numeral proof cards) | `StormBand.tsx` split grammar / the AnswerProcessSplit pattern | Mabrey roofing+construction value prop as the `.seo-answer` target (full text in DOM) + 3 proof cards (15+ yrs · veteran-owned · insurance-claim experts) |
| 4 | **Roofing services grid** | `ServiceCards.tsx` (card-style-1) | 6 cards: Roof Replacement · Roof Repair · Storm & Insurance Restoration · Metal Roofing · Commercial Roofing · Roof Inspection. Data from `lib/services.ts` re-attributed to Mabrey |
| 5 | ⭐ **Custom-home CRAFT band** (the differentiator + Higgsfield homes) | **FORGE-CANDIDATE** — start from `BeforeAfter.tsx` frame OR the Library `card-style-1` grid as a portfolio; §8 | "The roofer who also builds $750k–1.5M custom homes." Divisions strip + the luxury-home gallery (Higgsfield). This is the authority spike + the proof the current site lacks |
| 6 | **Founder / veteran-authority band** | `Why.tsx` split variant | Sean Mabrey's story (Navy/EOD medic → Duke/UNC ICU RN → mortgage firm → builder) + veteran-owned. Real E-E-A-T. Photo = flagged placeholder (Joseph supplies real, or a craft shot) |
| 7 | **Storm & insurance band** | `StormBand.tsx` | Mabrey's measured strength (insurance-claim experts, storm restoration). Call-first urgency. **NC-compliant** (no deductible games — S&O copy is already compliant, keep that discipline). Storm Higgsfield image |
| 8 | **Proof / numbers band** | `Process.tsx` counters / hero-stat grammar | honest counts ONLY: 15+ yrs · veteran-owned · 11 towns served · GAF tier · divisions. NO fabricated roof/home counts |
| 9 | **Reviews** | `page.tsx` reviews shell + `GoogleReviewsWidget` | real 5-star named/geo-tagged quotes, NO aggregate number (§0.3). Re-skin the dark shell → light |
| 10 | **FAQ band** | `FaqSection.tsx` (`TOP_FAQS`) | roofing + custom-home + insurance Q&A; `.seo-answer` cost/process answers kept in DOM |
| 11 | **CTA closer** | `CtaBand.tsx` | centered, "let it breathe" (the one exhale), estimate form + call. Red CTA lands loud against the calm |
| — | Footer | existing | services · 11 towns · company · legal · NAP (Durham HQ, 919-795-6983) · veteran-owned |

*(Dropped from S&O for the mockup: CostTeaser bento + InsuranceBand as standalone — fold insurance into #7; add cost as an FAQ answer. BeforeAfter frame is repurposed into #5.)*

---

## §5 · CONTENT TABLES (pre-resolved Mabrey data — honest; HALT + flag if a value isn't here, never invent)
**Identity (`lib/business.ts`):** name "Mabrey Roofing & Construction" · owner Sean Mabrey (Founder/Owner/CEO) · Durham HQ 519 Valley Mede Dr, Durham NC 27713 · phone (919) 795-6983 · tel +19197956983 · 15+ years · veteran-owned · license "Licensed & Insured General Contractor" (⚠️ no # published — placeholder `NC #___`) · GAF tier ⚠️ TBC (Master Elite claimed on About vs ShingleMaster logo — architect confirms before featuring "Master Elite") · warranty "GAF Master Elite Warranty" + dedicated warranty dept · affiliations: NAHB, HBA Durham, James Hardie Elite Installer, NRCA, EagleView, MaxFelt, BBB, Angie's Super Service · **stats: DO NOT fabricate roofsInstalled/reviewCount** — set honest values or omit.
**Service area (11 towns, exact):** Apex, Cary, Carrboro, Chapel Hill, Durham, Fuquay-Varina, Garner, Greensboro, Holly Springs, Raleigh, Wake Forest.
**Services (roofing grid):** Roof Replacement · Roof Repair · Storm & Insurance Restoration · Metal Roofing · Commercial Roofing · Roof Inspection. (Construction/custom-home services → the prestige band, not the roofing grid.)
**Custom-home band:** divisions (custom home building, James Hardie siding, windows & doors, painting, hardwood, porch/deck, framing, additions, solar, concrete, community renovations, insurance-claim specialists). $750k–1.5M positioning. "Building dreams, crafting homes."
**Founder band:** Sean Mabrey — U.S. Navy (Marine Corps EOD medical support, USS Austin LPD, 13 Mediterranean ports) → Cardio-Thoracic ICU RN at Duke & UNC → founded Carteret Mortgage (30 loan officers) → custom-home builder. Veteran-owned.
**Reviews:** ⚠️ real 5-star quote TEXT to be fetched (architect) — named + town-tagged. Placeholder-flag if not in hand for the mockup.
**Copy honesty:** fix the two typos on their live site if any copy is lifted ("We specialized in helping homeowner…"). NC insurance compliance: no deductible waiver/rebate, no public-adjuster claims, no guaranteed-coverage language.

---

## §6 · IMAGE PLAN (8 Higgsfield assets → sections; job IDs cooking)
- **Hero (16:9, ×2 options):** luxury Triangle custom home, roof-featured, golden hour, left negative space for the headline → §4-1 hero background.
- **Metal roof detail (4:3)** → custom-home band gallery / metal service card.
- **Brick-estate shingle roof (4:3)** → custom-home band gallery / replacement card.
- **Aerial roof system (4:3)** → proof band / custom-home band.
- **Mid-construction (4:3)** → custom-home craft band (builder proof).
- **Install-crew craft (4:3)** → founder/craft band.
- **Storm-damage roof (4:3)** → storm & insurance band.
Architect vision-QAs each (soul_2 can garble; QA via background agent, no inline). Place under `public/` with descriptive names + real `alt`. Rename any same-filename swaps to bust cache (OS13 lesson).

---

## §7 · PRESERVE-LIST (do NOT break)
- **SEO spine:** `.seo-answer` speakable class + full answer text in DOM · JSON-LD `@graph` (swap NAP/entity to Mabrey, keep the structure) · heading-clean extraction (nothing textual inside h1–h3 but the heading) · internal-link integrity · metadata.
- **Motion primitives** (`components/motion.tsx`: TypeIn/Reveal/Stagger/HeadingUnderline/Eyebrow + CountUp): copy at 100%, never regenerate. Re-color only.
- **a11y floors:** axe 0 serious under reduced-motion · AA contrast on the NEW light palette (re-verify every text color on white — the dark-theme contrast bonds are void now) · aria-hidden on decoration · reduced-motion backstop rules in globals.css (keep, re-color).
- **The dual-intent + conversion guts** (CTAs, phone wiring, forms).
- **NC insurance compliance copy.**

---

## §8 · FORGE-LIVE ITEMS (tuned with Joseph on localhost, NOT finalized blind)
1. **Glow-on-white treatment** — the density signature re-derived for light: solid-blue stats vs subtle-blue-glow vs none; underline-draw weight/color; the one accent band. Get 80% in the build; Joseph tunes the last 20%.
2. **Custom-home craft band anatomy** — the one new-ish section; start from a blessed frame (BeforeAfter / card-style-1 portfolio), forge the exact composition live.
3. **Final balance + density trim** — build over-poured; Joseph trims at the eyeball (fulcrum veto applies at trim time only).
4. **Red hex + scarcity calibration** — confirm the exact red + that it appears ONLY on the primary CTA + damage.

---

## §9 · VERIFICATION GATES + DoD
- `npm run typecheck` (or `tsc --noEmit`) clean · `npm run build` compiles · dev server runs on `:3200` and serves the re-skinned homepage (curl a Mabrey marker: "Mabrey" / a town name).
- **axe under reduced-motion** (0 serious) — re-run because the palette flip changes every contrast bond; scroll-through + settle (axe races framer reveals).
- Mobile (390px) readable · reduced-motion pass (content visible).
- **NO DEPLOY.** DoD = homepage renders dense + on-brand (white/blue/charcoal + scarce red) on localhost, honest content, images placed, ready for Joseph's live forge.
- Fix-format report: what was inverted/re-skinned, the localhost URL, per-section notes, the forge-live list, verification evidence.

---

## §10 · OPERATING RULES
- **Honesty law:** every displayed count/claim is real or a flagged placeholder. Never fabricate reviews, roof counts, warranties, or a GAF tier. Missing value → HALT + flag.
- **De-glow is mechanical** (grep `216,38,44`), the light-palette taste is forged.
- **Fix to the standard, extrapolate:** re-skin the pattern site-wide, not one instance.
- **Diagnose at the next-higher layer** on any gate failure (oracle-vs-defect first).
- **Two registers never crossed:** Mabrey is light/blue; do not import S&O's charcoal/red glow.
```
