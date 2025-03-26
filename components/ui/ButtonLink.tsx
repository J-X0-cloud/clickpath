import type { ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "p" | "g" | "m" | "o";

interface ButtonLinkProps {
  href: string;
  /** p = ink primary, g = ghost, m = mint (on dark), o = outline (on dark). */
  variant?: ButtonVariant;
  small?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "p", small = false, className, children }: ButtonLinkProps) {
  const classes = ["btn", `btn-${variant}`, small && "btn-sm", className].filter(Boolean).join(" ");
  if (href.startsWith("/")) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}
