import type { CheckItem } from "@/lib/data/content";
import { CheckIcon } from "@/components/ui/Icon";

/** Feature checklist with a bold lead-in on each line. */
export function CheckList({ items }: { items: readonly CheckItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.strong}>
          <CheckIcon />
          <span>
            <b>{item.strong}</b>
            {item.text.startsWith(",") ? "" : " "}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
