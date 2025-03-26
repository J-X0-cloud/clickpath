import type { ReactNode } from "react";

/** Browser-window frame around product mockups. */
export function AppWindow({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="win">
      <div className="win-top">
        <i />
        <i />
        <i />
        <span className="url">{url}</span>
      </div>
      {children}
    </div>
  );
}
