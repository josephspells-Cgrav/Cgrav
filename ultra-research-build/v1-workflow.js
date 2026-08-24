// ultra_research_engine.js — the deterministic engine for the Ultra Research skill.
// Invoked by the orchestrator AFTER the Frame stage, via:
//   Workflow({ scriptPath: ".../scripts/ultra_research_engine.js", args: {...} })
// Control flow (loop, stop logic, parallel red/blue) is deterministic here;
// the agents do the cognition. Citations + verdicts are structural fields.

export const meta = {
  name: 'ultra-research-engine',
  description: 'Deterministic engine for Ultra Research: looped source-diverse fan-out gather with saturation stop, first synthesis, claim-level red/blue adversarial verification (self-consistency + factored verify + URL-health, external-signal-gated correction), final cited re-synthesis with evidence ledger',
  phases: [
    { title: 'Gather' },
    { title: 'Synthesize' },
    { title: 'Adversarial' },
    { title: 'Finalize' },
  ],
}

// ---------- inputs (from the research contract) ----------
const Q        = (args && args.question)     || 'UNSPECIFIED QUESTION'
const SUBQS    = (args && args.subQuestions) || []
const CHECKLIST= (args && args.checklist)    || []        // subtopics → completeness critic
const TIER     = (args && args.tier)         || 'standard'
const MODE     = (args && args.mode)         || 'balanced' // depth | breadth | balanced

const TIERS = {
  lite:     { workers: 2, calls: '5-8',   maxRounds: 3,  scN: 3, dryK: 2, novelMin: 2 },
  standard: { workers: 4, calls: '8-12',  maxRounds: 6,  scN: 5, dryK: 3, novelMin: 2 },
  max:      { workers: 6, calls: '10-15', maxRounds: 10, scN: 7, dryK: 3, novelMin: 3 },
}
const C = TIERS[TIER] || TIERS.standard

// source-type lenses → structural diversity (echo-chamber mitigation)
const LENSES = [
  'primary sources / peer-reviewed / academic',
  'official docs / standards / first-party',
  'practitioner / field reports / forums',
  'recent news / press / current events',
  'COUNTER-EVIDENCE / skeptics / disconfirming',
  'data / benchmarks / primary statistics',
]

// ---------- schemas ----------
const CLAIM = {
  type: 'object', additionalProperties: false,
  properties: {
    claim: { type: 'string' },
    source_url: { type: 'string' },
    source_type: { type: 'string' },
    snippet: { type: 'string' },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  },
  required: ['claim', 'source_url', 'source_type', 'confidence'],
}
const GATHER = {
  type: 'object', additionalProperties: false,
  properties: {
    findings: { type: 'array', items: CLAIM },
    strategiesUsed: { type: 'array', items: { type: 'string' } },
    deadEnds: { type: 'array', items: { type: 'string' } },
  },
  required: ['findings', 'strategiesUsed'],
}
const NOVELTY = {
  type: 'object', additionalProperties: false,
  properties: { novel: { type: 'array', items: CLAIM }, duplicateCount: { type: 'integer' } },
  required: ['novel', 'duplicateCount'],
}
const CRITIC = {
  type: 'object', additionalProperties: false,
  properties: {
    covered: { type: 'array', items: { type: 'string' } },
    partial: { type: 'array', items: { type: 'string' } },
    missing: { type: 'array', items: { type: 'string' } },
  },
  required: ['covered', 'partial', 'missing'],
}
const DRAFT = {
  type: 'object', additionalProperties: false,
  properties: {
    answer: { type: 'string' },
    claims: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      properties: {
        id: { type: 'string' }, text: { type: 'string' },
        source_url: { type: 'string' }, loadBearing: { type: 'boolean' },
      },
      required: ['id', 'text', 'source_url', 'loadBearing'],
    } },
  },
  required: ['answer', 'claims'],
}
const VERDICT = {
  type: 'object', additionalProperties: false,
  properties: {
    claimId: { type: 'string' },
    verdict: { type: 'string', enum: ['survived', 'corrected', 'killed', 'flagged-uncertain'] },
    correctedText: { type: 'string' },
    why: { type: 'string' },
    externalSignal: { type: 'string' }, // which concrete signal justified a correction/kill
  },
  required: ['claimId', 'verdict', 'why'],
}
const JUDGE = {
  type: 'object', additionalProperties: false,
  properties: {
    factualAccuracy: { type: 'number' }, citationAccuracy: { type: 'number' },
    completeness: { type: 'number' }, sourceQuality: { type: 'number' },
    toolEfficiency: { type: 'number' }, pass: { type: 'boolean' }, notes: { type: 'string' },
  },
  required: ['pass', 'notes'],
}

