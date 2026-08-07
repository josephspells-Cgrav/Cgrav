# TAKEOFF ARC — PAUSE POINT (OS48, 2026-08-07 ~8:20am ET, Joseph's call)

## ✅ RESUME GATE — ANSWERED 2026-08-07 11:15am. 17 pages IS the complete set (Joseph re-sent the original file, same path/bytes). The vault's 122-page claim was FALSE and is corrected at km-takeoff-tool-idea-2026-08-06. Arc RESUMED via WO_TAKEOFF_T5_SONNET.md.

<details><summary>original gate text</summary>
**"The vault said the Maass plan set is 122 pages; the PDF in Downloads is 17 pages (same
title block, REVISED FINAL 04-30-2024). Does a fuller set exist anywhere, or is 17 the whole
thing?"** — the answer decides whether the pipeline's first real run targets this file or a
bigger one. Do not start the resume moves below until he answers.

</details>

**Everything below is committed + pushed. Resume from THIS file — it is the exact seam.**

## DONE + DURABLE
- Plan v1→v3 + 2 Kimi batons (25+13 findings, all dispositioned, 0 rejects) + 3 WOs + PDF
  probe + truth draft: Gravity `b5d0b4b` + later commits, pushed.
- **All 3 builds integrated by OS48 with own gate re-runs:** CRM `showroom-integration`
  T1 `f84547f` (assembly library, 24 keys, golden fixtures, applyTakeoffRun, PUT token+meta)
  → T3 `09fe4ae` (UI affordances + autosave token retrofit) → T2 `201d0f9` (text-first
  pipeline, CLIs, fixtures) → resilience `87257ce`. Suite at **3348 tests green** (baseline
  3194). All pushed.
- **DEPLOYED: prod `0.1.0+201d0f9`** == HEAD at deploy time (health-verified). Estimating UI
  affordances are LIVE but inert (no takeoff_runs rows exist yet — nothing Sean sees changes
  until a run is applied).
- **Prod DDL applied + read-back verified** (`estimate_line_items.meta`, `takeoff_runs`,
  enum, index). Additive/nullable; inert.
- Vault: [[km-worktree-agent-repo-pinning-2026-08-07]] banked (sandbox-builder protocol).

## THE SEAM (exactly where work stopped)
The **Maass dry run** (`scripts/takeoff-run.mts --dry --resume`) runs text-first perfectly
(sheet map 17/17 correct, area schedule exact) and dies on VISION tiles of the dense
electrical sheet: **max_tokens truncation** — P-SYMBOLS-E tiles p15-r2c1/r2c2/r2c3/r3c3
(and earlier P-WALLS p8-r1c2) return JSON cut mid-array at the 4096 cap, failing every
retry identically. Diagnosis CONFIRMED by pattern (dense tiles only, deterministic).

**NEXT THREE MOVES on resume:**
1. `src/lib/takeoff-vision.ts` — adaptive cap: capture `data.stop_reason`; on parse-failure
   WITH `stop_reason==="max_tokens"`, double `max_tokens` (4096→8192→16384) for that call's
   retries. (~15 lines, the body is built per-call at line ~92.)
2. `scripts/takeoff-run.mts` — my null-guards return null per dead tile but two consumption
   points still need `.filter` (the crash: `dedupeSymbols` at takeoff-extract.ts:1206
   destructures null; walls' `tileOutputs.push(...results)` same class). Filter nulls at
   every `mapConcurrent` result consumption (5 sites).
3. Re-run `--dry --resume` (cache holds all successful tiles — only dead tiles re-bill,
   pennies) → then the REAL run: `--create-contact "Linda Maass" --db-env <pulled .dburl.tmp>`
   → then hand-verify vs tiles → `fixtures/maass-truth.yaml` → `takeoff-validate.mts`
   accuracy table → report w/ per-assembly table.

## OPEN ITEMS CARRIED (from builder reports, none blocking)
- T2 STOPs: `--create-contact` phone = 555-0100-range placeholder (loud in stdout; replace
  with Maass's real number if Sean has it) · truth-yaml schema = OS48's authoring job ·
  ext/int door classification = all-ext-with-flag (point-in-polygon vs the P-WALLS loop is
  the future upgrade).
- `.takeoff-cache/` is LOCAL + gitignored — disposable (rebuild ≈ $1-2). `--resume` uses it.
- The 17-vs-122 page discrepancy: the vault said 122 pages; the file on disk is 17 (probed).
  ASK JOSEPH: does a fuller Maass set exist anywhere?
- Runtime spend so far this arc: roughly $2-4 on sonnet-5 vision calls (cost meter prints
  per run; cap $15/run).

## HOW TO RESUME
Any session: read this file + `PLAN_TAKEOFF_MVP_20260807.md` (V2/V3 + Appendix A only) +
`BUILD_REPORT_T{1,2,3}.md`. The pipeline is `--resume`-able by design. Nothing expires.
