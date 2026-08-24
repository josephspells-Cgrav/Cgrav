# WS-A BUILDER — Services · Materials · Brands · Storm money-pages

You are the **WS-A builder** on the King Maker authority roofing build (Phase A–E, parallel).
Architect/reviewer = `website-engineer` (WE12) on the blackboard. Build your one workstream
autonomously to completion, then report. Work ONLY in your worktree.

## 0. BOOT — in order, do not skip
1. `cd "C:/Users/josep/Claude Gravity/so-ws-a"` — YOUR worktree. Confirm `git rev-parse --abbrev-ref HEAD` → `ws-a-services`. NEVER touch `summit-oak-roofing/` or another `so-ws-*`.
2. `npm install` (worktrees don't carry node_modules).
3. Fire **`kmwe`** (preflight — confirms the verify gates are wired).
4. **Ultrathink-reread to convergence (min 3 passes, until no new info):**
   `vault/wiki/km-authority-build-program.md` (the lens: build the SYSTEM, page count is an OUTPUT) → `vault/wiki/km-research-roofing-site-blueprint-2026.md` (your categories: B residential services, C storm/insurance, D materials, E commercial) → `BUILD-CONTRACT.md` (your §2 row + §9 WS-A rulings are BINDING) → your owned files + the pattern to copy: `app/services/[service]/page.tsx`.
5. Then build.

## 1. SCOPE — touch ONLY these (BUILD-CONTRACT §2)
- **EXTENDS** (shipped — preserve, never silently rewrite proven copy): `app/services/**`+`lib/services.ts`, `app/storm-damage/[type]`+`lib/storm.ts` (the highest-money vertical — yours), `app/brands/[brand]`+`lib/brands.ts`, `app/roofing-cost`+`lib/costData.ts`.
- **CREATES**: `app/materials/**`, `app/commercial-roofing/**`, `lib/materials.ts`, `components/service/**`, `lib/types/catalog.ts`.
- **Append-only** (your section only): `lib/sitemap-registry.ts`, `lib/types/index.ts`, `lib/related.ts`.

## 2. BUILD — launch-wave subset + the system + exemplars (NOT the mature ceiling)
- Round out the **standalone service money-pages** (hail/wind/storm/leak/emergency already exist — fill the gaps the blueprint §B/§C names that have real intent; keep urgent surfaces call-first per the dual-intent fork).
- **Materials hub + per-material pages** (`/materials`, asphalt/metal/tile/flat etc.) with the master comparison table + extractable spec tables.
- **Commercial = ONE `/commercial-roofing` overview hub at launch** (§9) — keep `CommercialService.slug` for in-page anchors / a future `[slug]` split; do NOT ship 7 templated property-vertical stubs.
- Every page: answer-first `AnswerBlock` (50–120w) first in body, real sourced stat triplets, `Service`+`WebPage`+`BreadcrumbList` schema via `lib/schema.ts`.

## 3. YOUR BINDING §9 RULINGS
- Commercial = one hub at launch (above).
- **Nav inbound links** for `/materials` + `/commercial-roofing` in Header/Footer = **Phase F** (owns core nav). You render OUTBOUND links from your own `components/service/` atoms + append a `RELATED_MATERIALS` map to `lib/related.ts` (append-only).

## 4. CONSUME PHASE-0 INFRA
- Types: `import type { Service, Material } from "@/lib/types"`; your new types in `lib/types/catalog.ts`.
- Schema: `lib/schema.ts` (extend backward-compat only).
- AI components: `import { AnswerBlock, StatTriplet, DataTable, Speakable } from "@/components/seo"`.

## 5. COORDINATION
No hard cross-deps. (Materials/commercial nav links are Phase F.)

## 6. GATES — all green before you report (BUILD-CONTRACT §6)
`npx tsc --noEmit` · `npm run build` · `npx playwright test --project=desktop` (+ `--project=mobile`) · axe 0 critical/serious. Then `git add -A && git commit -m "WS-A: services/materials/brands/storm"`. **DO NOT deploy or merge to main** (Phase F does that).

## 7. PRESERVE (do not regress — §7)
Dual-intent fork · sticky bars · WO_14 hero · JSON-LD spine · proven copy (flag before/after) · static generation · the existing cost-page rounding ($5k).

## 8. REPORT
When done + gates green: (1) print a completion report in this session (what you built, files, gate results, branch); (2) ping the bus —
`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to human --type ws-report --body "WS-A COMPLETE on ws-a-services — gates green (tsc/build/pw desktop+mobile). Built: <1-line summary>. Ready for WE12 QA + Phase F."`
Then STOP.
