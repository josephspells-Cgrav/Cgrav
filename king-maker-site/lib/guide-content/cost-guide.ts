import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-a-cost-guide-does",
      h2: "What is a cost guide, and how does it pre-qualify your buyers?",
      navLabel: "What it does",
      speakable: true,
      blocks: [
        { kind: "p", text: "A cost guide is a page on your own website that shows honest price ranges for the work you do, and explains what moves them up or down. It is the answer to the first question every buyer has." },
        { kind: "p", text: "It pre-qualifies your buyers by sorting them before they ever call. The person whose budget fits sees your range, recognizes themselves in it, and reaches out warmer and more serious." },
        { kind: "p", text: "The person who cannot afford the work finds that out quietly, on the page, instead of taking up a sales appointment to learn it. So the leads that come through are warmer, and the wrong-fit buyers screen themselves out without you lifting a finger." },
        { kind: "takeaway", text: "A cost guide answers the price question up front. It draws in the buyer whose budget fits and lets the wrong-fit buyer screen themselves out, so the leads you get are warmer." },
      ],
    },
    {
      id: "why-showing-price-builds-trust",
      h2: "Why does showing the price build trust instead of scaring buyers off?",
      navLabel: "Why it builds trust",
      blocks: [
        { kind: "p", text: "Because the buyer who cannot find a price does not assume you are worth it. They assume you are expensive and hiding it, and they go read the company that told them straight." },
        { kind: "p", text: "Hiding the number does not protect you. It just sends the buyer somewhere more open, and they take their trust with them." },
        { kind: "p", text: "Showing honest ranges signals the opposite. It says you are confident, you have nothing to hide, and you respect the buyer enough to start with the truth." },
        { kind: "p", text: "That respect is what earns the call. A buyer who already knows roughly what the work costs arrives ready to talk, not braced for a sales pitch about a number you would not show them." },
        { kind: "p", text: "And the buyer who reads your honest range and decides it is out of reach was never going to become a paying job anyway. Letting them go on the page, instead of in a wasted appointment, is a feature, not a loss." },
      ],
    },
    {
      id: "ranges-not-a-single-number",
      h2: "How do you show price honestly without quoting a job you have not seen?",
      navLabel: "Ranges, not one number",
      blocks: [
        { kind: "p", text: "You publish ranges, not a single figure, and you name the things that move them. A real estimate depends on the specific job, so you do not pretend to quote it from a web page." },
        { kind: "p", text: "Take roofing as an example. The price depends on roof size and pitch, how many old layers have to come off, the condition of the decking underneath, access, and the material the homeowner picks." },
        { kind: "p", text: "So you show honest bands for each material and let the buyer place their own project inside them. The buyer orients themselves, sees roughly where they land, and arrives at the call already in the right neighborhood." },
        {
          kind: "priceRange",
          title: "Roof replacement, typical ranges",
          rows: [
            { label: "3-tab asphalt shingle", range: "$8,000–$16,000", detail: "the entry option; shortest lifespan, lowest material cost" },
            { label: "Architectural / dimensional shingle", range: "$12,000–$25,000", detail: "the common upgrade; thicker, longer warranty, better curb appeal" },
            { label: "Standing-seam metal", range: "$25,000–$55,000", detail: "the long-life option; highest upfront cost, decades of service" },
            { label: "Synthetic / premium (slate, tile look)", range: "$30,000–$70,000+", detail: "high-end aesthetics and longevity; varies widely by product" },
          ],
          note: "ILLUSTRATIVE ranges for a typical single-family home. Every real number depends on size, pitch, tear-off, decking condition, and access, so the figure on your house is set by an on-site estimate, not by a chart. Use these to orient, not to quote.",
        },
        { kind: "p", text: "Notice what the ranges do. They let the buyer self-select honestly, and they prove you know your trade well enough to break the price down instead of waving it away." },
      ],
    },
    {
      id: "keep-the-money-language-compliant",
      h2: "What rule keeps a cost guide compliant?",
      navLabel: "Keep it compliant",
      blocks: [
        { kind: "p", text: "One discipline runs underneath all of it: keep the money language honest and compliant. State material and labor ranges, never insurance outcomes." },
        { kind: "p", text: "Do not promise a covered claim, do not promise a waived or zero deductible, and do not position yourself as the buyer's adjuster. In a regulated trade that line is not optional." },
        { kind: "p", text: "The cost guide builds trust by being straight about what things cost. It does not build trust by making a promise about a claim it cannot keep." },
        { kind: "p", text: "Get that right and the guide does double duty. It pre-qualifies your buyers and it earns the AI surface, because a page that states real prices plainly is exactly what an assistant quotes when a buyer asks what the work costs." },
        { kind: "p", text: "Pair the guide with an [instant estimate tool](/guides/instant-estimate-tool) so the buyer can place their own job in seconds, then let them act on that trust with [online booking](/guides/online-booking). Or [run the audit](/audit) to see whether your own site answers the price question." },
      ],
    },
  ],
};
