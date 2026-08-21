-- ============================================================================
-- BRANIFY SUPABASE DATABASE SCHEMA MIGRATION
-- Free Templates System & Manual Asset Upload Storage
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABLE: free_templates
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.free_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  format TEXT NOT NULL DEFAULT 'Document',
  file_format TEXT NOT NULL DEFAULT 'Document',
  file_size TEXT NOT NULL DEFAULT '0 KB',
  download_path TEXT,
  download_url TEXT,
  preview_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  whats_included TEXT[] DEFAULT '{}',
  license TEXT NOT NULL DEFAULT 'MIT License — 100% Free for Commercial & Personal Use',
  disclaimer TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'coming_soon', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_free BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 1,
  seo_title TEXT,
  meta_description TEXT,
  seo_keywords TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Trigger for auto updated_at
CREATE TRIGGER tr_free_templates_updated_at
  BEFORE UPDATE ON public.free_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes for ultra-fast querying
CREATE INDEX IF NOT EXISTS idx_free_templates_slug ON public.free_templates(slug);
CREATE INDEX IF NOT EXISTS idx_free_templates_category_status ON public.free_templates(category_slug, status);
CREATE INDEX IF NOT EXISTS idx_free_templates_status_sort ON public.free_templates(status, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_free_templates_created_at ON public.free_templates(created_at DESC);

-- ----------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.free_templates ENABLE ROW LEVEL SECURITY;

-- Public users can read published or coming soon templates
CREATE POLICY "Public read published or coming soon free templates"
  ON public.free_templates FOR SELECT
  USING (status IN ('published', 'coming_soon') OR public.is_admin());

-- Authorized admins have full CRUD permissions
CREATE POLICY "Admin full manage free templates"
  ON public.free_templates FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 3. SUPABASE STORAGE BUCKETS FOR REAL UPLOADED TEMPLATE ASSETS
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES
  ('free-template-files', 'free-template-files', true),
  ('free-template-previews', 'free-template-previews', true)
ON CONFLICT (id) DO NOTHING;

-- Public read policies for storage buckets
CREATE POLICY "Public read free-template-files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'free-template-files');

CREATE POLICY "Public read free-template-previews"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'free-template-previews');

-- Admin full management for template files and previews
CREATE POLICY "Admin manage free template storage objects"
  ON storage.objects FOR ALL
  USING (public.is_admin());
