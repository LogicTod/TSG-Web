import { client } from "./client";
import { urlForImage } from "./image";
import type { Division, AchievementItem, TeamMember, TeamBadge, TeamCategory, EventItem, GalleryItem, FAQItem, SiteSettings, HeroContent, ProgramItem, AboutContent, UniformShowcase, Project, ProjectStatus } from "@/types";
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

/**
 * Mengambil semua anggota tim yang sudah di-Publish, diurutkan berdasar
 * field "order". Foto & icon prestasi diresolve jadi URL string di sini
 * (server), sama seperti logo divisi, supaya aman dikirim ke Client
 * Component. Satu anggota bisa punya lebih dari 1 kategori sekaligus
 * (misal G3 sekaligus Mentor).
 */
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

/**
 * Mengambil semua kategori/generasi tim, diurutkan berdasar field
 * "order". Dipakai untuk membangun tab filter di halaman /team.
 */
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

interface SanityEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: Image;
  imageWidth?: number | null;
  imageHeight?: number | null;
  ctaLabel?: string;
  ctaHref?: string;
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
      _id, title, description, date, location, image, ctaLabel, ctaHref,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height
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
      ? urlForImage(item.image).width(1200).auto("format").url()
      : "",
    imageWidth: item.imageWidth ?? undefined,
    imageHeight: item.imageHeight ?? undefined,
    cta:
      item.ctaLabel && item.ctaHref
        ? { label: item.ctaLabel, href: item.ctaHref }
        : undefined,
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
  officeHours?: string;
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
      contactEmail, whatsappNumber, address, officeHours, mapsEmbedUrl,
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
    officeHours: data.officeHours,
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
  heading: string;
  headingHighlight: string;
  description: string;
  stats?: SanityHeroStat[];
}

// Dipakai HANYA kalau dokumen "Konten Hero" belum pernah di-Publish.
const fallbackHeroContent: HeroContent = {
  eyebrow: "Robotic & Science Club",
  heading: "Generasi Muda Yang Inovatif & Kompetitif",
  highlightWord: "Dalam Teknologi Robotik & Sains",
  description:
    "TSG membentuk generasi muda yang kreatif, inovatif, dan siap menghadapi perkembangan teknologi melalui pembelajaran, eksperimen, serta pengembangan proyek nyata.",
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
      eyebrow, heading, headingHighlight, description, stats
    }`
  );

  if (!data) return fallbackHeroContent;

  return {
    eyebrow: data.eyebrow,
    heading: data.heading,
    highlightWord: data.headingHighlight,
    description: data.description,
    stats: (data.stats ?? []).map((s, i) => ({
      id: `stat-${i}`,
      label: s.label,
      value: s.value,
      suffix: s.suffix ?? "",
    })),
  };
}

interface SanityWhyJoinItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Mengambil semua item "Kenapa Gabung TSG" yang sudah di-Publish,
 * diurutkan berdasar field "order". `icon` tetap berupa teks di sini,
 * diterjemahkan jadi komponen di WhyJoin.tsx (Client Component).
 */
export async function getWhyJoinItems(): Promise<ProgramItem[]> {
  const data = await client.fetch<SanityWhyJoinItem[]>(
    `*[_type == "whyJoinItem"] | order(order asc) {
      _id, title, description, icon
    }`
  );

  return data.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    icon: item.icon,
  }));
}

interface SanityAboutContent {
  vision: string;
  missionItems: string[];
}

// Dipakai HANYA kalau dokumen "Konten About" belum pernah di-Publish --
// isinya sesuai teks visi & misi asli TSG yang sudah dikonfirmasi.
const fallbackAboutContent: AboutContent = {
  vision:
    "Menjadikan generasi muda yang inovatif dan kompetitif. Menjadikan The Smart Generation sebagai komunitas yang profesional dan kompeten dalam bidang teknologi elektronika, robotik, dan sains yang mampu bersaing dalam kancah nasional dan internasional.",
  missionItems: [
    "Mencetak generasi muda yang unggul dan berprestasi dalam bidang teknologi robotik dan sains.",
    "Membentuk SDM ber-Imtaq melalui pendidikan dan pelatihan teknologi robotik dan sains yang berorientasi pada prestasi berkelanjutan terhadap kelestarian lingkungan hidup.",
    "Menghasilkan SDM yang profesional dan berpikiran terbuka yang siap bersaing di dunia elektronika, robotik, dan sains.",
    "Membangun dan mengimplementasikan nilai-nilai moral dan etika akademis.",
    "Memajukan pendidikan di Indonesia melalui teknologi robotik dan sains.",
  ],
};

export async function getAboutContent(): Promise<AboutContent> {
  const data = await client.fetch<SanityAboutContent | null>(
    `*[_type == "aboutContent"][0] { vision, missionItems }`
  );

  if (!data) return fallbackAboutContent;

  return {
    vision: data.vision,
    missionItems: data.missionItems ?? [],
  };
}

interface SanityUniformShowcase {
  title: string;
  frontImage: Image;
  backImage: Image;
  rightImage: Image;
  leftImage: Image;
}

/**
 * Mengambil 4 foto preview seragam. Return `null` kalau dokumennya belum
 * pernah diisi/di-Publish -- halaman /gallery akan otomatis sembunyikan
 * section ini kalau begitu, bukan error atau tampil kosong.
 */
export async function getUniformShowcase(): Promise<UniformShowcase | null> {
  const data = await client.fetch<SanityUniformShowcase | null>(
    `*[_type == "uniformShowcase"][0] { title, frontImage, backImage, rightImage, leftImage }`
  );

  if (!data) return null;

  return {
    title: data.title,
    front: urlForImage(data.frontImage).width(900).auto("format").url(),
    back: urlForImage(data.backImage).width(900).auto("format").url(),
    right: urlForImage(data.rightImage).width(900).auto("format").url(),
    left: urlForImage(data.leftImage).width(900).auto("format").url(),
  };
}

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  coverImage: Image;
  status: ProjectStatus;
  divisionName?: string;
  tags?: string[];
  year: number;
}

/**
 * Mengambil daftar project (tanpa isi lengkap -- cukup untuk kartu daftar).
 */
export async function getProjects(): Promise<Project[]> {
  const data = await client.fetch<SanityProject[]>(
    `*[_type == "project"] | order(year desc) {
      _id, title, slug, description, coverImage, status, tags, year,
      "divisionName": division->name
    }`
  );

  return data.map((item) => ({
    id: item._id,
    title: item.title,
    slug: item.slug?.current ?? "",
    description: item.description,
    coverImage: urlForImage(item.coverImage).width(800).height(500).fit("crop").auto("format").url(),
    status: item.status,
    divisionName: item.divisionName,
    tags: item.tags ?? [],
    year: item.year,
  }));
}

interface SanityProjectDetail extends SanityProject {
  content: unknown[];
}

/**
 * Mengambil 1 project lengkap (termasuk isi/content) berdasarkan slug,
 * dipakai di halaman detail /project/[slug]. Return null kalau tidak ketemu.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await client.fetch<SanityProjectDetail | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, description, coverImage, status, tags, year, content,
      "divisionName": division->name
    }`,
    { slug }
  );

  if (!data) return null;

  return {
    id: data._id,
    title: data.title,
    slug: data.slug?.current ?? "",
    description: data.description,
    coverImage: urlForImage(data.coverImage).width(1200).auto("format").url(),
    status: data.status,
    divisionName: data.divisionName,
    tags: data.tags ?? [],
    year: data.year,
    content: data.content,
  };
}
