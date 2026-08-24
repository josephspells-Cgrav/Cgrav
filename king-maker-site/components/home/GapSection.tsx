import Link from "next/link";
import { Container, Section, FlagChip } from "@/components/ui";
import { Reveal, TypeIn, Eyebrow, Stagger, StaggerItem, CountUp, DrawLine } from "@/components/motion";
import { FINDABILITY_GAPS, FINDABILITY_FLAG, SITES_SCRUBBED, REFERENCE_BUILD } from "@/lib/claims";

/* F1 — THE FINDABILITY GAP, as 4 single cards (Joseph's mockup, 2026-06-26):
 * icon chip -> big number -> uppercase label -> divider -> "what it costs them"
 * -> 3 red-X cost bullets. The big NUMBERS render RED (the damage signal, his
 * call) and the cost bullets use a red X (the "missing" mark); blue stays the
 * brand/accent (the icon chip + the eyebrow). The number counts up (one-shot,
 * reduced-motion-safe). Square corners kept (the institutional brand lock).
 * Industry-neutral; the 1,017 numbers are MEASURED (static-HTML). Mobile stacks. */
export function GapSection() {
  return (
    <Section id="problem" tone="tint">
      <Container>
        <div className="max-w-5xl">
          <Eyebrow>The gap, measured</Eyebrow>
          <TypeIn
            text="Most contractor sites can't be found."
            as="h2"
            className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink lg:whitespace-nowrap"
          />
          <Reveal delay={0.12} className="mt-6 max-w-3xl text-[17px] leading-relaxed text-muted">
            <p>
              We scanned <span className="font-semibold text-ink">{SITES_SCRUBBED.toLocaleString()}</span> live
              contractor sites for one thing: can a buyer in the next town actually{" "}
              <span className="font-semibold text-ink underline decoration-blue decoration-2 underline-offset-4">find them</span>?
              Most can't. Here is where they break, worst first.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <FlagChip flag={FINDABILITY_FLAG} />
            <span className="text-[13.5px] text-dim">
              Absence, not fakes. They just never built the pages.
            </span>
          </Reveal>
        </div>

        {/* 4 cards — icon, big red number, label, divider, the cost as red-X lines. */}
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FINDABILITY_GAPS.map((g) => (
            <StaggerItem key={g.label} className="h-full">
              {/* blue frame = structure, lifted off the tint band (3D); red = the
                  damage signals only (number, caret-arrow, underline, X bullets). */}
              <div className="km-card-hover group flex h-full flex-col border-2 border-blue/30 bg-surface shadow-lift">
                <div className="flex flex-1 flex-col px-6 py-6">
                  {/* bordered header — the "why" as a bullet; box spans the card, text wraps (keeps 4-across) */}
                  <div className="flex items-start gap-2 border border-blue/30 bg-blue-tint/60 px-3 py-2.5">
                    <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-blue" />
                    <span className="text-[13px] font-semibold leading-snug text-blue">{g.why}</span>
                  </div>
                  {/* big RED number */}
                  <CountUp
                    to={g.pct}
                    suffix="%"
                    duration={1.65}
                    className="km-display km-tabular mt-5 block text-[3.1rem] font-black leading-none text-red"
                  />
                  {/* label (one line) — a red slow-blink caret-arrow points at it, a red line draws fully under it */}
                  <div className="mt-3 flex items-center gap-2">
                    <span aria-hidden className="km-arrow-blink shrink-0 text-[13px] font-bold leading-none text-red">&#9656;</span>
                    <p className="whitespace-nowrap text-[12px] font-bold uppercase leading-snug tracking-[0.02em] text-ink">{g.label}</p>
                  </div>
                  <DrawLine color="var(--color-red)" width="100%" height={2} delay={0.2} className="mt-2.5" />
                  {/* what it costs them */}
                  <p className="km-mono mt-5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-blue">
                    What it costs them
                  </p>
                  {/* the cost — red X bullets (~5 each) */}
                  <ul className="mt-3.5 space-y-2.5">
                    {g.cost.map((c) => (
                      <li key={c} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                        <XMark />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* The counter — a live one done right (the reference-build line). */}
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-7 text-[14px]">
            <span className="font-semibold uppercase tracking-[0.16em] text-blue">Now a live one done right</span>
            <span className="text-dim">/</span>
            <Link
              href={REFERENCE_BUILD.url}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              {REFERENCE_BUILD.name} — {REFERENCE_BUILD.pages} pages. Click every one, then audit it with any AI.
              <span aria-hidden className="text-blue transition-transform duration-200 group-hover:translate-x-0.5">
                &#8599;
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* The red "missing" mark on each cost bullet. */
function XMark() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-red" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/* Contextual chip icons (minimal 1.5-stroke, not generic Lucide). */
type GapIconKey = "pin" | "title" | "code" | "doc";
const GAP_PATHS: Record<GapIconKey, React.ReactNode> = {
  pin: <><path d="M10 17.5c3.6-4.2 5.5-7 5.5-9.5a5.5 5.5 0 1 0-11 0c0 2.5 1.9 5.3 5.5 9.5Z" /><circle cx="10" cy="8" r="2" /></>,
  title: <><rect x="3" y="4" width="14" height="12" rx="1.5" /><path d="M3 7.5h14" /><circle cx="5.4" cy="5.75" r="0.5" /><circle cx="7.3" cy="5.75" r="0.5" /></>,
  code: <><path d="M6.5 6l-3.5 4 3.5 4" /><path d="M13.5 6l3.5 4-3.5 4" /><path d="M11.5 4.5l-3 11" /></>,
  doc: <><path d="M5.5 2.5h6l3.5 3.5v11h-9.5z" /><path d="M11.5 2.5v4h4" /><path d="M7.5 11h5M7.5 14h3" /></>,
};
function GapIcon({ k }: { k: GapIconKey }) {
  return (
    <svg viewBox="0 0 20 20" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {GAP_PATHS[k]}
    </svg>
  );
}
