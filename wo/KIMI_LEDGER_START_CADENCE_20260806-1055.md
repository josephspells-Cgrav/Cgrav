# DISPOSITION LEDGER — `start_cadence` (Kimi baton `KIMI_OUT_START_CADENCE_20260806-1055.md`)

Written by **OS47**, 2026-08-06 ~12:45 ET. Per the `kimi-baton` skill: the auditor's OUT is
**adversarial data**. Every finding is dispositioned here — ACCEPT / REJECT / SUBSTITUTE /
DEFER — with a reason. Nothing in the OUT was executed as written.

**Verdict on the verdict:** the audit is strong and its ONE THING is *half* right. The index is
the fix; the transaction it prescribes cannot exist on this stack. Two of its open questions were
closed by probe rather than by argument, and one of its guards would have refused 99% of the
database for no operational reason. Findings below carry `[PROBED]` where a code read or DB query
settled them.

---

## THE ONE THING — split

> Kimi: *"partial unique index on active `cadence_runs` keyed on normalized phone, with the confirm
> path re-running all guards inside ONE transaction."*

| half | disposition | why |
|---|---|---|
| partial unique index | ✅ **ACCEPT** | It is the only thing that converts criterion 2 from a promise into an invariant. |
| "inside ONE transaction" | ⛔ **REJECT — SUBSTITUTE** | `[PROBED]` Prod runs `drizzle-orm/neon-http`, which literally throws `No transactions support in neon-http driver` (`node_modules/drizzle-orm/neon-http/session.js:152`). Matches the standing OS45 lock: *on neon-http, idempotence IS the transaction.* **Substitute:** a single `INSERT` is atomic by itself; the unique violation is caught and mapped to the friendly "already enrolled" refusal. The guards become UX; the constraint is the truth — exactly Kimi's own framing, minus a transaction it does not need. |

`[PROBED]` **The migration is free right now:** prod has **0 active `cadence_runs`** (all 7 rows
`cancelled`). Zero duplicate-actives to reconcile, so the index applies clean with no cleanup step.
Kimi's "migration plan for existing duplicate actives" is moot — today. It would not have been last
week, and will not be next week.

---

## FINDINGS

**F1 · HIGH · ✅ ACCEPT (index) + ⛔ SUBSTITUTE (transaction)** — see above.

**F2 · HIGH · ✅ ACCEPT** — dedupe on phone, not contact. Implementation note the audit could not
have: `cadence_runs` has no phone column, and Postgres cannot build a unique index across a join.
So `startCadence` now writes a nullable `dedupe_key` (normalized E.164, falling back to contact id),
and the partial unique index sits on that. **Placing it in the shared primitive rather than in the
verb is the load-bearing choice** — the race that actually matters is *manual start vs. the intake
auto-enroll*, and both paths go through `startCadence`. A verb-local guard would not have covered it.

**F3 · HIGH · ✅ ACCEPT — CONFIRMED BY PROBE, severity revised down.** `[PROBED]` Intake **does**
auto-enroll: `src/lib/events.ts:229`, `lead.created` → `startCadence("new_lead_followup",
{skipFirstStep:true})`. Kimi was right to flag it. But it does not refuse the primary use case:
`[PROBED]` Randy's run (`50317b7f`) is `cancelled/human_takeover`, and there are 0 active runs
anywhere. The collision case is a *fresh* lead whose auto-run is still alive. Disposition: **not a
flat refusal** — report the live run (key, step, next fire time, run id) so the operator can cancel
it or realize it is already doing what he wanted.

**F4 · HIGH · ✅ ACCEPT + EXTEND — this one grew a new finding.** Per-key eligibility implemented.
`[PROBED]` `appointments` and `documents` key on **`lead_id`, never `contact_id`**, so eligibility
resolves through the lead:

- `no_show` → requires an appointment on that lead with status `no_show`.
- `proposal_chase` → requires a sent document on that lead.
- `new_lead_followup` → requires a lead.

🔴 **NEW (not in the audit) — the default path speaks a falsehood.** `skipFirstStep:true` positions
the run at **step 1**, and step 1's spoken template is *"following up on the estimate request you
sent in **today**"* (`cadence.ts:322`). For any lead not created today, the **first thing the
customer hears is false** — and that is the exact path P4 was written to make safe. Kimi flagged
later-step copy as "unaudited" (F4c) without naming an instance; this is the instance, and it sits
on the happy path. **Fix:** a manual start of `new_lead_followup` positions at **step 2** when the
lead is older than today ("*…again, about the roof inspection you asked about*" — true, since a
human just called). Preview always prints the lead's age and the verbatim first-touch copy.

