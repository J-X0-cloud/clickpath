import type { Metadata } from "next";
import { API_FEATURES, DELIVERY_GUARANTEES } from "@/lib/data/content";
import { DELIVERY_LOG, RECENT_EVENTS } from "@/lib/data/conversions";
import { TRACK_LEAD_SAMPLES } from "@/lib/code-samples";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CodeSample } from "@/components/conversions/CodeSample";
import { DeliveryLog } from "@/components/conversions/DeliveryLog";
import { EventFlow } from "@/components/conversions/EventFlow";
import { EventStream } from "@/components/conversions/EventStream";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaSection } from "@/components/marketing/CtaSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "Server-side Conversion API",
  description:
    "Send leads and sales to Meta, Google Ads and TikTok from your server with deduplication, hashing, retries and a full delivery log.",
};

export default function ConversionsPage() {
  return (
    <>
      <section className="hero-l">
        <div className="wrap split">
          <div>
            <Eyebrow>Conversion API</Eyebrow>
            <h1>Send ad platforms the conversions pixels miss.</h1>
            <p className="lede">
              Track leads and sales from your server once. Clickpath matches them to the original click and delivers them
              to Meta, Google Ads and TikTok, deduplicated against your browser pixel.
            </p>
            <div className="row">
              <ButtonLink href="/pricing">Start free trial</ButtonLink>
              <ButtonLink href="#api" variant="g">
                View the API
              </ButtonLink>
            </div>
          </div>
          <div className="canvas g">
            <EventStream events={RECENT_EVENTS.slice(0, 4)} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="How events flow" title="One event in. Every platform out." centered>
            You describe what happened in your business. Clickpath handles each platform&rsquo;s field names, hashing
            rules, rate limits and retries.
          </SectionHeading>
          <EventFlow />
        </div>
      </section>

      <section className="sec" id="api">
        <div className="wrap split">
          <div className="ft">
            <Eyebrow>API &amp; SDKs</Eyebrow>
            <h2 className="spaced">Idempotent by design.</h2>
            <p className="lede">
              Every call takes an event ID. Send it twice and it&rsquo;s counted once, here and in the ad platforms, which
              means your webhook retries never inflate revenue.
            </p>
            <CheckList items={API_FEATURES} />
          </div>
          <CodeSample samples={TRACK_LEAD_SAMPLES} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Delivery log" title="Audit every conversion you send.">
            See each event, where it went, what the platform said back, and replay failures after you fix the cause.
          </SectionHeading>
          <DeliveryLog entries={DELIVERY_LOG} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <FeatureGrid items={DELIVERY_GUARANTEES} layout="cards" />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
