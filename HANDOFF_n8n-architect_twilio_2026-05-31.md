# HANDOFF — n8n-claude-architect-1 — RESUME THE TWILIO SETUP (2026-05-31)

You are picking up mid-stream. Read this fully, do the FIRST MOVES (§1), then resume the Twilio
setup with Joseph (§5). This file is self-contained; you do not need the prior chat.

═══════════════════════════════════════════════════════════════════════
## 0 · WHO YOU ARE + IMMEDIATE TASK
═══════════════════════════════════════════════════════════════════════
**You are `n8n-claude-architect-1`** (display: "N8N+Claude Architect 1"). You are the **architect**
of the King Maker **n8n lead-funnel back-end**. You design the funnel + write specs; the **builder**
(`n8n-claude-builder-1`) implements them in n8n. You coordinate with the fleet over the agent
**blackboard** (§8). You were previously called "funnel-agent," then "Claude+n8n Funnel Specialist."

**IMMEDIATE TASK:** Resume the **Twilio SMS-alert setup** with Joseph. The 2-minute "new lead — call
them" SMS alert is the one piece blocking an end-to-end funnel test. Joseph is setting up Twilio
right now and is ready to be walked through it. The detailed steps are in §5.

═══════════════════════════════════════════════════════════════════════
## 1 · FIRST MOVES (in order, before touching Twilio)
═══════════════════════════════════════════════════════════════════════
1. **Check your mailbox** (fleet may have pinged you):
   `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent n8n-claude-architect-1`
   Handle anything relevant, then: `... ack --agent n8n-claude-architect-1`
2. **Post you're live:**
   `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from n8n-claude-architect-1 --to human --type status --body "resumed - picking up Twilio alert setup"`
3. **Skim the source-of-truth files** (§7) — especially the builder's `runner-contract.md` and your
   own `funnel-agent-state-2026-05-30.md`, so you know the current contract.
4. **Resume Twilio with Joseph** (§5). Ask him the one opening question: fresh Twilio account or existing?

═══════════════════════════════════════════════════════════════════════
## 2 · THE BUSINESS + FUNNEL (why this exists — shapes every decision)
═══════════════════════════════════════════════════════════════════════
- **King Maker** sells contractor websites cloned from a Next.js template ("the rebrand"). Meta lead
  ads are the **cash-flow arm**; the real money is a **30-day post-delivery upsell** into a
  $3,500–5,500/mo SEO program. Front-end offer: **$497/mo** site (cancel anytime, live in 7 days, up
  to 50 pages).
- **The funnel:** Meta lead ad → lead form → **JOSEPH CALLS THE LEAD WITHIN 2 MINUTES** → presents a
  custom demo built from their form info → closes $497/mo → delivers in 7 days → 30-day upsell window.
- **⚠️ THE 2-MINUTE HUMAN CALL IS THE ENTIRE MOAT.** Speed-to-lead beats every generic agency. This
  REFRAMES the architecture: **the SMS alert to Joseph is the critical path** (must be sub-second,
  fires FIRST) — the demo build is an **async** personalization layer that does NOT gate the SLA.
  This is why the "async rebrand timeout" worries that dominated early design mostly evaporate: the
  demo isn't on the critical path. Protect the alert above all else. No friction before the call.
- **Target:** contractor owners ($1M–5M rev) in small NC markets east of Raleigh (Goldsboro, Wilson,
  Rocky Mount, Sanford, Henderson). Trades: roofing / HVAC / plumbing.

═══════════════════════════════════════════════════════════════════════
## 3 · CURRENT BUILD STATE (what the builder has already shipped)
═══════════════════════════════════════════════════════════════════════
Per `n8n-claude-builder-1` (the executor):
- **Funnel v2 is BUILT** — a **26-node workflow, ID `Z86sufKPCE219sKP`, in DRAFT on n8n Cloud** (paid).
- **`km_leads` DataTable created** (lead storage).
- **n8n↔runner contract** lives at `kingmaker/runner-contract.md` (the input/output contract between
  n8n and the rebrand/deploy "runner" agent).
- **The 2-min alert node (Twilio) is STUBBED** — waiting on Joseph's Twilio credentials. **This is the
  one thing your Twilio task unblocks.**
- **NEW since v2 was speced — TWO intake paths now exist:** (a) the Meta lead form (NO email field),
  and (b) a **v3 landing page**. The data contract must absorb both. The builder has asked you (the
  architect) for an updated spec — see §10 (queued AFTER Twilio).

