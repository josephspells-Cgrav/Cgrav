# AMERICAN MASTERWORKS — BUILD BRIEF

**Client:** American Masterworks, Inc.
**Location:** Castalia, North Carolina
**Project:** Full site rebuild — local SEO focused
**Stack:** FORGE (Next.js 15 + Tailwind v4 + Vercel + GitHub)
**Animation/motion language:** See KING_MAKER_MASTER.md (handled at build time, not specified here)
**Status:** Ready for build — v1.1 (defaults locked, no client input gating)
**Version:** 1.1

---

## 0. EXECUTIVE SUMMARY

American Masterworks installs windows and doors in eastern Franklin County and Nash County, North Carolina. The current Framer site has zero meaningful SEO presence, no review surface, a phone number mismatch against legacy citations, and only four working pages. This rebuild replaces it with an 11-page Next.js site engineered to rank for low-to-medium-competition local queries across six target towns. Review generation, citation cleanup, and Google Business Profile work are explicitly out of scope and recommended as separate engagements.

**Strategic positioning:** The local choice for eastern Franklin County, Nash County, and the rural communities between Raleigh and Rocky Mount. Explicitly not competing in the Triangle or Rocky Mount metros.

**v1.1 changes from v1.0:**
- About page dropped (now 11 pages, not 12)
- All `[CLIENT INPUT]` placeholders replaced with locked defaults
- Brand list added (ProVia, Therma-Tru, Simpson, TruStile, MI Windows and Doors, Harvey)
- Financing references stripped from all copy
- License/insurance/ENERGY STAR Partner ID references stripped
- Logo finalized — palette confirmed (navy + red + white)
- Year-established framing locked: "Over a decade of experience"
- Hero treatment: static placeholder images for v1 (videos deferred to v2)

---

## 1. PROJECT CONTEXT

### Current state
- Site built on Framer with one functional homepage that lists product types as decorative non-clickable elements
- Four published pages: Home, Windows, Doors, Gallery, Contact
- Generic title tag, meta description, and content (not location-optimized)
- Internal links still point to `dreamwindows.framer.website` (the template)
- Copyright footer says "© 2018"
- Phone number on site `(252) 314-0185` does not match legacy citations still indexing `(919) 727-2846`
- Google still serves pre-Framer URLs (`/custom-woodworking`, `/windows-and-trim`)

### What this rebuild solves
- Indexable site architecture with 11 SEO-purposed pages
- Per-page title tags, meta descriptions, schema markup, and copy targeting specific local queries
- Clean 301 redirect map preserving any legacy equity
- Form-driven lead capture with email + SMS routing
- Proper canonical tags, sitemap, robots.txt, and crawl hygiene

### What this rebuild does NOT solve
- Review generation
- Citation cleanup
- Google Business Profile optimization
- Backlink acquisition
- Ongoing content marketing

---

## 2. SERVICE AREA & COMPETITIVE POSITIONING

| City | County | Distance from HQ | Competition Level | Page Tier |
|------|--------|------------------|-------------------|-----------|
| Castalia | Nash | 0 mi (HQ) | None | Easy |
| Spring Hope | Nash | ~10 mi | None | Easy |
| Bunn | Franklin | ~15 mi | None | Easy |
| Louisburg | Franklin | ~20 mi | Medium | Medium |
| Nashville | Nash | ~12 mi | Medium-Hard | Medium |
| Franklinton | Franklin | ~25-30 mi | Medium | Medium |

**Explicitly excluded:** Rocky Mount, Wake Forest, Knightdale, Rolesville, Youngsville, Raleigh metro.

---

## 3. SITE ARCHITECTURE

### Page list (11 pages)

**Core pages (5):**
1. Home — `/`
2. Windows — `/windows`
3. Doors — `/doors`
4. Gallery — `/gallery`
5. Contact — `/contact`

**Location pages (6):**
6. Castalia — `/locations/castalia-nc`
7. Spring Hope — `/locations/spring-hope-nc`
8. Bunn — `/locations/bunn-nc`
9. Louisburg — `/locations/louisburg-nc`
10. Nashville — `/locations/nashville-nc`
11. Franklinton — `/locations/franklinton-nc`

### Internal linking map

- **Homepage** links to: Windows, Doors, Gallery, Contact, all 6 location pages
- **Windows** links to: Home, Doors, Contact, all 6 location pages
- **Doors** links to: Home, Windows, Contact, all 6 location pages
- **Each location page** links to: Home, Windows, Doors, Contact, the two nearest sibling location pages
- **Gallery** links to: Home, Windows, Doors, Contact
- **Contact** links to: Home, all 6 location pages (in footer)
- **Footer** (every page): All 11 pages

---

## 4. BRAND ASSETS

### Logo

- **File location:** `/public/logo.svg` (or `.png` if not vectorized)
- **Composition:** Horizontal lockup of icon mark (window + door symbol) + wordmark ("American" in brush script red + "MASTERWORKS" in bold sans navy)
- **Colors:** Navy `#1b3361`, Red `#b02549`

**Logo variants needed:**
- **Full color** — primary use on light backgrounds
- **White / single-color** — for dark backgrounds (if any)
- **Icon mark only** — for favicon and tight mobile contexts

