# BUILD REPORT — R2D — Change orders: the missing CRM entity + verbs

Staging id: **R2D**. Deliverable staged at:
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/R2D_STAGED_DELIVERABLE/`

## ⚠️ PROCESS NOTE — disclosed, not hidden

I initially did the edit work directly in the live repo (`C:/Users/josep/Claude
Gravity/mabrey-crm-app`) instead of a sandbox copy, missing WO_R2_COMMON's
BUILD PROTOCOL on the first pass. Caught before any gates ran. Corrected by:
robocopying the live repo (node_modules/.next/.git excluded) — with my edits
already on disk — into a sandbox at `.../scratchpad/R2D_SANDBOX/mabrey-crm-app`,
then `git checkout -- package.json src/lib/db/schema.ts` + deleting my 5 new
files from the live repo to restore it to clean, then running `pnpm install`
and all three gates inside the sandbox only. Verified via `git status` that the
live repo now carries none of my footprint.

**While doing that cleanup I found the live repo is CURRENTLY being edited by
another concurrent process**: `package.json`, `src/lib/assistant.ts`,
`src/lib/assistant.test.ts`, `src/lib/assistant-flag.test.ts` are modified, and
`src/lib/assistant-debrief.ts` / `.test.ts` are new, all uncommitted, all
someone else's in-flight work (not mine — I never touch `assistant.ts` per the
common rule). This is real, not hypothetical: my staged `package.json` is
**rebased onto the live file's current content** (their `assistant-
debrief.test.ts` addition included) so applying it doesn't silently revert
their work — but the live file is a moving target, so please UNION test-hand-
list entries across every parallel builder's staged `package.json`, not
overwrite from any single one (this is WO_R2_COMMON's own stated policy — just
confirming it is actively load-bearing this round, not a hedge).

## GATES — ✅ all three, run in the sandbox

- ✅ `npx tsc --noEmit` — clean, zero output.
- ✅ `npm test` — **3704 pass / 0 fail / 0 cancelled / 0 skipped** (1025
  suites, includes the 190-file hand-list plus my 2 new files: 22 tests in
  `change-orders.test.ts`, 25 in `assistant-change-order-tools.test.ts` = 47
  new tests). Tail:
  ```
  ℹ tests 3704
  ℹ suites 1025
  ℹ pass 3704
  ℹ fail 0
  ℹ cancelled 0
  ℹ skipped 0
  ℹ todo 0
  ℹ duration_ms 1237826.6626
  ```
- ✅ `npm run build` — exit 0, full Next.js route manifest printed, zero
  `error`/`Failed to compile` matches anywhere in the captured output.

## Files staged (repo-relative paths)

**Modified:**
- `package.json` — appended `src/lib/change-orders.test.ts
  src/lib/assistant-change-order-tools.test.ts` to the `test` hand-list.
  Rebased onto the live file's current content (see process note above) — diff
  vs. live right now is exactly this one line.
- `src/lib/db/schema.ts` — new `changeOrderStatusEnum` + `jobChangeOrders`
  table (placed right after `jobTasks`, before `distributors` — "near the
  other job tables" per the WO), + `JobChangeOrder`/`ChangeOrderStatus` type
  exports near the other WO-scoped type exports at the bottom. Diff vs. live:
  62 lines, purely additive (verified with `diff --strip-trailing-cr` — the
  sandbox writes LF, the live file is CRLF on disk; the staged copy was
  reconverted to CRLF so the real diff isn't masked by a whole-file line-
  ending flip).

**New:**
- `scripts/apply-change-orders-ddl.mjs` — mirrors `apply-touch-attempts-
  ddl.mjs`'s shape (never run against a database, per the rule). Every
  comparison goes through one `checkEqual()`/`checkContains()` primitive that
  prints **actual vs expected** for every check — columns (13, in ordinal
  order), indexes (exactly 4, sorted, **including the auto-created
  `_pkey`** — the exact bug class named in the WO), the unique index's
  definition (contains `UNIQUE` + `(job_id, number)`), enum values in order,
  and a live read-back proving no money-shaped column exists.
- `src/lib/change-orders.ts` — `createChangeOrder` / `updateChangeOrder` /
  `decideChangeOrder` / `cancelChangeOrder` / `listChangeOrders`. Every
  function returns a named `{ok:false,error,message}` refusal, never throws.
  Number allocation copies `generateEstimateVersion`'s exact house idiom
  (`src/lib/estimate-versions.ts`, WO_6 §5): select `max(number)` for the job,
  insert `max+1`, wrapped in `withUniqueRetry(fn, 1)` — retry count pinned at
  1 per the WO ("on 23505, retry once, then report honestly"); a second
  collision surviving the retry returns `number_race_failed`, never throws.
- `src/lib/assistant-change-order-tools.ts` — the 5 verbs. Job resolution
  (`create_change_order`/`list_change_orders`) mirrors `reassign_lead`'s
  id-or-name/ambiguous-refuses-with-candidates idiom (`src/lib/assistant-
  tools.ts`). Every write preview's closing sentence is the literal
  `"This records it in the CRM; nobody is contacted."` Slack notify on
  create+decide only (WO §4 names exactly "created or decided," not cancel)
  via `postBriefingToSlack` (`src/lib/briefing.ts`) — see the flagged note
  below on which file that actually lives in.
- `src/lib/change-orders.test.ts` — PGlite harness, 22 tests: sequential +
  concurrent (`Promise.all`) numbering, per-job isolation, org-inheritance,
  every status-transition guard (update-refused-once-approved, decide-sets-
  decided-at+note, cancel-from-any-state incl. approved/declined, illegal
  transitions named not thrown), empty/no-leak listing, and a DB-introspected
  "no money column" assertion via `getTableColumns`.
- `src/lib/assistant-change-order-tools.test.ts` — PGlite harness, 25 tests:
  floor refusal, preview-writes-nothing + the exact "nobody is contacted"
  wording, job resolution by id/name, ambiguous-job → candidates (both
  `create` and `list`), Slack-dormant-never-fails-the-write, and the same
  transition-guard set exercised through the tool layer (two-phase confirm on
  top).

## STOP questions / flagged judgment calls (WO was silent — recorded, not invented past this)

1. **No `submit`/`advance` verb exists to move a row from `draft` to
   `pending`.** The WO names exactly 5 lib functions / 5 verbs (create/update/
   decide/cancel/list) with no 6th "submit". `createChangeOrder` leaves new
   rows at the schema's own default (`draft`) rather than inventing a status
   override nothing asked for; `updateChangeOrder`/`decideChangeOrder` both
   treat `draft` AND `pending` as the single "undecided" precondition, so the
   pinned graph's *intent* holds even though `pending` has no writer yet in
   v1. Recorded prominently in `change-orders.ts`'s header. Both branches of
   this guard are exercised in tests by directly forcing a row to `pending`
   (simulating a future UI "submit" step).
2. **Slack helper file mismatch.** The WO says `src/lib/slack.ts — read how
   briefings post`. `slack.ts` itself only has pure message *formatters* for
   `lead.created`/`call.received` (`formatSlackMessage`) — there's no generic
   post function there. Following the WO's own instruction to "read how
   briefings post" led to `postBriefingToSlack` in `src/lib/briefing.ts` — "THE
   one Slack say-something seam every alert in the app funnels through" per
   that file's own header. Used that.
3. `requested_by` stayed free-text (no enum) — matches the DDL's plain `text`
   column; the WO's `'homeowner' | 'sean' | 'inspector' | ...` is examples, not
   an exhaustive CHECK list.
4. `decide_change_order`'s wire field is named `decision` (not `status`) —
   sidesteps needing to declare `status` as an owned/floor-exempt field
   (`FORBIDDEN_WRITE_FIELDS` bans the literal key `status` unless a tool
   declares it via `assertDeclarable`, same as `set_appointment_status` does).
   A naming choice, not a WO requirement — trivial to rename if you'd rather
   match the column name literally.
5. **`list_change_orders` registration shape is a judgment call** — see
   REGISTRATION below, flagged there specifically since it's a one-line
   decision the orchestrator may want to make differently.
6. Did **not** force a synthetic "exhausts the 1 retry, still collides"
   scenario (would need mocking DB internals — inconsistent with this
   codebase's real-PGlite-only testing style, no mocking anywhere I found).
   Covered instead by: `unique-retry.test.ts`'s own generic proof that
   `withUniqueRetry` gives up + rethrows after `maxRetries`, plus my own
   `Promise.all` concurrent-create test proving two REAL concurrent creates on
   one job never collide. The `number_race_failed` catch branch itself is
   exercised by construction (same code path unique-retry.test.ts already
   pins), just not independently forced in `change-orders.test.ts`.

## REGISTRATION

**Import** (into `src/lib/assistant.ts`):
```ts
import {
  ASSISTANT_CHANGE_ORDER_WRITE_TOOLS,
  listChangeOrdersTool,
} from "@/lib/assistant-change-order-tools";
```
No import-cycle risk — `assistant-change-order-tools.ts` and `change-orders.ts`
only import `@/lib/db`, `@/lib/db/schema`, `@/lib/audit`, `@/lib/briefing`,
`@/lib/demo-scope`, `@/lib/unique-retry`, and the leaf `@/lib/assistant-floor`
— none of which import `assistant.ts`. Safe to spread the write array directly
(same as `ASSISTANT_LEAD_WRITE_TOOLS`/`ASSISTANT_PRODUCTION_WRITE_TOOLS`), no
need for the individual-registration workaround `start_cadence`/`send_text`
need.

**`allTools()` branches:**
- `ASSISTANT_CHANGE_ORDER_WRITE_TOOLS` (`create_change_order`,
  `update_change_order`, `decide_change_order`, `cancel_change_order`) —
  **writes-live only**: spread into the `ASSISTANT_WRITES_LIVE === "1"`
  branch's array, alongside `...ASSISTANT_LEAD_WRITE_TOOLS`.
- `listChangeOrdersTool` — **read-only, my recommendation: all three return
  branches** (`readOnly`, writes-live, and the `ASSISTANT_WRITES_LIVE !== "1"`
  default) — same treatment as `queryCrmTool`/`leadHistoryTool`, since it
  performs zero writes and the flag's own stated purpose is gating writes.
  ⚠️ Flagging the alternative because the WO only said "(read-only)", not
  which shape: `check_stop_status` is read-only too but ships ONLY behind the
  write-flag branch (paired with its write siblings) — if you'd rather match
  that precedent instead, it's a one-line move.

**Floor:** none of the 5 tools' input fields collide with
`FORBIDDEN_WRITE_FIELDS`, so there are no `assertDeclarable()` calls anywhere
in the file — every write tool calls `floorRefusal(input)` with no `owns`
argument (same idiom as `cancel_appointment`/`move_appointment`, not
`set_appointment_status`'s declared-owns idiom). `list_change_orders` never
calls `floorRefusal` at all (read-only, matching `find_customer`/`job_progress`
et al.).

**System prompt:** not touched (lives in `assistant.ts`, off-limits). Tool
descriptions are self-contained (the model reads `input_schema` + `description`
at call time regardless of the system-prompt prose), so registration alone
makes all 5 verbs reachable — naming change orders explicitly in
`ASSISTANT_SYSTEM_READONLY`/its write-tools variant is optional polish, not
load-bearing.

## House idioms copied (source cited per WO_R2_COMMON)

- DDL shape + actual-vs-expected verify style: `scripts/apply-touch-attempts-
  ddl.mjs`.
- Atomic per-job number allocation (`select max → insert max+1` under
  `withUniqueRetry`): `src/lib/estimate-versions.ts`'s `generateEstimateVersion`
  (WO_6 §5).
- Job/lead resolution by id-or-name with an ambiguous-refuses-with-candidates
  shape: `reassignLeadTool` in `src/lib/assistant-tools.ts`.
- Two-phase confirm mechanic, floor pattern, `AssistantTool` shape:
  `src/lib/assistant-appointment-tools.ts` / `src/lib/assistant-contact-
  tools.ts` / `src/lib/assistant-floor.ts`.
- PGlite test harness (setup/teardown, `touchAttempts`-before-`outbox`
  ordering, `fixturePhone()` idiom): `src/lib/assistant-appointment-
  tools.test.ts`.
- "No money column" DB introspection via `getTableColumns` (drizzle-orm):
  no direct precedent found in this repo — new pattern, documented inline in
  `change-orders.test.ts`.
