import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "the-funnel",
      h2: "How does website traffic turn into revenue?",
      navLabel: "Traffic to revenue",
      speakable: true,
      blocks: [
        { kind: "p", text: "Traffic becomes revenue in four steps: searches become visits, visits become leads, leads become booked jobs, and booked jobs become dollars." },
        { kind: "p", text: "Each step is a number you can multiply. String them together and you can size what a single page on your site is actually worth." },
        { kind: "p", text: "Let's walk the math with one search term. Every multiplier below is **illustrative** — a worked example to show the shape, not a promise about your market." },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Searches** — how many people type the term each month",
            "**Visits** — the slice of those searchers who land on your page (your capture rate)",
            "**Leads** — the slice of visitors who call or fill out the form",
            "**Booked jobs** — the slice of leads you close",
            "**Revenue** — booked jobs times your average job size",
          ],
        },
        { kind: "takeaway", text: "Revenue is **searches × capture × conversion × close × job size**. Five honest numbers, multiplied. The whole game is moving the one in the middle — how much of the search you capture." },
      ],
    },
    {
      id: "worked-example",
      h2: "The funnel math, worked end to end",
      navLabel: "Worked example",
      blocks: [
        { kind: "p", text: "Take one money term — **\"your service in your city.\"** A term like that pulls roughly **2,000 searches a month** in a mid-size market (illustrative)." },
        { kind: "p", text: "That's the top of the funnel. Two kinds of website do very different things with the same search." },
        { kind: "p", text: "An average contractor site captures about **6%** of that search — call it **120 visits** a month. A deep, well-built system captures around **30%** — about **600 visits**." },
        { kind: "p", text: "Same search. Same town. Five times the traffic, from structure alone." },
        {
          kind: "comparison",
          leftLabel: "Average site",
          rightLabel: "Deep system",
          rows: [
            { label: "Monthly searches for the term", brochure: "2,000", system: "2,000", flag: "ILLUSTRATIVE" },
            { label: "Capture rate", brochure: "~6%", system: "~30%", flag: "ILLUSTRATIVE" },
            { label: "Visits per month", brochure: "~120", system: "~600", flag: "ILLUSTRATIVE" },
            { label: "Leads at ~5% conversion", brochure: "~6", system: "~30", flag: "ILLUSTRATIVE" },
          ],
        },
        { kind: "p", text: "Apply a **5% conversion rate** — five out of a hundred visitors call or request a quote — and the average site produces about **6 leads** a month from this term. The deep system produces about **30**." },
        { kind: "p", text: "That gap, **6 versus 30 leads**, is the entire argument for building the system, and it comes from one term out of hundreds you could own." },
        { kind: "takeaway", label: "The honest version", text: "From one term: ~120 visits and ~6 leads on an average site, ~600 visits and ~30 leads on a deep system. The multipliers are **illustrative** — your real numbers depend on your market, your close rate, and your job size. But the shape holds: capture is the lever." },
      ],
    },
    {
      id: "last-step",
      h2: "From leads to dollars: the last two multipliers",
      navLabel: "Leads to dollars",
      blocks: [
        { kind: "p", text: "Leads aren't revenue yet. Two numbers you already know finish the math: your **close rate** and your **average job size**." },
        { kind: "p", text: "Say you book one in three leads and your average job is $12,000. Thirty leads a month becomes ten jobs, and ten jobs is $120,000 in booked work — from one term (illustrative)." },
        { kind: "p", text: "Plug in your own close rate and your own ticket. Those two are the most honest numbers in the whole chain, because they're yours, not ours." },
        {
          kind: "spec",
          label: "Finish the math with your numbers",
          lines: [
            "Monthly leads × your close rate = booked jobs",
            "Booked jobs × your average job size = monthly revenue from the term",
            "Multiply by 12 for what one page brings in over a year",
          ],
        },
        { kind: "p", text: "Now multiply by the dozens of terms a deep site is built to rank for. That's why the funnel from a system looks nothing like the funnel from a brochure." },
        { kind: "p", text: "We take the per-page math further in [Site equity and compounding](/guides/the-appreciating-asset)." },
        { kind: "takeaway", text: "The last two multipliers are **yours**: close rate and average job size. We hand you the traffic and lead math, illustrative and flagged; you supply the two numbers that turn it into dollars. Honest funnels show their work." },
      ],
    },
    {
      id: "cost-per-lead",
      h2: "What those leads cost: organic versus paid",
      navLabel: "Cost per lead",
      blocks: [
        { kind: "p", text: "A lead from the site isn't just a lead. At scale, it's a much cheaper lead than the same one bought from ads." },
        { kind: "p", text: "Mature organic runs about **$30 per lead**. Google pay-per-click ads (PPC) run about **$228**, and Local Services Ads about **$162** (measured ranges)." },
        { kind: "p", text: "Same buyer, same job, a fraction of the cost — once the asset is mature." },
        {
          kind: "comparison",
          leftLabel: "Channel",
          rightLabel: "Cost per lead",
          rows: [
            { label: "Google / PPC", brochure: "Paid", system: "~$228", flag: "MEASURED" },
            { label: "Local Services Ads", brochure: "Paid", system: "~$162", flag: "MEASURED" },
            { label: "Organic (mature)", brochure: "Owned", system: "~$30", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "The word that matters is **mature**. Early on, a new page is still climbing and the cost per lead is high, the same way a new ad campaign is." },
        { kind: "p", text: "The difference is where the line goes. Paid stays flat forever; organic falls as the asset compounds, then settles far below paid and stays there." },
        { kind: "p", text: "We pull the full channel comparison apart in [Organic vs. paid](/guides/owned-vs-rented)." },
        { kind: "takeaway", label: "The honest version", text: "Mature organic leads cost ~$30 against ~$228 for PPC (measured). \"Mature\" is load-bearing — early leads cost more while the page climbs. The payoff is the curve: paid stays flat, organic drops below it and holds. Promise the floor, project the ceiling." },
      ],
    },
  ],
};
