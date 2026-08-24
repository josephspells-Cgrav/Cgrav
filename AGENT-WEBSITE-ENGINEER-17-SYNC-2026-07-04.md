# FULL-LOOP SYNC — King Maker website lane → **Website Engineer 17 (your ACTIVE session)**

**From:** vault-agent (OS15) — CROSS-AGENT sync brief, Joseph-directed · **To:** the running WE17 session · **Date:** 2026-07-04 (evening)
**Lineage:** unchanged — you remain WE17 (`AGENT-WEBSITE-ENGINEER-17-2026-06-27.md`, same folder, is still your base corpus; its §4/§5/§8 stay in force). This is NOT a succession — no WE18 exists; you'll write that file yourself when your arc ends.
**Blackboard handle:** `website-engineer` · **You own:** everything your WE17 header lists (firm site · Summit & Oak · launch-builder/WO workflow · skill/gate spine · GTM research spine · pricing/offer surfaces · template/demo-engine · flagships OUT-unless-named) **plus, new since:** the S&O `so-visual-pass` design arc, the audit-page engine (`kingmaker-seo-audit/`), and the component-library build-out (WO_24, §4 below).

> **Why this file exists:** ~7 days of heavy change happened largely OUTSIDE your session (Joseph directed much of it live in vault-agent sessions): S&O un-paused + redesigned + SHIPPED, two live prospects with deployed audit pages, the Mabrey whale program starting Monday, a component-library system born, the offer evolved twice, plus new locks and a new bug corpus. Joseph asked vault-agent for a full-scope sync + the next work order so you're 100% in the loop. This file = the 06-27→07-04 DELTA on top of what you already know. Where a section covers your OWN work (the 06-30 firm-site ship), it's confirmation + the pieces that changed after — marked 🆕 where it's genuinely new to you.

---

## 0. ⭐ ON RECEIPT — SYNC, THEN ASK (never auto-start)

