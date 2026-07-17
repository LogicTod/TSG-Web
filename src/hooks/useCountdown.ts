"use client";

import { useEffect, useState } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  isPast: boolean;
}

function computeCountdown(targetDate: string): CountdownResult {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes, isPast: false };
}

/**
 * Returns a live countdown to `targetDate` (ISO string), refreshed every
 * minute. Starts as null on the server and fills in after mount, so the
 * displayed value never mismatches between server and client render.
 */
export function useCountdown(targetDate: string): CountdownResult | null {
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);

  useEffect(() => {
    setCountdown(computeCountdown(targetDate));
    const interval = setInterval(() => {
      setCountdown(computeCountdown(targetDate));
    }, 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
