import type { FeatureTile } from "@/types/analytics";
import { Icon } from "@/components/ui/Icon";

interface FeatureGridProps {
  items: readonly FeatureTile[];
  /** "grid4" is the bordered 4-up grid; "cards" is the 3-up card row. */
  layout?: "grid4" | "cards";
  onPaper?: boolean;
}

export function FeatureGrid({ items, layout = "grid4", onPaper = false }: FeatureGridProps) {
  if (layout === "cards") {
    return (
      <div className="grid3">
        {items.map((item) => (
          <div className="card pad" key={item.title}>
            <span className="gi">
              <Icon name={item.icon} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={onPaper ? "grid4 on-paper" : "grid4"}>
      {items.map((item) => (
        <div key={item.title}>
          <span className="gi">
            <Icon name={item.icon} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
