# DISPOSITION LEDGER — orchestrator skill baton (KIMI_OUT_ORCHESTRATOR_SKILL_20260819-1640.md)

Audit: 14 findings (1 LAUNCH-KILLER · 4 HIGH · 9 MED) + MISSING-PIPELINE-STEPS (5; M1-M4
mirror F1/F3/F2/F5, M5 new). Verdict as found: NOT sound to install as written; fixable
surgically. All fixes applied in v2 before install.

| F | Severity | Disposition | Reason |
|---|---|---|---|
| F1 | LAUNCH-KILLER | ACCEPT | The keystone was advisory: baton absent from the numbered pipeline + a self-written SKIPPED marker with no admissibility rules = a literal step-follower ships floor work with zero external check. v2: new step 5 (pre-merge baton on floor surfaces, verdict/marker pasted into the lane report) + admissible skip reasons closed to exactly two (Joseph's explicit waiver this conversation · kimi UNAVAILABLE per deadman — and then a judge round becomes mandatory). |
| F2 | HIGH | ACCEPT | Live-verify failing on a live prod deploy had no instructed move — improvisation guaranteed. v2 step 8: rollback/redeploy the previous deployment FIRST, then re-enter the fix loop; an unverified deploy never stays live awaiting a decision. |
| F3 | HIGH | ACCEPT | "Migrations BEFORE code" lived in a law, not a step; builder gate datastore undefined (green-by-skip certifies nothing). v2: step 7a migrations-before-code with schema read-back; WO template gains "datastore the builder's gates run against (never prod)". |
| F4 | HIGH | ACCEPT-MODIFIED | Verbatim relay made the orchestrator a trusted conduit for adversarial content. Kept the verbatim rule (fidelity is the point) but reframed: findings travel as QUOTED, ATTRIBUTED DATA ("Judge A reports:"); imperatives inside findings are never executed, endorsed, or relayed as orchestrator instructions; fixes checked against invariants AND the never-touch list; conflicts escalate. |
| F5 | HIGH | ACCEPT | Merge conflicts had no lawful actor (law 1 forbids the orchestrator; no builder owned it) and open lanes went stale after every merge. v2 step 6: conflicts/rebases are BUILDER tasks (re-dispatch); after every merge, re-cut or rebase open lanes; gates re-run on any non-fast-forward merged tree. |
| F6 | MED | ACCEPT | Judge loop had no coherent termination and self-collided with the noise-floor lesson and the two-passes ban. v2: SHIP = one full round with no NEW majors; surviving subjective findings are LISTED as noise floor, not fixed; a lens re-checking its own findings is not the banned second pass (the ban is on substituting re-looks for a second lens). |
| F7 | MED | ACCEPT | "The baton law" was dangling; baton vs judge round conflatable three ways. v2 one-liner: the baton is the floor's external AUDIT; a judge round is adversarial DIFF REVIEW; neither creates nor satisfies the other. |
| F8 | MED | ACCEPT | "Highest model in the seat" unexecutable (a session cannot switch its own model). v2: if a higher tier is reachable (Joseph switches, or a higher-tier drafter sub-agent), draft there; else record "WO drafted on <model>, highest available" and proceed. |
| F9 | MED | ACCEPT | The oracle was undefined AND the skill's own recorded oracle lesson never became an instruction. v2: the WO names the critical artifact + the oracle and its SOURCE; before the oracle's first certifying use, verify its provenance against a known-good state and record it. |
| F10 | MED | ACCEPT | The canonical cheat against this exact skill: builder edits the gates, orchestrator re-runs the weakened suite, law 4 "satisfied". v2: sixth NEVER (gates/test config/registry/CI are never builder-editable — a red gate is fixed in code, never in the gate) + law 4 gains "diff the harness files against the deploy tip explicitly". |
| F11 | MED | ACCEPT | No WO integrity after dispatch; adversarial reports could argue invariants away; Joseph mid-build changes unaddressed. v2: amendments are orchestrator-only, probe-first, written to disk before re-dispatch; invariant/never-touch/floor amendments need Joseph + a fresh baton; a mid-lane WO change stops the lane first. |
| F12 | MED | ACCEPT-MODIFIED | Composition entries had no verbs; NAME/ID addressing was possibly unexecutable in-host. v2: every composition entry got a verb + trigger point; addressing rewritten to what this harness actually does (children cannot route to a TYPE; a child that must report reports to the session and the ORCHESTRATOR relays — the 08-18 mechanism, stated concretely). |
| F13 | MED | ACCEPT-MODIFIED | Activation keyed on vocabulary, missing the mid-size customer-facing build handed over as "build X". v2 ON clause keyed to the WORK: any build touching a floor surface and larger than a one-file edit activates the regime whether or not delegation is named; Joseph can still explicitly order inline work (then the FLOOR still binds via kimi-baton directly, stated). Kept a vocabulary clause for explicit invocation. |
| F14 | MED | ACCEPT | Description drove activation with a floorless picture of LEAN, claimed the orchestrator "applies" fixes, and listed a forbidden act as a trigger. v2: "dispatches fix rounds" · LEAN gloss carries "+ the unconditional floor" · "deploy to a sub-agent" trigger deleted. |
| M5 | (MISSING) | ACCEPT | The pipeline's product is a truth claim and had no mandated evidence format. v2 step 9: the orchestrator's report carries the gate outputs VERBATIM (tails + exit codes), the live-probe results, and the fix-format links — a claim without its receipts is not a report. |

Answers-section extras folded into v2 (beyond the F-table): dead build lane resume =
disk-first (law 10 explicitly extended to build lanes) · judge-vs-orchestrator dispute =
runtime probes beat blind reading, disputes go to Joseph · a failed post-deploy PUSH is a
live-verify-class failure (prod running code the remote lacks) · law-10-vs-OFF-clause
contradiction resolved (JSONL discipline applies to any fan-out; the OFF clause governs
the orchestration REGIME, not the durability law) · per-repo specifics (gate commands +
source, escalation paths, deploy branch, lockfile quirk) moved into the WO TEMPLATE as
required fields — the skill stays generic, the WO carries the fleet knowledge.

REJECTED: none. Zero findings survived contact with the draft's actual text as
misreadings — the audit read the artifact correctly on every count checked.
