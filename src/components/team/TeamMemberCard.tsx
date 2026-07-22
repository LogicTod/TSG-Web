"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Instagram, Cake } from "lucide-react";
import { badgeConfig } from "@/lib/badge-config";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const birthDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const badge = member.badge ? badgeConfig[member.badge] : null;
  const hasAchievements = member.achievements.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative h-full rounded-2xl"
    >
      {/* Soft ambient glow behind the whole card -- badge holders only */}
      {badge && (
        <motion.div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl blur-xl"
          style={{ backgroundColor: `rgba(${badge.glowRgb},0.35)` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Rotating "aura" light sweeping around the border -- badge holders only */}
      {badge && (
        <div className="pointer-events-none absolute -inset-[2px] -z-10 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-[-100%] blur-[3px]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(${badge.glowRgb},0.95) 50deg, transparent 130deg, transparent 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Badge icon -- ALWAYS visible top-right, expanded or not.
          Sits OUTSIDE the overflow-hidden card (as a sibling), otherwise
          its tooltip gets clipped by the card's own rounded-corner mask. */}
      {badge && (
        <span className="absolute right-3 top-3 z-30">
          <Tooltip label={badge.label} position="bottom">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
                badge.iconBg
              )}
            >
              <badge.icon className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </Tooltip>
        </span>
      )}

      <div
        className={cn(
          "glass relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-200",
          badge ? "border-white/10" : "border-white/[0.08]"
        )}
      >
        {/* Photo -- image itself is clipped/rounded by an inner wrapper,
            NOT the outer one, so achievement icons hanging below the
            photo edge are never cut off. */}
        <div className="relative aspect-[4/5] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </div>

          {/* Achievement icons -- collapsed state: sit on the bottom edge
              of the photo. No longer clipped, and tooltip can pop up freely. */}
          {hasAchievements && !isExpanded && (
            <div className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {member.achievements.map((ach, i) => (
                <Tooltip key={i} label={ach.title}>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    className="glass-strong flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10"
                  >
                    <Image
                      src={ach.icon}
                      alt={ach.title}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  </motion.span>
                </Tooltip>
              ))}
            </div>
          )}
        </div>

        {/* Name + role */}
        <div className={cn("px-4 pb-3 text-center", hasAchievements && !isExpanded ? "pt-7" : "pt-4")}>
          <h3 className="font-display text-base font-semibold text-white">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{member.role}</p>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Tutup detail" : "Lihat detail"}
          className="flex items-center justify-center gap-1.5 border-t border-white/[0.06] py-2.5 text-xs font-medium text-slate-400 transition-colors duration-200 hover:text-accent"
        >
          {isExpanded ? "Tutup" : "Detail"}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </button>

        {/* Expanded panel -- CSS grid-rows trick, avoids blurry text during animation */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 border-t border-white/[0.06] px-4 py-4 text-xs">
              <DetailRow label="Nama Lengkap" value={member.fullName ?? member.name} />
              <DetailRow label="Nickname" value={member.nickname || "-"} />
              <DetailRow
                label="Tanggal Lahir"
                value={
                  member.birthDate
                    ? birthDateFormatter.format(new Date(member.birthDate))
                    : "-"
                }
                icon={<Cake className="h-3.5 w-3.5 text-primary" />}
              />
              {member.socials.instagram ? (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-500 transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-1.5">
                    <Instagram className="h-3.5 w-3.5 text-primary" />
                    Instagram
                  </span>
                  <span className="text-white">Lihat profil</span>
                </a>
              ) : (
                <DetailRow label="Instagram" value="-" />
              )}

              {/* Achievement space -- expanded state: icons live here, small by
                  default, grows automatically via flex-wrap if there are many */}
              {hasAchievements && (
                <div className="pt-2">
                  <p className="mb-2 text-slate-500">Achievement</p>
                  <div className="flex flex-wrap gap-2">
                    {member.achievements.map((ach, i) => (
                      <Tooltip key={i} label={ach.title}>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                          className="glass flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10"
                        >
                          <Image
                            src={ach.icon}
                            alt={ach.title}
                            width={22}
                            height={22}
                            className="h-[22px] w-[22px] object-contain"
                          />
                        </motion.span>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-slate-500">
        {icon}
        {label}
      </span>
      <span className="text-white">{value}</span>
    </div>
  );
}
