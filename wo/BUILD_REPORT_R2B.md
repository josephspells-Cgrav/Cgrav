# BUILD REPORT — WO-R2B (Safety Wiring + Per-User Gating)

Staging id: **R2B**. Sandbox: `.../scratchpad/R2B_sandbox`. Staged deliverable:
`.../scratchpad/R2B_STAGED_DELIVERABLE/` (39 files, exact repo-relative paths).

## GATES — all three pass, verbatim tails

**`npx tsc --noEmit`** (run twice — once before the booking-link fix, once after; both clean):
```
TSC_EXIT=0
```
Zero output, zero errors.

**`npm test`** (final run, full hand-list including the 4 new WO-required files):
```
ℹ tests 3689
ℹ suites 1028
ℹ pass 3689
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 585446.1686
EXIT_CODE=0
```
3689/3689 pass. This is the full existing suite (nothing removed, nothing skipped) plus my
4 new wiring-test files, all green.

**`npm run build`**:
```
 ✓ Compiled successfully in 4.4min
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...
[... full route table, all ○/ƒ, including /api/assistant and /api/slack/events ...]
EXIT_CODE=0
```
Two pre-existing, unrelated warnings (jose/next-auth Edge Runtime CompressionStream/
DecompressionStream) — present in `node_modules`, nothing to do with this WO, not new.

## WHAT WAS WIRED

Round 1 built three safety modules and connected them to nothing. This round wires all
three into every relevant verb, plus closes the per-user gating gap (WO §4).

### §1 Composition lint — send_text, custom_cadence (per SMS step), send_booking_link
`checkComposedBody()` (new, `assistant-safety-wiring.ts`) wraps `lintComposedBody()` with
the override law: clean passes; a violation refuses naming the rule(s), unless
`override_lint:true` — then it passes with the override **disclosed in the preview**.
`OVERRIDE_LINT_PROPERTY`'s own schema description is the mechanism that keeps the override
operator-only (the same schema-level-contract trick `CONFIRM_PROPERTY` already uses for
"never self-confirm" — there is no structural way to tell who really decided a body's
wording, so the honesty floor lives in what the model is told is valid, backed by the
preview always showing when an override fired).

**A real bug found and fixed along the way**: my first pass linted `send_booking_link`'s
*rendered* body (default template + the real booking URL, `?t=<32-byte-random-token>`).
`ensureBookingToken`'s token is `randomBytes(32).toString("base64url")` — random data — and
it occasionally contains a run of 10 consecutive digits, which `lintComposedBody`'s
`contact_swap` rule reads as a phone number. That's a real, once-in-a-while false-positive
production bug (a booking link occasionally refused to send over its own mechanically-
generated token), caught by 4 flaky test failures. Fixed by linting only the
CUSTOM body (or nothing, for the pinned default template) **before** the URL is
substituted in — matches the WO's own literal scope for this verb, `"(custom body)"`.
`assistant-lint-wiring.test.ts` pins the default template as never lint-refused.

### §2 Untrusted content — call_transcript, lead_history, send_text/booking_link/document
`wrapUntrusted()` fences: `call_transcript`'s transcript (assistant-tools.ts),
`lead_history`'s **inbound** comms bodies only — outbound (our own prior sends) stays
plain, and `lead_history`'s note-kind activity bodies (assistant-history-tools.ts).
`checkRecipientNotFromReadContent()` wraps `assertRecipientNotFromReadContent()` against
the current turn's operator messages (threaded via `assistant-actor-context.ts`, see §3):
wired meaningfully into `send_document`'s `to_email` override (the one genuine free-text
destination among the three named verbs); wired as defense-in-depth onto `send_text`/
`send_booking_link`'s resolved contact/lead id (always UUID-shaped there today, so always
passes by construction — no raw destination field exists on either verb's schema — but
uniform across all three and future-proofed if that ever changes).

