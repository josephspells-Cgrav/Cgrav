"use client";

import { useEffect, useRef, useState } from "react";

/* The "On this page" navigation. ONE resolved mobile pattern: a sticky
 * "On this page ▾" DROPDOWN (not an accordion). On xl+, the scrollspy RAIL.
 * Rendered as two placed instances (variant), since the rail lives in the right
 * grid column and the dropdown lives at the top of the content column.
 * Scrollspy via IntersectionObserver; reading progress via one rAF-throttled
 * passive scroll listener. */
function useTOCState(items: { id: string; label: string }[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { active, progress };
}

export function StickyTOC({ items, variant }: { items: { id: string; label: string }[]; variant: "rail" | "dropdown" }) {
  const { active, progress } = useTOCState(items);
  const [open, setOpen] = useState(false);

  if (variant === "rail") {
    return (
      <nav aria-label="On this page" className="hidden xl:block">
        <div className="sticky top-[92px]">
          <p className="km-mono mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">On this page</p>
          <div className="mb-4 h-0.5 w-full bg-surface-3">
            <div className="h-full origin-left bg-blue-action" style={{ transform: `scaleX(${progress})` }} />
          </div>
          <ul className="space-y-2.5 border-l border-line-soft">
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={`-ml-px block border-l-2 pl-4 text-[13px] leading-snug transition-colors ${
                    active === it.id ? "border-blue text-ink" : "border-transparent text-dim hover:text-muted"
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  const activeLabel = items.find((i) => i.id === active)?.label ?? "On this page";
  return (
    <div className="sticky top-[68px] z-30 mb-8 border-y border-line-soft bg-bg/95 xl:hidden" style={{ backdropFilter: "blur(8px)" }}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-1 py-3 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="km-mono text-[12px] uppercase tracking-[0.16em] text-dim">
          On this page <span className="text-ink">&middot; {activeLabel}</span>
        </span>
        <span aria-hidden className={`text-blue transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          &#9662;
        </span>
      </button>
      <div className="h-0.5 w-full bg-surface-3">
        <div className="h-full origin-left bg-blue-action" style={{ transform: `scaleX(${progress})` }} />
      </div>
      {open ? (
        <ul className="max-h-[55vh] space-y-1 overflow-y-auto px-1 py-3">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={() => setOpen(false)}
                className={`block py-1.5 text-[14px] ${active === it.id ? "text-blue" : "text-muted"}`}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
