# WO — SEO LANE A6: Cary flagship build-out + Carrboro fold into Chapel Hill
**Date:** 2026-08-19 ~9:45pm ET · **Orchestrator:** OS60 (vault-agent) · **WO drafted on fable-5, highest available.**
**Mode:** PLUS-JUDGE · **Repo:** mabrey-roofing · **Branch:** `seo-a6-cary` cut from `master @ 56fcc11` (deploy tip, probed 9:17pm).
**Worktree:** `C:/Users/josep/Claude Gravity/.wt-seo-a6` (orchestrator preps).
**Floor surfaces touched:** customer-facing (production location pages). No prod-data, no money, no credentials.

## 0. WHY (context)
Cary is the highest-volume ranked-but-thin location page ("roofing contractors cary nc"
590/mo, position #55 — accepted by Google, judged thin). The book holds 73 completed
Cary roofs. Chapel Hill (59 book jobs) absorbs Carrboro (12 book jobs, zero search
volume — the towns-decision lock: Carrboro folds into Chapel Hill, never its own page).
Same evidence-backed pattern that shipped Burlington/Sanford/Wilson tonight-1
(read the Burlington entry in `lib/cities.ts` as THE exemplar before writing a word).

## 1. CURRENT BEHAVIOR (PROBED 2026-08-19 ~9:35pm)
- `lib/cities.ts` line 110: Cary entry. `neighborhoods: ["Preston", "MacGregor Downs",
  "Lochmere", "Regency Park"]`, `localProjects: []`, `localReviews: []`, `lead: "hoa"`,
  `titleKeyword: "Roofer"`, heroImage `/cities/cary.jpg`, NO metaDescription.
- 🔴 **HONEST-COUNTS GAP (the defect this lane fixes):** the live Cary copy claims work
  "across Preston, MacGregor Downs, Lochmere, and Regency Park." The book shows
  **Preston 0 · Regency Park 0 · MacGregor Downs 1 · Lochmere 1** — while Amberly (11)
  and Twin Lakes (11) go unmentioned.
- `lib/cities.ts` line 551: Chapel Hill entry. No mention of Carrboro anywhere.
  `localProjects: []`, has metaDescription.
- Prod: /locations/cary-nc and /locations/chapel-hill-nc both 200 in the 137-URL sitemap.

## 2. THE EVIDENCE PACK (PROBED from the CRM book via geocoded extraction, 2026-08-19 —
embedded here so you never re-derive; these are the ONLY counts you may print)
- **Cary: 73 completed roofs.** Neighborhood distribution (reverse-geocoded, top of book):
  **Amberly 11 · Twin Lakes 11 · Sherborne 6 · Stonewater 5 · Laurel Park 3 ·
  Royal Ridge 3 · Carpenter Village 3 (+1 "Legacy at Carpenter Village") · Weldon Ridge 2 ·
  Wyndfall 2 · Farmington Woods of Kildaire Farms 2 · The Reserve 2** · singles: West Park,
  Waterford, Scottish Hills, Trafalgar, Lochmere, MacGregor Downs, Gleneagle (+3 ungeocoded).
- **Chapel Hill: 59 completed roofs.** Top: Stoney Brook 4 · Briarcliff 3 ·
  Barrington Hills 3 · The Oaks 3 · Triple Crown Estates 3 · Dogwood Acres 2 ·
  Walnut Cove 2 · Estes Hills 2 · Lake Hogan Farms 2 · Governors Club 2 · Stoneridge 2 ·
  High Park 2 · Colonial Heights 2 · Blue Hill District 2 (+10 ungeocoded, + singles).
- **Carrboro: 12 completed roofs.** Downtown 5 · Andrews Heights 4 · Brighton Square 2 ·
  Berryhill 1.
- ⚠️ **Job DATES in the book are unreliable** (import stamped most rows 2026) — print
  TOTALS only, never years, never "since 20XX" derived from these rows.
- ⚠️ **Never print dollar figures** from the book (medians/values are internal).

