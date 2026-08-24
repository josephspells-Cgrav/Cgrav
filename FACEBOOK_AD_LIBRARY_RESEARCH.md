# Facebook Ad Library Tools, MCP Servers & Claude Code Skills for King Maker's Competitive Ad Research

This report summarizes the current state of open-source tools, MCP servers, scrapers, and Claude Code skills for searching, scraping, and analyzing the Facebook (Meta) Ad Library — specifically tailored for Joe's use case of finding the top-performing web design / SEO / contractor-marketing ads to inspire his $997 landing page offer for North Carolina roofers, HVAC, and plumbing contractors.

## Bottom Line Up Front

The single best fit for Joe is **trypeggy / proxy-intell's `facebook-ads-library-mcp`** — an open-source, MIT-licensed MCP server purpose-built for Claude Desktop and Claude Code that wraps the ScrapeCreators API. It does not require a Meta developer account, identity verification, or any ad account. Combined with one or two Claude Code skill files (which Joe can write himself in 30 minutes using the templates below), this gives him a complete, conversational competitive-ad-research workflow that costs under $20 to start and surfaces top-performing competitor ads by longevity, ad volume, and creative strategy.

The official Meta Ad Library API exists and is technically free, but a critical caveat applies: for non-political, US-targeted commercial ads (exactly Joe's use case), the API returns almost nothing useful — it is largely restricted to political/issue ads and EU-region ads. That is why every serious commercial competitor-research tool, including the MCP server above, scrapes the public Ad Library web interface (via ScrapeCreators, Apify, or similar) rather than calling Meta's official endpoint.

---

## 1. Top 3 GitHub Repos / Tools for Joe's Use Case

### #1 — trypeggy / proxy-intell `facebook-ads-library-mcp` (RECOMMENDED)

This is the only well-maintained, MCP-native, Claude-compatible Facebook Ad Library tool with meaningful traction. The repo lives at `github.com/trypeggy/facebook-ads-library-mcp` (also mirrored at `github.com/proxy-intell/facebook-ads-library-mcp` and `github.com/talknerdytome-labs/facebook-ads-library-mcp`) with roughly 218 stars and active commits. It is MIT-licensed Python 3.12+, ships with a one-command installer, and exposes a clean tool surface to Claude:

- `get_meta_platform_id` — resolve one or many brand names to Meta page IDs (batch supported).
- `get_meta_ads` — pull current and historical ads for one or many page IDs.
- `analyze_ad_image` — visual analysis of static creatives.
- `analyze_ad_video` / `analyze_ad_videos_batch` — Gemini-powered analysis of video ads with ~88% token savings in batch mode.
- `get_cache_stats`, `search_cached_media`, `cleanup_media_cache` — local cache management.

Under the hood it calls the **ScrapeCreators** Facebook Ad Library API (which does not need Meta identity verification) and optionally Google Gemini for video analysis. ScrapeCreators offers a free starter tier (100 credits, no credit card) and pay-as-you-go pricing thereafter; Gemini has a generous free tier from Google AI Studio.

**Install for Claude Code (one-time setup, ~5 minutes):**

```bash
git clone https://github.com/trypeggy/facebook-ads-library-mcp.git
cd facebook-ads-library-mcp
./install.sh             # macOS/Linux  (use install.bat on Windows)
cp .env.template .env
# Edit .env and add:
#   SCRAPECREATORS_API_KEY=your_key_from_scrapecreators.com
#   GEMINI_API_KEY=your_key_from_aistudio.google.com   (optional, for video)
```

Then register the server with Claude Code:

```bash
claude mcp add-json "fb_ad_library" \
  '{"command":"/full/path/to/facebook-ads-library-mcp/venv/bin/python",
    "args":["/full/path/to/facebook-ads-library-mcp/mcp_server.py"]}'
```

Restart Claude Code and the tools appear under the `fb_ad_library` server. Sample prompts that work out of the box: "How many ads is HighLevel running and what is their split between video and image?"; "Compare the messaging across Hook Agency, BlackStorm Roofing, and Roofing Webmasters."

Why this is the right pick: it is the only option that is (a) MCP-native, (b) does not require Meta developer account hoops, (c) handles search by brand and competitive comparison conversationally, and (d) actually gets installed in Claude Code rather than Claude Desktop only.

### #2 — Apify Facebook Ad Library Scrapers (remote MCP, no install)

If Joe wants zero local setup, Apify hosts a family of remote MCP servers for the Facebook/Meta Ad Library that Claude Code can hit directly. Several actors are available, including:

- `apify/facebook-ads-scraper` — flagship, $1 per 1,000 ads, supports keyword + Page ID search.
- `igolaizola/facebook-ad-library-scraper` — search-URL-driven, no login required.
- `scraped/facebook-ad-library-scraper-keyword-search` — pure keyword search (most relevant for Joe).
- `insight_api_labs/facebook-ad-library-rental` — flat-rate $5/month rental option.

Each actor exposes a ready-made remote MCP endpoint at `https://mcp.apify.com?tools=<actor-slug>`. Joe needs an Apify account and API token; pricing is consumption-based and dramatically cheaper than commercial ad-spy tools like AdSpy or Foreplay ($99–$149/mo).

**Install for Claude Code:**

```bash
claude mcp add --transport http apify-fb-ads \
  "https://mcp.apify.com?tools=scraped/facebook-ad-library-scraper-keyword-search"
# Set APIFY_TOKEN in your environment or via the Apify auth handshake
```

Output for every actor is structured JSON containing ad ID, page ID, page name, ad copy/text, title, start_date, is_active, primary thumbnail, CTA, and (for the better actors) impression bucket and platform list — exactly the fields Joe needs for ranking by longevity.

### #3 — ScrapeCreators direct REST API (Python/Node fallback)

If Joe ever wants to script bulk extraction outside the MCP — for example, a nightly cron job that exports the longest-running "web design for contractors" ads to a Google Sheet — the underlying ScrapeCreators REST API is the most reliable route. Two endpoints are most relevant:

- `GET https://api.scrapecreators.com/v1/facebookadlibrary/search` — keyword search across the public Ad Library (caps at ~1,500 results per cursor; switch to POST for larger jobs).
- `GET https://api.scrapecreators.com/v1/facebookadlibrary/company/ads` — all ads for a given page/handle.
- `GET https://api.scrapecreators.com/v1/facebookadlibrary/profile?handle=<x>` — page profile.
- `GET https://api.scrapecreators.com/v1/facebookadlibrary/ad?id=<x>` — full ad detail (use the `cards` array for true title/CTA when an ad has multiple variants).

Authentication is a single `x-api-key` header. Claude Code can call these endpoints directly via a custom skill that uses `curl` or `requests`; that gives Joe full control without an MCP layer. Honorable mention: **scrapecreators-style alternatives** include AdLibrary.com, Sociavault, and SearchApi's `meta_ad_library` engine — all simple-key REST APIs that solve the same problem if ScrapeCreators ever degrades.

### Honorable mentions (less suitable but worth knowing)

- `minimaxir/facebook-ad-library-scraper` — the canonical Python scraper using the official Meta API. Well-written but only useful for political/issue or EU ads, which is the wrong scope for Joe's commercial NC contractor research. Forks (`skylarcheung`, `urvsh27`, `WhoTargetsMe/Ad_Library_API`) inherit the same limitation.
- `ChrisFeldmeier/fb_ad_scraper` — Python tool that hits the internal Ad Library endpoints (no API key needed) for search, page ads, and ad detail with EU targeting/demographic info. Useful if Joe wants a self-hosted scraper with no third-party dependency, but US ad data is thinner.
- `gomarble-ai/facebook-ads-mcp-server`, `pipeboard-co/meta-ads-mcp`, `markifact/markifact-mcp`, `serkanhaslak/meta-mcp`, `brandu-mos/konquest-meta-ads-mcp`, `jonathanposovatz/meta-ads-mcp-server`, and `mathiaschu/meta-ads-analyzer` — all excellent Meta **Ads Manager** MCP servers, but they manage ads in *Joe's own ad account* (campaigns, ad sets, creatives, insights). They do not search the public Ad Library for competitor ads, so they do not solve the brief — but Joe should bookmark them for the day he runs his own paid campaigns.
- `FlowExtractAPI/facebook-ads-url` — Apify wrapper that takes a Facebook Ad Library URL and returns the same data as the main scraper. Useful if Joe wants to save and re-run specific Ad Library searches.

---

## 2. MCP Servers Claude Code Can Use Directly

Yes — multiple. In order of recommendation for Joe:

1. **`trypeggy/facebook-ads-library-mcp`** — local stdio MCP, the dedicated Facebook Ad Library competitive-research server. This is the one to install.
2. **Apify hosted MCP endpoints** (`mcp.apify.com?tools=apify/facebook-ads-scraper` or any of the actor variants above) — remote HTTP MCP, zero local install, billed per scrape.
3. **`talknerdytome-labs/facebook-ads-library-mcp`** — same codebase as #1, alternate org name; some installation guides reference this URL.
4. **PulseMCP / mcpservers.org listings** (`pulsemcp.com/servers/talknerdytome-labs-facebook-ads-library`) — wrappers/discoverability layers, not separate implementations.

There is no Anthropic-blessed first-party Ad Library MCP, and there is no "official Meta MCP" for the public Ad Library. The community ecosystem above is what exists today.

---

## 3. The Official Meta Ad Library API — What It Offers and Its Limits

**Endpoint:** `https://graph.facebook.com/v23.0/ads_archive` (use the latest Graph API version; v23.0 is current as of May 2026).

**Required setup (free but slow):**

1. Verify identity at `facebook.com/ID` — government-issued ID upload + Facebook mails a physical postcard; expect 1–2 weeks.
2. Create a Meta for Developers account at `developers.facebook.com`.
3. Create an "App" (Consumer type is fine — no review required for Ad Library).
4. Generate a User Access Token at `developers.facebook.com/tools/explorer/`. Default tokens last about 2 hours; extend to ~60 days via the Access Token Debugger.

**Example query (keyword + country, the exact pattern Joe would want):**

```bash
curl -G "https://graph.facebook.com/v23.0/ads_archive" \
  -d "search_terms=roofing leads" \
  -d "ad_reached_countries=['US']" \
  -d "ad_active_status=ACTIVE" \
  -d "ad_type=ALL" \
  -d "fields=page_name,page_id,ad_snapshot_url,ad_creation_time,ad_delivery_start_time,ad_delivery_stop_time,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_descriptions,ad_creative_link_captions,publisher_platforms,languages,impressions,spend,currency,demographic_distribution,delivery_by_region" \
  -d "limit=1000" \
  -d "access_token=YOUR_TOKEN"
```

**Available fields** (the useful ones for ranking and analysis): `page_id`, `page_name`, `ad_snapshot_url` (links to a rendered preview of the creative), `ad_creation_time`, `ad_delivery_start_time`, `ad_delivery_stop_time` (the longevity proxy — if `stop_time` is null and `start_time` is months old, the ad is winning), `ad_creative_bodies`, `ad_creative_link_titles`, `ad_creative_link_descriptions`, `ad_creative_link_captions`, `publisher_platforms`, `languages`, `bylines`, `currency`, plus EU/political-only fields like `impressions`, `spend`, `estimated_audience_size`, `demographic_distribution`, `delivery_by_region`.

**Critical caveats Joe must understand before relying on this API:**

- For commercial (non-political, non-issue) US ads, the API returns minimal data — typically just `page_id`, `page_name`, and `ad_snapshot_url`. Spend ranges, impression buckets, and demographic data are reserved for `POLITICAL_AND_ISSUE_ADS` or EU-region ads.
- Rate limits are aggressive and there is no `GET /ads_archive/<id>` endpoint — you must filter by page or keyword, then client-side filter for the specific ad.
- Default `limit` is 25; max 2,000 per response; pagination via `paging.next` URLs.
- Tokens expire; production use needs a refresh-token cron job.
- No CTR, ROAS, CPA, or engagement metrics — none of those are ever exposed by Meta to anyone except the advertiser.

For Joe's use case (US, commercial, contractor-targeting B2B), the official API is mostly a dead-end. He should default to ScrapeCreators-via-MCP and use the official API only as a last-resort cross-reference. Note that Meta did roll out impression-range buckets for *all* (not just political) ads in the **public Ad Library web UI** in late 2025 / early 2026 (under 1K, 1K–5K, 5K–10K, 10K–50K, 50K–100K, 100K–500K, 500K–1M, 1M+), but reporting suggests these new buckets are visible in the web UI and to scrapers like ScrapeCreators rather than being fully exposed for commercial ads via the official Graph API endpoint.

---

## 4. Best Practices: Identifying High-Performing Competitor Ads

Because Meta does not expose CTR, ROAS, conversions, or spend for commercial ads, every competitive-intelligence tool — paid or free — falls back on the same set of indirect signals. Joe should rank competitor ads using these proxies, in priority order:

1. **Longevity (the #1 proxy for performance)** — if an ad has been running continuously for 60+ days, the advertiser is profitably scaling it. Sort by `ad_delivery_start_time` ascending and filter to ads where `ad_delivery_stop_time` is null. Anything live for more than 90 days is almost certainly a winning creative.
2. **Volume of variants on the same theme** — when a brand runs 8 versions of basically the same hook with minor tweaks, they are in active scale-and-test mode. ScrapeCreators returns the variant `cards` array, which makes this easy to detect.
3. **Cross-platform delivery** — ads delivered on both Facebook and Instagram (and especially Audience Network/Messenger) reflect higher confidence and budget than single-platform delivery.
4. **Impression-bucket badge** — for ads that have one in the public web UI, a 100K–500K or 500K–1M+ badge is a strong scale signal. ScrapeCreators surfaces this where Meta does.
5. **Ad volume per page** — pages running 30+ active ads simultaneously are mature paid-marketing operations whose creatives are worth studying.
6. **Recent creation date with no end date** — fresh ads (started in the last 14 days) that are still active mean the brand is iterating; useful for catching trends before they peak.
7. **CTA + landing page consistency** — if multiple of a brand's long-running ads point to the same offer page (e.g. a $97 audit, a free guide), that offer is converting.

What does NOT work as a signal: like/comment counts on the ad — these are organic engagement on the post object and are not visible for many ads. Don't waste time looking for them.

---

## 5. Existing Claude Code Skills Relevant to Ad Research

There is **no specific "Facebook Ad Library competitive research" `.md` Claude Code skill yet** in the public ecosystem — Joe has a small first-mover opportunity to publish one. The closest existing skills he can install today and adapt:

- **`OpenClaudia/openclaudia-skills`** — a curated 34-skill marketing pack including `competitor-analysis`, `keyword-research`, `seo-audit`, `email-sequence`, and `email-subject-lines`. Install via `npx skills add OpenClaudia/openclaudia-skills` or `cp -r skills/competitor-analysis ~/.claude/skills/`.
- **`AgriciDaniel/claude-ads`** — a paid-advertising audit skill with 250+ checks across Google, Meta, YouTube, LinkedIn, TikTok, Microsoft, and Apple Ads. Designed for auditing one's own accounts rather than competitor research, but the scoring frameworks are reusable. Install: `cp -r .claude/skills/ads ~/.claude/skills/`.
- **`mathiaschu/meta-ads-analyzer`** — Claude Code skill + MCP combo focused on Meta Ads campaign diagnosis (Breakdown Effect, Learning Phase). Skill files at `skill/`; install via `cp -r skill/* .claude/skills/meta-ads-analyzer/`. Useful patterns to copy when Joe writes his own.
- **`Weizhena/Deep-Research-skills`** — generic two-phase deep research skill for Claude Code; pairs nicely with the `fb_ad_library` MCP for systematic competitor sweeps.
- **`use-apify.com/blog/claude-code-skills-marketing-business`** — published copy-paste-ready SKILL.md templates for marketing skills including a "Competitor Analysis" skill that Joe can lightly adapt.

Joe's specific need (rank top FB ads in the contractor-marketing niche) is narrow enough that the right move is to **write a new SKILL.md** — say, `.claude/skills/contractor-ad-research/SKILL.md` — that reads from the `fb_ad_library` MCP, applies the longevity-first ranking heuristic above, and outputs a standardized creative-teardown template. A starter skeleton is included in the workflow below.

---

## 6. Recommended End-to-End Workflow for Joe

Step 1 — Install the MCP (one-time, ~10 minutes).

```bash
git clone https://github.com/trypeggy/facebook-ads-library-mcp.git
cd facebook-ads-library-mcp && ./install.sh
# Add SCRAPECREATORS_API_KEY (free tier: scrapecreators.com) and optionally GEMINI_API_KEY to .env
claude mcp add-json "fb_ad_library" \
  '{"command":"'"$PWD"'/venv/bin/python","args":["'"$PWD"'/mcp_server.py"]}'
```

Step 2 — Build a target-brand list. In King Maker's CLAUDE.md or a project file, list ~20 brands that already advertise to roofers/HVAC/plumbers on Facebook so the skill has a starting universe. Examples to seed: Hook Agency, BlackStorm Roofing, Roofing Webmasters, Roofing.com, Top Rated Local, Footbridge Media, ContractorGorilla, 99 Calls, RYNO Strategic Solutions, Surefire Local, Sera Systems, ServiceTitan (for awareness of how the platform giants advertise), HighLevel/GoHighLevel (huge contractor-agency overlap), JobNimbus, Housecall Pro, Profit Roofing Systems, Adam Bensman/The Roof Strategist, Hook & Loop, Sandler Training (for B2B sales overlap), Local Marketing Vault.

Step 3 — Drop a Claude Code skill at `.claude/skills/contractor-ad-research/SKILL.md`. Minimal version:

```markdown
---
name: contractor-ad-research
description: Find and rank top-performing Facebook ads in the web design / SEO / lead-gen space for home-service contractors. Ranks by longevity, ad volume, cross-platform delivery, and impression bucket. Outputs a standardized creative teardown for each top performer.
---

# Contractor Ad Research

When the user asks for top Facebook ads in the contractor-marketing space:

1. Use the `fb_ad_library` MCP server.
2. Resolve all brands in `kingmaker/competitors.md` to platform IDs via `get_meta_platform_id` (batch).
3. Pull current ads via `get_meta_ads` (batch).
4. For each ad, compute `days_running = today - ad_delivery_start_time`. Filter to ads with `is_active = true`.
5. Rank ads using this weighted score: (days_running * 1.0) + (variant_count * 5) + (cross_platform_bonus 20) + (impression_bucket_score 0|10|25|50|100|200).
6. Select the top 10. For each, call `analyze_ad_image` (or `analyze_ad_video` if applicable) to get a creative breakdown.
7. Output a Markdown teardown table with these columns: Brand, Days Running, Variants, Platforms, Impression Bucket, Hook (first 30 chars of ad copy), Headline, Primary CTA, Landing Page Domain, Creative Format, Estimated Offer, "Why It Works" (2 sentences).
8. End with a "Top 3 Inspiration Picks for King Maker's $997 Landing Page" section that maps each top ad's hook formula to a $997-offer adaptation.

If no ad data is returned, check that the SCRAPECREATORS_API_KEY is set and credits remain.
```

Step 4 — Run the workflow conversationally:

> "Use the contractor-ad-research skill. Pull current ads for every brand in `competitors.md`, filter to ads that have been running over 60 days, and give me the top 3 with full teardowns. Then write three $997 landing-page hook variations inspired by them."

Step 5 — Iterate weekly. Set a calendar reminder for Monday 9am to re-run the skill. Long-running ads churn slowly; the brands worth copying in May 2026 will largely still be the brands worth copying in June. New entrants are the interesting signal — flag any ad that wasn't there last week but is now active and high-volume.

Step 6 — Optional power-up: pair the FB Ad Library MCP with a **Google Ads Library MCP** for a complete paid-channel view. The same trypeggy team maintains `proxy-intell/google-ads-library-mcp` (formerly `talknerdytome-labs/google-ads-library-mcp`), which works the same way for the Google Ads Transparency Center.

---

## Cost Summary

- Claude Code subscription: $20/mo (Pro) — already required for Joe's broader workflow.
- ScrapeCreators API: free 100-credit starter; pay-as-you-go from there. Realistic monthly cost for one solo agency: $10–$30/mo.
- Google Gemini (optional video analysis): free tier covers most solo use cases.
- Apify (alternative to ScrapeCreators): $5–$20/mo for the rental actor or $1 per 1,000 ads on the metered actors.
- Total realistic monthly cost: **under $30/mo** versus $99–$149/mo for AdSpy, Foreplay, AdEspresso, or comparable commercial spy tools — and you keep full data ownership and Claude-native conversational access.

---

## A Note on Reliability and Source Quality

Several of the third-party blog posts cited above (admakeai.com, simplified.com, sociavault.com, adlibrary.com) have mild promotional framing for their own paid products; the technical claims about Meta's API restrictions, the limited usefulness of the official endpoint for commercial ads, the fragility of CSS-selector-based scrapers, and the general "longevity is the only real proxy" advice are nonetheless consistent across independent sources (Swipekit, AdManage, Meta's own developer docs at facebook.com/ads/library/api, and the academic review at paulcbauer.github.io). The trypeggy MCP server's star count (218 stars, 28 forks, 39 commits as of May 2026) and the existence of multiple production forks suggest it is actively maintained, but as with any ScrapeCreators-dependent tool, Joe should expect occasional breakage when Meta updates the Ad Library DOM and budget a small amount of debugging time per quarter. The Apify actors are typically faster to recover from such breakage because Apify maintains them centrally; that is a reasonable failover if the local MCP ever stops returning data.
