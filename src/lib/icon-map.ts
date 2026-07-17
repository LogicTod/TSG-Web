import {
  Bot,
  Cog,
  FlaskConical,
  Camera,
  Trophy,
  HeartHandshake,
  Briefcase,
  Leaf,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

/**
 * Sanity hanya bisa menyimpan teks ("Bot", "Cog", dst), bukan komponen
 * React. Map ini menerjemahkan nama ikon dari CMS jadi komponen Lucide
 * asli yang dipakai di UI. Tambahkan entri baru di sini kalau nanti ada
 * opsi ikon baru di schema Sanity.
 */
export const iconMap: Record<string, LucideIcon> = {
  Bot,
  Cog,
  FlaskConical,
  Camera,
  Trophy,
  HeartHandshake,
  Briefcase,
  Leaf,
  GraduationCap,
};
