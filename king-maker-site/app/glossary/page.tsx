import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { DefinitionBlock } from "@/components/resource/DefinitionBlock";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site.config";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Glossary — the contractor SEO terms, defined plainly",
  description:
    "Plain-English definitions of the terms that decide whether a contractor website ranks: schema, Core Web Vitals, topical authority, AEO, grandfathering, and more.",
  alternates: { canonical: "/glossary" },
};

const TERMS: { term: string; id: string; def: string }[] = [
  { term: "LocalBusiness schema", id: "localbusiness", def: "Structured markup that tells search engines your name, address, services, and area as machine-readable facts instead of leaving them to guess from text." },
  { term: "Structured data (@graph)", id: "schema", def: "A linked set of schema.org facts (Organization, Article, Breadcrumb) in the page, so crawlers and AI engines read your site as data, not prose." },
  { term: "Core Web Vitals (CWV)", id: "cwv", def: "Google's measured speed and stability metrics. Slow or jumpy pages lose rank and lose the buyer before the page settles." },
  { term: "INP (Interaction to Next Paint)", id: "inp", def: "A Core Web Vital measuring how fast the page responds to a tap or click. Under 200ms is the target; many sites fail it." },
  { term: "Topical authority", id: "topical-authority", def: "Earned depth on a subject across many connected pages. Google trusts a site that covers a topic thoroughly over one that mentions it once." },
  { term: "Answer-first content", id: "answer-first", def: "Leading a section with the buyer's question as a heading and the answer in the first sentence, so search and AI can quote it directly." },
  { term: "AEO (Answer Engine Optimization)", id: "aeo", def: "Structuring content to be the cited answer inside AI overviews and chatbots, a visibility surface separate from the classic blue links." },
  { term: "Grandfathering", id: "grandfathering", def: "When an older site outranks a better one on accumulated signals (links, content, trust) built over years, not on domain age itself." },
  { term: "hreflang", id: "hreflang", def: "Markup that tells Google which language and region a page targets, so the right version is served. Absent on 100% of the sites in our sample." },
  { term: "No-orphan / reachability", id: "no-orphan", def: "Every page reachable from the home page in two clicks or fewer. Orphan pages exist but are effectively invisible, built but not reachable." },
];

export default function GlossaryPage() {
  const definedTermSet = {
    "@type": "DefinedTermSet",
    "@id": `${SITE.url}/glossary#termset`,
    name: "King Maker Contractor SEO Glossary",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE.url}/glossary#${t.id}`,
      name: t.term,
      description: t.def,
      inDefinedTermSet: `${SITE.url}/glossary#termset`,
    })),
  };
  const graph = buildGraph([
    webPageNode({ url: "/glossary", name: "Glossary", description: "Plain-English definitions of contractor SEO terms." }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Glossary" }]),
    definedTermSet,
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Reference"
        title="The terms, defined plainly"
        lede="The vocabulary that decides whether a contractor website ranks and gets cited, in plain English, no jargon for jargon's sake."
        crumb="Glossary"
      />
      <Section tone="bg">
        <Container className="max-w-3xl">
          {/* Jump index — scan every term at a glance, click to the definition. */}
          <nav aria-label="Glossary terms" className="border-t border-line-soft pt-7">
            <p className="km-mono mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">
              {TERMS.length} terms
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {TERMS.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="km-mono inline-flex border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:border-blue hover:text-blue"
                  >
                    {t.term}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <dl className="mt-12">
            {TERMS.map((t) => (
              <DefinitionBlock key={t.id} id={t.id} term={t.term}>
                {t.def}
              </DefinitionBlock>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
