/**
 * useScrollReveal — native IntersectionObserver scroll reveal hook.
 *
 * Deliberately avoids GSAP ScrollTrigger and Framer Motion whileInView,
 * both of which have reliability issues in Next.js production builds on
 * Vercel (incorrect scroll root, hydration timing, plugin registration).
 *
 * Guarantees:
 * - Elements are visible by default (no JS = no opacity:0 stuck state)
 * - 800ms hard fallback ensures nothing is permanently hidden
 * - IO threshold of 0.05 fires as soon as 5% of element is visible
 */
"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  // Start as visible — server render and no-JS always shows content
  // Client-side we'll flip to false immediately and let IO reveal it
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount (hero, above-fold sections)
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyInView) {
      setIsVisible(true);
      return;
    }

    // Off-screen: hide and let IO reveal it
    setIsVisible(false);

    // 800ms nuclear fallback — fires regardless of IO
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallback);
          // Respect stagger delay
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return { ref, isVisible };
}

/** Inline style helper — apply to any element that should reveal on scroll. */
export function revealStyle(isVisible: boolean, delayMs = 0): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : "translateY(22px)",
    transition: `opacity 0.75s cubic-bezier(0.76,0,0.24,1) ${delayMs}ms, transform 0.75s cubic-bezier(0.76,0,0.24,1) ${delayMs}ms`,
  };
}
