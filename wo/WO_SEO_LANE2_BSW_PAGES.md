# WO_SEO_LANE2 — Burlington + Sanford + Wilson location pages

> Orchestrator: OS59, 2026-08-19 ~8:35pm ET. Mode: **PLUS-JUDGE** (Joseph's call — front-facing,
> revision cost exceeds judge cost). WO drafted on Fable 5 (highest available this seat).
> Repo: `C:/Users/josep/Claude Gravity/mabrey-roofing`. Deploy tip: `master @ a512224`.
> Worktree: `C:/Users/josep/Claude Gravity/.wt-seo-lane2`, branch `seo-lane2-bsw-pages`.
> 🔴 FLOOR CLASSIFICATION (required field): **customer-facing production site**. Prod-data: no.
> Money: no. Credentials: no. ⇒ kimi-baton pre-merge + live verification UNCONDITIONAL.
> Parent audit baton: KIMI_LEDGER_SEO_AUDIT_20260819-1810.md (F4 governs this lane: every
> town-specific factual claim carries a source or does not ship).

## 1. CURRENT BEHAVIOR — PROBED 2026-08-19 8:25-8:30pm (never recalled)
- Location pages are ONE dynamic route `app/locations/[city]/page.tsx`; URL contract
  `/locations/<slug>-nc` from `lib/locations.ts` (`LOCATION_PARAMS` ← `CITY_SLUGS`).
- ALL town data lives in `lib/cities.ts` as typed `City` entries (17 today). The type
  requires: slug · name · county · permitAuthority · permitNote · neighborhoods[] ·
  landmarks[] · intro · answer? · stormHook · housingStock · localConsiderations[] ·
  localProjects[] · localReviews[] · faqs[] · lead · titleKeyword? · heroImage ·
  metaDescription?. REQUIRED-UNIQUE prose fields are enforced distinct per city.
- `CITY_COORDS` (lib/cities.ts ~line 712) feeds the nearby-city cross-link mesh — a city
  without coords silently drops out of the mesh.
- The ANTI-DOORWAY GATE is real and blocking: `lib/doorway-gate.ts` — delete-the-city-name
  test (≥4 locally-true specifics must survive, `MIN_LOCAL_SIGNALS=4`) + pairwise
  similarity < 40% (`DOORWAY_SIMILARITY_LIMIT=0.4`); enforced data-level
  (tests/doorway-gate.spec.ts) AND rendered (scripts/doorway-check.mjs — current live max
  28.8%).
- Sitemap: `lib/sitemap-registry.ts` composes SITEMAP_ENTRIES; the 17 location URLs are
  emitted there (the registry composes some sections dynamically — PROBE the mechanism the
  existing location entries use and follow it EXACTLY; do not hand-add if they are
  auto-composed from CITY_SLUGS).
- `scripts/spam-410-guard.mjs` (lane-1) is a blocking gate: new routes must not match any
  SPAM_410 pattern. Pre-checked: burlington/sanford/wilson match nothing — the guard proves
  it mechanically.
- Live sitemap: 134 URLs. Target after this lane: 137.

## 2. TARGET BEHAVIOR
Three new live pages — `/locations/burlington-nc`, `/locations/sanford-nc`,
`/locations/wilson-nc` — indistinguishable in QUALITY from durham/raleigh (read both
entries in lib/cities.ts first; they are the bar), each passing the doorway gate at the
data level and rendered, present in the sitemap, wired into the nearby-mesh, cross-linked,
and carrying ONLY true, sourced local facts plus OUR first-party evidence below.

## 3. THE FIRST-PARTY EVIDENCE PACK (orchestrator-probed from the CRM book + rooftop
##    geocode reverse-lookup, 2026-08-19 — use these numbers VERBATIM; never inflate)
- **Burlington** (Alamance County): 26 completed jobs in the book — 23 full replacements,
  2 repairs (1 unvalued). Subdivisions with completed work: Rockwood Acres (5), Brookwood (2),
  Westview Terrace (2), Crestwood, Country Club Forest, Altamahaw, The Glen, Knollwood,
  Pleasant Grove. NEARBY-WORK satellites to fold in as named mentions (NOT separate pages):
  Gibsonville 10 jobs (Westbrook Forest ×3) · Whitsett 8 · Graham 4 (incl. Saxapahaw) ·
  Elon 3. Alamance-cluster total ≈ 51 jobs.
- **Sanford** (Lee County): 18 jobs — 17 replacements, 1 repair. Subdivisions: Carolina
  Lakes (4), Asbury (2), Owls Nest.
- **Wilson** (Wilson County): 14 jobs — 13 replacements. Subdivisions: Bel-Air Forest (3),
  Boswellville (2), Crestview, White Fox, Dixie, Belle Meade, British Woods.
- Copy usage: counts may appear as exact figures ("26 completed roofs in Burlington") or
  honest floors ("more than 20") — NEVER a higher round-up. Subdivision names are the
  local-signal gold: use them in neighborhoods[], intro, and prose naturally.
- 🔴 PRIVACY FLOOR: zero customer names, zero street addresses, zero job values on the
  page. Aggregates and subdivision names only. localProjects/localReviews stay `[]` (data
  for them arrives later from Sean; do not invent entries).

