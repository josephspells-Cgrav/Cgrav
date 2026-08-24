import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guide/GuideLayout";
import { GuideHero } from "@/components/guide/GuideHero";
import { Breadcrumbs } from "@/components/guide/Breadcrumbs";
import { SoftCapture } from "@/components/guide/SoftCapture";
import { Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { BUYERS_GUIDE, BG_TREE } from "@/lib/buyers-guide";
import { buildGraph, webPageNode, articleNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Contractor's Enterprise-Website Buyer's Guide",
  description:
    "Everything that decides whether your contractor website ranks, gets cited, and turns into jobs, explained in plain English. Free, ungated. Audit it yourself.",
  alternates: { canonical: "/guides" },
};

const toc = [
  { id: "premise", label: "Why this matters" },
  ...BUYERS_GUIDE.map((c) => ({ id: c.id, label: c.title })),
];

export default function GuidesPillar() {
  const graph = buildGraph([
    webPageNode({
      url: "/guides",
      name: "The Contractor's Enterprise-Website Buyer's Guide",
      description: "The pillar hub for the contractor website + SEO buyer's guide.",
      type: "CollectionPage",
      speakable: ["#premise h2", "#premise p"],
    }),
    articleNode({
      url: "/guides",
      headline: "The Contractor's Enterprise-Website Buyer's Guide",
      description: "Everything that decides whether a contractor website ranks, gets cited, and turns into jobs.",
      datePublished: "2026-06-27",
      dateModified: "2026-06-27",
    }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Buyer’s guide" }]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <GuideLayout groups={BG_TREE} activeSlug="" toc={toc} treeTitle="The buyer’s guide">
        <Breadcrumbs items={[{ name: "Buyer’s guide" }]} />
        <div className="mt-7">
          <GuideHero
            eyebrow="The complete buyer's guide"
            title="The Contractor's Enterprise-Website Buyer's Guide"
            lede="Everything that decides whether your website ranks, gets cited, and turns into jobs, explained in plain English. Free, ungated. Read it, then audit your own site against it."
          />
        </div>

        <section id="premise" className="scroll-mt-28 py-7">
          <h2 className="km-h2 mb-4 text-ink">Why this matters</h2>
          <div className="km-prose">
            <p>
              Most contractors are stuck behind a website problem they cannot see. The site looks fine,
              so it gets blamed last.
            </p>
            <p>
              But the site is the engine. It decides whether you show up for the searches a buyer
              actually types, whether an AI cites you, and whether the traffic you earn turns into
              booked jobs. This guide takes the whole thing apart, plainly and honestly, one piece at a
              time. No email wall.
            </p>
          </div>
        </section>

        {/* The 11-category index → each sub-section is its own page */}
        <div className="border-t border-line-soft">
          {BUYERS_GUIDE.map((cat, i) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-28 border-b border-line-soft py-8">
              <div className="flex items-baseline gap-3">
                <span className="km-mono km-tabular text-[12px] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-[1.4rem] font-bold leading-snug tracking-[-0.01em] text-ink">{cat.title}</h2>
              </div>
              <p className="mt-2 max-w-[46rem] text-[15px] leading-relaxed text-muted">{cat.blurb}</p>
              <ul className="mt-5 divide-y divide-line-soft border-y border-line-soft">
                {cat.subs.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/guides/${s.slug}`}
                      className="group flex items-start gap-2.5 py-3.5 transition-colors hover:bg-surface"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 shrink-0 text-blue-action transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h13M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-ink group-hover:text-blue">{s.navTitle}</span>
                        <span className="mt-1 block text-[13px] leading-snug text-dim">{s.blurb.split(".")[0]}.</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <SoftCapture guideSlug="buyers-guide" label="Want the whole guide as a PDF?" />

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line-soft pt-10">
          <Button href="/audit" variant="secondary">
            Audit your own site
          </Button>
          <Button href="/apply" variant="primary">
            Apply to work with us
          </Button>
        </div>
      </GuideLayout>
    </>
  );
}
