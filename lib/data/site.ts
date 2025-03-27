export const CONTACT_EMAIL = "hello@clickpath.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const SITE_URL = "https://clickpath.com";

export interface NavLink {
  href: string;
  label: string;
}

export const MAIN_NAV: readonly NavLink[] = [
  { href: "/links", label: "Short links" },
  { href: "/attribution", label: "Attribution" },
  { href: "/conversions", label: "Conversion API" },
  { href: "/pricing", label: "Pricing" },
];

export const FOOTER_COLUMNS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/links", label: "Short links" },
      { href: "/links#utm", label: "UTM builder" },
      { href: "/attribution", label: "Attribution" },
      { href: "/conversions", label: "Conversion API" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "#", label: "API reference" },
      { href: "#", label: "JavaScript SDK" },
      { href: "#", label: "Webhooks" },
      { href: "#", label: "Changelog" },
      { href: "#", label: "Status" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Security" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: CONTACT_MAILTO, label: CONTACT_EMAIL },
    ],
  },
];

/** Wordmarks in the customer strip; `style` maps to the .w1–.w5 type treatments. */
export const CUSTOMER_LOGOS: readonly { name: string; style: 1 | 2 | 3 | 4 | 5; tight?: boolean }[] = [
  { name: "halcyon", style: 1 },
  { name: "Marrow & Main", style: 2 },
  { name: "tidewater.labs", style: 3 },
  { name: "Oakline", style: 4 },
  { name: "Brightfold", style: 5 },
  { name: "parcelly", style: 1, tight: true },
  { name: "Sundry Goods", style: 4 },
  { name: "Kitefin", style: 2 },
];
