import React from 'react';
import {
  Globe,
  LayoutGrid,
  ShoppingBag,
  ShoppingCart,
  MousePointerClick,
  Figma,
  Palette,
  Sparkles,
  Share2,
  Presentation,
  Search,
  Bot,
  TrendingUp,
  ArrowRight,
  FileText,
  FileImage,
  Braces,
  Receipt,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Tag,
  Star,
  Building2,
  Users,
  HelpCircle,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { MegaMenuConfig, NavLinkItem } from '../data/navigationData';

interface MegaMenuOverlayProps {
  config: MegaMenuConfig;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const MegaMenuOverlay: React.FC<MegaMenuOverlayProps> = ({
  config,
  onNavigate,
  onClose
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4 text-[#E2C27B]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4 text-[#E2C27B]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-[#E2C27B]" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 text-[#E2C27B]" />;
      case 'MousePointerClick': return <MousePointerClick className="w-4 h-4 text-[#E2C27B]" />;
      case 'Figma': return <Figma className="w-4 h-4 text-[#E2C27B]" />;
      case 'Palette': return <Palette className="w-4 h-4 text-[#E2C27B]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#E2C27B]" />;
      case 'Share2': return <Share2 className="w-4 h-4 text-[#E2C27B]" />;
      case 'Presentation': return <Presentation className="w-4 h-4 text-[#E2C27B]" />;
      case 'Search': return <Search className="w-4 h-4 text-[#E2C27B]" />;
      case 'Bot': return <Bot className="w-4 h-4 text-[#E2C27B]" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-[#E2C27B]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />;
    }
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#07090D]/98 backdrop-blur-2xl border-b border-[#C9A45C]/25 shadow-2xl shadow-black/90 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      role="menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SERVICES MEGA MENU */}
        {config.type === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#C9A45C]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27B]"></span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#E2C27B]">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left p-2.5 rounded-xl transition-all duration-200 group hover:bg-[#101620] border border-transparent hover:border-[#C9A45C]/30 flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-[#0B0F15] group-hover:bg-[#C9A45C]/15 border border-[#C9A45C]/15 group-hover:border-[#C9A45C]/40 transition-colors mt-0.5">
                          {getIcon(item.iconName)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-zinc-100 group-hover:text-[#E2C27B] transition-colors">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] rounded font-mono">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 group-hover:text-zinc-300">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* FREE TOOLS MEGA MENU */}
        {config.type === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <div className="pb-1.5 border-b border-[#C9A45C]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27B]"></span>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-[#E2C27B]">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left py-1 px-1.5 rounded hover:bg-[#101620] transition-colors text-xs text-zinc-300 hover:text-[#E2C27B] flex items-center justify-between"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[8px] px-1 bg-[#C9A45C]/20 text-[#E2C27B] font-bold rounded border border-[#C9A45C]/30">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* PORTFOLIO MEGA MENU */}
        {config.type === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="pb-2 border-b border-[#C9A45C]/20">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#E2C27B]">
                  Filter Portfolio By Category
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {config.sections[0].items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleLinkClick(item.path)}
                    className="p-3 bg-[#0B0F15] hover:bg-[#101620] border border-[#C9A45C]/15 hover:border-[#C9A45C]/50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-zinc-200 group-hover:text-[#E2C27B] transition-colors">
                      {item.title}
                    </div>
                    {item.desc && (
                      <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Case Study Preview */}
            <div className="bg-gradient-to-br from-[#0E141D] to-[#06080C] p-5 rounded-2xl border border-[#C9A45C]/25 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] text-[10px] font-black rounded-md">
                    FEATURED CASE STUDY
                  </span>
                  <span className="text-[10px] text-[#C9A45C] font-mono">REAL ESTATE & WEB</span>
                </div>
                <h4 className="text-base font-black text-white leading-snug mb-2 font-serif-luxury">
                  Property Atlas: Luxury Real Estate & Digital Experience
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Bespoke property showcase with high-resolution visual viewports, spec sheets, and seamless client consultation funnel.
                </p>
              </div>
              <button
                onClick={() => handleLinkClick('/portfolio/property-atlas')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E2C27B] hover:text-white transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E2C27B]" />
              </button>
            </div>
          </div>
        )}

        {/* PAGES MEGA MENU */}
        {config.type === 'pages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#C9A45C]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27B]"></span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#E2C27B]">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left p-2.5 rounded-xl transition-all duration-200 group hover:bg-[#101620] border border-transparent hover:border-[#C9A45C]/30 flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-[#0B0F15] group-hover:bg-[#C9A45C]/15 border border-[#C9A45C]/15 group-hover:border-[#C9A45C]/40 transition-colors mt-0.5 text-[#E2C27B]">
                          <Sparkles className="w-4 h-4 text-[#E2C27B]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-zinc-100 group-hover:text-[#E2C27B] transition-colors">
                            {item.title}
                          </div>
                          {item.desc && (
                            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 group-hover:text-zinc-300">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* PRICING MEGA MENU */}
        {config.type === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="pb-2 border-b border-[#C9A45C]/20 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#E2C27B]">
                    {section.heading}
                  </h3>
                  <span className="text-[10px] text-[#C9A45C] font-mono">Transparent Fixed Rates</span>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleLinkClick(item.path)}
                      className="w-full text-left p-3 rounded-xl bg-[#0B0F15] hover:bg-[#101620] border border-[#C9A45C]/15 hover:border-[#C9A45C]/40 transition-all flex items-center justify-between gap-4 group"
                    >
                      <div>
                        <div className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                          {item.title}
                        </div>
                        {item.desc && (
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {item.desc}
                          </div>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#C9A45C]/15 text-[#E2C27B] font-mono text-xs font-bold shrink-0 border border-[#C9A45C]/35">
                        {item.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BLOG MEGA MENU */}
        {config.type === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="pb-2 border-b border-[#C9A45C]/20">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#E2C27B]">
                  Blog Topics & Categories
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {config.sections[0].items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleLinkClick(item.path)}
                    className="p-2.5 bg-[#0B0F15] hover:bg-[#101620] border border-[#C9A45C]/15 hover:border-[#C9A45C]/40 rounded-xl text-left transition-colors flex items-center gap-2 group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#E2C27B]" />
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Highlight */}
            <div className="bg-[#0B0F15] p-5 rounded-2xl border border-[#C9A45C]/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] text-[9px] font-black rounded">
                    LATEST ARTICLE
                  </span>
                  <span className="text-[10px] text-zinc-400">5 min read</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug mb-2 hover:text-[#E2C27B] transition-colors cursor-pointer" onClick={() => handleLinkClick('/blog')}>
                  10 Essential Web & AI Strategies for Modern International Brands
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-3 mb-4">
                  Explore how top brands leverage speed, minimalist typography, and tailored digital experiences to drive conversion.
                </p>
              </div>
              <button
                onClick={() => handleLinkClick('/blog')}
                className="text-xs font-black text-[#E2C27B] hover:underline inline-flex items-center gap-1"
              >
                <span>Read Blog →</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        {config.bottomCta && (
          <div className="mt-8 pt-6 border-t border-[#C9A45C]/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0B0F15] p-4 rounded-xl border border-[#C9A45C]/25">
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span className="text-[#FFF6E5]">{config.bottomCta.text}</span>
              </div>
              {config.bottomCta.subtext && (
                <p className="text-xs text-zinc-400 mt-0.5">
                  {config.bottomCta.subtext}
                </p>
              )}
            </div>
            <button
              onClick={() => handleLinkClick(config.bottomCta!.path)}
              className="px-6 py-2.5 btn-gold-primary uppercase tracking-wider rounded-xl text-xs flex items-center gap-2 shrink-0 font-extrabold cursor-pointer"
            >
              <span>{config.bottomCta.linkText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

