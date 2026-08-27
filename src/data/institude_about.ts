export interface InstituteAboutConfig {
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

export interface HeroStatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface InstituteHeroConfig {
  eyebrow: string;
  heading: string;
  highlightWord: string;
  description: string;
  stats: HeroStatItem[];
}

export interface InstituteAboutContentConfig {
  vision: string;
  missionItems: string[];
}

export const defaultInstituteAbout: InstituteAboutConfig = {
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

export const defaultInstituteHero: InstituteHeroConfig = {
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

export const defaultInstituteAboutContent: InstituteAboutContentConfig = {
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
