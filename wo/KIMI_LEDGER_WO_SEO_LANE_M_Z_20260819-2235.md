# DISPOSITION LEDGER — kimi §Z delta audit (OUT: KIMI_OUT_WO_SEO_LANE_M_Z_20260819-2235.md, 6 findings)
Dispositioned by OS60, 2026-08-19 ~10:15pm ET. Fixes travel to the Lane M builder as FIX_ROUND_1_SEO_LANE_M.md (quoted verbatim there).

| F | Severity | Disposition | Reason |
|---|---|---|---|
| F1 | HIGH | ACCEPT | LEGACY_301 + B-section migration SOURCES are real URLs the guard never enumerates, and §Z fires before both — a 4+-hyphen legacy source would 410 instead of 301 with a green guard. Sources join the negative control. |
| F2 | HIGH | ACCEPT-MODIFIED | Both halves taken: rule 1 gains a root-route exemption derived from the app/ dir listing at guard-time (mechanical, forever), AND the two invariants get named in a code comment at the rule (no ≥4-hyphen root slug; no root [slug] dynamic segment). The guard is already a named npm gate in the deploy chain — permanence rides the existing gate wiring, not new CI. "Plausibly-future" claim survives only because of the exemption mechanism. |
| F3 | MED | ACCEPT | Rule 2 pinned to the same root-single-segment scope as rule 1; `slots` gets the dual-use code comment; `bally` noted as maintenance-flagged. |
| F4 | MED | ACCEPT | Lowercase the MATCH copy of the path before both rules (Location/redirect copy untouched); negative control asserts all real routes are lowercase; oracle row /ONLINE-CASINOS-CURACAO-2026 → 410 added. |
| F5 | LOW | ACCEPT | Ceiling gains the nested-multi-segment sentence ("out of scope, will 404, prevalence unknown"). |
| F6 | LOW | ACCEPT | Positive controls annotated per rule; a rule-2-only isolation control required (3-hyphen keyword slug that no earlier rule catches — verify /online-casinos-curacao-2026 qualifies, else add one). |

MISSING-EVIDENCE answered in the builder's report (legacy source lists, lowercase status, guard permanence) — required verbatim.
