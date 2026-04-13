"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CharacterStagger } from "@/components/ui/CharacterStagger";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function BeforeAfter() {
  const [clipPct, setClipPct] = useState(48);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateClip = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setClipPct(Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="section-visible relative bg-[#111116] py-28 px-6 md:px-14 lg:px-20 xl:px-28">

      {/* Header — y only */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-14"
      >
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400" />
          <span className="text-sm italic text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>The Transformation</span>
        </div>
        <h2 className="max-w-2xl leading-[0.9] text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
          <CharacterStagger text="See The Difference" inView />{" "}
          <CharacterStagger text="One Day Makes." className="text-amber-400" inView />
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/45" style={{ fontFamily: "var(--font-playfair-display)" }}>
          Drag the handle to reveal the before and after. Most jobs completed in a single day — from tear-off to final inspection.
        </p>
      </motion.div>

      {/* Slider — y only */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      >
        {/* REPLACE WITH REAL PHOTOS */}
        {/* Before: /images/before-damaged-roof.jpg | After: /images/after-new-roof.jpg */}
        <div
          ref={containerRef}
          className="relative h-[420px] w-full cursor-ew-resize overflow-hidden select-none md:h-[560px]"
          onPointerMove={(e) => isDragging && updateClip(e.clientX)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 30%, #152415 60%, #1f3320 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-end pr-12 pb-8">
              <div className="text-right">
                <div className="text-5xl leading-none text-green-400/40" style={{ fontFamily: "var(--font-bebas-neue)" }}>AFTER</div>
                <div className="mt-1 text-xs tracking-widest text-white/20 uppercase">New Peak Roofing Install</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${clipPct}%` }}>
            <div className="absolute inset-0" style={{ width: containerRef.current ? `${containerRef.current.getBoundingClientRect().width}px` : "100vw", background: "linear-gradient(135deg, #2a1a0d 0%, #1f1008 30%, #2d1a0a 60%, #1a0d05 100%)" }}>
              <div className="absolute inset-0 flex items-center pl-12 pb-8">
                <div>
                  <div className="text-5xl leading-none text-red-400/40" style={{ fontFamily: "var(--font-bebas-neue)" }}>BEFORE</div>
                  <div className="mt-1 text-xs tracking-widest text-white/20 uppercase">Storm Damaged · Aged Shingles</div>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute top-0 bottom-0 z-20 flex cursor-ew-resize items-center justify-center"
            style={{ left: `${clipPct}%`, x: "-50%" }}
            onPointerDown={(e) => { e.preventDefault(); setIsDragging(true); }}
            whileHover={{ scale: 1.05 }}
            transition={{ ease: EASE, duration: 0.25 }}
          >
            <div className="absolute top-0 bottom-0 w-[2px] bg-amber-400" />
            <motion.div
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-[#0d0d0d]"
              animate={isDragging ? { scale: 1.15, boxShadow: "0 0 20px rgba(251,191,36,0.5)" } : {}}
              transition={{ ease: EASE, duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>Before — Storm Damage</span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>After — Peak Installation</span>
        </div>
      </motion.div>
    </section>
  );
}
