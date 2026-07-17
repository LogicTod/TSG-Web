import { client } from "./client";
import { urlForImage } from "./image";
import type { Division, AchievementItem, TeamMember, EventItem, GalleryItem, FAQItem, SiteSettings, HeroContent } from "@/types";
import type { Image } from "sanity";

interface SanityDivision {
  _id: string;
  name: string;
  slug: { current: string };
  tagline: string;
  description: string;
  icon: string;
  logo?: Image;
  skills: string[];
  color: "primary" | "accent" | "blue";
}

/**
 * Mengambil semua divisi yang sudah di-Publish dari Sanity, diurutkan
 * berdasarkan field "order". Draft (belum di-Publish) tidak akan ikut
 * terambil di sini.
 *
 * Catatan: `icon` sengaja tetap berupa teks ("Bot", "Cog", dst) di sini,
 * bukan komponen React — komponen tidak bisa dikirim lewat props dari
 * Server Component ke Client Component. Penerjemahan teks → komponen
 * ikon dilakukan di DivisionCard.tsx (Client Component). Logo (kalau
 * diisi) juga diresolve jadi URL string biasa di sini, dengan alasan
 * yang sama — supaya aman dikirim lewat props.
 */
export async function getDivisions(): Promise<Division[]> {
  const data = await client.fetch<SanityDivision[]>(
    `*[_type == "division"] | order(order asc) {
      _id, name, slug, tagline, description, icon, logo, skills, color
    }`
  );

  return data.map((item) => ({
    id: item._id,
    name: item.name,
    slug: item.slug?.current ?? "",
    tagline: item.tagline,
    description: item.description,
    icon: item.icon,
    logoUrl: item.logo
      ? urlForImage(item.logo).width(160).height(160).fit("max").auto("format").url()
      : undefined,
    skills: item.skills ?? [],
    color: item.color,
  }));
}

interface SanityAchievement {
  _id: string;
  title: string;
  event: string;
  year: number;
  level: "Regional" | "National" | "International";
  featured: boolean;
}

/**
 * Mengambil semua prestasi yang sudah di-Publish, diurutkan dari tahun
 * terbaru. Field `level` berupa string biasa, jadi aman dikirim langsung
 * ke Client Component tanpa perlu penerjemahan seperti ikon divisi.
 */
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

interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  division?: string;
  photo: Image;
  instagram?: string;
  linkedin?: string;
  email?: string;
  featured: boolean;
}

/**
 * Mengambil semua anggota tim yang sudah di-Publish, diurutkan berdasar
 * field "order". Foto diresolve jadi URL string di sini (server), sama
 * seperti logo divisi, supaya aman dikirim ke Client Component.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await client.fetch<SanityTeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, division, photo, instagram, linkedin, email, featured
    }`
  );

  return data.map((item) => ({
    id: item._id,
    name: item.name,
    role: item.role,
    division: item.division ?? "",
    photo: urlForImage(item.photo).width(400).height(500).fit("crop").auto("format").url(),
    socials: {
      ...(item.instagram && { instagram: item.instagram }),
      ...(item.linkedin && { linkedin: item.linkedin }),
      ...(item.email && { email: `mailto:${item.email}` }),
    },
    featured: item.featured,
  }));
}

interface SanityEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: Image;
}

/**
 * Mengambil semua event yang sudah di-Publish. Status "upcoming"/"past"
 * TIDAK disimpan manual di Sanity — dihitung otomatis di sini dengan
 * membandingkan tanggal event ke waktu sekarang, supaya pengurus tidak
 * perlu ingat mengubah status tiap event lewat.
 */
export async function getEvents(): Promise<EventItem[]> {
  const data = await client.fetch<SanityEvent[]>(
    `*[_type == "event"] | order(date asc) {
      _id, title, description, date, location, image
    }`
  );

  const now = Date.now();

  return data.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    status: new Date(item.date).getTime() >= now ? "upcoming" : "past",
    image: item.image
      ? urlForImage(item.image).width(800).height(500).fit("crop").auto("format").url()
      : "",
  }));
}

interface SanityGalleryImage {
  _id: string;
  image: Image;
  alt: string;
  category: string;
  width: number | null;
  height: number | null;
}

/**
 * Mengambil semua foto galeri yang sudah di-Publish. `width`/`height`
 * diambil dari metadata asli foto yang di-upload (bukan diisi manual),
 * supaya rasio gambar di layout masonry tetap akurat.
 */
export async function getGalleryImages(): Promise<GalleryItem[]> {
  const data = await client.fetch<SanityGalleryImage[]>(
    `*[_type == "galleryImage"] | order(order asc) {
      _id, image, alt, category,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }`
  );

  return data.map((item) => ({
    id: item._id,
    src: urlForImage(item.image).width(800).auto("format").url(),
    alt: item.alt,
    category: item.category,
    width: item.width ?? 800,
    height: item.height ?? 800,
  }));
}

