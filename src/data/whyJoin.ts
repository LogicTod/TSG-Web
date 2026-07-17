import { Trophy, HeartHandshake, Briefcase, Leaf, GraduationCap } from "lucide-react";
import type { ProgramItem } from "@/types";

export const whyJoinItems: ProgramItem[] = [
  {
    id: "achievement",
    title: "Prestasi & Kompetisi",
    description:
      "Kesempatan mengasah kemampuan dan meraih prestasi di bidang Robotik & Sains, mulai dari tingkat regional hingga internasional.",
    icon: Trophy,
  },
  {
    id: "character",
    title: "Karakter & Nilai",
    description:
      "Pendidikan dan pelatihan yang menanamkan nilai moral, etika akademis, serta kepribadian ber-Imtaq secara berkesinambungan.",
    icon: HeartHandshake,
  },
  {
    id: "professional",
    title: "SDM Profesional",
    description:
      "Dibentuk menjadi individu yang profesional dan berpikiran terbuka, siap bersaing di dunia elektronika, robotik, dan sains.",
    icon: Briefcase,
  },
  {
    id: "environment",
    title: "Peduli Lingkungan",
    description:
      "Setiap pelatihan berorientasi pada prestasi yang tetap menjaga kelestarian lingkungan hidup.",
    icon: Leaf,
  },
  {
    id: "education",
    title: "Kontribusi Pendidikan",
    description:
      "Ikut berperan memajukan pendidikan Indonesia melalui pengembangan teknologi robotik dan sains.",
    icon: GraduationCap,
  },
];
