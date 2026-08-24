# HANDOFF — King Maker website lane → **Website Engineer 18 (WE18)**

**From:** WE17 · **To:** WE18 · **Date:** 2026-07-04 (23:44) · **Lineage:** WE4→…→WE14→WE15→WE16→WE17→**you**
**Blackboard handle:** `website-engineer` · **You own:** the **KM firm site** (`king-maker-site/`, live on kingmakerseo.com) + **Summit & Oak** (`summit-oak-roofing/`, the live reference roofing build) + the **component library** (`vault/component-library/` — NEW, WO_24) + the **launch-builder / WO workflow** + the **skill/gate spine** + the **KM value-prop / GTM research + pricing/offer model** + coordination with **n8n / meta-ads / cos / vault-agent** + the contractor **template/demo-engine** + the **roofing + AM flagships** (OUT unless named) + the **verify-gate system**.

> ⭐ **YOUR BASE CORPUS = TWO FILES, both at cg-main root — READ BOTH IN FULL, they stay IN FORCE:**
> 1. `AGENT-WEBSITE-ENGINEER-17-2026-06-27.md` (the WE17 base — §4 locks / §5 failures / §8 taste, WE7→WE16 verbatim).
> 2. `AGENT-WEBSITE-ENGINEER-17-SYNC-2026-07-04.md` (the vault-agent OS15 full-loop sync — carried WE17 §4/§5/§8 forward + added the OS11→OS15 corpus: Diamond Blueprint, July intro, capped-payoff, two-tier, no-downregulate, density-card, the OS bug corpus, Mabrey/Barajas/prospects).
> **This WE18 file is the DELTA on top of those two** (the WE17-active-session arc). Their §4/§5/§8/§6/§7/§9 are NOT re-transcribed here (recoverable on disk) — they stand VERBATIM; below are the STRIKES + this arc's NEW additions. Do not re-derive; compound.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)
1. **READ loop:** reread THIS file + the two base files in an ultrathink loop until a pass yields no new info (min 3). Name what each pass adds; a clean final pass = converged.
2. **Preflight:** fire `/kmwe` (gates, skills-gate v2, Playwright, arsenal canary) — cheap insurance.
3. **RE-VERIFY these volatile claims (dated 2026-07-04 23:44) by RUNNING the commands — a handoff fact is a lead, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" status -sb && git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" log --oneline -2
   # expect: so-visual-pass @ af11d71 (the roof-replacement rework checkpoint) on top of 19e6d2b; tree clean except ?? .wo23-verify/
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" remote -v   # EMPTY (recovery gap; af11d71 is LOCAL-git-only, no remote)
   netstat -ano | grep :3000   # a DEV server (WATCHPACK_POLLING npm run dev) is STILL RUNNING — Joseph's eyeball surface for the roof-replacement edits. NEVER `next build` while it runs.
   for u in http://localhost:3000/services/roof-replacement https://www.kingmakerseo.com https://kingmaker-summit-oak-roofing.vercel.app; do printf '%s -> ' "$u"; curl -sL -o /dev/null -w '%{http_code}\n' "$u"; done  # all were 200
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY (all acked this session)
   ```
4. **Mailbox:** empty at handoff (5 items acked this session). Ack only what you newly handle.
5. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, then ask which. ⚠️ The immediate pending item is **Joseph's eyeball + deploy call on the roof-replacement rework** (§3). Building only where it lands a client; you remain the build-avoidance enforcer.

---

## 1. What this is
King Maker sells done-for-you authority contractor websites + organic SEO. Two live web properties you own: the **KM firm site** (`king-maker-site/` → kingmakerseo.com, B2B blue/white, sells to every trade — home + buyer's-guide + /pricing all shipped) and **Summit & Oak** (`summit-oak-roofing/` → kingmaker-summit-oak-roofing.vercel.app, the red/charcoal reference roofing build clients clone). WE = **architect/reviewer + inline builder for small work**: two gears — inline `edit-mode` on a live localhost for tweaks · `launch-builder` → builder for big/net-new. Joseph runs his own builders for some lanes. **This session: built the component library (WO_24) + recardified the S&O roof-replacement page (Joseph-directed, edit-mode).**

## 2. ⭐⭐ CURRENT STATE (volatile — 2026-07-04 23:44; ⚠️ **UPDATED 2026-07-05 post-handoff** — the rework grew, see §2-A.2; re-verify per §0.3)

### A. 🔴 THE ROOF-REPLACEMENT REWORK — committed as a checkpoint, NOT deployed (the in-flight thing)
*(THE active deliverable at handoff. Joseph directed it live via edit-mode; verified green; awaiting his eyeball + deploy call.)*
| | |
|---|---|
| **What it is** | The S&O **roof-replacement service page** (`/services/roof-replacement`) rebuilt from flat prose blocks → the captured CARD grammar. **Contained**: a slug-branch in `app/services/[service]/page.tsx` (`const carded = s.slug === "roof-replacement"`) renders `<ServiceContentCards s={s}/>` for roof-replacement ONLY; the other 9 services + the shared `blocks.tsx` (used by 15+ pages) are **provably untouched**. |
| **Files (committed af11d71)** | `M app/services/[service]/page.tsx` (the branch) · `M components/FaqAccordion.tsx` (a11y: count label mist/70→mist/80) · `?? → new components/service/ServiceContentCards.tsx` (the carded body) · `?? → new components/service/DepthAccordion.tsx` (the smooth depth accordion). |
| **The sections (Joseph-directed, edit-mode)** | ① **StormBand-style split** — LEFT: eyebrow "The Straight Answer" + H2 (`s.tagline` "The Last Roof Your Home Will Ever Need.") + the answer text (lead visible, 2nd half in a native `<details>` "Read more +", **full text kept in `.seo-answer`** = the Speakable/AEO target) + `PrimaryCTA`+`CallPill`. RIGHT: the **3 process steps** as `summit-oak-storm-stat-card` numeral-rail cards (numeral + glowing title + a real micro-stat from `PROCESS_STAT` {Inspect:$0/no-obligation · Estimate:Fixed/one-price · Install:1-day/most-roofs} + underline + description). ② **"What's Included" = a dense "Complete Roof System" remix card** (Joseph's "1000% remix, make it cluttered"): H2 "What's Included" + underline; a `so-card` with a header band (glowing dot + "THE COMPLETE ROOF SYSTEM" ⟷ big glowing CountUp `6` + "core inclusions / standard, never upsold"), a **2-col numeral+check ledger** (6 items, ghost numeral + red check chip + text, grid dividers), a **trust-stack footer** (GAF · 25-Yr Warranty · Licensed NC #74122), fold. Remixes storm-stat-card + card-style-1 + reviews-block. ③ **Signs** (2-col: header left, alert cards right). ④ **Depth accordion** (`DepthAccordion`, the faq-accordion grammar: glowing dot index, smooth grid-rows). Then the SHARED shell (PageHero, ServiceAreaLinks, FaqSection, RelatedServices, RelatedArticles, CtaBand) — unchanged. |
| **Verified GREEN** | Prod-build shipped gate (`next start -p 3210`): `tsc` · `build` (146 routes) · `security-audit` 10/10 · `doorway-check` PASS · `reachability-check` 146/146 · **capture.spec `service-replacement` renders + a11y (0 serious) + console-clean, desktop AND mobile** · `heading-legibility` roof-replacement · WO_23 homepage-polish (confirms my shared FaqAccordion edit didn't regress the homepage). Vision-QA (both the page + the remix card) = **ship-quality**. |
| **STATUS** | **Committed af11d71 (recovery checkpoint), NOT deployed.** SO prod still serves 19e6d2b (pre-rework). A **DEV server is running on :3000** (Joseph's eyeball surface). DoD: Joseph eyeball → deploy via Vercel CLI → verify live host → fix-format report. |

### A.2. 🔴🔴 UPDATE (2026-07-05, post-handoff) — the rework GREW to FULL-PAGE carding, committed `1d51fca`, **NOT gate-verified**
*(Surfaced by the dev-server crash log AFTER the handoff was written — Joseph kept iterating in edit-mode past midnight; the extra work was uncommitted-on-disk until I checkpointed it. `1d51fca` is the REAL current tip — read this OVER §2-A above.)*
| | |
|---|---|
| **What changed** | Carding extended from the 4 middle sections (af11d71) to the **ENTIRE roof-replacement page**, same `carded = s.slug === "roof-replacement"` gate (other 9 services + shared `blocks.tsx` still provably untouched). |
| **New files (committed `1d51fca`)** | `components/service/CtaBoard.tsx` (the Edit-3 "1000% remix" cluttered CTA — eyebrow + TypeIn H2 + underline draw + red conversion mass) · `FaqBoard.tsx` (`FaqBoardSection`) · `RelatedBoards.tsx` (`RelatedServicesBoard`+`RelatedArticlesBoard`) · `ServiceAreaBoard.tsx`. **Modified:** `ServiceContentCards.tsx` (+210/−81, the big remix) · `page.tsx` (wires every board behind `carded`) · `ReviewSnippet.tsx` · `icons.tsx` · `lib/services.ts`. |
| **⚠️ VERIFICATION STATE — WEAKER than af11d71, do not conflate** | `tsc --noEmit` **CLEAN**. But this tip has **NOT** been run through the shipped gate (no build / axe / capture.spec / doorway / reachability on `1d51fca`), **NOT** vision-QA'd, **NOT** eyeballed. The "Verified GREEN" row in §2-A is true for **af11d71 ONLY** — it does **not** cover `1d51fca`. **Before ANY deploy: re-run the full shipped gate on a PROD build @ :3210 + Joseph eyeball.** (The dev log also showed transient `ReferenceError`s during the build — AnswerCard/AlertIcon/SIGN_META/DepthAccordion/REVIEWS/GLOW_STAT — all since resolved, tsc confirms; but that history is why a fresh gate run is non-negotiable.) |
| **Why it's committed** | Recovery-first (Joseph's standing rule): hours of judgment-work sat uncommitted on a remote-less repo. `1d51fca` on so-visual-pass is a protective checkpoint, honestly labeled **WIP**, not a "shipped" claim. |

### B. ⭐ THE COMPONENT LIBRARY (WO_24) — BUILT, at `vault/component-library/` (uncommitted; backed up via backup-all)
- **12 blessed atom specs** (`summit-oak-*.md`, 11-section clone contracts, tool-derived from source + live DOM probe): 10 NEW (`section-heading · hero-stat-triplet · trust-marquee · storm-stat-card · before-after-slider · reviews-block · cost-bento · claim-timeline · faq-accordion · cta-band`) + the 2 prior (`card-style-1`/`-2`). Provenance `summit-oak-roofing @ so-visual-pass @ 19e6d2b` (the homepage). `INDEX.md` rows all 12.
- **`gallery.html`** — a self-contained offline visual gallery, **base64-inlined** (3.26 MB, 14 section shots, homepage order). Openable file:// / preview panel. *(Was relative-path → broke on Joseph's open; base64-inlined to fix — see §5.)*
- **`templates/summit-oak-homepage.md`** — the homepage section skeleton (create-template, 0-gap coverage ledger), slots atoms by name.
- **`_shots/summit-oak/<NN-section>/`** — categorized PNGs + `_homepage-full.png`.
- **⚠️ AMENDMENT still OPEN (asked Joseph 2× this session, unanswered):** `card-style-2`'s registered spec documents a ghost-numeral header + mono row-indexes, but the LIVE homepage instance (19e6d2b) uses a **glowing icon header + glowing red-dot rows**. Flagged in INDEX §"Variants & pending amendments". Decision: amend the spec in place, or supersede with `card-style-2-lit`. Resolve with the fresh shot (`_shots/summit-oak/11-library/card-style-2.png`) in hand.

### C. FIRM SITE (`king-maker-site/` → kingmakerseo.com) — unchanged this session, re-verified 200
- `www.kingmakerseo.com` 200 · `/pricing` shipped ($497/mo + off-page tiers) · `/guides` · A2P/10DLC widget-first (carrier vetting in flight — **never overwrite the Footer compliance band / privacy-terms A2P copy**; n8n booking re-verify PARKED). Per-deploy alias step still applies (re-alias www + apex + byte-check the public host). `king-maker-site/` STILL `??` untracked (safety net = `backup-all.mjs`).

### D. 🔴 Working-tree three-way (the invisible-work trap)
- **COMMITTED (local git only, NO remote):** `summit-oak-roofing` @ **so-visual-pass / `1d51fca`** (the FULL-PAGE carding, on top of af11d71 → 19e6d2b). af11d71 = the 4-section rework (gate-verified); `1d51fca` = the full-page board buildout (tsc-clean only). ⚠️ `remote -v` is EMPTY — local-disk-only; the SO no-remote recovery gap (carried OS13→WE17) now holds `1d51fca` too. **Only untracked leftover:** `.wo23-verify/` (scratch verify-output — safe to gitignore or delete).
- **ON-DISK, UNCOMMITTED-ANYWHERE:** `king-maker-site/` (live on the apex) · `vault/component-library/` (the WO_24 library — vault is untracked; `backup-all.mjs` is the net) · `kingmaker-seo-audit/` (2 client pages).
- **DEPLOYED-but-behind:** SO prod (kingmaker-summit-oak-roofing.vercel.app) serves 19e6d2b — the roof-replacement rework (af11d71) is NOT live.
- **THE SKILL/GATE SPINE (`~/.claude/`, user-global, NOT in cg-main git):** hooks + skills unchanged this session.

## 3. ⭐ OPEN LOOPS (by type)
- **🔴🔴 #1 DECISION-PENDING (Joseph) — DEPLOY the roof-replacement rework?** Current tip = **`1d51fca`** (full-page carding, §2-A.2) on top of af11d71. ⚠️ **`1d51fca` is tsc-clean but NOT gate-verified / NOT eyeballed** — the "verified green" only covers af11d71. So the DoD gained a step: **(0) re-run the full shipped gate on a PROD build @ :3210 on `1d51fca` + Joseph eyeball** → THEN Options: **(a)** deploy prod (`vercel deploy --prod` from `summit-oak-roofing`, updates the reference site) · **(b)** a preview URL first (phone-viewable) · **(c)** hold + keep iterating in edit-mode. Do NOT deploy `1d51fca` on the strength of af11d71's green.
- **🔴 DECISION-PENDING (Joseph) — the SITE-WIDE A11Y CONTRAST PASS.** The captured atoms' low-opacity micro-labels fail AA: `text-mist/25` (ghost numerals), `/50` (index), `/60` (stat labels), `text-redink/90`, `text-mist/70` — **43 nodes on the homepage alone** (pre-existing; the axe gate has been RED site-wide on this; the captured specs' §8 A11Y wrongly claimed they clear). I fixed only the instances ON roof-replacement (process labels + FaqAccordion → mist/80). A mechanical bump of the rest (`card-style-1`, `card-style-2` ghost, `storm-stat-card`, `ServiceDepth` redink/85) would green the whole gate BUT touches the **blessed homepage** → needs Joseph's go. Offer it; update the captured specs' §8 when done.
- **🔴 DECISION-PENDING (Joseph) — the WO_24 `card-style-2` dots amendment** (§2-B; asked 2×, unanswered).
- **🟡 IN-FLIGHT — the roof-replacement page may get MORE edit-mode tweaks** (Joseph was actively iterating; the dev server is up). QA-assist / edit as he directs.
- **🟢 WO_24 Phase 2** (capture the rest of the 36-route site into the library) — separate green-light.
- **CARRIED (from the SYNC brief §5 — re-read it):** Mabrey W1 (Mon 2026-07-06, site targeted Fri 07-10 — the imminent whale build off `MABREY_ROOFING_MASTER_PLAN.md` v1.1) · Barajas re-engage (revert John-Doe IDs, vault §2-B) · S&O media cache-bust · the carried heading-fade +25% (unconfirmed) · **RECOVERY**: SO no-remote (now holds af11d71) + king-maker-site untracked + audit snapshot stale — Joseph picks the mechanism. **PARKED:** n8n booking re-verify (until A2P clears) · AI-receptionist.

## 4. Locked decisions — WE17 §4 + SYNC §6 STAND VERBATIM (read them) + NEW this arc
**Strikes against the base:** ~~"/pricing not built"~~ (shipped) · ~~"S&O PAUSED @ d8bd051"~~ (so-visual-pass @ af11d71 now). No other strikes.
**NEW locks THIS ARC (WE17-active-session):**
- **(WE17) THE COMPONENT LIBRARY IS THE BUILD-INSTRUCTION LAYER.** `vault/component-library/` holds 12 blessed, addressable atom contracts. A build is instructed by NAME ("use `storm-stat-card` here") = zero interpretation leakage — this IS the concrete mitigation for the no-downregulate-judgment lock. `capture-component` = write-side (capture-follows-the-eyeball, blessed only; tool-derived source + DOM probe + shot + ≥3-assertion clone contract). `create-template` = page skeletons that SLOT atoms by name (never re-describe). Gallery = base64-inlined self-contained.
- **(WE17) SERVICE-PAGE REWORK IS CONTAINED VIA A SLUG-BRANCH, NOT A SHARED-COMPONENT EDIT.** `blocks.tsx` (CheckList/SignsList/NumberedSteps/SplitContent/BlockHeading/Section) is imported by 15+ pages → editing it to "cardify" ripples site-wide (NOT what a per-page ask wants). The card system is the STANDARD; roof-replacement is the reference/proof; rollout to other services = drop the slug gate later. The captured library is the STYLE GUIDE for the new carded components.
- **(WE17) PRESERVE THE `.seo-answer` SPEAKABLE CONTRACT** when reworking the answer block — it's the `webPageNode` speakable selector; keep the class + the full answer text in the DOM (read-more content stays in DOM via native `<details>`, crawlable).
- **(WE17) THE S&O SHIPPED GATE RUNS AGAINST A PROD BUILD ON :3210, NOT `next dev`** (BUILD-CONTRACT §6; `playwright.config` baseURL defaults :3210, override `PW_BASE_URL`). Dev mode produces FALSE gate failures (see §5). `capture.spec` runs `reducedMotion:reduce`.

## 5. Failures & dead-ends — WE17 §5 + SYNC §7 STAND VERBATIM (read them) + NEW this arc
**NEW THIS ARC (WE17-active-session):**
- ⭐⭐ **THE STALE-SERVER-ON-:3210 TRAP.** Ran the shipped gate against :3210 → nonsense failures (home/es-home/WO_23 all failing, FAQ button wouldn't toggle = JS not running). Root cause: a STALE server (PID 27036) already held :3210 → my `next start` hit `EADDRINUSE` and never bound (check the bg log), so every test hit the OLD build (`curl` for a marker of your change = `answer-card-hits:0`). **Lesson: after `next start`, verify it BOUND (bg log has no EADDRINUSE) AND verify the served build (curl a marker of your change) before trusting ANY gate result. A stale port-holder serves a false-negative gate.**
- ⭐⭐ **DEV-MODE ≠ PROD for the gate.** Testing on `next dev` (:3000) gave a FALSE "1 serious color-contrast" (a mid-fade transient — the settled/reduced-motion state has none) + a hydration-mismatch console error (`useReducedMotionSafe`/`useSyncExternalStore` under `reducedMotion` emulation logs a dev-only warning React handles silently in prod). **Lesson: run the shipped playwright gate against a PROD build (:3210), not dev.**
- ⭐ **A NUMERAL (or ANY text) INSIDE THE `<h3>` FRAGMENTS THE HEADING-LEGIBILITY GATE.** DepthAccordion put a mono "01" inside the `<h3>` (via the button) → heading text extracted as "01Full Tear-Off…" → gate flagged box-tokenization fragmentation. **Fix = the faq-accordion grammar's aria-hidden glowing DOT (no text in the heading). Lesson: nothing with text sits inside the `<h3>` except the heading.**
- ⭐ **THE CAPTURED ATOMS HAVE A LATENT SITE-WIDE CONTRAST BUG** (the §3 a11y-pass item). The low-opacity micro-label pattern (mist/25–70, redink/85–90) is 2.8–4.25:1 (sub-AA) across card-style-1/2, storm-stat-card, FaqAccordion, ServiceDepth. The captured specs' §8 A11Y CLAIMED they clear — they don't. **Lesson: verify contrast on the actual DOM (axe), never trust a spec's a11y claim; low-opacity decorative text (even aria-hidden) is flagged by this axe config.**
- ⭐ **`@axe-core/playwright` needs `browser.newContext()`, not `browser.newPage()`** (throws "Please use browser.newContext()").
- ⭐ **`button[aria-expanded].first()` matched the HIDDEN mobile hamburger on a desktop viewport** (display-none but in the DOM) → `scrollIntoViewIfNeeded` timed out. Scope accordion-button locators by the accordion's heading text.
- ⭐ **THE GALLERY'S RELATIVE IMAGE PATHS BROKE via file:// / the preview panel** (browser can't fetch sibling PNGs). Fix = **base64-inline** the images (the brief said "self-contained"; relative paths were the wrong shortcut). Lesson: a "self-contained offline" page means embedded assets, not relative local files.

## 6. Tooling gotchas (delta on WE17 §6 / SYNC §8 — those stand)
```bash
# S&O DEV (edit-mode, :3000) — a dev server is RUNNING at handoff (Joseph's eyeball). Kill before ANY build.
netstat -ano | grep :3000   # -> taskkill //PID <pid> //F
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing" && WATCHPACK_POLLING=true npm run dev   # start (bg)
# S&O SHIPPED GATE — must run against a PROD build on :3210 (NOT dev):
netstat -ano | grep :3210   # KILL any stale holder FIRST (the §5 trap) -> taskkill //PID <pid> //F
npm run typecheck && npm run build && npm run security-audit && npm run doorway-check && npm run reachability-check
git checkout -- security-receipt.json   # gate residue
npx next start -p 3210   # bg; VERIFY it bound (no EADDRINUSE in the bg log) + curl a marker of your change
npx playwright test -g "service-replacement|home renders|heading|WO_23"   # default baseURL :3210
# Playwright probes for standalone sites: NODE_PATH="<repo>/node_modules" node <probe>.cjs  (axe needs browser.newContext())
```
- **Capture harness pattern (WO_24, reusable):** Playwright ELEMENT captures (`locator.screenshot()`), warm-scroll every section into view + settle ~6.5s BEFORE capturing (the `HeadingUnderline` draw is a 5s animation; unscrolled fullPage false-flags scroll-reveal). Vision-QA via a background Agent returning text (never Read PNGs into main chat — `feedback_no_inline_screenshots`).
- **S&O is a git repo** (branch so-visual-pass, NO remote). `king-maker-site/` + `vault/` are NOT git (backup-all is the net). `main` is stale (behind so-visual-pass by WO_22 + everything since).

## 7. Deploy + verify (fenced)
```bash
# S&O (the reference build — git-tracked local-only, deploys via Vercel CLI; .vercel.app alias auto-updates)
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"
npm run build && npx vercel@latest deploy --prod --yes    # CLI v54 JSON tail is cosmetic — curl-verify content markers
# ⚠️ roof-replacement rework (af11d71) deploys ONLY on Joseph's eyeball+go. Verify the LIVE host after: curl for "The Complete Roof System".
# FIRM SITE — after EVERY --prod deploy re-alias BOTH + byte-check the public host (WE16/SYNC):
cd "C:/Users/josep/Claude Gravity/king-maker-site" && npm run build && npx vercel@latest deploy --prod --yes
npx vercel@latest alias set <deployment-url> www.kingmakerseo.com && npx vercel@latest alias set <deployment-url> kingmakerseo.com
# Recovery at session end: node "C:/Users/josep/Claude Gravity/backup-all.mjs"
```

## 8. ⭐ Taste & calibration — WE17 §8 + SYNC §9 STAND VERBATIM (read them) + NEW this arc
**NEW THIS ARC (WE17-active-session):**
- ⭐⭐ **"1000% remix" / "100% remix" = COMPLETE REINVENTION, not a tweak.** Same content/density, totally different anatomy (like card-style-2 was a 100% remix of card-style-1). When he says remix, reinvent the section's structure.
- ⭐⭐ **"make it cluttered" = DENSE / information-rich** (the density-card standard: info in every zone, opposing rails + middle mass, at the saturation point). He WANTS density on that section — but premium-dense, not garish. (He'll still veto if a section "tips" — balance overrides density.)
- ⭐ **"use X from the library as inspiration" = compose a NEW thing by remixing captured-atom grammar** (storm numeral rail + card-style-1 checks/fold + reviews aggregate/trust-stack). The library is the STYLE GUIDE for new sections; he'll name the atoms.
- ⭐ **He iterates HARD + FAST in edit-mode on localhost** — annotated screenshots (red/blue drawn H2 labels, boxes, arrows) + short directives; expects the edit + hot-reload in ~30-60s. Honor the EXACT layout he draws ("answer left, subtext half in a dropdown, the last-roof H2 on the right, 6 vertical lines"); the design skill fills the polish.
- ⭐ **He wants an H2 + underline on sections** ("turn X into an h2") — the captured section-heading grammar (Eyebrow + TypeIn fade + HeadingUnderline).
- ⭐ **Use `AskUserQuestion` for an expensive-ambiguous FORK** (the "3 process steps vs 6 included items on the right" pick) — he answers cleanly. But for a cheap/reversible guess in edit-mode, ACT + note it.
- ⭐ **The library-as-mitigation frame:** he pushed the component library precisely so builds are instructed by atom name (no-downregulate-judgment). Weigh his systems proposals hard (they've been right).

## 9. Coordination
| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball on everything** (roof-replacement rework awaits it) · offer numbers · outreach. Never touch his mailbox. |
| `vault-agent` (OS15) | Sent the full-loop sync; owns vault + fleet coordination; will ingest your Mode-D drops. Reply via the bus. |
| `cold-outreach-specialist-6` | A2P owner (carrier vetting in flight) — never overwrite the compliance copy. |
| `n8n-claude-architect-1` | PARKED until A2P clears — do not ping about the booking re-verify. |
| `cyber-security-specialist-1` | Owns security layers both sites. |
| builder (Joseph-run) | Executes WOs; QA live, never build inline (except edit-mode small work). |

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)
**Read FIRST:** this file → the two base files (§ top) → **`vault/component-library/INDEX.md`** (the 12-atom registry + the pending amendment) + `gallery.html` + `templates/summit-oak-homepage.md` (the WO_24 deliverables). Then the S&O codebase: `components/service/{ServiceContentCards,DepthAccordion}.tsx` (the rework) · `app/services/[service]/page.tsx` (the branch) · the captured atom specs `vault/component-library/summit-oak-*.md` (the style guide) · `lib/services.ts` (the roof-replacement `Service` content) · `components/blocks.tsx` (the shared flat primitives — the 15+-page ripple surface, DON'T edit for a per-page ask).
**S&O gates:** `tests/capture.spec.ts` (the routes + axe + WO_23 polish assertions) · `tests/heading-legibility.spec.ts` · `playwright.config.ts` (baseURL :3210) · `BUILD-CONTRACT.md`.
**Prospect / GTM corpus (read on demand):** `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` v1.1 (Monday's whale) + the SYNC brief §3 table. Firm-site: `HANDOFF_website-engineer_firm-site_2026-06-30.md` + `KM_SITE_WORKORDER_08/09/10.md` + pricing briefs.
**Memory (auto-loads):** `project_km_firm_site_rebuild` · `project_summit_oak_roofing` · `feedback_component_first_builds` · `feedback_overstimulation_threshold` · `feedback_no_downregulate_judgment` · `feedback_no_inline_screenshots` · `reference_skills_gate` · `reference_verify_gate`. **NEW to write** (Mode D, this session): the WO_24 library note (`vault/inbox/wo24-component-library-sweep.md`, pending ingest) + this arc's roof-replacement + a11y + stale-server lessons.

---
*— WE17, 2026-07-04 23:44. THE ARC: ingested the full-loop sync → built the WO_24 component library (12 atom specs + base64 gallery + homepage template, 0-gap ledgers, vision-QA 14/14) → recardified the S&O roof-replacement page (contained slug-branch; StormBand-style split + a dense "Complete Roof System" remix + upgraded depth accordion), verified GREEN on the prod-build shipped gate + committed as af11d71 (recovery checkpoint). 🔴 OPEN #1 = Joseph's eyeball + deploy call on the rework (localhost:3000 is up). Surfaced a pre-existing site-wide a11y contrast bug (43 homepage nodes) + the stale-:3210-server + dev-vs-prod-gate traps. Reread 3×, re-verify state (af11d71, dev :3000 running, deploy pending), check the bus. **Verify against the PROD build not dev; a stale port-holder serves a false gate; the captured library is the style guide + the build-instruction layer; remix=reinvent, cluttered=dense; preserve .seo-answer; contained slug-branch not shared-component edits; never claim done unverified; Joseph's eyeball is the final gate.** Compound this corpus — carry the base files' §4/§5/§8 verbatim, add yours.*
