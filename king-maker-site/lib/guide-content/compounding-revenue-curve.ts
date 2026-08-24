import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "why-it-compounds",
      h2: "Why does website revenue compound over time?",
      navLabel: "Why it compounds",
      speakable: true,
      blocks: [
        { kind: "p", text: "Organic rankings compound, so the revenue they produce compounds with them. That's the whole idea on this page." },
        { kind: "p", text: "Here's the mechanism. Every page you rank teaches Google that your site is a credible answer for your trade in your region." },
        { kind: "p", text: "The next page you publish inherits that credibility, so it ranks faster than the last one. Faster rankings mean more traffic sooner, more leads sooner, more revenue sooner." },
        { kind: "p", text: "Then that page adds its own credibility to the pile, and the page after it climbs faster still. The returns stack on top of each other instead of resetting." },
        { kind: "definition", term: "Compounding", def: "Growth that builds on prior growth. Each ranked page makes the next one rank faster, so traffic and revenue accelerate rather than adding up in a straight line." },
        { kind: "takeaway", text: "Rankings compound because trust is shared across your whole site. Each page makes the next one rank faster, so revenue **accelerates**, it doesn't just add up. That's the engine that makes year 3 look nothing like year 1." },
      ],
    },
    {
      id: "year-three",
      h2: "Why year 3 dwarfs year 1",
      navLabel: "Year 3 vs. year 1",
      blocks: [
        { kind: "p", text: "Year 1 is the slow part, and it's supposed to be. You're publishing pages, earning the first rankings, and waiting for them to mature." },
        { kind: "p", text: "The leads trickle before they flow. This is the stretch most contractors quit in, because the curve looks flat from inside it." },
        { kind: "p", text: "By year 2, the early pages have matured and the new ones rank faster, standing on the trust the first batch earned. The line bends upward." },
        { kind: "p", text: "By year 3, the whole library is mature, every new page ranks quickly, and the revenue from all of them lands at once. That's why year 3 dwarfs year 1." },
        { kind: "chart", chart: "compounding" },
        { kind: "p", text: "The shape above is **illustrative** — it shows the curve, not a forecast for your market. But the direction is the lesson: paid goes flat, organic keeps climbing." },
        { kind: "p", text: "Same effort each year. Wildly different output, because year 3 is harvesting everything the first two years planted." },
        { kind: "takeaway", label: "The honest version", text: "Year 1 is slow on purpose, that's where most quit. Year 2 bends up, year 3 compounds hard. The curve shape is **illustrative**, not a forecast, and the timeline is real: this rewards patience, not impatience. Promise the floor, project the ceiling." },
      ],
    },
    {
      id: "after-spend-flattens",
      h2: "The curve keeps climbing after spend flattens",
      navLabel: "After spend flattens",
      blocks: [
        { kind: "p", text: "Here's the part that separates an asset from an expense. The organic curve keeps climbing even after you stop adding to it." },
        { kind: "p", text: "Stop running ads and the traffic stops that day. Stop adding pages to a mature site and the rankings you already hold keep working." },
        { kind: "p", text: "The pages already ranked stay ranked, keep pulling traffic, and keep producing leads — without a new invoice each month." },
        { kind: "p", text: "Rankings are durable. The pages that earn the top spots tend to hold them for years, so the revenue they produce keeps arriving long after the work that built them is done." },
        {
          kind: "comparison",
          leftLabel: "Paid traffic",
          rightLabel: "Organic asset",
          rows: [
            { label: "When you stop spending", brochure: "Traffic stops that day", system: "Rankings keep working", flag: "ILLUSTRATIVE" },
            { label: "Revenue after spend flattens", brochure: "Drops to zero", system: "Keeps arriving", flag: "ILLUSTRATIVE" },
            { label: "Shape of the curve", brochure: "Flat rent", system: "Compounds, then holds", flag: "ILLUSTRATIVE" },
          ],
        },
        { kind: "p", text: "That's the difference between renting attention and owning a channel. One resets to zero the month you stop paying; the other keeps appreciating." },
        { kind: "p", text: "We go deeper on the rent-versus-equity frame in [Site equity and compounding](/guides/the-appreciating-asset)." },
        { kind: "takeaway", text: "Paid stops the day the spending does. A mature organic asset keeps climbing after you stop adding to it, because ranked pages hold their spots for years. You build the curve once and it keeps paying. That's equity, not rent." },
      ],
    },
    {
      id: "what-this-means",
      h2: "What the compounding curve means for you",
      navLabel: "What this means",
      blocks: [
        { kind: "p", text: "If you judge the site by month three, you'll judge it wrong. Compounding is invisible early and undeniable later." },
        { kind: "p", text: "The contractor who quits in year 1 never sees the curve bend. The one who keeps publishing owns a channel that gets cheaper and bigger every year it runs." },
        { kind: "p", text: "This is also why we won't promise a number or a date. The mechanism is real, but the exact slope depends on your market, your competition, and how much you feed it." },
        { kind: "p", text: "What we will promise is the **shape**: a curve that starts slow, bends up as pages mature, and keeps climbing after the spend flattens. We flag every projection as exactly that." },
        { kind: "takeaway", label: "The honest version", text: "Compounding is slow to start and impossible to ignore once it's running. We won't promise a number or a date, no honest operator can. We promise the floor and project the ceiling: a curve that compounds and keeps paying. Then [run the audit](/audit) and check the claim." },
      ],
    },
  ],
};
