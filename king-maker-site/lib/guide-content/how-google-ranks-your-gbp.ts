import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-three-levers",
      h2: "How does Google rank your Google Business Profile?",
      navLabel: "The three levers",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: Google ranks the map pack on three things, and only three. **Relevance**, **distance**, and **prominence**. Everything else you have read is a detail under one of those, or it is noise." },
        { kind: "p", text: "The map pack is the little block of three businesses with a map that shows up for searches like \"roofer near me.\" Google calls that listing your Google Business Profile, the free one you claim at google.com/business." },
        { kind: "p", text: "Here is what each lever actually means, in plain English:" },
        {
          kind: "list",
          items: [
            "**Relevance** — how well your profile matches what the person searched. A profile set to the right primary category beats one that is vague about what it does.",
            "**Distance** — how far your office is from the searcher. You cannot change this, and it is the lever that caps the whole map pack (more on that below).",
            "**Prominence** — how well-known and trusted your business is. Reviews, your website, and links all feed this one.",
          ],
        },
        { kind: "takeaway", text: "Relevance, distance, prominence. Google has said this in plain words. Most \"GBP ranking hacks\" are just one of these three dressed up, and the rest is noise that does not move you." },
      ],
    },
    {
      id: "what-moves-you",
      h2: "What actually moves you up the pack",
      navLabel: "What moves you",
      blocks: [
        { kind: "p", text: "If you only do a few things, do these. They line up with the three levers, and they are the moves that matter most on the profile itself." },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Set the right primary category.** This is the single biggest lever you control. \"Roofing contractor\" is not the same as \"contractor.\" Pick the one that names exactly what you do.",
            "**Earn reviews steadily.** Not a pile once, a steady stream. Velocity — fresh reviews coming in week after week — tells Google the business is alive and trusted.",
            "**Fill the profile out completely.** Hours, service area, services list, real photos. A complete profile reads as a real, active business; a half-empty one reads as abandoned.",
            "**Keep your name, address, and phone identical everywhere.** On the profile, on your site, on every directory. Mismatches make Google unsure it is the same business.",
            "**Point a deep website at it.** Prominence pulls from the web, and the site is where that depth lives. We cover exactly how in [your website is the map-pack tiebreaker](/guides/your-website-plus-gbp).",
          ],
        },
        { kind: "p", text: "Notice that all five are either relevance or prominence. The third lever, distance, you cannot touch — and that is the honest limit of the profile." },
        { kind: "definition", term: "Review velocity", def: "The rate at which new reviews arrive, not the total count. Ten reviews this quarter beats fifty that all landed two years ago. Google reads a steady stream as a sign the business is active and trusted right now." },
      ],
    },
    {
      id: "what-is-noise",
      h2: "What is noise, and what to stop doing",
      navLabel: "What's just noise",
      blocks: [
        { kind: "p", text: "A lot of effort goes into things that do not move the pack. Some are harmless busywork. A few can get your profile suspended." },
        {
          kind: "debunk",
          myth: "Stuffing keywords into your business name lifts your ranking.",
          reality: "Adding \"Best Roofing Charlotte NC\" to a name that is really just \"Summit Roofing\" is against Google's rules and is a common reason profiles get suspended. Use your real business name.",
          why: "Google's guidelines require the name to be your actual real-world name. Keyword-stuffed names are reported by competitors and removed, and a suspended profile ranks for nothing while it is down. The risk is large and the upside is zero.",
        },
        { kind: "p", text: "Posting to your profile every day, listing a wall of services you do not really offer, and paying for review gimmicks all fall in the same bucket: little or no return, and some carry real downside." },
        { kind: "p", text: "The honest split: the profile itself is mostly relevance and reviews, and you can max those out in a week. After that, the lever that keeps moving is **prominence**, and prominence is built off the profile — on your website and across the web." },
        { kind: "takeaway", label: "The honest version", text: "You can fully optimize the profile itself fast: right category, steady reviews, complete listing, consistent name and address. Once that is done, the profile has little left to give. The thing that keeps lifting you is the **website behind it**, and that is where the real work — and the real edge — lives." },
      ],
    },
  ],
};
