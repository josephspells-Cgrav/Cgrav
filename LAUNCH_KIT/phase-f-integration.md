# PHASE F — INTEGRATION + DEPLOY (King Maker Authority Build)

> The final phase. Merge the 5 parallel A–E branches into `main`, wire the global
> technical/AI layer, verify the COMBINED site, deploy once. Architect/reviewer =
> `website-engineer` (WE12), who audited all 5 branches + **trial-merged this exact
> set and proved it builds green** — this spec carries that recipe verbatim.
> Authoritative refs: `summit-oak-roofing/BUILD-CONTRACT.md` (§F + §9), `vault/wiki/
> km-authority-build-program.md`, `vault/wiki/km-research-roofing-site-blueprint-2026.md`,
> `summit-oak-roofing/PHASE_0_RECONCILIATION.md`.

## §1 THE LENS (the principle) — "Assemble, verify whole, ship once."
Per-branch green ≠ whole-site green. The 5 branches each passed their OWN gates; Phase F
proves the ASSEMBLED site passes every gate as ONE artifact, then ships it in a SINGLE
deploy. Three rules:
- **Merge the append-seams with a DEDUPE-AWARE union** (naive concat duplicates imports).
- **The COMBINED site must re-pass every gate** (build + doorway + playwright + security +
  fork) — a per-branch pass does NOT transfer.
- **ONE deploy** carries the whole authority site + the 14 pending WO_15 cities. No partial
  deploys (last-deploy-wins on this dir).

## §2 MERGE RECIPE (PROVEN — WE12 trial-merged this exact set; it builds tsc 0 / build 0)
Work in the MAIN worktree: `cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"` (branch
`main` = `b60ae45`, clean). **Rollback point = `b60ae45`** — if a gate fails irrecoverably,
`git reset --hard b60ae45` and retry; the 5 source branches are never modified.

Merge order (the audited one; any order works):
```
git merge --no-edit ws-a-services    # clean
git merge --no-edit ws-b-locations   # clean
git merge --no-edit ws-c-resources   # CONFLICTS: lib/related.ts · lib/sitemap-registry.ts · scripts/doorway-check.mjs
git merge --no-edit ws-d-funnel      # clean
git merge --no-edit ws-e-trust       # CONFLICTS: lib/related.ts · lib/sitemap-registry.ts · tests/capture.spec.ts
```
**4 conflicting files, ALL append-style, ZERO code conflicts.** Resolve by UNION:
- **`lib/sitemap-registry.ts`** — the ONLY non-trivial one. Keep BOTH sides' per-WS sections
  (`core/wsA/wsB/wsC/wsD/wsE` — they compose through the existing `dedupe()`), and **dedupe the
  IMPORTS**: one import line per module, keeping the SUPERSET named-import. The proven-green
  import block is exactly:
  ```ts
  import { SERVICE_SLUGS } from "./services";
  import { STORM_SLUGS } from "./storm";
  import { BRAND_SLUGS } from "./brands";
  import { MATERIAL_SLUGS } from "./materials";
  import { CITY_SLUGS } from "./cities";
  import { locationPath, SERVICE_CITY_COMBOS } from "./locations";
  import { ARTICLES, GLOSSARY_SLUGS } from "./resources";
  import { BLOG_POSTS } from "./blog";
  import { CASE_STUDY_SLUGS } from "./trust";
  import { ES_PAGES, esPath, esLanguages } from "@/app/es/content";
  ```
