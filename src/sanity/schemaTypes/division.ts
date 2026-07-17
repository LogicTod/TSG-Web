import { defineField, defineType } from "sanity";
import { BotIcon } from "lucide-react";

export const division = defineType({
  name: "division",
  title: "Divisi",
  type: "document",
  icon: BotIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Divisi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (untuk URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo Divisi",
      type: "image",
      options: { hotspot: true },
      description:
        "Opsional. Kalau diisi, logo ini dipakai menggantikan ikon bawaan di kartu divisi. Kalau dikosongkan, ikon bawaan (dipilih di bawah) yang dipakai.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline Singkat",
      type: "string",
      description: "Satu baris kalimat pendek yang tampil di bawah nama divisi.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikon Bawaan (fallback)",
      type: "string",
      description: "Dipakai hanya kalau Logo Divisi di atas tidak diisi.",
      options: {
        list: [
          { title: "Robot (Robotik)", value: "Bot" },
          { title: "Gear (Mekatronika)", value: "Cog" },
          { title: "Tabung Kimia (Sains)", value: "FlaskConical" },
          { title: "Kamera (Multimedia)", value: "Camera" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Daftar Skill/Materi",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: Robotika, Elektronika Komputer, Pemrograman, dst.",
    }),
    defineField({
      name: "color",
      title: "Warna Tema",
      type: "string",
      options: {
        list: [
          { title: "Cyan (Primary)", value: "primary" },
          { title: "Cyan Terang (Accent)", value: "accent" },
          { title: "Biru (Blue)", value: "blue" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      description: "Angka kecil tampil lebih dulu (0, 1, 2, 3...).",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "logo",
    },
  },
});
