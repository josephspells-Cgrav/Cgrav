# WO — SEO LANE H: guard/matcher hardening (3 deferred lows) — THE ULTRA-LEAN PILOT
**Date:** 2026-08-20 ~3:40am ET · **Orchestrator:** OS60 · **WO drafted on fable-5.**
**Mode:** ULTRA-LEAN (Kimi K3 builds at HIGH; Kimi static judge; orchestrator gates everything; no Claude sub-agents unless the deadman fires).
**Repo:** mabrey-roofing · **Branch:** `seo-h-hardening` cut from `master @ 04d5b7d` (deploy tip, probed 3:38am).
**Worktree:** `C:/Users/josep/Claude Gravity/.wt-seo-h`.
**Floor surfaces touched:** customer-facing (prod middleware matcher) + gate scripts. No prod-data, money, credentials.

## 0. WHY
Three hardening findings from tonight's Lane-M pre-merge audit were deferred as "future lane." This is that lane, and it doubles as the pilot for the Kimi-builder pipeline.

## 1. CURRENT BEHAVIOR (PROBED 3:38am)
- `scripts/spam-410-guard.mjs:132-140`: `LEGACY_301_SOURCES` is a hand-mirrored 7-entry literal list; the tripwire at :430 asserts COUNT equality only (`LEGACY_301.length !== LEGACY_301_SOURCES.length`). A same-count entry REPLACEMENT drifts silently.
- `scripts/spam-410-guard.mjs:391`: sitemap parse refuses only `size === 0`. A sitemap regressed to 25 entries passes every control against a hollowed corpus.
- `middleware.ts:186` matcher: `...|quote|...` is a PREFIX exclusion — any future root route starting with "quote" (e.g. /quote-comparison) would bypass middleware entirely (no slash 308, no spam checks). Today only /quote and /quote/ exist and both are intended exclusions.
- `lib/legacy-url-rules.ts:43-55`: `LEGACY_301` is `Array<[RegExp, string]>`, each source regex shaped `/^\/<literal-slug>\/?$/i` (7 entries, all literal slugs, no captures).

## 2. TARGET BEHAVIOR (exactly these three changes)
1. **Content-equality tripwire** (replaces the count-only check at guard :424-434): derive the source slugs mechanically from `LEGACY_301` itself — for each `[rx]`, take `rx.source`, strip the leading `^\/`, strip the trailing `\/?$`, unescape `\/` → `/` and `\-` → `-` — and assert the derived set EQUALS the `LEGACY_301_SOURCES` set (both directions, order-independent). On mismatch: print both sets and exit 2. If any regex fails to reduce to a literal slug (contains unescaped regex metacharacters after stripping), exit 2 naming it — the derivation must never silently skip an entry.
2. **Sitemap-count floor** at guard :391 block: after the zero check, `if (sitemapPaths.size < 130) exit 2` with a message naming the count found and the floor (current live count is 168; the floor 130 tolerates deliberate pruning but catches a hollowed registry).
3. **Matcher tighten**: `quote` → `quote(?:/|$)` inside the middleware matcher regex ONLY. /quote and /quote/ stay excluded (fast path preserved); /quote-anything now flows through middleware like any route.

## 3. ONLY-THESE-FILES
`scripts/spam-410-guard.mjs` · `middleware.ts` (the single matcher line).

## 4. NEVER-TOUCH
Everything else. No lib/ edits, no app/ edits, no package.json, no tests/, no new files.

## 5. INVARIANTS
- **I1** All existing guard controls still pass (the guard gates itself).
- **I2** The derived-sources set today equals the hand list exactly (7 slugs) — the tripwire must pass on the current tree, and a deliberate local mutation test (add a fake entry to a COPY of the list inside a scratch check, not the shipped file) must fail it. Show both in the report.
- **I3** Matcher behavior: /quote 200 (excluded, statically served) · /quote/ NOT 404 (record actual) · /quote-test-path flows through middleware (probe: it should 404 via the normal route miss, not bypass — verify by confirming its trailing-slash form /quote-test-path/ now 308s, which only middleware does).
- **I4** No behavior change on any of the 168 sitemap URLs (reachability + guard prove it).

## 6. GATES (verbatim, from the worktree; server on :3218)
```
npm run typecheck
npm run build
npx next start -p 3218        # background; kill any prior listener on the port FIRST;
                              # prove freshness: GET /_next/static/<BUILD_ID>/_buildManifest.js == 200
PORT=3218 npm run spam-410-guard
PORT=3218 npm run doorway-check
PORT=3218 npm run reachability-check
```

## 7. ORACLE
| probe (redirect-disabled, raw first response) | expect |
|---|---|
| /quote | 200 |
| /quote/ | record actual (NOT 404) |
| /quote-test-path/ | 308 → /quote-test-path (proves middleware now sees quote-* routes) |
| /online-casinos-curacao-2026/ | 410 direct (regression check) |
| /locations/cary-nc/ | 308 → /locations/cary-nc |
| / | 200 |
Guard output: content-equality tripwire line visible in the pass output; mutation test shown failing in the report.

## 8. REPORT
`wo/BUILD_REPORT_SEO_LANE_H.md` in the worktree: gate tails + exit codes · oracle results · the I2 mutation-test proof · the exact matcher line before/after. Commit on the branch. Do not push.

## 9. THE SIX NEVERS
NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push · modify gates beyond the two authorized files' specified changes. A red gate is fixed in the code, never in the gate.
