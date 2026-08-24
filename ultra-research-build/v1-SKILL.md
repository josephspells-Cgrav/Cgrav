---
name: ultra-research
description: >-
  Maximum-rigor, multi-source research harness. Runs ultrathink framing, a
  parallel agent swarm doing fan-out web search with structurally-cited
  evidence, a loop-until-saturated gather phase (stops only when no meaningful
  new information appears AND a completeness critic passes), a first synthesis,
  then a claim-level red-team/blue-team adversarial verification pass
  (self-consistency voting, factored verification, external-signal-gated
  correction), and a final cited re-synthesis with an evidence ledger and
  calibrated confidence. Use whenever the user wants a deep, rigorous,
  fact-checked, or adversarially-verified research report — phrases like "ultra
  research", "deep dive", "research and verify", "fact-check this thoroughly",
  "cited report on", "competitive/market scan", "what's the real truth about",
  or any broad, high-stakes, or contested question where one web search is not
  enough. Prefer this over a plain search when the cost of being wrong is high.
  Not for simple single-fact lookups or depth-first tasks needing one shared
  context.
effort: high
allowed-tools: >-
  Read Write Bash
  mcp__firecrawl-mcp__firecrawl_search mcp__firecrawl-mcp__firecrawl_scrape
  WebSearch WebFetch
# To make this EXPLICIT-INVOKE ONLY (no auto-trigger on description match),
# add:  disable-model-invocation: true
---

# Ultra Research

A maximum-rigor research harness. You are the **orchestrator**: you frame the
problem with deep reasoning, then run a deterministic **engine** (a Workflow
script) that fans out a research swarm, loops until the topic is saturated,
adversarially verifies each load-bearing claim, and synthesizes a cited,
confidence-calibrated answer.

This skill is expensive (a full run ≈ 15× a normal chat in tokens). That cost
buys verified, auditable answers — so spend it only where being wrong is
costly. The gate below is not optional.

## When to use / when NOT

USE when the question is **broad, high-stakes, or contested** and a single
search won't settle it: market/competitive scans, "what's the real truth
about X", literature-style syntheses, decisions with real downside, anything
the user wants *fact-checked* or *adversarially verified*.

Do NOT spin up the swarm for:
- **Simple single-fact lookups** — one search/`WebFetch` answers it. Just answer.
- **Depth-first / dependency-heavy tasks** that need one shared evolving
  context (most coding). Multi-agent fan-out is the wrong shape; use a single
  agent with interleaved thinking.
- **Low-stakes questions** where 15× token cost isn't warranted.
> Why: over-spawning (a swarm for a trivial query) is the #1 documented
> failure mode of these systems. The fix lives here, at the gate.

## COST GATE (do this before spawning anything)

1. Classify complexity → tier: **lite** (1–2 workers), **standard** (4),
   **max** (6+). See "Tiers" below.
2. If the question is underspecified, ask **2–3 clarifying questions first** —
   a swarm pointed at a vague question wastes the most money.
3. State the plan to the user in one line and get a go for **standard/max**:
   *"This will spawn ~N agents across up to R rounds (~Xk tokens). Run it, or
   want the lite tier?"* (lite may proceed without asking.)

## Pipeline at a glance

1. **Frame** (you, ultrathink) → a written *research contract*.
2. **Gather** (swarm, looped) → source-diverse fan-out, structured cited claims.
3. **Saturate-check** (each round) → novelty + completeness critic + strategy guard.
4. **First synthesis** → draft answer (explicitly pre-adversarial).
5. **Red/Blue** (per claim) → self-consistency vote · factored verify · URL-health · attacker/defender/judge.
6. **Final re-synthesis** → answer + evidence ledger + calibrated confidence + gaps.
7. **Persist** → write the report to a file; offer to capture to the vault.

## STOP CONDITIONS  *(front-loaded — this is the crux)*

A research round adds value only if it yields **novel** claims bearing on the
**open** sub-questions. "Novel" = not a duplicate/paraphrase of something
already in the seen-set. A flood of on-topic-but-already-known restatements is
**not** progress.

Stop the gather loop only when ALL THREE hold:
- **Saturation:** K consecutive rounds (default **K=3**) each added fewer than
  N novel claims (default **N=2**).
