import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layout, Save, Sparkles, Plus, Trash2, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

export const AdminHomepageTab: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [form, setForm] = useState({
    heroBadge: settings.heroBadge || 'EXECUTIVE AI & FULL-STACK DIGITAL PRODUCT STUDIO',
    heroTitle: settings.heroTitle || 'Architecting High-Velocity Brands, Intelligent AI Agents & Enterprise Software.',
    heroSubtitle: settings.heroSubtitle || 'We engineer custom digital solutions, deploy autonomous AI systems, and build scalable web applications that accelerate global revenue.',
    primaryCtaText: settings.homepageContent?.primaryCtaText || 'Explore Services',
    primaryCtaLink: settings.homepageContent?.primaryCtaLink || '/services',
    secondaryCtaText: settings.homepageContent?.secondaryCtaText || 'Get Free Templates',
    secondaryCtaLink: settings.homepageContent?.secondaryCtaLink || '/free-templates',
    guaranteeBadgeText: settings.homepageContent?.guaranteeBadgeText || '100% Satisfaction or Full Milestone Refund Guarantee',
    metrics: settings.homepageContent?.metrics || [
      { label: 'Client Revenue Accelerated', value: '$48M+' },
      { label: 'High-Impact Deployments', value: '250+' },
      { label: 'Global Client Retention', value: '99.4%' },
      { label: 'Average Delivery Velocity', value: '14 Days' }
    ],
    trustedCompanies: settings.homepageContent?.trustedCompanies || [
      'NextEra AI',
      'VentureScale',
      'QuantumSync',
      'ApexCloud',
      'HyperGrowth'
    ]
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleMetricChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...form.metrics];
    updated[index][field] = val;
    setForm({ ...form, metrics: updated });
  };

  const addMetric = () => {
    setForm({
      ...form,
      metrics: [...form.metrics, { label: 'New Metric', value: '100%' }]
    });
  };

  const removeMetric = (index: number) => {
    setForm({
      ...form,
      metrics: form.metrics.filter((_, i) => i !== index)
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      heroBadge: form.heroBadge,
      heroTitle: form.heroTitle,
      heroSubtitle: form.heroSubtitle,
      homepageContent: {
        heroBadge: form.heroBadge,
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        primaryCtaText: form.primaryCtaText,
        primaryCtaLink: form.primaryCtaLink,
        secondaryCtaText: form.secondaryCtaText,
        secondaryCtaLink: form.secondaryCtaLink,
        guaranteeBadgeText: form.guaranteeBadgeText,
        metrics: form.metrics,
        trustedCompanies: form.trustedCompanies
      }
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#F27D26]/10 border border-[#F27D26]/20 flex items-center justify-center text-[#F27D26]">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Homepage Content & Marketing Copy</h2>
            <p className="text-xs text-zinc-400">Control the front-facing hero headlines, conversion CTAs, revenue metrics, and trust proof.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Homepage Copy'}
        </button>
      </div>

      {/* Hero Content */}
      <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
          <Sparkles className="w-4 h-4 text-[#F27D26]" />
          Hero Stage & Conversion Funnel
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Top Eyebrow Badge Pill</label>
            <input
              type="text"
              value={form.heroBadge}
              onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
              placeholder="EXECUTIVE AI & FULL-STACK DIGITAL PRODUCT STUDIO"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Main H1 Hero Headline</label>
            <textarea
              rows={2}
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26] text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Hero Supporting Subtitle</label>
            <textarea
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl space-y-3">
              <div className="text-white font-bold text-xs">Primary CTA Button</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">Button Label</label>
                  <input
                    type="text"
                    value={form.primaryCtaText}
                    onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">Destination URL / Route</label>
                  <input
                    type="text"
                    value={form.primaryCtaLink}
                    onChange={(e) => setForm({ ...form, primaryCtaLink: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl space-y-3">
              <div className="text-white font-bold text-xs">Secondary CTA Button</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">Button Label</label>
                  <input
                    type="text"
                    value={form.secondaryCtaText}
                    onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">Destination URL / Route</label>
                  <input
                    type="text"
                    value={form.secondaryCtaLink}
                    onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics & Proof Stats */}
      <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <BarChart2 className="w-4 h-4 text-[#5A8DFF]" />
            Enterprise Proof & Impact Metrics
          </div>
          <button
            type="button"
            onClick={addMetric}
            className="flex items-center gap-1 text-xs text-[#F27D26] hover:underline font-bold"
          >
            <Plus className="w-3.5 h-3.5" /> Add Metric
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {form.metrics.map((m, idx) => (
            <div key={idx} className="p-4 bg-zinc-900 border border-white/10 rounded-xl space-y-2 relative group">
              <button
                type="button"
                onClick={() => removeMetric(idx)}
                className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div>
                <label className="block text-zinc-500 text-[10px] uppercase font-bold mb-1">Metric Number / Value</label>
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-black text-base focus:outline-none focus:border-[#5A8DFF]"
                />
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] uppercase font-bold mb-1">Label / Description</label>
                <input
                  type="text"
                  value={m.label}
                  onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-zinc-300 text-xs focus:outline-none focus:border-[#5A8DFF]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Guarantee Banner */}
      <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Satisfaction & Security Guarantee Badge
        </div>

        <div className="text-xs">
          <label className="block text-zinc-400 font-semibold mb-1">Guarantee Badge Text</label>
          <input
            type="text"
            value={form.guaranteeBadgeText}
            onChange={(e) => setForm({ ...form, guaranteeBadgeText: e.target.value })}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            placeholder="100% Satisfaction or Full Milestone Refund Guarantee"
          />
        </div>
      </div>
    </form>
  );
};
