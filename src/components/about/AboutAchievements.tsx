"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";
import { getAchievementCardStyle } from "@/lib/achievement-styles";
import type { AchievementItem } from "@/types";

interface AboutAchievementsProps {
  achievements: AchievementItem[];
}

const FILTERS = [
  { label: "Semua", value: "all" as const },
  { label: "Regional", value: "Regional" as const },
  { label: "Nasional", value: "National" as const },
  { label: "Internasional", value: "International" as const },
];

export function AboutAchievements({ achievements }: AboutAchievementsProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");

  const total = achievements.length;
  const international = achievements.filter((a) => a.level === "International").length;
  const national = achievements.filter((a) => a.level === "National").length;
  const regional = achievements.filter((a) => a.level === "Regional").length;

  const summary = [
    { id: "total", label: "Total Prestasi", value: total },
    { id: "international", label: "Internasional", value: international },
    { id: "national", label: "Nasional", value: national },
    { id: "regional", label: "Regional", value: regional },
  ];

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? achievements : achievements.filter((a) => a.level === filter);
    return [...list].sort((a, b) => b.year - a.year);
  }, [achievements, filter]);

  return (
    <section id="achievements" className="relative scroll-mt-28 px-6 py-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <Trophy className="h-3.5 w-3.5" />
            Seluruh Prestasi
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Riwayat Lengkap <span className="text-gradient">Perjalanan TSG</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="glass mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 rounded-2xl border border-white/[0.08] p-8 sm:grid-cols-4">
          {summary.map((item) => (
            <div key={item.id} className="text-center">
              <div className="font-display text-3xl font-bold text-white">
                <AnimatedCounter value={item.value} />
              </div>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                filter === f.value
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : "border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex flex-wrap items-stretch justify-center gap-5"
          >
            {filtered.length === 0 && (
              <p className="py-12 text-sm text-slate-500">
                Belum ada prestasi di kategori ini.
              </p>
            )}
            {filtered.map((item, index) => {
              const st = getAchievementCardStyle(item.level);
              return (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-2xl p-6",
                      st.cardClass
                    )}
                  >
                    <span className={st.pulseBorderClass} />

                    <div className="flex items-start justify-between gap-3">
                      <span className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                        st.iconBgClass
                      )}>
                        <Award className="h-5 w-5" />
                      </span>
                      <span className={cn("text-sm font-semibold", st.yearClass)}>
                        {item.year}
                      </span>
                    </div>

                    <h3 className={cn("mt-4 font-display text-base font-semibold leading-snug", st.titleClass)}>
                      {item.title}
                    </h3>
                    <p className={cn("mt-1.5 text-sm", st.eventClass)}>{item.event}</p>

                    <span
                      className={cn(
                        "mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 pt-4 text-[11px] font-medium",
                        st.chipClass
                      )}
                    >
                      <st.icon className="h-3 w-3" />
                      {item.level}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
