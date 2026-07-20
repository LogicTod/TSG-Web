"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLOGAN_PARTS = ["Together", "We Make", "A Better", "Future"];
const WORD_DURATION = 750; // ms tiap kata tampil
const HOLD_AFTER_LAST = 2000; // ms jeda setelah kata terakhir sebelum hilang

/**
 * Splash screen intro -- muncul cuma SEKALI per sesi browser (dicek lewat
 * sessionStorage), bukan tiap kali pindah halaman. Kalau tab ditutup lalu
 * dibuka lagi, intro ini akan muncul lagi.
 */
export function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const alreadySeen = sessionStorage.getItem("tsg-intro-seen");
    if (!alreadySeen) {
      setShow(true);
      sessionStorage.setItem("tsg-intro-seen", "1");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;

    if (wordIndex < SLOGAN_PARTS.length - 1) {
      const timer = setTimeout(() => setWordIndex((i) => i + 1), WORD_DURATION);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setShow(false), WORD_DURATION + HOLD_AFTER_LAST);
    return () => clearTimeout(timer);
  }, [wordIndex, show]);

  // Belum tahu status sessionStorage saat render pertama (server) -- jangan
  // render apa pun dulu supaya tidak ada flash/mismatch.
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-grid fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient font-display text-4xl font-bold sm:text-6xl"
            >
              {SLOGAN_PARTS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
