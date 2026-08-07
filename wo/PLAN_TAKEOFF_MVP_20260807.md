# PLAN — Takeoff Tool MVP (material counts off the PDF) — 2026-08-07

**Author:** OS48 (Fable, vault-agent) · **Mode:** YOLO + paranoia + kimi-baton on this plan
**Builders:** Sonnet-5 sub-agents ONLY (Joseph's tier call, 04:28am 08-07) — judgment lives HERE and in the WOs; builders type.
**Repo:** `mabrey-crm-app` (branch `showroom-integration`, prod `0.1.0+7e3b551`)

## 0. Mission (the MVP lock, verbatim scope)

Joseph 08-06 6:04pm, closing discovery himself: *"This is just a material count tool... the
basic MVP is a count of the raw materials that's needed."*

**MVP = (1) raw material COUNTS off the plan PDF, per Sean's 15-assembly method · (2) a price
FILL-BOX on every line (they walk Home Depot and type it in) · (3) AUTO-MULTIPLY → line totals
+ rollup.** Deferred: cost book content, metal-shell supplier boundary, ±5% pricing claims.

**The live artifact:** `SS Lake — MAASS BARNDO (Fairfield IV MOD)` — 122-page ARCH-E (36×48)
set, 11.9MB, at `C:/Users/josep/Downloads/SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf`.
A REAL Mabrey Construction job. The Maass answer key DOES NOT EXIST (Sean: "we don't currently
know") — accuracy is proven against the PLANS, hand-verified. Validate-by-hand first,
productize second.

## 1. Laws that bind this build

1. **MODELS READ, CODE MULTIPLIES.** A model may extract dimensions/counts and flag ambiguity.
   Every multiplication and every derivation is deterministic TS, golden-tested to the cent.
   Two runs must never give two numbers on money a deposit is taken against: totals ALWAYS
   compute from STORED rows (qty × typed price); the PDF is never re-read at price time.
2. **CRM TAB, NOT A DEDICATED AGENT.** `estimate_projects` already has blueprint upload
   (Vercel Blob `blueprintUrl`), line items (decimal qty × snapshotted cents, editable, custom
   lines allowed), a PURE compute engine (`src/lib/estimating.ts` — "THE golden-test seam"),
   versioning with a race-safe unique index, and the `/estimating` UI. **The build = the
   EXTRACTION + review affordances.** Qty-box × price-box × auto-multiply is ALREADY LIVE.
3. **MISSING LINES ARE THE FAILURE; EXTRA FLAGGED LINES ARE CHEAP.** Count everything per
   Sean's method; lines a metal package later covers get flagged/zeroed, never omitted. Every
   one of the 15 assemblies terminates in: extracted / derived / FLAGGED / n-a-with-reason.
   Silent absence is a bug class, enforced by a completeness gate in the run report.
4. **FLAG, DON'T GUESS.** Ambiguity (dedupe conflict, cross-check miss, low confidence,
   assumption-based derivation) surfaces as a flagged line for Sean's review — never lands
   silently in a total.
5. **A NAIVE TAG-SCRAPE OVER-COUNTS 3-5×** (probed 08-06: same window on plan + elevations +
   electrical = 95 tag instances, 4 real types). Dedupe by AUTHORITATIVE SHEET is the core
   extraction problem — one routing table decides which sheet owns which entity class.
6. House API law: **raw fetch, no SDK** (mirror `agent-loop.ts` / `vapi.ts`). Never send
   temperature/top_p (400s on Opus 4.8/Sonnet 5). Runtime model = own env knob
   `TAKEOFF_MODEL`, default `claude-sonnet-5` — the harness MEASURES whether it needs opus;
   never guessed. Never share a model knob with another agent (standing law).
7. neon-http has NO transactions — idempotence is the transaction. DDL additive + nullable
   only, via the house `apply-*-ddl.mjs` pattern with `pg_indexes`/information_schema
   read-backs.
8. Windows dev box: no native-compile deps. PDF rasterization must be pure JS/WASM.

## 2. Architecture decisions (D-numbered; Kimi: attack these)

**D1 — Extraction runs as a LOCAL repo script (`scripts/takeoff-run.mts`), not a Vercel
function, for v1.** Rationale: 122-page ARCH-E needs controlled-DPI rasterization + tiling
(measured: at ~40 DPI equivalent, sheet numbers are legible but dimension strings are NOT);
wasm rasterizers + 5-15 min runtimes + retry loops are hostile to serverless limits; the
note's own sequencing is validate-first-productize-second; volume is bids/month, not
leads/day (volume-test passes with Joseph running a script per job). The script writes
through the same code paths the app uses (db lib), org-scoped. Productizing to a background
worker is a later WO, not MVP.

**D2 — Rasterizer: pure-WASM PDF renderer (`mupdf` npm [AGPL — internal tool, acceptable] or
`@hyzyla/pdfium` [BSD]; builder verifies ONE page renders at 300 DPI on Windows as WO gate 0,
prefer pdfium for license simplicity).** Render pipeline: full-page @ ~110 DPI for
classification crops; detail sheets @ ~300 DPI tiled 2×2 (with 8% overlap) for extraction;
title-block crop (bottom-right ~15%×15% of page) for sheet-ID at any DPI.

**D3 — Two-pass read: classify → route → extract.**
- S0: rasterize; write tiles to `.takeoff-cache/<runId>/` (gitignored).
- S1 CLASSIFY: title-block crops batched (~10/call) → `{page, sheetId, sheetType}` where
  sheetType ∈ {cover, notes, floor_plan, foundation, elevation, roof, framing, electrical,
  plumbing, mechanical, schedule, section_detail, threed, other}.
- S2 ROUTE by the AUTHORITATIVE TABLE (law 5):
  | Entity class | Authoritative | Cross-check (never additive) |
  |---|---|---|
  | window types+counts+dims | window SCHEDULE sheet; else floor-plan tags | tag instances on floor plan |
  | ext/int door counts+dims | door schedule; else floor plan | elevations |
  | rooms (name, area, floor finish) | floor plan | area schedule |
  | heated/porch/garage SF | printed AREA SCHEDULE | Σ room areas |
  | wall segments LF + heights | floor plan (dim strings) + wall sections | foundation plan perimeter |
  | slab areas + thickness | foundation plan + sections | area schedule footprint |
  | roof faces SF + pitch + covering | roof plan + elevations | footprint × pitch factor |
  | plumbing fixtures | floor plan fixtures + plumbing sheets | schedule if present |
  | electrical devices | ELECTRICAL sheets ONLY | — |
  | HVAC | mechanical/notes | — |
  Elevations/3D/electrical NEVER contribute window/door counts (the 3-5× over-count kill).
- S3 EXTRACT per routed sheet @ 300-DPI tiles, one JSON schema per sheetType; every field
  carries `{value, unit, sourcePage, tile, confidence: high|med|low, verbatim}`. Prompts are
  authored in the WO VERBATIM (builders never write prompts).
- S4 RECONCILE (pure code): merge tiles (overlap dedupe by entity key), apply routing,
  cross-checks: Σ rooms vs area schedule (±3% else flag) · schedule counts vs tag instances
  (mismatch → flag that type, take the SCHEDULE number) · roof faces ≥ footprint sanity.
- S5 DERIVE (pure code): params → assembly library (§3) → line items.
- S6 WRITE: `takeoff_runs` row (params, per-assembly report, flags, model, timings) + line
  items with per-line meta. Draft project only.

**D4 — Storage delta (additive, nullable):**
- `estimate_line_items` + `meta jsonb` — `{assemblyKey, sourcePages[], confidence, flagged,
  assumption, extractedQty}` (one nullable jsonb col; UI reads it; engine ignores it).
- NEW `takeoff_runs` — `{id, orgId, projectId→estimate_projects, status, model, paramsJson,
  reportJson, createdAt}`. One row per extraction run; diffable.
- NO enum changes: Sean's 15 assemblies map onto the existing 13 divisions + 7 units cleanly
  (mapping pinned in §3).

**D5 — Apply is EXPLICIT and uses the existing bulk-PUT semantics.** Extraction lands in
`takeoff_runs` (staged). "Apply run → line items" is a button/CLI step that replaces the
takeoff via the same org-scoped delete-then-insert path the autosave PUT uses
(`api/estimate-projects/[id]/line-items`), with a guard: refuse to apply over a takeoff whose
rows were hand-edited after the run was created (updatedAt comparison) unless `--force`.
⚠️ Known seam for Kimi: UI autosave PUT vs apply race (delete-then-insert, no transactions).

**D6 — Accuracy is decomposed honestly, then measured.**
- COUNTED entities (windows/doors/rooms/areas/fixtures/devices/roof faces): measured vs a
  hand-verified TRUTH FILE (`fixtures/maass-truth.yaml`). Metric: exact-match for integer
  counts; ±2% for areas/LF. Missing required line = automatic fail of that assembly.
- DERIVED quantities (studs/plates/sheathing/drywall): formula correctness proven by GOLDEN
  TESTS (hand-computed fixture in the WO); their runtime accuracy = param accuracy (already
  measured above) — no separate hand count needed.
- The harness (`scripts/takeoff-validate.mts`) prints per-assembly PASS/FAIL + overall %.
  Truth file is built AFTER the pipeline exists, from its own page+tile citations (each value
  cites where it read — verification is a lookup, not a search). Joseph/Sean eyeball the
  final table. **No 95% claim before this table exists.**

**D7 — Model calls follow the house raw-fetch pattern**, sequential-with-retry (429/529
backoff), request-level max_tokens caps, and a per-run cost line in the report (input/output
tokens × price). Budget guard: hard cap ~$15/run, abort-with-partial-report beyond it.

## 3. The Sean assembly library (his 15 assemblies → params → deterministic derivations)

Division/unit mapping + formulas. Formula constants live in ONE config object
(`ASSEMBLY_DEFAULTS`) — Sean-tunable later, defaults flagged as assumptions on first runs.
Params come from S4; derivations are pure functions, golden-tested.

| # | Assembly (Sean's order) | Division | Unit | Derivation (code) |
|---|---|---|---|---|
| 1 | Concrete slab | foundation | cy | Σ(slabArea SF × thicknessIn/12)/27, per slab region; thickness from sections else DEFAULT 4" **flagged** |
| 2 | Mud/seal plate (PT) | framing | lf | extPerimeter LF (2x4 vs 2x6 read from wall section; else flag) |
| 3 | Ext wall studs | framing | ea | ceil(extWallLF×12/OC16) + corners×3 + openings×2 (constants in config, line carries assumption note) + stud LENGTH from wall height (8/9/10') as label detail |
| 4 | Wall plates (seal+double top) | framing | lf | 3 × wallLF (Sean's rule, ext + int each) |
| 5 | Interior wall studs | framing | ea | same formula over intWallLF |
| 6 | Roof structure | framing | ea | trussCount = ceil(ridgeLF×12/24)+1 @24"OC default **flagged** (plans defer trusses to supplier specs) |
| 7 | Roof decking OSB | framing | ea | IF decked: ceil(roofFacesSF/32); metal-on-purlins may have NO decking — presence read from roof framing notes, else **flagged, qty still computed** |
| 8 | Roof covering | roofing | sq | roofFacesSF/100 per face, covering type (standing seam vs R-panel vs shingle) read from notes/elevations; type ambiguity → **flag** (A0-1 says "standing seam vs R-panel depending on location") |
| 9 | Wall sheathing OSB | framing | ea | ceil(extWallSF/32) |
| 10 | Windows | exterior | ea | one line PER SCHEDULE TYPE (e.g. 3060SH ×N), dims in label |
| 11 | Ext doors + garage doors | exterior | ea | per type from schedule/plan |
| 12 | Insulation | insulation_drywall | sf | walls: extWallSF; ceiling: heatedSF (R-values in label from notes else default flagged) |
| 13 | MEP by counts | electrical / plumbing / mechanical | ea·ls | outlets/switches/lights EA (E-sheets); plumbing fixtures EA by type; HVAC = 1 LS line carrying heatedSF in label ("HVAC system — 3,450 heated SF"), price box empty |
| 14 | Interior doors + trim | interior_finishes | ea·lf | doors per schedule; baseboard LF = Σ room perimeters; crown LF only rooms flagged y (default n) |
| 15 | Flooring + drywall + kitchen | interior_finishes / cabinets_counters | sf·ls | flooring per-room SF grouped by finish type; drywall SF = intWallSF×2 + extWallInteriorSF + ceilingSF; kitchen = ALLOWANCE LS line qty 1, price empty, **always flagged** |

Completeness gate: the run report enumerates ALL 15 with status; any `missing` fails the run.

## 4. UI delta (smallest honest slice)

On `/estimating/[id]` (+ the takeoff table): flag chip (⚠ reason tooltip), confidence dot,
source cite ("p.14"), assumption note row styling — read from `meta`, all display-only; an
"Extraction runs" panel on the project page (per-assembly report table, cost line, apply
button w/ D5 guard). No new routes beyond `api/estimate-projects/[id]/takeoff-runs` (GET list
+ POST apply). Everything else = the EXISTING estimating surface.

## 5. WO decomposition (all builders: Sonnet-5, worktree, judgment-zero, STOP where silent)

- **WO-T1 — schema + assembly library + apply path.** DDL script (meta col + takeoff_runs),
  pure `src/lib/takeoff-assemblies.ts` (formulas §3 verbatim, ASSEMBLY_DEFAULTS config,
  15-assembly completeness), golden tests from a hand-computed fixture I author INTO the WO,
  apply-run path w/ D5 guard + tests. Gates: tsc, targeted vitest, build.
- **WO-T2 — extraction pipeline** (after T1 merges). Gate 0: rasterizer feasibility (render
  p.10 @300DPI on Windows, print px dims, HALT if fail). S0-S6 per D3, prompts verbatim from
  the WO, cache dir, cost meter, `--pages` subset flag for cheap iteration, `--dry` (no DB).
  Gates: tsc + unit tests on S4 reconcile/dedupe/cross-checks with fixture JSONs (no live API
  in tests).
- **WO-T3 — UI affordances** (parallel with T2). §4 exactly; existing component idioms.
  Gates: tsc, vitest, build.
- **WO-T4 — validation harness** (small; may fold into T2). `takeoff-validate.mts` comparing
  truth yaml ↔ run report per D6.

Merge protocol (per OS47 precedent): I re-run every gate myself before merge; builders never
deploy; deploy is mine, verify by health-SHA.

## 6. Execution order + verification

1. Plan → **Kimi K3 baton at MAX** (this file + repo pointers) → disposition ledger (probe
   every finding) → WOs amended.
2. T1 → gates → merge. T2 ∥ T3 → gates → merge. T4.
3. Deploy CRM (UI+DDL) → health-SHA == HEAD.
4. **Maass run** on the real PDF (runtime sonnet-5) → seeded draft project + report.
5. I hand-verify counted entities vs tiles → build `maass-truth.yaml` → harness table.
6. If sonnet misses the bar on any assembly → same run on opus → comparative table (measure,
   don't guess) → runtime default set by DATA.
7. `paranoia` sweep at the commit point (pre-deploy + pre-"done").
8. Report to Joseph: fix-format, per-assembly accuracy table, cost/run, flags list, what a
   flip arms. Joseph + Sean eyeball = the final gate.

## 7. YOLO floor map (this arc)

- Deploy to prod CRM: **granted** (existing internal surface). DDL additive/nullable: granted.
- No customer-reaching surface touched (estimating is internal; no messages originate).
- No spend activation: runtime API usage on the existing operational key (~$3-8/Maass run
  est., capped $15 — noted in report). No new paid services.
- New public surface: none. Git/auth: normal branch work, no history mutations.

## 8. Risks + open questions (Kimi: these are yours)

- R1 D5 apply-vs-autosave race (delete-then-insert, no transactions) — is the guard enough?
- R2 Tile-boundary entities (a window tag split across tiles; overlap dedupe by what key?).
- R3 Sheet classification errors routing a schedule to `other` → silently missing authoritative
  source (completeness gate catches the assembly, but does the report NAME the cause?).
- R4 The 122-page set may lack a formal window/door SCHEDULE (fallback = floor-plan tags —
  weaker; does the confidence model degrade honestly?).
- R5 `quantity` is numeric-as-string at the drizzle boundary (`Number()` coercion) — decimal
  qty from derivations must round per-line stably (engine already rounds cents at line level).
- R6 Org scoping of script writes (demo-scope vs prod org) — pin the org resolution.
- R7 wasm rasterizer memory on 122 pages (stream pages, don't hold all).
- R8 Anthropic vision request limits (max images/request, max px — tile size must respect
  the ~1568px effective cap; 2×2 tiling of 300-DPI ARCH-E gives ~7200px tiles — TOO BIG:
  re-derive tile grid from the API limit, likely 4×6 grid at ~1500px each).
- R9 Cost blowout on 122 pages × tiles (S1 classification filters pages so S3 only reads
  routed sheets — verify the filter actually bounds it).
- R10 The `[SENSITIVE]` env-mask class: script must read the REAL key from
  `king_maker_outbound/config/.env` (house law), never a vercel pull.

---

# AMENDMENTS v2 (post-audit, 2026-08-07 ~5:15am ET)

Applied from `KIMI_LEDGER_TAKEOFF_MVP_20260807-0510.md` (25 findings + 12 contracts, 0
rejects) + `PROBE_TAKEOFF_PDF_20260807.md` (P1-P7). Where v2 conflicts with §0-§8 above, v2
WINS. The original text stands as the audit trail.

## V2.0 — Probed reality supersedes §0/D2/D3 premises
- **The set is 17 pages, not 122** (P1). Same document identity (FAIRFIELD IV (MOD) / MAASS /
  REVISED FINAL 04-30-2024). Flag to Joseph in the report: if a fuller engineering set exists,
  this file is not it.
- **Born-digital, full text layer on every page** (P2). Architecture is **TEXT-FIRST**:
  classification, dimension strings, tags, schedules, notes, area schedule all read from
  positioned text (`pdfjs-dist` legacy `getTextContent()`); VISION is reserved for symbol
  counting (E/P sheets), roof/foundation geometry association, and per-page raster fallback
  when text yield ≈ 0 (labeled in the report). Rasterizer: `@hyzyla/pdfium`, gate 0 renders
  pg 15 @ 200 DPI on Windows, HALT on failure (mupdf = named fallback, reported not silent).
- **No window/door schedule exists in this set** (P5) — tags on A1-1b are the authoritative
  source; the F8 union-with-provenance rule governs every future set.
- **Shell system is text-evidenced** (P6/pg9 legend): "HYBRID BARNDOMINIUM PERIMETER WALL
  DESIGN OR WOOD FRAMING BETWEEN THE GIRTS — ENGINEERED METAL BUILDING SHELL REQUIRED" +
  wall legend 8" EXT / 6" INT / 4" INT. `shellSystem` is a first-class extracted param;
  exterior framing lines carry the "verify metal package boundary" flag BY DESIGN.

## V2.1 — D5 replaced (F1/F2/F3/F19/F20)
- **F1:** `line-items` PUT `lineSchema` gains `meta` passthrough (nullable optional record) +
  insert mapping + client round-trip. Regression test: apply → autosave PUT → meta intact.
- **F2:** revision token. PUT body + apply both carry `baseUpdatedAt`; the gate is ONE
  conditional statement: `UPDATE estimate_projects SET updated_at = now() WHERE id = $1 AND
  updated_at = $2 RETURNING id` — 0 rows → 409 `{error:"stale", current}` → client refetches.
  Single-statement atomicity is the neon-http idiom.
- **F3:** provenance guard, not timestamps. Hand-edit detection = `meta.extractedQty` ≠
  current `quantity` (or label changed). Re-apply merge rule (pinned): match by
  `meta.assemblyKey` + `label` → PRESERVE `materialCents`/`laborCents`/`sort`; unmatched
  incoming → insert; unmatched existing extraction lines → remove; hand lines (no meta) →
  KEEP. Hand-edited qty present → refuse listing the lines; `--force` applies extraction qty
  but STILL preserves prices.
- **F20:** ONE writer — `applyTakeoffRun()` called by S6, the POST route, and the CLI. First
  run = extract → stage → apply (token trivially green) → report.
- **F19:** WO-T1 owns the apply lib + `takeoff-runs` routes + the PUT amendment. T3 consumes.

## V2.2 — §3 formula revisions (F7/F10/F11/F12/F13/F14)
- **#2/#4 plate split (F7):** #2 = PT seal plate 1× extLF. #4 = top plates 2× extLF + full
  3× intLF. (Sean's "3× perimeter" survives as 1+2 across two lines; no double-count.)
- **#1 footings (F10):** separate line — footing CY = (widthIn/12)×(depthIn/12)×perimeterLF/27;
  dims from C1-1/section text else flagged default 12"×20". Slab line stays flat-slab-clean.
- **Waste (F11):** `WASTE_DEFAULTS` = studs 5% · sheathing/decking/drywall/roofing 10% ·
  flooring 8% · else 0. Applied in qty, "(incl N% waste)" in label, net preserved in
  `meta.extractedQty`, flagged assumption.
- **#12/#15 ceiling (F12):** `ceilingSurfaceSF` param (vault detection from notes/sections
  text; flagged default = heatedSF).
- **#3/#5 studs (F13):** per-SEGMENT `ceil(lenFt×12/16) + 1` summed over walls[], + corners×3
  + openings×2 (corners extracted-or-flagged-default-4).
- **QTY_SCALE (F14):** ea/lf/sf integer half-up · cy/sq 2 dp half-up · ls 1. Stored
  `toFixed(scale)`.
- **F15:** report prints flag-share per assembly; >6 assemblies at 100% flag-share = FAILED
  usefulness gate; counted vs derived accuracy NEVER blended into one number.
- **F16 within-class dedupe:** canonical-sheet rule — enlargements/duplicate-class sheets
  excluded from counts; multi-page schedules merge by type key. THIS set's partition: A13.

## V2.3 — run lifecycle (F9/F21/F24/F25)
Run row created at start (`status='running'`) · per-assembly incremental report writes ·
`aborted` + partial report on cap/failure · S1/S3 outputs cached by (sha256, page, stage) ·
`--resume` · concurrency 4 · per-call AbortSignal 90s · max 3 retries · `cache_control` on
static system/schema blocks · dated `PRICES` config · $15 cap retained (now generous:
estimated ~$1-3/run at 17 pages text-first).

## Appendix A — PINNED CROSS-WO CONTRACTS (C1-C12 + A13; builders implement, never redesign)

**A1 `paramsJson`** — envelope `Sourced<T> = {value: T, sourcePages: number[], confidence:
"high"|"med"|"low", flagged: boolean, assumption?: string}`. Shape:
`{ shellSystem: Sourced<"hybrid_metal_shell"|"stick_frame"|"post_frame"|"unknown">,
wallLegend: Sourced<string[]>, extWalls: Sourced<{id,lengthFt,heightFt}[]>,
intWalls: Sourced<{id,lengthFt,heightFt}[]>, corners: Sourced<number>,
windows: Sourced<{tag,widthFt,heightFt,count}[]>, extDoors: Sourced<{tag,widthFt,heightFt,count}[]>,
intDoors: Sourced<{tag,widthFt,heightFt,count}[]>, garageDoors: Sourced<{tag,widthFt,heightFt,count}[]>,
rooms: Sourced<{name,areaSf,floorFinish,crown:boolean,perimeterLf}[]>,
areaSchedule: Sourced<{name,areaSf}[]>, slabs: Sourced<{name,areaSf,thicknessIn}[]>,
footings: Sourced<{perimeterLf,widthIn,depthIn}>, roof: Sourced<{faces:{name,areaSf}[],
pitch:string,covering:string,ridgeLf:number,decked:"yes"|"no"|"unknown"}>,
ceiling: Sourced<{surfaceSf,vaulted:"yes"|"no"|"unknown"}>, electrical:
Sourced<{outlets:number,switches:number,lightFixtures:number}>, plumbing:
Sourced<{type:string,count:number}[]>, hvac: Sourced<{heatedSf:number}> }`.
Every §3 formula input traces to a NAMED field here or a NAMED default in A11 — no other source.

**A2 `takeoff_runs.reportJson`** — `{runId, sourceFilename, sourceSha256, model, startedAt,
finishedAt?, status, costUsd, tokens:{in,out,imageIn}, sheets:[{page,sheetId,sheetName,type,
textChars,tilesUsed}], assemblies:[{assemblyKey, status:"extracted"|"derived"|"flagged"|"na",
reason?, lineCount, flagShare, notes:string[]}], crossChecks:[{name,pass,detail}],
flags:[{assemblyKey?,label?,reason}]}`. Mis-route accountability (R3): when an expected
authoritative source is absent, the report names the CAUSE ("no sheet classified `schedule`;
windows read from A1-1b tags").

**A3 `estimate_line_items.meta`** — `{runId: string, assemblyKey: string, sourcePages:
number[], tile?: string, confidence: "high"|"med"|"low", flagged: boolean, assumption?:
string, extractedQty: string, unpriced: boolean}`. UI renders unpriced=true as "—", never $0.00.

**A4 PUT amendment** — A3 passthrough + `baseUpdatedAt: string` required in body; 409 shape
`{error:"stale", currentUpdatedAt}`. Owner T1.

**A5 apply** — `applyTakeoffRun(db, {projectId, runId, baseUpdatedAt, force?})` per V2.1.
Stamps `takeoff_runs.appliedAt`. Owner T1.

**A6 CLI** — `scripts/takeoff-run.mts --pdf <abs> [--org default] (--contact-id <uuid> |
--create-contact "<name>") [--pages 1,7-10] [--dry] [--resume] [--force] [--model <id>]`.
Exit 0 ok · 2 gate-fail · 3 aborted. Stdout = the human report table (T4 parses reportJson
from the DB, never stdout). Key source: `king_maker_outbound/config/.env` ANTHROPIC_API_KEY —
NEVER a vercel pull (the `[SENSITIVE]` mask law). Org: import DEFAULT_ORG from
`src/lib/org.ts`, stamped explicitly.

**A7 citations** — text reads `{page, bbox:[x,y,w,h]}` (pdfjs transform units); vision reads
`{page, tile:"r2c3"}`.

**A8 truth-yaml** — `fixtures/maass-truth.yaml`: per-assembly, per-entity keys in S3's exact
string forms (e.g. `"3060SH": 8`), tolerance block per D6 (counts exact; areas/LF ±2%), plus
`derived_spotcheck:` one named room's studs hand-counted end-to-end (Kimi answer 7c).

**A9 `takeoff_runs.status`** — enum `running|complete|aborted` + `appliedAt timestamptz
NULL`. Abort = status aborted + partial reportJson persisted.

**A10 tile budgets** — text-only sheets: 0 tiles. Symbol sheets (E*, P*): 200 DPI native,
1568px tiles, 8% overlap, ≤35 tiles. Geometry sheets (A2*, C1*, A3*): 150 DPI, ≤12 tiles.
Concurrency 4 · timeout 90s/call · 3 retries · cap $15/run.

**A11 `ASSEMBLY_DEFAULTS`** — `{OC_IN:16, CORNER_STUDS:3, OPENING_STUDS:2,
SEGMENT_STARTER:1, TRUSS_OC_IN:24, SLAB_THICKNESS_IN:4, FOOTING:{widthIn:12,depthIn:20},
WASTE:{framing_studs:0.05, sheathing:0.10, decking:0.10, drywall:0.10, roofing:0.10,
flooring:0.08}, QTY_SCALE:{ea:0,lf:0,sf:0,sq:2,cy:2,ls:0,hr:0}}` — each default, when used,
emits its named flag text into `meta.assumption` (key = the constant name).

**A12 org/contact for script writes** — pinned per F17 probe: DEFAULT_ORG explicit;
`--create-contact` inserts a minimal contacts row (existing default contact type); Maass is
Sean's REAL client in Sean's REAL CRM — prod data, not demo.

**A13 THIS set's canonical partition (P3; rooms-source corrected by truth-draft probe
2026-08-07 ~6am — pg7 is the AREA plan, interior room labels live on the annotation plan)** —
pg1-4 none · pg5-6 NOTES text (slab thickness, R-values, covering, wall/shell spec) ·
pg7 AREA SCHEDULE + area-plan callouts ONLY · pg8+10 dimension strings
(merged by segment, never additive) · pg9 window/door TAGS + wall legend + interior ROOM
labels (names/finishes; P-ROOMS assist runs on pg9 tiles) · pg11 roof layout ·
pg12-13 elevations (pitch/covering cross-check) · pg14 foundation (perimeter, footings) ·
pg15 electrical SYMBOLS (vision) · pg16 plumbing fixtures · pg17 metal columns (shellSystem
evidence; no counts).

## V2.4 — SC amendments
SC1 gains the F15 usefulness gate. SC2 gains: meta survives autosave round-trips (F1 test).
SC3 gains: counted/derived reported separately + per-param provenance + int/ext wall split
cross-check + one derived spot-check (answer 7).

---

# AMENDMENTS v3 (post-re-audit, 2026-08-07 ~5:55am ET)

From `KIMI_LEDGER_TAKEOFF_MVP_V2_20260807-0550.md` (13/13). v3 WINS over v2 wins over v1.
**Rule (F13): WOs cite V2/V3 sections and Appendix A only.** Banners: §0, D2, D3, D5 are
SUPERSEDED — §0 by V2.0 (17 pages, text layer) · D2/D3 by V2.0 text-first + A10/A13 ·
D5 by V2.1 + V3.1.

## V3.1 — The re-apply contract triangle (F1, LAUNCH-KILLER)
- **A3 meta gains:** `appliedQty: string` (the GROSS qty the apply actually wrote — the
  hand-edit guard compares `appliedQty ≠ quantity`, gross↔gross) · `lineKey: string`
  (identity: `assemblyKey` alone for singleton lines, `assemblyKey:entityId` for multi-line
  assemblies — `windows:3050SH`, `roof_covering:A`, `flooring:LVP`, `plumbing:water_closet`,
  `electrical:receptacles`) · `wastePct: number` (0 when none). `extractedQty` stays = NET
  (display: the "was" hint compares `appliedQty`, never `extractedQty`).
- **A5 identity:** match by `(assemblyKey, lineKey)`. **Label is DISPLAY-ONLY, never
  identity**; the "label changed" guard clause is DELETED — hand renames are free and safe.
- **A5 order (F10):** org-scoped VERIFY token (read) → row-wise writes (insert/update/delete
  per merge rule) → `appliedAt` stamp → **conditional token UPDATE as the COMMIT** (`UPDATE
  estimate_projects SET updated_at=now() WHERE id=$1 AND updated_at=$2 RETURNING id`; 0 rows
  → return `conflict`, nothing claims success). Crash signature: `appliedAt` null + token
  advanced ⇒ operator refetches and re-applies; row-wise idempotent writes make the retry
  safe (law 7).
- **A5 result:** `{status, inserted[], updated, deleted, kept}` — `inserted[]` carries
  labels; the UI (T3) renders them beside kept hand lines (the F1d duplication tripwire is
  Sean's eyeball on that list).
- **A4 gains (F3/F4):** "The project GET line serializer returns `meta`. CSV import creates
  meta-less hand lines by design. The existing autosave client retrofit (send
  `baseUpdatedAt`, 409 → refetch) is WO-T3 §1; **T1+T3 deploy together, one release** — OS48
  merges both before any deploy."

## V3.2 — Param sources completed (F2/F12/F13-extras)
- **Heights:** A13 pg12-13 role extended: "ELEVATIONS — pitch/covering cross-check **+
  vertical dim strings = the wall-height source**." A11 gains `WALL_HEIGHT_FT: 9` (flagged
  default, text `WALL_HEIGHT_FT default 9ft — verify`).
- **A11 gains:** `CORNERS_DEFAULT: 4` (flag `CORNERS_DEFAULT assumed 4`) ·
  `R_VALUE_DEFAULT: {wall:"R-13", ceiling:"R-30"}` (label text only; flag
  `R_VALUE_DEFAULT used`) · `CROWN_DEFAULT: false` — when crown callouts are unreadable the
  extractor sets crown=false AND flags the rooms param (`CROWN_DEFAULT applied — crown
  unread`); the silent default is dead.
- **heatedSF:** ONE field — formulas consume `hvac.heatedSf` only; the extractor fills it
  from the area schedule LIVING row (citing pg 7). `areaSchedule` is never consumed by a
  formula directly.
- **Canonical spellings:** A1/A11 names win (`ceiling.surfaceSf`, `WASTE`, `QTY_SCALE`).
- **Baseboard (promoted from WO-T1, killing the drift):** baseboard LF = Σ rooms.perimeterLf
  − Σ(intDoors count×2×widthFt) − Σ(extDoors count×widthFt) − (Σ garageDoors widthFt IF any
  room name contains "GARAGE" else 0).

## V3.3 — Pipeline pins (F5/F6/F7/F8/F9/F11)
- **Cache key (F5):** `(sourceSha256, page, stage, model, promptHash)` — a resume can never
  serve one model's output under another's flag; the §6 bake-off table stays honest.
- **Tile budgets (F6):** geometry sheets 150 DPI → **≤20 tiles** (4×5 at 1568px/8% overlap;
  the ≤12 was arithmetic error). Raster-fallback pages = symbol class (200 DPI ≤35). Gate 0
  prints the PDF page box dims (ARCH-E verified per-file, never inherited).
- **Flag classes (F7):** every A2 flag carries `class: "design_boundary" |
  "extraction_uncertainty"`. Design-boundary (by design, healthy): VERIFY_METAL_PACKAGE_
  BOUNDARY, TRUSS_OC_IN, kitchen/hvac allowances, plate-spec-no-sections. The F15 usefulness
  gate counts **extraction_uncertainty share only**.
- **Arbiter (F8):** pinned in S4: TEXT-LAYER VALUES ARE AUTHORITATIVE; vision only
  (a) associates entities spatially and (b) counts symbols. A vision read that quotes a
  dimension string must match a text-layer string VERBATIM (match = the text value + its
  bbox is the citation); same-entity disagreement → flagged line carrying the TEXT value,
  class extraction_uncertainty.
- **Union-with-provenance (F9), written:** entity key = normalized type tag; when a schedule
  exists its count WINS conflicts; tag-only types UNION IN as flagged lines (never dropped);
  A1 entity objects gain `source: "schedule" | "tags" | "vision"`. (Moot for Maass — P5 —
  binding for every future set.)
- **Confidence rubric (F11):** printed table/schedule text → `high` · tag corroborated by a
  passing cross-check → `med` · tag-only or vision symbol count → `low` · any named default
  used → `flagged` regardless of confidence.
