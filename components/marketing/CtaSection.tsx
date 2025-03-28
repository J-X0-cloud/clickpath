import { CONTACT_MAILTO } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CtaSection() {
  return (
    <section className="cta">
      <div className="wrap">
        <Eyebrow>Start in an afternoon</Eyebrow>
        <h2>Stop guessing which ad paid for the sale.</h2>
        <p>
          Connect your domain, drop in the snippet, and send your first server-side conversion today. Free for the first
          1,000 tracked events every month.
        </p>
        <div className="row">
          <ButtonLink href="/pricing" variant="m">
            Start free trial
          </ButtonLink>
          <ButtonLink href={CONTACT_MAILTO} variant="o">
            Talk to our team
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
