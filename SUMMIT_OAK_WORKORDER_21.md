# SUMMIT & OAK — WORK ORDER 21

*Content-depth expansion (the "12/10" organic lever) + the WO_20 QA punch-list. Architect: WE14 · 2026-06-25 · Builder: **WARM + ULTRACODE** (continues `summit-oak-roofing/` — you hold the codebase; reread ONLY this WO). Lineage: WO_16 → 17 → 18 → 19 → 20 → **21**.*

> On-page/technical (WO_18 AI-legibility), performance (WO_19 LCP/hygiene), and aesthetics (WO_20 balance) are now maxed at the ~9.5 ceiling. The only remaining lever for MORE organic ranking power is **content surface + depth** — more query coverage, deeper E-E-A-T, featured-snippet/AEO capture. WO_21 pushes past the ceiling AND closes the WO_20 QA residuals. **Source of the QA items = WE14's independent post-WO_20 re-audit (3 vision agents + a live crawl re-verify), 2026-06-25.**

---

## 0. WHAT THIS IS
A warm-ultracode pass on the live reference build: **Phase 0** = the QA punch-list (fast, mechanical — do first); **Phase 1** = the content-depth expansion (the lever, parallelized like the WO_15 parallel-writer model). Refinement + additive depth, NOT a teardown. The 9.5/9.5, the motion, the schema, the security layer, all 147 existing URLs stay intact (§5).

## 1. THE PRINCIPLE / LENS — "EARN THE DEPTH"
Every new page or section is **real substance** — a real service detail, a real documented job, a real comparison a buyer needs. Page count is an OUTPUT of substance, never the goal. Anti-doorway is a BLOCKING gate (real-job→page; the delete-the-city-name test ≥4 non-city signals; the `doorway-check` must stay green). Depth that's thin or templated is worse than no page — it dilutes the authority the prior 20 WOs built. The "12/10" is reached by being genuinely **more relevant to the searcher** (the relevancy frame), not by spawning filler.

---

## 2. ⭐ PHASE 0 — THE WO_20 QA PUNCH-LIST (fold-in corrections — do FIRST, they're fast)

