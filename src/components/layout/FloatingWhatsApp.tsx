"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const [showBubble, setShowBubble] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const waNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Halo TSG, saya ingin bertanya."
  )}`;

  useEffect(() => {
    const showTimer = setTimeout(() => setShowBubble(true), 2000);
    const initialHideTimer = setTimeout(() => setShowBubble(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(initialHideTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setShowBubble(true);
  };

  const handleMouseLeave = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 5000);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gpu-accelerated"
    >
      {/* Speech bubble hint */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="glass-strong absolute bottom-[168px] right-0 w-48 rounded-2xl rounded-br-sm px-4 py-3 text-xs text-slate-200 shadow-lg"
          >
            Butuh bantuan? Klik tombol WA ini ya 👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot mascot character */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-auto -mb-3 drop-shadow-[0_10px_20px_rgba(6,182,212,0.35)] cursor-pointer"
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="botBody" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <radialGradient id="botGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hover thruster glow beneath the body */}
          <motion.ellipse
            cx="50"
            cy="86"
            rx="20"
            ry="5"
            fill="url(#botGlow)"
            animate={{ opacity: [0.9, 0.4, 0.9], scaleX: [1, 0.85, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Antenna */}
          <line x1="50" y1="10" x2="50" y2="20" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            cx="50"
            cy="8"
            r="4.5"
            fill="#22D3EE"
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />

          {/* Waving arm (left) */}
          <motion.rect
            x="10"
            y="42"
            width="10"
            height="20"
            rx="5"
            fill="url(#botBody)"
            animate={{ rotate: [0, -28, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.8 }}
            style={{ transformOrigin: "18px 44px" }}
          />

          {/* Static arm (right) */}
          <rect x="80" y="46" width="10" height="18" rx="5" fill="url(#botBody)" />

          {/* Body */}
          <rect x="18" y="18" width="64" height="64" rx="26" fill="url(#botBody)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

          {/* Face plate */}
          <rect x="29" y="32" width="42" height="30" rx="14" fill="#050B18" />

          {/* Eyes */}
          <motion.rect
            x="37"
            y="43"
            width="8"
            height="8"
            rx="4"
            fill="#22D3EE"
            animate={{ scaleY: [1, 0.15, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6 }}
            style={{ transformOrigin: "41px 47px" }}
          />
          <motion.rect
            x="55"
            y="43"
            width="8"
            height="8"
            rx="4"
            fill="#22D3EE"
            animate={{ scaleY: [1, 0.15, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6 }}
            style={{ transformOrigin: "59px 47px" }}
          />

          {/* Smile */}
          <path
            d="M40 54 Q50 60 60 54"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Chest light */}
          <motion.circle
            cx="50"
            cy="72"
            r="4"
            fill="#22D3EE"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Sparkles */}
          <motion.circle
            cx="14"
            cy="24"
            r="1.6"
            fill="#22D3EE"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.circle
            cx="88"
            cy="30"
            r="2"
            fill="#22D3EE"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 1.1 }}
          />
        </svg>
      </motion.div>

      {/* WhatsApp button */}
      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi TSG lewat WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_-6px_rgba(37,211,102,0.7)]"
      >
        <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      </motion.a>
    </div>
  );
}