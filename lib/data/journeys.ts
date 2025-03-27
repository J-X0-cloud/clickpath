import type { AttributedConversion } from "@/lib/attribution";

const at = (day: number, hour = 12) => new Date(Date.UTC(2026, 8, day, hour));

/**
 * Sample of multi-touch journeys from the demo workspace (September 2026), used by the
 * model-comparison report in the sandbox. Values are in cents.
 */
export const SAMPLE_JOURNEYS: readonly AttributedConversion[] = [
  {
    value: 26_400,
    convertedAt: at(9),
    touches: [
      { link: "go.halcyon.co/tt-ugc", source: "TikTok", campaign: "UGC set B", clickedAt: at(3) },
      { link: "go.halcyon.co/spring", source: "Meta", campaign: "Retargeting 7d", clickedAt: at(6) },
    ],
  },
  {
    value: 14_800,
    convertedAt: at(21),
    touches: [
      { link: "go.halcyon.co/news-0918", source: "Newsletter", clickedAt: at(18) },
      { link: "go.halcyon.co/brand", source: "Google Ads", campaign: "Brand", clickedAt: at(21, 9) },
    ],
  },
  {
    value: 6_400,
    convertedAt: at(14),
    touches: [{ link: "go.halcyon.co/tt-ugc", source: "TikTok", campaign: "UGC set B", clickedAt: at(14, 8) }],
  },
  {
    value: 21_200,
    convertedAt: at(17),
    touches: [
      { link: "go.halcyon.co/podcast", source: "Podcasts", clickedAt: at(2) },
      { link: "go.halcyon.co/spring", source: "Meta", campaign: "Prospecting", clickedAt: at(10) },
      { link: "go.halcyon.co/brand", source: "Google Ads", campaign: "Brand", clickedAt: at(16) },
    ],
  },
];
