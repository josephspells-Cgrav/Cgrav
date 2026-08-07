# WO-T2 — Text-first extraction pipeline + Maass runner + validation harness (Sonnet-5, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch off the post-T1 merge —
T1's schema, `takeoff-assemblies.ts`, and `takeoff-apply.ts` exist when you start; you
CONSUME them, never modify them).
**You are a typist for a locked design.** Where this WO is silent, STOP and write the
question into your build report. Contracts A1-A13 + AMENDMENTS V2/V3 in
`C:/Users/josep/Claude Gravity/wo/PLAN_TAKEOFF_MVP_20260807.md` are law (WOs cite V2/V3
sections only; ignore superseded §0/D2/D3/D5). Probe facts:
`C:/Users/josep/Claude Gravity/wo/PROBE_TAKEOFF_PDF_20260807.md`.
**Gates:** `npx tsc --noEmit` · `npm test` · `npm run build`. Tests NEVER call the live
API or read the real PDF — fixtures only (§7). Never deploy. Never run against any DB
except via `--dry` during your own smoke check.

## 0. GATE 0 — feasibility, FIRST commit
`scripts/takeoff-gate0.mts`: load the PDF at `--pdf`, print page count + PDF page box dims
(pts + inches) per page · run `pdfjs-dist` (legacy build) `getTextContent()` on pages 5, 7,
8, 9, 15 and print char counts · rasterize page 15 at 200 DPI via `@hyzyla/pdfium` and
print the px dims + write `gate0-p15.png` to the cache dir. HALT the whole WO and report if
pdfium fails on Windows (mupdf is the NAMED fallback — a reported decision, not a silent
swap). New deps allowed: `pdfjs-dist`, `@hyzyla/pdfium` only.

## 1. Files you create
- `scripts/takeoff-run.mts` — the CLI (contract A6, verbatim flags/exits).
- `src/lib/takeoff-extract.ts` — stages S1-S4 as pure-ish functions (API calls injected —
  see §6 — so tests run without network).
- `src/lib/takeoff-vision.ts` — the raw-fetch Anthropic caller (house pattern: mirror
  `agent-loop.ts` — raw fetch, streaming optional OFF here, `anthropic-version: 2023-06-01`,
  NEVER temperature/top_p; `cache_control` on the static system block; AbortSignal 90s;
  3 retries with backoff on 429/529; request `max_tokens: 4096`).
- `scripts/takeoff-validate.mts` — the harness (§8).
- `fixtures/takeoff/` — the S4 test fixtures (§7, authored below — copy verbatim).
- Cache: `.takeoff-cache/<sourceSha256>/` (gitignore it) — keys per V3.3:
  `(sourceSha256, page, stage, model, promptHash)`; promptHash = sha256 of the exact prompt
  string constant.

## 2. The stages (text-first per V2.0/V3.3)

**S0 TEXT:** `getTextContent()` every page → per-page items `[{str, x, y, w}]` (transform
→ page coords). Cache stage `text`.

**S1 CLASSIFY (code, no model):** title-block region = items with x > 0.82×pageW. Sheet id =
last match of `/\b([A-Z]\d+-\d+[a-z]?)\b/` in that region; sheet name = the region's longest
non-date text run adjacent to the id. For THIS file (sha-gate it: if sourceSha256 matches the
Maass file the runner records, ASSERT the map equals A13's table and abort with a clear
message if not) the expected map is A13. Generic sets: type from id prefix + name keywords
(A0→notes/cover, A1→floor_plan, A2→roof, A3→elevation, C→foundation, E→electrical,
P→plumbing, S→structural, name containing SCHEDULE→schedule, 3D VIEWS→threed).

**S2 ROUTE:** per A13 for this set; generic routing per the V1 entity table AS AMENDED
(union-with-provenance V3.3 for schedules; heights from elevations V3.2).

