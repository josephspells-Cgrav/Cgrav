# Funnel Handoff Prompts — ready to paste

The two one-block handoff prompts produced by the n8n-funnel research, plus the end-to-end funnel design they implement. Hand the relevant block to the executor agent.


---

## King Maker Lead-to-Demo Funnel — Complete n8n Node-by-Node Design

> End-to-end production spec for the King Maker funnel: lead webhook → enrich → branch → async metered Claude rebrand (Wait/resumeUrl) → Twilio SMS + SendGrid email delivery → CRM log, with the async-timeout solution, idempotency claim, and compliance gates named at the node level. Includes the two self-contained executor handoff prompts.

# King Maker Lead-to-Demo Funnel — Complete n8n Design (node-by-node)

**Architect deliverable.** This is the validated black-box design. I (the Specialist) author + `validate_workflow` the SDK code; the **n8n executor agent** runs `create_workflow_from_code`/`publish_workflow` against the live instance, and the **deployment/rebrand agent** implements the rebrand+deploy service that consumes `callbackUrl` and POSTs back. I never mutate the live instance.

---

## 0. Architecture decision: WHY two workflows (the async/timeout solution)

A King Maker rebrand = a multi-minute Sonnet job (edit 5 config surfaces) + a Vercel preview build. That is **far past any HTTP webhook's ~30s gateway ceiling** (Cloudflare/nginx kills the socket). So the single most load-bearing decision:

> **Never let the inbound lead-form HTTP connection wait on the rebrand.** Ack the form in <1s, run the rebrand on a decoupled worker, and let the worker **resume itself on a Wait-by-webhook callback** when the deploy goes live.

Concretely this is **two workflows** wired by `Execute Sub-workflow` with `waitForSubWorkflow:false` (fire-and-forget). The async boundary is **never bridged through a blocking parent** — that path historically returns pre-Wait data to the parent and only waits for the first Wait node (n8n#13135). The worker owns its own `Wait` + delivery.

```
WORKFLOW A — INTAKE (sub-second, synchronous to the form)
  Webhook(responseNode) → Normalize(Set) → Idempotency Claim(DataTable rowNotExists)
       → [new?] Execute Workflow B (waitForSubWorkflow:false) → Respond 202
       → [dup?] Respond 202 (no-op, already building)

WORKFLOW B — REBRAND WORKER (minutes-long, decoupled)
  ExecWfTrigger → Enrich(HTTP) → Consent/Quality Gate(IF)
       → Switch(niche → 1 of 9 specs) → Build Rebrand Spec(Code)
       → HTTP POST rebrand+deploy service (passes $execution.resumeUrl)   ⟵ hands off job
       → Wait(resume:'webhook', limitWaitTime 15m)                         ⟵ parks, no socket held
       → [callback?]  DataTable update status='deployed'+demoUrl
                      → SendGrid email  ┐ (fan-out, each onError:continue)
                      → IF consent → Twilio-via-HTTP SMS  ┤
                      → DataTable update channel statuses  ┘
       → [timeout?]   DataTable update status='deploy_failed' → Stop and Error (→ Error WF)

WORKFLOW C — ERROR HANDLER (bound as project Error Workflow)
  Error Trigger → Set(summarize) → Slack DLQ alert

(Status-callback + Stripe legs are documented in §9–§10; they are separate small workflows.)
```

**Why this shape wins:** the form/CRM caller gets an instant "we're building your demo" 202; the metered Claude spend is protected by an idempotency claim made **before** any work; a hung deploy fails the lead loudly instead of parking forever or SMSing an empty URL; one dead delivery channel (SMS pending 10DLC) never blocks the others.

---

## WORKFLOW A — INTAKE

### A1 · Webhook — "Lead Form Intake"
- `type` `n8n-nodes-base.webhook` · **v2.1**
- Params: `httpMethod:'POST'` · `path:'km-lead'` · `responseMode:'responseNode'` *(MANDATORY — without it the Respond node is silently inert and the form hangs on the default onReceived ack)* · `authentication:'none'` (the public lead form posts cross-origin; lock with `options.allowedOrigins` to the Vercel preview origin, optional `options.ignoreBots:true`)
- **Output:** `{ headers, params, query, body, webhookUrl, executionMode }` — lead fields land under `$json.body` (but some clients put them on `$json` directly → normalize next).

### A2 · Set — "Normalize Lead" (`mode:'manual'`)
- `type` `n8n-nodes-base.set` · **v3.4** · `executeOnce:true`
- **The #1 defect-preventer.** Every field read with optional-chaining + default so nothing downstream reads `undefined`. Assignments (`parameters.assignments.assignments[]`, each with explicit `type`):

  | name | value (expr) | type |
  |---|---|---|
  | `businessName` | `{{ $json.body?.businessName ?? $json.businessName ?? "Your Business" }}` | string |
  | `niche` | `{{ ($json.body?.niche ?? $json.niche ?? "").toString().toLowerCase().trim() }}` | string |
  | `email` | `{{ $json.body?.email ?? $json.email ?? "" }}` | string |
  | `phone` | `{{ $json.body?.phone ?? $json.phone ?? "" }}` | string |
  | `city` | `{{ $json.body?.city ?? $json.city ?? "" }}` | string |
  | `state` | `{{ $json.body?.state ?? $json.state ?? "" }}` | string |
  | `consentSms` | `{{ ($json.body?.consentSms ?? $json.consentSms) === true }}` | boolean |
  | `idempotencyKey` | `{{ ($json.body?.email ?? $json.email ?? "").toLowerCase().trim() }}` | string |
  | `leadReceivedAt` | `{{ $now.toISO() }}` | string |

- `includeOtherFields:false` (drop raw headers/PII from the carried item).
- **Carry the key across every later boundary** via node reference `{{ $('Normalize Lead').item.json.idempotencyKey }}` — `$json` does NOT survive IF/Switch/Merge/Wait fan-in.

### A3 · Data table — "Claim Lead" (idempotency, **claim BEFORE work**)
- `type` `n8n-nodes-base.dataTable` · **v1.1** · `resource:'row'` · `operation:'upsert'`
- `dataTableId:{ __rl:true, mode:'name', value:'km_leads' }`
- `matchType:'allConditions'` · `filters.conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue: {{ $('Normalize Lead').item.json.idempotencyKey }} }]`
- `columns` (ResourceMapper, `mappingMode:'defineBelow'`, **`matchingColumns:['idempotencyKey']`** — upsert REQUIRES a matching column): `idempotencyKey, businessName, niche, email, phone, city, state, consentSms, status:'claimed', demoUrl:'', leadReceivedAt`. **Never seed a custom `id`** — the row id auto-generates.
- **Why upsert not insert:** a re-fired webhook for the same email matches the existing row and updates it in place instead of spawning a duplicate claim. To branch new-vs-dup, prefer the explicit two-step: `operation:'rowExists'` (filter on key) → IF; if new, insert + proceed; if exists, short-circuit to Respond 202. (Upsert alone is the compact path; the rowExists→IF path is the auditable one — executor picks per preference. Either way the claim happens here, before B is fired.)

### A4 · IF — "Is New Lead?"  *(only on the rowExists path)*
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'strict'}, conditions:[{ leftValue: {{ $json.rowExists }}, operator:{type:'boolean', operation:'false'} }] }`
- `.onTrue` → A5 (fire worker). `.onFalse` → A6 directly (already building; do not re-fire — protects metered spend + prevents double-text).

### A5 · Execute Sub-workflow — "Fire Rebrand Worker" (fire-and-forget)
- `type` `n8n-nodes-base.executeWorkflow` · **v1.3**
- `source:'database'` · `workflowId:{ __rl:true, mode:'list', value:'<WF_B_ID>' }`
- `mode:'each'` · **`options.waitForSubWorkflow:false`** ← the decoupling switch; A returns immediately, B runs minutes independently.
- `workflowInputs` (ResourceMapper → B's typed `executeWorkflowTrigger` contract): `idempotencyKey, businessName, niche, email, phone, city, state, consentSms`.

### A6 · Respond to Webhook — "Ack 202"
- `type` `n8n-nodes-base.respondToWebhook` · **v1.5**
- `respondWith:'json'` · `responseBody: { "status":"accepted", "message":"Building your custom demo — you'll get a link by email shortly.", "leadId": {{ $('Normalize Lead').item.json.idempotencyKey }} }` · `options.responseCode:202`
- This is the node that actually frees the form's HTTP socket. Fast 202 is also what Twilio/SendGrid/Stripe inbound webhooks need so they don't retry-storm.

---

## WORKFLOW B — REBRAND WORKER

### B1 · Execute Workflow Trigger — "Worker Start"
- `type` `n8n-nodes-base.executeWorkflowTrigger` · **v1.1**
- `inputSource:'workflowInputs'` — the **typed input contract** (mirrors A5):
  `workflowInputs.values:[ {name:'idempotencyKey',type:'string'}, {name:'businessName',type:'string'}, {name:'niche',type:'string'}, {name:'email',type:'string'}, {name:'phone',type:'string'}, {name:'city',type:'string'}, {name:'state',type:'string'}, {name:'consentSms',type:'boolean'} ]`

### B2 · HTTP Request — "Enrich Lead"
- `type` `n8n-nodes-base.httpRequest` · **v4.4** · `executeOnce:true`
- `method:'GET'` · `url:` Places/Clearbit endpoint with `{{ $json.businessName }}` + `{{ $json.city }}`.
- `authentication:'genericCredentialType'`, `genericAuthType:'httpHeaderAuth'` (or `httpQueryAuth`), `credentials:{ httpHeaderAuth: newCredential('Enrichment') }` — **never inline the key.**
- `options.timeout:15000` · `options.response.neverError:true` (a dead enrichment must not kill the lead — gate next).
- `.onError('continueRegularOutput')` so partial enrichment still proceeds with the form fields.

### B3 · IF — "Consent & Quality Gate"
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'strict'}, conditions:[ { leftValue: {{ $('Worker Start').item.json.email }}, operator:{type:'string', operation:'exists'} }, { leftValue: {{ $('Worker Start').item.json.email }}, operator:{type:'string', operation:'contains'}, rightValue:'@' }, { leftValue: {{ $('Worker Start').item.json.niche }}, operator:{type:'string', operation:'notEmpty'} } ] }`
- `.onTrue` → B4. `.onFalse` → DataTable update `status:'rejected'` → **Stop and Error** (`n8n-nodes-base.stopAndError` v1, `errorType:'errorMessage'`, `errorMessage:'Junk/incomplete lead — no email or niche'`) so the Error WF logs the dropped paid lead. *(Note: TCPA consent is enforced separately at the SMS leg in B9, not here — a no-SMS-consent lead still gets the email demo, so consent must NOT block the whole worker.)*

### B4 · Switch — "Route by Niche"
- `type` `n8n-nodes-base.switch` · **v3.4** · `mode:'rules'`
- `rules.values[]` — one rule per trade, `outputKey` = niche, each a full `conditions` object equals-match on `{{ $('Worker Start').item.json.niche }}`:
  `hvac, plumbing, roofing, electrician, painter, kitchen-remodel, general-contractor, landscaping, hardscape` (indices 0–8).
- `options.fallbackOutput:'extra'` (index 9, `renameFallbackOutput:'Unknown Niche'`) — **without this, unmatched niches are silently DROPPED.** Fallback → DataTable `status:'unknown_niche'` → Stop and Error.
- Each `.onCase(i, …)` flows into B5. (Routing exists to inject the correct per-niche preset id/theme defaults into the spec; the 9 cases converge on the same B5→B6 path with the niche carried.)

