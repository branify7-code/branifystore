import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Globe,
  LayoutGrid,
  ShoppingBag,
  ShoppingCart,
  MousePointerClick,
  Figma,
  Palette,
  Share2,
  Presentation,
  Search,
  Bot,
  TrendingUp,
  CheckCircle2,
  Wrench,
  Package,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Star,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Award,
  FolderGit2,
  Cpu,
  ExternalLink,
  Activity,
  BarChart3,
  Users,
  Check,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';

const SPOTLIGHT_AI_TOOLS = [
  { name: "ChatGPT", desc: "General-purpose AI assistant for writing, coding, research, and multimodal tasks.", category: "Chat Assistants", pricing: "Freemium", url: "https://chat.openai.com" },
  { name: "Claude", desc: "AI assistant strong at writing, deep reasoning, analysis, and coding.", category: "Chat Assistants", pricing: "Freemium", url: "https://claude.ai" },
  { name: "Midjourney", desc: "AI image generator known for ultra-stylized, high-definition artistic visuals.", category: "Image Generation", pricing: "Paid", url: "https://www.midjourney.com" },
  { name: "Leonardo.Ai", desc: "AI image generator with a generous free daily token tier.", category: "Image Generation", pricing: "Freemium", url: "https://leonardo.ai" },
  { name: "Cursor", desc: "AI-first code editor that understands and edits your full codebase seamlessly.", category: "Coding", pricing: "Freemium", url: "https://www.cursor.com" },
  { name: "GitHub Copilot", desc: "AI pair programmer suggesting functions and code autocompletions in real-time.", category: "Coding", pricing: "Paid", url: "https://github.com/features/copilot" },
  { name: "Runway", desc: "Industry-leading AI video generation, motion brush, and text-to-video editing.", category: "Video Generation", pricing: "Freemium", url: "https://runwayml.com" },
  { name: "ElevenLabs", desc: "Hyper-realistic AI voice cloning, multilingual speech synthesis, and voiceovers.", category: "Voice & Audio", pricing: "Freemium", url: "https://elevenlabs.io" },
  { name: "Lovable", desc: "Builds full-stack web applications from natural language prompts.", category: "No-code Builders", pricing: "Freemium", url: "https://lovable.dev" },
  { name: "Perplexity", desc: "AI answer engine that cites verified web sources for research.", category: "Productivity & Research", pricing: "Freemium", url: "https://www.perplexity.ai" },
  { name: "Zapier", desc: "No-code AI workflow automation across thousands of applications.", category: "Automation", pricing: "Freemium", url: "https://zapier.com" },
  { name: "Ideogram", desc: "AI image generator specializing in crisp typographic text inside visuals.", category: "Image Generation", pricing: "Freemium", url: "https://ideogram.ai" }
];

