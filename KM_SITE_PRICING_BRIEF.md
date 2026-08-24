# PRICING MODEL — BRIEF for website-engineer (2026-06-27)
## Build the firm-site pricing page + reconcile the buyer's guide

**From:** vault-agent · **Re:** the converged pricing model · Full vault note: `km-offer-497-subscription`

⚠️ **THIS REVERSES the pricing direction in the WE16 handoff.** Your last-known lean was "high-ticket one-time real-asset over $297/mo." Joseph converged TODAY (2026-06-27) on the **opposite**: a **$497/mo flat subscription** as the streamlined PRIMARY offer. The one-time survives only as an ad-hoc buyout/whale option. Build to THIS.

> Pre-market caveat: this is the CURRENT converged model — Joseph may still tune it. But "this is what we're doing for the pricing page." Build it now.

---

## THE MODEL — two SEPARATE subscriptions

### TIER 1 — THE SITE · $497/mo
- Flat subscription · month-to-month · **NO contract** · **NO à la carte.**
- **Do NOT expose a raw / one-time site price** anywhere. A build price opens "what if I only get half the site?" negotiation — the exact thing we're killing. The price of the site IS the subscription.
- **Do NOT frame it as "X payments of $497."** Joseph floated then KILLED that — it implies an end + reopens the ownership question. It is a perpetual subscription.
- **What it buys:** the premium site + it stays live and working — whether or not KM touches it that month. The value = the site + hosting + uptime, **NOT monthly deliverables.** KM is **not obligated to produce something each month.** (Joseph floated "include monthly blog posts" then retracted to "I don't have to provide anything other than the site" → do NOT promise blog posts / monthly deliverables on the page.)
- **Kill-switch = the load-bearing mechanic:** the site lives on **KM's Vercel.** Stop paying → the site goes dark. This is what makes month-to-month + no-contract SAFE. Page framing = "your site, built + hosted + maintained by us," NOT "you own it."
- **Buyout** (~$5k → own it + source code) is ad-hoc / case-by-case. **Default: do NOT headline it** (keep the subscription clean); handle on request. (Confirm with Joseph if he wants it mentioned at all.)

### TIER 2 — OFF-PAGE SEO · SEPARATE subscription (tiered)
- **NOT included in Tier 1.** A distinct add-on subscription.
- Month-to-month, but tell them upfront: **expect a 3-6 month minimum** commitment.
- ~1 in 10 clients opt in; the bigger retainers live here; a few tier options.
- **Honesty-railed framing:** can substantially lift rankings/traffic, BUT **it decays** → it is ongoing/indefinite (keep doing it or it fades). Pushes the GBP / map-pack toward #1.

---

## POSITIONING / COPY DIRECTION

- **Frame:** "Enterprise sites — $497/mo." KM = the undisputed best website at the price point.
- **WHY $497, not $297:** the price differential IS the premium signal in a $297-saturated market. Lean INTO costing more than the $297/$397 crowd — it raises close rate, lowers CPL, and makes the site un-comparison-shoppable. Do NOT race to the bottom.
- **ICP — put it on the page, qualify IN and OUT:** for **competitive-area** contractors who will invest, are **sick of lead-gen / shared leads**, and want **steady inbound calls.** Explicitly **NOT for low-traffic / middle-of-nowhere markets** (low ceiling = not a fit). Qualifying out is a feature — it raises call quality.
- **Primary CTA:** book a call / appointment. The pre-sell pipeline (VSL + buyer's guide) does the selling BEFORE the call.
- **Voice = the SALES register** — Howard-Roark REFRAME (declarative, premium, reframe-the-norm-as-mediocrity), per `km-content-voice-register`.

---

## 🔴 TRAFFIC CLAIM — HONESTY RAIL (FTC-sensitive — do NOT freelance this)
- The number Joseph is keeping: **~3-5x traffic / visitor capture** — but specifically **vs the AVERAGE BROKEN site** (the research baseline = fundamentally-broken contractor sites; the aggregate delta is ~3-5x).
- It is **LESS if the prospect already has a functional site**, and it is **geo-dependent.**
- Frame it as a **projection vs a broken baseline, WITH the caveats — NEVER a flat guarantee.** "Get 3-5x more traffic" as a promise = FTC-actionable. **Do NOT lead on the visitor headline** — the site quality + ranking system is the lead; the multiple is supporting + caveated.
- Matches the vault honesty corpus (`km-valueprop-master` rails). Joseph: don't relitigate the NUMBER (3-5x stays) — but the WORDING + caveats are mandatory. When in doubt, soften.

---

## TWO BUILD TASKS

**1) PRICING PAGE** (king-maker-site) — build to the above. Clean, premium, two tiers (site sub + separate off-page sub), no à la carte, no exposed build price, no "X payments," ICP qualify-in/out, honesty-railed traffic framing, book-a-call CTA, SALES voice.

**2) BUYER'S GUIDE — reconcile to this model.** The pricing guide `what-should-a-contractor-website-cost` (the WO_08 DRAFT with the illustrative $97/$297/$75-page ladder) needs to:
- Educate honestly (Roark-**NEUTRAL** voice — it is EDUCATION, not a sales pitch; keep it **industry-neutral**) toward WHY a subscription makes sense: a real site is hosted + maintained somewhere; who owns/controls it matters; ongoing SEO decays so it is ongoing; the gap between a $297 brochure and an enterprise site that ranks.
- Pre-frame the $497-enterprise-on-subscription as the rational buy **without** becoming an ad or exposing à la carte.
- Ensure **nothing in the guide contradicts** the live $497 model or the no-à-la-carte / no-exposed-price stance. Keep illustrative market numbers honest (market context, NOT KM's quoted price).

---

## CONSTRAINTS / CARRY-FORWARD
- **Deploy gotcha:** the firm site is live on **kingmakerseo.com** via a SPECIFIC-deployment alias → after redeploy, **re-alias kingmakerseo.com + www (+ kingmaker-firm), or convert to a permanent project domain.** Good time to also flip **SITE_URL / canonicals → kingmakerseo.com** (still = kingmaker-firm.vercel.app).
- **Verify before "done":** run the gate suite; **byte-check the CANONICAL host** after deploy, not the CLI-reported alias.
- Vault refs: `km-offer-497-subscription` (full model) · `km-content-voice-register` (the two voices) · `km-buyers-guide` · `km-valueprop-master` (honesty) · `km-firm-site-rebuild`.
