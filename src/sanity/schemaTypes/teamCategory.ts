import { defineField, defineType } from "sanity";
import { UsersRoundIcon } from "lucide-react";

/**
 * Kategori/Generasi Tim -- didesain sebagai document type TERPISAH
 * (bukan dropdown tetap di kode) supaya pengurus bisa tambah kategori
 * baru sendiri kapan saja lewat Studio (misal G14, G15, dst nanti)
 * tanpa perlu minta developer ubah kode.
 */
export const teamCategory = defineType({
  name: "teamCategory",
  title: "Kategori / Generasi Tim",
  type: "document",
  icon: UsersRoundIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Kategori",
      type: "string",
      description: 'Contoh: "G10", "Creator", "Mentor"',
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
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      description:
        "Angka kecil tampil lebih dulu di tab kategori (0, 1, 2, dst).",
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
    select: { title: "name" },
  },
});
