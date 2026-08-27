import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Smartphone, Laptop, Check, X, Sparkles, Share2, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { pwaDeferredPrompt, setPwaDeferredPrompt, addToast } = useApp();
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if app is already running in standalone mode (installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleInstallClick = async () => {
    if (pwaDeferredPrompt) {
      try {
        pwaDeferredPrompt.prompt();
        const { outcome } = await pwaDeferredPrompt.userChoice;
        if (outcome === 'accepted') {
          addToast('BRANIFY App installed successfully!', 'success');
          setPwaDeferredPrompt(null);
          onClose();
        }
      } catch (err) {
        addToast('Install prompt opened in your browser.', 'info');
      }
    } else if (isIOS) {
      // iOS doesn't support beforeinstallprompt; instructions are shown in modal
    } else {
      addToast(
        'To install, click the Install / App icon (⊕ or 💻) in your browser address bar or menu (⋮) and choose "Install BRANIFY".',
        'info'
      );
    }
  };

  const modalContent = (
    <div
      id="pwa-install-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      style={{ margin: 0 }}
    >
      <div
        id="pwa-install-modal-dialog"
        className="relative w-full max-w-lg bg-[#080C12] border border-[#C9A45C]/35 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-left space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Gold Glow Accents */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#C9A45C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#E2C27B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2C27B] to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#121822] to-[#0A0E14] border border-[#C9A45C]/40 flex items-center justify-center text-[#E2C27B] shadow-lg shadow-black/60 shrink-0">
              <Download className="w-6 h-6 animate-bounce text-[#E2C27B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                  Install BRANIFY App
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] rounded-full shadow-sm font-mono">
                  PWA
                </span>
              </div>
              <p className="text-xs text-zinc-400">Desktop & Mobile instant standalone app</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-[#0E141E] hover:bg-[#182230] rounded-xl border border-white/10 hover:border-[#C9A45C]/40 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 relative z-10">
          <div className="p-3.5 bg-[#0B1017]/90 border border-[#C9A45C]/20 rounded-2xl space-y-1 hover:border-[#C9A45C]/40 transition-colors">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Zap className="w-3.5 h-3.5 text-[#E2C27B]" />
              <span>Instant Offline Tools</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Access 100+ free developer & business tools directly from your home screen or dock.
            </p>
          </div>

          <div className="p-3.5 bg-[#0B1017]/90 border border-[#C9A45C]/20 rounded-2xl space-y-1 hover:border-[#C9A45C]/40 transition-colors">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Laptop className="w-3.5 h-3.5 text-[#E2C27B]" />
              <span>Native Full-Screen UI</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Launches like a native macOS, Windows, iOS, or Android app with zero browser URL bar clutter.
            </p>
          </div>
        </div>

        {/* Conditional Installation Instructions */}
        <div className="relative z-10">
          {isInstalled ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>BRANIFY is already installed on this device! Open it from your applications or home screen.</span>
            </div>
          ) : isIOS ? (
            <div className="p-4 bg-[#0B1017] border border-[#C9A45C]/25 rounded-2xl text-xs space-y-2.5">
              <div className="font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#E2C27B]" />
                <span>How to Install on iPhone / iPad (Safari)</span>
              </div>
              <ol className="list-decimal list-inside text-zinc-300 space-y-1.5 text-[11px]">
                <li>Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-[#E2C27B]" /> <strong>Share</strong> button at the bottom of Safari.</li>
                <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
                <li>Tap <strong>Add</strong> in the top right corner.</li>
              </ol>
            </div>
          ) : pwaDeferredPrompt ? (
            <div className="space-y-3">
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 btn-gold-primary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#05080C]" />
                <span>Install BRANIFY App Now</span>
              </button>
              <p className="text-[11px] text-center text-zinc-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E2C27B]" />
                Takes 2 seconds • Zero MB storage • Safe & Secure
              </p>
            </div>
          ) : (
            <div className="p-4 bg-[#0B1017] border border-[#C9A45C]/25 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-[#E2C27B]" />
                <span>Direct 1-Click Browser Install</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Look for the <strong>Install / App icon (⊕ or 💻)</strong> on the right side of your browser address bar (Chrome, Edge, Brave), or open your browser menu <span className="text-[#E2C27B] font-mono font-bold">(⋮)</span> and click <strong>"Install BRANIFY"</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 relative z-10">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#E2C27B]" />
            <span>BRANIFY Suite PWA v2.5</span>
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
