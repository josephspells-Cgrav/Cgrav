# WO-A1 — The attempt ledger + honesty fixes (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL (mandatory):** copy the repo (minus node_modules/.next/.git) to your own
sandbox, `pnpm install` there (**this repo is pnpm — never npm install**), do ALL work and
ALL gates in the sandbox, then stage every created/modified file at exact repo-relative paths
into `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/A1_STAGED_DELIVERABLE/`.
You never commit to the real repo; the orchestrator integrates, re-runs gates, and commits.

**You are a typist for a locked design.** Where this WO is silent → STOP that item, record the
question in your build report, continue everything else. Spec of record:
`C:/Users/josep/Claude Gravity/wo/ALEX_VERB_SPACE_20260807.md` → read ONLY the section
"⭐ FINAL CONSOLIDATED BUILD SPEC" (everything above it is superseded history).
**Gates before finishing:** `npx tsc --noEmit` · `npm test` · `npm run build`.
**NEVER:** deploy · run DDL against any database · touch .env files · install deps beyond
what exists · edit anything outside this WO's scope.

## THE MISSION (why this WO exists — Kimi's THE ONE THING)
An outbound CALL that fails records NOTHING durable — `cadence.ts:1157` is a `console.error`
and a `call` step never touches the outbox (`cadence.ts:1144-1146`). So "did anyone call
Ann?" is unanswerable, forever, by any reader. This WO makes the world **fully recorded**
before any read layer is built on top of it.

## 1. DDL — `scripts/apply-touch-attempts-ddl.mjs` (copy the shape of `scripts/apply-takeoff-ddl.mjs`)

Idempotent, additive, printed read-back verification:

```sql
DO $$ BEGIN CREATE TYPE touch_channel AS ENUM ('call','sms','email');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE touch_status AS ENUM ('attempted','delivered','failed','skipped','blocked');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS touch_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid,
  channel touch_channel NOT NULL,
  status touch_status NOT NULL DEFAULT 'attempted',
  to_address text NOT NULL,
  contact_id uuid REFERENCES contacts(id),
  lead_id uuid REFERENCES leads(id),
  actor text NOT NULL,              -- 'cadence' | 'assistant' | 'voice_agent' | 'sms_agent' | 'speed_to_lead' | 'system'
  source text,                      -- cadenceKey / verb name / route
  outcome text,                     -- the raw outcome word ('fired','outside_window','dormant','error',...)
  detail text,                      -- error message / skip reason, truncated to 500 chars by the writer
  external_id text,                 -- VAPI callId / provider message id when known
  outbox_id uuid REFERENCES outbox(id),
  cadence_run_id uuid,
  meta jsonb,
  attempted_at timestamptz NOT NULL DEFAULT now(),
  settled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS touch_attempts_to_address_idx ON touch_attempts (to_address, attempted_at DESC);
CREATE INDEX IF NOT EXISTS touch_attempts_lead_id_idx ON touch_attempts (lead_id);
CREATE INDEX IF NOT EXISTS touch_attempts_contact_id_idx ON touch_attempts (contact_id);
```

Mirror in `src/lib/db/schema.ts` using the house helpers (`idPk()`, `orgId()`, `createdAt()`,
`updatedAt()`, pgEnum + `$inferSelect` type export), placed in its own section near the end
like `takeoffRuns`. Export `TouchAttempt`.

⚠️ **DO NOT touch `outboxStatusEnum` or the outbox drain.** The ledger is a SEPARATE table
precisely so no existing consumer (the transport drain matches `status='pending'`) can ever
pick up a call row.

## 2. `src/lib/touch-ledger.ts` — the ONE writer

```ts
export async function recordTouchAttempt(db, input: {
  channel: "call" | "sms" | "email";
  toAddress: string;
  actor: string;            // see actor list above
  source?: string;
  status?: "attempted" | "delivered" | "failed" | "skipped" | "blocked";
  outcome?: string;
  detail?: string;
  externalId?: string;
  outboxId?: string;
  cadenceRunId?: string;
  contactId?: string;
  leadId?: string;
  meta?: Record<string, unknown>;
}): Promise<{ id: string } | null>
```
Rules (all FINAL):
- **NEVER THROWS and never blocks the caller.** Wrap the whole body in try/catch; on failure
  `console.error("[touch-ledger] write failed", e)` and return `null`. A ledger write failure
  must never kill a real customer touch.
- **Never `void` the promise** — callers `await` it (house law: a `void` fire-and-forget DB
  insert dies with the frozen lambda).
- `detail` truncated to 500 chars by the writer.
- `orgId` stamped from `DEFAULT_ORG` (`src/lib/org.ts`) explicitly.
- Phone normalization via the house `normalizePhone` before write.
- Also export `settleTouchAttempt(db, id, {status, outcome?, detail?, externalId?})` — sets
  `settled_at = now()`; same never-throws contract.

## 3. WIRING — every outbound attempt, no exceptions

