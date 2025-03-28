import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, centered = false, children }: SectionHeadingProps) {
  return (
    <div className={centered ? "sec-h center" : "sec-h"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {children && <p className="lede">{children}</p>}
    </div>
  );
}
