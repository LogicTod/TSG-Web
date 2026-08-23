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
  // Begitu pernah dirender sekali, simpan statusnya agar tidak di-unmount/unload total (mencegah reset animasi/glitch), 
  // namun gunakan CSS visibility/opacity atau content-visibility jika ingin performa tanpa mereset DOM state.
  // Atau simpan di sessionStorage agar tetap persistent.
  const [hasRendered, setHasRendered] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const cached = sessionStorage.getItem(`tsg_virt_${id}`);
      return cached ? JSON.parse(cached) : false;
    } catch {
      return false;
    }
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
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
        const speed = scrollDelta / timeDelta;
        if (speed > 2.2 || scrollDelta > 150) {
          scrollVelocityRef.current.fastScrollCount += 1;
        } else {
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
          const isFastScrolling = scrollVelocityRef.current.fastScrollCount > 2;

          if (entry.isIntersecting) {
            setHasRendered(true);
            setIsVisible(true);
            try {
              sessionStorage.setItem(`tsg_virt_${id}`, JSON.stringify(true));
            } catch {}
          } else {
            // Jika keluar viewport, alih-alih di-unmount total yang mereset animasi & state (glitch),
            // kita gunakan teknik content-visibility / hidden CSS atau sembunyikan dengan tetap menjaga DOM tree jika sudah pernah loaded,
            // kecuali jika memang dikehendaki tidak scroll cepat.
            if (!isFastScrolling) {
              // Sembunyikan secara visual / render ringan tapi state komponen internal tetap utuh (tidak destroy instance)
              // Atau kita hide tapi simpan state di DOM dengan CSS display:none / content-visibility: auto
              setIsVisible(false);
            }
          }
        });
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.0,
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [id]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      data-virtualizer-id={id}
      style={{
        contentVisibility: hasRendered ? "auto" : "initial",
        containIntrinsicSize: "auto 500px",
      }}
    >
      {hasRendered ? (
        <div style={{ display: isVisible ? "block" : "none" }}>
          {children}
        </div>
      ) : (
        <div style={{ minHeight: "200px" }} className="w-full flex items-center justify-center">
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