"use client";

import { motion } from "framer-motion";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import type { AboutContent } from "@/types";

interface VisionMissionProps {
  content: AboutContent;
}

export function VisionMission({ content }: VisionMissionProps) {
  return (
    <section className="relative px-6 py-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[140px]" />

      <div className="mx-auto max-w-5xl">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-white/[0.08] p-8 sm:p-10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Eye className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
            Visi
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            {content.vision}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-6 rounded-3xl border border-white/[0.08] p-8 sm:p-10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Target className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
            Misi
          </h2>

          <ul className="mt-5 space-y-3.5">
            {content.missionItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-slate-400 sm:text-base">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
