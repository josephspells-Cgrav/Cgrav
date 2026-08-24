/* ---------------------------------------------------------------------------
 * JSON-LD builders. ONE @graph spine per the research call: the primary node is
 * `Organization` (NOT ProfessionalService) — a national-authority firm entity,
 * defined once with a stable @id; every WebPage / Article references it by @id.
 * 2026 ground truth: structured data here buys ENTITY TRUST + AI legibility, not
 * rich snippets. FAQPage + HowTo are DEAD in Google Search (kept for parse-value
 * only, never engineered for SERP lift). sameAs is the highest-leverage entity
 * signal (Wikidata-first when it exists).
 * ------------------------------------------------------------------------- */

import { SITE, FIRM } from "./site.config";

type Node = Record<string, unknown>;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE.url}${path}`);

/** The canonical Organization entity — the @graph spine. */
export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": SITE.orgId,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: `${SITE.name} is a web + SEO firm that builds enterprise-grade authority websites and organic-dominance systems for contractors. ${FIRM.descriptor}`,
    slogan: FIRM.primaryLine,
    logo: { "@type": "ImageObject", url: abs("/km-crest.svg") },
    image: abs("/og/og-default.jpg"),
    email: FIRM.email,
    telephone: FIRM.phoneTel,
    foundingDate: "2025",
    knowsAbout: [
      "Search engine optimization",
      "Local SEO",
      "Organic regional dominance",
      "Contractor marketing",
      "Web design and development",
      "Topical authority",
      "Answer engine optimization",
    ],
    areaServed: { "@type": "AdministrativeArea", name: FIRM.serviceArea },
    address: {
      "@type": "PostalAddress",
      streetAddress: FIRM.address.street,
      addressLocality: FIRM.address.city,
      addressRegion: FIRM.address.state,
      postalCode: FIRM.address.zip,
      addressCountry: FIRM.address.country,
    },
    founder: { "@id": `${SITE.url}/firm#founder` },
    ...(FIRM.sameAs.length ? { sameAs: FIRM.sameAs } : {}),
  };
}

/** WebSite node + publisher ref. */
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE.websiteId,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": SITE.orgId },
    inLanguage: "en-US",
  };
}

/** The founder Person — E-E-A-T author, anchored to /firm#founder. */
export function founderNode(opts?: { name?: string; jobTitle?: string; bio?: string }): Node {
  return {
    "@type": "Person",
    "@id": `${SITE.url}/firm#founder`,
    name: opts?.name ?? "Joseph Spells",
    jobTitle: opts?.jobTitle ?? "Founder",
    ...(opts?.bio ? { description: opts.bio } : {}),
    worksFor: { "@id": SITE.orgId },
    url: abs("/firm"),
    knowsAbout: ["SEO", "Local SEO", "Organic regional dominance", "Contractor growth"],
  };
}

/** A Service the firm provides (provider -> #org). */
export function serviceNode(opts: {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
}): Node {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    ...(opts.url ? { url: abs(opts.url) } : {}),
    provider: { "@id": SITE.orgId },
    areaServed: { "@type": "AdministrativeArea", name: FIRM.serviceArea },
  };
}

/** A WebPage bound to the org + website. `speakable` optionally marks answer
 * blocks (beta, low-priority, harmless). */
export function webPageNode(opts: {
  url: string;
  name: string;
  description: string;
  type?: string;
  primaryImage?: string;
  speakable?: string[];
}): Node {
  const url = abs(opts.url);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": SITE.websiteId },
    about: { "@id": SITE.orgId },
    ...(opts.primaryImage ? { primaryImageOfPage: abs(opts.primaryImage) } : {}),
    ...(opts.speakable && opts.speakable.length
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: opts.speakable } }
      : {}),
    inLanguage: "en-US",
  };
}

/** BreadcrumbList from an ordered [{name, url}] list. OMIT `item` on the
 * current (last) page per Google guidance — pass the trail without the leaf url. */
export function breadcrumbNode(items: { name: string; url?: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: abs(it.url) } : {}),
    })),
  };
}

/** Article / BlogPosting for the Playbook hub (E-E-A-T author + Org publisher). */
export function articleNode(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  type?: "Article" | "BlogPosting";
}): Node {
  const url = abs(opts.url);
  return {
    "@type": opts.type ?? "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: abs(opts.image ?? "/og/og-default.jpg"),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@id": `${SITE.url}/firm#founder` },
    publisher: { "@id": SITE.orgId },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    inLanguage: "en-US",
  };
}

/** Wrap nodes into one @graph document. */
export function buildGraph(nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
