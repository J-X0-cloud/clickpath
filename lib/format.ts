const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const longDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const formatCount = (n: number) => integer.format(n);

/** $61,480 for dashboard totals. */
export const formatRevenue = (dollars: number) => currencyWhole.format(dollars);

/** $148.00 for individual orders. Amounts are stored in cents. */
export const formatCents = (cents: number) => currency.format(cents / 100);

/** 18,402 → "18.4K" for compact link counters. */
export function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export const formatPercent = (ratio: number, digits = 1) => `${(ratio * 100).toFixed(digits)}%`;

export const formatSignedPercent = (ratio: number) => `${ratio >= 0 ? "+" : "−"}${Math.abs(ratio * 100).toFixed(1)}%`;

export const formatShortDate = (iso: string) => shortDate.format(new Date(`${iso}T00:00:00Z`));
export const formatLongDate = (iso: string) => longDate.format(new Date(`${iso}T00:00:00Z`));
