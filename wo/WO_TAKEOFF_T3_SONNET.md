# WO-T3 — Estimating UI extraction affordances (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch off the post-T1 merge of
`showroom-integration` — T1's schema/routes/lib exist when you start).
**You are a typist for a locked design.** Where this WO is silent, STOP and write the
question into your build report. Contracts A2/A3/A4 in
`C:/Users/josep/Claude Gravity/wo/PLAN_TAKEOFF_MVP_20260807.md` → Appendix A are law.
Read `wo/WO_TAKEOFF_T1_SONNET.md` §3-§4 for the API you consume — you consume it, you never
reimplement or modify it.
**Match the existing estimating component idioms exactly** (`src/components/estimating/`,
`src/app/(app)/estimating/[id]/`) — same styling system, same data-fetch patterns, same
save/autosave plumbing. No new design language. No new deps.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`. Never deploy.

## 1. Client PUT compliance (the F1/F2 client half — T1 changed the route contract)

The estimating takeoff page's autosave PUT must now:
- include each line's `meta` UNCHANGED in the payload (round-trip; the client never edits
  meta except as specified in §2),
- include `baseUpdatedAt` = the project `updatedAt` the client last loaded,
- on 409 `{error:"stale"}`: show the existing toast/notice idiom with text
  `Takeoff changed elsewhere — reloading` and refetch the project + lines (no merge attempt,
  no data invented client-side; unsaved local edits are discarded — the 409 IS the guard).
Update existing client tests accordingly; do not weaken the token requirement.

## 2. Line-row affordances (display-only reads of `meta`, contract A3)

On the takeoff table rows where `meta` exists:
- **Flag chip:** when `meta.flagged` — small warning chip (reuse the app's existing
  badge/chip primitive) before the label; `title` tooltip = `meta.assumption ?? "flagged"`.
- **Confidence dot:** high=green · med=amber · low=red, using the app's existing status-dot
  colors; `title` = `confidence: <value>`.
- **Source cite:** muted text `p.<sourcePages.join(",")>` after the label (e.g. `p.9`);
  when `meta.tile` also exists append `·<tile>`.
- **Unpriced rendering:** when `meta.unpriced` and both cents are 0 → the line-total cell
  renders `—` (em dash), never `$0.00`. Typing any price clears nothing in meta — display
  logic only: once cents > 0 render normally.
- **Waste hint:** the label already carries `(incl N% waste)` from the engine — no extra UI.
- **Hand-edit signal:** when `meta.appliedQty` exists and differs from the current quantity
  value → append muted `was <appliedQty>` after the qty input. (NEVER compare
  `extractedQty` — on waste lines it differs from quantity by design.)
Rows without `meta` (hand lines) render exactly as today — zero visual change.

## 3. Extraction runs panel (project page `/estimating/[id]`)

New section "Extraction runs" (collapsed/empty-quiet when GET returns none), listing runs
newest-first from `GET api/estimate-projects/[id]/takeoff-runs`:
- Row: `sourceFilename` · `model` · `createdAt` (house date format) · status pill
  (`running`=neutral pulse · `complete`=green · `aborted`=red) · `appliedAt` when set
  (`applied <date>`).
- Expanding a `complete` run shows the A2 report: the 15-group assemblies table
  (`group · status · lineCount · flagShare%` — flagShare rendered as % with the row tinted
  when 100%), the crossChecks list (pass ✓ / fail ✗ + detail), the flags list, and a footer
  line `cost $<costUsd> · tokens <in>/<out>/<imageIn>`.
- **Apply button** on `complete` runs (label: `Apply to takeoff`; when `appliedAt` set:
  `Re-apply`): POST `.../takeoff-runs/[runId]/apply` with `{baseUpdatedAt}`.
  - 200 → refetch lines + show `Applied: <inserted.length> new · <updated> updated ·
    <kept> kept`, and when `inserted.length > 0` AND hand lines (meta-less rows) exist,
    list the inserted labels under `New from extraction — check against your hand-added
    lines:` (the duplication eyeball tripwire, V3.1).
  - 409 `{status:"conflict"}` (commit-point loss) → same reload behavior as stale.
  - 409 stale → same reload behavior as §1.
  - 409 handEdited → confirm dialog (house dialog idiom) listing the returned lines
    (`label — qty <current> (extracted <extractedQty>)`), body text
    `These quantities were hand-edited. Re-apply keeps your prices but resets quantities to
    the extraction.` Buttons: `Keep my edits` (cancel) / `Re-apply anyway` (retry with
    `force:true`).
- NO run-creation UI — runs are created by the CLI only in this MVP. Do not build an upload
  or "start extraction" control.

## 4. Tests (register by FULL PATH in package.json's test hand-list)

- Component test for §2 rendering states: flagged chip · confidence dot classes · `—` for
  unpriced-zero · `was <n>` hand-edit signal · meta-less rows unchanged (snapshot or
  assertion style matching the neighboring component tests).
- Client PUT payload test: includes `meta` + `baseUpdatedAt`; 409 triggers refetch path.
- Runs panel test: renders report table from a fixture A2 reportJson (author a MINIMAL
  fixture inline — 2 groups, 1 crossCheck, 1 flag — values arbitrary but schema-exact);
  apply button POSTs token; handEdited 409 → dialog with returned lines.

## 5. Build report — `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T3.md`
Gates output verbatim tails · files touched · STOP questions · named source files for every
idiom you copied.
