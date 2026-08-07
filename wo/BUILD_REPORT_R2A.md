# BUILD REPORT — R2A — `debrief`

Builder: Sonnet-5, judgment-zero. Staging id: **R2A**.
Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/R2A_sandbox` (repo copy, `pnpm install`, all gates run there).
Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/R2A_STAGED_DELIVERABLE/`.

## Gates

All three run in the FOREGROUND (blocking, no backgrounding) to a real terminal exit code — no gate was claimed from a name-drop or a mid-flight log tail.

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS — `TSC_EXIT=0`, zero diagnostic output |
| Unit tests (own file, isolated) | `npx tsx --test src/lib/assistant-debrief.test.ts` | ✅ 22/22 pass, 9 suites, 0 fail |
| Unit tests (full repo suite, via `npm test`) | `npm test` | ✅ PASS — `NPM_TEST_EXIT=0` |
| Build | `npm run build` | ✅ PASS — `NPM_BUILD_EXIT=0` |

### `npm test` tail (verbatim, full repo suite including my file)

```
▶ formatAddressLine
  ✔ renders street, town, ZIP (1.1489ms)
  ✔ UNKNOWN ZIP falls back to the exact line it rendered before (29.0243ms)
  ✔ degrades through every partial shape (0.4283ms)
  ✔ trims, so a stray space cannot produce a dangling comma (0.3395ms)
✔ formatAddressLine (31.9342ms)
▶ the Slack alert renders the resolved town
  ✔ puts the town in the house line (1.6364ms)
  ✔ an unknown ZIP still renders the address, minus the town (0.5852ms)
✔ the Slack alert renders the resolved town (2.4828ms)
ℹ tests 3676
ℹ suites 1022
ℹ pass 3676
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1155512.9037
NPM_TEST_EXIT=0
```

3676 tests / 1022 suites, repo-wide, zero failures — includes `assistant-debrief.test.ts`'s own 22 (re-confirmed isolated afterward too: 22/22, 9 suites).

### `npm run build` tail (verbatim)

```
+ First Load JS shared by all                                103 kB
  ├ chunks/2950-cd5fdab368542c59.js                         45.8 kB
  ├ chunks/dafdb436-44ed169584cc7812.js                     54.2 kB
  └ other shared chunks (total)                             2.61 kB


ƒ Middleware                                                 132 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

NPM_BUILD_EXIT=0
```

