import type { Metadata } from "next";
import { CalendarClock, History } from "lucide-react";
import { getEvents } from "@/sanity/queries";
import { EventCard } from "@/components/ui/EventCard";
import { PastEventTimeline } from "@/components/events/PastEventTimeline";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Event & Agenda",
  description:
    "Semua agenda mendatang dan riwayat kegiatan The Smart Generation (TSG).",
};

export default async function EventsPage() {
  const events = await getEvents();

  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-grid relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <CalendarClock className="h-3.5 w-3.5" />
            Event & Agenda
          </div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Semua <span className="text-gradient">Kegiatan Kami</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            Dari agenda yang akan datang sampai riwayat kegiatan yang sudah
            berlalu.
          </p>
        </div>

        {/* Upcoming events */}
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-white">
            Agenda Mendatang
          </h2>
          {upcoming.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">
              Belum ada agenda mendatang saat ini.
            </p>
          ) : (
            <div className="mt-8 flex flex-wrap items-stretch justify-center gap-6">
              {upcoming.map((event, index) => (
                <div
                  key={event.id}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <EventCard event={event} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past events timeline */}
        <div className="mt-24">
          <div className="mb-8 flex items-center justify-center gap-2">
            <History className="h-4 w-4 text-slate-500" />
            <h2 className="font-display text-xl font-semibold text-white">
              Event Sebelumnya
            </h2>
          </div>
          <PastEventTimeline events={past} />
        </div>
      </div>
    </div>
  );
}