**S3 EXTRACT per role:**
- *Notes (pg 5, 6):* CODE text search, no model: slab thickness (`/(\d+)\s*("|IN)?\s*(THICK|SLAB)/i`
  window around "SLAB"/"CONCRETE"), R-values (`/R-?\d{2}/g` + nearest WALL/CEILING/ATTIC
  token), decking evidence (OSB/DECK/PURLIN tokens → decked yes/no/unknown), covering
  candidates (STANDING SEAM / R-PANEL / SHINGLE tokens). Ambiguity (e.g. both roofing
  tokens, which pg 5 DOES contain) → value "ambiguous:<a|b>", flagged, class
  extraction_uncertainty.
- *Area schedule (pg 7):* CODE — anchor "AREA SCHEDULE", collect `(NAME tokens, \d+ SF)`
  pairs + `Grand total`. Cross-check Σ parts vs grand total (exact) else flag.
- *Rooms (pg 7):* CODE first — room-name tokens (ALL-CAPS words not in a pinned stop-list
  {AREA, SCHEDULE, PLAN, FLOOR, SF, GRAND, TOTAL, NAME, LEGEND}) paired to nearest `\d+ SF`
  item within radius 0.04×pageW; unpaired names → vision assist on pg 7 tiles with P-ROOMS.
  Room perimeterLf is NOT extractable → derive rectangle-equivalent: perimeterLf =
  2×(areaSf/w + w) is UNDERDETERMINED — pinned MVP rule: perimeterLf = 4×sqrt(areaSf)
  (square-equivalent), flagged `PERIMETER_SQUARE_EQUIV` (class extraction_uncertainty) on
  the baseboard/crown lines only. floorFinish: from finish tokens near the room name if
  present (LVP/CARPET/TILE/WOOD/CONCRETE) else "unknown" → flooring lines by finish
  "unknown" get flagged. crown: per V3.2 CROWN_DEFAULT.
- *Dimension strings (pg 8, 10):* CODE — collect all `/\d+'\s*-?\s*\d*(?:\s*\d+\/\d+)?"?/`
  items with coords from BOTH pages (merged by identical string+near-coords, never
  additive).
- *Wall segments (pg 8 + 14):* VISION ASSOCIATION (geometry class, 150 DPI, ≤20 tiles/page)
  with P-WALLS. The model NEVER outputs numbers it computed — it quotes dimension strings
  VERBATIM + orientation + ext/int class per segment. CODE matches each quoted string to a
  text-layer item (exact string match required; unmatched quote → dropped + flagged) — the
  TEXT value is authoritative (V3.3 arbiter). extWalls[]/intWalls[] assembled in code;
  heights from elevations (below). Cross-checks (code): Σ ext segments per axis ≈ overall
  out-to-out dims from pg 10/14 text (±0.5 ft, else flag class extraction_uncertainty);
  corners = count of direction changes in the vision-reported exterior loop when the loop
  closes, else CORNERS_DEFAULT flagged.
- *Heights (pg 12, 13):* CODE — vertical dim candidates from elevation text; vision assist
  P-HEIGHTS quotes the wall-height dim verbatim per elevation; text-match rule as above;
  else WALL_HEIGHT_FT default flagged.