Build had one pre-existing, unrelated warning (`⚠ Compiled with warnings in 11.3min` — `next-auth`/`jose`'s `Compression/DecompressionStream` not supported in the Edge Runtime, sourced entirely from `node_modules/@auth/core` → `next-auth`, nothing touching `assistant-debrief.ts`) — not a failure, and not something this file could cause or fix.

Staged deliverable diffed byte-for-byte against the final sandbox state after the fixes below — `assistant-debrief.ts`, `assistant-debrief.test.ts`, `package.json` all `diff` clean (identical).

## Files touched

Created (new files only — no existing file was edited except `package.json`'s test list, per WO_R2_COMMON's explicit allowance):

- `src/lib/assistant-debrief.ts` — the tool (`debriefTool`, export name; `debrief_enabled` flag gate; `isDebriefEnabled`/`DEBRIEF_FLAG` exported for reuse).
- `src/lib/assistant-debrief.test.ts` — 22 tests, PGlite harness, `touchAttempts` deleted before `outbox` in teardown per the standing rule.
- `package.json` — appended `src/lib/assistant-debrief.test.ts` to the end of the `test` script's file list. Nothing reordered or removed.

`src/lib/assistant.ts`, `src/lib/assistant.test.ts`, `src/lib/assistant-flag.test.ts` — **not touched**, per the round's registration rule. See `## REGISTRATION` below for exactly what the orchestrator needs to add to each.

## What `debrief` does

Joseph's own words: *"I just called this lead, we scheduled an appointment for 11am, we're talking about a roof replacement, she wants to keep it within $15,000, monthly payments, I already sent her the proposal"* → one tool call, one confirm card, lands every fact in the right place.

Input: `{ lead_id?, contact_id?, slots: { appointment?, lead_stage?, payment_pref?, insurance_claim?, proposal_sent?, note? }, corrections?, confirm? }`. The model fills `slots`; the tool validates and writes — it never parses free text itself.

Card structure (pinned, matches the WO exactly):
```
⚠️ REACHES THE CUSTOMER
  1. Appointment — Tue Aug 18, 11:00 AM ET  [proposed — NAME is NOT texted]
📋 INTERNAL ONLY
  2. Lead stage -> Estimate Sent
  3. Note added (47 chars)
  4. Payment preference -> Monthly payments
Reply `confirm` to apply all, or `change N <new value>` to fix one.
```

## Five judgment calls (the WO was silent or in tension with itself; documented in the file header too)

1. **"Route through booking-core, never a raw insert" vs. "books `proposed` by default."** booking-core's four owned verbs have no verb that produces a `proposed` row (`bookAppointment` hard-codes `status:"confirmed"` + always offers to text). Read against `assistant-appointment-tools.ts`'s own precedent for a booking-core gap (completed/no_show — "mirrors that exact house pattern rather than inventing a second implementation"), the ban reads as "don't reimplement what booking-core owns," not "never touch `appointments` directly." `homeowner_agreed:true` → `bookAppointment` (texts). Default → a plain insert guarded by the same `findConflict` helper `schedule_appointment`'s own existing proposed branch already uses.
2. **Blackout is disclose-only, never a block** ("the operator may still proceed") — the opposite of booking-core's own `isBlockedByBlackout`. At confirm time the tool passes `allowBlackout:true` to `bookAppointment` (the same operator-override lane booking-core's own header names). The raw-insert proposed path has no blackout gate to bypass in the first place.
3. **"Ambiguous referent → refuse and list candidates."** debrief's schema has no name/search field, so the only real ambiguity is `contact_id` given alone where that contact carries more than one lead (same shape `assistant-history-tools.ts`'s `resolveTarget` already documents as a "repeat inquiry"). That's what refuses and lists. Two disagreeing ids (both given) has nothing to list and stays the plain `ambiguous_target` refusal every other verb uses.
4. **`payment_pref` has no dedicated column** (grepped the schema — none exists) and the WO's own money rule puts it in note text only, so it's folded into the one combined note-kind activity. `insurance_claim` DOES have a real column (`leads.insurance_claim`) and isn't money, so it's written there directly.
5. **Idempotency hash storage** — "store the hash in the note activity's meta" implies a note-kind activity always exists on a real confirm, so the tool always writes exactly one (even with an empty body) purely to home the hash. The visible "Note added (N chars)" card line still only appears when the operator actually dictated `slots.note`.

Stage-move semantics deliberately differ by source: an explicit `slots.lead_stage` behaves like `set_lead_stage` (backward allowed, called out). `proposal_sent`'s automatic bump to `estimate_sent` behaves like `advanceStageOnBooking` (forward-only via `stageIsBefore`, so a parked lost/nurture lead is never yanked back in). If both are given, the explicit instruction wins.

One self-caught bug during review: the `needsConfirmation` echo originally carried both `lead_id` and `contact_id`. Since the tool's own first check refuses when both are given, a caller that faithfully echoed the preview's fields back on the confirm turn would trip its own refusal. Fixed — the echo now carries only the already-disambiguated `lead_id`.

## STOP questions

**Zero.** Every WO silence was resolved with a documented, precedent-traceable judgment call (above and in the file header) rather than a stop — none of them touch money-activation, prod config, or an irreversible action without a disclosed, reversible fallback (blackout and backward-stage moves are both disclosed in the card, never silent).

One low-stakes default worth flagging explicitly even though it's not a stop: `appointment.kind` defaults to `"inspection"` when the model omits it — the WO's own worked example never specifies a kind and still expects a working card, so this was the only reading that fits the example.

## REGISTRATION

Import line for `src/lib/assistant.ts`:

```ts
import { debriefTool } from "@/lib/assistant-debrief";
```

