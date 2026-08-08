# BUILD REPORT — WO-A2 (The universal read, role-enforced)

**Builder:** Sonnet-5 (judgment-zero) · **Repo:** `mabrey-crm-app` (branch `showroom-integration`,
built off HEAD `87257ce`) · **Sandbox:** copied (minus `node_modules`/`.next`/`.git`; also
excluded `.claude` — see §9) to a scratch dir, `pnpm install`ed there, all work and all gates run
entirely inside it; the real repo was never touched (verified: `git status --porcelain` on every
edited path returns nothing). Deliverable staged at
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/A2_STAGED_DELIVERABLE/`
(10 files, exact repo-relative paths). No SQL was run, no role was created, nothing was deployed.

## 0. Gates — final status

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS — zero output, exit 0 |
| Tests | `npm test` | ✅ PASS — 3407/3407 (59 new: 48 + 11, see §3) |
| Build | `npm run build` | ✅ PASS — exit 0, all routes compile |

Verbatim tails in §8.

## 1. STOP questions (read this section first)

Five items where the WO was silent, or where a higher-level spec conflicts with WO-A2's own
text. Nothing below blocked the rest of the build — everything else shipped.

1. **🔴 Per-Slack-user gating on `query_crm` — NOT implemented, flagging a spec discrepancy.**
   The FINAL CONSOLIDATED BUILD SPEC (§3, "CONFIRM BINDING") says: *"Universal read + debrief +
   place_call gated to JOSEPH's Slack id until Sean's tier is DECIDED."* WO-A2's own §1-§6 —
   the document actually addressed to this build — never mentions per-user gating anywhere; its
   only access-control instruction is "Read-only classification (it must appear in
   `allTools({readOnly:true})`)," which I implemented literally. The existing authz mechanism
   (`slackUserMayWrite`/`SLACK_ASSISTANT_WRITE_USERS`, `assistant-authz.test.ts`) only
   distinguishes read-vs-write for the WHOLE tool set — there is no dimension today for "this
   ONE read tool, only for THIS Slack user." Building one would mean inventing a new
   authorization architecture (a caller-identity parameter threaded through `allTools()`, a new
   env var, `slack-events.ts` changes) with nothing in WO-A2 to type from — exactly the
   "redesign, not implement" trap the WO warns against. **STOPPED. `query_crm` is currently
   reachable by anyone who can reach the read tool set at all** (any Slack caller, allowlisted
   or not — `readOnly` only strips WRITE verbs). If the "Joseph-only until Sean's tier is
   decided" rule is meant to bind now, this needs an explicit follow-up WO.
2. **Org/demo-scope filtering — not implemented, disclosed instead.** Every other read tool
   threads `getScope()`/`whereOrg()` (`src/lib/demo-scope.ts`) through a typed drizzle query
   builder. `query_crm` executes arbitrary SQL TEXT, which cannot be safely rewritten to inject
   `AND org_id = …` without a real SQL parser (joins/aliases/subqueries all break a textual
   append, and a wrong rewrite is worse than none). WO-A2 §1-§6 never mentions org-scope for
   this tool. A broad `query_crm` read can mix demo-fixture rows in with real prod rows. Disclosed
   directly in the tool's own description (last sentence) so the model doesn't oversell
   prod-only precision; no code attempts the filter.
3. **The two allowlists disagree — I followed WO-A2's own §1, not the higher-level bullet.**
   WO-A2 §1 states its allowlist as *"exactly these, nothing else"*: `leads, contacts,
   contact_people, calls, appointments, activities, outbox, touch_attempts, cadence_runs,
   cadences, suppressions, documents, jobs, job_tasks, job_stage_events, photos, measurements,
   material_orders, reviews, funnel_events, permits, municipalities, users` (23 tables). The
   FINAL CONSOLIDATED BUILD SPEC's own §1 bullet lists a DIFFERENT set — it has
   `settings(non-secret keys)` and `referrals(-money cols)` in place of `touch_attempts,
   permits, municipalities, users`. I implemented WO-A2's own itemized list (it is the specific,
   execution-ready instruction addressed directly to this build; the higher-level bullet reads
   like an earlier draft the WO's own author already reconciled). `scripts/apply-readonly-role.sql`
   and the tool's `ALLOWLISTED_TABLES`/description both use WO-A2's 23-table list. Flagging so a
   human can confirm this was the right call — swapping to the other list is a small, mechanical
   follow-up if not.
4. **`touch_attempts` doesn't exist in this sandbox snapshot.** Confirmed by grep — no
   `touch_attempts`/`touchAttempts` anywhere in `src/lib/db/schema.ts` or elsewhere. It is
   presumably being added by the PARALLEL work order (the "§0 THE ATTEMPT LEDGER" table, and
   that WO is explicitly touching `src/lib/db/schema.ts`). `scripts/apply-readonly-role.sql`
   still grants it (WO-A2's allowlist names it explicitly) — psql's default is
   `ON_ERROR_STOP=off`, so if that migration hasn't landed when this SQL runs, that ONE line
   errors and prints a warning, but every other grant, the statement_timeout, the default
   privileges, and the verification query still complete. Re-running the script (it's
   idempotent) after the migration lands picks up that grant. Documented at length in the SQL
   file's header.
5. **`pending_booking_requests` still does NOT disclose its 24h window** as of this sandbox
   snapshot — confirmed by reading it: description says *"Each one was told they'd get a text
   back"* with no window mention, and the empty note is *"Nobody is waiting on a booking
   confirmation."*, also no window mention. Per my instructions this function belongs to the
   parallel WO (also touching `reassign_lead` and `find_contact_id`) — left untouched, and
   `assistant-read-honesty.test.ts`'s own header explains why it's the one §4 tool with no test
   in this deliverable (a passing test here would either be false-green against unfixed code, or
   require editing a function outside this WO's footprint).

**Integration caveat (not a STOP, but load-bearing for whoever merges this):**
`src/lib/assistant-tools.ts` and `src/lib/assistant-reader-tools.ts` are staged as FULL-FILE
snapshots off HEAD `87257ce` — i.e. BEFORE the parallel WO's own edits to `reassign_lead`/
`pending_booking_requests` (in the former) and `find_contact_id` (in the latter) exist. My edits
to each file are surgical (one function's empty-state note apiece — `list_leads` and
`list_documents`), but a naive whole-file overwrite in either direction when integrating both
WOs will silently drop the other WO's changes. The orchestrator needs to MERGE these two files,
not copy one over the other.

## 2. Files touched (10)

**New (4):**
- `src/lib/assistant-universal-read.ts` — the `query_crm` tool (WO §3) + the pure helpers
  (`hasMultipleStatements`, `findBannedKeyword`, `isDeniedColumn`, `findDeniedColumnInText`,
  `isFatColumn`) exported for direct unit testing.
- `src/lib/assistant-universal-read.test.ts` — 48 tests (WO §5).
- `src/lib/assistant-read-honesty.test.ts` — 11 tests (WO §5, the §4 retrofit's own suite).
- `scripts/apply-readonly-role.sql` — the role SQL file (WO §1). NOT run.

**Modified (6):**
- `src/lib/assistant.ts` — `queryCrmTool` imported and registered directly inside `allTools()`
  (never a module-level array — house law, honored even though this specific file has no
  cycle back to `assistant-universal-read.ts`), present in all three return branches so it
  ships to `readOnly:true` callers and both write-flag states.
- `src/lib/assistant-tools.ts` — `list_leads`'s empty-state note only (WO §4). Nothing else in
  this file changed; `reassign_lead`/`pending_booking_requests` untouched per instructions.
- `src/lib/assistant-reader-tools.ts` — `list_documents`'s empty-state note only (WO §4).
  `find_contact_id` untouched per instructions.
- `src/lib/assistant.test.ts` — one `readNames` computation (in the "confirm coverage registry"
  test) now includes `queryCrmTool`; without this, the test would misclassify the new read tool
  as an unclassified WRITE verb and fail. No other change.
- `src/lib/assistant-flag.test.ts` — `"query_crm"` appended to `READ_TOOL_NAMES` (this file
  `deepEqual`s the full `allTools()` output — an exhaustive, hand-maintained pin that is SUPPOSED
  to grow with the registry, per its own header/history comments). Also corrected the "all 27
  names" test title, which was already stale at 28 before this WO (13 reads + 15 writes) — now
  29 (14 + 15). The assertion itself (`deepEqual` against the two arrays) is the real pin; the
  title was cosmetic drift either way.
- `package.json` — the two new test files appended by full path to the `"test"` hand-list, after
  `takeoff-extract.test.ts`.

## 3. What was built, mapped to the WO

**§1 — the role SQL file.** `scripts/apply-readonly-role.sql`: idempotent (guarded `CREATE ROLE`
+ unconditional `ALTER ROLE … PASSWORD :'pw'` so re-running rotates the password safely),
`REVOKE ALL` → `GRANT USAGE` → 23 one-line `GRANT SELECT` statements (WO-A2's own allowlist —
see STOP #3) → `statement_timeout = '8s'` → `ALTER DEFAULT PRIVILEGES … REVOKE ALL` → the
verification `SELECT` against `information_schema.role_table_grants`. Never executed — the WO's
own rule ("Do not run the SQL. Do not create any role") and the sandbox protocol both forbid it.

**§2 — column denylist.** Implemented as `isDeniedColumn()` (exact-name set + `_token`/`_hash`/
`_secret` suffixes + `_cents$`/`price`/`amount` patterns) used TWICE: (a) as a mechanical
post-query scrub over every result row (`scrubRow()`, redacts to the literal string
`"[redacted]"`, keyed by column name case-insensitively — so a `SELECT *` is safe), and (b) as a
pre-query text reject (`findDeniedColumnInText()`, tokenizes the SQL into identifier-shaped
words rather than a blunt substring search, so a denied-but-irrelevant word fragment can't
false-positive). Verified against the REAL schema, not just the WO's named examples —
`users.password_hash`, `leads.booking_token`, `contacts.referral_token`, `jobs.value_cents`,
`reviews.reward_cents`, `photos`/`permits.public_token`, and — not named in the WO at all, only
caught by the general `_cents$` suffix rule — `municipalities.typical_cost_cents` and
`permits.cost_cents`. All confirmed real columns on ALLOWED tables by reading
`src/lib/db/schema.ts` directly (grep excerpt in the tool file's header comment).

**§3 — the tool.** `query_crm`, registered read-only, all WO behaviors implemented literально:
single-statement check (permits exactly one trailing `;`), the 18-keyword whole-word ban
(table-driven, deliberately does NOT catch `SELECT set_config(...)`/`SELECT pg_sleep(300)` — the
WO's own example of why a string check can't be the wall), the separate
`ALEX_READER_DATABASE_URL` connection with a ship-dormant clean refusal (note text is the exact
quoted phrase `"read role not configured"`) that NEVER attempts a query when the var is missing
— proved in tests by injecting a factory that throws if called (see §5 test design). Row cap:
appends `LIMIT <n+1>` when the query has none, leaves an existing `LIMIT` alone and caps the
JS-side array instead; byte cap at 60,000 chars, drops rows from the end until it fits. The exact
required truncation sentence (`TRUNCATED at <N> rows — … Do NOT answer "none"/"nothing" …`) is
always a verbatim prefix of the note even when the byte cap or the fat-column note also fires —
WO §5 phrases its test as "note CONTAINS," not "equals," so composing is safe. Errors return the
Postgres message verbatim (truncated to 300 chars) inside a `note` that starts `"QUERY ERROR (not
zero results) — …"`, plus an `error` field — `rows: []` alone would read exactly like "nothing
exists," which is the one failure mode this whole WO exists to kill.

