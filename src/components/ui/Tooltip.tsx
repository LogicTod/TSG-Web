"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Tooltip hover ringan -- dipakai di icon badge & achievement. Sengaja
 * pakai opacity/scale saja (bukan animasi ukuran/posisi berat) supaya
 * responsif dan tidak nge-lag, konsisten dengan pola animasi lain di
 * situs ini.
 */
export function Tooltip({ label, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
