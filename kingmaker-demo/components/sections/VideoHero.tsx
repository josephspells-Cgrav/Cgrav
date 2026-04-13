"use client";

import { motion } from "framer-motion";

// No GSAP, no opacity animation — y only

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function VideoHero() {
  return (
    <section className="section-visible relative h-[60vh] overflow-hidden" aria-label="Aerial showcase">
      {/*
        REPLACE WITH REAL ASSET:
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/video/charlotte-aerial-timelapse.webm" type="video/webm" />
        </video>
        Source: Kling AI — slow aerial timelapse of Charlotte NC neighborhoods at dusk
      */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0d1520 0%, #0a1028 25%, #111830 50%, #0d1520 75%, #080e18 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.8) 60px, rgba(255,255,255,0.8) 61px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.8) 80px, rgba(255,255,255,0.8) 81px)" }} aria-hidden="true" />
      <div className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)" }} aria-hidden="true" />
      <div className="grain-overlay z-[2]" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-amber-400/60" />
            <span className="text-sm italic text-amber-400/80" style={{ fontFamily: "var(--font-playfair-display)" }}>Serving Charlotte From Above</span>
            <div className="h-px w-10 bg-amber-400/60" />
          </div>

          <h2 className="max-w-4xl text-center leading-[0.9] text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            Charlotte&apos;s Skyline.{" "}
            <span className="text-amber-400">Protected By Peak.</span>
          </h2>

          <motion.button aria-label="Play aerial timelapse" className="group flex items-center gap-4" whileHover="hovered">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/50 bg-black/40 backdrop-blur-sm"
              variants={{ hovered: { scale: 1.1, borderColor: "rgba(251,191,36,1)", boxShadow: "0 0 30px rgba(251,191,36,0.3)" } }}
              transition={{ ease: EASE, duration: 0.35 }}
            >
              <svg viewBox="0 0 24 24" fill="#fbbf24" className="w-6 h-6 translate-x-0.5">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </motion.div>
            <motion.span
              className="text-sm uppercase tracking-widest text-white/50"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
              variants={{ hovered: { color: "rgba(251,191,36,0.9)", x: 4 } }}
              transition={{ ease: EASE, duration: 0.3 }}
            >
              Watch The Transformation
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
