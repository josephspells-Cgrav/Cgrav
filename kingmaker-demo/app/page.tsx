import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/sections/ServicesStrip";
import TrustBar from "@/components/sections/TrustBar";
import BeforeAfter from "@/components/sections/BeforeAfter";
import ProcessSection from "@/components/sections/ProcessSection";
import VideoHero from "@/components/sections/VideoHero";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ServiceAreas from "@/components/sections/ServiceAreas";
import FinalCTA from "@/components/sections/FinalCTA";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* S1 — Hero */}
      <HeroSection />
      {/* S2 — Services Strip */}
      <ServicesStrip />
      {/* S3 — Trust Bar: GSAP counter animation */}
      <TrustBar />
      {/* S4 — Before/After Slider */}
      <BeforeAfter />
      {/* S5 — 4-Step Process: GSAP scrub line draw */}
      <ProcessSection />
      {/* S6 — Video Hero: parallax placeholder (swap for Kling AI WebM) */}
      <VideoHero />
      {/* S7 — Reviews */}
      <ReviewsSection />
      {/* S8 — Service Areas */}
      <ServiceAreas />
      {/* S9 — Final CTA: pulsing glow */}
      <FinalCTA />
      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
