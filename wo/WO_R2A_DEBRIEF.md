# WO-R2A — The DEBRIEF verb (Sonnet-5, judgment-zero)

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` FIRST — build protocol, the
no-assistant.ts registration rule, gates, standing laws. Your staging id: **R2A**.

## THE MISSION (Joseph's own words, 08-07)
*"I just called this lead, we scheduled an appointment for 11am, we're talking about a roof
replacement, she wants to keep it within $15,000, monthly payments, I already sent her the
proposal"* → Alex parses ALL of that into the right places, ONE confirm card, and lands it.

## THE VERB — `src/lib/assistant-debrief.ts`, tool name `debrief`
Ships **DORMANT** behind settings key `debrief_enabled` (copy the gate pattern from
`src/lib/assistant-start-cadence.ts`). Two-phase confirm always.

Input: `{ lead_id?, contact_id?, slots: {...}, corrections?, confirm? }`

The MODEL does the language work and fills `slots`; your CODE validates and writes. Never
parse free text in TypeScript.
```
slots: {
  appointment?: { start_iso: string, kind?: string, homeowner_agreed?: boolean },
  lead_stage?: string,          // LEAD stages only — never a JOB stage
  payment_pref?: string,
  insurance_claim?: boolean,
  proposal_sent?: boolean,      // RECORDS ONLY — see the rule below
  note?: string                 // always written verbatim as an activity
}
```

### THE CARD (pinned structure — customer-reaching FIRST and visually distinct)
```
⚠️ REACHES THE CUSTOMER
  1. Appointment — Tue Aug 11, 11:00 AM ET  [proposed — she is NOT texted]
     (or [confirmed — this TEXTS her a confirmation] when homeowner_agreed)
📋 INTERNAL ONLY
  2. Lead stage -> estimate_sent
  3. Note added (47 chars)
  4. Payment preference -> Monthly payments
Reply `confirm` to apply all, or `change 1 <new value>` to fix one.
```

### RULES (all FINAL)
- **Appointments book `proposed` by DEFAULT.** `confirmed` (which TEXTS the homeowner through
  booking-core) ONLY when `homeowner_agreed:true` — and the card states which, in words.
- **Every parsed time is echoed in full** (`Tue Aug 11, 11:00 AM ET`). An operator dictating
  "eleven" can mean 11pm; the echo is the catch. A time outside **8am-8pm ET** is flagged
  inline as OUTSIDE THE WINDOW.
- **`proposal_sent` = a LEAD STAGE move + a note ONLY.** It NEVER flips `documents.status`
  and NEVER sends anything. If the dump asks to actually send, the card says "I can't send
  from here — use send_document" and does not attempt it.
- **Stage inference is LEAD stages only.** A JOB stage move texts the homeowner — refuse with
  a named reason pointing at `set_job_stage`.
- **Ambiguous referent → REFUSE and LIST candidates**, writing NOTHING. Never guess who "she"
  is on a multi-write.
- **Idempotency:** hash the applied slot values (stable JSON); an identical hash applied to
  the same lead within 30 minutes makes confirm a no-op that SAYS so ("already applied 4
  minutes ago — nothing changed"). Store the hash in the note activity's `meta`.
- **Per-slot correction:** `corrections: {"1": "2026-08-18T15:00:00Z"}` re-previews with that
  slot replaced. A correction NEVER auto-applies — it produces a NEW card.
- **READ-BACK after writing:** build the success reply by RE-READING the rows you wrote
  (appointment, lead stage, activity) — never from intent. A write that silently didn't take
  must show as not-taken.
- Route the appointment through `booking-core` — never a raw insert. Read
  `src/lib/assistant-appointment-tools.ts` first and reuse its helpers where they fit.
- **Blackout awareness:** if the appointment date is blacked out
  (`src/lib/booking-blackouts.ts`), the card says so; the operator may still proceed.
- Money: `payment_pref` and any dollar figure the operator dictates live in the NOTE text
  only — never in a structured money field (the floor).

## TESTS — `src/lib/assistant-debrief.test.ts`
PGlite harness; **delete `touchAttempts` BEFORE `outbox`** in teardown.
Cases: dormant refusal names the setting · card orders customer-reaching first ·
proposed-by-default and the card says "NOT texted" · `homeowner_agreed` → confirmed + card
says it texts · an 11pm slot echoes with the OUTSIDE-THE-WINDOW flag · ambiguous referent
refuses and lists while writing NOTHING · a JOB stage in slots is refused · `proposal_sent`
moves the lead stage and touches no document row · identical re-confirm inside 30 min no-ops
and says so · a correction re-previews without applying · read-back reflects the actual rows ·
a blacked-out appointment date is disclosed.
