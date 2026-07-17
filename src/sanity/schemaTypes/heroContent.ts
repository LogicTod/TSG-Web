import { defineField, defineType } from "sanity";
import { LayoutTemplateIcon } from "lucide-react";

export const heroContent = defineType({
  name: "heroContent",
  title: "Konten Hero (Home)",
  type: "document",
  icon: LayoutTemplateIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label Kecil (di atas judul)",
      type: "string",
      description: 'Contoh: "Robotic & Science Club"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headingLine1",
      title: "Judul - Baris 1",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Judul - Baris 2",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Judul - Baris 3 (tampil bergradasi warna)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Teks Tombol Utama",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Link Tombol Utama",
      type: "string",
      description: 'Contoh: "/register"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Teks Tombol Kedua",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Link Tombol Kedua",
      type: "string",
      description: 'Contoh: "/divisions"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Statistik (maksimal 4)",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Contoh: "Anggota Aktif"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Angka",
              type: "number",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Akhiran (opsional)",
              type: "string",
              description: 'Contoh: "+"',
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Konten Hero (Home)" };
    },
  },
});
