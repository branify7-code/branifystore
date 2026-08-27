-- ============================================================================
-- BRANIFY SUPABASE CMS & BUSINESS MANAGEMENT COMPLETE MIGRATION
-- Single Source of Truth for Content, Branding, Categories, Products & Settings
-- ============================================================================

-- 1. Site Settings Table (Global Config & Single Source of Truth)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT 'BRANIFY',
  tagline TEXT NOT NULL DEFAULT 'BUILD. BRAND. GROW.',
  announcement_text TEXT NOT NULL DEFAULT 'Launch Offer — Quality Web Development, Design & Digital Solutions',
  announcement_cta_text TEXT NOT NULL DEFAULT 'Start a Project →',
  announcement_link TEXT NOT NULL DEFAULT '/contact',
  announcement_active BOOLEAN NOT NULL DEFAULT TRUE,
  contact_email TEXT NOT NULL DEFAULT 'branify7@gmail.com',
  contact_phone TEXT NOT NULL DEFAULT '+1 (581) 907-2960',
  contact_whatsapp TEXT NOT NULL DEFAULT '+1 581 907-2960',
  location TEXT NOT NULL DEFAULT 'Serving Clients Worldwide — US, UK, UAE & Global',
  business_hours TEXT NOT NULL DEFAULT 'Mon - Sat: 9:00 AM - 9:00 PM (EST / GMT / GST)',
  socials JSONB NOT NULL DEFAULT '{"instagram":"https://instagram.com/branify.store","linkedin":"https://linkedin.com/company/branify","facebook":"https://facebook.com/branify.store","twitter":"https://x.com/branify_store","github":"https://github.com/branify"}'::jsonb,
  brand_assets JSONB NOT NULL DEFAULT '{"logoUrl":"/branify-logo.png","logoDarkUrl":"/branify-logo-dark.png","faviconUrl":"/branify-icon.png","ogImageUrl":"/branify-logo-dark.png"}'::jsonb,
  company_details JSONB NOT NULL DEFAULT '{"companyName":"BRANIFY","legalName":"BRANIFY Digital Studio LLC","tagline":"BUILD. BRAND. GROW.","foundedYear":"2024","industry":"Web Development & Digital Products","businessEmail":"branify7@gmail.com","phone":"+1 (581) 907-2960","whatsappNumber":"+1 581 907-2960","websiteUrl":"https://branify.store"}'::jsonb,
  whatsapp_config JSONB NOT NULL DEFAULT '{"whatsappNumber":"+1 581 907-2960","displayName":"BRANIFY Executive Team","defaultMessage":"Hi BRANIFY, I am visiting your website and would like to discuss a project / custom quote.","buttonEnabled":true,"floatingButtonEnabled":true}'::jsonb,
  contact_info JSONB NOT NULL DEFAULT '{"businessEmail":"branify7@gmail.com","whatsappNumber":"+1 581 907-2960","phoneNumber":"+1 (581) 907-2960","address":"Executive Digital Hub","city":"Global Delivery","country":"United States & Worldwide","workingHours":"Mon - Sat: 9:00 AM - 9:00 PM EST","socials":[]}'::jsonb,
  homepage_content JSONB NOT NULL DEFAULT '{"heroBadge":"Premium Web Development & Brand Studio","heroHeading":"We Build High-Impact Digital Experiences That","heroHighlightText":"Scale Your Business.","heroDescription":"From high-converting web applications and bespoke brand identities to production-ready digital toolkits — BRANIFY equips ambitious founders with the tech stack to win.","primaryCtaText":"Explore Services & Pricing","primaryCtaLink":"/services","secondaryCtaText":"Book Free Consultation","secondaryCtaLink":"/contact","sections":{"announcement":true,"hero":true,"trustStats":true,"services":true,"portfolio":true,"pricing":true,"digitalProducts":true,"freeTemplates":true,"freeTools":true,"aiTools":true,"testimonials":true,"blog":true,"ctaBanner":true,"footerCta":true}}'::jsonb,
  seo_settings JSONB NOT NULL DEFAULT '{"siteTitle":"BRANIFY — Web Development, Branding & Digital Growth Studio","siteDescription":"Executive web engineering, tailored brand identities, and high-performance digital templates for ambitious businesses worldwide.","defaultKeywords":"web development, brand identity, digital agency, UI/UX design, custom websites, digital products, templates","defaultOgImage":"/branify-logo-dark.png","faviconUrl":"/branify-icon.png","twitterHandle":"@branify_store"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Service Categories Table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Code',
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Product Categories Table
CREATE TABLE IF NOT EXISTS public.product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Folder',
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Media Library Table
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'image',
  file_size TEXT NOT NULL DEFAULT '0 KB',
  category TEXT NOT NULL DEFAULT 'General',
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. AI Tools Table
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  route_url TEXT NOT NULL DEFAULT '/ai-tools',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 1,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Add any missing columns to products table safely
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='compare_at_price') THEN
    ALTER TABLE public.products ADD COLUMN compare_at_price NUMERIC(10, 2);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='product_file_url') THEN
    ALTER TABLE public.products ADD COLUMN product_file_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='product_file_name') THEN
    ALTER TABLE public.products ADD COLUMN product_file_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='features') THEN
    ALTER TABLE public.products ADD COLUMN features JSONB DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='whats_included') THEN
    ALTER TABLE public.products ADD COLUMN whats_included JSONB DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='license') THEN
    ALTER TABLE public.products ADD COLUMN license TEXT DEFAULT 'Standard Commercial License';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='sort_order') THEN
    ALTER TABLE public.products ADD COLUMN sort_order INTEGER DEFAULT 1;
  END IF;
END $$;

-- 7. Add any missing columns to portfolio_items table safely
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_items' AND column_name='live_url') THEN
    ALTER TABLE public.portfolio_items ADD COLUMN live_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_items' AND column_name='key_features') THEN
    ALTER TABLE public.portfolio_items ADD COLUMN key_features JSONB DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_items' AND column_name='is_featured') THEN
    ALTER TABLE public.portfolio_items ADD COLUMN is_featured BOOLEAN DEFAULT TRUE;
  END IF;
END $$;

-- 8. Row Level Security Policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read service_categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public read product_categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Public read media_library" ON public.media_library FOR SELECT USING (true);
CREATE POLICY "Public read ai_tools" ON public.ai_tools FOR SELECT USING (true);

-- Admins full management
CREATE POLICY "Admin manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage service_categories" ON public.service_categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage product_categories" ON public.product_categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage media_library" ON public.media_library FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage ai_tools" ON public.ai_tools FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Insert default site_settings row if not exists
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