**F5 · HIGH · ✅ ALREADY SHIPPED (OS46) + residual accepted.** The pause kill-switch shipped
standalone as Kimi's sequencing note demanded. Residual taken here: **starting a ladder on a paused
contact is refused** — otherwise the run is created and every step is silently suppressed at the
drain, which is `ARMED ≠ REACHABLE` #9 waiting to happen. Sub-items *"does the customer-facing SMS
agent honor pause"* and *"does `cancel_cadence` drain already-queued outbox rows"* are **DEFERRED to
the paranoia sweep** at the arm point — they are codebase-wide, not this verb's.

**F6 · MED · 🟡 PARTIAL ACCEPT.** Confirm-time re-run of all guards: **accepted**, all of them.
Expiring preview token: **deliberately cut.** The two-phase echo already carries `contact_id` +
`cadence_key`, re-running the guards closes the state-drift hole, and the unique index makes a
double-confirm idempotent by construction. A token adds a settings round-trip and a new expiry
failure mode to a verb only one allowlisted human can call. Recorded as a scope cut, not an oversight.

**F7 · MED · ⏭️ DEFER (carried).** "Do VAPI call steps pass suppression/consent/window, or is that
outbox-only" is a codebase-wide reachability question, not a `start_cadence` question. Carried to
the paranoia sweep. Named here so it cannot go quiet.

**F8 · MED · ✅ ACCEPT — per-key, not blanket.** `new_lead_followup` → skip (a human just called),
with the step-2 reposition above. `no_show` → skip (its step 0 is the t=0 "we missed each other
today" message the operator just lived through). `proposal_chase` → **defer, not skip**: its step 0
is `afterHours: 24` and nobody has made that contact, so `skipFirstStep` would silently drop the
intended first touch — `deferFirstStep` is the correct primitive and the plan never mentioned it.

**F9 · MED · ✅ ACCEPT.** Preview time passes through the same `nextWindowOpening` the spine uses,
labeled ET.

**F10 · MED · ⏭️ DEFER (carried).** Skip-vs-hold on mid-run pause is the behavior OS46 shipped
yesterday; re-litigating it inside a feature build is how scope dies. Carried.

**F11 · LOW · ✅ ACCEPT.** Exactly-one-of `lead_id`/`contact_id`, lead→contact resolved before the
floor check, both ids on the audit row.

**F12 · LOW · ✅ ACCEPT IN FULL.** 555-**01XX** fixtures only, scheduled so the prod drain cron
cannot claim them, and the test **asserts the negative**: zero outbox rows, zero dial attempts.

---

## DEVIATIONS FROM THE PLAN (not from the audit) — recorded

**D1 · The consent guard as written would have refused 99% of the database.** `[PROBED]` Prod leads:
**795 `consent=null`, 6 `consent=true`.** `[PROBED]` All three allowlisted cadences carry no explicit
`purpose`, so they default to **`transactional`** (`cadence.ts:725`) — and the outbox consent gate
**skips `transactional` entirely** (`outbox.ts:22-30`, WO_11 policy). So Kimi's stated rationale for
guard 3 — *"refuse, because the outbox would drop the sends anyway"* — is **false for these keys**:
the outbox would send them. A hard consent refusal would have been stricter than the spine, refused
795 contacts for no operational reason, and taught the operator the verb is broken.

**Disposition:** consent becomes a **preview disclosure**, not a blocker. The hard refusal moves to
where the real TCPA basis lives: **no linked lead at all** ⇒ refuse. A contact with no inbound lead
never asked Mabrey for anything, and that — not a null column inherited from a pre-form import — is
the case worth blocking.

**D2 · Shipped dormant.** The verb lands behind a settings flag defaulting **off**. Arming a verb
that initiates consumer contact is Joseph's flip, not mine (yolo-mode floor 3). One line arms it, no
redeploy.

---

## CARRIED OUT OF THIS BUILD (say it, don't let it go quiet)
- F7 — VAPI call-step gate set (suppression / consent / window) vs outbox-only.
- F5 residual — customer-facing SMS agent vs pause; `cancel_cadence` vs already-queued outbox rows.
- F10 — skip-vs-hold semantics on mid-run pause.
- Kimi's model-in-the-loop tests (key selection, name disambiguation) — the sim harness exists
  (`scripts/alex-sim.mts`); running it against this verb is a follow-on, not a launch gate.

*Ledger closed. 12 findings: 8 accepted, 1 split accept/substitute, 1 partial, 3 deferred-with-names,
0 rejected outright. Plus 1 finding the audit did not have and 1 guard it got backwards.*
