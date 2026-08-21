import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Save, Phone, Clock, ExternalLink, RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const AdminWhatsAppConfigTab: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [form, setForm] = useState({
    phoneNumber: settings.whatsappConfig?.phoneNumber || '+923171661603',
    defaultMessage: settings.whatsappConfig?.defaultMessage || "Hello BRANIFY! I'd like to discuss a project.",
    serviceInquiryTemplate: settings.whatsappConfig?.serviceInquiryTemplate || 'Hi BRANIFY! I am interested in your {service_name} service. Can we discuss scope & pricing?',
    productSupportTemplate: settings.whatsappConfig?.productSupportTemplate || 'Hello BRANIFY Support! I have a question regarding the product "{product_title}".',
    customQuoteTemplate: settings.whatsappConfig?.customQuoteTemplate || 'Hi BRANIFY! I need a custom quote for an enterprise engineering project with budget {budget}.',
    partnerTemplate: settings.whatsappConfig?.partnerTemplate || 'Hello! I am reaching out to explore an agency partnership / collaboration with BRANIFY.',
    floatingButtonEnabled: settings.whatsappConfig?.floatingButtonEnabled ?? true,
    showAgentStatus: settings.whatsappConfig?.showAgentStatus ?? true,
    operatingHours: settings.whatsappConfig?.operatingHours || 'Available 24/7 for Global Inquiries',
    responseTimeNote: settings.whatsappConfig?.responseTimeNote || 'Typically responds in < 15 minutes'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [testAction, setTestAction] = useState<'default' | 'service' | 'product' | 'quote' | 'partner'>('default');

  const testLink = getWhatsAppLink(
    { ...settings, whatsappConfig: { ...settings.whatsappConfig, ...form } },
    testAction,
    {
      serviceName: 'Enterprise AI & Web App',
      productTitle: 'AI Prompt Mastery Bundle',
      budget: '$5,000 - $10,000'
    }
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      contactWhatsApp: form.phoneNumber,
      whatsappConfig: {
        phoneNumber: form.phoneNumber,
        defaultMessage: form.defaultMessage,
        serviceInquiryTemplate: form.serviceInquiryTemplate,
        productSupportTemplate: form.productSupportTemplate,
        customQuoteTemplate: form.customQuoteTemplate,
        partnerTemplate: form.partnerTemplate,
        floatingButtonEnabled: form.floatingButtonEnabled,
        showAgentStatus: form.showAgentStatus,
        operatingHours: form.operatingHours,
        responseTimeNote: form.responseTimeNote
      }
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">WhatsApp Direct Lead & Support Engine</h2>
            <p className="text-xs text-zinc-400">Manage live phone numbers, dynamic contextual message templates, and floating CTA widgets.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save WhatsApp Config'}
        </button>
      </div>

      {/* Live Test Link Simulator */}
      <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            Live WhatsApp Deep-Link Simulator
          </div>
          <div className="flex items-center gap-2">
            <select
              value={testAction}
              onChange={(e) => setTestAction(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 text-white text-xs rounded-lg px-2.5 py-1"
            >
              <option value="default">Default General Inquiry</option>
              <option value="service">Service Page Inquiry</option>
              <option value="product">Digital Product Support</option>
              <option value="quote">Custom Enterprise Quote</option>
              <option value="partner">Agency Partnership</option>
            </select>
            <a
              href={testLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-lg hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Test Live URL
            </a>
          </div>
        </div>

        <div className="p-3 bg-zinc-900/80 border border-white/5 rounded-xl font-mono text-xs text-zinc-300 break-all select-all">
          {testLink}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Connection & Floating Widget */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Phone className="w-4 h-4 text-emerald-400" />
            Core Connection & Floating Widget Controls
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                WhatsApp Official Phone Number (International E.164 Format)
              </label>
              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-sm"
                placeholder="+923171661603"
              />
              <p className="text-[10px] text-zinc-500 mt-1">Include country code with no spaces or dashes (e.g. +923171661603).</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-xl cursor-pointer hover:bg-zinc-800/60 transition-all">
                <input
                  type="checkbox"
                  checked={form.floatingButtonEnabled}
                  onChange={(e) => setForm({ ...form, floatingButtonEnabled: e.target.checked })}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                />
                <div>
                  <div className="text-white font-bold">Enable Floating Widget</div>
                  <div className="text-[10px] text-zinc-400">Show bottom-right WhatsApp button</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-xl cursor-pointer hover:bg-zinc-800/60 transition-all">
                <input
                  type="checkbox"
                  checked={form.showAgentStatus}
                  onChange={(e) => setForm({ ...form, showAgentStatus: e.target.checked })}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                />
                <div>
                  <div className="text-white font-bold">Online Status Badge</div>
                  <div className="text-[10px] text-zinc-400">Display green pulsing active dot</div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Availability / Operating Schedule</label>
                <input
                  type="text"
                  value={form.operatingHours}
                  onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Available 24/7 for Global Inquiries"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Response Time SLA Note</label>
                <input
                  type="text"
                  value={form.responseTimeNote}
                  onChange={(e) => setForm({ ...form, responseTimeNote: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Typically responds in < 15 mins"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Message Templates */}
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/5 pb-3">
            <MessageSquare className="w-4 h-4 text-[#5A8DFF]" />
            Contextual Message Templates
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Default / Floating Button Message</label>
              <input
                type="text"
                value={form.defaultMessage}
                onChange={(e) => setForm({ ...form, defaultMessage: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Service Inquiry Template <span className="text-zinc-500 font-mono font-normal">{'{service_name}'}</span>
              </label>
              <input
                type="text"
                value={form.serviceInquiryTemplate}
                onChange={(e) => setForm({ ...form, serviceInquiryTemplate: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Digital Product Support Template <span className="text-zinc-500 font-mono font-normal">{'{product_title}'}</span>
              </label>
              <input
                type="text"
                value={form.productSupportTemplate}
                onChange={(e) => setForm({ ...form, productSupportTemplate: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Custom Enterprise Quote Template <span className="text-zinc-500 font-mono font-normal">{'{budget}'}</span>
              </label>
              <input
                type="text"
                value={form.customQuoteTemplate}
                onChange={(e) => setForm({ ...form, customQuoteTemplate: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#5A8DFF]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
