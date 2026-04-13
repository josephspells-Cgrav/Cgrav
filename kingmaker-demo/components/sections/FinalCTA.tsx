"use client";

import { motion } from "framer-motion";
import { CharacterStagger } from "@/components/ui/CharacterStagger";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function FinalCTA() {
  return (
    <section className="section-visible relative overflow-hidden bg-[#0d0d0d] py-32 px-6 md:px-14 lg:px-20 xl:px-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.10) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />
      <div className="grain-overlay z-[1]" aria-hidden="true" />

      <motion.div
        initial={{ y: 28 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400/60" />
          <span className="text-sm italic text-amber-400/80" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Ready When You Are
          </span>
          <div className="h-px w-10 bg-amber-400/60" />
        </div>

        <h2
          className="leading-[0.88] text-white"
          style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
        >
          <CharacterStagger text="Your Roof Won't" inView /><br />
          <CharacterStagger text="Fix Itself." className="text-amber-400" inView />
        </h2>

        <p
          className="mt-8 max-w-lg text-lg leading-[1.75] text-white/50"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Free inspections. Same-day quotes. Crews ready now.
          Every call answered. Every job backed by a lifetime warranty.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          {/* Primary */}
          <motion.a
            href="#contact"
            className="relative inline-flex items-center gap-3 overflow-hidden bg-amber-400 px-9 py-4 text-black"
            whileHover="hovered"
            whileTap={{ scale: 0.97 }}
            variants={{ hovered: { scale: 1.04, boxShadow: "0 0 45px rgba(251,191,36,0.55), 0 0 90px rgba(251,191,36,0.2)" } }}
            transition={{ ease: EASE, duration: 0.35 }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ boxShadow: ["0 0 15px rgba(251,191,36,0.25)", "0 0 35px rgba(251,191,36,0.50)", "0 0 15px rgba(251,191,36,0.25)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.span
              className="absolute inset-0 bg-white"
              initial={{ x: "-101%" }}
              variants={{ hovered: { x: "0%" } }}
              transition={{ ease: EASE, duration: 0.42 }}
              aria-hidden="true"
            />
            <span className="relative z-10 text-[1.1rem] uppercase tracking-widest" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              Get Your Free Estimate
            </span>
            <motion.span
              className="relative z-10 text-lg"
              variants={{ hovered: { x: 6 } }}
              transition={{ ease: EASE, duration: 0.3 }}
              aria-hidden="true"
            >→</motion.span>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="tel:+17045550100"
            className="inline-flex items-center gap-3 border border-white/20 px-9 py-4 text-white/70 transition-colors hover:border-amber-400/50 hover:text-white"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-[1.1rem] uppercase tracking-widest" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              Call Now: (704) 555-0100
            </span>
          </motion.a>
        </div>

        <p className="mt-8 text-[0.68rem] uppercase tracking-[0.25em] text-white/22" style={{ fontFamily: "var(--font-bebas-neue)" }}>
          Licensed · Insured · GAF Master Elite Certified · No Obligation
        </p>
      </motion.div>
    </section>
  );
}
