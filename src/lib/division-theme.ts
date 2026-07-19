import type { Division } from "@/types";

interface DivisionThemeStyle {
  ring: string;
  glow: string;
  badge: string;
  chip: string;
  gradient: string;
  accentText: string;
}

/**
 * Palet visual per warna divisi, dipakai khusus untuk halaman detail
 * /divisions -- lebih kaya dari yang dipakai kartu preview di Home,
 * karena di sini logo & elemen visual jauh lebih besar.
 */
export const divisionTheme: Record<Division["color"], DivisionThemeStyle> = {
  primary: {
    ring: "border-primary/40",
    glow: "bg-primary/20",
    badge: "border-primary/30 bg-primary/10 text-primary",
    chip: "border-primary/25 bg-primary/10 text-primary",
    gradient: "from-primary to-blue",
    accentText: "text-primary",
  },
  accent: {
    ring: "border-accent/40",
    glow: "bg-accent/20",
    badge: "border-accent/30 bg-accent/10 text-accent",
    chip: "border-accent/25 bg-accent/10 text-accent",
    gradient: "from-accent to-primary",
    accentText: "text-accent",
  },
  blue: {
    ring: "border-blue/40",
    glow: "bg-blue/20",
    badge: "border-blue/30 bg-blue/10 text-blue",
    chip: "border-blue/25 bg-blue/10 text-blue",
    gradient: "from-blue to-accent",
    accentText: "text-blue",
  },
};
