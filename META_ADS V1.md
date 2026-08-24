# META_ADS.md — King Maker Meta Ads Doctrine

**Status:** v1.0
**Purpose:** Operating doctrine for King Maker's Meta (Facebook/Instagram) ad operation — the cash-flow funnel that runs parallel to the cold email SEO outbound.
**Sister doctrine:** `KING_MAKER_MASTER.md` (web design + SEO build doctrine)

---

## 1. Strategic Purpose

The Meta ads funnel exists to solve one specific problem: cold email is a volume game with a long sales cycle, and King Maker needs near-term cash flow while the email engine scales. Meta ads close the gap between "no money this week" and "the SEO program is producing."

This is not the main business. The main business is the full $3,500-5,500/mo SEO program sold via cold email and referral. Meta ads is the **cash-flow product** and the **lead-generation top-of-funnel** that feeds into the main program.

Every decision in this doctrine optimizes for: speed to first phone call, low cost per qualified lead, fast close on the entry offer, and a clear upsell path into the main program.

---

## 2. The Offer

**Front-end product: King Maker Landing Page — $997**

- One custom-built single-page site
- Sections: hero, trust strip, services overview, contact form
- Built on the contractor's domain
- Live in 48 hours from kickoff call
- One revision round included
- Mobile-optimized, Vercel deployment

**Why $997 and not $500:**
$500 sits in "suspiciously cheap" territory for a contractor doing $3M+. Local web designers quote $1,500-3,000 for basic sites. $997 stays well below agency pricing while signaling that this is real work from someone who values their craft. Close rate is essentially identical between $500 and $997 on a warm qualified lead who's seen the demo. Above $1,500, close rate starts to suffer because contractors want to sleep on it or get competing quotes.

**The real strategic role of the $997 offer:**
It's the audition. The front-end is break-even-ish on its own. The flywheel is the upsell conversation that starts 30 days after delivery — moving the customer into the $3,500-5,500/mo SEO program. Even 1-in-5 upsell conversion makes the whole operation print money.

---

## 3. Funnel Architecture

```
Meta ad
  ↓
Facebook/Instagram lead form (name + phone + vertical + city)
  ↓
Immediate call within 2 minutes
  ↓
Show demo site link while on the phone
  ↓
Close on $997 lander on first call (or follow-up within 3 days)
  ↓
Deliver in 48 hours
  ↓
30-day upsell window opens → full SEO program
```

**Critical operational rule:** Call within 2 minutes of form submission. The CCTV campaign proved this works at 50% contact rate on homeowners. Contractors should hit 75%+ contact rate over a 3-day follow-up window because they actually answer their phones.

---

## 4. Target Reader

**Primary:** Contractor business owner, $1M-$5M annual revenue, owner-operator or close to it, runs roofing/HVAC/plumbing/other trades, currently has a weak or outdated website. Decision-maker. Answers his own phone. Active on Facebook in personal mode (Marketplace, family photos, local groups).

**Geographic targeting:**
- Primary: Small NC markets east of Raleigh — Goldsboro, Wilson, Rocky Mount, Sanford, Henderson
- Secondary: Mid-tier NC cities — Wake Forest, Apex, Garner, Clayton
- Avoid initially: Raleigh, Durham, Charlotte metro (high CPM auction competition)

**Why small markets work:**
Lower CPM auction competition. Lower household income range means lower contractor revenue range means $997 is a real decision they need to think about — but it's also achievable. Less marketing-saturated audience. The kind of contractor who's never been pitched a real website is more likely to take a call.

---

## 5. Lead Cost & Close Rate Targets

**CPL targets:**
- Optimistic with strong creative and tight targeting: $18-25
- Realistic average once dialed in: $25-35
- Early testing phase: $35-50 acceptable for first $200-300 in spend
- Kill threshold: CPL above $80 means creative or targeting is broken — pause and rework

**Contact rate target:** 75%+ over 3-day follow-up window (9-12 touchpoints: immediate call, text within 60 seconds, 2-3 calls/day for 3 days).

