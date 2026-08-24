"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Container, FlagChip } from "@/components/ui";
import { Eyebrow, CountUp, TypeIn, Reveal, useReducedMotionSafe } from "@/components/motion";
import { DASHBOARD, CAPTURE_MATH, CRM_DEMO } from "@/lib/claims";

// Win-line chart geometry. Extra right pad leaves room for direct line labels.
const VW = 680;
const VH = 320;
const PAD = { l: 40, r: 132, t: 24, b: 36 };
const IW = VW - PAD.l - PAD.r;
const IH = VH - PAD.t - PAD.b;
const MIN = 3;
const MAX = 44;
const x = (i: number, n: number) => PAD.l + (i / (n - 1)) * IW;
const y = (pos: number) => PAD.t + ((pos - MIN) / (MAX - MIN)) * IH;
const toPath = (arr: number[]) => arr.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i, arr.length).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
// Rank gridlines (lower number = better = higher on chart).
const RANK_TICKS = [4, 14, 24, 34, 44];

/* WO_07 Edit 8 — the proof chart expanded into a full agency-style CRM + analytics
 * dashboard ("as if the client is viewing their own site's dashboard"). Default demo
 * company: "Bob's Roofing", clearly a MODELED demo. Blue/white, square, very legible.
 * Motion: one-shot reveal + the win-line draw ONLY — NO live/looping dashboard motion. */
