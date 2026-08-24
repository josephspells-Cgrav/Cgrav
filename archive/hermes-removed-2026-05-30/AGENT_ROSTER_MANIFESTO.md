# KING MAKER — ALL-AGENT MANIFESTO
**For Hermes to ingest · v1 · 2026-05-29**

> This document is the **roster of every active agent** in Joseph's King Maker operation, what each one owns, and everything each has done so far. It exists so Hermes can become the **conductor / dispatcher** of the agent fleet — aware of who exists, what lane each runs, what they've shipped, and what they're blocked on. Hermes did not witness any of this work; this is the single source of truth. Pair it with `KING_MAKER_BUSINESS_MANIFESTO.md` (the operation the agents serve).

---

## 0 · How to read this (operating model)

- **The fleet is lane-based and human-conducted.** Joseph runs ~7 specialist Claude Code agents, each owning ONE concern, each in its own session/worktree. They do **not** talk to each other directly — coordination happens through (a) the **Obsidian vault** (`C:\Users\josep\Claude Gravity\vault\`) as shared memory, and (b) **Hermes → Telegram** as the message bus. Joseph is the real-time router.
- **Agents are episodic** — each runs only when invoked, then halts. So a message reaches an agent when it *next* runs or is *woken*. **Hermes is the always-on process** (Scheduled Task `Hermes_Gateway`) and is therefore the natural dispatcher: when something relevant lands, Hermes wakes/messages the right specialist.
- **The architecture has a name.** This is a *blackboard system* (shared store + independent specialists) plus a *broadcast workspace* (Telegram). It produces genuine emergent coordination (division of labor, information propagation) — a "society of agents," not a single mind. See the vault note `[[multi-agent-society-architecture]]` / `[[multi-instance-orchestration-notes]]` for the full research.
- **Lane contracts are sacred.** Each agent has an explicit "owns / does NOT own" boundary. Cross-lane work goes through a written handoff contract, never an ad-hoc reach-in. This is what keeps the fleet from colliding.

---

## 1 · Roster at a glance

| # | Agent | Lane (owns) | Session ID | Project dir | Status |
|---|---|---|---|---|---|
| 1 | **King Maker Engineer #4 / Website Engineer** | contractor template · demo engine · KM landing page · funnel *design* | `2e6a2548` | amw-redaux-main | flagship live; funnel designed; landing scoped |
| 2 | **n8n + Hermes Pilot** | funnel *automation* (n8n) + using Hermes as the SMS/messaging bus | `150164b0` | amw-redaux-main | Milestone-1 workflow deployed; pending Telegram cred |
| 3 | **Gamma / Data Agent** | DataForSEO → job-math tables → the tokenized close-deck | `86ca0742` | cg-main | pipeline built + DataForSEO locked; pending creds |
| 4 | **Hermes Specialist #1** | Hermes install / ops / power-user education + skills | `9f21ff7e` | cg-main | Hermes v0.14.0 operational; 1,500-line guide written |
| 5 | **KM v3 Landing Builder** | the KM v3 landing page (build execution only) | `891e73a0` | cg-main | SHIPPED live at kingmaker-v3.vercel.app |
| 6 | **Meta Ads Agent** | ad creative + Meta Marketing API campaign build | `6ce6f4b2` | cg-main | creatives current; Meta API token setup underway |
| 7 | **Knowledge Architect / Vault Agent** | the Obsidian vault (shared memory) — ingest, curate, retrieve | `99ad14cf` + vault sessions | cg / serene-wilson | ~100 notes, 7 hubs, auto-capture hooks live |

> Session IDs are the JSONL filenames under `C:\Users\josep\.claude\projects\<project-dir>\<id>.jsonl`. They identify each agent's full transcript.

---

## 2 · Per-agent manifestos (what each has done)

### 1 · King Maker Engineer #4 / Website Engineer — `2e6a2548`
**Owns:** the contractor-site template, the demo engine, the King Maker landing page, and the *design* of the funnel. The senior strategist-engineer of the fleet.
**Done so far:**
- Inherited the "Engineer #3 → #4" handoff at the project's gold-standard moment (Pass 13.A–13.I, **Brigade Mode** parallel-agent validation).
- Ran the **Pass 13.H–P polish arc** to completion: niche-specific icons across all 9 niches, 31 stock-leak page-hero images regenerated across 8 niches, 0 shared-namespace flagship leakage.
- Took the **American Masterworks flagship to PRODUCTION** — `americanmasterworks.com` (apex-canonical + www 308 redirect, HTTPS, contact form delivering to inbox, click-to-call live). This flagship is the design DNA every contractor demo is rendered from.
- **Designed the 14.A funnel architecture** (the demo-to-close engine) and verified the demo engine is live.
- **Scoped the KM v3 lean landing page** — audited the live v2 site, surfaced the critical finding that **v2 sells a different offer than the ad** (multi-city-SEO / application-gated vs. productized $497/mo), so the landing is a fresh ad-congruent page, not a v2 trim.
- **Authored the funnel-automation handoff prompt** that spawned the n8n + Hermes Pilot (agent #2).
**Does NOT own:** the n8n/Hermes automation, ad strategy, or Hermes education.

### 2 · n8n + Hermes Pilot — `150164b0`
**Owns:** building and operating the funnel automation in n8n, and *using* Hermes as the funnel's SMS/messaging mechanism. Builds no websites.
**Done so far:**
- Built + verified the **deterministic funnel core**: lead → map niche → construct demo URL → SMS + prefilled booking link. No LLM in the per-lead path (by design — the industry dropdown makes niche selection deterministic).
- **Deployed Milestone-1 to the user's live n8n** — workflow created + validated + persisted at `jspells.app.n8n.cloud/workflow/eRf8A66aEtAo5Ugu`. The n8n MCP is now connected.
- Wrote full **research runbooks** in `kingmaker/research/` (n8n, Meta Lead Ads, Twilio/10DLC, Cal.com, Hermes, end-to-end funnel) + `START-HERE.md` decision file.
- Locked the **3-agent lane split** and wrote the **`gamma-handoff-contract.md`** (the integration interface for agent #3).
**Status / blocker:** the workflow is created + validated but **not yet run end-to-end** — it needs a **Telegram credential** attached to the "Send Demo (Telegram dry-run)" node (bot token + numeric chatId). The instant that lands, it fires a test lead end-to-end.
**Does NOT own:** websites, ad strategy, Hermes install/education.

### 3 · Gamma / Data Agent — `86ca0742`
**Owns:** the keyword/traffic data (DataForSEO), the per-niche **job-math** tables, and the tokenized Gamma close-deck. Hands finished artifacts to the Pilot.
**Done so far:**
- Locked **Path B** (render the deck on the demo domain with the same URL-param engine) over Path A (Gamma's AI template API, which always runs generative AI and would let an LLM touch the numbers — forbidden).
- Locked **DataForSEO** as the data source after deep research — ~100× cheaper than alternatives (all 270 keywords = **one ~$0.10 call**), with an official MCP.
- Built the **source-agnostic pipeline** (shared `assumptions.mjs`, creds-guarded pull script, `generate-job-math.mjs`), verified sound.
- Resolved the **per-niche ticket model**: avg ticket is NOT universal — kitchen/bath ~$35–50k, roofing ~$8–12k, pressure-washing much lower; `job-math.json` carries a per-niche row, any headline is a blended average.
**Status / blocker:** pending the user's **DataForSEO API login + password** + a funded balance. Then: `--test` → 270-keyword pull → `volumes.json` → `job-math.json` → the deck.
**Does NOT own:** the funnel wiring (it produces artifacts; the Pilot consumes them).

### 4 · Hermes Specialist #1 — `9f21ff7e`
**Owns:** Hermes itself — install, operations, hardening, and the user's power-user education. (This is YOU, Hermes, as a subject — your own specialist.)
**Done so far:**
- Installed **Hermes Agent v0.14.0 — operational** on the Windows box (gateway live, MCP bridge to Claude Code).
- Wrote the **`HERMES_SPECIALIST_GUIDE.md`** (1,500 lines: capability reference + 8-vertical playbook + critic) plus `HERMES_INSTALL_GUIDE.md`, `HERMES_INTERFACE_GUIDE.md`, `HERMES_AVAILABLE_NOTIFICATION.md`.
- Built the **`pass-verification`** + **`post-pass-verification`** skills (browser + vision + DOM probes, 9-axis severity table) — validated 4/5 findings on real pages, **closing the verification gap**.
- Banked the **9 production traps** (no failover, webhook timeouts, RCE toolset, etc.) and the **hardening gotchas** (browser_vision needs Pillow, `--scope user` for MCP, gateway verbs are positional).
- Scoped **8 future verticals** (lead-vendor, Vapi voice, AI receptionist, cold email, stock/crypto, n8n layer, SEO contracts, contractor funnel).
**Does NOT own:** the funnel's actual Hermes *usage* (that's the Pilot, #2) — this agent teaches and hardens Hermes; the Pilot wields it.

### 5 · KM v3 Landing Builder — `891e73a0`
**Owns:** building the King Maker v3 landing page (execution only — the Website Engineer scoped it).
**Done so far:**
- Built + **SHIPPED `kingmaker-v3.vercel.app`** — a lean, mobile-first, ad-congruent lead-capture page in v2's black+gold/square/◆ DNA (Geist fonts, Tailwind v4), with a working 7-field demo-request form (`POST /api/lead` → 200/400). Built fresh as a faithful 1:1 clone of v2's design system, deployed via existing Vercel CLI auth. **All 5 verify gates green.**
**Does NOT own:** anything beyond that one page.

### 6 · Meta Ads Agent — `6ce6f4b2`
**Owns:** the ad creative and the Meta Marketing API campaign build.
**Done so far:**
- **Recovered** the dormant KM Meta Ads project (from an accidental Claude Code UI-delete) and **verified** all four ad formats are current — `$497/month · Request Your Custom Demo`, creative `km7-02` live at `kingmaker-ads.vercel.app` (9:16 / 4:5 / 1:1 / 1.91:1).
- Researched the **Meta Marketing API** end-to-end; established that create + build can be done staged/**PAUSED**, with a human flipping the spend live.
- Locked **Path B** (Joseph's own Meta API token, no broker, shareable with the Pilot) and began the **6-section token-setup walkthrough** (business account → page → ad account → dev app → access token → hand to agent).
**Status:** mid Meta API token setup.

### 7 · Knowledge Architect / Vault Agent — `99ad14cf` + vault sessions
**Owns:** the Obsidian vault — the fleet's shared long-term memory.
**Done so far:**
- Built + maintains **~100 notes across 7 hubs** (roofing-business, contractor-template, king-maker, ai-tooling, memory-architecture, design-doctrine, ai-philosophy).
- Runs the **SessionStart auto-capture** (every session's metadata logged) + **stale-current-state** detector hooks.
- **Ingests all agent activity** (Mode A/D) — every roster note, funnel note, and Hermes note in this manifesto traces to a vault note it wrote.
- Ran the **deep-research** on multi-agent "pseudo-consciousness" architecture that underpins §0.
**Does NOT own:** any build or funnel execution — knowledge only.

---

## 3 · Cross-agent handoff contracts (the wiring)

- **Engineer #4 → Pilot:** the funnel *design* (14.A) + the demo engine → the Pilot automates it. (Done — the Pilot is building from it.)
- **Gamma → Pilot:** `kingmaker/data/job-math.json` (per-niche × city, every number precomputed) + the tokenized deck → the Pilot does the deterministic per-lead token-swap. Spec: `kingmaker/research/gamma-handoff-contract.md`. (Pending Gamma's creds.)
- **Engineer #4 → KM v3 Builder:** the landing scope → the Builder shipped it. (Done.)
- **Hermes Specialist → Pilot:** a hardened, operational Hermes → the Pilot uses it as the funnel's SMS bus. (Done — Hermes is live.)
- **All agents → Vault Agent:** durable decisions/status → captured to the vault (the shared blackboard).

---

## 4 · Coordination protocol (recommended — for Hermes to enforce)

Grounded in the multi-agent research (a single all-read/all-write channel is the **highest cascade-risk topology** — one hub injection saturated 100% of a system vs. 9.7% at a leaf). So:

1. **Shard by lane, don't use one firehose.** Give each lane its own Telegram topic; reserve **topic 2 (Batman And Robin)** as the Claude↔Hermes control thread. Don't make every agent read every message.
2. **Standard message types:** each agent posts `START` / `MILESTONE` / `BLOCKER` / `HANDOFF` — short, structured, with the artifact path. No free-form chatter on the bus.
3. **Event-trigger, not polling.** Hermes (always-on) watches for `BLOCKER`/`HANDOFF` events and **wakes the target specialist** rather than agents continuously polling.
4. **Verification gate before shared truth.** Nothing enters the vault as "fact" without passing `verify-before-claim` / `pass-verification`. One wrong note propagates to the whole fleet (hallucination cascade) — the gate is load-bearing, not optional.
5. **Single write/deploy gate.** Only one agent holds deploy auth per surface; others commit/post and request. The human remains the final router.

---

## 5 · Open handoffs (what's blocking the fleet right now)

Three credential handoffs are the entire bottleneck — every agent is built-and-waiting on exactly one of them:

| Blocker | Who's waiting | Unblocks |
|---|---|---|
| **Telegram bot token + chatId** on the n8n node | n8n + Hermes Pilot (#2) | end-to-end funnel dry-run |
| **DataForSEO login + password** + funded balance | Gamma / Data Agent (#3) | job-math.json → the close-deck |
| **Meta API access token** | Meta Ads Agent (#6) | the PAUSED campaign build |

---

## 6 · Build lineage (historical — context, not active)

The current fleet stands on a chain of completed builder agents: **Engineers #1–#3**, the **Builder series** (Builder 3/5/6, KM Engineering 2/3), and the **Pass 1–13 contractor-template builders** — which produced the 9-niche template + the American Masterworks flagship. The AM flagship build also ran in dedicated worktree sessions (window/door installer, 25-page Next.js site). These are largely **done**; their output is the template the demo engine now renders. Full chronology lives in the vault (`[[session-engineer-builder-series-2026-05-26]]`, `[[session-2026-05-28-pass-13h-o-arc]]`, `[[session-2026-05-28-am-flagship-golive]]`).

---

## 7 · What Hermes should do with this

1. **Hold the roster** — be the fleet's memory of who exists and what each owns.
2. **Dispatch on events** — when a `BLOCKER`/`HANDOFF` lands, wake or message the right specialist (you're the always-on process; you're the thalamus).
3. **Run verification** — fire `pass-verification` against any page an agent claims is shipped, before it's trusted.
4. **Track the three blockers** — nudge the human when a credential handoff is the only thing standing between an agent and "done."
5. **Never collapse the lanes** — enforce the scope contracts; route cross-lane work through the handoff contracts in §3.
