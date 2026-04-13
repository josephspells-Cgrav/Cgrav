"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

function StatCell({
  target, format, suffix, label, staticVal,
}: {
  target?: number; format?: (n: number) => string; suffix?: string;
  label: string; staticVal?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-[#0d0d0d] px-4 py-10 text-center lg:px-6 lg:py-12">
      <div className="leading-none text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(2.2rem, 4vw, 4rem)" }}>
        {staticVal
          ? <span>{staticVal}</span>
          : <Counter target={target ?? 0} format={format} suffix={suffix ?? ""} duration={2000} />
        }
      </div>
      <div className="h-px w-8 bg-amber-400/50" />
      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/38" style={{ fontFamily: "var(--font-bebas-neue)" }}>
        {label}
      </span>
    </div>
  );
}

function GuaranteeCell() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-[#0d0d0d] px-4 py-10 text-center lg:px-6 lg:py-12">
      {/* Shield checkmark icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#EAB308"
        strokeWidth={2}
        className="mb-1 h-10 w-10"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
      <div className="leading-none text-white" style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
        100% Satisfaction Guarantee
      </div>
      <div className="h-px w-8 bg-amber-400/50" />
      <span className="mt-1 max-w-[20ch] text-[0.7rem] leading-snug text-white/38 uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-bebas-neue)" }}>
        Every job backed by our lifetime workmanship warranty
      </span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="section-visible relative overflow-hidden bg-[#0d0d0d] py-24 px-6 md:px-14 lg:px-20 xl:px-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2" style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)" }} aria-hidden="true" />

      {/* Mobile: 2 cols (3 rows) | Tablet: 3 cols (2 rows) | Desktop: 6 cols (1 row) */}
      <motion.div
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid grid-cols-2 gap-px bg-white/[0.07] md:grid-cols-3 lg:grid-cols-6"
      >
        <StatCell target={4200} format={(n) => n.toLocaleString()} suffix="" label="Five-Star Reviews" />
        <StatCell target={18} suffix="+" label="Years in Charlotte" />
        <StatCell target={3400} format={(n) => n.toLocaleString()} suffix="+" label="Roofs Completed" />
        <StatCell target={4} suffix="HR" label="Response Guarantee" />
        <StatCell staticVal="A+" label="BBB Rating" />
        <GuaranteeCell />
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2" style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.25), transparent)" }} aria-hidden="true" />
    </section>
  );
}
