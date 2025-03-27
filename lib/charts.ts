/** Geometry helpers for the hand-drawn SVG charts. */

export type Point = readonly [x: number, y: number];

/** Smooth horizontal-tangent curve through the points (cubic Béziers with mid-x control points). */
export function smoothPath(points: readonly Point[]): string {
  const [first, ...rest] = points;
  if (!first) return "";
  let d = `M${first[0].toFixed(1)},${first[1].toFixed(1)}`;
  let prev = first;
  for (const [x, y] of rest) {
    const cx = ((prev[0] + x) / 2).toFixed(1);
    d += ` C${cx},${prev[1].toFixed(1)} ${cx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    prev = [x, y];
  }
  return d;
}

export interface ChartSeries {
  key: string;
  color: string;
  values: readonly number[];
  /**
   * Peak height of this series relative to the tallest one. Leads and sales are drawn on their
   * own scales so they stay readable next to clicks instead of flattening onto the baseline.
   */
  heightRatio?: number;
}

export interface PlotBox {
  width: number;
  height: number;
  /** Vertical breathing room above the tallest peak. */
  headroom?: number;
}

/** Map each series to SVG points inside the box. */
export function plotSeries(series: readonly ChartSeries[], { width, height, headroom = 1.12 }: PlotBox): Point[][] {
  return series.map(({ values, heightRatio = 1 }) => {
    const peak = Math.max(...values, 1);
    const n = values.length;
    return values.map((v, i): Point => {
      const normalised = (v / peak) * heightRatio;
      return [(i * width) / (n - 1), height - 6 - (normalised / headroom) * (height - 12)];
    });
  });
}

/** Index of the data point nearest to a horizontal position (0–1). */
export function nearestIndex(position: number, count: number): number {
  return Math.min(count - 1, Math.max(0, Math.round(position * (count - 1))));
}
