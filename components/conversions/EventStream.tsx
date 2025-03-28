import type { ConversionEventSummary } from "@/types/conversions";
import { DESTINATIONS, STATUS_CLASS } from "@/lib/data/destinations";

const TYPE_BADGE = {
  sale: { glyph: "$", color: "#E2553A" },
  lead: { glyph: "L", color: "#EFA12A" },
} as const;

/** Live feed of tracked conversions and where each one was delivered. */
export function EventStream({ events }: { events: readonly ConversionEventSummary[] }) {
  return (
    <div className="ev">
      {events.map((event) => {
        const badge = TYPE_BADGE[event.type];
        return (
          <div className="evr" key={event.id}>
            <span className="ic" style={{ background: badge.color }}>
              {badge.glyph}
            </span>
            <div className="body">
              <b>{event.title}</b>
              <small>
                {event.id} · {event.clickId} · {event.shortUrl}
              </small>
            </div>
            <div className="dest">
              {event.deliveries.map((d) => (
                <span key={d.destination} className={`st ${STATUS_CLASS[d.status]}`}>
                  {DESTINATIONS[d.destination].short}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
