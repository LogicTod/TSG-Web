import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { getProjects } from "@/sanity/queries";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Project",
  description:
    "Kumpulan project yang sudah, sedang, dan akan dikerjakan anggota The Smart Generation (TSG).",
};

export default async function ProjectListPage() {
  const projects = await getProjects();

  return (
    <div className="bg-grid relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <FolderKanban className="h-3.5 w-3.5" />
            Project
          </div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Karya Nyata <span className="text-gradient">Anggota TSG</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            Dari yang sudah rampung, sedang digarap, sampai yang baru
            direncanakan.
          </p>
        </div>

        <ProjectPageClient projects={projects} />
      </div>
    </div>
  );
}
