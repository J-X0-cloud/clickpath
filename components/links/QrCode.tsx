import { useMemo } from "react";
import { qrMatrix } from "@/lib/qr";

interface QrCodeProps {
  value: string;
  color?: string;
}

/** Branded QR code with the Clickpath mark in the centre. */
export function QrCode({ value, color = "#0C1F19" }: QrCodeProps) {
  const { size, path } = useMemo(() => qrMatrix(value), [value]);
  const mid = size / 2;
  const logo = size * 0.22;

  return (
    <svg className="qr" viewBox={`-1 -1 ${size + 2} ${size + 2}`} role="img" aria-label={`QR code for ${value}`}>
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="#fff" />
      <path d={path} fill={color} shapeRendering="crispEdges" />
      <rect x={mid - logo / 2} y={mid - logo / 2} width={logo} height={logo} rx={logo * 0.26} fill="#0C1F19" />
      <path
        d={`M${mid - logo * 0.3} ${mid + logo * 0.22}c${logo * 0.2} 0 ${logo * 0.24}-${logo * 0.48} ${logo * 0.3}-${logo * 0.48}s${logo * 0.1} ${logo * 0.48} ${logo * 0.3} ${logo * 0.48}`}
        fill="none"
        stroke="#7BE0B5"
        strokeWidth={logo * 0.11}
        strokeLinecap="round"
      />
    </svg>
  );
}
