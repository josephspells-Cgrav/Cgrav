# Hermes Interface Guide

Operational guide for the Hermes Agent install on Windows. Multiple interfaces are available — pick by task, not by habit.

## What's installed (and where to find it)

| Component | Path / endpoint | Status |
|---|---|---|
| Hermes core | `C:\Users\josep\AppData\Local\hermes\` | v0.14.0 — 33 commits behind upstream as of 2026-05-25 |
| Hermes CLI binary | `C:\Users\josep\AppData\Local\hermes\hermes-agent\venv\Scripts\hermes.exe` | On PATH in your user PowerShell |
| State / sessions DB | `C:\Users\josep\AppData\Local\hermes\state.db` | SQLite — all transcripts queryable via FTS5 |
| Memory file | `C:\Users\josep\AppData\Local\hermes\memories\MEMORY.md` | 9-axis doctrine + project context + GATE RULE loaded |
| Skills | `C:\Users\josep\AppData\Local\hermes\skills\` (bundled) + `C:\Users\josep\hermes-skills\` (your external) | `pass-verification` and `post-pass-verification` registered |
| Telegram gateway | Scheduled Task, auto-starts on Windows login | Bot: `Hermes The Great`, paired to user 8382218041 |
| Anthropic API key | `C:\Users\josep\AppData\Local\hermes\.env` | Configured, model = `claude-opus-4-7` |
| Claude Code MCP bridge | `C:\Users\josep\.claude.json` (user scope) | `hermes` registered as stdio MCP server, exposes 10 messaging tools |

## How to start each interface

| Interface | Command | When to use |
|---|---|---|
| **Claude Code with Hermes MCP** | Just open Claude Code. MCP tools auto-load. | Default. Best interface for verification dispatch, synthesis, fix-brief authoring. |
| **TUI in PowerShell** | `hermes --tui` | When you want a richer terminal interface and aren't already in Claude Code. |
| **Web dashboard** | `hermes dashboard` then open `http://127.0.0.1:9119` | Browser-based config view + session browser. Use `--tui` flag to embed chat tab. |
| **One-shot CLI** | `hermes chat -q "your prompt"` | Scripted/automated dispatch. |
| **Telegram (phone)** | Open the **Hermes The Great** chat in Telegram | Mobile dispatch from anywhere. Already paired. |
| **Telegram gateway service** | Auto-starts on login. Manual: `hermes gateway start` | Should always be running — required for Telegram + MCP bridge dispatch back-channel. |

## How to stop each interface

| Interface | Stop command |
|---|---|
| TUI | Ctrl+C inside the TUI, or `/exit` |
| Web dashboard | `hermes dashboard --stop` |
| Gateway | `hermes gateway --stop` (rare — usually leave running) |
| MCP bridge | Quit Claude Code Desktop (stdio process dies with parent) |

## How to switch between them

