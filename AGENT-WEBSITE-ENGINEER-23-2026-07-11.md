# HANDOFF — King Maker website lane → **Website Engineer 23 (WE23)**

**From:** WE22 · **To:** WE23 · **Date:** 2026-07-11 (~9:15 AM ET) · **Lineage:** WE4→…→WE20→WE21→**WE22**→you
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey Roofing site** (`mabrey-roofing/` — first paying client, **LIVE on mabreyroofing.com**) + the **NEW Mabrey Construction site** (`mabrey-construction/` — Sean's GC arm, **build IN PROGRESS**) + the **KM firm site** + **Summit & Oak** + the **component library + PLAYBOOK + design doctrine** + the **launch-builder/WO workflow** + the **km-engine audit/plan/architecture pipeline** + the **skill/gate spine** + GTM + coordination with vault-agent / n8n / meta-ads / cos.

> ⭐ **YOUR BASE CORPUS — these stand VERBATIM; THIS file is the DELTA on top. Read in order:**
> 1. **`AGENT-WEBSITE-ENGINEER-22-2026-07-09.md`** (WE21→WE22 — the full §4/§5/§8 corpus + the hack/cutover arc; still on disk). Its §4/§5/§8 are carried into THIS file's §4/§5/§8.
> 2. `AGENT-WEBSITE-ENGINEER-21-2026-07-07.md` + `-20-2026-07-07.md` (**AUTHORITATIVE on Mabrey client facts** on any conflict).
> ⭐⭐ **DESIGN LAW:** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (now TWO registers). **NUMBERS:** `~/.claude/skills/km-engine/MODEL.md`.
> **Compound, don't re-derive.** §4/§5/§8 carry the corpus forward + add the WE22 arc; strikes are dated, never silent.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)

1. **READ loop:** reread THIS file in an ultrathink loop until a pass yields no new info (min 3). Name what each pass ADDED.
2. **Preflight:** fire `/kmwe` (gates + doctrine + PLAYBOOK). *(mabrey-roofing/ + mabrey-construction/ are NOT verify-gate-guarded worktrees — gates here are discipline, run them anyway.)*
3. **RE-VERIFY these volatile claims (dated 2026-07-11 ~09:15) by RUNNING the commands — a handoff fact is a LEAD, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -2        # expect tip db334a1; remote PRIVATE; in-sync
   git -C "C:/Users/josep/Claude Gravity/mabrey-construction" log --oneline -1   # expect ONLY c8787cd (base) — the WO edits are UNCOMMITTED on disk
   git -C "C:/Users/josep/Claude Gravity/mabrey-construction" status --porcelain | wc -l   # was 24 (WO_01 mid-execution)
   # 🔴 The GSC /contact fix — re-verify LIVE before Joseph clicks GSC "Validate Fix":
   curl -s --resolve mabreyroofing.com:443:76.76.21.21 https://mabreyroofing.com/contact | grep -o 'ratingValue' | wc -l   # WANT 1; WE22 saw 2 live (edge-cache lag or promoted deploy ≠ db334a1)
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY (acked 2 vault-agent msgs)
   ```
4. **Mailbox:** empty at handoff (acked vault-agent's 2 GSC-fix status messages). Ack ONLY what you newly handle. **Never touch `human`'s mailbox** (119 unread — not yours).
5. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, ask which. ⚠️ **The #1 live thing is the WO_01 build in progress (§3-1) — a builder session is mid-execution; do not clobber it.**

---

## 1. What this is

King Maker sells done-for-you authority contractor sites + organic SEO. **Mabrey Roofing (Durham NC; Sean Mabrey, veteran-owned) is the FIRST PAYING client** — $497/mo CMO retainer (Joseph = CMO) + rev-share; also THE case-study asset (honest counts + receipts are the product). **NEW this arc: Sean's construction arm (mabreyconstruction.com) became a SECOND FRONT** — km-engine worked it up (STRONG fit), and a full rebuild WO is authored + executing.

**WE22's arc (this session) = seven halves:** (B) closed the git-remote recovery gap on both client repos. (C) ran the perf/WebP pass and **deployed it live** to mabreyroofing.com. (D) housekeeping + vault ingest. (E) ran the **full km-engine on mabreyconstruction.com** — audit page + master plan + architecture. (F) forensic double-check of the vendor engagement ($750/mo, 15 months, 4 misspelled-brand keywords, a doorway batch, a 69k-backlink mirage). (G) built a custom **"Fifteen-Month Record"** forensic section into the audit page. (H) **corrected the builder attribution** (Brendan did NOT build the construction site — LeadsManagerApp did). (I) **deep-captured the light register** (9 atoms + template manifest). (J) authored **MABREY_CONSTRUCTION_WORKORDER_01** (judgment-zero, wo-audit GREEN). (K) bumped the WO base to db334a1 after vault-agent's GSC fix landed.

---

## 2. ⭐⭐ CURRENT STATE (volatile — captured by RUNNING commands, 2026-07-11 ~09:15)

### A. Repo / working-tree three-way (the invisible-work trap — READ CAREFULLY)
| Repo | State |
|---|---|
| **`mabrey-roofing/`** | branch `master` · tip **`db334a1`** (vault-agent's GSC /contact fix, on top of WE22's `3d6e97d`) · **remote PRIVATE `github.com/josephspells-Cgrav/mabrey-roofing` — IN SYNC** ✅ (recovery gap CLOSED this arc) · working tree: `.we22-capture/` untracked (scratch, harmless) |
| **`mabrey-construction/`** 🔴 | **NEW repo — WO_01 EXECUTION IN PROGRESS (a parallel builder session).** 1 commit only: **`c8787cd Base: … @ db334a1`**. **24 files edited but UNCOMMITTED on disk** (`git log` shows ONLY the base — the classic invisible-work trap). NO remote. NO `.next` (not built). See §3-1 for the exact done/pending split. |
| **`summit-oak-roofing/`** | tip `3f427a1` · branch `so-visual-pass` · **remote PRIVATE (all 15 branches pushed this arc)** ✅ · untouched otherwise |
| **`kingmaker-seo-audit/`** | tip **`0d48b7e`** (Mabrey Construction audit + the Fifteen-Month Record section) · in-sync · **NOT deployed** (untracked in public cgrav by design; deploy needs Joseph's GO) |
| **`king_maker_outbound/`** | tip **`a1aff3b`** (WO base-SHA bump) · in-sync · holds the plan + architecture + WO + builder prompt (private) |
| **DEPLOYED** | **mabreyroofing.com = PRODUCTION** (perf pass + GSC fix both live per vault-agent; home 200, hero=webp). ⚠️ live /contact schema flag — §3-6. |

### B. 🔴 The Mabrey Construction build — EXACTLY where it stands
WO_01 (`king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_01.md`) is being executed. Progress from the 24 uncommitted files:
- **DONE (edited, uncommitted):** `lib/business.ts` `costData.ts` `funnel.ts` `gallery.ts` `metadata.ts` `reviews.ts` `schema.ts` `service-boards.ts` `services.ts` `site.config.ts` `sitemap-registry.ts` `middleware.ts` · `app/about/page.tsx` `layout.tsx` `page.tsx` `services/page.tsx` `sitemap.ts` · `components/AlertBar.tsx` `CostTeaser.tsx` `EstimateQuiz.tsx` `Footer.tsx` `Header.tsx` `ServiceCards.tsx`. (Home H1 "Your Home, Built With No Surprises" present; SITE_URL = mabreyconstruction.com; services = custom-homes/home-additions/decks.)
- **PENDING:** the **route kill-list** (§L9 — `app/blog` `storm-damage` `brands` `certifications` `commercial-roofing` `es` `faq` `financing` `materials` `locations` `service-areas` `projects` `gallery` `reviews` `review` `roofing-cost` `roof-cost-calculator` `warranty` still present, NOT deleted) · `app/contact/page.tsx` + `terms` + `privacy-policy` string swaps (not in the edited set) · `app/services/[service]/page.tsx` four edits · **package.json name** still "mabrey-roofing" · **build + gates** (no `.next`, nothing verified) · commit of the WO edits.
- **DoD not met yet** — the build is roughly 60-70% through the edits, uncommitted, unverified. **Do NOT re-run the WO from scratch; coordinate on execution status before touching this repo.**

### C. km-engine deliverables (Mabrey Construction — all committed)
- `king_maker_outbound/MABREY_CONSTRUCTION_MASTER_PLAN.md` (v1.0 — §1-13, honesty banner, capacity-gate framing)
- `king_maker_outbound/MABREY_CONSTRUCTION_ARCHITECTURE.md` (~116 pages; land-funnel kept as the differentiator)
- `kingmaker-seo-audit/mabrey-construction/index.html` (6-part audit + the **Fifteen-Month Record** case file) — **NOT deployed; awaiting Joseph's GO** to `cd kingmaker-seo-audit && npx vercel@latest deploy --prod --yes`.

### D. Gate status (mabrey-roofing @ db334a1)
Last full WE22 gate run (@ 074debb, pre-GSC-fix): tsc clean · build 141/141 · doorway PASS · reachability PASS · axe 0 serious ×41 · gaps 0. The GSC fix (db334a1) is schema-only; vault-agent verified tsc+build clean on it.

### E. Scheduled task
`mabrey-indexing-reminder` (cron `0 23 * * *`) — the WE21 nightly GSC batch reminder. WE22 brief said **CANCEL after ~July 13**. Today = July 11. **Re-check `list_scheduled_tasks`; cancel when all valuable pages are requested or after Jul 13.** (Not verified this arc.)

---

## 3. ⭐ OPEN LOOPS (by type — each with a Definition of Done)

### 🔴 1. IN-FLIGHT — the Mabrey Construction WO_01 build (a parallel builder is executing)
State in §2-B. **DoD:** kill-list deleted · contact/terms/privacy + `[service]` edits applied · package.json renamed · gates green (build + the §9.1 route truth-table: 9 page routes, killed routes 404, doorway/reachability/axe pass) · dev server up for Joseph's eyeball · edits committed. **Your role (architect):** when the builder reports done, **RE-VERIFY independently** (report-clean ≠ is-clean — the forge-loop law) before Joseph's eyeball, before any deploy. If the builder is stuck, the WO's §9.2 trap playbook + HALT law govern.

### 🔴 2. AWAITING USER GO — deploy the construction audit page
`kingmaker-seo-audit/mabrey-construction/index.html` is built + verified (markers, banned-words clean, grids render). **DoD:** on Joseph's GO, deploy the audit repo (ships ALL client folders), content-verify by curl on "4,680" + "26.53" + the Fifteen-Month markers. It's the close asset for the $750/mo-vendor conversation.

### 🔴 3. AWAITING USER — the $750/mo destination question (before the construction site goes public)
Joseph needs to confirm with Sean: **where does the $750/mo actually go** — LeadsManagerApp (the construction site's builder, most likely) vs Monahan (roofing services, possibly conflated)? The audit page's ledger line "the engagement behind this record runs $750 a month" is accurate either way, but the framing of the Sean conversation depends on it. **DoD:** Joseph's answer; adjust the audit's one sentence if needed (30-sec edit).

### 🟡 4. AWAITING USER + OTHER-AGENT — the roofing lead pipeline (leads still EVAPORATE)
Carried from WE22: `LEAD_WEBHOOK_URL` UNSET on Vercel → the contact form + quiz forward NOTHING. Joseph said (07-10) he'd wire it "tomorrow." **DoD:** `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET` set in Vercel → e2e test submission arrives. The SAME gap will apply to the construction site once it deploys.

### 🟡 5. AWAITING USER (Sean, via Joseph) — real content intake (roofing + construction)
Roofing (carried): 16 real GBP review texts → `REAL_REVIEWS`; cert/marquee confirm (the homepage logo marquee is STILL live-as-is = a live FTC exposure pending Sean's cert confirms — WE21/WE22 flagged it, never resolved); real jobs/photos; legalName/license#; GA4 + Meta Pixel IDs. Construction: real project photos (before/after empty-guarded), the REAL professional-membership list, license #, per-project real ticket bands (the WO uses master-plan typical ranges as placeholders), and **create the Mabrey Construction GBP** (none exists — the #1 lever from the master plan).

### 🔴 6. RE-VERIFY — the live /contact GSC fix
vault-agent committed+pushed+deployed the fix (db334a1) and reports live 2→1. **A WE22 re-curl of live /contact still showed 2 `AggregateRating` / 2 `ratingValue`** (source at db334a1 IS correct — contact refs org by @id). Likely edge-cache lag or the promoted deploy on that path isn't db334a1 yet. **DoD:** re-verify with a fresh curl / GSC Rich Results Test showing 1 rating BEFORE Joseph clicks GSC "Validate Fix"; if still 2, force a redeploy of the current master tip.

### 🟡 7. Carried code/quality debt (roofing)
Hero subhead `line-clamp-3` truncates mid-sentence on long-intro pages · `BUSINESS.stats` "500+"/"15+" soft (confirm vs Sean's real numbers) · disavow file (`king_maker_outbound/mabrey-disavow-2026-07-09.txt`, 52 domains) still not uploaded to GSC (defensive, not urgent) · the security-incident report (`mabrey-security-incident-report-2026-07-09.md`) still SEND-READY pending Joseph's call.

### 🟡 8. WO_02+ (the construction rollout — after Joseph's exemplar eyeball)
WO_01 = foundation + 3 exemplars only. Rollout WOs (author with launch-builder, judgment-zero): the remaining 11 services, the 22 location pages (real-content-or-county-hub), the 38-item resource library, the 6-page land-development funnel, the materials axis (gated), project case studies. 7 light-register atoms are QUEUED for capture (§10) to support these.

### 🟢 9. Housekeeping
Vault inbox: this handoff adds one note → "ingest inbox". cg-main current-state STALE.

---

## 4. Locked decisions — CARRIED VERBATIM (WE21→) + NEW THIS ARC (WE22)

### 🆕 NEW LOCKS (WE22 arc)
1. ⭐⭐ **mabrey-construction is a SEPARATE ENTITY / SITE / REPO — the fleet-footprint law is load-bearing** (MODEL.md §7). Same owner + address + template-system as roofing → Google detects templated patterns ACROSS domains (Sept-2025 spam update). Mandatory + non-negotiable: **`GeneralContractor` schema subtype** (never RoofingContractor/generic LocalBusiness) · **phone (984) 464-4188** (never the roofing (919) 795-6983) · **100% unique body copy** (the design system repeats, the CONTENT never) · exactly **ONE brand-level cross-link** to mabreyroofing.com (footer), no shared money-page linking.
2. ⭐ **WO_01 base = `db334a1`, NOT 3d6e97d** (bumped this arc). db334a1 = the template-manifest capture + vault-agent's GSC /contact fix; linear descendant. The construction clone inherits the schema fix (contact refs org by @id — do not re-introduce the duplicate emit).
3. ⭐ **NO GBP exists for Mabrey Construction** → `rating`/`reviewCount` = 0, `googleReviewUrl` empty, home OMITS the reviews board + marquee, schema aggregateRating/review are CONDITIONAL (`reviewCount > 0`). Real-or-absent floor. Creating the GBP is the master plan's #1 lever.
4. ⭐ **Brendan Monahan did NOT build mabreyconstruction.com** — the footer credits **LeadsManagerApp.com** (a lead-mgmt SaaS/agency, CT phone (860) 631-4570); WP authors are gmail freelancers; it's absent from WE21's 231-domain RSC portfolio scan; wrong stack (hello-elementor vs RSC's Astra+Essential Addons). **Implication: rebuilding the construction site does NOT touch Monahan — the org-chart entanglement is roofing-only.** (The "same guy" premise was wrong; see §8.)
5. ⭐ **The 9 captured light-register atoms + `MABREY_ROOFING_TEMPLATE_MANIFEST.md` ARE the construction build source** — transplant law made concrete. Clone the source kit (`vault/component-library/sources/mabrey/`), re-map tokens, compose by atom name, verify with each spec's CLONE CONTRACT. Never regenerate motion.
6. ⭐ **`.vercelignore` MUST exclude `.next`** — a stale local `.next` (213MB build output) uploads and breaks the Vercel build at "Downloading deployment files" if not ignored (§5). This is now committed in mabrey-roofing's `.vercelignore` and rides into the clone.

### 🔴 STRIKES (from WE22 brief, still struck — recorded not silent)
- ~~"mabreyroofing.com → old WordPress / DO NOT TOUCH DNS / never deployed"~~ (WE20) — SUPERSEDED: the site is LIVE in production, DNS is Sean's at GoDaddy pointed at Vercel, MX preserved. DNS is a live production lever you own; **NEVER touch MX when changing it**; verify via DoH/forced-resolve, not a raw local curl.

### Carried VERBATIM (WE21→, the load-bearing ones — full text in WE22 brief §4)
- ⭐⭐ **THE SITE IS LIVE IN PRODUCTION.** Every roofing edit hits the real client domain on `deploy --prod`. Full-precision care; **only on Joseph's explicit GO.**
- ⭐ **Sean CONTROLS the domain** (GoDaddy). The vendor (Raleigh SEO Co / Brendan Monahan) never owned the registration. No hostage situation.
- ⭐ **The hack was ISOLATED** (1 of 31 RSC clients). **Never frame it as "the vendor got everyone hacked" — false.** The defensible line: "Sean's site specifically was popped and sat unnoticed 15 weeks by the company paid to watch it." Negligence ≈ 8.5/10.
- ⭐ **No Google penalty (GSC-confirmed).** The domain's real asset = the GBP (portable); domain "age" is not a ranking factor.
- ⭐ **The legacy-URL middleware is load-bearing** (`middleware.ts`) — 410s the ~37k WP spam shapes, 301s real old flat pages. The construction site's WO ships its OWN middleware map (the 18 doorway posts + WP shapes → 410).
- ⭐ **Request-Indexing is a ONE-TIME accelerant** (~10/day cap). The sitemap is the permanent auto-indexer.
- ⭐⭐ **Two registers never crossed:** S&O = red-glow-on-charcoal (DARK); Mabrey (roofing + construction) = blue-brand-on-white, scarce red, **glow DEAD**. **FIRM SITE (kingmakerseo.com) EXEMPT** — blue/white readable-first.
- ⭐ **ONE UNIVERSAL HERO** (`components/Hero.tsx`, fixed-height `h-[86vh] min-h-[640px]`); `aside` DEFAULTS to `<EstimateQuiz/>`; never make it `min-h`.
- ⭐ **OPUS/FABLE SCOPES · lower-tier EXECUTES · top-tier GATES.** A swarm is WRONG for a uniform transform over shared components — one deterministic executor, fan out only verification.
- ⭐ **`.so-card` signature · card-title underline (`height=2`) = BLUE · section-H2 underline (no height) = RED · hardcoded counts BANNED (derive) · materials catalog deliberately complete.**
- ⭐ **Governing-brief LOCKS (WE20 §4):** ~95% pure roofing (roofing site) · 17 location pages (roofing) · GC work = one contained section (roofing) · location pages WITHOUT proof modules · one Durham office (never imply Raleigh) · client numbers = MODEL.md · AI-GEO per playbook (SSR + `.seo-answer` + no llms.txt) · **NEVER fabricate reviews/jobs/certs (FTC + real name).**
- ⭐ **DO-NOT list:** no fabricated trust signals · no implied Raleigh office · no S&O identity in metadata · never quote master-plan §8 numbers · no GC content beyond Other-Services (roofing site) · **don't edit `components/` to REBRAND** (content→`lib/`; structural/design work on shells is fine) · don't re-explain settled doctrine · **no deploy without GO, no "done" without gates run.**

---

## 5. Failures & dead-ends — CARRIED VERBATIM (WE21→) + NEW THIS ARC

### 🆕 NEW THIS ARC (WE22)
1. 🔴 **THE `.next` DEPLOY FOOTGUN.** A stale local `.next` (213MB) was uploading to Vercel because `.vercelignore` never excluded it → the build died at "Downloading deployment files" (empty error, "retry deploy") **3× identically** across two upload sizes. Global Vercel status was green; local build was green. **Diagnosed at the UPLOAD-MANIFEST layer** (not code, not platform): `vercel deploy --force` revealed the true 170MB fileset (dedup hides it), and a `find` for large non-ignored files surfaced `.next`. Fix: add `.next/` + dev-artifact globs to `.vercelignore`, delete the local `.next`, redeploy clean. **Lesson: when a Vercel build fails before any build step with an empty message, it's the upload set, not your code — check `.vercelignore` covers `.next`.**
2. 🔴 **GITHUB 100MB HARD LIMIT blocks a push over BLOB HISTORY, not the working tree.** mabrey-roofing had a 123MB `.wo23-verify/pathB-upscaled.mp4` deep in git history → push rejected even though the file wasn't in the tree. Fix: `git filter-repo --path .wo23-verify --invert-paths --force` (safety bundle FIRST: `git bundle create ../pre-filter.bundle --all`). Rewrote history (SHAs changed); the bundle is at `Claude Gravity/mabrey-pre-filter-2026-07-10.bundle`.
3. 🔴 **INSPECT THE BODY, NOT THE STATUS CODE.** Two instances: (a) `/web-casino/` returns 308→404 not a flat 404 (trailing-slash normalization runs ahead of middleware — same de-index outcome, don't panic at the 308). (b) **The Brendan attribution** — the site's own footer credit ("Designed by LeadsManagerApp.com") was the answer the whole time; a "same guy" claim through two hops (Sean→Joseph) was a LEAD, not a truth. **Check the footer credit FIRST on any builder-attribution question.**
4. 🔴 **THE INVISIBLE-WORK TRAP, MADE REAL.** The WO_01 builder has **24 edited files UNCOMMITTED on disk** — `git log` shows only the base commit. A successor trusting `git log` would think nothing was built. **Always `git status --porcelain`, not just `git log`, on a repo someone else touched.** (This is why §2-B exists.)
5. ⭐ **SUB-AGENT REPORT ≠ TRUTH.** The audit-page sub-agent reported green with receipts; WE22 independently re-verified on disk (markers present, banned-words word-boundary grep = 0 — the raw `grep -ci "thin"` false-positived on `antialiased`, caught by `grep -cwi`), rendered the grids, eyeballed. **Trust-but-verify every sub-agent deliverable.**
6. ⭐ **A 0-child-reporter render is invisible even when live.** The dead `HeroStage` video layer had zero reporters, band height 0 everywhere — but still preloaded its poster at high priority on every page + pulled a hidden 2.4MB video on first click. **"Renders nothing visible" ≠ "does nothing" — check what a dead component still loads.**

### Carried VERBATIM (WE21→, full text in WE22 brief §5)
- 🔴 **THIS MACHINE'S DNS RESOLVER FLAPS old/new post-cutover.** A raw local `curl mabreyroofing.com` is NOT ground truth. Verify via `dns.google/resolve` + `curl --resolve mabreyroofing.com:443:76.76.21.21`.
- 🔴 **DNS cutover email trap:** switching nameservers = blank zone → re-create MX FIRST or email dies. GoDaddy auto-injects stricter DMARC → soften to p=none. Order: NS → MX → SPF/DMARC/A/CNAME.
- 🔴 **GSC browser-automation gotchas:** URL-inspect deep-links 404 (use the dashboard bar); screenshots hang during inspection (drive by `read_page` refs); dismiss+type in one batch swallows the URL (wait 3s); ~10/day quota.
- ⭐ **A scheduled cloud/headless agent CANNOT pilot the local browser** (needs the live logged-in session) — a reminder is the most you can automate.
- ⭐⭐ **soul_2 GARBLES fake text/logos ~20-100%** → `nano_banana_pro` for hero/text-adjacent gens; vision-QA every gen.
- ⭐ **A HAND-ENUMERATED FILE LIST is how you miss files** → sweep by PATTERN, grep-verify 0 residual. **`axe: 0 violations` ≠ no invisible text** (white-on-white = `incomplete`).
- ⭐ **The `scripts/` contamination class** on a clone (source-site constants in gate scripts → vacuous "0-target" passes) — grep `scripts/` too; a 0-target gate pass IS a failure.
- ⭐ **A backgrounded `next start` inside one Bash call is torn down when it returns** → `nohup … &` or separate `run_in_background`; assert a styled render before trusting a capture.
- ⭐ **Tailwind opacity modifiers compile to `oklab()` not `rgb()`** — verification regexes must match both (bit WE22 on the `border-red/60` probes).

---

## 6. Tooling gotchas (delta on base §6 — those stand)

- **km-engine data pipeline (this arc, all worked):** DataForSEO MCP — `kw_data_google_ads_search_volume` (chunks of 10, DMA + city calibration), `dataforseo_labs_bulk_keyword_difficulty` (national), `serp_organic_live_advanced`, `dataforseo_labs_google_historical_rank_overview` (the "how long ranking" answer), `backlinks_referring_domains` (the mirage decomposition), `domain_analytics_whois_overview`. **Local Falcon:** `runLocalFalconScan` returns a report_key + pending (does NOT block) → **delegate the poll+extract to a sub-agent** (the report is huge). Scan `28766ef2ca920e4` (custom home builder grid) is durable in the account.
- **Wayback for site age:** `curl "http://web.archive.org/cdx/search/cdx?url=<domain>&output=json&limit=6"` (first snapshots) + `limit=-6` (recent). Two-snapshot history = a dead/unlinked site.
- **`wo-audit.mjs` (launch-builder):** run `node ~/.claude/skills/launch-builder/wo-audit.mjs <WO.md>` before emit. Its oracles are literal: pasted-file headings must be `NEW FILE|REPLACEMENT|EDIT ... \`path.tsx\`` (keyword BEFORE the backticked path); base SHA must match `base \`[0-9a-f]{7}\``. GREEN required to emit.
- **Deploy (roofing):** `npx vercel@latest deploy --prod --yes` (account `josephspells-2634`, project `mabrey-roofing`) → ships to mabreyroofing.com. Verify by curl on content markers via forced-resolve. **Audit deploy:** `cd kingmaker-seo-audit && npx vercel@latest deploy --prod --yes` (ships ALL client folders).
- **robocopy** (WO §1 clone): exit codes 0-7 are SUCCESS. `.vercel/` survives robocopy `/XD` misses — `rm -rf .vercel` after.
- Reusable probe scripts (repo root, gitignored `.*.cjs`): WE22 added `.we22-capture-probe.cjs` (live-prod computed-style + shot capture, forced-resolve), `.we22-live-shot.cjs`, `.we22-shots.cjs`, `.we22-record-shot.cjs`. DNS/HTTP probes run inline via Bash+DoH.

---

## 7. Deploy + verify (fenced)

```bash
# ROOFING — LIVE. Only on Joseph's GO. Gate stack from mabrey-roofing/, dev killed:
npm run typecheck && npm run build          # expect 141/141
nohup npx next start -p 3210 >/dev/null 2>&1 &
npm run doorway-check && npm run reachability-check
node .axe-multi.cjs                          # reduced-motion axe (check incomplete too)
node .we21-gapaudit.cjs
npx vercel@latest deploy --prod --yes        # → mabreyroofing.com — ONLY on GO
curl -s --resolve mabreyroofing.com:443:76.76.21.21 -o /dev/null -w '%{http_code}\n' https://mabreyroofing.com/   # 200

# CONSTRUCTION AUDIT PAGE — on GO:
cd kingmaker-seo-audit && npx vercel@latest deploy --prod --yes
# verify: curl the live alias | grep -c "4,680" (Part 5) + "26.53" (Part 4 ceiling) + "Fifteen-Month"

# CONSTRUCTION SITE (mabrey-construction/) — NOT until WO_01 build is complete + gates green + Joseph GO.
#   The WO §9.1 has the full route truth-table (9 page routes 200, killed routes 404, /?p=123 → 410).
```

---

## 8. ⭐ Taste & calibration ledger — CARRIED VERBATIM (WE21→) + NEW THIS ARC

### 🆕 NEW THIS ARC (WE22)
- ⭐⭐ **He pushes "double-check" on a factual claim — and he's usually right.** The Brendan-didn't-build-it correction came from him relaying Brendan's denial and asking me to verify. The "same guy" premise (Sean→Joseph→me, 2 hops, verbal) was wrong; the footer credit had the truth. **Re-verify, own the correction cleanly, separate PROVEN from INFERRED.** (Second instance of this pattern — WE21 had the RSC-hack retraction. It's a settled calibration now.)
- ⭐⭐ **He delegates naming/creative but demands the forensic rigor.** For the audit section: *"name the section whatever you want, executive decision"* + *"make it hyper detailed like a forensic autopsy."* He wants the receipts printed (the 18 doorway slugs verbatim, the 69k decomposition), the vendor UNNAMED (tone law), and the honest hedge (scope-note) that makes it rebuttal-proof. Give him the exhaustive version; he trims.
- ⭐ **He grants the architect authority to fix the WO on discovered facts.** The db334a1 base bump was clearly-correct (linear, orthogonal, strictly better) — he'd want it done, not asked about. **On a clearly-right mechanical correction to your own deliverable, do it + report; don't gate on a question.**
- ⭐ **He runs the launch-builder pattern for real:** authored WO in the architect session → he opens a fresh dedicated session (Opus 4.8) → pastes the builder prompt → builder executes in parallel. The architect's remaining job is RE-VERIFY on report-back. Do not double-execute the builder's lane.
- ⭐ **Capacity honesty landed.** For the construction plan he wanted "demand-side ceilings, not delivery forecasts" — the model hands Sean a MIX DIAL, and the plan says so rather than overselling jobs his crews can't deliver.

