"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { EventItem } from "@/types";

interface PastEventTimelineProps {
  events: EventItem[];
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function PastEventTimeline({ events }: PastEventTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        Belum ada riwayat event sebelumnya.
      </p>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Vertical line */}
      <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/[0.08]" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative flex gap-6 pl-10"
          >
            {/* Dot marker */}
            <span className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-background">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
            </span>

            <div className="glass flex-1 rounded-2xl border border-white/[0.08] p-5">
              <p className="text-xs font-medium text-slate-500">
                {dateFormatter.format(new Date(event.date))}
              </p>
              <h3 className="mt-1.5 font-display text-base font-semibold text-slate-300">
                {event.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {event.description}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
