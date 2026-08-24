import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { organizationNode, websiteNode, buildGraph } from "@/lib/schema";
import { SITE, FIRM, ANALYTICS } from "@/lib/site.config";

// Archivo — the architectural/institutional grotesque DISPLAY face.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

// Plus Jakarta Sans — the distinct, warmer geometric BODY face.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

// JetBrains Mono — the SCARCE technical voice (FlagChip / spec / schema tokens).
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "King Maker | Authority Websites + SEO for Contractors",
    template: "%s | King Maker",
  },
  description:
    "King Maker builds enterprise-grade authority websites and organic-dominance systems for contractors. A brochure describes your business; an authority site is a ranking system. Read the guides, audit your own site, then talk to us.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "King Maker — A brochure describes. A system ranks.",
    description:
      "The education-first buyer's guide + enterprise authority websites for contractors. The authority in contractor growth & visibility.",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  verification: ANALYTICS.gscVerification ? { google: ANALYTICS.gscVerification } : undefined,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Sitewide org + website graph — defined once, referenced by @id everywhere.
  const siteGraph = buildGraph([organizationNode(), websiteNode()]);

  return (
    <html lang="en" className={`${archivo.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd graph={siteGraph} />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScroll>
        {/* HighLevel / LeadConnector chat widget — the SOLE SMS opt-in and phone-capture
            path (A2P 10DLC widget-first compliance). No other form on this site collects a
            phone number or SMS consent. Same widget-id proven-cleared on kingmaker-v3. */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a24a86fcce0c0ecc87f64c8"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
