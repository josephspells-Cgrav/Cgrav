import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "specific-wins",
      h2: "Why does the specific page beat the generic one?",
      navLabel: "Specific wins",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: Google ranks the page that most closely **matches the exact search**. A page about your exact service in your exact town beats a generic services page for that search, every time. Specificity is the game." },
        { kind: "p", text: "When someone types \"metal roof installation in Concord,\" Google is not looking for the nicest website. It is looking for the page that is most clearly about metal roof installation in Concord." },
        { kind: "p", text: "A dedicated page that names that service and that town — in the title, in the headline, in the photos, in the copy — is an obvious match. A general \"Our Services\" page that mentions metal roofing once and never names Concord is a weak, blurry match." },
        { kind: "p", text: "So the specific page wins, even if the generic site is bigger or prettier. Google rewards the closest answer to the actual words searched, not the best-looking business overall." },
        { kind: "takeaway", text: "Google ranks the closest match to the exact search. A page about the exact service in the exact town beats a generic services page for that search. Specificity, not polish, is what wins the search." },
      ],
    },
    {
      id: "what-relevance-means",
      h2: "What Google means by relevance",
      navLabel: "What relevance is",
      blocks: [
        { kind: "p", text: "Relevance is just Google's word for how well your page matches what the person actually searched. It is one of the core things it ranks on, and it is the one you have the most control over." },
        { kind: "p", text: "A page reads as relevant to a search when the search terms show up where they matter — and when the rest of the page backs them up with real, on-topic detail." },
        {
          kind: "list",
          items: [
            "The **page title** names the service and the place (\"Kitchen Remodeling in Huntersville\"), not just \"Home\" or \"Services.\"",
            "The **headline and copy** are about that one thing, not a paragraph that tries to cover everything you do.",
            "The **photos and detail** are specific — a real project, real local references — so the page is genuinely about that service in that place, not just stuffed with the words.",
          ],
        },
        { kind: "p", text: "A generic page fails on all three. It tries to be about everything, so it is strongly about nothing. Google cannot tell which search it should win, so it wins none of them cleanly." },
        { kind: "definition", term: "Relevance", def: "How closely a page matches the words and intent of a search. Google rewards the page that is most clearly and specifically about what was searched. A dedicated service-plus-town page is a strong match; a catch-all services page is a weak one." },
      ],
    },
    {
      id: "why-brochures-lose",
      h2: "Why a brochure loses the specific search",
      navLabel: "Why brochures lose",
      blocks: [
        { kind: "p", text: "A ten-page brochure has, at best, one services page and one contact page. That means it has one blurry answer for every service-and-town search a buyer might type — and a blurry answer loses to a sharp one." },
        {
          kind: "comparison",
          leftLabel: "Generic page",
          rightLabel: "Specific page",
          rows: [
            { label: "Names the exact service", brochure: "Maybe once", system: "Throughout", flag: "MEASURED" },
            { label: "Names the exact town", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Match to the search", brochure: "Blurry", system: "Sharp", flag: "MEASURED" },
            { label: "Searches it can win", brochure: "Few", system: "Many specific ones", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "There is real money in the specific searches. A worked example: a high-value search like \"your service in your city\" might see around 2,000 searches a month. An average site captures roughly 6% of that traffic; a deep, specific system captures around 30% (ILLUSTRATIVE)." },
        { kind: "p", text: "That is the difference between roughly 120 visits and 600 from one term — and the specific page is the reason. Same search, sharper answer, far more of the traffic." },
        { kind: "p", text: "Stack that across every service and every town and the brochure is leaving most of its market on the table, one specific search at a time. The fix is not a better-looking site — it is more specific pages." },
        { kind: "takeaway", label: "The honest version", text: "The specific page wins because it is the closest match, not because it is fancy. A brochure has one blurry answer for hundreds of sharp searches and loses each one to whoever built the specific page. Build the specific pages. The next step is doing it at scale — see [topical authority: becoming the site Google trusts](/guides/topical-authority)." },
      ],
    },
  ],
};
