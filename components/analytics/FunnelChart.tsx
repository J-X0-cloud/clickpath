import { funnelGeometry } from "@/lib/funnel";
import { PERIOD_TOTALS } from "@/lib/data/analytics";
import { formatCount, formatPercent, formatRevenue } from "@/lib/format";
import { METRICS } from "./metrics";

/** Band thickness per stage, as a share of the clicks stage. Deliberately not to scale. */
const BAND_HEIGHTS = [100, 42, 16] as const;

export function FunnelChart() {
  const { clicks, leads, sales, revenue } = PERIOD_TOTALS;
  const geometry = funnelGeometry(BAND_HEIGHTS);
  const stages = METRICS.slice(0, 3);
  const values = [clicks, leads, sales];

  return (
    <div className="funnel">
      {stages.map((stage, i) => (
        <div className="fstep" key={stage.key}>
          <small>
            <i style={{ background: stage.swatch }} />
            {stage.label}
          </small>
          <b>{formatCount(values[i] ?? 0)}</b>
        </div>
      ))}
      <svg className="fsvg" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="funnel-band" x1="0" x2="1">
            <stop offset="0" stopColor="#16A37A" />
            <stop offset=".36" stopColor="#16A37A" />
            <stop offset=".5" stopColor="#EFA12A" />
            <stop offset=".7" stopColor="#EFA12A" />
            <stop offset=".84" stopColor="#E2553A" />
            <stop offset="1" stopColor="#E2553A" />
          </linearGradient>
        </defs>
        <path d={geometry.upper} fill="url(#funnel-band)" opacity=".92" />
        <path d={geometry.lower} fill="url(#funnel-band)" opacity=".92" />
        {geometry.dividers.map((x) => (
          <line
            key={x}
            x1={x.toFixed(0)}
            x2={x.toFixed(0)}
            y1="0"
            y2={geometry.height}
            stroke="#EEEDE6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="frates">
        <div>
          Click→lead <b>{formatPercent(leads / clicks)}</b>
        </div>
        <div>
          Lead→sale <b>{formatPercent(sales / leads)}</b>
        </div>
        <div>
          Revenue <b>{formatRevenue(revenue)}</b>
        </div>
      </div>
    </div>
  );
}
