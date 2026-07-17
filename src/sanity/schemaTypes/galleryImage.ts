import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Galeri",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Keterangan Foto",
      type: "string",
      description:
        'Deskripsi singkat isi foto (untuk aksesibilitas & SEO). Contoh: "Anggota divisi Robotik merakit robot"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Robotik", value: "Robotik" },
          { title: "Mekatronika", value: "Mekatronika" },
          { title: "Sains", value: "Sains" },
          { title: "Multimedia", value: "Multimedia" },
          { title: "Event", value: "Event" },
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
    select: {
      title: "alt",
      subtitle: "category",
      media: "image",
    },
  },
});
