# WO-TK — make the takeoff tool REACHABLE in the deployed CRM (Joseph: "get everything we have deployed")

**Read FIRST:** `wo/WO_R2_COMMON.md` (all rules apply) with these OVERRIDES:
- Staging root: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/TK_STAGED_DELIVERABLE/` (repo-relative paths, CRM only).
- CRM repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` branch `showroom-integration` @ HEAD `c127add`.
- 🔴 **GATES IN THE FOREGROUND, inline, never backgrounded.**
- Build report: `wo/BUILD_REPORT_TK.md`.

**Context reads (in order):** `wo/BUILD_REPORT_T6.md` (esp. §9 STOPs — Joseph has explicitly
OVERRIDDEN the hand-measurement gate for deploy purposes; deploy ≠ certify accuracy) ·
`wo/BUILD_REPORT_T3.md` (what UI affordances already exist) · `wo/PLAN_TAKEOFF_MVP_20260807.md`
(AMENDMENTS v2/v3 + Appendix A ONLY) · `scripts/takeoff-run.mts` · the existing route dir
`src/app/api/estimate-projects/[id]/takeoff-runs` · `src/components/estimating/takeoff-line-meta.tsx`.

## The bar
Sean/Joseph open the deployed CRM and, within ≤2 clicks from the nav (built-≠-reachable law),
see the takeoff tool: past runs, their counted entities, and the honest accuracy framing.
Ship what EXISTS; do not invent new extraction capability tonight.

## REQUIRED
1. **A Takeoff surface in the CRM UI**, nav-reachable ≤2 clicks:
   - Runs list from `takeoff_runs` (date · plan/PDF name · status · page count · run cost if
     stored · headline counts). Probe the table's real columns first — never assume.
   - Run detail: the counted entities/assemblies (reuse the T3 meta affordances /
     `takeoff-line-meta.tsx` idiom — match the existing estimating UI register, don't invent
     a new one). `extraction_uncertainty` / "— verify" flags must be VISIBLE, never
     rendered as clean values (honest-counts floor).
   - A fixed caveat line on both list + detail, exact copy:
     `Measured accuracy: 7/12 entity classes exact on the reference plan. Verify counts before ordering.`
   - COUNTS ONLY — the takeoff MVP is counts-only (Joseph lock). No pricing, no money columns.
2. **The Maass reference run visible**: whatever run rows exist in prod `takeoff_runs` must
   render correctly in your sandbox against realistic fixture data (test with a seeded copy of
   the real row SHAPE — you have no prod DB access; probe the schema from `src/db`/`src/lib/db`
   schema files and any fixtures in the T-reports).
3. If any takeoff data lives only in files/artifacts and NOT in `takeoff_runs` rows, say so in
   the report (STOP item) — do not fabricate a data path.

## STRETCH (only if mechanically sound inside your gates — do NOT sink the REQUIRED core)
4. Upload + run: PDF upload (Vercel Blob — `BLOB_READ_WRITE_TOKEN` exists in env) creating a
   `queued` takeoff run row, processed by infra that respects Vercel function limits. The
   pipeline is cache/resume-native (`--resume`) — a cron-tick worker advancing a run one slice
   per invocation is the acceptable shape; a single long serverless call is NOT (it will die at
   the platform ceiling). If the honest answer is "runs stay operator-script-triggered tonight,"
   ship the surface with exact copy: `Runs are triggered by the operator for now.` — and say so
   in the report. An honest boundary beats a fake button.

## Gates + report
- `npx tsc --noEmit` · `npm test` · `npm run build` — FOREGROUND, tails verbatim.
- New tests by FULL PATH in the package.json hand-list. PGlite teardown: `touchAttempts`
  before `outbox`.
- `wo/BUILD_REPORT_TK.md`: gate tails · files touched · nav path proof (where the link lives) ·
  which of REQUIRED/STRETCH shipped and the exact boundary · receipts ledger · STOPs.
You never deploy; the orchestrator integrates, re-runs gates, deploys.