1. **READ loop:** reread THIS file in an ultrathink loop until a pass yields no new info (min 3 passes). Name what each pass adds; a clean final pass = converged. Your own WE17 handoff stays your base — no need to reread it unless a §6 strike sends you there.
2. **Preflight:** if `kmwe` hasn't run recently in your session, re-fire it (gates, skills-gate v2, Playwright, arsenal canary) — cheap insurance before the WO_24 capture work.
3. **RE-VERIFY this file's volatile claims (dated 2026-07-04 evening) by RUNNING the commands — a sync fact is a lead, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" status -sb && git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" log -1 --format='%h %s'
   # expect: so-visual-pass @ 19e6d2b · dirty: M security-receipt.json (gate residue — restore w/ git checkout --) + ?? .wo23-verify/ (probe scratch)
   git -C "C:/Users/josep/Claude Gravity/summit-oak-roofing" remote -v          # expect EMPTY — the #1 recovery gap
   for u in https://kingmaker-summit-oak-roofing.vercel.app https://www.kingmakerseo.com/pricing \
            https://kingmaker-seo-audit.vercel.app/proshield-roofing https://kingmaker-seo-audit.vercel.app/barajas-construction; do
     printf '%s -> ' "$u"; curl -sL -o /dev/null -w '%{http_code}\n' "$u"; done   # all were 200
   netstat -ano | grep :3000    # dev server was DOWN (start only when needed; NEVER build while it runs)
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer
   ```
4. **Mailbox reconciliation — your box holds 4 un-acked items (06-27→07-01), ALL now absorbed into this brief.** The 06-27 items were actioned across your WE16/WE17 arcs (n8n + pricing per your §0.2; the visual-upgrade brief you executed 06-30); the 07-01 one arrived AFTER your last bus activity (06-30 13:36) — genuinely new to you. After absorbing, `ack` all 4:
   - *n8n-architect 06-27 (poller kill + July-1 test):* poller stayed dead; the July-1 live-fire you were waiting on was then OBSOLETED — 🆕 the A2P widget pivot (07-01) changed the booking-form schema, and the n8n re-verify is **PARKED until A2P carrier vetting clears (Joseph: do NOT keep reminding)**.
   - *vault-agent 06-27 (pricing brief):* you executed it 06-30 — /pricing is LIVE (§2-B). Offer has since evolved further (§3-offer). Historical.
   - *vault-agent 06-27 (visual-upgrade brief):* executed both halves — firm site by YOU 06-30 (Lenis + depth tokens, GSAP=B-tier), S&O via the `so-visual-pass` arc done OUTSIDE your session (§2-A). Historical.
   - 🆕 *cos-6 07-01 (A2P heads-up):* gotchas absorbed into §2-B/§8 (per-deploy alias step — they found www PINNED to an old deployment; **never overwrite the carrier-referenced A2P copy**; king-maker-site untracked). Ack after absorbing.
5. **STOP — do NOT auto-start.** Check in with Joseph in your session: one line "synced — here's what changed" + a TLDR of candidate next tasks (§4 WO_24 is the Joseph-approved default; §5 has the queue), and let him pick. Building only where it lands clients — you remain the build-avoidance enforcer (your §8).

---

## 1. What this is

Your role is unchanged (your §1): **architect/reviewer for all King Maker web properties** — spec WOs, QA live results, run the gates; Joseph's eyeball is the final gate. Two gears: inline `edit-mode` on a live localhost for small tweaks · `launch-builder` → builder for big/net-new. 🆕 **New constraint since your handoff (OS13 lock 07-03, §6): judgment/taste work NEVER delegates to a lower model** — design/taste executes in YOUR session or a same-level dedicated builder Joseph tunes; Sonnet fan-outs only for research + zero-latitude mechanical steps. The WO_23 Sonnet-sub-agent-builder experiment is CLOSED (refuted).

The business context shifted hard this week: **outreach is live, one prospect is mid-close (Barajas — the Saturday partner-seeker, same person), one whale program starts Monday (Mabrey), and one client is confirmed-going-to-sign (Raleigh home-security).** Website work now serves closes — audit pages, the reference build (S&O), the firm site, and imminent client builds.

## 2. ⭐⭐ CURRENT STATE (volatile — dated 2026-07-04 evening, all tool-verified today; re-verify per §0.3)

### A. SUMMIT & OAK — UN-PAUSED, redesigned live with Joseph, homepage v2 SHIPPED to prod 2026-07-04
*(Supersedes WE17 §2 "S&O PAUSED @ d8bd051, main = source of truth" — both facts are stale.)*
| | |
|---|---|
| **Branch truth** | **`so-visual-pass` @ `19e6d2b` = the deployed source of truth.** It CONTAINS WO_22/`d8bd051` (verified `branch --contains`) — the old "merge-confirm pending" question is moot. **`main` @ `3aa63ba` is now STALE** (pre-WO_22, pre-everything this week). Merge-to-main = Joseph's call, low priority. Dirty tree: `M security-receipt.json` (security-gate run residue — `git checkout -- security-receipt.json`) + `?? .wo23-verify/` (probe scratch, deploy-excluded). |
| **🔴 Recovery #1** | **NO git remote + NOT in backup-all** — the entire week's blessed work (WO_23 + card system + v2) is local-git-only. Carried OS13→OS14→OS15; Joseph hasn't picked a fix: (a) private GitHub remote, or (b) fold into `backup-all.mjs` snapshot. **Don't create a repo unilaterally — flag, let him pick.** |
| **PROD** | `kingmaker-summit-oak-roofing.vercel.app` (200) = **the v2 build.** Full ship gates ran green 07-04: `typecheck` · `build` · `security-audit` 10/10 · `doorway-check` PASS · `reachability-check` 146/146 · curl content markers · scrolled-capture vision PASS · verify-before-claim receipts. |
| **The commit arc** (what happened this week, oldest→newest) | `cf5f243` visual upgrade (site-wide depth, blur-free motion) → `101d262`+`6b65e2b` WO_23 homepage maximalist polish (architect OS13; the WO doc is `summit-oak-roofing/WO_23_HOME_MAXIMALIST_POLISH.md`) → `9381a97` deploy-payload excludes scratch → `e4b5a98` WO_23 gap fix → `6186d17` **card-density-1 birth** (the blessed 3×2 density service card) → `b2798cc` typewriter + card-style-1 on Why/Process + 5s line-draws → `053ec14` **typewriter KILLED → cinematic word-fade on all homepage headings (blessed: "smooth as fuck")** → `5a4f7cc` **card-style-2 birth** (library hub cards: 100% remix to ledger/numeral anatomy) → `33d637b` homepage density pass (FAQ band, cost bento 5-cards, storm cards 603×120, native dark reviews block — killed the white Google widget) → `19e6d2b` glowing content icons replace numerals, FAQ underlines, claims-timeline icon pills (RSC-safe name map). |
| **What v2 IS** (per-section, all Joseph-blessed) | Library hub cards (ledger anatomy + glowing icons + HONEST stats 7 systems/24 projects/7 topics/6 posts — real rendered counts) · cost bento (5 cards incl. Tile&Slate, financing bottom-right, real `lib/materials` specs, 1 bullet/card after his balance trim) · storm cards (ghost numeral rail, glowing stats/titles, 5s line-draw dividers, 603×120 exact) · claims timeline (icon pills via RSC string-map, state machine intact) · FAQ band (glowing Q&A, 13 ANSWERS, dots, per-question underlines; **homepage `quietCta={false}` = red primary = a 4th red anchor — HIS call, flagged, accepted**) · native dark reviews block (CountUp 4.9 + star cascade; trust stack 18 yrs · 2,400+ roofs · GAF · 25-yr warranty · NC #74122 — every number exactly once, negativity-bias rule §9). |
| **Key files** | `app/page.tsx` (incl. the INLINE library-card grid — a capture target) · `components/{ServiceCards,Why,Process,CostTeaser,StormBand,ClaimSteps,FaqSection,FaqAccordion,GoogleReviewsWidget,SectionHeading,motion,Hero,TrustBar,BeforeAfter,InsuranceBand,CtaBand}.tsx` |
| **Dev server** | :3000 DOWN. Start: `cd summit-oak-roofing && WATCHPACK_POLLING=true npm run dev`. **NEVER `next build` while it runs** (`.next` collision — kill the PID first). Gate-suite server = :3210 (WE17 §6). |
| **⚠️ Open media-cache item** | OS13 flagged: WO_23 swapped hero video + before/after images **keeping the same filenames**; Vercel serves `/public` immutable/1yr → **every past visitor (incl. prospects) can still see the OLD media**. v2 shipped WITHOUT renaming (`/hero.mp4` still referenced in `app/page.tsx`). Rename/version media URLs before this matters for a prospect demo. In §5 queue. |

### B. FIRM SITE (`king-maker-site/` → kingmakerseo.com) — YOUR 06-30 ship, confirmed still true; 🆕 = changed after your last activity
- **Confirmed (your own work, all re-verified 200 today):** `www.kingmakerseo.com` live (apex 308→www; SITE_URL/canonicals flipped) · `/pricing` shipped ($497/mo Tier 1 + off-page Tier 2, SALES-Roark, 3-tier ladder, "3-5×" Illustrative-flagged) · `/guides` 200 · `/work` + `/system` retired (301'd); `/playbook` fate = verify live before assuming.
- 🆕 **A2P/10DLC (07-01, two-step — know the sequence):** COS6 first added SMS-consent checkbox + compliance band + privacy/terms clauses; SAME DAY the compliance pass pivoted to **widget-first: booking-form phone field + SMS checkbox REMOVED, LeadConnector chat widget = the SOLE opt-in.** Carrier vetting IN FLIGHT. ⚠️ **The Footer compliance band + privacy/terms A2P clauses are carrier-referenced — NEVER overwrite.** Booking-form schema changed → the n8n lead-pipeline re-verify is **PARKED until vetting clears (do NOT remind Joseph)**. ⚠️ A CSP once silently blocked the widget (`<script>` in HTML ≠ widget renders) — real-browser render check required after any CSP/head change.
- **Deploy gotcha (you know it; 🆕 it bit AGAIN):** the custom domain is a per-deployment alias — after EVERY `--prod` deploy: `npx vercel alias set <deployment-url> www.kingmakerseo.com` (+ apex) + **byte-check the PUBLIC host** (🆕 COS6 found www PINNED to an old deployment `k5n2bbn97` on 07-01 and had to re-alias manually).
- **🔴 Recovery:** `king-maker-site/` is STILL `??` untracked in public cgrav (verified today), no repo of its own. Safety net = `backup-all.mjs` → `vault/_firm-site-snapshot/`. Same standing Joseph-decides gap as WE17.
- **Offer surface note:** the /pricing page anchors $497. Joseph's CLOSING price right now = the **July intro $147×3mo→$297 (first ~10, fluid)** — deliberately a sales-call tool, not necessarily public. Treat the page as intentional until Joseph says otherwise; **money-page cadence still applies (WE16 lock): build LOCAL → his eyeball → confirm → deploy.**

### C. AUDIT-PAGE ENGINE (`kingmaker-seo-audit/` → kingmaker-seo-audit.vercel.app) — the productized per-client audit
- **Pattern** (OS12): static per-client folder `<slug>/index.html`, KM-branded, firm-palette (green scoped ONLY to pass/fail glyphs); deploy `npx vercel@latest deploy --prod --yes` from the folder root; `.vercel.app` alias auto-updates.
- **LIVE:** `/proshield-roofing` (200; Charlotte commercial roofer, ~148-page build scope; source report = cgrav root `ProShield-Roofing-Website-Report.md`) · `/barajas-construction` (200; built mid-meeting 07-04 — 6 parts: overview · GBP audit · website/organic · **REAL Local Falcon scan** (report_key `cadb7213b9f1c29`, 7×7@7mi, ARP 9.42, SoLV 6.1%) + ceiling-calibrated 6-12mo projection (leader Roman Roofing = 12/49 top-3 → "new-market-leader" bound, receipt printed on-page) · leads (10% conv) · ~130-page build. Mobile-optimized; known cosmetic quirk: sticky-pill active-highlight can lag one section after a click — headless scroll artifact, real UX fine.
- **LF etiquette if you re-scan (Barajas/Mabrey):** `listAllLocalFalconLocations` first, save the location before scanning, and **scans cost credits (~5 per 49-pt grid) — confirm with Joseph before running**; ~7,669 credits remained at 07-04. Report keys are durable in the LF account.
- **🔴 Barajas is ANONYMIZED ("John Doe Construction") for Joseph's TikTok** — the deployed + on-disk copy is the John-Doe version, and the folder is **untracked in cgrav** with the backup-all snapshot taken BEFORE Barajas existed → **the real identifiers exist ONLY in the vault handoff** (`vault/SESSION-HANDOFF.md` §2-B — name, domain, 3 phones, GBP cid, place_id; PII — deliberately NOT copied here, cgrav root can go public). When Joseph re-engages the prospect: sed the placeholders back (John Doe / johndoeconstructionnc.com / (123) 456-7890 / (111) 111-1111 / (111) 111-1112) + redeploy. **Anti-pattern to carry: snapshot/commit BEFORE anonymizing — anonymizing the only copy destroys the original.**
- **🔴 Recovery:** whole folder `??` untracked in public cgrav (client data — that's WHY it's untracked); protection = backup-all client-deliverables snapshot, currently STALE (pre-Barajas). Cheapest fix = run `node backup-all.mjs` (it's John-Doe-safe right now).

### D. Other surfaces (unchanged this week, verified 200 today)
`kingmaker-v3.vercel.app` (lean landing) · `kingmaker-growth-plan.vercel.app` (Traffic Deck) · the flagship demos (`/preview/roofing`, AMW) stay **OUT unless named**. The `web/` verify-gate Stop-hook applies to flagship roots ONLY — S&O + firm site + audit repo use their own gates (WE17 §6/§7).

### E. Working-tree three-way (the invisible-work trap, refreshed)
- **COMMITTED + DEPLOYED:** `summit-oak-roofing` @ so-visual-pass/19e6d2b (LOCAL git only — no remote).
- **ON-DISK, UNCOMMITTED-ANYWHERE:** `king-maker-site/` (live on the apex) · `kingmaker-seo-audit/` (live, 2 client pages) — both `??` in public cgrav by design/inertia; snapshots via backup-all (audit snapshot stale).
- **PRIVATE-REPO COMMITTED:** `king_maker_outbound` (all master plans, verified in-sync today) · vault · kingmaker · blackboard.

## 3. ⭐ CUSTOMERS / PROSPECTS / OFFER — the "everything that varies" table (all FLUID; latest-wins)

| Who | Status (07-04) | Website-lane implications |
|---|---|---|
| **⭐⭐ Mabrey Roofing** (Durham; $5-7M→$20M; fractional-CMO rev-share) | Verbal-only, HOT. **Program W1 starts MON 2026-07-06; site LIVE on mabreyroofing.com targeted Fri 07-10.** | **THE imminent build.** Source of truth = `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` **v1.1** (every deck pulls from it; update THERE first). Build to: Diamond Blueprint (§6 below) + no-combos + doorway gates + two-tier projections + W-AI GEO playbook. W1 also: GBP rebuild, review SOP, inputs to lock (ticket/close/access, who holds the domain). Uncapped whale comp — never cap. |
| **⭐ Barajas Construction** (Raleigh GC/roofer) | Full audit deployed mid-meeting 07-04; **outcome UNKNOWN — ask Joseph.** Page John-Doe'd for TikTok. | On re-engage: revert identifiers (§2-C) + redeploy. If signed: GBP fix-list = week-1 (category dilution, 3 phone numbers + duplicate SAB listing, hours conflict, review-velocity plan). |
| **ProShield** (Charlotte commercial) | Audit live since 07-01; ~148-page architecture scoped. | Clone-source for audit pages. |
| **Raleigh home-security** | **CONFIRMED client, going to sign.** Market scanned (residential-only, ~4,200/mo). | A fast `ultra-authority` → build when ink lands. |
| **Columbia painting (SC)** | Data pulled + ultra-authority handles res+com. Gone quiet — don't chase. | Fast generate if revived. |
| **Top Roofing KY** (Gamaliel, rural) | Ultra-authority report committed (`king_maker_outbound/TOP_ROOFING_KY_ULTRA_AUTHORITY.md`, ~127pp, T1 ~12/T2 ~23 leads/mo, floor-corrected rural math). No contact status. | Blueprint ready if he moves. |
| **THE OFFER (fluid, latest-wins)** | Volume tier: **$497/mo doctrine fronted by July intro $147×3mo→$297 (first ~10)**. NEW 07-04: **capped-payoff comp** for volume ($1k/mo base + per-booked-job fee to fixed ~$25k → drops to ~$500/mo maintenance; CRM attribution agreed UP FRONT = non-negotiable). **NEVER cap the whale** (Mabrey-class = uncapped rev-share/CMO). Partner/CMO cold angle outperforms vendor angle (2-for-2 field signal). | Any pricing/offer surface change: money-page cadence (local → eyeball → confirm → deploy) + pre-market-fluid rails (WE16/WE17 §4 — no à-la-carte, no exposed build price, no "X payments", buyout off-site). |
| **Dormant (deliberately not chased — named so the list is complete)** | Bunns/AMW origin sites (small rural, layup-not-flagship — OS11) · the Charlotte day-one lead · the Nashville pessimist callback. All went quiet; don't-chase-ghosty-leads stands. | Nothing to build. Re-activate only if Joseph names one. |

**Master-MD corpus map (read on demand, don't preload):** `king_maker_outbound/`: `MABREY_ROOFING_MASTER_PLAN.md` (v1.1 ⭐) · `KINGSLAYER_ANATOMY.md` (+ `ultra-research/kingslayer-anatomy-report.md`) · `W-AI_GEO_PLAYBOOK.md` (AI-GEO build spec) · `TOP_ROOFING_KY_ULTRA_AUTHORITY.md` · `BROKEN_ROOFER_WEBSITE_REPORT.md` (1,017-site proof spine) · `ANTI_AD_KINGMAKER_DOCTRINE.md` · `ads/` (red/green map slides). cgrav root: WE17 · `HANDOFF_website-engineer_firm-site_2026-06-30.md` · `KM_SITE_WORKORDER_08/09/10.md` + pricing briefs · `SUMMIT_OAK_STUDY_GUIDE.md` · `KM_DATA_TOOLKIT.md` · `KM_ORGANIC_DOMINANCE_PLAYBOOK.md` (verified organic-over-pack thesis + the one-time off-page levers — feeds Mabrey W1 off-page) · `KM_VALUEPROP_CLAIM_LIBRARY.md` (the cited-claims source for ANY copy that makes a pitch claim) · `ProShield-Roofing-Website-Report.md` (the audit-page source doc). S&O repo: `WO_23_HOME_MAXIMALIST_POLISH.md` (+ `BUILD-CONTRACT.md`, your era). Vault wiki (private): `km-mabrey-roofing-fractional-cmo` · `km-partner-angle-gtm` · `km-kingslayer-anatomy` · `km-density-card-standard` · `component-library` · `km-offer-497-subscription` · `km-enterprise-build-doctrine`. Your WE17 §10 file map stays in force for everything older.

## 4. ⭐⭐ THE WORK ORDER — WO_24: S&O COMPONENT-CAPTURE SWEEP + VISUAL CARD LIBRARY (Joseph-approved 2026-07-04)

**Joseph's ask (verbatim intent):** *"Summit and Oak needs a capture-template update and a capture-component of every card from every section — categorize them by the section they came from — and create a visual library I can open up a folder to view all the different types of cards. Then do this throughout the rest of the site."*

**Why this is the next build:** the component library exists so instructions get shorter AND exacter ("use card-density-1 here" — zero judgment leakage). Only 2 of ~13 homepage card families are captured. This WO makes the whole blessed v2 addressable.

### Deliverables
1. **capture-component** (the Skill, full-precision — one invocation per family) for **every distinct card family on the S&O homepage** — registry-grade specs in `vault/component-library/` (self-contained source excerpt + computed tokens + motion params + states + clone contract), named `family-variant-N` with provenance `summit-oak-roofing @ so-visual-pass @ <sha>`.
2. **Categorized shot folders — the folder-first UX he literally asked for:** `vault/component-library/_shots/summit-oak/<NN-section>/<component-name>.png` (e.g. `03-storm/storm-stat-card-1.png`). Openable in Explorer, browsable with zero tooling.
3. **`vault/component-library/gallery.html`** — ONE self-contained offline page (no external fetches, inline CSS, `file://`-openable): sections in homepage order, each card = embedded screenshot + name + family + "born in" SHA + one-line when-to-use + link to its spec MD. This is the "visual library" upgrade over raw folders.
4. **create-template** (the Skill, full-precision) on the S&O homepage → `vault/component-library/templates/summit-oak-homepage.md`: the section SKELETON (order, wrappers, SectionHeading config per section, band treatments) that **slots atoms by library name, never re-describes them**. Tool-derived coverage ledgers per the skill — claim ≠ done.
5. **INDEX.md updated** — every new entry rowed with status; plus resolve the open amendment: `card-style-2` spec documents mono row-indexes but the blessed homepage instance uses glowing dots → capture as revision or amend (Joseph was offered, never answered — ask him with the capture in hand).

