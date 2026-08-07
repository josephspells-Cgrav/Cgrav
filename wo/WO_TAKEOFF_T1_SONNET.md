# WO-T1 — Takeoff schema + assembly library + apply path (Sonnet-5 builder, judgment-zero)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch off `showroom-integration`).
**You are a typist for a locked design.** Every formula, constant, label, and semantic below
is FINAL. Where this WO is silent, STOP and write the question into your build report — do
NOT invent. Contracts referenced as A1-A13 live in
`C:/Users/josep/Claude Gravity/wo/PLAN_TAKEOFF_MVP_20260807.md` → "Appendix A" (read that
appendix + "AMENDMENTS v2"; on any conflict, THIS WO wins).
**Never run deploys. Never touch prod env. Gates you must pass locally before reporting:
`npx tsc --noEmit` · `npm test` · `npm run build`.**

## 1. DDL — `scripts/apply-takeoff-ddl.mjs` (house pattern: copy the shape of `scripts/apply-os47-start-cadence-ddl.mjs`)

Idempotent, additive, with read-back verification printed:

```sql
ALTER TABLE estimate_line_items ADD COLUMN IF NOT EXISTS meta jsonb;
DO $$ BEGIN CREATE TYPE takeoff_run_status AS ENUM ('running','complete','aborted');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS takeoff_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid,
  project_id uuid NOT NULL REFERENCES estimate_projects(id),
  status takeoff_run_status NOT NULL DEFAULT 'running',
  model text NOT NULL,
  source_filename text NOT NULL,
  source_sha256 text NOT NULL,
  params_json jsonb,
  report_json jsonb,
  applied_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS takeoff_runs_project_id_idx ON takeoff_runs (project_id);
```

Mirror in `src/lib/db/schema.ts` with drizzle idioms matching the neighboring estimating
tables exactly (`idPk()`, `orgId()`, `createdAt()`, `updatedAt()`, pgEnum, index naming).
Export types `TakeoffRun`. The script takes the DB URL the same way the house DDL scripts do.

## 2. `src/lib/takeoff-assemblies.ts` — PURE module (zero imports beyond types; mirror `estimating.ts` style)

### 2a. Types
`Sourced<T>` + `TakeoffParams` EXACTLY per contract A1 (as amended by V3.2). `TakeoffLine`
output: `{assemblyKey, division, unit, label, quantity: string, meta: LineMeta, sort: number}`
where `LineMeta` is contract A3 (as amended by V3.1) minus `runId` and `appliedQty` — the
LIBRARY emits `{assemblyKey, lineKey, sourcePages, tile?, confidence, flagged, assumption?,
extractedQty, wastePct, unpriced}`; the APPLY layer stamps `runId` and `appliedQty` (=the
quantity string it writes).

**lineKey rule (V3.1):** `assemblyKey` alone for singleton lines; `assemblyKey:entityId` for
multi-line assemblies — `windows:3050SH` · `ext_doors:3068` · `garage_doors:16080` ·
`int_doors:2868` · `roof_covering:A` · `flooring:LVP` · `plumbing:water_closet` ·
`electrical:receptacles|switches|light_fixtures`. lineKeys MUST be unique within one
derivation (assert it).

### 2b. Constants — export `ASSEMBLY_DEFAULTS` as the LITERAL in contract A11 **as amended
by V3.2** (adds `WALL_HEIGHT_FT:9`, `CORNERS_DEFAULT:4`,
`R_VALUE_DEFAULT:{wall:"R-13",ceiling:"R-30"}`, `CROWN_DEFAULT:false`).

### 2c. Derivation — `deriveTakeoffLines(params: TakeoffParams): {lines: TakeoffLine[], assemblies: AssemblyReport[]}`

Canonical assembly keys, in this order (sort = index×10):
`concrete_slab, footings, seal_plate, wall_plates, ext_studs, int_studs, roof_structure,
roof_decking, roof_covering, wall_sheathing, windows, ext_doors, garage_doors,
insulation_walls, insulation_ceiling, electrical_devices, plumbing_fixtures, hvac_allowance,
int_doors, baseboard, crown, flooring, drywall, kitchen_allowance`.

