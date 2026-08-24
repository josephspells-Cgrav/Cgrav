# King Maker Funnel — v2 RECONCILED Build Spec

Reconciles `FUNNEL_HANDOFF_PROMPTS.md` (v1 draft) by applying the 7 READ-FIRST breakers from
`CLAUDE_N8N_FUNNEL_SPECIALIST_GUIDE.md`. Grounded in the live n8n MCP (real node schemas) + a 4-agent
adversarial verification pass. Authored by the n8n Deployment Agent, 2026-05-30. **NOT yet built/validated —
this is the locked design to build from after the two OPEN DECISIONS (§10) are answered.**

---

## 0. HEADLINE CHANGES FROM v1 (what + why)

| # | v1 | v2 | Why |
|---|---|---|---|
| Architecture | TWO workflows; A fires B via `executeWorkflow(waitForSubWorkflow:false)` fire-and-forget | **ONE workflow**: Webhook(responseNode) → Respond **202** early → SAME execution continues → invoke runner → `Wait(webhook)` → fan-out | Breaker #1. `waitForSubWorkflow:false` is a **confirmed, recurring, UNFIXED** silent-abort (n8n community 53771, 122221; v2.0 fix only covered the *blocking* path). Single-workflow eliminates the detached edge **by construction** — n8n is documented to keep executing after Respond-to-Webhook, and a >65s Wait offloads to Postgres so it's restart-durable. |
| Data key | `idempotencyKey` (13a/§12) **vs** `leadId` (long-form agent prompt) | **`idempotencyKey` everywhere** (retire `leadId`) | Breaker #2. One key. It's the DataTable claim key + the runner's branch name. |
| Consent field | `consentSms` (13a) **vs** `consent` (2nd build prompt) | **`consentSms` everywhere** | Breaker #2. `consent` mismatch silently disables SMS forever (gate reads `undefined`). |
| Contract nesting | n8n pre-assembles `rebrandSpec{}` (13a/§12) **vs** flat `business/geography/theme` (long-form) | **FLAT structured lead in; the metered Claude agent GENERATES the spec** ⚠️ *(see §10 — architect confirm)* | Brief says "the agent does the 5-step rebrand for the lead's business." n8n only has business name/niche/city — it cannot fabricate palette/copy/images. The metered agent is the content generator; n8n must not pre-assemble creative content it doesn't possess. |
| Config | `$vars.twilioAccountSid` etc. | **`Config` Set node** (non-secret config) + credentials (secrets) | **NEW finding > #6: n8n Variables are ENTERPRISE-only — NOT on Community self-host.** `{{ $vars.* }}` → `undefined` silently on the target box. The Set-node pattern is license-independent + portable. |
| Model | `claude-opus-4-8` (docs prose) | **`claude-sonnet-4-6` default / `claude-opus-4-7` escalation** | Breaker #7 + brief. `4-8` is unverified and 404s. Brief is authoritative: 4-7. |
| Security | resume callback + Twilio + SendGrid webhooks all `auth:none`, unverified | **3 Code-v2 verifier nodes** (HMAC/ECDSA + `timingSafeEqual`), verify FIRST | Breakers #3, #4. The `crypto` node can't do any of them (no SHA1, no ECDSA, no constant-time compare). |
| Cost | `costUsd` optional, never stored; Opus unbounded | **`km_leads` cost columns + hard per-lead ceiling IF + gated/logged Opus** | Breaker #5. |
| Delivery safety | trusts runner's self-reported `status` | **HTTP HEAD liveness probe on `demoUrl` (gate on 200) before fan-out** + `enableStreaming:false` on the 202 | Breakers #6, #7. Never SMS/email a dead link. |
| Hermes | (n/a) | **Removed** — not part of the funnel. | Retired per brief. |

---

## 1. THE 7 BREAKERS — v2 RESOLUTION

