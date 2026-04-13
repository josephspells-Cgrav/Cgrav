"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CharacterStagger } from "@/components/ui/CharacterStagger";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP: line scaleX ONLY — does not touch any element Framer Motion animates
// Framer Motion: y transform ONLY — no opacity

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const STEPS = [
  { num: "01", title: "Free Inspection",     desc: "We assess your roof at no charge — fully documented with photos and a written report you keep." },
  { num: "02", title: "Custom Quote",        desc: "Transparent, itemized pricing delivered same-day. No surprises on the invoice, no pressure to sign." },
  { num: "03", title: "Expert Installation", desc: "GAF Master Elite–certified crew. Most full replacements completed start to finish in a single day." },
  { num: "04", title: "Lifetime Warranty",   desc: "Workmanship guaranteed for the life of the roof. Every nail, every flashing, every seal." },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const fallback = setTimeout(() => {
        if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
      }, 1000);
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 60%", end: "bottom 55%", scrub: 1.5,
          onEnter: () => clearTimeout(fallback),
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-visible relative bg-[#0d0d0d] py-28 px-6 md:px-14 lg:px-20 xl:px-28">

      {/* Header — y only */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-20"
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400" />
          <span className="text-sm italic text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>How It Works</span>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="leading-[0.9] text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
            <CharacterStagger text="From First Call to" inView /><br />
            <CharacterStagger text="Final Warranty." className="text-amber-400" inView />
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-white/45" style={{ fontFamily: "var(--font-playfair-display)" }}>
            <CharacterStagger text="Four steps. Zero confusion. A roof that outlasts the warranty on your last three appliances combined." inView />
          </p>
        </div>
      </motion.div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative mb-0">
          <div className="absolute left-[3.5rem] right-[3.5rem] top-[2.2rem] h-px bg-white/[0.08]" />
          {/* GSAP scaleX only — Framer Motion never touches this element */}
          <div ref={lineRef} className="absolute left-[3.5rem] right-[3.5rem] top-[2.2rem] h-px origin-left bg-amber-400" style={{ transform: "scaleX(0)" }} />
        </div>
        <div className="grid grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.12 }}
              whileHover="hovered"
              variants={{ hovered: { scale: 1.03, transition: { ease: EASE, duration: 0.35 } } }}
              className="flex flex-col cursor-default"
            >
              <div className="mb-8 flex items-center gap-4">
                <motion.div
                  className="relative flex h-[2.2rem] w-[2.2rem] flex-shrink-0 items-center justify-center rounded-full border bg-[#0d0d0d]"
                  variants={{ hovered: { borderColor: "rgba(251,191,36,1)", boxShadow: "0 0 14px rgba(251,191,36,0.45)" } }}
                  style={{ borderColor: "rgba(251,191,36,0.5)" }}
                  transition={{ ease: EASE, duration: 0.3 }}
                >
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                </motion.div>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-bebas-neue)", color: "#EAB308", textShadow: "0 0 30px rgba(234, 179, 8, 1), 0 0 60px rgba(234, 179, 8, 0.8)" }}>Step</span>
              </div>
              <span className="mb-2 leading-none" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "3.5rem", color: "#EAB308", textShadow: "0 0 30px rgba(234, 179, 8, 1), 0 0 60px rgba(234, 179, 8, 0.8)" }}>{step.num}</span>
              <motion.h3
                className="mb-3 text-2xl text-white"
                variants={{ hovered: { color: "#fbbf24" } }}
                transition={{ ease: EASE, duration: 0.25 }}
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                {step.title}
              </motion.h3>
              <p className="text-sm leading-relaxed text-white/42" style={{ fontFamily: "var(--font-playfair-display)" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col lg:hidden">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
            className="relative flex gap-8 pb-12"
          >
            {i < STEPS.length - 1 && <div className="absolute left-[1.05rem] top-[2rem] bottom-0 w-px bg-white/[0.08]" />}
            <div className="relative flex h-[2.1rem] w-[2.1rem] flex-shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-[#0d0d0d]">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
            </div>
            <div>
              <span className="text-[2.5rem] leading-none" style={{ fontFamily: "var(--font-bebas-neue)", color: "#EAB308", textShadow: "0 0 30px rgba(234, 179, 8, 1), 0 0 60px rgba(234, 179, 8, 0.8)" }}>{step.num}</span>
              <h3 className="text-2xl text-white" style={{ fontFamily: "var(--font-bebas-neue)" }}>{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/42" style={{ fontFamily: "var(--font-playfair-display)" }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
