import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Plus,
  Bot,
  Palette,
  Code2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface Hero3DExperienceProps {
  navigate: (path: string) => void;
}

export const Hero3DExperience: React.FC<Hero3DExperienceProps> = ({ navigate }) => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Smooth mouse parallax interpolation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMousePos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY))
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax rotation & translation values
  const rotX = isHovered ? -mousePos.y * 6 : 0;
  const rotY = isHovered ? mousePos.x * 8 : 0;
  const transX = isHovered ? mousePos.x * 10 : 0;
  const transY = isHovered ? mousePos.y * 8 : 0;

  // Rich multi-tier golden floating dust particles (inspired by the golden bokeh dust image)
  const particles = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => {
      const type = i % 7 === 0 ? 'bokeh' : i % 3 === 0 ? 'sparkle' : 'flake';
      const size =
        type === 'bokeh'
          ? (i % 3) + 7 // 7px to 9px soft glowing bokeh orb
          : type === 'sparkle'
          ? (i % 2) + 2.5 // 2.5px to 3.5px sharp sparkle
          : (i % 3) + 1.5; // 1.5px to 3.5px shimmering flake

      const baseOpacity =
        type === 'bokeh'
          ? 0.35 + (i % 4) * 0.1
          : type === 'sparkle'
          ? 0.65 + (i % 3) * 0.15
          : 0.3 + (i % 5) * 0.12;

      const animType =
        i % 4 === 0
          ? 'animate-gold-dust-twinkle'
          : i % 2 === 0
          ? 'animate-gold-dust-1'
          : 'animate-gold-dust-2';

      const color =
        i % 6 === 0
          ? '#FFFFFF'
          : i % 4 === 0
          ? '#FFF6E5'
          : i % 2 === 0
          ? '#E2C27B'
          : '#C9A45C';

      return {
        id: i,
        left: `${(i * 17.3 + (i % 5) * 3) % 96 + 2}%`,
        top: `${(i * 19.7 + (i % 4) * 5) % 94 + 3}%`,
        size,
        baseOpacity,
        animType,
        color,
        type,
        delay: `${((i * 0.45) % 5).toFixed(1)}s`,
        duration: `${(type === 'bokeh' ? 8 : type === 'sparkle' ? 3.5 : 5.5) + (i % 4) * 1.2}s`,
        blur: type === 'bokeh' ? 'blur(2.5px)' : 'none',
        shadow:
          type === 'bokeh'
            ? '0 0 12px rgba(226, 194, 123, 0.7)'
            : type === 'sparkle'
            ? '0 0 8px rgba(255, 246, 229, 0.9), 0 0 14px rgba(201, 164, 92, 0.6)'
            : '0 0 5px rgba(226, 194, 123, 0.5)'
      };
    });
  }, []);

  return (
    <section
      ref={heroContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[58vh] sm:min-h-[64vh] lg:min-h-[70vh] flex items-center justify-center pt-3 sm:pt-6 lg:pt-6 pb-6 sm:pb-8 lg:pb-10 overflow-hidden bg-[#05080C] bg-gold-mesh"
    >
      {/* Ambient Lighting & Volumetric Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-[#C9A45C]/12 rounded-full blur-[140px] pointer-events-none animate-gold-ambient" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#E2C27B]/14 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-6 right-10 w-[450px] h-[320px] bg-[#C9A45C]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      {/* Rich Golden Floating Dust Particles & Bokeh Field (More particles as requested) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute rounded-full pointer-events-none ${p.animType}`}
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  filter: p.blur,
                  boxShadow: p.shadow,
                  '--base-opacity': p.baseOpacity,
                  opacity: p.baseOpacity,
                  transform: `translate(${transX * 0.25}px, ${transY * 0.25}px)`,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                  transition: 'transform 0.4s ease-out'
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Hero Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8 items-center">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: Eyebrow, Headline, Banner, CTAs, Metrics Card    */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-3.5 sm:space-y-4 text-left z-20">
            
            {/* Top Eyebrow: Company Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#C9A45C]">
                BRANIFY • DIGITAL STUDIO & AGENCY
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl xl:text-[56px] font-black tracking-tight uppercase leading-[0.96] text-white">
                <span className="block text-white drop-shadow-sm">
                  WE DESIGN
                </span>
                <span className="block text-[#8E95A0] font-black">
                  THE FUTURE
                </span>
              </h1>

              {/* Glowing Golden Accent Divider Bar */}
              <div className="w-40 sm:w-56 h-[1.5px] bg-gradient-to-r from-[#E2C27B] via-[#C9A45C] to-transparent mt-3 opacity-80" />
            </div>

            {/* Sub-headline description */}
            <p className="text-[#A0A6B2] text-xs sm:text-sm font-normal leading-relaxed max-w-lg">
              Creative Digital Solutions for Modern Brands
            </p>

            {/* HERO BANNER TEXT */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B1015]/90 border border-[#C9A45C]/35 backdrop-blur-xl shadow-lg shadow-black/60 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2C27B]/60 to-transparent" />
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C9A45C]/15 border border-[#C9A45C]/40 flex items-center justify-center shrink-0 text-[#E2C27B] mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E2C27B]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-[13px] font-black text-white leading-snug">
                    Tell us about your business <span className="text-[#E2C27B]">→</span> Get your website within 5 hours.
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#C9A45C] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27B] inline-block animate-pulse" />
                    Affordable website development starts with $30.
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (Golden CTA + Dark Secondary) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5">
              {/* Primary Golden Button: EXPLORE OUR WORK */}
              <button
                onClick={() => navigate('/portfolio')}
                className="px-6 py-3 btn-gold-primary rounded-lg flex items-center justify-center gap-2 group cursor-pointer text-xs font-black uppercase tracking-wider"
              >
                <span className="text-[#05080C] font-extrabold tracking-wider">EXPLORE OUR WORK</span>
                <ArrowRight className="w-4 h-4 text-[#05080C] group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary Button: START A PROJECT */}
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 btn-gold-secondary rounded-lg flex items-center justify-center gap-2 group cursor-pointer text-xs font-bold uppercase tracking-wider"
              >
                <span className="text-[#F5F5F2] group-hover:text-white">START A PROJECT</span>
                <Plus className="w-4 h-4 text-[#C9A45C] group-hover:text-[#F0D9A3] group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            {/* BOTTOM STATS CARD (Compact, clean 4-column metric bar) */}
            <div className="pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#090D12]/85 border border-[#C9A45C]/20 backdrop-blur-xl shadow-xl shadow-black/70">
                <div className="grid grid-cols-4 divide-x divide-white/[0.08] text-center">
                  
                  {/* Stat 1: 8+ Years Experience */}
                  <div className="px-1.5">
                    <div className="text-sm sm:text-lg font-black text-white font-mono leading-none">
                      8+
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#8E95A0] mt-1 leading-tight">
                      Years<br className="sm:hidden" /> Experience
                    </div>
                  </div>

                  {/* Stat 2: 250+ Projects Completed */}
                  <div className="px-1.5">
                    <div className="text-sm sm:text-lg font-black text-white font-mono leading-none">
                      250+
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#8E95A0] mt-1 leading-tight">
                      Projects<br className="sm:hidden" /> Completed
                    </div>
                  </div>

                  {/* Stat 3: 120+ Happy Clients */}
                  <div className="px-1.5">
                    <div className="text-sm sm:text-lg font-black text-white font-mono leading-none">
                      120+
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#8E95A0] mt-1 leading-tight">
                      Happy<br className="sm:hidden" /> Clients
                    </div>
                  </div>

                  {/* Stat 4: 98% Design Satisfaction */}
                  <div className="px-1.5">
                    <div className="text-sm sm:text-lg font-black text-white font-mono leading-none">
                      98%
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#8E95A0] mt-1 leading-tight">
                      Design<br className="sm:hidden" /> Satisfaction
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: 3D Sculpture on Pedestal Platform                */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-7 relative perspective-2000 py-4 sm:py-6 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-visible">
            
            {/* Pedestal Ambient Glow Disc */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-28 hero-gold-pedestal rounded-full pointer-events-none opacity-80" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/5 h-12 bg-gradient-to-r from-[#C9A45C]/30 via-[#E2C27B]/40 to-[#C9A45C]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Master 3D Parallax Tilt Container */}
            <div
              style={{
                transform:
                  !prefersReducedMotion && isHovered
                    ? `rotateX(${(rotX + 2).toFixed(2)}deg) rotateY(${(rotY - 3).toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0px)`
                    : !prefersReducedMotion
                    ? 'rotateX(2deg) rotateY(-3deg)'
                    : undefined,
                transformStyle: 'preserve-3d',
                transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative w-full max-w-[560px] xl:max-w-[620px] preserve-3d flex items-center justify-center px-4 sm:px-8 py-2 overflow-visible"
            >

              {/* -------------------------------------------------------- */}
              {/* 4 Interactive Service Floating Badges (Desktop/Tablet)   */}
              {/* -------------------------------------------------------- */}

              {/* Badge 1: Web Development (Top Left) */}
              <div
                onMouseEnter={() => setHoveredCard('web')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`hidden sm:flex absolute -top-1 left-0 sm:-top-2 sm:-left-2 md:-left-6 lg:-left-4 xl:-left-10 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#090D14]/95 border border-[#C9A45C]/45 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] cursor-pointer preserve-3d transition-all duration-300 hover:scale-105 hover:border-[#E2C27B] hover:shadow-[0_0_25px_rgba(201,164,92,0.4)] ${
                  !prefersReducedMotion ? 'animate-float-gold-1' : ''
                }`}
                style={{
                  transform: prefersReducedMotion ? 'none' : 'translateZ(65px)',
                  borderColor: hoveredCard === 'web' ? 'rgba(240, 217, 163, 0.95)' : 'rgba(201, 164, 92, 0.45)'
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#101722] to-[#182332] border border-[#C9A45C]/50 flex items-center justify-center text-[#E2C27B] shadow-inner shrink-0">
                  <Code2 className="w-4 h-4 text-[#E2C27B]" />
                </div>
                <div className="text-left whitespace-nowrap">
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">Web Development</div>
                  <div className="text-[9.5px] text-[#E2C27B] font-semibold">From $30 • 5h Delivery</div>
                </div>
              </div>

              {/* Badge 2: AI Automation (Top Right) */}
              <div
                onMouseEnter={() => setHoveredCard('ai')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`hidden sm:flex absolute -top-1 right-0 sm:-top-2 sm:-right-2 md:-right-6 lg:-right-4 xl:-right-10 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#090D14]/95 border border-[#C9A45C]/45 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] cursor-pointer preserve-3d transition-all duration-300 hover:scale-105 hover:border-[#E2C27B] hover:shadow-[0_0_25px_rgba(201,164,92,0.4)] ${
                  !prefersReducedMotion ? 'animate-float-gold-3' : ''
                }`}
                style={{
                  transform: prefersReducedMotion ? 'none' : 'translateZ(65px)',
                  borderColor: hoveredCard === 'ai' ? 'rgba(240, 217, 163, 0.95)' : 'rgba(201, 164, 92, 0.45)'
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#101722] to-[#182332] border border-[#C9A45C]/50 flex items-center justify-center text-[#E2C27B] shadow-inner shrink-0">
                  <Bot className="w-4 h-4 text-[#E2C27B]" />
                </div>
                <div className="text-left whitespace-nowrap">
                  <div className="text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    AI Automation
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27B] inline-block animate-ping" />
                  </div>
                  <div className="text-[9.5px] text-[#A0AAB8] font-medium">Smart Workflows</div>
                </div>
              </div>

              {/* Badge 3: Branding & Identity (Mid Left) */}
              <div
                onMouseEnter={() => setHoveredCard('branding')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`hidden sm:flex absolute top-[52%] -translate-y-1/2 left-0 sm:-left-4 md:-left-8 lg:-left-6 xl:-left-12 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#090D14]/95 border border-[#C9A45C]/45 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] cursor-pointer preserve-3d transition-all duration-300 hover:scale-105 hover:border-[#E2C27B] hover:shadow-[0_0_25px_rgba(201,164,92,0.4)] ${
                  !prefersReducedMotion ? 'animate-float-gold-2' : ''
                }`}
                style={{
                  transform: prefersReducedMotion ? 'none' : 'translateZ(60px)',
                  borderColor: hoveredCard === 'branding' ? 'rgba(240, 217, 163, 0.95)' : 'rgba(201, 164, 92, 0.45)'
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#101722] to-[#182332] border border-[#C9A45C]/50 flex items-center justify-center text-[#E2C27B] shadow-inner shrink-0">
                  <Palette className="w-4 h-4 text-[#E2C27B]" />
                </div>
                <div className="text-left whitespace-nowrap">
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">Branding & UI/UX</div>
                  <div className="text-[9.5px] text-[#A0AAB8] font-medium">Distinctive Identity</div>
                </div>
              </div>

              {/* Badge 4: SEO & Growth (Mid Right) */}
              <div
                onMouseEnter={() => setHoveredCard('seo')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`hidden sm:flex absolute top-[52%] -translate-y-1/2 right-0 sm:-right-4 md:-right-8 lg:-right-6 xl:-right-12 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#090D14]/95 border border-[#C9A45C]/45 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] cursor-pointer preserve-3d transition-all duration-300 hover:scale-105 hover:border-[#E2C27B] hover:shadow-[0_0_25px_rgba(201,164,92,0.4)] ${
                  !prefersReducedMotion ? 'animate-float-gold-4' : ''
                }`}
                style={{
                  transform: prefersReducedMotion ? 'none' : 'translateZ(60px)',
                  borderColor: hoveredCard === 'seo' ? 'rgba(240, 217, 163, 0.95)' : 'rgba(201, 164, 92, 0.45)'
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#101722] to-[#182332] border border-[#C9A45C]/50 flex items-center justify-center text-[#E2C27B] shadow-inner shrink-0">
                  <TrendingUp className="w-4 h-4 text-[#E2C27B]" />
                </div>
                <div className="text-left whitespace-nowrap">
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">SEO & Growth</div>
                  <div className="text-[9.5px] text-[#A0AAB8] font-medium">Rank Higher</div>
                </div>
              </div>

              {/* -------------------------------------------------------- */}
              {/* 3D SCULPTURE ARTWORK & PEDESTAL COMPOSITION              */}
              {/* -------------------------------------------------------- */}
              <div
                className={`relative w-full max-w-[420px] xl:max-w-[460px] aspect-square rounded-2xl overflow-hidden group preserve-3d transition-all duration-500 ${
                  !isHovered && !prefersReducedMotion ? 'animate-float-gold-main' : ''
                }`}
                style={{
                  transform: prefersReducedMotion ? 'none' : 'translateZ(25px)',
                  boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(201, 164, 92, 0.15)'
                }}
              >
                {/* Smooth blend edges so sculpture looks natural in scene */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080C]/80 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#C9A45C]/30 via-[#E2C27B]/10 to-[#C9A45C]/20 opacity-80 pointer-events-none" />

                <img
                  src="/branify-hero-sculpture.jpg"
                  alt="BRANIFY 3D Luxury Executive Sculpture"
                  className="w-full h-full object-cover object-center rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/branify-logo.png';
                  }}
                />

                {/* Subtle Luxury Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#C9A45C]/60 rounded-tl pointer-events-none z-20" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#C9A45C]/60 rounded-tr pointer-events-none z-20" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[#C9A45C]/60 rounded-bl pointer-events-none z-20" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#C9A45C]/60 rounded-br pointer-events-none z-20" />
              </div>

            </div>

            {/* Mobile View Dedicated 2x2 Badges Row (ensures 100% visibility on all small devices) */}
            <div className="sm:hidden w-full max-w-[420px] grid grid-cols-2 gap-2 mt-4 px-1 z-30">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#090D14]/95 border border-[#C9A45C]/40 backdrop-blur-md shadow-lg">
                <div className="w-7 h-7 rounded-lg bg-[#121924] border border-[#C9A45C]/40 flex items-center justify-center shrink-0">
                  <Code2 className="w-3.5 h-3.5 text-[#E2C27B]" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] font-black text-white uppercase truncate">Web Dev</div>
                  <div className="text-[8px] text-[#E2C27B] font-semibold truncate">From $30 • 5h</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#090D14]/95 border border-[#C9A45C]/40 backdrop-blur-md shadow-lg">
                <div className="w-7 h-7 rounded-lg bg-[#121924] border border-[#C9A45C]/40 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#E2C27B]" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] font-black text-white uppercase truncate">AI Automation</div>
                  <div className="text-[8px] text-[#A0AAB8] font-medium truncate">Workflows</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#090D14]/95 border border-[#C9A45C]/40 backdrop-blur-md shadow-lg">
                <div className="w-7 h-7 rounded-lg bg-[#121924] border border-[#C9A45C]/40 flex items-center justify-center shrink-0">
                  <Palette className="w-3.5 h-3.5 text-[#E2C27B]" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] font-black text-white uppercase truncate">Branding</div>
                  <div className="text-[8px] text-[#A0AAB8] font-medium truncate">UI/UX Identity</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#090D14]/95 border border-[#C9A45C]/40 backdrop-blur-md shadow-lg">
                <div className="w-7 h-7 rounded-lg bg-[#121924] border border-[#C9A45C]/40 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E2C27B]" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] font-black text-white uppercase truncate">SEO & Growth</div>
                  <div className="text-[8px] text-[#A0AAB8] font-medium truncate">Rank Higher</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