Report grouping to Sean's 15 (contract A2 `assemblies[]` uses THESE 15 group keys):
1 concrete_slab+footings · 2 seal_plate · 3 ext_studs (+wall_plates ext share) · 4 wall_plates ·
5 int_studs · 6 roof_structure · 7 roof_decking · 8 roof_covering · 9 wall_sheathing ·
10 windows · 11 ext_doors+garage_doors · 12 insulation_walls+insulation_ceiling ·
13 electrical_devices+plumbing_fixtures+hvac_allowance · 14 int_doors+baseboard+crown ·
15 flooring+drywall+kitchen_allowance.

**Universal rules (apply in this order per line):**
- R-NET: compute net quantity per the formula.
- R-WASTE: if `WASTE[assemblyKey's waste key]` exists → **apply waste to the NET measured
  quantity BEFORE unit conversion (before any ceil), THEN convert, THEN round** per QTY_SCALE.
  Waste keys: ext_studs/int_studs→framing_studs · wall_sheathing→sheathing ·
  roof_decking→decking · drywall→drywall · roof_covering→roofing · flooring→flooring.
  Label suffix ` (incl N% waste)`; `meta.extractedQty` = the NET quantity converted+rounded
  the same way WITHOUT waste; `meta.wastePct` = N (0 on non-waste lines); `meta.assumption`
  gains `WASTE.<key>=N%`. Labels are DISPLAY-ONLY (identity is lineKey — V3.1).
- R-SCALE: round per `QTY_SCALE[unit]`, half-up, stored via `toFixed(scale)`.
- R-FLAG: a line is `flagged:true` if any consumed param has `flagged:true`, OR a named
  default was used, OR the shell rule below applies. `meta.assumption` concatenates the
  named default keys used (`; `-joined).
- R-SHELL: if `params.shellSystem.value !== "stick_frame"` → these keys get `flagged:true` +
  assumption `VERIFY_METAL_PACKAGE_BOUNDARY`: seal_plate, wall_plates, ext_studs,
  roof_structure, roof_decking, roof_covering, wall_sheathing. Quantities STILL computed.
- R-UNPRICED: hvac_allowance and kitchen_allowance lines set `meta.unpriced=true`.
- Every assembly key MUST terminate in a line OR an AssemblyReport status
  `na` with a reason — a key producing neither is a thrown error (`MissingAssemblyError`).

**Formulas (FINAL — implement verbatim):**
| key | division | unit | formula |
|---|---|---|---|
| concrete_slab | foundation | cy | Σ slabs: areaSf × (thicknessIn/12) / 27 |
| footings | foundation | cy | (widthIn/12) × (depthIn/12) × perimeterLf / 27 |
| seal_plate | framing | lf | Σ extWalls.lengthFt × 1 (label `PT seal plate — exterior walls`) |
| wall_plates | framing | lf | 2 × Σ extWalls.lengthFt + 3 × Σ intWalls.lengthFt (label `Wall plates — double top (ext) + full stack (int)`) |
| ext_studs | framing | ea | Σ per ext segment: ceil(lengthFt×12/OC_IN)+SEGMENT_STARTER; + corners.value×CORNER_STUDS; + (Σ windows.count + Σ extDoors.count + Σ garageDoors.count)×OPENING_STUDS |
| int_studs | framing | ea | Σ per int segment: ceil(lengthFt×12/OC_IN)+SEGMENT_STARTER; + Σ intDoors.count×OPENING_STUDS |
| roof_structure | framing | ea | ceil(roof.ridgeLf×12/TRUSS_OC_IN)+1 — ALWAYS assumption `TRUSS_OC_IN` unless params flag says extracted (label `Roof trusses @24" OC (verify supplier layout)`) |
| roof_decking | framing | ea | net sheets input = Σ roof.faces.areaSf / 32 (waste-then-ceil per R-WASTE: ceil((SF×1.10)/32)); if roof.decked === "unknown" → also flagged `DECKING_PRESENCE_UNKNOWN`; if "no" → status na, reason `metal on purlins — no decking`, NO line |
| roof_covering | roofing | sq | ONE line PER face: areaSf/100 (label `Roof covering — <covering>, <face name>`) |
| wall_sheathing | framing | ea | net SF = Σ ext wall (lengthFt×heightFt) + gableEndsSf; gableEndsSf = 2 × (endSpanFt × riseFt / 2) where endSpanFt = shortest ext segment length, riseFt = (endSpanFt/2)×(pitchNum/12), pitchNum parsed from roof.pitch "N/12"; if pitch unparseable → gableEndsSf=0 + flagged `GABLE_ENDS_EXCLUDED_PITCH_UNKNOWN`. sheets = ceil((netSF×1.10)/32) |
| windows | exterior | ea | one line per tag: label `Windows — <tag> (<W>×<H>)`, qty = count |
| ext_doors | exterior | ea | one line per tag: `Exterior doors — <tag>` |
| garage_doors | exterior | ea | one line per tag: `Garage door — <tag>` |
| insulation_walls | insulation_drywall | sf | Σ ext wall lengthFt×heightFt (no gables) — label `Wall insulation` |
| insulation_ceiling | insulation_drywall | sf | ceiling.surfaceSf — label `Ceiling insulation` |
| electrical_devices | electrical | ea | 3 lines: `Receptacles` outlets · `Switches` switches · `Light fixtures` lightFixtures |
| plumbing_fixtures | plumbing | ea | one line per plumbing[] entry: label = type with `_`→` ` capitalized (`Water closet`) |
| hvac_allowance | mechanical | ls | qty 1 — label `HVAC system — <heatedSf toLocaleString> heated SF (allowance)`; unpriced; flagged |
| int_doors | interior_finishes | ea | one line per tag: `Interior doors — <tag>` |
| baseboard | interior_finishes | lf | Σ rooms.perimeterLf − Σ(intDoors count×2×widthFt) − Σ(extDoors count×widthFt) − (Σ garageDoors widthFt IF any room name contains "GARAGE" else 0) |
| crown | interior_finishes | lf | Σ perimeterLf of rooms with crown=true; if ZERO rooms → NO line, assembly note `crown: none` (status derived on group 14) |
| flooring | interior_finishes | sf | one line per distinct floorFinish: Σ areaSf (label `Flooring — <finish>`) |
| drywall | insulation_drywall | sf | (Σ intWalls lengthFt×heightFt)×2 + Σ extWalls lengthFt×heightFt + ceiling.surfaceSf — label `Drywall (int both faces + ext interior face + ceilings)` |
| kitchen_allowance | cabinets_counters | ls | qty 1 — label `Kitchen — cabinets/counters ALLOWANCE`; unpriced; flagged |

