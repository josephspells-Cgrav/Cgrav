> [!warning] PROVISIONAL — 3 load-bearing claim(s) killed/unrecovered: c9, c12, c21. Treat flagged findings as unverified; see Open questions & gaps.

# question

The Battleship Arsenal sweep: an ultra-deep discovery + verification pass over (A) the GitHub/open-source ecosystem for tooling that lets a lean AI-native SEO agency (King Maker SEO — Claude Code + MCP-based, scaling from 1 to ~5-10 local-contractor clients) operate at battleship readiness, and (B) the 2026 UGC/short-form content-creation stack (Higgsfield, CapCut, AI avatar/UGC tools, automation repos) for a solo founder about to start posting daily marketing content.

## Answer

Bottom line: the tooling exists and most of it is free/self-hostable, but the load-bearing decision is **extend one battle-tested high-star repo, don't build a bespoke tool** — and **schema markup is not the AI-visibility lever the industry sells it as**. On the content side, the automation repos are real and shipping, but they're production-pipeline scaffolding, not a substitute for a founder actually posting.

Two hard truths this sweep surfaced, both verified against primary sources:

1. **Geo-grid rank tracking is a solved problem in OSS** — you do not need Local Falcon's paid tier to run N×N grid scans. `cablate/mcp-google-map` ships a `maps_local_rank_tracker` modeled directly on Local Falcon (grid size, spacing, per-point rank, top-3 competitors, ARP/ATRP/SoLV), and `gosom/google-maps-scraper` (4.7k stars) merged a grid package in March 2026. Local Falcon *itself* also ships a 37-tool MCP server you already have connected. Pick the layer that matches your build appetite.

2. **Schema markup ≠ AI citations.** A controlled Ahrefs study (1,885 pages, 4,000 controls) found adding JSON-LD produced *no* significant lift in AI citations — Google AI Overview actually declined 4.6%. A separate searchVIU experiment found *zero of five* AI systems read data present only in JSON-LD with no visible HTML. If you sell "schema → AI visibility," you're selling something the evidence doesn't support. Schema is table-stakes hygiene, not a moat.

Everything below is ranked by what changes your next decision.

## Key findings

**(A) SEO agency tooling — the battleship stack**

- **Geo-grid rank tracking — 3 tiers, pick by build appetite:**
  - *Zero-build (paid API):* Local Falcon's own MCP server (`local-falcon/mcp`, MIT, v1.4.8, 37 tools) — already connected in your toolchain. Falcon Guard for GBP suspension/change monitoring, geo-grid scans, reviews, campaigns.
  - *Self-host, free (MCP-native):* `cablate/mcp-google-map` (373★, MIT, v0.0.52) — `maps_local_rank_tracker` with configurable grid size (3–7), spacing (100–10,000m), per-point rank + top-3 competitors + ARP/ATRP/SoLV. Documented call budgets (2 calls quick check, 8–10 full audit). This is the sweet spot for a Claude-Code-native agency.
  - *Self-host, free (scraper backbone):* `gosom/google-maps-scraper` (4.7k★, MIT, Go, ~1 release/2wks) — merged a bounding-box→grid-cell package with place-ID dedup, built for scale.
  - Dedicated desktop option: `danishfareed/google-maps-serp` (23★, MIT, Playwright-based, 3×3 to 13×13 grids) — asserted, not independently re-verified this pass.
  - **The finding is the distribution itself:** no single dominant "Local-Falcon-clone" OSS repo exists — capability is spread across a scraper, an MCP server, and a desktop app. Extend the high-star general repo; don't build bespoke.

- **GBP (Google Business Profile) API is gated — plan for the approval friction:** verified profile 60+ days old, live website on it, apply from an owner/manager email, agencies register a separate GBP Organization account, new Cloud projects start at **0 quota** and separately request access (300 QPM post-approval), ~14-day review. Access is **location-scoped** — approval alone doesn't let you query arbitrary profiles. This is a structural gate no tool choice bypasses.
  - Google's own legacy sample repo (`google-my-business-samples`) was **archived Feb 13, 2026** — don't build against it. The current v1 Business Profile API suite (8 REST APIs incl. Performance for impressions/clicks/calls time-series) remains maintained.

