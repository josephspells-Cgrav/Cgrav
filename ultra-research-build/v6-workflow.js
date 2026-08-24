// ultra_research_engine.js  (v5) — deterministic engine for the Ultra Research skill.
// Invoked by the orchestrator AFTER the Frame stage:
//   Workflow({ scriptPath: ".../scripts/ultra_research_engine.js", args: {...} })
// DETERMINISM LIVES HERE: loop, stop-decision, verdict floor, caps are CODE, not prose.
// Agents do cognition; the engine decides.
//
// RESUME: no filesystem in-script → no disk checkpoint. Rely on harness-native resume —
// relaunch Workflow({scriptPath, resumeFromRunId}); completed agent() calls return cached.
// CONCURRENCY: the harness caps simultaneity (~min(16,cores-2)); we cap TOTAL work (cost)
// via tier (K verified claims), URL-health short-circuits, and lighter lite depth.

export const meta = {
  name: 'ultra-research-engine',
  description: 'Deterministic engine for Ultra Research: looped source-diverse fan-out gather with code-decided saturation stop, independent+priority-ordered load-bearing selection, first synthesis, claim-level red/blue verification (URL-health short-circuit, evidence-aware self-consistency, factored CoVe as a standalone flag/kill signal, snippet-faithfulness, code-computed verdict floor, external-signal-gated correction, bounded re-source that updates claim text+source), fail-closed exit gate that passes only when a load-bearing claim was confirmed by adversarial verification, final cited re-synthesis over a fresh+prioritized corpus + a ready-to-file vault summary',
  phases: [
    { title: 'Gather' },
    { title: 'Synthesize' },
    { title: 'Adversarial' },
    { title: 'Finalize' },
  ],
}

// ============================================================ INPUTS (robust)
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = { question: args } } }
A = A || {}

const Q         = A.question || 'UNSPECIFIED QUESTION'
const SUBQS     = Array.isArray(A.subQuestions) ? A.subQuestions : []
let   CHECKLIST = Array.isArray(A.checklist) ? A.checklist : []
const MODE      = A.mode || 'balanced'
const CONFIRMED = A.userConfirmedTier === true

const TIERS = {
  lite:     { workers: 2, maxRounds: 3,  scN: 3, dryK: 2, novelMin: 2, kClaims: 5,  depth: { cove: false, debate: false } },
  standard: { workers: 4, maxRounds: 6,  scN: 5, dryK: 3, novelMin: 2, kClaims: 8,  depth: { cove: true,  debate: true } },
  max:      { workers: 6, maxRounds: 10, scN: 7, dryK: 3, novelMin: 3, kClaims: 12, depth: { cove: true,  debate: true } },
}
const TIER = String(A.tier || 'standard').trim().toLowerCase()
if (!TIERS[TIER]) return { refused: true, reason: `Unknown tier "${A.tier}". Use lite | standard | max.` }
const C = TIERS[TIER]

let checklistAutoDerived = false
if (!CHECKLIST.length && SUBQS.length) { CHECKLIST = SUBQS.slice(); checklistAutoDerived = true }
if (Q === 'UNSPECIFIED QUESTION' || (!CHECKLIST.length && !SUBQS.length)) {
  return { refused: true, reason: 'Engine needs a question + subQuestions/checklist (the research contract). Run the Frame stage first.' }
}
if ((TIER === 'standard' || TIER === 'max') && !CONFIRMED) {
  return { refused: true, reason: `Tier "${TIER}" requires userConfirmedTier:true (cost ~standard 15-25x / max 40-80x chat tokens). Re-invoke after the user confirms, or run tier:"lite".` }
}

const hasBudget = (typeof budget !== 'undefined') && budget && typeof budget.remaining === 'function' && budget.total
const BUDGET_FLOOR = 40000

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
const GATHER = { type: 'object', additionalProperties: false, properties: { findings: { type: 'array', items: CLAIM } }, required: ['findings'] }
const NOVCRIT = {
  type: 'object', additionalProperties: false,
  properties: {
    novelIndices: { type: 'array', items: { type: 'integer' } },
    covered: { type: 'array', items: { type: 'string' } },
    missing: { type: 'array', items: { type: 'string' } },
  },
  required: ['novelIndices', 'covered', 'missing'],
}
const CRIT = {
  type: 'object', additionalProperties: false,
  properties: { covered: { type: 'array', items: { type: 'string' } }, missing: { type: 'array', items: { type: 'string' } } },
  required: ['covered', 'missing'],
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
  properties: { verdict: { type: 'string', enum: ['survived', 'corrected', 'killed', 'flagged-uncertain'] }, correctedText: { type: 'string' }, externalSignal: { type: 'string' }, why: { type: 'string' } },
  required: ['verdict', 'why'],
}
const JUDGE = {
  type: 'object', additionalProperties: false,
  properties: { sourceQuality: { type: 'number' }, citationAccuracy: { type: 'number' }, completeness: { type: 'number' }, pass: { type: 'boolean' }, notes: { type: 'string' } },
  required: ['pass', 'notes'],
}

