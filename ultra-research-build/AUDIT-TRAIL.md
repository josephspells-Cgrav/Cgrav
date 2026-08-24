# Ultra Research — Build Audit Trail

Method: research-grounded draft → red-team + blue-team + craft + fit audit each round →
synthesize findings → next draft. Stop when a round surfaces nothing material (min 3 rounds,
hard cap 6). Artifacts: `GROUNDING.md` (evidence), `vN-SKILL.md` + `vN-workflow.js` (the draft).

---

## v1 — authored 2026-06-04 (grounded in the 6-agent research swarm)

**Design decisions made (and why):**
- Built ON the Workflow tool (deterministic loop/stop/red-blue) rather than model-driven
  orchestration — MAST's #1/#2 failure modes (step repetition, not recognizing completion) are
  fixed by deterministic control flow, not better prompts.
- Adversarial correction is **externally gated** (the load-bearing finding: free-run self-critique
  hurts). Judge may only `kill`/`correct` on a concrete signal (fabricated URL, lost SC vote, CoVe
  mismatch).
- Source-type **lenses** give structural diversity (echo-chamber mitigation).
- Novelty/dedup done by an **LLM novelty judge** (no embeddings available inside a Workflow script);
  exact URL+claim hash handles O(1) dupes. Cosine-0.85 noted as the ideal in references.
- Cost gate + tiers (lite/standard/max) up front; auto-invocation kept ON but gated by a
  confirmation before spawning standard/max.
- Reference files + helper scripts deferred until the core (SKILL.md + engine) stabilizes — they're
  stable distillations of GROUNDING.md, low design-risk.

**Author's KNOWN-OPEN questions (audit should go PAST these, not just re-find them):**
1. LLM novelty judge gets the full seen-set each round → O(n²) token growth as `seen` grows; at
   `max` tier over 10 rounds this could blow context/cost. Needs a bound (windowing? clustering?).
2. The completeness critic re-reads all claims every round — same quadratic growth.
3. `loadBearing` is set by the same draft synthesizer that wrote the claims — a fox-guarding-henhouse
   risk; should an independent pass pick load-bearing claims?
4. Self-consistency uses N agents with prompt-index variation (no temperature control in the
   Workflow API) — is index-variation enough for true independence?
5. The engine never writes findings to disk mid-run; if it dies at round 8 the work is lost.
   Workflow resume exists, but the seen-set isn't persisted. Checkpoint?
6. Cost: no `budget` wiring yet. The tool exposes `budget.remaining()`; the engine should scale/stop
   on it. Currently only round caps bound cost.
7. URL-health + CoVe run per load-bearing claim → if the draft has 15 load-bearing claims, that's
   15×(N votes + url + cove + red + blue + judge) agents. Could be the dominant cost. Cap it?
8. Auto-invocation vs. disable-model-invocation: is a confirmation gate enough, or should an
   expensive skill be explicit-invoke only by default?
9. SKILL.md references files that don't exist yet (forward references) — fine for a draft, but the
   shipped skill must include them or trim the pointers.
10. No eval scenarios written yet (skill-creator says: 3 before finalizing). When do we add them?

## Round 1 — 2026-06-04 · verdict: PROCEED (1 critical · 7 high · ~12 med · 5 low · 1 nit; NOT dry)

Audit: 4 independent panels (red/blue/craft/fit) + synth. Full output: run `w6xfwv53a`.
Theme: a credibility gap between what SKILL.md marketed and what the engine ENFORCED — the two
load-bearing decisions (diversity stop-gate, kill/flag verdict) were LLM prose; judges gated
nothing; killed claims vanished; a single null crashed the run; cost was unenforced + 3–7× understated.

**CRITICAL fixed:** description 1048 → 836 chars (verified via folded-length count) — was a hard install-fail.

