import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section, Button } from "@/components/ui";
import { BarCompare } from "@/components/charts/BarCompare";
import { TradeTable } from "@/components/charts/TradeTable";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";
import { TRADE_PAGES } from "@/lib/claims";

export const metadata: Metadata = {
  title: "What an authority build ships, by trade",
  description:
    "Brochure vs. authority page counts for roofing, HVAC, plumbing, painting, kitchen & bath, and outdoor living. Real shipped builds, every page a door.",
  alternates: { canonical: "/guides/trades" },
};

export default function TradesIndex() {
  const graph = buildGraph([
    webPageNode({ url: "/guides/trades", name: "By trade", description: "Brochure vs authority page counts per trade." }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Guides", url: "/guides" }, { name: "By trade" }]),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="By trade"
        title="Ten pages, or a system. By trade."
        lede="A brochure ships about ten pages whatever the trade. An authority build ships 144 to 300+, every one a real service, location, project, or buyer question Google can rank."
        crumb="By trade"
      />

      <Section tone="bg">
        <Container className="max-w-5xl">
          <BarCompare />
          <TradeTable />
          <div className="mt-12 grid grid-cols-2 gap-px bg-line-soft sm:grid-cols-3">
            {TRADE_PAGES.map((t) => (
              <Link key={t.slug} href={`/guides/trades/${t.slug}`} className="group bg-bg px-5 py-6 transition-colors hover:bg-surface">
                <span className="km-display km-tabular block text-[1.8rem] font-extrabold leading-none text-blue">
                  {t.authority}
                  {t.plus ? "+" : ""}
                </span>
                <span className="mt-2 block text-[14px] font-medium text-ink group-hover:text-blue">{t.trade}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            Want this depth for your market?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/audit" variant="secondary">
              Audit your site
            </Button>
            <Button href="/apply" variant="primary">
              Apply to work with us
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
