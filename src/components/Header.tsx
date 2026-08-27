import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Globe,
  ChevronDown,
  Download,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Currency } from '../types';
import { BranifyLogo } from './BranifyLogo';
import { MegaMenuOverlay } from './MegaMenuOverlay';
import { MobileAccordionNav } from './MobileAccordionNav';
import { CurrencySelectorModal } from './CurrencySelectorModal';
import { PWAInstallModal } from './PWAInstallModal';
import {
  SERVICES_MEGA_MENU,
  FREE_TOOLS_MEGA_MENU,
  PORTFOLIO_MEGA_MENU,
  PAGES_MEGA_MENU,
  MegaMenuConfig
} from '../data/navigationData';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const {
    currency,
    detectedCountry,
    isAutoDetected,
    supportedCurrencies,
    cart,
    setIsSearchOpen,
    pwaDeferredPrompt
  } = useApp();

  const [activeMegaMenu, setActiveMegaMenu] = useState<
    'services' | 'tools' | 'portfolio' | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activeCurrencyConfig = supportedCurrencies[currency] || supportedCurrencies.USD;

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsCurrencyModalOpen(false);
        setIsMobileMenuOpen(false);
        setIsPwaModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnterLink = (
    menuType: 'services' | 'tools' | 'portfolio'
  ) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(menuType);
  };

  const handleMouseLeaveHeader = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const getMegaMenuConfig = (): MegaMenuConfig | null => {
    switch (activeMegaMenu) {
      case 'services': return SERVICES_MEGA_MENU;
      case 'tools': return FREE_TOOLS_MEGA_MENU;
      case 'portfolio': return PORTFOLIO_MEGA_MENU;
      default: return null;
    }
  };

  const activeConfig = getMegaMenuConfig();

  const handlePwaClick = () => {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
    } else {
      setIsPwaModalOpen(true);
    }
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleMouseLeaveHeader}
      className="sticky top-0 left-0 right-0 w-full z-40 bg-[#06080C]/95 backdrop-blur-xl border-b border-[#C9A45C]/20 transition-all"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-20 flex items-center justify-between gap-3 lg:gap-5">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="focus:outline-none shrink-0 cursor-pointer"
          aria-label="BRANIFY Home"
        >
          <BranifyLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-1 lg:gap-1.5 2xl:gap-2 text-[13px] font-semibold text-zinc-300 tracking-wide uppercase font-sans"
          aria-label="Main Navigation"
        >
          {/* Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative flex items-center cursor-pointer ${
              currentPath === '/'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
          >
            <span>HOME</span>
            {currentPath === '/' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* About Link */}
          <button
            onClick={() => handleNavClick('/about')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative flex items-center cursor-pointer ${
              currentPath === '/about'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
          >
            <span>ABOUT</span>
            {currentPath === '/about' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* Services Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('services')}
            onClick={() => handleNavClick('/services')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative whitespace-nowrap cursor-pointer ${
              currentPath.startsWith('/services') || activeMegaMenu === 'services'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
            aria-expanded={activeMegaMenu === 'services'}
          >
            <span>SERVICES</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                activeMegaMenu === 'services' ? 'rotate-180 text-[#E2C27B]' : 'text-zinc-400'
              }`}
            />
            {currentPath.startsWith('/services') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* Portfolio Category Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('portfolio')}
            onClick={() => handleNavClick('/portfolio')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 relative whitespace-nowrap cursor-pointer ${
              currentPath.startsWith('/portfolio') || currentPath.startsWith('/profolio') || activeMegaMenu === 'portfolio'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
            aria-expanded={activeMegaMenu === 'portfolio'}
          >
            <span>PORTFOLIO</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                activeMegaMenu === 'portfolio' ? 'rotate-180 text-[#E2C27B]' : 'text-zinc-400'
              }`}
            />
            {(currentPath.startsWith('/portfolio') || currentPath.startsWith('/profolio')) && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* Free Tools Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('tools')}
            onClick={() => handleNavClick('/tools')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 relative whitespace-nowrap cursor-pointer ${
              currentPath.startsWith('/free-tools') || currentPath.startsWith('/tools') || activeMegaMenu === 'tools'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
            aria-expanded={activeMegaMenu === 'tools'}
          >
            <span>FREE TOOLS</span>
            <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#C9A45C]/20 text-[#E2C27B] border border-[#C9A45C]/35 rounded-full shrink-0 shadow-sm font-mono">
              100+
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                activeMegaMenu === 'tools' ? 'rotate-180 text-[#E2C27B]' : 'text-zinc-400'
              }`}
            />
            {(currentPath.startsWith('/free-tools') || currentPath.startsWith('/tools')) && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* AI Tools Link */}
          <button
            onClick={() => handleNavClick('/ai-tools')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 relative whitespace-nowrap cursor-pointer ${
              currentPath.startsWith('/ai-tools')
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
          >
            <span>AI TOOLS</span>
            <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] rounded-full shrink-0 shadow-sm font-mono">
              27+
            </span>
            {currentPath.startsWith('/ai-tools') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>

          {/* Contact Link */}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative cursor-pointer ${
              currentPath === '/contact'
                ? 'text-[#E2C27B] font-bold bg-[#C9A45C]/10 border border-[#C9A45C]/25 shadow-sm'
                : 'hover:text-[#E2C27B] hover:bg-white/[0.04]'
            }`}
          >
            CONTACT
            {currentPath === '/contact' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FFF6E5] via-[#E2C27B] to-[#C9A45C] rounded-full"></span>
            )}
          </button>
        </nav>

        {/* Right Actions & CTA Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* PWA Install Button */}
          <button
            onClick={handlePwaClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A45C]/10 hover:bg-[#C9A45C]/20 text-[#E2C27B] border border-[#C9A45C]/30 hover:border-[#C9A45C]/50 rounded-full text-xs font-bold transition-all shadow-sm group cursor-pointer"
            title="Install BRANIFY App on your Device"
            aria-label="Install App"
          >
            <Smartphone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-[#E2C27B]" />
            <span className="hidden lg:inline-block">Install App</span>
          </button>

          {/* Compact Utility Icon Cluster (Search, Currency, Cart) */}
          <div className="flex items-center gap-1.5 bg-[#0B0F15] border border-[#C9A45C]/25 rounded-full px-2.5 py-1">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-zinc-300 hover:text-[#E2C27B] hover:bg-[#C9A45C]/10 rounded-full transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Search Services, Portfolio, Tools... (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Currency Selector */}
            <button
              onClick={() => setIsCurrencyModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 hover:bg-[#C9A45C]/10 rounded-full text-xs font-bold text-zinc-200 transition-all cursor-pointer group"
              aria-label="Select Currency and Country Region"
              title={`Currency: ${currency} (${activeCurrencyConfig.name})`}
            >
              <span className="text-sm">{activeCurrencyConfig.flag}</span>
              <span className="text-white group-hover:text-[#E2C27B] transition-colors">{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-[#E2C27B] transition-transform" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => handleNavClick('/cart')}
              className="p-1.5 text-zinc-300 hover:text-[#E2C27B] hover:bg-[#C9A45C]/10 rounded-full transition-colors relative cursor-pointer"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

          {/* Book a Consultation CTA */}
          <button
            onClick={() => handleNavClick('/contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 lg:px-6 py-2.5 btn-gold-primary rounded-full uppercase tracking-wider text-[11px] lg:text-xs font-extrabold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] cursor-pointer"
            aria-label="Book a Consultation"
          >
            BOOK A CONSULTATION
          </button>

          {/* Mobile / Tablet Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-zinc-300 hover:text-white bg-[#0B0F15] border border-[#C9A45C]/25 rounded-xl shrink-0 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#E2C27B]" /> : <Menu className="w-5 h-5 text-[#E2C27B]" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Overlay */}
      {activeConfig && (
        <MegaMenuOverlay
          config={activeConfig}
          onNavigate={handleNavClick}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* Mobile Accordion Drawer */}
      {isMobileMenuOpen && (
        <MobileAccordionNav
          currentPath={currentPath}
          onNavigate={handleNavClick}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenCurrencyModal={() => {
            setIsMobileMenuOpen(false);
            setIsCurrencyModalOpen(true);
          }}
          onOpenPwaModal={() => {
            setIsMobileMenuOpen(false);
            setIsPwaModalOpen(true);
          }}
        />
      )}

      {/* Country & Currency Selector Modal */}
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />
    </header>
  );
};