**7 HIGH → all fixed in v2:**
- H1 verdict floor now computed in CODE (`verdictFloor()`); judge may only ESCALATE; `corrected` requires `externalSignal`.
- H2 diversity gate now from deterministic lens rotation (`lensesExercised`), not worker self-report.
- H3 `safeAgent()` try/catch + 1 retry on every call; null-guards on the novelty/critic chokepoints; null critic preserves prior gaps.
- H4 judges now load-bearing: failed draft-judge → one extra targeted gather round; failed exit-judge → provisional stamp + `passed` flag.
- H5 cost: tier band in SKILL (5-10 / 15-25 / 40-80×); K-claim cap; URL-health short-circuit; concurrency wording corrected.
- H6 cost gate enforced in CODE (engine refuses standard/max without `userConfirmedTier`); `disable-model-invocation` documented as the explicit-only switch.
- H7 bounded re-source of killed load-bearing claims (1 attempt) implemented; SKILL contract now honest.

**MED applied:** independent load-bearing selector (union, blind to author flags) · perfection-bias now uses coverage-delta + criticOk · corpus separated from novelty filter (evidence never dropped) · MCP tool names → `mcp__firecrawl-mcp__*` + `Workflow` added to allowed-tools · SC distinct stances + evidence-aware + snippet-faithfulness check · CoVe split into 2 isolated calls · contract validation (derive checklist from subQs; refuse empty) · explicit models (opus leads / sonnet workers) · vault capture (engine returns `vaultSummary`; SKILL makes writing it a directive) · claim-text truncation in fused call · `balanced` mode documented.