One extra, not asked for but free: `neon(url, { readOnly: true })` — wraps every query in a
Postgres `READ ONLY` transaction, a belt on top of the role's own SELECT-only grants (see design
note in §6).

**§4 — the retrofit.** Audited all 7 named tools by reading their current source:

| Tool | File | Status |
|---|---|---|
| `list_leads` | assistant-tools.ts | **FIXED** — empty note didn't disclose the won/contract exclusion the description already promised |
| `list_documents` | assistant-reader-tools.ts | **FIXED** — empty note said "for that," never which lead/job id was actually searched |
| `list_by_stage` | assistant-tools.ts | Already compliant — the stage IS the filter, named in the note (`No jobs currently at "production".`); overdue branch already names the 30-day threshold |
| `list_appointments` | assistant-tools.ts | Already compliant — `Nothing booked in the next ${days} days.` |
| `list_cadence_runs` | assistant-reader-tools.ts | Already compliant — `No ACTIVE ladders — nothing automated is scheduled to contact them.` explicitly names the active-only filter |
| `recent_calls` | assistant-tools.ts | Already compliant — THE pattern the WO names as the one to copy |
| `pending_booking_requests` | assistant-tools.ts | **NOT fixed** — parallel-WO territory, see STOP #5 |

Filter behavior was never touched on any of the 7 — only note text (and, where actually missing,
verified the description already carried the window/filter language; none needed a description
fix).

