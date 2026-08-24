import { TypeIn, Reveal, Eyebrow, Stagger, StaggerItem } from "./motion";

const PHONE = "(919) 555-0185";
const PHONE_TEL = "+19195550185";

/* ============================ HEADER ============================ */
export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-ink/85 border-b border-line/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="grid place-items-center h-9 w-9 rounded-md bg-red text-white font-display font-bold text-lg">S</span>
          <span className="font-display font-semibold tracking-tight text-[17px] leading-none text-white">
            Summit&nbsp;&amp;&nbsp;Oak
            <span className="block text-[10px] tracking-[0.22em] uppercase text-mist font-sans font-semibold mt-1">
              Roofing &middot; Raleigh NC
            </span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[15px] text-mist font-medium">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#why" className="hover:text-white transition">Why Us</a>
          <a href="#cost" className="hover:text-white transition">Cost</a>
          <a href="#reviews" className="hover:text-white transition">Reviews</a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-[13px] text-mist">
            <span aria-hidden className="text-redink">★★★★★</span>
            <span className="font-semibold text-white">4.9</span>&middot;300+
          </span>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-surface transition">
            <PhoneIcon className="h-4 w-4 text-redink" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ============================ TRUST BAR ============================ */
export function TrustBar() {
  const items = ["GAF Master Elite®", "Owens Corning Preferred", "BBB A+ Accredited", "$0 Down Financing", "Licensed & Insured"];
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] tracking-wide font-semibold uppercase">
        {items.map((it, i) => (
          <span key={it} className="inline-flex items-center gap-8">
            <span className="text-white/85">{it}</span>
            {i < items.length - 1 && <span aria-hidden className="text-mist/30">·</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================ WHY ============================ */
const WHY = [
  { t: "Warranty That Outlives the Truck", d: "A written 25-year workmanship warranty backed by GAF, transferable when you sell. Not a handshake." },
  { t: "Our Crews, Never Day-Labor", d: "W-2 crews we train and stand behind. No subcontracted strangers on your roof, no surprises on your invoice." },
  { t: "Documented, Not Guessed", d: "Every inspection comes with close-up photos handed to you the same day, so you see exactly what we see." },
];
export function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
      <Reveal className="max-w-2xl">
        <Eyebrow className="mb-4">Why Summit &amp; Oak</Eyebrow>
        <TypeIn as="h2" text="A Roof Is a 25-Year Decision. We Treat It Like One." className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-white" />
      </Reveal>
      <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((c) => (
          <StaggerItem key={c.t} className="group relative rounded-xl bg-surface border border-line p-6 overflow-hidden hover:-translate-y-1 hover:border-red/50 transition duration-200">
            <Notch />
            <div className="font-display text-redink text-xl font-semibold mb-3">{c.t}</div>
            <p className="text-mist text-[15px] leading-relaxed">{c.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ============================ PROCESS ============================ */
const STEPS = [
  { n: "01", k: "Inspect", t: "Free Documented Inspection", d: "We photograph every problem area and walk you through it. No pressure, no jargon." },
  { n: "02", k: "Estimate", t: "A Clear, Fixed Price", d: "One honest number with financing options. We help file the insurance claim if it's storm damage." },
  { n: "03", k: "Install", t: "Done in a Day, Clean", d: "Most roofs go on in one day. We magnet-sweep every nail before we leave the driveway." },
];
export function Process() {
  return (
    <section id="services" className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <Eyebrow className="mb-4">How It Works</Eyebrow>
            <TypeIn as="h2" text="From Inspection to Install in Days, Not Weeks." className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-white" />
          </div>
          <a href="#top" className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 font-semibold text-white hover:bg-ink transition">See Your Estimate →</a>
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-5">
          {STEPS.map((s) => (
            <StaggerItem key={s.n} className="relative rounded-xl bg-ink border border-line p-7 overflow-hidden">
              <div aria-hidden className="font-display text-[64px] leading-none text-white/[0.06] font-semibold absolute top-3 right-5 select-none">{s.n}</div>
              <div className="text-redink font-mono text-[12px] tracking-[0.2em] uppercase mb-3">{s.k}</div>
              <div className="font-display text-xl font-semibold mb-2 text-white">{s.t}</div>
              <p className="text-mist text-[15px] leading-relaxed">{s.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ REVIEWS ============================ */
const REVIEWS = [
  { q: "Hail took out half the neighborhood. Summit & Oak had photos in my inbox that afternoon and the claim approved in a week. New roof in a day.", a: "Dana R. · North Hills" },
  { q: "Got three quotes. They were the only ones who climbed up, showed me the rot at the dormers, and didn't try to upsell me. Fair price, real crew.", a: "Marcus T. · Apex" },
  { q: "The financing made it a no-brainer. $129 a month instead of a five-figure shock. Warranty paperwork was in my hands before they left.", a: "Priya S. · Cary" },
];
export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
      <Reveal className="mb-12 max-w-xl">
        <Eyebrow className="mb-4">What the Triangle Says</Eyebrow>
        <TypeIn as="h2" text="312 Reviews. 4.9 Stars. No Paid Placement." className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-white" />
      </Reveal>
      <Stagger className="grid md:grid-cols-3 gap-5">
        {REVIEWS.map((r) => (
          <StaggerItem key={r.a}>
            <figure className="h-full rounded-xl bg-surface border border-line p-6">
              <div aria-hidden className="text-redink mb-3">★★★★★</div>
              <blockquote className="text-[15px] leading-relaxed text-white/90">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption className="mt-4 text-[13px] text-mist">{r.a}</figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ============================ COST ============================ */
const TILES = [
  { l: "Architectural shingle", v: "$9k–$18k" },
  { l: "Designer / impact", v: "$14k–$26k" },
  { l: "Standing-seam metal", v: "$22k–$45k" },
];
export function Cost() {
  return (
    <section id="cost" className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow className="mb-4">Straight Talk on Cost</Eyebrow>
          <TypeIn as="h2" text="Most Raleigh Roofs Run $9k–$26k Installed." className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] mb-5 text-white" />
          <p className="text-mist text-[16px] leading-relaxed max-w-md">
            Final price depends on size, pitch, layers, and decking. The inspection makes it exact, and financing turns it into a monthly number that fits.
          </p>
          <a href="#top" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red text-white font-bold px-6 py-3.5 shadow-glow hover:bg-redhi transition">See Your Range →</a>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4">
          {TILES.map((t) => (
            <StaggerItem key={t.l} className="rounded-xl bg-ink border border-line p-5">
              <div className="text-[12px] uppercase tracking-wide text-mist">{t.l}</div>
              <div className="font-display text-2xl font-semibold mt-1 text-white">{t.v}</div>
            </StaggerItem>
          ))}
          <StaggerItem className="rounded-xl bg-red text-white p-5">
            <div className="text-[12px] uppercase tracking-wide font-semibold">Financing</div>
            <div className="font-display text-2xl font-bold mt-1">from $89/mo</div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ CTA BAND ============================ */
export function CtaBand() {
  return (
    <section id="estimate" className="relative grain overflow-hidden">
      <Reveal className="mx-auto max-w-4xl px-5 sm:px-8 py-24 text-center">
        <TypeIn as="h2" text="Get Your Free Documented Roof Inspection." className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.04] text-white" />
        <p className="text-mist text-[18px] mt-5 max-w-xl mx-auto">
          60-second estimate now, a real estimator within the hour. No obligation, no pressure, ever.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#top" className="inline-flex items-center gap-2 rounded-lg bg-red text-white font-bold px-7 py-4 text-[17px] shadow-glow hover:bg-redhi transition">Get My Free Estimate →</a>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-lg border border-line px-7 py-4 text-[17px] font-semibold text-white hover:bg-surface transition">Call {PHONE}</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================ FOOTER ============================ */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 flex flex-wrap items-center justify-between gap-6 text-mist text-[14px]">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-md bg-red text-white font-display font-bold">S</span>
          <span className="font-display font-semibold text-white">Summit &amp; Oak Roofing</span>
        </div>
        <div>Raleigh, NC &middot; GAF Master Elite® &middot; NC License #74122</div>
        <div>© 2026 &middot; Free estimates &middot; Financing available</div>
      </div>
    </footer>
  );
}

/* ============================ STICKY MOBILE ============================ */
export function StickyMobile() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-ink/95 backdrop-blur border-t border-line grid grid-cols-2 gap-2 p-2.5">
      <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-line py-3 font-semibold text-white">
        <PhoneIcon className="h-4 w-4 text-redink" />Call
      </a>
      <a href="#top" className="inline-flex items-center justify-center gap-1 rounded-lg bg-red text-white font-bold py-3">Free Estimate</a>
    </div>
  );
}

/* ============================ shared bits ============================ */
function Notch() {
  return <span aria-hidden className="absolute top-0 right-0 h-5 w-5 bg-red" style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }} />;
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
