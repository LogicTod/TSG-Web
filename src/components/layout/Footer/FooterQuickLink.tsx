import Link from "next/link";
import { navLinks } from "@/data/nav";

interface FooterQuickLinkProps {
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function FooterQuickLink({ handleLinkClick }: FooterQuickLinkProps) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">
        Quick Links
      </h4>
      <ul className="mt-4 space-y-2.5">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
