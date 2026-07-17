import { defineField, defineType } from "sanity";
import { HeartHandshakeIcon } from "lucide-react";

export const whyJoinItem = defineType({
  name: "whyJoinItem",
  title: "Kenapa Gabung TSG",
  type: "document",
  icon: HeartHandshakeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Singkat",
      type: "string",
      description: 'Contoh: "Prestasi & Kompetisi"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: [
          { title: "Trofi (Prestasi)", value: "Trophy" },
          { title: "Hati Berjabat (Karakter/Nilai)", value: "HeartHandshake" },
          { title: "Koper (Profesional/Karier)", value: "Briefcase" },
          { title: "Daun (Lingkungan)", value: "Leaf" },
          { title: "Topi Wisuda (Pendidikan)", value: "GraduationCap" },
          { title: "Roket (Inovasi)", value: "Rocket" },
          { title: "Bintang (Unggulan)", value: "Star" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
