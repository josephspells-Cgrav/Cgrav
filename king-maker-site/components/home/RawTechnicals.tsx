import { Container, Section, Label } from "@/components/ui";
import { Reveal, TypeIn, Eyebrow, Stagger, StaggerItem } from "@/components/motion";

/* F4 (WO_04) — the OS "built by a system" card section, repurposed into the RAW
 * TECHNICALS: on-page + technical SEO, the concrete deliverables = the proof.
 * Agency 3-card format (01/02/03 + kicker + checklist + PROOF) with FLAIR: a mono
 * code teaser per card. Industry-neutral. The AI-OS framing steps back (it's the
 * quiet moat — it lives lighter on /system + /firm). Every PROOF line is TRUE of
 * this very site (schema, llms.txt, SSR all present — the site passes its own audit). */

type Card = {
  n: string;
  kicker: string;
  title: string;
  code: string;
  items: string[];
  proof: string;
};

const CARDS: Card[] = [
  {
    n: "01",
    kicker: "What Google reads",
    title: "On-page SEO",
    code: "<title>[Service] in [City]</title>",
    items: [
      "Keyword + city titles and meta on every page",
      "One clean H1, answer-first content",
      "Internal links, zero orphan pages",
      "Real alt text and heading structure",
    ],
    proof: "70% of contractor sites can't even name their city in the title.",
  },
  {
    n: "02",
    kicker: "The plumbing",
    title: "Technical foundation",
    code: '"@type": "LocalBusiness"',
    items: [
      "Complete schema, machine-readable facts",
      "Server-rendered HTML, not trapped in JavaScript",
      "Sitemap, canonicals, robots, clean URLs",
      "Fast Core Web Vitals, mobile, HTTPS",
    ],
    proof: "This site passes its own technical audit. On the record.",
  },
  {
    n: "03",
    kicker: "The new front door",
    title: "AI & machine-readability",
    code: "llms.txt ✓   ·   GPTBot: allow",
    items: [
      "An llms.txt file so AI engines can cite you",
      "Content AI crawlers can actually read",
      "Answer-format content and entity schema",
      "Live ranking instrumentation, not guesswork",
    ],
    proof: "Ask ChatGPT for the best contractor near you. You exist.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[3px] h-4 w-4 shrink-0 text-blue-action" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8.5l3.4 3.4L13 4.3" />
    </svg>
  );
}

export function RawTechnicals() {
  return (
    <Section id="system" tone="bg">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Under the hood · on-page + technical SEO</Eyebrow>
          <TypeIn
            text="What actually makes a page rank."
            as="h2"
            className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"
          />
          <Reveal delay={0.12} className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
            <p>
              Not a prettier homepage. The unglamorous, technical layer most sites skip — the part
              Google and AI actually read.{" "}
              <span className="font-semibold text-ink">Every line below is true of this site, right now.</span>
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <StaggerItem key={c.n} className="h-full">
              <article className="km-card km-card-hover flex h-full flex-col">
                <div className="h-1.5 w-full bg-blue-action" aria-hidden />
                <div className="flex flex-1 flex-col px-7 py-8 sm:px-8">
                  <div className="flex items-center justify-between">
                    <span className="km-display km-tabular text-[2.4rem] font-black leading-none text-blue">{c.n}</span>
                    <span className="km-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-dim">{c.kicker}</span>
                  </div>
                  <TypeIn text={c.title} as="h3" className="mt-4 text-[1.3rem] font-bold leading-snug tracking-[-0.01em] text-ink" />

                  {/* the flair — a mono code teaser in the deep-blue code housing */}
                  <div className="km-code mt-4 px-3.5 py-2.5">
                    <code className="block break-words text-[11.5px] leading-snug">{c.code}</code>
                  </div>

                  <ul className="mt-5 flex-1 space-y-3.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <Tick />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line bg-blue-tint px-7 py-4 sm:px-8">
                  <p className="text-[13.5px] leading-snug text-ink">
                    <span className="font-bold uppercase tracking-[0.08em] text-blue">Proof — </span>
                    {c.proof}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <Label className="text-dim">The AI build system underneath is the quiet part. The proof is the site you're on.</Label>
        </Reveal>
      </Container>
    </Section>
  );
}
