import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Reveal, TypeIn, Eyebrow, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { RELEVANCY } from "@/lib/claims";

/* F2 (WO_04) — "We build a ranking system": an industry-neutral set of every PAGE
 * CATEGORY a ranking system ships. WO_07 bento (Edit 1): the "Location pages" LEVER
 * is a featured 2x2 cell FILLED with what a location page contains; "Cost & pricing"
 * is promoted to a tall top-right anchor; "Dedicated service pages" drops below the
 * lever; "Service-by-city" is removed (not a real page type we sell); every other
 * card carries a subtle mono "wins [search]" line so none read empty. Gapless
 * (grid-flow-dense, 15 cells = 3x5). The 15x anchor counts up. Mobile = clean stack. */

type Cat = {
  icon: IconKey;
  name: string;
  example: string;
  captures?: string; // the search this page type wins (the density + thesis line)
  bullets?: string[]; // for the lever + the feature cell (fills the tall cells)
  detail?: string[]; // right-column list for the wide cell (balance + density)
  lever?: boolean;
  feature?: boolean;
  wide?: boolean;
};

const CATEGORIES: Cat[] = [
  { icon: "pages", name: "Dedicated service pages", example: "A page for every service you offer, not one buried list.", captures: "[service] contractor near me", bullets: ["Ranks for each thing you actually do", "The detail Google needs to match the search"] },
  {
    icon: "pin",
    name: "Location pages",
    example: "A real page for every town you work, not one “service areas” line.",
    lever: true,
    bullets: [
      "Local landmarks, neighborhoods, and ZIPs you serve",
      "Directions, service radius, and a local number",
      "Real projects and reviews from that town",
      "“[Service] in [City]” in the title and the H1",
    ],
  },
  { icon: "tag", name: "Product & brand pages", example: "Every product line and brand you carry, its own page.", captures: "[brand] installer near me", bullets: ["Catches brand-name searches near you", "Manufacturer trust, on your own domain"] },
  { icon: "bolt", name: "Specialty & emergency pages", example: "Your urgent, high-ticket work — the searches that convert.", captures: "emergency [service] near me", bullets: ["Catches the buyer who needs you today", "Your highest-margin work, found first"] },
  {
    icon: "dollar",
    name: "Cost & pricing pages",
    example: "The buyer’s first question, answered: what does it cost?",
    captures: "how much does [service] cost",
    bullets: [
      "Real ranges, not “call for a quote”",
      "What drives the price up or down",
      "Catches the research-stage buyer first",
    ],
  },
  { icon: "calc", name: "Instant estimate tool", example: "A calculator that turns a browser into a booked lead.", captures: "instant [service] quote", bullets: ["Captures the price-shopper before they leave", "A real reason to fill out the form"] },
  { icon: "card", name: "Financing", example: "Monthly-payment options, so a big number doesn’t scare them off.", captures: "[service] financing", bullets: ["Keeps the sticker price from killing the deal", "Pre-qualifies the budget early"] },
  { icon: "book", name: "Resources cluster", example: "Guides, a glossary, a blog — the content that earns trust and rankings.", captures: "how / which / what [service]", bullets: ["Buyer guides, glossary, and how-tos", "Cost and comparison articles", "An ongoing local blog"] },
  { icon: "image", name: "Project gallery", example: "Real, geo-tagged jobs. Proof, not stock photos.", captures: "[service] before and after", bullets: ["Proof a buyer can actually see", "Fresh local content Google rewards"] },
  { icon: "shield", name: "Trust pages", example: "About, reviews, certifications, warranty, FAQ — the credibility layer.", captures: "[company] reviews", bullets: ["Answers the 'are they legit' search", "The last check before they call"] },
];