### The homepage section → card-family map (capture inventory; dedupe by FAMILY, don't re-capture the 2 registered)
| # | Section | Component / source | Card atom | Status |
|---|---|---|---|---|
| 1 | Hero | `Hero.tsx` | hero 3-cell stat block (the "same-dims densify" trick) | 🆕 capture |
| 2 | Trust bar | `TrustBar.tsx` | trust-signal chip row | 🆕 capture |
| 3 | Storm | `StormBand.tsx` | storm stat card (ghost numeral rail, 603×120 exact) | 🆕 capture |
| 4 | Services | `ServiceCards.tsx` | density service card | ✅ `summit-oak-card-style-1` |
| 5 | Before/After | `BeforeAfter.tsx` | drag-slider frame | 🆕 capture |
| 6 | Reviews | `page.tsx` shell + `GoogleReviewsWidget.tsx` | dark reviews frame (one-object header-bar + widget) + trust-stack row | 🆕 capture |
| 7 | Why | `Why.tsx` | why card (style-1 application — likely a VARIANT note, not a new family) | 🆕 assess |
| 8 | Process | `Process.tsx` | process step card (ditto — style-1 application) | 🆕 assess |
| 9 | Cost | `CostTeaser.tsx` | cost bento (5-card asymmetric, financing accent) | 🆕 capture |
| 10 | Insurance | `InsuranceBand.tsx` | insurance band card | 🆕 capture |
| 11 | Claims | `ClaimSteps.tsx` | claims timeline step (icon pills, state machine) | 🆕 capture |
| 12 | Library | **inline in `app/page.tsx`** | library hub card | ✅ `summit-oak-card-style-2` (needs the dots amendment) |
| 13 | FAQ | `FaqSection.tsx`/`FaqAccordion.tsx` | accordion item + contact aside | 🆕 capture |
| 14 | CTA | `CtaBand.tsx` | CTA band | 🆕 capture |
*(Also shared atoms that recur INSIDE cards — glowing dot, HeadingUnderline draw, fold motif, ghost arrow — document once as sub-atoms in the specs, not separate registry entries.)*