**Design call, flagged not hidden**: `checkRecipientNotFromReadContent` **skips** (never
refuses) when no actor context is established at all — this is the CRM UI route
(`/api/assistant/route.ts`, never touched this round) and any direct unit-test call. Fail-
open there, not fail-closed, because the WO never asked me to touch that surface and a
regression on live `to_email` functionality there would be a real, unasked-for behavior
change. When a context IS established (Slack) but the operator said nothing, the check
correctly fails closed on a non-UUID recipient.

### §3 Confirm binding — actor identity threading + all ~23 CONFIRM_REQUIRED verbs
**Threading approach used: module-scoped AsyncLocalStorage — no blocker hit, fully wired.**
New file `assistant-actor-context.ts`: `runWithAssistantContext({actorId, operatorMessages},
fn)` / `getCurrentActorId()` / `getOperatorMessages()`. Wired at exactly ONE call site —
`slack-events.ts`'s `runAssistantTurn`, wrapping the existing `runAssistant(...)` call.
Since `assistant.ts`/`agent-loop.ts` share a fixed, un-editable two-arg
`execute(input, db)` signature, AsyncLocalStorage is the only mechanism that can carry
identity all the way down to a tool's `execute()` without touching either file — the
async-context propagates through every `await`, through `Promise.all`, through the tool-
loop's iteration, with zero signature changes anywhere in between.

`issuePreview()`/`checkConfirmToken()` (new, `assistant-safety-wiring.ts`) replace every
verb's own `needsConfirmation()`/raw confirm check at the two-phase boundary. Every
CONFIRM_REQUIRED verb's schema gained `confirm_token` (echoed automatically, never
hand-set). A confirm with no token is refused (`missing_confirm_token`, named reason).
Any token mismatch (wrong verb, wrong user, changed preview, expired, malformed) **never
acts** — always re-previews with a fresh token bound to whoever is actually asking right
now, which is the concrete confirm-hijack fix: a second person's stray "yes" in a shared
Slack thread can never fire the first person's queued action; they get their own fresh
confirmation to agree to.

