"use client";

import { useMemo, useState } from "react";
import type { CodeSample as Sample } from "@/lib/code-samples";
import { tokenize } from "@/lib/highlight";

/** Tabbed, syntax-highlighted code sample (one tab per language). */
export function CodeSample({ samples }: { samples: readonly Sample[] }) {
  const [active, setActive] = useState(0);
  const sample = samples[active] ?? samples[0]!;
  const tokens = useMemo(() => tokenize(sample.code, sample.language), [sample]);

  return (
    <div className="code">
      <div className="tabs" role="tablist">
        {samples.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "on" : undefined}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <pre role="tabpanel">
        {tokens.map((token, i) =>
          token.kind === "plain" ? token.text : (
            <span key={i} className={token.kind}>
              {token.text}
            </span>
          ),
        )}
      </pre>
    </div>
  );
}
