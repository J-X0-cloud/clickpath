export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  /** Heading above the feature list, e.g. "Everything in Starter, plus". */
  includesLabel: string;
  features: readonly string[];
  popular?: boolean;
  variant: "primary" | "ghost";
}

export const PLANS: readonly Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: " /month",
    description: "For side projects and trying Clickpath on one campaign.",
    cta: "Start free",
    includesLabel: "Includes",
    features: [
      "1,000 tracked events / mo",
      "25 new links / mo",
      "1 custom domain",
      "UTM builder & QR codes",
      "30-day analytics history",
    ],
    variant: "ghost",
  },
  {
    name: "Growth",
    price: "$59",
    period: " /month",
    description: "For DTC brands and startups running paid social and search.",
    cta: "Start 14-day trial",
    includesLabel: "Everything in Starter, plus",
    features: [
      "50,000 tracked events / mo",
      "Unlimited links & domains",
      "Lead and sale attribution",
      "Meta, Google Ads & TikTok destinations",
      "1-year analytics history",
    ],
    popular: true,
    variant: "primary",
  },
  {
    name: "Scale",
    price: "$249",
    period: " /month",
    description: "For high-volume teams and agencies managing several brands.",
    cta: "Start 14-day trial",
    includesLabel: "Everything in Growth, plus",
    features: [
      "500,000 tracked events / mo",
      "Multiple workspaces",
      "Attribution model comparison",
      "Warehouse sync",
      "Priority support",
    ],
    variant: "ghost",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large advertisers with security and volume requirements.",
    cta: "Talk to sales",
    includesLabel: "Everything in Scale, plus",
    features: [
      "Custom event volume",
      "SSO, SAML & audit log",
      "Data residency options",
      "Uptime SLA",
      "Dedicated onboarding",
    ],
    variant: "ghost",
  },
];

/** `true` renders a check, `false` a dash, strings render as-is. */
export type Cell = boolean | string;

export interface ComparisonGroup {
  group: string;
  rows: readonly (readonly [feature: string, starter: Cell, growth: Cell, scale: Cell, enterprise: Cell])[];
}

export const PLAN_COMPARISON: readonly ComparisonGroup[] = [
  {
    group: "Links",
    rows: [
      ["Custom domains", "1", "Unlimited", "Unlimited", "Unlimited"],
      ["UTM templates", false, true, true, true],
      ["Device & geo routing", false, true, true, true],
      ["QR codes", true, true, true, true],
    ],
  },
  {
    group: "Attribution",
    rows: [
      ["Tracked events / month", "1K", "50K", "500K", "Custom"],
      ["Lead & sale tracking", false, true, true, true],
      ["Customer timelines", false, true, true, true],
      ["Model comparison", false, false, true, true],
    ],
  },
  {
    group: "Conversion API",
    rows: [
      ["Ad platform destinations", false, "3", "3", "3 + custom"],
      ["Delivery log retention", false, "30 days", "1 year", "Custom"],
      ["Webhooks", false, true, true, true],
      ["Warehouse sync", false, false, true, true],
    ],
  },
  {
    group: "Workspace",
    rows: [
      ["Seats", "1", "5", "20", "Unlimited"],
      ["SSO / SAML", false, false, false, true],
      ["Support", "Community", "Email", "Priority", "Dedicated"],
    ],
  },
];