## 3. TARGET BEHAVIOR
### 3a. Cary entry rewrite (in place, same slug/shape)
- `neighborhoods`: replace with the book-led list — Amberly, Twin Lakes, Sherborne,
  Stonewater, Carpenter Village, Kildaire Farms (order = evidence weight). Lochmere /
  MacGregor Downs may appear in PROSE (1 job each — phrase honestly: "and single
  projects in Lochmere and MacGregor Downs" or drop them), never in the headline list.
- `intro`: lead with the count — "73 completed roofs in Cary" — and the real
  neighborhoods, in the Burlington register (count → spread → what the town's housing
  actually is). Keep the HOA angle: Amberly, Carpenter Village, Twin Lakes and most
  planned Cary communities have architectural review; that stays Cary's defining
  roofing fact and the `lead: "hoa"` stays.
- `answer` (the .seo-answer Speakable target): rewrite to carry the 73-roof count + the
  real top neighborhoods + HOA paperwork + Town of Cary permits. Same single-paragraph
  shape as today.
- `stormHook` / `housingStock`: keep the canopy/tree thesis (true of Cary) but re-ground
  in the real neighborhoods (Amberly is a 2000s-2010s planned community west of
  Green Level; Twin Lakes sits off Davis Drive near the Morrisville line; Sherborne and
  Stonewater are West Cary). Any NEW factual claim about a neighborhood (era, location)
  gets a `// source:` comment with a URL above the entry, matching the Burlington/
  Sanford/Wilson convention — or stays general enough to need none.
- `localConsiderations` + `faqs`: update to reflect the real neighborhoods (HOA FAQ
  names Amberly/Carpenter Village/Twin Lakes instead of Preston/Lochmere). Keep 3 FAQs,
  same q/a shape. Add ONE new FAQ: "How many roofs has Mabrey completed in Cary?" —
  answer with 73 and the neighborhood spread.
- `metaDescription`: add one (≤155 chars, unique, carries "73" and 1-2 neighborhood names).
- `titleKeyword`: **leave unchanged** ("Roofer") — retitling is a separate decision
  (logged as a J-item; not yours).
- `localProjects` / `localReviews`: leave as `[]` (matches B/S/W pattern — evidence
  lives in prose).
### 3b. Chapel Hill entry update (in place)
- Fold Carrboro in as a served area: intro gains a sentence-or-two block — Chapel Hill's
  own book count (59 completed roofs, naming 3-5 real neighborhoods from §2) plus
  "and 12 more next door in Carrboro, from downtown to Andrews Heights."
- `answer`: extend with the counts + Carrboro mention (keep single-paragraph shape).
- `neighborhoods`: MERGE strategy — keep the current 6 (they're real Chapel Hill
  identity anchors) but replace up to 2 of the weakest-evidence ones with book leaders
  (e.g. keep Meadowmont/Southern Village/Northside/Franklin-Rosemary; add Stoney Brook +
  Briarcliff). Record which you swapped and why in the report.
- Add ONE FAQ: "Do you work in Carrboro?" — yes, 12 completed roofs, permits through
  the Town of Carrboro (VERIFY the permitting authority name online; source-URL comment).
- `housingStock`/`stormHook`: only touch if a book fact strengthens them; the canopy
  thesis is already strong. metaDescription: update only if Carrboro fits within 155.
### 3c. Nothing else
No new pages, no new routes, no sitemap changes (both pages already exist). Carrboro
gets NO page, NO sitemap entry, NO redirect.

## 4. ONLY-THESE-FILES
`lib/cities.ts`.

## 5. NEVER-TOUCH
Every other city entry (byte-identical — Burlington/Sanford/Wilson shipped 3 hours ago) ·
`CITY_COORDS` · `app/**` · `middleware.ts` · `scripts/**` · `tests/**` · `package.json` ·
`lib/business.ts`.

## 6. INVARIANTS
- **I1** Honest counts: every number printed comes from §2 verbatim. No invented counts, no year claims, no dollar figures.
- **I2** All 18 other city entries byte-identical (git diff touches only cary + chapel-hill objects).
- **I3** Pairwise 5-gram similarity < 40% (doorway-check gate — note its hardcoded city list may not include chapel-hill; if so, extend your LOCAL gate copy's CITY_SLUGS to cover both edited cities for your run, record the edit; Lane M is deriving the list properly in parallel and the orchestrator reconciles at merge).
- **I4** Delete-the-city-name signal check passes for both pages (≥4 local signals — the neighborhood names + counts guarantee this).
- **I5** `.seo-answer` shape preserved (the `answer` field stays a single paragraph, no markdown).
- **I6** No `!` anywhere. No "insured/licensed" language changes (the claim runs sitewide as-is — out of scope, settled).
- **I7** Type-safety: entries still satisfy the `City` type exactly (typecheck gate).

## 7. GATES (verbatim; server on :3210 for the last three)
```
npm run typecheck
npm run build
npx next start -p 3210        # background, then:
npm run doorway-check
npm run reachability-check
npm run spam-410-guard
```
Datastore: NONE. No env files.

## 8. CRITICAL ARTIFACT + ORACLE
The two rendered pages. Oracle: `curl localhost:3210/locations/cary-nc` contains "73"
and "Amberly" and "Twin Lakes"; contains NO "Preston" and NO "Regency Park";
`/locations/chapel-hill-nc` contains "59", "Carrboro", "12". Both 200. Sitemap count
unchanged at 137.

## 9. REPORT FORMAT
`wo/BUILD_REPORT_SEO_LANE_A6.md` in the worktree: gate tails + exit codes · oracle
proofs · the §3b neighborhood-swap decision · every `// source:` URL added · any I3
gate-extension edit. Commit on the branch. Do not push.

## 10. THE SIX NEVERS
You NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push ·
modify the gates (exception: the single I3-scoped edit, recorded). A red gate is fixed
in the code, never in the gate.

## BATON
kimi-baton on this WO before dispatch (orchestrator runs it).

---
# AMENDMENTS v2 (post-baton, 2026-08-19 ~10:10pm ET — kimi 10 findings, ledger beside receipts)
These OVERRIDE the sections above where they conflict.

## A. ⭐ THE VERIFY-OR-CUT LAW (F1 — governs every field)
Everything in this WO outside the §2 counts — including EVERY orchestrator parenthetical
(geography, eras, HOA/architectural-review assertions, permitting authorities, name
shortenings) — is an UNVERIFIED LEAD, not an approved fact. Print a specific claim in ANY
field (intro, answer, stormHook, housingStock, localConsiderations, faqs, metaDescription)
only with a builder-verified `// source:` URL from a primary/official source above the
entry; otherwise DELETE the specific and write the general sentence. "A planned community
in west Cary" needs no source; "west of Green Level" does. This lane exists to stop
unverified claims — do not swap four stale ones for four fresh ones.

## B. Claim bases + arithmetic (F6, F9)
- City labels come from the job book's customer-stated city (postal city) — the same basis
  the shipped Burlington/Sanford/Wilson counts use. "73 completed roofs in Cary" stands on
  that basis (precedent). NO derived aggregates: print only numbers that appear verbatim
  in §2 (never "across 18 neighborhoods", never sums you compute).
- "Legacy at Carpenter Village" MERGES into Carpenter Village (same community, its named
  sub-section) → Carpenter Village counts as 4 for ordering purposes, but print no
  per-neighborhood numbers in copy — counts stay city-level (73 / 59 / 12) only.
- `neighborhoods` array is EXACTLY these 6, this order:
  ["Amberly", "Twin Lakes", "Sherborne", "Stonewater", "Carpenter Village", "Laurel Park"]
  (ties at 3 broken alphabetically; Royal Ridge may appear in prose). "Kildaire Farms"
  drops from the array; prose may name the book's exact subdivision "Farmington Woods in
  Kildaire Farms" — never the bare parent name alone.

## C. Cary FAQ surgery, enumerated (F3 — current 3 probed by orchestrator)
Current FAQs: (1) HOA approval — names Preston/MacGregor Downs/Lochmere → REWRITE with the
§B array communities, subject to the verify-or-cut law for any per-community HOA claim
(safe general form: "many planned Cary communities require architectural review").
(2) tree-shaded material — KEEP, may lightly retouch, no city-false claims present.
(3) permits — KEEP as-is (existing live claim, predates this lane, do not extend it).
(4) NEW count FAQ — final count = exactly 4. Vary the question wording away from any
template (see §E). Sweep ALL pre-existing Cary copy for year claims and Preston/Regency/
zero-book-neighborhood work claims — "Regency" as a bare string must not survive anywhere.

## D. Chapel Hill honesty rule (F4 — orchestrator probed the book)
Book counts for the current CH anchors: Meadowmont 0 · Southern Village 0 · Glen Lennox 0 ·
Northside 0 · Franklin-Rosemary ~0 (3 ambiguous "Franklin" rows — treat as 0) · Gimghoul 0.
THE RULE: an anchor may stay ONLY as a geography/housing descriptor; no sentence may claim
completed work in a 0-count anchor. The current intro's "Mabrey Roofing works both: the
historic-district paperwork on one street, the covenant-matched architectural tear-off on
the next" reads as performed work — REWRITE to capability framing or re-ground it in the
book neighborhoods (Stoney Brook, Briarcliff, Barrington Hills, The Oaks). Neighborhood
swap (deterministic): keep Meadowmont, Southern Village, Northside, Franklin-Rosemary
Historic District (identity anchors, descriptors only); REPLACE Glen Lennox and Gimghoul
with Stoney Brook and Briarcliff (book leaders). metaDescription: update ONLY if the
Carrboro mention fits ≤155 chars without cutting existing meaning; otherwise leave it and
say so in the report.

## E. Anti-template law (F5)
Field SHAPE follows Burlington; sentence SKELETONS do not. Before gating: diff both edited
entries against burlington/sanford/wilson prose and rewrite any shared clause of 8+ words.
The count-FAQ question wording must be unique per city (B/S/W currently have NO count FAQ —
keep it that way by not cloning your Cary wording into Chapel Hill either). The
cary↔chapel-hill pair is YOUR highest similarity risk: same session, same author — write
them on different bones (Cary = HOA/planned-community spine; CH = canopy/heritage spine).

## F. Carrboro FAQ (F7)
The new CH FAQ: "Do you work in Carrboro?" — answer with the 12 completed roofs and the
downtown/Andrews Heights spread. DROP the permitting clause entirely (town-vs-county
authority for Carrboro is unverified; never guess permit guidance). No permit claim in the
Carrboro answer at all.

## G. Gate-edit semantics (F2) + I4 command (F10)
- "Local gate copy" = edit `scripts/doorway-check.mjs` IN PLACE in YOUR worktree. The only
  permitted diff: adding slugs/names to CITY_SLUGS + CITY_NAMES (chapel-hill is likely
  missing; cary is present). The edit stays UNCOMMITTED — revert before `git commit` so
  your content commit contains only lib/cities.ts. Paste the verbatim gate diff + before/
  after gate results into the report. The merge-time gate (Lane M's derived version) is
  authoritative; your local pass is provisional.
- I4's implementing command IS `npm run doorway-check` (its check #2 is the
  delete-the-city-name signal count) — no separate tool.

## H. Anchored oracle (F8 — replaces §8's substring checks)
- /locations/cary-nc rendered HTML: contains the exact strings "73 completed roofs" ·
  "Amberly" · "Twin Lakes"; contains NO "Preston", NO "Regency" (bare string), NO
  "MacGregor Downs" outside an explicitly-honest single-project mention if you chose to
  keep one.
- /locations/chapel-hill-nc: contains "59" adjacent to "roof" wording (quote the sentence
  in the report — no bare-substring pass), "Carrboro", "12 completed roofs" (or the exact
  count phrasing you shipped — quote it).
- Report table: EVERY printed number ↔ its §2 line, one row each.
- FAQ count check: Cary page renders exactly 4 FAQ questions; CH renders exactly 4 (3+1).
