"use client";

import React, { useEffect, useState, useRef } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface WaterDroplet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export function WaterRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [droplets, setDroplets] = useState<WaterDroplet[]>([]);
  const requestRef = useRef<number>(0);
  const dropletsRef = useRef<WaterDroplet[]>([]);

  // Keep ref in sync for requestAnimationFrame loop
  dropletsRef.current = droplets;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const newId = Date.now();

      // Add ripple effect
      setRipples((prev) => [...prev, { id: newId, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newId));
      }, 1200);

      // Realistic pebble splash physics:
      // - Central concentrated burst (droplets shooting outward with gravity and air resistance)
      // - Varying sizes (tiny spray drops + heavier water beads)
      const splashColors = [
        "rgba(186, 230, 253, 0.95)", // Sky 200 (bright highlight)
        "rgba(56, 189, 248, 0.9)",   // Sky 400
        "rgba(14, 165, 233, 0.85)",  // Sky 500
        "rgba(199, 210, 254, 0.8)",  // Indigo 200 translucent
        "rgba(255, 255, 255, 1)",    // Pure white water glint
      ];

      const newDroplets: WaterDroplet[] = [];
      const particleCount = 20 + Math.floor(Math.random() * 8); // 20-27 realistic splash particles

      for (let i = 0; i < particleCount; i++) {
        // Distribute angles in a full circle, with higher initial upward/outward energy
        const angle = Math.random() * Math.PI * 2;
        // Realistic stone splash velocity curve (higher speed for outer droplets, lower for core)
        const speed = 1.5 + Math.random() * 7.5;
        
        // Upward bias for realistic stone entry splash (pebble impact shoots water up and out)
        const upwardBias = -2.5 - Math.random() * 4.0;

        newDroplets.push({
          id: newId + i + 1,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * (speed * 0.6) + upwardBias,
          size: 2 + Math.random() * 4.5, // 2px to 6.5px droplets
          color: splashColors[Math.floor(Math.random() * splashColors.length)],
          opacity: 1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
        });
      }

      setDroplets((prev) => [...prev, ...newDroplets]);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Hardware-accelerated high performance requestAnimationFrame loop
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.67; // Normalized to 60fps
      lastTime = currentTime;

      if (dropletsRef.current.length > 0) {
        setDroplets((prev) =>
          prev
            .map((d) => ({
              ...d,
              x: d.x + d.vx * delta,
              y: d.y + d.vy * delta,
              vy: d.vy + 0.4 * delta, // Realistic gravity acceleration
              vx: d.vx * 0.97,        // Air resistance / drag
              opacity: d.opacity - 0.025 * delta, // Smooth fade out
              rotation: d.rotation + d.rotationSpeed * delta,
            }))
            .filter((d) => d.opacity > 0 && d.y < window.innerHeight + 50)
        );
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden gpu-accelerated">
      {/* Realistic Water Ripple Rings (Transparent blue water rings only, no gray box) */}
      {ripples.map((r) => (
        <React.Fragment key={r.id}>
          {/* Primary Ripple Ring */}
          <div
            className="absolute rounded-full border-2 border-sky-300/90 bg-transparent animate-water-ripple gpu-accelerated"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate3d(-50%, -50%, 0)",
            }}
          />
          {/* Secondary Echo Ripple Ring */}
          <div
            className="absolute rounded-full border border-blue-400/70 bg-transparent animate-water-ripple-delayed gpu-accelerated"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate3d(-50%, -50%, 0)",
            }}
          />
        </React.Fragment>
      ))}

      {/* Realistic Water Droplets / Splashes */}
      {droplets.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full shadow-[0_0_6px_rgba(56,189,248,0.8)] gpu-accelerated"
          style={{
            left: d.x,
            top: d.y,
            width: `${d.size}px`,
            height: `${d.size}px`,
            backgroundColor: d.color,
            opacity: d.opacity,
            transform: `translate3d(-50%, -50%, 0) rotate(${d.rotation}deg)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
