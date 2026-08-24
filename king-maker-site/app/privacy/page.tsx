import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { FIRM } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How King Maker handles the information you share with us.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumb="Privacy" />
      <Section tone="bg">
        <Container className="max-w-2xl space-y-6 text-[15.5px] leading-relaxed text-muted">
          <p>
            King Maker collects only the information you choose to send through our application form:
            your name, company, vertical, revenue range, market, email, and any message. We use it
            for one purpose, to evaluate and respond to your application.
          </p>
          <p>
            We do not sell your information. We do not share it except with the tools we use to
            operate (for example, email delivery). We retain it only as long as needed to handle
            your inquiry.
          </p>
          <p>
            <strong className="text-ink">Mobile &amp; SMS.</strong> If you share your phone number through our
            website chat widget, we may send you SMS text messages about your
            appointment, demo, and account. Message frequency varies — up to 5 messages per lead. Message
            and data rates may apply. Reply STOP to opt out at any time, or HELP for help.
          </p>
          <p>
            We do not sell or share your mobile phone number, SMS opt-in, or consent with any third
            parties or affiliates for their marketing or promotional purposes. Text-messaging originator
            opt-in data and consent are never shared with any third parties.
          </p>
          <p>
            To request access to or deletion of your information, email{" "}
            <a href={`mailto:${FIRM.email}`} className="text-ink underline">
              {FIRM.email}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
