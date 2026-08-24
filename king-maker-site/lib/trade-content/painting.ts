import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-ships",
      h2: "What does an authority painting site actually ship?",
      navLabel: "What it ships",
      speakable: true,
      blocks: [
        { kind: "p", text: "A brochure painting site ships about ten pages: a home page, an about page, a gallery, a contact form, and a thin list of services that reads like a price sheet with no prices. It describes the company." },
        { kind: "p", text: "It does not answer a single question a homeowner types before they hire. An authority painting site ships **118 pages**, and every one of them exists because a real person searches for it." },
        { kind: "p", text: "The difference is structural, not cosmetic. A homeowner deciding to repaint does not search \"painter near me\" first." },
        { kind: "p", text: "They search \"how much to paint a 2,000 sq ft house,\" \"best exterior paint for brick in humid climates,\" \"satin vs eggshell for living room walls,\" and \"do I need to prime before painting cabinets.\" Each of those is a page. The brochure has none of them, so it loses every one of those searches to whoever built the page. That is the entire mechanism." },
        {
          kind: "comparison",
          leftLabel: "Brochure painter",
          rightLabel: "Authority painter",
          rows: [
            { label: "Total pages", brochure: "~10", system: "118", flag: "MEASURED" },
            { label: "Service pages", brochure: "3-5", system: "Per service, per city", flag: "MEASURED" },
            { label: "Cost / how-to answers", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "LocalBusiness schema", brochure: "No", system: "Yes", flag: "MODELED" },
            { label: "Passes accessibility", brochure: "Rarely", system: "Yes", flag: "MEASURED" },
          ],
        },
        {
          kind: "p",
          text: "When we scanned 1,017 contractor sites against a live authority build, the gap was not subtle. **57% had no real location pages, so they can't rank past their map-pin. 70% couldn't even name their city in a page title. 71% had no llms.txt, invisible to AI search.** The brochure is not a smaller version of the authority site. It is a different category of object: one describes, the other ranks.",
        },
        {
          kind: "takeaway",
          text: "A brochure tells a homeowner you exist. An authority site answers the question that was going to send them to a competitor. Eight extra pages is decoration; 100-plus pages built around real searches is an asset that compounds.",
        },
      ],
    },
    {
      id: "service-location-matrix",
      h2: "Why one page per service is not enough",
      navLabel: "Service x location",
      blocks: [
        {
          kind: "p",
          text: "A single \"Interior Painting\" page can rank for \"interior painting.\" It cannot rank for \"interior painting in Davidson\" or \"interior painting Huntersville,\" because Google reads the searcher's location as part of the query and rewards the page that names the place. The brochure has one service page and ten suburbs in its market. It is competing for one of eleven possible pages and ceding the other ten.",
        },
        { kind: "p", text: "The fix is the service-by-location matrix. Every service the painter offers becomes a row." },
        { kind: "p", text: "Every city and neighborhood they cover becomes a column. The intersection is a real page: \"Cabinet Refinishing in Cornelius,\" \"Exterior Painting in Matthews,\" \"Commercial Painting in Uptown Charlotte.\" Ten services across twelve locations is 120 addressable pages where the brochure had one." },
        { kind: "chart", chart: "matrix" },
        { kind: "p", text: "This only works if the pages are real. A page that swaps the city name into the same paragraph is a doorway page, and Google has demoted that pattern for a decade." },
        { kind: "p", text: "Each location page on an authority build carries the specific jobs done in that town, the local crew, the relevant HOA and permit details, the climate factors that change which paint and prep a house actually needs. The matrix is the skeleton." },
        { kind: "p", text: "Genuine local content is the muscle. Build only the skeleton and you get penalized; build both and you own the map." },
        {
          kind: "takeaway",
          text: "Demand is geographic. \"Painter near me\" resolves to the searcher's exact town, and the page that names that town wins. One service page covers one query. The matrix covers every service in every town you actually serve.",
        },
      ],
    },
    {
      id: "demand-curve",
      h2: "Where does the traffic actually live?",
      navLabel: "The demand curve",
      blocks: [
        {
          kind: "p",
          text: "Everyone wants to rank for \"house painter.\" Almost nobody can, and even if you did, it would not be where the money is. **95% of all search queries get 10 or fewer searches per month.** The volume is not in the handful of fat head terms. It is spread across thousands of specific, low-volume, high-intent questions, and that is exactly the demand the brochure cannot reach.",
        },
        { kind: "chart", chart: "long-tail" },
        {
          kind: "p",
          text: "A homeowner who searches \"how much to paint kitchen cabinets white\" is closer to hiring than one who searches \"painter.\" They have a defined job and a defined intent. A page that answers that exact question earns the click and the trust in the same motion. Multiply that across hundreds of specific questions and the long tail outproduces the head term it would have lost anyway.",
        },
        {
          kind: "p",
          text: "The brutal context: **96.55% of all web pages get zero traffic from Google.** Most pages fail not because the content is bad but because nothing on the page matches a real query. The authority build inverts that. Every page is reverse-engineered from a search that already exists, so the page is born answering demand instead of hoping to be discovered.",
        },
        { kind: "p", text: "And the position compounds with age. **72.9% of top-ten results are three or more years old, and the average #1 page is five years old.** Authority is accumulated time." },
        { kind: "p", text: "The painter who publishes the cabinet-refinishing answer this quarter is not competing with this quarter's brochures. They are starting the five-year clock that the brochure will never start." },
        {
          kind: "takeaway",
          text: "The traffic lives in the long tail of specific questions, not the head term. Each answer is a page; each page born from a real query starts compounding. Authority is accumulated time, and the brochure never starts the clock.",
        },
      ],
    },
    {
      id: "industry-pages",
      h2: "The painting-specific pages a homeowner needs",
      navLabel: "Industry pages",
      blocks: [
        {
          kind: "p",
          text: "Service-by-location pages capture intent that already names the job. The industry pages capture intent earlier, when the homeowner is still figuring out scope, cost, and choices. These are the pages that turn a researcher into a lead, and they are precisely the pages a brochure never builds.",
        },
        {
          kind: "p",
          text: "**The paint cost calculator and the \"how much to paint a house\" page** answer the first question every homeowner has: what will this cost. A page that gives an honest range by square footage, surface, and prep does more than rank. It pre-qualifies the lead and frames the budget before the estimate, so the conversation starts on price reality instead of sticker shock.",
        },
        {
          kind: "priceRange",
          title: "Interior painting, typical homeowner ranges",
          rows: [
            { label: "Single room", range: "$400 - $1,000", detail: "Walls, one to two coats, standard prep" },
            { label: "Whole-home interior", range: "$3,000 - $7,500", detail: "By square footage and ceiling height" },
            { label: "Cabinet refinishing", range: "$3,000 - $9,000", detail: "Strip, prime, spray finish, kitchen scope" },
          ],
          note: "Ranges are illustrative and vary by region, prep, and finish. The calculator page produces a local, scoped estimate.",
        },
        {
          kind: "p",
          text: "**The interior-vs-exterior page and the finish-and-sheen glossary** answer the decision questions. A homeowner who does not know whether they need satin or eggshell, or why exterior paint and interior paint are not interchangeable, will trust the painter who explains it clearly. The glossary page (flat, matte, eggshell, satin, semi-gloss, high-gloss, and where each belongs) is reference content that earns links, ranks for dozens of sheen queries, and positions the painter as the expert before anyone calls.",
        },
        {
          kind: "list",
          items: [
            "Paint cost calculator: interactive, square-footage driven, local range output.",
            "\"How much to paint a house\": the cost answer, by interior, exterior, and scope.",
            "Interior vs exterior: why the paints, prep, and timing differ.",
            "Finish and sheen glossary: flat through high-gloss, with the right room for each.",
            "Color consultation: how the process works, undertones, lighting, sample boards.",
            "Cabinet refinishing: the spray-finish process, durability, and cost vs replacement.",
          ],
        },
        {
          kind: "p",
          text: "**The color consultation page and the cabinet refinishing page** carry the highest-margin work. Color consultation positions the painter as a designer, not a labor commodity, and converts the homeowner who is paralyzed by 200 white swatches. Cabinet refinishing is the search where a $9,000 job hides behind a $40 query: a homeowner comparing refinishing against a $25,000 kitchen replacement is a buyer with budget, and the page that explains the process in detail wins that buyer before a single estimate is booked.",
        },
        {
          kind: "takeaway",
          text: "Service pages catch the homeowner who already named the job. The cost, decision, and process pages catch them earlier, frame the budget, and prove expertise before the call. That is where the high-margin work is won.",
        },
      ],
    },
    {
      id: "what-makes-a-real-page",
      h2: "What makes a page real instead of a doorway",
      navLabel: "Real, not doorway",
      blocks: [
        {
          kind: "p",
          text: "The matrix and the industry pages only win if each page earns its place. The shortcut, generating a hundred near-identical pages with the town name swapped in, is the exact pattern search engines built filters to demote. The line is simple, and it is the line the whole authority approach is built on.",
        },
        { kind: "antiDoorway" },
        { kind: "p", text: "For a painter this means every location page is anchored to real jobs done in that area: the actual exterior repaint in that subdivision, the cabinet job in that town's kitchen, the HOA color approval the crew navigated there. Delete the city name and the page should still describe something true and specific." },
        { kind: "p", text: "If removing the place name leaves a generic template, it was a doorway, and it deserves to fail. Build pages from real jobs and the same content that satisfies Google satisfies the homeowner, because it is the same thing they were searching for." },
        { kind: "p", text: "This is the discipline that separates a 118-page asset from 118 liabilities. Volume without substance gets filtered." },
        { kind: "p", text: "Volume built from real work compounds. The authority painting site is the second kind, and that is why it keeps ranking while the brochure, and the doorway-page knockoff, both stall." },
        {
          kind: "takeaway",
          text: "The test is one sentence: delete the city name. If the page still says something true and specific, it is real. If it collapses into a template, it is a doorway and it will fail. Every page on an authority build passes that test.",
        },
        {
          kind: "p",
          text: "See how the same structure plays out in another trade in the [roofing authority-site guide](/guides/trades/roofing), or run your current site through the [free site audit](/audit) to see exactly which pages you are missing and which searches you are ceding.",
        },
      ],
    },
  ],
};
