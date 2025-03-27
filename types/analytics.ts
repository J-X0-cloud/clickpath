import type { IconName } from "@/components/ui/icons";

export type FunnelStage = "clicks" | "leads" | "sales";
export type MetricKey = FunnelStage | "revenue";

export interface DailyTotals {
  date: string; // ISO date
  clicks: number;
  leads: number;
  sales: number;
}

export interface LinkPerformance {
  shortUrl: string;
  destination: string;
  color: string;
  initials: string;
  source: string;
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
}

export interface BreakdownRow {
  label: string;
  value: string;
  /** Bar width relative to the top row, 0–100. */
  share: number;
  color?: string;
}

export interface JourneyStep {
  kind: FunnelStage;
  title: string;
  detail: string;
}

export interface CustomerJourney {
  id: string;
  maskedEmail: string;
  location: string;
  device: string;
  /** Lifetime revenue in cents. */
  lifetimeValue: number;
  steps: readonly JourneyStep[];
}

export interface FeatureTile {
  icon: IconName;
  title: string;
  body: string;
}
