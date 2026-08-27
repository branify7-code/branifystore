import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AnnouncementMessage {
  text: string;
  path: string;
}

const ANNOUNCEMENT_MESSAGES: AnnouncementMessage[] = [
  {
    text: '✨ SUMMER LAUNCH OFFER — GET 30% OFF ON WEBSITES & BRANDING · CLAIM OFFER',
    path: '/contact'
  },
  {
    text: '🚀 100+ FREE BROWSER UTILITIES RELEASED — NO SIGNUP REQUIRED · EXPLORE TOOLS',
    path: '/tools'
  },
  {
    text: '💎 NEW CANVA & NOTION TEMPLATES ADDED TO DIGITAL STORE · SHOP NOW',
    path: '/digital-products'
  }
];

export const AnnouncementBar: React.FC<{ navigate?: (path: string) => void }> = ({ navigate }) => {
  const { settings, announcementDismissed, setAnnouncementDismissed } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
        setIsTransitioning(false);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (!settings.announcementActive || announcementDismissed) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnnouncementDismissed(true);
    localStorage.setItem('branify_announcement_dismissed', 'true');
  };

  const currentMessage = ANNOUNCEMENT_MESSAGES[activeIdx];

  const handleClick = () => {
    if (navigate) {
      navigate(currentMessage.path);
    } else {
      window.location.href = currentMessage.path;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full bg-[#05080C] backdrop-blur-md text-white py-2 px-4 border-b border-[#C9A45C]/25 relative z-50 flex items-center justify-between text-xs tracking-wide font-medium cursor-pointer transition-colors hover:bg-[#090D14]"
    >
      {/* Top subtle gold glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2C27B]/70 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-center text-center flex-1 px-4 gap-2.5">
        <span className="inline-flex items-center gap-1.5 text-zinc-300">
          <span
            className={`transition-all duration-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs flex items-center gap-2 text-zinc-200 ${
              isTransitioning ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'
            }`}
          >
            {currentMessage.text}
          </span>
        </span>
        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] text-[#05080C] font-black text-[10px] uppercase tracking-wider shadow-sm shadow-[#C9A45C]/25 hover:brightness-110">
          Explore Now
        </span>
      </div>

      <button
        onClick={handleDismiss}
        className="p-1 hover:bg-[#C9A45C]/15 rounded-lg text-zinc-400 hover:text-[#E2C27B] transition-colors shrink-0 cursor-pointer"
        title="Dismiss announcement"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

