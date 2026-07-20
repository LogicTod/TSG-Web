import { defineField, defineType } from "sanity";
import { InfoIcon } from "lucide-react";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "Konten About (Visi & Misi)",
  type: "document",
  icon: InfoIcon,
  fields: [
    defineField({
      name: "vision",
      title: "Visi",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionItems",
      title: "Misi (daftar poin)",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Konten About (Visi & Misi)" };
    },
  },
});
