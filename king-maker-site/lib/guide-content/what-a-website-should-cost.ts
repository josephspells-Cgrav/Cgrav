import type { GuideContent } from "@/lib/content-blocks";

/* Category 2 — pricing deep dive. Expands the what-should-a-contractor-website-cost
 * exemplar into the FULL 3-tier ladder. CRITICAL HONESTY: the 3 tier prices are
 * ILLUSTRATIVE GUIDANCE, not measured market data — said in the copy, and the
 * priceRange block carries the default ILLUSTRATIVE flag (NO `flag` field added —
 * the priceRange type has none). No ranking guarantees. The 53% / 73% gaps are the
 * MEASURED 1,017-site scan and keep their flag in prose. */

export const content: GuideContent = {
  sections: [
    {
      id: "short-answer",
      h2: "What should a contractor website cost?",
      navLabel: "The short answer",
      speakable: true,
      blocks: [
        { kind: "p", text: "There's no single right price, because there's no single kind of website. There are three rungs, and each one should cost roughly what it's worth." },
        {
          kind: "list",
          items: [
            "**The brochure** — about $97/mo, or $300-500 once. Five to ten pages; ranks for your name and home city.",
            "**The standard site** — about $297/mo, or $1,000-2,000 once. Ten to twenty pages; the floor for ranking.",
            "**The enterprise site** — about $100 per page (≈$10,000-15,000 for a full build). Fifty-plus pages; the widest reach.",
          ],
        },
        { kind: "p", text: "These are **guidance ranges, not measured market data** — use them to sanity-check a quote, not as a fixed price." },
        { kind: "p", text: "The common mistake isn't overpaying. It's paying **standard-site money for a brochure**, which, as the data below shows, is what most contractors are doing." },
      ],
    },
    {
      id: "the-ladder",
      h2: "The three-tier ladder, with rough prices",
      navLabel: "The price ladder",
      blocks: [
        { kind: "p", text: "Here is the whole ladder in one place. Read these as **illustrative ranges** — a way to tell whether a quote is reasonable, not a price list." },
        {
          kind: "priceRange",
          title: "What each tier roughly runs",
          rows: [
            { label: "Brochure (5-10 pages)", range: "~$97/mo or $300-500 once", detail: "A digital business card. Ranks for your name and home city." },
            { label: "Standard (10-20 pages)", range: "~$297/mo or $1,000-2,000 once", detail: "Service + town pages, scheduling, basic SEO. The floor for ranking." },
            { label: "Enterprise (50+ pages)", range: "~$100/page (≈$10,000-15,000)", detail: "A page for every service and every town, plus cost guides and projects. Widest reach." },
          ],
          note: "Illustrative guidance, not measured market data and not a quote. Real prices vary by builder, scope, and region. The point is the shape: more reach costs more, and a brochure should never cost what a system costs.",
        },
        { kind: "p", text: "Notice the enterprise tier is priced **per page** (around $100 each). That's the honest way to price depth: a full build of 100 or more real pages is real work, and the cost scales with the number of pages built." },
      ],
    },
    {
      id: "what-each-buys",
      h2: "What each tier should actually buy",
      navLabel: "What each buys",
      blocks: [
        { kind: "p", text: "Price means nothing without knowing what it includes. Here's the floor for each rung — if a quote skips these, it's overpriced no matter the number." },
        { kind: "p", text: "**Brochure** — a handful of pages that describe you:" },
        {
          kind: "list",
          items: [
            "Home, about, contact, and a gallery",
            "One flat list of your services",
            "Enough to be found when someone searches your company name",
          ],
        },
        { kind: "p", text: "**Standard** — the floor for a site that can actually rank:" },
        {
          kind: "list",
          items: [
            "**Dedicated location pages** — one for every town you serve",
            "**Dedicated service pages** — one for every service you sell",
            "**Online scheduling** — so a ready buyer can book without waiting",
            "**Basic on-page SEO** — real titles, headings, descriptions, internal links",
            "**Technical SEO** — fast, mobile, crawlable, with a sitemap and schema so machines can read it",
          ],
        },
        { kind: "p", text: "**Enterprise** — everything in the standard tier, taken wide:" },
        {
          kind: "list",
          items: [
            "A dedicated page for **every service you sell and every town you serve**, not just your core ones",
            "The deepest topical coverage, so the site builds authority and each new page ranks faster",
            "The widest reach — your service pages and a page for every town cover far more of what buyers search",
            "Full schema across every page, so Google and AI tools can read and cite the whole site",
          ],
        },
      ],
    },
    {
      id: "the-reality",
      h2: "What contractors are actually getting for the money",
      navLabel: "The reality",
      blocks: [
        { kind: "p", text: "This is where the price stops being the real story. The problem isn't the number — it's the gap between what the number should buy and what gets delivered." },
        { kind: "p", text: "We scanned **1,017 live contractor sites** end to end. **More than half had no dedicated location pages at all (MEASURED).** Around **73% had no cost or pricing content (MEASURED).**" },
        { kind: "p", text: "Most of those sites are priced like a standard system. They're delivering a brochure. The money is being spent — the system isn't being built." },
        { kind: "takeaway", label: "The gap", text: "The common failure isn't overpaying. It's paying **standard-site money for brochure-tier work**. Before you ask \"is this price fair,\" ask \"does this price include the pages that let a buyer in the next town find me.\"" },
      ],
    },
    {
      id: "the-guardrail",
      h2: "One honest catch on price",
      navLabel: "The honest catch",
      blocks: [
        { kind: "p", text: "Two warnings, one on each end of the price range." },
        { kind: "p", text: "**Too cheap** usually means a brochure dressed up as a system — a low monthly fee for pages that can't rank. **A bigger page count** only helps if every page is real." },
        { kind: "antiDoorway" },
        { kind: "p", text: "So don't shop on price alone, and don't shop on page count alone. Shop on **real pages for the real services and towns you serve.** That's the thing the price should be buying." },
        { kind: "p", text: "Want to see what a deep build looks like before you judge a quote? Read [the enterprise site](/guides/the-enterprise) and [the standard site](/guides/the-standard), or [audit your own site](/audit) against the fundamentals." },
      ],
    },
  ],
};
