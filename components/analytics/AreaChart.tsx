import { useId } from "react";
import { plotSeries, smoothPath, type ChartSeries } from "@/lib/charts";

const W = 800;
const H = 210;

interface AreaChartProps {
  series: readonly ChartSeries[];
  /** Series drawn at full strength; the rest are dimmed. Defaults to all. */
  emphasis?: string;
  /** Vertical guide at this data index. */
  markerIndex?: number;
}

/** Smoothed multi-series area chart, stretched to its container. */
export function AreaChart({ series, emphasis, markerIndex }: AreaChartProps) {
  const uid = useId().replace(/:/g, "");
  const plotted = plotSeries(series, { width: W, height: H });
  const count = series[0]?.values.length ?? 0;
  const markerX = markerIndex !== undefined && count > 1 ? (markerIndex * W) / (count - 1) : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {series.map((s) => (
          <linearGradient key={s.key} id={`${uid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={s.color} stopOpacity=".22" />
            <stop offset="1" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {[1, 2, 3, 4].map((g) => (
        <line
          key={g}
          x1="0"
          x2={W}
          y1={Math.round((H * g) / 5)}
          y2={Math.round((H * g) / 5)}
          stroke="#EEEDE6"
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {series.map((s, i) => {
        const d = smoothPath(plotted[i] ?? []);
        const dimmed = emphasis !== undefined && emphasis !== s.key;
        return (
          <g key={s.key} opacity={dimmed ? 0.35 : 1}>
            <path d={`${d} L${W},${H} L0,${H} Z`} fill={`url(#${uid}-${s.key})`} />
            <path d={d} fill="none" stroke={s.color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </g>
        );
      })}
      {markerX !== null && (
        <line
          x1={markerX.toFixed(0)}
          x2={markerX.toFixed(0)}
          y1="0"
          y2={H}
          stroke="#0C1F19"
          strokeOpacity=".25"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
