import Link from "next/link";
import type { ReactNode } from "react";
import { StickyTOC } from "./StickyTOC";

/* The two-column reference shell (the defining practical-vs-editorial move):
 * sticky left topic tree + content column (narrow prose / full-bleed data) +
 * sticky right "On this page" scrollspy rail (xl+). Below xl, the rail becomes
 * the mobile dropdown at the top of content. Wider container than marketing so
 * all three columns breathe. */
export function GuideLayout({
  tree,
  groups,
  activeSlug,
  toc,
  children,
  basePath = "/guides",
  treeTitle = "Fundamentals",
  topHref = "/guides",
  topLabel = "The buyer’s guide",
}: {
  tree?: { slug: string; navTitle: string }[];
  groups?: { id: string; title: string; subs: { slug: string; navTitle: string }[] }[];
  activeSlug: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
  basePath?: string;
  treeTitle?: string;
  topHref?: string;
  topLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-[84rem] px-6 pt-[68px] sm:px-8">
      <div className="grid gap-x-12 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_13rem]">
        {/* Left topic tree — independent scroll container so a long category
            list scrolls on its own, capped to the viewport (not the page). */}
        <aside className="hidden lg:block">
          <div className="sticky top-[92px] max-h-[calc(100vh-92px)] overflow-y-auto overscroll-contain py-16 pr-3">
            <Link href={topHref} className="km-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-blue hover:text-blue">
              &#8592; {topLabel}
            </Link>
            {groups ? (
              <div className="mt-6 space-y-0.5">
                {groups.map((cat) => {
                  const activeHere = cat.subs.some((s) => s.slug === activeSlug);
                  return (
                    <details key={cat.id} open={activeHere} className="group/cat border-b border-line-soft">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink [&::-webkit-details-marker]:hidden">
                        <span>{cat.title}</span>
                        <span aria-hidden className="text-[10px] text-blue transition-transform duration-200 group-open/cat:rotate-180">&#9662;</span>
                      </summary>
                      <ul className="mb-3 space-y-1.5 border-l border-line-soft">
                        {cat.subs.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`${basePath}/${s.slug}`}
                              aria-current={s.slug === activeSlug ? "page" : undefined}
                              className={`-ml-px block border-l-2 pl-4 text-[13px] leading-snug transition-colors ${
                                s.slug === activeSlug ? "border-blue text-ink" : "border-transparent text-dim hover:text-muted"
                              }`}
                            >
                              {s.navTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  );
                })}
              </div>
            ) : (
              <>
                <p className="km-mono mt-6 mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">{treeTitle}</p>
                <ul className="space-y-2.5 border-l border-line-soft">
                  {(tree ?? []).map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`${basePath}/${t.slug}`}
                        aria-current={t.slug === activeSlug ? "page" : undefined}
                        className={`-ml-px block border-l-2 pl-4 text-[13px] leading-snug transition-colors ${
                          t.slug === activeSlug ? "border-blue text-ink" : "border-transparent text-dim hover:text-muted"
                        }`}
                      >
                        {t.navTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>

        {/* Content column */}
        <div className="min-w-0 py-12 lg:py-16">
          <StickyTOC items={toc} variant="dropdown" />
          {children}
        </div>

        {/* Right scrollspy rail */}
        <aside className="hidden py-16 xl:block">
          <StickyTOC items={toc} variant="rail" />
        </aside>
      </div>
    </div>
  );
}