export function Dashboard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });
  const reduce = useReducedMotionSafe();
  const m = CAPTURE_MATH;
  const k = CRM_DEMO.kpis;
  const winPath = toPath(DASHBOARD.winLine);
  const basePath = toPath(DASHBOARD.baseline);
  const endX = x(DASHBOARD.winLine.length - 1, DASHBOARD.winLine.length);
  const endY = y(DASHBOARD.winLine[DASHBOARD.winLine.length - 1]);
  const climbed = DASHBOARD.winLine[0] - DASHBOARD.winLine[DASHBOARD.winLine.length - 1];
  const n = DASHBOARD.winLine.length;
  const startY = y(DASHBOARD.winLine[0]);
  const baseEndY = y(DASHBOARD.baseline[n - 1]);
  const areaPath = `${winPath} L ${endX.toFixed(1)} ${(PAD.t + IH).toFixed(1)} L ${PAD.l.toFixed(1)} ${(PAD.t + IH).toFixed(1)} Z`;

  return (
    <section className="bg-bg-tint pt-24 pb-14 sm:pt-28 sm:pb-16">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>The dashboard is the proof</Eyebrow>
          </div>
          <TypeIn
            text="Five times the capture. The same search demand."
            as="h2"
            className="mt-6 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"
          />
          <Reveal delay={0.1} className="mt-5 text-[15px] leading-relaxed text-muted">
            <p>
              What a King Maker client watches in their own dashboard. This one is a demo —{" "}
              <span className="font-semibold text-ink">{CRM_DEMO.company}</span>.
            </p>
          </Reveal>
        </div>

        {/* The instrument — framed as the client's own live browser view, lifted off the band. */}
        <div className="mx-auto max-w-4xl">
          {/* browser chrome — monochrome slate window controls + a faux address bar */}
          <div className="flex items-center gap-3 border border-b-0 border-line bg-surface-2 px-4 py-2.5">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </span>
            <span className="flex flex-1 items-center justify-center gap-2 border border-line-soft bg-surface px-3 py-1">
              <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-dim" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="3.5" y="7.5" width="9" height="5.5" />
                <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              <span className="km-mono text-[11px] tracking-tight text-dim">app.kingmakerseo.com/bobs-roofing</span>
            </span>
          </div>
          <div ref={wrapRef} className="border border-line bg-surface shadow-panel">
          <div className="km-hairline" />

          {/* CRM top bar — the client brand + the honesty flag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="km-display flex h-10 w-10 items-center justify-center bg-blue text-[18px] font-black text-white">B</span>
              <div>
                <p className="text-[15px] font-bold leading-tight text-ink">{CRM_DEMO.company}</p>
                <p className="km-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">Client dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="km-mono bg-blue-tint px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue">Demo</span>
              <FlagChip flag={CRM_DEMO.flag} />
            </div>
          </div>

          {/* KPI row — slides in, then the numbers count up (one-shot) */}
          <Reveal y={20} blur={6}>
            <div className="grid grid-cols-2 gap-px bg-line-soft lg:grid-cols-4">
            <Kpi label="Leads this month" sub={`${k.converted} converted`}>
              <CountUp to={k.leads} className="km-tabular" />
            </Kpi>
            <Kpi label="Appointments set" sub="booked from the site">
              <CountUp to={k.appointments} className="km-tabular" />
            </Kpi>
            <Kpi label="Organic visits / mo" sub={`${k.multiple}× an average site`} tone="win">
              <CountUp to={k.visits} className="km-tabular" />
            </Kpi>
            <Kpi label="Money-term rank" sub="from #42 in 12 mo" tone="win">
              <CountUp to={k.rank} prefix="#" delay={1.2} duration={0.9} className="km-tabular" />
            </Kpi>
            </div>
          </Reveal>

          {/* How the capture is won: the climb */}
          <div className="border-t border-line px-6 pt-6 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">How it&rsquo;s won · rank the money term</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[13px] text-dim">from #{DASHBOARD.winLine[0]} to</span>
                  <CountUp to={DASHBOARD.winLine[DASHBOARD.winLine.length - 1]} prefix="#" delay={1.2} duration={0.9} className="km-display km-tabular text-[2rem] font-black leading-none text-blue" />
                </div>
              </div>
              <div className="text-right">
                <CountUp to={climbed} prefix="+" delay={1.45} duration={0.8} className="km-display km-tabular text-[1.8rem] font-extrabold leading-none text-ink" />
                <p className="km-mono mt-1 text-[11px] uppercase tracking-[0.16em] text-dim">positions, 12 mo</p>
              </div>
            </div>
          </div>

          <div className="px-4 pb-2 pt-4 sm:px-6">
            <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label={`The King Maker site climbs from search rank #42 to #4 over twelve months; a standard contractor site stays stuck near #40.`}>
              <defs>
                <linearGradient id="km-win-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0.015" />
                </linearGradient>
              </defs>
              {/* rank gridlines + left y-axis labels */}
              {RANK_TICKS.map((rank) => (
                <g key={rank}>
                  <line x1={PAD.l} x2={PAD.l + IW} y1={y(rank)} y2={y(rank)} stroke="#e2e8f0" strokeWidth="1" />
                  <text x={PAD.l - 8} y={y(rank) + 4} fill="#64748b" fontSize="11" textAnchor="end" className="km-tabular">
                    #{rank}
                  </text>
                </g>
              ))}
              <text x={PAD.l - 8} y={PAD.t - 10} fill="#64748b" fontSize="9.5" textAnchor="end" className="km-mono" style={{ letterSpacing: "0.12em" }}>
                RANK
              </text>

              {/* equity area under the win line */}
              <motion.path d={areaPath} fill="url(#km-win-area)" initial={reduce ? { opacity: 1 } : { opacity: 0 }} animate={inView || reduce ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: reduce ? 0 : 1.25 }} />

              {/* standard contractor site — flat, muted */}
              <motion.path d={basePath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 4" initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} animate={inView || reduce ? { pathLength: 1 } : {}} transition={{ duration: 1, ease: "easeOut" }} />
              {/* King Maker site — the climb */}
              <motion.path d={winPath} fill="none" stroke="var(--color-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} animate={inView || reduce ? { pathLength: 1 } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} />

              {/* start marker on the win line */}
              <circle cx={PAD.l} cy={startY} r="3.5" fill="#94a3b8" />
              <text x={PAD.l + 6} y={startY + 16} fill="#64748b" fontSize="11" className="km-tabular">#42</text>

              {/* end markers */}
              <circle cx={endX} cy={baseEndY} r="3.5" fill="#cbd5e1" />
              <motion.circle cx={endX} cy={endY} r="5.5" fill="var(--color-blue)" stroke="var(--color-blue)" strokeWidth="1.5" initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }} animate={inView || reduce ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.4, delay: reduce ? 0 : 1.5 }} style={{ transformOrigin: `${endX}px ${endY}px` }} />

              {/* direct line labels (no guessing which line is which) */}
              <text x={endX + 12} y={endY - 2} fill="var(--color-blue)" fontSize="14" fontWeight="700">King Maker site</text>
              <text x={endX + 12} y={endY + 14} fill="var(--color-blue)" fontSize="12" className="km-tabular">now #4</text>
              <text x={endX + 12} y={baseEndY - 2} fill="#475569" fontSize="13" fontWeight="600">Standard site</text>
              <text x={endX + 12} y={baseEndY + 14} fill="#64748b" fontSize="11" className="km-tabular">stuck ≈ #40</text>

              {/* x axis */}
              {["Mo 1", "Mo 6", "Mo 12"].map((lbl, i) => (
                <text key={lbl} x={PAD.l + (i / 2) * IW} y={VH - 10} fill="#64748b" fontSize="11" textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}>
                  {lbl}
                </text>
              ))}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-6 text-[12.5px]">
              <span className="inline-flex items-center gap-2 text-ink"><span className="h-0.5 w-5 bg-blue-action" aria-hidden /> King Maker site</span>
              <span className="inline-flex items-center gap-2 text-dim"><span className="h-0.5 w-5 bg-[#cbd5e1]" aria-hidden /> Standard contractor site</span>
            </div>
            <FlagChip flag={DASHBOARD.flag} />
          </div>

          {/* Recent leads — the CRM feel (dividers, not nested boxes) */}
          <div className="border-t border-line px-6 py-6 sm:px-8">
            <div className="flex items-baseline justify-between">
              <p className="km-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Recent leads</p>
              <p className="km-mono text-[11px] uppercase tracking-[0.16em] text-dim">{CRM_DEMO.leads.length} of {k.leads}</p>
            </div>
            <motion.ul
              className="mt-3 divide-y divide-line"
              initial={reduce ? "show" : "hidden"}
              animate={inView || reduce ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            >
              {CRM_DEMO.leads.map((l) => (
                <motion.li
                  key={l.name}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-3"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold leading-tight text-ink">{l.name}</p>
                    <p className="text-[12.5px] leading-tight text-dim">{l.job}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="km-tabular w-20 text-right text-[13px] font-semibold text-ink">{l.value}</span>
                    <span className="w-[112px] text-right"><StatusBadge status={l.status} /></span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-dim">
          {CRM_DEMO.company} is an illustrative demo, not a real client. The capture, the {k.multiple}× multiple, and the rank climb show the model on ~{m.searches.toLocaleString()} monthly searches — illustrative, not a forecast. Promise the floor, project the ceiling.
        </p>
      </Container>
    </section>
  );
}

function Kpi({ label, sub, tone, children }: { label: string; sub?: string; tone?: "win" | "ink"; children: ReactNode }) {
  return (
    <div className="bg-surface px-5 py-5 sm:px-6">
      <p className="km-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-dim">{label}</p>
      <p className={`km-display km-tabular mt-2.5 text-[2.1rem] font-black leading-none ${tone === "win" ? "text-blue" : "text-ink"}`}>{children}</p>
      {sub ? <p className="mt-1.5 text-[12px] leading-snug text-dim">{sub}</p> : null}
    </div>
  );
}

function StatusBadge({ status }: { status: "Converted" | "Appointment set" | "New lead" }) {
  if (status === "Converted") {
    return <span className="km-mono inline-flex items-center bg-blue px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">Converted</span>;
  }
  if (status === "Appointment set") {
    return <span className="km-mono inline-flex items-center border border-blue/50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-blue">Appt set</span>;
  }
  return <span className="km-mono inline-flex items-center border border-line px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-dim">New lead</span>;
}
