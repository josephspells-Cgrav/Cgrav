# HANDOFF — King Maker website lane → **Website Engineer 20 (WE20)**

**From:** WE19 · **To:** WE20 · **Date:** 2026-07-06 (~01:30) · **Lineage:** WE4→…→WE17→WE18→WE19→**you**
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey whale homepage** (`mabrey-roofing/` — NEW this arc, the imminent deliverable) + the **KM firm site** (`king-maker-site/` → kingmakerseo.com) + **Summit & Oak** (`summit-oak-roofing/`, the blessed density-era reference) + the **component library** (`vault/component-library/`) + the **launch-builder / WO workflow** + the **skill/gate spine** + the **design doctrine + PLAYBOOK** + the **audit-page engine** + GTM/pricing + coordination with n8n / meta-ads / cos / vault-agent + the roofing + AM flagships (OUT unless named).

> ⭐ **YOUR BASE CORPUS = FOUR FILES, all at cg-main root — they stand VERBATIM; this file is the DELTA on top:**
> 1. `AGENT-WEBSITE-ENGINEER-17-2026-06-27.md` (WE17 base — §4 locks / §5 failures / §8 taste, WE7→WE16 verbatim)
> 2. `AGENT-WEBSITE-ENGINEER-17-SYNC-2026-07-04.md` (vault-agent OS15 full-loop sync — prospects, offer, Diamond Blueprint, OS bug corpus)
> 3. `AGENT-WEBSITE-ENGINEER-18-2026-07-04.md` (WE18 — component library + roof-replacement recard)
> 4. `AGENT-WEBSITE-ENGINEER-19-2026-07-05.md` (WE19 — the Density-Era doctrine + transplant law + forge loop + WO_25/26; **read its §4/§5/§8 — they carry forward verbatim**)
> ⭐⭐ **DESIGN LAW (authoritative for client sites):** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (kmwe auto-loads both). Read before any client-site UI.
> Below = STRIKES + this arc's NEW additions. Compound, don't re-derive.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)
1. **READ loop:** reread THIS file + skim the 4 base files in an ultrathink loop until a pass yields no new info (min 3). Name what each pass adds.
2. **Preflight:** fire `/kmwe` — loads the gates + doctrine + PLAYBOOK. Cheap insurance.
3. **RE-VERIFY these volatile claims (dated 2026-07-06 ~01:30) by RUNNING the commands — a handoff fact is a lead, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -2   # expect 4237f9f (WE19 mockup checkpoint); remote -v EMPTY
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" log --oneline -2 && git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" remote -v  # 3f427a1, remote EMPTY (unchanged this arc)
   netstat -ano | grep -E ':3200 |:3000 '   # BOTH were DOWN at handoff — restart :3200 to resume the Mabrey forge
   for u in http://localhost:3200/ https://www.kingmakerseo.com https://kingmaker-summit-oak-roofing.vercel.app; do printf '%s -> ' "$u"; curl -sL -o /dev/null -w '%{http_code}\n' "$u"; done  # localhost was 000 (down); the two live hosts 200
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY
   ```
4. **Restart the Mabrey dev server to resume:** `cd "C:/Users/josep/Claude Gravity/mabrey-roofing" && WATCHPACK_POLLING=true npm run dev -- -p 3200` (background). Then open `http://localhost:3200/` — that's Joseph's eyeball surface.
5. **Mailbox:** empty at handoff. Ack only what you newly handle.
6. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, ask which. ⚠️ The immediate pending item is **the Mabrey homepage live forge** (edit-mode, on :3200) for the imminent whale presentation.

---

