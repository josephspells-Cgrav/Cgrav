# Hermes gateway — operational runbook (Windows)

Operational fixes for running the Hermes Agent gateway on Windows, captured from the dedicated **Hermes specialist / install-guide** session (`9f21ff7e`, 2026-05-29). Companion to [[hermes-mcp-routing]] (where to send) and [[hermes-home-windows-env-var]] (where config lives).

## Gateway commands (the right verbs)
```powershell
hermes gateway stop
hermes gateway start
hermes gateway restart    # kills running gateway proc(s) + restarts via Scheduled Task
```
- **`hermes gateway --stop` is wrong** (that flag errors with usage text). Use the subcommand form above.
- `restart` output looks like: `✓ Killed N gateway process(es)` → `✓ Gateway stopped` → `✓ Gateway started via Scheduled Task 'Hermes_Gateway' (PID: ...)`.
- The gateway runs as a Windows **Scheduled Task named `Hermes_Gateway`**.

## Two operational fixes locked this session
1. **Pillow must be installed in the Hermes venv** — image handling fails without it. Install into the gateway's own interpreter:
   ```powershell
   & "C:\Users\josep\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe" -m pip install Pillow
   ```
2. **`max_turns` raised to 150** — prior runs were truncating before completing verification dispatches.

## Key behavior: fixes are system-wide
After installing Pillow + raising max_turns + restarting the gateway, **no agent needs to "know" anything** — the fix applies to every future dispatch. There is no per-issue knob; Hermes just runs whatever it's told with the new config. To recover a failed verification, simply **re-fire the same dispatch** (either drive it via the `hermes chat -q "..."` CLI, resend from Telegram, or fire from the MCP).

## Lane note
This is the **Hermes specialist's** territory (the user's power-user education + install/ops). The **n8n + Hermes pilot** ([[km-funnel-automation-build-2026-05-29]]) is the separate agent that *uses* Hermes as the funnel's messaging mechanism. See [[multi-instance-orchestration-notes]] for the full roster.

---
Filed under [[hub-ai-tooling]]. Siblings: [[hermes-mcp-routing]] · [[hermes-home-windows-env-var]] · [[verify-before-claim-rule]]
Back to [[index]]
