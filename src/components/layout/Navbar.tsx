"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NavbarLayout } from "./Navbar/NavbarLayout";
import { NavbarMobile } from "./Navbar/NavbarMobile";

interface NavbarProps {
  shortName: string;
  logoUrl?: string;
}

export function Navbar({ shortName, logoUrl }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 24);

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
        setIsHidden(true);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsHidden(false);
      }
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isLogoModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isLogoModalOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: isHidden ? -120 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6 gpu-accelerated"
      >
        <NavbarLayout
          shortName={shortName}
          logoUrl={logoUrl}
          isScrolled={isScrolled}
          setIsLogoModalOpen={setIsLogoModalOpen}
          handleNavClick={handleNavClick}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </motion.header>

      {/* Floating reveal button when header is hidden on scroll */}
      <AnimatePresence>
        {isHidden && !isMobileMenuOpen && (
          <motion.button
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsHidden(false)}
            aria-label="Tampilkan panel navigasi"
            className="fixed left-1/2 top-4 z-40 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full glass-strong border border-white/15 text-accent shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 sm:top-6"
          >
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      <NavbarMobile
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleNavClick={handleNavClick}
        isLogoModalOpen={isLogoModalOpen}
        setIsLogoModalOpen={setIsLogoModalOpen}
        logoUrl={logoUrl}
        shortName={shortName}
      />
    </>
  );
}
