import Image from "next/image";
import { SAMPLE_ORDER } from "@/lib/data/analytics";
import { formatCents } from "@/lib/format";
import { StatusPill } from "@/components/ui/StatusPill";

/** A single attributed order, as it appears in the Customers view. */
export function OrderCard() {
  return (
    <div className="card pad order-card">
      <Image src={SAMPLE_ORDER.image} alt="" width={56} height={56} />
      <div className="order-body">
        <b>
          Order #{SAMPLE_ORDER.number} · {SAMPLE_ORDER.product}
        </b>
        <div className="muted">{SAMPLE_ORDER.attribution}</div>
      </div>
      <StatusPill tone="ok">{formatCents(SAMPLE_ORDER.amountCents)}</StatusPill>
    </div>
  );
}
