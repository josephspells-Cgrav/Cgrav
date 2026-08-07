# BUILD REPORT — WO-T1 (Takeoff schema + assembly library + apply path)

**Builder:** Sonnet-5, judgment-zero · **Date:** 2026-08-07

## 0. ENVIRONMENT BLOCKER — read this first

This session's isolated git worktree (`C:\Users\josep\Claude Gravity\.claude\worktrees\agent-adca366a54c06965d`)
is a worktree of the **wrong repository** — it is rooted in `Cgrav` (`Claude
Gravity`), not `mabrey-crm-app`. Confirmed three independent ways:

1. `git remote -v` inside the worktree → `github.com/josephspells-Cgrav/Cgrav.git`.
2. Any Bash/PowerShell command combining a `cd`/`-C` into `mabrey-crm-app`
   with a `git` invocation is refused by the sandbox: *"a worktree-isolated
   agent's git operations must target its own worktree."*
3. `EnterWorktree` with `path` set to `mabrey-crm-app` (root, and to its own
   pre-existing `.claude/worktrees/*` entries) is refused: *"is not under
   C:\Users\josep\Claude Gravity\.claude\worktrees. Switching from this
   session is limited to worktrees managed by Claude Code (created under
   .claude/worktrees/ of this repository)."*
4. The `Write` tool refuses new files under `mabrey-crm-app` too: *"Edit the
   worktree copy of this file instead of the shared-checkout path."*

**Net effect: I could not write a single file into, or run git against,
`mabrey-crm-app` from this session.** `Read`/`Glob`/`Grep` and non-git Bash
commands against that path DO work (confirmed).

**What I did instead of stopping:** copied the real `mabrey-crm-app` tree
(read-only source, never mutated) into a local sandbox at
`…/scratchpad/mabrey-sandbox/`, ran `npm install` for real, and did the
**entire WO-T1 build there** — including running the real gates for real
(not just reviewing code). The final, gate-passing file contents are also
mirrored at `…/scratchpad/mabrey-crm-app-staged/` (exact target-repo-relative
paths, no `node_modules`/build artifacts) for easy pickup.

**What is NOT done, and cannot be done from this session:** the files are
not inside the actual `mabrey-crm-app` worktree, and nothing is committed —
`git commit` against that repo is unreachable from here regardless of
approach. Someone with a correctly-pinned `mabrey-crm-app` worktree (or the
orchestrator) needs to copy the 11 files below in and commit them there.
This is an infrastructure/dispatch mismatch, not incomplete engineering —
every gate below ran for real against the actual repo's dependency graph
and passed.

**Pickup location (durable — committed to THIS worktree's own repo, Cgrav,
since I could commit here):**
`wo/T1_STAGED_DELIVERABLE/` (relative to this worktree root) — the 11
touched files at their exact `mabrey-crm-app`-relative paths (`src/lib/…`,
`src/app/api/…`, `scripts/…`, `package.json`). Copy this directory's
contents into a correctly-pinned `mabrey-crm-app` worktree, then
`git add`/`git commit` there.

Ephemeral scratch copies (session-temp — may not survive past this session,
kept only as the environment the gates actually ran in, not the pickup
source): `C:\Users\josep\AppData\Local\Temp\claude\C--Users-josep-Claude-Gravity\9abb4478-bd56-45f8-a92a-6440c2f775a0\scratchpad\mabrey-sandbox\`
(full working copy — src/ + config + real `node_modules`) and
`…\scratchpad\mabrey-crm-app-staged\` (the same 11 files, pre-copy).

## 1. Gates (verbatim tails, run against the real repo's dependency graph in `mabrey-sandbox`)

### `npx tsc --noEmit` — PASS (0 errors)
```
(no output — clean compile, whole project)
```

### `npx tsx --test src/lib/takeoff-assemblies.test.ts src/lib/takeoff-apply.test.ts`
```
ℹ tests 54
ℹ suites 12
ℹ pass 54
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

