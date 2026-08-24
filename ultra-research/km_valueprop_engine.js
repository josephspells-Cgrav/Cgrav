export const meta = {
  name: 'km-valueprop-research',
  description: 'Max-rigor ultra-research across 11 King Maker value-prop pillars (enterprise authority site vs $297/mo GoHighLevel template): fan-out gather x2 rounds with structural citations, per-pillar cited synthesis + load-bearing claim nomination, adversarial red/blue refutation per claim, then cross-cutting objection/ROI-model/reels/guardrail drafts. Honesty lens enforced at every stage.',
  phases: [
    { title: 'Gather R1', detail: 'parallel pillar research: verify seed + extend, capture structural citations + snippets' },
    { title: 'Gather R2', detail: 'saturation pass: counter-evidence + primary-source corroboration per pillar' },
    { title: 'Synthesize', detail: 'per-pillar cited section + nominate 3-5 load-bearing claims' },
    { title: 'Verify', detail: 'adversarial red/blue refutation per load-bearing claim (URL-health -> SC vote -> snippet -> counter-source)' },
    { title: 'Deliverables', detail: 'objection-handling, ROI model, reels hooks, honesty guardrails from the verified corpus' },
  ],
}

// ---------- shared discipline blocks ----------
const LENS = `LENS — Defensible, not optimistic. This research arms King Maker's sales/reels/decks to survive a skeptic, a competitor, and the FTC. Honest > impressive. RULES: (1) every load-bearing claim needs a source_url captured AT GATHER time — no retrofitted citations; (2) prefer PRIMARY sources (Google first-party docs, Google's OWN feature/ideas/support boards, independent SEO studies like Whitespark/BrightLocal/Ahrefs/Backlinko/Sterling Sky, .gov data) over agency/vendor blogs; (3) when a stat traces to a vendor with a selling incentive, mark source_type 'vendor-incentive' and find an independent corroborator; (4) ranges not point-promises; (5) label measured vs modeled vs directional; (6) surface counter-evidence and gaps — never hide them. Polished false confidence is the cardinal sin.`;

const TOOLING = `SEARCH TOOLING — Use mcp__firecrawl-mcp__firecrawl_search as PRIMARY search (if its schema is not loaded, call ToolSearch with query "select:mcp__firecrawl-mcp__firecrawl_search" first). Use mcp__firecrawl-mcp__firecrawl_scrape or WebFetch to confirm a page actually contains the stat/snippet you cite. If firecrawl errors or is out of credits, FALL BACK to WebSearch + WebFetch (ToolSearch "select:WebSearch,WebFetch"). TWO-PASS: broad first to map the landscape, then narrow to chase the exact number + a primary/independent corroborator. Capture the exact supporting snippet for EVERY claim — the verifier checks it against the live page.`;

function gatherR1Prompt(p) {
  return `You are a max-rigor research agent for King Maker. PILLAR ${p.id} — ${p.title}.
${LENS}
${TOOLING}
QUESTION: ${p.q}
${p.seed ? 'SEED CLAIMS TO VERIFY (does the URL resolve + does the stat hold? then EXTEND — do not restart):\n' + p.seed : ''}
${p.prior ? 'PRIOR KING-MAKER RESEARCH (already adversarially verified — strong priors to confirm/extend; cite the underlying PUBLIC sources, not the internal note):\n' + p.prior : ''}
SEARCH ANGLES: ${p.angles}
LOAD-BEARING TARGETS (nail these with sources): ${p.targets}
DO NOT OVERSELL: ${p.oversell}
Return structured claim records. Each claim: the precise claim, the stat/number, source_url, source_type, the exact supporting snippet, confidence, measured_or_modeled, and verifies_seed. Also return counterEvidence (the skeptic's strongest complicating points), gapsRemaining, and lensesUsed. Aim for 8-15 well-sourced claims — quality over volume; at least 2 must be primary/independent (not vendor-incentive).`;
}

function gatherR2Prompt(p, r1) {
  const known = ((r1 && r1.claims) || []).map(c => `- ${c.claim} (${c.source_url})`).join('\n') || '(round 1 returned nothing usable)';
  return `SECOND-PASS / SATURATION research for PILLAR ${p.id} — ${p.title}.
${LENS}
${TOOLING}
ROUND 1 ALREADY FOUND:\n${known}
YOUR JOB: (1) find what round 1 MISSED — new primary/independent sources, roofing- or NC/Triangle-specific data, more recent (2025-2026) figures; (2) actively hunt COUNTER-EVIDENCE that would weaken this pillar's thesis (a skeptic's strongest sources); (3) for the load-bearing claims, find a PRIMARY or independent corroborator OR a contradiction. Targets still open: ${p.targets}. Do NOT repeat round-1 claims unless you are adding a STRONGER source. Return NEW claim records + counterEvidence + remaining gaps. If genuinely saturated (nothing new across diverse searches), return few claims and say so in gapsRemaining — do not pad.`;
}

