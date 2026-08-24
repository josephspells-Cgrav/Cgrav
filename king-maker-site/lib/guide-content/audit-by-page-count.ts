import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "count-your-pages",
      h2: "What to look for: auditing by page count",
      navLabel: "Count your pages",
      speakable: true,
      blocks: [
        { kind: "p", text: "Want the fastest read on a website, yours or a competitor's? Count the pages." },
        { kind: "p", text: "You do not need a tool. The page count alone tells you almost everything about whether a site was built to be found or just built to exist." },
        { kind: "p", text: "The reason is simple. A search engine can only rank a page that exists, so the number of pages is a ceiling on how many searches a site can possibly show up for." },
        { kind: "list", items: [
          "A handful of pages, roughly 5 to 10: a brochure. Built to describe the business, ranks for little beyond the company name.",
          "Around 10 to 20 pages: a standard site. Better, but still thin on the service-and-city pages that catch local searches.",
          "50 or more pages: an enterprise site. Built as a ranking system, with a real page for the searches buyers actually type.",
        ] },
        { kind: "p", text: "To count fast, type your domain into Google like this: site:yourcompany.com. The result number at the top is roughly how many pages Google has indexed." },
        { kind: "takeaway", text: "The fastest tell on any site is its **page count**. A handful (5-10) is a brochure, 10-20 is standard, 50+ is an enterprise system. A search engine can only rank pages that exist, so the number is a ceiling on how many searches the site can win." },
      ],
    },
    {
      id: "what-the-number-says",
      h2: "What the number says about what you're missing",
      navLabel: "What the number says",
      blocks: [
        { kind: "p", text: "The page count is not just a size. It is a list of the searches a site has no page for, and therefore cannot win." },
        { kind: "chart", chart: "page-count" },
        { kind: "p", text: "A brochure of 5 to 10 pages is missing the pages that catch local intent. No page for your service in the next town over. No page for the cost question buyers type before they call." },
        { kind: "p", text: "No page for the comparison they search while deciding. Every one of those searches goes to whoever did build the page." },
        { kind: "p", text: "A standard 10-to-20-page site has the basics but stops short. It might have a services list and a contact page, but rarely a real, separate page for each service in each town it works." },
        { kind: "p", text: "That is the exact layer where local searches are won, and a standard site usually leaves most of it on the table." },
        { kind: "p", text: "An enterprise site of 50-plus pages is built the other way around: a page for every service, every town, every cost question, every comparison a buyer might type. It is not bigger for the sake of being bigger." },
        { kind: "p", text: "It is bigger because it answers more searches, and answering more searches is the entire job. We take that structure apart in [the anatomy of an enterprise website](/guides/the-enterprise)." },
        { kind: "takeaway", text: "The page count is a list of searches a site **can't** win. A brochure has no page for the next town, the cost question, or the comparison, so it loses all three. An enterprise site is bigger because it **answers more searches**, which is the whole job." },
      ],
    },
    {
      id: "depth-not-padding",
      h2: "Depth, not padding: page count has to be real",
      navLabel: "Depth, not padding",
      blocks: [
        { kind: "p", text: "One trap to call out, because it is how thin sites fake depth. A high page count only counts if the pages are real." },
        { kind: "p", text: "A site can spin up fifty near-identical pages by swapping the town name in the same template, the so-called doorway page. Google has fought those for years and discounts them, so padding the count with copies does not work and can hurt." },
        { kind: "definition", term: "Doorway page", def: "A thin page mass-produced by find-and-replacing a city or service name into the same template, with no real, specific content behind it. Search engines detect the pattern and discount it. Quantity without substance is not depth." },
        { kind: "p", text: "The test is plain. Read a town page and delete the town name. If it could be any town, it is padding, not a real page." },
        { kind: "p", text: "A real page has something only that page can say: the actual work done there, the local detail, the specific answer to a specific question. That is what earns a ranking, and that is what a genuine enterprise count is made of." },
        { kind: "p", text: "So count the pages, but then spot-check a few. A site with 50 real pages is a ranking system. A site with 50 copied templates is a brochure wearing a costume, and a search engine sees through it." },
        { kind: "takeaway", label: "The honest version", text: "Page count only counts when the pages are **real**. Fifty copied templates with a swapped town name are doorway pages, discounted, not depth. The test: delete the town name, if it could be anywhere, it is padding. Count the pages, then spot-check that they say something only that page can say." },
      ],
    },
    {
      id: "run-the-count",
      h2: "Run the count on yourself and your rival",
      navLabel: "Run the count",
      blocks: [
        { kind: "p", text: "Put it to work in five minutes. The page count is most useful as a comparison, not a number in isolation." },
        { kind: "list", ordered: true, items: [
          "Search site:yourcompany.com in Google and note the page count.",
          "Do the same for your top competitor, site:theircompany.com.",
          "Open a few of each site's pages and apply the delete-the-town-name test. Are they real or padded?",
          "Compare. Whoever has more real pages answers more searches, and that is who is built to win the long tail.",
        ] },
        { kind: "p", text: "If your rival has a stack of real pages and you have a brochure, you now know exactly why they show up and you do not. The fix is not a redesign. It is depth — real pages for the searches you are currently invisible for." },
        { kind: "p", text: "If you both have brochures, that is the opening. Whoever builds the real pages first starts banking the rankings neither of you holds yet." },
        { kind: "takeaway", text: "Count your pages and your rival's with the site: search, then spot-check that the pages are real. More real pages = more searches answered = built to win. If you are behind, the fix is **depth**, not a redesign. Run the full [free audit](/audit) to see exactly which pages you are missing." },
      ],
    },
  ],
};
