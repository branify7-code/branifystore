import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { SEOHead } from './components/SEOHead';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { FREE_TEMPLATES_DATA } from './data/freeTemplatesData';

// Keep HomePage instantly loaded for rapid LCP
import { HomePage } from './pages/HomePage';

// Lazy-load sub-routes to split heavy code bundles
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const DigitalProductsPage = lazy(() => import('./pages/DigitalProductsPage').then(m => ({ default: m.DigitalProductsPage })));
const DigitalProductDetailPage = lazy(() => import('./pages/DigitalProductDetailPage').then(m => ({ default: m.DigitalProductDetailPage })));
const ToolsPage = lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const PolicyPage = lazy(() => import('./pages/PolicyPages').then(m => ({ default: m.PolicyPage })));
const FreeTemplatesPage = lazy(() => import('./pages/FreeTemplatesPage').then(m => ({ default: m.FreeTemplatesPage })));
const FreeTemplateDetailPage = lazy(() => import('./pages/FreeTemplateDetailPage').then(m => ({ default: m.FreeTemplateDetailPage })));
const AIToolsPage = lazy(() => import('./pages/AIToolsPage').then(m => ({ default: m.AIToolsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Minimal, zero-CLS page transition fallback
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4" role="status" aria-label="Loading content">
    <div className="w-10 h-10 border-2 border-white/10 border-t-[#5A8DFF] rounded-full animate-spin"></div>
    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading BRANIFY Content...</span>
  </div>
);

function MainAppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const { setPwaDeferredPrompt, services, products, blogs, portfolio, tools } = useApp();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPwaDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [setPwaDeferredPrompt]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine dynamic SEO metadata for the active route
  const getRouteSEO = () => {
    if (currentPath === '/' || currentPath === '') {
      return {
        title: 'BRANIFY — Build. Brand. Grow. | Digital Agency & Software Marketplace',
        description: 'Websites, branding, AI solutions, and digital products designed to help ambitious businesses look better, work smarter and grow faster.',
        canonicalPath: '/'
      };
    }
    if (currentPath === '/services') {
      return {
        title: 'Digital Agency Capabilities & Services | BRANIFY',
        description: 'Explore our 13 primary services across React Web Development, WordPress, UI/UX Design, Brand Identity, SEO, and AI Automation.',
        canonicalPath: '/services'
      };
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const s = services.find(item => item.slug === slug);
      return {
        title: s ? `${s.name} Service | BRANIFY` : 'Agency Service Details | BRANIFY',
        description: s ? s.tagline : 'Professional web, design, and AI agency service by BRANIFY.',
        canonicalPath: `/services/${slug}`
      };
    }
    if (currentPath === '/digital-products' || currentPath.startsWith('/digital-products')) {
      if (currentPath.startsWith('/digital-products/')) {
        const parts = currentPath.replace('/digital-products/', '').split('/').filter(Boolean);
        if (parts.length === 2) {
          const productSlug = parts[1];
          const prod = products.find(p => p.slug === productSlug || p.id === productSlug);
          if (prod) {
            return {
              title: `${prod.title} — Digital Asset Pack | BRANIFY`,
              description: prod.description || 'Premium digital assets and production-ready templates by BRANIFY.',
              canonicalPath: currentPath,
              ogType: 'product' as const
            };
          }
        } else if (parts.length === 1) {
          const cat = parts[0];
          const formattedCat = cat.replace(/-/g, ' ');
          return {
            title: `${formattedCat.charAt(0).toUpperCase() + formattedCat.slice(1)} Digital Products | BRANIFY`,
            description: `Explore premium ${formattedCat} digital assets, templates, and frameworks ready for instant download.`,
            canonicalPath: currentPath
          };
        }
      }
      return {
        title: 'Digital Products, Templates & Workspaces Store | BRANIFY',
        description: 'Instant download AI prompt kits, agency Canva templates, Notion workspaces, and startup financial models.',
        canonicalPath: '/digital-products'
      };
    }
    if (currentPath === '/free-templates' || currentPath.startsWith('/free-templates')) {
      if (currentPath.startsWith('/free-templates/')) {
        const sub = currentPath.replace('/free-templates/', '');
        const categoryMap: Record<string, string> = {
          website: 'Free Website Templates',
          canva: 'Free Canva Templates',
          'social-media': 'Free Social Media Templates',
          business: 'Free Business Templates',
          resume: 'Free Resume & CV Templates',
          presentation: 'Free Presentation Templates',
          notion: 'Free Notion Templates',
          spreadsheet: 'Free Spreadsheet Templates'
        };
        if (categoryMap[sub]) {
          return {
            title: `${categoryMap[sub]} | BRANIFY`,
            description: `Download 100% free ${categoryMap[sub].toLowerCase()} designed for modern businesses, developers, and creators.`,
            canonicalPath: currentPath
          };
        }

        const template = FREE_TEMPLATES_DATA.find((t) => t.slug === sub);
        if (template) {
          return {
            title: `${template.title} — Free Download | BRANIFY`,
            description: `${template.shortDescription} Download free in ${template.fileFormat}.`,
            canonicalPath: currentPath
          };
        }
      }
      return {
        title: 'Free Templates for Business & Creators | BRANIFY',
        description: 'Download free professional templates for websites, business, marketing, social media, careers and more from BRANIFY.',
        canonicalPath: '/free-templates'
      };
    }
    if (currentPath === '/subscriptions') {
      return {
        title: 'Authorized Software Subscriptions & Licenses | BRANIFY',
        description: 'Official 1-year authorized subscription keys for AI tools, creative suites, and productivity workspaces.',
        canonicalPath: '/subscriptions'
      };
    }
    if (currentPath === '/free-tools' || currentPath.startsWith('/free-tools') || currentPath === '/tools' || currentPath.startsWith('/tools')) {
      const toolSlug = currentPath.replace(/^\/(free-tools|tools)\/?/, '');
      if (toolSlug) {
        const t = tools.find(item => item.slug === toolSlug);
        if (t) {
          return {
            title: `${t.name} — 100% Free Online Browser Tool | BRANIFY`,
            description: t.description || 'Fast, private browser-based utility by BRANIFY with zero data retention.',
            canonicalPath: `/free-tools/${toolSlug}`
          };
        }
      }
      return {
        title: '100+ Free Online Web & Developer Tools | BRANIFY',
        description: '100% free browser-executable utilities for PDF text extraction, image compression, JSON formatting, SEO meta generation, and calculations.',
        canonicalPath: '/free-tools'
      };
    }
    if (
      currentPath === '/portfolio' ||
      currentPath.startsWith('/portfolio') ||
      currentPath === '/profolio' ||
      currentPath.startsWith('/profolio')
    ) {
      if (currentPath.startsWith('/portfolio/') || currentPath.startsWith('/profolio/')) {
        const slug = currentPath.replace(/^\/(portfolio|profolio)\//, '');
        const p = portfolio.find(item => item.slug === slug);
        return {
          title: p ? `${p.title} Case Study | BRANIFY` : 'Client Case Study | BRANIFY',
          description: p ? p.challenge : 'Client case study and results by BRANIFY.',
          canonicalPath: `/portfolio/${slug}`
        };
      }
      return {
        title: 'Case Studies & Client Portfolio | BRANIFY',
        description: 'Explore our verified case studies, enterprise web architectures, branding transformations, and measurable client results.',
        canonicalPath: '/portfolio'
      };
    }
    if (currentPath === '/pricing') {
      return {
        title: 'Transparent Flat-Fee Pricing & Packages | BRANIFY',
        description: 'Clear, predictable pricing in USD, PKR, and AED for startups, scaling brands, and custom enterprise software development.',
        canonicalPath: '/pricing'
      };
    }
    if (currentPath === '/blog' || currentPath.startsWith('/blog')) {
      if (currentPath.startsWith('/blog/')) {
        const slug = currentPath.replace('/blog/', '');
        const b = blogs.find(item => item.slug === slug);
        return {
          title: b ? `${b.title} | BRANIFY Blog` : 'Engineering & Design Insights | BRANIFY',
          description: b ? b.excerpt : 'Actionable web engineering, branding, and AI strategies from the BRANIFY team.',
          canonicalPath: `/blog/${slug}`,
          ogType: 'article' as const
        };
      }
      return {
        title: 'Engineering & Digital Growth Blog | BRANIFY',
        description: 'Actionable strategies, technical breakdowns, and guides on web performance, UI/UX design, and AI automation.',
        canonicalPath: '/blog'
      };
    }
    if (currentPath === '/about') {
      return {
        title: 'About BRANIFY | Digital Agency & Assets Platform',
        description: 'Discover our mission, international engineering squad, multi-currency capabilities, and client warranty standards.',
        canonicalPath: '/about'
      };
    }
    if (currentPath === '/contact') {
      return {
        title: 'Book a Consultation & Start Your Project | BRANIFY',
        description: 'Schedule an executive consultation or submit your project brief for custom web development, branding, or AI solutions.',
        canonicalPath: '/contact'
      };
    }
    if (currentPath === '/cart') {
      return {
        title: 'Shopping Cart & Checkout | BRANIFY',
        description: 'Review your selected digital assets, templates, and service orders.',
        canonicalPath: '/cart'
      };
    }
    if (currentPath === '/admin') {
      return {
        title: 'Management Dashboard | BRANIFY',
        description: 'BRANIFY Admin Portal for managing leads, products, case studies, and articles.',
        canonicalPath: '/admin'
      };
    }
    if (['/privacy', '/terms', '/refund', '/disclaimer'].includes(currentPath)) {
      return {
        title: 'Legal Policies & Terms of Service | BRANIFY',
        description: 'Official legal policies, privacy standards, and refund terms of BRANIFY.',
        canonicalPath: currentPath
      };
    }

    return {
      title: 'BRANIFY — Build. Brand. Grow. | Digital Agency & Software Marketplace',
      description: 'International digital agency, digital products marketplace, and 100+ free online browser tools.',
      canonicalPath: currentPath
    };
  };

  const seoData = getRouteSEO();

  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/services') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <ServicesPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <ServiceDetailPage navigate={navigate} slug={slug} />
        </Suspense>
      );
    }
    if (currentPath === '/digital-products' || currentPath === '/subscriptions') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <DigitalProductsPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/digital-products/')) {
      const sub = currentPath.replace('/digital-products/', '');
      const parts = sub.split('/').filter(Boolean);
      if (parts.length === 2) {
        return (
          <Suspense fallback={<PageLoadingFallback />}>
            <DigitalProductDetailPage navigate={navigate} categorySlug={parts[0]} productSlug={parts[1]} />
          </Suspense>
        );
      }
      if (parts.length === 1) {
        // Check if it matches a direct product slug first
        const directProd = products.find(p => p.slug === parts[0] || p.id === parts[0]);
        if (directProd) {
          return (
            <Suspense fallback={<PageLoadingFallback />}>
              <DigitalProductDetailPage navigate={navigate} productSlug={parts[0]} />
            </Suspense>
          );
        }
        // Otherwise filter by category
        return (
          <Suspense fallback={<PageLoadingFallback />}>
            <DigitalProductsPage navigate={navigate} categoryFilter={parts[0]} />
          </Suspense>
        );
      }
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <DigitalProductsPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/free-templates') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <FreeTemplatesPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/free-templates/')) {
      const sub = currentPath.replace('/free-templates/', '');
      const categories = ['website', 'canva', 'social-media', 'business', 'resume', 'presentation', 'notion', 'spreadsheet'];
      if (categories.includes(sub)) {
        return (
          <Suspense fallback={<PageLoadingFallback />}>
            <FreeTemplatesPage navigate={navigate} categoryFilter={sub} />
          </Suspense>
        );
      }
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <FreeTemplateDetailPage navigate={navigate} slug={sub} />
        </Suspense>
      );
    }
    if (currentPath === '/ai-tools') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <AIToolsPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/free-tools' || currentPath === '/tools') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <ToolsPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/free-tools/') || currentPath.startsWith('/tools/')) {
      const toolSlug = currentPath.replace(/^\/(free-tools|tools)\//, '');
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <ToolsPage navigate={navigate} selectedToolSlug={toolSlug} />
        </Suspense>
      );
    }
    if (currentPath === '/portfolio' || currentPath === '/profolio') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PortfolioPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/portfolio/') || currentPath.startsWith('/profolio/')) {
      const slug = currentPath.replace(/^\/(portfolio|profolio)\//, '');
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PortfolioPage navigate={navigate} selectedSlug={slug} />
        </Suspense>
      );
    }
    if (currentPath === '/pricing') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PricingPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/blog') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <BlogPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <BlogPage navigate={navigate} selectedSlug={slug} />
        </Suspense>
      );
    }
    if (currentPath === '/about') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <AboutPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/contact') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <ContactPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/cart') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <CartPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/admin') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <AdminPage navigate={navigate} />
        </Suspense>
      );
    }
    if (currentPath === '/privacy') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PolicyPage navigate={navigate} type="privacy" />
        </Suspense>
      );
    }
    if (currentPath === '/terms') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PolicyPage navigate={navigate} type="terms" />
        </Suspense>
      );
    }
    if (currentPath === '/refund') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PolicyPage navigate={navigate} type="refund" />
        </Suspense>
      );
    }
    if (currentPath === '/disclaimer') {
      return (
        <Suspense fallback={<PageLoadingFallback />}>
          <PolicyPage navigate={navigate} type="disclaimer" />
        </Suspense>
      );
    }

    // 404 Not Found Page for all invalid / unregistered URLs
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <NotFoundPage navigate={navigate} />
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-[#5A8DFF] selection:text-black">
      {/* Dynamic SEO Meta Tag Injector */}
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        canonicalPath={seoData.canonicalPath}
        ogType={seoData.ogType}
      />

      {/* Accessible Skip Link for Screen Readers & Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#5A8DFF] focus:text-black focus:font-extrabold focus:rounded-xl focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      <AnnouncementBar navigate={navigate} />
      <Header currentPath={currentPath} navigate={navigate} />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {renderCurrentView()}
      </main>
      <Footer navigate={navigate} />
      <SearchModal navigate={navigate} />
      <ToastContainer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

