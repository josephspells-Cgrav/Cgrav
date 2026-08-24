import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-ships",
      h2: "What does an authority outdoor-living website actually ship?",
      navLabel: "What it ships",
      speakable: true,
      blocks: [
        { kind: "p", text: "An authority outdoor-living website ships **105 pages**, not the ten a brochure ships. Decks, patios, pergolas, outdoor kitchens, fire features, screened porches, retaining walls, paver driveways, and pool decks are not one service." },
        { kind: "p", text: "They are nine distinct buyers searching nine distinct ways, multiplied across every town you build in. The brochure flattens all of that into a single Services page and a contact form. The system gives each intersection of service and place its own page, because that is where the search actually happens." },
        { kind: "p", text: "The reference build runs **147 pages** across its full footprint. An outdoor-living site sized to its catalog lands near **105**, roughly **10×** a brochure." },
        { kind: "p", text: "That multiple is not padding. Every page answers a real query a homeowner types: what a composite deck costs, whether pavers beat a concrete patio, how long a permit takes, what a screened porch adds to resale." },
        { kind: "p", text: "The brochure has none of those pages, so it can rank for none of those queries. It competes for the homepage term and loses the other ninety." },
        {
          kind: "comparison",
          leftLabel: "Brochure",
          rightLabel: "Authority system",
          rows: [
            { label: "Total pages", brochure: "~10", system: "105", flag: "MEASURED" },
            { label: "Service pages", brochure: "1", system: "9+", flag: "MEASURED" },
            { label: "City pages", brochure: "0", system: "Per town", flag: "MODELED" },
            { label: "Cost calculator", brochure: "No", system: "Yes", flag: "ILLUSTRATIVE" },
            { label: "LocalBusiness schema", brochure: "No", system: "Yes", flag: "MODELED" },
            { label: "Permit guide", brochure: "No", system: "Yes", flag: "ILLUSTRATIVE" },
          ],
        },
        { kind: "p", text: "Most outdoor-living sites are not weak by accident. They are weak by default." },
        { kind: "p", text: "Across a broad sample of contractor sites, **94.8% fail WCAG accessibility**, **roughly 52% fail Core Web Vitals**, **about 27% have no dedicated site at all**, and an estimated **96% ship no LocalBusiness schema**. A homeowner pricing a $40,000 outdoor kitchen reads that as risk. The system clears all four because the page-type architecture, the schema, and the performance budget are built once and applied everywhere." },
        {
          kind: "chart",
          chart: "gap-wall",
        },
        {
          kind: "takeaway",
          text: "A brochure ships ten pages and competes for one term. An authority outdoor-living site ships roughly 105 and competes for ninety. The page count is the difference between owning the category and renting a corner of it.",
        },
      ],
    },
    {
      id: "the-matrix",
      h2: "Why the service-by-location matrix is the whole engine",
      navLabel: "The matrix",
      blocks: [
        { kind: "p", text: "The 105 pages are not arbitrary. They are a matrix." },
        { kind: "p", text: "Down one axis run the services: composite decking, wood decking, paver patios, pergolas and pavilions, outdoor kitchens, fire pits and fireplaces, screened porches, retaining walls, pool decks. Across the other run the towns you actually build in." },
        { kind: "p", text: "Each cell is a page that says, in plain terms, we build this thing in this place. That intersection is where outdoor-living demand concentrates, because a homeowner does not search 'outdoor living.' They search 'composite deck builder' and the name of their town." },
        {
          kind: "chart",
          chart: "matrix",
        },
        { kind: "p", text: "The matrix works because of how search demand is shaped. **95% of all queries get ten or fewer searches a month**, and **96.55% of all web pages get zero Google traffic**." },
        { kind: "p", text: "The traffic is not in a handful of fat head terms. It is spread across thousands of thin, specific ones: 'paver patio cost,' 'pergola permit,' 'screened porch vs sunroom.'" },
        { kind: "p", text: "A ten-page brochure cannot hold those queries because it has no page that matches them. The matrix holds them because it builds a page per intersection on purpose." },
        {
          kind: "chart",
          chart: "long-tail",
        },
        { kind: "p", text: "This is also why outdoor-living rankings are durable once earned. **72.9% of pages ranking in the top ten are three or more years old, and the average number-one page is five years old.** Authority is accumulated time." },
        { kind: "p", text: "A matrix page published today does not win tomorrow. It wins as it ages, accrues internal links, and earns the trust signals a deck buyer is quietly checking. The brochure never starts that clock on ninety of these queries because it never builds the pages." },
        {
          kind: "takeaway",
          text: "The matrix is the engine. Service times location equals a page, and a page is the only thing that can rank for the specific term a homeowner actually types. Ten pages cannot cover a demand curve made of thousands of thin queries.",
        },
      ],
    },
    {
      id: "cost-and-calculators",
      h2: "How much does a deck cost, and why your site must answer it",
      navLabel: "Cost & calculators",
      blocks: [
        { kind: "p", text: "The first thing a homeowner does is price the job. 'How much does a deck cost' is one of the highest-volume questions in the trade, and the brochure answers it with silence or a 'contact us for a quote.' That homeowner leaves and prices the job on a competitor's page instead." },
        { kind: "p", text: "An authority outdoor-living site answers the question on the page, with honest ranges by material and size, then routes the qualified buyer into a request. The answer is the magnet. The form is the catch." },
        {
          kind: "priceRange",
          title: "Deck and patio cost ranges (homeowner-facing, illustrative)",
          rows: [
            { label: "Pressure-treated wood deck", range: "$15 to $25 / sq ft", detail: "Lowest upfront, highest maintenance over its life." },
            { label: "Composite deck", range: "$30 to $60 / sq ft", detail: "Higher upfront, near-zero maintenance, longer service life." },
            { label: "Paver patio", range: "$15 to $40 / sq ft", detail: "Ground-level, no railing or framing, design flexible." },
            { label: "Outdoor kitchen", range: "$10,000 to $40,000+", detail: "Driven by appliances, counter material, and utilities." },
            { label: "Pergola or pavilion", range: "$5,000 to $25,000", detail: "Material, span, and whether it is freestanding or attached." },
          ],
          note: "Illustrative regional ranges for homeowner orientation. Real quotes depend on grade, access, footings, and finish. Replace with your verified local numbers before publishing.",
        },
        { kind: "p", text: "A **cost calculator** turns that table into a tool. The homeowner picks a material, enters square footage, and gets a real range in seconds." },
        { kind: "p", text: "The calculator does three things at once. It answers the buyer's actual question, so they stay." },
        { kind: "p", text: "It qualifies them, so the lead that reaches you is already serious about a budget. And it earns citations, because **a page that gets cited in AI answers earns about 35% more organic clicks**, and a working calculator is the kind of utility that gets cited." },
        { kind: "p", text: "The brochure has a price it will not show. The system has a tool that shows it and captures the buyer who used it." },
        {
          kind: "definition",
          term: "Cost calculator (lead asset)",
          def: "An interactive page where a homeowner sizes their own project and receives an honest range. It serves the buyer first, captures the qualified lead second, and earns links and citations third. A brochure quote form does none of these.",
        },
        {
          kind: "takeaway",
          text: "Answer the cost question on the page or lose the buyer to the site that does. A calculator answers it, qualifies the lead, and earns the citation. Silence does none of that.",
        },
      ],
    },
    {
      id: "composite-vs-wood",
      h2: "Composite vs wood, design galleries, and the buyer's real questions",
      navLabel: "Decision content",
      blocks: [
        { kind: "p", text: "Before a homeowner asks for a quote, they make a decision: composite or wood, pavers or concrete, attached or freestanding. The brochure skips this entirely and jumps to 'request a free estimate,' which is asking for a commitment from someone who has not yet decided what they want." },
        { kind: "p", text: "The authority site lives in the decision. It builds the comparison pages, the galleries, and the layout guides that move a researcher from undecided to ready, and it earns the lead at the end of that journey instead of begging for it at the start." },
        {
          kind: "debunk",
          myth: "Composite costs more, so wood is the better value.",
          reality: "Composite costs more upfront and less over its life. Wood demands staining, sealing, and board replacement on a schedule; composite does not.",
          why: "A buyer comparing only the install quote sees one number. A comparison page shows the ten-year cost, which is the number that actually decides the job. That honest framing is exactly the content a brochure omits and a citation engine rewards.",
        },
        { kind: "p", text: "A **design and layout gallery** is not decoration. It is decision content with photographs." },
        { kind: "p", text: "A homeowner who can see a 16-by-20 paver patio with a fire feature, or a multi-level composite deck with a pergola, can picture the project on their own lot, and a buyer who can picture it converts. The gallery also feeds the visual surfaces: real project images, captioned and structured, are what image search and AI answer panels pull. The brochure ships a stock-photo carousel that matches nothing it has actually built." },
        { kind: "p", text: "This decision content is also how the site survives the shift to answer engines. **AI Overviews cut clicks to the top result from roughly 34.5% in April 2025 to about 58% by December 2025, and 60% of searches now end without a click.** The site that gets cited inside those answers is the one that wrote the clearest comparison, the most honest cost breakdown, and the most useful layout guide." },
        { kind: "p", text: "And the surface is its own game: **88% of URLs cited in AI answers do not rank in the top ten organically.** Decision content earns the citation whether or not it tops the blue links. The brochure, with no comparison pages and no guides, is invisible on both surfaces." },
        {
          kind: "takeaway",
          text: "Buyers decide before they request. Composite-vs-wood comparisons, honest lifetime-cost framing, and real project galleries win the decision and earn the citation. The brochure asks for the commitment before it has earned the decision.",
        },
      ],
    },
    {
      id: "permits-and-process",
      h2: "The permit and process guide that turns researchers into leads",
      navLabel: "Permits & process",
      blocks: [
        { kind: "p", text: "Every serious deck and structure question runs into the same wall: permits. Does a deck need one, how long does it take, what about a pergola or a screened porch, what does the inspection check." },
        { kind: "p", text: "The brochure does not answer this, so the researcher leaves to find out. A **permit and process guide** keeps them on the site, demonstrates that you have done this a hundred times, and converts the anxious researcher into a confident lead. Expertise on the page is the trust signal, and trust is what makes a homeowner hand a stranger forty thousand dollars." },
        {
          kind: "list",
          ordered: true,
          items: [
            "Design and material selection, with the cost ranges set on the calculator page.",
            "Permit application and plan submission, with realistic timelines for your jurisdiction.",
            "Footing and structural inspection, scheduled before framing covers it.",
            "Build, from footings and framing through decking, railing, and finish.",
            "Final inspection and sign-off, then handoff with care and warranty terms.",
          ],
        },
        { kind: "p", text: "The process guide also matches how the buyer actually decides. **78% of buyers shortlist three or fewer vendors, and 95% of buyers choose a name that was on their shortlist on day one.** The site that answers the permit question, walks the process, and shows real projects earns the day-one shortlist slot." },
        { kind: "p", text: "The brochure that answers nothing is not on the list when the decision is made. You cannot win a job you were never considered for, and consideration is earned with content before the call ever happens." },
        { kind: "p", text: "Keep the permit guide honest and jurisdiction-specific. State the timelines you actually see, not a guess, and update them as your local office changes." },
        { kind: "p", text: "An authority page is one a homeowner could read, act on, and find true. That standard is what makes the page rank, get cited, and convert. A vague paragraph that says 'permitting varies' helps no one and ranks for nothing." },
        {
          kind: "takeaway",
          text: "The permit and process guide turns the most anxious part of the project into your proof of expertise. Answer it honestly and you earn the day-one shortlist slot the brochure never even competes for.",
        },
      ],
    },
    {
      id: "real-projects-only",
      h2: "Every page maps to a real project, never a phantom city",
      navLabel: "No doorway pages",
      blocks: [
        { kind: "p", text: "The matrix scales to 105 pages, which raises the obvious temptation: spin up a page for every nearby town whether or not you build there. That is a doorway page, and it is the fastest way to get an outdoor-living site penalized and untrusted." },
        { kind: "p", text: "The rule is hard. A page exists because a real project, a real crew, and a real service back it. If you cannot put a built deck, a named town, and an honest claim on the page, the page does not get made." },
        {
          kind: "antiDoorway",
        },
        { kind: "p", text: "The test is simple: delete the city name from the page. If what remains is still true and specific to your work, the page is real." },
        { kind: "p", text: "If deleting the city leaves generic filler that could describe any contractor anywhere, it is a doorway and it gets cut. Real project pages pass this test because they carry real photographs, real materials, and a real crew. Phantom-city pages fail it because there is nothing underneath the town name." },
        { kind: "p", text: "This discipline is also why the authority site compounds while the spam site collapses. Durable rankings reward accumulated, genuine pages, the kind that are three and five years old and still true." },
        { kind: "p", text: "Doorway pages get the opposite: a short spike, then a penalty, then nothing. Build the matrix from real jobs and it grows into an asset you own." },
        { kind: "p", text: "Build it from phantom cities and it becomes a liability you have to clean up. From here, run your own site through the [free site audit](/audit) to see which pages are real and which are missing, then read the [composite-vs-wood and cost guides](/guides/trades/kitchen-bath) for how decision content earns the lead." },
        {
          kind: "takeaway",
          text: "Scale the matrix from real projects, never phantom cities. Delete the city name: if the page is still true, keep it. If it turns to filler, cut it. Real pages compound; doorway pages get penalized.",
        },
      ],
    },
  ],
};
