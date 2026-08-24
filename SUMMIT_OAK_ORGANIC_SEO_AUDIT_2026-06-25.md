# Summit & Oak Organic SEO Audit Packet

Audit date: 2026-06-25  
Audited URL: https://kingmaker-summit-oak-roofing.vercel.app/  
Primary objective: maximize raw on-page SEO, technical SEO, topical relevance, crawl clarity, and organic visitor potential for a roofing contractor demo site.

## Scope

This audit intentionally ignores the demo-site limitations the user called out:

- Real Google Business Profile / GBP existence.
- Real customer reviews.
- Real contractor license verification.
- Real business photos.
- Real service address / NAP proof.
- Real manufacturer certification proof.
- Real backlink profile and off-page authority.

The audit focuses on the site's raw on-page and technical organic ranking power.

## Executive Verdict

The site is substantially stronger than a normal roofing contractor website. It has a serious topical map, broad service/location coverage, structured data, crawlable static pages, indexable sitemap URLs, and a strong internal linking surface.

Current raw SEO score: approximately 8.6 / 10.

The site is not yet "12/10" because the remaining issues are real ceiling-lifters:

- Homepage performance is materially weak, with Lighthouse LCP at 8.8s.
- Bare city URL variants return 200 instead of redirecting to canonical `-nc` URLs.
- A few title/meta generation issues create avoidable duplication and boilerplate.
- Sitemap hreflang alternates use relative URLs in places where Google wants fully-qualified URLs.
- Service pages have useful but repeated section patterns that should be made more intent-specific.
- Project pages are valid proof assets but need more case-study depth to become full organic assets.

The site does not need a basic SEO rescue. It needs a final technical and relevance pass.

## Live Verification Performed

### Crawl / Indexability

Live sitemap crawl summary:

- Sitemap URL: https://kingmaker-summit-oak-roofing.vercel.app/sitemap.xml
- Sitemap URL count: 147
- Status distribution: 147 URLs returned `200`
- Missing canonicals: 0
- Non-200 sitemap URLs: 0
- `noindex` sitemap URLs: 0
- Missing titles: 0
- Missing descriptions: 0
- H1 issues: 0
- Every sitemap URL had exactly one H1.
- Thin pages under 500 words:
  - `/privacy-policy`: 470 words
  - `/terms`: 474 words
- These thin pages are legal/support pages, not SEO money pages.

Duplicate title groups:

```text
Storm Damage Roof Repair Raleigh NC | Summit & Oak
- https://kingmaker-summit-oak-roofing.vercel.app/storm-damage
- https://kingmaker-summit-oak-roofing.vercel.app/services/storm-damage-roof-repair
```

### Discoverability / Reachability

Prior live BFS crawl against sitemap URLs found:

- 147 sitemap targets.
- 147 reachable from the homepage.
- 0 orphans.
- Maximum depth: 2 clicks.
- Depth distribution:
  - `/`: depth 0
  - 57 URLs: depth 1
  - 89 URLs: depth 2

This is excellent for crawl equity distribution.

### Robots, Sitemap, Machine-Readable Files

Verified live:

- `robots.txt`: 200
- `sitemap.xml`: 200
- `llms.txt`: 200

`llms.txt` is present and describes the site as a roofing contractor demo with a machine-readable index pointing to the sitemap.

### Lighthouse

Fresh Lighthouse run against the homepage:

```json
{
  "fetchTime": "2026-06-25T02:46:50.479Z",
  "finalUrl": "https://kingmaker-summit-oak-roofing.vercel.app/",
  "scores": {
    "performance": 59,
    "accessibility": 100,
    "best-practices": 100,
    "seo": 100
  },
  "metrics": {
    "fcp": "2.2 s",
    "lcp": "8.8 s",
    "tbt": "340 ms",
    "cls": "0.003",
    "speedIndex": "6.8 s"
  }
}
```

Top homepage transfer offenders:

```text
/gallery/ba-3-before.webp                     ~639 KB
/gallery/ba-1-before.webp                     ~498 KB
/gallery/ba-2-after.webp                      ~417 KB
/gallery/ba-2-before.webp                     ~246 KB
/gallery/ba-3-after.webp                      ~168 KB
/gallery/ba-1-after.webp                      ~143 KB
/_next/static/chunks/288ut_obad-23.js          ~73 KB
/_next/static/media/...woff2                   ~57 KB
```

The main performance issue appears to be eager loading/preloading of below-fold gallery imagery and possibly aggressive media behavior, not a lack of SEO metadata.

## What Is Already Strong

### Technical Crawl Foundation