### Method (the traps are pre-solved — don't rediscover them)
- **Dev server up first** (`WATCHPACK_POLLING=true npm run dev`, :3000); kill before any build. Screenshots = Playwright **element** captures (`locator.screenshot()`), NOT fullPage: **scroll each section into view + settle ~1.8s before capturing** (one-shot in-view animations never fire on unscrolled fullPage — the "90% blank" false-flag), reduced-motion OFF, resting/settled state. Match the existing `_shots/` capture conventions (desktop viewport, per the two registered specs) so the gallery reads uniform.
- Probes: write `.cjs` files (inline `node -e` gets quote-mangled); `NODE_PATH="C:/Users/josep/Claude Gravity/king-maker-site/node_modules"` for Playwright. Tailwind-v4 probe traps: hover-lift lives on `translate` not `transform` · `divide-y` = border-bottom-all-but-last · CSS `uppercase` breaks case-sensitive innerText checks.
- **Capture follows the eyeball:** everything on the shipped homepage is blessed — capturable as-is. Anything NOT eyeball-blessed (inner pages later) = draft status, never "blessed" without Joseph.
- **Family discipline:** style-1 applications (Why/Process) are probably *usage notes on the style-1 spec*, not new families — the registry stays tight; the GALLERY still shows every section's instance. Pick-by-content-type rule stays: promises→style-1, contents/nav→style-2.
- **No lower-model delegation** — capture involves taste-adjacent judgment (family boundaries, resting states). Your session does it; script only the deterministic screenshot loop.
- **Phase 2 (separate green-light):** same pipeline over the rest of the site (36 routes — PageHero, CityPage blocks, materials tier cards, gallery cards, calculators, blocks.tsx atoms…). Homepage first proves the shape; report + let Joseph re-scope.

