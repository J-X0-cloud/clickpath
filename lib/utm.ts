import type { UtmKey, UtmParams, UtmTemplate } from "@/types/links";

export const UTM_KEYS: readonly UtmKey[] = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/**
 * Normalise a UTM value the way reports expect it: lowercase, trimmed, spaces and dashes
 * collapsed to underscores. "Spring Launch-2026" → "spring_launch_2026".
 */
export function normalizeUtmValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_.{}|]/g, "")
    .replace(/_+/g, "_");
}

export interface FinalUrlPart {
  text: string;
  /** True for `key=value` pairs added by the builder (highlighted in the preview). */
  param: boolean;
}

/**
 * Append UTM parameters to a destination, preserving any query string already present.
 * Returns the pieces separately so the builder can highlight what it added.
 */
export function buildFinalUrl(destination: string, utm: UtmParams): { url: string; parts: FinalUrlPart[] } {
  const pairs = UTM_KEYS.flatMap((key) => {
    const value = utm[key];
    return value ? [`${key}=${encodeURIComponent(value)}`] : [];
  });
  const base = destination.trim();
  if (pairs.length === 0) return { url: base, parts: [{ text: base, param: false }] };

  const joiner = base.includes("?") ? "&" : "?";
  const parts: FinalUrlPart[] = [{ text: base + joiner, param: false }];
  pairs.forEach((pair, i) => {
    if (i > 0) parts.push({ text: "&", param: false });
    parts.push({ text: pair, param: true });
  });
  return { url: parts.map((p) => p.text).join(""), parts };
}

export function isValidDestination(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** Slugs are lowercase, URL-safe and short enough to read out on a podcast. */
export const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,48}[a-z0-9])?$/;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

/** Split a comma-separated template list ("meta, tiktok, pinterest") into allowed values. */
export function allowedSources(template: UtmTemplate): string[] {
  return template.sources.flatMap((s) => s.split(",")).map((s) => s.trim()).filter(Boolean);
}

function sourceMatches(allowed: string, value: string): boolean {
  const token = allowed.indexOf("{");
  if (token === -1) return allowed === value;
  const prefix = allowed.slice(0, token);
  return value.startsWith(prefix) && value.length > prefix.length;
}

/**
 * Compile a campaign pattern such as `{season}_{product}_{year}` or `{brand|nonbrand}_{theme}`
 * into a regular expression. Free tokens match one or more `[a-z0-9]` characters; alternations
 * match exactly one of their literals.
 */
export function campaignPatternToRegExp(pattern: string): RegExp {
  const source = pattern.replace(/\{([^}]+)\}|([^{]+)/g, (_, token: string | undefined, literal: string | undefined) => {
    if (literal) return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (token?.includes("|")) return `(?:${token.split("|").join("|")})`;
    return "[a-z0-9]+";
  });
  return new RegExp(`^${source}$`);
}

export type UtmIssue = { field: UtmKey; message: string };

/** Check a set of UTMs against a naming template. Optional templates only warn; required ones block publishing. */
export function validateAgainstTemplate(template: UtmTemplate, utm: UtmParams): UtmIssue[] {
  const issues: UtmIssue[] = [];
  const source = utm.utm_source ?? "";
  const medium = utm.utm_medium ?? "";
  const campaign = utm.utm_campaign ?? "";

  if (!allowedSources(template).some((allowed) => sourceMatches(allowed, source))) {
    issues.push({ field: "utm_source", message: `Use one of: ${allowedSources(template).join(", ")}` });
  }
  if (medium !== template.medium) {
    issues.push({ field: "utm_medium", message: `Medium must be ${template.medium}` });
  }
  if (!campaignPatternToRegExp(template.campaignPattern).test(campaign)) {
    issues.push({ field: "utm_campaign", message: `Follow the pattern ${template.campaignPattern}` });
  }
  for (const key of UTM_KEYS) {
    const value = utm[key];
    if (value && value !== value.toLowerCase()) {
      issues.push({ field: key, message: "Lowercase only" });
    }
  }
  return issues;
}
