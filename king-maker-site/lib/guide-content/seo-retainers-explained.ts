import type { GuideContent } from "@/lib/content-blocks";

/* Category 2 — pricing deep dive. What a ~$2,000/mo SEO retainer buys. REFRAMED
 * (WO_09 edit pass): the PRIMARY product is OFF-PAGE work → higher rankings →
 * more organic visitors, NOT site maintenance/upkeep. This page is the overview
 * that tees up Cat 7 (what backlinks are). NEUTRAL, Howard-Roark-factual voice.
 * HONESTY: ~$2,000/mo is ILLUSTRATIVE (priceRange default flag; no `flag` field).
 * No ranking guarantees; PBNs named as a red flag. Trade-agnostic. */

export const content: GuideContent = {
  sections: [
    {
      id: "short-answer",
      h2: "Why do some companies charge $2,000 a month?",
      navLabel: "The short answer",
      speakable: true,
      blocks: [
        { kind: "p", text: "Building a website is a one-time job. Getting it to **rank, and to keep climbing**, is ongoing work. That ongoing work is what a monthly SEO retainer pays for." },
        { kind: "p", text: "Most of that work is **off-page**: building your site's reputation across the rest of the web so Google trusts it and ranks it higher. The product a retainer sells is **higher rankings, and the organic visitors that come with them.**" },
        { kind: "p", text: "A figure around **$2,000 a month** is common at the serious end. Whether it's a fair deal or a waste comes down to what is actually done each month." },
        { kind: "takeaway", label: "The short answer", text: "A **~$2,000/mo** retainer buys ongoing work to **push your site up the rankings and bring more organic visitors** — mostly **off-page** reputation-building, with content and pages to support it. (~$2,000/mo is **illustrative**, not a fixed rate.)" },
      ],
    },
    {
      id: "what-it-buys",
      h2: "What the monthly fee actually buys",
      navLabel: "What it buys",
      blocks: [
        { kind: "p", text: "A retainer has one main job: **move you up the search results and keep you there**, so more buyers find you. Most of the work points at that single goal." },
        { kind: "p", text: "The main lever is **off-page** work." },
        {
          kind: "definition",
          term: "Off-page SEO",
          def: "The work that happens away from your own website to build its reputation: other reputable sites linking to or mentioning you, and your business listings (like Google Business Profile) being accurate everywhere. Google reads it as other people vouching for you, and ranks a vouched-for site higher.",
        },
        { kind: "p", text: "That is the part that actually moves rankings. The rest of the retainer exists to support it:" },
        {
          kind: "list",
          items: [
            "**Ongoing content** — new pages and articles that earn authority and answer what buyers search",
            "**Page expansion** — adding service and town pages over time, so the site reaches into new searches and new markets",
            "**Light technical upkeep** — keeping the site fast, mobile, and crawlable as it grows",
            "**Reporting** — a plain monthly account of what was done, what moved, and what's next",
          ],
        },
        { kind: "p", text: "The off-page half runs almost entirely on **backlinks**, which is a subject of its own. Start here: [what backlinks are, and the three kinds that matter](/guides/manufacturer-backlinks)." },
      ],
    },
    {
      id: "worth-it",
      h2: "When it's worth it, and when it isn't",
      navLabel: "Worth it or not",
      blocks: [
        { kind: "p", text: "A retainer is not for everyone. The line is straightforward." },
        { kind: "p", text: "**It's usually worth it when:**" },
        {
          kind: "list",
          items: [
            "You're growing into more towns or services — there's always a next page to build and rank",
            "Each job is worth real money, so a handful of extra leads a month more than covers the fee",
            "You're in a competitive market, where standing still means slowly losing ground",
          ],
        },
        { kind: "p", text: "**It's usually not worth it when:**" },
        {
          kind: "list",
          items: [
            "Your site is still a brochure that needs rebuilding first — the foundation comes before promoting it",
            "You serve one town, run on referrals, and don't want more reach",
            "Your jobs are low-ticket, so the math can't pay back a four-figure monthly fee",
          ],
        },
        { kind: "p", text: "On results, the rule is plain: a good firm will **promise the floor and project the ceiling** — commit to the work and a realistic direction, and show you a best case. No one controls Google's rankings, so no one can honestly promise a specific spot." },
        {
          kind: "priceRange",
          title: "The math to run before you sign",
          rows: [
            { label: "Retainer", range: "~$2,000/mo", detail: "Illustrative — the serious end of the market" },
            { label: "Per year", range: "~$24,000", detail: "What you're actually committing" },
            { label: "Break-even", range: "Depends on job value", detail: "How many extra jobs a month cover it? If a few do, it can pay." },
          ],
          note: "Illustrative figures, not a quote. The number that matters is your own: what one extra job is worth, against the monthly fee.",
        },
      ],
    },
    {
      id: "real-vs-junk",
      h2: "How to tell a real retainer from a junk one",
      navLabel: "Real vs. junk",
      blocks: [
        { kind: "p", text: "A real retainer ships work you can see. A junk one bills for a report and little else. The difference is visible if you know what to look for." },
        { kind: "p", text: "**Signs of a real one:**" },
        {
          kind: "list",
          items: [
            "You can point to **new pages, content, or links** earned this month",
            "The monthly report shows **specific work done**, not just a rankings chart drifting up and down",
            "They talk in terms of **leads and money**, not only \"impressions\" and \"keywords\"",
            "They explain the work in plain English and answer when you ask",
          ],
        },
        { kind: "p", text: "**Red flags:**" },
        {
          kind: "list",
          items: [
            "**A guaranteed #1 ranking** — no one controls Google's results, so the promise can't be kept",
            "**No new work, just a report** — that pays for a dashboard, not for SEO",
            "**Bought links or \"link networks\" (PBNs)** — link schemes Google penalizes; they can get your site demoted",
            "**Vague deliverables** — \"ongoing optimization\" with nothing you can point to",
            "**A long contract with no proof of work** — real firms show results and earn the next month",
          ],
        },
        { kind: "takeaway", text: "The test is simple: at the end of the month, can you see what you paid for? A real retainer ships visible work. A junk one ships a chart." },
      ],
    },
    {
      id: "next",
      h2: "Before you pay for SEO",
      navLabel: "What to do next",
      blocks: [
        { kind: "p", text: "First, make sure there's a site worth promoting. A retainer pushes traffic at whatever you already have, so a 5-page brochure underneath it is a foundation that can't hold the weight." },
        { kind: "p", text: "Since off-page is the engine, the next thing to understand is what that work actually is: [what backlinks are](/guides/manufacturer-backlinks). Or check what a build itself should cost in [what a contractor website should cost](/guides/what-a-website-should-cost), or [audit your own site](/audit) to see if it's ready for ongoing SEO." },
      ],
    },
  ],
};