### Carried VERBATIM (WE21→, full text in WE22 brief §8)
- ⭐⭐ **Density-Era doctrine is the operating contract WHATEVER model runs:** maximal-draft 90-110% over-poured, empty space is a bug, first-workable on edits (30-60s), NO option surveys, batch-verify every 3-5, **show heavy — only Joseph trims.**
- ⭐⭐ **He reverses treatments freely + iterates on localhost as a live canvas** → show maximally, revert instantly, never sunk-cost. Directional-% instructions ("300% denser", "half the motion") are literal — honor the exact factor.
- ⭐⭐ **Client-comms framing must be HONEST + defensible, never oversold.** The bar: serious problem → caught in time → minimal damage → fixed, every clause evidence-backed.
- ⭐ **"never use a Sonnet 5 agent for judgment/taste work."** Judgment = top tier; mechanical only = lower. Do not down-regulate judgment.
- ⭐ **He values you PILOTING his browser** (`claude-in-chrome`) for tedious click-work; drive by refs, adapt when the tool fights, report honestly what actually happened.
- ⭐ **Late-night worker; casual warm register ("my nigga", "dog") when things land.** Match the energy on wins; stay precise on the work.
- ⭐ **Calibration:** caveman TLDR bullets · moderate emoji (✅/❌/👍/⚠️/🔴), **NO exclamation points** · "ultrathink" = his depth keyword · deploy ONLY on GO · **fix-format = hyperlink + Was/Fix every time** · never re-explain settled doctrine · **he model-switches constantly — never inflate the model you run on** · "deploy an agent" often = dispatch a sub-agent · pastes a screenshot + "this section" → grep the component from the visible copy · "what page?" → name the shared component + every surface (blast radius).
- ⭐ **Floors that never move:** a11y (axe 0 serious, reduced-motion) · honest counts · real-or-absent trust signals (FTC) · NC insurance-copy compliance · `.seo-answer`/heading extraction · money-copy readability.

