import type { SiteSettings } from "@/types";

interface FooterCopyrightProps {
  settings: SiteSettings;
  currentYear: number;
}

export function FooterCopyright({ settings, currentYear }: FooterCopyrightProps) {
  return (
    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-center sm:flex-row sm:text-left">
      <p className="text-xs text-slate-600">
        © {currentYear} {settings.name} ({settings.shortName}). All rights reserved.
      </p>
      <p className="text-xs text-slate-600">{settings.slogan}</p>
    </div>
  );
}