const AI_CATEGORIES = ["All", "Chat Assistants", "Image Generation", "Coding", "Video Generation", "Voice & Audio", "Productivity & Research", "Automation"];

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { services, tools, products, testimonials, portfolio, formatPrice } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeAiCategory, setActiveAiCategory] = useState<string>("All");

  // 3D Parallax & Motion state for Hero Dashboard
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    const maxTilt = 10; // degrees
    const rx = -(normY * maxTilt);
    const ry = normX * maxTilt;

    setTilt({ rx, ry });
    setIsHoveringPanel(true);
  };

  const handleHeroMouseLeave = () => {
    setIsHoveringPanel(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-blue-400" />,
    LayoutGrid: <LayoutGrid className="w-6 h-6 text-violet-400" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-fuchsia-400" />,
    ShoppingCart: <ShoppingCart className="w-6 h-6 text-blue-400" />,
    MousePointerClick: <MousePointerClick className="w-6 h-6 text-indigo-400" />,
    Figma: <Figma className="w-6 h-6 text-pink-400" />,
    Palette: <Palette className="w-6 h-6 text-purple-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-400" />,
    Share2: <Share2 className="w-6 h-6 text-blue-400" />,
    Presentation: <Presentation className="w-6 h-6 text-violet-400" />,
    Search: <Search className="w-6 h-6 text-emerald-400" />,
    Bot: <Bot className="w-6 h-6 text-cyan-400" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-rose-400" />
  };

  const faqs = [
    {
      q: 'What services does BRANIFY offer for international clients?',
      a: 'BRANIFY provides end-to-end digital solutions including custom React/Next.js Web Development, WordPress & WooCommerce, UI/UX Design, Logo & Brand Identity, Social Media Design, Pitch Decks, SEO, and custom Gemini AI Automation.'
    },
    {
      q: 'How does automatic country-based pricing and multi-currency billing work?',
      a: 'We automatically detect your region via IP geolocation and adjust prices into your local currency (supporting USD, PKR, AED, EUR, GBP, SAR, INR, CAD, AUD, and 30+ international currencies with live exchange rates). You can manually change your currency anytime using the selector in our top navigation bar.'
    },
    {
      q: 'Are the 100+ Free Online Tools completely free to use?',
      a: 'Yes, 100% free! All our browser utilities (PDF text extractors, image compressors, JSON formatters, meta title generators, invoice builders) run directly in your browser without requiring signup or credit cards.'
    },
    {
      q: 'Are the digital products and subscriptions legitimate?',
      a: 'Yes. BRANIFY only distributes 100% original, authorized digital templates, software licenses, and partner subscription products. We strictly forbid unauthorized or shared account reselling.'
    },
    {
      q: 'What is the standard delivery timeline for a custom website?',
      a: 'Standard landing pages are delivered in 3–5 days, custom WordPress/WooCommerce sites in 1–2 weeks, and full React web applications in 2–3 weeks.'
    }
  ];

  return (
    <div className="space-y-28 pb-20 overflow-hidden bg-[#05060B]">
      {/* --- HERO SECTION WITH 3D CYBER DASHBOARD --- */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative pt-10 sm:pt-16 lg:pt-24 pb-16 overflow-hidden bg-[#05060B] bg-cyber-mesh"
      >
        {/* Background Atmospheric Glowing Orbs */}
        <div className="absolute -top-24 left-1/4 w-[550px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-blob-1" />
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none animate-blob-2" />
        <div className="absolute -bottom-10 right-10 w-[600px] h-[450px] bg-fuchsia-600/15 rounded-full blur-[160px] pointer-events-none animate-blob-3" />

        {/* Subtle Cyber Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* International Digital Agency Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-[11px] font-extrabold uppercase tracking-widest text-zinc-300 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>International Digital Agency</span>
              </div>

              {/* 3D Impact Display Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] perspective-1200">
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '0ms' }}>BUILD</span>
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '60ms' }}>A</span>
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '120ms' }}>BRAND</span>
                <span className="inline-block animate-word-tilt" style={{ animationDelay: '180ms' }}>THAT</span>
                <br />
                <span className="inline-block mr-3 text-gradient-branify animate-word-tilt" style={{ animationDelay: '240ms' }}>
                  MEANS
                </span>
                <span className="inline-block text-gradient-branify animate-word-tilt" style={{ animationDelay: '300ms' }}>
                  BUSINESS.
                </span>
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Websites, branding, AI solutions and digital products designed to help ambitious businesses look better, work smarter and grow faster.
              </p>

              {/* CTAs with Electric Gradient and Frosted Glass */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-8 py-4 btn-gradient-primary rounded-full flex items-center justify-center gap-2.5 group cursor-pointer text-xs font-black uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/portfolio')}
                  className="w-full sm:w-auto px-8 py-4 btn-outline-secondary rounded-full flex items-center justify-center gap-2 group cursor-pointer text-xs font-bold uppercase tracking-wider"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              {/* Trust Indicators Pill Grid */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 stroke-[3]" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-violet-400 shrink-0 stroke-[3]" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0 stroke-[3]" />
                  <span>Global Clients</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 stroke-[3]" />
                  <span>No Contracts</span>
                </div>
              </div>
            </div>

            {/* Hero Right: 3D Floating Cyber Dashboard & Satellite Chips */}
            <div className="lg:col-span-6 relative perspective-2000 py-6">
              
              {/* 3D Pedestal Lighting Disc under dashboard */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-28 hero-pedestal rounded-full pointer-events-none" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/5 h-10 bg-gradient-to-r from-blue-500/20 via-violet-500/30 to-pink-500/20 rounded-full blur-md pointer-events-none" />

              {/* Orbiting Satellite Chips */}
              {/* Top-Left Satellite Chip */}
              <div
                className={`absolute -top-4 -left-4 sm:-left-6 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#080B14]/90 border border-blue-500/30 backdrop-blur-xl shadow-lg shadow-blue-950/40 text-xs font-semibold ${
                  !prefersReducedMotion ? 'animate-satellite-1' : ''
                }`}
                style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(45px)' }}
              >
                <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">AI Automation</div>
                  <div className="text-[9px] text-zinc-400">Scale smarter</div>
                </div>
              </div>

              {/* Bottom-Left Satellite Chip */}
              <div
                className={`absolute -bottom-6 -left-2 sm:-left-4 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#080B14]/90 border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-950/40 text-xs font-semibold ${
                  !prefersReducedMotion ? 'animate-satellite-2' : ''
                }`}
                style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }}
              >
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Digital Products</div>
                  <div className="text-[9px] text-zinc-400">Sell globally</div>
                </div>
              </div>

              {/* Top-Right Satellite Chip */}
              <div
                className={`absolute -top-3 -right-2 sm:-right-4 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#080B14]/90 border border-fuchsia-500/30 backdrop-blur-xl shadow-lg shadow-fuchsia-950/40 text-xs font-semibold ${
                  !prefersReducedMotion ? 'animate-satellite-3' : ''
                }`}
                style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(50px)' }}
              >
                <div className="w-7 h-7 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400">
                  <Palette className="w-4 h-4 text-fuchsia-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Brand Identity</div>
                  <div className="text-[9px] text-zinc-400">Build recognition</div>
                </div>
              </div>

              {/* Main 3D Cyber Dashboard Panel */}
              <div
                style={{
                  transform:
                    isHoveringPanel && !prefersReducedMotion
                      ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(20px)`
                      : undefined,
                  transition: isHoveringPanel ? 'transform 0.15s ease-out' : 'transform 0.8s ease-out'
                }}
                className={`bg-[#080B14]/90 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/90 space-y-5 relative overflow-hidden preserve-3d ${
                  !isHoveringPanel && !prefersReducedMotion ? 'animate-hero-float' : ''
                }`}
              >
                {/* Top Subtle Light Reflection */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Dashboard Browser Header Bar */}
                <div
                  className="flex items-center justify-between pb-3 border-b border-white/[0.08]"
                  style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(20px)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block"></span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 font-semibold bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                    branify.store/brand-os
                  </div>
                </div>

                {/* Welcome Card Header */}
                <div style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(25px)' }}>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    Welcome back, Branify <span className="text-lg">👋</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Here's what's happening with your brand today.
                  </p>
                </div>

                {/* 4 Live Metric Stat Tiles */}
                <div className="grid grid-cols-2 gap-3" style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(30px)' }}>
                  <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Projects Completed</div>
                    <div className="text-lg font-black text-white font-mono">128+</div>
                    <div className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                      <span>↑ 24%</span> <span className="text-zinc-500 font-normal">this month</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Happy Clients</div>
                    <div className="text-lg font-black text-white font-mono">580+</div>
                    <div className="text-[9px] text-blue-400 font-bold flex items-center gap-1">
                      <span>★ 4.9/5</span> <span className="text-zinc-500 font-normal">42 countries</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Success Rate</div>
                    <div className="text-lg font-black text-violet-400 font-mono">98%</div>
                    <div className="text-[9px] text-zinc-500">5-star verified</div>
                  </div>

                  <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Support Response</div>
                    <div className="text-lg font-black text-fuchsia-400 font-mono">24/7</div>
                    <div className="text-[9px] text-emerald-400 font-bold">Always available</div>
                  </div>
                </div>

                {/* Neon Performance Chart Visualizer */}
                <div
                  className="p-4 bg-[#05060B]/80 border border-white/[0.08] rounded-2xl space-y-2 relative overflow-hidden"
                  style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(25px)' }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-300">Website Performance</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/20">
                      99.8% Speed Score
                    </span>
                  </div>

                  {/* SVG Wave Chart */}
                  <div className="h-16 w-full relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" fill="none">
                      <defs>
                        <linearGradient id="cyberWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#D946EF" />
                        </linearGradient>
                        <linearGradient id="cyberAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,45 Q50,10 100,35 T200,15 T300,5 L300,60 L0,60 Z"
                        fill="url(#cyberAreaGrad)"
                      />
                      <path
                        d="M0,45 Q50,10 100,35 T200,15 T300,5"
                        stroke="url(#cyberWaveGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="200" cy="15" r="4" fill="#D946EF" className="animate-ping" />
                      <circle cx="200" cy="15" r="4" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>

                {/* Top Services Progress Bars */}
                <div
                  className="space-y-2.5 pt-1"
                  style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(20px)' }}
                >
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Top Services</div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-300 font-medium mb-1">
                        <span>Web Development</span>
                        <span className="font-bold text-blue-400">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-300 font-medium mb-1">
                        <span>Brand Identity</span>
                        <span className="font-bold text-violet-400">87%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TRUST / SOCIAL PROOF TICKER --- */}
      <section className="border-y border-white/[0.08] py-8 bg-[#080B14]/70 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-4 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
            Trusted by Ambitious Brands & Businesses Worldwide
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 overflow-x-auto py-2 scrollbar-none opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-zinc-600 hover:text-zinc-400 cursor-default text-xs">‹</span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              ROYAL CROWN
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              MAISON ELIXIR
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              TAQDEER BY JTS
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              ARTLINE GENTS SALON
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              MERIDIAN MARKETPLACE
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              VERTEX LABS
            </span>
            <span className="text-zinc-300 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              PLAYBEAT
            </span>
            <span className="text-zinc-600 hover:text-zinc-400 cursor-default text-xs">›</span>
          </div>
        </div>
      </section>

      {/* --- SERVICES SYSTEM SECTION --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-[10px] font-extrabold uppercase tracking-widest text-zinc-300">
            Agency Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Specialized <span className="text-gradient-branify">Digital Services</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
            From high-converting web applications and e-commerce stores to complete brand identity manuals and Gemini AI automation.
          </p>
        </div>

        {/* Services Grid (4 columns on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const nonZeroPrices = (service.packages || []).map(p => p.priceUSD).filter(p => p > 0);
            const minPrice = nonZeroPrices.length > 0 ? Math.min(...nonZeroPrices) : (service.startingPriceUSD || 0);

            return (
              <TiltCard
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="p-6 h-full flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="icon-pop-target w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shadow-lg">
                      {iconMap[service.iconName] || <Globe className="w-6 h-6 text-blue-400" />}
                    </div>
                    <span className="px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-[10px] font-extrabold uppercase text-zinc-400">
                      4 Packages
                    </span>
                  </div>

                  <div style={{ transform: 'translateZ(25px)' }}>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <ul
                    className="space-y-1.5 pt-2 border-t border-white/[0.08] text-[11px] text-zinc-300"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 stroke-[3]" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    <span className="text-zinc-500 text-[11px]">Starting from </span>
                    <span className="font-extrabold text-blue-400 text-sm">
                      {minPrice > 0 ? formatPrice(minPrice) : 'Quote'}
                    </span>
                  </div>
                  <div className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* --- SELECTED WORK (PORTFOLIO SECTION) --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-[10px] font-extrabold uppercase tracking-widest text-zinc-300">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Our Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Selected <span className="text-gradient-branify">Work</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-base">
              Real results. Real websites. Real growth built by BRANIFY.
            </p>
          </div>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 btn-outline-secondary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest hover:border-violet-500 transition-all cursor-pointer group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Selected Work Grid (Showing 4 Real Websites) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolio.slice(0, 4).map((item) => (
            <TiltCard
              key={item.id}
              onClick={() => navigate(`/portfolio/${item.slug}`)}
              className="h-full flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div>
                <div className="relative overflow-hidden bg-slate-950 rounded-t-2xl border-b border-white/[0.08]">
                  {/* Browser Bar */}
                  <div className="bg-slate-900/90 px-3 py-1.5 border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-400 truncate max-w-[120px]">
                      {item.liveUrl ? item.liveUrl.replace('https://', '').replace('/', '') : 'branify.store'}
                    </div>
                    <div className="text-[8px] font-extrabold text-blue-400 uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="h-52 w-full bg-slate-950 p-2 flex items-start justify-center overflow-hidden relative">
                    <img
                      src={item.coverImage}
                      alt={`${item.title} - Website Screenshot`}
                      loading="lazy"
                      className="w-full h-full object-contain object-top group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        if (item.liveUrl && !(e.currentTarget.src.includes('image.thum.io'))) {
                          e.currentTarget.src = `https://image.thum.io/get/width/1200/fullpage/noanimate/${item.liveUrl}`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    <span>{item.industry}</span>
                    {item.year && <span>{item.year}</span>}
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {item.challenge}
                  </p>

                  {item.servicesProvided && item.servicesProvided.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.servicesProvided.slice(0, 2).map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-zinc-300 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-blue-400">
                  <span className="uppercase tracking-wider text-[11px]">View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- 100+ FREE ONLINE TOOLS SECTION --- */}
      <section className="bg-[#080B14]/80 border-y border-white/[0.08] py-16 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                Free for Everyone
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                100+ Free <span className="text-gradient-branify">Online Tools</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                No signups, no credit cards required. High-performance browser utilities for PDF, image compression, JSON formatting, SEO tags, and invoices.
              </p>
            </div>

            <button
              onClick={() => navigate('/tools')}
              className="px-6 py-3.5 btn-gradient-primary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest cursor-pointer"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Popular Featured Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.slice(0, 8).map((tool) => (
              <TiltCard
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="p-5 h-full space-y-3"
              >
                <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-300 text-[10px] font-bold uppercase tracking-wider border border-white/[0.08]">
                    {tool.category}
                  </span>
                  <div className="icon-pop-target p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <Wrench className="w-4 h-4 text-zinc-300" />
                  </div>
                </div>

                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div
                  className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline pt-1"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- DIGITAL PRODUCTS & SUBSCRIPTIONS HIGHLIGHT --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-fuchsia-400 text-[10px] font-extrabold uppercase tracking-widest">
              <Package className="w-3.5 h-3.5 text-fuchsia-400" />
              Premium Quality
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Premium <span className="text-gradient-branify">Digital Products</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Instant download AI prompt kits, Canva social templates, Notion agency workspaces, and authorized productivity subscriptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/digital-products')}
              className="px-5 py-2.5 btn-outline-secondary text-xs rounded-full"
            >
              Browse Products
            </button>
            <button
              onClick={() => navigate('/subscriptions')}
              className="px-5 py-2.5 btn-gradient-primary rounded-full flex items-center gap-1.5 text-xs uppercase"
            >
              <span>Subscriptions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((prod) => (
            <TiltCard
              key={prod.id}
              onClick={() => navigate(prod.isSubscription ? '/subscriptions' : `/digital-products/${prod.slug}`)}
              className="h-full flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950 rounded-t-2xl">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#05060B]/90 backdrop-blur-md text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/30">
                  {prod.category}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div
                  className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    <span className="text-zinc-500 line-through text-[10px] mr-1">
                      {prod.originalPriceUSD && formatPrice(prod.originalPriceUSD)}
                    </span>
                    <span className="font-extrabold text-blue-400 text-sm">
                      {formatPrice(prod.priceUSD)}
                    </span>
                  </div>

                  <span className="text-blue-400 font-bold uppercase text-[11px] tracking-wider group-hover:underline flex items-center gap-1">
                    Get Access
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- AI TOOLS DIRECTORY SPOTLIGHT (27+ POPULAR AI TOOLS) --- */}
      <section className="bg-[#080B14]/80 border-y border-white/[0.08] py-16 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-cyan-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Powered by AI
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                27+ Popular <span className="text-gradient-branify">AI Tools</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Discover, compare, and launch leading artificial intelligence tools for writing, software engineering, image generation, voice cloning, and automation.
              </p>
            </div>

            <button
              onClick={() => navigate('/ai-tools')}
              className="px-6 py-3.5 btn-gradient-primary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest cursor-pointer"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {AI_CATEGORIES.map((cat) => {
              const isSelected = activeAiCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveAiCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md shadow-violet-500/20'
                      : 'bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Spotlight AI Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPOTLIGHT_AI_TOOLS.filter(
              (t) => activeAiCategory === "All" || t.category === activeAiCategory
            ).slice(0, 8).map((tool) => (
              <TiltCard
                key={tool.name}
                className="p-5 h-full flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-300 text-[10px] font-bold uppercase tracking-wider border border-white/[0.08]">
                      {tool.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.pricing === 'Free'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : tool.pricing === 'Freemium'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {tool.pricing}
                    </span>
                  </div>

                  <div style={{ transform: 'translateZ(25px)' }}>
                    <h3 className="text-base font-black text-white group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div
                  className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 hover:underline"
                  >
                    Open Tool
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => navigate('/ai-tools')}
                    className="text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-wider"
                  >
                    Details →
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5-STEP PROCESS SECTION --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] text-zinc-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/[0.12]">
            Our Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Our 5-Step <span className="text-gradient-branify">Process</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Simple, transparent and results-driven process we follow for every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {[
            { num: '01', title: 'Discover', desc: 'Requirements analysis, goal mapping, and technical scope architecture.' },
            { num: '02', title: 'Plan', desc: 'Figma wireframes, interactive UI prototypes, and strategic milestones.' },
            { num: '03', title: 'Design', desc: 'Modern typography, design tokens, and bespoke brand identity design.' },
            { num: '04', title: 'Develop', desc: 'Clean, type-safe React/TypeScript or custom WordPress engineering.' },
            { num: '05', title: 'Deliver', desc: 'Core Web Vitals audit, security testing, deployment, and video handoff.' }
          ].map((step, idx) => (
            <TiltCard key={idx} className="p-6 h-full space-y-3 relative">
              <div className="text-2xl font-black text-gradient-branify font-mono" style={{ transform: 'translateZ(30px)' }}>
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide" style={{ transform: 'translateZ(25px)' }}>
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                {step.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- WHY BRANIFY FEATURE CARDS --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Why Choose <span className="text-gradient-branify">BRANIFY</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Built for performance, aesthetics, security, and international scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Palette className="w-6 h-6 text-purple-400" />, title: 'World-Class Design', desc: 'Bespoke typography, spacious negative space, and mathematical design systems that build immediate trust.' },
            { icon: <Zap className="w-6 h-6 text-blue-400" />, title: 'Performance Focused', desc: 'Sub-second loading times engineered with React, Next.js, and serverless caching for maximum Core Web Vitals scores.' },
            { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, title: 'Secure & Reliable', desc: 'Full SSL hardening, input validation, clean code structure, and zero vulnerability configurations.' },
            { icon: <TrendingUp className="w-6 h-6 text-rose-400" />, title: 'Conversion Focused', desc: 'Direct-response layouts and strategic call-to-action flows that turn visitors into paying customers.' },
            { icon: <Bot className="w-6 h-6 text-cyan-400" />, title: 'AI-Native Capability', desc: 'Seamlessly integrate custom Gemini AI models for customer support chatbots and automated content workflows.' },
            { icon: <Layers className="w-6 h-6 text-indigo-400" />, title: 'Scalable Technology', desc: 'Built on industry-standard React and TypeScript architectures that grow as your business expands.' }
          ].map((card, idx) => (
            <TiltCard key={idx} className="p-6 h-full space-y-3">
              <div className="icon-pop-target w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-md">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight" style={{ transform: 'translateZ(25px)' }}>
                {card.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                {card.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-[#080B14]/80 border-y border-white/[0.08] py-16 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Client <span className="text-gradient-branify">Feedback</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              What international founders and business leaders say about working with BRANIFY.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <TiltCard key={test.id} className="p-6 h-full space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-yellow-400" style={{ transform: 'translateZ(30px)' }}>
                    {Array(test.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs italic leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                    "{test.review}"
                  </p>
                </div>

                <div
                  className="flex items-center gap-3 pt-4 border-t border-white/[0.08]"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="text-xs font-bold text-white">{test.name}</div>
                    <div className="text-[11px] text-zinc-400">{test.position} • {test.company}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Frequently Asked <span className="text-gradient-branify">Questions</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">Everything you need to know before starting a project with BRANIFY.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-[#080B14]/90 border border-white/[0.08] rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.06] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CONVERSION CTA BANNER --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="bg-gradient-to-br from-[#080B14] via-[#0d1222] to-[#120f24] border border-white/[0.12] rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glows */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Ready to <span className="text-gradient-branify">Elevate Your Brand?</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Let’s build a high-converting website, bespoke brand identity, or custom AI automation system tailored to your international growth goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 btn-gradient-primary rounded-full flex items-center gap-2 uppercase tracking-wider text-xs font-black cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 btn-outline-secondary rounded-full uppercase tracking-wider text-xs font-bold cursor-pointer"
            >
              <span>View Transparent Pricing</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

