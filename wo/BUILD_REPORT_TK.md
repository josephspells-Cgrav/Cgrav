# BUILD REPORT — WO-TK (Takeoff tool reachable in the deployed CRM)

**Builder:** Sonnet-5 (judgment-zero) · **Repo:** `mabrey-crm-app` (branch `showroom-integration`,
built off HEAD `c127add`) · **Sandbox:** copied (minus `node_modules/.next/.git`) to
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/TK_BUILD/mabrey-crm-app/`,
`pnpm install` re-run there, all work + all gates done in that sandbox. Deliverable staged at
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/TK_STAGED_DELIVERABLE/`
(11 files, exact repo-relative paths). Live repo confirmed untouched throughout — see §7.

## 0. TL;DR

- **REQUIRED #1 (Takeoff surface, ≤2 clicks) — SHIPPED.** New "Takeoff" tab on `/estimating`
  (`/estimating?tab=takeoff`): an aggregate runs list across **every** project (not just the one
  you've already clicked into), each row expandable into a run detail that reuses T3's
  `TakeoffRunReportView` (assembly-group report) **plus** a new counted-entities table (every
  derived material-count line, with FlagChip/ConfidenceDot/SourceCite reused verbatim from
  `takeoff-line-meta.tsx`). The exact caveat line renders on both the list and every expanded
  detail.
- **REQUIRED #2 (Maass reference run visible) — SHIPPED as fixture-verified, with a STOP.**
  I found (see §3, the load-bearing finding) that **the real Maass accuracy run has never been
  written to `takeoff_runs` in prod** — every verification run (T5, T6) used `--dry`, which
  never opens a DB connection. I built the board against a **realistic fixture carrying T6's own
  real numbers** (17 pages, $2.7867, real derived-line counts) and unit/render-tested the mapper
  and the UI against it — see §4/§5. Once the orchestrator runs a real (non-`--dry`) pass, the
  same code renders the real row with zero changes.
- **REQUIRED #3 (STOP if data lives only in files) — ANSWERED, see §3.** Yes: it does, today.
- **STRETCH #4 (upload + run) — NOT built; shipped the WO's own named honest boundary instead.**
  Exact copy `Runs are triggered by the operator for now.` renders on the new tab. See §6 for why.
- **Gates: ALL PASS.** `tsc --noEmit` clean (×2, before and after) · full `npm test` (chunked,
  see §5) **3902/3902 pass, 0 fail** (includes one pre-existing census test I updated correctly,
  not weakened — see §5) · `npm run build` clean, all routes compile including `/estimating`.

## 1. The bar, and how it's met

> Sean/Joseph open the deployed CRM and, within ≤2 clicks from the nav, see the takeoff tool:
> past runs, their counted entities, and the honest accuracy framing.

**Click path (proof, exact citations):**
1. Sidebar → **Estimating** — `src/components/nav.tsx`'s `ITEMS` array: `{ href: "/estimating",
   label: "Estimating", icon: Calculator }` (unchanged by me).
2. **Takeoff** tab — `src/lib/estimating-tabs.ts`'s `ESTIMATING_TABS`, new 4th entry: `{ key:
   "takeoff", label: "Takeoff", href: "/estimating?tab=takeoff" }`, rendered by the existing
   `EstimatingTabStrip` (zero changes needed there — it already maps `ESTIMATING_TABS` generically).

Two clicks, nav to surface. `src/app/(app)/estimating/page.tsx` renders
`<TakeoffRunsBoard runs={takeoffBoardRuns} />` when `tab === "takeoff"`.

## 2. What was built, mapped to the WO

**A NEW aggregate surface, distinct from (and additive to) T3's existing per-project panel.**
Before this WO, the only takeoff UI was `ExtractionRunsPanel` inside one project's
`/estimating/[id]` page — you had to already know/click into the right project. There was no
place that answered "what has the takeoff pipeline actually produced, across everything." That's
what REQUIRED #1 is actually asking for, and what I built.

- **Runs list** (`src/components/estimating/takeoff-runs-board.tsx`, `TakeoffRunsBoard`) — every
  org-scoped `takeoff_runs` row across every project (org-scoped directly on `takeoffRuns.orgId`,
  joined to `estimateProjects` only for the display name/link), newest first. Columns exactly as
  named in the WO: date (`fmtET`), plan/PDF name (`sourceFilename`), status (`RunStatusPill`,
  reused from `extraction-runs-panel.tsx`), page count (`reportJson.sheets.length`), run cost if
  stored (`reportJson.costUsd`), headline counts (defined below — the WO didn't pin a shape).
  Project name is a link (`/estimating/<projectId>`) to jump to the full per-project workspace
  where Apply lives.
- **"Headline counts" — defined, since the WO left the shape open:** total derived material-count
  lines + how many carry an honest flag, e.g. `47 lines · 12 flagged`
  (`formatRunHeadline`, `src/lib/takeoff-client.ts`). Both numbers come from
  `deriveTakeoffLines()` — T1's own pure, already-shipped derivation function — called read-only
  against the run's stored `paramsJson`, never re-invented.
- **Run detail** — clicking a row expands into BOTH:
  1. The assembly-group report — `TakeoffRunReportView` (T3's existing component,
     `extraction-runs-panel.tsx`), **reused completely unmodified**: status/lineCount/flagShare
     per Sean's 15 groups, cross-checks ✓/✗, the report-level flags list, cost/tokens footer.
  2. **NEW** — the counted entities: one row per `deriveTakeoffLines()` output line (the exact
     lines an Apply would write), each showing label, division, qty+unit, and — reused literally,
     not re-implemented — `ConfidenceDot`/`FlagChip`/`SourceCite` from
     `src/components/estimating/takeoff-line-meta.tsx` against that line's real `LineMeta`. A
     plain `LineMeta` satisfies `takeoff-line-meta.tsx`'s `StoredLineMeta | null` prop type with
     zero cast (`StoredLineMeta` only *adds* optional fields on top of `LineMeta`).
- **The fixed caveat line, exact copy, both places:**
  `Measured accuracy: 7/12 entity classes exact on the reference plan. Verify counts before ordering.`
  — `TAKEOFF_ACCURACY_CAVEAT` in `src/lib/takeoff-client.ts`, rendered once at the top of the
  board (always visible) and again inside every expanded run's detail (pinned by a source-text
  test asserting exactly 2 call sites — see §5).
- **Counts only.** `TakeoffLine` (the type every rendered entity row is built from) has no cents
  field at all — `{assemblyKey, division, unit, label, quantity, meta, sort}`. There is
  structurally no way for this surface to render a priced dollar figure for a counted item. Run
  **cost** (the Anthropic API spend for the extraction run, e.g. $2.79) is a different thing — an
  ops/telemetry number, not a material price — and is the one dollar figure the WO's own column
  list explicitly asked for ("run cost if stored"); T3's `TakeoffRunReportView` already renders
  this same figure today, so I'm not introducing a new kind of money display.

## 3. REQUIRED #3 — the load-bearing finding (STOP, answered with evidence)

**The Maass accuracy run has never been written to `takeoff_runs` in prod.** It exists only as
local JSON dump files (`--dump-json`) in builders' scratch directories, plus stdout.

Evidence, not assumption:
- `scripts/takeoff-run.mts` — `--dry` never opens a DB connection at all; the S6 write block
  (insert/update `takeoffRuns`, `estimateProjects`, `contacts`) is entirely inside `if (!args.dry)`
  branches (confirmed by reading the file directly, lines ~559-565 and ~1060-1175).
- `wo/BUILD_REPORT_T6.md` §4's own verification command: `npx tsx scripts/takeoff-run.mts --pdf
  "...SS Lake...pdf" --dry --no-cache --dump-json T6_dry_run_dump2.json` — the exact 7/12 = 58.3%
  accuracy figure this WO's caveat line quotes came from a `--dry` run.
- `wo/BUILD_REPORT_T5.md` — its own Phase-1 gate was also `--dry --resume`; §"Phase 4" note
  explicitly names this: "a `--dry` run never serializes `reportJson`/`lines` anywhere (that only
  happens in the S6 write path, which `--dry` skips by design)"; and line 332: **"The orchestrator
  holds the prod DB credential and runs phase 2"** — i.e. the real, DB-writing run is explicitly
  not a builder action.
- `wo/TAKEOFF_PAUSE_STATE_20260807.md` (most recent state before this WO, same day) states it
  outright: **"Estimating UI affordances are LIVE but inert (no takeoff_runs rows exist yet —
  nothing Sean sees changes until a run is applied)."**

I have no prod DB access (per this WO's own text) and can't rule out the orchestrator having run
phase 2 between that note and now — but every piece of evidence I could read points to zero rows.
**I did not fabricate a data path.** The board I built queries `takeoff_runs` for real (§2) — the
moment a real row exists, it renders; today, the honest empty state
(`src/components/estimating/takeoff-runs-board.tsx`'s zero-runs branch: "No extraction runs yet" +
the operator-triggered copy) is what Sean/Joseph will actually see if they open the tab before the
orchestrator runs phase 2.

## 4. REQUIRED #2 — "seeded copy of the real row SHAPE"

Per the WO's own instruction (no prod DB access), I verified the board against realistic fixture
data carrying **T6's real Maass numbers**: 17 pages (`reportJson.sheets.length`), $2.7867 run cost,
582,825 input / 69,213 output tokens — see `src/lib/takeoff-board.test.ts`'s `MAASS_SHAPED_REPORT`
fixture and the describe block `"a Maass-SHAPED reportJson (WO-TK REQUIRED #2, real row numbers)"`.
For the derived-lines side (`paramsJson` → counted entities), I used T1's own proven-complete
FIXTURE-1 (`takeoff-assemblies.test.ts`'s `fixture1()`, copied per this repo's own
"every test file owns its local fixture" convention) and asserted my mapper's
`linesCount`/`flaggedCount`/`lines` match `deriveTakeoffLines()`'s own output exactly — i.e. I'm
testing the WIRING, not re-asserting the already-golden-tested formulas.

## 5. Gates — final status

| Gate | Command | Result |
|---|---|---|
| Types (baseline, before any edit) | `npx tsc --noEmit` | **PASS** — zero output |
| Types (final, after every edit) | `npx tsc --noEmit` | **PASS** — zero output |
| Tests | `npm test` (chunked — see below) | **PASS — 3902/3902, 0 fail** |
| Build | `npm run build` | **PASS** — exit 0, all routes compile (`/estimating` confirmed in
  `.next/server/app/(app)/estimating/page.js`) |

**`npm test`** — the full 195-file suite exceeds a single foreground command's practical window
(same structural gap T3/T6 both hit), chunked into 5 sequential **foreground** runs (each run's
tail read before starting the next — none backgrounded as a fire-and-forget; the one command that
did exceed the harness's own auto-background threshold, `npm run build`, was actively waited on
and its output read in full before any further work, never treated as fire-and-forget):

```
chunk 1/4 (48 files):  tests 1102, pass 1102, fail 0   (89.1s)
chunk 2/4 (48 files):  tests 1044, pass 1044, fail 0   (210.5s)
chunk 3/4 (49 files):  tests  907, pass  907, fail 0   (107.5s, after the fix below)
chunk 4a/2 (24 files): tests  490, pass  490, fail 0   (76.3s)
chunk 4b/2 (24 files): tests  359, pass  359, fail 0   (347.7s)
TOTAL: 3902 tests, 3902 pass, 0 fail
```

**One real, expected regression caught and fixed correctly (not weakened):**
`src/lib/crm-ux-v3-estimating.test.ts` (a pre-existing OS32 v3 test, not mine) hardcodes the tab
census: `assert.deepEqual(ESTIMATING_TABS.map(t => t.key), ["projects","uploads","eagleviews"])`.
Adding "takeoff" broke it on first run — correct behavior for a census test (same discipline as
this repo's `SCOPED_READ_MODULES` census in `demo-scope.ts`: a stale list is the bug, not the
test). Fixed by updating the census to include `"takeoff"` and adding the matching href/label
assertions to the tab-strip render test, plus one new source-text pin
(`"WO-TK: takeoff tab is org-scoped..."`) mirroring that file's own existing per-tab wiring pins
for uploads/eagleviews. Re-ran in isolation (13/13 pass) and then the full chunk (907/907) to
confirm no collateral damage.

3902 vs the 3669 T6 reported — expected: T6 built off an *earlier* HEAD (`4f0b95d3`); my sandbox
is off `c127add`, later in the same round (R2A-R2F, T3 merge, etc. all landed test files since
then — same "the live repo moving, not my sandbox" note T6's own report made about `package.json`
drift). My own additions: 4 (`estimating-tabs.test.ts`) + 13 (`takeoff-board.test.ts`) + 28
(`takeoff-runs-board.test.tsx`) + 4 new cases appended to `takeoff-client.test.ts` + 1 new case in
`crm-ux-v3-estimating.test.ts` = **50 new tests**, all registered by full path in `package.json`'s
`test` hand-list (appended after `assistant-crew-tools.test.ts`, nothing reordered/removed).

**PGlite teardown rule (touchAttempts before outbox):** not applicable — none of my new tests use
the PGlite harness at all (every one is a pure-function or `renderToStaticMarkup` render test, no
DB). Noted rather than silently skipped.

## 6. STRETCH #4 — not built; the honest boundary shipped instead

Evaluated and declined, for a documented reason, not skipped by default:
- Real (non-`--dry`) runs are **orchestrator-only today** — confirmed directly by
  `wo/BUILD_REPORT_T5.md`'s own words ("The orchestrator holds the prod DB credential and runs
  phase 2") and `wo/TAKEOFF_PAUSE_STATE_20260807.md`. There is no existing self-serve trigger path
  to wire a button to.
- The WO's own plan document (D1, `wo/PLAN_TAKEOFF_MVP_20260807.md`) is explicit that a real
  upload-triggered pipeline needs Vercel Blob + a cache/resume-native cron-tick worker (never a
  single long serverless call) — a genuine new piece of infrastructure, not a UI affordance. Bolting
  a half-built trigger onto this WO risked exactly what the WO warned against ("do NOT sink the
  REQUIRED core") for a feature with no operator-side consumer yet.
- Shipped instead: the WO's own named escape hatch, exact copy —
  `Runs are triggered by the operator for now.` (`TAKEOFF_OPERATOR_TRIGGERED_COPY`,
  `src/lib/takeoff-client.ts`) — rendered under the caveat line at the top of the board and in the
  empty state. An honest boundary, not a missing feature disguised as one.

## 7. Sandbox + live-repo isolation — confirmed, not assumed

- `git status --short` on the **live** repo (`C:/Users/josep/Claude Gravity/mabrey-crm-app`):
  empty, before and after this entire session. Never opened for writing.
- Full recursive content diff, `src/` and `scripts/` trees plus every root config file
  (`package.json`, `vercel.json`, `tsconfig.json`, `next.config.ts`, `drizzle.config.ts`) — live vs
  sandbox: **exactly 11 files differ, 0 elsewhere.** `scripts/` (which owns
  `takeoff-run.mts` — never touched) diffed byte-identical (exit 0).
- No DDL run, no `.env`/`.env.local` touched (never opened), never committed, never deployed.

## 8. Files touched (11 — all within the WO's named touch scope)

**New (5):**
- `src/lib/takeoff-board.ts` — `buildTakeoffBoardRun()`, the server-only pure row mapper (DB row +
  project name → `TakeoffBoardRun`). Deliberately kept OUT of `takeoff-client.ts` and imports
  `deriveTakeoffLines` as a real value — see its own header for why (bundle hygiene: keeps T1's
  ~1200-line derivation module out of the client bundle; only `estimating/page.tsx`, a server
  component, imports this file).
- `src/components/estimating/takeoff-runs-board.tsx` — `TakeoffRunsBoard`, `RunRow`, `EntityList`.
- `src/lib/takeoff-board.test.ts` (13 tests), `src/lib/takeoff-runs-board.test.tsx` (28 tests),
  `src/lib/estimating-tabs.test.ts` (4 tests — this pure module had no test file before WO-TK).

**Modified (6):**
- `src/lib/estimating-tabs.ts` — new `"takeoff"` tab entry (+3 lines net).
- `src/lib/takeoff-client.ts` — added `TAKEOFF_ACCURACY_CAVEAT`, `TAKEOFF_OPERATOR_TRIGGERED_COPY`,
  `formatRunHeadline()`, `TakeoffBoardRun` interface, and `TakeoffLine` to the existing type-only
  import from `takeoff-assemblies.ts` (still zero runtime import surface against it — unchanged
  bundle-hygiene property).
- `src/lib/takeoff-client.test.ts` — +4 tests for the above (appended, nothing removed/reordered).
- `src/app/(app)/estimating/page.tsx` — new `takeoffRunRows`/`takeoffBoardRuns` query + mapping
  (org-scoped on `takeoffRuns.orgId`, conditional on `tab === "takeoff"`, mirrors the file's own
  existing `eagleViewRows` pattern) + the render branch.
- `src/lib/crm-ux-v3-estimating.test.ts` — pre-existing census test corrected (§5), one new pin
  added.
- `package.json` — 3 new test files appended to the `test` hand-list.

**Never touched:** `scripts/takeoff-run.mts`, `src/lib/takeoff-assemblies.ts`,
`src/lib/takeoff-apply.ts`, `src/lib/takeoff-extract.ts`, `src/app/api/estimate-projects/**`
(both takeoff-runs routes), `src/components/estimating/extraction-runs-panel.tsx`,
`src/components/estimating/takeoff-line-meta.tsx`, `src/components/estimating/estimating-workspace.tsx`,
`fixtures/maass-truth.yaml`, `src/lib/assistant.ts` and its test files, any `.env*` file.

## 9. `## REGISTRATION`

**N/A.** This WO touches no `assistant.ts`-adjacent surface (no new assistant tool, no MCP
verb). Nothing for the orchestrator to wire into `allTools()`.

## 10. Idiom sources (named, per pattern reused)

- Row/expand shell (div-based rows, not a `<table>`, flex-1 toggle button + a sibling actionable
  element to avoid nesting interactive controls): `extraction-runs-panel.tsx`'s `ExtractionRunsPanel`
  — copied structurally, extended with 4 columns a per-project view doesn't need.
- `RunStatusPill`, `TakeoffRunReportView`: `extraction-runs-panel.tsx`, reused as exported
  components, unmodified.
- `ConfidenceDot`/`FlagChip`/`SourceCite`: `takeoff-line-meta.tsx`, reused as exported components,
  unmodified, called against real `LineMeta` values from a fresh `deriveTakeoffLines()` call.
- Tab collapse pattern (`?tab=`, a pure parser + a presentational strip): `estimating-tabs.ts` /
  `estimating-tab-strip.tsx`, extended (not re-invented) with a 4th entry.
- Test techniques — pure-fn direct assert, `renderToStaticMarkup` + `globalThis.React` binding,
  source-text (grep-ledger) pins for wiring an SSR pass can't exercise: all three named and
  demonstrated in `crm-ux-v3-estimating.test.ts`'s own header / `extraction-runs-panel.test.tsx`'s
  header, followed verbatim.
- FIXTURE-1 (`takeoff-assemblies.test.ts`'s `fixture1()`): copied near-verbatim into
  `takeoff-board.test.ts` per this repo's "every test file owns its own local fixture" convention
  (not exported there, so not imported — same choice `extraction-runs-panel.test.tsx` made with
  its own `FIXTURE_REPORT`).

## 11. STOP questions

1. **(Load-bearing, REQUIRED #3) The Maass accuracy run has never been persisted to
   `takeoff_runs` in prod** — see §3 in full. Not a defect in this build; a state-of-the-world
   fact this WO asked me to surface if true.
2. **The `class: "design_boundary" | "extraction_uncertainty"` distinction (plan V3.3 F7) exists
   on T2's report-level `flags[]` (`takeoff-extract.ts`'s `buildReportFlags`/`FlagClass`,
   confirmed by reading the source) but NOT on T1's per-line `LineMeta` contract**
   (`takeoff-assemblies.ts` — confirmed by reading its exact field list: no `class` field).
   Practical effect: my new counted-entities list (and the pre-existing per-line `FlagChip` in the
   main estimating table) can show "flagged: true + assumption text" but can't visually separate a
   healthy by-design assumption (e.g. `TRUSS_OC_IN`) from a genuine extraction_uncertainty flag at
   the LINE level — only at the report level, where `TakeoffRunReportView` (T3, reused unmodified)
   also doesn't currently branch on `class` (it renders every report-level flag the same way).
   The stated floor — "never rendered as a clean value" — is met (every flagged line is visibly
   marked, nothing fakes certainty); the finer class-aware distinction is a real gap, inherited
   from T1's contract, outside my named touch scope (`takeoff-assemblies.ts` is T1-owned). Worth a
   small follow-up WO if Sean/Joseph want the two flag classes visually separated.
3. **"Headline counts" was left undefined by the WO** — I defined it as `<N lines> · <N flagged>`
   (§2) and documented the choice inline (`formatRunHeadline`'s own header comment). Open to a
   different definition if the orchestrator wants one, but shipped something rather than leaving
   the column blank.
4. **No live dev-server click-through** (beyond `npm run build`'s successful compile of every
   route including `/estimating`) — I have no DB in this sandbox (no `DATABASE_URL`), so booting
   the dev server and hitting the page would only exercise the pre-existing "Database not
   connected" path, not my actual query/render code; the realistic-fixture unit/render tests (§4,
   §5) exercise the real component code against real rendered HTML instead. Flagging the choice
   rather than silently substituting one form of verification for another.