export function PageSystem() {
  const lever = CATEGORIES.find((c) => c.lever)!;
  const cards = CATEGORIES.filter((c) => !c.lever);

  return (
    <Section id="proof" tone="bg">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>What we build</Eyebrow>
            <TypeIn
              text="We build a ranking system."
              as="h2"
              className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"
            />
            <Reveal delay={0.12} className="mt-6 text-[17px] leading-relaxed text-muted">
              <p>
                Not ten pages that describe you. A real, rankable page for{" "}
                <span className="font-semibold text-ink">every service you offer and every town you work</span> —
                each one a door a buyer can walk through. Here is the full set.
              </p>
            </Reveal>
          </div>
          {/* the 15x relevancy anchor */}
          <Reveal delay={0.18}>
            <div className="km-card km-card-hover px-7 py-6">
              <div className="flex items-baseline gap-3">
                <CountUp
                  to={RELEVANCY.multiple}
                  suffix="×"
                  className="km-display km-tabular text-[3.4rem] font-black leading-none text-blue"
                />
                <p className="text-[14.5px] leading-snug text-muted">
                  the content surface of a brochure, eligible on roughly {RELEVANCY.multiple}&#215; the searches.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The thesis (folded from the retired /system): why the ranking system wins. */}
        <Reveal delay={0.16} className="mt-8 max-w-3xl space-y-3 text-[17px] leading-relaxed text-muted">
          <p>
            <span className="font-semibold text-ink">Organic regional dominance is the engine. The map pack is a proximity-capped byproduct.</span> You cannot scale a contractor to $5M on a five-mile radius.
          </p>
          <p>
            A deep, owned site is the most relevant result. It compounds, it cannot be suspended like a map pin, and it captures the entire research lane a brochure never sees.
          </p>
        </Reveal>

        {/* LEVER — a standalone, full-width featured card (content-height; it never
            stretches into dead space). The 9 page-types follow in an even grid below. */}
        <Reveal className="mt-12">
            <div className="km-card-blue km-card-hover flex flex-col px-7 py-7">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-blue text-white">
                  <Icon k={lever.icon} className="h-7 w-7" />
                </span>
                <span className="km-mono shrink-0 bg-blue px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  the lever
                </span>
              </div>
              {/* 2-col body — name/example left, the "what it contains" list right, so the
                  wide cell reads balanced (no dead space on the right). Stacks on mobile. */}
              <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <div className="flex flex-col">
                  <TypeIn text={lever.name} as="h3" className="text-[clamp(1.45rem,2vw,1.95rem)] font-extrabold leading-[1.08] tracking-[-0.015em] text-ink" />
                  <ul className="mt-4 space-y-3">
                    <li className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-blue" />
                      <span>A real page for every town you work, not one buried &ldquo;service areas&rdquo; hub.</span>
                    </li>
                    <li className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-blue" />
                      <span>The page Google shows a buyer one town over &mdash; where a brochure has nothing to rank.</span>
                    </li>
                  </ul>
                  <div className="km-hairline mt-auto hidden w-24 sm:block" />
                </div>
                <div className="border-blue/15 sm:border-l sm:pl-7">
                  <p className="km-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-blue">What a location page contains</p>
                  <ul className="mt-3.5 space-y-2.5">
                    {lever.bullets!.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[13.5px] leading-snug text-ink">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-blue" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* fill the rest of the tall cell — rank past the GBP radius + the scale */}
              <div className="mt-6 border-t border-blue/15 pt-5">
                <p className="text-[13.5px] leading-relaxed text-muted">
                  <span className="font-semibold text-ink">Rank past your Google Business Profile.</span> A GBP only reaches the ~10-mile map radius; location pages win organic search across the whole region.
                </p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "10 to 15 location pages, one per town you serve",
                    "Each ranks for its own town, organically",
                    "Built for towns past your GBP's reach",
                    "Replaces one buried 'service areas' line",
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-[13px] leading-snug text-ink">
                      <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-blue" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

        {/* The 9 page-types — one even, content-sized grid (no row-spans to stretch). */}
        <Stagger className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {cards.map((c) => (
            <StaggerItem key={c.name} className="h-full">
              <div className="km-card km-card-hover group flex h-full flex-col px-5 py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-100 text-blue ring-1 ring-blue/20 transition-colors duration-200 group-hover:bg-blue group-hover:text-white">
                  <Icon k={c.icon} className="h-6 w-6" />
                </span>
                <TypeIn text={c.name} as="h3" className="mt-4 text-[16px] font-bold leading-snug text-ink" />
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{c.example}</p>
                {c.bullets ? (
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-blue" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {c.captures ? (
                  <p className="km-mono mt-auto flex items-center gap-1.5 pt-4 text-[10px] uppercase tracking-[0.12em]">
                    <span className="text-dim">wins</span>
                    <span className="truncate text-blue">{c.captures}</span>
                  </p>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Link
            href="/playbook"
            className="group km-mono mt-9 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-blue transition-colors hover:text-blue-action"
          >
            How the system gets built{" "}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

/* Minimal, consistent 1.5-stroke line icons (not generic Lucide). */
type IconKey =
  | "pages" | "pin" | "target" | "tag" | "bolt" | "dollar" | "calc" | "card" | "book" | "image" | "shield";

const PATHS: Record<IconKey, React.ReactNode> = {
  pages: <><rect x="4" y="3" width="11" height="14" rx="1" /><path d="M8 7h4M8 10h4M8 13h2" /></>,
  pin: <><path d="M10 17s5-4.5 5-9a5 5 0 1 0-10 0c0 4.5 5 9 5 9Z" /><circle cx="10" cy="8" r="1.6" /></>,
  target: <><circle cx="10" cy="10" r="6.5" /><circle cx="10" cy="10" r="2.4" /><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2" /></>,
  tag: <><path d="M3 3h6l8 8-6 6-8-8V3Z" /><circle cx="6.5" cy="6.5" r="1.1" /></>,
  bolt: <path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z" />,
  dollar: <><path d="M10 2v16" /><path d="M13.5 5.5c0-1.4-1.6-2.5-3.5-2.5S6.5 4.1 6.5 5.5 8.1 8 10 8s3.5 1.1 3.5 2.5S11.9 13 10 13s-3.5-1.1-3.5-2.5" /></>,
  calc: <><rect x="4" y="2.5" width="12" height="15" rx="1.5" /><path d="M7 6h6M7 10h.01M10 10h.01M13 10h.01M7 13h.01M10 13h.01M13 13h.01" /></>,
  card: <><rect x="2.5" y="5" width="15" height="10" rx="1.5" /><path d="M2.5 8.5h15M5.5 12h3" /></>,
  book: <><path d="M4 3h8a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V3Z" /><path d="M14 5h2v12H6" /></>,
  image: <><rect x="3" y="4" width="14" height="12" rx="1.5" /><circle cx="7.5" cy="8.5" r="1.4" /><path d="m4 14 4-3.5 4 3 3-2.5 1 1.5" /></>,
  shield: <><path d="M10 2.5 4 5v4.5c0 3.6 2.6 6.4 6 7.5 3.4-1.1 6-3.9 6-7.5V5l-6-2.5Z" /><path d="m7.5 9.5 1.8 1.8L13 7.5" /></>,
};

function Icon({ k, className = "h-5 w-5" }: { k: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[k]}
    </svg>
  );
}
