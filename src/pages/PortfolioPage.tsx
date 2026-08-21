import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  CheckCircle2,
  Cpu,
  ChevronRight,
  FolderGit2,
  Code2,
  Zap,
  ExternalLink,
  Maximize2,
  X,
  Eye,
  Monitor
} from 'lucide-react';

interface PortfolioPageProps {
  navigate: (path: string) => void;
  selectedSlug?: string;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate, selectedSlug }) => {
  const { portfolio } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'scroll' | 'expanded'>('scroll');

  const selectedItem = selectedSlug ? portfolio.find((p) => p.slug === selectedSlug) : null;

  const categories = ['All', 'Web Development', 'Web3', 'Real Estate', 'Beauty & Wellness', 'E-commerce'];

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter((p) => 
        p.category.toLowerCase() === selectedCategory.toLowerCase() || 
        p.industry.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (p.servicesProvided && p.servicesProvided.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase())))
      );

  // Other related case studies
  const relatedProjects = selectedItem
    ? portfolio.filter((p) => p.slug !== selectedItem.slug).slice(0, 3)
    : [];

  const getServiceLink = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web development':
      case 'wordpress':
      case 'e-commerce':
        return '/services';
      case 'branding':
      case 'ui/ux':
        return '/services';
      case 'ai':
        return '/services';
      default:
        return '/services';
    }
  };

  return (
    <div className="min-h-screen bg-[#05060B] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {selectedItem ? (
        /* =================================================== */
        /* INDIVIDUAL CASE STUDY VIEW                          */
        /* =================================================== */
        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <SEOHead
            title={`${selectedItem.title} — Case Study | BRANIFY`}
            description={`In-depth case study of ${selectedItem.title} for ${selectedItem.client}. Discover the engineering challenges, bespoke solutions, and measurable business growth delivered by BRANIFY.`}
            canonicalPath={`/portfolio/${selectedItem.slug}`}
          />

          {/* Breadcrumbs & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/[0.08] text-xs font-semibold text-zinc-400">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <button
                onClick={() => navigate('/portfolio')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Portfolio
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-zinc-200 truncate max-w-[200px] sm:max-w-none">{selectedItem.title}</span>
            </div>

            <button
              onClick={() => navigate('/portfolio')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Back to All Case Studies
            </button>
          </div>

          {/* Hero Header Banner */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                {selectedItem.category} Case Study
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300 text-[10px] font-bold uppercase tracking-wider">
                Industry: {selectedItem.industry}
              </span>
              {selectedItem.year && (
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-400 text-[10px] font-mono">
                  {selectedItem.year}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {selectedItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
              <div>
                Client: <span className="text-white font-bold">{selectedItem.client}</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="text-zinc-400">
                Crafted & Engineered by <span className="text-blue-400 font-bold">BRANIFY</span>
              </div>
            </div>
          </div>

          {/* Featured Complete Full-Page Website Screenshot Preview Container */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-300">
                <Monitor className="w-4 h-4 text-blue-400" />
                <span>Complete Full-Page Website Screenshot</span>
              </div>

              {/* View Mode Toggle Controls */}
              <div className="flex items-center gap-2">
                <div className="bg-white/[0.04] border border-white/[0.1] rounded-xl p-1 flex items-center gap-1 text-[11px] font-bold">
                  <button
                    onClick={() => setViewMode('scroll')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'scroll'
                        ? 'btn-gradient-primary text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Scrollable Frame
                  </button>
                  <button
                    onClick={() => setViewMode('expanded')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'expanded'
                        ? 'btn-gradient-primary text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Full-Length View
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="px-3 py-1.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zoom Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Browser Mockup Window */}
            <div className="rounded-3xl overflow-hidden border border-white/[0.15] shadow-2xl bg-[#080B14]">
              {/* Browser Header Bar */}
              <div className="bg-[#0D121F] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 bg-black/40 px-4 py-1.5 rounded-full border border-white/[0.08] truncate max-w-[260px] sm:max-w-[400px] text-center flex-1">
                  {selectedItem.liveUrl || 'https://branify.store'}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedItem.liveUrl && (
                    <a
                      href={selectedItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshot Viewport Container */}
              <div
                className={`bg-[#05060B] flex justify-center items-start w-full relative transition-all duration-300 ${
                  viewMode === 'scroll'
                    ? 'max-h-[640px] overflow-y-auto overflow-x-hidden'
                    : 'h-auto overflow-visible'
                }`}
              >
                <img
                  src={selectedItem.coverImage}
                  alt={`${selectedItem.title} - Complete Website Screenshot`}
                  className="w-full h-auto object-contain object-top block"
                  onError={(e) => {
                    // Fallback to live URL capture if local path encounters any issue
                    if (selectedItem.liveUrl && !(e.currentTarget.src.includes('image.thum.io'))) {
                      e.currentTarget.src = `https://image.thum.io/get/width/1200/fullpage/noanimate/${selectedItem.liveUrl}`;
                    }
                  }}
                />
              </div>

              {/* Screenshot Helper Footer Bar */}
              <div className="bg-[#0D121F] px-4 py-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-zinc-300">Complete Full-Page Design Capture</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullscreenModalOpen(true)}
                    className="text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect High-Res Screenshot
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Screenshot Modal */}
          {isFullscreenModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white uppercase">{selectedItem.title}</span>
                  <span className="text-xs text-zinc-500 font-mono">Full-Page View</span>
                </div>
                <button
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
                  title="Close Fullscreen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Image Container */}
              <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full rounded-2xl bg-[#080B14] border border-white/10 p-2 sm:p-4 shadow-2xl">
                <img
                  src={selectedItem.coverImage}
                  alt={`${selectedItem.title} Full-Resolution Screenshot`}
                  className="w-full h-auto object-contain object-top"
                />
              </div>
            </div>
          )}

          {/* Executive Overview */}
          <div className="bg-[#080B14]/90 border border-white/[0.1] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">
              <Sparkles className="w-4 h-4" />
              Executive Project Overview
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {selectedItem.challenge}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-[#080B14]/80 p-8 rounded-3xl border border-white/[0.1] shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-violet-400 text-xs font-black uppercase tracking-wider">
                <FolderGit2 className="w-4 h-4" />
                The Client Challenge
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedItem.challenge}
              </p>
            </div>

            <div className="space-y-4 bg-[#080B14]/80 p-8 rounded-3xl border border-white/[0.1] shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                The BRANIFY Solution
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedItem.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Architecture Highlights (if available) */}
          {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
            <div className="bg-[#080B14]/90 border border-white/[0.1] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                Key Project Highlights & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedItem.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-300 leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results & Business Impact */}
          {selectedItem.results && selectedItem.results.length > 0 && (
            <div className="space-y-6 bg-[#080B14] p-8 sm:p-10 rounded-3xl border border-white/[0.1] shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Verified Business Results & Impact
                </h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Performance Metrics
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedItem.results.map((res, idx) => (
                  <div key={idx} className="p-6 bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 rounded-2xl text-center space-y-2 transition-all">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto text-xs font-black">
                      0{idx + 1}
                    </div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider leading-relaxed">
                      {res}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack Tags */}
          {selectedItem.technologies && selectedItem.technologies.length > 0 && (
            <div className="bg-[#080B14]/90 border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                Technologies & Engineering Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedItem.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-zinc-200 rounded-full uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Gallery (if multiple images exist) */}
          {selectedItem.galleryImages && selectedItem.galleryImages.length > 1 && (
            <div className="space-y-4">
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                Project Visual Gallery
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedItem.galleryImages.slice(1).map((img, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-[#080B14] shadow-lg p-2">
                    <img
                      src={img}
                      alt={`${selectedItem.title} Gallery Screenshot ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related BRANIFY Services CTA Card */}
          <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/20 border border-blue-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                Need a Similar Digital Solution?
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Explore BRANIFY {selectedItem.category} Services
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                We build bespoke web platforms, brand systems, and automated workflows tailored to high-growth international businesses.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => navigate(getServiceLink(selectedItem.category))}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                View Services
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-7 py-3.5 btn-gradient-primary text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Related Case Studies */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  More Case Studies
                </h3>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Portfolio <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/portfolio/${p.slug}`)}
                    className="bg-[#080B14] hover:bg-[#0D121F] border border-white/10 hover:border-blue-500/40 rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-xl flex flex-col justify-between"
                  >
                    <div className="h-44 overflow-hidden relative bg-[#05060B] p-2 flex items-center justify-center">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (p.liveUrl && !(e.currentTarget.src.includes('image.thum.io'))) {
                            e.currentTarget.src = `https://image.thum.io/get/width/1200/fullpage/noanimate/${p.liveUrl}`;
                          }
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-extrabold text-blue-400 uppercase tracking-wider">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase">{p.client}</div>
                        <h4 className="text-xs font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2">
                          {p.title}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-zinc-400 group-hover:text-white">
                        <span>View Case Study</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* =================================================== */
        /* PUBLIC PORTFOLIO CATALOG VIEW                       */
        /* =================================================== */
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-12 relative z-10">
          <SEOHead
            title="Portfolio & Case Studies | BRANIFY"
            description="Explore our verified client websites, modern web architectures, and digital experiences engineered by BRANIFY."
            canonicalPath="/portfolio"
          />

          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-blue-400 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Client Work Showcase
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              Selected Work & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">Websites</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
              Real websites and digital experiences built by BRANIFY for ambitious brands worldwide.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'btn-gradient-primary text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid (Responsive full-width 3-4 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/portfolio/${item.slug}`)}
                className="bg-[#080B14]/90 hover:bg-[#0D121F] border border-white/[0.08] hover:border-blue-500/50 rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-xl flex flex-col justify-between relative backdrop-blur-md"
              >
                {/* Full-Page Screenshot Mockup Card Header & Container */}
                <div className="relative overflow-hidden bg-[#05060B] border-b border-white/[0.08]">
                  {/* Browser Window Frame Header */}
                  <div className="bg-[#0D121F] px-3.5 py-2 border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500 truncate max-w-[150px]">
                      {item.liveUrl ? item.liveUrl.replace('https://', '').replace('/', '') : 'branify.store'}
                    </div>
                    <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  {/* Image Viewport - Complete Screenshot presentation (object-contain, uncropped) */}
                  <div className="h-64 sm:h-72 w-full bg-[#05060B] overflow-hidden relative flex items-start justify-center p-2 group-hover:bg-zinc-900/40 transition-colors">
                    <img
                      src={item.coverImage}
                      alt={`${item.title} Screenshot`}
                      loading="lazy"
                      className="w-full h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        if (item.liveUrl && !(e.currentTarget.src.includes('image.thum.io'))) {
                          e.currentTarget.src = `https://image.thum.io/get/width/1200/fullpage/noanimate/${item.liveUrl}`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Hover Badge */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/15 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span>View Full Capture</span>
                    </div>
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      <span>{item.industry}</span>
                      {item.year && <span className="font-mono text-zinc-400">{item.year}</span>}
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                      {item.challenge}
                    </p>

                    {item.servicesProvided && item.servicesProvided.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.servicesProvided.slice(0, 3).map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-zinc-300 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights / Results Pill */}
                  {item.results && item.results.length > 0 && (
                    <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-[11px] font-bold text-zinc-300 truncate">
                        {item.results[0]}
                      </span>
                    </div>
                  )}

                  {/* Bottom Action CTA */}
                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-extrabold text-blue-400">
                    <span className="uppercase tracking-wider text-[11px]">View Complete Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Lead Gen CTA Banner */}
          <div className="bg-[#080B14]/90 border border-white/[0.1] rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-extrabold uppercase tracking-widest text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Start Your Digital Transformation
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Ready to Build Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">High-Performance Website</span>?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Partner with BRANIFY to create custom digital platforms, Web3 applications, and brand identities engineered for global impact.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 btn-gradient-primary text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-6 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
              >
                Explore Services & Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
