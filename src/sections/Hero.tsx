import React, { useState } from 'react';
import { ArrowRight, Sparkles, Compass, Layers, Code, TrendingUp } from 'lucide-react';
import { HeroScene } from '../components/HeroScene';
import { heroCapabilities } from '../data/navigation';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center pt-24 pb-16 lg:pt-0 lg:pb-0 overflow-hidden bg-[#08090B]"
    >
      {/* Background Radial Atmosphere Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mesh-radial pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#C5A059]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Hero Scene Canvas (Center-Right in desktop) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HeroScene activeCapability={activeCapability} />
      </div>

      {/* Foreground Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Editorial Typography & Action */}
          <div className="lg:col-span-7 space-y-8 pointer-events-auto">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-[#D4AF37]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] text-[#F3E5AB] uppercase">
                Digital Design • Technology • Innovation
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black uppercase tracking-[-0.03em] leading-[0.92] text-[#FFF5DC]">
                We Design <br />
                <span className="text-gold-gradient relative inline-block">
                  The Future.
                  {/* Subtle Underline Beam */}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-transparent opacity-80" />
                </span>
              </h1>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-xl">
              We build powerful digital experiences, intelligent technology, and brands designed to move businesses forward into the next generation.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta-btn"
                onClick={onStartProject}
                className="group relative px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#E5C378] text-[#08090B] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.55)] flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#08090B]" />
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta-btn"
                onClick={onExploreWork}
                className="px-8 py-4 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#D4AF37]/50 text-[#FFF5DC] font-semibold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Credibility Row Underneath */}
            <div className="pt-6 border-t border-white/[0.08] max-w-lg">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-white/60">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>01 — Strategy</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>02 — Design</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>03 — Build</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>04 — Growth</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Holographic Capability Nodes overlay */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center pointer-events-auto">
            
            {/* Holographic Capability Module Badges */}
            <div className="w-full max-w-sm space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]/80 text-right mb-2 hidden lg:block">
                • Integrated Capabilities Mesh •
              </div>

              <div className="grid grid-cols-2 gap-2">
                {heroCapabilities.slice(0, 6).map((cap) => {
                  const isHovered = activeCapability === cap.name;
                  return (
                    <div
                      key={cap.name}
                      onMouseEnter={() => setActiveCapability(cap.name)}
                      onMouseLeave={() => setActiveCapability(null)}
                      className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                        isHovered
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                          : 'border-white/[0.07] bg-[#0E0F14]/60 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold font-mono tracking-wider text-[#FFF5DC]">
                          {cap.name}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#D4AF37]' : 'bg-white/30'}`} />
                      </div>
                      <p className="text-[10px] text-white/50 mt-1 font-light truncate">
                        {cap.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* 7th capability node full width */}
              {heroCapabilities[6] && (
                <div
                  onMouseEnter={() => setActiveCapability(heroCapabilities[6].name)}
                  onMouseLeave={() => setActiveCapability(null)}
                  className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                    activeCapability === heroCapabilities[6].name
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                      : 'border-white/[0.07] bg-[#0E0F14]/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold font-mono tracking-wider text-[#FFF5DC]">
                      {heroCapabilities[6].name}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-[#D4AF37]">Ecosystem</span>
                  </div>
                  <p className="text-[10px] text-white/50 mt-0.5 font-light">
                    {heroCapabilities[6].desc}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/50">Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
