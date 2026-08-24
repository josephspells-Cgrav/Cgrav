# Autonomous trigger wiring — Claude (pilot) → Hermes, reply in Telegram topic 2

## Root cause (confirmed in code)

`messages_send` (MCP) → `tools/send_message_tool._handle_send()` is **outbound-only**. It posts to the platform as the bot account and returns. It never constructs a `MessageEvent` and never calls the turn-runner, so **no agent turn fires.** The gateway also (correctly) does not re-ingest the bot's own outbound traffic as inbound — that would loop. So a `messages_send` to topic 2 shows in Telegram but wakes nothing.

- `mcp_serve.py:733` `messages_send` → `send_message_tool({"action":"send",...})`
- `tools/send_message_tool.py:169-340` `_handle_send()` — pure outbound, zero turn dispatch.

## Chosen solution: webhook platform, agent mode

A POST to the webhook adapter builds a full `MessageEvent` and calls `handle_message()` — **the same turn-runner Telegram inbound uses** (`gateway/platforms/webhook.py:574-617`). It returns **HTTP 202 immediately** (async — the agent runs in the background, no HTTP timeout risk: `webhook.py:615-628`), and delivers the agent's reply to the route's `deliver` target, honoring `deliver_extra.message_thread_id` for Telegram forum topics (`webhook.py:882-925`). **Config-only on the Hermes side, no code edit.**

Why not the alternatives:
- **API server `/v1/runs`** — fires a real turn, but returns to the HTTP caller only; cannot deliver to topic 2 without extra pilot orchestration. More work, and it doesn't put the reply where Joseph watches.
- **New MCP `send_to_agent` tool / `trigger_turn` flag** — requires a code change + upstream PR + maintenance. The webhook already does exactly this.
- **Second Telegram identity** — operational overhead (second token, anti-echo handling). Fragile.

---

## Hermes side (operator runs once — or have the specialist do it)

```powershell
# 1. Back up
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
Copy-Item "$env:LOCALAPPDATA\hermes\config.yaml" "$env:LOCALAPPDATA\hermes\config.yaml.bak-$stamp"
Copy-Item "$env:LOCALAPPDATA\hermes\.env"        "$env:LOCALAPPDATA\hermes\.env.bak-$stamp"

# 2. Generate a route secret + enable the webhook platform (append-only to .env)
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$secret = -join ($bytes | ForEach-Object { $_.ToString('x2') })
Add-Content "$env:LOCALAPPDATA\hermes\.env" "`nWEBHOOK_ENABLED=true`nWEBHOOK_PORT=8644`nWEBHOOK_SECRET=$secret"
$secret | Out-File "$env:LOCALAPPDATA\hermes\webhook-route-secret.txt" -Encoding ascii -NoNewline   # pilot reads this

# 3. Restart the gateway to load the webhook platform
hermes gateway restart

# 4. Create the inbound route (agent mode — NOT --deliver-only)
hermes webhook subscribe claude-builder `
  --prompt "{text}" `
  --deliver telegram `
  --deliver-chat-id "-1003758503447" `
  --secret $secret `
  --description "Claude Code -> Hermes builder-thread trigger (topic 2)"

# 5. Add topic-2 routing (CLI can't set thread id; edit the hot-reloaded subscriptions file)
#    Add  "deliver_extra": { "message_thread_id": "2" }  to the claude-builder route in:
#    %LOCALAPPDATA%\hermes\webhook_subscriptions.json
```

Endpoint after this: **`POST http://127.0.0.1:8644/webhooks/claude-builder`**

---

## Pilot side (Claude Code) — the change

**Stop** calling `mcp__hermes__messages_send` to trigger work. **Start** POSTing to the local webhook.

### Request

- **Method/URL:** `POST http://127.0.0.1:8644/webhooks/claude-builder`
- **Headers:**
  - `Content-Type: application/json`
  - `X-Webhook-Signature: <hex>` — HMAC-SHA256 of the **raw request body bytes**, key = the route secret (from `webhook-route-secret.txt`), lowercase hex, no prefix.
