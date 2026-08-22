import Image from "next/image";
import { Tooltip } from "@/components/ui/Tooltip";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";

interface TeamMemberCardProfileProps {
  member: TeamMember;
  isExpanded: boolean;
}

export function TeamMemberCardProfile({ member, isExpanded }: TeamMemberCardProfileProps) {
  const hasAchievements = member.achievements.length > 0;

  return (
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
  );
}
