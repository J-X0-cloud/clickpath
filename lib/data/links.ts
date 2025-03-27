import type { BrandedDomain, LinkPreview, RoutingRule, UtmParams, UtmTemplate } from "@/types/links";

export const LINK_PREVIEWS: readonly LinkPreview[] = [
  {
    color: "#16A37A",
    shortUrl: "go.halcyon.co/spring",
    destination: "halcyonsupply.com/collections/spring?utm_source=meta",
    clicks: "18.4K",
    badge: "Primary",
  },
  { color: "#EFA12A", shortUrl: "go.halcyon.co/podcast", destination: "halcyonsupply.com/offer/podcast-15", clicks: "6.2K" },
  {
    color: "#E2553A",
    shortUrl: "go.halcyon.co/tt-ugc",
    destination: "halcyonsupply.com/p/field-jacket?utm_source=tiktok",
    clicks: "12.9K",
  },
  {
    color: "#0C1F19",
    shortUrl: "go.halcyon.co/app",
    destination: "iOS → App Store · Android → Play · else → web",
    clicks: "3.1K",
  },
];

export const UTM_TEMPLATES: readonly UtmTemplate[] = [
  {
    id: "paid-social",
    name: "Paid social",
    sources: ["meta", "tiktok", "pinterest"],
    medium: "paid_social",
    campaignPattern: "{season}_{product}_{year}",
    enforcement: "Required",
  },
  {
    id: "paid-search",
    name: "Paid search",
    sources: ["google", "bing"],
    medium: "cpc",
    campaignPattern: "{brand|nonbrand}_{theme}",
    enforcement: "Required",
  },
  {
    id: "creators",
    name: "Creators",
    sources: ["creator_{handle}"],
    medium: "affiliate",
    campaignPattern: "{creator}_{drop}",
    enforcement: "Optional",
  },
  {
    id: "email",
    name: "Email",
    sources: ["klaviyo"],
    medium: "email",
    campaignPattern: "{flow|campaign}_{date}",
    enforcement: "Optional",
  },
  {
    id: "offline",
    name: "Offline",
    sources: ["podcast", "print", "event"],
    medium: "offline",
    campaignPattern: "{show}_{episode}",
    enforcement: "Required",
  },
];

export const WORKSPACE_DOMAINS = ["go.halcyon.co", "hlcy.link"] as const;

/** Pre-filled state of the "New link" form in the builder demo. */
export const BUILDER_DEFAULTS = {
  templateId: "paid-social",
  destination: "https://halcyonsupply.com/collections/spring",
  domain: "go.halcyon.co",
  slug: "spring-meta",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "spring_launch_2026",
    utm_content: "ugc_video_b",
  } satisfies UtmParams,
  options: {
    tracking: true,
    deviceRouting: true,
    expireAfterCampaign: false,
    password: false,
  },
};

export const BRANDED_DOMAINS: readonly BrandedDomain[] = [
  {
    host: "go.halcyon.co",
    note: "Primary · SSL active",
    status: "verified",
    links: 142,
    clicks30d: 41_806,
    color: "#16A37A",
  },
  { host: "hlcy.link", note: "Creators & affiliates", status: "verified", links: 61, clicks30d: 5_977, color: "#EFA12A" },
  {
    host: "shop.halcyon.co",
    note: "Add the CNAME below",
    status: "pending",
    links: 0,
    clicks30d: null,
    color: "#E2553A",
  },
];

export const PENDING_DNS_RECORD = { type: "CNAME", name: "shop", value: "cname.clickpath-dns.com", ttl: "Auto" };

export const ROUTING_EXAMPLE: { link: string; rules: readonly RoutingRule[] } = {
  link: "go.halcyon.co/app",
  rules: [
    { condition: "If device is", match: "iOS", destination: "App Store listing", share: 38 },
    { condition: "If device is", match: "Android", destination: "Play listing", share: 24 },
    { condition: "If country is", match: "Canada", destination: "/en-ca", share: 9 },
    { condition: "Otherwise", destination: "halcyonsupply.com/app", share: 29, fallback: true },
  ],
};
