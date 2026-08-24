import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-grandfathering-is",
      h2: "Grandfathering: why an old, weak site still ranks",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "People call it grandfathering: an old, ugly site sits at the top and a newer, better one cannot get past it. The word is fine. The usual explanation for it is wrong." },
        { kind: "p", text: "Grandfathering is not about the age of the website. It is about the ranking signals the site piled up while it sat there." },
        { kind: "p", text: "Those signals are real things: links pointing at the site, years of people clicking it and staying, pages that answered searches before yours existed. Time let them accumulate. The position is the receipt." },
        { kind: "definition", term: "Grandfathered ranking", def: "A search position a site keeps because of signals it built up over years — links, click history, and content — not because of how old the domain is by itself. The age is correlated. The signals are the actual cause." },
        { kind: "p", text: "Here is the part that matters to you. If the lead is signals, not age, then it can be taken." },
        { kind: "p", text: "An old site that stopped adding signals is a fixed target. A newer site that keeps building them can close the gap, because it is accumulating the same thing the incumbent stopped accumulating years ago." },
        { kind: "takeaway", text: "Grandfathering is not domain age. It is **accumulated ranking signals** — links, clicks, and content — banked over years. The old site is not protected because it is old. It is ahead because it built signals and you have not yet. That gap is closeable." },
      ],
    },
    {
      id: "not-domain-age",
      h2: "It is not domain age, and Google has said so",
      navLabel: "Not domain age",
      blocks: [
        { kind: "p", text: "The most common myth in local search is that an older domain wins because it is older. It does not, and the company that runs the algorithm has said this out loud, repeatedly." },
        { kind: "debunk", myth: "An older domain ranks higher just because it is older.", reality: "The date you registered the domain is not a ranking factor. What rides along with age is accumulated signals: links that aged into authority, a long history of people clicking and staying, and a content footprint that kept growing. Register a ten-year-old domain with no links and no pages and it ranks for nothing.", why: "Google has stated plainly that domain registration date is not used to rank pages. Old sites tend to win because time gave their links a chance to point at them and gave their pages a chance to prove they satisfy searchers. Age is the symptom of accumulation, not the cause of the ranking." },
        { kind: "p", text: "Think of two sites the same age. One spent ten years getting linked, clicked, and expanded. The other put up five pages and never touched them again." },
        { kind: "p", text: "Same domain age. Wildly different rankings. The age was never doing the work, the signals were." },
        { kind: "p", text: "This is why a brand-new site with no track record rarely jumps an established one on day one. The new site has the design and the better pages." },
        { kind: "p", text: "It does not yet have the proof. Google has watched the old page get clicked and linked for years and has watched the new page for a week, so it bets on the track record, because the track record is the better guess at what will satisfy the next searcher." },
        { kind: "takeaway", text: "Domain age is not a ranking factor, Google has said so directly. Two sites the same age can rank worlds apart. The difference is the signals one built and the other did not. Age is the **symptom** of accumulation, never the cause." },
      ],
    },
    {
      id: "the-data",
      h2: "What the data shows: the top is overwhelmingly old",
      navLabel: "What the data shows",
      blocks: [
        { kind: "p", text: "If grandfathering were random, the top of the results would be a mix of old and new pages. It is not even close to a mix." },
        { kind: "p", text: "The pages winning competitive searches are overwhelmingly old, and that is the measured fingerprint of accumulation, not a coincidence about age." },
        { kind: "chart", chart: "page-age" },
        { kind: "p", text: "**72.9% of the pages in the top ten are three years old or older, and the average page sitting at #1 is about five years old (MEASURED).** Read that as a clock, not a verdict." },
        { kind: "p", text: "The pages at the top did not buy their way there. They spent years getting clicked, linked, and refined, and the ranking is what those years added up to." },
        { kind: "p", text: "A page you publish this month is not competing against a better site. It is competing against five years of accumulated signals, which is a harder and slower thing, and pretending otherwise is how contractors get sold a 90-day miracle." },
        { kind: "takeaway", label: "The honest version", text: "The top of the results is old because ranking is accumulated time. **72.9% of top-ten pages are 3+ years old; the average #1 is five.** That is the wall a new page climbs. It is real, it is slow, and it is the reason we promise the floor and project the ceiling, never a guaranteed rank." },
      ],
    },
    {
      id: "why-a-redesign-doesnt-beat-it",
      h2: "Why a redesign alone does not beat it",
      navLabel: "Redesign won't do it",
      blocks: [
        { kind: "p", text: "Here is the trap most contractors fall into. They see the ugly site outranking them, conclude the problem is looks, and pay for a redesign." },
        { kind: "p", text: "The new site is faster and prettier. The ranking does not move. They are confused, because they fixed the thing they could see and the thing they could not see never changed." },
        { kind: "p", text: "A redesign changes the design. Grandfathering is about signals, and a redesign adds zero new signals." },
        { kind: "list", items: [
          "It does not add links pointing at the site.",
          "It does not add years of click history.",
          "It does not add pages answering searches you do not currently answer.",
          "Done carelessly, it can even lose signals. If URLs change and old pages break, the equity built up on those pages drops.",
        ] },
        { kind: "p", text: "So a redesign on its own is a paint job on a parked car. Nicer to look at, no faster, going nowhere new." },
        { kind: "p", text: "What actually moves the needle is building the signals the incumbent stopped building. Publish a real page for every service you sell and every town you serve, answer the questions buyers type, and let each page start banking its own clock." },
        { kind: "p", text: "That is how a newer site overtakes an old static one: not by looking better, but by **accumulating** while the incumbent coasts. We walk the full mechanics in [How you overtake a static competitor](/guides/how-you-overtake)." },
        { kind: "takeaway", text: "A redesign fixes looks. Grandfathering is signals. The two barely touch, which is why a prettier site can rank exactly where the ugly one did. You beat an old static site by **out-accumulating** it, not out-designing it. Run the [free audit](/audit) and see which signals your site is missing." },
      ],
    },
  ],
};