### B5 · Code — "Build Rebrand Spec" (legitimate Code-node use: JSON assembly)
- `type` `n8n-nodes-base.code` · **v2** · `mode:'runOnceForEachItem'` · `language:'javaScript'`
- Assembles the **enriched-lead → rebrand contract** keyed to the real template shapes (`BUSINESS`/`BRANDS`/`LOCATIONS`/`FAQ`, `GEOGRAPHY`, `NicheTheme{navy,navyRgb,red,redRgb,redHover,tint}`, `content-*`, image prompts) + derives `slug = niche` and brand hex→RGB-triplet pairs (so the deploy agent never desyncs the `@theme` hex block from the `:root` RGB block — the single most common rebrand defect). Returns one item:
  ```js
  return { json: {
    idempotencyKey: $('Worker Start').item.json.idempotencyKey,
    niche: $('Worker Start').item.json.niche,
    slug:  $('Worker Start').item.json.niche,
    email: $('Worker Start').item.json.email,
    phone: $('Worker Start').item.json.phone,
    businessName: $('Worker Start').item.json.businessName,
    consentSms: $('Worker Start').item.json.consentSms,
    rebrandSpec: { palette:{...hex+rgbTriplets}, identity:{BUSINESS,BRANDS,LOCATIONS,FAQ},
                   geography:{GEOGRAPHY}, copy:{content_*}, images:[...prompts] }
  }};
  ```
- *(Field shaping that Set could do stays in Set; only the procedural spec-assembly lives here — Code is otherwise last-resort.)*

### B6 · HTTP Request — "Invoke Rebrand+Deploy Service" (hands off `resumeUrl`)
- `type` `n8n-nodes-base.httpRequest` · **v4.4** · `executeOnce:true`
- `method:'POST'` · `url:` the deployment agent's runner endpoint (its own webhook).
- `authentication:'genericCredentialType'`, `genericAuthType:'httpBearerAuth'`, `credentials:{ httpBearerAuth: newCredential('RebrandRunner') }`.
- `sendBody:true`, `contentType:'json'`, `specifyBody:'json'`, `jsonBody`:
  ```
  {
    "idempotencyKey": "{{ $json.idempotencyKey }}",
    "niche": "{{ $json.niche }}",
    "slug": "{{ $json.slug }}",
    "rebrandSpec": {{ JSON.stringify($json.rebrandSpec) }},
    "callbackUrl": "{{ $execution.resumeUrl }}"
  }
  ```
- **`$execution.resumeUrl` is generated only when the Wait node (B7) is reached at runtime — it cannot be precomputed.** It is handed to the service IN THIS SAME CALL; the service POSTs the result back to it on deploy-live. The body must carry `idempotencyKey` so the runner is itself idempotent and a re-fired job never double-deploys.
- `options.timeout:20000` — this call only needs to ACK "job queued" (the runner returns 202 fast, then works async). The minutes-long work is absorbed by B7, **not** by raising this timeout. `options.response.neverError:false` (a failed enqueue should error → handled by `.onError` → mark failed).

### B7 · Wait — "Await Deploy Callback" (the async park)
- `type` `n8n-nodes-base.wait` · **v1.1**
- `resume:'webhook'` · `httpMethod:'POST'` · `responseMode:'onReceived'` (ACK the runner's callback instantly).
- **`limitWaitTime:true`, `limitType:'afterTimeInterval'`, `resumeAmount:15`, `resumeUnit:'minutes'`** — bounds the park so a hung deploy fails the lead instead of parking forever. (Keep `EXECUTIONS_TIMEOUT=-1`/large on the worker so the global timeout can't kill the pause mid-wait — see §11.)
- `incomingAuthentication:'none'` (the runner authenticates via the unguessable resumeUrl token; add `basicAuth` if hardening).
- **After resume, the callback payload lands under `$json.body`, NOT bare `$json`.** Read `{{ $json.body?.demoUrl ?? $json.demoUrl }}`, `{{ $json.body?.status ?? $json.status }}`, `{{ $json.body?.commitSha }}`. Carry the idempotency key across the Wait via the node reference `{{ $('Worker Start').item.json.idempotencyKey }}` (NOT `$json`).

### B8 · IF — "Deploy Succeeded?"
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'loose'}, conditions:[ { leftValue: {{ $json.body?.status ?? $json.status }}, operator:{type:'string', operation:'equals'}, rightValue:'deployed' }, { leftValue: {{ $json.body?.demoUrl ?? $json.demoUrl }}, operator:{type:'string', operation:'notEmpty'} } ] }`
- **Two failure modes converge on `.onFalse`:** (a) the runner POSTed back `status:'verify_failed'` (build/tsc/Playwright gate failed — a green build with a failed a11y pass is NOT deployed), or (b) the Wait timed out and resumed with the **pre-Wait item** (no callback body → `demoUrl` empty).
- `.onFalse` → B-fail: DataTable update `status:'deploy_failed'` → Stop and Error (`'Rebrand deploy failed or timed out for '+idempotencyKey`) → Error WF alerts. **Never SMS/email a broken or empty URL.**
- `.onTrue` → B-mark (B8.5) then fan-out.

### B8.5 · Set — "Stage Delivery Payload" (`mode:'manual'`, `executeOnce:true`)
- Pins the values every fan-out branch needs onto one clean item so each side-effect reads stable fields (not the post-IF `$json`):
  `demoUrl = {{ $json.body?.demoUrl ?? $json.demoUrl }}`, `commitSha = {{ $json.body?.commitSha }}`, plus `email/phone/businessName/niche/consentSms/idempotencyKey` via `{{ $('Worker Start').item.json.* }}`.

### Fan-out (independent side-effects; **each `.onError('continueRegularOutput')`** so one channel failing never blocks the rest)

### B9a · SendGrid — "Email Demo Link" (ships first; not gated on 10DLC)
- `type` `n8n-nodes-base.sendGrid` · **v1** · `resource:'mail'` · `operation:'send'` · `executeOnce:true`
- `fromEmail:'demos@kingmaker…'`, `fromName: {{ $json.businessName }}` (niche brand), `toEmail: {{ $json.email }}`, `subject:'Your custom '+niche+' website demo is live'`.
- **`dynamicTemplate:true`, `templateId:'<SG_TEMPLATE_ID>'`** with `dynamicTemplateFields.fields:[{key:'demo_url',value:{{ $json.demoUrl }}}, {key:'business_name',value:{{ $json.businessName }}}]`. **CAN-SPAM physical mailing address + working unsubscribe live STATICALLY in the SendGrid template footer** — outside the agent's generation surface, so a per-lead body can never omit them. (If not using a template: `contentType:'text/html'`, `contentValue` REQUIRED, and the footer must be inlined.)
- `credentials:{ sendGridApi: newCredential('SendGrid') }` · Output `{messageId}`.

### B9b · IF — "SMS Consent + 10DLC Live?" → HTTP Request — "Send SMS (Twilio REST)"
- IF (`n8n-nodes-base.if` v2.3): `conditions` AND → `{{ $json.consentSms }}` boolean `true` **AND** a config flag `{{ $vars.tenDlcApproved }}` boolean `true`. **TCPA requires prior express written consent**, captured as an unchecked-by-default checkbox on the lead form and stored in CRM; no consent ⇒ no SMS, enforced here in config — never inferred by the agent. (10DLC campaign vetting is ~10–15 days; ship email first and feature-flag SMS on at approval — do not promise same-day SMS.)
- `.onTrue` → **HTTP Request** `n8n-nodes-base.httpRequest` v4.4 (NOT the Twilio node) · `executeOnce:true`:
  - **Why HTTP not the Twilio node:** the n8n Twilio v1 node exposes only a literal `from` number — **no `MessagingServiceSid` field** (verified against the live schema). Compliant A2P 10DLC sending at scale REQUIRES the Messaging Service, so we drop to Twilio's REST API.
  - `method:'POST'` · `url:'https://api.twilio.com/2010-04-01/Accounts/{{ $vars.twilioAccountSid }}/Messages.json'`
  - `authentication:'predefinedCredentialType'`, `nodeCredentialType:'twilioApi'` (reuse the Twilio credential — account SID/auth token).
  - `contentType:'form-urlencoded'`, `bodyParameters`: `MessagingServiceSid={{ $vars.twilioMessagingServiceSid }}` (the registered 10DLC campaign sender — bare numbers get carrier-filtered) · `To={{ $json.phone }}` · `Body='Your custom '+businessName+' site is ready: '+{{ $json.demoUrl }}` · `StatusCallback={{ $vars.webhookBase }}/twilio-status`.
  - Twilio's send response status is `queued`/`accepted` — **NOT proof of delivery.** Do not log "delivered" off this node (see §9 status webhook).

### B10 · Data table — "Log Delivery" (CRM row finalize)
- `type` `n8n-nodes-base.dataTable` · **v1.1** · `resource:'row'` · `operation:'upsert'` · `executeOnce:true`
- `dataTableId:{ __rl:true, mode:'name', value:'km_leads' }` · `matchType:'allConditions'` · `filters.conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue:{{ $json.idempotencyKey }} }]` · **`columns.matchingColumns:['idempotencyKey']`**.
- Columns: `status:'delivered'`, `demoUrl`, `commitSha`, `emailMessageId:{{ $('Email Demo Link').item.json.messageId }}`, `smsSid:{{ $('Send SMS (Twilio REST)').item.json.sid }}`, `smsStatus:'queued'`, `deliveredAt:{{ $now.toISO() }}`.

---

## WORKFLOW C — ERROR HANDLER (bound as the project **Error Workflow**)
- **C1 Error Trigger** `n8n-nodes-base.errorTrigger` v1 (no params; receives `{execution, workflow, error}` on ANY failure of bound workflows — including the Stop-and-Error fails above).
- **C2 Set** — summarize: workflow name, failed node, `error.message`, `execution.id`, and the lead `idempotencyKey` if present.
- **C3 Slack** — post to a **DLQ channel** so no paid/metered lead silently drops. (Slack node `n8n-nodes-base.slack`, or HTTP to a webhook.) Bind C as Error Workflow on A **and** B in each workflow's Settings.

---

## 9. Inbound: Twilio Status Callback (closes the SMS delivery loop)
Separate tiny workflow: **Webhook** v2.1 (`POST`, `path:'twilio-status'`, `responseMode:'responseNode'`, `options.rawBody:true`) → **Respond 200 fast** (Twilio retries on slow/non-2xx) → **Data table upsert** on `smsSid = {{ $json.body.MessageSid }}` setting `smsStatus = {{ $json.body.MessageStatus }}` (delivered/undelivered/failed). Idempotent on `MessageSid` (at-least-once redelivery). This is the ONLY authoritative "SMS delivered" signal.

## 10. Inbound: Stripe payment gate (lead → paying customer)
Separate workflow: **Stripe Trigger** `n8n-nodes-base.stripeTrigger` v1, `events:['checkout.session.completed']`, **`apiVersion` PINNED** (empty = account default = silent payload drift), `credentials:{stripeApi:newCredential('Stripe')}`. The Trigger **registers + verifies the signature internally** — do NOT hand-roll HMAC on the Stripe *action* node (it's outbound-only, no signature params). Idempotent on `event.id`. → Data table upsert flips `status:'customer'`. For any outbound Stripe REST charge needing idempotency, call the REST API via HTTP Request and set the `Idempotency-Key` header yourself (keyed on lead/execution id) — it is not a node param.

---

## 11. Cross-cutting locks (non-negotiable, encoded at design time)

| Concern | Lock |
|---|---|
| **Async/timeout** | Inbound Webhook `responseMode:'responseNode'` + early **202**; rebrand on decoupled Workflow B; `HTTP→Wait(resume:'webhook', $execution.resumeUrl)`; `limitWaitTime` 15m. Never `responseMode:'lastNode'` on inbound (holds socket → 30s gateway timeout). Never bridge the Wait through a `waitForSubWorkflow:true` parent (n8n#13135). |
| **Idempotency** | DataTable claim on `idempotencyKey` (lead email) **before** firing B; runner gets the same key so it never double-deploys; all inbound webhooks (Twilio MessageSid, Stripe event.id, SendGrid sg_event_id) dedup on their provider id. |
| **`$json` after boundaries** | After IF/Switch/Merge/Wait, `$json` = "current item" only. Reference lead via `{{ $('Worker Start').item.json.field }}` / `{{ $('Normalize Lead').item.json.field }}`. Wait callback body is `$json.body?.x ?? $json.x`. |
| **Item multiplication** | Rebrand + each delivery node `executeOnce:true` (or fed exactly one normalized item) — otherwise N× rebrand / N× SMS the prospect. |
| **Fan-out resilience** | Email / SMS / CRM each `.onError('continueRegularOutput')` — SMS pending 10DLC must not block email + CRM. |
| **Credentials** | `newCredential('Name')` only; Anthropic/Vercel/RebrandRunner/Enrichment via `httpBearerAuth`/`httpHeaderAuth`; Twilio reuse `twilioApi` (predefined) for the REST send; SendGrid `sendGridApi`; Stripe `stripeApi`. Never inline a key in header/body/query params. **The live n8n has zero credentials — the human populates every `newCredential(...)` out-of-band before first run.** |
| **Compliance is config, never the LLM** | TCPA consent flag gates B9b; A2P 10DLC via Messaging Service SID over REST; CAN-SPAM address+unsubscribe in the static SendGrid template footer; Stripe signature+idempotency in the Trigger. The agent rebrands pixels; the spine enforces law. |
| **Deploy substrate** | One pinned self-host container `docker.n8n.io/n8nio/n8n:<pinned>` + Postgres + Caddy TLS, `EXECUTIONS_MODE=regular`, `WEBHOOK_URL` = public HTTPS (callback/resume URLs embed it; localhost breaks Twilio/Vercel callbacks), `N8N_PROXY_HOPS=1`, `EXECUTIONS_TIMEOUT=-1` (so a 15m Wait isn't killed), pruning tightened (`EXECUTIONS_DATA_MAX_AGE` low — PII/TCPA blast radius), `N8N_ENCRYPTION_KEY` pinned + backed up off-box. |
| **Specialist boundary** | Author + `validate_workflow` only. Hand the validated one-block code to the executor agents; never call `create/update/publish_workflow` against the live instance. |

---

## 12. Validated SDK skeleton (Workflow A + B spine — the executor's starting code)

> Author with `@n8n/workflow-sdk`; this captures the load-bearing wiring (responseNode→202, fire-and-forget, HTTP→Wait→resumeUrl, fan-out with onError). The executor fills credential names, the DataTable `km_leads` schema, the niche Switch rules (9 + fallback), SendGrid template id, and Twilio REST vars, then re-runs `validate_workflow` before `create_workflow_from_code`.

```javascript
import { workflow, node, trigger, ifElse, switchCase, newCredential, expr } from '@n8n/workflow-sdk';

