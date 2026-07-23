import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { getGalleryImages, getUniformShowcase } from "@/sanity/queries";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { UniformShowcase3D } from "@/components/gallery/UniformShowcase3D";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi kegiatan dan preview seragam resmi The Smart Generation (TSG).",
};

export default async function GalleryPage() {
  const [images, uniform] = await Promise.all([
    getGalleryImages(),
    getUniformShowcase(),
  ]);

  return (
    <div className="bg-grid relative overflow-hidden pb-10 pt-36">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
          <Camera className="h-3.5 w-3.5" />
          Galeri
        </div>
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
          Momen & <span className="text-gradient">Cerita TSG</span>
        </h1>
        <p className="mt-4 text-base text-slate-400">
          Klik salah satu foto untuk lihat ceritanya.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <GalleryPageClient images={images} />
      </div>

      {uniform && <UniformShowcase3D data={uniform} />}
    </div>
  );
}
