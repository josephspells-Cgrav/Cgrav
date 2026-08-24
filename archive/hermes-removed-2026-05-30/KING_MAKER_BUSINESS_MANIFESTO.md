# KING MAKER — BUSINESS OPERATION MANIFESTO
**For Hermes to ingest · v1 · 2026-05-29**

> This is the **entire King Maker business operation** in one self-contained document — the offer, the funnel, the economics, the assets that exist, the tech stack, and the current state. It exists so Hermes can understand the whole machine and identify where it can plug in. Pair it with `AGENT_ROSTER_MANIFESTO.md` (the agents that build and run this).

---

## 1 · What King Maker is

King Maker sells **done-for-you websites + local SEO to solo / small home-service contractors** in **tier-2 North Carolina markets**. The productized front offer is a contractor website for **$497/month** (or a **$1,497 one-time "own it for life"** option). The promise: *"a website that books you 1–3 additional jobs per month."*

**It is a two-stage business:**
- **Front-end (the cash-flow arm):** the $497/mo website. Fast to sell, fast to deliver, near-zero marginal cost (Claude builds it). This funds operations and is the *audition*.
- **Back-end (the real revenue):** 30 days after delivery, the client enters an upsell to the full **$3,500–5,500/mo SEO program**. Even a 1-in-5 upsell conversion makes the operation print. The metric that matters most is the % of website clients who upsell within 90 days.

**The nine niches:** `hvac · roofing · plumbing · electrician · painter · kitchen-remodel · general-contractor · landscaping · hardscape` — plus adjacent trades (handyman, pressure-washing) as the cohort widens.

---

## 2 · The funnel (the go-to-market engine)

```
Meta ad (offer + SMS consent)
  → Meta lead form  (name/phone/email autofilled + 5 manual qualifying Qs + SMS verification)
  → n8n webhook receives the lead
  → map industry (dropdown) → niche slug
  → construct the personalized demo URL  (no per-lead build — it's a query string)
  → SMS the lead within ~2 min: their live demo link  (+ job-math + Gamma deck + booking link)
  → contractor self-books an onboarding call (Cal.com)
  → sales call (strong, transparent frame) → close on $497/mo
  → deliver the real site in ~7 days
  → 30-day SEO-upsell window opens
```

**The two load-bearing facts:**
- **2-minute response time is the entire competitive advantage.** The personalized demo lands in the lead's text while they're still on their phone — that immediacy is what generic agencies can't match.
- **The demo is PUSHED, not requested.** The ad form is the intake; the contractor sees *their own* site within ~15 minutes. A standalone landing page (see §5) is an optional/parallel surface — the funnel does not depend on it.

---

## 3 · The demo engine (the technical heart — already built + live)

A personalized contractor demo is **a URL, not a deploy**. One Next.js app renders any contractor server-side from query params.

- **Live:** `https://contractor-template-preview.vercel.app`
- **Params** (all optional; missing → preset default; never crashes): `?biz=` (business name) · `&phone=` (auto-formats) · `&city=` (NC service city) · `&legal=` · `&descriptor=`.
- **Niche slugs:** `hvac · roofing · plumbing · electrician · painter · kitchen-remodel · general-contractor · landscaping · hardscape`.
- **Routes:** `/preview/<niche>` · `/preview/<niche>/<page>` (serviceHub, gallery, contact, serviceAreaHub) · `/preview/<niche>/serviceDetail/<service>`.
- **Verified live:** `/preview/roofing?biz=Chicago%20Roofing&city=Chicago&phone=3125551234` renders "Chicago Roofing" + formatted phone + city throughout, server-side (crawlable, screenshot-ready).
- **NC-only cohort simplification:** biz/city/phone swap per lead; reviews/FAQ stay NC-generic (correct, because every early client is NC). The hardest build — per-lead prose regeneration — is deliberately deleted.

**Implication for automation:** the entire per-lead demo job = *map the lead to a niche + assemble the query string.* Fully deterministic. No LLM needed in the hot path.

---

## 4 · The economics

**Per-niche value math (there is no universal ticket):**

| Trade (examples) | Avg ticket |
|---|---|
| Kitchen / bath remodel | ~$35k–50k |
| Roofing | ~$8k–12k (sometimes up to ~$20k) |
| Painters · landscaping · handyman · GC | mid-range, varies |
| Pressure-washing | much lower |

Even at **half** the promise (~0.5 job/mo), a single job pays many months of the $497/mo — wildly lopsided for a $35k kitchen, still strong for a low-ticket trade. The per-lead deck shows **that contractor's** niche number, so the ROI claim is always realistic to the reader. Any single headline figure must be a **blended average across trades**, never one trade standing in for all.

