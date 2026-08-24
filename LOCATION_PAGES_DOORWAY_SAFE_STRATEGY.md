# Per-Town Location Pages for King Maker: Definitive Strategy

## 1. Honest Framing: What "0% Risk" Actually Means

Literal zero percent doorway-page penalty risk is not achievable for any programmatically generated per-town location page system. This is not a legal hedge â€” it is a structural fact about how Google's enforcement works.

Google's SpamBrain operates probabilistically across a site's full page set, not as a binary pass/fail per page. Two sites with architecturally identical location pages can receive different treatment based on domain history, GBP signal alignment, review geography, link profile, and the competitive context of their queries. The [March 2024 spam update](https://developers.google.com/search/blog/2024/03/core-update-spam-policies) and [December 2024 spam update case studies (GSQI)](https://www.gsqi.com/marketing-blog/google-december-2024-spam-update-case-studies/) both show ongoing enforcement, not a one-time sweep. The [August 2025 spam update (Sterling Sky)](https://www.sterlingsky.ca/august-2025-spam-algorithm-update/) hit contractor sites again, specifically compounding losses for sites that had old exact-match backlink anchors pointing at thin city pages.

**The honest risk model has three states:**

| State | Page Characteristics | Enforcement Risk |
|---|---|---|
| LOW | Real completed job photo from that town + real review mentioning that town + permit jurisdiction fact + Census housing data cited numerically | Unlikely to trigger automated enforcement; would survive a manual quality review |
| MODERATE | Auto-generated data spine only (Census + NOAA + permit link + drive time + subdivision list) â€” no job photo, no local review | Better than city-swap boilerplate, but does not clear the "real operational data" bar that post-2024 enforcement signals indicate is operative |
| HIGH | LLM-generated city descriptions around data tokens, no job photo, no local review, structurally identical sentence patterns across 30 pages | Functionally identical to pages that lost 63-80% rankings in March 2024 and December 2024 enforcement waves |

**The defensible target to communicate to clients:** "Built to survive a manual Google quality review." A quality rater looking at the full page set should not be able to reasonably conclude these pages exist primarily to capture [trade] + [city] queries rather than to serve real visitors in those cities. That standard is achievable. Zero risk is not.

The practical floor: **index only towns where you can answer YES to both â€” did we complete a job there in the past 24 months, AND do we have at least one review from a customer in that town?** A 10-page footprint built on real evidence ranks better and risks less than a 30-page footprint where 20 pages are data-injected templates with no operational history behind them.

---

## 2. Page Content Architecture: The ~80-90% Uniqueness Breakdown

The architecture has two layers: a **Tier A operational data layer** (required for indexing â€” this is what actually passes the swap test) and a **Tier B public-data texture layer** (supporting context â€” real, town-specific, but not sufficient alone). Shared template structure fills the remaining scaffold.

The target ratio is: Tier A + Tier B = 40-60% of page word count that genuinely fails the swap test. Shared template (service descriptions, brand list, FAQ boilerplate, contact CTA, schema) can fill the remaining 40-60%. The claim of "80-90% unique" in the brief is achievable in appearance but misleading if Tier A content is absent â€” you can hit the word-count percentage with Tier B alone and still have a doorway page at the structural level.

### Block-by-Block Architecture

---

#### BLOCK 1: Local Hero / Opening Statement
**Unique-per-town: YES â€” TIER A REQUIRED**
**Source: Client-provided**
**Risk level: SAFE when real, RISKY when LLM-generated**

The opening 100-150 words must contain at least one statement that fails the swap test by construction. The correct pattern:

> "We replaced 14 roofs in Cary in 2024 â€” mostly in Lochmere and Preston Forest, where 1990s architectural shingles are hitting their 30-year failure window. Our crew is based 11 minutes from Cary Town Hall."

Compare to the RISKY pattern:

> "Cary NC homeowners face unique roofing challenges given the area's climate and aging housing stock." [RISKY â€” LLM boilerplate, passes swap test, flagged by SpamBrain]

**Implementation:** `LOCATION_CONTENT[town].intro` must require a job-count field (`jobCount`) and a primary subdivision reference (`primarySubdivision`). The template renders these as inline facts, not as LLM-written prose. If `jobCount` is null and `primarySubdivision` is null, the page does not publish indexed.

---

#### BLOCK 2: Completed Project Evidence
**Unique-per-town: YES â€” TIER A REQUIRED**
**Source: Client-provided (non-negotiable)**
**Risk level: SAFE (irreproducible by construction)**

One or more completed job entries from that specific town: real photo (geo-tagged EXIF preferred), job type, approximate neighborhood or street descriptor (no full street address required), approximate date, scope of work.

> "April 2024 â€” Complete shingle replacement, Haddon Hall subdivision, Apex. 2,400 sq ft, GAF Timberline HDZ in Charcoal, pulled Wake County permit #2024-04-8817."

This is structurally undefeatable. A job photo on Creekwood Drive in Apex cannot be reused in Holly Springs. Permit numbers are verifiable. This is the single component that most clearly satisfies Google's [E-E-A-T "Experience" signal](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t) for local service pages.

**DataPins pattern reference:** [DataPins documents](https://www.datapins.com/seo-for-multiple-cities/) that contractor technician check-ins at each jobsite â€” generating a geo-tagged pin with real photo + job description + schema markup that auto-publishes to the city page â€” produce content that is literally unreplicable by competitors. This is the model to implement or approximate.

**Minimum for indexing:** 1 job entry, completed within the past 24 months.

---

#### BLOCK 3: Local Customer Reviews
**Unique-per-town: YES â€” TIER A REQUIRED**
**Source: GBP API extraction (partial auto) + client tagging**
**Risk level: SAFE when real; RISKY when synthesized or approximated**

Pull from Google Business Profile API filtering for reviews that mention the town name, a local neighborhood, or a street. Display 1-3 reviews. Schema `Review` markup on each.

The adversarial reality: most solo contractors have 15-40 total reviews spread across 30 towns. Many reviews say "great job" with no location detail. The usable subset per town is often zero at launch.

**Correct implementation:**
- `LOCATION_CONTENT[town].reviews` â€” array populated from GBP API pull filtered by reviewer city OR keyword match (town name, subdivision name, cross-reference with job addresses)
- If array is empty AND no job photo exists â†’ page does not publish indexed. Full stop.
- If array has a review but it does not mention the town â†’ include it but do not treat it as a primary swap-test differentiator; it is supporting trust signal only

**What is explicitly RISKY and must never happen:** An LLM summarizing "what customers in Apex tend to say" from adjacent town reviews. This is scaled content abuse by definition.

---

#### BLOCK 4: Local Housing Stock Context
**Unique-per-town: YES (for non-metro towns) / DEGRADED (for towns sharing a Census grain)**
**Source: Auto-generated â€” [Census ACS 5-Year API](https://www.census.gov/data/developers/data-sets/acs-5year.html), variables B25035_001E (median year built) and B25001_001E (housing units)**
**Risk level: SAFE when the number drives qualitatively different copy; RISKY when used as a sentence template**

The data is genuinely place-specific at the Census "place" geography level. The risk is how it is rendered.

**RISKY pattern (template sentence, SpamBrain detects):**
> "67% of Apex homes were built before 2000 â€” aging HVAC systems are the #1 service call here."

**SAFE pattern (the number drives a qualitatively different recommendation):**
> "Apex's median home build year is 1998 (Census ACS 2022). That means most homes are running original R-19 attic insulation â€” well below NC's current R-38 code requirement â€” which is the leading cause of HVAC oversizing callbacks we see in that market."

The difference: the SAFE pattern uses the specific number to produce a town-specific recommendation. Swap Apex for Cary (median build 2003) and the recommendation changes â€” R-22 original insulation, a different failure pattern. The RISKY pattern produces the same sentence regardless of the number.

**Degradation rule:** For small NC municipalities where Census does not publish at the place level (population under ~20,000), the ACS data resolves to the county level. If Apex and Holly Springs return the same county-level median year built, this block is suppressed or merged on the hub page â€” it does not differentiate two town pages sharing the same grain. Build a data-grain checker into the pipeline: `if town_ACS_value == adjacent_town_ACS_value â†’ suppress_block`.

---

#### BLOCK 5: Permit Jurisdiction + Pull Requirements
**Unique-per-town: YES â€” TIER B (auto-generatable, requires maintenance)**
**Source: Static lookup table, manually built and annually verified**
**Risk level: SAFE when accurate; trust-negative when stale**

This is the strongest auto-generatable differentiator in the entire architecture. The permit authority for Cary is the Town of Cary (not Wake County). That sentence is factually wrong if you substitute Holly Springs (which uses the county), and a homeowner can verify it at [Wake County Permits](https://www.wake.gov/departments-government/permits-and-inspections) or the [Town of Cary permit portal](https://data.townofcary.org/explore/dataset/permit-applications/).

Build a 30-row lookup table: `town â†’ permit_authority, permit_office_url, typical_inspection_timeline, contractor_license_threshold`. This is a one-time manual build that degrades without annual review.

**Maintenance requirement:** The King Maker system must include an annual permit-table verification step. A page that claims "Cary permits are inspected within 3 business days" when the current timeline is 5 days is worse than no claim â€” it is factually incorrect and discoverable by any homeowner.

---

#### BLOCK 6: Local Climate Context
**Unique-per-town: DEGRADED WITHIN METRO â€” treat as Tier B supporting texture, not primary differentiator**
**Source: Auto-generated â€” [NOAA NCEI Climate Normals API](https://www.ncei.noaa.gov/cdo-web/api/v2)**
**Risk level: RISKY if used as primary differentiator within the Raleigh metro**

The adversarial finding here is severe and underweighted in the source research: NOAA degree-day data for Apex, Cary, Holly Springs, Fuquay-Varina, and Morrisville all resolve to the same RDU airport weather station. HDD and CDD figures across these five pages would be numerically identical. Google's crawl-time page comparison across a domain will detect this. "Apex averages 3,820 heating degree-days" and "Cary averages 3,820 heating degree-days" â€” same sentence with a different city token â€” is definitionally a doorway pattern.

**Correct use:** Use NOAA data only where towns are in genuinely different climate zones (Raleigh metro vs. coastal NC vs. mountain NC). Within a 30-mile suburban service radius, suppress this block or use it only to make a cross-regional comparison that is actually meaningful (e.g., comparing to Charlotte or Asheville, where the numbers are meaningfully different). Do not repeat nearly identical HDD/CDD sentences across 15 suburban town pages.

---

#### BLOCK 7: Subdivision / Neighborhood Names
**Unique-per-town: YES when operationally anchored; RISKY as a standalone keyword list**
**Source: Manually verified seed list per town + cross-reference with job history**
**Risk level: SAFE when names appear in operational context; RISKY as an OSM-generated keyword list**

[Sterling Sky's research](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/) identifies subdivision names as a high-performing uniqueness signal specifically because they are locally resonant and pass the swap test. "Wakefield Plantation" cannot appear on the Holly Springs page.

The adversarial risk: a list generated from OpenStreetMap Overpass without manual verification will produce errors. OSM neighborhood tags in NC suburbs are inconsistently populated. A page that names a subdivision that does not exist, or misspells an HOA name, is an E-E-A-T liability.

**Correct implementation:**
- Seed list: manually build a 4-6 subdivision list per town, verified against county GIS parcel data or the municipality's own maps
- Operational anchor requirement: each named subdivision should appear in the context of a job reference or service mention, not just as a standalone list. "We've worked in Wakefield, Brier Creek, and Carpenter Village â€” neighborhoods where 2000s vinyl siding is starting to show UV fading and impact damage" passes the swap test. A bullet list "Serving: Wakefield, Brier Creek, Carpenter Village, North Ridge" is keyword stuffing

---

#### BLOCK 8: Drive Time from Nearest Crew Base
**Unique-per-town: YES â€” but low informational weight**
**Source: Auto-generated â€” Google Maps Distance Matrix API or [OSRM](http://project-osrm.org/)**
**Risk level: SAFE as supporting texture; insufficient as primary differentiator**

"We're 11 minutes from Cary Town Hall" is a factual, verifiable, town-specific sentence. It also contributes minimally to a swap-test defense when it is one of only a few differentiating elements. Eleven pages each with a single drive-time sentence that differs only in a number and a city name is structurally token-swap content.

Use it as supporting texture in the opening block or in a "Why choose us in [Town]" section, embedded within broader operational content â€” never as a standalone uniqueness carrier.

---

#### BLOCK 9: Local Pricing Context [REMOVE FROM AUTO-GENERATED LAYER]
**DO NOT USE as a town-level auto-generated component**

RSMeans and [4BT location cost factors](https://4bt.us/national-average-cost-data-and-locatio-factoring/) operate at metro or county granularity. "Raleigh-area labor rates run ~8% above the NC state average" applies identically to Apex, Cary, Holly Springs, Morrisville, and Wake Forest. Every page in a 30-mile radius carries the same sentence with only the city token changed. This is the canonical doorway pattern.

Replace with: actual per-job cost ranges from the contractor's own CRM data (`LOCATION_CONTENT[town].typicalJobRange`), or omit pricing entirely from town pages and handle it on service pages where it is contextually appropriate.

---

#### BLOCK 10: Local Crew Assignment (UNDERUTILIZED â€” promote to Tier A)
**Unique-per-town: YES â€” strongest E-E-A-T signal in the entire architecture**
**Source: Client-provided (contractor CRM zone assignments)**
**Risk level: SAFE â€” verifiable, operational, irreproducible**

If the contractor's service area is divided into zones served by specific technicians, each town-page cluster anchored to the technician who primarily serves that zone is the highest-leverage uniqueness signal available. A named, photographed technician with a license number who lives in or regularly works in that town satisfies Google's [E-E-A-T "Experience" and "Authoritativeness" signals](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t) directly.

"John Martinez (NC Roofing License #51432) covers our Wake Forest, Youngsville, and Rolesville routes. He's been doing roofs in North Wake County for 11 years." That sentence cannot be replicated for another town without being false.

**Implementation:** `LOCATION_CONTENT[zone].primaryTech` object with name, photo, license number, years in area, zone towns. One tech can cover 4-6 towns. This is generatable from a single client-provided input that amortizes across the entire zone cluster.

---

#### BLOCK 11: Trade-Specific FAQ (Town-Specific Entry Required)
**Unique-per-town: PARTIAL â€” at least 1 of 4-5 FAQ entries must be town-specific**
**Source: Mix of static template (shared FAQs) + `LOCATION_CONTENT[town].faq` (town-specific entry)**
**Risk level: SAFE when answers reference real local variables; RISKY when LLM-generated without local data**

Shared FAQ entries (what does a roof replacement cost, how long does it take, what brands do you use) can appear on every page without penalty â€” they are the 40-60% shared scaffold.

The town-specific FAQ entry must reference a real local variable. Examples that pass the swap test:

- "Do you pull Wake County permits for Apex jobs, or does the Town of Apex issue them?" â†’ Answer references the actual permit authority lookup
- "Our HOA in Regency Park requires specific shingle colors â€” can you work within those restrictions?" â†’ Answer names the specific HOA and addresses it
- "We had hail damage in the April 2024 storm â€” do you work with State Farm adjusters in Wake County?" â†’ References a real storm event and county

**RISKY pattern:** "How much does HVAC replacement cost in Cary NC?" answered with "HVAC replacement in Cary NC typically costs $X,XXX-$Y,YYY depending on unit size and complexity." This is the same answer for every city, and LLM-generated FAQ responses that merely insert a city name are [explicitly flagged in Glenn Gabe's December 2024 case studies](https://www.gsqi.com/marketing-blog/google-december-2024-spam-update-case-studies/) as a primary scaled-content-abuse signal ("every PAA turned into a heading").

---

#### BLOCK 12: Shared Scaffold (40-60% of page â€” NOT doorway material)
**Shared across all town pages â€” explicitly acceptable**

These blocks are the same on every town page. Google's doorway policy does not penalize shared structural content â€” it penalizes pages where the shared content is ALL the content.

- Service descriptions (what the trade service covers, process steps)
- Brand/material lists (GAF, Owens Corning, Carrier, Trane, etc.)
- Licensing and insurance credentials (contractor's NC license number)
- Contact CTA and click-to-call (town-specific phone number routing is a plus but not required)
- Generic trust signals (BBB accreditation, years in business)
- Navigation and footer

**Rule:** The shared scaffold is safe precisely because the Tier A and Tier B blocks above it provide the swap-test defense. Remove the Tier A content and the shared scaffold becomes a doorway page by itself.

---

### Summary Table

| Block | Unique-per-Town | Source | Risk if Auto-LLM | Min for Index |
|---|---|---|---|---|
| Opening statement (job count, subdivision) | YES â€” Tier A | Client CRM | HIGH â€” boilerplate | Required |
| Completed project evidence | YES â€” Tier A | Client photos + permit records | Cannot fake | Required (1 job, 24 mo) |
| Local customer reviews | YES â€” Tier A | GBP API + client tagging | HIGH if synthesized | Required (1 review, 18 mo) |
| Housing stock data (Census ACS) | YES (with caveats) | Census API â€” cited figure | MED â€” template sentence | Recommended |
| Permit jurisdiction | YES | Static lookup table | SAFE if from table, RISKY if inferred | Recommended |
| Climate data (NOAA) | NO within metro â€” suppress | NOAA API | HIGH within metro | Do not use for same-MSA pages |
| Subdivision names | YES when anchored | Manual seed list | MED â€” keyword list if not anchored | Recommended (anchored) |
| Drive time | YES â€” low weight | OSRM / Maps API | SAFE â€” one sentence | Supporting texture only |
| Pricing context (metro-level) | NO â€” remove | RSMeans / 4BT | HIGH â€” metro-wide identical | Do not use at town level |
| Crew zone assignment | YES â€” Tier A if available | Client CRM | Cannot fake | Promote to required |
| Town-specific FAQ entry | YES â€” 1 required | `LOCATION_CONTENT[town].faq` | HIGH if LLM-generated | Required (1 entry) |
| Shared scaffold | NO â€” shared | Template | Acceptable | Structural requirement |

---

## 3. Rules for Safe Auto-Generation

### Rule 1 â€” The Swap Test is the Go/No-Go Gate
Before any spoke page goes live indexed, apply the swap test: replace the town name with a different town. If the page still reads as useful and accurate, it is a doorway page. Every indexed page must contain at least one block of content that fails the swap test â€” content that is factually specific to that town and cannot be reused elsewhere without being wrong or meaningless.

### Rule 2 â€” Tier A Operational Data is the Only Durable Index Gate
The auto-generated public-data spine (Census, NOAA, drive time, permit jurisdiction, subdivision list) is Tier B supporting texture. It is NOT sufficient as a standalone indexing gate. The Tier A gate is binary:

```
has_indexed_job: bool  // 1+ completed job in this town, within 24 months
has_local_review: bool // 1+ review mentioning this town or local neighborhood, within 18 months
```

If either field is false â†’ page builds with `<meta name="robots" content="noindex, follow">` and is excluded from `sitemap-locations.xml`. This is a build-system enforcement rule, not an editorial guideline.

### Rule 3 â€” Template Ratio and Absolute Word Floor
The shared scaffold can fill up to 60% of the page. The unique Tier A + Tier B content must constitute at least 40%. More importantly, the absolute unique-content word count must be at minimum 300 words â€” because a 400-word page that is 40% unique contains only 160 words of unique content, which is not sufficient informational depth. [BrightLocal's guidance](https://www.brightlocal.com/learn/location-pages/) targets 800-1,500+ words of substantive content per indexed location page.

### Rule 4 â€” Page Count is Constrained by Job History, Not Keyword Opportunity
| Indexed page tier | Requirement |
|---|---|
| Tier 1 (index immediately) | 3+ completed jobs in 24 months AND 2+ local reviews |
| Tier 2 (index after content is staged) | 1-2 jobs in 24 months OR 1 local review (not both missing) |
| Do not index | Zero jobs in 24 months AND zero local reviews |

For a solo contractor launching a new King Maker site, this typically produces 8-15 immediately indexable pages and 10-20 pages in noindex staging. That is the correct production state on day one.

Maximum indexed page count for a small contractor (one physical location, 30-mile radius): 15-25 high-quality pages outperform 40+ thin pages in every documented case. [Plumbing Webmasters (1,000+ contractor campaigns)](https://www.plumbingwebmasters.com/plumber-city-page-seo/) recommends a strict 15-city maximum with real job documentation.

### Rule 5 â€” Only Index Towns Where You Have Real Service History
Do not generate indexed pages for towns the contractor has never served. Towns outside active job history get:
- An `areaServed` entry in root schema
- An anchor link on the `/service-area` hub
- A draft/noindex page in the build output (to be promoted when jobs accumulate)

This is not conservatism â€” it is the architecture that makes the whole system honest. Without this rule, the data-spine approach is a sophisticated-looking doorway campaign.

### Rule 6 â€” LLM Prose Must Never Wrap Data Without a Human Review Step
The pipeline may use LLM assistance to draft prose around real data points. But the prose must then be reviewed and edited by a human (or the contractor) before publishing. The distinguishing signal between operational content and scaled-content abuse is whether the prose reflects genuine knowledge of that specific market. [Sterling Sky tested ChatGPT for hyper-local service area content and it "failed pretty epically"](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/) â€” the output was fluent but indistinguishable from the city-swap boilerplate the March 2024 update targeted.

The correct prose pattern: "We replaced 34 roofs in Apex in 2024, mostly in Haddon Hall and Regency Park subdivisions, where 1990s architectural shingles are failing at the 30-year mark." This is operator-authored experience. It cannot come from an LLM that has never been to Apex.

### Rule 7 â€” Incremental Launch, Not Batch
Never launch all location pages simultaneously. The correct sequence:

1. Identify the 6-12 towns with highest job density and strongest review concentration
2. Launch those pages first, fully staged with all Tier A content
3. Submit to Search Console via URL Inspection; monitor Coverage and Performance for 3-4 weeks
4. Add remaining towns in batches of 5-8 as job and review data accumulates
5. Never launch a new town page until its Tier A gate is satisfied

Launching 30 near-identical pages in one sitemap submission is a pattern consistent with [SpamBrain's scaled-content-abuse detection](https://developers.google.com/search/blog/2024/03/core-update-spam-policies).

### Rule 8 â€” Data Freshness Policy
- Census ACS data: cite the vintage year inline ("Census ACS 2022 5-Year Estimates"). Refresh annually when new ACS data publishes.
- NOAA climate normals: cite the 1991-2020 normals period. These update on a 10-year cycle.
- Permit jurisdiction data: annual verification required. Flag unverified entries with a stale date so they are suppressed from rendering until re-verified.
- Job data: only jobs within the past 24 months count toward the indexing gate. Older jobs may appear in a "project history" section but cannot substitute for recent evidence.

### Rule 9 â€” Metro-Radius Deduplication Check
Before treating any auto-generated data block as a uniqueness signal, run a deduplication check: if the value for Town A equals the value for Town B (same Census grain, same NOAA station, same permit authority), suppress the block from both pages or render it only on the hub page. This is especially critical for the Raleigh metro cluster where 8-10 suburbs share the same MSA data sources.

### Rule 10 â€” Quarterly Swap-Test Audit
Run a structural similarity check across all live spoke pages quarterly. If any two pages score above 70% similarity (excluding shared scaffold), merge them into one richer page or differentiate the thinner one. This is the ongoing quality-maintenance mechanism that prevents content rot.

---

## 4. Technical Architecture

### URL Structure: Hub-and-Spoke

```
/service-area                          â† hub (keep â€” retains all existing equity)
/locations/raleigh                     â† spoke
/locations/cary
/locations/apex
/locations/wake-forest
/locations/holly-springs
```

**Rationale for `/locations/{town-slug}` over flat `/raleigh-hvac`:**
- The nested path signals geographic sub-taxonomy explicitly to crawlers
- Avoids slug collisions across multi-trade clients in the same King Maker system
- The hub page at `/service-area` retains all equity accumulated during the consolidation period â€” do not delete it or redirect it away

**Slug rules:**
- Lowercase, hyphenated, NC town name only: `/locations/wake-forest`
- No trade name in the slug: `/locations/apex` not `/locations/apex-roofing-nc`
- Canonical on each spoke: `<link rel="canonical" href="https://example.com/locations/apex" />`
- Consistent trailing slash policy â€” pick one and enforce sitewide

### Schema: LocalBusiness + Service + areaServed

**Root node (homepage only â€” do not duplicate on spoke pages):**

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Acme Roofing",
  "url": "https://example.com",
  "telephone": "+1-919-555-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Raleigh",
    "addressRegion": "NC",
    "postalCode": "27601",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Raleigh"},
    {"@type": "City", "name": "Cary"},
    {"@type": "City", "name": "Apex"},
    {"@type": "City", "name": "Wake Forest"}
  ]
}
```

**Per-spoke node (each `/locations/{town}` page):**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Roof Replacement in Apex NC",
  "serviceType": "Roof Replacement",
  "provider": {
    "@type": "RoofingContractor",
    "name": "Acme Roofing",
    "url": "https://example.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Apex",
    "containedInPlace": {
      "@type": "State",
      "name": "North Carolina"
    }
  }
}
```

**Critical schema rules:**
- Use `areaServed` (current Schema.org). The `serviceArea` property is deprecated as of Schema.org v7+ â€” do not use it
- Do NOT add a second full `LocalBusiness` node on spoke pages â€” phantom multi-location signals confuse GBP alignment
- Do NOT embed a `PostalAddress` for towns where the contractor has no physical office
- Use the most specific `@type` available: `RoofingContractor`, `HVACBusiness`, `Plumber`, `Electrician`
- Schema claims and GBP service area settings must grow together: do not claim 30 towns in schema when GBP reviews exist for only 5

### Internal Linking

**Hub â†’ Spokes:** `/service-area` links to every active (indexed) spoke via a service-area grid. Anchor text: "Roofing in {Town}" â€” keyword + city, not bare city name.

**Spoke â†’ Hub:** Every spoke links back to the hub: "See our full roofing service area â†’". This reciprocal link prevents spoke pages from becoming isolated doorway-style dead ends â€” the direct pattern Google's [2015 doorway policy](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages) identifies as a flag.

**Spoke â†’ Adjacent Spokes:** Link to 2-3 geographically adjacent towns only (within 10 miles or same county). Do not build a full cross-link matrix â€” that dilutes equity and looks manipulative.

**Service pages â†’ Spokes:** `/services/roof-replacement` includes a "Towns We Serve" section linking to 4-6 highest-volume spoke pages. Creates cross-dimensional links (service â†’ location) that strengthen topical authority.

### Reversing the 308 Redirects

The existing 308 redirects (`/locations/{town}` â†’ `/service-area#{town}`) were treated by Google as permanent canonical signals. Equity was consolidated to `/service-area`. Reversal requires:

1. Google to re-crawl the restored URL
2. Google to re-evaluate canonical (page now exists, no redirect)
3. Google to re-associate any inbound links from the old spoke URLs
4. A 4-8 week equity reconsolidation period during which spoke pages may rank weakly

**Batched reversal protocol:**

| Week | Action |
|---|---|
| 0 | Verify Tier A content for top 5 revenue towns satisfies the index gate |
| 1 | Remove 308 for those 5 towns, restore `/locations/{town}`, add to `sitemap-locations.xml`, submit via Search Console URL Inspection |
| 2-3 | Monitor Search Console Coverage + Performance for those 5 URLs |
| 4 | If indexing confirmed, proceed with next batch of 5-8 towns |
| Ongoing | Never restore a 308 until that town's Tier A gate is satisfied |

Towns not yet ready: leave 308 in place. Do not return 200 with thin content â€” that is worse than a redirect, because a thin 200 is actively crawled and indexed as low-quality content.

### Sitemap Governance

Separate the locations sitemap for independent management:

```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>/sitemap-core.xml</loc></sitemap>
  <sitemap><loc>/sitemap-locations.xml</loc></sitemap>
</sitemapindex>
```

`sitemap-locations.xml` includes a spoke URL only after it passes the Tier A gate. Including thin pages in the sitemap signals to Google that you consider them canonical and indexable â€” it does not protect you, it flags you.

**Staging protocol:**
1. Page built but below Tier A gate â†’ serve 200 + `<meta name="robots" content="noindex, follow">` + exclude from sitemap
2. Tier A gate passes â†’ remove noindex tag + add to `sitemap-locations.xml` + submit in Search Console
3. Never block via `robots.txt` â€” that prevents Google from reading the noindex directive

---

## 5. Doorway-Test Pass/Fail Gate â€” Every Page Must Clear All Items

Run this checklist before any spoke page transitions from noindex to indexed. A single FAIL blocks publication.

### Tier A Gate (Binary â€” any FAIL = do not index)

| # | Check | Pass Condition | Fail Condition |
|---|---|---|---|
| A1 | **Swap test** | Remove town name from entire page â€” the page reads as incomplete or factually incorrect for any other town | Removing the town name produces a page that still reads as accurate and useful with a different city substituted |
| A2 | **Job evidence present** | At least 1 completed job entry (photo + description) from this town, within the past 24 months | No job entry, or most recent job is older than 24 months |
| A3 | **Local review present** | At least 1 review from a customer in this town (explicit town/neighborhood mention) within the past 18 months | No qualifying review exists |
| A4 | **The existence test** | Page would be useful to a real homeowner in this town who found it without a search engine | Page exists only to capture a "[trade] in [city]" query; offers no information not available on the hub page |
| A5 | **No LLM-generated prose in unique blocks** | All town-specific prose in opening block, project descriptions, and FAQ answers is operator-authored or directly transcribed from job records | Any unique-content block is visibly generic LLM prose that substitutes city tokens into identical sentence templates |
| A6 | **Funnel test** | Page is a complete destination: click-to-call, relevant service detail, local social proof all present on the page itself | Page's only purpose is to redirect visitor to homepage or generic contact form |

### Tier B Gate (Quality â€” FAIL triggers review, not automatic block)

| # | Check | Pass Condition | Concern if Fail |
|---|---|---|---|
| B1 | **Census data grain check** | ACS median year built for this town is a different value than for the adjacent town in the same service area | Two neighboring town pages share identical Census figures â†’ suppress block from both, use only on hub |
| B2 | **NOAA station check** | Town's nearest NOAA station is different from adjacent town's nearest station | Same NOAA station â†’ climate data block produces identical HDD/CDD across pages â†’ suppress climate block from individual spoke pages, reference it only on hub |
| B3 | **Permit table freshness** | Permit jurisdiction data verified within the past 12 months | Stale permit data is a trust liability; suppress or add a verification disclaimer |
| B4 | **Subdivision names verified** | Named subdivisions confirmed against county GIS or municipal map â€” not OSM output alone | Fabricated or misspelled HOA/subdivision names damage E-E-A-T credibility |
| B5 | **No metro-level pricing copy** | If pricing context is present, it is from contractor's own job-cost data, not RSMeans/4BT metro averages | Metro-level cost sentences are identical across all suburbs â†’ doorway pattern within the metro cluster |
| B6 | **Schema areaServed matches GBP** | Town is listed in contractor's GBP service area settings | Schema claims for towns not in GBP service area are discounted by Google's structured data parser |

### Site-Level Gate (Domain health â€” check before each batch launch)

| # | Check |
|---|---|
| S1 | No manual action notices in Search Console |
| S2 | Previous batch of spoke pages showing "Indexed" (not "Crawled - currently not indexed") in Search Console Coverage before next batch launches |
| S3 | Total indexed location page count does not exceed (total jobs in CRM across all towns) / 3 â€” a rough proxy for whether page count is proportional to actual service presence |
| S4 | Quarterly cross-page similarity score < 70% for any two live spoke pages |

---

## 6. Phased Implementation for King Maker

### Phase 0: Infrastructure (Before Any Pages Publish)
**Duration: 1-2 weeks**

1. Build the data layer:
   - Construct `LOCATION_CONTENT[town]` schema in `lib/data.ts` with mandatory fields: `jobCount` (int), `recentJobMonth` (date), `primarySubdivision` (string), `permitAuthority` (string), `permitUrl` (string), `reviews` (array), `crewZone` (string)
   - Build the 30-row NC permit jurisdiction lookup table manually, linking to each municipality's or county's permit portal
   - Build the subdivision seed list (4-6 subdivisions per town) manually verified against county GIS â€” do not use OSM output directly
   - Build the Census ACS API integration for housing-stock data with grain-level deduplication check
   
2. Build the enforcement gate:
   - Implement the `has_indexed_job` and `has_local_review` booleans as first-class fields in the data layer
   - Configure the build pipeline: if either field is false, page renders with `<meta name="robots" content="noindex, follow">` and URL is excluded from `sitemap-locations.xml`
   - This gate must be enforced in code â€” it cannot be a content policy that humans remember to apply

3. Build the client onboarding intake:
   - Structured intake form: job city, job type, approximate neighborhood, completion date, photo upload, permit number if pulled
   - This feeds `LOCATION_CONTENT[town].jobs` directly
   - Without this intake mechanism, the Tier A content slots will be empty for most towns at launch â€” this is the single most common failure mode

4. Create the `sitemap-locations.xml` file, separate from the core sitemap

5. Verify hub page at `/service-area` is live and retains all existing equity before any 308 reversals

### Phase 1: Tier 1 Cities Launch (6-12 towns)
**Duration: Weeks 3-6**

1. Identify the 6-12 towns with the highest completed-job density and most reviews in the past 24 months from the contractor's CRM
2. Complete all Tier A content for those towns: review job entries, stage photos, pull GBP reviews and tag by town
3. Run the full doorway-test gate checklist for each page before launch
4. Remove 308 redirects for those towns, restore `/locations/{town}` returning 200
5. Add those towns to `sitemap-locations.xml`
6. Submit each URL via Search Console URL Inspection
7. Monitor Search Console Coverage and Performance for 3-4 weeks before proceeding to Phase 2

Do not launch Phase 2 until Phase 1 pages show "Indexed" status in Search Console.

### Phase 2: Tier 2 Cities Staged
**Duration: Weeks 7-16, rolling**

1. Add towns with 1-2 recent jobs but limited reviews â€” sufficient for Tier 2 indexing gate if at least one qualifying condition is met
2. For each town: complete job entry staging, check metro-deduplication on Census/NOAA data, verify permit jurisdiction freshness
3. Launch in batches of 5-8 towns every 3-4 weeks
4. After each batch: 3-week monitoring hold in Search Console before the next batch
5. Revise any page showing "Crawled - currently not indexed" status â€” that signal means Google found the content insufficient, not that it needs to be resubmitted

### Phase 3: Zero-Data Towns (Ongoing, client-driven)
**Duration: Months 4-12+**

1. Towns with no job history remain in noindex staging permanently until the contractor reports a completed job there
2. When a qualifying job is completed: client submits intake form, the town's `has_indexed_job` flag flips to true, the page's noindex tag is removed, URL is added to sitemap and submitted to Search Console
3. This is the growth mechanism: the indexed footprint expands organically with actual service presence, not with keyword targeting ambition

**Client communication script (include in King Maker onboarding):**
> "Your location pages launch indexed only for towns where you have documented completed work. This is not a limitation â€” it is what keeps your pages out of Google's spam filter. Towns where you haven't yet worked get a placeholder page that becomes live as you accumulate jobs there. A 12-page footprint built on real job history will outrank a 35-page footprint built on templates, and will not get penalized when Google's next spam update rolls out."

### Phase 4: Ongoing Quality Maintenance

| Cadence | Action |
|---|---|
| Weekly (first 60 days) | Search Console Coverage monitoring for location page URL pattern |
| Monthly | GBP review sync: retag new reviews by town, check for newly qualifying towns |
| Quarterly | Cross-page similarity audit (any two pages > 70% similarity triggers differentiation or merge) |
| Annually | Permit jurisdiction table re-verification across all 30 towns; Census ACS data vintage update when new 5-year estimates publish |
| On each algorithm update | Check GSQI / Search Engine Land / Sterling Sky for case studies; compare current page set against any newly documented penalty patterns |

---

## Sources Referenced

- [Google Spam Policies â€” Doorway Abuse + Scaled Content Abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [March 2024 Core Update and New Spam Policies â€” Google Search Central](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- [An Update on Doorway Pages â€” Google Search Central (2015, still operative)](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages)
- [E-E-A-T â€” Google Search Central](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t)
- [December 2024 Spam Update Case Studies â€” GSQI / Glenn Gabe](https://www.gsqi.com/marketing-blog/google-december-2024-spam-update-case-studies/)
- [August 2025 Spam Update â€” Sterling Sky](https://www.sterlingsky.ca/august-2025-spam-algorithm-update/)
- [Location Pages: What Crosses the Line â€” RicketyRoo](https://ricketyroo.com/blog/location-page-spam/)
- [How to Create Unique Service Area Pages â€” Sterling Sky](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/)
- [How to Craft Unique Location Pages â€” BrightLocal](https://www.brightlocal.com/learn/location-pages/)
- [How to Rank in Multiple Cities â€” DataPins](https://www.datapins.com/seo-for-multiple-cities/)
- [City Pages: Help or Hurt SEO â€” Plumbing Webmasters](https://www.plumbingwebmasters.com/plumber-city-page-seo/)
- [Location Pages After October Spam Update â€” Search Engine Land](https://searchengineland.com/location-pages-google-october-spam-update-390016)
- [Census ACS 5-Year API](https://www.census.gov/data/developers/data-sets/acs-5year.html)
- [NOAA NCEI Climate Normals API](https://www.ncei.noaa.gov/cdo-web/api/v2)
- [Wake County Permits and Inspections](https://www.wake.gov/departments-government/permits-and-inspections)
- [Town of Cary Open Data: Permit Applications](https://data.townofcary.org/explore/dataset/permit-applications/)

---

## DECISION + REFINED REQUIREMENTS — Joseph, 2026-06-02

**LAUNCH DECISION: ship with the service-area HUB only. NO dedicated location pages at launch.** Dedicated per-town pages become a Phase-2 system, switched on per-town only when a real town-review exists. (Already the current state — per-town pages were consolidated into the hub in May; the demo has none. Zero work to honor this.)

**THE COLLAPSE — the comprehensive Google review IS the data layer.** One GBP API pull yields:
- Reviewer name -> attribution
- Review text (verbatim) -> carries the scope of work ("painted my deck")
- Review timestamp -> the date
- Reviewer-attached photos (if any) -> sometimes the house photo, free

**REQUIRED to build + index a town page (hard gate):**
1. A SUBSTANTIVE Google review from a customer in that town (describes the work; a bare "great job 5-star" does NOT qualify). Display VERBATIM; never LLM-paraphrase.
2. Neighborhood / subdivision (contractor-supplied 1-field, or extracted only if the customer named it in the review).

**IDEAL (not blocking):** 3. Photo of the house (from the review's attached photos, or the contractor shoots it).

**DROPPED:** permit number (not realistically obtainable).

**Honest corrections to the original brief:**
- The reviewer address/subdivision is NOT auto-pullable from the GBP API (Google hides reviewer PII). Neighborhood = trivial contractor input, not magic.
- The review must be substantive (carries scope) -> the gate needs a review-quality check; coach contractors to solicit reviews that mention the project + town.
- Display reviews verbatim; do not summarize with an LLM (re-opens scaled-content risk).

**Philosophy (locked):** the gate shifts responsibility to the client. No real town-review -> no page, and that is the client's job to fix. Also protects King Maker: we never manufacture fake local uniqueness.
