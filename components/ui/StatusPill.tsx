import type { ReactNode } from "react";

export type StatusTone = "ok" | "wait" | "err" | "n";

export function StatusPill({ tone, children }: { tone: StatusTone; children?: ReactNode }) {
  return <span className={`st st-${tone}`}>{children}</span>;
}
