# FLAGSHIP ROOFING DEMO BRIEF — make the demo prove the pitch

**From:** cold-email-agent-1 (CEM) · **To:** website-engineer
**Date:** 2026-06-09 · **Priority:** P0 — blocks the cold-email launch window (sending starts ~Mon/Tue)
**Surface:** `https://contractor-template-preview.vercel.app/preview/roofing` (the demo-engine roofing skin; repo likely `kingmaker-demo/`)

---

## 0. TLDR

Turn `/preview/roofing` into a **true flagship**: every page category our cold-email
enrichment engine diagnoses as "missing" on a prospect's site must exist on the demo
as a **dedicated individual page** (Joseph's hard requirement — one URL per city, per
service, per brand; no anchor-hub shortcuts). The demo is the living proof of the
$3–5k rebuild we're selling.

**Acceptance test (the punchline):** run CEM's own enrichment scanner against the
demo → it must come back with **zero buildable gaps**. Right now it wouldn't.

---

## 1. WHY — the cold-email alignment

CEM is about to send ~1,900 cold emails to roofing owners. Each email:
1. Names the lead's top **buildable gaps** — from a real scan of their site
   (location pages / service pages / brand pages / storm pages / cost pages / reviews)
2. Carries a personalized demo link: `?biz=COMPANY&city=CITY&phone=PHONE`

The pitch is: *"you're missing the pages that capture your market's searches — here's
what your rebuilt site looks like."* If the lead clicks through and the demo **also
lacks those pages**, the pitch contradicts itself in one click. The demo must EMBODY
the fix.

**Live empirical data — 1,058 US roofing companies scanned today (2026-06-09):**

| Buildable gap | % of roofers missing it |
|---|---|
| Cost/pricing page | **87%** |
| Brand/manufacturer pages | **83%** |
| Location pages | **67%** |
| Storm/insurance pages | **59%** |
| Reviews embedded on site | **45%** |
| Service-specific pages | **25%** |

88% of scanned roofers have 2+ gaps; 70% have 3+. These exact labels go in the emails.
Every one must be visibly answered by the demo.

---

## 2. CURRENT DEMO STATE — recon 2026-06-09

Live routes found on the deployed demo:

```
/preview/roofing                          (home)
/preview/roofing/serviceHub
/preview/roofing/serviceDetail/replacement
/preview/roofing/serviceDetail/repair
/preview/roofing/serviceDetail/gutters
/preview/roofing/serviceDetail/inspection
/preview/roofing/serviceDetail/insurance
/preview/roofing/serviceDetail/maintenance
/preview/roofing/serviceAreaHub           (ONE page — cities are #anchors)
/preview/roofing/brandEntity              (ONE combined brand page)
/preview/roofing/gallery
/preview/roofing/contact
```

### Gaps vs flagship (in priority order)

1. **Location pages are #anchors on one hub** (`serviceAreaHub#raleigh-nc`) — NOT
   dedicated pages. Our scanner pattern-matches URL structure; it would flag our own
   demo **"no location pages."** This is the single biggest gap.
2. **Brand pages = one combined `brandEntity` page** — need per-brand dedicated pages.
3. **No storm-damage family.** `serviceDetail/insurance` exists, but the storm /
   hail / wind keyword family — the highest-ticket traffic in roofing — is absent.
4. **No cost/pricing page** — the #1 most-common gap in the market (87%).
5. **Service catalog is 6 thin** — missing metal, commercial (TPO/EPDM), emergency.
6. URL shapes are app-internal camelCase (`serviceDetail/`, `serviceAreaHub`).
   Recommend SEO-shaped kebab slugs (`/services/roof-repair`, `/service-areas/raleigh-nc`)
   so the demo *looks like* the real rebuild — prospects and scanners both judge URLs.

---

## 3. THE BUILD — dedicated individual pages

> **Hard requirement from Joseph:** every city, every service, every brand gets its
> OWN URL. One page per keyword target. No catch-alls.

### 3a. Location pages — `/service-areas/[city-slug]` (~8–10 pages + hub)

- Keep a hub (`/service-areas`) listing all cities; EACH city gets a dedicated page.
- Roster: the existing 6 NC towns (raleigh, wake-forest, cary, garner, knightdale,
  morrisville) promoted from anchors to pages, +2–4 more if cheap.
- **ANTI-DOORWAY RULE (critical):** we *diagnose* competitors' doorway pages via
  content-similarity (Jaccard ≥ 0.70 on word-trigrams = spam). Our demo's city pages
  must read **< 0.5 similar** to each other — unique intro copy, per-town photo (the
  Task B geography system already does per-town photos), city-specific review
  pull-quote, localized FAQ entry. Gold standard observed in the wild: ~1,500-word
  unique city pages (Werner & Sons). The demo can't commit the sin we're selling
  against.
- City personalization: visitor's `?city=` should still drive the geography
  derive/preserve behavior that's already live.

### 3b. Service pages — `/services/[service-slug]` (10–12 pages + hub)

Core catalog, priority order (✅ = exists today as serviceDetail, needs re-slug only):

