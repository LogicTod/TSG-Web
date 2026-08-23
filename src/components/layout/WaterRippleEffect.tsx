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

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export function WaterRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [droplets, setDroplets] = useState<WaterDroplet[]>([]);
  const [trailPoints, setTrailPoints] = useState<Point[]>([]);

  const requestRef = useRef<number>(0);
  const dropletsRef = useRef<WaterDroplet[]>([]);
  const trailRef = useRef<Point[]>([]);

  dropletsRef.current = droplets;
  trailRef.current = trailPoints;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const newPoint: Point = { x: e.clientX, y: e.clientY, timestamp: now };

      // Keep points within 2000ms window
      setTrailPoints((prev) => {
        const filtered = prev.filter((p) => now - p.timestamp < 2000);
        return [...filtered, newPoint];
      });
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const newId = Date.now();

      // Add ripple effect
      setRipples((prev) => [...prev, { id: newId, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newId));
      }, 1200);

      // Realistic stone splash physics
      const splashColors = [
        "rgba(186, 230, 253, 0.95)",
        "rgba(56, 189, 248, 0.9)",
        "rgba(14, 165, 233, 0.85)",
        "rgba(199, 210, 254, 0.8)",
        "rgba(255, 255, 255, 1)",
      ];

      const newDroplets: WaterDroplet[] = [];
      const particleCount = 20 + Math.floor(Math.random() * 8);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 7.5;
        const upwardBias = -2.5 - Math.random() * 4.0;

        newDroplets.push({
          id: newId + i + 1,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * (speed * 0.6) + upwardBias,
          size: 2 + Math.random() * 4.5,
          color: splashColors[Math.floor(Math.random() * splashColors.length)],
          opacity: 1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
        });
      }

      setDroplets((prev) => [...prev, ...newDroplets]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Hardware-accelerated animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;
      const now = Date.now();

      // Smoothly filter out expired trail points (> 2000ms)
      if (trailRef.current.length > 0) {
        setTrailPoints((prev) => prev.filter((p) => now - p.timestamp < 2000));
      }

      // Update water droplets physics
      if (dropletsRef.current.length > 0) {
        setDroplets((prev) =>
          prev
            .map((d) => ({
              ...d,
              x: d.x + d.vx * delta,
              y: d.y + d.vy * delta,
              vy: d.vy + 0.4 * delta,
              vx: d.vx * 0.97,
              opacity: d.opacity - 0.025 * delta,
              rotation: d.rotation + d.rotationSpeed * delta,
            }))
            .filter((d) => d.opacity > 0 && d.y < window.innerHeight + 50)
        );
      }

      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const now = Date.now();
  const activeTrail = trailPoints.filter((p) => now - p.timestamp < 2000);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden gpu-accelerated">
      {/* Mouse Motion Trail with Segment-based Smooth Alpha Fading */}
      {activeTrail.length > 1 && (
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          <defs>
            <linearGradient id="trailFade" x1="0%" y1="0%" x2="100%" y2="100%">
              {activeTrail.map((p, idx) => {
                const age = now - p.timestamp;
                const progress = Math.max(0, Math.min(1, 1 - age / 2000));
                const offset = `${(idx / (activeTrail.length - 1)) * 100}%`;
                return (
                  <stop
                    key={idx}
                    offset={offset}
                    stopColor="rgba(56, 189, 248, 0.6)"
                    stopOpacity={progress}
                  />
                );
              })}
            </linearGradient>
          </defs>
          <path
            d={`M ${activeTrail.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
            fill="none"
            stroke="url(#trailFade)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gpu-accelerated drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          />
        </svg>
      )}

      {/* Realistic Water Ripple Rings */}
      {ripples.map((r) => (
        <React.Fragment key={r.id}>
          <div
            className="absolute rounded-full border-2 border-sky-300/90 bg-transparent animate-water-ripple gpu-accelerated"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate3d(-50%, -50%, 0)",
            }}
          />
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
