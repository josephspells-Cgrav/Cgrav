"use client";

/**
 * useCountUp — scroll-triggered animated counter.
 * Primary: IntersectionObserver (threshold 0) on a sentinel div.
 * Fallback: scroll event + getBoundingClientRect every 200ms.
 * No GSAP. No Framer Motion. Content always visible — counter starts at 0, counts up.
 */

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number;             // ms, default 2000
  format?: (n: number) => string;
  suffix?: string;
  delay?: number;                // ms before starting, default 0
  immediate?: boolean;           // skip IO, start on mount (hero stats)
}

export function useCountUp({
  target,
  duration = 2000,
  format = (n) => String(n),
  suffix = "",
  delay = 0,
  immediate = false,
}: UseCountUpOptions) {
  const [displayValue, setDisplayValue] = useState(`${format(0)}${suffix}`);
  const triggerRef = useRef<HTMLElement>(null);
  const started = useRef(false);

  const runAnimation = () => {
    if (started.current) return;
    started.current = true;

    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      setDisplayValue(`${format(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (immediate) {
      runAnimation();
      return;
    }

    const el = triggerRef.current;
    if (!el) return;

    // Check if element is in viewport
    const isInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Fire immediately if already in view on mount
    if (isInView()) {
      runAnimation();
      return;
    }

    // Primary: IntersectionObserver with threshold 0 (any pixel visible)
    let observer: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cleanup();
          runAnimation();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);

    // Fallback: scroll listener polling every frame in case IO doesn't fire
    const onScroll = () => {
      if (isInView()) {
        cleanup();
        runAnimation();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Safety net: fire after 5s regardless
    const safetyTimer = setTimeout(() => {
      cleanup();
      runAnimation();
    }, 5000);

    const cleanup = () => {
      if (observer) { observer.disconnect(); observer = null; }
      window.removeEventListener("scroll", onScroll);
      clearTimeout(safetyTimer);
    };

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { displayValue, ref: triggerRef };
}
