# DISPOSITION LEDGER — Lane M pre-merge floor baton (OUT: KIMI_OUT_LANE_M_PREMERGE_20260819-2258.md, 6 findings)
Dispositioned by OS60, 2026-08-19 ~11:15pm ET. Verdict quoted: "SOUND TO MERGE: YES — zero launch-killers and zero HIGH findings."

| F | Severity | Disposition | Reason |
|---|---|---|---|
| F1 | MED | ACCEPT | Rule-2 ASCII asymmetry (ñ/CJK tokens break the keyword walls; /juega-poker-españa evades all rules). One-line unicode widening + a positive control, folded in the final micro round — fail-safe direction, zero legit-URL risk. |
| F2 | LOW | DEFER (queued) | Count-only LEGACY_301 tripwire can miss same-count replacement drift. Real but future-edit protection; content-equality derivation queued to the follow-up board, not tonight's five-file diff. |
| F3 | LOW | DEFER (queued) | Sitemap-count floor (≥130) against hollowed-corpus green. Same class: future-edit protection, queued. |
| F4 | LOW | ACCEPT | No probe timeout = infinite hang instead of fail-closed. One line, folded. |
| F5 | LOW | DEFER (queued) | Matcher `quote` prefix-wide exclusion — pre-existing, and the WO's NEVER-touch bans matcher churn tonight; `quote(?:\/|$)` queued with its rationale (skip-normalizer raised its blast radius). |
| F6 | LOW | ACCEPT-MODIFIED | \p{M} gap acknowledged via the in-file comment kimi offered as sufficient; widen only if GSC ever shows diacritic salads. |

THE ONE THING (post-deploy live probes on the production edge BEFORE submitting GSC removals — multi-slash/%2F rows are the platform-divergence risks) — ACCEPTED into the deploy runbook: the live-verify matrix runs on apex+www before the removals pilot, exactly the 410-direct/308/open-redirect classes kimi named.
MISSING-EVIDENCE notes stand as recorded (doorway-check derivation was judge-A-verified in the lane; withBotId config-merge is covered by the guard's slashed-spam controls on the local build and by the post-deploy live matrix on prod).
