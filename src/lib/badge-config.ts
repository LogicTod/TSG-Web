import { Crown, Code2, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";
import type { TeamBadge } from "@/types";

interface BadgeConfig {
  label: string;
  icon: LucideIcon;
  ring: string;
  iconBg: string;
  glowRgb: string;
}

export const badgeConfig: Record<TeamBadge, BadgeConfig> = {
  founder: {
    label: "Founder",
    icon: Crown,
    ring: "ring-amber-400/70",
    iconBg: "bg-amber-400 text-amber-950",
    glowRgb: "251,191,36",
  },
  developer: {
    label: "Developer",
    icon: Code2,
    ring: "ring-blue-400/70",
    iconBg: "bg-blue-400 text-blue-950",
    glowRgb: "96,165,250",
  },
  mentor: {
    label: "Mentor",
    icon: GraduationCap,
    ring: "ring-emerald-400/70",
    iconBg: "bg-emerald-400 text-emerald-950",
    glowRgb: "52,211,153",
  },
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    ring: "ring-slate-300/70",
    iconBg: "bg-slate-300 text-slate-900",
    glowRgb: "203,213,225",
  },
};
