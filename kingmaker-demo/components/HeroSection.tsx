"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Counter } from "@/components/ui/Counter";

// ── Easing ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// ── Magnetic glow CTA style ───────────────────────────────────────────────
// Shared across hero + nav buttons per CLAUDE.md CTA standard
const magneticGlow = {
  rest: {},
  hover: {
    scale: 1.02,
    boxShadow:
      "0 0 25px rgba(251,191,36,0.85), 0 0 60px rgba(251,191,36,0.45), 0 0 100px rgba(251,191,36,0.2)",
  },
};

// ── Headline data ─────────────────────────────────────────────────────────
const HEADLINE_LINES = [
  { text: "WHEN STORMS", amber: false },
  { text: "HIT, WE", amber: false },
  { text: "ANSWER.", amber: true },
];

// Split a line into char spans for stagger — preserves spaces
function CharLine({
  text,
  amber,
}: {
  text: string;
  amber: boolean;
}) {
  return (
    <div className="flex leading-[0.88]" style={{ perspective: "800px" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 80, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { ease: EASE, duration: 0.6 },
            },
          }}
          className={char === " " ? "inline-block w-[0.25em]" : ""}
          style={{
            display: "inline-block",
            color: amber ? "#fbbf24" : "#f5f5f0",
            transformOrigin: "top center",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

// ── Stat counter item ─────────────────────────────────────────────────────
function StatItem({
  target,
  format,
  suffix,
  label,
  delay,
}: {
  target: number;
  format?: (n: number) => string;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ ease: EASE, duration: 0.7, delay: delay / 1000 + 0.9 }}
    >
      <span
        className="leading-none text-white"
        style={{
          fontFamily: "var(--font-bebas-neue)",
          fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
        }}
      >
        <Counter target={target} format={format} suffix={suffix} duration={2000} />
      </span>
      <span
        className="mt-1.5 text-[0.68rem] uppercase leading-snug tracking-[0.22em] text-white/36"
        style={{ fontFamily: "var(--font-bebas-neue)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);

  // GSAP: hero gradient blob drift — approved use per CLAUDE.md
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, { x: "-14%", y: "-9%", duration: 20, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(blob2Ref.current, { x: "11%", y: "13%", duration: 25, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(blob3Ref.current, { y: "-16%", x: "7%", duration: 30, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(blob4Ref.current, { x: "-9%", y: "11%", duration: 22, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-visible relative h-screen overflow-hidden" aria-label="Hero">

      {/* ── Animated gradient background (GSAP blobs) ───────────────────── */}
      <div className="absolute inset-0" style={{ background: "#0f0f23" }}>
        <div ref={blob1Ref} className="absolute" style={{ width: "85vw", height: "85vh", top: "10%", left: "-5%", background: "radial-gradient(ellipse, rgba(22,33,62,1) 0%, rgba(22,33,62,0.6) 40%, transparent 68%)", borderRadius: "50% 60% 55% 50%" }} />
        <div ref={blob2Ref} className="absolute" style={{ width: "80vw", height: "80vh", bottom: "-15%", right: "-5%", background: "radial-gradient(ellipse, rgba(26,26,46,1) 0%, rgba(26,26,46,0.55) 45%, transparent 68%)", borderRadius: "55% 50% 60% 50%" }} />
        <div ref={blob3Ref} className="absolute" style={{ width: "70vw", height: "75vh", top: "20%", left: "20%", background: "radial-gradient(ellipse, rgba(30,30,55,0.85) 0%, rgba(22,33,62,0.4) 50%, transparent 70%)", borderRadius: "50% 55% 50% 60%" }} />
        <div ref={blob4Ref} className="absolute" style={{ width: "90vw", height: "60vh", top: "-15%", right: "-10%", background: "radial-gradient(ellipse, rgba(22,33,62,0.75) 0%, rgba(26,26,46,0.3) 50%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden="true" />
      <div className="grain-overlay z-[2]" aria-hidden="true" />

      {/* ── Page content ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key="hero-content"
          className="relative z-10 flex h-full flex-col px-6 pt-8 pb-10 md:px-14 lg:px-20 xl:px-28"
          transition={{ duration: 0.6, ease: EASE }}
        >

          {/* ── Nav — slides down on load ─────────────────────────────── */}
          <motion.nav
            className="flex items-center justify-between"
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            transition={{ ease: EASE, duration: 0.75, delay: 0.1 }}
          >
            {/* Logo */}
            <span
              className="uppercase text-white"
              style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "1.5rem", letterSpacing: "0.18em" }}
            >
              Peak Roofing
            </span>

            {/* Center nav links */}
            <div className="hidden items-center gap-8 lg:flex">
              {["Services", "Reviews", "Locations", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs uppercase text-white/40 transition-colors duration-300 hover:text-white/80"
                  style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.22em" }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right: phone + CTA buttons */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+17045550187"
                className="hidden text-sm text-white/55 transition-colors hover:text-white/90 md:block"
                style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.1em" }}
              >
                (704) 555-0187
              </a>

              {/* Free Estimate nav button */}
              <motion.a
                href="#contact"
                className="hidden items-center gap-2 bg-amber-400 px-4 py-2 text-black sm:flex"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={magneticGlow}
                transition={{ ease: EASE, duration: 0.3 }}
              >
                <span
                  className="text-[0.82rem] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-bebas-neue)" }}
                >
                  Free Estimate
                </span>
              </motion.a>

              {/* Call Now nav button */}
              <motion.a
                href="tel:+17045550187"
                className="hidden items-center gap-2 border border-amber-400/60 px-4 py-2 text-amber-400 sm:flex"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <span
                  className="text-[0.82rem] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-bebas-neue)" }}
                >
                  Call Now
                </span>
              </motion.a>
            </div>
          </motion.nav>

          {/* ── Main grid ─────────────────────────────────────────────── */}
          <div className="mt-auto grid grid-cols-1 gap-16 pb-6 pt-20 lg:grid-cols-12 lg:items-end">

            {/* ── LEFT: Headline + CTA ──────────────────────────────── */}
            <div className="lg:col-span-7">

              {/* Eyebrow */}
              <motion.div
                className="mb-9 flex items-center gap-4"
                initial={{ x: -24 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.2, duration: 0.75, ease: EASE }}
              >
                <div className="h-px w-10 bg-amber-400" />
                <span
                  className="text-sm italic text-amber-400"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Charlotte&apos;s Most Trusted Roofing Crew
                </span>
                <div className="h-px w-8 bg-amber-400/25" />
              </motion.div>

              {/* Character stagger headline */}
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.35,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "clamp(4rem, 9.5vw, 8.5rem)",
                }}
              >
                {HEADLINE_LINES.map((line, i) => (
                  <CharLine key={i} text={line.text} amber={line.amber} />
                ))}
              </motion.div>

              {/* Subheadline */}
              <motion.p
                className="mt-8 max-w-[510px] text-lg leading-[1.8] text-white/52 md:text-[1.18rem]"
                style={{ fontFamily: "var(--font-playfair-display)" }}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
              >
                Every job backed by a lifetime workmanship warranty, installed
                by a fully licensed crew — on-site within 4 hours, guaranteed.
              </motion.p>

              {/* CTA row */}
              <motion.div
                className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
              >
                {/* Primary CTA — magnetic yellow glow */}
                <motion.a
                  href="#contact"
                  className="relative inline-flex items-center gap-3 overflow-hidden bg-amber-400 px-8 py-[1.05rem] text-black"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={magneticGlow}
                  transition={{ ease: EASE, duration: 0.3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* White fill sweep */}
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-101%" }}
                    variants={{ hover: { x: "0%" } }}
                    transition={{ ease: EASE, duration: 0.42 }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative z-10 text-[1.08rem] uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    Get Your Free Estimate
                  </span>
                  <motion.span
                    className="relative z-10 text-lg"
                    variants={{ hover: { x: 6 } }}
                    transition={{ ease: EASE, duration: 0.32 }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </motion.a>

                {/* Call Now CTA — magnetic amber outline */}
                <motion.a
                  href="tel:+17045550187"
                  className="inline-flex items-center gap-3 border border-amber-400/60 px-8 py-[1.05rem] text-amber-400"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span
                    className="text-[1.08rem] uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    Call Now: (704) 555-0187
                  </span>
                </motion.a>
              </motion.div>
            </div>

            {/* ── RIGHT: Animated stat stack ────────────────────────── */}
            <motion.div
              className="w-full lg:col-span-4 lg:col-start-9 lg:w-auto lg:pb-1"
              initial={{ x: 32 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.5, duration: 1.0, ease: EASE }}
              style={{ overflow: 'visible' }}
            >
              <div className="flex flex-row justify-between gap-4 pb-8 sm:gap-12 lg:flex-col lg:gap-0 lg:border-l lg:border-white/[0.12] lg:pb-0 lg:pl-10" style={{ paddingTop: '2rem', width: '100%' }}>
                <StatItem target={18} suffix="+" label="Years Serving Charlotte" delay={1100} />
                <div className="hidden lg:block lg:my-9 lg:border-b lg:border-white/[0.1]" />
                <StatItem target={3400} format={(n) => n.toLocaleString()} suffix="+" label="Roofs Completed" delay={1250} />
                <div className="hidden lg:block lg:my-9 lg:border-b lg:border-white/[0.1]" />
                <StatItem target={4} suffix="HR" label="Response Guarantee" delay={1400} />
              </div>
            </motion.div>
          </div>

          {/* ── Bottom bar ─────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between"
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
          >
            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/22" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              Licensed · Insured · GAF Master Elite Certified
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/22" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              Charlotte · Matthews · Concord · Huntersville · Mooresville
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