function synthPrompt(p, merged) {
  const claims = JSON.stringify((merged && merged.claims) || []).slice(0, 13000);
  const counter = JSON.stringify((merged && merged.counter) || []).slice(0, 4000);
  return `Synthesize PILLAR ${p.id} — ${p.title} into the King Maker value-prop master doc.
${LENS}
CLAIMS CORPUS (gathered + sourced):\n${claims}\nCOUNTER-EVIDENCE:\n${counter}
Write sectionMarkdown: a tight decision-maker section — bottom-line first, short declarative sentences, a parenthetical (source URL) on EVERY load-bearing statement, an honest range where relevant, and a one-line "What NOT to oversell" closer. Voice: matter-of-fact, cause->effect, zero hedge — but never promotional. Then nominate the 3-5 LOAD-BEARING claims (the ones that would go on a sales slide or reel) for adversarial verification: each gets a stable id (${p.id}-1, ${p.id}-2, ...), the claim, stat, source_url, source_type, snippet, whyLoadBearing, draftConfidence, measured_or_modeled. Also return whatNotToOversell as a list. The section must read as DEFENSIBLE, not hyped.`;
}

function verifyPrompt(c) {
  return `ADVERSARIAL VERIFICATION of ONE load-bearing King Maker sales claim. DEFAULT posture: REFUTE it. It survives ONLY if external evidence holds.
CLAIM ${c.id} [pillar ${c.pillarId} — ${c.pillarTitle}]: "${c.claim}"
STAT: ${c.stat || '(none given)'}
CITED SOURCE: ${c.source_url}
CAPTURED SNIPPET: ${c.snippet || '(none)'}
${TOOLING}
RUN THIS EXACT SEQUENCE:
1) URL HEALTH — fetch the cited source_url (firecrawl_scrape or WebFetch). Does it resolve, and does it ACTUALLY contain/support the stat+claim? If dead, fabricated, or clearly not supporting the claim -> verdict=killed (urlHealth dead|fabricated) and stop.
2) SELF-CONSISTENCY — reason through 3 DISTINCT stances, judging on evidence not your prior: (a) a skeptic who assumes vendor spin, (b) a literalist who checks the exact number/wording, (c) a practitioner who asks "does this replicate across INDEPENDENT sources?". Search for independent corroboration AND for counter-sources. Supermajority support -> high; bare majority -> flag; <50% -> kill.
3) SNIPPET FAITHFULNESS — does the captured snippet genuinely support the claim, or is it a stretch/misattribution?
4) COUNTER-SOURCE — find the single best source that REFUTES or BOUNDS the claim; report it.
Render: verdict (survived|flagged|killed|corrected); urlHealth (live-supports|live-weak|dead|fabricated); externalSignal (the CONCRETE signal that drove the verdict — a dead URL, a lost vote, an unfaithful snippet, a refuting source; if "none", you may NOT return killed/corrected); counterEvidence; correctedText (ONLY if corrected — the honest replacement + its source); finalConfidence (High|Medium|Low); measured_or_modeled; reasoning. A 'corrected' verdict REQUIRES a named external signal + replacement text. Never "fix" without a signal — no signal -> survived or flagged.`;
}

function objectionsPrompt(digest) {
  return `Draft the OBJECTION-HANDLING appendix for King Maker's value-prop vs a $297/mo GoHighLevel template. Use ONLY the verified-claim digest below for numbers. Honest + sourced rebuttals; CONCEDE where GHL is genuinely fine. Voice: matter-of-fact, declarative, cause->effect, zero hedge (Howard Roark register) — but never overclaim.
VERIFIED CLAIM DIGEST:\n${digest}
Handle at least: "my GBP already gets me leads"; the proximity wall ("I can't rank in towns I'm not in"); "GHL already has missed-call-text-back"; "isn't this just more pages = doorway spam?"; "why one-time ~$5k vs $297/mo monthly?"; "close rate is on me, not the site"; "AI/ChatGPT will kill SEO anyway"; "PageSpeed doesn't matter for a local roofer". For each: objection, honestRebuttal, sourceOrBasis, confidence, and what to concede. Do not invent stats absent from the digest.`;
}

