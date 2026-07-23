import { defineField, defineType } from "sanity";
import { SettingsIcon } from "lucide-react";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  icon: SettingsIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama Organisasi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Nama Singkat / Singkatan",
      type: "string",
      description: 'Contoh: "TSG"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo TSG",
      type: "image",
      options: { hotspot: true },
      description:
        "Dipakai di Navbar dan Footer. Idealnya PNG/SVG dengan background transparan.",
    }),
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat Organisasi",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "foundedDate",
      title: "Tanggal Berdiri",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Email Kontak",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "Nomor WhatsApp Admin",
      type: "string",
      description:
        "Format internasional, contoh: +6285155161711 (tanpa spasi/strip)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Alamat Sekretariat",
      type: "string",
    }),
    defineField({
      name: "officeHours",
      title: "Jam Operasional (opsional)",
      type: "string",
      description: 'Contoh: "Senin - Jumat, 15.00 - 18.00 WIB"',
    }),
    defineField({
      name: "mapsEmbedUrl",
      title: "Link Embed Google Maps",
      type: "url",
      description:
        'Buka Google Maps -> tombol "Share" -> tab "Embed a map" -> copy URL dari dalam atribut src="...".',
    }),
    defineField({
      name: "instagramUrl",
      title: "Link Instagram",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "Link YouTube",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pengaturan Situs (TSG)" };
    },
  },
});
