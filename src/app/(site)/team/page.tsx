import type { Metadata } from "next";
import { Users } from "lucide-react";
import { getTeamCategories, getTeamMembers } from "@/sanity/queries";
import { TeamPageClient } from "@/components/team/TeamPageClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tim Kami",
  description:
    "Kenali seluruh generasi anggota, mentor, dan pengurus The Smart Generation (TSG).",
};

export default async function TeamPage() {
  const [categories, members] = await Promise.all([
    getTeamCategories(),
    getTeamMembers(),
  ]);

  return (
    <section className="bg-grid relative px-6 pb-24 pt-36 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <Users className="h-3.5 w-3.5" />
            Tim Kami
          </div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Setiap <span className="text-gradient">Generasi</span> TSG
          </h1>
          <p className="mt-4 text-base text-slate-400">
            Pilih kategori untuk melihat anggota, mentor, dan pengurus dari
            setiap generasi.
          </p>
        </div>

        <TeamPageClient categories={categories} members={members} />
      </div>
    </section>
  );
}
