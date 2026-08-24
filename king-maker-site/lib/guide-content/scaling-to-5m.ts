import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-ceiling",
      h2: "How do you scale a contractor business past $1-2M?",
      navLabel: "The ceiling",
      speakable: true,
      blocks: [
        { kind: "p", text: "Most contractors hit a ceiling around **$1-2M** and can't figure out why. The answer is usually geography: they're fighting for too small a map." },
        { kind: "p", text: "The map pack — the three businesses pinned on the map at the top of a local search — caps you at a few miles. It rewards proximity, so it can only reach the customers nearest your office." },
        { kind: "p", text: "That's a fine engine for a small, local shop. It's a hard ceiling for a business trying to grow, because there are only so many high-value jobs inside a five-mile circle." },
        { kind: "p", text: "Breaking the ceiling means breaking out of that circle. The way you do that is by owning your **region's** organic demand, not just your neighborhood's pins." },
        { kind: "definition", term: "The map pack", def: "The three local businesses shown on a map at the top of a search. It ranks mostly on how close you are to the searcher, so its reach is capped to roughly a few miles around your location." },
        { kind: "takeaway", text: "The map pack caps you at a few miles, that's the **$1-2M** ceiling. Growth past it doesn't come from winning more pins, it comes from owning the organic search across your whole region. Different engine, much bigger map." },
      ],
    },
    {
      id: "own-the-region",
      h2: "Owning the region's organic demand",
      navLabel: "Own the region",
      blocks: [
        { kind: "p", text: "Organic search has no five-mile cap. A page can rank for **\"your service in any town\"** whether that town is next door or an hour away." },
        { kind: "p", text: "That's the unlock. Build a real page for every service you sell and every town you serve across your region, and you can rank for buyers the map pack will never show you." },
        { kind: "p", text: "Each of those pages is a new search you can capture, a new town you can book, and a new lane of demand the proximity engine simply can't reach." },
        {
          kind: "list",
          items: [
            "The **map pack** reaches the customers closest to your office",
            "**Regional organic** reaches every town you'll actually drive to",
            "A deep site builds a rankable page for each of those towns",
            "More towns ranked = more demand than one circle can hold",
          ],
        },
        { kind: "p", text: "This is how a contractor stops competing for the same small pool of nearby jobs and starts pulling work from a whole metro." },
        { kind: "p", text: "We lay out the page structure that makes this possible in [What an enterprise website actually is](/guides/the-enterprise)." },
        { kind: "takeaway", text: "Owning the region means a rankable page for **every service you sell and every town you serve.** Organic has no proximity cap, so it reaches the whole metro the map pack can't. That's the demand a $5M business runs on." },
      ],
    },
    {
      id: "the-math",
      h2: "Why the math works at scale",
      navLabel: "The math",
      blocks: [
        { kind: "p", text: "One term tells the story. A money term like \"your service in your city\" pulls roughly **2,000 searches a month** in a mid-size market (illustrative)." },
        { kind: "p", text: "An average site captures about **6%** of that, around 120 visits. A deep system captures about **30%**, around 600 visits — five times the traffic from one term." },
        { kind: "p", text: "Now multiply that by every town in your region. One term becomes dozens; dozens of small streams of demand add up to a flood the map pack could never deliver." },
        { kind: "p", text: "And the leads cost less as it matures. Mature organic runs about **$30 per lead** against about **$228** for pay-per-click ads (measured), so growing on organic doesn't mean growing your ad bill at the same pace." },
        { kind: "p", text: "That combination — many towns, cheap leads at scale — is the engine behind the move from $1-2M toward $5M+." },
        { kind: "p", text: "The funnel behind these numbers is broken down step by step in [From traffic to revenue](/guides/traffic-to-revenue)." },
        { kind: "takeaway", label: "The honest version", text: "One term, ~5× the capture (illustrative); multiply by every town. Mature leads at ~$30 vs ~$228 for paid (measured) means volume without a runaway ad bill. The capture multiple is **illustrative** — the shape, not a quote for your market." },
      ],
    },
    {
      id: "honest-timeline",
      h2: "The honest timeline, and what we won't promise",
      navLabel: "Honest timeline",
      blocks: [
        { kind: "p", text: "Owning a region is not a 90-day play. It's a build that pays off over years, and we'd rather tell you that now than oversell it." },
        { kind: "p", text: "Year 1 is foundation — publishing the pages and earning the first rankings. The leads trickle while the asset is young." },
        { kind: "p", text: "By years 2 and 3 the pages mature, new ones rank faster, and the regional demand starts arriving in volume. That's when the ceiling actually moves." },
        { kind: "p", text: "We will not promise you $5M, a #1 ranking, or a date. No honest operator can, and the exact slope depends on your market, your competition, and how hard you build." },
        { kind: "p", text: "What we will promise is the **mechanism**: a map pack that caps you, an organic channel that doesn't, and a deep site that lets you own the second one. We flag every projection as a projection." },
        { kind: "p", text: "The compounding behind that timeline is laid out in [The compounding revenue curve](/guides/compounding-revenue-curve)." },
        { kind: "takeaway", label: "The honest version", text: "This is a multi-year build: year 1 foundation, years 2-3 the ceiling moves. We won't promise $5M, a ranking, or a date. We promise the mechanism — organic has no proximity cap and a deep site lets you own it. Promise the floor, project the ceiling. Then [run the audit](/audit)." },
      ],
    },
  ],
};
