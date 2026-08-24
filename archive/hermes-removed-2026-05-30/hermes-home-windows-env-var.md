# HERMES_HOME on Windows — Install Gotcha

Diagnostic note for Hermes Agent installations on Windows. Documents an env-var routing trap that consumed ~30 min of debug time in session 2026-05-26.

## The Trap
On Windows installs via the standard Hermes installer, `HERMES_HOME` is set as a USER-level environment variable pointing to:

    C:\Users\<user>\AppData\Local\hermes

NOT the default `~/.hermes/` path that the docs imply.

Hermes reads `.env` from `${HERMES_HOME}/.env`. So:
- ✅ Real config: `C:\Users\<user>\AppData\Local\hermes\.env`
- ❌ Decoy path: `C:\Users\<user>\.hermes\.env` (silently ignored)

## Symptom That Surfaces the Bug
When user creates `~/.hermes/.env` to add a setting (e.g. `TELEGRAM_ALLOWED_USERS`), the gateway restart still shows the same `WARNING gateway.run: No user allowlists configured` line. The .env file looks right; the path is wrong.

## How to Diagnose
PowerShell check at all 3 env-var scopes:
```powershell
Write-Host "Current session: $env:HERMES_HOME"
Write-Host "User-level: $([System.Environment]::GetEnvironmentVariable('HERMES_HOME', 'User'))"
Write-Host "Machine-level: $([System.Environment]::GetEnvironmentVariable('HERMES_HOME', 'Machine'))"
```
If User-level is non-empty, that's the canonical HERMES_HOME for that account.

## Fix
1. Locate the real config: `$HERMES_HOME\.env`
2. Add the missing setting there (NOT to `~/.hermes/.env`)
3. Restart gateway: Ctrl+C in the cmd window, then `hermes gateway start`

## Source in Hermes Code
`hermes_constants.py:43-60` — `get_hermes_home()` function:
```python
def get_hermes_home() -> Path:
    """Return the Hermes home directory (default: ~/.hermes)."""
    val = os.environ.get("HERMES_HOME", "").strip()
    if val:
        return Path(val)
    # ... fall back to ~/.hermes
```

Env var ALWAYS wins. Windows installer sets it. The `~/.hermes/` fallback never triggers on a standard install.

## Related Files
- Real Hermes home: `C:\Users\<user>\AppData\Local\hermes\`
- Real `.env`: `C:\Users\<user>\AppData\Local\hermes\.env`
- Real logs: `C:\Users\<user>\AppData\Local\hermes\logs\agent.log`, `gateway.log`, `errors.log`
- Real session DB: `C:\Users\<user>\AppData\Local\hermes\state.db`
- Decoy `.hermes/` dir often exists but only has `logs/` subdirectory (NOT canonical)

## Source
Session 2026-05-26 — diagnostic flow when allowlist warning persisted after creating `.env` at the wrong path. Resolved by Glob to locate the real `.env` at the AppData path.

## Backlinks
- [[hub-ai-tooling]]
- [[hermes-mcp-routing]]
