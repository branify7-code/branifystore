import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SERVICES_MEGA_MENU,
  FREE_TOOLS_MEGA_MENU,
  PORTFOLIO_MEGA_MENU,
  PAGES_MEGA_MENU,
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
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services', menuConfig: SERVICES_MEGA_MENU },
    { title: 'Portfolio', path: '/portfolio', menuConfig: PORTFOLIO_MEGA_MENU },
    { title: 'Free Tools', path: '/tools', menuConfig: FREE_TOOLS_MEGA_MENU },
    { title: 'AI Tools', path: '/ai-tools' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <div className="xl:hidden bg-[#07090D] border-b border-[#C9A45C]/25 px-4 py-6 space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
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
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-bold text-sm flex items-center justify-between uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#C9A45C]/15 text-[#E2C27B] border border-[#C9A45C]/35'
                    : 'text-zinc-200 hover:bg-[#101620]'
                }`}
              >
                <span>{nav.title}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            );
          }

          // Accordion Item
          return (
            <div key={nav.title} className="rounded-xl overflow-hidden border border-[#C9A45C]/15 bg-[#0B0F15]">
              <div className="flex items-center justify-between p-1">
                <button
                  onClick={() => handleLinkClick(nav.path)}
                  className={`flex-1 text-left px-3 py-2.5 font-bold text-sm transition-colors uppercase tracking-wider ${
                    isActive ? 'text-[#E2C27B]' : 'text-zinc-200'
                  }`}
                >
                  {nav.title}
                </button>
                <button
                  onClick={() => toggleSection(nav.title)}
                  className="p-2.5 text-zinc-400 hover:text-white hover:bg-[#141B26] rounded-lg transition-colors"
                  aria-label={`Toggle ${nav.title} Submenu`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#E2C27B]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 space-y-4 bg-[#05070A] border-t border-[#C9A45C]/15 animate-in fade-in duration-150">
                  {nav.menuConfig.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E2C27B]">
                          {section.heading}
                        </span>
                        {section.badge && (
                          <span className="px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-black rounded">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-1 pl-1">
                        {section.items.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => handleLinkClick(item.path)}
                            className="w-full text-left py-2 px-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-[#E2C27B] hover:bg-[#101620] transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.price && (
                              <span className="text-[10px] font-mono font-bold text-[#E2C27B]">
                                {item.price}
                              </span>
                            )}
                            {item.badge && (
                              <span className="text-[8px] px-1 py-0.2 bg-[#C9A45C]/20 text-[#E2C27B] font-black rounded border border-[#C9A45C]/35">
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
                      className="w-full py-2.5 px-3 bg-[#C9A45C]/10 border border-[#C9A45C]/30 hover:bg-[#C9A45C] hover:text-black text-[#E2C27B] rounded-xl text-xs font-bold transition-all flex items-center justify-between"
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

      <div className="pt-4 border-t border-[#C9A45C]/20 space-y-3">
        {/* PWA Install Button in Drawer */}
        <button
          onClick={() => {
            if (onOpenPwaModal) {
              onOpenPwaModal();
            }
          }}
          className="w-full p-3 rounded-xl bg-[#C9A45C]/10 border border-[#C9A45C]/30 hover:bg-[#C9A45C]/20 flex items-center justify-between text-left transition-colors text-[#E2C27B]"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📲</span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Install BRANIFY App</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] rounded font-black uppercase">
                  PWA
                </span>
              </div>
              <div className="text-[10px] text-zinc-400">
                Install for offline access & full-screen UI
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#E2C27B]">Install →</span>
        </button>

        {/* Currency & Location Selector Button */}
        <button
          onClick={() => {
            if (onOpenCurrencyModal) {
              onOpenCurrencyModal();
            }
          }}
          className="w-full p-3 rounded-xl bg-[#0B0F15] border border-[#C9A45C]/25 hover:border-[#C9A45C]/50 flex items-center justify-between text-left transition-colors"
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
          <span className="text-xs text-[#E2C27B] font-semibold">Change Region →</span>
        </button>

        <button
          onClick={() => handleLinkClick('/contact')}
          className="w-full py-3.5 btn-gold-primary font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
          aria-label="Book a Consultation"
        >
          <span>BOOK A CONSULTATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