- **Completeness:** the completeness critic's `missing` list (vs. the contract's
  subtopic checklist) is **empty**.
- **Diversity:** at least **3 qualitatively different search strategies** were
  tried (keyword / semantic / date-scoped / authoritative / counter-argument).

Guards against stopping wrong:
- **Strategy-exhaustion ≠ topic-exhaustion.** If rounds go dry but <3 strategies
  were tried, or recent queries cluster tightly, **rotate the query type — do
  not stop.**
- **Hard round cap is a safety net, never the primary signal.** When it fires,
  the answer MUST enumerate the coverage gaps and the method note MUST say
  `stop reason: cap-fired` (a fired cap means saturation never tripped — a
  diagnostic, not a success).
- **Perfection bias:** if marginal quality gain per round falls below ~2%, stop.

> The defaults (K=3, N=2, cosine 0.85, caps) are **practitioner heuristics, not
> validated constants** — they're tunable in the engine. Calibrate, don't worship.

## ANTI-PATTERNS  *(front-loaded — these break the skill)*

- **NEVER free-run self-critique.** "Review your answer and fix it" *degrades*
  accuracy (sycophancy: the model conforms to the implied doubt). Every
  correction MUST be gated on a **concrete external signal** — a failed
  URL-health check, a schema violation, a lost self-consistency vote, or a
  failed CoVe sub-question. No external signal → no correction (leave the claim
  and flag it).
- **No retrofitted citations.** A claim carries its `source_url` as a structural
  field from the moment it's gathered. Citations bolted on at synthesis time
  get misattributed.
- **No game of telephone.** Workers write findings as structured records;
  don't funnel raw worker prose through the orchestrator.
- **No echo chamber.** Workers get distinct *source-type* mandates; identical
  prompts converge on the same SEO results.
- **No silent truncation / silent caps.** Log what was dropped; surface gaps
  and source conflicts in the output. Polished false confidence is the cardinal sin.
- **No over-spawning.** Agent count comes from the complexity tier, set at the gate.

## How to run it

**Primary path (Claude Code w/ the Workflow tool):**
1. Do the **Frame** stage (below) in your own context (ultrathink). Write the
   research contract to `./ultra-research/<slug>-contract.json`.
2. Invoke the engine:
   ```
   Workflow({
     scriptPath: "<this-skill-dir>/scripts/ultra_research_engine.js",
     args: { question, subQuestions, checklist, tier, mode, contractPath }
   })
   ```
   The engine runs gather→saturate→synthesis→red/blue→re-synthesis
   deterministically and returns `{ report, method, judge }`.
3. Write `report` to `./ultra-research/<slug>-report.md`. Present the answer +
   evidence ledger + open questions. Offer to capture to the vault (Mode D).

**Fallback path (no Workflow tool / no subagents, e.g. Claude.ai):** run the
stages sequentially yourself — fan out searches in batches, keep the seen-set
and the stop logic by hand, and do the red/blue pass claim-by-claim. Quality
degrades without true parallel independent agents; tell the user so. See
`references/fallback.md`.

## Stage detail

### Stage 1 — Frame (you, ultrathink). Medium freedom.
Produce a **research contract** (persist it before spawning — it must survive
context truncation):
- `question`: the precise question (post-clarification).
- `subQuestions`: 3–7 decomposed sub-questions.
- `checklist`: the subtopics that MUST be covered (drives the completeness critic).
- `tier` + `mode` (`depth` for technical/specialized, `breadth` for
  current-events/market) + the **task-specific stop condition** in plain words
  (e.g. "each competing hypothesis has ≥2 independent primary sources").

### Stages 2–4 — Gather, Saturate, First synthesis (engine). Medium freedom.
The engine fans out one worker per source-type lens, each running a two-pass
search (broad map → narrow gap-fill) and returning structured claim records
`{claim, source_url, source_type, snippet, confidence}`. After each round it
dedups, scores novelty, runs the completeness critic, and applies the STOP
CONDITIONS. Then a first synthesis produces a **draft** (labeled
pre-adversarial) and an internal 5-dimension LLM-judge pass. Details:
`references/search-strategy.md`, `references/stop-conditions.md`.

