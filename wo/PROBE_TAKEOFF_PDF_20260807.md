# PROBE RECEIPT — the Maass PDF ground truth (OS48, 2026-08-07 ~4:37am ET)

Probed with pypdf 6.12.2 against
`C:/Users/josep/Downloads/SS Lake - Final MAASS BARNDO (RE-MODEL OF FAIRFEILD IV) - REVISED FINAL 04-30-2024 (3).pdf`
(11.9MB). Supersedes assumptions in PLAN_TAKEOFF_MVP_20260807.md §0/D2/D3 where they conflict.
The Kimi audit ran against the plan AS WRITTEN (artifact untouched mid-audit); this receipt
feeds the disposition ledger + the WOs.

## P1 — 🔴 THE SET IS 17 PAGES, NOT 122. [PROBED]
The vault note's "122-page ARCH-E construction set" is FALSIFIED for the file on disk
(page count via pypdf: 17; every carried number is a lead, not a truth). Same document
identity confirmed: cover title block reads FAIRFIELD IV (MOD) / LINDA L. MAASS /
REVISION FINAL - 04/30/2024. Consequences: cost/latency concerns (plan R9) mostly evaporate;
one flag to Joseph — if a fuller 122-page engineering set exists somewhere, this file is not it.

## P2 — BORN-DIGITAL, FULL TEXT LAYER, EVERY PAGE. [PROBED]
32 `/Font` objects, 8 embedded FontFiles, 0 zero-text pages, median 3,011 chars/page.
pypdf `extract_text()` returns title blocks, notes, schedules, dimension strings, labels.
**Extraction becomes TEXT-FIRST (deterministic, $0) with vision for spatial association +
symbol counting only.** pypdf visitor callbacks give per-string coordinates → tag dedupe and
wall↔dim association can be CODE, cross-checked by vision instead of discovered by it.

## P3 — THE SHEET MAP (extracted deterministically from title blocks)
| pg | sheet | name |
|---|---|---|
| 1 | A0-0 | COVER SHEET |
| 2-4 | A0-0a/b/c | 3D VIEWS |
| 5 | A0-1 | GENERAL NOTES (19,564 ch) |
| 6 | A0-2 | SPECIAL NOTES (11,261 ch) |
| 7 | A1-1(?) | FIRST FLOOR PLAN + **AREA SCHEDULE** |
| 8 | A1-1a | FIRST FLOOR DIMENSION PLAN |
| 9 | A1-1b | FIRST FLOOR ANNOTATION PLAN |
| 10 | A1-3 | FIRST FLOOR OVERALL DIMENSION PLAN |
| 11 | A2-1 | OVERHEAD ROOF LAYOUT |
| 12 | A3-1 | ELEVATIONS (FRONT/BACK) |
| 13 | A3-1a | ELEVATIONS (LEFT/RIGHT/GARAGE L/HOUSE R) |
| 14 | C1-1 | OUT-TO-OUT FOUNDATION |
| 15 | E1-1 | FIRST FLOOR BASIC ELECTRICAL PLAN |
| 16 | P1-1 | BASIC PLUMBING PLACEMENT |
| 17 | S1-1 | ESTIMATED COLUMN PLACEMENT "(VERIFY WITH METAL BUILDING ENGINEER)" |

## P4 — AREA SCHEDULE EXTRACTED AS TEXT (pg 7). [PROBED]
COVERED WALKWAY 76 SF · GABLED FRONT PORCH 299 SF · GABLED SIDE PORCH 1204 SF ·
GARAGE 784 SF · LIVING 3450 SF · Grand total 5813 SF. (Matches the vault note's number set.)

## P5 — PLAN R4 CONFIRMED: NO WINDOW/DOOR SCHEDULE SHEET EXISTS. [PROBED]
Authoritative source for windows/doors falls to floor-plan/annotation tags (A1-1b) with
elevation cross-check — the WEAK path is the ONLY path; confidence model must reflect it.

## P6 — METAL-SHELL BOUNDARY VISIBLE IN THE SET. [PROBED]
S1-1 columns deferred to the metal building engineer; roof LAYOUT exists (A2-1) but truss/
purlin engineering is supplier-side → assembly 6 (roof structure) leans FLAGGED by design.

## P7 — Probe scripts (seed material for WO-T2, cite don't rediscover)
Scratchpad `pdfprobe.py` / `pdfmap2.py` (session scratchpad dir) — page count, per-page text,
title-block tails. Trivial to port into the pipeline's S1 classification stage.
