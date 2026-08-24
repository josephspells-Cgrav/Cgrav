/* A16 — ANATOMY OF AN ENTERPRISE PAGE. An annotated, exploded stack of the
 * rankable layers a real page ships. Self-demonstrating: this very page carries
 * every layer below. Server-rendered, static, fully AI-legible (real text + an
 * <ol> that IS the semantic twin). The mono tokens are the technical voice. */

const LAYERS: { n: string; name: string; token: string; body: string }[] = [
  {
    n: "01",
    name: "Structured schema",
    token: "@graph",
    body: "One linked Organization, Article, and Breadcrumb graph every crawler and AI engine can read as facts, not guesses.",
  },
  {
    n: "02",
    name: "AI-legible headings",
    token: "word-level reveal",
    body: "Headings that animate but still read as clean phrases to every extractor, not fragmented letters.",
  },
  {
    n: "03",
    name: "Answer-first content",
    token: "Speakable",
    body: "The buyer's question as the heading, the answer in the first sentence, so search and AI can quote it.",
  },
  {
    n: "04",
    name: "Service × location depth",
    token: "service × location",
    body: "A real page for every service in every town, each a door Google can rank, never one buried list.",
  },
  {
    n: "05",
    name: "Speed budget",
    token: "LCP / INP / CLS",
    body: "Core Web Vitals held green, even with motion, because slow pages lose the rank and the buyer.",
  },
  {
    n: "06",
    name: "No-orphan mesh",
    token: "≤ 2 clicks",
    body: "Every page reachable in two clicks, with internal links routing authority to the pages that sell.",
  },
];

export function EnterprisePageAnatomy() {
  return (
    <figure className="my-10 border border-line bg-surface-2">
      <div className="km-hairline" />
      <div className="px-6 pt-7 sm:px-8">
        <h3 className="text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold leading-snug tracking-[-0.01em] text-ink">
          An enterprise page, taken apart
        </h3>
        <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
          Six layers decide whether a page ranks and gets cited. A brochure ships the top one and
          stops. This very page ships all six, audit it.
        </p>
      </div>
      <ol className="px-6 py-7 sm:px-8">
        {LAYERS.map((l, i) => (
          <li
            key={l.n}
            className={`grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-1 py-5 ${i < LAYERS.length - 1 ? "border-b border-line-soft" : ""}`}
          >
            <span className="km-mono km-tabular pt-0.5 text-[13px] font-bold text-blue">{l.n}</span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-[16px] font-semibold text-ink">{l.name}</h4>
                <code className="km-mono bg-bg px-2 py-0.5 text-[12px] text-blue">{l.token}</code>
              </div>
              <p className="mt-1.5 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">{l.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
