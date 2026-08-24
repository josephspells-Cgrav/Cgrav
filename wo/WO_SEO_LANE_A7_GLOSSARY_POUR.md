# WO — SEO LANE A7: glossary pour (31 new terms)
**Date:** 2026-08-19 ~9:40pm ET · **Orchestrator:** OS60 (vault-agent) · **WO drafted on fable-5, highest available.**
**Mode:** PLUS-JUDGE · **Repo:** mabrey-roofing · **Branch:** `seo-a7-glossary` cut from `master @ 56fcc11` (deploy tip, probed 9:17pm).
**Worktree:** `C:/Users/josep/Claude Gravity/.wt-seo-a7` (orchestrator preps).
**Floor surfaces touched:** customer-facing (new public pages on the production site). No prod-data, no money, no credentials.

## 0. WHY (context)
The glossary punches above its weight — `/resources/glossary/fascia` ranks #26 and #50
("sub fascia", 1,000/mo) while the site's money pages sit #19-55. Glossary terms are
city-agnostic answer-units that rank effortlessly and feed AI-search citation. The
2026-08-19 SEO audit board item A7: pour ~30 more terms. Zero-dependency, lowest-risk lane.

## 1. CURRENT BEHAVIOR (PROBED 2026-08-19 ~9:35pm)
- `lib/articles/glossary.ts` exports `GLOSSARY_TERMS: GlossaryTerm[]` — exactly **20 terms**:
  roofing-square, flashing, underlayment, drip-edge, ridge-vent, soffit, fascia,
  roof-valley, roof-decking, ice-and-water-shield, granules, class-4-shingles, tear-off,
  roof-overlay, actual-cash-value, replacement-cost-value, roof-pitch, starter-strip,
  pipe-boot, roof-deductible.
- Type (`lib/types/resources.ts`): `{slug, term, shortAnswer, body, relatedMoneySlug}`.
- Routes: `app/resources/glossary/page.tsx` (index) + `app/resources/glossary/[term]/page.tsx`.
- Prod sitemap: 137 URLs. READ `lib/sitemap-registry.ts` / `app/sitemap.ts` FIRST and
  report whether glossary terms auto-compose into the sitemap from `GLOSSARY_TERMS`
  (expected, matching the CITY_SLUGS pattern) — if they do NOT, adding sitemap coverage
  for the new terms IS in scope, following whatever mechanism the existing 20 use.

## 2. TARGET BEHAVIOR
**31 new entries appended to `GLOSSARY_TERMS`** (total 51), each rendering at
`/resources/glossary/<slug>`, listed on the glossary index, present in the sitemap
(137 → 168 if auto-composed).

### The term list (final — do not add, drop, or substitute):
sub-fascia · architectural-shingles · three-tab-shingles · ridge-cap-shingles ·
hip-roof · gable-roof · dormer · eave · rake-edge · step-flashing · counter-flashing ·
kick-out-flashing · chimney-cricket · gutter-apron · soffit-vent · gable-vent ·
turbine-vent · attic-baffles · shingle-blistering · shingle-curling · nail-pops ·
roof-sagging · hail-bruising · wind-uplift · storm-chaser · recoverable-depreciation ·
xactimate · roof-warranty · algae-resistant-shingles · re-decking · shingle-exposure

(`sub-fascia` first in priority — 1,000/mo, the page /fascia already part-ranks for it.)

### Voice + shape laws (each entry):
- `shortAnswer`: 60-100 words, ANSWER-FIRST — the first sentence defines the term
  completely. Match the register of the existing 20 exactly (read at least 5 before
  writing; `roofing-square` and `flashing` are the exemplars).
- `body`: ~250-350 words, paragraphs separated by `\n\n`, 5-7 paragraphs. Pattern of the
  existing 20: mechanism → why it matters → the homeowner takeaway. Plain-English,
  homeowner-first, zero hype, no exclamation points.
- `relatedMoneySlug`: MUST be a slug already used by the existing 20 entries (derive the
  valid set from the file: /roofing-cost, /services/roof-repair, /services/roof-replacement,
  /services/roof-inspection, /services/gutters — verify by reading; never invent a route).
  Pick the genuinely-nearest money page per term.