/* ===== WORKFLOW A — INTAKE ===== */
const aWebhook = trigger({ type:'n8n-nodes-base.webhook', version:2.1, config:{ name:'Lead Form Intake',
  parameters:{ httpMethod:'POST', path:'km-lead', responseMode:'responseNode', authentication:'none',
    options:{ ignoreBots:true } } } });

const aNormalize = node({ type:'n8n-nodes-base.set', version:3.4, config:{ name:'Normalize Lead', executeOnce:true,
  parameters:{ mode:'manual', includeOtherFields:false, assignments:{ assignments:[
    { id:'biz', name:'businessName', value:expr('{{ $json.body?.businessName ?? $json.businessName ?? "Your Business" }}'), type:'string' },
    { id:'nic', name:'niche', value:expr('{{ ($json.body?.niche ?? $json.niche ?? "").toString().toLowerCase().trim() }}'), type:'string' },
    { id:'eml', name:'email', value:expr('{{ $json.body?.email ?? $json.email ?? "" }}'), type:'string' },
    { id:'phn', name:'phone', value:expr('{{ $json.body?.phone ?? $json.phone ?? "" }}'), type:'string' },
    { id:'cty', name:'city', value:expr('{{ $json.body?.city ?? $json.city ?? "" }}'), type:'string' },
    { id:'sta', name:'state', value:expr('{{ $json.body?.state ?? $json.state ?? "" }}'), type:'string' },
    { id:'con', name:'consentSms', value:expr('{{ ($json.body?.consentSms ?? $json.consentSms) === true }}'), type:'boolean' },
    { id:'idk', name:'idempotencyKey', value:expr('{{ ($json.body?.email ?? $json.email ?? "").toLowerCase().trim() }}'), type:'string' },
    { id:'rcv', name:'leadReceivedAt', value:expr('{{ $now.toISO() }}'), type:'string' } ] } } } });

const aClaim = node({ type:'n8n-nodes-base.dataTable', version:1.1, config:{ name:'Claim Lead', executeOnce:true,
  parameters:{ resource:'row', operation:'upsert',
    dataTableId:{ __rl:true, mode:'name', value:'km_leads' },
    matchType:'allConditions',
    filters:{ conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue:expr("{{ $('Normalize Lead').item.json.idempotencyKey }}") }] },
    columns:{ mappingMode:'defineBelow', matchingColumns:['idempotencyKey'], value:{
      idempotencyKey: expr("{{ $('Normalize Lead').item.json.idempotencyKey }}"),
      businessName: expr("{{ $('Normalize Lead').item.json.businessName }}"),
      niche: expr("{{ $('Normalize Lead').item.json.niche }}"),
      email: expr("{{ $('Normalize Lead').item.json.email }}"),
      phone: expr("{{ $('Normalize Lead').item.json.phone }}"),
      city: expr("{{ $('Normalize Lead').item.json.city }}"),
      consentSms: expr("{{ $('Normalize Lead').item.json.consentSms }}"),
      status:'claimed', demoUrl:'',
      leadReceivedAt: expr("{{ $('Normalize Lead').item.json.leadReceivedAt }}") } } } } });

const aFireWorker = node({ type:'n8n-nodes-base.executeWorkflow', version:1.3, config:{ name:'Fire Rebrand Worker',
  parameters:{ source:'database', mode:'each',
    workflowId:{ __rl:true, mode:'list', value:'WF_B_ID' },
    workflowInputs:{ mappingMode:'defineBelow', value:{
      idempotencyKey: expr("{{ $('Normalize Lead').item.json.idempotencyKey }}"),
      businessName: expr("{{ $('Normalize Lead').item.json.businessName }}"),
      niche: expr("{{ $('Normalize Lead').item.json.niche }}"),
      email: expr("{{ $('Normalize Lead').item.json.email }}"),
      phone: expr("{{ $('Normalize Lead').item.json.phone }}"),
      city: expr("{{ $('Normalize Lead').item.json.city }}"),
      state: expr("{{ $('Normalize Lead').item.json.state }}"),
      consentSms: expr("{{ $('Normalize Lead').item.json.consentSms }}") } },
    options:{ waitForSubWorkflow:false } } } });   // <-- decoupling switch

const aRespond = node({ type:'n8n-nodes-base.respondToWebhook', version:1.5, config:{ name:'Ack 202',
  parameters:{ respondWith:'json',
    responseBody: expr('{ "status":"accepted", "leadId":"{{ $(\'Normalize Lead\').item.json.idempotencyKey }}" }'),
    options:{ responseCode:202 } } } });

export const intake = workflow('km-intake','King Maker — Lead Intake')
  .add(aWebhook).to(aNormalize).to(aClaim).to(aFireWorker).to(aRespond);

/* ===== WORKFLOW B — REBRAND WORKER (spine) ===== */
const bStart = trigger({ type:'n8n-nodes-base.executeWorkflowTrigger', version:1.1, config:{ name:'Worker Start',
  parameters:{ inputSource:'workflowInputs', workflowInputs:{ values:[
    { name:'idempotencyKey', type:'string' }, { name:'businessName', type:'string' },
    { name:'niche', type:'string' }, { name:'email', type:'string' }, { name:'phone', type:'string' },
    { name:'city', type:'string' }, { name:'state', type:'string' }, { name:'consentSms', type:'boolean' } ] } } } });

const bEnrich = node({ type:'n8n-nodes-base.httpRequest', version:4.4, config:{ name:'Enrich Lead', executeOnce:true,
  onError:'continueRegularOutput',
  parameters:{ method:'GET', url:expr('https://api.example-enrich.com/v1/lookup?q={{ $json.businessName }}&city={{ $json.city }}'),
    authentication:'genericCredentialType', genericAuthType:'httpHeaderAuth',
    options:{ timeout:15000, response:{ response:{ neverError:true } } } },
  credentials:{ httpHeaderAuth: newCredential('Enrichment') } } });

const bGate = ifElse({ version:2.3, config:{ name:'Consent & Quality Gate',
  parameters:{ conditions:{ combinator:'and', options:{ caseSensitive:true, typeValidation:'strict' }, conditions:[
    { leftValue: expr("{{ $('Worker Start').item.json.email }}"), operator:{ type:'string', operation:'exists' } },
    { leftValue: expr("{{ $('Worker Start').item.json.email }}"), operator:{ type:'string', operation:'contains' }, rightValue:'@' },
    { leftValue: expr("{{ $('Worker Start').item.json.niche }}"), operator:{ type:'string', operation:'notEmpty' } } ] } } } });

const bRouteByNiche = switchCase({ version:3.4, config:{ name:'Route by Niche',
  parameters:{ mode:'rules', options:{ fallbackOutput:'extra', renameFallbackOutput:'Unknown Niche' },
    rules:{ values:[
      'hvac','plumbing','roofing','electrician','painter','kitchen-remodel','general-contractor','landscaping','hardscape'
    ].map(n => ({ outputKey:n, conditions:{ combinator:'and', options:{ caseSensitive:true, typeValidation:'strict' },
      conditions:[{ leftValue: expr("{{ $('Worker Start').item.json.niche }}"), operator:{ type:'string', operation:'equals' }, rightValue:n }] } })) } } } });

const bBuildSpec = node({ type:'n8n-nodes-base.code', version:2, config:{ name:'Build Rebrand Spec',
  parameters:{ mode:'runOnceForEachItem', language:'javaScript', jsCode:
`const w = $('Worker Start').item.json;
return { json: {
  idempotencyKey: w.idempotencyKey, niche: w.niche, slug: w.niche,
  email: w.email, phone: w.phone, businessName: w.businessName, consentSms: w.consentSms,
  rebrandSpec: { palette:{}, identity:{}, geography:{}, copy:{}, images:[] }  // assemble hex+RGB triplets, BUSINESS/BRANDS/LOCATIONS/FAQ, GEOGRAPHY, content-*, image prompts
}};` } } });

const bInvoke = node({ type:'n8n-nodes-base.httpRequest', version:4.4, config:{ name:'Invoke Rebrand+Deploy Service',
  executeOnce:true, onError:'continueRegularOutput',
  parameters:{ method:'POST', url:'https://rebrand-runner.example.com/deploy',
    authentication:'genericCredentialType', genericAuthType:'httpBearerAuth',
    sendBody:true, contentType:'json', specifyBody:'json',
    jsonBody: expr('{ "idempotencyKey":"{{ $json.idempotencyKey }}", "niche":"{{ $json.niche }}", "slug":"{{ $json.slug }}", "rebrandSpec": {{ JSON.stringify($json.rebrandSpec) }}, "callbackUrl":"{{ $execution.resumeUrl }}" }'),
    options:{ timeout:20000 } },
  credentials:{ httpBearerAuth: newCredential('RebrandRunner') } } });

const bWait = node({ type:'n8n-nodes-base.wait', version:1.1, config:{ name:'Await Deploy Callback',
  parameters:{ resume:'webhook', httpMethod:'POST', responseMode:'onReceived', incomingAuthentication:'none',
    limitWaitTime:true, limitType:'afterTimeInterval', resumeAmount:15, resumeUnit:'minutes' } } });

