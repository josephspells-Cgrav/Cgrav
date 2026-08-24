import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-tiebreaker",
      h2: "Is your website part of your map-pack ranking?",
      navLabel: "The tiebreaker",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: yes. Your website is not separate from the map pack — it is what **breaks the tie** when everything else is even." },
        { kind: "p", text: "Picture three roofers competing for the same map pack. They are all the same distance from the searcher, they all have the right category, and they all sit around 4.8 stars with a similar pile of reviews. Google still has to rank them one, two, three. What does it use?" },
        { kind: "p", text: "It looks at the website behind each profile. The one with the deeper, more relevant site — a real page for that exact service in that exact town — is the one Google trusts as the better answer. That site wins the tie." },
        { kind: "p", text: "This is why two contractors with near-identical profiles end up ranked differently. The profiles were a wash. The websites were not." },
        { kind: "takeaway", text: "When Google Business Profiles and reviews are roughly equal, Google falls back to the **website** to decide the order. The deeper, more relevant site wins. The site is the tiebreaker — not a separate channel from the map." },
      ],
    },
    {
      id: "how-the-site-feeds-the-pack",
      h2: "How the website feeds your profile's ranking",
      navLabel: "How it feeds the pack",
      blocks: [
        { kind: "p", text: "Remember the three levers that rank the pack: relevance, distance, and prominence. Your website pours straight into two of them." },
        {
          kind: "list",
          items: [
            "**Relevance** — Google reads the site linked to your profile to confirm what you do and where. A site with a real page for \"metal roofing in Huntersville\" tells Google your profile is the relevant answer for that search. A thin brochure tells it almost nothing.",
            "**Prominence** — this is the trust lever, and it is built largely off the profile. The depth of your site, the questions it answers, and the links pointing at it all feed the prominence Google reads when it ranks your listing.",
          ],
        },
        { kind: "p", text: "So the website is doing double duty. It is the thing buyers click through to, and it is also a ranking signal Google reads to decide where your map listing sits." },
        { kind: "p", text: "The profile alone can only say so much: name, category, hours, reviews. The site is where the **depth** lives, and depth is what separates two otherwise-equal businesses." },
        { kind: "definition", term: "Prominence", def: "Google's measure of how well-known and trusted a business is. It pulls from reviews, the business's presence across the web, and the website behind the profile. Of the three ranking levers, it is the one your website most directly feeds." },
      ],
    },
    {
      id: "dont-undersell-the-site",
      h2: "Why the site is the lever, not a sidekick",
      navLabel: "The site is the lever",
      blocks: [
        { kind: "p", text: "A lot of advice tells contractors the website is a small slice of local ranking, so put your money into off-page work instead. That gets it backwards for the part you can actually control." },
        { kind: "p", text: "Here is the real shape. Distance you cannot change. Reviews you and your competitors all chase, so they tend to even out near the top. What is left to break the tie is the website — and almost nobody builds a deep one." },
        {
          kind: "comparison",
          leftLabel: "Brochure site",
          rightLabel: "Deep system",
          rows: [
            { label: "Pages Google can rank", brochure: "10", system: "147", flag: "MEASURED" },
            { label: "Page for the exact service + town", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "LocalBusiness schema Google reads", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Tells Google what you do, and where", brochure: "Barely", system: "Clearly", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "The brochure gives Google one business card. The system gives it a real, specific answer for hundreds of searches. When two profiles are even, that is the difference between second and first." },
        { kind: "p", text: "And the website does something the profile never can: it reaches past the map pack entirely, into the organic results across your whole region. The map is capped to a few miles; the site is not. We cover that limit in [the limitations of the map pack](/guides/map-pack-limitations)." },
        { kind: "takeaway", label: "The honest version", text: "We will not tell you a deep site guarantees the top of the pack — distance and reviews are real, and no one honest promises a #1. We will tell you that when those even out, the **website is the only tiebreaker left**, almost nobody builds a deep one, and that is the most controllable edge in local ranking. Build the site; do not put it last." },
      ],
    },
  ],
};
