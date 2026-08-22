import type { AchievementItem } from "@/types";
import { AchievementsLayout } from "./Achievements/AchievementsLayout";

interface AchievementsProps {
  achievements: AchievementItem[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return <AchievementsLayout achievements={achievements} />;
}

export { Achievements };