const bDeployOk = ifElse({ version:2.3, config:{ name:'Deploy Succeeded?',
  parameters:{ conditions:{ combinator:'and', options:{ caseSensitive:true, typeValidation:'loose' }, conditions:[
    { leftValue: expr('{{ $json.body?.status ?? $json.status }}'), operator:{ type:'string', operation:'equals' }, rightValue:'deployed' },
    { leftValue: expr('{{ $json.body?.demoUrl ?? $json.demoUrl }}'), operator:{ type:'string', operation:'notEmpty' } ] } } } });

const bStage = node({ type:'n8n-nodes-base.set', version:3.4, config:{ name:'Stage Delivery Payload', executeOnce:true,
  parameters:{ mode:'manual', includeOtherFields:false, assignments:{ assignments:[
    { id:'url', name:'demoUrl', value:expr('{{ $json.body?.demoUrl ?? $json.demoUrl }}'), type:'string' },
    { id:'sha', name:'commitSha', value:expr('{{ $json.body?.commitSha ?? $json.commitSha }}'), type:'string' },
    { id:'eml', name:'email', value:expr("{{ $('Worker Start').item.json.email }}"), type:'string' },
    { id:'phn', name:'phone', value:expr("{{ $('Worker Start').item.json.phone }}"), type:'string' },
    { id:'biz', name:'businessName', value:expr("{{ $('Worker Start').item.json.businessName }}"), type:'string' },
    { id:'nic', name:'niche', value:expr("{{ $('Worker Start').item.json.niche }}"), type:'string' },
    { id:'con', name:'consentSms', value:expr("{{ $('Worker Start').item.json.consentSms }}"), type:'boolean' },
    { id:'idk', name:'idempotencyKey', value:expr("{{ $('Worker Start').item.json.idempotencyKey }}"), type:'string' } ] } } } });

const bEmail = node({ type:'n8n-nodes-base.sendGrid', version:1, config:{ name:'Email Demo Link', executeOnce:true,
  onError:'continueRegularOutput',
  parameters:{ resource:'mail', operation:'send', dynamicTemplate:true,
    fromEmail:'demos@kingmaker.example', fromName: expr('{{ $json.businessName }}'),
    toEmail: expr('{{ $json.email }}'), templateId:'SG_TEMPLATE_ID',
    dynamicTemplateFields:{ fields:[
      { key:'demo_url', value: expr('{{ $json.demoUrl }}') },
      { key:'business_name', value: expr('{{ $json.businessName }}') } ] } },
  credentials:{ sendGridApi: newCredential('SendGrid') } } });

const bSmsGate = ifElse({ version:2.3, config:{ name:'SMS Consent + 10DLC Live?',
  parameters:{ conditions:{ combinator:'and', options:{ caseSensitive:true, typeValidation:'strict' }, conditions:[
    { leftValue: expr('{{ $json.consentSms }}'), operator:{ type:'boolean', operation:'true' } },
    { leftValue: expr('{{ $vars.tenDlcApproved }}'), operator:{ type:'boolean', operation:'true' } } ] } } } });

const bSms = node({ type:'n8n-nodes-base.httpRequest', version:4.4, config:{ name:'Send SMS (Twilio REST)',
  executeOnce:true, onError:'continueRegularOutput',
  parameters:{ method:'POST',
    url: expr('https://api.twilio.com/2010-04-01/Accounts/{{ $vars.twilioAccountSid }}/Messages.json'),
    authentication:'predefinedCredentialType', nodeCredentialType:'twilioApi',
    sendBody:true, contentType:'form-urlencoded', specifyBody:'keypair',
    bodyParameters:{ parameters:[
      { name:'MessagingServiceSid', value: expr('{{ $vars.twilioMessagingServiceSid }}') },
      { name:'To', value: expr('{{ $json.phone }}') },
      { name:'Body', value: expr('Your custom {{ $json.businessName }} site is ready: {{ $json.demoUrl }}') },
      { name:'StatusCallback', value: expr('{{ $vars.webhookBase }}/twilio-status') } ] } } } });

const bLog = node({ type:'n8n-nodes-base.dataTable', version:1.1, config:{ name:'Log Delivery', executeOnce:true,
  onError:'continueRegularOutput',
  parameters:{ resource:'row', operation:'upsert',
    dataTableId:{ __rl:true, mode:'name', value:'km_leads' }, matchType:'allConditions',
    filters:{ conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue: expr('{{ $json.idempotencyKey }}') }] },
    columns:{ mappingMode:'defineBelow', matchingColumns:['idempotencyKey'], value:{
      idempotencyKey: expr('{{ $json.idempotencyKey }}'), status:'delivered',
      demoUrl: expr('{{ $json.demoUrl }}'), commitSha: expr('{{ $json.commitSha }}'),
      deliveredAt: expr('{{ $now.toISO() }}') } } } } });

const bFail = node({ type:'n8n-nodes-base.stopAndError', version:1, config:{ name:'Mark Lead Failed',
  parameters:{ errorType:'errorMessage',
    errorMessage: expr("Rebrand deploy failed/timed out for {{ $('Worker Start').item.json.idempotencyKey }}") } } });

export const worker = workflow('km-rebrand-worker','King Maker — Rebrand Worker')
  .add(bStart).to(bEnrich).to(bGate.onTrue(
    bRouteByNiche
      .onCase(0, bBuildSpec).onCase(1, bBuildSpec).onCase(2, bBuildSpec)
      .onCase(3, bBuildSpec).onCase(4, bBuildSpec).onCase(5, bBuildSpec)
      .onCase(6, bBuildSpec).onCase(7, bBuildSpec).onCase(8, bBuildSpec)
  ).onFalse(bFail));
// then: bBuildSpec.to(bInvoke).to(bWait).to(bDeployOk.onTrue(bStage)...).onFalse(bFail)
//   bStage fan-out: .to(bEmail) ; .to(bSmsGate.onTrue(bSms)) ; .to(bLog)
// (executor: converge the 9 onCase targets on a single bBuildSpec instance, then chain the tail once)
```

> **Executor note on the Switch convergence:** in the SDK, route all 9 `.onCase(i, …)` to the *same* `bBuildSpec` node so the tail (`Invoke → Wait → Deploy? → Stage → fan-out`) is authored once. Re-run `validate_workflow`; expect to reconcile the 9-case convergence and the `$vars` references against your instance config before `create_workflow_from_code`.

---

## 13. The two executor handoff prompts (self-contained, fenced)

### 13a. → n8n executor agent

```
ROLE: n8n executor. Build, validate, and publish the King Maker lead-to-demo funnel on the live n8n instance from the design below. Do NOT redesign — implement exactly. Run validate_workflow until clean BEFORE create_workflow_from_code. The instance has ZERO credentials; create each newCredential(...) reference as a placeholder credential and tell the operator which secrets to populate out-of-band.

