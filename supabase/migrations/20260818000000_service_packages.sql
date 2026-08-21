-- ============================================================================
-- BRANIFY SUPABASE MIGRATION: SERVICES & 4-TIER PACKAGE PRICING
-- ============================================================================

-- 1. Services Catalog Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  delivery_timeline TEXT NOT NULL DEFAULT '5–14 Days',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Service Packages (4 Tiers per service) Table
CREATE TABLE IF NOT EXISTS public.service_packages (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'professional', 'premium', 'on_demand')),
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price_usd >= 0),
  delivery_time TEXT NOT NULL,
  revisions TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlight BOOLEAN NOT NULL DEFAULT FALSE,
  badge TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (service_id, tier)
);

-- 3. Row Level Security Policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_packages ENABLE ROW LEVEL SECURITY;

-- Public can read active services & packages
CREATE POLICY "Public services read access"
  ON public.services FOR SELECT
  USING (true);

CREATE POLICY "Public service_packages read access"
  ON public.service_packages FOR SELECT
  USING (true);

-- Admins have full access to create/update/delete services & packages
CREATE POLICY "Admin full access services"
  ON public.services FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access service_packages"
  ON public.service_packages FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. Triggers for updated_at
CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_service_packages_updated_at
  BEFORE UPDATE ON public.service_packages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
