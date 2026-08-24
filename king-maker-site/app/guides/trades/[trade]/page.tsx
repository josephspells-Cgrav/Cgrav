import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, ComingOnline } from "@/components/PageHero";
import { Container, Section, Button } from "@/components/ui";
import { BarCompare } from "@/components/charts/BarCompare";
import { GuideArticle } from "@/components/guide/GuideArticle";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";
import { TRADE_PAGES } from "@/lib/claims";
import { TRADE_CONTENT } from "@/lib/trade-content";

export function generateStaticParams() {
  return TRADE_PAGES.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade } = await params;
  const t = TRADE_PAGES.find((x) => x.slug === trade);
  if (!t) return {};
  return {
    title: `What an authority ${t.trade.toLowerCase()} site looks like`,
    description: `${t.authority}${t.plus ? "+" : ""} pages vs. a 10-page brochure: the anatomy of an authority ${t.trade.toLowerCase()} website.`,
    alternates: { canonical: `/guides/trades/${trade}` },
  };
}

export default async function TradePage({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const t = TRADE_PAGES.find((x) => x.slug === trade);
  if (!t) notFound();
  const content = TRADE_CONTENT[trade];

  const graph = buildGraph([
    webPageNode({
      url: `/guides/trades/${trade}`,
      name: `Authority ${t.trade} site anatomy`,
      description: `${t.authority}${t.plus ? "+" : ""} pages vs a 10-page brochure for ${t.trade}.`,
    }),
    breadcrumbNode([
      { name: "King Maker", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: "By trade", url: "/guides/trades" },
      { name: t.trade },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="By trade"
        title={`An authority ${t.trade.toLowerCase()} site: ${t.authority}${t.plus ? "+" : ""} pages, not 10`}
        lede={`A ${t.trade.toLowerCase()} brochure ships about ten pages. An authority build ships ${t.authority}${t.plus ? "+" : ""}: a real page for every service in every town, plus projects, cost guides, and material comparisons.`}
        crumb={t.trade}
      />
      <Section tone="bg">
        <Container className="max-w-3xl">
          <BarCompare highlight={t.slug} />
          {content ? (
            <GuideArticle content={content} />
          ) : (
            <div className="km-prose mt-8">
              <p>The full per-trade page-type breakdown is being written now.</p>
              <ComingOnline>Publishing next</ComingOnline>
            </div>
          )}
        </Container>
      </Section>
      <Section tone="surface">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            Is your market open?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/audit" variant="secondary">Audit your site</Button>
            <Button href="/apply" variant="primary">Apply to work with us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
