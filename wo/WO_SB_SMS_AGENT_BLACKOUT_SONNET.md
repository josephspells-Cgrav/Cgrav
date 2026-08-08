# WO-SB — the TEXT agent must never propose a blacked-out day (LIVE DEFECT, proven tonight)

**Read FIRST:** `wo/WO_R2_COMMON.md` (all rules apply) with these OVERRIDES:
- Staging root: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/SB_STAGED_DELIVERABLE/` (repo-relative paths, CRM only).
- CRM repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` branch `showroom-integration` @ HEAD `c127add`.
- 🔴 **GATES IN THE FOREGROUND, inline, never backgrounded.**
- Build report: `wo/BUILD_REPORT_SB.md`.
- ⚠️ A sibling builder (BL) is concurrently editing `assistant-tools.ts`, `assistant-debrief.ts`,
  `assistant-appointment-tools.ts`. **DO NOT TOUCH THOSE THREE FILES.** Your surface is the
  customer-facing TEXT agent only. If you believe a change belongs in one of them, STOP it and
  report it instead.

## 🔴 THE LIVE DEFECT (this is not hypothetical — it happened at 7:09pm ET on 2026-08-07)
Sean is unavailable **Aug 10-12** (settings `booking_blackouts`, live and honored by the /book
grid, the voice agent, and booking-core). The handoff records "all THREE slot surfaces read it."
**There is a FOURTH surface nobody enumerated: the customer-facing text agent.** Tonight it
auto-sent a real homeowner, all delivered:
> "Tuesday, August 11th could work — what time that day is best for you?"
> "Great, I'll pencil in Tuesday, August 11th in the morning."
> "Got it — Tuesday, August 11th in the morning, with Friday, August 14th as backup."

Receipts: `src/lib/text-alex-drafts.ts` and `src/lib/text-alex-shared.ts` contain **zero**
occurrences of "blackout" and neither imports `src/lib/booking-blackouts.ts` (the only importers
are assistant-blackout-tools, assistant-debrief, assistant-grounding, booking-core,
booking-public, scheduling, vapi-tools). No appointment row was written — booking-core would
have refused — so the damage is a **spoken commitment the calendar will not honor**.

## The work — TWO layers. The lint is the wall; the grounding is the courtesy.

### 1. THE WALL — a blackout lint on every composed customer body (do this first)
In the text-agent send path (`text-alex-drafts.ts`, before a draft is auto-approved/auto-sent):
- Extract candidate DATE references from the composed body. Scope to the formats this agent
  actually writes, within a today..+60d ET window: `Tuesday, August 11th` · `August 11` ·
  `Aug 11` · `8/11` · `Monday the 10th` · bare weekday names (`Tuesday`) resolved to the NEXT
  such weekday. Use the repo's existing ET/TZDate idiom (see `scheduling.ts` / `booking-core.ts`
  — name the file:line you copied).
- Resolve each to an ET calendar date; check with the EXISTING helpers
  (`loadBlackoutDates` / `isBlackedOut` / `blackoutReason`) — **reuse, never re-implement**.
- **Any hit ⇒ the draft does NOT auto-send.** Set `needsHuman: true` with an escalation reason
  naming the date and the blackout reason, exactly like the existing escalation class does
  (match `composeTextAlexDraft`'s escalation shape — do not invent a new mechanism).
- **Fail-SAFE direction is escalate, never send:** if a date reference is ambiguous or your
  parser is unsure, treat it as a HIT. A human reading one extra draft costs nothing; an
  auto-sent wrong date costs a no-show. State this rule in a comment at the check.
- Bare weekday-only mentions that resolve INTO a blackout also escalate.

### 2. THE COURTESY — give the agent the dates so it stops proposing them
Add the blackout window to the text agent's grounding/context (`text-alex-shared.ts`), copying
the SHAPE of the assistant's existing line in `assistant-grounding.ts` (WO-R2C — read it and
match its register + its today..+21d window). It must state the unavailable dates and that they
may not be offered. This is defense-in-depth, NOT the gate — a prompt rule loses to the shape of
the document; layer 1 is what actually holds.

### 3. Tests (the LIST, not just the behavior)
- Each date format above, blacked-out → escalates, does NOT auto-send. Same formats on a free
  day → byte-identical behavior to today (prove no regression on the happy path).
- The exact live body `"Great, I'll pencil in Tuesday, August 11th in the morning."` against the
  live-shaped range `{"ranges":[{"start":"2026-08-10","end":"2026-08-12","reason":"Sean unavailable"}]}`
  → escalated. Use a FIXED clock/date injection; never `Date.now()` in an assertion.
- A membership-style sweep in the spirit of BL's: any auto-send path in the text-agent files that
  does not run the blackout check fails the test.
- Expired range gates nothing.
- New tests by FULL PATH in package.json's `test` hand-list (append only — the orchestrator unions).
- PGlite teardown: delete `touchAttempts` BEFORE `outbox` (FK).

### 4. Explicitly OUT of scope (state in the report, do not build)
Sending a correction to the affected homeowner (customer-reaching — Joseph's call) · changing
the proposal_chase ladder · any edit to the three assistant files BL owns · the voice agent
(already gated via `vapi-tools.ts`).

## Gates + report
`npx tsc --noEmit` · `npm test` · `npm run build` — FOREGROUND, tails verbatim.
`wo/BUILD_REPORT_SB.md`: the parser's supported-format table · the escalation shape you matched
(file:line) · gate tails · receipts ledger · STOPs · REGISTRATION section (likely empty).
You never deploy; the orchestrator integrates, re-runs every gate, deploys.