### Definition of Done (WO_24 / Phase 1)
Every homepage family speced + shot + indexed · shots browsable by section folder · gallery.html opens offline + shows all sections · homepage template MD passes create-template's own coverage ledgers · INDEX rows complete · style-2 amendment resolved with Joseph · **fix-format report with the gallery path + spec links; Joseph's eyeball = the final gate.** No deploy involved (vault + repo-doc artifacts only) — but if you touch S&O source at all, the S&O gate suite runs before any "done."

## 5. ⭐ OPEN LOOPS / QUEUE (beyond WO_24 — by type)
- **🔴 RECOVERY (Joseph picks the mechanism):** S&O no-remote (a: private GitHub remote · b: backup-all fold-in) · `kingmaker-seo-audit/` stale snapshot (cheapest: run `node backup-all.mjs` now — John-Doe-safe) · `king-maker-site/` untracked (carried since WE15).
- **🔴 IN-FLIGHT — Barajas re-engage:** revert John-Doe → real IDs (vault §2-B) + redeploy, WHEN Joseph re-engages. If signed → GBP fix-list = week-1 deliverable.
- **🟡 MABREY W1 (Monday):** be ready to spec/QA the mabreyroofing.com build off master plan v1.1. Presentation-agent idea (screen-share the MD live) was floated for Monday. Inputs to lock: ticket/close-rate/access/domain control.
- **🟡 CARRIED, UNCONFIRMED:** the S&O heading-fade **+25% speed-up** (`components/motion.tsx`, `TypeIn` fade branch: `dur`+`stagger` ×2 → ×1.5) — interrupted 07-03, never resurfaced. **Confirm Joseph still wants it before touching.**
- **🟡 S&O media cache-bust** (§2-A): rename/version `/public` media swapped under same filenames before a prospect demo depends on it.
- **🟢 READY-TO-BUILD on ink:** Raleigh home-security · Columbia painting · Top Roofing KY.
- **PARKED (do NOT remind):** n8n booking re-verify (until A2P carrier vetting clears) · AI-receptionist (field-testing).
- **DECISION-PENDING (Joseph):** S&O de-matrix cleanup (`km-summit-oak-dematrix-decision`) · S&O main-merge · /playbook fate (verify live).

