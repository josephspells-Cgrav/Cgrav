---
name: ultra-research
description: >-
  Maximum-rigor, multi-source research harness: ultrathink framing, a parallel
  agent swarm doing fan-out web search with structural citations, a
  loop-until-saturated gather phase (stops only when no meaningful new info
  appears AND a completeness critic passes), a first synthesis, a claim-level
  red-team/blue-team verification pass (self-consistency + external-signal-gated
  correction), and a final cited re-synthesis with an evidence ledger and
  calibrated confidence. Use for deep, rigorous, fact-checked, or
  adversarially-verified research — "ultra research", "fact-check this
  thoroughly", "cited report on", "competitive/market scan", "what's the real
  truth about", or any broad, high-stakes, or contested question where one web
  search isn't enough. Not for simple single-fact lookups or depth-first tasks
  needing one shared context.
effort: high
allowed-tools: >-
  Workflow Read Write Bash
  mcp__firecrawl-mcp__firecrawl_search mcp__firecrawl-mcp__firecrawl_scrape
  WebSearch WebFetch
# Cost control is enforced in the engine (it refuses standard/max without
# userConfirmedTier). To ALSO make the skill explicit-invoke only (no
# auto-trigger), add:  disable-model-invocation: true
---

# Ultra Research

A maximum-rigor research harness. You are the **orchestrator**: you frame the
problem with deep reasoning, then run a deterministic **engine** (a Workflow
script) that fans out a research swarm, loops until the topic is saturated,
adversarially verifies each load-bearing claim, and synthesizes a cited,
confidence-calibrated answer.

This is expensive (≈ **lite 5–10× / standard 15–25× / max 40–80×** a normal chat
in tokens). That cost buys verified, auditable answers — so spend it only where
being wrong is costly. The gate below is not optional, and the engine enforces it.

## Contents
- When to use / when NOT — the cost gate
- STOP CONDITIONS (front-loaded)
- ANTI-PATTERNS (front-loaded)
- How to run it (+ resume, + fallback)
- Stage detail (Frame · Gather · Red/Blue · Re-synthesis)
- Output format · Tiers · Reference files

## When to use / when NOT — the cost gate

USE when the question is **broad, high-stakes, or contested** and a single
search won't settle it: market/competitive scans, "what's the real truth about
X", literature-style syntheses, decisions with real downside, anything the user
wants *fact-checked* or *adversarially verified*.

Do NOT spin up the swarm for:
- **Simple single-fact lookups** — one search/`WebFetch` answers it.
- **Depth-first / dependency-heavy tasks** needing one shared evolving context
  (most coding). Use a single agent with interleaved thinking.
- **Mid-rigor research** — if the existing `deep-research` skill (fan-out +
  adversarial-verify + cited report) is enough, use THAT. Ultra Research is the
  max-rigor tier above it; reach for it only when the extra verification earns
  its 15–80× cost.

> Over-spawning (a swarm for a trivial query) is the #1 documented failure mode.
> The engine refuses `standard`/`max` without `userConfirmedTier:true`, so the
> gate can't be skipped by an over-eager auto-trigger.

### Gate steps (before invoking the engine)
1. Classify complexity → tier: **lite** / **standard** / **max** (see Tiers).
2. If underspecified, ask **2–3 clarifying questions first**.
3. For standard/max, state the plan + cost and get an explicit go:
   *"This will spawn ~N agents over up to R rounds (≈Xk tokens). Run it, or the
   lite tier?"* Then pass `userConfirmedTier:true`. (lite may proceed.)

## STOP CONDITIONS  *(front-loaded — the crux; decided in engine code, not prose)*

A round adds value only if it yields **novel** claims bearing on the **open**
sub-questions. A flood of already-known restatements is **not** progress.

The engine stops the gather loop only when ALL THREE hold:
- **Saturation:** K consecutive rounds (default **K=3**) each added < N novel
  claims (default **N=2**).
- **Completeness:** the completeness critic's `missing` list (vs. the contract's
  checklist) is **empty**.
