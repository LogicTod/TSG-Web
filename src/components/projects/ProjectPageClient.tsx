"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

interface ProjectPageClientProps {
  projects: Project[];
}

const FILTERS: { label: string; value: ProjectStatus | "Semua" }[] = [
  { label: "Semua", value: "Semua" },
  { label: "Sudah Selesai", value: "Selesai" },
  { label: "Sedang Dikerjakan", value: "Sedang Dikerjakan" },
  { label: "Akan Datang", value: "Akan Datang" },
];

export function ProjectPageClient({ projects }: ProjectPageClientProps) {
  const [filter, setFilter] = useState<ProjectStatus | "Semua">("Semua");

  const filtered = useMemo(
    () =>
      filter === "Semua" ? projects : projects.filter((p) => p.status === filter),
    [projects, filter]
  );

  if (projects.length === 0) {
    return (
      <p className="mt-16 text-center text-sm text-slate-500">
        Belum ada project yang dipublikasikan.
      </p>
    );
  }

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200",
              filter === f.value
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-10 flex flex-wrap items-stretch justify-center gap-6"
        >
          {filtered.length === 0 && (
            <p className="py-12 text-sm text-slate-500">
              Belum ada project di kategori ini.
            </p>
          )}
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
