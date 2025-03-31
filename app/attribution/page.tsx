import type { Metadata } from "next";
import { DEVICES, REVENUE_BY_SOURCE, SAMPLE_CUSTOMER, TOP_COUNTRIES } from "@/lib/data/analytics";
import { ATTRIBUTION_MODELS, JOURNEY_FEATURES } from "@/lib/data/content";
import { CONTACT_MAILTO } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BarList } from "@/components/analytics/BarList";
import { CustomerTimeline } from "@/components/analytics/CustomerTimeline";
import { FunnelChart } from "@/components/analytics/FunnelChart";
import { PerformanceChart } from "@/components/analytics/PerformanceChart";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaSection } from "@/components/marketing/CtaSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "Click to lead to sale attribution",
  description:
    "Follow every visitor from click to lead to sale. Funnels, customer timelines, revenue by source and side-by-side attribution models.",
};

export default function AttributionPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Attribution</Eyebrow>
          <h1>From first click to closed revenue.</h1>
          <p className="lede">
            See how every link, campaign and ad set performs past the click: how many leads it created, how many became
            customers, and what they&rsquo;re worth.
          </p>
          <div className="row">
            <ButtonLink href="/pricing">Start free trial</ButtonLink>
            <ButtonLink href={CONTACT_MAILTO} variant="g">
              Book a walkthrough
            </ButtonLink>
          </div>
        </div>
        <div className="stage">
          <div className="wrap narrow">
            <div className="card framed">
              <FunnelChart />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Real-time analytics" title="Success at a glance.">
            Clicks, leads and sales on one timeline, filterable by link, domain, campaign, country and device. Data lands
            within seconds.
          </SectionHeading>
          <div className="card flush">
            <PerformanceChart mode="focus" flush />
          </div>
          <div className="grid3 mt">
            <div className="card pad">
              <h3 className="card-t">Revenue by source</h3>
              <BarList rows={REVENUE_BY_SOURCE} />
            </div>
            <div className="card pad">
              <h3 className="card-t">Top countries</h3>
              <BarList rows={TOP_COUNTRIES} />
            </div>
            <div className="card pad">
              <h3 className="card-t">Devices</h3>
              <BarList rows={DEVICES} fill="#FCEFD5" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap feat">
          <div className="ft">
            <Eyebrow>Customer journeys</Eyebrow>
            <h2>Every touch, in order.</h2>
            <p className="lede">
              Open any customer to see the links they clicked, when they converted and how much they&rsquo;ve spent
              since. Perfect for sanity-checking a campaign before you scale it.
            </p>
            <CheckList items={JOURNEY_FEATURES} />
          </div>
          <CustomerTimeline customer={SAMPLE_CUSTOMER} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Attribution models" title="Compare models without rebuilding reports." centered>
            Switch the model on any report and watch credit move between channels. No model is perfect; seeing them side
            by side is how you decide.
          </SectionHeading>
          <FeatureGrid items={ATTRIBUTION_MODELS} onPaper />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
