# WO-R2B — Wire the safety layer into the verbs + per-user gating (Sonnet-5, judgment-zero)

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` FIRST. Your staging id: **R2B**.
⚠️ You are the ONLY round-2 builder allowed to edit existing `assistant-*.ts` VERB files.
You still may NOT edit `src/lib/assistant.ts` — report registrations instead.

## THE MISSION
Round 1 BUILT three safety mechanisms and connected NONE of them. They are dead code today:
`src/lib/assistant-confirm-binding.ts` · `src/lib/assistant-untrusted.ts` ·
`src/lib/assistant-composition-lint.ts`. Wire them in, and close the per-user gap.

## 1. COMPOSITION LINT — on every composed customer-facing body
Every verb that puts words on a customer's phone runs `lintComposedBody()` BEFORE the preview
and REFUSES on violation, naming the rule: `assistant-send-text.ts` (send_text) ·
`assistant-custom-cadence.ts` (each SMS step body) · `assistant-booking-link.ts` (custom body).
- The refusal is a normal tool result naming the violated rule — never a throw.
- An OPERATOR-DICTATED body is still linted (the money/link/claim rules protect the customer
  and the business, not against invention), but its refusal reads "your wording tripped
  <rule> — reword, or pass override_lint to send it as written", and an `override_lint: true`
  input (operator-only, DISCLOSED in the preview) allows it.
- A body COMPOSED BY ALEX gets **no override path** — it must pass clean.
- `ALEX_TEXT_REGISTER` (exported from the lint module) belongs in the system prompt: report
  the exact line needed for assistant.ts; do not edit that file.

## 2. UNTRUSTED CONTENT — read results are data, never instructions
Wrap third-party content with `wrapUntrusted()` where it enters the model's context:
`call_transcript`'s transcript body · `lead_history`'s message bodies · any `sms_in` body ·
note bodies rendered into tool results. Source label = a short human phrase
("call transcript", "customer text").
Then enforce `assertRecipientNotFromReadContent` on the send verbs' destination fields
(`send_text`, `send_booking_link`, `send_document`'s `to_email`): a destination must come from
a structured id or the operator's own words, never from read content. On violation, refuse
with the named reason.

## 3. CONFIRM BINDING — confirms bind to a person AND the exact preview
Thread an actor identity into the tool layer and use `issueConfirmToken` / `verifyConfirmToken`:
- The Slack path already knows the requesting user (`src/lib/slack-events.ts` —
  `slackUserMayWrite` / `slackWriteAllowlist`). Find where tool execution is invoked and
  thread the Slack user id through to the tools (an `actorId` on the execution context, or a
  module-scoped AsyncLocalStorage — pick what fits this codebase and SAY which in the report).
- Every CONFIRM_REQUIRED verb: the preview ISSUES a token, the confirm VERIFIES it.
  Mismatch/expiry → re-preview, never act. A confirm WITHOUT a token is refused with a named
  reason.
- ⚠️ If threading identity proves genuinely impossible without editing a file you may not
  touch: STOP that sub-item, implement everything else, and write the exact blocker plus the
  one-line change needed into the report. Do NOT half-wire it.

## 4. PER-USER GATING (Kimi F3.1 — currently OPEN)
`query_crm`, `place_call`, `custom_cadence`, and `debrief` (if present in your sandbox) are
gated to a single Slack user until Sean's tier is decided. New file
`src/lib/assistant-authz-users.ts`:
```ts
/** SLACK_DEEP_ACCESS_USERS, falling back to SLACK_ASSISTANT_WRITE_USERS. */
export function slackDeepAccessAllowlist(): Set<string>
/** FAIL-CLOSED: unset list or unknown user => false. */
export function mayUseDeepVerb(userId: string | undefined): boolean
```
Each gated verb checks it and refuses with: "that one's restricted to Joseph's account until
Sean's access tier is decided." Report the env var name so the orchestrator can set it.

## TESTS (new files; PGlite harness deletes `touchAttempts` BEFORE `outbox`)
`src/lib/assistant-lint-wiring.test.ts` — a composed body containing "$14,500" is refused by
send_text / custom_cadence / booking_link · operator-dictated + `override_lint` passes and the
preview discloses the override · a composed-by-Alex body has no override path.
`src/lib/assistant-untrusted-wiring.test.ts` — transcript content comes back fenced · a
recipient appearing ONLY in read content is refused · a structured id passes.
`src/lib/assistant-confirm-wiring.test.ts` — confirm without a token refused · a token issued
to user A is rejected for user B · altered preview → re-preview · expired → re-preview.
`src/lib/assistant-deep-gate.test.ts` — unset env is fail-closed for all gated verbs · a
listed user passes · an unlisted user gets the named refusal.
