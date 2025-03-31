import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { compareModels, creditBySource, MODEL_LABELS, type AttributionModel } from "@/lib/attribution";
import { SAMPLE_JOURNEYS } from "@/lib/data/journeys";

const querySchema = z.object({
  model: z.enum(Object.keys(MODEL_LABELS) as [AttributionModel, ...AttributionModel[]]).optional(),
  lookbackDays: z.coerce.number().int().min(1).max(90).default(30),
  halfLifeDays: z.coerce.number().min(0.5).max(30).default(7),
});

/**
 * GET /api/reports/attribution?model=linear
 * Revenue credited per source. Without `model`, every model is returned side by side.
 */
export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { model, ...options } = parsed.data;

  if (model) {
    return NextResponse.json({ model, label: MODEL_LABELS[model], bySource: creditBySource(SAMPLE_JOURNEYS, model, options) });
  }
  return NextResponse.json({ models: compareModels(SAMPLE_JOURNEYS, options) });
}