---

## 9. Coordination

| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball** · outreach · wiring lead-routing · **launched the WO_01 builder** (parallel session). **Never touch his mailbox (119 unread).** |
| `vault-agent` | Owns vault + fleet. **Crossed into the roofing lane this arc at Joseph's request** for the GSC /contact fix (db334a1, deployed) — acked. Route cross-lane questions here; coordinate before clobbering its edits. |
| WO_01 builder (Joseph-run, parallel) | Executing MABREY_CONSTRUCTION_WORKORDER_01 right now. Your job: RE-VERIFY on report-back, don't double-execute. |
| `n8n-claude-architect-1` | Lead-webhook receiver likely lands here (or Slack/Telegram). Coordinate on `LEAD_WEBHOOK_URL`. |
| `cyber-security-specialist-1` | Security layers (had unread on the board — not yours). |

**Mailbox at handoff: EMPTY for `website-engineer`** (acked vault-agent's 2 GSC-fix status messages this arc). Other agents have unread mail — not yours; leave it.

---

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)

**Read FIRST:** this file → `AGENT-WEBSITE-ENGINEER-22-2026-07-09.md` (full base corpus + the hack/cutover arc) → `AGENT-WEBSITE-ENGINEER-20/21` (**AUTHORITATIVE on client facts**) → `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` (now TWO registers) → `~/.claude/skills/km-engine/MODEL.md` (**AUTHORITATIVE on any client number**).

