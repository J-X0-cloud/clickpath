import type { Plan } from "@/lib/data/pricing";
import { CONTACT_MAILTO } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/Icon";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={plan.popular ? "plan hot" : "plan"}>
      <h3>
        {plan.name}
        {plan.popular && <span className="tag">Popular</span>}
      </h3>
      <div className="price">
        {plan.price}
        <small>{plan.period}</small>
      </div>
      <p>{plan.description}</p>
      <ButtonLink href={plan.price === "Custom" ? CONTACT_MAILTO : "#"} variant={plan.variant === "primary" ? "p" : "g"}>
        {plan.cta}
      </ButtonLink>
      <ul>
        <li className="h">{plan.includesLabel}</li>
        {plan.features.map((feature) => (
          <li key={feature}>
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
