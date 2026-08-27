import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Save, MapPin, Mail, Phone, Clock, Globe, Shield, RefreshCw } from 'lucide-react';

export const AdminBusinessSettingsTab: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [form, setForm] = useState({
    legalName: settings.companyDetails?.legalName || 'BRANIFY Global Ventures LLC',
    registrationNumber: settings.companyDetails?.registrationNumber || 'REG-2026-BRAN-9021',
    taxId: settings.companyDetails?.taxId || 'US-EIN-98-3419201',
    address: settings.companyDetails?.address || '100 Innovation Way, Suite 400',
    city: settings.companyDetails?.city || 'San Francisco',
    state: settings.companyDetails?.state || 'CA',
    country: settings.companyDetails?.country || 'United States',
    postalCode: settings.companyDetails?.postalCode || '94105',
    currency: settings.companyDetails?.currency || 'USD',
    operatingHours: settings.companyDetails?.operatingHours || 'Mon - Fri: 9:00 AM - 6:00 PM (EST)',
    supportEmail: settings.contactInfo?.supportEmail || 'admin@branify.store',
    salesEmail: settings.contactInfo?.salesEmail || 'admin@branify.store',
    pressEmail: settings.contactInfo?.pressEmail || 'admin@branify.store',
    phone: settings.contactInfo?.phone || '+1 (555) 019-2834',
    secondaryPhone: settings.contactInfo?.secondaryPhone || '',
    whatsapp: settings.contactInfo?.whatsapp || '+92 332 1029333',
    socials: {
      twitter: settings.socials?.twitter || 'https://x.com/branify_store',
      linkedin: settings.socials?.linkedin || 'https://linkedin.com/company/branify',
      github: settings.socials?.github || 'https://github.com/branify',
      instagram: settings.socials?.instagram || 'https://www.instagram.com/branify001'
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      companyDetails: {
        legalName: form.legalName,
        registrationNumber: form.registrationNumber,
        taxId: form.taxId,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        postalCode: form.postalCode,
        currency: form.currency,
        operatingHours: form.operatingHours
      },
      contactInfo: {
        supportEmail: form.supportEmail,
        salesEmail: form.salesEmail,
        pressEmail: form.pressEmail,
        phone: form.phone,
        secondaryPhone: form.secondaryPhone,
        whatsapp: form.whatsapp
      },
      contactEmail: form.supportEmail,
      contactPhone: form.phone,
      contactWhatsApp: form.whatsapp,
      location: `${form.city}, ${form.country}`,
      businessHours: form.operatingHours,
      socials: form.socials
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#F27D26]/10 border border-[#F27D26]/20 flex items-center justify-center text-[#F27D26]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Business Profile & Organization Details</h2>
            <p className="text-xs text-zinc-400">Manage legal company data, corporate address, operating hours, and official contacts.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legal & Corporate Entity */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Shield className="w-4 h-4 text-[#F27D26]" />
            Legal & Corporate Entity
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Legal Company / Business Name</label>
              <input
                type="text"
                value={form.legalName}
                onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                placeholder="e.g. BRANIFY Global Technologies LLC"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Registration / License #</label>
                <input
                  type="text"
                  value={form.registrationNumber}
                  onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. CR-981244"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Tax / VAT ID</label>
                <input
                  type="text"
                  value={form.taxId}
                  onChange={(e) => setForm({ ...form, taxId: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. US-EIN-98-3419201"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Primary Base Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (AED)</option>
                  <option value="PKR">PKR (Rs)</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={form.operatingHours}
                  onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. Mon-Fri: 9AM - 6PM EST"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Physical / Corporate Headquarters */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <MapPin className="w-4 h-4 text-[#5A8DFF]" />
            Corporate Headquarters Address
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Street Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
                placeholder="e.g. 100 Innovation Way, Suite 400"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
                  placeholder="San Francisco"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">State / Province</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
                  placeholder="CA"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Postal / Zip</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
                  placeholder="94105"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
                placeholder="United States"
              />
            </div>
          </div>
        </div>

        {/* Communication Channels */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Mail className="w-4 h-4 text-emerald-400" />
            Official Contact Inboxes & Hotlines
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Support Email</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="admin@branify.store"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Sales & Inquiries</label>
                <input
                  type="email"
                  value={form.salesEmail}
                  onChange={(e) => setForm({ ...form, salesEmail: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="admin@branify.store"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Direct Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+1 (555) 019-2834"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">WhatsApp Business Direct</label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+923171661603"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Presence */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Globe className="w-4 h-4 text-purple-400" />
            Social Profiles & Media Channels
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">X / Twitter</label>
                <input
                  type="text"
                  value={form.socials.twitter}
                  onChange={(e) => setForm({ ...form, socials: { ...form.socials, twitter: e.target.value } })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://x.com/branify"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={form.socials.linkedin}
                  onChange={(e) => setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://linkedin.com/company/branify"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">GitHub</label>
                <input
                  type="text"
                  value={form.socials.github}
                  onChange={(e) => setForm({ ...form, socials: { ...form.socials, github: e.target.value } })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://github.com/branify"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Instagram</label>
                <input
                  type="text"
                  value={form.socials.instagram}
                  onChange={(e) => setForm({ ...form, socials: { ...form.socials, instagram: e.target.value } })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://instagram.com/branify"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
