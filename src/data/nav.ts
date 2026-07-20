import type { NavLink } from "@/types";

/**
 * Struktur menu navigasi -- ini bagian dari desain/struktur situs, bukan
 * "konten" yang perlu diedit pengurus lewat CMS, jadi sengaja tetap di
 * kode (kalau nanti ada halaman baru, tinggal tambah baris di sini).
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "https://thesmartgeneration.vercel.app/about" },
  { label: "Divisions", href: "https://thesmartgeneration.vercel.app/divisions" },
  { label: "Gallery", href: "https://sites.google.com/view/thesmartgeneration/gallery" },
  { label: "Events", href: "https://thesmartgeneration.vercel.app/events" },
  { label: "News", href: "https://sites.google.com/view/thesmartgeneration/news" },
  { label: "Team", href: "https://thesmartgeneration.vercel.app/team" },
  { label: "Contact", href: "https://sites.google.com/view/thesmartgeneration/contact" },
];
