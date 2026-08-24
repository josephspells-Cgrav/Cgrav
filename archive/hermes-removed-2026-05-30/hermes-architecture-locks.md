# Hermes — architecture locks (canonical wiring)

The exact on-disk + runtime wiring of the operational Hermes Agent (v0.14.0, 2026-05-29). Supersedes the narrower [[hermes-home-windows-env-var]] with the full picture.

## Install paths (Windows)
- **Home:** `C:/Users/josep/AppData/Local/hermes/` (NOT `~/.hermes/`).
- Config `config.yaml` · secrets `.env` · sessions `state.db` (schema **v13**) · memory `memories/MEMORY.md` · skills `skills/<category>/<name>/SKILL.md` · venv `hermes-agent/venv/`.

## Model + backend
- Model **`claude-opus-4-7`**, provider `anthropic` (direct). Backend `local`.
- `agent.max_turns: 150` (raised from 90).

## Telegram gateway
- Bot **Hermes The Great**, paired to user `8382218041`.
- Windows **Scheduled Task `Hermes_Gateway`**, auto-start on login.
- Operational verbs (stop/start/restart) in [[hermes-gateway-operations]].

## MCP bridge to Claude Code
- Registered **user-scope** in `C:/Users/josep/.claude.json` → 10 `mcp__hermes__*` messaging tools.
- Flow: dispatch from Claude Code → Hermes runs server-side → echoes to Telegram (audit trail).
- Routing target convention: [[hermes-mcp-routing]] (`telegram:-1003758503447:2`, Batman And Robin / topic 2).

## Skills loaded
- `pass-verification` + `post-pass-verification` (both under `devops/`).
- 9-axis King Maker doctrine + GATE RULE loaded into `MEMORY.md`.

---
Filed under [[hub-ai-tooling]]. Parent: [[hermes-specialist-arc-2026-05-29]] · Traps: [[hermes-production-traps]] · Gotchas: [[hermes-hardening-gotchas]]
Back to [[index]]
