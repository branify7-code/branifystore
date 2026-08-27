import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Palette, Save, Upload, Sparkles, RefreshCw, Eye, Download, Image as ImageIcon } from 'lucide-react';
import { BranifyLogo } from '../BranifyLogo';

export const AdminBrandSettingsTab: React.FC = () => {
  const { settings, updateSettings, uploadFileToStorage } = useApp();

  const [form, setForm] = useState({
    logoUrl: settings.brandAssets?.logoUrl || '/branify-logo.png',
    logoDarkUrl: settings.brandAssets?.logoDarkUrl || '/branify-logo-dark.png',
    monogramUrl: settings.brandAssets?.monogramUrl || '/branify-monogram.png',
    faviconUrl: settings.brandAssets?.faviconUrl || '/favicon.ico',
    primaryColor: settings.brandAssets?.primaryColor || '#F27D26',
    secondaryColor: settings.brandAssets?.secondaryColor || '#5A8DFF',
    accentColor: settings.brandAssets?.accentColor || '#10B981',
    darkBgColor: settings.brandAssets?.darkBgColor || '#050505',
    fontFamilyHeading: settings.brandAssets?.fontFamilyHeading || 'Plus Jakarta Sans',
    fontFamilyBody: settings.brandAssets?.fontFamilyBody || 'Inter',
    tagline: settings.tagline || 'BUILD. BRAND. GROW.',
    siteName: settings.siteName || 'BRANIFY'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleFileUpload = async (field: 'logoUrl' | 'logoDarkUrl' | 'monogramUrl' | 'faviconUrl', file: File) => {
    setUploadingField(field);
    const { url, error } = await uploadFileToStorage(file, 'media', 'brand');
    if (url) {
      setForm((prev) => ({ ...prev, [field]: url }));
    }
    setUploadingField(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      siteName: form.siteName,
      tagline: form.tagline,
      brandAssets: {
        logoUrl: form.logoUrl,
        logoDarkUrl: form.logoDarkUrl,
        monogramUrl: form.monogramUrl,
        faviconUrl: form.faviconUrl,
        primaryColor: form.primaryColor,
        secondaryColor: form.secondaryColor,
        accentColor: form.accentColor,
        darkBgColor: form.darkBgColor,
        fontFamilyHeading: form.fontFamilyHeading,
        fontFamilyBody: form.fontFamilyBody
      }
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Brand Identity & Visual System</h2>
            <p className="text-xs text-zinc-400">Customize official logos, wordmarks, monograms, color scheme, and typography.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Brand Settings'}
        </button>
      </div>

      {/* Live Brand Preview Card */}
      <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
            <Eye className="w-4 h-4 text-[#5A8DFF]" />
            Live Logo & Typography Rendering
          </div>
          <a
            href="/branify-logo.png"
            download="branify-logo.png"
            className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-xs rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download Brand Pack PNG
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-center min-h-[120px]">
            <BranifyLogo size="lg" showTagline={true} />
          </div>
          <div className="p-6 bg-white border border-black/10 rounded-xl flex items-center justify-center min-h-[120px]">
            <BranifyLogo size="lg" showTagline={true} className="invert brightness-0" />
          </div>
        </div>
      </div>

      {/* Brand Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logos & Assets */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <ImageIcon className="w-4 h-4 text-[#F27D26]" />
            Brand Mark & Logos
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Primary Logo URL (Light Mode / Standard)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.logoUrl}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="/branify-logo.png"
                />
                <label className="cursor-pointer px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 flex items-center gap-1.5 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingField === 'logoUrl' ? '...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload('logoUrl', e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Dark Logo URL (Inverted Backgrounds)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.logoDarkUrl}
                  onChange={(e) => setForm({ ...form, logoDarkUrl: e.target.value })}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="/branify-logo-dark.png"
                />
                <label className="cursor-pointer px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 flex items-center gap-1.5 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingField === 'logoDarkUrl' ? '...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload('logoDarkUrl', e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Brand Name Text</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="BRANIFY"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Official Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="BUILD. BRAND. GROW."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-[#5A8DFF]" />
            Color Palette & Hex Values
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Primary Accent (Brand Orange)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Secondary Accent (Tech Blue)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Emerald / Live Status Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Dark Mode Slate Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.darkBgColor}
                    onChange={(e) => setForm({ ...form, darkBgColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.darkBgColor}
                    onChange={(e) => setForm({ ...form, darkBgColor: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