// ============================================================ helpers
const keyOf = (r) => (r.source_url || '') + '|' + (r.claim || '').slice(0, 80).toLowerCase()
const RANK = { survived: 0, 'flagged-uncertain': 1, corrected: 2, killed: 3 }
const compress = (arr, cap, snip) => arr.slice(0, cap).map((r) => ({ claim: r.claim, source_url: r.source_url, source_type: r.source_type, confidence: r.confidence, snippet: (r.snippet || '').slice(0, snip) }))

async function safeAgent(prompt, opts) {
  try { return await agent(prompt, opts) }
  catch (e) {
    try { return await agent(prompt + `\n\n[Retry — prior output failed: ${(e && e.message) || 'schema/validation error'}. Return ONLY valid output matching the schema.]`, opts) }
    catch (e2) { return null }
  }
}
// a failed factored CoVe is a STANDALONE flag/kill signal. hasCitedCounter = a GENUINE refutation
// (red.contradicts), not the mere existence of an adversary-surfaced link.
function verdictFloor(scRatio, urlStatus, coveConsistent, hasCitedCounter, snippetFaithful) {
  if (urlStatus === 'fabricated') return 'killed'
  if (scRatio < 0.5) return 'killed'
  if (coveConsistent === false) return (hasCitedCounter || scRatio < 0.6) ? 'killed' : 'flagged-uncertain'
  let v = scRatio < 0.6 ? 'flagged-uncertain' : 'survived'
  if (snippetFaithful === false && RANK[v] < RANK['flagged-uncertain']) v = 'flagged-uncertain'
  return v
}

// ============================================================ GATHER LOOP
phase('Gather')
const corpus = new Map()
const lensesExercised = new Set()
let openGaps = CHECKLIST.slice()
let coveredFrac = 0
let dryRounds = 0
let round = 0
let stopReason = 'cap-fired'   // v5 HV3: neutral default; only a real break sets a clean reason (no 'saturated' landmine)
let stopped = false            // v5 HV3: true iff a saturation/budget break fired (vs. natural cap exhaustion)
let droppedDup = 0

