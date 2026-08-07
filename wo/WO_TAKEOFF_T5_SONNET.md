# WO-T5 — Takeoff resume: pipeline fixes → real Maass run → independent truth file → accuracy table

**Sonnet-5 builder, judgment-zero.** Repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app`
(branch `showroom-integration`, ALREADY CONTAINS the whole takeoff pipeline — T1/T2/T3 merged
and deployed).
**BUILD PROTOCOL:** sandbox copy (minus node_modules/.next/.git), `pnpm install` (**pnpm,
never npm**), all work + all gates in the sandbox, stage created/modified files at exact
repo-relative paths into `.../scratchpad/T5_STAGED_DELIVERABLE/` (under
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/`).
Never commit. Never deploy. Never run DDL. Never touch .env files.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.

**READ FIRST, in order:** `wo/TAKEOFF_PAUSE_STATE_20260807.md` (the exact seam) ·
`wo/PLAN_TAKEOFF_MVP_20260807.md` → sections "AMENDMENTS v2", "AMENDMENTS v3", "Appendix A"
ONLY (everything above them is superseded) · `wo/PROBE_TAKEOFF_PDF_20260807.md` ·
`wo/TRUTH_DRAFT_MAASS_20260807.md`.

**⚠️ PARALLEL WORK:** five other builders are editing `src/lib/assistant-*`,
`src/lib/touch-ledger.ts`, `src/lib/agent-loop.ts`, `src/lib/db/schema.ts`. **You touch ONLY
`src/lib/takeoff-*` and `scripts/takeoff-*` and `fixtures/`** — plus `package.json`'s test
hand-list if you add a test. Nothing else, ever.

**RESOLVED (was the open question):** the Maass set is **17 pages — that is the complete
document**, confirmed by the operator re-sending the original file. No larger set exists.
Target PDF: `C:/Users/josep/Downloads/SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf`
(sha256 `38d5eb12926340e2263b78f492499a2fb345b32242b1d24cce4f3c9f1507cc86`).

## PHASE 1 — the two fixes (the run currently dies mid-pipeline)

**1a. Adaptive token cap** — `src/lib/takeoff-vision.ts`. Dense vision tiles (electrical
sheet p15, one walls tile on p8) return JSON truncated at the 4096 `max_tokens` cap; the
parse fails identically on every retry, so retries are wasted. Fix:
- capture `data.stop_reason` from the Anthropic response
- when a parse failure coincides with `stop_reason === "max_tokens"`, RETRY that call with
  `max_tokens` doubled (4096 → 8192 → 16384, capped there), rather than an identical retry
- a parse failure WITHOUT `max_tokens` keeps the existing backoff behavior
- log one line per escalation so the run report shows which tiles needed it
(The retry loop and its existing structure are already in place — the parse-failure branch
joins it, added by a prior fix. Extend, don't rewrite.)

**1b. Null-filters at the tile-result consumption points** — `scripts/takeoff-run.mts`.
`softCallModel` already returns `null` for a tile that fails after retries (flagging it as
`extraction_uncertainty`), but the five `mapConcurrent` consumers still assume non-null and
crash (`dedupeSymbols` destructuring null at `takeoff-extract.ts:1206` is the live symptom).
Filter nulls at EVERY consumption point — P-WALLS, P-HEIGHTS, P-ROOF, P-SYMBOLS-E,
P-SYMBOLS-P — before the results reach `extract*`/`dedupe*`. A dead tile contributes nothing
and is already reported as a flag; it must never crash a 17-page run.

**Gate for phase 1:** `npx tsx scripts/takeoff-run.mts --pdf "<the path above>" --dry --resume`
runs to COMPLETION and prints the human report table. The `.takeoff-cache/` holds ~75 warm
tiles so only previously-dead tiles re-bill (expect roughly $1-3 total). Paste the full
report table into your build report.

## PHASE 2 — the real run (writes to prod)

Once `--dry` completes clean, run it for real:
```
npx tsx scripts/takeoff-run.mts --pdf "<the path above>" \
  --create-contact "Linda Maass" --db-env <ask the orchestrator for the pulled env path> --resume
```
🔴 **You do NOT have the prod DB credential and must not pull one.** Run PHASE 2 only if the
orchestrator has placed a `.dburl.tmp` in your sandbox and told you so. If it is absent:
**STOP phase 2, complete phases 1 and 3, and say so** — the orchestrator runs it.

## PHASE 3 — the INDEPENDENT truth file (the phase that decides whether any accuracy number means anything)

⚖️ **THE INDEPENDENCE LAW — the whole point of this phase.** The truth file must be built
from the PDF ITSELF, **never from the pipeline's own output.** Do NOT open the run's
`paramsJson`, `reportJson`, or generated line items before the truth file is complete. A
truth file derived from the thing it validates measures nothing (this is the circular-fixture
trap the plan's own audit flagged).

Method:
1. Extract the page text layer directly (pdfjs or a small python/pypdf script of your own —
   the probe receipt shows both work) and READ THE RENDERED PAGES YOURSELF as images where
   text is insufficient (windows/doors on p9, symbols on p15/p16, roof geometry on p11).
2. Author `fixtures/maass-truth.yaml` per Appendix A8: per-assembly, per-entity keys in the
   extractor's exact string forms (e.g. `"3060SH": 8`), tolerances (integer counts EXACT;
   areas/LF ±2%), plus a `derived_spotcheck:` block — ONE named room's stud count computed by
   hand, showing the arithmetic, so at least one derived quantity is verified end-to-end.
3. ⚠️ Known trap from the probe receipt: window/door TAG counts differ by text-extraction mode
   (a joined-text regex saw `3060SH ×8`; the positioned-item visitor saw zero standalone
   `3060SH` runs and `3080 ×6`). **Neither text mode is authoritative — count tags by LOOKING
   at page 9's rendered tiles**, and record in the yaml a `source:` note per entity saying how
   you counted it. Where you genuinely cannot resolve a count by eye, write
   `UNVERIFIED: <reason>` rather than a number — an honest hole beats a fabricated truth.
4. Everything you could NOT verify goes in a `## UNVERIFIED` section of your build report with
   the reason.

## PHASE 4 — the accuracy table

Run `npx tsx scripts/takeoff-validate.mts` (it reads the truth yaml + the run's report; use
its `--from-json` path if phase 2 did not run) and paste the full per-assembly table into the
build report. Per the spec: counted vs derived accuracy are reported SEPARATELY and never
blended into one number; a missing required line is an automatic FAIL for that assembly;
extraction_uncertainty flag-share is printed per assembly.

## BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T5.md`
Gate tails verbatim · the phase-1 `--dry` report table in full · whether phase 2 ran and why ·
the truth file's provenance per entity (how you counted it) · the phase-4 accuracy table ·
`## UNVERIFIED` list · STOP questions · every tile that needed a token escalation.