1. **Silent paid-lead drop →** single-workflow Wait-resume (above). No detached sub-execution exists. Failures occur inside one live execution bound to the Error Workflow → they fail LOUDLY. Plus a **stuck-waiting watchdog** (§6) for the one residual (Community is non-transactional).
2. **Contract contradiction →** ONE contract, §3. `idempotencyKey`, `consentSms`, `contractVersion:"2.0"`, flat-lead-in.
3. **Forgeable resume callback →** Code-v2 "Verify Deploy Callback HMAC" (HMAC-SHA256 over `idk.status.demoUrl.sha.ts`, `X-KM-Signature`/`X-KM-Timestamp`, 5-min replay window, `timingSafeEqual`, bind to parked `idempotencyKey`) placed AFTER Wait, BEFORE the deploy-IF. §5.
4. **Unauthenticated status webhooks →** Twilio Code-v2 (HMAC-SHA1 over public-URL+sorted-params, base64) + SendGrid Code-v2 (ECDSA-P256 verify over `timestamp+rawBody`). Webhooks set `authentication:'none'` + `options.rawBody:true`; verify FIRST, before any CRM write. §5.
5. **Cost accounting →** `km_leads` gains `model,inputTokens,outputTokens,costUsd,costCumulativeUsd,escalated`; runner returns `usage`+`costUsd`+`model`; a deterministic **Cost Ceiling IF** (`costUsd < Config.costCeilingUsd`) gates delivery; Opus only when request sets `allowOpus:true` AND it's logged (`escalated:true`). §8.
6. **n8n param landmines →** `respondToWebhook.options.enableStreaming:false` (VERIFIED default true); `$vars` → Config Set node (VERIFIED unavailable on Community); the dead 9-way Switch → a single niche-allowlist check (the 9 cases converged on one path anyway). §7.
7. **Dead-link + model id →** HTTP **HEAD** liveness probe (VERIFIED selectable; `options.response.response.fullResponse:true`+`neverError:true` to read `statusCode`, gate ==200) before fan-out; model `claude-opus-4-7`. §7/§8.

---

## 2. ARCHITECTURE — single workflow + small inbound flows

```
MAIN: "KingMaker — Funnel" (one execution per lead)
  Webhook(POST km-lead, responseMode:'responseNode', allowedOrigins=preview)
  → Set "Normalize Lead" (optional-chaining defaults; idempotencyKey=lowercased email; consentSms bool; contractVersion)
  → Set "Config" (tenDlcApproved, twilioAccountSid, twilioMessagingServiceSid, webhookBase, costCeilingUsd, allowOpus)
  → DataTable "Claim Lead" upsert on idempotencyKey (status='claimed')  [claim BEFORE work]
  → IF "Already Building?" (rowExists pre-claim)  .onTrue → Respond 202 (no-op)   .onFalse ↓
  → Respond "Ack 202" (respondWith json, responseCode 202, enableStreaming:false)   [frees the socket; execution CONTINUES]
  → HTTP "Enrich" (optional, neverError, onError:continue)
  → IF "Quality Gate" (email exists + contains '@' + niche in 9-allowlist)  .onFalse → DT status='rejected' → Stop&Error
  → HTTP "Invoke Rebrand Runner" (POST flat lead + rebrandSpec? NO → flat lead + callbackUrl={{ $execution.resumeUrl }} + allowOpus)
  → Wait "Await Deploy Callback" (resume:webhook, limitWaitTime 15m)
  → Code "Verify Callback HMAC" (#3 — reject for/stale/forged → Stop&Error)
  → IF "Deploy Succeeded?" (body.status=='deployed' AND body.demoUrl notEmpty)  .onFalse → DT status='deploy_failed' → Stop&Error
  → Set "Stage Delivery Payload" (demoUrl, commitSha, model, usage, costUsd + lead fields via $('Normalize Lead'))
  → IF "Cost Ceiling OK?" (#5)  .onFalse → DT status='cost_exceeded' → Stop&Error
  → HTTP HEAD "Probe Demo URL" + IF "200?" (#7)  .onFalse → DT status='dead_link' → Stop&Error
  → FAN-OUT (each executeOnce + onError:'continueRegularOutput'):
        (a) SendGrid email (dynamicTemplate; CAN-SPAM footer static in template)
        (b) IF "consentSms && Config.tenDlcApproved" → HTTP Twilio REST SMS (MessagingServiceSid)
        (c) DataTable "Log Delivery" (status='delivered', demoUrl, model, tokens, costUsd, deliveredAt)

INBOUND (small separate workflows, each: Webhook auth:none + rawBody:true → Verify(Code) → Respond 200 fast → DataTable upsert):
  - "Twilio Status"   verify X-Twilio-Signature (HMAC-SHA1) → upsert smsStatus on MessageSid   (only authoritative SMS-delivered signal)
  - "SendGrid Events" verify ECDSA → upsert on sg_event_id
  - "Stripe"          stripeTrigger 'checkout.session.completed' apiVersion PINNED (verifies internally) → upsert status='customer' on event.id

ERROR: "KingMaker — Errors"  errorTrigger → Set(summarize wf/node/error/idempotencyKey) → Slack DLQ.  Bind on every workflow.
WATCHDOG: Schedule Trigger sweep → DataTable rows status='claimed' older than ~20m with empty demoUrl → DLQ alert (#1 residual net).
```

