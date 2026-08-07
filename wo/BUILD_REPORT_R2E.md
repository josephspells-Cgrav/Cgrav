# BUILD REPORT — R2E (production-change notifications + crew requests)

Builder: Sonnet-5, judgment-zero. WO: `WO_R2E_PROD_NOTIFY_CREW.md` (+ `WO_R2_COMMON.md`).
Repo copied to an isolated sandbox; all work + all three gates run there. Nothing committed,
nothing deployed, no DDL executed against any database, no `.env*` file edited.

## GATES

- `npx tsc --noEmit` — ✅ PASS (0 errors; run twice — once pre-fix, once post-fix, see below)
- `npm test` — ✅ PASS, **3713 tests / 3713 pass / 0 fail / 1028 suites** (full hand-list, all
  200+ files, including my 3 new ones), duration 680.9s
- `npm run build` — ✅ PASS, exit code 0, full route table generated, no route errors

Gate tails verbatim below (all from the FINAL, post-fix, fresh full runs).

### tsc --noEmit (final run)
```
(no output — clean exit 0)
```

### npm test (final full run — tail)
```
✔ formatAddressLine (5.5957ms)
▶ the Slack alert renders the resolved town
  ✔ puts the town in the house line (2.2779ms)
  ✔ an unknown ZIP still renders the address, minus the town (15.7346ms)
✔ the Slack alert renders the resolved town (18.3344ms)
ℹ tests 3713
ℹ suites 1028
ℹ pass 3713
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 680880.443
TEST EXIT CODE: 0
```

### npm run build (tail)
```
   Collecting build traces ...

Route (app)  … [full route table, 100+ routes, all ○/ƒ, no errors] …
+ First Load JS shared by all                                103 kB
  ├ chunks/2950-cd5fdab368542c59.js                         45.8 kB
  ├ chunks/dafdb436-44ed169584cc7812.js                     54.2 kB
  └ other shared chunks (total)                             2.61 kB

ƒ Middleware                                                 132 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

BUILD EXIT CODE: 0
```
(Two pre-existing, unrelated `⚠ Compiled with warnings` lines about `jose`/`next-auth`'s
Edge-Runtime compatibility appear mid-build — not touched by this WO, not fatal, build proceeds
past them to a clean exit either way.)

## ONE SELF-CAUGHT BUG, FIXED BEFORE FINISHING (recorded, not hidden)

First full-suite run surfaced exactly **1 failing test — my own**, in `production-notify.test.ts`'s
"fires once, not twice" ledger: `slice.match(/deliverProductionNotify/g)` counted **2** occurrences
in the `EGRESS_DELIVERERS` array's source slice, not the expected 1 — because the doc-comment I
wrote directly above the registration line *also* names the function ("...see
deliverProductionNotify's own doc..."), same as every other entry in that array already does for
its own sibling. Fixed the TEST (not the comment) to match on the actual call-site pattern
(`=>\s*deliverProductionNotify\(`) rather than a bare identifier count — the same dedup problem
`sanctioned-crossings.test.ts`'s own `deliverNamesIn` helper already solves for its pinned-list
check over the identical array, via `Set`. Re-ran the isolated file (13/13 pass), then the full
suite fresh end-to-end (see gate tail above) to confirm.

Also self-caught and fixed pre-gate (never shipped): the assistant-tool preview line for
`create_crew_request` originally built its human date via `fmtET(new Date(needed_on + "T00:00:00"))`
— empirically confirmed this silently renders **a day early** on a UTC-TZ server (e.g. "2026-08-15"
→ "Aug 14"). Replaced with `crew-requests.ts`'s `formatNeededOnDate`, which never constructs a
`Date` object for a bare calendar-date string at all (regex-parsed calendar components only).

## 1. PRODUCTION-CHANGE NOTIFICATIONS

**The chokepoint — found, not guessed.** Grepped every caller of `advanceProductionStage` before
touching anything: there are **five** (`src/app/api/jobs/[id]/stage/route.ts`, `set_job_stage` in
`assistant-production-tools.ts`, `runWonProductionIntake`/`financials.ts`/`materials.ts`), but
**exactly one** `emitEvent("job.stage_changed", …)` call across the whole codebase — inside
`advanceProductionStage` itself (`src/lib/production.ts:212`). Every caller funnels through that
one emission by construction, so wiring the notify there covers all of them and can never
double-fire. This is stronger than the WO's own framing (which anticipated at most two call
sites) — I did not need to STOP.

