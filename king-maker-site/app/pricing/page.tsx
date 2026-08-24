import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, Button, FlagChip } from "@/components/ui";
import { Reveal, Eyebrow, TypeIn, DrawLine } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

/* The KingMaker pricing tab (WO_10 / Phase F). SALES voice — Howard-Roark declarative,
 * state-what-it-IS, never defend-the-price-against-a-competitor. Sells ONE thing — the
 * $297/mo site subscription — plus a SEPARATE off-page sub. Clean offer, no weeds:
 * only those two subscriptions are purchasable; no build-cost figure, no unbundled
 * add-ons, no lump sum, no installment framing. Manifest primitives only; one-shot motion.
 * The 3-5x leads claim carries an ILLUSTRATIVE flag (projection, market-relative). */

export const metadata: Metadata = {
  title: "Pricing — A Site That Captures 3-5x the Leads | King Maker",
  description:
    "A website that captures three to five times the available leads in your market. $297 a month, flat, no contract, built, hosted, and maintained by us. Plus optional off-page SEO. See if your market is open.",
  alternates: { canonical: "/pricing" },
};

/* Every page type an enterprise build ships — industry-agnostic (the same set behind
 * the Summit & Oak reference build, stated as types, not one trade's instances). */
const PAGE_TYPES = [
  { name: "Dedicated service pages", note: "One for every service you offer" },
  { name: "Dedicated location pages", note: "One for every town you serve" },
  { name: "Product & brand pages", note: "Every line and brand you carry" },
  { name: "Specialty & emergency pages", note: "Your urgent, high-ticket work" },
  { name: "Cost & pricing pages", note: "What each job runs, answered" },
  { name: "Instant estimate tool", note: "A calculator that captures the lead" },
  { name: "Financing pages", note: "Monthly-payment options, up front" },
  { name: "Comparison pages", note: "The this-vs-that a buyer weighs" },
  { name: "Project gallery & case studies", note: "Real, geo-tagged proof" },
  { name: "Resource cluster", note: "Buyer guides, how-tos, glossary, blog" },
  { name: "Trust pages", note: "About, reviews, warranty, FAQ" },
  { name: "Answer-first content", note: "Built so Google and AI cite you" },
];

/* The three tiers, side by side — neutral, factual. The difference is depth. */
const TIERS = [
  {
    name: "Brochure",
    price: "~$97/mo",
    emphasis: false,
    includes: [
      "Home, about, contact, gallery",
      "One flat list of services",
      "One buried service-areas line",
      "Ranks for your business name",
    ],
  },
  {
    name: "Standard",
    price: "~$297/mo",
    emphasis: false,
    includes: [
      "Dedicated service pages",
      "Dedicated location pages",
      "Online scheduling",
      "Basic on-page and technical SEO",
      "Ten to twenty pages",
    ],
  },
  {
    name: "KingMaker enterprise site",
    price: "$297/mo",
    emphasis: true,
    includes: [
      "A dedicated page for every service and every town",
      "Cost, pricing, and financing pages",
      "Comparison, project, and case-study pages",
      "Resource cluster and trust pages",
      "Full schema, AI-legible, built and hosted by us",
    ],
  },
];

const OFFPAGE_TIERS = [
  { market: "Low competition", spend: "~$1,000/mo", note: "Smaller or low-competition markets can move on about $500 a month." },
  { market: "Medium competition", spend: "~$2,000/mo", note: "Most suburban and mid-size metros." },
  { market: "High competition, major metro", spend: "~$3,000/mo", note: "The most contested markets, where the top spots are worth the most." },
];

const FOR_YOU = [
  "You work a competitive market with real search demand.",
  "You are done buying shared, recycled leads from a middleman.",
  "You want steady inbound that compounds, not rented clicks that stop the day you stop paying.",
  "You can handle the volume when it lands.",
];

const NOT_FOR_YOU = [
  "You work a small, low-traffic market. There is not enough search to justify it, and we will tell you so.",
  "You want the cheapest site online. There is a drag-and-drop builder down the hall for that.",
  "You need leads tomorrow. This is a system that compounds, not an ad you switch on.",
];

function Check({ className = "text-blue-action" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-[3px] h-4 w-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5 8 14l8-9" />
    </svg>
  );
}

