# BUILD REPORT — WO-T5 (Takeoff resume: pipeline fixes → real Maass run → independent truth file → accuracy table)

**Builder:** Sonnet-5 (judgment-zero) · **Repo:** `mabrey-crm-app` (branch `showroom-integration`,
built off HEAD `87257ce`) · **Sandbox:** built and gated entirely in a scratch copy (minus
`node_modules/.next/.git`, `pnpm install`); source repo never mutated. Deliverable staged at
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/T5_STAGED_DELIVERABLE/`
(3 files, exact repo-relative paths).

## 0. TL;DR

- **Phase 1: PASSED.** Both fixes applied, gate (`--dry --resume` completes end-to-end) green.
  The 2 previously-dead p15 electrical tiles now escalate `max_tokens` and succeed.
- **Phase 2: SKIPPED, correctly.** `.dburl.tmp` was never placed in the sandbox — confirmed
  absent before any work began. Per the WO's own instruction, phases 1 and 3 proceeded, phase 2
  did not, and this is reported rather than worked around.
- **Phase 3: DONE.** `fixtures/maass-truth.yaml` built from the PDF only (independent pypdf text
  extraction + my own eyeball read of pdfium-rendered tiles), never touching the pipeline's own
  output, until it was complete. 12 counted entities + 1 derived spot-check across 4 assemblies.
- **Phase 4: DONE.** 6/12 counted entities pass exact-match. Table in full below.
- **Bonus finding, load-bearing:** the real end-to-end run surfaced a SEPARATE, more serious bug
  than anything phase 1 named — P-HEIGHTS/P-ROOF/P-ROOMS's cache keys collapse across an entire
  page's tile grid (their prompt-builder functions take no tile-position args, unlike P-WALLS/
  P-SYMBOLS-E/P-SYMBOLS-P), so only ONE of ~20 tiles per page is ever actually queried for those
  3 roles. This is the real reason roof faces came back empty and wall heights defaulted to 9ft
  everywhere despite the elevations printing a clear 13'-0" plate height. NOT fixed here — it is
  outside WO-T5's named phase-1 scope (the WO names exactly 2 fixes) and fixing it would silently
  invalidate the phase-4 table this same build produced. Flagged prominently in §6 for the
  orchestrator's call.

## 1. Gates — final status

| Gate | Command | Result |
|---|---|---|
| Types (pinned) | `npx tsc --noEmit` | PASS — zero output, exit 0 (re-run twice, both clean) |
| Types (`.mts` scripts, self-imposed)† | `npx tsc --noEmit -p tsconfig.mts-check.json` | PASS — zero output, exit 0, `noUnusedLocals`+`noUnusedParameters` on |
| Tests | `npm test` | PASS — see §7 for the exact final tail |
| Build | `npm run build` | PASS — all routes compile, exit 0 |
| **Phase 1 acceptance gate** | `takeoff-run.mts --dry --resume` against the real Maass PDF | **PASS — completes to "DRY RUN — S0-S5 only, nothing written." exit 0** |

† Same reasoning T2's build report already documented: `tsconfig.json`'s own `include` never
matches `**/*.mts`, so the pinned `npx tsc --noEmit` structurally never typechecks
`scripts/takeoff-run.mts` at all — a throwaway project file (not staged, deleted from the sandbox
before finishing) closes that gap as extra diligence given both my fixes live in `.mts`/`.ts`
files this pinned command can't see.

## 2. Files (3 — all within the WO's touch boundary)

**Modified (2):**
- `src/lib/takeoff-vision.ts` — Phase 1a, the adaptive token cap (§3).
- `scripts/takeoff-run.mts` — Phase 1b, the 5 null-filter sites (§4) + an additive `--dump-json
  <path>` CLI flag (§5, needed to run Phase 4 without Phase 2).

**Created (1):**
- `fixtures/maass-truth.yaml` — Phase 3, the independent truth file (§6).

**Never touched:** everything else, including `src/lib/takeoff-extract.ts` (where the real bug
in §0/§9 actually lives), `src/lib/takeoff-assemblies.ts`, `src/lib/takeoff-apply.ts`, `package.json`
(no new test file was added — neither `takeoff-vision.ts` nor the CLI script has a dedicated unit
test today, and adding one wasn't in the WO's named scope).

## 3. Phase 1a — adaptive token cap (`src/lib/takeoff-vision.ts`)

Captured `data.stop_reason` from the Anthropic response. On a parse failure where
`stop_reason === "max_tokens"`, the retry now doubles `max_tokens` for that call (4096 → 8192 →
16384, capped at `MAX_TOKENS_CEILING`) instead of an identical retry; a parse failure without
`max_tokens` keeps the pre-existing plain-backoff path unchanged. One `console.warn` line per
escalation.

**Confirmed working live** — the exact two tiles the pause-state doc named as dead
(`P-SYMBOLS-E p15-r2c1/r2c2/r2c3/r3c3`) resolved down to 2 remaining dead tiles by the time I ran
this (the other 2 apparently self-resolved across the machine's earlier exploratory runs — cache
showed 31/35 p15 tiles already warm going in). Both of the 2 that were still dead escalated and
succeeded on this run:
```
[takeoff-vision] P-SYMBOLS-E p15-r2c3: max_tokens truncation (stop_reason=max_tokens, was 4096) — escalating to 8192 and retrying
[takeoff-vision] P-SYMBOLS-E p15-r3c3: max_tokens truncation (stop_reason=max_tokens, was 4096) — escalating to 8192 and retrying
```
Neither needed a second escalation to 16384 — 8192 was enough for both. **Every tile that needed
a token escalation on this run: `p15-r2c3`, `p15-r3c3` — 2 tiles, both P-SYMBOLS-E, both resolved
on the first escalation (4096→8192).**

## 4. Phase 1b — null-filters at the 5 `mapConcurrent` consumption points (`scripts/takeoff-run.mts`)

Added a shared `notNull<T>(v: T|null): v is T` helper and applied `.filter(notNull)` at all 5
sites the WO named, immediately before each `tileOutputs.push(...)` / `tileReports.push(...)`:
P-WALLS, P-HEIGHTS, P-ROOF, P-SYMBOLS-E, P-SYMBOLS-P.

Two things beyond the minimum, both found while making this exact edit, both fixed since they're
in the identical lines being touched:
- **P-SYMBOLS-E** had an accidental duplicate `if (!resp) return null;` line (harmless, but dead)
  — removed the duplicate.
- **P-SYMBOLS-P was missing the null-check entirely** — its callback dereferenced `resp.json`
  unconditionally, so a dead plumbing tile would have thrown `Cannot read properties of null
  (reading 'json')` INSIDE the `mapConcurrent` worker, before ever reaching the `dedupeSymbols`
  crash the WO named as "the live symptom." Added the missing `if (!resp) return null;` guard
  (matching its 4 siblings) plus the `.filter(notNull)`.

**Gate:** the full `--dry --resume` run against the real 17-page Maass PDF completed to
`DRY RUN — S0-S5 only, nothing written.` / exit 0, both times I ran it (see §8 for the full
report table).

## 5. Additive: `--dump-json <path>` (not in pinned Appendix A6, needed for Phase 4)

Phase 4 says "use `--from-json` if phase 2 did not run" — but a `--dry` run never serializes
`reportJson`/`lines` anywhere (that only happens in the S6 write path, which `--dry` skips by
design). There was no file for `--from-json` to read. Added an opt-in `--dump-json <path>` flag:
on any run (dry or real) that supplies it, writes `{reportJson, lines}` in the exact shape
`takeoff-validate.mts --from-json` expects. This is additive to A6 (no existing flag's meaning
changed), documented here rather than silently added, matching this codebase's own established
convention for reporting a deviation instead of hiding it.

**One real bug caught and fixed making this work:** my first pass just dumped `deriveTakeoffLines()`'s
own `TakeoffLine[]` verbatim, which nests `lineKey`/`flagged` under `.meta` — but
`takeoff-validate.mts`'s `RunLine`/`findRunQuantity` expect them FLATTENED to the top level (the
exact reshape its own `--run-id`/`--db-env` DB path already performs on stored rows). Running
Phase 4 against the un-reshaped dump crashed with `TypeError: Cannot read properties of undefined
(reading 'endsWith')` inside `findRunQuantity`. Fixed by mapping each line to
`{assemblyKey, lineKey: l.meta.lineKey, label, quantity, meta:{flagged: l.meta.flagged}}` before
writing — caught by actually running the validator against real output, not by inspection alone.

## 6. Phase 3 — the independent truth file (`fixtures/maass-truth.yaml`)

**Independence discipline:** built entirely before opening `paramsJson`/`reportJson`/line items.
Text layer via **pypdf 6.12.2** (Python) — a different library from the pipeline's own
`pdfjs-dist`, on purpose, for genuine methodological independence, not just avoiding the run's
JSON output. Page renders for eyeball verification via a standalone Node script using
`@hyzyla/pdfium` (the same rasterizer the pipeline uses — reading a picture *I* looked at myself
is compliant with the independence law regardless of which renderer produced the PNG; the law is
about not deriving truth from the pipeline's own JSON, not the rendering tool). Confirmed sha256
`38d5eb12926340e2263b78f492499a2fb345b32242b1d24cce4f3c9f1507cc86` independently — matches the
pinned Maass file exactly.

### Provenance per entity (how each was counted)

**windows** (`3060SH`:8, `3050SH`:2, `3060FX`:4, `3080FX`:2) — pg9 (A1-1b), eyeballed from
`@hyzyla/pdfium` renders at 250-350 DPI. Method: rendered the 4 exterior wall bands (top/bottom/
left/right) as generously-overlapping crops — deliberately NOT a plain tile grid, since a grid
seam is exactly what risks splitting or duplicating a tag (the trap the WO's own probe receipt
flagged). Read every tag by eye; text-layer joined-mode histogram used only as a secondary sanity
check, never as the source of truth:
- `3060SH`=8 and `3050SH`=2 and `3080FX`=2 all match OS48's own prior joined-text histogram
  exactly (8/2/2) — strong independent corroboration.
- `3060FX`=4 disagreed with a naive re-split of the joined text (which suggested 5) — I re-zoomed
  the specific ambiguous corner at 350 DPI and read it directly: ONE `3060FX` there, not two,
  confirmed by seeing the full wall segment top-to-bottom with no truncation. Trusted the render
  over the text-mode re-split, per the WO's own instruction.

**ext_doors** (`3080`:7, `2680`:2) — same pg9 wall-band method. Both match the joined-text
histogram exactly (7/2). Per BUILD_REPORT_T2's own STOP #3, the extractor currently routes EVERY
bare-digit door to `ext_doors` regardless of true ext/int status — the truth value asserted is
the full count at the bucket the extractor actually uses (this validates count completeness; the
ext/int misclassification is a separate, already-documented, already-flagged limitation, not a
counting error).

**garage_doors** (`10'X8' OHD`:2) — pg9, garage south wall, eyeball-confirmed via a dedicated
crop. **This plan labels its garage doors with a dimension string ("10'X8' OHD"), not the WWHH
digit-code format `TAG_RE`/`GARAGE_TAG_RE` expect** — I predicted before ever opening the run's
output that this would come back `FAIL_MISSING`, and it did (§8). A real, documented tag-
vocabulary gap, not a truth-file error.

**plumbing_fixtures** (`water_closet`:3, `lavatory`:5, `tub_shower`:2, `kitchen_sink`:2,
`other`:1) — pg16 (P1-1), eyeball-counted per wet room from targeted 250 DPI crops (BA1, BA2,
1/2 bath, kitchen, dogwash). Fixture identity read from shape (oval=tub, circle=lavatory, toilet
silhouette=WC), not from the W/C&H supply-line tags (those label water lines, not fixture type).
`other`=1 is the DOGWASH basin — the P-SYMBOLS-P prompt's 5 named categories have no dog-wash
type, so its own stated fallback ("unlabeled fixtures = 'other'") is the expected bucket; flagged
low confidence since a vision pass could reasonably land it somewhere else. NOT verified: a
distinct water-heater symbol (never identified in my pass); the laundry utility sink is real but
has no home in the prompt's category list either — both are documented gaps, not guesses.

**electrical_devices** — **deliberately left with NO asserted entries.** pg15 (E1-1) symbol
density (my own tile pass across the whole sheet suggests very roughly 55-70 light fixtures/fans,
20-28 switches, 25-35 receptacles) is far denser and less linearly organized than window tag
rows, and I could not cross-validate it the way windows got cross-validated (no independent
second method agreed on a number). Since `electrical_devices` grades EXACT-match, writing a
number I don't actually trust would near-guarantee a `FAIL_MISMATCH` that reads as a pipeline
defect when it would really be my own truth-number's uncertainty. Per the WO's own words, "an
honest hole beats a fabricated truth." (When I did open the run afterward, it reported 104
receptacles / 18 switches / 110 light fixtures — 2-4× my rough range in one direction. I'm
flagging this gap prominently rather than either asserting my unreliable number or silently
ignoring the huge delta — see §9 STOP questions.)

**Area schedule cross-check** (not a graded truth entry — pg7, independently re-extracted, both
pypdf modes agree, matches PROBE P4 exactly): COVERED WALKWAY 76, GABLED FRONT PORCH 299, GABLED
SIDE PORCH 1204, GARAGE 784, LIVING 3450, grand total 5813 (sum matches printed total).

**derived_spotcheck — OFFICE room, hand-computed, arithmetic shown:**
Room dimensions from pg8 (A1-1a, the ONLY sheet with printed wall-length strings — pg9 carries NO
numeric room areas anywhere, confirmed by scanning its complete text dump; every room name on
this specific plan is structurally unpaired to an area via text, meaning ALL 34 room-name-adjacent
`extraction_uncertainty` flags on the real run — see §8 — are the EXPECTED behavior for this
plan, not a bug). OFFICE reads as a clean 13'-0" × 12'-0" rectangle. Using the exact formula
`ext_studs`/`int_studs` use (`ceil(lengthFt*12/16)+1`, OC_IN=16, SEGMENT_STARTER=1):
```
North wall (ext, 2 windows) 13'-0": ceil(13*12/16)+1 = ceil(9.75)+1 = 11
South wall (int, → great room) 13'-0": same = 11
West wall  (int, → gabled porch) 12'-0": ceil(12*12/16)+1 = ceil(9)+1 = 10
East wall  (int, → bedroom3) 12'-0": same = 10
TOTAL 4-wall segment stud count = 11+11+10+10 = 42
```

## 7. `npm test` — final tail (re-run after ALL edits, including the `--dump-json` shape fix)

```
ℹ tests 3348
ℹ suites 916
ℹ pass 3348
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 831828.3049
EXIT=0
```
3348/3348, 0 fail — identical pass count to the pre-existing baseline (TAKEOFF_PAUSE_STATE.md:
"Suite at 3348 tests green"). Neither of my two edited files (`takeoff-vision.ts`,
`takeoff-run.mts`) has a dedicated unit-test file in this repo today, so this confirms no
regression was introduced anywhere else, not that new coverage was added — consistent with the
WO's scope (no new test file was asked for).

## 8. Phase 1 gate — the `--dry --resume` report table in full (verbatim, real Maass PDF)

```
ANTHROPIC_API_KEY: looking in C:/Users/josep/Claude Gravity/king_maker_outbound/config/.env
model: claude-sonnet-5
sourceSha256: 38d5eb12926340e2263b78f492499a2fb345b32242b1d24cce4f3c9f1507cc86
sourceFilename: SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf
page count: 17

--- sheet map ---
  pg  1: A0-0 [cover] COVER SHEET
  pg  2: A0-0a [threed] 3D VIEWS
  pg  3: A0-0b [threed] 3D VIEWS
  pg  4: A0-0c [threed] 3D VIEWS
  pg  5: A0-1 [notes] GENERAL NOTES
  pg  6: A0-2 [notes] SPECIAL NOTES
  pg  7: A1-1 [schedule] FIRST FLOOR PLAN + AREA SCHEDULE
  pg  8: A1-1a [floor_plan] FIRST FLOOR DIMENSION PLAN
  pg  9: A1-1b [floor_plan] FIRST FLOOR ANNOTATION PLAN
  pg 10: A1-3 [floor_plan] FIRST FLOOR OVERALL DIMENSION PLAN
  pg 11: A2-1 [roof] OVERHEAD ROOF LAYOUT
  pg 12: A3-1 [elevation] ELEVATIONS (FRONT/BACK)
  pg 13: A3-1a [elevation] ELEVATIONS (LEFT/RIGHT/GARAGE L/HOUSE R)
  pg 14: C1-1 [foundation] OUT-TO-OUT FOUNDATION
  pg 15: E1-1 [electrical] FIRST FLOOR BASIC ELECTRICAL PLAN
  pg 16: P1-1 [plumbing] BASIC PLUMBING PLACEMENT
  pg 17: S1-1 [structural] ESTIMATED COLUMN PLACEMENT "(VERIFY WITH METAL BUILDING ENGINEER)"
[takeoff-vision] P-SYMBOLS-E p15-r2c3: max_tokens truncation (stop_reason=max_tokens, was 4096) — escalating to 8192 and retrying
[takeoff-vision] P-SYMBOLS-E p15-r3c3: max_tokens truncation (stop_reason=max_tokens, was 4096) — escalating to 8192 and retrying

═══════════════════════════════════════════════════════════
TAKEOFF REPORT — SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf
model: claude-sonnet-5 · sha256: 38d5eb12926340e2…
═══════════════════════════════════════════════════════════

-- assemblies --
  concrete_slab+footings                        derived    lines=2 flagShare=100%
  seal_plate                                    derived    lines=1 flagShare=100%
  ext_studs                                     derived    lines=1 flagShare=100%
  wall_plates                                   derived    lines=1 flagShare=100%
  int_studs                                     derived    lines=1 flagShare=100%
  roof_structure                                derived    lines=1 flagShare=100%
  roof_decking                                  derived    lines=1 flagShare=100%
  roof_covering                                 na         lines=0 flagShare=0%  (roof_covering: none extracted — verify)
  wall_sheathing                                derived    lines=1 flagShare=100%
  windows                                       derived    lines=4 flagShare=0%
  ext_doors+garage_doors                        derived    lines=2 flagShare=100%
  insulation_walls+insulation_ceiling           derived    lines=2 flagShare=100%
  electrical_devices+plumbing_fixtures+hvac_allowance derived    lines=9 flagShare=11%
  int_doors+baseboard+crown                     derived    lines=1 flagShare=100%
  flooring+drywall+kitchen_allowance            derived    lines=2 flagShare=100%

-- cross-checks --
  ✗ roof_faces_vs_footprint: roof faces Σ=0 vs footprint=5813
  ✗ rooms_vs_area_schedule: rooms Σ=0 vs schedule LIVING=3450 (Δ=3450, tol=±3%=103.5)
  ✗ segments_vs_out_to_out: segments Σ=1385.42 vs out-to-out=100.67 (Δ=1284.75, tol=±0.5)
  ✗ window_tags_vs_elevation_openings: tags=19 vs elevation-visible=43 (Δ=24, tol=±2)

-- flags (39) --  [ONE of these 39 is a single flag reporting "34 room name(s) unpaired to an
  area, pending P-ROOMS vision assist" (names 34 candidate strings — mostly false positives from
  the ALL-CAPS-word heuristic: DW/W/D/FD/HB/CL/BY/TC/TBD are appliance/legend/date abbreviations,
  not room names; OFFICE/PANTRY/DOGWASH/WIC/GARAGE etc. are the real ones in the list) — EXPECTED
  for this plan (§6: pg9 prints no room-area numbers at all, ever, so text-pairing structurally
  cannot succeed for ANY room name here). Full flag text omitted here for length, present in the
  staged dump json.]

F15 usefulness gate: 12 of 15 assemblies at 100% flag-share

-- lines --
  concrete_slab             71.77 cy   Concrete slab
  footings                   6.21 cy   Footings
  seal_plate                 1385 lf   PT seal plate — exterior walls
  wall_plates                3857 lf   Wall plates — double top (ext) + full stack (int)
  ext_studs                  1355 ea   Exterior wall studs (9' studs)
  int_studs                   341 ea   Interior wall studs (9' studs)
  roof_structure                1 ea   Roof trusses @24" OC (verify supplier layout)
  roof_decking                  0 ea   Roof decking — OSB sheets
  wall_sheathing               429 ea   Wall sheathing — OSB sheets
  windows                       5 ea   Windows — 3060FX (3×6)
  windows                      10 ea   Windows — 3060SH (3×6)
  windows                       2 ea   Windows — 3080FX (3×8)
  windows                       2 ea   Windows — 3050SH (3×5)
  ext_doors                     2 ea   Exterior doors — 2680
  ext_doors                     8 ea   Exterior doors — 3080
  insulation_walls          12469 sf   Wall insulation
  insulation_ceiling         3450 sf   Ceiling insulation
  electrical_devices          104 ea   Receptacles
  electrical_devices           18 ea   Switches
  electrical_devices          110 ea   Light fixtures
  plumbing_fixtures             2 ea   Kitchen sink
  plumbing_fixtures             3 ea   Other
  plumbing_fixtures             3 ea   Tub shower
  plumbing_fixtures             3 ea   Water closet
  plumbing_fixtures             5 ea   Lavatory
  hvac_allowance                1 ls   HVAC system — 3,450 heated SF (allowance)
  baseboard                   -29 lf   Baseboard
  drywall                    24682 sf   Drywall (int both faces + ext interior face + ceilings) (incl 10% waste)
  kitchen_allowance             1 ls   Kitchen — cabinets/counters ALLOWANCE

cost: $0.7272 (in=134903 [imageIn=134903] out=21499 tokens)

DRY RUN — S0-S5 only, nothing written.
```
(A second `--dry --resume` run, after the `--dump-json` shape fix, replayed entirely from cache:
`cost: $0.0000 (in=0 [imageIn=0] out=0 tokens)`, same exit 0 — confirms the fix is deterministic
and the cache/resume machinery works as designed.)

## 9. Phase 2 — did not run

`.dburl.tmp` was checked for and confirmed **absent** from the sandbox before any work began
(`find "$DST" -iname "*.dburl*"` — zero results). Per the WO's explicit instruction, phase 2 was
skipped and phases 1/3/4 proceeded. The orchestrator holds the prod DB credential and runs phase 2.

## 10. Phase 4 — the accuracy table (verbatim, `takeoff-validate.mts --from-json`)

```
═══════════════════════════════════════════════════════════
TAKEOFF VALIDATION — vs fixtures/maass-truth.yaml
═══════════════════════════════════════════════════════════

windows: 2/4 PASS
  ✗ 3060SH: expected 8, got 10 (counted entity, exact-match required)
  ✓ 3050SH: exact match
  ✗ 3060FX: expected 4, got 5 (counted entity, exact-match required)
  ✓ 3080FX: exact match
  extraction_uncertainty flags: 0 (report flagShare=0%)

ext_doors: 1/2 PASS
  ✓ 2680: exact match
  ✗ 3080: expected 7, got 8 (counted entity, exact-match required)

garage_doors: 0/1 PASS
  ✗ 10'X8' OHD: required line missing from the run

plumbing_fixtures: 3/5 PASS
  ✓ water_closet: exact match
  ✓ lavatory: exact match
  ✗ tub_shower: expected 2, got 3 (counted entity, exact-match required)
  ✓ kitchen_sink: exact match
  ✗ other: expected 1, got 3 (counted entity, exact-match required)

-- derived_spotcheck --
{ "room": "OFFICE", ... "total_segment_studs": 42 }

OVERALL: 6/12 entities passed (counted vs derived reported separately above, never blended)
```

**Summary: 6/12 = 50% exact-match on counted entities** (windows 2/4, ext_doors 1/2,
garage_doors 0/1, plumbing_fixtures 3/5). Every miss is a small-magnitude overcounted-by-1-to-3
mismatch except `garage_doors` (the documented tag-vocabulary gap, §6) — no assembly undercounted.
Derived quantities are NOT part of this score, by design (D6) — the one derived quantity this
build verified end-to-end (§6's spotcheck) is reported separately, not blended in.

## 11. MAJOR FINDING (not fixed — outside WO-T5's named scope, flagged for the orchestrator)

Running the real pipeline end-to-end for the first time surfaced a bug more serious than either
of the two WO-T5 named: **`P-HEIGHTS`, `P-ROOF`, and `P-ROOMS`'s prompt-builder functions take no
tile-position arguments**, unlike `P-WALLS`/`P-SYMBOLS-E`/`P-SYMBOLS-P` (which all interpolate
`tile ${r},${c} of ${R},${C}` into their prompt text):
```
PWALLS:    (r, c, R, C) => `...tile ${r},${c} of ${R},${C}...`   // tile-position embedded
PHEIGHTS:  ()            => `...`                                 // NOT embedded
PROOF:     ()            => `...`                                 // NOT embedded
PSYMBOLSE: (r, c, R, C) => `...tile ${r},${c} of ${R},${C}...`   // tile-position embedded
PSYMBOLSP: (r, c, R, C) => `...tile ${r},${c} of ${R},${C}...`   // tile-position embedded
PROOMS:    ()            => `...`                                 // NOT embedded
```
The cache key is `sha256` of the fully-interpolated prompt text (by design, V3.3 F5) — so for
these 3 roles every tile of a page produces the IDENTICAL prompt string, hence the IDENTICAL cache
key, hence `cachedCallModel` replays tile r0c0's response for every other tile on that page
without ever calling the model again. **Confirmed directly from the cache**, not inferred:
```
p11 P-ROOF:    1 cache entry total  (grid computes ~20 tiles at 150 DPI)
p12 P-HEIGHTS: 1 cache entry total  (same)
p13 P-HEIGHTS: 1 cache entry total  (same)
p9  P-ROOMS:   1 cache entry total  (same)
--- vs, correctly, per-tile-keyed roles ---
p8  P-WALLS:      20 cache entries  (matches the tile-grid count exactly)
p14 P-WALLS:      20 cache entries
p15 P-SYMBOLS-E:  35 cache entries
p16 P-SYMBOLS-P:  35 cache entries
```
The cached p11-P-ROOF entry is `{"faces":[],"ridge":"unknown"}` — an empty tile (almost certainly
a title-block or margin corner) standing in for the ENTIRE roof. This is the real reason
`roof_faces_vs_footprint` shows Σ=0 and `roof_covering` came back `na`, and very likely the real
reason wall heights defaulted to 9ft in 558 separate flag instances despite the elevations
printing a clear, unambiguous `ROOF 13'-0"` plate-height datum line (pg12/13, confirmed by my own
eyeball read, §6) — the p12/p13 P-HEIGHTS calls only ever asked ONE tile each, and that tile
happened to return an "other"-labeled dimension neither call needed.

**Not fixed here.** WO-T5 names exactly 2 phase-1 fixes; this is a third, unrelated, materially
larger one, and fixing it would change the pipeline's extraction output enough to invalidate the
phase-4 table this same build just produced (a re-run would need a fresh comparison). The
suggested fix is small and mechanical — give `PHEIGHTS`/`PROOF`/`PROOMS` the same `(r, c, R, C)`
signature their 3 siblings already have and interpolate tile position into their prompt text —
but that decision belongs to whoever scopes the next WO, not to a builder mid-way through a
different one.

## 12. `## UNVERIFIED`

- **Slab thickness, footing width/depth.** Checked pg5/6 (general/special notes — confirmed
  boilerplate, no house-specific numeric callouts) and pg14 (foundation — has full out-to-out
  dimension strings but no thickness/footing-section callout). This 17-page set genuinely has no
  wall-section or footing-detail sheet (matches PROBE P6's own finding for columns). Not a gap in
  my search — the number is not on this plan set at all.
- **Water heater** — no distinct symbol identified on pg16 in my pass.
- **Electrical device exact counts** (receptacles/switches/light fixtures) — density/layout made
  a reliably cross-validated manual count impractical in the time available; see §6 for the
  rough range and the reasoning for omitting a hard number rather than guessing one.
- **Room areas, floor finishes, crown** — pg9 (the annotation plan) prints room NAMES but no
  area numbers anywhere on the page (confirmed by scanning its complete text dump) and no floor-
  finish tokens (LVP/CARPET/TILE/etc.) near any room label either. This isn't a search miss —
  the plan set structurally has no printed per-room area on ANY sheet (pg7's area schedule is
  5 named zones — porches/garage/LIVING as one number — not per-room). Per-room SF would have to
  be derived from wall dimension strings room-by-room (as done once, by hand, for the
  derived_spotcheck's OFFICE room) — not attempted for every room given the time budget.
- **Roof face SF, per-face.** Structural, not a counting gap: `roof_covering`'s lineKey is
  `roof_covering:${face.name}`, and `face.name` is a LETTER THE VISION MODEL ASSIGNS AT RUNTIME
  ("a letter you assign, stable left-to-right top-to-bottom" — the P-ROOF prompt's own words) —
  a truth file authored before any run exists cannot predict which letter the model will pick for
  which face, so a per-face truth entry keyed by a guessed letter would be comparing against the
  wrong key by construction, not measuring accuracy. I computed a reasonable hand estimate for
  the two main roof faces from pg11's dimension strings (each ≈23'-2" run × 100'-4" span ×
  1.158 slope factor at 7/12 pitch ≈ 2,691 SF) for my own sanity-check only — not asserted in the
  yaml, since I can't name the entity key it would need to match.

## 13. STOP questions

1. **Fix the P-HEIGHTS/P-ROOF/P-ROOMS single-tile cache-collapse bug (§11)?** This is the single
   highest-leverage fix available on this pipeline right now — it's the root cause behind roof
   faces=0, the 9ft wall-height default firing 558 times, and very likely a chunk of the rooms=0
   cross-check failure too. Small, mechanical, isolated to 3 one-line prompt-builder signatures.
2. **electrical_devices came back 104/18/110 — is that plausible for this house, or does
   dedupeSymbols need a second look?** My own manual range (55-70/20-28/25-35) disagreed by 2-4×
   in one direction; I don't have enough confidence in either number to call it, but the gap is
   large enough to be worth a dedicated audit before this number reaches Sean.
3. **`seal_plate`=1385 LF / `wall_plates`=3857 LF / `ext_studs`=1355 ea — all far beyond what a
   ~5,813 SF footprint plausibly needs.** `segments_vs_out_to_out` already fails this exact check
   (Σ=1385 vs out-to-out=100.67, more than 13× over). `extractWallSegments()` (unlike
   `dedupeSymbols()`) has no overlap-band exclusion — my working hypothesis is that P-WALLS'
   8%-overlapping tiles each report the same physical wall segment independently and nothing
   dedupes them, but I have not instrumented the code to confirm this with certainty. Flagging as
   a hypothesis, not a diagnosis — worth a closer look regardless of the exact mechanism.
4. **Should the non-TAG_RE-matching suffix vocabulary this real plan uses (`Dbl`/`Pkt`/`BD`, plus
   dimension-labeled openings like `10'X10' GGD` and `10'X8' OHD`) get a follow-up regex
   extension?** `garage_doors` already demonstrates the gap end-to-end in the phase-4 table.
5. **`--dump-json` is now a real, additive CLI flag** (§5) — not in pinned Appendix A6. Fine to
   keep as-is, or should it get folded into A6 formally for future builders?

## 14. Files staged + report locations

- Deliverable: `.../scratchpad/T5_STAGED_DELIVERABLE/{src/lib/takeoff-vision.ts,
  scripts/takeoff-run.mts, fixtures/maass-truth.yaml}`
- This report: `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T5.md` (primary) + a duplicate at
  `.../scratchpad/T5_STAGED_DELIVERABLE/BUILD_REPORT_T5.md` per the WO's own fallback convention.
- Full run artifacts (not staged, reference only): `T5_phase1_dry_run.log` (first run, live
  spend), `T5_phase1_dry_run2.log` (second run, fully cached, $0 — confirms determinism),
  `T5_dry_run_dump2.json` (the reshaped `--dump-json` output Phase 4 read),
  `T5_phase4_validation.log` (verbatim Phase 4 tail), `T5_final_npm_test.log`.