- **NEVER city-tagged** (no Raleigh/Durham/Cary/NC-specific claims inside a definition —
  the doorway trap; the existing entries' comment header states this law). Climate
  references stay generic ("hot, humid summers", "wind-driven rain").
- **Insurance terms (recoverable-depreciation, xactimate, roof-warranty): factual and
  neutral.** Explain what the thing is and how it works. NEVER advise disputing an
  adjuster, never promise claim outcomes, never suggest the contractor absorbs
  deductibles (NC law prohibits deductible waiving — do not even mention the practice).
  Match the tone of the existing actual-cash-value / replacement-cost-value entries.
- **storm-chaser**: a BLOG post `spotting-a-storm-chaser` already exists. The glossary
  entry is a DEFINITION, not the narrative. Keep 5-gram overlap under the 40% gate —
  read the blog post first and write the definition on different bones.
- No superlatives, no invented statistics, no fabricated code citations. If a claim
  needs a number (e.g. hail size, warranty years), keep it as a defensible range
  ("commonly 25 to 50 years") — never a precise invented figure.

## 3. ONLY-THESE-FILES
`lib/articles/glossary.ts` · (only if §1's sitemap probe shows glossary is NOT
auto-composed: the one file the existing 20 use for sitemap membership).

## 4. NEVER-TOUCH
`app/**` (the [term] route renders from data — no component edits) · `lib/cities.ts` ·
`middleware.ts` · `lib/legacy-url-rules.ts` · `scripts/**` · `tests/**` ·
`package.json` · existing 20 entries (byte-identical — append only).

## 5. INVARIANTS
- **I1** Existing 20 entries byte-identical (verify: `git diff` shows only additions inside the array + nothing above the first new entry).
- **I2** All 51 slugs unique, kebab-case, URL-safe.
- **I3** Pairwise 5-gram similarity < 40% across ALL glossary pages and against the article/blog corpus — enforced by `npm run doorway-check` ⚠️ **known gap: the gate's GLOSSARY list is hardcoded at the old 20 (Lane M is fixing that in parallel).** You must ALSO run the similarity check over your new terms: if Lane M's derived version is not yet merged, extend your LOCAL copy of the gate's GLOSSARY array to all 51 for your gate run (this is a scoped exception to never-touch-gates, granted here because the hardcoded list IS the defect — record the exact edit in the report; the orchestrator will reconcile with Lane M's derived version at merge).
- **I4** Every `relatedMoneySlug` resolves to a real route (build succeeds + reachability-check passes).
- **I5** No `!` characters in any shortAnswer or body.

## 6. GATES (verbatim, from the worktree; server on :3210 for the last three)
```
npm run typecheck
npm run build
npx next start -p 3210        # background, then:
npm run doorway-check
npm run reachability-check
npm run spam-410-guard
```
Datastore: NONE. No env files.

## 7. CRITICAL ARTIFACT + ORACLE
The 31 rendered pages. Oracle: `curl localhost:3210/resources/glossary/<slug>` returns
200 for all 31 AND each page's rendered text contains its own `term` string in an
h1/heading; the glossary INDEX page lists all 51. Report the count-proof (e.g. grep the
index HTML for each slug, print 51/51).

## 8. REPORT FORMAT
`wo/BUILD_REPORT_SEO_LANE_A7.md` in the worktree: gate tails + exit codes · 31/31 page
oracle proof · sitemap composition finding from §1 · the I3 gate-extension edit if made ·
word counts per entry (shortAnswer + body) as a table. Commit on the branch. Do not push.

## 9. THE SIX NEVERS
You NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push ·
modify the gates (exception: the single I3-scoped edit above, recorded). A red gate is
fixed in the code, never in the gate.

## BATON
kimi-baton on this WO before dispatch (orchestrator runs it).

---
# AMENDMENTS v2 (post-baton, 2026-08-19 ~10:00pm ET — kimi 15 findings, ledger beside receipts)
These OVERRIDE the sections above where they conflict.

## A. Composition facts (orchestrator-probed at source — no longer builder questions)
- Sitemap AUTO-COMPOSES: `lib/sitemap-registry.ts:98` maps `GLOSSARY_SLUGS` (from `lib/resources.ts`, derived from `GLOSSARY_TERMS`). Appending entries flows to sitemap automatically. §3's conditional sitemap edit is DELETED — `lib/articles/glossary.ts` is the ONLY file you touch, unconditionally.
- Index page (`app/resources/glossary/page.tsx:47`) sorts `GLOSSARY_TERMS` **alphabetically by term** — array append order does not affect display. Append in the §2 list order.
- `[term]` route uses `generateStaticParams` from `GLOSSARY_SLUGS` — all 31 pages build statically.