- All sitemap URLs return `200`.
- All sitemap URLs are indexable.
- All sitemap URLs have canonicals.
- All sitemap URLs have titles and meta descriptions.
- All sitemap URLs have exactly one H1.
- No sitemap-level orphan problem was found.
- Legal/support pages are the only pages under 500 words.

### Topical Map

The site has a serious roofing topical structure:

- Homepage.
- Core service pages.
- Storm damage pages.
- Material pages.
- Brand/manufacturer pages.
- City/location pages.
- Service-city combination pages.
- Resource hubs.
- Glossary terms.
- Blog posts.
- Project/case-study pages.
- Spanish pages.

This breadth is much stronger than most contractor sites.

### Semantic / Structured Data Coverage

Detected schema types across the site include:

- `RoofingContractor`
- `LocalBusiness`
- `Organization`
- `WebSite`
- `WebPage`
- `Service`
- `FAQPage`
- `BreadcrumbList`
- `Article`
- `BlogPosting`
- `Project`
- `ImageObject`
- `ItemList`
- `CollectionPage`
- `ContactPage`
- `AboutPage`
- `Person`
- `VideoObject`

No JSON-LD parse errors were found in the crawl.

For a real client, every review, rating, certification, `sameAs`, and business-identity claim must be real and visible/confirmable. For the demo, this was intentionally ignored.

### Local SEO Architecture

City pages are meaningfully localized and are not obviously thin doorway pages. They include local roof conditions, local project references, service area context, and repeated but relevant location structure.

The site is structurally pointed at organic regional dominance rather than just a generic service brochure.

## Highest-Priority Findings

### P0: Homepage LCP / Performance Is the Biggest Technical SEO Drag

Finding:

The homepage Lighthouse performance score was 59, with LCP at 8.8 seconds. This is materially weak. Google and web.dev treat 2.5 seconds or less as the good LCP threshold.

Likely causes:

- Large before/after gallery WebPs are loaded too early.
- Below-fold imagery appears to compete with above-fold rendering.
- Hero video/media behavior may be too aggressive, especially if desktop media is pulled unnecessarily.
- Public static assets appear to use short revalidation cache behavior in places.

Recommended fixes:

- Remove preload/eager loading from below-fold before/after gallery images.
- Lazy-load below-fold gallery images.
- Compress and resize large WebP assets.
- Use correct responsive `sizes`.
- Give only the real LCP/hero asset priority.
- Avoid loading desktop video assets on mobile.
- Ensure there is not duplicate hero video preload behavior.
- Add long-lived immutable cache headers for stable public assets when filenames are content-versioned.
- Re-run Lighthouse mobile and desktop after changes.

Success target:

- Homepage Lighthouse performance above 90.
- LCP under 2.5s in lab, then validate field data once available.
- CLS remains near current excellent value of 0.003.

### P1: Bare City URL Variants Return 200 Instead of 301

Finding:

Example:

```text
https://kingmaker-summit-oak-roofing.vercel.app/locations/raleigh     -> 200
https://kingmaker-summit-oak-roofing.vercel.app/locations/raleigh-nc  -> 200
```

The bare variant canonicals to the `-nc` URL, but it should redirect.

Why it matters:

Canonicals help consolidate signals, but redirects are cleaner for duplicate URL variants. Duplicate crawl paths can waste crawl attention and create weaker canonical signals than a direct permanent redirect.

Recommended fix:

301 every bare city variant to the canonical `-nc` version:

```text
/locations/raleigh      -> /locations/raleigh-nc
/locations/cary         -> /locations/cary-nc
/locations/durham       -> /locations/durham-nc
/locations/apex         -> /locations/apex-nc
/locations/garner       -> /locations/garner-nc
```

Apply the rule to all city pages with canonical `-nc` slugs.

### P1: Title / Meta Generation Needs Polish

Finding:

There is one exact duplicate title group:

```text
Storm Damage Roof Repair Raleigh NC | Summit & Oak
- /storm-damage
- /services/storm-damage-roof-repair
```

There are also resource/blog titles with duplicated brand boilerplate patterns such as:

```text
Roof Replacement Guide | Summit & Oak | Summit & Oak
Roofing Materials Guide | Summit & Oak | Summit & Oak
```

Project titles are often long enough to truncate, and some project meta descriptions appear mechanically cut mid-sentence.

Why it matters:

Titles should be distinct, descriptive, and concise. Meta descriptions should be human-readable, page-specific summaries.

Recommended fixes:

- Give `/storm-damage` and `/services/storm-damage-roof-repair` distinct search intents.
- Remove duplicate brand suffixes.
- Shorten project titles so the core modifier appears early.
- Replace mechanically truncated project descriptions with complete sentence summaries.

Example title split:

```text
/storm-damage
Storm Damage Roofing Raleigh NC | Emergency Roof Inspections

/services/storm-damage-roof-repair
Storm Damage Roof Repair Raleigh NC | Hail & Wind Repairs
```

### P1: Sitemap Hreflang Uses Relative Alternate URLs

Finding:

The sitemap contains hreflang alternates for Spanish pages, but some alternate `href` values are relative, such as:

```text
href="/"
href="/es"
```

Why it matters:

Google's hreflang documentation says alternate URLs must be fully-qualified and include the transport method.

Recommended fix:

Use absolute URLs in every hreflang entry:

```text
https://kingmaker-summit-oak-roofing.vercel.app/
https://kingmaker-summit-oak-roofing.vercel.app/es
```

Also ensure each language version lists itself and its alternate version.

### P1: Service Pages Need More Intent-Specific Uniqueness

Finding:

Service pages are useful and generally above thin-content thresholds, but many reuse similar section shapes:

- Estimate block.
- Service-specific value H2.
- Process section.
- Signs to watch for.
- Service area links.
- FAQ.

This is a solid scalable pattern, but for 12/10 ranking power, each service page should have more unique technical substance.

Recommended expansions:

Emergency roof repair:

- Tarping workflow.
- Active leak triage.
- After-hours response expectations.
- Interior water intrusion documentation.
- What can be stabilized same day vs scheduled later.

Roof replacement:

- Tear-off vs overlay.
- Decking inspection.
- Ventilation checks.
- Underlayment choices.
- Warranty logic.
- Material lifespan.

Storm damage:

- Hail bruising vs blistering.
- Wind-lift signs.
- Granule loss evaluation.
- Insurance documentation.
- Adjuster walkthrough preparation.

Gutters:

- Fascia rot.
- Pitch and drainage.
- Downspout placement.
- Guard types.
- Foundation water control.

Commercial roofing:

- Membrane types.
- Drainage and ponding.
- Maintenance contracts.
- Tenant disruption planning.
- Repair vs recover vs replacement.

### P2: Project Pages Should Become Full Case Studies

Finding:

Project pages average around 600 words. They function as proof assets, but they are not yet maximal organic landing/support pages.

Recommended case-study structure:

- City/neighborhood context.
- Roof age and failure mode.
- Inspection findings.
- Material system used.
- Timeline.
- Crew constraints.
- Weather/seasonal constraints.
- Before/after notes.
- Warranty note.
- Related service link.
- Related city page link.
- Related material/resource link.

Why it matters:

Project pages can reinforce local relevance, service relevance, material relevance, and conversion proof at once.

### P2: Real-Client Structured Data Launch Gate

Finding:

The demo schema is broad and cleanly parsed. For production, schema claims need a truth gate.

Recommended launch gate:

- Only mark up real reviews.
- Only use real aggregate ratings.
- Only include actual `sameAs` profiles.
- Only include visible/confirmable certifications.
- Ensure marked-up content is represented visibly on the page.

For this demo audit, this is not scored as a defect.

## 12/10 Organic Expansion Recommendations

### Build Service-City Pages Selectively

Do not create every possible city-service combination unless each can be unique.

Create a new service-city page only when it can include:

- Distinct local intent.
- Distinct roof/weather/housing-stock context.
- Distinct FAQs.
- Related local projects.
- Related services.
- Non-swapped body copy.

Good candidates:

- Emergency roof repair in Raleigh.
- Storm damage roof repair in Raleigh.
- Roof replacement in Cary.
- Roof repair in Durham.
- Metal roofing in Apex, if material demand supports it.

Avoid thin city swaps.

### Add Snippet-Ready Tables

Add more tables and concise comparison blocks to target featured snippets, AI answers, and high-intent informational queries.

Suggested assets:

- Roof replacement cost by material.
- Repair vs replacement decision matrix.
- Hail damage vs wind damage signs.
- Asphalt vs metal vs cedar vs synthetic slate.
- Roof lifespan by material.
- Insurance claim documentation checklist.
- Emergency leak checklist.
- Triangle storm season roofing checklist.
- Permitting/HOA considerations by city or county.

### Tighten Internal Linking Rules

Every money page should link to:

- One closest parent service page.
- One closest location page.
- One relevant guide/resource.
- One relevant project/case study.
- One glossary/supporting concept page.

Every resource page should link back to:

- The most relevant service page.
- The most relevant city/location page where useful.
- A contact/inspection CTA.

Every project page should link to:

- Its city page.
- Its service page.
- Its material page.
- One relevant educational guide.

### Expand Spanish SEO Only Where It Can Be Complete

Spanish pages are valuable, but they should not be partial alternates forever.

Recommended:

- Keep hreflang correct.
- Expand Spanish service coverage around the most commercially important pages first.
- Avoid sending Spanish searchers into English-only conversion paths without clear language handling.

## Source References

Live assets:

- https://kingmaker-summit-oak-roofing.vercel.app/
- https://kingmaker-summit-oak-roofing.vercel.app/robots.txt
- https://kingmaker-summit-oak-roofing.vercel.app/sitemap.xml
- https://kingmaker-summit-oak-roofing.vercel.app/llms.txt

Google / web.dev references:

- Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Hreflang localized versions: https://developers.google.com/search/docs/specialty/international/localized-versions
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Meta descriptions / snippets: https://developers.google.com/search/docs/appearance/snippet
- Structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- LCP: https://web.dev/articles/lcp

Key reference points:

- Google recommends avoiding crawl time spent on duplicate pages and linking internally to canonical URLs.
- Google says hreflang alternate URLs must be fully-qualified.
- Google warns against repeated or boilerplate title text.
- Google says meta descriptions should be unique, relevant, human-readable summaries.
- Google structured data guidelines warn against misleading, fake, hidden, or non-representative structured data.
- web.dev's good LCP threshold is 2.5 seconds or less.

## Local QA Notes

Some local project scripts expected a local HTTP server on localhost and failed when pointed at HTTPS:

- `npm run doorway-check` expected local server behavior.
- `npm run reachability-check` used Node `http` assumptions and did not handle the HTTPS live site.

This is not a site defect. A separate live BFS crawl verified sitemap URL reachability from the deployed site.

## Recommended Implementation Work Order

Order of operations:

1. Fix homepage performance.
2. Add 301 redirects for bare city URL variants.
3. Fix duplicate/boilerplate title generation.
4. Rewrite truncated or overly long meta descriptions.
5. Fix sitemap hreflang absolute URLs.
6. Add service-page uniqueness modules.
7. Expand project pages into full case studies.
8. Run live crawl again.
9. Run Lighthouse mobile and desktop again.
10. Run local doorway/reachability scripts against a local dev server if available.

## Claude Work Order Prompt

Paste the following prompt into Claude:

```text
You are auditing the Summit & Oak roofing demo site's organic SEO and technical SEO. Use UltraThink for this task.

Your first job is to find and read this audit packet:

C:\Users\josep\Claude Gravity\SUMMIT_OAK_ORGANIC_SEO_AUDIT_2026-06-25.md

Use an UltraThink review loop:

1. Read the entire markdown file from top to bottom.
2. Produce private working notes that separate confirmed findings, suspected findings, assumptions, missing evidence, and claims that need verification.
3. Re-read the entire markdown file again.
4. Compare the second pass against the first pass and identify any new findings, contradictions, omitted checks, unclear assumptions, or priority changes.
5. Repeat the read -> compare -> refine loop until a full pass produces no new findings, no new questions, and no priority changes.
6. Do not expose hidden chain-of-thought. In the final answer, provide concise pass summaries, confirmed findings, revised findings, rejected findings, and any new issues you found.

After the UltraThink loop, independently verify the audit wherever possible:

- Inspect the live site at https://kingmaker-summit-oak-roofing.vercel.app/
- Inspect https://kingmaker-summit-oak-roofing.vercel.app/robots.txt
- Inspect https://kingmaker-summit-oak-roofing.vercel.app/sitemap.xml
- Inspect https://kingmaker-summit-oak-roofing.vercel.app/llms.txt
- Crawl sitemap URLs if your environment allows it.
- Check status codes, canonicals, titles, meta descriptions, H1s, robots directives, schema parsing, internal reachability, duplicate URL variants, hreflang, and performance.
- Validate the claim that bare city URLs like /locations/raleigh return 200 instead of 301ing to /locations/raleigh-nc.
- Validate the duplicate title claim for /storm-damage and /services/storm-damage-roof-repair.
- Validate whether resource/blog titles still repeat the brand suffix.
- Validate whether project meta descriptions are truncated mid-sentence.
- Run Lighthouse or another performance check if available, especially for homepage LCP.

Important caveat:

This is a demo site. Do not penalize missing real GBP proof, real business verification, real reviews, real contractor photos, real license confirmation, or real backlink authority. You may flag those only as production launch gates, not as demo-site SEO defects.

Your final output should include:

- Agreement/disagreement with the audit's overall 8.6/10 raw SEO assessment.
- A ranked list of confirmed issues by severity.
- Any findings from the markdown file that you reject or downgrade, with evidence.
- Any new issues the markdown file missed.
- A corrected implementation order.
- A clear "ship to 12/10" work plan.
- Specific tests/checks to run after fixes.

Do not merely summarize the file. Treat it as another auditor's work product and stress-test it hard.
```

