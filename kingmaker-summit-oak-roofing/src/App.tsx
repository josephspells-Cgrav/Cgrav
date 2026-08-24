import { Hero } from "./Hero";
import { Header, TrustBar, Why, Process, Reviews, Cost, CtaBand, Footer, StickyMobile } from "./sections";

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <TrustBar />
        <Why />
        <Process />
        <Reviews />
        <Cost />
        <CtaBand />
      </main>
      <Footer />
      <StickyMobile />
    </>
  );
}
