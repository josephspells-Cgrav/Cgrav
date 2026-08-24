import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideLayout } from "@/components/guide/GuideLayout";
import { GuideHero } from "@/components/guide/GuideHero";
import { Breadcrumbs } from "@/components/guide/Breadcrumbs";
import { RelatedGuides } from "@/components/guide/RelatedGuides";
import { ChapterPager } from "@/components/guide/ChapterPager";
import { SoftCapture } from "@/components/guide/SoftCapture";
import { ComingOnline } from "@/components/PageHero";
import { Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { BG_SUBS, BG_TREE, getSub, categoryOf, siblingSlugs, prevNext } from "@/lib/buyers-guide";
import { GUIDE_CONTENT } from "@/lib/guide-content";
import { GuideArticle } from "@/components/guide/GuideArticle";
import { tocFor, speakableFor } from "@/lib/content-blocks";
import { buildGraph, webPageNode, articleNode, breadcrumbNode } from "@/lib/schema";

const UPDATED = "2026-06-27";

export function generateStaticParams() {
  return BG_SUBS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sub = getSub(slug);
  if (!sub) return {};
  return {
    title: sub.title,
    description: sub.blurb,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sub = getSub(slug);
  if (!sub) notFound();

  const category = categoryOf(slug);
  const content = GUIDE_CONTENT[slug];
  const toc = content ? tocFor(content) : [];
  const { prev, next } = prevNext(slug);

  const graph = buildGraph([
    webPageNode({
      url: `/guides/${slug}`,
      name: sub.title,
      description: sub.blurb,
      type: "Article",
      speakable: content ? speakableFor(content) : undefined,
    }),
    articleNode({
      url: `/guides/${slug}`,
      headline: sub.title,
      description: sub.blurb,
      datePublished: UPDATED,
      dateModified: UPDATED,
    }),
    breadcrumbNode([
      { name: "King Maker", url: "/" },
      { name: "Buyer’s guide", url: "/guides" },
      { name: sub.navTitle },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <GuideLayout groups={BG_TREE} activeSlug={slug} toc={toc} treeTitle="The buyer’s guide">
        <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: sub.navTitle }]} />
        <div className="mt-7">
          <GuideHero
            eyebrow={category ? `Buyer’s guide · ${category.title}` : "A King Maker guide"}
            title={sub.title}
            lede={sub.blurb}
            readMin={sub.readMin}
            updated={UPDATED}
          />
        </div>

        {content ? (
          <GuideArticle content={content} />
        ) : (
          <div className="km-prose py-6">
            <p>
              This section is being written now, to the same standard as the rest of the buyer’s guide:
              plain English for a contractor, with every number measured or flagged.
            </p>
            <ComingOnline>Publishing next</ComingOnline>
          </div>
        )}

        <RelatedGuides slugs={siblingSlugs(slug)} />
        <ChapterPager
          prev={prev ? { href: `/guides/${prev.slug}`, title: prev.navTitle } : undefined}
          next={next ? { href: `/guides/${next.slug}`, title: next.navTitle } : undefined}
        />

        <SoftCapture guideSlug={slug} />

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
