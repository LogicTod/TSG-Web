import { defineField, defineType } from "sanity";
import { UsersIcon } from "lucide-react";

export const teamMember = defineType({
  name: "teamMember",
  title: "Anggota Tim",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Lengkap",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Jabatan",
      type: "string",
      description: 'Contoh: "Ketua Umum", "Koordinator Divisi Robotik"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Divisi / Bagian",
      type: "string",
      description:
        'Contoh: "Pengurus Inti", "Robotik", "Mekatronika", "Sains", "Multimedia"',
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instagram",
      title: "Link Instagram",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "Link LinkedIn",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Tampilkan di Home (Sorotan)",
      type: "boolean",
      description:
        "Aktifkan untuk anggota yang mau ditampilkan di preview Home page (biasanya pengurus inti).",
      initialValue: false,
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
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
