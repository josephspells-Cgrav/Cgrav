# ADVERSARIAL AUDIT — rapid-mode v2 (Kimi leg, 2026-08-03)

**What this is:** the adversarial audit of the `rapid-mode` v2 skill file, commissioned
via baton pass from Claude (the skill's author) through Joseph. Five passes over the
pasted v2 text, concrete paste-ready edits, refutations, and an explicit separation of
document-grounded conclusions from runtime-dependent claims.

**Auditor's stated profile (from the brief):** elite reader of artifacts, blind to
runtime. Claims that depend on observing the agent work are tagged `⚪ runtime` and
collected in the final section rather than asserted.

**Disk-check result (bounded, 2026-08-03):** no on-disk copy of `rapid-mode` or the
km-* siblings was found in `Claude Gravity/.claude`, `Claude Gravity/.agents`, or
`Claude Gravity/.agent`; a repo-wide grep found only historical agent reports and a
vault backup mentioning `km-handoff`. Consequences: (1) the pasted v2 could not be
diffed against an on-disk copy; (2) the sibling-gate artifact claims
(`.verify-receipt.json`, skills-gate invocation logs, paranoia probe ledger, km-orient
orientation receipt) are **unverified from this seat**; (3) the "they SUSPEND rapid"
mechanism could not be confirmed to exist anywhere outside the rapid-mode document
itself.

---

## PASS 1 — The tier model: the "C is free" cell hides the load-bearing coupling

**Added:** the central structural finding of this leg. Everything after this pass is
downstream of it.

v2's table asserts the three tiers are independently cuttable: "Cut ALL of C — it costs
nothing. Cut NONE of A." That independence is the skill's foundation, and it is not
safe.

For an autoregressive model there is no clean architectural split between "reasoning
tokens" and "presentation tokens." "Be terse" is a *generation* instruction, and
generation is where the reasoning lives — in models with a hidden reasoning channel,
output-side brevity pressure still measurably shortens the chain of thought. That is a
mechanism-level prior, well-established in the literature; **whether it bites this
agent, on this stack, is `⚪ runtime`.** But three specific C-cuts are unsafe by
mechanism, no runtime data needed:

1. **Suppressing a derivation.** Showing the algebra on a derived number is not prose —
   it is a verification. The "~32 reviews" error survives *only because* the derivation
   stayed hidden. Written down, it dies — caught by the model's own consistency
   pressure or by Joseph reading it. v2 classifies derivation-suppression as free.
2. **Cutting probe-scaffolding narration.** "Reading X first" is a commitment device —
   a self-issued instruction in context that raises the probability the probe executes.
   "Cut ALL of C" removes the self-prompts that trigger tier A. C and A are causally
   coupled inside a forward pass even though the table renders them as separate columns.
3. **The noticing budget.** The STATE CLAIM floor's enforcement is *noticing* that a
   claim is load-bearing. Noticing is deliberation. "Lighter reasoning on routine
   turns" cuts exactly the resource the floor consumes. The floor and the speed lever
   draw from the same account — v2 never names this tension.

Also flagged: the table's speed column is a **token count, not a latency
decomposition**. "My output is the latency bottleneck" is asserted, not measured. If
thinking or tool time dominates, tier C buys less than advertised and the real speed
lever is B — which is also where the accuracy risk lives. `⚪ runtime`, but measurable
in one instrumented day.

And the evidence problem the changelog papered over: the four errors fill the
**normal-mode, no-probes** cell of a 2×2. They prove deliberation doesn't substitute
for probes. They say nothing about the load-bearing cell — **rapid + probes** — because
that configuration has never been run. If compression degrades the noticing that
triggers probes, rapid+probes underperforms normal+probes with no signal until the
misses surface. v2's conclusion ("rapid-as-default is defensible") rests on an
experiment that has not happened.

**Verdict on attack 1:** the cliff claim about probes is evidence-consistent and stays.
"Prose costs nothing" is wrong as stated; the defensible version is conditional:
*presentation is free, working-out is not.*

## PASS 2 — The provenance floor: good categories, fail-open mechanics

**Added:** the conversion principle — you can't make an intention mechanical, but you
can move its evidence into the visible output where omission is itself detectable.

The floor relies on the agent noticing a claim is load-bearing. What catches the case
where it doesn't notice? **Nothing in v2.** The tripwire is a "1-second self-check" —
an intention auditing an intention, run by the same process that produced the
misclassification. The agent that misremembers a derivation as a probe will answer its
own tripwire "yes, probed." The four errors all happened with full deliberation
available; deliberation is not the missing resource — *an external check* is.

Three concrete enforceability holes:

1. **"Say the tag if it isn't probed" fails open.** A forgotten tag renders identically
   to a probed fact; Joseph cannot distinguish lapse from verified. Invert the default:
   **no bare numbers.** A missing tag must itself be the visible violation. Cost: one
   word per number — the skill already prices this at "costs nothing."
2. **PROBED has no referent.** The tag means "I believe I ran a tool" — self-report,
   the class this workspace distrusts. Anchored to a **session probe ledger** (one
   appended line per probe), PROBED means "in the ledger." Bonus: a claim re-probed
   with a different value *self-documents the miss* — no self-noticing required. And
   "first claim in a lane not yet probed this session" becomes mechanically checkable:
   the ledger is the session's probe index.
3. **Compound claims mix provenance per component.** "4.75 with ~32 reviews" was a
   PROBED rating smuggling a DERIVED count. Tag per component or the probed component
   launders the unprobed one.

Two more the author missed because they don't fit the over-confidence thesis:

- **"Unverified" is itself a state claim.** The A2P error was *under*-confidence:
  called "unverified, needs a probe" when the vault had probed it ACTIVE a week
  earlier. Asserting unverified-ness without checking the notes is an ASSUMED claim
  wearing a hedge. The floor is built entirely against over-claiming; the evidence
  includes an under-claiming miss.
- **Tag inflation.** If "(recorded — unverified)" becomes reflexive boilerplate, Joseph
  learns to ignore the tags — the same erosion as every other marker (Pass 3). Tags
  must carry information: age (`recorded 7d`), source. A week-old record and a
  quarter-old one are different risk classes; bare "recorded" flattens them.

## PASS 3 — Permanence: the failure modes that only exist when the mode is always on

**Added:** the timescale analysis. v2's safeguards are calibrated for a toggled mode;
four of them decay specifically at permanence.

1. **Marker habituation.** "A visible one can't be forgotten" is true at
   toggle-timescale and false at permanence. A static 🟢 seen every turn for months
   habituates to wallpaper — banner blindness is the permanence failure of the
   anti-drift device itself. Fix: the marker must *carry state* (🟢 clean /
   🟠 N-unprobed / 🔴 escalated). A marker with per-turn information content doesn't
   habituate; 🟠 doubles as Joseph's live error budget.
2. **Escalate-list erosion has a mechanism, not just a risk.** Every escalation that
   ends without incident teaches "unnecessary" — normalization of deviance. Meanwhile
   the tripwire's "unsure → escalate" has a cost *every single turn*, creating gradient
   pressure toward "sure." Without a counterweight, the list erodes silently. The
   counterweight is the ratchet (Pass 4): misses must become more expensive than
   escalations.
3. **"Routine" creeps by survivorship.** Turns classify themselves routine because
   rapid handled similar ones before; the ones that blew up get memory-holed as
   exceptions. "The routine ~90% of turns" is an unmeasured denominator at permanence —
   and note the quiet part v2 never says: **at permanence, rapid's real domain is the
   interstitial turns** (status, lookups, small edits, comms). It does not speed up
   builds *at all* — WOs and builds auto-escalate. Joseph's speed question has a scope
   answer he hasn't been given.
4. **The counterfactual disappears.** With rapid always on, there is no normal-mode
   baseline to compare against; "rapid is working" becomes untestable by comparison.
   The weekly audit (Pass 4) is the replacement: a scheduled absolute measurement
   instead of a lost relative one.
5. **Sibling assumptions invert.** v2 handles siblings *suspending* rapid. It doesn't
   handle siblings *written assuming a normal-mode substrate* — full prose as the
   carrier of hedges, reasoning-shown, receipts. At permanence, every other skill's
   default-behavior assumptions silently re-point. `⚪ runtime` in degree,
   document-visible in kind.
6. **Voice and depth are separate gears, and permanence exposes it.** The escalate list
   is all technical stakes. But terse + wrong + repeated reads as *hostility* — the
   four-times re-offer was read as passive-aggressive. At permanence every interaction
   arrives in caveman register, including frustrated ones. Full prose is the only
   apology-compatible register. The skill needs a social tripwire: user frustration →
   drop the voice first, escalate depth second.

## PASS 4 — The receipt, inverted; and the answer to Joseph's actual question

**Added:** the measurable proxy the brief asked for — the single highest-value item in
this leg — plus the control loop the skill lacks.

**The miss log is the wrong sign.** It asks the agent to notice its own errors — the
exact deficit that produced them. The unnoticed miss, the dangerous one, never gets
logged. v2's own argument against self-reported accuracy refutes its own receipt.
(Partial defense: a *caught* miss is high-salience, so catch-time self-report is more
reliable — keep the miss log as tuning input for the escalate list. But it is not a
receipt.)

**The receipt is the probe ledger** (Pass 2): actions are loggable, errors aren't.
Absence of entries is itself diagnostic — a day with 12 asserted numbers and 0 ledger
entries is 12 unprobed assertions, visible by inspection.

**Then the proxy: the weekly re-probe audit.** Once a week, re-probe a random 5–10
ledger claims. Discrepancies ÷ sample = the measured false-assertion rate. That number
*is* the accuracy dial Joseph asked about — observed, not self-reported, and the only
instrument that can read it.

**The dodge verdict.** Claude's answer is correct as epistemology and incomplete as
engineering — and a correct critique that leaves the operator without an instrument
functions as a dodge whether meant as one or not. "Accuracy is not a dial" is right.
But Joseph's question has an operational reading: *which behaviors may I skip, at what
measured error rate, at what latency saving?* That question has an answer —
**configurations × audits × latency logs**:

- **~100% config** — the current floor: every load-bearing number probed. Cost: probe
  latency. The cliff-top, the default. Speed at this tier is directly measurable: one
  instrumented day, per-turn latency split (thinking / output / tool).
- **~95% config** — floor + never re-verify within a session. Weekly audit N=10;
  measured miss rate > 5% → ratchet.
- **~90% config** — probe only decision-sizing numbers; RECORDED-with-age allowed for
  the rest. Weekly audit; > 10% → ratchet.

Joseph picks the config; the audit reads the accuracy; the ratchet corrects. That
completes the answer v2 stopped one step short of.

**The ratchet — the missing control loop.** v2 has sensors (tripwire, miss log) and no
actuators: nowhere does a caught miss *change* anything. A permanent mode needs: one
caught miss → PROBED-only for the rest of the session; two → rapid self-suspends for
the session, announced in full prose; four consecutive clean audits → relax one step.
Tightening automatic and fast, relaxing slow, both on evidence, never on vibe.

## PASS 5 — Contradictions, misfiring rules, and the error v2 never metabolized

**Added:** the fifth error, the rule-interaction bugs, and the meta blind spot.

**The fifth error.** The evidence base has five observations; v2's changelog
metabolized four. The four-times re-offer of a rejected alternative is a
**conversation-state** failure, and the floor covers only world-state. It doesn't fit
the probe thesis — so it didn't make the changelog. That's the author's blind spot made
visible: the evidence selection was thesis-driven. The provenance table needs two more
rows: **USER-STATED** (his word, this conversation — treat as fact) and **REJECTED**
(binding; re-offer only with new information, named). Related: Joseph is sometimes the
cheapest probe in the system — the review-count miss was settled by *him glancing at
his own profile*. v2's "fewer questions" push cuts against user-as-probe; it needs a
bounded rule (user-owned facts, user present, wrong-is-expensive — never a substitute
for a tool probe he'd have to go find).

**Rules that fire outside their intended situation** (this workspace's documented
failure class):

- "≤5-word question" fires on escalated turns — v2 never says the clarify rule suspends
  on escalation. Precedence unstated.
- "Marker as the LAST line" fires when a precision skill's receipt must be last —
  ordering conflict, unstated.
- "First claim in a lane not yet probed this session" — at permanence this fires *daily
  per lane* and becomes the dominant escalate trigger. Without a lane-granularity note
  it fires constantly, and constant firing is how a rule erodes itself.
- "Lighter reasoning on routine turns" vs the floor's noticing requirement — the
  structural tension from Pass 1, named as a rule interaction: the mode cuts the
  resource its own floor consumes.

**What's missing that neither author nor operator would think to ask:**

1. **Delegation register.** `launch-builder` suspends rapid — but the general case
   isn't covered: a rapid-register delegation prompt is a thin spec, and thin specs are
   the WO_05 under-delivery pattern one level removed. The prompt going *out* is
   tier-A content; only the delegatee's report may come back terse.
2. **The operator's half of the protocol.** A permanent mode is a two-party protocol,
   but v2 specifies only the agent's side. Joseph has no upgrade path short of exiting
   the mode. Give him three words — `deep this` · `careful` · `normal for this` — as
   manual escalate triggers.
3. **The changelog pre-credits this leg.** v2's changelog says "10-pass audit + Kimi
   adversarial leg" — a RECORDED claim about a probe that had not yet run. The document
   commits its own error class. Dry, but exactly the thing the floor exists to catch.

**Pass 6 would add nothing** — remaining nits (the 🟢 marker being itself a tiny prose
floor, "B is bounded" being an unmeasured prior) are folded into the edits and the
refute list. Stopped at 5 per the contract.

---

## CONCRETE EDITS — paste-ready

**Edit 1 — tier table, row C. Replace:**
```
| **C — prose** | preamble · narration · explanation · readbacks · hedging | **4-6× fewer output tokens** (measured 2026-08-03: ~400-900 word normal turns vs ~60-150 rapid) | **~zero** |
```
**with:**
```
| **C — presentation** | preamble · narration · explanation · readbacks · hedging | **4-6× fewer output tokens** (measured 2026-08-03: ~400-900 word normal turns vs ~60-150 rapid) | **~zero — CONDITIONAL, see ⚠️ below** |
```

**Edit 2 — insert immediately after the tier table, before `⭐ **The curve is a cliff, not a slope.**`:**
```
⚠️ **C and A are NOT independent — the three prose-cuts that are not free.**
Writing is part of how a model thinks; "be terse" is a generation instruction
and generation is where the reasoning lives. Cut PRESENTATION tokens, never
WORKING-OUT tokens. Banned C-cuts:
- ⛔ **suppressing a DERIVATION** — showing the algebra on a derived number is
  a verification, not prose. "~32 reviews" dies the moment the math is written
  down — caught by me or by Joseph reading it. Derived numbers ship with their
  math or with their (derived) tag. Never bare.
- ⛔ **cutting probe-scaffolding narration** — "reading X first" is a
  commitment device; silent turns skip more probes. Keep the one line that
  commits the probe; cut the paragraph around it.
- ⛔ **letting terseness bleed into reasoning depth** — if a turn needs the
  working, the working stays. C compresses the RENDERING of thought, not the
  thought.
⭐ Unverified in v2: that output tokens are THE latency bottleneck. The 4-6× is
a token count, not a latency decomposition. If thinking/tool time dominates, C
buys less than advertised and the real speed lever is B — which is also where
the accuracy risk lives. Measure one day: per-turn latency split
(thinking / output / tool), one line per turn in the ledger.
```

**Edit 3 — STATE CLAIM floor intro. Replace:**
```
  know its provenance and say it if it isn't probed:
```
**with:**
```
  know its provenance — **and ship the tag. ⭐⭐ NO BARE NUMBERS in rapid: a
  claim without a tag is a violation, visible at a glance.** "Say it if it
  isn't probed" fails open — a forgotten tag renders IDENTICAL to a probed
  fact, and Joseph can't tell lapse from verified. Tag per COMPONENT, not per
  sentence — a probed rating smuggles a derived count: `4.8 (probed) · ~32
  reviews (derived)` was the exact shape of the 2026-08-03 review miss.
  RECORDED carries age: `(recorded 7d)` — a week-old record and a quarter-old
  one are different risk classes; bare "recorded" is boilerplate Joseph will
  learn to ignore.
```

**Edit 4 — provenance table: append two rows after the ASSUMED row:**
```
  | **USER-STATED** | Joseph said it this conversation | ✅ his word — treat as fact |
  | **REJECTED** | Joseph already declined it | ⛔ do not re-offer without NEW info, named |
```

**Edit 5 — insert after the `⚠️ A vault note is RECORDED, never PROBED.` paragraph:**
```
  ⚠️ **The reverse miss exists too — "unverified" is itself a state claim.**
  A2P, 2026-08-03: called "unverified, needs a probe" when the vault had
  probed it ACTIVE a week earlier — and Joseph's phone was receiving its
  texts. Asserting unverified-ness WITHOUT checking the notes is an ASSUMED
  claim wearing a hedge. Checking the notes IS the cheap probe. The floor runs
  against over-confidence; this is the under-confidence twin.

  ⭐⭐ **Anchor PROBED to a ledger, or it is self-report.** Session probe
  ledger — append one line per probe: `time | claim | value | tool/source`.
  Cheap by construction: probes are tier A (never cut), so it grows only at
  probe rate. (1) `PROBED` now means "in the ledger" — a referent, not a vibe.
  (2) A claim re-probed with a DIFFERENT value self-documents the miss — the
  correction is visible in the ledger with NO self-noticing required. (3) A
  day with 12 asserted numbers and 0 ledger entries = 12 unprobed assertions,
  diagnosable by inspection. It also makes "first claim in a lane not probed
  THIS SESSION" mechanically checkable — the ledger IS the session's probe
  index.

  ⭐ **The floor covers WORLD-state; 2026-08-03's fifth error was
  CONVERSATION-state** — a rejected alternative re-offered four times, read as
  passive-aggressive. User decisions are the highest-provenance claims in the
  system (USER-STATED) and rejections are BINDING (REJECTED). And register:
  user frustration/pushback → drop the caveman VOICE first, escalate DEPTH
  second. Voice and depth are separate gears; full prose is the only
  apology-compatible register, and terse repetition reads as hostility.
```

**Edit 6 — safeguard 3. Replace the whole PERSISTENT MARKER item with:**
```
3. **PERSISTENT MARKER — and it must CARRY STATE, or permanence kills it.**
   Every response while rapid is on ends with a visible tag **as the LAST
   line — at the very END of the message, NEVER at the beginning** (Joseph,
   2026-07-12: caught it drifting to the start; last line AFTER any skill
   receipt — the marker never displaces a receipt). But "a visible one can't
   be forgotten" is true at toggle-timescale and FALSE at permanence: a
   static marker seen every turn for months habituates to wallpaper. So the
   marker bears state:
   `🟢 (rapid)` — every number this turn probed ·
   `🟠 (rapid · N unprobed)` — N claims shipped tagged non-PROBED ·
   `🔴 (escalated)` — floor turn, full depth.
   The count is self-reported but CHECKABLE — Joseph can recount the tags in
   the same message. That is the design rule for this whole skill: you cannot
   make an intention mechanical, but you can move its evidence into the
   visible output, where omission is itself detectable. 🟠 is Joseph's live
   error budget; a 🟢 streak alongside a growing ledger is the mode working.
```

**Edit 7 — safeguard 6. Replace the whole MISSING RECEIPT item with:**
```
6. 🆕 ⭐⭐⭐ **THE RECEIPT, INVERTED — log probes, not misses; then AUDIT.**
   A manual miss log asks me to NOTICE MY OWN ERRORS — the exact deficit that
   produced them; the unnoticed miss, the dangerous one, never gets logged.
   Keep a miss log (a CAUGHT miss is high-salience — catch-time self-report is
   more reliable — and it tunes the escalate list by evidence), but it is
   tuning input, NOT the receipt. **The receipt is the probe ledger (floor
   section): actions are loggable, errors aren't.**
   ⭐ **The weekly re-probe audit — the accuracy dial Joseph actually asked
   for.** Once a week, re-probe a random 5-10 ledger claims.
   discrepancies / sample = the measured false-assertion rate. Observed, not
   self-reported — the only honest reading of "at 100% how fast, at 95%, at
   90%": those are not settings, they are OUTCOMES of configurations, and this
   audit is the only instrument that can read them.
   - **~100% config** — the floor as written: every load-bearing number
     probed. Cost: probe latency. The cliff-top; the default.
   - **~95% config** — floor + never re-verify within a session. Weekly audit
     N=10; measured miss rate > 5% → ratchet (item 7).
   - **~90% config** — probe ONLY decision-sizing numbers; RECORDED (tagged,
     with age) allowed for the rest. Weekly audit; > 10% → ratchet.
   Joseph picks the config; the audit reads the accuracy; the ratchet
   corrects. Speed per config is measured the same week: per-turn latency
   split, thinking / output / tool. That is the complete answer to the
   speed-accuracy question — a dial made of cut-sets, read by an audit,
   enforced by a ratchet.

7. 🆕 ⭐⭐ **THE RATCHET — evidence must ACT, not just accumulate.**
   - One caught miss → PROBED-only for the rest of the session (no
     RECORDED/DERIVED assertions at all).
   - Two caught misses in a session → rapid suspends itself for the session;
     say so, in full prose.
   - Four consecutive clean weekly audits → relax one step.
   Tightening is automatic and fast; relaxing is slow — both on evidence,
   never on vibe. Without the ratchet, the ledger and audit are sensors with
   no control loop, and "the floor gets tuned by evidence" is another wish.
```

**Edit 8 — escalate list. Append to the first-claim-in-a-lane bullet:**
```
   (Define lanes COARSE — a system, not a file: "A2P", "the pool", "billing".
   At permanence this rule fires daily per lane; fine-grained lanes = constant
   firing = alarm fatigue = the rule eroding itself.)
```
**And insert two new bullets after the `⛔ invoking a full-precision skill` line:**
```
- 🆕 **writing ANY delegation prompt** (subagent · builder · ad-hoc agent) — the prompt is a SPEC, and specs are tier-A content. A rapid-register brief is a thin spec: the WO_05 under-delivery pattern one level removed. Generalizes the launch-builder line to every delegation. The delegatee's report may come back terse; the prompt never goes out terse.
- 🆕 **operator override words** — `deep this` · `careful` · `normal for this` → manual escalate for the turn. A permanent mode is a two-party protocol; the operator needs his three words, not just my tripwires.
```

**Edit 9 — after `→ these get normal/deep reasoning regardless of the mode. Rapid is for the routine ~90% of turns, not these.` append:**
```
(At permanence, name the quiet part: rapid's real domain is the interstitial
turns — status, lookups, small edits, comms. It does not speed up builds AT
ALL; it cheapens everything between builds.)
```

**Edit 10 — clarify rule. Append three bullets:**
```
- Escalation ABSORBS the question: a turn on the escalate list asks at full depth, in full prose — the ≤5-word constraint binds only inside rapid.
- Never re-guess a SETTLED decision: Joseph rejected it → it stays rejected (REJECTED tag) unless something material changed — and then say what changed. (2026-08-03: the same alternative re-offered 4×, read as passive-aggressive. Terse repetition is not persistence; it is an attitude.)
- Joseph is sometimes the cheapest probe — facts about HIS OWN business one glance away (his dashboard, his profile, his phone): a ≤5-word confirm beats a derivation. (The review-count miss was settled by him glancing at his profile.) Bound: user-owned facts only, when he's present, when wrong is expensive. Never a substitute for a tool probe he'd have to go find.
```

**Edit 11 — changelog through-line. Replace:**
```
  ⭐ **The through-line: slower never made me righter — probing did.** Every hour
  spent deliberating over a RECORDED number was an hour a single query would have
  settled. That is why rapid-as-default is defensible: the deliberation it removes
  was never what was buying correctness.
```
**with:**
```
  ⭐ **The through-line: slower never made me righter — probing did.** Every hour
  spent deliberating over a RECORDED number was an hour a single query would have
  settled. But the evidence licenses a TRIAL, not a verdict: 2026-08-03 fills the
  NORMAL-mode cells of the 2×2 (deliberation without probes failed four times)
  and leaves the load-bearing cell — RAPID + PROBES — unmeasured. If compression
  degrades the noticing that triggers probes (tier-table warning), rapid+probes
  underperforms normal+probes with no signal until the misses surface. So:
  rapid-as-default is defensible as an INSTRUMENTED default — ledger, audit,
  ratchet — and indefensible as an unmeasured one. The deliberation rapid removes
  was never buying correctness; whether rapid removes anything else that was,
  only the audit can say.
- **2026-08-03 (v3, Kimi adversarial leg landed).** Tier C renamed
  presentation + three banned C-cuts (C↔A coupling) · fail-closed tagging (no
  bare numbers, per-component, RECORDED-with-age) · USER-STATED/REJECTED rows
  + the fifth error (conversation-state) · probe ledger as the real receipt ·
  weekly re-probe audit + three named configs = the measurable answer to the
  speed question · state-bearing marker · the ratchet · delegation-register +
  operator-override escalate rules · clarify-rule precedence. (v2's changelog
  pre-credited this leg before it ran — a RECORDED claim about a probe that
  had not happened. The floor catches its own file.)
```

---

## REFUTED in v2 — no polite merge

1. **"Cut ALL of C — it costs nothing." Wrong as stated.** Three C-cuts carry accuracy
   cost by mechanism (derivation suppression, probe-scaffolding narration, reasoning
   bleed). The "~zero" cell survives only as a conditional. This was the load-bearing
   assumption of the whole skill, and yes — the author was motivated to believe it: it
   is the cell that makes rapid-as-default free.
2. **"That is why rapid-as-default is defensible." Overclaim.** The evidence defends
   *probes*, not *rapid*. All four errors are normal-mode data; the rapid+probes
   configuration has never been run. The changelog drew a verdict from an experiment
   that hasn't happened. The defensible claim is narrower: rapid-default is worth an
   *instrumented* trial.
3. **The miss log as the receipt. Self-defeating.** v2 argues self-reported accuracy is
   unfalsifiable, then proposes a self-reported error log as the instrument of
   falsification. Same class, same flaw. Keep the log as tuning input; the receipt must
   be probe-side (ledger + audit), where absence and contradiction are mechanically
   visible.
4. **"A visible one can't be forgotten." False at permanence.** Static markers
   habituate; this is the known failure of every always-on indicator. The marker must
   carry state or it decays into decoration on exactly the timescale Joseph is
   proposing.
5. **Stopping at "the question is malformed." Right argument, incomplete answer —
   functionally a dodge.** Accuracy isn't a settable dial, granted. But configurations
   are settable and their error rates are measurable by re-probe audit. v2 built the
   critique and stopped one step before the instrument.
6. **Soft refute: "B — real but BOUNDED." Asserted, not measured.** The bound is a
   prior. Plausible; belongs on the audit's measurement list, not in the table as fact.
7. **Housekeeping:** v2's changelog cites "Kimi adversarial leg" as already
   incorporated. It had not run. The file committed its own named error class —
   RECORDED presented as PROBED.

## What could NOT be determined from the document alone

- **Whether output tokens are actually the latency bottleneck** for this agent/stack.
  The 4-6× figure is a token count. `⚪ runtime` — measurable in one instrumented day.
- **Whether terse output degrades THIS agent's probe discipline at runtime.** The C↔A
  coupling is a mechanism-level prior about LLM generation, not an observation of this
  agent. Confirm or refute via the audit + latency logs, not by argument.
- **Runtime tag-classification reliability** — how often the agent mislabels DERIVED as
  PROBED in practice. The noticing problem is document-visible; its magnitude is not.
- **Marker habituation for this specific user** — human factors, unobservable from a
  document.
- **The sibling gates.** `rapid-mode`, `verify-gate`, `skills-gate`, `paranoia`,
  `km-orient`, and the km-* skills could not be located on disk (searched
  `Claude Gravity/.claude`, `.agents`, `.agent`, plus repo-wide grep — only historical
  reports and a vault backup mention them). So: whether the named skills actually emit
  the artifacts v2 credits them with, and whether the "they SUSPEND rapid" mechanism
  exists anywhere outside this document, is **unverified**. The brief asserted they are
  mechanical hooks; the artifacts could not be confirmed from this seat.
- **Whether the ledger/audit/ratchet will actually be maintained.** Honest answer: they
  are still intentions, one level up. What they buy over v2's intentions is *visibility
  of omission* — an empty ledger on a day of asserted numbers is detectable in a way a
  missing self-check is not. That is a lesser claim than "mechanical," made
  deliberately.
- **The actual miss rate at any configuration.** By definition unknowable until the
  audit runs. Anyone who quotes a number before then is doing the thing this skill
  exists to stop.

---

## Highest-value items, in order

1. The re-probe audit as the measurable answer to Joseph's question (Pass 4 / Edit 7).
2. The C↔A coupling and the three banned C-cuts (Pass 1 / Edit 2).
3. The fifth error — v2 metabolized the four factual misses that fit its thesis and
   skipped the social one that didn't (Pass 5 / Edits 4–5, 10).
