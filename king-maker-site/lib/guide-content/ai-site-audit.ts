import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "audit-with-ai",
      h2: "Audit your site with AI: the copy-paste prompt",
      navLabel: "Audit with AI",
      speakable: true,
      blocks: [
        { kind: "p", text: "You do not need an agency to find out what is wrong with your website. You can have an AI audit it for you in about two minutes, for free." },
        { kind: "p", text: "The tools that answer questions — ChatGPT, Gemini, and Claude — can read a web page the way a search engine does and tell you in plain English what it is missing." },
        { kind: "p", text: "We wrote the prompt for you. Paste your site into it, run it, and read the result. The full prompt and a copy button are right below." },
        { kind: "p", text: "One honest note before you start. This audit reflects what is on your site today, the pages, the code, the structure. It tells you what you are missing." },
        { kind: "p", text: "It does not, and cannot, promise you a ranking. No prompt and no agency can. Ranking is earned over time, so treat the result as a clear-eyed inspection, not a forecast." },
        { kind: "takeaway", text: "Any AI assistant — ChatGPT, Gemini, or Claude — can audit your site in two minutes for free. Paste your URL into the prompt below and read what it finds. The audit reflects your **site**: what is there and what is missing. It never promises a **ranking**." },
      ],
    },
    {
      id: "how-to-run-it",
      h2: "How to run the prompt",
      navLabel: "How to run it",
      blocks: [
        { kind: "p", text: "This is built so a non-technical owner can do it. No tools to install, no code to write." },
        { kind: "list", ordered: true, items: [
          "Open any AI assistant: ChatGPT, Gemini, or Claude. The free version of any of them works.",
          "Click the copy button on the prompt below to grab the whole thing.",
          "Paste it into the chat, then replace the placeholder with your own website address (for example, yourcompany.com).",
          "Press enter and give it a moment to read your site and write the report.",
        ] },
        { kind: "p", text: "If the assistant says it cannot open the link, that itself is a finding worth noting. A page an AI cannot read is a page an AI cannot cite or recommend, and that is one of the exact problems a good site fixes." },
        { kind: "p", text: "When that happens, paste the prompt and then paste the visible text of your homepage under it. The audit still works on the words, even if the assistant could not crawl the live page." },
        { kind: "takeaway", text: "Open any free AI assistant, copy the prompt, paste it, swap in your web address, and hit enter. If it cannot read your site at all, that is a red flag in itself — paste your homepage text and run it anyway." },
      ],
    },
    {
      id: "the-prompt",
      h2: "The copy-paste audit prompt",
      navLabel: "The prompt",
      blocks: [
        { kind: "p", text: "Here is the prompt. It is hardened to ask the right questions in the right order, so the report comes back specific instead of vague." },
        { kind: "auditPrompt" },
        { kind: "p", text: "It checks the things that actually decide whether a search engine and an AI can find you: your pages, your titles, your structured data, your speed, and whether you answer the questions buyers type." },
        { kind: "p", text: "Run it on your own site first. Then run it on your top competitor and read the two reports side by side. That comparison tells you more than either one alone." },
        { kind: "takeaway", text: "Copy the prompt above, run it on your site, then run it on a competitor. Two reports side by side show you the **gap** — exactly where they are ahead and exactly where you can pass them." },
      ],
    },
    {
      id: "how-to-read-the-result",
      h2: "How to read the result",
      navLabel: "Reading the result",
      blocks: [
        { kind: "p", text: "The report will be a list of findings. Do not get lost in the wording. You are looking for a few specific things." },
        { kind: "list", items: [
          "How many real pages do you have? A handful means a brochure. A search engine can only rank pages that exist.",
          "Do your page titles name the service and the city? Generic titles like 'Home' match nothing a buyer searches.",
          "Do you have business schema, the machine-readable markup? Without it, Google and AI have to guess what you are and where.",
          "Is the site fast on a phone? A slow page bleeds visitors and loses rank before anyone reads a word.",
          "Does each page answer the question first? Pages that lead with the answer get extracted and quoted by AI.",
        ] },
        { kind: "p", text: "If the report flags most of these as missing, do not panic. That is the normal result for a brochure site, and it is the most winnable kind of problem there is, because the work is known and most competitors skipped it too." },
        { kind: "p", text: "One last honesty rail, because it is the whole point. A green report means your site has the fundamentals in place. It does not mean you will rank tomorrow." },
        { kind: "p", text: "Fundamentals are the price of admission. Ranking is what accumulates on top of them over months, so read the audit as a checklist of what to build, not a prediction of where you will land." },
        { kind: "takeaway", label: "The honest version", text: "Read the report for five things: page count, keyword-and-city titles, schema, mobile speed, and answer-first content. Most missing is the **normal** brochure result, and the most winnable. A clean report means the fundamentals are there, never that a ranking is promised. For the fastest single tell, see [auditing by page count](/guides/audit-by-page-count), or have us run it for you in the [free audit](/audit)." },
      ],
    },
  ],
};