interface SanityFAQ {
  _id: string;
  question: string;
  answer: string;
}

/**
 * Mengambil semua FAQ yang sudah di-Publish, diurutkan berdasar field
 * "order".
 */
export async function getFAQs(): Promise<FAQItem[]> {
  const data = await client.fetch<SanityFAQ[]>(
    `*[_type == "faq"] | order(order asc) {
      _id, question, answer
    }`
  );

  return data.map((item) => ({
    id: item._id,
    question: item.question,
    answer: item.answer,
  }));
}

interface SanitySiteSettings {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  foundedDate: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  mapsEmbedUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  logo?: Image;
}

// Dipakai HANYA kalau dokumen "Pengaturan Situs" belum pernah di-Publish
// di Studio, supaya situs tidak error/blank saat pertama kali setup.
const fallbackSiteSettings: SiteSettings = {
  name: "The Smart Generation",
  shortName: "TSG",
  slogan: "Together We Make A Better Future",
  description:
    "The Smart Generation (TSG) adalah organisasi Robotic & Science Club.",
  foundedDate: "2014-08-20",
  foundedYear: 2014,
  contactEmail: "hello@thesmartgeneration.id",
  whatsappNumber: "+6285155161711",
  address: "Jl. Pendidikan No. 1, Indonesia",
  mapsEmbedUrl: "",
  instagramUrl: "https://instagram.com/thesmartgeneration",
  youtubeUrl: "",
  logoUrl: undefined,
};

/**
 * Mengambil dokumen "Pengaturan Situs" (singleton, id tetap "siteSettings").
 * Kalau belum ada/belum di-Publish, pakai data cadangan di atas.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await client.fetch<SanitySiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      name, shortName, slogan, description, foundedDate,
      contactEmail, whatsappNumber, address, mapsEmbedUrl,
      instagramUrl, youtubeUrl, logo
    }`
  );

  if (!data) return fallbackSiteSettings;

  return {
    name: data.name,
    shortName: data.shortName,
    slogan: data.slogan,
    description: data.description,
    foundedDate: data.foundedDate,
    foundedYear: new Date(data.foundedDate).getFullYear(),
    contactEmail: data.contactEmail,
    whatsappNumber: data.whatsappNumber,
    address: data.address,
    mapsEmbedUrl: data.mapsEmbedUrl ?? "",
    instagramUrl: data.instagramUrl ?? "",
    youtubeUrl: data.youtubeUrl ?? "",
    logoUrl: data.logo
      ? urlForImage(data.logo).width(200).height(200).fit("max").auto("format").url()
      : undefined,
  };
}

interface SanityHeroStat {
  label: string;
  value: number;
  suffix?: string;
}

interface SanityHeroContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingHighlight: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats?: SanityHeroStat[];
}

// Dipakai HANYA kalau dokumen "Konten Hero" belum pernah di-Publish.
const fallbackHeroContent: HeroContent = {
  eyebrow: "Robotic & Science Club",
  headingLines: ["Generasi Muda Yang", "Inovatif & Kompetitif"],
  highlightWord: "Dalam Teknologi Robotik & Sains",
  description:
    "TSG membentuk generasi muda yang kreatif, inovatif, dan siap menghadapi perkembangan teknologi melalui pembelajaran, eksperimen, serta pengembangan proyek nyata.",
  primaryCta: { label: "Gabung Sekarang", href: "/register" },
  secondaryCta: { label: "Lihat Divisi", href: "/divisions" },
  stats: [
    { id: "members", label: "Anggota Aktif", value: 250, suffix: "+" },
    { id: "divisions", label: "Divisi", value: 4, suffix: "" },
    { id: "awards", label: "Penghargaan", value: 30, suffix: "+" },
    { id: "projects", label: "Proyek Dibuat", value: 60, suffix: "+" },
  ],
};

/**
 * Mengambil dokumen "Konten Hero" (singleton, id tetap "heroContent").
 * Kalau belum ada/belum di-Publish, pakai data cadangan di atas.
 */
export async function getHeroContent(): Promise<HeroContent> {
  const data = await client.fetch<SanityHeroContent | null>(
    `*[_type == "heroContent"][0] {
      eyebrow, headingLine1, headingLine2, headingHighlight, description,
      primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, stats
    }`
  );

  if (!data) return fallbackHeroContent;

  return {
    eyebrow: data.eyebrow,
    headingLines: [data.headingLine1, data.headingLine2],
    highlightWord: data.headingHighlight,
    description: data.description,
    primaryCta: { label: data.primaryCtaLabel, href: data.primaryCtaHref },
    secondaryCta: { label: data.secondaryCtaLabel, href: data.secondaryCtaHref },
    stats: (data.stats ?? []).map((s, i) => ({
      id: `stat-${i}`,
      label: s.label,
      value: s.value,
      suffix: s.suffix ?? "",
    })),
  };
}
