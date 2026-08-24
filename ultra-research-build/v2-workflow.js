// ultra_research_engine.js  (v2) — deterministic engine for the Ultra Research skill.
// Invoked by the orchestrator AFTER the Frame stage:
//   Workflow({ scriptPath: ".../scripts/ultra_research_engine.js", args: {...} })
// DETERMINISM LIVES HERE: loop, stop-decision, verdict floor, and caps are CODE,
// not prose handed to a model. Agents do cognition; the engine decides.
//
// RESUME / no-lost-runs: this script has no filesystem access, so it does NOT
// checkpoint to disk. Instead it relies on the harness's native resume — if a run
// dies, relaunch Workflow({scriptPath, resumeFromRunId}) and every completed
// agent() returns from cache. (That replaces the v1-audit "write state.json" idea,
// which a Workflow script cannot do.)
//
// CONCURRENCY: the harness caps simultaneous agent() calls (~min(16, cores-2)) and
// queues the rest, so we never spawn 180 at once. We cap TOTAL work (cost) via the
// tier (K verified claims), URL-health short-circuits, and lighter lite-tier depth.

export const meta = {
  name: 'ultra-research-engine',
  description: 'Deterministic engine for Ultra Research: looped source-diverse fan-out gather with code-decided saturation stop, independent load-bearing selection, first synthesis, claim-level red/blue verification (URL-health short-circuit, evidence-aware self-consistency, factored CoVe, snippet-faithfulness, code-computed verdict floor, external-signal-gated correction, bounded re-source of killed claims), final cited re-synthesis with evidence ledger + a ready-to-file vault summary',
  phases: [
    { title: 'Gather' },
    { title: 'Synthesize' },
    { title: 'Adversarial' },
    { title: 'Finalize' },
  ],
}

// ============================================================ INPUTS (robust)
// The Workflow tool passes args as a JSON value; defend against a JSON string or a
// bare-question string too (some harness versions differ).
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = { question: args } } }
A = A || {}

const Q         = A.question || 'UNSPECIFIED QUESTION'
const SUBQS     = Array.isArray(A.subQuestions) ? A.subQuestions : []
let   CHECKLIST = Array.isArray(A.checklist) ? A.checklist : []
const TIER      = A.tier || 'standard'
const MODE      = A.mode || 'balanced'           // depth | breadth | balanced
const CONFIRMED = A.userConfirmedTier === true

// Contract validation. An empty checklist silently disables the completeness gate
// (one of the 3 required stop conjuncts), so derive it from sub-questions.
let checklistAutoDerived = false
if (!CHECKLIST.length && SUBQS.length) { CHECKLIST = SUBQS.slice(); checklistAutoDerived = true }
if (Q === 'UNSPECIFIED QUESTION' || (!CHECKLIST.length && !SUBQS.length)) {
  return { refused: true, reason: 'Engine needs a question + subQuestions/checklist (the research contract). Run the Frame stage first.' }
}

// COST GATE enforced in CODE (not just SKILL prose): standard/max must be user-confirmed.
if ((TIER === 'standard' || TIER === 'max') && !CONFIRMED) {
  return { refused: true, reason: `Tier "${TIER}" requires userConfirmedTier:true (cost gate ~standard 15-25x / max 40-80x chat tokens). Re-invoke after the user confirms, or run tier:"lite".` }
}

// Tier config. `depth` controls how heavy the per-claim adversarial pass is, so cost
// tracks stakes (lite is genuinely light, not the full tax on a small question).
const TIERS = {
  lite:     { workers: 2, maxRounds: 3,  scN: 3, dryK: 2, novelMin: 2, kClaims: 5,  depth: { cove: false, debate: false } },
  standard: { workers: 4, maxRounds: 6,  scN: 5, dryK: 3, novelMin: 2, kClaims: 8,  depth: { cove: true,  debate: true } },
  max:      { workers: 6, maxRounds: 10, scN: 7, dryK: 3, novelMin: 3, kClaims: 12, depth: { cove: true,  debate: true } },
}
const C = TIERS[TIER] || TIERS.standard
const hasBudget = (typeof budget !== 'undefined') && budget && typeof budget.remaining === 'function'

