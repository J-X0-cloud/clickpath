import type { CSSProperties } from "react";
import { ROUTING_EXAMPLE } from "@/lib/data/links";
import { Chip } from "@/components/ui/Chip";

/** Rules on one link, with each rule's share of traffic. Bars are relative to the busiest rule. */
export function RoutingRules() {
  const { link, rules } = ROUTING_EXAMPLE;
  const peak = Math.max(...rules.map((r) => r.share));

  return (
    <div className="card pad rules">
      <div className="rules-h">
        <b>{link}</b>
        <Chip>{rules.length} rules</Chip>
      </div>
      <div className="bars">
        {rules.map((rule) => (
          <div
            key={rule.destination}
            className="bar"
            style={
              {
                "--w": `${Math.round((rule.share / peak) * 100)}%`,
                "--bc": rule.fallback ? "#E4F3EC" : "#E9E8E1",
              } as CSSProperties
            }
          >
            <span>
              {rule.condition} {rule.match && <b>{rule.match}</b>} → {rule.destination}
            </span>
            <b>{rule.share}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}
