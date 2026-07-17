import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "instagram" | "whatsapp" | "email" | "youtube" | "tiktok" | "x";
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  foundedDate: string;
  foundedYear: number;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  mapsEmbedUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  logoUrl?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface Division {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  logoUrl?: string;
  skills: string[];
  color: "primary" | "accent" | "blue";
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  year: number;
  level: "Regional" | "National" | "International";
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "past";
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  photo: string;
  socials: Partial<Record<"instagram" | "linkedin" | "email", string>>;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  eyebrow: string;
  headingLines: string[];
  highlightWord: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: Stat[];
}