while (round < C.maxRounds) {
  round++
  if (hasBudget && budget.remaining() < BUDGET_FLOOR) { stopReason = 'budget-floor'; stopped = true; log('stopping: budget floor'); break }
  const focus = openGaps.length ? openGaps : SUBQS
  const lensSet = Array.from({ length: C.workers }, (_, i) => LENSES[(i + (round - 1) * C.workers) % LENSES.length])
  lensSet.forEach((l) => lensesExercised.add(l))
  const briefs = lensSet.map((lens, i) => ({ lens, focus: focus[i % Math.max(1, focus.length)] || Q }))

  const batches = (await parallel(briefs.map((b) => () => safeAgent(
    `Research worker for: "${Q}".\nLENS (only surface this evidence type): ${b.lens}.\nSUB-FOCUS this round: ${b.focus}.\n` +
    `MODE: ${MODE} (depth = favor primary/academic/first-party and go deep on fewer sources; breadth = favor recent news/practitioner and cast wide; balanced = mix).\n` +
    `Two-pass search: (1) broad/short queries to map, (2) narrow queries on the gap. Use mcp__firecrawl-mcp__firecrawl_search ` +
    `then mcp__firecrawl-mcp__firecrawl_scrape (or WebSearch/WebFetch); issue several searches in parallel. Prefer primary/authoritative; ` +
    `AVOID SEO farms. OPEN each URL before citing it, and capture a verbatim SNIPPET that supports the claim. Return ONLY records bearing ` +
    `on the sub-focus: {claim, source_url, source_type, snippet, confidence} — never prose, never a remembered URL.`,
    { label: `gather:r${round}:${b.lens.split(' ')[0]}`, phase: 'Gather', schema: GATHER, model: 'sonnet' }
  )))).filter(Boolean)

  const incoming = batches.flatMap((b) => b.findings || [])
  const exactNew = incoming.filter((r) => { const k = keyOf(r); if (corpus.has(k)) return false; corpus.set(k, r); return true })
  droppedDup += incoming.length - exactNew.length

  const nc = exactNew.length
    ? (await safeAgent(
        `For "${Q}". Open sub-questions: ${JSON.stringify(openGaps.length ? openGaps : SUBQS)}.\nRequired subtopics: ${JSON.stringify(CHECKLIST)}.\n` +
        `ALREADY-SEEN (truncated): ${JSON.stringify(Array.from(corpus.values()).slice(-150).map((r) => r.claim.slice(0, 80)))}\n` +
        `NEW batch (index:claim): ${JSON.stringify(exactNew.map((r, i) => i + ':' + r.claim.slice(0, 120)))}\n` +
        `Return novelIndices = indices of NEW items that MATERIALLY add to an open sub-question (a paraphrase of a seen claim is NOT novel); plus which subtopics are covered / missing.`,
        { label: `novcrit:r${round}`, phase: 'Gather', schema: NOVCRIT, model: 'sonnet' }
      ))
    : null
  const novelCount = nc ? new Set((nc.novelIndices || []).filter((i) => i >= 0 && i < exactNew.length)).size : 0
  openGaps = nc ? (nc.missing || openGaps) : openGaps
  const newCovered = nc && CHECKLIST.length ? (nc.covered || []).length / CHECKLIST.length : coveredFrac
  const coverageDelta = newCovered - coveredFrac
  coveredFrac = newCovered

  if (novelCount < C.novelMin) dryRounds++; else dryRounds = 0
  log(`round ${round}: +${incoming.length} found · ${novelCount} novel · corpus=${corpus.size} · lenses=${lensesExercised.size} · missing=${openGaps.length} · cover=${(coveredFrac * 100) | 0}% · dry=${dryRounds}`)

  // ---- STOP DECISION (all in code) ----
  const saturated = dryRounds >= C.dryK
  const diversityOk = lensesExercised.size >= 3
  const criticOk = openGaps.length === 0
  if (saturated && !diversityOk) { log('lenses not yet exhausted — rotating, not stopping'); continue }
  if (saturated && diversityOk) {
    stopReason = !criticOk ? 'saturated-with-gaps' : (coverageDelta < 0.02 ? 'diminishing-returns' : 'saturated')
    stopped = true
    log('STOP: ' + stopReason)
    break
  }
}
// v5 HV3: relabel ONLY when the loop exhausted the cap with no break — never overwrites a real saturation/budget stop.
if (!stopped) {
  stopReason = openGaps.length ? 'cap-fired' : 'covered-at-cap'
  log(openGaps.length ? 'WARNING: hard cap fired — report MUST enumerate gaps' : 'cap reached; all subtopics covered but NOT saturated — provisional')
}

