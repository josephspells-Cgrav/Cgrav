# Vault-as-Agent-Memory: 2026 RAG & Memory Upgrade Briefing

**Prepared for:** Joseph · **Date:** 2026-06-02 · **Subject vault:** `C:/Users/josep/Claude Gravity/vault`

> **Ground-truth note (read this first).** Before writing this, I inspected the live vault. Several inputs to this research assumed an ~80-note vault; **the real vault is 164 markdown files with 1,399 `[[wikilink]]` instances.** That single fact moves a few recommendations from "defer" to "do it." Two more on-disk findings overturn the loudest objections in the research and are flagged inline where they bite.

---

## 1. Executive Summary — are we leaving capability on the table?

**Yes, in three specific places. No, almost everywhere else.** Your architecture is correct and the 2026 literature validates it — independent practitioners keep re-deriving your exact Karpathy hub-and-spoke + episodic-agent design ([Three-Layer Memory, Mar 2026](https://pub.towardsai.net/i-gave-my-ai-agent-a-three-layer-memory-obsidian-heres-how-it-thinks-now-0aaa0fdbdbbd); [AriGraph, IJCAI 2025](https://www.ijcai.org/proceedings/2025/0002.pdf)). The whole GraphRAG industry builds a synthetic graph *from* unstructured text — you already *have* the graph, hand-curated. Running GraphRAG on your vault rebuilds a noisier copy of what you maintain on purpose. So the honest answer is **not "you're behind"** — it's "there are three precise, cheap upgrades, and a lot of expensive hype to keep ignoring."

The 3-5 highest-ROI moves, plainest English:

1. **Wire up a graph-traversal MCP so agents can actually *walk* your 1,399 links.** Right now agents grep and read-by-path; they cannot ask *"what notes are 2 hops from `hub-king-maker`?"* or *"shortest path from `hub-roofing-business` to `km-seo-doctrine`?"* despite the graph sitting right there. **[graphthulhu](https://github.com/skridlevsky/graphthulhu)** (Go binary, no Python, no vector DB) exposes exactly that. This is your single best fit-to-cost move. **Pilot.**

2. **Add a local semantic-search layer — and at 164 notes you've crossed the threshold where this stops being premature.** Your pure-keyword retrieval misses synonyms: a query for *"palette"* won't surface a note that says *"color tokens"* (and you have both — `km-palette-discipline` vs. the globals.css token vocabulary). Multiple verdicts said "wait until 300+ notes." You're at 164 and climbing ~10/week from session auto-capture. The clean local option is **[basic-memory](https://github.com/basicmachines-co/basic-memory)** or **[obsidian-hybrid-search](https://github.com/flowing-abyss/obsidian-hybrid-search)** (both FTS5 + local vectors + RRF over your `.md` files). **Pilot one.**

3. **Confirm mcpvault is actually loaded — I could not find it wired in.** Your vault `CLAUDE.md` lists `mcp__obsidian-vault__*` as retrieval preference #1 *"(when loaded via @bitbonsai/mcpvault)."* I grepped every `.claude` config and found **zero `mcpServers` entries for it.** If that's accurate, your agents are running on grep + read-by-path *only*, and the link-aware BM25 layer you think you have isn't live. **Verify before building anything else** — this may be a 5-minute fix that closes half the gap.

4. **Formalize the capture loop with two hooks.** Mode D capture is manual today. The 2026 best practice adds a **PreCompact** hook (snapshot vault-relevant decisions *before* `/compact` eats them) and a **PostToolUse** hook (auto-drop substantial outputs to `inbox/`). Zero infra, pure `settings.json`. ([Karpathy pattern in production, Apr 2026](https://aaronfulkerson.com/2026/04/12/karpathys-pattern-for-an-llm-wiki-in-production/)) **Adopt.**

5. **Trim the boot tax.** Good news: `CLAUDE.md` (100 lines) and `index.md` (45) are well under your 200-line rule. The real bloat is **`sessions-recent.md` at 421 lines** — auto-captured metadata that no agent needs wholesale at boot. Make sure it isn't being read in full on every session. **15-minute audit.**

**One myth to kill outright:** the biggest hidden-cost objection across the adversarial reviews — *"SQLite-WAL / `.smart-env` / chokidar will corrupt on OneDrive"* — **does not apply to you.** Your vault lives at `C:/Users/josep/Claude Gravity/vault`; OneDrive's root is `C:/Users/josep/OneDrive`. **The vault is not OneDrive-synced.** That removes the single scariest tradeoff from every semantic-search candidate below.

---

## 2. The Landscape — RAG / GraphRAG / Agentic Memory in 2026

**Retrieval techniques (the settled consensus).**
- **Chunking:** recursive character splitting (~400-512 tokens, 10-20% overlap) is the default ([Firecrawl chunking guide](https://www.firecrawl.dev/blog/best-chunking-strategies-rag)). *For you this is mostly moot* — your atomic notes ARE the chunks (hubs/disciplines run 250-620 words). Caveat: a few notes aren't atomic (`km-motion-primitives.md` = 1,805 words), so any indexer you adopt should chunk by markdown heading, not embed whole-file.
- **Hybrid search + RRF:** run BM25 and vector search in parallel, fuse by rank position with Reciprocal Rank Fusion (k=60). The highest-ROI retrieval architecture of 2026, native in every vector DB ([RRF explainer](https://glaforge.dev/posts/2026/02/10/advanced-rag-understanding-reciprocal-rank-fusion-in-hybrid-search/)). BM25 nails `[[link]]` terms and exact concept names; vectors catch paraphrase. Combined beats either.
- **Reranking (cross-encoder, top-100→top-10):** real and powerful — and **premature for you.** Pays off at thousands of noisy candidates; your 164-note top-10 is already precise. Skip.
- **Embeddings, if you ever build a custom index:** [Voyage `voyage-3-lite`](https://pecollective.com/tools/text-embedding-models-compared/) (MTEB 61.4, **32k context** so most notes embed in one call, $0.02/1M, Anthropic-recommended for Claude pipelines) or [Jina v3](https://pecollective.com/tools/text-embedding-models-compared/). But the off-the-shelf tools below bundle local models — you likely never touch this.

**GraphRAG family (the "wrong problem for you" cluster).** [Microsoft GraphRAG](https://github.com/microsoft/graphrag) (33k★), [LightRAG](https://github.com/HKUDS/LightRAG) (30k★, EMNLP 2025), [HippoRAG 2](https://github.com/osu-nlp-group/hipporag) (hippocampal PageRank traversal — conceptually the closest to your episodic use case), [nano-graphrag](https://github.com/gusye1234/nano-graphrag), [LazyGraphRAG](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/) (the ~99.9% cost-drop variant). All share one disqualifier: **they extract entities/relations from raw text via LLM to *synthesize* a graph.** You curate yours by hand with `[[links]]`. The [Graph Praxis "Your Obsidian Vault Is a Knowledge Graph"](https://medium.com/graph-praxis/your-obsidian-vault-is-a-knowledge-graph-heres-how-to-make-it-think-quickly-1487614a7682) piece (Apr 2026) makes the case directly: the missing piece isn't an LLM-extracted graph, it's **traversal tools over the graph you already have.**

**Agentic memory frameworks (parallel-store cluster).** [mem0](https://github.com/mem0ai/mem0) (57k★, auto-extracts facts into its *own* DB), [Graphiti/Zep](https://github.com/getzep/graphiti) (27k★, **temporal** knowledge graph — facts with validity windows; scores 63.8% vs mem0's 49.0% on LongMemEval, [paper](https://arxiv.org/abs/2501.13956)), [Letta](https://github.com/letta-ai/letta-code) (full runtime replacement), [cognee](https://github.com/topoteretes/cognee), [MemOS](https://github.com/MemTensor/MemOS) (targets Hermes/OpenClaw not Claude Code). Common trait: **they own memory in a database; your `.md` files stop being the source of truth.** That inverts your architecture. The one with a genuinely distinct capability is **Graphiti's temporal reasoning** ("what did I decide about X in March?") — parked as a deferred option below.

**Obsidian-native MCP tooling (the part that actually fits).**
- **[@bitbonsai/mcpvault](https://github.com/bitbonsai/mcpvault)** (1.3k★) — your intended baseline: file-based, BM25, frontmatter-aware. *No vector search, no graph BFS.* (And per my check, possibly **not currently loaded** — verify.)
- **[graphthulhu](https://github.com/skridlevsky/graphthulhu)** (~160★, Go binary, Apr 2026) — reads `.md` directly, exposes `traverse` (BFS/N-hop), `find_connections`, `topic_clusters`, orphan detection, hub-degree ranking. Author runs *7 Claude Code agents against one Obsidian vault* — your exact use case.
- **[obsidian-hybrid-search](https://github.com/flowing-abyss/obsidian-hybrid-search)** (62★, 125 releases, v0.13.5 Jun 2 2026) — standalone FTS5 + sqlite-vec + RRF, local e5-small model, no Obsidian app, no Docker.
- **[basic-memory](https://github.com/basicmachines-co/basic-memory)** (3.1k★, v0.21.5 May 2026) — file-native Markdown + `[[wikilinks]]`, hybrid FTS + FastEmbed over SQLite, bidirectional write-back. The "managed" version of the hybrid pattern.
- **[obsidian-mcp-pro](https://github.com/rps321321/obsidian-mcp-pro)** (16★) — 41 tools incl. `get_graph_neighbors`; fuller but less proven than graphthulhu.
- **Semantic-bridge route:** [Smart Connections](https://github.com/brianpetro/obsidian-smart-connections) (5.1k★ plugin, local embeddings) + [smart-connections-mcp](https://github.com/msdanyg/smart-connections-mcp) (46★ bridge). Reuses embeddings Smart Connections already computes — but the bridge is pre-release and the short-note (<200 char) blind spot would swallow your `log.md`/inbox entries.
- **Heavy ceiling:** [Neural Composer](https://forum.obsidian.md/t/neural-composer-local-graph-rag-made-easy-lightrag-integration/109891) wraps LightRAG into Obsidian for genuine synthesis queries — at 36+ hr first-ingest on Windows. This is your *already-deferred* GraphRAG path (see §4).

**Evaluation.** If you ever build a pipeline, [RAGAS](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/) is the harness — and its 2025-2026 *agentic* metrics (Tool Call Accuracy, Agent Goal Accuracy) apply to episodic agents. Not needed until you have a retrieval layer to grade.

---

## 3. Ranked Recommendations for Our Setup

Decisive calls. "Cost" assumes Windows + Claude Code on Max. Remember: **vault is NOT OneDrive-synced**, so sync-corruption costs that dominate the source verdicts are struck through where they were the blocker.

| # | Upgrade | What it does for us | Complexity / cost | Verdict | Source |
|---|---|---|---|---|---|
| 1 | **Verify mcpvault is actually loaded** | Your CLAUDE.md assumes link-aware BM25 is live; I found no `mcpServers` entry. May be running on grep-only today. | ~5 min check; possibly a 1-line config add | **DO FIRST** | [mcpvault](https://github.com/bitbonsai/mcpvault) |
| 2 | **graphthulhu MCP** | Agents finally *walk* the 1,399 links: BFS N-hop, shortest-path between concepts, hub-degree, orphan finder. Fills the one gap mcpvault structurally cannot. | Low. Single Go binary, no Python/vector DB. Real friction: install ≈20-30 min on Windows (download the prebuilt release binary, **don't** `go install`); quote the space in the vault path in the args array. | **PILOT** → adopt read tools; gate write tools | [graphthulhu](https://github.com/skridlevsky/graphthulhu) |
| 3 | **PreCompact + PostToolUse hooks** | Auto-capture: snapshot decisions before `/compact`; push >500-char outputs to `inbox/`. Closes the "manual Mode D" gap. | Trivial. `settings.json` only, zero infra. | **ADOPT** | [Karpathy hooks](https://aaronfulkerson.com/2026/04/12/karpathys-pattern-for-an-llm-wiki-in-production/) |
| 4 | **Local semantic search** (basic-memory *or* obsidian-hybrid-search) | Closes the synonym gap ("palette" ↔ "color tokens"). At 164 notes this is now warranted, not premature. | Medium. Local model download (~90-150 MB), one-time index. ~~OneDrive WAL/corruption hazard~~ **N/A — vault is off OneDrive.** basic-memory: watch [issue #872 memory leak] before committing; pilot when patched. | **PILOT ONE** | [basic-memory](https://github.com/basicmachines-co/basic-memory) · [hybrid-search](https://github.com/flowing-abyss/obsidian-hybrid-search) |
| 5 | **Audit `sessions-recent.md` boot cost** | 421 lines of auto-captured metadata. Ensure it's not read wholesale at every boot (CLAUDE.md/index.md are already lean). | 15 min. | **ADOPT** | [Three-Layer Memory](https://pub.towardsai.net/i-gave-my-ai-agent-a-three-layer-memory-obsidian-heres-how-it-thinks-now-0aaa0fdbdbbd) |
| 6 | **obsidian-mcp-pro** (`get_graph_neighbors`) | Fuller-featured graph traversal + optional semantic — the fallback if graphthulhu feels too bare. | Low (keyword+graph). 16★ = unproven; run read-only alongside mcpvault. | **PILOT (alt to #2)** | [obsidian-mcp-pro](https://github.com/rps321321/obsidian-mcp-pro) |
| 7 | **Heading-aware re-chunk of fat notes** | A handful of notes (e.g. `km-motion-primitives` 1,805w) break the "1 note = 1 chunk" ideal. Split by `##` for cleaner retrieval. | Low, manual. Only matters once #4 is in. | **ADOPT (after #4)** | [chunking guide](https://www.firecrawl.dev/blog/best-chunking-strategies-rag) |
| 8 | **Graphiti MCP (temporal)** | Only tool that answers "what changed in Baker Roofing since last week / what did I decide in March." 15-pt LongMemEval edge. | High: Docker + FalkorDB/Neo4j + LLM extraction. Real infra. | **DEFER** until temporal queries are a *weekly* pain | [Graphiti](https://github.com/getzep/graphiti) |
| 9 | **mem0 / cognee / Letta / MemOS** | Parallel auto-extracted memory store. | High; **inverts** your markdown-source-of-truth model; "lost in the sauce" risk you've burned before. | **SKIP** | [mem0](https://github.com/mem0ai/mem0) |
| 10 | **Microsoft GraphRAG full pipeline** | Re-derives a graph you already maintain, at LLM cost, no MCP. | Very high. | **SKIP (never, this use case)** | [graphrag](https://github.com/microsoft/graphrag) |

**If you do exactly two things:** #1 (verify mcpvault) and #2 (pilot graphthulhu). Together they make agents fully exploit the graph you've already built — the highest fit-to-effort ratio on the board, and neither requires embeddings or a vector DB.

---

## 4. Revisit Our Deferred Patterns (deferred 2026-05-28)

These four were captured in the vault with explicit "defer" verdicts at the then-**92-note** scale. Re-ruling at **164 notes**:

**① GraphRAG / LightRAG (Neural Composer)** — *was: defer until 500+ notes.* → **STILL SKIP, with a nuance.** Your own deferral note ([`graphrag-lightrag-pattern.md`](C:/Users/josep/Claude Gravity/vault/wiki/graphrag-lightrag-pattern.md)) nailed it: the Obsidian→Neural Composer→Python→Ollama→Qwen→nomic-embed chain is a 6-layer fragility stack with 36+ hr first-ingest, and it rebuilds a graph you curate by hand. None of that changed. **BUT** — the note conflated two separate needs under one "defer." LightRAG's *synthesis* ("what connects king-maker doctrine to peak-roofing?") is still genuinely premature. The *semantic-retrieval* half ("find notes by meaning") is **no longer premature at 164 notes** — just get it from the lightweight local tools in §3 #4, **not** from the heavy LightRAG stack. **Split the verdict: skip LightRAG-the-framework; adopt local-semantic-search-the-capability.** Revisit LightRAG proper only when a real synthesis query flatly fails on the lighter stack.

**② `.obsidian/ai-context.json` sync pattern** — *was: defer; SessionStart hook is the equivalent.* → **ADOPT-ADJACENT, NOW RELEVANT.** Your own note set the revisit trigger as *"if you run multiple CLI agents simultaneously on the same vault."* The session log shows you're already there — many parallel worktree agents (the `active-cg-wt-*` / `active-amw-*-wt-*` notes are one-per-concurrent-agent). The trigger has fired. *However*, the json file needs the Obsidian Vault Agent plugin + Obsidian running, which breaks your headless boot. **Better 2026 framing:** you don't need *their* json — you need the **PreCompact/PostToolUse hooks (§3 #3)**, which give push-based capture without a plugin or a running Obsidian. **Adopt the goal via hooks; keep skipping the specific plugin-bound json file.**

**③ Symlinked skill directories (multi-agent)** — *was: defer; Claude-Code-only.* → **STILL SKIP, unchanged.** The trigger is "a *second kind* of CLI agent (Codex/Cursor)." Parallel *Claude Code* agents all read the same `~/.claude/skills/` — no duplication, no drift. Nothing in 2026 changes this until you actually add a non-Claude agent. (Windows caveat from your note still holds: symlinks need admin/dev-mode.) **Skip.**

**④ 3D / WebGL graph-RAG visualizer** — *was: skip ("lost in the sauce").* → **STILL SKIP, emphatically.** This is the InfraNodus / Neural Composer WebGL "relationship weaver" 3D viz surveyed in your GraphRAG note, and it's the same class as the hardware-accelerated sci-fi CSS you **already built and reverted** ("getting lost in the sauce," confirmed in [`obsidian-agentic-cockpit-research-2026-05-28.md`](C:/Users/josep/Claude Gravity/vault/wiki/obsidian-agentic-cockpit-research-2026-05-28.md) line 28). A 3D graph is a *human-eyeball* tool; your agents traverse the graph through **tool calls** (that's what graphthulhu §3 #2 delivers), and they get zero value from a rendered force-graph. Adopting it would repeat a mistake you've already paid for and correctly rejected. **Skip — and the instinct that killed it the first time was right.**

---

## 5. What to Skip / Anti-Hype

The 2026 ecosystem is loud. Named things to *not* adopt, and why:

- **Microsoft GraphRAG / LightRAG / HippoRAG / nano-graphrag as your memory layer.** All build a synthetic graph from text. You have a hand-curated one. This is the single most important anti-pattern in the whole space *for your setup* — every "GraphRAG for Obsidian" tutorial is solving a problem you don't have. ([the correct framing](https://medium.com/graph-praxis/your-obsidian-vault-is-a-knowledge-graph-heres-how-to-make-it-think-quickly-1487614a7682))

- **mem0 / cognee / Letta / MemOS as a vault replacement.** They store memory in *their* DB. The moment your `.md` files stop being source-of-truth, you've inverted the architecture that's working and signed up to keep two stores coherent. mem0 is a fine tool for the *different* job of auto-extracting conversational facts — just not for *this*. ([mem0](https://github.com/mem0ai/mem0))

- **Cross-encoder reranking.** Effective at thousands of noisy candidates; pure overhead at 164 notes where top-10 is already clean. Premature optimization. Revisit past ~1,000 notes.

- **Agentic / Corrective RAG loops (LangGraph Self-RAG, FLARE, CRAG).** Built for query-answering systems that reflect and re-retrieve. Your agents boot-read-act-exit; they need a *fast reliable context load*, not a reflection loop. Wrong pattern for bootstrapping. ([Agentic RAG 2026](https://medium.com/@vinodkrane/next-generation-agentic-rag-with-langgraph-2026-edition-d1c4c068d2b8))

- **Anything requiring Obsidian to be *running* for headless agents.** Rules out the Local-REST-API-based MCPs ([cyanheads](https://github.com/cyanheads/obsidian-mcp-server), [obsidian-mcp-tools](https://github.com/jacksteamdev/obsidian-mcp-tools) — also **archived May 2026**) and the Smart Connections live-refresh path for your boot-act-exit pattern. Prefer direct-`.md` readers (graphthulhu, hybrid-search, basic-memory, mcpvault).

- **Docker + Neo4j/FalkorDB stacks for daily retrieval** (Graphiti, ApeRAG, the graph mode of mem0/cognee). Genuine capability, real infra, solo-operator-on-Windows maintenance tax. The *only* one worth keeping on the radar is Graphiti — and *only* for temporal queries, *only* when they become a weekly pain. Everything else: skip.

- **3D/WebGL graph visualizers.** Covered in §4 — you already reverted this class once. Agents don't read pixels.

- **Heavy embedding APIs you don't need.** Voyage/Jina are excellent, but the local tools in §3 #4 bundle a model. Don't reach for a paid embedding API for 164 notes unless an off-the-shelf local model demonstrably underperforms first.

**The throughline:** your "reject shiny-but-useless complexity" instinct has been *correct* every time the vault recorded it. The three real gaps (graph traversal, local semantic search, automated capture hooks) are all **low-complexity, local-first, no-vendor-lock** additions that deepen the architecture you already chose — not replacements for it. Everything expensive in 2026 is solving a problem your hand-curated `[[wikilink]]` graph already solved.

---

**Files I read to ground this (all absolute):**
- `C:/Users/josep/Claude Gravity/vault/CLAUDE.md` · `index.md` · `log.md` · `sessions-recent.md`
- `C:/Users/josep/Claude Gravity/vault/wiki/hub-memory-architecture.md`
- `C:/Users/josep/Claude Gravity/vault/wiki/graphrag-lightrag-pattern.md`
- `C:/Users/josep/Claude Gravity/vault/wiki/ai-context-sync-pattern.md`
- `C:/Users/josep/Claude Gravity/vault/wiki/symlinked-skill-directory-pattern.md`
- `C:/Users/josep/Claude Gravity/vault/wiki/obsidian-agentic-cockpit-research-2026-05-28.md`

**Three on-disk facts that overturn the research's assumptions — act on these:**
1. **Vault is 164 files / 1,399 wikilinks**, not ~80-92 → semantic search is now warranted, not premature.
2. **Vault is NOT under OneDrive** (`C:/Users/josep/Claude Gravity/vault` vs OneDrive root `C:/Users/josep/OneDrive`) → the WAL/chokidar/`.smart-env` corruption objection that dominated the adversarial verdicts **does not apply**.
3. **mcpvault appears unwired** — no `mcpServers` entry found in `.claude/` configs despite CLAUDE.md treating it as retrieval-preference #1. **Verify first; this may be the cheapest win on the list.**