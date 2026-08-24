# WS-B BUILDER — Location system + anti-doorway gate (HIGH-RISK)

You are the **WS-B builder** on the King Maker authority roofing build (Phase A–E, parallel).
Architect/reviewer = `website-engineer` (WE12). This is the **penalty-risk** workstream — the
anti-doorway gate is non-negotiable. Work ONLY in your worktree.

## 0. BOOT — in order, do not skip
1. `cd "C:/Users/josep/Claude Gravity/so-ws-b"` — confirm `git rev-parse --abbrev-ref HEAD` → `ws-b-locations`. NEVER touch another worktree.
2. `npm install`.
3. Fire **`kmwe`**.
4. **Ultrathink-reread to convergence (min 3 passes):** `vault/wiki/km-authority-build-program.md` → `vault/wiki/km-research-roofing-site-blueprint-2026.md` (**§4 anti-doorway rules** + §1 Category F location tiers — read these hardest) → `BUILD-CONTRACT.md` (your §2 row + **§9 WS-B rulings are BINDING**) → `lib/cities.ts` (the 14 typed cities + the `City` required-unique fields), `lib/locations.ts` (the URL contract + 3-tier types Phase 0 left you), `lib/doorway-gate.ts`, `components/CityPage.tsx`.
5. Then build.

## 1. SCOPE — touch ONLY these (BUILD-CONTRACT §2)
- **EXTENDS**: `app/locations/[city]` + hub `app/service-areas/page.tsx`, `lib/cities.ts` (14 cities — the data), `components/CityPage.tsx`, `lib/locations.ts` (extend the 3-tier types).
- **CREATES**: service×city + tier-2/3 routes under `app/locations/`, `components/location/**`.
- **Append-only**: `lib/sitemap-registry.ts` (your section), `lib/related.ts`.

## 2. BUILD — launch-wave subset (NOT the 280–350 ceiling)
- **ONE second segment: `app/locations/[city]/[sub]/page.tsx`** (§9 — separate `[service]`/`[neighborhood]` folders are a Next "different slug names" build error). Resolve inside: `[sub]` in `SERVICE_SLUGS` → service×city combo; else a city neighborhood → tier-3; else `notFound()`.
- **Service×city = PRIMARY METRO (Raleigh) ONLY at launch.** Do NOT build the suburb×service cross-product (15–25 suburbs × 3–4 services × 2 metros approaches Mueller's ~1,300-page doorway red line). The single `[sub]` segment is forward-compatible for later.
- Keep location pages **quiz-first** (retail intent). Data stays in `lib/cities.ts` — never duplicate it into `lib/locations.ts`.

## 3. YOUR BINDING §9 RULINGS
- The `[sub]` single-segment route resolution (above) — already encoded in `lib/locations.ts`.
- **Combo job proof:** you own combo job data IN `lib/locations.ts` (City.localProjects has no stable id); each combo cites its own service-specific exemplar job (gate part 1).
- **City `geo?{lat,lng}` is OPTIONAL / out of launch scope** — add + seed centroids only if you build the map-pin tier; `locationNode`/`projectNode` already accept it.

## 4. ⚠️ THE ANTI-DOORWAY GATE IS BLOCKING
Every location/programmatic page must pass all four (BUILD-CONTRACT §4): real local job → page · city-specific factual payload (permit authority+fee, wind-zone/code, a real NOAA/IBHS stat) · browseable via `/service-areas` hub + breadcrumbs · confirmed demand. **`npm run doorway-check` must PASS** (delete-the-city-name + <40% pairwise). On this demo, "real job" = realistic EXEMPLAR (the 14 cities already pass); clones populate real jobs.

## 5. COORDINATION — the WS-E seam
WS-E owns the `CaseStudy`/job-pin entity (`lib/trust.ts` → `getCaseStudiesByCity(citySlug)`). You add **ONE render slot in `CityPage.tsx`** that imports from `lib/trust.ts` and emits `projectNode` per case study. `City.localProjects` stays **DISPLAY-ONLY** (no `projectNode` — no double-emit). Sync with WS-E at this one boundary.

## 6. GATES — all green before you report (§6)
`npx tsc --noEmit` · `npm run build` · `npx playwright test --project=desktop` (+ `--project=mobile`) · **`npm run doorway-check`** (must PASS) · axe 0 critical/serious. Then `git add -A && git commit -m "WS-B: location system + anti-doorway"`. **DO NOT deploy/merge.**

## 7. PRESERVE
The 14 doorway-gated city pages (+ their unique prose) · the `/locations/[city]-nc` canonical + the `/service-areas` 301 middleware · dual-intent (city pages quiz-first) · proven copy · static generation.

## 8. REPORT
When done + gates green: print a completion report in this session, then —
`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to human --type ws-report --body "WS-B COMPLETE on ws-b-locations — gates green incl. doorway-check PASS. Built: <1-line>. Ready for WE12 QA + Phase F."`
Then STOP.
