# WO — SEO LANE M: direct-410 on trailing-slash spam + doorway-check derives from lib
**Date:** 2026-08-19 ~9:40pm ET · **Orchestrator:** OS60 (vault-agent) · **WO drafted on fable-5, highest available.**
**Mode:** PLUS-JUDGE · **Repo:** mabrey-roofing · **Branch:** `seo-m-410-direct` cut from `master @ 56fcc11` (the deploy tip, probed 9:17pm).
**Worktree:** `C:/Users/josep/Claude Gravity/.wt-seo-m` (orchestrator preps).
**Floor surfaces touched:** customer-facing (production website middleware — every request flows through it). No prod-data, no money, no credentials.

## 0. WHY (context, not instructions)
GSC spam-URL removals are queued for tonight/tomorrow. The indexed spam URLs are the
WordPress-era forms — `www.` host + **trailing slash** (e.g.
`https://www.mabreyroofing.com/online-casinos-curacao-2026/`). PROBED 2026-08-19 9:18pm:
that URL returns **308 → /online-casinos-curacao-2026 → 410**. The 308 comes from
Next.js's built-in trailing-slash normalization, which runs BEFORE middleware. The F7
sequencing law requires removals to validate against **direct** 410s (first response,
no redirect hop). Separately, `scripts/doorway-check.mjs` carries hardcoded copies of
CITY_SLUGS (14 cities — stale: misses chapel-hill, hillsborough, pittsboro, burlington,
sanford, wilson) and GLOSSARY (20 terms — about to go stale again when Lane A7 adds ~31).
The hardcoded-list-rots law: derive from the lib sources instead.

## 1. CURRENT BEHAVIOR (all PROBED this session, 2026-08-19 9:17-9:35pm ET)
- `GET /online-casinos-curacao-2026/` → `308`, `Location: /online-casinos-curacao-2026`; following it → `410`. Same on `www.` host.
- `GET /online-casinos-curacao-2026` (no slash) → direct `410`. ✅ dotless-no-slash form already correct.
- `middleware.ts` order: A1 WP query-param 410 → A2 `matchesSpam410(pathname)` 410 → A3 LEGACY_301 → B legacy route migrations → `NextResponse.next()`.
- Matcher: `"/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|quote|.*\\.).*)"` — excludes `/quote`, dotted paths, api, internals.
- `next.config.ts`: no `trailingSlash` / `skipTrailingSlashRedirect` keys present. Next version `^16.2.9`.
- `lib/legacy-url-rules.ts` (154 lines) exports `LEGACY_301`, `WP_QUERY_KEYS`, `SPAM_410`, `matchesSpam410`. The guard's comments reference "matchesSpam410's dual-form test" — READ the file first and confirm whether patterns already tolerate trailing slashes; do not assume either way.
- `scripts/spam-410-guard.mjs`: imports the TS rules natively (Node ≥22.6 type-stripping precedent, documented in its header). Negative 141 paths / positive 16 paths at last run. Probes a live server on :3210.
- `scripts/doorway-check.mjs` (152 lines): hardcoded `CITY_SLUGS` (14), `CITY_NAMES` (14), `ARTICLES`, `GLOSSARY` (20), `BLOG`, `EXISTING`, `COMBOS` lists. Comment says "Keep in sync with lib/cities.ts" — it was not kept in sync; lib/cities.ts now has 20 cities (`CITY_SLUGS = CITIES.map(c => c.slug)`, line 915).
- `lib/articles/glossary.ts` exports `GLOSSARY_TERMS: GlossaryTerm[]` (20 entries, `slug` field).
- Prod sitemap: 137 URLs, all expected to be 200 directly.

## 2. TARGET BEHAVIOR
1. **Spam URL in ANY form → direct 410 on the first response.** No Location header, no
   redirect hop. Forms: with/without trailing slash, on apex or www (host-agnostic —
   middleware already is). `x-robots-tag: noindex` + `cache-control: no-store` preserved
   (the existing `gone()` helper).
2. **Every legitimate trailing-slash URL keeps today's UX:** `/locations/cary-nc/` →
   `308` → `/locations/cary-nc` → `200`. The 308 now comes from the middleware instead
   of Next's built-in normalizer. Query strings preserved across the redirect.
3. **Implementation shape (the intended design — deviations must be argued in the report):**
   - `next.config.ts`: add `skipTrailingSlashRedirect: true` (the official escape hatch;
     this is the ONLY config change).
   - `middleware.ts`: derive `const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname` (handle multi-slash tails defensively). Run A1/A2 spam
     checks against the normalized path. If spam → `gone()`. If NOT spam and the raw
     pathname had a trailing slash → 308 redirect to the normalized path (clone nextUrl,
     set pathname, keep search). A3/B sections operate on the normalized path (their
     regexes mostly tolerate `\/?$` already — verify each).
