import { defineField, defineType } from "sanity";
import { ShirtIcon } from "lucide-react";

export const uniformShowcase = defineType({
  name: "uniformShowcase",
  title: "Preview Seragam 3D",
  type: "document",
  icon: ShirtIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      initialValue: "Seragam Resmi TSG",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "frontImage",
      title: "Foto Depan",
      type: "image",
      description:
        "Foto seragam tampak dari depan, background polos/netral untuk hasil terbaik.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backImage",
      title: "Foto Belakang",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rightImage",
      title: "Foto Sisi Kanan",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leftImage",
      title: "Foto Sisi Kiri",
      type: "image",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "frontImage" },
  },
});
