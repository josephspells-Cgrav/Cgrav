# Disposition ledger — kimi audit of km-handoff stand-down edit (2026-08-20 12:45pm ET)

Audit: KIMI_OUT_HANDOFF_SKILL_AUDIT_20260820-1240.md · Verdict was AMEND-NEEDED · All findings dispositioned:

| # | Finding | Disposition |
|---|---|---|
| 1 MAJOR | Contradicts EPHEMERAL-STATE STAMP | **FIXED** — new "Process-survival criterion" bullet: STAMP governs harness constructs (die → RE-ARM line); detached OS processes with own OUT/ERR survive (→ PID handoff). Litmus: would Get-Process show it after the window closes. |
| 2 MAJOR | No ledger for the new gate | **FIXED** — 6th STAND-DOWN LEDGER added (write side: RUN-STATE stamp + dated stand-down line + surviving-PID list in the handoff header; read side: probe receipt in the orientation receipt). DoD updated to "all 6 ledgers". |
| 3 MAJOR | "Mid-run" undefined = skip hatch | **FIXED** — writer must stamp RUN-STATE: AT-REST / MID-RUN in the header; successor treats a MISSING stamp as MID-RUN (fail closed). Wired into the law, 3a, and the spin-up template. |
| 4 MAJOR | No fallback if ccd tools absent | **FIXED** — DEGRADED PATH: Win32_Process command-line scan for the lane's worktree/WO + blackboard scan; tool-unavailable ≠ predecessor dead; duel-alert stays on either way. |
| 5 MAJOR | send ≠ stood down | **FIXED** — message is a NOTIFICATION not a negotiation; before any IRREVERSIBLE lane action, verify by EVIDENCE (no new predecessor-authored lane mutations since send); if mutations continue, kill its lane processes by PID + record. The ~8-minute receipt is cited. |
| 6 MAJOR | Two-successors tie-break missing | **FIXED** — CHECK the blackboard for an existing claim BEFORE posting; live conflicting claim → lineage decides (successor named in the NEWEST handoff); unresolvable → HALT the lane, surface to user. |
| 7 MAJOR | "Before resuming" vs Orient-then-ASK | **FIXED** — explicit regime bullet: resume applies ONLY under an explicit autonomous-continuation order in the spin-up prompt (agent-launch regime); otherwise Orient-then-ASK, probe still runs during orientation. Spin-up template ends with "resume only if explicitly told to". Probe/claim declared coordination actions, auto-authorized. |
| 8 MINOR | Bare tool names in 3a + template | **FIXED** — full mcp__ccd_session_mgmt__* names in both. |
| 9 MINOR | "(1–3 above)" scope ambiguity | **FIXED** — 3a self-declares "auto-authorized like step 3, not a work task". |
| 10 MINOR | "deadman refires" undefined | **FIXED** — inline definition "(a deadman = your own refire-on-silence timer for a builder you launched)". |
| 11 MINOR | "Route WORK" mechanism unspecified | **FIXED** — "tell them the successor session now owns the lane — never execute lane work yourself". |
| 12 MINOR | STATE-SURVEY GATE swallowed by new section | **FIXED** — gate paragraph moved back above the new section header (restored to the compaction section). |

No finding rejected. Prior backups intact (4 dated .bak files); edit is additive + documented here and in [[km-dueling-orchestrators-2026-08-20]].