function modelPrompt(digest) {
  return `Build the CONSERVATIVE / REALISTIC / OPTIMISTIC ROI model for a King Maker authority site for an NC roofing contractor. EVERY output number is MODELED — label it. Use ONLY sourced inputs from the digest for ticket size, close rate, lead multiple, value-per-lead; where you assume, mark the assumption + reason.
VERIFIED CLAIM DIGEST:\n${digest}
Return: inputs (name, value, source, measured/modeled); three scenarios (conservative|realistic|optimistic) each with monthlyLeads, closeRate, jobsPerMonth, avgTicket, annualRevenue, deltaVsGhl (incremental annual revenue vs staying on a $297/mo template, net of ~$5k one-time + ~$500/mo ops); a clean tableMarkdown; caveats (close-rate is on the client; ramp/cold-start; ranges not promises; modeled-not-measured). A skeptic should find the model conservative, not hyped.`;
}

function reelsPrompt(digest) {
  return `Write a REELS HOOK BANK: 12-15 one-line hooks for King Maker short-form, each tied to a VERIFIED claim + an honest framing that survives a screenshot/skeptic. Use ONLY the digest. Voice: punchy, declarative, reframe-the-norm-as-mediocrity (Howard Roark) — no exclamation points, no hype words.
VERIFIED CLAIM DIGEST:\n${digest}
Each: hook (on-screen line), backingClaim, source_url, honestFraming (the caveat that keeps it true — e.g. "organic/storm leads, not 'win the pack'"; "AI = future-proofing not volume"; "modeled range"), confidence. BAN any hook that claims: winning the map pack with pages, an AI lead flood, guaranteed rankings / top-3-in-90-days, SOC2/bank-level security, or any unsourced magnitude.`;
}

function guardrailsPrompt(digest) {
  return `Produce the consolidated HONESTY / DEFENSIBILITY GUARDRAILS for the King Maker value-prop doc — a pre-publish checklist. From the digest + pillar context, return: neverClaim (the specific overclaims to avoid — win-the-pack-with-pages, AI-lead-flood, guaranteed rankings / top-3-in-90-days, SOC2/bank-level/compliant, any unsourced magnitude, "we win you the pack"); sayInstead (instead/ofClaiming reframe pairs); ftcPosture (one paragraph: position on ACTIONS not attestations; the FTC enforces false security + ranking-guarantee claims independent of any breach; screenshot-proof posture).
VERIFIED CLAIM DIGEST:\n${digest}`;
}

