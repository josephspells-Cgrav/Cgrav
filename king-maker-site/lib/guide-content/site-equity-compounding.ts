import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "position-is-equity",
      h2: "Site equity: why position compounds over time",
      navLabel: "Position is equity",
      speakable: true,
      blocks: [
        { kind: "p", text: "A page that has ranked for a while tends to keep ranking. That is not luck and it is not the design holding it up." },
        { kind: "p", text: "It is equity. The trust a page earned getting to the top becomes the reason it stays at the top, and the reason the next page climbs faster." },
        { kind: "definition", term: "Site equity", def: "The accumulated trust a site has earned — links, click history, and proven pages — that lifts everything it publishes next. Like equity in a house: value you build up over time and then own, not a thing you rent month to month." },
        { kind: "p", text: "This is why an old, weak site holds its spot even when a better one shows up. The weak site is not winning on its pages." },
        { kind: "p", text: "It is winning on the equity stacked behind those pages — years of signals a newcomer simply has not had time to build yet." },
        { kind: "p", text: "And it is why a thin brochure site never holds anything. Five pages put up once and left alone have no equity to compound. They hold whatever ranking they were handed and build nothing further." },
        { kind: "takeaway", text: "Position is **equity**, not a snapshot. A page that has ranked keeps ranking because the trust it earned defends it and lifts the next page. An old weak site holds its spot on banked equity. A thin site holds nothing because it has none." },
      ],
    },
    {
      id: "the-flywheel",
      h2: "How one ranked page lifts the next",
      navLabel: "The flywheel",
      blocks: [
        { kind: "p", text: "The mechanism is simple and it is real. Rankings are earned on trust, and trust is shared across the whole site, not locked to one page." },
        { kind: "p", text: "The first page you rank teaches Google that this site is a credible answer for this trade in this region. The second page inherits that credibility on day one, so it climbs in weeks instead of months." },
        { kind: "p", text: "The tenth page lands already half-trusted. Every win lowers the cost of the next win. That is the flywheel." },
        { kind: "p", text: "This compounding is exactly why position is so sticky once a site has it. An incumbent that ranked years of pages is not defending one position." },
        { kind: "p", text: "It is defending a flywheel that has been spinning for years — each old page lending trust to the others. That is a deep moat, and it is the honest reason new sites do not flip the top overnight." },
        { kind: "p", text: "The flip side is the opportunity. A thin site has no flywheel, so its few pages sit isolated, each fighting alone with nothing behind it." },
        { kind: "takeaway", text: "Trust is shared across a site, so the first ranked page makes the second climb faster and the tenth land half-trusted. An old site's stickiness is a flywheel spinning for years. A thin site has none — its pages fight alone." },
      ],
    },
    {
      id: "why-old-weak-holds",
      h2: "Why an old weak site holds while a better one waits",
      navLabel: "Why it holds",
      blocks: [
        { kind: "p", text: "Put the equity idea against the data and the stickiness stops being mysterious. The top of the results is old because position, once earned, is held for years." },
        { kind: "chart", chart: "page-age" },
        { kind: "p", text: "**72.9% of the pages in the top ten are three years old or older, and the average page at #1 is about five years old (MEASURED).** Rankings are not re-auctioned week to week." },
        { kind: "p", text: "They are held by the pages that earned them first. The equity those pages banked keeps defending the position long after the site stopped improving." },
        { kind: "p", text: "So a better new site can sit at #8 while a worse old one sits at #1, and nothing looks fair about it. It is not about fairness." },
        { kind: "p", text: "The old page has five years of equity defending it and the new page has five weeks. Google bets on the track record because the track record is the better guess at what satisfies the next searcher." },
        { kind: "p", text: "This is the same wall from the other side. The equity that makes an incumbent hard to dislodge is the exact equity you build, page by page, when you ship a real site instead of a brochure." },
        { kind: "takeaway", label: "The honest version", text: "An old weak site holds because position is held for years: **72.9% of top-ten pages are 3+ years old, the average #1 is five.** A better page can sit below it while its equity matures. That wall is real. It is why we promise the floor and project the ceiling, never a guaranteed rank." },
      ],
    },
    {
      id: "a-thin-site-has-none",
      h2: "A thin site has no equity to spend",
      navLabel: "A thin site has none",
      blocks: [
        { kind: "p", text: "Now flip it to the brochure. A brochure is a handful of pages, built once, describing the business, and then left alone." },
        { kind: "p", text: "It has no equity, and worse, it has no way to build any. Equity comes from publishing pages that earn trust over time, and a brochure stopped publishing the day it shipped." },
        { kind: "list", items: [
          "It has too few pages to answer the searches buyers actually type.",
          "Its pages do not lend trust to each other, because there is barely anything to lend.",
          "It is not adding new pages, so the flywheel never starts spinning.",
          "It coasts on whatever ranking it was handed and accumulates nothing more.",
        ] },
        { kind: "p", text: "That is why a brochure cannot hold a competitive position and cannot build one. It is a cost with no growing asset behind it — value you paid for once that sits flat while the work moves on without it." },
        { kind: "p", text: "An authority site is the opposite by design. Every page it ships is a fixed deposit of equity that keeps paying after you stop touching it, and the rankings it holds this year become the foundation the next page stands on." },
        { kind: "p", text: "That is the whole difference between a site that compounds and a site that decays. One builds equity it owns, the other rents a position it cannot keep." },
        { kind: "takeaway", text: "A brochure has no equity and no way to build it — too few pages, no flywheel, nothing compounding. An authority site banks equity with every page and spends it lifting the next. For why that makes the site an owned asset, read [Your site is an asset, not an expense](/guides/the-appreciating-asset), or run the [free audit](/audit)." },
      ],
    },
  ],
};