4. **`scripts/doorway-check.mjs` derives its lists from lib:**
   - `CITY_SLUGS` / `CITY_NAMES` from `../lib/cities.ts` (`CITIES` export: `.map(c=>c.slug)`, `Object.fromEntries(CITIES.map(c=>[c.slug, c.name]))`). Native TS import, same Node ≥22.6 mechanism spam-410-guard.mjs already uses (copy its header comment convention).
   - `GLOSSARY` from `../lib/articles/glossary.ts` (`GLOSSARY_TERMS.map(t=>t.slug)`).
   - `ARTICLES` / `BLOG`: check whether lib sources export the slug lists (`lib/articles/*.ts`); derive if they exist, otherwise leave hardcoded WITH a comment naming the file that must stay in sync and why derivation wasn't possible.
   - ⚠️ lib/cities.ts imports nothing beyond types (verify) — if the import chain pulls in Next/React modules that break plain-node import, STOP and report; do not hack around it.
5. **`scripts/spam-410-guard.mjs` extension:** every positive-control path is probed in BOTH forms (`/path` and `/path/`), asserting `statusCode === 410` on the FIRST response and `location` header absent. Add a THIRD control: every sitemap URL + trailing slash must return 308 with Location = the slashless form (proves the normalization survived the config change; sample ≥20 sitemap URLs if probing all 137 is slow — say which in the report).

## 3. ONLY-THESE-FILES
`next.config.ts` · `middleware.ts` · `lib/legacy-url-rules.ts` (only if dual-form
matching needs a tweak) · `scripts/spam-410-guard.mjs` · `scripts/doorway-check.mjs`.

## 4. NEVER-TOUCH
`lib/business.ts` · `app/**` (no page/route changes) · `lib/sitemap-registry.ts` /
`app/sitemap.ts` · `lib/cities.ts` · `lib/articles/**` · `package.json` ·
`tests/**` and `playwright.config.*` (gate files — SIX-NEVERS territory) ·
the matcher's `/quote` exclusion (paid-traffic fast path, WO_SPEED) — do not add or
remove matcher entries.

