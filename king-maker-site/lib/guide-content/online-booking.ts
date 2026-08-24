import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-online-booking-does",
      h2: "What does online booking do, and why does it capture more leads?",
      navLabel: "What it does",
      speakable: true,
      blocks: [
        { kind: "p", text: "Online booking lets a visitor pick a time and schedule an appointment themselves, right on your website, without waiting for anyone to call them back. They see your open slots, choose one, and they are on the calendar." },
        { kind: "p", text: "It captures more leads because it catches the buyer at the exact moment they decide to act. Instead of a form that promises a callback, the page lets the ready buyer lock in a time while the decision is still hot." },
        { kind: "p", text: "That ready buyer is the one you cannot afford to lose. Booking holds onto them in the moment, before the interest cools and before they book with the next company that made it easy." },
        { kind: "takeaway", text: "Online booking lets a ready buyer book themselves on the spot. It captures the lead at peak intent instead of losing it to a callback wait." },
      ],
    },
    {
      id: "the-callback-gap",
      h2: "Why does a callback wait lose the ready buyer?",
      navLabel: "The callback gap",
      blocks: [
        { kind: "p", text: "Because the gap between I want to book this and someone gets back to me is where ready buyers go cold. They decided to act, and then nothing happened, so the urgency drained away." },
        { kind: "p", text: "A buyer ready at 8pm does not stay ready until you return the call at 11am the next day. By then they have kept looking, found someone with an open calendar, and booked there instead." },
        { kind: "p", text: "Every hour of that wait is a chance for the lead to cool off or for a competitor to grab them. How fast you respond is one of the biggest hidden factors in whether a ready buyer becomes a paying job." },
        { kind: "p", text: "Online booking closes the gap to zero. The buyer acts in the moment they are ready, the appointment is set, and there is no window for the interest to fade or for someone else to step in." },
        {
          kind: "comparison",
          leftLabel: "Call us back form",
          rightLabel: "Online booking",
          rows: [
            { label: "When the appointment is set", brochure: "After a callback", system: "In the moment", flag: "ILLUSTRATIVE" },
            { label: "The buyer's urgency", brochure: "Draining away", system: "Captured at its peak", flag: "ILLUSTRATIVE" },
            { label: "Window for a competitor", brochure: "Hours, sometimes days", system: "None", flag: "ILLUSTRATIVE" },
            { label: "Who does the work", brochure: "Your office, by phone", system: "The buyer, themselves", flag: "ILLUSTRATIVE" },
          ],
        },
      ],
    },
    {
      id: "why-buyers-prefer-to-book-themselves",
      h2: "Why do many buyers prefer to book themselves?",
      navLabel: "Buyers prefer it",
      blocks: [
        { kind: "p", text: "Because plenty of people would rather pick a time on a screen than get on the phone. Booking themselves is faster, it can happen after hours, and it skips the small friction of a sales call they are not ready to have." },
        { kind: "p", text: "A buyer reading your site at 10pm cannot call your office, but they can book. Self-scheduling captures the lead in the off-hours window when the phone is the one thing that will not work." },
        { kind: "p", text: "It also feels like control, and control builds trust. The buyer chooses the time that fits their life, sees it confirmed, and arrives at the appointment already committed because they set it up themselves." },
        { kind: "list", ordered: false, items: [
          "It works after hours, when your phone line does not.",
          "It is faster than a phone call for a buyer who already decided.",
          "It removes the friction of a sales call before they are ready for one.",
          "It gives the buyer control over the time, which builds commitment.",
        ] },
      ],
    },
    {
      id: "booking-as-the-front-door",
      h2: "How does booking fit with the rest of your site?",
      navLabel: "The front door",
      blocks: [
        { kind: "p", text: "Booking is the finish line for the work your other pages did. The cost guide and the estimate tool answer the buyer's questions; booking captures the moment those answers turn into a decision." },
        { kind: "p", text: "Put the booking option where the intent peaks: at the end of a price page, beside an estimate, on the contact page. The buyer who just got their answer is the buyer most ready to act, so that is where the calendar belongs." },
        { kind: "p", text: "Make it easy and make it honest. A clear set of open times, a plain confirmation, and no surprise commitments, so the buyer trusts the slot they just picked." },
        { kind: "p", text: "Together the pieces form one path: a number answers the price question, the estimate tool sizes the job, and booking captures the ready buyer before the moment passes. See how that path starts in [The instant estimate tool](/guides/instant-estimate-tool), or [run the audit](/audit) to see whether your own site lets a ready buyer act at all." },
      ],
    },
  ],
};
