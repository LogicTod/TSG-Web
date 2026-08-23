"use client";

import React, { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Droplet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export function WaterRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [droplets, setDroplets] = useState<Droplet[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Jangan trigger kalau klik di form input/button/interactive elements yang butuh native click
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']")
      ) {
        // Tetap boleh munculkan efek tipis atau langsung jalankan
      }

      const x = e.clientX;
      const y = e.clientY;
      const newId = Date.now();

      // Tambah ripple utama
      setRipples((prev) => [...prev, { id: newId, x, y }]);

      // Bersihkan ripple setelah animasi selesai (1000ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newId));
      }, 1000);

      // Buat percikan air (droplets / splashes)
      const dropletColors = [
        "rgba(56, 189, 248, 0.9)", // Sky blue
        "rgba(14, 165, 233, 0.8)", // Cyan
        "rgba(96, 165, 250, 0.8)", // Blue
        "rgba(255, 255, 255, 0.9)", // White splash highlight
      ];

      const newDroplets: Droplet[] = [];
      const count = 12 + Math.floor(Math.random() * 6); // 12-17 percikan

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        newDroplets.push({
          id: newId + i + 1,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // Sedikit ke atas
          size: 3 + Math.random() * 5,
          color: dropletColors[Math.floor(Math.random() * dropletColors.length)],
          opacity: 1,
        });
      }

      setDroplets((prev) => [...prev, ...newDroplets]);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Animasi loop untuk droplets
  useEffect(() => {
    if (droplets.length === 0) return;

    let animationFrameId: number;

    const updateDroplets = () => {
      setDroplets((prev) =>
        prev
          .map((d) => ({
            ...d,
            x: d.x + d.vx,
            y: d.y + d.vy,
            vy: d.vy + 0.35, // Efek gravitasi
            opacity: d.opacity - 0.03, // Fade out
          }))
          .filter((d) => d.opacity > 0)
      );

      animationFrameId = requestAnimationFrame(updateDroplets);
    };

    animationFrameId = requestAnimationFrame(updateDroplets);
    return () => cancelAnimationFrame(animationFrameId);
  }, [droplets.length > 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Gelombang Air / Ripple Rings */}
      {ripples.map((r) => (
        <React.Fragment key={r.id}>
          {/* Ring 1 */}
          <div
            className="absolute rounded-full border-2 border-cyan-400/80 bg-cyan-500/15 animate-water-ripple"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Ring 2 (Delay effect) */}
          <div
            className="absolute rounded-full border border-sky-300/60 bg-sky-400/10 animate-water-ripple-delayed"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Central Splash Dot */}
          <div
            className="absolute rounded-full bg-white animate-water-center"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        </React.Fragment>
      ))}

      {/* Percikan Air / Droplets */}
      {droplets.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          style={{
            left: d.x,
            top: d.y,
            width: `${d.size}px`,
            height: `${d.size}px`,
            backgroundColor: d.color,
            opacity: d.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
