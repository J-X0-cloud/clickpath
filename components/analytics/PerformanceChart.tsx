"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import type { FunnelStage, MetricKey } from "@/types/analytics";
import {
  AXIS_LABELS,
  DAILY_TOTALS,
  HIGHLIGHT_DATE,
  PERIOD_CHANGE,
  PERIOD_TOTALS,
  SERIES_HEIGHT,
} from "@/lib/data/analytics";
import { nearestIndex, type ChartSeries } from "@/lib/charts";
import { formatCount, formatLongDate, formatRevenue, formatSignedPercent } from "@/lib/format";
import { AreaChart } from "./AreaChart";
import { METRICS } from "./metrics";

const STAGES: readonly FunnelStage[] = ["clicks", "leads", "sales"];
const DEFAULT_INDEX = Math.max(
  0,
  DAILY_TOTALS.findIndex((d) => d.date === HIGHLIGHT_DATE),
);

interface PerformanceChartProps {
  /** "overview" plots all three stages with period deltas; "focus" plots one stage at a time. */
  mode: "overview" | "focus";
  /** Borderless variant used inside a card on the attribution page. */
  flush?: boolean;
}

/**
 * KPI strip plus timeline. Hover or drag across the chart to inspect a day; pick a KPI to
 * emphasise (overview) or plot (focus) that stage.
 */
export function PerformanceChart({ mode, flush = false }: PerformanceChartProps) {
  const [selected, setSelected] = useState<MetricKey>("clicks");
  const [active, setActive] = useState(DEFAULT_INDEX);
  const chartRef = useRef<HTMLDivElement>(null);

  const series = useMemo<ChartSeries[]>(() => {
    const stages = mode === "overview" ? STAGES : [selected === "revenue" ? "sales" : selected];
    return stages.map((stage) => {
      const meta = METRICS.find((m) => m.key === stage)!;
      return {
        key: stage,
        color: meta.color,
        values: DAILY_TOTALS.map((d) => d[stage]),
        heightRatio: mode === "overview" ? SERIES_HEIGHT[stage] : 1,
      };
    });
  }, [mode, selected]);

  const day = DAILY_TOTALS[active] ?? DAILY_TOTALS[DEFAULT_INDEX]!;
  const tooltipStages = mode === "overview" ? STAGES : series.map((s) => s.key as FunnelStage);
  const position = (active / (DAILY_TOTALS.length - 1)) * 100;

  function inspect(event: PointerEvent<HTMLDivElement>) {
    const box = chartRef.current?.getBoundingClientRect();
    if (!box) return;
    setActive(nearestIndex((event.clientX - box.left) / box.width, DAILY_TOTALS.length));
  }

  return (
    <>
      <div className={flush ? "kpis flush" : "kpis"}>
        {METRICS.map((metric) => {
          const total = PERIOD_TOTALS[metric.key];
          return (
            <button
              key={metric.key}
              type="button"
              className={metric.key === selected ? "kpi on" : "kpi"}
              aria-pressed={metric.key === selected}
              onClick={() => setSelected(metric.key)}
            >
              <small>
                <i style={{ background: metric.swatch }} />
                {metric.label}
              </small>
              <b>{metric.key === "revenue" ? formatRevenue(total) : formatCount(total)}</b>
              {mode === "overview" && <span className="d">{formatSignedPercent(PERIOD_CHANGE[metric.key])}</span>}
            </button>
          );
        })}
      </div>
      <div
        ref={chartRef}
        className={flush ? "chart flush" : "chart"}
        onPointerMove={inspect}
        onPointerLeave={() => setActive(DEFAULT_INDEX)}
      >
        <AreaChart
          series={series}
          emphasis={mode === "overview" && (selected === "leads" || selected === "sales") ? selected : undefined}
          markerIndex={active}
        />
        <div className="tip" style={{ left: `${Math.min(Math.max(position - 3.6, 0), 78).toFixed(1)}%`, top: flush ? 20 : 14 }}>
          <strong>{formatLongDate(day.date)}</strong>
          {tooltipStages.map((stage) => {
            const meta = METRICS.find((m) => m.key === stage)!;
            return (
              <div key={stage}>
                <span>
                  <i style={{ background: meta.swatch }} />
                  {meta.label}
                </span>
                {formatCount(day[stage])}
              </div>
            );
          })}
        </div>
        <div className="ax">
          {AXIS_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </>
  );
}
