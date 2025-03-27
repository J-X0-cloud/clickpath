export type UtmKey = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term";

export type UtmParams = Partial<Record<UtmKey, string>>;

export type Enforcement = "Required" | "Optional";

/** Channel naming convention defined by a workspace admin. */
export interface UtmTemplate {
  id: string;
  name: string;
  /** Allowed `utm_source` values. A trailing `{token}` (e.g. `creator_{handle}`) allows a free-form suffix. */
  sources: readonly string[];
  medium: string;
  /** Campaign pattern with `{tokens}`; `{a|b}` means one of the listed literals. */
  campaignPattern: string;
  enforcement: Enforcement;
}

export interface ShortLink {
  id: string;
  domain: string;
  slug: string;
  destination: string;
  utm: UtmParams;
  templateId?: string;
  tracking: boolean;
  deviceRouting: boolean;
  expiresAt?: string;
  passwordProtected: boolean;
  createdAt: string;
}

export type DomainStatus = "verified" | "pending";

export interface BrandedDomain {
  host: string;
  note: string;
  status: DomainStatus;
  links: number;
  clicks30d: number | null;
  color: string;
}

export interface RoutingRule {
  condition: string;
  /** Emphasised value inside the condition, e.g. "iOS". */
  match?: string;
  destination: string;
  share: number;
  fallback?: boolean;
}

export interface LinkPreview {
  color: string;
  shortUrl: string;
  destination: string;
  clicks: string;
  badge?: string;
}
