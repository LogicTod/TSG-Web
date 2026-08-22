import type { SiteSettings } from "@/types";
import { Mail, MessageCircle, MapPin } from "lucide-react";

interface FooterContactProps {
  settings: SiteSettings;
}

export function FooterContact({ settings }: FooterContactProps) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">
        Kontak
      </h4>
      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-2.5 text-sm text-slate-500">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {settings.address}
        </li>
        <li>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            {settings.contactEmail}
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
            {settings.whatsappNumber}
          </a>
        </li>
      </ul>
    </div>
  );
}
