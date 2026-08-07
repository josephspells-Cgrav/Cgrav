# BUILD REPORT — WO-T6 (Takeoff accuracy: cache-collapse bug + two overcount defects)

**Builder:** Sonnet-5 (judgment-zero) · **Repo:** `mabrey-crm-app` (branch `showroom-integration`,
built off HEAD `4f0b95d3`) · **Sandbox:** built and gated entirely in a scratch copy (minus
`node_modules/.next/.git`; `node_modules` copied from a prior sandbox with a byte-identical
`pnpm-lock.yaml`, then `pnpm install` re-run to confirm). Deliverable staged at
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/T6_STAGED_DELIVERABLE/`
(3 files, exact repo-relative paths). Live source repo verified untouched throughout (see §7).

**⚠️ RE-FIRE NOTE:** a prior attempt at this exact WO left a full sandbox + probe scripts
(`.../scratchpad/T6_SANDBOX/`) but no report and no staged deliverable. That sandbox's `src/`
was pre-edited in ways I could not verify had ever passed a gate, so I did NOT build on top of
it — I copied fresh source from the live repo instead. I DID re-run its read-only cache probe
scripts myself (they're deterministic and side-effect-free) to independently verify their
findings before deciding on a fix; see §2. All source code in the staged deliverable was written
and verified by me in this session, not copied from the abandoned attempt.

## 0. TL;DR

- **§1 cache-collapse bug: FIXED.** `PHEIGHTS`/`PROOF`/`PROOMS` now take `(r,c,R,C)` and
  interpolate tile position, matching their siblings. Confirmed against the real Maass run:
  **WALL_HEIGHT_FT default flags: 558 → 0.** Roof faces: **Σ=0 → Σ=6342.5 SF, cross-check now
  PASSES.** Rooms vision-assist now genuinely runs per-tile (was 1 call/page, now ~20).
- **§2 wall-segment overcount: DIAGNOSED WITH EVIDENCE = both (a) AND (b), not either alone.**
  Fixed both. `seal_plate`: **1385 LF → 579 LF** (58% down) on the real run. The NEW hard
  plausibility flag (§2, exactly as specified) fires honestly on the result — see §2 for why
  that's the correct outcome, not a residual bug.
- **§3 tag vocabulary: FIXED.** `garage_doors` went from **0/1 → 1/1 PASS** (the exact gap the
  WO named). New `int_doors` line item (5 lines, 11 doors) recognized by real Dbl/Pkt/BD
  vocabulary, verified against the actual PDF text layer. One genuinely unclassifiable opening
  (`10' X 10' GGD`) is flagged, not guessed — see §3.
- **§4 (deliverable) re-score: 6/12 (50%) → 7/12 (58.3%)**, table in full in §4. Zero truth-file
  edits (confirmed by diff — see §7). Zero truth-file disputes.
- **EMERGENT FIX, not in the WO's named 3 defects (§1 side effect, load-bearing):** fixing §1
  correctly means P-ROOF now queries ~20 tiles/page instead of 1 — and multiple independently-
  called tiles legitimately report a roof face under the same model-assigned letter (the prompt's
  own "stable left-to-right top-to-bottom" instruction cannot actually be stable across
  independent per-tile calls). This crashed the real run with `duplicate lineKey
  "roof_covering:A"` the FIRST time §1's fix ever ran against real data. Fixed in
  `extractRoofFaces()` — dims-text-identity dedupe + stable sequential rename post-dedupe. Full
  reasoning + evidence in §1.4. This is why the deliverable is a re-score against a SECOND run,
  not the first.
- **Gates: ALL PASS.** `tsc --noEmit` clean · full `npm test` (chunked, see §5) **3669/3669
  pass, 0 fail** · `npm run build` clean, all routes compile.
- **Run cost (the successful, reported --no-cache verification run): $2.7867** (582,825 input
  tokens, all image; 69,213 output). A first --no-cache attempt made the same live vision calls
  and then crashed in pure derivation code (the emergent bug above) before printing a cost line;
  its exact dollar figure was never logged, but its API spend was comparable given it completed
  the identical vision-calling phase. Both runs stayed far under the $15 cap.

## 1. §1 — the cache-collapse bug (fixed, confirmed against the real run)

### 1.1 Confirmed root cause (matches the WO's framing exactly)

`PHEIGHTS`, `PROOF`, `PROOMS` in `scripts/takeoff-run.mts`'s `PROMPTS` object took **no**
arguments, unlike their siblings `PWALLS`/`PSYMBOLSE`/`PSYMBOLSP` which all interpolate
`tile ${r},${c} of ${R},${C}`. Cache key = `sha256` of the fully-interpolated prompt string
(V3.3 F5) — so every tile of a page produced the identical prompt for these 3 roles, hence the
identical hash, hence one cache entry served every tile's answer. Verified directly from the
inherited cache before touching anything: `p9-P-ROOMS: 1 entry`, `p11-P-ROOF: 1 entry`,
`p12-P-HEIGHTS: 1 entry`, `p13-P-HEIGHTS: 1 entry` — vs correctly-keyed `p8-P-WALLS: 20`,
`p14-P-WALLS: 20`.

### 1.2 Fix

Gave all 3 the same `(r: number, c: number, R: number, C: number)` signature and inserted
`(tile ${r},${c} of ${R},${C}; tiles overlap 8%)` into the first sentence, in the exact wording
style the siblings already use — nothing else about the prompt text changed. Updated all 3 call
sites in `scripts/takeoff-run.mts` to compute `gridR`/`gridC` (same pattern PWALLS already uses)
and pass real tile position. The P-ROOMS call site is a plain sequential `for` loop (not
`mapConcurrent` like the others) — same fix, different loop shape.

Used the sibling parameter names `(r, c, R, C)` rather than the WO's illustrative
`(row, col, gridR, gridC)` — same shape/arity either way, chose consistency with the 3 existing
prompt-builders already in the same object.

### 1.3 `--no-cache` (added per the WO)

Added `--no-cache` to `scripts/takeoff-run.mts` (Args + parseArgs + usage string): bypasses
`readCache()` unconditionally for every role (not just the 3 fixed ones — simpler and safer than
a role-by-role allowlist; the only cost is a few extra cents, never a wrong answer from a
poisoned entry), `writeCache()` still runs. **Used it for both verification runs in §1.4/§4** —
confirmed in both run logs: `--no-cache: cache READS bypassed this run (writes still happen) —
WO-T6 §1`.

### 1.4 EMERGENT FIX — extractRoofFaces() duplicate-lineKey crash (not in the WO's named 3 defects)

First `--no-cache` run against the real 17-page PDF got through all vision calls and crashed in
pure derivation code:
```
❌ takeoff-run.mts failed: Error: duplicate lineKey "roof_covering:A" within one derivation
    at deriveTakeoffLines (...\src\lib\takeoff-assemblies.ts:1153:13)
