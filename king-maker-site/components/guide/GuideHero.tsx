import { TypeIn } from "@/components/motion";

/* Interior page hero — calm, NOT the 7rem home treatment (display goes down the
 * page). Title (word-level TypeIn, AI-legible) + answer-first lede + read-time +
 * "what you'll learn" + last-updated (→ dateModified). */
export function GuideHero({
  eyebrow,
  title,
  lede,
  readMin,
  learn,
  updated,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  readMin?: number;
  learn?: string[];
  updated?: string;
}) {
  return (
    <header className="mb-12">
      <p className="km-mono mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-blue">{eyebrow}</p>
      <TypeIn text={title} as="h1" className="km-h1 max-w-3xl font-extrabold text-ink" />
      <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">{lede}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-dim">
        {readMin ? <span className="km-mono">{readMin} min read</span> : null}
        {updated ? (
          <span className="km-mono">
            Updated <time dateTime={updated}>{updated}</time>
          </span>
        ) : null}
      </div>
      {learn && learn.length ? (
        <div className="mt-8 border-t border-line-soft pt-6">
          <p className="km-mono mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">What you&rsquo;ll learn</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {learn.map((l) => (
              <li key={l} className="flex gap-2.5 text-[14.5px] leading-snug text-muted">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-action" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
