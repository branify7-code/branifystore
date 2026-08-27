import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Search,
  Globe,
  LayoutGrid,
  MousePointerClick,
  Figma,
  Palette,
  Sparkles,
  Share2,
  Presentation,
  Bot,
  TrendingUp,
  Clock,
  RotateCcw,
  CheckCircle2,
  Save,
  Plus,
  Trash2,
  DollarSign,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  BadgePercent
} from 'lucide-react';
import { ServiceItem, ServicePackage, ServicePackageTier } from '../../types';

interface AdminServicesTabProps {
  onNavigateToService?: (slug: string) => void;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({ onNavigateToService }) => {
  const {
    services,
    updateServicePackage,
    updateService,
    resetServicesToDefault,
    formatPrice,
    convertPrice,
    supportedCurrencies,
    addToast
  } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'website-development');
  const [activeTierTab, setActiveTierTab] = useState<ServicePackageTier>('professional');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isSaving, setIsSaving] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  // Local draft state for selected service and its packages
  const [serviceDraft, setServiceDraft] = useState<ServiceItem>(selectedService);

  // Sync draft when selectedService changes
  React.useEffect(() => {
    if (selectedService) {
      setServiceDraft(JSON.parse(JSON.stringify(selectedService)));
    }
  }, [selectedServiceId, services]);

  const activePackageDraft = serviceDraft?.packages?.find((p) => p.tier === activeTierTab) || serviceDraft?.packages?.[0];

  const handleUpdatePackageDraft = (updates: Partial<ServicePackage>) => {
    setServiceDraft((prev) => {
      const updatedPackages = (prev.packages || []).map((pkg) => {
        if (pkg.tier !== activeTierTab && pkg.id !== activePackageDraft?.id) return pkg;
        return { ...pkg, ...updates };
      });
      return { ...prev, packages: updatedPackages };
    });
  };

  const handleFeaturesChange = (text: string) => {
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    handleUpdatePackageDraft({ features: lines });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // 1. Update the overall service
      await updateService(serviceDraft.id, {
        name: serviceDraft.name,
        tagline: serviceDraft.tagline,
        shortDescription: serviceDraft.shortDescription,
        fullDescription: serviceDraft.fullDescription,
        deliveryTimeline: serviceDraft.deliveryTimeline,
        category: serviceDraft.category
      });

      // 2. Update each of the packages
      for (const pkg of serviceDraft.packages) {
        await updateServicePackage(serviceDraft.id, pkg.id, {
          name: pkg.name,
          tier: pkg.tier,
          priceUSD: Number(pkg.priceUSD) || 0,
          deliveryTime: pkg.deliveryTime,
          revisions: pkg.revisions,
          description: pkg.description,
          features: pkg.features,
          highlight: pkg.highlight,
          badge: pkg.badge,
          isActive: pkg.isActive
        });
      }

      setIsSaving(false);
      addToast(`Updated ${serviceDraft.name} and all 4 package tiers successfully!`, 'success');
    } catch (err) {
      setIsSaving(false);
      addToast('Failed to save service changes.', 'error');
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const previewCurrencies = ['USD', 'PKR', 'AED', 'SAR', 'GBP', 'EUR', 'CAD', 'INR'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-[#F27D26]" />
            Agency Services & 4-Tier Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Services & Package Pricing Manager
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Manage all 11 core BRANIFY services and configure base USD pricing for the 4 tiers (Basic, Professional, Premium, Client On-Demand). All prices convert dynamically on the client-side based on the visitor&apos;s country.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all 11 services and package prices to initial defaults?')) {
                resetServicesToDefault();
              }
            }}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          {onNavigateToService && selectedService && (
            <button
              onClick={() => onNavigateToService(selectedService.slug)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-colors flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Live Page
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Services Selector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Filter */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  categoryFilter === 'all' ? 'bg-[#F27D26] text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                All ({services.length})
              </button>
              <button
                onClick={() => setCategoryFilter('web')}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  categoryFilter === 'web' ? 'bg-[#F27D26] text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setCategoryFilter('branding')}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  categoryFilter === 'branding' ? 'bg-[#F27D26] text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Branding
              </button>
              <button
                onClick={() => setCategoryFilter('marketing')}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  categoryFilter === 'marketing' ? 'bg-[#F27D26] text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Growth
              </button>
            </div>
          </div>

          {/* List of Services */}
          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredServices.map((srv) => {
              const isSelected = srv.id === selectedServiceId;
              const nonZeroPrices = (srv.packages || []).map((p) => p.priceUSD).filter((p) => p > 0);
              const minPrice = nonZeroPrices.length > 0 ? Math.min(...nonZeroPrices) : 0;

              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-900 border-[#F27D26] shadow-lg'
                      : 'bg-[#080808] border-white/5 hover:border-white/20 hover:bg-zinc-950'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#F27D26]">
                        {srv.category}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        4 tiers
                      </span>
                    </div>
                    <div className="text-xs font-black text-white uppercase tracking-tight truncate">
                      {srv.name}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {minPrice > 0 ? `From ${formatPrice(minPrice)}` : 'Pricing on Request ($0 Base)'}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#F27D26] translate-x-1' : 'text-zinc-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Service & Packages Editor */}
        <div className="lg:col-span-8 space-y-6">
          {serviceDraft && (
            <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              {/* Header Info of Selected Service */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-t border-white/10 sm:border-t-0 pt-2 sm:pt-0 border-b">
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold text-[#F27D26] uppercase tracking-widest">
                    Editing Service
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {serviceDraft.name}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xl">
                    {serviceDraft.tagline}
                  </p>
                </div>

                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className="px-6 py-3 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Service & Packages
                    </>
                  )}
                </button>
              </div>

              {/* Service General Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceDraft.name}
                    onChange={(e) => setServiceDraft({ ...serviceDraft, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Delivery Timeline
                  </label>
                  <input
                    type="text"
                    value={serviceDraft.deliveryTimeline}
                    onChange={(e) => setServiceDraft({ ...serviceDraft, deliveryTimeline: e.target.value })}
                    placeholder="e.g. 5–14 Days"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={serviceDraft.tagline}
                    onChange={(e) => setServiceDraft({ ...serviceDraft, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
              </div>

              {/* 4 Packages Tabs Header */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#F27D26]" />
                    4 Package Tiers Configuration
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Active Tab: <strong className="text-white uppercase">{activeTierTab}</strong>
                  </span>
                </div>

                {/* Tier Selector Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(serviceDraft.packages || []).map((pkg) => {
                    const isActive = pkg.tier === activeTierTab;
                    return (
                      <button
                        key={pkg.id || pkg.tier}
                        onClick={() => setActiveTierTab(pkg.tier)}
                        className={`p-3 rounded-2xl border text-left transition-all relative ${
                          isActive
                            ? 'bg-[#18120b] border-[#F27D26] text-white shadow-lg'
                            : 'bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {pkg.badge && (
                          <span className="absolute top-2 right-2 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/10 text-white">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="text-xs font-extrabold uppercase tracking-tight">
                          {pkg.name}
                        </div>
                        <div className="text-[11px] font-mono mt-1 text-[#F27D26]">
                          {pkg.priceUSD > 0 ? `$${pkg.priceUSD}` : pkg.tier === 'on_demand' ? 'Custom Quote' : '$0 (Quote)'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Package Editor Section */}
              {activePackageDraft && (
                <div className="p-6 bg-zinc-950/80 border border-white/10 rounded-2xl space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="space-y-0.5">
                      <div className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <span>{activePackageDraft.name} Package</span>
                        {activePackageDraft.highlight && (
                          <span className="px-2 py-0.5 bg-[#F27D26] text-black text-[9px] font-black rounded-full uppercase">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        Tier Key: <code className="font-mono text-zinc-400">{activePackageDraft.tier}</code>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                        <input
                          type="checkbox"
                          checked={activePackageDraft.highlight ?? false}
                          onChange={(e) => handleUpdatePackageDraft({ highlight: e.target.checked })}
                          className="rounded border-white/20 bg-zinc-900 text-[#F27D26] focus:ring-0"
                        />
                        <span>Highlight as &quot;Most Popular&quot;</span>
                      </label>
                    </div>
                  </div>

                  {/* Pricing Input & Live Multi-Currency Conversion Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Base USD Price Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Base Price (USD $)</span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          {activePackageDraft.tier === 'on_demand' ? 'Always shows Custom Quote' : 'Set 0 for "Contact for Pricing"'}
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-[#F27D26] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          min={0}
                          step={1}
                          disabled={activePackageDraft.tier === 'on_demand'}
                          value={activePackageDraft.priceUSD}
                          onChange={(e) => handleUpdatePackageDraft({ priceUSD: Number(e.target.value) || 0 })}
                          placeholder="0"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#F27D26] disabled:opacity-50"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        When set to 0, visitors will see &quot;Contact for Quote&quot; and the order button opens the interactive inquiry modal.
                      </p>
                    </div>

                    {/* Badge / Label */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                        Package Badge / Sub-Label
                      </label>
                      <input
                        type="text"
                        value={activePackageDraft.badge || ''}
                        onChange={(e) => handleUpdatePackageDraft({ badge: e.target.value })}
                        placeholder="e.g. Most Popular, Enterprise Ready"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                      />
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#F27D26]" />
                        Delivery Timeline
                      </label>
                      <input
                        type="text"
                        value={activePackageDraft.deliveryTime}
                        onChange={(e) => handleUpdatePackageDraft({ deliveryTime: e.target.value })}
                        placeholder="e.g. 5–7 Days or Custom Scope"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                      />
                    </div>

                    {/* Revisions */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-[#F27D26]" />
                        Revisions Policy
                      </label>
                      <input
                        type="text"
                        value={activePackageDraft.revisions}
                        onChange={(e) => handleUpdatePackageDraft({ revisions: e.target.value })}
                        placeholder="e.g. 2 Revisions or Unlimited Revisions"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                      />
                    </div>
                  </div>

                  {/* Live Multi-Currency Conversion Preview Bar */}
                  {activePackageDraft.priceUSD > 0 && activePackageDraft.tier !== 'on_demand' && (
                    <div className="p-4 bg-zinc-900/90 border border-white/10 rounded-2xl space-y-2.5">
                      <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#F27D26]" />
                        Live Multi-Currency Preview For International Visitors:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {previewCurrencies.map((cCode) => {
                          const conf = supportedCurrencies[cCode];
                          if (!conf) return null;
                          const converted = convertPrice(activePackageDraft.priceUSD);
                          return (
                            <div
                              key={cCode}
                              className="p-2 bg-zinc-950 border border-white/5 rounded-xl text-center space-y-0.5"
                            >
                              <div className="text-[10px] text-zinc-500 font-bold flex items-center justify-center gap-1">
                                <span>{conf.flag}</span>
                                <span>{cCode}</span>
                              </div>
                              <div className="text-xs font-black text-[#F27D26] font-mono">
                                {conf.symbol} {Math.round(activePackageDraft.priceUSD * conf.defaultRate).toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                      Package Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={activePackageDraft.description}
                      onChange={(e) => handleUpdatePackageDraft({ description: e.target.value })}
                      placeholder="Brief overview of what this tier accomplishes..."
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26] resize-none"
                    />
                  </div>

                  {/* Features List (Multi-line) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                      <span>Included Features List (One item per line)</span>
                      <span className="text-[10px] text-zinc-500 font-normal">
                        {activePackageDraft.features.length} features active
                      </span>
                    </label>
                    <textarea
                      rows={6}
                      value={activePackageDraft.features.join('\n')}
                      onChange={(e) => handleFeaturesChange(e.target.value)}
                      placeholder="Type each feature on a separate line..."
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  {/* Quick Save Trigger */}
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save All Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
