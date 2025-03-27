/**
 * Geometry for the three-stage flowing funnel band (clicks → leads → sales).
 * Each stage is a flat plateau joined to the next by an S-curve; the band is mirrored
 * around the horizontal centre line.
 */
export interface FunnelGeometry {
  width: number;
  height: number;
  upper: string;
  lower: string;
  dividers: number[];
}

/** `heights` are stage thicknesses as a percentage of the tallest (first) stage. */
export function funnelGeometry(heights: readonly [number, number, number], width = 900, height = 170): FunnelGeometry {
  const seg = width / 3;
  const [a, b, c] = heights.map((v) => (v / 100) * (height - 20)) as [number, number, number];
  const stops: [number, number][] = [
    [0, a],
    [seg * 0.6, a],
    [seg * 1.25, b],
    [seg * 1.6, b],
    [seg * 2.25, c],
    [width, c],
  ];
  const centre = height / 2;

  const edge = (sign: 1 | -1) => {
    const [x0, t0] = stops[0]!;
    let d = `M${x0},${(centre - (sign * t0) / 2).toFixed(1)}`;
    for (let i = 1; i < stops.length; i++) {
      const [px, pt] = stops[i - 1]!;
      const [x, t] = stops[i]!;
      const y0 = centre - (sign * pt) / 2;
      const y1 = centre - (sign * t) / 2;
      if (pt === t) {
        d += ` L${x.toFixed(1)},${y1.toFixed(1)}`;
      } else {
        const cx = ((px + x) / 2).toFixed(1);
        d += ` C${cx},${y0.toFixed(1)} ${cx},${y1.toFixed(1)} ${x.toFixed(1)},${y1.toFixed(1)}`;
      }
    }
    return `${d} L${width},${centre} L0,${centre} Z`;
  };

  return { width, height, upper: edge(1), lower: edge(-1), dividers: [seg, seg * 2] };
}
