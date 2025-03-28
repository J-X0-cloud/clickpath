import { UTM_TEMPLATES } from "@/lib/data/links";
import { StatusPill } from "@/components/ui/StatusPill";

export function UtmTemplateTable() {
  return (
    <div className="tbox">
      <table className="tbl">
        <thead>
          <tr>
            <th>Template</th>
            <th>utm_source</th>
            <th>utm_medium</th>
            <th>utm_campaign pattern</th>
            <th>Enforcement</th>
          </tr>
        </thead>
        <tbody>
          {UTM_TEMPLATES.map((t) => (
            <tr key={t.id}>
              <td>
                <b>{t.name}</b>
              </td>
              <td className="mono">{t.sources.join(", ")}</td>
              <td className="mono">{t.medium}</td>
              <td className="mono">{t.campaignPattern}</td>
              <td>
                <StatusPill tone={t.enforcement === "Required" ? "ok" : "n"}>{t.enforcement}</StatusPill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
