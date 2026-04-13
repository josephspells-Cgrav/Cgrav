/**
 * useSafeAnimation
 *
 * Returns Framer Motion animation controls pre-wired with a 500ms fallback.
 * If whileInView / IntersectionObserver never fires (production SSR edge case,
 * incorrect scroll root, or slow hydration), this guarantee kicks in and
 * calls controls.start("visible") so nothing stays permanently invisible.
 *
 * Usage:
 *   const controls = useSafeAnimation();
 *   <motion.div animate={controls} variants={...} whileInView="visible" initial="hidden" />
 */
"use client";

import { useEffect } from "react";
import { useAnimation } from "framer-motion";

export function useSafeAnimation(fallbackDelay = 500) {
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Force the "visible" variant on every element that shares this controls
      // instance. If whileInView already fired this is a no-op visually.
      controls.start("visible");
    }, fallbackDelay);

    return () => clearTimeout(timer);
  }, [controls, fallbackDelay]);

  return controls;
}
