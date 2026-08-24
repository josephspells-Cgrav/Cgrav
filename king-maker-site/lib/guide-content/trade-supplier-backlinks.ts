import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-they-are",
      h2: "What are trade and supplier backlinks?",
      navLabel: "What they are",
      speakable: true,
      blocks: [
        { kind: "p", text: "A backlink is another respected website vouching for you with a link — a referral Google can read. A **trade or supplier** backlink is that vouch coming from inside your own industry." },
        { kind: "p", text: "Think of it as a referral from a fellow professional, not a customer. It's the lumber yard you've bought from for fifteen years, or your state's roofing association, saying \"this outfit is one of us.\"" },
        { kind: "p", text: "That carries a specific kind of weight. A customer review says you did a good job once. An industry vouch says the people who know the trade — the suppliers, the associations — recognize you as a serious operator." },
        {
          kind: "list",
          items: [
            "**State or national trade associations** — your roofing, HVAC, or remodeling association, which usually lists member companies with a link.",
            "**Industry certifying bodies** — groups that train or credential contractors in your field.",
            "**The supply houses you buy from** — distributors and supply yards that keep a \"dealers we work with\" or partner page.",
          ],
        },
        { kind: "takeaway", text: "A vouch from inside your own trade — an association or a supplier — telling Google the industry itself recognizes you as a real, serious operator." },
      ],
    },
    {
      id: "how-to-earn",
      h2: "How do you earn these the right way?",
      navLabel: "How to earn them",
      blocks: [
        { kind: "p", text: "By being an active, paying member of your own industry — which most established contractors already are. The link is just the paperwork catching up to a relationship that's already real." },
        {
          kind: "list",
          ordered: true,
          items: [
            "Join your state and national trade associations, then confirm your member listing includes a link to your website.",
            "Ask your main supply houses whether they have a partner, dealer, or \"contractors we serve\" page you can be added to.",
            "If you hold any industry certifications, check whether the certifying body lists certified members with links.",
            "Keep every listing pointed at your real website, with your correct name, address, and phone.",
          ],
        },
        { kind: "p", text: "None of this costs more than the membership or relationship you'd have anyway. You're just making sure the link exists and points to the right place." },
        { kind: "p", text: "These work best alongside the other two earned kinds: [manufacturer backlinks](/guides/manufacturer-backlinks) and [local authority backlinks](/guides/local-authority-backlinks). Together they cover trade authority, local roots, and industry credibility." },
        { kind: "takeaway", label: "The honest version", text: "You already belong to your trade — make the links reflect it. Join the associations, ask your suppliers about a partner page, and keep every listing pointed at your real site." },
      ],
    },
    {
      id: "no-shortcuts",
      h2: "What you must never do: buy links or use a PBN",
      navLabel: "No shortcuts",
      blocks: [
        { kind: "p", text: "Every backlink worth having is **earned**, never bought. This is the one rule you cannot bend, because breaking it can get your whole site penalized by Google." },
        { kind: "p", text: "Somewhere along the way, someone will offer to sell you backlinks — \"100 links for $99,\" or a service built on a **private blog network** (a PBN), which is a stable of fake websites that exist only to point links at paying customers." },
        { kind: "p", text: "Don't. Google is built to detect exactly this, and the penalty for getting caught can erase rankings you spent years earning. A bought link isn't a vouch — it's a forgery, and Google treats it like one." },
        {
          kind: "definition",
          term: "PBN (private blog network)",
          def: "A network of fake or low-quality sites created only to sell backlinks. It's a forged referral. Google penalizes sites that use them — avoid entirely.",
        },
        { kind: "p", text: "The legitimate path is slower, and that's the whole point. A vouch from a real association, a real supplier, a real manufacturer, or a real local institution is one Google can trust precisely because it can't be bought." },
        { kind: "takeaway", label: "The hard rule", text: "Never buy links and never touch a PBN — both can get your site penalized. Earn vouches from the three real sources (manufacturers, local institutions, your trade) and nothing else." },
      ],
    },
  ],
};