## 4. TOWN-FACT RESEARCH (builder task — every claim sourced or dead, baton-F4 law)
For each town, research and VERIFY with a citable public source (record source URLs as
code comments above each City entry — comments, never rendered):
- County + permit authority + a true permitNote (Burlington: City of Burlington
  Inspections / Alamance County for unincorporated; Sanford: City of Sanford–Lee County;
  Wilson: City of Wilson / Wilson County — VERIFY all three, do not trust this parenthesis).
- stormHook: a REAL, dated, verifiable weather event or pattern (candidates to verify:
  the April 2011 tornado outbreak's Sanford EF3 — already referenced truthfully in the
  raleigh entry; Wilson's hurricane exposure — eastern NC, Fran/Floyd/recent events;
  Alamance hail/wind events incl. the Sep-2025 storm season that spiked search demand).
  NOAA/NWS storm-events database is the source of record. NO invented dates, damage
  claims, or wind speeds.
- housingStock: true architectural character (e.g. Burlington's mill-town housing from
  the textile era — same class of fact as durham's Erwin Mills entry; Wilson's tobacco-town
  historic districts). Verifiable from city/county/historic-register sources.
- faqs: 3 per town, town-specific (permit process, storm/insurance pattern, housing-stock
  question). Answers true and locally distinct — a FAQ that works with the city name
  swapped is a defect.
- `lead` field: pick per town from the real character (e.g. burlington "lifecycle" or
  "storm", sanford "storm", wilson "storm" or "heritage") — not all three the same.
- titleKeyword: per the keyword-calibration convention — Burlington: "Roofing Companies"
  had 90/mo vs "roofing burlington nc" 140 generic; use existing entries' style and pick
  defensibly; state the choice in the build report.

## 5. ONLY THESE FILES
- `lib/cities.ts` — 3 new City entries + 3 CITY_COORDS entries (+ satellite mentions live
  INSIDE the burlington entry's prose/neighborhoods, not as new cities).
- `lib/sitemap-registry.ts` — ONLY if the probe in §1 shows location entries are hand-listed
  there; if auto-composed, no edit (state which in the report).
- `wo/BUILD_REPORT_SEO_LANE2.md` — your report.
- NOTHING else. No component edits (template law), no route edits, no middleware, no new
  files except the report.

## 6. NEVER-TOUCH / INVARIANTS (each with its enforcement)
- I1 — no component/route changes: the diff shows lib/* + wo/* only. Enforced by review.
- I2 — doorway gate passes at BOTH levels: data (npm test → tests/doorway-gate.spec.ts
  covers CITIES) and rendered (scripts/doorway-check.mjs < 40% on ALL pairs incl. the 3 new).
- I3 — every REQUIRED-UNIQUE prose field is genuinely distinct across all 20 cities.
- I4 — no fabricated facts: every town-specific claim has a source-URL comment. Judges
  will spot-verify. An unsourced specific = failed round.
- I5 — privacy floor (§3). Enforced by grep: no book customer surname may appear in the diff.
- I6 — honest counts: page numbers ≤ the evidence-pack numbers, never above.
- I7 — copy laws: no em dashes in rendered copy · no exclamation points · never the word
  "insured" or "licensed and insured" (standing NC-compliance law; "licensed general
  contractor" phrasing exists on the site and is fine where already used — do not add new
  licensing claims) · no "#1"/"best" self-claims.
- I8 — the 3 new slugs must not collide with SPAM_410 (spam-410-guard proves it).

## 7. GATES (run ALL from the worktree; verbatim tails + exit codes in the report)
```
npm run typecheck
npm run build
npm run spam-410-guard        (needs `npx next start -p 3210` against YOUR build)
npm run doorway-check         (same server)
npm run reachability-check    (same server)
npx playwright test tests/doorway-gate.spec.ts   (data-level gate, if runnable standalone; else npm test equivalent — state what you ran)
```

## 8. CAPTURE MATRIX (for the blind identity pass — you produce, judges consume)
With your build running on :3210, capture via the repo's playwright:
- each new page ×2 viewports (390×844 full-page, 1440×900 full-page)
- plus `/locations/clayton-nc` (existing sibling, same viewports) as CONTROL
→ 8 PNGs to `wo/captures/` with names like `burlington-mobile.png`. Do not analyze them
yourself — they are for the fresh-eyes judges.

## 9. THE SIX NEVERS
Builders NEVER: deploy · touch env files · read a DATABASE_URL · run migrations · push ·
modify the gates (tests, playwright config, scripts/*.mjs, package.json, CI). A red gate is
fixed in the DATA, never in the gate.

## 10. DELIVERABLES
1. Commits on `seo-lane2-bsw-pages`, prefix `seo-lane2:`. No push.
2. `wo/BUILD_REPORT_SEO_LANE2.md`: per-file changes w/ line cites · the sitemap-mechanism
   finding (§5) · titleKeyword choices w/ reasoning · source URL list per town · verbatim
   gate tails + exit codes · capture-matrix file list · anything under-specified, one line each.
3. Final message: 5-line TLDR.
