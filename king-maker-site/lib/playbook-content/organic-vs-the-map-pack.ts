import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-pack-is-not-the-prize",
      h2: "Why the map pack is not the prize most contractors think it is",
      navLabel: "The pack myth",
      speakable: true,
      blocks: [
        { kind: "p", text: "Every contractor wants the map pack. The three businesses with the pins, sitting above the organic results, owning the top of the screen." },
        { kind: "p", text: "So the entire industry chases it, and the entire industry mistakes it for the prize. It is not the prize. It is a proximity lottery with a hard ceiling, and the ceiling is low." },
        { kind: "p", text: "The map pack is **doubly gated**. First by proximity: Google measures the distance between the searcher and your office, and that distance is the dominant filter." },
        { kind: "p", text: "A pin five miles from the searcher loses to a pin two miles away before review count or page quality even enters the math. Second by review volume and velocity: among the businesses that survive the proximity filter, Google ranks by who has more reviews and who is earning them faster. You can be the best roofer in the county and still never appear in the pack for a searcher on the wrong side of town." },
        { kind: "p", text: "That is the structural truth nobody selling map-pack services wants to say out loud. The pack does not reward the best contractor." },
        { kind: "p", text: "It rewards the closest contractor who also has reviews. Distance is a fact about geography, not a fact about you, and you cannot out-work geography from a single office." },
        {
          kind: "takeaway",
          text: "The map pack is proximity-capped and review-gated. It rewards the closest business with reviews, not the best one. Win it, but never build your growth plan on it.",
        },
      ],
    },
    {
      id: "the-five-mile-ceiling",
      h2: "The map pack has a five-mile ceiling and a two-year timeline",
      navLabel: "The 5-mile ceiling",
      blocks: [
        { kind: "p", text: "Proximity does not just pick winners. It draws a radius." },
        { kind: "p", text: "For most service searches the pack effectively serves a band of roughly five miles around the searcher, and your office sits at the center of your own band. A single location reaches one band." },
        { kind: "p", text: "The neighborhoods past it belong to whoever has a pin closer to those neighborhoods. No amount of reviews moves your office. The pin is where the building is." },
        { kind: "p", text: "Run the math on what that radius actually delivers. Early in a campaign, a freshly optimized profile with a steady review habit produces on the order of **one to two jobs a month** from the pack." },
        { kind: "p", text: "That figure is modeled, so claim the shape, not the count: the shape is a thin trickle, not a flood. As the profile matures, the review base deepens, and Google trusts the listing more, that number climbs toward **roughly ten jobs a month**, and it gets there at about a **two-year ceiling**. Two years of disciplined review collection to reach a ceiling a five-mile radius will not let you exceed." },
        { kind: "p", text: "Ten jobs a month from a capped channel is real money and worth having. It is not a $5M business." },
        { kind: "p", text: "You cannot scale to eight figures on a five-mile radius, because the radius does not stretch when you grow. It is a near-default byproduct of doing the local basics right, and it tops out exactly where geometry says it tops out." },
        {
          kind: "list",
          ordered: false,
          items: [
            "Reach: one office serves roughly one five-mile band. New territory needs a new physical pin, not better reviews.",
            "Early yield: about one to two jobs a month (modeled, the shape is a trickle).",
            "Mature yield: toward ten jobs a month, reached at a roughly two-year ceiling.",
            "Best fit: the proximity and emergency slice. The searcher who needs someone close, now.",
          ],
        },
      ],
    },
    {
      id: "why-organic-has-no-ceiling",
      h2: "Why organic ranking has no proximity penalty and no ceiling",
      navLabel: "Organic has no ceiling",
      blocks: [
        { kind: "p", text: "Organic search obeys none of the rules that cap the pack. The blue results below the map do not measure how far you sit from the searcher." },
        { kind: "p", text: "They measure how well your page answers the query. A page about a metal roof replacement in a specific town ranks for that town whether your office is two miles away or twenty." },
        { kind: "p", text: "The proximity penalty that caps the pack does not exist in organic. That single difference changes the entire size of the prize." },
        { kind: "p", text: "Organic is also **owned, not rented**. The pack is a position you hold only as long as you keep feeding it reviews and as long as a closer competitor does not open down the street." },
        { kind: "p", text: "Ranked pages are an asset that sits on a domain you control and **compound over time**. Authority is accumulated time: the data is blunt about it." },
        { kind: "p", text: "**72.9% of the pages in the top ten results are three or more years old, and the average number-one page is five years old** (measured). A page you publish today is depositing into an account that pays out for years. The map pin resets toward whoever is closest the moment a competitor moves in." },
        {
          kind: "chart",
          chart: "compounding",
        },
        { kind: "p", text: "And organic captures demand the pack physically cannot see: the **long tail**. **95% of all search queries get ten or fewer searches a month** (measured), which means the money is not in a handful of fat head terms." },
        { kind: "p", text: "It is spread across thousands of specific, low-volume, high-intent queries: a roof type, a town, a problem, a brand. **96.55% of all web pages get zero traffic from Google** (measured), because a ten-page brochure has nothing to rank for the long tail with." },
        { kind: "p", text: "A deep site with a page for every service in every town does. The pack returns three pins for a head term. Organic returns your page for ten thousand specific ones." },
        {
          kind: "takeaway",
          text: "Organic has no proximity penalty, it is an owned asset that compounds, and it captures the long-tail demand a three-pin pack cannot. That is why it has no ceiling.",
        },
      ],
    },
    {
      id: "pack-vs-organic",
      h2: "Map pack versus organic, line by line",
      navLabel: "Pack vs organic",
      blocks: [
        { kind: "p", text: "Set the two channels side by side and the difference stops being a matter of opinion. One is a capped local proximity lottery." },
        { kind: "p", text: "The other is an uncapped owned asset. They are not competing for the same job, and they are not the same size of opportunity." },
        {
          kind: "comparison",
          leftLabel: "Map pack",
          rightLabel: "Organic",
          rows: [
            { label: "Proximity penalty", brochure: "~5 mi cap", system: "None", flag: "MEASURED" },
            { label: "Reach per location", brochure: "One band", system: "Unbounded", flag: "MODELED" },
            { label: "Growth ceiling", brochure: "~10 jobs/mo", system: "No ceiling", flag: "MODELED" },
            { label: "Asset ownership", brochure: "Rented", system: "Owned", flag: "MEASURED" },
            { label: "Compounds over time", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Captures long tail", brochure: "No", system: "Yes", flag: "MEASURED" },
            { label: "Time to maturity", brochure: "~2 yr ceiling", system: "Builds for years", flag: "MODELED" },
          ],
        },
        { kind: "p", text: "Read the table the right way. The pack column is not a list of failures." },
        { kind: "p", text: "It is a list of limits. Within those limits the pack is good: it catches the searcher who wants someone close and wants them now." },
        { kind: "p", text: "The organic column is not a list of bragging rights. It is a description of a different and larger machine, one that gets stronger every month instead of resetting toward whoever is nearest." },
        {
          kind: "chart",
          chart: "mechanism-ledger",
        },
      ],
    },
    {
      id: "deliver-the-pack-dont-center-it",
      h2: "Deliver the map pack, but never center your strategy on it",
      navLabel: "Deliver, don't center",
      blocks: [
        { kind: "p", text: "None of this means abandon the pack. It means understand what each channel is for and stop asking one to do the other's job." },
        { kind: "p", text: "The pack catches proximity and the emergency. Authority organic wins the considered, high-ticket research, the homeowner who spends weeks deciding who replaces a $30,000 roof." },
        { kind: "p", text: "Ads buy day-one speed and catch the urgent searcher before your organic has matured. Three jobs, three tools." },
        { kind: "p", text: "You deliver all three. You center the one with no ceiling." },
        { kind: "p", text: "Delivering the pack is fulfillment, and the basics do the work: a complete and correct Google Business Profile, the right primary category, a steady review-collection habit because velocity is the fastest lever you control, and consistent business information across the major aggregators. Done with discipline, the pack arrives as a near-default byproduct." },
        { kind: "p", text: "That is exactly why it should not be the headline. A near-default byproduct is not a strategy, it is table stakes, and table stakes do not scale to $5M." },
        { kind: "p", text: "The contractor who only chases the pack hits the two-year ceiling and stalls inside a five-mile radius, wondering why the growth stopped. The contractor who builds the [deep authority site](/playbook/the-asset-your-website) collects the pack on the way past it and keeps climbing, town by town, page by page, with no ceiling waiting." },
        { kind: "p", text: "Promise the floor, the pack and its trickle of close-by jobs. Project the ceiling, the organic asset that compounds for years." },
        {
          kind: "takeaway",
          text: "Win the pack, because it is table stakes and it catches the close, urgent job. Build organic, because it is the only channel without a ceiling. Deliver both, center the one that scales.",
        },
        { kind: "p", text: "The pack catches proximity. Ads catch the emergency." },
        { kind: "p", text: "The deep site wins the research and compounds while you sleep. Next: [organic versus ads](/playbook/organic-vs-ads), where the real cost-per-lead math gets settled, or run your own site through the [free audit](/audit) and see what the brochure is leaving on the table." },
      ],
    },
  ],
};
