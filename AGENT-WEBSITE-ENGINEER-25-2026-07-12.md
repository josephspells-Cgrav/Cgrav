# HANDOFF — King Maker website lane → **Website Engineer 25 (WE25)**

**From:** WE24 · **To:** WE25 · **Date:** 2026-07-12 (~10:45 AM ET) · **Lineage:** WE4→…→WE22→WE23→WE24→**you**
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey Roofing site** (LIVE) + the **Mabrey Construction SHIP** (⭐ your pre-assigned mission: SEO pass → deploy → CUTOVER) + the KM firm site + Summit & Oak + the component library + the WO machinery + the page-class/compiler doctrine.

> ⭐ **BASE CORPUS — stands VERBATIM; this file is the DELTA:** read `AGENT-WEBSITE-ENGINEER-24-2026-07-12.md` FIRST (its §4/§5/§8 carry WE21→WE23's corpus and are re-affirmed here), then WE23/WE22 as it directs. **DESIGN LAW:** `KINGMAKER_DESIGN_DOCTRINE.md` (incl. the new §4 FAIL-LOUD law) + `vault/component-library/PLAYBOOK.md` (incl. the SERVICE-PAGE SLOTS table). **SYSTEM VERDICT:** `king_maker_outbound/CODEX_SECOND_OPINION_RECORD.md` (the bounded-compiler reframe — read before ANY architecture claim). **NUMBERS:** `~/.claude/skills/km-engine/MODEL.md`. Compound, don't re-derive.

---

## 0. ON ARRIVAL — ORIENT, THEN **EXECUTE THE PRE-ASSIGNED SHIP SEQUENCE** (Joseph's explicit instruction, 2026-07-12: *"just keep rolling to the next one… we're just gonna make it live. We're just gonna do the cutover… get it done and get it shipped… prompt website engineer 25 to go ahead and get started on the very next task the minute it's done orienting."* — the orient-then-ask default is overridden BY HIS WORDS, same as WE24's spin-up.)

1. **READ loop:** reread THIS file until a pass adds nothing (min 3, ultrathink; name what each pass ADDED).
2. **Preflight:** fire `/kmwe` (now self-tests wo-audit Laws 11/12 too — 4 embedded fixtures).
3. **RE-VERIFY volatile claims (dated ~10:45 07-12) by RUNNING them:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-construction" log --oneline -1   # expect 6136a12, clean, in-sync
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -1        # expect 014d142 — LIVE site
   git -C "C:/Users/josep/Claude Gravity/king_maker_outbound" log --oneline -1   # expect 0fc287c
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer
   netstat -ano | grep -E ':3200|:3210|:3211|:3220' | grep -i listen   # at write: 3200 (constr dev, yours) + 3220 (other session — NEVER touch) listening; 3210 was DOWN (GPT canvas gone; hands-off law stands anyway); 3211 = your gate port
   # 🔴 THE ALIAS SURPRISE — the vercel.app alias ALREADY SERVES the depth-layer build (verified 15:26Z):
   curl -s "https://mabrey-construction.vercel.app/services/decks" | grep -c "What Actually Goes Into"   # was 1 — the alias is AT or NEAR tip, NOT at d5a5694
   ```
4. **Resolve the alias surprise FIRST (it changes the deploy law):** WE24 deployed `d5a5694` with Joseph's GO; nothing after was CLI-deployed by this lane — yet the alias serves depth-layer content. Either Joseph deployed manually, or **Vercel git-integration auto-deploy got connected** (vault-agent's CRM work touched Vercel today). Determine which: `cd mabrey-construction && npx vercel@latest ls | head -8` (deployment cadence vs push times tells you) + check the dashboard integration if needed. **If auto-deploy is ON, every push ships — "no deploy without GO" becomes COMMIT discipline.** State the finding in your first report.
5. **Then START the pre-assigned SHIP SEQUENCE (§3-1) immediately.** Joseph's eyeball remains the final gate on RESULTS; the sequence itself is pre-authorized.

---

## 1. What this is
King Maker sells done-for-you authority contractor sites + SEO. Mabrey Roofing = first paying client (LIVE). Mabrey Construction = the second front — **and as of 2026-07-12 the plan PIVOTED to SHIP**: after a drift-fix arc, a forge arc, a Codex second-opinion (system = "bounded template compiler with a paid forge path," NOT a general one-shot designer), and Joseph's honest zoom-out ("I need to get paid for something like this"), he called it: *"The plan is just to get something… we're just gonna make it live. We're just gonna do the cutover."* The current 28-route site ships; ALL expansion (land funnel, locations, resources, page-class P2–P8 machinery) stays FROZEN pending re-pricing. WE24's arc: fixed the flat-body drift (13 blessed service pages, deployed), built the anatomy/Law-11/Law-12/render-path-scan machinery, orchestrated WO_06 through a builder, forged the company pages to board grammar on Joseph's live flag, rebuilt about on the roofing 9-section skeleton, reverted the nav to the blessed shape, absorbed the Codex verdict (P0 WO_07 freeze + P1 gate truthfulness), and authored the 12-service technical-depth layer — which Joseph blessed ship-tier ("looks good bro").

## 2. ⭐ CURRENT STATE (tool-captured 2026-07-12 ~15:26Z)

| Surface | State |
|---|---|
| **mabrey-construction/** | tip **`6136a12`** (depth layer) · clean · in-sync private origin. Chain this arc: `9d0a1a0` blessed-parity → `25464da` anatomy gate → `d5a5694` ignore-hygiene → `4e06dce` CtaBand hygiene → `5ba576f` WO_06 (builder) → `cb5f01b` board forge → `9db1112` fail-loud surgery → `4400ce4` nav+about+process → `afb839d` gate truthfulness → `6136a12` depth. Dev running :3200. |
| **DEPLOYED (construction)** | 🔴 **https://mabrey-construction.vercel.app serves DEPTH-LAYER content** (verified marker 15:26Z) — beyond WE24's last CLI deploy (`d5a5694`). Resolve per §0-4 before deploying anything. **mabreyconstruction.com still = Sean's OLD WP site — the CUTOVER (§3-1c) is YOUR mission.** |
| **mabrey-roofing/** | tip **`014d142`** (manifest §9 hazard ledger + scan-ok annotations — comments/docs only, zero rendered surface) · clean · in-sync · LIVE on mabreyroofing.com. |
| **king_maker_outbound/** | tip **`0fc287c`**. WO_06 EXECUTED (`5ba576f`) · **WO_07 FROZEN** (⛔ banner; stale stamp voided; forge-required reclassification; content payload preserved) · Codex verdict + brief + record on disk. |
| **Site inventory (28 routes)** | Home · 13 services (blessed + deployed design, ALL with depth now) · /services hub · about (9-section roofing-skeleton rebuild) · process · why-us · financing (guidance-framed) · faq (single Q&A board) · contact · terms · privacy (+ api/robots/sitemap). Sitemap = 23 `<loc>`. |
| **Blessing state** | Service pages + deploy design: Joseph-blessed (earlier GO). Depth layer + the 6 rebuilt company surfaces: **ship-tier blessing** via *"looks good bro, just keep rolling"* — formal per-page eyeball never happened; expect post-live trims, treat them as normal edit-mode work, not failures. |
| **Machinery** | anatomy-check (GATE_BASE_URL convention) · doorway/reachability REQUIRE explicit base (exit 2 without; zero-target = FAIL) · wo-audit 12 laws (Law 11 fenced-block-only, Law 12 impact+restorer) · kmwe preflight self-tests all of it · render-path-scan `--strict` clean on both repos · fail-loud ServiceSlug typing (missing board entry = tsc error; flat fallback DELETED). |
| Mailbox | 1 msg handled at handoff (vault-agent stand-down — see §3-1d) · acked. |

## 3. ⭐ OPEN LOOPS

### 🔴🔴 1. THE PRE-ASSIGNED SHIP SEQUENCE (Joseph, 2026-07-12, verbatim-close: *"Make sure the on-page SEO — use DataForSEO — to make sure it's all SEO optimized… we can't really do a financing calculator, don't worry about the fucking calculators… get it done and get it shipped."*)
Execute in order:
- **(a) SEO pass with DataForSEO** over the 20 content pages: metaTitles/descriptions/H1s/`.seo-answer`s vs REAL keyword volumes (`kw_data_google_ads_search_volume` chunks of 10 + `dataforseo_labs_google_keyword_ideas`; WE22's pipeline notes in the WE23 brief §6). The keyword→page map lives in `king_maker_outbound/MABREY_CONSTRUCTION_ARCHITECTURE.md`; MODEL.md is the numbers law. SCOPE: optimize what EXISTS — title/description/heading/copy tweaks in lib/ data. NO new routes (expansion frozen). Preserve the floors: `.seo-answer` in DOM, heading-clean extraction, JSON-LD, unique-copy fleet law, honest counts. Gates + captures after (the full chain: tsc · build · anatomy · doorway · reachability · axe — all with `GATE_BASE_URL=http://localhost:3211`).
- **(b) Deploy the SEO'd tip to the alias** (after resolving §0-4's auto-deploy question) + live-verify by markers (never the CLI tail).
- **(c) EXECUTE THE WO_04 CUTOVER** — `king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_04.md` (WE23-authored runbook: GoDaddy NS/record-level recon done, **NO MX on the domain = the email-death trap is void**, rollback ledger in §R). Joseph GO'd the cutover as the plan THIS session — but GoDaddy access is his/Sean's: walk him through the actual DNS change (or drive it with him present), verify propagation via DoH + forced-resolve (never a raw local curl — the resolver flaps, WE21 law), then the post-cutover ladder: GSC property + sitemap submit + request-indexing (~10/day cap), 301-map spot-checks on old WP URLs (middleware carries the map), `robots`/canonical sanity.
- **(d) LEAD_WEBHOOK for construction at cutover** — 🔴 vault-agent's stand-down (15:26Z, acked): Joseph had it wire ROOFING's site-side itself; a **CRM ADAPTER now exists at `https://mabrey-crm.vercel.app/api/webhooks/site-lead`** (HMAC `X-KM-Signature` verified, translation proven, 139/139 gates) because a bare wire to `/api/leads` 400s every lead. **Construction's forms must NOT go live forwarding to nothing:** ping vault-agent BEFORE wiring — construction likely needs its own adapter variant/source-enum (different CRM division: roofing vs custom-homes). Env vars + redeploy = Joseph GO per the standing law (or auto-deploy discipline per §0-4).
- **(e) Post-cutover intake (Joseph/Sean lane, surface don't own):** GBP creation (the #1 lever) · A2P for "Mabrey Construction" + (984) · license # · GA4/Pixel.
**DoD:** SEO pass gated+committed · alias serving it · mabreyconstruction.com resolving to the new site with 301s live · GSC submitted · leads landing in the CRM (test lead verified) · fix-format report with live links · Joseph's eyeball on the LIVE domain.

### 🔴 2. NO CALCULATORS — decision CLOSED (Joseph, this session)
The financing page stays guidance-framed ("not a lender"); do NOT port roofing's FinancingCalculator or its lender claims. The Sean-lender question is moot.

### 🟡 3. FROZEN (do not thaw without Joseph's re-price): WO_07/land funnel (content preserved in the frozen WO) · locations · resources/guides · the Codex P2–P8 build-out (template release, page-class contracts, geometry gates) · formal skeleton captures. If Joseph asks for any of these, the Codex record's economics section is the pricing conversation.

### 🟡 4. Carried board: roofing FTC marquee exposure (Sean cert confirms — STILL live) · roofing hero `line-clamp-3` truncation debt (construction inherits; visible on long service intros) · `mabrey-indexing-reminder` cron cancel window opened Jul 13 (roofing) · vault inbox has pending ingest files · construction's 2-photo imagery debt (services share `hero-nano-a.webp` — real photos = Sean intake) · hub L8 orphan-row cosmetic.

## 4. Locked decisions — WE24's base §4 stands VERBATIM (and carries WE21→WE23's). NEW THIS ARC:
1. ⭐⭐ **THE SHIP PIVOT (Joseph, 2026-07-12):** *"The plan is just to get something… make it live… do the cutover… get it done and get it shipped."* Speed now outranks polish; the current 28 routes ARE the launch scope; trims happen post-live as normal edits.
2. ⭐⭐ **THE BOUNDED-COMPILER LAW (Codex verdict, adopted):** the system is a template compiler — blessed class + compatible data → mechanical page; unsupported class or incompatible data → hard halt → paid forge. BANNED wordings: "one-shot every page" · "skeleton transplant guarantees approval" · "green gates = blessed design." Reliability is MEASURED, never declared.
3. ⭐⭐ **THE SKELETON LAW (4-event evidence):** composition fails Joseph's eyeball, whole-skeleton transplant passes — even composing from blessed ATOMS fails. The blessed unit is the PAGE SKELETON. New page classes = forge with Joseph, never rollout work.
4. ⭐ **STATUS CONVENTION (born from his overconfidence callout):** report `renders / gates-green / owner-blessing-pending` as three separate states. "Done" is HIS word.
5. ⭐ **NO CALCULATORS** on construction financing (Joseph, this session) — guidance framing stands.
6. ⭐ **GATE_BASE_URL convention:** every server-dependent gate takes one explicit base; construction's doorway/reachability EXIT 2 without one; reachability FAILS on zero targets.
7. ⭐ **wo-audit Laws 11+12:** page/registry WOs must run anatomy-check IN A FENCED BLOCK (prose = reject); emptying a registry requires `FALLBACK IMPACT` + `RESTORED BY: WO_XX`/`PERMANENT` on the impact line. Preflight self-tests all four fixtures every session.
8. ⭐ **FAIL-LOUD registry law (shipped):** `SERVICE_BOARDS: Record<ServiceSlug, …>` — missing entry = tsc error; the flat fallback body is DELETED from the service template. Intentional empties carry `scan-ok: empty-by-design (<reason>)`.
9. ⭐ **STAMPS ARE LAST:** a WO base-stamp is void the moment ANY commit lands after it (WE24 invalidated his own stamp in 30 min). Stamp at dispatch-moment, nothing after.
10. **WO_07 FROZEN** (Codex P0) — stale base + unclassified pages; re-author as instantiation only after land-class forges, only if re-priced.

## 5. Failures & dead-ends — WE24's base §5 stands VERBATIM. NEW THIS ARC:
1. 🔴 **COMPOSITION-FAILS / TRANSPLANT-PASSES (the arc's master pattern):** four independent eyeball failures (WO_06 flat pages · WE24's board recompositions · WE24's invented nav mega-panel · the thinned about) vs zero failures on whole-skeleton transplants. Corollary: the roofing company-page skeletons were NEVER captured — both WO_06's author and WE24 freehanded where no parent existed (/process and /why-us have NO roofing equivalent at all; roofing's /financing rests on lender claims construction can't make).
2. 🔴 **THE OVERCONFIDENCE PATTERN (Joseph's callout, then Codex's):** WE24 repeatedly presented green gates as "good to go"; his eyeball rejected it; Codex then proved the specific overclaims (anatomy-check = service-class only · Law 11 = token check · markers ≠ skeletons · BOARD_SLUGS = second slug authority that drifts on catalog growth). Lesson: name the exact class a gate covers; claim nothing wider.
3. 🔴 **PORT FAIL-OPEN (Codex found, WE24 missed):** WO §6 gate lines ran doorway/reachability portless → they hit :3210 (another session's server); reachability returned a FALSE GREEN at 0 sitemap targets. Now mechanically impossible (exit 2 / zero-target FAIL) — but the CLASS lesson: a gate that can't verify it's testing the right server proves nothing.
4. ⭐ **The freeze-banner oracle trip:** WE24's WO_07 freeze banner itself contained "base \`9db1112\`" — which SATISFIED the base-SHA oracle and made the frozen WO read GREEN. Caught in regression. Lesson: prose near an oracle's regex is part of the oracle's input.
5. ⭐ **The replica-vs-build reframe (Joseph's "didn't I just need a 1:1 copy?"):** ~60% of roofing's mass is DATA construction lacks (reviews/locations/articles/storm/materials/photos) — a words-swap replica was never possible for those; the km-engine architecture silently converted a copy job into a build job and nobody flagged the cost change. Say the quiet scope-change out loud, always.
6. ⭐ **NumberedSteps k-defect:** the component renders `{index} · {k}` — numeric ks would have rendered "01 · 01". Caught only by reading the component's render line against the WO's data. Pasted-data-vs-component-contract checks matter.
7. ⭐ **CtaBand-defaults class:** component DEFAULTS carried roofing copy that never rendered (all usages passed props) — dead-string residue is a latent bomb for the first bare usage. Fixed; the class = check defaults, not just rendered output.
8. ⭐ **fullPage capture artifacts:** the sticky header (and mobile bottom CTA bar) stamp once mid-image in Playwright fullPage shots — NOT page defects. Judge those elements live; don't burn cycles on them.

## 6. Tooling gotchas (delta on the base §6)
- **render-path-scan:** `node vault/component-library/render-path-scan.mjs <repo> [--strict]` — enumerates silent-degrade candidates (A conditionals · B fallback lookups · C null-vanish · D emptied registries); `--strict` reds UNDECLARED class-D. Both repos currently strict-clean.
- **Gate invocations (construction):** `GATE_BASE_URL=http://localhost:3211 npm run {anatomy-check,doorway-check,reachability-check}` — no default port exists anymore; :3211 is yours, :3210/:3220 are NOT.
- **DataForSEO (for §3-1a):** volumes via `kw_data_google_ads_search_volume` (chunks of 10, DMA-calibrated), ideas via `dataforseo_labs_google_keyword_ideas`, difficulty via `dataforseo_labs_bulk_keyword_difficulty` — WE22 proved the pipeline (WE23 brief §6). SERP spot-checks: `serp_organic_live_advanced`.
- **Capture scripts:** `.we24-cap*.cjs` patterns in the construction root (gitignored) — slow scroll-through (500px/260ms) before fullPage; captures land in `.we24-cap/` (also gitignored via `.*-cap/`).
- **Vercel deploy:** `npx vercel@latest deploy --prod --yes` from the repo — but resolve §0-4 (auto-deploy?) FIRST; verify via `vercel ls` + live marker curls, never the CLI tail.
- The WO_06 builder's dev-server lesson: `EADDRINUSE` on :3200 = a stale squatter; kill by PID then restart; `rm -rf .next` under a RUNNING dev server 500s it (the compiled output vanishes from under it).

## 7. Deploy + verify (updated for the pivot)
```bash
# CONSTRUCTION — full gate chain (dev killed first; .next collision law):
cd "C:/Users/josep/Claude Gravity/mabrey-construction"
npm run typecheck && npm run build                # 28/28
npx next start -p 3211 &                          # your gate port
GATE_BASE_URL=http://localhost:3211 npm run anatomy-check
GATE_BASE_URL=http://localhost:3211 npm run doorway-check
GATE_BASE_URL=http://localhost:3211 npm run reachability-check
A11Y_BASE=http://localhost:3211 node .axe-multi.cjs   # 0 serious / 0 invisible / 0 unstyled
# DEPLOY (after §0-4 resolution; the ship is GO'd but verify + report every step):
npx vercel@latest deploy --prod --yes
curl -s "https://mabrey-construction.vercel.app/services/decks" | grep -c "What Actually Goes Into"   # marker, not tail
# CUTOVER: per king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_04.md — Joseph's hands on GoDaddy;
# verify via https://dns.google/resolve + curl --resolve; NEVER trust the local resolver post-cutover.
```

## 8. ⭐ Taste & calibration — WE24's base §8 stands VERBATIM. NEW THIS ARC:
- ⭐⭐ **THE OVERCONFIDENCE CALLOUT (his words, verbatim-close):** *"It looks like everything's good to go, and I look at it and it's super not fucking good to go… I'm getting a lot of overconfident yes-I-can-do-this responses and we end up with not the thing."* The cure that landed: plan-first before touching anything, his eyeball at the FRONT of loops, the three-state status convention, and naming exactly where first-look failure risk is highest. Keep all four habits — they rebuilt trust this arc.
- ⭐⭐ **Ship-tier blessing exists:** *"looks good bro, just keep rolling"* = approved at launch grade, NOT pixel-blessed. He expects post-live trims and that's fine — what he can't afford is the multi-day unbilled grind. Bias every call toward SHIPPED.
- ⭐ **He values the honest scope-reframe:** the replica-vs-build explanation ("you asked for a copy and it quietly became a build — that's on us") visibly landed and led directly to the pivot. Deliver bad news as structure, not apology.
- ⭐ **Codex is a live second-opinion lane** (via Joseph, not the blackboard): he'll route hard architecture questions there. Write briefs assuming an adversarial reviewer WILL re-run your commands — because it did.
- ⭐ **"Ultrathink in a loop" remains his depth keyword**; he pre-assigns across handoffs now (this file's §0 is the second consecutive pre-assignment).

## 9. Coordination
| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · GoDaddy/DNS hands for the cutover · GBP/GSC clicks · Sean comms · final eyeball. **Never touch his mailbox.** |
| `vault-agent` | Owns vault/fleet + the CRM/lead lane. 🔴 **Built the CRM adapter** (`/api/webhooks/site-lead`, HMAC) and wired ROOFING's side itself — ping it BEFORE wiring construction's LEAD_WEBHOOK (division/source-enum likely differs). Its stand-down msg acked at handoff. |
| WO builders (Joseph-run) | Idle — WO_06 closed clean; WO_07 frozen. No dispatches until re-price. |
| Codex (GPT 5.6) | Second-opinion lane through Joseph. Its verdict record is on disk; treat its P2–P8 as the priced backlog. |
| `n8n-claude-architect-1` | Lead-funnel automation lane (post-CRM). |

## 10. Knowledge artifacts & file map (delta)
**Read order:** THIS file → `AGENT-WEBSITE-ENGINEER-24-2026-07-12.md` (base corpus) → `CODEX_SECOND_OPINION_RECORD.md` + `TEMPLATE_SYSTEM_SECOND_OPINION_BRIEF.md` (the system verdict) → doctrine + PLAYBOOK → `MABREY_CONSTRUCTION_WORKORDER_04.md` (your cutover runbook) → `MABREY_CONSTRUCTION_ARCHITECTURE.md` (the keyword→page map for §3-1a) → MODEL.md.
| Artifact | What |
|---|---|
| `mabrey-construction @ 6136a12` | The ship candidate: 28 routes, all gates green, depth layer in |
| `king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_04.md` | ⭐ THE CUTOVER RUNBOOK (recon + rollback ledger done by WE23) |
| `king_maker_outbound/CODEX_SECOND_OPINION_RECORD.md` (+ the full verdict in Joseph's/WE24's transcripts) | The bounded-compiler law + P-backlog + banned claims |
| `mabrey-construction/scripts/{anatomy,doorway,reachability}-check.mjs` | The truthful gate suite (GATE_BASE_URL) |
| `vault/component-library/render-path-scan.mjs` + PLAYBOOK SERVICE-PAGE SLOTS + roofing manifest §9 | The silent-degrade machinery |
| `mabrey-construction/components/boards.tsx` | The forged standalone board atoms (BandLedger/StatStepSplit/SpecBoardGrid/BoardHeader) |
| Vault | `km-blessed-anatomy-gate-2026-07` (with Codex corrections) · inbox note pending ingest |
| Memory (auto-loads) | `project_mabrey_construction_site` (updated to SHIP state at this handoff) |

---
**WRITE-LOOP LEDGER (converged pass 4):** P1 drafted from the 13-arc enumeration + WE24 base. P2 added: the alias-surprise §0-4 resolution step, the adapter URL + HMAC detail, the freeze-banner oracle trip, stamps-are-last, the 3220-listening/3210-down port nuance, doorway 13.4% figure. P3 added the tacit layer: ship-tier vs pixel-blessed distinction, "deliver bad news as structure," Codex-will-rerun-your-commands, the cron-Jul-13 + FTC + line-clamp carried debts, imagery debt. P4 swept: NumberedSteps/CtaBand classes, capture-artifact note, WO_06-builder EADDRINUSE lesson, banned wordings, no-calculators as its own §3 item — pass 5 attempted, added nothing → converged.
**ARC-COVERAGE LEDGER:** 13/13 arcs × (a-f) ✓ — decisions+why, dead-ends+why, SHAs/paths/commands, live-vs-local (the alias surprise), tacit corrections (overconfidence callout, ship pivot), calibrations (three-state convention, ship-tier blessing). 0 gaps.
**CARRY-FORWARD LEDGER:** WE24 base §4 (7 items) + §5 (7 items) + §8 (6 items) declared VERBATIM-STANDING above (they in turn carry WE21→WE23) — 0 struck, 0 silently dropped; this file appends 10/8/5 NEW items with attribution.
**SKELETON LEDGER:** §0–§10 all present + non-stub ✓.

*— WE24, 2026-07-12 ~10:45 AM ET. The arc: verified and killed the flat-body drift (13 blessed service pages, deployed on Joseph's GO), built the machinery that makes the drift class uncompilable and self-testing, ran WO_06 through a builder clean, forged the company pages to board grammar on his live flag, rebuilt about on the real roofing skeleton after his five-screenshot rejection, took the Codex verdict on the chin (bounded compiler, not a designer — froze WO_07, fixed the port fail-open), answered his 1:1-replica question honestly (a copy became a build and nobody said so), and shipped the depth layer he blessed. He pivoted to SHIP. Your job is the last mile: SEO-optimize what exists, put it on the alias, and move mabreyconstruction.com onto it per the WO_04 runbook — with the leads wired through vault-agent's adapter so the phone actually rings. His eyeball is the final gate; the live domain is the surface it lands on.*
