import { defineField, defineType } from "sanity";
import { FolderKanbanIcon } from "lucide-react";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderKanbanIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Project",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (untuk URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Ringkasan Singkat",
      type: "text",
      rows: 3,
      description: "Muncul di kartu daftar project.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Sampul",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status Project",
      type: "string",
      options: {
        list: [
          { title: "Sudah Selesai", value: "Selesai" },
          { title: "Sedang Dikerjakan", value: "Sedang Dikerjakan" },
          { title: "Akan Datang", value: "Akan Datang" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Divisi Pembuat",
      type: "reference",
      to: [{ type: "division" }],
      description: "Opsional -- divisi mana yang mengerjakan project ini.",
    }),
    defineField({
      name: "tags",
      title: "Tags / Teknologi",
      type: "array",
      of: [{ type: "string" }],
      description: 'Contoh: "Arduino", "Python", "3D Printing"',
    }),
    defineField({
      name: "year",
      title: "Tahun",
      type: "number",
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "content",
      title: "Detail Lengkap Project",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
      description:
        "Cerita lengkap di balik project ini -- proses, tantangan, hasil. Bisa sisipkan gambar di tengah teks.",
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
    select: { title: "title", subtitle: "status", media: "coverImage" },
  },
});
