# Hermes Agent — Specialist Operator's Guide

**Provenance:** synthesized 2026-05-29 from a 17-agent research workflow run against the **on-disk v0.14.0 docs** (`C:/Users/josep/AppData/Local/hermes/hermes-agent/website/docs/`, version-matched to the live install) + live `config.yaml`/`state.db` inspection + hard-won fixes from the install session. Authoritative for **this machine**, not generic web lore.

**Mental model in one paragraph.** Hermes is one synchronous Python orchestration class (`AIAgent`) that every entry point — CLI, messaging gateway, cron, the HTTP API server, ACP, batch — instantiates. It assembles a cache-stable system prompt, runs an interruptible turn loop (call model → run tools → loop), compresses its own context when it fills, and persists every message to a WAL-mode SQLite `state.db`. The LLM underneath is **the same Claude you already use** — Hermes does not raise the model's quality ceiling. What it *adds* is the missing substrate: persistent skills, autonomous/scheduled execution, a browser+vision toolset, cross-session memory, multi-platform messaging, and multi-agent delegation. Treat it as the **orchestration + verification + dispatch layer**, never as a smarter brain.

---

## How to read this guide

| Section | What it is |
|---|---|
| **Read first — 9 things that will bite you** | The critic pass's highest-severity findings, hoisted to the top. Read before building anything. |
| **This exact install** | What's configured on your box right now, what's NOT wired, every path. |
| **Battle-tested hardening** | Fixes we earned the hard way this session — vision limits, skill registration, the MCP bridge, the config-as-string trap. |
| **Cross-cutting building blocks** | The 6 reusable patterns every vertical leans on. Learn these once. |
| **Part I — Capability Reference** | The full Hermes surface, 8 capability areas, from the version-matched docs. |
| **Part II — Vertical Playbook** | 8 concrete buildable architectures: lead vendor, Vapi voice, receptionist, cold email, trading, n8n, SEO, contractor funnel. |
| **Part III — Completeness Critic** | Gaps, factual corrections, and prioritized next steps. |

---

## Read first — the 9 things that will bite you

Hoisted from the adversarial critic pass. These are the production-killers; the rest of the guide assumes you've internalized them.

