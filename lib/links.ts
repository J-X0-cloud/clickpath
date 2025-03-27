import { z } from "zod";
import type { ShortLink, UtmParams } from "@/types/links";
import { UTM_TEMPLATES, WORKSPACE_DOMAINS } from "@/lib/data/links";
import { SLUG_PATTERN, buildFinalUrl, isValidDestination, validateAgainstTemplate, type UtmIssue } from "@/lib/utm";

const utmValue = z
  .string()
  .trim()
  .max(120)
  .regex(/^[a-z0-9_.]+$/, "Lowercase letters, numbers, underscores and dots only")
  .optional();

export const createLinkSchema = z.object({
  domain: z.enum(WORKSPACE_DOMAINS),
  slug: z.string().regex(SLUG_PATTERN, "Use 1–50 lowercase letters, numbers or dashes"),
  destination: z.string().trim().url().refine(isValidDestination, "Destination must be an http(s) URL"),
  utm: z
    .object({
      utm_source: utmValue,
      utm_medium: utmValue,
      utm_campaign: utmValue,
      utm_content: utmValue,
      utm_term: utmValue,
    })
    .default({}),
  templateId: z.string().optional(),
  tracking: z.boolean().default(true),
  deviceRouting: z.boolean().default(false),
  expireAfterCampaign: z.boolean().default(false),
  password: z.boolean().default(false),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export class LinkConflictError extends Error {
  constructor(public readonly shortUrl: string) {
    super(`${shortUrl} is already taken`);
  }
}

export class TemplateViolationError extends Error {
  constructor(public readonly issues: UtmIssue[]) {
    super("Link does not follow the naming template");
  }
}

export interface LinkRepository {
  findBySlug(domain: string, slug: string): Promise<ShortLink | undefined>;
  insert(link: ShortLink): Promise<void>;
  list(filter?: { domain?: string }): Promise<ShortLink[]>;
}

/** Process-local repository. Deployments back this with Postgres; the interface is unchanged. */
class MemoryLinkRepository implements LinkRepository {
  private readonly links = new Map<string, ShortLink>();

  async findBySlug(domain: string, slug: string) {
    return this.links.get(`${domain}/${slug}`);
  }

  async insert(link: ShortLink) {
    this.links.set(`${link.domain}/${link.slug}`, link);
  }

  async list(filter: { domain?: string } = {}) {
    return [...this.links.values()]
      .filter((l) => !filter.domain || l.domain === filter.domain)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

export const linkRepository: LinkRepository = new MemoryLinkRepository();

export const shortUrlOf = (link: Pick<ShortLink, "domain" | "slug">) => `https://${link.domain}/${link.slug}`;

/**
 * Create a short link. Required naming templates are enforced here as well as in the builder,
 * so links created over the API follow the same rules as links created in the app.
 */
export async function createLink(input: CreateLinkInput, repo: LinkRepository = linkRepository) {
  const template = UTM_TEMPLATES.find((t) => t.id === input.templateId);
  const utm: UtmParams = Object.fromEntries(Object.entries(input.utm).filter(([, v]) => Boolean(v)));

  if (template?.enforcement === "Required") {
    const issues = validateAgainstTemplate(template, utm);
    if (issues.length > 0) throw new TemplateViolationError(issues);
  }

  if (await repo.findBySlug(input.domain, input.slug)) {
    throw new LinkConflictError(shortUrlOf(input));
  }

  const link: ShortLink = {
    id: `lnk_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`,
    domain: input.domain,
    slug: input.slug,
    destination: input.destination,
    utm,
    templateId: template?.id,
    tracking: input.tracking,
    deviceRouting: input.deviceRouting,
    passwordProtected: input.password,
    createdAt: new Date().toISOString(),
  };
  await repo.insert(link);

  return { link, shortUrl: shortUrlOf(link), finalUrl: buildFinalUrl(link.destination, link.utm).url };
}
