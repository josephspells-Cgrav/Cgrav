# WS-C BUILDER — Resources · Buyer's-guides · Blog topical-authority clusters

You are the **WS-C builder** on the King Maker authority roofing build (Phase A–E, parallel).
Architect/reviewer = `website-engineer` (WE12). You build the topical-authority moat. Work ONLY
in your worktree.

## 0. BOOT — in order, do not skip
1. `cd "C:/Users/josep/Claude Gravity/so-ws-c"` — confirm branch `ws-c-resources`. Never touch another worktree.
2. `npm install`.
3. Fire **`kmwe`**.
4. **Ultrathink-reread to convergence (min 3 passes):** `vault/wiki/km-authority-build-program.md` → `vault/wiki/km-research-roofing-site-blueprint-2026.md` (**§2 cluster map** pillars→clusters + §1 Category G + §6 AI-indexing) → `BUILD-CONTRACT.md` (§2 row + **§9 WS-C rulings**) → `lib/resources.ts` (the `ARTICLES` array + the 13 shipped articles), `lib/articles/`, `app/resources/[slug]/page.tsx`.
5. Then build.

## 1. SCOPE — touch ONLY these (BUILD-CONTRACT §2)
- **EXTENDS**: `app/resources/**`+`lib/resources.ts`+`lib/articles/**` (13 articles already shipped — extend the array, reuse the route).
- **CREATES**: `app/blog/**`, `lib/blog.ts`, `components/article/**`, `lib/types/resources.ts`.
- **Append-only**: `lib/sitemap-registry.ts` (your section), `lib/related.ts`.

## 2. BUILD — launch-wave subset (front-load, NOT the 40–100 ceiling)
- **Front-load 20–30 articles, pillars 1/2/3/7** (Roof Replacement · Materials · Storm+Insurance · Local) per the §2 cluster map. Pillars 2,000–3,500w; clusters 800–1,500w. Hub-and-spoke + cross-cluster mesh: each cluster links UP to its pillar + ACROSS to 2 siblings + DOWN to its money page.
- **Glossary = `/resources/glossary` + `/resources/glossary/[term]`** (an EXTEND of your `app/resources`) — **~20 real answer-units at launch, NOT 100 stubs** (each ≥150w, original explanation, links to its money page).
- **Answer-first format** (the AI-citation lever, §6): every article opens with a 50–120w `AnswerBlock` direct answer; question-led H2/H3; sourced stat triplets; extractable tables. Keep FAQ/how-to as **body copy** (FAQPage + HowTo rich results are DEAD 2026 — do not chase the wrappers).

## 3. YOUR BINDING §9 RULINGS
- New pillar/cluster content **EXTENDS the `ARTICLES` array + reuses `/resources/[slug]`** — do NOT build a parallel article model/route.
- `ResourceCluster` + `BlogPost` carry a required `answer` (50–120w) field *(done in types)*; `ArticleSection` has optional `steps?` for inline `HowToSteps`; `articleNode()` takes optional `type?`+`author?` for `BlogPosting` bylines.
- **Blog authorship = OWNER only at launch** (`authorId` optional; multi-author = Phase F).
- Glossary `relatedMoneySlug` = best-effort (resolve-or-omit).

## 4. CONSUME PHASE-0 INFRA
- Types: `import type { ... } from "@/lib/types"`; your new types in `lib/types/resources.ts`.
- AI components: `import { AnswerBlock, AnswerFaq, HowToSteps, StatTriplet, DataTable, Speakable } from "@/components/seo"`.
- Schema: `articleNode()` in `lib/schema.ts` (named `author` Person, `datePublished`+`dateModified`).

## 5. COORDINATION
No hard cross-deps. (You feed money pages owned by WS-A/B via `lib/related.ts` — append-only.)

## 6. GATES — all green before you report (§6)
`npx tsc --noEmit` · `npm run build` · `npx playwright test --project=desktop` (+ `--project=mobile`) · **`npm run doorway-check`** (glossary/programmatic pages must pass) · axe 0 critical/serious. Then `git add -A && git commit -m "WS-C: resources/blog clusters"`. **DO NOT deploy/merge.**

## 7. PRESERVE
The 13 shipped `/resources` articles · the JSON-LD spine · proven copy (flag before/after) · static generation.

## 8. REPORT
When done + gates green: print a completion report in this session, then —
`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to human --type ws-report --body "WS-C COMPLETE on ws-c-resources — gates green. Built: <N articles + glossary, 1-line>. Ready for WE12 QA + Phase F."`
Then STOP.
