import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "do-you-need-an-office",
      h2: "When do you need a real office in a town, and when does organic cover it?",
      navLabel: "Office or organic",
      speakable: true,
      blocks: [
        { kind: "p", text: "There are two ways to grow into a new town, and contractors confuse them constantly. You can plant a real, staffed satellite location: a leased address, a phone, people on the ground, a pin on the map." },
        { kind: "p", text: "Or you can rank a deep set of pages for that town and let organic carry the demand without a building in it. They cost different amounts, they catch different jobs, and choosing the wrong one wastes either rent or revenue. The rule that settles it is simple: the **map pack needs proximity, and organic does not**." },
        { kind: "p", text: "The map pack is doubly gated, and the first gate is distance. Google measures how far the searcher sits from your office and treats that distance as the dominant filter." },
        { kind: "p", text: "A pin two miles from the searcher beats a pin eight miles away before review count or page quality enters the math. So if your goal is the three pins at the top of the screen in a town, there is no shortcut: you need a real, verifiable address in that town." },
        { kind: "p", text: "You cannot rank a pin where you have no building. That is not a content problem you can write your way out of. It is geometry." },
        { kind: "p", text: "Organic obeys none of that. The ranked blue links below the map do not measure how far you sit from the searcher." },
        { kind: "p", text: "They measure how well your page answers the query. A page about a metal roof replacement in a specific town ranks for that town whether your office is two miles away or twenty." },
        { kind: "p", text: "So the honest answer to \"do I need an office there\" is a question back: do you need the **pack** in that town, or do you need the **jobs**? If you need the pack, you need the office. If you need the jobs, organic reaches into the town without the lease." },
        {
          kind: "takeaway",
          text: "The map pack needs **proximity**, so a pin requires a real address in the town. Organic is **radius-independent**, so a deep set of pages reaches the town with no building in it. Choose the office when you need the pins. Choose organic when you need the jobs.",
        },
      ],
    },
    {
      id: "the-pack-needs-proximity",
      h2: "The map pack needs a real address, and a satellite is the only way to plant one",
      navLabel: "The pack needs proximity",
      blocks: [
        { kind: "p", text: "Be precise about what a satellite location actually buys. It buys a pin, and the pin buys access to one proximity band: roughly a five-mile radius around that address." },
        { kind: "p", text: "Inside that band the satellite can compete in the pack. Past it, the band belongs to whoever has a pin closer to those neighborhoods." },
        { kind: "p", text: "One office serves one band. New territory in the pack needs a new physical address, not better reviews. The reviews on your main office do not radiate five miles down the road, because the searcher five miles away is closer to someone else." },
        { kind: "p", text: "Run the math on what the band delivers before you sign a lease for it. A freshly stood-up pin with a steady review habit produces on the order of **one to two jobs a month** from the pack early on." },
        { kind: "p", text: "That figure is modeled, so claim the shape, not the count: the shape is a thin trickle, not a flood. As the listing matures, the review base deepens, and Google trusts it more, that number climbs toward **roughly ten jobs a month**, and it gets there at about a **two-year ceiling**. Two years of disciplined review collection to reach a ceiling the five-mile radius will not let you exceed." },
        {
          kind: "chart",
          chart: "mechanism-ledger",
        },
        { kind: "p", text: "So a satellite is a real lever, but a slow and bounded one. Ten jobs a month from a capped channel is worth having." },
        { kind: "p", text: "It is also two years of rent, staffing, and review work to reach a ceiling that sits exactly where geometry says it sits. The mistake is planting a satellite in every town you want to serve, treating rent as the only way to reach demand, when the demand the pack cannot see, the considered high-ticket research, was reachable from your existing office all along through pages, not a pin." },
        {
          kind: "definition",
          term: "Satellite location",
          def: "A real, staffed, verifiable address opened in a new town to plant a map pin and compete in that town's local pack. It unlocks one proximity band of roughly five miles, matures over about two years toward a roughly ten-job-a-month ceiling, and costs ongoing rent and staffing the entire time.",
        },
      ],
    },
    {
      id: "organic-is-radius-independent",
      h2: "Organic is radius-independent, so it reaches towns you have no office in",
      navLabel: "Organic is radius-independent",
      blocks: [
        { kind: "p", text: "This is the part most contractors never get told, because the people selling satellite locations have no reason to say it. Organic ranking has **no proximity penalty**." },
        { kind: "p", text: "A page that genuinely answers the searches in a town can rank in that town from an office twenty miles away. The blue links do not ask where your building is." },
        { kind: "p", text: "They ask whether your page is the best answer to the query. That single difference is why a deep site can serve a whole region from one location while the pack is still trapped inside its five-mile band." },
        { kind: "p", text: "The mechanism is the **service-by-location matrix**. Every real service you perform, multiplied by every real town you serve, is a distinct page pointed at a distinct set of searches." },
        { kind: "p", text: "A brochure ships around ten pages and ranks for your name and your home city, so it reaches one town. Our live reference build ships **147 pages** (measured), more than a tenfold difference in the searches the site can match, and the multiplier is geographic: each new town is a row of pages that reach into that town with no pin required. The depth is the reach." },
        {
          kind: "chart",
          chart: "matrix",
        },
        { kind: "p", text: "Organic also catches the demand the pack physically cannot see: the **long tail**. **95% of all search queries get ten or fewer searches a month** (measured), so the money is not in a handful of fat head terms." },
        { kind: "p", text: "It is spread across thousands of specific, low-volume, high-intent queries: a roof type, a town, a problem, a brand. **96.55% of all web pages get zero traffic from Google** (measured), because a ten-page brochure has nothing to rank for the long tail with." },
        { kind: "p", text: "The pack returns three pins for a head term. A deep site returns your page for ten thousand specific ones, across every town in the matrix, from a single office." },
        {
          kind: "takeaway",
          text: "Organic has **no proximity penalty**, so the service-by-location matrix reaches towns you have no building in. Each new town is a row of pages, not a lease. That is how one office serves a region the pack would need a dozen satellites to touch.",
        },
      ],
    },
    {
      id: "the-honesty-guardrail",
      h2: "The reach has to be earned, not faked: the doorway-page line",
      navLabel: "The honesty line",
      blocks: [
        { kind: "p", text: "There is a hard guardrail on radius-independent reach, and it is the whole reason the strategy works at all. Organic reaches a town only if the page for that town is **real**." },
        { kind: "p", text: "A page per town that swaps the city name into the same paragraph is a doorway page, and Google has spent years learning to ignore exactly that. The delete-the-city-name test settles it: if you can delete the town from the page and nothing breaks, the page says nothing true about the town, and it will not rank in it." },
        { kind: "p", text: "Faking proximity with templated pages does not beat geometry. It gets filtered." },
        {
          kind: "antiDoorway",
        },
        { kind: "p", text: "So radius-independent does not mean effortless. It means the work moves from rent to **content**: a real project in the town, a real crew that worked it, a real photo, a real local detail, a page that earns the rank because it answers the search honestly." },
        { kind: "p", text: "That is harder than swapping a city name and easier on the bank than a lease. It is also durable in a way rent is not." },
        { kind: "p", text: "**Authority is accumulated time**: 72.9% of the pages in the top ten results are three or more years old, and the average number-one page is five years old (measured). A real town page is an owned asset that compounds. A satellite is rent that resets every month." },
        {
          kind: "chart",
          chart: "page-age",
        },
        {
          kind: "takeaway",
          text: "Radius-independent reach is **earned, not faked**. A templated city-swap page is a doorway and gets filtered. A real page, with a real job and a real local detail, ranks in the town and compounds for years. The work moves from rent to true content.",
        },
      ],
    },
    {
      id: "organic-dilates-the-pack",
      h2: "How organic prominence dilates your real office's pack radius",
      navLabel: "Organic dilates the pack",
      blocks: [
        { kind: "p", text: "Here is the mechanism that ties the two engines together, and it runs in your favor. The two gates are not fully independent." },
        { kind: "p", text: "Google leans on organic prominence, the overall authority and trust of your brand and domain across the web, as one of the signals that decides which businesses survive the proximity filter at all. A business the rest of the web treats as the authority gets more benefit of the doubt on distance. So the deeper and more authoritative your site, the **further your real office's pin reaches** before distance overrules it." },
        { kind: "p", text: "Read that carefully, because it is the payoff. Building organic does not just win the considered research in towns you have no office in." },
        { kind: "p", text: "It also **dilates the pack radius of the office you do have**. The five-mile band is not a fixed wall; it stretches for a prominent brand and shrinks for an unknown one." },
        { kind: "p", text: "The contractor who builds deep authority is widening his real pin while he reaches the rest of the region with pages. The contractor who only chases the pack is stuck with the narrowest possible band, because he gave Google no prominence signal to widen it with." },
        {
          kind: "comparison",
          leftLabel: "Pack only",
          rightLabel: "Pack + organic authority",
          rows: [
            { label: "Real office pin radius", brochure: "Narrow", system: "Dilated", flag: "MODELED" },
            { label: "Towns reached with no office", brochure: "Zero", system: "The matrix", flag: "MEASURED" },
            { label: "Considered high-ticket research", brochure: "Missed", system: "Won", flag: "MEASURED" },
            { label: "Cost to add a town", brochure: "A lease", system: "A row of pages", flag: "MODELED" },
            { label: "Asset over time", brochure: "Rented", system: "Owned, compounds", flag: "MEASURED" },
          ],
        },
        {
          kind: "p",
          text: "This is why the sequence matters. Build the organic authority first, and three things happen at once: the existing office's pack radius dilates, the rest of the region opens through the matrix without rent, and you have a real prominence signal to lean a future satellite against if you ever do plant one. Plant satellites first, with a thin site underneath, and you pay rent in every town while the pins stay stuck at the narrowest band, because nothing on the web told Google you were the authority worth widening for.",
        },
        {
          kind: "takeaway",
          text: "Organic prominence is a **pack ranking signal**, so a deep authoritative site dilates your real office's five-mile band instead of leaving it at the narrowest setting. Authority widens the pin you have and reaches the towns you do not, at the cost of pages instead of leases.",
        },
      ],
    },
    {
      id: "the-decision",
      h2: "The decision: rank the region, plant the pin where the proximity job lives",
      navLabel: "The decision",
      blocks: [
        { kind: "p", text: "Put it together into a rule you can run. Default to organic for reach, because it is radius-independent, it compounds, it is owned rather than rented, and it dilates the office you already have." },
        { kind: "p", text: "The service-by-location matrix is how one location serves a region: a row of real pages per town, each earning its rank honestly. That is the engine that scales, and it scales without a lease in every market." },
        { kind: "p", text: "Plant a satellite only where the **proximity job** is the prize: a town where the urgent, close, now-searching demand is large enough that a five-mile band, two years of patience, and a roughly ten-job-a-month ceiling pay for the rent and staffing. That is a real and bounded calculation, not a default." },
        { kind: "p", text: "The pack catches proximity. The pin is how you reach it." },
        { kind: "p", text: "But it is one tool for one job, and most of the region is not a proximity job. Most of the region is the considered, high-ticket research that organic wins from an office twenty miles away." },
        { kind: "p", text: "Promise the floor, project the ceiling. The floor a satellite promises is its capped band and its slow trickle of close-by jobs." },
        { kind: "p", text: "The ceiling organic projects is a whole region of towns reached through real pages, an owned asset that compounds for years while your competitors pay rent for pins stuck at the narrowest radius. Sequence it right: build the [deep authority site](/playbook/the-asset-your-website) first, let it dilate the office you have and reach the towns you do not, and plant a pin only where the proximity math actually clears." },
        {
          kind: "p",
          text: "Reach is pages, not leases. Proximity is the one job a pin does that pages cannot. Next: read [organic versus the map pack](/playbook/organic-vs-the-map-pack) for how the two engines split the work in full, or run your own site through the [free audit](/audit) and count how many towns your pages actually reach.",
        },
      ],
    },
  ],
};
