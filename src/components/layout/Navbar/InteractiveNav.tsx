"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/nav";

interface InteractiveNavProps {
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function InteractiveNav({ handleNavClick }: InteractiveNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav 
      className="hidden items-center gap-1 lg:flex"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {navLinks.map((link, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        // Jika ada yang di-hover dan bukan item ini: sedikit mengecil, sedikit ke bawah, dan sedikit menjauh dari item yang di-hover
        let scale = 1;
        let translateY = 0;
        let translateX = 0;

        if (isHovered) {
          scale = 1.12;
          translateY = -6; // Sedikit ke atas
          translateX = 0;
        } else if (isAnyHovered) {
          scale = 0.92;
          translateY = 4; // Sedikit ke bawah
          // Menjauh dari item yang di-hover (jika di sebelah kiri, geser ke kiri; jika di sebelah kanan, geser ke kanan)
          const distance = index - hoveredIndex;
          translateX = distance * 4; 
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 ease-out hover:bg-white/10 hover:text-white"
            style={{
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              zIndex: isHovered ? 20 : 10,
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
