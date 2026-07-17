"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Mail, MapPin, MessageCircle, Instagram, Youtube } from "lucide-react";
import { navLinks } from "@/data/nav";
import type { Division, SiteSettings } from "@/types";

interface FooterProps {
  divisions: Division[];
  settings: SiteSettings;
}

export function Footer({ divisions, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Ikon dipilih di kode (bukan CMS) — cuma URL-nya yang dari Sanity.
  const socialLinks = [
    settings.instagramUrl && {
      platform: "instagram",
      label: "Instagram",
      href: settings.instagramUrl,
      icon: Instagram,
    },
    settings.youtubeUrl && {
      platform: "youtube",
      label: "YouTube",
      href: settings.youtubeUrl,
      icon: Youtube,
    },
    {
      platform: "email",
      label: "Email",
      href: `mailto:${settings.contactEmail}`,
      icon: Mail,
    },
  ].filter(Boolean) as { platform: string; label: string; href: string; icon: typeof Mail }[];

  return (
    <footer className="relative border-t border-white/[0.08] px-6 pb-8 pt-16 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-2.5">
              {settings.logoUrl ? (
                <span className="relative flex h-11 w-11 items-center justify-center">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.shortName}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue text-background">
                  <Zap className="h-5 w-5" strokeWidth={2.5} />
                </span>
              )}
              <span className="font-display text-lg font-semibold text-white">
                {settings.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {settings.description}
            </p>
            <p className="mt-4 text-xs text-slate-600">
              Berdiri sejak {settings.foundedYear}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Divisi
            </h4>
            <ul className="mt-4 space-y-2.5">
              {divisions.map((division) => (
                <li key={division.id}>
                  <Link
                    href={`/divisions#${division.slug}`}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
                  >
                    {division.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Kontak
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {settings.address}
              </li>
              <li>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {settings.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors duration-200 hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                  {settings.whatsappNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-600">
            © {currentYear} {settings.name} ({settings.shortName}). All
            rights reserved.
          </p>
          <p className="text-xs text-slate-600">{settings.slogan}</p>
        </div>
      </motion.div>
    </footer>
  );
}