| # | Slug | Notes |
|---|---|---|
| 1 | `roof-replacement` ✅ | the bread-and-butter ticket |
| 2 | `roof-repair` ✅ | highest search volume |
| 3 | `metal-roofing` 🆕 | high-ticket, fast-growing segment |
| 4 | `commercial-roofing` 🆕 | hub for the commercial family |
| 5 | `tpo-roofing` 🆕 | commercial flat |
| 6 | `epdm-roofing` 🆕 | commercial flat |
| 7 | `emergency-roof-repair` 🆕 | 24/7 + tarping angle |
| 8 | `gutters` ✅ | |
| 9 | `roof-inspections` ✅ | storm/insurance feeder |
| 10 | `roof-maintenance` ✅ | |
| 11 | `siding` (optional) | common adjacent trade |
| 12 | `skylights` (optional) | |

Each service page: keyword H1, service-specific hero, process section, brand
cross-links, FAQ block, embedded reviews, CTA with `tel:` click-to-call.

### 3c. Brand pages — `/brands/[brand-slug]` (6 pages + hub)

The certification-scarcity trust angle (web-verified today):

| Slug | Certification angle |
|---|---|
| `gaf` | **Master Elite = top 2% of NA roofers** · Golden Pledge warranty (25–30yr workmanship) · Timberline HDZ |
| `owens-corning` | **Platinum Preferred ≈ top 1% of OC contractors** · Platinum Protection warranty · Duration series |
| `certainteed` | **SELECT ShingleMaster = top 1%** · SureStart PLUS 5-Star (50yr material / 25yr workmanship) · Landmark series |
| `malarkey` | premium/sustainability angle |
| `iko` | Dynasty line |
| `atlas` | Pinnacle + Scotchgard |

Each: certification badge + tier explainer, flagship product lines, warranty story,
gallery cross-link, CTA. Promote/replace the single `brandEntity` page with the hub.

### 3d. Storm/insurance family — `/storm-damage/` (3–4 pages)

The highest-JOB-VALUE traffic in roofing (insurance-paid replacements, $15–40k tickets):

- `/storm-damage` — hub: damage signs, claim-process stepper, "we work with your
  adjuster", urgency CTA
- `/storm-damage/hail` and `/storm-damage/wind` — dedicated keyword pages
- `/insurance-claims` — promote the existing `serviceDetail/insurance` into the family

### 3e. Cost/pricing page — `/roof-replacement-cost` (1 page)

The single most-common gap in the market (87% missing). Cost-range table by roof
size/material (defensible ranges, not quotes), financing section, free-estimate CTA,
cost FAQ.

### 3f. Reviews layer — site-wide (the 45% clincher)

- Embedded Google-style review section on **every** page (ReviewStars atom exists in
  the repo), aggregate star strip near header/footer.
- LocalBusiness + Review schema markup on all pages — our scanner checks for
  `application/ld+json` and so do prospects' SEO guys.

---

## 4. PERSONALIZATION CONTRACT

- Every new page inherits `?biz=` `&city=` `&phone=` (header brand swap, `tel:` links,
  geography derive) and **preserves params across internal nav** — the Task B
  client-preserve behavior, extended to all new routes.
- Missing params → default demo brand (current behavior).

## 5. TEMPLATE DOCTRINE (constraints)

- Content lives in the `lib/` catalog layer; components are shells. A new service /
  city / brand should be a **catalog entry**, not a new component.
- New page TYPES (brand detail, storm hub, cost page): extend existing atoms with prop
  variants first; genuine new atoms only via the design-skills + skills-gate protocol.
- Motion stays 100% intact — no regeneration, no hand-edits to motion code.

## 6. ACCEPTANCE TESTS (verification gates)

1. **Code:** `tsc --noEmit` + build clean, all routes compile.
2. **Local:** Playwright capture suite extended to every new page family (axe-core 0
   critical / 0 serious).
3. **The scanner gate (new, non-negotiable):** run CEM's enrichment checks against the
   live demo —
   `buildable_gap_count = 0` · `no_location_pages=false` · `no_service_pages=false` ·
   `no_brand_pages=false` · `no_storm_pages=false` · `no_cost_pages=false` ·
   `reviews_embed=true` · doorway similarity across any 3 city pages **< 0.5**.
   Scanner + thresholds live at `king_maker_outbound/enrich/` (`enrich.mjs`,
   `doorway_check.mjs`) — ping me and I'll run the scan from my side in minutes.
4. **Live:** screenshot every new page family on the deployed URL; fix-report format
   with clickable links (house rule).
5. **Joseph eyeball** — final gate.

## 7. PRIORITY ORDER (if phased)

- **P0:** dedicated location pages (kill the anchor hub) · brand pages · storm family
  · cost page — the four highest-frequency claims in the outgoing emails.
- **P1:** service-catalog completion (metal, commercial trio, emergency).
- **P2:** reviews layer everywhere + schema + SEO-slug polish.

## 8. COORDS

Reply via blackboard → `cold-email-agent-1`. I can supply: the exact penalty label
strings used in emails, the URL-pattern regexes the scanner matches (so slugs are
scanner-legible), per-lead demo-link format, and the 1,058-lead dataset for any
deeper frequency questions. Cold-email send window opens ~Mon/Tue — P0 by then is
the ask.

— CEM
