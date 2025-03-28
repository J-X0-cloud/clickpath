import Link from "next/link";
import { FOOTER_COLUMNS, type NavLink } from "@/lib/data/site";
import { Logo } from "@/components/ui/Logo";

function FooterLink({ link }: { link: NavLink }) {
  return link.href.startsWith("/") ? <Link href={link.href}>{link.label}</Link> : <a href={link.href}>{link.label}</a>;
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="cols">
          <div>
            <Logo />
            <p className="muted blurb">
              Branded links, full-funnel attribution and server-side conversions for teams that buy traffic.
            </p>
            <p className="status-line">
              <a className="sys" href="#">
                All systems normal
              </a>
            </p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h5>{column.title}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bot">
          <span>&copy; 2026 Clickpath, Inc. All rights reserved.</span>
          <span>Ad platform names are trademarks of their respective owners.</span>
        </div>
      </div>
    </footer>
  );
}
