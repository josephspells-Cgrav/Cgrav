# HANDOFF — King Maker website lane → **Website Engineer 19 (WE19)**

**From:** WE18 · **To:** WE19 · **Date:** 2026-07-05 (~20:10) · **Lineage:** WE4→…→WE16→WE17→WE18→**you**
**Blackboard handle:** `website-engineer` · **You own:** the **KM firm site** (`king-maker-site/` → kingmakerseo.com) + **Summit & Oak** (`summit-oak-roofing/` → kingmaker-summit-oak-roofing.vercel.app, the live reference build) + the **component library** (`vault/component-library/`) + the **launch-builder / WO workflow** + the **skill/gate spine** + the **⭐ NEW design doctrine + PLAYBOOK** + the **audit-page engine** (`kingmaker-seo-audit/`) + GTM/pricing + coordination with n8n / meta-ads / cos / vault-agent + the roofing + AM flagships (OUT unless named).

> ⭐ **YOUR BASE CORPUS = THREE FILES, all at cg-main root — they stand VERBATIM, this file is the DELTA on top:**
> 1. `AGENT-WEBSITE-ENGINEER-17-2026-06-27.md` (WE17 base — §4 locks / §5 failures / §8 taste, WE7→WE16 verbatim)
> 2. `AGENT-WEBSITE-ENGINEER-17-SYNC-2026-07-04.md` (vault-agent OS15 full-loop sync — prospects, offer, Diamond Blueprint, bug corpus)
> 3. `AGENT-WEBSITE-ENGINEER-18-2026-07-04.md` (WE18 base — the component-library + roof-replacement-recard arc)
> Their §4/§5/§6/§7/§8/§9 are NOT re-transcribed here (recoverable on disk). Below = STRIKES against them + this arc's NEW additions. Compound, don't re-derive.
> ⭐⭐ **NEW THIS ARC = a full design doctrine.** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (both cg-root/vault) are now AUTHORITATIVE for all client-site design + build. kmwe auto-loads them. Read them before any client-site UI work.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)
1. **READ loop:** reread THIS file + skim the 3 base files in an ultrathink loop until a pass yields no new info (min 3). Name what each pass adds; a clean final pass = converged.
2. **Preflight:** fire `/kmwe` — it now ALSO loads the doctrine + PLAYBOOK (step 4). Cheap insurance + zero-search library knowledge in one shot.
3. **RE-VERIFY these volatile claims (dated 2026-07-05 ~20:10) by RUNNING the commands — a handoff fact is a lead, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" status -sb && git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" log --oneline -6
   # expect: so-visual-pass @ 3f427a1 (WO_26 v3 forge-state) on top of d752e10; tree clean except ?? .triage-report.json + ?? .wo23-verify/
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" remote -v   # EMPTY (recovery gap — a783a6d..3f427a1 all local-only)
   netstat -ano | grep :3000   # a DEV server (WATCHPACK_POLLING npm run dev, PID was 24212) is UP — Joseph's eyeball surface for the WO_26 v3 city transplant. NEVER `next build`/`next start` while it runs.
   for u in http://localhost:3000/locations/cary-nc https://kingmaker-summit-oak-roofing.vercel.app/services/roof-replacement https://kingmaker-seo-audit.vercel.app/barajas-construction https://www.kingmakerseo.com; do printf '%s -> ' "$u"; curl -sL -o /dev/null -w '%{http_code}\n' "$u"; done  # all were 200
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY
   ```
4. **Mailbox:** empty at handoff. Ack only what you newly handle.
5. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, ask which. ⚠️ The immediate pending item is **Joseph's eyeball on the WO_26 v3 city transplant (localhost:3000)** — nothing gated or deployed there yet.

---

## 1. What this is
King Maker sells done-for-you authority contractor websites + organic SEO. **This session was a giant design + doctrine arc, all on Summit & Oak** (the reference build every client site clones). Joseph and I forged the roof-replacement service page live (edit-mode, section by section, ~6 sections blessed), captured it to the component library, rolled it out to all 10 service pages via a judgment-zero work order executed by a **separate Opus 4.8 builder** (DEPLOYED + blessed), then hit a wall trying to roll the same treatment to the 14 city pages — which produced the session's biggest lesson (§5) and a full new design doctrine (§4). WE = **architect/reviewer + inline builder for small work** (edit-mode) + **WO author** for rollouts. Joseph runs separate builder sessions for the mechanical rollouts.

## 2. ⭐⭐ CURRENT STATE (volatile — 2026-07-05 ~20:10, re-verify per §0.3)

### A. 🟢 SERVICE PAGES — WO_25 SHIPPED, DEPLOYED, BLESSED (the win)
- **All 10 `/services/*` pages render the blessed board language.** Config-driven via `lib/service-boards.ts`; contained by `carded = s.slug in SERVICE_BOARDS`. Committed **`0c0a186`**, deployed to prod, **Joseph confirmed success** ("already pushed and deployed, it's good to go"). Roof-replacement (the forged exemplar) = `a783a6d`.
- Built by a **separate Opus 4.8 builder session** from my judgment-zero WO (`SUMMIT_OAK_WORKORDER_25.md` + `BUILDER_PROMPT_WO25.md`). Zero drift; the builder correctly diagnosed 3 verify failures as oracle-bugs not site-defects. **This validated deterministic-WO delegation to Opus** (the no-downregulate mitigation working).

### B. 🔴 CITY PAGES — WO_26 v3 TRANSPLANT, FORGE-STATE (the in-flight thing)
- **WO_26 v1/v2 FAILED at Joseph's eyeball** (gates green, taste didn't land — §5). I rebuilt all 14 city pages as **pure section transplants** (v3): every section is a byte-copy of a blessed homepage/service section fed city data. Committed **`3f427a1`** (forge-state checkpoint) but **NOT gated, NOT deployed** — tsc-clean + curl-verified on :3000 only.
- **Files:** `components/location/CityBoards.tsx` (rewritten — CityAnswerSplit ← service AnswerProcessSplit · CityStormBand ← StormBand · CityWhyBand ← Why · CityReviewsShell ← homepage reviews shell · CityDispatchBoard + landmarks band · CityProjectCards ← guide-card) · `components/CityPage.tsx` (whole-file, new section set + ORDER remap) · `components/ServiceCards.tsx` (added optional `regionTag` prop — home/hub UNTOUCHED, city passes `"{city} & {county}"`).
- **DoD:** Joseph eyeballs [localhost:3000/locations/cary-nc](http://localhost:3000/locations/cary-nc) (all 14 move together — one component file) → his edits in edit-mode → bless → THEN full gate chain (incl. `doorway-check`) → commit → deploy → fix-format report. **The dev server on :3000 is his eyeball surface — do not build while it runs.**

### C. ⭐⭐ THE DESIGN DOCTRINE (NEW — the durable output) — `KINGMAKER_DESIGN_DOCTRINE.md` + `PLAYBOOK.md`
- `C:/Users/josep/Claude Gravity/KINGMAKER_DESIGN_DOCTRINE.md` (v14, Density Era) = AUTHORITATIVE design law for **client sites** (S&O + client builds). Firm site EXEMPT. kmwe loads it + global CLAUDE.md points at it.
- `vault/component-library/PLAYBOOK.md` = zero-search lookup: every section slot → component + exact file + blessed instance + pick-rule. Grepping the repo for "which component" is now a codified doctrine violation.
- Wired into: kmwe preflight (step 4), edit-mode (batch-verify + density-first), launch-builder (judgment-zero class header), global CLAUDE.md, library INDEX. **All take effect next session start / next skill invocation.**

### D. FIRM SITE (`king-maker-site/` → kingmakerseo.com) — untouched this session, 200
- STILL `??` untracked in cg-main (safety net = `backup-all.mjs`). A2P widget-first / carrier vetting in flight — never overwrite Footer compliance / privacy-terms A2P copy. n8n booking re-verify PARKED. Per-deploy re-alias (www + apex) + byte-check still applies. **Firm site is EXEMPT from the density doctrine — stays blue/white readable-first.**

### E. AUDIT ENGINE — Barajas RE-IDENTIFIED + LIVE (done this session)
- `kingmaker-seo-audit/barajas-construction/index.html` — the John-Doe'd audit page (was anonymized for TikTok) is now **fully customer-facing with real Barajas identifiers, deployed + mobile-verified (390px), sent to the client today.** John-Doe backup saved at `vault/_client-backups/barajas-johndoe-tiktok-version-2026-07-05.html`. Real IDs in `vault/SESSION-HANDOFF.md` §2-B (PII — kept out of this public-safe file). Page carries `noindex`; the URL is public/unlisted.

### F. 🔴 Working-tree three-way (the invisible-work trap)
- **COMMITTED (local git only, NO remote):** `summit-oak-roofing` @ **so-visual-pass / 3f427a1** — the ENTIRE board-language arc (`a783a6d` roof-replacement · `0c0a186` WO_25 · `d34e1a3`/`6a89b7c`/`d752e10` WO_26 v1/v2/build · `3f427a1` WO_26 v3) is local-disk-only. `remote -v` EMPTY. ⚠️ **This is the #1 recovery exposure** — a whole day of blessed + shipped work.
- **ON-DISK, UNCOMMITTED-ANYWHERE:** `king-maker-site/` (live on apex) · `vault/component-library/` (library — vault is its own repo, pushed by backup-all) · `kingmaker-seo-audit/` (live client pages).
- **DEPLOYED:** SO prod serves WO_25 (10 service pages, `0c0a186`). WO_26 v3 (`3f427a1`) is NOT deployed — prod cities still serve the OLD flat build (WO_26 was never deployed; only v1/v2 built, both eyeball-failed).
- **THE SKILL/GATE + DOCTRINE SPINE (`~/.claude/` + cg-root):** launch-builder hardened (judgment-zero class + `wo-audit.mjs`), kmwe + edit-mode edited, global CLAUDE.md edited, `KINGMAKER_DESIGN_DOCTRINE.md` + `PLAYBOOK.md` written. All user-global/cg-root — a cg-main `git log` won't show the skill edits.
- **backup-all ran at session close** (2026-07-05 20:02) — vault + outbound + kingmaker + blackboard pushed; client-deliverables snapshot now includes the re-identified Barajas page. **SO repo still not covered** (no remote, not in backup-all).

## 3. ⭐ OPEN LOOPS (by type)
- **🔴🔴 #1 IN-FLIGHT — WO_26 v3 city transplant eyeball.** Committed `3f427a1` forge-state, running on :3000. DoD: Joseph eyeballs Cary (+ maybe Raleigh/Durham for rotation) → edit-mode tweaks → bless → gate chain (tsc·build·security·doorway·reachability·playwright vs :3210 prod build) → commit → deploy → verify → fix-format report. **All 14 cities share one component file — forge on one, all move.**
- **🔴 RECOVERY (Joseph picks the mechanism) — carried, now URGENT:** SO has NO remote and holds the entire shipped board-language arc (`a783a6d..3f427a1`). Options: (a) private GitHub remote · (b) fold SO into `backup-all.mjs`. **This is the biggest single loss-exposure in the lane.** Also: `king-maker-site/` untracked (carried since WE15).
- **🟡 THE SHIP-READY-DEMO PUSH (Joseph's stated goal, §8).** The whole S&O demo must go ship-ready end-to-end — remaining page-types: storm-damage tab (5) · resources/articles (35) · glossary (21) · money pages (cost/financing/calc, 4) · projects (16) · materials (8) · brands (4) · blog (7) · hubs + utilities · Spanish mirror (9). **Method = the Forge Loop (§4): forge ONE exemplar per page-CATEGORY live with Joseph, capture, then judgment-zero rollout WO.** Do NOT design a category solo in a WO (that's exactly what failed on cities). Triage (`.triage-report.json`, all 146 routes) found **0 mechanical breaks on prod** — the work is aesthetic uplift, not bug-fixing.
- **🟡 MABREY W1 — starts MONDAY 2026-07-06 (TOMORROW).** The imminent whale build: site LIVE on mabreyroofing.com targeted Fri 07-10, off `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` v1.1 (Diamond Blueprint). Be ready to spec/QA. (SYNC brief §3.)
- **🔴 DECISION-PENDING (Joseph) — homepage a11y contrast pass** (carried from WE18 §3): ~43 low-opacity nodes fail AA on the blessed homepage; axe stays RED there. The WO_25 service pages pass (axe 0 serious under reduced-motion). A mechanical bump would green the homepage gate but touches blessed work → needs his go.
- **🔴 DECISION-PENDING — card-style-2 dots amendment** (carried, asked 3× now, still unanswered — INDEX.md §Variants).
- **🟢 READY on ink:** Raleigh home-security (confirmed-to-sign) · Columbia painting · Top Roofing KY.
- **HOUSEKEEPING:** vault inbox ~10 files pending "ingest inbox" (vault-agent's Mode A — the 6 blessed-section notes + WO_25 learnings + doctrine + customer-meeting note) · cg-main current-state STALE.
- **PARKED (do NOT remind):** n8n booking re-verify (until A2P vetting clears) · AI-receptionist.

## 4. Locked decisions — base corpus §4 STANDS VERBATIM + NEW this arc
**Strikes against the base:** ~~WE18 "roof-replacement rework committed af11d71, NOT deployed, awaiting eyeball"~~ (blessed → extended `a783a6d` → WO_25 rollout `0c0a186` DEPLOYED + Joseph-blessed) · ~~WE18/SYNC "Barajas John-Doe'd, re-engage pending"~~ (re-identified + LIVE + sent, this session).
**NEW LOCKS THIS ARC:**
- ⭐⭐ **THE DENSITY-ERA DOCTRINE IS LAW FOR CLIENT SITES.** `KINGMAKER_DESIGN_DOCTRINE.md` (v14) — build every section at **90-110% deliberately over-poured (the water-bottle law: cheap to pour off 5%, expensive to fill a section at 30%)**; empty space is a BUG, not safety; **show heavy, only Joseph trims** (models self-fix mechanical breakage only, never density). Balance/fulcrum veto applies at TRIM TIME, never pre-emptively. **Client sites ONLY — the firm site (kingmakerseo.com) is EXEMPT (readable-first blue/white stands).** The June "dial back when in doubt" default is STRUCK for client sites (survives only as the firm register + the trim-time veto).
- ⭐⭐ **THE SECTION-TRANSPLANT LAW.** Never compose, only transplant: the unit of reuse is a whole blessed SECTION (byte-copied JSX or the same component), strings/arrays/hrefs swapped. A new page type = a **playlist** of existing blessed sections + a data mapping (Joseph approves the playlist, then it's mechanical). Reshape DATA to fit a blessed anatomy; never invent a new anatomy to fit awkward data. **New anatomies are FORGED LIVE with Joseph only, never invented inside a rollout.** (`KINGMAKER_DESIGN_DOCTRINE.md` §4.)
- ⭐ **THE FORGE LOOP (the build workflow, LOCKED — `feedback_forge_loop_judgment_zero`).** Forge 1-2 exemplars live (edit-mode, eyeball-blessed, density-first) → capture (capture-component/create-template → library) → author judgment-zero WO (launch-builder TEN laws + `wo-audit.mjs` green before emit) → builder executes → **architect re-verifies** → Joseph's eyeball → deploy. **Forge ONCE per page-CATEGORY; roll out infinitely WITHIN it.** Cross-category solo design is structurally lossy (§5) — not a skill gap.
- ⭐ **THE JUDGMENT-ZERO WO CLASS + `wo-audit.mjs`** (`~/.claude/skills/launch-builder/SKILL.md` §"JUDGMENT-ZERO WORK ORDERS"). TEN authoring laws (full-read · whole-file-over-splice · pre-resolved-content · zero-judgment-phrases · compile-audit-own-code · pure-DOM-oracles · trap-playbook-baked-in · pre-written-levers · forks-resolved-before-freeze · mechanical-audit-before-emit). **Model ladder:** Opus 4.8 = default for judgment-zero; **Sonnet 5 = TRIAL protocol** (green audit + shape already shipped clean at Opus + HALT-early prompt bias + architect re-verify net). Does NOT weaken the no-downregulate lock (taste WOs still parity).
- ⭐ **NUMBERS-GLOW LAW.** Display numerals/stats GLOW (`text-redink` + GLOW_STAT text-shadow) — **no ghost/faded numerals in NEW work, ever.** Micro-label numbers (9-11px kickers/tags) do NOT glow. (Retro-applied to roof-replacement; supersedes storm-stat-card's ghost rail in new work.)
- ⭐ **THE PLAYBOOK ZERO-SEARCH LAW.** Load `vault/component-library/PLAYBOOK.md` at session start (kmwe does it). If you are grepping the repo to find which component/section to use, you skipped the playbook — that's the doctrine violation that made Opus slow.
- ⭐ **"LET IT BREATHE" — the density exception.** The CTA closer stays centered + un-boarded; after ~9 dense sections the one exhale makes the red CTA land LOUDER. Joseph reverted two board attempts (proof card, stacked quiz) to prove it. Density is the instinct; this is the deliberate exception he'll name.

## 5. Failures & dead-ends — base corpus §5 STANDS VERBATIM + NEW this arc
- ⭐⭐ **WO_26 v1/v2 FAILED AT THE EYEBALL — the forge-skip.** Gates green (tsc·build·axe·doorway all passed), but Joseph: "really fucking bad compared to the service pages." Root cause: **I designed a NEW page CATEGORY (city pages) inside a work order without forging one exemplar live first.** The failures (vision-verified): (1) over-chromed — full board cards (band + fold + rail) wrapping single 4-5-line paragraphs; (2) monotony — the same heading+box silhouette stamped 6×, 3 back-to-back; (3) **low-N counters advertise thinness** (a glowing "3 factors" in a frame built for 8-14); (4) the blessed signature atom (split-with-numeral-ledger) appeared ZERO times — full-width single-column drone, no silhouette alternation. **Lesson: rollout only WITHIN a forged category; forge each new category live.**
- ⭐⭐ **"MAKE IT LIKE THIS OTHER PAGE" FAILS EVERY TIME — and here's the math.** A blessed page = a stack of ~50 accepted micro-decisions (density, chrome ratio, balance) frozen in its composition. Designing a new page "from reference" RE-ROLLS every decision on content shapes the reference never adjudicated; even at 90%/call, 50 compounding calls almost never fully land. **The fix is the transplant law (§4): copy the whole blessed section, never recompose it.** The render-feedback loop (Joseph's eyeball) IS the designer; solo design runs blind. WO_25 (rollout within a forged category) succeeded; WO_26 v1/v2 (rollout into an unforged category) failed — 1-for-1 on both sides.
- ⭐ **JUDGMENT LEAKS SURVIVE CAREFUL AUTHORING — mechanical law doesn't.** WO_26 v1 had 3 leaks despite me actively writing judgment-zero: a compile bug in my own pasted code (`React.ReactNode` with no import), a would-be-deleted load-bearing import (`BlockHeading`, in a part of the file I hadn't read), and "tsc will tell you" phrases. **Lesson: discipline doesn't survive authoring; the `wo-audit.mjs` scan does. Full-read the file 100% before spec'ing edits to it. Whole-file replacement over splice.**
- ⭐ **THE 2-LINE H2 aria-prohibited-attr AXE FAILURE.** `TypeIn as="span"` puts an `aria-label` on a generic span (axe serious ×2 on mobile; caught by the WO_25 gate pre-deploy). Fix = a real `sr-only` `<h2>` carrying the text + an `aria-hidden` `<div>` wrapping the word-fade pair. (Also: two adjacent TypeIn spans fragment the heading-legibility box-tokenizer.)
- ⭐ **THE VERIFY-SCRIPT TRAP PLAYBOOK** (all from the WO_25 builder's oracle-vs-defect catches — bake these into every verify script): **axe races framer-motion reveals** → run axe ONLY under `emulateMedia({reducedMotion:"reduce"})` + full scroll-through + settle (full-motion axe reads mid-fade elements as false color-contrast fails; the repo's own `capture.spec.ts` pattern) · `innerText` returns CSS-**uppercased** text → case-insensitive text oracles · **CountUp needs scroll-into-view** before reading its value (`useInView` once) · `.seo-answer` can legitimately appear **2×** (SnippetTable renders its own) → assert `>=1` not `===1` · after `next start` verify it BOUND + curl a marker of YOUR change (stale-server trap).
- ⭐ **STANDALONE-REPO PLAYWRIGHT:** `kingmaker-seo-audit/` has no playwright — run probes with `NODE_PATH="C:/Users/josep/Claude Gravity/summit-oak-roofing/node_modules" node probe.cjs`.

## 6. Tooling gotchas (delta on base §6 — those stand)
```bash
# S&O DEV (edit-mode, :3000) — a dev server is UP at handoff (Joseph's eyeball for WO_26 v3). Kill before ANY build.
netstat -ano | grep :3000   # -> taskkill //PID <pid> //F
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing" && WATCHPACK_POLLING=true npm run dev   # start (bg)
# S&O SHIPPED GATE — PROD build on :3210 (NOT dev), kill stale :3210 holder first, verify BOUND + curl a change-marker:
npm run typecheck && npm run build && npm run security-audit && npm run doorway-check && npm run reachability-check
git checkout -- security-receipt.json   # gate residue
npx next start -p 3210   # bg; VERIFY no EADDRINUSE + curl a marker of your change
npx playwright test -g "service-replacement|service-emergency|heading|WO_23"   # baseURL :3210
# WO-audit before emitting ANY judgment-zero WO (green = emit-able):
node "C:/Users/josep/.claude/skills/launch-builder/wo-audit.mjs" <WORKORDER.md> [--chrome]
```
- `.wo25-verify.cjs`/`.wo26-verify.cjs` etc. are gitignored (`.*.cjs` — "committed tree is source only"). Do NOT `git add -f` them.
- The Preview panel auto-showed the Barajas file on edit (it's a plain HTML file) — fine.

## 7. Deploy + verify (fenced)
```bash
# S&O (git-tracked local-only; deploys via Vercel CLI; .vercel.app alias auto-updates)
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"
npm run build && npx vercel@latest deploy --prod --yes    # CLI JSON tail is cosmetic — curl content markers
# ⚠️ WO_26 v3 (3f427a1) deploys ONLY on Joseph's eyeball+go. After: curl a live city page for "Dispatched Across <City>".
# FIRM SITE — re-alias BOTH (www + apex) + byte-check the public host after every --prod (base §7).
# AUDIT PAGES — cd kingmaker-seo-audit && npx vercel@latest deploy --prod --yes  (own .vercel; noindex).
# Recovery at session end: node "C:/Users/josep/Claude Gravity/backup-all.mjs"  (does NOT cover the SO repo — no remote).
```

## 8. ⭐ Taste & calibration — base corpus §8 STANDS VERBATIM + NEW this arc
- ⭐⭐ **"FAVICON" = ICON, not a dot/bullet.** He corrected me hard ("I said favicons not bullets") when I read "red glow favicons" as glowing dots — he meant glowing content ICONS. When he says favicon, reach for an icon glyph.
- ⭐⭐ **DENSITY-FIRST IS HIS STANDING BAR** (now the doctrine, §4). "200%/300%/500% more density," "make it cluttered," "10,000% remix," "overstimulating" — all literal instructions to pack information into every zone. "I'd rather it come out a little choked than flat and bland." **Empty white space is the thing he's fighting** — reduce the number of times a build comes back 50% empty. The water-bottle: over-pour, he trims.
- ⭐ **SHOW HEAVY — never present the conservative/empty variant.** Only Joseph trims. Presenting a "safe" spacious option wastes his turn.
- ⭐ **OPUS IS TOO SLOW + TOO CAUTIOUS for edit loops** (his words this session). He wants: first-workable-option executed immediately (no A/B/C surveys), 30-60s edits, batch-verify (no per-edit probes), deep thinking reserved for WO authoring + gate diagnosis. Encoded in edit-mode + the doctrine §6.
- ⭐ **"LET IT BREATHE" — he'll name the density exception** (the CTA closer, §4). He reverts freely + decisively (proof card, stacked quiz both reverted, no sunk cost) — honor the revert instantly, keep the reverted files on disk.
- ⭐ **"ANOTHER BLESSED SECTION" = his bless verdict.** A blessed section gets captured to the library (capture-follows-the-eyeball). He said it ~6× this session on roof-replacement.
- ⭐ **THE REFERRAL FLYWHEEL is the business context** (`customer-meeting-referral-flywheel-2026-07-05.md` in vault inbox): his customer is excited — **if the site works AT ALL, he brings 5-10 contractor friends.** He needs just 5-10 results-clients → referrals carry it. **The S&O demo is a LIVE sales surface** — he'd already sent it to prospects with broken areas in it, so comb before send. Honest lead frame he uses: **converting 1-2% of raw category search volume** (~5,000 searches) into leads.
- ⭐ **He model-switches constantly** (Fable/Opus/Sonnet per turn) — never inflate the model you run on; adapt speed to the gear he set.

## 9. Coordination
| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball on everything** (WO_26 v3 awaits it) · offer numbers · outreach. Never touch his mailbox. |
| `vault-agent` (OS15) | Owns vault + fleet coord; will ingest your Mode-D drops (10 pending). Reply via the bus. |
| separate builder (Joseph-run, Opus 4.8) | Executes judgment-zero WOs. WE = architect + re-verifier (report-clean ≠ is-clean). |
| `cold-outreach-specialist-6` | A2P owner (vetting in flight) — never overwrite compliance copy. |
| `n8n-claude-architect-1` | PARKED until A2P clears — do not ping. |
| `cyber-security-specialist-1` | Owns security layers both sites. |

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)
**Read FIRST:** this file → the 3 base files (top) → ⭐ **`KINGMAKER_DESIGN_DOCTRINE.md`** (cg-root — the design law) + **`vault/component-library/PLAYBOOK.md`** (zero-search section lookup) → `vault/component-library/INDEX.md` (registry) + `sections/_board-grammar.md`.
**The rollout machinery:** `~/.claude/skills/launch-builder/SKILL.md` (judgment-zero class + TEN laws + model ladder) + `~/.claude/skills/launch-builder/wo-audit.mjs`. WO exemplars: `summit-oak-roofing/SUMMIT_OAK_WORKORDER_25.md` (+ `_26.md`, `BUILDER_PROMPT_WO25/26.md`).
**S&O codebase (the forged exemplars):** `components/service/{ServiceContentCards,ServiceAreaBoard,FaqBoard,RelatedBoards,CtaBoard}.tsx` (roof-replacement, blessed) · `lib/service-boards.ts` (WO_25 config) · `components/location/CityBoards.tsx` + `components/CityPage.tsx` (WO_26 v3 transplant, forge-state) · homepage `app/page.tsx` + `components/{ServiceCards,StormBand,Why,CtaBand,FaqSection}.tsx` (the transplant SOURCES). **Gates:** `tests/capture.spec.ts` · `tests/heading-legibility.spec.ts` · `playwright.config.ts` (:3210) · `BUILD-CONTRACT.md`.
**Prospect/GTM (read on demand):** `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` v1.1 (Monday's whale) + SYNC brief §3.
**Memory (auto-loads):** `project_design_doctrine_v14` · `feedback_forge_loop_judgment_zero` · `project_summit_oak_roofing` · `feedback_component_first_builds` · `feedback_no_downregulate_judgment` · `feedback_balance_fulcrum_principle` (now the trim-time veto) · `reference_component_library` · `feedback_no_inline_screenshots`. **Vault inbox (pending ingest):** the 6 blessed-section notes + `wo25-rollout-learnings` + `customer-meeting-referral-flywheel` (all 2026-07-05).

---
*— WE18, 2026-07-05 ~20:10. THE ARC: forged the roof-replacement service page live with Joseph (6 blessed sections) → captured to the library → judgment-zero WO_25 rolled it to all 10 service pages, built by a separate Opus builder, DEPLOYED + blessed → WO_26 tried the same on city pages and FAILED at the eyeball (forge-skip: designed a new category solo) → derived the SECTION-TRANSPLANT LAW + rebuilt cities as pure transplants (3f427a1, forge-state, NOT deployed) → wrote the DENSITY-ERA DOCTRINE + PLAYBOOK + hardened launch-builder into a judgment-zero class with a mechanical audit → re-identified + shipped the Barajas client audit page. Reread 3×, re-verify state (3f427a1, :3000 up, WO_25 live, SO no-remote), check the bus. **Density-first 90-110% on client sites; transplant never compose; forge each category live before rollout; show heavy only Joseph trims; favicon=icon; numbers glow; WO_25 shipped, WO_26 v3 awaits eyeball; SO has NO REMOTE (biggest exposure); Joseph's eyeball is the final gate.** Compound this corpus — carry the base files' §4/§5/§8 forward, add yours.*
