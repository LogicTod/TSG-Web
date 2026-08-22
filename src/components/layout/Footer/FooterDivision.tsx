import Link from "next/link";
import type { Division } from "@/types";

interface FooterDivisionProps {
  divisions: Division[];
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function FooterDivision({ divisions, handleLinkClick }: FooterDivisionProps) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">
        Divisi
      </h4>
      <ul className="mt-4 space-y-2.5">
        {divisions.map((division) => (
          <li key={division.id}>
            <Link
              href={`/divisions#${division.slug}`}
              onClick={(e) => handleLinkClick(e, `/divisions#${division.slug}`)}
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
            >
              {division.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
