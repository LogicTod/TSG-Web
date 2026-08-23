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

interface TrailSegment {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  life: number; // 1.0 -> 0.0
}

export function WaterRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [droplets, setDroplets] = useState<WaterDroplet[]>([]);
  const [segments, setSegments] = useState<TrailSegment[]>([]);

  const requestRef = useRef<number>(0);
  const dropletsRef = useRef<WaterDroplet[]>([]);
  const segmentsRef = useRef<TrailSegment[]>([]);
  
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const isMouseDownRef = useRef<boolean>(false);
  const isMovingRef = useRef<boolean>(false);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  dropletsRef.current = droplets;
  segmentsRef.current = segments;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      mousePosRef.current = currentPos;
      isMovingRef.current = true;

      // Reset inactivity stop timer
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
      stopTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 100); // 100ms without movement considers mouse stopped
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
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
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };
  }, []);

  // High-frequency physics & lifecycle loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;
      const now = Date.now();

      // Only spawn trail mist if mouse is moving AND mouse is NOT currently held down (clicked)
      const currentPos = mousePosRef.current;
      const hasMoved =
        currentPos &&
        lastMousePosRef.current &&
        (currentPos.x !== lastMousePosRef.current.x || currentPos.y !== lastMousePosRef.current.y);

      if (
        currentPos &&
        hasMoved &&
        isMovingRef.current &&
        !isMouseDownRef.current
      ) {
        if (now - lastSpawnRef.current > 45 + Math.random() * 35) {
          lastSpawnRef.current = now;
          setSegments((prev) => [
            ...prev,
            {
              id: now + Math.random(),
              x: currentPos.x + (Math.random() - 0.5) * 12,
              y: currentPos.y + (Math.random() - 0.5) * 12,
              createdAt: now,
              life: 1.0,
            },
          ]);
        }
      }

      if (currentPos) {
        lastMousePosRef.current = { ...currentPos };
      }

      // Smoothly decrement life of existing trail particles (letting existing ones fade naturally)
      setSegments((prev) =>
        prev
          .map((seg) => ({
            ...seg,
            life: seg.life - 0.015 * delta,
          }))
          .filter((seg) => seg.life > 0)
      );

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

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden gpu-accelerated">
      {/* Existing fading mist particles */}
      {segments.map((seg) => {
        const size = 6 + (1 - seg.life) * 12;
        const opacity = seg.life * 0.35;

        return (
          <div
            key={seg.id}
            className="absolute rounded-full bg-sky-300/80 blur-[2px] gpu-accelerated"
            style={{
              left: seg.x,
              top: seg.y,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              transform: "translate3d(-50%, -50%, 0)",
              willChange: "transform, opacity",
            }}
          />
        );
      })}

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