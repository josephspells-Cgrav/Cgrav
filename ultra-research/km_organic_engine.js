export const meta = {
  name: 'km-organic-dominance-research',
  description: 'Max-rigor ultra-research for the King Maker organic-dominance offer foundation (Summit & Oak): validate+source the 6-pillar organic-over-pack thesis (B.0) and rank the 6 one-time shippable off-page levers (B.1). Fan-out gather x2 rounds with structural citations, per-pillar cited synthesis + load-bearing nomination, adversarial red/blue refutation per claim, then thesis-verdict + ranked-levers + NO-PBN guardrail synthesis. WARM on KM_VALUEPROP — extends verified anchors.',
  phases: [
    { title: 'Gather R1', detail: 'parallel pillar research: verify anchors + extend, structural citations + snippets' },
    { title: 'Gather R2', detail: 'saturation: counter-evidence + primary-source corroboration per pillar' },
    { title: 'Synthesize', detail: 'per-pillar cited section + nominate load-bearing claims' },
    { title: 'Verify', detail: 'adversarial red/blue per load-bearing claim (URL-health -> SC vote -> snippet -> counter-source)' },
    { title: 'Deliverables', detail: 'thesis verdict + ranked off-page levers + NO-PBN honesty guardrails' },
  ],
}

const LENS = `LENS — Defensible, not optimistic. This is the FOUNDATION of King Maker's organic-dominance OFFER (reel/pitch-bound, FTC-exposed) — it must be bulletproof + cited. RULES: (1) every load-bearing claim needs a source_url captured AT GATHER time — no retrofitted citations; (2) prefer PRIMARY sources (Google first-party docs, Whitespark/BrightLocal/Sterling Sky/Moz independent studies, aggregator/manufacturer primary pages, .gov) over agency/vendor blogs; (3) flag vendor-incentive stats (source_type 'vendor-incentive') + find independent corroboration; (4) RANGES not point-promises — promise the FLOOR, project the CEILING; (5) label measured vs modeled vs directional; (6) NO PBN / link-scheme / gray-hat — exclude explicitly; (7) ONGOING client-managed off-page is OUT of scope (do not editorialize/caveat/pivot to it); ONE-TIME shippable off-page is IN scope. Polished false confidence is the cardinal sin. THE SPINE: judge everything by "does it maximize ORGANIC regional dominance" — the pack is a proximity-capped byproduct we deliver but never center.`;

const TOOLING = `SEARCH TOOLING — Use mcp__firecrawl-mcp__firecrawl_search as PRIMARY search (if its schema is not loaded, call ToolSearch query "select:mcp__firecrawl-mcp__firecrawl_search" first). Use firecrawl_scrape or WebFetch to confirm a page actually contains the stat/snippet. If firecrawl errors/out-of-credits, FALL BACK to WebSearch + WebFetch (ToolSearch "select:WebSearch,WebFetch"). TWO-PASS: broad to map the landscape, then narrow to chase the exact figure + a primary/independent corroborator. Capture the exact supporting snippet for EVERY claim — the verifier checks it against the live page.`;

const WARM = `WARM CONTEXT (KM_VALUEPROP, just verified this session — EXTEND, do not restart; cite the underlying PUBLIC sources, not the internal doc):
- Proximity is a TOP local-pack factor; the specific "~55%" did NOT trace to a primary Whitespark table — do NOT assert 55%.
- Sterling Sky address-hiding study (8,186 businesses / 200 cities) measures address/proximity gating of the pack.
- Whitespark 2026 LSRF (EXPERT-SURVEY = modeled, flag it): PACK = GBP 32% / reviews 20% / on-page 15% / behavioral 9% / links 8% / citations 6%; ORGANIC = on-page 33% / links 24% / GBP 7% / behavioral 10% / citations 7%.
- Google Prominence definition counts inbound links; a business's ORGANIC web position is itself a stated pack factor.
- Links move ORGANIC (~24% weight) far more than the PACK (~8%); SearchPilot internal-link split-tests = +5-25% causal; earn-don't-buy.
- Review VELOCITY is the fastest pack lever (Sterling Sky Magic-10 + a 60+/mo client that "fell off a cliff" after 18 days dormant); reviews ~20% pack weight.
- Manufacturer find-a-pro (GAF/OC/CertainTeed, DA ~60-80) = highest-ROI roofer link, topically relevant + credential-gated.
- Yext = LEASE-not-own (stop paying -> reverts); KM uses permanent/direct citations.
- FTC fake-review rule (Oct 2024, up to ~$51,744/violation) -> review ask must be universal/unscreened (no gating); self-serving aggregateRating is INELIGIBLE for star rich-results (still useful as content/AI signal).
- Pack captures ~44-50% of local-result clicks (NOT "60-90%"); roofing organic close ~15-25%; storm/replacement ticket five-figure (Verisk ~$17,631); realistic value-per-lead ~$2,400 REVENUE not profit.`;

