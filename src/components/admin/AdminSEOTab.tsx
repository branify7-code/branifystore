import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Save, Globe, Share2, Code2, RefreshCw, BarChart } from 'lucide-react';

export const AdminSEOTab: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [form, setForm] = useState({
    metaTitle: settings.seoSettings?.metaTitle || 'BRANIFY | Executive AI & Full-Stack Digital Product Studio',
    metaDescription: settings.seoSettings?.metaDescription || 'BRANIFY engineers high-velocity brands, autonomous AI agents, enterprise web applications, and custom digital software systems that drive multi-million dollar scale.',
    seoKeywords: settings.seoSettings?.seoKeywords || 'AI Agents, Full-Stack Web Development, SaaS Development, Brand Strategy, Supabase Development, Digital Agency',
    canonicalBaseUrl: settings.seoSettings?.canonicalBaseUrl || 'https://branify.com',
    ogTitle: settings.seoSettings?.ogTitle || 'BRANIFY - Build. Brand. Grow.',
    ogDescription: settings.seoSettings?.ogDescription || 'High-performance AI, custom web engineering, and digital growth infrastructure.',
    ogImage: settings.seoSettings?.ogImage || 'https://branify.com/og-banner.jpg',
    twitterHandle: settings.seoSettings?.twitterHandle || '@branify',
    twitterCardType: settings.seoSettings?.twitterCardType || 'summary_large_image',
    googleAnalyticsId: settings.seoSettings?.googleAnalyticsId || 'G-BRANIFY2026',
    googleTagManagerId: settings.seoSettings?.googleTagManagerId || 'GTM-BRAN99',
    facebookPixelId: settings.seoSettings?.facebookPixelId || '',
    structuredDataSchema: settings.seoSettings?.structuredDataSchema || 'Organization'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      seoSettings: form
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#5A8DFF]/10 border border-[#5A8DFF]/20 flex items-center justify-center text-[#5A8DFF]">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Search Engine Optimization & Social Sharing</h2>
            <p className="text-xs text-zinc-400">Configure global metadata, search snippets, OpenGraph image cards, and tracking analytics pixels.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </div>

      {/* Google SERP Preview Card */}
      <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-3">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#5A8DFF]" />
          Google Search Result Snippet Preview
        </div>
        <div className="p-4 bg-white text-zinc-900 rounded-xl space-y-1 font-sans">
          <div className="text-[11px] text-zinc-600 flex items-center gap-1">
            <span>{form.canonicalBaseUrl}</span>
            <span>›</span>
            <span>official</span>
          </div>
          <div className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
            {form.metaTitle}
          </div>
          <div className="text-xs text-[#4d5156] line-clamp-2">
            {form.metaDescription}
          </div>
        </div>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Meta */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Search className="w-4 h-4 text-[#F27D26]" />
            Global Meta Tags
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-zinc-400 font-semibold">Global Meta Title (Max 60 chars)</label>
                <span className={`text-[10px] ${form.metaTitle.length > 60 ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>
                  {form.metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-zinc-400 font-semibold">Meta Description (150-160 chars optimal)</label>
                <span className={`text-[10px] ${form.metaDescription.length > 160 ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>
                  {form.metaDescription.length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Target Search Keywords (comma-separated)</label>
              <input
                type="text"
                value={form.seoKeywords}
                onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Canonical Base URL</label>
              <input
                type="text"
                value={form.canonicalBaseUrl}
                onChange={(e) => setForm({ ...form, canonicalBaseUrl: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                placeholder="https://branify.com"
              />
            </div>
          </div>
        </div>

        {/* Social Sharing & OpenGraph */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Share2 className="w-4 h-4 text-purple-400" />
            Social OpenGraph & Twitter Cards
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">OG Share Title</label>
              <input
                type="text"
                value={form.ogTitle}
                onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">OG Banner Image URL (1200x630px)</label>
              <input
                type="text"
                value={form.ogImage}
                onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="https://branify.com/og-banner.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Twitter / X Handle</label>
                <input
                  type="text"
                  value={form.twitterHandle}
                  onChange={(e) => setForm({ ...form, twitterHandle: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="@branify"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Twitter Card Type</label>
                <select
                  value={form.twitterCardType}
                  onChange={(e) => setForm({ ...form, twitterCardType: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics & Tracking Pixels */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <BarChart className="w-4 h-4 text-emerald-400" />
            Analytics Integration & Conversion Pixels
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Google Analytics 4 Measurement ID</label>
              <input
                type="text"
                value={form.googleAnalyticsId}
                onChange={(e) => setForm({ ...form, googleAnalyticsId: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Google Tag Manager Container ID</label>
              <input
                type="text"
                value={form.googleTagManagerId}
                onChange={(e) => setForm({ ...form, googleTagManagerId: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="GTM-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Meta / Facebook Pixel ID</label>
              <input
                type="text"
                value={form.facebookPixelId}
                onChange={(e) => setForm({ ...form, facebookPixelId: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="Pixel ID"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