// source-type lenses → structural diversity (echo-chamber mitigation). Rotation through
// these is the DETERMINISTIC substrate for the diversity stop-gate.
const LENSES = [
  'primary / peer-reviewed / academic',
  'official docs / standards / first-party',
  'practitioner / field reports / forums',
  'recent news / press / current events',
  'COUNTER-EVIDENCE / skeptics / disconfirming',
  'data / benchmarks / primary statistics',
]

// ============================================================ schemas
const CLAIM = {
  type: 'object', additionalProperties: false,
  properties: {
    claim: { type: 'string' }, source_url: { type: 'string' }, source_type: { type: 'string' },
    snippet: { type: 'string' }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  },
  required: ['claim', 'source_url', 'source_type', 'confidence'],
}
const GATHER = {
  type: 'object', additionalProperties: false,
  properties: { findings: { type: 'array', items: CLAIM }, deadEnds: { type: 'array', items: { type: 'string' } } },
  required: ['findings'],
}
// fused novelty + completeness critic (one call/round — halves serial calls + quadratic reads)
const NOVCRIT = {
  type: 'object', additionalProperties: false,
  properties: {
    novelCount: { type: 'integer' },
    novelIndices: { type: 'array', items: { type: 'integer' } }, // indices into the NEW batch that are genuinely novel
    covered: { type: 'array', items: { type: 'string' } },
    partial: { type: 'array', items: { type: 'string' } },
    missing: { type: 'array', items: { type: 'string' } },
  },
  required: ['novelCount', 'novelIndices', 'covered', 'missing'],
}
const DRAFT = {
  type: 'object', additionalProperties: false,
  properties: {
    answer: { type: 'string' },
    claims: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      properties: { id: { type: 'string' }, text: { type: 'string' }, source_url: { type: 'string' }, loadBearing: { type: 'boolean' } },
      required: ['id', 'text', 'source_url', 'loadBearing'],
    } },
  },
  required: ['answer', 'claims'],
}
const VERDICT = {
  type: 'object', additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['survived', 'corrected', 'killed', 'flagged-uncertain'] },
    correctedText: { type: 'string' }, externalSignal: { type: 'string' }, why: { type: 'string' },
  },
  required: ['verdict', 'why'],
}
const JUDGE = {
  type: 'object', additionalProperties: false,
  properties: { sourceQuality: { type: 'number' }, citationAccuracy: { type: 'number' }, completeness: { type: 'number' }, pass: { type: 'boolean' }, notes: { type: 'string' } },
  required: ['pass', 'notes'],
}

// ============================================================ helpers
const keyOf = (r) => (r.source_url || '') + '|' + (r.claim || '').slice(0, 80).toLowerCase()
const short = (r) => ({ c: (r.claim || '').slice(0, 80), u: r.source_url, t: r.source_type })
const RANK = { survived: 0, 'flagged-uncertain': 1, corrected: 2, killed: 3 }

// one retry with the validation error injected, then null (Byzantine-tolerant everywhere)
async function safeAgent(prompt, opts) {
  try { return await agent(prompt, opts) }
  catch (e) {
    try { return await agent(prompt + `\n\n[Retry — prior output failed: ${(e && e.message) || 'schema/validation error'}. Return ONLY valid output matching the schema.]`, opts) }
    catch (e2) { return null }
  }
}
function verdictFloor(scRatio, urlStatus, coveConsistent, hasCitedCounter, snippetFaithful) {
  if (urlStatus === 'fabricated') return 'killed'
  if (scRatio < 0.5) return 'killed'
  if (coveConsistent === false && hasCitedCounter) return 'killed'
  let v = scRatio < 0.6 ? 'flagged-uncertain' : 'survived'
  if (snippetFaithful === false && RANK[v] < RANK['flagged-uncertain']) v = 'flagged-uncertain'
  return v
}

