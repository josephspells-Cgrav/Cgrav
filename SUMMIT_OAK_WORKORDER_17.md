# WORK ORDER 17 — Summit & Oak (ON-PAGE FINAL PASS + productization — the launch-ready bundle)

**From:** WE13 (architect) · **To:** Builder (**WARM** — the same agent that produced the WO_16 audit + playbook; you hold the codebase + `SUMMIT_OAK_ENTERPRISE_AUDIT.md` + `KM_ORGANIC_DOMINANCE_PLAYBOOK.md` in context — minimal reread) · **Date:** 2026-06-24
**Compounds on:** WO_01–16 + the WO_16 deliverables — ALL locks carry (the 9.5/9.5 machine, WO_12 dual-intent, persistent hero, the `/locations/[city]-nc` route scheme, security 10/10, NC compliance, the organic-dominance spine). **This is the FINAL on-page pass on the enterprise REFERENCE site** — after this, Summit & Oak is the productized, launch-ready template; the next step is a real client (clone + per-client config + the off-page launch kit).
**Site:** `summit-oak-roofing/` (Next.js 16 SSG, git-tracked, `main @ d4a4b10`), live `kingmaker-summit-oak-roofing.vercel.app`. Gate suite from the repo (server on `:3210`).

> **Grounding (you wrote these):** `SUMMIT_OAK_ENTERPRISE_AUDIT.md` gap ledger + `KM_ORGANIC_DOMINANCE_PLAYBOOK.md` **Part C (C.1/C.3)**. Part C's own words: *"Summit & Oak already ships ~90% of the buildable layer; productization = config-driving the existing components."* This WO is that remaining **~10%** — NOT a rebuild.

## §1 THE PRINCIPLE (the lens) — **PRODUCTIZE THE PROVEN. Capture the last slice, lock it to config, don't overclaim.**
The site is enterprise-grade because the levers are already BUILT. So this pass is surgical:
1. **Capture the last measured slice** — the one measured-causal organic lever (the nearby-city mesh) where any remaining density gap is real uplift.
2. **Productize the per-client launch levers** — make the entity layer + the review-QR flow config-driven off `business.ts`, so a future client launch is one-click (populate config → auto-locks).
3. **Close the 2 real gaps** — `/projects` depth + the doorway-gate blind spot.
**Hard rails:** refinement + productization, **NOT a teardown or a feature-pile**; do NOT regress the 9.5/9.5; do NOT overclaim (schema = eligibility/AI-citation, **NOT a ranking boost** — Mueller); do NOT populate the demo's `sameAs` (fake URLs read worse than absent — it stays empty until a real client). **First AUDIT what already exists before building — do not rebuild what's shipped.**

