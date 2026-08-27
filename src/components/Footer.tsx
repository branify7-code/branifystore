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
  Palette,
  MessageCircle,
  Building2
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
    <footer className="bg-[#05080C] text-zinc-300 border-t border-[#C9A45C]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A45C]/60 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* PWA App Install Banner Card */}
        <div className="bg-[#090D14]/90 border border-[#C9A45C]/25 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#E2C27B] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#E2C27B]" />
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
            className="shrink-0 px-7 py-3.5 btn-gold-primary text-[#05080C] font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#05080C]" />
            <span className="text-[#05080C] font-black">Install App</span>
          </button>
        </div>

        {/* Footer Navigation Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Col 1: Brand Info, Head Office & Bangladesh Branch */}
          <div className="col-span-2 space-y-4">
            <button onClick={() => navigate('/')} className="text-left focus:outline-none cursor-pointer">
              <BranifyLogo size="lg" />
            </button>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              International digital agency & technology partner helping ambitious startups and enterprise brands look better, work smarter, and scale faster.
            </p>

            <div className="space-y-3.5 text-xs text-zinc-300 pt-1">
              {/* Head Office */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-[#C9A45C]/20 space-y-1">
                <div className="flex items-center gap-1.5 text-[#E2C27B] font-extrabold uppercase text-[10px] tracking-wider">
                  <Building2 className="w-3 h-3" />
                  <span>Head Office (USA)</span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300 text-[11px] leading-snug pl-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span>111, Elm AVE, Glen Cove, New York</span>
                </div>
                <div className="flex items-center gap-2 pl-0.5 pt-0.5">
                  <Phone className="w-3 h-3 text-[#C9A45C] shrink-0" />
                  <a href="tel:+15819072960" className="text-zinc-300 hover:text-[#E2C27B] text-[11px] font-semibold transition-colors">
                    +1 (581) 907-2960
                  </a>
                </div>
              </div>

              {/* Bangladesh Branch */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#C9A45C]/30 transition-colors space-y-1">
                <div className="flex items-center gap-1.5 text-[#E2C27B] font-extrabold uppercase text-[10px] tracking-wider">
                  <Building2 className="w-3 h-3" />
                  <span>Bangladesh Branch</span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300 text-[11px] leading-snug pl-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span>House 18 Road -7, Gulshan 2. Dhaka, Bangladesh.</span>
                </div>
              </div>

              {/* WhatsApp & Email quick links */}
              <div className="space-y-2 pl-0.5 pt-1">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a
                    href="https://wa.me/923321029333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-emerald-400 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp: +92 332 1029333</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E2C27B] shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="text-zinc-300 hover:text-[#E2C27B] text-xs transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Primary Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/services/website-development')} className="hover:text-[#E2C27B] transition-colors">Website Development</button></li>
              <li><button onClick={() => navigate('/services/wordpress-development')} className="hover:text-[#E2C27B] transition-colors">WordPress Dev</button></li>
              <li><button onClick={() => navigate('/services/landing-pages')} className="hover:text-[#E2C27B] transition-colors">Landing Pages</button></li>
              <li><button onClick={() => navigate('/services/ui-ux-design')} className="hover:text-[#E2C27B] transition-colors">UI/UX Design</button></li>
              <li><button onClick={() => navigate('/services/logo-design')} className="hover:text-[#E2C27B] transition-colors">Logo Design</button></li>
              <li><button onClick={() => navigate('/services/brand-identity')} className="hover:text-[#E2C27B] transition-colors">Brand Identity</button></li>
              <li><button onClick={() => navigate('/services/seo')} className="hover:text-[#E2C27B] transition-colors">SEO Ranking</button></li>
              <li><button onClick={() => navigate('/services/ai-solutions')} className="hover:text-[#E2C27B] transition-colors">AI Solutions</button></li>
            </ul>
          </div>

          {/* Col 3: Free Resources & Templates */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Free Resources</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/free-templates')} className="hover:text-[#E2C27B] transition-colors">Free Templates</button></li>
              <li><button onClick={() => navigate('/free-templates/website')} className="hover:text-[#E2C27B] transition-colors">Website Starters</button></li>
              <li><button onClick={() => navigate('/free-templates/business')} className="hover:text-[#E2C27B] transition-colors">Business Docs</button></li>
              <li><button onClick={() => navigate('/free-templates/presentation')} className="hover:text-[#E2C27B] transition-colors">Pitch Decks</button></li>
              <li><button onClick={() => navigate('/pricing')} className="hover:text-[#FFF6E5] transition-colors text-[#E2C27B] font-bold flex items-center gap-1">Pricing Guide <ArrowUpRight className="w-3 h-3" /></button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-[#E2C27B] transition-colors">Custom Quote</button></li>
            </ul>
          </div>

          {/* Col 4: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">100+ Free Tools</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/ai-tools')} className="hover:text-[#FFF6E5] transition-colors text-[#E2C27B] font-bold flex items-center gap-1">AI Tools Directory <Sparkles className="w-3 h-3 text-[#E2C27B]" /></button></li>
              <li><button onClick={() => navigate('/tools?category=PDF+Tools')} className="hover:text-[#E2C27B] transition-colors">PDF Tools</button></li>
              <li><button onClick={() => navigate('/tools?category=Image+Tools')} className="hover:text-[#E2C27B] transition-colors">Image Converter</button></li>
              <li><button onClick={() => navigate('/tools?category=Text+Tools')} className="hover:text-[#E2C27B] transition-colors">Text & Word Counter</button></li>
              <li><button onClick={() => navigate('/tools?category=Developer+Tools')} className="hover:text-[#E2C27B] transition-colors">JSON & Developer</button></li>
              <li><button onClick={() => navigate('/tools?category=SEO+Tools')} className="hover:text-[#E2C27B] transition-colors">SEO Meta Builder</button></li>
              <li><button onClick={() => navigate('/tools?category=Business+Tools')} className="hover:text-[#E2C27B] transition-colors">Invoice Generator</button></li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => navigate('/about')} className="hover:text-[#E2C27B] transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('/portfolio')} className="hover:text-[#E2C27B] transition-colors">Case Studies</button></li>
              <li><button onClick={() => navigate('/blog')} className="hover:text-[#E2C27B] transition-colors">Insights Blog</button></li>
              <li><button onClick={() => navigate('/pricing')} className="hover:text-[#E2C27B] transition-colors">Transparent Pricing</button></li>
              <li>
                <button
                  onClick={() => setIsBrandKitOpen(true)}
                  className="hover:text-white text-[#E2C27B] font-extrabold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Palette className="w-3 h-3" />
                  <span>Logo & Brand Kit</span>
                </button>
              </li>
              <li><button onClick={() => navigate('/privacy')} className="hover:text-[#E2C27B] transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-[#E2C27B] transition-colors">Terms of Service</button></li>
              <li><button onClick={() => navigate('/refund')} className="hover:text-[#E2C27B] transition-colors">Refund Policy</button></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup & Social Links Bar */}
        <div className="pt-8 border-t border-[#C9A45C]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter work email for strategy updates..."
              className="px-4 py-2.5 bg-white/[0.04] border border-[#C9A45C]/25 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C9A45C] flex-1"
            />
            <button
              type="submit"
              className="px-6 py-2.5 btn-gold-primary text-[#05080C] text-xs font-black uppercase tracking-wider rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span className="text-[#05080C] font-black">Subscribe</span>
              <Send className="w-3.5 h-3.5 text-[#05080C]" />
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-[#C9A45C]/20 text-zinc-400 hover:text-[#E2C27B] rounded-full border border-white/[0.08] hover:border-[#C9A45C]/40 transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-[#C9A45C]/20 text-zinc-400 hover:text-[#E2C27B] rounded-full border border-white/[0.08] hover:border-[#C9A45C]/40 transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-[#C9A45C]/20 text-zinc-400 hover:text-[#E2C27B] rounded-full border border-white/[0.08] hover:border-[#C9A45C]/40 transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={settings.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-[#C9A45C]/20 text-zinc-400 hover:text-[#E2C27B] rounded-full border border-white/[0.08] hover:border-[#C9A45C]/40 transition-colors" title="Twitter/X">
              <Twitter className="w-4 h-4" />
            </a>
            <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-[#C9A45C]/20 text-zinc-400 hover:text-[#E2C27B] rounded-full border border-white/[0.08] hover:border-[#C9A45C]/40 transition-colors" title="GitHub">
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
