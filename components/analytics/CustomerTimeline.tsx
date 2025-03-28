import type { CSSProperties } from "react";
import type { CustomerJourney, FunnelStage } from "@/types/analytics";
import { formatCents } from "@/lib/format";

const STAGE_COLOR: Record<FunnelStage, string> = {
  clicks: "var(--clk)",
  leads: "var(--lead)",
  sales: "var(--sale)",
};

export function CustomerTimeline({ customer }: { customer: CustomerJourney }) {
  return (
    <div className="card pad">
      <div className="cust-h">
        <span className="av" style={{ background: "#EFA12A" }}>
          C
        </span>
        <div className="cust-id">
          <b>Customer #{customer.id}</b>
          <div className="muted">
            {customer.maskedEmail} · {customer.location} · {customer.device}
          </div>
        </div>
        <div className="ltv">
          <div className="muted">Lifetime value</div>
          <b>{formatCents(customer.lifetimeValue)}</b>
        </div>
      </div>
      <div className="timeline">
        {customer.steps.map((step) => (
          <div className="tl" key={step.title} style={{ "--c": STAGE_COLOR[step.kind] } as CSSProperties}>
            <b>{step.title}</b>
            <small>{step.detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
