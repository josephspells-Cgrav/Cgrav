# KIMI BRIEF — Adversarial audit of the Mabrey Land Campaign plan

You are Kimi K3 running headless at MAX effort as an independent co-architect. You have
NO session context — that blindness is your value: you catch "the author knows what he
meant" holes. Audit the plan below as a hostile reviewer. Do not rewrite it. Do not be
polite. Every finding must be CONCRETE — name the section, the hole, the failure it
causes, and the minimal fix.

## Context (all you get)

- Sean Mabrey: NC general contractor (license #84804), Raleigh/Triangle market
  (Wake + Johnston core: Raleigh, Cary, Apex, Garner, Clayton, Knightdale,
  Fuquay-Varina, Zebulon, Wendell; Fayetteville also appears in his lead flow).
- Five CURRENT construction customers are build-ready but cannot find land.
- Deliverable: (1) verified inventory of currently-listed buildable residential lots in
  target NC counties, (2) verified "how to buy land in NC" knowledge layer,
  (3) a deployed static searchable site (Vercel) customers get a link to.
- Execution: a Claude Workflow — Sonnet 5 harvest/verify workers, Opus judge,
  Fable final synthesis, orchestrated by an Opus 5 main loop. Workers have web
  search + page-fetch + Firecrawl scraping. Big listing portals (Zillow/Realtor)
  often block automated fetches. Joseph (the operator) will supply the five
  customers' actual locations/budgets MID-RUN via a phone call to Sean.
- The full plan text is at the end of this brief.

## Your audit targets — answer EVERY numbered item

1. **Coverage holes.** Sources, channels, or county-level strategies the plan misses
   that a land-hungry buyer's agent would use. Off-market especially.
2. **Schema critique.** Fields a builder-GC or land buyer needs that the LOT RECORD
   lacks. Fields that will never be reliably populated and should be cut or demoted.
3. **Verification design.** Where does a fake, stale, duplicate, or wrong-county lot
   slip through? Is the blocked-fetch => `unverified` policy exploitable into shipping
   junk? What is the minimum change that closes each hole?
4. **Stop conditions.** Where does this design burn agents without adding lots, and
   where does it stop before real inventory is found? Attack the numbers (<3 novel =
   dry, 2 dry rounds, cap 3, >=60 global floor).
5. **NC-specific traps.** Perc/septic realities, county health-department wait times,
   water/sewer moratoriums, subdivision-ordinance minimum lot sizes, family-subdivision
   exemptions, wetlands/USACE, DOT driveway permits — what does the plan not know it
   doesn't know?
6. **Compliance.** The plan claims a curated-listings site with outbound attribution,
   no transaction-tied compensation, avoids brokerage language. Attack that: NC real
   estate license law, MLS/IDX display rules, copyright in listing photos/descriptions,
   scraped-content ToS exposure. What must the site NOT do?
7. **Deployment spec.** Searchability, phone UX, staleness handling, trust signals for
   a homeowner clicking a link their contractor texted them. What is missing or wrong?
8. **Sequencing + mid-run mutation.** Joseph injects real customer geography/budgets
   mid-run. Where does the plan handle that badly?
9. **Underspecification.** Every place an executing agent would have to GUESS. List
   them exhaustively — each is a defect.
10. **The one thing.** If you could force exactly one change before execution, what is
    it and why.

## Output format (write to stdout, markdown)

- `## VERDICT` — one paragraph: is this plan sound to execute after fixes, yes/no.
- `## FINDINGS` — numbered F1..Fn, each: severity (LAUNCH-KILLER / HIGH / MED / LOW) ·
  section attacked · the hole · concrete failure scenario · minimal fix.
- `## ANSWERS` — your answers to audit targets 1-10, numbered.
- `## MISSING SOURCES` — flat list of specific sources/portals/strategies to add.

---

# THE PLAN UNDER AUDIT (PLAN_v1.md, verbatim)

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

(You are executing this audit now.)

## 7. Receipts & files

- This plan: `mabrey-land/PLAN_v1.md` → distilled to `PLAN_FINAL.md` post-Kimi
- Contract: `mabrey-land/ultra-research/land-contract.json`
- Kimi: `mabrey-land/wo/KIMI_BRIEF_LAND_PLAN.md` → `wo/KIMI_OUT_LAND_PLAN.md`
- Engine: `mabrey-land/engine/land_harvest_engine.js` (authored at distill)
- Site: `mabrey-land/site/` → Vercel `mabrey-land`
- Vault capture on completion (Mode D): `km-mabrey-land-campaign-2026-08-05`
