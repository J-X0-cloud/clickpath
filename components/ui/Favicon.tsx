import type { ReactNode } from "react";

/** Coloured square used as a link or domain avatar in tables and lists. */
export function Favicon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="fav" style={{ background: color }}>
      {children}
    </span>
  );
}
