import React from 'react';
import { Compass, ArrowLeft, Globe, Package, Wrench, Sparkles, Home } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-10">
      <SEOHead
        title="404 — Page Not Found | BRANIFY"
        description="The requested page could not be found. Explore BRANIFY web development services, digital products, and free online tools."
        canonicalPath="/404"
      />
      <div className="relative inline-block">
        <div className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 flex items-center justify-center text-[#5A8DFF] shadow-2xl backdrop-blur-md">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Page Not Found
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          The requested URL does not exist or may have moved to a new permanent location. Explore our primary digital agency hubs below:
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
        <button
          onClick={() => navigate('/services')}
          className="p-5 rounded-2xl bg-[#08080A] border border-white/10 hover:border-[#5A8DFF]/40 transition-all group space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#5A8DFF] group-hover:scale-110 transition-transform">
            <Globe className="w-4 h-4" />
          </div>
          <div className="font-bold text-white text-xs">Explore Services</div>
          <p className="text-[11px] text-zinc-500">React, WordPress, UI/UX, SEO & AI</p>
        </button>

        <button
          onClick={() => navigate('/digital-products')}
          className="p-5 rounded-2xl bg-[#08080A] border border-white/10 hover:border-[#5A8DFF]/40 transition-all group space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#5A8DFF] group-hover:scale-110 transition-transform">
            <Package className="w-4 h-4" />
          </div>
          <div className="font-bold text-white text-xs">Digital Products</div>
          <p className="text-[11px] text-zinc-500">Canva, Notion & AI Prompt Kits</p>
        </button>

        <button
          onClick={() => navigate('/free-tools')}
          className="p-5 rounded-2xl bg-[#08080A] border border-white/10 hover:border-[#5A8DFF]/40 transition-all group space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#5A8DFF] group-hover:scale-110 transition-transform">
            <Wrench className="w-4 h-4" />
          </div>
          <div className="font-bold text-white text-xs">100+ Free Tools</div>
          <p className="text-[11px] text-zinc-500">PDF, Converters, Image tools</p>
        </button>
      </div>

      <div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3.5 btn-gradient-primary rounded-xl text-xs font-black uppercase tracking-widest inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-black" />
          <span>Back to Homepage</span>
        </button>
      </div>
    </div>
  );
};
