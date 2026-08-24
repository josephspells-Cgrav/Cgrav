"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/* Lenis momentum smooth-scroll (visual-upgrade WO). Reduced-motion-GUARDED: a
 * reduced-motion visitor gets native scroll, never Lenis. We start in the plain
 * (no-Lenis) state so SSR + first paint are untouched, then enable Lenis after a
 * mount-time media check — so there is no hydration mismatch and no jump.
 * Root mode: Lenis drives the window scroll; the fixed Header + hash anchors keep
 * working (anchors:true lets Lenis smooth-scroll same-page #links). */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSmooth(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
