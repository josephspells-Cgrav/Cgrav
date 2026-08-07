# WO-A2 — The universal read, role-enforced (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL (mandatory):** copy the repo (minus node_modules/.next/.git) to your own
sandbox, `pnpm install` there (**pnpm, never npm install**), do ALL work and ALL gates in the
sandbox, then stage every created/modified file at exact repo-relative paths into
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/A2_STAGED_DELIVERABLE/`.
You never commit to the real repo; the orchestrator integrates, re-runs gates, commits, deploys.

**You are a typist for a locked design.** Where this WO is silent → STOP that item, record it
in the build report, continue everything else. Spec of record: the "⭐ FINAL CONSOLIDATED
BUILD SPEC" section of `C:/Users/josep/Claude Gravity/wo/ALEX_VERB_SPACE_20260807.md` (all
sections above it are superseded history).
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.
**NEVER:** deploy · run DDL or GRANT against any database · touch .env files · install new
deps · modify any existing verb's behavior (you ADD a tool; you don't rewrite the others).

## THE MISSION
Alex's read surface covers ~11 of ~46 tables. Anything it cannot see it reports as ABSENT —
that produced a confident false negative to the operator ("nothing has gone out to Ann" while
a text had already sent). This WO gives Alex one hardened read over the whole OPERATIONAL
surface, with a mechanical wall around money, credentials, and demo machinery.

## 1. THE WALL IS A DATABASE ROLE, NOT A STRING CHECK
A regex cannot enforce "SELECT-only": `WITH x AS (DELETE FROM leads RETURNING *) SELECT * FROM x`
is a syntactically valid SELECT, and so are `SELECT set_config(...)` / `SELECT pg_sleep(300)`.
The wall is a **separate Postgres role with SELECT grants on the allowlist only**.

Deliver `scripts/apply-readonly-role.sql` — a SQL FILE (NOT a script that connects; the
orchestrator runs it). Idempotent, commented, and it must:
- `CREATE ROLE alex_reader LOGIN PASSWORD :'pw' NOINHERIT;` (parameterized — the orchestrator
  supplies the password; NEVER hardcode or invent one)
- `REVOKE ALL ON ALL TABLES IN SCHEMA public FROM alex_reader;`
- `GRANT USAGE ON SCHEMA public TO alex_reader;`
- `GRANT SELECT ON <each allowlisted table> TO alex_reader;` — one line per table, from the
  ALLOWLIST below, so a new table is default-DENIED until someone grants it
- `ALTER ROLE alex_reader SET statement_timeout = '8s';`
- `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM alex_reader;`
- a verification block at the end: `SELECT table_name FROM information_schema.role_table_grants
  WHERE grantee='alex_reader' ORDER BY table_name;`

**ALLOWLIST (exactly these, nothing else):** leads · contacts · contact_people · calls ·
appointments · activities · outbox · touch_attempts · cadence_runs · cadences · suppressions ·
documents · jobs · job_tasks · job_stage_events · photos · measurements · material_orders ·
reviews · funnel_events · permits · municipalities · users
**DENIED (never grant, do not mention in tool docs as available):** invoices · payments ·
commissions · price_book · cost_book_items · estimate_* · api_tokens · demo_sessions ·
demo_events · showroom_overrides · beat_runs · narrator_usage · change_requests ·
assistant_turns · audit_log · settings · referrals · distributors · takeoff_runs · ad_* ·
fire_incidents · job_stage_events is ALLOWED (listed above) — everything not in the allowlist
is denied by omission.

## 2. COLUMN DENYLIST (belt on top of the braces)
Even on allowlisted tables these columns must NEVER be returned. Implement as a mechanical
post-query scrub in the tool (redact to the literal string `[redacted]`), keyed by column
NAME, case-insensitive, matching ANY of:
- exact: `password_hash`, `token_hash`, `booking_token`, `public_token`, `referral_token`,
  `api_key`, `secret`, `refresh_token`, `access_token`
- suffix: `_token`, `_hash`, `_secret`
- money (columns on allowed tables): `value_cents`, `amount_cents`, `total_cents`,
  `subtotal_cents`, `markup_cents`, `material_cents`, `labor_cents`, `reward_cents`,
  and any column matching `_cents$` or `price` or `amount`
The scrub runs on RESULT ROWS (so a `SELECT *` is safe) AND the query text is rejected if it
names a denied column explicitly (defense in depth, not the wall).

## 3. THE TOOL — `src/lib/assistant-universal-read.ts`

Register it in `allTools()` (**inside the function, never a module-level array** — house law:
a module-level array literal dereferences at load time and creates import-cycle TDZ crashes).
Name: `query_crm`. Read-only classification (it must appear in `allTools({readOnly:true})`).

Behavior, all FINAL:
- Input: `{ sql: string, limit?: number }`. Default limit 50, hard max 200.
- **Single statement only** — reject if the trimmed SQL contains a `;` other than a trailing
  one. Reject `;`-separated batches with a named error.
- Reject (case-insensitive, whole-word) any of: INSERT UPDATE DELETE DROP ALTER CREATE GRANT
  REVOKE TRUNCATE COPY VACUUM CALL DO SET RESET LOCK NOTIFY LISTEN — **stated in the tool
  description as defense-in-depth, with the real wall named as the role.**
- Connection: a SEPARATE neon client built from `process.env.ALEX_READER_DATABASE_URL`.
  **If that env var is missing → the tool returns a clean refusal** ("read role not
  configured") and NEVER falls back to the app's read-write connection. Ship-dormant is
  correct; a fallback would silently defeat the entire wall.
- Row cap enforced by wrapping: if the SQL has no LIMIT, append `LIMIT <limit+1>`; if it has
  one, leave it and cap the returned array. Fetch limit+1 to DETECT truncation.
- **Every response** (this is the anti-false-negative contract):
  `{ rows: [...], returned: N, truncated: boolean, limitApplied: N, note: string }`
  where `note` on truncation reads exactly:
  `TRUNCATED at <N> rows — this is NOT the full result. Do NOT answer "none"/"nothing" from a truncated read; narrow the query and re-run.`
- Byte cap: if the serialized rows exceed 60_000 chars, drop to the first rows that fit, set
  `truncated: true`, and add `note` text naming the byte cap.
- Fat-column steer: if the query selects from `calls` or `activities` without an explicit
  column list (`SELECT *`), replace with an explicit column list EXCLUDING `transcript`,
  `raw`, `recording_url` and add a note: `bodies omitted — use call_transcript for transcripts`.
  (Implement by detecting `select *` + the table name; if you cannot do this reliably, instead
  redact those three columns in the scrub and note it — pick one, document which in the report.)
- Errors: return the Postgres error message verbatim (truncated 300 chars) — a broken query
  must never read as "no results".

**Tool description (write it to teach the model the honesty contract):** state that this is
read-only over the operational tables, that money/credentials/demo tables are not reachable,
that a `truncated:true` result forbids an absence answer, and that it should prefer the
purpose-built readers (`find_lead`, `list_cadence_runs`, `call_transcript`, …) when one fits —
`query_crm` is for questions no existing reader answers.

## 4. RETROFIT THE HONESTY LAW TO THE EXISTING READERS
Every existing read tool whose empty result could be read as "nothing exists" must disclose
its filters in the empty-state note. Audit these and fix the ones that don't:
`list_leads`, `list_by_stage`, `list_appointments`, `list_cadence_runs`, `recent_calls`,
`list_documents`, `pending_booking_requests`.
Pattern to copy: `recent_calls`' existing window-naming empty note. Do NOT change any filter
behavior — only the empty-state text and (where wrong/missing) the description's window line.
⚠️ `pending_booking_requests`' 24h disclosure may already be fixed by a parallel work order —
if you find it already discloses, leave it and say so in your report.

## 5. TESTS — `src/lib/assistant-universal-read.test.ts` (register by FULL PATH in package.json)
- multi-statement rejected · each banned keyword rejected (table-driven) · a data-modifying
  CTE (`WITH x AS (DELETE …) SELECT …`) rejected by the keyword gate
- missing `ALEX_READER_DATABASE_URL` → clean refusal, and assert NO query was attempted
  (inject a client factory that throws if called)
- truncation: limit+1 rows fetched → `truncated:true`, `returned === limit`, note contains
  "Do NOT answer" · byte cap trips truncation
- column scrub: rows containing `password_hash`, `booking_token`, `value_cents` come back
  `[redacted]` · a query naming a denied column is rejected
- `query_crm` appears in `allTools({readOnly:true})` and in `allTools()`
- a Postgres error is returned as an error, never as an empty result
Plus `src/lib/assistant-read-honesty.test.ts`: each tool from §4 returns an empty-state note
that names its window/filters (assert on the note strings).

## 6. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_A2.md`
Gate tails verbatim · files touched · STOP questions · which fat-column approach you chose
and why · which §4 tools already complied · house idioms copied (name source files).
Do not deploy. Do not run the SQL. Do not create any role.