function gatherR1Prompt(p) {
  return `You are a max-rigor research agent for King Maker. PILLAR ${p.id} — ${p.title}.
${LENS}
${TOOLING}
${WARM}
QUESTION: ${p.q}
PILLAR-SPECIFIC SEED (verify the URL resolves + the stat holds, then EXTEND): ${p.seed}
SEARCH ANGLES: ${p.angles}
LOAD-BEARING TARGETS (nail these with sources): ${p.targets}
DO NOT OVERSELL: ${p.oversell}
Return structured claim records. Each claim: the precise claim, the stat/number, source_url, source_type, the exact supporting snippet, confidence, measured_or_modeled, verifies_seed. Also return counterEvidence (the skeptic's strongest complicating points), gapsRemaining, lensesUsed. Aim for 8-14 well-sourced claims — quality over volume; >=2 must be primary/independent (not vendor-incentive).`;
}

function gatherR2Prompt(p, r1) {
  const known = ((r1 && r1.claims) || []).map(c => `- ${c.claim} (${c.source_url})`).join('\n') || '(round 1 returned nothing usable)';
  return `SECOND-PASS / SATURATION research for PILLAR ${p.id} — ${p.title}.
${LENS}
${TOOLING}
ROUND 1 ALREADY FOUND:\n${known}
YOUR JOB: (1) find what round 1 MISSED — new primary/independent sources, roofing-vertical or NC/Triangle data, more recent (2025-2026) figures; (2) actively hunt COUNTER-EVIDENCE that would weaken this pillar's thesis (a skeptic's strongest sources); (3) for the load-bearing claims, find a PRIMARY or independent corroborator OR a contradiction. Targets still open: ${p.targets}. Do NOT repeat round-1 claims unless adding a STRONGER source. Return NEW claim records + counterEvidence + remaining gaps. If genuinely saturated, return few claims + say so in gapsRemaining — do not pad.`;
}

function synthPrompt(p, merged) {
  const claims = JSON.stringify((merged && merged.claims) || []).slice(0, 13000);
  const counter = JSON.stringify((merged && merged.counter) || []).slice(0, 4000);
  return `Synthesize PILLAR ${p.id} — ${p.title} for the King Maker ORGANIC-DOMINANCE PLAYBOOK.
${LENS}
CLAIMS CORPUS (gathered + sourced):\n${claims}\nCOUNTER-EVIDENCE:\n${counter}
Write sectionMarkdown: a tight decision-maker section — bottom-line first, short declarative sentences, a parenthetical (source URL) on EVERY load-bearing statement, honest RANGES (floor/ceiling) where relevant, a one-line "What NOT to oversell" closer. Voice: matter-of-fact, cause->effect, zero hedge — never promotional. Then nominate the 3-5 LOAD-BEARING claims (the ones that go on a slide/reel or anchor the offer) for adversarial verification: each gets a stable id (${p.id}-1, ...), the claim, stat, source_url, source_type, snippet, whyLoadBearing, draftConfidence, measured_or_modeled. Also return whatNotToOversell as a list. ${p.kind === 'lever' ? 'For this LEVER pillar, ALSO state in the section: one-time-vs-ongoing, dofollow-vs-nofollow/equity-vs-citation, approximate one-time cost, and an impact-vs-effort read.' : ''} Must read DEFENSIBLE, not hyped.`;
}

function verifyPrompt(c) {
  return `ADVERSARIAL VERIFICATION of ONE load-bearing King Maker offer claim. DEFAULT posture: REFUTE it. It survives ONLY if external evidence holds.
CLAIM ${c.id} [pillar ${c.pillarId} — ${c.pillarTitle}]: "${c.claim}"
STAT: ${c.stat || '(none given)'}
CITED SOURCE: ${c.source_url}
CAPTURED SNIPPET: ${c.snippet || '(none)'}
${TOOLING}
RUN THIS EXACT SEQUENCE:
1) URL HEALTH — fetch the cited source_url (firecrawl_scrape or WebFetch). Does it resolve + ACTUALLY support the stat+claim? If dead/fabricated/unsupported -> verdict=killed (urlHealth dead|fabricated) and stop.
2) SELF-CONSISTENCY — reason through 3 DISTINCT stances judging on evidence not prior: (a) a skeptic who assumes vendor spin, (b) a literalist checking the exact number/wording, (c) a local-SEO practitioner asking "does this replicate across INDEPENDENT sources?". Search for independent corroboration AND counter-sources. Supermajority -> high; bare majority -> flag; <50% -> kill.
3) SNIPPET FAITHFULNESS — does the captured snippet genuinely support the claim, or is it a stretch/misattribution?
4) COUNTER-SOURCE — find the single best source that REFUTES or BOUNDS the claim; report it.
Render: verdict (survived|flagged|killed|corrected); urlHealth (live-supports|live-weak|dead|fabricated); externalSignal (the CONCRETE signal that drove the verdict; if "none" you may NOT return killed/corrected); counterEvidence; correctedText (ONLY if corrected — honest replacement + source); finalConfidence (High|Medium|Low); measured_or_modeled; reasoning. A 'corrected' verdict REQUIRES a named external signal + replacement text. Never "fix" without a signal — no signal -> survived or flagged.`;
}