**Placement rules:**
- Header: top-left of every page, links to homepage
- Footer: present on every page, can be smaller
- Favicon: icon mark only, simplified for 32x32 and 16x16

### Color palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-navy` | `#1b3361` | Primary brand, headlines, header/footer backgrounds, link color |
| `--color-red` | `#b02549` | Accent — primary CTAs, key emphasis only |
| `--color-red-hover` | `#8a1d3a` | CTA hover state |
| `--color-white` | `#ffffff` | Primary background |
| `--color-text` | `#1a1a1a` | Body text |
| `--color-muted` | `#6b7280` | Secondary text, captions |
| `--color-border` | `#e5e7eb` | Dividers, card borders |
| `--color-tint` | `#f5f7fb` | Alternate section background |

**Patriotic palette caveat:** Navy + red + white is the American patriotic triad — fitting for the brand name but can read dated if executed flat. Lean on typography, generous whitespace, and FORGE motion language. Restrained red as accent only, navy as primary anchor, white as breathing room. Avoid 1990s contractor flyer treatment.

### Typography

- **Headlines:** Clean geometric sans, paired with the "MASTERWORKS" wordmark treatment. Bold weight. Tight tracking at display sizes.
- **Body:** Readable sans (or transitional serif pairing) at 16-18px.
- **No brush script** anywhere in site copy or UI. The logo handles the handcrafted expression; site type stays clean.

---

## 5. TECHNICAL STACK

### Framework
- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)

### Deployment & Infrastructure
- **GitHub** — private repo, King Maker owns
- **Vercel** — hosting, deployment, image optimization, analytics
- **DNS** — client retains domain ownership; DNS pointed at Vercel
- **SSL** — automatic via Vercel

### Lead routing
- **Resend** — transactional email (form submission → owner)
- **Twilio** — SMS notification (form submission → owner mobile)
- Form submitted via custom Next.js API route at `/api/contact`
- Both email and SMS fire on successful submission

### Analytics
- **GA4** (measurement ID to be provided pre-launch)
- **Vercel Analytics** (built-in)
- **Microsoft Clarity** (free; session recordings + heatmaps)

### Environment variables (placeholders during build, populate before deploy)

```
RESEND_API_KEY=[POPULATE]
RESEND_FROM_EMAIL=noreply@americanmasterworks.com
OWNER_EMAIL=[POPULATE]
TWILIO_ACCOUNT_SID=[POPULATE]
TWILIO_AUTH_TOKEN=[POPULATE]
TWILIO_FROM_NUMBER=[POPULATE]
OWNER_PHONE_NUMBER=+12523140185
NEXT_PUBLIC_GA_MEASUREMENT_ID=[POPULATE]
NEXT_PUBLIC_CLARITY_PROJECT_ID=[POPULATE]
```

---

## 6. SEO INFRASTRUCTURE

### Sitemap & robots
- Use **native Next.js 15** `app/sitemap.ts` and `app/robots.ts` (not the `next-sitemap` package)
- Sitemap includes all 11 pages with appropriate `changefreq` and `priority`
- Submitted to Google Search Console post-launch

### 301 Redirect Map (in `next.config.js`)

```javascript
async redirects() {
  return [
    { source: '/contact-us', destination: '/contact', permanent: true },
    { source: '/custom-woodworking', destination: '/', permanent: true },
    { source: '/windows-and-trim', destination: '/windows', permanent: true },
    { source: '/windows/', destination: '/windows', permanent: true },
    { source: '/doors/', destination: '/doors', permanent: true },
    { source: '/gallery/', destination: '/gallery', permanent: true },
  ];
}
```

### Canonical tags
Self-referencing canonical via Next.js metadata API on every page.

### Schema markup

