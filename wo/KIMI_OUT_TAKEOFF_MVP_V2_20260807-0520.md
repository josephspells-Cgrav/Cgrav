• I'll read the brief first.

• Read-only audit. Let me pull the three artifacts.

• All three artifacts read in full. Here is the audit.

  ---

  # KIMI OUT — Re-audit of PLAN_TAKEOFF_MVP_20260807 (v2-amended) — 2026-08-07

  ## VERDICT

  **Not sound to execute as written — one amendment cycle short.** The v2 set genuinely discharges most of v1 (the pinned contracts A1–A13 are real and mostly consistent), but three separately-reasonable v2 pins — the F3 hand-edit guard, the F11 waste rule, and the label-keyed merge — compose into a re-apply path that either refuses to fire on every run or destroys Sean's typed prices through the intended flow, the exact harm F3 was accepted to prevent (F1 below, LAUNCH-KILLER). Behind it: four formula inputs still have no named source (wall heights being the big one), the F1 fix dies at the unpinned GET leg, A10's geometry tile budget is arithmetically impossible, and the cache key can silently rig the sonnet/opus bake-off the whole model decision rests on. Every fix is one to three pinned lines in Appendix A — no re-architecture. Cut WOs after those pins land, not before.

  ## FINDINGS

  **F1 — LAUNCH-KILLER · V2.1-F3 guard × V2.2-F11 waste × label-keyed match compose into a self-defeating re-apply.**
  Hole: the guard detects hand-edits as `meta.extractedQty ≠ current quantity` (V2.1-F3). F11 pins "net preserved in `meta.extractedQty`" while waste is "applied in qty." So for every waste-bearing line, stored `quantity` = net×(1+w) and `meta.extractedQty` = net — **unequal by design, forever**. The guard trips on every stud/sheathing/decking/drywall/roofing/flooring line on every run, including a same-run re-apply with zero user edits. (The other reading — extractedQty = gross — makes the guard work but violates F11's "net preserved," and A3 doesn't disambiguate; either reading breaks something.) Then the escape hatch: `--force` "STILL preserves prices" — but preservation rides on match-by-(`assemblyKey`+`label`), and F11 rewrites labels with the waste number ("(incl 5% waste)" → "(incl 10% waste)"). Retune `WASTE_DEFAULTS` (explicitly "Sean-tunable later") and every waste line fails to match → removed as "unmatched existing," re-inserted fresh, prices gone.
  Failure scenario: Sean walks Home Depot, prices 40 lines. Waste default tuned 5%→10%. Re-run, re-apply → refusal listing every derived line (phantom hand-edits). `--force` → every derived line re-inserted with empty price. The Home Depot walk is destroyed by the intended flow — F3's original harm, re-instated by its own fix.
  Minimal fix: A3 gains `appliedQty` (the gross qty the run actually wrote; hand-edit = `appliedQty ≠ quantity`) and `lineKey` (assembly-scoped entity id: window tag, room name, segment-class key); A5 matches on `assemblyKey`+`lineKey` and bans label from identity; `meta.wastePct` recorded so label churn is display-only.

  **F2 — HIGH · Wall `heightFt`: no routed source on the 17-page set, no A11 default.**
  Hole: A1 requires `extWalls[].heightFt` / `intWalls[].heightFt`; §3's sources are "floor plan (dim strings) + wall sections" (D3). P3's sheet map contains **no sections sheet**; floor-plan dim strings are horizontal; A13 routes pg12–13 elevations to "pitch/covering cross-check" only. A11 has no height default. A1's law — "every §3 formula input traces to a NAMED field here or a NAMED default in A11 — no other source" — is falsified for height.
  Failure scenario: assemblies #3/#5 (stud-length labels), #9 sheathing, #12 wall insulation, #15 drywall all need LF×height. Builder either guesses 9' (silently wrong SF on four assemblies, landing in money totals) or STOPs mid-WO. Mass-flagging is the honest outcome and it still leaves four assemblies underived on the flagship run.
  Minimal fix: route pg12–13 elevation vertical dim strings (born-digital text, P2) as the height source in A13; add `WALL_HEIGHT_FT` flagged default to A11.

  **F3 — HIGH · F23 is not discharged in the written text: no GET-meta pin, so F1's fix dies end-to-end.**
  Hole: the ledger claims "Pinned: project GET line serializer includes `meta`; CSV import documented meta-less by design." Appendix A4 pins only the PUT direction ("A3 passthrough + `baseUpdatedAt`"). No line anywhere in v2 pins the GET serializer or the CSV note.
  Failure scenario: apply writes meta'd lines → page reloads via GET (meta omitted, since unpinned — a judgment-zero T1 builder implements exactly A4) → client state has no meta → next autosave PUT round-trips meta-less rows → passthrough writes NULL meta → every flag/citation/assumption wiped on first autosave. F1's regression test (apply→PUT→meta-intact) passes only if the test client hand-carries meta the real UI never received.
  Minimal fix: one line in A4: "project GET line serializer returns `meta`; CSV import creates meta-less hand lines by design."

  **F4 — HIGH · A4's required `baseUpdatedAt` is a breaking change to the live autosave route; the client half of 409 is unowned.**
  Hole: A4 makes `baseUpdatedAt` **required** in the PUT body. The existing autosave client doesn't send it. V2.1-F2 specifies "0 rows → 409 → client refetches" but no WO owns the client retrofit: F19 gives T1 "the PUT amendment" (server) and T3's scope is §4 — display-only chips + the extraction panel, no autosave-hook work. Execution order merges **T1 first**.
  Failure scenario: T1 merges; every existing `/estimating/[id]` page's autosave starts 400ing (zod) or 409ing with no refetch handler. Gates are tsc/vitest/build — none drives a browser autosave. Deploy verification is health-SHA. It ships broken until a human types in an estimating page.
  Minimal fix: pin in V2.1/F19 that T1's PUT amendment includes the existing autosave hook (send `baseUpdatedAt`, on 409 refetch-and-replay), with a regression test; or make the token opt-in for legacy callers (weaker, say so).

  **F5 — HIGH · V2.3 cache key omits model and prompt version → rigs the §6 bake-off.**
  Hole: "S1/S3 outputs cached by (sha256, page, stage) · `--resume`." No model, no prompt hash in the key.
  Failure scenario: run 1 on sonnet-5 caches pg15's symbol counts. Run 2 `--model claude-opus-4-8 --resume` (or a resume after a prompt fix) silently serves sonnet's cached numbers for cached pages. §6's comparative table — the mechanism that sets the runtime default "by DATA" — reports model A's extractions as model B's. The plan's core measurement is corrupted and nothing in the report reveals it.
  Minimal fix: cache key = (sourceSha256, page, stage, model, promptHash). One line in V2.3.

  **F6 — HIGH · A10's geometry-sheet budget is arithmetically impossible; fallback pages unbudgeted.**
  Hole: A10 pins geometry sheets (A2*, C1*, A3*) at 150 DPI, 1568px tiles, 8% overlap, **≤12 tiles**. On ARCH-E 36×48 (§0, unprobed for this file): 150 DPI → 5400×7200px; stride = 1568×0.92 = 1442.6px → 4 cols × 5 rows = **20 tiles**. The symbol-sheet row was computed correctly (200 DPI → 5×7 = 35 = "≤35" exactly), so the geometry row is a real arithmetic error, not a rounding choice. Separately, V2.0's text-yield≈0 raster fallback has no DPI/budget class at all.
  Failure scenario: judgment-zero builder hits tile 13 on C1-1 (the foundation sheet — footing/perimeter geometry) and either clamps to 12 tiles (silently drops ~40% of the sheet → missed geometry → missing lines, the plan's own cardinal failure) or STOPs. Both on the flagship run.
  Minimal fix: recompute the row (100 DPI → exactly 12 tiles; or cap ≤20 at 150 DPI); assign the fallback path a budget class; have gate 0 print the page box dims so the ARCH-E assumption is verified, not inherited.

  **F7 — MED · F15's usefulness gate counts v2's own by-design flags → healthy run fails SC1.**
  Hole: v2 adds always-on flags by design: #2 plate spec (no sections sheet this set), #3/#9 "verify metal package boundary" (V2.0), #5 corners-default flag, #6 trusses supplier-deferred (P6), #7 decked-unknown, #15 kitchen. The gate reads ">6 assemblies at 100% flag-share = FAILED," with no flag classes.
  Failure scenario: a *good* Maass run plausibly posts 100% flag-share on #2, #3, #5, #6, #7, #9 — six assemblies — and #12 joins if heights/R-values flag (see F2). SC1 red on the run that worked; the team either re-tunes the threshold ad hoc (gate theater) or re-runs pointlessly.
  Minimal fix: split flags into `design-boundary` vs `extraction-uncertainty` in A2; the usefulness gate counts extraction-uncertainty share only.

  **F8 — MED · Text-vs-vision disagreement arbiter is never pinned.**
  Hole: P2's receipt states the rule — association is CODE, "cross-checked by vision instead of discovered by it" — but that sentence lives only in the probe receipt. D3/S4/A2 contain no conflict rule. On geometry-association and raster-fallback pages, vision and the pdfjs text layer can disagree about the same entity (which segment a dim string belongs to; a roof-face area read both ways).
  Failure scenario: vision mis-associates a dim string between two interior segments; Σ-based cross-checks stay green; the wrong SF lands silently in sheathing/drywall totals — a law-4 breach with no flag. Builder, facing silence, invents an arbiter or none.
  Minimal fix: pin in S4/A2 — text layer is authoritative for values; vision only associates/counts symbols; any same-entity disagreement → flagged line carrying the text value.

  **F9 — MED · F8's "union-with-provenance" rule is referenced, never written.**
  Hole: V2.0 says "the F8 union-with-provenance rule governs every future set"; the ledger claims "Union-with-provenance pinned." The rule's text appears nowhere in §0–§8, AMENDMENTS v2, or Appendix A — no merge key, no precedence, and A1's entity arrays carry no per-entity provenance field to record it. Moot for Maass (no schedule, P5); real for set #2.
  Failure scenario: the next set has a schedule missing a revision-added window type; the WO author, citing a rule that was never written, improvises dedupe — the missing-line generator F8 was accepted to kill, one job later.
  Minimal fix: write the rule once in Appendix A (key = normalized type tag; schedule count wins on conflict; tag-only types unioned in; per-entity `source:"schedule"|"tags"` in A1).

  **F10 — MED · A5's apply write-order and crash signature are unpinned under no-transactions.**
  Hole: apply = conditional token UPDATE + delete-then-insert line writes + `appliedAt` stamp. The order is nowhere specified. neon-http has no transactions (law 7).
  Failure scenario: crash after token-bump but mid-line-write → token consumed, lines half-written, `appliedAt` null. Retry 409s on the stale token; the operator's only recovery is `--force` archaeology against an ambiguous state — on Sean's real prod CRM (A12).
  Minimal fix: pin the order (verify token → delete/insert → stamp `appliedAt` → conditional token UPDATE as the commit) and spell out the crash signature (`appliedAt` null + advanced token = refetch and re-apply).

  **F11 — LOW · Confidence rubric unpinned despite P5's explicit demand.**
  P5: "confidence model must reflect it" (tags-only path). No rule maps source→high/med/low anywhere in v2. Confidence dots and any future tuning rest on builder-invented assignments. Fix: three-line rubric in Appendix A (printed table/schedule→high; tags corroborated by elevations→med; tags-only or vision-count→low; any assumption→flag regardless).

  **F12 — LOW · Residual defaults outside A11's flag law.**
  A11's law: "each default, when used, emits its named flag text." Three defaults escape it: corner-count default 4 (exists only in V2.2 prose; A11 has `CORNER_STUDS` but no `CORNERS_DEFAULT`); the R-value default (#12 "else default flagged" — the default *value* is named nowhere, a builder guess landing in a label); crown default n (#14 — the plan's only **silent** default: unreadable crown callouts under-count trim with no flag, violating law 4). Related: `Sourced<T>` wraps whole arrays, so one unreadable room field isn't per-entity flaggable in paramsJson. Fix: A11 gains `CORNERS_DEFAULT:4`, `R_VALUE_DEFAULT:{...}`, `CROWN_DEFAULT:false` with pinned flag text.

  **F13 — LOW · Surviving v1 text traps for WO writers.**
  v2-wins covers conflicts legally, but WOs are authored section-by-section and builders STOP where silent: D2 still says gate 0 = "ONE page at 300 DPI, prefer pdfium" vs V2.0's "pg 15 @ 200 DPI, pdfium pinned, mupdf named fallback"; D3-S1 still describes vision classification of title-block crops vs V2.0's text-first classification; §0 still says 122 pages/11.9MB. A WO quoting D2 verbatim bakes the wrong gate. Fix: "SUPERSEDED by V2.x" banner lines on §0/D2/D3, or a rule that WOs cite v2 sections only.

  ## ANSWERS

  **1. DISCHARGE CHECK (F1–F25 + C1–C12 vs the v2 text).**
  Not actually discharged, with the line that falls short:
  - **F1 — partial.** PUT leg pinned (V2.1-F1, A4), but the round trip dies at the unpinned GET leg (Finding 3). Ledger's F23 row claims the GET pin; the text doesn't contain it.
  - **F2 — partial.** Server gate pinned (V2.1-F2: "the gate is ONE conditional statement…"), but `baseUpdatedAt` "required" (A4) breaks the existing autosave client and "client refetches" is owned by no WO (Finding 4).
  - **F3 — discharged on paper, self-defeats in composition.** V2.1-F3's guard compares `meta.extractedQty` to `quantity`, which F11 makes permanently unequal; the match key (`meta.assemblyKey` + `label`) is rewritten by F11's own label rule (Finding 1).
  - **F4 — partial.** A10 pins budgets but the geometry row contradicts its own arithmetic (≤12 pinned, 20 required — Finding 6).
  - **F6 — partial.** A1 exists, but its law "every §3 formula input traces to a NAMED field here or a NAMED default in A11" is falsified by `heightFt`, corner-count, R-value, crown (Findings 2, 12; trace in Answer 4).
  - **F8 — not discharged (future-set half).** Rule referenced in V2.0 ("governs every future set"), written nowhere (Finding 9). This-set half is covered by P5/A13.
  - **F9 — partial.** Lifecycle pinned (V2.3/A9), but the cache key "(sha256, page, stage)" omits model+prompt (Finding 5).
  - **F15 — partial.** Gate pinned, but its threshold is miscalibrated against v2's own by-design flags (Finding 7).
  - **F23 — not discharged in the text.** Ledger claims GET-serializer + CSV pins; Appendix A contains neither (Finding 3).
  - Fully discharged as written: F5, F7, F10, F11 (in isolation), F12, F13, F14, F16, F17, F18, F19, F20, F21, F24, F25. F22 is a WO-authoring-time promise — unverifiable at plan level, nothing in v2 contradicts it. C1–C12 all exist as A1–A12 documents (content gaps as above); A13 exists and is internally consistent with P3.

  **2. NEW HOLES v2 INTRODUCED.**
  Findings 1, 4, 5, 6, 7, 8, 10, 13 are v2-born. The two contradiction classes asked about: (a) v2-vs-surviving-v1 text a builder can still read — D2's 300-DPI/"prefer pdfium" gate 0 vs V2.0's 200-DPI pg-15 pin; D3-S1's vision classification vs V2.0's text-first classification; §0's 122 pages (Finding 13). (b) The text-first architecture's own failure mode: when pdfjs positioned text and vision disagree on the same entity, **nothing in the plan says which wins** — the code-primary/vision-cross-check rule exists only in probe receipt P2, never carried into D3/S4/A2, and S4's cross-check list (Σ rooms vs schedule; schedule vs tags; roof ≥ footprint) cannot see a value-level disagreement that preserves totals. Unpinned arbiter + no flag rule = silent wrong total, law 4 breached (Finding 8). Add the cache-key hole (Finding 5) as text-first's operational trap: determinism claims ("two runs must never give two numbers," law 1) are void when run 2 can inherit run 1's cached model output under a different model flag.

  **3. THE MERGE RULE, ATTACKED.**
  Match-by-(`assemblyKey`+`label`) is **not stable** — v2's own waste amendment makes the label a function of run config, and `meta` stores no label or stable key to detect it. Concrete sequences:
  - **(a) Same-run re-apply, zero edits — dead on arrival.** Stored `quantity` = net×1.05; `meta.extractedQty` = net (F11). Guard reads inequality as hand-edit → refuse, listing every waste line. Every run has waste lines. Re-apply never fires without `--force`.
  - **(b) Waste retune — price destruction.** Run 1 labels "(incl 5% waste)"; Sean prices. Defaults tuned to 10%; run 2 labels change. Guard refuses (a)'s phantom edits plus real qty deltas; `--force` promises "STILL preserves prices" but match-by-label fails on every waste line → removed + re-inserted priceless. The harm F3 was accepted to prevent, via the prescribed path.
  - **(c) Hand label edit — undetectable and fatal.** A3's meta has no `extractedLabel`, so the guard's "or label changed" clause is unimplementable — a renamed line is invisible to the guard, then fails match-by-label on re-apply → removed as "unmatched existing extraction line," re-inserted with empty price. No refusal, no warning.
  - **(d) Hand-line duplication.** Sean hand-adds a window type run 1 missed (missing lines are the known failure class). Run 2 finds it → incoming insert; his hand line (no meta) is KEEP. Two lines for one type; rollup doubles; no rule catches it.
  - **(e) Meta wipe without any apply.** GET omits meta (unpinned) → first autosave round-trips meta-less rows → flags gone (Findings 3/4).
  Minimal fix set (one WO-authoring session): `meta.appliedQty` (gross) for the guard · `meta.lineKey` for matching, label banned from identity · `meta.wastePct` so labels are display-only · GET-meta pin in A4 · apply report lists inserted extraction lines adjacent to kept hand lines for the eyeball gate.

  **4. FULL TRACE — 15 assemblies → A1 fields → A11 fallbacks.**

  | # | A1 paramsJson consumed | A11 fallback | Unnamed-source inputs (builder guesses) |
  |---|---|---|---|
  | 1 slab + footing | `slabs[].areaSf/thicknessIn`; `footings.perimeterLf/widthIn/depthIn` | `SLAB_THICKNESS_IN:4`, `FOOTING{12,20}`, `QTY_SCALE.cy` | none — clean |
  | 2 mud plate | Σ`extWalls[].lengthFt` | none needed (qty is LF; spec flag) | 2x4/2x6 spec: source (wall section) absent this set → always flagged, by design OK |
  | 3 ext studs | `extWalls[].lengthFt/heightFt`; `corners`; openings ← `windows+extDoors+garageDoors` counts | `OC_IN`, `SEGMENT_STARTER`, `CORNER_STUDS`, `OPENING_STUDS`, `WASTE.framing_studs`, `QTY_SCALE.ea` | **`heightFt` source+default** · **corner-count default 4** (prose only, not A11) |
  | 4 plates | 2×Σext + 3×Σint `lengthFt` | — | none — clean |
  | 5 int studs | `intWalls[]` + `intDoors` | same as #3 | same two gaps; default-4 corners is a perimeter assumption misapplied to partitions (flagged, so survivable) |
  | 6 roof structure | `roof.ridgeLf` | `TRUSS_OC_IN:24` | none — flagged by design (P6) |
  | 7 decking | `roof.faces[].areaSf`; `roof.decked` | `WASTE.decking` | none (decked=unknown → flag, qty still computed) |
  | 8 covering | `roof.faces[].areaSf`; `roof.covering` | `WASTE.roofing`, `QTY_SCALE.sq` | none — ambiguity → flag, pinned |
  | 9 sheathing | `extWallSF` = Σ`extWalls` LF×**heightFt** | `WASTE.sheathing` | **height gap lands here in full** |
  | 10 windows | `windows[]{tag,widthFt,heightFt,count}` | — | none — tags authoritative (A13 pg9) |
  | 11 ext/garage doors | `extDoors[]`, `garageDoors[]` | — | none — clean |
  | 12 insulation | walls: `extWallSF` (**height**); ceiling: `ceiling.surfaceSf` ← fallback heatedSF | ceiling fallback named in V2.2 prose | **R-value default: no value named anywhere** · heatedSF ambiguous between `hvac.heatedSf` and `areaSchedule["LIVING"]` |
  | 13 MEP | `electrical{outlets,switches,lightFixtures}`; `plumbing[]`; `hvac.heatedSf` | — | fixture-type naming without a legend → flag path covers it |
  | 14 int doors + trim | `intDoors[]`; baseboard = Σ`rooms[].perimeterLf`; crown = `rooms[].crown` | — | **crown default n is silent** (not in A11, no flag text) · baseboard formula pinned without doorway deduction — systematic ~3 LF/opening over-count vs hand method; an eyeball item, not a builder guess |
  | 15 flooring/drywall/kitchen | `rooms[].areaSf/floorFinish`; drywall = `intWallSF`×2 + `extWallInteriorSF` + `ceiling.surfaceSf`; kitchen LS | `WASTE.flooring/drywall` | **height gap ×2** (int + ext wall SF) |

  Formula inputs that STILL have no named source, consolidated: **(1) `heightFt`** — no routed source on this set (no sections sheet; elevations routed to pitch/covering only) and no A11 default; hits #3, #5, #9, #12, #15. **(2) corner-count default 4** — V2.2 prose, absent from A11. **(3) R-value default** — valueless everywhere. **(4) crown default** — present but silent, the plan's only unflagged default. **(5) heatedSF** — two candidate A1 fields, no pinned choice. Also naming drift a judgment-zero builder will hit: V2.2's `ceilingSurfaceSF`/`WASTE_DEFAULTS` vs A1/A11's `ceiling.surfaceSf`/`WASTE`.

  **5. THE ONE THING before WOs are cut.**
  Pin the re-apply contract triangle in A3/A4/A5 — `meta.appliedQty` (guard compares gross-to-gross, not net-to-gross), `meta.lineKey` (identity; label demoted to display), and the GET-meta serializer line — as one amendment, because WO-T1 is the first WO cut, it owns exactly these three contracts, and without the triangle T1 builds a machine whose prescribed use either refuses every re-apply or destroys the typed prices the tool exists to hold. Everything else on this list is an hour of pinning; this one decides whether the MVP's central workflow works at all.