**3a. `src/lib/speed-to-lead-call.ts` → `placeCadenceCall` (and the sibling speed-to-lead
dial function in the same file, if one exists — grep for every function returning
`SpeedToLeadOutcome`).** Record ONE attempt row per invocation, mapping the outcome union:
| outcome | status | outcome text |
|---|---|---|
| `fired` | `attempted` | `fired` (+ `externalId = callId`) |
| `error` | `failed` | `error` (+ detail) |
| `outside_window` | `skipped` | `outside_window` |
| `dormant` | `skipped` | `dormant` |
| `demo_scope` | `skipped` | `demo_scope` |
| `test_number` | `skipped` | `test_number` |
| `skipped` | `skipped` | `skipped` |
Write it at the **return boundary** (one place, right before each return, or wrap the body
and record once on the way out — your choice, but EVERY return path records). Pass through
`cadenceRunId`, `cadenceKey` as `source`, actor `"cadence"` when a cadenceRunId is present
else `"speed_to_lead"`.

**3b. `src/lib/cadence.ts` `fireCadenceStep`** — the call branch already has the outcome at
`:1148-1158`; do NOT double-record if 3a covers it (3a is the single write point — verify by
reading, and if 3a covers it, leave cadence.ts's console.error alone as a log).

**3c. The SMS/email send point** — find the outbox transport's actual send function
(`src/lib/outbox-transport.ts`, `isDrainEligible` lives there; also check `src/lib/outbox.ts`).
At the moment a row is actually attempted on the wire, record `channel` from the row,
`actor` from the row's `source` (map `assistant`→`assistant`, cadence rows→`cadence`,
text-alex→`sms_agent`, else `system`), `outboxId` = the row id, status `attempted`, then
`settleTouchAttempt` to `delivered`/`failed` with the provider detail. **Do not change any
drain decision logic** — this is instrumentation only, added beside existing status writes.

**3d. Simulated / demo rows:** if the transport marks a row `simulated`, record the attempt
with status `skipped`, outcome `simulated`. Never claim a delivery that did not happen.

## 4. HONESTY FIXES (all small, all pinned)

**4a. ONE calling-window source.** `isWithinCallingWindow` (`speed-to-lead-call.ts:224`) is
**8am-9pm ET** and is the truth. Fix the docs that disagree: `cadence.ts:402,429-430` say
"8am-8pm" — correct those comments to 8am-9pm ET and add `// window source of truth:
isWithinCallingWindow()`. Do NOT change any behavior. If `src/lib/outbox.ts`'s
`nextWindowOpening` uses different bounds, report the discrepancy in your build report —
do NOT silently reconcile code behavior, only comments/descriptions.

**4b. `pending_booking_requests` empty-state honesty** (`assistant-tools.ts:~1230`): keep the
24h filter, but the empty-result note must name it — model the wording on `recent_calls`'
existing window-disclosing empty note. Also append the window to the tool DESCRIPTION.

**4c. `resolveSendAt`** (`assistant-send-text.ts:~98`): refuse a resolved time earlier than
`now` with a named error (`send_at resolved to <iso>, which is in the past`); warn (allow)
beyond 30 days.

**4d. `find_contact_id`** (`assistant-reader-tools.ts:~200`): drop `query` from `required`;
validate in execute that at least one of `query` / `lead_id` was supplied, matching the
neighbouring tools' validation idiom.

**4e. `reassign_lead`** (`assistant-tools.ts:~901`): filter the user roster to in-rotation
reps (the column exists — `schema.ts:809-815`); if a named match is ineligible, say so
explicitly rather than silently assigning.

**4f. Grounding org-scope** (`src/lib/assistant-grounding.ts`): every query (recent leads
`:88-91`, recent calls `:93-102`, appointments `:106-115`, name top-up + phone fallback
`:131-143`, `:190-207`) gets `getScope()`/`whereOrg` exactly like the reader tools do. Its
own header claims "grounding widens convenience, never access" — make that true.

## 5. TESTS (register every new file by FULL PATH in package.json's `test` hand-list)
`src/lib/touch-ledger.test.ts`:
- every `SpeedToLeadOutcome` variant maps to the pinned (status, outcome) pair
- a ledger write failure does NOT throw and does NOT change the caller's return value
- `detail` truncated at 500 · phone normalized · orgId stamped · settle sets settled_at
- simulated rows record `skipped/simulated`, never `delivered`
`src/lib/assistant-honesty-fixes.test.ts`:
- pending_booking_requests empty note names the 24h window
- resolveSendAt refuses a past time (named error) and allows a future one
- find_contact_id accepts lead_id alone; rejects neither-supplied
- reassign_lead excludes out-of-rotation users
- every grounding query includes an org predicate (assert on the built SQL / call args in the
  style of the existing scope tests — see `src/lib/reads-scope-pages-a.test.ts` for the idiom)

## 6. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_A1.md`
Gate output tails verbatim · files touched · STOP questions · house idioms copied (name the
source file per instance) · **explicitly state whether 3a alone covers the cadence call path
or whether 3b was needed, and why.** Do not deploy. Do not run the DDL.