- *Tags (pg 9):* CODE — window/door tag histogram from text items matching
  `/^\d{4}(SH|FX|SL|DH|CA)?$/`, EXCLUDING items inside the legend region (anchor "WALL
  LEGEND"/"OTHER LEGEND" block bbox + margin). Dims decoded from the tag itself
  (`3060SH` → 3'0"×6'0"): first two digits = feet+inches width, last two = height —
  decode `WWHH` as W=W1'W2", H=H1'H2". Doors (4-digit no-suffix tags like `3080`, `2680`)
  → ext vs int by proximity to the exterior wall loop from S3-walls when available;
  UNDETERMINED → ext_doors with flag (class extraction_uncertainty; missing lines are the
  failure, misclassified ext/int is Sean-fixable). Garage doors: width ≥ 8' (`16080` →
  16'0"×8'0").
- *Roof (pg 11 + elevations):* pitch — CODE search `/\b\d{1,2}\s*[:/]\s*12\b/` across all
  pages (pg 11-13 priority). Faces — VISION P-ROOF on pg 11 geometry tiles: name faces,
  quote the two defining dims per face VERBATIM; CODE computes areaSf from matched text
  values ONLY (slope factor: areaSf × sqrt(1+(pitch/12)^2) applied in CODE when the quoted
  dims are plan-projected — the prompt asks which). ridgeLf: quote the ridge dim verbatim.
  Any face whose dims don't text-match → flagged, area from remaining faces only, NEVER
  invented.
- *Electrical (pg 15):* VISION SYMBOL COUNT (symbol class, 200 DPI, ≤35 tiles) with
  P-SYMBOLS-E. Overlap dedupe (pinned): a symbol whose center falls within the right/bottom
  8% overlap band of a tile is counted ONLY by the next tile; code applies this from the
  reported normalized centers. Confidence low (rubric V3.3).
- *Plumbing (pg 16):* P-SYMBOLS-P same mechanics; type from adjacent text labels when the
  text layer has them (text corroboration → med).
- *Shell (pg 9 legend + pg 17):* CODE — the pg 9 legend text (HYBRID/GIRTS/METAL BUILDING
  SHELL tokens) → shellSystem "hybrid_metal_shell" high confidence, sourcePages [9,17].

**S4 RECONCILE (pure code):** assemble `TakeoffParams` (contract A1 shape exactly, V3.2
fields); run cross-checks (Σ rooms vs area schedule ±3% · Σ segments vs out-to-out ±0.5' ·
roof faces ≥ footprint · window tag count vs vision-visible openings on elevations ±2
aggregate when P-WALLS reported them); populate confidences per the V3.3 rubric; every
default per A11 emits its pinned flag text.

**S5/S6:** `deriveTakeoffLines(params)` (T1) → create draft `estimate_projects` row
(`--contact-id`/`--create-contact`, DEFAULT_ORG explicit, name = `Takeoff — <pdf filename>`,
blueprintUrl null MVP) → `takeoff_runs` row created at START (`status='running'`,
params/report written incrementally per V2.3) → `applyTakeoffRun` (T1, fresh project ⇒
token trivially green) → finalize `status='complete'` + reportJson (contract A2: sheets
table, 15 assembly groups, crossChecks, flags WITH class field, cost/tokens) → print the
human table to stdout.

## 3. THE PROMPTS (verbatim constants in `takeoff-extract.ts` — you never edit wording)

System block (shared, cache_control on):
```
You read US residential construction drawings. You NEVER compute, add, convert, or estimate
numbers. You quote text you can see VERBATIM, character for character. If you cannot read
something, you output "unknown" for it. You respond with ONLY the JSON the user schema
requests — no prose.
```

P-WALLS (per geometry tile of pg 8; user content = the tile image + this text):
```
This is one tile of a floor DIMENSION plan (tile <r,c> of <R,C>; tiles overlap 8%).
Identify wall segments visible in this tile. For each segment output:
{"orientation":"h"|"v","cls":"ext"|"int","dim":"<the dimension string labeling this
segment, quoted VERBATIM, or 'unknown'>","cx":<0-1 normalized center x in THIS tile>,
"cy":<0-1>}. Also output "loop": an ordered list of the exterior corner points you can see
as {"x":<0-1>,"y":<0-1>} (empty if none), and "openings": count of window/door gaps visible
in exterior walls. JSON: {"segments":[...],"loop":[...],"openings":<n>}
```

P-HEIGHTS (per geometry tile of pg 12/13):
```
This is one tile of a building ELEVATION sheet. Find vertical dimension strings that label
wall height or plate height (eave height). Output each VERBATIM with what it labels:
{"heights":[{"dim":"<verbatim>","labels":"wall"|"plate"|"ridge"|"other"}]}. Nothing
visible: {"heights":[]}
```

P-ROOF (per geometry tile of pg 11):
```
This is one tile of an overhead ROOF LAYOUT plan. Identify roof faces (planes) visible in
this tile. For each: {"name":"<letter you assign, stable left-to-right top-to-bottom>",
"dims":["<verbatim dim string>","<verbatim dim string>"],"projected":true|false
("projected" true if these are plan-view dims, false if a slope dim is printed)}. Also
{"ridge":"<verbatim ridge-length dim or 'unknown'>"}.
JSON: {"faces":[...],"ridge":"..."}
```

P-SYMBOLS-E (per symbol tile of pg 15):
```
This is one tile of a residential ELECTRICAL plan (tile <r,c> of <R,C>; tiles overlap 8%).
Count electrical symbols FULLY VISIBLE in this tile by category: duplex receptacles
(circle with two lines), switches (S, S3, SD letters), ceiling/wall light fixtures (circle
crosses, cans, fans count as fixtures). For each counted symbol also output its normalized
center {"x":<0-1>,"y":<0-1>,"kind":"receptacle"|"switch"|"fixture"}.
JSON: {"symbols":[...]}
```

P-SYMBOLS-P (pg 16): same shape, kinds `"water_closet"|"lavatory"|"tub_shower"|
"kitchen_sink"|"water_heater"|"other"` with the note: `Use adjacent text labels when
present; unlabeled fixtures = "other".`

P-ROOMS (pg 7 assist, only for names S3-code could not pair):
```
This is one tile of a floor plan. List room name labels visible with their printed area if
one is printed beside them: {"rooms":[{"name":"<verbatim>","areaSf":"<verbatim number or
'unknown'>"}]}
```

## 4. CLI (contract A6 verbatim) + posture
Key from `C:/Users/josep/king_maker_outbound/config/.env` `ANTHROPIC_API_KEY` — refuse to
run if the value contains `[SENSITIVE]` or is absent (print WHERE you looked). DB URL: the
script takes `--db-env <path>` the same way the house DDL scripts do; `--dry` runs S0-S5
and prints, writing NOTHING. Model default `claude-sonnet-5` via `TAKEOFF_MODEL` env or
`--model`. Cost meter: sum usage from every response; abort at $15 → status `aborted` +
partial report (V2.3). PRICES constant (dated 2026-08-07): sonnet-5 in $3/M · out $15/M;
opus-5 in $15/M · out $75/M; image tokens billed as input.

## 5. Determinism law (law 1)
Extraction writes ONCE per run. Totals always compute from stored rows. Re-running is a NEW
run (new runId) — the report includes a DIFF section vs the project's last applied run
(param-level: fields whose value changed, lines added/removed/qty-changed) so extraction
variance is VISIBLE, gated by apply, never silent.

## 6. Testability seam
`takeoff-extract.ts` functions take `callModel: (req) => Promise<resp>` injected;
`takeoff-vision.ts` provides the real one; tests inject stubs returning §7 fixtures. No
network in tests, no PDF in tests (S0 output shapes are fixtures too).

## 7. S4/S3 TEST FIXTURES (authored by OS48 — copy VERBATIM into `fixtures/takeoff/`)

**fx-walls-1.json** — text items: `[{"str":"40' - 0\"","x":500,"y":100},{"str":"30' - 0\"",
"x":90,"y":400},{"str":"12' - 6\"","x":300,"y":420}]`; P-WALLS stub output (one tile):
`{"segments":[{"orientation":"h","cls":"ext","dim":"40' - 0\"","cx":0.5,"cy":0.1},
{"orientation":"v","cls":"ext","dim":"30' - 0\"","cx":0.1,"cy":0.5},
{"orientation":"h","cls":"int","dim":"12' - 6\"","cx":0.4,"cy":0.6},
{"orientation":"h","cls":"int","dim":"99' - 9\"","cx":0.7,"cy":0.7}],"loop":[],"openings":2}`
EXPECT: 3 matched segments (40, 30, 12.5 ft — parse feet+inches to decimal), the `99' - 9"`
quote has NO text match → dropped + one flag `{class:"extraction_uncertainty"}` mentioning
`unmatched vision quote`; ext segments [40,30], int [12.5].

**fx-tags-1.json** — text items: `3060SH` ×3 at plan coords, `3060SH` ×1 inside legend bbox
(legendRegion `{x0:0,y0:0,x1:200,y1:300}`, item at `{x:80,y:150}`), `3080` ×2 plan, `2024`
×1 plan (not a tag — fails the regex? `2024` MATCHES `\d{4}` — expected behavior pinned:
4-digit bare tags require BOTH digits pairs to parse to plausible door/window dims 1-9 ft
wide 6-9 ft high: `2024` → 2'0"×2'4" height 2'4" < 6' → REJECTED as a tag). EXPECT:
windows `{"3060SH": 3}` (legend instance excluded), doors `{"3080": 2}`, `2024` rejected.

**fx-symbols-1.json** — two adjacent tiles (r0c0, r0c1), overlap band 8%: tile1 symbols:
receptacle at `{x:0.5}`, receptacle at `{x:0.95}` (in right overlap band); tile2: the same
band symbol reported again at `{x:0.03}` + switch at `{x:0.5}`. EXPECT: receptacles 2 total
(band symbol counted once, by tile2), switches 1.

**fx-rooms-1.json** — pg7-style text items: `GREAT` + `600 SF` within radius → paired;
`FLEX` with no area item within radius → unpaired (goes to vision list); stop-list tokens
`AREA`,`SCHEDULE` present → never rooms. EXPECT: rooms [{GREAT,600}], pendingVision
["FLEX"], perimeterLf for GREAT = 4×sqrt(600) = 97.9795… → `"98"` (integer half-up) with
flag `PERIMETER_SQUARE_EQUIV`.

**fx-notes-1.json** — pg5-style text containing both `STANDING SEAM` and `R-PANEL` tokens +
`R-13` near `WALL` + a `4" SLAB` phrase. EXPECT: covering
`ambiguous:standing_seam|r_panel` flagged extraction_uncertainty; wall R-value `R-13`;
slab thickness 4.

**fx-crosscheck-1.json** — rooms summing 1150 vs areaSchedule LIVING 1200 (±3% = 36 →
50 off) EXPECT crossCheck `rooms_vs_area_schedule` FAIL + flag; segments Σx = 40.0 vs
out-to-out 40'0" EXPECT pass.

Tests assert these EXACT outputs (`src/lib/takeoff-extract.test.ts`, registered by FULL
PATH in package.json's hand-list).

## 8. Harness — `scripts/takeoff-validate.mts` (contract A8)
Reads `fixtures/maass-truth.yaml` (may be ABSENT — then print "no truth file yet" and exit
0) + the run's reportJson/params from the DB (or `--from-json <path>` for a dry run) →
per-assembly table: counted entities exact-match (integer counts) / ±2% (areas, LF);
missing required line = FAIL; counted vs derived NEVER blended; extraction_uncertainty
flag-share per assembly; exit 0 always (it reports, it does not gate).

## 9. Smoke check allowed (the ONLY live call you may make)
ONE run: `takeoff-run.mts --pdf <the Maass path> --pages 7 --dry --model claude-sonnet-5`
(text-only page → zero image tokens) to prove the plumbing. Print its output in the build
report. Nothing else live. OS48 runs the full Maass extraction — not you.

## 10. Build report — `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T2.md`
Gate-0 output verbatim · gates tails · files · STOP questions · the smoke-check output ·
any deviation proposals (proposed, never applied).
