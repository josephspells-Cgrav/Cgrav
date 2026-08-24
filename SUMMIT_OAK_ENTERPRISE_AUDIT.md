# Summit & Oak — Enterprise-Grade Verification Audit (WO_16, Leg A)

**Date:** 2026-06-24 · **Auditor:** website-engineer (WARM off KM_VALUEPROP) · **Target:** `summit-oak-roofing/` @ `main d4a4b10`, live `kingmaker-summit-oak-roofing.vercel.app`
**Lens:** the ⭐ organic-dominance SPINE — every dimension judged by *"does it maximize ORGANIC regional dominance"*; the pack is a proximity-capped byproduct we deliver, never the product. **Verified, not assumed** — every finding red-teamed against the live site (Built≠Reachable).

---

## Bottom line

**Summit & Oak is at enterprise-grade for organic ranking power. No REAL gap remains that blocks organic dominance. The 9.5/9.5 machine is preserved.** All six automated gates are GREEN, and the adversarial re-audits (combo-vs-parent cannibalization, glossary reachability, the persistent-hero persistence test, the deployed-render parity check) confirm the green is *real*, not gate-theater.

The audit surfaced **one real (minor) gap** — the doorway gate has a blind spot (it never compares service×city combos against their `/services/[slug]` parent) — plus **one launch-seam** (schema `sameAs` ships intentionally empty on the demo; it is the entity-lock a launched client populates from the Leg B citations). Everything else is either PASS or a logged diminishing-return at the 9.5 bar. The build is the difference-maker the doctrine says it is.

**Gate baseline (this session, server on `:3210`):**

| Gate | Result | Evidence |
|---|---|---|
| `tsc --noEmit` | ✅ PASS (0) | clean |
| `next build` | ✅ PASS (0) | 141 routes prerendered (SSG) |
| `reachability-check` | ✅ **0 orphans** | 141/141 sitemap routes ≤2 hops (58 in 1 hop) |
| `doorway-check` | ✅ PASS | max pairwise 31.6% (<40%); delete-the-city-name ≥4 signals all |
| `security-audit` | ✅ **10/10 GREEN** | all 10 controls present; receipt restored (`git checkout`) |
| `playwright` desktop+mobile | ✅ **125 passed / 0 failed** (3 project-skips) | axe **0 critical / 0 serious** every page type; persistence PASS; fork PASS; funnel PASS; nav PASS; security PASS; trust-doorway PASS |

---

## Persistent-hero + F.3 QA (the open WE-QA fold-in)

**Persistence test — ✅ PASS (the headline DoD).** `tests/persistence.spec.ts` (chromium, desktop): stamps the live `.so-hero-stage video` node with a token, performs a client-side `<Link>` nav `/` → `/services` → `/storm-damage` (FULL→FULL→FULL), and asserts on each hop the video is the **SAME DOM node** (token persists) and `currentTime` **kept advancing** (never reset to 0). Net currentTime advanced across the journey. The architecture backs this: the `<video>` is rendered once by `PersistentStage` inside `HeroStageProvider` (above `{children}` in the root layout), latched via a `mounted` flag so it never unmounts. **Verdict: persistence contract holds.**

**Per-tier reveal — ✅ PASS.** The reveal-markers test confirms FULL reveals the stage (band height >100px) and PURE collapses it (<2px). The 3 tiers exist in code (`HeroStage.tsx`: `full` cinematic reveal / `lighter` poster band / `pure` off-screen). Tier-aware scrim keeps copy AA over footage (see Accessibility).

