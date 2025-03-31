import { NextResponse, type NextRequest } from "next/server";
import {
  LinkConflictError,
  TemplateViolationError,
  createLink,
  createLinkSchema,
  linkRepository,
  shortUrlOf,
} from "@/lib/links";
import { buildFinalUrl } from "@/lib/utm";

/** GET /api/links?domain=go.halcyon.co: links in the workspace, newest first. */
export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain") ?? undefined;
  const links = await linkRepository.list({ domain });
  return NextResponse.json({
    links: links.map((link) => ({
      ...link,
      shortUrl: shortUrlOf(link),
      finalUrl: buildFinalUrl(link.destination, link.utm).url,
    })),
  });
}

/**
 * POST /api/links: create a branded short link.
 * 201 on success, 409 when the slug is taken on that domain, 422 for invalid input or a
 * required naming template that isn't followed.
 */
export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = createLinkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid link", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const { link, shortUrl, finalUrl } = await createLink(parsed.data);
    return NextResponse.json({ id: link.id, shortUrl, finalUrl, link }, { status: 201 });
  } catch (error) {
    if (error instanceof LinkConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    if (error instanceof TemplateViolationError) {
      return NextResponse.json({ error: error.message, issues: error.issues }, { status: 422 });
    }
    throw error;
  }
}
