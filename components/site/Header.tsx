import Link from "next/link";
import { CONTACT_MAILTO, MAIN_NAV } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <Logo />
        <nav className="nav" aria-label="Primary">
          <NavLinks />
        </nav>
        <div className="hcta">
          <a className="login" href="#">
            Log in
          </a>
          <ButtonLink href={CONTACT_MAILTO} variant="g" small>
            Book a demo
          </ButtonLink>
          <ButtonLink href="/pricing" small>
            Start free
          </ButtonLink>
        </div>
        <details className="mnav">
          <summary aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="panel">
            <Link href="/">Overview</Link>
            {MAIN_NAV.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <a href="#">Log in</a>
            <ButtonLink href="/pricing">Start free</ButtonLink>
          </div>
        </details>
      </div>
    </header>
  );
}
