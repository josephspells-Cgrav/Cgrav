# DISPOSITION LEDGER — Kimi 3-pass paranoia loop on the Alex convergence spec (OS48, 2026-08-07 ~9:20am)

Audit: `KIMI_OUT_ALEX_CONVERGENCE_20260807-0855.md` — verdict "yes as amended; no as written."
30 findings (17+13 across passes 1-2, wait: 17 P1 + 13 P2 + 7 P3 = 37 numbered; several LOW).
All dispositioned below; the FINAL BUILD SPEC section appended to ALEX_VERB_SPACE supersedes
prior sections. Note the audit corrected the AUDITOR twice — my own paranoia sweep's finding
#3 was stale and my change-orders classification was a schema misread. New law adopted:
**a CONFIRMED finding carries a file:line receipt or it is not CONFIRMED.**

| F | Sev | Disposition | Reason |
|---|---|---|---|
| F1.1 | HIGH | **ACCEPT — becomes build item #0** | Call attempts record nothing durable (console.error only); place_call would rebuild the Ann class on the call channel. The attempt ledger precedes the universal read (THE ONE THING). |
| F1.2 | HIGH | **ACCEPT (my error)** | change_requests is the showroom audit queue (schema:1922) — my "plumbing exists" claim was a table-name collision. Change orders → CRM FEATURE GAP (needs entity). |
| F1.3 | HIGH | **ACCEPT** | Money wall vs whole-DB read was a live contradiction; enforcement moves to grants (see F2.1), not prompt. |
| F1.4 | HIGH | **ACCEPT** | 46 tables incl. credential columns (password_hash, api_tokens, booking/public tokens) + DEFAULT_ORG demo machinery → INCLUDE-list + column denylist; token-leak scenario is real. |
| F1.5 | MED | **ACCEPT** | pending_booking_requests' silent 24h cutoff = a live false negative in a "blessed EXISTS" verb; empty-states must disclose windows (law generalized). |
| F1.6 | MED | **ACCEPT** | set_appointment_status (completed/no_show/cancelled) added; no_show gates the recovery ladder (G5) so the debrief needs it. |
| F1.7 | MED | **ACCEPT** | cancel_scheduled_send added — the Ann-remediation verb; manual sends currently unkillable from Slack. |
| F1.8 | MED | **ACCEPT** | alex_suggested rows must render as DRAFT, never queued — forward-looking false-positive class. |
| F1.9 | MED | **ACCEPT** | Grounding queries lack whereOrg (probed claim vs its own header) — fixed in the WO + per-surface org tests. |
| F1.10 | MED | **ACCEPT (my error)** | My sweep's "CONFIRMED" was stale — assistant-production-tools.ts:98-106 already discloses homeowner texts. Struck; the file:line law adopted. |
| F1.11 | MED | **ACCEPT** | start_cadence is flag-gated, "armed ≠ enabled" — prod row probed ARMED earlier today (enabled:true receipt in OS48 arrival probe) but the WO records the check anyway. |
| F1.12 | MED | **ACCEPT** | 8pm-vs-9pm window docs disagree; ONE source (nextWindowOpening) + every surface cites it; previews echo real fire time. |
| F1.13 | MED | **ACCEPT** | place_call gets pinned opener templates per blessed purpose — spoken copy has no confirm window; approved-copy law extends to voice. |
| F1.14 | LOW | **ACCEPT** | resolveSendAt refuses past times, warns on far-future. |
| F1.15 | LOW | **ACCEPT** | find_contact_id required-params fix (burned iterations matter under the cap). |
| F1.16 | LOW | **ACCEPT — tripwire CLOSED** | bulk_delete enumerate-first verified at assistant-lead-tools.ts:223-231; silent invalid-id drop noted in WO rules. |
| F1.17 | LOW | **ACCEPT** | reassign_lead roster filtered to in-rotation reps. |
| F2.1 | LAUNCH-KILLER | **ACCEPT** | SELECT-regex is bypassable (data-modifying CTEs); read-only = a separate Neon ROLE with SELECT grants on the include-list only + single-statement + timeout. Grants mechanically implement F1.3/F1.4. |
| F2.2 | HIGH | **ACCEPT** | Truncated results must carry truncated flag + filters echo; absence-answers banned on truncation — else the Ann class ships inside its own cure. |
| F2.3 | MED | **ACCEPT** | Byte caps + transcript-column steering; fat columns would starve the 12-iteration loop. |
| F2.4 | HIGH | **ACCEPT** | Read layer = injection surface; untrusted-data wrapping + recipients/bodies never sourced from read content + destination echoed verbatim. |
| F2.5 | HIGH | **ACCEPT** | Collision law reordered: enumerate → PROPOSE in card → act; manual rows never auto-cancelled; cancel-before-insert; re-enumerate at confirm. Joseph's "moved the others around it" intent survives as a PROPOSED plan he taps yes on. |
| F2.6 | HIGH | **ACCEPT** | Custom cadence key = fixed `custom_outreach` per handset (one live custom ladder per phone; absorb-or-refuse) + run owns rows via meta.cadenceRunId so the existing drain cancels it. |
| F2.7 | HIGH | **ACCEPT** | Debrief card: customer-reaching slots first + distinct; proposed-by-default booking; per-slot correction; slot-hash idempotency. The 11pm/11am slip is the canonical case. |
| F2.8 | MED | **ACCEPT** | Per-slot write paths pinned; proposal-sent = lead stage unless "send it" was said (then through sendDocument's real flow). |
| F2.9 | MED | **ACCEPT** | Composition linter (mechanical): money patterns, off-domain links, length, banned claims — the register doc persuades, the lint decides. |
| F2.10 | MED | **ACCEPT-MODIFIED** | Kimi's honest-echo replaces a fake warn — AND Joseph's late-lead need is served by unifying the window to the TCPA 9pm bound (F1.12): evening sends up to 9pm go out; later → held with the real fire time echoed. Both intents survive. |
| F2.11 | MED | **ACCEPT** | cancel races drain → single conditional UPDATE WHERE pending; 0-rows → report true terminal state. |
| F2.12 | MED | **ACCEPT** | no_show verb discloses ladder eligibility; WO verifies whether auto-enroll wiring exists BEFORE arming. |
| F2.13 | LOW | **ACCEPT** | Timeline sorts by effective time; held rows at hold time; clock-skew note pinned. |
| F3.1 | HIGH | **ACCEPT** | Confirm binds to (user id, echo hash, expiry); new powers gated to Joseph's Slack id until Sean's tier is DECIDED. The two-user "yes" collision is real. |
| F3.2 | HIGH | **ACCEPT** | The attempt ledger is the shared substrate across voice/SMS/Slack agents; collision enumeration includes last-touch-any-agent < N min. |
| F3.3 | MED | **ACCEPT** | cancel/move ride booking-core only; re-read at confirm; 409s in plain speech. |
| F3.4 | MED | **ACCEPT** | Side-effect disclosures live IN preview strings (code), never only descriptions — survives model swaps; audited per new verb. |
| F3.5 | MED | **ACCEPT** | Iteration-cap returns an explicit "ran out of room" reply, never lastText; timeline/debrief-context are single server-side tools. |
| F3.6 | MED | **ACCEPT** | Success criterion 2 rewritten: every customer-reaching action AND attempt lands a queryable row; absence-answers disclose search space. |
| F3.7 | LOW | **ACCEPT** | assistant_turns joins the read surface only after F3.1 gating; else excluded. |

**Score: 37/37 dispositioned · 35 ACCEPT · 1 ACCEPT-MODIFIED (F2.10, reconciling Joseph's late-lead ruling with the spine's truth) · 1 closure (F1.16) · 0 REJECT — and 2 of the audit's corrections were of MY findings (F1.2, F1.10), which is the audit working.**
