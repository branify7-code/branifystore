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
import { PortfolioCard } from '../components/PortfolioCard';
import { Hero3DExperience } from '../components/Hero3DExperience';
import { SEOHead } from '../components/SEOHead';

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

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-[#E2C27B]" />,
    LayoutGrid: <LayoutGrid className="w-6 h-6 text-[#E2C27B]" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#E2C27B]" />,
    ShoppingCart: <ShoppingCart className="w-6 h-6 text-[#E2C27B]" />,
    MousePointerClick: <MousePointerClick className="w-6 h-6 text-[#E2C27B]" />,
    Figma: <Figma className="w-6 h-6 text-[#E2C27B]" />,
    Palette: <Palette className="w-6 h-6 text-[#E2C27B]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#E2C27B]" />,
    Share2: <Share2 className="w-6 h-6 text-[#E2C27B]" />,
    Presentation: <Presentation className="w-6 h-6 text-[#E2C27B]" />,
    Search: <Search className="w-6 h-6 text-[#E2C27B]" />,
    Bot: <Bot className="w-6 h-6 text-[#E2C27B]" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-[#E2C27B]" />
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
      q: 'What is the standard delivery timeline for a custom website?',
      a: 'Standard landing pages are delivered in 5 hours to 3 days, custom WordPress/WooCommerce sites in 1–2 weeks, and full React web applications in 2–3 weeks.'
    },
    {
      q: 'How do I start a project with BRANIFY?',
      a: 'Simply click "Get In Touch" or "Start a Project", share your requirements or business details, and our senior strategy team will get back to you within a few hours.'
    }
  ];

  return (
    <div className="space-y-28 pb-20 overflow-hidden bg-[#05080C]">
      <SEOHead
        title="BRANIFY | Web Development, Branding & AI Solutions"
        description="BRANIFY builds high-performance websites, web apps, brands and AI-powered digital solutions for businesses worldwide."
        canonicalPath="/"
        faqs={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      {/* --- REAL ANIMATED 3D LUXURY HERO EXPERIENCE --- */}
      <Hero3DExperience navigate={navigate} />

      {/* --- TRUST / SOCIAL PROOF TICKER — 3D auto-rotating marquee --- */}
      <section className="border-y border-[#C9A45C]/15 py-10 bg-[#07090D]/80 w-full overflow-hidden relative">
        {/* Golden ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{
          background: 'radial-gradient(ellipse at center, rgba(201,164,92,0.10), transparent 70%)'
        }} />
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 bg-gradient-to-r from-[#07090D] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 bg-gradient-to-l from-[#07090D] to-transparent" />

        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-5 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#C9A45C]">
            Trusted by Ambitious Brands & Businesses Worldwide
          </p>

          {/* 3D-tilted auto-rotating marquee — list duplicated 2x for seamless loop */}
          <div
            className="bf-trust-stage relative w-full"
            style={{ perspective: '1000px' }}
          >
            <div
              className="flex w-max items-center gap-8 sm:gap-12 lg:gap-16 opacity-80 hover:opacity-100 transition-opacity bf-trust-3d-marquee"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="flex shrink-0 items-center gap-8 sm:gap-12 lg:gap-16"
                  aria-hidden={dup === 1}
                >
                  {[
                    'PlayBeat', 'Property Atlas', 'Alaya Spa & Wellness', 'BlockExchange',
                    'Royal Crown', 'Maison Elixir', 'Taqdeer by JTS', 'Artline Gents Salon',
                    'Meridian Marketplace', 'Tatka Bazar', 'CineStream', 'LA CAVA DXB',
                    'World Dollar Quest', 'Nova Studios', 'Vertex Labs', 'Lumen Digital',
                    'Atlas & Co.', 'Aurora Creative', 'Helix Digital', 'Quantum Works',
                    'Stellar Agency', 'Zenith Studio', 'Apex Labs', 'Crown Collective',
                  ].map((name) => (
                    <span
                      key={dup + '-' + name}
                      className="text-zinc-300 hover:text-[#E2C27B] font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap transition-colors cursor-default bf-trust-chip"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SYSTEM SECTION --- */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[10px] font-extrabold uppercase tracking-widest text-[#E2C27B]">
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
                    <div className="icon-pop-target w-12 h-12 rounded-2xl bg-[#0F141C] border border-[#C9A45C]/30 flex items-center justify-center shadow-lg">
                      {iconMap[service.iconName] || <Globe className="w-6 h-6 text-[#E2C27B]" />}
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#C9A45C]/10 border border-[#C9A45C]/25 rounded-full text-[10px] font-extrabold uppercase text-[#E2C27B]">
                      4 Packages
                    </span>
                  </div>

                  <div style={{ transform: 'translateZ(25px)' }}>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#E2C27B] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <ul
                    className="space-y-1.5 pt-2 border-t border-[#C9A45C]/15 text-[11px] text-zinc-300"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E2C27B] shrink-0 stroke-[3]" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    <span className="text-zinc-500 text-[11px]">Starting from </span>
                    <span className="font-extrabold text-[#E2C27B] text-sm">
                      {minPrice > 0 ? formatPrice(minPrice) : 'Quote'}
                    </span>
                  </div>
                  <div className="text-[#E2C27B] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider text-[11px]">
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
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[10px] font-extrabold uppercase tracking-widest text-[#E2C27B]">
              <Layers className="w-3.5 h-3.5 text-[#E2C27B]" />
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
            className="px-6 py-3 btn-gold-secondary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest hover:border-[#C9A45C] transition-all cursor-pointer group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-[#E2C27B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Selected Work Grid — shared PortfolioCard (matches /portfolio page) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
          {portfolio.slice(0, 8).map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onView={(slug) => navigate(`/portfolio/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* --- 100+ FREE ONLINE TOOLS SECTION --- */}
      <section className="bg-[#07090D]/90 border-y border-[#C9A45C]/15 py-16 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#E2C27B] text-[10px] font-extrabold uppercase tracking-widest">
                <Wrench className="w-3.5 h-3.5 text-[#E2C27B]" />
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
              className="px-6 py-3.5 btn-gold-primary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest cursor-pointer font-black"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4 text-[#05080C]" />
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
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9A45C]/10 text-[#E2C27B] text-[10px] font-bold uppercase tracking-wider border border-[#C9A45C]/25">
                    {tool.category}
                  </span>
                  <div className="icon-pop-target p-1.5 rounded-xl bg-[#0F141C] border border-[#C9A45C]/25">
                    <Wrench className="w-4 h-4 text-[#E2C27B]" />
                  </div>
                </div>

                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E2C27B] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div
                  className="text-[11px] text-[#E2C27B] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline pt-1"
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

      {/* --- AI TOOLS DIRECTORY SPOTLIGHT (27+ POPULAR AI TOOLS) --- */}
      <section className="bg-[#07090D]/90 border-y border-[#C9A45C]/15 py-16 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#E2C27B] text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#E2C27B]" />
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
              className="px-6 py-3.5 btn-gold-primary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest cursor-pointer font-black"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4 text-[#05080C]" />
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
                      ? 'bg-gradient-to-r from-[#FFF6E5] to-[#C9A45C] text-[#05080C] shadow-md'
                      : 'bg-[#0F141C] border border-[#C9A45C]/20 text-zinc-400 hover:text-white hover:border-[#C9A45C]/50'
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
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A45C]/10 text-[#E2C27B] text-[10px] font-bold uppercase tracking-wider border border-[#C9A45C]/25">
                      {tool.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.pricing === 'Free'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : tool.pricing === 'Freemium'
                        ? 'bg-[#C9A45C]/15 text-[#E2C27B] border border-[#C9A45C]/35'
                        : 'bg-[#E2C27B]/15 text-[#E2C27B] border border-[#E2C27B]/35'
                    }`}>
                      {tool.pricing}
                    </span>
                  </div>

                  <div style={{ transform: 'translateZ(25px)' }}>
                    <h3 className="text-base font-black text-white group-hover:text-[#E2C27B] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div
                  className="pt-3 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#E2C27B] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 hover:underline"
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 text-[#E2C27B] text-[10px] font-extrabold uppercase tracking-widest border border-[#C9A45C]/30">
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
            { icon: <Palette className="w-6 h-6 text-[#E2C27B]" />, title: 'World-Class Design', desc: 'Bespoke typography, spacious negative space, and mathematical design systems that build immediate trust.' },
            { icon: <Zap className="w-6 h-6 text-[#E2C27B]" />, title: 'Performance Focused', desc: 'Sub-second loading times engineered with React, Next.js, and serverless caching for maximum Core Web Vitals scores.' },
            { icon: <ShieldCheck className="w-6 h-6 text-[#E2C27B]" />, title: 'Secure & Reliable', desc: 'Full SSL hardening, input validation, clean code structure, and zero vulnerability configurations.' },
            { icon: <TrendingUp className="w-6 h-6 text-[#E2C27B]" />, title: 'Conversion Focused', desc: 'Direct-response layouts and strategic call-to-action flows that turn visitors into paying customers.' },
            { icon: <Bot className="w-6 h-6 text-[#E2C27B]" />, title: 'AI-Native Capability', desc: 'Seamlessly integrate custom Gemini AI models for customer support chatbots and automated content workflows.' },
            { icon: <Layers className="w-6 h-6 text-[#E2C27B]" />, title: 'Scalable Technology', desc: 'Built on industry-standard React and TypeScript architectures that grow as your business expands.' }
          ].map((card, idx) => (
            <TiltCard key={idx} className="p-6 h-full space-y-3">
              <div className="icon-pop-target w-12 h-12 rounded-2xl bg-[#0F141C] border border-[#C9A45C]/30 flex items-center justify-center shadow-md">
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
      <section className="bg-[#07090D]/90 border-y border-[#C9A45C]/15 py-16 w-full relative">
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
                  <div className="flex items-center gap-1 text-[#E2C27B]" style={{ transform: 'translateZ(30px)' }}>
                    {Array(test.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#E2C27B]" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs italic leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                    "{test.review}"
                  </p>
                </div>

                <div
                  className="flex items-center gap-3 pt-4 border-t border-[#C9A45C]/15"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-[#C9A45C]/30" />
                  <div>
                    <div className="text-xs font-bold text-white">{test.name}</div>
                    <div className="text-[11px] text-[#C9A45C]">{test.position} • {test.company}</div>
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
              <div key={idx} className="bg-[#0B0F15] border border-[#C9A45C]/20 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C9A45C] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#E2C27B]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-[#C9A45C]/15 pt-3">
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
        <div className="bg-gradient-to-br from-[#0B0F15] via-[#101620] to-[#07090D] border border-[#C9A45C]/35 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glows */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#C9A45C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E2C27B]/10 rounded-full blur-3xl pointer-events-none" />

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
              className="px-8 py-4 btn-gold-primary rounded-full flex items-center gap-2 uppercase tracking-wider text-xs font-black cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#05080C]" />
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-[#05080C]" />
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 btn-gold-secondary rounded-full uppercase tracking-wider text-xs font-bold cursor-pointer"
            >
              <span>View Transparent Pricing</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