**Close rate target on contacted leads:** 13-30% range.
- Floor (still profitable): 13% close = 1 deal per 10 leads at $30 CPL = $300 CAC on $997 revenue
- Realistic with good demo + sales background: 20-25% close
- Stretch goal: 30%+ close once pitch is fully dialed

**Break-even math:**
- 10 leads × $30 CPL = $300 ad spend
- 7-8 contacted, 1-2 close
- $997-$1,994 revenue
- $697-$1,694 gross before delivery cost
- Delivery cost (Claude Max plan absorbs labor): near zero marginal cost per site

**The 5-hour token reset on Max plan means you can deliver 8-10 sites per month without hitting cost ceilings on the build side. The capital constraint is ad spend, not labor.**

---

## 6. Creative Strategy — The Hook Library

Contractors don't impulse-buy web design while scrolling Facebook the way homeowners impulse-buy security cameras. The hook has to yank them out of personal-scroll mode into business-decision mode within the first half-second of the ad.

**Hook angles ranked by expected stopping power:**

**1. Before/After Demo Site (highest priority test)**
Split-screen visual. Ugly generic contractor site on the left, the Peak Roofing demo on the right. No copy needed for the first frame. Body copy: "Your competitor's site looks like this now. Yours?"

**2. The Visibility Stat**
Direct quote from the deck: "Most roofers doing $3M+ are invisible on Google in 7 out of 10 zip codes they actually service." Pairs well with a map visual showing rank position by city.

**3. Competitor FOMO**
"One of your competitors just had their site rebuilt. Here's what it looks like." Show the demo. Implied scarcity from the "one king per city" positioning.

**4. The City Call-Out**
"If you're a roofer in [Goldsboro / Wilson / Rocky Mount] and your website is still the one you built in 2019, this is for you." Works specifically in small markets where the named city feels personal.

**5. The $997 Offer Direct**
"A real website for your contracting business. Live in 48 hours. $997. We work with one contractor per city." Strongest for warm/retargeting audiences who already know the brand.

---

## 7. Competitive Research Workflow

**Tool stack:**
- `trypeggy/facebook-ads-library-mcp` (open source, MCP server)
- ScrapeCreators API ($47 Freelance tier — 25,000 credits, non-expiring)
- Google Gemini API (free tier, video analysis)
- Claude Code as the analysis layer

**Install reference:** See `Facebook Ad Library Tools and MCP Servers for Contractor Marketing Competitive Research.md` for the full technical setup.

**Competitor seed list (the brands to track):**

Web design + SEO for contractors:
- Hook Agency
- Roofing Webmasters
- BlackStorm Roofing Marketing
- Roofing.com
- Footbridge Media
- ContractorGorilla
- 99 Calls
- RYNO Strategic Solutions
- Surefire Local
- Top Rated Local
- Profit Roofing Systems

Platform/SaaS players advertising to contractors:
- HighLevel / GoHighLevel
- JobNimbus
- Housecall Pro
- ServiceTitan
- Jobber

Adjacent (sales/operations content):
- Adam Bensman / The Roof Strategist
- Local Marketing Vault

**Ranking heuristic for top performers:**

Score each ad on these signals (higher = winning):

1. **Longevity** (most important): Days running with `is_active = true` and no `ad_delivery_stop_time`. 60+ days = profitable scale. 90+ days = strong winner. 120+ days = formula to study deeply.
2. **Variant count**: 5+ versions of the same hook = active scale-and-test mode.
3. **Cross-platform delivery**: Both Facebook and Instagram (and Audience Network) = higher confidence and budget.
4. **Impression bucket**: 100K-500K+ = real scale.
5. **Ad volume per page**: Pages running 30+ active ads = mature paid-marketing operation.

**Weekly cadence:**
Run a fresh pull every Monday morning. The brands worth copying this month will largely still be the brands worth copying next month — but new entrants are the interesting signal. Flag any ad that wasn't there last week but is now active and high-volume.

