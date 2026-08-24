# HANDOFF — King Maker FIRM SITE (king-maker-site/) → the next Builder

**From:** the WO_10 + voice-edits + Site-Demos + /system-retirement + footer + VISUAL-UPGRADE + PUBLIC-LAUNCH builder session (2026-06-30) · **To:** the next Builder (firm-site executor)
**Date:** 2026-06-30 · **Lineage (architect → builder):** WE14 (blue/white pivot) → WE15 (skills-gate v2) → WE16 (**architect** — scoped WO_08/09/10) → WO_08/09 builder → **WO_10 + visual-upgrade + public-launch builder (this one)** → **you (next builder)**.
⭐ **Role split:** the WE-numbered line is the ARCHITECT role (scopes work orders); you and I are BUILDERS (execute). You do NOT inherit a WE number. The file is named `…website-engineer…` only because that's the firm-site bus channel (see §9).
**You own:** the King Maker firm site `C:\Users\josep\Claude Gravity\king-maker-site\` (Next 16 SSG, blue/white, deploys via Vercel CLI).
**Blackboard handle:** `website-engineer` — the firm-site CHANNEL (where n8n lead-pipeline mail lands). Don't rename it.

---

## 0. ON ARRIVAL — ORIENT, THEN ASK (never auto-start)
1. **Reread this file in an ultrathink loop until a pass surfaces no new info (min 3 passes)** — name what each pass ADDED; a clean final pass = converged. This is your complete brief.
2. **RE-VERIFY this file's volatile claims (dated 2026-06-30) before trusting them** — `curl` the live hosts (`kingmakerseo.com`, `www.kingmakerseo.com`, `kingmaker-firm.vercel.app`), confirm :3310 free, re-read the mailbox. A handoff fact is a LEAD, not a truth. (The predecessor's git claim was wrong — always re-verify.)
3. **Check mailbox:** `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer` (3 msgs — see §9). ⚠️ `bb.mjs ack --agent` is ALL-OR-NOTHING (it calls `ackMailbox` → archives the WHOLE inbox, no per-message targeting). Two are HANDLED but the n8n July-1 msg is the LIVE loop → **do NOT blanket-ack** until that loop closes, or you bury it.
4. 🛑 **STOP — do NOT auto-start any task.** Present a one-line "where we left off" + a TLDR of candidate next tasks (from §3) and ask which. ⚠️ BUILD-STOP is nominally in force (§8) BUT was overridden this arc — Joseph explicitly greenlit the firm-site polish as a sales-asset + directed the public launch. Don't enforce build-stop on work he's actively directing; DO redirect if he drifts into unrequested building.

---

## 1. What this is
The King Maker firm site is the company's own B2B site (sells done-for-you enterprise authority websites + organic-dominance SEO to high-ticket contractors). "Exhibit A" — built to the enterprise standard it teaches. Next 16 SSG, **blue/white**, education-first. Centerpiece = the buyer's guide (11-cat / 32-sub cluster + a copy-paste AI audit prompt); home + marketing pages + a 10-chapter playbook + a NEW `/pricing` tab round it out. **As of 2026-06-30 the whole site is LIVE on the public brand domain `kingmakerseo.com`** (it spent the prior session staging on `kingmaker-firm.vercel.app`).

---

## 2. ⭐ CURRENT STATE (volatile — dated 2026-06-30; re-verify per §0.2)

| Thing | State |
|---|---|
| **PUBLIC canonical** | 🆕 **`https://www.kingmakerseo.com`** (apex `kingmakerseo.com` 308→www). FLIPPED this session from kingmaker-firm.vercel.app. `SITE_URL` in `lib/site.config.ts` = `https://www.kingmakerseo.com`; all canonical/schema/sitemap/llms reference it. |
| **Staging alias** | `kingmaker-firm.vercel.app` — still live, re-aliased to the same latest deploy (a secondary; its pages canonical to www.kingmakerseo.com). |
| **Last deploy** | `dpl_CryAvTzgKkQBuW2AC8BMuxJnXQYU` (`king-maker-site-kzszk0x00-…vercel.app`) — the SITE_URL-flip build. Both www.kingmakerseo.com + kingmaker-firm.vercel.app point to it. |
| **Git** | 🔴 **king-maker-site is UNTRACKED in cgrav** (`git status` → `?? king-maker-site/`; it is NOT its own repo — toplevel is cgrav). NOTHING committed, ever. Only record = the **working tree on disk** + the **live Vercel deploy**. ⚠️ The predecessor said "gitignored line 39 = `.`" — that's WRONG; it's untracked. Remedy is unobstructed (a `git add` would work) BUT cgrav looks pushed/public (recent "untrack leads/ from public repo" commits) → committing the firm-site source there could PUBLISH it. Recovery = Joseph's call (separate private repo / backup snapshot). See §3. |
| **Dev server** | NOT running (verify :3310 free). Start: `preview_start` name `king-maker-site` (launch.json, port 3310). |
| **Build** | tsc 0 + `next build` green at last deploy; routes all SSG. `/system` route DELETED; `/work` route still builds but is redirect-shadowed (301→Summit & Oak). |
| **New deps (this session)** | `lenis@^1.3.25`, `gsap@^3.15.0`, `@gsap/react@^2.1.2` (in package.json — Vercel installs them on deploy). |