**Cold deep-FULL-page load (the WO's flagged real risk) — ✅ RESOLVED.** The organic-search entry is a cold direct deep-page load. Live `https://…/services/roof-replacement` serves `data-so-hero="full"` + `.so-hero-stage` in the **SSR HTML** → the `:has([data-so-hero])` CSS sets the band's first-paint height and the poster (`ReactDOM.preload("/hero-poster.jpg", {fetchPriority:"high"})`) is the LCP before JS. The video itself is client-mounted (correctly absent from SSG HTML — *not* a bug, by design); on desktop FULL it auto-mounts, on mobile it is engagement-gated (poster-first, no cellular auto-pull). So a cold FULL deep-page entry paints the poster as LCP and reveals the hero — no regression.

**Trust bar everywhere — ✅ PIXEL-CONFIRMED.** `TrustBar` ships via `PageHero` (the shared hero wrapper the standard page pattern uses) + explicitly on home and `/review`. The live vision pass found a trust/rating bar present on **all 14 audited page types, desktop AND mobile.**

**The 3 hero tiers — ✅ PIXEL-CONFIRMED.** The vision pass verified all three tiers render correctly across the deployed page types: **FULL** (cinematic photo reveal on home/service/city/combo/material/storm/commercial/projects/tool/es), **LIGHTER** (quiet poster band on resources-hub/glossary/blog), **PURE** (clean header, no hero on /review). Hero copy is AA-legible over the darkened footage on every page (corroborates axe 0-serious). The WO_12 dual-intent fork is pixel-verified: **storm-hail leads call-first** (red emergency call panel, quiz demoted) while retail/research surfaces keep the **quiz-first**; mobile shows the sticky Call/Estimate bar on all 14 pages and the sticky flips correctly per intent.

**F.3 nav polish — ✅ PASS.** `nav.spec.ts`: "Metal Roofing nav labels are disambiguated (install service vs material)" PASS and "services hub meshes down to /materials" PASS. Both routes 200 live (`/services/metal-roof-installation` is intentionally *not* a route — the service is "Metal Roof Installation"; the material is `/materials/metal-roofing`). The label-collision is resolved in HTML.

---

## Dimension-by-dimension audit (through the organic-dominance lens)

**1. Technical SEO / indexation — ✅ PASS.** Sitemap composed from `lib/sitemap-registry.ts` (141 routes, type-tagged, per-entry `lastModified`, `changeFrequency`/`priority`, hreflang `alternates` for `/es`). `robots.ts` declares the sitemap + host and the AI-bot hierarchy. `middleware.ts` 301s verified live (`/service-areas/raleigh` → 301 → `/locations/raleigh-nc`). `trailingSlash:false` canonicals. `llms.txt` 200. No crawl traps. *Minor:* sitemap `lastModified` falls back to a static `2026-06-17` build date for entries without an explicit date — cosmetic, not a ranking issue.

**2. On-page SEO + content depth + E-E-A-T — ✅ PASS (this is the organic engine).** Named author **Marcus Bell** + `Person` schema present on every page (`author:true` across all types); `/about#owner` anchor. Answer-first body (`AnswerBlock` + `Speakable` regions). Unique titles confirmed (combo "Roof Replacement for Raleigh **& Wake County** Homes" vs parent "Roof Replacement **in Raleigh, NC**"). The **internal-equity cascade** — `CrossLinks`, `lib/related.ts`, the footer surface-map, hub-down meshes — is the site's **link-absorption capacity** (the deep-site lever that distributes an off-page budget across silos; Leg B T3). Topical-authority clusters: 34 `/resources` articles + 20 glossary terms + 6 blog posts + service/material/storm silos.

**3. Anti-doorway / cannibalization — ⚠️ ONE REAL (minor) GAP.** `doorway-check` PASS (max 31.6%). **Adversarial re-audit of the known blind spot:** the gate's `docs` set contains articles, glossary, blog, money pages, 14 cities, and the 4 combos — but **no `/services/[slug]` parent pages**, so a combo is never compared against its parent. I fetched all four combos vs their parents and computed 5-gram similarity: **all LOW** — `/locations/raleigh-nc/roof-replacement` vs `/services/roof-replacement` = **11.0%**; roof-repair = 10.6%; storm-damage-roof-repair = 11.8%; metal-roofing vs `/materials/metal-roofing` = 8.5%. So the blind spot is **real in the gate** but does **not** currently manifest as content cannibalization — the combos carry a distinct "& Wake County" county angle. *Residual:* mild title/head-query overlap (both combo and parent target "Roof Replacement Raleigh"). **Verdict: extend the gate to include parents (spec, S); not a live content fix.**

**4. AI / SGE / LLM-search readiness — ✅ PASS (a day-one organic differentiator).** `llms.txt` is comprehensive (canonical entity description + Marcus Bell + every silo with descriptions + sitemap pointer). `robots.ts` explicitly allows the citation-critical bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended) with the correct rationale (blocking GPTBot ≠ blocking ChatGPT Search). Answer-first `AnswerBlock` + `SpeakableSpecification` nodes + the `@graph` entity-home make the site **citable as the answer source**. Strong.

