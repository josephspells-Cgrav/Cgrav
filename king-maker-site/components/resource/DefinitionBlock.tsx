/* term (mono) + plain-English definition (sans). Builds the buyer's vocabulary;
 * the visible twin of DefinedTerm schema. */
export function DefinitionBlock({ term, children, id }: { term: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="scroll-mt-28 border-t border-line-soft py-6">
      <dt className="km-mono text-[15px] font-semibold text-blue">{term}</dt>
      <dd className="km-prose mt-2 text-[15px] text-muted">{children}</dd>
    </div>
  );
}
