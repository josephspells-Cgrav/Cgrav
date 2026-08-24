import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-ai-overviews-are",
      h2: "What are AI Overviews, and what is the zero-click shift?",
      navLabel: "What they are",
      speakable: true,
      blocks: [
        { kind: "p", text: "An AI Overview is the answer a search engine writes for you at the top of the results page, above the old list of blue links. You type a question, and instead of ten links to click, you get a paragraph that answers it directly." },
        { kind: "p", text: "The zero-click shift is what that change causes. The searcher reads the answer and never clicks through to a website, because the answer box already gave them what they came for." },
        { kind: "p", text: "This is already most of search. Roughly **60% of all searches are now zero-click**, meaning they end on the results page, and AI Overviews are pushing that number higher. The click you used to earn for ranking is being taken before it reaches your page." },
        { kind: "takeaway", text: "An AI Overview answers the question at the top of the page so the searcher never clicks. With roughly **60% of searches already zero-click**, ranking #1 no longer guarantees the visit." },
      ],
    },
    {
      id: "ranking-no-longer-means-the-click",
      h2: "Why doesn't ranking #1 win the click anymore?",
      navLabel: "Ranking is not the click",
      blocks: [
        { kind: "p", text: "Because the AI Overview now sits between your ranking and the visitor. You can hold the top spot and still watch the traffic fall, because the answer box satisfied the searcher first." },
        { kind: "p", text: "The drop is measured, and it is steep. AI Overviews cut clicks to the top organic result by roughly **34.5%** in April 2025, and by roughly **58%** by December 2025." },
        { kind: "p", text: "Read that carefully. That is the same #1 position losing more than half its traffic inside a single year, with the page itself completely unchanged. The ranking held. The click did not." },
        { kind: "p", text: "So winning the ranking is still necessary, but it is no longer enough. The old rule, that rank equals traffic, has quietly stopped being true, and a site built only to rank is now leaving the visit on the table." },
      ],
    },
    {
      id: "be-the-cited-source",
      h2: "What is the play: fight the AI layer or get cited by it?",
      navLabel: "Be the cited source",
      blocks: [
        { kind: "p", text: "You do not fight the answer box. You become the source it quotes." },
        { kind: "p", text: "When an AI Overview writes its answer, it pulls facts from real pages and it names them. The page it quotes is cited, linked, and credited right inside the answer the searcher reads. That citation is the new front position." },
        { kind: "p", text: "And it still pays in clicks. A page cited inside an AI Overview earns roughly **+35% more organic clicks** than the same page would without the citation." },
        { kind: "p", text: "So you do not lose either way. The AI layer takes the generic click and hands a warmer, more serious click to the page it chose to quote, because that searcher already read your claim and chose you anyway." },
        { kind: "p", text: "Here is the part that makes this winnable, not just survivable. The AI surface is its own surface: roughly **88% of the URLs cited in AI answers do not rank in the top 10** for the query they answer." },
        { kind: "p", text: "That means you do not have to beat the five-year-old #1 page to be the cited source. The answer layer reaches past the leaderboard for the page that answers the question best, so a page built right today can win the citation while an older page still holds the slow rank." },
        { kind: "takeaway", text: "The play is to be cited, not to fight. A cited page is named inside the answer and earns roughly **+35% more clicks**, and **88% of cited URLs do not even rank top 10**, so a deliberately built page can win this surface now." },
      ],
    },
    {
      id: "what-the-cited-page-looks-like",
      h2: "What kind of page does the AI actually quote?",
      navLabel: "What gets quoted",
      blocks: [
        { kind: "p", text: "A page the machine can read, lift, and trust, written for an extractor that never scrolls and never guesses. The brochure site is invisible here because it has nothing structured enough to quote." },
        { kind: "p", text: "Three things decide it. The answer has to be in the page's code the moment it loads, not painted in later by the browser. It has to lead with the answer in the first sentence. And it has to be marked up so the machine knows what it is reading." },
        { kind: "list", ordered: false, items: [
          "Server-rendered: the answer exists in the HTML the moment the page is fetched, not after scripts run.",
          "Answer-first: the question is the heading and the answer is the very first sentence under it.",
          "Structured: schema markup and an llms.txt file label your facts so the machine knows which sentence is the answer.",
        ] },
        { kind: "p", text: "That is the whole game restated. One site is a billboard the AI drives past; the other is the sentence the AI reads aloud." },
        { kind: "p", text: "We take the structure apart in [Making your site machine-readable](/guides/machine-readable-site) and [Answer-first content](/guides/answer-first-content). To see whether your own pages exist in the HTML at all, [run the free audit](/audit)." },
      ],
    },
  ],
};