**How it's wired**, matching the codebase's own established fan-out pattern for every other
`job.stage_changed` side effect (`deliverHomeownerUpdate`, `deliverOwnerAlert`,
`deliverPayrollNotification`, `deliverMetaCapi`'s job.stage_changed branch — all in
`src/lib/events.ts`), rather than a bespoke inline call inside `production.ts`:
- New `src/lib/production-notify.ts`: `notifyProductionChange(db, {jobId, fromStage, toStage,
  actor})` — settings-gated, never throws (returns an outcome instead), and a **pure**
  `formatProductionChangeLine` split out for direct testing (no network/DB mocking needed — same
  pure/impure split `slack.ts`/`events.ts` already use).
- New `deliverProductionNotify` in `src/lib/events.ts`, registered in `EGRESS_DELIVERERS` (a real
  Slack human sees this — same classification reasoning as `deliverToSlack`; a demo-org move never
  reaches real Slack, for free, via the existing Ring-1 gate). Uses `safeAfter` (not plain
  `after()`) **deliberately** — unlike this deliverer's stage-restricted siblings, it fires on
  EVERY stage, so without the swallow it would break every pre-existing unit test that calls
  `advanceProductionStage` directly outside a request scope (`production.test.ts`,
  `money-lifecycle.test.ts`, `financials.test.ts`, `materials.test.ts`, …).
