# WORK ORDER 09 — Summit & Oak (site-side map-pack support: review funnel + tracking + NAP)

**From:** WE10 (architect) · **To:** Builder (WARM / active) · **Date:** 2026-06-17
**Compounds on:** WO_01–08. **Goal:** build the SITE-SIDE pieces that feed the map-pack ops (the layer that wins the 90-day rank guarantee). The off-page GBP/citation/review-outreach ops is the **ops lane**, NOT this WO — this is only what's buildable into the site/template. All client-specific values = config placeholders (demo-safe).

## 1. REVIEW-GENERATION FUNNEL (feeds review *velocity* — the fastest map-pack lever)
- Build a dedicated review path: a **`/review` page (or reusable component)** that one-taps / deep-links straight to the business's **Google review form** (the GBP "write a review" URL). Mobile-first, friendly: "Love your new roof? Leave us a 30-second Google review →" + the direct link.
- Make the **Google review URL a single per-client config value** (placeholder for the demo).
- Keep/enhance the existing reviews-display widget; ensure it stays schema'd (Review + AggregateRating).
- (The post-job *ask* — SMS/email after a completed job — is the ops/CRM lane. The SITE provides the destination + the frictionless one-tap path.)

## 2. ANALYTICS + TRACKING LAYER (the guarantee proof + the GSC-CTR audit + conversion measurement)
- Bake in **GA4** (tag + measurement-ID placeholder), **GSC verification** readiness (meta-tag/DNS placeholder), optional **GTM** container.
- **Conversion EVENTS** fired to GA4: form-submit, estimate-step-completion, **click-to-call** (`tel:` clicks), primary-CTA clicks — so leads/calls are measurable (this is the guarantee proof + the data the GSC-CTR audit and ranking case depend on).
- **Call-tracking hook:** structure the phone so a tracked number swaps in per client (placeholder now).
- Everything as per-client config placeholders — no real GA4 property needed for the demo; structure it so a real ID drops in cleanly.

## 3. NAP SINGLE-SOURCE-OF-TRUTH
- Ensure the business **NAP (name / address / phone) is ONE config value** used everywhere (header, footer, contact, JSON-LD, review funnel, sticky bar). Refactor if it's scattered. This lets a client's NAP be made byte-consistent with their GBP + citations — a real map-pack/citation factor.

## 4. (OPTIONAL) UTM-READY GBP LANDING
- Confirm there's a dedicated **localized landing page the GBP link can point to (UTM-ready)** that is NOT the same page already ranking organically (anti-cannibalization). The city/home pages exist — just ensure a clean UTM-ready target + note which page the GBP should point at.

## 5. VERIFICATION
- Review funnel deep-links to a Google-review URL, mobile-first, one tap.
- GA4 events fire on form-submit / `tel:` click / primary CTA (verify via datalayer/GA4 debug with placeholder ID).
- NAP identical everywhere (single source — grep confirms one value).
- No regressions; build/render/PIXELS/axe/mobile/reduced-motion/deployed-content.

## 6. PRESERVE
All WO_01–08 (conversion, Fulcrum balance, on-page SEO, NC compliance, rounded prices, insurance promotion, calm mobile hero, the /resources cluster). Additive only.

Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the review funnel + the tracking events wired + the NAP refactor + the GBP-landing recommendation.