| # | Trap | The reality | What to do |
|---|---|---|---|
| 1 | **"It survives a 429."** Every vertical's uptime story assumes failover. | Live config: `fallback_providers: []`, `credential_pool_strategies: {}`, one direct-Anthropic key. There is **no failover today.** A 429 mid-voice-call or mid-enrichment-burst hard-fails. | Run `hermes fallback` (add a cross-provider fallback) + `hermes auth add` (same-provider key pool) **before any vertical ships**. Note: covers cron + main loop but **NOT subagent delegation** — give big `delegate_task` fan-outs their own provider override. |
| 2 | **Webhook callers time out.** Vapi/Cal.com/Stripe/n8n all POST to Hermes and wait. | A deliberate Opus turn takes minutes; Vapi custom-tools have a **~7.5s** budget; Stripe/Cal.com webhooks have short timeouts. Synchronous = guaranteed failure. | Use the **async ack pattern** (building block #1): webhook `deliver_only:true` acks instantly → kick a `/v1/runs` job → callback a resumeUrl or poll `GET /v1/runs/{id}`. Only the n8n brief solved this; it applies to 5 of 8 verticals. |
| 3 | **The API server is a remote-code-execution surface.** Clay, n8n, Vapi-premium all point external callers at `:8642/v1`. | The API server exposes the **full toolset including `terminal`** (and your backend is `local` = full filesystem). A prompt-injected lead/email/form row reaching it can drive shell commands. | Restrict the API-server platform to a read-only/`safe` toolset via `platform_toolsets`, switch `terminal.backend: docker`, require `API_SERVER_KEY`, CORS off, never `INSECURE_NO_AUTH`, never bind `0.0.0.0` without a reverse proxy + auth. |
| 4 | **Wrong webhook signature header.** Easy to copy Hermes's generic header onto Stripe. | Stripe signs with `Stripe-Signature` (t=…,v1=HMAC-SHA256), **not** Hermes's generic `X-Webhook-Signature`. Cal.com uses `x-cal-signature-256`; Instantly its own. Verify the **provider's own** header, in deterministic code. | Per webhook: verify the provider's real signature header + **idempotency-key on the event ID** (webhook delivery is at-least-once → double-charge / double-deliver without it). |
| 5 | **`execute_code` / `computer_use` don't exist on Windows.** Deliverable-mode's docs say matplotlib via `execute_code`. | Both are macOS/Unix-socket-only. On this box they're unavailable — chart/PDF/xlsx generation via `execute_code` silently isn't there. | Render artifacts via the **terminal backend running Python directly** (or `terminal.backend: docker`), write to an absolute path, let the gateway auto-upload it. Validate one real artifact uploads before claiming a reporting loop works. |
| 6 | **Deliverable mode isn't a flag you invoke.** Briefs say "ship via `--deliverable`". | It's **automatic gateway behavior**: the agent writes a file to an absolute path and mentions that path as plain text; the gateway extracts + uploads it. `.py`/`.log`/source extensions are intentionally **excluded** from upload. | Don't look for a flag. Write to an absolute path, mention it. Don't expect `.py` files to attach. |
| 7 | **Profiles are the multi-tenant cloning mechanism — and nobody used them.** Per-client verticals hand-wave "clone the config." | `hermes profile {create,use,export,import,install,describe,...}` with HERMES_HOME scoping (separate `state.db`/skills/auth/gateway-PID per profile) is the supported clone-and-template primitive. `profile describe` feeds kanban auto-decompose routing. | One profile per client. `profile export` a golden template → `profile import`/`create` per client. One Docker container or Scheduled Task per profile for blast-radius isolation. Don't hand-copy `config.yaml`. |
| 8 | **You're rebuilding billing that already exists.** Every vertical hand-rolls per-client cost SQL off `estimated_cost_usd`. | `hermes insights --days 30 --source <platform>` already produces token/cost/tool-pattern rollups per platform/profile. | Use `hermes insights` for billing rollups. Rebuilding it in SQL is wasted effort + an off-by-one billing risk. |
| 9 | **Per-caller memory needs Honcho, not USER.md.** Receptionist/voice want to remember many end-callers. | `USER.md` is a single frozen ~500-token snapshot per profile — it can't hold N distinct callers. Honcho (bundled, `honcho: {}` empty/unset on your box) does multi-peer user modeling per workspace. | For receptionist/voice serving many callers under one client profile, set up Honcho. `session_search` gives recall but not per-caller representation. |

**Also true today (config reality):** `state.db` schema is **v13** (docs say v11); `agent.max_turns: 150` (we raised it; docs say 90); `checkpoints.enabled: false` (opt-in); `terminal.backend: local`; personality is `kawaii` (cosmetic — change via `display.personality`).

---

## This exact install — current stack & state

| Component | State | Path / value |
|---|---|---|
| Version | v0.14.0 (33 commits behind upstream) | `hermes update` when a window opens |
| Model | `claude-opus-4-7`, provider `anthropic` (direct) | `config.yaml` `model.*` |
| Backend | `local` (no isolation) | `terminal.backend` — **switch to `docker` before exposing the API server** |
| Failover | **NONE** — `fallback_providers: []`, no credential pool | Trap #1 — wire before shipping |
| Gateway | Telegram, bot **Hermes The Great**, paired to `8382218041`, allowlisted | Scheduled Task `Hermes_Gateway`, auto-start on login |
| MCP bridge | Registered **user-scope** in `C:/Users/josep/.claude.json` | 10 messaging tools (`mcp__hermes__*`) callable from Claude Code |
| Memory | built-in ON; 9-axis doctrine + GATE RULE loaded | `C:/Users/josep/AppData/Local/hermes/memories/MEMORY.md` |
| Skills built | `pass-verification`, `post-pass-verification` (both `devops/`) | `C:/Users/josep/AppData/Local/hermes/skills/devops/` |
| External skills dir | registered | `C:/Users/josep/hermes-skills` |
| Pillow | **installed** (fixes oversized-screenshot crash) | venv at `…/hermes-agent/venv/` |
| Companion docs | install + interface setup | `HERMES_INSTALL_GUIDE.md`, `HERMES_INTERFACE_GUIDE.md` |

**Not wired yet (deliberate):** failover/credential pool (trap #1), Honcho (trap #9), Docker backend (trap #3), API server, cron jobs, the 4 deferred doctrine axes (fleet skill), Mnemosyne/external memory, n8n, any funnel infra.

---

## Battle-tested hardening — what we earned this session

Real failures hit during install, with the fix that worked. These aren't in any doc.

| Symptom | Root cause | Fix |
|---|---|---|
| `browser_vision` 400: `image exceeds 5 MB` / `dimensions exceed 8000px` | Contractor pages run 13–18k px tall; full-page screenshot blows Anthropic's image limits. Hermes's auto-shrink needs **Pillow**, which wasn't installed. | `…\venv\Scripts\python.exe -m ensurepip --upgrade` then `-m pip install Pillow`, then `hermes gateway restart`. The `pass-verification` skill now also DOM-probes tall pages instead of relying on vision. |
| Skill not found after creating `SKILL.md` | (a) Notepad mangled the file — escaped every markdown char + UTF-8→CP1252 em-dashes, breaking the `---` frontmatter. (b) Wrong directory. | Write `SKILL.md` from a real editor/tool (not clipboard-paste into Notepad). Skills live under `…/hermes/skills/<category>/<name>/SKILL.md`. Verify with `hermes skills list` (NOT `inspect` — that resolves registry sources, not local files). |
| `hermes config set skills.external_dirs '[...]'` saved a **string**, not a list | `config set` on a nested key serialized the bracket value as a literal string `'[C:/...]'`. Hermes then couldn't iterate it. | Edit `config.yaml` directly to a real YAML list. Same trap exists for `toolsets` (stored as `'[hermes-cli, browser]'` string — works, but know it's not a real list). |
| MCP tools invisible in a Claude Code project | `claude mcp add` defaulted to **project scope** (`[project: …]`). | `claude mcp add --scope user hermes -- "…\hermes.exe" mcp serve`, then **fully quit + restart** Claude Code (schemas resolve at startup only). |
| `hermes gateway --stop` errored | The verb is a positional subcommand, not a flag. | `hermes gateway stop` / `start` / `restart` / `status`. Windows uses a Scheduled Task, not a Windows Service. |
| Gateway "already running" but config change not picked up | Gateway loads config at process start; an in-place edit needs a bounce. | `hermes gateway restart`. (But `config.yaml` is re-read per **new chat** for non-gateway dispatch — only the long-lived gateway needs the restart.) |
| MCP bridge dispatches echo into Telegram | The bridge routes through the gateway, so anything Claude Code dispatches appears in your Telegram DM. | Feature, not bug — it's a mobile audit trail. Restrict later via `platform_toolsets` if noisy. |

**The validated win:** `pass-verification` dispatched from Claude Code (via MCP) → Hermes runs browser+vision+DOM probes server-side → returns a severity-ranked 9-axis findings table. Cross-checked against the raw screenshots: 4/5 findings independently confirmed on the first real run (caught a duplicated-city-list content bug, an empty grid slot, broken step numbering). The verification gap is closed.

---

## Cross-cutting building blocks

The 6 patterns every vertical reuses. Build each once.

1. **Async webhook ack** (fixes trap #2). Webhook route with `deliver_only:true` returns instantly (zero-token) → POST `/v1/runs` for the real agent work → caller polls `GET /v1/runs/{id}` or you callback a resumeUrl (n8n Wait node). Mandatory anywhere Vapi/Stripe/Cal.com/Instantly POST to you.
2. **Profile-per-tenant** (fixes trap #7). `hermes profile export` a golden config → `import`/`create` per client → one container/Scheduled-Task per profile. This is the King-Maker "clone the template" thesis applied to agent configs.
3. **Human-gate on irreversible actions.** Money movement, outbound sends, trades, publishing → deterministic code computes the action, a human approves via Telegram inline button (`permissions_respond` / a wakeAgent gate), THEN it fires. Never let LLM judgment alone move money or send at scale. Required for TCPA (calling), CAN-SPAM (email), trading.
4. **Compliance-as-code with idempotency** (fixes trap #4). Every Stripe/Cal.com/Instantly webhook handler: verify the provider's own signature header + idempotency-key on the event ID (at-least-once delivery). TCPA quiet-hours/DNC and A2P 10DLC registration (10–15 day carrier review) start day one for any SMS vertical.
5. **`hermes insights` for billing** (fixes trap #8). Per-client/per-platform cost + token + tool rollups, first-class. Don't hand-roll SQL.
6. **Trajectory → specialist loop.** `agent.save_trajectories` emits ShareGPT JSONL → `batch_runner.py --resume` evaluates a cheaper candidate model on the same toolset distribution → swap the aux/delegation model only if tool-call accuracy holds. The only concrete path from "banked real runs" to a cheaper production model.

---

# Part I — Hermes Capability Reference

The complete capability surface of Hermes Agent v0.14.0, dissected from the on-disk version-matched docs. Eight capability areas.

---

## Core architecture & agent loop

> Hermes is a single synchronous orchestration engine (AIAgent in run_agent.py) that assembles a cache-stable system prompt, runs an interruptible turn loop across three API modes with tool dispatch, compresses context via a pluggable engine, and persists everything to a WAL-mode SQLite state.db with FTS5 search and parent/child session lineage.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| AIAgent turn loop | One platform-agnostic class (run_agent.py, ~15k lines) drives CLI, gateway, cron, ACP, batch, and API server. Per iteration: append user msg, build/reuse cached system prompt, preflight-compress if >threshold, build API messages, inject ephemeral layers, call model interruptibly, then either execute tool_calls and loop or return final text + persist. | `agent.chat("...") (returns string) or agent.run_conversation(user_message=..., conversation_history=..., task_id=...) (returns dict with messages/usage)` | Strict role alternation enforced (never two assistant or two user msgs in a row; only role='tool' may repeat). Malformed history is rejected by providers. |
| Three API modes | chat_completions (OpenAI-compatible, default), codex_responses (OpenAI Responses API), anthropic_messages (native Anthropic via agent/anthropic_adapter.py). All converge on internal OpenAI-style role/content/tool_calls dicts before and after the call. | `Resolved by precedence: explicit api_mode arg > provider detection (anthropic->anthropic_messages, openai-codex->codex_responses) > base_url heuristic > default chat_completions` | Native Anthropic prefers refreshable Claude Code credentials over env tokens; preflights a credential refresh and retries once on 401 after rebuilding the client. |
| Interruptible API calls | _interruptible_api_call() runs the HTTP POST in a background thread while the main thread waits on response-ready / interrupt-event / timeout. On interrupt the API thread is abandoned and NO partial response enters history. | `User sends new input, /stop, or OS signal during a model call` | Discarded responses mean an interrupted turn leaves history clean — but also means in-flight tokens are wasted, not salvaged. |
| Tool dispatch + agent-level tools | Single tool->main thread; multiple tool_calls run concurrently via ThreadPoolExecutor with results reinserted in original order. Four tools (todo, memory, session_search, delegate_task) are intercepted by the agent loop BEFORE registry dispatch because they touch agent-local state. | `model_tools.handle_function_call(name, args, task_id) -> registry.dispatch(); plugin pre_tool_call/post_tool_call hooks fire around it` | Interactive tools (e.g. clarify) force sequential execution. Errors are double-wrapped into JSON ({"error":...}) at both registry.dispatch and handle_function_call so the model never sees a raw exception. |
| Dual context compression | Agent ContextCompressor fires in-loop at compression.threshold (default 0.50 of context, real API tokens); gateway session hygiene is a safety net at fixed 85% (rough char estimate, only when history>=4). 4-phase: prune old tool results >200 chars, find boundaries (token-budget tail, never split tool pairs), LLM structured summary, reassemble. | `config.yaml compression.{enabled,threshold,target_ratio,protect_last_n,protect_first_n}; engine chosen by context.engine (compressor default; plugins like lcm opt-in only)` | Summary model MUST have context >= main model's; if smaller the call errors, _generate_summary returns None, and middle turns are DROPPED silently with no summary — the top cause of degraded compaction. Live config also has hygiene_hard_message_limit:400 and abort_on_summary_failure:false. |
| Cache-stable prompt assembly | 10-layer cached system prompt (SOUL.md identity -> tool guidance -> Honcho -> optional sys msg -> frozen MEMORY -> frozen USER -> skills index -> context files -> timestamp/session -> platform hint). Ephemeral layers (ephemeral_system_prompt, prefill, gateway overlays, Honcho recall) are injected at call time and NOT persisted to keep the cache prefix stable. | `agent/prompt_builder.py build_system_prompt(); customize via ~/.hermes/SOUL.md, MEMORY.md, USER.md, project context files, skills — not by editing Python` | Context files are first-match-wins priority: .hermes.md/HERMES.md (walks to git root) > AGENTS.md > CLAUDE.md > .cursorrules. All are security-scanned for injection and truncated to 20k chars (70/20 head/tail). Memory snapshots are frozen at session start; mid-session writes hit disk but don't mutate the built prompt until rebuild. |
| Anthropic prompt caching (system_and_3) | 4 cache_control breakpoints: breakpoint 1 on the stable system prompt + a rolling 3-message window on the last 3 non-system messages. Cuts input cost ~75% on multi-turn. | `Auto-enabled for Claude models on native Anthropic API or OpenRouter; config.yaml prompt_caching.cache_ttl ('5m' default or '1h')` | Cache requires prefix matching — any middle insert/remove invalidates everything after. Compression appends a system-prompt note only on the FIRST compaction to avoid breaking the breakpoint-1 cache. |
| SQLite session storage (state.db) | WAL-mode SQLite at HERMES_HOME/state.db. Tables: sessions, messages, messages_fts (FTS5), messages_fts_trigram (CJK/substring), state_meta, schema_version. Sessions carry token/billing columns and parent_session_id lineage; compression spawns a child session. | `hermes_state.SessionDB(); append_message(), get_messages_as_conversation(), search_messages(query, source_filter=, role_filter=); resume via /resume or hermes chat --resume` | INSTALLED SCHEMA IS v13, but the bundled doc says v11. Live sessions table has 3 undocumented cols (handoff_state, handoff_platform, handoff_error) and messages has 2 (platform_message_id, observed) — migrations 12-13 added platform-handoff + message-observation tracking. Write contention handled with 1s timeout + jittered retries (max 15, 20-150ms) + BEGIN IMMEDIATE + WAL checkpoint every 50 writes. |
| Iteration budget + fallback chain | IterationBudget caps turns; at 100% the agent stops and returns a work summary. Subagents get independent budgets (delegation.max_iterations) so parent+children total can exceed the parent cap. Fallback tries fallback_providers in order on 429/5xx/401/403, swapping model/provider/client/api_mode in-place once (_fallback_activated guard). | `config.yaml agent.max_turns; fallback_providers list; _try_activate_fallback() in run_agent.py retry loop` | Doc says max_turns default 90, but THIS install's config.yaml sets agent.max_turns:150 — config is source of truth. Subagent delegation and auxiliary tasks do NOT inherit the fallback chain (auxiliary uses its own auxiliary.* provider chain); cron jobs DO. |
| Checkpoints & /rollback | Opt-in filesystem safety net: before write_file/patch and destructive terminal commands (rm, mv, dd, sed -i, >, git reset/clean/checkout), snapshots into ONE shared shadow git repo at HERMES_HOME/checkpoints/store/ (per-project ref refs/hermes/<hash>). At most one checkpoint per directory per turn. | `hermes chat --checkpoints or config.yaml checkpoints.enabled:true; in-session /rollback, /rollback <N>, /rollback diff <N>, /rollback <N> <file>; shell hermes checkpoints {status,prune,clear,clear-legacy}` | DEFAULT OFF (live config confirms enabled:false). /rollback <N> also undoes the last chat turn so context matches the filesystem. Disabled transparently if git missing; skips dirs >50k files, files >max_file_size_mb (10MB), and root/$HOME. |
| ShareGPT trajectory export | Saves conversations as JSONL: trajectory_samples.jsonl (completed) / failed_trajectories.jsonl. Roles map system->system, user->human, assistant->gpt, tool->tool. ALL reasoning normalized into <think> tags (empty block inserted if none); tool calls wrapped in <tool_call> JSON, results in <tool_response>. | `config.yaml agent.save_trajectories:true or --save-trajectories; batch_runner.py always saves with extra tool_stats/tool_error_counts` | System message is regenerated at save time from the Hermes function-calling template, NOT taken from the live conversation. Batch runner discards zero-reasoning samples. Trajectories are NOT stored in state.db (separate system). |

**Commands**

```bash
hermes chat
hermes chat --resume
hermes chat --checkpoints
hermes chat --save-trajectories
hermes checkpoints
hermes checkpoints status
hermes checkpoints prune --retention-days 3 --max-size-mb 200
hermes checkpoints clear
hermes checkpoints clear-legacy
hermes plugins
hermes model
/rollback
/rollback <N>
/rollback diff <N>
/rollback <N> <file>
/resume
/stop
/model
```

**Config keys:** `agent.max_turns`, `agent.tool_use_enforcement`, `agent.reasoning_effort`, `context.engine`, `compression.enabled`, `compression.threshold`, `compression.target_ratio`, `compression.protect_last_n`, `compression.protect_first_n`, `compression.hygiene_hard_message_limit`, `compression.abort_on_summary_failure`, `prompt_caching.cache_ttl`, `auxiliary.compression.provider`, `auxiliary.compression.model`, `auxiliary.vision.provider`, `checkpoints.enabled`, `checkpoints.max_snapshots`, `checkpoints.max_total_size_mb`, `checkpoints.max_file_size_mb`, `checkpoints.auto_prune`, `fallback_providers`, `delegation.max_iterations`, `delegation.max_concurrent_children`, `delegation.max_spawn_depth`, `memory.memory_char_limit`, `memory.user_char_limit`, `sessions.auto_prune`, `sessions.retention_days`, `session_reset.mode`, `session_reset.idle_minutes`

**Business hooks:**

- Voice/receptionist & email gateway bots: gateway session hygiene auto-compresses at 85% so overnight-accumulating Telegram/Discord/SMS/email threads don't blow the context window between turns — long-lived assistant sessions stay healthy without manual resets.
- Lead-gen / outbound at scale: parent/child session lineage in state.db + FTS5 search_messages() lets a receptionist or SDR agent recall prior conversations with a contact across compressions ('use session_search before asking them to repeat themselves'), and group_sessions_per_user keeps per-lead context isolated.
- Trading / autonomous ops: fallback_providers chain swaps provider mid-run on 429/5xx so a live agent survives a primary-model outage; iteration budget caps runaway loops and returns a work summary instead of hanging.
- Coding/SEO automation safety: opt-in checkpoints + /rollback give a one-command undo of agent-driven file edits (shadow git, never touches real .git) — safe to let an agent mutate a client site, then roll back a bad turn including the conversation state.
- Cost control for high-volume verticals: Anthropic system_and_3 prompt caching (~75% input-token reduction) plus the cache-stable 10-layer prompt assembly keep per-turn cost low across thousands of repetitive lead-gen/email turns; per-session token + estimated_cost_usd columns in state.db enable per-client billing reports.
- Fine-tuning a vertical-specialist model: agent.save_trajectories emits ShareGPT JSONL (with normalized <think> reasoning and tool_stats) directly loadable by HuggingFace datasets — turn real receptionist/SDR sessions into training data for a domain model.
- Auxiliary model routing (auxiliary.vision/web_extract/compression/title_generation) lets a cheap model handle vision/summarization side-tasks while the premium model handles the customer-facing turn — margin optimization for voice/receptionist verticals.

**Reference**

##### Core Architecture & Agent Loop (Hermes Agent v0.14.0)

**The mental model.** Hermes is one synchronous orchestration class — `AIAgent` in `run_agent.py` (~15k lines) — that every entry point (CLI `cli.py`, gateway `gateway/run.py`, cron, ACP, batch, API server) instantiates. Platform differences live in the entry point, not the agent ("platform-agnostic core" design principle). Tool registration happens at import time: `tools/*.py` self-register via `registry.register()`, `model_tools.py` triggers `discover_builtin_tools()` (AST-scans for top-level register calls), so new tools need no manual wiring.

**Turn lifecycle** (`run_conversation()`): (1) gen task_id; (2) append user msg; (3) build or reuse the cached system prompt; (4) preflight-compress if tokens ≥ threshold; (5) build API messages for the active mode; (6) inject ephemeral layers (budget/pressure); (7) apply Anthropic cache markers; (8) make the interruptible call; (9) if `tool_calls` → execute + append results + loop to (5), else persist session, flush memory, return. Internal format is always OpenAI-style `{role, content, tool_calls}`; strict alternation is enforced (no consecutive user/assistant; only `tool` repeats).

**Three API modes**, all converging on the internal format: `chat_completions` (default, OpenAI-compatible), `codex_responses` (OpenAI Responses), `anthropic_messages` (native, via `agent/anthropic_adapter.py`). Resolution precedence: explicit arg > provider detection > base_url heuristic > default. Provider runtime (`hermes_cli/runtime_provider.py` + `providers/` ABC) maps `(provider, model)` → `(api_mode, base_url, api_key, source)`; bundled per-provider plugins live in `plugins/model-providers/<name>/`.

**Interruptibility & tools.** `_interruptible_api_call()` runs HTTP in a thread; on `/stop`/new-input/signal the thread is abandoned and no partial text enters history. Single tool runs inline; multiple run via `ThreadPoolExecutor` (results reordered to original sequence; interactive tools force sequential). Four agent-level tools — `todo`, `memory`, `session_search`, `delegate_task` — are intercepted before `registry.dispatch()`. Dangerous terminal commands hit `tools/approval.py` `DANGEROUS_PATTERNS`; approvals are per-session, "allow permanently" writes `command_allowlist`.

**Context compression** is a pluggable `ContextEngine` ABC; default `ContextCompressor` (`context.engine: compressor`). Two layers: in-loop agent compressor at `compression.threshold` (0.50, real tokens) and gateway hygiene at fixed 85% (rough estimate, safety net). 4-phase algorithm: prune tool results >200 chars → boundary-find (token-budget tail via `target_ratio`, `protect_first_n:3`/`protect_last_n:20`, never split tool pairs via `_align_boundary_backward`) → structured LLM summary (Goal/Progress/Decisions/Files/Next/Critical) → reassemble + `_sanitize_tool_pairs`. **Critical gotcha:** summary model context must be ≥ main model's or the middle turns are dropped silently.

**Prompt assembly** (`agent/prompt_builder.py`) splits a cache-stable 10-layer system prompt (SOUL.md identity → tool guidance → Honcho → optional sys msg → frozen MEMORY → frozen USER → skills index → context files → timestamp → platform hint) from non-persisted ephemeral overlays. Context files are first-match-wins (`.hermes.md`>`AGENTS.md`>`CLAUDE.md`>`.cursorrules`), security-scanned, truncated to 20k chars. Customize via files, not Python. Anthropic caching uses `system_and_3` (1 system breakpoint + rolling 3-msg window), ~75% input savings.

**Persistence.** WAL-mode SQLite at `C:/Users/josep/AppData/Local/hermes/state.db` (`hermes_state.SessionDB`). Tables: `sessions`, `messages`, `messages_fts`, `messages_fts_trigram`, `state_meta`, `schema_version`. Lineage via `parent_session_id` (compression spawns a child). Search via FTS5 `search_messages()` with source/role filters. Contention: 1s timeout, jittered retries (max 15), `BEGIN IMMEDIATE`, checkpoint every 50 writes.

**Verified install deltas (authoritative for v0.14.0):**
- **state.db schema is v13, not v11 as docs claim.** Live `sessions` has extra `handoff_state/handoff_platform/handoff_error`; `messages` has `platform_message_id/observed` (migrations 12–13 = platform handoff + message observation).
- **`agent.max_turns: 150`** in live config (docs say default 90). Config is source of truth.
- Checkpoints `enabled: false` (opt-in; `--checkpoints` to turn on). `/rollback <N>` also rewinds one chat turn. Shadow git store at `HERMES_HOME/checkpoints/store/`, never the real `.git`.
- Trajectories (ShareGPT JSONL, `<think>`-normalized) live outside state.db; `agent.save_trajectories` gates them.

---

## Backends, deployment, configuration

> Hermes runs the agent's shell on one of seven execution backends and deploys as a self-hosted CLI or a 24/7 always-on messaging gateway, all driven by a single layered config.yaml + .env surface under the Hermes home directory.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Seven terminal backends | Choose where the agent's terminal/execute_code/file tools run: local (no isolation), docker (one persistent hardened container reused across session/new/subagents), ssh (remote host, persistent bash), modal/daytona/vercel_sandbox (cloud microVMs with snapshot-restore), singularity (HPC/Apptainer). | `config.yaml terminal.backend: local\|docker\|ssh\|modal\|daytona\|vercel_sandbox\|singularity (or TERMINAL_ENV env var); hermes config set terminal.backend docker` | Cloud-sandbox container_persistent only preserves filesystem state, NOT live PIDs/processes. Vercel needs pip install 'hermes-agent[vercel]' + VERCEL_TOKEN/PROJECT_ID/TEAM_ID and does NOT support container_disk overrides (non-default fails). |
| Docker terminal sandbox (single persistent container) | Hermes starts ONE long-lived container (docker run -d ... sleep 2h), routes every tool call through docker exec; cwd, installed packages, /workspace files persist for the Hermes process lifetime. Hardened: --cap-drop ALL, no-new-privileges, --pids-limit 256. | `terminal.backend: docker plus docker_image, docker_volumes, docker_forward_env, docker_run_as_host_user, docker_extra_args, docker_mount_cwd_to_workspace` | cwd is NOT mounted by default (sandbox-isolated). Parallel delegate_task subagents share the one container — concurrent cd/writes collide. Set HERMES_DOCKER_BINARY=podman to force Podman. Browser tools need --shm-size=1g. |
| Running Hermes itself IN Docker | Official image nousresearch/hermes-agent (debian:13.4, s6-overlay v3 as PID1). All state lives in one bind-mounted volume at /opt/data (= host ~/.hermes). Stateless image, upgrade by pulling. Distinct from the docker terminal backend. | `docker run -d --name hermes --restart unless-stopped -v ~/.hermes:/opt/data -p 8642:8642 nousresearch/hermes-agent gateway run` | Never run two gateway containers against the same data dir (concurrent-write corruption). Recommended pattern is one container per profile, not Hermes' --profile flag. Starting gateway as root is refused unless HERMES_ALLOW_ROOT_GATEWAY=1. |
| Always-on gateway as a background service | Persistent messaging gateway (Telegram, Discord, Slack, WhatsApp, etc.) installed as an OS-managed service that survives reboot/login and auto-restarts. | `hermes gateway install (systemd on Linux, launchd on macOS, Scheduled Task on Windows); then hermes gateway start\|stop\|restart\|status\|run; --all acts on every profile` | WSL: use 'hermes gateway run' wrapped in tmux, NOT start (WSL systemd unreliable). Windows uses schtasks /SC ONLOGON (no admin), spawns detached via pythonw.exe — NOT a Windows Service (that needs admin + nssm/sc). |
| Layered config.yaml + .env surface | All non-secret settings in config.yaml, secrets in .env. Huge surface: model/provider, terminal, compression, auxiliary models, delegation, web/browser/tts/stt, approvals, security, display, worktree, memory, quick_commands. | `hermes config / config edit / config set KEY VAL / config check / config migrate. ${VAR} substitution supported in config.yaml` | Precedence: CLI args > config.yaml > .env > defaults. config.yaml WINS over .env for non-secrets. Only ${VAR} expands, bare $VAR does not. YAML duplicate keys silently override (e.g. two docker_volumes blocks). |
| Nous Portal (recommended provider + Tool Gateway) | One OAuth subscription covers 300+ models AND the Tool Gateway (Firecrawl web search, FAL image gen, OpenAI TTS, Browser Use, Modal sandbox). Only credential on disk is a refresh token; short-lived JWTs minted per call. | `hermes setup --portal (fresh) or hermes model -> Nous Portal; hermes portal status\|tools\|open; hermes auth add nous` | Anthropic OAuth (Claude Code path) needs Max plan + purchased extra credits, NOT Pro. Don't pick Hermes-4-70B/405B for agent work — they are chat/reasoning-tuned, weak at the tool-call loop. Tool Gateway is opt-in per tool via hermes tools. |
| Install + update + rollback path | One-line installer (curl install.sh / PowerShell install.ps1) or pip install hermes-agent. hermes update auto-detects install method (git/pip/brew/nix) and prints matching update; restarts running gateways. | `hermes update (--check, --backup), hermes config migrate after update, git checkout <tag> + uv pip install -e '.[all]' to roll back` | Windows update refuses if another hermes.exe holds the venv exe open (Desktop app/REPL/gateway) — close them or --force. Native Windows is EARLY BETA; WSL2 is the battle-tested Windows path. After rollback run hermes config check (new options may break). |

**Commands**

```bash
hermes config
hermes config edit
hermes config set terminal.backend docker
hermes config set model anthropic/claude-opus-4.6
hermes config check
hermes config migrate
hermes setup --portal
hermes model
hermes tools
hermes gateway setup
hermes gateway install
hermes gateway run
hermes gateway start
hermes gateway stop
hermes gateway restart
hermes gateway status
hermes gateway list
hermes gateway uninstall
hermes portal status
hermes portal tools
hermes auth add nous
hermes update
hermes update --check
hermes update --backup
hermes doctor
hermes version
docker run -d --name hermes --restart unless-stopped -v ~/.hermes:/opt/data -p 8642:8642 nousresearch/hermes-agent gateway run
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup
docker pull nousresearch/hermes-agent:latest
pip install 'hermes-agent[vercel]'
```

**Config keys:** `terminal.backend`, `terminal.cwd`, `terminal.timeout`, `terminal.env_passthrough`, `terminal.docker_image`, `terminal.docker_volumes`, `terminal.docker_forward_env`, `terminal.docker_run_as_host_user`, `terminal.docker_mount_cwd_to_workspace`, `terminal.docker_extra_args`, `terminal.container_cpu`, `terminal.container_memory`, `terminal.container_disk`, `terminal.container_persistent`, `terminal.persistent_shell`, `terminal.vercel_runtime`, `terminal.singularity_image`, `terminal.modal_image`, `terminal.daytona_image`, `terminal.file_sync_max_mb`, `terminal.file_sync_enabled`, `model.provider`, `model.default`, `model.base_url`, `model.context_length`, `compression.enabled`, `compression.threshold`, `compression.hygiene_hard_message_limit`, `auxiliary.compression.provider`, `auxiliary.vision.provider`, `agent.max_turns`, `agent.api_max_retries`, `agent.reasoning_effort`, `agent.disabled_toolsets`, `delegation.max_concurrent_children`, `delegation.max_spawn_depth`, `fallback_providers`, `provider_routing.sort`, `web.backend`, `browser.backend`, `tts.provider`, `stt.provider`, `approvals.mode`, `security.tirith_enabled`, `security.redact_secrets`, `worktree`, `memory.memory_enabled`, `timezone`, `updates.pre_update_backup`, `quick_commands`

**Business hooks:**

- Lead-gen / receptionist: deploy the gateway as an always-on service (hermes gateway install -> systemd/launchd/Windows Scheduled Task) so a Telegram/Slack/WhatsApp/SMS bot answers inbound leads 24/7 without a logged-in terminal; --restart unless-stopped in Docker survives reboots.
- Voice: Nous Portal's Tool Gateway bundles OpenAI TTS so voice mode works with zero extra keys (hermes setup voice -> Nous Subscription); local faster-whisper STT is free. One OAuth covers model + voice for a phone-style receptionist agent.
- Trading / data jobs: run risky code in the docker or modal backend for full isolation (cap-drop, pids-limit) or ephemeral cloud compute; remote-to-host file sync (file_sync_max_mb) recovers result artifacts from destroyed sandboxes automatically.
- Email / outbound: the gateway's Email adapter (EMAIL_* env vars) plus cron (hermes cron add) lets an always-on agent triage inbox and send scheduled briefings, all billed against one Portal subscription.
- SEO / research: route web_search/web_extract through Firecrawl, Tavily, Exa, Parallel, or self-hosted SearXNG (web.backend) — mix free search + paid extract via search_backend/extract_backend to control cost on high-volume contractor-ad / SERP sweeps.
- Multi-client agencies: one-container-per-profile Docker pattern gives each client isolated SOUL/skills/memory/credentials with independent lifecycle (docker restart hermes-clientA leaves clientB untouched) and clean per-gateway port separation.
- Cost control on lead-gen at scale: set delegation.provider/model to a cheap model for narrow subtasks while the orchestrator runs Opus, and point auxiliary.* (vision, web_extract, compression) at Gemini Flash so side tasks don't burn premium tokens.

**Reference**

##### Backends, Deployment & Configuration (Hermes Agent v0.14.0)

###### Execution backends
`terminal.backend` (config.yaml) or `TERMINAL_ENV` selects where the agent's `terminal`/`execute_code`/file tools run. Seven options:

| Backend | Isolation | Use when |
|---|---|---|
| `local` (default) | none — full user FS access | dev/personal |
| `docker` | full (cap-drop ALL, no-new-privileges, pids 256) | safe sandboxing, CI |
| `ssh` | network boundary | remote/powerful hardware |
| `modal` | cloud VM | ephemeral compute, evals |
| `daytona` | cloud container | managed cloud dev |
| `vercel_sandbox` | cloud microVM | snapshot-backed cloud exec |
| `singularity` | namespaces (--containall) | HPC/shared, no Docker |

**Docker backend** is one *persistent* container (`docker run -d … sleep 2h`), reused across session/`/new`/`/reset`/`delegate_task` for the Hermes process lifetime via `docker exec` — packages, cwd, `/workspace` persist. Launch cwd is NOT mounted unless `docker_mount_cwd_to_workspace: true`. Forward creds with `docker_forward_env`, mount host dirs with `docker_volumes` (`host:container[:ro]`), escape-hatch flags via `docker_extra_args` (`--gpus=all`). `HERMES_DOCKER_BINARY=podman` forces Podman.
**SSH** needs `TERMINAL_SSH_HOST`+`TERMINAL_SSH_USER`; persistent `bash -l` by default. **Modal** needs `MODAL_TOKEN_ID`/`SECRET` or `~/.modal.toml`. **Daytona** needs `DAYTONA_API_KEY` (10 GiB disk cap). **Vercel** needs `pip install 'hermes-agent[vercel]'` + `VERCEL_TOKEN`/`PROJECT_ID`/`TEAM_ID` (OIDC only for local dev), `vercel_runtime: node24|node22|python3.13`, and rejects custom `container_disk`. Cloud `container_persistent` preserves filesystem only, never live PIDs. SSH/Modal/Daytona auto-sync modified files back to `~/.hermes/cache/remote-syncs/<session>/` on teardown (`file_sync_max_mb` default 100).

###### config.yaml + .env
Two files in the Hermes home (here **`C:/Users/josep/AppData/Local/hermes/`**, not `~/.hermes`): `config.yaml` (non-secrets) + `.env` (secrets). Precedence: **CLI args > config.yaml > .env > defaults**; config.yaml wins over .env for non-secrets. `hermes config set KEY VAL` auto-routes to the right file. `${VAR}` substitution works (bare `$VAR` does not). After updates run `hermes config check` then `hermes config migrate`. `HERMES_HOME` overrides the directory (also scopes gateway PID file / service name → concurrent installs). State.db, skills/, sessions/, memories/, cron/, auth.json all live under that home.

###### Running IN Docker vs Docker-as-backend
Distinct. The official image `nousresearch/hermes-agent` (debian:13.4, **s6-overlay v3** PID1, ENTRYPOINT `/init`) stores everything in one bind-mount `/opt/data` (= host ~/.hermes). Gateway: `docker run -d --restart unless-stopped -v ~/.hermes:/opt/data -p 8642:8642 … gateway run`. Port 8642 is the OpenAI-compatible API server (gated on `API_SERVER_ENABLED=true`, needs `API_SERVER_KEY` ≥8 chars + `API_SERVER_HOST=0.0.0.0` for non-loopback). Dashboard via `HERMES_DASHBOARD=1` (loopback :9119). **Never** run two gateway containers on one data dir. Prefer one-container-per-profile over `--profile`. Root gateway refused unless `HERMES_ALLOW_ROOT_GATEWAY=1`.

###### Always-on deployment
`hermes gateway install` → systemd (Linux) / launchd (macOS) / **Scheduled Task** (Windows, `schtasks /SC ONLOGON /RL LIMITED`, no admin, spawns detached `pythonw.exe`; NOT a Windows Service). Lifecycle: `gateway run|start|stop|restart|status|list|uninstall` (`--all` = every profile). **WSL: use `gateway run` in tmux, not `start`.** `hermes update` auto-restarts running gateways.

###### Self-hosted vs 24/7 tradeoff
CLI (`hermes`/`--tui`) = interactive, cwd = launch dir. Gateway = persistent service, cwd = `~` (`MESSAGING_CWD`). For 24/7 reliability use the OS service or Docker `--restart unless-stopped` (auto-restart, reboot survival) over a bare foreground process.

###### Nous Portal & updates
`hermes setup --portal` = one OAuth → `model.provider: nous`, `base_url: https://inference.nousresearch.com/v1`, Tool Gateway on. Refresh token in `auth.json`, JWTs minted per call. Anthropic OAuth needs Max + extra credits (not Pro). Update via `hermes update` (`--check`, `--backup`; `updates.pre_update_backup: true`); rollback via `git checkout <tag>` + `uv pip install -e '.[all]'`. Native Windows is **early beta** — WSL2 is the hardened path.

---

## Skills system + full bundled catalog

> Hermes skills are on-demand, progressively-disclosed SKILL.md knowledge docs (90 bundled in this install + agent-created/hub/optional skills) that auto-become slash commands, are maintained by the curator, and can be extended via taps, bundles, and external dirs.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Progressive disclosure loading | Three-level token-efficient load: skills_list() compact index (~3k tokens, loaded at session start) -> skill_view(name) full SKILL.md -> skill_view(name, file_path) a reference file. Skills cost zero tokens until actually viewed. | `Tools skills_list, skill_view; natural language ('use the X skill') or /<skill-name>` | Plugin-provided skills (plugin:skill) are NOT in skills_list or the system prompt; you must skill_view them explicitly by qualified name. |
| Skill-as-slash-command | Every installed skill is automatically a dynamic slash command on both the CLI and every messaging platform. Typing /skillname loads it; trailing text becomes the task instruction. No registration needed. | `/<skill-name> [task] e.g. /plan, /gif-search, /github-pr-workflow` | Installed skills take effect in NEW sessions; use /reset or add --now (costs prompt-cache rebuild) to get a freshly installed skill in the current session. /reload-skills re-scans the dir. |
| SKILL.md authoring | A skill is a directory with a required SKILL.md (YAML frontmatter: name, description, version, author, license, platforms; metadata.hermes.tags/category/related_skills) plus optional scripts/, references/, templates/, assets/ subdirs. Body sections: When to Use, Procedure, Pitfalls, Verification. | `mkdir ~/.hermes/skills/<cat>/<skill>/ + write SKILL.md; or skill_manage(action=create)` | On Windows the real path is C:/Users/<u>/AppData/Local/hermes/skills, NOT ~/.hermes/skills which the docs use generically. |
| Conditional activation + platform gating | Frontmatter controls visibility: requires_toolsets/requires_tools (hide unless present), fallback_for_toolsets/fallback_for_tools (hide WHEN present — for free fallbacks like duckduckgo-search), and platforms:[macos\|linux\|windows] (hide on incompatible OS). | `metadata.hermes.{requires_,fallback_for_}* and top-level platforms: in SKILL.md frontmatter` | fallback_for vs requires invert each other; the apple/* skills are platforms:[macos] so they never show on this Windows box even though their dirs exist on disk. |
| Secrets, config, and credential files | required_environment_variables prompts for secrets (stored in ~/.hermes/.env, never shown to model, auto-passed-through to terminal/execute_code sandboxes incl. Docker/Modal). metadata.hermes.config declares non-secret settings stored in config.yaml under skills.config.*. required_credential_files mounts OAuth token files into sandboxes. | `hermes skills config <skill>; hermes config get skills.config; hermes config migrate` | Missing env vars do NOT hide the skill — Hermes prompts only on load in local CLI; messaging surfaces refuse to collect secrets in-band and point to hermes setup / .env. |
| The Curator (auto-maintenance) | Background pass over AGENT-CREATED skills only. Tracks usage in .usage.json, auto-transitions active->stale (30d unused)->archived (90d, to skills/.archive/), and runs a single aux-model LLM review (max_iterations=8) that can patch/consolidate/archive. Never deletes; never touches bundled or hub skills. | `hermes curator status\|run\|run --dry-run\|pin\|unpin\|restore\|backup\|rollback\|pause\|resume; /curator in-session` | Provenance is binary: anything not in .bundled_manifest or .hub/lock.json counts as agent-created — your HAND-WRITTEN skills look identical to agent-saved ones and are fair game. Pin them before the first run (7 days post-install; first run is deferred). |
| Skills Hub + taps + optional skills | Install from 9 sources: official optional (official/<cat>/<skill>), skills-sh (Vercel), well-known endpoints, direct GitHub (openai/anthropics/huggingface/VoltAgent/gstack default taps), clawhub, lobehub, browse-sh, and direct SKILL.md URL. All run a security scanner with 4 trust levels (builtin/official/trusted/community). | `hermes skills install\|browse\|search\|inspect\|check\|update\|audit\|uninstall\|tap add; /skills <subcmd>` | --force overrides non-dangerous policy blocks but NOT a 'dangerous' verdict. Unauthenticated GitHub API = 60 req/hr; set GITHUB_TOKEN in .env for 5000/hr. |
| Skill bundles | Tiny YAML files in ~/.hermes/skill-bundles/<slug>.yaml that group several skills under one slash command (name, description, skills list, optional instruction). Running /<bundle> loads every listed skill at once into one user message. | `hermes bundles create\|list\|show\|delete\|reload; /<bundle-name>; /bundles to list` | Bundles take precedence over a same-named individual skill; missing skills are skipped not fatal; a bundle does NOT install the skills — they must already exist locally or in an external dir. |

**Commands**

```bash
hermes skills list
/skills
/skills search docker
/skills browse
hermes skills install official/research/arxiv
/skills install official/creative/songwriting-and-ai-music
hermes skills install https://sharethis.chat/SKILL.md
hermes skills install openai/skills/k8s
hermes skills install skills-sh/vercel-labs/json-render/json-render-react --force
hermes skills inspect openai/skills/k8s
hermes skills check
hermes skills update
hermes skills audit
hermes skills uninstall <name>
hermes skills reset google-workspace
hermes skills reset google-workspace --restore
hermes skills tap add owner/repo
hermes skills tap list
hermes skills config gif-search
hermes skills publish skills/my-skill --to github --repo owner/repo
hermes bundles create backend-dev --skill github-code-review --skill test-driven-development -d "desc"
hermes bundles list
hermes curator status
hermes curator run --dry-run
hermes curator run --background
hermes curator pin <skill>
hermes curator unpin <skill>
hermes curator restore <skill>
hermes curator backup --reason "before-refactor"
hermes curator rollback --list
hermes curator pause
/curator status
/reload-skills
hermes chat --toolsets skills -q "Use the X skill to do Y"
```

**Config keys:** `skills.external_dirs`, `skills.config.*`, `skills.template_vars`, `skills.inline_shell`, `skills.inline_shell_timeout`, `curator.enabled`, `curator.interval_hours`, `curator.min_idle_hours`, `curator.stale_after_days`, `curator.archive_after_days`, `curator.backup.enabled`, `curator.backup.keep`, `auxiliary.curator.provider`, `auxiliary.curator.model`, `auxiliary.curator.timeout`, `terminal.env_passthrough`, `quick_commands`, `model_aliases`

**Business hooks:**

- Lead-gen / SEO: research/arxiv, research/blogwatcher (RSS monitoring), social-media/xurl (X/Twitter post+search), media/youtube-content (transcript->thread/blog), creative/humanizer (strip AI-isms from outbound copy), optional research/domain-intel + osint-investigation for prospect recon, optional research/duckduckgo-search / searxng-search as free web-search fallbacks.
- Email outbound: email/himalaya (IMAP/SMTP from terminal), productivity/google-workspace (Gmail via gws CLI), optional email/agentmail (agent-owned inbox for autonomous send/receive).
- Voice / receptionist: optional productivity/telephony (Twilio number + SMS/MMS + AI outbound calls via Bland.ai/Vapi) is the core building block; pair with curator-pinned custom call-script skills.
- Trading: optional finance/stocks (Yahoo quotes), finance/dcf-model, lbo-model, comps-analysis, 3-statement-model, excel-author/pptx-author for model-backed decks; optional blockchain/evm, hyperliquid, solana for on-chain data.
- Receptionist / scheduling: devops/webhook-subscriptions (event-driven agent runs), productivity/linear, productivity/notion, productivity/airtable for CRM-style record CRUD, plus the /cron + scheduled-tasks surface.
- Web-design contractor sites: creative/popular-web-designs (54 real design systems as HTML/CSS), creative/claude-design + creative/sketch (HTML mockups/variants), creative/design-md (DESIGN.md token specs), optional web-development/page-agent; the user's own agent-created devops/motion-audit + pass-verification skills already operationalize the King Maker verification loop.

**Reference**

##### Hermes Skills System (v0.14.0, this install)

**What a skill is.** An on-demand markdown knowledge doc (`SKILL.md` + optional `scripts/`, `references/`, `templates/`, `assets/`) that teaches the agent a workflow. Compatible with the agentskills.io open standard. Skills are *procedural* memory (how-to); plain memory is *factual* (auto-injected every session).

**Storage (Windows real path).** All skills live in `C:/Users/josep/AppData/Local/hermes/skills/` (docs say `~/.hermes/skills/`). Sidecar files in that dir: `.bundled_manifest` (name→origin-hash of seeded bundled skills), `.usage.json` (curator telemetry), `.curator_state`, `.hub/` (`lock.json`, `taps.json`, `audit.log`, `quarantine/`, `index-cache/`). Bundles live in `~/.hermes/skill-bundles/<slug>.yaml`.

**Progressive disclosure.** Level 0 `skills_list()` ≈3k-token index at session start; Level 1 `skill_view(name)` full body; Level 2 `skill_view(name, path)` a reference file. Agent-managed CRUD via the `skill_manage` tool (actions: create, patch [preferred], edit, delete, write_file, remove_file).

**Frontmatter contract.** Required: `name`, `description`. Common: `version`, `author`, `license`, `platforms:[macos|linux|windows]`. Under `metadata.hermes`: `tags`, `category`, `related_skills`, conditional-activation keys (`requires_toolsets`, `requires_tools`, `fallback_for_toolsets`, `fallback_for_tools`), and `config:` (non-secret settings → `config.yaml` `skills.config.*`). Top-level `required_environment_variables` (secrets → `.env`, auto-passed-through to sandboxes) and `required_credential_files` (OAuth files mounted into Docker/Modal). Legacy `prerequisites.env_vars` still works. Template tokens `${HERMES_SKILL_DIR}` / `${HERMES_SESSION_ID}` are substituted in the body; opt-in inline shell `` !`cmd` `` runs on the host (`skills.inline_shell: true`, off by default — security-sensitive).

**Install / discovery mechanics.** Bundled skills are copied from the repo on install and re-synced on `hermes update` (user-modified skills, detected by hash mismatch vs `.bundled_manifest`, are skipped forever; `hermes skills reset <name>[ --restore]` is the escape hatch). Hub sources: `official`, `skills-sh`, `well-known`, `github` (default taps: openai/anthropics/huggingface/VoltAgent/garrytan), `clawhub`, `lobehub`, `browse-sh`, direct `url`. Security scanner + 4 trust levels (builtin/official/trusted/community); `--force` overrides non-dangerous blocks only. External dirs via `skills.external_dirs` (local wins on name collision). Bundles group skills under one slash command and take precedence over same-named skills.

**Curator.** Maintains ONLY agent-created skills (anything not in `.bundled_manifest` or `.hub/lock.json`). Inactivity-triggered (default `interval_hours:168`, `min_idle_hours:2`); first real run deferred one interval after install (current `.curator_state` shows `run_count:0`, deferred). Two phases: deterministic transitions (`stale_after_days:30`, `archive_after_days:90`→`skills/.archive/`) then an aux-model LLM review (`auxiliary.curator`, max 8 iters). Never deletes. Pre-run tar.gz snapshots in `skills/.curator_backups/`; `hermes curator rollback`. Pin to protect: `hermes curator pin <name>`. **Gotcha:** hand-written skills are indistinguishable from agent-saved ones — pin them before first run.

##### Full on-disk skills tree (this machine)

**95 `SKILL.md` files = 90 bundled (per `.bundled_manifest`) + 5 agent-created** (all under `devops/`, confirmed by `.usage.json`). Dirs `diagramming/`, `domain/`, `gifs/`, `inference-sh/`, `autonomous-ai-agents/` also hold `DESCRIPTION.md` category descriptors (not skills). Note: the installed manifest ships 2 skills the bundled-catalog doc omits — `kanban-codex-lane` and `hermes-s6-container-supervision`.

**Bundled (90), by category:**
- **apple:** apple-notes, apple-reminders, findmy, imessage, macos-computer-use *(all macOS-only — hidden on Windows)*
- **autonomous-ai-agents:** claude-code, codex, opencode (delegate coding to those CLIs), hermes-agent (configure/extend Hermes), kanban-codex-lane *(doc-omitted)*
- **creative (19):** architecture-diagram, ascii-art, ascii-video, baoyu-article-illustrator, baoyu-comic, baoyu-infographic, claude-design, comfyui, creative-ideation(ideation), design-md, excalidraw, humanizer, manim-video, p5js, pixel-art, popular-web-designs, pretext, sketch, songwriting-and-ai-music, touchdesigner-mcp
- **data-science:** jupyter-live-kernel
- **devops (bundled):** kanban-orchestrator, kanban-worker, webhook-subscriptions
- **dogfood:** dogfood (exploratory QA bug-hunting)
- **email:** himalaya (IMAP/SMTP CLI)
- **gaming:** minecraft-modpack-server, pokemon-player
- **github (6):** codebase-inspection, github-auth, github-code-review, github-issues, github-pr-workflow, github-repo-management
- **mcp:** native-mcp (connect MCP servers)
- **media:** gif-search (Tenor), heartmula, songsee, spotify, youtube-content
- **mlops (9):** audiocraft, segment-anything, dspy, llama-cpp, lm-evaluation-harness, obliteratus, vllm, weights-and-biases, huggingface-hub
- **note-taking:** obsidian
- **productivity (9):** airtable, google-workspace, linear, maps, nano-pdf, notion, ocr-and-documents, powerpoint, teams-meeting-pipeline
- **red-teaming:** godmode (jailbreak prompts)
- **research:** arxiv, blogwatcher, llm-wiki, polymarket, research-paper-writing
- **smart-home:** openhue (Philips Hue)
- **social-media:** xurl (X/Twitter)
- **software-development (12):** debugging-hermes-tui-commands, hermes-agent-skill-authoring, hermes-s6-container-supervision *(doc-omitted)*, node-inspect-debugger, plan, python-debugpy, requesting-code-review, spike, subagent-driven-development, systematic-debugging, test-driven-development, writing-plans
- **yuanbao:** yuanbao

**Agent-created (5, devops/, curator-managed, NOT bundled):** motion-audit, pass-verification, pass-verification-fleet, post-pass-verification, findings-reply-format — these encode the user's King Maker contractor-site verification loop.

**Optional (not installed; via `hermes skills install official/<cat>/<skill>`):** notable categories are finance (excel-author, dcf-model, lbo-model, merger-model, comps-analysis, 3-statement-model, pptx-author, stocks), a large mlops set (~40: trl, unsloth, peft, vllm-adjacent, vector DBs chroma/faiss/pinecone/qdrant, whisper, clip, llava, stable-diffusion, flash-attention), blockchain (evm, solana, hyperliquid), research (duckduckgo-search, searxng-search, osint-investigation, domain-intel, scrapling, drug-discovery, bioinformatics), security (1password, sherlock, oss-forensics), productivity (shopify, telephony, canvas, memento-flashcards), creative (blender-mcp, hyperframes, meme-generation, kanban-video-orchestrator), and devops (docker-management, watchers, pinggy-tunnel, inference-sh-cli).

---

## Messaging gateways & platform adapters

> A single long-running gateway process connects Hermes to 20+ chat platforms (Telegram, Discord, Slack, WhatsApp, Signal, SMS, Email, Matrix, Teams, Google Chat, Home Assistant, ntfy, webhooks, and more), turning each inbound message into an authorized, session-scoped agent run with voice-memo transcription, group/DM routing, and cross-platform delivery.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Inbound message → agent run pipeline | Each platform adapter normalizes a raw event into a MessageEvent, the gateway resolves a session key (agent:main:{platform}:{chat_type}:{chat_id}), runs the multi-layer authorization check, dispatches slash commands or spins up an AIAgent with the per-platform toolset (hermes-telegram, hermes-discord, etc.), then delivers the reply back through the adapter. | `hermes gateway (foreground) / hermes gateway start (service); message arrives from a connected platform` | Gateway reads config.yaml directly via YAML loader, NOT through the CLI's load_cli_config() defaults — keys present in CLI defaults but absent from the user's config.yaml can behave differently between CLI and gateway. |
| Allowlist + admin/user authorization | Default-deny. A user is authorized via per-platform allow-all flag (e.g. TELEGRAM_ALLOW_ALL_USERS), platform allowlist (TELEGRAM_ALLOWED_USERS, DISCORD_ALLOWED_USERS/ROLES, SLACK_ALLOWED_USERS member IDs, SIGNAL/SMS/WHATSAPP/EMAIL by phone/email, etc.), DM pairing, or global GATEWAY_ALLOW_ALL_USERS. A second tier (allow_admin_from + user_allowed_commands per scope) gates which slash commands non-admins may run; /help and /whoami are the always-allowed floor. | `Env vars in ~/.hermes/.env or gateway.platforms.<p>.extra in config.yaml; inspect with /whoami` | DM admin status does NOT imply group/channel admin — each scope (DM vs group) has its own admin list. If allow_admin_from is unset for a scope, command gating is disabled (backward-compat = everyone unrestricted). |
| DM pairing | Unknown DM senders receive a one-time cryptographic pairing code; operator approves with hermes pairing approve <platform> <CODE>. Codes expire after 1 hour, rate-limited (1 req/user/10min, max 3 pending/platform, 1-hour lockout after 5 failed approvals). State persists across restarts; stored chmod 0600. | `hermes pairing approve\|list\|revoke\|clear-pending <platform> [code\|user]` | Per-platform unauthorized_dm_behavior controls whether strangers get a pairing code ('pair', default) or silence ('ignore'). For a private WhatsApp/SMS number set 'ignore' so it doesn't reply to strangers with a code. |
| Home channel / cron + proactive delivery | Each platform has a home channel (TELEGRAM_HOME_CHANNEL, DISCORD_HOME_CHANNEL, SLACK_HOME_CHANNEL, MATRIX_HOME_ROOM, EMAIL_HOME_ADDRESS, etc.) where cron job output and background-task results land. Set via the /sethome chat command or env var. | `/sethome in a chat, or *_HOME_CHANNEL env var` | Cron deliveries are NOT mirrored into gateway session history (live in their own cron session to avoid message-alternation violations). On Telegram topic-mode DMs, root-chat cron lands in a system-only lobby — set TELEGRAM_CRON_THREAD_ID to a real topic. |
| Group vs DM routing & mention gating | DMs always get a response. Group/channel behavior is mention-gated: telegram.require_mention, DISCORD_REQUIRE_MENTION (true default), Slack channels require @mention inherently, MATRIX_REQUIRE_MENTION. Free-response channels/rooms, auto-threading (Discord/Slack/Matrix), per-user session isolation (group_sessions_per_user), and observe-only modes (Telegram observe_unmentioned_group_messages) tune this. | `config.yaml per-platform blocks (telegram:/discord:/slack:/matrix:) or *_REQUIRE_MENTION / *_FREE_RESPONSE_CHANNELS env vars` | Telegram bots have BotFather privacy mode ON by default — the bot only sees /commands and replies unless you disable privacy mode (or make it admin) AND remove+re-add it to the group (privacy state is cached at join). Discord needs Message Content Intent + Server Members Intent enabled in the Developer Portal or it sees empty message text. Slack needs message.channels/message.groups events + channels:history/groups:history scopes, then a reinstall + /invite. |
| Voice memo transcription (STT) → agent input | Inbound voice notes on Telegram/Discord/Slack/WhatsApp/Signal/Matrix are auto-transcribed and injected as text. Provider priority local(faster-whisper, no key) > groq(GROQ_API_KEY) > openai(VOICE_TOOLS_OPENAI_KEY). Setting stt.enabled:false skips transcription but still caches the audio file and passes its path to the agent ([The user sent a voice message: .../cache/audio/<hash>.ogg]) for custom diarization/archival pipelines. | `config.yaml stt.enabled / stt.provider; automatic on inbound voice` | Telegram public Bot API caps getFile at 20MB — long voice memos are rejected until you run a local telegram-bot-api daemon (--local mode, base_url under platforms.telegram.extra) which lifts the ceiling to 2GB. |
| Outgoing voice (TTS) + Discord voice channels | /voice on\|tts\|off makes the bot speak replies (Opus voice bubbles on Telegram/Discord/Matrix-MSC3245). /voice join makes a Discord bot enter a voice channel, listen via per-user audio streams, transcribe, run the agent, and speak back. TTS providers: edge(free), elevenlabs, openai, neutts, minimax. | `/voice [on\|off\|tts\|join\|leave\|status] chat command; config.yaml tts.provider` | Edge TTS outputs MP3 and needs ffmpeg to convert to Opus voice bubbles — without ffmpeg you get a rectangular audio file. Discord VC needs Opus codec (libopus) + discord.py[voice] (PyNaCl). |
| Webhook adapter (event → agent run) | HTTP server (default port 8644, /webhooks/<route>) accepts POSTs from GitHub/GitLab/Stripe/Supabase/etc., HMAC-validates, renders a {dot.notation} prompt template from the payload, optionally loads skills, runs the agent, and delivers the result. deliver_only:true skips the LLM and pushes the rendered template as a literal notification (zero tokens, sub-second). | `config.yaml platforms.webhook.extra.routes, or hermes webhook subscribe <name> ...` | Every route MUST have a secret or the adapter refuses to start; INSECURE_NO_AUTH only allowed on loopback bind. Rate-limited 30 req/min/route, 1MB body cap, 1-hour idempotency on X-GitHub-Delivery. Payloads are attacker-controlled — sandbox the gateway. |
| Cross-platform & scripted delivery (hermes send) | hermes send --to <platform[:chat_id[:thread_id]]> pushes text/files from any shell script/cron/CI to any configured platform, reusing gateway credentials. For bot-token platforms it calls the REST endpoint directly — no running gateway needed. The agent-side equivalent is the send_message tool (target='telegram:-100...'); plugin platforms need standalone_sender_fn for out-of-process cron sends. | `hermes send --to telegram:-100... 'msg' (CLI); send_message tool (agent); mcp__hermes__messages_send (this session's MCP)` | Plugin (non-built-in) platforms require a live gateway for hermes send since they depend on a persistent adapter. Channel-name targets (discord:#ops) resolve against ~/.hermes/channel_directory.json which only populates while the gateway runs. |
| Adding a platform adapter (plugin vs built-in) | Plugin path (recommended): a ~/.hermes/plugins/<name>/ dir with PLUGIN.yaml + adapter.py calling ctx.register_platform(...) — zero core changes; the registry auto-wires config parsing, auth, cron delivery, send_message, hermes config UI, system-prompt hints, chunking. Built-in path: a 20+ file checklist across gateway/config.py, run.py, toolsets.py, CLI, docs. | `register() entry point in plugins/<name>/adapter.py; reference impls plugins/platforms/{irc,teams,google_chat,line}` | All adapters subclass BasePlatformAdapter (connect/disconnect/send/get_chat_info) and call self.handle_message(event); never construct session keys manually — use build_session_key(). Callback/webhook platforms with tight deadlines (WeCom 5s, LINE 60s reply token) must ack immediately and deliver the real reply later via API. |

**Commands**

```bash
hermes gateway setup
hermes gateway
hermes gateway install
sudo hermes gateway install --system
hermes gateway start
hermes gateway stop
hermes gateway status
hermes gateway restart
hermes gateway stop --all
hermes pairing approve telegram XKGH5N7P
hermes pairing list
hermes pairing revoke telegram 123456789
hermes pairing clear-pending
hermes whatsapp
hermes slack manifest --write
hermes slack manifest --slashes-only
hermes webhook subscribe github-issues --events issues --deliver telegram --deliver-chat-id -100123456789
hermes webhook list
hermes webhook remove github-issues
hermes webhook test github-issues
hermes send --to telegram 'deploy finished'
hermes send --to discord:#ops --file /tmp/report.md
hermes send --to telegram:-1001234567890:17585 'threaded reply'
hermes send --list
hermes -p research gateway start
/sethome
/voice [on|off|tts|join|leave|status]
/platform list
/platform pause <name>
/platform resume <name>
/whoami
/topic
/background <prompt>
journalctl --user -u hermes-gateway -f
```

**Config keys:** `gateway.platforms.<platform>.enabled`, `gateway.platforms.<platform>.extra (token, allow_from, allow_admin_from, user_allowed_commands, group_allow_admin_from, group_user_allowed_commands)`, `gateway.platforms.<platform>.home_chat_id`, `gateway.platforms.<platform>.gateway_restart_notification`, `reset_by_platform.<platform> (mode, idle_minutes)`, `session_reset.mode / idle_minutes / at_hour`, `group_sessions_per_user`, `display.busy_input_mode (interrupt|queue|steer)`, `display.busy_ack_enabled`, `display.tool_progress (off|new|all|verbose)`, `display.background_process_notifications (all|result|error|off)`, `display.platforms.<platform>.cleanup_progress`, `display.platforms.telegram.notifications (important|all)`, `gateway.streaming.enabled / transport (edit|auto|draft|off)`, `stt.enabled / stt.provider / stt.local.model`, `tts.provider / tts.edge.voice / tts.elevenlabs.voice_id / tts.openai.voice`, `telegram.require_mention / mention_patterns / exclusive_bot_mentions / observe_unmentioned_group_messages / reactions / pretty_tables`, `telegram.allowed_chats / group_allowed_chats / group_allow_from / guest_mode`, `platforms.telegram.extra.base_url / base_file_url / local_mode / dm_topics / group_topics / ignore_root_dm / disable_link_previews / fallback_ips`, `discord.require_mention / thread_require_mention / free_response_channels / auto_thread / history_backfill / allow_mentions / allowed_channels / channel_prompts / channel_skill_bindings`, `slack.require_mention / strict_mention / allowed_channels / reply_to_mode / channel_prompts / channel_skill_bindings`, `slack.extra.reply_in_thread / reply_broadcast`, `matrix.require_mention / free_response_rooms / auto_thread / allowed_rooms`, `whatsapp.unauthorized_dm_behavior / reply_prefix`, `email.skip_attachments / platforms.email.skip_attachments`, `platforms.homeassistant.extra.watch_domains / watch_entities / watch_all / ignore_entities / cooldown_seconds`, `platforms.webhook.extra.routes / port / secret / rate_limit / max_body_bytes`, `unauthorized_dm_behavior (global) and <platform>.unauthorized_dm_behavior`, `platform_toolsets.<platform>`, `agent.clarify_timeout`

**Business hooks:**

- Receptionist / lead-gen capture: a customer texts the business's Twilio SMS number or WhatsApp line, the inbound message becomes an authorized agent run (SMS_ALLOWED_USERS or pairing gates it), the agent answers FAQs/books, and qualified-lead summaries auto-deliver to the team's Slack/Telegram home channel via send_message or cron deliver=.
- Voice receptionist: inbound Telegram/WhatsApp/Signal voice memos are auto-transcribed (local faster-whisper = zero API cost) and answered; replies can be spoken back as Opus voice bubbles (/voice tts). The SMS adapter shares Twilio credentials with the optional telephony skill, the bridge to actual phone-call handling.
- After-hours team assistant: a shared Telegram/Discord bot on a $5 VPS, per-user sessions (group_sessions_per_user), DM pairing for staff onboarding without restarts, Docker terminal backend for safety — exactly the team-Telegram-assistant tutorial pattern.
- Email-driven intake: a dedicated IMAP/SMTP mailbox turns inbound client emails into threaded agent replies (noreply/bulk senders auto-ignored), useful for email-based support or quote requests; EMAIL_ALLOWED_USERS gates who can trigger it.
- Webhook lead pipeline: a website form / Supabase / CRM webhook hits /webhooks/<route>; deliver_only:true pushes an instant 'new lead' notification to the owner's phone (Telegram/SMS) with zero LLM cost and sub-second latency, or runs the agent to enrich/triage before delivery.
- Trading / monitoring alerts: cron jobs or external monitoring webhooks push to a Telegram/Discord channel; hermes send replaces ad-hoc curl in watchdog scripts, and circuit-breaker auto-pause + restart notifications keep a 24/7 alerting bot observable.
- SEO / reporting cadence: scheduled cron agents generate a report and deliver it to a home channel or a specific Telegram forum topic / Slack channel, with per-channel skill bindings auto-loading the right reporting skill per channel.

**Reference**

##### Messaging Gateway & Platform Adapters (Hermes Agent v0.14.0)

The **gateway** is one long-running process (`gateway/run.py`, class `GatewayRunner`) that connects Hermes to 20+ messaging platforms, owns per-chat sessions, runs the cron scheduler (ticks every 60s), and routes voice/text/files. Built-in adapters live in `gateway/platforms/`: Telegram (python-telegram-bot, long-poll or webhook), Discord (discord.py), Slack (Bolt Socket Mode), WhatsApp (Baileys bridge, unofficial WhatsApp-Web), Signal (signal-cli HTTP/SSE), Matrix (mautrix, optional E2EE), Mattermost, Email (IMAP/SMTP), SMS (Twilio webhook), DingTalk, Feishu/Lark, WeCom(+callback), Weixin, BlueBubbles (iMessage), QQ, Yuanbao, Microsoft Teams (Bot Framework webhook), Google Chat (Pub/Sub pull), Home Assistant (WebSocket), ntfy, the inbound/outbound webhook adapter, and the OpenAI-compatible API server. LINE/IRC/Teams/Google-Chat also ship as reference **plugin** adapters under `plugins/platforms/`.

**Message flow:** adapter receives a raw event → normalizes to `MessageEvent` → base adapter's two-level guard (Level 1 `base.py` queues/interrupts if a session is active; Level 2 `run.py` intercepts `/stop`,`/new`,`/queue`,`/status`,`/approve`,`/deny`) → `_handle_message()` resolves the session key `agent:main:{platform}:{chat_type}:{chat_id}` via `build_session_key()` (thread-aware platforms append thread_id) → authorization → slash-command dispatch or `AIAgent` run with the platform toolset → reply delivered. **Never hand-build session keys.**

**Authorization** is default-deny, evaluated: per-platform allow-all flag → platform allowlist → DM pairing → global `GATEWAY_ALLOW_ALL_USERS` → deny. Allowlists are env vars (`TELEGRAM_ALLOWED_USERS`, `DISCORD_ALLOWED_USERS`/`DISCORD_ALLOWED_ROLES`, `SLACK_ALLOWED_USERS` member IDs, `SIGNAL/SMS/WHATSAPP/EMAIL/MATRIX/TEAMS/...`). A second tier (`allow_admin_from` + `user_allowed_commands`, per DM/group scope) gates slash commands through the live registry; `/help`+`/whoami` are the floor. **DM pairing**: strangers get a 1-hour code, operator runs `hermes pairing approve <platform> <CODE>`; `unauthorized_dm_behavior: pair|ignore` per platform.

**Group vs DM:** DMs always answer; channels/groups are mention-gated (`require_mention`, free-response channels, auto-threading, `group_sessions_per_user` per-user isolation). Top setup gotchas: **Telegram** BotFather privacy mode is ON by default (bot sees only `/cmds`+replies) and is cached at join — disable it (or make the bot admin) AND remove+re-add to the group; **Discord** needs Message Content + Server Members intents in the Developer Portal; **Slack** needs `message.channels`/`message.groups` events + `channels:history`/`groups:history` scopes, a reinstall, and `/invite`.

**Voice (the receptionist/voice surface):** inbound voice memos auto-transcribe via STT (priority local faster-whisper > Groq > OpenAI). `stt.enabled:false` keeps the cached audio path in the agent message for custom pipelines. Telegram's 20MB getFile cap is lifted to 2GB only with a local telegram-bot-api daemon. Outbound TTS (`/voice tts`) sends native Opus voice bubbles (Edge TTS needs ffmpeg); Discord can join a voice channel, listen per-user, and speak back.

**Inbound triggers beyond chat:** the **webhook** adapter (port 8644, `/webhooks/<route>`, HMAC-validated, `{dot.notation}` prompt templates, `deliver_only` for zero-token pushes) turns GitHub/Supabase/monitoring events into runs; **Home Assistant** forwards filtered `state_changed` events; **cron** fires scheduled prompts. **Outbound:** `send_message` tool, `hermes send` CLI (REST-direct, no gateway needed for bot-token platforms), and webhook `deliver:` route to any platform's home channel or explicit `chat_id`.

**Ops:** `/platform list|pause|resume`; each adapter has a circuit breaker (auto-pause on repeated failures, manual resume only); restart + session-resume notifications via `gateway_restart_notification`. Service mgmt: systemd (`hermes-gateway`, `journalctl --user -u hermes-gateway -f`) / launchd (`~/Library/LaunchAgents/ai.hermes.gateway.plist`); PID at `~/.hermes/gateway.pid`, profile-scoped.

**CRITICAL Windows gotcha:** all docs say `~/.hermes/`, but this install's `HERMES_HOME` is `C:/Users/josep/AppData/Local/hermes/` — config at `C:/Users/josep/AppData/Local/hermes/config.yaml`, skills under `.../hermes/skills`, sessions/state in `state.db`. Per-platform config also appears at top-level keys (`telegram:`, `slack:`, `discord:`, `matrix:`) in addition to `gateway.platforms.<p>.extra`; the confirmed installed config has `group_sessions_per_user: true`, `session_reset {mode: both, idle_minutes:1440, at_hour:4}`, `streaming.enabled:false`, and `platform_toolsets.<platform>`.

---

## Automation: cron, kanban, delegation, goals

> Hermes' autonomous-orchestration backbone: a gateway-ticked cron scheduler (with no-agent script mode), a durable SQLite-backed multi-profile Kanban board with auto-decomposition, synchronous subagent delegation, and a cross-turn persistent-goal (Ralph) loop.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Cron scheduled tasks (`cronjob` tool / `hermes cron` / `/cron`) | One-shot or recurring agent runs in fresh isolated sessions. Schedule formats: relative (`30m`,`2h`,`1d`), interval (`every 2h`), 5-field cron (`0 9 * * *`), ISO timestamp. Lifecycle: create/list/update/pause/resume/run/remove. Attach 0..N skills (loaded in order), pin `workdir` (injects AGENTS.md/CLAUDE.md, sets TERMINAL_CWD), pin `profile`, set `repeat`, `enabled_toolsets`, `context_from` (chain jobs), `model`/`provider` overrides. | ``cronjob(action="create", schedule="0 9 * * *", prompt=..., skills=[...], deliver="telegram")`; CLI `hermes cron create "every 2h" "..." --skill x --workdir /abs --profile p`; chat `/cron add 30m "..."` or plain natural language.` | Cron-run sessions have the `cronjob`, `messaging`/`send_message`, and `clarify` toolsets DISABLED (recursion guard) — a job cannot schedule more jobs or ask questions. Prompts MUST be fully self-contained (no chat memory). Natural-language schedules like 'daily at 9am' are NOT parsed at the CLI — use cron expr. Jobs only fire when the gateway is running (60s tick); a plain CLI chat does not tick. |
| No-agent (script-only) cron jobs | Zero-LLM watchdogs: a script runs on schedule, stdout delivered verbatim. Empty stdout = silent tick (the watchdog pattern); non-zero exit/timeout = error alert delivered so a broken watchdog can't fail silently; `{"wakeAgent": false}` on the last stdout line = silent tick. | ``cronjob(action="create", schedule="every 5m", script="mem.sh", no_agent=True, deliver="telegram")`; CLI `--no-agent --script mem.sh`. Agent auto-picks `no_agent=True` when message content is fully script-determined.` | Scripts MUST live in `~/.hermes/scripts/` (enforced; abs paths and `../` rejected). Interpreter is by extension ONLY (shebangs ignored): `.sh`/`.bash`→`/bin/bash`, anything else→current Python. On Windows `/bin/bash` is unavailable, so prefer `.py` scripts. Script timeout default 120s (`cron.script_timeout_seconds` / `HERMES_CRON_SCRIPT_TIMEOUT`). |
| Cron delivery + `[SILENT]` + `wrap_response` | Agent's final response auto-delivers to the configured target (no manual send_message needed; duplicate sends to the same target are suppressed). Targets: origin, local, telegram[:chat[:thread]], discord, slack, all platforms, comma-lists, `origin,all`. `[SILENT]` prefix suppresses delivery (still saved to output dir for audit). Default wrapper adds a header/footer. | ``deliver=` param / `--deliver`; `cron.wrap_response: false` to strip wrapper; prompt instruction 'respond with [SILENT] if nothing changed'.` | Failed jobs always deliver regardless of `[SILENT]`. A prompt that says '[SILENT] if nothing changed' can accidentally swallow real output if the conditional is loose. Telegram root DM in topic mode rejects cron replies — set `TELEGRAM_CRON_THREAD_ID` to a forum topic. |
| Kanban multi-profile collaboration board | Durable SQLite work-queue + state machine in `~/.hermes/kanban.db` shared across all profiles. Tasks (`triage\|todo\|ready\|running\|blocked\|done\|archived`), parent→child links (auto-promote todo→ready when all parents done), comments (the inter-agent protocol, re-read on respawn), runs (one row per attempt with summary+metadata handoff), workspaces (scratch=ephemeral/deleted on complete, dir:<abs>=preserved, worktree=git). Multi-board, multi-tenant. Resumable: block→unblock, crash→reclaim. | `Humans/scripts/cron: `hermes kanban create "..." --assignee researcher [--parent id] [--workspace ...]`, `list`, `show`, `watch`, `stats`; chat `/kanban ...`; dashboard Kanban tab. Workers (model) drive it via the `kanban_*` toolset, never the CLI.` | Single-host ONLY — kanban.db is local SQLite, crash-detection assumes host-local PIDs; no multi-host board. `scratch` workspace is DELETED on completion — use `worktree:`/`dir:<abs>` to keep output. `dir:` must be absolute (relative rejected as confused-deputy). Dashboard `/api/plugins/` routes are UNAUTHENTICATED (localhost-only by design) — never `--host 0.0.0.0` on a shared box. |
| Kanban worker / orchestrator protocol + tool surface | Nine tools: kanban_show, kanban_list, kanban_complete, kanban_block, kanban_heartbeat, kanban_comment, kanban_create, kanban_link, kanban_unblock. Worker loop: kanban_show() → work in $HERMES_KANBAN_WORKSPACE → kanban_heartbeat during long ops → terminate with kanban_complete(summary, metadata, artifacts) or kanban_block(reason). Orchestrators fan out via kanban_create+kanban_link and step back (don't implement). Bundled `kanban-worker` + `kanban-orchestrator` skills encode the patterns; dispatcher auto-passes `--skills kanban-worker`. | `Dispatcher sets `HERMES_KANBAN_TASK` in the worker env, which flips on the task-scoped kanban toolset; orchestrator profiles enable the `kanban` toolset in config. CLI/dashboard equivalents route through the same `kanban_db` layer.` | A worker that exits status 0 while task is still `running` (answered without calling kanban_complete/block) triggers a `protocol_violation` event and auto-block — not a respawn. Long ops MUST kanban_heartbeat at least hourly or the task is reclaimed as `stale` after `dispatch_stale_timeout_seconds` (default 4h=14400). Bulk `complete a b c --summary X` is refused (handoff is per-run). |
| Kanban dispatcher + auto-decompose | Long-lived loop (in-gateway by default) ticking every 60s: reclaims stale/crashed claims, promotes ready tasks, atomically claims, spawns assigned profiles with HERMES_KANBAN_* env. Circuit breaker auto-blocks a task after `failure_limit` (default 2) consecutive spawn/run failures (or per-task `--max-retries`). Auto-decompose: `triage`-column tasks are fanned out by an orchestrator LLM into a routed child-task graph, capped at `auto_decompose_per_tick` (3). | ``hermes gateway start` hosts it; config `kanban.dispatch_in_gateway`, `dispatch_interval_seconds`, `failure_limit`, `auto_decompose`, `auto_decompose_per_tick`, `orchestrator_profile`, `default_assignee`; aux models `auxiliary.kanban_decomposer` / `triage_specifier` / `profile_describer`. Nudge now via `hermes kanban dispatch` / dashboard button.` | Standalone `hermes kanban daemon` is DEPRECATED (use the gateway; `--force` for one release). Running both a gateway dispatcher AND standalone daemon on the same db causes claim races. Decompose routing depends on per-profile descriptions (`hermes profile describe`); unknown assignee → routed to `default_assignee` or active default, NEVER left None. Dispatcher silently leaves tasks with unresolvable assignees on `ready` (shows as `stranded_in_ready`/`skipped_nonspawnable`). |
| Subagent delegation (`delegate_task`) | Spawns child AIAgent instances with fresh isolated context, own terminal, restricted toolsets; only the final summary returns to parent. Single task or parallel batch (`tasks=[...]`). Default 3 concurrent (ThreadPoolExecutor, configurable, floor 1, no hard ceiling), 50 max_iterations/child, 600s child idle timeout. Nested orchestration via `role="orchestrator"` gated by `max_spawn_depth` (1-3). | ``delegate_task(goal=..., context=..., toolsets=["terminal","file"])` or `delegate_task(tasks=[...])`; config under `delegation:` (model/provider override for cheaper subagents). Monitor live via `/agents` (alias `/tasks`) TUI overlay.` | SYNCHRONOUS and NOT durable — blocks the parent turn; if the parent is interrupted (new msg, /stop, /new) all children are cancelled (`status="interrupted"`) and work discarded. Use cronjob or terminal(background=True) for durable work. Subagents know NOTHING of parent history — pass everything in goal/context. Leaf children CANNOT call delegate_task, clarify, memory, send_message, execute_code. Batches over the limit return a tool error (not truncated). |
| Persistent goals (`/goal`, `/subgoal`) — the Ralph loop | A standing objective that survives across turns. After each turn a conservative auxiliary judge returns {done,reason}; if continue, Hermes auto-feeds a continuation prompt into the same session until done, paused/cleared, or the turn budget (default 20) is hit. `/subgoal` appends acceptance criteria mid-loop (judge must satisfy goal AND all subgoals). Fail-open: a broken judge → continue (budget is the backstop). | ``/goal <text>` (kicks off turn 1), `/goal status\|pause\|resume\|clear`, `/subgoal <text>\|remove N\|clear`; config `goals.max_turns`; judge model via `auxiliary.goal_judge`. Works on CLI and every gateway platform.` | Setting a NEW goal mid-run is rejected (must `/stop` first) to avoid racing continuations; status/pause/clear are mid-run safe. `/goal resume` RESETS the turn counter to zero. State persists in `SessionDB.state_meta` (survives `/resume`). Judge is biased conservative (false-negatives over false-positives). |
| Deliverable mode (artifacts in chat) | In a messaging gateway, the agent ships generated files as native attachments by mentioning an absolute/`~` path of a supported extension in plain text; the gateway extracts it, strips it from the visible message, and uploads (images/video inline, audio as voice, docs/data/decks/archives as files). Kanban workers can attach `artifacts=[...]` to kanban_complete to ride completion notifications. | `Just render to e.g. `/tmp/q3.png` and mention the path; nudge via AGENTS.md/CLAUDE.md or `agent.custom_instructions`. `kanban_complete(summary=..., artifacts=["/tmp/x.pdf"])`.` | Paths inside fenced code blocks/backticks are intentionally ignored (so code samples aren't mutilated). `.py`/`.log` and other source extensions are deliberately excluded. Files that don't exist on disk when the notifier runs are silently skipped. |

**Commands**

```bash
hermes cron create "every 2h" "Check server status" --skill blogwatcher --name "Status"
hermes cron create "every 5m" --no-agent --script memory-watchdog.sh --deliver telegram --name "mem"
hermes cron create "0 9 * * *" "Audit open PRs..." --workdir /home/me/projects/acme --profile night-ops
hermes cron list | hermes cron run <job_id> | hermes cron pause <job_id> | hermes cron resume <job_id> | hermes cron remove <job_id> | hermes cron status | hermes cron tick
/cron add 30m "Remind me to check the build"
/cron edit <job_id> --schedule "every 4h" --add-skill maps --clear-skills
hermes gateway start
hermes gateway install   (sudo hermes gateway install --system on Linux)
hermes kanban init
hermes kanban create "research AI funding" --assignee researcher --parent <id> --workspace worktree:<path> --tenant biz-a --idempotency-key key --skill translation --max-retries 3 --json
hermes kanban list [--mine] [--status S] [--assignee P] [--tenant T] | show <id> | watch | stats | runs <id> | tail <id> | log <id>
hermes kanban complete <id> --result "..." --summary "..." --metadata '{"changed_files":[...]}'
hermes kanban block <id> "need input" | unblock <id> | assign <id> <profile> | link <parent> <child> | archive <id>
hermes kanban boards create <slug> --name "..." --switch | boards list | boards switch <slug>
hermes kanban decompose <id> | specify <id> | dispatch --max 3 [--dry-run] | diagnostics | gc
hermes kanban heartbeat <id> --note "..."
hermes kanban notify-subscribe <id> --platform telegram --chat-id 123 --thread-id 7
/kanban create "write launch post" --assignee writer --parent t_research
/kanban unblock t_abc | /kanban comment t_abc "use 2026 schema" | /kanban list --mine
/goal Fix every failing test in tests/ and make sure run_tests.sh passes
/goal status | /goal pause | /goal resume | /goal clear
/subgoal add a regression test | /subgoal remove 1 | /subgoal clear
/agents   (alias /tasks)
hermes -p <profile> skills list | grep kanban-worker
hermes profile describe <name> --auto
```

**Config keys:** `cron.wrap_response`, `cron.script_timeout_seconds`, `cron.max_parallel_jobs`, `delegation.max_iterations`, `delegation.child_timeout_seconds`, `delegation.max_concurrent_children`, `delegation.max_spawn_depth`, `delegation.orchestrator_enabled`, `delegation.model`, `delegation.provider`, `delegation.base_url`, `delegation.api_mode`, `delegation.inherit_mcp_toolsets`, `delegation.subagent_auto_approve`, `goals.max_turns`, `kanban.dispatch_in_gateway`, `kanban.dispatch_interval_seconds`, `kanban.failure_limit`, `kanban.auto_decompose`, `kanban.auto_decompose_per_tick`, `kanban.dispatch_stale_timeout_seconds`, `kanban.orchestrator_profile`, `kanban.default_assignee`, `kanban.worker_log_rotate_bytes`, `kanban.worker_log_backup_count`, `kanban.stranded_threshold_seconds`, `auxiliary.kanban_decomposer`, `auxiliary.triage_specifier`, `auxiliary.profile_describer`, `auxiliary.goal_judge`, `dashboard.kanban.default_tenant`, `dashboard.kanban.lane_by_profile`, `dashboard.kanban.include_archived_by_default`, `dashboard.kanban.render_markdown`, `dashboard.plugins.kanban.enabled`, `approvals.cron_mode`, `HERMES_CRON_SCRIPT_TIMEOUT`, `HERMES_CRON_TIMEOUT`, `DELEGATION_MAX_CONCURRENT_CHILDREN`, `HERMES_KANBAN_DISPATCH_IN_GATEWAY`, `HERMES_KANBAN_BOARD`, `TELEGRAM_CRON_THREAD_ID`

**Business hooks:**

- Lead-gen / SEO sweeps: schedule a daily `cronjob` with the `contractor-ad-research`-style skill attached + `--deliver telegram`, gated by a `wakeAgent` pre-check script so you only pay LLM tokens when new ads/rankings appear; chain collect→rank→draft with `context_from` for a zero-touch pipeline.
- Email triage / receptionist: a persistent named profile (e.g. `inbox-triage`) as a Kanban fleet worker accumulating memory over weeks (pattern P4 long-running journal); cron fires hourly with a SQL/file `wakeAgent` gate so quiet inboxes cost nothing.
- Voice / receptionist after-hours monitoring: no-agent script-only cron (`no_agent=True`) heartbeats and threshold alerts (missed-call counts, queue depth) delivered verbatim to Slack/Telegram with empty-stdout silence — zero model spend on healthy ticks.
- Trading / market ops: `script`-collected price history (mechanical) + LLM reasoning layer on a `every 1h` cron with `[SILENT]` unless a >5% move; deliver to a dedicated Telegram topic via `telegram:chat:thread`.
- Multi-client agency (lead-gen at scale): one Kanban board per client via `--board <slug>` (hard isolation) or one specialist fleet serving N businesses via `--tenant`, with `dir:<abs>` workspaces per account — auto-decompose turns a dropped one-liner brief into a routed task graph across researcher/writer/reviewer profiles.
- Email outreach campaigns: orchestrator profile decomposes 'launch campaign X' into parallel research + copywriting + QA Kanban tasks; reviewer uses the `review-required:` block convention so a human approves before send, then `/kanban unblock` from a phone fires the next stage mid-turn.
- Deliverables to clients: deliverable mode ships generated charts/PDF reports/xlsx as native chat attachments (or Kanban `artifacts=` on completion) so a lead-gen or SEO report lands in Slack/Telegram as a downloadable file, no copy-paste paths.

**Reference**

##### Automation backbone (Hermes Agent v0.14.0)

Four cooperating primitives. **Scope discipline matters**: `delegate_task` is a synchronous in-turn fork-join; Kanban is durable cross-agent work; cron is scheduled detached runs; `/goal` is a same-session cross-turn loop.

###### Cron (`cronjob` tool / `hermes cron` / `/cron`)
Schedules run in **fresh isolated sessions** (no chat memory, prompts must be self-contained). Formats: relative (`30m`), interval (`every 2h`), 5-field cron (`0 9 * * *`), ISO timestamp. The gateway daemon ticks every **60s** (`_start_cron_ticker`); a plain CLI chat does NOT fire jobs. Jobs persist in `~/.hermes/cron/jobs.json` (atomic writes); output to `~/.hermes/cron/output/{job_id}/{ts}.md`. A file lock (`fcntl.flock`/`msvcrt.locking`) prevents double-ticks. Recursion guard: cron sessions DISABLE the `cronjob`, `send_message`/messaging, and `clarify` toolsets. Per-job toolset control via `enabled_toolsets` (wins over the `hermes tools` cron-platform config) for cost control. `workdir` injects AGENTS.md/CLAUDE.md and sets TERMINAL_CWD (serialized — TERMINAL_CWD is process-global); `profile` re-targets HERMES_HOME (also serialized). `context_from=[ids]` prepends upstream jobs' most-recent completed output (multi-stage pipelines). Provider recovery: inherits `fallback_providers` + credential-pool rotation.

**No-agent mode** (`no_agent=True`): a script runs on schedule, stdout delivered verbatim, zero tokens. Empty stdout = silent tick; non-zero exit/timeout = error alert; `{"wakeAgent": false}` last line = silent. The same `wakeAgent` gate works for LLM jobs via a pre-run `script=` (file/flag/SQL-count gates give a $0 decision whether to wake the model). Scripts MUST live in `~/.hermes/scripts/`; interpreter by extension only (shebangs ignored — `.sh`→bash, else Python). Delivery: `origin|local|telegram[:chat[:thread]]|discord|slack|...|all|origin,all`; `[SILENT]` prefix suppresses (still audited); `cron.wrap_response:false` strips the header/footer. Prompts are scanned for prompt-injection/exfiltration at create/update.

###### Kanban (multi-agent board)
Durable SQLite queue+state-machine at `~/.hermes/kanban.db` (boards: `~/.hermes/kanban/boards/<slug>/kanban.db`), shared across profiles. Statuses: `triage|todo|ready|running|blocked|done|archived`. Links auto-promote `todo→ready`. **Runs** = one row per attempt carrying `summary`+`metadata` structured handoff (children read the most-recent completed parent run). Workspaces: `scratch` (DELETED on complete), `dir:<abs>` (preserved; relative rejected), `worktree` (git, preserved). **Two surfaces over one `kanban_db` layer**: humans/cron/scripts use `hermes kanban`/`/kanban`/dashboard; the model uses nine `kanban_*` tools (show/list/complete/block/heartbeat/comment/create/link/unblock) flipped on by `HERMES_KANBAN_TASK` env or the `kanban` toolset. Worker contract: must terminate every run with `kanban_complete` or `kanban_block`; exiting 0 while `running` = `protocol_violation`→auto-block. Heartbeat ≥hourly or reclaimed `stale` after `dispatch_stale_timeout_seconds` (14400). Bundled `kanban-worker`/`kanban-orchestrator` skills (auto-synced; dispatcher adds `--skills kanban-worker`). Dispatcher (in-gateway by default) ticks 60s, circuit-breaks at `failure_limit` (2) consecutive failures (or per-task `--max-retries`). **Auto-decompose** (`auto_decompose:true`, capped `auto_decompose_per_tick:3`): orchestrator LLM fans `triage` tasks into a routed child graph using per-profile descriptions; unknown assignee → `default_assignee`/active default (never None). Single-host only. Dashboard `/api/plugins/` is unauthenticated (localhost) — never bind `0.0.0.0`.

###### Delegation (`delegate_task`)
Fresh-context child agents, own terminal, restricted `toolsets`; only the summary returns. Single or `tasks=[...]` parallel (default **3** concurrent via ThreadPoolExecutor, floor 1, no ceiling; over-limit batches error). `max_iterations` 50, `child_timeout_seconds` 600 (idle-only; resets on each API/tool call; zero-call timeout writes a diagnostic log). Leaf children CANNOT call delegate_task/clarify/memory/send_message/execute_code. Nested: `role="orchestrator"` gated by `max_spawn_depth` (1=flat default, max 3; 3×3 tree = 27 leaves — cost warning). **Not durable** — synchronous, dies with the parent turn; use cron/terminal(background) for durable work. `/agents` (alias `/tasks`) TUI overlay shows the live tree with per-branch cost/kill controls.

###### Goals (`/goal`, `/subgoal`)
Cross-turn Ralph loop: conservative `goal_judge` aux model returns `{done,reason}` each turn; continues until done/paused/cleared or `goals.max_turns` (20). Fail-open (broken judge→continue). `/subgoal` appends criteria mid-loop. New goal mid-run rejected (`/stop` first); `/goal resume` resets the counter; state in `SessionDB.state_meta`, survives `/resume`; prompt-cache-safe.

**Windows install note:** real paths are `C:/Users/josep/AppData/Local/hermes/` (config.yaml, skills, state.db) — docs say `~/.hermes/` (the profile HERMES_HOME). `.sh` no-agent scripts need `/bin/bash` (unavailable on Windows) → use `.py`. Live config confirms all defaults above.

---

## Tools & toolsets surface

> Hermes exposes ~70 built-in tools organized into named toolsets (core/composite/platform/dynamic) that gate the agent's full action surface — browser automation, code execution, delegation, media generation, voice, messaging, and more — configurable per-session, per-platform, and per-tool.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Browser automation (12-tool browser toolset) | Accessibility-tree-driven web control: browser_navigate/snapshot/click/type/scroll/press/back/get_images/console/vision, plus CDP-gated browser_cdp and browser_dialog. Snapshots return interactive elements with @e1-style ref IDs. Backends: local agent-browser, local Chromium-family via CDP (/browser connect), Browserbase, Browser Use, Firecrawl, Camofox. Hybrid routing auto-spawns a local sidecar for private/LAN URLs while cloud handles public ones. | `Tool calls (browser_*); CLI slash command /browser connect\|status\|disconnect; toolset enabled via toolsets:[hermes-cli, browser] in config.yaml (this machine has it). agent-browser CLI: npm install -g agent-browser` | browser_cdp and browser_dialog ONLY register when a CDP endpoint is reachable at session start (local Chrome/Edge/Brave/Chromium via /browser connect, browser.cdp_url, or Browserbase) — NOT on Camofox or default local agent-browser. browser_snapshot LLM-summarizes output over 8000 CHARACTERS (not pixels). No file downloads from browser. /browser connect is CLI-only — won't run in gateway/Telegram chats. On WSL2+Windows Chrome, prefer chrome-devtools-mcp over /browser connect. |
| Computer use (macOS desktop control) | Background macOS desktop automation via cua-driver (MCP over stdio): capture (SOM/vision/AX modes), click/drag/scroll/type/key/wait, list_apps, focus_app. Does NOT steal cursor or keyboard focus, doesn't switch Spaces. Works with any tool-capable model (Claude/GPT/Gemini/local vLLM). | `computer_use tool; enable via `hermes computer-use install` then `hermes -t computer_use chat`, or `hermes tools` -> Computer Use; add computer_use to toolsets` | macOS ONLY (uses private SkyLight/AX SPIs; nonexistent on Windows/Linux — use browser toolset cross-platform). Requires cua-driver on $PATH + Accessibility & Screen Recording grants. Destructive actions need approval; hard-blocks dangerous key combos and type patterns (curl\|bash, sudo rm -rf /). SOM element indices go stale after any state change — re-capture. Pin via HERMES_CUA_DRIVER_VERSION. |
| Code execution (programmatic tool calling) | execute_code runs a Python script in a child process that calls Hermes tools over a Unix-domain-socket RPC (from hermes_tools import ...). Collapses 3+ tool-call workflows into one turn; only print() output enters context. In-script tools: web_search, web_extract, read_file, write_file, search_files, patch, terminal (foreground only). | `execute_code tool; code_execution toolset; config code_execution.mode (project default \| strict), timeout (300s), max_tool_calls (50)` | LINUX & macOS ONLY — auto-disabled on Windows (no Unix domain sockets), agent falls back to sequential tool calls. Environment is scrubbed of secrets (vars matching KEY/TOKEN/SECRET/PASSWORD/CREDENTIAL/AUTH stripped) unless skill required_environment_variables or terminal.env_passthrough allowlists them. Scripts CANNOT call execute_code recursively, delegate_task, or MCP tools. Limits: 50KB stdout, 10KB stderr, 50 tool calls. |
| Subagent delegation | delegate_task spawns isolated child agents (fresh conversation, own terminal, restricted toolset) for parallel work; only final summary returns. Single task or tasks=[...] batch. | `delegate_task tool (agent-loop intercepted); delegation toolset; config delegation.max_concurrent_children (3), max_iterations (50), child_timeout_seconds (600), max_spawn_depth (1=flat), model/provider override` | SYNCHRONOUS and NOT durable — blocks the parent turn; interrupting parent cancels all children and discards work. For durable work use cronjob or terminal(background=True). Subagents start with ZERO parent context — pass everything in goal/context. Leaf children cannot call delegate_task, clarify, memory, send_message, execute_code. Nested delegation needs role='orchestrator' AND max_spawn_depth raised (>1). |
| Media generation (image_gen, video_gen, vision, video analyze) | image_generate (FAL.ai, 9 models incl. default flux-2/klein/9b, gpt-image-2, nano-banana-pro; landscape/square/portrait). video_generate (text-to-video + image-to-video; xAI Grok-Imagine or FAL Veo 3.1/Pixverse v6/Kling O3). vision_analyze (native pixels on vision models, aux describer on text-only). video_analyze (captions/scenes/timestamps). | `image_generate/video_generate/vision_analyze/video_analyze tools; config image_gen.model + use_gateway, video_gen plugins; `hermes tools` pickers. video & video_gen are opt-in (--toolsets video,video_gen)` | image_gen needs FAL_KEY (or Nous gateway). video_gen needs an active plugin + its credential (XAI_API_KEY / FAL_KEY) and is NOT in default hermes-cli set. image_generate is text-to-image only (no img2img/inpaint); FAL URLs expire in hours/days. Delivery emits MEDIA:<url> tag converted by platform adapters. |
| Voice (TTS + STT toolsets and providers) | text_to_speech tool returns a MEDIA: path delivered as a voice bubble. STT providers: local faster-whisper (free, no key), groq, openai. TTS providers: edge (free default), neutts (local), elevenlabs, openai, minimax. CLI mic loop, gateway voice replies, and Discord voice-channel bot. | `text_to_speech tool (tts toolset); STT auto-transcribes inbound voice; CLI/gateway /voice on\|off\|tts\|join\|leave\|status; config tts.provider, stt.provider, voice.record_key (ctrl+b on this machine)` | STT/TTS are config-driven, NOT agent-selectable per call. Needs system deps: portaudio (mic), ffmpeg (conversion), opus (Discord), espeak-ng (NeuTTS); pip extras hermes-agent[voice]/[messaging]/[tts-premium]. STT fallback order local>groq>openai. Whisper hallucination filter (26 phrases) strips phantom 'Subscribe'-type text. Keys: GROQ_API_KEY, VOICE_TOOLS_OPENAI_KEY (note the VOICE_TOOLS_ prefix), ELEVENLABS_API_KEY. |
| Toolset configuration model (core/composite/platform/dynamic) | Every tool belongs to exactly one toolset. Core = one logical group (file, terminal, web); Composite = bundles (debugging = file+terminal+web; safe = read-only research+media); Platform = full per-deploy config (hermes-cli default, hermes-acp, hermes-api-server, hermes-discord adds discord/discord_admin, hermes-feishu/hermes-yuanbao add their tools). Dynamic = mcp-<server> per MCP server + plugin + custom_toolsets. all/* = everything. | `CLI: hermes chat --toolsets web,file,terminal \| debugging \| all. config.yaml toolsets: list + custom_toolsets:. In-session: /tools list\|enable\|disable. Per-tool toggling: `hermes tools` curses UI (persists to config.yaml)` | `hermes tools` operates at the TOOL level (finer than toolsets) — a disabled tool is filtered out even if its toolset is enabled. This machine's config: toolsets: '[hermes-cli, browser]', disabled_toolsets: []. Many tools are check_fn-gated (hidden without their API key/binary). Subagents get a restricted toolset and several toolsets are hard-blocked for them regardless of request. |

**Commands**

```bash
hermes chat --toolsets web,file,terminal
hermes chat --toolsets debugging
hermes chat --toolsets all
hermes tools
hermes setup tools
/tools list
/tools disable browser
/tools enable homeassistant
hermes config set toolsets '["hermes-cli", "browser"]'
/browser connect
/browser connect ws://host:port
/browser status
/browser disconnect
hermes computer-use install
hermes computer-use install --upgrade
hermes computer-use status
hermes -t computer_use chat
npm install -g agent-browser
python batch_runner.py --dataset_file=data/prompts.jsonl --batch_size=10 --run_name=my_run --model=anthropic/claude-sonnet-4.6 --num_workers=4
python batch_runner.py --list_distributions
python batch_runner.py --run_name=my_run --resume
/voice on
/voice tts
/voice join
/voice status
hermes gateway
pip install "hermes-agent[voice]"
pip install "hermes-agent[tts-premium]"
```

**Config keys:** `toolsets`, `custom_toolsets`, `agent.disabled_toolsets`, `browser.cloud_provider`, `browser.auto_local_for_private_urls`, `browser.allow_private_urls`, `browser.cdp_url`, `browser.dialog_policy`, `browser.dialog_timeout_s`, `browser.record_sessions`, `browser.inactivity_timeout`, `browser.camofox.managed_persistence`, `browser.camofox.user_id`, `browser.camofox.session_key`, `browser.camofox.adopt_existing_tab`, `code_execution.mode`, `code_execution.timeout`, `code_execution.max_tool_calls`, `delegation.model`, `delegation.provider`, `delegation.max_concurrent_children`, `delegation.max_iterations`, `delegation.child_timeout_seconds`, `delegation.max_spawn_depth`, `delegation.orchestrator_enabled`, `image_gen.model`, `image_gen.use_gateway`, `video_gen`, `tts.provider`, `tts.edge.voice`, `tts.elevenlabs.voice_id`, `tts.neutts.model`, `stt.enabled`, `stt.provider`, `stt.local.model`, `voice.record_key`, `voice.silence_threshold`, `voice.silence_duration`, `x_search.model`, `terminal.env_passthrough`, `command_allowlist`, `mcp_servers`, `auxiliary.vision`

**Business hooks:**

- Lead-gen / contractor research: browser toolset (Browserbase cloud + local-sidecar hybrid routing) scrapes competitor sites and ad libraries behind anti-bot walls; web_search/web_extract for fast lookups; vision_analyze reads ad creative and screenshots; execute_code loops over search results and filters them in one turn without flooding context.
- Voice receptionist / voice assistant: full STT+TTS stack — local faster-whisper (zero-cost, no key) or Groq for transcription, Edge TTS free or ElevenLabs premium for replies; Discord voice-channel bot for live conversation; per-user access control via DISCORD_ALLOWED_USERS; text_to_speech emits MEDIA: voice bubbles on Telegram/WhatsApp.
- Email / outbound ops: messaging send_message routes across Telegram/Discord/Slack/WhatsApp; delegate_task fans out parallel research/drafting into isolated contexts; cronjob schedules durable recurring sweeps (daily briefings, Monday ad sweeps) that survive interrupts.
- SEO / web design audits: browser_console surfaces silent JS errors and runs JS expressions; browser_vision screenshots + AI-analyzes layout/CTAs; session recording (browser.record_sessions) captures WebM of audit runs; image_generate (Recraft V4 Pro / Ideogram) produces brand/typography mockups; video_generate animates concepts.
- Trading / data pipelines: execute_code runs Python with web_search/web_extract/terminal RPC for multi-step data fetch-filter-compute in a single turn (Linux/macOS only); batch_runner.py generates thousands of agent trajectories in parallel for backtesting/fine-tuning with per-prompt Docker images.
- Receptionist / scheduling: clarify asks the user disambiguating questions (multiple-choice), todo tracks multi-step jobs, cronjob + delegation orchestrate recurring intake-and-route workflows across messaging platforms.

**Reference**

##### Tools & Toolsets Surface (Hermes Agent v0.14.0)

**Authoritative sources:** `reference/tools-reference.md`, `reference/toolsets-reference.md`, `developer-guide/tools-runtime.md` + `browser-supervisor.md`, and the feature docs for browser/computer-use/code-execution/batch/voice/vision/image-generation.

###### Architecture
Every tool belongs to **exactly one toolset**. The registry (`tools/registry.py`) is self-populating: each `tools/*.py` calls `registry.register(name, toolset, schema, handler, check_fn, requires_env, …)` at import; `discover_builtin_tools()` AST-scans and imports them. `model_tools.get_tool_definitions(enabled, disabled, quiet)` resolves toolsets → tool-name set → `registry.get_definitions()`, which runs each `check_fn` (API key / binary / service present; exceptions = unavailable) and emits OpenAI schemas. `execute_code` and `browser_navigate` schemas are dynamically patched to reference only tools that passed filtering, preventing hallucination. `todo`, `memory`, `session_search`, `delegate_task` are intercepted by the agent loop before registry dispatch.

###### Toolset kinds
- **Core** — single group (`file`=read_file/write_file/patch/search_files; `terminal`=terminal/process; `web`=web_search/web_extract).
- **Composite** — `debugging`=file+terminal+web; `safe`=read-only research+media (web_search/web_extract/vision_analyze/image_generate, no writes/terminal/code).
- **Platform** — `hermes-cli` (default, full), `hermes-acp` (drops clarify/cronjob/image/send_message/tts/HA — IDE coding), `hermes-api-server` (drops clarify/send_message/tts), `hermes-discord` (+discord/discord_admin), `hermes-feishu` (+feishu_doc/drive), `hermes-yuanbao` (+yb_*), `hermes-gateway` (union of all).
- **Dynamic** — each MCP server → `mcp-<server>` toolset (tools prefixed `mcp_<server>_`); plugins via `ctx.register_tool()`; `custom_toolsets:` in config; `all`/`*` = everything.

**Config (this machine):** `toolsets: '[hermes-cli, browser]'`, `disabled_toolsets: []`. CLI: `--toolsets a,b`. In-session: `/tools list|enable|disable`. `hermes tools` is a curses UI operating at the **tool** level (finer than toolsets) — disabled tools are filtered even when their toolset is on.

###### The action surface (~70 tools)
- **browser** (12): navigate/snapshot/click/type/scroll/press/back/get_images/console/vision + CDP-gated `browser_cdp`/`browser_dialog`. Snapshots expose `@eN` ref IDs and are **LLM-summarized over 8000 characters** (not pixels — there is no documented 8000px/5MB image cap; the only Pillow use is WSLg clipboard BMP→PNG in vision.md). A persistent CDP supervisor (one WS per task) detects native dialogs (`pending_dialogs` in snapshot) and surfaces `frame_tree` (cap 30 frames, OOPIF depth 2). Backends: agent-browser local, local Chromium-family via `/browser connect`, Browserbase, Browser Use, Firecrawl, Camofox. `browser_cdp`/`browser_dialog` register **only when a CDP endpoint is reachable at session start** (not Camofox/default-local). `dialog_policy`: must_respond (default, 300s safety auto-dismiss) | auto_dismiss | auto_accept.
- **code_execution** (`execute_code`): Python child over Unix-socket RPC; in-script tools = web_search/web_extract/read_file/write_file/search_files/patch/terminal(fg). **Linux/macOS only**; Windows falls back to sequential calls. Secrets scrubbed; cannot recurse, delegate, or call MCP.
- **delegation** (`delegate_task`): isolated children, ≤3 concurrent default, **synchronous/non-durable**. For durable work use `cronjob` or `terminal(background=True, notify_on_complete=True)`.
- **computer_use**: background macOS control via cua-driver MCP; any tool-capable model; **macOS only**.
- **image_gen / video_gen / vision / video**: FAL image_generate (9 models); video_generate (xAI Grok-Imagine / FAL Veo·Pixverse·Kling, opt-in); vision_analyze (native pixels vs aux describer); video_analyze (opt-in).
- **tts** (`text_to_speech`) + **stt**: providers config-driven (TTS edge/elevenlabs/openai/neutts/minimax; STT local/groq/openai, fallback local>groq>openai). Keys: `GROQ_API_KEY`, `VOICE_TOOLS_OPENAI_KEY`, `ELEVENLABS_API_KEY`.
- Standalone/other: `memory`, `clarify`, `todo`, `session_search`, `skill_view/manage/list`, `cronjob`, `mixture_of_agents` (OPENROUTER_API_KEY), `send_message`, `terminal`/`process`, `web_search`/`web_extract` (EXA/PARALLEL/FIRECRAWL/TAVILY key), `x_search` (xAI), `homeassistant` (HASS_TOKEN), `discord`/`discord_admin`, `spotify` (7, OAuth), `feishu_*`, `yb_*`, `kanban` (9, dispatcher/profile-gated).

###### Batch processing
`batch_runner.py` (training-data/eval, not an agent tool) runs prompts in parallel → ShareGPT trajectories with tool stats; toolset **distributions** flip each toolset independently per prompt; content-based resume; per-prompt Docker images.

**Windows gotchas:** `execute_code` and `computer_use` are unavailable on Windows (Unix sockets / macOS SPIs). Browser and the rest work normally; this install runs `[hermes-cli, browser]`.

---

## MCP, ACP, API server, programmatic integration, webhooks (the integration backbone)

> Hermes wires to external systems five ways — as/with MCP, as an ACP editor server, as an OpenAI-compatible HTTP API, as an importable Python library, and via inbound HMAC-authenticated webhooks — plus three hook systems for lifecycle interception, making it the glue layer for n8n/Clay/Instantly/Vapi/Stripe automations.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Hermes consuming external MCP servers (client mode) | Connect Hermes to GitHub, Stripe, filesystem, databases, internal APIs etc. via stdio (command/args/env) or HTTP (url/headers) MCP servers. Per-server tool include/exclude allowlists, resource/prompt toggles, OAuth 2.1 PKCE (auth: oauth), sampling, parallel-call opt-in. Tools register as mcp_<server>_<tool>. | `mcp_servers: block in C:/Users/josep/AppData/Local/hermes/config.yaml; hermes mcp add <name> --url/--command [--auth oauth]; /reload-mcp in-session` | config.yaml on this machine has NO mcp_servers block yet — nothing is wired. include/exclude must use the ORIGINAL tool name (with hyphens/dots), not the sanitized mcp_ name. For npm servers npx/Node must be on PATH; uvx for Python servers. |
| Hermes AS an MCP server (messaging bridge) | Exposes Hermes's connected messaging platforms (Telegram/Discord/Slack/WhatsApp/Signal/Matrix) to any MCP client (Claude Code, Cursor, Codex). 10 tools: conversations_list, conversation_get, messages_read, attachments_fetch, events_poll, events_wait, messages_send, channels_list, permissions_list_open, permissions_respond. | `hermes mcp serve (stdio); register in client config e.g. ~/.claude/claude_desktop_config.json` | stdio-only (no HTTP server mode). Read ops (list/read/poll) work without the gateway running; SEND ops require a live gateway with connected adapters. Text-only sends — no media. Verified live: the mcp__hermes__* tools in this session are exactly these 10. |
| Inbound webhooks (lead forms, Stripe, n8n, Supabase) | HTTP server accepts POSTs, validates HMAC, renders payload into an agent prompt via {dot.notation} templates, runs the agent, and routes the response to 16+ delivery targets or back as a GitHub/GitLab comment. deliver_only:true skips the LLM entirely for zero-cost sub-second push notifications. | `platforms.webhook in config.yaml (enabled, port 8644, routes:); OR WEBHOOK_ENABLED=true env; OR dynamic hermes webhook subscribe <name>. POST to /webhooks/<route-name>` | Static config.yaml routes always win over dynamic ones; hermes webhook test only hits DYNAMIC subs, not config.yaml routes. GitHub uses HMAC X-Hub-Signature-256, GitLab uses plain X-Gitlab-Token match, generic uses X-Webhook-Signature. INSECURE_NO_AUTH only allowed on loopback bind. 30 req/min/route, 1MB body, 1h idempotency cache. Agent always runs full (and bills) even for ignored sub-actions. Prompt-injection risk — sandbox the gateway. |
| OpenAI-compatible HTTP API server | Exposes the full agent (terminal, files, web, memory, skills) as POST /v1/chat/completions, POST /v1/responses (stateful via previous_response_id / named conversation), plus a Runs API (POST /v1/runs, GET /v1/runs/{id}/events SSE, /stop) and a Jobs CRUD API (/api/jobs) for remote cron management. Inline image input supported; file upload not. | `API_SERVER_ENABLED=true + API_SERVER_KEY in ~/.hermes/.env, then hermes gateway. Default http://127.0.0.1:8642/v1, Bearer auth` | Config is ENV-VAR ONLY (config.yaml not supported yet). Full toolset incl. terminal = security risk; API_SERVER_KEY mandatory on non-loopback bind, CORS off by default. model field is cosmetic (real model set server-side). Stored responses cap at 100 (LRU). Per-profile multi-tenant via separate ports. |
| Python library embed (AIAgent) | Import run_agent.AIAgent for in-process use — agent.chat(str)->str or agent.run_conversation(...) for full message history. Constructor controls model, enabled/disabled_toolsets, ephemeral_system_prompt, max_iterations, skip_memory/skip_context_files. batch_runner.py for parallel ShareGPT trajectory generation. | `pip install git+https://github.com/NousResearch/hermes-agent.git; from run_agent import AIAgent` | ALWAYS set quiet_mode=True when embedding. NOT thread-safe — one AIAgent per thread/task. For stateless API endpoints set skip_memory=True + skip_context_files=True or it 401s/leaks state. Provider creds come from same env vars as CLI. |
| ACP editor integration | hermes acp runs a stdio JSON-RPC Agent Client Protocol server for VS Code / Zed / JetBrains, rendering chat, tool activity, file diffs, terminal, and approval prompts. Uses a curated hermes-acp toolset (excludes messaging/cron). Three-tier approvals incl. allow_session. | `pip install -e '.[acp]'; hermes acp \| hermes-acp \| python -m acp_adapter. Zed via ACP Registry (uvx --from 'hermes-agent[acp]==<v>' hermes-acp)` | Inherits Hermes's normal provider/creds — run hermes model first. stdout reserved for JSON-RPC, logs go to stderr. Browser tools need hermes acp --setup-browser (~400MB). Zed registry path requires uv on PATH. |
| TUI gateway JSON-RPC (full-control host protocol) | tui_gateway/server.py — the richest programmatic surface, exposing every Hermes feature (slash commands, approvals, clarify, session branch/compress, multi-agent) over stdio or WebSocket. Methods like prompt.submit, session.steer/branch/compress, command.dispatch, reload.mcp; streams message.delta, tool.start/progress/complete, approval.request events. | `stdio JSON-RPC to tui_gateway/server.py (or WebSocket via tui_gateway/ws.py). Drives the Ink TUI (hermes --tui)` | Use this (not the API server) when a custom host needs fine-grained session/approval control. There is NO --mode rpc flag — the three protocols (ACP/TUI-gateway/API) cover all cases. |
| Event hooks (gateway / plugin / shell) | Three lifecycle-interception systems: Gateway hooks (HOOK.yaml+handler.py, gateway-only, for logging/alerts/outbound webhooks); Plugin hooks (ctx.register_hook, CLI+gateway, can block tools via pre_tool_call or inject context via pre_llm_call); Shell hooks (hooks: block in config.yaml, any language, JSON-over-stdin/stdout protocol). | `Gateway: dirs under ~/.hermes/hooks/. Plugin: register() in ~/.hermes/plugins/. Shell: hooks: block in config.yaml + scripts in ~/.hermes/agent-hooks/. Inspect via hermes hooks list/test/doctor` | config.yaml hooks: is EMPTY on this machine. Shell hooks need first-use consent (or --accept-hooks / HERMES_ACCEPT_HOOKS=1 / hooks_auto_accept:true for non-TTY gateway/cron). Allowlist keys on command string not hash — script edits silently trusted. pre_tool_call (block) and pre_llm_call (inject) are the only return-value-honored hooks. |

**Commands**

```bash
hermes mcp serve
hermes mcp add <name> --url <URL> --auth oauth
hermes mcp add codex --preset codex
hermes mcp list / test <name> / login <name> / configure <name>
/reload-mcp
hermes gateway run
hermes gateway setup
hermes webhook subscribe <name> --events issues --prompt "..." --deliver telegram --deliver-chat-id <id> --deliver-only
hermes webhook list / remove / test <name>
hermes acp
hermes-acp
python -m acp_adapter
hermes acp --setup-browser --yes
hermes -z "<prompt>"
hermes chat -q "..." --quiet
python batch_runner.py --input prompts.jsonl --output results.jsonl
hermes setup --portal
hermes portal status / tools
hermes hooks list / test <event> / doctor / revoke <command>
curl http://localhost:8642/v1/chat/completions -H "Authorization: Bearer <key>"
curl http://localhost:8644/health
hermes mcp add chrome-devtools-win --command cmd.exe --args /c npx -y chrome-devtools-mcp@latest --autoConnect
```

**Config keys:** `mcp_servers.<name>.command / args / env (stdio)`, `mcp_servers.<name>.url / headers (HTTP)`, `mcp_servers.<name>.auth: oauth`, `mcp_servers.<name>.enabled / timeout / connect_timeout / supports_parallel_tool_calls`, `mcp_servers.<name>.tools.include / exclude / resources / prompts`, `mcp_servers.<name>.sampling.enabled / model / max_tokens_cap / max_rpm`, `platforms.webhook.enabled`, `platforms.webhook.extra.host / port / secret / rate_limit / max_body_bytes`, `platforms.webhook.extra.routes.<name>.secret / events / prompt / skills / deliver / deliver_extra / deliver_only`, `platforms.msgraph_webhook.enabled / extra.client_state / accepted_resources / allowed_source_cidrs`, `hooks.<event_name> (matcher / command / timeout)`, `hooks_auto_accept`, `delegation.inherit_mcp_toolsets`, `approvals.mcp_reload_confirm`, `memory.provider`, `context.engine`, `plugins.disabled`, `web.use_gateway / image_gen.use_gateway / tts.use_gateway / browser.use_gateway (Nous Tool Gateway)`

**Business hooks:**

- LEAD-GEN: a website contact form (or Typeform/Webflow) POSTs to a Hermes webhook route → agent qualifies/enriches the lead and deliver: telegram/slack/email routes it to the owner; or deliver_only:true for an instant zero-LLM 'new lead' ping.
- STRIPE/BILLING: Stripe webhook → Hermes webhook route (HMAC X-Webhook-Signature) fires on payment events → agent posts to Slack #revenue or triggers a follow-up; pair with the Stripe MCP server (exclude delete_customer/refund_payment) for outbound queries.
- n8n/CLAY/INSTANTLY orchestration: n8n HTTP Request node → Hermes /v1/chat/completions or /v1/runs (SSE progress) as a reasoning step in a no-code pipeline; or n8n posts to a webhook route. Clay/Instantly enrichment data dumped via {__raw__} into the prompt.
- VAPI/VOICE: Vapi end-of-call webhook → Hermes webhook route summarizes the transcript and delivers to CRM/Slack; or expose Hermes via the API server as Vapi's custom LLM backend (OpenAI-compatible /v1/chat/completions).
- EMAIL/RECEPTIONIST: email platform enabled as a deliver target; inbound triggers via webhook routes; the hermes mcp serve bridge lets a separate Claude/Codex agent read+send across the client's messaging channels.
- SEO/MONITORING: Grafana/Datadog/Search-Console alert webhooks → deliver_only:true push to Discord/Telegram; or scheduled Jobs API (/api/jobs) drives recurring SEO audit runs from a remote dashboard.
- GITHUB/DEV agency ops: built-in github_comment delivery + gh CLI for automated PR review on every push (webhook or cron-poll variant).

**Reference**

##### Hermes Integration Backbone (v0.14.0, verified against on-disk docs + live config)

Hermes exposes **five** integration surfaces. The installed `config.yaml` (`C:/Users/josep/AppData/Local/hermes/config.yaml`) currently has **no `mcp_servers`, no `platforms`, and empty `hooks`** — every integration below is documented and supported but not yet wired on this machine.

###### MCP — both directions
**As a client:** add servers under `mcp_servers:` in config.yaml. Two transports: stdio (`command`/`args`/`env`) and HTTP (`url`/`headers`). Tools register as `mcp_<server>_<tool>` (hyphens/dots → underscores). Per-server `tools.include`/`exclude` (include wins), `tools.resources`/`prompts` toggles (capability-aware — only registered if the server actually supports them), `supports_parallel_tool_calls`, `sampling`, and `auth: oauth` (full PKCE/DCR/refresh, tokens at `~/.hermes/mcp-tokens/<server>.json`). **Gotcha:** filters use the *original* MCP tool name, not the sanitized one. Reload with `/reload-mcp`; OAuth flows need `hermes mcp login <server>` from a fresh terminal (in-session auto-reload has a 30s timeout, too short for interactive auth). WSL→Windows Chrome bridging uses `chrome-devtools-mcp` over cmd.exe.

**As a server:** `hermes mcp serve` (stdio only) exposes Hermes's messaging bridge as **10 tools** (`conversations_list`, `conversation_get`, `messages_read`, `attachments_fetch`, `events_poll`, `events_wait`, `messages_send`, `channels_list`, `permissions_list_open`, `permissions_respond`) to Claude Code/Cursor/Codex. Verified live: this session's `mcp__hermes__*` tools match exactly. Reads work without the gateway; sends need it running. Text-only, no HTTP mode.

###### Webhooks — the inbound-trigger workhorse (critical for verticals)
The `webhook` gateway platform runs an HMAC-authenticated HTTP server (default `:8644`, path `/webhooks/<route>`). Each route: `secret` (required, falls back to global), `events` (filters `X-GitHub-Event`/`X-GitLab-Event` header only — NOT sub-actions), `prompt` (with `{dot.notation}` and `{__raw__}` full-payload token), optional `skills` (only first loads), `deliver` (16+ targets: `github_comment`, `telegram`, `discord`, `slack`, `signal`, `sms`, `whatsapp`, `matrix`, `email`, `log`, …), `deliver_extra`. **`deliver_only: true`** skips the LLM entirely — zero tokens, sub-second push, returns 200/502 so upstreams can retry. Dynamic routes via `hermes webhook subscribe` persist to `~/.hermes/webhook_subscriptions.json`, hot-reload without restart; static config.yaml routes win on name clash. Security: 30 req/min/route, 1MB body, 1h idempotency cache, `INSECURE_NO_AUTH` loopback-only. Payloads are attacker-controlled → sandbox the gateway. Separate `msgraph_webhook` platform (`:8646`, `clientState` auth) handles M365 Graph change notifications (Teams meetings, calendar).

###### API server — OpenAI-compatible HTTP
`API_SERVER_ENABLED=true` + `API_SERVER_KEY` in `.env`, then `hermes gateway` → `http://127.0.0.1:8642/v1`. Endpoints: `/v1/chat/completions` (stateless, SSE streaming with `hermes.tool.progress`), `/v1/responses` (stateful via `previous_response_id` or named `conversation`), Runs API (`POST /v1/runs` → `run_id`, `GET /v1/runs/{id}/events` SSE, `/stop`, `/approval`), Jobs CRUD (`/api/jobs` — remote cron management), `/v1/capabilities`, `/health`. Full toolset incl. **terminal** = security risk; key mandatory off-loopback, CORS off by default. Config is **env-var only**. Proxy mode (`GATEWAY_PROXY_URL`) enables split deployments. Pairs with Nous Tool Gateway (`hermes setup --portal`) so frontends get web/image/TTS/browser without separate keys.

###### Python library + ACP + TUI-gateway
`from run_agent import AIAgent` — `chat()`/`run_conversation()`; always `quiet_mode=True`; **one instance per thread**; `skip_memory`/`skip_context_files` for stateless endpoints. ACP (`hermes acp`, needs `.[acp]`) is stdio JSON-RPC for VS Code/Zed/JetBrains with the curated `hermes-acp` toolset and 3-tier approvals (`allow_session`). For maximum programmatic control use the **TUI gateway JSON-RPC** (`tui_gateway/server.py`, stdio or WebSocket) — exposes slash commands, approvals, session branch/compress. No `--mode rpc` exists.

###### Hooks
Three systems: **gateway** (`HOOK.yaml`+`handler.py`, gateway-only, lifecycle events `gateway:startup`/`agent:*`/`command:*`), **plugin** (`ctx.register_hook`, CLI+gateway; `pre_tool_call` blocks, `pre_llm_call` injects context, `transform_*` rewrites output), **shell** (`hooks:` in config.yaml, any language, JSON over stdin/stdout). Shell hooks need consent (`hermes hooks`, or `HERMES_ACCEPT_HOOKS=1` for cron/gateway). All are non-blocking — a broken hook never crashes the agent.

---

## Memory, models, providers, secrets (the cost/reliability/persistence layer)

> Hermes layers bounded built-in memory (MEMORY.md/USER.md) plus FTS5 session search and 8 optional external memory providers on top of a 40+ provider model stack, hardened by credential-pool key rotation, cross-provider fallback chains, and Bitwarden-backed secret injection.

**Capabilities**

| Capability | What it does | How invoked | Gotcha |
|---|---|---|---|
| Built-in persistent memory (MEMORY.md + USER.md) | Two bounded, agent-curated files injected into the system prompt as a frozen snapshot at session start. MEMORY.md = agent's notes (2,200 chars / ~800 tok); USER.md = user profile (1,375 chars / ~500 tok). Stored in ~/.hermes/memories/. | `Always-on; agent self-manages via the `memory` tool (add/replace/remove). Config: memory.memory_enabled, memory.memory_char_limit, memory.user_char_limit.` | Frozen-snapshot pattern: mid-session writes persist to disk immediately but do NOT appear in the system prompt until the next session (preserves prefix cache). On Windows the docs say ~/.hermes/ but the real path is C:/Users/josep/AppData/Local/hermes/. |
| memory tool (add/replace/remove) | Agent edits its own memory. No `read` action — content is auto-injected. replace/remove use unique-substring matching via old_text, not full-text. | `Agent-initiated tool call, e.g. memory(action="replace", target="memory", old_text="dark mode", content="...").` | Adding past the char limit returns a hard error (must replace/consolidate first). Entries are security-scanned for injection/exfiltration/invisible-Unicode and silently de-duplicated; ambiguous old_text matching >1 entry errors out. |
| Session search (session_search tool) | FTS5 full-text search over every CLI + messaging session stored in state.db. Returns verbatim past messages (no summarization), with forward/backward scroll inside any found session. | `Agent calls session_search; user browses via `hermes sessions list`. Three shapes: discovery / scroll / browse.` | Unlimited capacity and free (no LLM calls, ~20ms query) — complements memory rather than competing. state.db lives at C:/Users/josep/AppData/Local/hermes/state.db on this machine. |
| External memory providers (8, one active at a time) | Honcho, OpenViking, Mem0, Hindsight, Holographic, RetainDB, ByteRover, Supermemory — add knowledge graphs, semantic search, auto fact-extraction, cross-session modeling. Run ALONGSIDE built-in memory; inject context, prefetch per-turn, sync turns, extract on session-end, mirror built-in writes, add provider tools. | ``hermes memory setup` (picker) or memory.provider: <name> in config.yaml. `hermes memory status` / `off`.` | Only ONE external provider active at once. Each needs its own dep (pip install honcho-ai / mem0ai / supermemory, brv CLI, openviking server) + key. Profile-isolated via $HERMES_HOME paths/config. |
| Honcho (flagship provider) | AI-native dialectic user modeling: two-layer context (base = session summary + representation + peer card; dialectic = LLM-synthesized reasoning, 1-3 passes). Multi-peer (one user peer + one AI peer per profile sharing a workspace). 5 tools: honcho_profile/search/context/reasoning/conclude. | `memory.provider: honcho + HONCHO_API_KEY. Three orthogonal knobs: contextCadence, dialecticCadence, dialecticDepth. `hermes honcho` subcommand only registers when Honcho is active.` | Config lives in honcho.json (resolution: $HERMES_HOME/honcho.json > ~/.hermes/honcho.json > ~/.honcho/config.json), NOT config.yaml. observationMode directional vs unified controls cross-peer modeling; server-side dashboard toggles override local defaults at session init. |
| Model slots: main + 8 auxiliary | Main model = what the agent thinks with; 8 aux slots (vision, web_extract, compression, skills_hub, mcp, approval, title_generation, triage_specifier) for cheap side-jobs. Each overridable independently with provider/model/base_url. | `Dashboard Models page, `hermes model`, /model in-session, REST /api/model/set, or config.yaml model: + auxiliary:. aux default = `auto` (uses main model).` | Config changes apply to NEW sessions only — running chats keep their model (hot-swap with /model). aux provider:auto + model:'' = use main; a bare 'main' is NOT valid for top-level model.provider (use custom). |
| 40+ inference providers | Nous Portal (recommended, 300+ models one OAuth), OpenAI Codex, GitHub Copilot (+ ACP), Anthropic native, OpenRouter, AI Gateway, NovitaAI, z.ai/GLM, Kimi, MiniMax (+OAuth/CN), Qwen/DashScope (+OAuth), xAI Grok (+OAuth), Gemini (API + OAuth), Bedrock, Ollama Cloud, NVIDIA NIM, GMI, StepFun, HuggingFace, LM Studio, plus any OpenAI-compatible custom endpoint (Ollama/vLLM/SGLang/llama.cpp/LiteLLM). | ``hermes model` interactive picker (OAuth opens browser; API-key providers prompt). Per-provider env vars in ~/.hermes/.env (OPENROUTER_API_KEY, GLM_API_KEY, etc.). config.yaml model.provider/default.` | Anthropic OAuth requires Claude Max + purchased extra-usage credits (Pro can't use it); else use ANTHROPIC_API_KEY. Copilot rejects classic ghp_* PATs. Legacy OPENAI_BASE_URL/LLM_MODEL env vars are REMOVED — config.yaml is the only source of truth. |
| Custom / self-hosted endpoints + context detection | Any /v1/chat/completions endpoint works. Named custom_providers (triple syntax /model custom:<name>:<model>), api_mode (chat_completions/anthropic_messages), extra_body passthrough. 9-step context-length resolution chain ending in models.dev + 128K default. | ``hermes model` → Custom endpoint, or custom_providers: list in config.yaml with base_url + key_env. context_length override per model.` | Local servers need ≥64,000 tokens context or Hermes rejects at startup. Ollama silently defaults to 4K context (<24GB VRAM) — set OLLAMA_CONTEXT_LENGTH. Tool calling needs explicit flags (vLLM --enable-auto-tool-choice --tool-call-parser hermes; llama.cpp --jinja). WSL2 needs mirrored networking or host-IP for Windows-hosted servers. |
| Fallback providers (cross-provider failover) | Switches to a DIFFERENT provider:model mid-session on errors. fallback_providers (plural list, tried in order) is canonical; fallback_model (singular) is legacy back-compat. Turn-scoped: primary restored each new message, fallback fires at most once per turn. | ``hermes fallback` (add/list/remove/clear) or fallback_providers: in config.yaml. Triggers on 429/5xx (after retries) and 401/403/404 (immediately).` | Config-only — no env var (deliberate). Does NOT apply to subagents (delegation uses delegation.provider/model override only) or cron jobs (per-job provider/model override only). Auxiliary tasks have their own separate fallback ladder. |
| Credential pools (same-provider key rotation) | Multiple API keys/OAuth tokens per provider with auto-rotation on rate/billing/auth errors. Strategies: fill_first (default), round_robin, least_used, random. Tried BEFORE fallback providers. Shared with delegated subagents. | ``hermes auth` wizard / `hermes auth add <provider>` / `hermes auth list`. Strategies in config.yaml credential_pool_strategies. Pool state in ~/.hermes/auth.json under credential_pool.` | Recovery: 429 retries same key once then rotates (1h cooldown); 402 rotates immediately (24h cooldown); 401 refreshes OAuth first. Borrowed/external secrets (env, Bitwarden) are reference-only in auth.json — only metadata + non-reversible fingerprint persist; manual + Hermes-owned OAuth keep durable tokens. |
| Bitwarden Secrets Manager (secret injection) | Pulls all provider keys from Bitwarden at process startup via the bws CLI instead of plaintext .env. One BWS_ACCESS_TOKEN bootstrap replaces N keys; rotate centrally in the web app. Secret Name = env var name. | ``hermes secrets bitwarden setup` (auto-downloads pinned bws v2.0.0 into ~/.hermes/bin/). config.yaml secrets.bitwarden.{enabled,project_id,server_url,override_existing,cache_ttl_seconds}.` | Machine-account access token is a high-value bearer credential (no 2FA, store in .env not config.yaml). override_existing:true by default so Bitwarden wins. EU accounts MUST set server_url=https://vault.bitwarden.eu or get invalid_client. Never blocks startup — warns and continues on failure. Only Bitwarden is supported (Vault/AWS/1Password are not yet built). |
| Model catalog (curated picker manifest) | Remote JSON manifest driving curated picker lists for OpenRouter + Nous Portal, so maintainers update lists without a CLI release. Pricing/context come from live APIs, not the manifest. | `Auto-fetched on `hermes model` / /model. config.yaml model_catalog.{enabled,url,ttl_hours}, cached at ~/.hermes/cache/model_catalog.json (24h TTL).` | Never breaks the picker — unreachable/invalid-schema manifest silently falls back to the in-repo snapshot bundled with your installed version. Per-provider override URLs supported for self-hosted curation. |

**Commands**

```bash
hermes memory setup
hermes memory status
hermes memory off
hermes sessions list
hermes honcho status
hermes honcho sync
hermes honcho strategy
hermes honcho mode
hermes config set memory.provider supermemory
hermes model
/model gpt-5.4 --provider openrouter --global
/model custom:together:deepseek-ai/DeepSeek-V3
hermes fallback
hermes fallback add
hermes fallback list
hermes auth
hermes auth list
hermes auth add anthropic --type oauth
hermes auth add openrouter --api-key sk-or-v1-...
hermes auth remove <provider> <index>
hermes auth reset <provider>
hermes secrets bitwarden setup
hermes secrets bitwarden status
hermes secrets bitwarden sync --apply
hermes secrets bitwarden disable
hermes setup --portal
hermes portal status
/gquota
```

**Config keys:** `memory.memory_enabled`, `memory.user_profile_enabled`, `memory.memory_char_limit`, `memory.user_char_limit`, `memory.provider`, `model.provider`, `model.default`, `model.model`, `model.base_url`, `model.api_mode`, `model.context_length`, `model.max_tokens`, `model_aliases`, `custom_providers`, `auxiliary.vision`, `auxiliary.web_extract`, `auxiliary.compression`, `auxiliary.<task>.fallback_chain`, `fallback_model`, `fallback_providers`, `credential_pool_strategies`, `delegation.provider`, `delegation.model`, `provider_routing.sort`, `openrouter.min_coding_score`, `model_catalog.enabled`, `model_catalog.url`, `model_catalog.ttl_hours`, `secrets.bitwarden.enabled`, `secrets.bitwarden.project_id`, `secrets.bitwarden.server_url`, `secrets.bitwarden.override_existing`, `secrets.bitwarden.cache_ttl_seconds`, `bedrock.region`

**Business hooks:**

- Receptionist / lead-gen continuity: USER.md plus a provider like Honcho (dialectic user modeling, per-directory session strategy) lets the agent recall a caller's prior context and preferences across sessions without re-asking.
- Voice/trading reliability: fallback_providers chain + credential pools keep a live voice or trading agent answering when the primary model 429s or a billing quota trips mid-turn — failover is seamless and conversation-preserving.
- Cost control for email/SEO batch work: route auxiliary tasks (compression, vision, title-gen, web_extract) to a cheap flash model (e.g. google/gemini-3-flash-preview on OpenRouter) while the main agent runs a premium model — cuts side-job spend ~50x.
- Multi-client agencies: profile-scoped memory (Supermemory {identity} container_tag, or Honcho per-profile AI peers) isolates each client's facts under one workspace so a 'coder' profile and 'writer' profile stay distinct against the same user.
- Fleet secret rotation: Bitwarden Secrets Manager injects all provider keys at startup from one BWS_ACCESS_TOKEN, so a lead-gen/email gateway VPS rotates credentials centrally without redeploying .env files.
- Persistent SEO/research recall: session_search (FTS5 over state.db, free, no LLM calls) lets a recurring SEO-audit or research agent answer 'did we cover this domain last month?' without burning context tokens.

**Reference**

##### Memory, Models, Providers, Secrets

This is Hermes's persistence/cost/reliability layer. Note: docs say `~/.hermes/` but on this Windows box the real root is `C:/Users/josep/AppData/Local/hermes/` (config.yaml, state.db, skills/ live there).

###### Persistent memory
Two agent-curated files inject into the system prompt as a **frozen snapshot at session start**: `MEMORY.md` (2,200 chars / ~800 tok, agent's environment/convention notes) and `USER.md` (1,375 chars / ~500 tok, user profile). Stored in `~/.hermes/memories/`, rendered with a `[NN% — used/limit chars]` header and `§`-delimited entries. The agent edits via the **`memory` tool** (`add`/`replace`/`remove`; no `read` — content is auto-injected). `replace`/`remove` use unique-substring `old_text` matching. **Critical gotcha:** mid-session writes hit disk immediately but only appear in the prompt next session (preserves prefix cache); tool responses show live state. Over-limit `add` returns a hard error → consolidate first. Entries are scanned for injection/exfiltration/invisible-Unicode and de-duped. Config: `memory.{memory_enabled,user_profile_enabled,memory_char_limit,user_char_limit}`.

**`session_search`** is the unbounded complement: FTS5 over all sessions in `state.db`, verbatim messages, free (no LLM, ~20ms), with scroll. Use memory for always-on facts, session_search for "did we discuss X?".

###### External memory providers (8, one active)
`hermes memory setup` / `memory.provider: <name>`. Run alongside built-in memory: inject context, prefetch per-turn, sync turns, extract on session-end, mirror built-in writes, add tools. **Honcho** (dialectic user modeling; base layer = session summary+representation+peer card, dialectic layer = 1–3 LLM passes; multi-peer per profile sharing a workspace; 5 tools; config in `honcho.json` NOT config.yaml; three orthogonal knobs `contextCadence`/`dialecticCadence`/`dialecticDepth`). **Supermemory** (semantic + profile, context-fencing, `{identity}` profile-scoped containers, multi-container). **Mem0** (server-side extraction). **Hindsight** (knowledge graph + unique `hindsight_reflect` synthesis; cloud or local PG). **Holographic** (local SQLite, FTS5 + HRR algebra + trust scoring, zero deps, free). **OpenViking** (self-hosted, tiered L0/L1/L2 loading, free/AGPL). **RetainDB** ($20/mo, hybrid search). **ByteRover** (`brv` CLI, local-first, pre-compression extraction). All profile-isolated via `$HERMES_HOME`.

###### Models: main + 8 auxiliary slots
Main = agent's thinking model; aux (vision, web_extract, compression, skills_hub, mcp, approval, title_generation, triage_specifier) default to `auto` (= main model). Override individually for cost: a flash model does title-gen/compression/vision at ~1/50th the cost. Set via dashboard Models page, `hermes model`, `/model` (in-session hot-swap), REST `/api/model/set`, or `config.yaml`. **Changes apply to new sessions only** — running chats keep their model.

###### Providers (40+)
`hermes model` is the setup wizard (OAuth/API-key); `/model` only switches already-configured providers. Recommended path: **Nous Portal** (`hermes setup --portal`, 300+ models + Tool Gateway, one OAuth). Native Anthropic OAuth needs **Claude Max + extra-usage credits** (not Pro). First-class API-key providers: OpenRouter, z.ai/GLM, Kimi, MiniMax, DeepSeek, xAI, Gemini, Bedrock, NVIDIA, HuggingFace, GMI, StepFun, Novita, Tencent, Xiaomi, Arcee, etc. Any OpenAI-compatible endpoint works via `custom_providers:` (named, triple syntax `/model custom:name:model`, `api_mode`, `extra_body`). **Local servers require ≥64K context** or startup rejects; Ollama silently defaults to 4K — set `OLLAMA_CONTEXT_LENGTH`. Tool calling needs explicit flags (vLLM `--enable-auto-tool-choice --tool-call-parser hermes`; llama.cpp `--jinja`). Legacy `OPENAI_BASE_URL`/`LLM_MODEL` env vars are **removed** — config.yaml is sole truth. Context-length resolution is a 9-step chain ending in models.dev → 128K default. **Model catalog** is a remote manifest for picker lists, cached 24h, with silent in-repo fallback.

###### Reliability stack (order: pool → fallback)
**Credential pools** rotate keys for the *same* provider: `hermes auth add/list/remove/reset`, strategies `fill_first`(default)/`round_robin`/`least_used`/`random` in `credential_pool_strategies`. 429→retry-once-then-rotate (1h cooldown); 402→rotate now (24h); 401→refresh OAuth first. State in `auth.json`; borrowed/Bitwarden secrets persist as reference + fingerprint only. Pools are shared with delegated subagents. **Fallback providers** switch to a *different* provider mid-session: `fallback_providers:` list (canonical) or legacy `fallback_model:`. Turn-scoped (primary restored each turn, fires once/turn). Config-only, no env var. **Does NOT cover subagents or cron** (those use per-job `provider`/`model` overrides). Auxiliary tasks have a separate capacity-error fallback ladder (`auxiliary.<task>.fallback_chain` → main model → raise).

###### Secrets (Bitwarden)
`hermes secrets bitwarden setup` auto-downloads pinned `bws v2.0.0` to `~/.hermes/bin/`. One machine-account `BWS_ACCESS_TOKEN` in `.env` → all keys pulled at startup (Secret Name = env var name). `secrets.bitwarden.{enabled,project_id,server_url,override_existing(=true),cache_ttl_seconds(=300),auto_install}`. **EU accounts must set `server_url=https://vault.bitwarden.eu`** (else `invalid_client`). Never blocks startup; warns and continues on failure. Token is a no-2FA bearer credential — keep in `.env`, not config.yaml. Only Bitwarden is implemented (Vault/AWS/1Password are roadmap).


---

# Part II — Business Vertical Playbook

Eight concrete architectures mapping Hermes to a revenue line. Each is buildable from the steps given.

---

## 1. Lead Vendor + Prebooked-Appointment Resale

> An always-on Hermes gateway is the orchestration/reasoning core: webhook routes ingest leads, cron + browser/Firecrawl source and an aux-model scores them, the agent books on Cal.com and posts to each buyer's GoHighLevel webhook, while a SQLite ledger (state.db side-tables) is reconciled against Stripe meter events — with human/n8n gates on every outbound SMS, every send to a buyer, and every dollar of billing.

**Hermes components:** `Always-on gateway (hermes gateway install → Windows Scheduled Task) as the 24/7 process`, `Inbound webhook adapter (platforms.webhook.extra.routes) — HMAC-verified routes for lead forms, Cal.com, and Stripe`, `Cron scheduler (cronjob tool) with wakeAgent script-gates for sourcing + nightly reconciliation/billing draft`, `No-agent (script-only) cron for zero-LLM ledger writes and health heartbeats`, `Subagent delegation (delegate_task) on a cheap model for parallel per-lead enrichment + scoring fan-out`, `Auxiliary model routing (auxiliary.vision/web_extract) — Gemini Flash for scoring/extraction while Opus handles edge cases`, `Skills: agent-created lead-qualification + buyer-routing + ledger-reconcile skills; bundled productivity/airtable or notion as buyer/CRM record store; creative/humanizer for outbound copy`, `Browser toolset + Firecrawl MCP (web.backend) for lead sourcing behind anti-bot walls`, `Hermes consuming external MCP servers (client mode) — Stripe MCP (read-only subset) for billing queries`, `FTS5 session_search + parent/child session lineage + group_sessions_per_user for per-lead/per-buyer context isolation`, `Anthropic system_and_3 prompt caching + per-session estimated_cost_usd columns for per-lead margin tracking`, `Telegram/Slack home channel + cron deliver= for the human approval gates and daily ledger digest`, `Checkpoints + /rollback as undo on agent-driven CRM/file mutations`, `fallback_providers + credential pools for gateway uptime during 429/5xx`

**External integrations**

| Tool | Role |
|---|---|
| Cal.com API v2 (api.cal.com/v2, cal-api-version: 2026-02-25) | Appointment-setting backbone. Hermes POSTs /v2/bookings to set the appointment; Cal.com fires HMAC-signed webhooks (x-cal-signature-256) BOOKING_CREATED / BOOKING_RESCHEDULED / BOOKING_CANCELLED / BOOKING_NO_SHOW_UPDATED / MEETING_ENDED into a Hermes webhook route — these are the events that mark an appointment billable, no-show, or refund-eligible in the ledger. |
| Stripe Billing Meters API (meter events, API ≥2025-03-31.basil) | Money layer. Each delivered/attended appointment posts a Stripe meter event (sum/count_distinct) against the buyer's metered subscription; Stripe aggregates to a monthly invoice. billing.meter.* + invoice.* webhooks hit a Hermes route for reconciliation. HUMAN-GATED: Hermes drafts the meter posting + invoice; a person approves before any charge. |
| GoHighLevel / LeadConnector inbound webhook (hooks.leadconnectorhq.com/v1/hooker/...) | Primary buyer delivery target. Hermes POSTs the qualified lead/appointment JSON (firstName, lastName, phone, email, custom fields) straight into each buyer contractor's CRM workflow. One webhook URL per buyer, stored in the buyer record. HUMAN/RULE-GATED send. |
| Twilio Programmable Messaging API + Consent Management API | Lead-side appointment-setting comms (confirmations, reminders). Inbound replies hit a Hermes SMS adapter/webhook. COMPLIANCE-CRITICAL: TCPA quiet hours 9pm–8am local + Consent Management opt-out check enforced in deterministic code, NOT left to the LLM; first-contact templated outbound is human-approved. |
| PeopleDataLabs Enrichment API (~$0.05–0.28/record) | Lead qualification/enrichment. Delegated subagents call PDL to append firmographics/contact validity to a raw lead before scoring. Cost-gated: only enrich leads that pass a cheap pre-filter to protect per-lead margin. |
| Firecrawl MCP (firecrawl_search / firecrawl_scrape / firecrawl_extract / firecrawl_monitor) | Lead sourcing + competitor/permit/listing scraping behind anti-bot walls, routed as web.backend extract. firecrawl_monitor_create watches target pages for new leads and can itself trigger a run. |
| n8n (HTTP Request node → Hermes /v1/chat/completions or webhook route; and as the deterministic money/send rail) | Deterministic orchestration around the irreversible actions Hermes should NOT freely do: dedupe, quiet-hours enforcement, the actual Stripe charge call after human approval, retry/queue for buyer POSTs. Hermes is the reasoning step; n8n is the safety rail. |

**Data flow:** TRIGGER: a raw lead enters either by inbound (website/Typeform form → /lead webhook route, instant deliver_only owner ping) or by outbound sourcing (cron + wakeAgent gate → browser/Firecrawl scrape or firecrawl_monitor hit). PROCESSING: the agent run writes the lead to state.db (raw), delegate_task fans out per-lead PeopleDataLabs enrichment on a cheap model (cost pre-filtered), the lead-qualification skill applies a deterministic rubric and writes a 0–100 score + reason (enriched → scored). For leads above the assigned buyer's threshold, Hermes drafts Twilio confirmation copy → deterministic TCPA quiet-hours + Consent-Management gate → HUMAN approves first-contact → Cal.com POST /v2/bookings sets the appointment (booked). A routing skill matches the appointment to the best-fit buyer record; the lead/appointment JSON is POSTed (via n8n retry queue, rule/human-gated) to that buyer's GoHighLevel webhook (delivered). OUTPUT/CLOSE-LOOP: Cal.com webhooks (MEETING_ENDED / BOOKING_NO_SHOW_UPDATED) flip the appointment to attended or no_show; a nightly reconciliation cron drafts Stripe meter-event postings + invoice preview and delivers a per-buyer ledger digest to the Telegram/Slack home channel; after HUMAN approval, n8n calls the Stripe Meters API (billable → invoiced), and Stripe invoice.* webhooks confirm paid back into billing_events. Every state transition is a row in the ledger; per-session estimated_cost_usd gives per-lead margin.

**Build sequence**

1. Provision the always-on core: hermes gateway setup + hermes gateway install as a Windows Scheduled Task; set terminal.backend docker for sourcing isolation; enable Telegram home channel (telegram:-1003758503447:2) for the approval/digest thread; turn on prompt_caching and per-session cost columns.
2. Stand up the ledger: create state.db side-tables (leads, buyers, appointments, deliveries, billing_events) via a no-agent script-only cron and a tiny SQL helper skill. Define the lifecycle states: raw → enriched → scored → booked → delivered → attended/no_show → billable → invoiced → paid. This is plain SQL, not LLM reasoning.
3. Wire inbound webhook routes (platforms.webhook.extra.routes) with per-route secrets: /lead (website/Typeform form POST, deliver_only fast path for instant owner ping + agent enrich), /calcom (HMAC x-cal-signature-256 verified, maps BOOKING_* events to ledger state), /stripe (HMAC X-Webhook-Signature, maps billing.meter.* + invoice.* to billing_events).
4. Build the sourcing pipeline: a cron job (e.g. every 2h) gated by a wakeAgent pre-check script so tokens are only spent when new candidates exist; browser + Firecrawl scrape/monitor collect raw leads; firecrawl_monitor_create on key sources. Chain collect→enrich→score with context_from.
5. Build qualification scoring: delegate_task fans out per-lead enrichment to a cheap delegation model calling PeopleDataLabs (cost-gated by a pre-filter); an agent-created lead-qualification skill applies a deterministic rubric (geography match, service match, contact validity, intent signal) and writes a 0–100 score + reason to the ledger. auxiliary.web_extract → Gemini Flash for extraction.
6. Build appointment-setting: for leads above the buyer's threshold, Hermes drafts the Twilio confirmation/reminder copy (creative/humanizer), a deterministic n8n/code layer enforces TCPA quiet hours + Consent Management opt-out, a HUMAN approves first-contact templates, then Hermes POSTs /v2/bookings to Cal.com and records the booking + buyer assignment.
7. Build buyer delivery + routing: store each buyer's GoHighLevel webhook URL + filters (geo, trade, daily cap, price) in the buyers table; a routing skill matches a booked appointment to the best-fit buyer; the send to hooks.leadconnectorhq.com goes through an n8n queue with retry, and is RULE/human-gated; delivery + timestamp written to the ledger.
8. Close the loop on delivery+billing: Cal.com MEETING_ENDED / BOOKING_NO_SHOW_UPDATED webhooks flip appointments to attended/no_show; a nightly cron drafts the Stripe meter-event postings + invoice preview and posts a per-buyer reconciliation digest to Telegram/Slack for human approval; only after approval does n8n call the Stripe Meters API. Stripe MCP (read-only subset) answers ad-hoc billing questions.
9. Add observability + safety: no-agent heartbeat cron (missed bookings, queue depth, undelivered leads) with [SILENT]-unless-anomaly delivery; checkpoints + /rollback enabled for CRM/file mutations; fallback_providers + credential pools for uptime; session_search + group_sessions_per_user so the agent never re-asks a known lead/buyer.

**Risks / gates**

- TCPA exposure on lead-side SMS: fines up to ~$1,500/violation. Quiet-hours (9pm–8am local) and Consent-Management opt-out MUST be enforced in deterministic code, never delegated to the LLM; first-contact templates require a standing human-approved allowlist. This is the single highest-liability surface.
- Money movement must be human-gated: Stripe charges customers real money and meter events post asynchronously with no synchronous accept confirmation. Hermes should DRAFT meter postings/invoices and reconcile, but the actual Stripe Meters API call belongs behind a human approval + deterministic n8n step, never an autonomous agent turn.
- Irreversible buyer sends: a POST to a buyer's GoHighLevel webhook can't be unsent and triggers their sales follow-up. Dedupe, daily-cap, and geo/trade filters must run in code before send; gate net-new buyer routing by a human until the routing rubric is trusted.
- Lead-quality / scoring drift: an LLM rubric can silently degrade and ship junk leads, causing buyer refunds and churn. Keep the score deterministic where possible, log score+reason to the ledger, and sample-audit; use save_trajectories to build a labeled dataset and tune a cheaper specialist scorer over time.
- Cost leakage on enrichment + sourcing: PeopleDataLabs at up to $0.28/record and premium-model scoring can invert per-lead margin. Enforce a cheap pre-filter before any paid enrichment, route enrichment/scoring to delegation + auxiliary cheap models, and watch per-session estimated_cost_usd.
- Webhook authenticity + idempotency: /calcom (x-cal-signature-256) and /stripe (X-Webhook-Signature) HMAC verification is mandatory; replays/duplicates must be idempotency-keyed against the ledger or appointments double-bill. Stripe meter events being async means reconciliation, not fire-and-forget, is required.
- Compliance of lead sourcing: scraping some sources (and reselling personal contact data) carries ToS/CCPA/legal exposure that is outside Hermes's competence — needs a human legal call on which sources and what consent basis are acceptable before automating them.
- Single-operator uptime: the gateway is one process on Windows. fallback_providers + credential pools cover model outages, but webhook ingestion downtime loses leads — needs --restart unless-stopped (Docker) or Scheduled-Task auto-restart plus the no-agent heartbeat alerting.

**Architecture**

##### Lead Vendor + Prebooked-Appointment Resale on Hermes

**Core idea.** Hermes is the reasoning/orchestration core, not the system of record and not the money rail. An always-on gateway ingests and reasons over leads; a deterministic ledger (SQLite) and n8n/code handle anything irreversible — money, sends, compliance.

###### Topology
Run `hermes gateway install` as a Windows Scheduled Task (or the `--restart unless-stopped` Docker pattern) so webhook ingestion and cron survive reboots. `terminal.backend: docker` isolates sourcing/scraping. The Telegram home channel (`telegram:-1003758503447:2`) is the human-gate + daily-digest surface. Enable `prompt_caching` (system_and_3) and the per-session `estimated_cost_usd` column for per-lead margin.

###### The ledger (the spine — deterministic SQL, not LLM)
state.db side-tables: `leads`, `buyers`, `appointments`, `deliveries`, `billing_events`. Lifecycle: `raw → enriched → scored → booked → delivered → attended/no_show → billable → invoiced → paid`. Writes happen via a no-agent script-only cron + a thin SQL helper skill — zero model spend, idempotency-keyed against webhook IDs so replays never double-book or double-bill.

###### Ingestion (webhook routes, HMAC-verified)
`platforms.webhook.extra.routes` with per-route secrets:
- `/lead` — website/Typeform POST. `deliver_only:true` gives an instant zero-LLM owner ping, then a full agent run enriches.
- `/calcom` — verify `x-cal-signature-256`; map `BOOKING_CREATED/RESCHEDULED/CANCELLED/NO_SHOW_UPDATED/MEETING_ENDED` to ledger state. These events define billable vs refund-eligible.
- `/stripe` — verify `X-Webhook-Signature`; map `billing.meter.*` + `invoice.*` to `billing_events`.

###### Sourcing → qualification
A `cronjob` (e.g. every 2h) gated by a `wakeAgent` pre-check script spends tokens only when new candidates exist. Browser toolset + Firecrawl (`firecrawl_search/scrape/extract`, `firecrawl_monitor_create`) collect raw leads behind anti-bot walls. `delegate_task` fans out per-lead enrichment on a **cheap** delegation model calling **PeopleDataLabs** (~$0.05–0.28/record) — gated by a cheap pre-filter to protect margin. An agent-created `lead-qualification` skill applies a deterministic rubric (geo match, trade match, contact validity, intent) → writes a 0–100 score + reason. `auxiliary.web_extract` → Gemini Flash; Opus only on edge cases.

###### Appointment-setting (COMPLIANCE GATE)
For leads above the buyer's threshold, Hermes drafts Twilio confirmation/reminder copy (`creative/humanizer`). **TCPA quiet hours (9pm–8am local) and Twilio Consent-Management opt-out are enforced in deterministic code, never by the LLM.** First-contact templates use a standing human-approved allowlist. Then Hermes `POST api.cal.com/v2/bookings` (`cal-api-version: 2026-02-25`, body: `start`, `attendee{name,email,timeZone}`, `eventTypeId`) and records booking + buyer assignment.

###### Buyer delivery + routing (RULE/HUMAN GATE)
Each buyer record stores a GoHighLevel inbound webhook URL (`hooks.leadconnectorhq.com/v1/hooker/...`) plus filters (geo, trade, daily cap, price). A routing skill picks best-fit; the actual POST runs through an **n8n retry queue** with dedupe + cap enforcement in code. Sends are irreversible — gate net-new routing behind a human until the rubric is trusted.

###### Delivery + billing close-loop (MONEY GATE)
Cal.com `MEETING_ENDED`/`BOOKING_NO_SHOW_UPDATED` flip appointments to attended/no_show. A nightly cron **drafts** Stripe meter-event postings + an invoice preview and delivers a per-buyer reconciliation digest to Telegram/Slack. **Only after human approval** does n8n call the Stripe Meters API (`billing/meter_events`); `invoice.*` webhooks confirm `paid`. Stripe MCP (read-only subset, exclude refund/delete) answers ad-hoc billing questions. Because meter events are async with no sync confirmation, this is reconciliation, not fire-and-forget.

###### What Hermes is good for vs not
**Good:** reasoning over messy leads, enrichment orchestration, scoring, routing decisions, drafting copy, reconciliation, observability, recall via `session_search`/`group_sessions_per_user`. **Not Hermes (deterministic/n8n/human):** the Stripe charge, the buyer POST, TCPA enforcement, dedupe/idempotency, legal sign-off on which sources are scrape-able and resaleable. **Safety:** checkpoints + `/rollback` on CRM/file mutations; `fallback_providers` + credential pools for uptime; no-agent heartbeat cron (`[SILENT]` unless anomaly) for missed bookings/queue depth; `save_trajectories` to tune a cheaper specialist scorer over time.

---

## 2. Vapi Voice — Outbound Appointment Booking

> Hermes is the brain: a cron-ticked, Kanban-queued orchestrator that POSTs leads to Vapi's /call API with per-lead variableValues, optionally serves the live call's reasoning via its OpenAI-compatible API + a check-availability tool, then ingests Vapi's end-of-call-report webhook to write the booked/not outcome back to the CRM and ping the human closer — with TCPA consent and dial-window enforced in deterministic code before any call fires.

**Hermes components:** `Inbound webhook adapter (platforms.webhook.extra.routes) — receives Vapi end-of-call-report + status-update + the deterministic CRM/form lead trigger`, `OpenAI-compatible HTTP API server (/v1/chat/completions on :8642) — OPTIONAL: Hermes as Vapi's custom-LLM backend so it is literally the mouth's brain mid-call`, `Cron scheduler (hermes cron create) with a no-agent wakeAgent gate script — dials the queue only inside the legal call window and only when leads are due`, `Kanban board (one task per lead-call) — durable per-lead call state machine: queued -> dialing -> booked/no-answer/declined -> retry`, `Subagent delegation (delegate_task) — fans out batch enrichment/script-personalization across leads in isolated contexts on a cheap model`, `Custom skill (call-script + writeback contract SKILL.md, curator-pinned) — encodes the Vapi payload shape, variableValues map, and structuredDataPlan schema`, `state.db + FTS5 session_search — per-lead memory across retries so the agent never re-asks; group_sessions_per_user isolates each lead`, `send_message / deliver_only routes — instant 'appointment booked' ping to the human closer's Telegram/Slack home channel`, `MCP client mode (optional) — consume Vapi's MCP server for assistant/call CRUD instead of raw HTTP`, `Auxiliary model routing — Gemini Flash for compression/enrichment side-tasks, Opus only on the customer-facing turn`

**External integrations**

| Tool | Role |
|---|---|
| Vapi (api.vapi.ai) | The mouth. POST /call places the outbound call from a saved assistantId + phoneNumberId to customer.number, injecting lead context via assistantOverrides.variableValues. Fires tool-calls webhooks mid-call and an end-of-call-report webhook with analysis.structuredData {appointmentBooked, appointmentDate, startTime, customerName}. |
| Twilio / Vapi number | The phone line. Imported phoneNumberId or a free Vapi number is the caller ID. ~$0.01/min telephony; 10 concurrent lines default, $10/mo per extra line for campaign bursts. |
| CRM / lead source (Airtable, HubSpot, Supabase, or a web form) | System of record. Emits the inbound lead webhook to Hermes and is the writeback target (booked appointment -> CRM record). Holds the TCPA consent flag that gates dialing. |
| Cal.com / Google Calendar | Real availability source. Backs the Hermes check-availability tool (served via Hermes API or a thin function endpoint) so the assistant only offers truly-open slots and writes a real calendar event on book. |
| Deepgram (STT) + ElevenLabs/PlayHT (TTS) + Claude/GPT (LLM) | Vapi-internal voice stack, configured on the assistant. All-in ~$0.15-0.40/min. If Hermes is the custom LLM, the LLM line is Hermes' own Anthropic spend instead of Vapi's. |

**Data flow:** TRIGGER: a new lead lands in the CRM/form -> POSTs to Hermes webhook route /webhooks/new-lead (deliver_only ping to owner, zero LLM) and is written as status='queued' with a consent flag. SCHEDULE: every 15m a no-agent wakeAgent cron checks for consented leads due inside the legal local call window; on a hit it wakes the orchestrator agent. DISPATCH: the agent (via the call-script skill) creates a Kanban task per lead and issues POST https://api.vapi.ai/call {assistantId, phoneNumberId, customer.number, assistantOverrides.variableValues:{firstName, service, businessName}}, respecting the concurrent-line cap. LIVE CALL: Vapi dials; the assistant speaks the {{var}}-personalized script; when it needs a real slot it invokes the check_availability tool -> Vapi POSTs {message.type:'tool-calls', toolCallList:[{id,name,arguments}]} to Hermes' tool endpoint, which returns {results:[{toolCallId, result}]} from Cal.com within the timeout (and books the event on confirm). OUTCOME: at hangup Vapi POSTs end-of-call-report to /webhooks/vapi-events with message.analysis.structuredData {appointmentBooked, appointmentDate, startTime, customerName}, message.endedReason, transcript, recordingUrl, cost. WRITEBACK: Hermes verifies X-Vapi-Secret, updates the Kanban task (booked/no-answer/declined), writes the appointment to CRM/calendar, and send_messages an instant 'booked' card to the human closer — who then runs the sales call. Retries re-enter the queue with full per-lead memory via FTS5 session_search.

**Build sequence**

1. 1. In Vapi dashboard: create the booking Assistant (system prompt with {{firstName}}, {{service}}, {{businessName}} placeholders + a clear booking objective), attach STT/TTS/LLM, import or buy a phoneNumberId. Set org-level Server URL + Secret.
2. 2. Configure the assistant's analysisPlan.structuredDataPlan with a JSON schema {appointmentBooked:boolean (required), appointmentDate, startTime, customerName} so every call ends with machine-readable outcome in analysis.structuredData.
3. 3. Set the assistant serverMessages to ['end-of-call-report','status-update','tool-calls'] and point server.url at the Hermes gateway public URL https://<host>:8642/webhooks/vapi-events with the shared secret.
4. 4. In Hermes config.yaml add platforms.webhook.extra.routes.vapi-events {secret: <X-Vapi-Secret value>, skills: ['call-writeback'], prompt: '<parse the Vapi end-of-call-report, update the Kanban task and CRM>'}. Verify with `hermes webhook test vapi-events`.
5. 5. Write a deterministic Python wakeAgent gate script (no-agent cron, script-only): query CRM for leads where consent==true AND status=='queued' AND now() inside the legal local-time call window (e.g. 9am-8pm lead-local, TCPA); emit due-lead count; exit non-zero/empty when none so the agent never wakes (zero LLM spend on idle ticks).
6. 6. Author the call-script skill (SKILL.md, curator-pinned): encodes the exact POST https://api.vapi.ai/call body, the variableValues field map (lead row -> {{vars}}), retry policy, and the writeback contract. Store VAPI_API_KEY via Bitwarden/.env.
7. 7. hermes cron create 'every 15m' --no-agent --script wake_dial_gate.sh to feed due leads, and a second agent-cron that, when woken, creates one Kanban task per lead and (via the skill) issues the /call POST with assistantId+phoneNumberId+customer.number+assistantOverrides.variableValues. Cap concurrency to your purchased Vapi lines.
8. 8. Stand up the check-availability tool: define it on the assistant as type:function with server.url -> a Hermes API/function endpoint backed by Cal.com; return {results:[{toolCallId, result}]} within the timeout so the assistant offers only open slots and books a real event.
9. 9. Wire the writeback: the vapi-events webhook handler reads message.analysis.structuredData -> if appointmentBooked, mark Kanban task booked, write the appointment to CRM/calendar, and send_message an instant card to the closer's Telegram home channel; if no-answer/voicemail, set status for a capped retry (max_retries) on the next dial tick.
10. 10. OPTIONAL premium path: run `hermes mcp serve`/API server and set the Vapi assistant's model to custom-LLM -> https://<host>:8642/v1/chat/completions so Hermes itself reasons each turn live (full memory + tools), with Anthropic fallback_providers keeping the call alive on a 429.

**Risks / gates**

- TCPA / consent is a HARD HUMAN+CODE GATE, not an agent decision. The wakeAgent script must enforce in deterministic code: prior express consent on file, lead-local time inside 9am-8pm, DNC scrub, and a daily call cap. Never let the LLM decide whom/when to dial — calling an unconsented or wrong-time number is real legal liability (per-violation statutory damages). Maintain an immutable consent+timestamp audit trail.
- Money/booking is an irreversible commitment surface. Auto-writing a calendar event the customer agreed to verbally is acceptable; auto-charging deposits or sending contracts is NOT — route any payment/contract step to a human gate. The 'sale' itself stays human: Hermes books, a person closes.
- Vapi cost is layered and variable ($0.15-0.40/min); a runaway dial loop is a real-money leak. Cap with concurrent-line limits, Kanban max_retries, a daily-dial-count gate in the wakeAgent script, and monitor state.db estimated_cost_usd. Vapi default is only 10 concurrent lines — campaign bursts need pre-purchased lines.
- Webhook spoofing: anyone who learns the public URL can POST fake 'booked' reports. MUST verify X-Vapi-Secret / X-Vapi-Signature on the Hermes route (secret in route config) and reject unsigned requests — otherwise the CRM fills with phantom appointments.
- Custom-LLM-mid-call path adds hard latency: Vapi enforces a ~7.5s response budget on assistant-request and tight windows on tool-calls. A full Opus turn or a slow Cal.com lookup will blow it and the assistant stalls/hangs up. Use async tools, a fast model for the live turn, and keep the tool endpoint sub-second; the safer default is a saved Vapi assistant with Hermes orchestrating around the call, not inside every turn.
- The 7.5s/tool-timeout means the live availability check is the fragile link — pre-warm Cal.com slots into a cache the tool reads, rather than a cold round-trip per call.
- Voicemail / no-answer detection accuracy is imperfect; misclassifying voicemail as 'declined' poisons retry logic and structuredData. Trust message.endedReason for routing and treat structuredData.appointmentBooked as the single source of truth for a real booking.
- Don't over-trust the LLM to extract the booking — rely on Vapi's structuredDataPlan (schema-constrained) for the machine outcome and use the transcript only as a human-review artifact; structured-output extraction has known intermittent gaps, so the writeback handler must defensively handle a missing structuredData field.

**Architecture**

##### Hermes-Orchestrated Vapi Outbound Booking — Architecture

**Thesis.** Hermes is the brain; Vapi is the mouth. Hermes decides *who* to call, *when* (legally), and *with what context*, then ingests the outcome and routes a booked appointment to a human closer. Vapi handles only the real-time voice turn. The booking is automated; the *sale* stays human.

###### 1. Trigger — lead in, call queued
A lead lands in the CRM (Airtable/HubSpot/Supabase) or a web form and POSTs to a Hermes **webhook route** (`platforms.webhook.extra.routes.new-lead`). With `deliver_only:true` this fires a zero-LLM "new lead" ping to the owner's phone and writes the lead as `status='queued'` with a **consent flag + timestamp**. Consent is captured upstream by a human/form — never inferred by the agent.

###### 2. Schedule — the legal gate (deterministic, not LLM)
A **no-agent cron** (`hermes cron create 'every 15m' --no-agent --script wake_dial_gate.sh`) runs a Python `wakeAgent` gate that enforces, *in code*: consent on file, lead-local time inside 9am–8pm (TCPA), DNC scrub, and a daily-call cap. It prints due-lead count and exits silent when none — so idle ticks cost $0. **This is the compliance gate and it must never be an agent judgment call.**

###### 3. Dispatch — Hermes calls Vapi
On a hit, the orchestrator agent wakes, creates one **Kanban task per lead** (durable state machine: `queued→dialing→booked/no-answer/declined→retry`), and via a curator-pinned **call-script skill** issues:

```
POST https://api.vapi.ai/call
Authorization: Bearer $VAPI_API_KEY
{ "assistantId":"...", "phoneNumberId":"...",
  "customer": { "number":"+1..." },
  "assistantOverrides": { "variableValues": {
     "firstName":"Sam", "service":"roof inspection", "businessName":"Peak" } } }
```
The assistant's prompt/first-message references `{{firstName}}`, `{{service}}`. Concurrency is capped to purchased Vapi lines (10 default, $10/mo each extra). `delegate_task` can fan out per-lead enrichment on a cheap model first.

###### 4. Live call — optional deep brain + availability tool
Two depths:
- **Default (robust):** a saved Vapi assistant runs the call; Hermes orchestrates *around* it. A **custom tool** `check_availability` (`type:function`, `server.url` → a Hermes/Cal.com endpoint) lets the assistant offer only open slots. Vapi POSTs `{message.type:"tool-calls", toolCallList:[{id,name,arguments}]}`; the endpoint returns `{results:[{toolCallId, result}]}` within the timeout and books a real calendar event on confirm. **Pre-cache slots** — the ~7.5s/tool budget makes a cold round-trip the fragile link.
- **Premium (Hermes IS the LLM):** set the assistant's model to custom-LLM → Hermes' OpenAI-compatible `:8642/v1/chat/completions`. Hermes reasons each turn with full memory + `fallback_providers` failover. Cost: latency. A full Opus turn risks blowing Vapi's response window — use a fast model live.

###### 5. Outcome — writeback + human handoff
At hangup Vapi POSTs **end-of-call-report** to `/webhooks/vapi-events`. The assistant's `analysisPlan.structuredDataPlan` (schema `{appointmentBooked:boolean (required), appointmentDate, startTime, customerName}`) populates `message.analysis.structuredData` — the single source of truth. Hermes **verifies `X-Vapi-Secret`/`X-Vapi-Signature`** (reject unsigned — else phantom bookings), then: if booked → Kanban `booked`, write appointment to CRM/calendar, `send_message` an instant card to the closer's Telegram/Slack; if `endedReason` is no-answer/voicemail → capped retry on the next tick. `state.db` + `session_search` carries per-lead memory across retries.

###### What Hermes is good for vs. not
- **Hermes (good):** queue logic, per-lead context + memory, retry policy, outcome parsing, owner notifications, cost tracking (`estimated_cost_usd`), batch fan-out.
- **Deterministic code / human gate (mandatory):** TCPA consent + dial-window + DNC; any payment/contract send; the sale call itself. Treat the LLM as untrusted for *who to dial* and *whether money moves*.
- **Vapi (good):** the voice turn only.

###### Cost & reliability
~$0.15–0.40/min all-in. Cap runaway spend with concurrent-line limits, Kanban `max_retries`, the daily-dial gate, and `estimated_cost_usd` monitoring. Auxiliary side-tasks → Gemini Flash; live/customer turn → premium model.

---

## 3. AI Receptionist — Inbound Call / SMS / Chat

> Vapi handles real-time voice with its own fast LLM and calls Hermes ONLY at decision points (book/quote/escalate) via tool-call webhooks + an end-of-call webhook; Hermes runs as an always-on per-client gateway profile that owns Cal.com booking, FTS5 caller memory, Slack/Telegram escalation, and SMS/chat intake — with money, irreversible sends, and TCPA/A2P consent behind deterministic code + human gates.

**Hermes components:** `Always-on gateway service (hermes gateway install → Windows Scheduled Task / Docker --restart unless-stopped) for 24/7 answering`, `Inbound webhook adapter (platforms.webhook.extra.routes) — HMAC-verified routes for Vapi tool-calls + end-of-call report + website lead forms`, `Per-client isolation via one profile + one gateway port per client (hermes -p clientA gateway start), independent SOUL/skills/memory/credentials, separate webhook port`, `OpenAI-compatible HTTP API server (/v1/chat/completions, port 8642) — Pattern A custom-LLM backend for SMS/chat ONLY, not live voice`, `Custom skills: per-client call-script + booking skill (check_availability, book_job, classify_emergency), channel_skill_bindings to auto-load per channel`, `Cron scheduled tasks (cronjob) — after-hours digest, no-agent missed-call watchdog, daily booking-confirmation sweep`, `Subagent delegation (delegate_task) — fan out enrichment/quote-estimate to a cheap model so the customer-facing turn stays responsive`, `Built-in memory (USER.md) + FTS5 session_search — recall returning-caller context across calls without re-asking; group_sessions_per_user keeps callers isolated`, `send_message / home channel — qualified-lead + escalation summaries to the contractor's Slack/Telegram`, `Auxiliary model routing (auxiliary.compression / vision → Gemini Flash) + Anthropic system_and_3 prompt caching + per-session estimated_cost_usd for per-client billing`, `fallback_providers chain + credential pools — survive a 429/5xx mid-call without dropping the booking flow`, `STT (local faster-whisper, $0) for inbound voice-memo intake on Telegram/WhatsApp as a low-cost text fallback channel`, `save_trajectories (ShareGPT) — turn real receptionist sessions into fine-tune data for a cheaper domain model later`

**External integrations**

| Tool | Role |
|---|---|
| Vapi | Real-time voice telephony + STT/TTS + turn-taking. Owns the live conversation with its OWN fast LLM (latency-critical). Calls Hermes at decision points via Custom Tool server URLs (message.type:'tool-calls' → synchronous {results:[{toolCallId,result}]}, must return HTTP 200, single-line strings) and posts the end-of-call-report (message.analysis.summary + artifact.messages) to a Hermes webhook route. Inbound phone number is per-client. |
| Twilio | Provisions the per-client phone number Vapi rides on; provides the A2P-10DLC-registered 10DLC number + SMS adapter that Hermes's gateway uses for text intake and appointment-reminder SMS. A2P 10DLC registration is MANDATORY (carriers block unregistered traffic since Feb 2025). |
| Cal.com | Source of truth for availability + bookings, one API key + team/event-type slug per contractor. Hermes booking skill calls GET /v2/slots (header cal-api-version:2024-09-04) to offer times and POST /v2/bookings (2024-08-13) to write the appointment. Per-client isolation via separate API key/team slug. |
| Slack / Telegram | Contractor-facing notification + human-escalation surface. Emergency classifications and qualified-lead summaries land here via send_message / cron deliver=; a human taps to approve before any callback or money-touching action. |
| Anthropic Claude (Opus/Sonnet) + Gemini Flash (auxiliary) | Claude is Hermes's main reasoning model for booking logic, emergency triage, SMS/chat turns. Gemini Flash via auxiliary.* handles compression/summaries/vision cheaply to protect margin on high call volume. |

**Data flow:** INBOUND VOICE: Caller dials the client's Twilio number → Vapi answers, STT→its fast LLM drives turn-taking (sub-second). At a decision point the LLM emits a tool call → Vapi POSTs {message.type:'tool-calls', toolCallList:[{toolCallId, function:{name:'check_availability'\|'book_job'\|'classify_emergency', arguments}}]} to the Hermes webhook route (HMAC-verified, per-client port). Hermes loads the per-client profile + receptionist skill, calls Cal.com GET /v2/slots or POST /v2/bookings (or classifies emergency), and returns {results:[{toolCallId, result:'...'}]} (HTTP 200, single-line) within Vapi's tool timeout → Vapi speaks the result. CALL END: Vapi POSTs end-of-call-report (analysis.summary + artifact.messages) → Hermes webhook route → Hermes writes caller facts to USER.md/FTS5 (recall on next call via session_search) and send_message's a lead/booking summary to the contractor's Slack/Telegram home channel. EMERGENCY: classify_emergency→true returns an escalation instruction to Vapi AND fires send_message [URGENT] to the contractor's phone for human callback (no autonomous outbound call). INBOUND SMS/CHAT: customer texts the Twilio/WhatsApp number → gateway turns it into an authorized agent run (full Hermes turn loop, latency OK here) → same booking skill → reply; OR Vapi chat uses Hermes as a Pattern-A custom LLM at /v1/chat/completions. AFTER-HOURS: cron no-agent watchdog heartbeats queue depth; cron daily digest delivers overnight captures. GATES: appointment-reminder/marketing SMS only sent after a deterministic opt-in check (A2P/TCPA); booking writes validated against a real Cal.com slot id by non-LLM code before commit.

**Build sequence**

1. Day 1 — Stand up one client end-to-end. Install Hermes gateway as a Windows Scheduled Task (hermes gateway install) under a dedicated profile: hermes -p acme-roofing gateway start. Enable platforms.webhook with a per-client port + HMAC secret (platforms.webhook.extra.routes).
2. Day 1 — Buy a Twilio number, START A2P 10DLC brand+campaign registration immediately (10–15 day review — do this first). Create a Vapi assistant, attach the Twilio number, set Voice/STT/TTS in Vapi (its native fast LLM stays as the conversation driver).
3. Day 2 — Author the per-client skill (skills/acme-receptionist/SKILL.md): the call script, business hours, services, pricing guardrails, and three tools — check_availability, book_job, classify_emergency. Pin it with the curator; bind via channel_skill_bindings so SMS/chat auto-loads it.
4. Day 2 — Implement the booking skill against Cal.com v2: GET /v2/slots and POST /v2/bookings with the client's API key + team/event-type slug pulled from skills.config.* (or Bitwarden Secrets Manager for fleet rotation). Store the Cal.com key as a secret, never inline.
5. Day 3 — Wire Vapi → Hermes. In Vapi, define Custom Tools (check_availability, book_job, classify_emergency) whose server URL is the Hermes webhook route. Hermes receives message.toolCallList, runs the booking skill, returns {results:[{toolCallId, result}]} as single-line strings within Vapi's tool timeout. Add the end-of-call-report webhook route → Hermes summarizes the transcript and send_message's the lead to Slack/Telegram.
6. Day 3 — Add a deterministic consent + booking-write gate: a small script (no-LLM) validates that the caller's number has SMS opt-in on file before any reminder SMS is queued, and that book_job calls map to a real Cal.com slot id (no hallucinated times). Hermes proposes; the script commits.
7. Day 4 — After-hours + escalation. Cron no-agent missed-call watchdog (hermes cron create --no-agent --script) heartbeats queue depth to Telegram; a cron daily digest summarizes overnight captures. Emergency path: classify_emergency=true → send_message to the contractor's phone with a [URGENT] prefix + one-tap human callback, NOT an autonomous outbound call.
8. Day 4 — Cost + reliability hardening. Point auxiliary.compression/vision at Gemini Flash, confirm system_and_3 prompt caching, set fallback_providers + credential pools, enable compression (threshold 0.85) so long overnight SMS threads don't blow context. Pull per-session estimated_cost_usd for a per-client billing report.
9. Day 5 — Multi-client scale-out. Clone the profile per contractor: new profile dir, new gateway port, new Twilio number + Vapi assistant + Cal.com key, new webhook route+secret. One Docker-container-per-profile (or one Scheduled Task per profile) gives hard isolation — restart acme-roofing without touching bobs-hvac. Optionally enable save_trajectories to harvest fine-tune data.
10. Day 5+ — Verification: live test call (book + emergency + after-hours), confirm Cal.com event created, confirm Slack/Telegram escalation fired, confirm no SMS sent without opt-in, confirm A2P campaign approved before any production SMS.

**Risks / gates**

- LATENCY — a live phone turn cannot wait for an Opus turn loop (compression + tool dispatch = multi-second). MITIGATION: Vapi's native fast LLM drives conversation; Hermes is called only at discrete decision points via tool webhooks. Do NOT make Hermes the Pattern-A custom LLM for live voice — reserve Pattern A for async SMS/chat only.
- TCPA / A2P 10DLC (LEGAL, money-grade) — unregistered 10DLC SMS is carrier-blocked (since Feb 2025) and unsolicited texts carry $500–$1,500/msg statutory damages. MITIGATION: A2P registration is a hard prerequisite; ALL outbound SMS (even reminders) gated by a deterministic opt-in check, not LLM judgment. Never let the agent autonomously decide to text a number.
- AUTONOMOUS OUTBOUND CALLS — emergency 'call the customer back' must be a HUMAN gate, not an agent-initiated call. Outbound AI calling has its own TCPA exposure. MITIGATION: escalation = notify the contractor's phone for one-tap human callback; no agent-dialed outbound.
- HALLUCINATED BOOKINGS — the LLM could offer a time that isn't truly free or confirm a slot that 409s. MITIGATION: book_job must round-trip a real Cal.com slot id; non-LLM code validates the slot is still open before POST /v2/bookings and surfaces failures back to Vapi as a spoken retry.
- TOOL-WEBHOOK CONTRACT FRAGILITY — Vapi ignores any non-200 and chokes on multiline result strings; a thrown error mid-call drops the booking. MITIGATION: the webhook handler always returns HTTP 200 with single-line result/error strings; wrap Cal.com failures as a graceful spoken fallback ('let me have someone call you right back').
- CROSS-CLIENT LEAKAGE — wrong profile/credentials could book client A's job on client B's calendar. MITIGATION: one profile + one gateway port + one webhook secret + one Cal.com key per client; Bitwarden-injected secrets; verify the inbound number→profile mapping deterministically, never infer it.
- COST BLOWUP at call volume — premium model on every utterance would be ruinous. MITIGATION: Hermes touches only decision points (most utterances never reach it); auxiliary tasks on Gemini Flash; system_and_3 caching; track per-session estimated_cost_usd for billing and alarms.
- RELIABILITY — a primary-model 429 mid-booking strands a caller. MITIGATION: fallback_providers chain + credential pools for seamless failover; iteration budget caps runaway loops; gateway --restart unless-stopped survives reboots.
- Hermes is GOOD for: booking logic, emergency triage reasoning, caller memory/recall, lead summarization, after-hours capture, per-client isolation. Hermes is the WRONG layer for: real-time turn-taking (Vapi), consent/compliance decisions (deterministic code), money movement or irreversible sends (human gate), and the source-of-truth calendar (Cal.com).

**Architecture**

##### AI Receptionist on Hermes — Architecture Brief

###### The core decision: Hermes is a reasoning brain, not the voice engine
A live phone call demands sub-second turn-taking. Hermes's strength — a deliberate Opus turn loop with context compression and tool dispatch — is multi-second per turn and would shatter conversational cadence. So **Vapi owns the live conversation with its own fast LLM**, and **Hermes is invoked only at discrete decision points** (check availability, book, classify emergency) and at call end. This is the honest split that makes the system both responsive and smart. Hermes's full turn loop is reserved for the latency-tolerant SMS/chat channels.

###### Voice path (Vapi ↔ Hermes via webhooks)
Each contractor gets a Twilio number bound to a Vapi assistant. Vapi handles STT/TTS/turn-taking. You define three Vapi **Custom Tools** (`check_availability`, `book_job`, `classify_emergency`) whose server URL points at a per-client **Hermes inbound webhook route** (`platforms.webhook.extra.routes`, HMAC secret, dedicated port). When the assistant calls a tool, Vapi POSTs `{message.type:"tool-calls", toolCallList:[{toolCallId, function:{name, arguments}}]}`. Hermes loads the client profile + receptionist skill, runs the logic, and returns `{results:[{toolCallId, result}]}` — **HTTP 200 always, single-line strings**, within Vapi's tool timeout. At call end, Vapi's **end-of-call-report** (`analysis.summary` + `artifact.messages`) hits a second webhook route; Hermes writes caller facts to `USER.md`/FTS5 and `send_message`s a lead/booking summary to the contractor's Slack/Telegram.

###### Booking (Cal.com v2)
The booking skill calls `GET /v2/slots` (`cal-api-version: 2024-09-04`) to offer real times and `POST /v2/bookings` (`2024-08-13`) to commit, using a **per-client API key + team/event-type slug** stored via Bitwarden Secrets Manager (never inline). A non-LLM validation step confirms the slot is still open before the write, so the agent can never confirm a hallucinated time.

###### SMS / chat / after-hours
Inbound texts to the Twilio/WhatsApp number become authorized agent runs through the gateway (full turn loop — latency fine here), routed to the same booking skill via `channel_skill_bindings`. Telegram/WhatsApp voice memos transcribe free via local faster-whisper as a low-cost intake fallback. After-hours coverage is the gateway running 24/7 (`hermes gateway install` → Windows Scheduled Task, or Docker `--restart unless-stopped`); a `--no-agent` cron watchdog heartbeats queue depth and a daily cron digest summarizes overnight captures — both `$0` model spend on healthy ticks.

###### Per-client isolation
**One profile + one gateway port + one webhook route/secret + one Twilio number + one Vapi assistant + one Cal.com key per contractor.** Run one Docker container (or Scheduled Task) per profile, so `docker restart acme-roofing` never touches `bobs-hvac`. `group_sessions_per_user` keeps individual callers isolated within a client.

###### Cost & reliability
Most utterances never reach Hermes, so spend tracks decision density, not call length. Point `auxiliary.compression`/`vision` at Gemini Flash; rely on Anthropic `system_and_3` prompt caching (~75% input reduction); read per-session `estimated_cost_usd` for per-client billing. `fallback_providers` + credential pools survive a mid-call 429; `compression.threshold 0.85` keeps long overnight threads healthy; the iteration budget caps runaway loops.

###### Hard gates — do NOT let the agent decide these
- **A2P 10DLC + TCPA:** registration is mandatory (carriers block unregistered SMS since Feb 2025); $500–$1,500/msg exposure. Every outbound SMS — even reminders — passes a **deterministic opt-in check**, not LLM judgment.
- **Outbound calls:** emergencies escalate as a **human-callback notification**, never an agent-dialed call.
- **Bookings:** validated against a real Cal.com slot by code before commit.

###### What to build this week
Day 1: gateway profile + webhook route + Twilio number + **start A2P registration immediately** (10–15 day review). Day 2: receptionist SKILL.md + Cal.com booking skill. Day 3: wire Vapi Custom Tools + end-of-call webhook + consent/booking gate. Day 4: after-hours cron + escalation + cost/fallback hardening. Day 5: clone the profile for client #2 to prove isolation. Verify with a live call that books, escalates, and sends nothing without consent.

**Sources:** [Vapi custom LLM](https://docs.vapi.ai/customization/custom-llm/using-your-server), [Vapi custom tools](https://docs.vapi.ai/tools/custom-tools), [Vapi server messages](https://docs.vapi.ai/server-url/events), [Cal.com create booking](https://cal.com/docs/api-reference/v2/bookings/create-a-booking), [Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc).

---

## 4. Cold Email — Clay Enrichment + Instantly Sending

> Clay enriches and scores lists then calls Hermes (HTTP API) for per-lead copy; a deterministic Python pusher loads leads into Instantly; Instantly reply/intent webhooks hit Hermes webhook routes which triage, draft replies for a human gate, and book via Cal.com — Hermes is the reasoning core, never the unattended sender.

**Hermes components:** `Inbound webhook adapter (platforms.webhook routes) — Instantly reply_received / lead_interested events and Clay HTTP-API callbacks land here with HMAC/header auth`, `OpenAI-compatible HTTP API server (/v1/chat/completions) — Clay HTTP-API enrichment column calls Hermes as a reasoning step for per-lead copy generation`, `Skills (SKILL.md) — copy-gen skill (ICP-aware opener + subject), reply-triage skill (intent classification), booking skill (Cal.com), list-scoring skill; creative/humanizer to strip AI-isms`, `Cron scheduled tasks (cronjob) — nightly deliverability/health sweep, daily KPI digest, webhook-health watchdog (no-agent script gate)`, `Subagent delegation (delegate_task) — fan out batch copy generation across leads in isolated child contexts; cheap delegation model for narrow drafting`, `Parent/child session lineage + FTS5 session_search — per-lead conversation memory so reply handling recalls the original pitch without re-asking`, `Messaging gateway (Telegram home channel, topic-routed) — positive-reply alerts and the human approve/send gate via /kanban unblock or reply`, `Kanban board + review-required gate — every outbound reply queued for one-tap human approval before send`, `Cache-stable prompt + system_and_3 caching + auxiliary cheap model — cost control across thousands of copy/triage turns; per-session estimated_cost_usd for billing`, `Built-in memory (MEMORY.md/USER.md) — per-client ICP, voice, offer, do-not-contact rules persisted across sessions`, `Checkpoints / state.db persistence — durable run state and rollback of agent-driven artifact edits`

**External integrations**

| Tool | Role |
|---|---|
| Clay | List building + waterfall enrichment + lead scoring. Calls Hermes via HTTP API enrichment column (POST /v1/chat/completions) to generate per-lead opener+subject; uses native 'Add Lead to Campaign' action to push the enriched row (with AI copy as custom_variables) directly into Instantly. Workspace-stored auth headers hold the Hermes API key. |
| Instantly.ai (API v2) | Inbox infrastructure, sequence sending, deliverability. POST /api/v2/leads loads leads+personalization+custom_variables (dedup via skip_if_in_campaign, verify_leads_on_import). POST /api/v2/webhooks registers reply_received / lead_interested / lead_meeting_booked / email_bounced / lead_unsubscribed / campaign_completed events pointed at Hermes webhook routes, with custom Authorization header for verification. Base https://api.instantly.ai/api/v2, Bearer auth, Growth plan+. |
| Cal.com (or Calendly) API | Booking. Hermes booking skill inserts the operator's scheduling link into approved positive-reply drafts; Cal.com booking-created webhook hits a Hermes route to confirm the meeting, update the Instantly lead status, and post a 'meeting booked' card to Telegram. |
| Deterministic Python pusher (thin script on the Hermes box) | Owns the actual Instantly write calls (create-lead, add-to-campaign, status updates). Idempotent, rate-limited, retried. Keeps irreversible sends out of the LLM loop; Hermes orchestrates it via terminal/cron, not by calling the send API directly in a free-form turn. |
| Anthropic Claude (via Hermes model slot) | Reasoning core for copy generation, reply intent classification, and draft replies. Premium model on customer-facing turns; cheap auxiliary/delegation model for batch drafting and compression. |

**Data flow:** ICP brief -> Clay builds + waterfall-enriches list and scores rows -> Clay HTTP-API enrichment column POSTs each lead to Hermes /v1/chat/completions -> Hermes copy-gen skill (delegated per-lead, humanizer-cleaned) returns {subject, opener} -> Clay's native 'Add Lead to Campaign' action pushes email + fields + AI copy (as custom_variables) into the Instantly campaign (deterministic pusher handles any API-direct loads, with verify-on-import + dedup) -> Instantly sends the sequence on its own schedule/warmup -> prospect replies -> Instantly reply_received/lead_interested webhook (signed header) hits a Hermes webhook route -> agent run pulls prior lead context via session_search, triage skill classifies intent -> positive/objection: draft reply + Cal.com link queued as a Kanban review-required task delivered to Telegram; unsub/bounce/wrong_person: pusher updates Instantly lead status and suppresses (no LLM) -> operator approves on phone (/kanban unblock) -> pusher sends the reply via Instantly -> prospect books -> Cal.com webhook -> Hermes confirms, updates lead status, posts 'meeting booked' card. Cron emits nightly deliverability + cost digests and re-arms any disabled webhook.

**Build sequence**

1. Stand up Hermes gateway as an always-on service on Windows (hermes gateway install -> Scheduled Task) with the Telegram adapter; set home channel to telegram:-1003758503447:2 for alerts and the approval gate.
2. Enable the HTTP API server (curl localhost:8642/v1/chat/completions) and the inbound webhook adapter (platforms.webhook.enabled, set port + per-route secret). Expose both via a tunnel/reverse proxy (Cloudflare Tunnel) so Clay and Instantly can reach them over HTTPS.
3. Write three skills: copy-gen (input lead JSON -> {subject, opener} JSON, ICP+voice from MEMORY.md, runs creative/humanizer), reply-triage (input reply text -> {intent: interested|objection|unsub|ooo|wrong_person, confidence, suggested_reply}), and booking (compose reply with Cal.com link). Store per-client ICP/voice/offer in MEMORY.md.
4. Build the deterministic Python pusher: functions for create-lead, bulk add-to-campaign (<=500/call), verify-on-import, and lead-status update against api.instantly.ai/api/v2 with Bearer key, idempotency on email, exponential-backoff retry. Wire Hermes to invoke it via terminal/cron — never let a free-form turn POST sends.
5. In Clay: build the table + waterfall enrichment, add an HTTP API enrichment column that POSTs each row to Hermes /v1/chat/completions (auth header from workspace account) to fill subject+opener columns, then configure the native 'Add Lead to Campaign' action mapping email + first_name + company + the AI copy columns as custom_variables.
6. Register Instantly webhooks via POST /api/v2/webhooks for reply_received, lead_interested, lead_meeting_booked, email_bounced, lead_unsubscribed, campaign_completed — each target_hook_url a distinct Hermes route, with an Authorization header Hermes validates against the route secret.
7. Implement reply handling: reply_received/lead_interested route -> agent run loads lead history via session_search -> triage skill classifies -> positive/objection drafts a reply and opens a Kanban task with a review-required block delivered to Telegram; bounce/unsub routes call the pusher to update status and suppress, zero-LLM where possible.
8. Wire the human gate + booking: operator approves a draft with /kanban unblock (or a reply) from their phone -> pusher sends via Instantly reply/subsequence -> on a click-through the Cal.com booking webhook hits Hermes -> confirm + post 'booked' card + update lead status.
9. Add cron jobs: nightly deliverability/bounce-rate + reply-rate digest to Telegram, a no-agent webhook-health watchdog (re-register any Instantly webhook whose status flipped to -1), and a weekly per-client cost report from state.db estimated_cost_usd.
10. Verify end-to-end on a 25-lead seed batch: confirm copy quality, dedup/verification, a live reply round-trips to the approval gate, a booking confirms, and bounces suppress — before scaling sending volume.

**Risks / gates**

- CAN-SPAM / GDPR compliance: cold email is legal in the US only with accurate headers, a physical postal address, and a working unsubscribe; EU/UK/Canada (CASL) require consent or strict legitimate-interest. Hermes must never invent the suppression logic — honoring lead_unsubscribed is deterministic code, and a human owns list provenance and opt-out handling.
- Irreversible sends must stay out of the free-form LLM loop. Outbound sends (initial sequence and replies) go through the deterministic, idempotent, rate-limited pusher; every AI-drafted reply passes a human Kanban approve gate. An agent calling a send API directly in a turn is the failure mode to design out.
- Deliverability is the whole game and Hermes doesn't control it: domain warmup, SPF/DKIM/DMARC, inbox rotation, volume ramp, and spam-word avoidance live in Instantly + DNS. Treat copy-gen as assisting deliverability (humanizer, no spam triggers), not guaranteeing it.
- Instantly webhooks auto-disable (status -1) after repeated delivery failures — a silent single point of failure for reply capture. Needs a no-agent cron watchdog that re-registers dead webhooks and alerts; the Hermes endpoint must return 2xx fast and do heavy work async.
- AI copy quality + brand risk at scale: a bad opener template sends to thousands before anyone notices. Gate new copy variants behind a small seed batch + human eyeball before full-volume rollout; log every generated opener for audit.
- Cost + rate limits: per-lead LLM calls across large lists add up; mitigate with cheap delegation/auxiliary model for drafting, prompt caching, Clay conditional-runs to skip empty rows, and Instantly's documented rate limits respected in the pusher. Watch state.db estimated_cost_usd per client.
- PII handling: enriched lead data (emails, phone, employer) flows Clay -> Hermes -> Instantly and persists in state.db. Scope retention (sessions.retention_days), enable security.redact_secrets, and keep API keys in env/Bitwarden, not in prompts or skill files.
- Clay HTTP-API-as-source has no pagination and webhook sources cap at 50k submissions — fine for enrichment callbacks but don't architect large list ingestion through a single Clay webhook; page in deterministic code.

**Architecture**

##### Cold-Email Pipeline — Hermes as Reasoning Core

**Thesis.** Clay (list building + enrichment + scoring) and Instantly (inbox infra + sending + deliverability) already own the heavy, deterministic plumbing — and Clay even ships a native *Add Lead to Campaign* action that talks to Instantly's v2 API directly. Hermes' job is the *reasoning* between and after them: per-lead copy, reply intent classification, drafted responses, and booking. It is explicitly **not** the unattended sender. Money/irreversible actions stay behind deterministic code and a human gate.

###### Confirmed API surface (researched)
- **Instantly v2** — base `https://api.instantly.ai/api/v2`, Bearer auth, Growth plan+. `POST /leads` takes `campaign` (UUID), `email`, `personalization` (the AI opener), arbitrary `custom_variables` (string/number/bool — auto-registered to the campaign so every lead shares the schema), dedup flags (`skip_if_in_campaign/workspace/list`), and `verify_leads_on_import`. Bulk add-to-campaign accepts ≤500 leads/call. `POST /webhooks` registers a `target_hook_url` with an `event_type` from a rich enum — the load-bearing ones are `reply_received`, `lead_interested`, `lead_meeting_booked`, `email_bounced`, `lead_unsubscribed`, `campaign_completed`, `account_error` — plus optional custom `headers` (use this to sign the call to Hermes) and a per-`campaign` filter. Webhooks **auto-disable** (`status: -1`) after delivery failures.
- **Clay** — HTTP API enrichment column POSTs each row to any endpoint with workspace-stored auth headers (so it can call Hermes' `/v1/chat/completions` as a reasoning step), and the native Instantly action handles the campaign push. Webhook sources cap at 50k and HTTP-API-as-source has no pagination.

###### Hermes integration map
| External touchpoint | Hermes mechanism |
|---|---|
| Clay needs per-lead copy | Hermes **HTTP API server** `/v1/chat/completions`, called from a Clay HTTP-API enrichment column |
| Instantly reply/intent events | Hermes **inbound webhook routes** (`platforms.webhook`), one route per event, header-verified |
| Cal.com booking-created | Hermes **webhook route** → confirm + status update |
| Actual Instantly writes/sends | **Deterministic Python pusher** invoked via terminal/cron — not a free-form turn |
| Batch copy at volume | **delegate_task** fan-out on a cheap delegation model |
| Lead memory across replies | **parent/child sessions + FTS5 `session_search`** |
| Approvals + alerts | **Telegram gateway** + **Kanban** review-required gate |
| Health/cost/digests | **cron** (no-agent watchdog + agent digests) |

###### Flow
1. **List + enrich (Clay).** Build ICP list, waterfall-enrich, score. An HTTP-API column calls Hermes for `{subject, opener}` per row (copy-gen skill: pulls ICP/voice/offer from `MEMORY.md`, runs `creative/humanizer`).
2. **Load (Clay→Instantly).** Native *Add Lead to Campaign* maps email + identity fields + AI copy as `custom_variables`. Any API-direct loads go through the pusher with verify-on-import and dedup.
3. **Send (Instantly).** Instantly sends on its warmup/throttle schedule. Hermes does not touch send cadence.
4. **Reply handling (Instantly→Hermes).** `reply_received`/`lead_interested` webhook → agent run → `session_search` recalls the original pitch → triage skill classifies intent. Positive/objection → drafts a reply (+ Cal.com link) into a **Kanban review-required** task delivered to Telegram. Unsub/bounce/wrong-person → pusher updates lead status and suppresses, **zero LLM**.
5. **Human gate + booking.** Operator approves from phone (`/kanban unblock`) → pusher sends via Instantly → prospect books → Cal.com webhook → Hermes confirms, updates status, posts a "booked" card.

###### What Hermes is good for vs not
**Good:** personalized copy at scale, intent triage, context-aware reply drafting, orchestration glue, per-client memory and cost reporting. **Deterministic code, not Hermes:** the Instantly writes/sends, dedup/suppression, idempotency, rate limiting. **Human gate, always:** every outbound reply, new copy variants before full-volume rollout, list provenance/opt-out. **Out of scope for the agent:** deliverability mechanics (DNS, warmup, rotation) — Instantly + DNS own that.

###### Compliance
US CAN-SPAM: accurate headers, physical address, honored unsubscribe (deterministic on `lead_unsubscribed`). EU/UK CASL/GDPR: consent or documented legitimate interest — a human owns this, never the model. No calling here, so TCPA doesn't bite unless you add the telephony skill later.

---

## 5. Stock + Crypto Trading / Analysis Agent

> Hermes is the reasoning + orchestration core: deterministic cron scripts pull market data into a local SQLite store, an LLM turn synthesizes signals against a journaled strategy, alerts fire to a Telegram topic, and any order is a one-tap human-approved action — never autonomous execution.

**Hermes components:** `Gateway always-on service (Telegram adapter, home channel + cron thread)`, `Cron scheduler — no-agent script mode for data collection + LLM-mode for synthesis`, `wakeAgent gate scripts (only spend tokens on material moves)`, `Webhook adapter (TradingView / exchange-alert inbound -> agent run, deliver_only for zero-LLM pings)`, `Skills: finance/stocks, finance/dcf-model, finance/comps-analysis, optional blockchain/evm + hyperliquid + solana, plus custom strategy/journal skills`, `Subagent delegation (parallel per-ticker research fan-out, cheap model)`, `Built-in memory MEMORY.md + USER.md (risk profile, open theses) + FTS5 session_search (journal recall)`, `Docker terminal backend (isolated execution of broker/data Python)`, `MCP client mode (broker/exchange + data MCP servers)`, `fallback_providers + credential pools (survive 429/5xx mid-scan)`, `Auxiliary cheap-model routing (compression/vision/web_extract on Gemini Flash)`, `Checkpoints + /rollback (undo agent-driven journal/file edits)`, `Deliverable mode (chart PNG / xlsx backtest report as native Telegram attachments)`

**External integrations**

| Tool | Role |
|---|---|
| Alpaca Trading + Market Data API | Primary US equities/crypto broker. FREE paper-trading sandbox (paper-api.alpaca.markets, same API spec as live) for the journaling/backtest layer; free IEX real-time + historical bars for the data collector. Money movement = POST /v2/orders with bracket order_class (take_profit + stop_loss nested JSON) — this single endpoint is the human-gated action, NEVER called from an autonomous cron turn. |
| CoinGecko Demo API | FREE crypto price/OHLCV/market-cap feed (100 calls/min, 10k/month). Called by the deterministic no-agent cron collector script — zero LLM cost. Primary crypto data source for scans. |
| Coinbase Advanced Trade API | Optional crypto execution + L2 data via HMAC-SHA256-signed REST/WS (CB-RATELIMIT-REMAINING header for throttle awareness). Same human-gate rule as Alpaca: order placement is approval-only. Used read-only for balances/quotes in the default build. |
| yfinance / Alpha Vantage | Free supplementary equities data in the collector script. yfinance keyless for bars/fundamentals; Alpha Vantage (25 req/day free) for specific technical indicators when needed. Pure Python in the cron script, no agent turn. |
| TradingView webhook alerts | External signal source. TradingView POSTs JSON ({action,symbol,price,...}) to a Hermes webhook route on alert fire; HMAC-secret-verified -> either deliver_only push to Telegram (zero LLM) or triggers an enrich-and-assess agent turn. |
| Interactive Brokers Client Portal Web API | OPTIONAL heavyweight broker for serious equities/options. Requires a locally-running Client Portal Gateway + two-tier session (read-only portal vs. brokerage session to trade), IBKR Pro only. Flagged as advanced/opt-in; if used, the gateway runs in the same Docker backend and trading stays human-gated. |
| Binance API | Optional global crypto data/execution (HMAC-signed REST/WS). US users restricted (Binance.US has narrower coverage) — flagged as compliance-sensitive. Read-only market data only in default build. |

**Data flow:** TRIGGER: (a) cron tick every 15m fires the no-agent collect_market.py, or (b) a TradingView alert POSTs JSON to the Hermes webhook route. PROCESSING: collector pulls CoinGecko + yfinance + Alpaca bars -> computes indicators -> UPSERTs into local SQLite prices.db (deterministic, zero LLM). An hourly wakeAgent gate queries prices.db; only on a material move does it permit the LLM synthesis turn. The synthesis turn loads the signal-synthesis skill + finance skills, reasons over prices.db rows + journaled open theses (MEMORY.md + FTS5 recall), and (for deep names) delegates per-ticker research to cheap-model subagents in parallel. OUTPUT: a structured trade ticket (symbol/side/size/bracket TP-SL/thesis/confidence) is delivered to the Telegram trading topic with an APPROVE/REJECT prompt. HUMAN GATE: the operator replies; only on explicit approval does the agent invoke the Alpaca place_order helper (bracket POST) — against the PAPER endpoint by default. Every ticket + outcome is appended to the SQLite journal; a nightly no-agent backtest cron ships an equity-curve PNG/xlsx to Telegram via deliverable mode. Alerts that are pure notifications use deliver_only (sub-second, zero model cost).

**Build sequence**

1. Day 1 — Foundation: confirm Hermes gateway is installed as a Windows Scheduled Task (hermes gateway install) and the Telegram adapter is live. Create a dedicated Telegram forum topic for trading alerts; capture its chat:thread id (e.g. telegram:-100xxxx:NN) and set as the cron/home delivery target. Set terminal.backend=docker so all broker/data Python runs isolated.
2. Day 1 — Secrets: store Alpaca paper keys (APCA_API_KEY_ID/SECRET, APCA_API_BASE_URL=https://paper-api.alpaca.markets), CoinGecko demo key, Alpha Vantage key via .env or Bitwarden Secrets Manager (hermes secrets bitwarden). NEVER put live-trading keys in until the human-gate flow is proven on paper.
3. Day 2 — Deterministic collector: write collect_market.py (Python, no LLM) that pulls watchlist OHLCV from CoinGecko + yfinance + Alpaca bars, computes indicators (SMA/EMA/RSI/ATR, % moves) with pandas/ta, and UPSERTs into a local SQLite prices.db. Register as a no-agent cron: hermes cron create "every 15m" --no-agent --script collect_market.py --name market-collect. Empty stdout = silent, zero model spend.
4. Day 2 — wakeAgent gate: write a tiny gate script that queries prices.db and exits non-zero (skips the LLM turn) unless a material condition is met (>X% move, indicator cross, threshold breach). This is the cost-control valve.
5. Day 3 — Synthesis turn + skill: author a custom 'signal-synthesis' SKILL.md (strategy rules, risk limits, output schema) + install finance/stocks, finance/dcf-model, finance/comps-analysis. Create an LLM cron gated by the wakeAgent: hermes cron create "every 1h" "Run the signal-synthesis skill against prices.db; if conviction, draft a trade ticket" --skill signal-synthesis --deliver telegram:-100xxxx:NN. Prefix [SILENT] so quiet hours never ping.
6. Day 4 — Alert + human gate: synthesis turn outputs a structured trade ticket (symbol, side, size, bracket TP/SL, thesis, confidence) as a Telegram message with explicit APPROVE/REJECT instruction. NO order is placed by the agent. A separate approval flow — user replies in the topic, agent reads it, THEN calls a place_order helper (Alpaca bracket POST) against PAPER first. Wire approvals.mode so the order tool requires confirmation.
7. Day 5 — Webhook ingest: hermes webhook subscribe tradingview --secret <hmac> --deliver telegram:-100xxxx:NN [--deliver-only for raw pings | or --prompt to enrich]. Point a TradingView alert's webhook URL at https://<host>:port/webhooks/tradingview. Verify HMAC, test with hermes webhook test tradingview.
8. Day 6 — Journaling + backtest: every approved/rejected ticket and its outcome is appended to a trade journal (SQLite + MEMORY.md theses). Build a no-agent nightly cron that runs a backtest script over historical bars and ships an xlsx/PNG equity-curve report via deliverable mode. session_search (FTS5) gives 'how did the last RSI-cross trades do?' recall with zero token cost.
9. Day 7 — Reliability + review: configure fallback_providers (Anthropic -> OpenRouter) + credential_pool so a 429 mid-scan doesn't drop the agent; auxiliary.* -> Gemini Flash for compression/vision; enable checkpoints for journal-edit rollback. Run a full dry week on PAPER only. Promote to live keys ONLY after the human-gate + paper P&L are validated.

**Risks / gates**

- MONEY MOVEMENT — HARD HUMAN GATE: order placement (Alpaca POST /v2/orders, Coinbase/IBKR/Binance equivalents) must NEVER be reachable from an autonomous cron turn. The agent only DRAFTS tickets; a human approves in Telegram, and the order helper is approvals-gated (approvals.mode + a confirmation step). Default to the Alpaca PAPER endpoint until the gate is proven. Autonomous execution is the single largest danger and is explicitly out of scope.
- LLMs are NOT alpha generators: signal quality depends on the deterministic indicators + the journaled strategy, not the model's market 'intuition'. The LLM's job is synthesis, narrative, and surfacing — not predicting prices. Treat all output as decision-support, not advice.
- Stale/garbage data -> garbage signals: free feeds (CoinGecko demo 100/min cap, Alpha Vantage 25 req/day, yfinance unofficial) rate-limit, lag, or break silently. The collector must validate freshness/sanity and the wakeAgent must fail safe (no data = no signal, not a default-buy).
- Regulatory/compliance: this is a personal decision-support tool, not a registered advisor; do not let it message third parties with 'advice'. Binance.US has restricted coverage for US users (flag region). IBKR Client Portal needs a live local gateway + Pro account — a fragile dependency if used.
- Secret exposure: broker keys grant money access. Keep them in .env/Bitwarden, never in webhook URLs/payloads (TradingView docs explicitly warn), never in journal files committed to git, and run all broker code in the Docker backend (cap-drop) not the host shell.
- Over-trading / runaway loops: cap agent.max_turns and cron.max_parallel_jobs; the Ralph/goal loop must NOT be pointed at 'maximize P&L'. Iteration budget returns a summary instead of hanging. Position sizing + max-daily-loss limits live in the strategy skill and are enforced at ticket-draft time, not left to the model.
- Latency reality: Hermes is a synchronous reasoning loop on a Windows box — fine for swing/position timeframes and EOD/intraday scans, useless for HFT/sub-second. Set expectations to minutes-to-hours cadence.

**Architecture**

##### Trading / Analysis Agent on Hermes — Architecture Brief

**Thesis.** Hermes is excellent as a *reasoning, scanning, alerting, and journaling* core and a poor fit for *autonomous execution*. The design splits the system into a **deterministic data plane** (Python cron scripts, no LLM) and an **LLM reasoning plane** (gated synthesis turns), with a **hard human gate** on every dollar of money movement. Latency is minutes-to-hours (swing/position timeframes), never HFT.

###### Layers

**1. Data plane (deterministic, $0 LLM).** A `collect_market.py` runs as a *no-agent* cron (`hermes cron create "every 15m" --no-agent --script collect_market.py`). It pulls a watchlist from **CoinGecko Demo** (free, 100 calls/min, 10k/mo — the primary crypto feed), **yfinance** (keyless equities bars), **Alpaca** IEX bars (free with paper account), and optionally **Alpha Vantage** (25 req/day) for specific indicators. It computes SMA/EMA/RSI/ATR and % moves with pandas/`ta`, then UPSERTs into a local **SQLite `prices.db`**. Empty stdout ⇒ silent tick ⇒ zero spend. All of this runs in the **Docker terminal backend** for isolation.

**2. Gate (cost valve).** A tiny `wakeAgent.py` queries `prices.db` and exits non-zero unless a *material* condition fires (>X% move, MA cross, threshold breach). The LLM synthesis cron is gated behind it — you only pay tokens when something happened.

**3. Reasoning plane (LLM, gated).** An hourly LLM cron loads a custom **`signal-synthesis` SKILL.md** (your strategy rules, risk limits, output schema) plus bundled **`finance/stocks`, `finance/dcf-model`, `finance/comps-analysis`** (and optional `blockchain/evm`, `hyperliquid`, `solana` for on-chain). It reasons over `prices.db` rows and your *journaled open theses* (`MEMORY.md`/`USER.md` + FTS5 `session_search`). For deep names it fans out per-ticker research to **cheap-model subagents** via `delegate_task`. Output is a **structured trade ticket**: `{symbol, side, size, bracket TP/SL, thesis, confidence}`.

**4. Alert + human gate (the critical boundary).** The ticket is delivered to a dedicated **Telegram forum topic** (`telegram:-100…:NN`) with an explicit **APPROVE/REJECT** prompt — prefixed `[SILENT]` outside conviction so quiet hours don't buzz. **The agent never places the order.** The operator replies; only on explicit approval does the agent invoke a `place_order` helper that issues an **Alpaca bracket order** (`POST /v2/orders`, `order_class:"bracket"`, nested `take_profit.limit_price` + `stop_loss.stop_price`) — **against the PAPER endpoint by default**. The order tool is `approvals.mode`-gated with a confirmation step. Coinbase Advanced Trade (HMAC-SHA256 signed), IBKR Client Portal (local gateway + two-tier brokerage session, Pro-only), and Binance (region-restricted for US) are optional and follow the identical gate.

**5. Journal + backtest.** Every ticket and outcome appends to a SQLite journal; theses live in `MEMORY.md`. A *nightly no-agent* backtest cron replays historical bars and ships an **equity-curve PNG/xlsx via deliverable mode** as a native Telegram attachment. `session_search` answers "how did the last RSI-cross trades do?" at zero token cost. `checkpoints` + `/rollback` undo bad journal edits.

###### Integration map (every tool → mechanism)
- **CoinGecko / yfinance / Alpha Vantage** → no-agent cron Python (data plane).
- **Alpaca** → MCP client or in-script Python; market data in collector, orders only via approvals-gated helper.
- **TradingView** → Hermes **webhook adapter** (`hermes webhook subscribe tradingview --secret …`), HMAC-verified; `--deliver-only` for raw pings or `--prompt` to enrich.
- **Coinbase / IBKR / Binance** → MCP/Python, read-only by default, human-gated on orders.
- **Reliability** → `fallback_providers` (Anthropic→OpenRouter) + credential pools survive 429/5xx mid-scan; `auxiliary.*`→Gemini Flash for side tasks.

###### Hard rules
- **Default to paper.** Promote to live keys only after the human-gate flow and paper P&L are validated over a full dry week.
- **No "maximize P&L" goal loop.** Cap `agent.max_turns`, `cron.max_parallel_jobs`; position sizing + max-daily-loss enforced at ticket-draft time, not left to the model.
- **Secrets** in `.env`/Bitwarden, never in webhook URLs/journals/git; broker code only in Docker.
- This is **personal decision-support, not advice or a registered service** — never let it message third parties with recommendations. The LLM synthesizes; it does not predict.

A developer can stand up Days 1–4 (gateway, paper keys, collector, gated synthesis, alert+approval on paper) in a week and have a genuinely useful, safe scan-and-alert loop running.

---

## 6. n8n Automation Layer

> n8n owns deterministic ingest (Stripe/form/Cal.com webhooks → 500+ nodes) and irreversible delivery (email/SMS/CRM), parks on a Wait-on-webhook callback URL, and hands the fuzzy middle to Hermes via POST /v1/runs (async run_id) — Hermes does the agent/browser/reasoning work and HTTP-callbacks the result to n8n's resumeUrl for human-gated delivery.

**Hermes components:** `API server POST /v1/runs (async run, returns run_id) + GET /v1/runs/{id} poll + /events SSE — the reasoning endpoint n8n calls`, `Inbound webhook adapter on :8644 /webhooks/<route> with HMAC X-Webhook-Signature + deliver_only:true for zero-LLM instant pings`, `OpenAI-compatible POST /v1/chat/completions (:8642) for synchronous sub-30s reasoning steps n8n can block on`, `hermes send CLI + messaging send_message MCP — Hermes pushes the finished result back to n8n's resumeUrl callback / to Slack-Telegram home channel`, `cronjob / Jobs API (POST /api/jobs) — the Hermes-only alternative when no external event spine is needed`, `Skills (curator-pinned): himalaya/google-workspace email, telephony, domain-intel, humanizer loaded per webhook route via routes.<name>.skills`, `Subagent delegation (delegate_task) to a cheap model for enrichment fan-out inside one run`, `FTS5 session_search + parent/child lineage + X-Hermes-Session-Key for per-lead memory across n8n calls`, `Idempotency-Key header (5-min dedupe) to absorb Stripe/n8n webhook retries`, `fallback_providers + credential pools so a live run survives a 429/5xx mid-turn`, `Docker terminal backend + checkpoints/rollback for safe agent file mutation`, `auxiliary.* (vision/compression/web_extract) routed to a flash model for margin`

**External integrations**

| Tool | Role |
|---|---|
| n8n (self-hosted Community Edition, Docker, queue mode + Redis) | Deterministic orchestration spine: webhook triggers ingest events, 500+ nodes normalize/route, Wait node parks on $execution.resumeUrl while Hermes works, final nodes deliver. Free, unlimited executions; execution-based not task-based. |
| Stripe | Billing event source. checkout.session.completed / invoice.paid / invoice.payment_failed → n8n Stripe Trigger (HMAC whsec_ verified by n8n). Money movement (refunds) is NEVER agent-automated — human-gated. |
| Cal.com (or Calendly) | Scheduling event source. BOOKING_CREATED / BOOKING_CANCELLED (Cal.com) or invitee.created (Calendly) → n8n webhook → Hermes preps brief/enrichment before the call. |
| Website lead form (Webflow/Typeform/Elementor) | Lead ingest. Form POST → n8n webhook → Hermes qualifies/enriches → routes to CRM + owner phone. |
| GoHighLevel / HubSpot CRM | Delivery target. n8n native CRM node writes the enriched/qualified record AFTER Hermes returns — n8n owns the write so it is idempotent and auditable, not the LLM. |
| Gmail / SMTP (n8n Email node) and Twilio (n8n SMS node) | Outbound delivery. n8n sends the final email/SMS so sends are deterministic, logged, and CAN-SPAM/TCPA-gated. Hermes only DRAFTS copy; n8n (or a human) sends. |
| Slack / Telegram | Human-in-the-loop approval + ops visibility. n8n posts draft to a channel with Approve/Reject; the human gate fires before any irreversible send. |

**Data flow:** TRIGGER: Stripe/Cal.com/form fires a signed webhook → n8n Webhook Trigger receives it, n8n verifies the provider HMAC (whsec_ for Stripe). PROCESSING: n8n normalizes the payload and POSTs to Hermes POST /v1/runs (Bearer auth, Idempotency-Key=event_id, X-Hermes-Session-Key=lead:email, resumeUrl embedded); n8n parks on a Wait-on-webhook node. In parallel a deliver_only:true Hermes route pings the owner instantly (zero LLM). Hermes runs the agent loop — browser/web_extract enrichment, delegate_task fan-out, reasoning, draft generation — surviving provider 429s via fallback chain. On completion the agent HTTP-POSTs its JSON result back to n8n's resumeUrl (or n8n polls GET /v1/runs/{id}). OUTPUT: n8n resumes, posts the drafted email/SMS/CRM record to Slack/Telegram behind an Approve/Reject human gate; only on approval do the deterministic Gmail/Twilio/CRM nodes execute the irreversible send/write — every send logged and idempotent in n8n, never fired blind by the LLM.

**Build sequence**

1. Stand up n8n self-hosted via Docker (Community Edition, free, unlimited executions). For >1 concurrent long job enable queue mode (Redis + worker), set EXECUTIONS_TIMEOUT high and worker concurrency 10-20 (I/O-bound). Put a reverse proxy (Caddy/Cloudflare Tunnel) in front for TLS.
2. Enable the Hermes API server: set API_SERVER_ENABLED=true, API_SERVER_KEY=<strong-random>, API_SERVER_HOST=127.0.0.1 (LAN-only; expose via tunnel, never 0.0.0.0). Confirm GET /health on :8642 and that POST /v1/runs returns a run_id.
3. Enable the Hermes webhook adapter on :8644. Define platforms.webhook.extra.routes.<name> with a per-route HMAC secret, events filter, prompt template, skills list, deliver target. Set platforms.webhook.extra.secret globally — NEVER INSECURE_NO_AUTH (it is a documented unauth-RCE).
4. Build the canonical async workflow in n8n: (1) Webhook Trigger receives Stripe/form/Cal.com event; (2) verify provider signature in n8n; (3) Function node builds the Hermes prompt + a unique resumeUrl from a downstream Wait node; (4) HTTP Request node POSTs to http://hermes:8642/v1/runs with Authorization: Bearer + Idempotency-Key=<event_id> + the resumeUrl embedded in instructions; (5) Wait node 'On Webhook Call' parks the execution (offloaded to DB past 65s, frees the slot).
5. Teach Hermes to call back: the run's instructions tell the agent to, on completion, HTTP POST its JSON result to the n8n resumeUrl (via terminal curl or a tiny callback skill). This is the no-busy-poll path. Fallback path: n8n HTTP Request node polls GET /v1/runs/{run_id} every 5-10s with Retry-on-Fail until status=completed.
6. Add the deliver_only fast lane: a SECOND Hermes webhook route with deliver_only:true renders a 'New lead from {name}, {value}' template straight to Telegram/SMS in sub-second with zero LLM cost — fires in parallel with the reasoning run so the owner is pinged instantly.
7. Insert the human gate: n8n posts Hermes's drafted email/SMS/CRM note to Slack/Telegram with Approve/Reject buttons (n8n Wait-for-approval). Only on Approve do the Gmail/Twilio/CRM nodes execute the irreversible send/write.
8. Wire per-lead memory: n8n passes a stable X-Hermes-Session-Key=lead:<email> on every /v1/runs call so Hermes recalls prior context (FTS5 session_search) without the lead repeating themselves; keep transcript session_id separate.
9. Cost + reliability hardening: route auxiliary.compression/vision/web_extract to a flash model; set fallback_providers for 429/5xx survival; rely on Idempotency-Key to absorb Stripe's automatic webhook retries; enable Docker terminal backend + checkpoints if the agent mutates files.
10. Decision gate doc: codify when n8n is NOT worth it — if the trigger is purely time-based (cron) or a single platform Hermes already speaks (Telegram/Stripe-MCP/Gmail-skill) with no fan-out to 3+ SaaS deliveries, use Hermes-only cronjob + native webhook adapter and skip n8n entirely.

**Risks / gates**

- Webhook timeout mismatch: n8n's webhook is SYNCHRONOUS by default and the caller times out (~Stripe ~immediate, browsers ~30s) while a Hermes agent run takes minutes. MUST use the Wait-on-webhook async callback or poll GET /v1/runs — a naive blocking HTTP Request to /v1/runs will hang and drop the response. This is the #1 failure mode.
- Hermes webhook RCE if misconfigured: INSECURE_NO_AUTH disables signature validation and is a documented unauthenticated-RCE (GitHub issues #6440, #7089 re: missing Twilio sig). Every route MUST have a secret; the adapter must never bind to a public 0.0.0.0 without HMAC + a tunnel/allowlist.
- Money movement: Stripe refunds/charges and any balance-affecting action must NEVER be agent-automated. Exclude refund_payment/delete_customer from any Stripe MCP; n8n executes only read/notify on billing events. Hard human gate on anything touching money.
- Irreversible sends — CAN-SPAM (email) + TCPA (SMS/calling): Hermes DRAFTS, a human APPROVES, n8n SENDS. Autonomous outbound SMS/voice to consumers without consent is a TCPA liability ($500-$1,500/message). The Approve/Reject gate is mandatory, not optional, for any consumer-facing channel.
- Duplicate processing: Stripe (and n8n on worker crash) retry webhooks; without the Idempotency-Key header on /v1/runs and dedupe on n8n's side, a lead/email can be processed twice. Key on the immutable provider event id.
- Two-port exposure surface: API server (:8642) and webhook adapter (:8644) are separate listeners with separate auth (Bearer vs HMAC). Both must be firewalled to localhost/tunnel; a leaked API_SERVER_KEY grants full agent + terminal access.
- n8n single-main-process bottleneck: in non-queue mode, concurrent long Hermes calls block the n8n main process and degrade the editor/other webhooks. Queue mode (Redis + workers) is required once >1 long agent job can overlap.
- Over-engineering with n8n when Hermes-only suffices: if there is no multi-SaaS fan-out and the trigger is cron or a platform Hermes already speaks natively, adding n8n is pure operational overhead (a second service, Redis, a VPS) for no orchestration gain.
- Cost stacking on chatty pipelines: every n8n event that fires a full /v1/runs burns premium tokens; high-volume form spam can run up the bill. Gate with a cheap n8n pre-filter (or deliver_only fast lane) so only qualified events invoke the agent; route auxiliary tasks to a flash model.
- Self-hosted n8n is your uptime now: free Community Edition means no SLA — a crashed container drops in-flight webhooks (Stripe retries help; arbitrary forms may not). Needs --restart unless-stopped, health monitoring, and Stripe's retry as the safety net.

**Architecture**

##### n8n + Hermes: the deterministic-spine / agentic-middle split

**The thesis.** n8n and Hermes are complementary, not competing. n8n is a *deterministic event spine* — it has 500+ pre-built nodes, signature-verified webhook triggers, a visual flow you can audit, and idempotent delivery to email/SMS/CRM. What it has no native talent for is fuzzy, multi-step reasoning: read this messy lead, browse their site, decide if they qualify, draft a tailored reply. That is exactly Hermes's middle. The canonical pattern: **n8n ingests and delivers; Hermes thinks and acts.**

**The integration mechanism (concrete).** Hermes exposes two listeners. The **API server on :8642** (`API_SERVER_ENABLED=true`, Bearer `API_SERVER_KEY`) offers `POST /v1/chat/completions` for sub-30s synchronous reasoning steps and, critically, **`POST /v1/runs`** which returns a `run_id` for long agent work, pollable at `GET /v1/runs/{id}` or streamable at `/v1/runs/{id}/events`. The **webhook adapter on :8644** accepts `POST /webhooks/<route>` with HMAC (`X-Webhook-Signature`), and with `deliver_only:true` renders a template straight to Telegram/SMS at zero LLM cost.

**The one hard problem: timeouts.** n8n's webhook is synchronous — the caller (and Stripe, and browsers) time out long before a multi-minute agent run finishes. So the production flow is async: n8n's **Wait node ('On Webhook Call')** mints `$execution.resumeUrl`, parks the execution (offloaded to its DB past 65s, freeing the worker slot), and Hermes — instructed in the run prompt — **HTTP-POSTs its result back to that resumeUrl** when done. No busy-polling. Fallback: an n8n HTTP Request node with Retry-on-Fail polls `GET /v1/runs/{id}` until `completed`.

**End-to-end (lead-gen example).** Stripe `invoice.paid` or a Webflow form → n8n Webhook Trigger → n8n verifies the provider HMAC → n8n POSTs to `/v1/runs` (Bearer + `Idempotency-Key=<event_id>` + `X-Hermes-Session-Key=lead:<email>` for cross-call memory via FTS5 `session_search`) → n8n parks on Wait. In parallel a `deliver_only` Hermes route pings the owner's phone instantly. Hermes enriches (browser/`web_extract`, `delegate_task` fan-out to a cheap model), drafts the reply, callbacks the resumeUrl. n8n resumes → posts the draft to Slack/Telegram behind an **Approve/Reject gate** → only on approval do the Gmail/Twilio/CRM nodes fire the irreversible send/write.

**What Hermes is good for here:** the reasoning/browser/draft middle, per-lead memory, agentic enrichment, model-failover resilience (`fallback_providers`). **What must stay deterministic (n8n or human):** signature verification, the actual send/write (idempotent, logged), and dedupe. **What needs a hard human gate:** anything touching money (Stripe refunds — exclude from any MCP), and any consumer-facing email/SMS (CAN-SPAM / TCPA — Hermes drafts, human approves, n8n sends).

**When n8n is *not* worth it.** If the trigger is purely time-based, use a **Hermes `cronjob`** and skip n8n. If the event comes from a single platform Hermes already speaks (Telegram, a Stripe MCP, the Gmail/himalaya skill) and there's no fan-out to 3+ SaaS deliveries, use Hermes's own **webhook adapter + `hermes send`** directly. Reach for n8n precisely when you need (a) many pre-built SaaS connectors, (b) a visual audit trail non-developers can read, or (c) fan-out/branching deterministic delivery. Adding n8n's second service + Redis + VPS for a single-hop flow is pure overhead.

**Cost & ops.** Self-hosted n8n Community Edition is free with unlimited executions (~$5-7/mo VPS); enable **queue mode (Redis + worker, concurrency 10-20)** once long agent calls can overlap, or the single main process degrades. On Hermes, route `auxiliary.*` (vision/compression) to a flash model and gate full `/v1/runs` behind a cheap n8n pre-filter so form spam doesn't burn premium tokens. Self-hosting means no SLA — `--restart unless-stopped`, health checks, and Stripe's automatic retry are your safety net.

---

## 7. High-Ticket SEO Contract Campaigns

> A per-client Hermes profile carries each retainer's memory and config; a cron-ticked pipeline pulls SERP/GSC/backlink data through deterministic scripts (DataForSEO + Search Console API), Hermes reasons over the deltas to produce briefs, audits, and white-label reports delivered as native chat attachments, with every outbound send and money movement behind a human gate.

**Hermes components:** `Named profiles (one per client) with profile-scoped memory (MEMORY.md/USER.md) for per-client isolation`, `Cron scheduler — no-agent script mode for $0-LLM data pulls + agent mode for reasoning, --deliver to Telegram/Slack home channel/topic`, `Browser toolset (browser_navigate/browser_console/browser_vision) for on-page audits + Lighthouse/CWV capture`, `Subagent delegation (delegate_task) to fan out keyword research / draft sections on a cheap model while Opus runs the brief`, `Kanban board per client (--tenant / dir:<abs> workspace) for the recurring-deliverable task graph + review-required gate`, `Skills (SKILL.md) for keyword-brief, on-page-audit-rubric, white-label-report, backlink-prospecting playbooks; auto-become slash commands`, `Deliverable mode — PDF/xlsx/charts shipped as downloadable chat attachments`, `Inbound webhook adapter (HMAC) for GSC/Grafana/Stripe alerts and client-form intake`, `Checkpoints + /rollback (shadow git) to safely let the agent mutate a client site then undo a bad turn`, `session_search (FTS5) for 'did we cover this domain/keyword last month?' recall without burning tokens`, `Auxiliary model routing (vision/compression/web_extract -> Gemini Flash) for margin control across thousands of repetitive turns`, `Anthropic system_and_3 prompt caching + per-session estimated_cost_usd column for per-client billing/margin reports`

**External integrations**

| Tool | Role |
|---|---|
| DataForSEO SERP API (Standard live mode, Basic auth, base https://api.dataforseo.com/v3) | Mechanical rank tracking — $0.0012 per 10-result SERP. Called by a no-agent cron Python/curl script that posts the client's tracked keyword+location array, writes positions to SQLite/CSV, and only wakes the LLM (wakeAgent gate) when a position moves beyond threshold. Zero model spend on flat days. |
| DataForSEO Labs API (live, Basic auth) | Keyword research engine — Related Keywords / Keyword Suggestions / Keyword Ideas / Ranked Keywords / Keywords-For-Site / Competitors-Domain (~$0.01/request + small per-row). Hermes/delegated subagent calls it via execute_code or a skill-bundled curl to build the keyword universe and competitor gap list per client. |
| DataForSEO Backlinks API (live, 9 endpoints) | Backlink prospecting + competitor link-gap — $0.02/request, $0.03/1000 rows. backlinks/live + bulk_referring_domains feed a prospect list; pairs with Firecrawl to extract contact pages. PROSPECTING only — actual outreach sends stay behind a human gate. |
| DataForSEO On-Page API (live) | Programmatic technical-SEO crawl (100+ on-page params: titles, H-tags, canonicals, broken links, schema) as the deterministic backbone of the monthly audit; complements the browser toolset which captures the visual/CWV/JS-error layer. |
| Google Search Console API (POST /webmasters/v3/sites/{siteUrl}/searchAnalytics/query) | Source of truth for real client traffic — clicks/impressions/CTR/avg-position grouped by query\|page\|country\|device\|date (rowLimit up to 25k). Auth: a Google service account whose email is added as a Restricted user on each client's GSC property; scope webmasters.readonly. Pulled by a daily no-agent cron script; feeds the white-label report. |
| Firecrawl (MCP: firecrawl_search / firecrawl_scrape / firecrawl_crawl / firecrawl_extract) | Competitor content analysis, SERP content scraping for brief generation, and backlink-prospect contact extraction. Already installed as the user's web-data provider; routed via web.backend so search is cheap and extract is paid only when needed. |
| Browser toolset (Browserbase cloud + local sidecar) — browser_navigate/console/vision | On-page audit eyes: renders the client + competitor pages, browser_console surfaces silent JS errors, browser_vision screenshots and AI-analyzes layout/CTAs/above-the-fold; browser.record_sessions captures WebM proof of the audit run for the client report. |
| PageSpeed Insights / Lighthouse (HTTP API, free, key-gated) | Core Web Vitals + performance score per page, pulled by the audit cron script (deterministic) and embedded as a scorecard in the monthly report — the perf numbers clients care about. |
| Email send — himalaya / google-workspace skill OR Instantly/Smartlead via webhook | Outbound for backlink outreach + report delivery email. HARD HUMAN GATE: Hermes drafts to a Kanban review-required block or Gmail draft; a human approves before any send (CAN-SPAM compliance, irreversible). Never auto-send cold outreach. |
| Notion / Airtable / Google Sheets (skill or MCP) | Client-facing CRM + deliverable log: per-client keyword universe, content calendar, backlink tracker, and report archive as structured records the agent CRUDs and the client can view. |
| Stripe (MCP, read + webhook in; exclude refund/delete tools) | Retainer billing signal only — payment-succeeded webhook -> Hermes posts 'retainer X paid' to ops channel and unblocks that month's Kanban. Money movement (charging cards) is NEVER initiated by the agent. |

**Data flow:** TRIGGER: gateway-ticked cron fires per-client (daily rank + GSC pulls, weekly audit, monthly report) OR an inbound webhook (new-lead form / Stripe paid / GSC alert). INGEST (deterministic, no LLM): no-agent scripts call DataForSEO SERP/Labs/Backlinks/On-Page (Basic auth, live mode) and the GSC searchAnalytics API (service-account); raw positions, clicks/impressions, crawl findings, and CWV land in a per-client SQLite/CSV store. GATE: a wakeAgent check compares against last run — if nothing moved past threshold, the tick exits silent ($0 model spend). REASON (Hermes, the right profile loaded): on a meaningful delta or a scheduled deliverable, the agent loads client memory, runs session_search for prior context, and either (a) fans out keyword research / draft sections via delegate_task on a cheap model, (b) drives the browser toolset to capture the visual/JS-error/CWV audit layer, or (c) assembles a brief/report; auxiliary tasks (vision, summarization) route to Gemini Flash. ARTIFACT: deliverable mode renders a branded white-label PDF/xlsx (GSC trend + rank movement + audit scorecard + next-month plan) or a content brief. GATE: client-facing reports and all outreach drafts post to the Kanban as review-required: blocks; the human approves via /kanban unblock from their phone. OUTPUT: approved artifact delivers as a native downloadable attachment to the client's Slack/Telegram topic (or a Gmail draft for email send), the deliverable is logged to Notion/Airtable, and per-session estimated_cost_usd rolls into the monthly margin report.

**Build sequence**

1. 1. Install Hermes gateway as an always-on Windows Scheduled Task (hermes gateway install); set Telegram as primary gateway, home_chat_id to a per-client forum topic convention (telegram:<group>:<topic>). Set auxiliary.vision/compression/web_extract to Gemini Flash; main model Opus.
2. 2. Create one named profile per client (hermes -p clientA ...). Seed each profile's MEMORY.md with the client's domain, target geo, tracked keyword list, competitor set, brand voice, and GSC property URL. Enable profile-scoped memory so facts never leak across clients.
3. 3. Add DataForSEO Basic-auth creds + Google service-account JSON to .env (or Bitwarden Secrets Manager for fleet rotation). Add the service account email as a Restricted user on every client's GSC property.
4. 4. Write deterministic no-agent scripts: rank_pull.sh (DataForSEO SERP live -> SQLite + delta detection), gsc_pull.py (searchAnalytics/query -> CSV), audit_crawl.py (On-Page + PageSpeed). These are mechanical, cost only the API fee, and gate the LLM via wakeAgent (exit non-zero only on meaningful change).
5. 5. Author skills as SKILL.md: keyword-brief (SERP-content -> outline + entities + word-count target), onpage-audit-rubric (the audit checklist + scoring), backlink-prospect (qualify referring domains, draft outreach into review block), white-label-report (assemble GSC + rank + audit into a branded narrative). Pin them with the curator.
6. 6. Stand up the cron cadence: hermes cron create 'every 24h' --no-agent --script rank_pull.sh --name clientA-ranks (per client); 'every 24h' --no-agent --script gsc_pull.py; 'weekly' agent job --skill onpage-audit-rubric for the audit; '0 9 1 * *' (1st of month) agent job --skill white-label-report --deliver telegram:<topic> for the report. Use context_from to chain collect->reason->report.
7. 7. Wire the browser audit: agent job navigates client+competitor URLs, runs browser_console + browser_vision, attaches screenshots; enable checkpoints so any agent-driven site edit (e.g. fixing a meta tag on a site you host) is /rollback-able.
8. 8. Configure the inbound webhook adapter (platforms.webhook): a /webhooks/new-lead route (deliver_only for instant zero-LLM ping) and a /webhooks/stripe route (HMAC) for the billing signal. Add Stripe + Notion/Airtable MCP servers.
9. 9. Build the per-client Kanban board (hermes kanban boards create clientA --switch) with the monthly deliverable graph (research -> brief -> draft -> audit -> report) and a reviewer profile that emits review-required: blocks; you approve from your phone with /kanban unblock before anything client-facing ships.
10. 10. Insert HUMAN GATES explicitly: cold backlink-outreach emails and the final monthly report both land as drafts/review-required, never auto-send. Set approvals.mode so destructive/send tools require confirmation. Verify the whole loop on one pilot client for a full month before scaling profiles.

**Risks / gates**

- Cold backlink-outreach and report emails are irreversible and CAN-SPAM-regulated — auto-sending is a compliance and reputation risk. MITIGATION: hard human gate (Kanban review-required / Gmail draft), never agent-initiated send; include unsubscribe + physical address in any commercial email.
- DataForSEO/GSC costs scale linearly with client count and keyword volume; an unbounded keyword list or accidental agent-mode (vs no-agent) rank pull can balloon spend. MITIGATION: no-agent scripts for all data pulls, cap tracked keywords per client, wakeAgent gating, watch per-session estimated_cost_usd.
- Browser scraping of competitor sites and SERPs can trip anti-bot walls or ToS limits; SERP scraping for rank tracking is the legitimate use, but mass content scraping is grayer. MITIGATION: prefer DataForSEO (a licensed SERP provider) over self-scraping for rankings; use Firecrawl/Browserbase stealth only for public competitor pages.
- Buying backlinks or any paid placement is a Google webspam violation AND involves money movement — must never be agent-automated. MITIGATION: agent does prospecting + outreach drafting only; link acquisition decisions and payments are 100% human.
- Letting the agent mutate a client's live site (meta tags, schema) risks breaking production. MITIGATION: checkpoints + /rollback (shadow git), staging-first, and never grant write access to a site you don't host.
- LLM-generated content can hallucinate facts/stats or read as AI-slop, harming client SEO and trust. MITIGATION: humanizer skill on drafts, human editorial review before publish, cite GSC/DataForSEO real numbers not invented ones.
- Per-client data isolation failure (one client's facts surfacing in another's report) is a confidentiality breach. MITIGATION: profile-scoped memory + Kanban --tenant/per-board isolation + group_sessions_per_user; verify on the pilot before scaling.
- Google service-account access to GSC can be over-permissioned. MITIGATION: add as Restricted (read-only) user, webmasters.readonly scope only, rotate via Bitwarden.
- Rank-tracking deltas can mislead (SERP volatility, personalization, local-pack noise) and trigger false client-facing alarms. MITIGATION: fixed location/device params, multi-day smoothing in the delta script before the LLM narrates a 'drop'.

**Architecture**

##### High-Ticket SEO Retainers on Hermes — Architecture Brief

**Thesis.** An SEO retainer is a *recurring-deliverable* business: the same pipeline (rank check -> traffic read -> audit -> content -> report) runs every client, every cadence. Hermes is the orchestration/reasoning core, but the data ingestion must be **deterministic scripts**, not LLM turns — that is where margin is made or lost. Hermes earns its keep on judgment (briefs, audit narratives, report storytelling), not on fetching numbers.

###### Per-client isolation
Each client = one Hermes **named profile** with **profile-scoped memory**. `MEMORY.md` holds the durable client facts (domain, geo, tracked keywords, competitor set, brand voice, GSC property URL). This keeps Client A's data out of Client B's report — a confidentiality requirement, not a nicety. A per-client **Kanban board** (`boards create clientA --switch`, or one fleet with `--tenant`) holds the monthly deliverable task graph and the human-approval gate.

###### The data layer (deterministic, $0-LLM)
Three **no-agent cron scripts** do all ingestion:
- `rank_pull.sh` — DataForSEO **SERP API**, Standard *live* mode, Basic auth, `https://api.dataforseo.com/v3/serp/google/organic/live/advanced`. At **$0.0012 per 10-result SERP**, tracking 100 keywords daily costs ~$3.60/mo/client. Writes positions to SQLite, computes deltas, and exits *silent* if nothing moved (the `wakeAgent` pattern).
- `gsc_pull.py` — Google **Search Console API**, `POST /webmasters/v3/sites/{siteUrl}/searchAnalytics/query`, grouping by query|page|date, `rowLimit` up to 25k. Auth via a **service account added as a Restricted user** on each property (`webmasters.readonly`). This is the real traffic truth.
- `audit_crawl.py` — DataForSEO **On-Page API** (100+ params) + **PageSpeed/Lighthouse** for Core Web Vitals.

These run via `hermes cron create "every 24h" --no-agent --script ...`, chained to the reasoning layer with `context_from`.

###### The reasoning layer (Hermes)
On a meaningful delta or a scheduled deliverable, the agent loads the client profile and:
- **Keyword research / briefs** — `delegate_task` fans out DataForSEO **Labs** (Related/Suggestions/Ideas/Ranked/Competitors) + Firecrawl SERP-content scraping onto a *cheap* delegated model; Opus assembles the brief via a pinned `keyword-brief` skill.
- **On-page audit** — `audit_crawl.py` gives the mechanical layer; the **browser toolset** (`browser_navigate`, `browser_console` for silent JS errors, `browser_vision` for layout/CTA analysis, `record_sessions` for WebM proof) gives the visual/UX layer.
- **Backlink prospecting** — DataForSEO **Backlinks** (`$0.02/req` live) + Firecrawl contact extraction produce a qualified prospect list and *draft* outreach.
- **Reporting** — **deliverable mode** ships a branded white-label PDF/xlsx (GSC trend + rank movement + audit scorecard + next-month plan) as a downloadable attachment to the client's Slack/Telegram topic.

Route `auxiliary.vision/compression/web_extract` to Gemini Flash; lean on **system_and_3 prompt caching** and the per-session `estimated_cost_usd` column for monthly margin reports. Enable **checkpoints/`/rollback`** so agent-driven site edits are undoable.

###### What is NOT Hermes' job (human gates / deterministic code)
- **Cold backlink outreach + report email sends** — irreversible, CAN-SPAM-regulated. Hermes *drafts*; a human approves via Kanban `review-required:` or a Gmail draft. Never auto-send.
- **Buying links / any payment** — Google webspam violation *and* money movement. Prospecting only; acquisition + payment are 100% human.
- **Stripe** — read/webhook only (payment-succeeded -> unblock the month's board); never charge cards.
- **Rank-delta narration** — smooth over multiple days in the script before the LLM calls anything a "drop" (SERP volatility/personalization noise).

###### Build this week
Stand up the gateway as a Windows Scheduled Task, create one pilot-client profile, wire the three no-agent scripts + DataForSEO/GSC creds, author the four skills, set the cron cadence, and run the full monthly loop on **one** client before scaling profiles. The hard part is not the agent — it's disciplined cost gating and the human approval seam.

---

## 8. Contractor Template + Lead Funnel (current core)

> A Hermes webhook route turns each inbound lead into a parent session that delegates a rebrand-orchestrator subagent (clones the King Maker template, re-skins the lib/ config layer under checkpoint protection), triggers a Vercel deploy, then runs the 9-axis pass-verification skill against the live preview via the built-in browser toolset, loops fixes until the gate passes, writes the lead to an Airtable CRM, and notifies operator + prospect — with every irreversible step (prospect outreach, payment) behind a Telegram human gate.

**Hermes components:** `Inbound webhook adapter (platforms.webhook.extra.routes) — lead form -> agent run`, `AIAgent turn loop as the orchestration core (parent session per lead)`, `Subagent delegation (delegate_task) — the rebrand-orchestrator child with isolated context`, `Skills system — pass-verification (9-axis doctrine), post-pass-verification, motion-audit as slash commands`, `Checkpoints + /rollback (shadow git) — safe agent mutation of the cloned client site`, `Browser toolset (browser_navigate + browser_vision + browser_console) — live 9-axis visual verification`, `Cron scheduled tasks (cronjob) — Monday contractor-ad-research sweep + nightly regression re-verify`, `Hermes AS MCP server (mcp serve) — the bridge that lets Claude Code dispatch verification/rebrand from the desktop`, `Messaging gateway (Telegram) — dispatch back-channel, audit trail, and human approval gates`, `Consuming external MCP servers (client mode) — Airtable/Slack/Gmail MCPs for CRM + notify`, `Parent/child session lineage + FTS5 session_search — recall prior context per lead/client`, `Auxiliary model routing (vision/compression) — cheap model for screenshots/summaries, Opus for the customer-facing reasoning`, `Fallback providers + iteration budget — survive 429s and cap runaway verify-fix loops`, `Memory (MEMORY.md GATE RULE + USER.md) — the 'never claim shipped without hard verification' discipline persists across sessions`, `ShareGPT trajectory export (save_trajectories) — turn real verify/rebrand runs into a fine-tune set for a vertical-specialist model`

**External integrations**

| Tool | Role |
|---|---|
| Vercel REST API + Deploy Hooks + Webhooks | Deploy target. A per-project Deploy Hook URL (auth-less POST) triggers the build after the rebrand commit; a Vercel Webhook fires deployment.succeeded/deployment.error (x-vercel-signature sha1 HMAC) back into a Hermes webhook route so verification kicks off only on a confirmed-live preview. Git-push-to-branch is the primary deploy path (repo already watches master); the v13 /deployments API is the fallback for file-upload deploys. |
| Airtable Web API (REST POST /v0/{baseId}/{table}) + native webhooks | Lead CRM. Each qualified lead becomes a record (status: new -> built -> verified -> sent -> won). Reached via the bundled Hermes productivity/airtable skill or an Airtable MCP server in client mode. Chosen over Notion for table-centric schema + native webhooks + higher rate limits. |
| Form backend (serverless function on Vercel, or Formspree/Forminit) | Lead capture. The public lead form POSTs JSON to a Hermes webhook route; honeypot + reCAPTCHA v3/hCaptcha at the form layer keeps spam out of the agent loop. deliver_only:true gives a zero-LLM instant 'new lead' Telegram ping in parallel with the enrichment run. |
| fb_ad_library MCP (ScrapeCreators API) + Firecrawl | Prospect recon + competitive teardown. The contractor-ad-research skill pulls a prospect's competitors' Meta ads (ranked by longevity = profitability proxy); Firecrawl scrapes the prospect's current site to seed the rebrand brief (business name, services, geography, brand colors). |
| Anthropic Claude API | Reasoning core for the customer-facing orchestrator + verification judgment (Opus); a cheap Gemini Flash / Haiku auxiliary model handles vision screenshot description + compression to protect margin. |
| Stripe Payment Links API | HUMAN-GATED. Deposit/invoice link generated only after operator approves; money movement never auto-fires. Stripe webhook -> Hermes route can post 'paid' to the operator channel and flip the Airtable record to won. |
| Gmail / Slack MCP (client mode) | Prospect outreach + team notify. Outreach email is DRAFTED by the agent and HUMAN-GATED before send (CAN-SPAM); Slack/Telegram home channel gets the verified-site link + screenshot for the operator's one-click approve. |

**Data flow:** Lead form submit (honeypot+captcha) -> POST JSON to Hermes /webhooks/lead-intake (HMAC secret) -> deliver_only Telegram 'new lead' ping (0 LLM) + parent agent session opens -> agent enriches: Firecrawl scrapes source_site_url, fb_ad_library pulls competitor ads -> delegate_task spawns rebrand-orchestrator child: clone template -> enable checkpoints -> re-skin lib/ + globals.css from brief -> tsc + next build (code gate) -> commit -> POST Vercel Deploy Hook -> Vercel builds -> deployment.succeeded webhook (x-vercel-signature verified) -> POST to Hermes /webhooks/deploy-done -> resumes parent with live preview URL -> pass-verification skill: browser_navigate + browser_vision + browser_console across 9 axes -> findings table -> if FAIL: rollback-safe lib/ re-edit -> redeploy -> re-verify (loop, capped) -> on PASS: Airtable POST (status=verified) + Telegram home-channel link+screenshot with 'approve outreach?' HUMAN GATE -> on approve: Gmail draft sent (CAN-SPAM gate cleared by human) -> reply/booking tracked per-lead via FTS5 session_search -> operator manually issues Stripe Payment Link on close -> Stripe paid webhook -> Airtable status=won + Telegram notify.

**Build sequence**

1. Day 1 — Stand up the lead webhook. Enable platforms.webhook in config.yaml; add a route lead-intake with a secret + the rebrand prompt. Point a throwaway form (Formspree free tier) at it and confirm a POST becomes an agent run that pings Telegram via deliver_only:true (zero-LLM path first).
2. Day 1-2 — Lock the rebrand brief schema. Define the JSON contract the webhook passes to the agent: {business_name, niche (one of 9), city_list, phone, brand_hex, services[], source_site_url}. This maps 1:1 onto the lib/ config layer (BUSINESS, GEOGRAPHY, content-*.ts) so the rebrand is pure content replacement.
3. Day 2-3 — Author the rebrand-orchestrator skill (~/.hermes/skills/rebrand-orchestrator/SKILL.md). Steps: git worktree/clone the contractor-template branch into a per-lead dir; enable checkpoints; re-skin app/globals.css @theme + :root, lib/data.ts, lib/site.config.ts GEOGRAPHY, lib/content-*.ts from the brief; run tsc --noEmit + next build as the code gate; commit. Never touch components/ (motion). Dispatch it via delegate_task so it runs in isolated context with its own iteration budget.
4. Day 3 — Wire deploy + deploy-confirmation. Create a Vercel Deploy Hook for the client project; after the rebrand commit, the orchestrator POSTs the hook. Register a Vercel Webhook -> second Hermes route deploy-done that verifies x-vercel-signature and, on deployment.succeeded, resumes the parent session with the live preview URL.
5. Day 4 — Harden the 9-axis pass-verification skill. Formalize the 9 axes (content-visibility, text-reveal, counters, hover, character-stagger, density, layout, motion-fidelity, console/a11y) as explicit checks in SKILL.md; patch the >8000px full-page screenshot bug with an explicit viewport-scroll fallback (known Windows limitation). Output a severity-ranked findings table (FAIL/WARN) like the existing fix briefs.
6. Day 4-5 — Close the verify->fix loop. Parent session runs pass-verification against the live URL; on any FAIL, it /rollback-protected re-edits lib/ (or escalates if the fix needs components/ + the skills-gate Skills loaded: line), redeploys, re-verifies. Cap at delegation.max_iterations so it returns a summary instead of hanging.
7. Day 5 — CRM + human gates. On gate-pass, POST the lead to Airtable (status: verified) via the airtable skill; push the live link + hero screenshot to the operator's Telegram home channel with an explicit 'approve outreach? y/n' gate. Only on approval does the agent send the (pre-drafted) Gmail outreach. Payment link stays manual.
8. Day 6 — Schedule the recurring spine. cron: Monday contractor-ad-research sweep per active prospect (--deliver telegram, gated by a wakeAgent pre-check so it only spends tokens when new ads appear); nightly post-pass-verification regression across the 9 live preview routes to catch template drift.
9. Day 7 — Observability + training data. Turn on agent.save_trajectories (ShareGPT JSONL) to bank real verify/rebrand runs; confirm per-session estimated_cost_usd in state.db for per-lead cost reporting; document the whole loop in MEMORY.md so the GATE RULE and funnel stages survive session resets.

**Risks / gates**

- MONEY GATE (Stripe): payment-link creation and any charge must be human-initiated. Hermes may draft the link and flip CRM state on a verified Stripe webhook, but must never auto-charge or auto-refund. Exclude refund/charge write tools from any Stripe MCP.
- OUTREACH GATE (CAN-SPAM / cold email): the prospect-facing email is the single most irreversible send in the funnel. Agent drafts only; a human approves from Telegram before send. Honor unsubscribe + physical-address requirements in the template. Never let the webhook auto-send outreach.
- Verification is a judgment task, not a pass/fail oracle — browser_vision can hallucinate 'clean' on a real defect (the HVAC run showed a FAIL persisting across two passes). Keep the user-eyeball as the final gate before outreach; the agent's PASS unlocks the approval prompt, it does not skip it.
- Windows browser_vision >8000px screenshot failure is a live limitation; long preset pages exceed it. The viewport-scroll fallback must be explicit in the skill or tall pages get under-verified. A too-tall page is also a content-density signal worth flagging back, per the existing brief.
- Template-fidelity drift: the rebrand-orchestrator editing components/ (not just lib/) silently breaks the 'motion copies at 100%' guarantee. Enforce the lib/-only rule in the skill and rely on the skills-gate hook for the rare structural exception. Checkpoints/+rollback are the safety net for a bad agent turn.
- Single-machine SPOF: the gateway runs as a Windows Scheduled Task on the operator's laptop. If the laptop sleeps, inbound leads queue with no agent. Mitigation/upgrade path: move the gateway to a $5 VPS or Vercel Sandbox (hibernates, wakes on inbound) once the pilot proves out — already flagged in the install guide.
- Cost runaway on the verify->fix loop: an un-capped loop can burn Opus tokens redeploying forever. delegation.max_iterations + iteration budget must cap it; route vision/compression to a cheap auxiliary model; gate the Monday ad sweep behind a wakeAgent pre-check.
- Deploy-webhook trust: the deploy-done route must verify x-vercel-signature (sha1 HMAC) or a forged POST could trigger verification/outreach against an attacker URL. Same for the lead-intake route secret.
- Spam/abuse at the lead form: without form-layer honeypot + reCAPTCHA v3, junk submissions each open an LLM session. Filter at the form backend before the webhook, and keep the deliver_only ping separate from the enrichment run so a flood is cheap to absorb.

**Architecture**

##### Contractor template + lead funnel — Hermes as the brain

###### What already exists (build on, don't rebuild)
Hermes v0.14.0 runs on the operator's Windows box: a Telegram gateway as a Scheduled Task (auto-start on login) and an `mcp serve` bridge registered at user scope in `.claude.json`, exposing 10 messaging tools so Claude Code dispatches work and reads results back. Two skills are registered — `pass-verification` (the 9-axis doctrine) and `post-pass-verification` — and MEMORY.md carries a hard GATE RULE: never claim shipped without browser verification. The product is the King Maker contractor template: an American Masterworks flagship plus 9 per-vertical preset re-skins at `/preview/<niche>` on `contractor-template-preview.vercel.app` (~165 routes). All business content lives in a `lib/` config layer (`BUSINESS`, `BRANDS`, `LOCATIONS`, `LOCATION_CONTENT`, `content-*.ts`, `site.config.ts` GEOGRAPHY); `components/` are pure motion shells and are off-limits to rebrand edits (a skills-gate hook enforces a `Skills loaded:` line on any components/ edit).

###### The two halves
**1. Verification + rebrand brain (deepen what's built).** Promote `pass-verification` into a formal 9-axis skill: content-visibility, text-reveal, counters, hover, character-stagger (the King Maker non-negotiables) plus density (Axis 4), layout (Axis 5), motion-fidelity, and console/a11y. It drives the built-in browser toolset — `browser_navigate` + `browser_vision` + `browser_console` — against a live preview and emits a severity-ranked FAIL/WARN findings table exactly like the existing HVAC fix brief. Patch the known Windows `browser_vision` >8000px limit with an explicit viewport-scroll fallback. A new `rebrand-orchestrator` skill clones the `contractor-template` branch into a per-lead worktree, enables **checkpoints** (shadow git), re-skins only the `lib/` layer + `globals.css` from a structured brief, runs `tsc --noEmit` + `next build` as the code gate, and commits. Because it runs under `delegate_task`, it gets isolated context and its own iteration budget; `/rollback` undoes a bad turn including conversation state.

**2. The funnel (new).** Enable the inbound `webhook` adapter. A public lead form (honeypot + reCAPTCHA v3 at the form layer) POSTs JSON to `/webhooks/lead-intake` (HMAC secret). `deliver_only:true` fires a zero-LLM 'new lead' Telegram ping while the parent agent session enriches the lead (Firecrawl scrapes the prospect's current site; `fb_ad_library` via the `contractor-ad-research` skill pulls competitor Meta ads ranked by longevity). The agent fills a brief — `{business_name, niche, city_list, phone, brand_hex, services[], source_site_url}` — that maps 1:1 onto the lib/ layer, then delegates the rebrand. After commit it POSTs a **Vercel Deploy Hook** (auth-less trigger URL); on `deployment.succeeded` Vercel's **webhook** (verified via `x-vercel-signature` sha1 HMAC) hits `/webhooks/deploy-done`, which resumes the parent with the live URL. The parent runs the 9-axis verification, loops rollback-safe `lib/` fixes until the gate passes (capped by `delegation.max_iterations`), POSTs the lead to **Airtable** (status `verified`) via the bundled `airtable` skill, and pushes the live link + hero screenshot to the operator's Telegram home channel.

###### Human gates (non-negotiable)
- **Outreach (CAN-SPAM):** the agent *drafts* the prospect email in Gmail; a human approves from Telegram before send. The webhook never auto-sends.
- **Money (Stripe):** Payment Links are created manually on close; Hermes may flip Airtable to `won` on a verified Stripe `paid` webhook but never charges or refunds.
- **Final eyeball:** the agent's PASS unlocks the approval prompt — it does not replace the operator's look. The HVAC run proved a real FAIL can survive two automated passes.

###### What Hermes is good for here vs. not
Good: orchestration, content re-skin under checkpoint safety, multi-source enrichment, judgment-style visual verification, recurring ad/regression sweeps, per-lead memory via FTS5 `session_search`. Deterministic code instead: HMAC signature checks, the form spam filter, the Deploy Hook POST, and the Airtable write (a script is more reliable than an LLM turn). Human, not agent: every irreversible send and all money movement.

###### Cost + reliability
Route `browser_vision` description and compression to a cheap auxiliary model; keep Opus for customer-facing reasoning and verification judgment. `fallback_providers` survives 429s mid-run; the iteration budget caps the verify→fix loop. Per-session `estimated_cost_usd` in `state.db` gives per-lead billing. Upgrade path: move the gateway off the laptop to a VPS or Vercel Sandbox once the pilot proves out. Turn on `save_trajectories` to bank real runs as a fine-tune set for a future vertical-specialist model.


---

# Part III — Completeness Critic: Gaps, Corrections, Next Steps

## Capability gaps the research missed

| Area | What's missing | Why it matters |
|---|---|---|
| Profiles / multi-instance (the actual multi-tenant cloning mechanism) | No brief covers the `hermes profile` command surface beyond the phrase "named profile." The real v0.14.0 surface is profile {create,use,delete,describe,show,alias,rename,export,import,install,update,info} — including `profile export`->archive, `profile import`, and `profile install <git-url>` with a distribution manifest (version/requirements/source). `profile describe` is what the kanban orchestrator reads for auto-decompose routing. HERMES_HOME scoping (separate state.db/skills/auth.json/gateway PID + service name per profile) is the isolation primitive. | Every per-client vertical (receptionist 'clone the profile for client #2', SEO 'one profile per client', King Maker per-lead) hand-waves the cloning step. `profile export`/`import`/`install` is the supported, reproducible way to template-and-clone a client config (analogous to the contractor-template thesis). Without it, operators will hand-copy config.yaml/.env and drift. Also: `profile describe` is mandatory for the kanban auto-decompose routing the lead-vendor and King Maker briefs rely on. |
| Cost/usage analytics — `hermes insights` | No brief mentions `hermes insights --days N --source <platform>`, which analyzes session history for token usage, cost, tool patterns, and activity trends, filterable per platform. Every vertical instead hand-rolls per-client billing off the per-session `estimated_cost_usd` column in state.db. | All 8 verticals claim per-client/per-lead cost reporting as a Hermes strength. `insights --source telegram` (or per-profile) already produces the rollup they describe building from raw SQL. Building a custom aggregation when a first-class command exists is wasted effort and a likely source of off-by-one billing errors. |
| Live session transfer — `/handoff` | Not referenced anywhere. v0.14.0 made `/handoff` transfer the full active session (messages, tool calls, context) live to another model/persona/profile. The receptionist and Vapi 'premium' paths describe wanting a fast model live then deep reasoning at decision points but never mention `/handoff` as the mechanism. | The voice/receptionist verticals explicitly want to switch from a fast live model to a deep-reasoning model mid-interaction. `/handoff` is the supported way to do that without losing context, and is cheaper than re-priming a fresh session. |
| Trajectory capture -> fine-tune loop (batch mode is the companion, not an agent tool) | Lead-vendor and trading briefs both say 'turn on save_trajectories to tune a cheaper specialist' but neither connects it to `batch_runner.py` (the documented ShareGPT trajectory generator with --resume, per-prompt docker_image, toolset distributions). The pipeline trajectories(ShareGPT JSONL) -> batch eval/distill -> cheaper specialist model is left as a dangling intent. | It is the only concrete path from 'banked real runs' to an actually-cheaper production model. Without naming batch mode + a Nous Portal eval budget, 'tune a specialist later' is vaporware. This is a real, high-value next step, not just a tool name. |
| Webhook async-resume pattern is unique to the n8n brief but needed by ALL webhook verticals | Only the n8n brief solves the core webhook timeout problem (synchronous caller times out before a multi-minute agent run finishes -> park on a resumeUrl / poll GET /v1/runs/{id}). The Vapi, receptionist, lead-vendor, and King Maker briefs all POST to Hermes webhook routes and assume a timely synchronous response, but a full agent run will blow Vapi's ~7.5s tool budget and Cal.com/Stripe webhook timeouts. The Vapi brief half-acknowledges this ('pre-cache slots') but the others do not. | This is the single most common production failure for these designs. Vapi custom-tool calls and Stripe/Cal.com webhooks have hard short timeouts; a deliberate Opus turn will exceed them. Every webhook-fed vertical needs the deliver_only-ack-now + /v1/runs-callback-later split that only the n8n brief describes. Should be hoisted to a shared pattern. |
| computer_use is macOS-only even in v0.14.0 (and this is a Windows box) | The release-note headline 'computer_use cua-driver works with non-Anthropic models now' could mislead readers into thinking it became cross-platform. The CLI (`hermes computer-use`) and toolset are still macOS-only; on this Windows install computer_use and execute_code are both unavailable (no Unix sockets / macOS SPIs). The tools brief flags this correctly; no vertical leans on it, but a builder might reach for execute_code for chart rendering in deliverable mode. | Trading and SEO briefs depend on chart/PDF/xlsx generation for deliverable mode. The deliverable-mode doc lists execute_code (matplotlib) as the primary chart producer — but execute_code is UNAVAILABLE on Windows (falls back to sequential calls). On this box, chart generation must go through the terminal backend running Python directly, or the Docker backend, not execute_code. None of the briefs note this Windows constraint on the artifact-generation path. |
| Reconciliation of money-movement: meter-events are async with no synchronous confirmation | Only the lead-vendor brief correctly states Stripe meter events are async ('reconciliation, not fire-and-forget'). The receptionist, King Maker, and SEO briefs gate money on a Stripe 'paid'/'payment-succeeded' webhook flipping a board/Airtable state, but none note that the Stripe webhook itself must be signature-verified with `Stripe-Signature` (HMAC) and that webhook delivery is at-least-once (idempotency required to avoid double-unblocking/double-billing). | At-least-once webhook delivery + missing idempotency = double-charged customers or double-delivered leads. The lead-vendor brief's idempotency-key discipline should be a shared requirement across every vertical that consumes a Stripe/Cal.com/Instantly webhook, not just the one that mentioned it. |
| API-server-as-reasoning-endpoint (Clay/n8n/Vapi-custom-LLM) all expose the full toolset including terminal | Cold-email (Clay calls /v1/chat/completions), n8n, and Vapi-premium (custom-LLM -> :8642/v1) all route external callers into the Hermes API server. The docs are explicit that the API server exposes the FULL toolset including `terminal` = a remote code-execution surface, and that CORS is off and the key is mandatory off-loopback. None of these three briefs scope the toolset down (e.g. the `safe` or a custom read-only toolset) for the externally-reachable endpoint. | An attacker-controlled payload (spam form row, malicious lead, prompt-injected email) reaching a full-toolset API server can drive `terminal`. The receptionist brief correctly says 'sandbox the gateway' for webhooks; the same hardening (toolset restriction + Docker backend + INSECURE_NO_AUTH never used) must apply to the API-server reasoning endpoint these three verticals depend on. |
| Provider/model default reality vs brief assumptions | Live config `model.default: claude-opus-4-7`, provider `anthropic` (direct, not Nous Portal — `providers: {}`, `fallback_providers: []`). Several briefs assume Nous Portal ('one OAuth, web/image/TTS/browser without separate keys') and assume `fallback_providers` is configured for 429 survival. On this box NEITHER is set: there is no fallback chain and no credential pool, so the 'survives a mid-call/mid-scan 429' reliability claim is currently FALSE until the operator runs `hermes fallback`/`hermes auth add`. | Every vertical cites fallback_providers + credential pools as the uptime story. With an empty fallback list and a single direct-Anthropic key, a 429 during a live voice call or a lead-enrichment burst will hard-fail. This is a 'wire it before you ship' gap that all 8 briefs assume is already done. |
| Honcho / external memory for per-caller modeling | The receptionist and Vapi briefs want per-caller memory across calls but use only USER.md + FTS5 session_search. Honcho (dialectic user modeling, multi-peer per workspace) is bundled and is the purpose-built fit for 'remember this specific caller across sessions.' honcho: {} is empty in live config (not set up). | USER.md is a single frozen ~500-token snapshot per profile — it cannot hold N distinct callers' models. For a receptionist serving many end-callers under one contractor profile, Honcho's multi-peer-per-workspace model is the right tool; session_search alone gives recall but not per-caller representation. |

## Corrections (factual / risk)

- FACTUAL ERROR (integration-backbone brief): 'fallback_providers ... Does NOT cover subagents or cron.' Source contradicts this for cron. provider-runtime.md:198 and cron-internals.md:153-158 confirm cron jobs DO inherit fallback (run_job passes fallback_providers/fallback_model to AIAgent) AND the credential pool (load_pool on 429). Only SUBAGENT DELEGATION lacks fallback (delegate_tool: subagents inherit the parent's provider but not fallback config). The lead-vendor brief's statement that cron 'inherits fallback_providers + credential-pool rotation' is the CORRECT one. Fix the integration-backbone brief.
- FACTUAL ERROR (lead-vendor brief): the Stripe ingestion route says 'verify X-Webhook-Signature.' Stripe does NOT use that header — Stripe signs webhooks with the `Stripe-Signature` header (t=timestamp,v1=HMAC-SHA256). `X-Webhook-Signature` is HERMES'S OWN generic webhook header (confirmed at gateway/platforms/webhook.py:676-677). The brief conflated Hermes's generic HMAC header with Stripe's. Stripe verification must use the Stripe SDK/`Stripe-Signature` + the endpoint signing secret, almost certainly in deterministic code (n8n or a Python handler), not Hermes's generic webhook HMAC.
- RISKY/CONTRADICTORY (lead-vendor brief): pins `POST api.cal.com/v2/bookings` to `cal-api-version: 2026-02-25`. Cal.com's create-a-booking docs document `cal-api-version: 2024-08-13` for that endpoint; 2026-02-25 is a NEWER version that changes required fields/response shape and is not the documented create-booking version. This also contradicts the receptionist brief (which correctly uses 2024-08-13 for POST /v2/bookings and 2024-09-04 for GET /v2/slots). Standardize on 2024-08-13 for create; only adopt 2026-02-25 deliberately and test the changed payload. Source: https://cal.com/docs/api-reference/v2/bookings/create-a-booking
- OVERSTATEMENT (trading + SEO briefs): 'deliverable mode' is described as something you invoke (e.g. '--deliverable', 'ships ... via deliverable mode'). Per website/docs/.../deliverable-mode.md it is NOT an invokable mode or flag — it is automatic gateway behavior: the agent writes a file to an ABSOLUTE path and mentions that path as plain text; the gateway extracts and uploads it natively. Two consequences the briefs miss: (a) `.py`/`.log`/source extensions are intentionally EXCLUDED, and (b) on Windows execute_code (the doc's primary matplotlib chart path) is UNAVAILABLE — charts must be rendered via the terminal/Docker backend instead. The outcome the briefs want is real; the framing and the Windows generation path need fixing.
- RISK (lead-vendor brief): 'Stripe MCP (read-only subset, exclude refund/delete).' There is no first-party Hermes 'Stripe MCP'; this is a community MCP server. The intent (read-only, exclude refund/delete tools) is right and matches the trading/SEO/n8n 'exclude refunds from any MCP' rule, but the brief should name it as a third-party MCP and verify the specific server actually supports tool include/exclude (Hermes mcp_servers tools.include/exclude filters use the ORIGINAL tool name, not the sanitized mcp_<server>_<tool> name — a documented gotcha that will silently no-op an exclude if written wrong).
- RISK (multiple briefs, deployment): the WeCom adapter defaults its callback host to 0.0.0.0 (gateway/config.py:1625 WECOM_CALLBACK_HOST default '0.0.0.0'), unlike BlueBubbles/Feishu which default 127.0.0.1. No vertical uses WeCom, but the general 'never bind 0.0.0.0' guidance (correctly stated for the kanban dashboard and API server) should note that at least one shipped adapter defaults to all-interfaces — audit any adapter's host before exposing the box. Also: the web dashboard's `--insecure` flag is documented as 'DANGEROUS: exposes API keys on the network' — the SEO brief uses the dashboard for cost reports and should never pair it with --insecure or a non-loopback --host.
- CORRECTION (King Maker brief): 'Vercel Deploy Hook (auth-less trigger URL)' is accurate, but the inbound 'deployment.succeeded' verification is described as 'x-vercel-signature sha1 HMAC' — Vercel's webhook signature is indeed an HMAC-SHA1 in `x-vercel-signature`, so this is correct; flagging only because the brief should ensure the secret is the Vercel webhook signing secret (not the deploy-hook URL token) — two different secrets that are easy to swap.
- CLARIFICATION (cold-email brief): correctly notes Instantly v2 webhooks 'auto-disable (status:-1) after delivery failures.' Pair this with a `hermes` no-agent watchdog cron that re-checks/re-arms the Instantly webhook, because Hermes's OWN generic webhook adapter does NOT auto-disable on failure — the auto-disable risk is entirely on Instantly's side, so the monitoring must poll Instantly's webhook status, not Hermes's.

## Highest-value next steps

- WIRE RELIABILITY BEFORE ANY VERTICAL SHIPS: live config has `fallback_providers: []`, empty credential_pool_strategies, and a single direct-Anthropic key. Run `hermes fallback` to add at least one cross-provider fallback (e.g. Anthropic->OpenRouter or Nous Portal) and `hermes auth add` to build a same-provider key pool. Until then, every brief's '429-survival' claim is false. Remember the scope: fallback+pool cover cron and the main loop but NOT subagent delegation — so give long delegate_task fan-outs (lead enrichment, per-ticker research) their own per-task provider/model override rather than assuming they inherit failover.
- HOIST THE ASYNC WEBHOOK PATTERN INTO A SHARED PRIMITIVE: only the n8n brief solves the timeout problem. Build one reusable pattern — webhook route with deliver_only:true acks instantly (zero-token), then a POST to /v1/runs returns a run_id, and the long agent run callbacks a resumeUrl (n8n Wait node) or the caller polls GET /v1/runs/{id}. Apply it to Vapi custom-tools (which have ~7.5s budgets), Cal.com, and Stripe webhooks in the receptionist/lead-vendor/King Maker designs. This single fix prevents the most common production failure across five of the eight verticals.
- HARDEN THE EXTERNALLY-REACHABLE API SERVER: Clay, n8n, and Vapi-premium all point external callers at :8642/v1, which exposes the FULL toolset including `terminal`. Before exposing it: set a custom read-only toolset (or `safe`) for the API-server platform via platform_toolsets, run the gateway on terminal.backend: docker (not local — current config is `local`, giving full-FS terminal access), require API_SERVER_KEY (>=8 chars), keep CORS off, never use INSECURE_NO_AUTH, and never bind 0.0.0.0 without a reverse proxy + auth in front. The receptionist brief's 'sandbox the gateway' must extend to the API-server endpoint, not just webhook routes.
- STANDARDIZE COMPLIANCE GATES AS DETERMINISTIC CODE WITH IDEMPOTENCY KEYS, SHARED ACROSS VERTICALS: the strongest pattern (lead-vendor + Vapi: TCPA quiet-hours/DNC/consent and Stripe idempotency in code, never LLM judgment) should be a single shared wakeAgent gate + ledger-write helper reused by receptionist, cold-email, and King Maker. Concretely: (a) every Stripe/Cal.com/Instantly webhook handler verifies the provider's OWN signature header (Stripe-Signature, x-cal-signature-256, Instantly custom header) — NOT Hermes's generic X-Webhook-Signature; (b) every money/lead state transition is idempotency-keyed on the event ID to survive at-least-once webhook redelivery; (c) A2P 10DLC registration started day 1 for any SMS vertical (10-15 day carrier review is the critical-path blocker the receptionist brief correctly flags).
- USE PROFILES AS THE MULTI-TENANT TEMPLATE, AND `hermes insights` FOR BILLING: replace the hand-rolled 'clone the config' step in every per-client vertical with `hermes profile export` (golden template) -> `profile import`/`profile create` per client, with one Docker container or Scheduled Task per profile for blast-radius isolation. Replace the hand-rolled estimated_cost_usd SQL aggregation with `hermes insights --source <platform> --days 30` for per-client cost/token/tool rollups. Both already exist; building them again is wasted effort and a billing-accuracy risk.
- PROVE THE TRAJECTORY->SPECIALIST LOOP OR DROP THE CLAIM: lead-vendor and trading both promise a cheaper fine-tuned specialist 'later.' Make it concrete with batch_runner.py: export save_trajectories ShareGPT JSONL -> `python batch_runner.py --dataset_file=... --resume` against a candidate cheap model with the same toolset distribution -> compare tool-call accuracy/cost-per-trajectory before swapping the production aux/delegation model. Without this the 'tune a specialist' line is aspirational; with it it's a measurable cost-reduction step (and Nous Portal gives predictable cost-per-trajectory for the eval).
- FIX THE WINDOWS ARTIFACT-GENERATION PATH: deliverable mode's documented primary chart producer (execute_code/matplotlib) is UNAVAILABLE on this Windows box. For the trading equity-curve PNG/xlsx and SEO white-label PDF/xlsx deliverables, render via the terminal backend running Python directly (or terminal.backend: docker), write to an absolute path, and mention the path in the gateway reply (or attach via `hermes send -f PATH`). Validate one real artifact actually uploads to Telegram/Slack before claiming the reporting loop works — and note source/.py files are auto-excluded from delivery.
