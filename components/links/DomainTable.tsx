import { BRANDED_DOMAINS, PENDING_DNS_RECORD } from "@/lib/data/links";
import { formatCount } from "@/lib/format";
import { Favicon } from "@/components/ui/Favicon";
import { StatusPill } from "@/components/ui/StatusPill";

/** Connected domains with verification status, plus the DNS record for the pending one. */
export function DomainTable() {
  return (
    <div className="tbox">
      <table className="tbl">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Status</th>
            <th className="num">Links</th>
            <th className="num">Clicks (30d)</th>
          </tr>
        </thead>
        <tbody>
          {BRANDED_DOMAINS.map((domain) => (
            <tr key={domain.host}>
              <td>
                <div className="lk">
                  <Favicon color={domain.color}>{domain.host.charAt(0).toUpperCase()}</Favicon>
                  <div>
                    <b>{domain.host}</b>
                    <small>{domain.note}</small>
                  </div>
                </div>
              </td>
              <td>
                {domain.status === "verified" ? (
                  <StatusPill tone="ok">Verified</StatusPill>
                ) : (
                  <StatusPill tone="wait">Pending DNS</StatusPill>
                )}
              </td>
              <td className="num">{domain.links}</td>
              <td className="num">{domain.clicks30d === null ? "—" : formatCount(domain.clicks30d)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dns-rec">
        <table className="tbl">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Value</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">{PENDING_DNS_RECORD.type}</td>
              <td className="mono">{PENDING_DNS_RECORD.name}</td>
              <td className="mono">{PENDING_DNS_RECORD.value}</td>
              <td className="mono">{PENDING_DNS_RECORD.ttl}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