function thesisPrompt(digest) {
  return `Render the HEADLINE B.0 THESIS VERDICT for the King Maker organic-dominance offer, using ONLY the verified-claim digest below.
${LENS}
VERIFIED CLAIM DIGEST:\n${digest}
The thesis: "For high-ticket roofing, ORGANIC regional dominance is the engine + the offer headline; the map pack is a proximity-capped (~5-7mi), doubly-gated (proximity + review-count) near-default BYPRODUCT — not the path to $5-10M." Return: verdict (one of: STRONGLY SUPPORTED | SUPPORTED | MIXED | REFUTED), confidence (High/Med/Low + why), the floorCeiling field = the HONEST INFILTRATION SHAPE — pack ~1-2 jobs/MONTH early (review-gated + proximity-fractured "Christmas tree"), maturing to ~10/mo only at the ~2yr ceiling; organic carries months ~1-18 (no proximity-grid penalty + zero-pack long-tail); BOTH MODELED, claim the SHAPE + ranges NEVER a job count (NOT "jobs/week" — that is snake oil); conditions = the two requirements ($5-10k/mo off-page + unscreened review mandate); honestyCorrections = the 2-3 a skeptic forces (incl. the high-ticket SCOPING of the lead-quality claim, and that 70%-pre-sold / 60-70%-click-skip are modeled/claim-library). Bottom-line first, defensible, ranges not promises.`;
}

function leversPrompt(digest) {
  return `Rank the ONE-TIME, shippable-day-one off-page LEVERS for King Maker by impact-vs-effort, using ONLY the verified-claim digest below. ALL must be one-time/shippable (NOT ongoing client-managed). NO PBN.
${LENS}
VERIFIED CLAIM DIGEST:\n${digest}
Return a ranked list (highest impact-vs-effort first). Each lever: rank, name, oneTimeOrOngoing, impact (High/Med/Low + why), effort (S/M/L), dofollowEquity (does it pass real link equity, or citation/NAP value only, or trust/UX only), confidence, weShipOrClientOperates (what KM ships vs what the client runs), and a one-line note. Also return a short topThree (the 3 biggest levers) and an explicit excluded list (NO PBN / gray-hat / lease-not-own like Yext).`;
}

function guardrailsPrompt(digest) {
  return `Produce the HONESTY / DEFENSIBILITY GUARDRAILS for the King Maker organic-dominance offer — a pre-publish checklist. From the digest + pillar context.
${LENS}
VERIFIED CLAIM DIGEST:\n${digest}
Return: neverClaim (specific overclaims to avoid — "win the pack with pages", a precise proximity % like 55%, a point-promise jobs/week number, "guaranteed rankings", PBN/link-scheme, Yext-as-owned, self-serving star schema, SOC2/bank-level); sayInstead (instead/ofClaiming reframe pairs); ftcPosture (one paragraph: ranges-not-promises, floor/ceiling, NO PBN, review-gating is FTC+Google violation, position on verifiable ACTIONS).`;
}

// ---------- schemas ----------
const CLAIM_ITEM = { type: 'object', properties: { claim: { type: 'string' }, stat: { type: 'string' }, source_url: { type: 'string' }, source_type: { type: 'string' }, snippet: { type: 'string' }, confidence: { type: 'string' }, measured_or_modeled: { type: 'string' }, verifies_seed: { type: 'boolean' } }, required: ['claim', 'source_url', 'source_type', 'snippet', 'confidence'] };
const GATHER_SCHEMA = { type: 'object', properties: { pillarId: { type: 'string' }, claims: { type: 'array', items: CLAIM_ITEM }, counterEvidence: { type: 'array', items: { type: 'object', properties: { point: { type: 'string' }, source_url: { type: 'string' }, soWhat: { type: 'string' } }, required: ['point'] } }, gapsRemaining: { type: 'array', items: { type: 'string' } }, lensesUsed: { type: 'array', items: { type: 'string' } } }, required: ['pillarId', 'claims'] };
const LB_ITEM = { type: 'object', properties: { id: { type: 'string' }, claim: { type: 'string' }, stat: { type: 'string' }, source_url: { type: 'string' }, source_type: { type: 'string' }, snippet: { type: 'string' }, whyLoadBearing: { type: 'string' }, draftConfidence: { type: 'string' }, measured_or_modeled: { type: 'string' } }, required: ['id', 'claim', 'source_url', 'draftConfidence'] };
const SYNTH_SCHEMA = { type: 'object', properties: { pillarId: { type: 'string' }, pillarTitle: { type: 'string' }, sectionMarkdown: { type: 'string' }, loadBearingClaims: { type: 'array', items: LB_ITEM }, whatNotToOversell: { type: 'array', items: { type: 'string' } } }, required: ['pillarId', 'sectionMarkdown', 'loadBearingClaims'] };
const VERDICT_SCHEMA = { type: 'object', properties: { claimId: { type: 'string' }, verdict: { type: 'string' }, urlHealth: { type: 'string' }, externalSignal: { type: 'string' }, counterEvidence: { type: 'string' }, correctedText: { type: 'string' }, finalConfidence: { type: 'string' }, measured_or_modeled: { type: 'string' }, reasoning: { type: 'string' } }, required: ['claimId', 'verdict', 'urlHealth', 'finalConfidence', 'reasoning'] };
const THESIS_SCHEMA = { type: 'object', properties: { verdict: { type: 'string' }, confidence: { type: 'string' }, floorCeiling: { type: 'string' }, conditions: { type: 'array', items: { type: 'string' } }, honestyCorrections: { type: 'array', items: { type: 'string' } }, bottomLine: { type: 'string' } }, required: ['verdict', 'confidence', 'bottomLine'] };
const LEVERS_SCHEMA = { type: 'object', properties: { levers: { type: 'array', items: { type: 'object', properties: { rank: { type: 'number' }, name: { type: 'string' }, oneTimeOrOngoing: { type: 'string' }, impact: { type: 'string' }, effort: { type: 'string' }, dofollowEquity: { type: 'string' }, confidence: { type: 'string' }, weShipOrClientOperates: { type: 'string' }, note: { type: 'string' } }, required: ['rank', 'name', 'impact', 'effort'] } }, topThree: { type: 'array', items: { type: 'string' } }, excluded: { type: 'array', items: { type: 'string' } } }, required: ['levers', 'topThree'] };
const GUARDRAILS_SCHEMA = { type: 'object', properties: { neverClaim: { type: 'array', items: { type: 'string' } }, sayInstead: { type: 'array', items: { type: 'object', properties: { instead: { type: 'string' }, ofClaiming: { type: 'string' } }, required: ['instead'] } }, ftcPosture: { type: 'string' } }, required: ['neverClaim'] };

