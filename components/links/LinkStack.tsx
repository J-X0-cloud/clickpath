import { LINK_PREVIEWS } from "@/lib/data/links";
import { Icon } from "@/components/ui/Icon";
import { StatusPill } from "@/components/ui/StatusPill";

/** Staggered stack of short links with their destinations and click counts. */
export function LinkStack() {
  const last = LINK_PREVIEWS.length - 1;
  return (
    <div className="links">
      {LINK_PREVIEWS.map((link, i) => (
        <div className="link" key={link.shortUrl} style={{ marginLeft: i * 14, marginRight: (last - i) * 14 }}>
          <span className="fav" style={{ background: link.color }}>
            <Icon name="link" />
          </span>
          <div className="meta">
            <b>
              {link.shortUrl}
              {link.badge && (
                <>
                  {" "}
                  <StatusPill tone="ok">{link.badge}</StatusPill>
                </>
              )}
            </b>
            <small>↳ {link.destination}</small>
          </div>
          <span className="cnt">
            <Icon name="chart" /> {link.clicks} clicks
          </span>
        </div>
      ))}
    </div>
  );
}