// ---------- helpers ----------
const keyOf = (r) => (r.source_url || '') + '|' + (r.claim || '').slice(0, 80).toLowerCase()
const recs  = (m) => Array.from(m.values())

// ============================================================ GATHER LOOP
phase('Gather')
const seen = new Map()          // key -> claim record (the artifact store)
const strategies = new Set()
let openGaps = CHECKLIST.slice()
let dryRounds = 0
let round = 0
let lastNovel = -1
let stopReason = 'saturated'

while (round < C.maxRounds) {
  round++
  const focus = openGaps.length ? openGaps : SUBQS
  // one worker per lens (diversity), each aimed at an open gap; rotate lens set by round
  const lensSet = LENSES.slice(0, C.workers).map((l, i) => LENSES[(i + round) % LENSES.length])
  const briefs = lensSet.map((lens, i) => ({ lens, focus: focus[i % Math.max(1, focus.length)] || Q }))

  const batches = await parallel(briefs.map((b) => () => agent(
    `You are a research worker for the question: "${Q}".\n` +
    `YOUR LENS (only surface evidence of this type): ${b.lens}.\n` +
    `SUB-FOCUS this round: ${b.focus}.\n` +
    `Round ${round}. Two-pass search: (1) broad/short queries to map the landscape, ` +
    `(2) narrow queries targeting the gap. Use firecrawl-mcp:firecrawl_search then ` +
    `firecrawl-mcp:firecrawl_scrape (or WebSearch/WebFetch) — issue several searches in parallel. ` +
    `Prefer primary/authoritative sources; AVOID SEO content farms. Verify each URL actually ` +
    `loads before citing it. Return ONLY claims that bear on the sub-focus, each as a record ` +
    `{claim, source_url, source_type, snippet, confidence} — never prose, never a remembered ` +
    `URL you did not open. If a query type is exhausted, note it in deadEnds and switch strategy.`,
    { label: `gather:r${round}:${b.lens.split(' ')[0]}`, phase: 'Gather', schema: GATHER, model: 'sonnet' }
  )))

  const fresh = batches.filter(Boolean)                     // Byzantine tolerance: drop null workers
  fresh.forEach((b) => (b.strategiesUsed || []).forEach((s) => strategies.add(s)))
  const incoming = fresh.flatMap((b) => b.findings || [])
  const exactNew = incoming.filter((r) => !seen.has(keyOf(r)))  // O(1) exact dedup

  // semantic novelty (LLM judge — no embeddings available in-script; cosine-0.85 is the ideal)
  const nj = exactNew.length
    ? await agent(
        `Compare NEW claims to the SEEN claim set for "${Q}". A new claim is NOVEL only if it ` +
        `materially adds to an OPEN sub-question; a paraphrase/restatement of a seen claim is NOT ` +
        `novel even if worded differently. Open sub-questions: ${JSON.stringify(openGaps.length ? openGaps : SUBQS)}.\n` +
        `SEEN (claim texts): ${JSON.stringify(recs(seen).map((r) => r.claim).slice(0, 200))}\n` +
        `NEW: ${JSON.stringify(exactNew)}\n` +
        `Return the genuinely novel records and a count of duplicates.`,
        { label: `novelty:r${round}`, phase: 'Gather', schema: NOVELTY, model: 'sonnet' }
      )
    : { novel: [], duplicateCount: 0 }

  const novel = nj.novel || []
  novel.forEach((r) => seen.set(keyOf(r), r))

  // completeness critic (separate call, vs. the contract checklist)
  const critic = await agent(
    `Completeness critic for "${Q}". Required subtopics (checklist): ${JSON.stringify(CHECKLIST)}.\n` +
    `Findings so far (claims): ${JSON.stringify(recs(seen).map((r) => r.claim).slice(0, 300))}\n` +
    `Return which checklist subtopics are covered / partial / missing.`,
    { label: `critic:r${round}`, phase: 'Gather', schema: CRITIC }
  )
  openGaps = critic.missing || []

  // dry accounting + perfection-bias delta
  if (novel.length < C.novelMin) dryRounds++; else dryRounds = 0
  const marginal = lastNovel < 0 ? 1 : Math.abs(novel.length - lastNovel) / Math.max(1, lastNovel)
  lastNovel = novel.length
  log(`round ${round}: ${incoming.length} found · ${novel.length} novel · seen=${seen.size} · ` +
      `strategies=${strategies.size} · missing=${openGaps.length} · dry=${dryRounds}`)

  // ---- STOP LOGIC ----
  const saturated = dryRounds >= C.dryK
  const diversityOk = strategies.size >= 3
  const criticOk = openGaps.length === 0
  if (saturated && !diversityOk) { log('strategy exhaustion — rotating lens/strategy, not stopping'); continue }
  if (saturated && criticOk && diversityOk) { stopReason = 'saturated'; break }
  if (saturated && marginal < 0.02 && diversityOk) { stopReason = 'perfection-bias-cutoff'; break }
  // else: gaps remain or not yet dry → next round targets openGaps
}
if (round >= C.maxRounds && openGaps.length) { stopReason = 'cap-fired'; log('WARNING: hard cap fired — report will enumerate gaps') }