**A1 · MUST-FIX — storm-hub FAQ red bar → ghost.** [/storm-damage](https://kingmaker-summit-oak-roofing.vercel.app/storm-damage): the WO_20 accent demote shipped on service-detail + cost but was MISSED on the storm hub — its "Storm Damage Questions" FAQ band still renders a solid bright-red "Get a Free Estimate" bar (left rail, ~62% down) = 3 red anchors on one page. **Fix:** demote it to the same ghost/outline treatment service-detail uses (red reserved for the hero call-CTA + the final CTA only). Extrapolate: grep every FAQ-band CTA site-wide and confirm none other still renders solid-red (`feedback_accent_color_discipline`).

**A2 · MUST-FIX — metal-roofing duplicate-title cannibalization.** WO_19's title-trim collided two distinct pages: [`/services/metal-roofing`](https://kingmaker-summit-oak-roofing.vercel.app/services/metal-roofing) AND [`/materials/metal-roofing`](https://kingmaker-summit-oak-roofing.vercel.app/materials/metal-roofing) now both render "Metal Roofing in Raleigh, NC | Summit & Oak". **Fix (differentiate by intent, like the WO_19 storm pair — keep both):** the SERVICE page = the install (e.g. title "Metal Roof Installation in Raleigh, NC | Summit & Oak", H1 + intro = installation/estimate intent); the MATERIAL page = the material (e.g. "Metal Roofing Materials & Cost in NC | Summit & Oak", H1 + intro = types/cost/comparison intent). Diverge title + H1 + opening intent; the nav-label disambiguation from F.3 stays. **Acceptance:** 0 duplicate titles site-wide (re-run `.so-seo-verify.cjs`).

**A3 · resource-article figure cadence — finish it.** [/resources/what-drives-roof-replacement-cost](https://kingmaker-summit-oak-roofing.vercel.app/resources/what-drives-roof-replacement-cost): WO_20's rail landed but the article body is under-figured (a data table is its only in-body break; no photo/diagram/pull-quote). **Fix:** add ≥1 in-body figure (a labeled diagram or a pull-quote) to the article-template body so it matches the blog's cadence (a visual every ~2 sections). This is a template fix → all 34 articles benefit.

**A4 · glossary-term figure — the one outright-missed WO_20 item.** [/resources/glossary/flashing](https://kingmaker-summit-oak-roofing.vercel.app/resources/glossary/flashing): the de-box landed, but the promised term photo/diagram was NOT delivered — the definition is still a bare text column. **Fix:** add the one labeled term photo/diagram beside the definition (template → all 20 glossary terms). Reduces the thin-image feel + gives the definition a counterweight.

**A5 · metal-roofing "Standing Seam vs Exposed-Fastener" → a real comparison.** [/materials/metal-roofing](https://kingmaker-summit-oak-roofing.vercel.app/materials/metal-roofing): the band's right side is a text-list + one closing prose graf, not a true table/figure. **Fix:** convert it to a real 2-col `ComparisonTable` (standing-seam vs exposed-fastener: cost, lifespan, look, leak-risk, best-for). Doubles as a snippet-capture asset (ties to B3).

*(A6 — the /about monogram-tile → real-headshot swap rolls into C2, the photo workstream.)*

---

## 3. PHASE 1 — THE CONTENT-DEPTH EXPANSION (the "12/10" lever)

**B1 · Service-page intent-depth modules.** The pages are clean but template-symmetric (the original audit's call). Add unique technical substance per service (real, NC-Triangle-specific, NC-insurance-compliant):
- **Emergency repair:** tarping workflow · active-leak triage · after-hours response expectations · interior water-intrusion documentation · same-day-stabilize vs scheduled.
- **Roof replacement:** tear-off vs overlay · decking inspection · ventilation checks · underlayment choices · warranty logic · material lifespan.
- **Storm damage:** hail bruising vs blistering · wind-lift signs · granule-loss evaluation · insurance documentation · adjuster-walkthrough prep.
- **Gutters:** fascia rot · pitch/drainage · downspout placement · guard types · foundation water control.
- **Commercial:** membrane types · drainage/ponding · maintenance contracts · tenant-disruption planning · repair vs recover vs replace.
Build as a reusable `ServiceDepth` module (don't hand-inline per page). Keep the dual-intent fork + conversion guts intact.

**B2 · Project pages → full case studies.** The 15 project pages avg ~618w — proof assets, not yet maximal organic assets. Deepen each to a real case-study structure: city/neighborhood context · roof age + failure mode · inspection findings · material system used · timeline · crew/weather constraints · before/after notes · warranty note · related service + city + material links. Reinforces local + service + material relevance + conversion at once. (Keep them passing the trust-doorway delete-the-city-name ≥4-signal gate.)

**B3 · Snippet / comparison tables (featured-snippet + AEO capture).** Add concise, sourced comparison/decision assets (each = a `DataTable`/`ComparisonTable` + an answer-first lead-in + Speakable): roof-replacement cost by material · repair-vs-replacement decision matrix · hail vs wind damage signs · asphalt vs metal vs cedar vs synthetic-slate · roof lifespan by material · insurance-claim documentation checklist · emergency-leak checklist · Triangle storm-season checklist · permitting/HOA by city/county. Place on the relevant money/resource pages; cross-link.

**B4 · Selective UNIQUE service-city pages (anti-doorway GATED).** Expand the service×city matrix ONLY where each page can be genuinely unique (distinct local intent + roof/weather/housing-stock context + distinct FAQs + a real local project + non-swapped body). Good candidates: emergency-roof-repair-in-Raleigh · storm-damage-roof-repair-in-{metro} · roof-replacement-in-Cary · roof-repair-in-Durham · metal-roofing-in-Apex (if demand supports). **Every new combo MUST pass `doorway-check` vs its parent + the delete-the-city-name test.** Do NOT mass-spin; quality-gate each.

**B5 · Spanish content expansion.** Beyond the 6 `/es` pages — expand the most commercially important pages first (the money services + storm/insurance). Keep hreflang reciprocal + absolute (WO_19); don't send Spanish searchers into English-only conversion paths. Native translation, not machine-swapped.

**C1 · Speakable on the money pages (the carried-open AEO add).** WO_18 shipped Speakable on `/roofing-cost` + the 34 `/resources` articles, but storm / locations / services / home still lack the answer-first block. Add a short answer-first snippet (`.seo-answer` + `SpeakableSpecification`) to the storm hub + the city pages + the core service pages. Honest = AEO/voice eligibility, NOT a rank boost.

**C2 · Bespoke imagery (real photos).** (a) Per-town documented-job photos for the 14 `/locations/*` (WO_18 added 1 generic each; the bespoke per-town set is still pending — soul_2 + vision-QA + swap `heroImage.src`); (b) the `/about` team/founder monogram tiles → real headshots (or keep the monograms as a deliberate demo placeholder — flag the call). All new imagery follows the WO_19 image discipline (lazy + compressed <150KB + aspect-reserved + immutable cache) so it doesn't undo the LCP win.

---

## 4. ANTI-DOORWAY + AI-LEGIBILITY DISCIPLINE (every new page/section passes these)
- 🚧 **Anti-doorway gate (BLOCKING):** every new combo/city/case-study page passes `doorway-check` vs its parent + the delete-the-city-name test (≥4 non-city signals — numbers, brand/code proper nouns). No mass-spin.
- 🔤 **AI-legibility (the law):** all new headings use the word-level `TypeIn` (never per-letter); the `heading-legibility` spec stays 18/18 (extend it to new page types). Every new table/figure ships crawlable text.
- 📋 **Every new claim flagged + sourced** (NC-insurance-compliant; no $0-deductible/public-adjuster/guarantee-outcome; no PBN; demo `sameAs` stays empty).

## 5. PRESERVE-LIST (do NOT regress)
🔒 The **9.5/9.5** conversion + on-page SEO · the **WO_19 LCP win** (new imagery follows its discipline) · **word-level headings + the heading gate** · the **persistent hero + dual-intent fork** + flipped sticky bars · the **WO_20 aesthetic standard** (every band earns its counterweight — new sections obey it) · the **@graph/schema** · the **WO_17 geo-mesh + spatialCoverage** · the **CSS/security layer** (10/10 — don't clobber) · **all 147 existing URLs stay 200 / 0 orphans / ≤2 clicks** (new pages register in the sitemap + the nav — built≠reachable) · the contractor-RED palette + Newsreader/Plus Jakarta type · NC-insurance compliance.

## 6. VERIFICATION GATES (all green before "done")
From `summit-oak-roofing/` (server `:3210`): `tsc` 0 · `next build` all routes SSG · Playwright desktop+mobile **axe 0 serious** · **heading-legibility** spec green (incl. new page types) · **doorway-check** PASS (all new pages vs parents + delete-city) · **reachability-check** all URLs ≤2 hops, **0 orphans** (new pages linked into nav + sitemap) · `security-audit` 10/10 (revert receipt) · **re-run `.so-seo-verify.cjs` + `.so-seo-verify2.cjs`** → 0 dup titles (metal pair differentiated), accent clean · **CWV** not regressed (new imagery lazy/compressed) · pixels vision pass (the WO_20 balance standard held; the storm FAQ bar is ghost) · deployed-render check.

## 7. CADENCE + DEPLOY
**Phase 0** (the QA punch-list) → **Phase 1 content SAMPLE** (one deepened service page + one full case study + 2 snippet tables + one unique service-city page) → **🛑 CHECKPOINT: deploy + report for Joseph's eyeball** (the depth quality + the anti-doorway hold, before the full content fan-out) → **Phase 1 fan-out** (the rest, parallelized) → verify → deploy → report.
```bash
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"
npm run build && npx --yes vercel@latest deploy --prod --yes
git checkout -- security-receipt.json
# THEN verify the deployed render + re-run the crawl + aesthetic + gate stack.
```

## 8. CARRIED LOCKED DECISIONS (do not relitigate)
SO = standalone Next.js 16 SSG, `main` = source of truth + live = deployed state · 9.5/9.5 · NEVER PBN · the Fulcrum/Balance Principle + Accent-Color Discipline · word-level AI-legible headings · dual-intent forking · route scheme `/locations/[city]-nc/` · the $10K authority-build architecture (page count = OUTPUT of real jobs; anti-doorway = a blocking gate) · the site WINS the map pack when all else is equal (never "only 19%", never pivot a site-question to off-page) · NC-insurance-compliant. Verify PIXELS + deployed CONTENT + NAVIGABILITY, not DOM/200. Joseph's eyeball is the final gate (overrides a vision SHIP).

## 9. CHECKPOINT QA ADDENDUM (WE14 reviewer, 2026-06-26 — fold into the fan-out)
The Phase-0 + Phase-1-sample checkpoint passed an independent adversarial QA (3 agents — vision/balance · NC-compliance + factual-accuracy · anti-doorway — plus WE14 deterministic gates). **Verdict: SHIP** — A1–A5 + B1–B4 verified against pixels + live content; both highest-risk items held (the hand-coded glossary diagram is clean/un-clipped; the north-hills insurance case study is textbook-compliant); the Cary combo passes delete-the-city-name decisively (10 local signals, ~0% body-prose overlap with parent/Raleigh, a real anchored Preston job). **5 minor nits to fold into the fan-out (none blocked the checkpoint):**
1. `/services/roof-replacement` §03 ventilation: "40 to 50 percent" at the ridge → R806's actual figure is **"50 to 80 percent"** in the upper portion (2018 NCRC R806.2). Make code-exact — AND audit every cited code/standard number in the fan-out for literal accuracy.
2. `/locations/cary-nc/roof-replacement`: "**Prestonwood** covenant" → "**Preston** covenant" (the HOA is Preston; Prestonwood is the golf club inside it).
3. Cary page: the HOA-architectural-committee value-prop paragraph repeats ~3× → trim to 1–2× (no-restate / balance).
4. Cary page reuses the site-wide Dana R. "North Hills, Raleigh" testimonial → swap for a Cary/Apex-area review where one exists (or keep as chrome + flag).
5. The B1 ServiceDepth band is the densest text region on the site (legal via the 2-col split + bullets, but at the edge of the no-wall-of-text tolerance) → do NOT stack another dense band directly below it; keep the density budget.
**Fan-out discipline (carried):** every new city/combo/case-study clears the SAME bar the Cary page did — ≥4 non-city-swappable local signals + a real anchored job + the delete-the-city-name test + ~0% body-prose overlap with parent/sibling; cited code/standard numbers audited for literal accuracy; NC-insurance copy in the safe formulation; every new page registers in nav + sitemap (no orphans). After the fan-out + Joseph's approval: MERGE `wo21-content-depth` → `main` (currently live = branch, main = WO_20).

---
*— WE14, 2026-06-25. WO_21: earn the depth. Phase 0 = the WO_20 QA punch-list (storm FAQ ghost + metal-title differentiate = must-fix; article/glossary figures + the standing-seam table). Phase 1 = the 12/10 content lever (service intent-depth · case studies · snippet tables · gated unique service-city pages · Spanish · Speakable-money-pages · bespoke photos). Warm + ultracode; reread this WO only; Phase 0 → content sample → 🛑 Joseph checkpoint → fan-out. PRESERVE §5, anti-doorway BLOCKING, run §6 gates, deploy, report in fix-format.*
