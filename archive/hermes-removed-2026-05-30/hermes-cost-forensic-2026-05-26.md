# Hermes Cost Forensic — 2026-05-26

> **Captured:** 2026-05-26  
> **Hub:** [[ai-tooling]]  
> **Status:** Decision locked — Hermes deprioritized for browser harness

## The $42 burn in 48 hours

Hermes state.db at `C:\Users\josep\AppData\Local\hermes\state.db` (SQLite, FTS5-searchable).

Audit script: `C:\Users\josep\Claude Gravity\hermes_cost_audit.py` (durable, run after any Hermes spike).

48-hour total: **$42.62 across 14 sessions.**

Two whale sessions consumed **$33.69 (79% of total):**

| Session | Cost | Task | Tool calls |
|---|---|---|---|
| `20260526_115432_5f49dc98` | $20.53 | Pass 12.4 scoping multi-niche audit | 130 (57 browser_console · 31 browser_navigate · 14 vision_analyze) |
| `20260526_104745_31b926cb` | $13.16 | Pass 12.3 verification multi-niche audit | 115 (58 browser_console · 29 browser_navigate · 3 browser_vision) |

## Cost driver — NOT Browserbase, but Opus cache_read

Initial assumption was wrong (thought Browserbase paid sessions dominated).

Real driver discovered via state.db schema inspection: **`cache_read_tokens` field shows 41.5M tokens across 48h** × Opus 4.7 cached-read rate ($1.50/M) = ~$62 raw cache-read cost (offset by Hermes' reporting model).

**Per Hermes API call (Opus 4.7, average):**
- ~85K cache_read × $1.50/M = $0.128
- ~368 output × $75/M = $0.028
- ~5K cache_write × $18.75/M ≈ $0.094
- **~$0.25 per iteration**

130-iteration multi-niche audit: $0.25 × 130 = ~$32 — close to observed $20.53 (variance + non-API infra).

## Cost per use-case (empirical)

| Use case | Cost band |
|---|---|
| Multi-niche browser sweep (100+ tool calls) | **$13-21** |
| Single-page focused verification (~40 tool calls) | **$1.50** |
| Sub-target audit (20-40 iter) | $0.50-1.50 |
| Messaging dispatch (no browser, no loop) | **$0.05-0.20** |
| Standby / chat | $0.15 |

## In-session alternative — Chrome MCP + Preview MCP + Read tool

Same cross-niche audit done in-session: ~$2-5 marginal (10-30 tool calls vs Hermes' 100+).

**~5× cheaper.** Not infinite — my session also runs Opus 4.7 — but fewer iterations because targeted scope vs agentic-loop framework.

## USE / DON'T USE rules

**USE Hermes for:**
- Messaging dispatch (Telegram routing to Batman And Robin / topic 2 `telegram:-1003758503447:2`)
- Off-hours scheduled async runs
- Tasks needing Browserbase stealth/proxy (rare for King Maker)

**DON'T use Hermes for:**
- Multi-niche audits ($13-21 each)
- Routine per-iteration verification
- Single-page DOM probes
- Anything Chrome MCP / Preview MCP / Read tool covers in-session

## June 15, 2026 Anthropic Agent SDK $200/mo credit

Lands ~3 weeks from this capture. Applies to advisor's session (my work). Makes in-session work effectively free up to $200/mo. **Does NOT cover Hermes** (separately billed).

## Operational tool

`hermes_cost_audit.py` — durable script. Run anytime after Hermes session activity:
```
python "C:\Users\josep\Claude Gravity\hermes_cost_audit.py"
```

Outputs per-session breakdown + 48h aggregate + token-type allocation + tool-usage by session.

## Related

- [[ai-tooling]] hub
- [[operating-discipline-updates-2026-05-26]] — global CLAUDE.md now flags Hermes as deprioritized
