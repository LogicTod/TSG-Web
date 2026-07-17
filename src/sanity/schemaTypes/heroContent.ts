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
      name: "heading",
      title: "Judul - Baris 1 (warna putih biasa)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Judul - Baris 2 (tampil bergradasi warna)",
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
