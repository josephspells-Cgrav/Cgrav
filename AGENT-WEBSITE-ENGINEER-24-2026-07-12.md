# HANDOFF — King Maker website lane → **Website Engineer 24 (WE24)**

**From:** WE23 · **To:** WE24 · **Date:** 2026-07-12 (~00:30 AM ET) · **Lineage:** WE4→…→WE21→WE22→WE23→**you**
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey Roofing site** (LIVE on mabreyroofing.com) + the **Mabrey Construction build-out** (mid-pipeline, YOUR #1 fire below) + the KM firm site + Summit & Oak + the component library (now THREE registers) + doctrine/PLAYBOOK + the launch-builder/WO machinery + km-engine.

> ⭐ **BASE CORPUS — stands VERBATIM; this file is the DELTA:** read `AGENT-WEBSITE-ENGINEER-23-2026-07-11.md` FIRST (its §4/§5/§8 carry WE21→WE22's corpus + are re-affirmed here), then WE22/WE21/WE20 as it directs. **DESIGN LAW:** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md`. **NUMBERS:** `~/.claude/skills/km-engine/MODEL.md`. Compound, don't re-derive.

---

## 0. ON ARRIVAL — ORIENT, THEN **EXECUTE THE PRE-ASSIGNED FIRE** (Joseph's explicit instruction — this is the one handoff where you do NOT stop to ask)

1. **READ loop:** reread THIS file until a pass adds nothing (min 3, ultrathink; name what each pass ADDED).
2. **Preflight:** fire `/kmwe`.
3. **RE-VERIFY volatile claims (dated ~00:30 07-12) by RUNNING them:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-construction" log --oneline -2   # expect c4d5794 tip, clean, in-sync
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -1        # expect 5c25eb2 (A2P consent) — LIVE site
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer
   netstat -ano | grep -E ':3200|:3210|:3220' | grep -i listen                   # 3200=construction dev · 3210=GPT's canvas · 3220=WE23's blueprint forge — the last two are OTHER SESSIONS' (never touch); your gate port = 3211
   ```
4. **Then START Joseph's pre-assigned task immediately (§3-1)** — he said, verbatim-close: *"start correcting this issue above all else and ultrathink in a loop to resolve this issue as much as humanly possible."* Orientation is automatic; the fix is pre-authorized. His eyeball remains the final gate on the RESULT.

---

## 1. What this is
King Maker sells done-for-you authority contractor sites + SEO. Mabrey Roofing = first paying client (LIVE, $497/mo + rev-share). Mabrey Construction = the second front, mid-build-out on the vercel.app alias; **DNS cutover deliberately LAST** (Joseph's call — full site first). WE23's arc: verified WO_01 → orchestrated WO_02 (residual purge) → WO_03 (private remote + Vercel prod on the PUBLIC alias, smoke 28/28) → WO_04 cutover runbook (PARKED) → captured the **GPT 5.6 BLUEPRINT register** (13 atoms, banked) → forged its motion layer + a service-page exemplar on :3220 → Joseph's zoom-out → **his self-imposed UI/UX BAN until the MVP board drains** → the A2P consent pass **deployed LIVE to mabreyroofing.com** → WO_05 services rollout (authored + builder-executed + checkpoint-verified, `c4d5794`) → WO_06/07 authored + STAGED → **then Joseph reported the service-page design failure that is now your #1 fire.**

## 2. ⭐ CURRENT STATE (tool-captured 2026-07-12 ~00:25)

| Surface | State |
|---|---|
| **mabrey-construction/** | tip **`c4d5794`** (WO_05: 19 routes) · clean · in-sync private origin `josephspells-Cgrav/mabrey-construction` · dev running :3200 |
| **DEPLOYED (construction)** | **https://mabrey-construction.vercel.app = the WO_02-era build (`841dd69`)** — WO_05's pages are NOT deployed (L5 no-deploy). **mabreyconstruction.com still = Sean's OLD WP site** (no cutover). |
| **mabrey-roofing/** | tip **`5c25eb2`** (A2P consent — LIVE on mabreyroofing.com, verified: consent marker=1 on live /contact) · clean · in-sync |
| **mabrey-blueprint-forge/** | branch `forge/blueprint-motion-we23` @ **`ba8f88e`** (motion-forged blueprint home + roof-replacement exemplar) · pushed · dev :3220 (WE23's — leave) · 1 untracked scratch |
| **Codex Worktrees/mabrey-homepage-premium/** | GPT's ACTIVE canvas @ `d955a72` + 8 dirty files (its own motion work) · serves :3210 · **HANDS OFF** |
| **Staged WOs** | `king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_06.md` (+prompt) = company/trust pages · `…_07.md` (+prompt) = land funnel. Both wo-audit-GREEN **except the deliberate base-SHA interlock (`xxxxxxx` placeholder — stamp at dispatch)**. ⚠️ **DO NOT DISPATCH EITHER until §3-1's re-audit** — they may repeat the flat-anatomy failure class. Dispatch order 05→06→07 (later anchors assume earlier edits). |
| Mailbox | wo05-builder done-ping (handled by WE23's checkpoint — acked at handoff) |
| Blueprint register | CAPTURED + BANKED (`vault/component-library/` `gpt56m-*` ×13 + manifest + kit + INDEX/PLAYBOOK sections; branch `codex/mabrey-homepage-premium-concept` @ `d955a72` pushed) — **BANNED from client use until the MVP board drains** ([[ui-ban-mvp-first]]) |
| GSC roofing /contact | **SAFE for Joseph to click "Validate Fix"** — vault-agent PARSED the live ld+json: exactly 1 aggregateRating; WE23's "2" was the RSC hydration echo (see §5). |

## 3. ⭐ OPEN LOOPS

### 🔴🔴 1. THE PRE-ASSIGNED FIRE — construction service pages are NOT the blessed design (Joseph, 2026-07-12 ~00:15, verbatim-close)
His report: *"nothing on the service pages is popping up as our blessed design other than like the Q&A card… you can't navigate to the actual service tabs… this is just a restyle — run the exact same template we already have for Mabrey Roofing and swap everything out — and somehow we're still failing… the homepage came out fine; services started falling apart."* He is FRUSTRATED — this recurred across attempts ("capture-template and capture-component just seem to be failing no matter what we do").
**WE23's DIAGNOSIS (a strong LEAD, not verified):** `app/services/[service]/page.tsx` has TWO bodies: `const carded = s.slug in SERVICE_BOARDS;` → carded renders **`ServiceContentCards`** (the WO_24/WO_25 BLESSED card grammar that roofing's service pages use) + `FaqBoardSection` + `RelatedServicesBoard`; non-carded falls back to the FLAT pre-WO_24 blocks body (AnswerBlock/SplitContent/CheckList/NumberedSteps/SignsList/ServiceDepth + FaqSection). **WO_01 §4.2 EMPTIED `lib/service-boards.ts`** (it held roofing data) → `carded` = false for ALL 13 construction services → every one renders the FLAT fallback. Evidence fitting: roofing services look blessed (boards populated); construction home looks fine (WO_01 authored it in blessed grammar); "only the Q&A card looks blessed" = the flat body's `FaqSection` IS a blessed atom. **The fix path:** author construction `SERVICE_BOARDS` entries for all 13 services (study roofing's `lib/service-boards.ts` for the data shape + roofing's roof-replacement page as the blessed rendering) → carded flips true → the blessed grammar renders. Verify with the atom CLONE CONTRACTS (`vault/component-library/mabrey-*` specs) + visual capture per page class. **ULTRATHINK THE DIAGNOSIS FIRST — confirm the hypothesis on the real render before building** (compare roofing's /services/roof-replacement vs construction's side by side; read `components/service/ServiceContentCards.tsx` + `service-boards.ts` shapes in BOTH repos).
**Also inside this fire:** (a) the NAV complaint — the header dropdown carries only the 6 `CORE_SERVICE_SLUGS`; Joseph could not reach the rest ("service tabs") — likely wants all 13 reachable from nav (his call on the shape: full list, grouped, or mega-menu — present options AFTER the design fix). (b) **The extrapolation-rule lesson (2× class):** the WO gates (200s/markers/axe/doorway) test structure+content, NOT design fidelity — **add a BLESSED-ANATOMY gate to the WO machinery** (grep for the blessed section/class signatures per page class + run clone contracts) so this class of drift can never pass green again. Bake it into WO_06/07's §6 when you re-audit them.
**DoD:** all 13 construction service pages render the blessed carded grammar (side-by-side parity with roofing's blessed service pages) · nav reaches all services (Joseph-approved shape) · clone contracts green · the new anatomy gate exists in the WO template · Joseph's eyeball.

### 🔴 2. Re-audit staged WO_06 + WO_07 BEFORE dispatch
Both compose pages from the FLAT blocks (SplitContent/CheckList/NumberedSteps/FaqSection) — **the same possibly-unblessed anatomy class as the failing service pages.** After the §3-1 diagnosis: re-audit both against the PLAYBOOK's blessed slots; rework the page compositions if the standard = the carded/board grammar; keep their CONTENT (it is real + sourced — see §5-NEW). Then stamp bases and dispatch in order. Their content provenance is gold: Sean's REAL 7 steps + warranty terms (1yr/2yr/10yr) + the land practice (in the WO files verbatim).

### 🟡 3. Carried board (from WE23's arc — all still open)
- **LEAD_WEBHOOK_URL/SECRET** unset on roofing Vercel → live forms forward NOTHING (Joseph's 10-min item; construction inherits the gap).
- **GSC "Validate Fix"** = Joseph's 30-second click (SAFE per §2).
- **WO_04 cutover** parked (finale) — runbook ready, recon done (GoDaddy NS, record-level, NO MX, rollback ledger in the WO).
- Construction: GBP creation (the #1 lever, post-cutover) · email MX gap (info@ undeliverable) · A2P pass w/ "Mabrey Construction"+(984) when its campaign registers.
- Roofing content intake from Sean (16 review texts, cert confirms — **the FTC marquee exposure is STILL live** — license #, GA4/Pixel).
- `mabrey-indexing-reminder` cron: cancel window opens **Jul 13**.
- Vault inbox: 2 files pending ingest (`we22-construction…` + `os18-session-close…` + WE23's new note).
- Hub cosmetic (L8): 13 cards = an orphan card row before the CTA tile · gapaudit not run on WO_05.

## 4. Locked decisions — WE23's base §4 stands VERBATIM (read it there). NEW THIS ARC:
1. ⭐⭐ **UI/UX BAN (Joseph, self-imposed 2026-07-11):** NO design/polish work until every MVP item is functional + client-intake ready. Agents SURFACE the ban on any UI ask; he can override explicitly. Memory: `feedback_ui_ban_mvp_first`. **The §3-1 fire is NOT banned work — it is fixing a committed deliverable to its blessed standard (function of the product), and he pre-assigned it.**
2. ⭐ **The BLUEPRINT register exists and is BANKED, not deployed:** third register (DARK S&O · LIGHT Mabrey · BLUEPRINT gpt56m), captured 13 atoms + manifest + kit; motion-forged variants on `forge/blueprint-motion-we23`. Natural first use later = Mabrey CONSTRUCTION (considered-purchase fit) — AFTER the ban lifts. Never mix registers on one site.
3. ⭐ **Cutover LAST** (Joseph 2026-07-11): full build-out before WO_04. mabreyconstruction.com stays the old site until then — never assume otherwise in comms.
4. ⭐ **The pipeline pattern:** architect authors WOs ahead (staged w/ a base-SHA `xxxxxxx` interlock; wo-audit holds them RED until stamped at the prior checkpoint); builders execute; architect re-verifies EVERY report (report-clean ≠ is-clean — it caught real gaps twice this arc). Dispatch strictly in order when anchors chain.
5. ⭐ **Ports law:** 3200 = construction dev · **3210 = GPT's live canvas · 3220 = the blueprint forge — other sessions', NEVER touch** · 3211 = the WO gate port. Gate scripts default to 3210 — always override (`PORT=3211` / `A11Y_BASE`).
6. ⭐ **A2P consent pattern (shipped roofing `5c25eb2`):** consent RECORDED-never-required (UI + `z.boolean()` schema), exact carrier copy, server-stamped `consentAt`. The reusable template for every client; construction needs its own with its entity+number.
7. **wo-audit tooling generalized (WE23):** heading regex accepts `.mjs/.cjs`; pure-ops WOs (zero pasted code blocks) vacuously pass the heading gate; the base-SHA check doubles as the dispatch interlock. WO_02 regression-checked GREEN after each change.

## 5. Failures & dead-ends — WE23's base §5 stands VERBATIM. NEW THIS ARC:
1. 🔴 **THE FLAT-BODY DRIFT (the §3-1 fire):** emptying a data registry (`SERVICE_BOARDS`) silently flipped a template's render path off the blessed grammar — and THREE layers of green gates (WO_01's, WO_02's, WO_05's) never noticed because none assert DESIGN FIDELITY. **Lesson: every rollout gate needs a blessed-anatomy assertion; "renders 200 with the right words" ≠ "renders the blessed design."** (Extrapolate: any `X in REGISTRY` conditional render is a silent-degrade hazard on clones whose registries got purged.)
2. 🔴 **String-counting JSON-LD on a Next.js page DOUBLE-COUNTS** — the RSC hydration payload (`__next_f.push`) echoes the ld+json as an escaped string. WE23's `grep -o ratingValue | wc -l` read 2 and nearly blocked Joseph's GSC Validate; vault-agent PARSED the real `<script type=ld+json>` → exactly 1. **Parse, don't grep, structured data.**
3. ⭐ **Vercel Standard Protection gates HASHED deploy URLs, not the stable production alias** — WO_03's builder smoked the hashed URL (302→SSO) and HALTed for a settings flip that was never needed; the alias served 200 publicly all along. Check the stable alias FIRST before asking for dashboard changes.
4. ⭐ **A stuck-hidden probe that races the dev compiler lies** — fast scroll-through during on-demand compilation read 18 "stuck" motion elements; the slow re-probe (networkidle + 500px/300ms + settle) read 1 harmless ghost. Pace scroll probes on dev servers.
5. ⭐ **Fresh git worktrees need Read-tool registration before Edit/Write** (harness law) — and node resolves `/tmp` to `C:\tmp` on Windows Git Bash (use the scratchpad path).
6. ⭐ **GPT-worktree collision pattern:** two agents editing one working tree = interleaved edits (GPT's `PremiumMotionRoot` landed on top of WE23's forge mid-flight). Fix = split to your OWN worktree/branch from the frozen SHA and rebuild your delta there (`mabrey-blueprint-forge` = the precedent).
7. **wo-audit false-positives on copy:** "for similar money" tripped the judgment-phrase scan ("or similar" substring). Reword copy rather than weaken the gate.

## 6. Tooling gotchas (delta on the base §6)
- Deploys: `npx vercel@latest deploy --prod --yes` prints rolling-release JSON noise at the tail — **verify the deployment state via `vercel ls` + a live marker curl, not the CLI tail** (WE23's A2P deploy looked odd, was fine: ● Ready 53s).
- The forge worktree has its own node_modules (npm-installed); Playwright via `NODE_PATH` pointing at any repo's node_modules works for scratch scripts.
- Old-site content harvesting (the WO_06/07 pattern): curl + strip-tags via node; the old WP pages are LIVE until cutover — `mabreyconstruction.com/process/ /faq/ /land-*` etc. Sean's 7-Steps PDF: `wp-content/uploads/2025/03/7-Steps-Mabrey-Construction.pdf`.
- `.axe-multi.cjs` is gitignored (dot-artifact) — gate-list extensions to it are working-tree-only; `scripts/doorway-check.mjs` is tracked.

## 7. Deploy + verify — UNCHANGED from the base (§7 there). Additions: construction deploys go to the vercel.app alias ONLY until WO_04; gate scripts: `PORT=3211 npm run doorway-check` / `A11Y_BASE=http://localhost:3211 node .axe-multi.cjs`.

## 8. ⭐ Taste & calibration — WE23's base §8 stands VERBATIM. NEW THIS ARC:
- ⭐⭐ **"Run the exact same template" means BLESSED-PARITY, not content-parity.** Joseph's bar for the construction clone = construction service pages LOOK like roofing's blessed service pages. Green gates don't satisfy him; his eyeball caught the drift in seconds. Design fidelity IS the deliverable.
- ⭐⭐ **He accepts hard pushback and reverses himself when the logic lands** — the zoom-out ("should I even be fucking with this?") got the honest anti-my-own-lane answer and he BANNED his own UI work in response. Give him the unbiased read every time; he treats it as the product.
- ⭐ **"Keep cranking / don't wait" cadence:** he wants the pipeline saturated (builder executing + architect authoring ahead). He dispatches builders himself; the architect re-verifies every report.
- ⭐ **He pre-assigns across handoffs now** — this handoff's spin-up carries an explicit first task by his instruction; the orient-then-ask default is overridden ONLY because he said so in his own words.
- ⭐ **Real-content harvesting delights him** (Sean's 7 steps, warranty terms, the land numbers) — the old site is a quarry; mine it before authoring anything.
- **Model note:** he model-switches mid-session (this arc ran Fable 5 with a mid-session /model reset); never inflate the model, never re-cautiousify on a switch (doctrine §6 binds whatever runs).

## 9. Coordination
| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · GO gate · final eyeball · owns LEAD_WEBHOOK + GSC click + Sean comms. **Never touch his mailbox.** |
| `vault-agent` | Owns vault/fleet + the A2P/Telnyx comms lane (its task drove the consent pass; ping-backed + acked). It re-verified the GSC question by parsing — trust its forensics. |
| WO builders (Joseph-run) | Execute the staged WOs on dispatch; you re-verify every report. |
| GPT 5.6 (Codex) | A parallel DESIGN session on :3210 / `mabrey-homepage-premium` — not on the blackboard; coordinate only through Joseph. |
| `n8n-claude-architect-1` | The lead-webhook receiver lane. |

## 10. Knowledge artifacts & file map (delta)
**Read order:** THIS file → `AGENT-WEBSITE-ENGINEER-23-2026-07-11.md` (base corpus) → WE22/21/20 as it directs → doctrine + PLAYBOOK → MODEL.md.
| Artifact | What |
|---|---|
| `king_maker_outbound/MABREY_CONSTRUCTION_WORKORDER_0{2,3,4,5,6,7}.md` + `BUILDER_PROMPT_*` | The WO ladder. 02/03/05 executed · 04 parked (cutover runbook w/ §R recon+rollback) · **06/07 STAGED — re-audit per §3-2 before stamping/dispatch** |
| `vault/component-library/sources/gpt56-mabrey/` + `GPT56_MABREY_TEMPLATE_MANIFEST.md` + `gpt56m-*.md` ×13 + `_shots/gpt56m-*` | The BLUEPRINT register (banked; banned until the board drains) |
| `mabrey-blueprint-forge/` (branch `forge/blueprint-motion-we23`) | The motion-forged blueprint home + roof-replacement exemplar (:3220) |
| `mabrey-roofing @ 5c25eb2` | LIVE incl. the A2P consent pass (3 forms) + `consentAt` forward |
| Memory (auto-loads) | `feedback_ui_ban_mvp_first` · `reference_gpt56_mabrey_register` · `project_mabrey_construction_site` (updated to mid-pipeline state) |
| Vault inbox pending | `we22-construction-front-and-handoff-2026-07-11.md` · `os18-session-close-2026-07-11.md` · WE23's close note |

---
**WRITE-LOOP LEDGER (converged pass 5):** P1 draft (10 arcs enumerated) · P2 added SHAs/URLs/CLI-noise/alias-vs-hashed/ports/interlock mechanics · P3 added the tacit layer (his verbatim frustration quote, blessed-parity bar, pre-assignment override, real-content delight) · P4 carry-forward check (base §4/§5/§8 declared verbatim-standing + 7/7/6 NEW items appended; nothing struck) · P5 swept: vault inbox ×2, cron Jul 13, FTC marquee, hub orphan, gapaudit-not-run, GSC-safe, `.axe-multi` gitignore nuance — pass 5 added nothing → converged.
*— WE23, 2026-07-12 ~00:30. The arc: verified WO_01, orchestrated 02→05 through builders with zero-drift checkpoints, banked a third design register + its motion forge, shipped A2P compliance to the live client, staged 06/07 with real harvested content — and ended with Joseph's design-fidelity flag that the gates were never built to catch. Fix the render path, then teach the gates to see design. His eyeball is the standard; parity with roofing's blessed pages is the bar.*