BUILD ORDER:
1. Data table `km_leads` (create_data_table) with columns: idempotencyKey(string, the match key), businessName, niche, email, phone, city, state(string), consentSms(boolean), status(string), demoUrl(string), commitSha(string), emailMessageId(string), smsSid(string), smsStatus(string), leadReceivedAt(string), deliveredAt(string). Do NOT add a custom id column (auto-generated).
2. WORKFLOW B "King Maker — Rebrand Worker" FIRST (A references B's id):
   - executeWorkflowTrigger v1.1 typed inputs: idempotencyKey,businessName,niche,email,phone,city,state(string), consentSms(boolean).
   - httpRequest v4.4 "Enrich Lead" (executeOnce, onError:continueRegularOutput, genericCredentialType+httpHeaderAuth=newCredential('Enrichment'), timeout 15000, response.neverError true).
   - if v2.3 "Consent & Quality Gate": email exists AND email contains '@' AND niche notEmpty. onFalse → stopAndError 'Junk/incomplete lead'.
   - switch v3.4 mode:rules "Route by Niche": 9 equals-rules on niche (hvac,plumbing,roofing,electrician,painter,kitchen-remodel,general-contractor,landscaping,hardscape) + options.fallbackOutput:'extra' renameFallbackOutput:'Unknown Niche'. Fallback → stopAndError. Converge all 9 cases on ONE "Build Rebrand Spec".
   - code v2 runOnceForEachItem "Build Rebrand Spec": assemble rebrandSpec{palette(hex+RGB triplets),identity(BUSINESS/BRANDS/LOCATIONS/FAQ),geography(GEOGRAPHY),copy(content-*),images} + slug=niche, carry idempotencyKey/email/phone/businessName/consentSms.
   - httpRequest v4.4 "Invoke Rebrand+Deploy Service" (executeOnce, onError:continueRegularOutput, genericCredentialType+httpBearerAuth=newCredential('RebrandRunner'), POST json body INCLUDING "callbackUrl":"{{ $execution.resumeUrl }}" and "idempotencyKey", timeout 20000). The runner returns 202 fast and POSTs back on deploy-live.
   - wait v1.1 "Await Deploy Callback": resume:'webhook', httpMethod:POST, responseMode:onReceived, limitWaitTime:true, limitType:afterTimeInterval, resumeAmount:15, resumeUnit:minutes.
   - if v2.3 "Deploy Succeeded?": ($json.body?.status ?? $json.status)=='deployed' AND ($json.body?.demoUrl ?? $json.demoUrl) notEmpty. onFalse → dataTable upsert status='deploy_failed' → stopAndError. onTrue → set "Stage Delivery Payload".
   - set v3.4 "Stage Delivery Payload": demoUrl/commitSha from $json.body?.x ?? $json.x; email/phone/businessName/niche/consentSms/idempotencyKey from {{ $('Worker Start').item.json.* }}.
   - FAN-OUT from Stage, each onError:continueRegularOutput + executeOnce:
       (a) sendGrid v1 mail/send "Email Demo Link": dynamicTemplate true, templateId placeholder, fromName={{businessName}}, toEmail={{email}}, fields demo_url/business_name. CAN-SPAM address+unsubscribe live in the SendGrid template footer (out of band).
       (b) if v2.3 "SMS Consent + 10DLC Live?": consentSms==true AND $vars.tenDlcApproved==true → httpRequest v4.4 "Send SMS (Twilio REST)" (predefinedCredentialType nodeCredentialType:'twilioApi', POST .../Accounts/{{$vars.twilioAccountSid}}/Messages.json, form-urlencoded body MessagingServiceSid={{$vars.twilioMessagingServiceSid}},To,Body with demoUrl,StatusCallback). The n8n Twilio node CANNOT use a Messaging Service — REST is required for A2P 10DLC.
       (c) dataTable v1.1 upsert "Log Delivery": match idempotencyKey, status='delivered', demoUrl, commitSha, deliveredAt.
3. WORKFLOW A "King Maker — Lead Intake":
   - webhook v2.1 "Lead Form Intake": POST, path 'km-lead', responseMode:'responseNode' (MANDATORY), authentication none, options.ignoreBots true, allowedOrigins=preview origin.
   - set v3.4 "Normalize Lead" (executeOnce): all fields with optional-chaining defaults per design; idempotencyKey=lowercased email; consentSms boolean.
   - dataTable v1.1 "Claim Lead": upsert match idempotencyKey (matchingColumns:['idempotencyKey']), status='claimed'. (Claim BEFORE firing B.)
   - executeWorkflow v1.3 "Fire Rebrand Worker": workflowId=WORKFLOW B id, mode:'each', options.waitForSubWorkflow:FALSE, workflowInputs mapped from Normalize Lead.
   - respondToWebhook v1.5 "Ack 202": respondWith json, responseCode 202.
4. WORKFLOW C "King Maker — Errors": errorTrigger v1 → set (summarize wf/node/error/idempotencyKey) → Slack DLQ. Bind C as the Error Workflow in BOTH A and B settings.
5. Two small inbound workflows: Twilio status (webhook POST 'twilio-status', rawBody true, respond 200 fast, dataTable upsert smsStatus on MessageSid) and Stripe (stripeTrigger 'checkout.session.completed', apiVersion PINNED, dataTable upsert status='customer' on event.id).

INSTANCE/ENV: self-host docker.n8n.io/n8nio/n8n:<pinned> + Postgres + Caddy TLS; EXECUTIONS_MODE=regular; WEBHOOK_URL=public HTTPS base; N8N_PROXY_HOPS=1; EXECUTIONS_TIMEOUT=-1 (so the 15m Wait isn't killed); tighten EXECUTIONS_DATA_MAX_AGE; pin+back up N8N_ENCRYPTION_KEY. Define n8n variables: tenDlcApproved(bool), twilioAccountSid, twilioMessagingServiceSid, webhookBase.

VERIFY: validate_workflow clean on A,B,C; test_workflow B with prepare_test_pin_data simulating (i) a 'deployed' callback (expect email + CRM 'delivered'), (ii) a Wait timeout (expect 'deploy_failed' + Error WF), (iii) a duplicate intake (expect no second worker fire). Report execution ids. Do NOT promise same-day SMS — 10DLC vetting ~10–15 days; ship email first, flag SMS on at approval.
```

### 13b. → deployment / rebrand agent

```
ROLE: King Maker rebrand+deploy runner. You are a metered Claude executor (Sonnet claude-sonnet-4-6 DEFAULT; escalate to Opus claude-opus-4-8 ONLY if copy quality demands — verify the model ID string against api.anthropic.com at build time, the bundled list lags). Expose an HTTP endpoint that n8n's "Invoke Rebrand+Deploy Service" POSTs to.

INPUT CONTRACT (request body): { idempotencyKey, niche (one of hvac/plumbing/roofing/electrician/painter/kitchen-remodel/general-contractor/landscaping/hardscape), slug, rebrandSpec{palette{hex + RGB triplets}, identity{BUSINESS,BRANDS,LOCATIONS,FAQ}, geography{GEOGRAPHY}, copy{content-*}, images[]}, callbackUrl }.

PROTOCOL:
1. Return HTTP 202 IMMEDIATELY (ack the enqueue; do the work async). Dedup on idempotencyKey — if a deploy for this key is already in flight or done, return the existing result and do NOT start a second rebrand or deploy a second Vercel preview.
2. Rebrand the Next.js template editing EXACTLY 5 surfaces, NEVER components/:
   (1) app/globals.css — BOTH the @theme hex block (--color-navy/red/red-hover/tint) AND the :root RGB-triplet block (--color-navy-rgb/red-rgb). The triplet MUST equal the hex in decimal RGB or the ~130 inline rgba() glows desync from the Tailwind utilities — the single most common silent defect.
   (2) lib/data.ts — BUSINESS/BRANDS/LOCATIONS/LOCATION_CONTENT/FAQ.
   (3) lib/site.config.ts — GEOGRAPHY block.
   (4) lib/content-*.ts — section copy.
   (5) /public — hero, /public/brand-logos/, gallery, location photos.
   Routing is by /preview/<slug> (lib/preview-niche.ts); do not touch motion primitives in components/motion/.
3. GATE status on ALL THREE passing: `pnpm -C web exec tsc --noEmit`; `pnpm -C web build`; `pnpm exec playwright test --project=desktop` (axe 0 critical / 0 serious). A green build with a failed a11y pass is verify_failed, NOT deployed. Keep rendered home height 6000–8000px.
4. Deploy a Vercel preview → contractor-template-preview.vercel.app/preview/<slug>. Vercel token via bearer credential, never inline.
5. POST the result BACK to callbackUrl (it is an n8n Wait resume URL, single-use, generated at job handoff):
     SUCCESS → { "status":"deployed", "demoUrl":"https://contractor-template-preview.vercel.app/preview/<slug>", "commitSha":"<sha>", "idempotencyKey":"<key>" }
     FAILURE → { "status":"verify_failed" | "deploy_failed", "error":"<reason>", "idempotencyKey":"<key>" }
   n8n reads the body as {{ $json.body?.demoUrl ?? $json.demoUrl }} and only SMS/emails the prospect when status=='deployed' AND demoUrl is non-empty. If you never call back, n8n's 15-minute Wait times out and marks the lead deploy_failed — so ALWAYS post a terminal status, success or failure.

COST METERING: read usage.input_tokens/usage.output_tokens off the Anthropic response and return them (or log per idempotencyKey) for cost-per-lead accounting. You rebrand pixels only; n8n enforces all compliance (TCPA/10DLC consent, CAN-SPAM footer, Stripe signature/idempotency) — never make a legal/consent call in generated content.
```



---

## n8n Executor Handoff: King Maker Lead-to-Demo Funnel (Build Prompt)

> A single ready-to-paste one-block prompt the architect hands to the n8n executor agent to BUILD the King Maker rebrand funnel in n8n — self-contained with exact nodes, params, connections, the decoupled async pattern, credentials, webhook setup, MCP build order, validation, and a hard STOP for human review before publishing.

```text
ROLE
You are the n8n executor agent. Build the "King Maker" contractor-website lead-to-demo funnel in n8n using the n8n Workflow SDK (@n8n/workflow-sdk) via the n8n MCP server. Author and VALIDATE everything; CREATE the workflows in DRAFT (unpublished) state; then STOP for human review. You do NOT publish, you do NOT execute against live, and you do NOT populate secrets — the human does that out-of-band after review.

================================================================
0) HARD BOUNDARIES (read first, non-negotiable)
================================================================
- BUILD ORDER IS MANDATORY, IN THIS EXACT SEQUENCE, for EVERY workflow you author:
    (1) get_sdk_reference  -> call with section "all" once, then "guidelines" and "design" for rules.
    (2) get_suggested_nodes -> categories: ["form_input","notification","data_persistence","content_generation","data_transformation","triage"].
    (3) search_nodes        -> for every service/utility node below; record the resource/operation/mode discriminators it returns.
    (4) get_node_types      -> pass ALL node IDs WITH their discriminators + versions. DO NOT guess param names. This step is not skippable.
    (5) write               -> author the SDK code using ONLY the exact param names from step 4.
    (6) validate_workflow   -> run on the full code; fix every error; re-validate until 0 errors. Do this PER workflow AND on the combined export.
    (7) create_workflow_from_code -> create EACH workflow in DRAFT/unpublished state, with a 1-2 sentence description.
  Then STOP. Do NOT call publish_workflow / unpublish_workflow toggled-to-live, update_workflow against a published flow, or execute_workflow / test_workflow against the user's live instance. Wait for explicit human "approved to publish".
- CREDENTIALS: reference every secret ONLY via newCredential('Name'). NEVER hardcode keys; NEVER invent IDs like 'mock-*'. NEVER put a key in headerParameters/queryParameters/bodyParameters. The live n8n has ZERO credentials — each newCredential() is net-new and the human fills it later, so the flows will validate but fail at runtime until secrets exist. That is expected; note it in your handoff-back summary.
- CODE NODE IS LAST RESORT. Prefer Set / IF / Switch / Filter. Use Code only for: rebrand-spec JSON assembly, slug computation, Stripe HMAC verify + constant-time compare + tolerance, and idempotency-key shaping.
- DO NOT block any inbound webhook on the multi-minute Claude rebrand. Ack fast, run the heavy work on a decoupled worker, resume via Wait(webhook). Details below.

================================================================
1) WHAT YOU ARE BUILDING (three workflows)
================================================================
Architecture is the decoupled async pattern (per n8n issue #13135: never bridge a Wait(webhook) through a parent that waits on it). Build THREE separate workflows:

  A) "KingMaker — Intake"        : lead webhook -> normalize -> idempotency claim -> fire worker fire-and-forget -> 202 ack.
  B) "KingMaker — Rebrand Worker": triggered by A -> enrich -> route by niche -> assemble rebrand spec -> POST rebrand/deploy service (passing resumeUrl) -> Wait(webhook) -> on callback fan out SMS + email + CRM log.
  C) "KingMaker — Error DLQ"     : ErrorTrigger -> Slack alert. Bind as the project Error Workflow (note this for the human; binding is a settings action).

A Stripe Trigger leg (monetization) is authored as a SMALL 4th flow OR appended to C's project — see section 6.

================================================================
2) WORKFLOW A — "KingMaker — Intake"
================================================================
Nodes (id, version, key params):

A1. Webhook  (n8n-nodes-base.webhook, v2.1)  -> trigger()
    - httpMethod: "POST"
    - path: "km-lead"
    - authentication: "none"   (form posts publicly; consent is enforced downstream, not at the edge)
    - responseMode: "responseNode"   <-- CRITICAL. Without this the Respond node is INERT and the form hangs.
    - options.allowedOrigins: "https://contractor-template-preview.vercel.app" (lock CORS to the form origin)
    - options.ignoreBots: true
    Output nests POST fields under $json.body (but test pin-data / some clients put them on $json directly).

A2. Set  (n8n-nodes-base.set, v3.4)  "Normalize Lead"
    - mode: "manual"   <-- required discriminator, or validation fails.
    - assignments.assignments[] (each needs id + name + value + type), use optional chaining + defaults on EVERY field:
        name         (string) : {{ $json.body?.name ?? $json.name ?? "there" }}
        email        (string) : {{ ($json.body?.email ?? $json.email ?? "").toLowerCase().trim() }}
        phone        (string) : {{ $json.body?.phone ?? $json.phone ?? "" }}
        businessName (string) : {{ $json.body?.businessName ?? $json.businessName ?? "" }}
        niche        (string) : {{ ($json.body?.niche ?? $json.niche ?? "").toLowerCase() }}   // one of 9 trades
        city         (string) : {{ $json.body?.city ?? $json.city ?? "" }}
        consent      (boolean): {{ ($json.body?.consent ?? $json.consent) === true }}           // TCPA opt-in
        idempotencyKey (string): {{ ($json.body?.email ?? $json.email ?? "").toLowerCase().trim() }}  // email as the lead dedup key
    - includeOtherFields: false
    This Set is the #1 defense against "undefined" downstream. Reference the lead later as $('Normalize Lead').item.json.<field> or nodeJson('Normalize Lead','<field>') — NOT bare $json after any branch/merge.

A3. Data Table  (n8n-nodes-base.dataTable, v1.1)  "Claim Idempotency"  resource:'row'
    - FIRST: instruct the human to create a Data Table named "leads" with columns:
        idempotencyKey(string), email(string), name(string), phone(string), businessName(string),
        niche(string), city(string), consent(boolean), status(string), demoUrl(string),
        commitSha(string), channelSms(string), channelEmail(string), messageSid(string), createdAt(string)
      (Row id auto-generates — DO NOT define a custom id column.) Use create_data_table / add_data_table_column to scaffold it, OR document it for the human if you cannot mutate.
    - operation: "upsert"
    - dataTableId: { __rl: true, mode: "name", value: "leads" }  // __rl resource-locator — never a plain string
    - matchType: "allConditions"
    - filters.conditions[]: [{ keyName: "idempotencyKey", condition: "eq", keyValue: expr("{{ $('Normalize Lead').item.json.idempotencyKey }}") }]
    - columns (ResourceMapperValue, mappingMode:"defineBelow"): map idempotencyKey, email, name, phone, businessName, niche, city, consent, and status="claimed", createdAt={{ $now.toISO() }}.  matchingColumns: ["idempotencyKey"].
    Claim BEFORE firing the worker so a retried webhook never spawns a second rebrand.

A4. Execute Workflow  (n8n-nodes-base.executeWorkflow, v1.3)  "Fire Rebrand Worker"
    - source: "database"
    - workflowId: { __rl: true, mode: "list", value: placeholder("KingMaker — Rebrand Worker workflow id") }
    - mode: "once"
    - options.waitForSubWorkflow: FALSE   <-- fire-and-forget; A must NOT wait on B's Wait node.
    - workflowInputs (ResourceMapper): pass the full normalized lead object (all A2 fields incl idempotencyKey).

A5. Respond to Webhook  (n8n-nodes-base.respondToWebhook, v1.5)  "Ack 202"
    - respondWith: "json"
    - responseBody: {{ { "status": "accepted", "message": "Building your custom demo — you'll get a link by text and email shortly." } }}
    - options.responseCode: 202
    Connection note: A5 can run right after A3/A4 — the point is the HTTP client gets 202 fast while B runs decoupled.

Connections (A):  A1 -> A2 -> A3 -> A4 -> A5.

================================================================
3) WORKFLOW B — "KingMaker — Rebrand Worker"
================================================================
Nodes:

B0. Execute Workflow Trigger  (n8n-nodes-base.executeWorkflowTrigger, v1.1)  -> trigger()
    - inputSource: "workflowInputs"
    - workflowInputs.values[]: typed contract — name(string), email(string), phone(string), businessName(string),
      niche(string), city(string), consent(boolean), idempotencyKey(string). This is B's typed input contract.

B1. (optional) HTTP Request  (n8n-nodes-base.httpRequest, v4.4)  "Enrich Lead"
    - method: "GET", url: places/clearbit endpoint (placeholder)
    - authentication: "genericCredentialType", genericAuthType: "httpHeaderAuth" or "httpQueryAuth", credentials:{ httpHeaderAuth: newCredential('Enrichment') }
    - options.response.neverError: true  (enrichment failure must not kill the lead)
    - options.timeout: 15000
    - executeOnce: true

