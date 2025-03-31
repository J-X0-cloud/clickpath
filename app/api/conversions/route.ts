import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { trackConversion, trackConversionSchema } from "@/lib/conversions";

/**
 * POST /api/conversions: server-side Conversion API.
 *
 * Accepts a lead or sale tied to a click ID, dedupes on `eventId`, attributes it to the
 * link that earned it and queues delivery to Meta, Google Ads, TikTok and webhooks.
 * Always 202: delivery happens asynchronously and is visible in the delivery log.
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Missing or invalid API key" }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = trackConversionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event", issues: parsed.error.issues }, { status: 422 });
  }

  const { conversion, duplicate } = await trackConversion(parsed.data);

  return NextResponse.json(
    {
      eventId: conversion.eventId,
      duplicate,
      attributedTo: conversion.link ? { link: conversion.link, source: conversion.source } : null,
      deliveries: conversion.deliveries,
    },
    { status: 202 },
  );
}