Wired into every confirm-gated verb across the whole tool surface (WO's "every" taken
literally, not scoped to the customer-reaching subset): `send_text`, `custom_cadence`
(+ its own collision-drift re-preview, hand-minted against the canonical preview text so
the token round-trips correctly through that verb's own extra drift check),
`send_booking_link`, `cancel_scheduled_send`, `resend_failed_send`, `place_call`,
`send_document`, `pause_alex`, `set_do_not_contact`, `cancel_cadence`, `add_note`,
`create_task`, `reassign_lead`, `schedule_appointment` (both its book-and-confirm and
proposed paths), `delete_lead`, `bulk_delete_leads`, `set_lead_stage`, `set_job_stage`,
`set_task_status`, `add_lead`, `add_contact`, `edit_contact`, `set_appointment_status`,
`cancel_appointment`, `move_appointment`, `reschedule_cadence_step`, `start_cadence`.

**Design call, flagged not hidden**: the CRM UI route and any caller outside a
`runWithAssistantContext` scope get the fixed sentinel `UNATTRIBUTED_ACTOR`
("unattributed") as their actor id. Confirm-binding still round-trips correctly there
(same sentinel both times = the token still verifies), but it does not yet distinguish
two different human CRM-UI users from each other — the WO scoped actor-identity threading
to the Slack path only ("the Slack path already knows the requesting user"), so I did not
invent CRM-UI threading beyond that. Recorded here, not silently left as a gap nobody
knows about.

### §4 Per-user gating — query_crm, place_call, custom_cadence (debrief absent, verified)
New file `assistant-authz-users.ts`, exactly per spec:
`slackDeepAccessAllowlist()` / `mayUseDeepVerb(userId)` / `currentUserMayUseDeepVerb()` /
`deepAccessRefusal()`. **Env var: `SLACK_DEEP_ACCESS_USERS`**, falling back to
`SLACK_ASSISTANT_WRITE_USERS` when unset (same comma-separated `Uxxxxxxxx` shape as the
existing `slackWriteAllowlist()`). Fail-closed per the WO's literal text: unset list,
unknown user, missing userId, or the `UNATTRIBUTED_ACTOR` sentinel (even if it somehow
appeared in the env var's literal text) all → refused. Refusal message is the WO's exact
wording: *"that one's restricted to Joseph's account until Sean's access tier is
decided."* `debrief` — grepped, confirmed absent from this sandbox, correctly skipped per
the WO's own "(if present in your sandbox)" conditional.

**Consequence flagged, not hidden**: this gate is deliberately universal (not Slack-only),
matching the WO's literal "FAIL-CLOSED: unset list or unknown user => false" and the
`userId: string | undefined` signature it specified. That means the CRM UI route — which
has zero actor-identity concept today and always resolves to the sentinel — is now ALSO
fully blocked from `query_crm`/`place_call`/`custom_cadence`, not just ungated-by-Slack-
allowlist as before. All three are independently ship-dormant behind their own settings/
env anyway (`custom_cadence_enabled`, `place_call_enabled`, `ALEX_READER_DATABASE_URL`),
so this is unlikely to be a live regression today, but it is a real behavior change beyond
literally "gate the Slack path" — recorded for visibility, not silently absorbed.

## STOP QUESTIONS: 0

No sub-item was silently left undone or hit a hard wall — actor-identity threading (the
part flagged as hardest and possibly a dead end) fully wired via AsyncLocalStorage. The
two items above (CRM-UI recipient-check fail-open; CRM-UI now excluded from deep-access)
are judgment calls made from the WO's own text, not gaps I left unimplemented — flagged
above for visibility, not asked as questions, since both have a clear textual basis in the
WO. If either reads wrong, they're both isolated to `assistant-safety-wiring.ts`'s
`checkRecipientNotFromReadContent` (~5 lines) and `assistant-actor-context.ts`'s sentinel
handling (~3 lines) respectively — cheap to flip.

## REGISTRATION (I did not edit `src/lib/assistant.ts` — nothing new to register as a
tool; this is the one prompt-text change the WO asked me to report instead of make)

`ALEX_TEXT_REGISTER` (exported from `assistant-composition-lint.ts`, already existed from
round 1) needs to reach the model's system prompt so Alex's own free-composed text follows
the persuasion register. Exact change needed in `assistant.ts`:

1. Add the import (near the other lib imports, e.g. beside the `agent-loop` import block):
   ```ts
   import { ALEX_TEXT_REGISTER } from "@/lib/assistant-composition-lint";
   ```
2. In `runAssistant()`'s system-prompt assembly (the `const system = ...` block), append it
   conditionally on `hasWrites` — same conditional, same append style as `ACT_FIRST_POSTURE`
   right above it:
   ```ts
   const system =
     buildSystemPrompt(hasWrites).replace(...) +
     (hasWrites ? ACT_FIRST_POSTURE : "") +
     (hasWrites ? ` ${ALEX_TEXT_REGISTER}` : "") +   // <-- new line
     (opts.speaker ? multiPartyRule(opts.speaker) : "") +
     (opts.grounding ? `\n\n${opts.grounding}` : "");
   ```
`hasWrites` is the right gate: `ALEX_TEXT_REGISTER` only matters when Alex might compose an
SMS body itself, which only happens when write verbs (`send_text`/`custom_cadence`/
`send_booking_link`) are in the tool set at all.

## FILES STAGED (39)

**New (8):**
`assistant-actor-context.ts` · `assistant-safety-wiring.ts` · `assistant-authz-users.ts` ·
`assistant-test-support.ts` (test-only helper, no describe/it — bridges pre-existing tests'
`{confirm:true}` calls through the new token requirement transparently; see its own header)
· `assistant-lint-wiring.test.ts` · `assistant-untrusted-wiring.test.ts` ·
`assistant-confirm-wiring.test.ts` · `assistant-deep-gate.test.ts`

**Edited verb files (16):** `slack-events.ts` · `assistant-send-text.ts` ·
`assistant-custom-cadence.ts` · `assistant-booking-link.ts` · `assistant-outbox-control.ts` ·
`assistant-place-call.ts` · `assistant-comms-tools.ts` · `assistant-tools.ts` ·
`assistant-lead-tools.ts` · `assistant-production-tools.ts` · `assistant-contact-tools.ts` ·
`assistant-appointment-tools.ts` · `assistant-cadence-control.ts` ·
`assistant-start-cadence.ts` · `assistant-universal-read.ts` · `assistant-history-tools.ts`

**Edited pre-existing test files (14)** — every one needed the SAME bridge: a bare
`{confirm:true}` call with no token, which every pre-existing test used, now needs a real
token round-trip. Fixed via one of two idioms (see `assistant-test-support.ts`): wrap the
file's shared `run()` helper with `autoConfirmRun`, or (for files calling `.execute(`
inline at many sites with no shared helper) `wrapWithAutoConfirm(tool)` once per tool,
in-place, right after the imports. Three of these files (`assistant-place-call.test.ts`,
`assistant-custom-cadence.test.ts`, `assistant-universal-read.test.ts`) ALSO needed a
`SLACK_DEEP_ACCESS_USERS` env arm + `runWithAssistantContext` wrap for §4's new gate:
`assistant-place-call.test.ts` · `assistant-custom-cadence.test.ts` ·
`assistant-universal-read.test.ts` · `assistant-send-text.test.ts` ·
`assistant-booking-link.test.ts` · `assistant-cadence-control.test.ts` ·
`assistant-start-cadence.test.ts` · `assistant-outbox-control.test.ts` ·
`assistant-contact-tools.test.ts` · `assistant-appointment-tools.test.ts` ·
`wo9h-assistant-writes.test.ts` · `assistant-honesty-fixes.test.ts` ·
`assistant-ads-scope.test.ts` · `api-booking.test.ts`. One of these
(`wo9h-assistant-writes.test.ts`) also had one pre-existing `assert.deepEqual(echo, {...})`
exact-shape assertion that legitimately needed updating to check fields individually plus
`confirm_token`'s presence, since a fixed-shape comparison can never match an object that
now legitimately carries a per-call-random token.