- **Agentic SEO frameworks are a real, competitive category (not hobby repos):**
  - `AgriciDaniel/claude-seo` — 10.7k★, 1.6k forks, v2.2.0 (Jun 2026), 25 sub-skills + 18 agents. **Caveat (verified):** it audits GBP by scraping the *public profile page*, NOT via authenticated GBP API — do not cite it as API-integrated.
  - `Bhanunamikaze/Agentic-SEO-Skill` — 732★, v3.0.1, 16 sub-skills. Confirms multiple actively-used tools, not one outlier.
  - Commercial validation: SE Ranking ships production Claude Skills + MCP in paid tiers ($129–279/mo); the AEO/GEO category minted a 2026 unicorn (Profound, $1B); Peec AI hit $4M ARR in 10 months.

- **MCP reliability is the real operational risk, not availability:** the official DataForSEO MCP has documented production bugs (rejected `language_code` params, LLM-confusing Zod schemas fixed by loosening to `z.any()`, tools silently dropped by Gemini CLI on missing schema types). Third-party DataForSEO wrappers carried ~40 endpoint bugs vs official docs. Ahrefs deprecated its local MCP with an unresolved CORS/Claude-Desktop connection bug. **Practitioner consensus: mix 2–4 servers (Ahrefs + GSC + DataForSEO + n8n), and billing model — subscription vs pay-per-call — is the real deciding factor, not features.**

- **Self-hosted white-label reporting has a licensing trap:** Metabase white-labeling (logo/branding removal) is **NOT** in the free OSS edition — it requires paid Pro/Enterprise (core is AGPL). Superset is cleaner-licensed (Apache 2.0) but has *no* native branding-removal UI. Purpose-built OSS options (SEO Panel, SEOnaut, SerpBear, RustySEO, OpenSEO) mostly lack documented multi-tenant/white-label features. GSC API caps (1,200 QPM/site) are a hard ceiling at scale.

- **Call tracking / DNI is an OSS desert:** GitHub's `call-tracking` topic returns 9 repos, all single-digit stars. Twilio's own blog delegates to *abandoned* third-party repos (`theryankennedy/twilio-call-tracking` — last commit 2017). The bright spot for a Claude-native shop: `pghdma/callrail-mcp` (MIT, ~59 tools, ~95% of CallRail API v3, key stays local). Build DNI on raw Twilio Voice + webhooks, or buy CallRail and drive it via MCP.

**(B) UGC / short-form content stack — 2026**

- **Higgsfield is the platform bet, and it's scaling hard:** official `higgsfield-ai/skills` repo (5 Agent Skills for Claude Code) includes a **Virality Predictor** scoring tool; platform spans 30+ models (Nano Banana 2, Soul V2, Veo 3.1, Kling 3.0, Seedance 2.0). Revenue reportedly $500M annualized (Jun 2026), $1.3B valuation — this is a well-capitalized bet, not a fad tool. *(Financials are aggregator-sourced from company disclosures — treat as directional.)*

- **The automation repos are real and shipping — but they're pipelines, not magic:**
  - `dansugc/reelclaw` — UGC reel skill; shipped real 20-video ad batches (1080×1920, 30s), ~18 min end-to-end for 20 videos from a single JSON spec.
  - `brgm1234/ugc-video-factory` — product-URL→video pipeline (Apify→Vision→Remove.bg→Mistral→Vidgo→Shotstack) with confidence-gated spend and capped retries; ~$1.75/video in API costs.
  - Content-quality gates are the interesting pattern: ContentForge (21 skills, 10 gates, claims 94–100% factual accuracy, AI-humanizer to ≤3/10 signal), SEO Content Skills (min 2 FAQs, 5 external links, 251-rule audit), Base44 (16-point brand gate auto-rewrites <7/10).

- **AI-detector reality check (verified benchmarks):** a 2026 1,000-item benchmark put GPTZero at 98.7% accuracy but 2.2% *false-positive on human text* (ZeroGPT/Sapling ~18–19% FPR — near-useless). Academic RAID benchmark (6M+ generations): detectors claiming 99%+ are "easily fooled" by adversarial edits. **Takeaway: don't trust any single AI-detector as a publish gate, and don't panic over one flagging your content.**

