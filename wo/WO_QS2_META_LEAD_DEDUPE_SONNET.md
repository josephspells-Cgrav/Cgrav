# WO-QS2 — fire the Meta `Lead` conversion EXACTLY ONCE per lead (blocks the QS deploy)

**Read FIRST:** `wo/WO_R2_COMMON.md` (rules apply) with these OVERRIDES:
- Staging root: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/QS2_STAGED_DELIVERABLE/` — **`site/` subtree only** (repo-relative paths for `mabrey-roofing`).
- SITE repo: `C:/Users/josep/Claude Gravity/mabrey-roofing` branch `master` @ HEAD `dd6a588`.
- 🔴 **GATES IN THE FOREGROUND, inline, never backgrounded.**
- Build report: `wo/BUILD_REPORT_QS2.md`.

## 🔴 WHY THIS BLOCKS THE DEPLOY
WO-QS makes the funnel POST **twice** per completer (contact screen, then address screen).
The site's `/api/lead/route.ts` fires a Meta `Lead` conversion on **every** POST — so after
QS ships, **every completer counts as TWO leads in Meta**. That corrupts lead count, CPL, the
$100/day PoC read, and the standing "Meta N == CRM N" reconciliation. Flagged by the QS
builder (BUILD_REPORT_QS.md §9 items 1-2); resolving it is this WO.

## THE RULE (decided — implement, do not re-litigate)
**The `Lead` conversion fires once, on the FIRST POST — the contact screen.** That is the
moment a contactable human exists, and it is the conversion the ad spend is actually buying.
The second POST (address) is an ENRICHMENT of an existing lead, never a new conversion.

## THE MECHANISM — server-authoritative, never client-controlled
The CRM already answers this. Its webhook response returns **`updated: true` on, and only on,
the funnel-session UPDATE path** (staged: `crm/src/app/api/webhooks/site-lead/route.ts`,
key added by WO-QS; `false`/absent on a fresh insert). Do NOT add a client-supplied "don't
fire" flag — `app/api/lead/route.ts:40-42` deliberately refuses client-controlled ids for this
exact class of reason, and that precedent governs here.

1. **`lib/server/forwardLead.ts`** — today returns a bare
   `ForwardOutcome = "forwarded" | "skipped_no_url" | "forward_failed"` and discards the CRM
   body. Widen it to also surface whether the CRM reported an update — e.g. return
   `{ outcome: ForwardOutcome; updated: boolean }`, or add a discriminated `"forwarded_updated"`
   member. **Your call which is cleaner; keep the existing log line's text unchanged**
   (`console.log(\`[lead] ${id} ${outcome}\`)` — the outcome word must still print).
   Parse defensively: a non-JSON / unexpected body ⇒ `updated: false` (**fail-open toward
   FIRING** — under-counting conversions starves Meta's optimizer, and a duplicate is the
   thing we can still detect downstream; state this reasoning in a comment).
2. **`app/api/lead/route.ts`** — when the CRM reported `updated`:
   - **Skip `sendLeadCapiEvent` entirely** (no CAPI call, no `waitUntil`).
   - **Omit `requestId` from the response.** `okBody` currently always includes it; make it
     optional. This alone kills the browser pixel: `trackMetaLead` already returns early on a
     falsy id (`lib/track.ts:74`) — reuse that existing guard, do not add a second one.
   - Everything else about the response is unchanged (`ok: true` still present, same status).
   - Bot/honeypot/time-trap early-returns keep calling `okBody(id)` exactly as today.
3. **`components/funnel/useLeadSubmit.tsx`** — `trackMetaLead(body?.requestId)` at line ~114
   needs NO logic change once `requestId` is absent on updates; **verify** that and receipt it.
   Only touch this file if the verification proves a change is genuinely required.

## Tests (site repo — state honestly what harness exists; add one if none)
- Fresh insert (CRM returns no `updated`) → CAPI called once, `requestId` present in body.
- Update (CRM returns `updated: true`) → CAPI **not** called, `requestId` **absent**.
- Malformed / non-JSON CRM body → treated as NOT updated → CAPI fires (fail-open).
- `skipped_no_url` / `forward_failed` → behavior identical to today (no regression).
- The bot / honeypot / time-trap paths still return `ok: true` with a `requestId`.

## Gates
Site: `npx tsc --noEmit` **and** the production build (`next build`) — FOREGROUND, tails
verbatim in the report. Do not touch the CRM repo — WO-QS owns it and is already staged.

## Report (`wo/BUILD_REPORT_QS2.md`)
Gate tails · files touched · the exact shape you chose for `forwardLead`'s return and why ·
receipts (file:line) for the `trackMetaLead` early-return reuse and the unchanged log line ·
STOPs. Never commit, never deploy.