Branch: **writes-live only** (the `ASSISTANT_WRITES_LIVE === "1"` branch of `allTools()`), registered as an individual identifier in the array literal — same pattern as `placeCallTool`/`customCadenceTool` ("ship DORMANT behind their own settings flag; the flag gate lives INSIDE execute(), so a caller with writes but not the per-verb flag gets a named refusal, not a missing tool"). Not read-only (it writes appointments/leads/activities). Suggested slot: next to the other WO-ALEX-A-series verbs, e.g. right after `sendBookingLinkTool`:

```ts
        sendBookingLinkTool,
        debriefTool,
```

`assistant-debrief.ts`'s own import graph (booking-core, booking-blackouts, db/schema, demo-scope, org-settings, actor, audit, format, speed-to-lead-call, appointments, scheduling, org, unique-retry, stages, production-stages, assistant-floor) is the same graph `assistant-appointment-tools.ts` and `assistant-lead-tools.ts` already use as **plain static imports** with no cycle — so a plain top-level `import` (not the lazy-dynamic-import pattern `start_cadence`/`send_text` need) should be safe. Worth a `tsc`/`build` re-check once wired, same as any registration.

Two other files need a one-line addition each once `debrief` is live (found read-only, not edited, per the round's rule):

- **`src/lib/assistant-flag.test.ts`** — `WRITE_TOOL_NAMES` is an ORDERED array `deepEqual`'d against `allTools()`'s actual output. Add `"debrief"` at the same position where it's registered in `allTools()` (i.e. wherever it lands relative to `send_booking_link` above), or this file's flag-closure test fails on a straight order mismatch.
- **`src/lib/assistant.test.ts`** — the "confirm coverage registry" test derives write-tool names from `allTools()` and asserts every one is classified into `CONFIRM_REQUIRED` or `NO_CONFIRM_OK`, or the test fails with `"debrief" is UNCLASSIFIED`. `debrief` belongs in **`CONFIRM_REQUIRED`** — it carries two-phase confirm and can reach a real homeowner (an appointment booked with `homeowner_agreed:true` texts them via booking-core), matching the class `set_appointment_status`/`move_appointment`/`start_cadence` already sit in. Suggested entry, matching that file's own comment style:
  ```ts
  "debrief", // WO-R2A — can text the homeowner (homeowner_agreed:true books+texts via booking-core)
  ```

`src/lib/assistant-authz.test.ts` was read in full (not edited): every assertion is a positive `.includes(name)` check against a small fixed set of PRE-EXISTING tool names, or a length/prompt-content check — no `deepEqual` against the full tool list anywhere. Confirmed safe to leave alone; adding `debrief` does not require touching this file.

## House idioms copied (source cited)

- Gate pattern (`debrief_enabled`, `isDebriefEnabled`) — copied from `START_CADENCE_FLAG`/`isStartCadenceEnabled` in `src/lib/assistant-start-cadence.ts`.
- `findConflict`-guarded raw insert for a `proposed` appointment — copied from `schedule_appointment`'s existing proposed branch in `src/lib/assistant-tools.ts` ("proposed path — byte-identical to today").
- `allowBlackout:true` at an operator-driven call site — copied from the lane `src/lib/booking-core.ts`'s own header names for CRM UI / Slack `/mabrey` / the operator's SMS confirm relay.
- Forward-only automatic stage advance (`stageIsBefore`) — copied from `advanceStageOnBooking` in `src/lib/booking-core.ts`.
- Backward-allowed explicit stage move, disclosed not blocked — copied from `setLeadStageTool` in `src/lib/assistant-lead-tools.ts`.
- Multi-lead-on-one-contact resolution shape — copied from `resolveTarget` in `src/lib/assistant-history-tools.ts`.
- `add_note`'s `activities` insert shape (`kind:"note"`, `resolveActor()`, `logAudit`) — copied from `addNoteTool` in `src/lib/assistant-tools.ts`.
- Re-guard-immediately-before-write at confirm time — copied from `start_cadence`'s `runGuards()`-twice pattern in `src/lib/assistant-start-cadence.ts`.
