import type { BreakdownRow, CustomerJourney, DailyTotals, LinkPerformance } from "@/types/analytics";

/** Workspace shown throughout the product mockups. */
export const DEMO_WORKSPACE = {
  name: "Halcyon Supply",
  slug: "halcyon",
  domain: "go.halcyon.co",
  range: "Last 30 days",
};

/** Daily totals for the last 30 days (Aug 26 – Sep 24, 2026). */
export const DAILY_TOTALS: readonly DailyTotals[] = [
  { date: "2026-08-26", clicks: 1375, leads: 61, sales: 10 },
  { date: "2026-08-27", clicks: 1365, leads: 65, sales: 11 },
  { date: "2026-08-28", clicks: 1239, leads: 73, sales: 12 },
  { date: "2026-08-29", clicks: 1254, leads: 70, sales: 12 },
  { date: "2026-08-30", clicks: 1253, leads: 73, sales: 13 },
  { date: "2026-08-31", clicks: 1141, leads: 69, sales: 14 },
  { date: "2026-09-01", clicks: 1206, leads: 63, sales: 13 },
  { date: "2026-09-02", clicks: 1536, leads: 62, sales: 14 },
  { date: "2026-09-03", clicks: 1499, leads: 54, sales: 15 },
  { date: "2026-09-04", clicks: 1602, leads: 54, sales: 15 },
  { date: "2026-09-05", clicks: 1889, leads: 48, sales: 13 },
  { date: "2026-09-06", clicks: 1791, leads: 48, sales: 13 },
  { date: "2026-09-07", clicks: 1888, leads: 52, sales: 12 },
  { date: "2026-09-08", clicks: 1746, leads: 58, sales: 13 },
  { date: "2026-09-09", clicks: 1713, leads: 55, sales: 12 },
  { date: "2026-09-10", clicks: 1491, leads: 60, sales: 11 },
  { date: "2026-09-11", clicks: 1363, leads: 63, sales: 12 },
  { date: "2026-09-12", clicks: 1874, leads: 77, sales: 18 },
  { date: "2026-09-13", clicks: 1242, leads: 67, sales: 13 },
  { date: "2026-09-14", clicks: 1490, leads: 68, sales: 15 },
  { date: "2026-09-15", clicks: 1533, leads: 74, sales: 15 },
  { date: "2026-09-16", clicks: 1467, leads: 65, sales: 15 },
  { date: "2026-09-17", clicks: 1769, leads: 71, sales: 17 },
  { date: "2026-09-18", clicks: 1841, leads: 66, sales: 16 },
  { date: "2026-09-19", clicks: 1860, leads: 65, sales: 16 },
  { date: "2026-09-20", clicks: 1849, leads: 65, sales: 15 },
  { date: "2026-09-21", clicks: 2092, leads: 68, sales: 14 },
  { date: "2026-09-22", clicks: 1960, leads: 74, sales: 14 },
  { date: "2026-09-23", clicks: 1963, leads: 70, sales: 14 },
  { date: "2026-09-24", clicks: 1919, leads: 74, sales: 15 },
];

/** Day highlighted by default in the chart tooltip. */
export const HIGHLIGHT_DATE = "2026-09-12";

/** Leads and sales are plotted on their own scales, peaking at these fractions of the clicks line. */
export const SERIES_HEIGHT = { clicks: 1, leads: 0.3409, sales: 0.1155 } as const;

export const PERIOD_TOTALS = {
  clicks: 48_210,
  leads: 1_932,
  sales: 412,
  revenue: 61_480,
};

/** Change vs the previous 30 days. */
export const PERIOD_CHANGE = {
  clicks: 0.124,
  leads: 0.081,
  sales: 0.159,
  revenue: 0.182,
};

/** Axis ticks under the timeline. */
export const AXIS_LABELS = ["Aug 26", "Sep 2", "Sep 9", "Sep 16", "Sep 24"] as const;

export const TOP_LINKS: readonly LinkPerformance[] = [
  {
    shortUrl: "go.halcyon.co/spring",
    destination: "halcyonsupply.com/collections/spring",
    color: "#16A37A",
    initials: "HS",
    source: "Meta · Prospecting",
    clicks: 18_402,
    leads: 742,
    sales: 164,
    revenue: 24_106,
  },
  {
    shortUrl: "go.halcyon.co/tt-ugc",
    destination: "halcyonsupply.com/p/field-jacket",
    color: "#E2553A",
    initials: "HS",
    source: "TikTok · UGC set B",
    clicks: 12_977,
    leads: 511,
    sales: 98,
    revenue: 14_420,
  },
  {
    shortUrl: "go.halcyon.co/brand",
    destination: "halcyonsupply.com",
    color: "#EFA12A",
    initials: "HS",
    source: "Google Ads · Brand",
    clicks: 9_630,
    leads: 468,
    sales: 121,
    revenue: 17_890,
  },
  {
    shortUrl: "go.halcyon.co/news-0918",
    destination: "halcyonsupply.com/journal/fall-edit",
    color: "#0C1F19",
    initials: "HS",
    source: "Newsletter",
    clicks: 4_118,
    leads: 163,
    sales: 22,
    revenue: 3_212,
  },
];

export const REVENUE_BY_SOURCE: readonly BreakdownRow[] = [
  { label: "Meta", value: "$24,106", share: 100, color: "#16A37A" },
  { label: "Google Ads", value: "$17,890", share: 74, color: "#EFA12A" },
  { label: "TikTok", value: "$14,420", share: 60, color: "#E2553A" },
  { label: "Newsletter", value: "$3,212", share: 13, color: "#0C1F19" },
  { label: "Podcasts", value: "$1,852", share: 8, color: "#6B7772" },
];

export const TOP_COUNTRIES: readonly BreakdownRow[] = [
  { label: "United States", value: "31,442", share: 100 },
  { label: "Canada", value: "8,806", share: 28 },
  { label: "United Kingdom", value: "4,120", share: 13 },
  { label: "Australia", value: "2,531", share: 8 },
  { label: "Germany", value: "1,311", share: 4 },
];

export const DEVICES: readonly BreakdownRow[] = [
  { label: "iPhone", value: "58%", share: 100 },
  { label: "Android", value: "28%", share: 48 },
  { label: "Desktop", value: "12%", share: 22 },
  { label: "Tablet", value: "2%", share: 5 },
];

export const SAMPLE_CUSTOMER: CustomerJourney = {
  id: "48213",
  maskedEmail: "m••••@gmail.com",
  location: "Austin, TX",
  device: "iPhone",
  lifetimeValue: 41_200,
  steps: [
    { kind: "clicks", title: "Clicked go.halcyon.co/tt-ugc", detail: "Sep 3 · TikTok · UGC set B" },
    { kind: "clicks", title: "Clicked go.halcyon.co/spring", detail: "Sep 6 · Meta · Retargeting 7d" },
    { kind: "leads", title: "Lead · Joined early-access list", detail: "Sep 6 · attributed to go.halcyon.co/spring" },
    { kind: "sales", title: "Sale · Field jacket, $264.00", detail: "Sep 9 · sent to Meta CAPI and TikTok Events" },
    { kind: "sales", title: "Sale · Merino crew, $148.00", detail: "Sep 21 · repeat purchase" },
  ],
};

/** The order card under the funnel on the home page. */
export const SAMPLE_ORDER = {
  number: "10482",
  product: "Merino crew",
  image: "/images/merino-crew.webp",
  attribution: "Attributed to go.halcyon.co/spring · Meta · Prospecting",
  amountCents: 14_800,
};
