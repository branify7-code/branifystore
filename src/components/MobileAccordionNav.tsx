import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SERVICES_MEGA_MENU,
  DIGITAL_PRODUCTS_MEGA_MENU,
  FREE_TOOLS_MEGA_MENU,
  PORTFOLIO_MEGA_MENU,
  PRICING_MEGA_MENU,
  BLOG_MEGA_MENU,
  MegaMenuConfig
} from '../data/navigationData';

interface MobileAccordionNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
  onOpenCurrencyModal?: () => void;
  onOpenPwaModal?: () => void;
}

export const MobileAccordionNav: React.FC<MobileAccordionNavProps> = ({
  currentPath,
  onNavigate,
  onClose,
  onOpenCurrencyModal,
  onOpenPwaModal
}) => {
  const { currency, detectedCountry, isAutoDetected, supportedCurrencies } = useApp();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const activeCurrencyConfig = supportedCurrencies[currency] || supportedCurrencies.USD;

  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const navConfigs: { title: string; path: string; menuConfig?: MegaMenuConfig }[] = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services', menuConfig: SERVICES_MEGA_MENU },
    { title: 'Portfolio', path: '/portfolio', menuConfig: PORTFOLIO_MEGA_MENU },
    { title: 'Digital Products', path: '/digital-products', menuConfig: DIGITAL_PRODUCTS_MEGA_MENU },
    { title: 'Free Tools', path: '/tools', menuConfig: FREE_TOOLS_MEGA_MENU },
    { title: 'AI Tools', path: '/ai-tools' },
    { title: 'Pricing', path: '/pricing', menuConfig: PRICING_MEGA_MENU },
    { title: 'Free Templates', path: '/free-templates' },
    { title: 'Blog', path: '/blog', menuConfig: BLOG_MEGA_MENU },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <div className="xl:hidden bg-[#0A0A0C] border-b border-white/10 px-4 py-6 space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
      <div className="space-y-1">
        {navConfigs.map((nav) => {
          const isExpanded = expandedSection === nav.title;
          const isActive =
            nav.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(nav.path);

          if (!nav.menuConfig) {
            // Simple single link
            return (
              <button
                key={nav.path}
                onClick={() => handleLinkClick(nav.path)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-bold text-sm flex items-center justify-between ${
                  isActive
                    ? 'bg-[#5A8DFF]/10 text-[#5A8DFF] border border-[#5A8DFF]/30'
                    : 'text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{nav.title}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            );
          }

          // Accordion Item
          return (
            <div key={nav.title} className="rounded-xl overflow-hidden border border-white/5 bg-zinc-900/40">
              <div className="flex items-center justify-between p-1">
                <button
                  onClick={() => handleLinkClick(nav.path)}
                  className={`flex-1 text-left px-3 py-2.5 font-bold text-sm transition-colors ${
                    isActive ? 'text-[#5A8DFF]' : 'text-zinc-200'
                  }`}
                >
                  {nav.title}
                </button>
                <button
                  onClick={() => toggleSection(nav.title)}
                  className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label={`Toggle ${nav.title} Submenu`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#5A8DFF]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 space-y-4 bg-zinc-950/80 border-t border-white/5 animate-in fade-in duration-150">
                  {nav.menuConfig.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#5A8DFF]">
                          {section.heading}
                        </span>
                        {section.badge && (
                          <span className="px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider bg-[#5A8DFF] text-black rounded">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-1 pl-1">
                        {section.items.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => handleLinkClick(item.path)}
                            className="w-full text-left py-2 px-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.price && (
                              <span className="text-[10px] font-mono font-bold text-[#5A8DFF]">
                                {item.price}
                              </span>
                            )}
                            {item.badge && (
                              <span className="text-[8px] px-1 py-0.2 bg-[#5A8DFF] text-black font-black rounded">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Accordion Bottom CTA */}
                  {nav.menuConfig.bottomCta && (
                    <button
                      onClick={() => handleLinkClick(nav.menuConfig!.bottomCta!.path)}
                      className="w-full py-2.5 px-3 bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 hover:bg-[#5A8DFF] hover:text-black text-[#5A8DFF] rounded-xl text-xs font-bold transition-all flex items-center justify-between"
                    >
                      <span>{nav.menuConfig.bottomCta.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/10 space-y-3">
        {/* PWA Install Button in Drawer */}
        <button
          onClick={() => {
            if (onOpenPwaModal) {
              onOpenPwaModal();
            }
          }}
          className="w-full p-3 rounded-xl bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 hover:bg-[#5A8DFF]/20 flex items-center justify-between text-left transition-colors text-[#5A8DFF]"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📲</span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Install BRANIFY App</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#5A8DFF] text-black rounded font-black uppercase">
                  PWA
                </span>
              </div>
              <div className="text-[10px] text-zinc-400">
                Install for offline access & full-screen UI
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#5A8DFF]">Install →</span>
        </button>

        {/* Currency & Location Selector Button */}
        <button
          onClick={() => {
            if (onOpenCurrencyModal) {
              onOpenCurrencyModal();
            }
          }}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{activeCurrencyConfig.flag}</span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{currency}</span>
                <span className="text-zinc-400">({activeCurrencyConfig.symbol.trim()})</span>
                {isAutoDetected && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold uppercase">
                    Auto
                  </span>
                )}
              </div>
              <div className="text-[10px] text-zinc-500">
                {detectedCountry ? `Region: ${detectedCountry.countryName}` : activeCurrencyConfig.countryName}
              </div>
            </div>
          </div>
          <span className="text-xs text-[#5A8DFF] font-semibold">Change Region →</span>
        </button>

        <button
          onClick={() => handleLinkClick('/contact')}
          className="w-full py-3.5 btn-gradient-primary font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A8DFF]"
          aria-label="Book a Consultation"
        >
          <span>BOOK A CONSULTATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
