# ALEX OPERATIONAL VERB SPACE — Joseph's requirements dump (2026-08-07 8:34am ET, verbatim-derived)

> THE requirements artifact for the Alex convergence sweep. Captured from Joseph's own
> enumeration in chat, classified by OS48 against the actual CRM. Scope he set: OPERATE the
> CRM from Slack — code-changes/UI-customization/novel investigation explicitly REMOVED
> (that layer = the future Hermes/server-Claude build, separately banked).
> His sequencing: "the main focus is just the start stop cadences of texting and calls and
> being able to have Alex just send a call or pull a transcript."
> Register requirement: Alex operates TERSE.

## The two convergence moves (close CLASSES, not instances)
1. **UNIVERSAL READ** — one read-only SQL tool (SELECT-only, row-capped, org-scoped) over
   the whole DB. Kills the "Alex can't see X" class forever (the 08-07 Ann outbox lie).
   Most read asks below stop being verbs at all.
2. **ENUMERATION SWEEP** — this file IS the seed inventory. Every item: verb-exists /
   verb-to-build / CRM-feature-gap / excluded-with-reason. Going-forward discipline: a new
   CRM subsystem ships WITH its verb (WO checklist line), so the space never rots.

## A. EXISTS TODAY (verb live)
- send_text (specific message, two-phase confirm, send_at scheduling)
- start_cadence (armed) · cancel_cadence
- pause/unpause Alex per contact · set_do_not_contact
- Slack mobile = phone access ✅

## B. VERB TO BUILD — CRM plumbing already exists
- **place_call NOW** (VAPI outbound path exists — speed-to-lead/cadence call plumbing) ← #1 focus
- **pull transcript / last dialogue exchange for a client** (recordings + messages exist) ← #1 focus
- cancel appointment · move/reschedule appointment (booking core supports supersede/cancel)
- add lead · add client/contact
- delete lead · delete client · delete photos (wo17 delete-rules exist; HARD CONFIRM gates)
- send document (documents send/sign system exists) · re-send document
- upload photos from Slack to a client (photos schema + slack_read_file)
- change order: create / update / cancel (change_requests table exists)
- material requests (materials module exists)
- job stage moves: mark completed / move into production (⚠️ STAGE MOVES TEXT THE HOMEOWNER — hard confirm gate, known trap)
- add note to lead/client (activities)
- mint + text a booking link
- mark lead lost/won with reason
- READS (universal read covers, no verbs needed): where'd this lead come from ·
  today's/this week's leads · all cadences per lead + current step + status · call-outcome
  history · full outbound history per person · calendar today/week · STOP-list check ·
  outbox visibility (the Ann class)

