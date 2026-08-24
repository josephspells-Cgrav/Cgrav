import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security";
import { GUIDE_REDIRECTS } from "./lib/buyers-guide";

// CSP needs 'unsafe-eval' only for Next's dev server / React Fast Refresh.
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 301 the old WO_07/08 guide slugs → their new buyer's-guide homes (preserves
  // ranking equity + keeps the old links from 404ing). See lib/buyers-guide.ts.
  async redirects() {
    return [
      ...GUIDE_REDIRECTS.map((r) => ({ source: r.from, destination: r.to, permanent: true })),
      // /system retired: its thesis folded into the home, its growth arc lives in /playbook.
      { source: "/system", destination: "/playbook", permanent: true },
      // /work retired: the live reference build IS Summit & Oak (now the "Site Demos" dropdown).
      { source: "/work", destination: "https://kingmaker-summit-oak-roofing.vercel.app", permanent: true },
      // "By trade" archived (returns after research) — temporary redirects to the guide hub.
      { source: "/guides/trades", destination: "/guides", permanent: false },
      { source: "/guides/trades/:path*", destination: "/guides", permanent: false },
    ];
  },
  // Static CSP + standard security headers on every route. Setting headers here
  // keeps pages statically cached (no nonce / no dynamic render). The honest
  // posture is "OWASP-hardened" — never SOC2/bank-level. See lib/security.ts.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders(isDev),
      },
    ];
  },
};

export default nextConfig;
