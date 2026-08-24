import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, Button, FlagChip } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Eyebrow, TypeIn } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode, founderNode } from "@/lib/schema";
import { FIRM } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "The Firm — The Authority in Contractor Growth & Visibility",
  description:
    "King Maker is a web and SEO firm for contractors. Institutional craft, a proprietary build OS, and an honesty discipline that makes every claim verifiable.",
  alternates: { canonical: "/firm" },
};

const PRINCIPLES: { kicker: string; title: string; body: string; flag?: "MEASURED" }[] = [
  {
    kicker: "Selective",
    title: "One operator per market",
    body: "We take a single contractor per city, per vertical. The whole point is to make them the only name that matters in their market, and you cannot do that twice in the same place.",
  },
  {
    kicker: "Systematic",
    title: "Built by a system, not a template",
    body: "Every site is engineered on a proprietary build OS: deep service and location silos, complete schema, server-rendered speed. Institutional craft, produced like infrastructure, not decorated like a flyer.",
  },
  {
    kicker: "Accountable",
    title: "The site is Exhibit A",
    body: "The firm holds itself to the exact standard it sells. This site is enterprise-grade, crawlable, and schema-complete. It passes its own audit. Run it through any auditor and check.",
  },
  {
    kicker: "Honest",
    title: "Measured, or flagged",
    body: "Every number on this site is measured or marked as modeled. OWASP-hardened, zero stored data. We position on what we actually do, never on attestations we cannot make.",
  },
];

export default function FirmPage() {
  const graph = buildGraph([
    webPageNode({ url: "/firm", name: "The Firm", description: "The authority in contractor growth & visibility." }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "The Firm" }]),
    founderNode({
      jobTitle: "Founder",
      bio: "Founder of King Maker. Builds enterprise-grade authority websites and organic-dominance systems for high-ticket contractors.",
    }),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="The firm"
        title="The firm that makes kings."
        lede={`${FIRM.descriptor} We engineer digital supremacy for contractors. King Maker is not a service. It is an ascension.`}
        crumb="The Firm"
      />

      {/* ── The manifesto ──────────────────────────────────────────────── */}
      <Section tone="bg">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="km-prose">
              <p>
                Most contractor marketing is a brochure and a promise. We build the opposite: an owned,
                compounding asset, instrumented and verifiable, run by a firm that holds itself to the
                exact standard it sells.
              </p>
              <p>
                The contractor is the king. We are the maker. Precision engineered, unapologetically
                premium, and selective by design.
              </p>
              <p>
                We take one operator per market because the whole point is to make them the only name
                that matters in it.
              </p>
              <p className="text-ink">
                <strong>Ascension by design.</strong>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="km-card h-full bg-surface-2 px-7 py-8">
              <div className="km-hairline w-12" />
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-blue">
                The institution
              </p>
              <dl className="mt-5 space-y-4 text-[14.5px] leading-relaxed">
                <div>
                  <dt className="font-semibold text-ink">Based in</dt>
                  <dd className="text-muted">{FIRM.address.city}, {FIRM.address.state}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Serves</dt>
                  <dd className="text-muted">{FIRM.serviceArea}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Model</dt>
                  <dd className="text-muted">Done-for-you authority sites + organic dominance. One contractor per market.</dd>
                </div>
              </dl>
              <p className="mt-7 border-t border-line-soft pt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-blue">
                {FIRM.essence}
              </p>
            </aside>
          </Reveal>
        </Container>
      </Section>

      {/* ── How the firm operates — the principles ─────────────────────── */}
      <Section tone="tint">
        <Container>
          <Eyebrow>How we operate</Eyebrow>
          <TypeIn as="h2" text="Four disciplines, held without exception" className="km-h2 mt-5 max-w-2xl text-ink" />
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="text-[17px] leading-relaxed text-muted">
              The firm is built the way the sites are: structured, accountable, and honest about what it
              can and cannot promise. These are the rules we do not bend.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.title}>
                <div className="km-card km-card-hover h-full px-7 py-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">
                      {p.kicker}
                    </span>
                    {p.flag ? <FlagChip flag={p.flag} /> : null}
                  </div>
                  <h3 className="mt-4 text-[19px] font-bold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <Section tone="bg">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            We make kings.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            One contractor per city, per vertical. If you want to own your region, see whether your
            market is still open.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/apply" variant="primary">
              Apply to Work With Us
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