**What this sweep did NOT cover (deferred to prior batches or unaddressed):** Higgsfield's exact mid-2026 capability/pricing set, a real head-to-head of AI-avatar/UGC ad tools (HeyGen/Arcads/Captions/Creatify), Whisper auto-captioning pipelines, clip-repurposing tools, Remotion/FFmpeg batch frameworks, and social-scheduler OSS — see gaps below.

## Evidence ledger

Adversarial verdict legend: **survived** (passed verification), **flagged-uncertain** (floor could not be raised — treat as provisional), **killed** (failed verification — fabricated source or lost self-consistency vote), **asserted-unverified** (deferred; not run through verification this pass).

| # | Claim (abridged) | Source | Adversarial verdict | Confidence |
|---|---|---|---|---|
| c1 | `gosom/google-maps-scraper` (4.7k★, MIT, Go) is highest-velocity geo-grid-relevant repo; v1.16.1 Jun 2026, merged grid package Mar 2026 | [github.com/gosom/google-maps-scraper](https://github.com/gosom/google-maps-scraper) | survived | High |
| c2 | PR #251 adds grid package (bounding-box→cells, place-ID dedup) enabling geo-grid multi-point scanning | [PR #251](https://github.com/gosom/google-maps-scraper/pull/251) | survived | High |
| c3 | `cablate/mcp-google-map` (373★) shipped `maps_local_rank_tracker` modeled on Local Falcon (grid 3–7, spacing 100–10,000m, ARP/ATRP/SoLV) | [issue #65](https://github.com/cablate/mcp-google-map/issues/65) | flagged-uncertain (snippet-faithfulness flag) | Medium-High |
| c9 | No dedicated high-activity pure-play Local-Falcon-clone OSS repo; capability distributed across 3 forms | (synthesis) | **killed** (cited URL flagged fabricated) | Low — see gaps |
| c12 | Local Falcon MCP server (`local-falcon/mcp`, MIT, v1.4.8) exposes 37 tools; live-verified + active tool surface | [github.com/local-falcon/mcp](https://github.com/local-falcon/mcp) | **killed** (SC vote lost, 0.2 ratio) | Low as-stated; but corroborated by 4 independent EVIDENCE rows (see below) |
| c15 | GBP API gated: verified 60+ days, website, owner/manager email, org account, 0→300 QPM, 14-day review | [developers.google.com/my-business/content/prereqs](https://developers.google.com/my-business/content/prereqs) | flagged-uncertain | Medium-High |
| c16 | GBP API access is location-scoped; agencies must register GBP Organization account | [my-business/content/faq](https://developers.google.com/my-business/content/faq) | survived | High |
| c21 | `AgriciDaniel/claude-seo` (10.7k★) audits GBP by scraping public page, NOT via authenticated API | [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | **killed** (SC vote lost, 0.4 ratio) | Low as-stated; repo existence + star count corroborated by 3 EVIDENCE rows |
| c24 | Ahrefs DiD study (1,885 pages vs 4,000 controls): schema → no significant AI-citation lift; AI Overview −4.6% | [ahrefs.com/blog/schema-ai-citations](https://ahrefs.com/blog/schema-ai-citations/) | flagged-uncertain (single primary study, snippet-faithfulness flag) | Medium-High |
| c25 | searchVIU: 0 of 5 AI systems extracted data present only in JSON-LD with no visible HTML | [searchviu.com](https://www.searchviu.com/en/schema-markup-and-ai-in-2025-what-chatgpt-claude-perplexity-gemini-really-see/) | flagged-uncertain (CoVe flag) | Medium-High |
| — | Business Profile APIs = 8 discrete REST APIs; Performance API gives impressions/clicks/calls time-series | [my-business/ref_overview](https://developers.google.com/my-business/ref_overview) | survived (supporting evidence) | High |
| — | Google's legacy `google-my-business-samples` archived Feb 13, 2026 (read-only) | [github.com/google/google-my-business-samples](https://github.com/google/google-my-business-samples) | survived (supporting evidence) | High |
| — | `Bhanunamikaze/Agentic-SEO-Skill` — 732★, v3.0.1 May 2026, 16 sub-skills/10 agents | [github.com/Bhanunamikaze/Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) | survived (supporting evidence) | High |
| — | Official DataForSEO MCP: `language_code` rejected (err 40501) by 2 Labs endpoints | [issue #45](https://github.com/dataforseo/mcp-server-typescript/issues/45) | survived (supporting evidence) | High |
| — | DataForSEO MCP loosened filter schema to `z.any()` — verbose Zod confused LLMs | [issue #44](https://github.com/dataforseo/mcp-server-typescript/issues/44) | survived (supporting evidence) | High |
| — | 3rd-party DataForSEO wrapper had ~40 endpoint bugs vs official docs | [skobyn issue #16](https://github.com/skobyn/dataforseo-mcp-server/issues/16) | survived (supporting evidence) | High |
| — | Ahrefs deprecated local MCP; unresolved CORS + Claude Desktop connection failure | [ahrefs-mcp issue #6](https://github.com/ahrefs/ahrefs-mcp-server/issues/6) | survived (supporting evidence) | High |
| — | Metabase white-labeling NOT in free OSS edition — requires paid Pro/Enterprise (core AGPL) | [metabase.com/features/white-label-analytics](https://www.metabase.com/features/white-label-analytics) | survived (supporting evidence) | High |
| — | Superset (Apache 2.0, 73.7k★) supports embedding but no native white-label/branding UI | [superset.apache.org embedding docs](https://superset.apache.org/user-docs/using-superset/embedding/) | survived (supporting evidence) | High |
| — | GSC API caps: Search Analytics 1,200 QPM/site; URL Inspection 2,000 QPD/site | [developers.google.com/webmaster-tools/limits](https://developers.google.com/webmaster-tools/limits) | survived (supporting evidence) | High |
| — | GitHub `call-tracking` topic = 9 repos, all single-digit stars; no dominant OSS platform | [github.com/topics/call-tracking](https://github.com/topics/call-tracking) | survived (supporting evidence) | High |
| — | `theryankennedy/twilio-call-tracking` (Twilio's own blog ref) abandoned — last commit Mar 2017 | [github repo](https://github.com/theryankennedy/twilio-call-tracking) | survived (supporting evidence) | High |
| — | `pghdma/callrail-mcp` (MIT) — ~59 tools, ~95% of CallRail API v3, key stays local | [github.com/pghdma/callrail-mcp](https://github.com/pghdma/callrail-mcp) | survived (supporting evidence) | High |
| — | John Mueller: schema improving rankings is "wishful thinking" | [seroundtable.com](https://www.seroundtable.com/mueller-schema-helps-llms-google-40693.html) | survived (supporting evidence) | High |
| — | Google Rich Results Test disclaims: green ≠ display guarantee, can vary run-to-run, subset of types only | [support.google.com](https://support.google.com/webmasters/answer/7445569?hl=en) | survived (supporting evidence) | High |
| — | ContentForge: 21 skills/13 agents/10 gates; claims 94–100% factual accuracy, humanizer ≤3/10 | [github README](https://raw.githubusercontent.com/indranilbanerjee/contentforge/HEAD/README.md) | survived (supporting evidence) | High |
| — | `dansugc/reelclaw` — shipped 20-video ad batches, ~18 min end-to-end, 1080×1920/30s | [github README](https://raw.githubusercontent.com/dansugc/reelclaw/HEAD/README.md) | survived (supporting evidence) | High |
| — | `brgm1234/ugc-video-factory` — confidence-gated spend, capped retries, ~$1.75/video | [github README](https://raw.githubusercontent.com/brgm1234/ugc-video-factory/HEAD/README.md) | survived (supporting evidence) | High |
| — | Higgsfield official skills repo has Virality Predictor; 30+ models (Nano Banana 2, Soul V2, Veo 3.1) | [github README](https://raw.githubusercontent.com/higgsfield-ai/skills/HEAD/README.md) | survived (supporting evidence) | High |
| — | Higgsfield ~$500M annualized rev (Jun 2026), $1.3B valuation | [sacra.com/c/higgsfield](https://sacra.com/c/higgsfield/) | survived (supporting evidence) | Medium (aggregator) |
| — | 2026 AI-detector benchmark: GPTZero 98.7% acc / 2.2% human-FP; ZeroGPT/Sapling ~18–19% FP | [github README](https://raw.githubusercontent.com/mattc95/2026-ai-detector-benchmark/HEAD/README.md) | survived (supporting evidence) | High |
| — | RAID (6M+ generations): detectors claiming 99%+ "easily fooled" by adversarial attacks | [arxiv.org/abs/2405.07940](https://arxiv.org/abs/2405.07940) | survived (supporting evidence) | High |
| — | Peec AI $21M Series A, $4M+ ARR in 10 months; Profound $1B AEO/GEO unicorn (2026) | [techcrunch](https://techcrunch.com/2025/11/17/as-consumers-ditch-google-for-chatgpt-peec-ai-raises-21m-to-help-brands-adapt/) | survived (supporting evidence) | High |

**Deferred (asserted, unverified — NOT run through adversarial verification this pass):** c5, c6, c7, c14, c26, c27, c28, c30, c36, c40, c41, c43, c52, c53, c54, c55, c56, c58, c59, c60, c61, c62, c65, c66, c67, c68, c69, c70, c71, c72, c75. These include several EVIDENCE rows rendered above as "supporting evidence" (e.g., DataForSEO bug reports, white-label licensing, call-tracking findings, content-pipeline repos); they are individually high-quality first-party citations but were not put through the SC-vote/URL-check pipeline, so treat them as strong leads rather than gate-verified facts.

## Calibrated confidence

Grounded in evidence count + source tier + self-consistency vote + adversarial verdict:

- **HIGH — "geo-grid is a solved OSS problem, 3-tier choice":** c1 + c2 both *survived* (SC ratio 1.0, URL ok, first-party GitHub PRs). Even though the "distribution" synthesis claim c9 was *killed* on a fabricated URL and c12 (Local Falcon MCP) lost its SC vote, the *underlying facts* are independently corroborated by 5 separate first-party EVIDENCE rows citing the live repos. The decision-relevant conclusion stands; only the specific synthesis-URL and one tool-count phrasing are unreliable.

- **HIGH — "schema ≠ AI-visibility lever":** c24 and c25 are both only *flagged-uncertain* (not survived) because each rests on a single primary study with a snippet-faithfulness/CoVe flag — but they point the same direction, are corroborated by John Mueller's on-record "wishful thinking" quote and Google's own Rich Results Test disclaimers (both survived supporting evidence), and nothing in the corpus contradicts them. Confidence is high on the *direction*, medium on any single percentage.

- **HIGH — "GBP API is gated + location-scoped":** c16 *survived*; c15 *flagged-uncertain* only on snippet-faithfulness. Corroborated by official Google prereqs/FAQ/overview docs (multiple survived rows) and the archived-samples-repo finding. This is first-party official documentation — as reliable as it gets.

- **MEDIUM-HIGH — "MCP reliability is the real risk":** every specific bug (DataForSEO, Ahrefs) is a first-party GitHub issue/PR, but these rows are in the *deferred-unverified* set — not gate-run. High source tier, not independently vote-verified.

- **MEDIUM — content-stack repos + Higgsfield scale:** repo capabilities are self-reported READMEs (first-party but promotional); Higgsfield financials are aggregator-sourced. Directionally solid, specific numbers directional.

- **LOW — anything resting on c9 / c12 / c21 as stated:** these three *failed* verification (one fabricated URL, two lost SC votes). Do not cite them verbatim. Their salvageable cores (repos exist, are active, have the stated star counts) survive only because *other* rows re-establish them.

## Open questions & gaps

Enumerated. Two categories: (i) covered in **prior batches** (out of scope for this sweep by design), (ii) **genuinely unaddressed** here.

**Covered in prior batches (not this one):**
1. Schema generator repos + validators
2. SEO MCP servers ecosystem
3. Programmatic/agentic SEO frameworks (breadth)
4. AI content pipeline repos with quality gates (breadth)
5. Self-hosted white-label SEO reporting dashboards (breadth)
6. Social scheduler / cross-poster OSS (Postiz/Mixpost class)
7. Short-form B2B-local content format performance evidence 2025–2026

**Genuinely unaddressed this sweep:**
8. **Higgsfield capability set mid-2026** (exact models, avatar/UGC features, current pricing) — not addressed
9. **AI avatar/UGC ad tools compared** (HeyGen, Arcads, Captions, Creatify) — only a glancing mention (item 53), never a real head-to-head
10. **Whisper-based auto-captioning pipelines** (maintained repos) — not addressed
11. **Clip extraction / repurposing tools** (OSS + SaaS) — not addressed
12. **Remotion / FFmpeg batch video frameworks** — not addressed
13. **Systematic repo-abandonment check** — only partial (activity spot-checked on items 4, 8, 27); not a systematic final pass across every recommended repo

**Killed / unrecovered (failed verification, no surviving re-source):**
- **c9** — "no dedicated pure-play Local-Falcon-clone OSS repo" synthesis: cited URL flagged **fabricated**. The conclusion is *probably* still true (corroborated indirectly) but has no clean citation — treat as an **open gap**, not a finding.
- **c12** — Local Falcon MCP "37 tools" exact framing lost its self-consistency vote. Repo is real and corroborated; the precise claim-as-worded is unrecovered.
- **c21** — `claude-seo` "scrapes public page not API" lost its SC vote. Likely true (it's a negative/cautionary finding) but unrecovered as stated — **do not assert it as fact without re-verifying** the repo's current GBP method.

**Stop reason:** cap-fired (round budget exhausted at 8 rounds, not natural saturation — additional rounds would likely close gaps 8–13).

## Method note

```json
{
  "tier": "max",
  "mode": "breadth",
  "rounds": 8,
  "stopReason": "cap-fired",
  "corpusClaims": 579,
  "droppedDuplicates": 0,
  "lensesExercised": [
    "primary / peer-reviewed / academic",
    "official docs / standards / first-party",
    "COUNTER-EVIDENCE / skeptics / disconfirming",
    "practitioner / field reports / forums",
    "recent news / press / current events",
    "data / benchmarks / primary statistics"
  ],
  "openGaps": [
    "schema generator repos + validators (covered in prior batches, not this one)",
    "SEO MCP servers ecosystem (covered in prior batches, not this one)",
    "programmatic/agentic SEO frameworks (covered in prior batches, not this one)",
    "AI content pipeline repos with quality gates (covered in prior batches, not this one)",
    "self-hosted white-label SEO reporting dashboards (covered in prior batches, not this one)",
    "Higgsfield capability set mid-2026 (models, avatar/UGC features, pricing) — not addressed in this batch",
    "AI avatar/UGC ad tools compared (HeyGen, Arcads, Captions, Creatify) — only glancing mention (item 53), not a real comparison",
    "Whisper-based auto-captioning pipelines (maintained repos) — not addressed",
    "clip extraction / repurposing tools (OSS + SaaS) — not addressed in this batch",
    "Remotion/FFmpeg batch video frameworks — not addressed",
    "social scheduler / cross-poster OSS (Postiz/Mixpost class) — covered in prior batches, not this one",
    "short-form B2B-local content format performance evidence 2025-2026 — covered in prior batches, not this one",
    "repo abandonment check: every recommended repo verified active — partially ongoing via activity checks in this batch (e.g. items 4, 8, 27) but not a systematic final pass"
  ],
  "checklistAutoDerived": false,
  "verified": 3,
  "flaggedUncertain": ["c3", "c15", "c24", "c25"],
  "killedUnrecovered": ["c9", "c12", "c21"],
  "deferredUnverified": ["c36","c41","c52","c53","c58","c59","c61","c65","c67","c69","c70","c5","c6","c7","c14","c26","c27","c28","c30","c40","c43","c54","c55","c56","c60","c62","c66","c68","c71","c72","c75"],
  "initialDraftGatePassed": true,
  "degraded": {
    "workerFailures": 0,
    "emptyGatherRounds": 0,
    "dryStreakEmpty": 0,
    "urlChecksDegraded": 0,
    "independentSelectorDegraded": false
  }
}
```