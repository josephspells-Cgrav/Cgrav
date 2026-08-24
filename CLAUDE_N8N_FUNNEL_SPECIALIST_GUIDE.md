# Claude + n8n Funnel Specialist — Operator's Guide

**Role.** Architect for the King Maker lead-to-demo funnel. I know n8n (grounded in your live MCP — real node versions + params), how to call a Claude rebrand agent from it, the async/timeout patterns, deployment, and the 5-step rebrand. I draft the one-block handoff prompts for the executor agents (the n8n agent, the deployment agent). I hand airtight specs; I don't push buttons in n8n.

**Provenance.** Synthesized 2026-05-30 from an 11-agent workflow grounded in the **live n8n MCP** (real schemas: `webhook v2.1`, `respondToWebhook v1.5`, `wait v1.1`, `executeWorkflow v1.3`, `httpRequest v4.4`, `twilio v1`, `sendGrid v1`, `stripeTrigger v1`) + web + your business context. Authoritative for *your* n8n, not blog lore.

**The funnel in one line.** n8n webhook ingests the lead → fast 202 ack → async hand to a metered Claude rebrand agent (Sonnet default) → agent rebrands the template + deploys a Vercel demo + calls back → n8n SMS/emails the prospect the live demo + logs to CRM.

## ⚠️ READ FIRST — the 7 things that will break this in production

The adversarial critic cross-checked the design + both handoff prompts against your live n8n schemas and caught real production-breakers. **The prompts in `FUNNEL_HANDOFF_PROMPTS.md` are a strong v1 draft — fix these before any executor builds from them:**

| # | Breaker | The fix |
|---|---|---|
| 1 | **Silent paid-lead drop (TOP RISK).** The async design fires Workflow B fire-and-forget — but on your locked substrate (Community self-host, `EXECUTIONS_MODE=regular`, no queue/Redis), a detached sub-execution may NOT durably complete after A returns its 202. Lead gets claimed, never serviced, **no error fires.** The test plan never tests this handoff. | Prove A→B end-to-end on the real instance **first**. If B doesn't survive A's completion → collapse to a single-workflow Wait-resume, or enable queue mode. This invalidates the architecture if it fails — do it before anything else. |
| 2 | **The two handoff prompts contradict each other.** Different idempotency key (`idempotencyKey` vs `leadId`) and different input nesting (n8n sends a pre-assembled `rebrandSpec{}` wrapper; the agent prompt expects flat `business/geography/theme` keyed by `leadId`). Agent built from one + n8n from the other = **crash on lead #1.** | Reconcile into ONE input/output contract: one key name, one nesting. |
| 3 | **Forgeable deploy callback.** The Wait resume webhook has no HMAC/shared-secret. Anyone holding the resumeUrl can POST `{status:'deployed', demoUrl:'attacker.com'}` → you SMS/email that to the prospect. | Deterministic shared-secret/HMAC check on the resume body (Code/IF node, never the LLM). |
| 4 | **Unauthenticated status webhooks.** Twilio + SendGrid inbound status webhooks are `auth:none`, no signature check. Spoofable. | Twilio `X-Twilio-Signature` + SendGrid ECDSA verification (`rawBody:true`). |
| 5 | **Cost accounting is aspirational.** `costUsd` optional + never stored (no DataTable column); Opus escalation is unbounded agent judgment; no per-lead ceiling. Unit economics unobservable. | Add a cost column + hard per-lead ceiling; enforce Sonnet default (logged escalation rule, not free judgment). |
| 6 | **n8n param landmines on your substrate.** `respondToWebhook v1.5` `enableStreaming` defaults **TRUE** (muddies the fast ack). `$vars` may be unavailable on Community self-host → `undefined` in the Twilio URL. Dead 9-way Switch. | Set `enableStreaming:false`; move `$vars` to a config Set node/credentials; collapse the Switch to a Set+allowlist. |
| 7 | **Dead-link delivery + wrong model ID.** Fan-out trusts the runner's self-reported `status`, not an actual HTTP 200 on the demo URL. And `claude-opus-4-8` is unverified — your live n8n knows `claude-opus-4-7` (Sonnet default `claude-sonnet-4-6`). | Add a 1-node HTTP HEAD liveness probe on `demoUrl` before fan-out. Use `claude-opus-4-7`. |

