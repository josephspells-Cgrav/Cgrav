# Obsidian RAG/Memory System - Red-Team/Blue-Team Audit v2 (2026-06-02, POST-activation)

> 22-agent empirical Sonnet swarm (1.64M tokens, ~23 min, 570 tool calls). Run by vault-agent (Obsidian Specialist 5).
> This is the POST-activation follow-up to `OBSIDIAN_RAG_RESEARCH.md` (v1, which was PRE-activation / "should we do this"). v2 = "now that both MCPs are live, where does it actually break."
> Structure: Recon (audit live system + empirical query benchmark + 2026 SOTA scan) -> Red vs Blue across 6 dimensions -> per-dimension adjudication (reproduce/verify, kill FUD) -> synthesis.
> Vault-agent INDEPENDENTLY REPRODUCED the 3 high-severity findings before recording them (see Spot-checks).

## Overall verdict
Architecturally sound and better than most teams build - the hybrid BM25+vector stack, local-only retrieval, and hub-and-spoke graph all work in production. The foundation deserves protecting. The 3 problems needing immediate action are NOT architectural: (1) raw_sources/ files outrank distilled wiki notes on operational queries (confidently-wrong stale results); (2) 14 core notes incl. the primary doctrine hub serve corrupted text to every agent (Windows encoding bug); (3) Mode D has no pre-write search step, so the $1497 stale-fact class is structurally guaranteed to recur. Everything else is real but lower-urgency.

## Scorecard
| Dimension | Grade | One-liner |
|---|---|---|
| Retrieval quality & ranking | B | Hybrid genuinely precise in-domain; raw_sources outranking wiki notes is the one confirmed prod failure |
| Indexing, chunking & embedding | B- | Zero-lag indexing + correct chunk ratios real; mojibake in 14 notes + near-dup snapshot notes flooding slots are live problems |
| Knowledge architecture & graph | C+ | Hub-spoke works for business domains; 26+ phantom spokes are dead links + related-traversal silently broken |
| Capture, freshness & lifecycle | B- | Hook/Mode-D split correct + Mode D has a real track record; stale-alarm fatigue + active-projects.md stale are gaps |
| Write-path & integrity | C+ | Append-only log + contradiction protocol fired correctly in prod; no Mode-D pre-write search + 146KB monolith are structural failures |
| Ops, cost, portability & scale | B+ | $0 retrieval + correct MCP registration + near-total portability confirmed; settings.json dup + @latest pins latent |

## Top strengths (protect these)
1. Hybrid BM25+vector delivers consistent top-3 precision in-domain (10/11 probe categories correct); the BM25 leg suppresses false positives (adversarial composites scored 0.46-0.51, not the feared 0.82-0.92 band).
2. Zero-lag incremental indexing - a Mode D write by one agent is queryable by the next agent within seconds, no manual reindex.
3. Contradiction protocol has a verified production trace - the $1497 correction fired end-to-end, propagated to 3 notes, left an audit trail.
4. $0 marginal retrieval + full local privacy - e5-small vectors never leave the machine (correct for a vault of live client pricing).
5. Two-marker system cleanly separates hook-owned metadata freshness from vault-agent-owned semantic freshness.

## Top weaknesses (verified)
| # | Weakness | Severity |
|---|---|---|
| 1 | raw_sources/ outranks distilled wiki notes on operational queries (stale rank-1 @ 0.92-0.96) | HIGH |
| 2 | Mojibake UTF-8 corruption in 14 notes incl. hub-king-maker.md (37/132 lines) | HIGH |
| 3 | Mode D has no pre-write semantic search -> stale-fact recurrence structurally guaranteed | HIGH |
| 4 | 26+ phantom spoke notes in 4 hubs -> agents hit dead-end links, no error signal | HIGH |
| 5 | 146KB monolithic km-niche-economics-table.md buries its master summary table | HIGH |
| 6 | rerank:true corrupts the outer score field (breaks any threshold-gating) | MED |
| 7 | stale-alarm fires identically at 6 vs 400 new sessions (alarm fatigue) | MED |
| 8 | hook Block 2 retrieval guidance leads with grep, contradicting vault/CLAUDE.md | MED |
| 9 | related-graph traversal returns empty despite indexed links (silently broken) | MED |

## Vault-agent spot-checks (independent reproduction, 2026-06-02)
- **Mojibake:** grep "â€|Â·|Â§" across vault/wiki -> **80 hits / 14 files**; hub-king-maker.md = 37. CONFIRMED.
- **raw_sources outranking:** hybrid query "is the King Maker lead funnel built yet" -> rank-1 = raw_sources/funnel-telegram-pivot (0.96, snippet "still draft; sign-off gate"); the LIVE capstone km-funnel-live-state ranked **5th**. CONFIRMED - an agent gets the wrong answer.
- **related-traversal:** search(path="wiki/km-traffic-deck.md", related=true) -> **[] empty** despite many links/backlinks. CONFIRMED broken (possible cause: Windows path-separator mismatch - the index stores backslash paths).

