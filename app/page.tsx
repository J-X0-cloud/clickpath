import Link from "next/link";
import {
  ATTRIBUTION_FEATURES,
  CONVERSION_FEATURES,
  EVERYTHING_IN_THE_BOX,
  HOW_IT_WORKS,
  LINK_FEATURES,
  TESTIMONIAL,
} from "@/lib/data/content";
import { RECENT_EVENTS } from "@/lib/data/conversions";
import { CONTACT_MAILTO, CUSTOMER_LOGOS } from "@/lib/data/site";
import { TRACK_SALE_SAMPLES } from "@/lib/code-samples";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { FunnelChart } from "@/components/analytics/FunnelChart";
import { OrderCard } from "@/components/analytics/OrderCard";
import { CodeSample } from "@/components/conversions/CodeSample";
import { EventStream } from "@/components/conversions/EventStream";
import { LinkStack } from "@/components/links/LinkStack";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaSection } from "@/components/marketing/CtaSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { SectionHeading } from "@/components/marketing/SectionHeading";

function CustomerLogos() {
  return (
    <section className="logos">
      <div className="wrap">
        <p>Growth and paid-media teams running attribution on Clickpath</p>
        <div className="l">
          {CUSTOMER_LOGOS.map((logo) => (
            <span key={logo.name} className={`w${logo.style}`} style={logo.tight ? { letterSpacing: "-.06em" } : undefined}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="statement">
      <div className="wrap">
        <p>
          Ad dashboards count clicks. Your payment processor counts revenue. <span>Clickpath connects</span>{" "}
          <span className="hl hl-c">
            <Icon name="link" />
            clicks
          </span>
          <span>,</span>{" "}
          <span className="hl hl-l">
            <Icon name="users" />
            leads
          </span>{" "}
          <span>and</span>{" "}
          <span className="hl hl-s">
            <Icon name="cart" />
            sales
          </span>{" "}
          <span>into one record per customer, so budget follows what actually converts.</span>
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Link className="pill" href="/conversions">
            TikTok Events API destination is live <b>See what&rsquo;s new &rarr;</b>
          </Link>
          <h1>Know which click paid&nbsp;for&nbsp;it.</h1>
          <p className="lede">
            Clickpath puts a branded short link on every campaign, follows each visitor from click to lead to sale, and
            sends the conversion back to your ad platforms from the server.
          </p>
          <div className="row">
            <ButtonLink href="/pricing">Start free trial</ButtonLink>
            <ButtonLink href={CONTACT_MAILTO} variant="g">
              Book a walkthrough
            </ButtonLink>
          </div>
        </div>
        <div className="stage">
          <div className="wrap">
            <AnalyticsDashboard />
          </div>
        </div>
      </section>

      <CustomerLogos />
      <Statement />

      <section className="sec">
        <div className="wrap feat">
          <div className="ft">
            <Eyebrow>Branded short links</Eyebrow>
            <h2>Every campaign starts with a link you own.</h2>
            <p className="lede">
              Short links on your own domain get clicked more, survive copy-paste into DMs and podcasts, and carry a click
              ID that powers everything downstream.
            </p>
            <CheckList items={LINK_FEATURES} />
            <ButtonLink href="/links" variant="g">
              Explore short links
            </ButtonLink>
          </div>
          <div className="canvas g">
            <LinkStack />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap feat rev">
          <div className="ft">
            <Eyebrow>Full-funnel attribution</Eyebrow>
            <h2>From first click to closed revenue.</h2>
            <p className="lede">
              Track leads and sales with one SDK call or a Stripe or Shopify connection. Clickpath ties them back to the
              exact link, campaign and ad set that started the journey.
            </p>
            <CheckList items={ATTRIBUTION_FEATURES} />
            <ButtonLink href="/attribution" variant="g">
              See attribution
            </ButtonLink>
          </div>
          <div className="canvas a">
            <div className="card pad flush">
              <FunnelChart />
            </div>
            <OrderCard />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap feat">
          <div className="ft">
            <Eyebrow>Server-side conversions</Eyebrow>
            <h2>Feed the algorithms real purchases, not pixel guesses.</h2>
            <p className="lede">
              Browser pixels miss a growing share of conversions. Clickpath forwards every lead and sale to Meta, Google
              Ads and TikTok from our servers, deduplicated and hashed.
            </p>
            <CheckList items={CONVERSION_FEATURES} />
            <ButtonLink href="/conversions" variant="g">
              Explore the Conversion API
            </ButtonLink>
          </div>
          <div className="canvas g">
            <EventStream events={RECENT_EVENTS.slice(0, 5)} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="How it works" title="Plumbing that stays out of your way.">
            No tag-manager archaeology. Most teams are live in a single afternoon.
          </SectionHeading>
          <div className="steps">
            {HOW_IT_WORKS.map((step) => (
              <div className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap split">
          <div>
            <Eyebrow>Built for developers</Eyebrow>
            <h2 className="spaced">Three lines to your first attributed sale.</h2>
            <p className="lede">
              A typed SDK for Node, Python and Go, a REST API, and signed webhooks. Idempotent by default, so retries never
              double-count revenue.
            </p>
            <div className="row mt-lg">
              <ButtonLink href="/conversions" variant="m">
                Read the API guide
              </ButtonLink>
            </div>
          </div>
          <CodeSample samples={TRACK_SALE_SAMPLES} />
        </div>
      </section>

      <section className="quote">
        <div className="wrap">
          <blockquote>&ldquo;{TESTIMONIAL.quote}&rdquo;</blockquote>
          <div className="who">
            <span className="av" style={{ background: TESTIMONIAL.color }}>
              {TESTIMONIAL.initials}
            </span>
            <div className="who-t">
              <b>{TESTIMONIAL.name}</b>
              <div className="muted">{TESTIMONIAL.role}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Everything in the box" title="The details paid teams ask about." centered />
          <FeatureGrid items={EVERYTHING_IN_THE_BOX} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