// ============================================================ FIRST SYNTHESIS
phase('Synthesize')
const draft = await agent(
  `First synthesis (PRE-ADVERSARIAL DRAFT) for "${Q}". Sub-questions: ${JSON.stringify(SUBQS)}.\n` +
  `Evidence records: ${JSON.stringify(recs(seen))}\n` +
  `Open gaps (state honestly): ${JSON.stringify(openGaps)}\n` +
  `Write a direct answer with inline citations keyed to source_url, then list the claims. ` +
  `Mark loadBearing=true for the claims the conclusion actually depends on.`,
  { label: 'first-synthesis', phase: 'Synthesize', schema: DRAFT }
)
const judge1 = await agent(
  `LLM-judge (5 dims 0..1: factualAccuracy, citationAccuracy, completeness, sourceQuality, toolEfficiency) ` +
  `for this DRAFT answer to "${Q}". Gate hard on sourceQuality. DRAFT: ${JSON.stringify(draft.answer)}`,
  { label: 'judge:draft', phase: 'Synthesize', schema: JUDGE }
)

// ============================================================ RED / BLUE (per load-bearing claim)
phase('Adversarial')
const loadBearing = (draft.claims || []).filter((c) => c.loadBearing)
log(`adversarial pass on ${loadBearing.length} load-bearing claims`)