## B. Oracle extensions (F1, F2, F15 — mechanical, all required in the report)
1. `curl -s localhost:3210/sitemap.xml | grep -o '/resources/glossary/[a-z0-9-]*' | sort -u | wc -l` → must print **52** (51 terms + the index page path collapses to distinct matches; report the actual list count and show the 31 new slugs each present).
2. Content-presence: for each of the 31 slugs, grep the rendered HTML for the first 8 words of that entry's own shortAnswer — 31/31 must match. Empty-body pages cannot pass.
3. `grep -c '!'` over the 31 new entries' shortAnswer+body strings → must print 0.

## C. Gate-extension rules (F3 — replaces I3's parenthetical)
1. First check whether `scripts/doorway-check.mjs` in YOUR worktree already derives GLOSSARY from `lib/articles/glossary.ts` (Lane M may have merged). If derived: no edit needed.
2. If hardcoded: extending the local copy to all 51 slugs is **MANDATORY** before your doorway-check run counts.
3. The ONLY permitted diff: adding slug strings to the GLOSSARY array. Threshold (0.4), tokenizer, and every other line byte-identical. Paste the verbatim `git diff` of the script into the report.
4. The gate edit stays **UNCOMMITTED** (local-only). Your content commit must not contain it.
5. Run the gate BEFORE and AFTER your extension; both results in the report (proves the gate itself didn't change behavior on the existing corpus).

## D. Differentiation spines (F4, F5, F6 — write each cluster on these axes; the gate is a verifier, not your discovery mechanism)
- `recoverable-depreciation`: READ `acv-vs-rcv-roof-insurance-claims` article + the ACV/RCV entries FIRST. Define via the MECHANICS OF COLLECTING (documentation, completion proof, timelines) — never re-derive ACV/RCV math.
- `sub-fascia`: structural framing lumber BEHIND the fascia, rot/re-decking-adjacent. Cross-reference fascia in one clause, never re-define it. (Cannibalization risk vs /fascia considered and accepted by the orchestrator — the query deserves its own answer-unit.)
- Flashing cluster: `step-flashing` = the shingle-woven wall intersection · `counter-flashing` = the masonry-embedded overlap that caps step flashing · `kick-out-flashing` = the bottom-of-wall piece that throws water into the gutter. Each defined by its POSITION and failure mode, not by what flashing is.
- Vent cluster: `soffit-vent` = intake · `gable-vent` = passive end-wall exhaust (and why ridge+soffit often replaces it) · `turbine-vent` = wind-driven exhaust · `attic-baffles` = the foam channels that keep insulation from choking intake. One job each.
- `re-decking` = the deck-replacement EVENT during tear-off (when/why/how it's priced) — not what decking is, not what tear-off is.
- `gutter-apron` = the eave-specific drip-edge variant shaped to reach INTO the gutter trough; contrast with drip-edge in one clause.
- `architectural-shingles` vs `three-tab-shingles`: define each by its own construction + buyer question; the comparison lives in ONE sentence per entry, not the spine of both.

## E. Scope + neutrality (F8, F10, F11, F12, F14)
- Insurance-ADJACENT scope for the neutrality law now includes: recoverable-depreciation, xactimate, roof-warranty, hail-bruising, wind-uplift, storm-chaser.
- `relatedMoneySlug` for all six insurance-adjacent terms = `/services/roof-inspection` (designated fallback — an inspection is the honest next step). All others: genuinely-nearest from the existing set.
- Display strings pinned: Sub-Fascia · Architectural Shingles · Three-Tab Shingles · Ridge Cap Shingles · Hip Roof · Gable Roof · Dormer · Eave · Rake Edge · Step Flashing · Counter-Flashing · Kick-Out Flashing · Chimney Cricket · Gutter Apron · Soffit Vent · Gable Vent · Turbine Vent · Attic Baffles · Shingle Blistering · Shingle Curling · Nail Pops · Roof Sagging · Hail Bruising · Wind Uplift · Storm Chaser · Recoverable Depreciation · Xactimate (trademark casing, exactly this) · Roof Warranty · Algae-Resistant Shingles · Re-Decking · Shingle Exposure.
- Hard bounds: shortAnswer 60-100 words, body 250-360 words, counted by whitespace split. The §8 table uses that counter.
- Do NOT run a formatter over the file — match existing formatting by hand (I1 protection).

## F. STOP-AND-ESCALATE (F7)
If any invariant cannot be satisfied honestly (a pair that can't get under 40% after two rewrites, a contradiction between sections), STOP and write the blocker into your report. Never resolve a contradiction by improvising outside §3's file list. A stalled honest report beats a shipped workaround.