// ============================================================ FIRST SYNTHESIS + actionable draft gate
phase('Synthesize')
let draft = await safeAgent(
  `First synthesis (PRE-ADVERSARIAL DRAFT) for "${Q}". Sub-questions: ${JSON.stringify(SUBQS)}. Open gaps: ${JSON.stringify(openGaps)}.\n` +
  `Evidence: ${JSON.stringify(compress(Array.from(corpus.values()), 120, 200))}\nWrite a direct answer with inline [n] citations keyed to source_url, then list claims; mark loadBearing=true for claims the conclusion truly depends on.`,
  { label: 'first-synthesis', phase: 'Synthesize', schema: DRAFT, model: 'opus' }
)
draft = draft || { answer: '(synthesis failed)', claims: [] }
const judge1 = (await safeAgent(
  `LLM-judge (sourceQuality, citationAccuracy, completeness 0..1; pass=false if sourceQuality<0.6) for this DRAFT to "${Q}". DRAFT: ${JSON.stringify(draft.answer).slice(0, 8000)}`,
  { label: 'judge:draft', phase: 'Synthesize', schema: JUDGE, model: 'opus' }
)) || { pass: false, notes: 'draft judge unavailable — failed closed' }
if (judge1.pass === false && round < C.maxRounds && openGaps.length && !(hasBudget && budget.remaining() < BUDGET_FLOOR)) {
  round++
  const extra = (await parallel(openGaps.slice(0, C.workers).map((g, i) => () => safeAgent(
    `Targeted gap-fill for "${Q}". Find primary/authoritative evidence on: ${g}. Lens: ${LENSES[i % LENSES.length]}. Return {claim,source_url,source_type,snippet,confidence} records (open each URL, capture a snippet).`,
    { label: `gather:gapfill:${i}`, phase: 'Gather', schema: GATHER, model: 'sonnet' }
  )))).filter(Boolean)
  extra.flatMap((b) => b.findings || []).forEach((r) => { if (!corpus.has(keyOf(r))) corpus.set(keyOf(r), r) })
  draft = (await safeAgent(
    `Re-synthesize (draft) for "${Q}" with the added evidence. Evidence: ${JSON.stringify(compress(Array.from(corpus.values()), 120, 200))}. Mark loadBearing per claim.`,
    { label: 'first-synthesis:redo', phase: 'Synthesize', schema: DRAFT, model: 'opus' }
  )) || draft
  // HR2: refresh completeness on the post-gap-fill corpus — PROMOTE-only (never relax a real gap).
  const gc = await safeAgent(
    `Completeness check for "${Q}". Required subtopics: ${JSON.stringify(CHECKLIST)}.\nEvidence (claims): ${JSON.stringify(Array.from(corpus.values()).slice(-200).map((r) => r.claim.slice(0, 120)))}\nReturn which subtopics are covered / missing.`,
    { label: 'critic:postgapfill', phase: 'Gather', schema: CRIT, model: 'sonnet' }
  )
  if (gc) {
    openGaps = gc.missing || openGaps
    if (CHECKLIST.length) coveredFrac = (gc.covered || []).length / CHECKLIST.length
    if (!openGaps.length && stopReason === 'saturated-with-gaps') stopReason = 'saturated'
  }
}

// INDEPENDENT load-bearing selection (blind), unioned + PRIORITY-ORDERED (both-flagged first)
const indep = (await safeAgent(
  `Read this answer and its claims. Which claim IDs, IF FALSE, would change the conclusion? Do not assume the author's marking. ANSWER: ${JSON.stringify(draft.answer).slice(0, 6000)}\nCLAIMS: ${JSON.stringify((draft.claims || []).map((c) => ({ id: c.id, text: c.text })))}`,
  { label: 'loadbearing:independent', phase: 'Synthesize', model: 'opus',
    schema: { type: 'object', additionalProperties: false, properties: { ids: { type: 'array', items: { type: 'string' } } }, required: ['ids'] } }
)) || { ids: [] }
const authorIds = new Set((draft.claims || []).filter((c) => c.loadBearing).map((c) => c.id))
const indepIds = new Set(indep.ids || [])
const score = (c) => (authorIds.has(c.id) ? 1 : 0) + (indepIds.has(c.id) ? 1 : 0)
const allLB = (draft.claims || []).filter((c) => score(c) > 0).sort((a, b) => score(b) - score(a))
let loadBearing = allLB.slice(0, C.kClaims)
let deferred = allLB.slice(C.kClaims)   // v5 MV2: let, so a budget trim can append to it

// ============================================================ RED / BLUE per claim
phase('Adversarial')
// v5 MV2: budget trim moves claims 3..K into deferred (labeled asserted/unverified) — not into a void.
if (hasBudget && budget.remaining() < BUDGET_FLOOR && loadBearing.length > 3) { deferred = deferred.concat(loadBearing.slice(3)); loadBearing = loadBearing.slice(0, 3); log('budget-limited: verifying top 3 load-bearing only') }
// collect ALL snippets per URL (one URL legitimately backs several distinct claims).
const snippetsByUrl = new Map()
Array.from(corpus.values()).forEach((r) => { if (r.source_url) { const a = snippetsByUrl.get(r.source_url) || []; if (r.snippet) a.push(r.snippet); snippetsByUrl.set(r.source_url, a) } })
log(`adversarial pass: ${loadBearing.length} verified (cap ${C.kClaims}), ${deferred.length} deferred (asserted, unverified)`)