- Settings key `production_notify` added to `src/lib/org-settings.ts`'s `SETTINGS_KEYS` +
  `getProductionNotifySetting` (house idiom copied from that file's own `getDepositRule`).
  **Absent row = enabled** (the one deliberately inverted default in that file — every sibling
  ships dormant-until-armed; this one doesn't, because Joseph asked for it directly).
- Updated the pinned architecture test `sanctioned-crossings.test.ts` (EGRESS_DELIVERERS is a
  hand-checked exact set, "the pinned 13" → "the pinned 14") — this is the established,
  intentional gate for exactly this kind of addition, not an incidental edit.

**The law**: line format is `🏗️ <first name> — <from> → <to> (<actor>)` — first name only, ever
(no lastName/phone/address/money reach the formatter at all — it structurally only accepts those
four fields). Pinned directly against the rendered string in `production-notify.test.ts`.

## 2. CREW REQUESTS

- `src/lib/db/schema.ts`: added `crewRequestStatusEnum` + `crewRequests` table (mirrors the WO's
  DDL exactly, using the shared `orgId()`/`idPk()`/`createdAt()`/`updatedAt()` helpers every other
  table in the file uses — the "house shape" the WO asked for) + row-type exports at the file's
  tail. **Appended at the true end of both the table section and the type-export section**,
  deliberately away from `job_change_orders`' block (WO_R2D — already present in this round's
  HEAD, confirming schema.ts is shared this round) to minimize merge collision surface.
- `scripts/apply-crew-requests-ddl.mjs` — **not executed** (hard rule). Verify predicate prints
  EXPECTED vs ACTUAL for every check (table existence, exact column set, exact enum values, exact
  index names, status/created_by nullability+default), always, plus an explicit missing/extra
  diff — never a silent boolean. One check (status/created_by defaults) deliberately uses a
  substring match rather than strict equality on Postgres's exact default-expression rendering,
  since that format can vary with search_path in a way I can't pin without a live connection —
  still prints both sides always, so a real mismatch stays fully legible either way (this is the
  literal fix for the "cried wolf" failure mode named in the WO).
- `src/lib/crew-requests.ts` — `createCrewRequest` / `fillCrewRequest` / `cancelCrewRequest` /
  `listOpenCrewRequests`. Transitions are **open → filled | cancelled ONLY**; both are terminal
  (a filled request cannot be cancelled). Illegal transitions are a named refusal
  (`{ok:false, error:"invalid_transition", message}`), never a throw — same shape as
  `booking-core.ts`'s `cancelAppointment`/`confirmAppointment` (`not_actionable`). The create's
  Slack ping (`👷 Crew needed — <trade> ×<n> — <date> — <job>`) lives **in this file**, not the
  assistant tool layer, so any future caller (a UI form, a script) gets it for free — same
  "one codepath bundles its own side effects" pattern `bookAppointment`/`advanceProductionStage`
  already use.
- `src/lib/assistant-crew-tools.ts` — `create_crew_request` · `fill_crew_request` ·
  `cancel_crew_request` (writes, two-phase confirm) · `list_crew_requests` (read-only). The literal
  line **"This is an internal request; no subcontractor is contacted automatically."** is in every
  write verb's tool `description` AND repeated inside every `needsConfirmation`/confirmed
  `summary` string (side-effect disclosure lives in the preview string, not just the description —
  WO_R2_COMMON's law, applied here even though nothing in this feature reaches a customer or crew).
- **No money column, mechanically enforced three times**: the DDL script's own verify check, a
  unit test asserting `Object.keys(crewRequests)` carries nothing money-shaped, and the schema
  comment itself (mirrors `job_change_orders`' WO_R2D precedent).

## TESTS

- `src/lib/production-notify.test.ts` — 13 tests: line format (money/address/phone absence, null
  fromStage, blank firstName, unknown-stage fallback) · settings gating (absent=enabled,
  `{enabled:true}` explicit, `{enabled:false}` silences) · never-throws (a throwing `db` stub
  resolves cleanly — see note below on why a stub, not a mocked Slack call) · the single-chokepoint
  source ledger (3 tests: emitEvent called once in production.ts, deliverProductionNotify
  registered once in EGRESS_DELIVERERS, no other file calls notifyProductionChange directly).
- `src/lib/crew-requests.test.ts` — 22 tests: line format · schema has no money column · create
  (status always open, blank-trade refusal, unknown-job refusal, org inheritance, optional fields)
  · fill/cancel transitions + illegal-transition refusals (including filled-then-cancel) · list
  (open-only, empty state).
- `src/lib/assistant-crew-tools.test.ts` — 24 tests: registration, floor refusal on a stray
  forbidden field, preview-writes-nothing + preview-states-internal-only for all three write
  verbs, confirmed writes actually land, named refusals surface through the tool layer, list
  empty-state discloses its filter ("OPEN", never a bare "nothing"), list is genuinely read-only.

**Why a throwing-`db` stub instead of mocking `postBriefingToSlack` for the "Slack failure doesn't
block the move" test**: confirmed against this codebase's own precedent
(`money-lifecycle.test.ts`'s header) that a LOCAL TS module's named export is getter-only under
tsx's CJS transform — a plain reassignment (the trick that works for `next/server`'s pre-built
`after`) throws `Cannot set property … which has only a getter`. The throwing-db stub exercises the
exact same single try/catch that also guards the real Slack call, so it's equivalent coverage
without a real network attempt or `postBriefingToSlack`'s own baked-in 5-second retry sleep.

## REGISTRATION

**Do not edit `src/lib/assistant.ts` / `assistant.test.ts` / `assistant-flag.test.ts`** (WO_R2_COMMON)
— honored. Read `allTools()` in full to give the orchestrator an exact, not guessed, wiring:

**(a) Import line to add** (assistant.ts's import block, alongside the other per-domain tool imports):
```ts
import { ASSISTANT_CREW_READ_TOOLS, ASSISTANT_CREW_WRITE_TOOLS } from "@/lib/assistant-crew-tools";
```

**(b)/(c) Branch + read-only status**, verified against the CURRENT `allTools()` (three return
points, two distinct tool-sets):

| Export | What's in it | read-only? | Where to splice |
|---|---|---|---|
| `ASSISTANT_CREW_READ_TOOLS` | `listCrewRequestsTool` (`list_crew_requests`) | **yes** | Spread into **all three** return points — line 110's early return, inside the big `ASSISTANT_WRITES_LIVE==="1"` array (~line 114, alongside `...ASSISTANT_READER_TOOLS`), and line 155's fallback — same treatment as `ASSISTANT_READER_TOOLS`/`queryCrmTool`/`leadHistoryTool`, which appear in all three today. |
| `ASSISTANT_CREW_WRITE_TOOLS` | `createCrewRequestTool`, `fillCrewRequestTool`, `cancelCrewRequestTool` | no | Spread **only** inside the big writes-live array (~line 120, alongside `...ASSISTANT_PRODUCTION_WRITE_TOOLS`/`...ASSISTANT_COMMS_WRITE_TOOLS`). Never in the two read-only-ish branches. |

No changes needed to `assistant-tools.ts` or any other registry file — `assistant-crew-tools.ts` is
a new, self-contained file exporting both arrays already split by read/write, matching
`assistant-tools.ts`'s own two-registries convention.

**`assistant-flag.test.ts` — NOT edited (WO_R2_COMMON), but it WILL need updating when you wire
the above, or it breaks.** Read it in full: it `deepEqual`s `allTools().map(t => t.name)` against
two hand-kept, ORDER-SENSITIVE arrays — `READ_TOOL_NAMES` (ends `..., "lead_history"`) and
`WRITE_TOOL_NAMES` (ends `..., "send_booking_link"`) — line 33's own comment says so explicitly
("ORDER MATTERS"). The 4 names you're adding, in the exact order this file's history establishes
(new WO's tools appended at each array's tail with a dated comment):
- Append `"list_crew_requests"` to the END of `READ_TOOL_NAMES` (after `"lead_history"`) — only
  correct if `ASSISTANT_CREW_READ_TOOLS` is spliced as the LAST read entry in all three `allTools()`
  return points, matching where `leadHistoryTool` sits today. If you splice it anywhere else, this
  array's order must match that instead — the test doesn't care about the array's identity, only
  that it equals `allTools()`'s actual emitted order.
- Append `"create_crew_request"`, `"fill_crew_request"`, `"cancel_crew_request"` (in that order) to
  the END of `WRITE_TOOL_NAMES` (after `"send_booking_link"`) — same caveat: only correct if
  `ASSISTANT_CREW_WRITE_TOOLS` is spliced last in the writes-live array.
- **`assistant.test.ts` — NOT edited, but it WILL actively FAIL once wired, unless updated.**
  (Correcting myself mid-report: I first assumed this file had no hand-kept registry, going only
  off its header comment about a DIFFERENT, untouched suite — then read the whole file and found
  one it clearly does, at `describe("Alex v2 — confirm coverage registry (F1/F13...")`, line ~59.)
  Two things need attention there:
  1. `CONFIRM_REQUIRED` (a hand-kept `Set`, line 62) is checked against **every write tool
     `allTools()` actually returns** (line 128, derived live — not a second hardcoded write list).
     All 3 of my write verbs implement two-phase confirm, so they belong in `CONFIRM_REQUIRED`:
     add `"create_crew_request"`, `"fill_crew_request"`, `"cancel_crew_request"`. Skipping this
     makes the test fail with `"write verb ... is UNCLASSIFIED — file it in the v2 registry before
     shipping it"` the moment the tools are wired — this is that test doing exactly its documented
     job (line 60: "A NEW verb fails this test until someone consciously files it").
  2. **The same test's `readNames` set (line 125-127) is a THIRD hardcoded list** —
     `[...ASSISTANT_TOOLS, ...ASSISTANT_READER_TOOLS, queryCrmTool, leadHistoryTool]` — that does
     NOT include my `ASSISTANT_CREW_READ_TOOLS`. Left as-is, `list_crew_requests` would be
     (wrongly) treated as an unclassified WRITE tool by this test's own filter and fail the same
     way. Add `...ASSISTANT_CREW_READ_TOOLS` to that spread — do NOT "fix" it by adding
     `list_crew_requests` to `NO_CONFIRM_OK` instead; that set is for legitimate write tools that
     skip confirm, not a place to paper over a read tool being misclassified.
  - Separately, `describe("Alex v2 — floor reachability (ARMED ≠ REACHABLE #8)")` (line ~195) checks
    a FOURTH hardcoded list (`[...ASSISTANT_WRITE_TOOLS, ...ASSISTANT_LEAD_WRITE_TOOLS,
    ...ASSISTANT_PRODUCTION_WRITE_TOOLS, ...ASSISTANT_COMMS_WRITE_TOOLS]`) that also omits
    `ASSISTANT_CREW_WRITE_TOOLS` — this one degrades SILENTLY (my tools just aren't checked by it,
    never a failure) since none of my schema fields are floor-forbidden. Not blocking; worth adding
    `...ASSISTANT_CREW_WRITE_TOOLS` there too for complete coverage, orchestrator's call.

## HOUSE IDIOMS COPIED (source named, as required)

- `assistant-floor.ts` — `floorRefusal`/`isConfirmed`/`needsConfirmation`/`writeFailure`/
  `CONFIRM_PROPERTY`/`UUID_RE`/`stringField`/`fullName` — the shared write-tool kit, used as-is.
- `assistant-appointment-tools.ts` — the re-read-after-confirm shape, and the
  `ASSISTANT_APPOINTMENT_TOOLS`-style trailing export array (split here into
  `ASSISTANT_CREW_READ_TOOLS`/`ASSISTANT_CREW_WRITE_TOOLS`, mirroring `assistant-tools.ts`'s own
  two-registry split instead, since one of my four verbs is read-only).
- `assistant-reader-tools.ts` — the empty-state "name the filter, not just nothing" idiom
  (`listDocumentsTool`'s doc comment), applied to `list_crew_requests`'s empty response.
- `events.ts` — the `run*` (exported, directly testable) / `deliver*` (thin `after()`/`safeAfter()`
  wrapper) split, applied identically to `notifyProductionChange`/`deliverProductionNotify`; also
  `safeAfter` itself (reused directly, not re-implemented) and the EGRESS/DB_WRITE Ring-1
  classification comment's own reasoning.
- `booking-core.ts` — the `{ok:false, error, message}` named-refusal shape for illegal
  transitions (`not_actionable`), mirrored as `invalid_transition` for crew-request transitions.
- `org-settings.ts` — the `getSettingValue`/`SETTINGS_KEYS`/`getDepositRule`-shaped accessor
  pattern, extended with `getProductionNotifySetting`.
- `production.ts` — the D5 org-inheritance idiom (`orgId: job.orgId ?? undefined`) and the
  `scope === "demo" ? DEMO_ORG : undefined` fresh-insert stamp (also seen in `contacts/route.ts`,
  `leads/route.ts`, `distributors/route.ts`), both reused in `createCrewRequest`.
- `sanctioned-crossings.test.ts` — the source-text ledger technique (grep a file's own source,
  assert an exact set/count), reused for the "fires once, not twice" proof in
  `production-notify.test.ts`, and for the `sendSms`-style "exactly this file calls X" caller
  census.

## STOP QUESTIONS

**None.** Every design point the WO left open was closed with a documented, reasonable judgment
call (all recorded in the file headers, not just this report) rather than a blocker:
- Every stage change notifies (not a stage subset) — the WO's own framing ("notify me of
  production changes") names no restriction, unlike the pre-existing homeowner/payroll/owner-alert
  deliverers which are each gated to specific stages for a different reason (customer-facing
  spam / money-adjacent).
- `create_crew_request`'s `trade`/`crew_size`/`needed_on` are required at the TOOL schema level
  (DB columns stay nullable, matching the WO's literal DDL) — the Slack line's own literal format
  names all three, so the tool asks for what it needs to produce that line honestly.
- Job label in both Slack lines: first name only for production-notify (the WO says so
  explicitly — the money/address/phone law); full name for the crew line (no such restriction
  stated there, and a full name is more useful for ops disambiguation — same choice
  `deliverPayrollNotification` already makes for its own job label).

## FILES

**New:**
- `src/lib/production-notify.ts`
- `src/lib/production-notify.test.ts`
- `scripts/apply-crew-requests-ddl.mjs`
- `src/lib/crew-requests.ts`
- `src/lib/crew-requests.test.ts`
- `src/lib/assistant-crew-tools.ts`
- `src/lib/assistant-crew-tools.test.ts`

**Modified (additive only in every case):**
- `src/lib/org-settings.ts` — `SETTINGS_KEYS.productionNotify` + `getProductionNotifySetting`.
- `src/lib/events.ts` — `deliverProductionNotify` + its `EGRESS_DELIVERERS` registration.
- `src/lib/sanctioned-crossings.test.ts` — pinned EGRESS_DELIVERERS list updated (13 → 14).
- `src/lib/db/schema.ts` — `crewRequestStatusEnum` + `crewRequests` table + 2 row-type exports,
  appended at the tail of both sections.
- `package.json` — appended my 3 test files to the `test` hand-list (nothing reordered/removed).

Staged at exact repo-relative paths under
`…/scratchpad/R2E_STAGED_DELIVERABLE/`.
