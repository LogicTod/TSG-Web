"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useMousePosition } from "@/hooks/useMousePosition";
import { iconMap } from "@/lib/icon-map";
import type { HeroContent, Division } from "@/types";

interface HeroProps {
  content: HeroContent;
  divisions: Division[];
  foundedYear: number;
}

// Fixed, deterministic particle positions to avoid hydration mismatches
// (Math.random() during render would differ between server and client).
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 9) * 1.4}s`,
  duration: `${10 + (i % 6) * 2}s`,
}));

export function Hero({ content, divisions, foundedYear }: HeroProps) {
  const { containerRef, position } = useMousePosition<HTMLDivElement>();
  const panelDivisions = divisions.slice(0, 4);

  return (
    <section
      ref={containerRef}
      className="bg-grid relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16"
    >
      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, rgba(34,211,238,0.10), transparent 70%)`,
        }}
      />

      {/* Ambient corner glows */}
      <div className="animate-pulse-glow pointer-events-none absolute -left-32 top-24 -z-10 h-[380px] w-[380px] rounded-full bg-blue/25 blur-[100px]" />
      <div className="animate-pulse-glow pointer-events-none absolute -right-24 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] [animation-delay:1.5s]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-particle absolute bottom-0 h-1 w-1 rounded-full bg-accent/70"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              {content.eyebrow}
            </div>
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400">
              Berdiri sejak {foundedYear}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {content.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="text-gradient block">{content.highlightWord}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              href={content.primaryCta.href}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="secondary" size="lg">
              {content.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4"
          >
            {content.stats.map((stat) => (
              <div key={stat.id}>
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column: real divisions panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="animate-float glass-strong glow-cyan relative mx-auto max-w-sm rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                Divisi Kami
              </span>
              <span className="flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
            </div>

            <div className="space-y-3">
              {panelDivisions.map((division, i) => {
                const Icon = iconMap[division.icon] ?? iconMap.Bot;
                return (
                  <motion.div
                    key={division.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="glass flex items-center gap-3 rounded-xl px-4 py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/15 text-primary">
                      {division.logoUrl ? (
                        <Image
                          src={division.logoUrl}
                          alt={division.name}
                          width={28}
                          height={28}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-slate-200">
                        {division.name}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        {division.tagline}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Small floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="animate-float-slow glass-strong glow-blue absolute -bottom-8 -left-10 rounded-xl px-5 py-4"
          >
            <p className="text-2xl font-bold text-white">{divisions.length}</p>
            <p className="text-xs text-slate-400">Divisions Active</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