// ---------- schemas ----------
const CLAIM_ITEM = {
  type: 'object',
  properties: {
    claim: { type: 'string' }, stat: { type: 'string' }, source_url: { type: 'string' },
    source_type: { type: 'string' }, snippet: { type: 'string' }, confidence: { type: 'string' },
    measured_or_modeled: { type: 'string' }, verifies_seed: { type: 'boolean' },
  },
  required: ['claim', 'source_url', 'source_type', 'snippet', 'confidence'],
};
const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    pillarId: { type: 'string' },
    claims: { type: 'array', items: CLAIM_ITEM },
    counterEvidence: { type: 'array', items: { type: 'object', properties: { point: { type: 'string' }, source_url: { type: 'string' }, soWhat: { type: 'string' } }, required: ['point'] } },
    gapsRemaining: { type: 'array', items: { type: 'string' } },
    lensesUsed: { type: 'array', items: { type: 'string' } },
  },
  required: ['pillarId', 'claims'],
};
const LB_ITEM = {
  type: 'object',
  properties: {
    id: { type: 'string' }, claim: { type: 'string' }, stat: { type: 'string' }, source_url: { type: 'string' },
    source_type: { type: 'string' }, snippet: { type: 'string' }, whyLoadBearing: { type: 'string' },
    draftConfidence: { type: 'string' }, measured_or_modeled: { type: 'string' },
  },
  required: ['id', 'claim', 'source_url', 'draftConfidence'],
};
const SYNTH_SCHEMA = {
  type: 'object',
  properties: {
    pillarId: { type: 'string' }, pillarTitle: { type: 'string' }, sectionMarkdown: { type: 'string' },
    loadBearingClaims: { type: 'array', items: LB_ITEM },
    whatNotToOversell: { type: 'array', items: { type: 'string' } },
  },
  required: ['pillarId', 'sectionMarkdown', 'loadBearingClaims'],
};
const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    claimId: { type: 'string' }, verdict: { type: 'string' }, urlHealth: { type: 'string' },
    externalSignal: { type: 'string' }, counterEvidence: { type: 'string' }, correctedText: { type: 'string' },
    finalConfidence: { type: 'string' }, measured_or_modeled: { type: 'string' }, reasoning: { type: 'string' },
  },
  required: ['claimId', 'verdict', 'urlHealth', 'finalConfidence', 'reasoning'],
};
const OBJECTION_SCHEMA = {
  type: 'object',
  properties: { objections: { type: 'array', items: { type: 'object', properties: { objection: { type: 'string' }, honestRebuttal: { type: 'string' }, sourceOrBasis: { type: 'string' }, confidence: { type: 'string' }, concede: { type: 'string' } }, required: ['objection', 'honestRebuttal'] } } },
  required: ['objections'],
};
const MODEL_SCHEMA = {
  type: 'object',
  properties: {
    inputs: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, value: { type: 'string' }, source: { type: 'string' }, type: { type: 'string' } }, required: ['name', 'value'] } },
    scenarios: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, assumptions: { type: 'string' }, monthlyLeads: { type: 'string' }, closeRate: { type: 'string' }, jobsPerMonth: { type: 'string' }, avgTicket: { type: 'string' }, annualRevenue: { type: 'string' }, deltaVsGhl: { type: 'string' } }, required: ['name', 'annualRevenue'] } },
    tableMarkdown: { type: 'string' },
    caveats: { type: 'array', items: { type: 'string' } },
  },
  required: ['scenarios', 'tableMarkdown'],
};
const REELS_SCHEMA = {
  type: 'object',
  properties: { hooks: { type: 'array', items: { type: 'object', properties: { hook: { type: 'string' }, backingClaim: { type: 'string' }, source_url: { type: 'string' }, honestFraming: { type: 'string' }, confidence: { type: 'string' } }, required: ['hook', 'backingClaim', 'honestFraming'] } } },
  required: ['hooks'],
};
const GUARDRAILS_SCHEMA = {
  type: 'object',
  properties: {
    neverClaim: { type: 'array', items: { type: 'string' } },
    sayInstead: { type: 'array', items: { type: 'object', properties: { instead: { type: 'string' }, ofClaiming: { type: 'string' } }, required: ['instead'] } },
    ftcPosture: { type: 'string' },
  },
  required: ['neverClaim'],
};

