"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import type { ProgramItem } from "@/types";

interface WhyJoinProps {
  items: ProgramItem[];
}

export function WhyJoin({ items }: WhyJoinProps) {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <Target className="h-3.5 w-3.5" />
            Kenapa Gabung TSG
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Lebih Dari Sekadar <span className="text-gradient">Komunitas</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Setiap program di TSG dirancang untuk membentuk kemampuan,
            karakter, dan kesiapan bersaing di dunia teknologi.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-stretch justify-center gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? iconMap.Trophy;
            return (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group h-full"
                >
                  <motion.div
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="glass relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] p-6 transition-colors duration-200 group-hover:border-accent/40"
                  >
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-accent/10 opacity-0 blur-2xl transition-opacity duration-200 ease-out group-hover:opacity-100" />

                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-200 ease-out group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>

                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
