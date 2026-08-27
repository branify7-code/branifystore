-- BRANIFY SEO Pages Table
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run
-- Creates the seo_pages table for per-route SEO configuration storage.

CREATE TABLE IF NOT EXISTS public.seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT UNIQUE NOT NULL,
  page_type TEXT DEFAULT 'static',
  seo_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  secondary_keywords TEXT,
  canonical_url TEXT,
  robots_index BOOLEAN DEFAULT true,
  robots_follow BOOLEAN DEFAULT true,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  schema_type TEXT,
  schema_json JSONB,
  include_in_sitemap BOOLEAN DEFAULT true,
  sitemap_priority TEXT DEFAULT '0.8',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

-- Public can read SEO data (needed for prerender + frontend)
DROP POLICY IF EXISTS "Public can read SEO pages" ON public.seo_pages;
CREATE POLICY "Public can read SEO pages" ON public.seo_pages FOR SELECT USING (true);

-- Authenticated (admin) can manage SEO data
DROP POLICY IF EXISTS "Admin can manage SEO pages" ON public.seo_pages;
CREATE POLICY "Admin can manage SEO pages" ON public.seo_pages FOR ALL USING (true) WITH CHECK (true);

-- Index on route for fast lookups
CREATE INDEX IF NOT EXISTS idx_seo_pages_route ON public.seo_pages(route);

