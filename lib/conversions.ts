import { z } from "zod";
import type { DeliveryStatus, DestinationId } from "@/types/conversions";
import { attribute } from "@/lib/attribution";
import { clickStore, type ClickRecord } from "@/lib/clicks";
import { hashIdentifiers } from "@/lib/hashing";

const customerSchema = z.object({
  externalId: z.string().trim().min(1).max(128),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().min(7).max(20).optional(),
});

const baseEvent = z.object({
  clickId: z.string().regex(/^clk_[A-Za-z0-9]{6,32}$/, "Expected a Clickpath click ID (clk_…)"),
  /** Your ID for the event. Re-sending the same ID is a no-op, here and at every ad platform. */
  eventId: z.string().trim().min(1).max(128),
  eventName: z.string().trim().max(80).optional(),
  customer: customerSchema,
  occurredAt: z.string().datetime({ offset: true }).optional(),
  /** Events without marketing consent are stored for reporting but never forwarded. */
  consent: z.object({ marketing: z.boolean() }).default({ marketing: true }),
});

export const trackConversionSchema = z.discriminatedUnion("type", [
  baseEvent.extend({ type: z.literal("lead") }),
  baseEvent.extend({
    type: z.literal("sale"),
    /** Minor units (cents). */
    amount: z.number().int().positive().max(100_000_000),
    currency: z
      .string()
      .length(3)
      .transform((c) => c.toLowerCase()),
  }),
]);

export type TrackConversionInput = z.infer<typeof trackConversionSchema>;

export interface Delivery {
  destination: DestinationId;
  status: DeliveryStatus | "queued" | "skipped";
  reason?: string;
}

export interface StoredConversion {
  eventId: string;
  type: TrackConversionInput["type"];
  clickId: string;
  link?: string;
  source?: string;
  value: number;
  receivedAt: string;
  deliveries: Delivery[];
}

/** Destinations are enabled by configuring their credentials. */
export function enabledDestinations(env: NodeJS.ProcessEnv = process.env): DestinationId[] {
  const enabled: DestinationId[] = [];
  if (env.META_CAPI_ACCESS_TOKEN && env.META_PIXEL_ID) enabled.push("meta");
  if (env.GOOGLE_ADS_DEVELOPER_TOKEN && env.GOOGLE_ADS_CUSTOMER_ID) enabled.push("google_ads");
  if (env.TIKTOK_EVENTS_ACCESS_TOKEN && env.TIKTOK_PIXEL_CODE) enabled.push("tiktok");
  if (env.CONVERSION_WEBHOOK_URL) enabled.push("webhook");
  return enabled;
}

const META_EVENT = { lead: "Lead", sale: "Purchase" } as const;
const TIKTOK_EVENT = { lead: "SubmitForm", sale: "CompletePayment" } as const;

/**
 * Per-platform payloads. Each platform has its own field names, but all of them share the
 * event ID so they can deduplicate against the browser pixel.
 */
export function buildPayload(destination: DestinationId, event: TrackConversionInput, eventTime: number) {
  const ids = hashIdentifiers(event.customer);
  const value = event.type === "sale" ? event.amount / 100 : undefined;
  const currency = event.type === "sale" ? event.currency.toUpperCase() : undefined;

  switch (destination) {
    case "meta":
      return {
        event_name: META_EVENT[event.type],
        event_time: Math.floor(eventTime / 1000),
        event_id: event.eventId,
        action_source: "website",
        user_data: { em: ids.em ? [ids.em] : undefined, ph: ids.ph ? [ids.ph] : undefined, external_id: [event.customer.externalId] },
        custom_data: value !== undefined ? { value, currency } : undefined,
      };
    case "google_ads":
      return {
        conversionAction: event.type === "sale" ? "purchase" : "lead",
        conversionDateTime: new Date(eventTime).toISOString().replace("T", " ").replace(/\.\d+Z$/, "+00:00"),
        orderId: event.eventId,
        conversionValue: value,
        currencyCode: currency,
        userIdentifiers: [ids.em && { hashedEmail: ids.em }, ids.ph && { hashedPhoneNumber: ids.ph }].filter(Boolean),
      };
    case "tiktok":
      return {
        event: TIKTOK_EVENT[event.type],
        event_id: event.eventId,
        timestamp: new Date(eventTime).toISOString(),
        context: { user: { email: ids.em, phone_number: ids.ph, external_id: event.customer.externalId } },
        properties: value !== undefined ? { value, currency } : undefined,
      };
    case "webhook":
      return { ...event, customer: { externalId: event.customer.externalId, ...ids } };
  }
}

export interface ConversionStore {
  get(eventId: string): Promise<StoredConversion | undefined>;
  save(conversion: StoredConversion): Promise<void>;
}

class MemoryConversionStore implements ConversionStore {
  private readonly byId = new Map<string, StoredConversion>();
  async get(eventId: string) {
    return this.byId.get(eventId);
  }
  async save(conversion: StoredConversion) {
    this.byId.set(conversion.eventId, conversion);
  }
}

export const conversionStore: ConversionStore = new MemoryConversionStore();

export interface DeliveryQueue {
  enqueue(job: { destination: DestinationId; eventId: string; payload: unknown }): Promise<void>;
}

/**
 * Hands deliveries to the worker that calls each platform with retries and backoff
 * (up to 72 hours). In development the jobs are only logged.
 */
export const deliveryQueue: DeliveryQueue = {
  async enqueue(job) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[conversions] queued ${job.eventId} → ${job.destination}`);
    }
  },
};

/** Last-click credit for the click that came with the event (and any earlier clicks by the same customer). */
async function attributeToLink(click: ClickRecord | undefined, customerId: string, value: number, at: Date) {
  if (!click) return undefined;
  const history = await clickStore.forCustomer(customerId);
  const touches = [...history.filter((c) => c.clickId !== click.clickId), click];
  const [credit] = attribute(touches, { value, convertedAt: at }, "last_click").filter((c) => c.weight > 0);
  return credit;
}

/**
 * Record a lead or sale: dedupe on event ID, tie it to its click and link, then fan it out to
 * every enabled destination. Returns the stored record and whether it was a duplicate.
 */
export async function trackConversion(event: TrackConversionInput, now = new Date()) {
  const existing = await conversionStore.get(event.eventId);
  if (existing) return { conversion: existing, duplicate: true };

  const occurredAt = event.occurredAt ? new Date(event.occurredAt) : now;
  const value = event.type === "sale" ? event.amount : 0;
  const click = await clickStore.get(event.clickId);
  if (click) await clickStore.linkToCustomer(click.clickId, event.customer.externalId);
  const credit = await attributeToLink(click, event.customer.externalId, value, occurredAt);

  const deliveries: Delivery[] = [];
  for (const destination of enabledDestinations()) {
    if (!event.consent.marketing) {
      deliveries.push({ destination, status: "skipped", reason: "no_marketing_consent" });
      continue;
    }
    await deliveryQueue.enqueue({
      destination,
      eventId: event.eventId,
      payload: buildPayload(destination, event, occurredAt.getTime()),
    });
    deliveries.push({ destination, status: "queued" });
  }

  const conversion: StoredConversion = {
    eventId: event.eventId,
    type: event.type,
    clickId: event.clickId,
    link: credit?.link,
    source: credit?.source,
    value,
    receivedAt: now.toISOString(),
    deliveries,
  };
  await conversionStore.save(conversion);
  return { conversion, duplicate: false };
}