export default function PricingPage() {
  const graph = buildGraph([
    webPageNode({
      url: "/pricing",
      name: "Pricing",
      description: "A site that captures three to five times the available leads in your market. The $297/mo KingMaker site subscription, plus optional off-page SEO.",
    }),
    breadcrumbNode([{ name: "King Maker", url: "/" }, { name: "Pricing" }]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />

      <PageHero
        eyebrow="Pricing"
        title="Own the system that ranks."
        lede="A website that captures three to five times the available leads in your market. Built to rank, hosted and maintained by us, and yours for as long as you subscribe. Here is exactly what that buys."
        crumb="Pricing"
      />

      {/* ── Hero CTA strip ──────────────────────────────────────────────── */}
      <Section tone="bg" className="!pt-10 !pb-14 sm:!pt-12 sm:!pb-16">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/apply" variant="primary">Book a call</Button>
                <Button href="/guides" variant="secondary">Read the buyer&rsquo;s guide</Button>
              </div>
              <p className="km-mono text-[12px] uppercase tracking-[0.16em] text-dim">
                Flat $297/mo &middot; No contract &middot; Cancel anytime
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── The KingMaker site — value-led, full sales ──────────────────── */}
      <Section tone="tint">
        <Container>
          <Eyebrow>KingMaker site</Eyebrow>
          <TypeIn as="h2" text="A site that outperforms your market." className="km-h2 mt-5 max-w-2xl text-ink" />
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="text-[17px] leading-relaxed text-muted">
              Every page a buyer searches for, built to rank and tuned to capture the demand your market
              actually has. Hosted and maintained by us, and live for as long as you subscribe.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            {/* the value cell — 3-5x the available leads */}
            <Reveal>
              <div className="km-card km-card-blue flex h-full flex-col px-8 py-9">
                <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">
                  KingMaker site
                </span>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="km-display km-tabular text-[clamp(3rem,7vw,4.4rem)] font-black leading-none text-blue">
                    $297
                  </span>
                  <span className="text-[20px] font-bold text-blue">/mo</span>
                </div>
                <p className="mt-4 text-[15px] font-semibold text-ink">Flat. Month to month. No contract.</p>
                <div className="mt-6 border-t border-blue/15 pt-6">
                  <p className="text-[14.5px] leading-relaxed text-muted">
                    The site lives on our infrastructure. Your subscription keeps it built, hosted, and
                    maintained. Cancel any time and it comes down. No lock-in, no long contract, no
                    surprise invoice.
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <Button href="/apply" variant="primary">Book a call</Button>
                </div>
              </div>
            </Reveal>

            {/* the full page-type checklist */}
            <Reveal delay={0.1}>
              <div className="km-card flex h-full flex-col px-8 py-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-md">
                    <p className="text-[19px] font-bold leading-snug text-ink">
                      <span className="text-blue">Generate</span> <span className="text-blue">3&ndash;5&times;</span> the available leads in your market
                    </p>
                    <DrawLine className="mt-3" />
                  </div>
                  <FlagChip flag="ILLUSTRATIVE" className="mt-1" />
                </div>
                <span className="km-mono mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-dim">
                  Every page type the site ships
                </span>
                <ul className="mt-5 grid gap-x-7 gap-y-4 sm:grid-cols-2">
                  {PAGE_TYPES.map((p) => (
                    <li key={p.name} className="flex gap-2.5">
                      <Check />
                      <div>
                        <p className="text-[14.5px] font-semibold leading-snug text-ink">{p.name}</p>
                        <p className="text-[12.5px] leading-snug text-dim">{p.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-line-soft pt-6">
                  <p className="text-[14px] leading-relaxed text-dim">
                    Industry-agnostic page types. The buildout is tailored to your trade and your market,
                    and every type above ships on the enterprise standard.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The three tiers, side by side (neutral, factual) ────────────── */}
      <Section tone="bg">
        <Container>
          <Eyebrow>The three tiers</Eyebrow>
          <TypeIn as="h2" text="What you get at each tier." className="km-h2 mt-5 max-w-2xl text-ink" />
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="text-[17px] leading-relaxed text-muted">
              The difference between the three is depth: how many of the pages a buyer actually searches
              for exist on the site.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i}>
                <div className={`flex h-full flex-col px-7 py-8 ${t.emphasis ? "km-card km-card-blue" : "km-card"}`}>
                  <div>
                    <span className={`block text-[16px] font-bold leading-tight ${t.emphasis ? "text-blue" : "text-ink"}`}>{t.name}</span>
                    <span className={`km-mono km-tabular mt-1.5 block text-[13px] font-semibold ${t.emphasis ? "text-blue" : "text-dim"}`}>{t.price}</span>
                  </div>
                  {t.emphasis ? (
                    <span className="km-mono mt-3 inline-flex w-max bg-blue px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                      What you get
                    </span>
                  ) : (
                    <div className="mt-3 h-[26px]" aria-hidden />
                  )}
                  <ul className="mt-5 flex-1 space-y-3">
                    {t.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14px] leading-snug">
                        <Check className={t.emphasis ? "text-blue-action" : "text-dim"} />
                        <span className={t.emphasis ? "text-ink" : "text-muted"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Tier 2 — off-page SEO, a separate subscription ──────────────── */}
      <Section tone="tint">
        <Container>
          <Eyebrow>The optional engine</Eyebrow>
          <TypeIn as="h2" text="Off-page SEO. A separate subscription." className="km-h2 mt-5 max-w-2xl text-ink" />
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="text-[17px] leading-relaxed text-muted">
              The site ranks on its own. Off-page is the accelerant: the work that pushes you toward the
              top of the map pack and the front of the organic results. It is optional, it is separate
              from the $297, and it is priced to your market.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* recommended spend panel */}
            <Reveal>
              <div className="km-card">
                <div className="flex items-center justify-between gap-3 px-7 pt-6">
                  <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">
                    Recommended monthly spend
                  </span>
                  <span className="km-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    Guidance, not a fixed rate
                  </span>
                </div>
                <ul className="mt-4 divide-y divide-line-soft">
                  {OFFPAGE_TIERS.map((t) => (
                    <li
                      key={t.market}
                      className="flex flex-col gap-2 px-7 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <div className="sm:max-w-[62%]">
                        <p className="text-[15.5px] font-bold text-ink">{t.market}</p>
                        <p className="mt-1 text-[13.5px] leading-snug text-muted">{t.note}</p>
                      </div>
                      <span className="km-display km-tabular shrink-0 text-[1.7rem] font-black leading-none text-blue">
                        {t.spend}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* the honest rail */}
            <Reveal delay={0.1}>
              <div className="km-card flex h-full flex-col bg-surface-2 px-7 py-7">
                <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">
                  The honest part
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Off-page lifts your rankings and your traffic, but it decays if you stop. It is an
                  ongoing investment, not a one-and-done. Expect three to six months before it shows. It
                  needs a steady flow of real reviews and a properly set-up Google Business Profile. Most
                  owners run the site without it, and about one in ten add off-page. The site earns either
                  way. Off-page just makes it faster.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Who it's for — qualify IN and OUT ───────────────────────────── */}
      <Section tone="bg">
        <Container>
          <Eyebrow>Who this is for</Eyebrow>
          <TypeIn
            as="h2"
            text="Built for operators who want the whole market."
            className="km-h2 mt-5 max-w-2xl text-ink"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="km-card km-card-blue h-full px-8 py-8">
                <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">
                  This is for you if
                </span>
                <ul className="mt-6 space-y-4">
                  {FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[15.5px] leading-relaxed text-ink">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-blue-action" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="km-card h-full px-8 py-8">
                <span className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">
                  This is not for you if
                </span>
                <ul className="mt-6 space-y-4">
                  {NOT_FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[15.5px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-dim" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-[15.5px] leading-relaxed text-dim">
              We take one contractor per city, per vertical. Qualifying out is not a sales tactic. A
              market with no search demand has no ceiling, and we would rather tell you than take your
              money.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── CTA band ────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink">
            See if your market is open.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            We build for one contractor per city, per vertical. Book a call to check whether yours is
            still open, or read the work first if you want the proof.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/apply" variant="primary">Book a call</Button>
            <Button href="/guides" variant="secondary">Read the buyer&rsquo;s guide</Button>
            <Button href="/audit" variant="secondary">Audit your site</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
