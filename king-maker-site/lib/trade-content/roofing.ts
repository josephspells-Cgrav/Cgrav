import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-an-authority-roofing-site-ships",
      h2: "What does an authority roofing site actually ship?",
      navLabel: "What it ships",
      speakable: true,
      blocks: [
        { kind: "p", text: "A brochure roofing site ships about ten pages: a homepage, an about, a contact, a gallery, and a flat list of services nobody can search for. An authority roofing site ships a structure." },
        { kind: "p", text: "Our live reference build runs **147 pages**, roughly fifteen times the brochure, and every page exists to answer one specific query a roof buyer is already typing. The difference is not decoration." },
        { kind: "p", text: "The brochure describes the company. The authority site captures the demand." },
        { kind: "p", text: "The structure has layers, and each layer does a job. **Service pages** carry the work the company sells: roof replacement, roof repair, storm damage, roof inspection, gutters, and commercial roofing." },
        { kind: "p", text: "**Location pages** carry the geography the company serves, one page per town, never one page with a list of towns. **Project pages** carry proof: real completed jobs, with real photos and the real address, because a finished roof in a buyer's own neighborhood closes harder than any stock image. **Cost guides** and **material comparisons** carry the research a buyer does before they ever call." },
        { kind: "p", text: "Stack those layers and the page count is not padding. It is coverage." },
        { kind: "p", text: "Every service the company performs, multiplied by every town it serves, multiplied by the questions a buyer asks before buying, is a finite set of pages with a finite ceiling. The brochure leaves that ceiling almost entirely on the table. The system claims it." },
        {
          kind: "chart",
          chart: "page-count",
        },
        {
          kind: "takeaway",
          text: "Ten pages describe a roofer. 147 pages capture the market a roofer competes in. The page count is the coverage, and the coverage is the moat.",
        },
      ],
    },
    {
      id: "service-location-matrix",
      h2: "Why the service-by-location matrix is the engine",
      navLabel: "The matrix",
      blocks: [
        {
          kind: "p",
          text: "Every roof buyer searches the same way: a service plus a place. \"Roof replacement Raleigh.\" \"Storm damage repair Cary.\" \"Metal roof installation Durham.\" The query is two-dimensional, so the site has to be two-dimensional. List your six services down one axis and your service towns across the other, and every cell in that grid is a real search with real intent and a real page that should own it.",
        },
        {
          kind: "chart",
          chart: "matrix",
        },
        { kind: "p", text: "The brochure site has neither axis built out. It names its services once on a single page and names its towns once in a footer." },
        { kind: "p", text: "So when a buyer searches \"roof repair\" plus their specific town, the brochure has no page that matches, and the search engine has nothing to rank. The authority site has a dedicated page for that exact intersection, written for that town, about that service. Six services across a dozen towns is over seventy pages before a single cost guide or project page is added, and every one of them is a door a competitor left unbuilt." },
        { kind: "p", text: "The matrix also explains why this compounds instead of decaying. The brochure spends to be seen and stops being seen the day it stops spending." },
        { kind: "p", text: "The matrix is owned inventory: each cell, once it ranks, keeps ranking and keeps returning visitors at no marginal cost. That is the difference between renting attention and owning it." },
        {
          kind: "comparison",
          leftLabel: "Brochure",
          rightLabel: "Authority system",
          rows: [
            { label: "Service pages", brochure: "1", system: "6+", flag: "MEASURED" },
            { label: "Location pages", brochure: "0", system: "12+", flag: "MEASURED" },
            { label: "Service x location cells covered", brochure: "Narrow", system: "Wide", flag: "MEASURED" },
            { label: "Total indexed pages", brochure: "~10", system: "147", flag: "MEASURED" },
            { label: "Cost per visit at maturity", brochure: "High", system: "Low", flag: "MODELED" },
          ],
        },
        {
          kind: "takeaway",
          text: "Buyers search service plus place. A site that is not built on both axes cannot rank for the way people actually search. The matrix is not a content strategy. It is the shape of the demand.",
        },
      ],
    },
    {
      id: "the-long-tail-and-time",
      h2: "Why coverage and age beat a thin, new site",
      navLabel: "Long tail and time",
      blocks: [
        { kind: "p", text: "Most search demand does not live in the handful of fat keywords every roofer fights over. It lives in the tail." },
        { kind: "p", text: "**95% of all queries get ten or fewer searches a month**, and that long, thin spread of specific questions is exactly what a 147-page site is built to catch. A brochure with ten pages catches a sliver of the head and none of the tail." },
        { kind: "p", text: "The penalty for thin is brutal: **96.55% of all web pages get zero traffic from Google**. Most pages on the internet are invisible, and the thin site is mostly invisible pages." },
        {
          kind: "chart",
          chart: "long-tail",
        },
        { kind: "p", text: "Coverage is one half of why authority wins. Time is the other." },
        { kind: "p", text: "Ranking is accumulated, not bought. **72.9% of the pages sitting in the top ten are three or more years old**, and the average page holding the number-one spot is **five years old**." },
        { kind: "p", text: "That is not a coincidence. It is the search engine trusting pages that have survived. The lesson is not patience for its own sake; it is that the clock starts the day the page is published, so the right move is to publish the full structure now and let every page begin aging today rather than next year." },
        { kind: "p", text: "Put coverage and time together and the brochure's disadvantage is structural, not cosmetic. The brochure can repaint its homepage every season and it will still own ten thin, undifferentiated pages with no tail and no accumulated trust." },
        { kind: "p", text: "The authority site owns the tail and starts the clock on 147 pages at once. You cannot fast-forward five years, but you can start all 147 clocks on day one." },
        {
          kind: "takeaway",
          text: "The money is in the tail, and the rank is in the years. A wide site published today catches the tail other roofers ignore and starts aging every page at once. Authority is accumulated time.",
        },
      ],
    },
    {
      id: "industry-specific-pages",
      h2: "Which roofing-specific pages a buyer demands before they call",
      navLabel: "Roofing pages",
      blocks: [
        { kind: "p", text: "A roof is one of the largest single expenses a homeowner faces, so the buyer researches it like one. They do not call first and learn later." },
        { kind: "p", text: "They learn first, build a shortlist, and call the names they already trust. **78% of buyers shortlist three vendors or fewer**, and **95% choose a company that was on their shortlist from day one**. The pages below are how a roofer gets onto that day-one shortlist instead of fighting to crash it later." },
        {
          kind: "list",
          items: [
            "Roof cost calculator: an interactive estimator that turns the most-asked question into a captured lead instead of a bounce. The buyer gets a number; the roofer gets a name.",
            "\"How much does a roof cost\": the single highest-volume research query in the trade, answered directly and answer-first, with ranges by material and size rather than a coy \"call for pricing.\"",
            "Shingle vs metal: the comparison every buyer runs before they commit. One page that lays out lifespan, cost, weight, and warranty side by side, and earns the buyer's trust by being straight about both.",
            "Storm and insurance-claim guide: how hail and wind damage gets documented and filed, written to be genuinely useful and strictly compliant with North Carolina law.",
            "Materials glossary: the asphalt, architectural, standing-seam, underlayment, and ridge-vent vocabulary a buyer needs to follow a quote, which doubles as a wide net of definition pages the AI answer engines pull from.",
          ],
        },
        {
          kind: "definition",
          term: "Answer-first page",
          def: "A page that states the direct answer in the first sentence, before any preamble, so both a skimming buyer and an AI answer engine can extract it. \"A new asphalt roof in North Carolina typically runs X to Y\" beats three paragraphs of throat-clearing.",
        },
        { kind: "p", text: "These pages also feed a surface the brochure ignores entirely: the AI answer box. AI Overviews have cut clicks to the top organic result from roughly **34.5% in April 2025 to about 58% by December 2025**, and **60% of searches now end without a click**." },
        { kind: "p", text: "But a page that gets cited by the AI earns about **35% more organic clicks**, and **88% of the URLs the AI cites do not rank in the top ten** of the normal results. Citation is its own race, won by clean, answer-first, well-structured pages, and the brochure is not even entered." },
        { kind: "p", text: "On the storm and insurance guide specifically, the line is bright and it does not move. The page educates: how to document hail bruising and wind lift, what an adjuster looks for, how the claim timeline works." },
        { kind: "p", text: "It never promises to waive or absorb a deductible, never offers to act as a public adjuster, and never guarantees a claim outcome. North Carolina enforces those rules, and a guide that respects them builds more trust than one that overpromises and exposes the client." },
        {
          kind: "priceRange",
          title: "Illustrative NC roof cost ranges",
          rows: [
            { label: "Asphalt 3-tab replacement", range: "$6,000 - $12,000", detail: "Budget shingle, shortest lifespan" },
            { label: "Architectural shingle replacement", range: "$9,000 - $18,000", detail: "Most common NC choice" },
            { label: "Standing-seam metal", range: "$18,000 - $40,000", detail: "Longest lifespan, highest upfront" },
            { label: "Roof repair (localized)", range: "$400 - $2,500", detail: "Leak, flashing, or section repair" },
          ],
          note: "ILLUSTRATIVE ranges for orientation only. Actual pricing depends on roof size, pitch, access, material, and current market. Always verified against a real on-site inspection, never quoted blind, and never paired with deductible or guaranteed-claim language.",
        },
        {
          kind: "takeaway",
          text: "Buyers research a roof before they call, then call the names they already trust. The calculator, the cost answer, the material comparison, and the compliant storm guide are how a roofer earns the day-one shortlist instead of fighting to crash it.",
        },
      ],
    },
    {
      id: "channels-and-the-pack",
      h2: "How organic, the map pack, and ads divide the work",
      navLabel: "Channels and pack",
      blocks: [
        { kind: "p", text: "Authority organic does not win because it converts a click better than an ad. It wins on three other things: cost, durable volume, and trust." },
        { kind: "p", text: "A mature organic lead costs roughly **$30**. The same lead through pay-per-click runs around **$228**, and through Local Service Ads about **$162**." },
        { kind: "p", text: "The ad stops the day the budget stops. The ranked page keeps working. Organic is the owned asset; paid is rented reach." },
        {
          kind: "chart",
          chart: "mechanism-ledger",
        },
        { kind: "p", text: "This is a division of labor, not a turf war. The three channels catch three different buyers." },
        { kind: "p", text: "**Authority organic catches the considered research**, the buyer comparing materials and reading cost guides over weeks. **The map pack catches proximity**, the buyer who searches and picks from the three names nearest them." },
        { kind: "p", text: "**Ads catch the emergency**, the buyer whose roof is leaking tonight and who clicks the first credible result. A roofer that runs organic and paid together lifts total clicks by about **50%** and conversions by about **27%**. They are additive, not redundant." },
        { kind: "p", text: "Be honest about the map pack, because the honesty is the strategy. The pack is **proximity-capped at roughly five miles**, so it cannot carry a regional business by itself." },
        { kind: "p", text: "Early on it tends to produce on the order of **one or two jobs a month**, not a flood, and it climbs toward something like ten a month only near a two-year maturity ceiling. A roofer that wants to grow past a single neighborhood needs organic regional reach, because organic is the only channel that scales past the radius of one office." },
        {
          kind: "debunk",
          myth: "Nobody clicks organic results anymore, the ads eat everything.",
          reality: "Organic still carries the durable, lowest-cost volume, and running it alongside paid lifts total conversions about 27%.",
          why: "Ads buy speed and catch the emergency click, which is real and worth paying for. But the ad is rented and stops when the budget stops. The ranked page is owned, compounds over years, and a regional roofer cannot scale on a five-mile pack alone. Different channels, different jobs, all three working.",
        },
        {
          kind: "takeaway",
          text: "Organic wins on cost, durable volume, and trust, not on a higher conversion rate. The pack catches proximity, ads catch the emergency, and authority organic catches the considered research that scales a roofer past one neighborhood.",
        },
      ],
    },
    {
      id: "real-jobs-only",
      h2: "Why every location and project page comes from a real job",
      navLabel: "Real jobs only",
      blocks: [
        {
          kind: "antiDoorway",
        },
        { kind: "p", text: "The matrix is powerful, which is exactly why it has to be governed. The lazy version of a wide site is the doorway: a hundred near-identical pages where only the town name changes, mass-produced to game the index." },
        { kind: "p", text: "Search engines have hunted that pattern for years and they penalize it. A page that fails the delete-the-city-name test, where swapping the town leaves the copy otherwise unchanged, is a doorway, and it puts the whole domain at risk." },
        { kind: "p", text: "The rule that keeps the matrix clean is simple and absolute: **a real job earns a page**. A location page exists because the roofer has actually worked in that town, and it carries the real proof." },
        { kind: "p", text: "The neighborhood, the storm that hit it, the specific code or HOA quirk, the photographed job down the street. A project page is a single completed roof with its real address, real materials, and real before-and-after." },
        { kind: "p", text: "That specificity is what makes the page rank, because it is what makes the page true. The brochure cannot fake its way to coverage, and neither can the authority site. It earns coverage one real roof at a time." },
        {
          kind: "takeaway",
          text: "Width without truth is a doorway, and doorways get penalized. Every location and project page is backed by a real job, so the coverage is earned, not generated, and the specificity that makes it honest is the same specificity that makes it rank.",
        },
        {
          kind: "p",
          text: "Coverage, time, the calculator, the compliant storm guide, the three channels working together, all of it rests on that one discipline: real work, real pages, no shortcuts. To see where a specific roofer stands against this standard, start with the [free site audit](/audit), or read how the same structure plays out in the [storm and insurance-claim guide](/guides/trades/roofing) and across the other [trade guides](/guides/trades).",
        },
      ],
    },
  ],
};