---

## 3. THE ONE DATA CONTRACT (`contractVersion:"2.0"`)

**(i) Lead-form → intake webhook** (fields under `$json.body`, normalized with optional chaining):
`businessName, niche(one of 9 slugs), email, phone, city, state, consentSms(bool)`. `idempotencyKey` = `email.toLowerCase().trim()`.

**(ii) Worker → Rebrand Runner request** (HTTP POST jsonBody) — **FLAT lead; the agent generates the spec:**
```jsonc
{ "contractVersion":"2.0", "idempotencyKey":"owner@biz.com", "niche":"hvac", "slug":"hvac",
  "business":{ "name":"Bunn's Heating & Air", "phone":"(919) 555-0142", "email":"owner@biz.com",
               "city":"Louisburg", "state":"NC" },
  "brandHint": { "primaryColor":"#0B2A4A" },          // optional, if the form/enrichment supplies one
  "callbackUrl":"{{ $execution.resumeUrl }}",          // minted at the Wait; same-execution (auto-correct)
  "allowOpus": false }                                  // n8n-controlled escalation gate
```
The runner (metered Claude) GENERATES palette(hex+RGB triplets)/identity(BUSINESS,BRANDS,LOCATIONS,FAQ)/
geography(GEOGRAPHY)/copy(content-*)/images, APPLIES the 5-step rebrand, GATES on tsc+build+playwright(axe 0/0),
DEPLOYS to Vercel `/preview/<slug>`, then calls back.

**(iii) Runner → callback** (POST to resumeUrl; signed; read as `$json.body?.x`):
```jsonc
// SUCCESS
{ "contractVersion":"2.0", "idempotencyKey":"owner@biz.com", "status":"deployed",
  "demoUrl":"https://contractor-template-preview.vercel.app/preview/hvac", "commitSha":"a1b2c3d",
  "model":"claude-sonnet-4-6", "usage":{"inputTokens":18432,"outputTokens":9210}, "costUsd":0.193,
  "verify":{"tsc":true,"build":true,"playwright":true} }
// FAILURE (runner MUST always post a terminal status)
{ "contractVersion":"2.0", "idempotencyKey":"owner@biz.com",
  "status":"verify_failed", // | deploy_failed | build_failed | input_invalid
  "error":"axe-core: 2 serious on /preview/hvac", "model":"claude-sonnet-4-6", "costUsd":0.055 }
```
Signature headers: `X-KM-Signature: sha256=<hex>` over `idempotencyKey.status.demoUrl.commitSha.timestamp` (secret `KM_CALLBACK_HMAC_SECRET`), `X-KM-Timestamp:<unix>`.

---

