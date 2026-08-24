# KM Data Toolkit — Saturday Growth-Partner Presentation
*Maximalist-but-honest. What actually adds capability vs. what's redundant repackaging. Scan: 2026-06-29 (9 GitHub passes + DataForSEO module audit).*

## VERDICT — Is DataForSEO all you need?
**For keyword / SERP / backlink / traffic / LOCAL / competitor data: YES, ~95%.** DataForSEO is the *raw aggregator that Ahrefs/SEMrush are themselves built on.* Modules you have enabled:
- **Keywords** — volume, difficulty, ideas, search intent, related (Google Ads + clickstream)
- **SERP + rankings** — incl. AI-overview / featured-snippet presence
- **On-page** — technical-SEO site crawler/auditor
- **Backlinks** — full profile + competitor gap
- **Business Data** — Google Business Profile / reviews / **local** data
- **Labs** — traffic estimates, ranked keywords, competitor analysis
- **Domain Analytics** — tech stack, Whois

**Two genuine gaps it does NOT cover → the two adds that actually matter (below).**

## ⭐ THE TWO REAL ADDS (not redundant)

### 1. AI-Search / AEO citation tracking — YOUR DIFFERENTIATOR
DataForSEO shows AI-overview SERP features, but NOT *"does ChatGPT / Perplexity / Gemini NAME this business when asked 'best roofer in [town]'."* That's the angle almost no agency shows — your **"you're invisible to AI"** moment. The space exploded in the last month; the live OSS/Claude-native ones:
- ⭐ **onvoyage-ai/gtm-engineer-skills** (1252★) — Claude skill: AEO+GEO scorer + framework fixes
- ⭐ **Auriti-Labs/geo-optimizer-skill** (508★) — audits + tracks whether AI engines cite the site
- **hellowalt/aeo-radar** (19★) — *monitors* brand visibility on ChatGPT (the "are you cited" tracker)
- **multivmlabs/aeo.js** (100★) · **getcito** (130★) · **Canonry/aeo-audit** (10★) · **searchstack-aeo** (86★, monitors visibility + generates llms.txt)
- Master lists to mine: **amplifying-ai/awesome-generative-engine-optimization** (429★) · **luka2chat/awesome-geo** (137★)
- **Simplest version needs NO tool:** in the pitch, ask ChatGPT live — *"best roofer in [their town]"* — and show them they're not named. Devastating + free.

### 2. Geo-grid local rank map — the KILLER VISUAL PROOF
- ⭐ **local-falcon/mcp** (20★) — **official Local Falcon MCP** (geo-grid rank tracking + AI visibility). NEW since the last scan. IF you have/get a Local Falcon account ($), this makes the **geo-grid map** (where they rank across a grid of pins over their town) agent-native. That map is the single most visceral *"you only show up in your 5-mile pocket"* visual.
- No real free OSS alternative (re-confirmed — the recreations are 0★ junk). Local Falcon (paid) is the real one.

## KEYWORDS — your focus, maximalist + the honest truth
DataForSEO (done) already = Ahrefs/SEMrush-grade keyword data. To be *truly* complete, add the free first-party layer + a question-miner:
- ⭐ **Google Keyword Planner** (free, first-party) — *"Google's OWN numbers"* = the credibility layer in a pitch.
- ⭐ **Google Trends / pytrends** (free, 2-min install) — seasonality + trend. Roofing is storm/season-driven → powerful in the story.
- **chukhraiartur/seo-keyword-research-tool** (155★) — Google Autocomplete + **People Also Ask** + Related Searches (the long-tail / question keywords DataForSEO is lighter on).
- *(redundant)* rdowns26/seo_keyword_research_tools (166★, Adwords volume — DataForSEO covers it).

> ⚠️ **HONEST TRUTH:** "every keyword tool" = mostly the **same data repackaged.** Ahrefs / SEMrush / Ubersuggest / Mangools all resell Google Keyword Planner + clickstream. DataForSEO + Keyword Planner + Trends + the PAA miner = **you already have what every agency has.** More tools ≠ more data.

## SKIP / vet
- **egebese/dataseo-mcp**, **cnych/seo-mcp** (free "Ahrefs data" MCPs) — ⚠️ ToS-gray + run scraping code in your env; DataForSEO covers it reliably. Only in an isolated env if you want free cross-validation.
- The dozen 0★ seo-mcp / PAA-scraper clones — thin. ASO/Amazon tools — not your market.

## SETUP ORDER (before / between calls — DataForSEO is the only must)
1. ✅ **DataForSEO MCP** — DONE (loads on your next reset).
2. **pytrends** — `pip install pytrends`, free, seasonality data. 2 min.
3. **AEO check** — I can do it live (query the engines on demand); OR wire **gtm-engineer-skills** if you want it built-in.
4. **chukhraiartur keyword tool** (PAA/autocomplete) — clone/pip, optional.
5. **Local Falcon** — only if you grab an account ($); then the MCP. Best visual, but paid.

## THE DEMO-LAYERING (your end goal) — read this, it's a credibility landmine
You want *"look up the demo → holy shit."* The honest mechanics:
- ⚠️ **The SO demo will NOT show impressive 3rd-party RANKING/traffic/AI-citation data** — it's a demo (no domain age, no backlinks, no GBP, not a real business), so it won't rank or get AI-cited yet. **Do NOT imply it does** — a prospect pulling "the demo's data" and seeing near-zero is the one thing that nukes your credibility.
- **What it WILL show (and IS "holy shit"):** run the SO demo through ANY SEO/AEO auditor → ~95-100 score, full schema, AI-readable, perfect technical foundation — vs a typical roofer site scoring ~30. *"Look it up yourself — this is what a real foundation looks like."* That's a real, verifiable flex.
- **The actual "holy shit" = THEIR data vs the demo's structure:** their town's search volume they're missing · where they rank (page 4) · their backlinks (3 vs the leader's 50) · *"watch me ask ChatGPT 'best roofer in [town]' — you're not named"* · the projected revenue if you fix it. That story — DataForSEO + the live AEO check — is what lands.
- The *demo's own* look-it-up proof becomes real once you have a **real client climbing the rankings.** That's Saturday-guy's future testimonial.

## THE BOTTOM LINE (ultrathink)
Tool COUNT is not the moat and it's not what beats an agency — every agency pulls the same data (it all traces to Google + clickstream + DataForSEO-class APIs). What puts you in a league of your own:
1. **The data STORY** (depth + framing) — the analysis layer + your value-prop research, not tool count.
2. **The AI-search angle** — genuinely under-served; almost no agency shows the AI-citation gap. Needs ~one AEO tool + a live ChatGPT query, not ten keyword tools.
3. **The honesty** — modeled-not-promised numbers. Agencies inflate; you don't. That trust IS the moat.

**DataForSEO (done) + pytrends + a live AEO check + (optional) Local Falcon for the map = league-leading.** The maximalism that wins Saturday is the *story's depth*, not the *toolbox's breadth.*
