# KING MAKER FIRM SITE — WORK ORDER 10

*Build the **KingMaker pricing tab** (the $497/mo offer) — **one new page.** Plus two small surgical
cleanups: a $10–15k anchor into the buyer's guide (education-side) + a matrix-language scan-and-correct.
**"Phase F — the offer."** Architect: WE16 · 2026-06-27 · Builder: **WARM** (holds the codebase +
manifest + WO_08/09; reread ONLY this WO). Source: `KM_SITE_PRICING_BRIEF.md` +
`KM_SITE_PRICING_BRIEF_REFINEMENTS.md` + vault `km-offer-497-subscription`. Live on **kingmakerseo.com**.*

> 🛑 **CADENCE (Joseph-confirmed): BUILD + VERIFY LOCAL → Joseph eyeballs → Joseph confirms → THEN deploy.**
> Do NOT auto-deploy. Money page + the offer is pre-market/fluid.

## 0. ⭐ LENS + ANTI-DRIFT
- **Two voices, never crossed:** the **pricing TAB = SALES / Howard-Roark reframe** (declarative, premium). The **buyer's guide = NEUTRAL education** (it STAYS that way — see §3). (`km-content-voice-register`.)
- **Component-first** — compose from the manifest primitives (`PageHero`, `Section`, `.km-card`, the section recipe); don't handcraft what exists, don't rebuild motion.
- 🔴 **Continuous skill invocation** (§8) before each edit group; skills-gate is live on `components/`. `verify-before-claim` before any done-claim.
- 🛑 No auto-deploy (header).

## 1. THE PRINCIPLE — "THE CLEAN FIXED-PRICE OFFER (no weeds)"
The tab sells ONE thing — the **$497/mo site subscription** — at a premium, with **zero à-la-carte surface**, so the sales call stays simple and the offer is un-comparison-shoppable. Qualify the ICP **in AND out**; rail every claim. *Never expose a number that reopens negotiation.*

