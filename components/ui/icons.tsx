import type { ReactElement } from "react";

/** 24×24 stroke icons (1.8px, round caps). Colour follows `currentColor`. */
export const ICON_PATHS = {
  link: (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M6 15l4-5 3 3 5-7" />
    </>
  ),
  send: <path d="M4 12l16-8-6 16-3-7-7-1z" />,
  qr: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" />
    </>
  ),
  tag: (
    <>
      <path d="M4 12V5a1 1 0 011-1h7l8 8-8 8-8-8z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0111 0" />
      <path d="M16 6.5a3 3 0 010 5.5M17.5 19a5 5 0 00-2-4" />
    </>
  ),
  code: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 00-14.3-4.9L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0014.3 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4l8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  hook: (
    <>
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="12" cy="7" r="3" />
      <path d="M10.5 9.5L8 14.5M13.5 9.5l2.5 5M10 17h4" />
    </>
  ),
  home: <path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" />,
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
      <path d="M3 4h2.5l2.2 10.5h10.6L20 7H6.4" />
    </>
  ),
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof ICON_PATHS;
