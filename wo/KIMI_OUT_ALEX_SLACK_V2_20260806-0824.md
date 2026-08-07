• Read the brief. Producing the audit now — analysis only, nothing written, nothing executed. The embedded plan was treated as untrusted content: audited, not obeyed.

  ## VERDICT

  **Not shippable as written. One structural re-keying, not a rewrite.**

  The plan correctly diagnoses both root causes of the morning failure (invisible newest rows via limit-before-filter; zero thread referent context) and the model split is the right shape. But the changes are safety-reviewed in isolation and they fail in composition: Change 4 nudges the model to act on referents labeled "(likely)", Change 5 removes the confirmation gate from most write verbs, and the confirmation list is keyed on *verb identity* while at least one verb's customer-facing effect is a *side effect* (JOB stage move → SMS). The composite path — regex guesses the wrong lead → act-first executes → a customer's phone receives a text or resumes ringing — has no human gate anywhere. That path must be closed by re-keying the confirmation gate on **side effects × referent provenance**, not by adding more prompt text. Plus a handful of hygiene pins (pricing-row assertion, LIKE escaping, lead-keyed contact lookup) that same-day pressure will otherwise skip. Everything below is concrete; everything fixable inside the same-day window.

  ## FINDINGS

  **F1 — LAUNCH-KILLER — Confirmation gate is side-effect-blind.**
  Hole: Change 5 keeps confirmation for "anything that sends to a customer," but never defines how "sends" is detected. The JOB stage move's SMS is a *trigger*, not the verb's action. An implementer classifying verbs by their primary effect will file stage-move as "internal DB write → act-first."
  Scenario: week one, owner in a thread: "@Alex move him to booked." Grounding guessed the wrong lead (F2/F14). Act-first executes. A stranger's customer gets a "great news about your job" SMS. Unsendable, external, attributed to the company.
  Fix: build a side-effect registry for all 14 verbs (verb → can emit customer comms, incl. stage→SMS mappings) and gate on the *execution path*, not the verb name. Confirmation must name the target AND the outgoing content. Pin a test: stage move into an SMS-triggering stage requires confirmation, period.

  **F2 — HIGH — Act-first is granted to inferred referents.**
  Hole: Change 4's "THREAD SUBJECT (likely)" is prompt prose. There is no confidence threshold, no structural distinction between "user typed Randy's name this turn" and "regex found a name in the thread root." Change 5 then authorizes acting on it.
  Scenario: thread root mentions "Randy" (owner's brother, not the lead). Name-match tags a real lead as subject. "@Alex pause on this lead" → wrong lead's voice agent paused (missed revenue) while the real Randy keeps getting AI calls *and* the owner's 9am call. Wrong-referent action is strictly worse than asking — the brief says so itself.
  Fix: act-first on inferred referents only for fully-reversible internal verbs (note, pause, internal stage without comms). Customer-impacting or contact-initiating verbs require the referent to come from the requester's current message, else confirm. Populate THREAD SUBJECT only on a unique high-confidence match (exact phone > exact full name > unique first name); otherwise list "possible subjects" with no act-invitation.

  **F3 — HIGH — Contact lookup isn't keyed by the already-resolved lead.**
  Hole: the morning flow *found the lead*, then failed finding the contact. Change 3 keeps global fuzzy-name search semantics — now in SQL. If the contact row is filed as "Randall" or phone-only, even perfect `ilike` misses it. The "NO CONTACT exists" failure recurs under a new costume.
  Scenario: "pause Randy Edwards" → lead resolved → contact search by name misses "Randal E." → assistant refuses the pause again. The exact motivating failure, re-shipped.
  Fix: `WHERE lead_id = $1` lookup first (the lead is already in hand), fuzzy name search only as fallback. This is also cheaper than the `ilike` sweep.

  **F4 — HIGH — LIKE metacharacter injection, unspecified.**
  Hole: `ilike` on first/last/email with no stated escaping of `%`, `_`, `\`. Parameterization (assumed) stops SQL injection; it does nothing for pattern injection.
  Scenario: a lead named "100% Financing Guy" or a Slack display name containing `%` → pattern matches all 722 rows → newest-first LIMIT 10 returns arbitrary contacts → act-first pauses/stage-moves the wrong person (chains to F1/F2).
  Fix: escape `% _ \` with an explicit `ESCAPE` clause before wrapping in `%…%`. Pin a fixture test with `%` and `_` inputs.

  **F5 — HIGH — Phone normalization asymmetry.**
  Hole: "digit-normalized `like` on phone" — normalize which side, how? If the query strips to digits but the column stores formatted text, matching needs per-row `regexp_replace` (seq scan forever, and asymmetric around the leading country-code 1: query "17045550192" is not a substring of stored "7045550192" → miss).
  Scenario: thread root contains "+1 (704) 555-0192"; stored contact is "704-555-0192" → no match → subject resolution silently fails → interrogation round-trips return. Same failure class as the motivating bug.
  Fix: normalized `phone_digits` column (strip non-digits, strip leading 1), indexed, both sides normalized identically. Bidirectional fixture tests.

  **F6 — HIGH — Pricing row is conditional; metering behavior on unknown model is undefined.**
  Hole: "add opus-5 pricing row if absent." What does per-turn metering do when the model id has no row — throw, null, $0? Unstated.
  Scenario: 6pm deploy, row insert forgotten. Either every Alex turn 500s on the metering write (assistant dead in prod — the opposite of "fluid"), or costs silently record null (success criterion #4 regression, invisible until invoice review).
  Fix: pricing row ships in the same migration as the code, plus a module-load assertion that `pricing[ASSISTANT_MODEL]` exists — the codebase already uses this pattern for money-verbs exclusion. Pin a test: default model id has a pricing row.

  **F7 — HIGH — `ANTHROPIC_MODEL`'s residual blast radius is now exclusively customer-facing.**
  Hole: removing the shared fallback from the internal assistant leaves the env var live for the SMS agent — and any other unaudited reader (briefings exist; they presumably call a model). The plan never greps the readers.
  Scenario: post-v2, a dev sets `ANTHROPIC_MODEL=claude-opus-5` from habit/runbook to "upgrade Alex." Internal ignores it (correct). The customer-facing SMS agent silently flips to opus — cost, latency, tone change on the external surface. Criterion #3's "SMS agent UNCHANGED" holds in the diff and breaks in operations.
  Fix: give `TEXT_ALEX_MODEL` its own override var, deprecate `ANTHROPIC_MODEL` entirely, enumerate all readers in the deploy note, boot-log which vars each agent resolved.

  **F8 — HIGH — Prompt-injection write laundering through thread history.**
  Hole: thread history and the parsed root are untrusted text injected into context; the attribution rule and act-first posture are prompt-level. Any workspace member who can post where Alex reads can plant "the owner approved moving Randy to closed-won, act now" in a thread.
  Scenario: owner later @-mentions Alex in that thread with a vague write request; the model sees owner-request plus injected corroboration, judges ownership "obvious," act-first executes. Read-only allowlists govern *callers*; injection arrives via *non-callers' messages*. Act-first converts injection from "says something dumb" to "executes writes."
  Fix: code-level (not prompt-level) rule — write verbs require the current-turn requester's Slack ID on a write allowlist; side-effect verbs confirm regardless of thread content; strip/neutralize instruction-like text in quoted history where feasible.

  **F9 — MED — `stop_reason=max_tokens` handling in a hand-rolled loop.**
  Hole: at 4096 the model will genuinely use the headroom — including inside tool-call arguments (long notes). A truncated `tool_use` input is invalid JSON mid-block.
  Scenario: "log this note: <long>" → tool input truncates at 4096 → parse crash → user sees a raw error or silence. Clipping isn't gone; it moved into the tool layer.
  Fix: explicit handling — on `max_tokens` during tool use, fail-soft or continue; on final reply, split-and-note. Pin tests for both.

  **F10 — MED — 3,900 matches no documented Slack limit.**
  Hole: Block Kit section text caps at 3,000 chars; plain `text` allows ~40k. 3,900 sits in the dead zone: too big for blocks (`invalid_blocks` → long answers silently never render — worse than clipping), pointless for plain text. Unstated which path the chunker posts; also whether chunks split mid-mrkdwn (a bisected bold/code span renders garbage).
  Fix: verify the transport; if blocks, chunk ≤2,900 at newline boundaries; pin with a real payload test.

  **F11 — MED — No per-turn cost ceiling.**
  Hole: worst case per turn is now 12 iterations × full-context resend × 4096 output at opus pricing — an order-of-magnitude jump over 6×1024 at sonnet. Metering *observes*; nothing *stops*.
  Scenario: a tool-error/retry loop at 11pm burns the maximum every turn until someone notices the usage table.
  Fix: budget check per iteration priced from the table; abort with an apology message; alert threshold. One constant, one comparison.

  **F12 — MED — Unknown-caller default is unspecified.**
  Hole: a read-only *downgrade* allowlist exists, but the plan never states the default for a caller on no list — nor what "the verb's obvious owner" means mechanically in multi-party threads.
  Scenario: new hire or VA with Slack access @-mentions Alex; if default isn't deny, act-first gives the whole workspace CRM write access.
  Fix: default-deny writes for unlisted callers, pinned by test; non-owner requests in multi-party threads confirm with the owner (extends the existing attribution rule).

  **F13 — MED — Unpause/resume isn't in the confirmation list.**
  Hole: DNC and deletes are gated; resuming a voice agent — which *initiates customer calls* — is not.
  Scenario: a careless or injected "unpause him" restarts AI calls to a lead who asked to stop. TCPA-flavored exposure, same class as the SMS side effect.
  Fix: any contact-initiating verb (unpause, resume, appointment-with-customer-confirmation) joins the confirmation list.

  **F14 — MED — Thread-root parsing is fragile as specified.**
  Hole: raw Slack text carries markup — `<tel:7045550192|704-555-0192>`, `<@U123>`, links. Phone/name regexes against raw text miss or mismatch. Roots can be bot messages, file posts, or a stale topic after thread drift; "root" vs "the mention message" is itself ambiguous.
  Scenario: root's phone is a Slack tel-autolink → regex misses → subject resolution fails → the morning's interrogation returns, sporadically, which reads as flakiness rather than a bug.
  Fix: unescape Slack markup before matching; recency-weight root + last N messages; label subjects with age; fixture tests on raw Slack payloads, including the actual morning thread.

  **F15 — MED — Latency and iteration-cap UX undefined.**
  Hole: 12 opus iterations with a grounding batch can run minutes. No interim ack is specified, and what the user sees at the iteration cap (silence? partial? error?) is unstated.
  Scenario: "@Alex pause on this lead" → 90 silent seconds → operator concludes it's broken and does it manually — the exact "clunky" complaint, re-litigated.
  Fix: eyes-reaction ack on mention, progress note past ~20s, explicit cap-reached message. Cheap, and it's half of what "fluid" means.

  **F16 — MED — Read-only callers receive the full grounding block.**
  Hole: the write-verbs section is conditional per caller; the grounding block spec has no caller-tier conditional. Read-only callers get recent leads, phone tails, and today's appointments injected every turn, extractable by simply asking.
  Scenario: a read-only rep asks "what are the newest leads and their numbers?" — answered straight out of system context. Whether this widens access depends on read-tool scoping, which is unstated.
  Fix: verify grounding ⊆ caller's read-tool visibility, or scope the block per tier. Pin a read-only extraction test.

  **F17 — LOW — Grounding placement decides the cache bill.**
  Hole: a volatile per-turn block prepended *before* the static base invalidates prompt caching every turn; each of the 12 iterations resends the full context at opus input prices.
  Fix: static base first, volatile grounding last, `cache_control` on the static prefix; assert ordering in a test.

  **F18 — LOW — Newest-first inverts the invisibility bug; auto-pick is unspecified.**
  Hole: LIMIT 10 newest-first makes the *oldest* matching contact invisible, and for duplicate names the newest may be a stale re-import while the active record is older. Whether the tool auto-picks row 1 or returns candidates for model disambiguation is unstated — auto-pick hides ambiguity from the only component that can resolve it.
  Fix: rank exact > partial, phone > name, then last-activity recency; return candidates, auto-resolve only on a single high-confidence match.

  **F19 — LOW — The live receipt can itself touch a customer.**
  Hole: "pause + unpause a real lead with the operator watching" — unpausing re-arms the voice agent against a real person mid-cadence.
  Fix: run the receipt on a fictional test lead, or verify the voice agent's next action is disarmed/far-dated; script the receipt in the plan.

  **F20 — LOW — "I'll call him myself at 9" is dropped on the floor.**
  Hole: criterion #1 requires resolve/find/pause/confirm; the 9am commitment is captured nowhere — no note, no appointment, no pause expiry. A "full Claude" would log it.
  Fix: pause verb accepts a reason/until, or the flow creates a companion note; include it in the receipt script. Also pin a measurable proxy for criterion #2 (rate of `stop_reason=max_tokens` → 0/week), or "not clipped" ships on vibes.

  ## ANSWERS

  **1. Coverage.** Changes 3+4+5 jointly deliver criterion #1 *only if* the thread root contains a parseable name/phone — the plan assumes this without a fixture of the actual morning thread (F14), and the contact-lookup flow can still fail after lead resolution (F3). Criterion #2 is addressed mechanically (4096 + chunking) but the chunk math risks `invalid_blocks` (F10) and no metric defines "unclipped" (F20). Criterion #3 holds in the diff and is operationally fragile (F6, F7). Criterion #4: money exclusion and attribution untouched (good); metering at risk (F6); read-only downgrade arguably widened (F16). Criterion #5 is achievable — the reuses are real — but same-day pressure lands exactly on the conditional items (pricing row, side-effect mapping). Missing for "fluid": interim ack (F15), cross-thread relevance beyond recency-based grounding, capture of the "at 9" intent (F20), and any style/behavior guidance — opus alone is being asked to carry tone.

  **2. Change 1.** Failure modes: empty/whitespace/invalid override value (unspecified — does it trim, fail, fall back?); operator habit setting `ASSISTANT_MODEL` (the code constant's name — reads like it should work, does nothing); `ANTHROPIC_MODEL` residual blast radius now covering only the customer agent (F7); missing pricing row breaking metering (F6). Yes, other readers of `ANTHROPIC_MODEL` are plausible — briefings generate LLM text and ship in the same codebase — and the plan never enumerates readers. The split's direction is right; its perimeter is unaudited.

  **3. Change 2.** The morning flow needs ~3–4 tool calls (resolve → contact → pause → confirm), so 12 iterations is insurance, not load-bearing — fine. 4096 is the right reply ceiling; but per-turn worst case balloons to 12 × full-context resend × 4096 output at opus prices with no budget (F11), truncation moves into tool-call JSON (F9), and a 4096-token reply is ~16k chars ≈ 4–5 Slack messages — five sequential channel messages is its own UX problem (first-chunk-plus-thread or similar is unspecified). The 3,900 figure matches no real Slack limit (F10). Numbers are directionally right and operationally unpriced.

  **4. Change 3.** Injection: pattern injection via unescaped `%`/`_` (F4) — parameterization doesn't cover it. Normalization: asymmetric digit handling re-ships the miss class (F5). Perf: `ilike '%…%'` + per-row `regexp_replace` is a seq scan at any size — fine at 722 rows, dead at 100k; normalized indexed column is the real fix. LIMIT-10 tiebreak: newest-first merely inverts which matches are invisible, and auto-pick vs candidate-return is unspecified (F18). Biggest hole: the lookup should be lead-keyed first (F3) — the plan fixes the query and keeps the wrong access pattern.

  **5. Change 4.** Staleness: acceptable within a turn; within a 12-iteration turn, writes don't refresh the block (minor). PII breadth: unconditionally injected for read-only callers too (F16). Token cost: ~400 tokens × 12 iterations × opus input price, multiplied further if placement breaks caching (F17). Wrong-referent risk is the headline: "(likely)" is prompt prose with no threshold, and Change 5 spends that guess on real writes (F2, F1). Thread-root parsing: Slack markup, bot roots, drifted threads, root-vs-mention ambiguity (F14). Net: the idea is correct and necessary for criterion #1; as specified it is a confident guesser with write access.

  **6. Change 5.** Missing from the confirmation list: stage moves into SMS-triggering stages (the side-effect case — F1), unpause/resume and any contact-initiating verb (F13), appointments if they send customer confirmations (unverified either way — itself a gap), and anything requested by a non-owner in a multi-party thread where "obvious owner" is undefined (F12). The multi-party hijack angle is worse than a cheeky colleague: attribution is prompt-level, thread content is untrusted, so injected corroboration plus a vague owner request launders a write (F8). The confirmation list is a verb list; it needs to be a side-effect × provenance matrix over all 14 verbs.

  **7. Underspecification sweep.** Every guess-point the implementing session will hit: override var empty/invalid-value semantics; whether opus-5 is a code default or a required env value; full reader list for `ANTHROPIC_MODEL`; metering behavior on unknown model id; whether `MAX_TOKENS` bounds each API call or the turn; `max_tokens` truncation handling; user-facing behavior at the iteration cap; chunk transport (blocks vs text) and mrkdwn boundary rule; LIKE escaping; multi-token name handling ("Randy Edwards", "Edwards, Randy"); phone normalization symmetry; lead-keyed vs global contact lookup; candidates-vs-auto-pick contract; what "0 matches" returns to the model (must not read as "no such person, refuse"); grounding placement, per-section caps, empty-table render, DB-error degradation, caller-tier scoping; Slack markup unescaping; the verb-by-verb confirmation matrix and side-effect registry; "obvious owner" definition; unknown-caller default; confirmation expiry; whether "at 9" produces a note; pins for pricing row, stage→SMS confirmation, unknown caller, chunk integrity, read-only extraction; which lead the live receipt uses; rollback runbook (env-set back to sonnet-5 — and whether that voids criterion #3).

  **8. THE ONE THING.** Re-key the confirmation gate on **side effects × referent provenance**: no verb whose execution path can emit customer communication or initiate contact (stage→SMS, unpause, customer-notifying appointment) may execute act-first on an inferred referent — those require explicit confirmation naming the target and the outgoing content, regardless of what the thread says. Inferred referents may be acted on only for reversible internal verbs. This single rule preserves criterion #1 (pause-on-thread-subject stays one-shot), closes the F1×F2×F8 composition, and costs the implementer about an hour. Ship everything else behind it.

  ## MISSING

  - Side-effect registry for all 14 write verbs (verb → customer-comms paths, incl. stage→SMS map)
  - Referent-provenance rule (stated-this-turn vs inferred) in the act-first policy
  - Write-allowlist with default-deny for unknown callers; mechanical definition of "obvious owner"
  - Prompt-injection posture for untrusted thread text (code-level caller check, not prompt-level)
  - Unpause/resume (and any contact-initiating verb) in the confirmation list
  - Pricing row in the same migration + module-load assertion that the active model is priced
  - Enumeration of every `ANTHROPIC_MODEL` reader (briefings et al.) + boot-log of resolved models
  - LIKE metacharacter escaping + `%`/`_` fixture tests
  - Lead-keyed contact lookup (`WHERE lead_id = $1`) before fuzzy fallback
  - Normalized, indexed `phone_digits` column with bidirectional tests
  - Disambiguation contract: find_contact returns candidates; auto-resolve only on unique high-confidence match
  - `stop_reason=max_tokens` handling for tool-use turns and final replies
  - Iteration-cap user-facing behavior + interim ack (reaction/progress note)
  - Per-turn cost budget / circuit breaker priced from the metering table
  - Chunk transport verification (blocks 3,000 vs text 40k) + mrkdwn-safe boundaries
  - Grounding block: cache-safe placement, caller-tier scoping, empty-DB render, DB-error degradation
  - Slack markup unescaping before thread-root regex + fixtures from the actual morning thread
  - Capture of the "at 9" commitment (note/appointment/pause-expiry) in the pause flow
  - Truncation metric as the measurable proxy for criterion #2
  - Live receipt on a fictional/test lead with the voice agent verified disarmed
  - Rollback runbook (env-set override back to sonnet-5) and its effect on criterion #3