async function verifyClaim(c) {
  // 1) self-consistency: N independent truth-judgments (vary by index for independence)
  const votes = await parallel(Array.from({ length: C.scN }, (_, i) => () => agent(
    `Independently assess whether this claim is TRUE, reasoning from scratch (perspective #${i + 1}). ` +
    `Do not assume it is correct. Claim: "${c.text}". Return {supported: true|false, why}.`,
    { label: `sc:${c.id}:${i}`, phase: 'Adversarial',
      schema: { type: 'object', additionalProperties: false,
        properties: { supported: { type: 'boolean' }, why: { type: 'string' } }, required: ['supported'] } }
  )))
  const ok = votes.filter(Boolean)
  const support = ok.filter((v) => v.supported).length
  const scRatio = ok.length ? support / ok.length : 0

  // 2) URL-health (external signal): does the cited URL actually resolve?
  const urlHealth = await agent(
    `Fetch this URL and report its status. URL: ${c.source_url}. Use firecrawl-mcp:firecrawl_scrape or ` +
    `WebFetch. Return {status: 'ok'|'stale'|'fabricated', evidence}. 'fabricated' = the page never ` +
    `existed; 'stale' = real but offline (note if a Wayback copy exists).`,
    { label: `url:${c.id}`, phase: 'Adversarial',
      schema: { type: 'object', additionalProperties: false,
        properties: { status: { type: 'string', enum: ['ok', 'stale', 'fabricated'] }, evidence: { type: 'string' } },
        required: ['status'] } }
  )

  // 3) CoVe factored verify — ISOLATED (the claim, NOT the draft, is the only context)
  const cove = await agent(
    `Generate 2-3 verification sub-questions whose answers would confirm or refute this claim, then ` +
    `answer EACH from independent search — do NOT assume the claim is true. Claim: "${c.text}". ` +
    `Return {consistent: true|false, detail}.`,
    { label: `cove:${c.id}`, phase: 'Adversarial',
      schema: { type: 'object', additionalProperties: false,
        properties: { consistent: { type: 'boolean' }, detail: { type: 'string' } }, required: ['consistent'] } }
  )

  // 4) attacker / defender (independent, no peeking)
  const [red, blue] = await parallel([
    () => agent(`RED TEAM. First steelman the OPPOSITE of this claim, then find the strongest ` +
      `contradictory evidence (cite URLs). Claim: "${c.text}". Return {strongestCounter, counterUrl}.`,
      { label: `red:${c.id}`, phase: 'Adversarial',
        schema: { type: 'object', additionalProperties: false,
          properties: { strongestCounter: { type: 'string' }, counterUrl: { type: 'string' } }, required: ['strongestCounter'] } }),
    () => agent(`BLUE TEAM. Defend this claim with the strongest sourced evidence (cite URLs). ` +
      `Claim: "${c.text}". Return {strongestSupport, supportUrl}.`,
      { label: `blue:${c.id}`, phase: 'Adversarial',
        schema: { type: 'object', additionalProperties: false,
          properties: { strongestSupport: { type: 'string' }, supportUrl: { type: 'string' } }, required: ['strongestSupport'] } }),
  ])

  // 5) judge — verdict. CORRECTION/KILL allowed ONLY on a concrete external signal.
  const judge = await agent(
    `Neutral judge. Decide the verdict for claim "${c.text}".\n` +
    `EXTERNAL SIGNALS: self-consistency support=${scRatio.toFixed(2)} (supermajority≈>0.6); ` +
    `url-health=${urlHealth.status}; CoVe-consistent=${cove.consistent}; ` +
    `red=${JSON.stringify(red)}; blue=${JSON.stringify(blue)}.\n` +
    `RULES: 'killed' requires url=fabricated OR scRatio<0.5 OR CoVe inconsistent with a cited counter-source. ` +
    `'corrected' requires a concrete external signal AND a sourced replacement (set correctedText, externalSignal). ` +
    `If no external signal contradicts it, verdict is 'survived' (or 'flagged-uncertain' if scRatio is a bare ` +
    `majority) — do NOT "fix" a claim on doubt alone. Return the verdict record.`,
    { label: `judge:${c.id}`, phase: 'Adversarial', schema: VERDICT }
  )
  return { ...judge, claimId: c.id, signals: { scRatio, urlHealth: urlHealth.status, cove: cove.consistent } }
}

const verdicts = (await parallel(loadBearing.map((c) => () => verifyClaim(c)))).filter(Boolean)

// ============================================================ FINAL RE-SYNTHESIS
phase('Finalize')
const method = {
  tier: TIER, mode: MODE, rounds: round, stopReason,
  seenClaims: seen.size, strategies: Array.from(strategies), openGaps,
  loadBearing: loadBearing.length, draftJudge: judge1.pass,
}
const report = await agent(
  `Final re-synthesis for "${Q}". Rebuild from claims-with-verdicts: drop 'killed', surface ` +
  `'flagged-uncertain' as open, apply 'corrected' text. Produce EXACTLY this structure: ` +
  `# question / ## Answer / ## Key findings / ## Evidence ledger (table incl. adversarial verdict) / ` +
  `## Calibrated confidence (grounded in evidence count + source tier + SC vote + verdict) / ` +
  `## Open questions & gaps (enumerate them — gaps=${JSON.stringify(openGaps)}, stopReason=${stopReason}) / ` +
  `## Method note (${JSON.stringify(method)}).\n` +
  `DRAFT: ${JSON.stringify(draft)}\nVERDICTS: ${JSON.stringify(verdicts)}\nEVIDENCE: ${JSON.stringify(recs(seen))}`,
  { label: 'final-synthesis', phase: 'Finalize' }
)
const judge2 = await agent(
  `Final LLM-judge (5 dims, gate hard on sourceQuality + citationAccuracy) for the report to "${Q}". ` +
  `REPORT: ${JSON.stringify(report).slice(0, 12000)}`,
  { label: 'judge:final', phase: 'Finalize', schema: JUDGE }
)

return { report, method, judge: judge2, draftJudge: judge1, verdicts }
