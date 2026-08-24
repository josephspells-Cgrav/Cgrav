# SUMMIT & OAK — WORK ORDER 19

*Organic-SEO hygiene + homepage-LCP fix. Architect: WE14 · 2026-06-25 · Builder: **WARM** (the live SO session — you hold the manifesto/dossier/codebase; reread ONLY this WO). Lineage: WO_16 → 17 → 18 → **19**. Compounds the corpus — carry the WO_16–18 locks forward.*

> **Source:** a Codex senior-SEO audit, independently re-verified by WE14 against live HTML (147-URL crawl + targeted probes). Every item below is **ground-truth confirmed**, not asserted. Severity is calibrated to actual live exposure.

---

## 0. WHAT THIS IS

A focused **refinement punch-list** on the live reference build — one real performance drag (P0) + a title/hreflang/meta hygiene cluster. Nearly all are **one-template fixes**. NOT a teardown, NOT a redesign. The 9.5/9.5 + the motion + the schema + the WO_16–18 work all stay intact (see §4 preserve-list).

## 1. THE PRINCIPLE / LENS — "PASS OUR OWN AUDIT"

Summit & Oak is the **live reference build** every client clones and the proof we point at in the pitch ("see the live build, audit it yourself, ask any AI"). Therefore **every gap we measure against GHL, our flagship must be flawless on — live.** We ding GHL 100% on hreflang and call out CWV; our own hreflang is currently invalid and our homepage LCP is failing. That's a self-refuting demo. Fix to the **measured ground truth**, verify against the **deployed render** (not DOM/200). Own the standard.

## 2. THE FIXES (ranked — evidence · fix · acceptance)

### ⭐ FIX 1 — P0: Homepage LCP (the only finding with real ranking weight)
**Confirmed (live):** the homepage fires **6 `<link rel="preload">`** for below-fold before/after gallery webps — **~2.1MB total** (`ba-3-before.webp` 639KB · `ba-1-before` 497KB · `ba-2-after` 417KB · `ba-2-before` 246KB · `ba-3-after` 168KB · `ba-1-after` 143KB). **Zero `loading="lazy"`** on the homepage. Served `Cache-Control: public, max-age=0, must-revalidate` (re-downloaded every visit). 0 `<video>` in the static HTML — so the LCP culprit is **these preloaded webps**, not hero video. Audit's Lighthouse: perf 59, **LCP 8.8s** (one lab run — re-validate, but the mechanism is conclusive).

