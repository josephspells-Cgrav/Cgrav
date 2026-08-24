import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section, Button, Label } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode, articleNode } from "@/lib/schema";
import { CHAPTERS } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "The Playbook — How to Scale a Contracting Company From $1M to $10M+",
  description:
    "The Contractor's Authority Playbook: how to scale from $1M to $10M+ without being the bottleneck. The infrastructure most contractors never build.",
  alternates: { canonical: "/playbook" },
};

export default function PlaybookPage() {
  const graph = buildGraph([
    webPageNode({
      url: "/playbook",
      name: "The Contractor's Authority Playbook",
      description: "How to scale a contracting company from $1M to $10M+ without being the bottleneck.",
      type: "Article",
    }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "The Playbook" }]),
    articleNode({
      url: "/playbook",
      headline: "The Contractor's Authority Playbook: How to Scale From $1M to $10M+",
      description: "The infrastructure most contractors never build, and the foundation that ranks, proves, and converts without you.",
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
    }),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="The authority hub"
        title="The Contractor's Authority Playbook"
        lede="How to scale from $1M to $10M+ without being the bottleneck. We give away the why. Every lever, honestly, so you can see exactly where the foundation sits."
        crumb="The Playbook"
      />

      <Section tone="bg">
        <Container>
          <div className="max-w-3xl">
            <Label>The argument</Label>
            <p className="mt-5 text-[18px] leading-relaxed text-muted">
              Scaling past $1–2M is an infrastructure problem, not a marketing one. The owner is the
              bottleneck, the leads are referrals plus a thin site, and there is no system. The
              load-bearing foundation is the authority website and the organic engine: owned,
              compounding, and selecting the premium buyer for you. The whole guide narrows to that
              one decision.
            </p>
          </div>

          <div className="mt-14">
            <Label className="mb-6 block">The chapters</Label>
            <Stagger className="grid gap-px bg-line-soft sm:grid-cols-2">
              {CHAPTERS.map((c) => (
                <StaggerItem key={c.n} className="bg-bg">
                  <Link href={`/playbook/${c.slug}`} className="group flex h-full gap-5 px-6 py-7 transition-colors hover:bg-surface">
                    <span className="km-display km-tabular text-[15px] font-bold text-blue">{c.n}</span>
                    <div>
                      <h2 className="text-[17px] font-bold text-ink group-hover:text-blue">{c.title}</h2>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.blurb}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            Done reading? Build the foundation.
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/apply" variant="primary">
              Check if your market is open
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