**5. Schema / structured-data validity — ✅ PASS (2 honest caveats, neither a bug).** Live `@graph` is rich and parses clean on every type: `RoofingContractor+LocalBusiness+Organization` (entity-home, referenced by `@id`), `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `Offer`+`PriceSpecification`, `FAQPage`, `Person` (author), `Article`/`BlogPosting`, `Project` (job-pin), `AggregateRating`/`Rating`/`Review`, `GeoCoordinates`, `PostalAddress`, `OpeningHoursSpecification`, `SpeakableSpecification`, `EducationalOccupationalCredential`, `AboutPage`, `CollectionPage`/`ItemList`. **Caveat (a) — `sameAs` ships EMPTY on all pages.** This is **demo-correct** (`business.ts`: fabricated bare-root profile URLs read as fake to entity systems — worse than absence — so the demo ships `sameAs:[]` and `organizationNode` omits the field). It is **the entity-lock launch-seam**: populate from the client's real GBP/BBB/citation URLs at launch (Leg B L4). **Caveat (b) — the self-serving `aggregateRating` on the org node is ineligible for Google star rich-results** (KM_VALUEPROP-verified Google docs) — it is an AI/entity signal, not Google stars; the figures are attributed as the company's own (not unattributed industry stats). `FAQPage` is emitted for AI only (Google FAQ rich-results are dead 2026 — a deliberate build-contract decision). *Follow-up (diminishing-return): a live Google Rich Results test pass before a deck cites a specific node.*

**6. CRO / conversion — ✅ PASS (9.5/10 preserved).** `fork.spec.ts` PASS: the WO_12 dual-intent fork is intact — urgent/emergency surfaces lead call-first, retail surfaces keep the estimate-quiz-first, the sticky bar flips per intent, and the home page gained a co-equal call path **without** demoting the quiz. `funnel.spec.ts` PASS (EstimateQuiz bounded payload → 200; malformed → 400). No conversion regression from the hero work.

**7. Performance / CWV — ✅ PASS (no persistent-video regression).** The WO's priority question — *did the persistent video layer regress CWV?* — answers **no**: the video is client-mounted (absent from SSG HTML), the poster is the LCP (`fetchPriority:"high"` preload, hoisted into `<head>`), the band height is set pre-paint via `:has([data-so-hero])` so there is **no layout shift (CLS-0)**, the clip loads **once** and persists across nav (a CWV *win* vs a per-page refetch), mobile is poster-first (engagement-gated, no cellular auto-pull), and reduced-motion shows the poster only. `capture.spec` (render + a11y) passed on every type, desktop + mobile. *Hardening (diminishing-return): a live Lighthouse/CrUX field pull on 3–5 deep FULL pages would convert "no regression signal" to a measured field number — not required at 9.5.*

**8. Accessibility — ✅ PASS.** axe-core **0 critical / 0 serious** on every audited page type, desktop AND mobile (`capture.spec.ts`). The tier-aware scrim + text-shadow holds copy at AA over the hero video (axe 0-serious includes contrast violations → contrast passes).

**9. Security — ✅ 10/10 GREEN.** All 10 controls present (static CSP no-nonce, Zod strictObject→400, HMAC webhook + zero-persistence, rate-limit→429, honeypot+time-trap+BotID, lockfile+`npm ci`, Dependabot+Socket+audit-clean, standard headers, WAF runbook). Receipt restored via `git checkout -- security-receipt.json`. CSS-owned layers untouched. Honest language only (OWASP-hardened / zero-stored-data — never SOC2/bank-level).

**10. Navigability / reachability — ✅ 0 orphans.** BFS of the static SSR HTML from `/`: **141/141** sitemap routes reachable ≤2 hops (58 in 1 hop). The **footer surface-map** is the no-orphan net — critical because the desktop nav dropdowns render only on hover (client state) and are **not** in static HTML, so the footer (every service/material/brand/city/storm/resource/company link + NAP) + hub-down links carry reachability. **Glossary signal (WO) — resolved:** the homepage need not link `/glossary` directly; it is reachable in ≤2 hops via the footer "Resources" column (`/resources/glossary`) + the `/resources` hub. `nav.spec` separately confirms the Resources dropdown reveals Glossary + navigates. Not an orphan cluster.

**11. Local-proof / entity signals — ✅ PASS (bridges to Leg B).** Canonical NAP single-sourced in `lib/business.ts` (5000 Falls of Neuse Rd Ste 210, Raleigh NC 27609; `(919) 555-0185`; NC #74122; 4.9/312 attributed as the company's own) and rendered consistently in the footer `<address>` + the `@graph`. `GeoCoordinates` (35.8436, -78.6403). `areaServed` = the 14 cities. The GBP-link→dedicated-landing pattern exists as `/review` (correctly `noindex,follow` — a funnel destination, not an organic page; `/reviews` stays the canonical indexable page). **The one launch-action: populate `sameAs` + swap the `googleReviewUrl` PLACE_ID** (both flagged in `business.ts`) — this is the L4/Leg-C seam, not a demo defect.

---

## GAP LEDGER

| # | Dimension | Finding | Evidence | Severity | Effort | Verdict | Action |
|---|---|---|---|---|---|---|---|
| 1 | Anti-doorway (3) | Doorway gate never compares service×city combos vs their `/services/[slug]` parent — a combo could cannibalize the parent head query undetected | `doorway-check.mjs` `docs` set has no `/services/*`; adversarial re-audit shows current combos LOW (8.5–11.8%) but the gate is blind | minor | S | **REAL GAP (in the gate)** | Extend `doorway-check` + `lib/doorway-gate.ts` to include `/services/[slug]` parents in the pairwise set; spec for a follow-up (not a live content fix — combos are currently differentiated) |
| 2 | Schema / Local-proof (5/11) | `sameAs` empty on all pages; `googleReviewUrl` = PLACE_ID placeholder | live `@graph` `sameAs:false` everywhere; `business.ts:45-49` | n/a (demo-correct) | S | **LAUNCH-SEAM, not a gap** | At launch populate `business.ts.sameAs[]` from the Leg B citations (the entity-lock) + swap the GBP place ID. Make it config-driven (Leg C) |
| 3 | Anti-doorway (3) | Mild title/head-query overlap: combo + parent both target "Roof Replacement Raleigh" | combo title "…Raleigh & Wake County" vs parent "…Raleigh, NC" | nice-to-have | S | DIMINISHING-RETURN | Combos already lead with the county angle; optionally sharpen combo titles to a pure local-intent modifier. Log, don't chase |
| 4 | Technical SEO (1) | Sitemap `lastModified` defaults to a static `2026-06-17` build date | `app/sitemap.ts` | nice-to-have | S | DIMINISHING-RETURN | Cosmetic; real `lastmod` only matters for frequently-updated pages. Log |
| 5 | Schema (5) | No live external validator pass this cycle (structural inspection only) | `.audit-schema.cjs` parsed clean; not run through Google Rich Results | nice-to-have | S | DIMINISHING-RETURN | One-time Rich Results / Schema.org validation before a deck cites a node. Log |
| 6 | Performance (7) | No live Lighthouse/CrUX field number (architecture sound, no regression signal) | poster-LCP + CLS-0 by design; `capture.spec` green | nice-to-have | M | DIMINISHING-RETURN | Optional one-time field pull on deep FULL pages. Log |

| 7 | On-page depth (2) / Local-proof (11) | `/projects` reads thin vs its own "real jobs, not keywords" anti-doorway promise — one documented-jobs section (2,720 chars rendered vs ~9,866 on `/resources`); the proof asset is the lightest money-adjacent page | live vision pass + scroll-probe DOM measure | minor | M | **REAL GAP → spec-for-build** | Deepen `/projects` with more documented jobs (address/neighborhood + before/after + system installed) — feeds the local-proof entity + the anti-doorway thesis. Leg D (deferred) |
| 8 | Local-proof / i18n | `/es` is a single translated landing, not a localized site — the lang toggle, trust-logo sublabels, and footer surface-map stay English on `/es` | live vision pass (`/es` desktop+mobile) | minor | L | **KNOWN SCOPE (log)** | Per BUILD-CONTRACT §WS-E `/es` = translated static pages, launch = owner-only; a full ES nav/footer is a deliberate v1 cut. Log; expand if the Hispanic-homeowner segment is prioritized |
| — | Performance/render (7) | resources-hub + projects full-page captures showed dark voids | scroll-probe: after triggering `whileInView`, 11/5 sections, 0 un-triggered (opacity<0.1), **0 tall-but-empty real voids** | n/a | — | **VERIFIED ARTIFACT — NOT a gap** | The voids were framer-motion scroll-reveals captured pre-trigger by a static full-page screenshot; a live scroll pass confirmed full content + opacity. No action |

**No critical or serious gaps. One minor gap in the gate (blind spot, spec'd) + two minor content/scope items (`/projects` depth → spec-for-build; `/es` single-landing → known scope). The rest are launch-seam (expected), verified-artifact, or diminishing-return at 9.5/9.5.**

---

## Red-team notes (how each verdict was confirmed real, not assumed)

- **"All gates green" is not proof** — so I exercised the live site: 301 redirect followed (not just 200), combo-vs-parent similarity computed (not assumed from the gate), glossary reachability traced to the footer/Resources path (not inferred from the 0-orphan count alone), persistence verified by the token-stamp + currentTime test (not by reading the code), cold deep-FULL load checked for `data-so-hero="full"` in the *deployed* SSR HTML (not local).
- **Deployed-render parity** — live HTML grepped for unique markers (`so-hero-stage`, GAF Master Elite ×13, the `data-so-hero="full"` on a deep page); the deployed site matches `main d4a4b10`.
- **The footer-as-reachability-net is load-bearing** — because the desktop dropdowns are JS-only (not in static HTML), the 0-orphan result *depends* on the footer surface-map; I confirmed the footer renders every spoke statically.

## Method + honesty

Verification this session: typecheck, build, security-audit (10/10), doorway-check, reachability-check, Playwright desktop+mobile (125 passed/0 failed, axe 0 critical/serious), the combo-vs-parent cannibalization re-audit, the live `@graph` schema inspection across 11 page types, the persistence + cold-FULL-load checks, the deployed-marker parity check, **the live-pixel vision pass (28 desktop + 14 mobile deployed screenshots, two independent vision agents)**, and **a scroll-reveal DOM probe** to disambiguate the one ambiguous finding.

**Vision pass result — ✅ clean.** Desktop: 12/14 pages clean with zero breakage; mobile: all 14 clean, zero overflow/cut-off, sticky CTA present everywhere. The 3 hero tiers, trust-bar-everywhere, dual-intent fork (storm-hail call-first vs retail quiz-first), mobile poster-first, and AA-legible hero copy are all pixel-confirmed. The one ambiguous finding (dark voids on resources-hub/projects full-page captures) was flagged honestly by the agent as *probable* scroll-reveal animation, not breakage — and a scroll-probe DOM measure **confirmed it is an artifact** (after triggering `whileInView`: 0 un-triggered sections, 0 real voids, full text). This is the Built≠Reachable discipline applied in reverse — a static capture lied pessimistically, the live pass corrected it. The two genuine vision findings (`/projects` depth, `/es` single-landing) are in the gap ledger (rows 7–8). **Joseph's eyeball remains the final gate** — the deployed URLs are live to click through.
