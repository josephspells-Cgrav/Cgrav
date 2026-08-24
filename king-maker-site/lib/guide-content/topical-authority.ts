import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-is",
      h2: "How do you become the site Google trusts?",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: you cover one subject **deeply, across many connected pages**, until Google reads your whole site as an authority on it. That is topical authority, and it is how depth turns into trust and trust turns into rankings." },
        { kind: "p", text: "Think about how trust works with a person. Someone who has written one blog post about roofing is a hobbyist. Someone who has written fifty pages covering every roof type, every material, every cost question, and every town they work is the expert you call. Google reasons the same way." },
        { kind: "p", text: "When your site covers a subject from every angle — services, materials, costs, the questions buyers ask, the towns you serve — Google stops seeing a handful of pages and starts seeing the **authority** on that subject. And it ranks authorities." },
        { kind: "p", text: "A ten-page brochure can never get there. It does not have enough pages to cover a subject deeply, so Google has no reason to treat it as more than a business card." },
        { kind: "takeaway", text: "Cover one subject deeply across many connected pages and Google treats your whole site as the authority on it. Depth compounds into trust; trust compounds into rankings. A brochure has no depth to compound." },
      ],
    },
    {
      id: "how-depth-compounds",
      h2: "How depth compounds into trust",
      navLabel: "How it compounds",
      blocks: [
        { kind: "p", text: "Topical authority is not built page by page in isolation. The pages lift each other, and that is what makes it compound." },
        { kind: "p", text: "Each page you add covers another piece of the subject — and you link the related pages together, so a buyer (and Google) can move from your roof-cost page to your metal-roofing page to your Mooresville page. That web of connected pages is the signal of real depth." },
        { kind: "p", text: "And the rankings you already hold do real work for the next page. A site Google already trusts on a subject gets its **new** pages read as credible faster, so each one ranks a little quicker than the last." },
        { kind: "p", text: "That is the compounding part. A brochure has ten unconnected pages and nothing to build on. An authority site has a growing web where every new page both adds coverage and borrows the trust the others already earned." },
        { kind: "definition", term: "Topical authority", def: "The trust Google places in a site that covers a subject deeply and from many angles across connected pages. The more completely and credibly you cover a topic, the more Google treats your site as the authority on it — and the faster your new pages on that topic rank." },
      ],
    },
    {
      id: "how-to-build-it",
      h2: "How to actually build it",
      navLabel: "How to build it",
      blocks: [
        { kind: "p", text: "Building topical authority is not a trick — it is coverage, done honestly and connected together. Here is the shape of it for a contractor:" },
        {
          kind: "list",
          ordered: true,
          items: [
            "**A real page for every service.** Not one \"Services\" page — a dedicated page for each thing you do, each one specific and complete.",
            "**A real page for every town you work.** Built from a real job there, the way [location pages](/guides/location-pages) describes — that is your geographic coverage.",
            "**The questions buyers actually type.** Cost pages, comparison pages (\"shingle vs. metal\"), how-it-works guides — answer the searches, not just the sales pitch.",
            "**Link the related pages together.** The cost page links to the service page links to the town page. That web is what tells Google the coverage is real and connected.",
          ],
        },
        { kind: "p", text: "Do this and you cover the long tail, which is where most search demand quietly lives. **95% of search queries get ten or fewer searches a month (MEASURED)** — thousands of small, specific searches a brochure cannot touch and a deep site can." },
        { kind: "p", text: "Worth saying plainly: this is accumulation, not an overnight flip. Authority builds as the pages add up and earn trust over time. We promise the floor and project the ceiling — the floor is that depth is the only thing that **can** make Google treat you as the authority, and a brochure structurally cannot." },
        { kind: "takeaway", label: "The honest version", text: "Topical authority is earned, not bought: cover the subject deeply, connect the pages, answer the real questions, and let it compound. It is not instant — but it is the one path to becoming the site Google trusts, and a ten-page brochure can never walk it. The deep, connected system is the whole point of [an enterprise-grade website](/guides/the-enterprise)." },
      ],
    },
  ],
};
