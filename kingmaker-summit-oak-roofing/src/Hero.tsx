import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TypeIn, Reveal, Eyebrow, ENTER_EASE } from "./motion";

const SITUATIONS = [
  "Full Replacement",
  "Storm / Hail Damage",
  "Roof Repair",
  "Just an Inspection",
] as const;

const PROOF = [
  { v: "2,400+", l: "roofs installed" },
  { v: "18 yrs", l: "in the Triangle" },
  { v: "25 yr", l: "workmanship warranty" },
];

const PHONE = "(919) 555-0185";
const PHONE_TEL = "+19195550185";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // estimate card state
  const [situation, setSituation] = useState<string | null>(null);
  const [zip, setZip] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const canStep2 = situation !== null && /^\d{5}$/.test(zip);

  // one rationed scroll-coupled beat — slow photo parallax (transform-only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* cinematic photo + parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={reduce ? { transform: "scale(1.06)" } : { y: photoY, scale: photoScale }}
      >
        <img
          src="/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/92 lg:via-ink/80 to-ink/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)" }}
        initial={reduce ? false : { opacity: 0.5 }}
        animate={reduce ? undefined : { opacity: [0.5, 0.66, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-14 items-center pt-14 lg:pt-20 pb-16 lg:pb-24 min-h-[640px] lg:min-h-[760px]">
        {/* LEFT — editorial statement + trust */}
        <div>
          <Eyebrow className="mb-6">Raleigh &middot; Wake County</Eyebrow>

          <TypeIn
            text="The Last Roof Your Home Will Ever Need."
            as="h1"
            cinematic
            delay={0.1}
            className="font-display font-semibold text-white text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[1.04] tracking-[-0.01em]"
          />

          <motion.span
            aria-hidden
            className="block origin-left bg-red rounded-full mt-5"
            style={{ height: 3, width: "clamp(120px, 22vw, 230px)", boxShadow: "0 0 2px rgba(216,38,44,0.55)" }}
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.5, ease: ENTER_EASE }}
          />

          <Reveal delay={0.35} y={20}>
            <p className="mt-7 text-[17px] md:text-[19px] leading-relaxed text-mist max-w-xl">
              Storm tear-offs, full re-roofs, and insurance-claim help across the
              Triangle. GAF Master Elite crews, a written 25-year workmanship
              warranty, and a real person on the line when the rain starts.
            </p>
          </Reveal>

          {/* trust triad */}
          <Reveal delay={0.45} y={16} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="text-redink text-lg leading-none">★★★★★</span>
              <span className="font-semibold text-white">4.9</span>
              <span className="text-mist">&middot; 312 Google reviews</span>
            </span>
            <span className="inline-flex items-center gap-2 text-mist">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              GAF Master Elite&reg;
            </span>
            <span className="inline-flex items-center gap-2 text-mist">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              Licensed &amp; Insured &middot; NC #74122
            </span>
          </Reveal>

          {/* proof stats */}
          <Reveal delay={0.55} y={16} className="mt-9 max-w-md">
            <motion.span
              aria-hidden
              className="block h-px bg-line origin-left"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: ENTER_EASE }}
            />
            <div className="grid grid-cols-3 gap-5 pt-6">
              {PROOF.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl md:text-3xl font-semibold text-white">{s.v}</div>
                  <div className="text-[12px] text-mist mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.65} y={14}>
            <a
              href={`tel:${PHONE_TEL}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-md border border-line bg-white/5 px-5 py-3 text-[15px] font-semibold text-white hover:bg-surface hover:-translate-y-0.5 transition-all duration-200"
            >
              <PhoneIcon className="h-4 w-4 text-redink transition-transform duration-200 group-hover:rotate-[-12deg]" />
              <span>{`Call ${PHONE}`}</span>
            </a>
          </Reveal>
        </div>

        {/* RIGHT — instant-estimate capture card */}
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, x: 56, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.25, ease: ENTER_EASE }}
        >
          <div className="relative rounded-2xl bg-surface/95 backdrop-blur-sm border border-line shadow-card p-6 sm:p-7 overflow-hidden">
            <span aria-hidden className="absolute top-0 right-0 h-6 w-6 bg-red" style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }} />
            <div className="flex items-center gap-2 mb-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-mist">Instant Estimate</span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[28px] font-semibold leading-tight text-white">
              Get Your Free Estimate in 60 Seconds.
            </h2>
            <p className="text-[14px] text-mist mt-2">No phone tag. See a real price range, then we confirm the details.</p>

            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div key="s1" {...stepAnim(reduce)} className="mt-5">
                  <label className="text-[12px] font-semibold text-mist uppercase tracking-wide">What&rsquo;s Going On?</label>
                  <div className="mt-2 grid grid-cols-2 gap-2.5">
                    {SITUATIONS.map((opt) => {
                      const active = situation === opt;
                      return (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() => setSituation(opt)}
                          aria-pressed={active}
                          whileTap={reduce ? undefined : { scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className={`rounded-lg border px-3 py-3 text-left text-[14px] font-medium transition-colors duration-150 ${
                            active ? "border-red bg-red/15 text-white" : "border-line bg-ink/40 text-white/90 hover:border-redhi"
                          }`}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                  <input
                    inputMode="numeric"
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="ZIP code"
                    aria-label="ZIP code"
                    className="mt-3 w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-[15px] text-white placeholder:text-mist outline-none focus:border-red transition-colors"
                  />
                  <PrimaryButton disabled={!canStep2} onClick={() => canStep2 && setStep(2)} reduce={reduce}>
                    Get My Estimate
                  </PrimaryButton>
                  <p className="text-[12px] text-mist text-center mt-2.5">Free &middot; no obligation &middot; 312 neighbors quoted this year</p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" {...stepAnim(reduce)} className="mt-5">
                  <div className="rounded-lg bg-ink/50 border border-line px-4 py-3 mb-3">
                    <div className="text-[11px] uppercase tracking-wide text-mist">Estimated range for your project</div>
                    <div className="font-display text-3xl font-semibold mt-0.5 text-white">$9,400 &ndash; $24,800</div>
                    <div className="text-[12px] text-mist mt-0.5">or about <span className="text-white font-semibold">$129/mo</span> with financing</div>
                  </div>
                  <label className="text-[12px] font-semibold text-mist uppercase tracking-wide">Where Do We Send the Detailed Quote?</label>
                  <div className="mt-2 space-y-2.5">
                    <input placeholder="Full name" aria-label="Full name" className="w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-[15px] text-white placeholder:text-mist outline-none focus:border-red transition-colors" />
                    <input placeholder="Phone" aria-label="Phone" inputMode="tel" className="w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-[15px] text-white placeholder:text-mist outline-none focus:border-red transition-colors" />
                  </div>
                  <PrimaryButton onClick={() => setStep(3)} reduce={reduce}>Send My Free Quote</PrimaryButton>
                  <button type="button" onClick={() => setStep(1)} className="mt-3 w-full text-[12px] text-mist hover:text-white transition-colors">&larr; Start over</button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" {...stepAnim(reduce)} className="mt-5 text-center py-4">
                  <div aria-hidden className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-red/15 text-redink">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">You&rsquo;re on the Schedule.</h3>
                  <p className="text-[14px] text-mist mt-2">A real estimator replies within the hour, not days. Keep an eye on your phone.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function stepAnim(reduce: boolean | null) {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.32, ease: ENTER_EASE },
  };
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  reduce,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={reduce || disabled ? undefined : { y: -2 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red px-5 py-3.5 text-[16px] font-bold text-white shadow-glow transition-colors duration-200 hover:bg-redhi disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
    >
      {children}
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </motion.button>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
