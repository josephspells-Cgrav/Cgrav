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
