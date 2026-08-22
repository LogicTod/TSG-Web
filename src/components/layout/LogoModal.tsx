"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface LogoModalProps {
  logoUrl: string;
  alt: string;
  onClose: () => void;
}

export function LogoModal({ logoUrl, alt, onClose }: LogoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative flex max-h-[90vh] max-w-3xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-white transition-colors hover:bg-background hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex h-[60vh] w-[70vw] max-w-xl items-center justify-center">
          <Image
            src={logoUrl}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 600px"
            priority
          />
        </div>

        <p className="mt-6 font-display text-lg font-semibold tracking-wide text-white">
          {alt}
        </p>
      </motion.div>
    </motion.div>
  );
}
