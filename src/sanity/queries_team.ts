import { client } from "./client";
import { urlForImage } from "./image";
import type { TeamMember, TeamBadge, TeamCategory } from "@/types";
import type { Image } from "sanity";

interface SanityAchievementItem {
  icon: Image;
  label: string;
}

interface SanityTeamMember {
  _id: string;
  name: string;
  fullName?: string;
  nickname?: string;
  birthDate?: string;
  role: string;
  division?: string;
  categories: string[];
  photo: Image;
  instagram?: string;
  linkedin?: string;
  email?: string;
  badge?: TeamBadge;
  achievements?: SanityAchievementItem[];
  featured: boolean;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await client.fetch<SanityTeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, nickname, birthDate, role, division,
      "categories": categories[]->slug.current,
      photo, instagram, linkedin, email, badge, achievements, featured
    }`
  );

  return data.map((item) => ({
    id: item._id,
    name: item.name,
    fullName: item.name,
    nickname: item.nickname,
    birthDate: item.birthDate,
    role: item.role,
    division: item.division ?? "",
    categories: item.categories ?? [],
    photo: urlForImage(item.photo).width(400).height(500).fit("crop").auto("format").url(),
    socials: {
      ...(item.instagram && { instagram: item.instagram }),
      ...(item.linkedin && { linkedin: item.linkedin }),
      ...(item.email && { email: `mailto:${item.email}` }),
    },
    badge: item.badge,
    achievements: (item.achievements ?? []).map((a) => ({
      icon: urlForImage(a.icon).width(96).height(96).fit("max").auto("format").url(),
      title: a.label,
    })),
    featured: item.featured,
  }));
}

interface SanityTeamCategory {
  _id: string;
  name: string;
  slug: { current: string };
  order: number;
}

export async function getTeamCategories(): Promise<TeamCategory[]> {
  const data = await client.fetch<SanityTeamCategory[]>(
    `*[_type == "teamCategory"] | order(order asc) { _id, name, slug, order }`
  );

  return data.map((item) => ({
    id: item._id,
    name: item.name,
    slug: item.slug?.current ?? "",
    order: item.order,
  }));
}