- **Diversity:** ≥3 source-type lenses have been exercised — measured from the
  engine's deterministic lens rotation, **not** from worker self-report.

Guards (also in code):
- **Strategy-exhaustion ≠ topic-exhaustion** — if dry but <3 lenses tried, the
  loop rotates the lens instead of stopping.
- **Hard round cap is a safety net only.** When it fires, `stopReason:cap-fired`,
  the report enumerates the gaps, and the exit gate marks the run provisional.
- **Diminishing returns** — stop only when the completeness coverage-delta is
  <2% AND the completeness gate is already satisfied.

> Defaults (K=3, N=2, caps) are **practitioner heuristics, not validated
> constants** — they live in the engine's tier config. Calibrate, don't worship.

## ANTI-PATTERNS  *(front-loaded — these break the skill; they also govern the fallback path)*

- **NEVER free-run self-critique.** "Review your answer and fix it" *degrades*
  accuracy (sycophancy). Every kill/correction is gated on a **concrete external
  signal** — a fabricated/dead URL, a lost self-consistency vote, a failed
  factored (CoVe) check, or an unfaithful snippet. No signal → the claim
  `survived`/`flagged`, never silently "fixed". The engine computes the verdict
  floor in code; the judge may only *escalate*.
- **No retrofitted citations.** A claim carries `source_url` from the moment it's
  gathered; citations bolted on at synthesis get misattributed.
- **Self-consistency votes must use DISTINCT reasoning stances** and judge on
  evidence, not the model's prior — else 5 identical completions just launder the
  base model's guess as "verification".
- **CoVe sub-questions are answered in isolation** — without the draft (or each
  other) in context, or the model re-hallucinates in the same direction.
- **No echo chamber** — workers get distinct source-type lenses.
- **No silent truncation / silent caps** — surface gaps and source conflicts;
  polished false confidence is the cardinal sin.
- **A killed load-bearing claim is re-sourced once; if it still fails, the
  dependent conclusion is downgraded and surfaced as a gap** — never silently
  deleted under a confident answer.

## How to run it

**Primary path (Claude Code w/ the Workflow tool):**
1. Do the **Frame** stage (below) yourself (ultrathink). Persist the research
   contract to `./ultra-research/<slug>-contract.json`.
2. Invoke the engine:
   ```
   Workflow({
     scriptPath: "<skill-dir>/scripts/ultra_research_engine.js",
     args: { question, subQuestions, checklist, tier, mode,
             userConfirmedTier: true, contractPath }
   })
   ```
   (`<skill-dir>` = this skill's folder; resolve it to an absolute path.) The
   engine runs gather→saturate→synthesis→red/blue→re-synthesis and returns
   `{ report, passed, method, judges, verdicts, vaultSummary }`.
3. Write `report` to `./ultra-research/<slug>-report.md`. Present the answer +
   ledger + open questions. **If `passed === false`, tell the user the run is
   provisional and why.**
4. **Capture to the vault (Mode D — directive, not optional):** write
   `vaultSummary` to `vault/wiki/<slug>.md` (or `vault/inbox/` if unsure) so an
   expensive run is never re-run from scratch.

**Resume (no lost runs):** the engine doesn't checkpoint to disk (a Workflow
script has no filesystem). It relies on harness-native resume — if a run dies,
relaunch `Workflow({ scriptPath, resumeFromRunId })` and completed agent calls
return from cache.

**Fallback (no Workflow tool / no subagents, e.g. Claude.ai):** run the stages
sequentially yourself — keep the seen-set and the three-part stop rule by hand,
and do the red/blue pass claim-by-claim. **The ANTI-PATTERNS above are
load-bearing here**: never free-run self-critique, keep CoVe isolated from the
draft, vary self-consistency stances, gate every correction on an external
signal. Quality degrades without true independent agents — say so.

## Stage detail

### Stage 1 — Frame (you, ultrathink). Medium freedom.
Produce a **research contract** and persist it before spawning:
- `question` (post-clarification) · `subQuestions` (3–7) · `checklist` (the
  subtopics that MUST be covered — drives the completeness critic; if you omit
  it the engine derives it from `subQuestions`).
