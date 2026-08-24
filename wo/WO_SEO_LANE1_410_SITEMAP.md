# WO_SEO_LANE1 — legacy-spam 410 gap + sitemap orphan (A1 + A4-partial)

> Orchestrator: OS59, 2026-08-19 ~7:10pm ET. Mode: **LEAN** (Joseph's call).
> WO drafted on Opus 5 (highest available this seat).
> Repo: `C:/Users/josep/Claude Gravity/mabrey-roofing` — the PUBLIC MARKETING SITE.
> Worktree/branch: see §3. Deploy tip = `master @ 75be427`.
> 🔴 FLOOR LANE: customer-facing production site ⇒ kimi-baton before merge + live
> verification after deploy are MANDATORY (orchestrator runs both; builder does neither).
> BATON (this WO's parent audit): KIMI_LEDGER_SEO_AUDIT_20260819-1810.md, 15 findings
> dispositioned. F7 (ordering) and F12 (allowlist guard) are the two that shaped this lane.

## 1. CURRENT BEHAVIOR — PROBED THIS SESSION, 2026-08-19 ~7:05pm ET (never recalled)

`middleware.ts` ALREADY implements legacy-WordPress handling (added 2026-07-09 at cutover):
`SPAM_410` covers `/blog/page/\d+`, `/tag`, `/author`, `/category`, `/wp-*`, `*/feed`;
`WP_QUERY_KEYS` force-410s `/?p=<id>`-style permalinks; `LEGACY_301` maps 6 real old pages.
**Live status codes I probed (https://mabreyroofing.com):**

| URL | now | wanted |
|---|---|---|
| /author/rrsc/page/3399/ | **410** ✅ | 410 |
| /category/uncategorized/page/1968/ | **410** ✅ | 410 |
| /blog/page/2495/ | **410** ✅ | 410 |
| /tag/spinsweet/ · /feed/ | **410** ✅ | 410 |
| **/2025/05/** | **404** ❌ | 410 |
| **/online-casinos-curacao-2026/** | **404** ❌ | 410 |
| **/cleobetra-casino-mobile-app-a-canadian-review/** | **404** ❌ | 410 |
| **/7-fruits-with-most-fat-according-to-diet-experts/** | **404** ❌ | 410 |
| **/interior-exterior-painting/** | **404** ❌ | 410 |
| CONTROLS: /blog · /blog/roof-questions-homeowners-ask-most · /locations/cary-nc · /commercial-roofing | **200** | must STAY 200 |

⭐ WHY THIS MATTERS: the two spam pages that STILL RANK in Google (a chumba-casino page at
#35, and the "7 fruits" page at #46/#52/#53 — DataForSEO ranked_keywords, today) are both in
the 404 group. 410 is a permanent-gone signal Google acts on far faster than 404, and per
baton F7 the 410s must be live BEFORE Joseph's GSC removal session (a removal validates
against a terminal status).

Sitemap: `app/sitemap.ts` composes `lib/sitemap-registry.ts` (`SITEMAP_ENTRIES`, 23 static
paths). Static `app/**/page.tsx` routes = 28. Diff (probed) = 5 orphans: `/book`, `/quote`,
`/review` (all three correctly carry `noindex, follow` — leave them out), `/es` (carries
`index, follow`, its CHILDREN are already in the registry — a genuine orphan, IN SCOPE), and
`/commercial-roofing` (**OUT OF SCOPE — see §6**).

## 2. TARGET BEHAVIOR

**T1.** Every URL in the "wanted 410" rows above returns **410** with the existing `gone()`
response shape (`x-robots-tag: noindex`, `cache-control: no-store`).
**T2.** Every CONTROL URL still returns **200**. No live route may ever match a 410 pattern.
**T3.** `/es` appears in the sitemap. Nothing else is added or removed.
**T4.** A repo-idiomatic guard script makes T2 mechanically enforced, with a POSITIVE control
so it cannot pass vacuously.

## 3. WORKTREE + BRANCH
Orchestrator has already prepared: worktree `C:/Users/josep/Claude Gravity/.wt-seo-lane1`,
branch `seo-lane1-410-sitemap` cut from `master @ 75be427`, `node_modules` installed.
⚠️ The main checkout has 1 modified file (`lib/business.ts`) + 1 untracked
(`.night-copy-verify.mjs`) that are NOT yours and NOT in the worktree. Never reach outside
the worktree.

## 4. ONLY THESE FILES
- `lib/legacy-url-rules.ts` — **NEW**. The extracted pattern module (see §5.1).
- `middleware.ts` — import from the new module; keep behavior identical for everything
  already working.
- `lib/sitemap-registry.ts` — add exactly one entry (`/es`).
- `scripts/spam-410-guard.mjs` — **NEW**. The guard (see §5.3).
- `package.json` — add ONE script line: `"spam-410-guard": "node scripts/spam-410-guard.mjs"`.
  (This is the one permitted package.json edit; it ADDS a gate, never weakens one.)
- `wo/BUILD_REPORT_SEO_LANE1.md` — **NEW**. Your report.

## 5. THE WORK

### 5.1 Extract, then extend (do NOT duplicate patterns)
Create `lib/legacy-url-rules.ts` exporting `LEGACY_301`, `SPAM_410`, `WP_QUERY_KEYS` — moved
VERBATIM from `middleware.ts`, plus the new patterns below. `middleware.ts` imports them and
keeps its logic byte-identical otherwise. Rationale (binding): the guard script must test the
SAME array the middleware uses; a copy would rot and the guard would certify a fiction.
The new module must import nothing from `next/server` so a plain node script can read it.

**New SPAM_410 additions:**
1. **Date archives** — `/^\/(19|20)\d{2}\/(0[1-9]|1[0-2])(\/\d{1,2})?\/?$/`
   (matches `/2025/05/`, `/2025/05/17/`; no real route is a bare year/month.)
2. **Gambling/spam keyword paths** — a single case-insensitive pattern over the whole path:
   `casino|kazino|gambling|slot|melbet|pinco|tragamonedas|vkladu|thunderstruck|aviator|betting|bookmaker`
   Anchor it so it only fires on paths, e.g. `/(casino|kazino|...)/i` tested against `pathname`.
3. **Explicit legacy-slug list** (exact, optional trailing slash, case-insensitive) — the
   known non-gambling hack/legacy residue:
   `/7-fruits-with-most-fat-according-to-diet-experts` · `/find-varlden-sweden` ·
   `/survivor-business-wikipedia` · `/trends-in-the-gambling-industry-2` ·
   `/interior-exterior-painting` · `/projects-2` ·
   and the percent-encoded Persian slug
   `/%D8%AF%DB%8C%D9%88%D8%A7%D9%86%DA%AF%DB%8C-%D9%85%DB%8C%D9%88%D9%87%D9%87%D8%A7%DB%8C-%D9%85%D8%AF-%D8%B1%D9%88%D8%B2`
   ⚠️ `req.nextUrl.pathname` may arrive percent-ENCODED or DECODED depending on the client.
   Test BOTH forms (match the raw pathname and its `decodeURIComponent` result, guarded in a
   try/catch — `decodeURIComponent` throws on malformed input and must never 500 the site).

### 5.2 Sitemap
Add `/es` to the appropriate section of `lib/sitemap-registry.ts`, matching the surrounding
entry shape exactly (type tag, priority, changeFrequency conventions of its neighbours).
Do NOT touch any other entry. Do NOT add `/book`, `/quote`, `/review`, `/commercial-roofing`.

### 5.3 The guard — `scripts/spam-410-guard.mjs`
Plain node ESM, same idiom as the existing `scripts/doorway-check.mjs` /
`scripts/reachability-check.mjs` (read those first and match their style + exit-code
convention). It must:
1. Import the patterns from `lib/legacy-url-rules.ts` and the paths from
   `lib/sitemap-registry.ts` (use whatever loader the sibling scripts use for TS — if they
   shell out to tsx/ts-node or read+parse, do the same; do NOT invent a new toolchain).
2. **NEGATIVE control:** assert NO sitemap path matches ANY `SPAM_410` pattern. Also assert
   no path from a hardcoded LIVE-ROUTE list matches: `/`, `/blog`,
   `/blog/roof-questions-homeowners-ask-most`, `/locations/cary-nc`, `/commercial-roofing`,
   `/services/roof-replacement`, `/es`, `/quote`, `/book`, `/review`.
3. **POSITIVE control (mandatory — a guard that only checks "nothing matches" passes with an
   empty pattern list):** assert every one of these DOES match:
   `/author/rrsc/page/3399/`, `/category/uncategorized/page/1968/`, `/blog/page/2495/`,
   `/tag/spinsweet/`, `/feed/`, `/2025/05/`, `/online-casinos-curacao-2026/`,
   `/cleobetra-casino-mobile-app-a-canadian-review/`,
   `/7-fruits-with-most-fat-according-to-diet-experts/`, `/interior-exterior-painting/`.
4. Exit non-zero with a clear per-failure line on any violation; print a one-line PASS summary
   with both counts on success.

## 6. 🔴 OUT OF SCOPE — DO NOT TOUCH
`/commercial-roofing` and its sitemap status. The orchestrator discovered mid-lane that this
page was **deliberately archived by Joseph on 2026-07-08** (`app/commercial-roofing/page.tsx`
carries `noindex: true` with an ARCHIVED comment; `lib/sitemap-registry.ts:77-78` explicitly
says it is kept out "so we don't submit a noindex URL"). It is a live decision awaiting
Joseph, not builder scope. Do not add it to the sitemap, do not remove its noindex, do not
edit that page or those comments.

## 7. INVARIANTS (each with its enforcement)
- **I1 — no live route may 410.** Enforced by §5.3's negative control + the CONTROL rows in §1.
- **I2 — the guard cannot pass vacuously.** Enforced by §5.3's positive control.
- **I3 — middleware behavior for already-working patterns is unchanged.** Enforced by the
  positive control covering all pre-existing patterns, plus your own before/after read.
- **I4 — no 500s from malformed input.** `decodeURIComponent` in try/catch.
- **I5 — `/quote` stays excluded from the middleware matcher** (perf decision, WO_SPEED
  2026-08-11). Do not alter `config.matcher`.
- **I6 — no page.tsx, component, or copy changes.** This lane is routing + registry only.

## 8. GATES — run ALL, paste verbatim tails + exit codes in the report
```
npm run typecheck
npm run spam-410-guard
npm run doorway-check
npm run reachability-check
npm run build
```
Zero errors. If a gate fails for a reason unrelated to your diff, STOP and report — do not
"fix" an unrelated gate. `npm run lint` is optional (report if it flags your files).

## 9. THE SIX NEVERS
Builders NEVER: deploy · touch `.env*` · read a `DATABASE_URL` · run migrations · push ·
**modify the gates** (test files, playwright config, existing scripts/*.mjs, CI config, or
any package.json script other than the ONE addition in §4 — a red gate is fixed in the CODE).

## 10. DELIVERABLES
1. Commits on `seo-lane1-410-sitemap`, message prefix `seo-lane1:`. Do NOT push.
2. `wo/BUILD_REPORT_SEO_LANE1.md`: what changed per file with line cites · verbatim gate
   tails + exit codes · the before/after status-code table you REASONED (you cannot deploy,
   so state expected codes and how the guard proves them) · anything the WO under-specified,
   flagged one line each.
3. Final message: 5-line TLDR — files touched, guard counts (negative/positive), gate results,
   open flags.
