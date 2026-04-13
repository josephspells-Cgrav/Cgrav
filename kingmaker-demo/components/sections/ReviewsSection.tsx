"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

function AnimatedStars({ count = 5 }: { count?: number }) {
  return (
    <motion.div
      className="mb-5 flex gap-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-amber-400"
          style={{ fontSize: "0.95rem" }}
          variants={{
            hidden: { scale: 0.4, y: 6 },
            visible: { scale: 1, y: 0, transition: { ease: EASE, duration: 0.4 } },
          }}
        >
          ★
        </motion.span>
      ))}
    </motion.div>
  );
}

const REVIEWS = [
  {
    quote: "Peak showed up 3 hours after I called — during the storm. They tarped my roof the same night and had it fully replaced two days later. These guys are the real deal.",
    name: "Marcus T.", neighborhood: "Ballantyne", platform: "Google",
  },
  {
    quote: "I got three quotes. Peak wasn't the cheapest, but they were the most professional crew I've ever had on my property. Cleaned up every single nail. You couldn't even tell they were there.",
    name: "Sarah K.", neighborhood: "Myers Park", platform: "HomeAdvisor",
  },
  {
    quote: "Filed an insurance claim after the hail storm. Peak handled the entire process — the adjuster meeting, the paperwork, everything. Easiest home repair I've ever been through.",
    name: "Devon R.", neighborhood: "NoDa", platform: "BBB",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section-visible relative bg-[#111116] py-28 px-6 md:px-14 lg:px-20 xl:px-28">

      {/* Header — y only */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16"
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400" />
          <span className="text-sm italic text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>What Charlotte Says</span>
        </div>
        <h2 className="leading-[0.9] text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
          <Counter target={4200} format={(n) => n.toLocaleString()} /> Families.<br />
          <span className="text-amber-400"><Counter target={4200} format={(n) => n.toLocaleString()} /> Reasons.</span>
        </h2>
      </motion.div>

      {/* Cards — y stagger only */}
      <div className="grid grid-cols-1 gap-px bg-white/[0.05] md:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
            whileHover={{ y: -6, boxShadow: "0 0 0 1px rgba(251,191,36,0.2), 0 8px 30px rgba(0,0,0,0.4)", transition: { ease: EASE, duration: 0.3 } }}
            className="flex flex-col justify-between gap-8 bg-[#111116] p-8 cursor-default"
          >
            <div>
              <AnimatedStars />
              <p className="text-base leading-[1.8] text-white/65" style={{ fontFamily: "var(--font-playfair-display)" }}>
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
              <div>
                <div className="text-base tracking-wider text-white" style={{ fontFamily: "var(--font-bebas-neue)" }}>{review.name}</div>
                <div className="text-xs tracking-widest text-white/35 uppercase">{review.neighborhood}</div>
              </div>
              <div className="text-[0.65rem] uppercase tracking-[0.2em] text-amber-400/60" style={{ fontFamily: "var(--font-bebas-neue)" }}>{review.platform}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        className="mt-12 flex items-center justify-center gap-4"
      >
        <div className="h-px w-12 bg-white/10" />
        <a href="#" className="text-sm uppercase tracking-widest text-white/35 transition-colors hover:text-amber-400" style={{ fontFamily: "var(--font-bebas-neue)" }}>
          Read All 4,200 Reviews →
        </a>
        <div className="h-px w-12 bg-white/10" />
      </motion.div>
    </section>
  );
}