**LocalBusiness** (in root layout, every page):

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "American Masterworks",
  "image": "https://americanmasterworks.com/logo.png",
  "telephone": "+12523140185",
  "url": "https://americanmasterworks.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Castalia",
    "addressRegion": "NC",
    "postalCode": "27816",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "35.7488",
    "longitude": "-78.0589"
  },
  "areaServed": [
    { "@type": "City", "name": "Castalia", "containedInPlace": "Nash County, NC" },
    { "@type": "City", "name": "Spring Hope", "containedInPlace": "Nash County, NC" },
    { "@type": "City", "name": "Bunn", "containedInPlace": "Franklin County, NC" },
    { "@type": "City", "name": "Louisburg", "containedInPlace": "Franklin County, NC" },
    { "@type": "City", "name": "Nashville", "containedInPlace": "Nash County, NC" },
    { "@type": "City", "name": "Franklinton", "containedInPlace": "Franklin County, NC" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/103469921414604",
    "https://www.instagram.com/american_masterworks",
    "https://www.x.com/AmericanMaster9",
    "https://www.yelp.com/biz/0XW_f6l32eyg8yR6zA6Sog"
  ]
}
```

**Service** schema on `/windows` and `/doors`. **FAQPage** schema on pillars and all location pages. **BreadcrumbList** schema on all interior pages.

### Title tag and meta description conventions
- Title tags: 55-60 characters where possible
- Meta descriptions: 150-160 characters
- Open Graph tags configured for all pages with `og:image` (1200x630, includes logo)

---

## 7. BRAND VOICE GUIDELINES

**Voice:** Confident, plainspoken, regional craftsman. Decades of experience. Knows the work. Doesn't oversell.

**Do:**
- Speak directly. Short sentences when they earn their place.
- Reference specifics: NC weather, older homes, county geography, real materials, real brands.
- Treat the reader like an adult homeowner who's done their research.
- Use industry terms correctly without over-explaining.

**Don't:**
- Exclamation points. None.
- "Amazing," "incredible," "fantastic," "stunning."
- "We pride ourselves on..."
- "Family-owned and operated since..."
- Stock contractor copy.

**Reading age target:** 8th–10th grade.

---

## 8. PAGE-BY-PAGE SPECIFICATIONS

> Image placeholders marked `[IMG: description]` should render as labeled black `<div>` blocks for v1. To be swapped for generated assets in a future phase.

---

### 8.1 HOME — `/`

**Title tag:** `Window & Door Replacement | American Masterworks NC`
**Meta description:** `Quality replacement windows and custom doors installed across eastern Franklin and Nash County, North Carolina. Free estimates. Built to last.`
**H1:** `Replacement Windows & Custom Doors Built for North Carolina Homes`

**Section structure:**

**Hero**
- H1
- Subhead: "Serving Castalia, Spring Hope, Louisburg, Bunn, Nashville, and Franklinton with energy-efficient windows and made-to-fit doors. Over a decade of experience installing the work that lasts."
- Primary CTA: "Get a Free Estimate" → `/contact`
- Secondary CTA: "(252) 314-0185" → `tel:+12523140185`
- [IMG: Hero — exterior craftsman-style NC home with new windows, late afternoon light]

**Trust strip**
- Three short proof points:
  - "Over a Decade of Experience"
  - "ENERGY STAR® Rated Products"
  - "Free In-Home Estimates"

**Windows section**
- H2: "Replacement Windows That Outlast the Weather"
- Body: "North Carolina weather is hard on windows. Humid summers, ice storms most winters, and the kind of temperature swings that find every weak seal in a house. We install windows that handle it — energy-efficient glass, sturdy frame materials, and a custom fit to the opening instead of the closest stock size. We carry products from manufacturers homeowners actually recognize: MI Windows and Doors, Harvey, ProVia. The work holds up because the materials are right and the installation is precise."
- CTA: "See Window Options" → `/windows`
- [IMG: Window detail close-up showing frame quality]

**Doors section**
- H2: "Custom Doors That Fit Your House, Not a Catalog"
- Body: "Every door we install is measured to the opening. Entry doors, sliding patio, French, hinged patio, storm. We carry Therma-Tru, Simpson, TruStile, ProVia — the names that show up when you ask any custom door shop what they install. Fiberglass for stability in this climate. Steel where security matters. Real wood when the architecture calls for it."
- CTA: "See Door Options" → `/doors`
- [IMG: Front entry door installation]

**Service area section**
- H2: "Where We Work"
- Intro: "We're based in Castalia and serve the towns and back roads of eastern Franklin and Nash County. If you can see a Nash County water tower from your front porch, we probably drive past your house."
- Grid of 6 location cards linking to each location page

**Brands strip**
- H2: "Manufacturers We Carry"
- Logo/wordmark list: ProVia, Therma-Tru Doors, Simpson Door Company, TruStile, MI Windows and Doors, Harvey Windows and Doors
- Caption: "We work with the manufacturers homeowners can stand behind. No house brands, no rebranded import lines."

**Process section**
- H2: "How It Works"
- Three steps:
  1. **Consultation** — We come to your house, take exact measurements, show you the product options, and answer every question.
  2. **Estimate** — Written, itemized, no pressure. You decide on your timeline.
  3. **Installation** — Clean work, clean cleanup, and the windows and doors fit right the first time.

**Why us section**
- H2: "Why Homeowners Hire American Masterworks"
- Four pillars:
  - Custom-fit, not stock
  - ENERGY STAR® rated products
  - One crew, start to finish
  - Honest written estimates

**FAQ section** — H2: "Common Questions"
1. *How long does a typical window replacement take?* Most full-home window replacements take one to three days depending on the number of openings and the existing wall conditions. We'll give you an exact timeline at the estimate.
2. *Do you handle both windows and doors in the same project?* Yes. Combining window and door work on the same visit is often more cost-effective than scheduling two separate trips.
3. *What areas do you serve?* Castalia, Spring Hope, Louisburg, Bunn, Nashville, Franklinton, and the rural areas between them. If you're not sure if you're in our range, call us and we'll tell you straight.
4. *Are your products ENERGY STAR® certified?* Most of our window and door lines are ENERGY STAR® rated. We'll show you the certification on the specific products you choose.
5. *How much do new windows or doors cost?* Cost varies by project — size, style, frame material, glass options, and the condition of the existing openings all factor in. We provide a written, itemized estimate so you see exactly where the cost goes. No ballpark figures over the phone — every house is different.
6. *How soon can you come out for an estimate?* Usually within a week. Call (252) 314-0185 and we'll get you on the schedule.

**Footer CTA strip**
- H2: "Ready to Get Started?"
- Body: "Free estimate. No pressure. We'll show up when we say we will."
- CTA: "Schedule My Free Estimate" → `/contact`

---

### 8.2 WINDOWS — `/windows`

**Title tag:** `Replacement Windows in Eastern NC | American Masterworks`
**Meta description:** `Custom-fit replacement windows for homes in Franklin and Nash County, NC. MI, Harvey, ProVia products. ENERGY STAR options and professional installation.`
**H1:** `Replacement Windows Built for the Way North Carolina Homes Live`

**Section structure:**

**Hero**
- H1 + subhead: "Custom-fit windows from the manufacturers that get specified for a reason. Installed by a crew that's been doing this for over a decade."
- CTA: "Get a Free Window Estimate" → `/contact`
- [IMG: Wide shot of multiple installed windows on a home exterior]

**Why replacement windows matter**
- H2: "When It's Time for New Windows"
- 2-3 paragraphs: drafts, condensation between panes, rising utility bills, hard-to-open sashes, visible rot. Plainspoken, no fear-mongering.

**Window styles section**
- H2: "Window Styles We Install"
- Grid:
  - **Double-Hung** — The workhorse. Two operable sashes, easy cleaning, fits almost any traditional NC home.
  - **Casement** — Crank-out, full-screen ventilation, tightest seal of any operable style.
  - **Slider** — Side-to-side operation, low profile, common in mid-century and ranch homes.
  - **Bay & Bow** — Multi-panel projecting windows that add space and light to living rooms and kitchens.
  - **Picture** — Fixed, oversized, maximum view. Pairs well with operable windows on either side.
  - **Awning** — Hinged at top, opens outward — vents air in light rain.
  - **Garden** — Small, projecting box window, typically over a kitchen sink.
  - **Hopper** — Hinged at bottom, opens inward. Common in basements.
  - **Shaped & Specialty** — Half-rounds, octagons, custom geometry to match architectural detail.

  [IMG: Grid of 9 window style thumbnails]

**Brands section**
- H2: "Manufacturers We Install"
- "We carry windows from manufacturers with real reputations in the industry:"
  - **MI Windows and Doors** — Strong vinyl and fiberglass lines, well-suited to the NC climate.
  - **Harvey Windows and Doors** — Northeastern-built quality, custom configurations standard rather than upcharged.
  - **ProVia** — Premium tier, exceptional craftsmanship across vinyl and fiberglass.
- "All ENERGY STAR® rated products available. We don't push a single brand — we recommend what fits the home, the budget, and the architectural style."

**Energy efficiency section**
- H2: "Built for the Climate, Not the Catalog"
- 2-3 paragraphs on glass options (dual/triple pane, low-E, argon-fill), frame materials, why installation matters as much as the product.

**Materials section**
- H2: "Frame Materials"
- Short blocks:
  - **Vinyl** — Low maintenance, strong insulation, the most popular choice in this region.
  - **Fiberglass** — Stronger than vinyl, holds paint, dimensionally stable in temperature swings.
  - **Wood** — For historic homes or specific architectural styles where the look matters.
  - **Aluminum-clad** — Wood interior, aluminum exterior — durability with traditional warmth.

**Service area section** (consistent block)

**FAQ section**
1. *How much do replacement windows cost?* Cost varies by project. Size, style, frame material, glass options, and existing opening conditions all affect the total. We provide written, itemized estimates so you see where every dollar goes.
2. *Vinyl or fiberglass — which is better?* Both are good. Vinyl is the more affordable choice and works well in most homes. Fiberglass costs more but lasts longer and handles temperature extremes better. We'll walk through the trade-offs for your specific home.
3. *Do you replace the whole window or just the glass?* Both are options. If your frame is sound, we can do an insert (pocket) replacement. If the frame is rotted or you're changing the window style, we do a full-frame replacement.
4. *Will new windows actually lower my energy bill?* Yes, usually noticeably — especially if you're replacing single-pane or aluminum-frame windows. ENERGY STAR® rated windows in this climate zone can cut annual energy costs by 10-15% on average.
5. *How long does installation take?* Most jobs are 1-3 days. We'll give you a specific timeline at the estimate.
6. *What's the warranty on your windows?* Warranties vary by manufacturer — most lines we carry come with a limited lifetime warranty on the product, plus our installation workmanship guarantee. Specifics get spelled out at the estimate.

**Final CTA**

---

### 8.3 DOORS — `/doors`

**Title tag:** `Custom Entry & Patio Doors in Eastern NC | American Masterworks`
**Meta description:** `Entry doors, sliding patio doors, French doors, and storm doors installed across Franklin and Nash County, NC. Therma-Tru, Simpson, TruStile, ProVia.`
**H1:** `Custom Doors Measured and Installed to Fit Your Home`

**Section structure:**

**Hero**
- H1 + subhead: "Entry, patio, French, and storm doors from the manufacturers that actually build quality at scale. Measured and installed by a crew that's been doing this for over a decade."
- CTA: "Get a Free Door Estimate"
- [IMG: Entry door installation, exterior view]

**When to replace your door**
- H2: "Signs Your Door Needs Replacing"
- 2-3 paragraphs: drafts at the threshold, light visible around the frame, sticking or warping, visible damage, dated style affecting curb appeal.

**Door types section**
- H2: "Door Styles We Install"
- Grid:
  - **Entry Doors** — Fiberglass, steel, or wood. The front of your house. Security, energy efficiency, curb appeal all matter.
  - **Sliding Glass Patio** — Maximize light and easy access. Modern hardware tracks make today's sliders quieter and tighter than what was installed 20 years ago.
  - **Hinged Patio** — Single or double swing-out style. More traditional look than a slider.
  - **French Doors** — Two operable panels, classic architectural detail, popular for living rooms opening to a porch or backyard.
  - **Storm Doors** — Front-line defense against weather. Adds insulation, ventilation, and an extra layer of security.

  [IMG: Grid of 5 door type thumbnails]

**Brands section**
- H2: "Manufacturers We Install"
- "Doors are where craftsmanship shows. We carry manufacturers that earn their reputation:"
  - **Therma-Tru Doors** — Fiberglass entry doors built to last decades, ENERGY STAR rated lines available.
  - **Simpson Door Company** — Real wood doors with the kind of detail you can't get from a catalog brand.
  - **TruStile** — Premium custom doors, exceptional design range, craftsman-grade build.
  - **ProVia** — Top-tier fiberglass and steel, custom configurations standard.

**Materials section**
- H2: "Door Materials"
- Short blocks:
  - **Fiberglass** — Won't dent, warp, or rust. Holds paint or stain well. The most versatile choice for most homes.
  - **Steel** — Strongest and most secure. Excellent for primary entry doors when security is the priority.
  - **Wood** — Premium look, traditional warmth, requires more maintenance.
  - **Aluminum** — Clean modern lines, good for storm doors and contemporary architecture.

**Security & efficiency section**
- H2: "Built for Security and Sealed for Efficiency"
- 1-2 paragraphs on multi-point locking, weatherstripping, threshold seals, and how proper installation makes the difference between a door that lasts 25 years and one that drifts within 5.

**Service area section** (consistent block)

**FAQ section**
1. *How much does a new entry door cost?* Cost varies by project. Material, glass inserts, hardware, and whether the frame needs replacing all affect the total. We provide written, itemized estimates.
2. *Fiberglass or steel — which should I pick?* Fiberglass for most homes — it handles weather better and holds its finish longer. Steel if security is your top priority or the door is in a high-traffic commercial-style entry.
3. *Can you replace just the door without replacing the frame?* Usually yes, as long as the existing frame is square and intact. If the frame is rotted or out of plumb, we'll need to do a full-frame replacement.
4. *Do you install storm doors?* Yes. Storm doors are one of the cheaper energy-efficiency upgrades a homeowner can make.
5. *How long does door installation take?* Most single-door installations are completed in one day. Patio door replacements can take 1-2 days depending on the existing opening.
6. *Do you sell wood doors?* Yes. We carry Simpson, which builds real wood doors at a quality level you can't get from big-box retailers. Best for historic homes and architectural styles where authentic wood detail matters.

**Final CTA**

---

### 8.4 GALLERY — `/gallery`

**Title tag:** `Window & Door Installation Gallery | American Masterworks NC`
**Meta description:** `See completed window and door installations across Franklin and Nash County, North Carolina. Custom-fit projects in homes throughout the region.`
**H1:** `Our Work Across Eastern North Carolina`

**Intro paragraph**
- "Recent window and door projects from homes throughout Franklin and Nash County. Every installation is measured, fit, and finished by our own crew."

**Gallery grid**
- 12-24 image placeholders organized into filtered categories: Windows, Entry Doors, Patio Doors, French Doors, Before & After

**CTA strip**
- "Like What You See? Get a Free Estimate" → `/contact`

---

### 8.5 CONTACT — `/contact`

**Title tag:** `Contact American Masterworks | Castalia NC Windows & Doors`
**Meta description:** `Schedule a free estimate for window or door replacement in Franklin or Nash County, NC. Call (252) 314-0185 or send a message.`
**H1:** `Schedule Your Free In-Home Estimate`

**Intro:** "Tell us about your project. We'll get back to you within one business day."

**Two-column layout**

*Left column — Contact info:*
- Phone: **(252) 314-0185** (click-to-call)
- Email: [POPULATE]
- Service Area: Castalia, NC and surrounding Franklin and Nash County
- Hours: Monday – Saturday, 9 AM – 6 PM. Closed Sunday.
- Social links (Facebook, Instagram, X, Yelp)

*Right column — Form:*
- Fields: Name (required), Phone (required), Email (required), ZIP (required), Service Interest (radio: Windows / Doors / Both / Not Sure, required), Message (optional)
- Submit button: "Send My Request"
- Privacy line: "We respect your information and never share it."

**Map**
- Embedded Google Map showing Castalia, NC

**Service area**
- H2: "Service Areas"
- 6 location links

---

### 8.6–8.11 LOCATION PAGES

Each location page uses the consistent template: hero (H1 + subhead + CTAs + image), why local matters, services intro, common needs in [city], process recap, FAQ section, nearby service areas, final CTA.

#### 8.6 CASTALIA — `/locations/castalia-nc`

**Title tag:** `Window & Door Installation in Castalia, NC | American Masterworks`
**Meta description:** `Local window and door installation in Castalia, NC. Based right in town. Free estimates, custom-fit products, and clean professional installation.`
**H1:** `Window & Door Installation in Castalia, North Carolina`

**Hero subhead:** "Based right here in Castalia. Custom windows and doors installed by the team that lives where you live."

**Why local matters:** "American Masterworks is based in Castalia, which means we don't just service this town — it's our home base. Whether you're updating a farmhouse off NC-58, replacing windows in one of the older homes near the town center, or upgrading the back patio doors on a newer build, we're working in a neighborhood we already know."

**What Castalia homes need:** "Castalia housing leans rural and traditional — a mix of older farmhouses, mid-century ranches, and a growing number of newer homes on larger lots. The most common requests we get from Castalia homeowners are full-home window replacements on homes 30+ years old (where original aluminum or single-pane wood windows have aged out) and entry door replacements where the original door has warped or the seal has failed. We carry products that suit both budgets and styles common in this town."

**FAQ:**
1. *Are you local to Castalia?* Yes — our shop is in Castalia. We're not a regional outfit that drives in from another county.
2. *How quickly can you come out for an estimate in Castalia?* Usually within a few days. Call (252) 314-0185.
3. *What kinds of windows are most common in Castalia homes?* A lot of older homes here have original single-pane wood windows or first-generation aluminum frames. We typically recommend energy-efficient vinyl or fiberglass replacements depending on the home.
4. *Do you handle small repair jobs in Castalia, or just full replacements?* We handle both. If you've got a single broken sash or a door that won't close right, give us a call.

**Nearby service areas:** Spring Hope, Nashville

---

#### 8.7 SPRING HOPE — `/locations/spring-hope-nc`

**Title tag:** `Window & Door Installation in Spring Hope, NC | American Masterworks`
**Meta description:** `Replacement windows and custom doors installed in Spring Hope, NC. Based 10 miles away in Castalia. Free estimates and professional installation.`
**H1:** `Window & Door Installation in Spring Hope, North Carolina`

**Hero subhead:** "Ten miles from our Castalia shop. Custom windows and doors for Spring Hope homes."

**Why local matters:** "Spring Hope sits about 10 miles south of our Castalia shop, which makes it one of our most regular service areas. We know the area — from the homes around the historic downtown to the newer construction on the outskirts and the lake homes near Lake Royale. Working in Spring Hope means working in a town where we've already done jobs."

**What Spring Hope homes need:** "Spring Hope has a mix of housing eras — traditional homes built before 1980, newer construction in the surrounding county, and lake homes near Lake Royale where window and door performance matters even more (humidity, sun exposure, and waterfront wear). We see a lot of full-home window replacements on the older homes and patio door upgrades on the lake properties."

**FAQ:**
1. *How far is Spring Hope from your Castalia shop?* About 10 miles. We're in Spring Hope regularly.
2. *Do you work on Lake Royale homes?* Yes. Lakefront properties have specific needs around humidity and sun exposure, and we carry products suited for those conditions.
3. *Can you handle older Spring Hope homes with non-standard window openings?* Yes. Custom-fit is the whole point of what we do — we measure every opening before ordering.
4. *Do you offer free estimates in Spring Hope?* Yes, every estimate is free and in-home.

**Nearby service areas:** Castalia, Nashville

---

#### 8.8 BUNN — `/locations/bunn-nc`

**Title tag:** `Window & Door Installation in Bunn, NC | American Masterworks`
**Meta description:** `Window and door installation in Bunn, NC. Local installer based in nearby Castalia. Free estimates and custom-fit products for Franklin County homes.`
**H1:** `Window & Door Installation in Bunn, North Carolina`

**Hero subhead:** "Bunn is in our backyard. Custom windows and doors for Franklin County homes — installed right."

**Why local matters:** "Bunn is small, rural, and about 15 miles southwest of our Castalia shop. It sits in Franklin County and shares the same housing patterns we see throughout the area: a lot of older farmhouses, ranch-style homes, and a growing share of newer construction. For Bunn homeowners, finding a window and door installer who'll actually drive out to the property without an inflated travel charge is a real question — and the answer for us is yes, we do, regularly."

**What Bunn homes need:** "Most Bunn jobs we see are full-home window replacements on homes that haven't had windows touched in 25-30 years, and front entry door upgrades. With Bunn's rural character, a lot of homes have wider front porches and traditional door styles — we carry options that suit that architectural language without forcing a modern-looking door onto a traditional home."

**FAQ:**
1. *Do you actually service Bunn, or just claim to?* We service Bunn regularly. It's about a 15-mile drive from our shop.
2. *Is there a travel charge for Bunn?* No. Bunn is well within our standard service area.
3. *What window styles work best for older Bunn farmhouses?* Double-hung windows are usually the right call for traditional farmhouse architecture — they preserve the historical look while delivering modern energy efficiency.
4. *Can you install storm doors in Bunn?* Yes. Storm doors are one of the most cost-effective upgrades for older homes with original entry doors.

**Nearby service areas:** Louisburg, Franklinton

---

#### 8.9 LOUISBURG — `/locations/louisburg-nc`

**Title tag:** `Window Replacement in Louisburg, NC | American Masterworks`
**Meta description:** `Replacement windows and custom doors for Louisburg, NC homes. Locally based, ENERGY STAR options, ProVia and Simpson door installation. Free estimates.`
**H1:** `Window & Door Installation in Louisburg, North Carolina`

**Hero subhead:** "About 20 miles from our Castalia shop. Custom window and door installation for Louisburg's historic and contemporary homes."

**Why local matters:** "Louisburg is the Franklin County seat — a town with deep history, the Louisburg College campus, and one of the highest concentrations of older housing stock in our service area. Many homes in and around Louisburg date to before 1970, and the original windows in those homes have long since outlived their useful life. We work in Louisburg regularly because the town has the kind of housing we specialize in: real homes that need craftsmanship-grade replacement work."

**What Louisburg homes need:** "Two main job types in Louisburg: full-home window replacements on older homes where the original wood or aluminum windows are beyond repair, and historic-sympathetic door replacements where the front entry has to look right for the architectural era of the house. We carry products and finishes that suit traditional homes — including Simpson wood doors for true historic restoration work, and double-hung windows that preserve the historical look while delivering modern thermal performance."

**FAQ:**
1. *Do you work in historic Louisburg homes?* Yes. We specialize in custom-fit replacements that respect the architectural language of older homes.
2. *Can you match the look of original windows in pre-1970 homes?* Often yes. We carry double-hung and shaped window options that visually match traditional styles while delivering modern energy efficiency.
3. *Do you carry real wood doors for historic Louisburg homes?* Yes. We carry Simpson Door Company, which builds custom wood doors at restoration-grade quality.
4. *How far is Louisburg from your shop?* About 20 miles. Louisburg is one of our most regular service areas.
5. *Do you handle the entire installation in-house?* Yes. We don't subcontract installation crews.
6. *Are your products ENERGY STAR® certified?* Most of our window and door lines are ENERGY STAR® rated.

**Nearby service areas:** Bunn, Franklinton

---

#### 8.10 NASHVILLE — `/locations/nashville-nc`

**Title tag:** `Window Replacement in Nashville, NC | American Masterworks`
**Meta description:** `Replacement windows and custom doors for Nashville, NC homes. Locally based in nearby Castalia. Free estimates, custom-fit installations.`
**H1:** `Window & Door Installation in Nashville, North Carolina`

**Hero subhead:** "Twelve miles from our Castalia shop. Custom windows and doors for Nash County's seat."

**Why local matters:** "Nashville is the seat of Nash County and one of the closer towns to our Castalia shop — about 12 miles east. It's a town that's grown steadily over the past two decades, with a mix of older traditional homes near the downtown core and newer construction in the surrounding subdivisions. We work in Nashville regularly across both housing types."

**What Nashville homes need:** "Older homes in Nashville's central neighborhoods often need full-home window replacements where original windows have failed seals, sticking sashes, or visible aging. Newer subdivisions tend toward door upgrades — front entry replacements where the builder-grade door has aged poorly, and sliding patio door upgrades where the original tracks have worn out. We handle both."

**FAQ:**
1. *How close are you to Nashville?* About 12 miles. Nashville is one of our closest service areas outside of Castalia itself.
2. *Are you a Rocky Mount company?* No. We're based in Castalia. Many of the larger window companies that advertise in Nashville are franchised out of Rocky Mount — we're a local independent.
3. *Can you handle large projects like full-home window replacement?* Yes. Full-home replacements are some of our most common projects.
4. *What window brands do you carry?* We install MI Windows and Doors, Harvey, and ProVia, depending on the home and budget.

**Nearby service areas:** Castalia, Spring Hope

---

#### 8.11 FRANKLINTON — `/locations/franklinton-nc`

**Title tag:** `Window & Door Installation in Franklinton, NC | American Masterworks`
**Meta description:** `Replacement windows and custom doors installed in Franklinton, NC. Local Franklin County installer. Free in-home estimates, professional installation.`
**H1:** `Window & Door Installation in Franklinton, North Carolina`

**Hero subhead:** "Custom window and door installation for Franklinton's historic and growing neighborhoods."

**Why local matters:** "Franklinton has changed quickly over the last decade — historic core neighborhoods alongside newer development pushing east from Wake Forest. We work in both. The historic district has homes that need craftsmanship-respecting window and door replacements where matching the original architectural language matters. The newer subdivisions have builder-grade windows and doors that often need upgrading within 10-15 years."

**What Franklinton homes need:** "Two distinct job profiles in Franklinton: historic homes needing replacement windows that match traditional double-hung styling with modern energy performance, and newer homes needing upgrades from builder-grade vinyl and basic entry doors. We handle both with the same custom-fit approach."

**FAQ:**
1. *Do you service Franklinton?* Yes. Franklinton is part of our regular service area in Franklin County.
2. *How far is Franklinton from your shop?* About 25-30 miles depending on the part of town.
3. *Do you work on historic Franklinton homes?* Yes. We specialize in custom-fit replacement work that respects the architectural era of the home.
4. *Can you handle full-home replacement on newer Franklinton subdivisions?* Yes — full-home window replacements on newer homes are increasingly common as builder-grade windows reach the end of their useful life.

**Nearby service areas:** Louisburg, Bunn

---

## 9. FORM BEHAVIOR

### Field specification

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | yes | min 2 chars |
| Phone | tel | yes | US format, 10 digits |
| Email | email | yes | RFC 5322 valid |
| ZIP Code | text | yes | 5-digit US ZIP |
| Service Interest | radio | yes | one of: Windows / Doors / Both / Not Sure |
| Message | textarea | no | max 2000 chars |

### Submission flow

1. Client-side validation runs first
2. Form POST to `/api/contact`
3. API route validates server-side
4. Two parallel actions fire:
   - **Email** via Resend → `OWNER_EMAIL`
   - **SMS** via Twilio → `OWNER_PHONE_NUMBER`
5. On success: redirect to `/contact?status=success` with confirmation banner
6. On failure: inline error message

### Spam protection
- Honeypot field (hidden, named `website`)
- Rate limiting deferred (in-memory unreliable on serverless; revisit with Upstash if spam appears)

### Email template

Subject: `New Lead — [Name] — [Service Interest]`

Body:
```
New estimate request from americanmasterworks.com

