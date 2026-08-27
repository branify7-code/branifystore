import React from 'react';
import { Download, X, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();

  if (!isOpen) return null;

  const assets = [
    {
      title: 'BRANIFY Primary Logo (Transparent)',
      description: 'Horizontal wordmark with icon & tagline on transparent background. Ideal for light/dark headers & documents.',
      format: 'PNG (2400 × 720 px)',
      preview: '/branify-logo.png',
      downloadUrl: '/branify-logo.png',
      fileName: 'branify-logo.png',
      svgUrl: '/branify-logo.svg',
      isDark: false
    },
    {
      title: 'BRANIFY Primary Logo (Dark Canvas)',
      description: 'Full horizontal brand lockup pre-rendered on premium dark background container.',
      format: 'PNG (2400 × 720 px)',
      preview: '/branify-logo-dark.png',
      downloadUrl: '/branify-logo-dark.png',
      fileName: 'branify-logo-dark.png',
      svgUrl: '/branify-logo-dark.svg',
      isDark: true
    },
    {
      title: 'BRANIFY Monogram Icon Mark (Transparent)',
      description: 'The signature geometric "B" wing icon with Cobalt Blue and Silver gradients. Transparent background.',
      format: 'PNG (1024 × 1024 px)',
      preview: '/branify-icon.png',
      downloadUrl: '/branify-icon.png',
      fileName: 'branify-icon.png',
      svgUrl: '/branify-icon.svg',
      isDark: false
    },
    {
      title: 'BRANIFY Monogram Icon Mark (Dark Theme)',
      description: 'High-res icon badge on dark rounded card for avatars, app icons, and social media profiles.',
      format: 'PNG (1024 × 1024 px)',
      preview: '/branify-icon-dark.png',
      downloadUrl: '/branify-icon-dark.png',
      fileName: 'branify-icon-dark.png',
      svgUrl: '/branify-icon-dark.svg',
      isDark: true
    },
    {
      title: 'BRANIFY Vertical Emblem Lockup',
      description: 'Centered vertical brand badge featuring icon, wordmark, and tagline.',
      format: 'PNG (1200 × 1200 px)',
      preview: '/branify-logo-vertical.png',
      downloadUrl: '/branify-logo-vertical.png',
      fileName: 'branify-logo-vertical.png',
      svgUrl: '/branify-logo-vertical.svg',
      isDark: true
    }
  ];

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Downloading ${filename}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0D0E15] border border-white/15 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#5A8DFF]/15 border border-[#5A8DFF]/30 text-[#5A8DFF] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Official Brand Assets
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              BRANIFY Logo & Icon Downloads
            </h2>
            <p className="text-xs text-zinc-400">
              High-resolution PNG and vector SVG files ready for web, print, mobile apps, and media kits.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {assets.map((asset, idx) => (
            <div
              key={idx}
              className="bg-[#12131A] border border-white/10 hover:border-[#5A8DFF]/40 rounded-2xl p-4 flex flex-col justify-between space-y-4 transition-all"
            >
              {/* Asset Preview Box */}
              <div
                className={`rounded-xl p-4 flex items-center justify-center h-44 overflow-hidden border border-white/10 ${
                  asset.isDark ? 'bg-zinc-950' : 'bg-zinc-900/60'
                }`}
              >
                <img
                  src={asset.preview}
                  alt={asset.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Asset Details */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-white uppercase">{asset.title}</h3>
                  <span className="text-[10px] font-mono text-[#5A8DFF] bg-[#5A8DFF]/10 px-2 py-0.5 rounded-md font-bold">
                    {asset.format}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {asset.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => handleDownload(asset.downloadUrl, asset.fileName)}
                  className="flex-1 px-4 py-2.5 btn-gradient-primary text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-black" />
                  <span>Download PNG</span>
                </button>
                <a
                  href={asset.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                  title="Open in new tab"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer Note */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Master 300 DPI High-Resolution PNG & Scalable Vectors</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold uppercase tracking-wider text-[11px] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
