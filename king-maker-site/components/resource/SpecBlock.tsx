/* A mono, code-like block for schema snippets, llms.txt excerpts, technical
 * tokens — the "site is the proof" technical voice. */
export function SpecBlock({ label, lines }: { label?: string; lines: string[] }) {
  return (
    <div className="my-6 border border-line bg-bg">
      {label ? (
        <div className="border-b border-line-soft px-4 py-2">
          <span className="km-mono text-[11px] uppercase tracking-[0.16em] text-dim">{label}</span>
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3.5" tabIndex={0} role="region" aria-label={label ?? "Code snippet"}>
        <code className="km-mono text-[12.5px] leading-relaxed text-muted">
          {lines.map((l, i) => (
            <span key={i} className="block whitespace-pre">
              {l}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