## §2 BUILD-1 — Nearby-city cross-link mesh DENSITY PASS *(lever #1 — the credible measured lever)*
- **EXISTS (do not rebuild):** the internal-equity cascade — `CrossLinks`, `lib/related.ts`, the footer surface-map, the city silos. The audit graded it **"strong."**
- **TO-DO:** (a) **Audit** whether each `/locations/[city]-nc` (and its combos/service pages) links to its **N nearest geographic neighbor cities** specifically — the SearchPilot *nearby-location* pattern, not just generic hub/related links. (b) **Densify if sparse:** add a "nearby areas we serve" cross-link block to each location page linking its ~6 nearest neighbors. (c) **Config-drive it:** compute "nearest N" from the geo coords in `lib/cities.ts` so it auto-generates per client — no hand-wiring.
- **Honest framing:** **+5–25% organic** (SearchPilot split-tests) / **+7%** (the nearby-location-links test across ~8,000 pages) — the most credible measured lever, BUT the general mesh is largely shipped, so this captures the *nearby-city slice* + makes it repeatable. It is NOT a +25% you're missing.
- **Verify:** nearby-city links render on every location page; the "nearest N" computation is **geographically correct** (real nearest, not random); **reachability still 0 orphans**; **doorway-check still PASSES** (the new cross-links must not create cannibalization or thin "city-A-near-city-B" pages — it's cross-LINKS only, NO new pages).

## §3 BUILD-2 — Config-drive the schema `sameAs` / geo entity layer *(lever #3)*
- **EXISTS (do not rebuild):** `organizationNode()` **already** conditionally emits `sameAs` (`...(BUSINESS.sameAs.length ? {sameAs} : {})`); the `@graph` is rich + parses clean (GeoCoordinates, `areaServed`, etc.).
- **TO-DO:** (a) Ensure the **whole entity layer** (`sameAs` + geo + `areaServed`) flows from `business.ts` so a launch = populate config → the entity auto-locks (mostly there — make it fully config-driven + leave a documented launch-seam comment). (b) **ADD `spatialCoverage` + `audience`** to the LocalBusiness/location/service schema **if absent** — the exact properties from the measured study; they drive location-query visibility. (c) **Keep the demo `sameAs` EMPTY** — do NOT populate fake URLs.
- **Honest framing:** schema is **eligibility / AI-citation surface, NOT a direct rank boost** (Mueller). The **+46% impressions / +42% clicks** is **one small vendor study (11/4 pages) measuring VISIBILITY on location queries — not rank, not leads** — and it **activates per-client** when real `sameAs` is populated. Do NOT surface that number as a lead claim anywhere in copy.
- **Verify:** `@graph` still parses clean on every page type; `spatialCoverage`/`audience` present + valid; **run a live Google Rich Results / Schema.org validation pass** (fold in the audit's Gap 5 — worth doing now that we're touching schema); the demo `sameAs` stays empty; the `aggregateRating` honesty (company's own, not unattributed) + FAQ-for-AI-only stay intact.

## §4 BUILD-3 — QR-asset generator *(review-machine productization — the one review-adjacent item)*
- **EXISTS (do not rebuild):** `/review` (noindex funnel), `ReviewButton` (one-tap → `BUSINESS.googleReviewUrl`), `GoogleReviewsWidget`, `aggregateRating` — all built.
- **TO-DO:** a small build step (e.g. `scripts/qr-asset.mjs`, pure-JS `qrcode` lib) that renders a **QR PNG → `/review`** (or directly `BUSINESS.googleReviewUrl`), **config-driven off `business.ts`**, output to a launch-assets dir — for trucks/invoices/door-hangers (the C.2 review-mandate SOP's physical artifact).
- **Verify:** the generator emits a valid, scannable QR pointing to the right URL; reads `business.ts` (config-driven). *(If you'd rather defer this one as the only non-strictly-on-page item, flag it — it's small and in C.3's recommended bundle, so default is INCLUDE.)*

## §5 BUILD-4 — Deepen `/projects` *(the one real content gap — audit Gap 7)*
- **EXISTS:** the `/projects` page + the `Project`/job-pin schema. It reads **thin** (2,720 chars rendered vs ~9,866 on `/resources`) — the lightest money-adjacent page.
- **TO-DO:** deepen with **more documented DEMO jobs** — each with **neighborhood/area + before→after + system installed + a short real-job narrative**. Bring depth toward the `/resources` bar. Feeds the local-proof entity + the anti-doorway "real jobs, not keywords" thesis. Keep the **demo convention** (plausible demo jobs; do NOT fabricate real-person claims beyond the existing demo set).
- **Verify:** rendered depth materially up (target ~the `/resources` ballpark); `Project` schema still valid; axe **0/0** desktop+mobile; render clean; reachability holds; **proven copy voice preserved** (ADD jobs in the existing voice — do not rewrite existing copy).

## §6 BUILD-5 — Extend the doorway gate *(the one real tooling gap — audit Gap 1)*
- **EXISTS:** `scripts/doorway-check.mjs` + `lib/doorway-gate.ts`. The `docs` comparison set has articles/glossary/blog/money-pages/14 cities/4 combos — but **NO `/services/[slug]` parents**, so a combo is never compared to its parent (the blind spot).
- **TO-DO:** extend the gate's pairwise set to **include the `/services/[slug]` parent pages**, so each service×city combo is compared against its parent head query. Current combos are clean (**8.5–11.8%** similarity) — so this is **prevention / CI hardening**; it must PASS on current content and guard future drift.
- **Verify:** the extended `doorway-check` runs + **PASSES** on all 141 URLs (combos vs parents below the 40% threshold); the gate is wired into the suite.

## §7 ⛔ NOT IN SCOPE (do NOT build these — guard against over-building)
- **Per-client launch DATA** — populating `BUSINESS.sameAs[]` with real URLs + swapping the `googleReviewUrl` PLACE_ID. These are **launch-time, per real client** — NOT this WO. The demo's `sameAs` **stays empty.**
- **Off-page operational** — the GBP/citation-kit generators (C.1#4) + the manufacturer-credential SOP (GAF/OC, C.3#3). Deferred (off-page; a later WO).
- **Diminishing-return (audit says LOG, don't chase):** combo title sharpening (Gap 3) · sitemap `lastModified` (Gap 4) · Lighthouse/CrUX field pull (Gap 6) · `/es` full localization (Gap 8). Do NOT build. *(The Rich Results validation, Gap 5, IS folded into §3 since we're touching schema.)*

## §8 PRESERVE (do NOT touch / regress)
The **9.5/9.5 conversion + on-page machine** · the **WO_12 dual-intent fork** · the **JSON-LD spine + `@graph`** (incl. the `aggregateRating` honesty + FAQ-for-AI-only) · the **141-URL nav + 0-orphan reachability** · the **14 cities + the doorway gate** (now extended) · the **persistent hero + the WO_14 creative** · **proven copy** (flag any change with before/after) · **static generation** · **NC insurance compliance** · the **`/locations/[city]-nc` route scheme + `middleware.ts` 301s** · **NEVER PBN links** · **security 10/10 + the CSS-owned layers — DO NOT clobber:** `app/api/lead`, `lib/leadSchema.ts`, `lib/server/*`, `next.config.ts`, `instrumentation-client.ts`, `scripts/security-audit.mjs` · **the demo's intentionally-EMPTY `sameAs`.**

## §9 VERIFICATION GATES (all green before deploy — run from `summit-oak-roofing/`, server on `:3210`, free the port first)
- `npm run typecheck` + `npm run build` (0/0) · `npm run security-audit` → **10/10** (`git checkout -- security-receipt.json` after) · `npm run doorway-check` **(extended)** PASS · `npm run reachability-check` → **0 orphans** · `npx playwright test --project=desktop --project=mobile` (axe **0 critical/serious**).
- **Per-build verifies:** §2 nearest-N correctness + links render + no new cannibalization · §3 `@graph` parses + spatialCoverage/audience valid + **live Rich Results pass** + demo `sameAs` empty · §4 QR scannable + config-driven · §5 `/projects` depth up + `Project` schema valid + axe 0/0 · §6 extended doorway-check PASSES on 141 URLs.
- **Verify the DEPLOYED render** (not DOM/200): fetch live HTML, grep a unique marker of each change, render for pixels, 0 console errors, a background vision pass on the touched pages.

## §10 OUTPUT + REPORT
Deploy to `kingmaker-summit-oak-roofing.vercel.app`. **Report to `website-engineer` on the blackboard** (`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from <you> --to website-engineer --type done --body "..."`) with: per-build evidence (what existed vs what you built/densified), the gate results, the live URL, and which audit gap-ledger rows are now closed (1, 7) + which levers are productized (1, 3 + the review QR). Report in the **fix-reporting format** (hyperlink + Was/Fix per surface).

## §11 OPERATING
The **organic-dominance spine + launch-repeatability** govern — judge each change by "does it maximize organic regional dominance AND make a client launch one-click." **Refinement + productization, NOT teardown or feature-pile.** AUDIT-before-build (don't rebuild the ~90% that ships). **Honest — never overclaim** (schema = eligibility; the numbers are the value the build already delivers; the +46/+42 is one vendor visibility study). The demo `sameAs` stays empty. Fully autonomous — best judgment, no mid-run questions. **Joseph's eyeball is the final gate.** This is the LAST on-page pass before a real client.

---
*Source: WE13 ultrathink synthesis via launch-builder, 2026-06-24. WARM builder (the WO_16 audit/playbook author). The ~10% productization + last-slice bundle that makes Summit & Oak the launch-ready reference. Grounds: SUMMIT_OAK_ENTERPRISE_AUDIT.md + KM_ORGANIC_DOMINANCE_PLAYBOOK.md Part C. Compounds on WO_01–16. — WE13.*
