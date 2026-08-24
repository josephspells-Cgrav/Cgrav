import Link from "next/link";
import { Crest } from "@/components/Crest";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-bg pt-[68px]">
      <Container className="text-center">
        <Crest className="mx-auto h-12 w-auto" tone="blue" />
        <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.28em] text-blue">404</p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-black tracking-[-0.02em] text-ink">
          This page isn&rsquo;t built yet.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-muted">
          The page you&rsquo;re after doesn&rsquo;t exist. Everything that does is one click from
          home.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 bg-blue-action px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-200 ease-out hover:bg-blue active:scale-[0.98]"
        >
          Back to King Maker &#8594;
        </Link>
      </Container>
    </section>
  );
}
