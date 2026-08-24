import type { GuideContent } from "@/lib/content-blocks";

/* Category 1 — website types. The bottom rung: the brochure. NEUTRAL, Howard-
 * Roark-detached voice (WO_09 edit pass): state what it is, the genuine pros, the
 * structural limits, and who it fits — facts, not angst, no attacking brochures.
 * Lead balanced, not negative-first. Page-count facts locked (~5-10); the
 * 53-57% no-location-pages stat is the MEASURED 1,017-site scan, flag kept. */

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-is",
      h2: "The brochure site: what it is, what it can and can't do",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "A brochure site is a **digital business card**. Five to ten pages: a home page, an about page, a contact page, a gallery, and a list of your services." },
        { kind: "p", text: "It describes your business to someone who already found you. For a lot of contractors, that is genuinely all a website needs to do." },
        { kind: "p", text: "What it ranks for is narrow by design: **your company name** and the **city your office sits in**. For a search beyond that, like a service in a specific town, a brochure has no page built to compete." },
        {
          kind: "definition",
          term: "Brochure site",
          def: "A small website (about 5 to 10 pages) that describes your business. Like a paper brochure: well suited to someone who already knows you, and not built to get found by someone who doesn't.",
        },
        { kind: "takeaway", label: "The short answer", text: "A brochure is a **5 to 10 page business card**. It ranks for your name and your home city, and not for **\"your service in the next town,\"** because there is no page built for that search. For some businesses, that is exactly enough." },
      ],
    },
    {
      id: "the-upside",
      h2: "Where a brochure is the right fit",
      navLabel: "The upside",
      blocks: [
        { kind: "p", text: "For the right business, a brochure is enough, and there is no reason to pay for more. Its strengths are real." },
        {
          kind: "list",
          items: [
            "**Cheap** — the lowest-cost site you can put up and keep online",
            "**Fast to build** — a few pages, live in days, not months",
            "**Easy to maintain** — less to update, less that can break",
            "**Fine for a referral business** — if work comes word-of-mouth, people search your name, and a brochure answers that search",
            "**A real address online** — an owned page, better than a social profile you don't control",
          ],
        },
        { kind: "p", text: "If your phone rings from referrals and you are not trying to grow into new towns, a brochure does the job. More site than that would be reach you are not using." },
      ],
    },
    {
      id: "the-limits",
      h2: "What a brochure isn't built to reach",
      navLabel: "The limits",
      blocks: [
        { kind: "p", text: "A brochure's limits are limits of structure, not quality. They show up the moment you want work from beyond your home city." },
        { kind: "p", text: "Buyers who don't know your name don't search it. They search a **service plus a place**, like \"roof repair in [town]\" or \"kitchen remodel near me.\"" },
        { kind: "p", text: "Showing up for that search takes a page about **that service** in **that town**. A brochure has one flat services list and no town pages, so there is nothing for that search to match." },
        {
          kind: "list",
          items: [
            "**No dedicated town pages** — nothing to rank for a town other than the one your office sits in",
            "**No dedicated service pages** — each service shares one list instead of having a page of its own",
            "**A narrow reach** — a handful of name searches, rather than the hundreds of \"service in town\" searches buyers type",
            "**Little for AI to read** — when someone asks an assistant for a contractor, there is no page deep enough to be the source it cites",
          ],
        },
        { kind: "p", text: "More than half of the contractor sites we scanned had **no dedicated location pages at all (MEASURED)**. Most of them are brochures. The limit is structural: a page that was never built can't rank." },
        { kind: "takeaway", text: "For a \"service in town\" search, the page that exists is the one that can rank. A brochure doesn't have that page, so the search goes to a site that does. It is a question of structure, not of who does better work." },
      ],
    },
    {
      id: "who-its-for",
      h2: "Who a brochure is for",
      navLabel: "Who it's for",
      blocks: [
        { kind: "p", text: "A brochure fits one kind of business well and another poorly. The line is simple." },
        { kind: "p", text: "**It fits you if:** you run on referrals, you serve one town, and you want a clean, owned place online for people who already heard your name." },
        { kind: "p", text: "**It's the wrong fit if:** you want work from towns you don't dominate yet, or you want to earn leads from search instead of renting them." },
        { kind: "p", text: "If that second one is you, the brochure isn't the rung. The next step up is [the standard site](/guides/the-standard), the smallest site built to rank. For the full ladder and what each tier should cost, see [what a contractor website should cost](/guides/what-a-website-should-cost)." },
      ],
    },
  ],
};
