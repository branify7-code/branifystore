import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Laptop, Check, X, Sparkles, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { pwaDeferredPrompt, setPwaDeferredPrompt, addToast } = useApp();
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
      const { outcome } = await pwaDeferredPrompt.userChoice;
      if (outcome === 'accepted') {
        addToast('BRANIFY App installed successfully!', 'success');
        setPwaDeferredPrompt(null);
        onClose();
      }
    } else if (isIOS) {
      // iOS doesn't support beforeinstallprompt; instructions are shown in modal
    } else {
      addToast('To install, click the browser menu (⋮ or ⊕) and select "Install BRANIFY" or "Add to Home Screen".', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#08080A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left space-y-6">
        
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#5A8DFF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#5A8DFF] shadow-inner">
              <Download className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Install BRANIFY App</h3>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-[#5A8DFF] text-black rounded-full">PWA</span>
              </div>
              <p className="text-xs text-zinc-400">Desktop & Mobile instant app experience</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
          <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-2xl space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5A8DFF]" />
              <span>Instant Offline Access</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Use 100+ free calculators, PDF tools, and converters anywhere without internet delays.
            </p>
          </div>

          <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-2xl space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Laptop className="w-3.5 h-3.5 text-[#5A8DFF]" />
              <span>Full Screen Desktop UI</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Launches like a native macOS, Windows, iOS, or Android app with zero browser clutter.
            </p>
          </div>
        </div>

        {/* Conditional Installation Instructions */}
        {isInstalled ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs flex items-center gap-3">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>BRANIFY is already installed on this device! Open it from your applications or home screen.</span>
          </div>
        ) : isIOS ? (
          <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-2xl text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#5A8DFF]" />
              <span>Install on iPhone / iPad (Safari)</span>
            </div>
            <ol className="list-decimal list-inside text-zinc-400 space-y-1 text-[11px]">
              <li>Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-white" /> <strong>Share</strong> button at the bottom of Safari.</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>Add</strong> in the top right corner.</li>
            </ol>
          </div>
        ) : pwaDeferredPrompt ? (
          <div className="space-y-3">
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 btn-gradient-primary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Install App Now</span>
            </button>
            <p className="text-[11px] text-center text-zinc-500">Takes 2 seconds • No App Store download required • 0 MB storage</p>
          </div>
        ) : (
          <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-2xl text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-[#5A8DFF]" />
              <span>Direct Browser Install</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Click the <strong>Install / App icon (⊕ or 💻)</strong> in your browser address bar (top right on Chrome/Edge/Brave), or open your browser menu <span className="text-white font-mono">(⋮)</span> and tap <strong>"Install BRANIFY"</strong>.
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Version 2.4 Progressive Web App</span>
          <button onClick={onClose} className="hover:text-white transition-colors">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