// ============================================================ GATHER LOOP
phase('Gather')
const corpus = new Map()        // ALL exact-new evidence (the artifact store) — survives to synthesis
const lensesExercised = new Set()
let openGaps = CHECKLIST.slice()
let coveredFrac = 0
let dryRounds = 0
let round = 0
let stopReason = 'saturated'
let droppedDup = 0

while (round < C.maxRounds) {
  round++
  if (hasBudget && budget.total && budget.remaining() < 40000) { stopReason = 'budget-floor'; log('stopping: budget floor'); break }
  const focus = openGaps.length ? openGaps : SUBQS
  // rotate lenses deterministically; record which lenses we've now exercised
  const lensSet = Array.from({ length: C.workers }, (_, i) => LENSES[(i + (round - 1) * C.workers) % LENSES.length])
  lensSet.forEach((l) => lensesExercised.add(l))
  const briefs = lensSet.map((lens, i) => ({ lens, focus: focus[i % Math.max(1, focus.length)] || Q }))

  const batches = (await parallel(briefs.map((b) => () => safeAgent(
    `Research worker for: "${Q}".\nLENS (only surface this evidence type): ${b.lens}.\nSUB-FOCUS this round: ${b.focus}.\n` +
    `Two-pass search: (1) broad/short queries to map, (2) narrow queries on the gap. Use mcp__firecrawl-mcp__firecrawl_search ` +
    `then mcp__firecrawl-mcp__firecrawl_scrape (or WebSearch/WebFetch); issue several searches in parallel. Prefer primary/authoritative; ` +
    `AVOID SEO farms. OPEN this URL before citing it. Return ONLY records bearing on the sub-focus: {claim, source_url, source_type, snippet, confidence} — never prose, never a remembered URL.`,
    { label: `gather:r${round}:${b.lens.split(' ')[0]}`, phase: 'Gather', schema: GATHER, model: 'sonnet' }
  )))).filter(Boolean)

  const incoming = batches.flatMap((b) => b.findings || [])
  const exactNew = incoming.filter((r) => { const k = keyOf(r); if (corpus.has(k)) return false; corpus.set(k, r); return true })
  droppedDup += incoming.length - exactNew.length

  // fused novelty + completeness critic (windowed context: truncated claim text, bounded count)
  const nc = exactNew.length
    ? (await safeAgent(
        `For "${Q}". Open sub-questions: ${JSON.stringify(openGaps.length ? openGaps : SUBQS)}.\n` +
        `Required subtopics (checklist): ${JSON.stringify(CHECKLIST)}.\n` +
        `ALREADY-SEEN claims (truncated): ${JSON.stringify(corpus.size > 150 ? Array.from(corpus.values()).slice(-150).map((r) => r.claim.slice(0, 80)) : Array.from(corpus.values()).map((r) => r.claim.slice(0, 80)))}\n` +
        `NEW batch (index:claim): ${JSON.stringify(exactNew.map((r, i) => i + ':' + r.claim.slice(0, 120)))}\n` +
        `Return (a) novelIndices = indices of NEW items that MATERIALLY add to an open sub-question (a paraphrase of a seen claim is NOT novel) + novelCount; (b) which checklist subtopics are covered / partial / missing.`,
        { label: `novcrit:r${round}`, phase: 'Gather', schema: NOVCRIT, model: 'sonnet' }
      ))
    : null
  // null-guard: preserve prior gaps on failure (do NOT default missing to [] — that falsely satisfies the stop gate)
  const novelCount = nc ? nc.novelCount : 0
  openGaps = nc ? (nc.missing || openGaps) : openGaps
  const newCovered = nc && CHECKLIST.length ? (nc.covered || []).length / CHECKLIST.length : coveredFrac
  const coverageDelta = newCovered - coveredFrac
  coveredFrac = newCovered

  if (novelCount < C.novelMin) dryRounds++; else dryRounds = 0
  log(`round ${round}: +${incoming.length} found · ${novelCount} novel · corpus=${corpus.size} · lenses=${lensesExercised.size} · missing=${openGaps.length} · cover=${(coveredFrac * 100) | 0}% · dry=${dryRounds}`)

  // ---- STOP DECISION (all in code) ----
  const saturated = dryRounds >= C.dryK
  const diversityOk = lensesExercised.size >= 3            // DETERMINISTIC (rotation), not worker self-report
  const criticOk = openGaps.length === 0
  if (saturated && !diversityOk) { log('strategy/lens not yet exhausted — rotating, not stopping'); continue }
  if (saturated && criticOk && diversityOk) { stopReason = 'saturated'; break }
  // perfection-bias: real coverage-delta (not a novel-count integer artifact) AND completeness gate
  if (saturated && diversityOk && criticOk && coverageDelta < 0.02) { stopReason = 'diminishing-returns'; break }
}
if (round >= C.maxRounds && openGaps.length) { stopReason = 'cap-fired'; log('WARNING: hard cap fired — report MUST enumerate gaps') }

