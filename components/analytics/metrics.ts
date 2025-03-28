import type { MetricKey } from "@/types/analytics";

export interface MetricMeta {
  key: MetricKey;
  label: string;
  /** CSS custom property holding the metric colour. */
  swatch: string;
  color: string;
}

/** Colour language shared by every chart: emerald clicks, amber leads, vermilion sales. */
export const METRICS: readonly MetricMeta[] = [
  { key: "clicks", label: "Clicks", swatch: "var(--clk)", color: "#16A37A" },
  { key: "leads", label: "Leads", swatch: "var(--lead)", color: "#EFA12A" },
  { key: "sales", label: "Sales", swatch: "var(--sale)", color: "#E2553A" },
  { key: "revenue", label: "Revenue", swatch: "var(--ink)", color: "#0C1F19" },
];