**`package.json`**: appended the 4 new test files to the `test` hand-list (nothing
reordered or removed, per the standing rule).

## HOUSE IDIOMS COPIED (named, per the reporting rule)

- The "re-check the wall / re-derive fresh state on confirm" pattern — copied from every
  existing verb (`assistant-send-text.ts` etc.) rather than invented: confirm-binding's
  hoisted preview-text-computed-once-per-call pattern rides on top of it for free, since
  every ingredient was already re-read fresh on both preview and confirm calls.
- `assistant-authz-users.ts`'s allowlist parsing mirrors `slack-events.ts`'s
  `slackWriteAllowlist()` shape exactly (comma-split, trim, filter-empty) — deliberately
  NOT imported from there (see the file's own header: avoids a fresh import edge into a
  file outside this builder's edit rights, and it's a 3-line function, cheap to hold twice).
- The "TEST SEAM ONLY, never called from application code" framing on
  `assistant-place-call.ts`'s `__setClockForTests` — same idiom named directly in
  `assistant-actor-context.ts`'s and `assistant-test-support.ts`'s own headers for their
  test-only exports.

## A NOTE ON SCOPE

Every confirm-gated verb across the WHOLE tool surface got wired (not just the customer-
reaching subset) — the WO's "every CONFIRM_REQUIRED verb" read literally. That is a wider
blast radius than the minimum motivating scenario (the Slack multi-user confirm-hijack),
but a verb left un-wired is exactly as hijackable as before, and the mechanical cost per
verb was small once `assistant-safety-wiring.ts` existed. `assistant-lead-tools.test.ts`
needed no changes at all — verified it makes no `confirm:true` calls in its existing
suite (pure-surface tests only), so nothing there could have broken.
