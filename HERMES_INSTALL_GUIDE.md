# Hermes Agent — Windows Install & Setup Guide

End-to-end install + first useful skill, Windows-native PowerShell path. Total time budget: **6–8 hours**, of which ~90 min is hands-on; the rest is downloads, OAuth dances, and waiting on `pnpm` / `npm` while you do something else.

---

## Section 0 — Pre-flight checklist

### Accounts to have ready (open these tabs first)

- [Anthropic Console](https://console.anthropic.com/) — you already have your API key; locate it so you can paste in Section 2.
- [Telegram](https://telegram.org/) — install the desktop or phone app and create a free account if you don't have one.
- [@BotFather](https://t.me/BotFather) — Telegram's official bot factory. You'll `/newbot` here in Section 7.
- [@userinfobot](https://t.me/userinfobot) — message it once and it replies with your numeric Telegram user ID. Save it.
- [Hermes Atlas](https://hermesatlas.com/) — community skill index, browse only.
- [GitHub](https://github.com/) — needed for cloning community skill repos. You should already be signed in.

### System requirements

- **OS:** Windows 10/11 (x64). You have Windows 11 Home 26200.
- **RAM:** 8 GB minimum, 16 GB recommended (Chromium + Node + Python concurrent).
- **Disk:** 6 GB free for the install tree (`%LOCALAPPDATA%\hermes\`) plus ~2 GB headroom for skill caches and screenshots.
- **Network:** open access to `github.com`, `raw.githubusercontent.com`, `pypi.org`, `nodejs.org`, `api.anthropic.com`, `api.telegram.org`. If you're behind a corporate proxy, expect failures.
- **Prereqs Hermes auto-installs:** `uv`, Python 3.11, Node.js, ripgrep, ffmpeg, portable MinGit/Bash. **Do not install these yourself first** — the installer is opinionated and will use its own bundled portable copies.

### 🪟 Windows path decision — native PowerShell vs WSL2

Hermes ships two installer scripts:

| Path | When to use | Notes |
|---|---|---|
| **Native PowerShell** (`install.ps1`) | Default for this guide — you live in PowerShell already | Marked "early beta" by Nous. Bundles its own Git Bash so `bash`-dependent skills still work. Expect rough edges; file issues when you hit them. |
| **WSL2 Ubuntu** (`install.sh`) | If the PowerShell path fails twice on the same step | The most battle-tested path. Adds ~10 min for WSL2 enablement if you don't already have it. |

**Recommendation:** start with native PowerShell. Fall back to WSL2 only if Section 1 fails. Docker Desktop is **not required** for the local backend.

---

## Section 1 — Install Hermes core

### 1.1 Run the PowerShell installer

Open **PowerShell** (not "PowerShell ISE", not Windows Terminal admin tab — a regular user PowerShell window is fine; the installer is user-scoped and needs no admin):

```powershell
iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)
```

This downloads ~150 MB across uv, Python 3.11, MinGit (~57 MB), portable Node.js, and `agent-browser`. Expect **5–15 min** depending on bandwidth.

### 1.2 What landed on disk

| Path | Contents |
|---|---|
| `%LOCALAPPDATA%\hermes\` | Runtime: `python\`, `node\`, `git\`, `uv\` |
| `%USERPROFILE%\.hermes\` | Your config: `config.yaml`, `.env`, `skills\`, `cache\`, `logs\` |

The installer sets these environment variables on your user account: `HERMES_GIT_BASH_PATH`, `AGENT_BROWSER_EXECUTABLE_PATH`, and appends the portable Git + Node directories to your user `PATH`.

**🪟 Windows note:** Open a **new** PowerShell window after install completes. Environment variable changes don't propagate to the window that ran the installer.

### 1.3 Verify

```powershell
hermes --version
```

Expected: `hermes 0.14.x` (or higher). If `hermes` is not found, the PATH didn't refresh — close PowerShell, open a new window, retry.

### Common gotchas

- **Antivirus blocks the install.** Windows Defender occasionally quarantines portable Git or `uv.exe`. Add `%LOCALAPPDATA%\hermes\` as an exclusion and re-run.
- **Corporate proxy strips HTTPS.** If `irm` returns a cert error, you're behind a MITM proxy and need IT to whitelist `raw.githubusercontent.com` and `pypi.org`.
- **Old Python on PATH wins.** Verify with `(Get-Command python).Source` — if it points anywhere other than `%LOCALAPPDATA%\hermes\python\`, prepend the Hermes path or use `hermes` commands (which call their bundled Python internally).

---

## Section 2 — Configure LLM provider (Anthropic Claude)

### 2.1 Add your API key

```powershell
hermes config set ANTHROPIC_API_KEY sk-ant-your-key-here
```

This writes to `%USERPROFILE%\.hermes\.env` automatically — Hermes routes secret keys to `.env` and other settings to `config.yaml`.

### 2.2 Select your model

```powershell
hermes model
```

This is an interactive menu. Pick **Anthropic** → **claude-opus-4-7** (or `claude-sonnet-4-6` if you want lower cost on bulk skill work). Selection is persisted to `config.yaml`.

### 2.3 Smoke test the LLM connection

```powershell
hermes chat -q "Say 'hello from hermes' and nothing else."
```

Expected: the literal string `hello from hermes`. If you get an auth error, double-check the key has no leading/trailing whitespace and that it starts with `sk-ant-`.

**🪟 Windows note:** If PowerShell mangles the `-` in your key, wrap the whole value in single quotes: `hermes config set ANTHROPIC_API_KEY 'sk-ant-...'`.

---

## Section 3 — Backend selection (local for pilot)

Hermes supports five execution backends: **local, Docker, SSH, Singularity, Modal**. For your pilot:

```powershell
hermes config set backend local
```

**Why local:** zero infra, runs in-process on your laptop, fastest iteration. Perfect for verifying a Vercel preview URL — Hermes spawns subprocesses for browser/file work directly.

**Upgrade path (don't do this yet):** [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) is the right 24/7 target later. It's a serverless container that hibernates when idle (near-zero cost) and wakes on incoming Telegram messages. Migrate after Section 8 proves the pilot is worth running 24/7.

---

## Section 4 — First verification smoke test

Quick end-to-end check that Hermes can think, run a tool, and return.

```powershell
hermes chat -q "What is 17 * 23? Use python to verify."
```

Expected: `391` with a tool call to Python visible in the output. If Python tool calls fail, run `hermes doctor` to diagnose.

---

## Section 5 — Browser verification (the killer skill for you)

**Important course correction:** your brief asked for `browser-use/browser-harness`, which is designed as a **Claude Code / Codex companion** that connects to your existing logged-in Chrome via CDP. Hermes has its **own** built-in browser stack — `agent-browser` + the `browser` toolset + the `browser_vision` tool — which is what you actually want for verifying Vercel preview URLs. Use the Hermes-native path as primary; install `browser-harness` only if you also want to drive your personal Chrome from Claude Code sessions.

### 5.1 Hermes-native path (PRIMARY — recommended)

`agent-browser` was already installed by the Section 1 installer. Enable the `browser` toolset:

```powershell
hermes config set toolsets '["hermes-cli", "browser"]'
```

**Smoke test against a Vercel preview URL:**

```powershell
hermes chat -q "Navigate to https://contractor-template-preview.vercel.app/preview/hvac, take a screenshot, and describe what you see in the hero section."
```

Hermes uses an accessibility-tree representation for clicking/typing (interactive elements get `@e1`, `@e2` IDs) and `browser_vision` for screenshot + visual analysis. Screenshots persist to `%USERPROFILE%\.hermes\cache\screenshots\` with 24-hour auto-cleanup.

**🪟 Windows note:** First run will download a Chromium build (~150 MB) into the agent-browser cache. Subsequent runs are instant. If the download stalls, check Defender and try `npm install -g agent-browser` to force reinstall.

### 5.2 browser-harness (OPTIONAL — Claude Code companion)

Skip unless you also want to drive your **logged-in** personal Chrome from Claude Code (useful for Gmail, Vercel dashboard, anything behind auth).

```powershell
git clone https://github.com/browser-use/browser-harness
cd browser-harness
uv tool install -e .
browser-harness --doctor
```

Then enable remote debugging in Chrome: visit `chrome://inspect/#remote-debugging` and toggle **Allow remote debugging for this browser instance**. Add an import line to `~/.claude/CLAUDE.md` pointing at `browser-harness/SKILL.md`.

[browser-use/browser-harness on GitHub](https://github.com/browser-use/browser-harness) · [Hermes browser docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/browser)

---

## Section 6 — Install remaining Tier 1 skills

The canonical Hermes install syntax is `hermes skills install <owner>/<repo>`. **A handful of community skills publish their own syntax in their README** — if the canonical install fails on any of these, fall back to the README in the linked repo.

Run each command, then `hermes skills list` after the batch to confirm.

### 6.1 hermes-skill-factory — auto-generates new skills from repeat workflows

```powershell
hermes skills install Romanescu11/hermes-skill-factory
```

Source: [Romanescu11/hermes-skill-factory](https://github.com/Romanescu11/hermes-skill-factory).
**Gotcha:** writes generated skills to `~/.hermes/skills/generated/`; review before promoting.

### 6.2 execplan-skill — long-running task orchestration with checkpoints

```powershell
hermes skills install tiann/execplan-skill
```

Source: [tiann/execplan-skill](https://github.com/tiann/execplan-skill). No common gotchas.

### 6.3 maestro — skill orchestration with Conductor planning + observable pipelines

```powershell
hermes skills install ReinaMacCredy/maestro
```

Source: [ReinaMacCredy/maestro](https://github.com/ReinaMacCredy/maestro).
**Gotcha:** requires `execplan-skill` installed first; install in this order.

### 6.4 Mnemosyne — sub-millisecond local memory + vector search + temporal knowledge graphs

```powershell
hermes skills install AxDSan/Mnemosyne
```

Source: [AxDSan/Mnemosyne](https://github.com/AxDSan/Mnemosyne).
**Gotcha:** creates a SQLite + embeddings DB at `~/.hermes/cache/mnemosyne/`. First-run indexing can take 60–120s.

### 6.5 mission-control — dashboard for task dispatch, cost tracking, fleet management

```powershell
hermes skills install builderz-labs/mission-control
```

Source: [builderz-labs/mission-control](https://github.com/builderz-labs/mission-control).
**Gotcha:** opens a local web UI on `http://localhost:7474` by default; if that port is taken, override in the skill's `config.yaml`.

### 6.6 Verify the batch

```powershell
hermes skills list
```

Expected: all five Tier 1 skills appear with status `installed`. Inspect any one:

```powershell
hermes skills inspect ReinaMacCredy/maestro
```

---

## Section 7 — Telegram messaging gateway

### 7.1 Create a bot

1. Open Telegram → search **@BotFather** ([direct link](https://t.me/BotFather)).
2. Send `/newbot`.
3. Pick a **display name** (e.g., `Joseph's Hermes`).
4. Pick a **username** — must end in `bot` (e.g., `josephspells_hermes_bot`).
5. BotFather replies with a **token** like `123456789:ABCdef...`. Copy it; you cannot see it again without `/revoke`.

### 7.2 Get your Telegram user ID

Message [@userinfobot](https://t.me/userinfobot) on Telegram. It replies instantly with your numeric ID (e.g., `987654321`). Use the **numeric ID**, not your `@username`.

### 7.3 Configure Hermes

Interactive path:

```powershell
hermes gateway setup
```

Choose **Telegram**, paste the token, paste your user ID.

Or set manually by appending to `%USERPROFILE%\.hermes\.env`:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdef...
TELEGRAM_ALLOWED_USERS=987654321
```

**Critical:** `TELEGRAM_ALLOWED_USERS` is a security gate. Without it, **all messages are denied by default** (which is the safe behavior — don't disable it).

### 7.4 Start the gateway

```powershell
hermes gateway
```

The bot is online within ~10 seconds.

**🪟 Windows note:** PowerShell has no `nohup`. To run the gateway in the background so you can close the terminal, use:

```powershell
Start-Process powershell -ArgumentList "-NoProfile","-Command","hermes gateway" -WindowStyle Hidden
```

Or, more durable, run it as a **scheduled task** triggered on user logon. For the pilot, keeping a dedicated PowerShell tab open is fine.

### 7.5 Smoke test

From your phone, message your bot: `What time is it?` Expected: a reply within a few seconds quoting the current time. If silent, check `%USERPROFILE%\.hermes\logs\gateway.log`.

Source: [Hermes Telegram docs](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram).

---

## Section 8 — Build your first useful skill: `post-pass-verification`

This skill turns "did Pass 10 break anything visible?" into a one-line command. Given a commit SHA + base URL, it diffs the commit, derives the affected URLs, browser-navigates each, screenshots, and returns a markdown findings table.

### 8.1 Create the skill directory

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.hermes\skills\post-pass-verification"
```

### 8.2 Write `SKILL.md`

Create `%USERPROFILE%\.hermes\skills\post-pass-verification\SKILL.md` with this content:

```markdown
---
name: post-pass-verification
description: Given a commit SHA and a base preview URL, identify URLs affected by the diff, browser-verify each, and return a markdown findings table with screenshots.
version: 0.1.0
metadata:
  author: Joseph Spells
  toolsets: [hermes-cli, browser, files]
required_environment_variables: []
---

# Post-Pass Verification

## When to use
After a contractor-template "Pass" commit lands, run this skill against the
commit SHA and the Vercel preview base URL to verify nothing visible
regressed.

## Inputs
- `commit_sha` — the commit to verify (default: HEAD)
- `base_url`   — preview URL root, e.g. https://contractor-template-preview.vercel.app

## Steps
1. Run `git show --stat --name-only {commit_sha}` and capture the file list.
2. From the file list, derive affected route URLs:
   - Files under `app/page.tsx` or `app/**/page.tsx` → map to the route.
   - Files under `lib/content-*.ts` → map to routes that import that file
     (grep `components/sections/*.tsx` for the import).
   - Files under `app/globals.css` or `components/**` → mark "GLOBAL — verify all primary routes".
3. For each affected URL, build `{base_url}{route}`.
4. Use the `browser` toolset to navigate to each URL and `browser_vision`
   to take a full-page screenshot.
5. For each screenshot, assess: hero visible, navigation intact, no
   layout breakage, no console errors visible. Pull console errors via
   `browser_get_console`.
6. Return a markdown table:

   | Route | Status | Screenshot | Notes |
   |---|---|---|---|
   | /preview/hvac | ✅ | path | clean |
   | /preview/plumbing | ⚠️ | path | hero text overlapping logo |

## Output
Single markdown table. Save screenshots under
`~/.hermes/cache/screenshots/post-pass/{commit_sha}/` for the user to
review.

## Failure modes
- If `git show` fails: skill exits with the git error verbatim.
- If a URL 404s: mark status as ❌ in the table and continue.
- If browser_vision times out: retry once with 30s timeout, then mark ⚠️.
```

### 8.3 Register and test

```powershell
hermes skills list
hermes skills inspect post-pass-verification
```

Test against Pass 10 (`b6c476c`):

```powershell
hermes chat -q "Run the post-pass-verification skill against commit b6c476c with base_url https://contractor-template-preview.vercel.app"
```

Review the returned table and the screenshot directory.

Source: [Hermes skills system docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills).

---

## Section 9 — Tier 2 skills (install after pilot proves value)

Don't install these on day one. Wait until Tier 1 has been in active use for a week.

### 9.1 hermes-web-search-plus — multi-provider search routing (Serper/Tavily/Exa)

```powershell
hermes skills install robbyczgw-cla/hermes-web-search-plus
```

Useful when Hermes's default web search hits rate limits. Requires at least one of: `SERPER_API_KEY`, `TAVILY_API_KEY`, `EXA_API_KEY` in `.env`.
Source: [robbyczgw-cla/hermes-web-search-plus](https://github.com/robbyczgw-cla/hermes-web-search-plus).

### 9.2 MeiGen-AI-Design-MCP — image-gen supplement to Higgsfield

```powershell
hermes skills install jau123/MeiGen-AI-Design-MCP
```

Useful for brand-board generation when Higgsfield is rate-limited or you want a second style direction.
Source: [jau123/MeiGen-AI-Design-MCP](https://github.com/jau123/MeiGen-AI-Design-MCP). Alternative: [black-forest-labs/skills](https://github.com/black-forest-labs/skills) for Flux model access.

### 9.3 Composio — 200+ SaaS tool integrations via MCP

Composio is **not** in the awesome-hermes-agent list as of last check. Install via Composio's own MCP route per [docs.composio.dev](https://docs.composio.dev/), then register the MCP endpoint with Hermes via `hermes config set mcp_servers ...`. Wait until you have a specific SaaS to connect (e.g., Slack notifications when a Vercel deploy completes).

### 9.4 hermes-android / agent-android — Android device control

```powershell
hermes skills install raulvidis/hermes-android
```

Source: [raulvidis/hermes-android](https://github.com/raulvidis/hermes-android). Alternative for RPA flows: [aivanelabs/ai-rpa](https://github.com/aivanelabs/ai-rpa/tree/main/skills/agent-android). Requires ADB and a physical/emulated Android device. Install only if mobile dispatch becomes a real workflow.

---

## Section 10 — Troubleshooting

### Hermes won't start
- `hermes --version` reports nothing → new PowerShell window required (PATH didn't refresh).
- Still nothing → check `%LOCALAPPDATA%\hermes\` exists. If empty, the installer was blocked by AV; add exclusion and re-run.
- `hermes doctor` is the one-shot diagnostic. Read its output before anything else.

### LLM key not recognized
- Inspect `%USERPROFILE%\.hermes\.env` directly. Look for leading whitespace, missing `sk-ant-` prefix, or accidental quote chars.
- Test the key with curl: `curl -H "x-api-key: $env:ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" https://api.anthropic.com/v1/models` — should return JSON, not 401.

### Browser stack can't find Chromium
- `npm install -g agent-browser` to force-reinstall the Hermes-native browser.
- Verify `AGENT_BROWSER_EXECUTABLE_PATH` is set: `$env:AGENT_BROWSER_EXECUTABLE_PATH`. If empty, set it to your Chrome path (`C:\Program Files\Google\Chrome\Application\chrome.exe`) and restart PowerShell.

### Telegram bot not responding
- Confirm gateway is running: `Get-Process | Where-Object { $_.CommandLine -like '*hermes gateway*' }`.
- Check `%USERPROFILE%\.hermes\logs\gateway.log` for auth errors.
- Verify `TELEGRAM_ALLOWED_USERS` contains your numeric ID exactly (no `@`, no quotes).
- If you regenerated the bot token via `/revoke`, you must update `.env`.

### Windows-specific path/permission issues
- PowerShell execution policy blocks the installer → run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, then re-run.
- "Path too long" errors on deep `node_modules` → enable long paths: `New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force` (requires admin, then reboot).
- A skill writes to `~/.hermes/` but you don't see it → on Windows, `~` resolves to `%USERPROFILE%`, i.e., `C:\Users\josep\.hermes\`. Check there.

### Where to ask for help
- [NousResearch Discord](https://discord.gg/NousResearch) — fastest response, real humans.
- [hermes-agent issues](https://github.com/NousResearch/hermes-agent/issues) — for reproducible bugs; native-Windows reports are especially welcomed since it's early beta.
- [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) — community skills index, browse for what already exists before authoring.

---

## Time estimate + checkpoint summary

| Section | Hands-on | Wait time | Cumulative |
|---|---|---|---|
| 0 — Pre-flight | 15 min | — | 0:15 |
| 1 — Install core | 5 min | 15 min | 0:35 |
| 2 — LLM config | 5 min | — | 0:40 |
| 3 — Backend | 1 min | — | 0:41 |
| 4 — Smoke test | 2 min | — | 0:43 |
| 5 — Browser stack | 10 min | 5 min download | 0:58 |
| 6 — Tier 1 skills | 20 min | 10 min | 1:28 |
| 7 — Telegram | 15 min | — | 1:43 |
| 8 — First skill | 60 min | 10 min testing | 2:53 |
| 9 — Tier 2 (skip for now) | — | — | 2:53 |
| 10 — Troubleshooting buffer | — | up to 3:00 | up to 5:53 |

**At the end of Section 8 you have:**
- Hermes core running with Claude as LLM, local backend.
- `browser` toolset verified against a live Vercel URL.
- Five Tier 1 skills installed and listed.
- Telegram bot wired up — message your agent from your phone.
- A working `post-pass-verification` skill that takes a commit SHA + base URL and returns a markdown findings table with screenshots.

That's the pilot. Run it for a week, then decide whether to (a) port to Vercel Sandbox for 24/7, (b) install Tier 2, or (c) author more skills via `hermes-skill-factory`.
