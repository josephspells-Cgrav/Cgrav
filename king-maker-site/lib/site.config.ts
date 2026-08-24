/* ---------------------------------------------------------------------------
 * Site-wide configuration for the King Maker FIRM site (B2B — sells DFY
 * enterprise authority websites + SEO to contractors). The firm's OWN site is
 * Exhibit A: enterprise-grade, crawlable, schema-complete. Update SITE_URL at
 * deploy to the real Vercel host.
 * ------------------------------------------------------------------------- */

// Canonical production host. Public brand domain is kingmakerseo.com; the apex
// 308-redirects to www, so www is the canonical (non-redirecting) content host.
export const SITE_URL = "https://www.kingmakerseo.com";

export const SITE = {
  url: SITE_URL,
  name: "King Maker",
  legalName: "King Maker SEO",
  shortName: "King Maker",
  locale: "en_US",
  // Stable @ids — every page's WebPage references these by @id.
  orgId: `${SITE_URL}/#organization`,
  websiteId: `${SITE_URL}/#website`,
} as const;

// The firm's positioning constants (the brand kit, made machine-usable).
export const FIRM = {
  essence: "The firm that makes kings.",
  descriptor: "The authority in contractor growth & visibility.",
  primaryLine: "WE MAKE KINGS",
  // The firm's public NAP (already published on kingmaker-v2/v3).
  email: "Joseph@kingmakerseo.com",
  phone: "(919) 208-3412",
  phoneTel: "+19192083412",
  address: {
    street: "3340 Marshlane Way",
    city: "Raleigh",
    state: "NC",
    zip: "27610",
    country: "US",
  },
  geo: { lat: 35.7796, lng: -78.6382 },
  // The firm serves contractors regionally (NC base, Southeast reach).
  serviceArea: "North Carolina & the Southeast",
  // sameAs — populate with real profile URLs as they go live.
  sameAs: [] as string[],
} as const;

/**
 * SMS / A2P 10DLC compliance copy. Rendered site-wide (Footer), at the point of
 * consent (BookAppointment form), and in full on /privacy + /terms. Carriers
 * (Twilio/10DLC) require this messaging disclosure VISIBLE with no click to
 * approve the campaign — this is the fix for the 30919 rejection. Keep the NAP
 * in sync with the GHL brand registration.
 */
export const SMS_PROGRAM = {
  brand: "King Maker SEO",
  summary:
    "When you share your phone number through our website chat widget, you agree to receive SMS text messages from King Maker SEO about your appointment, demo, and account.",
  frequency: "Message frequency varies — up to 5 messages per lead.",
  rates: "Message and data rates may apply.",
  optOut: "Reply STOP to opt out at any time, or HELP for help.",
  noSharing:
    "No mobile information is shared with third parties or affiliates for marketing or promotional purposes.",
  consentNote: "Consent is not a condition of purchase.",
} as const;

/**
 * ANALYTICS — empty string = nothing loads (clean, no broken requests). Drop a
 * real value in and the layer activates. Search Console verification token only.
 */
export const ANALYTICS = {
  ga4Id: "",
  gtmId: "",
  gscVerification: "",
} as const;
