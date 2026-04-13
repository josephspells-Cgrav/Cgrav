"use client";

import { motion } from "framer-motion";
import { CharacterStagger } from "@/components/ui/CharacterStagger";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const AREAS = [
  "Charlotte", "Matthews", "Concord", "Huntersville",
  "Mooresville", "Kannapolis", "Gastonia", "Rock Hill",
  "Mint Hill", "Indian Trail", "Stallings", "Waxhaw",
  "Harrisburg", "Cornelius", "Davidson", "Pineville",
  "Ballantyne", "Steele Creek", "University City", "NoDa",
];

export default function ServiceAreas() {
  return (
    <section className="section-visible relative bg-[#0d0d0d] py-28 px-6 md:px-14 lg:px-20 xl:px-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.3), transparent)" }}
        aria-hidden="true"
      />

      {/* Header — y only */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-sm italic text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>
              Service Coverage
            </span>
          </div>
          <h2
            className="leading-[0.9] text-white"
            style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            <CharacterStagger text="We Cover All Of" inView /><br />
            <CharacterStagger text="Greater Charlotte." className="text-amber-400" inView />
          </h2>
        </div>
        <p className="max-w-xs text-base leading-relaxed text-white/42" style={{ fontFamily: "var(--font-playfair-display)" }}>
          Serving 40+ communities across the greater Charlotte metro — same crew,
          same standards, same 4-hour response guarantee.
        </p>
      </motion.div>

      {/* Pills — staggered reveal, scale(1.08) + bright highlight on hover */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {AREAS.map((area, i) => (
          <motion.a
            key={area}
            href={`#${area.toLowerCase().replace(" ", "-")}`}
            className="border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-white/60"
            style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.12em", fontSize: "0.85rem" }}
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.03 }}
            whileHover={{
              scale: 1.08,
              color: "#fbbf24",
              borderColor: "rgba(251,191,36,0.8)",
              backgroundColor: "rgba(251,191,36,0.08)",
              boxShadow: "0 0 18px rgba(251,191,36,0.25)",
              transition: { ease: EASE, duration: 0.22 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            {area}
          </motion.a>
        ))}
        <motion.span
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: EASE, delay: AREAS.length * 0.03 }}
          className="border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-white/25"
          style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.12em", fontSize: "0.85rem" }}
        >
          + 20 More Areas
        </motion.span>
      </motion.div>
    </section>
  );
}
