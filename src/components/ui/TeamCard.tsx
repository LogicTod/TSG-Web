"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  email: Mail,
} as const;

export function TeamCard({ member, index }: TeamCardProps) {
  const socialEntries = Object.entries(member.socials) as [
    keyof typeof socialIcons,
    string
  ][];

  return (
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
        className="glass relative overflow-hidden rounded-2xl border border-white/[0.08] transition-colors duration-200 group-hover:border-accent/40"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

          {/* Social links overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex translate-y-2 items-center justify-center gap-2 p-4 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {socialEntries.map(([platform, href]) => {
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${platform}`}
                  className="glass-strong flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:text-accent"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="p-4 text-center">
          <h3 className="font-display text-base font-semibold text-white">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{member.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
