# DISPOSITION LEDGER — Kimi V2 re-audit (OS48, 2026-08-07 ~5:50am ET)

Audit: `KIMI_OUT_TAKEOFF_MVP_V2_20260807-0520.md` — 13 findings, verdict "one amendment
cycle short." All pins land as **AMENDMENTS v3** in the plan; WO-T1/T3 reconciled in place
(they had already absorbed some of what the plan lacked — the F13 drift class cut both ways).
No third audit fires: every fix is a 1-3 line pin prescribed by the auditor; applying them
verbatim IS the disposition, `paranoia` still gates the deploy. (Skill law: the repair
re-fire is spent; a third full pass is judgment, declined for diminishing returns.)

| F | Sev | Disposition | Reason |
|---|---|---|---|
| F1 | LAUNCH-KILLER | **ACCEPT** | The triangle is real and mine: net-vs-gross guard trips forever; label identity dies on waste retune; (c) hand-renamed labels were undetectable. Pinned: `meta.appliedQty` (gross, guard compares gross↔gross) · `meta.lineKey` (identity `assemblyKey[:entityId]`; label DEMOTED to display, the label-changed guard clause DELETED — renames are free) · `meta.wastePct` (labels display-only). (d) hand-line duplication: accepted residual — ApplyResult lists inserted lines, UI shows them beside kept hand lines; tripwire = Sean's eyeball on the apply summary. |
| F2 | HIGH | **ACCEPT** | Heights had no routed source (no sections sheet) and no default — falsifying A1's own law across #3/#5/#9/#12/#15. Pinned: A13 pg12-13 role extended to vertical dim strings as the height source; `WALL_HEIGHT_FT:9` flagged default in A11 (Sean's 8/9/10 register; he corrects inline). |
| F3 | HIGH | **ACCEPT** | The GET pin lived in WO-T1 §4 but NOT in the plan — the ledger over-claimed the artifact. One line added to A4 (GET serializer returns meta; CSV = meta-less hand lines by design). The WO already complied; the plan now says it. |
| F4 | HIGH | **ACCEPT-MODIFIED** | The breaking-change risk is real; the ownership was NOT unowned — WO-T3 §1 already carries the client retrofit (send token, 409→refetch). Modification: pinned the missing piece — T1+T3 DEPLOY TOGETHER (one release; OS48 merges both before any deploy), stated in the plan and both WOs, so no window exists where the live client 400s. |
| F5 | HIGH | **ACCEPT** | A resumed run silently serving another model's cache corrupts the exact table that sets the runtime default. Cache key = `(sourceSha256, page, stage, model, promptHash)` pinned in V2.3. |
| F6 | HIGH | **ACCEPT** | My geometry row was arithmetic error (150 DPI ⇒ 4×5=20, not ≤12). Pinned: geometry 150 DPI ≤20 tiles; raster-fallback pages inherit the symbol class (200 DPI ≤35); gate 0 prints page box dims so ARCH-E is verified per-file, not inherited. |
| F7 | MED | **ACCEPT** | Six by-design flags would fail a healthy Maass run — gate theater. A2 flags gain `class: "design_boundary"\|"extraction_uncertainty"`; the F15 usefulness gate counts extraction_uncertainty ONLY. |
| F8 | MED | **ACCEPT** | The arbiter lived in a probe receipt, not the plan. Pinned into S4/A2: text-layer values are AUTHORITATIVE; vision only associates and counts symbols; same-entity disagreement → flagged line carrying the TEXT value (class extraction_uncertainty). |
| F9 | MED | **ACCEPT** | "Union-with-provenance" was cited, never written. Written into Appendix A now: key = normalized tag; schedule count wins conflicts; tag-only types union in FLAGGED; entity objects gain `source: "schedule"\|"tags"\|"vision"`. Moot for Maass, law for set #2. |
| F10 | MED | **ACCEPT** | Token-first + crash mid-write bricks re-apply behind its own guard. Pinned order: org-scoped VERIFY (read) → row writes → `appliedAt` → conditional token UPDATE as the COMMIT (0 rows at commit → `conflict`, nothing claims success); crash signature documented (`appliedAt` null + advanced token ⇒ refetch, re-apply — idempotence is the transaction, house law 7). |
| F11 | LOW | **ACCEPT** | Confidence was builder-inventable. Rubric pinned: printed table/schedule text → high · tag corroborated by a passing cross-check → med · tag-only or vision symbol count → low · any named default → flagged regardless. |
| F12 | LOW | **ACCEPT** | Three defaults escaped A11's flag law — crown was the plan's only SILENT default (a law-4 breach). A11 gains `CORNERS_DEFAULT:4`, `R_VALUE_DEFAULT:{wall:"R-13",ceiling:"R-30"}`, `CROWN_DEFAULT:false`, each with pinned flag text; crown default now FLAGS the rooms param. |
| F13 | LOW | **ACCEPT** | Builders read section-by-section; v1 text was live ammunition. SUPERSEDED banners stamped on §0/D2/D3/D5 + a rule line: WOs cite V2/V3 sections only. Also fixed from answer 4: `hvac.heatedSf` pinned as the ONE heated-SF field (extractor fills it from the area schedule LIVING row); A1/A11 spellings canonical; the baseboard doorway-deduction formula promoted from WO-T1 into the plan (killing a live plan/WO drift Kimi caught from the outside). |

**Score: 13/13 dispositioned · 11 ACCEPT · 1 ACCEPT-MODIFIED (F4, ownership evidence) · 1 with named residual (F1d, eyeball tripwire) · 0 REJECT.**
