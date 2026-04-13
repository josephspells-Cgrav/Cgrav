import type { Metadata } from "next";
import { Bebas_Neue, Playfair_Display } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Peak Roofing | Charlotte's #1 Rated Roofing Contractor",
  description:
    "4,200 verified reviews. Precision installs. Lifetime warranties. Peak Roofing is Charlotte's most trusted roofing contractor — serving Charlotte, Matthews, Concord, and Huntersville.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d]">{children}</body>
    </html>
  );
}
