import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Github,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BranifyLogo } from './BranifyLogo';
import { BrandKitModal } from './BrandKitModal';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings, addToast, pwaDeferredPrompt } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Thank you for subscribing to BRANIFY Insider!', 'success');
    setEmailInput('');
  };

  const handleInstallPWA = () => {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
      pwaDeferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          addToast('BRANIFY installed successfully to your device!', 'success');
        }
      });
    } else {
      addToast('BRANIFY Web App is ready. Bookmark or tap "Add to Home Screen" in your browser menu.', 'info');
    }
  };

  return (
    <footer className="bg-[#05060B] text-zinc-300 border-t border-white/[0.08] pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* PWA App Install Banner Card */}
        <div className="bg-[#080B14]/90 border border-white/[0.1] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] text-zinc-300 text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Progressive Web App
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Get BRANIFY on Your Mobile & Desktop Device
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              Install the official BRANIFY app for instant offline access to 100+ free online tools, service quotes, and digital templates.
            </p>
          </div>

          <button
            onClick={handleInstallPWA}
            className="shrink-0 px-7 py-3.5 btn-gradient-primary text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Install App</span>
          </button>
        </div>

        {/* Footer Navigation Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Col 1: Brand Info & Contact */}
          <div className="col-span-2 space-y-4">
            <button onClick={() => navigate('/')} className="text-left focus:outline-none">
              <BranifyLogo size="lg" />
            </button>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              International digital agency & technology partner helping ambitious startups and enterprise brands look better, work smarter, and scale faster.
            </p>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <a href={`https://wa.me/${settings.contactWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {settings.contactPhone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span className="text-zinc-400">{settings.location}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Primary Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/services/website-development')} className="hover:text-blue-400 transition-colors">Website Development</button></li>
              <li><button onClick={() => navigate('/services/wordpress-development')} className="hover:text-blue-400 transition-colors">WordPress Dev</button></li>
              <li><button onClick={() => navigate('/services/landing-pages')} className="hover:text-blue-400 transition-colors">Landing Pages</button></li>
              <li><button onClick={() => navigate('/services/ui-ux-design')} className="hover:text-blue-400 transition-colors">UI/UX Design</button></li>
              <li><button onClick={() => navigate('/services/logo-design')} className="hover:text-blue-400 transition-colors">Logo Design</button></li>
              <li><button onClick={() => navigate('/services/brand-identity')} className="hover:text-blue-400 transition-colors">Brand Identity</button></li>
              <li><button onClick={() => navigate('/services/seo')} className="hover:text-blue-400 transition-colors">SEO Ranking</button></li>
              <li><button onClick={() => navigate('/services/ai-solutions')} className="hover:text-blue-400 transition-colors">AI Solutions</button></li>
            </ul>
          </div>

          {/* Col 3: Digital Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Digital Store</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/digital-products?category=AI+Prompts')} className="hover:text-violet-400 transition-colors">AI Prompts</button></li>
              <li><button onClick={() => navigate('/digital-products?category=Canva+Templates')} className="hover:text-violet-400 transition-colors">Canva Templates</button></li>
              <li><button onClick={() => navigate('/digital-products?category=Notion+Templates')} className="hover:text-violet-400 transition-colors">Notion Workspaces</button></li>
              <li><button onClick={() => navigate('/subscriptions')} className="hover:text-fuchsia-400 transition-colors text-fuchsia-400 font-bold flex items-center gap-1">Subscriptions <ArrowUpRight className="w-3 h-3" /></button></li>
              <li><button onClick={() => navigate('/digital-products?category=Presentation+Templates')} className="hover:text-violet-400 transition-colors">Pitch Decks</button></li>
              <li><button onClick={() => navigate('/digital-products?category=Website+Templates')} className="hover:text-violet-400 transition-colors">SaaS Templates</button></li>
            </ul>
          </div>

          {/* Col 4: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">100+ Free Tools</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/ai-tools')} className="hover:text-blue-400 transition-colors text-blue-400 font-bold flex items-center gap-1">AI Tools Directory <Sparkles className="w-3 h-3 text-blue-400" /></button></li>
              <li><button onClick={() => navigate('/tools?category=PDF+Tools')} className="hover:text-blue-400 transition-colors">PDF Tools</button></li>
              <li><button onClick={() => navigate('/tools?category=Image+Tools')} className="hover:text-blue-400 transition-colors">Image Converter</button></li>
              <li><button onClick={() => navigate('/tools?category=Text+Tools')} className="hover:text-blue-400 transition-colors">Text & Word Counter</button></li>
              <li><button onClick={() => navigate('/tools?category=Developer+Tools')} className="hover:text-blue-400 transition-colors">JSON & Developer</button></li>
              <li><button onClick={() => navigate('/tools?category=SEO+Tools')} className="hover:text-blue-400 transition-colors">SEO Meta Builder</button></li>
              <li><button onClick={() => navigate('/tools?category=Business+Tools')} className="hover:text-blue-400 transition-colors">Invoice Generator</button></li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/about')} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('/portfolio')} className="hover:text-blue-400 transition-colors">Case Studies</button></li>
              <li><button onClick={() => navigate('/blog')} className="hover:text-blue-400 transition-colors">Insights Blog</button></li>
              <li><button onClick={() => navigate('/pricing')} className="hover:text-blue-400 transition-colors">Transparent Pricing</button></li>
              <li>
                <button
                  onClick={() => setIsBrandKitOpen(true)}
                  className="hover:text-violet-400 text-violet-400 font-extrabold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Palette className="w-3 h-3" />
                  <span>Logo & Brand Kit</span>
                </button>
              </li>
              <li><button onClick={() => navigate('/privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-blue-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => navigate('/refund')} className="hover:text-blue-400 transition-colors">Refund Policy</button></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup & Social Links Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter work email for strategy updates..."
              className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 flex-1"
            />
            <button
              type="submit"
              className="px-5 py-2.5 btn-gradient-primary text-white text-xs font-extrabold uppercase tracking-wider rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href={settings.socials.instagram} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white rounded-full border border-white/[0.08] transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={settings.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white rounded-full border border-white/[0.08] transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={settings.socials.facebook} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white rounded-full border border-white/[0.08] transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={settings.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white rounded-full border border-white/[0.08] transition-colors" title="Twitter/X">
              <Twitter className="w-4 h-4" />
            </a>
            <a href={settings.socials.github} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white rounded-full border border-white/[0.08] transition-colors" title="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-zinc-500 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} BRANIFY (branify.store). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:underline">Terms</button>
            <button onClick={() => navigate('/disclaimer')} className="hover:underline">Disclaimer</button>
            <button onClick={() => navigate('/admin')} className="text-zinc-600 hover:text-zinc-400 transition-colors">Admin</button>
          </div>
        </div>
      </div>

      {/* Brand Assets & Logo Download Modal */}
      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />
    </footer>
  );
};
