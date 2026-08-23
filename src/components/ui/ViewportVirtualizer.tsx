"use client";

import React, { useState, useEffect, useRef } from "react";

interface ViewportVirtualizerProps {
  id: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ViewportVirtualizer({
  id,
  children,
  fallback,
  className = "",
}: ViewportVirtualizerProps) {
  const [isRendered, setIsRendered] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const cached = sessionStorage.getItem(`tsg_virt_${id}`);
      return cached ? JSON.parse(cached) : false;
    } catch {
      return false;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocityRef = useRef<{ lastScrollY: number; lastTime: number; fastScrollCount: number }>({
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
    lastTime: typeof window !== "undefined" ? Date.now() : 0,
    fastScrollCount: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = now - scrollVelocityRef.current.lastTime;
      const scrollDelta = Math.abs(currentScrollY - scrollVelocityRef.current.lastScrollY);

      if (timeDelta > 0) {
        const speed = scrollDelta / timeDelta; // pixels per ms
        // Jika scroll sangat cepat (> 2.5 px/ms atau delta scroll besar dalam waktu singkat)
        if (speed > 2.2 || scrollDelta > 150) {
          scrollVelocityRef.current.fastScrollCount += 1;
        } else {
          // decay fast scroll count slowly
          scrollVelocityRef.current.fastScrollCount = Math.max(
            0,
            scrollVelocityRef.current.fastScrollCount - 0.5
          );
        }
      }

      scrollVelocityRef.current.lastScrollY = currentScrollY;
      scrollVelocityRef.current.lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jika user scroll cepat dan berulang, cegah unload/hide mekanisme agar tidak flickering/lag
          const isFastScrolling = scrollVelocityRef.current.fastScrollCount > 2;

          if (entry.isIntersecting) {
            setIsRendered(true);
            try {
              sessionStorage.setItem(`tsg_virt_${id}`, JSON.stringify(true));
            } catch {}
          } else {
            // Unload hanya jika tidak sedang scroll cepat berulang
            if (!isFastScrolling) {
              // Berikan sedikit jeda atau threshold agar tidak langsung unload pas keluar dikit
              setIsRendered(false);
              try {
                sessionStorage.setItem(`tsg_virt_${id}`, JSON.stringify(false));
              } catch {}
            }
          }
        });
      },
      {
        rootMargin: "200px 0px", // Margin toleransi agar mulus saat mendekati viewport
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [id]);

  // Jika belum pernah dirender dan belum ada di session, ukur tinggi/placeholder agar layout tidak loncat
  return (
    <div ref={containerRef} className={className} data-virtualizer-id={id}>
      {isRendered ? (
        children
      ) : (
        <div style={{ minHeight: "150px" }} className="w-full flex items-center justify-center">
          {fallback || (
            <div className="py-12 text-zinc-500 text-sm animate-pulse">
              Memuat bagian...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
