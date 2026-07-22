import { cn } from "@/lib/utils";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  /**
   * Arah munculnya bubble. Default "top" (di atas ikon). Pakai "bottom"
   * untuk ikon yang duduk mepet ke tepi ATAS kontainer (misal badge di
   * pojok kartu) supaya bubble-nya tidak kepotong batas kartu.
   */
  position?: "top" | "bottom";
}

/**
 * Tooltip hover -- sengaja pakai CSS murni (group-hover), BUKAN JS
 * state/onMouseEnter. Ini pola yang sama seperti glow-hover di
 * DivisionCard yang sudah terbukti jalan mulus di seluruh situs ini.
 *
 * Nama grup dibuat unik ("group/tooltip") supaya tidak bentrok dengan
 * class "group" lain yang mungkin sudah dipakai elemen pembungkusnya.
 */
export function Tooltip({ label, children, position = "top" }: TooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3.5 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover/tooltip:opacity-100",
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        )}
      >
        {label}
      </span>
    </span>
  );
}
