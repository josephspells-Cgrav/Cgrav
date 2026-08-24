import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "head-start-stopped-running",
      h2: "How you overtake a static competitor",
      navLabel: "The setup",
      speakable: true,
      blocks: [
        { kind: "p", text: "The incumbent has a head start. The incumbent also stopped running." },
        { kind: "p", text: "Both things are true, and the second one is the opening. A site that got to the top years ago and then sat still is a fixed target, not a moving one." },
        { kind: "p", text: "You do not overtake it by looking better. You overtake it by compounding while it coasts." },
        { kind: "p", text: "A static competitor is a handful of pages, published once and left alone, aging in place, answering the same few searches they answered the day they shipped. Their trust is not growing. It is living off what it banked years ago." },
        { kind: "p", text: "A site built as a system does the one thing they stopped doing: it keeps publishing. Every new page that earns a ranking lends trust to the next one, so the next ranks a little faster, and the gap closes." },
        { kind: "takeaway", text: "The incumbent has a head start **and** stopped running. You do not pass a frozen site by out-designing it, you pass it by **out-publishing** it. A moving curve overtakes a frozen lead on a long enough clock. That is the whole play." },
      ],
    },
    {
      id: "compounding-beats-frozen",
      h2: "Why a compounding site passes a frozen one",
      navLabel: "Compounding wins",
      blocks: [
        { kind: "p", text: "Picture two lines on a chart. One is the incumbent: high, flat, frozen where it stopped." },
        { kind: "p", text: "The other is you: lower at the start, but climbing, because every ranked page makes the next one easier. Give it enough time and the climbing line crosses the flat one. That is not an opinion. It is the shape of compounding." },
        { kind: "chart", chart: "compounding" },
        { kind: "p", text: "The incumbent cannot answer this, because the thing that would let them, more pages earning more trust, is the thing they stopped doing. They have nothing left to compound." },
        { kind: "p", text: "You, meanwhile, are accumulating the same signals they accumulated to get there — links, clicks, content — except you are the only one still adding to the pile." },
        { kind: "p", text: "The math is on your side because of where the demand actually lives. **95% of search queries get ten or fewer searches a month (MEASURED)**, and a frozen handful of pages cannot possibly cover that long tail." },
        { kind: "p", text: "Each of those searches is small. There are thousands of them, and they are almost entirely uncontested because everyone is still fighting over the same few fat head terms." },
        { kind: "p", text: "So you do not have to dislodge the incumbent from their five-year-old #1 page on day one. You out-publish them across the thousand searches they never built a page for, banking position the same way they did, just faster, because you are the only one still running." },
        { kind: "takeaway", text: "Compounding beats frozen because a frozen site has nothing left to add and the demand lives in the **long tail** — **95% of queries get ten or fewer searches a month** — thousands of small, uncontested searches a frozen handful of pages can never cover. You win there first." },
      ],
    },
    {
      id: "the-play",
      h2: "The play, step by step",
      navLabel: "The play",
      blocks: [
        { kind: "p", text: "Overtaking a static competitor is not a trick. It is four moves run consistently while they stand still." },
        { kind: "list", ordered: true, items: [
          "Build a real page for every service you sell and every town you serve, so you are answering searches the incumbent's frozen pages never touched.",
          "Answer the questions buyers actually type, answer-first, with the direct answer in the first sentence, so each page starts banking the click history that becomes trust.",
          "Keep publishing. Their clock stopped. Yours starts the day you ship, and a moving curve overtakes a frozen lead on a long enough timeline.",
          "Hold the floor honest: this is accumulation, not an overnight flip. We promise the floor and project the ceiling, and the ceiling is real because the incumbent is standing still.",
        ] },
        { kind: "p", text: "Notice none of these is a redesign. Looking better does not add a single ranking signal, and signals are the only thing that moves position." },
        { kind: "p", text: "Every move on that list adds signals the incumbent is no longer adding. That is the entire difference between a site that climbs and a site that decays." },
        { kind: "takeaway", text: "Four moves, run while they sit still: a page for every service and every town, answer-first content, keep publishing, stay honest about the timeline. Every one adds **signals**, the only thing that moves a ranking. None of them is a redesign." },
      ],
    },
    {
      id: "the-honest-timeline",
      h2: "The honest timeline, no overnight promise",
      navLabel: "Honest timeline",
      blocks: [
        { kind: "p", text: "Here is the part the cheap pitch leaves out. This takes time, and anyone who tells you otherwise is selling you a number they cannot hit." },
        { kind: "p", text: "Ranking is measured in months to years, not 90 days. The incumbent's lead is real, and the data says exactly how real." },
        { kind: "p", text: "**72.9% of top-ten pages are three years old or older, and the average page at #1 is about five years old (MEASURED).** That is the wall, and a new page climbs it the same slow way every page does." },
        { kind: "p", text: "So we will not promise you pass a five-year incumbent next month. What we will tell you is the only thing that **can** pass them, and why a brochure structurally cannot." },
        { kind: "p", text: "The only thing that overtakes a frozen lead is a site that compounds while it coasts. Their lead is large and frozen. Yours is small and growing." },
        { kind: "p", text: "Growing wins on a long enough clock. That is not a guarantee of a ranking — no honest operator can give you one. It is a guarantee of the mechanism, and the mechanism is on your side because they stopped running." },
        { kind: "takeaway", label: "The honest version", text: "No overnight flip — ranking is months to years, and the average #1 is five years old. We will not promise you pass an incumbent next month. We promise the **floor** and project the **ceiling**: the only thing that overtakes a frozen lead is a site that compounds, and a brochure cannot. Run the [free audit](/audit) or read why [an old weak site still ranks](/guides/grandfathering)." },
      ],
    },
  ],
};
