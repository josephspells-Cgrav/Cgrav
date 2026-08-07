# MAASS TRUTH DRAFT — hand-verified countables (OS48, started 2026-08-07 ~6:00am ET)

**Status: DRAFT.** Authored BEFORE any pipeline extraction exists (anchoring-proof order).
Final `fixtures/maass-truth.yaml` gets built after the pipeline ships, verified per-value
against page/tile citations + vision tiles. This file records what the TEXT LAYER alone
establishes, and what it demonstrably CANNOT.

## SOLID (schedule-grade, high confidence)
- **Area schedule (pg 7):** COVERED WALKWAY 76 · GABLED FRONT PORCH 299 · GABLED SIDE
  PORCH 1204 · GARAGE 784 · LIVING 3450 · **grand total 5813 SF** (Σ parts = 5813 ✔).
  Both the schedule table AND plan callouts emit these (76/299/1204 appear twice in text —
  the two-emission pattern the pipeline's dedupe must not double-count).
- **Sheet map:** 17 sheets per PROBE P3.
- **Shell system:** hybrid metal shell + wood infill between girts (pg 9 legend verbatim +
  pg 17 "VERIFY WITH METAL BUILDING ENGINEER").

## ⚠️ DEMONSTRATED SUBTLETY — tag counts differ BY TEXT-EXTRACTION MODE
pg 9, same page, two pypdf modes:
- joined-text regex histogram: `3060SH ×8 · 3080 ×7 · 3080FX ×2 · 3060FX ×1 · 2680 ×2`
- positioned-visitor items: `3080 ×6 · 2680 ×1` and **zero** `3060SH` as standalone runs
Window tags evidently render as split/merged text runs depending on traversal. ⇒ The truth
file's window/door counts must be established by VISION TILES + eyeball, with the text
histogram as a cross-check only — neither text mode alone is authoritative. (The pipeline
uses pdfjs — a THIRD traversal; its S3 tag stage must survive this, and the harness must
never grade tags against an un-eyeballed text count.)
Coordinate note: pg 9 items carry negative/transformed coords — bbox math must apply the
page CTM/mediabox, not raw transform values.

## CONFIRMED-BY-PROBE routing facts
- pg 7 = AREA plan (5 areas only). Interior room labels (bedrooms/bath/kitchen) are NOT in
  pg 7's text → rooms come from pg 9 annotation (A13 corrected accordingly).
- Legend anchors on pg 9 sit at far-left coords ("WALL LEGEND"/"OTHER LEGEND") — legend
  exclusion by anchored bbox is viable.

## TO ESTABLISH AT VERIFICATION TIME (vision tiles + OS48 eyeball, per assembly)
windows by type · ext/int/garage doors · rooms (names, finishes, crown) · wall segment dims
+ heights · slab thickness + footing dims · roof faces/pitch/ridge/covering/decking ·
electrical device counts · plumbing fixture counts.
