import { defineField, defineType } from "sanity";
import { TrophyIcon } from "lucide-react";

export const achievement = defineType({
  name: "achievement",
  title: "Prestasi",
  type: "document",
  icon: TrophyIcon,
  fields: [
    defineField({
      name: "title",
      title: "Gelar Juara",
      type: "string",
      description: 'Contoh: "Juara I", "Juara II", "Juara Harapan I"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "event",
      title: "Nama Lomba / Event",
      type: "string",
      description:
        'Contoh: "Lomba Teknologi Tepat Guna Provinsi Jawa Barat"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Tahun",
      type: "number",
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "level",
      title: "Tingkat",
      type: "string",
      options: {
        list: [
          { title: "Regional (Kota/Provinsi)", value: "Regional" },
          { title: "Nasional", value: "National" },
          { title: "Internasional", value: "International" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Tampilkan di Home (Sorotan)",
      type: "boolean",
      description:
        "Aktifkan supaya prestasi ini muncul di preview Home page. Semua prestasi tetap dihitung di angka statistik, terlepas dari status ini.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Tahun Terbaru",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "event",
      year: "year",
    },
    prepare({ title, subtitle, year }) {
      return {
        title: `${title} — ${year}`,
        subtitle,
      };
    },
  },
});
