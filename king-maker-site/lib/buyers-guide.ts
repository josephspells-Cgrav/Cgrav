/* THE BUYER'S GUIDE — 11 categories / 31 sub-sections (WO_09, Phase E).
 * The category names ARE the spec; each sub-section is its own /guides/[slug]
 * page authored to its title. Categories are the collapsible nav groups (the
 * left-rail `<details>` dropdowns) — they are NOT pages themselves. Ordered
 * 1->11; the flat order also drives the prev/next pager. Replaces the old flat
 * `lib/guides.ts` GUIDES registry (old slugs 301 -> new, see GUIDE_REDIRECTS). */

export type BGSub = {
  slug: string; // /guides/[slug]
  navTitle: string; // short nav / footer label
  title: string; // full page H1 = the writing brief
  blurb: string; // metadata description + pillar/related summary
  readMin: number;
  speakable?: boolean; // answer-first section → speakable schema
};

export type BGCategory = {
  id: string; // pillar anchor
  title: string; // category heading + nav group label
  blurb: string; // one-line category summary (pillar)
  subs: BGSub[];
};

export const BUYERS_GUIDE: BGCategory[] = [
  {
    id: "website-types",
    title: "Website types",
    blurb: "The three kinds of contractor website, what each one is for, and the ladder the whole guide hangs on.",
    subs: [
      { slug: "the-brochure", navTitle: "The Brochure", title: "The brochure site: what it is, what it can and can't do", blurb: "A 5-to-10-page digital business card. It ranks for your name and your home city. What it is, what it can and can't do, and who it fits.", readMin: 5, speakable: true },
      { slug: "the-standard", navTitle: "The Standard", title: "The standard site: 10 to 20 pages that actually rank", blurb: "Dedicated service pages, a page for each town you serve, online scheduling, and the basic SEO that lets Google find all of it. The pros, the cons, and who it fits.", readMin: 5 },
      { slug: "the-enterprise", navTitle: "The Enterprise", title: "The enterprise site: 50+ pages and the widest reach", blurb: "Deep service-by-city coverage, the broadest query surface, the deepest topical authority. It costs more, and for the operator scaling a region, it wins the searches the others never see.", readMin: 6 },
    ],
  },
  {
    id: "pricing",
    title: "Pricing, a deep dive",
    blurb: "What a contractor website should actually cost, and what a monthly SEO retainer really buys.",
    subs: [
      { slug: "what-a-website-should-cost", navTitle: "What it should cost", title: "What should a contractor website cost?", blurb: "Honest market-reference ranges for each tier: a brochure, the standard 10-20 page site, and a full enterprise build. What each price should include, so you know what you are paying for.", readMin: 6, speakable: true },
      { slug: "seo-retainers-explained", navTitle: "SEO retainers", title: "Why do some companies charge $2,000 a month?", blurb: "What a real SEO retainer actually buys month to month, when it is worth it, when it is not, and how to tell the difference before you sign.", readMin: 5 },
    ],
  },
  {
    id: "map-pack",
    title: "The Map Pack",
    blurb: "How Google ranks the local 3-pack, the part your website plays in it, and the ceiling it runs into.",
    subs: [
      { slug: "how-google-ranks-your-gbp", navTitle: "How the pack ranks you", title: "How Google ranks your Google Business Profile", blurb: "Relevance, proximity, and prominence, in plain English. What actually moves you up the local 3-pack, and what is mostly noise.", readMin: 5, speakable: true },
      { slug: "your-website-plus-gbp", navTitle: "Website + profile", title: "Your website is the map-pack tiebreaker", blurb: "When two contractors have similar profiles and reviews, the deeper website wins the pack. Your site is not separate from the map, it is the thing that breaks the tie.", readMin: 5 },
      { slug: "map-pack-limitations", navTitle: "The pack's limits", title: "The limitations of the map pack", blurb: "The pack only reaches a few miles around your office, and there are only so many searches inside that radius. Why it is a near-default byproduct, not the engine that scales you.", readMin: 5 },
    ],
  },
  {
    id: "multiple-cities",
    title: "Ranking for multiple cities",
    blurb: "How one business ranks across every town it serves: real location pages, relevance, and topical authority.",
    subs: [
      { slug: "location-pages", navTitle: "Location pages", title: "Location pages: how to rank in every town you serve", blurb: "One real page per city you actually work, each built from a real job there. The deep dive on the page type that captures the town next door, and the line between depth and doorway spam.", readMin: 6, speakable: true },
      { slug: "google-relevance", navTitle: "Google relevance", title: "Google relevance: why the specific page wins", blurb: "A page about your exact service in their exact town beats a generic services page every time. How relevance is judged, and why specificity is the whole game.", readMin: 5 },
      { slug: "topical-authority", navTitle: "Topical authority", title: "Topical authority: becoming the site Google trusts", blurb: "Cover a subject deeply across many connected pages and Google starts treating you as the authority on it. How depth compounds into trust, and trust into rankings.", readMin: 5 },
    ],
  },
  {
    id: "conversion",
    title: "Turning visitors into leads",
    blurb: "The on-site tools that turn the traffic you earn into booked jobs: estimates, cost guides, and booking.",
    subs: [
      { slug: "instant-estimate-tool", navTitle: "Instant estimate tool", title: "The instant estimate tool that turns visitors into leads", blurb: "An on-site quote tool gives a ready buyer a number now instead of a wait. What it does for conversion, and why most contractor sites still make people call to find out anything.", readMin: 5, speakable: true },
      { slug: "cost-guide", navTitle: "Cost guide", title: "The cost guide that pre-qualifies your buyers", blurb: "Honest price-range content builds trust and filters out the tire-kickers before the phone rings, so the leads you do get are warmer and closer to ready.", readMin: 5 },
      { slug: "online-booking", navTitle: "Online booking", title: "Online booking: let ready buyers book themselves", blurb: "The buyer who is ready right now should not have to wait for a callback. Online scheduling captures the lead at the peak of intent instead of losing it to the next result.", readMin: 4 },
    ],
  },
  {
    id: "ranking-for-ai",
    title: "Ranking for AI",
    blurb: "How to be the answer AI engines cite, now that AI Overviews are intercepting the click.",
    subs: [
      { slug: "ai-overviews", navTitle: "AI Overviews", title: "AI Overviews and the zero-click shift", blurb: "AI is answering more searches before anyone clicks a link. What that means for a contractor, and why the play is to be the cited source, not to fight it.", readMin: 5, speakable: true },
      { slug: "machine-readable-site", navTitle: "Machine-readable", title: "Making your site machine-readable: schema and llms.txt", blurb: "AI engines quote sites they can actually read. Schema markup and an llms.txt file label your facts so a machine can lift them, instead of guessing from your prose or skipping you.", readMin: 5 },
      { slug: "answer-first-content", navTitle: "Answer-first content", title: "Answer-first content: how to get cited", blurb: "Lead each page with the buyer's question as the heading and the answer in the first sentence. The structure that gets a page quoted by search and AI alike.", readMin: 5 },
    ],
  },
  {
    id: "backlinks",
    title: "What are backlinks",
    blurb: "Backlinks in plain English: a respected name vouching for you, except Google is listening. The three that matter.",
    subs: [
      { slug: "manufacturer-backlinks", navTitle: "Manufacturer links", title: "Manufacturer and brand backlinks", blurb: "When GAF, James Hardie, or Owens Corning list you as a certified installer on their own site, the big trusted name is vouching for you, by name, on their turf. The strongest backlink a contractor can earn.", readMin: 4, speakable: true },
      { slug: "local-authority-backlinks", navTitle: "Local authority links", title: "Local authority backlinks: the governor referral", blurb: "The Chamber of Commerce, the local paper, a sponsored team, the BBB. The town's respected names pointing at you, which is exactly the local signal Google leans on for searches near you.", readMin: 4 },
      { slug: "trade-supplier-backlinks", navTitle: "Trade & supplier links", title: "Trade and supplier backlinks", blurb: "Your state association, the industry bodies, the supply houses you buy from. A referral from inside your own trade, and a signal you are a real, established operator.", readMin: 4 },
    ],
  },
  {
    id: "organic-vs-paid",
    title: "Organic vs. paid",
    blurb: "Rented leads vs. owned demand, where ads still earn their keep, and what SEO actually compounds into over time.",
    subs: [
      { slug: "owned-vs-rented", navTitle: "Owned vs. rented", title: "Owned and compounding vs. rented and interruptive", blurb: "Ads stop the day you stop paying. Organic is an asset you own that keeps working. The honest split between the two, and why the considered buyer trusts the organic result.", readMin: 5, speakable: true },
      { slug: "where-ads-still-win", navTitle: "Where ads win", title: "Where ads still win", blurb: "The emergency job and day-one speed belong to ads. Where paid earns its keep while your organic matures, and how the two work together instead of against each other.", readMin: 5 },
      { slug: "the-appreciating-asset", navTitle: "The appreciating asset", title: "The appreciating asset: SEO over year 1, 2, and 3", blurb: "What ongoing SEO actually does as it compounds, year over year, and why the effective cost per lead falls below paid over time. PPC near $228, organic near $30 once it matures.", readMin: 6 },
    ],
  },
  {
    id: "why-bad-sites-rank",
    title: "Why bad sites still rank",
    blurb: "Why an older, uglier, thinner site outranks you, and the only thing that actually takes the position back.",
    subs: [
      { slug: "grandfathering", navTitle: "Grandfathering", title: "Grandfathering: why an old, weak site still ranks", blurb: "It is not the age of the domain. It is the ranking signals stacked up over years: links, clicks, content. What grandfathering actually means, and why a redesign alone does not beat it.", readMin: 5, speakable: true },
      { slug: "site-equity-compounding", navTitle: "Site equity", title: "Site equity: why position compounds over time", blurb: "A page that has ranked keeps ranking, because the trust it earned lifts the next one. 72.9% of top-10 results are three years old or more. Why position is equity, and a thin site has none.", readMin: 5 },
      { slug: "how-you-overtake", navTitle: "How you overtake", title: "How you overtake a static competitor", blurb: "The incumbent has a head start, but they stopped running. A site that publishes and compounds passes a frozen one. The mechanism, and the honest timeline for it.", readMin: 5 },
    ],
  },
  {
    id: "audit-your-site",
    title: "How to audit your site",
    blurb: "Check your own site against the standard: a copy-paste AI prompt, the page-count tell, and the red flags.",
    subs: [
      { slug: "ai-site-audit", navTitle: "AI verification", title: "Audit your site with AI: the copy-paste prompt", blurb: "Drop one prompt into ChatGPT, Claude, or Gemini with your link, and it classifies your site, scores it 1 to 10, and lists what is done well and what is broken. The prompt, ready to copy.", readMin: 5, speakable: true },
      { slug: "audit-by-page-count", navTitle: "Audit by page count", title: "What to look for: auditing by page count", blurb: "The fastest tell of all. Count your pages: a handful means a brochure, 10-20 a standard system, 50+ an enterprise build. What the number tells you about what you are missing.", readMin: 4 },
      { slug: "what-a-bad-audit-looks-like", navTitle: "A bad audit", title: "What a bad audit looks like", blurb: "No location pages, generic titles, no schema, slow on a phone, nothing answer-first. The concrete red flags that say a site is built to look finished, not to rank.", readMin: 5 },
    ],
  },
  {
    id: "revenue-generation",
    title: "Revenue generation, a deep dive",
    blurb: "How rankings turn into money: the funnel math, the compounding revenue curve, and the path to $5M+.",
    subs: [
      { slug: "traffic-to-revenue", navTitle: "Traffic to revenue", title: "From traffic to revenue: the funnel math", blurb: "Searches become visits, visits become leads, leads become booked jobs, jobs become revenue. The plain math that turns a ranking system into dollars, with every multiplier flagged.", readMin: 5, speakable: true },
      { slug: "compounding-revenue-curve", navTitle: "Compounding revenue", title: "The compounding revenue curve", blurb: "Organic compounds, so the revenue it produces compounds with it. Why year three looks nothing like year one, and why the curve keeps climbing after the spend flattens.", readMin: 5 },
      { slug: "scaling-to-5m", navTitle: "Scaling to $5M+", title: "Scaling to $5M+ by owning your region", blurb: "The map pack caps you at a few miles. Owning your region's organic demand is what breaks the $1-2M ceiling and scales a contractor toward $5M and beyond.", readMin: 6 },
    ],
  },
];

