import Link from "next/link";

/* Prev / Next sequential pager through the cluster reading path. */
export function ChapterPager({
  prev,
  next,
}: {
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}) {
  return (
    <nav aria-label="Guide pagination" className="mt-12 grid gap-px border-t border-line-soft bg-line-soft sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group bg-bg px-6 py-5 transition-colors hover:bg-surface">
          <span className="km-mono text-[11px] uppercase tracking-[0.18em] text-dim">&#8592; Previous</span>
          <p className="mt-1.5 text-[15px] font-semibold text-ink group-hover:text-blue">{prev.title}</p>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link href={next.href} className="group bg-bg px-6 py-5 text-right transition-colors hover:bg-surface">
          <span className="km-mono text-[11px] uppercase tracking-[0.18em] text-dim">Next &#8594;</span>
          <p className="mt-1.5 text-[15px] font-semibold text-ink group-hover:text-blue">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  );
}