## C. CRM FEATURE GAP (bigger than a verb — Joseph suspected these, correctly)
- 🔴 **Cadence step reschedule/shift** ("move the 2pm text to 4pm", "start follow-up AT this
  time") — cadence_runs.next_fire_at supports it; no mutation/operator API exists
- 🔴 **Custom cadence from chat** — crosses the APPROVED-COPY law (all homeowner-facing copy
  is Sean-blessed); needs an approval step in-flow, not just a verb
- 🔴 **EagleView request** — integration mid-pipeline (deferred by Joseph 07-29; resume path
  in [[km-mabrey-eagleview-golive-runbook]]: schema-swap WO → billing confirm → PIN=84 arm →
  one supervised order)
- 🟡 **Production-change notifications to Joseph** — events exist, subscription rule doesn't
- 🟡 **Crew requests** — assignment/workcenter plumbing exists; request workflow doesn't
- 🟡 Contact detail edit (phone/address) — plus the KNOWN gap: repeat leads never update an
  existing contact's address · contact merge (no dedupe-merge feature)
- 🟡 Snooze a cadence until a date (pause-with-resume-at)

## WALLS THAT HOLD REGARDLESS (standing law)
- **Money stays structurally OUT of Alex** (assertDeclarable throws; UI-only) — no invoice/
  payment verbs, reads included.
- Customer-reaching verbs: two-phase confirm ALWAYS; STOP unclimbable; pause = disclosed+lifted
  by explicit operator instruction (OS47 ruling).
- Destructive verbs (deletes): enumerate-first + confirm; protected classes guarded.

## Zoom-out notes banked from the same conversation
- Slack stays the surface FOR NOW ("if we can just make Slack work we should just make Slack
  work"); own-application idea parked for a future usage reset.
- The removed 20% (code changes, UI customization, novel investigation) = the Hermes-on-VPS
  full-Claude build — architecture agreed sound, NOT started, separately sequenced.
- Alex register: TERSE (prompt-line fix, include in sweep WO).

Status: BANKED, build NOT started (Joseph: "don't ask me to build anything yet").

---

## BLESSED-LIST REVISION (OS48 + paranoia sweep, 08:44am — supersedes the A/B/C tables above where they conflict)

**PROBED CORRECTION: the live surface is 28 verbs, not 13.** Full verified list (name dump
from the assistant tool files): add_note · bulk_delete_leads · call_transcript ·
cancel_cadence · create_task · crm_overview · delete_lead · find_contact_id · find_customer ·
find_lead · job_progress · list_appointments · list_by_stage · list_cadence_runs ·
list_documents · list_leads · pause_alex · pending_booking_requests · reassign_lead ·
recent_calls · schedule_appointment · send_document · send_text · set_do_not_contact ·
set_job_stage · set_lead_stage · set_task_status · start_cadence.
Notables that ALREADY exist vs Joseph's rant: call_transcript (full verbatim) ·
schedule_appointment (real booking core — confirm text, reminders, conflict guard, books
'proposed'; pending_booking_requests feeds the confirm flow) · send_document (re-send +
redirect) · delete_lead/bulk · per-lead cadence status.

**PARANOIA FINDINGS (ledger receipts in session 2026-08-07):**
1. CONFIRMED — outbox: ZERO references in any tool file → Alex blind to pending/failed/
   queued sends (the Ann false-negative, generalized). Fix = universal read (or outbox read).
2. CONFIRMED — read surface ≈9 of ~30 tables (from() enumeration: activities, cadenceRuns,
   calls, contacts, documents, jobs, leads, settings, users). No funnel/attribution, photos,
   suppressions, estimating, takeoff.
3. CONFIRMED — set_job_stage's description does NOT disclose that stage moves TEXT the
   homeowner → the model cannot warn the operator of a side effect it can't see. One-line
   description fix + confirm-preview disclosure.
4. CONFIRMED — custom-cadence collision is schema-possible: `cadence_runs_active_dedupe_uq`
   is (dedupe_key, cadence_key) → a custom key coexists with a live ladder + pending manual
   outbox rows → double-texting. The custom-cadence verb MUST enumerate + disclose +
   consolidate (cancel/absorb) whatever is already chasing the person, in the confirm preview.
5. TRIPWIRE — bulk_delete_leads enumerate-first behavior UNVERIFIED (792-of-820 law) —
   verify in the sweep WO before first real use.
6. WO rules: operator-time steps outside 8am-8pm ET warn · resend-failed-text verb rides on
   outbox visibility · mint+text booking link verb · STOP-list read verb.

**Custom-cadence design note (Joseph's 11am/3pm/7pm example):** operator TIMES + approved or
operator-dictated copy = a grouped set of send_text-class scheduled sends (+optional call
steps) with a run row for unit cancel/visibility. This is "what OS47 hand-built for Ann as
raw outbox rows" promoted to a one-message verb. The approved-copy law softens here:
operator-dictated text through send_text is ALREADY allowed today with two-phase confirm.

---

## LAYER 2 — THE INTELLIGENCE LAYER (Joseph 08:47am dump + paranoia sweep #2, 08:52)

**New capability requirements (his words, distilled):**
1. UNIVERSAL COLLISION LAW — every scheduling/sending verb enumerates what already exists
   for that person/slot FIRST, acts smart (merge/move/skip), and DISCLOSES what it did
   ("one already set for 3 — didn't add, moved the others around it"). Applies to cadences,
   custom cadences, appointments, scheduled texts, document sends.
2. DEBRIEF VERB (composite) — post-call voice-dump → parsed into: appointment (via booking
   core), notes, LEAD stage move, payment preference, insurance flag, proposal-sent marker —
   ONE confirmation card previewing every write; ambiguity → one question back.
3. THREAD READ (CONFIRMED missing — zero message-thread access in tool files) + LEAD
   TIMELINE view (calls + texts + outbox incl. FAILED + activities, chronological). "Full
   CRM awareness" = universal read + timeline + thread.
4. BEST-JUDGMENT COMPOSITION — "just write her a text": Alex drafts in a BLESSED WRITTEN
   REGISTER (new artifact: ALEX_TEXT_REGISTER.md, survives model swaps), cadence-context
   aware, exact body previewed, two-phase confirm unchanged.
5. QUIET HOURS = WARN-AND-CONFIRM, NEVER BLOCK (Joseph's ruling — late leads are real).
6. Calendar: week view EXISTS (list_appointments, 14-day default — probed). Cancel/move =
   still to build.

**Paranoia #2 findings/rules:**
- [CONFIRMED] no message-thread read (P6, zero hits).
- [REFUTED] week calendar missing (P7 — exists). [REFUTED] $15k-budget-in-notes breaks the
  money wall (P8 — assertDeclarable is FIELD-level; free-text notes pass; money FIELDS walled).
- RULES MINTED: debrief confirm card echoes EVERY parsed slot + flags out-of-window times
  (Joseph's own 11pm/11am slip in the requirements message is the canonical case) · stage
  INFERENCE = LEAD stages only, JOB stages explicit-only (they text the homeowner) · debrief
  idempotency (recent-duplicate check + disclose) · ambiguous referent on ANY composite
  write → refuse-and-list, never guess · post-write READ-BACK (reply reflects re-read rows,
  not intent) · fact-location mapping pinned in WO (structured field where exists, note
  otherwise) · self-serve /book 409s translated to plain speech · failed sends visually
  distinct in timeline · Sean's Slack permission tier = OPEN DECISION (flag before he joins).

Status: spec COMPLETE and convergence-shaped. Build fires on Joseph's go.