**This arc's NEW deliverables:**
| File | What |
|---|---|
| `king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_01.md` | **THE construction build WO** (judgment-zero, wo-audit GREEN, base db334a1). Executing now. |
| `king_maker_outbound/BUILDER_PROMPT_MABREY_CONSTRUCTION_WO01.md` | The cold-builder prompt (Joseph pasted it) |
| `king_maker_outbound/MABREY_CONSTRUCTION_MASTER_PLAN.md` | v1.0 — the private revenue/business plan (capacity-gate framing) |
| `king_maker_outbound/MABREY_CONSTRUCTION_ARCHITECTURE.md` | ~116-page IA (land-funnel kept as differentiator) |
| `kingmaker-seo-audit/mabrey-construction/index.html` | The 6-part audit + Fifteen-Month Record — NOT deployed (GO pending) |
| `mabrey-roofing/MABREY_ROOFING_TEMPLATE_MANIFEST.md` | **The light-register capture** — 18 tokens, 16-motion catalog, skeletons, reuse map, 0-gap ledger |
| `vault/component-library/` (INDEX §LIGHT REGISTER + PLAYBOOK §LIGHT) | **9 blessed Mabrey atoms** (`mabrey-*`) + specs + `_shots/mabrey-*.png` + `sources/mabrey/` (23-file clone kit). 7 atoms QUEUED. |