- **`lib/related.ts`** — union the link-mesh entries (keep every WS's `RELATED_*` additions; dedupe identical keys).
- **`scripts/doorway-check.mjs`** — union: keep WS-C's extended `ARTICLES` + `GLOSSARY` + `BLOG`
  arrays AND WS-B's `COMBOS` array + both fetch/score loops; collapse the one duplicated
  `console.log` summary line into a single line counting all surfaces.
- **`tests/capture.spec.ts`** — union the `ROUTES` array (every WS's new routes present, no dupes).

After each resolve: `git add <files> && git commit --no-edit`.

## §3 CLEANUP (before the global wiring)
- **DELETE** `pnpm-lock.yaml` + `pnpm-workspace.yaml` if present (WS-C scratch). Vercel uses
  `npm ci`; a pnpm lockfile/workspace breaks or confuses the install. Confirm `package-lock.json`
  is the ONLY lockfile.
- **REGENERATE** `security-receipt.json` via `npm run security-audit` (WS-D hardened the script to
  glob all `/api/lead` callers — that receipt is canonical). Resolve any `security-receipt.json`
  merge artifact by REGENERATING, not hand-merging.

## §4 GLOBAL TECHNICAL/AI WIRING (blueprint §5/§6, BUILD-CONTRACT §F)
With all sections composed, wire the cross-cutting layer:
- **Schema @graph** — the connected graph resolves across ALL new page types (`RoofingContractor →
  Person → Service → Article/BlogPosting → Project/VideoObject`), `@id` cross-refs intact, no
  double-emit (WS-B's `CityPage` `projectNode` seam imports from `lib/trust.ts` = single source;
  `City.localProjects` stays display-only).
- **Internal-link mesh** — composed `lib/related.ts`; no orphans (>2 clicks from home), hub→cluster→
  money links resolve, `/service-areas` hub links to `/locations`.
- **Sitemap** — `SITEMAP_ENTRIES` composes all WS sections (deduped); every new route present, 0
  stale. A sitemap-INDEX-by-type is index-ready — a single sitemap is correct at ~launch scale; note
  it, don't force the split.
- **robots.txt** — the AI bot hierarchy stays (OAI-SearchBot / ChatGPT-User / PerplexityBot /
  Google-Extended).
- **llms.txt** — add it (a 5-min nicety, ~zero citation impact per the research; ship it, don't oversell).
- **CWV/INP** — keep SSG everywhere (NO forced-dynamic, NO nonce CSP); spot-check LCP/INP/CLS on a
  new heavy page (cost calculator / a combo / an article).
- **Entity home / sameAs** — one consistent `description` across the `@graph`; real `sameAs` are
  client-launch swaps → keep OMITTED-not-faked.

## §5 VERIFICATION GATES — the COMBINED site (all green BEFORE deploy)
Server on `:3210`, from the main worktree:
```
npx tsc --noEmit                         # 0
npm run build                            # 0, all routes SSG
npm run security-audit                   # 10/10 GREEN (hardened script)
npm run doorway-check                    # PASS — cities + combos + articles + glossary + blog (delete-the-city-name + <40% pairwise)
npx playwright test --project=desktop    # axe 0 critical/serious · fork preserved · 0 console errors
npx playwright test --project=mobile     # incl. sticky-flip + the wide-table a11y fix
```
+ a CWV spot-check (LCP/INP/CLS) on 2–3 new heavy pages. **PRESERVE-GATE:** `fork.spec` green
(dual-intent intact) · the 14 cities still doorway-pass · the 13 shipped articles unregressed ·
security 10/10. If a gate fails → diagnose at the next-higher layer, fix, re-run; don't deploy red.

## §6 DEPLOY (once) + REPORT
- `npm run build && npx --yes vercel@latest deploy --prod --yes` → `kingmaker-summit-oak-roofing.vercel.app`.
  This is the FIRST deploy carrying the full authority site **and WO_15's 14 cities** (they're on
  `main` now) — ONE deploy covers everything.
- **Verify the DEPLOYED render** (not DOM/200): fetch the live HTML and grep a unique marker of EACH
  WS surface — a `/materials/[slug]`, a `/locations/raleigh-nc/roof-replacement` combo, a
  `/resources/glossary/[term]`, a `/blog/[slug]`, a `/projects/[slug]`, `/es` — 0 console errors,
  hero + dual-intent intact.
- REPORT to `website-engineer` (WE12) on the blackboard: the live URL, the per-WS deployed markers,
  the combined gate results. WE12 runs the final live QA (pixels + gates); Joseph's eyeball = the
  last gate.

## §7 PRESERVE-LIST (do NOT regress — this is a MERGE + WIRE, not a redesign)
The 9.5/9.5 conversion+SEO · the dual-intent fork (urgent call-first / retail quiz-first) · sticky
bars · the WO_14 hero video · the JSON-LD spine · the 14 doorway-gated city pages · the 13 shipped
`/resources` articles · proven copy (flag before/after, never silently rewrite) · the CSS security
receipt GREEN · static generation (no forced-dynamic, no nonce CSP). Touch ONLY the integration
seams (§2) + the global layer (§4). Best judgment 100%, no mid-run questions — report at the end.
