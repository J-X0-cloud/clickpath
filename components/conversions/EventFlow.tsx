import type { IconName } from "@/components/ui/icons";
import { DESTINATIONS } from "@/lib/data/destinations";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";

const SOURCES: readonly { icon: IconName; label: string }[] = [
  { icon: "code", label: "Backend SDK" },
  { icon: "cart", label: "Shopify orders" },
  { icon: "refresh", label: "Stripe payments" },
  { icon: "hook", label: "Form webhooks" },
];

const OUTPUTS = [
  { destination: DESTINATIONS.meta, live: true },
  { destination: DESTINATIONS.google_ads, live: true },
  { destination: DESTINATIONS.tiktok, live: true },
  { destination: DESTINATIONS.webhook, live: false },
];

/** Your stack → Clickpath → ad platforms. */
export function EventFlow() {
  return (
    <div className="flow">
      <div className="fnode">
        <h4>Your stack</h4>
        {SOURCES.map((s) => (
          <div className="it" key={s.label}>
            <Icon name={s.icon} />
            {s.label}
          </div>
        ))}
      </div>
      <div className="arrow" aria-hidden="true" />
      <div className="fnode core">
        <LogoMark />
        <h4>Clickpath</h4>
        <b>Match · hash · dedupe</b>
        <p>Joins each event to its click ID, hashes PII with SHA-256, and fans out per destination.</p>
      </div>
      <div className="arrow" aria-hidden="true" />
      <div className="fnode">
        <h4>Destinations</h4>
        {OUTPUTS.map(({ destination, live }) => (
          <div className="it" key={destination.id}>
            <span className={live ? "st st-ok" : "st st-n"} />
            {destination.label}
          </div>
        ))}
      </div>
    </div>
  );
}
