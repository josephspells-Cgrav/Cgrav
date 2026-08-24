# DISPOSITION LEDGER — kimi audit of WO_SEO_LANE_M (OUT: KIMI_OUT_WO_SEO_LANE_M_20260819-2140.md, 16 findings + 3 MISSING)
Dispositioned by OS60, 2026-08-19 ~10:30pm ET. Fixes live in the WO's AMENDMENTS v2 block (+§Z scope addition from GSC recon).

| F | Severity | Disposition | Reason |
|---|---|---|---|
| F1 | HIGH | ACCEPT | The vacuous-proof catch — redirect-following probes would certify unfixed behavior as fixed. v2.A mandates redirect-disabled raw-first-response assertions + a named audit of the existing client (node:http, believed non-following — builder confirms). THE ONE THING, taken verbatim. |
| F2 | HIGH | ACCEPT | §2.3 prose vs the oracle's /roof-replacement/ row contradicted on hop order. v2.B pins a numbered chain: LEGACY_301 fires on the normalized path BEFORE the slash 308 → one hop. Oracle row rewritten. |
| F3 | MED | ACCEPT | The literal pseudo-code self-redirected "/". v2.B step 6 makes the redirect condition pathname !== normalized — root structurally cannot redirect. |
| F4 | MED | ACCEPT | Relative Location pinned (matches the probed normalizer output); guard asserts parsed pathname+search, never literal absolute strings (v2.C). |
| F5 | MED | ACCEPT | I6 was FALSE — slash forms of excluded paths lose the built-in 308. v2.D scopes it correctly, adds /robots.txt/ + /sitemap.xml/ probes with the redirects() contingency. |
| F6 | MED | ACCEPT | slice(0,-1) vs "defensive" contradiction; v2.B uses replace(/\/+$/,"") and the matrix gains a // row. |
| F7 | MED | ACCEPT-MODIFIED | Constraint list adopted for every derived source (v2.E). Runtime pin RESOLVED as probed fact rather than a builder pre-flight: Node 24.14.1 (strip-types default-on) + spam-410-guard already imports .ts natively and ran green at Lane 1 — the mechanism is proven on this exact machine. |
| F8 | MED | ACCEPT | Sampling escape hatch deleted — all 137 probed; URL source named (live /sitemap.xml parse) (v2.F). |
| F9 | MED | ACCEPT-MODIFIED | Host dimension added to the orchestrator's live re-run matrix (v2.G). Platform-redirect half resolved by probe: www serves the deployment directly, no host-level redirect (www spam URL 308→410 on www itself, 9:18pm) — recorded with an escalate-if-different rule. |
| F10 | MED | ACCEPT | Query-preservation rows added (legit + spam forms) (v2.G). |
| F11 | MED | ACCEPT | %2F probe row added as record-actual with expected branches (v2.G). |
| F12 | MED | ACCEPT | Red-on-derivation contingency added: record verbatim + STOP; pre-existing gaps are findings, not the builder's to fix (v2.E). |
| F13 | MED | ACCEPT | Export contract pinned + re-verify-at-report-time; orchestrator carries the rebase-order rule (lib lanes land first → re-cut M and re-gate before its merge — already the pipeline's 1915-F3 law, now named in-WO) (v2.E). |
| F14 | LOW | ACCEPT | CITY_NAMES: read consumption shape first, derive to match (v2.E). |
| F15 | LOW | ACCEPT | Runtime-shift acknowledged + cache-control parity instruction (v2.H). |
| F16 | LOW | ACCEPT | One HEAD row added; GET-only otherwise stated (v2.F/G). |
| MISSING-ORACLE-ROWS | — | ACCEPT | All rows added in v2.G. |
| MISSING-RUNTIME-PIN | — | ACCEPT-MODIFIED | Resolved by orchestrator probe (Node 24.14.1 + working precedent), stated as fact in v2.E. |
| MISSING-EXPORT-CONTRACT | — | ACCEPT | Pinned in v2.E. |

Also folded post-audit (not a kimi finding): §Z scope addition — the GSC-recon flat-slug kill rule (~5.5K indexed spam, root word-salad slugs; ≥4-hyphen single-segment rule + whole-token keyword families, both guard-validated, 9 observed positive controls quoted). §Z was added AFTER the baton run — it inherits v2.A/v2.B/v2.G mechanics (redirect-disabled probes, normalized-path matching, negative controls) and will be adversarially covered by the PLUS-JUDGE rounds; flagged here so the receipt honestly states the baton did not see §Z.

Verdict quoted: "Not sound to execute as written... Both fixes are one paragraph each." Both are in, plus fourteen more.
