import { defineField, defineType } from "sanity";
import { CalendarIcon } from "lucide-react";

export const event = defineType({
  name: "event",
  title: "Event / Agenda",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Event",
      type: "string",
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
      name: "date",
      title: "Tanggal & Jam",
      type: "datetime",
      description:
        "Status 'akan datang' atau 'sudah lewat' dihitung otomatis dari tanggal ini — tidak perlu diatur manual.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lokasi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Gambar/Poster Event",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaLabel",
      title: "Teks Tombol (opsional)",
      type: "string",
      description:
        'Isi kalau event ini butuh tombol aksi, contoh: "Daftar Sekarang", "Lihat Detail". Kosongkan kalau event ini cuma pemberitahuan info biasa (tanpa tombol).',
    }),
    defineField({
      name: "ctaHref",
      title: "Link Tombol (opsional)",
      type: "url",
      description:
        "Wajib diisi kalau Teks Tombol di atas diisi. Bisa link WhatsApp, Google Form, atau halaman lain.",
    }),
  ],
  orderings: [
    {
      title: "Tanggal Terdekat",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
      date: "date",
    },
    prepare({ title, subtitle, media, date }) {
      const formatted = date
        ? new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Belum ada tanggal";
      return {
        title,
        subtitle: `${formatted} — ${subtitle ?? ""}`,
        media,
      };
    },
  },
});
