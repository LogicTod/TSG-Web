import { smartFetchWithCache } from "./cacheClient";
import { urlForImage } from "./image";
import type { FAQItem, SiteSettings, HeroContent, ProgramItem, AboutContent } from "@/types";
import type { Image } from "sanity";

interface SanityFAQ {
  _id: string;
  question: string;
  answer: string;
}

export async function getFAQs(): Promise<FAQItem[]> {
  const query = `*[_type == "faq"] | order(order asc) {
    _id, _rev, question, answer
  }`;

  return smartFetchWithCache<FAQItem[]>(
    "faqs",
    query,
    (data: SanityFAQ[]) =>
      data.map((item) => ({
        id: item._id,
        question: item.question,
        answer: item.answer,
      })),
    []
  );
}

interface SanitySiteSettings {
  _id?: string;
  _rev?: string;
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

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    _id, _rev, name, shortName, slogan, description, foundedDate,
    contactEmail, whatsappNumber, address, officeHours, mapsEmbedUrl,
    instagramUrl, youtubeUrl, logo
  }`;

  return smartFetchWithCache<SiteSettings>(
    "site_settings",
    query,
    (data: SanitySiteSettings | null) => {
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
    },
    fallbackSiteSettings
  );
}

interface SanityHeroStat {
  label: string;
  value: number;
  suffix?: string;
}

interface SanityHeroContent {
  _id?: string;
  _rev?: string;
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  description: string;
  stats?: SanityHeroStat[];
}

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

export async function getHeroContent(): Promise<HeroContent> {
  const query = `*[_type == "heroContent"][0] {
    _id, _rev, eyebrow, heading, headingHighlight, description, stats
  }`;

  return smartFetchWithCache<HeroContent>(
    "hero_content",
    query,
    (data: SanityHeroContent | null) => {
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
    },
    fallbackHeroContent
  );
}

interface SanityWhyJoinItem {
  _id: string;
  _rev?: string;
  title: string;
  description: string;
  icon: string;
}

export async function getWhyJoinItems(): Promise<ProgramItem[]> {
  const query = `*[_type == "whyJoinItem"] | order(order asc) {
    _id, _rev, title, description, icon
  }`;

  return smartFetchWithCache<ProgramItem[]>(
    "why_join_items",
    query,
    (data: SanityWhyJoinItem[]) =>
      (data ?? []).map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        icon: item.icon,
      })),
    []
  );
}

interface SanityAboutContent {
  _id?: string;
  _rev?: string;
  vision: string;
  missionItems: string[];
}

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
  const query = `*[_type == "aboutContent"][0] { _id, _rev, vision, missionItems }`;

  return smartFetchWithCache<AboutContent>(
    "about_content",
    query,
    (data: SanityAboutContent | null) => {
      if (!data) return fallbackAboutContent;
      return {
        vision: data.vision,
        missionItems: data.missionItems ?? [],
      };
    },
    fallbackAboutContent
  );
}