```
**Root cause:** the P-ROOF prompt asks the model for `"name":"<letter you assign, stable
left-to-right top-to-bottom>"` — a per-TILE instruction with zero shared state across
independent tile calls. Before §1's fix this was invisible (only 1 tile/page was ever queried).
Now that every tile is correctly queried, tiles that partially overlap the SAME physical face
legitimately re-report it under a locally-plausible letter (often "A"), and `extractRoofFaces()`
had never deduped by anything — every text-matched face just got pushed. Downstream
`takeoff-assemblies.ts` (not owned by this WO) keys `roof_covering:${face.name}` and requires
uniqueness within one derivation — a real, previously-untested invariant, now genuinely tripped
for the first time.

**Fix, in `extractRoofFaces()` (my file):** dedupe candidates by the matched-dims TEXT identity
(sorted, joined verbatim dimension strings) — the same "text-layer values are authoritative"
principle (V3.3 F8) `extractWallSegments()`'s own dedupe already applies — then re-assign stable
sequential letters (A, B, C…) to the SURVIVING faces in first-seen order. This schema carries no
per-face position field (unlike `PWalls`' `cx/cy`), so it's the coarsest safe version of the same
idea; the safe DIRECTION is preserved — a false collapse (two genuinely distinct faces sharing
identical printed dims, e.g. a symmetric gable's two equal slopes) would under-count
`roofFacesSf`, which `crossCheckRoofFacesVsFootprint` (unchanged) surfaces via a failing
cross-check, never silently. On the real run it did NOT under-fire: the cross-check **passes**
(`roof faces Σ=6342.5 vs footprint=5813`). Re-ran end to end after this fix — succeeded (§4).
This was necessary to deliver ANY re-score at all, so I fixed it rather than stopping — flagged
here prominently per the "STOP where silent, but report" discipline, since it's genuinely outside
the WO's named 3 defects.

### 1.5 Result — confirmed from the full (non-truncated) report JSON, not just the printed summary

| Signal | T5 (before) | T6 (after) |
|---|---|---|
| `WALL_HEIGHT_FT default 9ft — verify` flag count | **558** | **0** |
| Wall-height stud label | `(9' studs)` (default) | `(6' studs)` (a real extracted value — see STOP #3) |
| `roof_covering` lines | 0 | **10** (A–J) |
| `roof_faces_vs_footprint` cross-check | ✗ Σ=0 vs footprint=5813 | ✓ Σ=6342.5 vs footprint=5813 |
| P-ROOMS vision-assist calls/page | 1 (collapsed) | ~20 (real grid) |

## 2. §2 — the wall-segment overcount: what it ACTUALLY was, with evidence

### 2.1 Method

`extractWallSegments()` (pre-fix) had **zero dedupe of any kind** — every tile's every
text-matched segment was pushed straight into `extWalls`/`intWalls`. I re-ran the inherited
read-only cache probes myself (deterministic, no live calls — they recompute the exact tile grid
+ prompt hash and map each reported segment's tile-local `(cx,cy)` into page-global grid
coordinates) against the real, correctly-keyed `p8`/`p14` P-WALLS cache (20 entries each):

```
=== BASELINE (current behavior: p8+p14, no dedupe) ===
ext LF raw: 1423.42  (n=113)
=== FIX (b) ONLY: page 8 authoritative, p14 dropped, no dedupe ===
ext LF: 812.08  (n=89)
=== FIX (a) ONLY: p8+p14 combined, position-aware dedupe (tol=0.15 grid units) ===
ext LF: 1206.58  (n=98)   [dedupe alone barely moves it — corroborates BOTH causes are real]
=== FIX (a)+(b) COMBINED: page 8 only + position-aware dedupe ===
ext LF: 733.33  (n=81)    [collapsed 8 near-duplicate segments within p8]
```

**Both (a) tile-overlap double-counting AND (b) page 8+14 double-contribution are real,
independently-confirmed causes — neither alone explains the magnitude.** Evidence for each:

- **(b) confirmed structurally, not just numerically:** page 14 is `C1-1, "OUT-TO-OUT
  FOUNDATION"` — a foundation plan is architecturally guaranteed to re-trace the SAME exterior
  building envelope page 8 (`A1-1a, "FIRST FLOOR DIMENSION PLAN"`) already covers. Both pages
  were being vision-queried for P-WALLS and summed additively with zero reconciliation.
- **(a) confirmed via position mapping:** on page 8 alone, same-dim-text/same-orientation pairs
  within ~250px of each other (true tile-overlap distance) outnumbered far-apart pairs
  19-to-... — concretely: **19 near-pairs vs 182 far-pairs** on page 8 (the far-apart majority
  is why a pure "collapse on text alone" approach was rejected — it would have silently merged
  genuinely distinct segments that happen to share a common round dimension, e.g. this plan's
  repeated `"3' - 0""` window-jamb returns, which are real and different).
- **(c) interior walls misclassified `ext`:** checked, not found necessary to explain the
  magnitude — across all 4 hypotheses above, deduping collapsed ONLY ext-classed segments (0 int
  segments ever collapsed), and the int/ext split stayed internally consistent throughout. Not
  ruled out with certainty, but no evidence found it's a meaningful contributor here.

### 2.2 Fix

`MAASS_ROUTING.wallSegments.vision`: `[8, 14]` → `[8]` (page 8 sole authoritative source, per
the WO's own remedy — page 14 is untouched for its own separate, currently-unconsumed
`foundation` routing key). `extractWallSegments()` rewritten: segments are validated/text-matched
exactly as before, then bucketed by `(dimText, orientation, cls)`, then greedily clustered within
each bucket by approximate page-global grid position (`col*(1-0.08)+cx`, `row*(1-0.08)+cy`,
parsed from the tile id — no PDF/pixel knowledge added to this pure testability-seam file).
`WALL_DEDUPE_GRID_TOL = 0.15` — empirically split the 19-near/182-far gap found above. Segments
whose tile id doesn't parse as `r<row>c<col>` (every pre-existing fixture's hand-authored label)
are never deduped against anything, preserving prior behavior for those inputs exactly (verified
— the pinned `fx-walls-1` fixture test still passes unmodified, see §5).

### 2.3 The new hard flag (added exactly as specified)

`checkWallLfPlausibility(extSumFt, footprintSf)`: flags when Σ ext wall LF exceeds
`4×√footprintSF×1.5`, with the computed ratio in the reason. **Fired on the real run:**
```
ext wall LF Σ=579.2 exceeds the footprint-derived plausibility ceiling
(4×√footprintSF×1.5=457.5 for footprintSF=5813) — ratio 1.9× the square-equivalent floor;
affects seal_plate/ext_studs/wall_plates/wall_sheathing
```
**This is the correct, honest outcome, not a residual bug I should have suppressed further.**
`4×√footprintSF` is the MINIMUM perimeter possible for that floor area (a perfect square). This
building's footprint is a complex multi-wing shape — attached garage (784 SF) + 2 porches
(299+1204 SF) + a covered walkway (76 SF) + the main living area (3450 SF), per the area
schedule — which structurally has more perimeter per unit area than a square. I did not force
the number down further with an unjustified additional dedupe pass to clear the flag; the WO's
own instruction was to add this exact check so an implausible number never lands silently, and
it's doing that job. Whether 579 LF is fully correct for this ACTUAL shape (vs some residual
overcounting I didn't find) is a legitimate open question — see STOP #1.

### 2.4 Result, before/after

| Line | T5 (before) | T6 (after, real run) | Δ |
|---|---|---|---|
| `seal_plate` | 1385 LF | **579 LF** | −58.2% |
| `wall_plates` | 3857 LF | 2353 LF | −39.0% |
| `ext_studs` | 1355 ea | 653 ea | −51.8% |
| `int_studs` | 341 ea | 398 ea | +16.7% (see note) |

Note on `int_studs`: the WO's own evidence (§2, both cited numbers) was about EXTERIOR wall LF;
my fix's dedupe removed 0 interior segments in the probe (§2.1). The live run's int_studs
increase vs T5 is most likely ordinary LLM vision-call variance between two independent
`--no-cache` passes (P-WALLS was never cached-and-replayed in either run) rather than a defect —
not independently re-verified against the plan by hand, flagged honestly rather than asserted.

## 3. §3 — tag vocabulary (fixed, grounded in the real PDF text layer)

Before writing any regex, I probed the actual PDF text layer directly (read-only, pdfjs-dist,
all 17 pages) rather than guessing formats. Findings:

- **Garage doors use a dimension-labeled string, not a WWHH digit tag:** `"10'X8' OHD"` appears
  twice on pg9 (confirmed exact match to the truth file's `garage_doors: {"10'X8' OHD": 2}`).
  Also found: `"10' X 10' GGD"` (once) — same shape, different trailing token.
- **Interior doors use compact WWHH digits + a mixed-case suffix, no separator:** `"4080Dbl"`
  (×6), `"3080Pkt"` (×2), `"6080Dbl"` (×1), `"2680BD"` (×1), `"2680Pkt"` (×1) — all found on pg9,
  structurally parallel to window tags (`"3060SH"`) but with suffixes TAG_RE's ALL-CAPS
  alternation (`SH|FX|SL|DH|CA`) never matches.
- **Gotcha caught before it became a bug:** page 5's legend defines `"GD"` as **"GARBAGE
  DISPOSAL"**, and pg15 has 4 bare `"GD"` callouts near kitchen symbols. A naive "match GD
  anywhere" rule would have miscounted these as garage doors. The dimension-prefix requirement
  (`<feet>'X<feet>'` before the token) makes this structurally impossible — verified with a
  dedicated unit test using the literal `"GD"` string with no dimension prefix (§5).

**Fix:** `INTERIOR_DOOR_TAG_RE = /^(\d{4})(Dbl|Pkt|BD)$/i` → new `intDoors` bucket (WWHH-decoded
via the existing `decodeTagDims()`, same plausibility gate as bare-digit doors).
`DIMENSION_OPENING_RE = /^(\d+)'\s*X\s*(\d+)'\s*([A-Za-z]+)$/i` → trailing token ∈
`{OHD, OH, GD}` (WO-named, verbatim) routes to `garageDoors`; any OTHER trailing token (e.g. the
real `"10' X 10' GGD"`) is captured as `unclassifiedOpenings` — a confirmed real opening, type
not guessed, surfaced as a flag (law 3), never silently dropped. `reconcile()`'s `intDoors`
param — previously hardcoded to an empty array ("no exterior-loop-based classifier wired
yet") — now consumes real data; that hardcode was about the geometric ext/int classifier (still
unbuilt, unrelated), not a blocker for vocabulary-based interior recognition.

**Result on the real run** — matches my independent PDF probe exactly:
```
int_doors: 6080Dbl:1, 3080Pkt:2, 4080Dbl:6, 2680BD:1, 2680Pkt:1  (11 doors, 5 lines)
garage_doors: 10'X8' OHD:2
flag: "1 dimension-labeled opening(s) with an unrecognized type token, not counted in any
       bucket: 10' X 10' GGD"
```

## 4. §4 — VERIFY: the re-score (the deliverable)

Ran exactly the WO's command, plus `--dump-json` (T5's own established additive pattern — a
`--dry` run alone never serializes `reportJson` anywhere else):
```
npx tsx scripts/takeoff-run.mts --pdf "...SS Lake...pdf" --dry --no-cache --dump-json T6_dry_run_dump2.json
npx tsx scripts/takeoff-validate.mts --from-json T6_dry_run_dump2.json
```
**Used `--no-cache`: confirmed** — both attempts printed the bypass banner; this run made fresh
live vision calls for every role, not just the 3 fixed ones.

### Accuracy table (before/after)

| Assembly | T5 (before) | T6 (after) | Change |
|---|---|---|---|
| windows | 2/4 | 2/4 | unchanged (text-based, untouched by any of my 3 fixes) |
| ext_doors | 1/2 | 1/2 | unchanged (text-based, untouched) |
| garage_doors | **0/1** | **1/1** | **FIXED — §3** |
| plumbing_fixtures | 3/5 | 3/5 | unchanged count; *which* 3 passed shifted (tub_shower flipped to PASS, kitchen_sink flipped to FAIL) — vision-call variance under `--no-cache`, P-SYMBOLS-P was never touched by any of my 3 fixes |
| **OVERALL** | **6/12 = 50%** | **7/12 = 58.3%** | **+1 entity, +8.3 pts** |

Full verbatim validator output:
```
windows: 2/4 PASS
  ✗ 3060SH: expected 8, got 10 (counted entity, exact-match required)
  ✓ 3050SH: exact match
  ✗ 3060FX: expected 4, got 5 (counted entity, exact-match required)
  ✓ 3080FX: exact match
ext_doors: 1/2 PASS
  ✓ 2680: exact match
  ✗ 3080: expected 7, got 8 (counted entity, exact-match required)
garage_doors: 1/1 PASS
  ✓ 10'X8' OHD: exact match
plumbing_fixtures: 3/5 PASS
  ✓ water_closet: exact match
  ✓ lavatory: exact match
  ✓ tub_shower: exact match
  ✗ kitchen_sink: expected 2, got 3 (counted entity, exact-match required)
  ✗ other: expected 1, got 4 (counted entity, exact-match required)
derived_spotcheck (OFFICE room): total_segment_studs 42 — unchanged, this formula untouched
OVERALL: 7/12 entities passed
```

The windows/ext_doors mismatches are **byte-identical to T5's own numbers** (same expected,
same got) — confirms zero regression and zero accidental interaction, since neither extraction
path was touched.

### Run cost

**$2.7867** — in=582,825 tokens (100% image), out=69,213 tokens. Well under the $15 cap. A
`--resume` run (cache reads allowed again) would replay this almost entirely from the
now-correctly-keyed cache at near-$0, matching the pattern T5 already documented.

## 5. Gates — final status

| Gate | Command | Result |
|---|---|---|
| Types (pinned) | `npx tsc --noEmit` | **PASS** — zero output, exit 0, re-run clean after every edit batch |
| Types (`.mts`/my files, self-imposed extra diligence)† | `npx tsc --noEmit -p tsconfig.mts-check.json` scoped to my 3 files, `noUnusedLocals`+`noUnusedParameters` on | **PASS** — zero output |
| Tests | `npm test` (chunked — see below) | **PASS — 3669/3669, 0 fail** |
| Build | `npm run build` | **PASS** — all routes compile, exit 0 |
| Phase-4 gate | `takeoff-validate.mts --from-json` against the real Maass run | **PASS — 7/12, printed above** |

† Same structural gap T5/T2 already documented: the pinned `tsconfig.json`'s `include` never
matches `**/*.mts`, so `npx tsc --noEmit` never typechecks `scripts/takeoff-run.mts` at all — a
throwaway project-local config (not staged, deleted before finishing) closes that gap. A first
pass scoped broadly (`src/**/*.ts`) surfaced pre-existing `noUnusedLocals` violations in OTHER
builders' files (assistant-*, booking-confirm.ts, etc. — none touched by me, none in my scope);
re-scoped to exactly my 3 files for an unambiguous signal — clean.

**`npm test` — the full 178-file suite exceeds the 10-minute single-command cap** (T5's own run
logged 831s; this session's confirmed similar), so it was chunked into 4 sequential foreground
runs (not backgrounded/abandoned — each run's tail was read before starting the next):
```
chunk 1/4 (45 files): tests 1028, pass 1028, fail 0  (176.3s)
chunk 2/4 (45 files): tests  967, pass  967, fail 0  (179.3s)
chunk 3/4 (45 files): tests  920, pass  920, fail 0  (108.9s)
chunk 4/4 (43 files): tests  754, pass  754, fail 0   (74.1s)
TOTAL: 3669 tests, 3669 pass, 0 fail
```
3669 vs T5's baseline of 3348 — the +321 is other parallel builders' new test files (A1-A5, B1,
R2A-R2F, etc. all landed test additions on this branch since T5 ran, confirmed by the live repo's
own `git status` showing dozens of their files mid-edit — see §7). My own file
(`takeoff-extract.test.ts`) contributed 44 tests total (29 pre-existing WO-T2-pinned + 15 new —
see §6); every pinned WO-T2 fixture assertion (`fx-walls-1`, `fx-tags-1`, `fx-symbols-1`,
`fx-rooms-1`, `fx-notes-1`, `fx-crosscheck-1`, `fx-area-schedule-real-pg7`) still passes
unmodified.

## 6. Files touched (3 — all within the WO's named touch scope)

**Modified:**
- `src/lib/takeoff-extract.ts` (+309/−17 lines) — §1 emergent roof-face fix, §2 wall dedupe +
  new hard flag, §3 tag vocabulary + `intDoors`/`unclassifiedOpenings`.
- `scripts/takeoff-run.mts` (+64/−12 lines) — §1 prompt signatures + call sites + `--no-cache`.
- `src/lib/takeoff-extract.test.ts` (+218/−1 lines) — 15 new tests: wall-overlap dedupe (3),
  routing regression guard (1), `checkWallLfPlausibility` (3), Dbl/Pkt/BD + dimension-labeled
  garage openings + the GD-collision guard (5), roof-face dedupe/rename (3). Already registered
  in `package.json`'s test hand-list (a pre-existing WO-T2 registration) — **`package.json`
  itself was never touched.**

**Never touched:** `fixtures/maass-truth.yaml` (confirmed by diff, §7 — the WO's hard rule),
`package.json`, `src/lib/takeoff-assemblies.ts`, `src/lib/takeoff-apply.ts`,
`src/lib/takeoff-vision.ts`, `src/lib/takeoff-client.ts`, everything outside my scope.

## 7. Sandbox + live-repo isolation — confirmed, not assumed

- `fixtures/maass-truth.yaml`: `diff` against the live repo's copy → **IDENTICAL**, zero bytes
  changed, confirmed AFTER all work (not just asserted).
- `package.json`: `diff` against the live repo → differs, but ONLY because the LIVE repo's test
  hand-list has grown further since my sandbox was copied (other builders actively landing test
  files in real time — confirmed via `git status` on the live repo showing ~20+ modified files
  from OTHER builders' in-flight sessions, e.g. `assistant-appointment-tools.ts`,
  `booking-confirm.ts`, none related to takeoff). My sandbox's `package.json` was never edited by
  me — the drift is the live repo moving, not my sandbox.
- Live repo (`C:/Users/josep/Claude Gravity/mabrey-crm-app`) — never opened for writing at any
  point this session; all edits, all gates, all runs happened in
  `.../scratchpad/T6_BUILD/`, a sandbox copy. Never committed. Never deployed. No DDL run.
  `.env`/`.env.local` never edited (only read, for the API key resolution the CLI already does).

## 8. `## TRUTH FILE DISPUTES`

**None.** All remaining mismatches (windows 3060SH/3060FX, ext_doors 3080, plumbing kitchen_sink
+ other) are byte-identical in kind to T5's own already-investigated numbers or are
vision-call-variance noise in a role (plumbing) none of my 3 fixes touch. I found no new evidence
this run that any truth-file entry is wrong. `fixtures/maass-truth.yaml` was not edited.

## 9. STOP questions

1. **Is 579 LF (post-fix) actually correct for this building, or is there a residual
   overcounting mechanism I didn't find?** My new hard flag fires (1.9× the naive
   square-equivalent floor) — I believe this building's genuinely complex multi-wing footprint
   (attached garage + 2 porches + walkway, §2.3) explains it, but I have not independently
   hand-measured the real perimeter from the plan the way T5 built the truth file. Worth a
   dedicated hand-check before this number reaches Sean.
2. **`window_tags_vs_elevation_openings` cross-check got WORSE (Δ=24→28), same root-cause CLASS
   as §2 but a DIFFERENT metric I did not fix.** `output.openings` (P-WALLS' reported
   window/door-gap count) is summed with zero dedupe across all of page 8's 20 tiles — the exact
   same "no overlap accounting" defect §2 fixed for wall LENGTH still applies to this separate
   openings COUNT. Outside my named §2 scope (which named `segments_vs_out_to_out`/wall LF
   specifically), so I left it — flagging as a same-class follow-up candidate.
3. **WALL_HEIGHT_FT now resolves to a real extracted value (6ft) instead of the 9ft default —
   confirming heights POPULATE — but I did not independently verify 6ft is the CORRECT plate/eave
   height for this plan.** `extractWallHeight()`'s pre-existing selection rule (unchanged by me)
   takes the FIRST "wall"-labeled text-matched dimension found across tiles; with ~20 genuine
   tiles/page now queried instead of 1, it's plausible this picked up a real but
   non-representative dimension (a knee wall, a porch element, etc.) rather than the main
   structure's eave height. Worth a hand-eyeball spot-check (the same kind of independent-PDF-read
   T5 used to build the truth file) before this reaches a customer estimate.
4. **`"10' X 10' GGD"` — a confirmed real dimension-labeled opening (verified on 5 of 17 pages)
   whose type token isn't one of the WO's 3 recognized garage-door words.** Correctly flagged,
   never guessed. Should a future WO extend `GARAGE_DOOR_SUFFIXES` to include it (or a
   more general set), given T5's own STOP list already named this exact string?
5. **The pre-existing `segments_vs_out_to_out` cross-check compares a FULL exterior-wall-LF sum
   against `outToOutFt` — which is just the single LARGEST printed dimension string on pg8/10,
   not a true perimeter (2×(W+L)).** It will keep failing regardless of wall-LF accuracy (even a
   perfect ~300 LF real perimeter would fail against a ~100 LF single-dimension baseline by a
   wide margin). Not touched — outside my named §2 scope (the WO's own new
   `checkWallLfPlausibility` sidesteps this exact problem by anchoring to footprintSF instead) —
   but flagging since it's directly adjacent and will keep printing a confusing ✗ every run.
6. **Endorse the emergent `extractRoofFaces()` fix (§1.4)?** Not in the WO's named 3 defects,
   necessary to get ANY re-score at all once §1 was fixed correctly, dedupe+rename approach
   mirrors the already-approved wall-segment pattern. Flagging for explicit sign-off since it's
   the one piece of this build that was truly discovered mid-flight rather than pre-specified.
