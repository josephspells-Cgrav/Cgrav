# MABREY LAND CAMPAIGN — PLAN v1 (pre-Kimi)

Authored: 2026-08-05 ~7:25 PM ET · Author: OS46 (vault-agent, Opus 5) · Status: DRAFT — awaiting Kimi K3 adversarial audit, then final distill.

## 0. Mission

Sean Mabrey (Mabrey Roofing & Construction, NC GC license #84804) has **five current
construction customers who cannot find land** to build on. Deliver:

1. **A verified inventory** of currently-listed buildable residential lots in the target
   NC counties — structured data, not prose.
2. **A knowledge layer** — how land-buying actually works in NC (perc/septic, well vs
   municipal, zoning, flood, road frontage), county-by-county, adversarially verified.
3. **A deployed, searchable site** (Vercel) the five customers can be sent a link to:
   filter by county / price / acreage, every lot linking to its live listing source.

The research method is an ENHANCED ultra-research run: the skill's rigor laws applied to
an inventory-harvest pipeline via a custom Workflow engine, not the stock report engine.

## 1. Assumptions (every one revisable — Joseph calls Sean mid-flight)

| # | Assumption | Basis | Risk if wrong |
|---|---|---|---|
| A1 | All 5 customers want to build in NC | Joseph's directive | Low — Joseph said assume NC |
| A2 | Geography = Triangle-weighted: Wake, Johnston, Harnett, Franklin, Granville, Nash, Durham, Wilson + Cumberland/Hoke (Fayetteville corridor) | Mabrey service area (18 towns, Zebulon/Butner bounds) + Fayetteville appearing in live lead flow | Medium — wasted sweeps on wrong counties; mitigated: counties are a parameter, targeted re-sweep is cheap |
| A3 | Lot budget band ≈ $30k–$200k, 0.3–15 acres | Typical NC custom-build lot economics; customers already funding a build with a mid-size GC | Medium — filters are client-side, band only shapes sweep queries |
| A4 | "Current customers" = under contract / in pipeline for a BUILD, waiting on land | Plain reading | Low |
| A5 | Stick-built residential (not mobile/modular) — covenant restrictions against site-built are rare; against mobile are common and matter in reverse | Sean is a custom GC | Low |

## 2. Architecture — the enhanced run

**Orchestrator:** OS46 main loop (Opus 5). **Bulk workers: Sonnet 5** (Joseph's spec).
**Judgment stages: Opus** (rank/score/critic) + **one Fable agent** (final cross-county
synthesis) — per Joseph's "orchestrator-class agent in the tree" ask and the
no-downregulate-judgment law (fan-outs = research/deterministic on Sonnet; judgment high-tier).

### Phase map (single Workflow script, pipeline-first; ~22–28 agents total)

**P1 — Source census** (2× Sonnet, parallel)
- S1: statewide platform census — land-specialist platforms (LandWatch, Land.com,
  LandSearch, Lands of America, LandFlip), MLS-fed portals (Zillow, Realtor.com, Redfin,
  Homes.com land filters), auction/disposition (county surplus, Bid4Assets, GovDeals,
  ncdot residue), FSBO channels. Output: ranked source list + per-source query recipes +
  scrapeability notes.
- S2: per-county public-records census — GIS/parcel portals, tax assessor land records,
  planning/zoning portals, water/sewer service-area maps for each target county. Output:
  URL + capability per county (this feeds the knowledge layer AND off-market angles).

**P2 — Harvest sweeps** (1 Sonnet per county × 10 counties, then lens-rotated re-sweeps)
Each county agent: two-pass (broad platform search → narrow: specific towns, price band,
"owner financing", "perc approved", "septic approved", new-subdivision remnant lots).
Structured output ONLY (schema-forced): the LOT RECORD (§3). Include the listing-page
snippet supporting price+acreage — snippet is load-bearing for verification.
- **Saturation rule (per county):** a sweep round is dry if it adds <3 novel lots
  (novelty = not in the running dedupe set, keyed on URL + parcel/address). 2 consecutive
  dry rounds with ≥2 distinct lenses tried = county saturated. Hard cap 3 rounds/county.
- **Lens rotation:** platform lens → county-GIS/off-market lens → auction/FSBO lens.
- **Degraded ≠ saturated:** a round returning zero because fetches failed is stamped
  `degraded`, not dry; surfaced in the method note.

**P3 — Verification** (Sonnet, batched ~10 lots/agent)
Per lot, in order: (1) URL-health — dead/fabricated ⇒ killed; (2) field-faithfulness —
does the live page (or its snippet) support price, acreage, county ⇒ mismatch = corrected
or flagged; (3) status check — pending/sold/off-market ⇒ demoted to `stale-risk`, never
silently dropped. Blocked fetch (bot wall) ⇒ `unverified`, NOT killed — a paywall is not
a dead listing (execution-integrity law).

**P4 — Knowledge layer** (3× Sonnet + verification)
- K1: NC buildability mechanics — perc test / septic permitting process + timelines +
  costs, well vs municipal hookup, soil evaluation, what kills a lot (wetlands, easements,
  no road frontage, landlocked parcels).
- K2: county-by-county specifics — permit authority, current septic-permit wait times,
  zoning categories that allow single-family, minimum lot sizes on septic, water/sewer
  availability patterns per county.
- K3: off-market playbook — vacant-parcel GIS mining, out-of-county owner outreach,
  estate/probate, timber & farm brokers, developer remnant lots, expired listings, land
  agents worth calling. Honest about which channels an AI cannot execute (Facebook
  Marketplace, Craigslist gated) — listed as HUMAN CHANNELS, not faked.
- Load-bearing claims (anything a customer would act on: costs, timelines, legal
  requirements) get the ultra-research claim treatment: URL-health + self-consistency
  vote (3 stances) + snippet faithfulness. Kill/flag per the skill's verdict-floor law —
  no free-run self-critique, corrections only on named external signals.

**P5 — Judgment** (Opus + Fable)
- J1 (Opus): buildScore each surviving lot 0–100 against explicit rubric: utilities
  status (water/sewer vs well/septic-needed), price vs county norm ($/acre), access/road
  frontage, flood/wetland flags, restriction burden, drive-time to Triangle employment.
  Rubric applied mechanically; every score carries its why.
- J2 (Opus): completeness critic — which checklist items are thin, which counties
  under-delivered, what a re-sweep should target. Output drives (at most one) targeted
  gap round.
- J3 (Fable): final cross-county synthesis — the county guide prose, market-tightness
  read, per-customer matching once Sean's data lands, the honest gaps ledger.

**P6 — Distill + build + deploy** (OS46 inline, no agents)
Dataset → `site/lots.json` · site build → static, zero-framework · deploy → Vercel
(pre-authed CLI) · verify live (fetch + screenshot) · report with link.

### Stop conditions (global)
- Clean stop: all 10 counties saturated OR ≥60 verified-live lots with every county
  having had ≥2 lens-rotated rounds.
- Provisional stop: agent-budget floor (30 agents) or any county stuck degraded —
  reported as provisional with gaps enumerated, never silently.

## 3. THE LOT RECORD (schema, forced on every harvest agent)

```json
{
  "id": "slug", "title": "", "price": 0, "acres": 0.0, "pricePerAcre": 0,
  "county": "", "area": "", "address": "", "lat": null, "lng": null,
  "zoning": "", "utilities": {"water": "municipal|well|unknown", "sewer": "municipal|septic-needed|septic-installed|unknown", "electric": "at-road|unknown"},
  "roadFrontage": "yes|no|unknown", "floodNote": "", "restrictions": "",
  "percStatus": "approved|expired|none-stated|unknown",
  "source": "", "url": "", "listedDate": "", "snippet": "",
  "verifiedAt": "", "status": "verified-live|unverified|stale-risk|killed",
  "buildScore": null, "buildNotes": ""
}
```
Nulls allowed, fabrication banned: unknown = "unknown", never a guess. A lot with no
live URL does not ship to the site.

## 4. The deployment

- **Stack:** single static page + `lots.json`, vanilla JS client-side filtering. No
  framework, no build step. Loads in <1s on a phone (the customers are on phones).
- **Features v1:** filter county (multi), price range, min/max acres, utilities present,
  text search; sort price / $-per-acre / buildScore; lot cards → live listing link +
  Google Maps link; knowledge layer as a "How to buy land in NC" section + per-county
  accordions; freshness stamp on every lot + site-level "verified 2026-08-05" banner.
- **V2 (post-Sean-call):** per-customer preset views (`?c=smith` → their county/budget
  pre-filtered).
- **Host:** new Vercel project `mabrey-land` → `mabrey-land.vercel.app` (domain later if
  Sean wants it under mabreyroofing.com).
- **Honesty floors:** every lot links out to its source with the source named; site
  states Mabrey is not the listing broker and listings move fast; stale-risk lots are
  visually demoted, not hidden. No claim of MLS completeness.
- **Compliance note:** curated public listings with attribution + outbound links,
  no compensation tied to any land transaction, no brokerage language ("offered by",
  "exclusive") — informational courtesy to existing construction clients. NC license
  law risk minimal in this shape; Kimi asked to attack this.

## 5. Open questions (for Sean's call — plan proceeds on A1–A5 meanwhile)

1. Where does each of the 5 actually want to be? (county/town per customer)
2. Lot budget per customer? Total project budget? (bounds the price filter)
3. Acreage appetite — subdivision lot or acreage?
4. Any already working with a realtor? (changes off-market etiquette)
5. Timeline pressure — who's hottest?
6. Does Sean want this under his domain / branded?

## 6. Kimi audit scope (the baton)

Attack: coverage holes (sources, counties, off-market channels missed) · schema gaps
(fields a builder-GC would demand that are missing) · verification design (where can a
fake/stale lot slip through) · the stop conditions (where does this burn tokens without
value / stop too early) · NC-specific traps (perc wait times by county, water/sewer
moratoriums, subdivision-ordinance minimums) · the compliance note · the deployment spec
(searchability, phone UX, staleness handling) · sequencing risks · and the "author knows
what he meant" holes — anything underspecified that an executing agent would guess at.

## 7. Receipts & files

- This plan: `mabrey-land/PLAN_v1.md` → distilled to `PLAN_FINAL.md` post-Kimi
- Contract: `mabrey-land/ultra-research/land-contract.json`
- Kimi: `mabrey-land/wo/KIMI_BRIEF_LAND_PLAN.md` → `wo/KIMI_OUT_LAND_PLAN.md`
- Engine: `mabrey-land/engine/land_harvest_engine.js` (authored at distill)
- Site: `mabrey-land/site/` → Vercel `mabrey-land`
- Vault capture on completion (Mode D): `km-mabrey-land-campaign-2026-08-05`

---

## ADDENDUM-1 (Joseph, 2026-08-05 7:25 PM — mid-Kimi-audit; merge at distill)

**THE RADIUS RULE: search area = ≤1.5 hours drive from Raleigh.** Drive TIME to Raleigh
is the inclusion filter, not county membership. Consequences:

1. **County set expands and tiers:**
   - TIER 1 (core, ~≤45 min): Wake, Johnston, Harnett, Franklin, Durham, Orange,
     Chatham, Granville — one sweep agent each.
   - TIER 2 (45–90 min ring): Nash, Wilson, Vance, Person, Warren, Lee, Moore, Wayne,
     Sampson, Cumberland, Hoke, Alamance (+ edge slivers: Edgecombe, Pitt, Caswell,
     Randolph, Halifax) — grouped 2–3 counties per regional sweep agent (~5–6 agents),
     not 1:1, to hold the agent budget.
2. **Schema addition:** `driveMinToRaleigh` (integer, estimated) on every LOT RECORD.
   Lots estimated >90 min are excluded at verification, borderline (80–95) kept and
   flagged. Display drive time on every lot card — it is a first-class filter/sort on
   the site.
3. **Stop-condition denominators update** to the tiered structure: Tier-1 counties get
   the full 2-dry-rounds saturation treatment; Tier-2 regional groups get minimum 1
   round + gap-round eligibility per the completeness critic.
