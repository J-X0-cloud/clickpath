import type { DeliveryLogEntry } from "@/types/conversions";
import { DESTINATIONS, STATUS_CLASS } from "@/lib/data/destinations";

export function DeliveryLog({ entries }: { entries: readonly DeliveryLogEntry[] }) {
  return (
    <div className="tbox">
      <table className="tbl">
        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th className="num">Value</th>
            <th>Click ID</th>
            <th>Destination</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.time}-${entry.clickId}-${entry.destination}`}>
              <td className="mono muted">{entry.time}</td>
              <td>
                <b>{entry.event}</b>
              </td>
              <td className="num">{entry.value ?? "—"}</td>
              <td className="mono">{entry.clickId}</td>
              <td>{DESTINATIONS[entry.destination].short}</td>
              <td>
                <span className={`st ${STATUS_CLASS[entry.status]}`}>{entry.detail}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