### 2d. GOLDEN FIXTURE (authored by OS48 — your tests assert EXACTLY these outputs)

Test file: `src/lib/takeoff-assemblies.test.ts`. **Register it by FULL PATH in package.json's
test list (the house "test" script is a hand-list — a test not listed never runs).**

FIXTURE-1 params (all Sourced fields `confidence:"high", flagged:false, sourcePages:[7]`
unless stated): shellSystem `"stick_frame"` · extWalls
`[{id:"N",lengthFt:40,heightFt:9},{id:"E",lengthFt:30,heightFt:9},{id:"S",lengthFt:40,heightFt:9},{id:"W",lengthFt:30,heightFt:9}]`
· intWalls `[{id:"P1",lengthFt:30,heightFt:9}]` · corners 4 · windows
`[{tag:"3050SH",widthFt:3,heightFt:5,count:4},{tag:"3060FX",widthFt:3,heightFt:6,count:2}]`
· extDoors `[{tag:"3068",widthFt:3,heightFt:6.667,count:2}]` · intDoors
`[{tag:"2868",widthFt:2.667,heightFt:6.667,count:2}]` · garageDoors
`[{tag:"16080",widthFt:16,heightFt:8,count:1}]` · rooms
`[{name:"GREAT",areaSf:600,floorFinish:"LVP",crown:false,perimeterLf:100},
{name:"KITCHEN",areaSf:200,floorFinish:"LVP",crown:false,perimeterLf:60},
{name:"BED1",areaSf:250,floorFinish:"CARPET",crown:false,perimeterLf:64},
{name:"BATH",areaSf:150,floorFinish:"TILE",crown:false,perimeterLf:50}]`
· areaSchedule `[{name:"LIVING",areaSf:1200}]` · slabs
`[{name:"MAIN",areaSf:1200,thicknessIn:4}]` · footings
`{perimeterLf:140,widthIn:12,depthIn:20}` · roof
`{faces:[{name:"A",areaSf:671},{name:"B",areaSf:671}],pitch:"6/12",covering:"metal R-panel",ridgeLf:40,decked:"yes"}`
· ceiling `{surfaceSf:1200,vaulted:"no"}` · electrical `{outlets:20,switches:8,lightFixtures:12}`
· plumbing `[{type:"water_closet",count:2},{type:"lavatory",count:2},{type:"tub_shower",count:1},{type:"kitchen_sink",count:1},{type:"water_heater",count:1}]`
· hvac `{heatedSf:1200}`.

