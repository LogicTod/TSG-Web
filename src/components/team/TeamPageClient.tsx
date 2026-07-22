"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMemberCard } from "./TeamMemberCard";
import { cn } from "@/lib/utils";
import type { TeamCategory, TeamMember } from "@/types";

interface TeamPageClientProps {
  categories: TeamCategory[];
  members: TeamMember[];
}

export function TeamPageClient({ categories, members }: TeamPageClientProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");

  const filtered = useMemo(
    () => members.filter((m) => m.categories.includes(activeSlug)),
    [members, activeSlug]
  );

  if (categories.length === 0) {
    return (
      <p className="mt-12 text-center text-sm text-slate-500">
        Belum ada kategori/generasi yang dibuat di Studio.
      </p>
    );
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveSlug(cat.slug)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200",
              activeSlug === cat.slug
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Member grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-12 flex flex-wrap items-stretch justify-center gap-6"
        >
          {filtered.length === 0 && (
            <p className="py-16 text-sm text-slate-500">
              Belum ada anggota di kategori ini.
            </p>
          )}
          {filtered.map((member, index) => (
            <div
              key={member.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <TeamMemberCard member={member} index={index} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
