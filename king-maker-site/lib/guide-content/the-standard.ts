import type { GuideContent } from "@/lib/content-blocks";

/* Category 1 — website types. The middle rung: the standard site (10-20 pages).
 * Honest pros-and-cons. The con is real (more to maintain; still not the widest
 * reach), not a setup for an upsell. No ranking guarantees. The "what's included"
 * list mirrors the locked standard-tier spec from claims.ts. Trade-agnostic. */

export const content: GuideContent = {
  sections: [
    {
      id: "what-it-is",
      h2: "The standard site: 10 to 20 pages that actually rank",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "A standard site is the smallest website that is actually **built to be found**, not just to look at." },
        { kind: "p", text: "It runs **10 to 20 pages**. The difference from a brochure isn't decoration. It has a real page for every service you sell and every town you serve." },
        { kind: "p", text: "That is what lets a site show up when a buyer searches a **service plus a town**, not just your company name." },
        { kind: "takeaway", label: "The short answer", text: "A standard site is a **10 to 20 page** system: a page for each service, a page for each town, online scheduling, and the basic SEO that lets Google find all of it. It's the floor for a site that can actually rank." },
      ],
    },
    {
      id: "whats-included",
      h2: "What a standard site includes",
      navLabel: "What's included",
      blocks: [
        { kind: "p", text: "None of this is premium. It is the floor — the pieces that have to be there before a site can rank for anything beyond your name." },
        {
          kind: "list",
          items: [
            "**Dedicated service pages** — one for every service you sell, because each service is its own search",
            "**Dedicated location pages** — one for every town you serve, because buyers search a service and a town together",
            "**Online scheduling or booking** — so a ready buyer can act now instead of waiting on a callback",
            "**Basic on-page SEO** — real page titles, headings, descriptions, and links between your pages, so Google understands what each page is about",
            "**Technical SEO** — fast, works on a phone, easy for Google to read, with a sitemap and schema (a bit of code that tells machines your hours, services, and service area)",
          ],
        },
        {
          kind: "definition",
          term: "Schema",
          def: "A small block of code in the page that spells out facts about your business — name, services, hours, service area — in a form Google and AI tools can read directly. It's why some businesses show stars and hours right in the search result.",
        },
        { kind: "p", text: "Add those up and you reach **10 to 20 pages, not 5**. The page count isn't padding. Every service page and town page is another door a buyer can find." },
      ],
    },
    {
      id: "the-upside",
      h2: "Why the standard site is the real starting line",
      navLabel: "The upside",
      blocks: [
        { kind: "p", text: "This is the rung where a website starts earning work instead of only describing it." },
        {
          kind: "list",
          items: [
            "**It can actually rank** — a page per service and per town means dozens of \"service in town\" searches you can show up for, not just your name",
            "**It captures ready buyers** — scheduling lets someone book the moment they decide, instead of leaking to a competitor",
            "**Google can read it** — basic and technical SEO mean your pages are findable, fast, and machine-readable from day one",
            "**It's a fair price for a real asset** — far more reach than a brochure, well short of an enterprise build's cost",
          ],
        },
        { kind: "p", text: "For most contractors who want to grow steadily without overbuilding, this is the right place to start." },
      ],
    },
    {
      id: "the-catch",
      h2: "The honest catch",
      navLabel: "The catch",
      blocks: [
        { kind: "p", text: "A standard site is a real step up, but it is not the top of the ladder, and you should know where it stops." },
        {
          kind: "list",
          items: [
            "**More to maintain** — more pages than a brochure means more to keep accurate and up to date over time",
            "**Not the widest reach** — it covers your core towns and services, not every town and service across a whole region",
            "**A deeper competitor will out-reach it** — a rival with 100-plus pages will rank for searches your 10-to-20-page site has no page for",
          ],
        },
        { kind: "p", text: "And the pages have to be **real**. A real page for a town means real local content, not the same paragraph with the town name swapped in." },
        { kind: "antiDoorway" },
        { kind: "takeaway", text: "A standard site wins your core market. It does not blanket a whole region. If your goal is to cover every town and service everywhere you work, that's the next rung up." },
      ],
    },
    {
      id: "who-its-for",
      h2: "Who the standard site is for",
      navLabel: "Who it's for",
      blocks: [
        { kind: "p", text: "**It fits you if:** you serve a handful of towns, you sell a clear set of services, and you want a site that can actually rank for them without paying for coverage you won't use yet." },
        { kind: "p", text: "**You'll outgrow it when:** you're chasing work across a wide region and competing with contractors who have far deeper sites." },
        { kind: "p", text: "If a brochure is too little, this is usually the right answer. If you need to blanket a whole region, look at [the enterprise site](/guides/the-enterprise). To compare what each tier should cost, read [what a contractor website should cost](/guides/what-a-website-should-cost)." },
      ],
    },
  ],
};