EXPECTED (assert key, unit, quantity string, flagged, extractedQty where waste applies —
33 lines total; assert the FULL count):
- concrete_slab cy `"14.81"` (1200×(4/12)/27 = 14.8148→2dp)
- footings cy `"8.64"` (1×(20/12)×140/27 = 8.6419→2dp)
- seal_plate lf `"140"`
- wall_plates lf `"370"` (2×140 + 3×30)
- ext_studs ea `"147"` flagged (WASTE) — net 140 = [40′→31, 30′→24, 40′→31, 30′→24 =110] + 4×3 + 9×2; 140×1.05=147
- int_studs ea `"29"` flagged (WASTE) — net 28 = 24 + 2×2; 28×1.05=29.4→29
- roof_structure ea `"21"` flagged (TRUSS_OC_IN) — ceil(40×12/24)+1
- roof_decking ea `"47"` flagged (WASTE) — ceil((1342×1.10)/32)=ceil(46.13); extractedQty `"42"` (ceil(1342/32))
- roof_covering sq × 2 lines: face A `"7.38"`, face B `"7.38"` flagged (WASTE) — (671×1.10)/100=7.381→2dp; extractedQty `"6.71"`
- wall_sheathing ea `"52"` flagged (WASTE) — net SF 1260+225 (gables: endSpan 30, rise 7.5, 2×112.5); ceil((1485×1.10)/32)=ceil(51.05); extractedQty `"47"`
- windows ea: 3050SH `"4"` · 3060FX `"2"`
- ext_doors ea `"2"` · garage_doors ea `"1"`
- insulation_walls sf `"1260"` · insulation_ceiling sf `"1200"`
- electrical ea: `"20"`, `"8"`, `"12"` (3 lines)
- plumbing ea: `"2"`,`"2"`,`"1"`,`"1"`,`"1"` (5 lines)
- hvac_allowance ls `"1"` unpriced flagged
- int_doors ea `"2"`
- baseboard lf `"257"` (274 − 2×2×2.667 − 2×3 − 0 = 257.332→int)
- crown: NO line; group-14 note `crown: none`
- flooring sf: LVP `"864"` (800×1.08) · CARPET `"270"` · TILE `"162"` — each flagged (WASTE), extractedQty `"800"`/`"250"`/`"150"`
- drywall sf `"3300"` flagged (WASTE) — net 540+1260+1200=3000; extractedQty `"3000"`
- kitchen_allowance ls `"1"` unpriced flagged

FIXTURE-1B: same params with shellSystem `"hybrid_metal_shell"` → assert the R-SHELL key set
(seal_plate, wall_plates, ext_studs, roof_structure, roof_decking, roof_covering,
wall_sheathing) all `flagged:true` with assumption containing `VERIFY_METAL_PACKAGE_BOUNDARY`,
quantities UNCHANGED from FIXTURE-1.

FIXTURE-1C: roof.decked `"no"` → roof_decking has NO line, group-7 report status `na` with
reason `metal on purlins — no decking`. roof.pitch `"bad"` → wall_sheathing net = 1260,
sheets `"44"` (ceil((1260×1.10)/32) = ceil(43.31) = 44), flagged includes
`GABLE_ENDS_EXCLUDED_PITCH_UNKNOWN`.

FIXTURE-1D: FIXTURE-1 with every wall `heightFt` set to `undefined`/absent → derivation
uses `WALL_HEIGHT_FT` default 9: quantities IDENTICAL to FIXTURE-1, but ext_studs,
int_studs, wall_sheathing, insulation_walls, drywall all `flagged:true` with assumption
containing `WALL_HEIGHT_FT`.

Also assert: (a) lineKey uniqueness across the 33 FIXTURE-1 lines; (b) spot-check lineKeys
`windows:3050SH`, `roof_covering:A`, `flooring:LVP`, `electrical:receptacles`, `baseboard`;
(c) every line's `meta.wastePct` (5 on stud lines, 10 on sheathing/decking/covering/drywall,
8 on flooring, 0 elsewhere); (d) MissingAssemblyError class exists and the happy path covers
all 24 keys / 15 groups.

## 3. Apply path — `src/lib/takeoff-apply.ts` (ONE writer, contract A5)