## 6. Locked decisions — your §4 stays IN FORCE + NEW SINCE (attributed; strike-with-date only)
**Your WE17 §4 stands verbatim.** Strikes/updates against it: ~~"S&O PAUSED / main @ d8bd051 source of truth"~~ (07-04: so-visual-pass @ 19e6d2b is truth, contains WO_22) · ~~"/pricing should be 404"~~ (you shipped it 06-30) · ~~"link-in-bio blocked on /work + /system + /playbook rework"~~ (06-30: /work + /system retired/301'd) · WE16's "$497 = the offer" now FRONTED by the July intro window (below) — appended, not struck.
**NEW locks since your handoff (carried verbatim from the OS corpus — all decided OUTSIDE your session):**
- ⭐ **JULY INTRO WINDOW** (Joseph 07-01, FLUID): $147/mo ×3mo → $297/mo, first ~10 clients, then re-anchor $497. Suspends the premium-signal argument to buy the proof stack — not a doctrine reversal. (OS12)
- ⭐ **CAPPED-PAYOFF = volume-tier comp; NEVER cap the whale** (Joseph 07-04): $1k/mo base + per-booked-job fee to fixed ~$25k → maintenance; honesty-via-cap; **CRM attribution agreed up front = the one non-negotiable** (appointments × close-rate, never job-by-job self-report). Mabrey-class stays uncapped. (OS14)
- ⭐ **THE DIAMOND BLUEPRINT** (OS14, from measured kingslayer forensics): the 700-page national-informational library play is DEAD (Ragan/Colony/Rhoden melting -83/-57/-36% Jan→Jun 2026 ETV; they filled a vacuum, dethroned nobody — never pitch "dethroning"). Build the surviving shape: **D1 local money core · D2 niche+local 60-90-piece library · D3 owner-on-camera experience moat · D4 entity-first links (~150-250 real domains/24mo) · D5 report LEADS not vanity ETV.** In Mabrey v1.1 §5.5 — governs every enterprise build from here.
- ⭐ **ENTERPRISE-BUILD DOCTRINE = 9.5 conversion / 9.5 on-page / 9.5 AI-GEO** (OS12+OS13): AI-GEO spec = `W-AI_GEO_PLAYBOOK.md` — SSR non-negotiable · Cloudflare AI-bot unblock · Bing bootstrap · **llms.txt REFUTED, never ship on client builds** · schema = insurance not citation-driver · AI-referral = insurance layer, never a revenue line.
- ⭐ **TWO-TIER PROJECTIONS** (OS11): every client-facing projection shows T1 site+citations+reviews ~15% AND T2 +off-page ~30%; baseline = T1; never stack optimism; 12-mo ramp framing. + ⭐ **10% visitor→lead = the house conversion for enterprise money-term traffic** (Joseph 07-04; change ONE factor, never also inflate capture; generic 5% only for blended-traffic contexts). + ⭐ **COMPETITOR-CEILING METHOD** for any pack projection (OS14): compute every competitor's footprint from the SAME LF scan; the leader's coverage = the empirical bound; project "new market leader," print the receipt on the page.
- ⭐ **NEVER DOWN-REGULATE JUDGMENT/TASTE TO A LOWER MODEL** (Joseph 07-03, LOCKED; WO_23 Sonnet-builder experiment CLOSED). Judgment-transfer is LOSSY — resolve taste to a MOCK/named component, or execute at level. The component library IS the mitigation (named atoms = zero interpretation).
- ⭐ **DENSITY-CARD STANDARD** (Joseph, eyeball-locked, OS13): density = information occupying every zone, NEVER decorative fill; opposing rails + middle mass; there's a saturation point and the blessed cards sit AT it. + **HONEST-COUNTS** (OS14): any stat a page shows about itself = the REAL rendered count of the destination, verified. + **REAL-OR-ABSENT** trust signals: never fabricate BBB/plat profiles — absence beats fake.
- ⭐ **ONE KING PER CITY** (OS11) · **FREE-AUDIT = the outreach engine** (OS11; the audit-page pattern §2-C is its productized form) · **JOSEPH-FRONTED = RAW POLE** (Joseph 07-04: his VSLs/ads = white/black typed-in-Paint cue cards, zero polish, ONE variation; client sites 9.5-polished — never style HIS assets) · **ONE-FINDING-PER-VIDEO** (short-form scope).

## 7. Failures & dead-ends — your §5 stays IN FORCE + NEW SINCE (the design-session bug corpus — directly relevant to WO_24 and any S&O motion work; all hit OUTSIDE your session)
- ⭐ **Clipped-element IntersectionObserver bug** (OS13): an element clipped to zero visible width (`clip-path: inset(0 103% 0 0)`) NEVER reports `isIntersecting` in Chromium → every IO trigger on it silently never fires. Observe an UNCLIPPED ancestor + a geometry check. (Ate ~6 trigger architectures.)
- ⭐ **Reduced-motion mount-guard bug** (OS13): a mount-guard deferring the real preference one tick races `whileInView once` on WebKit → reduced-motion Safari got an INVISIBLE form. Fix: `useSyncExternalStore` + CSS `@media(prefers-reduced-motion)` backstop; QA reduced-motion in REAL WebKit asserting content VISIBILITY.
- ⭐ **The typewriter saga** (OS13): wall-clock fallbacks mask trigger failures as passes (assert HOW it became visible) · re-rendering a framer keyframe animation RESTARTS it (memoize) · Chromium froze short CSS `steps()` wipes. End state was vanilla-owned (rAF + own IO); Joseph then killed the effect entirely — **abandon marginal effects decisively, no sunk-cost.**
- ⭐ **Same-filename asset swap + immutable cache = stale for every past visitor** (OS13): §2-A open item. Rename/version media on swap; diagnose by byte-compare local vs prod, never assumption.
- ⭐ **Unscrolled fullPage capture FALSE-FLAGS scroll-reveal sites** (OS14): one-shot in-view animations never fire → vision reads "90% blank." Scroll-through in viewport steps + settle BEFORE capturing. (Baked into WO_24 method.)
- ⭐ **Anonymize-then-lose** (OS14): anonymizing the only on-disk copy destroyed the real Barajas version everywhere but conversation memory. Snapshot/commit BEFORE anonymizing.
- **Vercel CLI v54 prints a JSON-fragment tail** on `deploy --prod --yes` — looks broken, isn't; verify by curl'ing content markers, never CLI output. · **Playwright headless scroll quirks:** click-triggered smooth-scroll needs ~1.8s settle + doesn't fire trailing scroll events (active-nav lag = cosmetic); `scroll-margin-top` needed under sticky navs (164px on audit pages). · **Tailwind v4 probe traps** (§4 method). · **Rural 10-floor phantom baskets** (OS14): 12 kws × Google's 10-floor ≈ fake ~120/mo per town — floor-correct (~50-70% haircut) + population-sanity (2-4 searches/mo per 1k pop); SERP-check the radius perimeter. · **DataForSEO gotchas** (OS12): ONE task/POST + ~12/min · volume floors at "10"≈0 · near-synonyms cluster (don't sum) · DMA≠radius · small towns 404. · **LF `getLocalFalconReport` fieldmask bloat** (672KB): parse the saved tool-result file with node — it contains the full competitor-ceiling data (a feature).

## 8. Tooling gotchas + deploy/verify (delta on your §6/§7 — those still stand)
```bash
# S&O dev (:3000) — kill before ANY build (.next collision):
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing" && WATCHPACK_POLLING=true npm run dev
netstat -ano | grep :3000   # → taskkill //PID <pid> //F
# S&O ship gates (all must green before "done"; server :3210 for the suite). NOT the complete list —
# your §7 adds playwright desktop+mobile + heading-legibility (AI-legibility IS an S&O gate; firm site NO):
npm run typecheck && npm run build && npm run security-audit && npm run doorway-check && npm run reachability-check
git checkout -- security-receipt.json   # gate residue — restore after
# Market pull for any client build (creds: king_maker_outbound/config/.env → DATAFORSEO_AUTH):
node "C:/Users/josep/.claude/skills/ultra-authority/scripts/market-data.mjs" --state "North Carolina" --conv 0.10 --cities "A,B" --keywords "k1,k2"
npx vercel@latest deploy --prod --yes    # .vercel.app alias auto-updates; CLI v54 JSON tail is cosmetic — curl-verify
# FIRM SITE — after EVERY --prod deploy, re-alias BOTH + byte-check the PUBLIC host:
cd "C:/Users/josep/Claude Gravity/king-maker-site" && npm run build && npx vercel@latest deploy --prod --yes
npx vercel@latest alias set <deployment-url> www.kingmakerseo.com && npx vercel@latest alias set <deployment-url> kingmakerseo.com
# AUDIT PAGES:
cd "C:/Users/josep/Claude Gravity/kingmaker-seo-audit" && npx vercel@latest deploy --prod --yes
# Playwright probes for standalone sites (write .cjs files, never inline node -e):
NODE_PATH="C:/Users/josep/Claude Gravity/king-maker-site/node_modules" node <probe>.cjs
# Recovery ritual at session end:
node "C:/Users/josep/Claude Gravity/backup-all.mjs"   # snapshots memory/skills/firm-site/client-deliverables → pushes 4 private repos
```
- **Skills-gate v2 is REAL-invocation** (PostToolUse logger; name-dropping can't pass). Fires on `components/`+`app/` edits AND motion files. capture-component / create-template / verify-before-claim / km-handoff are **full-precision — they suspend rapid/edit mode**. Honor Joseph's `🟢 (rapid)` marker otherwise; auto-escalate on builds/deploys/pushback.
- **Vault access:** semantic search `mcp__obsidian-search__search` with `scope:["-raw_sources","-log.md","-sessions-recent"]`, never `rerank:true`. Read `vault/CLAUDE.md` before writing; Mode-D captures to `vault/inbox/` if unsure where.
- CSS agent owns security layers on BOTH sites (`app/api/lead`, `lib/server/*`, `security-audit.mjs`) — don't clobber. A2P copy = carrier-referenced, hands off (§2-B).

## 9. ⭐ Taste & calibration — your §8 stays IN FORCE + NEW SINCE (the layer that drifts worst)
**All of your WE17 §8 stands** (caveman bullets · moderate emoji, NO exclamation points · ultrathink keyword · fix-format hyperlink+Was/Fix · pixels-verified before "done" · eyeball overrides vision-SHIP · concede-with-ground-truth · component-first · overstimulation threshold · build-stop nuance · pre-market fluid · two voices never crossed…). **New since your handoff (OS13/OS14, attributed — learned in the live design sessions):**
- ⭐ **"If I'm wrong, don't force it"** (Joseph 07-04): he EXPLICITLY invites data-refutation of his own instincts. Twice in one day: his 10% conversion push was RIGHT (the agent under-called it); his greener-map push was WRONG (ceiling data). Same method both times: **compute, don't argue — show the receipt.** He thanks you for the catch.
- ⭐ **Directional-intensity instructions are his ideal input** ("double the density", "100% remix", "same dims", "speed up 25%"): honor the % EXACTLY, verify by probe (±2px on dimension locks), hand trim-levers back.
- ⭐ **Balance overrides density when they conflict** (the fulcrum principle): when a section "tips," he trims hard (bento 11 bullets → 5). Density is the instinct; balance is the veto.
- ⭐ **Negativity-bias catch** (his): never display a stat that invites computing the complement ("92% five-star" → "what's the 8%?"). Trust-stack heterogeneous signals (tenure/volume/cert/warranty/license), each exactly once per surface.
- **Dot-language scoping:** he loved the glowing dots and spread them HIMSELF, scoping explicitly ("just these cards") — apply exactly where pointed, never offer site-wide.
- **Consistency = reducing interpretation** (his words on the library): a visual referent under an instruction makes it precise — "oh THIS is what you mean." Each capture makes future instructions shorter and exacter. That's WO_24's whole purpose.
- **Decisive, no sunk-cost** (killed the typewriter after hours of work, cleanly) · **he's an equal partner in architecture** (the capture-split and no-downregulate rule were HIS pushes, both right — weigh his systems proposals hard) · **alpha/beta reps framing** on his content: critique format/words, never lighting/looks ("we ball") · **anonymize-for-public ritual:** client artifacts get John-Doe'd (name + ALL phones + domain) before public recording; market data + reviews stay real.

## 10. Coordination + report-back
| Agent | Contract |
|---|---|
| `vault-agent` (OS15, the sender) | Reply/questions via bus. Owns vault + fleet coordination; will ingest your Mode-D drops. |
| `human` (Joseph) | Router, deploy gate, **final eyeball on everything**, offer numbers, outreach. NEVER touch his mailbox. |
| `cold-outreach-specialist-6` | A2P owner (carrier vetting in flight); don't overwrite their compliance copy. |
| `n8n-claude-architect-1` | PARKED until A2P clears — do not ping about the booking re-verify. |
| `cyber-security-specialist-1` | Owns security layers both sites. |
| meta-ads-specialist-1/-7 | Leave. |

**Report in fix-format** (hyperlink + Was/Fix, per fix, every surface — your standing discipline). Mode-D capture durable learnings to `vault/inbox/` before your session ends. Ack the 4 mailbox items after absorbing (§0.4). When YOUR arc eventually ends: write `AGENT-WEBSITE-ENGINEER-18-<date>.md` via `/km-handoff`, carrying your WE17 base + this sync's corpus forward verbatim.

---
*— vault-agent OS15, 2026-07-04. The week in one line: S&O went from "paused" to a Joseph-directed live redesign shipped to prod (density cards → component library born), your firm-site launch held (plus A2P landed on it), the audit engine produced two live prospect pages (one mid-meeting with a real Local Falcon scan), the Mabrey whale program starts Monday, the offer grew a capped-payoff volume tier, and the Diamond Blueprint replaced the 700-page library play. Your first move after the sync: check in with Joseph — WO_24 card-library sweep (approved, spec'd in §4) + the §5 queue — and let him pick. Verify pixels, cite receipts, and the eyeball is the gate.*
