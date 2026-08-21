import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  PhoneCall,
  Layers,
  FileCheck
} from 'lucide-react';
import { ServiceInquiryModal } from '../components/ServiceInquiryModal';
import { ServicePackage } from '../types';

interface ServiceDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, navigate }) => {
  const { services, formatPrice, addToCart, currency, supportedCurrencies, detectedCountry, isAutoDetected } = useApp();
  const service = services.find((s) => s.slug === slug) || services[0];

  const activeCurrencyConfig = supportedCurrencies[currency] || supportedCurrencies.USD;

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPackageForInquiry, setSelectedPackageForInquiry] = useState<ServicePackage | undefined>(undefined);

  // Handle ordering or inquiring for a specific package
  const handlePackageAction = (pkg: ServicePackage) => {
    if (pkg.tier === 'on_demand' || pkg.priceUSD === 0) {
      setSelectedPackageForInquiry(pkg);
      setIsInquiryModalOpen(true);
    } else {
      addToCart({
        id: `service-${service.id}-${pkg.tier}`,
        title: `${service.name} (${pkg.name} Package)`,
        priceUSD: pkg.priceUSD,
        type: 'service',
        details: `${pkg.deliveryTime} delivery • ${pkg.revisions}`
      });
      navigate('/cart');
    }
  };

  const handleOpenGeneralInquiry = () => {
    const onDemandPkg = service.packages.find((p) => p.tier === 'on_demand') || service.packages[0];
    setSelectedPackageForInquiry(onDemandPkg);
    setIsInquiryModalOpen(true);
  };

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Back Button */}
      <button
        onClick={() => navigate('/services')}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#5A8DFF]" />
        Back to All Services
      </button>

      {/* Service Hero Header */}
      <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#5A8DFF] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#5A8DFF]" />
            {service.category.toUpperCase()} SERVICE
          </div>

          {/* Active Currency & Location Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-full text-xs text-zinc-300">
            <span>{activeCurrencyConfig.flag}</span>
            <span>
              Pricing converted to <strong className="text-white">{currency}</strong>
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
          {service.name}
        </h1>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {service.tagline}
        </p>

        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-4xl">
          {service.fullDescription}
        </p>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Standard Timeline</div>
              <div className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-[#5A8DFF]" />
                {service.deliveryTimeline}
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div>
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Pricing Structure</div>
              <div className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                <Layers className="w-4 h-4 text-[#5A8DFF]" />
                4 Transparent Packages
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleOpenGeneralInquiry}
              className="flex-1 sm:flex-none px-6 py-3.5 btn-gradient-primary text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Request Custom Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- 4 PACKAGES PRICING MATRIX --- */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest">
            Service Packages
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Choose Your Preferred Scope
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            All 4 tiers are engineered to fit distinct stages of growth — from initial launches to bespoke enterprise systems.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {service.packages.map((pkg) => {
            const isHighlighted = pkg.highlight || pkg.tier === 'professional';
            const isOnDemand = pkg.tier === 'on_demand';
            const hasPrice = pkg.priceUSD > 0;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#0e1626] to-[#0a0a0d] border-2 border-[#5A8DFF] shadow-2xl shadow-[#5A8DFF]/15 scale-[1.02] z-10'
                    : isOnDemand
                    ? 'bg-gradient-to-b from-zinc-900/90 to-[#080808] border border-[#5A8DFF]/30'
                    : 'bg-[#080808] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Highlight Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md ${
                        isHighlighted
                          ? 'bg-[#5A8DFF] text-black font-extrabold'
                          : 'bg-zinc-800 border border-white/10 text-zinc-300'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6 pt-2">
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed min-h-[36px]">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 bg-zinc-950/80 border border-white/10 rounded-2xl space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      {isOnDemand ? 'Pricing Model' : 'Investment'}
                    </div>
                    {isOnDemand ? (
                      <div className="text-xl font-black text-white uppercase">
                        Custom Quote
                      </div>
                    ) : hasPrice ? (
                      <div className="space-y-0.5">
                        <div className="text-2xl sm:text-3xl font-black text-[#5A8DFF]">
                          {formatPrice(pkg.priceUSD)}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-medium">
                          Converted to {currency} ({activeCurrencyConfig.symbol.trim()})
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <div className="text-lg font-extrabold text-white">
                          Contact for Quote
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Flat-rate pricing on request
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delivery Timeline & Revisions Meta */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                    <div className="p-2.5 bg-zinc-950 rounded-xl border border-white/5 space-y-0.5">
                      <div className="text-zinc-500 font-bold uppercase text-[9px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#5A8DFF]" />
                        Timeline
                      </div>
                      <div className="font-extrabold text-zinc-200">{pkg.deliveryTime}</div>
                    </div>
                    <div className="p-2.5 bg-zinc-950 rounded-xl border border-white/5 space-y-0.5">
                      <div className="text-zinc-500 font-bold uppercase text-[9px] flex items-center gap-1">
                        <RotateCcw className="w-3 h-3 text-[#5A8DFF]" />
                        Revisions
                      </div>
                      <div className="font-extrabold text-zinc-200">{pkg.revisions}</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                      Included In This Tier:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-zinc-300 font-medium leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A8DFF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => handlePackageAction(pkg)}
                    className={`w-full py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isHighlighted
                        ? 'btn-gradient-primary text-black'
                        : isOnDemand
                        ? 'bg-white hover:bg-zinc-200 text-black'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10'
                    }`}
                  >
                    {isOnDemand
                      ? 'Request Custom Quote'
                      : hasPrice
                      ? `Order Package (${formatPrice(pkg.priceUSD)})`
                      : 'Inquire for Quote'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SERVICE OVERVIEW & EXECUTION DETAILS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Key Advantages / Benefits */}
          <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#5A8DFF]" />
              Why Choose BRANIFY For {service.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-zinc-950 border border-white/10 rounded-2xl text-xs font-semibold text-zinc-200 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 flex items-center justify-center shrink-0 text-[#5A8DFF] font-bold text-[11px]">
                    ✓
                  </div>
                  <span className="mt-0.5">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Our 5-Stage Execution Framework
            </h2>
            <div className="space-y-3">
              {service.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-zinc-950 border border-white/10 rounded-2xl flex items-start gap-4 hover:border-white/20 transition-colors"
                >
                  <span className="text-lg font-black text-[#5A8DFF] shrink-0 font-mono">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#5A8DFF]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-2.5">
              {service.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left text-xs font-bold text-white flex items-center justify-between gap-3 uppercase tracking-wide"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#5A8DFF]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-zinc-400 border-t border-white/10 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Deliverables & Tech Stack */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 space-y-6 sticky top-28">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#5A8DFF]" />
                Final Deliverables
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {service.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-medium leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-[#5A8DFF] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.techStack && (
              <div className="pt-5 border-t border-white/10 space-y-3">
                <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">
                  Technologies & Frameworks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-zinc-950 border border-white/10 rounded-lg text-[11px] font-bold text-zinc-300 uppercase font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Consultation CTA */}
            <div className="pt-5 border-t border-white/10 space-y-3">
              <div className="text-xs font-bold text-white">
                Need a bespoke scope or NDA?
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Our solutions engineering team can craft a custom contract, milestone billing plan, and dedicated SLA for your team.
              </p>
              <button
                onClick={handleOpenGeneralInquiry}
                className="w-full py-3 btn-gradient-primary text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-lg"
              >
                Inquire With Requirements
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- EXPLORE OTHER SERVICES --- */}
      <div className="pt-12 border-t border-white/10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Explore Other Agency Services
            </h3>
            <p className="text-zinc-400 text-xs">
              Complete digital ecosystem support under one trusted roof.
            </p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="text-xs font-bold uppercase tracking-wider text-[#5A8DFF] hover:text-[#3B6EF6] transition-colors flex items-center gap-1"
          >
            All {services.length} Services
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((other) => (
            <div
              key={other.id}
              onClick={() => navigate(`/services/${other.slug}`)}
              className="p-6 bg-[#080808] border border-white/10 hover:border-[#5A8DFF]/40 rounded-3xl space-y-4 cursor-pointer group transition-all"
            >
              <div className="text-xs font-extrabold text-[#5A8DFF] uppercase tracking-widest">
                {other.category}
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight group-hover:text-[#5A8DFF] transition-colors">
                {other.name}
              </h4>
              <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                {other.shortDescription}
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">4 Tier Options</span>
                <span className="text-[#5A8DFF] font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        service={service}
        selectedPackage={selectedPackageForInquiry}
      />
    </div>
  );
};
