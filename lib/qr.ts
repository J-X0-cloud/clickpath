import { create } from "qrcode";

export interface QrMatrix {
  size: number;
  /** SVG path covering every dark module, one unit per module. */
  path: string;
}

/**
 * Encode a short link as a QR matrix. Error correction is set to H (30%) so the brand mark
 * printed in the centre never makes a code unreadable.
 */
export function qrMatrix(text: string, { logoFraction = 0.22 }: { logoFraction?: number } = {}): QrMatrix {
  const { modules } = create(text, { errorCorrectionLevel: "H" });
  const size = modules.size;
  const logoStart = (size * (1 - logoFraction)) / 2;
  const logoEnd = size - logoStart;

  let path = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const underLogo = row >= logoStart && row < logoEnd && col >= logoStart && col < logoEnd;
      if (modules.get(row, col) && !underLogo) path += `M${col} ${row}h1v1h-1z`;
    }
  }
  return { size, path };
}
