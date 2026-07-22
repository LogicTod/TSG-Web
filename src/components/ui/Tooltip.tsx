"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  /**
   * Arah munculnya bubble relatif ke ikon pemicunya. Default "top".
   */
  position?: "top" | "bottom";
}

/**
 * Tooltip yang dirender lewat React Portal langsung ke <body>, BUKAN
 * mengikuti posisi DOM aslinya. Ini penting karena kartu-kartu di situs
 * ini butuh `overflow-hidden` (untuk sudut membulat & foto rapi), yang
 * kalau tidak diakali akan ikut memotong tooltip yang nongol di luar
 * batas kartu. Dengan portal, tooltip diposisikan pakai koordinat layar
 * asli (`getBoundingClientRect`), jadi tidak pernah kepotong oleh
 * `overflow-hidden` milik elemen manapun di atasnya.
 */
export function Tooltip({ label, children, position = "top" }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  function updatePosition() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: position === "top" ? rect.top - 8 : rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="relative inline-flex"
        onMouseEnter={() => {
          updatePosition();
          setShow(true);
        }}
        onMouseLeave={() => setShow(false)}
        onFocus={() => {
          updatePosition();
          setShow(true);
        }}
        onBlur={() => setShow(false)}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {show && (
              <motion.span
                initial={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "fixed",
                  top: coords.top,
                  left: coords.left,
                  transform:
                    position === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0%)",
                }}
                className="pointer-events-none z-[100] whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-xl"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