| Task | Best interface |
|---|---|
| "Verify Pass N against URL X" | Claude Code (this UI) — say "verify pass against X" and I'll dispatch via MCP |
| "Show me what Hermes found yesterday" | Claude Code — I'll query state.db directly via Read |
| "Dispatch from my phone while away from laptop" | Telegram — send the prompt to Hermes The Great bot |
| "Author or edit a skill" | Claude Code — direct file edits to `~\AppData\Local\hermes\skills\` |
| "Check live memory contents" | `hermes memory` from PowerShell, OR read `MEMORY.md` directly |
| "Browse session history visually" | Web dashboard (`hermes dashboard`) — session browser tab |

## What goes through the MCP bridge

The bridge exposes **10 messaging-gateway tools**, not raw Hermes tools. So when I dispatch a verification from Claude Code:

1. I send a task message via `mcp__hermes__messages_send` (target: `telegram:8382218041`)
2. Hermes receives it via the Telegram gateway and runs the task with **full toolkit** (browser_vision, skills, memory, file)
3. Result comes back as a Telegram reply
4. I retrieve it via `mcp__hermes__messages_read` or `events_wait`

**Side effect:** every MCP-dispatched task echoes into your Telegram chat with the bot. Treat this as a feature — mobile audit trail of everything Claude Code dispatches.

## Security posture (verified)

| Check | Result |
|---|---|
| `.env` location | `%LOCALAPPDATA%\hermes\.env` — outside any tracked repo |
| API key exposure | None — keys never leave local machine. `--insecure` flag required to bind beyond 127.0.0.1, never used. |
| Dashboard port binding | 127.0.0.1:9119 (localhost-only by default) |
| Telegram allowlist | `allowed_chats: '8382218041'` in `config.yaml` — only your numeric ID can use the bot |
| MCP bridge transport | stdio (Claude Code's child process) — no network port exposed |
| Bot token rotation | Procedure: BotFather → `/revoke` → select bot → API Token → Revoke current token → paste new token via `hermes setup gateway` |

The "local hosting is a security risk" framing some YouTubers push is mostly marketing for hosted alternatives. Default Hermes install never exposes API keys beyond your machine.

## Known limitations on this Windows install

| Limitation | Workaround |
|---|---|
| `browser_vision` fails on screenshots > 8000px in any dimension | Hermes auto-recovers with viewport-scroll fallback (saw this on the HVAC run). Patch v0.2 of `pass-verification` skill to make the scroll-fallback explicit. |
| External workspace UIs (hermes-workspace, hermes-webui) require WSL | Don't install them. The Claude Code MCP bridge gives you the same outcome without WSL. |
| MCP tool schemas get unloaded between calls in some sessions | Re-load via `ToolSearch(query: "hermes")` before invoking. Cheap. |
| Hermes CLI shutdown emits `Fatal Python error: _enter_buffered_busy` on Windows | Cosmetic. Fires AFTER output completes. Ignore. |
| Telegram bot recognizes only one paired user (8382218041) | To pair another: `hermes pairing approve telegram <code>` after the new user messages the bot. |

## Phone access option (future paid path)

If Telegram alone isn't enough for mobile work later:

- **FlyHermes** / **OpenClaw Launch** — hosted Hermes-as-a-service with HTTPS web access from any device.
- Cost: subscription (~$20-50/mo depending on tier).
- Trade-off: API keys go through their infra. Vendor trust matters.
- **Skip unless** you need true mobile workspace access beyond messaging.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `mcp__hermes__*` tools not showing in Claude Code | MCP registered at project scope, not user scope | `claude mcp remove hermes` then `claude mcp add --scope user hermes -- "C:\Users\josep\AppData\Local\hermes\hermes-agent\venv\Scripts\hermes.exe" mcp serve`, restart Claude Code |
| Telegram bot doesn't respond | Gateway service stopped | `hermes gateway start` from PowerShell |
| Verification fails with vision API 400 | Page > 8000px tall | Patch incoming for `pass-verification` skill. For now, dispatch against a shorter page or accept the auto-recovery cost. |
| `hermes` command not found in PowerShell | PATH not refreshed after install | Open a new PowerShell window |
| Tool registration succeeded but no tools visible in this Claude Code session | Working dir mismatch (project scope) | Verify `claude mcp list` shows hermes without `[project: ...]` suffix. If shown, it's project-scoped — see first row. |

## What to do TODAY going forward

1. **Stop typing `hermes chat -q`.** Just say "verify X" in Claude Code; I dispatch via MCP.
2. **Keep Telegram open on your phone.** It's the mobile dispatch surface AND the audit trail for everything Claude Code sends to Hermes.
3. **Quit-and-restart Claude Code** any time you add/remove MCP servers — schemas resolve at startup only.
4. **Run `hermes update`** from a separate PowerShell tab when you have 5 spare minutes (you're 33 commits behind, latest version may close the 8000px vision bug).