B2. Switch  (n8n-nodes-base.switch, v3.4)  "Route by Niche"   mode:'rules'
    - rules.values[] (NOT rules.rules[]): one rule per trade -> hvac, plumbing, roofing, electrician, painter, kitchen-remodel, general-contractor, landscaping, hardscape (compare {{ $('KingMaker — Rebrand Worker').item.json.niche }} equals each).  Set renameOutput + outputKey per branch.
    - options.fallbackOutput: "extra"   <-- REQUIRED to create a catch-all port for unknown niches; default "none" silently DROPS them. Wire the fallback to a Set that defaults niche to a safe trade (e.g. "general-contractor") then merges back to B3.
    For build simplicity you MAY collapse B2 into a single Set that validates niche against the 9-trade allowlist and defaults unknowns — but keep the explicit fallback handling either way.

B3. Code  (n8n-nodes-base.code, v2)  "Assemble Rebrand Spec"   mode:'runOnceForEachItem', language:'javaScript'
    - Build the enriched-lead -> 5-STEP rebrand spec JSON the deploy agent consumes. Output one item:
        {
          idempotencyKey, niche, businessName, city, email, phone,
          palette: { navyHex, redHex, redHoverHex, tintHex, navyRgb, redRgb },   // RGB triplet MUST be hex-as-decimal (globals.css @theme + :root sync)
          identity: { BUSINESS, BRANDS, LOCATIONS, FAQ },                         // -> lib/data.ts
          geography: { GEOGRAPHY },                                               // -> lib/site.config.ts
          content: { home, core, misc },                                         // -> lib/content-*.ts
          imagePrompts: [ ... ]                                                   // -> /public
        }
      (Procedural assembly is a legit Code use; do NOT shape simple fields here that Set can do.)

B4. HTTP Request  (n8n-nodes-base.httpRequest, v4.4)  "Invoke Rebrand+Deploy Service"
    - method: "POST"
    - url: placeholder("rebrand/deploy worker service URL")
    - authentication: "genericCredentialType", genericAuthType: "httpBearerAuth", credentials:{ httpBearerAuth: newCredential('RebrandService') }
    - sendBody: true, contentType: "json", specifyBody: "json"
    - jsonBody: the B3 spec PLUS  "callbackUrl": "{{ $execution.resumeUrl }}"  and  "idempotencyKey": "{{ $('KingMaker — Rebrand Worker').item.json.idempotencyKey }}".
        NOTE: $execution.resumeUrl exists only once the Wait node (B5) is reached at runtime — you cannot precompute it. It is valid to reference it in B4's body because the engine resolves the pair; the service receives it and calls it back. (If your runtime ordering complains, place a no-op Wait-arming pattern; standard pattern is HTTP-then-Wait with resumeUrl in the HTTP body — this is the documented bridge.)
    - options.timeout: 120000 (defensive; the real wait is the Wait node, not this call)
    - executeOnce: true
    - .onError('continueErrorOutput') -> wire error path to B-FAIL (mark status='invoke_failed' in Data Table, then stopAndError to trip the DLQ).
    SECURITY: Anthropic / Vercel / RebrandService tokens are ALL httpBearerAuth via newCredential — never inline.

B5. Wait  (n8n-nodes-base.wait, v1.1)  "Await Deploy Callback"
    - resume: "webhook"
    - httpMethod: "POST"
    - limitWaitTime: true, limitType: "afterTimeInterval", resumeAmount: 15, resumeUnit: "minutes"   <-- bound the park so a hung deploy fails the lead instead of parking forever.
    After resume, the callback payload lands under $json.body — NOT bare $json. Read:
        demoUrl  : {{ $json.body?.demoUrl  ?? $json.demoUrl }}
        status   : {{ $json.body?.status   ?? $json.status }}
        commitSha: {{ $json.body?.commitSha ?? $json.commitSha }}
    Carry the lead across the Wait boundary via {{ $('KingMaker — Rebrand Worker').item.json.<field> }}, never bare $json.

B6. IF  (n8n-nodes-base.if, v2.3)  "Deploy Succeeded?"
    - conditions.combinator: "and", options.typeValidation: "strict"
    - conditions[]:
        { leftValue: {{ $json.body?.status ?? $json.status }}, operator:{type:"string",operation:"equals"}, rightValue:"deployed" }
      (A green build with failed a11y is verify_failed, NOT deployed — the service is responsible for only sending status:"deployed" when tsc+build+Playwright all pass.)
    - .onFalse() -> B-FAIL: Data Table update status={{ failed status }}, then stopAndError("deploy not successful") to trip DLQ. Do NOT SMS/email a broken URL.
    - .onTrue() -> the delivery fan-out (B7/B8/B9). Each delivery node uses .onError('continueRegularOutput') so one dead channel doesn't block the others.

  CONSENT GATE before SMS:
B6c. IF  (n8n-nodes-base.if, v2.3)  "SMS Consent?"  (on the .onTrue branch, feeding only the SMS node)
    - conditions[]: { leftValue: {{ $('KingMaker — Rebrand Worker').item.json.consent }}, operator:{type:"boolean",operation:"true"} }
    - .onFalse() -> skip SMS (email + CRM still run). No consent = no SMS, enforced here, never inferred.

B7. SMS delivery — TWO options; AUTHOR THE HTTP PATH for A2P 10DLC compliance:
    PREFERRED (Messaging Service / 10DLC): HTTP Request (n8n-nodes-base.httpRequest, v4.4)
      - method:"POST", url:"https://api.twilio.com/2010-04-01/Accounts/{{AccountSid}}/Messages.json"
      - authentication:"predefinedCredentialType", nodeCredentialType:"twilioApi", credentials:{ twilioApi: newCredential('Twilio') }
      - contentType:"form-urlencoded", bodyParameters: MessagingServiceSid={{registered 10DLC Messaging Service SID}}, To={{ $('KingMaker — Rebrand Worker').item.json.phone }}, Body="Your custom {{niche}} site demo is ready: {{ $json.body?.demoUrl ?? $json.demoUrl }}", StatusCallback={{ public WEBHOOK_URL }}/twilio-status
      - executeOnce:true, .onError('continueRegularOutput')
      RATIONALE: the n8n Twilio node has NO MessagingServiceSid field; a bare `from` number outside a registered Messaging Service gets carrier-filtered as unregistered A2P traffic. The HTTP path is the only compliant way.
    FALLBACK (non-prod / before 10DLC approval): Twilio node (n8n-nodes-base.twilio, v1) resource:'sms', operation:'send', from=<registered number>, to, toWhatsapp:false, message, options.statusCallback. credentials:{ twilioApi: newCredential('Twilio') }.
    NOTE: send output status is 'queued'/'accepted' — NOT delivery proof. Do not log 'delivered' off the send; real delivery arrives on the StatusCallback webhook (section 6).
    SEQUENCING: 10DLC brand+campaign vetting is ~10-15 days. FEATURE-FLAG the SMS branch OFF (disabled node) so email + deploy ship first; enable SMS after approval. Do NOT promise same-day SMS.

B8. SendGrid  (n8n-nodes-base.sendGrid, v1)  resource:'mail', operation:'send'  "Email Demo Link"
    - fromEmail, fromName (the niche brand), toEmail: {{ $('KingMaker — Rebrand Worker').item.json.email }}
    - subject: "Your custom {{businessName}} website is live"
    - contentType: "text/html"
    - contentValue: REQUIRED — HTML body containing the demo link {{ $json.body?.demoUrl ?? $json.demoUrl }}.
    - CAN-SPAM: physical mailing address + working unsubscribe MUST be present. Lock these into a SendGrid DYNAMIC TEMPLATE footer (dynamicTemplate:true + templateId + dynamicTemplateFields) OUTSIDE any per-lead generation, so the rebrand agent can never omit them. additionalFields.replyToEmail set.
    - credentials:{ sendGridApi: newCredential('SendGrid') }
    - executeOnce:true, .onError('continueRegularOutput')
    Optionally also do resource:'contact', operation:'upsert' to push the lead into the SendGrid contact list (CRM mirror).

B9. Data Table  (n8n-nodes-base.dataTable, v1.1)  "Log Delivery"  resource:'row', operation:'upsert'
    - dataTableId: { __rl:true, mode:"name", value:"leads" }, matchType:"allConditions",
      filters.conditions[]: [{ keyName:"idempotencyKey", condition:"eq", keyValue: expr("{{ $('KingMaker — Rebrand Worker').item.json.idempotencyKey }}") }]
    - columns: update status="delivered", demoUrl, commitSha, channelEmail="sent", channelSms (set if SMS ran), messageSid (from B7 if available). matchingColumns:["idempotencyKey"].
    (If you prefer HubSpot as CRM instead of Data Table: n8n-nodes-base.hubspot v2.2, resource:'contact', operation:'upsert', email REQUIRED, additionalFields{firstName,lastName,phoneNumber,companyName,city,leadStatus}, credentials hubspotApi|hubspotAppToken|hubspotOAuth2Api. Default to Data Table — no external config.)

Connections (B):
  B0 -> B1 -> B2 -> B3 -> B4 -> B5 -> B6
  B6 .onTrue -> [ B6c(.onTrue -> B7), B8, B9 ]   (fan-out from the SAME normalized item; B6c gates SMS only)
  B6 .onFalse -> B-FAIL(Data Table status update) -> stopAndError
  B4 .onError('continueErrorOutput') -> B-FAIL
  Merge/branch indices are 0-based — if you wire a Merge, .input(0) is the FIRST input; do not start at 1 or you silently drop a branch.

================================================================
4) WORKFLOW C — "KingMaker — Error DLQ"
================================================================
C1. Error Trigger  (n8n-nodes-base.errorTrigger, v1)  -> trigger()  (no params; receives execution/workflow/error context)
C2. Slack  -> send to a #km-dlq channel with the failed workflow name, execution id, error message, and the lead idempotencyKey if present.
    (Use the Slack node or an HTTP Request to a Slack webhook URL via newCredential('Slack'). Search/get_node_types for the Slack node first.)
HUMAN ACTION (note in handoff-back): bind "KingMaker — Error DLQ" as the project's Error Workflow in each flow's Settings, so any failed execution of A or B alerts the DLQ and no paid lead silently drops.

================================================================
5) ITEM-MULTIPLICATION + EXPRESSION RULES (apply throughout)
================================================================
- If any upstream node emits N items, a chained side-effect runs N times (N×M). The rebrand invoke (B4) and EACH delivery node must be executeOnce:true OR fed exactly one normalized lead item — otherwise you rebrand/SMS/email the prospect N times.
- alwaysOutputData:true is a FOOTGUN — it injects a synthetic {json:{}} causing undefined reads / GET undefined / Code crashes. Do NOT set it unless paired with a dedicated empty-case IF branch.
- $json means ONLY "current incoming item" and BREAKS after IF/Switch/Merge fan-in and inside AI-agent subnodes. Always reference the lead via $('Normalize Lead').item.json.<field> or nodeJson('<node>','<path>').
- All document/table/sheet selectors are __rl resource-locators — never a plain string or expr() wrapper.
- Upsert nodes (Data Table / Sheets / Airtable / HubSpot) REQUIRE matchingColumns in the resourceMapper or they throw at runtime. If no natural key, switch to 'append'/'insert'.

================================================================
6) OPTIONAL/PARALLEL — Stripe monetization + delivery-receipt webhooks
================================================================
These close the loop; author them but keep them in DRAFT and feature-flagged.

6a. Stripe Trigger  (n8n-nodes-base.stripeTrigger, v1)  -> trigger()
    - events: ["checkout.session.completed"]   (+ optionally invoice.paid, customer.subscription.deleted)
    - apiVersion: PIN IT explicitly (empty = account default can silently change payload shape).
    - credentials:{ stripeApi: newCredential('Stripe') }   (registers + verifies the webhook signature internally — do NOT try to verify Stripe-Signature on the Stripe ACTION node; it has no webhook params.)
    -> Data Table upsert: flip the lead row status to "customer". Idempotency: key on Stripe event.id checked against the table (Stripe redelivers at-least-once).
    If you ever ingest Stripe via a raw Webhook instead: options.rawBody:true is mandatory (HMAC is over exact raw bytes), then verify in a Code node with crypto action:'hmac', type:'SHA256', signed payload `${t}.${rawBody}`, 300s tolerance, constant-time compare. Prefer the Stripe Trigger to avoid this.

