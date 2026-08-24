import type { ReactNode } from "react";

/* Answer-first section: the question as an H2 (anchor id for TOC + Speakable),
 * the answer in the FIRST sentence (AEO bait). The id feeds both the StickyTOC
 * and the webPageNode `speakable` cssSelector. */
export function AnswerBlock({
  id,
  question,
  children,
}: {
  id: string;
  question: string;
  children: ReactNode;
}) {
  // Children are placed raw: wrap prose in `<div className="km-prose">` and let
  // data modules sit full-bleed (wider than the prose measure) as siblings.
  return (
    <section id={id} className="scroll-mt-28 py-7">
      <h2 className="km-h2 mb-4 text-ink">{question}</h2>
      {children}
    </section>
  );
}
