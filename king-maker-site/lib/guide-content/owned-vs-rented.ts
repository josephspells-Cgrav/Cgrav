import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "owned-vs-rented",
      h2: "What's the difference between owned and rented traffic?",
      navLabel: "Owned vs. rented",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: ads are **rented** and organic rankings are **owned**. The day you stop paying for ads, your traffic stops with it. A page that ranks keeps working whether you spend a dollar or not." },
        { kind: "p", text: "An ad is a leased spot at the top of the page. You hold it exactly as long as your card is being charged." },
        { kind: "p", text: "The moment the budget runs out, the spot is gone and the next advertiser stands where you stood. Nothing you paid for stays behind. You rented attention by the click and handed it back on schedule." },
        { kind: "p", text: "An organic ranking is different. A page that earns its spot keeps earning it — while you sleep, while you spend nothing, while you're up on the next roof." },
        { kind: "definition", term: "Organic ranking", def: "A spot you earn in the normal (unpaid) search results. Once a page ranks, it keeps bringing in clicks at no per-click cost — an asset you own, not a bill you pay." },
        { kind: "takeaway", text: "Ads are rent: stop paying and the traffic stops the same day. Organic is equity: the page you ranked keeps working after the spending stops. One you pay for forever, one you own." },
      ],
    },
    {
      id: "asset-vs-expense",
      h2: "Why is organic an asset and paid just an expense?",
      navLabel: "Asset vs. expense",
      blocks: [
        { kind: "p", text: "Because of what's left over when the money stops. With ads, the answer is nothing. With organic, the answer is everything you built." },
        { kind: "p", text: "Ad spend is a cost line that resets to zero the instant you stop feeding it. There's no leftover, no equity, no asset on your books. You re-buy every lead at the going rate, every month, forever." },
        { kind: "p", text: "A ranking page is the opposite. The work that got it there doesn't evaporate when the month ends, because there is no monthly bill — the page just keeps producing." },
        { kind: "p", text: "And it compounds. Every page you rank makes the next one rank a little faster, because the trust you've already earned lifts whatever you publish next. Rent never does that — you pay the same rent next month no matter how long you've paid it." },
        { kind: "p", text: "We take that compounding apart in [the appreciating asset](/guides/the-appreciating-asset), where the cost per lead actually keeps falling over time." },
        { kind: "takeaway", label: "The short version", text: "Paid is an expense that resets to zero. Organic is an asset that compounds — each ranked page helps the next one rank faster. One drains, the other builds." },
      ],
    },
    {
      id: "buyer-trusts-organic",
      h2: "Which result does a serious buyer actually trust?",
      navLabel: "What buyers trust",
      blocks: [
        { kind: "p", text: "The organic one — especially the buyer spending real money and taking their time. The considered, high-ticket customer reads the unpaid results and treats the ad with a little more suspicion." },
        { kind: "p", text: "Most homeowners know an ad is an ad. They know the top spot was bought, not earned. For a quick, cheap decision that's fine — but for a roof, a kitchen, a new HVAC system, they slow down." },
        { kind: "p", text: "When they slow down, they reward what was earned. A business that ranks on the strength of its own pages reads as the established, trusted name. An ad reads as someone who paid to be seen." },
        { kind: "p", text: "This is why the big, considered jobs tend to come through organic. The buyer who researches for three weeks isn't clicking the first ad — they're reading, comparing, and trusting the result that earned its place." },
        { kind: "p", text: "That doesn't mean ads are useless. They win a different buyer and a different moment — we cover exactly when in [where ads still win](/guides/where-ads-still-win)." },
        { kind: "takeaway", label: "The honest version", text: "The high-ticket buyer who takes their time trusts the earned result over the bought one. Organic wins the considered job because it reads as established, not as paid-to-appear." },
      ],
    },
  ],
};
