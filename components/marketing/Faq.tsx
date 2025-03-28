import type { FaqItem } from "@/lib/data/faq";

/** Accordion built on <details>; the first item starts open. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.question} open={i === 0}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
