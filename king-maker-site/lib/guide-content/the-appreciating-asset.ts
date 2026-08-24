import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "appreciating-asset",
      h2: "Why does SEO get more valuable every year?",
      navLabel: "The appreciating asset",
      speakable: true,
      blocks: [
        { kind: "p", text: "Because it compounds. Ongoing SEO is the rare marketing spend that's worth **more** in year three than in year one — the opposite of an ad, which costs the same forever and stops the day you stop paying." },
        { kind: "p", text: "Here's the simple reason. Every page you rank earns trust, and that trust lifts the next page you publish, so each new page ranks a little faster than the last." },
        { kind: "p", text: "By year two you're not starting from zero — you're building on top of an established site. By year three, new pages can rank in weeks instead of months, because the foundation is already trusted." },
        { kind: "p", text: "An ad never does this. Year three of ad spend looks exactly like year one: same auction, same price per click, nothing accrued. You're renting the same spot at the same rent, indefinitely." },
        { kind: "takeaway", text: "SEO is an appreciating asset: each ranked page lifts the next, so the site is worth more every year. Ads are flat rent — year three costs the same as year one, with nothing built up." },
      ],
    },
    {
      id: "year-over-year",
      h2: "What does that compounding look like over year 1, 2, and 3?",
      navLabel: "Year 1, 2, 3",
      blocks: [
        { kind: "p", text: "It builds in stages. The first year is the slow part — and it's where most people quit too early." },
        {
          kind: "list",
          items: [
            "**Year 1 — laying foundation.** New pages climb slowly. You're earning your first rankings and the trust under them. This is the patient year, and ads carry the load while it happens.",
            "**Year 2 — momentum.** The early pages now rank and pull traffic. New pages ride that trust and rank faster. Leads grow without your spend growing.",
            "**Year 3 — compounding.** The site is an established authority. New pages can rank in weeks. Your cost to add the next lead keeps dropping while the traffic keeps climbing.",
          ],
        },
        { kind: "p", text: "The shape below tells the whole story. Paid runs flat — a straight line at whatever you agreed to pay." },
        { kind: "chart", chart: "compounding" },
        { kind: "p", text: "Organic starts behind, then climbs and keeps climbing, because the asset compounds. The two lines cross around month twelve, and after that the gap is money you keep instead of handing to the ad auction every month." },
        { kind: "takeaway", label: "The shape", text: "Year 1 is patient foundation. Year 2 builds momentum. Year 3 compounds — new pages rank in weeks. Paid stays a flat line the whole time." },
      ],
    },
    {
      id: "cost-per-lead-falls",
      h2: "How far does the cost per lead actually fall?",
      navLabel: "Cost per lead",
      blocks: [
        { kind: "p", text: "Far enough to change the math entirely. Once your pages are ranking, organic becomes the cheapest lead you'll ever get — because the next click costs you almost nothing." },
        { kind: "p", text: "Paid never gets cheaper. You re-buy every single lead at the auction price, and that price only climbs as more competitors bid against you. Here's the contrast once each channel is mature:" },
        {
          kind: "priceRange",
          title: "Cost per lead by channel, once mature",
          rows: [
            { label: "Pay-per-click (Google Ads)", range: "~$228", detail: "re-bought at auction every lead; the price rises as competition does ($100–500 range)" },
            { label: "Local Services Ads", range: "~$162", detail: "pay-per-lead, capped reach, resets to zero the moment you pause ($75–150+ range)" },
            { label: "Organic search (mature)", range: "~$30", detail: "the cost of one more lead once the pages rank; you stop re-buying the click ($10–50 range)" },
          ],
          note: "Mature cost-per-lead ranges, MEASURED. Organic's effective cost per lead crosses below paid around month 5–6 (ILLUSTRATIVE timing): paid wins the early months while your pages climb, then the lines cross and never re-cross.",
        },
        { kind: "p", text: "Read the timing honestly. Paid wins the opening months — leads the same afternoon, while your pages are young and ranking for little." },
        { kind: "p", text: "Then it turns. Around month five or six, organic's effective cost per lead drops below paid and keeps falling toward that near-zero floor, while paid holds flat at the auction price for as long as you run it." },
        { kind: "p", text: "That's the appreciating asset in one number: a lead that cost you real money on day one costs a fraction of that by year three — and the gap is yours to keep." },
        { kind: "p", text: "This is also why most operators run both: ads for the early speed, organic for the long-run cost. The full case is in [where ads still win](/guides/where-ads-still-win)." },
        { kind: "takeaway", label: "The honest version", text: "Mature organic runs ~$30 a lead against ~$162 for Local Services Ads and ~$228 for pay-per-click. Paid wins the first few months; organic crosses below around month 5–6 and keeps falling. Run both, build the asset." },
      ],
    },
  ],
};
