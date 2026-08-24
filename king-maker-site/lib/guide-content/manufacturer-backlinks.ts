import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-they-are",
      h2: "What are manufacturer and brand backlinks?",
      navLabel: "What they are",
      speakable: true,
      blocks: [
        { kind: "p", text: "A backlink is another respected website mentioning you with a clickable link back to your site. Think of it as a referral that Google can see." },
        { kind: "p", text: "Picture the most-trusted name in town telling everyone you do great work, except this time Google is standing right there, listening, and writing it down." },
        { kind: "p", text: "A manufacturer or brand backlink is the strongest kind. It's when a big name in your trade lists you on **their own website** as a certified installer or dealer." },
        { kind: "p", text: "If you roof, that's **GAF**, **Owens Corning**, or **CertainTeed** naming you in their \"find a contractor\" tool. If you side, it's **James Hardie**. Other trades have their own: HVAC has Carrier and Trane, windows have Andersen and Pella." },
        {
          kind: "definition",
          term: "Backlink",
          def: "One website linking to another. To Google, a link from a trusted site is a vote of confidence — a public vouch that says \"this business is the real thing.\"",
        },
        { kind: "takeaway", text: "A backlink is a referral Google can read. A **manufacturer** backlink is the strongest one: a national brand vouching for you, by name, on their own turf." },
      ],
    },
    {
      id: "why-strongest",
      h2: "Why is this the strongest type of backlink?",
      navLabel: "Why it's the strongest",
      blocks: [
        { kind: "p", text: "Two things make a backlink valuable, and a manufacturer link is the rare one that has both at full strength." },
        {
          kind: "list",
          items: [
            "**Authority** — the site doing the linking is itself trusted. A GAF or James Hardie domain carries enormous weight with Google.",
            "**Relevance** — the link is about your exact trade. A roofing-brand link pointing at a roofer is a perfect topical match, not a random mention.",
          ],
        },
        { kind: "p", text: "Most links are strong on one and weak on the other. A link from a giant general site might have authority but no relevance. A link from a tiny trade blog might be relevant but carry no weight." },
        { kind: "p", text: "A manufacturer link is both at once: a heavyweight site, vouching for you, about the precise thing you do. That combination is why it sits at the top." },
        { kind: "takeaway", label: "The short version", text: "Authority **and** relevance in one link. The biggest trusted name in your trade, pointing straight at you, for the exact work you do." },
      ],
    },
    {
      id: "how-to-earn",
      h2: "How do you actually earn one?",
      navLabel: "How to earn one",
      blocks: [
        { kind: "p", text: "You earn these by being a real, certified partner — not by buying anything. That's the point: it can't be faked, which is exactly why Google trusts it." },
        { kind: "p", text: "The usual path is the manufacturer's certification or dealer program. You complete their training, meet their standards, and in return they list you in their official contractor locator." },
        {
          kind: "list",
          ordered: true,
          items: [
            "Enroll in the certification program for the brands you already install (GAF, Owens Corning, James Hardie, and so on).",
            "Complete their requirements — training, insurance, sometimes a track record of installs.",
            "Confirm you appear in their public \"find a contractor\" or dealer-locator tool with a link to your website.",
            "Make sure that link points to your real site, not a third-party profile.",
          ],
        },
        { kind: "p", text: "If you're already certified with a brand, you may have this link and not know it. Worth checking — it's free authority you've already done the work to earn." },
        { kind: "p", text: "These links are one of three kinds worth earning. The other two are [local authority backlinks](/guides/local-authority-backlinks) and [trade and supplier backlinks](/guides/trade-supplier-backlinks)." },
        { kind: "takeaway", label: "The honest version", text: "You don't buy these — you qualify for them. Get certified with the brands you install, then confirm you're in their official locator with a link to your site. Real partnership, real vouch." },
      ],
    },
  ],
};
