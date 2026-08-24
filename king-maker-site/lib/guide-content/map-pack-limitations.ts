import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-ceiling",
      h2: "What are the limits of the Google map pack?",
      navLabel: "The ceiling",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: the map pack is **proximity-capped** and **volume-limited**. You can realistically own it only for a few miles around your office, and there are only so many searches inside that ring. It is a nice near-default win, not the engine that grows your business." },
        { kind: "p", text: "The map pack is real and worth having. But it has a hard ceiling that most contractors do not see until they have maxed out their profile and the phone still is not ringing the way they hoped." },
        { kind: "p", text: "Two limits cause this, and they stack:" },
        {
          kind: "list",
          items: [
            "**It is capped by distance.** Google ranks the pack partly on how close you are to the searcher, so you can realistically rank #1 only about **5 to 10 miles** around your office. Past that ring, a closer competitor wins the pack no matter how good you are.",
            "**The volume inside that ring is limited.** Only so many people in a 5-to-10-mile circle search for your service in a given month. Even if you own the pack completely, that is a fixed, modest pool of jobs.",
          ],
        },
        { kind: "takeaway", text: "The map pack is proximity-capped (~5–10 miles) and the search volume inside that ring is limited. Own it completely and it still yields only a handful of jobs a month. It is a byproduct, not the engine." },
      ],
    },
    {
      id: "why-few-jobs",
      h2: "Why even winning the pack is a few jobs a month",
      navLabel: "Why few jobs",
      blocks: [
        { kind: "p", text: "Put the two limits together and the math gets honest fast. Distance caps your reach to a small circle. Volume caps how many searches happen inside it. Multiply a small radius by a small number of searches and you get a small number of jobs." },
        { kind: "p", text: "This is not a knock on doing it. Winning the pack in your home circle is close to a default once your profile is dialed in, and you should take it. Just do not expect it to scale you." },
        { kind: "p", text: "The trap is pouring months of effort into squeezing more out of the pack — daily posts, review gimmicks, paid directory listings — when the ceiling is fixed by geography. You cannot post your way past distance." },
        { kind: "p", text: "A contractor who wants to grow past a single circle on the map needs a lever that is not capped by distance at all. That lever exists, and it is a different surface entirely." },
        { kind: "definition", term: "Proximity cap", def: "Because Google ranks the map pack partly on how close your office is to the searcher, your realistic #1 reach is a ring of roughly 5 to 10 miles. Outside that ring, a nearer competitor takes the pack regardless of quality. It is a hard ceiling you cannot optimize away." },
      ],
    },
    {
      id: "the-real-engine",
      h2: "The map pack is the floor; organic is the engine",
      navLabel: "The real engine",
      blocks: [
        { kind: "p", text: "Here is the right way to hold the two surfaces together. The map pack is your floor — a near-automatic win in your home circle. The **organic results** are your engine — the listings below the map that are not capped by distance." },
        {
          kind: "comparison",
          leftLabel: "Map pack",
          rightLabel: "Organic results",
          rows: [
            { label: "Reach", brochure: "~5–10 mile ring", system: "Your whole region", flag: "MEASURED" },
            { label: "Capped by distance", brochure: "Yes", system: "No", flag: "MEASURED" },
            { label: "Searches you can capture", brochure: "Limited pool", system: "The long tail", flag: "MEASURED" },
            { label: "Scales past one circle", brochure: "No", system: "Yes", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "Organic ranks on relevance and trust, not on how close your office is. That means a page about your service in a town 30 miles away can win there — something the map pack can never do for you." },
        { kind: "p", text: "And the demand below the map is enormous. **95% of search queries get ten or fewer searches a month (MEASURED)** — thousands of small, specific searches that no ten-page brochure can cover. That is the long tail, and it is where the volume the map pack lacks actually lives." },
        { kind: "p", text: "So take the map pack — it is free and it is close to a default. Then build the website that wins the region, because that is the part that scales. The full case is in [location pages: how to rank in every town you serve](/guides/location-pages)." },
        { kind: "takeaway", label: "The honest version", text: "The map pack is worth having and close to automatic in your home circle — but it is proximity-capped and yields few jobs a month. It is the floor, not the engine. The engine is the organic system that reaches your whole region and covers the long tail. Win the pack, then build the site that scales." },
      ],
    },
  ],
};
