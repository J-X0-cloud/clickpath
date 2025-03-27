import type { Language } from "./highlight";

export interface CodeSample {
  label: string;
  language: Language;
  code: string;
}

/** "Three lines to your first attributed sale" (home page). */
export const TRACK_SALE_SAMPLES: readonly CodeSample[] = [
  {
    label: "checkout.ts",
    language: "ts",
    code: `import { Clickpath } from "@clickpath/node";

const cp = new Clickpath(process.env.CLICKPATH_KEY);

// called from your order webhook
await cp.track.sale({
  clickId: order.cpClickId,
  customerId: order.customerId,
  amount: 14800,            // cents
  currency: "usd",
  eventId: \`order_\${order.id}\`, // dedupes with your pixel
});`,
  },
  {
    label: "Python",
    language: "python",
    code: `from clickpath import Clickpath

cp = Clickpath(os.environ["CLICKPATH_KEY"])

# called from your order webhook
cp.track.sale(
    click_id=order.cp_click_id,
    customer_id=order.customer_id,
    amount=14800,             # cents
    currency="usd",
    event_id=f"order_{order.id}",  # dedupes with your pixel
)`,
  },
  {
    label: "cURL",
    language: "bash",
    code: `# called from your order webhook
curl https://api.clickpath.com/v1/track/sale \\
  -H "Authorization: Bearer $CLICKPATH_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clickId": "clk_Q3xR9a",
    "customerId": "cus_10482",
    "amount": 14800,
    "currency": "usd",
    "eventId": "order_10482"
  }'`,
  },
];

/** "Idempotent by design" (Conversion API page). */
export const TRACK_LEAD_SAMPLES: readonly CodeSample[] = [
  {
    label: "cURL",
    language: "bash",
    code: `# record a lead from your signup handler
curl https://api.clickpath.com/v1/track/lead \\
  -H "Authorization: Bearer $CLICKPATH_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clickId": "clk_M1bT0e",
    "eventName": "Early access signup",
    "eventId": "signup_88213",
    "customer": {
      "externalId": "cus_88213",
      "email": "sam@example.com"
    }
  }'

# 202 Accepted · email is SHA-256 hashed before forwarding`,
  },
  {
    label: "Node",
    language: "ts",
    code: `import { Clickpath } from "@clickpath/node";

const cp = new Clickpath(process.env.CLICKPATH_KEY);

// record a lead from your signup handler
await cp.track.lead({
  clickId: req.cookies.cp_click_id,
  eventName: "Early access signup",
  eventId: \`signup_\${user.id}\`,
  customer: { externalId: user.id, email: user.email },
});`,
  },
  {
    label: "Python",
    language: "python",
    code: `from clickpath import Clickpath

cp = Clickpath(os.environ["CLICKPATH_KEY"])

# record a lead from your signup handler
cp.track.lead(
    click_id=request.cookies["cp_click_id"],
    event_name="Early access signup",
    event_id=f"signup_{user.id}",
    customer={"external_id": user.id, "email": user.email},
)`,
  },
];