**Fix:**
- **Remove the 6 gallery `<link rel="preload">`.** Preload ONLY the true above-the-fold LCP asset (hero), with `fetchpriority="high"` on it alone.
- **`loading="lazy"` + `decoding="async"`** on the below-fold before/after gallery images; **reserve aspect ratio** so CLS stays ~0.003 (don't trade LCP for CLS).
- **Compress/resize** the gallery webps to the rendered dimensions, target **<150KB each** (639KB→<150KB). Use `next/image` if not already, with correct responsive `sizes`.
- **Immutable cache** for static media: `Cache-Control: public, max-age=31536000, immutable` (content-hash the `/gallery/*` filenames, or set it via `vercel.json` headers / `next/image` so it isn't `max-age=0`).
- Do not pull desktop-weight media on mobile.

**Acceptance:** throttled Lighthouse **mobile** home → perf **>90**, **LCP <2.5s**, CLS <0.1; only 1 preload (the LCP asset); gallery webps <150KB + `immutable` cache. Re-run desktop too.

### FIX 2 — P1: Title hygiene
**2a · Doubled brand suffix (14 pages).** Confirmed: these render `… | Summit & Oak | Summit & Oak` — the root layout appends the brand once and the page-level template appends it again. Affected: `/resources/{roof-replacement-guide, roof-replacement-timeline, tear-off-vs-roof-over, roof-replacement-permits-nc, roofing-materials-guide, storm-damage-insurance-guide, algae-and-moss-on-nc-roofs, best-time-to-replace-a-roof-in-nc}` + **all 6** `/blog/*`. **Fix:** remove the page-level suffix on the guide + blog title generators — single source of truth = the root metadata. **Acceptance:** 0 of 147 titles contain `Summit & Oak` twice.

**2b · Storm cannibalization (architecture, not just a string).** Confirmed: `/storm-damage` and `/services/storm-damage-roof-repair` share the **identical** title "Storm Damage Roof Repair Raleigh NC | Summit & Oak", both **self-canonical**, both substantial (1,223w / 1,308w) → two pages competing for one query. **Fix (default — DIFFERENTIATE, keep both):**
- `/storm-damage` = the **storm/hail/wind/insurance HUB** (broad vertical). Title e.g. *"Storm Damage Roofing Raleigh NC | Hail, Wind & Insurance Claims"*; H1 + intro reframed to the hub intent; links down to the repair service + insurance-claims pages.
- `/services/storm-damage-roof-repair` = the **transactional repair SERVICE**. Title e.g. *"Storm Damage Roof Repair Raleigh NC | Hail & Wind Repairs"*; H1 + intro reframed to the service/estimate intent.
- Diverge title **and** H1 **and** opening intent; cross-link hub↔service. (Do NOT canonical one to the other — both stay indexable money pages.)
**Acceptance:** distinct titles + distinct H1s + distinct primary intent; no remaining exact-title dup anywhere.

**2c · Titles >60 chars (47 of 147 — SERP truncation).** Trim to <~60 chars where truncation clips the modifier; prioritize money pages (`/financing` 70, `/materials` 70, `/commercial-roofing` 67, the material pages 61–68). Keep keyword-first. **Acceptance:** money-page titles ≤60; site-wide >60 count materially reduced.

### FIX 3 — P2: Hreflang rebuild (currently non-functional)
**Confirmed (live):** hreflang exists **only in the sitemap, only on the 6 `/es` `<url>` entries**, with **relative** hrefs (`href="/"`, `href="/es"`). The **EN pages carry zero hreflang** — no sitemap alts, no HTML `<link rel="alternate">`, no `Link:` header. → **non-reciprocal + relative = invalid; Google ignores the cluster.** (Bigger than the audit's "relative hrefs" catch.)

**Fix:** emit **reciprocal, absolute, self+alt+x-default** hreflang for all 6 bilingual pairs (12 pages) — on BOTH the EN and ES sides. Pick ONE method and apply consistently (sitemap `xhtml:link` on every bilingual `<url>`, or HTML `<link rel="alternate" hreflang>` in each head). `x-default` → the EN URL. All hrefs fully-qualified (`https://…`).
**Acceptance:** every bilingual page declares absolute en/es/x-default; the re-probe shows EN entries carry alts + 0 relative hrefs; a hreflang validator passes. (Own-the-standard: we measure GHL 100% missing hreflang — ours must be valid.)

### FIX 4 — P2: Meta-description truncation (~35 pages)
**Confirmed (live):** 15 project pages + ~20 glossary terms have descriptions mechanically cut at **154–155 chars mid-word** (e.g. project: "…We brought 6 shin"; glossary: "…or a 10 foot by 10 foot area. Mate"). A `truncate(155)` of body text. **Fix:** generate **complete-sentence** descriptions (≤~155 chars, ending on a full word + terminal punctuation — sentence-boundary truncation, or hand-tuned for the 15 projects). Projects + glossary at minimum. **Acceptance:** 0 mid-word truncation suspects; descriptions read as complete summaries. *(Honest weight: descriptions aren't a ranking factor and Google rewrites many — this is SERP polish, not a ranking lever. Cheap, so do it.)*

### FIX 5 — P3: Bare-city → 301
**Confirmed (live):** `/locations/{raleigh,cary,durham,apex,garner,wake-forest}` return **200** (dup of `-nc`), but each **canonicals to `-nc`**, is **absent from the sitemap**, and has **0 internal links** (everything links to `-nc`). Low exposure — but a 301 is cleaner and trivial. **Fix:** 301 (middleware/redirect) every bare city slug → `-nc`. **Acceptance:** `/locations/raleigh` → 301 → `/locations/raleigh-nc`; `-nc` still 200; nothing else regresses.

## 3. OUT OF SCOPE — deferred to WO_21 (the "12/10" content lever)
Do NOT do these in WO_19 (keeps this pass tight + cleanly verifiable): service-page intent-depth modules · project pages → full case studies · snippet/comparison tables · selective **unique** service-city pages · Spanish content expansion. These are content/judgment work — a separate work order on Joseph's go. *(Note: WO_20 = the aesthetic/balance pass; the content expansion is renumbered WO_21.)*

## 4. PRESERVE-LIST (do NOT regress)
- 🔒 The **9.5/9.5** conversion + on-page SEO scores; the contractor-RED palette + Newsreader/Plus Jakarta type.
- 🔒 **Word-level heading reveals + the `heading-legibility` gate (WO_18)** — do NOT regress to per-letter `inline-block`. Any LCP/preload change must keep headings AI-legible (18/18).
- 🔒 The **persistent hero-video layer + per-page hero tiers + trust bar** (WE12); the **dual-intent fork** (urgent call-first / retail quiz-first) + flipped sticky bars.
- 🔒 **Speakable + answer-first blocks** (WO_18); the **WO_17** geo-mesh (nearby cities), `spatialCoverage`/audience schema, doorway gate, `/projects` depth.
- 🔒 The full **@graph / JSON-LD** (don't break parsing); canonicals stay **absolute + self-referential**; the **empty `sameAs`** on the demo (intentional).
- 🔒 The **CSS/security layer** (security-audit 10/10; `scripts/security-audit.mjs`, `app/api/*`, `lib/server/*`, `next.config.ts`, `instrumentation-client.ts`) — cyber-security-specialist-1 owns it; don't clobber.
- 🔒 **All 147 URLs stay 200 + reachable (0 orphans, ≤2 clicks).** NC insurance-compliance copy unchanged.

## 5. VERIFICATION GATES (all green before "done")
Run from `summit-oak-roofing/` (server `:3210`):
1. `tsc --noEmit` 0 · `next build` all routes.
2. Playwright `--project=desktop --project=mobile` — **axe 0 serious** · the **`heading-legibility` spec 18/18** · dual-intent fork + persistent hero preserved.
3. `doorway-check` PASS · `reachability-check` **147/147, 0 orphans** (run against a LOCAL dev server — these need localhost). `security-audit` 10/10 (`git checkout -- security-receipt.json` after).
4. **Re-run the WE14 crawl probes** (`node .so-seo-verify.cjs` + `.so-seo-verify2.cjs` at cg-main root, against live) → expect: **0 doubled-suffix · storm pair differentiated · bare-city 301 · hreflang absolute + reciprocal · 0 meta-truncation suspects**.
5. **Throttled Lighthouse mobile + desktop** on home + a service + a location page → perf **>90**, **LCP <2.5s**, CLS <0.1. Re-`HEAD` gallery webps → <150KB + `immutable`.
6. **Deployed-render check** (not DOM/200): fetch live HTML, confirm the fixes serve; pixels vision pass on home (brand + composition intact).

## 6. DEPLOY
```bash
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"
npm run build && npx --yes vercel@latest deploy --prod --yes   # kingmaker-summit-oak-roofing.vercel.app
git checkout -- security-receipt.json   # if security-audit dirtied it
# THEN verify the DEPLOYED render + re-run the crawl probes + Lighthouse.
```

## 7. CARRIED LOCKED DECISIONS (compounding WO_16–18 — do not relitigate)
SO = standalone Next.js 16 SSG, `main` = source of truth + live = deployed state · 9.5/9.5 quality bar · NEVER PBN · route scheme `/locations/[city]-nc/` · dual-intent forking · experience-first E-E-A-T (Marcus Bell, demo) · the anti-doorway gate · AI-legibility standard (word-level headings) · NC insurance compliance · **the site WINS the map pack when all else is equal** (never "only 19%", never pivot to off-page). Verify PIXELS + deployed CONTENT + NAVIGABILITY, not DOM/200. Joseph's eyeball is the final gate.

---
*— WE14, 2026-06-25. WO_19: pass our own audit. One P0 (LCP preloads) + title/hreflang/meta hygiene, all ground-truth-verified. Warm builder — reread this WO only, re-audit live, fix to the standard, PRESERVE §4, run §5 gates, deploy, report in fix-format. Expansion = WO_20.*
