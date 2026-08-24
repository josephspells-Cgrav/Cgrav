import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-they-are",
      h2: "How do you rank in every town you serve?",
      navLabel: "What they are",
      speakable: true,
      blocks: [
        { kind: "p", text: "Short answer: you build **one real page for each town you actually work in** — a real page built around a real job you did there. That is how a single business ranks across a whole region instead of just its home circle." },
        { kind: "p", text: "A location page is exactly what it sounds like: a page about your service in one specific town. \"Roof replacement in Mooresville,\" with photos of a Mooresville roof you actually did, the neighborhoods you work, the local details only someone who has worked there would know." },
        { kind: "p", text: "Why this matters: the map pack stops at a ring of about 5 to 10 miles around your office. A location page does not care how far the town is — it ranks on relevance, so it can win in a town 30 miles away that the map pack will never reach for you." },
        { kind: "p", text: "Your homepage and a generic \"service areas\" list cannot do this. Google reads one vague page that name-drops twenty towns as weak for all twenty. It reads twenty real pages as strong, one town at a time." },
        { kind: "takeaway", text: "One real page per town you actually serve, each built from a real job there. That is how a single contractor ranks across a region — and it is the lever that scales you past the ~5–10 mile map-pack circle." },
      ],
    },
    {
      id: "how-it-captures",
      h2: "How a real town page captures the town next door",
      navLabel: "How it captures",
      blocks: [
        { kind: "p", text: "Here is the part that makes location pages pay off. A genuine page for one town does not only win that town — it pulls in the searches around it too." },
        { kind: "p", text: "When you write a real page about a job in, say, Davidson, you naturally mention the surrounding area: the neighborhoods, the nearby towns you also serve, the kind of homes in that pocket of the region. Google reads all of it." },
        { kind: "p", text: "So someone in the next town over, searching for your service, can land on your Davidson page because it is the most relevant, most specific result near them — far more relevant than a competitor's homepage that mentions no town at all." },
        { kind: "p", text: "Stack ten or twenty of these real pages across your region and they start to overlap, covering the gaps between them. That coverage is something a brochure with one \"areas served\" page structurally cannot produce." },
        { kind: "p", text: "This is also where the long tail lives. **95% of search queries get ten or fewer searches a month (MEASURED).** Each town-plus-service search is small, but there are hundreds of them across a region, and real location pages are how you actually show up for them." },
        { kind: "takeaway", label: "The payoff", text: "A real page for one town earns the searches around it too, because it names the real area and Google reads it as the most relevant nearby result. Twenty real pages overlap into regional coverage no single brochure page can match." },
      ],
    },
    {
      id: "the-doorway-trap",
      h2: "The trap: do not fake the pages",
      navLabel: "The doorway trap",
      blocks: [
        { kind: "p", text: "There is a wrong way to do this, and it is the most common way. It is called doorway spam, and it will eventually sink your whole site." },
        { kind: "p", text: "Doorway pages are what you get when you take one page, swap the city name in and out, and publish fifty copies. \"Roof Repair in [Town A].\" \"Roof Repair in [Town B].\" Same words, same photos, only the town name changes. It is fast, it is cheap, and Google built a specific penalty for it." },
        { kind: "p", text: "The honest test for whether a page is real or fake is simple:" },
        { kind: "antiDoorway" },
        { kind: "p", text: "If you can delete the city name from a page and it still makes complete sense for any town, it is a doorway page. It says nothing true about that specific place. A real page falls apart without the town, because it is built from a real job, real photos, and real local detail that only fits that one town." },
        { kind: "p", text: "This is why \"build a page for every town\" is not a license to spin up a hundred thin copies. One real page per town you actually serve — built from a job you actually did there — is the rule. Serve ten towns, build ten real pages, not a hundred fake ones." },
        { kind: "takeaway", label: "The honest version", text: "We do not endorse city-swapped doorway spam, and Google penalizes it. The standard is one **real** page per town you genuinely work in, built from a real job, that fails the \"delete the city name\" test. That is the version that ranks and keeps ranking. For why specificity is the whole game, read [Google relevance: why the specific page wins](/guides/google-relevance)." },
      ],
    },
  ],
};
