# SUMMIT & OAK — WORK ORDER 22

*Remove the service×city combo pages — the matrix is all-or-nothing, and the live build has an
incoherent partial slice. **"Phase G — de-matrix / coherence-for-the-sales-call."** Architect: WE16 ·
2026-06-27 · Builder: **WARM** (Joseph has a warm SO builder — it holds the codebase; reread ONLY this WO).
Lineage: WO_16→17→18→19→20→21→**22**. Target `summit-oak-roofing/` (git-tracked, `main @ 3aa63ba`,
155 URLs) → kingmaker-summit-oak-roofing.vercel.app. ⚠️ **DEPLOY IS REQUIRED** (this fixes the LIVE
demo before D-day — NOT a no-deploy WO).*

> 🎯 **THE GOAL: the live site has to make sense to a PROSPECT on a sales call — not to us.** Right now
> `/locations/[city]/[sub]` ships **9 service×city combos distributed incoherently**: Raleigh has 4
> services, and each of 5 satellites has a *different single random* service (apex=repair,
> holly-springs=storm, wake-forest=metal, durham=replacement, cary=replacement). That is not a partial
> matrix — it's noise. It can't be explained cleanly on a live call. **Remove all 9.**

---

## 1. THE PRINCIPLE / LENS — "THE SERVICE×CITY MATRIX IS ALL-OR-NOTHING"
A service×city matrix is binary: either a **COMPLETE** matrix (every core service × the city, each page
genuinely unique + anti-doorway-gated) or **NONE.** Never a partial/selective slice — and *especially*
never different random services per city. A partial matrix reads as arbitrary noise to a prospect, and
the firm's own demo IS the sales proof — incoherence there is a sales liability.
**Decision (Joseph, 2026-06-27): REMOVE all 9 combos.** The matrix is a clean **per-client add-on at
clone time** (a COMPLETE matrix for the client's primary/GBP metro, real-job-justified), never a
half-built demo artifact. This is consistent with the locked anti-doorway doctrine (page count =
OUTPUT of real jobs) + the vault `pseo-location-silo-research` NO-GO on the mass silo.
> **Honest record:** these 9 weren't a hallucination — Raleigh's 4 were on the locked "service×city =
> primary-metro-only at launch" spec (`km-authority-build-program`); the 5 satellite combos came from
> the **WO_21 B4** "selective unique service-city" expansion (Joseph+WE14 approved the Cary sample at
> the checkpoint) — but that expansion **drifted past the primary-metro-only lock** and produced the
> incoherent set. WO_22 corrects the drift by removing the slice entirely.

## 2. ⭐ THE REMOVAL SPEC (what to remove — be exhaustive, leave nothing dangling)
Remove ALL 9 service×city combo pages (`/locations/[city]-nc/[service]`):
`raleigh-nc/{roof-replacement, roof-repair, storm-damage-roof-repair, metal-roofing}` ·
`cary-nc/roof-replacement` · `apex-nc/roof-repair` · `holly-springs-nc/storm-damage-roof-repair` ·
`wake-forest-nc/metal-roofing` · `durham-nc/roof-replacement`. *(Enumerate the live set from the
sitemap + `app/locations/[city]/[sub]/page.tsx` `generateStaticParams` / the combo data — confirm it's
exactly these 9 before removing; if the count differs, remove ALL combos regardless and report the delta.)*

Do all of the following so nothing dangles (the no-orphan + no-broken-link discipline):
1. **Stop generating them** — empty the combo data set (the COMBOS list / per-city `[sub]` entries in `lib/locations.ts` or wherever the combo params live) so `generateStaticParams` yields 0 combos. Keep or delete the now-dormant `app/locations/[city]/[sub]/page.tsx` route file (builder's call — dormant-empty is fine + makes the future add-on easy; just ensure 0 combos render).
2. **301 the old URLs** — in `middleware.ts`, 301 each `/locations/[city]-nc/<service>` → its **city hub** `/locations/[city]-nc` (keeps the location intent; the hub links out to services). A single rule `/locations/<city>-nc/<sub>` → `/locations/<city>-nc` works (don't catch the bare city hub or other valid routes). No combo URL may 404.
3. **Strip every internal link** to the combos — Header/Footer nav, the `lib/related.ts` mesh, any city-hub "services in {city}" links, project/case-study cross-links, snippet-table cross-links. Grep for combo hrefs (`/locations/<city>-nc/<service>`) → 0 live links remain.
4. **Remove the 9 from `sitemap-registry.ts`** → sitemap drops 155 → 146.
5. **Update tests/gates** referencing combos — `capture.spec` ROUTES, the `doorway-check` combo list, `reachability-check`, any combo-specific spec — so the suite is green against the new set (don't leave a test asserting a removed page).

## 3. ⭐ CARRY-FORWARD LEDGER (WO_21 §5 preserve + §8 locks — 0 silent drops)
- ✅ SO = standalone Next 16 SSG · `main` = source of truth + live = deployed — CARRIED.
- ✅ **9.5/9.5 conversion + on-page SEO** — CARRIED (removal must not regress it).
- ✅ **NEVER PBN** · NC-insurance-compliant · contractor-RED palette + Newsreader/Plus Jakarta — CARRIED.
- ✅ Fulcrum/Balance + Accent-Color Discipline · word-level AI-legible headings + the heading gate — CARRIED.
- ✅ Persistent hero + dual-intent fork + flipped sticky bars · WO_20 aesthetic standard — CARRIED.
- ✅ @graph/schema · WO_17 geo-mesh + spatialCoverage · WO_19 LCP win · CSS/security layer 10/10 — CARRIED (don't clobber).
- ✅ Route scheme `/locations/[city]-nc/` — CARRIED (the **14 city hubs STAY**; only the `[sub]` combos go).
- ✅ $10K authority architecture (page count = OUTPUT of real jobs; anti-doorway = blocking gate) — CARRIED (this removal IS that discipline — un-justified combos go).
- ✅ Site WINS the map pack when all else equal · never "only 19%" / never pivot to off-page — CARRIED.
- ✅ Joseph's eyeball is the final gate · verify PIXELS + deployed CONTENT + NAVIGABILITY — CARRIED.
- 🔵 **MODIFIED (the one deliberate exception):** WO_21 §5 "all 147→155 existing URLs stay 200 / 0 orphans" → **the 9 combos are deliberately REMOVED (301'd, not orphaned); the remaining 146 stay 200 / 0-orphan / ≤2-clicks.** This is the WO's intent, not a regression.

## 4. 🔒 PRESERVE-LIST (do NOT touch — this is surgical)
The **14 city hubs** (`/locations/[city]-nc`) · the **~8 standalone service pages** (`/services/*`) · the home + dual-intent fork + persistent hero · all materials/brands/resources/blog/projects/glossary/`/es` pages · the @graph/schema + sitemap infra (beyond removing the 9) · the security layer (10/10) · the 9.5/9.5 conversion + SEO machine · the WO_19 LCP win + WO_20 aesthetic + WO_18 AI-legibility. **ONLY the 9 `[sub]` combos + their links/redirects/sitemap entries change.** This is a clean excision, not a refactor.

## 5. VERIFICATION GATES (all green before "done"; deploy after)
From `summit-oak-roofing/` (server `:3210`):
- `tsc` 0 · `next build` all-SSG — URL count **155 → 146**.
- **sitemap = 146** (the 9 combos gone) · `.so-seo-verify*.cjs` re-run clean (no combo URLs, 0 dup titles).
- 🔴 **The 9 combo URLs return 301 → their city hub** (verify each live; NOT 404, NOT 200).
- 🔴 **reachability-check 146/146 ≤2 hops, 0 orphans** · **0 live internal links** to any removed combo (grep).
- **doorway-check PASS** (fewer pages; still green) · **security-audit 10/10** (revert `security-receipt.json`).
- Playwright desktop+mobile **axe 0 serious** (combo route tests removed/updated; fork + persistent hero preserved).
- **deployed-render check:** the 9 combos 301 live, the 146 surfaces intact, the 9.5/9.5 machine + nav coherent.

## 6. 🛑 CADENCE + DEPLOY (DEPLOY REQUIRED — fixes the live demo)
1. Preflight (`kmwe`; SO is standalone → the verify-gate Stop hook does NOT guard it, run the §5 SO gate stack). 2. Reread THIS WO (ultrathink, min 3). 3. Confirm the exact live combo set (sitemap + generateStaticParams) before removing. 4. Execute §2 (remove data → 301s → strip links → sitemap → tests). 5. Run §5 gates LOCALLY green. 6. Commit to branch `wo22-remove-combos`; **deploy to prod** (`npm run build && npx --yes vercel@latest deploy --prod --yes`; `git checkout -- security-receipt.json` after); verify the deployed render (combos 301, site coherent). 7. **🛑 Report for Joseph's eyeball** (the live URL · the 9 removed + their 301s confirmed · the 146-URL gate evidence · sitemap 146). **MERGE `wo22-remove-combos` → `main` on Joseph's confirm** (main stays the source of truth; reversible until then).

---
*— WE16, 2026-06-27. WO_22 / Phase G: remove all 9 service×city combos (the incoherent partial slice — Raleigh's 4 + 5 random satellite singles). The matrix is ALL-OR-NOTHING; a partial slice is a sales-call liability (must make sense to the PROSPECT). Surgical excision: empty the combo data → 301 each → city hub → strip every link → sitemap 155→146 → gates green → DEPLOY (fixes the live demo) → Joseph eyeball → merge to main. The matrix returns as a per-client add-on (COMPLETE, primary-metro, real-job-gated) at clone time. Carries every WO_21 lock forward; preserve the 14 city hubs + service pages + the 9.5/9.5 machine.*