## 4. Fat-column approach chosen, and why

WO §3 offers an explicit either/or for `calls`/`activities`' `transcript`/`raw`/`recording_url`:
rewrite `SELECT *` into an explicit column list, OR redact the three columns in the scrub. I
chose **redact in the scrub** — folded `transcript`/`raw`/`recording_url` into the exact same
`scrubRow()` mechanism as the money/credential denylist (own `isFatColumn()` predicate, same
`"[redacted]"` treatment, adds the note `"bodies omitted — use call_transcript for
transcripts"`).

Reasoning: rewriting `SELECT * FROM calls` into an explicit column list is only reliable for the
single-table, no-join, no-alias, no-subquery case. The moment a query joins `calls` to
`contacts` (a completely normal thing to ask for — "show me the last 5 calls with the caller's
name"), or aliases the table, or wraps it in a CTE, a textual rewrite needs a real SQL parser to
stay correct — exactly the class of fragility this WO's own §1 preamble warns about for a
DIFFERENT reason (why the wall can't be a regex). The scrub approach has no such edge case: it
inspects RESULT ROWS by column name, so it's correct regardless of how the query was shaped, and
it reuses infrastructure that already exists and is already tested for the money/credential
case. Same trade the WO itself makes for the actual wall (role > regex) applied one layer up.

## 5. Test design notes

- The single most load-bearing test is `"returns a clean refusal and NEVER attempts a query
  (factory throws if called)"` — it deletes `ALEX_READER_DATABASE_URL` and injects a reader
  factory that throws unconditionally. Since the code checks the env var BEFORE ever calling the
  factory, the throwing factory never fires and the test passes; if a future edit reordered that
  check, the factory would throw INSIDE the tool call, `run()` would reject, and the test would
  fail loud (not silently pass) — that's the actual proof, not just an assertion on the response
  shape.
- Banned-keyword tests are table-driven OVER THE EXPORTED `BANNED_KEYWORDS` ARRAY (imported from
  the tool file, never hand-retyped) — this repo has a standing law about a hardcoded list beside
  a growing set rotting by default (`assistant-reachability.test.ts`'s own `needsSupplier()`
  comment names it explicitly); a keyword added to the tool later is automatically covered here
  with zero test-file edits.
- `assistant-read-honesty.test.ts` uses a PGlite fixture left completely EMPTY (no rows inserted
  anywhere) — every empty-state note fires for free against a freshly-pushed schema, so there was
  no need for `assistant-start-cadence.test.ts`-style fixture builders (`makeLead()` etc.).

## 6. Design notes (not STOPs — the WO specified the WHAT; these are HOW calls)

1. **`readOnly:true` on the `neon()` client construction.** Not asked for; free defense-in-depth.
   Neon's HTTP driver runs every non-transaction `.query()` call in an implicit server-side
   transaction, and `neon(url, {readOnly:true})` makes that transaction `READ ONLY` — so even if
   the role's own grants were ever misconfigured, Postgres itself refuses a data-modifying
   statement at the session level. Costs nothing, changes no observable behavior for a real
   SELECT.
2. **LIMIT-append vs. a trailing SQL comment.** If a model writes
   `SELECT * FROM leads -- pull everyone` and the tool appends ` LIMIT 51`, the appended LIMIT
   lands INSIDE the line comment and is a no-op at the database. Not fixed — the row-cap JS-side
   slice (`rows.length > limit → slice + truncated:true`), the byte cap, and the role's own 8s
   `statement_timeout` all still bound the outcome safely even in this case (worst case: a slower
   query that still gets correctly capped/truncated in the response, or times out cleanly into
   the existing error path). A real comment-aware SQL tokenizer to close this felt like solving a
   problem the layered caps already solve, at the cost of a NEW way to get comment/string-literal
   parsing wrong.
3. **Multi-statement and keyword checks are naive string heuristics** — a `;` or a keyword
   inside a string literal (e.g. `WHERE notes ILIKE '%please delete%'`) will false-positive
   reject. This fails CLOSED (annoying, never unsafe), and the WO is explicit that these checks
   are "defense-in-depth, not the wall," so I didn't add string-literal-aware parsing.
4. **`ALLOWLISTED_TABLES` is exported** from the tool file and used to build both the
   description text and (indirectly, by manual cross-check) the SQL file's grant list, so the
   two can't silently drift apart from each other without also being visible in one file's diff.
   Not independently enforced by a test that reads the `.sql` file's text (no SQL-file test
   harness exists in this repo) — a human/CI check that the two lists match is still worth
   having; flagging as a cheap follow-up, not doing it here since it's outside WO-A2's stated
   deliverables.

## 7. House idioms copied (named, per file)

- Tool contract shape (`{name, description, input_schema, execute}`), `stringField()`,
  defensive-never-throws `execute()` bodies: `src/lib/assistant-floor.ts` (the leaf import, zero
  runtime deps, exactly as its own header prescribes for any new tool file).
- Single-tool-const-registered-directly-in-`allTools()` pattern (vs. a module-level array): copied
  from `startCadenceTool`/`sendTextTool` in `src/lib/assistant-start-cadence.ts` /
  `src/lib/assistant-send-text.ts`, and the comment explaining why lives in
  `src/lib/assistant-comms-tools.ts` (~line 442) — reused near-verbatim in `assistant.ts`.
- Neon serverless client construction (`neon(url)`, `drizzle-orm/neon-http`): `src/lib/db/index.ts`'s
  `getDb()` — but `query_crm` deliberately does NOT use `getDb()` or its `Db`/schema-typed
  wrapper at all, since it needs a raw `.query(text)` executor against a SEPARATE role/URL, not a
  drizzle-schema-bound connection.
- Empty-state window-naming note pattern (WO's own "pattern to copy"): `recent_calls` in
  `src/lib/assistant-tools.ts`.
- Env-var-gated "ship dormant, clean refusal, never a fallback" seam: `src/lib/geocode.ts`'s doc
  comment and `isAssistantConfigured()` in `src/lib/assistant.ts`, both cited directly in this
  tool's own header comment.
- PGlite + `drizzle-kit/api`'s `pushSchema` + `before`/`after`/`afterEach` test harness:
  `src/lib/assistant-start-cadence.test.ts`, copied structurally for
  `assistant-read-honesty.test.ts` (no fixture-builder helpers needed — empty-state-only, see §5).
- Env-var save/restore-in-`afterEach` pattern: `src/lib/assistant-flag.test.ts`'s
  `savedFlag`/`setFlag()`, mirrored for `ALEX_READER_DATABASE_URL` in
  `assistant-universal-read.test.ts`.
- House DDL-script commenting conventions (double-quoted identifiers, a header explaining WHY
  before the WHAT, "verify by reading it back, never by trusting the statements above blindly"):
  `scripts/apply-os47-start-cadence-ddl.mjs`, adapted to plain SQL since this WO's deliverable is
  a `.sql` file, not a connecting script.

## 8. Gate output — verbatim tails

### `npx tsc --noEmit`
```
(zero output — clean, exit 0)
```

### `npm test` (final run)
```
  ✔ resolves the towns the book actually holds (2.1005ms)
  ✔ accepts ZIP+4 and stray whitespace, because real data carries both (1.3148ms)
  ✔ returns null rather than guessing (0.5316ms)
  ✔ omits 27611 on purpose — the book's single row for it is a typo (0.3209ms)
  ✔ holds no blank or whitespace-only town (0.9889ms)
✔ townForZip (7.9829ms)
▶ formatAddressLine
  ✔ renders street, town, ZIP (25.0246ms)
  ✔ UNKNOWN ZIP falls back to the exact line it rendered before (0.349ms)
  ✔ degrades through every partial shape (0.4882ms)
  ✔ trims, so a stray space cannot produce a dangling comma (0.3527ms)
✔ formatAddressLine (26.8ms)
▶ the Slack alert renders the resolved town
  ✔ puts the town in the house line (1.6429ms)
  ✔ an unknown ZIP still renders the address, minus the town (0.8785ms)
✔ the Slack alert renders the resolved town (2.7807ms)
ℹ tests 3407
ℹ suites 931
ℹ pass 3407
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 307053.5852
EXIT=0
```
3348 pre-A2 (prior commit's own count, `87257ce`'s message) + 59 new (48 + 11, §3 file list) =
3407. Every new-file suite individually confirmed clean in the run (see excerpt below) —
`query_crm`'s 48 span single-statement/keyword/env-var/row-cap/byte-cap/scrub/error/registration/
defensive-input; `assistant-read-honesty`'s 11 span the six audited tools:

```
▶ read-honesty — list_leads (FIXED)
  ✔ empty-state note discloses the won/contract exclusion the description promises
✔ read-honesty — list_leads (FIXED)
▶ read-honesty — list_documents (FIXED)
  ✔ empty-state note names WHICH lead was searched
  ✔ empty-state note names WHICH job was searched
✔ read-honesty — list_documents (FIXED)
▶ read-honesty — list_by_stage (already compliant)
  ✔ empty-state note names the exact stage queried
  ✔ empty-state note for 'overdue' names the 30-day threshold
✔ read-honesty — list_by_stage (already compliant)
▶ read-honesty — list_appointments (already compliant)
  ✔ empty-state note names the day window (default 14)
  ✔ a custom days_ahead is echoed in the empty-state note too
✔ read-honesty — list_appointments (already compliant)
▶ read-honesty — list_cadence_runs (already compliant)
  ✔ empty-state note discloses the ACTIVE-only filter, not a blanket 'nothing'
  ✔ include_finished:true names it as 'on record' rather than repeating ACTIVE
✔ read-honesty — list_cadence_runs (already compliant)
▶ read-honesty — recent_calls (already compliant — THE pattern to copy)
  ✔ empty-state note names the hours-back window
  ✔ a custom hours_back is echoed in the empty-state note too
✔ read-honesty — recent_calls (already compliant — THE pattern to copy)
...
▶ query_crm — single statement only (4 tests) ✔
▶ query_crm — banned keywords (table-driven, defense-in-depth) (21 tests, incl. the CTE + the
  false-positive-avoidance check + the fires-before-client-built check) ✔
▶ query_crm — missing ALEX_READER_DATABASE_URL (2 tests) ✔
▶ query_crm — row cap truncation (6 tests) ✔
▶ query_crm — byte cap truncation (2 tests) ✔
▶ query_crm — column scrub (4 tests) ✔
▶ query_crm — a broken query is an ERROR, never a silent empty result (2 tests) ✔
▶ query_crm — registration (5 tests) ✔
▶ query_crm — defensive input handling (2 tests) ✔
```

### `npm run build`
```
> mabrey-crm@0.1.0 build
> next build

   ▲ Next.js 15.5.20
   - Environments: .env.local, .env

   Creating an optimized production build ...
 ⚠ Compiled with warnings in 11.0s

./node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/deflate.js
A Node.js API is used (CompressionStream at line: 10) which is not supported in the Edge Runtime.
[... @auth/core / next-auth import trace, DecompressionStream likewise ...]

 ✓ Compiled successfully in 2.7min
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
   Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...
[... full route table, all ƒ/○ routes present, nothing missing ...]
+ First Load JS shared by all                                103 kB
ƒ Middleware                                                 132 kB
EXIT=0
```
The `jose`/`@auth/core` `CompressionStream`/`DecompressionStream` Edge Runtime warning is
pre-existing `node_modules` noise — the identical warning is called out in `BUILD_REPORT_T3.md`
(§7) as unrelated to that WO too; reproduces on a clean checkout regardless of this WO's changes.
No new warnings, no new routes, no route removed.

## 9. One deliberate protocol deviation

The WO says "copy the repo (minus node_modules/.next/.git)." This repo also has a
`.claude/worktrees/` directory containing three full nested git worktrees (`agent-a2da62f7bf18e9910`,
`agent-a6e00fd6654f7ba68`, `unruffled-lovelace-f2a2b4`), each a complete checkout that could carry
its own `node_modules`/`.next` — copying them would have been slow and pointless (an initial `du`
scan across them didn't finish in 2 minutes). Excluded the whole `.claude` directory instead
(settings/hooks/worktrees — none of it is read by `tsc`/`npm test`/`npm run build`). Noting this
explicitly since it's a literal deviation from the WO's exact exclusion list, even though it's
clearly within its intent.
