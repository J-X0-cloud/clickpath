import { createHash } from "node:crypto";

/**
 * Ad platforms match conversions on hashed identifiers. They all expect SHA-256 over a
 * normalised value, so normalisation has to be identical everywhere or match rates drop.
 */
export function normalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  const [local = "", domain = ""] = trimmed.split("@");
  // Gmail ignores dots and +tags; Meta and Google both recommend stripping them.
  if (domain === "gmail.com" || domain === "googlemail.com") {
    return `${local.split("+")[0]!.replace(/\./g, "")}@gmail.com`;
  }
  return trimmed;
}

/** E.164 digits only, no leading +. Assumes US numbers when no country code is present. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export function hashIdentifiers(customer: { email?: string; phone?: string }) {
  return {
    em: customer.email ? sha256(normalizeEmail(customer.email)) : undefined,
    ph: customer.phone ? sha256(normalizePhone(customer.phone)) : undefined,
  };
}
