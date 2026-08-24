/* ---------------------------------------------------------------------------
 * Security headers — OWASP-hardened baseline (honest posture: hardened, NOT
 * "SOC2 / bank-level / compliant"; we position on ACTIONS, not attestations).
 * Emitted statically from next.config.ts headers() so every route stays
 * statically cached (no nonce, no dynamic render). The firm site is the proof —
 * its OWN headers must pass a third-party audit. Extend SCRIPT/CONNECT origins
 * here when a justified third-party (analytics, chat widget) is wired.
 * ------------------------------------------------------------------------- */

/** Same-origin only by default. next/font self-hosts fonts (served from /_next),
 * so no external font CDN is needed in the CSP. */
function contentSecurityPolicy(isDev: boolean): string {
  // LeadConnector chat widget (the A2P 10DLC SMS opt-in path) — a justified, SCOPED
  // third-party allowlist: the vendor's own subdomains only, never a bare `*`. This
  // is the "extend origins when a chat widget is wired" case noted above.
  const lc = "https://*.leadconnectorhq.com";
  const msg = "https://*.msgsndr.com";
  const cf = "https://challenges.cloudflare.com"; // Cloudflare Turnstile — the LC widget's bot-check on submit
  const scriptSrc = isDev
    ? `'self' 'unsafe-eval' 'unsafe-inline' ${lc} ${cf}`
    : `'self' 'unsafe-inline' ${lc} ${cf}`;
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline' ${lc}`,
    `img-src 'self' data: blob: ${lc} ${msg} https://storage.googleapis.com`,
    `font-src 'self' ${lc}`,
    `connect-src 'self' ${lc} ${msg} ${cf}`,
    `frame-src 'self' ${lc} ${cf}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    // NOTE: `upgrade-insecure-requests` intentionally omitted — HSTS + the host
    // platform's http->https redirect already enforce TLS in production, and the
    // directive upgrades same-origin http requests on localhost (breaking local
    // testing) for zero production benefit.
  ].join("; ");
}

export function securityHeaders(isDev: boolean): { key: string; value: string }[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(isDev) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-DNS-Prefetch-Control", value: "on" },
  ];
}
