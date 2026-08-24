import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideLayout } from "@/components/guide/GuideLayout";
import { GuideHero } from "@/components/guide/GuideHero";
import { Breadcrumbs } from "@/components/guide/Breadcrumbs";
import { ChapterPager } from "@/components/guide/ChapterPager";
import { SoftCapture } from "@/components/guide/SoftCapture";
import { GuideArticle } from "@/components/guide/GuideArticle";
import { ComingOnline } from "@/components/PageHero";
import { Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { CHAPTERS, CHAPTER_TREE, getChapter } from "@/lib/playbook";
import { PLAYBOOK_CONTENT } from "@/lib/playbook-content";
import { tocFor } from "@/lib/content-blocks";
import { buildGraph, webPageNode, articleNode, breadcrumbNode } from "@/lib/schema";

const UPDATED = "2026-06-25";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) return {};
  return { title: `${c.title} — The Playbook`, description: c.blurb, alternates: { canonical: `/playbook/${chapter}` } };
}

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) notFound();

  const content = PLAYBOOK_CONTENT[chapter];
  const toc = content ? tocFor(content) : [];
  const idx = CHAPTERS.findIndex((x) => x.slug === chapter);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : undefined;
  const next = idx >= 0 && idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : undefined;

  const graph = buildGraph([
    webPageNode({ url: `/playbook/${chapter}`, name: c.title, description: c.blurb, type: "Article" }),
    articleNode({ url: `/playbook/${chapter}`, headline: c.title, description: c.blurb, datePublished: UPDATED, dateModified: UPDATED }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Playbook", url: "/playbook" }, { name: c.navTitle }]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <GuideLayout tree={CHAPTER_TREE} activeSlug={chapter} toc={toc} basePath="/playbook" treeTitle="The chapters" topHref="/playbook" topLabel="The Playbook">
        <Breadcrumbs items={[{ name: "Playbook", href: "/playbook" }, { name: c.navTitle }]} />
        <div className="mt-7">
          <GuideHero eyebrow={`The Playbook · Chapter ${c.n}`} title={c.title} lede={c.blurb} readMin={c.readMin} updated={UPDATED} />
        </div>

        {content ? (
          <GuideArticle content={content} />
        ) : (
          <div className="km-prose py-6">
            <p>This chapter is being written now, to the same standard as the rest, every number measured or flagged.</p>
            <ComingOnline>Publishing next</ComingOnline>
          </div>
        )}

        <ChapterPager
          prev={prev ? { href: `/playbook/${prev.slug}`, title: prev.navTitle } : undefined}
          next={next ? { href: `/playbook/${next.slug}`, title: next.navTitle } : undefined}
        />
        <SoftCapture guideSlug={`playbook-${chapter}`} />
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line-soft pt-10">
          <Button href="/audit" variant="secondary">Audit your own site</Button>
          <Button href="/apply" variant="primary">Apply to work with us</Button>
        </div>
      </GuideLayout>
    </>
  );
}
