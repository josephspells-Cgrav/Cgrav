• Read the file.Now audit the four additions:

  1. Section "⛔ THE PREDECESSOR DOES NOT DIE — STAND-DOWN + LIVENESS PROBE" (lines 86–124)
  2. Step 3a in skeleton §0 (lines 140–143)
  3. PREDECESSOR LIVENESS paragraph in spin-up prompt (lines 206–210)
  4. Stand-down clause in DEFINITION OF DONE (line 57)

  Audit targets:
  - Contradictions with 'Orient then ASK', compaction section, ephemeral-state stamp, ledgers
  - Ambiguities a future session could exploit to skip stand-down
  - Missing failure modes: list_sessions unavailable; predecessor ignores message; both think they're successor
  - Whether spin-up prompt addition survives fresh-agent reading

  Let me find issues:

  **Contradiction 1: "Orient then ASK — never auto-start" vs liveness probe being automatic.** §0 step 4 says read-only orientation (1–3) is automatic; launching a work task is user's call. Step 3a is numbered between 3 and 3b/4, so it falls within "read-only orientation (1–3 above) is automatic" — but 3a is NOT read-only: it sends a message to another session and posts a blackboard claim. That's a mutation. The spin-up prompt also says "BEFORE resuming any run" — "resuming the run" contradicts "never auto-start / never auto-launch any work task". The spin-up prompt's PREDECESSOR LIVENESS paragraph says "send_message it a stand-down... BEFORE resuming" — "resuming" implies the successor will resume the run automatically, conflicting with "Do NOT auto-start or auto-launch any task — picking the next task is <user>'s call" later in the same prompt. That's a MAJOR contradiction: the new material presumes the successor resumes the run autonomously, while the rest of the skill (§0 step 4, Principles last bullet, spin-up prompt ON ARRIVAL paragraph) says the user picks.

  Actually one could argue "resuming the run" is conditional on user approval, but the word ordering suggests the probe is a precondition to resuming — the tension is real. Also the "mandatory when arriving mid-run" — mid-run implies an active autonomous run, which the handoff itself is not supposed to auto-start. There's an internal tension: the whole liveness protocol is designed for mid-run handoffs (autonomous orchestrators), but the skill elsewhere insists a handoff never auto-starts. At minimum it's an ambiguity about which regime applies.

  **Ambiguity 1: "mandatory if arriving mid-run"** — who decides "mid-run"? A fresh successor has zero context; the handoff may not say "mid-run". Nothing defines how to detect mid-run. A successor can trivially conclude "not mid-run" and skip. Also DoD says stand down "on every handed lane" — "handed lane" is undefined in the DoD; the skill never defines what a lane is at the DoD level. And DoD's stand-down is on the WRITE side, but there's no LEDGER for it — the 5 ledgers gate "done" and none covers the stand-down; DoD says "all 5 ledgers clean" and separately the stand-down clause. A ledger gap → HALT applies to the 5 ledgers; the stand-down has no artifact/ledger, contradicting the anti-skim hardening principle "every gate leaves a LEDGER; the artifact is the proof, a claim is not." That's a MAJOR: the new gate has no ledger, directly conflicting with §ANTI-SKIM HARDENING ("claim ≠ done").

  **Ambiguity 2: DoD stand-down "surviving detached processes handed forward by PID"** — this is consistent with the ephemeral-state stamp actually (stamp says session-scoped processes die with session; but the new material says detached OS processes SURVIVE the session). Wait — the EPHEMERAL-STATE STAMP (line 45) says session-scoped live processes "DIE WITH THE SESSION" — monitors, sig-watches, dev servers, background tasks. The new section (lines 101-102) says "Detached OS processes (e.g. a backgrounded kimi builder) SURVIVE the session — never assume they die with you". That's a direct contradiction. The stamp says background tasks die with the session; the new law says detached OS processes survive. There's a real distinction (in-session background tasks vs detached OS processes) but the stamp's list includes "dev servers, background tasks" which are precisely the things that might be detached OS processes. A future session can read the stamp to justify not handing PIDs forward ("the kernel law says they die with the session"). This is a genuine contradiction needing reconciliation — MAJOR or at least MINOR-to-MAJOR. I'd call it MAJOR because it contradicts a dated law with a receipt.

  Actually careful: ephemeral stamp is about what to WRITE into durable records ("Never write one into the kernel, memory, or a handoff as a standing fact"), whereas the new section says hand PIDs forward in §2. These could conflict in behavior: stamp says write as Open Loop "dies with it → RE-ARM", new says hand PIDs forward in §2 as live state. Both are about the same class of thing. The two instructions give different treatments: stamp says treat as dead and record re-arm command; new section says treat as alive and hand PID forward. Which applies to a backgrounded builder? Genuinely contradictory. MAJOR.

  **Missing failure modes:**
  - list_sessions unavailable (MCP server down, tool not registered): no fallback specified. The probe is "mandatory" but no instruction if the tool errors. Successor could treat tool-unavailable as "not running" and skip. Missing.
  - Predecessor ignores the stand-down message (it's mid-turn, never reads inbox/messages until turn ends; or ignores): no escalation, no timeout, no "wait for ack" requirement. The protocol says SEND a stand-down, then resume — send ≠ stood-down. No verification step (e.g., re-probe isRunning, wait for ack). A dueling orchestrator can continue while the successor believes it stood down. Missing.
  - Both sessions think they're the successor: no tie-break. The blackboard ownership claim is posted but nothing says to CHECK for an existing ownership claim before claiming. No rule for who wins if two claims exist. The liveness probe is framed as predecessor vs successor, but nothing addresses successor-vs-successor. Missing.
  - Also: send_message to predecessor — the receipt shows the predecessor fired builders; the stand-down relies on the predecessor honoring "route WORK to successor," but if the user keeps typing work into the old window, no enforcement. Minor.
  - No ack/confirmation loop: after send_message, does successor wait? Unspecified.

  **Spin-up prompt fresh-agent test:**
  - The PREDECESSOR LIVENESS paragraph references `list_sessions` and `send_message` bare — the section body uses full tool names `mcp__ccd_session_mgmt__list_sessions`. A fresh agent with zero context reading the spin-up prompt alone (its whole purpose: pasted into a brand-new session) sees bare "list_sessions" and "send_message" — may not resolve to the MCP tool names. MINOR-to-MAJOR. The prompt is supposed to be self-contained ("it is your complete brief" — well, the handoff file is the brief, and the handoff §0 3a also uses bare "list_sessions" but references the section which has full names). Actually 3a also uses bare names but points to the section. The spin-up paragraph does not point to the section. For a fresh agent, if the MCP server isn't in its toolset, the instruction is noise. I'd call it MINOR (the file is read first, and §0 3a points to the full section). But the spin-up prompt is the first thing read; the handoff is read next, which contains full names. So MINOR.
  - "If you are arriving mid-run" — a fresh agent has no idea if it's mid-run. Nothing in the prompt tells it how to determine that. Exploitable ambiguity: it can just decide it isn't. MAJOR-ish; I'll fold into the mid-run ambiguity finding.
  - Also the spin-up prompt's PREDECESSOR LIVENESS says "BEFORE resuming" — contradicts the same prompt's "Do NOT auto-start... picking the next task is <user>'s call." Fresh agent reading the prompt: one paragraph implies it will resume the run (autonomously), the final paragraph forbids auto-starting. Which wins? Contradiction within the prompt itself. MAJOR.

  **Step 3a numbering:** steps listed 1, 2, 3, 3a, 3b, 4. Step 4 says "Read-only orientation (1–3 above) is automatic" — "1–3" arguably excludes 3a/3b (or the count is just loose). But 3a involves mutations (send_message, blackboard post) — if a reader takes "1–3" to include 3a as automatic, it auto-acts; if "1–3" excludes it, is 3a automatic at all or does it need user approval? Ambiguous. MINOR.

  **Compaction section interplay:** The compaction READ-side law (post-compact sessions run successor ritual unprompted) — does the liveness probe apply to compact resumes? The probe is "mandatory when arriving mid-run" and lives in the handoff section; the compaction section (added 2026-07-27) doesn't mention probing liveness of the pre-compact session — but a compacted session is by definition dead (same session continued). Actually a post-compact session IS the same session, so no dueling. Not a contradiction. But: the compaction read-side law lists its ritual and doesn't include the liveness probe — consistent since compaction continues the same session. Fine, no finding.

  **Ledgers:** DoD adds stand-down as a requirement but the "5 LEDGERS" don't include a stand-down ledger (e.g., "no builder fires after spin-up emitted" is unprovable by artifact). Anti-skim hardening says "each is backed by a tool-derived artifact / written LEDGER... Any ledger with a gap → HALT." The new DoD clause has no ledger and no artifact — a claim suffices, exactly the failure mode the hardening section exists to kill. MAJOR.

  Also the WRITE-side stand-down is temporal: "From the moment the spin-up prompt is emitted" — but DoD requires "spin-up prompt emitted" AND stand-down; what about builders already in flight at emission? Covered by "surviving detached processes handed forward by PID" — okay.

  **"no deadman refires"** — term "deadman" used in write-side (line 100: "no deadman refires") and read-side ("tell it not to deadman-refire when its builders go silent"). "Deadman" is jargon undefined in this skill — a fresh agent may not know it. Minor.

  **Blackboard claim collision:** read side posts "a lane-ownership claim to the blackboard" — but no instruction to first CHECK whether a claim already exists, and no format/heartbeat specified. Combined with both-successor scenario. Fold in.

  **STATE-SURVEY GATE** (lines 121–124) — is this part of the new additions? It's within the added section (the section spans to line 124). It's tangential to the stand-down topic — placed under the PREDECESSOR section but unrelated; a reader might think it's part of the protocol. Not a contradiction; arguably MINOR scope/placement issue but user said don't restyle. Could mention as MINOR that it's unrelated content inside a ⛔-titled section, diluting... but they said don't restyle; a finding about placement is borderline. I'll include as MINOR since it can be misread as part of the stand-down law.

  Also: the WRITE-side says "If the user keeps typing in the old window, answer questions from context but route WORK to the successor" — "route WORK to the successor" — how? send_message? Undefined mechanism. Minor ambiguity.

  Contradiction with 'Orient then ASK': §0 step 3a says "BEFORE resuming any run" — but step 4 says never auto-start; the probe is fine, but the phrase "resuming the run" presumes an autonomous run exists. In a normal handoff there IS no run to resume until the user picks. So 3a's conditional framing ("mandatory if arriving mid-run") carves an exception: if mid-run, successor resumes a run — apparently without user pick? The Principles bullet explicitly distinguishes role-handoff vs autonomous agent-launch ("the latter is explicitly told to execute; a handoff is not"). The liveness protocol blurs this: mid-run arrival looks exactly like an autonomous launch but the spin-up prompt never says "you are told to execute." A fresh successor could read "BEFORE resuming any run" as authorization to resume autonomously. MAJOR contradiction with Orient-then-ASK.

  Let me also check: does the DoD stand-down conflict with "Never ship in a handoff turn without the user's final eyeball"? No.

  Line 57 DoD: "outgoing session STOOD DOWN on every handed lane (⛔ THE PREDECESSOR DOES NOT DIE — no further builders/edits/deploys on handed lanes from this session, surviving detached processes handed forward by PID)". "handed lane" — the handoff header says "You own: …" so lanes are defined in header. OK-ish.

  Now compile findings, ordered by severity:

  MAJOR:
  1. Ephemeral-state stamp contradiction (line 45 "DIE WITH THE SESSION... background tasks" vs lines 101–102 "Detached OS processes... SURVIVE the session"). Same class (backgrounded builders/dev servers) gets opposite treatments: stamp says record as dead + RE-ARM command; new law says hand PID forward as live. No reconciliation criteria for which applies.
  2. No ledger/artifact for the new DoD stand-down gate — violates §ANTI-SKIM HARDENING (lines 30–31: "every gate leaves a LEDGER... a claim is not" proof). The 5 ledgers are unchanged; "all 5 ledgers clean" can be met while stand-down is merely claimed. Also the READ-side probe has no ledger either.
  3. "Mid-run" undefined + unverifiable by fresh successor → exploitable skip. Lines 103 ("mandatory when arriving mid-run"), 140 ("mandatory if arriving mid-run"), 207 ("If you are arriving mid-run"). No detection procedure; a successor with zero context defaults to "not mid-run."
  4. Missing failure modes: (a) no fallback if list_sessions/send_message unavailable; (b) send ≠ stood down — no ack/timeout/re-probe requirement, predecessor may ignore; (c) no tie-break if two sessions both believe they're successor (no check-for-existing-claim before posting ownership claim). Maybe split into separate findings.
  5. "BEFORE resuming the run" vs Orient-then-ASK contradiction: lines 106-107, 143, 209 presume the successor resumes a run; line 148-150, 225-227, 240 forbid auto-start. Fresh agent can read the liveness protocol as authorization to autonomously resume.

  MINOR:
  6. Bare tool names `list_sessions`/`send_message` in spin-up prompt (206-210) and 3a (140-143) — full names only in section body; fresh agent in a new session may not have/recognize the MCP tools; spin-up prompt is meant to be self-sufficient.
  7. §0 numbering: step 4 says "Read-only orientation (1–3 above) is automatic" but 3a is a mutation (sends message, posts claim) — is 3a automatic or user-gated? Unclear.
  8. "deadman refires" jargon undefined in skill.
  9. STATE-SURVEY GATE (121-124) placed inside the PREDECESSOR section though unrelated — risks being misread as part of the protocol / dilutes the ⛔ section. (Borderline restyle; include as MINOR.)
  10. "route WORK to the successor" (line 100) — no mechanism specified.

  Verdict: AMEND-NEEDED.

  Format: numbered findings with exact line/quote, then verdict. Keep concise.

To resume this session: kimi -r session_1e1c4af0-35d9-4b3b-8884-0c83984b66ac
