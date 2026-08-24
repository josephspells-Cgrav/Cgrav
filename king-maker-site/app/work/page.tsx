import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, Button, FlagChip } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, CountUp, Eyebrow, TypeIn } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";
import {
  REFERENCE_BUILD,
  SITES_SCRUBBED,
  SAMPLE_NOTE,
  ENTERPRISE_PAGES,
  BROCHURE_PAGES,
  STANDARD_PAGE_TYPES,
  FINDABILITY_GAPS,
  TRUST_MOVE,
  RANKING_CAPACITY,
} from "@/lib/claims";

export const metadata: Metadata = {
  title: "The Work — A Live Enterprise Build + the Brochure Teardown",
  description:
    "See the work. A live, enterprise-grade reference build you can click through and audit with any AI, plus what we measured across 1,017 contractor sites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const graph = buildGraph([
    webPageNode({ url: "/work", name: "The Work", description: "A live reference build and the brochure-vs-authority teardown." }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "The Work" }]),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="The proof"
        title="See the work. Click every page."
        lede="We don't ask you to take our word. We hand you a live, enterprise-grade build and the data behind it. Click through every page, then audit it with any AI."
        crumb="The Work"
      />

      {/* ── The live reference build — the featured exhibit ─────────────── */}
      <Section tone="bg">
        <Container>
          <Eyebrow>Exhibit A</Eyebrow>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <Reveal>
              <div className="km-card km-card-blue h-full px-8 py-9">
                <div className="flex items-center justify-between gap-3">
                  <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">
                    Live reference build
                  </span>
                  <FlagChip flag="MEASURED" />
                </div>
                <h2 className="mt-4 text-[28px] font-bold leading-tight text-ink">{REFERENCE_BUILD.name}</h2>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="km-display km-tabular text-[3.6rem] font-black leading-none text-blue">
                    <CountUp to={ENTERPRISE_PAGES} />
                  </span>
                  <span className="text-[15px] font-medium text-muted">pages Google can rank,<br className="hidden sm:block" /> against {BROCHURE_PAGES} on a brochure</span>
                </div>
                <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">{REFERENCE_BUILD.blurb}</p>
                <div className="mt-7">
                  <Button href={REFERENCE_BUILD.url} variant="primary">
                    Open the live build
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="km-card h-full px-7 py-8">
                <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-dim">
                  What every build ships
                </span>
                <ul className="mt-5 space-y-3.5">
                  {STANDARD_PAGE_TYPES.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-snug text-ink">
                      <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-blue" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-line-soft pt-5">
                  <p className="text-[14px] leading-relaxed text-dim">
                    A dedicated page for every service you offer and every town you work, plus the cost guides and
                    comparisons a buyer reads before they call. That is the depth a brochure can&rsquo;t fake.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The 1,017-site teardown — the measured gaps as real cards ───── */}
      <Section tone="tint">
        <Container>
          <Eyebrow>The teardown</Eyebrow>
          <TypeIn
            as="h2"
            text="What we measured across 1,017 sites"
            className="km-h2 mt-5 max-w-2xl text-ink"
          />
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="text-[17px] leading-relaxed text-muted">{SAMPLE_NOTE}</p>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {FINDABILITY_GAPS.map((g) => (
              <StaggerItem key={g.label}>
                <div className="km-card km-card-hover h-full px-7 py-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="km-display km-tabular text-[3rem] font-black leading-none text-red">
                      <CountUp to={g.pct} suffix="%" />
                    </span>
                    <span className="km-mono text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-red-ink">
                      {g.why}
                    </span>
                  </div>
                  <p className="mt-4 text-[16px] font-bold text-ink">{g.label}</p>
                  <ul className="mt-4 space-y-2.5 border-t border-line-soft pt-4">
                    {g.cost.slice(0, 3).map((c) => (
                      <li key={c} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                        <span aria-hidden className="mt-[3px] shrink-0 font-bold text-red-ink">&times;</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-dim">
              <FlagChip flag="MEASURED" />
              <span>
                {SITES_SCRUBBED.toLocaleString()} live contractor sites, scanned end to end. Presence or
                absence of a page or tag is a fact, not a projection.
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Ranking capacity contrast + the trust move ─────────────────── */}
      <Section tone="bg">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <Eyebrow>The gap, scored</Eyebrow>
              <div className="mt-7 flex items-end gap-8">
                <div>
                  <span className="km-display km-tabular block text-[4rem] font-black leading-none text-blue">
                    <CountUp to={RANKING_CAPACITY.enterprise} />
                    <span className="text-[1.6rem] text-dim">/10</span>
                  </span>
                  <span className="mt-2 block text-[13px] font-semibold uppercase tracking-[0.16em] text-blue">
                    An authority build
                  </span>
                </div>
                <div>
                  <span className="km-display km-tabular block text-[4rem] font-black leading-none text-dim">
                    <CountUp to={RANKING_CAPACITY.typicalSample} />
                    <span className="text-[1.6rem] text-dim">/10</span>
                  </span>
                  <span className="mt-2 block text-[13px] font-semibold uppercase tracking-[0.16em] text-dim">
                    The sites we scanned
                  </span>
                </div>
              </div>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">
                Same rubric, run against both. The gap is not opinion. It is the difference between a
                site built to rank and a site built to look finished.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="km-card bg-surface-2 px-8 py-9">
              <div className="km-hairline w-12" />
              <blockquote className="mt-6 text-[19px] font-medium leading-relaxed text-ink">
                {TRUST_MOVE}
              </blockquote>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            Want this for your market?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            We take one contractor per city, per vertical. Audit your own site first, or check whether
            your market is still open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/audit" variant="secondary">
              Audit your site
            </Button>
            <Button href="/apply" variant="primary">
              Check if your market is open
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