// ============================================================ FIRST SYNTHESIS + actionable draft gate
phase('Synthesize')
const corpusArr = Array.from(corpus.values())
let draft = await safeAgent(
  `First synthesis (PRE-ADVERSARIAL DRAFT) for "${Q}". Sub-questions: ${JSON.stringify(SUBQS)}. Open gaps: ${JSON.stringify(openGaps)}.\n` +
  `Evidence: ${JSON.stringify(corpusArr)}\nWrite a direct answer with inline [n] citations keyed to source_url, then list claims; mark loadBearing=true for claims the conclusion truly depends on.`,
  { label: 'first-synthesis', phase: 'Synthesize', schema: DRAFT, model: 'opus' }
)
draft = draft || { answer: '(synthesis failed)', claims: [] }
const judge1 = (await safeAgent(
  `LLM-judge (sourceQuality, citationAccuracy, completeness 0..1; pass=false if sourceQuality<0.6) for this DRAFT to "${Q}". DRAFT: ${JSON.stringify(draft.answer).slice(0, 8000)}`,
  { label: 'judge:draft', phase: 'Synthesize', schema: JUDGE, model: 'opus' }
)) || { pass: true, notes: 'judge unavailable' }
// ACTIONABLE: weak draft + room to improve → one more targeted gather round, then re-synth
if (judge1.pass === false && round < C.maxRounds && openGaps.length) {
  round++
  const extra = (await parallel(openGaps.slice(0, C.workers).map((g, i) => () => safeAgent(
    `Targeted gap-fill for "${Q}". Find primary/authoritative evidence on: ${g}. Lens: ${LENSES[i % LENSES.length]}. Return {claim,source_url,source_type,snippet,confidence} records (open each URL).`,
    { label: `gather:gapfill:${i}`, phase: 'Gather', schema: GATHER, model: 'sonnet' }
  )))).filter(Boolean)
  extra.flatMap((b) => b.findings || []).forEach((r) => { if (!corpus.has(keyOf(r))) corpus.set(keyOf(r), r) })
  draft = (await safeAgent(
    `Re-synthesize (draft) for "${Q}" with the added evidence. Evidence: ${JSON.stringify(Array.from(corpus.values()))}. Mark loadBearing per claim.`,
    { label: 'first-synthesis:redo', phase: 'Synthesize', schema: DRAFT, model: 'opus' }
  )) || draft
}

