export type DestinationId = "meta" | "google_ads" | "tiktok" | "webhook";
export type DeliveryStatus = "delivered" | "retrying" | "failed";
export type ConversionType = "lead" | "sale";

export interface Destination {
  id: DestinationId;
  label: string;
  /** Short label used in the event stream chips. */
  short: string;
}

export interface ConversionEventSummary {
  id: string;
  clickId: string;
  shortUrl: string;
  type: ConversionType;
  title: string;
  deliveries: readonly { destination: DestinationId; status: DeliveryStatus }[];
}

export interface DeliveryLogEntry {
  time: string;
  event: string;
  value: string | null;
  clickId: string;
  destination: DestinationId;
  status: DeliveryStatus;
  detail: string;
}
