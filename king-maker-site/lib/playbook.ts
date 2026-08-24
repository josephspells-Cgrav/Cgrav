/* The Playbook = the business-growth narrative ($1M → $10M). SEPARATE axis from
 * /guides (website mechanics) — they cross-link, never merge (M2). 10 chapters,
 * each a /playbook/[chapter] page rendered from data. */

export type Chapter = {
  n: string;
  slug: string;
  title: string;
  navTitle: string;
  blurb: string;
  readMin: number;
};

export const CHAPTERS: Chapter[] = [
  { n: "01", slug: "the-1m-2m-ceiling", title: "The $1–2M Ceiling", navTitle: "The $1–2M ceiling", blurb: "Why most contractors plateau. You don't have a marketing problem, you have an infrastructure problem.", readMin: 7 },
  { n: "02", slug: "where-high-ticket-jobs-come-from", title: "Where High-Ticket Jobs Come From", navTitle: "Where jobs come from", blurb: "Rented leads vs. owned demand. The considered buyer skips the ads and the map and trusts the authority.", readMin: 8 },
  { n: "03", slug: "organic-vs-the-map-pack", title: "Organic vs. the Map Pack", navTitle: "Organic vs. the pack", blurb: "The de-hype. Proximity caps the pack at five miles. Organic owns the whole region.", readMin: 9 },
  { n: "04", slug: "organic-vs-ads", title: "Organic vs. Ads", navTitle: "Organic vs. ads", blurb: "The format selects the buyer. Owned and compounding vs. rented and interruptive, and where ads still earn their keep.", readMin: 8 },
  { n: "05", slug: "the-asset-your-website", title: "The Asset: Your Website", navTitle: "The asset: your site", blurb: "Engine or anchor. Why a 2/10 site caps everything, and what an authority site actually is.", readMin: 8 },
  { n: "06", slug: "prominence-off-page", title: "Prominence: Off-Page That Moves", navTitle: "Prominence: off-page", blurb: "The one-time foundation and the legitimate ongoing engine. No PBNs, ever.", readMin: 8 },
  { n: "07", slug: "infrastructure-of-a-5m-contractor", title: "The Infrastructure of a $5M+ Contractor", navTitle: "The $5M+ ops stack", blurb: "CRM, speed-to-lead, and the systems that let you add crews without adding chaos.", readMin: 8 },
  { n: "08", slug: "satellite-expansion", title: "Satellite Expansion", navTitle: "Satellite expansion", blurb: "When you need a staffed hub, and when organic captures the radius without one.", readMin: 7 },
  { n: "09", slug: "the-1m-to-10m-roadmap", title: "The $1M → $10M Roadmap", navTitle: "The roadmap", blurb: "Sequenced: foundation, prominence, dominance, expansion. The honest timeline.", readMin: 8 },
  { n: "10", slug: "the-foundation-decision", title: "The Foundation Decision", navTitle: "The foundation decision", blurb: "The one piece you can't hustle around, and what we build done-for-you.", readMin: 6 },
];

export const CHAPTER_TREE = CHAPTERS.map((c) => ({ slug: c.slug, navTitle: `${c.n} · ${c.navTitle}` }));

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}
