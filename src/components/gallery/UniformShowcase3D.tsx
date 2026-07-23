"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { RotateCw } from "lucide-react";
import type { UniformShowcase } from "@/types";

interface UniformShowcase3DProps {
  data: UniformShowcase;
}

// Radius of the "drum" -- distance each face sits from the center axis.
const RADIUS = 210;

/**
 * Bukan model 3D asli (mesh/poligon) -- ini 4 foto (depan/kanan/belakang/
 * kiri) yang disusun jadi permukaan "drum" di ruang 3D CSS asli
 * (perspective + rotateY + translateZ), lalu drum-nya diputar lewat
 * drag. Karena benar-benar pakai transform 3D CSS (bukan cuma ganti-ganti
 * gambar), hasilnya tetap terasa seperti objek 3D yang diputar 360°.
 */
export function UniformShowcase3D({ data }: UniformShowcase3DProps) {
  const rotateY = useMotionValue(0);
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });
  const dragStartRotation = useRef(0);

  function handleDragStart() {
    dragStartRotation.current = rotateY.get();
  }

  function handleDrag(_: unknown, info: PanInfo) {
    // ~1.2px of drag = 1 degree of rotation.
    rotateY.set(dragStartRotation.current + info.offset.x / 1.2);
  }

  function handleDragEnd() {
    // Snap to the nearest 90deg face (front/right/back/left).
    const current = rotateY.get();
    const snapped = Math.round(current / 90) * 90;
    rotateY.set(snapped);
  }

  const glowOpacity = useTransform(
    smoothRotateY,
    [0, 45, 90, 135, 180, 225, 270, 315, 360],
    [0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6]
  );

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">
          <RotateCw className="h-4 w-4 text-accent" />
          Geser untuk memutar 360°
        </p>
      </div>

      {/* Floating stage */}
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-14 flex justify-center"
        style={{ perspective: 1400 }}
      >
        {/* Spotlight glow above */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-[90px]"
        />
        {/* Ground shadow */}
        <div className="pointer-events-none absolute left-1/2 top-[380px] h-6 w-52 -translate-x-1/2 rounded-full bg-black/50 blur-xl" />

        <motion.div
          drag="x"
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="relative cursor-grab touch-none active:cursor-grabbing"
          style={{
            width: 300,
            height: 380,
            transformStyle: "preserve-3d",
            rotateY: smoothRotateY,
          }}
        >
          <Face image={data.front} label="Depan" rotate={0} />
          <Face image={data.right} label="Kanan" rotate={90} />
          <Face image={data.back} label="Belakang" rotate={180} />
          <Face image={data.left} label="Kiri" rotate={270} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Face({
  image,
  label,
  rotate,
}: {
  image: string;
  label: string;
  rotate: number;
}) {
  return (
    <div
      className="glass-strong absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl border border-white/10"
      style={{
        transform: `rotateY(${rotate}deg) translateZ(${RADIUS}px)`,
        backfaceVisibility: "hidden",
      }}
    >
      <Image
        src={image}
        alt={`Seragam TSG tampak ${label.toLowerCase()}`}
        fill
        className="object-cover"
        sizes="300px"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/10" />
    </div>
  );
}
