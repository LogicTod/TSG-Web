import { client } from "./client";
import type { AchievementItem } from "@/types";

interface SanityAchievement {
  _id: string;
  title: string;
  event: string;
  year: number;
  level: "Regional" | "National" | "International";
  featured: boolean;
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const data = await client.fetch<SanityAchievement[]>(
    `*[_type == "achievement"] | order(year desc) {
      _id, title, event, year, level, featured
    }`
  );

  return data.map((item) => ({
    id: item._id,
    title: item.title,
    event: item.event,
    year: item.year,
    level: item.level,
    featured: item.featured,
  }));
}
