import type { CSSProperties } from "react";
import Link from "next/link";

/** Click → lead → sale path: the three brand colours on one curve. */
export function LogoMark({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={style}>
      <rect width="32" height="32" rx="9" fill="#0C1F19" />
      <path
        d="M8 22.5c3.5 0 4.5-13 8-13s4.5 13 8 13"
        fill="none"
        stroke="#7BE0B5"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <circle cx="8" cy="22.5" r="2.6" fill="#16A37A" />
      <circle cx="16" cy="9.5" r="2.6" fill="#EFA12A" />
      <circle cx="24" cy="22.5" r="2.6" fill="#E2553A" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Clickpath home">
      <LogoMark />
      <span>clickpath</span>
    </Link>
  );
}
