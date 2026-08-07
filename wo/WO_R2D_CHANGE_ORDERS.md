# WO-R2D — Change orders: the missing CRM entity + verbs (Sonnet-5, judgment-zero)

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` FIRST. Your staging id: **R2D**.

## THE MISSION
Joseph listed change orders as an Alex capability. The audit found there is **no change-order
entity in this CRM at all** — the `change_requests` table is the SHOWROOM/KM audit queue
(`schema.ts` ~1922: `kind: hot_edit|config_promotion|code_change`, `sessionId`,
`registryKey`, `transcriptQuote`). **DO NOT TOUCH `change_requests`.** Building on it would
dump real construction change orders into demo machinery.

## 1. THE ENTITY — `job_change_orders`
DDL script `scripts/apply-change-orders-ddl.mjs` (copy the shape of
`scripts/apply-touch-attempts-ddl.mjs`, including a printed read-back verify — and make the
verify predicate print the ACTUAL vs EXPECTED values it compares; two verify scripts cried
wolf on correct DDL yesterday because they compared silently).

```sql
DO $$ BEGIN CREATE TYPE change_order_status AS ENUM ('draft','pending','approved','declined','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS job_change_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid,
  job_id uuid NOT NULL REFERENCES jobs(id),
  number integer NOT NULL,          -- per-job sequence, 1-based
  title text NOT NULL,
  description text,
  status change_order_status NOT NULL DEFAULT 'draft',
  requested_by text,                -- free text: 'homeowner' | 'sean' | 'inspector' | ...
  decided_at timestamptz,
  decided_note text,
  created_by text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS job_change_orders_job_number_uq ON job_change_orders (job_id, number);
CREATE INDEX IF NOT EXISTS job_change_orders_job_id_idx ON job_change_orders (job_id);
CREATE INDEX IF NOT EXISTS job_change_orders_status_idx ON job_change_orders (status);
```
Mirror in `src/lib/db/schema.ts` with the house helpers, near the other job tables. Export
`JobChangeOrder`.

🔴 **NO MONEY FIELD IN V1 — deliberate.** Money is structurally excluded from every agent
(`assertDeclarable`); a `amount_cents` column here would be the first thing an agent verb
could set. Pricing a change order stays a UI/human job until Joseph says otherwise. Put that
sentence in the schema comment so nobody "helpfully" adds it later.
**The per-job `number` is assigned by a single atomic statement** (`SELECT coalesce(max(number),0)+1`
inside the INSERT, or an INSERT..SELECT) — neon-http has no transactions, and the unique index
is what actually arbitrates a race. On 23505, retry once, then report honestly.

## 2. THE LIB — `src/lib/change-orders.ts` (pure-ish; DB in, no network)
`createChangeOrder` · `updateChangeOrder` (title/description/requested_by while `draft|pending`) ·
`decideChangeOrder` (approved|declined + note + decided_at) · `cancelChangeOrder` ·
`listChangeOrders(jobId)`. Status transitions pinned: `draft→pending→approved|declined`,
anything→`cancelled`; an illegal transition returns a named refusal, never throws.

## 3. THE VERBS — `src/lib/assistant-change-order-tools.ts`
`create_change_order` · `update_change_order` · `decide_change_order` · `cancel_change_order` ·
`list_change_orders` (read-only).
- Two-phase confirm on the four writes. These are INTERNAL records — they do NOT text the
  homeowner — and **the preview must say so explicitly** ("this records it in the CRM; nobody
  is contacted"), because the operator's mental model of "change order" involves the customer.
- Resolve the job by id or by customer name; ambiguous → refuse and LIST candidates.
- `list_change_orders` empty-state discloses what it searched (the job).

## 4. SLACK NOTIFY
When a change order is created or decided, post one terse line to the ops channel using the
house Slack helper (`src/lib/slack.ts` — read how briefings post). Format:
`📝 CO #2 — <job/customer> — <title> — <status>`. **Never include money or contact PII.**
If posting fails, it must never fail the write (fire-and-report, awaited, never `void`).

## TESTS — `src/lib/change-orders.test.ts` + `src/lib/assistant-change-order-tools.test.ts`
PGlite harness; **delete `touchAttempts` BEFORE `outbox`**.
per-job numbering starts at 1 and increments · two creates on one job never collide on number ·
illegal transition refused by name · decide sets decided_at + note · cancel from any state ·
update refused once approved · verbs: preview writes nothing, confirm writes · preview states
"nobody is contacted" · ambiguous job refuses and lists · list empty-state names the job ·
schema has NO money column (assert it, so a future edit fails this test).