// INDEPENDENT load-bearing selection (fox-guarding-henhouse fix): a separate agent picks,
// blind to the synthesizer's flags; take the UNION.
const indep = (await safeAgent(
  `Read this answer and its claims. Which claim IDs, IF FALSE, would change the conclusion? Do not assume the author's marking. ANSWER: ${JSON.stringify(draft.answer).slice(0, 6000)}\nCLAIMS: ${JSON.stringify((draft.claims || []).map((c) => ({ id: c.id, text: c.text })))}`,
  { label: 'loadbearing:independent', phase: 'Synthesize', model: 'opus',
    schema: { type: 'object', additionalProperties: false, properties: { ids: { type: 'array', items: { type: 'string' } } }, required: ['ids'] } }
)) || { ids: [] }
const lbSet = new Set([...(draft.claims || []).filter((c) => c.loadBearing).map((c) => c.id), ...(indep.ids || [])])
let loadBearing = (draft.claims || []).filter((c) => lbSet.has(c.id)).slice(0, C.kClaims) // cap total adversarial work
const deferred = (draft.claims || []).filter((c) => lbSet.has(c.id)).slice(C.kClaims)     // verified url-only / marked unverified

// ============================================================ RED / BLUE per claim
phase('Adversarial')
log(`adversarial pass: ${loadBearing.length} verified (cap ${C.kClaims}), ${deferred.length} deferred-unverified`)