-- Seed default SEO data for all 45 public routes
INSERT INTO public.seo_pages (route, page_type, seo_title, meta_description, canonical_url, robots_index, robots_follow, schema_type, sitemap_priority) VALUES
('/', 'static', 'Custom Web Development & Digital Agency | BRANIFY', 'Professional web development, custom branding, AI automation, and digital products built to scale ambitious modern businesses worldwide.', 'https://branify.store/', true, true, 'Organization, WebSite', '1.0'),
('/portfolio', 'static', 'Website Design & Development Portfolio | BRANIFY', 'Explore BRANIFY''s website design, web development, branding and digital projects created for ambitious businesses.', 'https://branify.store/portfolio', true, true, 'WebPage, BreadcrumbList', '0.9'),
('/services', 'static', 'Digital Agency Services | Web, Branding, AI & SEO | BRANIFY', 'BRANIFY offers website development, WordPress, UI/UX design, branding, SEO, AI solutions, and business consultation services for ambitious brands.', 'https://branify.store/services', true, true, 'WebPage, BreadcrumbList', '0.9'),
('/services/website-development', 'service', 'Website Development Services | BRANIFY', 'Professional website development services for businesses and brands. Fast, responsive and scalable solutions built by BRANIFY.', 'https://branify.store/services/website-development', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/wordpress-development', 'service', 'WordPress Development Services | BRANIFY', 'Professional WordPress development services for businesses and brands. Custom themes, plugins, and WooCommerce solutions by BRANIFY.', 'https://branify.store/services/wordpress-development', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/landing-pages', 'service', 'Landing Pages Services | BRANIFY', 'High-converting landing page design and development services for businesses and brands by BRANIFY.', 'https://branify.store/services/landing-pages', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/ui-ux-design', 'service', 'UI UX Design Services | BRANIFY', 'Professional UI/UX design services for businesses and brands. User-centered interfaces built by BRANIFY.', 'https://branify.store/services/ui-ux-design', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/logo-design', 'service', 'Logo Design Services | BRANIFY', 'Professional logo design services for businesses and brands. Memorable, scalable brand marks built by BRANIFY.', 'https://branify.store/services/logo-design', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/brand-identity', 'service', 'Brand Identity Services | BRANIFY', 'Professional brand identity design services for businesses and brands. Complete brand systems built by BRANIFY.', 'https://branify.store/services/brand-identity', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/social-media-design', 'service', 'Social Media Design Services | BRANIFY', 'Professional social media design services for businesses and brands. Engaging visual content built by BRANIFY.', 'https://branify.store/services/social-media-design', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/business-presentation', 'service', 'Business Presentation Services | BRANIFY', 'Professional business presentation design services for businesses and brands. Investor-ready decks built by BRANIFY.', 'https://branify.store/services/business-presentation', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/seo', 'service', 'SEO Services | BRANIFY', 'Professional SEO services for businesses and brands. Technical SEO, content optimization, and ranking growth by BRANIFY.', 'https://branify.store/services/seo', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/ai-solutions', 'service', 'AI Solutions Services | BRANIFY', 'Professional AI solutions services for businesses and brands. AI automation, chatbots, and workflows built by BRANIFY.', 'https://branify.store/services/ai-solutions', true, true, 'Service, BreadcrumbList', '0.8'),
('/services/business-consultation', 'service', 'Business Consultation Services | BRANIFY', 'Professional business consultation services for businesses and brands. Strategic growth guidance by BRANIFY.', 'https://branify.store/services/business-consultation', true, true, 'Service, BreadcrumbList', '0.8'),
('/tools', 'static', '100+ Free Online Tools | Browser Utilities | BRANIFY', 'Use free online browser tools for productivity, development, text, images and everyday tasks from BRANIFY.', 'https://branify.store/tools', true, true, 'WebPage, BreadcrumbList', '0.9'),
('/ai-tools', 'static', 'AI Tools for Business & Productivity | BRANIFY', 'Discover useful AI tools for productivity, business, content, design and everyday workflows from BRANIFY.', 'https://branify.store/ai-tools', true, true, 'WebPage, BreadcrumbList', '0.9'),
('/digital-products', 'static', 'Premium Digital Products & Templates | BRANIFY', 'Browse premium digital products, templates, and resources for businesses, agencies, and creators from BRANIFY.', 'https://branify.store/digital-products', true, true, 'WebPage, BreadcrumbList', '0.8'),
('/pricing', 'static', 'Transparent Pricing & Packages | BRANIFY', 'View BRANIFY pricing and packages for web development, branding, AI solutions, and digital products. Clear, upfront, no hidden fees.', 'https://branify.store/pricing', true, true, 'WebPage, BreadcrumbList', '0.7'),
('/about', 'static', 'About BRANIFY | International Digital Agency', 'BRANIFY is an international full-stack digital agency providing custom web development, brand identity design, AI solutions, and digital products worldwide.', 'https://branify.store/about', true, true, 'WebPage, BreadcrumbList', '0.7'),
('/contact', 'static', 'Contact BRANIFY | Start Your Digital Project', 'Get in touch with BRANIFY to start your web development, branding, or AI project. Fast response, transparent quotes, global delivery.', 'https://branify.store/contact', true, true, 'WebPage, ContactPoint', '0.8'),
('/blog', 'static', 'BRANIFY Blog | Digital Agency Insights & Guides', 'Read the latest insights, guides, and articles on web development, branding, AI, and digital growth from the BRANIFY team.', 'https://branify.store/blog', true, true, 'WebPage, Blog', '0.8'),
('/free-templates', 'static', 'Free Digital Templates | BRANIFY', 'Download free website, Canva, social media, business, resume, and Notion templates from BRANIFY. No signup required.', 'https://branify.store/free-templates', true, true, 'WebPage, BreadcrumbList', '0.8'),
('/portfolio/playbeat', 'portfolio', 'PlayBeat — Case Study | BRANIFY', 'Explore the PlayBeat case study — a premium digital audio streaming project designed and engineered by BRANIFY.', 'https://branify.store/portfolio/playbeat', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/blockexchange', 'portfolio', 'BlockExchange — Case Study | BRANIFY', 'Explore the BlockExchange case study — a premium Web3 exchange project designed and engineered by BRANIFY.', 'https://branify.store/portfolio/blockexchange', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/property-atlas', 'portfolio', 'Property Atlas — Case Study | BRANIFY', 'Explore the Property Atlas case study — a luxury real estate project designed and engineered by BRANIFY.', 'https://branify.store/portfolio/property-atlas', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/alaya-spa-wellness', 'portfolio', 'Alaya Spa & Wellness — Case Study | BRANIFY', 'Explore the Alaya Spa & Wellness case study — a premium spa and wellness website designed and engineered by BRANIFY.', 'https://branify.store/portfolio/alaya-spa-wellness', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/artline-gents-salon', 'portfolio', 'Artline Gents Salon — Case Study | BRANIFY', 'Explore the Artline Gents Salon case study — a premium men''s grooming website designed and engineered by BRANIFY.', 'https://branify.store/portfolio/artline-gents-salon', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/maison-elixir-salon', 'portfolio', 'Maison Elixir Salon — Case Study | BRANIFY', 'Explore the Maison Elixir Salon case study — a premium beauty salon website designed and engineered by BRANIFY.', 'https://branify.store/portfolio/maison-elixir-salon', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/taqdeer-by-jts', 'portfolio', 'Taqdeer by JTS — Case Study | BRANIFY', 'Explore the Taqdeer by JTS case study — a boutique fashion e-commerce project designed and engineered by BRANIFY.', 'https://branify.store/portfolio/taqdeer-by-jts', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/meridian-marketplace', 'portfolio', 'Meridian Marketplace — Case Study | BRANIFY', 'Explore the Meridian Marketplace case study — a luxury verified showroom marketplace designed and engineered by BRANIFY.', 'https://branify.store/portfolio/meridian-marketplace', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/tatka-bazar', 'portfolio', 'Tatka Bazar — Case Study | BRANIFY', 'Explore the Tatka Bazar case study — an online grocery and express delivery platform designed and engineered by BRANIFY.', 'https://branify.store/portfolio/tatka-bazar', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/cinestream', 'portfolio', 'CineStream — Case Study | BRANIFY', 'Explore the CineStream case study — a cinematic movie and TV streaming platform designed and engineered by BRANIFY.', 'https://branify.store/portfolio/cinestream', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/la-cava-dxb', 'portfolio', 'LA CAVA DXB — Case Study | BRANIFY', 'Explore the LA CAVA DXB case study — a premium skincare and beauty clinic website designed and engineered by BRANIFY.', 'https://branify.store/portfolio/la-cava-dxb', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/portfolio/world-dollar-quest', 'portfolio', 'World Dollar Quest — Case Study | BRANIFY', 'Explore the World Dollar Quest case study — an AI tools and earn-online resource hub designed and engineered by BRANIFY.', 'https://branify.store/portfolio/world-dollar-quest', true, true, 'CreativeWork, BreadcrumbList', '0.7'),
('/digital-products/ai-prompts-masterkit', 'product', 'AI Prompts Masterkit | Digital Product | BRANIFY', 'AI Prompts Masterkit — a premium digital product available from BRANIFY. Boost your productivity and workflow.', 'https://branify.store/digital-products/ai-prompts-masterkit', true, true, 'Product, Offer', '0.6'),
('/digital-products/canva-agency-kit', 'product', 'Canva Agency Kit | Digital Product | BRANIFY', 'Canva Agency Kit — a premium digital product available from BRANIFY. Boost your productivity and workflow.', 'https://branify.store/digital-products/canva-agency-kit', true, true, 'Product, Offer', '0.6'),
('/digital-products/notion-agency-os', 'product', 'Notion Agency OS | Digital Product | BRANIFY', 'Notion Agency OS — a premium digital product available from BRANIFY. Boost your productivity and workflow.', 'https://branify.store/digital-products/notion-agency-os', true, true, 'Product, Offer', '0.6'),
('/blog/2026-brand-identity-trends', 'blog', '2026 Brand Identity Trends | BRANIFY Blog', 'Read about 2026 brand identity trends and other digital agency insights on the BRANIFY blog.', 'https://branify.store/blog/2026-brand-identity-trends', true, true, 'Article', '0.6'),
('/blog/wordpress-vs-custom-react-2026', 'blog', 'WordPress vs Custom React 2026 | BRANIFY Blog', 'Read about WordPress vs custom React in 2026 and other digital agency insights on the BRANIFY blog.', 'https://branify.store/blog/wordpress-vs-custom-react-2026', true, true, 'Article', '0.6'),
('/blog/ai-automation-small-business-growth', 'blog', 'AI Automation Small Business Growth | BRANIFY Blog', 'Read about AI automation for small business growth and other digital agency insights on the BRANIFY blog.', 'https://branify.store/blog/ai-automation-small-business-growth', true, true, 'Article', '0.6')
ON CONFLICT (route) DO UPDATE SET
  seo_title = EXCLUDED.seo_title,
  meta_description = EXCLUDED.meta_description,
  canonical_url = EXCLUDED.canonical_url,
  schema_type = EXCLUDED.schema_type,
  updated_at = NOW();

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_seo_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_seo_pages_updated_at ON public.seo_pages;
CREATE TRIGGER tr_seo_pages_updated_at BEFORE UPDATE ON public.seo_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();