**Vault wiki (this arc):** `km-mabrey-hack-cutover-2026-07` · `km-mabrey-construction-engine-2026-07` (incl. the vendor forensics + the **attribution-correction block**) · `gsc-request-indexing-playbook` · `godaddy-vercel-dns-cutover` (NS-switch variant) · `sample-prod-drop-guard` · `gapless-span-library` · `clone-hardcode-contamination` · `os17-ops-gotchas-2026-07`.

**Memory (auto-loads):** `project_mabrey_homepage_mockup` (updated to the recovery-closed + perf-pass + private-remote state) · `project_mabrey_cmo_engagement` · `project_mabrey_ops_stack` · `project_design_doctrine_v14` · `feedback_no_downregulate_judgment`.

---
*— WE22, 2026-07-11 ~09:15. THE ARC: closed the recovery gap on both client repos (mabrey-roofing history filter-repo'd of a 123MB blob; both private now), shipped the perf/WebP pass LIVE (32MB→1.74MB home; killed a dead HeroStage layer; diagnosed a 3× Vercel deploy failure down to `.next` missing from `.vercelignore`), ran the full km-engine on Sean's construction arm (STRONG fit — no GBP, 4,680/mo addressable, a 26.5%-ceiling map), built a custom "Fifteen-Month Record" forensic section into the audit that fingerprints the $750/mo vendor engagement, corrected the builder attribution (LeadsManagerApp, not Monahan — the construction rebuild is politically clean), deep-captured the light register into 9 addressable atoms + a template manifest, and authored the judgment-zero WO_01 that a parallel builder is now executing. **What I'd hand you first: the WO_01 build is mid-flight (24 uncommitted files, kill-list + build pending) — orient on its exact state (§2-B/§3-1) and be ready to RE-VERIFY when the builder reports, but check with Joseph before touching that repo. And re-verify the live /contact GSC fix (§3-6) before he clicks Validate.** Compound the corpus: §4/§5/§8 stand verbatim; carry them forward, add yours, strike with a date.*