// ---------- the 12 pillars ----------
const PILLARS = [
  { id: 'T1', kind: 'thesis', title: 'Proximity ceiling of the map pack',
    q: 'Is the local 3-pack proximity-bound (~5-7mi effective radius) and revenue-capped per physical location — so it cannot scale a roofer to $5-10M from one office?',
    seed: 'Proximity is a TOP pack factor (do NOT assert "55%" — it did not trace to a primary Whitespark table); Sterling Sky address-hiding test (8,186 biz/200 cities) measures address/proximity gating; Moz calls proximity heavily weighted; pack = 3 results re-ranked per searcher location.',
    angles: 'proximity as a local-pack ranking factor (Whitespark/BrightLocal/Sterling Sky/Moz); how far a single GBP ranks in the pack (radius/grid decay — Local Falcon SoLV); "near me" radius; per-location revenue cap of pack visibility.',
    targets: 'the ~5-7mi effective radius (range + confidence + how it varies by density); the per-location revenue-cap logic; that the pack is NOT the path to regional/state ($5-10M) scale.',
    oversell: 'do NOT assert a precise universal mile radius (varies by population/competition density); proximity weight is directional not a published %; never say the pack is "useless" — it is the highest-intent surface WITHIN radius.' },
  { id: 'T2', kind: 'thesis', title: 'Prominence dilates the pack radius (organic feeds the map)',
    q: 'Does organic/web authority (links, content, organic rank) expand the effective map-pack radius of a real office — organic feeds the pack while the pack rarely feeds organic?',
    seed: 'Google Prominence definition explicitly counts "how many websites link to your business"; a business ORGANIC web position is itself a stated pack factor (searchengineland local-pack guide). Web authority -> Prominence -> wider pack reach. The site SUPPORTS the pack, never WINS it with pages.',
    angles: 'Google local-ranking Prominence definition (support.google.com/business/answer/7091); does higher organic authority widen the geographic radius a GBP ranks for (Sterling Sky / Whitespark prominence + radius); the asymmetry organic->pack (strong) vs pack->organic (weak).',
    targets: 'the prominence->radius mechanism (cited); the directionality (organic feeds map); confidence.',
    oversell: 'radius-dilation is directional/mechanistic, not a measured "X miles per Y links"; never claim the site WINS the pack; prominence is one of three pillars (relevance/distance/prominence), distance still gates.' },
  { id: 'T3', kind: 'thesis', title: 'Link-absorption capacity (deep site vs thin site)',
    q: 'Can a deep enterprise site absorb a $5-10k/mo off-page budget across silos (internal-equity cascade) safely, while a thin 5-page site over-optimizes homepage anchors -> spam-filter / velocity risk?',
    seed: 'Links move ORGANIC (~24% weight) >> pack (~8%); SearchPilot internal-link split-tests +5-25% causal; Google link-spam policy penalizes optimized-anchor + unnatural velocity; a deep site = more rankable URLs + more natural anchor distribution; earn-don\'t-buy.',
    angles: 'anchor-text over-optimization + link-velocity spam thresholds (Google link-spam policy + practitioner safe anchor ratios); internal-link equity distribution across deep silos (PageRank/reasonable-surfer); does more content = more link targets + safer anchor profile; thin-site over-optimization risk.',
    targets: 'the mechanism (deep site distributes budget safely; thin site over-optimizes -> risk); the spam-velocity logic; confidence.',
    oversell: 'thin-site "spam risk" is directional (Google DEVALUES more than penalizes); $5-10k/mo absorption is a mechanism claim not a guaranteed-rank claim; link COUNT->rank is correlation not causation (lean on the causal internal-link tests).' },
  { id: 'T4', kind: 'thesis', title: 'Map-vs-organic ranking-factor weighting',
    q: 'What is the real ranking-factor split for the local pack vs local organic — verify the modeled ~32/15/8 (pack GBP/on-page/links) vs ~7/33/24 (organic GBP/on-page/links)?',
    seed: 'Whitespark 2026 LSRF (EXPERT-SURVEY = modeled, flag): PACK = GBP 32 / reviews 20 / on-page 15 / behavioral 9 / links 8 / citations 6; ORGANIC = on-page 33 / links 24 / GBP 7 / behavioral 10 / citations 7. On-page + links dominate organic; GBP + reviews dominate the pack.',
    angles: 'Whitespark 2026 Local Search Ranking Factors (pack + organic columns); BrightLocal / Sterling Sky corroboration; explicitly flag modeled-vs-measured (expert survey, not Google-published); the on-page+links share of ORGANIC.',
    targets: 'the verified split (pack vs organic) with confidence + the MODELED flag; the takeaway — organic is won by the levers a deep site + off-page control (on-page 33 + links 24 = ~57%).',
    oversell: 'these are expert-survey OPINION (modeled), +/- points, NOT Google-published weights — flag every time; do not sum proximity naively into the category buckets.' },
  { id: 'T5', kind: 'thesis', title: 'Map-pack EARLY-STAGE reality + the honest infiltration math',
    q: 'Why does the pack UNDER-deliver early, and what is the honest jobs-per-MONTH shape (NOT "a couple jobs/week")? Two compounding penalties: review-asymmetry click-skip + proximity-grid "Christmas tree" fracturing.',
    seed: 'CORRECTED honest model (supersedes any "jobs/week" framing): pack early contribution ~= 1-2 jobs/MONTH (review-gated + proximity-fractured), maturing SLOWLY toward ~10/MONTH only after ~2 years + matched reviews + an expanded grid. BOTH are MODELS — claim the SHAPE (low early, slow-maturing, proximity-capped) + ranges, NEVER anchor on a job count (promising 10 retail jobs out of the gate = snake oil). Two mechanisms: (1) REVIEW-ASYMMETRY CLICK-SKIP — pack CTR is NOT a clean #1>#2>#3 positional drop; a low-review #1 gets SKIPPED for a high-review #2/#3 (review count + social proof drives the click as much as position). (2) PROXIMITY-GRID FRACTURING ("Christmas tree") — "you rank #1 in [town]" is usually measured from the office coordinates; a Local Falcon geo-grid shows a fresh/low-review profile wins only a ~1-2mi bubble around the shop and fractures (#5/#8/#14) across town where a closer competitor wins each grid point. Reach/ticket context (round-1 verified): five-figure ticket (Verisk ~$17,631); organic OUT-clicks the pack (~44-51% vs ~29-32%, BrightLocal); organic close ~15-25%; revenue != profit (NRCA avg net 2.8%).',
    angles: 'CTR-by-review-count data (does review count override position in the pack — a low-review #1 skipped for a high-review #2/#3?); Local Falcon / geo-grid SoLV studies showing the "Christmas tree" fracture of a fresh profile across a town; how long a new GBP takes to mature in the pack; honest early job-count for a brand-new local business; the reach multiplier of organic vs a 5-7mi pack bubble.',
    targets: 'SOURCE the review-asymmetry click-skip + the proximity-grid fracturing (Local Falcon/geo-grid + CTR-by-review-count); the honest 1-2 jobs/MONTH early shape maturing to ~10/mo @ ~2yr (BOTH modeled); flag every number MODELED.',
    oversell: 'NEVER "a couple jobs a week" or "10 jobs out of the gate" (snake oil); 1-2/mo and ~10/mo are BOTH MODELS — claim the SHAPE + ranges, never a job count; CTR-by-review-count %s (e.g. 60-70% click-skip) are modeled/reel-bound -> claim-library; the grid-fracture magnitude (#5/#8/#14) is illustrative.' },
  { id: 'T6', kind: 'thesis', title: 'The sequencing — organic carries the pipeline months ~1-18',
    q: 'Because the pack under-delivers early, does ORGANIC carry the pipeline through months ~1-18 while the client heals the review deficit + expands the grid?',
    seed: 'A #1 ORGANIC /locations/[city] page ranks for the WHOLE town regardless of where the searcher stands — the organic blue-link is NOT re-localized per-searcher-coordinate the way the pack is (no proximity-grid penalty) — PLUS it captures the zero-pack long-tail. So organic = the day-one + sustained engine; the pack = the slow-maturing, review-gated bonus that fills in over ~2 years. Organic ramp itself is slow (avg #1 page ~5yrs old; only 1.74% of new pages hit top-10 in a year — Ahrefs), but once a page ranks it serves the whole metro immediately on its terms (no distance fracture).',
    angles: 'does organic ranking re-localize per searcher position like the pack, or rank uniformly across a town/region (the key asymmetry); timeline for a new site to rank organically (locations + long-tail) vs for a new GBP to mature in the pack; the "organic carries while reviews heal the pack" sequencing.',
    targets: 'SOURCE that organic blue-links are NOT proximity-grid-fractured the way the pack is (rank uniformly for a town); the ~1-18mo sequencing framing; organic as the day-one + sustained engine.',
    oversell: 'organic ramp is ALSO slow (6-18mo to compound, not instant); the sequencing is a SHAPE/strategy framing, not a dated guarantee; do not imply organic is instant or that the pack never matures.' },
  { id: 'T7', kind: 'thesis', title: 'Organic lead-QUALITY differential (SCOPED to high-ticket)',
    q: 'For a $15-30k CONSIDERED roofing purchase (NOT low-ticket urgent), are organic leads higher-quality / larger-ticket / better-close than pack leads — via intent split + the owned conversion environment + de-risking?',
    seed: 'SCOPE IT: true for CONSIDERED purchases ($15-30k), NOT universal (low-ticket urgent = the pack\'s transactional speed wins — maps to dual_intent_forking). Three mechanisms: (1) INTENT SPLIT — pack = urgent/commodity/price-sensitive/multi-bid; organic = researched/authority-seeking. (2) OWNED CONVERSION ENVIRONMENT — an organic visitor lands on OUR site (E-E-A-T, galleries, speed, the conversion machine) and arrives PRE-SOLD (~70% modeled); a pack click converts on Google\'s turf in a multi-pin bake-off vs 2 competitors. (3) DE-RISKING — an owned domain is an appreciating asset; a map pin is RENTED (exposed to GBP suspension / false-flag reports / Google UI changes) — keep suspension claims MEASURED, do NOT dramatize as an epidemic.',
    angles: 'lead-quality / close-rate by channel for considered home-improvement purchases (organic/owned vs maps/aggregator); the "lands on your own site = pre-sold" conversion advantage; GBP suspension RISK (measured base rate, not dramatized); intent differences urgent-vs-researched for roofing.',
    targets: 'SOURCE the high-ticket-scoped quality differential (intent + owned-environment pre-sell + de-risking); the modeled 70%-pre-sold + 60-70%-click-skip flagged claim-library; the scoping caveat (NOT low-ticket urgent).',
    oversell: 'NOT universal — scope to considered/high-ticket; low-ticket urgent the PACK wins (speed). 70% pre-sold is MODELED -> claim-library. GBP suspension is REAL but MEASURED — do not dramatize as an epidemic.' },
  { id: 'T8', kind: 'thesis', title: 'Zero-pack long-tail volume (organic-only territory)',
    q: 'How often do high-funnel research/commercial roofing queries SUPPRESS or omit the map pack entirely — organic-only territory our /resources + /glossary + service x city silos own and a pack-only competitor is structurally blind to?',
    seed: 'Many research/commercial queries ("X shingle vs Y metal cost," "how to handle a hail claim [county]," "roof replacement cost [city]") do NOT trigger a local pack — they return organic + sometimes an AI Overview. A map-pack-only competitor (thin site) is structurally BLIND to this volume; our deep silos (/resources 34 articles + /glossary 20 terms + service x city) own it. Incremental organic reach the pack cannot touch.',
    angles: 'SERP-feature data: what share of roofing/home-improvement queries trigger a local pack vs organic-only (informational/research/commercial-investigation intent); which query types suppress the pack; the long-tail volume of zero-pack roofing research queries.',
    targets: 'SOURCE how often roofing research/commercial queries suppress the pack (SERP-feature %); the zero-pack territory our silos own; confidence.',
    oversell: 'exact pack-trigger %s vary by query mix + are directional (SERP features shift); do not overstate long-tail VOLUME (many low-volume queries — value is coverage + qualified intent, not a traffic majority — carry the KM_VALUEPROP long-tail correction).' },
  { id: 'T9', kind: 'thesis', title: 'The two execution conditions',
    q: 'How much does (a) a $5-10k/mo legitimate off-page campaign and (b) a company-wide review mandate each move organic rank AND the pack — and are they genuine requirements (not hedges)?',
    seed: 'Off-page retainers typically $500-2k/mo (5-10k = aggressive enterprise tier; only ~19% of providers at $5k+/mo); review VELOCITY is the fastest pack lever + the pack-deficit HEALER (Sterling Sky: 60+/mo client "fell off a cliff" after ~18-21 days dormant; Magic-10 trigger then plateau); reviews ~20% pack weight; FTC fake-review rule (Oct 2024, ~$51,744/violation) -> unscreened ask; earn-don\'t-buy links; off-page compounds 6-12mo.',
    angles: 'what $5-10k/mo legit off-page buys + organic impact + timeline (6-12mo); review-velocity measured impact on pack + organic (Sterling Sky); the dependency — these are conditions/requirements not optional; how reviews heal the pack deficit (ties to T5/T6).',
    targets: 'the quantified impact of each condition (ranges) on organic + pack; frame both as requirements; the review mandate as the pack-deficit healer.',
    oversell: 'ranges not promises; $5-10k/mo is enterprise-tier (most clients run less); the review mandate is the client\'s to EXECUTE (KM ships the machine — IN scope); NO PBN; off-page compounds over 6-12mo (not fast).' },

  { id: 'L1', kind: 'lever', title: 'Core data-aggregator push',
    q: 'Which 2026 data aggregators still feed the local ecosystem (Foursquare, Data Axle, Localeze/TransUnion, Apple/Bing/Google ingestion), direct vs Yext, one-time vs subscription, and the NAP-consistency leverage?',
    seed: 'Historic "big 4": Data Axle/InfoGroup, Localeze/Neustar(->TransUnion), Foursquare, Express Update (defunct 2021); Yext = LEASE-not-own; BrightLocal/Whitespark one-time citation builds; NAP consistency ~40% pack-appearance lift (BrightLocal); citations build-once then stop.',
    angles: 'current 2026 aggregator landscape (Foursquare, Data Axle, Localeze/TransUnion — which still feed Apple/Bing/Google); direct submission vs Yext lease; one-time vs subscription cost; NAP-consistency impact on the pack.',
    targets: 'which aggregators matter in 2026, one-time vs subscription, direct-vs-Yext recommendation (own-it), NAP leverage; an impact-vs-effort read.',
    oversell: 'aggregator landscape shifts (verify current state — Express Update is dead); Yext is lease-not-own (exclude for own-it positioning); aggregators are table-stakes FOUNDATION not a growth lever; one-time-cost figures vary — verify.' },
  { id: 'L2', kind: 'lever', title: 'Tier-1 manual citations',
    q: 'Rank tier-1 manual citation sources (Apple Business Connect, Bing Places, Yelp, BBB, Angi, HomeAdvisor, Houzz, Nextdoor, Thumbtack, Yellow Pages, Chamber, NC licensing board) by DA, dofollow/nofollow, link-equity vs citation value, one-time cost.',
    seed: 'Citations are table-stakes (build foundation once, stop; monthly volume self-undoes); most are nofollow (NAP/citation value not link equity); Apple Business Connect + Bing Places = free + AI-visibility relevant; BBB/Chamber = local trust; manufacturer find-a-pro is the higher-equity set (see L3).',
    angles: 'which tier-1 citations are dofollow vs nofollow; DA of each; citation/NAP value vs link equity; NC-specific (NC Licensing Board for General Contractors profile, local chambers); one-time cost.',
    targets: 'a ranked tier-1 citation list (free/paid, dofollow/nofollow, value type), NC-specific picks; impact-vs-effort.',
    oversell: 'most are NOFOLLOW (citation not link equity) — be honest; volume past the foundation is low-ROI; Angi/HomeAdvisor are lead-gen marketplaces (entity-validation value, sales pressure) — flag honestly.' },
  { id: 'L3', kind: 'lever', title: 'Manufacturer / credential backlinks',
    q: 'Which manufacturer/credential directories (GAF Master Elite locator, CertainTeed SELECT ShingleMaster, Owens Corning Platinum Preferred, NC/local roofing associations) pass REAL link equity + topical relevance — the high-authority links a credentialed roofer qualifies for but never claims?',
    seed: 'Manufacturer find-a-pro (GAF/OC/CertainTeed) = high-ROI, high-DA (~60-80), topically relevant — "highest-ROI link" for a roofer (localroofingseo); credential-gated (must hold the cert). Relevance > raw DA.',
    angles: 'GAF Master Elite / CertainTeed SELECT ShingleMaster / OC Platinum Preferred contractor locators — dofollow? DA? real link equity (or JS-rendered/nofollow)?; NC/regional roofing associations (NCRCA); the certification requirement; topical relevance value.',
    targets: 'ranked credential backlinks by REAL equity + relevance + qualification bar; the "qualify-but-never-claim" gap.',
    oversell: 'some locators are JS-rendered / nofollow (verify dofollow PER source — do not assume equity); credential-gated (client must hold the cert); do not overstate DA without verification.' },
  { id: 'L4', kind: 'lever', title: 'On-site local-proof layer (what WE build)',
    q: 'What on-site local-proof is buildable to lock the entity + feed Prominence — schema sameAs to every citation, embedded map + service-area geo, GBP-link->dedicated-landing, driving-directions, consistent NAP?',
    seed: 'schema sameAs locks the entity (Google uses sameAs for entity reconciliation); NAP consistency ~40% pack-appearance lift; GBP-link->dedicated-landing (anti-cannibalization, mappack playbook). Summit&Oak already has @graph + locationNode + 14 cities + footer NAP.',
    angles: 'schema sameAs entity-locking (Google entity reconciliation / knowledge graph); LocalBusiness geo + areaServed; the GBP landing-page pattern; NAP-consistency mechanism; what is config-driven/buildable.',
    targets: 'the buildable on-site local-proof components ranked; what locks the entity most; tie to the productization spec (config-driven).',
    oversell: 'sameAs helps entity CLARITY (directional, not a ranking multiplier); embedded maps are UX/trust more than a ranking lever — be honest; on-site alone does not move the pack.' },
  { id: 'L5', kind: 'lever', title: 'The review-acquisition machine',
    q: 'Spec the review-acquisition mechanism we ship (the /review funnel, QR for trucks/invoices/door-hangers, post-job request flow, aggregateRating wired) — the operationalizer of the company-wide review mandate.',
    seed: 'Review VELOCITY is the fastest pack lever (Sterling Sky Magic-10 + dormancy cliff); reviews ~20% pack weight; FTC fake-review rule (Oct 2024, up to ~$51,744/violation) -> mandate must be unscreened/no-gating; self-serving aggregateRating INELIGIBLE for star rich-results (still useful as content/AI). Summit&Oak has app/review + app/reviews + ReviewButton + GoogleReviewsWidget.',
    angles: 'review-velocity impact (Sterling Sky); review-gating compliance (FTC + Google ToS — must be unscreened, no satisfaction pre-screen); QR / post-job request-flow best practices; aggregateRating eligibility for stars; the /review funnel pattern.',
    targets: 'the review-machine spec + the compliance rails (NO gating); review velocity as the fastest lever; what KM ships vs what the client runs.',
    oversell: 'review GATING is an FTC + Google ToS violation — the ask must be universal/unscreened; self-serving aggregateRating will NOT show stars (use as content/AI signal); the client RUNS the mandate (KM ships the machine — IN scope, do not caveat).' },
  { id: 'L6', kind: 'lever', title: 'Other one-time levers',
    q: 'What OTHER verified one-time, shippable off-page levers exist (GBP-optimization asset kit, local press/sponsorship/HARO templates, geo/landing assets) — ranked, defensible, NO PBN?',
    seed: 'Local digital PR / reactive weather newsjacking + HARO/Featured (free) = high-ceiling white-hat links; local sponsorships/chamber; one-time GBP optimization (categories/services/photos/posts template); NO PBN / scholarship-links / PR-with-optimized-anchors (the penalty line).',
    angles: 'one-time GBP-optimization asset kit (primary category, services, photos, posts cadence template); local press/sponsorship/HARO templates; any other shippable one-time asset; the NO-PBN penalty line (Google link-spam policy).',
    targets: 'a ranked list of OTHER one-time levers; explicit NO-PBN exclusions.',
    oversell: 'PR/sponsorship links are EARNED (not guaranteed); GBP is client-owned/run (but a one-time optimization asset IS shippable); NO PBN / gray-hat / scholarship / optimized-anchor PR — exclude explicitly.' },
];

