import { timingSafeEqual } from "node:crypto";

/**
 * Validates `Authorization: Bearer <key>` against the workspace secret key.
 * Keys are compared in constant time.
 */
export function isAuthorized(request: Request, env: NodeJS.ProcessEnv = process.env): boolean {
  const expected = env.CLICKPATH_SECRET_KEY;
  if (!expected) return false;
  const [scheme, key] = (request.headers.get("authorization") ?? "").split(" ");
  if (scheme !== "Bearer" || !key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
