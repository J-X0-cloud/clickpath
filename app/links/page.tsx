import type { Metadata } from "next";
import { DOMAIN_FEATURES, NAMING_RULES, ROUTING_FEATURES } from "@/lib/data/content";
import { LINKS_FAQ } from "@/lib/data/faq";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DomainTable } from "@/components/links/DomainTable";
import { LinkStack } from "@/components/links/LinkStack";
import { RoutingRules } from "@/components/links/RoutingRules";
import { UtmBuilder } from "@/components/links/UtmBuilder";
import { UtmTemplateTable } from "@/components/links/UtmTemplateTable";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaSection } from "@/components/marketing/CtaSection";
import { Faq } from "@/components/marketing/Faq";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "Short links and UTM builder",
  description:
    "Branded short links on your own domain with a UTM builder, naming templates, QR codes and device and geo routing.",
};

export default function LinksPage() {
  return (
    <>
      <section className="hero-l">
        <div className="wrap split">
          <div>
            <Eyebrow>Short links &amp; UTM builder</Eyebrow>
            <h1>Links your whole team can trust.</h1>
            <p className="lede">
              Create branded short links with clean UTMs in seconds, route visitors by device and location, and give
              every click an ID that follows it all the way to revenue.
            </p>
            <div className="row">
              <ButtonLink href="/pricing">Create your first link</ButtonLink>
              <ButtonLink href="#utm" variant="g">
                See the UTM builder
              </ButtonLink>
            </div>
          </div>
          <div className="canvas g">
            <LinkStack />
          </div>
        </div>
      </section>

      <section className="sec" id="utm">
        <div className="wrap">
          <SectionHeading eyebrow="UTM builder" title="Clean campaign data, enforced at the source.">
            Pick a template, fill in the blanks, and Clickpath assembles the final URL. Sources and mediums come from an
            approved list, so &ldquo;Facebook&rdquo;, &ldquo;fb&rdquo; and &ldquo;meta&rdquo; never split your reports
            again.
          </SectionHeading>
          <UtmBuilder />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="split intro">
            <div className="ft">
              <Eyebrow>Naming conventions</Eyebrow>
              <h2>Templates that keep reports readable.</h2>
              <p className="lede">
                Admins define templates per channel. Everyone else fills in the pattern. Links that break the rules
                can&rsquo;t be published.
              </p>
            </div>
            <div className="ft">
              <CheckList items={NAMING_RULES} />
            </div>
          </div>
          <UtmTemplateTable />
        </div>
      </section>

      <section className="sec">
        <div className="wrap feat rev">
          <div className="ft">
            <Eyebrow>Custom domains</Eyebrow>
            <h2>Your domain on every link.</h2>
            <p className="lede">
              Branded links look trustworthy in ads, bios and SMS. Connect a domain with one DNS record and we handle
              certificates and renewals.
            </p>
            <CheckList items={DOMAIN_FEATURES} />
          </div>
          <DomainTable />
        </div>
      </section>

      <section className="sec">
        <div className="wrap feat">
          <div className="ft">
            <Eyebrow>Smart routing</Eyebrow>
            <h2>One link, the right destination.</h2>
            <p className="lede">
              Send iOS users to the App Store, Android users to Play, and Canadian shoppers to the Canadian store, all
              from the same short link printed on the box.
            </p>
            <CheckList items={ROUTING_FEATURES} />
          </div>
          <RoutingRules />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Questions" title="Short links, answered." centered />
          <Faq items={LINKS_FAQ} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