- `tier` + `mode` (`depth` for technical/specialized, `breadth` for
  current-events/market, `balanced` default) + the **task-specific stop
  condition** in plain words (e.g. "each competing hypothesis has ≥2 independent
  primary sources").

### Stages 2–4 — Gather, Saturate, First synthesis (engine). Medium freedom.
One worker per source-type lens, two-pass search (broad→narrow), structured
claim records `{claim, source_url, source_type, snippet, confidence}`. Each round
the engine dedups into a corpus, scores novelty + completeness in one fused call,
and applies the STOP CONDITIONS. A first synthesis produces a **draft** (labeled
pre-adversarial); a draft judge that *fails* triggers one more targeted gather
round. An **independent** selector (blind to the synthesizer's flags) picks the
load-bearing claims — union with the synthesizer's, capped per tier.

### Stage 5 — Red/Blue adversarial pass (engine). LOW FREEDOM — exact sequence.
Per load-bearing claim, in order:
1. **URL-health first** — fabricated → `killed` immediately (skip the rest; a
   fake source can't be verified).
2. **Self-consistency vote** — N completions, each a *distinct reasoning stance*,
   judging on evidence. Supermajority → high; bare majority → flag; <50% → kill.
3. **Snippet-faithfulness** — does the cited snippet actually support the claim?
4. **CoVe (standard/max)** — generate sub-questions, answer them in isolation.
5. **Attacker / Defender / Judge (standard/max)** — independent; attacker
   steelmans the opposite first.
6. **Verdict floor computed in code**; the judge may only escalate. `corrected`
   requires a named external signal + replacement text. Killed load-bearing
   claims get **one** re-source attempt.

### Stage 6 — Final re-synthesis (engine). Low freedom on format.
Rebuild from claims-with-verdicts, written for a **practitioner decision-maker**
(bottom line first, short sentences). A real exit-gate judge runs; on fail (or a
cap-fired stop) the report is stamped provisional.

## Output format

```
# <Research question>
## Answer            <bottom line first, plain language, inline [n] citations>
## Key findings      <claim [n] — confidence: high|medium|low>
## Evidence ledger   | # | Claim | Source (URL) | Source type | Adversarial verdict | Confidence |
## Calibrated confidence   <per claim: confidence + WHY — evidence count + source tier + SC vote + verdict. Never a vibe.>
## Open questions & gaps    <unresolved subs; where sources conflict — stated, not hidden>
## Method note       <tier, rounds, stop reason, source count, deferred-unverified claims>
```

## Tiers (set at the gate)

| Tier | Workers | Round cap | SC votes | Verified claims (K) | Per-claim depth | Use for |
|------|---------|-----------|----------|---------------------|-----------------|---------|
| lite | 2 | 3 | 3 | 5 | URL-health + SC + faithfulness (no CoVe/debate) | a focused comparison |
| standard | 4 | 6 | 5 | 8 | full pass | most real research |
| max | 6 | 10 | 7 | 12 | full pass | high-stakes / broad / contested |

The harness caps *simultaneity* (~min(16, cores-2) agents at once; the rest
queue), so the engine never spawns hundreds at once. The engine caps *total*
work (cost) via K verified claims, URL-health short-circuits, and lighter lite
depth — that's why a run is bounded even at max.

## Reference files (bundled with the installed skill; one level deep, load on demand)
- `references/search-strategy.md` · `references/stop-conditions.md` ·
  `references/adversarial-pass.md` · `references/output-template.md` ·
  `references/fallback.md`
- `scripts/ultra_research_engine.js` — the deterministic engine.
- `evals/` — 3 scenarios (contested-claim · fabricated-URL · trivial-query gate)
  run on Sonnet + Haiku before any change ships.

## Calibrate-these defaults
K=3 · N=2 novel · per-tier round caps + SC counts + claim caps · coverage targets.
All are practitioner heuristics in the engine's tier config — tune per domain.
