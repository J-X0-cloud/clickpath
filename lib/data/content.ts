import type { FeatureTile } from "@/types/analytics";

/** A checklist line: bold lead-in followed by the rest of the sentence. */
export interface CheckItem {
  strong: string;
  text: string;
}

export const LINK_FEATURES: readonly CheckItem[] = [
  { strong: "Custom domains", text: "like go.yourbrand.com with automatic SSL" },
  { strong: "UTM builder with templates", text: "so naming stays consistent across the team" },
  { strong: "Device and geo rules", text: "that route iOS, Android and regions to the right page" },
  { strong: "QR codes", text: "in your colors for print, packaging and events" },
];

export const ATTRIBUTION_FEATURES: readonly CheckItem[] = [
  { strong: "Click → lead → sale", text: "funnels per link, campaign or source" },
  { strong: "Customer timelines", text: "with every touch and lifetime value" },
  { strong: "First-click, last-click and linear", text: "models side by side" },
];

export const CONVERSION_FEATURES: readonly CheckItem[] = [
  { strong: "One event, every destination", text: "with per-platform field mapping" },
  { strong: "Deduplication", text: "against your browser pixel using shared event IDs" },
  { strong: "Automatic retries", text: "and a delivery log you can audit line by line" },
];

export const HOW_IT_WORKS: readonly { title: string; body: string }[] = [
  { title: "Create the link", body: "Build a short link with UTMs from a saved template, on your own domain." },
  {
    title: "Capture the click",
    body: "A first-party click ID is stored on your site, surviving redirects and blocked third-party cookies.",
  },
  {
    title: "Track the outcome",
    body: "Send leads and sales from your backend, or connect Stripe and Shopify with no code.",
  },
  {
    title: "Close the loop",
    body: "Conversions flow to your ad platforms and dashboards, tied to the link that earned them.",
  },
];

export const EVERYTHING_IN_THE_BOX: readonly FeatureTile[] = [
  { icon: "globe", title: "Custom domains", body: "Bring as many branded domains as you need, with SSL issued automatically." },
  { icon: "tag", title: "UTM templates", body: "Lock sources and mediums to an approved list so reports stay clean." },
  {
    icon: "phone",
    title: "Deep links",
    body: "Open the app when it’s installed and fall back to the web when it isn’t.",
  },
  { icon: "qr", title: "QR codes", body: "On-brand codes for packaging, events and print, tracked like any link." },
  {
    icon: "lock",
    title: "Link controls",
    body: "Passwords, expiry dates and click limits for offers that shouldn’t live forever.",
  },
  { icon: "users", title: "Team workspaces", body: "Separate brands and clients, with roles for agencies and contractors." },
  { icon: "download", title: "Exports", body: "CSV exports and a warehouse sync for BigQuery and Snowflake." },
  {
    icon: "shield",
    title: "Privacy first",
    body: "PII is hashed before it leaves your server, and consent signals are respected.",
  },
];

export const TESTIMONIAL = {
  quote:
    "We finally stopped arguing about which channel drove the quarter. Every sale now shows the link it came from, and our Meta campaigns optimize on real purchases instead of add-to-carts.",
  name: "Dana R.",
  role: "Head of Growth, Halcyon Supply",
  initials: "DR",
  color: "#0E7C5A",
};

export const NAMING_RULES: readonly CheckItem[] = [
  { strong: "Allowed values", text: "for source and medium, with lowercase enforced" },
  { strong: "Campaign patterns", text: "with tokens like season, product and year" },
  { strong: "Bulk create", text: "dozens of creator links from a CSV" },
];

export const DOMAIN_FEATURES: readonly CheckItem[] = [
  { strong: "Unlimited domains", text: "on Growth and above" },
  { strong: "Root and subdomains", text: ", with a custom 404 fallback" },
  { strong: "Per-domain analytics", text: "across every link" },
];

export const ROUTING_FEATURES: readonly CheckItem[] = [
  { strong: "Device, OS and country rules", text: "evaluated at the edge" },
  { strong: "A/B split", text: "traffic between two landing pages" },
  { strong: "Expiry and click caps", text: "for limited offers" },
];

export const JOURNEY_FEATURES: readonly CheckItem[] = [
  { strong: "Multi-touch timelines", text: "across devices when a customer signs in" },
  { strong: "Lifetime value", text: "updated with each new order or renewal" },
  { strong: "Refunds and chargebacks", text: "reversed out of attributed revenue" },
];

export const ATTRIBUTION_MODELS: readonly FeatureTile[] = [
  { icon: "link", title: "First click", body: "Credit the link that introduced the customer. Useful for prospecting budgets." },
  { icon: "cart", title: "Last click", body: "Credit the final link before conversion. Closest to what ad platforms report." },
  { icon: "layers", title: "Linear", body: "Split credit evenly across every tracked touch in the lookback window." },
  { icon: "clock", title: "Time decay", body: "Weight recent touches more heavily, with a half-life you control." },
];

export const API_FEATURES: readonly CheckItem[] = [
  { strong: "SDKs", text: "for Node, Python and Go, plus plain REST" },
  { strong: "Signed webhooks", text: "when a conversion is attributed" },
  { strong: "Test mode", text: "with a sandbox workspace and event inspector" },
];

export const DELIVERY_GUARANTEES: readonly FeatureTile[] = [
  {
    icon: "shield",
    title: "Hashed and consent-aware",
    body: "Emails and phone numbers are normalized and hashed before they leave Clickpath. Events without marketing consent are held back automatically.",
  },
  {
    icon: "refresh",
    title: "Retries with backoff",
    body: "Platform outages and rate limits are retried for up to 72 hours, then parked in a replay queue with the exact error.",
  },
  {
    icon: "layers",
    title: "Per-platform mapping",
    body: "Map your event names to each platform’s standard events and choose which ones count as primary conversions.",
  },
];
