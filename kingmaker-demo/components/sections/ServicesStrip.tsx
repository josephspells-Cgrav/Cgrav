"use client";

import { motion } from "framer-motion";
import { CharacterStagger } from "@/components/ui/CharacterStagger";

// Scroll reveals use opacity: 0→1 + y: 20→0 per CLAUDE.md standard.
// viewport={{ once: true, amount: 0.1 }} ensures animation fires as soon as 10% is visible.

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12L12 3.75 21.75 12M4.5 10.5V20.25h5.25v-4.5h4.5v4.5H19.5V10.5" />
      </svg>
    ),
    title: "Roof Replacement",
    desc: "Full tear-off and reinstall using premium GAF materials. One crew, one day, lifetime warranty.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Storm Damage Repair",
    desc: "4-hour emergency response. We tarp, repair, and manage your entire insurance claim.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Commercial Roofing",
    desc: "Flat and low-slope systems for commercial properties. Minimum downtime, maximum lifespan.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Roof Inspection",
    desc: "27-point inspection with full photo documentation and a written report — always free.",
  },
];

export default function ServicesStrip() {
  return (
    <section className="section-visible relative bg-[#111116] py-28 px-6 md:px-14 lg:px-20 xl:px-28">

      {/* Header — y only, no opacity */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-sm italic text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>
              What We Do
            </span>
          </div>
          <h2
            className="text-white leading-[0.9]"
            style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
          >
            <CharacterStagger text="Every Job. Every Time." inView /><br />
            <CharacterStagger text="Done Right." className="text-amber-400" inView />
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-white/45 lg:text-right" style={{ fontFamily: "var(--font-playfair-display)" }}>
          <CharacterStagger text="Peak Roofing handles every job type, every property size" inView />
          {" — "}
          <CharacterStagger text="with the same crew and standard of excellence that earned 4,200 five-star reviews." inView />
        </p>
      </motion.div>

      {/* Cards — y stagger only */}
      <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <motion.a
            key={service.title}
            href="#"
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            whileHover="hovered"
            whileTap={{ scale: 0.98 }}
            variants={{
              hovered: {
                scale: 1.05,
                boxShadow: "0 0 0 2px rgba(251,191,36,0.8), 0 0 30px rgba(251,191,36,0.25)",
                zIndex: 10,
              },
            }}
            className="group relative flex flex-col gap-8 bg-[#111116] p-8"
          >
            <motion.div
              className="absolute left-0 right-0 top-0 h-[2px] bg-amber-400"
              variants={{ hovered: { scaleX: 1, opacity: 1 } }}
              initial={{ scaleX: 0 }}
              transition={{ ease: EASE, duration: 0.4 }}
              style={{ transformOrigin: "left" }}
              aria-hidden="true"
            />
            <motion.div className="text-amber-400" variants={{ hovered: { y: -4 } }} transition={{ ease: EASE, duration: 0.3 }}>
              {service.icon}
            </motion.div>
            <motion.div className="flex flex-1 flex-col gap-3" variants={{ hovered: { y: -4 } }} transition={{ ease: EASE, duration: 0.3 }}>
              <h3 className="text-2xl tracking-wide text-white" style={{ fontFamily: "var(--font-bebas-neue)" }}>{service.title}</h3>
              <p className="text-sm leading-relaxed text-white/45" style={{ fontFamily: "var(--font-playfair-display)" }}>{service.desc}</p>
            </motion.div>
            <motion.div className="flex items-center gap-2 text-amber-400" variants={{ hovered: { y: -4 } }} transition={{ ease: EASE, duration: 0.3 }}>
              <span className="text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-bebas-neue)" }}>Learn More</span>
              <motion.span className="text-base" variants={{ hovered: { x: 6 } }} transition={{ ease: EASE, duration: 0.3 }} aria-hidden="true">→</motion.span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