// ---------- the 11 pillars ----------
const PILLARS = [
  {
    id: 'P1', title: 'Deep vs thin site — traffic + lead multiples',
    q: 'Does a ~130-page authority site out-traffic and out-lead a ~15-20-page template site by a defensible multiple for a contractor, and what GATES that multiple (quality, information gain, site-wide drag)?',
    seed: '- Long-tail ~70% of search traffic / ~91.8% of all queries (Backlinko/Ahrefs/neilpatel).\n- Ahrefs: 96.55% of pages get ZERO Google traffic (the quality-not-count caveat).\n- Contractor: 11 location pages -> +220% traffic, +160% form fills, calls doubled in 6mo (Sapphire).\n- Roofers: Kodescape +188% traffic/+145% leads; LuccaAM +384% traffic/+294% leads.',
    prior: '- KM pSEO research (primary-sourced): page COUNT is NOT the ranking trigger — purpose+info-gain is; thin/templated pages cause SITE-WIDE DRAG (Google HCU: unhelpful content makes the WHOLE site less likely to perform). Depth wins ONLY when each page is genuinely unique/helpful.',
    angles: 'topical-authority traffic studies; verify long-tail 70%/91.8%; "pages indexed vs organic traffic" correlation (Ahrefs/HubSpot study "more pages = more traffic/leads"); verify Sapphire/Kodescape/LuccaAM at their primary case-study URLs (note vendor incentive); pages-published vs leads.',
    targets: 'a defensible TRAFFIC multiple (is 3-5x+ supportable, under what conditions) AND a separate LEADS multiple; the quality gate (thin pages = zero/negative).',
    oversell: 'case-study multiples are single-vendor/self-reported — flag directional; pages alone do not create leads; thin pages can NET NEGATIVE; never imply linear pages->leads.',
  },
  {
    id: 'P2', title: 'Dedicated location/service pages + service x city matrix',
    q: 'How much lift do dedicated location/service pages give vs a single hub/list page, can a contractor rank ORGANICALLY in suburbs it is not physically in, and what is the requirement + downside?',
    seed: '- Sapphire: 11 location pages -> +220% traffic / +160% form fills / calls doubled, 6mo.',
    prior: '- KM pSEO + mappack research (primary): doorway abuse = pages targeting cities that funnel to one page (Google policy, verbatim); the MAP PACK is proximity-gated — one office cannot enter the 3-pack for far towns no matter how many pages (a 2nd GBP at a fake address = ToS); BUT ORGANIC blue-links are NOT proximity-gated, so a genuinely-unique location page CAN rank organically in a non-located suburb; the "Swap Test" (swap the city, the rest must read false) is the bar; templated geo-clones = scaled-content/doorway risk + site-wide drag.',
    angles: 'location-page vs single-hub lift studies; "can you rank for a city you are not located in" (organic vs map pack); service-area-page case studies; doorway-penalty enforcement examples; the real-job/unique-content requirement.',
    targets: 'lift vs one hub; the organic-vs-pack distinction for non-located suburbs; the unique-content/real-job requirement + the doorway downside.',
    oversell: 'do NOT claim the map pack in far suburbs (proximity wall); templated pages = penalty; lift numbers are case-study/directional.',
  },
  {
    id: 'P3', title: 'Storm / insurance vertical',
    q: 'For NC/Triangle roofing: how big are post-storm search surges, what is the storm/insurance ticket size + close rate, what share of roofer revenue is storm/insurance, and why does a hub/template site capture almost none of it?',
    seed: '- Post-storm search +300-800% in 48h; storm/hail = 40-70% of hail-market roofer revenue; $8.5-25k jobs; 45-65% close (PinPoint — SINGLE vendor, corroborate).',
    prior: '- KM mappack/sge research: roofing is emergency/storm-intent heavy (60-90% of roofing leads from the pack); storm chasers flood within 48h of a weather event.',
    angles: 'post-storm/hail search-volume spike data (Google Trends "roof repair" after NC hail/storm — verify 300-800% independently); roofing storm/insurance job ticket size; storm-job close rates; % of roofer revenue from storm/insurance/restoration; NC/Triangle hail+storm frequency (NOAA Storm Events); why a static hub captures storm long-tail poorly.',
    targets: 'surge % (corroborated beyond PinPoint), ticket-size range, close-rate range, revenue-share range, and the "hub captures ~none" mechanism.',
    oversell: 'PinPoint is one incentivized vendor — corroborate every number; close rates + ticket vary widely (repair vs full replacement vs insurance).',
  },
  {
    id: 'P4', title: 'Off-page scaling + content x links synergy',
    q: 'Does deep content amplify off-page ROI (more linkable assets, more rankable pages, internal-link authority distribution), what does ~$500/mo of off-page realistically buy + over what horizon, and how does "$5k own-it + $500/mo ops" compare to "$297/mo rent-a-brochure"?',
    seed: '- #1-ranked pages avg 3.8x the backlinks of #2-10 (Backlinko). - Long-form ~3.5x the traffic. - High-quality content ~4x top-10 odds. - Internal links distribute PageRank (~0.85 damping/hop). - Local SEO retainers $500-2k/mo.',
    prior: '- KM off-page research (primary + Whitespark): links move ORGANIC (24% weight) far more than the PACK (8%); reviews+GBP drive the pack; ~$500/mo realistically = tools (BrightLocal+Local Falcon ~$65-90) + a 1-2 earned-local-link/mo drip + quarterly citation re-check (a Tier-1 small-market figure); earn-don\'t-buy = the margin; citations are table-stakes (build once, stop). Budget dollar-figures are an ANALYST FRAMEWORK, not vendor quotes.',
    angles: 'content x links synergy (more pages = more ranking surface for links to point at?); backlinks-vs-ranking correlation (verify 3.8x Backlinko); internal-linking authority studies; what $500/mo local SEO actually includes; own-vs-rent asset/TCO framing.',
    targets: 'the synergy mechanism; what $500/mo buys + 6-12mo impact; the own-it-vs-rent TCO case.',
    oversell: 'off-page moves organic > pack; $500/mo is a MODEST drip not an aggressive campaign; budget numbers are analyst-framework/provisional; backlink correlation != causation.',
  },
  {
    id: 'P5', title: 'GoHighLevel platform SEO limitations',
    q: 'What are GoHighLevel\'s architectural SEO ceilings (mobile PageSpeed, no SSR/edge/client-side render, schema gaps, CMS scale ceiling, no programmatic generation, duplicate-URL traps) — cited to GHL\'s OWN boards/support where possible — and where is GHL genuinely fine?',
    seed: '- GHL mobile PageSpeed ~20-45 (practical cap ~60-70) vs custom 90-100. - No SSR/edge; client-side render. - Schema-markup request: 539 votes, open since 2022 (GHL ideas board). - CMS "rough past ~200 pages". - No programmatic page generation. - Duplicate-URL traps. Sources: PandaCodeGen, GHL ideas board, GHL\'s own technical-SEO post.',
    prior: '- (none in vault) — this is the hardest-to-dismiss pillar; cite GHL\'s OWN boards/support so it cannot be waved off as competitor FUD.',
    angles: 'GHL PageSpeed/Core Web Vitals complaints (GHL community, ideas.gohighlevel.com, support.gohighlevel.com); GHL schema-markup feature request (verify 539 votes / open-since-2022); GHL blog/CMS page-count limits; GHL SSR/SEO limitations; duplicate-URL / funnel-vs-site SEO; the BALANCE — what GHL is GOOD at (CRM, pipelines, missed-call-text-back, 5-page local sites).',
    targets: 'each ceiling cited to a primary/GHL-own source; the honest concession (GHL is fine for a small local site + strong at CRM/conversion).',
    oversell: 'GHL CAN rank a small local site — don\'t claim it is incapable of SEO entirely; PageSpeed varies by build — cite measurable evidence + flag variance; concede CRM/conversion strengths.',
  },
  {
    id: 'P6', title: 'Map-pack honesty',
    q: 'What is the precise, non-overstated framing of site vs map pack: GBP+reviews drive the pack; the site wins ORGANIC + long-tail + storm and SUPPORTS the pack — but does NOT "win the pack with more pages"?',
    seed: '- Local pack ~32% GBP weight; reviews ~20% (Whitespark 2026 LSRF). - Roofing ~60-90% of leads from the pack (UpRankd).',
    prior: '- KM mappack research (primary, adversarially verified): proximity may be the heaviest pack factor; GBP+reviews ~52%; a site CANNOT win the pack with pages; it wins the organic blue-links + long-tail + storm intent, and SUPPORTS the pack via relevance/behavioral/entity signals (the site is the GBP landing page). "Win the pack" is the #1 thing NOT to claim.',
    angles: 'Whitespark 2026 LSRF weights (verify GBP 32%/reviews 20%); does on-site content help the pack INDIRECTLY (relevance/behavioral/entity); roofing share-of-leads pack vs organic; the precise supports-vs-wins distinction.',
    targets: 'the honest framing line; what the site DOES for the pack (support, not win).',
    oversell: 'NEVER "win the pack with more pages"; the pack is GBP+reviews+proximity; the site\'s pack contribution is supporting/indirect.',
  },
  {
    id: 'P7', title: 'Conversion architecture',
    q: 'What is the conversion-architecture case: the 2026 map-pack call-button cut -> ranked-brochure call leak (20-40%); the 74%-of-contractor-calls-unanswered stat; and instant-estimate / dual-intent / speed-to-lead close-rate data?',
    seed: '- Map-pack call-button cut -> 20-40% fewer calls (practitioner). - 74% of contractor calls unanswered. - Instant-estimate / dual-intent / speed-to-lead close-rate lift.',
    prior: '- KM sge research: Google cut/reduced the organic map-pack call button in 2026 -> operators report 20-40% fewer calls; "ranks but the phone doesn\'t ring" is the dominant 2026 complaint; the conversion SYSTEM (dual-intent forking, call-first urgent heroes, missed-call-text-back) is the real edge, not the ranking.',
    angles: 'speed-to-lead / 5-minute-rule studies (Lead Response Management / InsideSales / HBR — 391% / 21x / odds collapse after 5 min); 74%-unanswered provenance (find the primary); map-pack call-button removal corroboration; instant-quote/estimator conversion-rate lift; dual-intent (call vs form) data.',
    targets: 'the call-leak %, the 74% stat (provenance graded), and at least one well-sourced speed-to-lead close-rate figure.',
    oversell: 'the 74% + 20-40% figures are practitioner-reported — grade provenance; speed-to-lead studies are older/B2B-leaning — note transferability.',
  },
  {
    id: 'P8', title: 'AI search / future-proofing (honest)',
    q: 'What is the HONEST AI-search/future-proofing case: AI is a rounding-error on lead VOLUME today (~0.3%), but agentic booking grounds on the site (schema/pricing/structured data) and citation is the future — so sell future-proofing + "the site the AI recommends", not an AI lead flood?',
    seed: '- AI ~0.3% of contractor leads today (McChesney 81,329-lead study + SearchLight Q1 2026, double-confirmed). - AI leads ~2x quality. - Perplexity ~13% vs ChatGPT ~0.59% citation rates. - Agentic booking (Google, summer 2026) grounds on website+GBP (schema, visible pricing, 4.5*+).',
    prior: '- KM sge research (primary, adversarially verified): transactional/local intent is INSULATED from AI Overviews (near-me fires the pack, ~15% AIO); AI visibility is 3-30x HARDER than ranking (SOCi); "mentions are the new link"; build as if insulation erodes on a ~12-month clock.',
    angles: 'verify the ~0.3% double-source; agentic-booking grounding requirements (schema/structured data/pricing); AI citation rates by engine; what makes a site "AI-readable".',
    targets: 'the ~0.3% volume number (double-confirmed), the agentic-grounding requirements, the future-proofing framing.',
    oversell: 'NEVER sell AI as a lead-VOLUME channel (~0.3%); the precise 0.29% is single-agency-origin — directional only; sell future-proofing + lead quality + agent-readability.',
  },
  {
    id: 'P9', title: 'Platform-tier / scaling headroom',
    q: 'What do scaled / multi-office / multi-crew roofers actually run for their web stack (custom builds, WordPress, enterprise CMS) vs the local-lead-gen tier (GHL/template sites) — and is "you can\'t build a multi-crew business on a $297 template" defensible as a scaled/content argument?',
    seed: '- (none) — research fresh.',
    prior: '- (none).',
    angles: 'what platforms top/enterprise home-service & roofing companies use (BuiltWith-style tech-stack patterns; agency commentary on enterprise contractor CMS); WordPress/custom vs SaaS-template share for scaled contractors; the ceiling that pushes a growing contractor off a template (page scale, integrations, custom UX, performance); the lead-gen-tier (GHL templates) positioning.',
    targets: 'what the scaled tier runs (as a PATTERN, not specific unverified brands); the defensible scaling-headroom argument.',
    oversell: 'do NOT name specific companies\' stacks unverified; frame as scaling-headroom / content-ceiling, not an absolute "templates can\'t grow"; many successful small roofers run on templates — the argument is about the SCALED/content tier.',
  },
  {
    id: 'P10', title: 'Revenue / ROI math',
    q: 'Build the contractor ROI math: storm/replacement ticket x close-rate band -> value-per-lead -> annual revenue, and the DELTA vs each GHL tier, across conservative/realistic/optimistic with cold-start->maturity ramp — flagged as MODELED.',
    seed: '- ~$20k replacement/storm ticket (verify range) x 15-25% close -> ~$3-5k value-per-lead -> annual revenue + delta vs GHL tiers; ramp cold-start->maturity.',
    prior: '- Inputs come from P1 (lead multiple), P3 (ticket+close), P7 (conversion). value-per-lead = ticket x close-rate.',
    angles: 'roofing avg job/ticket size (repair vs full replacement vs insurance); roofing lead->customer close rates by channel (organic vs aggregator); roofing cost-per-lead / value-per-lead benchmarks; SEO ramp time-to-maturity for contractors.',
    targets: 'sourced inputs for ticket, close, value-per-lead; a defensible 3-scenario model; the delta vs $297/mo.',
    oversell: 'EVERY output is MODELED — label it; close-rate is on the client; ranges not promises; never present modeled revenue as guaranteed.',
  },
  {
    id: 'P11', title: 'Honesty & defensibility guardrails',
    q: 'Assemble the consolidated honesty/defensibility guardrails: the what-NOT-to-claim list + the FTC/regulatory posture (false security claims + ranking guarantees are enforced independent of any breach).',
    seed: '- No "win the pack with pages"; no AI-lead-flood; no unsourced magnitudes; no guarantee/SOC2/"top-3 in 90 days" language; concede where GHL is fine.',
    prior: '- KM security-claims honesty (FTC enforces false security claims independent of breach — Wyndham); KM mappack research (Google points the FTC at ranking guarantees); position on ACTIONS not attestations.',
    angles: 'FTC enforcement of false security claims (Wyndham / FTC Act Section 5); FTC + Google on guaranteed-ranking claims; the honest reframes.',
    targets: 'the never-claim list + say-instead reframes + the FTC posture paragraph.',
    oversell: 'this pillar IS the anti-oversell — be ruthless; cite the FTC/Google sources.',
  },
];

