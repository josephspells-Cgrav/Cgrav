# Hermes MCP — Message Routing

Operational rule for any Claude session dispatching work to Hermes Agent via the MCP `messages_send` tool.

## The Rule
When dispatching **audit or work requests** via Hermes MCP `messages_send`, ALWAYS use:

    target = "telegram:-1003758503447:2"

That's **Batman And Robin** group chat, **topic 2** — the dedicated thread for Claude ↔ Hermes coordination.

**Never** send audit/work requests to the DM home channel (`telegram:8382218041`). The DM is reserved for human-to-Hermes conversation. Mixing work traffic into the DM clutters personal thread and breaks the convention.

## Encoded In
- Global Claude instructions: `C:\Users\josep\.claude\CLAUDE.md` (line ~99, "Hermes MCP — message routing" section)
- Verified working end of session 2026-05-26 via test message #13 (`success: true, mirrored: true`)

## Topic-Routing Format
Telegram supergroups with forum topics use this format:
- Group chat ID has the negative prefix: `-1003758503447`
- Topic ID is appended with colon: `:2`
- Full target: `telegram:-1003758503447:2`

## Exceptions
If a use case genuinely needs the DM (e.g. one-off ping for user's attention), advisor calls it out explicitly in the response so user can confirm. Default is always the topic.

## MCP Tool Direction
**Critical architectural note:** `mcp__hermes__messages_send` is OUTBOUND only — sends messages FROM the bot TO the user (or group/topic). It does NOT inject inbound user messages.

For Hermes to actually PROCESS a request as an instruction, two prerequisites:
1. The user has explicitly told Hermes to expect Claude's MCP-routed messages (setup conversation in DM, "Fire away whenever Claude's ready")
2. The message is delivered to the agreed channel (now Batman And Robin / topic 2)

Once both are true, Hermes reads the message as part of its conversation context and acts on it.

## Source
Established 2026-05-26 in advisor session as separation-of-concerns between human conversation and machine-routed work traffic.

## Backlinks
- [[hub-ai-tooling]]
- [[verify-before-claim-rule]]
- [[hermes-home-windows-env-var]]