6b. Twilio Status Callback  Webhook  (n8n-nodes-base.webhook, v2.1)
    - httpMethod:"POST", path:"twilio-status", authentication:"none" (Twilio signs its own payload), options.rawBody:true, responseMode:"onReceived"
    -> Data Table upsert: update messageSid + channelSms = MessageStatus (delivered/undelivered/failed). Respond 200 FAST (respondToWebhook responseCode 200) or Twilio retries.
6c. SendGrid Event Webhook  Webhook  (n8n-nodes-base.webhook, v2.1)
    - httpMethod:"POST", path:"sendgrid-events", options.rawBody:true (ECDSA verification needs raw bytes), respond 200 fast.
    -> Data Table upsert: channelEmail = event (delivered/open/click/bounce/dropped/spamreport/unsubscribe).

================================================================
7) DEPLOYMENT/ENV NOTES TO PASS BACK TO THE HUMAN (do not act on these)
================================================================
- Runtime substrate: ONE pinned self-hosted container docker.io path docker.n8n.io/n8nio/n8n:<pinned tag> + Postgres + Caddy TLS on a $6-12/mo VPS, EXECUTIONS_MODE=regular (NOT queue). Cloud Pro ($50/mo) only if no server ops.
- MUST set WEBHOOK_URL (public HTTPS base) + N8N_PROXY_HOPS=1 behind the proxy, or registered webhook + Wait resumeUrl + Twilio/Stripe callback URLs embed the wrong host and fail silently.
- MUST set N8N_ENCRYPTION_KEY explicitly (and back it up off-box) or a volume loss = total credential loss. N8N_SECURE_COOKIE stays true (terminate TLS; don't disable the cookie).
- Keep EXECUTIONS_TIMEOUT=-1 (or large) for the worker so a 15-min Wait isn't hard-killed; still set the Wait's limitWaitTime as the real bound. Tighten EXECUTIONS_DATA_MAX_AGE / SAVE_ON_SUCCESS to shrink PII blast radius (TCPA/CAN-SPAM).
- Data Table "leads" must exist before first run (section 3, A3). Net-new credentials to create: Anthropic (httpBearerAuth), RebrandService (httpBearerAuth), Twilio (twilioApi), SendGrid (sendGridApi), Stripe (stripeApi), Enrichment (httpHeaderAuth), Slack. Plus a registered A2P 10DLC Messaging Service SID and a SendGrid-authenticated domain + dynamic template with CAN-SPAM footer.

================================================================
8) DELIVERABLE BACK TO ME (the architect)
================================================================
After you finish:
  - Confirm each of the three (+ optional Stripe/receipt) workflows passed validate_workflow with 0 errors (paste the validation result).
  - Confirm they were created via create_workflow_from_code in DRAFT/unpublished state, with their workflow IDs.
  - List every newCredential('Name') reference and the Data Table you scaffolded/flagged.
  - Then STOP and explicitly request human review before any publish. Do NOT publish, do NOT run against live. The human-review gate is mandatory.
```


---

## King Maker Rebrand+Deploy Agent — One-Block Handoff Prompt (n8n-consumable)

> A single, ready-to-paste prompt the architect hands to the deployment/rebrand executor agent. Given one enriched-lead JSON envelope, it performs the King Maker 5-step rebrand on an isolated per-lead branch (palette / identity / geography / copy / images — never touching components/), runs the tsc + build + Playwright gate stack, deploys a Vercel preview, and POSTs a strict machine-parseable JSON envelope back to the n8n Wait-resume callbackUrl so the funnel can consume demoUrl + status without re-derivation. Input contract and output contract are both pinned to the real template field shapes (BUSINESS, GEOGRAPHY, NicheTheme) verified in the cranky-colden-ebfbb4 worktree.

## What this is

The one-block prompt below is the deployment/rebrand executor's entire instruction set. It is self-contained: paste it as the agent's task with the `INPUT` envelope substituted (n8n fills `INPUT` from the enriched lead + `$execution.resumeUrl`). The agent does the rebrand + Vercel deploy, then POSTs the `OUTPUT` envelope back to `callbackUrl` — the same URL the n8n Wait(resume:'webhook') node is parked on.

Two contract facts the architect must honor when wiring n8n to this prompt:
- **`callbackUrl` is `{{ $execution.resumeUrl }}`** generated at the Wait node — pass it in the HTTP Request body that launches this agent. It cannot be precomputed.
- **`leadId` is the idempotency key.** n8n claims it in the DataTable (`rowNotExists`/`insert`) BEFORE launching this agent, so a retried lead webhook never spawns a second deploy. This agent treats `leadId` as the branch name and never creates a second preview for the same `leadId`.

Architectural note encoded into the prompt (do not strip it): `/preview/<niche>` is served by ONE Next.js app whose `[niche]` route resolves against a shared static preset registry, and the 5 rebrand surfaces (`globals.css`, `lib/data.ts`, `lib/site.config.ts`, `lib/content-*.ts`, `/public`) are SHARED files. A per-lead rebrand is therefore a **per-lead isolated git branch + its own ephemeral Vercel preview deployment** — never an in-place mutation of the shared live preview app, or two leads in the same niche collide. The branch is named from `leadId`; the deploy is a branch preview; the returned `demoUrl` is that deployment's unique URL.

---

```text
ROLE
You are the King Maker DEPLOYMENT/REBRAND EXECUTOR — a metered Claude agent (this run: Sonnet
claude-sonnet-4-6; escalate to Opus claude-opus-4-8 ONLY if copy quality demands it and the
envelope sets "allowOpus": true). You convert ONE enriched-lead JSON envelope into a live, custom,
clickable Next.js demo by performing the King Maker 5-step rebrand on an ISOLATED per-lead branch,
gating on the 3-tier verify stack, deploying a Vercel preview, and POSTing a strict machine-parseable
result envelope back to the n8n callback URL. You are a black-box executor inside an n8n funnel: you
receive INPUT, you return OUTPUT. Do not ask questions; if INPUT is unusable, return status
"input_invalid" per the OUTPUT contract.

ABSOLUTE NON-NEGOTIABLES (violating any of these = return status "verify_failed", never "deployed")
1. NEVER edit anything under components/. The 9 motion primitives in components/motion/ and every
   cascade/ambient/hover gesture copy at 100% fidelity and must never be regenerated or hand-edited.
   If you are about to change copy or color inside a component, STOP — content has leaked; route it
   back to the lib/ layer. Carrying the flagship motion intact is the entire point of the template.
2. Edit EXACTLY the 5 King Maker config surfaces and nothing else: (1) app/globals.css palette,
   (2) lib/data.ts identity, (3) lib/site.config.ts GEOGRAPHY, (4) lib/content-*.ts copy,
   (5) /public images. (Plus the niche's preset file under lib/presets/<niche>.ts ONLY if the
   envelope changes glyph/voice/theme/nav for that niche — see step R6.)
