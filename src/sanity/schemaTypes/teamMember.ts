import { defineField, defineType } from "sanity";
import { UsersIcon } from "lucide-react";

export const teamMember = defineType({
  name: "teamMember",
  title: "Anggota Tim",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "profile", title: "Profil" },
    { name: "detail", title: "Detail Tambahan" },
    { name: "badge", title: "Badge & Achievement" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nama Lengkap",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "role",
      title: "Jabatan",
      type: "string",
      group: "profile",
      description: 'Contoh: "Ketua Umum", "Koordinator Divisi Robotik"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Divisi / Bagian",
      type: "string",
      group: "profile",
      description:
        'Contoh: "Pengurus Inti", "Robotik", "Mekatronika", "Sains", "Multimedia"',
    }),
    defineField({
      name: "categories",
      title: "Kategori / Generasi",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamCategory" }] }],
      group: "profile",
      description:
        'Bisa pilih lebih dari 1, misal anggota G3 yang sekaligus jadi Mentor. Kalau kategorinya belum ada, buat dulu lewat menu "Kategori / Generasi Tim".',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      group: "profile",
      validation: (rule) => rule.required(),
    }),

    // --- Detail tambahan (muncul saat kartu di-expand) ---
    defineField({
      name: "birthDate",
      title: "Tanggal Lahir",
      type: "date",
      group: "detail",
    }),
    defineField({
      name: "instagram",
      title: "Link Instagram",
      type: "url",
      group: "detail",
    }),
    defineField({
      name: "linkedin",
      title: "Link LinkedIn",
      type: "url",
      group: "detail",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "detail",
    }),

    // --- Badge (opsional, cuma untuk peran khusus) ---
    defineField({
      name: "badge",
      title: "Badge Khusus",
      type: "string",
      group: "badge",
      description:
        "Kosongkan untuk anggota biasa (tanpa border/badge tambahan).",
      options: {
        list: [
          { title: "Founder (emas)", value: "founder" },
          { title: "Developer (biru)", value: "developer" },
          { title: "Mentor (hijau)", value: "mentor" },
          { title: "Admin (perak)", value: "admin" },
        ],
      },
    }),

    // --- Achievement (opsional, bisa lebih dari 1) ---
    defineField({
      name: "achievements",
      title: "Achievement",
      type: "array",
      group: "badge",
      description:
        "Opsional -- tambahkan kalau anggota ini punya prestasi yang ingin ditandai dengan ikon di profilnya.",
      of: [
        {
          type: "object",
          name: "achievementBadge",
          fields: [
            defineField({
              name: "icon",
              title: "Ikon Achievement",
              type: "image",
              description: "PNG/SVG persegi, background transparan, min. 128x128px.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Keterangan (muncul saat hover)",
              type: "string",
              description: 'Contoh: "Juara I Lomba Robotik Nasional 2024"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", media: "icon" },
          },
        },
      ],
    }),

    defineField({
      name: "featured",
      title: "Tampilkan di Home (Sorotan)",
      type: "boolean",
      group: "profile",
      description:
        "Aktifkan untuk anggota yang mau ditampilkan di preview Home page (biasanya pengurus inti).",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      group: "profile",
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