## Roadmap (prioritized; effort S/M/L x impact)
1. **[S/High] Fix mojibake in 14 core notes + reindex.** hub-king-maker.md is the boot-time doctrine entry point; 37/132 lines garbled corrupts every chunk. HOW: script the Windows-1252 substitutions (â€" -> em-dash, Â· -> middle-dot, Â§ -> section-sign, â€™ -> right-quote), back up first, strip UTF-8 BOM from the ~46 notes carrying it, then reindex. Confirmed files: hub-king-maker, hub-roofing-business, vault-operators-manual, the active-amw-* cluster.
2. **[S/High] Exclude raw_sources/ and log.md from the semantic index.** Confirmed stale rank-1 hits. HOW: add raw_sources/**, log.md, sessions-recent.md, *.db* to obsidian-hybrid-search ignore_patterns (alongside .obsidian/**, *.canvas, templates/**), reindex. Fallback if config not editable: mandate scope:["-raw_sources","-log.md"] on all agent searches in vault/CLAUDE.md.
3. **[S/High] Add a pre-write semantic-search step to Mode D in vault/CLAUDE.md.** Mode A has a HALT step; Mode D doesn't -> stale writes guaranteed. HOW: insert a Step 0 - "before any write, hybrid-search the topic + key facts; if an existing note contradicts, HALT + [!contradiction] callout." Plus: when superseding, set frontmatter superseded_by:[[new]] + valid_until:YYYY-MM-DD. Doc-only.
4. **[S/Med] Encode the bm25:null false-positive rule in vault/CLAUDE.md.** The signal exists in every payload but is undocumented. HOW: "If all top results show bm25:null AND hybrid < 0.85, treat as low-confidence; say so rather than act." Plus "Never use rerank:true - it overwrites the outer score; read scores.hybrid as canonical."
5. **[M/High] Run a Mode C lint + materialize the ~15 highest-value phantom spoke notes.** 26+ declared-but-missing hub links; Mode C has never run. HOW: scan hubs for [[links]], resolve vs /wiki, report the dead-link set, create the top ~15 (contradiction-protocol, lib-vs-components-rule, five-step-rebrand, verification-checklist, karpathy-meta-architecture...), update index.md stats (~80 -> ~148, "Last lint: 2026-06-02").
6. **[M/High] Split km-niche-economics-table.md (146KB) into 9 per-niche notes + 1 master-table note.** ~94 chunks bury the master table. HOW: one note per niche (master row + per-niche detail), one master note (9-row table + wikilinks), redirect stub at the old path, fix backlinks.
7. **[S/Med] Update hook Block 2 to put MCP semantic search first.** The hook tells agents to lead with grep, contradicting CLAUDE.md. HOW: edit session-start.mjs Block 2 retrieval line -> "MCP semantic (hybrid, exclude raw_sources+log) first; MCP keyword/link next; then grep; read-by-path; follow [[links]]."
8. **[S/Med] Remove the duplicate obsidian-vault entry from settings.json + pin MCP versions.** Ghost registration + @latest pins = the same silent-failure class as the week-long dead MCP. HOW: delete the settings.json mcpServers.obsidian-vault block; pin @bitbonsai/mcpvault and obsidian-hybrid-search to confirmed-working versions in ~/.claude.json; log the pins.
9. **[M/Med] Upgrade embedding model to nomic-embed-text-v1.5 + add stale-alarm severity tiers.** e5-small's 512-token window truncates notes over ~380 words; nomic = 8192-token / 768-dim. HOW: confirm the plugin supports model config, swap (first run ~550MB), do mojibake fix FIRST so reindex embeds clean text, benchmark before declaring success. Alarm: tier the hook (6-20 standard / 21-100 CRITICAL / 100+ blocking) + a .last-stale-ack.json that suppresses for 3 sessions on ack.

## Do first
Fix the mojibake in hub-king-maker.md + the other 13 notes, then reindex. Highest-leverage 30-min action: (1) hub-king-maker.md is the boot-time doctrine entry every agent reads - 37/132 lines garbled; (2) fixing it first means the subsequent reindex embeds clean text, so every downstream fix operates on a clean foundation; (3) deterministic character substitution, zero architectural risk.

---
*Generated by the rag-redteam-blueteam-v2 workflow (run wf_cf2a69fd-735). Full per-dimension adjudications in the task output. Kept at repo root, OUT of the vault index, per the external-artifact pattern (and consistent with this audit's own finding #2).*