Name: [Name]
Phone: [Phone]
Email: [Email]
ZIP: [ZIP]
Service Interest: [Service Interest]

Message:
[Message or "No message provided"]

Submitted: [timestamp]
```

### SMS template

```
New AM lead: [Name] - [Phone] - [Service] - ZIP [zip]
Reply to email for full message.
```

---

## 10. IMAGE PLACEHOLDER SYSTEM

Every image slot renders as a labeled black `<div>` block during v1 build:

```jsx
<div className="bg-black text-white p-4 aspect-[16/9] flex items-center justify-center text-center text-sm">
  [IMG PLACEHOLDER]<br/>
  {imageDescription}<br/>
  Aspect: 16/9 (or specified)
</div>
```

When generation phase begins, replace each `<div>` with `<Image>` component pointing to the generated asset.

### Image inventory

- Hero images: 7 (1 home + 6 location pages)
- Windows page: ~3-5 supporting + 9 style thumbnails
- Doors page: ~3-5 supporting + 5 style thumbnails
- Gallery: 12-24 portfolio shots
- Open Graph images: 11 (one per page, 1200x630, includes logo)

**Total: ~50-60 images to generate in a future phase.**

---

## 11. PRE-LAUNCH CHECKLIST

Items requiring population before deploy:

- Owner email address for lead notifications
- Twilio account credentials (account SID, auth token, from number)
- Resend API key
- GA4 measurement ID
- Microsoft Clarity project ID
- Vercel project + DNS cutover with client

---

## 12. OUT OF SCOPE (EXPLICITLY)

- Review generation campaign
- Citation cleanup across directories
- Google Business Profile optimization
- Backlink acquisition
- Blog or content marketing
- E-commerce / online store
- CMS for content editing
- Instant quote calculator
- Live chat / chatbot
- Customer portal
- Financing application form or financing copy
- Product brand-specific landing pages
- Service-specific × location matrix pages
- Hero videos (deferred to v2)
- About page (deferred to v2)

---

## 13. BUILD SEQUENCE

1. **Scaffold** — complete (Session 1)
2. **Layout + global components** — root layout, header (with logo), footer (with logo), nav, shared CTA components
3. **Schema infrastructure** — LocalBusiness schema in root layout, schema helper utilities
4. **Core pages** — Home, Windows, Doors, Gallery, Contact (with form + API route)
5. **Location pages** — All 6, using shared `LocationPage` component
6. **Sitemap + robots.txt** — native Next.js 15 implementation
7. **Redirects** — `next.config.js` (already in scaffold)
8. **Analytics** — GA4, Vercel Analytics, Microsoft Clarity
9. **Motion pass** — Apply KING_MAKER_MASTER.md motion doctrine
10. **Image generation pass** — Replace placeholders with generated assets
11. **Final QA** — Lighthouse scores, schema validation, mobile responsiveness, form test, redirect verification
12. **DNS cutover** — Point client's DNS at Vercel
13. **Post-launch** — Submit sitemap to Search Console, request indexing

---

## 14. SUCCESS CRITERIA

- All 11 pages deployed and accessible at production domain
- All schema validates in Google's Rich Results Test
- Sitemap submitted to Google Search Console
- Form submissions route to both email and SMS
- All 301 redirects resolve correctly
- Lighthouse: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO 100
- Image placeholders clearly labeled
- All `[POPULATE]` placeholders filled with real credentials before launch
- DNS pointed at Vercel and SSL active

---

**End of brief v1.1.**
