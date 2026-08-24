import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { SelfAudit } from "@/components/audit/SelfAudit";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Audit your own site against the enterprise standard",
  description:
    "Walk your contractor website against the ten fundamentals that decide whether it ranks and gets cited. See your gap score, no email required.",
  alternates: { canonical: "/audit" },
};

export default function AuditPage() {
  const graph = buildGraph([
    webPageNode({
      url: "/audit",
      name: "Audit your site",
      description: "A guided self-audit against the ten enterprise-site fundamentals.",
    }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Audit your site" }]),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Verify it yourself"
        title="Audit your own site"
        lede="Ten fundamentals decide whether a contractor site ranks and gets cited. Check the ones you have. The gap is what is costing you the searches you never see."
        crumb="Audit"
      />
      <Section tone="bg">
        <Container className="max-w-3xl">
          <SelfAudit />
        </Container>
      </Section>
    </>
  );
}
