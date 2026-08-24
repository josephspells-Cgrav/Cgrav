"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Crest } from "./Crest";

const SUMMIT_OAK = "https://kingmaker-summit-oak-roofing.vercel.app";

const DEMOS = [
  { label: "Summit & Oak", sub: "Roofing — a live reference build", href: SUMMIT_OAK },
];

const NAV = [
  { label: "The Playbook", href: "/playbook" },
  { label: "Pricing", href: "/pricing" },
];

// Nav-link hover: a small lift + a blue underline that draws left-to-right.
// Pure CSS (GPU-safe transform + a pseudo-element underline). The global
// reduced-motion rule freezes the transition; the lift is also disabled there.
const NAV_LINK =
  "relative transition duration-200 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-bg/95 border-b border-line-soft" : "bg-transparent border-b border-transparent"
      }`}
      style={scrolled || open ? { backdropFilter: "blur(8px)" } : undefined}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1180px] items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="King Maker — home">
          <Crest className="h-7 w-auto" tone="blue" />
          <span className="km-display text-[19px] font-bold uppercase tracking-[0.04em] text-ink">King Maker</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/guides" className={`text-[14px] font-semibold text-blue hover:text-blue-action ${NAV_LINK}`}>
            The buyer&rsquo;s guide
          </Link>

          {/* Site Demos — dropdown out to the live reference build(s) */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors group-hover:text-ink"
              aria-haspopup="menu"
            >
              Site Demos
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-[260px] border border-line-soft bg-bg p-2 shadow-card">
                {DEMOS.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2.5 transition-colors hover:bg-blue-action/[0.06]"
                  >
                    <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      {d.label}
                      <svg className="h-3 w-3 text-blue" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M4 8 8 4M4.5 4H8v3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="mt-0.5 block text-[12px] text-dim">{d.sub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`text-[14px] font-medium text-muted hover:text-ink ${NAV_LINK}`}>
              {n.label}
            </Link>
          ))}

          <Link href="/audit" className="border border-blue/45 px-4 py-2 text-[13.5px] font-semibold text-ink transition duration-200 ease-out hover:-translate-y-0.5 hover:border-blue hover:bg-blue-action/[0.06] motion-reduce:hover:translate-y-0">
            Audit Your Site
          </Link>
          <Link
            href="/apply"
            className="group inline-flex items-center gap-2 bg-blue-action px-5 py-2.5 text-[14px] font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue active:scale-[0.98] motion-reduce:hover:translate-y-0"
          >
            Apply
            <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">&#8594;</span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button type="button" className="flex h-9 w-9 items-center justify-center md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-line-soft bg-bg/98 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/guides" className="py-2 text-[17px] font-semibold text-blue" onClick={() => setOpen(false)}>
              The buyer&rsquo;s guide
            </Link>
            <div className="py-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-dim">Site Demos</span>
              {DEMOS.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center gap-1.5 text-[17px] font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {d.label}
                  <svg className="h-3.5 w-3.5 text-blue" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M4 8 8 4M4.5 4H8v3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-2 text-[17px] font-medium text-ink" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <Link href="/audit" className="inline-flex w-max items-center border border-blue/45 px-5 py-2.5 text-[15px] font-semibold text-ink" onClick={() => setOpen(false)}>
                Audit Your Site
              </Link>
              <Link href="/apply" className="inline-flex w-max items-center gap-2 bg-blue-action px-5 py-3 text-[15px] font-semibold text-white" onClick={() => setOpen(false)}>
                Apply to Work With Us &#8594;
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