### Stage 5 — Red/Blue adversarial pass (engine). LOW FREEDOM — follow exactly.
For each **load-bearing** claim in the draft, run all of these and record the
result; this sequence is what makes the verification valid:
1. **Self-consistency vote** — N independent completions (default N=5) judge the
   claim's truth. Supermajority supports → confidence high. Bare majority →
   trigger external verification. No majority → **kill or flag** (do not pass
   the plurality answer through).
2. **URL-health** — fetch each cited URL. Resolves → ok. Real-but-offline →
   stale (try Wayback). Never existed → **fabricated → drop the claim + re-source.**
3. **CoVe factored verify** — generate verification sub-questions and answer
   each in an **isolated prompt that does NOT contain the draft** (with the
   draft in context the model re-hallucinates in the same direction).
4. **Attacker / Defender / Judge** — independent agents: the attacker
   *steelmans the opposing answer* then finds contradictory evidence; the
   defender argues with sources; a neutral judge adjudicates. They must not see
   each other's drafts before their first pass.
5. **Intermediate-chain audit** — trace snippet → note → claim; catch errors
   that entered early and survived.
6. **Assign a verdict:** `survived` / `corrected` / `killed` / `flagged-uncertain`.
   A `corrected` verdict is allowed ONLY when gated on signal (1)–(3) above —
   never on a free-form "I think this is wrong." Details:
   `references/adversarial-pass.md`.

### Stage 6 — Final re-synthesis (engine). Low freedom on format.
Rebuild from claims-with-verdicts (killed removed, flagged surfaced as
uncertain, corrected updated). Emit the output format below and run the
LLM-judge once more as the exit gate.

## Output format

```
# <Research question>

## Answer
<Lead with the conclusion. Inline [n] citations.>

## Key findings
- <claim> [n] — confidence: high | medium | low

## Evidence ledger
| # | Claim | Source (URL) | Source type | Adversarial verdict | Confidence |
|---|-------|--------------|-------------|---------------------|------------|

## Calibrated confidence
<Per major claim: confidence + WHY — grounded in evidence count + source tier +
self-consistency vote + adversarial outcome. Never a vibe.>

## Open questions & gaps
- <unresolved sub-question> — why: not findable / sources conflict / cap fired
- <where sources actively conflict — state it explicitly>

## Method note
<tier, agents spawned, rounds run, stop reason (saturated / critic-pass /
cap-fired), source count by tier>
```

Rules: citations are structural fields, not parsed text; every claim carries an
adversarial verdict; confidence is grounded, not asserted; **gaps and conflicts
are surfaced, never hidden**; the method note makes the run auditable and
exposes a cap-fired stop honestly.

## Tiers (set at the gate)

| Tier | Workers | Calls/worker | Round cap | SC votes (N) | Use for |
|------|---------|--------------|-----------|--------------|---------|
| lite | 1–2 | 5–8 | 3 | 3 | a focused comparison, may skip the ask |
| standard | 4 | 8–12 | 6 | 5 | most real research |
| max | 6+ | 10–15 | 10 | 7 | high-stakes / broad / contested |

Concurrency cap: 3–5 workers running at once (the engine handles queuing).
Each worker batches 3+ parallel tool calls. Per-worker step budget + an
idle-guard ("no new info in 3 calls → halt and return").

## Reference files (one level deep; load on demand)
- `references/search-strategy.md` — two-pass protocol, source-type mandates,
  source-quality heuristics, citation pre-embedding, URL-health buckets.
- `references/stop-conditions.md` — full saturation mechanics + the guards.
- `references/adversarial-pass.md` — the low-freedom red/blue checklist in full.
- `references/output-template.md` — the report template + an example.
- `references/fallback.md` — the no-Workflow sequential path.
- `scripts/ultra_research_engine.js` — the deterministic Workflow engine.

## Calibrate-these defaults
K=3 · N=2 novel · novelty cosine ≈0.85 · SC N per tier · round caps per tier ·
coverage targets. All are practitioner heuristics — tune per domain; the engine
reads them from `args`/config, not hard-coded magic numbers.
