# BUILD MANIFESTO — Summit & Oak Roofing (V2 standalone, from scratch)

**From:** Website Engineer 10 (architect) · **To:** dedicated Builder agent (fresh context)
**Date:** 2026-06-17 · **Type:** full autonomous build handoff (zero-ambiguity spec)

> You are the builder. This file + the research dossier are your complete brief. Read
> §0 first, then build the whole thing. Joseph (the user) wants a **fully autonomous
> run** — use your best judgment 100% of the time; do NOT stop to ask questions. Report
> at the end (or per phase per §10). His eyeball is the only final gate.

---

## 0. ⭐ DO THIS FIRST (read order)
1. **This manifesto in full** (then reread once — locked decisions in §1 are immutable).
2. **The research dossier** — `C:/Users/josep/Claude Gravity/summit-oak-research/`:
   - `01-abovefold-hero-proof.md` — above-the-fold anatomy, hero-as-transaction, proof/reviews-widget patterns.
   - `02-lanes-storm-considered-financing.md` — storm/emergency + considered lanes, NC-compliant insurance language, the **financing-calculator build spec**.
   - `03-competitors-pages-seo.md` — competitor teardowns, the per-family page blueprint, the ~35-URL list, SEO/JSON-LD spec, city-uniqueness recipe.
   - Apply the dossier's findings. If a dossier finding conflicts with a §1 locked decision, the **locked decision wins**; otherwise the dossier refines this spec.
3. **The existing V2 identity reference** (read-only — DO NOT deploy it; it is the look to carry forward):
   `C:/Users/josep/Claude Gravity/kingmaker-summit-oak-roofing/src/` — `index.css` (@theme tokens), `motion.tsx` (motion DNA), `Hero.tsx`, `sections.tsx`, `App.tsx`, `index.html` (fonts). This is the charcoal+red identity + motion Joseph approved. Carry it at 100% fidelity into the Next.js build.
4. Then scaffold per §2 and build per §10 phasing.

---

