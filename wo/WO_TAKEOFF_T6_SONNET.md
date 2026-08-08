# WO-T6 — Takeoff accuracy: the cache-collapse bug + two overcount defects (Sonnet-5, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
**BUILD PROTOCOL:** sandbox copy (minus node_modules/.next/.git), `pnpm install` (**pnpm,
never npm**), all work + all gates in the sandbox, stage created/modified files at exact
repo-relative paths into `.../scratchpad/T6_STAGED_DELIVERABLE/` (under
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/`).
Never commit. Never deploy. Never run DDL. Never touch .env.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`.

**⚠️ PARALLEL WORK — four other builders are in this repo.** You touch ONLY
`src/lib/takeoff-extract.ts`, `scripts/takeoff-run.mts`, `fixtures/maass-truth.yaml`, and
your own tests + `package.json`'s test list. **Never** `src/lib/assistant-*`,
`src/lib/booking-*`, `src/lib/scheduling.ts`, `src/lib/db/schema.ts`, `src/lib/cadence.ts`.

**READ FIRST:** `wo/BUILD_REPORT_T5.md` (the run that found these) · `wo/PLAN_TAKEOFF_MVP_20260807.md`
sections "AMENDMENTS v2/v3" + "Appendix A" ONLY · `wo/WO_TAKEOFF_T2_SONNET.md` §3 (the pinned
prompts — you are ALLOWED to add tile-position args to three of them per §1 below, and that is
the ONLY prompt change permitted).

## CONTEXT — the pipeline runs, and its accuracy is measured at 50%
The 17-page Maass run completes end-to-end for ~$0.73. The independent truth file scores
**6/12 counted entities exact (50%)**, and every miss OVERCOUNTS by 1-3 — never undercounts,
which is the safe direction but not an acceptable one. Three defects explain most of it, all
found by the run itself.

## 1. 🔴 THE CACHE-COLLAPSE BUG (highest leverage — fix first)
**CONFIRMED by the cache directory, not hypothesis.** Entries per role for one run:
`p15-P-SYMBOLS-E: 31` · `p8-P-WALLS: 20` · `p14-P-WALLS: 20` · **`p9-P-ROOMS: 1`** ·
**`p12-P-HEIGHTS: 1`** · **`p13-P-HEIGHTS: 1`** · **`p11-P-ROOF: 1`**.

Root cause: the cache key's `promptHash` is `sha256` of the **fully-interpolated prompt
string**. `PWALLS`, `PSYMBOLSE`, `PSYMBOLSP` interpolate tile coordinates, so every tile
hashes differently. `PHEIGHTS()`, `PROOF()`, `PROOMS()` take **no arguments** — so every tile
on a page produces an IDENTICAL prompt, an identical hash, and one cache entry. Tile 1's
answer is then served for tiles 2..N. Consequences measured in the T5 run: roof faces came
back EMPTY, and wall heights fell back to the `WALL_HEIGHT_FT` default in **558 flag
instances** despite the elevation sheets printing a clear `13'-0"` plate height.

**Fix:** give the three collapsed prompt-builders the same tile-position signature their
siblings have — `PHEIGHTS(row, col, gridR, gridC)`, `PROOF(row, col, gridR, gridC)`,
`PROOMS(row, col, gridR, gridC)` — and interpolate a tile line into each prompt body in the
SAME wording style the sibling prompts already use (e.g. `This is one tile of … (tile <r,c>
of <R,C>; tiles overlap 8%).`). Update their call sites in `scripts/takeoff-run.mts` to pass
the tile coords the loops already have. **Change nothing else about the prompt wording.**

⚠️ The existing `.takeoff-cache/` entries for these three roles are POISONED (they hold a
single tile's answer keyed for a whole page). Add a `--no-cache` flag to
`scripts/takeoff-run.mts` that bypasses reads (still writes), and use it for your verification
run so you are not measuring stale answers. Say in your report whether you used it.

## 2. 🔴 WALL-SEGMENT OVERCOUNT (the cross-check is failing 13× and being ignored)
The run produced `seal_plate = 1385 LF` and `ext_studs = 1355 ea` for a **5,813 SF** building.
A 5,813 SF footprint has an exterior perimeter on the order of ~300-350 LF, so the extracted
wall length is roughly **4× too high** and the T5 builder's own cross-check flagged it 13×
over without stopping the run.

**Hypothesis to VERIFY (do not assume — probe it):** `extractWallSegments()` in
`src/lib/takeoff-extract.ts` merges tile outputs across an 8%-overlap grid; a wall segment
visible in two overlapping tiles may be counted twice, and pages 8 AND 14 (both routed to
`wallSegments.vision`) may each contribute the same physical walls.
**Do this:** read `extractWallSegments`, then instrument or unit-test it against the REAL
p8/p14 tile outputs sitting in `.takeoff-cache/` (they are correctly keyed, 20 entries each —
you can load them directly as fixtures). Determine empirically whether the overcount is
(a) overlap double-counting, (b) p8+p14 double-contribution, (c) interior walls being classed
`ext`, or (d) something else. **Fix what you actually find; report what it was with evidence.**
Dedupe key suggestion if (a): the matched TEXT-LAYER dimension string identity + orientation +
approximate page position — a segment quoted by two tiles is ONE segment. If p8 and p14 both
contribute (b), pick ONE authoritative page for wall segments and say which in the report.
**Add the cross-check as a HARD flag:** when Σ exterior wall LF exceeds `4 × sqrt(footprintSF)`
by more than 50%, the assembly is flagged `extraction_uncertainty` with the computed ratio in
the reason — an implausible number must never land silently in a material total.

## 3. 🟠 TAG VOCABULARY — garage doors scored 0/1
The plan labels garage doors `"10'X8' OHD"`, not the `WWHH` digit code `TAG_RE` expects, so
the garage door was missed entirely. Extend the tag extraction to ALSO recognize
dimension-labeled openings of the form `<feet>'X<feet>'` / `<feet>' X <feet>'` (case-
insensitive, optional spaces) with a trailing type token (`OHD`, `OH`, `GD`), converting to
the same `{tag, widthFt, heightFt}` shape (tag = the verbatim label). Also recognize the door
vocabulary the T5 report names as present on this plan — `Dbl`, `Pkt`, `BD` — as INTERIOR
door labels. **Anything you cannot confidently classify stays FLAGGED, never silently
dropped and never guessed** (law 3: missing lines are the failure).

## 4. VERIFY — re-run and re-score (this is the deliverable, not the code)
Run: `npx tsx scripts/takeoff-run.mts --pdf "C:/Users/josep/Downloads/SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf" --dry --no-cache`
then `npx tsx scripts/takeoff-validate.mts` against the EXISTING
`fixtures/maass-truth.yaml`.
🔴 **DO NOT EDIT THE TRUTH FILE to make the score go up.** It was built independently, before
the pipeline's output was ever read; changing it to match the pipeline is the circular-
validation failure this whole method exists to prevent. If you believe a truth entry is
genuinely WRONG, leave it, and write the argument + your evidence in the report under
`## TRUTH FILE DISPUTES` for the orchestrator to adjudicate.
Report: the before/after accuracy table (T5 scored 6/12 = 50%), the wall-LF number before and
after, whether heights now extract (the 558-flag baseline), whether roof faces populate, and
the run's cost.

## 5. BUILD REPORT → `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T6.md`
Gate tails verbatim · what the wall overcount ACTUALLY was, with evidence · before/after
accuracy table · cost of the verification run · `## TRUTH FILE DISPUTES` (if any) ·
STOP questions · files touched.
