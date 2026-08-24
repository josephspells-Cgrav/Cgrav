"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* GSAP ScrollTrigger reading-progress bar (visual-upgrade WO — the hands-on GSAP
 * evaluation). A fixed hairline at the very top whose scaleX scrubs 0 -> 1 across
 * the page scroll. Reduced-motion: not animated (a scroll-linked indicator is
 * non-essential chrome). GPU-safe — transform only. useGSAP auto-reverts on unmount. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  // Sync GSAP ScrollTrigger to Lenis's smooth scroll (no-ops if Lenis is absent,
  // e.g. under reduced-motion where SmoothScroll renders plain children).
  useLenis(() => ScrollTrigger.update());

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-blue-action"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
