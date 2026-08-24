import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { FIRM } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the King Maker website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" crumb="Terms" />
      <Section tone="bg">
        <Container className="max-w-2xl space-y-6 text-[15.5px] leading-relaxed text-muted">
          <p>
            This website is provided for information about King Maker and its services. The content,
            including any figures, is provided in good faith. Numbers are flagged as measured or as
            modeled projections. Modeled figures are illustrative, not guarantees.
          </p>
          <p>
            Submitting an application does not create a client relationship or any obligation on
            either side. Engagements begin only under a separate written agreement.
          </p>
          <p>
            <strong className="text-ink">SMS / text messaging.</strong> By sharing your phone number through our
            website chat widget, you consent to receive SMS text messages
            from King Maker SEO about your appointment, demo, and account. Message frequency varies — up to
            5 messages per lead. Message and data rates may apply. Reply STOP to opt out at any time, or
            HELP for help. Consent is not a condition of purchase. Carriers are not liable for delayed or
            undelivered messages.
          </p>
          <p>
            All brand marks, copy, and design on this site are the property of King Maker. You may
            not reproduce them without permission.
          </p>
          <p>
            Questions about these terms? Email{" "}
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