async function verifyClaim(c) {
  // (1) URL-health FIRST — cheap external signal + short-circuit (a fabricated source can't be verified)
  const url = (await safeAgent(
    `Fetch and report the status of this URL: ${c.source_url}. Use mcp__firecrawl-mcp__firecrawl_scrape or WebFetch. Return {status:'ok'|'stale'|'fabricated', evidence}. fabricated = never existed; stale = real but offline.`,
    { label: `url:${c.id}`, phase: 'Adversarial', model: 'sonnet',
      schema: { type: 'object', additionalProperties: false, properties: { status: { type: 'string', enum: ['ok', 'stale', 'fabricated'] }, evidence: { type: 'string' } }, required: ['status'] } }
  )) || { status: 'stale' } // unknown → stale, not fabricated (don't over-kill on a failed check)
  if (url.status === 'fabricated') {
    return { claimId: c.id, verdict: 'killed', externalSignal: 'fabricated-url', why: 'cited source does not exist', signals: { url: 'fabricated' } }
  }

  // (2) evidence-aware self-consistency with DISTINCT reasoning stances (decorrelate the votes)
  const STANCES = ['reason from base rates', 'use ONLY the cited source', 'actively SEARCH for disconfirming evidence', 'reason from first principles', 'weight the most RECENT evidence', 'steelman the claim then stress-test it']
  const votes = (await parallel(Array.from({ length: C.scN }, (_, i) => () => safeAgent(
    `Independently assess if this claim is TRUE — ${STANCES[i % STANCES.length]} (voter ${i + 1}). Do NOT assume it is correct; judge on EVIDENCE, search if needed. Claim: "${c.text}" (cited source: ${c.source_url}). Return {supported:boolean, why}.`,
    { label: `sc:${c.id}:${i}`, phase: 'Adversarial', model: 'sonnet',
      schema: { type: 'object', additionalProperties: false, properties: { supported: { type: 'boolean' }, why: { type: 'string' } }, required: ['supported'] } }
  ))).filter(Boolean)
  const scRatio = votes.length ? votes.filter((v) => v.supported).length / votes.length : 0.5

  // (3) snippet-faithfulness (intermediate-chain audit: does the cited snippet actually support the claim?)
  const faith = (await safeAgent(
    `Does this source snippet ACTUALLY support the claim, or is it an overreach / misread? Claim: "${c.text}". Snippet: ${JSON.stringify(c.source_url)}. Return {faithful:boolean, why}.`,
    { label: `faith:${c.id}`, phase: 'Adversarial', model: 'sonnet',
      schema: { type: 'object', additionalProperties: false, properties: { faithful: { type: 'boolean' }, why: { type: 'string' } }, required: ['faithful'] } }
  )) || { faithful: true }

  // (4) CoVe — FACTORED: generate sub-questions, then answer them in ISOLATION (claim only, never the draft)
  let cove = { consistent: true }
  if (C.depth.cove) {
    const cq = (await safeAgent(
      `Generate 2-3 verification sub-questions that would CONFIRM OR REFUTE this claim: "${c.text}". Return {questions:[...]}.`,
      { label: `cove-gen:${c.id}`, phase: 'Adversarial', model: 'sonnet',
        schema: { type: 'object', additionalProperties: false, properties: { questions: { type: 'array', items: { type: 'string' } } }, required: ['questions'] } }
    )) || { questions: [] }
    cove = (await safeAgent(
      `Answer each via independent search; do NOT assume any claim. Questions: ${JSON.stringify(cq.questions)}. Then: are the answers CONSISTENT with "${c.text}"? Return {consistent:boolean, detail}.`,
      { label: `cove-ans:${c.id}`, phase: 'Adversarial', model: 'sonnet',
        schema: { type: 'object', additionalProperties: false, properties: { consistent: { type: 'boolean' }, detail: { type: 'string' } }, required: ['consistent'] } }
    )) || { consistent: true }
  }

  // (5) attacker / defender (independent, no peeking) — skipped at lite depth
  let red = {}, blue = {}
  if (C.depth.debate) {
    const rb = await parallel([
      () => safeAgent(`RED TEAM: steelman the OPPOSITE of "${c.text}", then find the strongest contradictory evidence with a real URL. Return {strongestCounter, counterUrl}.`,
        { label: `red:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: { type: 'object', additionalProperties: false, properties: { strongestCounter: { type: 'string' }, counterUrl: { type: 'string' } }, required: ['strongestCounter'] } }),
      () => safeAgent(`BLUE TEAM: defend "${c.text}" with the strongest sourced evidence (real URL). Return {strongestSupport, supportUrl}.`,
        { label: `blue:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: { type: 'object', additionalProperties: false, properties: { strongestSupport: { type: 'string' }, supportUrl: { type: 'string' } }, required: ['strongestSupport'] } }),
    ])
    red = rb[0] || {}; blue = rb[1] || {}
  }

  // (6) DETERMINISTIC verdict floor (code) — judge may only ESCALATE, never soften
  const floor = verdictFloor(scRatio, url.status, cove.consistent, !!red.counterUrl, faith.faithful)
  const j = (await safeAgent(
    `Neutral judge for "${c.text}". Signals: SC-support=${scRatio.toFixed(2)} (supermajority>0.6); url=${url.status}; CoVe-consistent=${cove.consistent}; snippet-faithful=${faith.faithful}; red=${JSON.stringify(red)}; blue=${JSON.stringify(blue)}.\n` +
    `The deterministic FLOOR verdict is "${floor}". You may keep it or ESCALATE severity (survived<flagged-uncertain<corrected<killed) on a cited external signal; you may NOT soften below the floor. "corrected" requires BOTH a correctedText AND naming the externalSignal. With no external signal contradicting it, keep "${floor}". Return the verdict.`,
    { label: `judge:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: VERDICT }
  )) || { verdict: floor, why: 'judge unavailable; deterministic floor applied' }
  let verdict = (RANK[j.verdict] >= RANK[floor]) ? j.verdict : floor               // can't soften below floor
  if (verdict === 'corrected' && !(j.externalSignal && j.correctedText)) verdict = floor // corrected needs a signal
  return { claimId: c.id, verdict, correctedText: j.correctedText, externalSignal: j.externalSignal, why: j.why, signals: { scRatio: +scRatio.toFixed(2), url: url.status, cove: cove.consistent, faithful: faith.faithful } }
}

let verdicts = (await parallel(loadBearing.map((c) => () => verifyClaim(c)))).filter(Boolean)

// (7) BOUNDED re-source of killed load-bearing claims (1 attempt) — match the SKILL's contract
const killed = verdicts.filter((v) => v.verdict === 'killed').map((v) => loadBearing.find((c) => c.id === v.claimId)).filter(Boolean)
if (killed.length) {
  log(`re-sourcing ${killed.length} killed load-bearing claim(s) (1 attempt each)`)
  const repl = await parallel(killed.map((c) => () => safeAgent(
    `The claim "${c.text}" failed verification (bad/absent source). Find the BEST primary/authoritative replacement source for this specific point, or report none exists. Return {claim,source_url,source_type,snippet,confidence}.`,
    { label: `resource:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: CLAIM }
  )))
  for (let i = 0; i < killed.length; i++) {
    const r = repl[i]; if (!r || !r.source_url) continue
    const rc = { id: killed[i].id, text: r.claim, source_url: r.source_url }
    const rv = await verifyClaim(rc)
    if (rv && rv.verdict !== 'killed') { // replacement survived → update the verdict + corpus
      corpus.set(keyOf(r), r)
      verdicts = verdicts.map((v) => v.claimId === killed[i].id ? { ...rv, why: 'original killed; re-sourced replacement ' + rv.verdict, externalSignal: 'resourced' } : v)
    }
  }
}

