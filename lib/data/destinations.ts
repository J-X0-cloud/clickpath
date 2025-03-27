import type { DeliveryStatus, Destination, DestinationId } from "@/types/conversions";

export const DESTINATIONS: Record<DestinationId, Destination> = {
  meta: { id: "meta", label: "Meta Conversions API", short: "Meta CAPI" },
  google_ads: { id: "google_ads", label: "Google Ads conversions", short: "Google Ads" },
  tiktok: { id: "tiktok", label: "TikTok Events API", short: "TikTok" },
  webhook: { id: "webhook", label: "Webhooks & warehouse", short: "Webhook" },
};

/** Status pill class for a delivery outcome. */
export const STATUS_CLASS: Record<DeliveryStatus, string> = {
  delivered: "st-ok",
  retrying: "st-wait",
  failed: "st-err",
};
