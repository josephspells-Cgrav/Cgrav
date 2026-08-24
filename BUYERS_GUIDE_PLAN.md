# BUYER'S GUIDE — CATEGORY RESTRUCTURE PLAN

*Architect: Joseph (relayed via the WO_08 builder session) · 2026-06-26 · Status:
**PLAN ONLY — nothing built yet.** Hand to the **website-engineer** to spec into a
work order and build. Target: `king-maker-site/` (Next 16 SSG, blue/white) →
kingmaker-firm.vercel.app.*

---

## 1. THE INTENT
Restructure the `/guides` left-rail (today a flat "Fundamentals" list, see
`components/guide/GuideLayout.tsx` + `lib/guides.ts` `GUIDE_TREE`) into **grouped,
collapsible CATEGORY dropdowns**. Each category is a themed group holding **2-3
sub-sections**. Together the 11 categories form the complete, legit **buyer's
guide** — it walks a contractor from *what you're buying* → *what it costs* → *how
it ranks (pack, cities, AI, links)* → *how it converts* → *how it makes money* →
*go check your own site*.

Voice: **education-first, contractor-layman, honesty-railed.** Same design + motion
standard as WO_07/WO_08 (heading-level motion, readable-first, no walls).

> This is a NAV/IA restructure plus net-new content. Most sub-sections map onto
> guides/playbook content that already exists (see the mapping per category);
> the rest are net-new pages to author. Decide per §4 whether each sub-section is
> its own `/guides/[slug]` page (likely) or an in-page anchor.

---

## 2. THE 11 CATEGORIES (locked with Joseph)

**1 · Website types**
- The Brochure
- The Standard
- The Enterprise

**2 · Pricing — a deep dive**  *(intentionally TWO sections, not three — do not pad)*
- What should the website cost
- Why do some companies charge $2,000/month (SEO retainers)

**3 · The Map Pack**
- How Google ranks your Google Business Profile (GBP)
- Your website + Google Business Profile
- The limitations of the map pack

**4 · Ranking for multiple cities**
- Location pages (a deep dive)
- Google relevance
- Topical authority

