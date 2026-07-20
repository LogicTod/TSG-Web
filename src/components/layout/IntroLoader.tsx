"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TOTAL_DURATION = 9000;

export function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);

    const seen = sessionStorage.getItem("tsg-intro-seen");

    if (!seen) {
      sessionStorage.setItem("tsg-intro-seen", "1");
      setShow(true);
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

    const timer = setTimeout(() => {
      setShow(false);
    }, TOTAL_DURATION);

    return () => clearTimeout(timer);
  }, [show]);

  if (!mounted) return null;

  const wordAnimation = (
    delay: number
  ) => ({
    initial: {
      opacity: 0,
      y: 35,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      delay,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
        >
          {/* Background Glow */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 2.5,
            }}
            className="absolute h-[340px] w-[340px] rounded-full bg-cyan-400/10 blur-[140px]"
          />

          <div className="relative select-none">

            <div className="text-center leading-none">

              {/* ===================== */}
              {/* BARIS PERTAMA */}
              {/* ===================== */}

              <div className="flex justify-center gap-5">

                <motion.span
                  {...wordAnimation(0.4)}
                  className="font-display text-5xl font-bold text-white sm:text-7xl"
                >
                  Together
                </motion.span>

                <motion.span
                  {...wordAnimation(2.2)}
                  className="font-display text-5xl font-bold text-white sm:text-7xl"
                >
                  We Make
                </motion.span>

              </div>

              {/* ===================== */}
              {/* BARIS KEDUA */}
              {/* ===================== */}

              <div className="mt-6 flex justify-center gap-5">

                <motion.span
                  {...wordAnimation(4.2)}
                  className="font-display text-5xl font-bold text-white sm:text-7xl"
                >
                  A Better
                </motion.span>

                <motion.span
                  {...wordAnimation(6.2)}
                  className="font-display text-5xl font-bold text-white sm:text-7xl"
                >
                  Future
                </motion.span>

              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}