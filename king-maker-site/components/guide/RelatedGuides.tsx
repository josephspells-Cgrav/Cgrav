import Link from "next/link";
import { getSub } from "@/lib/buyers-guide";

/* The internal mesh — the sibling sub-sections in the same category. Part of the
 * no-orphan backstop (pillar + grouped nav + related + footer). */
export function RelatedGuides({ slugs }: { slugs: string[] }) {
  const subs = slugs.map(getSub).filter(Boolean);
  if (!subs.length) return null;
  return (
    <nav aria-label="Related sections" className="mt-14 border-t border-line-soft pt-10">
      <p className="km-mono mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">More in this category</p>
      <div className="grid gap-px bg-line-soft sm:grid-cols-2">
        {subs.map((s) => (
          <Link key={s!.slug} href={`/guides/${s!.slug}`} className="group bg-bg px-5 py-6 transition-colors hover:bg-surface">
            <h3 className="text-[15.5px] font-semibold leading-snug text-ink group-hover:text-blue">{s!.navTitle}</h3>
            <p className="mt-2 text-[13px] leading-snug text-dim">{s!.blurb.split(".")[0]}.</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
