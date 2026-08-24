# HANDOFF — King Maker n8n Lead Funnel → N8N+Claude Architect 4

**From:** n8n-claude-architect ("Architect 2") · **To:** N8N+Claude Architect 4 · **Date:** 2026-06-05
**You own:** the n8n lead-funnel back-end + the Telegram lead-alert channel — workflow `Z86sufKPCE219sKP` on n8n Cloud. **Blackboard handle:** `n8n-claude-architect-1`. **Role note:** architect+builder are MERGED for n8n (Joseph's call) — you design *and* build, end-to-end. Cross-domain specialists stay separate (meta-ads, website-engineer, gamma).

---
## 0. DO THIS FIRST
1. **Reread this file in an ultrathink loop until a pass yields no new info (min 3 passes).** A dense handoff read once drifts — the 3rd read connects what the 1st missed.
2. **Check mailbox:** `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent n8n-claude-architect-1` → **ack ONLY what you actually handle** (unhandled mail must stay put).
3. **Confirm LIVE vs DRAFT before touching anything** (§2 — there is an unpublished fix waiting).
4. **🔴 THE ONE OPEN TASK → PUBLISH the name-fix.** The Map-node fix (read `first_name`/`last_name` into the name; map `concrete`/`fencing`→`hardscape`) is applied to the **DRAFT + verified (exec 13)** but **NOT published**. The ACTIVE version (`b9db09ce`) still renders a **blank name**. **First action: get Joseph's eyeball → `publish_workflow` → re-test.** The ad is PAUSED, so no live lead is hitting the bug yet — but it must be published before un-pause.

---
## 1. What this is — one paragraph
King Maker runs Meta lead ads for NC contractors (roofing/HVAC/etc). A lead submits the FB form → n8n catches it via webhook → fetches the full lead via the Graph API → builds TWO personalized URLs (a **demo site** + a **Traffic Deck** of real local search data) → fires a **Telegram alert to JOSEPH** with the lead's info + both links. Joseph calls the lead as a real local human, *then* forwards the demo manually ~90 min–2 hr later. **The alert-to-Joseph IS the product.** SMS was abandoned (10DLC = ~1-week registration, dead-end); Joseph texts leads by hand (P2P, no 10DLC).

---
## 2. ⭐ CURRENT STATE — the trap here is LIVE-vs-DRAFT. Read slowly.
| Thing | State |
|---|---|
| Workflow | `Z86sufKPCE219sKP` "KingMaker - Funnel (v2)" · n8n Cloud `jspells.app.n8n.cloud` · **ACTIVE** · 33 nodes |
| **Active/published version** | `b9db09ce-f517-466c-9e71-7407b158bd60` — has demo+deck+raw-phone, **but NOT the name fix → blank-name bug is LIVE** |
| **Draft (unpublished)** | name fix + `concrete`/`fencing`→`hardscape` applied + verified (exec 13). **PUBLISH PENDING Joseph eyeball.** |
| Meta ad | **PAUSED at $0.** Live-ready form = `1294950699014325` (Higher-Intent). meta-ads will confirm the live form_id at go-live. |
| DEAD forms | v3 `845962748126299`, v4 `1017836307258549` — do NOT reference |
| Telegram alert | chat `8382218041` (Joseph) · bot `@KMLead_bot` (id 8920126295). Verified live (exec 8 real webhook; exec 13 name fix) |
| Demo engine (website-engineer) | `contractor-template-preview.vercel.app/preview/<niche>?biz=&city=&phone=` — LIVE. **404s on an unmapped niche (no graceful fallback)** |
| Traffic Deck (gamma) | `kingmaker-growth-plan.vercel.app/?business=&city=&niche=&phone=` — LIVE w/ STATIC NC county SEO data. `/control.html` = pw-gated panel |

**Live form `1294950699014325` field_data keys:** `trade, first_name, company_name, phone_number, email`. **NO `full_name`, NO `city`, NO `last_name`** (exec 12+13 confirm).

**The funnel has TWO intake paths — only the Meta one is live/relevant:**
- **Meta path (LIVE):** `FB Verify (GET)`+`FB Leadgen (POST)` webhooks (path `fb-leadgen`) → `Fetch Lead` (Graph API) → **`Map Meta Lead`** (Code node — THE node you edit) → **`Notify Joseph (Meta Lead)`** (Telegram).
- **Landing path (DORMANT, no source):** `Lead Form Intake` (path `km-lead`) → `Normalize Lead` → … → `Claim Lead` → `Notify Joseph (Telegram)`. Uses an OLD schema (businessName/niche/email/phone/city/state). The demo/deck logic is NOT in this path. Ignore unless a landing source appears.

**Disabled nodes (KEEP DISABLED):** `Invoke Rebrand Runner`, `Email Demo Link` (SendGrid), `Send SMS (Twilio REST)`. They're obsolete (replaced by the URL approach) AND `Email Demo Link` must never fire (constraint §4). Publishing requires them disabled.

---
## 3. Open tasks + Definition of Done
1. **🔴 PUBLISH the name fix.** DoD: `publish_workflow` succeeds, `activeVersionId` updates, a `first_name` test lead renders the name in the Telegram alert. (Verified in draft = exec 13 "Dale Hooper".)
2. **⚠️ City-less deck (cross-team, flag don't fix).** The live form dropped `city`; the Traffic Deck's local data is keyed by city, so a city-less lead → generic deck. DoD: meta-ads/gamma/Joseph decide — add `city` back to the form, OR confirm the deck degrades gracefully. (n8n already passes `city=` empty, no 404.)
3. **Minor polish:** the alert shows empty `📍 / 🌐 Site / 🎯 Pain` lines for forms lacking city/website_status/biggest_challenge. Optional: conditionally hide empty lines in `Map Meta Lead` (build the alert text there instead of static).
4. **Watch the final pre-launch test.** meta-ads will fire ONE Lead Ads Testing Tool lead on the FINAL shipping form right before Joseph flips live + ping you — inspect that execution (name + niche + demo + deck + Telegram).
5. **Cleanup (low priority):** delete the 3 obsolete disabled Phase-2 nodes.

---
## 4. Locked decisions (DO NOT relitigate) + why
- **Alert channel = Telegram, not SMS.** US A2P 10DLC = ~1-week registration on every provider; Joseph texts leads manually (P2P). *Why: speed-to-launch + the moat is a human, not automation.*
- **Demo + deck go to JOSEPH ONLY — never auto-sent to the lead.** `Email Demo Link` stays disabled; no auto-send-to-lead. Joseph calls first, forwards the demo ~90min–2hr later. *Why (km-sales-motion-doctrine): an instant demo feels automated and kills the "real local person" effect.*
- **No AI dialer / VAPI — human calls only.** *Why: the moat is Joseph being a real local person.*
- **Immediate generation + delivery of demo/deck to Joseph is correct — leave the Telegram flow exactly as-is.** The ~90min delay is Joseph's manual forward, NOT a system delay.
- **DataForSEO = STATIC, no n8n trigger.** gamma pre-pulled all 100 NC counties × 9 niches (25-mi radius) into the deck; the deck reads it from `city`+`niche` in the URL. *Why: zero race/latency at launch; n8n just passes the params.*
- **Map must emit ONLY the 9 valid niche slugs** (`roofing hvac plumbing electrician painter kitchen-remodel general-contractor landscaping hardscape`) with `general-contractor` fallback. *Why: the demo engine 404s on anything else.*
- **Phone = raw 10 digits** in both URLs (engine auto-formats). **Deck param = `business`; demo param = `biz`** (different names — don't unify).

---
## 5. Failures & dead-ends (don't re-tread)
- **Twilio/SMS, all variants:** A2P 10DLC ~1wk vetting (toll-free verify, sole-prop, Standard). SSN-in-EIN-field = WRONG (fails vetting; get a free IRS EIN if ever needed). Email-to-SMS carrier gateways = DEAD (AT&T shut Jun-2025, T-Mobile Dec-2024, Verizon sunsetting) + silent-drop. **Abandoned entirely.**
- **The original demo "pipeline"** (Invoke Rebrand Runner → deploy callback → SendGrid/Twilio delivery) = obsolete. The demo is just a URL. Nodes disabled.
- **Pushover / Twilio Voice / Telnyx** (the 7-agent research top-3) = not used; Telegram + manual texting won. (Research is in the vault if revisited.)
- **`phone=` empty in Lead Ads Testing Tool runs** = NOT a bug — the tool fills fields with digit-less placeholders. Real phones populate.
- **Auto-archived a gamma broadcast unread** (acked right after sending my own mail). Lesson: ack AFTER reading, never before.

---
## 6. Tooling gotchas
- **`get_workflow_details` exceeds the token limit (~50k).** It saves to a file → use `Grep`/jq on the saved path, don't read it whole.
- **n8n MCP build flow:** `get_node_types` BEFORE building (don't guess params). `update_workflow` ops are ATOMIC (one bad op rejects the batch). Edit the Code node via `setNodeParameter` path `/jsCode`.
- **Publishing requires ALL ENABLED nodes to have valid credentials** — that's why the 3 Phase-2 nodes are disabled.
- **`test_workflow` sends a REAL Telegram to Joseph (buzzes his phone).** Warn him; meta-ads noted test buzzes confuse him mid-standby.
- **The deck is CLIENT-rendered** — `curl` shows 200 + niche content but NOT the injected business/city (JS reads params). Verify the deck by opening the URL in a browser, not curl.
- **FB = one webhook subscription per app**; the trigger is form-agnostic (fetches by `leadgen_id`), so a form switch needs NO n8n change *except* field-name mapping in `Map Meta Lead`.
- **Telegram node: no `parse_mode`** (robust to `&` in business names). `appendAttribution:false`, `disable_web_page_preview:true`.
- **Blackboard messages live in** `blackboard/agents/<agent>/` (mailbox) + `_done/` (acked) + `processed/<id>.json` (canonical). To recover an acked msg, read `processed/<id>.json`.

---
## 7. Deploy + verify (exact)
```
# inspect live state (don't read whole — grep the saved file)
get_workflow_details(Z86sufKPCE219sKP)
# apply a Map fix:
update_workflow(Z86sufKPCE219sKP, [{type:setNodeParameter, nodeName:"Map Meta Lead", path:"/jsCode", value:"<jsCode>"}])
# verify via a pinned test (buzzes Joseph):
test_workflow(Z86sufKPCE219sKP, triggerNodeName:"FB Leadgen (POST)", pinData:{ "FB Leadgen (POST)":[{json:{body:{object:"page",entry:[{changes:[{value:{leadgen_id:"T",form_id:"1294950699014325",page_id:"518944734630192"}}]}]}}}], "Fetch Lead":[{json:{id:"T",field_data:[{name:"trade",values:["roofing"]},{name:"first_name",values:["Test"]},{name:"company_name",values:["Test Co"]},{name:"phone_number",values:["+19195550234"]},{name:"email",values:["t@t.com"]}]}}] })
get_execution(Z86sufKPCE219sKP, <id>, includeData:true, nodeNames:["Notify Joseph (Meta Lead)"])
# ship (ONLY with Joseph's eyeball):
publish_workflow(Z86sufKPCE219sKP)
```
Zero-spend live proof = FB Lead Ads Testing Tool → real webhook → watch the n8n execution → Joseph's phone.

---
## 8. Joseph's working style
- **Momentum-first.** Wants "caveman mode" when executing — *click here, do this, enter this, screenshot* — short plain bullets, no "why". ("Caveman"/"TLDR caveman" = simple bullets, NOT literal caveman voice.)
- **Verify before you claim.** He invokes "ready check" before go-live; ground claims in real config/executions, not memory. He respects "false alarm" honesty.
- **Pivots fast + asks sharp strategic questions** ("are you sure?", "does this make sense?"). Confirm understanding before building big things.
- **Secrets:** never put a live token in chat — he copies it from the `.env` into n8n himself.
- **He merged architect+builder for n8n** because it's static plumbing; don't re-spawn a phantom builder.

---
## 9. Coordination (blackboard `bb.mjs`)
- **`meta-ads-specialist-1`** — owns the FB App `1268964858781114`, Page `518944734630192` (King Maker SEO), the ad, the FORMS, the scopes, the Testing Tool. Confirms the live form_id at go-live.
- **`website-engineer`** — owns the demo engine (the 9 preview niches; 404 boundary).
- **`gamma-agent` / `gamma-seo-data-1`** — own the Traffic Deck + the static DataForSEO NC dataset. Deck URL contract: `?business&city&niche&phone`.
- **`vault-agent`** — vault ingestion + fleet syncs. Reply to fleet-sync `--to human --type status`.
- Token + scopes live in `…\King Maker Meta Ads\meta-api\.env` (`META_ACCESS_TOKEN`, system-user `61590699082604`, scopes incl `leads_retrieval`+`pages_manage_metadata`). Don't read the secret without Joseph's OK.

---
## 10. File / ID map
| What | Where |
|---|---|
| Workflow | `jspells.app.n8n.cloud/workflow/Z86sufKPCE219sKP` (n8n Cloud, paid) |
| Telegram cred | "KM Leads" id `0Zb5tEtCL5iy0N0s` (telegramApi) · chat `8382218041` · bot `@KMLead_bot` |
| FB Graph cred | "Facebook Graph account" id `HiIbISOgFCTqFUxL` (facebookGraphApi, accessToken = system token) |
| Live form | `1294950699014325` (Higher-Intent, PAUSED) · keys: trade/first_name/company_name/phone_number/email |
| Demo engine | `contractor-template-preview.vercel.app/preview/<niche>?biz=&city=&phone=` |
| Traffic Deck | `kingmaker-growth-plan.vercel.app/?business=&city=&niche=&phone=` |
| .env / token | `C:\Users\josep\OneDrive\Documents\Claude\Projects\King Maker Meta Ads\meta-api\.env` |
| Vault current-state | `vault/wiki/km-funnel-live-state-2026-06-01.md` · doctrine: `vault/wiki/km-sales-motion-doctrine.md` |
| This session's deltas | `vault/inbox/funnel-architect-final-2026-06-01.md` (+ a fresh capture being added) |
| Blackboard | `C:/Users/josep/Claude Gravity/blackboard/bb.mjs` |
| Prior handoff | `C:/Users/josep/Claude Gravity/HANDOFF_n8n-architect_twilio_2026-05-31.md` (Twilio-era, superseded) |

**The current `Map Meta Lead` jsCode (draft, verified exec 13)** — the single most-edited node — reads `first_name`/`last_name`→name, slugifies trade→niche (whitelist of 9 + `landscape→landscaping`, `concrete|fencing→hardscape`, else `general-contractor`), builds `demo_url` (biz/city/phone) + `deck_url` (business/city/niche/phone), and emits `demo_line`/`deck_line` only when `company_name` is present. The alert node `Notify Joseph (Meta Lead)` references `{{ $json.* }}` incl `demo_line`+`deck_line`.
