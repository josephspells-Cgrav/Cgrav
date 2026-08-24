import type { GuideContent } from "@/lib/content-blocks";

export const content: GuideContent = {
  sections: [
    {
      id: "what-answer-first-is",
      h2: "What is answer-first content, and why does it get cited?",
      navLabel: "What it is",
      speakable: true,
      blocks: [
        { kind: "p", text: "Answer-first content means you lead each page with the buyer's question as the heading, and the answer in the very first sentence. No throat-clearing, no buildup. The question, then the answer, right at the top." },
        { kind: "p", text: "It gets cited because that structure is exactly what a search engine or AI can lift and quote. The machine is looking for a clean, complete answer it can pull out and attribute, and answer-first content hands it one." },
        { kind: "p", text: "It also serves the human, who skims. A reader scanning your page sees the question they were asking and the answer right beside it, so they stay. The same structure wins the person and the machine at once." },
        { kind: "takeaway", text: "Lead every page with the buyer's question as the heading and the answer in the first sentence. That structure is what search and AI **quote**, and it is what a skimming reader stays for." },
      ],
    },
    {
      id: "the-question-as-the-heading",
      h2: "Why should the heading be the buyer's actual question?",
      navLabel: "The question heading",
      blocks: [
        { kind: "p", text: "Because the buyer searches in questions, and so does the machine. When someone asks how much does a roof cost or shingle vs metal which lasts longer, the page whose heading matches that question is the page the answer layer reaches for." },
        { kind: "p", text: "A heading like Our Services tells a machine nothing about what the page answers. A heading like How much does a roof replacement cost tells it exactly, and it matches the words the buyer typed." },
        { kind: "p", text: "Write headings as the real questions buyers ask, in their words, not your industry's jargon. The closer the heading is to the actual search, the more likely your page is the one quoted for it." },
        { kind: "list", ordered: false, items: [
          "Weak heading: \"Our Roofing Services\" — names no question, matches no search.",
          "Strong heading: \"How much does a roof replacement cost?\" — matches the buyer's words.",
          "Weak heading: \"Materials\" — vague, generic, invisible to the answer layer.",
          "Strong heading: \"Shingle vs. metal: which roof lasts longer?\" — the exact comparison buyers search.",
        ] },
      ],
    },
    {
      id: "the-answer-in-sentence-one",
      h2: "Why does the answer have to come in the first sentence?",
      navLabel: "Answer in sentence one",
      blocks: [
        { kind: "p", text: "Because the machine quotes the passage that answers the question cleanly on its own, and a buried answer is one it cannot lift. State the answer in the first sentence under the heading, as a complete claim that survives being pulled out of the page." },
        { kind: "p", text: "Write it so it stands alone. If a single sentence were lifted out and shown in an answer box with your name on it, it should still make full sense and still be true." },
        { kind: "p", text: "Do not bury the answer after three paragraphs of background. The reader who has to dig leaves, and the machine that has to dig quotes someone clearer." },
        {
          kind: "comparison",
          leftLabel: "Buried answer",
          rightLabel: "Answer-first",
          rows: [
            { label: "Where the answer sits", brochure: "Paragraph four", system: "Sentence one", flag: "ILLUSTRATIVE" },
            { label: "Can the machine lift it?", brochure: "Hard to isolate", system: "Quotable on its own", flag: "ILLUSTRATIVE" },
            { label: "What the skimming reader does", brochure: "Leaves", system: "Stays", flag: "ILLUSTRATIVE" },
            { label: "Who gets cited", brochure: "A clearer competitor", system: "You", flag: "ILLUSTRATIVE" },
          ],
        },
        { kind: "p", text: "This is the same discipline behind a Speakable section, the part of a page a voice assistant can read aloud: one heading, one direct answer. Write every section to be quotable in isolation and you have written it to be cited." },
      ],
    },
    {
      id: "make-it-extractable",
      h2: "What else makes an answer-first page extractable?",
      navLabel: "Make it extractable",
      blocks: [
        { kind: "p", text: "The answer has to actually exist in the page's code when a crawler arrives. Answer-first writing only works if the answer is server-rendered, meaning it is in the HTML the moment the page loads, not painted in afterward by the browser." },
        { kind: "p", text: "Many sites assemble their text in the browser after the fact, so the extractor sees an empty shell and quotes a competitor. If the answer is not in the source the moment the page is fetched, it does not exist to the AI." },
        { kind: "p", text: "Then label it. Schema markup and an llms.txt file tell the machine which sentence is the answer instead of leaving it to infer, which is the structure we cover in [Making your site machine-readable](/guides/machine-readable-site)." },
        { kind: "p", text: "Put it all together and the page wins twice: the buyer reading it gets a clear answer and stays, and the machine quoting it names you inside the result. That double win is the whole point of answer-first." },
        { kind: "p", text: "See why the cited source beats the bare ranking in [AI Overviews and the zero-click shift](/guides/ai-overviews), or [run the free audit](/audit) to see whether your own pages lead with the answer or bury it." },
      ],
    },
  ],
};
