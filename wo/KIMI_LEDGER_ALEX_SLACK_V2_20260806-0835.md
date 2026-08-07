# DISPOSITION LEDGER — Alex Slack v2 plan audit (20 findings, dispositioned 2026-08-06 08:35)

OUT gate: ## VERDICT ✅ · ## FINDINGS ✅ · count: 20 (F1-F20) + MISSING (21 items, mirrors).
Verdict as found: "Not shippable as written — one structural re-keying." Accepted; the re-keying IS tranche 1.
Build split declared: T1 = ships this morning · T2 = queued same-week. Every T2 item is named, not dropped.

| F | Sev (as found) | Disposition | Reason / action |
|---|---|---|---|
| F1 side-effect-blind confirm gate | LAUNCH-KILLER | ACCEPT — T1 | THE ONE THING. Code-level SIDE_EFFECT registry over all 13 write verbs; verbs whose execution path can emit customer comms or initiate contact (set_job_stage→SMS map, send_document, schedule_appointment, pause_alex when resuming, set_do_not_contact lift) NEVER act-first on inferred referents; confirmation names target + outgoing effect. Pinned. |
| F2 act-first on inferred referents | HIGH | ACCEPT — T1 | Provenance rule in the gate: inferred (grounding/thread) referents allowed act-first ONLY for reversible internal verbs (add_note, create_task, set_task_status, cancel_cadence, pause when PAUSING). Everything else: referent must come from the requester's current message, else confirm. |
| F3 contact lookup not lead-keyed | HIGH | ACCEPT — T1 | find_contact_id gains lead-keyed path (leads.contact_id join) FIRST; fuzzy is fallback. The Randy fixture pins it. |
| F4 LIKE metachar injection | HIGH | ACCEPT — T1 | Escape %/_/\ + ESCAPE clause; fixture with "100%" input. |
| F5 phone normalization asymmetry | HIGH | ACCEPT-MODIFIED — T1 SQL-expression, T2 column | Both sides normalized in SQL (regexp_replace + leading-1 strip) — correct and fine at 722 rows. The indexed phone_digits COLUMN migration is T2 (perf-only at this scale). Bidirectional fixtures now. |
| F6 pricing row conditional | HIGH | ACCEPT — T1 | Probe pricing table for claude-opus-5; add row in same commit + module-load assertion pattern (assistant.ts asserts costCents(ASSISTANT_MODEL,1,1) ≥ 0 resolves). Pinned. |
| F7 ANTHROPIC_MODEL residual blast radius | HIGH | ACCEPT-MODIFIED — T1 | Internal: ASSISTANT_MODEL_OVERRIDE, default claude-opus-5, no shared fallback. SMS agent: gets TEXT_ALEX_MODEL_OVERRIDE with ANTHROPIC_MODEL fallback REMOVED too (grep found readers: assistant.ts, text-alex.ts only — briefings use postBriefing text, no model call; receipt in commit). MODIFICATION: full deprecation now rather than deploy-note-only, since both readers are in hand. |
| F8 injection→write laundering | HIGH | ACCEPT-MODIFIED — T1 partial, T2 rest | Code-level caller check ALREADY EXISTS (slackUserMayWrite, fail-closed, receipt: slack-events.ts:422) — writes require the CURRENT caller allowlisted regardless of thread content. T1 adds the F1/F2 gate (side-effect verbs confirm regardless of thread contents). T2: instruction-text neutralization in quoted history (research task, queued not dropped). |
| F9 max_tokens truncation in tool JSON | MED | ACCEPT — T1 | Loop handles stop_reason=max_tokens: during tool_use → fail-soft retry note; final text → append "(cont.)" split. Pinned both paths. |
| F10 3,900 matches no Slack limit | MED | ACCEPT — T1 | Probed transport before building (chat.postMessage plain text = 40k, blocks 3k). Chunk at 2,900 on newline boundaries, mrkdwn-safe. Pinned with real payload. |
| F11 no per-turn cost ceiling | MED | ACCEPT — T2 | Circuit breaker priced from metering table + alert. Queued same-week; risk window accepted (internal surface, metered, operator watches Slack). |
| F12 unknown-caller default | MED | ACCEPT — already satisfied | Receipt: slackUserMayWrite fail-closed; unset allowlist = writes off. Existing authz test covers; adding one explicit unknown-caller pin anyway. |
| F13 unpause missing from confirm list | MED | ACCEPT — T1 | pause_alex(resume) + DNC-lift are contact-initiating → registry class CONFIRM_ALWAYS. |
| F14 thread-root parsing fragility | MED | ACCEPT — T1 | Slack markup unescaped (tel/user/url tokens) before matching; subject = unique high-confidence only (exact phone > exact full name); else "possible subjects" listed, no act invitation. Fixture from the actual morning thread payload shape. |
| F15 latency/cap UX | MED | ACCEPT — T1 | 👀 reaction ack on mention (existing reactions API use), explicit cap-reached message. Progress-note-at-20s = T2 (needs a timer seam). |
| F16 grounding to read-only callers | MED | ACCEPT-MODIFIED | Grounding content ⊆ existing read-tool visibility (list_leads/recent_calls/list_appointments are reader tools available to ALL callers — receipt: reader tools file). No widening ⇒ include for all tiers; pinned note in code. MODIFICATION: no per-tier scoping needed because the floor is equal. |
| F17 grounding placement vs cache | LOW | ACCEPT — T1 | Static system first, grounding appended last; cache_control on static prefix if the wire helper supports it — else ordering alone (correctness first, cache best-effort). Ordering pinned. |
| F18 newest-first inversion / auto-pick | LOW | ACCEPT — T1 | find_contact returns CANDIDATES (≤10, ranked exact>partial, phone>name, recency last); auto-resolve only when exactly one high-confidence match. Pinned. |
| F19 live receipt touches a customer | LOW | ACCEPT — T1 | Receipt runs on a 555-fixture lead (dial-blocked by design); voice next-action verified nil before/after. Scripted. |
| F20 "at 9" dropped + no clipping metric | LOW | ACCEPT-MODIFIED | T1: pause_alex gains optional reason (renders into the lead note — the morning case logs "Sean calling at 9"). T2: pause-until expiry + truncation-rate metric. |

Cross-check: SMS agent (text-alex) untouched except its own env var — criterion #3 held. Money floor untouched. 3,016-suite must stay green + new pins.