// ---------- run ----------
log(`KM value-prop research: ${PILLARS.length} pillars, 2 gather rounds + synth + adversarial verify + cross-cutting deliverables.`);

const pipelineResults = await pipeline(
  PILLARS,
  (p, pillar) => agent(gatherR1Prompt(pillar), { label: `gatherR1:${pillar.id}`, phase: 'Gather R1', schema: GATHER_SCHEMA, effort: 'medium' }),
  async (r1, pillar) => {
    const r2 = await agent(gatherR2Prompt(pillar, r1), { label: `gatherR2:${pillar.id}`, phase: 'Gather R2', schema: GATHER_SCHEMA, effort: 'medium' });
    return {
      pillarId: pillar.id,
      claims: [...((r1 && r1.claims) || []), ...((r2 && r2.claims) || [])],
      counter: [...((r1 && r1.counterEvidence) || []), ...((r2 && r2.counterEvidence) || [])],
      gaps: [...((r1 && r1.gapsRemaining) || []), ...((r2 && r2.gapsRemaining) || [])],
    };
  },
  async (merged, pillar) => {
    const s = await agent(synthPrompt(pillar, merged), { label: `synth:${pillar.id}`, phase: 'Synthesize', schema: SYNTH_SCHEMA, effort: 'high' });
    return { pillar, merged, synth: s };
  },
);

