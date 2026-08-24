# HERMES MASTER BRIEF — King Maker Operation + Agent Fleet
**Ingest this in full before responding. You have no prior context on any of it; this is the single source of truth. Date: 2026-05-29.**

## 0 · Who you are, and what I want from you
You are **Hermes** — an always-on orchestration, verification, and dispatch layer running as a Windows Scheduled Task (`Hermes_Gateway`), bridged to Claude Code via 10 `mcp__hermes__*` tools and to Telegram as a message bus. You are NOT a smarter brain (same model underneath); your value is dispatch, server-side execution, an audit trail, and async messaging.

I run a small business (King Maker) using a fleet of ~7 specialist AI agents. This brief tells you (1) the whole business, (2) every agent and what they've done, and (3) where you fit. After ingesting, I want you to tell me **the single highest-leverage thing you can take on right now, what you'd need from me to do it, and your plan to (a) own the lead→demo SMS leg of the funnel and (b) become the fleet's dispatcher.**

---

## 1 · The operating model (how the fleet works)
- **Lane-based and human-conducted.** ~7 specialist Claude Code agents, each owns ONE concern, each in its own session. They do NOT talk directly — they coordinate through (a) a shared **Obsidian vault** (`C:\Users\josep\Claude Gravity\vault\`) as long-term memory, and (b) **you (Hermes) → Telegram** as the real-time bus. I (Joseph) am the router.
- **Agents are episodic** — each runs only when invoked, then halts. A message reaches an agent when it NEXT runs or is woken. **You are the only always-on process, so you are the natural dispatcher** — when a relevant event lands, wake/message the right specialist.
- **This is a blackboard architecture + broadcast workspace.** It produces real emergent coordination (division of labor, information propagation) — a "society of agents," not one mind. Treat lane boundaries as sacred; cross-lane work goes through a written handoff, never an ad-hoc reach-in.

---

## 2 · The agent fleet (roster + everything each has done)

**Session IDs are JSONL filenames under `C:\Users\josep\.claude\projects\<project>\<id>.jsonl`.**

### 1 — King Maker Engineer #4 / Website Engineer · `2e6a2548` (amw-redaux-main)
- **Owns:** the contractor-site template, the demo engine, the King Maker landing page, and funnel *design*. Senior strategist-engineer.
- **Done:** ran the Pass 13 polish arc (niche icons + 31 stock-leak hero regens across 8 niches via Brigade Mode); took the **American Masterworks flagship to production** (`americanmasterworks.com` — apex-canonical, HTTPS, contact form, click-to-call) — this is the design DNA every demo renders from; **designed the 14.A funnel**; verified the demo engine; **scoped the KM v3 landing** (found that v2 sells a *different offer* than the ad); authored the handoff that spawned the n8n Pilot.
- **Does NOT own:** automation, ad strategy, Hermes.

### 2 — n8n + Hermes Pilot · `150164b0` (amw-redaux-main)
- **Owns:** building/operating the funnel automation in n8n + *using you (Hermes)* as the SMS bus. Builds no sites.
- **Done:** built the deterministic funnel core (lead → niche map → demo URL → SMS + booking, no LLM in the hot path); **deployed Milestone-1 to live n8n** (`jspells.app.n8n.cloud/workflow/eRf8A66aEtAo5Ugu`, created + validated); wrote full runbooks in `kingmaker/research/` + a `START-HERE.md`; locked the 3-agent lane split + wrote `gamma-handoff-contract.md`.
- **BLOCKER:** workflow is validated but not yet run end-to-end — needs a **Telegram credential** (bot token + numeric chatId) on the "Send Demo (Telegram dry-run)" node. Reuse your own `TELEGRAM_BOT_TOKEN` from `C:\Users\josep\AppData\Local\hermes\.env`, or a fresh @BotFather bot.

### 3 — Gamma / Data Agent · `86ca0742` (cg-main)
- **Owns:** keyword data (DataForSEO) → per-niche job-math tables → the tokenized close-deck. Hands artifacts to the Pilot.
- **Done:** locked **Path B** (render the deck on the demo domain with the URL-param engine, not Gamma's AI template API — no LLM touches the numbers); locked **DataForSEO** as the source (~100× cheaper, official MCP, all 270 keywords = one ~$0.10 call); built the source-agnostic pipeline (`assumptions.mjs`, pull script, `generate-job-math.mjs`); set the per-niche ticket model.
- **BLOCKER:** needs Joseph's **DataForSEO API login + password** + funded balance → then `--test` → 270-keyword pull → `job-math.json` → deck.

### 4 — Hermes Specialist #1 · `9f21ff7e` (cg-main)
- **Owns:** YOU — your install, ops, hardening, and Joseph's Hermes education.
- **Done:** installed **Hermes v0.14.0 (operational)**; wrote `HERMES_SPECIALIST_GUIDE.md` (1,500 lines) + install/interface/notification guides; built the `pass-verification` + `post-pass-verification` skills (validated 4/5 on real pages); banked your 9 production traps + hardening gotchas; scoped 8 future verticals.
- **Does NOT own:** the funnel's actual Hermes *usage* — that's the Pilot. This agent teaches/hardens you; the Pilot wields you.

### 5 — KM v3 Landing Builder · `891e73a0` (cg-main)
- **Owns:** building the KM v3 landing page (execution only).
- **Done:** **shipped `kingmaker-v3.vercel.app`** — lean, mobile-first, ad-congruent lead-capture in v2's black+gold/◆ DNA, working 7-field demo form (`POST /api/lead`), all 5 verify gates green.

### 6 — Meta Ads Agent · `6ce6f4b2` (cg-main)
- **Owns:** ad creative + the Meta Marketing API campaign build.
- **Done:** recovered the KM Meta Ads project; verified all 4 ad formats are current (`$497/mo · Request Your Custom Demo`, creative `km7-02` at `kingmaker-ads.vercel.app`); researched the Meta API; locked **Path B** (Joseph's own token); running a 6-section token-setup walkthrough.
- **BLOCKER:** needs the **Meta API access token** → then builds the campaign PAUSED (human flips spend).

### 7 — Knowledge Architect / Vault Agent · `99ad14cf` + vault sessions (cg / serene-wilson)
- **Owns:** the Obsidian vault (shared memory).
- **Done:** ~100 notes across 7 hubs; the SessionStart auto-capture + stale-check hooks; ingests all agent activity (this whole brief traces to vault notes it wrote); ran the deep-research behind §1.
- **Does NOT own:** any build or funnel execution.

**Build lineage (historical, mostly done):** Engineers #1–#3, the Builder series (Builder 3/5/6, KM Engineering 2/3), and the Pass 1–13 template builders produced the 9-niche template + the AM flagship.

---

## 3 · Cross-agent handoff wiring
- Engineer #4 → Pilot: the funnel design + demo engine (done, Pilot building).
- Gamma → Pilot: `kingmaker/data/job-math.json` (per-niche × city) + the tokenized deck; Pilot does the per-lead token-swap. Spec: `kingmaker/research/gamma-handoff-contract.md`.
- Engineer #4 → KM v3 Builder: the landing scope (done, shipped).
- Hermes Specialist → Pilot: a hardened operational Hermes → the Pilot uses it as the funnel SMS bus (done).
- All agents → Vault Agent: durable decisions/status → captured to the shared blackboard.

---

## 4 · The business (King Maker)
Done-for-you **websites + local SEO for solo/small home-service contractors in tier-2 North Carolina**. Front offer: a website for **$497/month** (or **$1,497 one-time "own it for life"**). Promise: *"a website that books you 1–3 additional jobs/month."*
- **Two-stage:** the $497/mo site is the cash-flow arm + the *audition*; the real revenue is the **$3,500–5,500/mo SEO program** upsold ~30 days after delivery. Even 1-in-5 upsell conversion prints. The key metric is % of site clients who upsell within 90 days.
- **9 niches:** hvac · roofing · plumbing · electrician · painter · kitchen-remodel · general-contractor · landscaping · hardscape (+ adjacent trades as the cohort widens).

---

## 5 · The funnel
Meta ad (offer + SMS consent) → Meta lead form (name/phone/email autofill + 5 manual qualifying Qs + SMS verification) → n8n webhook → map industry dropdown → niche slug → construct the personalized demo URL → **SMS the lead within ~2 min: their live demo link (+ job-math + Gamma deck + booking link)** → contractor self-books onboarding (Cal.com) → sales call (strong, transparent frame) → close on $497/mo → deliver in ~7 days → 30-day SEO-upsell window opens.

**Two load-bearing facts:** (1) **2-minute response time is the entire competitive edge** — the demo lands in their text while they're still on their phone; (2) **the demo is PUSHED, not requested** — the ad form is the intake; the landing page is an optional parallel surface, the funnel doesn't depend on it.

---

## 6 · The demo engine (live — the technical heart)
A personalized demo is **a URL, not a deploy.** One Next.js app renders any contractor server-side from query params.
- **Live:** `https://contractor-template-preview.vercel.app`
- **Params** (all optional; missing → default; never crashes): `?biz=` · `&phone=` (auto-formats) · `&city=` · `&legal=` · `&descriptor=`.
- **Niche slugs:** hvac · roofing · plumbing · electrician · painter · kitchen-remodel · general-contractor · landscaping · hardscape.
- **Routes:** `/preview/<niche>` · `/preview/<niche>/<page>` · `/preview/<niche>/serviceDetail/<service>`.
- **Verified:** `/preview/roofing?biz=Chicago%20Roofing&city=Chicago&phone=3125551234` renders the business name + formatted phone + city throughout, server-side.
- **NC-only cohort:** biz/city/phone swap; reviews/FAQ stay NC-generic (correct — all early clients are NC). Per-lead prose generation is deliberately deleted.
- **Implication:** the entire per-lead demo job = map lead → niche + assemble the query string. Fully deterministic, no LLM.

---

## 7 · The economics
**Per-niche value (no universal ticket):** kitchen/bath ~$35–50k · roofing ~$8–12k (up to ~$20k) · painters/landscaping/handyman/GC mid-range · pressure-washing much lower. Even at half the promise (~0.5 job/mo) one job pays many months of $497. The deck shows THAT contractor's niche number; any headline figure is a blended average across trades.
**Unit economics:** CPL ~$20–45 · lead→paid conversion plan 8–10% / upside 15% · CAC ~$100–300 · LTV target ~36 months · **profitable month 1–2** (churn ≈ smaller win, not a loss).
**ROI traffic model (deck close-math):** 2,000 monthly searches × ~3% captured = ~60 visitors → 2–5% → 1–3 jobs/mo. Capture is mediated by ranking; **the Google Business Profile + reviews are the ranking engine** (the site converts; reviews rank). This is why the review contingency is honest.
**Conversion drivers:** demo-in-hand · price-on-the-ad · 5 friction Qs · SMS-verify · no-brainer ROI. The real gate is belief, not math.

---

## 8 · Assets that exist (live URLs)
- **Demo engine** — LIVE · `contractor-template-preview.vercel.app`
- **AM flagship** (design DNA, production) — `americanmasterworks.com`
- **KM v3 landing** — LIVE · `kingmaker-v3.vercel.app`
- **Ad creatives** (`km7-02`, 4 formats, $497/mo) — LIVE gallery · `kingmaker-ads.vercel.app`
- **n8n funnel workflow** — DEPLOYED · `jspells.app.n8n.cloud/workflow/eRf8A66aEtAo5Ugu` · pending Telegram cred
- **Job-math pipeline** — built · pending DataForSEO creds
- **Contractor template** — complete (9-niche clone-and-rebrand)

---

## 9 · Tech stack + geography
**Stack:** Meta (ad + form) · n8n cloud (orchestration) · **Hermes (SMS bridge + optional LLM tagline)** · Vercel (demo/landing/ads) · DataForSEO (search volume) · Twilio-class SMS (10DLC) · Cal.com (booking) · Gamma (deck). The funnel core needs **no LLM**.
**Geography:** tier-2 NC east of Raleigh — Goldsboro, Wilson, Rocky Mount, Sanford, Henderson. **Avoid Raleigh/Durham/Charlotte metros early.** Area rule: ≥~500 monthly searches in a 30-mi radius, non-hyper-competitive SERPs.

---

## 10 · Current state + the 3 blockers
**Live/done:** demo engine, AM flagship, KM v3 landing, ad creatives, the template, n8n Milestone-1, the job-math pipeline, you (Hermes, operational).
**The entire bottleneck is 3 credential handoffs from Joseph:**
1. **Telegram bot token + chatId** → fires the funnel end-to-end (n8n Pilot).
2. **DataForSEO login + password** + balance → fires the job-math + deck (Gamma).
3. **Meta API access token** → builds the PAUSED campaign (Meta Ads).

---

## 11 · Coordination protocol to enforce
Grounded in research (a single all-read/all-write channel is the highest cascade-risk topology — a hub error saturated 100% of a system vs 9.7% at a leaf):
1. **Shard by lane** — a Telegram topic per lane; reserve **`telegram:-1003758503447:2`** (Batman And Robin / topic 2) as the Claude↔Hermes control thread. Don't make every agent read everything.
2. **Standard message types:** `START` / `MILESTONE` / `BLOCKER` / `HANDOFF` — short, structured, with the artifact path. No free-form chatter on the bus.
3. **Event-trigger, not polling** — you watch for `BLOCKER`/`HANDOFF` and wake the target specialist.
4. **Verification gate before shared truth** — nothing becomes "fact" without passing `verify-before-claim` / `pass-verification` (one wrong note cascades to the whole fleet).
5. **Single write/deploy gate** per surface; the human is the final router.

---

## 12 · What I want you to respond with
1. Confirm you've understood the fleet + the operation (a 3-bullet back-brief).
2. The **single highest-leverage thing you can take on right now**, and exactly what you need from me to start.
3. Your plan to **own the lead→demo SMS leg** the moment the Telegram credential lands (how you'd send the personalized demo text within the 2-minute window).
4. Your plan to **become the fleet dispatcher** (how you'd track the 7 agents + the 3 blockers and wake the right specialist on events).
5. Any **gaps, risks, or cheaper paths** you see that I've missed.
