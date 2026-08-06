# KIMI BRIEF — Adversarial audit of the "kimi-baton" skill PLAN

You are Kimi K3 running headless at MAX effort as a hostile independent reviewer. You have
NO session context — that blindness is your value. Below is a PLAN for a new Claude Code
skill. Audit the plan, not the prose. Do not rewrite it. Do not be polite. Every finding:
concrete hole → concrete failure → minimal fix.

## Context (all you get)

- Operator: Joseph, running a roofing-marketing operation with a Claude Code agent fleet.
- "Kimi baton pass" = the practice of handing a freshly-drafted behavioral contract (a
  plan, work order, skill, agent prompt, protocol) to YOU, Kimi K3, running headless via
  CLI (`kimi -p "Read BRIEF.md and execute it fully" > OUT.md`), as a blind adversarial
  auditor before the contract is executed. It has run 4 times, caught ~14 real findings
  per run. The pattern currently lives in handoff prose and session memory — it degrades
  as it passes between sessions.
- The fix being planned: codify it as a reusable skill file (`~/.claude/skills/kimi-baton/
  SKILL.md`) that any future session invokes by name. Skills are markdown instruction
  files the agent loads and follows; they are the durable installation mechanism.
- The skill will be used by MANY different future agent sessions with zero memory of this
  conversation. Assume the dumbest competent reader.

## THE PLAN UNDER AUDIT

**Skill name:** `kimi-baton` · location `~/.claude/skills/kimi-baton/SKILL.md` · ~120 lines.

**Triggers:** "baton pass" · "kimi audit" · "/kimi-baton" · "hand this to Kimi" · any
freshly-drafted plan/WO/skill/prompt/protocol reaching a commit point. NOT for: mid-draft
work, code the session can run/test itself (runtime evidence beats blind reading), trivial
edits, judgment/taste calls needing session context.

**Boundary:** the existing `agent-audit` skill owns audits of LIVE scripted agents (voice
bots) — kimi-baton is the general-purpose blind audit of any behavioral contract. If both
could apply, agent-audit wins for live agents.

**The laws the skill encodes:**
1. BLINDNESS IS THE VALUE — the brief must be fully self-contained; no session shorthand,
   no "as discussed", no references to chat. Leak test: could a new hire execute the brief
   with nothing else? Deliberately withhold the author's intent beyond what the artifact
   itself says.
2. ALWAYS MAX effort. Never tier down.
3. HEADLESS + BACKGROUNDED: write brief as a file, run
   `kimi -p "Read <BRIEF> and execute it fully" > OUT.md 2> ERR.log` in background.
   Gotcha encoded: the CLI streams progress to stderr; OUT may contain preamble lines
   before the deliverable — read the whole file, the deliverable is the markdown block.
4. RECEIPTS: `<project>/wo/KIMI_BRIEF_<SLUG>.md` + `KIMI_OUT_<SLUG>.md` (+ ERR log).
   Permanent, never deleted; they are how future sessions learn the pattern.
5. NO SECRETS / NO CUSTOMER PII IN BRIEFS — the brief leaves the machine (external model
   API). Reference credentials by env-var NAME, customers by role not name/phone.
6. THE BRIEF TEMPLATE (the load-bearing artifact, embedded in the skill):
   - Role line: hostile reviewer, no context, blindness-is-value, don't rewrite,
     don't be polite.
   - Context block: everything a stranger needs, self-contained.
   - 8-10 NUMBERED audit targets, always including: coverage holes · the
     underspecification sweep ("every place an executing agent would have to guess —
     each is a defect") · "THE ONE THING" (if you could force exactly one change, what
     and why).
   - OUTPUT CONTRACT: `## VERDICT` (one paragraph, sound-to-execute yes/no) ·
     `## FINDINGS` (numbered, severity LAUNCH-KILLER/HIGH/MED/LOW, each = section
     attacked · hole · concrete failure scenario · minimal fix) · `## ANSWERS`
     (numbered, mirror the targets) · optional `## MISSING-<X>` flat list.
7. THE DISPOSITION LEDGER (mandatory close): after OUT lands, the session must produce a
   table dispositioning EVERY finding — ACCEPT / ACCEPT-MODIFIED / REJECT — each with a
   reason, embedded in the distilled artifact (e.g. PLAN_FINAL). An undispositioned
   finding = the audit did not happen. Kimi is an advisor, not an authority: it is BLIND
   TO RUNTIME, so runtime evidence beats its reading, but a rejection must SAY that.
8. DEADMAN: typical run 5-25 min. ERR.log silent >30 min → dead; re-fire once; if dead
   again, proceed without the audit and SAY SO in the artifact. Never block a launch on
   a hung audit.
9. STACKING: kimi-baton (external blind adversary) + the `paranoia` skill (internal
   self-probes with receipts) are complements, not substitutes — big commits get both.

**Rollout:** skill written → audited by Kimi itself via this very brief → dispositioned →
shipped → maiden production run is an audit of the operation's backup/recovery protocol.

## Your audit targets — answer ALL, numbered

1. STRUCTURAL: what's wrong with the skill's shape — scope, triggers, boundaries? Where
   will it misfire or fail to fire?
2. THE BRIEF TEMPLATE: attack it. What's missing that makes audits weaker? What's present
   that biases you (the auditor) toward finding trivia instead of load-bearing holes?
3. BLINDNESS: where does this plan leak context anyway, or fail to police leakage? Is
   "withhold author intent" ever WRONG — cases where blindness produces garbage findings?
4. THE DISPOSITION LEDGER: is accept/reject/reason enough? What gaming does it permit
   (rubber-stamp rejections, severity inflation/deflation)?
5. OPERATIONAL FAILURE MODES: hung runs, partial OUT files, the stderr quirk, wrong CWD,
   receipts collisions (same SLUG twice), two batons in parallel — what breaks?
6. SECURITY/GOVERNANCE: the no-secrets law — sufficient? What else leaves the machine in
   a brief that shouldn't? What about the OUT file coming back (prompt-injection surface:
   the audited artifact could contain instructions that YOU then echo into OUT, which a
   session then reads and might act on)?
7. QUALITY DECAY: this pattern worked 4/4 times run by attentive operators. What makes it
   rot when it's a skill run by autopilot sessions? Name the drift vectors.
8. UNDERSPECIFICATION SWEEP: every place a session following this skill would have to
   guess. Each is a defect.
9. WHAT'S MISSING ENTIRELY: a section/law/mechanism the plan should have and doesn't.
10. THE ONE THING: if you could force exactly one change before this ships, what and why.

## Output format (markdown, to stdout)

`## VERDICT` · `## FINDINGS` (F1..Fn, severity · hole · failure · minimal fix) ·
`## ANSWERS` (1-10) · `## MISSING` (flat list).
