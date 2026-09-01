import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, Sparkles, ChevronDown, 
  Download, Globe, Layout, ShoppingBag, TrendingUp, 
  Cpu, Smartphone, Cloud, Box, ShieldCheck, QrCode, 
  Palette, FileJson, Code, FileText, PenTool, Workflow, 
  LineChart, Code2, Compass, Layers, HelpCircle, CheckCircle2 
} from 'lucide-react';
import { navItemsWithDropdowns, NavCategory, DropdownItem } from '../data/navigation';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenInquiry: () => void;
  onOpenPWA: () => void;
  isPWAInstalled?: boolean;
}

const iconComponentMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  Layout: <Layout className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  LineChart: <LineChart className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  QrCode: <QrCode className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  FileJson: <FileJson className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  PenTool: <PenTool className="w-4 h-4" />,
  Workflow: <Workflow className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
};

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenInquiry,
  onOpenPWA,
  isPWAInstalled,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (catId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (category: NavCategory) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(category.route);
  };

  const handleDropdownItemClick = (item: DropdownItem) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(item.route);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#08090B]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Branify Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('/')}
            className="group flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5C378] to-[#997A15] p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
              <div className="w-full h-full bg-[#08090B] rounded-[7px] flex items-center justify-center">
                <span className="font-display text-sm font-black tracking-tighter text-[#FFF5DC]">
                  B
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-[0.18em] text-[#FFF5DC] group-hover:text-[#F3E5AB] transition-colors">
                BRANIFY
              </span>
              <span className="text-[8.5px] uppercase tracking-[0.25em] text-white/40 -mt-1 font-mono">
                Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {/* Home button */}
            <button
              id="nav-home-btn"
              onClick={() => onNavigate('/')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentRoute === '/'
                  ? 'text-[#08090B] bg-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Home
            </button>

            {navItemsWithDropdowns.map((category) => {
              const isCurrent = currentRoute.startsWith(category.route);
              const isOpen = activeDropdown === category.id;
              const hasDropdown = category.items && category.items.length > 0;

              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    id={`nav-link-${category.id}`}
                    onClick={() => handleNavClick(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'text-[#08090B] bg-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                        : isOpen
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{category.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#D4AF37]' : 'opacity-60'
                        }`}
                      />
                    )}
                    {category.badge && !isCurrent && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                        {category.badge}
                      </span>
                    )}
                  </button>

                  {/* Mega Dropdown Menu */}
                  {hasDropdown && isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[540px] z-50 animate-fade-in">
                      <div className="rounded-2xl bg-[#0C0D12] border border-[#D4AF37]/30 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                        {/* Header of Dropdown */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 px-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                            {category.label} Directory
                          </span>
                          <button
                            onClick={() => handleNavClick(category)}
                            className="text-[11px] font-mono text-white/50 hover:text-[#FFF5DC] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Explore Hub</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Grid of Sub Items */}
                        <div className="grid grid-cols-2 gap-2">
                          {category.items!.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleDropdownItemClick(subItem)}
                              className="group p-2.5 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all text-left flex items-start gap-2.5 cursor-pointer"
                            >
                              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-[#D4AF37] group-hover:scale-105 group-hover:border-[#D4AF37]/40 transition-all shrink-0">
                                {iconComponentMap[subItem.iconName || ''] || <Sparkles className="w-4 h-4" />}
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-semibold text-[#FFF5DC] group-hover:text-[#F3E5AB] truncate">
                                    {subItem.title}
                                  </span>
                                  {subItem.badge && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-white/50 group-hover:text-white/70 line-clamp-1 font-light leading-snug">
                                  {subItem.desc}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* PWA Install Button */}
            <button
              id="header-pwa-install-btn"
              onClick={onOpenPWA}
              className="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/40 bg-white/[0.03] hover:bg-white/[0.06] text-white/80 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Install Branify PWA Web App"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isPWAInstalled ? 'App Ready' : 'Install PWA'}</span>
            </button>

            {/* Start a Project / Inquiry CTA */}
            <button
              id="header-start-project-btn"
              onClick={onOpenInquiry}
              className="group relative px-4 py-1.5 rounded-full overflow-hidden border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C378]/20 hover:from-[#D4AF37] hover:to-[#E5C378] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <div className="relative flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#F3E5AB] group-hover:text-[#08090B] transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consult</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-pwa-quick-btn"
              onClick={onOpenPWA}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#D4AF37]"
              aria-label="Install App"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              id="mobile-inquiry-quick-btn"
              onClick={onOpenInquiry}
              className="px-3 py-1.5 rounded-full bg-[#D4AF37] text-[#08090B] text-[11px] font-bold uppercase tracking-wider"
            >
              Start
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/15 bg-white/5 text-white/80 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[58px] bottom-0 bg-[#08090B]/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 p-5 space-y-4 overflow-y-auto z-50">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/');
              }}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center justify-between ${
                currentRoute === '/' ? 'bg-[#D4AF37] text-[#08090B]' : 'bg-white/5 text-white'
              }`}
            >
              <span>Home</span>
            </button>

            {navItemsWithDropdowns.map((category) => {
              const isExpanded = expandedMobileCategory === category.id;
              const hasDropdown = category.items && category.items.length > 0;

              return (
                <div key={category.id} className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between p-3">
                    <button
                      onClick={() => handleNavClick(category)}
                      className="text-left text-sm font-semibold text-[#FFF5DC] flex-1"
                    >
                      {category.label}
                    </button>

                    {hasDropdown && (
                      <button
                        onClick={() =>
                          setExpandedMobileCategory(isExpanded ? null : category.id)
                        }
                        className="p-1 rounded bg-white/5 text-white/60"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && (
                    <div className="p-3 pt-0 space-y-1.5 border-t border-white/5">
                      {category.items!.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleDropdownItemClick(sub)}
                          className="w-full p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 text-left flex items-center justify-between text-xs text-white/80"
                        >
                          <span>{sub.title}</span>
                          <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom actions inside mobile drawer */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPWA();
              }}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/15 text-xs font-mono uppercase text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Install Branify Web App (PWA)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#08090B] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
