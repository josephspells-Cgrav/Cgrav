import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-governor-referral",
      h2: "What are local authority backlinks?",
      navLabel: "The governor referral",
      speakable: true,
      blocks: [
        { kind: "p", text: "A backlink is another respected website vouching for you with a clickable link — a referral Google can read. A **local authority** backlink is that same vouch, coming from a trusted name in your own town." },
        { kind: "p", text: "Here's the way to picture it. A manufacturer link is a national brand vouching for you. A **local** authority link is like the governor of your state telling people you're the one to call." },
        { kind: "p", text: "The governor isn't a roofing expert. But everyone in the area knows the name and trusts it, so the referral carries weight where it matters most — locally." },
        { kind: "p", text: "That's the role these links play. They tell Google you're not just any contractor on the internet. You're an established, trusted name **in this specific place** — which is the exact signal that wins \"near me\" searches." },
        {
          kind: "definition",
          term: "Local authority backlink",
          def: "A link from a respected local institution — chamber of commerce, the town paper, a sponsored team, the BBB. It vouches for you where your customers actually live.",
        },
        { kind: "takeaway", text: "The local \"governor referral\": a trusted town name pointing at you. It doesn't prove you're a great roofer — it proves you're a real, rooted local business." },
      ],
    },
    {
      id: "where-they-come-from",
      h2: "Where do these links come from?",
      navLabel: "Where to find them",
      blocks: [
        { kind: "p", text: "From the institutions that hold trust in your community. Most are things you can join, support, or sponsor — out in the open, no tricks." },
        {
          kind: "list",
          items: [
            "**Chamber of commerce** — most list member businesses with a link. Join your local one.",
            "**Local newspaper or news site** — a feature, an interview, or sponsoring local coverage often earns a link.",
            "**Sponsored teams and events** — sponsor a Little League team, a 5K, or a charity drive, and the organizer's site usually links to its sponsors.",
            "**Better Business Bureau** — an accredited BBB profile links to your site.",
            "**Local nonprofits and community groups** — donate or volunteer, and many thank sponsors with a link.",
          ],
        },
        { kind: "p", text: "Notice the pattern: you earn these by being a real part of the community. That's why Google trusts them — they're hard to fake and they signal a genuine local presence." },
        { kind: "takeaway", label: "The pattern", text: "Show up in your town for real — join, sponsor, support — and the links follow. Each one is a local institution telling Google you belong here." },
      ],
    },
    {
      id: "why-they-matter",
      h2: "Why do local links matter so much for a contractor?",
      navLabel: "Why they matter",
      blocks: [
        { kind: "p", text: "Because your customers are local, and so is the search. When someone types \"roofer near me,\" Google is trying to figure out who's genuinely established **in that area**." },
        { kind: "p", text: "A pile of local vouches answers that question. The chamber knows you, the paper covered you, the youth league has your name on a banner — that's a business with real local roots, not a website pretending to serve a town it's never worked in." },
        { kind: "p", text: "This is also the kind of link a brochure site never bothers to chase. Building a few of these is one of the cheapest, most durable local advantages you can earn." },
        { kind: "p", text: "Pair these with the other two earned kinds — [manufacturer backlinks](/guides/manufacturer-backlinks) for trade authority and [trade and supplier backlinks](/guides/trade-supplier-backlinks) for industry credibility — and you cover every angle a search engine looks at." },
        { kind: "takeaway", label: "The honest version", text: "Local searches reward local roots. A handful of real community links — chamber, paper, a sponsored team — tells Google you're established here. Cheap to earn, hard to fake, and most competitors skip them." },
      ],
    },
  ],
};