async function verifyClaim(c) {
  const url = (await safeAgent(
    `Fetch and report the status of this URL: ${c.source_url}. Use mcp__firecrawl-mcp__firecrawl_scrape or WebFetch. Return {status:'ok'|'stale'|'fabricated', evidence}. fabricated = never existed; stale = real but offline.`,
    { label: `url:${c.id}`, phase: 'Adversarial', model: 'sonnet',
      schema: { type: 'object', additionalProperties: false, properties: { status: { type: 'string', enum: ['ok', 'stale', 'fabricated'] }, evidence: { type: 'string' } }, required: ['status'] } }
  )) || { status: 'stale' }
  if (url.status === 'fabricated') return { claimId: c.id, verdict: 'killed', externalSignal: 'fabricated-url', why: 'cited source does not exist', signals: { url: 'fabricated' } }

  const STANCES = ['reason from base rates', 'use ONLY the cited source', 'actively SEARCH for disconfirming evidence', 'reason from first principles', 'weight the most RECENT evidence', 'steelman the claim then stress-test it']
  const votes = (await parallel(Array.from({ length: C.scN }, (_, i) => () => safeAgent(
    `Independently assess if this claim is TRUE — ${STANCES[i % STANCES.length]} (voter ${i + 1}). Do NOT assume it is correct; judge on EVIDENCE, search if needed. Claim: "${c.text}" (cited source: ${c.source_url}). Return {supported:boolean, why}.`,
    { label: `sc:${c.id}:${i}`, phase: 'Adversarial', model: 'sonnet',
      schema: { type: 'object', additionalProperties: false, properties: { supported: { type: 'boolean' }, why: { type: 'string' } }, required: ['supported'] } }
  )))).filter(Boolean)
  const scRatio = votes.length ? votes.filter((v) => v.supported).length / votes.length : 0.5

  const snips = (snippetsByUrl.get(c.source_url) || []).filter(Boolean)
  const faith = snips.length
    ? ((await safeAgent(
        `Taken together, do these source snippets DIRECTLY and specifically support the claim AS STATED, or does the claim overreach / misread them? Claim: "${c.text}". Snippets: ${JSON.stringify(snips.slice(0, 4).map((s) => s.slice(0, 400)))}. Return {faithful:boolean, why}.`,
        { label: `faith:${c.id}`, phase: 'Adversarial', model: 'sonnet',
          schema: { type: 'object', additionalProperties: false, properties: { faithful: { type: 'boolean' }, why: { type: 'string' } }, required: ['faithful'] } }
      )) || { faithful: true })
    : { faithful: true, note: 'no snippet captured' }

  let cove = { consistent: true }
  if (C.depth.cove) {
    const cq = (await safeAgent(
      `Generate 2-3 verification sub-questions that would CONFIRM OR REFUTE this claim: "${c.text}". Return {questions:[...]}.`,
      { label: `cove-gen:${c.id}`, phase: 'Adversarial', model: 'sonnet',
        schema: { type: 'object', additionalProperties: false, properties: { questions: { type: 'array', items: { type: 'string' } } }, required: ['questions'] } }
    )) || { questions: [] }
    cove = (await safeAgent(
      `Answer each via independent search; do NOT assume any claim is true. Questions: ${JSON.stringify(cq.questions)}. Then: are the answers CONSISTENT with "${c.text}"? Return {consistent:boolean, detail}.`,
      { label: `cove-ans:${c.id}`, phase: 'Adversarial', model: 'sonnet',
        schema: { type: 'object', additionalProperties: false, properties: { consistent: { type: 'boolean' }, detail: { type: 'string' } }, required: ['consistent'] } }
    )) || { consistent: true }
  }

  let red = {}, blue = {}
  if (C.depth.debate) {
    const rb = await parallel([
      () => safeAgent(`RED TEAM: steelman the OPPOSITE of "${c.text}", then search for contradictory evidence. Set contradicts=true ONLY if you found a real source that GENUINELY refutes the claim (not merely related/adjacent). Return {contradicts, strongestCounter, counterUrl}.`,
        { label: `red:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: { type: 'object', additionalProperties: false, properties: { contradicts: { type: 'boolean' }, strongestCounter: { type: 'string' }, counterUrl: { type: 'string' } }, required: ['contradicts', 'strongestCounter'] } }),
      () => safeAgent(`BLUE TEAM: defend "${c.text}" with the strongest sourced evidence (real URL). Return {strongestSupport, supportUrl}.`,
        { label: `blue:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: { type: 'object', additionalProperties: false, properties: { strongestSupport: { type: 'string' }, supportUrl: { type: 'string' } }, required: ['strongestSupport'] } }),
    ])
    red = rb[0] || {}; blue = rb[1] || {}
  }

  const floor = verdictFloor(scRatio, url.status, cove.consistent, red.contradicts === true, faith.faithful)
  const j = (await safeAgent(
    `Neutral judge for "${c.text}". Signals: SC-support=${scRatio.toFixed(2)} (supermajority>0.6); url=${url.status}; CoVe-consistent=${cove.consistent}; snippet-faithful=${faith.faithful}; red=${JSON.stringify(red)}; blue=${JSON.stringify(blue)}.\n` +
    `The deterministic FLOOR verdict is "${floor}". Keep it or ESCALATE severity (survived<flagged-uncertain<corrected<killed) on a cited external signal; you may NOT soften below the floor. "corrected" requires BOTH correctedText AND a named externalSignal (e.g. a primary source proving a different value). With no external signal contradicting it, keep "${floor}".`,
    { label: `judge:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: VERDICT }
  )) || { verdict: floor, why: 'judge unavailable; deterministic floor applied' }
  let verdict = (RANK[j.verdict] >= RANK[floor]) ? j.verdict : floor
  // v6: 'corrected' must rest on a machine-observed artifact (a red-team counter URL or the re-source path), not judge prose
  // alone; uncorroborated → demote to flagged-uncertain (surfaces the disagreement) rather than to a clean 'survived'.
  if (verdict === 'corrected' && !(j.correctedText && j.externalSignal && (red.counterUrl || j.externalSignal === 'resourced'))) verdict = (floor === 'survived' ? 'flagged-uncertain' : floor)
  return { claimId: c.id, verdict, correctedText: j.correctedText, externalSignal: j.externalSignal, why: j.why, signals: { scRatio: +scRatio.toFixed(2), url: url.status, cove: cove.consistent, faithful: faith.faithful } }
}

let verdicts = (await parallel(loadBearing.map((c) => () => verifyClaim(c)))).filter(Boolean)

// BOUNDED re-source of killed load-bearing claims (1 attempt) — update verdict source AND claim text.
const killedIdx = verdicts.map((v, i) => ({ v, i })).filter((x) => x.v.verdict === 'killed')
if (killedIdx.length && !(hasBudget && budget.remaining() < BUDGET_FLOOR)) {
  log(`re-sourcing ${killedIdx.length} killed load-bearing claim(s) (1 attempt each)`)
  const targets = killedIdx.map((x) => loadBearing.find((c) => c.id === x.v.claimId)).filter(Boolean)
  const repl = await parallel(targets.map((c) => () => safeAgent(
    `The claim "${c.text}" failed verification (bad/absent source). Find the BEST primary/authoritative replacement source for this specific point, or report none. Return {claim,source_url,source_type,snippet,confidence}.`,
    { label: `resource:${c.id}`, phase: 'Adversarial', model: 'sonnet', schema: CLAIM }
  )))
  for (let n = 0; n < targets.length; n++) {
    const r = repl[n]; if (!r || !r.source_url) continue
    corpus.set(keyOf(r), r)
    const sa = snippetsByUrl.get(r.source_url) || []; if (r.snippet) sa.push(r.snippet); snippetsByUrl.set(r.source_url, sa)
    const rc = { id: targets[n].id, text: r.claim, source_url: r.source_url }
    const rv = await verifyClaim(rc)
    if (rv && rv.verdict !== 'killed') {
      verdicts = verdicts.map((v) => v.claimId === targets[n].id ? { ...rv, why: 'original killed; re-sourced replacement ' + rv.verdict, externalSignal: 'resourced' } : v)
      loadBearing = loadBearing.map((c) => c.id === targets[n].id ? { ...c, text: r.claim, source_url: r.source_url } : c)
    }
  }
}

// ============================================================ FINAL RE-SYNTHESIS + fail-closed exit gate + vault summary
phase('Finalize')
// v6 HV1: only 'survived'/'corrected' are CONFIRMED; 'flagged-uncertain' is NOT a verification pass (was wrongly folded in).
const confirmedLB = verdicts.filter((v) => v.verdict === 'survived' || v.verdict === 'corrected')
const flaggedLB = verdicts.filter((v) => v.verdict === 'flagged-uncertain').map((v) => v.claimId)
const killedLB = verdicts.filter((v) => v.verdict === 'killed').map((v) => v.claimId)
const freshCorpus = Array.from(corpus.values())
// MR2: prioritize load-bearing-cited (incl. re-sourced) records so the compress cap can't drop them.
const lbUrls = new Set(loadBearing.map((c) => c.source_url))
const prioritizedCorpus = [...freshCorpus.filter((r) => lbUrls.has(r.source_url)), ...freshCorpus.filter((r) => !lbUrls.has(r.source_url))]
const method = {
  tier: TIER, mode: MODE, rounds: round, stopReason, corpusClaims: corpus.size, droppedDuplicates: droppedDup,
  lensesExercised: Array.from(lensesExercised), openGaps, checklistAutoDerived,
  verified: confirmedLB.length, flaggedUncertain: flaggedLB, killedUnrecovered: killedLB, deferredUnverified: deferred.map((c) => c.id), initialDraftGatePassed: judge1.pass,
}
let report = (await safeAgent(
  `Final re-synthesis for "${Q}", written for a PRACTITIONER DECISION-MAKER: lead with the bottom line in plain, short sentences; action-relevant bullets; the ledger is for auditability, don't optimize the prose for it. Rebuild from claims-with-verdicts: DROP 'killed' (unless re-sourced to survived/corrected) and surface it as a gap, surface 'flagged-uncertain' as open, apply 'corrected' text. Deferred-unverified claims (${JSON.stringify(deferred.map((c) => c.id))}) must be labeled "asserted, unverified" in the ledger.\n` +
  `Produce EXACTLY: # question / ## Answer / ## Key findings / ## Evidence ledger (table incl. Adversarial verdict + Confidence) / ## Calibrated confidence (grounded in evidence count + source tier + SC vote + verdict — never a vibe) / ## Open questions & gaps (ENUMERATE — gaps=${JSON.stringify(openGaps)}, killed/unrecovered=${JSON.stringify(killedLB)}, stopReason=${stopReason}) / ## Method note (${JSON.stringify(method)}).\n` +
  `LOAD-BEARING (verified): ${JSON.stringify(loadBearing)}\nVERDICTS: ${JSON.stringify(verdicts)}\nEVIDENCE: ${JSON.stringify(compress(prioritizedCorpus, 120, 200))}`,
  { label: 'final-synthesis', phase: 'Finalize', model: 'opus' }
)) || '(final synthesis failed — see method note)'
const judge2 = (await safeAgent(
  `Final exit-gate judge (sourceQuality, citationAccuracy, completeness 0..1; pass=false if sourceQuality<0.6 OR citationAccuracy<0.7) for the report to "${Q}". REPORT: ${typeof report === 'string' ? report.slice(0, 12000) : JSON.stringify(report).slice(0, 12000)}`,
  { label: 'judge:final', phase: 'Finalize', model: 'opus', schema: JUDGE }
)) || { pass: false, notes: 'exit judge unavailable — failed closed' }
// v6 HV1/HV2/HV3: pass only on a CLEAN stop, with a CONFIRMED (survived/corrected) load-bearing claim, and NO unrecovered kills.
const cleanStop = stopReason === 'saturated' || stopReason === 'diminishing-returns'
const verificationRan = confirmedLB.length > 0
const passed = (judge2.pass !== false) && cleanStop && verificationRan && killedLB.length === 0
if (!passed && typeof report === 'string') {
  const why = (judge2.pass === false) ? `failed exit gate: ${judge2.notes || ''}`
    : (!verificationRan ? 'no load-bearing claim was confirmed (all flagged-uncertain or killed)'
    : (killedLB.length ? `${killedLB.length} load-bearing claim(s) killed/unrecovered: ${killedLB.join(', ')}`
    : `stop reason: ${stopReason} (${openGaps.length} open gap${openGaps.length === 1 ? '' : 's'})`))
  report = `> [!warning] PROVISIONAL — ${why}. Treat flagged findings as unverified; see Open questions & gaps.\n\n` + report
}
const vaultSummary = `## ${Q}\n- Confidence: ${passed ? 'gated-pass' : 'PROVISIONAL'} · stop: ${stopReason} · tier: ${TIER}\n- Load-bearing: ${confirmedLB.length} confirmed / ${flaggedLB.length} uncertain / ${killedLB.length} killed of ${verdicts.length}; ${corpus.size} sources; gaps: ${openGaps.length}\n- Open: ${openGaps.join('; ') || 'none'}\n`

return { report, passed, method, judges: { draft: judge1, final: judge2 }, verdicts, vaultSummary }
