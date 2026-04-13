"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const SERVICE_AREAS = [
  "Charlotte", "Matthews", "Concord", "Huntersville",
  "Mooresville", "Kannapolis", "Gastonia", "Rock Hill",
  "Mint Hill", "Indian Trail", "Cornelius", "Davidson",
];

export default function SiteFooter() {
  return (
    <footer className="section-visible relative bg-[#080810] px-6 pt-20 pb-10 md:px-14 lg:px-20 xl:px-28">
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 0%, rgba(251,191,36,0.25) 30%, rgba(251,191,36,0.25) 70%, transparent 100%)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4 text-2xl uppercase tracking-[0.18em] text-white" style={{ fontFamily: "var(--font-bebas-neue)" }}>
            Peak Roofing
          </div>
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/38" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Charlotte&apos;s most trusted roofing contractor. 18 years of precision installs,
            lifetime warranties, and a crew that shows up when it matters most.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-amber-400" style={{ fontSize: "0.85rem" }}>★</span>
              ))}
            </div>
            <span className="text-xs tracking-wider text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              4,200 Reviews
            </span>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>Services</div>
          <ul className="flex flex-col gap-3">
            {["Roof Replacement", "Storm Damage Repair", "Commercial Roofing", "Roof Inspection", "Service Areas"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-white/42 transition-colors hover:text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <div className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>Service Areas</div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>
                <a href="#" className="text-sm text-white/42 transition-colors hover:text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  {area}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "var(--font-bebas-neue)" }}>Contact</div>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="tel:+17045550100" className="text-base text-white/65 transition-colors hover:text-amber-400" style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.08em" }}>
                (704) 555-0100
              </a>
              <div className="mt-0.5 text-[0.65rem] tracking-widest text-white/25 uppercase">24/7 Emergency Line</div>
            </li>
            <li>
              <a href="mailto:info@peakroofing.com" className="text-sm text-white/42 transition-colors hover:text-amber-400" style={{ fontFamily: "var(--font-playfair-display)" }}>
                info@peakroofing.com
              </a>
            </li>
            <li>
              <address className="text-sm not-italic leading-relaxed text-white/38" style={{ fontFamily: "var(--font-playfair-display)" }}>
                1234 Trade Street<br />Charlotte, NC 28202
              </address>
            </li>
            <li>
              <div className="inline-block border border-amber-400/30 bg-amber-400/[0.06] px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-amber-400/70" style={{ fontFamily: "var(--font-bebas-neue)" }}>
                4HR Response Guarantee
              </div>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[0.62rem] uppercase tracking-[0.22em] text-white/20" style={{ fontFamily: "var(--font-bebas-neue)" }}>
          © {new Date().getFullYear()} Peak Roofing LLC · NC License #1234567 · All Rights Reserved
        </div>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms", "Sitemap"].map((item) => (
            <a key={item} href="#" className="text-[0.62rem] uppercase tracking-[0.18em] text-white/20 transition-colors hover:text-white/40" style={{ fontFamily: "var(--font-bebas-neue)" }}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
