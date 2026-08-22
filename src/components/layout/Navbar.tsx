"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { navLinks } from "@/data/nav";
import { cn } from "@/lib/utils";
import { LogoModal } from "./LogoModal";

interface NavbarProps {
  shortName: string;
  logoUrl?: string;
}

export function Navbar({ shortName, logoUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 24);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHidden(true);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
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
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] px-5 py-4 transition-all duration-500 sm:px-7",
            isScrolled
              ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => logoUrl && setIsLogoModalOpen(true)}
              className={cn(
                "group flex items-center gap-3 text-left focus:outline-none",
                !logoUrl && "cursor-pointer"
              )}
            >
              {logoUrl ? (
                <span className="relative flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-xl" />
                  <Image
                    src={logoUrl}
                    alt={shortName}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                    priority
                  />
                </span>
              ) : (
                <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue text-background transition-transform duration-300 group-hover:scale-105">
                  <Zap className="h-5 w-5" strokeWidth={2.5} />
                  <span className="absolute inset-0 -z-10 rounded-xl bg-primary/40 blur-lg" />
                </span>
              )}
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                {shortName}
              </span>
            </button>
            <Link
              href="/"
              className="sr-only"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="https://sites.google.com/view/form-registrasi-tsg/registrasi-tsg"
              className="glow-cyan inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform duration-300 hover:scale-105"
            >
              Join TSG
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 glass-strong lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-center font-display text-2xl font-medium text-slate-200 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="https://sites.google.com/view/form-registrasi-tsg/registrasi-tsg"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glow-cyan mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-background"
              >
                Join TSG
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLogoModalOpen && logoUrl && (
          <LogoModal
            logoUrl={logoUrl}
            alt={shortName}
            onClose={() => setIsLogoModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}