---

## 8. Operational Cadence

**Daily during active campaign:**
- Check CPL by 10 AM. If trending above $50, pause and review creative.
- Check lead inbox every 30 minutes during business hours.
- Call every lead within 2 minutes of submission.
- Text follow-up within 60 seconds of missed call.

**Weekly:**
- Monday: competitor ad pull via MCP server. Identify any new top performers.
- Tuesday-Wednesday: creative iteration based on week's data.
- Friday: review CPL, contact rate, close rate. Decide scale up/down for following week.

**Monthly:**
- Review front-end ROI: ad spend vs. closed deals on $997 offer.
- Review upsell pipeline: which $997 customers are warmest for the SEO program?
- Update competitor seed list with new entrants worth tracking.

---

## 9. Budget Discipline

**First test phase: $200-300**
This is the "does the channel work for us at all" budget. Don't make scale decisions on the first $200. If CPL lands $25-50 and 1-2 calls book, the model works. If CPL is $80+ with no calls, the creative or targeting is broken — not the channel.

**Proof phase: $500-1,000**
Once first test produces a closed deal, expand to confirm repeatability. Goal at this phase: lock in two reliable winning creatives and one reliable landing offer.

**Scale phase: $2,000+/mo**
Only after $500-1,000 phase produces consistent 2-3 closed deals. At this point ad spend becomes a recurring line item, not a test budget.

**Capital allocation rule:**
Don't pull from operating cash to fund ad spend until the channel has produced its first closed deal. Until then, every dollar of ad spend should be from a budget you can afford to lose entirely. After first close, reinvest revenue from $997 deals back into ad spend until SEO program upsells start generating recurring revenue.

---

## 10. What NOT To Do

- Don't run ads in Raleigh, Durham, or Charlotte metro early. Auction competition will inflate CPL beyond viability.
- Don't use stock photography or generic agency imagery in creative. Show the actual demo sites.
- Don't promise specific results (rankings, leads, revenue) in ad copy. Promise the product: a real website in 48 hours.
- Don't run video ads in the first test phase. Static images and carousels iterate faster and produce cleaner data.
- Don't book calendar links from the ad. Lead form → immediate phone call. The 2-minute response time is the entire competitive advantage.
- Don't drop the $997 price in the ad creative. The price comes out on the phone call after they've seen the demo. Price-led ads attract price-shoppers, not buyers.
- Don't expand verticals before locking in one. Start with roofing or HVAC. Add the next vertical only after the first one is producing predictably.
- Don't run more than two creatives at once during testing. Each test needs enough budget to produce significant data. Splitting $200 across five creatives produces noise, not signal.

---

## 11. Success Criteria

The Meta ads operation succeeds if:

**Month 1:** First closed $997 deal at CAC under $400. Channel proven viable.

**Month 3:** Consistent 2-4 closed deals per month at $300 average CAC. Two reliable creative winners identified. First $997 customer upsold to full SEO program.

**Month 6:** 4-6 closed deals per month at sub-$300 CAC. Two verticals running (roofing + HVAC). 20%+ of $997 customers upselling to monthly SEO program. Meta channel is producing $4-6K/mo in front-end revenue and feeding $10-15K/mo in recurring SEO revenue.

**The metric that matters most:** ratio of $997 customers who upsell to the full SEO program within 90 days of delivery. That ratio is the real business. The $997 offer is the audition. The recurring SEO program is the show.

---

## 12. Cross-References

- `KING_MAKER_MASTER.md` — full web/SEO build doctrine (FORGE system, design stack, verification contract)
- `Facebook Ad Library Tools and MCP Servers for Contractor Marketing Competitive Research.md` — technical setup for the research stack
- King Maker Sales Deck — Engine/Gas/Keys framework, ROI projections, used as leave-behind
- King Maker v2 site (kingmaker-v2.vercel.app) — closes warm leads after the phone call

---

**End of doctrine.**