## 5. INVARIANTS (each with its enforcement)
- **I1** No live sitemap route matches a 410 pattern — enforced by spam-410-guard negative control (exists).
- **I2** Guard cannot pass vacuously — positive control (exists, now dual-form).
- **I3** Every sitemap URL returns 200 with NO redirect (direct 200) — reachability-check + the new guard control.
- **I4** Every sitemap URL + trailing slash returns 308 to the slashless form — NEW guard control (this WO adds it).
- **I5** `/quote` stays middleware-excluded and statically served; `/quote/` must NOT 404 — probe both post-change and RECORD actual `/quote/` behavior in the report (200 or 308 both acceptable; 404 is a blocker). If `/quote/` regresses to 404 under skipTrailingSlashRedirect, add a `next.config.ts` `redirects()` entry `{source: "/quote/", destination: "/quote", permanent: true}` — config redirects run before middleware and don't touch the matcher.
- **I6** `/sitemap.xml`, `/robots.txt`, `/api/*`, dotted asset paths: byte-identical behavior (they bypass middleware; confirm skipTrailingSlashRedirect doesn't alter them).
- **I7** Root `/` never redirected or 410'd (the A1 query-param check must not fire on empty params).

## 6. GATES (run all, verbatim, from the worktree; server on :3210 for the last three)
```
npm run typecheck
npm run build
npx next start -p 3210        # background, then:
npm run spam-410-guard
npm run doorway-check
npm run reachability-check
```
Source of truth for gate wiring: `package.json` scripts (read, don't modify).
Datastore: NONE — static site, no DB, no env secrets needed. Do not create env files.

## 7. CRITICAL ARTIFACT + ORACLE
The middleware behavior table. Oracle = this probe matrix run against the local :3210
server (the orchestrator re-runs the same matrix live post-deploy):

| request | expect |
|---|---|
| `/online-casinos-curacao-2026` | 410 direct |
| `/online-casinos-curacao-2026/` | 410 direct (TODAY: 308) |
| `/author/rrsc/page/2597/` | 410 direct |
| `/category/uncategorized/page/12/` | 410 direct |
| `/blog/page/9/` | 410 direct |
| `/2025/05/` | 410 direct |
| `/?p=47408` | 410 direct |
| `/locations/cary-nc/` | 308 → `/locations/cary-nc` |
| `/locations/cary-nc` | 200 |
| `/services/roof-replacement/` | 308 → `/services/roof-replacement` |
| `/quote` | 200 |
| `/quote/` | NOT 404 (record actual) |
| `/` | 200 |
| `/sitemap.xml` | 200, count unchanged |
| `/roof-replacement/` (legacy WP slug) | 301 → `/services/roof-replacement` |

## 8. REPORT FORMAT
Write `wo/BUILD_REPORT_SEO_LANE_M.md` in the worktree: gate outputs (tails + exit codes,
verbatim) · the oracle matrix with ACTUAL results · every deviation from §2's intended
design with reasoning · `/quote/` recorded behavior · any file read that contradicted
this WO (report, don't improvise). Commit everything on the branch. Do not push.

## 9. THE SIX NEVERS
You NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push ·
modify the gates (test registry, playwright config, package.json scripts, CI). A red
gate is fixed in the code, never in the gate.

## BATON
kimi-baton on this WO before dispatch (orchestrator runs it; receipt path recorded here).

---
# AMENDMENTS v2 (post-baton, 2026-08-19 ~10:25pm ET — kimi 16 findings, ledger beside receipts; PLUS the GSC-recon scope addition §Z)
These OVERRIDE the sections above where they conflict.

## A. ⭐ GUARD PROBES ARE REDIRECT-DISABLED (F1 — the load-bearing rule)
ALL guard probes (existing and new) MUST issue requests with redirect following
disabled and assert on the RAW FIRST RESPONSE. Audit the existing guard client's
redirect behavior first and name it in the report (the current script uses node:http —
which does not follow redirects — confirm and state this). Any probe that follows
redirects proves nothing; the entire lane's proof structure hangs on this sentence.

## B. Middleware decision order, pinned (F2, F3, F6 — replaces §2.3's prose)
Numbered chain, exactly this:
1. normalized = pathname.replace(/\/+$/, ""); if the result is "" set it to "/".
2. A1 WP query-param check (on normalized === "/").
3. A2 spam checks against normalized (all rules incl. §Z below) → gone().
4. A3 LEGACY_301 against normalized → 301 direct to destination (ONE hop — a legacy
   slash URL never takes an intermediate 308; oracle row updated below).
5. B-section legacy route migrations against normalized (same one-hop rule).
6. If pathname !== normalized (raw had trailing slash(es) and is not root) → 308 to
   normalized + original search. NOTE the guard: root "/" can never redirect because
   normalized === "/" === pathname.
7. NextResponse.next().

## C. Location header + query (F4, F10)
Emit RELATIVE Location headers (match today's normalizer output, probed:
"Location: /online-casinos-curacao-2026"). If NextResponse.redirect produces absolute,
set the header manually. The guard asserts on parsed pathname+search of the Location
value, never a literal absolute string. Query preservation: matrix rows added below.

## D. I6 corrected (F5 — the old I6 was FALSE)
Slash forms of matcher-excluded paths LOSE their built-in 308 under
skipTrailingSlashRedirect. Probe /robots.txt/, /sitemap.xml/, /quote/ post-change.
Acceptable: 308 (via a next.config redirects() entry) or 200; NOT acceptable: 404 on
/quote/. For /robots.txt/ + /sitemap.xml/: record actual behavior; if 404, add
redirects() entries for exactly those two (same contingency shape as I5). /api/*/ —
record actual, no fix required (no crawler-facing surface).

## E. Runtime + derivation constraints (F7, F12, F14 — doorway-check derive)
- PROBED FACTS: this machine runs Node 24.14.1 (type-stripping default-on);
  scripts/spam-410-guard.mjs ALREADY imports ../lib/legacy-url-rules.ts natively and
  ran green at Lane 1 — the invocation mechanism is proven. Follow its exact import
  convention: relative specifier WITH the .ts extension, never @/ aliases.
- Constraint list for every derived source (cities.ts AND glossary.ts AND any
  lib/articles/*.ts you probe): value imports must be relative+extensioned; if any file
  in the chain contains an enum/namespace/non-erasable syntax or transitively imports
  Next/React modules, STOP and report — do not hack around it.
- CITY_NAMES: read how the script CONSUMES it first; derive to match that shape.
- If derivation turns doorway-check red on PRE-EXISTING content gaps (a city the old
  hardcoded list never scanned now failing signals), record the failures verbatim and
  STOP — the fix lives outside your file list. Red-on-derivation is a finding, not your
  defect.
- Export contract this lane depends on: CITIES[].slug/.name (lib/cities.ts),
  GLOSSARY_TERMS[].slug (lib/articles/glossary.ts). Re-verify both at report time.

## F. Guard coverage (F8, F16)
Probe ALL 137 sitemap URLs (no sampling — localhost, seconds). URL source: parse
/sitemap.xml from the running :3210 server (the existing guard's mechanism). GET only;
add ONE HEAD probe of one spam URL asserting 410 (record, don't over-engineer).

## G. Oracle matrix — replacement + additions (F2, F6, F10, F11, F5, F16)
| request | expect (raw first response, redirect-disabled) |
|---|---|
| /online-casinos-curacao-2026 | 410 |
| /online-casinos-curacao-2026/ | 410 direct |
| /online-casinos-curacao-2026// | 410 direct (multi-slash) |
| /online-casinos-curacao-2026/?junk=1 | 410 direct |
| /author/rrsc/page/2597/ | 410 direct |
| /category/uncategorized/page/12/ | 410 direct |
| /blog/page/9/ | 410 direct |
| /2025/05/ | 410 direct |
| /?p=47408 | 410 direct |
| /locations/cary-nc/ | 308, Location pathname /locations/cary-nc |
| /locations/cary-nc/?utm_source=x | 308, Location retains ?utm_source=x |
| /locations/cary-nc | 200 |
| /services/roof-replacement/ | 308 → /services/roof-replacement |
| /roof-replacement/ | 301 direct, Location pathname /services/roof-replacement (ONE hop) |
| /quote | 200 |
| /quote/ | NOT 404 (record actual) |
| /robots.txt/ and /sitemap.xml/ | record actual; fix to 308 via redirects() if 404 |
| / | 200 (never a redirect) |
| /sitemap.xml | 200, URL count unchanged |
| HEAD /online-casinos-curacao-2026 | 410 |
| /online-casinos-curacao-2026%2F | record actual (encoded slash — if pathname arrives decoded, expect 410; report which) |
Orchestrator's live post-deploy re-run adds the HOST dimension (apex + www, both forms).
PROBED FACT: www serves the same deployment with no platform-level host redirect
(www spam URL 308→410 on www itself, probed 9:18pm). If prod behavior differs
post-deploy, escalate — do not iterate blindly.

## H. Behavioral acknowledgment (F15)
After this change every slash-form request executes middleware (previously the
platform normalizer answered first). Accepted cost on a static marketing site. Set
cache-control parity on the manual 308s if the prior normalizer 308s carried caching
headers (probe one first and match).

## Z. ⭐ SCOPE ADDITION — the flat-slug kill rule (GSC recon, 2026-08-19 ~9:50pm)
GSC shows ~5.5K spam URLs still INDEXED (not the ~33 previously known). The dominant
class: root-level flat word-salad slugs on www with trailing slash (English casino
prose, German + Polish variants with NO gambling keyword). Two new SPAM_410 rule
classes in lib/legacy-url-rules.ts:
1. **Flat-slug rule:** dotless, root-level, single-segment path whose slug contains
   4 or more hyphens → 410. PROBED FACT: every real root-level route has at most 2
   hyphens (max is /roof-cost-calculator; full app/ root listing probed, nothing
   deeper). The guard's negative control (all 137 sitemap paths + a NEW control
   enumerating every real root-level app/ route directory) mechanically proves no real
   page matches. The rule applies ONLY to single-segment root paths — namespaced paths
   (/locations/x, /resources/x) are untouched.
2. **Keyword-token family:** split the slug on hyphens; 410 if any WHOLE TOKEN matches:
   casino, casinos, gambling, gamble, gambler, jackpot, jackpots, slots, spins,
   roulette, blackjack, poker, betting, wager, wagering, bookmaker, chumba, melbet,
   bally, igt, aviator, pinco, curacao, spielautomaten, spieleliste, kasyno.
   WHOLE-token matching only (never substrings — the Lane-1 casino-vs-casinos and
   unanchored-regex lessons). Every token validated against the negative control.
   WARNING: the word storm appears in real casino slugs — it is NOT in the family and
   must never be (roofing site).
Positive controls: add these 9 observed GSC slugs (orchestrator recon, quoted verbatim)
in both slash forms → 410 direct:
when-they-inserted-the-new-gaming-providers-bally-used-local-casino-floor-of-the-storm ·
diese-8-besten-online-casinos-via-schneller-ausschuttung-igt-spieleliste-im-kollation ·
because-the-alternatives-is-not-as-huge-just-like-the-position-products-the-grade-of-for-each-and-every-games-is-continually-higher ·
gambling-enterprises-was-mitigating-the-risk-because-of-the-setting-a-threshold-which-you-can-actually-earn-and-you-will-withdraw ·
jednym-ze-sposobow-ktorymi-zajrzyj-do-probuje-wybor-nakladania-osobistych-limitow ·
consecutive-avalanches-incorporate-a-modern-secure-multiplier ·
additionally-there-is-good-jackpot-extra-tied-to-the-fresh-new-coin-feature-having-multiple-jackpot-profile-available ·
day-after-day-you-can-read-the-the-newest-gambling-enterprise-see-your-everyday-100-totally-free-spins-towards-mr ·
chumba-gambling-establishment-us-are-a-personal-local-casino-to-own-recreation-perhaps-not-real-money-gamble
KNOWN CEILING (state in report, do not fix): dotted spam paths (.php/.html) still bypass
the matcher — future lane. Root flat slugs with 3 or fewer hyphens and no family keyword
still 404 — acceptable decay class.