**5 · Turning visitors into leads**  *(the conversion category)*
- Pricing estimates  *(a conversion TOOL on the client's site — see naming note §5)*
- Cost guide
- Online booking / scheduling

**6 · Ranking for AI**  *(AEO)*
- AI Overviews & the zero-click shift
- Making the site machine-readable (schema + llms.txt)
- Answer-first content

**7 · What are backlinks**
- Manufacturer / brand certifications
- Local authority links
- Trade & supplier links

**8 · Organic vs. paid**
- Owned & compounding vs. rented & interruptive
- Where ads still win (the emergency, day-one speed)
- The appreciating asset  *(+ park **Cost per lead** here — PPC ~$228 vs LSA ~$162 vs mature organic ~$30; moved out of Pricing)*

**9 · Why bad sites still rank**
- Grandfathering (old ≠ better — it's accumulated signals)
- Site equity & compounding
- How you overtake a static lead

**10 · How to audit your site**
- AI verification (have ChatGPT/Claude/Gemini audit your site against the standard)
- What to look for based on page count (5-page brochure vs 10-20 system)
- What a bad audit looks like (the red flags / failure signs)

**11 · Revenue generation — a deep dive**  *(the closer / payoff)*
- From traffic to revenue (the funnel math: searches → leads → booked jobs → $)
- The compounding revenue curve (organic compounds, so revenue compounds)
- Scaling to $5M+ (owning your region's organic demand breaks the $1-2M ceiling)

---

## 3. CONTENT NOTES PER CATEGORY

**Cat 7 · What are backlinks — the layman frame (Joseph's spec):**
A backlink = another respected website vouching for you. *Like the town's
most-trusted name (the "local governor") telling everyone you did his roof and it
was flawless — except Google is listening.* Keep all three explanations this
simple. The three, strongest first:
- **Manufacturer / brand certifications** — GAF, James Hardie, Owens Corning list
  you as a certified installer on their own site. The big name everyone already
  trusts vouches for you, by name, on their turf. Strongest: high-authority AND
  about your exact trade.
- **Local authority links** — Chamber of Commerce, the local paper, a sponsored
  team, the BBB. The literal "governor referral" — the town's institutions point
  at you (the "real local business" signal Google uses for *near me*).
- **Trade & supplier links** — your state contractor/roofing association, industry
  bodies, the supply houses you buy from. A referral from inside the industry.
- 🔴 **No PBNs / no link-buying.** These three white-hat types only.

**Cat 1 · Website types** — Brochure → Standard → Enterprise is the canonical
ladder the whole guide hangs on (brochure vs enterprise already runs through the
content; "$297/mo should buy the Standard" from the pricing guide).

---

## 4. MAPPING TO EXISTING ASSETS (reuse, don't regenerate)
The website-engineer should reuse this authored content (split/reframe into the new
nav, don't rewrite substance):
- **Cat 1 Website types** → `enterprise-website-anatomy`, `why-a-brochure-cant-win`, the trade page-count data (`lib/claims.ts` TRADE_PAGES, 147 vs 10).
- **Cat 2 Pricing** → the net-new pricing guide already built: `lib/guide-content/what-should-a-contractor-website-cost.ts` (slug `what-should-a-contractor-website-cost`). §1 "what it should cost" lives there; §2 "$2,000/mo retainers" is net-new.
- **Cat 3 Map Pack** → `playbook/organic-vs-the-map-pack` (proximity cap, ~5mi, limitations).
- **Cat 4 Multiple cities** → `how-google-picks-the-winner` (relevance + topical authority), `enterprise-website-anatomy`; location pages = the service×city matrix (anti-doorway rail).
- **Cat 5 Conversion** → `what-good-content-gives-buyers` (cost guide, price ranges); the home `BookAppointment` for online booking; `/audit` `SelfAudit` patterns.
- **Cat 6 Ranking for AI** → `winning-the-ai-answer` (AEO, AI Overviews, schema + llms.txt, answer-first).
- **Cat 7 Backlinks** → `playbook/prominence-off-page` (reframe to the layman 3).
- **Cat 8 Organic vs paid** → `organic-vs-paid` guide + `playbook/organic-vs-ads`; CPL numbers in `lib/claims.ts` (CHANNEL_CPL).
- **Cat 9 Why bad sites still rank** → `why-your-worse-competitor-ranks` + `your-site-is-an-asset` (grandfathering, site equity, compounding). Page-age data (72.9% top-10 are 3yr+, avg #1 = 5yr) in `lib/claims.ts` PAGE_AGE.
- **Cat 10 Audit** → `/audit` `SelfAudit` (the 10 fundamentals) + the TRUST_MOVE ("audit my audit" — `lib/claims.ts`).
- **Cat 11 Revenue** → `playbook/the-1m-to-10m-roadmap`, `where-high-ticket-jobs-come-from`, `the-asset-your-website`, `satellite-expansion`; the compounding curve (`lib/claims.ts` COMPOUNDING).

---

## 5. OPEN DECISIONS (resolve before/early in the build)
1. **Reading order.** Joseph's stated order ends on **Revenue (11)**. Suggested
   alternative: end on **How to audit your site** as the final CTA — prove the
   money, *then* "go check your own site" → funnels to `/apply`. **Joseph to
   approve or flip.**
2. **Naming collision.** Cat 5 "**Pricing estimates**" (a conversion TOOL the
   contractor puts on *their* site) vs Cat 2 "**Pricing**" (what the contractor
   should *pay* for the site). Rename one so they don't read as the same thing
   (e.g. Cat 5 → "Instant estimate tool" / "Quote calculator").
3. **Page vs anchor.** Are categories nav-groupings of distinct `/guides/[slug]`
   pages (most sub-sections already are, or become, pages), or do some sub-sections
   live as anchors inside a category overview page? Recommend: category = nav group;
   each sub-section = a page (reuse existing slugs; author the net-new ones).
4. **Cat 2 has 2 sub-sections by design** — every other category has 3; do not pad
   Pricing to force symmetry.
5. **No-orphan + nav.** Whatever the new grouped dropdown does, keep the Footer's
   crawlable static-HTML links to every guide (the no-orphan backstop) intact.

---

## 6. LOCKS TO HOLD (carry from WO_07/WO_08 + memory)
- Blue/white, square corners, two-font, **heading-level motion only**, readable-first
  (no walls), mobile-first for a 50-60yo on a phone.
- **Anti-doorway** rail wherever dedicated location/service pages are claimed
  (real job → real page; the "delete-the-city-name" test).
- **Site-wins-the-pack** framing in Cat 3 (deeper site = the tiebreaker); the pack
  is a proximity-capped byproduct, NOT the growth engine. Don't undersell the site.
- **Organic-first** thesis throughout.
- **Honesty flags** (MEASURED / MODELED / ILLUSTRATIVE) on every stat; never
  "guaranteed #1"; no PBNs.
- Preserve every existing claim/number/flag/link when reusing authored content.

---
*— Buyer's guide plan, locked 2026-06-26. 11 categories · 31 sub-sections. Built
on the WO_08 propagation standard (home is the template; readable-first). Sent to
the website-engineer for work-order spec + build.*
