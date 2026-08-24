import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ApplyForm } from "@/components/ApplyForm";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Apply to Work With Us",
  description:
    "We work with one contractor per city, per vertical. If you're a fit, we'll reach out within one business day. Apply to work with King Maker.",
  alternates: { canonical: "/apply" },
};

const QUALIFIERS = [
  "You do $1M+ and want to own your region, not chase the cheapest lead.",
  "You have multiple service areas you want to dominate.",
  "You can handle real lead volume when it lands.",
];

export default function ApplyPage() {
  const graph = buildGraph([
    webPageNode({
      url: "/apply",
      name: "Apply to Work With Us",
      description: "The selective application. One contractor per city, per vertical.",
    }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Apply" }]),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Apply"
        title="If you're a fit, we reach out in one business day."
        lede="We review every application personally. We work with one contractor per city, per vertical, so we are selective about who we take on."
        crumb="Apply"
      />

      <Section tone="bg">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-blue">
                Who this is for
              </p>
              <ul className="mt-6 space-y-5">
                {QUALIFIERS.map((q) => (
                  <li key={q} className="flex gap-3 text-[15.5px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-action" />
                    {q}
                  </li>
                ))}
              </ul>
              <div className="km-hairline mt-9 w-16" />
              <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-dim">
                If you want the cheapest site online, there is a drag-and-drop builder down the
                hall. We build the opposite, for the operator who wants to be the only name that
                matters in their market.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ApplyForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
