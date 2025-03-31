import type { Metadata } from "next";
import { PRICING_FAQ } from "@/lib/data/faq";
import { PLANS } from "@/lib/data/pricing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaSection } from "@/components/marketing/CtaSection";
import { Faq } from "@/components/marketing/Faq";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PlanCard } from "@/components/pricing/PlanCard";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for branded links, attribution and server-side conversions. Start free, upgrade as your tracked events grow.",
};

export default function PricingPage() {
  return (
    <>
      <section className="hero compact">
        <div className="wrap">
          <Eyebrow>Pricing</Eyebrow>
          <h1>Priced on tracked events, not seats.</h1>
          <p className="lede">
            Every plan includes branded links, the UTM builder and QR codes. Upgrade when your attributed events grow. Save
            two months with yearly billing.
          </p>
        </div>
      </section>

      <section className="sec sec-t no-border">
        <div className="wrap">
          <div className="plans">
            {PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="muted fine">
            A tracked event is a click, lead or sale recorded by Clickpath. Redirects on links without tracking are always
            free.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading title="Compare plans" centered />
          <ComparisonTable />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading title="Pricing questions" centered />
          <Faq items={PRICING_FAQ} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
