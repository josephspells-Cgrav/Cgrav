import type { GuideContent } from "@/lib/content-blocks";

/* Category 1 — website types. The top rung: the enterprise site (50+ pages).
 * Honest pros-and-cons where the MAIN con is plainly that it costs more — stated
 * flat, not buried. The pros (widest reach, deepest authority, wins the
 * considered search) outweigh it for the right business. Comparison block draws
 * on the 147-vs-10 MEASURED reference build. No ranking guarantees. */

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-is",
      h2: "The enterprise site: 50+ pages and the widest reach",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "An enterprise site is the deepest rung: **50 or more pages**. A dedicated page for every service you sell, a dedicated page for every town you serve, and the cost guides, comparisons, and project pages that round it out across your whole region." },
        { kind: "p", text: "Where a standard site covers your core towns and services, an enterprise site covers them **all** — a page for every service you offer and a page for every town you work, not just the main ones." },
        { kind: "p", text: "That depth does one thing nothing smaller can: it gives you the **widest possible reach** in search. Between a page for each service and a page for each town, something relevant is ready for almost any search a buyer types." },
        { kind: "takeaway", label: "The short answer", text: "An enterprise site is a **50-plus page** system: a dedicated page for every service and every town you cover, plus deep supporting content. It's the widest reach and the deepest authority you can build. The one real trade-off is that it **costs more** — covered plainly below." },
      ],
    },
    {
      id: "the-upside",
      h2: "What the depth actually buys you",
      navLabel: "The upside",
      blocks: [
        { kind: "p", text: "The reason to go this deep isn't bragging rights on page count. It's three things a smaller site structurally can't do." },
        {
          kind: "list",
          items: [
            "**The widest reach** — a page for every service you sell and every town you serve means you can rank for far more searches than a brochure or standard site has pages for",
            "**The deepest authority** — the more good, relevant pages you publish, the more Google trusts the whole site, so each new page ranks a little faster than the last",
            "**It wins the considered search** — for the buyer who researches before they call, the deepest, most useful site is usually the one that gets the call",
            "**It's the most machine-readable** — more pages, all marked up with schema, give Google and AI tools far more to find, read, and cite",
          ],
        },
        { kind: "p", text: "Our live reference build runs **147 pages (MEASURED)** against a 10-page brochure. Same trade, same town, far wider reach. Here is the gap side by side." },
        {
          kind: "comparison",
          leftLabel: "10-page brochure",
          rightLabel: "147-page enterprise build",
          rows: [
            { label: "Pages Google can rank", brochure: "10", system: "147", flag: "MEASURED" },
            { label: "LocalBusiness schema", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Query surface (searches you can show up for)", brochure: "Narrow", system: "Wide", flag: "MEASURED" },
            { label: "AI-answer legibility", brochure: "No", system: "Yes", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "These numbers are measured, not estimated. It's the difference between a site Google reads as one business card and a site it reads as the best answer to hundreds of different searches." },
      ],
    },
    {
      id: "the-catch",
      h2: "The catch: it costs more",
      navLabel: "The catch (cost)",
      blocks: [
        { kind: "p", text: "There is really only one trade-off, and it is plain: **an enterprise site costs more.**" },
        { kind: "p", text: "More pages means more to build and more to keep accurate. There is no way around that." },
        { kind: "p", text: "So the question isn't whether it costs more — it does. The question is whether the **extra reach is worth the extra cost** for your business. If you're trying to win a whole region, it usually is. If you serve one town, it usually isn't." },
        { kind: "p", text: "And the depth only pays off if every page is **real**. Fifty thin pages that just swap the town name in and out don't build authority — Google ignores them, and they can hurt you." },
        { kind: "antiDoorway" },
        { kind: "takeaway", label: "The honest version", text: "The only real downside is the price. The upside — the widest reach, the deepest authority, winning the considered search — is the payoff a smaller site structurally can't deliver. Worth it if you're growing across a region; overkill if you're not." },
      ],
    },
    {
      id: "who-its-for",
      h2: "Who the enterprise site is for",
      navLabel: "Who it's for",
      blocks: [
        { kind: "p", text: "This rung is for one kind of business, and it's a waste of money for the other. Know which you are." },
        { kind: "p", text: "**It fits you if:** you serve a wide region or many towns, you sell several services, and you want to show up across all of them — and you can fund a real build." },
        { kind: "p", text: "**It's overkill if:** you run on referrals or serve a single town. The reach you'd be paying for is reach you won't use, and a [standard site](/guides/the-standard) does the job for less." },
        { kind: "p", text: "Want to see what actually fills a build this deep? Read [how location pages cover every town](/guides/location-pages). To compare what each tier should cost, see [what a contractor website should cost](/guides/what-a-website-should-cost)." },
      ],
    },
  ],
};