**Net:** the node-level facts are verified-real and the design is genuinely detailed — but it is **not yet production-ready.** The contract mismatch (#2) alone crashes on the first real lead. Treat the prompts as a v1 to reconcile, not a ship.

## How to read this

- **Part I** — n8n capability reference (7 areas, real node schemas).
- **Part II** — the deliverables: the node-by-node funnel design + the two one-block handoff prompts.
- **Part III** — the full critic (gaps, corrections, risks, next steps).
- **`FUNNEL_HANDOFF_PROMPTS.md`** — the two prompts standalone (apply the 7 fixes first).

---

# Part I — n8n + Funnel Capability Reference

The n8n surface for the King Maker rebrand funnel, dissected from the live n8n MCP (real node versions + params) + web. Seven areas.

---

## n8n core, SDK, execution model

> n8n is the funnel's event spine: a webhook trigger ingests the lead, a normalize/enrich chain runs, the Claude rebrand is invoked as a long async step (Wait or sub-workflow), then Twilio/SendGrid/CRM side-effects fan out — all authored in the @n8n/workflow-sdk and validated, never live-mutated, by the specialist.

**Key facts**

- **Workflow = nodes + connections + triggers, authored in SDK as workflow('id','name').add(trigger).to(nodeA).to(nodeB)** — Nodes are declared first as const via trigger()/node()/ifElse()/switchCase()/merge()/splitInBatches(), then composed. .add() starts a chain from a trigger; .to() appends downstream. Multiple triggers = multiple .add() blocks in one workflow; each trigger's execution runs in COMPLETE isolation (no need to duplicate chains for isolation).
- **The execution data model is an array of items; every node runs once PER input item by default** — Item multiplication is the #1 gotcha: if Source A emits N items and you chain Source B after it, B runs N times -> N×M blowup. Fix with executeOnce:true on B (independent fetch / single summary / one notification) or parallel branches + Merge. 0 items = downstream silently skipped (correct for pollers); do NOT paper over with alwaysOutputData:true.
- **Expressions use {{ }} and MUST be wrapped in expr() with single/double quotes — never backticks, never $json as bare JS** — Vars: $json (immediate predecessor item), $('Node Name').item.json (any node by name), $now/$today (Luxon), $execution.id/.mode, $workflow.id, $itemIndex, $runIndex. $() and $json must live INSIDE {{ }}. After IF/Switch/Merge fan-in or in AI-agent subnodes, $json is unreliable — use nodeJson(node,'field.path') to reference an always-runs node explicitly.
- **Webhook is the funnel entry; pair responseMode:'responseNode' with a Respond to Webhook node for a fast 200, do enrichment after** — Webhook v2.1 output exposes body/headers/query/params. Normalize immediately with a Set node using optional chaining + defaults: expr('{{ $json.body?.email ?? $json.email ?? "" }}') because tests post fields at top level while real clients nest under body. authentication defaults to 'none' and the URL is public — TCPA/consent capture must be enforced in-flow, not assumed.
- **The Claude rebrand is a LONG async step — model it as a sub-workflow (Execute Sub-workflow) or a Wait-resume webhook, NOT an inline HTTP call you block on** — executeWorkflow v1.3 mode:'each' (per-lead) or 'once'; pair with executeWorkflowTrigger v1.1 declaring typed workflowInputs (name+type). For a fire-and-callback design, Wait v1.1 resume:'webhook' parks the execution and the deploy/rebrand agent resumes it via {{ $execution.resumeUrl }} when the Vercel demo is live. Both keep the main flow resilient to multi-minute agent latency.
- **Error handling is layered: node-level retry/onError + a separate Error Trigger workflow bound as the project Error Workflow** — Per-node settings: retryOnFail (with maxTries 2-5, waitBetweenTries ms) for transient API 429/5xx; onError:'continueRegularOutput' (don't let one failed side-effect block the others), 'continueErrorOutput' (route failures via .onError(handler) to a second output), or 'stopWorkflow'. A standalone workflow starting with errorTrigger v1 receives {execution, workflow, trigger} on any failure of bound workflows — wire it to Slack/email DLQ alerting.

**Real nodes / APIs / SDK**

```
n8n-nodes-base.webhook v2.1 — params: httpMethod, path, authentication(default 'none'), responseMode('onReceived'|'lastNode'|'responseNode'|'streaming'), options.allowedOrigins/ipWhitelist/ignoreBots; output: {headers,params,query,body,webhookUrl,executionMode}
n8n-nodes-base.respondToWebhook v1.5 — params: respondWith('firstIncomingItem'|'allIncomingItems'|'json'|'text'|'redirect'|'jwt'|'noData'|'binary'), responseBody, redirectURL, options.responseCode/responseHeaders.entries[{name,value}]. @builderHint: ONLY works when the Webhook node has responseMode:'responseNode'
n8n-nodes-base.code v2 — discriminator mode:'runOnceForAllItems'|'runOnceForEachItem'; params: language('javaScript'|'pythonNative'), jsCode / pythonCode. @builderHint: LAST RESORT — prefer set/if/filter/switch/splitOut/aggregate/merge/dateTime/html. runOnceForAllItems must return [{json:{...}}]; runOnceForEachItem returns one item
n8n-nodes-base.wait v1.1 — params: resume('timeInterval'|'specificTime'|'webhook'|'form'), amount+unit('seconds'|'minutes'|'hours'|'days'), dateTime; webhook-resume URL = {{ $execution.resumeUrl }}; limitWaitTime+limitType to cap the park. @builderHint: for human approval prefer sendAndWait operations on email/Slack nodes
n8n-nodes-base.executeWorkflow v1.3 — discriminator mode:'once'|'each'; params: source('database'|'parameter'|'url'|'localFile'), workflowId({__rl,mode:'list'|'id',value}), workflowInputs(ResourceMapper), options.waitForSubWorkflow(default true)
n8n-nodes-base.executeWorkflowTrigger v1.1 — params: inputSource('workflowInputs'|'jsonExample'|'passthrough'), workflowInputs.values[{name,type:'string'|'number'|'boolean'|'array'|'object'|'any'}] — this is the typed input contract for sub-workflows
n8n-nodes-base.errorTrigger v1 — no params; isTrigger. Bound per-workflow as the Error Workflow; receives execution/workflow/error context on any failure of bound workflows
n8n-nodes-base.httpRequest v4.4 — params: method, url, authentication('predefinedCredentialType'|'genericCredentialType'), genericAuthType('httpBearerAuth' for OpenAI/Anthropic/Stripe Bearer, 'httpHeaderAuth' for X-API-Key); sendBody+contentType('json'|'raw'|...)+jsonBody/bodyParameters; options.response.fullResponse/neverError, options.timeout(default 10000ms), options.batching.batch{batchSize,batchInterval}, options.pagination. @builderHint: NEVER put API keys in headerParameters/queryParameters/bodyParameters — use genericCredentialType + newCredential()
n8n-nodes-base.twilio v1 — discriminator resource:'sms'(op 'send')|'call'(op 'make') — SMS/MMS/WhatsApp send for delivery
n8n-nodes-base.sendGrid v1 — discriminator resource:'mail'(op 'send')|'contact'(op 'upsert')|'list' — email delivery + CRM contact upsert
n8n-nodes-base.stopAndError v1 — params: errorType('errorMessage'|'errorObject'), errorMessage/errorObject — deliberately fail an execution to trigger the Error Workflow (e.g. failed enrichment, missing consent)
SDK helpers: workflow/node/trigger/ifElse/switchCase/merge/splitInBatches/nextBatch from '@n8n/workflow-sdk'; expr(), nodeJson(node,'path'), placeholder('hint'), sticky(), newCredential('Name'), .input(n)/.output(n) 0-based, .onError(handler), ifElse.onTrue/.onFalse, switchCase.onCase(i,...), splitInBatches.onEachBatch/.onDone
```

**Gotchas**

- Item multiplication: chaining a second data source after one that returns N items runs the second N times (N×M). The Claude-rebrand and each delivery node should be executeOnce:true or fed exactly one normalized lead item — otherwise you rebrand/SMS the prospect N times.
- alwaysOutputData:true is a footgun, not a safety net: it injects a synthetic {json:{}} that causes undefined reads, GET undefined, and Code crashes. Only use it WITH a dedicated empty-case IF branch. For pollers, 0 items correctly skips downstream.
- $json breaks after IF/Switch/Merge fan-in and inside AI-agent subnodes — it only means 'current incoming item'. Reference the lead via nodeJson(webhookNode,'body.email') or $('Normalize Lead').item.json so the value survives branching.
- Respond to Webhook does nothing unless the Webhook node's responseMode is 'responseNode'. Forgetting this leaves the HTTP client hanging or getting the wrong default response. For the funnel, return 200 fast then run enrichment/rebrand async — don't make the form wait on a multi-minute Claude job.
- Don't block the main execution on the Claude rebrand via a synchronous HTTP call with default 10s timeout — it will time out. Use Execute Sub-workflow (waitForSubWorkflow) or Wait resume:'webhook' with {{ $execution.resumeUrl }} so the agent can take minutes and resume the flow on completion.
- Code node is explicitly a LAST RESORT (sandboxed, slower). For Stripe signature verification, idempotency-key dedup, or HMAC checks you may still need it, but field shaping/routing should be Set/If/Filter/Switch. Keep webhook signature verification (Stripe) and consent gating as explicit nodes, not buried in one mega-Code node.
- newCredential('Name') only — never hardcode API keys, never invent credential IDs like 'mock-*'. Anthropic/OpenAI/Stripe use httpBearerAuth; Twilio/SendGrid have dedicated nodes with their own credential types. Putting a key in headerParameters/bodyParameters is flagged insecure by the node's own builderHint.
- Merge/branch indices are 0-based: .input(0) is the FIRST input. Wiring sourceA->merge.input(1), sourceB->merge.input(2) silently drops the first branch. For N branches use 0..N-1.
- HARD BOUNDARY for the specialist: design/validate only. Use validate_workflow against SDK code; NEVER call create_workflow_from_code/update_workflow/publish_workflow against the user's live n8n. Handoff prompts to the n8n executor agent carry the validated code; the executor does the mutation.

**Funnel application:** For the King Maker rebrand funnel, this is the literal event spine. A single workflow starts with a Webhook (lead form POST) -> Respond to Webhook returns an instant 200 -> a Set node normalizes the lead (business name, niche from the 9 trades, email, phone, consent flag) with optional-chaining defaults -> enrichment HTTP calls -> a consent/quality gate (IF; Filter or Stop and Error on missing TCPA opt-in or junk lead). The metered Claude rebrand is invoked as a sub-workflow (Execute Sub-workflow, mode:'each', typed inputs: niche + identity + geography + copy + image set matching the 5-step rebrand) or as a Wait resume:'webhook' park so the long Sonnet/Opus job and Vercel deploy don't block the main flow. When the rebrand agent finishes deploying to contractor-template-preview.vercel.app/preview/<niche>, it resumes the execution with the live demo URL; the flow then fans out independent side-effects (each onError:'continueRegularOutput' so one failure doesn't kill the rest): Twilio SMS (resource sms/send, A2P 10DLC-registered number) and SendGrid (mail/send + contact/upsert into CRM) deliver the demo URL, and a Data Table / Sheets row logs the lead+URL+status. A second standalone Error Trigger workflow, bound as the project Error Workflow, catches any failed execution and alerts a Slack DLQ channel so no paid lead silently drops. The specialist authors all of this as @n8n/workflow-sdk code, runs validate_workflow, and hands the validated one-block code to the n8n executor agent — never mutating the live instance directly.

**Reference**

##### n8n foundation for the King Maker funnel — specialist reference

**Authoring model.** Workflows are authored in `@n8n/workflow-sdk` (import `workflow, node, trigger, ifElse, switchCase, merge, splitInBatches, nextBatch, expr, nodeJson, newCredential, placeholder, sticky`). Pattern: declare every node as a `const` first (each needs a `config:{name,parameters}` and an `output:[{...}]` sample — downstream expressions depend on it), then compose: `workflow('id','name').add(triggerNode).to(a).to(b)`. `.add()` begins a chain from a trigger; `.to()` appends. Branches are COMPLETE paths chained inside the handler: `checkValid.onTrue(format.to(enrich.to(save))).onFalse(logError)`. Switch uses `rules.values[]` (not `rules.rules`) with `outputKey` + full `conditions{options,conditions,combinator}`. Indices everywhere are **0-based** (`.input(0)` is first). Workflow: validate with `validate_workflow`; the specialist NEVER calls `create_workflow_from_code`/`update_workflow`/`publish_workflow` — those go to the n8n executor agent.

**Execution data model.** Data flows as an **array of items** `[{json:{...}, binary?:{...}}]`. A node runs once per input item by default. The dominant gotcha is **item multiplication**: chaining a second source after one returning N items runs it N times. Fixes: `executeOnce:true` (independent fetch, single summary/notification, one delivery) or parallel branches + `merge()` (`mode:'combine'|'append'`, `combineBy:'combineByPosition'`). **0 items → downstream skipped** (correct for pollers); do NOT add `alwaysOutputData:true` (injects synthetic `{json:{}}` → `undefined` reads, `GET undefined`, Code crashes) and do NOT gate loops/filters with an IF (`splitInBatches`/`filter` already no-op on empty).

**Expressions.** `{{ }}` wrapped in `expr('...')` with quotes (NEVER backticks). `$json` = immediate predecessor item; `$('Node').item.json` = any node by name; `$now`/`$today` Luxon; `$execution.id/.mode/.resumeUrl`; `$workflow.id`; `$itemIndex`/`$runIndex`. `$()`/`$json` must be INSIDE `{{ }}`. **After IF/Switch/Merge fan-in or in AI-agent subnodes, `$json` is unreliable** — use `nodeJson(webhook,'body.email')`. Normalize webhook payloads immediately: `expr('{{ $json.body?.email ?? $json.email ?? "" }}')` (tests post top-level, clients nest under `body`).

**Funnel topology.** `webhook` v2.1 (`httpMethod:'POST'`, `path`, `responseMode:'responseNode'`) → `respondToWebhook` v1.5 (`respondWith:'json'`, fast 200) so the form never waits on the rebrand. Then Set (normalize) → enrichment `httpRequest` v4.4 → consent/quality gate (`ifElse`; `filter` or `stopAndError` v1 on missing TCPA opt-in). 

**The long Claude step.** Don't block on a synchronous HTTP call (default `options.timeout` 10000ms; Anthropic via `genericAuthType:'httpBearerAuth'` + `newCredential`). Model it as `executeWorkflow` v1.3 (`mode:'each'`, `options.waitForSubWorkflow:true`) paired with `executeWorkflowTrigger` v1.1 declaring typed `workflowInputs.values[{name,type}]` (niche/identity/geography/copy/images mirroring the 5-step rebrand); OR `wait` v1.1 `resume:'webhook'` parking the execution, resumed by the deploy agent via `{{ $execution.resumeUrl }}` once the Vercel demo is live.

**Delivery + error layers.** Fan out independent side-effects from normalized data, each `onError:'continueRegularOutput'`: `twilio` v1 (`resource:'sms',operation:'send'`, A2P-10DLC number), `sendGrid` v1 (`mail/send` + `contact/upsert`), and Data Table/Sheets logging. Node-level resilience: `retryOnFail` + `maxTries`(2–5) + `waitBetweenTries` for 429/5xx; `onError:'continueErrorOutput'` routes failures via `.onError(handler)`. Bind a standalone `errorTrigger` v1 workflow as the project Error Workflow → Slack DLQ so no paid lead drops silently. **Code node is LAST RESORT** (sandboxed/slow) — reserve for Stripe HMAC signature verification + idempotency dedup; do field shaping with Set/If/Filter/Switch.

---

## The funnel integration palette — real n8n node schemas (Webhook, Respond to Webhook, HTTP Request, IF/Switch, Set, Twilio, SendGrid, Stripe, HubSpot/Airtable/Sheets/DataTable, Code, Crypto)

> Authoritative, live-MCP-verified parameter schemas and data-flow wiring for the King Maker lead-to-demo funnel: every node ID, version, resource/operation discriminator, required param, credential type, and the gotchas that break a build.

**Key facts**

- **Webhook trigger is n8n-nodes-base.webhook v2.1; to pair with Respond to Webhook you MUST set responseMode:'responseNode'** — Params: httpMethod (default GET — set 'POST' for form posts), path, authentication (default 'none'; n8n exposes inbound URLs publicly), responseMode ('onReceived'\|'lastNode'\|'responseNode'\|'streaming'), options.allowedOrigins/ipWhitelist. Output object is { headers, params, query, body, webhookUrl, executionMode } — lead fields land under $json.body. isTrigger:true.
- **Respond to Webhook is n8n-nodes-base.respondToWebhook v1.5 and only fires if the Webhook used responseMode:'responseNode'** — Params: respondWith ('firstIncomingItem'\|'json'\|'text'\|'redirect'\|'noData'\|'jwt'\|'binary'\|'allIncomingItems'), responseBody (for json/text), redirectURL (for redirect), options.responseCode (default 200), options.responseHeaders.entries[]. Best practice: respond 200 immediately after Set-normalize, THEN run the slow rebrand async so the form POST doesn't block.
- **Edit Fields (Set) is n8n-nodes-base.set v3.4 with mode discriminator REQUIRED (use mode:'manual')** — Shape: parameters.assignments.assignments = [{ id, name, value, type }] where type ∈ string\|number\|boolean\|array\|object\|binary. includeOtherFields:true to pass input through. Use this immediately after Webhook to normalize: expr('{{ $json.body?.email ?? $json.email ?? "" }}').
- **IF is n8n-nodes-base.if v2.3; Switch is n8n-nodes-base.switch v3.4 (mode:'rules')** — IF conditions = { combinator:'and'\|'or', options:{caseSensitive,leftValue,typeValidation,version}, conditions:[{leftValue,operator:{type,operation},rightValue}] }. Switch uses rules.values[] (NOT rules.rules) each with outputKey + same conditions object. Wire IF via .onTrue()/.onFalse(), Switch via .onCase(index,...).
- **Twilio SMS is n8n-nodes-base.twilio v1, resource:'sms', operation:'send', credential twilioApi** — Params: from (E.164 or Messaging Service SID), to, message, toWhatsapp (default false — keep false for SMS), options.statusCallback (URL for delivery webhooks). Output includes sid, status, error_code. For A2P 10DLC put the campaign's Messaging Service SID in 'from'.
- **SendGrid email is n8n-nodes-base.sendGrid v1, resource:'mail', operation:'send', credential sendGridApi** — Params: fromEmail, fromName, toEmail (comma-sep), subject, contentType ('text/plain'\|'text/html'), contentValue (REQUIRED message body). For templated demo emails set dynamicTemplate:true + templateId + dynamicTemplateFields.fields[{key,value}]. additionalFields has replyToEmail, ccEmail, bccEmail, categories, sendAt, headers.
- **Stripe payments use TWO different nodes: Stripe Trigger (inbound webhooks) and Stripe (outbound API). The Stripe action node has NO signature-verification param** — n8n-nodes-base.stripeTrigger v1 (cred stripeApi) auto-registers the webhook endpoint and verifies internally; params: events[] (e.g. 'checkout.session.completed','invoice.paid','customer.subscription.deleted'), apiVersion. n8n-nodes-base.stripe v1 resource:'customer' op:'create' has name (req) + additionalFields {email, metadata.metadataProperties[], address, phone}. Idempotency keys are not a node param — pass via HTTP Request header 'Idempotency-Key' if calling Stripe REST directly.
- **CRM options: HubSpot v2.2 (contact upsert / deal create), Airtable v2.2 (record upsert), Google Sheets v4.7 (sheet appendOrUpdate), Data table v1.1 (row upsert — n8n-native, preferred)** — HubSpot contact upsert: email (req key) + additionalFields (firstName, lastName, phone, companyName, lifeCycleStage, leadStatus, customPropertiesUi); creds hubspotApi\|hubspotAppToken\|hubspotOAuth2Api. HubSpot deal create needs stage (req). Airtable/Sheets/DataTable all use a ResourceMapperValue 'columns' object.
- **Google Sheets appendOrUpdate REQUIRES matchingColumns inside the columns resourceMapper or it throws 'Could not get parameter' at runtime** — columns = { mappingMode:'defineBelow'\|'autoMapInputData', value:{...expr per col}, schema:[{id,displayName,type,canBeUsedToMatch}], matchingColumns:['Email'] }. If there is no key column to dedupe on, use operation:'append' instead. documentId & sheetName are resource-locators ({__rl:true,mode,value}) — never plain strings.
- **HTTP Request (n8n-nodes-base.httpRequest v4.4) is the escape hatch for Claude/Vercel/Stripe-REST calls n8n has no node for** — JSON POST pattern: method:'POST', sendBody:true, contentType:'json', specifyBody:'json', jsonBody:expr('{{ {...} }}'). Auth: authentication:'genericCredentialType' + genericAuthType:'httpBearerAuth' + credentials:{httpBearerAuth:newCredential('Anthropic')} for Bearer APIs (Anthropic, Stripe, Vercel). options.response.fullResponse, options.timeout (default 10000ms — RAISE for long Claude calls), options.batching for throttling.
- **Code node is n8n-nodes-base.code v2 with mode discriminator (runOnceForAllItems \| runOnceForEachItem); LAST-RESORT only** — params: language ('javaScript'\|'pythonNative'), jsCode/pythonCode. MCP explicitly steers to Set/IF/Switch/Filter/Aggregate over Code. Legit uses here: building the per-niche rebrand spec JSON, HMAC payload assembly, or computing the preview URL slug.
- **Stripe webhook signature verification on a RAW Webhook node uses Crypto v2 with action:'hmac' (the 'mode' field is only for encrypt/decrypt)** — n8n-nodes-base.crypto v2 real discriminator is the 'action' param: 'hash'\|'hmac'\|'sign'\|'encrypt'\|'decrypt'\|'generate'. For Stripe Stripe-Signature header verification: action:'hmac', type:'SHA256', value = '{timestamp}.{rawBody}', secret via crypto credential, then compare hex to the v1= signature. Simpler path: use the Stripe Trigger node which verifies internally and skip manual HMAC entirely.

**Real nodes / APIs / SDK**

```
n8n-nodes-base.webhook (v2.1): multipleMethods, httpMethod, path, authentication['basicAuth'|'headerAuth'|'jwtAuth'|'none'], responseMode['onReceived'|'lastNode'|'responseNode'|'streaming'], responseData, options.{allowedOrigins,ipWhitelist,ignoreBots,binaryData,responseCode.values.responseCode,responseHeaders.entries[]}. Output: {headers,params,query,body,webhookUrl,executionMode}. Creds: httpBasicAuth/httpHeaderAuth/jwtAuth
n8n-nodes-base.respondToWebhook (v1.5): enableResponseOutput, respondWith['allIncomingItems'|'binary'|'firstIncomingItem'|'json'|'jwt'|'noData'|'redirect'|'text'], redirectURL, responseBody, payload(jwt), options.{responseCode(default 200),responseHeaders.entries[],responseKey,enableStreaming}
n8n-nodes-base.set (v3.4) mode:'manual': assignments.assignments[]={id,name,value,type['string'|'number'|'boolean'|'array'|'object'|'binary']}, includeOtherFields, include['all'|'selected'|'except'], includeFields, excludeFields, options.{dotNotation,ignoreConversionErrors,includeBinary}
n8n-nodes-base.if (v2.3): conditions{combinator,options{caseSensitive,leftValue,typeValidation},conditions[{leftValue,operator{type,operation},rightValue}]}, looseTypeValidation, options.{ignoreCase,looseTypeValidation}. Outputs wired .onTrue()/.onFalse()
n8n-nodes-base.switch (v3.4) mode:'rules': rules.values[]={conditions(FilterValue),renameOutput,outputKey}, options.{fallbackOutput(set 'extra' to create catch-all port at index=values.length),renameFallbackOutput,allMatchingOutputs,ignoreCase}. Wired .onCase(index,target)
n8n-nodes-base.twilio (v1) resource:'sms' operation:'send': from, to, toWhatsapp(default false), message, options.statusCallback. Cred: twilioApi. Output: {sid,status,error_code,error_message,from,to,num_segments}
n8n-nodes-base.sendGrid (v1) resource:'mail' operation:'send': fromEmail, fromName, toEmail, subject, dynamicTemplate(bool), contentType['text/plain'|'text/html'], contentValue(REQUIRED), templateId, dynamicTemplateFields.fields[{key,value}], additionalFields{replyToEmail,ccEmail,bccEmail,categories,sendAt,headers.details[],attachments,enableSandbox}. Cred: sendGridApi. Output: {messageId}
n8n-nodes-base.stripeTrigger (v1): events[] (incl '*','checkout.session.completed','payment_intent.succeeded','invoice.paid','invoice.payment_failed','customer.subscription.created','customer.subscription.deleted'), apiVersion. Cred: stripeApi. isTrigger:true — registers + verifies webhook automatically
n8n-nodes-base.stripe (v1) resource:'customer' operation:'create': name(REQUIRED), additionalFields{email,description,phone,metadata.metadataProperties[{key,value}],address.details{line1,line2,city,state,country,postal_code},shipping.shippingProperties[]}. Cred: stripeApi. Output: {id,balance,created,livemode,...}
n8n-nodes-base.hubspot (v2.2) resource:'contact' operation:'upsert': authentication['apiKey'|'appToken'|'oAuth2'], email(REQUIRED), additionalFields{firstName,lastName,phoneNumber,mobilePhoneNumber,companyName,city,country,jobTitle,lifeCycleStage,leadStatus,originalSource,message,customPropertiesUi.customPropertiesValues[{property,value}]}, options.resolveData. Creds: hubspotApi|hubspotAppToken|hubspotOAuth2Api. Output: {isNew,vid}
n8n-nodes-base.hubspot (v2.2) resource:'deal' operation:'create': stage(REQUIRED), additionalFields{amount,dealName,description,pipeline,dealType,dealOwner(__rl resource-locator),closeDate,associatedVids[],associatedCompany[],customPropertiesUi}
n8n-nodes-base.airtable (v2.2) resource:'record' operation:'upsert': base(__rl), table(__rl), columns(ResourceMapperValue with matchingColumns), options.{typecast,updateAllMatches,ignoreFields}. Creds: airtableTokenApi|airtableOAuth2Api
n8n-nodes-base.googleSheets (v4.7) resource:'sheet' operation:'appendOrUpdate': documentId(__rl), sheetName(__rl), columns(ResourceMapperValue — matchingColumns REQUIRED), options.{cellFormat['USER_ENTERED'|'RAW'],handlingExtraData,useAppend,locationDefine.values{headerRow,firstDataRow}}. Creds: googleApi|googleSheetsOAuth2Api
n8n-nodes-base.dataTable (v1.1) resource:'row' operation:'upsert': dataTableId(__rl), matchType['anyCondition'|'allConditions'], filters.conditions[{keyName,condition,keyValue}], columns(ResourceMapperValue), options.dryRun. NOTE: no getAll op — use operation:'get' + returnAll:true; row id auto-generated, never seed custom id
n8n-nodes-base.httpRequest (v4.4): method, url, authentication['none'|'predefinedCredentialType'|'genericCredentialType'], genericAuthType['httpBasicAuth'|'httpBearerAuth'|'httpHeaderAuth'|'httpQueryAuth'|'httpCustomAuth'|'oAuth2Api'], sendBody, contentType['json'|'form-urlencoded'|'multipart-form-data'|'raw'|'binaryData'], specifyBody['keypair'|'json'], jsonBody, sendHeaders/headerParameters, sendQuery/queryParameters, options.{response.{fullResponse,neverError,responseFormat},timeout(default 10000),batching.batch.{batchSize,batchInterval},pagination}
n8n-nodes-base.code (v2) mode['runOnceForAllItems'|'runOnceForEachItem']: language['javaScript'|'pythonNative'], jsCode, pythonCode
n8n-nodes-base.crypto (v2): action['hash'|'hmac'|'sign'|'encrypt'|'decrypt'|'generate'], type['SHA256'|'SHA512'|...](hash/hmac), value, dataPropertyName, encoding['hex'|'base64'], algorithm(sign), mode['symmetric'|'asymmetric'](encrypt/decrypt only). Cred: crypto
SDK builder factories: trigger(), node(), ifElse(), switchCase(), merge(), splitInBatches()+nextBatch(), set via node(...mode:'manual'), expr(), newCredential('Name'), placeholder('hint'), sticky(), fromAi(), nodeJson(node,'path'). Compose with .add().to(); branch .onTrue/.onFalse/.onCase(i); merge inputs .input(n) 0-based
```

**Gotchas**

- responseMode MUST equal 'responseNode' on the Webhook for a downstream Respond to Webhook to do anything — otherwise the node is silently inert and the form hangs until the default onReceived response. The Respond node's @builderHint states this explicitly.
- Webhook output nests the POST body under $json.body, but n8n's own test pin-data and some clients put fields on $json directly. ALWAYS add a Set normalizer first using optional chaining + defaults: expr('{{ $json.body?.email ?? $json.email ?? "" }}'). Skipping this is the #1 cause of 'undefined' downstream.
- Switch routing uses rules.values[] NOT rules.rules[]; and a catch-all/default branch only exists if you set options.fallbackOutput:'extra' (default 'none' silently DROPS unmatched items). renameFallbackOutput alone does not create the port. IF likewise drops items routed to an unwired .onTrue/.onFalse branch.
- Set node fails validation without the mode discriminator — must be mode:'manual' (or 'raw'). The assignments live at parameters.assignments.assignments (double-nested), each needing an explicit type field.
- Google Sheets appendOrUpdate AND Airtable/DataTable upsert all require matchingColumns in the resourceMapper 'columns' object; Sheets throws 'Could not get parameter' at runtime if it's missing. If there is no natural key column, switch to operation:'append'. All document/table/sheet selectors are __rl resource-locators — passing a plain string or expr() wrapper breaks them.
- The Stripe ACTION node (n8n-nodes-base.stripe) has no webhook/signature parameters at all — it is outbound REST only. For inbound payment events use the Stripe TRIGGER node (it registers the endpoint and verifies the signature internally). Do NOT try to validate Stripe-Signature on the Stripe action node.
- Stripe idempotency is NOT a parameter on the Stripe node. To get idempotent charge/customer creation you must call Stripe's REST API via HTTP Request and set the 'Idempotency-Key' header yourself (e.g. keyed on the lead/execution id).
- TCPA/A2P 10DLC: Twilio 'from' should be the registered Messaging Service SID for the 10DLC campaign, not a bare number, or carriers filter the SMS. toWhatsapp must stay false for SMS. Capture explicit opt-in consent in the lead form and store it in the CRM before the Twilio node runs.
- CAN-SPAM (SendGrid): contentValue is required; you must include a physical mailing address and a working unsubscribe mechanism in the email body/template, and honor SendGrid suppression lists — these are content/template responsibilities, not node params.
- The Code node is explicitly a last resort per the MCP (@builderHint + @relatedNodes steer to Set/IF/Switch/Filter/Aggregate). Reserve it for genuinely procedural steps (rebrand-spec JSON assembly, HMAC payload, slug computation), not data shaping that Set/Edit-Fields can do.
- HTTP Request default options.timeout is 10000ms — a synchronous Claude rebrand call will exceed it. Raise the timeout, or (better) respond to the webhook 200 immediately and run the rebrand on a decoupled branch so the prospect's form submit never blocks on a multi-minute agent run.
- Item multiplication: if an upstream node emits N items, a chained side-effect node runs N times. For 'send one summary SMS/email' or 'call Vercel once' set executeOnce:true, or fan out independent side-effects from the normalized item with onError:'continueRegularOutput' so one failed channel (SMS) doesn't block the others (email, CRM).
- Never hardcode API keys in headerParameters/queryParameters/bodyParameters (the schema @builderHints forbid it). Use authentication:'genericCredentialType' + the matching genericAuthType + credentials:{...:newCredential('Name')}. Bearer-style APIs (Anthropic, Stripe REST, Vercel) → httpBearerAuth.
- Crypto node's signature path is action:'hmac' (with type:'SHA256'), NOT the mode discriminator — mode only applies to encrypt/decrypt. Easy to misconfigure if you assume symmetric/asymmetric mode is the relevant selector for signing.

**Funnel application:** This palette IS the King Maker lead-to-demo funnel spine. Concrete wiring: (1) Webhook v2.1 [POST, responseMode:'responseNode'] receives the lead form from contractor-template-preview.vercel.app -> (2) Set v3.4 normalizes body.{name,email,phone,businessName,niche,city} with optional-chaining defaults -> (3) Respond to Webhook v1.5 returns 200 immediately so the form doesn't hang -> (4, async branch) HTTP Request v4.4 enriches (Clearbit/Places) -> (5) Switch v3.4 routes by niche to one of the 9 trade rebrand specs (fallbackOutput:'extra' for unknown niches) -> (6) Code v2 assembles the rebrand spec JSON (palette hex/RGB, BUSINESS/BRANDS/LOCATIONS, GEOGRAPHY, content-*, image prompts) -> (7) HTTP Request v4.4 [httpBearerAuth=Anthropic, raised timeout] invokes the metered Claude rebrand agent (Sonnet default) which edits app/globals.css + lib/* and triggers the Vercel deploy -> (8) IF v2.3 gates on deploy success -> (9a) Twilio SMS v1 [Messaging Service SID 'from', TCPA-consented] texts the live /preview/<niche> demo URL, (9b) SendGrid v1 [dynamic template, CAN-SPAM footer] emails it, (9c) Data table v1.1 / HubSpot v2.2 contact-upsert logs the lead + demo URL + deal stage. Stripe Trigger v1 ('checkout.session.completed') closes the loop on paid conversions, upgrading the CRM record. Every node ID/version/param here is copy-ready for the two executor-agent handoff prompts.

**Reference**

##### Funnel integration palette — verified node-by-node (all pulled from the live n8n MCP)

**Event spine.** The entry node is `n8n-nodes-base.webhook` **v2.1**. For the lead form, set `httpMethod:'POST'`, a stable `path`, `authentication:'none'` (n8n exposes inbound URLs publicly; lock down later with `options.allowedOrigins`/`ipWhitelist`), and critically `responseMode:'responseNode'`. Output nests under `$json.body`. Immediately follow with `n8n-nodes-base.set` **v3.4** (`mode:'manual'` — the discriminator is mandatory). Assignments are double-nested at `parameters.assignments.assignments=[{id,name,value,type}]`; normalize every field defensively, e.g. `value: expr('{{ $json.body?.email ?? $json.email ?? "" }}')`, `type:'string'`. Then `n8n-nodes-base.respondToWebhook` **v1.5** with `respondWith:'json'`, `responseBody`, `options.responseCode:200` — this returns instantly so the browser POST never blocks on the multi-minute rebrand. The Respond node is inert unless the Webhook used `responseMode:'responseNode'` (its own @builderHint says so).

**Routing.** `n8n-nodes-base.switch` **v3.4** (`mode:'rules'`) routes the 9 niches. Use `rules.values[]` (NOT `rules.rules`), each `{outputKey, conditions:{combinator,options,conditions[{leftValue,operator:{type,operation},rightValue}]}}`, wired `.onCase(index,...)`. For an unknown-niche catch-all you MUST set `options.fallbackOutput:'extra'` (default `'none'` silently drops). `n8n-nodes-base.if` **v2.3** (same `conditions` shape, `.onTrue/.onFalse`) gates deploy success. Unwired branches drop items silently.

**Outbound to Claude/Vercel.** `n8n-nodes-base.httpRequest` **v4.4** is the escape hatch. JSON POST: `method:'POST', sendBody:true, contentType:'json', specifyBody:'json', jsonBody: expr('{{ {...} }}')`. Auth via `authentication:'genericCredentialType'`, `genericAuthType:'httpBearerAuth'`, `credentials:{httpBearerAuth:newCredential('Anthropic')}`. Raise `options.timeout` (default 10000ms) for the agent call, or keep the call on the async branch. `n8n-nodes-base.code` **v2** (`mode:'runOnceForEachItem'`, `language:'javaScript'`, `jsCode`) assembles the rebrand spec JSON — last-resort per the MCP, but legitimate here for procedural spec/slug/HMAC work.

**Delivery (committed).** `n8n-nodes-base.twilio` **v1** `resource:'sms'/operation:'send'`: `from` (use the A2P 10DLC **Messaging Service SID**, not a bare number), `to`, `message`, `toWhatsapp:false`, `options.statusCallback`; cred `twilioApi`. `n8n-nodes-base.sendGrid` **v1** `resource:'mail'/operation:'send'`: `fromEmail`, `toEmail`, `subject`, `contentType:'text/html'`, `contentValue` (**required**) — or `dynamicTemplate:true`+`templateId`+`dynamicTemplateFields.fields[{key,value}]`; `additionalFields.replyToEmail`; cred `sendGridApi`. CAN-SPAM footer + unsubscribe live in the template. Fan SMS/email/CRM out in parallel from the normalized item with `onError:'continueRegularOutput'` so one channel failing doesn't block the rest; set `executeOnce:true` on any node that should fire once per lead.

**CRM / persistence.** Four real options, all verified: `n8n-nodes-base.dataTable` **v1.1** `row/upsert` (n8n-native, no external setup — preferred) with `dataTableId(__rl)`, `filters.conditions[{keyName,condition,keyValue}]`, `columns(ResourceMapperValue)`; `n8n-nodes-base.hubspot` **v2.2** `contact/upsert` (`email` required + `additionalFields`, output `{isNew,vid}`, creds incl `hubspotOAuth2Api`) and `deal/create` (`stage` required); `n8n-nodes-base.airtable` **v2.2** `record/upsert`; `n8n-nodes-base.googleSheets` **v4.7** `sheet/appendOrUpdate`. The three resourceMapper nodes need `columns.matchingColumns:['Email']` — Sheets throws `'Could not get parameter'` at runtime without it; fall back to `append` if there's no key. All document/table selectors are `{__rl:true,mode,value}` resource-locators.

**Payments.** Two distinct nodes: `n8n-nodes-base.stripeTrigger` **v1** (inbound; `events[]` like `'checkout.session.completed'`,`'invoice.paid'`,`'customer.subscription.deleted'`, `apiVersion`; registers + **verifies the signature internally**) and `n8n-nodes-base.stripe` **v1** (outbound REST only — `customer/create` has `name` req + `additionalFields.{email,metadata.metadataProperties[],address,phone}`). The action node has NO signature/idempotency params: for idempotent writes call Stripe REST via HTTP Request with an `Idempotency-Key` header; for raw-webhook HMAC verification use `n8n-nodes-base.crypto` **v2** `action:'hmac'`, `type:'SHA256'` (the `mode` field is encrypt/decrypt only). Prefer the Stripe Trigger and skip manual HMAC.

---

## Calling a Claude rebrand agent from n8n

> Three concrete ways to invoke Claude from n8n — AI Agent + Anthropic Chat Model subnode, plain HTTP Request to api.anthropic.com/v1/messages, or HTTP Request Tool inside an agent — with webhook-in / structured-URL-out wiring; Sonnet default (claude-sonnet-4-6), Opus fallback (claude-opus-4-8 is now latest, MCP hint lags at 4-7).

**Key facts**

- **Two node families invoke Claude in n8n** — (A) LangChain cluster: @n8n/n8n-nodes-langchain.agent (AI Agent, v3.1) as the root node + @n8n/n8n-nodes-langchain.lmChatAnthropic (Anthropic Chat Model, v1.5) wired as its `model` subnode via the SDK `subnodes: { model }` config. (B) n8n-nodes-base.httpRequest (v4.4) POSTing directly to https://api.anthropic.com/v1/messages. Both are valid; HTTP gives full control over body/headers, the Agent gives retries/tools/structured-output plumbing for free.
- **Sonnet is the AI Agent default; Opus is a one-field swap** — lmChatAnthropic `model` param defaults to {mode:'list', value:'claude-sonnet-4-6'}. Opus fallback = set value to the latest Opus. CRITICAL DRIFT: the MCP @builderHint says Opus='claude-opus-4-7', but live Anthropic docs (May 2026) show claude-opus-4-8 is now the latest Opus and 4-7 is Legacy. Use claude-sonnet-4-6 default / claude-opus-4-8 fallback. Both are pinned snapshots (dateless format, NOT evergreen aliases).
- **System prompt lives on the AI Agent, not the model subnode** — lmChatAnthropic v1.5 has NO system/systemMessage parameter (confirmed in its TypeScript def — only model + options{maxTokensToSample, temperature, topK, topP, thinking...}). The rebrand system prompt goes in the AI Agent's options.systemMessage. The user/lead-data message goes in the Agent's `text` param with promptType:'define'.
- **Webhook IN, structured URL OUT is the funnel I/O shape** — n8n-nodes-base.webhook (v2.1, responseMode:'responseNode') receives the enriched lead JSON. A Set node normalizes body fields (use optional chaining: $json.body?.businessName ?? $json.businessName). AI Agent with hasOutputParser:true + outputParserStructured subnode forces JSON out; the demo URL is then read as $json.output.demoUrl. respondToWebhook (v1.5) returns it to the caller.
- **Long-running rebrand favors HTTP Request over the Agent for the heavy call** — A full template rebrand+deploy is minutes-long. The Agent node holds the execution open and its 4096 default maxTokensToSample is too small for a multi-file rebrand spec. For the actual rebrand handoff, either bump options.maxTokensToSample to 8k-16k, OR (cleaner) fire the rebrand to a separate deploy worker via webhook and have THAT worker call Claude, keeping the funnel workflow fast. n8n HTTP Request default timeout is 10000ms (10s) — must be raised in options.timeout for any synchronous Claude call.

**Real nodes / APIs / SDK**

```
@n8n/n8n-nodes-langchain.agent — version 3.1 (AI Agent root node)
@n8n/n8n-nodes-langchain.lmChatAnthropic — version 1.5 (Anthropic Chat Model subnode); credentials: { anthropicApi: newCredential('Anthropic') }
@n8n/n8n-nodes-langchain.outputParserStructured — version 1.3 (schemaType:'fromJson' + jsonSchemaExample, or schemaType:'manual' + inputSchema)
n8n-nodes-base.httpRequest — version 4.4 (direct Messages API call)
n8n-nodes-base.webhook — version 2.1 (responseMode:'responseNode' to enable respondToWebhook)
n8n-nodes-base.respondToWebhook — version 1.5
n8n-nodes-base.set — version 3.4 (Edit Fields, mode:'manual', for payload normalization)
Endpoint: POST https://api.anthropic.com/v1/messages
Required headers: Content-Type: application/json | anthropic-version: 2023-06-01 | x-api-key: <key>
Body required fields: model (string), max_tokens (int), messages (array of {role:'user'|'assistant', content}); optional top-level: system (string)
Response: content[0].type='text', content[0].text=<generated string>; usage.input_tokens / usage.output_tokens for cost metering
Model IDs (live, May 2026): claude-sonnet-4-6 ($3/$15 per MTok, 1M ctx, 64k out) DEFAULT; claude-opus-4-8 ($5/$25 per MTok, 1M ctx, 128k out) FALLBACK
AI Agent params: promptType:'define', text:<expr>, hasOutputParser:true, options.systemMessage, options.maxIterations (default 10), options.maxTokensFromMemory
Agent output field: $json.output (plain string) or $json.output.<field> (with structured parser)
lmChatAnthropic options.thinkingMode: 'disabled'|'adaptive'|'manual' — 'manual' is REJECTED by Opus 4.7+; use 'adaptive' + effort for thinking on Opus
```

**Gotchas**

- MODEL DRIFT: n8n MCP's @builderHint names Opus as claude-opus-4-7, but live Anthropic docs show claude-opus-4-8 is the current latest Opus (4-7 is Legacy). Always verify the model ID string against api.anthropic.com docs at build time — n8n's bundled list lags Anthropic releases. Wrong/retired IDs return a 404 model error.
- The Anthropic Chat Model subnode (lmChatAnthropic v1.5) has NO system-prompt field. Putting the rebrand instructions there is impossible — they MUST go in the AI Agent node's options.systemMessage. A common mistake is expecting the model subnode to carry the prompt.
- HTTP Request default timeout is 10s (options.timeout default 10000). A synchronous Claude rebrand call WILL exceed this and abort. Raise options.timeout (e.g. 120000+) for any direct /v1/messages call, or decouple via a worker webhook.
- AI Agent default maxTokensToSample on the model subnode is 4096 — too small to emit a full multi-file rebrand spec (palette + lib/data.ts + content). Bump options.maxTokensToSample, or have the agent return ONLY a compact JSON handoff (the 5-step diff), not the full file bodies.
- In a webhook-triggered (non-chat) flow, set the Agent's promptType to 'define' — NOT 'auto'. 'auto' expects a chat trigger's chatInput; 'define' lets you pass text via an expression from the normalized lead data.
- Subnodes do NOT share the main node's $json predecessor context. Inside the model/parser subnode config, reference lead data with nodeJson(webhookNode,'body.field'), never bare $json (per SDK rules).
- respondToWebhook only fires if the webhook node's responseMode is 'responseNode'. Forgetting this means the HTTP caller gets the default immediate ack, not the demo URL.
- Anthropic requires max_tokens in the body — it is NOT optional. Omitting it on the raw HTTP path is a 400. The header is x-api-key (NOT Authorization: Bearer) with a separate anthropic-version: 2023-06-01 header.
- For idempotency on retries (n8n retries failed nodes), pass a stable Idempotency-Key / lead-id into the rebrand worker so a re-fired webhook doesn't double-deploy a second Vercel preview for the same lead.

**Funnel application:** In the King Maker funnel, the lead form -> enrich step hands an enriched lead object (businessName, trade/niche one of 9, city/geography, brand colors, phone) into an n8n webhook. The committed pattern: normalize with a Set node, then call Claude to produce the REBRAND HANDOFF. Recommended split — keep the n8n funnel workflow fast by having it call a separate 'deploy worker' (its own webhook) that runs the long Claude rebrand + Vercel deploy; the worker returns the live demo URL (contractor-template-preview.vercel.app/preview/<niche>). Use the AI Agent + lmChatAnthropic path with a structured output parser when you want Claude to emit the precise 5-step diff as JSON (palette hex/RGB, BUSINESS/BRANDS/LOCATIONS/FAQ, GEOGRAPHY, content-* copy, image prompts) that the deploy agent applies deterministically. Use the plain HTTP Request path when you want maximum control and per-lead cost metering (read usage.input_tokens/output_tokens off the response to log cost-per-lead, which is the accepted metered model). Sonnet 4.6 is the default to keep cost-per-lead low; escalate to Opus 4.8 only when rebrand copy quality demands it. The demo URL returned from the agent ($json.output.demoUrl) then feeds the Twilio SMS + SendGrid email delivery nodes and the CRM log — the exact downstream the funnel spec requires.

**Reference**

##### Invoking Claude from n8n — three concrete paths

**Path A — AI Agent + Anthropic Chat Model (LangChain cluster).** The root node is `@n8n/n8n-nodes-langchain.agent` (v3.1). You attach a model via the SDK `subnodes` object: `subnodes: { model: anthropicModel }`. The model is `@n8n/n8n-nodes-langchain.lmChatAnthropic` (v1.5), declared with the `languageModel({...})` factory, `credentials: { anthropicApi: newCredential('Anthropic') }`. Its `model` param defaults to `claude-sonnet-4-6`; for the Opus fallback set `model.value = 'claude-opus-4-8'`. The Agent carries the prompt:

```js
const anthropicModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatAnthropic', version: 1.5,
  config: { name: 'Claude (Sonnet)',
    parameters: { model: { __rl: true, mode: 'list', value: 'claude-sonnet-4-6' },
      options: { maxTokensToSample: 12000, temperature: 0.4 } },
    credentials: { anthropicApi: newCredential('Anthropic') } }
});
const rebrandParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured', version: 1.3,
  config: { name: 'Rebrand JSON',
    parameters: { schemaType: 'fromJson',
      jsonSchemaExample: '{ "demoUrl": "https://contractor-template-preview.vercel.app/preview/hvac", "niche": "hvac", "palette": {"primaryHex":"#0B5", "primaryRgb":"11 187 85"}, "status": "deployed" }' } }
});
const rebrandAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent', version: 3.1,
  config: { name: 'Rebrand Agent',
    parameters: { promptType: 'define',
      text: expr('Rebrand for: {{ $json.businessName }} — trade {{ $json.niche }}, city {{ $json.city }}, brand color {{ $json.brandColor }}.'),
      hasOutputParser: true,
      options: { systemMessage: 'You are the King Maker rebrand architect. Output ONLY the 5-step diff JSON: palette (globals.css @theme hex + :root RGB triplets), identity (lib/data.ts BUSINESS/BRANDS/LOCATIONS/FAQ), geography (site.config.ts GEOGRAPHY), section copy (content-*.ts), image prompts. Never edit components/.', maxIterations: 5 } },
    subnodes: { model: anthropicModel, outputParser: rebrandParser } }
});
```

Output reads as `$json.output.demoUrl`. **Critical:** `lmChatAnthropic` has no system field — the system prompt MUST live in the Agent's `options.systemMessage`. In subnodes use `nodeJson(webhook,'body.x')`, never bare `$json`.

**Path B — plain HTTP Request.** `n8n-nodes-base.httpRequest` (v4.4), `method:'POST'`, `url:'https://api.anthropic.com/v1/messages'`. Auth: do NOT inline the key. Set `authentication:'genericCredentialType'`, `genericAuthType:'httpHeaderAuth'`, `credentials: { httpHeaderAuth: newCredential('Anthropic x-api-key') }` (header name `x-api-key`). Add a non-secret header `anthropic-version: 2023-06-01` via `sendHeaders:true`. Body `sendBody:true`, `contentType:'json'`, `specifyBody:'json'`, `jsonBody` =:

```json
{ "model": "claude-sonnet-4-6", "max_tokens": 12000,
  "system": "<rebrand architect system prompt>",
  "messages": [{ "role": "user", "content": "Rebrand for {{ $json.businessName }} ..." }] }
```

Read the result at `$json.content[0].text`; meter cost from `$json.usage.input_tokens` / `output_tokens`. **Raise `options.timeout`** from its 10000ms default (a rebrand call runs minutes) and set `options.response.neverError` only if you handle non-2xx yourself.

**Path C — HTTP Request Tool inside an agent** (`n8n-nodes-base.httpRequestTool` / `toolHttpRequest`) lets Claude itself trigger the Vercel deploy as a tool call mid-reasoning — useful if the agent both writes the diff and kicks deploy.

**Funnel wiring.** `webhook` (v2.1, `responseMode:'responseNode'`) -> `set` (v3.4, normalize `body.*`) -> rebrand call -> `respondToWebhook` (v1.5) returning `demoUrl`, fanning to Twilio SMS + SendGrid. For production, decouple the minutes-long rebrand into a separate worker webhook so the funnel stays responsive, and pass a stable lead-id as an idempotency key so retries don't double-deploy.

---

## Long-running agent + async / timeout handling in n8n (minutes-long rebrand without webhook timeout)

> Never block an HTTP webhook on a minutes-long rebrand: ack the inbound webhook instantly (202 via Respond-to-Webhook), run the heavy Claude rebrand + Vercel deploy in a decoupled worker that finishes on a Wait-node resume-webhook callback (`$execution.resumeUrl`), and make the whole thing idempotent with a DataTable claim keyed on an idempotency key.

**Key facts**

- **The Wait node (n8n-nodes-base.wait, v1.1) with resume:'webhook' is the async backbone** — It pauses the execution and exposes a one-time resume URL at runtime via the expression {{ $execution.resumeUrl }} (builderHint phrases it 'resumeUrl'; the live Luxon/runtime var is $execution.resumeUrl). The external rebrand/deploy service POSTs to that URL when the deploy is live, which resumes the paused execution. Params: resume='webhook', httpMethod (GET/POST/etc), responseMode, plus limitWaitTime=true + limitType='afterTimeInterval' + resumeAmount + resumeUnit to bound the wait. webhookSuffix disambiguates multiple Wait nodes.
- **Webhook (v2.1) responseMode MUST be 'responseNode' to control reply timing** — Only 'responseNode' lets a downstream 'Respond to Webhook' node send the HTTP reply at a chosen point. Default 'onReceived' replies instantly with no body control; 'lastNode' blocks the reply until the whole workflow finishes — fatal for a minutes-long job. Webhook also supports 'streaming'. The node outputs body/headers/query/params/webhookUrl.
- **Respond to Webhook (v1.5) sends the fast ack; place it EARLY** — respondWith: 'json' \| 'text' \| 'noData' \| 'redirect' \| 'allIncomingItems' \| 'firstIncomingItem' \| 'jwt' \| 'binary'. Set options.responseCode: 202 (Accepted) for an async ack. responseBody takes an object/expression. Respond BEFORE kicking off the heavy work, so the caller's connection closes in well under a second.
- **Execute Sub-workflow (v1.3) with options.waitForSubWorkflow:false is the fire-and-forget primitive** — Default waitForSubWorkflow:true makes the parent block until the child returns — which would re-introduce the timeout. Setting it false lets Workflow A hand the job to Workflow B and immediately respond 202. The child is reached via an Execute Workflow Trigger (n8n-nodes-base.executeWorkflowTrigger v1.1, inputSource:'passthrough' to forward all fields).
- **Execution timeout is governed by EXECUTIONS_TIMEOUT (default -1 = no timeout) and EXECUTIONS_TIMEOUT_MAX** — From official docs: EXECUTIONS_TIMEOUT sets a default per-workflow timeout in seconds; -1 disables it. EXECUTIONS_TIMEOUT_MAX caps the per-workflow override. CRITICAL kill behavior: in main process a soft timeout fires after the current node finishes; in own-process/queue mode n8n soft-times-out then HARD-KILLS the process after waiting only 1/5 of the timeout duration. A paused Wait execution does not consume runtime against this clock the way a busy loop does, which is exactly why Wait beats sleeping/polling.
- **Idempotency on webhook retries is enforced with a DataTable claim, not by trusting the caller** — n8n-nodes-base.dataTable v1.1 offers rowNotExists / rowExists / insert / upsert / update with filters.conditions [{keyName, condition:'eq', keyValue}]. Claim pattern: rowNotExists on idempotencyKey to gate, then insert status='queued'. Or single-step upsert keyed on idempotencyKey. Webhooks/Stripe/Twilio retry on slow or non-2xx responses, so a fast 202 plus a unique-key claim is what prevents duplicate rebrands + duplicate SMS to the prospect.

**Real nodes / APIs / SDK**

```
n8n-nodes-base.wait (v1.1): resume: 'timeInterval'|'specificTime'|'webhook'|'form'; httpMethod; responseMode: 'onReceived'|'lastNode'|'responseNode'; limitWaitTime: boolean; limitType: 'afterTimeInterval'|'atSpecifiedTime'; resumeAmount: number; resumeUnit: 'seconds'|'minutes'|'hours'|'days'; maxDateAndTime; options.webhookSuffix; incomingAuthentication: 'basicAuth'|'none'. Runtime resume URL = {{ $execution.resumeUrl }} (builderHint string 'resumeUrl').
n8n-nodes-base.webhook (v2.1): httpMethod; path; responseMode: 'onReceived'|'lastNode'|'responseNode'|'streaming'; authentication: 'none'|'basicAuth'|'headerAuth'|'jwtAuth'; options.responseCode.values.responseCode (200/201/204/...customCode); options.allowedOrigins; options.ipWhitelist; options.rawBody. Output fields: body, headers, query, params, webhookUrl, executionMode.
n8n-nodes-base.respondToWebhook (v1.5): respondWith: 'json'|'text'|'noData'|'redirect'|'jwt'|'binary'|'allIncomingItems'|'firstIncomingItem'; responseBody; redirectURL; options.responseCode (default 200); options.responseHeaders.entries[{name,value}]; options.enableStreaming; enableResponseOutput. builderHint: only works with Webhook node whose responseMode='responseNode'.
n8n-nodes-base.executeWorkflow (v1.3): source: 'database'|'parameter'|'url'|'localFile'; workflowId {__rl,mode:'list'|'id',value}; mode: 'once'|'each'; options.waitForSubWorkflow (default true — set FALSE for fire-and-forget).
n8n-nodes-base.executeWorkflowTrigger (v1.1): inputSource: 'workflowInputs'|'jsonExample'|'passthrough'; workflowInputs.values[{name,type}].
n8n-nodes-base.dataTable (v1.1) resource:'row' operations: insert | get (returnAll, NO getAll) | update | upsert | deleteRows | rowExists | rowNotExists. filters.conditions[{keyName,condition (eq/...),keyValue}]; matchType: 'anyCondition'|'allConditions'; columns ResourceMapper {mappingMode:'defineBelow',value,schema[]}; options.dryRun. builderHint: row id is auto-generated — do NOT define a custom id column.
Env vars (official docs): EXECUTIONS_TIMEOUT (Number, default -1 = unlimited, seconds), EXECUTIONS_TIMEOUT_MAX (Number, seconds, caps per-workflow override). Per-workflow override available in workflow Settings > 'Timeout Workflow'.
Alternative ack-via-config (no Respond node): on the Wait node itself, responseMode supports 'onReceived'/'lastNode'/'responseNode' for the resume webhook leg — but the inbound ack still belongs on the Webhook+Respond pair in Workflow A.
```

**Gotchas**

- responseMode:'lastNode' on the inbound Webhook is the #1 footgun — it holds the HTTP connection open until the entire workflow (including the minutes-long rebrand) completes, guaranteeing a 30s-ish gateway/Cloudflare timeout. Must be 'responseNode' with an early Respond-to-Webhook.
- Do NOT nest the Wait-by-webhook inside a sub-workflow that the parent waits on. GitHub issue n8n-io/n8n#13135: an Execute Workflow call into a child containing a Wait(webhook) historically returned PRE-Wait data to the parent, and with multiple Wait nodes the parent only waited for the first. Use the decoupled pattern: Workflow A fires Workflow B with waitForSubWorkflow:false; B owns its own Wait + delivery. Never bridge the async boundary through a blocking parent.
- After a Wait(webhook) resumes, the callback payload lands under $json.body — NOT on bare $json. Validation of the reference skeleton flagged exactly this (INVALID_EXPRESSION_PATH on $json.jobId/$json.demoUrl after the Wait). Carry the idempotency key across the Wait boundary with a node reference like {{ $('Normalize Payload').item.json.idempotencyKey }} or nodeJson(workerStart,'idempotencyKey'), and read the resume body as {{ $json.body?.demoUrl ?? $json.demoUrl }}.
- Queue/own-process mode hard-kills a stuck execution after only 1/5 of EXECUTIONS_TIMEOUT past the soft deadline. If EXECUTIONS_TIMEOUT is set globally, a Wait that exceeds it can be killed mid-pause — always set limitWaitTime with a sane bound (e.g. 15 min) AND keep EXECUTIONS_TIMEOUT=-1 or large for the worker, or override per-workflow.
- $execution.resumeUrl is generated only once the Wait node is reached at runtime — you cannot precompute it. The rebrand/deploy service must receive it in the SAME call that hands off the job (pass it in the HTTP body to the service), then call it back on completion.
- limitWaitTime timeout path: when the Wait times out instead of being called back, execution resumes with the pre-Wait item (no callback body). Add an IF after the Wait to branch 'delivered' vs 'timed-out/failed' so a dead deploy marks the job failed and alerts, instead of silently SMSing a broken/empty URL.
- Idempotency must claim BEFORE doing work. If you insert the job row only at the end, a webhook retry that arrives while the first rebrand is mid-flight starts a second rebrand. Gate with rowNotExists (or upsert) on the idempotency key immediately after normalize, before kicking off Workflow B.
- Twilio/SendGrid/Stripe inbound webhooks retry aggressively on slow or non-2xx responses; the fast 202 is required for delivery webhooks too, and the idempotency key for outbound (don't double-send the demo SMS on a re-fired execution).

**Funnel application:** For the King Maker funnel, the rebrand (5-step re-skin of the Next.js template + Vercel deploy) takes minutes — far past any HTTP webhook's ~30s ceiling. The robust shape is two workflows: (A) INTAKE — Lead webhook (responseMode:'responseNode') -> Set normalize -> DataTable rowNotExists/insert to claim an idempotency key (prospect email or provider event id) -> Execute Workflow B with waitForSubWorkflow:false -> Respond-to-Webhook 202. The form/CRM caller gets an instant 'we're building your demo' ack. (B) REBRAND WORKER — Execute Workflow Trigger (passthrough) -> enrich -> HTTP POST the rebrand+deploy service, passing {{ $execution.resumeUrl }} as the callback -> Wait(resume:'webhook', limitWaitTime 15m) -> on callback, DataTable update status='delivered' + the Vercel preview URL (contractor-template-preview.vercel.app/preview/<niche>) -> fan out Twilio SMS + SendGrid email with the live URL -> log to CRM. The idempotency claim guarantees a retried lead webhook (or a duplicate Stripe/Twilio retry) never spawns a second rebrand or double-texts the prospect — directly protecting the metered Claude spend and TCPA/A2P 10DLC + CAN-SPAM compliance posture. This maps cleanly onto the two-executor org: the n8n agent builds A+B and the DataTable; the deployment/rebrand agent implements the service that consumes callbackUrl and POSTs back on deploy-live.

**Reference**

##### The core risk and the verdict

An inbound HTTP webhook holds a TCP connection; gateways (Cloudflare, ALBs, the form provider) kill it at ~30–100s. The King Maker rebrand is minutes. So the webhook reply MUST be decoupled from the work. **Recommended pattern: two workflows + Wait-node resume webhook + DataTable idempotency claim.** This is more robust than a single workflow with one big Wait, because it isolates the fast ack from the long job and sidesteps the sub-workflow-Wait data bug (#13135).

###### Workflow A — Intake (returns in <1s)
1. `n8n-nodes-base.webhook` v2.1 — `httpMethod:'POST'`, `path:'lead-intake'`, **`responseMode:'responseNode'`** (mandatory; `lastNode` would block on the rebrand).
2. `Set` v3.4 — normalize: `email = {{ $json.body?.email ?? $json.email }}`, derive `idempotencyKey` (prefer a provider event id / header `idempotency-key`, fall back to email).
3. `dataTable` v1.1 `rowNotExists` on `idempotencyKey` to gate duplicates, then `insert` `status:'queued'` (or one `upsert`). **Claim before work**, never after.
4. `executeWorkflow` v1.3 → Workflow B, `mode:'once'`, **`options.waitForSubWorkflow:false`** (fire-and-forget).
5. `respondToWebhook` v1.5 — `respondWith:'json'`, `options.responseCode:202`, body `{status:'accepted', jobId}`.

###### Workflow B — Rebrand worker (minutes-long)
1. `executeWorkflowTrigger` v1.1 — `inputSource:'passthrough'`.
2. `httpRequest` v4.4 — POST the rebrand/deploy service. **Pass `{{ $execution.resumeUrl }}` in the body** as `callbackUrl` (it only exists once the run reaches the Wait node, so hand it over in this same call).
3. `wait` v1.1 — `resume:'webhook'`, `httpMethod:'POST'`, `limitWaitTime:true`, `limitType:'afterTimeInterval'`, `resumeAmount:15`, `resumeUnit:'minutes'`. The service calls the resume URL when the Vercel deploy is live, posting `{demoUrl}`.
4. `IF` v2.2 — branch on whether the callback delivered a `demoUrl` (success) vs the wait timed out (failure → mark failed, alert; do NOT SMS).
5. On success: `dataTable update` status=`delivered` + `demoUrl`; then **fan out** Twilio SMS + SendGrid email + CRM log as parallel branches off normalized data, each with `onError:'continueRegularOutput'` so one failed channel doesn't block the others.

###### Why not the alternatives
- **Single workflow, one Wait:** workable, but the ack and the heavy job share one execution; if you ever wrap it as a tool/sub-workflow it hits #13135 (parent gets pre-Wait data; multi-Wait only honors the first). Decoupling is safer.
- **Polling a job (Schedule Trigger loop):** more executions, more latency, more cost; only choose it if the deploy service genuinely cannot call back. Wait+resume is strictly better when a callback is possible.
- **Just raising EXECUTIONS_TIMEOUT:** does nothing for the inbound HTTP ceiling — the gateway still drops the connection. Timeout env vars govern the *execution*, not the *socket*.

###### Timeout knobs (official)
`EXECUTIONS_TIMEOUT` (default `-1` = unlimited, seconds) and `EXECUTIONS_TIMEOUT_MAX` (caps per-workflow override). **Kill behavior:** main process = soft timeout after current node; own-process/queue = soft, then **hard kill after only 1/5 of the timeout past the deadline**. So keep the worker's timeout generous (or `-1`) and bound the pause with the Wait node's own `limitWaitTime`, not the global timeout.

###### Idempotency specifics
`dataTable` v1.1 `filters.conditions:[{keyName:'idempotencyKey',condition:'eq',keyValue}]`, `matchType:'allConditions'`. Row `id` is auto-generated — do not define a custom `id` column (builderHint). Across the Wait boundary, `$json` is the resume body (`$json.body.demoUrl`); carry the key with `{{ $('Normalize Payload').item.json.idempotencyKey }}` or `nodeJson(workerStart,'idempotencyKey')`, never bare `$json` (validation flagged this exact path).

**Validation status:** a 10-node reference skeleton of this architecture returns `valid:true` from `validate_workflow`; the only warnings were the expected post-Wait `$json.body` path advisories above. No live workflow was created or mutated.

---

## n8n deployment + ops for a solo operator (self-host Docker vs Cloud, secrets, webhooks/proxy, hardening, backups, version pinning)

> For the King Maker funnel, the cheapest reliable path is single-container self-hosted n8n (official Docker image, pinned tag, Postgres, behind Caddy TLS) on a ~$6-12/mo VPS — NOT queue mode, NOT SQLite for production — with n8n Cloud Pro ($50/mo) as the zero-ops fallback; the Sustainable Use License permits this agency use for free.

**Key facts**

- **Official image + current version** — Image is docker.n8n.io/n8nio/n8n (Docker Hub mirror n8nio/n8n). As of this research the stable tag is 2.22.5, beta 2.23.0; n8n ships a new minor most weeks. ALWAYS pin a tag (e.g. :2.22.5) — never run :latest in production, because an unattended pull can apply a breaking DB migration on restart.
- **SQLite is the default but wrong for this funnel; use Postgres** — Default DB_TYPE=sqlite. For a webhook-driven funnel doing concurrent lead processing, run Postgres (DB_TYPE=postgresdb, Postgres 13+ recommended). If you must stay on SQLite, set DB_SQLITE_POOL_SIZE>0 to enable WAL mode (default 0 = rollback-journal, slower/less concurrent-safe). Postgres is also a hard prerequisite for queue mode and for clean backups.
- **Queue mode is NOT needed at launch** — EXECUTIONS_MODE=queue adds a mandatory Redis broker + separate worker processes + shared encryption key across all nodes, and is explicitly unsupported on SQLite. A solo funnel handling tens-to-hundreds of leads/day runs fine in default 'regular' mode in one container. Multi-main HA and the Workers UI are Enterprise-gated. Defer queue mode until execution volume or long Claude-agent runtimes actually saturate one instance.
- **Encryption key is the crown jewel — pin it explicitly** — N8N_ENCRYPTION_KEY encrypts all stored credentials (Twilio, SendGrid, Vercel, Anthropic, Stripe). n8n auto-generates one on first boot and writes it to ~/.n8n/config. If you ever lose that volume without having pinned N8N_ENCRYPTION_KEY, every saved credential becomes unreadable. Set it explicitly via a Docker secret and back it up separately from the DB.
- **Webhook URL must be set explicitly behind a proxy** — Behind a reverse proxy, set WEBHOOK_URL (and N8N_EDITOR_BASE_URL) to the public HTTPS URL, plus N8N_HOST, N8N_PROTOCOL=https, and N8N_PROXY_HOPS=1. Without WEBHOOK_URL n8n advertises the wrong internal address and registered webhook/'send-and-wait' callback URLs (e.g. Twilio status callbacks, Stripe) break.
- **The built-in tunnel (--tunnel / cloudflared) is dev-only** — n8n's cloudflared tunnel and the docs' `pnpm stack --tunnel` are flagged 'isn't safe to use in production' and the implementation can change between versions. For production use a real reverse proxy (Caddy/Traefik/Nginx) with a stable domain and Let's Encrypt — Caddy auto-provisions and auto-renews TLS with one line.
- **Cloud pricing for the fallback decision** — n8n Cloud (official, n8n.io/pricing): Starter $20/mo (2.5k executions, 5 concurrent, 1 shared project), Pro $50/mo (10k executions, 20 concurrent, execution search + 7-day insights), Business $800/mo (adds queue mode/SSO/Git, self-hostable license). Billing is per full workflow execution, not per step — one lead end-to-end = 1 execution regardless of node count. Starter's 2.5k/mo is the real ceiling to watch.
- **Licensing: this agency use is free** — Self-hosted Community edition under the Sustainable Use License is free for internal/own-business automation — running YOUR funnel to win YOUR clients qualifies. The embed/commercial-license restriction only triggers if you resell n8n itself as a product. The delivered demos are Next.js/Vercel artifacts, not n8n, so there is no embed-license exposure.
- **Execution-data pruning prevents DB bloat** — Pruning is ON by default: EXECUTIONS_DATA_PRUNE=true, EXECUTIONS_DATA_MAX_AGE=336h (14 days), EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000. Because lead PII and full HTTP payloads are saved per execution, tighten retention (e.g. MAX_AGE=168, and EXECUTIONS_DATA_SAVE_ON_SUCCESS=none once stable) to cap DB growth and shrink your PII blast radius.
- **Backups = one Postgres dump + the encryption key + workflow JSON** — Daily `pg_dump` of the n8n database (or volume snapshot) plus a separately-stored copy of N8N_ENCRYPTION_KEY is a complete restore. The encryption key is useless inside the same backup if the whole VPS is lost — store it in a password manager / secrets vault too. Export workflows via CLI (`n8n export:workflow --all`) into git for change history.

**Real nodes / APIs / SDK**

```
docker.n8n.io/n8nio/n8n — official image registry path (Docker Hub mirror: n8nio/n8n); pin a version tag, e.g. docker.n8n.io/n8nio/n8n:2.22.5
DB_TYPE = sqlite | postgresdb (default sqlite)
DB_POSTGRESDB_HOST / _PORT (5432) / _DATABASE (n8n) / _USER (postgres) / _PASSWORD / _SCHEMA (public) / _POOL_SIZE (2) / _SSL_ENABLED
DB_SQLITE_POOL_SIZE (default 0 = rollback journal; >0 = WAL mode) — set >0 if forced onto SQLite
N8N_ENCRYPTION_KEY — custom credential-encryption key; supports N8N_ENCRYPTION_KEY_FILE for Docker secrets
WEBHOOK_URL — public HTTPS base for webhook/callback registration behind a proxy
N8N_HOST, N8N_PORT (5678), N8N_PROTOCOL (http|https), N8N_EDITOR_BASE_URL, N8N_PROXY_HOPS (set 1 behind one proxy)
EXECUTIONS_MODE = regular | queue (default regular)
QUEUE_BULL_REDIS_HOST / _PORT (6379) / _PASSWORD / _DB — only when EXECUTIONS_MODE=queue
EXECUTIONS_DATA_PRUNE=true, EXECUTIONS_DATA_MAX_AGE=336 (hours), EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000, EXECUTIONS_DATA_SAVE_ON_SUCCESS=all|none, EXECUTIONS_DATA_SAVE_ON_ERROR=all|none
EXECUTIONS_TIMEOUT (-1 disabled) / EXECUTIONS_TIMEOUT_MAX (3600) — cap long Claude-agent runs; N8N_AI_TIMEOUT_MAX (ms) for LLM-node HTTP timeout
N8N_SECURE_COOKIE=true (default; requires HTTPS — set false ONLY for localhost-without-TLS or login breaks), N8N_SAMESITE_COOKIE=lax
N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true, N8N_BLOCK_ENV_ACCESS_IN_NODE=true (block process.env leakage in Code node), N8N_RESTRICT_FILE_ACCESS_TO, N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=true (default)
N8N_PUBLIC_API_DISABLED=true and N8N_PUBLIC_API_SWAGGERUI_DISABLED=true — disable if not using the REST API
N8N_MFA_ENFORCED_ENABLED=true (with N8N_SECURITY_POLICY_MANAGED_BY_ENV=true) — enforce 2FA on the owner login
_FILE suffix on any sensitive var (DB_POSTGRESDB_PASSWORD_FILE, N8N_ENCRYPTION_KEY_FILE, CREDENTIALS_OVERWRITE_DATA_FILE) loads value from a file → Docker/Kubernetes secrets
GENERIC_TIMEZONE + TZ — set both so Schedule Trigger and `date` agree
N8N_RUNNERS_ENABLED=true — recommended task-runner execution mode (in the official quickstart command)
CLI: `n8n export:workflow --all --output=...`, `n8n import:workflow`, `n8n worker`, `n8n webhook` — backup/restore + queue-mode process commands
Worker/health endpoints: /healthz, /healthz/readiness (enable QUEUE_HEALTH_CHECK_ACTIVE), /metrics (N8N_METRICS=true) — queue mode only
N8N_SSL_KEY / N8N_SSL_CERT — native TLS termination (alternative to reverse proxy; you own renewal)
```

**Gotchas**

- Running :latest in production: an unattended `docker pull` + restart can trigger an irreversible DB schema migration. Pin an explicit version tag and update deliberately (pull new tag → back up DB → restart → verify). One-way feature flags like encryption-key-rotation also demand a full backup first.
- Losing the ~/.n8n volume without having explicitly set N8N_ENCRYPTION_KEY = total credential loss. The auto-generated key lives only in that volume's config file. Pin the key AND store it outside the DB backup, or a VPS loss is unrecoverable.
- N8N_SECURE_COOKIE defaults true and blocks login over plain HTTP — a classic 'can't log in after install' trap. Fix by terminating TLS (the correct path) rather than disabling the cookie; only set it false for a localhost-no-TLS dev box.
- Queue mode silently misbehaves on SQLite and is unsupported there; also it can't store binary data on the filesystem (needs S3 external storage). Don't reach for queue mode as a first scaling lever — it triples moving parts (Redis + workers + shared key).
- Forgetting WEBHOOK_URL behind a proxy: registered webhook and send-and-wait callback URLs embed the wrong host, so Twilio status callbacks / Stripe events / inbound webhooks fail with no obvious error. Always set WEBHOOK_URL + N8N_PROXY_HOPS.
- The cloudflared --tunnel is explicitly dev-only and version-unstable — do not build the production funnel's public webhook ingress on it. Use Caddy/Traefik with a real domain.
- Execution data saves full lead PII + HTTP payloads by default for 14 days; left unbounded on a high-volume funnel this grows the DB and widens the PII/compliance (TCPA/CAN-SPAM) blast radius. Tighten EXECUTIONS_DATA_MAX_AGE and consider SAVE_ON_SUCCESS=none.
- Default DB_POSTGRESDB_POOL_SIZE is only 2 — fine for one instance, but if you later add workers with low per-worker concurrency you can exhaust the Postgres connection pool (n8n recommends worker concurrency >=5 to avoid this).
- n8n Cloud Starter ($20) caps at 2,500 executions/mo and 5 concurrent — a chatty funnel (retries, multi-step polling, status callbacks counted as separate executions) can blow past that, making self-host or Pro the honest floor.
- Sustainable Use License nuance: free for your own funnel, but DO NOT package/resell the n8n instance itself to clients as a product without an embed/commercial license. Delivering Vercel-hosted Next.js demos is fine; giving each client their own n8n you operate-for-pay-as-a-product is the line to watch.

**Funnel application:** This is the funnel's runtime substrate — the always-on event spine that receives the lead-form webhook, orchestrates enrich -> Claude rebrand agent -> Vercel deploy -> Twilio SMS + SendGrid email -> CRM log, and holds the Twilio/SendGrid/Vercel/Anthropic/Stripe credentials. The recommendation: launch on ONE pinned self-hosted container (docker.n8n.io/n8nio/n8n:<pinned>) + Postgres + Caddy TLS on a $6-12/mo VPS (Hetzner/DigitalOcean), 'regular' execution mode, pruning tightened, encryption key + nightly pg_dump backed up off-box. Blended cost ~$6-12/mo infra vs $50/mo for Cloud Pro — and since the rebrand is a metered Claude agent and deploys are Vercel, n8n itself stays cheap and is just the conductor. Pick Cloud Pro instead only if the operator refuses any server ops; pick self-host (the default here) for cheapest-reliable. Concretely informs the n8n executor agent's env/Compose spec and tells the deployment agent that webhook callback URLs (Twilio status, Vercel deploy hooks) must use the public WEBHOOK_URL, not localhost.

**Reference**

##### Recommendation: single-container self-host, pinned, Postgres, behind Caddy

For a solo operator launching the King Maker funnel, the cheapest reliable path is **one self-hosted n8n container in `regular` (non-queue) execution mode, backed by Postgres, fronted by a TLS reverse proxy**, on a small VPS (Hetzner CX22 ~€4-6/mo or DigitalOcean $6/mo). This beats n8n Cloud on cost (~$6-12/mo vs Pro $50/mo) and keeps full control of credentials and lead PII. Cloud Pro ($50/mo, 10k executions) is the fallback only if the operator wants zero server ops. **Do not** start with queue mode or SQLite-in-production.

###### Minimal production stack (docker-compose, conceptual)
```yaml
services:
  db:
    image: postgres:16
    environment: [POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB=n8n]
    volumes: ["pgdata:/var/lib/postgresql/data"]
  n8n:
    image: docker.n8n.io/n8nio/n8n:2.22.5   # PIN — never :latest
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=db
      - DB_POSTGRESDB_PASSWORD_FILE=/run/secrets/pg_pw
      - N8N_ENCRYPTION_KEY_FILE=/run/secrets/enc_key   # pin + back up separately
      - N8N_HOST=n8n.youragency.com
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.youragency.com/
      - N8N_PROXY_HOPS=1
      - GENERIC_TIMEZONE=America/New_York
      - TZ=America/New_York
      - N8N_RUNNERS_ENABLED=true
      - N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
      - N8N_BLOCK_ENV_ACCESS_IN_NODE=true
      - N8N_PUBLIC_API_DISABLED=true
      - EXECUTIONS_DATA_MAX_AGE=168          # 7d, trims lead PII
    volumes: ["n8n_data:/home/node/.n8n"]
```
Put **Caddy** in front (`n8n.youragency.com { reverse_proxy n8n:5678 }`) — it auto-issues and auto-renews Let's Encrypt TLS, satisfying `N8N_SECURE_COOKIE=true` (the default that otherwise blocks login over HTTP). Avoid the built-in `--tunnel`/cloudflared path: docs label it dev-only and version-unstable.

###### Database
Default is SQLite; for a concurrent webhook funnel use **Postgres 13+**. SQLite is acceptable only for a throwaway build instance, and even then set `DB_SQLITE_POOL_SIZE>0` to get WAL mode (default `0` is rollback-journal). Postgres is also mandatory for queue mode and gives clean `pg_dump` backups.

###### Secrets management
Use the **`_FILE` suffix** on every sensitive var (`N8N_ENCRYPTION_KEY_FILE`, `DB_POSTGRESDB_PASSWORD_FILE`) to load from Docker/Kubernetes secrets instead of inline env. The single most important value is `N8N_ENCRYPTION_KEY` — it decrypts all stored Twilio/SendGrid/Vercel/Anthropic/Stripe credentials. Pin it explicitly (n8n only auto-writes it into `~/.n8n/config`), and store a copy in a password manager **outside** the DB backup, or a VPS loss is unrecoverable.

###### Webhooks / proxy
Behind any proxy, set `WEBHOOK_URL` + `N8N_EDITOR_BASE_URL` to the public HTTPS URL and `N8N_PROXY_HOPS=1`. Omitting `WEBHOOK_URL` makes n8n register callback URLs against its internal address, silently breaking Twilio status callbacks, Stripe events, and Vercel deploy hooks. Webhook paths to know: `/webhook/*` (production triggers), `/webhook-test/*` (manual test runs), `/webhook-waiting/*` (send-and-wait).

###### Hardening checklist
Enforce settings-file perms; `N8N_BLOCK_ENV_ACCESS_IN_NODE=true` (stop Code node reading process.env); keep `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=true`; disable the public API if unused; enable owner 2FA (`N8N_MFA_ENFORCED_ENABLED=true` with `N8N_SECURITY_POLICY_MANAGED_BY_ENV=true`); run the built-in **security audit** (`n8n audit`). Consider SSRF protection if untrusted input feeds HTTP nodes.

###### Backups & version pinning
Backup = nightly `pg_dump` (or volume snapshot) + the separately-stored encryption key + `n8n export:workflow --all` committed to git. Update deliberately: bump the pinned tag, `pg_dump` first, restart, verify — because an unattended `:latest` pull can fire an irreversible schema migration. Cap runaway Claude-agent executions with `EXECUTIONS_TIMEOUT`/`EXECUTIONS_TIMEOUT_MAX`.

###### When to graduate
Move to **queue mode** (`EXECUTIONS_MODE=queue` + Redis `QUEUE_BULL_REDIS_*` + `n8n worker` processes sharing the encryption key, worker `--concurrency>=5`) only when one instance saturates. Multi-main HA and the Workers UI are Enterprise-licensed. Licensing: Community self-host is **free** for running your own agency funnel under the Sustainable Use License; the embed/commercial license is only required to resell n8n itself as a product.

---

## The template rebrand as an agent task — input contract, file edits, build/verify, Vercel preview deploy, and the n8n handoff that invokes the rebrand agent and returns the live demo URL

> The rebrand agent is a metered Claude (Sonnet-default) executor that takes an enriched-lead JSON contract, edits exactly the 5 King Maker config surfaces (globals.css palette, data.ts identity, site.config.ts GEOGRAPHY, content-*.ts copy, /public images) NEVER touching components/, runs tsc+build+Playwright gates, deploys a Vercel preview, and returns {demoUrl, status, commitSha} — invoked by n8n via an async HTTP-Request → Wait(resume:webhook, $execution.resumeUrl) bridge because a Sonnet rebrand exceeds the webhook timeout.

**Key facts**

- **The rebrand agent's INPUT is a single enriched-lead JSON envelope, grounded in the real template constant shapes** — Required keys map 1:1 to template constants: business{name,legalName,phone(→phoneTel as E.164),email,city,state,zip,latitude,longitude,hoursDisplay,descriptorBase,social{facebook,instagram,googleReview}} → lib/data.ts BUSINESS; niche (one of the 9 preset slugs) → selects which baked preset renders; geography{regionLabel,regionShort,hqCity,counties[],cities[],coverageLabel} → lib/site.config.ts GEOGRAPHY; palette{navy,navyRgb,red,redRgb,redHover,tint} → app/globals.css (hex AND rgb triplet, MUST stay in sync); services[] + brandLogos[] (optional, defaults from the niche preset); leadId + replyTo{phone,email} for the return SMS/email. The agent must derive phoneTel and the rgb triplets if the lead only supplies display phone / hex.
- **The agent's OUTPUT is a deterministic status envelope the n8n flow logs and templates into the SMS/email** — Return {leadId, status: 'deployed'\|'build_failed'\|'deploy_failed'\|'verify_failed', demoUrl (the Vercel preview URL e.g. https://contractor-template-preview.vercel.app/preview/<niche> or the generated *.vercel.app alias), commitSha, niche, businessName, durationSec, gateResults{tsc,build,playwright}, errorSummary?}. demoUrl + status are the load-bearing fields; everything else is CRM telemetry.
- **CRITICAL nuance: there are TWO skin axes and the agent must not conflate them** — Axis 1 = the 9 baked NichePresets (lib/presets/<niche>.ts) that re-skin STRUCTURE (composition order, page toggles, service taxonomy, glyph, voice, default theme) and render at the runtime route /preview/<niche>. Axis 2 = the per-business content/palette/geography in lib/data.ts + site.config.ts + content-*.ts + globals.css. The 5-step rebrand edits Axis 2; the niche field selects Axis 1. Renaming a composition id does NOT rename the NicheContent context key (TEMPLATE.md Pattern δ — broke tsc in Pass 12).
- **n8n invokes the agent ASYNCHRONOUSLY because a real Sonnet rebrand outlives any synchronous webhook** — Pattern: HTTP Request (POST to the agent-runner endpoint, body includes resumeUrl=expr('{{ $execution.resumeUrl }}')) → Wait node with resume:'webhook'. The agent runner does the work out-of-band and POSTs its result envelope back to resumeUrl to wake the workflow. Synchronous responseMode:'lastNode' would time out. The Wait node exposes $execution.resumeUrl; set limitWaitTime:true (e.g. resumeAmount:30, resumeUnit:'minutes') so a hung rebrand fails the lead gracefully instead of parking forever.
- **Build/verify is a 3-gate stack the agent runs before it is allowed to deploy or claim success** — Gate 1 types: pnpm -C web exec tsc --noEmit. Gate 2 routes: pnpm -C web build (every /preview/<niche>/* route must compile). Gate 3 visual/a11y: pnpm exec playwright test --project=desktop (tests/capture.spec.ts — hero+section scroll capture, axe-core 0 critical/0 serious, reduced-motion pass). A failure at any gate sets status accordingly and the agent must NOT return a demoUrl as 'deployed'.
- **Delivery + CRM nodes consume the agent output verbatim** — Twilio (resource:sms, operation:send) params from/to/message — message embeds expr('{{ $json.demoUrl }}'); TCPA + A2P 10DLC require prior consent capture on the lead form and STOP/HELP handling. SendGrid (resource:mail, operation:send) params fromEmail/toEmail/subject/contentValue (set contentType:'text/html') — CAN-SPAM requires physical address + unsubscribe. Data table (resource:row, operation:insert) with columns.mappingMode:'defineBelow' logs leadId/businessName/niche/demoUrl/status/commitSha as the CRM row.

**Real nodes / APIs / SDK**

```
n8n-nodes-base.webhook (v2.1) — funnel entry. responseMode:'responseNode' (so a Respond-to-Webhook node ACKs the lead form fast); output exposes body/headers/query. Normalize immediately with a Set node using optional chaining: expr('{{ $json.body?.email ?? $json.email ?? "" }}').
n8n-nodes-base.httpRequest (v4.4) — invokes the Claude rebrand agent runner AND (separately) the Vercel deploy/status API. For Anthropic/Vercel bearer tokens set authentication:'genericCredentialType', genericAuthType:'httpBearerAuth', credentials:{ httpBearerAuth: newCredential('Anthropic') } — NEVER inline the token in headerParameters/bodyParameters. sendBody:true, contentType:'json', specifyBody:'json', jsonBody carries the enriched-lead envelope + resumeUrl. options.timeout default 10000ms is far too low for any sync call — use the Wait-resume async pattern instead.
n8n-nodes-base.wait (v1.1) — async bridge. resume:'webhook'; reference the callback target as expr('{{ $execution.resumeUrl }}') in the preceding HTTP body. Set limitWaitTime:true, limitType:'afterTimeInterval', resumeAmount/resumeUnit to bound the wait. httpMethod:'POST' for the resume call.
n8n-nodes-base.twilio (v1) resource:'sms' operation:'send' — params: from, to, message (message body embeds expr('{{ $json.demoUrl }}')); options.statusCallback for delivery receipts; credentials:{ twilioApi: newCredential('Twilio') }.
n8n-nodes-base.sendGrid (v1) resource:'mail' operation:'send' — params: fromEmail, fromName, toEmail, subject, contentType:'text/html', contentValue (REQUIRED — the HTML body with the demo link); additionalFields.replyToEmail; credentials:{ sendGridApi: newCredential('SendGrid') }.
n8n-nodes-base.dataTable (v1.1) resource:'row' operation:'insert' — dataTableId:{__rl:true,mode:'name',value:'leads'}; columns:{ mappingMode:'defineBelow', value:{ demoUrl: expr('{{ $json.demoUrl }}'), status: expr('{{ $json.status }}'), ... }, schema:[...] }. Row IDs auto-generate — do NOT seed a custom id column. PREFERRED over Sheets/Airtable (no external config).
Real template constants (American Masterworks worktree cranky-colden-ebfbb4/web): lib/data.ts → BUSINESS{name,legalName,baseUrl,phone,phoneTel,email,city,state,zip,latitude,longitude,hoursDisplay,hoursShort,hoursSchema,experienceFraming,descriptorBase,social{facebook,instagram,x,yelp,googleReview}}, plus BRANDS/LOCATIONS/LOCATION_CONTENT/FAQ/WINDOW_MATERIALS. lib/site.config.ts → GEOGRAPHY{regionLabel,regionShort,hqCity,state,counties[],cities[],coverageLabel} + derived CITY_COUNT/COUNTY_COUNT/cityListSentence(). lib/presets/types.ts → NicheTheme{navy,navyRgb,red,redRgb,redHover,tint}, NichePreset{niche,displayName,composition,pageToggles,serviceTaxonomy,glyph,glyphSvg?,voice,theme,typography?,nav,dropdowns?,brandLogos,services?,primaryService}.
app/globals.css rebrand surface — TWO synced blocks: @theme inline { --color-navy, --color-red, --color-red-hover, --color-tint } (hex; drives Tailwind utilities bg-red/text-navy) AND :root { --color-navy-rgb, --color-red-rgb } (decimal triplets; drives ~130 inline rgba() glows). Triplet MUST equal hex in decimal or glows desync from utilities.
Routing: lib/preview-niche.ts nicheFromPathname() regex /^\/preview\/([^/]+)(?:\/|$)/ — Header/Footer read the niche off the pathname; null = AM defaults. Dynamic routes app/preview/[niche]/[page] and app/preview/[niche]/serviceDetail/[service].
Build/verify (from web/, pnpm): `pnpm -C web exec tsc --noEmit`; `pnpm -C web build`; `pnpm exec playwright test --project=desktop` (tests/capture.spec.ts, playwright.config.ts records video+traces). Stack: Next.js + framer-motion + react (package.json deps).
```

**Gotchas**

- NEVER edit components/ to rebrand. If copy or color is being changed inside a component, content has leaked — route it back to the lib/ layer. The 9 motion primitives in components/motion/ copy at 100% fidelity and must never be regenerated; carrying the flagship motion intact is the entire point of the template.
- globals.css desync footgun: the @theme hex block and the :root RGB-triplet block are independent. If the agent updates one and not the other, Tailwind utilities (bg-red) and the ~130 inline rgba() glows render in DIFFERENT colors. The triplet must be the hex converted to decimal RGB. This is the single most common silent rebrand defect.
- A synchronous agent invocation will time out. HTTP Request options.timeout defaults to 10000ms and even raised it cannot cover a multi-minute Sonnet rebrand+build+deploy. You MUST use HTTP Request → Wait(resume:'webhook') with $execution.resumeUrl, and the runner POSTs the result back. Always set Wait limitWaitTime so a hung rebrand fails the lead instead of parking the execution forever.
- Do not claim 'deployed' on a build/verify failure. The agent must gate status on tsc + build + Playwright (axe 0 critical/0 serious) ALL passing before returning a demoUrl marked deployed; a green build with a failed a11y pass is verify_failed, not deployed.
- Page-length budget: rendered home height target 6000–8000px. Over 8000px exceeds the Anthropic vision API full-page capture limit AND signals content overload — trim density (move sections to /serviceHub or /serviceDetail) before adding more. The Playwright capture silently degrades to viewport-only past the budget.
- Rename scope trap (TEMPLATE.md Pattern δ): renaming a composition slot id does NOT rename the NicheContent context key an atom self-sources via useNicheBusiness(). A 'rename' defaults to the composition id + propsMap lookup key ONLY; touching content.<atomKey> keys requires an explicit NicheContent type addition or tsc breaks (as it did in Pass 12).
- Webhook payload shape ambiguity: form/CRM data may arrive under $json.body OR directly on $json. Add a Set node right after the webhook that normalizes every field with optional chaining + defaults, e.g. expr('{{ $json.body?.name ?? $json.name ?? "there" }}'), before any downstream node reads it.
- Credential hygiene: Anthropic and Vercel tokens go through newCredential() + httpBearerAuth, never in headerParameters/bodyParameters/queryParameters. Compliance locks: TCPA + A2P 10DLC consent for Twilio SMS, CAN-SPAM footer for SendGrid, Stripe signature + idempotency for any payment step — these are non-negotiable per the locked decisions.

**Funnel application:** This is the single automated step that converts an enriched lead into a tangible, clickable custom demo — the conversion centerpiece of the King Maker funnel. Defining a strict input contract (the enriched-lead JSON keyed to the real BUSINESS/GEOGRAPHY/NicheTheme shapes) and a strict output envelope ({demoUrl,status,commitSha}) is what lets the n8n architect wire the rebrand agent as a black-box executor: n8n owns the event spine (lead webhook → enrich → invoke agent → Twilio/SendGrid deliver → CRM log) and never needs to understand the rebrand internals. The async HTTP→Wait→resumeUrl bridge is the specific integration that makes a metered, multi-minute Sonnet rebrand survivable inside a workflow runtime built for sub-second steps. The 5-step / never-touch-components discipline plus the 3-gate verify stack is what keeps the per-lead demo reliably shippable at scale across all 9 trades — turning 'agency-quality custom site' from a bespoke build into a high-reliability content-replacement operation that costs cents-per-lead and lands a live URL in the prospect's hands within minutes of form submission.

**Reference**

##### The rebrand as an agent task

**Shape.** The deployment/rebrand agent is a *metered Claude executor* (Sonnet default; Opus only if a niche's quality bar demands it) that the n8n funnel invokes as a black box. It receives ONE enriched-lead JSON envelope, performs the King Maker 5-step rebrand against the Next.js contractor template, runs the verify gates, deploys a Vercel preview, and returns a status envelope. n8n owns the event spine; the agent owns the rebrand.

###### Input contract (grounded in real template constants)
```jsonc
{
  "leadId": "lead_8f3c",
  "niche": "hvac",                       // one of the 9 preset slugs → selects baked Axis-1 skin
  "business": {                          // → lib/data.ts BUSINESS
    "name": "Bunn's Heating & Air", "legalName": "Bunn's Heating & Air, Inc.",
    "phone": "(919) 555-0142",           // agent derives phoneTel "+19195550142"
    "email": "owner@…", "city": "Louisburg", "state": "NC", "zip": "27549",
    "latitude": "36.0985", "longitude": "-78.3010",
    "hoursDisplay": "Mon–Sat, 8 AM – 6 PM", "descriptorBase": "Heating & Cooling",
    "social": { "facebook": "…", "instagram": "…", "googleReview": "…" }
  },
  "geography": {                         // → lib/site.config.ts GEOGRAPHY
    "regionLabel": "Franklin County", "regionShort": "Eastern NC", "hqCity": "Louisburg",
    "counties": ["Franklin County"], "cities": ["Louisburg","Bunn","Franklinton"],
    "coverageLabel": "3 Towns · 1 County"
  },
  "palette": {                           // → app/globals.css (BOTH blocks)
    "navy":"#0c4a5e","navyRgb":"12, 74, 94","red":"#ff6b1a","redRgb":"255, 107, 26",
    "redHover":"#e85a0d","tint":"#eaf0f2"
  },
  "services": [], "brandLogos": [],      // optional; default from niche preset
  "replyTo": { "phone":"+1…", "email":"…" }
}
```
The agent must *derive* anything the lead omits: `phoneTel` (E.164 from display phone), the `*Rgb` triplets (hex→decimal), and `coverageLabel` (from counts).

###### The 5 file edits (and the hard boundary)
1. **`app/globals.css`** — update the `@theme inline` hex block (`--color-navy/red/red-hover/tint`) AND the `:root` RGB-triplet block (`--color-navy-rgb`, `--color-red-rgb`). Keep them numerically in sync; the triplets feed ~130 inline `rgba()` glows.
2. **`lib/data.ts`** — `BUSINESS` + `BRANDS`/`LOCATIONS`/`LOCATION_CONTENT`/FAQ.
3. **`lib/site.config.ts`** — the `GEOGRAPHY` block (single source for every region/county/city string).
4. **`lib/content-*.ts`** — `content-home`, `content-core`, `content-misc` section copy.
5. **`/public/`** — hero, `/public/brand-logos/`, gallery, location photos.

**NEVER edit `components/`.** Motion is baked in and copies at 100%; touching it to rebrand is the cardinal failure. If copy/color is being changed in a component, content has leaked — route it back to `lib/`.

###### Build + verify (gate before claiming success)
```
pnpm -C web exec tsc --noEmit                 # types
pnpm -C web build                             # all /preview/<niche>/* routes compile
pnpm exec playwright test --project=desktop   # capture + axe-core 0 crit/0 serious + reduced-motion
```
Status is gated on all three. Home height budget 6000–8000px (over 8000 breaks vision capture).

###### Output contract
```jsonc
{ "leadId":"lead_8f3c", "status":"deployed",
  "demoUrl":"https://contractor-template-preview.vercel.app/preview/hvac",
  "commitSha":"a1b2c3d", "niche":"hvac", "businessName":"Bunn's Heating & Air",
  "gateResults": { "tsc":"pass","build":"pass","playwright":"pass" }, "durationSec":214 }
```

###### How n8n invokes it (the load-bearing integration)
A Sonnet rebrand is minutes long — it cannot run inside a synchronous webhook. The spine is: **Webhook(v2.1, responseMode:'responseNode')** → Set(normalize `body?.x ?? x`) → enrich → **HTTP Request(v4.4)** POSTs the envelope + `resumeUrl: expr('{{ $execution.resumeUrl }}')` to the agent runner (auth via `genericCredentialType`/`httpBearerAuth` + `newCredential('Anthropic')`) → **Wait(v1.1, resume:'webhook', limitWaitTime:true)**. The runner does the rebrand out-of-band and POSTs the output envelope back to `resumeUrl`, waking the flow. Then fan out independent side effects from the resumed data: **Twilio**(`from`/`to`/`message` with `{{ $json.demoUrl }}`), **SendGrid**(`fromEmail`/`toEmail`/`contentValue`, `contentType:'text/html'`), **Data table**(`row`/`insert`, `columns.mappingMode:'defineBelow'`). Set `onError:'continueRegularOutput'` on the delivery nodes so one failed channel doesn't block the others. Compliance is locked: TCPA + A2P 10DLC (SMS consent + STOP/HELP), CAN-SPAM (email footer), Stripe signature + idempotency (payments).

---

## Delivery (Twilio SMS + SendGrid email) + Stripe payment gates + CRM logging — the deterministic compliance layer of the King Maker funnel

> Delivery and payment are deterministic code/config gates wired to specific n8n nodes (Twilio v1, SendGrid v1, Stripe Trigger v1, Data table), with TCPA/A2P-10DLC, CAN-SPAM, and Stripe-signature compliance enforced in Code/Crypto/IF nodes — never by the LLM — and the bulk of compliance (10DLC brand+campaign registration, SendGrid domain auth, webhook secrets) set up out-of-band before the workflow can legally send.

**Key facts**

- **A2P 10DLC is the 10-15 day critical path that gates the entire SMS leg** — Registration order is strict: (1) Twilio Customer Profile / Trust Hub compliance profile, (2) Brand registration (TCR approves in minutes-to-hours), (3) Campaign registration (TCR vetting now takes 10-15 days due to volume), (4) link the 10DLC number to a Messaging Service. A Messaging Service IS required to send A2P traffic. Trial accounts cannot register — must be a paid Twilio account, and OTP verification of the business mobile must complete within 24h during brand registration. NONE of this is an n8n node — it is 100% out-of-band Console setup that must finish before the funnel can send a single compliant SMS. Build the workflow now, but the SMS branch stays dark until campaign = APPROVED.
- **The n8n Twilio node v1 exposes from/to/message as top-level params and has NO MessagingServiceSid field** — TwilioV1SmsSendParams = { resource:'sms', operation:'send', from, to, toWhatsapp?, message, options:{ statusCallback? } }. Production A2P 10DLC sending should route through a Messaging Service (MessagingServiceSid), but the node only accepts a literal `from` number. To send via Messaging Service you must use an HTTP Request node POSTing to Twilio's REST API with MessagingServiceSid in the form body, reusing the Twilio predefined credential. Credential type is `twilioApi` (Account SID + Auth Token).
- **Twilio status callbacks (delivered/failed/undelivered) come back on a SEPARATE inbound webhook, not the send node's response** — options.statusCallback takes a URL Twilio POSTs delivery events to. The n8n type-def description for statusCallback is a copy-paste bug (it says 'Rooms, Recordings and Compositions') but it does carry SMS MessageStatus. Wire a second n8n Webhook node as the callback receiver; Twilio sends MessageSid + MessageStatus (queued→sent→delivered/undelivered/failed) as application/x-www-form-urlencoded. Log terminal status to CRM. The send node's synchronous output only confirms Twilio ACCEPTED the message (status:'queued'/'accepted'), never that it was delivered.
- **Stripe signature verification must be a deterministic Code node, never LLM judgment** — Stripe Trigger node (n8n-nodes-base.stripeTrigger, cred `stripeApi`) auto-manages the webhook endpoint and DOES verify signatures internally — prefer it. If you instead use a raw Webhook node (e.g. to control rawBody), you MUST verify the Stripe-Signature header in a Code node: header is `t=<unixts>,v1=<hmacSHA256>`; signed payload = `${t}.${rawBody}`; HMAC-SHA256 with the endpoint signing secret (whsec_...); constant-time compare; reject if timestamp older than 5-minute tolerance. Requires the webhook's RAW body — set Webhook options.rawBody:true. Always pair with an idempotency key (event.id) checked against the Data table to dedupe Stripe's at-least-once redelivery.
- **SendGrid domain authentication (SPF/DKIM via CNAME) + CAN-SPAM are pre-send, out-of-band gates** — Before any email sends: SendGrid Automated Security generates CNAME records (em123.yourdomain.com style) the user publishes at their DNS provider; SendGrid then auto-maintains SPF/DKIM/DMARC. Unauthenticated domains land in spam. CAN-SPAM is non-negotiable and deterministic: every commercial email MUST contain (a) a valid physical postal address and (b) a clear unsubscribe mechanism honored within 10 business days, opt-out link live ≥30 days. Bake address + unsubscribe into the SendGrid template/footer as static config — do not let the rebrand agent generate it per-send.
- **The live n8n instance currently has ZERO credentials configured** — list_credentials returned {data:[],count:0}. Every node in this funnel (twilioApi, sendGridApi, stripeApi, plus any HTTP Request predefined creds) needs its credential created in the n8n UI before the workflow runs. The n8n agent handoff must explicitly instruct creating these with newCredential('Name') references — and the human must populate the secrets (Twilio SID/token, SendGrid API key, Stripe secret + webhook signing secret) out-of-band. No credential IDs to copy; all are net-new.
- **CRM logging should use the native n8n Data table node (no external DB needed)** — n8n-nodes-base.dataTable v1.1, resource:'row', operation:'insert'. Uses a resourceMapper: columns:{ mappingMode:'defineBelow', value:{...}, schema:[{id,displayName,type:'string',canBeUsedToMatch:true},...] } and dataTableId:{__rl:true, mode:'list'\|'name', value:'<table>'}. Persists across executions, supports lookup-by-match for idempotency (Stripe event.id, lead email). Output is {id, createdAt, updatedAt}. Preferred over Sheets/Postgres for this scale; switch to Postgres only if >10k rows expected.

**Real nodes / APIs / SDK**

```
n8n-nodes-base.twilio (v1) — resource:'sms', operation:'send'; params: from (string), to (string), toWhatsapp (bool, default false), message (string), options.statusCallback (URL); credentials: { twilioApi: newCredential('Twilio') }; output incl. sid, status, messaging_service_sid, error_code, error_message
n8n-nodes-base.sendGrid (v1) — resource:'mail', operation:'send'; params: fromEmail, fromName, toEmail (comma-sep), subject, dynamicTemplate (bool), contentType ('text/plain'|'text/html'), contentValue, templateId (when dynamicTemplate:true), dynamicTemplateFields.fields[{key,value}], additionalFields.{bccEmail,ccEmail,replyToEmail,categories,sendAt,headers,attachments,enableSandbox}; credentials: { sendGridApi: newCredential('SendGrid') }; output: { messageId }
n8n-nodes-base.stripeTrigger (v1) — params: events[] (e.g. 'checkout.session.completed','invoice.paid','payment_intent.succeeded','invoice.payment_failed'), apiVersion (pin it!); credentials: { stripeApi: newCredential('Stripe') }; isTrigger; auto-registers + verifies the webhook signature internally
n8n-nodes-base.webhook (v2.1) — for Twilio status callback + SendGrid event receiver: httpMethod 'POST', path, authentication 'none' (Twilio/SendGrid sign their own payloads), responseMode 'onReceived'|'responseNode', options.rawBody:true (REQUIRED for SendGrid ECDSA + manual Stripe HMAC), options.binaryData; output: { headers, params, query, body }
n8n-nodes-base.crypto (v2) — action:'hmac', type 'SHA256', value (the `${t}.${rawBody}` signed payload), encoding 'hex'; used to recompute Stripe signature for comparison when not using the Stripe Trigger node. (Note: prefer a Code node for full constant-time compare + tolerance check.)
n8n-nodes-base.code (v2) — mode:'runOnceForEachItem', language:'javaScript', jsCode; the deterministic compliance gate: Stripe HMAC verify + 5-min tolerance + idempotency lookup; TCPA consent check (block send unless prior express written consent flag is true); quiet-hours / opt-out suppression
n8n-nodes-base.dataTable (v1.1) — resource:'row', operation:'insert'; columns.mappingMode:'defineBelow' with schema[]; dataTableId:{__rl:true,mode:'name',value:'leads'}; options.optimizeBulk; output {id,createdAt,updatedAt}
n8n-nodes-base.if (v2.3) — conditions:{ combinator:'and', options:{caseSensitive:true,typeValidation:'strict',version:2}, conditions:[{leftValue:expr('{{ $json.consent }}'),operator:{type:'boolean',operation:'true'}}] }; the consent/compliance branch gate
n8n-nodes-base.respondToWebhook (v1.5) — respondWith 'text'|'json'|'noData', options.responseCode (200 to ACK Twilio/SendGrid/Stripe quickly; return 2xx fast or they retry)
Twilio REST (via HTTP Request node) — POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json, contentType 'form-urlencoded', body: MessagingServiceSid + To + Body + StatusCallback; authentication 'predefinedCredentialType' reusing twilioApi — the ONLY way to send via Messaging Service from n8n
Stripe-Signature header — 't=<unix_seconds>,v1=<hex_hmac_sha256>'; signed payload '${t}.${raw_body}'; secret = whsec_... endpoint signing secret; default tolerance 300s; never tolerance 0
SendGrid Event Webhook — headers X-Twilio-Email-Event-Webhook-Signature (ECDSA base64) + X-Twilio-Email-Event-Webhook-Timestamp; verification needs RAW body bytes; signing OFF by default, enable per-subscription; event types delivered/open/click/bounce/dropped/spamreport/unsubscribe
```

**Gotchas**

- 10DLC campaign vetting is 10-15 days RIGHT NOW — the SMS branch is non-functional until APPROVED. Sequence the build so email + deploy ship first and SMS is feature-flagged on. Do not promise same-day SMS delivery in the funnel spec.
- The n8n Twilio node CANNOT send via a Messaging Service (no MessagingServiceSid field) — it only takes a literal `from` number. For compliant A2P 10DLC sending at scale you MUST drop to an HTTP Request node hitting Twilio's REST API. Using a bare `from` number outside a registered Messaging Service risks carrier filtering/blocking of unregistered A2P traffic.
- Twilio statusCallback's type-def description in n8n is mislabeled ('Rooms, Recordings and Compositions') — it's a copy-paste bug. It DOES deliver SMS MessageStatus. Don't be misled into thinking SMS status callbacks are unsupported.
- The Twilio send node output status is 'queued'/'accepted' — that is NOT proof of delivery. Delivery confirmation only arrives asynchronously on the statusCallback webhook (delivered/undelivered/failed). Logging 'sent' to CRM off the send node is a false success signal.
- If you use a raw Webhook node for Stripe (instead of the Stripe Trigger), n8n may parse/normalize the body and BREAK HMAC verification — the signature is computed over exact raw bytes. You MUST set options.rawBody:true and verify against the raw buffer. Same trap for SendGrid ECDSA. Easiest correct path: use the Stripe Trigger node, which verifies internally.
- Stripe and SendGrid and Twilio all redeliver webhooks (at-least-once). Without an idempotency key (Stripe event.id, Twilio MessageSid, SendGrid sg_event_id) checked against the Data table, you will double-send/double-log. Idempotency is mandatory, deterministic, and lives in code — not the LLM.
- TCPA requires PRIOR EXPRESS WRITTEN CONSENT for marketing SMS. The lead form MUST capture an explicit consent checkbox (unchecked by default) with disclosure language, and that consent flag must gate the SMS IF-branch. No consent = no SMS, enforced in config, never inferred by the agent.
- CAN-SPAM physical address + unsubscribe must be STATIC template config. If the rebrand agent generates email body/footer per-lead, it can omit them and create per-send legal liability. Lock address + unsubscribe into the SendGrid dynamic-template footer, outside the agent's generation surface.
- The live n8n has zero credentials — every newCredential('...') reference is net-new and the human must populate secrets out-of-band before first run. The workflow will validate but fail at runtime until twilioApi/sendGridApi/stripeApi secrets exist.
- Always return 2xx FAST to Twilio/SendGrid/Stripe webhooks (respondToWebhook responseCode 200) before heavy downstream work, or they treat it as failure and retry, compounding duplicate processing.
- Pin Stripe Trigger apiVersion explicitly — leaving it empty means Stripe uses the account default, which can silently change payload shape and break downstream expressions.

**Funnel application:** For the King Maker funnel, this layer is the 'last mile' that turns a rebranded demo into a delivered prospect touch and a logged lead. The happy path: lead form Webhook -> normalize/enrich -> consent IF-gate -> Claude rebrand agent (out of scope here) deploys to contractor-template-preview.vercel.app/preview/<niche> -> SendGrid sends the demo URL via a dynamic template (fromName = niche brand, contentValue/templateId carrying the live link) -> IF consent==true AND 10DLC approved, Twilio/HTTP sends the same link by SMS -> Data table logs lead + channel + message SID + status. Two inbound webhooks (Twilio statusCallback, SendGrid Event Webhook) close the loop with delivered/bounced/failed, updating the CRM row so the operator knows which prospects actually received the demo. The Stripe leg gates monetization: when a contractor pays ($497/mo DFY), the Stripe Trigger (signature-verified, idempotent) flips the lead to customer and can trigger provisioning. The hard rule this brief enforces: every compliance decision (consent, signature, idempotency, CAN-SPAM footer) is deterministic n8n config/code so the metered Claude agent never makes a legal call — the agent rebrands pixels, the spine enforces law.

**Reference**

##### Delivery + Compliance Layer — Specialist Reference

###### SMS (Twilio) — the 10-15 day gated leg
**Out-of-band first (blocks everything):** paid Twilio account -> Trust Hub Customer Profile -> **Brand** registration (TCR: minutes-hours) -> **Campaign** registration (TCR vetting **10-15 days** currently) -> attach 10DLC number to a **Messaging Service**. OTP-verify the business mobile within 24h. A Messaging Service is **required** for A2P traffic. Build the workflow now; keep the SMS branch feature-flagged dark until campaign status = APPROVED.

**Node reality:** `n8n-nodes-base.twilio` v1 (`resource:'sms', operation:'send'`) exposes only `from`, `to`, `toWhatsapp`, `message`, `options.statusCallback`. **There is no MessagingServiceSid field.** To send through the Messaging Service (the compliant path), use an **HTTP Request** node:
```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json
contentType: form-urlencoded
body: MessagingServiceSid=MGxxxx & To={{e164}} & Body={{demoUrl}} & StatusCallback={{cbUrl}}
auth: predefinedCredentialType -> twilioApi
```
The send response is `status:'queued'|'accepted'` — **not** delivery. Real outcome arrives async on the **StatusCallback** webhook (`MessageStatus`: delivered/undelivered/failed, form-urlencoded). Wire a 2nd Webhook node to receive it and update the CRM row.

**TCPA gate (deterministic):** lead form must capture an unchecked-by-default consent checkbox with disclosure. Gate SMS behind `n8n-nodes-base.if` v2.3 on `consent==true`. No LLM judgment.

###### Email (SendGrid) — pre-send DNS + CAN-SPAM
**Out-of-band:** SendGrid **Automated Security** emits CNAME records (`em123.domain.com`) the human publishes at DNS; SendGrid then maintains SPF/DKIM/DMARC. Unauthenticated = spam folder.

**Node:** `n8n-nodes-base.sendGrid` v1 (`resource:'mail', operation:'send'`). Prefer `dynamicTemplate:true` + `templateId` + `dynamicTemplateFields.fields[{key,value}]` so the rebrand agent only injects variables, never raw HTML. Static footer in the template carries the two **CAN-SPAM** musts: valid physical postal address + clear unsubscribe (honored ≤10 business days, link live ≥30 days). Credential: `sendGridApi`.

**Delivery loop:** enable the **Event Webhook** (signing OFF by default — turn it ON per subscription). Headers `X-Twilio-Email-Event-Webhook-Signature` (ECDSA base64) + `-Timestamp`; verification needs **raw body bytes**, so the receiving Webhook node must set `options.rawBody:true`. Events: delivered/open/click/bounce/dropped/spamreport/unsubscribe.

###### Payments (Stripe) — signature + idempotency, code not LLM
**Prefer `n8n-nodes-base.stripeTrigger` v1** — it auto-creates the endpoint and **verifies the signature internally**. Set `events:['checkout.session.completed','invoice.paid','payment_intent.succeeded','invoice.payment_failed']` and **pin `apiVersion`** (empty = account default, payload can drift). Credential `stripeApi`.

If you instead use a raw Webhook (to control rawBody), verify in a **Code** node (`mode:'runOnceForEachItem'`):
1. Parse `Stripe-Signature` = `t=<sec>,v1=<hex>`.
2. `signedPayload = t + '.' + rawBody`.
3. HMAC-SHA256(signedPayload, whsec_secret); **constant-time** compare to v1.
4. Reject if `now - t > 300s` (5-min tolerance; never 0).
Requires `Webhook.options.rawBody:true`. The Crypto node (`action:'hmac', type:'SHA256'`) can compute the digest but lacks timing-safe compare + tolerance — do the full check in Code.

**Idempotency (mandatory):** Stripe/Twilio/SendGrid all redeliver. Before processing, look up the event key (`event.id` / `MessageSid` / `sg_event_id`) in the Data table; skip if seen.

###### CRM (Data table)
`n8n-nodes-base.dataTable` v1.1 (`resource:'row', operation:'insert'`): `columns.mappingMode:'defineBelow'` with `schema[{id,displayName,type:'string',canBeUsedToMatch:true}]`, `dataTableId:{__rl:true,mode:'name',value:'leads'}`. Persists across runs, supports match-lookup for idempotency. Output `{id,createdAt,updatedAt}`.

###### Hard reality
`list_credentials` = **0 credentials**. Every `newCredential('...')` is net-new; secrets populated out-of-band before first run. Webhooks must ACK 2xx fast (`respondToWebhook` code 200) or senders retry and duplicate. The architect's handoff to the n8n agent must enumerate: credential creation, the HTTP-Request-for-Messaging-Service workaround, rawBody flags, the consent IF-gate, the idempotency lookup, and the static CAN-SPAM footer — all deterministic, none delegated to the rebrand agent.


---

# Part II — The Deliverables

The end-to-end funnel design + the two one-block handoff prompts. (Also extracted standalone to `FUNNEL_HANDOFF_PROMPTS.md`.)

---

## King Maker Lead-to-Demo Funnel — Complete n8n Node-by-Node Design

> End-to-end production spec for the King Maker funnel: lead webhook → enrich → branch → async metered Claude rebrand (Wait/resumeUrl) → Twilio SMS + SendGrid email delivery → CRM log, with the async-timeout solution, idempotency claim, and compliance gates named at the node level. Includes the two self-contained executor handoff prompts.

#### King Maker Lead-to-Demo Funnel — Complete n8n Design (node-by-node)

**Architect deliverable.** This is the validated black-box design. I (the Specialist) author + `validate_workflow` the SDK code; the **n8n executor agent** runs `create_workflow_from_code`/`publish_workflow` against the live instance, and the **deployment/rebrand agent** implements the rebrand+deploy service that consumes `callbackUrl` and POSTs back. I never mutate the live instance.

---

##### 0. Architecture decision: WHY two workflows (the async/timeout solution)

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

##### WORKFLOW A — INTAKE

###### A1 · Webhook — "Lead Form Intake"
- `type` `n8n-nodes-base.webhook` · **v2.1**
- Params: `httpMethod:'POST'` · `path:'km-lead'` · `responseMode:'responseNode'` *(MANDATORY — without it the Respond node is silently inert and the form hangs on the default onReceived ack)* · `authentication:'none'` (the public lead form posts cross-origin; lock with `options.allowedOrigins` to the Vercel preview origin, optional `options.ignoreBots:true`)
- **Output:** `{ headers, params, query, body, webhookUrl, executionMode }` — lead fields land under `$json.body` (but some clients put them on `$json` directly → normalize next).

###### A2 · Set — "Normalize Lead" (`mode:'manual'`)
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

###### A3 · Data table — "Claim Lead" (idempotency, **claim BEFORE work**)
- `type` `n8n-nodes-base.dataTable` · **v1.1** · `resource:'row'` · `operation:'upsert'`
- `dataTableId:{ __rl:true, mode:'name', value:'km_leads' }`
- `matchType:'allConditions'` · `filters.conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue: {{ $('Normalize Lead').item.json.idempotencyKey }} }]`
- `columns` (ResourceMapper, `mappingMode:'defineBelow'`, **`matchingColumns:['idempotencyKey']`** — upsert REQUIRES a matching column): `idempotencyKey, businessName, niche, email, phone, city, state, consentSms, status:'claimed', demoUrl:'', leadReceivedAt`. **Never seed a custom `id`** — the row id auto-generates.
- **Why upsert not insert:** a re-fired webhook for the same email matches the existing row and updates it in place instead of spawning a duplicate claim. To branch new-vs-dup, prefer the explicit two-step: `operation:'rowExists'` (filter on key) → IF; if new, insert + proceed; if exists, short-circuit to Respond 202. (Upsert alone is the compact path; the rowExists→IF path is the auditable one — executor picks per preference. Either way the claim happens here, before B is fired.)

###### A4 · IF — "Is New Lead?"  *(only on the rowExists path)*
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'strict'}, conditions:[{ leftValue: {{ $json.rowExists }}, operator:{type:'boolean', operation:'false'} }] }`
- `.onTrue` → A5 (fire worker). `.onFalse` → A6 directly (already building; do not re-fire — protects metered spend + prevents double-text).

###### A5 · Execute Sub-workflow — "Fire Rebrand Worker" (fire-and-forget)
- `type` `n8n-nodes-base.executeWorkflow` · **v1.3**
- `source:'database'` · `workflowId:{ __rl:true, mode:'list', value:'<WF_B_ID>' }`
- `mode:'each'` · **`options.waitForSubWorkflow:false`** ← the decoupling switch; A returns immediately, B runs minutes independently.
- `workflowInputs` (ResourceMapper → B's typed `executeWorkflowTrigger` contract): `idempotencyKey, businessName, niche, email, phone, city, state, consentSms`.

###### A6 · Respond to Webhook — "Ack 202"
- `type` `n8n-nodes-base.respondToWebhook` · **v1.5**
- `respondWith:'json'` · `responseBody: { "status":"accepted", "message":"Building your custom demo — you'll get a link by email shortly.", "leadId": {{ $('Normalize Lead').item.json.idempotencyKey }} }` · `options.responseCode:202`
- This is the node that actually frees the form's HTTP socket. Fast 202 is also what Twilio/SendGrid/Stripe inbound webhooks need so they don't retry-storm.

---

##### WORKFLOW B — REBRAND WORKER

###### B1 · Execute Workflow Trigger — "Worker Start"
- `type` `n8n-nodes-base.executeWorkflowTrigger` · **v1.1**
- `inputSource:'workflowInputs'` — the **typed input contract** (mirrors A5):
  `workflowInputs.values:[ {name:'idempotencyKey',type:'string'}, {name:'businessName',type:'string'}, {name:'niche',type:'string'}, {name:'email',type:'string'}, {name:'phone',type:'string'}, {name:'city',type:'string'}, {name:'state',type:'string'}, {name:'consentSms',type:'boolean'} ]`

###### B2 · HTTP Request — "Enrich Lead"
- `type` `n8n-nodes-base.httpRequest` · **v4.4** · `executeOnce:true`
- `method:'GET'` · `url:` Places/Clearbit endpoint with `{{ $json.businessName }}` + `{{ $json.city }}`.
- `authentication:'genericCredentialType'`, `genericAuthType:'httpHeaderAuth'` (or `httpQueryAuth`), `credentials:{ httpHeaderAuth: newCredential('Enrichment') }` — **never inline the key.**
- `options.timeout:15000` · `options.response.neverError:true` (a dead enrichment must not kill the lead — gate next).
- `.onError('continueRegularOutput')` so partial enrichment still proceeds with the form fields.

###### B3 · IF — "Consent & Quality Gate"
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'strict'}, conditions:[ { leftValue: {{ $('Worker Start').item.json.email }}, operator:{type:'string', operation:'exists'} }, { leftValue: {{ $('Worker Start').item.json.email }}, operator:{type:'string', operation:'contains'}, rightValue:'@' }, { leftValue: {{ $('Worker Start').item.json.niche }}, operator:{type:'string', operation:'notEmpty'} } ] }`
- `.onTrue` → B4. `.onFalse` → DataTable update `status:'rejected'` → **Stop and Error** (`n8n-nodes-base.stopAndError` v1, `errorType:'errorMessage'`, `errorMessage:'Junk/incomplete lead — no email or niche'`) so the Error WF logs the dropped paid lead. *(Note: TCPA consent is enforced separately at the SMS leg in B9, not here — a no-SMS-consent lead still gets the email demo, so consent must NOT block the whole worker.)*

###### B4 · Switch — "Route by Niche"
- `type` `n8n-nodes-base.switch` · **v3.4** · `mode:'rules'`
- `rules.values[]` — one rule per trade, `outputKey` = niche, each a full `conditions` object equals-match on `{{ $('Worker Start').item.json.niche }}`:
  `hvac, plumbing, roofing, electrician, painter, kitchen-remodel, general-contractor, landscaping, hardscape` (indices 0–8).
- `options.fallbackOutput:'extra'` (index 9, `renameFallbackOutput:'Unknown Niche'`) — **without this, unmatched niches are silently DROPPED.** Fallback → DataTable `status:'unknown_niche'` → Stop and Error.
- Each `.onCase(i, …)` flows into B5. (Routing exists to inject the correct per-niche preset id/theme defaults into the spec; the 9 cases converge on the same B5→B6 path with the niche carried.)

###### B5 · Code — "Build Rebrand Spec" (legitimate Code-node use: JSON assembly)
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

###### B6 · HTTP Request — "Invoke Rebrand+Deploy Service" (hands off `resumeUrl`)
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

###### B7 · Wait — "Await Deploy Callback" (the async park)
- `type` `n8n-nodes-base.wait` · **v1.1**
- `resume:'webhook'` · `httpMethod:'POST'` · `responseMode:'onReceived'` (ACK the runner's callback instantly).
- **`limitWaitTime:true`, `limitType:'afterTimeInterval'`, `resumeAmount:15`, `resumeUnit:'minutes'`** — bounds the park so a hung deploy fails the lead instead of parking forever. (Keep `EXECUTIONS_TIMEOUT=-1`/large on the worker so the global timeout can't kill the pause mid-wait — see §11.)
- `incomingAuthentication:'none'` (the runner authenticates via the unguessable resumeUrl token; add `basicAuth` if hardening).
- **After resume, the callback payload lands under `$json.body`, NOT bare `$json`.** Read `{{ $json.body?.demoUrl ?? $json.demoUrl }}`, `{{ $json.body?.status ?? $json.status }}`, `{{ $json.body?.commitSha }}`. Carry the idempotency key across the Wait via the node reference `{{ $('Worker Start').item.json.idempotencyKey }}` (NOT `$json`).

###### B8 · IF — "Deploy Succeeded?"
- `type` `n8n-nodes-base.if` · **v2.3**
- `conditions:{ combinator:'and', options:{caseSensitive:true, typeValidation:'loose'}, conditions:[ { leftValue: {{ $json.body?.status ?? $json.status }}, operator:{type:'string', operation:'equals'}, rightValue:'deployed' }, { leftValue: {{ $json.body?.demoUrl ?? $json.demoUrl }}, operator:{type:'string', operation:'notEmpty'} } ] }`
- **Two failure modes converge on `.onFalse`:** (a) the runner POSTed back `status:'verify_failed'` (build/tsc/Playwright gate failed — a green build with a failed a11y pass is NOT deployed), or (b) the Wait timed out and resumed with the **pre-Wait item** (no callback body → `demoUrl` empty).
- `.onFalse` → B-fail: DataTable update `status:'deploy_failed'` → Stop and Error (`'Rebrand deploy failed or timed out for '+idempotencyKey`) → Error WF alerts. **Never SMS/email a broken or empty URL.**
- `.onTrue` → B-mark (B8.5) then fan-out.

###### B8.5 · Set — "Stage Delivery Payload" (`mode:'manual'`, `executeOnce:true`)
- Pins the values every fan-out branch needs onto one clean item so each side-effect reads stable fields (not the post-IF `$json`):
  `demoUrl = {{ $json.body?.demoUrl ?? $json.demoUrl }}`, `commitSha = {{ $json.body?.commitSha }}`, plus `email/phone/businessName/niche/consentSms/idempotencyKey` via `{{ $('Worker Start').item.json.* }}`.

###### Fan-out (independent side-effects; **each `.onError('continueRegularOutput')`** so one channel failing never blocks the rest)

###### B9a · SendGrid — "Email Demo Link" (ships first; not gated on 10DLC)
- `type` `n8n-nodes-base.sendGrid` · **v1** · `resource:'mail'` · `operation:'send'` · `executeOnce:true`
- `fromEmail:'demos@kingmaker…'`, `fromName: {{ $json.businessName }}` (niche brand), `toEmail: {{ $json.email }}`, `subject:'Your custom '+niche+' website demo is live'`.
- **`dynamicTemplate:true`, `templateId:'<SG_TEMPLATE_ID>'`** with `dynamicTemplateFields.fields:[{key:'demo_url',value:{{ $json.demoUrl }}}, {key:'business_name',value:{{ $json.businessName }}}]`. **CAN-SPAM physical mailing address + working unsubscribe live STATICALLY in the SendGrid template footer** — outside the agent's generation surface, so a per-lead body can never omit them. (If not using a template: `contentType:'text/html'`, `contentValue` REQUIRED, and the footer must be inlined.)
- `credentials:{ sendGridApi: newCredential('SendGrid') }` · Output `{messageId}`.

###### B9b · IF — "SMS Consent + 10DLC Live?" → HTTP Request — "Send SMS (Twilio REST)"
- IF (`n8n-nodes-base.if` v2.3): `conditions` AND → `{{ $json.consentSms }}` boolean `true` **AND** a config flag `{{ $vars.tenDlcApproved }}` boolean `true`. **TCPA requires prior express written consent**, captured as an unchecked-by-default checkbox on the lead form and stored in CRM; no consent ⇒ no SMS, enforced here in config — never inferred by the agent. (10DLC campaign vetting is ~10–15 days; ship email first and feature-flag SMS on at approval — do not promise same-day SMS.)
- `.onTrue` → **HTTP Request** `n8n-nodes-base.httpRequest` v4.4 (NOT the Twilio node) · `executeOnce:true`:
  - **Why HTTP not the Twilio node:** the n8n Twilio v1 node exposes only a literal `from` number — **no `MessagingServiceSid` field** (verified against the live schema). Compliant A2P 10DLC sending at scale REQUIRES the Messaging Service, so we drop to Twilio's REST API.
  - `method:'POST'` · `url:'https://api.twilio.com/2010-04-01/Accounts/{{ $vars.twilioAccountSid }}/Messages.json'`
  - `authentication:'predefinedCredentialType'`, `nodeCredentialType:'twilioApi'` (reuse the Twilio credential — account SID/auth token).
  - `contentType:'form-urlencoded'`, `bodyParameters`: `MessagingServiceSid={{ $vars.twilioMessagingServiceSid }}` (the registered 10DLC campaign sender — bare numbers get carrier-filtered) · `To={{ $json.phone }}` · `Body='Your custom '+businessName+' site is ready: '+{{ $json.demoUrl }}` · `StatusCallback={{ $vars.webhookBase }}/twilio-status`.
  - Twilio's send response status is `queued`/`accepted` — **NOT proof of delivery.** Do not log "delivered" off this node (see §9 status webhook).

###### B10 · Data table — "Log Delivery" (CRM row finalize)
- `type` `n8n-nodes-base.dataTable` · **v1.1** · `resource:'row'` · `operation:'upsert'` · `executeOnce:true`
- `dataTableId:{ __rl:true, mode:'name', value:'km_leads' }` · `matchType:'allConditions'` · `filters.conditions:[{ keyName:'idempotencyKey', condition:'eq', keyValue:{{ $json.idempotencyKey }} }]` · **`columns.matchingColumns:['idempotencyKey']`**.
- Columns: `status:'delivered'`, `demoUrl`, `commitSha`, `emailMessageId:{{ $('Email Demo Link').item.json.messageId }}`, `smsSid:{{ $('Send SMS (Twilio REST)').item.json.sid }}`, `smsStatus:'queued'`, `deliveredAt:{{ $now.toISO() }}`.

---

##### WORKFLOW C — ERROR HANDLER (bound as the project **Error Workflow**)
- **C1 Error Trigger** `n8n-nodes-base.errorTrigger` v1 (no params; receives `{execution, workflow, error}` on ANY failure of bound workflows — including the Stop-and-Error fails above).
- **C2 Set** — summarize: workflow name, failed node, `error.message`, `execution.id`, and the lead `idempotencyKey` if present.
- **C3 Slack** — post to a **DLQ channel** so no paid/metered lead silently drops. (Slack node `n8n-nodes-base.slack`, or HTTP to a webhook.) Bind C as Error Workflow on A **and** B in each workflow's Settings.

---

##### 9. Inbound: Twilio Status Callback (closes the SMS delivery loop)
Separate tiny workflow: **Webhook** v2.1 (`POST`, `path:'twilio-status'`, `responseMode:'responseNode'`, `options.rawBody:true`) → **Respond 200 fast** (Twilio retries on slow/non-2xx) → **Data table upsert** on `smsSid = {{ $json.body.MessageSid }}` setting `smsStatus = {{ $json.body.MessageStatus }}` (delivered/undelivered/failed). Idempotent on `MessageSid` (at-least-once redelivery). This is the ONLY authoritative "SMS delivered" signal.

##### 10. Inbound: Stripe payment gate (lead → paying customer)
Separate workflow: **Stripe Trigger** `n8n-nodes-base.stripeTrigger` v1, `events:['checkout.session.completed']`, **`apiVersion` PINNED** (empty = account default = silent payload drift), `credentials:{stripeApi:newCredential('Stripe')}`. The Trigger **registers + verifies the signature internally** — do NOT hand-roll HMAC on the Stripe *action* node (it's outbound-only, no signature params). Idempotent on `event.id`. → Data table upsert flips `status:'customer'`. For any outbound Stripe REST charge needing idempotency, call the REST API via HTTP Request and set the `Idempotency-Key` header yourself (keyed on lead/execution id) — it is not a node param.

---

##### 11. Cross-cutting locks (non-negotiable, encoded at design time)

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

##### 12. Validated SDK skeleton (Workflow A + B spine — the executor's starting code)

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

##### 13. The two executor handoff prompts (self-contained, fenced)

###### 13a. → n8n executor agent

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

###### 13b. → deployment / rebrand agent

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

##### What this is

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

##### Why the contract is shaped this way (architect notes — not part of the prompt)

- **`status` is an enum, not a boolean.** The funnel must route `verify_failed` / `deploy_failed` / `input_invalid` to the Error-Workflow/DLQ and the SMS+email fan-out only on `deployed` — a boolean would force n8n to infer failure modes. The digest's "do not claim deployed on a build/verify failure" gotcha is enforced at the contract level.
- **`schema: "kingmaker.rebrand.result.v1"` is a constant** so the n8n IF/Switch can assert the version before reading fields — cheap insurance against silent shape drift (the same discipline the digest urges for pinning Stripe `apiVersion`).
- **`demoUrl` vs `previewDeploymentUrl` are split** because the Twilio/SendGrid body wants the `/preview/<niche>` deep link but CRM/debugging wants the bare deployment URL. Both are returned so n8n never has to string-munge.
- **`leadId` doubles as branch name and idempotency key**, matching the digest's "claim the idempotency key BEFORE doing work" and "never double-deploy a second Vercel preview for the same lead" gotchas. The agent short-circuits on replay.
- **`callbackUrl = {{ $execution.resumeUrl }}`** is passed in the launching HTTP Request body (it only exists once the Wait node is reached at runtime) — the agent POSTs back to resume the parked execution, which is the async bridge that keeps the multi-minute rebrand from blowing the ~30s webhook ceiling.
- **Per-lead branch isolation** is the one architectural correction the raw digest under-specifies: because `/preview/<niche>` is a single app over shared config files, an in-place rebrand would race across concurrent leads in the same trade. Branch-per-`leadId` + branch-preview deploy makes concurrent leads safe and makes the returned URL uniquely the lead's.

All field names in the input contract (`BUSINESS`, `GEOGRAPHY`, `NicheTheme`) and the 9 niche slugs were verified against the live template at `...\cranky-colden-ebfbb4\web\lib\data.ts`, `lib\site.config.ts`, `lib\presets\types.ts`, `lib\presets\*.ts`, `app\globals.css`, and `lib\preview-niche.ts`.


---

# Part III — Critic: Gaps, Corrections, Risks, Next Steps

## Gaps

| Area | Missing | Why it matters |
|---|---|---|
| Async fire-and-forget durability (Q1) | The whole async design rests on Workflow A calling Workflow B with options.waitForSubWorkflow:false, then A returning a 202 and finishing. But under the LOCKED substrate EXECUTIONS_MODE=regular (single main process, no queue/Redis workers), a fire-and-forget sub-execution is run as a detached job inside the SAME process. There is a well-known n8n behavior where detached sub-workflow executions are not guaranteed to survive/complete independently of the caller in regular mode the way they do in queue mode, and they are not visible/retriable as their own execution the same way. Nothing in the deliverables verifies that B actually runs to completion (through a 15-min Wait!) after A returns. The §12 test plan tests B in isolation via test_workflow, which does NOT exercise the A->B fire-and-forget handoff at all. This is the single highest-risk unproven assumption. | If B is killed or never starts when A returns, the lead is claimed in the DataTable (status='claimed') but never deployed, never emailed, and the Error Workflow never fires (no error was thrown) — a silent paid-lead drop, exactly the failure mode the design claims to prevent. Verified: executeWorkflow v1.3 exposes options.waitForSubWorkflow (default true); the param is real, but its detached-execution semantics under regular mode are the unaddressed gap. |
| Idempotency key choice (Q2) | The idempotency key is hardcoded as lowercased-trimmed email ({{ ($json.body?.email ?? $json.email ?? '').toLowerCase().trim() }}). Failure modes not handled: (a) empty email -> key='' -> every email-less lead collides into ONE row and only the first ever gets a demo; the Quality Gate in B rejects empty-email leads AFTER the claim, but the claim already poisoned the key for all of them. (b) Shared/role emails (info@, office@) -> two genuinely different businesses collide and the second is silently treated as a duplicate (no second worker fired, no demo). (c) A legitimate re-submission with a corrected niche/city but same email is dropped as a dup, so the lead can never fix their own submission. (d) Provider event-id / Idempotency-Key header is mentioned in the brief as 'prefer' but the deliverables drop it entirely for email. | Idempotency correctness is an explicit review target. Email-as-key trades double-charge protection for false-duplicate suppression of real leads — a worse failure for a lead-gen funnel than an occasional double-text. At minimum the key should be email+niche+a coarse timestamp bucket, or a client-supplied submission UUID, with empty-email leads routed to a non-colliding key. |
| Stripe & SendGrid signature verification are described but not actually wired (Q3) | The deterministic compliance claim is only half-built in the deliverables. (a) Stripe: the deliverables correctly use stripeTrigger v1 (verified: it registers + verifies signature internally, has events[] + apiVersion). Good. BUT the briefs' detailed raw-webhook HMAC fallback (Code node: t+'.'+rawBody, HMAC-SHA256, 300s tolerance, constant-time compare, Webhook options.rawBody:true) is NOT present in either handoff prompt's build steps — if the executor ever chooses the raw-webhook path (the prompt says 'if you ever ingest Stripe via a raw Webhook'), there is no concrete spec to implement and the LLM-executor would have to invent it. (b) SendGrid Event Webhook signature (X-Twilio-Email-Event-Webhook-Signature ECDSA + rawBody:true) is specified in the delivery brief but the deliverable's SendGrid inbound webhook (§6c in the 2nd prompt) sets rawBody:true yet specifies NO actual ECDSA verification step — it just upserts the event. So inbound delivery-status webhooks are unauthenticated and spoofable. | Q3 asks whether compliance gates are deterministic and not left to the LLM. Stripe-via-Trigger is deterministic and correct. But the SendGrid/Twilio inbound status webhooks accept unauthenticated POSTs (authentication:'none', no signature check), so anyone who learns the public path can forge 'delivered'/'customer' status or inject rows. The HMAC discipline the briefs emphasize is not carried into the actual node specs. |
| Rebrand agent output contract is self-contradictory across the two prompts (Q4) | There are TWO different, incompatible OUTPUT contracts for the same rebrand agent. (A) The funnel-design §13b prompt: flat envelope { status:'deployed', demoUrl, commitSha, idempotencyKey } and n8n reads {{ $json.body?.demoUrl ?? $json.demoUrl }} and {{ $json.body?.status ?? $json.status }}. (B) The standalone rebrand-agent prompt: a richer FIXED schema { schema:'kingmaker.rebrand.result.v1', leadId, niche, status, demoUrl, previewDeploymentUrl, branch, commitSha, model, idempotentReplay, verify:{tsc,build,playwright,axeCritical,axeSerious,homeHeightPx}, warnings[], reason, costUsd, finishedAt }. Also the key name differs: prompt A keys idempotency as 'idempotencyKey'; prompt B keys it as 'leadId'. The n8n Wait/IF nodes in the design ONLY read status + demoUrl and carry 'idempotencyKey' from $('Worker Start') — they never read leadId, schema, or verify{}. If the agent is built from prompt B but n8n is built from the design, the contract still parses (n8n only needs status+demoUrl, both present in B) — but the input contract diverges harder: design sends { idempotencyKey, niche, slug, rebrandSpec{...}, callbackUrl } whereas prompt B expects { leadId, callbackUrl, niche, business{...}, geography{...}, theme{...}, copy{...}, brands[], faqs[], images{} } — i.e. the design hands the agent a pre-assembled rebrandSpec, but prompt B expects the RAW structured lead and does its own mapping. The agent built from B would look for INPUT.business.name and get undefined because the design nested everything under rebrandSpec. | Q4 asks if the contract is strict enough for n8n to parse. The output side is loosely compatible by luck (status+demoUrl overlap), but the INPUT side is a hard mismatch: B5 'Build Rebrand Spec' (Code) emits {idempotencyKey, niche, slug, rebrandSpec{palette,identity,geography,copy,images}} while the rebrand agent prompt B expects flat business/geography/theme/copy at the top level keyed by leadId. One of the two must be rewritten or the agent crashes on first real lead. The 'strict, machine-parseable' claim is undermined by having two prompts that disagree on both the key name (leadId vs idempotencyKey) and the nesting (rebrandSpec wrapper vs flat). |
| Cost-per-lead is asserted but never actually produced in the deterministic path (Q5) | Both rebrand-agent prompts say to read usage.input_tokens/output_tokens and 'return them (or log per idempotencyKey) for cost-per-lead accounting,' and prompt B adds an optional costUsd field. But: (a) the n8n side never reads or stores costUsd — the DataTable 'leads' schema in the executor build prompt has no cost/token columns, and the Log Delivery node writes only status/demoUrl/commitSha/deliveredAt. So even if the agent returns costUsd, it is dropped on the floor. (b) costUsd is explicitly 'optional', so there is no deterministic guarantee it is ever computed. (c) The Sonnet-default/Opus-fallback decision is delegated to the agent's own judgment ('escalate to Opus ONLY if copy quality demands it') with no metering threshold or budget cap — there is no mechanism to prevent an Opus run on every lead, and no per-lead cost ceiling. | Q5 asks whether metered-cost reality is reflected. The model tiers are named but the accounting is aspirational: no column to store cost, no budget gate, no enforcement that Sonnet is actually the default at the API call (the agent could silently always pick Opus). For a metered Claude funnel this is the difference between a known and an unknown unit economic. |
| n8n param / security holes (Q6) | Several concrete issues verified against live schemas: (1) respondToWebhook v1.5 now has options.enableStreaming defaulting to TRUE for respondWith:'json'. The deliverables do not set enableStreaming:false on the 202 ack. A streamed JSON response to a plain form POST can break naive form clients expecting a single buffered JSON body and complicates the fast-ack guarantee. Set enableStreaming:false explicitly. (2) The Wait resume webhook (B7) uses incomingAuthentication:'none', relying solely on the unguessable resumeUrl token — acceptable, but the resumeUrl is passed in plaintext in the HTTP body to an EXTERNAL rebrand runner (B6) and embedded in WEBHOOK_URL public HTTPS; any logging/MITM on the runner side replays it. No HMAC on the callback body either, so the runner (or anyone who captures the resumeUrl) can POST a forged {status:'deployed', demoUrl:'https://attacker'} and the funnel will SMS/email that URL to the prospect. (3) $vars.tenDlcApproved / twilioAccountSid / twilioMessagingServiceSid / webhookBase: n8n 'variables' ($vars) are an Enterprise/paid-plan feature on n8n Cloud and are gated on self-host by license in some versions — the LOCKED substrate is Community self-host under Sustainable Use License, where $vars may be unavailable, silently returning undefined and producing a malformed Twilio URL (.../Accounts/undefined/Messages.json) and tenDlcApproved===true never true (SMS never sends, or worse, casts undefined). This needs verification on the target instance; safer to use a Set/config node or credentials, not $vars. (4) Switch 'Route by Niche': all 9 cases converge on one Build Rebrand Spec but the niche routing does literally nothing functional — every case runs identical code; the Switch only exists to catch unknown niches, which a single Set+allowlist (as the executor prompt itself admits) would do without 9 dead branches. Not a bug, but dead complexity that can mis-wire (an unwired case silently drops, per the verified builderHint). | Q6 asks for node param errors and security holes. The forgeable callback (no HMAC/shared-secret on the resume body) is the most serious: it lets an attacker drive the prospect-facing SMS/email to an arbitrary URL. The $vars licensing assumption and enableStreaming default are concrete param risks that will surface at runtime on the specified Community substrate. |
| Liveness/verify gate trust boundary (Q3/Q4) | The IF 'Deploy Succeeded?' trusts the runner's self-reported status:'deployed' + a non-empty demoUrl string. n8n never independently probes the demoUrl for HTTP 200. Prompt B's agent does a D3 liveness probe, but prompt A's agent (the §13b version) does not. If the runner reports 'deployed' with a stale/typo'd URL, n8n SMS/emails a dead link to the prospect. Cheap fix: a 1-node httpRequest HEAD on demoUrl (neverError:true) gating the fan-out. | The design's own principle is 'never SMS/email a broken or empty URL,' but it only enforces non-empty, not reachable. A self-reported status from an external service is not a verification. |

## Corrections

- MODEL ID — the Opus fallback string 'claude-opus-4-8' is not corroborated and contradicts the live n8n lmChatAnthropic v1.5 @builderHint, which states the most-capable choice is 'claude-opus-4-7' and that superseded IDs are invalid; default is 'claude-sonnet-4-6'. The deliverables only invoke Anthropic from the EXTERNAL rebrand runner (HTTP to api.anthropic.com), not the in-n8n Anthropic node, so n8n's model list does not directly gate it — but the prompt instructs the agent to send 'claude-opus-4-8' to the API. That exact string should be verified against api.anthropic.com at build time (the prompts do say to do this), and 'claude-opus-4-7' is the value n8n's own tooling currently recognizes. Treat 'claude-opus-4-8' as unverified.
- TWILIO CLAIM IS CORRECT — verified against live schema: n8n-nodes-base.twilio v1 (resource:sms, operation:send) exposes only from/to/toWhatsapp/message/options.statusCallback. There is NO MessagingServiceSid input field (the messaging_service_sid that appears is response-only output). The deliverables' decision to drop to HTTP Request -> Twilio REST Messages.json with MessagingServiceSid in a form-urlencoded body for A2P 10DLC compliance is the right call. Confirmed.
- STRIPE TRIGGER CLAIM IS CORRECT — verified: stripeTrigger v1 has events[] (includes 'checkout.session.completed') and apiVersion (its own description warns that empty = account default = drift). 'Pin apiVersion' and 'signature verified internally, do not hand-roll HMAC on the action node' are both accurate.
- WAIT NODE PARAMS ARE CORRECT — verified Wait v1.1 supports resume:'webhook', httpMethod, responseMode:'onReceived', incomingAuthentication:'none'|'basicAuth', limitWaitTime, limitType:'afterTimeInterval', resumeAmount, resumeUnit. The async-park spec is schema-valid. Note: there is no 'jwtAuth'-via-param for the resume webhook beyond basic/header in credentials; 'none' is what's specified and is valid.
- executeWorkflowTrigger INPUT-SOURCE CORRECTION in the core brief — the n8n-core brief says executeWorkflowTrigger uses inputSource:'passthrough'; the funnel-design deliverable correctly uses inputSource:'workflowInputs' with typed values[]. Verified: v1.1 default is 'workflowInputs' and each value is {name, type} (no id). The deliverable is right; the brief's 'passthrough' note is misleading for a typed contract.
- DATATABLE UPSERT — verified the upsert path requires filters.conditions (@minItems 1) + columns ResourceMapper. The deliverables correctly set matchType:'allConditions', filters.conditions[{keyName:'idempotencyKey',condition:'eq',keyValue}], and columns.matchingColumns:['idempotencyKey']. The 'never seed a custom id' rule matches the verified builderHint. Correct. (Note: matchingColumns lives under columns ResourceMapperValue, which the SDK skeleton does place correctly.)
- SWITCH FALLBACK — verified: options.fallbackOutput:'extra' creates the catch-all at index rules.values.length and default 'none' drops unmatched items; renameFallbackOutput only labels it. The deliverables' use is correct. One nuance: the SDK 'switchCase' rule objects in the design set outputKey WITHOUT renameOutput:true — the verified schema shows outputKey only displays when renameOutput:true. The .onCase(index,...) wiring is what actually routes, so this is cosmetic, but outputKey may not render as a label without renameOutput:true.

## Risks

- SILENT LEAD LOSS via fire-and-forget: if Workflow B does not durably run to completion after Workflow A returns 202 under EXECUTIONS_MODE=regular, the lead is claimed but never serviced and no error fires. This is the top risk and is entirely unverified by the provided test plan (which tests B standalone). Mitigation: prove the handoff end-to-end, or switch to Wait-resume within a SINGLE workflow, or move to queue mode for durable detached executions.
- FORGEABLE DEPLOY CALLBACK: the Wait resume webhook has no HMAC/shared-secret on the body; whoever holds the resumeUrl (passed plaintext to the external runner) can POST {status:'deployed', demoUrl:<arbitrary>} and the funnel will text/email that link to the prospect. Add a shared-secret header check (deterministic, in a Code/IF node) on the resume body.
- UNAUTHENTICATED INBOUND STATUS WEBHOOKS: Twilio status and SendGrid event webhooks are authentication:'none' with no signature verification implemented (despite rawBody:true being set for SendGrid). Spoofable status/row injection. Implement Twilio X-Twilio-Signature and SendGrid ECDSA checks, or restrict by IP.
- EMAIL-AS-IDEMPOTENCY-KEY suppresses real leads: empty/shared/role emails collide; corrected re-submissions are dropped as duplicates. A lead-gen funnel should bias toward servicing duplicates over silently dropping distinct leads.
- $vars LICENSING/AVAILABILITY: n8n variables may be unavailable on the LOCKED Community self-host substrate, yielding undefined in the Twilio URL and the tenDlcApproved gate. Verify on the target version or replace $vars with a config Set node / credentials.
- MODEL STRING 'claude-opus-4-8' / 'claude-sonnet-4-6' are passed to the Anthropic API by the runner with only a build-time 'verify the string' instruction; if unverified at deploy they 404 the model and every escalated lead fails verify_failed. The n8n node hint currently knows opus-4-7, not 4-8.
- NO COST CEILING / NO COST PERSISTENCE: costUsd is optional and never stored (no DataTable column); Opus escalation is the agent's unbounded judgment call. Unit economics are unobservable and uncapped.
- respondToWebhook enableStreaming defaults TRUE (v1.5): a streamed 202 may confuse form clients and muddies the 'instant single JSON ack' guarantee. Set enableStreaming:false.
- DEAD-LINK DELIVERY: fan-out gates on self-reported status+non-empty demoUrl, not on an actual HTTP 200 probe (in the §13b agent variant). A bad URL reaches the prospect.

## Next steps

- Prove the A->B fire-and-forget end-to-end on the actual target instance (regular mode): fire intake, confirm A returns 202 immediately AND B independently completes a full Wait+resume+fan-out. If B does not durably survive A's completion, collapse to a single-workflow Wait-resume design or adopt queue mode. Do this before any other fix — it invalidates the architecture if it fails.
- Reconcile the TWO rebrand-agent prompts into ONE: pick a single key name (idempotencyKey OR leadId, not both) and a single INPUT nesting (either n8n pre-assembles rebrandSpec and the agent consumes it, OR n8n sends the raw structured lead and the agent maps it). Then make the OUTPUT schema identical to what n8n reads (status + demoUrl at minimum) and have n8n actually store the richer fields (verify{}, costUsd) it currently discards.
- Add a deterministic shared-secret/HMAC check on the Wait resume body and on the Twilio/SendGrid inbound webhooks (Code or IF node, never the LLM). Add Twilio X-Twilio-Signature and SendGrid ECDSA verification with rawBody:true.
- Replace email-only idempotency with a non-colliding key (client submission UUID, or email+niche+coarse-time bucket) and route empty-email leads to a unique key so the Quality-Gate rejection does not poison other leads.
- Verify 'claude-opus-4-8' and 'claude-sonnet-4-6' against api.anthropic.com BEFORE deploy; add a hard per-lead cost ceiling and a DataTable column to persist costUsd/tokens so cost-per-lead is observable. Make Sonnet the enforced default with an explicit, logged escalation rule rather than free agent judgment.
- Set respondToWebhook options.enableStreaming:false on the 202 ack; add a 1-node HTTP HEAD liveness probe on demoUrl (neverError:true) gating the fan-out so a self-reported-but-dead URL never reaches the prospect.
- Confirm $vars availability on the Community self-host target; if unavailable, move tenDlcApproved/twilioAccountSid/twilioMessagingServiceSid/webhookBase into a config Set node or credentials.
- Either delete the 9-way Switch in favor of a single Set+allowlist (the executor prompt already offers this) or make the per-niche branches actually inject distinct preset defaults — the current 9 identical convergent branches are dead complexity with a silent-drop footgun on any unwired case.