`applyTakeoffRun(db, {projectId, runId, baseUpdatedAt, force?}): Promise<ApplyResult>` —
**order per V3.1 (F10): verify → writes → appliedAt → token-commit.**
1. **VERIFY (read-only):** org-scope-resolve the project exactly like the existing
   line-items route; check `updated_at === baseUpdatedAt` → mismatch: return
   `{status:"stale", currentUpdatedAt}` (route → 409). Load run (must belong to projectId;
   status `complete`) + existing line items.
2. **Hand-edit detection (V3.1):** existing rows with `meta.runId` where
   `meta.appliedQty !== quantity` → if any and !force → `{status:"handEdited",
   lines:[...]}` (route → 409 with the list). Labels are NOT part of the guard — hand
   renames are free.
3. **Merge (pinned):** match incoming↔existing by `(meta.assemblyKey, meta.lineKey)` →
   carry over `materialCents`, `laborCents`, `sort` when the existing row has any non-zero
   cents (hand-set); unmatched incoming → insert; existing EXTRACTION lines (have `meta`)
   not matched → delete; rows WITHOUT `meta` (hand lines) → KEEP untouched. force=true:
   write extraction qty over hand-edited rows but STILL preserve cents.
   Row-wise insert/update/delete ONLY — never delete-then-insert; every write idempotent
   (safe to re-run after a crash).
4. Stamp on every written line: `meta.runId = runId`, `meta.appliedQty = <quantity as
   written>`. Then set `takeoff_runs.applied_at = now()`.
5. **COMMIT (single conditional statement):** `UPDATE estimate_projects SET updated_at =
   now() WHERE id = $projectId AND updated_at = $baseUpdatedAt RETURNING id` — 0 rows →
   return `{status:"conflict"}` (route → 409; nothing claims success). Crash signature
   (document in a comment): `applied_at` null + token advanced ⇒ caller refetches and
   re-applies; idempotent writes make the retry safe.
6. Return `{status:"applied", inserted: [{label, lineKey}...], updated, deleted, kept}` —
   `inserted[]` feeds the T3 apply summary (the hand-line-duplication eyeball tripwire).

## 4. Route changes (T1 owns; contract A4)

- `src/app/api/estimate-projects/[id]/line-items/route.ts`: `lineSchema` gains
  `meta: z.record(z.string(), z.unknown()).nullable().optional()`; insert maps it; the PUT
  body gains REQUIRED `baseUpdatedAt: z.string()`; token gate identical to §3 step 1 (0 rows
  → 409 `{error:"stale", currentUpdatedAt}`). Existing tests that PUT without the token: update
  them to pass it (fetch the project's updatedAt first) — do NOT weaken the requirement.
- NEW `src/app/api/estimate-projects/[id]/takeoff-runs/route.ts`: GET → list runs for the
  project `{id, status, model, sourceFilename, createdAt, appliedAt, reportJson}` org-scoped.
- NEW `src/app/api/estimate-projects/[id]/takeoff-runs/[runId]/apply/route.ts`: POST body
  `{baseUpdatedAt, force?}` → calls `applyTakeoffRun` → 200/409 per §3. Follow the house
  `withErrors/json/parse` idioms from the neighboring routes.
- The project GET that serves the estimating page must include `meta` on line items
  (contract C23 in the plan): find the serializer the page uses and include the column.

## 5. Tests (all registered by FULL PATH in package.json)

- `src/lib/takeoff-assemblies.test.ts` — §2d fixtures (1, 1B, 1C).
- `src/lib/takeoff-apply.test.ts` — stale at VERIFY → `stale` · hand-edit (appliedQty ≠
  quantity) refuse → list · WASTE lines with untouched qty do NOT trip the guard
  (appliedQty === quantity even though extractedQty differs — the V3.1 F1 regression) ·
  label rename alone does NOT trip the guard and still matches by lineKey (prices kept) ·
  force writes qty but preserves cents · hand lines KEPT · unmatched extraction lines
  deleted · runId + appliedQty stamped · 0-rows at COMMIT → `conflict`, no success claim.
  Use the house test DB mocking pattern from the neighboring estimating tests
  (`estimating-db` tests show the idiom).
- Route test: apply → autosave PUT (with meta round-tripped + token) → meta INTACT (the F1
  regression, named `meta survives autosave`).

## 6. Build report — `C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_T1.md`

Gates output (tsc/test/build verbatim tails) · files touched · every STOP question · every
place you had to read a house idiom and copy it (name the source file). Do not deploy. Do not
run the DDL against any database — the DDL script is CODE deliverable only; OS48 runs it.