const synthResults = pipelineResults.filter(Boolean);
log(`Synthesis done for ${synthResults.length}/${PILLARS.length} pillars. Flattening load-bearing claims for adversarial verification.`);

const lbAll = synthResults.flatMap(x =>
  (((x.synth && x.synth.loadBearingClaims) || [])).map(c => ({ ...c, pillarId: x.pillar.id, pillarTitle: x.pillar.title }))
);
log(`${lbAll.length} load-bearing claims nominated -> adversarial red/blue verification.`);

const verdictsRaw = await parallel(lbAll.map(c => () =>
  agent(verifyPrompt(c), { label: `verify:${c.pillarId}:${c.id}`, phase: 'Verify', schema: VERDICT_SCHEMA, effort: 'high' })
    .then(v => (v ? { ...v, _claim: c } : null))
));
const verdicts = verdictsRaw.filter(Boolean);

// build the verified-claim digest for cross-cutting deliverables
const digest = verdicts.map(v =>
  `- [${v._claim.pillarId}] ${v._claim.claim} | stat: ${v._claim.stat || 'n/a'} | verdict: ${v.verdict} | conf: ${v.finalConfidence} | ${v._claim.measured_or_modeled || ''} | ${v._claim.source_url}`
).join('\n');
const survived = verdicts.filter(v => v.verdict === 'survived' || v.verdict === 'corrected');
log(`Verification: ${survived.length}/${verdicts.length} load-bearing claims survived/corrected. Drafting cross-cutting deliverables.`);

