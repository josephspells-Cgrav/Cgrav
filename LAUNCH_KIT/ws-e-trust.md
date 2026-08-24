# WS-E BUILDER — Trust / E-E-A-T · Reviews · Job-pin engine · Bilingual /es

You are the **WS-E builder** on the King Maker authority roofing build (Phase A–E, parallel).
Architect/reviewer = `website-engineer` (WE12). You build the Experience/authority layer + the
DataPins-style job-pin engine. Work ONLY in your worktree.

## 0. BOOT — in order, do not skip
1. `cd "C:/Users/josep/Claude Gravity/so-ws-e"` — confirm branch `ws-e-trust`. Never touch another worktree.
2. `npm install`.
3. Fire **`kmwe`**.
4. **Ultrathink-reread to convergence (min 3 passes):** `vault/wiki/km-authority-build-program.md` → `vault/wiki/km-research-roofing-site-blueprint-2026.md` (§1 Category H trust + §5 schema: Person/Project/ImageObject/VideoObject + §6 E-E-A-T) → `BUILD-CONTRACT.md` (§2 row + **§9 WS-E rulings**) → `app/about/page.tsx`, `lib/reviews.ts`, `lib/gallery.ts`, the named-author model (Marcus Bell), `components/GoogleReviewsWidget.tsx`.
5. Then build.

## 1. SCOPE — touch ONLY these (BUILD-CONTRACT §2)
- **EXTENDS**: `app/about/**`, `app/reviews/**`+`app/review/**`, `app/gallery/**`, `lib/reviews.ts`+`lib/gallery.ts`.
- **CREATES**: `app/es/**`, `app/projects/**`, `app/certifications/**`, `app/warranty/**`, `components/trust/**`, `lib/trust.ts`, `lib/types/trust.ts`, the **job-pin engine**.
- **Append-only**: `lib/sitemap-registry.ts` (your section), `lib/related.ts`.

## 2. BUILD — launch-wave subset
- **Named-author E-E-A-T**: team `Person` schema, certifications page (GAF Master Elite / OC / license #s with issuer URLs), `/warranty` hub, `/about` thickened. (Experience is the March-2026 core-update lever.)
- **Job-pin engine** (the DataPins moat): `CaseStudy` is the canonical entity in `lib/trust.ts` → `getCaseStudiesByCity(citySlug)` + a `projectNode` helper. Ship **5–10 geo-tagged case studies at launch** (NOT 50). Each: address/subdivision specificity, date, 3 photos, unique ~60-word local description, `Project`/`ImageObject` schema.
- **Reviews**: `AggregateRating` + the live Google widget (display) + `/leave-a-review` generation router (only mark up reviews visible on the page). **Video testimonials** = `VideoObject` (an alive 2026 rich result — not a maybe).
- **`/es` = translated STATIC pages** (separate URLs + NATIVE copy, NOT a locale toggle). NC is low-priority — ship the seed structure + hreflang; native copy or don't ship (token-swapped = a doorway set in Spanish).

## 3. YOUR BINDING §9 RULINGS
- **`CaseStudy` is the canonical job-pin entity.** `lib/trust.ts` exports `getCaseStudiesByCity(citySlug)` + the project-node helper; **WS-B adds ONE render slot in `CityPage.tsx`** that imports from `lib/trust.ts` and emits `projectNode` per case study. `City.localProjects` stays DISPLAY-ONLY (no `projectNode` — no double-emit). You own `lib/trust.ts`; coordinate with WS-B at that boundary.
- **`/es` = translated static pages** (separate URLs + native copy); hreflang via `pageMetadata({ languages })` *(done)* + `SitemapEntry.alternates` *(done)*; `x-default` = en. No need to edit `lib/metadata.ts`.

## 4. CONSUME PHASE-0 INFRA
- Types: `import type { CaseStudy } from "@/lib/types"`; your new types in `lib/types/trust.ts`.
- Schema: `projectNode`, `videoObjectNode`, Person/ImageObject helpers in `lib/schema.ts`.
- AI components: `import { AnswerBlock, StatTriplet, Speakable } from "@/components/seo"`.

## 5. COORDINATION — the WS-B seam
Publish `lib/trust.ts` (`getCaseStudiesByCity`, the project-node helper) early + ping WS-B so it can wire the single `CityPage.tsx` render slot. That's the one boundary — sync on it.

## 6. GATES — all green before you report (§6)
`npx tsc --noEmit` · `npm run build` · `npx playwright test --project=desktop` (+ `--project=mobile`) · **`npm run doorway-check`** (projects/location-ish pages must pass) · axe 0 critical/serious. Then `git add -A && git commit -m "WS-E: trust/reviews/job-pin/es"`. **DO NOT deploy/merge.**

## 7. PRESERVE
The named-author model (Marcus Bell) · the shipped about/reviews/gallery + proven copy (flag before/after) · the JSON-LD spine · static generation · NC insurance-copy compliance (no deductible-waiver / public-adjuster overreach).

## 8. REPORT
When done + gates green: print a completion report in this session, then —
`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to human --type ws-report --body "WS-E COMPLETE on ws-e-trust — gates green. Built: <trust + N case studies + /es seed, 1-line>. Ready for WE12 QA + Phase F."`
Then STOP.