**Working-tree three-way (the invisible-work trap):**
- COMMITTED+pushed: **NONE** (king-maker-site is untracked in cgrav).
- UNCOMMITTED-on-disk = **ALL of king-maker-site** (everything this session: the /pricing page, the visual-upgrade components, the SITE_URL flip, etc.). If the disk is lost, only the live deploy has it.
- DEPLOYED = the on-disk state (Vercel built from CLI upload) — live on www.kingmakerseo.com + kingmaker-firm.vercel.app.
- SEPARATE deployments: kingmaker-v3, summit-oak, etc. are DIFFERENT Vercel projects. **`www.kingmakerseo.com` is a custom domain on the SAME `king-maker-site` project** (it was pinned to an OLD deploy until this session — see §5 / §6).

**What shipped this session (all LIVE):**
- 🆕 **`/pricing` tab** (`app/pricing/page.tsx`) — the $497/mo offer. SALES-Roark voice. Sections: hero ("Own the system that ranks") · KingMaker-site value card (big **"3–5× the available leads"** + Illustrative flag) + a 12-item industry-agnostic page-type checklist · a **3-tier comparison** (Brochure ~$97 / Standard ~$297 / **KingMaker enterprise site** $497, the last blue-emphasized) · off-page SEO separate sub ($1k/$2k/$3k + decay rail) · ICP qualify-in/out · CTA→/apply. **Offer-integrity: NO à-la-carte / NO exposed build price / NO $10-15k on the tab / NO "X payments" / NO buyout.** In Header nav + Footer + sitemap.
- 🆕 **`/system` RETIRED** — page DELETED; its thesis+mechanism folded into the home's PageSystem ("Organic regional dominance is the engine…"); 301→/playbook in next.config; all 8 refs cleaned.
- 🆕 **`/work` RETIRED** — nav "The Work" → a **"Site Demos" dropdown** (Header) → Summit & Oak (`https://kingmaker-summit-oak-roofing.vercel.app`, opens new tab); removed from footer + sitemap + capture.spec; 301 `/work`→Summit&Oak in next.config. **The `/work` page FILE is KEPT** (redirect-shadowed, restore-ready) — hard-delete is a pending decision (§3).
- 🆕 **Footer cleaned** — removed The Work + The System; "All 31 sections"→"All 32 sections"; every remaining link verified live.
- 🆕 **§3 guide price** — `lib/guide-content/what-a-website-should-cost.ts`: enterprise $75→**$100/page ≈ $10,000-15,000 "for a full build"** (3 spots). Guide stays pure education (no $497/bridge/pricing-link).
- 🆕 **§4 matrix-copy** — combo "every service IN every town" → "every service you offer AND every town you work" on llms.txt + home PageSystem + /work.
- 🆕 **VISUAL UPGRADE** (the maximalist pass, vault-agent WO): **Lenis** smooth-scroll (global, reduced-motion-guarded) · **3-layer depth tokens** + inset highlight (cards float) · **browser-chrome dashboard** + staggered lead rows · **GSAP scroll-progress bar** (Lenis-wired) · **/guides wall-break** = section-number chips (01/02…) + elevated KeyTakeaway callout cards. All vision-PASS'd live.

---

## 3. ⭐ OPEN LOOPS (by type)

**🟡 AWAITING-JULY-1 (now ~TOMORROW) — n8n lead-pipeline end-to-end test (carried, still open).**
`/api/lead` IS wired (validates 3 schemas + honeypot → forwards to `LEAD_WEBHOOK_URL` → n8n `/webhook/km-firm-lead`, workflow CJnIFNbSCbJmt996 → KM Leads Telegram chat 8382218041; Resend fallback). NOT a no-op. Blocker WAS the n8n quota exhausted until the **July-1 reset** (today is 2026-06-30 → July-1 is imminent). **DoD:** submit one real lead from the LIVE form (now on kingmakerseo.com/pricing or wherever the booking form is) → confirm it lands in Joseph's Telegram. A VERIFICATION, not a build. ⚠️ n8n RULE: webhooks only, NEVER a polling/schedule trigger. (Source: n8n-claude-architect-1 mailbox msg, still unacked — §9.)

