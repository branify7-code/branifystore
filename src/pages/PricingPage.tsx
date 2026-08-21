import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import { Check, Sparkles, ArrowRight, Layers, MessageSquare, PhoneCall } from 'lucide-react';

interface PricingPageProps {
  navigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ navigate }) => {
  const {
    services,
    formatPrice,
    currency,
    detectedCountry,
    isAutoDetected,
    supportedCurrencies
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeCurrencyConfig = supportedCurrencies[currency] || supportedCurrencies.USD;

  // Filter services by category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#5A8DFF]" />
          Transparent Global Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Simple, Predictable Service Pricing
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          No hidden hourly surcharges or surprise billing. Transparent quotes with automated local currency conversion across 30+ international regions.
        </p>

        {/* Currency & Location Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-white/10 rounded-xl text-xs text-zinc-300">
          <span className="text-base">{activeCurrencyConfig.flag}</span>
          <span>
            Viewing prices in <strong className="text-white">{currency} ({activeCurrencyConfig.symbol.trim()})</strong>
            {detectedCountry && isAutoDetected ? ` for ${detectedCountry.countryName}` : ''}
          </span>
          <span className="text-zinc-500 font-normal text-[11px] hidden sm:inline-block">
            (Live rates updated automatically)
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'web', label: 'Website & Development' },
          { id: 'design', label: 'Design & Branding' },
          { id: 'growth', label: 'Growth & Technology' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all ${
              activeCategory === tab.id
                ? 'btn-gradient-primary shadow-lg'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services and Package Pricing Grid */}
      <div className="space-y-12">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-[#08080A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#5A8DFF]">
                  {service.category === 'web' ? 'Website & Development' : service.category === 'design' ? 'Design & Branding' : 'Growth & Technology'}
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  {service.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{service.tagline}</p>
              </div>

              <button
                onClick={() => navigate(`/services/${service.slug}`)}
                className="self-start sm:self-auto px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-bold text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5A8DFF]" />
              </button>
            </div>

            {/* 4 Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {service.packages.map((pkg) => {
                const isCustom = pkg.tier === 'custom' || pkg.name.toLowerCase().includes('on-demand');
                const isPriceConfigured = pkg.priceUSD && pkg.priceUSD > 0;

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl p-5 flex flex-col justify-between space-y-5 border transition-all ${
                      pkg.highlight
                        ? 'bg-[#5A8DFF]/5 border-[#5A8DFF]/40 shadow-lg'
                        : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-wider">
                          {pkg.name}
                        </span>
                        {pkg.badge && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-[#5A8DFF] text-black rounded">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      {/* Price Display */}
                      <div className="pt-2">
                        {isCustom ? (
                          <div className="text-lg font-black text-[#5A8DFF] uppercase tracking-tight">
                            Custom Quote
                          </div>
                        ) : isPriceConfigured ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">
                              {formatPrice(pkg.priceUSD)}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase">/ Flat</span>
                          </div>
                        ) : (
                          <div className="text-sm font-bold text-[#5A8DFF]">
                            Contact for pricing
                          </div>
                        )}
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Features preview */}
                      <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-zinc-300">
                        {pkg.features.slice(0, 4).map((f, fi) => (
                          <div key={fi} className="flex items-start gap-2 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-[#5A8DFF] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                        {pkg.features.length > 4 && (
                          <span className="text-[10px] text-zinc-500 block pl-5">
                            +{pkg.features.length - 4} more features
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/contact')}
                      className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        isCustom
                          ? 'btn-gradient-primary text-black'
                          : pkg.highlight
                          ? 'bg-[#5A8DFF] text-black hover:bg-[#4a7de0]'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      {isCustom ? (
                        <>
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Request Quote</span>
                        </>
                      ) : (
                        <span>Get Started</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Need Custom Consultation Banner */}
      <div className="bg-gradient-to-r from-blue-950/30 via-zinc-900 to-blue-950/30 border border-[#5A8DFF]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">
            Need an Enterprise Custom Solution?
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl">
            Have multi-platform requirements, legacy migrations, or high-security architectures? Schedule an executive strategy session with our senior engineering team.
          </p>
        </div>

        <button
          onClick={() => navigate('/contact')}
          className="px-6 py-3.5 btn-gradient-primary rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shrink-0"
        >
          <PhoneCall className="w-4 h-4 text-black" />
          <span>Book Consultation</span>
        </button>
      </div>
    </div>
  );
};
