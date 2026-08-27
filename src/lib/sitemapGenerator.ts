import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_PRODUCTS } from '../data/productsData';
import { INITIAL_TOOLS } from '../data/toolsData';
import { INITIAL_PORTFOLIO } from '../data/portfolioData';
import { INITIAL_BLOGS } from '../data/blogData';
import { INITIAL_FREE_TEMPLATES } from '../data/freeTemplatesData';

const SITE_BASE_URL = 'https://branify.store';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Builds a dynamic XML sitemap string querying live Supabase data
 * with instantaneous local fallback.
 */
export async function generateDynamicSitemapXml(): Promise<string> {
  const today = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  const addUrl = (
    path: string,
    priority: number = 0.8,
    changefreq: SitemapEntry['changefreq'] = 'weekly',
    lastmod: string = today
  ) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    entries.push({
      loc: `${SITE_BASE_URL}${cleanPath}`,
      lastmod,
      changefreq,
      priority
    });
  };

  // 1. Core Primary Navigation Pages
  addUrl('/', 1.0, 'daily');
  addUrl('/services', 0.9, 'weekly');
  addUrl('/digital-products', 0.9, 'daily');
  addUrl('/free-tools', 0.9, 'weekly');
  addUrl('/ai-tools', 0.9, 'weekly');
  addUrl('/portfolio', 0.8, 'weekly');
  addUrl('/pricing', 0.8, 'weekly');
  addUrl('/blog', 0.8, 'daily');
  addUrl('/about', 0.7, 'monthly');
  addUrl('/contact', 0.8, 'monthly');
  addUrl('/free-templates', 0.8, 'weekly');

  // 2. Services (from Supabase or Initial Data)
  let services = INITIAL_SERVICES;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('services').select('slug, updated_at');
      if (data && data.length > 0) {
        services = data as any;
      }
    } catch {
      // fallback to INITIAL_SERVICES
    }
  }
  services.forEach((s) => {
    addUrl(`/services/${s.slug}`, 0.9, 'weekly');
  });

  // 3. Digital Products & Product Categories
  let products = INITIAL_PRODUCTS;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('products').select('*');
      if (data && data.length > 0) {
        products = data as any;
      }
    } catch {
      // fallback
    }
  }

  // Extract unique published categories
  const publishedCategories = Array.from(new Set(products.map((p) => p.category)));
  publishedCategories.forEach((cat) => {
    const catSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addUrl(`/digital-products/${catSlug}`, 0.8, 'weekly');
  });

  // Add individual published digital products
  products.forEach((prod) => {
    const catSlug = prod.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addUrl(`/digital-products/${catSlug}/${prod.slug}`, 0.8, 'weekly');
  });

  // 4. Free Templates & Categories
  const templateCategories = [
    'website',
    'canva',
    'social-media',
    'business',
    'resume',
    'presentation',
    'notion',
    'spreadsheet'
  ];
  templateCategories.forEach((cat) => {
    addUrl(`/free-templates/${cat}`, 0.8, 'weekly');
  });

  INITIAL_FREE_TEMPLATES.forEach((tmpl) => {
    addUrl(`/free-templates/${tmpl.slug}`, 0.8, 'weekly');
  });

  // 5. Free Tools
  let tools = INITIAL_TOOLS;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('tools').select('slug, updated_at');
      if (data && data.length > 0) {
        tools = data as any;
      }
    } catch {
      // fallback
    }
  }
  tools.forEach((t) => {
    addUrl(`/free-tools/${t.slug}`, 0.8, 'monthly');
    addUrl(`/tools/${t.slug}`, 0.8, 'monthly');
  });

  // 6. Portfolio Case Studies
  let portfolio = INITIAL_PORTFOLIO;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('portfolio_items').select('slug, updated_at');
      if (data && data.length > 0) {
        portfolio = data as any;
      }
    } catch {
      // fallback
    }
  }
  portfolio.forEach((p) => {
    addUrl(`/portfolio/${p.slug}`, 0.8, 'monthly');
  });

  // 7. Blog Posts
  let blogs = INITIAL_BLOGS;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('blogs').select('slug, published_at, updated_at');
      if (data && data.length > 0) {
        blogs = data as any;
      }
    } catch {
      // fallback
    }
  }
  blogs.forEach((b) => {
    addUrl(`/blog/${b.slug}`, 0.8, 'weekly');
  });

  // 8. Public Legal Policies
  addUrl('/privacy', 0.3, 'yearly');
  addUrl('/terms', 0.3, 'yearly');
  addUrl('/refund', 0.3, 'yearly');
  addUrl('/disclaimer', 0.3, 'yearly');

  // Build XML String
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const xmlBody = entries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');
  const xmlFooter = '\n</urlset>';

  return xmlHeader + xmlBody + xmlFooter;
}
