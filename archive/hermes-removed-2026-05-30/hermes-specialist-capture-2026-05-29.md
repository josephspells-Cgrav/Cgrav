# Hermes Agent — specialist capture (2026-05-29)

Drop for Mode D ingest into the `ai-tooling` hub. Durable state from the Hermes install + mastery-research arc.

## Status change
- **Hermes Agent v0.14.0 is INSTALLED + OPERATIONAL** on the Windows box. No longer evaluating — it's live.
- Master reference written: `C:/Users/josep/Claude Gravity/HERMES_SPECIALIST_GUIDE.md` (1,500 lines: front-matter + Part I capability reference, Part II 8-vertical playbook, Part III critic). Built from a 17-agent research workflow against the on-disk version-matched docs + live config + session hardening.
- Companion files: `HERMES_INSTALL_GUIDE.md`, `HERMES_INTERFACE_GUIDE.md`, `HERMES_AVAILABLE_NOTIFICATION.md`.

## Architecture locks
- Hermes role = **orchestration + verification + dispatch layer**, NOT a smarter brain (same Claude underneath; it does not raise the model quality ceiling).
- Real install paths: home = `C:/Users/josep/AppData/Local/hermes/` (NOT `~/.hermes/`). Config `config.yaml`, secrets `.env`, sessions `state.db` (schema v13), memory `memories/MEMORY.md`, skills `skills/<category>/<name>/SKILL.md`, venv `hermes-agent/venv/`.
- Model: `claude-opus-4-7`, provider `anthropic` direct. Backend `local`. `agent.max_turns: 150` (raised from 90).
- Telegram gateway: bot **Hermes The Great**, paired to user `8382218041`, Scheduled Task `Hermes_Gateway`, auto-start on login.
- **MCP bridge to Claude Code** registered user-scope in `C:/Users/josep/.claude.json` → 10 `mcp__hermes__*` messaging tools. Dispatch from Claude Code → Hermes runs server-side → echoes to Telegram (audit trail).
- Skills built: `pass-verification` + `post-pass-verification` (both `devops/`). 9-axis King Maker doctrine + GATE RULE loaded into `MEMORY.md`.

## Insights / decisions
- Verification gap CLOSED: `pass-verification` (browser+vision+DOM probes, severity-ranked 9-axis table) validated on real HVAC/preview pages; 4/5 findings independently confirmed against raw screenshots. Caught a duplicated-city-list content bug, empty grid slot, broken step numbering.
- 8 future verticals scoped with concrete architectures (Part II): lead vendor + appts, Vapi outbound voice, AI receptionist, cold email (Clay+Instantly), stock/crypto, n8n layer, SEO contracts, contractor funnel.

## Mistakes / gotchas banked (full list in guide's "Battle-tested hardening")
- `browser_vision` crashes on >5MB / >8000px screenshots → needs **Pillow** (now installed) for auto-shrink; tall pages use DOM probes instead.
- Notepad mangles `SKILL.md` (escapes markdown, UTF-8→CP1252 em-dashes, breaks `---` frontmatter). Write skills from a real editor.
- `hermes config set` on nested keys (`skills.external_dirs`, `toolsets`) saves a literal STRING not a YAML list — edit `config.yaml` directly.
- `hermes skills list` (not `inspect`) for local skills. Gateway verbs are positional (`hermes gateway stop`, not `--stop`).
- MCP add needs `--scope user` or tools only load in one project.

## The 9 traps (production-killers — see guide "Read first")
1. NO failover wired (`fallback_providers: []`) — "survives a 429" is FALSE today.
2. Webhook callers time out (Vapi ~7.5s budget) — need async ack pattern.
3. API server exposes full toolset incl `terminal` = RCE surface — restrict toolset + docker backend before exposing.
4. Verify the provider's OWN webhook signature header + idempotency key.
5. `execute_code`/`computer_use` unavailable on Windows — render artifacts via terminal/docker Python.
6. Deliverable mode is automatic (write abs path + mention it), not a flag; `.py` excluded.
7. `hermes profile export/import` is the multi-tenant clone primitive — one profile per client.
8. `hermes insights` for billing rollups — don't hand-roll SQL.
9. Honcho (unset) for per-caller memory — USER.md can't hold N callers.

## Next steps (not yet done)
Wire failover + credential pool; async-webhook shared primitive; harden API server; profiles-as-tenancy; `hermes update` (33 commits behind); fleet skill for the 4 deferred doctrine axes.
