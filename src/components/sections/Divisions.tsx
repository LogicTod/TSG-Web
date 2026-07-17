"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { DivisionCard } from "@/components/ui/DivisionCard";
import type { Division } from "@/types";

interface DivisionsProps {
  divisions: Division[];
}

export function Divisions({ divisions }: DivisionsProps) {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <Layers className="h-3.5 w-3.5" />
            Divisi Kami
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Empat Disiplin, <span className="text-gradient">Satu Misi</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Setiap anggota memilih jalannya sendiri — tiap divisi mengajarkan
            cara berbeda mengubah ide jadi sesuatu yang nyata.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-stretch justify-center gap-6">
          {divisions.map((division, index) => (
            <div
              key={division.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <DivisionCard division={division} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