**DECISION-PENDING — matrix-doctrine cleanup BEYOND the named surfaces.**
The "service-by-location matrix is the engine" doctrine + the `chart:"matrix"` visual still live in: the **PLAYBOOK** (live — `lib/playbook-content/*`: satellite-expansion, the-asset-your-website, organic-vs-the-map-pack, the-1m-to-10m-roadmap), the **archived trades** (`lib/trade-content/*`, 307'd), the shared `components/charts/MatrixGrid.tsx`, and a **dead `EnterprisePageAnatomy.tsx`** (renders nowhere — no live guide uses `chart:"enterprise-anatomy"`). I corrected ONLY the live named surfaces (llms/home/work) this arc + flagged the rest. ⚠️ CONTRADICTION to weigh: the predecessor said "playbook = separate axis, unaffected" but the visual-upgrade WO implied "reframe the matrix chart wherever rendered." De-matrixing the playbook is a NARRATIVE rewrite (not surgical). **Decision for Joseph:** leave playbook as-is / reframe just the MatrixGrid chart site-wide / full playbook de-matrix as its own WO.

**APPROVED-BUT-NOT-STARTED / DEFERRED — remaining firm-site maximalist extras.**
From the visual-upgrade WO, deliberately deferred (Joseph eyeballed + loved what shipped; these are the "keep going" remainder): (a) **dead-zone ambient** on the flat white home bands (PageSystem/RawTechnicals — faint `.km-aura`/`.km-blueprint`, touches sacred home); (b) **hero text-effect alternative**; (c) **stat-row bars/rings** on the GapSection (57/70/56/71%) — count-ups exist, add a thin bar; (d) **react-bits / magicui hands-on demo** — NOT yet tried hands-on (see tier report §8); my read is they're for Summit & Oak, not the firm site.

**NEXT (Joseph's stated plan) — Summit & Oak pass.**
Once the firm site is settled: **Summit & Oak HOMEPAGE only, localhost-only** first pass (the visual libs there — SO has zero motion infra + flat cards, the right home for gsap/react-bits/magicui). `summit-oak-roofing/` → kingmaker-summit-oak-roofing.vercel.app. Do NOT start without Joseph's go.

**DECISIONS-PENDING (small):**
- **Apex-vs-www canonical** — currently canonical = www.kingmakerseo.com (matches the existing apex→www redirect). If Joseph wants the bare `kingmakerseo.com` as canonical, reverse the redirect (www→apex) + flip SITE_URL. Pre-launch, low-stakes.
- **`/work` page file** — hard-delete (like /system) or keep redirect-shadowed/restore-ready? Currently kept.
- **By-trade restore** (carried) — archived pending per-trade research; restore = remove the trade redirects + re-add pillar/footer/sitemap/llms. Don't half-build.
- **RECOVERY (standing, [[feedback_recovery_first]])** — king-maker-site is untracked → only disk + live deploy. Joseph's call on the recovery approach (separate private repo / backup snapshot wired into backup-all). Do NOT `git add` it into cgrav without his go (cgrav looks public).

**HOUSEKEEPING:** vault inbox ingests pending. Stale "31"→"32" remains in non-rendered spots (`lib/buyers-guide.ts` comments L1/138/163 + BUYERS_GUIDE_PLAN.md + KM_SITE_WORKORDER_09.md; the footer is fixed to 32).

---

## 4. 🔒 LOCKED DECISIONS (do-not-relitigate) — carried verbatim + attributed

**🔴 SUPERSEDED THIS ARC (struck-with-date, not dropped):**
- ~~**HOME — DO NOT TOUCH** (WO_08/09)~~ → **SUPERSEDED 2026-06-29/30.** Joseph now ACTIVELY DIRECTS home edits: the §4 matrix-copy fix (PageSystem lede), the /system thesis FOLD into PageSystem, and the maximalist visual upgrade (depth tokens, the Dashboard browser-chrome + staggered leads). **Edit the home when Joseph directs it — surgically, verified, balance-checked.** The SPIRIT survives: the Dashboard is the proof element — **enhance, never simplify**; keep changes surgical + flag them; the home is the maximal-pole for motion (see §8 gradient).

**Carried from WO_08/09/10 + manifest (still in force):**
- ✅ **Do NOT edit `components/motion.tsx` primitives** — compose them (this arc: SmoothScroll/ScrollProgress are NEW leaf components; Dashboard/PageSystem enhancements used existing primitives; KeyTakeaway/GuideSectionHeader edits were composition, not primitive edits). (WO_08)
- ✅ **Blue/white · square corners · two-font (Archivo/Jakarta/JetBrains scarce) · one-shot + reduced-motion-safe motion · accent discipline (blue=brand, blue-action=CTA/links, RED=damage only).** Reinforced HARD this arc (the visual upgrade stayed 100% inside these; zero red leaked outside the gap stats; vision-verified). (manifest/WO)
- ✅ **NO service×location combo pages** — dedicated SERVICE pages + dedicated LOCATION pages, NOT a page per service-in-every-town. Avoids doorway penalties + bloat. (Joseph 2026-06-27; ENFORCED this arc — §4 matrix cleanup.) "Buyers SEARCH service-in-town" as INTENT stays in copy; only the BUILD claim is gone.
- ✅ **TWO Roark voices** — EDUCATION/buyer's-guide = NEUTRAL detached fact-stating; SALES/cold-copy + the /pricing tab = declarative reframe. ⭐ **REFINED this arc (Joseph, see §5/§8): SALES Roark = state-what-it-IS, NOT defend-the-price-against-a-competitor.** The "$297 crowd / that's the point" defensive reframe was REJECTED.
- ✅ **Honesty flags (MEASURED/MODELED/ILLUSTRATIVE) on every stat; never "guaranteed #1"; no PBNs.** Pricing tiers + the 3-5x leads claim = ILLUSTRATIVE (the /pricing page flags the 3-5x). (WO_09 §4)
- ⚠️ **NEW — the 3-5× headline reconciliation (a LOAD-BEARING tacit call).** The vault-agent pricing-brief says **"do NOT LEAD on the visitor/3-5× headline — it's FTC-sensitive; the site/ranking system is the lead, the multiple is supporting + caveated; 'get 3-5× more traffic' as a flat promise is FTC-actionable; it's a projection vs the AVERAGE BROKEN site, geo-dependent, less if they already have a functional site."** But **Joseph EXPLICITLY directed (this session) leading with it** — "Generate 3-5× the available leads in your market" as the /pricing hero + the blue value card, "going full sales," with "Generate" in blue + a blue underline. **Reconciliation I shipped:** followed Joseph's direct instruction (it outranks an agent brief) BUT kept the **ILLUSTRATIVE flag** on the 3-5x claim as the FTC guardrail. ⚠️ Successor: do NOT silently strip Joseph's headline (he wants it) AND do NOT drop the Illustrative flag (the honesty rail). If Joseph wants the flag gone, push back once with the FTC reason, then it's his call. (Note: Joseph says "leads," the brief says "traffic" — "leads" is the more aggressive word; the flag covers it.)
- 🔒 **OFFER-INTEGRITY MODEL (load-bearing — do NOT drift; vault `km-offer-497-subscription`).** Tier 1 = **$497/mo flat, month-to-month, NO contract, NO à-la-carte.** **NEVER expose a raw/one-time site build price** (it reopens "what if I only buy half the site" negotiation — the exact thing the subscription kills). **NEVER frame it as "X payments of $497"** (implies an end + reopens ownership). The **kill-switch is THE mechanic:** site lives on KM's Vercel → stop paying → it goes dark; frame = "your site, built + hosted + maintained by us," NOT "you own it" — this is what makes no-contract SAFE. **Buyout (~$5k → own it + source) is ad-hoc, NOT headlined** (handle on request). Tier 2 off-page SEO = a SEPARATE subscription ($1k/$2k/$3k, ~1-in-10 opt in, set a 3-6mo-minimum expectation, decay-honest). My /pricing page ships to all of this. (Joseph 2026-06-27, via vault-agent.)
- ✅ **Anti-doorway rail** wherever dedicated location/service pages are claimed.
- ✅ **Site-wins-the-pack** tiebreaker; **organic-first**; never "only 19%"; never pivot a site question to off-page. (memory)
- ✅ **Industry-neutral** in neutral sections (the /pricing 12-item page-type checklist is deliberately industry-agnostic).
- ✅ **AI-legibility is NOT a firm-site gate** (struck WE15). Keep `aria-label` on headings (free).
- ✅ **`/api/lead` is WIRED** (→ LEAD_WEBHOOK_URL → n8n, Resend fallback). NOT a no-op. Blocker = July-1 quota (§3).
- ✅ **SEO + security spine** (JsonLd @graph, canonicals, generateStaticParams, sitemap-registry, speakable, llms.txt, the `cyber-security-specialist-1` files: lib/security.ts, app/api/lead, next.config.ts, scripts/security-audit.mjs) — PRESERVE.
- ✅ **Circle-arrow / square-corners EXCEPTION:** the pillar mobile sub-row arrow is a bare blue arrow (no box), left of the title. (Joseph 2026-06-27)
- ✅ **"By trade" ARCHIVED** (temp redirect, reversible) — needs per-trade research before restoring; do NOT half-build.
- ✅ The buyer's guide = **11 categories / 32 sub-sections** (NOT 31).
- ✅ **House em-dashes stay** — `impeccable` bans them; house style wins.
- ⭐ **NEW (visual-upgrade, Joseph 2026-06-29):** the new design-libs serve the **localhost experiment + tool-evaluation**; on the LOCKED firm site only **Lenis** earned a permanent spot (S-tier). GSAP/react-bits/magicui are for **Summit & Oak**, not the firm site (they duplicate the firm's primitives or fight the locks — §8 tier report).
- ⭐ **NEW: the skills' aesthetics are OVERRIDDEN by the firm locks.** gpt-taste/high-end-visual-design/design-taste-frontend default to dark/OLED, rounded-[2rem], Geist/Satoshi, glass, GSAP-everything, infinite-loop motion. **Take their anti-slop/depth/perf PRINCIPLES; ignore their aesthetics.** The manifest + locks govern. (Also: skip gpt-taste's `<design_plan>` Python ritual — that's for greenfield.)

---

## 5. FAILURES & DEAD-ENDS

**⭐ NEW THIS ARC (lessons that did not exist at the last handoff):**
- 🔴 **THE PUBLIC DOMAIN WAS A SEPARATE STALE ALIAS — the biggest trap.** `www.kingmakerseo.com` is a custom domain on the SAME `king-maker-site` project, but it was **pinned to an OLD deploy** (~5 days stale — `/pricing` 404'd, missing the whole session). **Vercel CLI `vercel deploy --prod` does NOT auto-update the custom domain** — it only updates the auto-alias. EVERY deploy you must manually `vercel alias set <deploy-url> www.kingmakerseo.com` (AND `kingmaker-firm.vercel.app`) or the public site serves stale. I shipped 2 deploys this session that NEVER reached the public domain before catching this. **Lesson: after every deploy, byte-check the PUBLIC host (kingmakerseo.com), not just the staging alias.**
- **The $297 defensive-reframe was REJECTED (voice calibration).** My first /pricing build had a "Yes, it costs more than the $297 crowd. That's the point." section. Joseph: "fucking delete that shit… not the voice." **Lesson: SALES Roark STATES WHAT THE THING IS (declarative, premium), it does NOT defend the price against a cheaper competitor.** A neutral 3-tier comparison (brochure/standard/enterprise) is fine; a defensive "we cost more, that's the point" is not.
- **Turbopack stale-cache on rapid sequential edits.** After 3 fast edits to Dashboard.tsx, the dev server showed PHANTOM parse errors citing line numbers that didn't match the (balanced) file on disk. A reload served cache, not disk. **Fix: `tsc --noEmit` is the authoritative syntax check (it was clean); then stop dev → `rm -rf .next` → restart.** Don't trust dev-overlay errors after rapid edits — verify against tsc + disk.
- **Tailwind v4 custom-shadow utility didn't resolve.** `shadow-card` (from `@theme --shadow-card`) produced an EMPTY shadow. **Use the arbitrary-value form `shadow-[var(--shadow-card)]`** instead. (DOM-assert computed box-shadow caught it.)
- **Lenis intercepts programmatic scroll.** `window.scrollTo()` does NOT move a Lenis-controlled page (it snapped back to 0), so a programmatic scroll-test of the GSAP progress bar was inconclusive. **To test scroll-linked motion under Lenis: use a real wheel event (`page.mouse.wheel`) or `lenis.scrollTo`.** The wheel-scroll Playwright capture confirmed the bar tracks.
- **GSAP + Lenis need explicit wiring.** GSAP ScrollTrigger does NOT auto-sync with Lenis smooth scroll. Wire `useLenis(() => ScrollTrigger.update())` (the component using it must be INSIDE the `<ReactLenis>` provider — I moved `<ScrollProgress/>` inside `<SmoothScroll>`). Also `gsap.registerPlugin(ScrollTrigger)` once at module scope. (Tier note: for a simple progress bar, framer-motion's `useScroll`+`scaleX` is 3 lines — GSAP was overkill here; see §8.)
- **DOM-renders-but-vision-confirms.** A full-page Playwright screenshot leaves below-fold `whileInView` (framer-motion) content at opacity:0 (no scroll fires it) — capture under **reduced-motion** to render all sections at final state. (Recurred from the prior arc; now standard for full-page captures.)

**Carried (still true):**
- 🔴 **Deploy alias gotcha** — `vercel deploy --prod` aliases the auto-alias, NOT the canonical. **Always `vercel alias set <deploy-url> <host>` after** (NO `--yes` on alias set). ⭐ EXTENDED this arc: do it for **BOTH `www.kingmakerseo.com` AND `kingmaker-firm.vercel.app`** (the public domain is the one that bit us).
- 🔴 **`.next` stale validator** — `rm -rf .next` before build after deleting a route; never `npm run build` while `npm run dev` runs.
- **Preview MCP** — navigate + probe in the SAME `preview_eval` loses context → navigate in one call, probe in the next. `preview_start` starts its own dev server (won't attach to a foreign one on :3310). Use EXPLICIT width 1280 (the "desktop" preset is a narrow 420px).
- **Clipboard in headless preview** — `navigator.clipboard.writeText` blocked (no transient activation); works on a real click. Not a bug.
- **Mobile arrow / restructure-script / parallel-authoring / 31-vs-32 / voice-over-reach / stale-claim-trap** — (carried from 2026-06-27; see prior handoff for detail). The stale-claim lesson PROVED OUT this arc: the predecessor's "gitignored" git claim was wrong (it's untracked) — re-verify volatile claims against reality.

---

## 6. TOOLING GOTCHAS
- 🔴 **kingmakerseo.com / www do NOT auto-update on `vercel deploy --prod`** — manual `vercel alias set` required every deploy (see §5, §7). The public domain is a custom domain on the `king-maker-site` project (apex 308→www; canonical = www).
- **Skills-gate** fires on EVERY `components/**` + `app/**` edit — you MUST have invoked the 6 design skills (impeccable, design-taste-frontend, frontend-design, ui-ux-pro-max, high-end-visual-design, gpt-taste) via the Skill tool THIS session + framer-motion + design-motion-principles for motion. `lib/`-only edits aren't gated. The gate reads the real invocation log; restarts reset it → re-invoke.
- **king-maker-site is standalone** — the verify-gate Stop hook does NOT guard it. Your gate = the WO + `verify-before-claim`.
- **Vercel CLI is authed** (account josephspells-2634, team joseph-spells-projects) — `npx --yes vercel@latest …` works, no token. Deploys are CLI-only, never git-triggered.
- **Session restarts** reset the skills-invoked log + drop loaded MCP/preview tools (re-`ToolSearch select:…` to reload — `preview_*`, `SendMessage`, `TaskCreate`, etc. are deferred).
- **No-inline-screenshots discipline** (memory): capture to disk via a Playwright `.cjs` in the session scratchpad (require the project's `@playwright/test` by ABSOLUTE path — `require("C:/…/king-maker-site/node_modules/@playwright/test")` since the script lives outside the project), then vision-QA via a background Agent that Reads the PNGs + returns text. Reuse the `a0fbc…` vision agent via `SendMessage` (it holds the firm-site standard).

## 7. DEPLOY + VERIFY (exact, fenced) — ⭐ UPDATED for the public domain
```bash
cd "C:/Users/josep/Claude Gravity/king-maker-site"
rm -rf .next                                   # avoid stale-validator
npx tsc --noEmit                               # 0 errors
npm run build                                  # all routes SSG (NOT while dev is up)
npx --yes vercel@latest deploy --prod --yes    # note the deployment URL it prints
# RE-ALIAS BOTH (the alias does NOT auto-update — the public domain bit us):
npx --yes vercel@latest alias set <deployment-url> www.kingmakerseo.com    # NO --yes
npx --yes vercel@latest alias set <deployment-url> kingmaker-firm.vercel.app # NO --yes
# byte-check the PUBLIC host (not just staging):
curl -s -o /dev/null -w "%{http_code}\n" https://www.kingmakerseo.com/pricing
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://kingmakerseo.com/   # expect 308 -> www
```
If you flip canonicals/domains: `SITE_URL` lives in `lib/site.config.ts` (single source — SITE.url/orgId/websiteId derive from it); `public/llms.txt` has hardcoded URLs (flip the host there too). 🛑 NEVER deploy without Joseph's explicit "ship"/"deploy" + his eyeball.

## 8. ⭐ TASTE & CALIBRATION LEDGER (drifts worst — carried verbatim + new)
- ⭐ **The two Roark voices** — EDUCATION = NEUTRAL fact-stating; SALES = declarative reframe. ⭐ **REFINED this arc: SALES = state-what-it-IS, NOT defend-the-price-against-a-competitor.** ("$297 crowd / that's the point" → REJECTED.)
- ⭐ **NEW — "go maximalist on localhost so we can SEE everything + evaluate the new repos."** Joseph's mode for the visual upgrade: localhost is a not-mission-critical EXPERIMENT — try the tools, push maximal, then he eyeballs + dials back. He wants a tool **tier report** (S/A/B). **The hard floor stays even maximalist: reduced-motion-safe · mobile-legible · don't break the proof (dashboard/footer/guides body-type) · NO dark overlay (the readability mandate — explicitly rejected before).**
- ⭐ **NEW — the tier report (hands-on, my finding):** **Lenis = S** (trivial, huge premium-per-effort, keep for prod). **Depth tokens (tweakcn-approach) = A** (hand-derived the 3-layer scale into `@theme`; the literal tweakcn tool generates a shadcn theme w/ radii — wrong for a square site, so I emulated the concept). **GSAP+@gsap/react = B for the firm site / A–S for Summit & Oak** (mixing w/ framer-motion is an anti-pattern; needs Lenis wiring; framer-motion's useScroll does the progress bar in 3 lines; GSAP shines on complex scrolltelling the readability-first firm site shouldn't do). **react-bits / magicui = NOT force-fitted** (the firm has on-brand equivalents: CountUp≈NumberTicker, TypeIn≈SplitText; their defaults fight the locks) → **deferred to the Summit & Oak pass** (flat, no motion infra — the right home). NOT yet tried hands-on.
- ⭐ **The home-vs-inner-page motion GRADIENT** (memory `feedback_overstimulation_threshold`): the HOME is the maximal pole (full TypeIn/count-ups/parallax/dashboard choreography). INNER pages dial to heading-level only (page-H1 TypeIn OK; section H2s = light Reveal + short DrawLine, NOT typewriter-on-every-H2). The /guides section-number chips + elevated callouts + the global progress bar give the guides STRUCTURE without overstimulating the 50-60yo phone reader.
- ⭐ **Overstimulation gate** — every motion/density choice must HELP the reader, not COMPETE; when in doubt, dial back; the proof elements get the LEAST gratuitous motion.
- **Simplify, NOT oversimplify** — plain words/short sentences for a 50-60yo contractor who knows nothing, but KEEP the substance + expert depth.
- **Readable-first / no walls** — paragraphs 1-3 sentences, bullets, break-blocks.
- **Clean + light UI, not bulky** — minimal affordances (he rejected heavy chips before; the Site Demos dropdown uses small monochrome window-dots; the dashboard browser-chrome uses slate dots, NO amber/green/red to keep accent discipline).
- **He confirms-understanding before big changes** — give a crisp confirmation + flag scope/contradictions BEFORE architecture-level edits (I confirmed the Lenis-only-vs-full-stack approach + the kingmakerseo.com launch before executing — both right calls).
- **He reviews on localhost, iterates fast, says "ship"/"deploy" when happy.** Blunt + warm ("this is fuckin' beautiful, go ahead" / "fucking delete that shit"). Values honesty rails, contractor-clarity, reversibility (archive/redirect, not hard-delete).
- **Comms (memory):** moderate emoji (~20% bump, ✅/❌/👍), AVOID exclamation points (emoji carries emphasis). Caveman bullets first.
- **No inline screenshots** (memory): capture to disk; vision via background agent returning text; Joseph eyeballs URLs.
- **Extrapolation rule:** feedback 2× → audit template-wide.
- ⚖️ **BUILD-STOP → OUTREACH (memory):** building nominally stops until a client. ⚠️ **This arc Joseph OVERRODE it** — he explicitly greenlit the firm-site polish as a sales-asset + directed the public launch. You're still the ENFORCER if he DRIFTS into unrequested building; you do NOT block work he's actively directing.

## 9. COORDINATION (blackboard)
- You operate as `website-engineer` (the firm-site channel). **Mailbox has 3 msgs** (re-read on arrival — Phase-0 undercounted at 2; corrected):
  1. `n8n-claude-architect-1` (2026-06-27, [task]) — the Meta poller was KILLED + hardened (renamed "DO NOT REACTIVATE"), webhook intake already exists (no rebuild), zero-polling confirmed template-wide, and the firm-site lead pipeline `/webhook/km-firm-lead` (prod `https://jspells.app.n8n.cloud/webhook/km-firm-lead`, workflow CJnIFNbSCbJmt996) is **live + correct**. 🔴 **UNHANDLED — testable before July-1? NO (quota 2500/2500). It's the July-1 end-to-end test loop (§3). LEAVE IT.**
  2. `vault-agent` (2026-06-27, [pricing-brief]) — the $497/mo model. ✅ **HANDLED — the /pricing page is built + LIVE.**
  3. `vault-agent` (2026-06-27, [visual-upgrade-brief]) — the Lenis/depth/GSAP visual upgrade WO (both sites). ✅ **HANDLED for the firm site — built, deployed, Joseph-approved. (The Summit & Oak half is still open — §3 "NEXT".)**
- ⚠️ **Ack is all-or-nothing** (`ackMailbox` archives the whole inbox). 2 of 3 are handled but #1 is the live July-1 loop → **do NOT blanket-ack** or you bury it. Leave all 3; this §9 records the status. Ack only once the July-1 test closes #1.
- `n8n-claude-architect-1` owns the lead funnel. `human` = Joseph (router / deploy gate / final eyeball). A status post for this session is on the bus (to human).
- The `a0fbc…` vision-QA background agent holds the firm-site visual standard — resume it via `SendMessage` for future captures.

## 10. KNOWLEDGE ARTIFACTS & FILE MAP (read-order; AUTHORITATIVE on conflict)
**Read first (lineage):**
1. **This handoff** + the predecessor `HANDOFF_website-engineer_firm-site_2026-06-27.md` (the buyer's-guide build detail).
2. `king-maker-site/KING_MAKER_TEMPLATE_MANIFEST.md` — the home template / motion + token reuse map (AUTHORITATIVE on design primitives). ⚠️ its "Live: kingmaker-firm.vercel.app" line is now STALE (it's kingmakerseo.com).
3. `KM_SITE_WORKORDER_10.md` — the /pricing tab spec. `BUYERS_GUIDE_PLAN.md` + `KM_SITE_WORKORDER_09.md` — the guide (⚠️ both say "31"; it's 32).
4. The visual-upgrade WO (delivered in-chat by vault-agent, 2026-06-29; vault note `km-visual-audit-2026-06-27` + `km-tools-github-shortlist`).

**Code map (king-maker-site/, all UNTRACKED/on-disk):**
- 🆕 `app/pricing/page.tsx` — the $497/mo pricing tab (sales-Roark; 3-5x value card + 12-page-type checklist + 3-tier comparison + off-page + ICP).
- 🆕 `components/SmoothScroll.tsx` — Lenis provider (reduced-motion-guarded, `ReactLenis root`). Wraps the app in `app/layout.tsx`.
- 🆕 `components/ScrollProgress.tsx` — GSAP ScrollTrigger progress bar (Lenis-wired via `useLenis`; lives INSIDE SmoothScroll in layout).
- `app/globals.css` — 🆕 the 3-layer `@theme` shadow tokens + inset highlight on `.km-card`/`.km-card-blue`.
- `components/home/Dashboard.tsx` — 🆕 browser-chrome frame (slate window-dots + faux address bar) + staggered lead rows (framer-motion). The PROOF — enhance never simplify.
- `components/home/PageSystem.tsx` — 🆕 the folded /system thesis ("Organic regional dominance is the engine…") + the §4 matrix-copy fix.
- `components/guide/GuideArticle.tsx` + `GuideSectionHeader.tsx` — 🆕 section-number chips (01/02…) at the renderer level (all 32 guides).
- `components/resource/KeyTakeaway.tsx` — 🆕 elevated callout card (3px blue-action top bar + `shadow-[var(--shadow-card)]`).
- `components/Header.tsx` — 🆕 "Site Demos" dropdown → Summit & Oak (replaced "The Work"). `components/Footer.tsx` — 🆕 cleaned (Work + System removed).
- `lib/site.config.ts` — 🆕 `SITE_URL = "https://www.kingmakerseo.com"` (the canonical source). `public/llms.txt` — 🆕 host flipped to www.kingmakerseo.com (⚠️ still has the stale 301'd guide slugs — separate cleanup).
- `next.config.ts` — 🆕 redirects: `/system`→/playbook (301), `/work`→Summit&Oak (301), + the carried guide 301s + trade 307s.
- `lib/buyers-guide.ts` (32-sub registry) · `lib/guide-content/*` (32 files; `what-a-website-should-cost.ts` = the $100/$10-15k edit) · `lib/content-blocks.ts` (Block union) · `lib/claims.ts` (data layer; ⚠️ no MatrixGrid DATA — that was already clean; the chart component is `components/charts/MatrixGrid.tsx`).
- `lib/playbook.ts` + `lib/playbook-content/*` — the 10-chapter playbook (⚠️ STILL has matrix language + renders `chart:"matrix"` — §3 pending).
- 🔴 `components/motion.tsx` — DO NOT edit primitives.
- `app/work/page.tsx` — KEPT but redirect-shadowed (301→Summit&Oak). `components/charts/EnterprisePageAnatomy.tsx` — DEAD (renders nowhere).
- Session scratchpad capture scripts: `…/scratchpad/capture-*.cjs` (Playwright; require @playwright/test by absolute path).

---
*Written 2026-06-30. Compounds the 2026-06-27 handoff (§4/§5/§8 carried verbatim + attributed; the HOME-DO-NOT-TOUCH lock STRUCK-with-date) + this arc: the /pricing tab · /system + /work retirements · footer cleanup · the maximalist visual upgrade · and the PUBLIC LAUNCH to kingmakerseo.com. The site is fully LIVE on the public brand domain. Re-verify volatile state (§2) — esp. the public-domain alias (it does NOT auto-update) — before acting.*
