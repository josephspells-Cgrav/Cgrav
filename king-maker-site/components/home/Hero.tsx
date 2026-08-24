import { Crest } from "@/components/Crest";
import { Button, Container } from "@/components/ui";
import { Reveal, TypeIn, Eyebrow, Parallax } from "@/components/motion";
import { SITES_SCRUBBED } from "@/lib/claims";

/* The flagship fold. Editorial split: heavy type left, the crest as an
 * architectural blue mark right. WE MAKE KINGS via the word-level TypeIn (AI-
 * legible). Blue stays scarce — eyebrow, crest, the seal, the CTA. */
export function Hero() {
  return (
    <section className="km-grain relative overflow-hidden bg-bg pt-[68px]">
      {/* ONE restrained blue aura (anti glow-soup) — top-right, behind the crest.
          Gentle parallax drift on scroll (reduced-motion → static). ±24px lock. */}
      <Parallax
        ariaHidden
        distance={24}
        className="km-aura"
        style={{ top: "-6rem", right: "-8rem", width: "44rem", height: "44rem" }}
      >
        {null}
      </Parallax>
      <Container className="relative grid items-center gap-12 py-10 sm:py-16 lg:grid-cols-[1.15fr_0.75fr] lg:py-16">
        {/* Copy */}
        <div>
          <Eyebrow>Web + SEO firm for contractors</Eyebrow>

          <TypeIn
            text="WE MAKE KINGS"
            as="h1"
            cinematic
            className="mt-6 text-[clamp(2.1rem,5.5vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-ink"
          />

          <Reveal delay={0.15} className="mt-6 max-w-xl">
            <p className="text-[18px] leading-relaxed text-muted sm:text-[19px]">
              A brochure describes your business. An authority site is a ranking system that
              makes a contractor the default name across an entire region.{" "}
              <span className="text-ink">This is the difference, measured, and how to audit it yourself.</span>
            </p>
          </Reveal>

          <Reveal delay={0.28} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/guides" variant="primary">
              Read the Guides
            </Button>
            <Button href="/audit" variant="secondary">
              Audit Your Site
            </Button>
          </Reveal>

          {/* The seal — the measured-sample proof anchor, above the fold (de-GHL). */}
          <Reveal delay={0.4} className="mt-12">
            <div className="km-hairline mb-5 max-w-md" />
            <div className="flex items-center gap-3">
              <Crest className="h-5 w-auto shrink-0" tone="blue" />
              <p className="text-[14px] text-dim">
                We scanned <span className="km-tabular font-semibold text-ink">{SITES_SCRUBBED.toLocaleString()}</span>{" "}
                contractor sites to measure the gap.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The crest as an architectural mark — a machined "tray": an elevated white
            plate cradling an inner blue field, with institutional corner marks. The
            depth + detail lift it off flat white (one framing touch, ONE-aura rule). */}
        <Reveal delay={0.2} y={0} className="relative hidden justify-self-center lg:flex">
          <div className="relative bg-surface p-3 shadow-panel ring-1 ring-line">
            <div className="km-blueprint relative flex flex-col items-center overflow-hidden border border-blue/15 bg-blue-tint px-14 py-12">
              <CornerTicks />
              <Parallax distance={18} className="flex flex-col items-center">
                <Crest className="h-[16rem] w-auto opacity-95 xl:h-[18rem]" tone="blue" />
                <div className="km-hairline mt-6 w-36" />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-dim">
                  Ascension by design
                </p>
              </Parallax>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* Institutional registration marks — four hairline corner ticks framing the
   crest field (the "machined plate" detail). Decorative. */
function CornerTicks() {
  const base = "absolute h-3 w-3 border-blue/40";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} />
    </span>
  );
}