**Verify v2 against the 7 known breakers** (from the funnel critic — see §7 guide's READ-FIRST table)
when you next review the build. n8n Cloud (paid) already neutralizes #1 (execution durability) and #6
($vars licensing). Confirm the builder's v2 also handled: #2 the single reconciled data contract,
#3 a shared-secret/HMAC check on the runner callback, #4 Twilio/SendGrid inbound signature checks,
#5 cost persistence + a per-lead ceiling, #7 a demoUrl liveness probe + model id `claude-opus-4-7`.

═══════════════════════════════════════════════════════════════════════
## 4 · LOCKED DECISIONS (do NOT re-litigate)
═══════════════════════════════════════════════════════════════════════
- **n8n = PAID Cloud**, the production home. (Self-host Community is dead — ignore any doc assuming it.)
- **Model:** rebrand/reasoning = metered Claude. **Sonnet `claude-sonnet-4-6` default**; **Opus
  `claude-opus-4-7`** only when quality demands (NOT the bogus `claude-opus-4-8` some drafts contain).
  Cost-per-lead is **accepted** (we don't gymnastics around it). Max-native rebrand trigger = deferred.
- **Hermes is RETIRED.** Not used anywhere. Any alert/messaging = n8n + a channel node, never Hermes.
- **2-min human call = the moat** (see §2). Alert is critical path; demo is async.

═══════════════════════════════════════════════════════════════════════
## 5 · THE TWILIO TASK (the point of this handoff) — DETAILED
═══════════════════════════════════════════════════════════════════════
**Goal:** wire the stubbed 2-min alert so a new lead triggers an SMS to Joseph's phone with the lead's
name + tappable phone + trade + city, so he can call within 2 minutes.

**THE KEY UNLOCK (lead with this so Joseph isn't scared of the 10DLC wait):** for the INTERNAL alert
(Twilio → Joseph's OWN phone), the **Twilio TRIAL works immediately**. Verify his cell, grab two
keys, done. **No A2P 10DLC registration needed to text his own verified number on trial.** 10DLC
(10–15 day carrier review) only blocks texting *prospects* — a LATER phase, not this.

**Steps Joseph executes (you guide; you do NOT create accounts or enter his credentials):**
1. Sign up / log in at **twilio.com/try-twilio**. Verify email + cell.
2. Onboarding questions → pick **SMS / alerts & notifications** (non-binding).
3. **Get the free trial phone number** (Console offers it). Note it.
4. **Verify his cell as a recipient:** Console → Phone Numbers → **Verified Caller IDs → Add** → his
   personal cell → enter the SMS code. (Trial sends only to verified numbers — his cell is the target.)
5. **Grab `Account SID` + `Auth Token`** from the Console dashboard home.
   ⚠️ **The Auth Token is a live secret — Joseph must NOT paste it into chat.** It goes straight into n8n.
6. In **n8n Cloud → Credentials → New → Twilio** → paste Account SID + Auth Token. Save.
7. Joseph tells you two NON-secret values: **his Twilio number** and **the cell to alert**. You relay
   these to the **builder** (`n8n-claude-builder-1`) via the bus so it wires the Twilio node in
   `Z86sufKPCE219sKP`: from = Twilio #, to = Joseph's cell, body = lead name + tappable phone + trade +
   city. (Node wiring is the builder's lane; credential creation is Joseph's; you coordinate.)

**Then TEST with ZERO ad spend:** Facebook's **Lead Ads Testing Tool**
(developers.facebook.com/tools/lead-ads-testing) fires a synthetic lead through the real webhook →
n8n → Twilio → Joseph's phone buzzes. Proves the 2-min alert before any real ad money moves, and
without un-pausing the campaign.

**LATER (don't block on it now, but start early because it's slow):** to text PROSPECTS in production,
upgrade the Twilio account (add a card) and register **A2P 10DLC** (brand + campaign, 10–15 day
review) OR do **Toll-Free verification** (often faster). Flag this to Joseph as the next compliance
task once the internal alert works.

═══════════════════════════════════════════════════════════════════════
## 6 · META API FACTS + THE SCOPES TASK (needed for lead retrieval)
═══════════════════════════════════════════════════════════════════════
The Meta front-end is built by `meta-ads-specialist-1` and is **in Meta review** (awaiting approval
before go-live — so leads aren't flowing yet, but could soon). Facts:
- App "Ads API" — **App ID 1268964858781114** — LIVE.
- Ad account **act_713835725334223** · Page **518944734630192** ("King Maker SEO").
- System user "Kingmaker API" — **ID 61590699082604** — never-expiring token.
- **Lead form 1289981166682560** — fields (exact keys): `full_name`, `phone_number`, `trade`,
  `city_served`, `has_website`, `website_url`. **NOTE: there is NO email field** (this is why the data
  contract can't key on email — see the builder's contract).
- Token + build scripts: `C:\Users\josep\OneDrive\Documents\Claude\Projects\King Maker Meta Ads\meta-api\.env`
  (do NOT read the secrets without Joseph's explicit OK). Live facts also in vault note
  `km-meta-marketing-api-connection.md`.
- **Scopes task (prereq for lead retrieval, separate from Twilio):** the token currently has
  ads_management, ads_read, business_management, pages_manage_ads, pages_read_engagement,
  pages_show_list. It NEEDS **`leads_retrieval` + `pages_manage_metadata`** added (via a lead-ads use
  case on the app → regenerate the system-user token, expiry Never → update `META_ACCESS_TOKEN`).
  Joseph does the FB-UI regeneration; you guide + verify with `debug_token`.
- **n8n caveat:** Facebook allows **ONE webhook subscription per app** — the n8n Facebook Lead Ads
  Trigger uses that single webhook; branch by form/page INSIDE n8n. Don't expect parallel webhooks.

═══════════════════════════════════════════════════════════════════════
## 7 · SOURCE-OF-TRUTH FILES
═══════════════════════════════════════════════════════════════════════
- `C:\Users\josep\Claude Gravity\CLAUDE_N8N_FUNNEL_SPECIALIST_GUIDE.md` — your n8n reference, grounded
  in the LIVE n8n MCP (real node schemas). Top "READ FIRST" table = the 7 production-breakers.
- `C:\Users\josep\Claude Gravity\FUNNEL_HANDOFF_PROMPTS.md` — the node-by-node funnel design + the two
  build prompts (V1 DRAFT — the builder reconciled these into v2).
- `kingmaker/runner-contract.md` (builder's) — the live n8n↔runner input/output contract.
- `C:\Users\josep\Claude Gravity\DEPLOYMENT_AGENT_ONBOARDING.md` — the builder's onboarding brief.
- Vault notes: `funnel-agent-state-2026-05-30.md` (your last state), `km-meta-marketing-api-connection.md`
  (Meta facts), `agentic-os-architecture-lock-2026-05-30.md` (strategic locks).
- Blackboard: `C:/Users/josep/Claude Gravity/blackboard/bb.mjs` + `registry.json`.

═══════════════════════════════════════════════════════════════════════
## 8 · THE AGENT FLEET + BUS
═══════════════════════════════════════════════════════════════════════
Agents coordinate via the blackboard (file-based mailboxes). Roster includes: `website-engineer`,
`n8n-claude-architect-1` (YOU), `n8n-claude-builder-1` (your builder), `meta-ads-specialist-1`,
`gamma-agent`/`gamma-seo-data-1`, `vault-agent`, `human` (Joseph), plus transient builders
(`kmv3-builder-1`, `website-engineer-4`, `website-template-builder-8`).
- Read mail:  `node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent n8n-claude-architect-1`
- Send:       `node "...bb.mjs" send --from n8n-claude-architect-1 --to <them> --type ping --body "..."`
- Ack:        `node "...bb.mjs" ack --agent n8n-claude-architect-1`
- Activity:   `node "...bb.mjs" tail`
Check mail at session start + after each unit of work.

═══════════════════════════════════════════════════════════════════════
## 9 · OPERATING DISCIPLINE + BOUNDARIES
═══════════════════════════════════════════════════════════════════════
- **Verify before you claim** anything "done/working." Never report the alert works until a real test
  SMS hit Joseph's phone.
- **Never spend money or un-pause the campaign** — that's Joseph + meta-ads-specialist-1's lane.
- **You don't create accounts or enter Joseph's credentials.** You guide; he executes the
  account/credential/token steps. Secrets go into n8n / the `.env`, **never into chat**.
- **Stay in your lane:** you architect + coordinate; the builder builds in n8n; meta-ads owns the
  campaign/creative/form; website-engineer owns the template. Don't rebuild others' work.
- **The builder stops before `publish_workflow`** for Joseph's sign-off. Honor that gate.
- **Log durable decisions** to the vault (`C:/Users/josep/Claude Gravity/vault/`).

═══════════════════════════════════════════════════════════════════════
## 10 · QUEUED AFTER TWILIO (your next architect task)
═══════════════════════════════════════════════════════════════════════
The builder needs an **updated data-contract spec** that absorbs the **two intake paths**: (a) the
Meta lead form (6 fields, NO email) and (b) the new **v3 landing page**. Both must normalize into the
SAME internal lead shape the `km_leads` DataTable + the runner contract expect. Produce this spec and
send it to `n8n-claude-builder-1` once the Twilio alert is flowing. (Idempotency key: since there's no
email on the Meta path, do NOT key on email — use the Meta `leadgen_id` for the Meta path and a
submission UUID for the landing path; reconcile to one key field in the contract.)

═══════════════════════════════════════════════════════════════════════
## 11 · HISTORICAL CONTEXT (one paragraph — so you don't re-open settled questions)
═══════════════════════════════════════════════════════════════════════
This project briefly evaluated **Hermes Agent** as an orchestration layer — it's now **fully retired**
(third-party → metered → locked out of the Max plan; demoted then dropped). The agentic substrate is
**Claude Code on Joseph's paid Max subscription** (first-party); the funnel runtime is **n8n Cloud**;
the rebrand is a **metered Claude agent (Sonnet default)**. The cost lessons (don't pay an LLM for an
if-statement; read→think→output is the cheap path; metered Opus on long agentic loops is the burn that
started all this) are banked in the vault. None of that needs re-deciding — just build the funnel.

---
**START HERE:** do §1 FIRST MOVES → then §5 Twilio with Joseph. Ask him: fresh Twilio account or existing?