## 1. What this is
King Maker sells done-for-you authority contractor websites + organic SEO. **This session (WE19) was one giant arc: building the Mabrey Roofing whale homepage MOCKUP** from scratch, then forging it live with Joseph in edit-mode. Mabrey Roofing & Construction (Durham NC; Sean Mabrey, veteran-owned; a roofer AND custom home builder; the $5-7M→$20M fractional-CMO whale — see SYNC brief §3 + `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` v1.1) needed a redesigned homepage for a presentation. WE = **architect + inline builder** (I built this one inline, at-level, since it's taste-heavy — no-downregulate). The build: cloned the blessed Summit & Oak reference, INVERTED it dark→light to Mabrey's palette, authored an 11-section dense homepage, generated Higgsfield luxury-home imagery, then Joseph rapid-fired edit-mode tweaks on localhost:3200.

## 2. ⭐⭐ CURRENT STATE (volatile — 2026-07-06 ~01:30, re-verify per §0.3)

### A. 🔴🔴 MABREY HOMEPAGE MOCKUP (`mabrey-roofing/`) — the in-flight deliverable
- **NEW standalone Next.js project** `C:/Users/josep/Claude Gravity/mabrey-roofing/` — a **clone of Summit & Oak** (`robocopy` from `summit-oak-roofing/`, node_modules re-installed) then **fully re-skinned dark→light**. Committed **`4237f9f`** (WE19 checkpoint, 323 source files) — **its OWN git repo now, but NO remote** (recovery gap, §3). `.vercel` was deleted (no accidental deploy). **Localhost ONLY — never deploy to mabreyroofing.com (their real domain).**
- **Dev server was on :3200, now DOWN** (stopped when the prior process exited). Restart per §0.4 to resume.
- **What it is:** an 11-section dense homepage in **WHITE bg · royal-blue `#1A489A` brand · charcoal `#3A3A3A` body · SCARCE red `#c02026` (CTA + storm/damage only)**. Roofing-primary positioning with a **custom-home-builder prestige band** as the differentiator + **Sean Mabrey veteran founder band** (E-E-A-T). Sections (in `app/page.tsx`): hero (luxury-home photo, dual CTA) → **trust logo marquee (real cert logos, scrolling, 6 logos)** → "The Straight Answer" split (+ 01/02/03 proof cards) → 6 roofing service cards → custom-home craft band (5-photo bento) → founder/veteran band (navy) → storm & insurance split → blue stats band → reviews → FAQ accordion → navy CTA closer → footer.
- **VERIFICATION STATE — ⚠️ read carefully:** the build passed a FULL green gate (`tsc` clean · renders 200 · 0 residual "Summit & Oak" · axe **0 serious** under reduced-motion · desktop full-page vision-QA = **premium/GO** · mobile hero fixed + verified · hero photo clean · fresh post-edit visual confirm CLEAN) **at the end of the initial build**. THEN Joseph rapid-fired ~15 edit-mode forge tweaks (below). Each tweak was verified **individually** (curl / DOM probe / targeted vision agent), but the **final forge-state has NOT been re-run through the full batch gate.** ⚠️ **Before ANY "done"/deploy claim: restart :3200 + run the full batch gate (tsc + build + axe-reduced-motion + full-page vision) on the current tip.**
- **The edit-mode forge tweaks applied (the current state, all HMR'd on :3200 before it stopped):** ① all H2 + card `HeadingUnderline`s → `w-full` (were short fixed widths). ② custom-home bento → 5 photos (added `roof-crew.png`, fills bottom-right). ③ 01/02/03 proof cards → blue outline (`border-brand/40`) + hover (lift + border-brighten + blue tint + fold peel). ④ **heavy staggered fade** on 4 card groups (proof, service, reviews, storm): parametrized `Stagger`/`StaggerItem` in `components/motion.tsx` with new **backward-compatible props** `stagger`/`delayChildren` (Stagger) + `y`/`duration`/`blur` (StaggerItem); Mabrey passes `stagger={0.25} … y={88} duration={1.2} blur` (blur 5px). ⑤ hero overlay reduced ~75% (`navy/95→24` etc.) + text-shadow + bolded subhead/trust-line to hold the readability floor (vision-verified CLEAN). ⑥ trust bar: text marquee → **real cert logo wall** (see §2-B), iterated scrolling→static→scrolling, 8→4→6 logos, grayscale→full-color, and the `:hover` pause rule removed from `globals.css` (scrolls continuously).

### B. ⭐ THE MABREY CERT LOGOS (`public/mabrey/logos/`) — real, agent-sourced
- **8 real cert logos** downloaded + vision-verified (via research agents): `gaf.svg` `james-hardie.svg` `nahb.svg` `eagleview.svg` `bbb.svg` `angi.svg` (SVG, transparent, Wikimedia/official) + `nrca.png` `veteran-owned.png` (PNG, white-knocked-to-transparent via PIL). **The live marquee uses 6:** BBB · Angi · GAF · NAHB · NRCA · James Hardie (full color, big gaps, dots between). **`eagleview.svg` + `veteran-owned.png` are unused** (Joseph cut EagleView="people don't know it" + veteran="redundant"). ⚠️ Two are imperfect for a wall: **GAF** is its real red-square mark (a filled block among open logos); **BBB** came only portrait-aspect (small in a row) — for the REAL launch, drop in Mabrey's official GAF Master Elite badge + a horizontal BBB.

### C. HIGGSFIELD IMAGERY (`public/mabrey/`) — luxury Triangle homes, roof-forward
- **Used:** `hero-nano-a.png` (hero — the clean one) · `roof-metal` `roof-shingle-estate` `roof-aerial` `home-construction` `roof-crew` (custom-home bento) · `storm-damage` (storm band). **Unused/garbled:** `hero-1/2`, `hero-clean-a/b` (soul_2), `hero-nano-b` (nano, seam). ⚠️ **soul_2 garbled fake logos/text into EVERY hero attempt** ("LIOVT ROF", "1.3MILLOT", "ROVDE") — the clean hero only came from **`nano_banana_pro`** (§5). Higgsfield balance ~78 cr at start.

### D. FIRM SITE + SO + AUDIT — unchanged this arc
- **Firm site** (`king-maker-site/` → kingmakerseo.com) 200, untracked, A2P widget-first (never overwrite Footer compliance copy). **SO** `so-visual-pass @ 3f427a1`, remote EMPTY — the **WO_26 v3 city transplant is STILL committed-not-deployed-not-eyeballed** (WE19 §2-B; I never got to it, Joseph pivoted to Mabrey). **Audit engine** (`kingmaker-seo-audit/`) — Barajas live.

### E. 🔴 Working-tree map (the invisible-work trap)
- **COMMITTED (local git only, NO remote):** `mabrey-roofing` @ `4237f9f` (this arc — the whole homepage mockup) · `summit-oak-roofing` @ `3f427a1` (the WE18/19 board-language arc). **BOTH remote-less = the #1 + #2 recovery exposures.**
- **ON-DISK, UNCOMMITTED-ANYWHERE:** `king-maker-site/` (live on apex) · `vault/component-library/` · `kingmaker-seo-audit/`.
- **cg-root docs (uncommitted):** `MABREY_HOMEPAGE_WORKORDER_01.md` (the WE19 WO).
- **backup-all** did NOT run this arc — run `node backup-all.mjs` at session close (does NOT cover the SO or mabrey repos — no remote).

## 3. ⭐ OPEN LOOPS (by type)
- **🔴🔴 #1 IN-FLIGHT — the Mabrey homepage live forge.** Restart :3200, keep forging in edit-mode with Joseph for the whale presentation. DoD: Joseph's edits → bless → **batch-verify the final state** (full gate, §2-A ⚠️) → present. This is a PRESENTATION mockup; the real site targets mabreyroofing.com Fri 07-10 (master plan §11).
- **🔴 BATCH-VERIFY pending** — the final forge-state was never re-run through the full gate (only per-tweak). Do it before any "done"/deploy.
- **🔴 RECOVERY (Joseph picks the mechanism) — now TWO remote-less repos:** `mabrey-roofing` @ `4237f9f` + `summit-oak-roofing` @ `3f427a1`, both local-git-only. Options: private GitHub remotes · fold into `backup-all.mjs`. Plus `king-maker-site/` untracked (carried).
- **🟡 MABREY FULL SITE** — the mockup homepage is step 1; the real Friday build is a ~150-200-URL Summit-&-Oak-class site per `MABREY_ROOFING_MASTER_PLAN.md` v1.1 (Diamond Blueprint, no-combos, two-tier, W-AI GEO). The forged Mabrey homepage becomes the re-skin reference for the rest.
- **🟡 LOGO WALL polish** (optional) — GAF wordmark + horizontal BBB from Mabrey's official assets for launch (§2-B).
- **🟡 WO_26 v3 CITY EYEBALL (carried from WE19 §3, still open)** — SO cities committed `3f427a1`, not deployed/eyeballed. Joseph pivoted to Mabrey before getting to it.
- **CARRIED (WE19 §3):** ship-ready-demo push · Mabrey W1 · homepage a11y contrast pass · card-style-2 dots amendment · ready-on-ink (Raleigh home-security, Columbia painting, Top Roofing KY). **PARKED:** n8n booking (A2P) · AI-receptionist.
- **HOUSEKEEPING:** vault inbox 12 files pending ("ingest inbox") · cg-main current-state STALE (726 new).

## 4. Locked decisions — base corpus (WE17/SYNC/WE18/WE19) §4 STANDS VERBATIM + NEW this arc
**No strikes against WE19 §4** (density doctrine, transplant law, forge loop, judgment-zero WO class, numbers-glow, PLAYBOOK zero-search, "let it breathe" — all stand). **NEW LOCKS (WE19-arc):**
- ⭐⭐ **THE THEME-INVERSION RE-SKIN (how a light client clones the dark S&O).** S&O is a **dark-native** design (globals.css `body` = charcoal `#161719`/white text; the red-glow is HARDCODED as `rgba(216,38,44,…)` literals inside component class strings, NOT just `@theme` tokens). So re-skinning to a LIGHT palette (Mabrey white/blue) is a **full dark→light theme inversion + de-glow**, NOT a clean lib-only rebrand (S&O is NOT token-clean like the AMW `web/` template). **The method that worked:** rewrite `globals.css` to a light `@theme` (added `--color-brand` blue + `--color-page`/`--color-body`/`--color-tint`; repointed red→scarce-action, mist→AA-safe slate), **author the homepage `page.tsx` fresh in the light palette** (reusing the blessed motion primitives + section anatomies — transplant-in-new-palette, at-level), and light-ify only the reused primitives (`motion.tsx` underlines/eyebrows → `bg-brand`/`text-brand`; `SectionHeading` `text-white`→`text-ink`; `cta.tsx` CallPill light) + the shell (`Header`/`Footer`/`AlertBar`/`StickyMobile` light rewrites). The other dark components stay unused on the homepage. **Two registers never crossed:** S&O = red-glow-on-charcoal; Mabrey = blue-brand-on-white with scarce red.
- ⭐ **MABREY POSITIONING (LOCKED via AskUserQuestion, Joseph 2026-07-05):** (1) base = **clone S&O** (density grammar + the animations). (2) **roofing-primary + custom-home-builder as the prestige/authority spike** — the differentiator that ALSO covers Mabrey's thin reviews (16 @ 4.4★ Google; NOT headlined). (3) reviews = **real 5-star quotes, NO aggregate number** (illustrative testimonials for the mockup). (4) imagery = **all Higgsfield AI**. Palette = their white/blue/charcoal + scarce red (blue=brand/trust, red=act-now/damage — the firm-site discipline). GAF **Master Elite** = OK for the demo (Joseph: "it's a demo, don't overthink"). Sean's founder story (Navy/EOD→Duke/UNC ICU RN→mortgage→builder, veteran-owned) = the E-E-A-T centerpiece.
- ⭐ **BUILD INLINE AT-LEVEL FOR A TASTE-HEAVY RE-SKIN.** The Mabrey homepage had genuine design latitude (theme inversion, glow-on-white, custom-home band) → per no-downregulate, I built it inline (Opus, at-level) rather than delegating a WO to a builder. The `MABREY_HOMEPAGE_WORKORDER_01.md` served as my own architect's spec. Joseph then forges live in edit-mode.

## 5. Failures & dead-ends — base §5 STANDS VERBATIM + NEW this arc
- ⭐⭐ **soul_2 GARBLES FAKE TEXT/LOGOS into images ~20-100% of the time** (extends `reference_contractor_demo_media`). Every soul_2 hero attempt (4×) baked a garbled fake logo ("LIOVT ROF", "1.3MILLOT OANCAE", "ROVDE") despite hard "no text/logo/watermark" negatives. **The clean hero only came from `nano_banana_pro`** (text-competent). **Lesson: for hero / any text-adjacent architectural gen, use `nano_banana_pro`, not soul_2; and ALWAYS vision-QA gens for garbled text before use** (a background agent Reads them, returns text — no inline).
- ⭐ **REAL LOGO SOURCING IS FINICKY — vision-QA every logo + expect aspect/format mismatch.** Agent-sourced cert logos came mixed: GAF as a filled red SQUARE (reads as a box among open logos), BBB as a PORTRAIT aspect (squished to an invisible sliver at uniform height), EagleView 2.5× wider than the rest. **Fixes that worked: (a) grayscale unifies a heterogeneous logo set (the standard premium "trusted-by" move); (b) a `max-w` cap tames the extra-wide one; (c) for a real launch, use the client's OFFICIAL badge assets.** Also: a sourcing agent FLAILED once (Chrome-MCP confusion, garbled output) — **re-verify an agent's file deliverables on disk (`ls` + Read), never trust its report alone.**
- ⭐ **THE HERO OVERLAY vs THE READABILITY FLOOR (edit-mode).** Reducing the hero scrim 75% (Joseph's ask) risked washing out the white money-copy H1. **The floor (readability of money copy) is never traded, even in rapid** — so the fix was overlay-down + a text-shadow + bolder copy, then a targeted vision agent confirmed the H1/subhead/trust-line stay legible (CLEAN). Don't ship an overlay reduction blind — vision-verify the copy holds.
- ⭐ **`globals.css` CHANGES: HMR is unreliable → verify or restart.** Removing the marquee `:hover` pause rule from `globals.css` — I verified via a Playwright probe that the rule was GONE from the served CSS (not just trusted HMR). Tailwind `@theme`/globals-token changes are the edit-mode "needs a server restart" class; a plain-rule change usually HMRs but confirm the served CSS.
- ⭐ **Edit tool: whitespace/comment mismatches burn you.** Two Edits failed on `old_string` mismatch (a comment block inside `Stagger`; a differently-indented line). **Grep the exact block first when an Edit fails — don't re-guess the indentation.**

## 6. Tooling gotchas (delta on base §6 — those stand)
```bash
# CLONE a client site FROM S&O (the WE19 pattern) — robocopy source only, then install:
robocopy "<summit-oak>" "<new-client>" /E /XD ".git" ".next" "node_modules" /XF ".triage-report.json" /NFL /NDL /NJH /NJS   # exit <8 = success
Remove-Item "<new-client>\.vercel" -Recurse -Force   # avoid deploying to S&O's Vercel project
npm --prefix "<new-client>" install                  # npm --prefix runs in that dir (cwd = prefix for run-scripts too)
# MABREY DEV (edit-mode, :3200 — kept off S&O's :3000/:3210):
cd "C:/Users/josep/Claude Gravity/mabrey-roofing" && WATCHPACK_POLLING=true npm run dev -- -p 3200   # bg
npm --prefix "C:/Users/josep/Claude Gravity/mabrey-roofing" run typecheck   # tsc gate (ran clean this arc)
# HIGGSFIELD: hero/text-adjacent → nano_banana_pro (soul_2 garbles text). Poll show_generations; download rawUrl; vision-QA via a bg agent.
# VISION-QA pattern (no inline screenshots): a bg general-purpose agent writes a .cjs Playwright capture
#   (NODE_PATH="<repo>/node_modules") → scroll-through + settle → Read the PNGs → return a TEXT verdict.
```
- **Probe `.cjs` files** in `mabrey-roofing/` (`.axe-probe.cjs`, `.verify-final.cjs`, `.u-probe.cjs`, `.marquee-probe.cjs`) are gitignored (`.*.cjs`) — reusable, not committed.
- **The cloned S&O `.md`/`.cjs` scratch** (BUILD-CONTRACT, WO_25/26, etc.) came over in the robocopy — harmless noise in `mabrey-roofing/`, ignorable.

## 7. Deploy + verify (fenced)
```bash
# MABREY = LOCALHOST-ONLY (a mockup on the client's real domain — NEVER `vercel deploy` it). Forge on :3200.
# Batch gate before any "done": restart :3200, then:
npm --prefix mabrey-roofing run typecheck && npm --prefix mabrey-roofing run build   # (build collides with dev — kill :3200 first)
# axe reduced-motion + full-page vision via a bg Playwright agent (the .axe-probe.cjs / vision pattern).
# S&O / firm site / audit — per WE19 §7 (unchanged). Recovery: node backup-all.mjs (does NOT cover mabrey or SO — no remote).
```

## 8. ⭐ Taste & calibration — base §8 STANDS VERBATIM + NEW this arc
- ⭐⭐ **Joseph iterates trust-bars / logo-walls HARD + reverses freely** — this arc: scrolling → static (4 logos + dots) → scrolling again (6 logos, big gaps) → color (not grayscale) → no-hover-pause. **Show the option, honor the revert instantly, don't sunk-cost a treatment.** He picks logos by RECOGNITION/trust ("BBB + Angi definitely," "EagleView people don't know it," "don't be redundant — kill the veteran one").
- ⭐⭐ **"greatly increase the space," "double the intensity," "reduce by 50/75%"** = literal directional-% instructions (per SYNC §9). Execute the exact factor (blur 10→5px, y 44→88, overlay ×0.25). He'll fine-tune from there.
- ⭐ **The readability floor holds even in rapid/edit-mode.** When an aesthetic ask (lighter hero overlay) threatens money-copy legibility, protect it (shadow/weight) + VISION-verify — don't trade the floor for the effect.
- ⭐ **Edit-mode cadence he likes:** first-workable option executed immediately (no A/B surveys), ~30-60s per tweak, batch-verify (he watches localhost live + reacts). He turned ON rapid + edit mid-session ("turn on rapid and edit mode").
- ⭐ **He asks good architectural questions mid-forge** ("is the subtext an SEO necessity?") — give the honest expert take (it's the above-the-fold keyword/geo payload since the H1 is positioning-only; backed up by the `.seo-answer`), not a reflexive yes/no.
- **All of WE19 §8 stands:** favicon=icon · density-first (show heavy, only Joseph trims) · Opus-too-slow-for-edit-loops · "let it breathe" · "another blessed section" = capture · the referral flywheel (S&O/Mabrey are LIVE sales surfaces) · he model-switches · no inline screenshots.

## 9. Coordination
| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball on everything** (the Mabrey forge awaits it) · offer numbers · outreach. Never touch his mailbox. |
| `vault-agent` | Owns vault + fleet coord; will ingest Mode-D drops (12 inbox pending). Reply via the bus. |
| separate builder (Joseph-run, Opus) | Executes judgment-zero WOs. Mabrey homepage was built INLINE (taste-heavy). |
| `cold-outreach-specialist-6` | A2P owner — never overwrite compliance copy. |
| `n8n-claude-architect-1` | PARKED until A2P clears. |
| `cyber-security-specialist-1` | Owns security layers. |

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)
**Read FIRST:** this file → the 4 base files → `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (the design law) → `MABREY_ROOFING_MASTER_PLAN.md` v1.1 (the whale's business/build plan) → `MABREY_HOMEPAGE_WORKORDER_01.md` (cg-root — the WE19 architect's spec for this homepage; §3 theme-inversion map, §4 playlist, §5 content tables).
**Mabrey codebase (`mabrey-roofing/`, own git @ `4237f9f`, NO remote):** `app/page.tsx` (the ENTIRE 11-section homepage — the forge surface) · `app/globals.css` (the light `@theme` inversion) · `lib/business.ts` (Mabrey identity + Sean OWNER) · `lib/site.config.ts` (SITE + GEOGRAPHY = Durham) · `components/motion.tsx` (parametrized Stagger/StaggerItem — the heavy-fade props) · `components/{SectionHeading,cta,Header,Footer,AlertBar,StickyMobile}.tsx` (light-ified) · `public/mabrey/` (Higgsfield homes) + `public/mabrey/logos/` (8 cert logos). ⚠️ **The other components + inner routes still carry S&O dark content** (out of scope — the homepage is the deliverable; the full re-skin is the Friday build).
**Memory (auto-loads):** `project_design_doctrine_v14` · `feedback_forge_loop_judgment_zero` · `project_summit_oak_roofing` · `feedback_component_first_builds` · `feedback_no_downregulate_judgment` · `reference_contractor_demo_media` (⚠️ add the soul→nano lesson) · `project_mabrey_cmo_engagement`. **Vault:** `km-mabrey-roofing-fractional-cmo` + the WE19 blessed-section notes (inbox).

---
*— WE19, 2026-07-06 ~01:30. THE ARC: built the Mabrey whale homepage mockup from scratch — cloned Summit & Oak, INVERTED it dark→light to Mabrey's white/blue/charcoal + scarce-red palette (S&O is dark-native + hardcodes its glow, so a light client = a full theme inversion, not a lib rebrand), authored an 11-section dense homepage (roofing-primary + custom-home-builder prestige + Sean's veteran founder story), generated Higgsfield luxury homes (soul_2 garbles text → nano_banana_pro for the hero), verified GREEN (tsc/200/axe-0/vision-premium/mobile-fixed), then forged it live with Joseph in edit-mode (full-width underlines, heavy staggered blur fades, hero-overlay-75%-down with the readability floor held, a real cert-logo scrolling marquee). Committed `4237f9f` (local only, NO remote). Dev server DOWN — restart :3200. Reread 4×, re-verify state (4237f9f, :3200 down, SO 3f427a1 unchanged, mailbox empty), check the bus. **Theme-inversion re-skin for light clients; soul garbles text use nano; batch-verify the final forge-state before done; localhost-only never touch mabreyroofing.com; two remote-less repos = the recovery exposure; density-first show-heavy only-Joseph-trims; readability floor holds in rapid; Joseph's eyeball is the final gate.** Compound this corpus — carry the base files' §4/§5/§8 forward, add yours.*
