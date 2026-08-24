import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-red-flags",
      h2: "What a bad audit looks like",
      navLabel: "The red flags",
      speakable: true,
      blocks: [
        { kind: "p", text: "When you run an audit on a weak site, the same handful of failures show up every time. Once you know them, you can spot a brochure in thirty seconds." },
        { kind: "p", text: "A bad audit is not random. It is a site that was built to look finished, not built to be found, and that shows up as a specific, repeatable list." },
        { kind: "list", items: [
          "No real location pages, nothing for the towns the business serves.",
          "Generic page titles that never name the service or the city.",
          "No business schema, the machine-readable markup search engines and AI rely on.",
          "Slow on a phone, where most people actually look.",
          "Nothing answer-first, the answer a buyer wants is buried under company history.",
        ] },
        { kind: "p", text: "Hit three or more of these and you are not looking at a ranking system. You are looking at a digital business card, and a search engine treats it like one." },
        { kind: "takeaway", text: "A bad audit is a repeatable list: no location pages, generic titles, no schema, slow on a phone, nothing answer-first. It is the fingerprint of a site built to **look finished**, not built to be **found**. Three or more flags and it is a brochure." },
      ],
    },
    {
      id: "findability-flags",
      h2: "The findability flags, and how common they are",
      navLabel: "Findability flags",
      blocks: [
        { kind: "p", text: "These are not rare problems at the bottom of the market. We scanned over a thousand live contractor sites, and the failures are the norm, not the exception." },
        { kind: "chart", chart: "gap-wall" },
        { kind: "p", text: "**About 57% have no real location pages (MEASURED).** With no page for a nearby town, the site can only rank inside the small radius around the office, and a buyer one town over never sees it." },
        { kind: "p", text: "**Roughly 70% have no keyword-and-city titles (MEASURED).** The title is the first thing a search engine reads, and if it never names the service or the city, Google cannot tell what the business does or where, so it loses the exact search a ready buyer types." },
        { kind: "p", text: "**About 56% carry no business schema (MEASURED).** Without that markup there are no stars, no hours, no service area in the result, and an AI assistant skips a business it cannot parse." },
        { kind: "p", text: "**Around 71% have no llms.txt file (MEASURED)**, the file that tells AI engines what the business is. Ask an assistant for the best contractor near you and a site with no such signal is simply absent from the answer." },
        { kind: "p", text: "Read that as one sentence: most sites fail the basics, so a site that simply does them already beats the large majority of the field." },
        { kind: "takeaway", text: "The flags are the norm, not the exception. Across 1,000+ scanned sites: **~57% no location pages, ~70% no keyword-and-city titles, ~56% no schema, ~71% no llms.txt (MEASURED).** The bar is on the floor, which is exactly why doing the basics wins." },
      ],
    },
    {
      id: "built-to-look-finished",
      h2: "Built to look finished, not built to rank",
      navLabel: "Looks vs. rank",
      blocks: [
        { kind: "p", text: "Here is what ties every red flag together. A bad audit is almost always a site that someone made look done without making it work." },
        { kind: "p", text: "It has a nice hero image, a logo, a phone number, an about page. To the owner it looks finished, and that is exactly the trap: the parts that decide rankings are the parts you cannot see." },
        { kind: "comparison", leftLabel: "Built to look finished", rightLabel: "Built to rank", rows: [
          { label: "Real location pages", brochure: "No", system: "Yes", flag: "MEASURED" },
          { label: "Keyword + city titles", brochure: "No", system: "Yes", flag: "MEASURED" },
          { label: "Business schema", brochure: "No", system: "Yes", flag: "MEASURED" },
          { label: "Fast on a phone", brochure: "No", system: "Yes", flag: "MEASURED" },
          { label: "Answer-first content", brochure: "No", system: "Yes", flag: "MEASURED" },
        ] },
        { kind: "p", text: "Every row in that table is invisible to a visitor and load-bearing to a search engine. That is why a site can look great and rank for nothing at the same time." },
        { kind: "p", text: "It also explains the most common mistake contractors make after a bad audit: paying for a redesign. A redesign fixes the part you can see and leaves every flag in that table untouched." },
        { kind: "p", text: "The pretty new site fails the same audit. What actually clears the flags is depth and structure, real pages, real titles, real schema, real speed, real answers, the work a brochure skipped." },
        { kind: "takeaway", text: "A bad audit is a site built to **look** finished, not to **rank**. Every failing row is invisible to a visitor and load-bearing to a search engine, which is why a redesign does not fix it. The flags clear with depth and structure, the work the brochure skipped." },
      ],
    },
    {
      id: "what-to-do",
      h2: "What a bad audit actually means for you",
      navLabel: "What to do",
      blocks: [
        { kind: "p", text: "If you run the audit and it comes back ugly, do not take it as bad news. Take it as a map." },
        { kind: "p", text: "Every flag is a known, finite fix, and almost every competitor failed the same ones. That makes it the most winnable kind of problem there is: the work is clear, and the field skipped it." },
        { kind: "p", text: "One honesty rail, because it is the whole point of an honest audit. Clearing the flags is the price of admission, not a guaranteed ranking." },
        { kind: "p", text: "Fixing the fundamentals is what lets you start accumulating, but ranking still builds over months. No audit and no agency can promise a position, and anyone who does is selling you a number they cannot hit." },
        { kind: "p", text: "So read a bad audit for what it is: a checklist of exactly what to build to go from a site that merely exists to a site that competes. We promise the floor and project the ceiling, and the floor starts with clearing every flag on that list." },
        { kind: "takeaway", label: "The honest version", text: "A bad audit is a **map**, not a verdict — every flag is a known, finite fix the field skipped. Clearing them is the price of admission, never a promised ranking. We promise the floor and project the ceiling. Run the [free audit](/audit) to get your list, or read why [a brochure cannot win](/guides/the-brochure)." },
      ],
    },
  ],
};