// ---------- run ----------
log(`KM organic-dominance research: ${PILLARS.length} pillars (6 thesis + 6 levers), 2 gather rounds + synth + adversarial verify + thesis/levers/guardrails synthesis.`);

const pipelineResults = await pipeline(
  PILLARS,
  (p, pillar) => agent(gatherR1Prompt(pillar), { label: `gatherR1:${pillar.id}`, phase: 'Gather R1', schema: GATHER_SCHEMA, effort: 'medium' }),
  async (r1, pillar) => {
    const r2 = await agent(gatherR2Prompt(pillar, r1), { label: `gatherR2:${pillar.id}`, phase: 'Gather R2', schema: GATHER_SCHEMA, effort: 'medium' });
    return { pillarId: pillar.id, claims: [...((r1 && r1.claims) || []), ...((r2 && r2.claims) || [])], counter: [...((r1 && r1.counterEvidence) || []), ...((r2 && r2.counterEvidence) || [])], gaps: [...((r1 && r1.gapsRemaining) || []), ...((r2 && r2.gapsRemaining) || [])] };
  },
  async (merged, pillar) => {
    const s = await agent(synthPrompt(pillar, merged), { label: `synth:${pillar.id}`, phase: 'Synthesize', schema: SYNTH_SCHEMA, effort: 'high' });
    return { pillar, merged, synth: s };
  },
);

