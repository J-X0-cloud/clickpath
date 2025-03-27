import { RECENT_EVENTS } from "@/lib/data/conversions";
import type { Touch } from "@/lib/attribution";

/**
 * Click lookup. Every redirect through a short link stores a click with a first-party click ID
 * (`clk_…`), which the site keeps in a cookie and sends back with leads and sales.
 */
export interface ClickRecord extends Touch {
  clickId: string;
  /** Customer the click has been tied to, once they identify themselves. */
  customerId?: string;
}

export interface ClickStore {
  get(clickId: string): Promise<ClickRecord | undefined>;
  forCustomer(customerId: string): Promise<ClickRecord[]>;
  linkToCustomer(clickId: string, customerId: string): Promise<void>;
}

const SOURCE_BY_LINK: Record<string, string> = {
  "go.halcyon.co/spring": "Meta",
  "go.halcyon.co/tt-ugc": "TikTok",
  "go.halcyon.co/brand": "Google Ads",
  "go.halcyon.co/podcast": "Podcasts",
  "go.halcyon.co/news-0918": "Newsletter",
};

class MemoryClickStore implements ClickStore {
  private readonly clicks = new Map<string, ClickRecord>();

  constructor(seed: readonly ClickRecord[]) {
    for (const click of seed) this.clicks.set(click.clickId, click);
  }

  async get(clickId: string) {
    return this.clicks.get(clickId);
  }

  async forCustomer(customerId: string) {
    return [...this.clicks.values()].filter((c) => c.customerId === customerId);
  }

  async linkToCustomer(clickId: string, customerId: string) {
    const click = this.clicks.get(clickId);
    if (click) this.clicks.set(clickId, { ...click, customerId });
  }
}

// Seeded with the demo workspace's recent clicks so the sandbox API resolves them.
export const clickStore: ClickStore = new MemoryClickStore(
  RECENT_EVENTS.map((event, i) => ({
    clickId: event.clickId,
    link: event.shortUrl,
    source: SOURCE_BY_LINK[event.shortUrl] ?? "Direct",
    clickedAt: new Date(Date.UTC(2026, 8, 24, 13, 40 - i * 7)),
  })),
);