3. globals.css DESYNC IS THE #1 SILENT DEFECT. The file has TWO independent blocks that MUST stay in
   sync: the @theme block (hex: --color-navy, --color-red, --color-red-hover, --color-tint — drives
   Tailwind utilities bg-red/text-navy) AND the :root block (decimal RGB triplets: --color-navy-rgb,
   --color-red-rgb — drives ~130 inline rgba() glows). Each triplet MUST equal its hex converted to
   decimal RGB, or utilities and glows render in DIFFERENT colors. Convert every hex yourself; never
   leave the AM defaults (#1b3361 -> 27, 51, 97 ; #b02549 -> 176, 37, 73) when palette changes.
4. NEVER claim "deployed" on a build/verify failure. status="deployed" requires tsc + build +
   Playwright (axe-core 0 critical / 0 serious) ALL green AND a reachable Vercel preview URL. A green
   build with a failed a11y pass is status="verify_failed", NOT "deployed".
5. IDEMPOTENCY: leadId is the idempotency key AND the branch name. If a branch/deploy already exists
   for this leadId, do NOT rebuild or redeploy — return the existing demoUrl with status="deployed"
   and "idempotentReplay": true. Never create a second Vercel preview for the same leadId.
6. ISOLATION: never mutate the shared live preview app in place. /preview/<niche> is ONE Next.js app
   resolving [niche] against a shared static preset registry; the 5 surfaces are SHARED files. Do all
   edits on a fresh per-lead git branch cut from the contractor-template base, and deploy THAT branch
   as its own ephemeral Vercel preview. Two leads in the same niche editing the same shared files
   would collide otherwise.
7. SECRETS: the Vercel token arrives via the runner's injected env (VERCEL_TOKEN) — never echo it,
   never write it to a file, never include it in OUTPUT. (n8n holds it as a newCredential bearer; it
   is handed to your runner out-of-band, not in INPUT.)

REPO / TEMPLATE FACTS (ground truth — do not re-derive)
- Template root (base branch "contractor-template"):
  C:\Users\josep\OneDrive\Documents\Claude\Projects\American Master Works Redaux\.claude\worktrees\cranky-colden-ebfbb4\web
  (run all pnpm commands with -C web or from web/). Stack: Next.js + framer-motion + react, pnpm.
- The 9 valid niche slugs (INPUT.niche MUST be one of these — else status="input_invalid"):
  hvac, plumbing, roofing, electrician, painter, kitchen-remodel, general-contractor,
  landscaping, hardscape.
- Routing: app/preview/[niche]/[page] and app/preview/[niche]/serviceDetail/[service]. The niche is
  read off the pathname by lib/preview-niche.ts via regex /^\/preview\/([^/]+)(?:\/|$)/. Preset
  registry: lib/presets/index.ts -> PRESETS_BY_NICHE; getPreset(niche). The canonical demo path for a
  lead is /preview/<niche> on THIS lead's branch-preview deployment.

THE 5 SURFACES — exact edit targets and real field shapes
S1. app/globals.css — palette (TWO synced blocks):
    @theme { --color-navy:<hex>; --color-red:<hex>; --color-red-hover:<hex>; --color-tint:<hex>; ... }
    :root  { --color-navy-rgb:<R, G, B>; --color-red-rgb:<R, G, B>; ... }
    Map INPUT.theme.navy->--color-navy(+navyRgb->--color-navy-rgb), .red->--color-red(+redRgb->
    --color-red-rgb), .redHover->--color-red-hover, .tint->--color-tint. If INPUT supplies hex but
    not the triplet, YOU compute the triplet. Verify each triplet == hex in decimal before saving.
S2. lib/data.ts — BUSINESS (const, real keys, all present in template):
    name, legalName, baseUrl, phone, phoneTel (E.164, e.g. "+12523140185"), email, city, state, zip,
    latitude, longitude, hoursDisplay, hoursShort, hoursSchema{dayOfWeek[],opens,closes},
    experienceFraming, descriptorBase, social{facebook,instagram,x,yelp,googleReview}.
    Also in this file: BRANDS[], LOCATIONS[], LOCATION_CONTENT, FAQ arrays, WINDOW_MATERIALS/
    DOOR_MATERIALS. Replace BUSINESS fields from INPUT.business; map INPUT.brands->BRANDS (keep the
    Brand shape {name,category,description,logoSrc,specialty,trustSignal}); map INPUT.faqs->the FAQ
    array. Keep every key the template declares — do not drop fields (tsc will break).
S3. lib/site.config.ts — GEOGRAPHY (const):
    regionLabel, regionShort, hqCity, state, counties[] (full names), cities[] (display names, HQ
    first; MUST mirror LOCATIONS names), coverageLabel ("N Towns · M Counties"). Map from
    INPUT.geography. CITY_COUNT/COUNTY_COUNT/cityListSentence() derive automatically — don't touch.
S4. lib/content-*.ts — section copy consts:
    content-home.ts (hero, windows/doors teasers, why-us pillars, trust strip, proof-marquee),
    content-core.ts (process steps, reviews, trust tabs, footer-CTA, brands-strip),
    content-misc.ts (service-area + brand-page reinforcement). Rewrite the copy consts from
    INPUT.copy and the niche voice; keep the const NAMES and exported shapes identical (components
    import them by name). Apply INPUT.voice.tone/guidance to the register of the prose.
S5. /public — images: hero, /public/brand-logos/, gallery, location photos. For each key in
    INPUT.images, write the asset to its referenced path (paths are referenced from the config/
    content layer + lib/data-styles.ts). If INPUT.images provides URLs, fetch and save; if it
    provides prompts only and "generateImages": true, generate then save; if neither, KEEP the
    template placeholders (do not fail the build for missing imagery — note it in OUTPUT.warnings).
R6 (conditional) lib/presets/<niche>.ts — ONLY if INPUT changes glyph/glyphSvg/voice/theme/nav/
    dropdowns/serviceTaxonomy/brandLogos for the niche. NicheTheme is {navy,navyRgb,red,redRgb,
    redHover,tint} (same desync rule as S1 — triplets must match). RENAME-SCOPE TRAP (TEMPLATE.md
    Pattern δ): renaming a composition slot id does NOT rename the NicheContent context key an atom
    self-sources via useNicheBusiness(); touching content.<atomKey> keys requires an explicit
    NicheContent type addition or tsc breaks. Default to editing values in place, not renaming keys.

EXECUTION SEQUENCE
P0  Parse INPUT. If JSON invalid, or INPUT.niche not in the 9 slugs, or INPUT.leadId missing, or
    INPUT.callbackUrl missing -> SKIP to DELIVERY with status="input_invalid" and a precise reason.
P1  Idempotency check: if a branch named "lead/<leadId>" already exists AND a prior preview URL is
    recorded for it -> SKIP to DELIVERY with status="deployed", idempotentReplay:true, the recorded
    demoUrl/commitSha. (Never double-deploy.)
P2  git: from the contractor-template base, create+checkout branch "lead/<leadId>" in an isolated
    worktree. All edits land here. Never edit the base branch or another lead's branch.
R1..R5  Apply surfaces S1–S5 (and R6 if triggered) exactly as specified above. After palette edits,
    self-check: every :root triplet equals its @theme hex in decimal RGB.
V1  Code gate:  pnpm -C web exec tsc --noEmit   (must exit 0)
V2  Build gate: pnpm -C web build                (all routes compile; must exit 0)
V3  Local visual gate (from web/): pnpm exec playwright test --project=desktop
    (tests/capture.spec.ts: hero + section-scroll capture, axe-core 0 critical/0 serious, reduced-
    motion pass; playwright.config.ts records video+traces). Home rendered height budget 6000–8000px;
    if exceeded, note in OUTPUT.warnings (capture degrades to viewport-only past the budget) but do
    not fail solely for that.
    If V1, V2, or V3 fails: capture the first failing error, set status="verify_failed", DO NOT
    deploy, go to DELIVERY. (Diagnose at the next-higher layer if you retry; do not loop the same
    fix on the same layer. Max 2 self-repair attempts, then fail honestly.)
D1  Commit on "lead/<leadId>" (message: "rebrand: <business.name> [<niche>] lead <leadId>"). Capture
    the full commit SHA.
D2  Deploy a Vercel PREVIEW of THIS branch (e.g. `vercel deploy --prebuilt --token=$VERCEL_TOKEN` or
    the project's configured preview deploy; root = web/). Capture the unique deployment URL. The
    lead's demo is that deployment's /preview/<niche> path -> demoUrl =
    "<deploymentUrl>/preview/<niche>".
D3  Liveness probe: GET demoUrl, expect HTTP 200 and non-empty HTML. If non-200 within a sane retry
    window -> status="deploy_failed" (build was green but the surface is unreachable), include the
    last status code, go to DELIVERY with demoUrl null.

DELIVERY (always runs exactly once — this is how n8n gets the result)
POST the OUTPUT envelope (Content-Type: application/json) to INPUT.callbackUrl. This URL is the n8n
Wait(resume:'webhook') resumeUrl; the funnel reads OUTPUT.body fields off the resume. Include
INPUT.leadId and INPUT.niche verbatim so the parked execution can correlate. If the POST itself fails,
retry up to 3x with backoff; the leadId idempotency guarantees the funnel won't double-process a
duplicate callback. After a successful POST, end the run. Do NOT also print the result as prose; n8n
consumes ONLY the POSTed JSON.

==================== INPUT CONTRACT (n8n -> agent) ====================
n8n sends this exact JSON shape (the enriched, normalized lead + the resume callback). Optional-chain
everything; missing optional fields fall back to template defaults.
{
  "leadId": "string  REQUIRED — idempotency key + branch name (e.g. lead's email hash or CRM id)",
  "callbackUrl": "string  REQUIRED — {{ $execution.resumeUrl }} from the n8n Wait node",
  "niche": "string  REQUIRED — one of: hvac|plumbing|roofing|electrician|painter|kitchen-remodel|general-contractor|landscaping|hardscape",
  "allowOpus": false,
  "generateImages": false,
  "business": {                       // -> lib/data.ts BUSINESS
    "name": "string  REQUIRED",
    "legalName": "string?",
    "baseUrl": "string?",
    "phone": "string  REQUIRED (display, e.g. (704) 555-0142)",
    "phoneTel": "string  REQUIRED (E.164, e.g. +17045550142)",
    "email": "string  REQUIRED",
    "city": "string  REQUIRED", "state": "string  REQUIRED", "zip": "string?",
    "latitude": "string?", "longitude": "string?",
    "hoursDisplay": "string?", "hoursShort": "string?",
    "experienceFraming": "string?", "descriptorBase": "string?",
    "social": { "facebook": "string?", "instagram": "string?", "x": "string?", "yelp": "string?", "googleReview": "string?" }
  },
  "geography": {                      // -> lib/site.config.ts GEOGRAPHY
    "regionLabel": "string  REQUIRED", "regionShort": "string?",
    "hqCity": "string  REQUIRED", "state": "string  REQUIRED",
    "counties": ["string", "..."],   // full county names
    "cities": ["string", "..."],     // display names, HQ first; mirror LOCATIONS
    "coverageLabel": "string?"
  },
  "theme": {                          // -> app/globals.css palette (+ lib/presets/<niche>.ts if R6)
    "navy": "#hex  REQUIRED", "navyRgb": "R, G, B  (optional — agent computes if absent)",
    "red": "#hex  REQUIRED",  "redRgb":  "R, G, B  (optional — agent computes if absent)",
    "redHover": "#hex?",      "tint": "#hex?"
  },
  "copy": {                           // -> lib/content-*.ts (any subset; unset = template copy)
    "home": { "...": "..." }, "core": { "...": "..." }, "misc": { "...": "..." }
  },
  "voice": { "tone": "string?", "guidance": "string?" },   // register for the rewritten copy
  "brands": [ { "name": "string", "category": "windows|doors|both", "description": "string", "logoSrc": "string", "specialty": "string", "trustSignal": "string" } ],
  "faqs":   [ { "question": "string", "answer": "string" } ],
  "images": {                         // -> /public ; each value is {url} OR {prompt} OR {path-only}
    "hero": { "url": "string?", "prompt": "string?", "dest": "/public/...  REQUIRED-if-writing" },
    "brandLogos": [ { "url|prompt": "...", "dest": "/public/brand-logos/..." } ],
    "gallery":    [ { "url|prompt": "...", "dest": "/public/..." } ],
    "locations":  [ { "url|prompt": "...", "dest": "/public/..." } ]
  }
}
Notes: form/CRM data may have arrived under $json.body upstream — n8n's Set node already normalized
it, so this INPUT is flat as shown. The agent still optional-chains every read.

==================== OUTPUT CONTRACT (agent -> n8n callbackUrl) ====================
POST exactly this JSON. n8n's Wait resumes and reads these off $json.body (e.g.
{{ $json.body?.demoUrl ?? $json.demoUrl }}). Field set and types are FIXED so the workflow parses
without branching on shape.
{
  "schema": "kingmaker.rebrand.result.v1",   // constant — lets n8n assert the contract version
  "leadId": "string  — echoed verbatim from INPUT (correlation key)",
  "niche": "string   — echoed verbatim",
  "status": "deployed | verify_failed | deploy_failed | input_invalid | error",
  "demoUrl": "string|null — the live https URL of THIS lead's preview, .../preview/<niche>; null unless status=deployed",
  "previewDeploymentUrl": "string|null — the bare Vercel deployment URL (without the /preview/<niche> suffix)",
  "branch": "string|null — lead/<leadId>",
  "commitSha": "string|null — full SHA of the rebrand commit",
  "model": "claude-sonnet-4-6 | claude-opus-4-8",
  "idempotentReplay": false,                  // true if this was a replay of an existing deploy
  "verify": {                                  // the gate results n8n logs to CRM
    "tsc": "pass|fail|skipped",
    "build": "pass|fail|skipped",
    "playwright": "pass|fail|skipped",
    "axeCritical": 0, "axeSerious": 0,
    "homeHeightPx": 0                          // 0 if not measured
  },
  "warnings": [ "string", "..." ],            // non-fatal (e.g. missing images, height>8000px)
  "reason": "string|null — present and human-readable for any non-deployed status (first failing error)",
  "costUsd": 0,                                // optional metered cost-per-lead if available
  "finishedAt": "ISO-8601 timestamp"
}
Status semantics (so the funnel routes correctly):
  deployed      -> demoUrl is live; n8n fans out Twilio SMS + SendGrid email + CRM log.
  verify_failed -> tsc/build/Playwright gate failed; NO deploy; reason carries the first error.
  deploy_failed -> gates passed but Vercel deploy/liveness probe failed; reason carries last code.
  input_invalid -> INPUT unusable (bad niche, missing leadId/callbackUrl); reason says which.
  error         -> uncaught failure; reason carries the message. n8n routes any non-deployed to the
                   Error-Workflow / DLQ branch and does NOT SMS/email a broken link.

REMEMBER: edit only the 5 surfaces, never components/; keep the two globals.css blocks in sync; gate
status on the full 3-tier stack; one preview per leadId; POST the OUTPUT envelope to callbackUrl and
stop.
```

---

## Why the contract is shaped this way (architect notes — not part of the prompt)

- **`status` is an enum, not a boolean.** The funnel must route `verify_failed` / `deploy_failed` / `input_invalid` to the Error-Workflow/DLQ and the SMS+email fan-out only on `deployed` — a boolean would force n8n to infer failure modes. The digest's "do not claim deployed on a build/verify failure" gotcha is enforced at the contract level.
- **`schema: "kingmaker.rebrand.result.v1"` is a constant** so the n8n IF/Switch can assert the version before reading fields — cheap insurance against silent shape drift (the same discipline the digest urges for pinning Stripe `apiVersion`).
- **`demoUrl` vs `previewDeploymentUrl` are split** because the Twilio/SendGrid body wants the `/preview/<niche>` deep link but CRM/debugging wants the bare deployment URL. Both are returned so n8n never has to string-munge.
- **`leadId` doubles as branch name and idempotency key**, matching the digest's "claim the idempotency key BEFORE doing work" and "never double-deploy a second Vercel preview for the same lead" gotchas. The agent short-circuits on replay.
- **`callbackUrl = {{ $execution.resumeUrl }}`** is passed in the launching HTTP Request body (it only exists once the Wait node is reached at runtime) — the agent POSTs back to resume the parked execution, which is the async bridge that keeps the multi-minute rebrand from blowing the ~30s webhook ceiling.
- **Per-lead branch isolation** is the one architectural correction the raw digest under-specifies: because `/preview/<niche>` is a single app over shared config files, an in-place rebrand would race across concurrent leads in the same trade. Branch-per-`leadId` + branch-preview deploy makes concurrent leads safe and makes the returned URL uniquely the lead's.

All field names in the input contract (`BUSINESS`, `GEOGRAPHY`, `NicheTheme`) and the 9 niche slugs were verified against the live template at `...\cranky-colden-ebfbb4\web\lib\data.ts`, `lib\site.config.ts`, `lib\presets\types.ts`, `lib\presets\*.ts`, `app\globals.css`, and `lib\preview-niche.ts`.
