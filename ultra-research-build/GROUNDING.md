# Ultra Research — Research Grounding

Provenance: 6 parallel research agents + 1 synthesizer, 73 sources, 2026-06-03 (workflow run `wf_7cbaadf6-c34`). Two reliability bands — build on HIGH; ship MEDIUM as tunable defaults, never as validated constants.

## The one load-bearing contradiction (read first)
Free-running self-critique ("review your answer and fix it") **degrades** accuracy — GPT-4 95.5%→89.0% on GSM8K after 2 rounds; CommonSenseQA 75.8%→38.1%. Mechanism = sycophancy (the model conforms to the implied "you were wrong"). [Huang ICLR 2024]
→ Every correction in the adversarial stage MUST be gated on a CONCRETE EXTERNAL SIGNAL (failed URL-health, schema violation, lost self-consistency vote, failed CoVe sub-question). Never "fix it because the model doubts it."

## HIGH-confidence, load-bearing

### Architecture
- Orchestrator–worker: capable lead frames + synthesizes; lighter workers fan out in parallel, each own context. +90.2% vs single-agent. [Anthropic]
- Two-tier models: Opus-class lead, Sonnet-class workers.
- Game-of-telephone: workers write full findings to an artifact store, return lightweight refs. Token duplication wastes 53–86% (MetaGPT 72%, CAMEL 86%). [Anthropic, Galileo]
- Schema-validate every handoff; fail-fast + retry-on-error-injection. Parsing/schema failures = largest prod failure class (~38%). [IBM]
- Byzantine tolerance: continue if 1-of-N workers returns garbage; errors compound non-linearly.

### Gather
- Two-pass search: broad map → narrow gap-fill. Agents default to over-specific queries that return nothing. [Anthropic]
- Two-level parallelism: 3–5 concurrent workers, each issuing 3+ parallel tool calls (~90% latency win).
- Structured 4-field brief per worker: objective / output schema / tools+sources to prefer & avoid / boundaries.
- Echo chamber is STRUCTURAL: enforce source-type diversity at delegation (academic / official / practitioner / counter-evidence). Same-weight agents converge on the same sources + SEO farms.
- Citations are STRUCTURAL fields pre-embedded on each claim, never retrofit (retrofit → misattribution). Record shape: `{claim, source_url, source_type, snippet, confidence}`.
- Source-quality bias (SEO over primary) is missed by automated evals → source-type preference in brief + judge rubric.

### Stop / saturation
- Saturation is a CONTINUOUS novelty-decay curve, not a binary flag.
- Stop = K consecutive rounds with < N novel claims AND completeness-critic.missing is empty AND ≥3 distinct strategies tried.
- Two-tier dedup: URL/exact hash (O(1)) + claim-level semantic novelty.
- Strategy-exhaustion guard (most insidious failure): stopping because the SEARCH STRATEGY is spent, not the topic. Recent queries cluster tightly → rotate query type, don't stop.
- Hard round cap = safety net ONLY; when it fires, ENUMERATE GAPS (no silent confidence) + log a warning.
- Perfection-bias cutoff: marginal quality-delta < ~2% → stop.
- MAST: 41–86.7% of multi-agent runs fail; top-2 = step repetition (15.7%) + not recognizing completion (12.4%) — both fixed by explicit orchestrator stop logic, not model upgrades.

### Adversarial (what actually works, ordered by evidence strength)
1. Self-consistency: majority vote over N=5–10 independent paths. Highest-evidence, simplest win (+17.9pp GSM8K); improves calibration. "Majority-vote-to-kill": no supermajority → low-confidence / drop. [Wang ICLR 2023]
2. CoVe factored independence: verification sub-questions answered in a SEPARATE prompt WITHOUT the draft in context (else it re-hallucinates same direction). [Dhuliawala]
3. Reflexion: works because the signal is EXTERNAL (execute → structured failure → reflect → regen). [Shinn]
4. Multi-agent debate: real signal ONLY with asymmetric roles + independent drafts + steelman-before-rebut. Failure = consensus-without-truth (61.7% of debates both sides claimed >75% win). [Du ICML 2024]
5. Constitutional / critique anchored to an explicit checklist.
- Over-spawning is the default failure (50 agents for a trivial query) → complexity tier sets agent count in the PROMPT.
- Intermediate hallucination propagation: red-team must audit snippet→note→claim, not just the final report.
- LLM-as-judge, 5-dim rubric (factual accuracy, citation accuracy, completeness, source quality, tool efficiency); single judge > panel for consistency. Gate hard on source quality.

### Skill-craft (official docs)
- Frontmatter: `name` (≤64, lowercase-hyphen-digit, no "claude"/"anthropic"), `description` (≤1024, third-person, what + when, pushy vs under-trigger). description+when_to_use truncated at 1536 in the listing.
- Progressive disclosure: metadata always (~100 tok) / SKILL.md body on trigger (<5k tok, ≤500 lines) / reference files on demand. Auto-compaction re-attaches ≤5k tok/skill (25k combined) → FRONT-LOAD stop-conditions + anti-patterns.
- File refs exactly ONE level deep (nested → `head -100` preview). ToC on files >100 lines.
- MCP tools fully-qualified `Server:tool`.
- Claude Code extensions: `effort: high` (ultrathink without keyword), `context: fork` + `agent` (Explore/Plan/general-purpose), `disable-model-invocation: true` (explicit-only for side-effectful), `allowed-tools`, `when_to_use`.
- `context: fork` only when the skill carries an explicit TASK (fork with guidelines-but-no-task returns nothing).
- Eval-first: 3 test scenarios before finalizing; test Haiku/Sonnet/Opus.

## MEDIUM / post-cutoff → ship as TUNABLE DEFAULTS w/ "calibrate" note (NOT validated constants)
- K=3 dry rounds · novelty cosine ≈0.85 · coverage ≥95% / critical ≥85% / ≥80% Tier-1-2 (EDR) · BEACON c=0.1, k0=3 · round caps (2 simple QA / 10–15 deep) · CTAR <21% spin signal · citation error rates (Gemini 13.3% / OpenAI 3.5% / Perplexity 37%).
- Product internals (OpenAI/Gemini/Perplexity) + 2026-dated arXiv (BEACON, EDR, DR-Arena, Search-as-Code): patterns only.

## Key high-confidence sources
- anthropic.com/engineering/multi-agent-research-system
- Huang 2024 (2310.01798) · Wang 2023 (2203.11171) · Du 2024 (2305.14325) · Shinn (2303.11366) · Dhuliawala CoVe (2309.11495) · MAST (2503.13657)
- platform.claude.com/docs agent-skills/best-practices · code.claude.com/docs/skills