## 1. 🔒 LOCKED DECISIONS (do not relitigate)
- **Standalone, from scratch, Next.js.** A brand-new Next.js (App Router) project. NOT a reskin of the AM flagship / contractor-template / demo-engine. ZERO coupling to them. Own repo/dir, own deploy.
- **Optimal SEO is the reason for Next.js.** Every page statically generated (SSG) or server-rendered — real HTML for crawlers (the old Vite SPA was rejected specifically because CSR is weak for SEO). Full JSON-LD, meta, canonical, OG on every page.
- **Brand:** Summit & Oak Roofing (placeholder demo brand — fine).
- **Market / geography:** Raleigh, NC primary + **5 city pages**: Raleigh, Cary, Knightdale, Garner, Clayton, Apex (pick the 5 best; Raleigh is the hub so 5 surrounding towns).
- **Default lane: storm/emergency-led** (highest converting). The home leads storm-first, but the site also serves considered/planned buyers (two lanes, one site — see dossier 02).
- **Identity = the V2 charcoal+red standalone look** (carry from the existing Vite build): charcoal base `#161719`, contractor red `#D8262C` (CTA/accent, white text 4.96:1), bright red `#FF6066` (small text on dark, 6.08:1), white text. **Newsreader** serif (display, Title Case headings) + **Plus Jakarta Sans** (body). Keep the existing motion DNA.
- **Full ~35-page SEO spine** (the page set in §4). This is the RANKING surface; the home/landing is the CONVERSION surface. Two surfaces, one site — never thin the depth to "clean up."
- **Conversion machine, premium = RESTRAINT.** Clean premium, NOT visually dense. "Full, not overstuffed." Every element must help the homeowner DECIDE, not just look impressive. Engineer toward the 8-14% per-page ceiling; sell "double the leads" out front.
- **DEMO scope — these are placeholders, on purpose:**
  - Lead form = **front-end only** (no backend; wire to a no-op / console / fake success state). Fine.
  - Analytics / call-tracking = **not built** (leave hooks/comments where they'd go). Fine.
  - Brand/content = **placeholder** (Summit & Oak, realistic-but-invented reviews/stats/phone). Fine.
  - "Google reviews" widget = **made-up placeholder mockup** — must LOOK convincing (real-widget anatomy per dossier 01).
- **Financing calculator = REAL / working** (build it per the dossier 02 spec).
- **Hero = a cinematic 15-second drone video**, smooth, art-directed, setting matching the charcoal/red palette (see §8).
- **Deploy target:** `kingmaker-summit-oak-roofing.vercel.app` (the existing Vercel project — re-point it to this Next.js build; keep the URL).
- **CTA grammar — the ONLY pair:** filled red button + trailing arrow (primary) / outlined "call" pill (secondary). Never invert, never a 3rd style.
- **NC insurance compliance (NON-NEGOTIABLE):** NO waiving deductibles, NO acting as a public adjuster, NO guaranteeing insurance approval, NO unattributed statistics. Use the SAFE-language list from dossier 02.

## 2. STACK + ARCHITECTURE
- **Next.js (App Router) + TypeScript + Tailwind v4 + framer-motion.** (Match the existing V2's Tailwind v4 + framer-motion 12 versions for motion parity.)
- **Rendering:** SSG (`generateStaticParams` for dynamic routes); every page ships crawlable HTML. Add `generateMetadata` per page (title, description, canonical, OpenGraph). FIX the old preview-surface SEO bugs — real per-page `<title>` (NOT "Preset Preview"), proper meta, canonical, OG.
- **JSON-LD** per page type (see dossier 03 — LocalBusiness/RoofingContractor, Service, FAQPage, AggregateRating/Review, BreadcrumbList).
- **Project location:** new dir `C:/Users/josep/Claude Gravity/summit-oak-roofing/` (do NOT overwrite the Vite `kingmaker-summit-oak-roofing/` — keep it as the identity reference).
- **Performance:** sub-2s mobile LCP is sacred. Lazy-load the hero video; poster image paints first; respect `prefers-reduced-motion`.
- **Routing:** clean slugs; cost guide MUST be `/roofing-cost`.

## 3. IDENTITY (carry from the existing V2 — read `kingmaker-summit-oak-roofing/src/`)
- **Tokens:** read `src/index.css` `@theme` for the exact token set (ink/charcoal `#161719`, red `#D8262C`, redhi `#FF6066`, surface, line, mist, redink, shadow-glow, etc.). Port them verbatim into the Next.js Tailwind v4 `@theme`.
- **Fonts:** Newsreader (display, opsz 6..72, weights 400/500/600) + Plus Jakarta Sans (body 400-800), via `next/font`. Title Case headings.
- **Motion DNA (port `src/motion.tsx` 1:1):** `ENTER_EASE = [0.16,1,0.3,1]` ("settled, not snapped"); `Reveal` (fade-up `whileInView`, `once`), `TypeIn` (word/char stagger, `cinematic` variant, text stays visible), `DrawLine` (red hairline scaleX), `Eyebrow` (drawn hairline + uppercase label), `Stagger`/`StaggerItem`. All reduced-motion-safe + no flash-of-invisible-text. Spring only on interactive press; tween+expo on reveals.
- **Existing atoms to carry + upgrade (from `src/sections.tsx`):** sticky Header, Hero (split + 3-step instant-estimate card), TrustBar, Why (3 cards), Process (3 steps), Reviews (3), Cost (price tiles + financing tile), CtaBand, Footer, StickyMobile call bar.

## 4. THE PAGE SPINE (~35 pages — finalize exact list per dossier 03)
- **Home** `/` — storm-led conversion landing (the showcase).
- **Services:** `/services` (hub) + `/services/roof-replacement`, `/roof-repair`, `/storm-damage-repair`, `/roof-inspection`, `/metal-roofing`, `/gutters`.
- **Storm damage:** `/storm-damage` (hub) + `/storm-damage/hail`, `/wind`, `/insurance-claims`.
- **Service areas:** `/service-areas` (hub) + `/service-areas/raleigh-nc`, `/cary-nc`, `/knightdale-nc`, `/garner-nc`, `/clayton-nc`, `/apex-nc`.
- **Brands:** `/brands` (hub) + `/brands/gaf`, `/owens-corning`, `/certainteed`.
- **Cost:** `/roofing-cost` (guide + price tables + financing tie-in).
- **Financing:** `/financing` (+ the working calculator).
- **Gallery:** `/gallery` (before/after).
- **Contact:** `/contact`. **About:** `/about`. **Reviews:** `/reviews`. **FAQ:** `/faq`.
- Services list + brands carried: reference the AM roofing flagship's set (GAF / Owens Corning / CertainTeed; replacement / repair / storm-hail / inspection / metal / gutters); use judgment. Target ~35 URLs total.

## 5. CONVERSION ARCHITECTURE (north star — apply per dossier 01/02/03)
**North-star test for every page:** a homeowner with a leaking roof landing from Google must know HOW to act AND what it COSTS within 5 seconds, without scrolling. Yes = conversion machine. No = brochure.
- **Hero = transaction surface.** Above the fold, before any scroll: book-an-estimate (primary) + rating/reviews + price range + financing + proof. The 5 decision inputs, visible immediately, WITHOUT clutter (premium restraint). Storm-led urgency on the home.
- **Two surfaces:** home/landing = tight, top-loaded, ruthless conversion. Service/city/brand pages = depth that ranks. One page never carries both jobs.
- **Proof at every CTA:** review density, license/insurance/GAF/BBB badges, the placeholder Google-reviews widget near CTAs.
- **Storm lane** (default): urgency, 24/7, click-to-call dominance, free documented inspection, COMPLIANT insurance-claim framing. **Considered lane:** before/after sliders, financing, warranty, objection-handling.
- **Motion serves the decision** — never a delay. Lazy-load hero motion. Max 1 scroll-pinned beat per page if any.
- Build analytics/call-tracking HOOKS (commented placeholders) so they're trivial to wire later.

## 6. ATOMS TO BUILD (carry V2 + add conversion atoms)
Carry forward: Header, Hero, TrustBar, Why, Process, Reviews, Cost, CtaBand, Footer, StickyMobile.
Add/upgrade: **instant-estimate multi-step card** (hero), **financing calculator** (real — dossier 02 spec), **placeholder Google-reviews widget** (convincing mockup), **before/after slider**, **storm-urgency band** (24/7 + click-to-call), **trust/badge bar**, **price-tier cards**, **city/service/brand page templates**, **FAQ accordion** (FAQPage JSON-LD), **breadcrumbs**. Keep the single CTA pair everywhere.

## 7. CONTENT RULES
- Brand **Summit & Oak Roofing**; realistic invented demo data (reviews from Triangle towns, stats, a placeholder NC phone). Mark nothing as a real guarantee.
- **NC compliance:** SAFE insurance language only (dossier 02). No deductible-waiver / public-adjuster / approval-guarantee / unattributed-stat.
- **Voice:** plain, confident, benefit-led ("caveman" = simple short bullets). **No walls of text** — bullets/standfirsts. **No em dashes** in body copy. Title Case headings.
- City pages: genuinely unique per the dossier city-uniqueness recipe (no doorway/thin content).

## 8. IMAGES + HERO VIDEO (art-direct; Higgsfield MCP)
- **Hero video:** generate a **15-second drone/aerial shot**, smooth + cinematic, of a premium home/roof at a moody hour (dusk/overcast) so the scene reads charcoal with the red brand accent popping. `generate_video` (Higgsfield). Provide a poster frame (first-frame extract) for instant paint + reduced-motion. Vision-QA the result before shipping; regenerate if off-palette or janky.
- **Section/gallery images:** Higgsfield `soul_2`, art-directed, charcoal/red palette, 16:9 hero / 4:3 cards. Real roofing scenes (crews, storm damage, before/after, brand shingles). Vision-QA every gen.
- ALWAYS vision-QA generated media (the rule: look at the pixels).

## 9. VERIFICATION GATES (this site is NOT under the flagship verify-gate — own your verification)
Before claiming ANY page done, and before "shipped":
1. **Build:** `tsc --noEmit` + `next build` green (all ~35 routes compile).
2. **Headless render EVERY route:** 200 + **0 console errors** + correct CONTENT (grep a unique per-page marker — not just status).
3. **Verify rendered PIXELS** (the WE9 lesson): screenshot each page family at desktop + mobile; do a vision pass; confirm it looks premium + on-brief + nothing clipping/broken. DOM-clean ≠ looks-right.
4. **axe** desktop + mobile, target **0 serious / 0 critical** (use bonded-pair contrast tokens from day 1 — do NOT repeat the flagship's white-on-amber CTA debt; red `#D8262C` CTA uses white text 4.96:1, bright red `#FF6066` for small-on-dark).
5. **Reduced-motion** pass (content visible, loops stop) + **mobile** pass (sticky call bar, tap targets, no overflow).
6. **Deployed CONTENT check:** after deploy, confirm the live URL serves THIS build (grep a unique marker), not a cached/old build.
7. **Joseph's eyeball = final gate.** No "shipped clean" without it.

## 10. PHASING (build order — keeps it manageable; report per phase or at end)
1. **Scaffold + identity:** Next.js project, port tokens/fonts/motion, base layout (Header/Footer/StickyMobile), CTA atoms. Verify build.
2. **Home (the conversion showcase):** hero (video) + instant-estimate card + trust bar + storm urgency + proof/reviews widget + process + cost + financing tie-in + CTA bands. This is the centerpiece — get it right, vision-QA hard.
3. **Conversion atoms:** financing calculator (real), before/after slider, FAQ accordion, breadcrumbs.
4. **Page families (templated):** services (hub+details), storm-damage (hub+subs), service-areas (hub+6 cities), brands (hub+3), cost, financing, gallery, contact, about, reviews, faq. Per-page JSON-LD + metadata. Keep city pages unique.
5. **Media:** hero video + section/gallery images (Higgsfield), vision-QA each.
6. **Verify (full §9 stack) → deploy → live-verify → report to Joseph.**

## 11. DEPLOY
- From `summit-oak-roofing/`: `next build`, then `vercel deploy --prod` linked to the **existing** `kingmaker-summit-oak-roofing` Vercel project (so the URL stays). Update the project's framework preset to Next.js (it was Vite) — Vercel auto-detects on deploy, or set in dashboard/`vercel.json`.
- Globally-unique name is already ours. After deploy: confirm the live URL serves the NEW Next.js build (unique marker + pixel check), not the old Vite site.
- Local dev gotcha (from the flagship lane): if `.next` corrupts, `rm -rf .next`. Don't run dev-server + build simultaneously.

## 12. TASTE & CALIBRATION LEDGER (Joseph — carry verbatim)
- **editorial ≠ converting** (AM 3/10, mockup 7/10, premium+conversion 9/10).
- The **ONLY CTA pair** = filled red + arrow / outlined call pill. Never a 3rd style.
- **"Full, not overstuffed"** (cardinal). **No walls of text ever.** **Premium = restraint, not volume.**
- **"triple the size" → ~2×** (calibrate literal asks; state the call, his eyeball decides).
- **NO inline screenshots** in chat (captures to disk; vision passes via background agents returning TEXT; Joseph eyeballs URLs).
- **Verify rendered PIXELS before any "looks good"** (DOM/console clean ≠ looks right).
- **Verify a deployed URL serves YOUR content** (not just HTTP 200 — Vercel subdomain collisions are real).
- **Re-confirm architecture/scope when ambiguous BEFORE building.**
- **Concede with numbers, never defend; diagnose the ATOM** on feedback. **Annotations are symptoms, not specs** — fix to the standard, extrapolate on 2× feedback.
- Comms: moderate emoji, ✅/❌ status, **no exclamation points**. "caveman" = short plain bullets.

## 13. PITFALLS / DEAD-ENDS (do not repeat)
- **Didn't-look-at-pixels:** never claim "renders clean" from DOM + 0 console errors alone. View the pixels.
- **Wrong-link Vercel collision:** a common project name resolves to a stranger's deploy; always verify the deployed URL serves OUR content via a unique marker.
- **whileInView + full-page screenshot artifact:** scroll-reveal sites look "empty mid-page" in an unscrolled full-page capture (content is at opacity:0 until scrolled). Capture after scrolling OR use a reduced-motion capture; never report a "void" without checking opacity/DOM first.
- **CSR weak SEO:** the whole reason we're on Next.js — do not regress to client-only rendering for content pages.
- **Contrast debt:** bonded-pair tokens from day 1; never ship white-on-amber-style low-contrast CTAs (the flagship's L2/L3 axe debt).

## 14. DOSSIER REFERENCES + OPEN ITEMS
- Conversion research: `summit-oak-research/01-abovefold-hero-proof.md`, `02-lanes-storm-considered-financing.md`, `03-competitors-pages-seo.md`. Read all 3; apply.
- Identity reference (read-only): `kingmaker-summit-oak-roofing/src/*`.
- Open (builder's judgment): exact final page list (~35, per dossier 03), per-city unique content, hero video scene direction, gallery image set. Use best judgment; do not stop to ask.

---
*— WE10, 2026-06-17. Build the whole thing autonomously, verify PIXELS + deployed CONTENT (not DOM/200), then hand the live URL to Joseph — his eyeball is the only final gate.*
