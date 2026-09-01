import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface AnnouncementBarProps {
  onActionClick: () => void;
  onNavigate?: (path: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onActionClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      id="announcement-bar"
      className="relative z-50 w-full bg-gradient-to-r from-[#12131A] via-[#1A1810] to-[#12131A] border-b border-[#D4AF37]/30 text-white py-2 px-3 sm:px-6 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle gold line accent at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
        {/* Left / Center content */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFF5DC] text-[10px] font-mono uppercase tracking-wider font-semibold shrink-0">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Limited Sprint</span>
          </span>

          <p className="text-white/85 text-xs font-medium truncate">
            <span className="hidden sm:inline">Next-Gen Web & AI Engineering — </span>
            <span className="text-[#FFF5DC] font-semibold">20% Off New Client Deployments</span>
            <span className="hidden md:inline text-white/50 font-mono ml-2">| CODE: BRANIFY2026</span>
          </p>

          <button
            id="announcement-claim-btn"
            onClick={onActionClick}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C378] text-[#08090B] font-bold text-[11px] uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)]"
          >
            <span>Claim</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          id="announcement-dismiss-btn"
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