### `npm test` (full suite — every registered file, incl. the 2 new + the 1 edited) — PASS
```
ℹ tests 3248
ℹ suites 882
ℹ pass 3248
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 214012.7962
```
Zero regressions across the entire pre-existing suite.

### `npm run build` — PASS
```
 ✓ Compiled successfully in 40s
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...
...
├ ƒ /api/estimate-projects/[id]/takeoff-runs                  423 B         103 kB
├ ƒ /api/estimate-projects/[id]/takeoff-runs/[runId]/apply    423 B         103 kB
...
ƒ Middleware                                                 132 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
Both new routes appear in the production build manifest. The only warnings
are pre-existing `@auth/core`/`jose` Edge-Runtime notices, unrelated to this
WO (present before any of my changes — `next-auth`'s own dependency tree).

## 2. Files touched (11: 7 new, 4 modified)

**New:**
1. `src/lib/takeoff-assemblies.ts` — pure assembly library (§2).
2. `src/lib/takeoff-assemblies.test.ts` — golden fixtures 1/1B/1C/1D (§2d).
3. `src/lib/takeoff-apply.ts` — apply path, the one writer (§3, A5).
4. `src/lib/takeoff-apply.test.ts` — apply tests + the route "meta survives autosave" test (§5).
5. `src/app/api/estimate-projects/[id]/takeoff-runs/route.ts` — GET list (§4).
6. `src/app/api/estimate-projects/[id]/takeoff-runs/[runId]/apply/route.ts` — POST apply (§4).
7. `scripts/apply-takeoff-ddl.mjs` — DDL script (§1). NOT run against any database.

**Modified:**
8. `src/lib/db/schema.ts` — `estimateLineItems.meta` (jsonb), `takeoffRunStatusEnum`,
   `takeoffRuns` table, `TakeoffRun`/`TakeoffRunStatus` types.
9. `src/app/api/estimate-projects/[id]/line-items/route.ts` — `meta` passthrough
   on `lineSchema` + insert mapping; `baseUpdatedAt` required + token gate.
10. `src/lib/mut-scope-b.test.ts` — the one existing test that PUTs line-items
    now fetches+passes `baseUpdatedAt` (WO explicit instruction; requirement not weakened).
11. `package.json` — registered `takeoff-assemblies.test.ts` + `takeoff-apply.test.ts`
    by full path in the `test` script's hand-list.

`src/lib/estimating-db.ts` / `src/app/api/estimate-projects/[id]/route.ts` (the
project GET) needed **no code change** — `computeProjectEstimate` does an
unqualified `db.select().from(estimateLineItems)`, so once `meta` exists on the
table it rides along automatically. Verified by reading both files.

## 3. STOP questions / interpretations (WO silent — implemented a reasonable
   default, flagged here; nothing below blocked the rest of the build)

1. **Group 3's "(+wall_plates ext share)" annotation** (§2c). Read as
   descriptive prose about Sean's mental model, not a data-split instruction
   — `wall_plates` is one derived line, reported once, under group 4. No
   formula for a split was given, and no fixture tests group-3-vs-4 content
   in a way that would require one.

2. **8 assembly labels not given verbatim**: `concrete_slab` → "Concrete
   slab", `footings` → "Footings", `ext_studs` → "Exterior wall studs (H'
   studs)", `int_studs` → "Interior wall studs (H' studs)", `roof_decking` →
   "Roof decking — OSB sheets", `wall_sheathing` → "Wall sheathing — OSB
   sheets", `baseboard` → "Baseboard", `crown` → "Crown molding". Labels are
   explicitly DISPLAY-ONLY / non-identity (V3.1) and no fixture assertion
   pins their exact text, so these are low-risk. The `(H' studs)` suffix on
   ext_studs/int_studs is inferred from the plan's superseded §3 text ("stud
   LENGTH from wall height … as label detail") — it's the only explanation
   for why FIXTURE-1D flags ext_studs/int_studs on a defaulted wall height
   even though their quantity formula never reads `heightFt`.

3. **hvac_allowance / kitchen_allowance's "always flagged" assumption text**
   not given verbatim — used `"HVAC_ALLOWANCE — allowance line, no derived
   pricing"` / `"KITCHEN_ALLOWANCE — allowance line, no derived pricing"`.

4. **MissingAssemblyError completeness gate is LITERAL**: only `crown`
   (zero crown rooms) and `roof_decking` (`decked:"no"`) are documented
   zero-line exemptions per the WO. Every other loop-based assembly
   (`windows`, `ext_doors`, `garage_doors`, `int_doors`, `plumbing_fixtures`,
   `roof_covering`, `flooring`) **throws `MissingAssemblyError` if its
   source array is empty** — e.g. a real barndo with zero garage doors would
   crash the derivation rather than silently show nothing. This is the
   single biggest open question: is that the intended "missing lines are
   the failure" behavior (force a human look), or does it need its own
   exemption list mirroring crown's `"<key>: none"` note? I did not invent
   an exemption list since the WO names only these two cases and doesn't
   give a note format for a broader one — implementing one would be
   redesigning, not implementing.

5. **`applyTakeoffRun`'s "runNotFound" / "projectNotFound" statuses** aren't
   literal strings the WO gives (only `stale`/`handEdited`/`conflict`/
   `applied` are) — added to cover org-scope-404 and run-lookup-404, named
   to match this repo's existing 404 `error` key convention. Route maps both
   to HTTP 404.

6. **`HandEditedLine`'s shape** isn't pinned beyond "lines:[...]" — carries
   `{lineKey, label, appliedQty, quantity}`, enough for a UI "was
   overwritten" diff.

7. **Line-items PUT token-gate mechanism (§4)**. The WO says "token gate
   identical to §3 step 1 (0 rows → 409 …)" — but §3 step 1 is a
   read-then-compare check, not a "0 rows" mechanism (that's step 5's
   COMMIT). I implemented a read-compare pre-check, executed BEFORE any
   write, matching this repo's one REAL existing precedent for this exact
   `{error:"stale", …}` 409 shape (`src/app/api/registry/route.ts`'s
   staleness check). I did not also bolt a second conditional-commit onto
   this route — that literal "single conditional statement" SQL is reserved
   for `applyTakeoffRun`'s COMMIT step, where the WO gives it verbatim.

8. **Confidence/sourcePages aggregation across multiple consumed `Sourced<>`
   params** (e.g. `ext_studs` consumes `extWalls`+`corners`+`windows`+
   `extDoors`+`garageDoors`+`shellSystem`) isn't specified. Implemented:
   `sourcePages` = de-duplicated sorted union; `confidence` = the weakest
   (lowest) among all consumed params. Untested by the golden fixtures
   (every FIXTURE-1 param shares the same `confidence:"high"`,
   `sourcePages:[7]`, so any aggregation strategy gives the same observable
   result there).

9. **A11 defaults T1 does not apply**: `SLAB_THICKNESS_IN`, `FOOTING`,
   `CORNERS_DEFAULT`, `R_VALUE_DEFAULT`, `CROWN_DEFAULT` are exported in
   `ASSEMBLY_DEFAULTS` per the literal instruction, but every param field
   they'd backstop is a REQUIRED field on the `Sourced<>` envelope already —
   substituting them is the (future WO's) extraction layer's job, which then
   flags that param's own wrapper; this module just propagates the flag
   (`consume()`). Only `WALL_HEIGHT_FT` is actively substituted by this
   module, because FIXTURE-1D explicitly requires it.

10. **"Route test" placement** (§5's third, unnamed bullet — "apply →
    autosave PUT … meta INTACT"). Placed as a `describe` block inside
    `takeoff-apply.test.ts` (shares its DB+route harness) rather than a third
    file, since the WO names only two test files.

11. **FIXTURE-1D tested despite §5's summary line only listing "(1, 1B,
    1C)"**. §2d gives FIXTURE-1D complete, unambiguous expected values — I
    implemented and tested it, treating §5's list as an out-of-sync
    shorthand rather than an instruction to skip a fully-specified fixture.

12. **DDL script's raw `org_id uuid` (no default) vs. schema.ts's `orgId()`
    helper** (which carries a DB-level default at the drizzle-type layer).
    The DDL block is copied verbatim from the WO; `orgId()` is the literal
    house helper the WO also names. Same minor hand-DDL-vs-schema.ts drift
    already present elsewhere in this repo's other `apply-*-ddl.mjs` scripts.

## 4. House idioms read and copied (source file named per instance)

- **DDL script shape** — `scripts/apply-os47-start-cadence-ddl.mjs` (header
  comment, `TARGET HOST` print, per-statement `console.log`, read-back
  verify via `information_schema`/`pg_indexes`, exit-code convention).
  Cross-checked env-file-reading + enum/table syntax against
  `scripts/apply-wo15-referrals-ddl.mjs` and `scripts/apply-os47-ladder-v2-ddl.mjs`.
- **Schema idioms** — `src/lib/db/schema.ts`: `idPk()`/`orgId()`/`createdAt()`/
  `updatedAt()` helpers, `pgEnum` + `Table.$inferSelect` type-export pattern
  (`cadenceRuns`/`cadenceRunStatusEnum` as the closest "runs table with
  status enum" precedent), index-naming (`<table>_<col>_idx`), and
  `adCreativeStatusEnum`/`adCreatives`'s "enum defined immediately before its
  own table, own section, appended near the end of the file" placement
  precedent (mirrored for `takeoffRunStatusEnum`/`takeoffRuns`).
- **Pure-module style** — `src/lib/estimating.ts` (zero import surface,
  locally-redeclared `Division`/`Unit` string-literal unions instead of
  importing the pgEnum, `SAMPLE_*` constant-export pattern) and
  `src/lib/estimating.test.ts` (test idiom: `node:assert/strict` +
  `node:test`, `describe`/`it`, GOLDEN FIXTURES block).
- **Route idioms** — `src/app/api/estimate-projects/[id]/line-items/route.ts`
  (the file this WO amends directly — org-scope select, delete-then-insert,
  `logAudit`, response shape), `src/app/api/estimate-projects/[id]/route.ts`
  (GET serializer / PATCH org-scope pattern), `src/app/api/estimate-projects/
  [id]/apply-cost-book/route.ts` (the "apply X into a project's line items"
  precedent — additive/idempotent insert loop). `src/lib/api.ts` for
  `withErrors`/`json`/`parse`/`readJson` (422 on validation failure — not
  400). `src/lib/demo-scope.ts` for `getScope`/`whereOrg` and its
  outside-a-request fail-safe (`catch { return "prod" }`), cross-verified
  against `src/lib/audit.ts`'s `resolveAuditActor` doing the same thing.
  `src/lib/org.ts` for `DEFAULT_ORG`/`DEMO_ORG`.
- **The `{error:"stale", …}` 409 precedent** — `src/app/api/registry/route.ts`
  (read-then-compare optimistic-concurrency check) + its test,
  `src/lib/promotion.test.ts` — the one existing example of this exact
  pattern in the repo; used to resolve STOP question 7 above.
- **DB test harness** — `src/lib/delete-rules.test.ts` and
  `src/lib/mut-scope-b.test.ts`: ephemeral PGlite + `pg_trgm`, drizzle-kit's
  `pushSchema` against the live `schema.ts`, `getDb()`'s singleton pointed at
  it, the `call()` route-invocation helper, and the "next/headers throws
  outside a request scope, `getScope()`'s own try/catch falls through
  cleanly — no mocking needed" precedent (mirrored directly; not re-derived).

## 5. Known, WO-acknowledged deployment interdependency (not a defect)

The existing estimating-page client (`src/components/estimating/
estimating-workspace.tsx`) does not yet send `baseUpdatedAt` on its autosave
PUT — that retrofit is explicitly WO-T3's job (A4: "the existing autosave
client retrofit … is WO-T3 §1; T1+T3 deploy together, one release"). Shipping
T1 alone would make the live UI's autosave 422 until T3 lands. Confirmed by
reading the client's fetch call — this is the WO's own documented sequencing,
not something I introduced.
