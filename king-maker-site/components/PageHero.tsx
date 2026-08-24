import Link from "next/link";
import { Container } from "./ui";
import { Reveal, TypeIn, Eyebrow } from "./motion";

/* Shared inner-page hero. Lighter than the home hero — eyebrow + animated H1 +
 * lede + breadcrumb. The aura appears once, restrained. */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumb,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumb?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft bg-bg pt-[68px]">
      <div
        className="km-aura"
        aria-hidden
        style={{ top: "-8rem", right: "-6rem", width: "34rem", height: "34rem" }}
      />
      <Container className="relative py-20 sm:py-28">
        {crumb ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-[12px] uppercase tracking-[0.2em] text-dim">
            <Link href="/" className="transition-colors hover:text-ink">
              King Maker
            </Link>
            <span className="mx-2 text-line" aria-hidden>
              /
            </span>
            <span className="text-muted">{crumb}</span>
          </nav>
        ) : null}
        <Eyebrow>{eyebrow}</Eyebrow>
        <TypeIn
          text={title}
          as="h1"
          cinematic
          className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.6rem)] font-black leading-[0.98] tracking-[-0.03em] text-ink"
        />
        {lede ? (
          <Reveal delay={0.15} className="mt-7 max-w-2xl">
            <p className="text-[18px] leading-relaxed text-muted">{lede}</p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

/** A small "more to come" note for Phase-1 shells (honest, on-brand). */
export function ComingOnline({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-blue">
      <span aria-hidden>&#9670;</span>
      {children}
    </p>
  );
}