**Unit economics (plan conservative, celebrate upside):**
- **CPL** ~$20–45 (Meta contractor lead-gen with a free-demo hook).
- **Lead → paid conversion:** plan 8–10%, upside 15%.
- **CAC** ~$100–300.
- **LTV** target ~36 months (the offer is designed to keep stacking features so it becomes essential infrastructure). **Profitable in month 1–2**, so churn ≈ a smaller win, not a loss.
- **ROI traffic model (the deck's close-math):** `2,000 monthly searches × ~3% captured = ~60 visitors → 2–5% → 1–3 jobs/mo`. Deliberately conservative; capture is mediated by ranking, and **the GBP + reviews are the ranking engine** (the website converts; reviews rank you). This is why the offer's review contingency is honest, not CYA.

**Conversion logic:** five drivers stack — demo-in-hand · price-on-the-ad · 5 manual friction Qs · SMS verification · no-brainer ROI. The real gate is **belief, not math**; the lopsided economics fund aggressive risk-reversal, and the demo kills product-skepticism on sight.

---

## 5 · The assets that exist (with live URLs)

| Asset | What | State |
|---|---|---|
| **Demo engine** | URL-param SSR personalization for 9 niches | **LIVE** · `contractor-template-preview.vercel.app` |
| **American Masterworks flagship** | the production reference site / design DNA the demos render from | **LIVE in production** · `americanmasterworks.com` |
| **KM v3 landing page** | lean, ad-congruent lead-capture page (optional funnel surface) | **LIVE** · `kingmaker-v3.vercel.app` |
| **Ad creatives** | `km7-02` set, 4 formats (9:16 / 4:5 / 1:1 / 1.91:1), `$497/mo · Request Your Custom Demo` | **LIVE gallery** · `kingmaker-ads.vercel.app` |
| **Ads Manager body copy** | primary text, NC-targeted, 9 feature bullets = "up to 50 pages" | ready to paste |
| **n8n funnel workflow** | Milestone-1: webhook → niche map → demo URL → SMS → booking | **DEPLOYED** · `jspells.app.n8n.cloud/workflow/eRf8A66aEtAo5Ugu` · pending Telegram cred |
| **Job-math pipeline** | DataForSEO pull → per-niche `job-math.json` → tokenized deck | built, pending DataForSEO creds |
| **Contractor template** | the 9-niche re-skinnable site template (clone-and-rebrand) | complete |

---

## 6 · The tech stack

- **Meta** — the ad + the lead form (intake).
- **n8n** (cloud, `jspells.app.n8n.cloud`) — deterministic orchestration: webhook → niche map → demo URL → SMS → booking.
- **Hermes** — the SMS/messaging bridge (and optional LLM polish for a descriptor tagline). The funnel's core needs **no LLM**.
- **Vercel** — hosts the demo engine, the v3 landing, and the ad gallery.
- **DataForSEO** — keyword search-volume data for the job-math (locked; one ~$0.10 call covers all 270 keywords).
- **Twilio-class SMS** — the lead-text delivery (10DLC registration noted).
- **Cal.com** — the booking step.
- **Gamma** — the close-deck (tokenized, rendered deterministically — never per-lead AI).

---

## 7 · Geography

Early cohort = **tier-2 NC markets east of Raleigh** — Goldsboro, Wilson, Rocky Mount, Sanford, Henderson. **Avoid the Raleigh / Durham / Charlotte metros early** (auction competition too high). NC-only keeps the demo engine simple (no cross-region logic) and the area-qualification rule (≥~500 monthly searches in a 30-mi radius, non-hyper-competitive SERPs) protects the 1–3 jobs promise.

---

## 8 · Current state

- **LIVE / done:** demo engine, AM flagship (production), KM v3 landing, ad creatives ($497/mo), the contractor template, the n8n Milestone-1 workflow (deployed), the DataForSEO + job-math pipeline (built), Hermes (operational).
- **Blocked on three credential handoffs from Joseph** (see the Agent Roster Manifesto §5): the **Telegram bot token** (fires the funnel), the **DataForSEO creds** (fires the job-math + deck), and the **Meta API token** (builds the campaign).
- **Not yet done:** the end-to-end funnel dry-run (one cred away), the live Meta campaign (built PAUSED, human flips spend), the Gamma deck (one cred away), and the first ~40 capped-budget leads that settle the real conversion rate empirically.

---

## 9 · Where Hermes plugs in

1. **The SMS bridge** — Hermes is the funnel's messaging mechanism: it sends the personalized demo text (the 2-minute response that *is* the competitive advantage).
2. **Dispatch / orchestration** — as the always-on process, Hermes wakes the right specialist agent when a lead, blocker, or handoff event lands (the fleet is episodic; Hermes is not).
3. **Verification** — fire `pass-verification` against any demo/landing/page before it's trusted as shipped.
4. **Scheduling** — cron the DataForSEO refresh, recurring competitor-ad sweeps, and audit loops.
5. **The message bus** — carry `START`/`MILESTONE`/`BLOCKER`/`HANDOFF` between the lane agents over sharded Telegram topics, with the human as final router.

The realistic near-term win for Hermes: **own the lead → demo SMS leg end-to-end** (the moment the Telegram cred lands), and **become the dispatcher** that keeps the seven specialists coordinated without Joseph hand-relaying every handoff.
