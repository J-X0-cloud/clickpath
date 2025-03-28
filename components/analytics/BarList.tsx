import type { CSSProperties } from "react";
import type { BreakdownRow } from "@/types/analytics";

interface BarListProps {
  rows: readonly BreakdownRow[];
  /** Bar fill when rows don't carry their own colour. */
  fill?: string;
}

/** Ranked list with proportional background bars. Coloured rows get a tinted bar and a swatch. */
export function BarList({ rows, fill }: BarListProps) {
  return (
    <div className="bars">
      {rows.map((row) => {
        const background = row.color ? `${row.color}22` : fill;
        const style = { "--w": `${row.share}%`, ...(background ? { "--bc": background } : {}) } as CSSProperties;
        return (
          <div className="bar" key={row.label} style={style}>
            {row.color ? (
              <span className="src">
                <i className="dot" style={{ background: row.color }} />
                {row.label}
              </span>
            ) : (
              <span>{row.label}</span>
            )}
            <b>{row.value}</b>
          </div>
        );
      })}
    </div>
  );
}