## 2. ⭐ THE PRICING TAB — the ONE new page (`/pricing`)
Firm-site design standard (PageHero hero + `Section` bands + premium `.km-card` cells), SALES voice, blue/white/square, readable, mobile-first, one-shot motion. Add it as a **nav tab** (Header) + Footer + sitemap. Sections:
1. **Hero** — premium sales headline anchored on the offer ("Enterprise websites for contractors — $497/month," or a Roark reframe of the $297-brochure market). Sub-lede + **primary CTA = book a call.**
2. **Tier 1 — The site · $497/mo** (centerpiece price card): flat, **month-to-month, no contract.** Buys: the premium enterprise-grade site, **built + hosted + maintained by us, stays live as long as you're subscribed.** 🔴 Value = the site + hosting + uptime, **NOT monthly deliverables** (KM is NOT obligated to produce something monthly — do NOT promise blog posts/output). **Kill-switch framing:** it lives on our infra; the subscription keeps it live → "built, hosted + maintained by us," **NOT "you own it."**
3. 🔴 **NO $10–15k value anchor on this tab.** (Joseph 2026-06-27: the $10–15k lives in the buyer's-guide education, §3 — NOT here.) The tab's premium signal stands alone — *enterprise-grade, and yes it costs more than the $297 brochure crowd; that's the point* — with **NO exposed/buyable build price · NO $10–15k figure · NO à la carte · NO "X payments of $497" · NO buyout.** The only purchasable things = the $497/mo sub (+ the separate off-page sub).
4. **Tier 2 — Off-page SEO · separate subscription** (a distinct add-on, NOT in Tier 1): recommended spend by area — **$1,000/mo (low) · $2,000/mo (medium) · $3,000/mo (high competition / major metro)** (low-comp markets move on less, ~$500/mo). Month-to-month, set the **~3–6 month** expectation. Honesty rail: **lifts rankings/traffic but DECAYS → ongoing/indefinite**; requires consistent reviews + GBP setup; ~1 in 10 opt in. Pushes GBP/map-pack toward #1.
5. **Who it's for — ICP qualify IN and OUT:** FOR competitive-area contractors who'll invest, are sick of shared/lead-gen leads, want steady inbound. **NOT for low-traffic / middle-of-nowhere markets** (low ceiling = not a fit). Qualifying out raises call quality.
6. **CTA band** — book a call; link the [buyer's guide](/guides) + [audit](/audit) as the pre-sell.

## 3. ⭐ BUYER'S-GUIDE — MINIMAL edit only (the guide STAYS pure education)
Joseph: *"the pricing guide in the buyer's guide will stay"* + *"the $10–15k value anchor goes into the buyer's guide."* So `lib/guide-content/what-a-website-should-cost.ts` stays **pure neutral market education** — do **NOT** reconcile it to the $497 model · **NO** subscription bridge · **NO** mention of KM's $497 offer · **NO** link to `/pricing` (it is NOT a sales funnel). **The ONLY edit:** enterprise **$75 → $100/page** (typical agency rate) in all 3 spots, and recompute the enterprise total to **≈$10,000–$15,000** for a full build (drop "≈$3,750+"). That is the $10–15k anchor, education-side. PRESERVE everything else verbatim (the MEASURED 1,017-site stats, the anti-doorway, the structure, the flags, the neutral voice).

## 4. ⭐ MATRIX-LANGUAGE SCAN + CORRECT (Joseph: "scan for that, correct it if you find it")
The no-combo lock = dedicated service pages + dedicated location pages, **NO per-service-per-town matrix.** Scan the site for any **service×city-matrix language or visuals** that still imply a matrix and CORRECT each to the no-combo reality (surgical **copy/data only — NOT a redesign**):
- `lib/claims.ts` (the `MatrixGrid` data + any "matrix" copy) · the `MatrixGrid` chart wherever a guide renders `chart: "matrix"` (reframe/remove the matrix visual — we don't sell the matrix) · `llms.txt` · any marketing copy.
- ⚠️ **The HOME is the WO_07 approved masterpiece** — WO_07 already removed "service-by-city," so it's likely clean; **verify**, and if any matrix-copy remains, fix it **SURGICALLY (copy/data only, zero layout/motion change)** and **FLAG every home edit in the report for Joseph's eyeball.**
- Do NOT introduce combos; do NOT un-archive "by trade."

## 5. NUMBERS + HONESTY FLAGS (use exactly; flag every one)
| Item | Value | Flag |
|---|---|---|
| Site subscription (Tier 1) | **$497/mo** flat, month-to-month | the offer (firm) |
| Off-page SEO (Tier 2) | **$1k low / $2k med / $3k high-comp(major metro)**; low-comp ~$500 | recommended spend |
| Off-page honesty | lifts but DECAYS, ongoing; ~3-6mo; needs reviews+GBP | rail |
| Enterprise (guide §3 ONLY) | **$100/page ≈ $10–15k** full build | ILLUSTRATIVE education, NOT on the tab |
| 🔴 Traffic claim | **~3-5x vs the AVERAGE BROKEN site** | **caveated projection, NOT a guarantee** |
🔴 **Traffic rail (FTC-sensitive):** "~3-5x" is vs a *broken* baseline, LESS if they have a functional site, geo-dependent. Frame as a **caveated projection, never a flat guarantee**; do NOT lead with the visitor headline (the site quality + ranking system leads). When in doubt, soften.

## 6. 🔒 LOCKS + PRESERVE-LIST + ⭐ CARRY-FORWARD LEDGER (WO_08/09 + post-WO_09 + manifest — 0 silent drops)
- ✅ Blue/white · square · two-font · one-shot + reduced-motion · heading-level motion · accent discipline (red = damage only) — CARRIED.
- ✅ Readable-first / overstimulation gate (sales voice ≠ walls; premium + scannable) — CARRIED.
- ✅ Manifest primitives + PageHero + section recipes (compose, never rebuild/alter primitives) — CARRIED.
- ✅ TWO voices (sales tab / neutral guide) — CARRIED.
- ✅ NO service×city combos (this WO actively enforces it, §4) · "by trade" stays ARCHIVED — CARRIED.
- ✅ SEO + security spine (schema, canonicals, sitemap-registry, `cyber-security-specialist-1` files) — PRESERVE.
- ✅ Honesty flags (MEASURED/MODELED/ILLUSTRATIVE) · no PBNs · no "guaranteed #1" — CARRIED.
- ✅ Footer no-orphan — add `/pricing` to Header nav + Footer + sitemap (≤2 clicks).
- 🔴 **THE HOME + the buyer's-guide structure + every other page — DO NOT redesign.** Only: the new `/pricing` page (§2), the one-line guide price edit (§3), and surgical matrix-copy corrections (§4, home edits flagged).
- ✅ AI-legibility NOT a firm-site gate (struck WE15) — CARRIED.

## 7. 🚫 OUT OF SCOPE
- **BUYOUT (~$5k one-time): OFF the site entirely** — never mentioned anywhere.
- **/work + /system + /playbook rework = a SEPARATE WO (WE17)** — NOT this one (same warm builder may run both, but this WO = the pricing tab + §3 + §4 only).

## 8. ⭐ PER-EDIT SKILL MAP (invoke BEFORE each group)
| Group | Invoke (Skill tool) |
|---|---|
| Pricing tab build (sections, price cards, layout) | `impeccable` + `frontend-design` + `design-taste-frontend` + `ui-ux-pro-max` + `high-end-visual-design` |
| Any motion on the tab (hero/reveals) | `framer-motion` + `design-motion-principles` |
| Guide edit (§3) + matrix-copy corrections (§4) | `impeccable` + `frontend-design` |
| Before any "done/built" claim | `verify-before-claim` |

## 9. VERIFICATION GATES (LOCAL — then Joseph eyeball → confirm → deploy)
- `tsc` 0 · `next build` all-SSG incl. the new `/pricing` route.
- **Offer-integrity grep (the page):** $497/mo + off-page tiers present; **NO à la carte · NO exposed/buyable build price · NO $10–15k on the tab · NO "X payments" · NO buyout** anywhere.
- **Voice:** tab = sales/Roark; guide = neutral education (unchanged except the §3 price).
- **Honesty:** 3-5x caveated + not the headline; tiers flagged; MEASURED flags intact; no PBNs/guarantees.
- **Readability + motion:** premium, no walls; heading-level motion fires; reduced-motion → final; mobile 390px clean.
- **No-orphan:** `/pricing` in Header nav + Footer + sitemap.
- **§3 gate:** guide enterprise = $100/page ≈ $10–15k; NO bridge / NO $497 mention / NO /pricing link in the guide.
- **§4 gate:** 0 service×city-matrix contradictions remain; any home edit is surgical + flagged.
- Then 🛑 **report for Joseph's eyeball.** On his confirm → deploy + **re-alias kingmakerseo.com + www (+ kingmaker-firm)** (or convert to a permanent project domain) + **flip `SITE_URL`/canonicals → kingmakerseo.com** + **byte-check the CANONICAL host.**

## 10. 🛑 CADENCE (WARM builder)
Skills (§8) → reread THIS WO (ultrathink, min 3) → build `/pricing` (§2) + the §3 guide price edit + the §4 matrix scan/correct → §9 gates LOCAL green → 🛑 **STOP, report for Joseph's eyeball** (don't auto-deploy) → Joseph confirms → deploy + re-alias + flip SITE_URL + byte-check canonical → report live.

---
*— WE16, 2026-06-27. WO_10 / Phase F (CORRECTED to Joseph's scope): ONE new page = the KingMaker pricing TAB ($497/mo site sub + separate off-page sub $1k/$2k/$3k), clean — no à-la-carte, no exposed build price, no $10–15k anchor on the tab, no buyout, ICP qualify in/out, 3-5x honesty-railed, sales voice. The buyer's guide STAYS pure education — only edit = enterprise $75→$100/page (the $10–15k anchor, education-side). Matrix-language SCAN + CORRECT to the no-combo lock (home surgical + flagged). Build + verify LOCAL → Joseph eyeball → confirm → deploy. Carries every WO_08/09 + post-WO_09 lock forward; home not redesigned.*