const synthResults = pipelineResults.filter(Boolean);
log(`Synthesis done for ${synthResults.length}/${PILLARS.length} pillars. Flattening load-bearing claims for adversarial verification.`);

const lbAll = synthResults.flatMap(x => (((x.synth && x.synth.loadBearingClaims) || [])).map(c => ({ ...c, pillarId: x.pillar.id, pillarTitle: x.pillar.title })));
log(`${lbAll.length} load-bearing claims nominated -> adversarial red/blue verification.`);

const verdictsRaw = await parallel(lbAll.map(c => () => agent(verifyPrompt(c), { label: `verify:${c.pillarId}:${c.id}`, phase: 'Verify', schema: VERDICT_SCHEMA, effort: 'high' }).then(v => (v ? { ...v, _claim: c } : null))));
const verdicts = verdictsRaw.filter(Boolean);

const digest = verdicts.map(v => `- [${v._claim.pillarId}] ${v._claim.claim} | stat: ${v._claim.stat || 'n/a'} | verdict: ${v.verdict} | conf: ${v.finalConfidence} | ${v._claim.measured_or_modeled || ''} | ${v._claim.source_url}`).join('\n');
const survived = verdicts.filter(v => v.verdict === 'survived' || v.verdict === 'corrected');
log(`Verification: ${survived.length}/${verdicts.length} load-bearing claims survived/corrected. Synthesizing thesis verdict + ranked levers + guardrails.`);