**LOW applied:** ToC · lite tier made genuinely lighter (skips CoVe/debate) · nit `lensSet` cleaned.
**LOW deferred to PACKAGING** (after the core converges — they're stable distillations only meaningful once the engine is locked): create `references/*.md` + write 3 eval scenarios. The critical fallback anti-patterns were INLINED into SKILL now so nothing load-bearing waits on a file.

**2 auditor fixes ADAPTED (intent kept, impl rejected as environment-incompatible — auditing the audit):**
- "Checkpoint to `state.json`" → a Workflow script has NO filesystem; used harness-native resume (`resumeFromRunId`) instead. Same goal (no lost runs), correct mechanism.
- "Manually cap `parallel()` to 3–5" → the harness already caps simultaneity (~min(16, cores-2)) and queues the rest; manual chunking fights its queue. Capped TOTAL work (cost) via tier-K + short-circuits + lite depth; fixed the false "engine handles queuing" wording.

**KEEP-LIST (protect in v3):** orchestrator/worker split · external-signal-gated-correction RULE · source-type lenses · structural citations · two-tier dedup (do NOT add embeddings / vector DB / 2nd judge panel) · front-loaded stop+anti-patterns · honest cap-fired surfacing · `additionalProperties:false` schemas · Byzantine `filter(Boolean)` · "calibrate, don't worship" framing · real differentiation from `deep-research` at standard/max (lite was the thin band → now routed/lightened).

---

## Round 2 — 2026-06-04 · verdict: PROCEED to v3 (0 critical · 6 high [5 regressions] · 3 med · 4 low · 1 nit; NOT dry). Run `w6pqxgwo2`.

All round-1 fixes CONFIRMED landed; KEEP-LIST intact. v2's NEW machinery introduced the regressions —
the value of iterating: each draft's added complexity is the next draft's attack surface.

**6 HIGH → fixed in v3:**
- HV1 (regression): final synthesis read a STALE frozen corpus snapshot (missed gap-fill + re-sourced evidence). → v3 builds `freshCorpus` at finalize; re-source updates the verdict's source_url.
- HV2 (regression): `passed:true` didn't require verification ran (empty draft → 0 claims → "gated-pass / Verified 0"). → v3 `passed` requires cleanStop AND verificationRan; both judges FAIL CLOSED on infra error.
- HV3 (regression/claimed-but-broken): snippet-faithfulness fed the URL, not the snippet (draft claims carry none). → v3 builds `snippetByUrl` from corpus, passes the real snippet; none → neutral, not silently-true.
- HV4 (regression): cost gate bypassable by mis-cased/typo'd tier ('STANDARD' fell through `||TIERS.standard`). → v3 normalizes+validates tier once; unknown → refused.
- HV5 (regression): failed CoVe only killed if a red counterUrl ALSO existed. → v3 `verdictFloor` makes CoVe-false a STANDALONE kill/flag signal.
- HV6 (regression): re-source updated the verdict but not the loadBearing claim TEXT (survived verdict shown with stale wrong text). → v3 updates loadBearing text+source on a surviving replacement.

**3 MED → fixed:** MV1 dead diminishing-returns branch merged + saturation now stops WITH open gaps (`saturated-with-gaps` → provisional, no cap-burn); MV2 saturation driven by enumerable `novelIndices.length`, not a self-reported count; MV3 expensive opus synthesis calls now get a compressed/bounded corpus view (cap 120, 200-char snippets).

**LOW → fixed:** budget floor before adversarial + re-source (+ `budget.total` in `hasBudget`); dropped dead `contractPath` from SKILL; absolute vault path + obsidian MCP tool in allowed-tools; lite K=2 documented; references/evals marked "created at packaging" not "bundled"; deferred-claims wording fixed; priority-ordered K-cap (both-flagged first). **NIT:** dead `short()` helper removed.

**MACHINE CHECK (new discipline this round):** an `AsyncFunction` syntax-check caught a REAL paren bug — the self-consistency `votes` block closed 3 parens where it needed 4 (`parallel(Array.from(…safeAgent(…))))`), which would have crashed the engine on first run. Fixed; engine now parses clean. → Folding "engine parses + runs on a trivial query" into the eval gate.

**Still deferred to PACKAGING (hard ship-gate):** create `references/*.md` + write & run the 3 evals (contested-claim · fabricated-URL · trivial-query gate) on Sonnet+Haiku; move the engine to `scripts/ultra_research_engine.js`.

## Round 3 — 2026-06-04 · verdict: PROCEED to v4 (0 critical · 2 high [both regressions] · 4 med · 5 low · 2 nit; NOT dry). Run `wz8p3qn70`.

Convergence: highs **7 → 6 → 2**. All v3 fixes CONFIRMED landed; KEEP-LIST intact. Both highs were holes in v3's OWN new machinery (the recurring "new safety code is next round's attack surface" pattern).

**2 HIGH → fixed in v4:**
- HR1 (UNANIMOUS — all 4 auditors): `verificationRan` fail-OPEN — `passed:true` could fire with ZERO adversarial checks when no load-bearing claim was selected (incl. via the independent-selector infra fallback). → v4: `verificationRan = verdicts.length > 0` (fail-closed); `method.verified` + vaultSummary now count actual verdicts.
- HR2 (regression): gap-fill added evidence but never re-ran the completeness critic → a GOOD run (gaps actually filled) stayed stamped PROVISIONAL with a stale gap list. → v4: re-run the completeness critic after gap-fill; PROMOTE `saturated-with-gaps`→`saturated` only when gaps genuinely closed (never relax).

**4 MED → fixed:** MR1 snippet first-write-wins (one URL backs many claims) → v4 collects ALL snippets per URL, faith asks "do ANY support"; MR2 compress cap dropped late-set re-sourced/gap-fill evidence → v4 prioritizes load-bearing-cited records before the slice; MR3 CoVe kill-amplifier (RED always returns a counterUrl → over-kill) → v4 RED returns explicit `contradicts`, floor uses it; MR4 survived→corrected on asserted prose → v4 requires floor ≥ flagged before accepting 'corrected'.

**5 LOW → fixed:** novelIndices clamp+dedup · `covered-at-cap` stopReason (+ in cleanStop) · cost anchors replace 'Xk' · `mode` now WIRED into the worker prompt · budget-floor banner surfaces the real stopReason. **2 NIT:** meta.description CoVe "flag/kill" wording · SKILL CoVe-step parity.

**MACHINE CHECK:** v4 engine passes the AsyncFunction syntax check (clean first try this round). Description 836 < 1024.

**Round-3 hard requirement (re-audit new guards' fail-direction)** → round 4 must verify: HR1 fails toward provisional on every empty-loadBearing path; HR2 recompute can only PROMOTE, never silently close a real gap.

**Still deferred to PACKAGING:** `references/*.md` + 3 evals + move engine to `scripts/ultra_research_engine.js`.

## Round 4 — 2026-06-04 · verdict: PROCEED to v5 (0 critical · 3 high [all regressions] · 2 med · 2 low · 2 nit; NOT dry). Run `w9xf5zv7g`.

Convergence: highs **7 → 6 → 2 → 3** (the uptick = all 3 were holes in v3's round-3 fixes — classic "new guard becomes next round's bug"). All v4 confirmed-correct fixes held; KEEP-LIST intact. **Synth meta-note: vote-counting would have HIDDEN the worst one** (blue-team wrongly cleared MR4/line-318) — the synth overrode it by verifying on the code. v5 was a TIGHT pass, NO new mechanisms (per the synth's directive, to stop the regression cycle).

**3 HIGH → fixed in v5:**
- HV1 (regression — my MR4 over-reach): the floor-rank clause discarded LEGITIMATE signal-backed corrections — a judge finding a primary source proving a different value got reverted to 'survived' (ships a wrong figure = polished false confidence). → v5 drops the floor-rank half; `corrected` requires `externalSignal`+`correctedText` (the real guard) but is NOT gated on the deterministic floor (those signals don't check factual accuracy).
- HV2 (regression — HR1's sibling hole): a KILLED verdict is still a verdict, so an all-killed foundation passed `verificationRan = verdicts.length>0`. → v5 computes `survivedLB`/`killedLB`; `verificationRan = survivedLB.length>0`; `passed` also requires `killedLB.length===0`; the banner enumerates killed IDs.
- HV3 (regression — my covered-at-cap): the `stopReason='saturated'` initializer made a cap-while-productive run look like a clean saturation. → v5 uses a `stopped` flag (set only by real breaks), relabels stopReason only on true cap exhaustion, and EXCLUDES covered-at-cap from cleanStop (→ provisional). **[Adapted the auditor's `saturatedConfirmed` to a `stopped` flag — theirs would mislabel a saturation that fires on the LAST round; mine doesn't. Auditing the audit again.]**

**2 MED → fixed:** MV1 `method.verified`/vaultSummary counted killed+flagged as "verified" → v5 counts `survivedLB` only + surfaces `killedUnrecovered` (durable vault memory now honest); MV2 budget-trim dropped claims 3..K into a void (neither verified nor deferred) → v5 appends them to `deferred` (labeled asserted/unverified).
**2 LOW:** snippet-faith prompt tightened ("DIRECTLY and specifically support … AS STATED"); **(gap-fill source-quality-only enhancement SKIPPED** — synth said not a blocker + judge2 catches it at the exit gate; avoiding new behavior per the tight-pass directive). **2 NIT:** `draftGatePassed` → `initialDraftGatePassed`; CoVe wording already aligned in v4.

**MACHINE CHECK:** v5 passes the AsyncFunction syntax check. **KEEP-LIST + held fixes confirmed not regressed** (HR1 empty→provisional, HR2 promote-only, MR1 snippetsByUrl, MR2 prioritizedCorpus, MR3 red.contradicts, LR1 novelCount clamp).

**Still deferred to PACKAGING:** `references/*.md` + 3 evals + move engine to `scripts/ultra_research_engine.js`.

## Round 5 — 2026-06-04 · verdict: PROCEED to v6 (0 critical · 2 high [both regressions, both one-line] · 1 med · 3 low · 3 nit; NOT dry). Run `wiqb29xwi`. Synth: "packageable after v6 lands the 2 highs."

Convergence: highs **7 → 6 → 2 → 3 → 2** (now firmly in one-line-fix territory). All v5 confirmed-correct fixes held; KEEP-LIST intact 5 rounds running.

**2 HIGH → fixed in v6:**
- HV1-r5 (regression from my v5 HV2): `survivedLB = verdicts.filter(!== 'killed')` folded **flagged-uncertain** into "verified" → an all-flagged run could `pass` and write "gated-pass" to the vault (cardinal anti-pattern). → v6: `confirmedLB = survived|corrected` only; `verificationRan = confirmedLB>0`; counts use confirmedLB; `flaggedLB` surfaced separately.
- HV2-r5 (regression-by-omission): the gap-fill block had NO budget guard (the re-source block did) → could overspend past the budget floor. → v6: added `&& !(hasBudget && remaining<FLOOR)` to the gap-fill condition.

**MED → fixed:** the corrected-gate only checked non-empty strings → a judge could fabricate a signal+text and overwrite a true 'survived' value. → v6: `corrected` now requires a machine-observed artifact (`red.counterUrl` OR the `resourced` path); uncorroborated → demoted to **flagged-uncertain** (surfaces the disagreement), not silent survived.

**LOW/NIT applied:** vault summary now breaks out confirmed/uncertain/killed; meta.description "SURVIVED"→"confirmed". **DEFERRED to PACKAGING:** SKILL stop-conditions add covered-at-cap+budget-floor; Stage-6 "confirmed" wording; method-note template; cost "(rough estimates)"; re-source label cosmetic.

**DECLINED (audit-the-audit):** the RANK-reorder nit (`{corrected:1, flagged-uncertain:2}`) — it would BREAK escalate-only for *correcting a flagged-uncertain claim* (corrected would no longer outrank flagged). Current RANK kept; reasoning logged.

**MACHINE CHECK:** v6 passes AsyncFunction syntax; 0 stale `survivedLB` refs.

## Round 6 — 2026-06-04 · verdict: DRY → PACKAGE (0 critical · 0 high · `readyToPackage:true`). Run `w3fpzdmst`.

**Convergence achieved: highs 7 → 6 → 2 → 3 → 2 → 0.** KEEP-LIST intact all 6 rounds. The lone dissenting "high" (on the corrected-gate) was REJECTED by the synth via code-tracing — adopting it would have re-opened the MED-r5 vulnerability. Not vote-counted; verified.

**Packaging applied (the round-6 low/nits):**
- Engine: wired the dead `resourced` branch (`verifyClaim(rc, {resourced:true})` + flag param); SC wording `≥0.6`; header → v1.0.
- SKILL: description now accurate (saturation stops + provisional gaps, not "completeness critic passes"); full provisional-stop list (covered-at-cap · budget-floor · cap-fired · saturated-with-gaps); `{refused:true}` handling step; method-note template fields.
- DECLINED the RANK-reorder nit (would break *correcting a flagged-uncertain claim* under escalate-only). Reasoning logged.

**FINAL — installed at `~/.claude/skills/ultra-research/`:**
- `SKILL.md` (253 lines · description 878 < 1024)
- `scripts/ultra_research_engine.js` (28.8 KB · AsyncFunction syntax OK)
- `references/`: search-strategy · stop-conditions · adversarial-pass · output-template · fallback
- `evals/`: evals.json (3 scenarios, valid) + README (build-gate + provenance)
- All 7 SKILL reference pointers resolve (dangling-reference issue closed).

**Verification status (honest):** research-grounded · 6 independent red/blue/craft/fit rounds to dry · engine machine-syntax-checked · structure/JSON/refs validated · keep-list intact ×6. **NOT yet executed end-to-end** (a real run spawns the live swarm) — the one remaining gate is a lite-tier smoke test + Joseph's eyeball.

---

## Round 7 — 2026-07-01 · v1.2 → v1.3 · verdict: HARDENED (fault-injection lens · 1 new HIGH + 5 carried findings shipped; engine syntax OK; docs+evals in parity)

Re-audit requested by Joseph (OS12). The prior 6 rounds audited the **reasoning path** (verdict logic, stop mechanics, cost gates) to dry. This pass ran a **failure-path / fault-injection lens** — what happens when a TOOL CALL itself breaks — motivated by a real firecrawl-credit outage hit in the same session. That lens surfaced gaps the reasoning-path audits structurally couldn't.

**1 NEW HIGH (the anchor):**
- **Tool-outage masquerades as clean saturation.** When all gather workers fail (firecrawl down), a round yields zero findings → `dryRounds++`; two such rounds trip `saturated` → a clean `passed` on an answer built from nothing. The `strategy-exhaustion ≠ topic-exhaustion` guard (round 1) protected against a spent *search strategy* but NOT a dead *tool*. → v1.3 tracks `dryStreakEmpty`; a dry streak containing an empty-gather round stops as **`saturated-degraded` ∉ cleanStop → provisional**. (The total-outage case was already safe — no claims → fail-closed exit gate — but the *partial-early-outage* case, enough round-1 claims then the tool dies, could pass clean. Now closed.)

**5 findings carried from the prior-turn audit, all shipped in v1.3:**
- **Tier default `'standard'`→`'lite'`** — the engine default contradicted SKILL ("auto-invocation defaults to lite"); a `userConfirmedTier:true` with `tier` omitted silently ran standard (~3-5× overspend). Now safe-by-default.
- **URL-health + independent-selector failures were silent** — both degraded to their weakest state (`{status:'stale'}` / `{ids:[]}`, the latter reopening the round-1 fox-guards-henhouse) with nothing in `passed`/`method`. → counted (`degradedUrl`, `indepDegraded`); an all-URL-degraded phase or a failed blind selector → `executionHealthy=false` → **provisional**; all degradation surfaced in `method.degraded`.
- **Counter-evidence lens not guaranteed before a clean stop** — diversity required any 3-of-6 lenses; the dedicated disconfirming worker (index 4) could never fire yet still pass, on a skill whose headline use is contested questions. → reordered to index 2 (fires by round 1 std/max, round 2 lite) + folded into `diversityOk`.
- **No prompt-injection defense** on prompts that ingest fetched web content (the engine reads arbitrary contested-topic pages by design). → `UNTRUSTED` clause on workers + URL-health + faithfulness + CoVe-answer + red-team.
- **No current-date anchor** (a documented stale-year failure mode; the built-in WebSearch tool warns about it) — and the Workflow sandbox can't call `Date()`. → orchestrator threads `currentDate` via `args` → `DATELINE` on the search prompts.

**Design discipline held:** every guard is **INERT on the happy path** — a healthy run computes identical results to v1.2; the guards only activate when a tool/agent actually degrades. No new cognition, no embeddings, no 2nd judge panel — KEEP-LIST intact ×7. 

**REJECTED (audit-the-audit):** (a) making `snippet` a required schema field — would incentivize models to *fabricate* a snippet to satisfy the schema (worse than the current no-snippet → not-stage1Strong → deep-scrutiny path); kept optional. (b) shrinking the 150-item novelty window — it's a DELIBERATE round-1 tradeoff (O(n²) token growth); exact-hash dedup catches exact dupes regardless of window, so only paraphrase-dupes past 150 slip, and every surviving claim still runs the full gauntlet. Left as-is.

**MACHINE CHECK:** v1.3 passes the AsyncFunction syntax check; evals.json valid (4 scenarios — added `tool-degradation-provisional`); meta.description 657 < 1024; all reference docs + SKILL updated to parity (stop-conditions table, adversarial-pass URL-degraded, search-strategy untrusted+date, SKILL stop list + Frame `currentDate` + anti-patterns).

**Still NOT executed end-to-end** (same honest gate as v6): a real run spawns the live swarm (~millions of tokens). The v1.3 guards are code-verified + syntax-checked + doc-consistent; the remaining gate is a lite-tier smoke test + Joseph's eyeball. **The degradation guards are, by nature, easiest to prove with a fault-injection harness** (force the tool null) rather than a live run — noted in eval #4.






