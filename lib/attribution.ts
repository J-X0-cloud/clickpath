/**
 * Attribution models. Each model takes the ordered touches that led to a conversion and
 * returns how much of the conversion's value each touch earns. Credits always sum to the
 * conversion value, so reports can be compared model against model.
 */

export type AttributionModel = "first_click" | "last_click" | "linear" | "time_decay";

export interface Touch {
  /** Short link that was clicked, e.g. "go.halcyon.co/spring". */
  link: string;
  /** Channel the link was placed in: Meta, Google Ads, TikTok, Newsletter… */
  source: string;
  campaign?: string;
  clickedAt: Date;
}

export interface Credit {
  link: string;
  source: string;
  weight: number;
  value: number;
}

export interface AttributionOptions {
  /** Touches older than this before the conversion are ignored. Default 30 days. */
  lookbackDays?: number;
  /** Time-decay half-life. A touch this long before conversion gets half the weight. Default 7 days. */
  halfLifeDays?: number;
}

const DAY_MS = 86_400_000;

export const MODEL_LABELS: Record<AttributionModel, string> = {
  first_click: "First click",
  last_click: "Last click",
  linear: "Linear",
  time_decay: "Time decay",
};

function weights(model: AttributionModel, touches: readonly Touch[], convertedAt: Date, halfLifeDays: number): number[] {
  const n = touches.length;
  switch (model) {
    case "first_click":
      return touches.map((_, i) => (i === 0 ? 1 : 0));
    case "last_click":
      return touches.map((_, i) => (i === n - 1 ? 1 : 0));
    case "linear":
      return touches.map(() => 1 / n);
    case "time_decay": {
      const raw = touches.map((t) => {
        const ageDays = (convertedAt.getTime() - t.clickedAt.getTime()) / DAY_MS;
        return 0.5 ** (ageDays / halfLifeDays);
      });
      const total = raw.reduce((a, b) => a + b, 0);
      return raw.map((w) => w / total);
    }
  }
}

/**
 * Distribute a conversion's value across its touches.
 * Touches after the conversion or outside the lookback window never earn credit.
 */
export function attribute(
  touches: readonly Touch[],
  conversion: { value: number; convertedAt: Date },
  model: AttributionModel,
  { lookbackDays = 30, halfLifeDays = 7 }: AttributionOptions = {},
): Credit[] {
  const windowStart = conversion.convertedAt.getTime() - lookbackDays * DAY_MS;
  const eligible = [...touches]
    .filter((t) => t.clickedAt.getTime() <= conversion.convertedAt.getTime() && t.clickedAt.getTime() >= windowStart)
    .sort((a, b) => a.clickedAt.getTime() - b.clickedAt.getTime());

  if (eligible.length === 0) return [];

  return weights(model, eligible, conversion.convertedAt, halfLifeDays).map((weight, i) => ({
    link: eligible[i]!.link,
    source: eligible[i]!.source,
    weight,
    value: conversion.value * weight,
  }));
}

export interface AttributedConversion {
  value: number;
  convertedAt: Date;
  touches: readonly Touch[];
}

/** Total credited value per source for a set of conversions under one model, largest first. */
export function creditBySource(
  conversions: readonly AttributedConversion[],
  model: AttributionModel,
  options?: AttributionOptions,
): { source: string; value: number }[] {
  const totals = new Map<string, number>();
  for (const conversion of conversions) {
    for (const credit of attribute(conversion.touches, conversion, model, options)) {
      totals.set(credit.source, (totals.get(credit.source) ?? 0) + credit.value);
    }
  }
  return [...totals.entries()]
    .map(([source, value]) => ({ source, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);
}

/** Run every model over the same conversions, for side-by-side comparison. */
export function compareModels(conversions: readonly AttributedConversion[], options?: AttributionOptions) {
  return (Object.keys(MODEL_LABELS) as AttributionModel[]).map((model) => ({
    model,
    label: MODEL_LABELS[model],
    bySource: creditBySource(conversions, model, options),
  }));
}
