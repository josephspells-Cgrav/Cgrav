# HANDOFF — King Maker website lane → **Website Engineer 21 (WE21)**

**From:** WE20 · **To:** WE21 · **Date:** 2026-07-07 (~22:50) · **Lineage:** WE4→…→WE17→WE18→WE19→**WE20**→you
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey Roofing site** (`mabrey-roofing/` — King Maker's FIRST PAYING CLIENT, the live deliverable) + the **KM firm site** (`king-maker-site/` → kingmakerseo.com) + **Summit & Oak** (`summit-oak-roofing/`, the blessed density-era reference) + the **component library** (`vault/component-library/`) + the **launch-builder / WO workflow** + the **skill/gate spine** + the **design doctrine + PLAYBOOK** + the **audit-page engine** + GTM/pricing + coordination with vault-agent / n8n / meta-ads / cos.

> ⭐ **YOUR BASE CORPUS — read in this order. They stand VERBATIM; this file is the DELTA on top:**
> 1. `AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` (**vault-agent OS16 — the GOVERNING Mabrey brief**: §1 client facts, §3 truth surgery, §4 locked strategy, §8 pending intake, §9 do-not list)
> 2. `AGENT-WEBSITE-ENGINEER-20-2026-07-06.md` (WE19 — its §4/§5/§8 carry forward; note its *mission framing* is SUPERSEDED by #1)
> 3. `AGENT-WEBSITE-ENGINEER-17-2026-06-27.md` + `-17-SYNC-2026-07-04.md` + `-18-2026-07-04.md` (the WE7→WE18 §4/§5/§8 corpus)
> ⭐⭐ **DESIGN LAW:** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (kmwe auto-loads both). Read before any client-site UI.
> **Compound, don't re-derive.** Inherited §4/§5/§8 items below are carried verbatim + attributed.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)

1. **READ loop:** reread THIS file in an ultrathink loop until a pass yields no new info (min 3). Name what each pass ADDED.
2. **Preflight:** fire `/kmwe` — loads the gates + doctrine + PLAYBOOK. (Last run: all green, 13/13 ×2 self-tests, canary logger firing.)
3. **RE-VERIFY these volatile claims (dated 2026-07-07 ~22:50) by RUNNING the commands — a handoff fact is a LEAD, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -3   # expect 6288297 tip; remote -v EMPTY; status CLEAN
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" log --oneline -1  # expect 3f427a1, remote EMPTY (untouched this arc)
   netstat -ano | grep -E ':3200|:3210'    # :3200 dev SHOULD be up (Joseph's live canvas); :3210 down
   for u in http://localhost:3200/ https://mabreyroofing.com https://www.kingmakerseo.com; do printf '%s -> ' "$u"; curl -sL -o /dev/null -w '%{http_code}\n' "$u"; done
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY
   ```
4. **Mailbox:** empty at handoff. Ack ONLY what you newly handle. **Never touch `human`'s mailbox.**
5. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, ask which. ⚠️ The **#1 pending item is the 🔴 invisible-text sweep** (§3) — it is a confirmed defect on client-facing pages, but it is still Joseph's call whether that or the red-treatment verdict goes first.

---

## 1. What this is

King Maker sells done-for-you authority contractor websites + organic SEO. **Mabrey Roofing & Construction (Durham NC; Sean Mabrey, veteran-owned) is the FIRST SIGNED, PAYING client** — $497/mo CMO retainer (Joseph = CMO) + rev-share. The deliverable: rebuild **mabreyroofing.com** as the enterprise organic engine on the S&O-derived clone at `mabrey-roofing/`. It is also **THE case-study asset** ($1.8M→$10M documented growth), so honest counts, real data, and instrumented receipts are *part of the product*. Calls are the deliverable; the site's job is to generate them.

**WE20's arc (this session)** was two halves: (A) the **§11 execution** — the S&O kill-pass + truth surgery + 3 new cities, taking the clone from "S&O with Mabrey's name" to an honest first-client site; and (B) a long **live design forge with Joseph in rapid/edit-mode** — a full dark→light color correction, a universal hero, total glow removal, and a site-wide "red treatment" experiment, plus a materials expansion. Half of (B) is **pending Joseph's eyeball verdict** and is deliberately reversible.

---

## 2. ⭐⭐ CURRENT STATE (volatile — captured by RUNNING commands, 2026-07-07 ~22:50)

### A. Repo / working-tree three-way (the invisible-work trap)

| | State |
|---|---|
| **`mabrey-roofing/`** | branch `master` · tip **`6288297`** · **working tree CLEAN (0 uncommitted)** · **NO GIT REMOTE** 🔴 |
| **`summit-oak-roofing/`** | `3f427a1` · **NO REMOTE** 🔴 · untouched this arc |
| **`king-maker-site/`** | on-disk, **untracked**, live on kingmakerseo.com (200) |
| **`kingmaker-seo-audit/`** | on-disk, untracked. Live: kingmaker-seo-audit.vercel.app/mabrey-roofing (200) |
| **DEPLOYED-but-uncommitted** | none for Mabrey (Mabrey has **never been deployed** — no `.vercel` dir; WE19 deleted it) |

🔴 **Recovery exposure #1 + #2: BOTH repos are remote-less.** `backup-all.mjs` does **not** cover them. Nothing was lost this arc (tree is clean, everything committed locally), but a disk loss loses everything. **This session did NOT close that gap.**

### B. This arc's commits (all local-only, `mabrey-roofing`)

```
6288297  Materials grid: transplant blessed spec-sheet-card anatomy (storm/depth cards)
3b599f3  Materials: add Copper & Zinc + Roof Coatings (7 -> 9 cards, clean 3x3)
cb24fd3  Red treatment site-wide (Opus scoped, Sonnet 5 executed, Opus gated)      ← THE EXPERIMENT
334b62a  Remove all glow effects site-wide (Opus scoped, Sonnet 5 executed)
2d6fe28  Universal hero: kill the per-page zoom drift
88671f0  Universal hero on all 27 inner-page templates
66d8eb7  gitignore session capture PNGs
13aae17  Site-wide color correction (dark->light at the component ink layer)
4ab4d08  Mabrey truth surgery + S&O kill-pass                                       ← THE §11 WORK
```

### C. Servers / hosts

- **`:3200` = Next dev server, UP** (`WATCHPACK_POLLING=true npm run dev -- -p 3200`). **This is Joseph's live canvas — keep it up.**
- `:3210` = down. Used *only* for prod-build gates (`npx next start -p 3210`) — the `doorway-check` + `reachability-check` scripts require it.
- `mabreyroofing.com` → **200 = Sean's OLD WordPress site. DO NOT TOUCH DNS.**
- `kingmakerseo.com` 200 · `kingmaker-seo-audit.vercel.app/mabrey-roofing` 200.

### D. ⚠️ Gate status at tip `6288297` (honest, freshly run)

| Gate | Result |
|---|---|
| `tsc --noEmit` | ✅ clean |
| `npm run build` | ✅ **141/141** static pages (was 139; +2 material routes) |
| axe (12-page harness, reduced-motion) | ⚠️ **2 SERIOUS** — `/materials` (4 nodes) + `/materials/copper-roofing` (10 nodes), both `color-contrast` |
| doorway-check | ✅ PASS (31.5% max pairwise) — *last run at `4ab4d08`; needs :3210 to re-run* |
| reachability-check | ✅ 133/133 — *last run at `4ab4d08`* |

🔴 **The a11y floor ("axe 0 serious") is NOT currently met.** Earlier "0 serious ×12" claims were true only for the *old* 12-page set, which excluded `/materials`, material detail pages, `/terms`, `/privacy-policy`, and the storm service page. See §3-1.

---

## 3. ⭐ OPEN LOOPS (by type — each with a Definition of Done)

### 🔴 1. IN-FLIGHT / CONFIRMED DEFECT — the invisible-text sweep (dark-register `text-white` on light surfaces)

The WE20 color correction (`13aae17`) used a **hand-enumerated file list** and missed ~14 files. They still carry `text-white` and render **white-on-white**.

**Machine-verified evidence (do not re-derive):**
- `/terms` h2 "No Guarantees": computed `color: rgb(255,255,255)` on `background: rgb(255,255,255)`, `visibility:visible`, `opacity:1`, 768×28px → **literally invisible**. Same on `/privacy-policy` ("Information We Collect"). Both are **client-facing legal pages.**
- axe **VIOLATIONS** (serious): `/materials` → `RelatedArticles` guide-card titles (`.text-[17px].text-white`) + one heading; `/materials/copper-roofing` → `SpecTable` `td .text-white.font-semibold` ×5+.
- ⚠️ **axe does NOT catch the `/terms` case** — it returns it as **`incomplete` (needs review), 14 nodes**, because the background is indeterminate. **`0 violations` ≠ no invisible text.**

**Candidate files** (`grep -rc "text-white" components app --include="*.tsx"`), minus the intentional dark surfaces:
`app/terms/page.tsx`(3) · `app/privacy-policy/page.tsx`(3) · `components/service/ServiceDepth.tsx`(3) · `components/service/ProsCons.tsx`(3) · `components/service/CommercialSystems.tsx`(3) · `components/service/SpecTable.tsx`(1) · `components/service/VariantList.tsx`(1) · `components/article/ArticleShell.tsx`(2) · `components/RelatedArticles.tsx`(2) · `components/Breadcrumbs.tsx`(2, still rendered on blog/glossary/resources detail) · `components/trust/CaseStudyCard.tsx`(1) · `components/trust/LangSwitch.tsx`(2) · `components/trust/VideoTestimonials.tsx`(3, array empty→unrendered) · `app/about/page.tsx`(1)

**KEEP (intentional dark surfaces — do NOT sweep):** `Hero.tsx` · `CtaBand.tsx` (navy) · `AlertBar.tsx` · `BeforeAfter.tsx` (on-image labels) · `cta.tsx` (red button text) · `Footer.tsx` (logo "M") · `app/page.tsx` (navy bands) · `Header.tsx` · `StickyMobile.tsx` · `ReviewButton.tsx` · `ReviewSnippet.tsx` (renders inside the navy CtaBand) · `PageHero.tsx` (dead file).

**Transform:** `text-white`→`text-ink` (headings) / `text-body`, `text-white/90`→`text-body`, `text-white/85|70|60`→`text-mist`, `text-redink`→`text-brand`.
**DoD:** grep-verify 0 residual `text-white` outside the KEEP list · `tsc` + `build` green · axe on an **extended** page set = 0 serious **AND** 0 `incomplete` color-contrast on `/terms` + `/privacy-policy` · vision-confirm the legal pages + `/materials/copper-roofing`. Joseph has been told and asked twice; he chose to hand off first.

### 🔴 2. DECISION PENDING (Joseph) — the "red treatment" verdict

The whole red experiment is committed at **`cb24fd3`** (+ the home-page portion, also inside `cb24fd3`). Joseph asked for it site-wide explicitly ("apply it to the entire home page… I want to make sure I like it") and has **not yet given a verdict.** Three flags were surfaced to him and are unresolved:

1. **Underlines were ADDED, not just recolored.** `SectionHeading.underline` default flipped `false→true` **and** `BlockHeading` gained a brand-new red underline (50 call sites). Many pages now have section underlines that never existed.
2. **Photo tiles got red frames** (home bento ×5, storm photo, about story photo) — they're `so-card` bordered images caught by the "all cards" rule.
3. **Forms/calculators were EXCLUDED** (`EstimateQuiz`, `ContactForm`, `FinancingCalculator`, `RoofCostCalculator`, `LeadGate`) — they stay blue.

**Exact revert recipe if he says no:**
```bash
git revert cb24fd3          # undoes home + site-wide red in one shot
# then, if he wants the underlines gone entirely:
#   components/SectionHeading.tsx : underline = true -> false ; underlineClassName = "!bg-red" -> ""
#   components/blocks.tsx         : delete the {as === "h2" && <HeadingUnderline ... !bg-red />} line
# ⚠️ NOTE: components/service/MaterialGrid.tsx (commit 6288297) hardcodes `border-2 border-red/60`
#    and is NOT touched by reverting cb24fd3 — fix it separately.
```
**DoD:** Joseph's explicit keep/trim/revert per flag; state recorded here.

### 🔴 3. DEPLOY-BLOCKING HONESTY GAP — the homepage logo marquee

`app/page.tsx` §2 renders a scrolling marquee of **6 real cert logos: BBB · Angi · GAF · NAHB · NRCA · James Hardie** (`public/mabrey/logos/`). The §3 truth surgery stripped every *textual* cert claim (GAF Master Elite, NAHB membership, BBB A+) — **but the LOGOS still ride the homepage.** That is an unverified affiliation claim in image form, and it directly contradicts the real-or-absent floor.
**DoD:** either Sean confirms each affiliation (§8 intake item #3) or the marquee is cut/replaced before any deploy. **Must be resolved before the site is shown publicly.** (WE19 forged this marquee with Joseph on localhost; it was never truth-audited.)

### 🟡 4. Hero subhead truncation (from the universal-hero fix)

`components/Hero.tsx` applies `line-clamp-3` to the subhead so long copy can't re-grow the band and reintroduce zoom drift. On long-intro pages (`/commercial-roofing`, city pages) the subhead now ends **mid-sentence with "…"**. Options: (a) tighten the source `intro`s, (b) drop to `line-clamp-2`, (c) purpose-write short hero subheads per page. Joseph was told; no verdict.

### 🟡 5. Carried code debt / small items
- `components/PageHero.tsx` is **DEAD** (zero imports; only comment mentions in `CallFirstAside.tsx` + `location/ComboPage.tsx`). Delete or keep as reference.
- `lib/snippet-tables.ts` `LIFESPAN_TABLE` has no **copper** row (materials are now 9).
- The **7 original material pages** still say **"Raleigh, NC"** in `h1`/`metaTitle` while Durham is the home base (the 2 new ones say Durham).
- `heroImage` on every material is **vestigial** (`public/materials/` doesn't exist — all 7 original paths are dead) because the universal `Hero` hardcodes `/mabrey/hero-nano-a.png`. Harmless, but the *same luxury-home photo now heads all ~36 routes* — a launch-quality item.
- `MaterialGrid` transplant deltas Joseph should confirm: **tagline dropped** (no slot in the blessed anatomy), **`→` arrow dropped**, **corner notch red→blue** (`so-fold`, matching the storm cards exactly).
- `BUSINESS.stats` still soft: `roofsInstalled: "Hundreds"`, `yearsInBusiness: "15+"` — confirm per §8 intake.

### 🟡 6. THE PROJECT PLAN (the actual build — §5 of the governing brief)
**Phase A — the one-pagers, one at a time onto localhost for Joseph's eyeball:** Home (content pass) · About · **roof-replacement** (the money-page exemplar) · storm-damage hub · service-areas hub · services hub · financing (+payment-calculator) · FAQ · contact · warranty · certifications (real-or-absent!) · commercial-roofing · gallery (honest placeholder) · reviews (real aggregate, empty cards) · roof-cost-calculator + roofing-cost · **Other Services** (the contained GC section — **NOT built; no route exists**) · privacy/terms · `es/`.
**Phase B:** roll each blessed exemplar across its family (all `services/[service]`, all `storm-damage/[type]`, `locations/[city]` ×17, materials, resources articles).
**First location exemplar target: Cary** (agreed).
> ⚠️ Note: the design forge (colors/hero/glow/red) consumed this session. **Phase A content passes have NOT started.** The site is structurally + truthfully sound but the per-page content forge is the real remaining work.

### 🟡 7. Awaiting USER (Joseph) / OTHER
- Awaiting Joseph: red-treatment verdict (#2) · invisible-text sweep GO (#1) · marquee decision (#3) · subhead truncation (#4) · recovery mechanism for the two remote-less repos.
- Awaiting Sean (via Joseph) — **§8 pending intake of the governing brief:** real completed-jobs per town · the 16 real GBP review texts · cert/manufacturer standing · exact `legalName` + license # + years-in-business · real photos (jobs/crew/office/Sean) · his "replace my other services" answers.
- **Housekeeping:** vault inbox **15 files** pending ("ingest inbox") · cg-main current-state STALE (741 new sessions).
- **S&O:** the WO_26 v3 city transplant is still committed-not-deployed-not-eyeballed (carried from WE19; nobody has touched it).

---

## 4. Locked decisions — CARRIED VERBATIM + NEW

### Carried from the governing brief (vault-agent OS16, `-07`) — §4 LOCKED STRATEGY, verbatim
> ⚠️ **Joseph's hard rule (2026-07-07, twice-flagged):** settled doctrine — duplicate content, doorway, dilution, real-vs-fabricated, the picks below — is the FLOOR you build on. Do NOT re-surface it, caveat it, or teach it back to him. If a verification confirms known doctrine, say "confirmed" and move on. He picks; you build. Raise something ONLY if it's genuinely new information or a true conflict with a lock.

1. **~95% pure roofing site.** The audit's Finding D (identity dilution across trades) is the disease being cured.
2. **17 location pages, ALL built now:** Durham (office anchor) · Chapel Hill · Cary · Morrisville · Apex · Hillsborough · Raleigh · Wake Forest · Holly Springs · Fuquay-Varina · Pittsboro · Garner · Knightdale · Zebulon · Clayton · Wendell · Rolesville. ✅ **DONE by WE20** (wrote chapel-hill, hillsborough, pittsboro; GEOGRAPHY aligned).
3. **General-contractor work = one small contained "Other Services" section.** 1-3 pages max, NOT interlinked into the roofing silo beyond nav, NOT chasing GC keywords. A dedicated GC site is PARKED as Phase 2. Do not build custom-home/GC content beyond this section.
4. **Location pages ship WITHOUT proof modules** (empty-guarded). **NEVER fabricate a job, review, testimonial, or cert — FTC floor + the client's actual name.**
5. **One office = Durham pack + organic everywhere else.** Never imply a Raleigh office.
6. **Client-facing numbers = MODEL.md** (`~/.claude/skills/km-engine/MODEL.md`): conversion 5-7% · floor 0.75% / headline "1-2%" / upper ~2% · money-term denominators only · week-1 = "foundation, zero leads" honesty. **Never quote master-plan §8 numbers.**
7. **AI-GEO layer** per `W-AI_GEO_PLAYBOOK.md`: SSR non-negotiable, `.seo-answer` extraction blocks, Bing bootstrap at launch, NO llms.txt, schema = insurance never a promised lever.
8. **Off-page** (Joseph's lane): GBP → reviews → citations-hygiene; review flow per `MABREY_REVIEW_SOP.md` (ask-everyone/gate-no-one).

### Carried from the governing brief (`-07`) — §9 DO-NOT LIST, verbatim
> *(each one is a landmine that's already been stepped on once)*
- Do NOT fabricate reviews/jobs/certs/team members (FTC + first-client trust — the demo data in the clone is exactly this; §3 kills it).
- Do NOT imply a Raleigh office or fake ANY location presence.
- Do NOT touch mabreyroofing.com DNS.
- Do NOT ship S&O identity anywhere (metadata titles included).
- Do NOT quote master-plan §8 numbers to anyone.
- Do NOT build GC/custom-home content beyond the contained Other Services section.
- Do NOT edit `components/` to rebrand (content → `lib/`).
- Do NOT re-explain settled doctrine to Joseph or caveat decided strategy.
- Do NOT deploy without his GO; do NOT claim done without the gates run.

> 🆕 **WE20 clarification on rule #7** (so you don't misread the commit log): WE20 edited `components/` heavily — the color correction, glow removal, universal hero, red treatment, and the `MaterialGrid` transplant. **None of those are *rebrand* edits.** The rule bans moving *client content* into components; **design/structural work on the shells is exactly where it belongs.** Client content still lives in `lib/`.

### Carried from WE19 (`-06` §4), verbatim
- **No strikes against WE19 §4** (density doctrine, transplant law, forge loop, judgment-zero WO class, numbers-glow*, PLAYBOOK zero-search, "let it breathe" — all stand). *(*see NEW #1 below — numbers-glow is now struck for the Mabrey light register only.)*
- ⭐⭐ **THE THEME-INVERSION RE-SKIN (how a light client clones the dark S&O).** S&O is **dark-native** (`globals.css` body = charcoal; the red-glow is HARDCODED as `rgba(216,38,44,…)` literals inside component class strings, NOT just `@theme` tokens). Re-skinning to a LIGHT palette is a **full dark→light theme inversion + de-glow**, NOT a lib-only rebrand. Two registers never crossed: S&O = red-glow-on-charcoal; Mabrey = blue-brand-on-white with scarce red.
- ⭐ **MABREY POSITIONING (LOCKED via AskUserQuestion, Joseph 2026-07-05):** clone S&O's density grammar + animations · roofing-primary · reviews = real quotes, NO aggregate headline · imagery = all Higgsfield AI · palette white/blue/charcoal + scarce red. *(Struck in part: the "custom-home-builder prestige spike" positioning was replaced by §4.3's contained Other-Services rule when the -07 brief landed.)*
- ⭐ **BUILD INLINE AT-LEVEL FOR A TASTE-HEAVY RE-SKIN** (no-downregulate). Delegate mechanical breadth; keep taste inline.

### 🆕 NEW LOCKS (WE20 arc)
1. ⭐⭐ **GLOW IS DEAD — FOR THE MABREY LIGHT REGISTER.** Joseph, 2026-07-07: *"all glow effects need to go ahead and get dropped because they don't really look right on this palette."* All 39 `0_0_` radial halos removed (15 `GLOW_STAT/DOT/ICON` consts zeroed). **This strikes the S&O-era "numbers-glow floor" for this register only** — it was a dark-register rule. **Do NOT restore glow citing doctrine.** The S&O register keeps its glow.
2. ⭐ **ONE UNIVERSAL HERO.** `components/Hero.tsx` is the single hero on **every** page including home. It is **fixed-height (`h-[86vh] min-h-[640px]`)** + `line-clamp-3` subhead **specifically so the `object-cover` photo crop is byte-identical across pages.** Never change to `min-h` — that reintroduces per-page zoom drift. `PageHero.tsx` is dead.
3. ⭐ **CARD-TITLE vs SECTION UNDERLINE — the load-bearing distinguisher.** `HeadingUnderline` **with `height={2}` = a card-title underline → stays BLUE**. **Without a `height` prop = a section H2 underline → red** (under the current experiment). Every sweep must respect this.
4. ⭐ **`.so-card` IS THE CARD SIGNATURE.** Chips (`rounded-full`), form inputs, and section dividers (`border-b/-t/-y`) do **not** carry it. Any "all cards" transform keys on `so-card` + a full `border` token — never on `border border-line` alone.
5. ⭐ **OPUS SCOPES, SONNET EXECUTES, OPUS GATES.** Joseph's explicit working pattern (he says "deploy a Sonnet 5 sub-agent"). Judgment/scoping/root-cause/verification stay on the top tier; mechanical breadth (mass find/replace, scripted transforms) goes to Sonnet 5. **A swarm is the WRONG tool for a uniform transform over shared components** (agents collide on the same files and drift on judgment calls) — use ONE executor with a deterministic script, and fan out only the *verification*.
6. ⭐ **MATERIALS CATALOG IS DELIBERATELY COMPLETE.** A new material page must be a *genuinely distinct material*, not a keyword variant. Class-4 impact, clay/concrete tile, and copper were already **variants inside** existing entries — pages for them would be duplicate-content doorways. WE20 added **Copper & Zinc** + **Roof Coatings** only because both are **offerings Mabrey already claims elsewhere** (copper in `metal-roofing`'s variants; coatings on `/commercial-roofing`) → *zero new install claims*.
7. ⭐ **`shadow-glow` (the soft red drop-shadow under primary red CTAs) was KEPT** — it is `0 14px` *offset elevation*, not a `0_0` halo. Flagged to Joseph; no verdict. The one exception fixed: the blue founder monogram's red bloom → `shadow-card`.
8. ⭐ **HARDCODED COUNTS ARE BANNED.** `"Seven Materials We Install"` rotted the moment materials hit 9. Derive from the array (`{MATERIALS.length}`). This is the honest-counts floor in code form.

---

## 5. Failures & dead-ends — CARRIED VERBATIM + NEW THIS ARC

### Carried from WE19 (`-06` §5), verbatim
- ⭐⭐ **soul_2 GARBLES FAKE TEXT/LOGOS into images ~20-100% of the time.** Every soul_2 hero attempt (4×) baked a garbled fake logo ("LIOVT ROF", "1.3MILLOT OANCAE", "ROVDE") despite hard "no text/logo/watermark" negatives. **The clean hero only came from `nano_banana_pro`.** Lesson: for hero / any text-adjacent architectural gen use `nano_banana_pro`, and ALWAYS vision-QA gens for garbled text before use.
- ⭐ **REAL LOGO SOURCING IS FINICKY — vision-QA every logo + expect aspect/format mismatch.** GAF came as a filled red SQUARE; BBB came PORTRAIT-aspect; EagleView 2.5× wider. Fixes: grayscale unifies a heterogeneous set; a `max-w` cap tames the wide one; use the client's OFFICIAL badge assets for a real launch. Also: **a sourcing agent FLAILED once — re-verify an agent's file deliverables on disk (`ls` + Read), never trust its report alone.**
- ⭐ **THE HERO OVERLAY vs THE READABILITY FLOOR.** Reducing the hero scrim 75% risked washing out the white money-copy H1. **The floor is never traded, even in rapid** — overlay-down + text-shadow + bolder copy, then vision-verify.
- ⭐ **`globals.css` CHANGES: HMR is unreliable → verify or restart.** Tailwind `@theme`/globals-token changes are the edit-mode "needs a server restart" class.
- ⭐ **Edit tool: whitespace/comment mismatches burn you.** Grep the exact block first when an Edit fails — don't re-guess the indentation.

### 🆕 NEW THIS ARC (WE20) — the lessons that did not exist at the last handoff

1. 🔴 **A HAND-ENUMERATED FILE LIST IS HOW YOU MISS FILES.** The color correction listed target files by hand → **missed ~14**, including `MaterialComparison` (found only because Joseph happened to open `/materials` days later) and the `/terms` + `/privacy` headings. **Sweep by PATTERN over every file, then grep-verify 0 residual.** This single mistake produced §3-1.
2. 🔴 **`axe: 0 violations` does NOT prove there is no invisible text.** White-on-white on `/terms` is returned as **`incomplete` (needs review)**, not a violation, because axe can't resolve the background. Any a11y harness must surface `results.incomplete` for `color-contrast`, not just `results.violations`.
3. 🔴 **`axe` passing does NOT prove the CSS loaded.** An entirely unstyled page has *high* default contrast and sails through axe. Never use axe to rule out a stylesheet failure.
4. 🔴 **I CLAIMED 3 PARALLEL VISION AGENTS AND DISPATCHED 1.** The verification fan-out for the site-wide red treatment covered 3 pages, not 10 — so `/materials` was never vision-checked and the invisible comparison table shipped. **The claim must match the tool calls.** Say what you actually did.
5. ⭐ **A backgrounded `next start` inside a single Bash call is TORN DOWN when that call returns.** The next Bash call's captures then hit a dead/zombie server and render **unstyled** — two vision agents correctly reported "broken page," and it was a capture artifact. Use `nohup … &` or a separate `run_in_background:true` call, **and assert a styled render** (`getComputedStyle(body).fontFamily` contains the real font, not `serif`) before trusting any capture.
6. ⭐ **`fullPage: true` screenshots false-flag scroll-reveal sites.** Below-fold `whileInView` content sits at `opacity:0`, so the FAQ + closer looked "empty/dark." Scroll through with settle, or capture per-section via `scrollIntoView` + wait. (Confirms `reference_demo_engine_gotchas`.)
7. ⭐ **`HeadingUnderline` animates over 5 s.** A fast scroll-through catches underlines mid-reveal, so width-based DOM filters undercount them. Assert the **computed color**, not the rendered width — or wait out the animation.
8. ⭐ **Tailwind opacity modifiers compile to `oklab()`, not `rgb()`.** `border-red/60` → `oklab(0.52192 0.174256 …)`. A verification regex looking for `rgb(192, 32, 38)` silently reports **0 matches** on 107 correctly-red borders. `!bg-red` (no opacity) *does* compile to `rgb()`.
9. ⭐ **SONNET 5 MISSED A SECOND-ORDER RENDER CONSEQUENCE.** Making the home hero universal, it copied the markup verbatim **including `min-h-[86vh]`** — correct code, wrong outcome: home's copy is short so `min-h` never grows, but inner pages have long intros, so the band grew and `object-cover` cropped the photo tighter → **per-page zoom drift.** Its own vision agent *caught the symptom* but it **mis-framed it** ("CTA sits lower") and **flagged instead of fixing**. Two causes: (a) rapid-mode's "first workable option, flag edge cases" disposition — **a sweeping change should auto-escalate OUT of rapid**; (b) a genuine judgment gap — *identical markup ≠ identical render when the content differs.* **The durable fix is process: verify the RENDERED result across every page-type variant, not two happy-path pages plus a flag.**
10. ⭐ **THE `scripts/` CONTAMINATION CLASS.** The S&O clone's *gate scripts* carried S&O constants that the `lib/`+`app/` sweep can't see: `reachability-check.mjs` had S&O's Vercel host in `INTERNAL_HOSTS` → **0 targets → a VACUOUS PASS**; `doorway-check.mjs` hardcoded a blog slug I'd deleted → hard fail. **On any clone, grep `scripts/` too — and treat a 0-target gate "pass" as a FAILURE.**
11. ⭐ **The "template is empty-guarded everywhere" claim held EXCEPT one place.** `ReviewSnippet` did `REVIEWS[index % REVIEWS.length]` → **divide-by-zero → build-time crash** the instant the fabricated reviews array was emptied. Guard added. Expect one more of these when you empty `CASE_STUDIES`-consuming surfaces.
12. ⭐ **Truth surgery goes wider than the brief's list.** Beyond §3, the same fabrication class lived in: homepage inline testimonials, `BEFORE_AFTER`, `GALLERY`, `VIDEO_TESTIMONIALS`, the projects hub — **and the legal pages literally said "Mabrey Roofing is a fictional brand."** The extrapolation rule fires: when you find one instance, audit the class.
13. ⭐ **A "transplant" is verifiable mechanically.** After copying the spec-sheet-card anatomy into `MaterialGrid`, a **computed token diff** (border, bg, underline, dot, index, icon, `so-fold`, footer stat, tag) against the live storm card returned **ZERO differences.** Use this instead of eyeballing "looks the same."
14. ⭐ **Two conflicting briefs can be live at once.** The session prompt pointed at the `-06` handoff; the **mailbox** carried a newer `-07` brief that superseded its entire mission framing. **Check the mailbox before trusting the prompt's brief.**

---

## 6. Tooling gotchas (delta on base §6 — those stand)

```bash
# TYPECHECK is safe while dev runs. BUILD IS NOT — it fights dev over .next.
npm --prefix "C:/Users/josep/Claude Gravity/mabrey-roofing" run typecheck    # safe anytime
# To build: kill :3200 first, build, then restart dev.
```
- **The doorway + reachability gates need a PROD server on `:3210`**, not dev:
  `npm run build && nohup npx next start -p 3210 & && npm run doorway-check && npm run reachability-check`
- **`nohup … &` for `next start`** — a plain `&` inside one Bash call dies when the call returns (see §5-5).
- **Reusable probe scripts live in the repo root, gitignored (`.*.cjs`)** — 50+ of them. The ones WE20 built and you will want:
  - **`.axe-multi.cjs`** — the reduced-motion axe harness. ⚠️ **Reports `violations` only.** Extend it to also print `results.incomplete` for `color-contrast`, and add `/materials`, `/materials/[slug]`, `/terms`, `/privacy-policy`, `/services/storm-damage-roof-repair` to its page list.
  - `.strip-glow.cjs` · `.recolor-treatment.cjs` · `.recolor-main.cjs` · `.recolor-service.cjs` — the deterministic sweep scripts (the pattern to copy for the invisible-text sweep).
  - `.universal-hero.cjs` · `.swap-brand.cjs` · `.kill-arrays.cjs` · `.add-cities.cjs` · `.we20-verify-shots.cjs`.
- **Capture PNGs are gitignored** (`.*.png` added this arc). Two slipped into `13aae17` and were untracked in `66d8eb7`.
- **The verify-gate Stop hook auto-discovers `worktrees/*/web`** — `mabrey-roofing/` is **NOT guarded**. The gates here are **discipline, not hooks.** Run them anyway.
- **Vision-QA pattern (no inline screenshots):** capture to disk with a scroll-through + settle, then a background agent `Read`s the PNGs and returns a TEXT verdict.

---

## 7. Deploy + verify (fenced)

```bash
# ⛔ MABREY HAS NEVER BEEN DEPLOYED. No .vercel dir (WE19 deleted it).
#    mabreyroofing.com DNS -> Sean's OLD WordPress (200). DO NOT TOUCH DNS.
#    Build-phase deploys go to a *.vercel.app URL ONLY, and ONLY on Joseph's explicit GO.
#    ⚠️ When Joseph says "deploy an agent," he means DISPATCH A SUB-AGENT — not deploy the site. Confirm.

# THE FULL GATE (run from mabrey-roofing/, dev server killed first):
npm run typecheck
npm run build                                  # expect 141/141
nohup npx next start -p 3210 >/dev/null 2>&1 & # prod server for the gates
npm run doorway-check                          # anti-doorway (<40% pairwise) — BLOCKING
npm run reachability-check                     # no-orphan BFS (expect 133+/133+)
node .axe-multi.cjs                            # a11y — EXTEND IT FIRST (see §6)
# then: kill :3210, restart dev :3200 (Joseph's canvas)
nohup env WATCHPACK_POLLING=true npm run dev -- -p 3200 >/dev/null 2>&1 &

# Vercel (only on GO): npx vercel@latest deploy --prod --yes   (account josephspells-2634)
#   CLI v54 prints a JSON-fragment tail that LOOKS broken — it isn't. Verify by curl on CONTENT markers (the PROD-STALE trap).
# Recovery: node backup-all.mjs  — ⚠️ does NOT cover mabrey-roofing or summit-oak-roofing (no remotes).
```

---

## 8. ⭐ Taste & calibration ledger — CARRIED VERBATIM + NEW

### Carried from the governing brief (`-07` §6), verbatim
- **Density Era doctrine** (`KINGMAKER_DESIGN_DOCTRINE.md` §6) is YOUR operating contract **whatever model you run**: maximal-draft, 90-110% over-poured, **empty space is a bug**, first workable option on edits (30-60s), **NO option surveys**, batch-verify every 3-5 edits, **show heavy — only Joseph trims.** Proposing the minimal "safe" version first = you already failed.
- **Floors that never move:** a11y (axe 0 serious under reduced-motion — it races framer-motion reveals otherwise) · honest counts · real-or-absent trust signals · NC insurance-copy compliance (no "$0 deductible", no public-adjuster framing) · `.seo-answer`/heading extraction · money-copy readability.
- **Joseph calibration:** caveman TLDR bullets · moderate emoji (✅/❌/👍/⚠️/🔴), **NO exclamation points** · "ultrathink" is his depth keyword · directional-intensity instructions ("300% denser", "half the motion") are his ideal input — **honor the % exactly** · deploy ONLY on his explicit GO · fix-format = **hyperlink + Was/Fix, every time** · **never re-explain settled doctrine** · he model-switches constantly — **never inflate the model you run on.**

### Carried from WE19 (`-06` §8), verbatim
- ⭐⭐ **Joseph iterates trust-bars / logo-walls HARD + reverses freely.** Show the option, honor the revert instantly, **don't sunk-cost a treatment.** He picks by RECOGNITION/trust.
- ⭐⭐ **"greatly increase the space," "double the intensity," "reduce by 50/75%" = literal directional-% instructions.** Execute the exact factor. He'll fine-tune from there.
- ⭐ **The readability floor holds even in rapid/edit-mode.**
- ⭐ **Edit-mode cadence he likes:** first-workable option executed immediately (no A/B surveys), ~30-60s per tweak, batch-verify (he watches localhost live and reacts).
- ⭐ **He asks good architectural questions mid-forge** — give the honest expert take, not a reflexive yes/no.
- **All of WE19 §8 stands:** favicon=icon · density-first · "let it breathe" · "another blessed section" = capture · the referral flywheel · he model-switches · no inline screenshots.

### 🆕 NEW THIS ARC (WE20)
- ⭐⭐ **THE REVERSE-FREELY RULE GENERALIZES (2× → extrapolation fired).** WE19 saw it on logo walls. WE20 saw it on **any visual treatment**: red proof-cards → *"revert those changes, actually"* → then he re-asked for the red underline alone → then the red eyebrow → then *"revert the straight answer back to blue."* **He uses localhost as a live canvas.** Show it, revert instantly, never argue for a treatment he just killed. **Keep `:3200` up at all times.**
- ⭐⭐ **"I want to make sure I like it" = SHOW IT MAXIMALLY.** When he asks for a treatment site-wide to evaluate, apply it comprehensively (even to the borderline cases) and **flag the borderlines explicitly** — do not pre-trim on his behalf. Then he trims. This is the water-bottle law in the evaluation loop.
- ⭐⭐ **He explicitly directs the model split.** *"Scope it out on Opus 4.8 and then send a Sonnet 5 sub-agent to complete the work"* / *"spawn an agent swarm."* Honor it — **and push back with reasoning when a swarm is wrong** (uniform transform over shared files → one executor; parallel verification → fan out). He respects the reasoning; he does not want reflexive fan-out.
- ⭐ **He asks meta questions about model behavior and wants an honest, balanced diagnosis.** *"Why did Sonnet 5 kind of fuck that up? Should we only use it for spot changes?"* → don't throw the model under the bus, don't over-defend. The real answer separated **mode** (rapid's flag-and-move) from **model** (a second-order reasoning gap). He wants the reasoning **shown** on analysis turns.
- ⭐ **"Deploy" in his phrasing often means "dispatch a sub-agent," not deploy the site.** Given the DNS landmine, **always confirm before any production deploy.**
- ⭐ **"Make the cards like the ones from [X] page" = TRANSPLANT, not compose.** The transplant law is live in his vocabulary. Copy the blessed anatomy at 100%, map the data, and prove it with a computed token diff.
- ⭐ **When he asks "what page did you do that on?" — name the SHARED COMPONENT and every surface it renders on**, not just the page he pointed at. He is checking blast radius.
- ⭐ **He rewards root-cause + verification rigor** ("Good job. Nice Titan.") and reacts badly to a symptom-level fix. Diagnose one layer up.
- ⭐ **He pastes a screenshot and says "this section here."** You are expected to identify the exact component from the pixels. Grep by the visible copy string.

---

## 9. Coordination

| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball on everything** · offer numbers · outreach. **Never touch his mailbox** (115 unread, not yours). |
| `vault-agent` (OS16) | Authored the governing Mabrey brief; owns vault + fleet coordination. 15 inbox files pending ingest. Route cross-lane questions here. |
| separate builder (Joseph-run) | Executes judgment-zero WOs. |
| `cold-outreach-specialist-6` | A2P owner — never overwrite compliance copy. |
| `cyber-security-specialist-1` | Owns security layers. |
| `n8n-claude-architect-1` | PARKED until A2P clears. |

**Mailbox at handoff: EMPTY** (WE20 acked the one vault-agent handoff message it handled). Other agents have unread mail — it is **not yours**; leave it.

---

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)

**Read FIRST:** this file → `AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` (**AUTHORITATIVE on Mabrey strategy/client facts on any conflict**) → `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (**AUTHORITATIVE on design/transplant**) → `~/.claude/skills/km-engine/MODEL.md` (**AUTHORITATIVE on any client-facing number**).

| What | Where | Note |
|---|---|---|
| The repo you own | `C:/Users/josep/Claude Gravity/mabrey-roofing/` | tip `6288297`, local-only |
| Governing brief | `AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` | authoritative on client facts |
| WE19 handoff | `AGENT-WEBSITE-ENGINEER-20-2026-07-06.md` | §4/§5/§8 valid; **mission framing STALE** |
| Master plan | `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` | v1.2 banner governs; **§8's chains run pre-correction math — never quote §8** |
| Live audit (client sees) | kingmaker-seo-audit.vercel.app/mabrey-roofing | 200 |
| Review SOP | `king_maker_outbound/MABREY_REVIEW_SOP.md` | governs any review UX |
| AI-GEO layer | `king_maker_outbound/W-AI_GEO_PLAYBOOK.md` | |
| Visual reference | `summit-oak-roofing/` @ `3f427a1` | the blessed **dark** register |

**Mabrey codebase — the files WE20 touched most:**
- `components/Hero.tsx` — **the universal hero** (fixed height; do not make it `min-h`).
- `components/SectionHeading.tsx` — `underline = true`, `underlineClassName = "!bg-red"` (**the red-experiment levers**).
- `components/blocks.tsx` — `BlockHeading` now renders a red underline for `as="h2"` (**added by the experiment**).
- `components/service/MaterialGrid.tsx` — the spec-sheet-card transplant.
- `components/service/ServiceContentCards.tsx` — **`DepthSection` = the blessed spec-sheet-card source.**
- `components/service/MaterialComparison.tsx` — fixed (was invisible).
- `components/PageHero.tsx` — **DEAD.**
- `lib/business.ts` · `lib/site.config.ts` (17 towns) · `lib/cities.ts` (17 entries) · `lib/materials.ts` (9) · `lib/trust.ts` · `lib/reviews.ts` (empty) · `lib/gallery.ts` (empty) — the truth-surgered content layer.
- `scripts/doorway-check.mjs` + `scripts/reachability-check.mjs` — **fixed this arc** (were S&O-contaminated).

**Memory (auto-loads):** `project_mabrey_homepage_mockup` (updated by WE20 — despite the filename, it now describes the REAL build) · `project_mabrey_cmo_engagement` · `project_design_doctrine_v14` · `feedback_no_downregulate_judgment` · `feedback_forge_loop_judgment_zero` · `reference_contractor_demo_media` · `feedback_playwright_verification`.
**Vault:** `vault/inbox/we20-mabrey-truth-surgery-2026-07-07.md` + `we20-design-forge-2026-07-07.md` (both pending ingest).

---
*— WE20, 2026-07-07 ~22:50. THE ARC: took the Mabrey clone from "S&O wearing Mabrey's name" to an honest first-client site — 267 brand swaps, every fabricated review/job/team-member/cert emptied or stripped to real-or-absent, Sean's real story, real place_id/GBP pin, 17 towns (wrote 3), demo framing purged from the legal pages, the vacuous reachability gate exposed and fixed. Then a long live forge with Joseph: the dark→light color correction the WE19 inversion never finished, ONE universal hero (fixed-height so the photo crop can't drift), total glow removal (the numbers-glow floor struck for this register on his call), and a site-wide red treatment that is **committed and awaiting his verdict**. Materials 7→9 by promoting two already-claimed offerings, and the grid rebuilt as a faithful transplant of the blessed spec-sheet card (computed token diff = zero). **What I did not finish, and would do first: the invisible-text sweep — `/terms` and `/privacy-policy` are rendering white-on-white right now, axe is blind to it, and my own hand-enumerated file list is what caused it.** Compound this corpus: carry §4/§5/§8 forward verbatim, add yours.*