const [objections, model, reels, guardrails] = await parallel([
  () => agent(objectionsPrompt(digest), { label: 'deliv:objections', phase: 'Deliverables', schema: OBJECTION_SCHEMA, effort: 'high' }),
  () => agent(modelPrompt(digest), { label: 'deliv:roi-model', phase: 'Deliverables', schema: MODEL_SCHEMA, effort: 'high' }),
  () => agent(reelsPrompt(digest), { label: 'deliv:reels', phase: 'Deliverables', schema: REELS_SCHEMA, effort: 'high' }),
  () => agent(guardrailsPrompt(digest), { label: 'deliv:guardrails', phase: 'Deliverables', schema: GUARDRAILS_SCHEMA, effort: 'high' }),
]);

return {
  pillars: synthResults.map(x => ({
    id: x.pillar.id,
    title: x.pillar.title,
    section: (x.synth && x.synth.sectionMarkdown) || '',
    loadBearing: (x.synth && x.synth.loadBearingClaims) || [],
    whatNotToOversell: (x.synth && x.synth.whatNotToOversell) || [],
    gaps: (x.merged && x.merged.gaps) || [],
    counter: (x.merged && x.merged.counter) || [],
    allClaims: (x.merged && x.merged.claims) || [],
  })),
  verdicts: verdicts.map(v => ({
    claimId: v._claim.id, pillarId: v._claim.pillarId, claim: v._claim.claim, stat: v._claim.stat,
    source_url: v._claim.source_url, source_type: v._claim.source_type, measured_or_modeled: v._claim.measured_or_modeled,
    verdict: v.verdict, urlHealth: v.urlHealth, externalSignal: v.externalSignal, counterEvidence: v.counterEvidence,
    correctedText: v.correctedText, finalConfidence: v.finalConfidence, reasoning: v.reasoning,
  })),
  objections, model, reels, guardrails,
  meta: { pillars: synthResults.length, loadBearing: lbAll.length, verified: verdicts.length, survived: survived.length },
};
