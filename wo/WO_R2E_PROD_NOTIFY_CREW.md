# WO-R2E — Production-change notifications + crew requests (Sonnet-5, judgment-zero)

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` FIRST. Your staging id: **R2E**.

## THE MISSION
Two gaps from Joseph's own capability dump: *"notify me of production changes"* and
*"crew requests"*. Both have plumbing; neither has the workflow.

## 1. PRODUCTION-CHANGE NOTIFICATIONS
Job stage moves already write `job_stage_events` (read the table + `set_job_stage` in
`src/lib/assistant-production-tools.ts` first — it is the authority on which moves text the
HOMEOWNER; do not change that behavior).
Build `src/lib/production-notify.ts`:
- `notifyProductionChange(db, {jobId, fromStage, toStage, actor})` → posts ONE terse Slack line
  to the ops channel via the house helper: `🏗️ <customer first name> — <from> → <to> (<actor>)`.
- 🔴 **Never include money, full address, or phone** in the line (the alerts-render-the-
  submission-never-the-contact law).
- Wire it at the ONE place a stage actually changes (find it — likely a shared lib both the UI
  route and `set_job_stage` call). If there are two call sites, wire BOTH and say so; if you
  cannot find a single chokepoint, STOP and report rather than scattering calls.
- Subscription control: settings key `production_notify` = `{"enabled":true}`. **Absent =
  ENABLED** (Joseph asked for these; silence-by-default would be the wrong failure). A
  `{"enabled":false}` row silences it. Never throws, never blocks the stage move.

## 2. CREW REQUESTS — `crew_requests`
DDL `scripts/apply-crew-requests-ddl.mjs` (house shape; the verify predicate must PRINT actual
vs expected — two verify scripts cried wolf on correct DDL yesterday):
```sql
DO $$ BEGIN CREATE TYPE crew_request_status AS ENUM ('open','filled','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS crew_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid,
  job_id uuid REFERENCES jobs(id),
  needed_on date,
  crew_size integer,
  trade text,                       -- 'roofing' | 'gutter' | 'framing' | free text
  notes text,
  status crew_request_status NOT NULL DEFAULT 'open',
  filled_by text,
  filled_at timestamptz,
  created_by text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS crew_requests_status_idx ON crew_requests (status);
CREATE INDEX IF NOT EXISTS crew_requests_needed_on_idx ON crew_requests (needed_on);
```
No money column — same law as change orders; note it in the schema comment.

`src/lib/crew-requests.ts`: `createCrewRequest` · `fillCrewRequest(id, filledBy)` ·
`cancelCrewRequest` · `listOpenCrewRequests`. Transitions: `open→filled|cancelled` only;
illegal transition = named refusal, never a throw.

Verbs in `src/lib/assistant-crew-tools.ts`: `create_crew_request` · `fill_crew_request` ·
`cancel_crew_request` · `list_crew_requests` (read-only). Two-phase confirm on writes.
**These are internal-only — the preview says "this is an internal request; no subcontractor is
contacted automatically."** (Sean subcontracts 100%; nothing here may imply we message a crew.)
A create posts the same one-line Slack notice: `👷 Crew needed — <trade> ×<n> — <date> — <job>`.

## TESTS
`src/lib/production-notify.test.ts` — line format has no money/address/phone · absent settings
row = enabled · `{"enabled":false}` silences · a Slack failure does NOT fail the stage move ·
fires once per stage change (not twice) if you wired two call sites.
`src/lib/crew-requests.test.ts` + `src/lib/assistant-crew-tools.test.ts` — transitions ·
illegal transition named refusal · preview writes nothing · preview states nobody is contacted ·
list empty-state discloses its filter · schema has NO money column (assert it).
PGlite harness; **delete `touchAttempts` BEFORE `outbox`**.