/* ── Derived helpers ──────────────────────────────────────────────────────── */

/** All 31 sub-sections in reading order (drives generateStaticParams + pager). */
export const BG_SUBS: BGSub[] = BUYERS_GUIDE.flatMap((c) => c.subs);

/** The grouped nav tree (category → its sub links) for the collapsible rail. */
export const BG_TREE = BUYERS_GUIDE.map((c) => ({
  id: c.id,
  title: c.title,
  subs: c.subs.map((s) => ({ slug: s.slug, navTitle: s.navTitle })),
}));

export function getSub(slug: string): BGSub | undefined {
  return BG_SUBS.find((s) => s.slug === slug);
}

export function categoryOf(slug: string): BGCategory | undefined {
  return BUYERS_GUIDE.find((c) => c.subs.some((s) => s.slug === slug));
}

/** Sibling sub-sections in the same category (the internal mesh / related). */
export function siblingSlugs(slug: string): string[] {
  const cat = categoryOf(slug);
  if (!cat) return [];
  return cat.subs.filter((s) => s.slug !== slug).map((s) => s.slug);
}

/** Prev / next across the flat 1->31 reading order. */
export function prevNext(slug: string): { prev?: BGSub; next?: BGSub } {
  const i = BG_SUBS.findIndex((s) => s.slug === slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? BG_SUBS[i - 1] : undefined,
    next: i < BG_SUBS.length - 1 ? BG_SUBS[i + 1] : undefined,
  };
}

/* ── 301 redirects: old WO_07/08 guide slugs → the new buyer's-guide homes ─── */
export const GUIDE_REDIRECTS: { from: string; to: string }[] = [
  { from: "/guides/enterprise-website-anatomy", to: "/guides/the-enterprise" },
  { from: "/guides/why-a-brochure-cant-win", to: "/guides/the-brochure" },
  { from: "/guides/why-your-worse-competitor-ranks", to: "/guides/grandfathering" },
  { from: "/guides/how-google-picks-the-winner", to: "/guides/google-relevance" },
  { from: "/guides/the-gap-most-sites-have", to: "/guides/what-a-bad-audit-looks-like" },
  { from: "/guides/organic-vs-paid", to: "/guides/owned-vs-rented" },
  { from: "/guides/your-site-is-an-asset", to: "/guides/the-appreciating-asset" },
  { from: "/guides/what-good-content-gives-buyers", to: "/guides/cost-guide" },
  { from: "/guides/winning-the-ai-answer", to: "/guides/ai-overviews" },
  { from: "/guides/what-should-a-contractor-website-cost", to: "/guides/what-a-website-should-cost" },
  { from: "/guides/the-honesty-layer", to: "/guides" },
];