// ============================================================ FINAL RE-SYNTHESIS + real exit gate + vault summary
phase('Finalize')
const method = {
  tier: TIER, mode: MODE, rounds: round, stopReason, corpusClaims: corpus.size, droppedDuplicates: droppedDup,
  lensesExercised: Array.from(lensesExercised), openGaps, checklistAutoDerived,
  verified: loadBearing.length, deferredUnverified: deferred.map((c) => c.id), draftGatePassed: judge1.pass,
}
let report = (await safeAgent(
  `Final re-synthesis for "${Q}", written for a PRACTITIONER DECISION-MAKER: lead with the bottom line in plain, short sentences; action-relevant bullets; the ledger is for auditability, don't optimize the prose for it. Rebuild from claims-with-verdicts: DROP 'killed' (unless re-sourced), surface 'flagged-uncertain' as open, apply 'corrected' text. Deferred-unverified claims (${JSON.stringify(deferred.map((c) => c.id))}) must be labeled "asserted, unverified" in the ledger.\n` +
  `Produce EXACTLY: # question / ## Answer / ## Key findings / ## Evidence ledger (table incl. Adversarial verdict + Confidence) / ## Calibrated confidence (grounded in evidence count + source tier + SC vote + verdict — never a vibe) / ## Open questions & gaps (ENUMERATE — gaps=${JSON.stringify(openGaps)}, stopReason=${stopReason}) / ## Method note (${JSON.stringify(method)}).\n` +
  `DRAFT:${JSON.stringify(draft)}\nVERDICTS:${JSON.stringify(verdicts)}\nEVIDENCE:${JSON.stringify(corpusArr)}`,
  { label: 'final-synthesis', phase: 'Finalize', model: 'opus' }
)) || '(final synthesis failed — see method note)'
const judge2 = (await safeAgent(
  `Final exit-gate judge (sourceQuality, citationAccuracy, completeness 0..1; pass=false if sourceQuality<0.6 OR citationAccuracy<0.7) for the report to "${Q}". REPORT: ${typeof report === 'string' ? report.slice(0, 12000) : JSON.stringify(report).slice(0, 12000)}`,
  { label: 'judge:final', phase: 'Finalize', model: 'opus', schema: JUDGE }
)) || { pass: true, notes: 'judge unavailable' }
const passed = judge2.pass !== false && stopReason !== 'cap-fired'
if (!passed && typeof report === 'string') {
  report = `> [!warning] PROVISIONAL — failed exit gate (${judge2.notes || stopReason}). Treat findings as unverified.\n\n` + report
}
// ready-to-file vault note (the orchestrator writes it — Mode D directive, see SKILL.md)
const vaultSummary = `## ${Q}\n- Confidence: ${passed ? 'gated-pass' : 'PROVISIONAL'} · stop: ${stopReason} · tier: ${TIER}\n- Verified ${loadBearing.length} load-bearing claims; ${corpus.size} sources; gaps: ${openGaps.length}\n- Open: ${openGaps.join('; ') || 'none'}\n`

return { report, passed, method, judges: { draft: judge1, final: judge2 }, verdicts, vaultSummary }