- **Body:**
  ```json
  { "text": "Run pass-verification against https://contractor-template-preview.vercel.app/preview/hvac, context=HVAC home page" }
  ```
  The route's `prompt: "{text}"` renders `text` as the agent's user turn. (Use any field names you want, as long as the route `prompt` template references them.)

### Signing (Node, matches Claude Code's runtime)

```js
import crypto from "node:crypto";
const secret = (await fs.readFile(process.env.LOCALAPPDATA + "\\hermes\\webhook-route-secret.txt","utf8")).trim();
const body = JSON.stringify({ text: auditRequest });
const sig = crypto.createHmac("sha256", secret).update(body).digest("hex");
const res = await fetch("http://127.0.0.1:8644/webhooks/claude-builder", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Webhook-Signature": sig },
  body,                       // sign and send the SAME string
});
// res.status === 202, body { status:"accepted", delivery_id, ... }  (agent runs async)
```

### Getting the reply back  ⚠️ corrected after live verification

The POST returns **202 immediately** with a `delivery_id` (the agent runs async). The agent's reply does **two** things:
1. **Delivered to Telegram topic 2** (`-1003758503447`, thread `2`) — for Joseph's visibility on his phone. This is a raw outbound adapter send; it posts to Telegram but does **NOT** update the gateway-tracked `agent:main:telegram:group:...:2` conversation, so **the pilot canNOT read it via `messages_read` on topic 2.**
2. **Stored in the webhook session** — which the pilot READS to get the result.

**Pilot read path (verified working):**
1. POST → capture `delivery_id` from the 202 body.
2. Poll `mcp__hermes__conversations_list(platform="webhook")` — the most-recent session (`updated_at` newest, `user_name: "claude-builder"`) is your run. Its `session_key` looks like `agent:main:webhook:webhook:webhook:claude-builder:<delivery_id>:webhook:claude-builder` (don't construct it by hand — read it from `conversations_list`).
3. `mcp__hermes__messages_read(session_key=<that key>)` → the `role:"assistant"` message is the result. Poll until `count == 2` (the user turn + the assistant reply), or until your timeout.

Each POST creates a **fresh** webhook session (keyed by `delivery_id`) — no cross-request continuity, which is correct for independent audit dispatches. Topic 2 is for the human watching; the webhook session is the agent-to-agent channel.

### Idempotency / retries

Send a unique `X-Request-ID` header per request. Duplicate IDs within 1 hour return `200 status=duplicate` and do **not** re-run (prevents double-fires on retry).

---

## Acceptance test

1. Pilot POSTs to `/webhooks/claude-builder` (signed), **no human Telegram message before or after**.
2. `agent.log` shows a new turn for session `webhook:claude-builder:<delivery_id>`.
3. `gateway.log` shows the outbound delivery to `telegram` chat `-1003758503447` thread `2`.
4. The reply appears in **topic 2**; pilot reads it via `events_wait`/`messages_read`.

> Note: the inbound log line will read `platform=webhook`, NOT `platform=telegram` — the webhook adapter is its own platform. That's expected and correct; the *outcome* (agent turn fired by the pilot, reply in topic 2, no human relay) is what the acceptance test proves.

## Security notes

- Endpoint binds **127.0.0.1 only** (local pilot can reach it; nothing off-box can).
- HMAC-gated. The secret lives in `webhook-route-secret.txt` (local file) — treat as a credential; the pilot reads it locally, never sends it over the wire (only the HMAC).
- Blast radius: a local process with the secret can fire an agent turn whose reply goes to topic 2. With `terminal.backend: local`, that turn has filesystem access — acceptable for a single-operator dev box, but if this box ever becomes multi-user, switch `terminal.backend: docker` for the gateway.
- `INSECURE_NO_AUTH` (skip HMAC, loopback-only) is available as a simpler-but-less-secure alternative if HMAC signing is a hassle on the pilot side — not recommended.

## Align the home channel to topic 2 (optional cleanup)

Hermes currently replies to the DM home channel (`8382218041`). To make *all* autonomous output land in topic 2, set `TELEGRAM_HOME_CHANNEL=-1003758503447` and `TELEGRAM_CRON_THREAD_ID=2` in `.env`, then `hermes gateway restart`. (The webhook route already targets topic 2 explicitly regardless of the home channel.)
