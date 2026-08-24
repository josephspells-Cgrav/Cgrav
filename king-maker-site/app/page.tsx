import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/home/Hero";
import { GapSection } from "@/components/home/GapSection";
import { PageSystem } from "@/components/home/PageSystem";
import { Dashboard } from "@/components/home/Dashboard";
import { RawTechnicals } from "@/components/home/RawTechnicals";
import { BookAppointment } from "@/components/home/BookAppointment";
import { buildGraph, webPageNode, serviceNode } from "@/lib/schema";

export default function HomePage() {
  const graph = buildGraph([
    webPageNode({
      url: "/",
      name: "King Maker — Authority Websites + SEO for Contractors",
      description:
        "King Maker builds enterprise-grade authority websites and organic-dominance systems for contractors. A brochure describes a business; an authority site is a ranking system.",
      speakable: ["#problem h2", "#proof h2"],
    }),
    serviceNode({
      name: "Enterprise authority website builds",
      description:
        "Deep, server-rendered, schema-complete authority websites for contractors — built to rank organically across an entire region.",
      url: "/",
      serviceType: "Website design and development",
    }),
    serviceNode({
      name: "Organic regional dominance (SEO)",
      description:
        "On-page and one-time off-page foundations that win organic search across a contractor's service region.",
      url: "/",
      serviceType: "Search engine optimization",
    }),
  ]);

  // New home flow (WO_04): Hero -> the gap (red) -> the page system -> the win-line
  // proof -> the raw technicals -> book an appointment. Cut: trust-bar marquee,
  // 4-stat ProofBar, ProblemReframe, per-trade TradeStrip, TrustMove, Selectivity.
  return (
    <>
      <JsonLd graph={graph} />
      <Hero />
      <GapSection />
      <PageSystem />
      <Dashboard />
      <RawTechnicals />
      <BookAppointment />
    </>
  );
}
