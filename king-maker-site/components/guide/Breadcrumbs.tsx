import Link from "next/link";

/* Breadcrumb trail (the visible twin of breadcrumbNode schema). The current
 * (last) crumb is plain text — no link, matching the omitted `item` in schema. */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.18em] text-dim">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span className="text-muted">{it.name}</span>
            )}
            {i < items.length - 1 ? (
              <span className="text-line" aria-hidden>
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
