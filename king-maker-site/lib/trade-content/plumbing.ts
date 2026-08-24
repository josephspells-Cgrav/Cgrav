import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-ships",
      h2: "What an authority plumbing site actually ships",
      navLabel: "What it ships",
      speakable: true,
      blocks: [
        { kind: "p", text: "A plumbing site that ranks is not a homepage with a phone number. It is a system." },
        { kind: "p", text: "Our live reference build ships **188 pages**: every service crossed with every city, every fixture, every emergency, every cost question a homeowner types at 2 AM with water on the floor. The generic plumber site ships about ten pages and calls it done. Ten pages cannot answer a thousand questions, so ten pages rank for almost nothing." },
        { kind: "p", text: "The reason is mechanical, not aesthetic. Google ranks pages, not businesses." },
        { kind: "p", text: "A page that answers \"how much does it cost to replace a 50-gallon water heater in [city]\" beats a page that says \"we do water heaters.\" The brochure site has one of those pages. The authority site has hundreds, each one a separate entry point, each one earning its own traffic." },
        { kind: "p", text: "More entry points means more demand captured. That is the entire game." },
        {
          kind: "comparison",
          leftLabel: "Brochure plumber",
          rightLabel: "Authority system",
          rows: [
            { label: "Total pages", brochure: "~10", system: "188", flag: "MEASURED" },
            { label: "Service x city pages", brochure: "0", system: "Full matrix", flag: "MEASURED" },
            { label: "Cost / calculator pages", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Dedicated emergency guide", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "LocalBusiness schema", brochure: "No", system: "Yes", flag: "MODELED" },
          ],
        },
        {
          kind: "takeaway",
          text: "Pages are the asset. The brochure has one front door. The authority system has 188, and each one is open to a different searcher.",
        },
      ],
    },
    {
      id: "the-matrix",
      h2: "The service x location matrix is the engine",
      navLabel: "The matrix",
      blocks: [
        { kind: "p", text: "Plumbing demand is geographic. A homeowner searches \"drain cleaning [their town],\" not \"drain cleaning [the next county over].\" Proximity and intent collapse into one query." },
        { kind: "p", text: "The site that owns that exact query owns that job. The matrix is how you own thousands of them at once: list every service down one axis, every city you serve across the other, and build the page that lives at each intersection." },
        { kind: "chart", chart: "matrix" },
        { kind: "p", text: "Water heater repair x ten cities is ten pages. Repipe, drain cleaning, sewer line, leak detection, fixture install, gas line, sump pump, water softener: nine services across ten cities is ninety pages, and that is before the cost guides and emergency pages stack on top." },
        { kind: "p", text: "The brochure plumber writes one \"Services\" page and one \"Service Areas\" page and competes for zero of those intersections. The matrix is not busywork. It is the structural reason the authority site captures demand the brochure cannot see." },
        { kind: "p", text: "This only works when each cell is real. A page for a city you do not serve, or a page that swaps the city name into boilerplate, is a doorway page, and Google penalizes it." },
        { kind: "p", text: "The matrix is a coverage map of work you actually do. Read the [anti-doorway rule](#anti-doorway) at the bottom of this guide before you build a single cell." },
        {
          kind: "takeaway",
          text: "The matrix turns one service area into hundreds of ranked entry points. The brochure competes for the broad term and loses; the system competes for every specific term and wins the specific jobs.",
        },
      ],
    },
    {
      id: "cost-calculators",
      h2: "Cost pages and calculators capture the money queries",
      navLabel: "Cost & calculators",
      blocks: [
        {
          kind: "p",
          text: "The highest-intent plumbing searches are price searches. \"How much does a repipe cost.\" \"Water heater replacement cost.\" \"Tankless water heater installation price.\" A homeowner typing a cost query is past the research stage and into the buying stage. Answer the price honestly, with ranges and the variables that move them, and you are the page they trust before they ever call.",
        },
        {
          kind: "priceRange",
          title: "Plumbing cost ranges that earn the click",
          rows: [
            { label: "Water heater replacement (tank)", range: "$1,200 - $3,500", detail: "Varies by capacity, fuel type, and code-required upgrades." },
            { label: "Tankless water heater install", range: "$3,000 - $6,500", detail: "Gas line and venting work drive the high end." },
            { label: "Whole-home repipe", range: "$4,000 - $15,000", detail: "Square footage, pipe material (PEX vs copper), and access set the spread." },
            { label: "Sewer line replacement", range: "$3,000 - $25,000", detail: "Trenchless vs dig, run length, and depth are the big variables." },
            { label: "Drain cleaning / snaking", range: "$150 - $700", detail: "Hydro-jetting and main-line clogs cost more than a single fixture." },
          ],
          note: "Ranges are illustrative national spreads for orientation, not a quote. Every authority page anchors local numbers and explains what moves them.",
        },
        { kind: "p", text: "A water heater cost calculator does what a static price list cannot: it makes the homeowner type their tank size, fuel type, and zip, and it returns a number that feels like theirs. That interaction is the conversion event." },
        { kind: "p", text: "It also produces a page that ranks for \"water heater replacement cost calculator,\" a term the brochure plumber never even targets. The cost guide answers the question; the calculator closes it." },
        {
          kind: "takeaway",
          text: "Price queries are buying queries. The site that answers \"how much\" in public, with honest ranges and a calculator, wins the call. The site that says \"contact us for a quote\" gets skipped.",
        },
      ],
    },
    {
      id: "decision-guides",
      h2: "Decision guides own the considered-purchase research",
      navLabel: "Decision guides",
      blocks: [
        { kind: "p", text: "Before a homeowner buys, they decide. Tankless or tank." },
        { kind: "p", text: "Repipe or repair. PEX or copper." },
        { kind: "p", text: "These are not quick searches, they are research sessions, and the plumber who authors the comparison is the plumber who frames the decision in their favor. The brochure site has no opinion on tankless vs tank because it has no page on it. The authority site has the definitive page, and definitive pages get cited and shared." },
        {
          kind: "definition",
          term: "Tankless vs tank water heater",
          def: "A tank heater stores and reheats 40-80 gallons continuously; a tankless unit heats water on demand. Tankless costs more upfront and often needs gas line and venting upgrades, but it delivers endless hot water and lasts roughly twice as long. Tank wins on install cost and simplicity; tankless wins on lifespan and operating cost. The right answer depends on household size, fuel, and how long the homeowner plans to stay.",
        },
        { kind: "p", text: "Why does the decision guide rank for years and not months? Because authority is accumulated time." },
        { kind: "p", text: "Across the top ten results, **72.9% are three or more years old, and the average number-one page is five years old** (MEASURED). The plumber who publishes the tankless-vs-tank guide today and leaves it to age is building a position a brochure relaunch cannot leapfrog. The page does not just rank; it compounds." },
        { kind: "chart", chart: "page-age" },
        { kind: "p", text: "Pair the decision guide with a fixtures glossary, the plain-English dictionary of P-traps, shutoff valves, pressure-reducing valves, and anode rods, and you cover the long tail of \"what is a [part]\" searches. **95% of queries get ten or fewer searches a month** (MEASURED), so no single glossary term is a jackpot." },
        { kind: "p", text: "But there are hundreds of them, the brochure has zero, and **96.55% of all web pages get zero Google traffic** (MEASURED) precisely because they never bothered to answer the small questions. The glossary is how you escape the zero." },
        {
          kind: "takeaway",
          text: "Comparison guides and the fixtures glossary own the research phase. They age into authority, they capture the long tail, and they make you the source the homeowner already trusts when the emergency hits.",
        },
      ],
    },
    {
      id: "emergency",
      h2: "The emergency and burst-pipe guide catches the 2 AM call",
      navLabel: "Emergency guide",
      blocks: [
        { kind: "p", text: "Plumbing has a panic channel no other trade has at this volume. A pipe bursts, the basement floods, and the homeowner searches \"how to stop a burst pipe\" before they search for a plumber." },
        { kind: "p", text: "The page that tells them where the main shutoff is, in clear steps, while their hands are wet, is the page whose phone number they call thirty seconds later. The emergency guide is a lifeline first and a lead magnet second, and that order is why it converts." },
        {
          kind: "list",
          ordered: true,
          items: [
            "Shut off the main water valve immediately. The guide shows where it is for slab, basement, and crawlspace homes.",
            "Open the lowest faucet to drain the line and relieve pressure.",
            "Kill the power to any flooded area before touching standing water.",
            "Document the damage with photos before cleanup, for the insurance claim.",
            "Call a 24/7 plumber. The page makes the number the obvious next tap.",
          ],
        },
        { kind: "p", text: "Emergency pages also dictate the hero. On an urgent surface the primary action is the call, not the estimate quiz." },
        { kind: "p", text: "A homeowner with water rising does not fill out a multi-step form, they tap to dial. Lead the burst-pipe page with a call button and demote the quiz; match the action to the intent." },
        { kind: "p", text: "Frame insurance honestly and within NC compliance: document the damage, work with the adjuster. Never promise a covered claim, never promise a waived deductible, never act as a public adjuster." },
        { kind: "p", text: "The pack catches some of this. The map pack is proximity-capped at roughly five miles, so early on it yields **one to two jobs a month** (MODELED, the shape not the count), maturing toward more only near a two-year ceiling." },
        { kind: "p", text: "Ads catch the rest of the emergency, buying day-one speed for searches you do not yet rank for. But the emergency guide is what makes the call free once you own the term. Authority organic wins the considered research, the pack catches the proximity, the ads catch the overflow emergency, and the burst-pipe guide ties them together." },
        {
          kind: "takeaway",
          text: "The burst-pipe guide saves the homeowner first and earns the call second. Lead it with the phone, not the form, because the intent is urgent and the form is friction.",
        },
      ],
    },
    {
      id: "anti-doorway",
      h2: "Why every page maps to real work you actually do",
      navLabel: "Anti-doorway rule",
      blocks: [
        { kind: "p", text: "The matrix tempts a shortcut: generate a page for every city in the state, swap the name in, and call it coverage. That is a doorway page, and Google built specific systems to detect and demote it." },
        { kind: "p", text: "The test is simple: delete the city name from the page. If nothing else is specific, if there is no local permit note, no real job photo, no named neighborhood, no actual crew that works there, the page is a doorway and it is a liability, not an asset." },
        { kind: "antiDoorway" },
        { kind: "p", text: "Authority is earned by being real, and being real is also the only thing that ranks now that AI reads the page. **AI Overviews have cut top-result clicks from roughly 34.5% to about 58%** across 2025 (MEASURED), and **88% of AI-cited URLs do not rank in the top ten** (MEASURED), which means AI extraction is its own surface with its own rules." },
        { kind: "p", text: "A cited page earns about **35% more organic clicks** (MEASURED). Generic boilerplate does not get cited. A page with a real repipe job in a real neighborhood, a real permit detail, a real before-and-after, gets cited, because it is the only page that actually knows something." },
        { kind: "p", text: "So the matrix is a coverage map of work, not a name-swap script. Build the cell when you have the job to put in it." },
        { kind: "p", text: "That discipline is what separates a 188-page system that compounds from a 188-page penalty that sinks. When you are ready to see where your current site sits against this standard, run the [free site audit](/audit), or read the [roofing](/guides/trades/roofing) and [HVAC](/guides/trades/hvac) guides to see the same engine applied to a neighboring trade." },
        {
          kind: "takeaway",
          text: "Promise the floor, project the ceiling, and never ship a page you could not defend by walking a homeowner through the job behind it. Real work makes pages rank, get cited, and survive.",
        },
      ],
    },
  ],
};