const [thesis, levers, guardrails] = await parallel([
  () => agent(thesisPrompt(digest), { label: 'deliv:thesis-verdict', phase: 'Deliverables', schema: THESIS_SCHEMA, effort: 'high' }),
  () => agent(leversPrompt(digest), { label: 'deliv:ranked-levers', phase: 'Deliverables', schema: LEVERS_SCHEMA, effort: 'high' }),
  () => agent(guardrailsPrompt(digest), { label: 'deliv:guardrails', phase: 'Deliverables', schema: GUARDRAILS_SCHEMA, effort: 'high' }),
]);

return {
  pillars: synthResults.map(x => ({ id: x.pillar.id, kind: x.pillar.kind, title: x.pillar.title, section: (x.synth && x.synth.sectionMarkdown) || '', loadBearing: (x.synth && x.synth.loadBearingClaims) || [], whatNotToOversell: (x.synth && x.synth.whatNotToOversell) || [], gaps: (x.merged && x.merged.gaps) || [], counter: (x.merged && x.merged.counter) || [], allClaims: (x.merged && x.merged.claims) || [] })),
  verdicts: verdicts.map(v => ({ claimId: v._claim.id, pillarId: v._claim.pillarId, claim: v._claim.claim, stat: v._claim.stat, source_url: v._claim.source_url, source_type: v._claim.source_type, measured_or_modeled: v._claim.measured_or_modeled, verdict: v.verdict, urlHealth: v.urlHealth, externalSignal: v.externalSignal, counterEvidence: v.counterEvidence, correctedText: v.correctedText, finalConfidence: v.finalConfidence, reasoning: v.reasoning })),
  thesis, levers, guardrails,
  meta: { pillars: synthResults.length, loadBearing: lbAll.length, verified: verdicts.length, survived: survived.length },
};
