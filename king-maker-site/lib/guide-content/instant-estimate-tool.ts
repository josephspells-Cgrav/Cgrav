import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-an-instant-estimate-tool-does",
      h2: "What is an instant estimate tool, and why does it turn visitors into leads?",
      navLabel: "What it does",
      speakable: true,
      blocks: [
        { kind: "p", text: "An instant estimate tool is a short set of questions on your own website that gives a visitor a price range on the spot. They enter the roof size, the material, and a few details, and a number appears in seconds." },
        { kind: "p", text: "It turns visitors into leads because it meets the buyer at the exact moment they want a number. Instead of a form that promises a callback, the page hands them a real range right then, while they are still reading." },
        { kind: "p", text: "A buyer who is ready to act right now is the most valuable visitor your site gets. The tool catches that person before the moment passes, instead of letting them click away to the next company that gives them a number." },
        { kind: "takeaway", text: "An instant estimate tool answers the buyer's first question, **what does this cost**, on the spot. It catches a ready buyer at the peak of their interest instead of losing them to a callback wait." },
      ],
    },
    {
      id: "why-a-number-now-beats-a-callback",
      h2: "Why does a number now beat a call us back form?",
      navLabel: "A number now",
      blocks: [
        { kind: "p", text: "Because the moment a buyer wants a price is the moment they are most ready to act, and a callback form lets that moment pass. They fill it out, then they wait. While they wait, they keep reading other companies." },
        { kind: "p", text: "By the time the phone rings, the buyer has cooled off and picked someone else. The interest that was hot at 9pm is gone by the time you call at 10am." },
        { kind: "p", text: "An estimate tool removes the wait. It gives the buyer a real answer in the moment they asked, and that answer is what earns their contact details, because now they have a reason to come back to you." },
        { kind: "p", text: "This is the difference between capturing a lead while the interest is hot and trying to win one back after it has gone cold. One keeps the buyer's attention. The other bets it on a return call they may never pick up." },
        {
          kind: "comparison",
          leftLabel: "Call us back form",
          rightLabel: "Instant estimate tool",
          rows: [
            { label: "When the buyer gets a number", brochure: "After a callback", system: "On the spot", flag: "ILLUSTRATIVE" },
            { label: "Buyer's interest at that moment", brochure: "Cooling off", system: "At its peak", flag: "ILLUSTRATIVE" },
            { label: "What you capture", brochure: "A name to chase", system: "A warm, engaged lead", flag: "ILLUSTRATIVE" },
            { label: "If you are slow to respond", brochure: "Lead goes cold", system: "Already engaged", flag: "ILLUSTRATIVE" },
          ],
        },
        { kind: "p", text: "None of this means the tool quotes the final job. It gives an honest range and explains what moves it, then routes a warmer buyer to the conversation where the real number gets set." },
      ],
    },
    {
      id: "the-conversion-lift",
      h2: "How much more does an estimate tool actually convert?",
      navLabel: "The conversion lift",
      blocks: [
        { kind: "p", text: "More than a plain contact form, and the reason is simple: the tool gives before it asks." },
        { kind: "p", text: "A visitor will trade their phone number for a real price range far more readily than for the promise of a call. The exchange feels fair, so more visitors complete it." },
        { kind: "p", text: "As an illustrative figure, a well-built estimate tool can lift visitor-to-lead conversion by roughly **10% to 40%** over a plain form. That is an illustrative range, not a measured promise, and it varies by trade, by traffic, and by how the tool is built. Treat it as the shape of the gain, not a guaranteed number." },
        { kind: "p", text: "The reason behind the lift is the same one behind every page that converts: answer the question the buyer is actually asking, in the moment they are asking it. The tool just does it for the price question, which is the first question every buyer has." },
        { kind: "list", ordered: false, items: [
          "It gives a real answer before it asks for anything, so more visitors engage.",
          "It catches the buyer at peak intent, not after the interest has cooled.",
          "It feels like a fair trade: a price range for a way to follow up.",
          "It hands you a warmer lead, because they have already seen your number and stayed.",
        ] },
      ],
    },
    {
      id: "keep-the-numbers-honest",
      h2: "How do you keep an estimate tool honest and compliant?",
      navLabel: "Keep it honest",
      blocks: [
        { kind: "p", text: "The same way you keep any price content honest: show real ranges, name what moves them, and never promise a number you have not earned with a site visit." },
        { kind: "p", text: "The tool should give a range, not a single figure, and it should tell the buyer plainly that the final price is set by an on-site estimate. That honesty is what makes the range trustworthy instead of a bait number." },
        { kind: "p", text: "Keep the money language clean. State material and labor ranges. Do not promise insurance outcomes, a covered claim, or a waived deductible." },
        { kind: "p", text: "In a regulated trade that line is not optional, and an honest tool respects it. The goal is to build trust with a straight answer, not to win a click with a promise the job cannot keep." },
        { kind: "p", text: "Done right, the estimate tool is the front door of your whole pricing story. It opens with a number, which is what the buyer came for, then connects to the deeper [cost guide](/guides/cost-guide) and the real estimate. See what honest price content does for trust in [What good content gives buyers](/guides/cost-guide), or [run the audit](/audit) to see whether your own site answers the price question at all." },
      ],
    },
  ],
};
