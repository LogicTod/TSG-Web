"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Division } from "@/types";
import { cn } from "@/lib/utils";
import { iconMap } from "@/lib/icon-map";

interface DivisionCardProps {
  division: Division;
  index: number;
}

const colorVariants = {
  primary: {
    iconBg: "bg-primary/15 text-primary",
    border: "group-hover:border-primary/40",
    glowBg: "bg-primary/10",
    chip: "border-primary/20 text-primary",
  },
  accent: {
    iconBg: "bg-accent/15 text-accent",
    border: "group-hover:border-accent/40",
    glowBg: "bg-accent/10",
    chip: "border-accent/20 text-accent",
  },
  blue: {
    iconBg: "bg-blue/15 text-blue",
    border: "group-hover:border-blue/40",
    glowBg: "bg-blue/10",
    chip: "border-blue/20 text-blue",
  },
} as const;

export function DivisionCard({ division, index }: DivisionCardProps) {
  const colors = colorVariants[division.color];
  const Icon = iconMap[division.icon] ?? iconMap.Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      // Spring tuned high-stiffness/low-damping so the lift reacts
      // immediately on hover instead of feeling delayed.
      whileTap={{ y: -2 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group h-full"
    >
      <motion.div
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "glass relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] p-6 transition-colors duration-200",
          colors.border
        )}
      >
        {/* Cheap opacity-only glow layer — GPU-compositable, no repaint lag */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-200 ease-out group-hover:opacity-100",
            colors.glowBg
          )}
        />

        <div className="relative mx-auto mb-5 h-[72px] w-[72px]">
          {/* Continuous pulsing glow behind the icon/logo box */}
          <motion.span
            className={cn("absolute inset-0 rounded-2xl blur-md", colors.glowBg)}
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />

          <span
            className={cn(
              "relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl transition-transform duration-200 ease-out group-hover:scale-110",
              colors.iconBg,
              division.logoUrl && "p-3"
            )}
          >
            {division.logoUrl ? (
              <Image
                src={division.logoUrl}
                alt={`Logo ${division.name}`}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            ) : (
              <Icon className="h-8 w-8" />
            )}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-white">
          {division.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-400">
          {division.tagline}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">
          {division.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {division.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                colors.chip
              )}
            >
              {skill}
            </span>
          ))}
          {division.skills.length > 4 && (
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-500">
              +{division.skills.length - 4} lainnya
            </span>
          )}
        </div>

        <Link
          href={`/divisions#${division.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors duration-200 group-hover:text-accent"
        >
          Selengkapnya
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
