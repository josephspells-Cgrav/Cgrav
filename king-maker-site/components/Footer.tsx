import Link from "next/link";
import { Crest } from "./Crest";
import { Container } from "./ui";
import { FIRM, SITE, SMS_PROGRAM } from "@/lib/site.config";
import { BUYERS_GUIDE } from "@/lib/buyers-guide";

/* The grounding anchor — a deep-blue field (the deepest brand color) under the
 * white canvas. The link columns = the no-orphan backstop (every guide linked
 * in static HTML, never dependent on a JS dropdown for crawlability).
 * All text is light-on-deep at AA+; the crest reverses to white. */
export function Footer() {
  return (
    <footer className="border-t-4 border-blue-action bg-blue-deep text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="King Maker — home">
              <Crest className="h-8 w-auto" tone="white" />
              <span className="km-display text-[20px] font-bold uppercase tracking-[0.04em] text-white">King Maker</span>
            </Link>
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-slate-300">
              {FIRM.descriptor} An education-first resource for contractors who want to own their region.
            </p>
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-blue-100">
              One king per city. Per vertical.
            </p>
          </div>

          <FooterCol title="The buyer's guide">
            {BUYERS_GUIDE.map((c) => (
              <FooterLink key={c.id} href={`/guides#${c.id}`}>
                {c.title}
              </FooterLink>
            ))}
            <FooterLink href="/guides">All 32 sections &#8594;</FooterLink>
          </FooterCol>

          <FooterCol title="The firm">
            <FooterLink href="/firm">The Firm</FooterLink>
            <FooterLink href="/playbook">The Playbook</FooterLink>
            <FooterLink href="/glossary">Glossary</FooterLink>
          </FooterCol>

          <FooterCol title="Engage">
            <FooterLink href="/audit">Audit your site</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/apply">Apply</FooterLink>
            <li>
              <a href={`mailto:${FIRM.email}`} className="text-[14px] text-slate-300 transition-colors hover:text-white">
                Email
              </a>
            </li>
          </FooterCol>
        </div>

        {/* A2P 10DLC compliance band — business NAP + SMS program disclosure, rendered
            site-wide with no click so carriers can verify the messaging program. */}
        <div className="mt-14 space-y-2 border-t border-white/10 pt-7 text-[12px] leading-relaxed text-slate-400">
          <p className="text-slate-300">
            <span className="font-semibold text-white">{SITE.legalName}</span>
            {" · "}{FIRM.address.street}, {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
            {" · "}
            <a href={`tel:${FIRM.phoneTel}`} className="transition-colors hover:text-white">{FIRM.phone}</a>
            {" · "}
            <a href={`mailto:${FIRM.email}`} className="transition-colors hover:text-white">{FIRM.email}</a>
          </p>
          <p>
            <span className="font-semibold text-slate-300">SMS/text program:</span> {SMS_PROGRAM.summary}{" "}
            {SMS_PROGRAM.frequency} {SMS_PROGRAM.rates} {SMS_PROGRAM.optOut} {SMS_PROGRAM.noSharing} See our{" "}
            <Link href="/privacy" className="underline transition-colors hover:text-white">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="underline transition-colors hover:text-white">Terms</Link>.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 pt-2 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 King Maker SEO. The firm that makes kings.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${FIRM.email}`} className="transition-colors hover:text-white">{FIRM.email}</a>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{title}</span>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[14px] text-slate-300 transition-colors duration-200 hover:text-white">
        {children}
      </Link>
    </li>
  );
}
