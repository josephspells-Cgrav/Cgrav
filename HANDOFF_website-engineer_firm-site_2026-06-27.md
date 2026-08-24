# HANDOFF — King Maker FIRM SITE (king-maker-site/) → the next Builder

**From:** the WO_08 + WO_09 builder session (2026-06-27) · **To:** the next Builder (firm-site executor — does the edits)
**Date:** 2026-06-27 · **Lineage (architect → builder):** WE14 (blue/white pivot) → WE15 (skills-gate v2) → WE16 (**architect** — scoped WO_08/09) → **this builder** (executed WO_08 + WO_09 + the edit arcs + the trade archive) → **you (the next builder — more edits)**.
⭐ **Role split:** the WE-numbered line is the ARCHITECT role (researches + scopes work orders); you and I are BUILDERS (execute them + do live edits). You do NOT inherit a WE number — you're a builder. (The file is named `…website-engineer…` only because that's the firm-site bus channel, see below — it is a builder handoff.)
**You own:** the King Maker firm site `C:\Users\josep\Claude Gravity\king-maker-site\` (Next 16 SSG, blue/white, deploys via Vercel CLI → kingmaker-firm.vercel.app).
**Blackboard handle:** `website-engineer` — ⚠️ this is the firm-site CHANNEL on the bus (where the n8n lead-pipeline mail lands + what every firm-site session posts as), NOT the architect's personal identity. You're a builder; you operate ON this channel for firm-site coordination. Don't rename it — the n8n architect addresses mail to `website-engineer`.

---

## 0. ON ARRIVAL — ORIENT, THEN ASK (never auto-start)
1. **Reread this file in an ultrathink loop until a pass surfaces no new info (min 3 passes)** — name what each pass ADDED; a clean final pass = converged. This is your complete brief.
2. **RE-VERIFY this file's volatile claims before trusting them** (they're dated 2026-06-27; they go stale): run the live byte-check (`curl` kingmaker-firm.vercel.app markers), confirm the dev server isn't already running on :3310, re-read the mailbox. A handoff fact is a LEAD, not a truth.
3. **Check mailbox:** `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer` → ack ONLY what you actually handle (there's an unhandled n8n msg — see §3).
4. 🛑 **STOP — do NOT auto-start any task.** ⚠️ **BUILD-STOP rule is in force (§4):** Joseph is on OUTREACH (the phones); nothing new gets built before he lands a client. Present a one-line "where we left off" + a TLDR of candidate next tasks (from §3) and ask which, if any. Picking the next task is Joseph's call.

---

## 1. What this is
The King Maker firm site is the company's own B2B site (sells done-for-you enterprise authority websites + organic-dominance SEO to high-ticket contractors). It is "Exhibit A" — built to the exact enterprise standard it teaches. It is a Next 16 SSG, **blue/white**, education-first. The centerpiece shipped this session is the **buyer's guide**: an 11-category / 32-sub-section cluster that teaches the website + SEO mechanics, plus a copy-paste AI site-audit prompt. The home + marketing pages + a 10-chapter playbook round it out. Everything below is LIVE on kingmaker-firm.vercel.app as of 2026-06-27.

---

## 2. ⭐ CURRENT STATE (volatile — dated 2026-06-27; re-verify per §0.2)

| Thing | State |
|---|---|
| **Live URL** | https://kingmaker-firm.vercel.app (canonical alias) |
| **Last deploy** | "By trade" archive (the latest of 3 deploys this session). All session work is live. |
| **Git** | 🔴 **king-maker-site is ENTIRELY GIT-IGNORED** (`king-maker-site/.gitignore` line 39 = `.`). NOT in the cgrav repo, **nothing committed, ever**. The ONLY record of the code is the **working tree on disk** + the **live Vercel deploy**. `git log` shows nothing about it. Deploys are Vercel-CLI-only, never git-triggered. |
| **Dev server** | NOT running. Start: `preview_start` name `king-maker-site` (launch.json, port 3310) OR `cd king-maker-site && WATCHPACK_POLLING=true npm run dev`. |
| **Build** | tsc 0 + next build green at last check; 65 static routes. |

**Working-tree three-way (the invisible-work trap):**
- COMMITTED+pushed: **NONE** (king-maker-site is gitignored).
- UNCOMMITTED-on-disk = **ALL of king-maker-site** (every file this session: lib/buyers-guide.ts, the 32 lib/guide-content/* files, GuideLayout/AuditPrompt/etc., next.config redirects). If the disk is lost, only the live deploy has it.
- DEPLOYED-but-uncommitted: the live site = the on-disk state (Vercel built from the CLI upload).
- SEPARATE deployments: kingmaker-firm.vercel.app is one of several KM Vercel projects (kingmaker-v3, summit-oak, etc. are different). Don't confuse them.

**What's LIVE on the buyer's guide:**
- `/guides` pillar = the 11-category index; each sub-row links to its `/guides/[slug]` page.
- **32 sub-section pages** (11 categories; Cat 2 "Pricing" has 2 subs, the other ten have 3 → **32, not 31** — the "31" in WO_09/plan is a tally error; the build is 32).
- Cat 10 `/guides/ai-site-audit` = the hardened copy-paste AI audit prompt (`AuditPrompt` component, `.km-code` block + copy button).
- Grouped collapsible nav (`<details>` per category, active one auto-open) — left rail, lg+ only; **scrolls independently** (capped to viewport).
- Old WO_07/08 guide slugs **301→new** (next.config redirects). The honesty-layer page was folded → 301 to /guides.
- **"By trade" ARCHIVED:** `/guides/trades` + `/guides/trades/:path*` → **307 TEMPORARY redirect to /guides**. Removed from pillar/footer/sitemap/llms.txt. **Trade content + page files are KEPT in code** (lib/trade-content/*, app/guides/trades/*) — unreachable, restore-ready.

---

## 3. ⭐ OPEN LOOPS (by type)

**🟡 AWAITING-JULY-1 — the lead pipeline is WIRED end-to-end, but UNVERIFIED (n8n quota).**
`/api/lead` IS wired (WO_04 — `route.ts` confirms: validates 3 schemas + honeypot + forwards to `LEAD_WEBHOOK_URL` → n8n, with a Resend email fallback; UI-only if no env). It is **NOT a `{ok:true}` no-op — the WE15 "no-op" claim was STALE** (don't re-introduce it; route.ts is ground truth). `LEAD_WEBHOOK_URL` is SET on Vercel prod → n8n `/webhook/km-firm-lead` (workflow CJnIFNbSCbJmt996) → KM Leads Telegram (chat 8382218041). **BLOCKER:** the n8n Cloud Starter quota (2,500 execs/mo) was EXHAUSTED by the now-killed 1-min Meta poller → testable only AFTER the **July-1 reset**; every prior test errored on the cap before reaching the Telegram node, so the end-to-end fire is **UNVERIFIED**.
**DoD (after July-1):** submit one real lead from the live form → confirm it lands in Joseph's Telegram (the cred binds + fires). A quick VERIFICATION, not a build. (Source: memory line 10 + website-engineer mailbox, n8n-claude-architect-1, 2026-06-27 — left unacked for you.) ⚠️ n8n RULE: webhooks only, NEVER a polling/schedule trigger (a 1-min poll nukes the 2,500/mo cap in ~2 days).

**AWAITING-USER / DECISION-PENDING — the matrix-doctrine cleanup beyond the guide.**
The buyer's guide was cleaned of all service×location "matrix" language (§4 architecture lock). The SAME language is still LIVE elsewhere and now CONTRADICTS the guide:
- `lib/claims.ts` — the `MatrixGrid` chart + "the service-by-location matrix is the engine" framing.
- The **home** (PageSystem references) — 🔴 home is LOCKED (do not touch; flag to Joseph).
- `public/llms.txt` — still lists OLD 301'd guide slugs (enterprise-website-anatomy, etc.) + "a real page for every service in every town."
**DoD:** apply the no-combo + neutral cleanup site-wide (home flagged, not edited). Decision for Joseph: when + whether (he scoped the last pass to the guide only).

**APPROVED-BUT-NOT-STARTED — "By trade" restore.**
Trades are archived pending real per-trade site-structure research. **Restore:** remove the two trade redirects in `next.config.ts` + re-add the pillar "By trade" section + footer column + sitemap entries + llms line. Content is intact in `lib/trade-content/*`. Needs the research first.

**HOUSEKEEPING:**
- Vault inbox has pending ingests (km-meta-poller, session-firm-site-ship, + my wo08/wo09 + this handoff's note) → "ingest inbox" when wanted.
- `BUYERS_GUIDE_PLAN.md` + `KM_SITE_WORKORDER_09.md` say "31 sub-sections" — stale label; the build is 32.

---

## 4. 🔒 LOCKED DECISIONS (do-not-relitigate) — carried verbatim + attributed

**Carried from WO_08 / WO_09 / the manifest (still in force):**
- ✅ **The HOME (6 maximalist sections: Hero · GapSection · PageSystem · Dashboard · RawTechnicals · BookAppointment) — DO NOT TOUCH.** It's the shipped, approved template source. (WO_08/09)
- ✅ **Do NOT edit `components/motion.tsx` primitives** — compose them (e.g. `GuideSectionHeader`, `AuditPrompt`). Editing primitives would alter the home. (WO_08)
- ✅ **Blue/white · square corners · two-font (Archivo display / Jakarta body / JetBrains mono scarce) · one-shot + reduced-motion-safe motion · accent discipline (blue = brand, blue-action = CTA/links, RED = damage only).** (manifest/WO)
- ✅ **Honesty flags (MEASURED / MODELED / ILLUSTRATIVE) on EVERY stat. Never "guaranteed #1." No PBNs.** Pricing tiers + conversion-lift = ILLUSTRATIVE, never MEASURED. (WO_09 §4)
- ✅ **Anti-doorway rail** wherever dedicated location/service pages are claimed (real job → real page; "delete the city name" test).
- ✅ **Site-wins-the-pack** tiebreaker; **organic-first**; never "only 19%" / never pivot a site question to off-page. (memory: feedback_site_wins_pack, feedback_organic_over_mappack)
- ✅ **Industry-neutral** in neutral sections (trade examples allowed only as illustration).
- ✅ **AI-legibility is NOT a firm-site gate** (struck WE15 — it's a client/Summit-&-Oak standard). Keep `aria-label` on headings (free).
- ✅ **`/api/lead` is WIRED** (WO_04 — validates + honeypot + forwards to `LEAD_WEBHOOK_URL` → n8n, Resend fallback). NOT a no-op (the WE15 "{ok:true} no-op" claim was STALE; `route.ts` is ground truth). Don't re-no-op it. Blocker = the n8n July-1 quota (§3).
- ✅ **SEO + security spine** (JsonLd @graph, canonicals, generateStaticParams, sitemap-registry, speakable flags, llms.txt, the `cyber-security-specialist-1` files: lib/security.ts, app/api/lead, next.config.ts, scripts/security-audit.mjs) — PRESERVE.

**⭐ NEW THIS SESSION (Joseph, 2026-06-27) — locked:**
- ⭐ **ARCHITECTURE: NO service×location combo pages.** The build = **dedicated SERVICE pages** (one per service, hung off the main site, NOT per-city) + **dedicated LOCATION pages** (one per town) + supporting content (cost guides, comparisons, projects). NOT a page per service-in-every-town pairing. **Reason: avoid doorway penalties + site bloat.** This REVERSES the prior "service-by-location matrix is the engine" doctrine. The location page lists the services for that town; the service page lists the areas — together they answer "service in town" INTENT without the combinatorial explosion. ("Buyers SEARCH service-in-town" as intent is still true + stays in copy; only the BUILD claim was removed.)
- ⭐ **Buyer's-guide VOICE = Howard Roark NEUTRAL / detached fact-stating** — state the facts, the pros, the limits, "this may well be enough for you." Calm, declarative, NO angst/hype/attacking/editorializing. ⚠️ DIFFERENT from the cold-copy Roark voice ([[feedback_copy_voice_howard_roark]] = declarative + reframe-the-norm-as-mediocrity for SALES). EDUCATION strips the sell; SALES keeps the reframe.
- ⭐ **Circle-arrow / square-corners EXCEPTION:** the pillar mobile sub-row arrow is a **bare blue arrow (no box), left of the title**. (Joseph authorized overriding square-corners for a circle, then went barer — the filled circle was "too bulky." Final = bare blue SVG arrow, mobile-visible / desktop-hover.)
- ⭐ **"By trade" is ARCHIVED** (temp redirect, reversible) — needs per-trade research before restoring; do NOT half-build it.
- ⭐ The buyer's guide = **11 categories / 32 sub-sections** (NOT 31).
- ✅ **House em-dashes stay** — `impeccable` bans em-dashes, but the site house voice + Joseph's voice use them. House style wins. (Carried calibration.)

---

## 5. FAILURES & DEAD-ENDS

**NEW THIS ARC (lessons that did not exist before):**
- **Mobile arrow iterations (2 rejected):** square chip pushed far-right → "ugly as fucking sin" → iOS filled circle → "too bulky" → **FINAL: bare blue arrow, no box, left of the title.** Lesson: Joseph wants clean/light affordances, not heavy chips; "obviously clickable" ≠ "big box."
- **Deterministic content-restructure SCRIPT (WO_08):** a regex splitter that breaks "wall" paragraphs at SAFE sentence boundaries (negative-lookbehind digit-guard for decimals like `72.9`; allow `**bold`-led sentence starts) — **loss-free BY CONSTRUCTION** (only inserts paragraph breaks, never alters a char; verified by byte-identical concatenation). Beat fanning out for fidelity-critical splitting. Script: `scratchpad/restructure.mjs` (session scratchpad).
- **Parallel-agent content authoring (WO_09):** 6 agents authored the 32 pages + 6 agents refined them, EACH given the 2 exemplar files + the exact facts/flags + the locks + "surgical, preserve everything." Worked well BECAUSE of tight briefs + mechanical verification after (banned-phrase grep, flag-count, density/no-walls, structure-count). Lesson: fan-out is viable for high-volume authoring IF calibrated + verified; voice consistency held via shared exemplars + a spot-read backstop.
- **The "31 vs 32" tally error:** plan + WO said 31; the enumerated structure (Cat2=2, ten×3) = 32. Lesson: count the enumeration, not the running tally.
- **Voice over-reach (corrected):** the first buyer's-guide draft read adversarial/angsty ("the catch," "invisible," "useless," "loses to whoever") — Joseph flagged it once → neutral Roark rewrite. Now the §4 voice lock.
- **Stale-claim trap (caught while writing THIS handoff):** the WO_09 scope line + the WE15 record both implied `/api/lead` is a `{ok:true}` no-op; the actual `route.ts` + memory line 10 show it is fully WIRED (→ LEAD_WEBHOOK_URL → n8n). The "no-op" had propagated ~2 hops. **Lesson: re-verify a handoff's volatile claims against the CODE, not the prior handoff** — exactly the §0.2 re-verify rule.

**Carried (tooling dead-ends — still true):**
- 🔴 **Deploy alias gotcha:** `vercel deploy --prod` aliases the auto-alias (`king-maker-site-two.vercel.app`), NOT the canonical. **Always** `vercel alias set <deployment-url> kingmaker-firm.vercel.app` after. `alias set` REJECTS `--yes` (omit it).
- 🔴 **`.next` stale validator:** after deleting a route, `next build` fails on a stale `.next/types/validator.ts` → `rm -rf .next` before build. And **never `npm run build` while `npm run dev` runs** (they fight over `.next`).
- **Preview MCP:** navigate + probe in the SAME `preview_eval` loses context ("Inspected target navigated or closed") → navigate in one call, probe in the next. `preview_start` won't attach to a foreign dev server on the same port (it starts its own). The "desktop" preset mapped to a narrow 420px native window → use EXPLICIT width (e.g. 1280) to test ≥lg.
- **Clipboard in headless preview:** `navigator.clipboard.writeText` is blocked (no transient activation) — the copy button won't flip to "Copied" in a probe, but works on a real user click (localhost is a secure context). Not a bug.

---

## 6. TOOLING GOTCHAS
- **Skills-gate** fires on EVERY `components/**` + `app/**` edit (UI design work) — you MUST have invoked the 6 design skills (impeccable, design-taste-frontend, frontend-design, ui-ux-pro-max, high-end-visual-design, gpt-taste) via the Skill tool THIS session, + framer-motion + design-motion-principles for motion edits. `lib/` content-data edits are NOT gated. The gate reads the real invocation log; name-dropping fails. After a session restart the log resets → re-invoke.
- **king-maker-site is standalone** — the verify-gate Stop hook does NOT guard it (that's for the AM `web/` root). Your gate = WO §9/§10 + verify-before-claim.
- **Session restarts** happened repeatedly this session (resume) — they reset the skills-invoked log + drop loaded MCP/preview tools (re-`ToolSearch select:...` to reload).
- **Deferred MCP tools:** preview_*, obsidian-*, etc. load on demand via ToolSearch.

## 7. DEPLOY + VERIFY (exact, fenced)
```bash
cd "C:/Users/josep/Claude Gravity/king-maker-site"
rm -rf .next                                   # avoid stale-validator
npx tsc --noEmit                               # 0 errors
npm run build                                  # all routes SSG (do NOT run while dev is up)
npx --yes vercel@latest deploy --prod --yes    # note the deployment URL it prints
npx --yes vercel@latest alias set <deployment-url> kingmaker-firm.vercel.app   # NO --yes flag
# then byte-check the CANONICAL alias (not the CLI-reported auto-alias):
curl -s -o /dev/null -w "%{http_code}" https://kingmaker-firm.vercel.app/guides
```
Local dev for edit-mode: `preview_start` name `king-maker-site` (port 3310). 🛑 NEVER deploy without Joseph's explicit "ship"/"deploy" + his eyeball.

## 8. ⭐ TASTE & CALIBRATION LEDGER (drifts worst — carried verbatim + new)
- ⭐ **The two Roark voices** (THE calibration of this session): EDUCATION/buyer's-guide = NEUTRAL detached fact-stating (facts/pros/limits, "may be enough for you", zero angst); SALES/cold-copy = declarative reframe-as-mediocrity. Don't cross them.
- ⭐ **Simplify, NOT oversimplify:** plain words + short sentences for a 50-60yo contractor who knows NOTHING — but KEEP the substance + expert depth. Don't dumb down.
- ⭐ **Readable-first / no walls:** paragraphs 1-3 sentences (~<300 chars), bullets, break-blocks every few paragraphs. (overstimulation threshold: motion HELPS, never competes.)
- **Clean + light UI, not bulky:** he rejected the square chip + the filled circle for a bare arrow. Keep affordances minimal. Don't add weight to desktop unnecessarily (mobile-visible / desktop-hover patterns).
- **He confirms-understanding before big changes** ("confirm this makes sense to you") — give a crisp confirmation + flag scope/contradictions BEFORE executing architecture-level edits.
- **He reviews on localhost, iterates fast, says "ship" when happy.** Blunt + warm feedback ("ugly as fucking sin" / "you're the fucking man"). Values: honesty rails, contractor-clarity, the neutral expert voice, obvious-clickability, reversibility (archive not delete).
- **Comms (memory):** moderate emoji (~20% bump, ✅/❌/👍), AVOID exclamation points (carry emphasis with an emoji). Caveman bullets first.
- **No inline screenshots** (memory): capture to disk, vision via background agents returning text, Joseph eyeballs URLs.
- **Extrapolation rule:** feedback 2× → audit template-wide (don't just patch the flagged spot).
- ⚖️ **BUILD-STOP → OUTREACH (memory feedback_build_stop_outreach):** building stops until a client; Joseph is on the phones. You are the ENFORCER — if he returns to build/redesign before a client, name the build-avoidance + redirect to outreach (only exception = a real outreach blocker). The §3 July-1 lead-pipeline test is a quick VERIFICATION (not a build) + outreach-enabling — fine to run when July-1 hits.

## 9. COORDINATION (blackboard)
- You operate as `website-engineer` on the bus (the firm-site channel — you're a builder embodying it, see the header). **1 unhandled msg** from `n8n-claude-architect-1` (the /webhook/km-firm-lead is live + the firm-site pipeline is wired — §3; it's informational + already reflected here). Ack when you've run the July-1 test, or now — your call.
- `n8n-claude-architect-1` owns the lead funnel (n8n). The firm-site lead webhook is theirs: `/webhook/km-firm-lead` (workflow CJnIFNbSCbJmt996). Coordinate the July-1 end-to-end lead test with them.
- `human` = Joseph (router / deploy gate / final eyeball).

## 10. KNOWLEDGE ARTIFACTS & FILE MAP (read-order; AUTHORITATIVE on conflict)
**Read first (lineage, in order):**
1. `KM_SITE_WORKORDER_09.md` — the buyer's-guide build spec (latest WO; AUTHORITATIVE on the guide). ⚠️ says "31" (stale → it's 32).
2. `BUYERS_GUIDE_PLAN.md` — the locked 11-category structure (Joseph's plan).
3. `king-maker-site/KING_MAKER_TEMPLATE_MANIFEST.md` — the home template / motion + token reuse map (AUTHORITATIVE on design primitives).
4. `KM_SITE_WORKORDER_08.md` — the propagation pass (H2 motion, restructure, marketing pages).
5. Vault inbox: `wo08-firm-site-propagation.md`, `wo09-buyers-guide-shipped.md` (the durable session notes — incl. the no-combo lock).

**Code map (king-maker-site/, all gitignored/on-disk):**
- `lib/buyers-guide.ts` — ⭐ the 11-cat/32-sub registry + helpers (BG_SUBS, BG_TREE, getSub, prevNext, GUIDE_REDIRECTS). The backbone.
- `lib/guide-content/*.ts` — the 32 authored sub-section data files (+ index.ts maps slug→content). Cat 10 `ai-site-audit.ts` uses the `{kind:"auditPrompt"}` block.
- `lib/content-blocks.ts` — the Block union (p/list/takeaway/comparison/chart/definition/debunk/priceRange/spec/antiDoorway/auditPrompt) + GuideContent type.
- `lib/claims.ts` — ⭐ the data layer (every stat + its flag). ⚠️ still has MatrixGrid + matrix framing (§3 pending).
- `lib/playbook.ts` + `lib/playbook-content/*` — the 10-chapter playbook (separate axis, unaffected).
- `lib/trade-content/*` + `app/guides/trades/*` — ARCHIVED trades (in code, redirected away).
- `components/guide/GuideArticle.tsx` (the renderer) · `GuideSectionHeader.tsx` (H2 motion) · `GuideLayout.tsx` (grouped `<details>` nav + independent scroll) · `AuditPrompt.tsx` (the copy-paste prompt).
- `components/motion.tsx` — 🔴 DO NOT edit primitives. `components/Footer.tsx` / `Header.tsx` — nav (trades removed, "buyer's guide" link).
- `app/guides/page.tsx` — the pillar (11-cat index + the bare-blue-arrow sub-rows). `app/guides/[slug]/page.tsx` — the 32-page renderer. `app/api/lead/route.ts` — ✅ WIRED lead sink (→ LEAD_WEBHOOK_URL → n8n, Resend fallback; §3) — NOT a no-op.
- `next.config.ts` — the 301s (old→new) + the trade temp-redirects (302/307). `lib/sitemap-registry.ts` — sitemap (trades removed). `public/llms.txt` — ⚠️ stale slugs (§3).

---
*Written 2026-06-27 by the WO_08/09 builder. Compounds WO_08/09 + manifest locks (carried verbatim, §4/§5/§8) + this session's arcs (buyer's guide shipped · neutral-voice + no-combo locks · trade archive). The site is fully LIVE; the open loops are the n8n lead-wiring, the matrix cleanup beyond the guide, and the trade restore — all gated behind Joseph's BUILD-STOP→outreach call. Re-verify volatile state (§2) before acting.*
