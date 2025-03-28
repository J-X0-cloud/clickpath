import type { LinkPerformance } from "@/types/analytics";
import { formatCount, formatRevenue } from "@/lib/format";
import { Chip } from "@/components/ui/Chip";
import { Favicon } from "@/components/ui/Favicon";

export function LinkTable({ links }: { links: readonly LinkPerformance[] }) {
  return (
    <div className="tbox mt">
      <table className="tbl">
        <thead>
          <tr>
            <th>Link</th>
            <th className="hide-sm">Source</th>
            <th className="num">Clicks</th>
            <th className="num hide-sm">Leads</th>
            <th className="num hide-sm">Sales</th>
            <th className="num">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.shortUrl}>
              <td>
                <div className="lk">
                  <Favicon color={link.color}>{link.initials}</Favicon>
                  <div>
                    <b>{link.shortUrl}</b>
                    <small>{link.destination}</small>
                  </div>
                </div>
              </td>
              <td className="hide-sm">
                <Chip>{link.source}</Chip>
              </td>
              <td className="num">{formatCount(link.clicks)}</td>
              <td className="num hide-sm">{formatCount(link.leads)}</td>
              <td className="num hide-sm">{formatCount(link.sales)}</td>
              <td className="num">
                <b>{formatRevenue(link.revenue)}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
