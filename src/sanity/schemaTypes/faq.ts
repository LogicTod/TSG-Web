import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "lucide-react";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Pertanyaan",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Jawaban",
      type: "text",
      rows: 4,
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
  orderings: [
    {
      title: "Urutan Tampil",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
  },
});
