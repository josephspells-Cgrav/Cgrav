import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "where-ads-win",
      h2: "Where do ads still beat organic?",
      navLabel: "Where ads win",
      speakable: true,
      blocks: [
        { kind: "p", text: "Two places, and they're real: the **emergency job** and **day-one speed**. Organic can't give you either, so this is exactly where ads earn their keep." },
        { kind: "p", text: "Start with the emergency. The homeowner with water pouring through the ceiling at 9pm is not reading a 1,500-word guide on shingle grades." },
        { kind: "p", text: "They click the first credible result that says it answers right now — and that result is the ad. Urgent buyers don't research. They pick fast, and ads are built to be picked fast." },
        { kind: "p", text: "Now speed. On day one, before a single page has climbed the rankings, an ad puts you in front of buyers this afternoon. You flip a switch and the phone can ring the same day." },
        { kind: "takeaway", text: "Ads own the **emergency** (the buyer who clicks now, doesn't read) and **day-one speed** (leads this afternoon, before any page ranks). Organic gives you neither — so this is where paid genuinely wins." },
      ],
    },
    {
      id: "ads-while-organic-matures",
      h2: "How do ads cover you while organic is still growing?",
      navLabel: "Ads buy time",
      blocks: [
        { kind: "p", text: "Organic takes months to mature. Ads fill that exact gap — they pay the bills while your pages climb." },
        { kind: "p", text: "A new page ranks for almost nothing at first. That early window, the first several months, is precisely when organic is weakest and you still need leads today." },
        { kind: "p", text: "Ads cover that window. You rent the fast lane now and keep it running until your owned pages take over the work — then you can dial the spend down, because the asset you built is doing the job the rent used to do." },
        { kind: "p", text: "Think of it as renting while you build. The ad spend isn't wasted; it's bridge financing for the months before your site stands on its own." },
        { kind: "takeaway", label: "The short version", text: "Organic is slow to start; ads are instant. Run ads to carry the early months while your pages climb, then ease off as the owned asset takes over." },
      ],
    },
    {
      id: "they-work-together",
      h2: "Do organic and paid actually work better together?",
      navLabel: "Better together",
      blocks: [
        { kind: "p", text: "Yes — and there's measured proof. Running organic and paid at the same time beats running either one alone, because the two reinforce each other." },
        { kind: "p", text: "When a buyer sees your name in the ad slot **and** again in the organic results, you read as a bigger, more established business than a company showing up in just one. The repetition builds trust before they ever call." },
        {
          kind: "comparison",
          leftLabel: "One channel alone",
          rightLabel: "Both together",
          rows: [
            { label: "Total clicks", brochure: "Baseline", system: "+50%", flag: "MEASURED" },
            { label: "Conversions", brochure: "Baseline", system: "+27%", flag: "MEASURED" },
          ],
        },
        { kind: "p", text: "Read that plainly: running both lifts total clicks by roughly **50%** and conversions by roughly **27%** over running either one by itself. The combination is worth more than the two added up." },
        { kind: "p", text: "So the real question was never paid versus organic. It's paid for speed and emergencies now, organic for the durable, owned demand the ads can never buy you — covered in [owned vs. rented](/guides/owned-vs-rented)." },
        { kind: "p", text: "Over time, the math tilts hard toward organic as its cost per lead keeps falling. See [the appreciating asset](/guides/the-appreciating-asset)." },
        { kind: "takeaway", label: "The honest version", text: "It's not either-or. Ads buy speed and catch emergencies; organic owns the durable demand. Run both — together they lift clicks ~50% and conversions ~27% over either alone." },
      ],
    },
  ],
};