## 4–6. NODES / SECURITY / ERROR
Node-by-node params, the 3 verifier Code-node bodies (resume HMAC-SHA256, Twilio HMAC-SHA1, SendGrid ECDSA-P256),
the cost-gate + HEAD-probe code, and the error/watchdog flows are captured verbatim-ready in the 4-agent workflow
output (run `wbzgoo2j3`). Key invariants:
- All 3 verifiers are **Code v2** (`runOnceForEachItem`), Node `crypto`, `timingSafeEqual` w/ length guard, `rawBody` read as **base64** (`Buffer.from($json.rawBody,'base64')`), **fail closed** if rawBody missing.
- Twilio public URL rebuilt from `Config.webhookBase` (NOT host header) — needs `N8N_PROXY_HOPS=1`.
- `$env.*` in Code nodes depends on `N8N_BLOCK_ENV_ACCESS_IN_NODE` — if blocked on self-host, read secrets via credential instead.

## 7. VERIFIED n8n PARAM FACTS (live MCP, edition-independent schemas)
- `respondToWebhook` v1.5 `options.enableStreaming` exists, **default TRUE** → set `false`. `responseCode` default 200 → set 202.
- `webhook` v2.1 `options.rawBody` exists (false→true). `responseMode` ∈ onReceived|lastNode|responseNode|streaming.
- `httpRequest` v4.4 `method:'HEAD'` selectable; status via **`options.response.response.fullResponse:true`** (double-nested) + `neverError:true`; `options.timeout` default 10000.
- `twilio` v1 sms/send has **NO `MessagingServiceSid`** (literal `from` only) → A2P 10DLC requires Twilio **REST via httpRequest** (`predefinedCredentialType` + `nodeCredentialType:'twilioApi'`).
- `$vars` = **runtime var, NOT a schema param; Enterprise-only → unavailable on Community.** Use the Config Set node.
- Connected instance is the **Cloud trial** (`jspells.app.n8n.cloud`; 1 workflow, 0 datatables, 0 creds) — NOT the target self-host.

## 8. COST MODEL
`costUsd = inputTokens/1e6*RATE_IN[model] + outputTokens/1e6*RATE_OUT[model]` (rates passed as runner config, not hardcoded — they drift).
Default `claude-sonnet-4-6`; escalate to `claude-opus-4-7` ONLY if `allowOpus:true` AND runner heuristic trips; log `escalated:true`+`model`.
Hard ceiling: deterministic IF `costUsd < Config.costCeilingUsd` (e.g. 0.75) before delivery; over → `status='cost_exceeded'` → DLQ. Runner also carries an internal token/iteration budget.

## 9. GO-LIVE VERIFICATION (self-host ONLY — none trustworthy on the Cloud trial)
1. 202 returns <1s AND the execution continues past Respond (check log).  2. A parked Wait survives `docker compose restart` AND `down && up` (persistent Postgres volume) and resumes on resumeUrl POST.  3. `resumeUrl` minted at Wait resumes THIS execution; callback read from `$json.body`.  4. `EXECUTIONS_TIMEOUT=-1` (or ≥ wait+headroom) — a full 15m Wait isn't killed / no infinite-loop (#15123).  5. `limitWaitTime` timeout branch fires loudly → deploy_failed → DLQ.  6. `$vars` truly gone → Config Set node used.  7. `enableStreaming:false` = clean 202 behind Caddy; `WEBHOOK_URL` public so resumeUrl isn't localhost.  8. Duplicate webhook during the 15m Wait short-circuits to 202, no second rebrand.  9. Watchdog flags stuck `claimed` rows.  + verify each signature Code node against a real provider payload (rawBody population, Twilio URL exactness, `$env` access).

## 10. OPEN DECISIONS (need the operator/architect before BUILD)
- **D1 — Substrate.** Build/validate/create against (a) the connected **Cloud trial** as a staging proxy (then migrate), or (b) a real **self-host Community** instance (share its MCP endpoint + token)? `validate_workflow` works either way; `create_workflow_from_code` lands wherever connected; breakers #1/#6 only truly verify on self-host.
- **D2 — Contract nesting.** Confirm **flat-lead-in, agent-generates-spec** (v2 choice, per the brief) vs n8n pre-assembling `rebrandSpec{}` (one verifying agent argued for determinism). v2 picks flat; flag for architect sign-off since it shapes the runner's job.
```
