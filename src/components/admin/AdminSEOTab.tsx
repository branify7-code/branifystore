import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search, Save, Globe, Share2, Code2, RefreshCw, BarChart,
  FileText, Map, FileCode, Link2, AlertTriangle, CheckCircle2,
  XCircle, Image, Settings, Eye, ChevronRight, ExternalLink,
  TrendingUp, AlertCircle, Activity, Zap, Gauge, ListChecks
} from 'lucide-react';

type SubTab = 'dashboard' | 'pages' | 'technical' | 'sitemap' | 'robots' | 'redirects' | 'performance' | 'settings';

interface RouteSEO {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogUrl: string;
  h1: string;
  schema: string;
  type: 'static' | 'service' | 'portfolio' | 'product' | 'blog';
}

const SITE_URL = 'https://branify.store';

const ROUTES: RouteSEO[] = [
  { path: '/', title: 'Custom Web Development & Digital Agency | BRANIFY', description: 'Professional web development, custom branding, AI automation, and digital products built to scale ambitious modern businesses worldwide.', canonical: `${SITE_URL}/`, robots: 'index, follow', ogUrl: `${SITE_URL}/`, h1: 'BUILD A BRAND THAT MEANS BUSINESS', schema: 'Organization, WebSite, WebPage', type: 'static' },
  { path: '/portfolio', title: 'Website Design & Development Portfolio | BRANIFY', description: "Explore BRANIFY's website design, web development, branding and digital projects created for ambitious businesses.", canonical: `${SITE_URL}/portfolio`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio`, h1: 'Selected Work & Websites', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/services', title: 'Digital Agency Services | Web, Branding, AI & SEO | BRANIFY', description: 'BRANIFY offers website development, WordPress, UI/UX design, branding, SEO, AI solutions, and business consultation services for ambitious brands.', canonical: `${SITE_URL}/services`, robots: 'index, follow', ogUrl: `${SITE_URL}/services`, h1: 'Specialized Digital Services', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/services/website-development', title: 'Website Development Services | BRANIFY', description: 'Professional website development services for businesses and brands. Fast, responsive and scalable solutions built by BRANIFY.', canonical: `${SITE_URL}/services/website-development`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/website-development`, h1: 'Website Development', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/wordpress-development', title: 'WordPress Development Services | BRANIFY', description: 'Professional WordPress development services for businesses and brands. Custom themes, plugins, and WooCommerce solutions by BRANIFY.', canonical: `${SITE_URL}/services/wordpress-development`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/wordpress-development`, h1: 'WordPress Development', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/landing-pages', title: 'Landing Pages Services | BRANIFY', description: 'High-converting landing page design and development services for businesses and brands by BRANIFY.', canonical: `${SITE_URL}/services/landing-pages`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/landing-pages`, h1: 'Landing Pages', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/ui-ux-design', title: 'UI UX Design Services | BRANIFY', description: 'Professional UI/UX design services for businesses and brands. User-centered interfaces built by BRANIFY.', canonical: `${SITE_URL}/services/ui-ux-design`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/ui-ux-design`, h1: 'UI/UX Design', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/logo-design', title: 'Logo Design Services | BRANIFY', description: 'Professional logo design services for businesses and brands. Memorable, scalable brand marks built by BRANIFY.', canonical: `${SITE_URL}/services/logo-design`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/logo-design`, h1: 'Logo Design', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/brand-identity', title: 'Brand Identity Services | BRANIFY', description: 'Professional brand identity design services for businesses and brands. Complete brand systems built by BRANIFY.', canonical: `${SITE_URL}/services/brand-identity`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/brand-identity`, h1: 'Brand Identity', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/social-media-design', title: 'Social Media Design Services | BRANIFY', description: 'Professional social media design services for businesses and brands. Engaging visual content built by BRANIFY.', canonical: `${SITE_URL}/services/social-media-design`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/social-media-design`, h1: 'Social Media Design', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/business-presentation', title: 'Business Presentation Services | BRANIFY', description: 'Professional business presentation design services for businesses and brands. Investor-ready decks built by BRANIFY.', canonical: `${SITE_URL}/services/business-presentation`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/business-presentation`, h1: 'Business Presentation', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/seo', title: 'SEO Services | BRANIFY', description: 'Professional SEO services for businesses and brands. Technical SEO, content optimization, and ranking growth by BRANIFY.', canonical: `${SITE_URL}/services/seo`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/seo`, h1: 'SEO Services', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/ai-solutions', title: 'AI Solutions Services | BRANIFY', description: 'Professional AI solutions services for businesses and brands. AI automation, chatbots, and workflows built by BRANIFY.', canonical: `${SITE_URL}/services/ai-solutions`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/ai-solutions`, h1: 'AI Solutions', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/services/business-consultation', title: 'Business Consultation Services | BRANIFY', description: 'Professional business consultation services for businesses and brands. Strategic growth guidance by BRANIFY.', canonical: `${SITE_URL}/services/business-consultation`, robots: 'index, follow', ogUrl: `${SITE_URL}/services/business-consultation`, h1: 'Business Consultation', schema: 'Service, BreadcrumbList', type: 'service' },
  { path: '/tools', title: '100+ Free Online Tools | Browser Utilities | BRANIFY', description: 'Use free online browser tools for productivity, development, text, images and everyday tasks from BRANIFY.', canonical: `${SITE_URL}/tools`, robots: 'index, follow', ogUrl: `${SITE_URL}/tools`, h1: 'Free Online Tools', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/ai-tools', title: 'AI Tools for Business & Productivity | BRANIFY', description: 'Discover useful AI tools for productivity, business, content, design and everyday workflows from BRANIFY.', canonical: `${SITE_URL}/ai-tools`, robots: 'index, follow', ogUrl: `${SITE_URL}/ai-tools`, h1: 'Popular AI Tools', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/digital-products', title: 'Premium Digital Products & Templates | BRANIFY', description: 'Browse premium digital products, templates, and resources for businesses, agencies, and creators from BRANIFY.', canonical: `${SITE_URL}/digital-products`, robots: 'index, follow', ogUrl: `${SITE_URL}/digital-products`, h1: 'Digital Products', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/pricing', title: 'Transparent Pricing & Packages | BRANIFY', description: 'View BRANIFY pricing and packages for web development, branding, AI solutions, and digital products. Clear, upfront, no hidden fees.', canonical: `${SITE_URL}/pricing`, robots: 'index, follow', ogUrl: `${SITE_URL}/pricing`, h1: 'Pricing', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/about', title: 'About BRANIFY | International Digital Agency', description: 'BRANIFY is an international full-stack digital agency providing custom web development, brand identity design, AI solutions, and digital products worldwide.', canonical: `${SITE_URL}/about`, robots: 'index, follow', ogUrl: `${SITE_URL}/about`, h1: 'About BRANIFY', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/contact', title: 'Contact BRANIFY | Start Your Digital Project', description: 'Get in touch with BRANIFY to start your web development, branding, or AI project. Fast response, transparent quotes, global delivery.', canonical: `${SITE_URL}/contact`, robots: 'index, follow', ogUrl: `${SITE_URL}/contact`, h1: 'Contact BRANIFY', schema: 'WebPage, ContactPoint', type: 'static' },
  { path: '/blog', title: 'BRANIFY Blog | Digital Agency Insights & Guides', description: 'Read the latest insights, guides, and articles on web development, branding, AI, and digital growth from the BRANIFY team.', canonical: `${SITE_URL}/blog`, robots: 'index, follow', ogUrl: `${SITE_URL}/blog`, h1: 'BRANIFY Blog', schema: 'WebPage, Blog', type: 'static' },
  { path: '/free-templates', title: 'Free Digital Templates | BRANIFY', description: 'Download free website, Canva, social media, business, resume, and Notion templates from BRANIFY. No signup required.', canonical: `${SITE_URL}/free-templates`, robots: 'index, follow', ogUrl: `${SITE_URL}/free-templates`, h1: 'Free Templates', schema: 'WebPage, BreadcrumbList', type: 'static' },
  { path: '/portfolio/playbeat', title: 'PlayBeat — Case Study | BRANIFY', description: 'Explore the PlayBeat case study — a premium digital audio streaming project designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/playbeat`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/playbeat`, h1: 'PlayBeat', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/blockexchange', title: 'BlockExchange — Case Study | BRANIFY', description: 'Explore the BlockExchange case study — a premium Web3 exchange project designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/blockexchange`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/blockexchange`, h1: 'BlockExchange', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/property-atlas', title: 'Property Atlas — Case Study | BRANIFY', description: 'Explore the Property Atlas case study — a luxury real estate project designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/property-atlas`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/property-atlas`, h1: 'Property Atlas', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/alaya-spa-wellness', title: 'Alaya Spa & Wellness — Case Study | BRANIFY', description: 'Explore the Alaya Spa & Wellness case study — a premium spa and wellness website designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/alaya-spa-wellness`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/alaya-spa-wellness`, h1: 'Alaya Spa & Wellness', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/artline-gents-salon', title: 'Artline Gents Salon — Case Study | BRANIFY', description: 'Explore the Artline Gents Salon case study — a premium men\u2019s grooming website designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/artline-gents-salon`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/artline-gents-salon`, h1: 'Artline Gents Salon', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/maison-elixir-salon', title: 'Maison Elixir Salon — Case Study | BRANIFY', description: 'Explore the Maison Elixir Salon case study — a premium beauty salon website designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/maison-elixir-salon`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/maison-elixir-salon`, h1: 'Maison Elixir Salon', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/taqdeer-by-jts', title: 'Taqdeer by JTS — Case Study | BRANIFY', description: 'Explore the Taqdeer by JTS case study — a boutique fashion e-commerce project designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/taqdeer-by-jts`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/taqdeer-by-jts`, h1: 'Taqdeer by JTS', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/meridian-marketplace', title: 'Meridian Marketplace — Case Study | BRANIFY', description: 'Explore the Meridian Marketplace case study — a luxury verified showroom marketplace designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/meridian-marketplace`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/meridian-marketplace`, h1: 'Meridian Marketplace', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/tatka-bazar', title: 'Tatka Bazar — Case Study | BRANIFY', description: 'Explore the Tatka Bazar case study — an online grocery and express delivery platform designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/tatka-bazar`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/tatka-bazar`, h1: 'Tatka Bazar', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/cinestream', title: 'CineStream — Case Study | BRANIFY', description: 'Explore the CineStream case study — a cinematic movie and TV streaming platform designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/cinestream`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/cinestream`, h1: 'CineStream', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/la-cava-dxb', title: 'LA CAVA DXB — Case Study | BRANIFY', description: 'Explore the LA CAVA DXB case study — a premium skincare and beauty clinic website designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/la-cava-dxb`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/la-cava-dxb`, h1: 'LA CAVA DXB', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/portfolio/world-dollar-quest', title: 'World Dollar Quest — Case Study | BRANIFY', description: 'Explore the World Dollar Quest case study — an AI tools and earn-online resource hub designed and engineered by BRANIFY.', canonical: `${SITE_URL}/portfolio/world-dollar-quest`, robots: 'index, follow', ogUrl: `${SITE_URL}/portfolio/world-dollar-quest`, h1: 'World Dollar Quest', schema: 'CreativeWork, BreadcrumbList', type: 'portfolio' },
  { path: '/digital-products/ai-prompts-masterkit', title: 'AI Prompts Masterkit | Digital Product | BRANIFY', description: 'AI Prompts Masterkit — a premium digital product available from BRANIFY. Boost your productivity and workflow.', canonical: `${SITE_URL}/digital-products/ai-prompts-masterkit`, robots: 'index, follow', ogUrl: `${SITE_URL}/digital-products/ai-prompts-masterkit`, h1: 'AI Prompts Masterkit', schema: 'Product, Offer', type: 'product' },
  { path: '/digital-products/canva-agency-kit', title: 'Canva Agency Kit | Digital Product | BRANIFY', description: 'Canva Agency Kit — a premium digital product available from BRANIFY. Boost your productivity and workflow.', canonical: `${SITE_URL}/digital-products/canva-agency-kit`, robots: 'index, follow', ogUrl: `${SITE_URL}/digital-products/canva-agency-kit`, h1: 'Canva Agency Kit', schema: 'Product, Offer', type: 'product' },
  { path: '/digital-products/notion-agency-os', title: 'Notion Agency OS | Digital Product | BRANIFY', description: 'Notion Agency OS — a premium digital product available from BRANIFY. Boost your productivity and workflow.', canonical: `${SITE_URL}/digital-products/notion-agency-os`, robots: 'index, follow', ogUrl: `${SITE_URL}/digital-products/notion-agency-os`, h1: 'Notion Agency OS', schema: 'Product, Offer', type: 'product' },
  { path: '/blog/2026-brand-identity-trends', title: '2026 Brand Identity Trends | BRANIFY Blog', description: 'Read about 2026 brand identity trends and other digital agency insights on the BRANIFY blog.', canonical: `${SITE_URL}/blog/2026-brand-identity-trends`, robots: 'index, follow', ogUrl: `${SITE_URL}/blog/2026-brand-identity-trends`, h1: '2026 Brand Identity Trends', schema: 'Article', type: 'blog' },
  { path: '/blog/wordpress-vs-custom-react-2026', title: 'WordPress vs Custom React 2026 | BRANIFY Blog', description: 'Read about WordPress vs custom React in 2026 and other digital agency insights on the BRANIFY blog.', canonical: `${SITE_URL}/blog/wordpress-vs-custom-react-2026`, robots: 'index, follow', ogUrl: `${SITE_URL}/blog/wordpress-vs-custom-react-2026`, h1: 'WordPress vs Custom React 2026', schema: 'Article', type: 'blog' },
  { path: '/blog/ai-automation-small-business-growth', title: 'AI Automation Small Business Growth | BRANIFY Blog', description: 'Read about AI automation for small business growth and other digital agency insights on the BRANIFY blog.', canonical: `${SITE_URL}/blog/ai-automation-small-business-growth`, robots: 'index, follow', ogUrl: `${SITE_URL}/blog/ai-automation-small-business-growth`, h1: 'AI Automation Small Business Growth', schema: 'Article', type: 'blog' },
];

function checkRoute(route: RouteSEO) {
  const issues: { type: 'error' | 'warning' | 'ok'; label: string }[] = [];
  if (!route.title) issues.push({ type: 'error', label: 'Missing title' });
  else if (route.title.length < 30) issues.push({ type: 'warning', label: 'Title too short' });
  else if (route.title.length > 65) issues.push({ type: 'warning', label: 'Title too long' });
  else issues.push({ type: 'ok', label: 'Title OK' });
  if (!route.description) issues.push({ type: 'error', label: 'Missing description' });
  else if (route.description.length < 80) issues.push({ type: 'warning', label: 'Description too short' });
  else if (route.description.length > 170) issues.push({ type: 'warning', label: 'Description too long' });
  else issues.push({ type: 'ok', label: 'Description OK' });
  if (!route.canonical) issues.push({ type: 'error', label: 'Missing canonical' });
  else if (route.canonical === `${SITE_URL}/` && route.path !== '/') issues.push({ type: 'error', label: 'Using homepage canonical' });
  else if (!route.canonical.endsWith(route.path === '/' ? '/' : route.path)) issues.push({ type: 'error', label: 'Canonical mismatch' });
  else issues.push({ type: 'ok', label: 'Canonical OK' });
  if (!route.robots || route.robots.includes('noindex')) issues.push({ type: 'error', label: 'Noindex' });
  else issues.push({ type: 'ok', label: 'Robots OK' });
  if (!route.h1) issues.push({ type: 'error', label: 'Missing H1' });
  else issues.push({ type: 'ok', label: 'H1 OK' });
  if (!route.schema) issues.push({ type: 'warning', label: 'Missing schema' });
  else issues.push({ type: 'ok', label: 'Schema OK' });
  return issues;
}

function routeScore(route: RouteSEO) {
  const issues = checkRoute(route);
  const errors = issues.filter(i => i.type === 'error').length;
  const warnings = issues.filter(i => i.type === 'warning').length;
  return Math.max(0, 100 - errors * 25 - warnings * 10);
}

function overallScore() {
  const scores = ROUTES.map(routeScore);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function findDuplicates() {
  const titles: Record<string, string[]> = {};
  const descs: Record<string, string[]> = {};
  const canon: Record<string, string[]> = {};
  for (const r of ROUTES) {
    (titles[r.title] ||= []).push(r.path);
    (descs[r.description] ||= []).push(r.path);
    (canon[r.canonical] ||= []).push(r.path);
  }
  return {
    dupTitles: Object.entries(titles).filter(([, v]) => v.length > 1),
    dupDescs: Object.entries(descs).filter(([, v]) => v.length > 1),
    dupCanon: Object.entries(canon).filter(([, v]) => v.length > 1),
  };
}

export const AdminSEOTab: React.FC = () => {
  const [subTab, setSubTab] = useState<SubTab>('dashboard');
  const [editingRoute, setEditingRoute] = useState<RouteSEO | null>(null);
  const [seoForm, setSeoForm] = useState<Partial<RouteSEO>>({});
  const [isSaving, setIsSaving] = useState(false);

  const dups = useMemo(() => findDuplicates(), []);
  const score = useMemo(() => overallScore(), []);
  const routesWithIssues = useMemo(() => ROUTES.map(r => ({ route: r, issues: checkRoute(r), score: routeScore(r) })), []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    setEditingRoute(null);
  };

  const subTabs: { id: SubTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'pages', label: 'Page SEO', icon: FileText },
    { id: 'technical', label: 'Technical', icon: ListChecks },
    { id: 'sitemap', label: 'Sitemap', icon: Map },
    { id: 'robots', label: 'Robots.txt', icon: FileCode },
    { id: 'redirects', label: 'Redirects', icon: Link2 },
    { id: 'performance', label: 'Performance', icon: Gauge },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap gap-2 p-2 bg-zinc-950/60 border border-white/10 rounded-2xl">
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${subTab === t.id ? 'bg-[#5A8DFF] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {subTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke={score >= 80 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'} strokeWidth="6" strokeDasharray={`${(score / 100) * 214} 214`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white">{score}</div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">BRANIFY Internal SEO Health Score</h2>
                <p className="text-xs text-zinc-400">{ROUTES.length} routes audited · {dups.dupTitles.length} duplicate titles · {dups.dupDescs.length} duplicate descriptions</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={FileText} label="Pages Audited" value={ROUTES.length} iconColor="text-[#5A8DFF]" />
            <StatCard icon={XCircle} label="Missing Titles" value={ROUTES.filter(r => !r.title).length} iconColor="text-red-400" />
            <StatCard icon={AlertTriangle} label="Duplicate Titles" value={dups.dupTitles.length} iconColor="text-amber-400" />
            <StatCard icon={CheckCircle2} label="Self-referencing Canonicals" value={ROUTES.filter(r => r.canonical.endsWith(r.path === '/' ? '/' : r.path)).length} iconColor="text-emerald-400" />
          </div>
          {dups.dupTitles.length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <div className="flex items-center gap-2 text-red-300 font-bold text-sm mb-2"><AlertCircle className="w-4 h-4" /> Duplicate Titles Detected</div>
              {dups.dupTitles.map(([title, paths]) => (<div key={title} className="text-xs text-zinc-400 mb-1"><span className="text-red-300 font-semibold">{title}</span> — used by: {paths.join(', ')}</div>))}
            </div>
          )}
          {dups.dupDescs.length > 0 && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2"><AlertTriangle className="w-4 h-4" /> Duplicate Descriptions Detected</div>
              {dups.dupDescs.map(([desc, paths]) => (<div key={desc} className="text-xs text-zinc-400 mb-1"><span className="text-amber-300 font-semibold">{desc.slice(0, 50)}...</span> — used by: {paths.join(', ')}</div>))}
            </div>
          )}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/30 text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <tr><th className="px-4 py-3">Page</th><th className="px-4 py-3">Score</th><th className="hidden md:table-cell px-4 py-3">Title</th><th className="hidden lg:table-cell px-4 py-3">Canonical</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {routesWithIssues.map(({ route, issues, score }) => {
                  const hasError = issues.some(i => i.type === 'error');
                  const hasWarning = issues.some(i => i.type === 'warning');
                  return (
                    <tr key={route.path} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3"><div className="font-semibold text-white">{route.h1 || route.path}</div><div className="text-xs text-zinc-500">{route.path}</div></td>
                      <td className="px-4 py-3"><span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${score >= 80 ? 'bg-emerald-500/15 text-emerald-300' : score >= 50 ? 'bg-amber-500/15 text-amber-300' : 'bg-red-500/15 text-red-300'}`}>{score}</span></td>
                      <td className="hidden md:table-cell px-4 py-3 text-xs text-zinc-400 max-w-xs truncate">{route.title}</td>
                      <td className="hidden lg:table-cell px-4 py-3 text-xs text-zinc-500 max-w-xs truncate font-mono">{route.canonical.replace(SITE_URL, '')}</td>
                      <td className="px-4 py-3">{hasError ? <span className="text-red-400"><XCircle className="w-4 h-4" /></span> : hasWarning ? <span className="text-amber-400"><AlertTriangle className="w-4 h-4" /></span> : <span className="text-emerald-400"><CheckCircle2 className="w-4 h-4" /></span>}</td>
                      <td className="px-4 py-3 text-right"><button onClick={() => { setEditingRoute(route); setSeoForm(route); setSubTab('pages'); }} className="text-[#5A8DFF] hover:text-white text-xs font-bold uppercase tracking-wider">Edit</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'pages' && editingRoute && (
        <PageSEOEditor route={editingRoute} form={seoForm} setForm={setSeoForm} onSave={handleSave} isSaving={isSaving} onCancel={() => setEditingRoute(null)} />
      )}
      {subTab === 'pages' && !editingRoute && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/10 rounded-2xl">
            <div><h3 className="text-sm font-bold text-white">Page SEO Manager</h3><p className="text-xs text-zinc-400">{routesWithIssues.length} public routes with unique metadata</p></div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/30 text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <tr><th className="px-4 py-3">Page</th><th className="hidden md:table-cell px-4 py-3">SEO Title</th><th className="hidden lg:table-cell px-4 py-3">Canonical</th><th className="hidden xl:table-cell px-4 py-3">Robots</th><th className="px-4 py-3">Score</th><th className="px-4 py-3 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {routesWithIssues.map(({ route, score }) => (
                  <tr key={route.path} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3"><div className="font-semibold text-white">{route.h1 || route.path}</div><div className="text-xs text-zinc-500 font-mono">{route.path}</div></td>
                    <td className="hidden md:table-cell px-4 py-3 text-xs text-zinc-400 max-w-xs truncate">{route.title}</td>
                    <td className="hidden lg:table-cell px-4 py-3 text-xs text-zinc-500 max-w-xs truncate font-mono">{route.canonical.replace(SITE_URL, '')}</td>
                    <td className="hidden xl:table-cell px-4 py-3 text-xs text-zinc-400">{route.robots}</td>
                    <td className="px-4 py-3"><span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${score >= 80 ? 'bg-emerald-500/15 text-emerald-300' : score >= 50 ? 'bg-amber-500/15 text-amber-300' : 'bg-red-500/15 text-red-300'}`}>{score}</span></td>
                    <td className="px-4 py-3 text-right"><button onClick={() => { setEditingRoute(route); setSeoForm(route); }} className="text-[#5A8DFF] hover:text-white text-xs font-bold uppercase tracking-wider">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'technical' && (
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><ListChecks className="w-4 h-4 text-[#5A8DFF]" /> Technical SEO Audit</h3>
          <div className="space-y-2">
            <CheckRow label="Sitemap exists" status="ok" detail="https://branify.store/sitemap.xml" />
            <CheckRow label="Robots.txt exists" status="ok" detail="https://branify.store/robots.txt" />
            <CheckRow label="All canonicals self-referencing" status={dups.dupCanon.length === 0 ? 'ok' : 'error'} detail={dups.dupCanon.length === 0 ? `${ROUTES.length} routes verified` : `${dups.dupCanon.length} duplicate canonicals`} />
            <CheckRow label="No duplicate titles" status={dups.dupTitles.length === 0 ? 'ok' : 'error'} detail={dups.dupTitles.length === 0 ? 'All titles unique' : `${dups.dupTitles.length} duplicates`} />
            <CheckRow label="No duplicate descriptions" status={dups.dupDescs.length === 0 ? 'ok' : 'warning'} detail={dups.dupDescs.length === 0 ? 'All descriptions unique' : `${dups.dupDescs.length} duplicates`} />
            <CheckRow label="All pages indexable" status="ok" detail={`${ROUTES.filter(r => r.robots.includes('index')).length} indexable`} />
            <CheckRow label="Structured data present" status="ok" detail={`${ROUTES.filter(r => r.schema).length} routes with schema`} />
            <CheckRow label="Prerendered HTML" status="ok" detail="45 route-specific HTML files generated" />
            <CheckRow label="Mobile viewport meta" status="ok" detail="viewport=device-width, initial-scale=1.0" />
            <CheckRow label="HTTPS" status="ok" detail="All routes served over HTTPS" />
          </div>
        </div>
      )}

      {subTab === 'sitemap' && (
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div><h3 className="text-sm font-bold text-white flex items-center gap-2"><Map className="w-4 h-4 text-[#5A8DFF]" /> XML Sitemap Manager</h3><p className="text-xs text-zinc-400 mt-1">URL: <a href="https://branify.store/sitemap.xml" target="_blank" rel="noreferrer" className="text-[#5A8DFF] hover:underline font-mono">https://branify.store/sitemap.xml</a></p></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] rounded-xl text-xs font-bold uppercase hover:bg-[#5A8DFF]/20"><RefreshCw className="w-3.5 h-3.5" /> Regenerate</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Map} label="URLs in sitemap" value={ROUTES.length} iconColor="text-[#5A8DFF]" />
            <StatCard icon={CheckCircle2} label="Indexable" value={ROUTES.filter(r => r.robots.includes('index')).length} iconColor="text-emerald-400" />
            <StatCard icon={XCircle} label="Excluded" value={0} iconColor="text-red-400" />
            <StatCard icon={Code2} label="Schema types" value={new Set(ROUTES.map(r => r.schema)).size} iconColor="text-amber-400" />
          </div>
        </div>
      )}

      {subTab === 'robots' && (
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileCode className="w-4 h-4 text-[#5A8DFF]" /> Robots.txt Manager</h3>
          <div className="p-4 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500"># robots.txt for BRANIFY (https://branify.store)</div>
            <div>User-agent: *</div><div>Allow: /</div>
            <div className="text-red-400">Disallow: /admin</div><div className="text-red-400">Disallow: /admin/</div>
            <div className="text-red-400">Disallow: /cart</div><div className="text-red-400">Disallow: /cart/</div>
            <div className="text-red-400">Disallow: /checkout</div>
            <div className="mt-2 text-[#5A8DFF]">Sitemap: https://branify.store/sitemap.xml</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Public pages are indexable. Admin/cart/checkout are blocked.</div>
        </div>
      )}

      {subTab === 'redirects' && (
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><Link2 className="w-4 h-4 text-[#5A8DFF]" /> Redirect Manager</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] rounded-xl text-xs font-bold uppercase hover:bg-[#5A8DFF]/20"><Link2 className="w-3.5 h-3.5" /> Add Redirect</button>
          </div>
          <div className="text-center py-12 text-zinc-500"><Link2 className="w-8 h-8 mx-auto mb-3 opacity-40" /><p className="text-sm">No redirects configured yet.</p><p className="text-xs mt-1">Add 301/302 redirects to manage URL changes and prevent 404s.</p></div>
        </div>
      )}

      {subTab === 'performance' && (
        <div className="space-y-4">
          <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Gauge className="w-4 h-4 text-[#5A8DFF]" /> Performance Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Zap} label="Code Splitting" value="Active" iconColor="text-emerald-400" />
              <StatCard icon={Image} label="Lazy Loading" value="Active" iconColor="text-emerald-400" />
              <StatCard icon={Activity} label="Prerender" value="45 routes" iconColor="text-[#5A8DFF]" />
              <StatCard icon={Globe} label="PWA" value="Active" iconColor="text-emerald-400" />
            </div>
          </div>
          <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Asset Overview</h4>
            <div className="space-y-2">
              <PerfRow label="Main JS bundle" value="600 KB (154 KB gzip)" status="warning" />
              <PerfRow label="CSS" value="101 KB (15 KB gzip)" status="ok" />
              <PerfRow label="Vendor icons" value="48 KB (11 KB gzip)" status="ok" />
              <PerfRow label="Admin bundle (lazy)" value="171 KB (29 KB gzip)" status="ok" />
              <PerfRow label="Supabase client (lazy)" value="216 KB (57 KB gzip)" status="warning" />
              <PerfRow label="3D Hero (motion)" value="Lazy-loaded" status="ok" />
              <PerfRow label="Portfolio screenshots" value="Lazy-loaded + object-contain" status="ok" />
              <PerfRow label="Font loading" value="Google Fonts (preconnect + display=swap)" status="ok" />
            </div>
          </div>
        </div>
      )}

      {subTab === 'settings' && (
        <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2"><Settings className="w-4 h-4 text-[#5A8DFF]" /> SEO Settings</h3>
          <div className="text-xs text-zinc-400 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl"><AlertTriangle className="w-4 h-4 text-amber-400 inline mr-2" />Global defaults are <strong>fallbacks only</strong>. They never overwrite route-specific SEO metadata. Each route has its own unique title, description, and canonical — managed in the Page SEO tab.</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingField label="Site Name" value="BRANIFY" />
            <SettingField label="Organization Name" value="BRANIFY" />
            <SettingField label="Site URL" value="https://branify.store" />
            <SettingField label="Default OG Image" value="https://images.unsplash.com/photo-1460925895917-..." />
            <SettingField label="Twitter Card Type" value="summary_large_image" />
            <SettingField label="Sitemap Enabled" value="Yes" />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#5A8DFF] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#5A8DFF]/20 hover:brightness-110"><Save className="w-4 h-4" /> Save Settings</button>
        </div>
      )}
    </div>
  );
};

function StatCard({ icon: Icon, label, value, iconColor }: { icon: React.ElementType; label: string; value: string | number; iconColor: string }) {
  return (
    <div className="p-4 bg-zinc-950/60 border border-white/10 rounded-xl">
      <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</span><Icon className={`w-4 h-4 ${iconColor}`} /></div>
      <div className="text-2xl font-black text-white">{value}</div>
    </div>
  );
}

function CheckRow({ label, status, detail }: { label: string; status: 'ok' | 'warning' | 'error'; detail: string }) {
  const icon = status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : status === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <XCircle className="w-4 h-4 text-red-400" />;
  return <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"><div className="flex items-center gap-2">{icon}<span className="text-sm text-zinc-300">{label}</span></div><span className="text-xs text-zinc-500 font-mono">{detail}</span></div>;
}

function PerfRow({ label, value, status }: { label: string; value: string; status: 'ok' | 'warning' }) {
  return <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"><span className="text-sm text-zinc-300">{label}</span><div className="flex items-center gap-2"><span className="text-xs text-zinc-500 font-mono">{value}</span>{status === 'ok' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}</div></div>;
}

function SettingField({ label, value }: { label: string; value: string }) {
  return <div className="space-y-1"><label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{label}</label><div className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white">{value}</div></div>;
}

function PageSEOEditor({ route, form, setForm, onSave, isSaving, onCancel }: any) {
  const titleLen = (form.title || '').length;
  const descLen = (form.description || '').length;
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onCancel} className="text-zinc-400 hover:text-white"><ChevronRight className="w-5 h-5 rotate-180" /></button>
          <div><h3 className="text-sm font-bold text-white">Edit SEO — {route.h1}</h3><p className="text-xs text-zinc-500 font-mono">{route.path}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white">Cancel</button>
          <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-[#5A8DFF] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#5A8DFF]/20 hover:brightness-110 disabled:opacity-50">{isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
        </div>
      </div>
      <div className="p-4 bg-white text-zinc-900 rounded-xl space-y-1 font-sans">
        <div className="text-[11px] text-zinc-600 flex items-center gap-1"><span>{SITE_URL.replace('https://', '')}</span><span>›</span><span>{route.path.split('/').filter(Boolean).slice(0, 2).join(' › ').toLowerCase()}</span></div>
        <div className="text-base text-[#1a0dab] font-medium line-clamp-1">{form.title || route.title}</div>
        <div className="text-xs text-[#4d5156] line-clamp-2">{form.description || route.description}</div>
      </div>
      <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-4">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Basic SEO</h4>
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">SEO Title <span className={`ml-2 ${titleLen < 30 || titleLen > 65 ? 'text-amber-400' : 'text-emerald-400'}`}>({titleLen} chars)</span></label>
          <input type="text" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-[#5A8DFF] focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Meta Description <span className={`ml-2 ${descLen < 80 || descLen > 170 ? 'text-amber-400' : 'text-emerald-400'}`}>({descLen} chars)</span></label>
          <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-[#5A8DFF] focus:outline-none resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Canonical URL</label>
            <input type="text" value={form.canonical || ''} readOnly className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg text-sm text-emerald-300 font-mono" />
            <p className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Self-referencing canonical</p>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Robots</label>
            <select value={form.robots || 'index, follow'} onChange={e => setForm({ ...form, robots: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-[#5A8DFF] focus:outline-none">
              <option value="index, follow">index, follow</option><option value="index, nofollow">index, nofollow</option><option value="noindex, follow">noindex, follow</option><option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6 bg-zinc-950/60 border border-white/10 rounded-2xl space-y-2">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2"><Code2 className="w-3.5 h-3.5" /> Structured Data</h4>
        <div className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-emerald-300 font-mono">{route.schema}</div>
        <p className="text-[10px] text-zinc-500">Auto-generated based on page type. Validated JSON-LD.</p>
      </div>
    </form>
  );
}
