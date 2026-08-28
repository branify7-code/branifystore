/**
 * Centralized SEO Metadata Generator
 * ----------------------------------
 * One reusable function that generates SEO metadata for ANY dynamic content type.
 * Used by:
 *   1. scripts/prerender-seo.mjs (build-time HTML generation)
 *   2. src/App.tsx getRouteSEO() (runtime SEOHead)
 *   3. Admin SEO Manager (displays source: AUTO vs CUSTOM)
 *
 * Priority:
 *   Admin Override (seo_pages table)
 *     ↓
 *   Content-specific SEO fields
 *     ↓
 *   Auto Generated from item name/description
 *     ↓
 *   Global site fallback
 */

const SITE_URL = 'https://branify.store';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';
const DEFAULT_DESC = 'BRANIFY builds high-performance websites, web apps, brands and AI-powered digital solutions for businesses worldwide.';

/**
 * Generate SEO metadata for a dynamic content item.
 * @param type - content type: 'tool' | 'portfolio' | 'product' | 'blog' | 'service'
 * @param item - the content item (must have at least name/title + slug)
 * @param path - the route path (e.g. '/tools/pdf-to-text')
 * @param dbOverride - optional admin override from seo_pages table
 */
function generateSEO({ type, item, path, dbOverride }) {
  const canonical = dbOverride?.canonical_url || `${SITE_URL}${path}`;

  // Title priority: DB override → item.seoTitle → item.name/title → fallback
  const itemTitle = item.seoTitle || item.name || item.title || '';
  const rawTitle = dbOverride?.seo_title || itemTitle || 'BRANIFY';
  const title = cleanTitle(rawTitle, type);

  // Description priority: DB override → item.seoDescription → item.description/excerpt → fallback
  const itemDesc = item.seoDescription || item.description || item.excerpt || item.shortDescription || '';
  const rawDesc = dbOverride?.meta_description || itemDesc || DEFAULT_DESC;
  const description = sanitizeDescription(rawDesc);

  // Robots priority: DB override → default index,follow
  const robotsIndex = dbOverride?.robots_index !== false;
  const robotsFollow = dbOverride?.robots_follow !== false;
  const robots = `${robotsIndex ? 'index' : 'noindex'}, ${robotsFollow ? 'follow' : 'nofollow'}`;

  // OG
  const ogTitle = dbOverride?.og_title || title;
  const ogDescription = dbOverride?.og_description || description;
  const ogUrl = canonical;
  const ogImage = dbOverride?.og_image || item.image || item.coverImage || DEFAULT_OG_IMAGE;
  const ogType = type === 'blog' ? 'article' : type === 'product' ? 'product' : 'website';

  // Twitter
  const twitterTitle = dbOverride?.twitter_title || ogTitle;
  const twitterDescription = dbOverride?.twitter_description || ogDescription;
  const twitterImage = dbOverride?.twitter_image || ogImage;
  const twitterCard = 'summary_large_image';

  // Schema
  const schemaType = dbOverride?.schema_type || getSchemaType(type);
  const schema = generateSchema(type, item, canonical, title, description, ogImage);

  return {
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    schemaType,
    schema,
    source: dbOverride ? 'CUSTOM' : 'AUTO',
  };
}

function cleanTitle(raw, type) {
  let t = raw.trim();
  // Remove duplicate " | BRANIFY | BRANIFY"
  t = t.replace(/\s*\|\s*BRANIFY\s*\|\s*BRANIFY/gi, ' | BRANIFY');
  // Ensure ends with " | BRANIFY" unless it already does
  if (!t.includes('BRANIFY')) t = `${t} | BRANIFY`;
  // Cap at 65 chars
  if (t.length > 65) t = t.slice(0, 62) + '...';
  // Remove "undefined", "null", "[object Object]"
  t = t.replace(/undefined|null|\[object Object\]/gi, '').replace(/\s*\|\s*$/,'');
  if (!t.includes('BRANIFY')) t = `${t} | BRANIFY`;
  return t;
}

function sanitizeDescription(desc) {
  let d = desc.trim();
  // Strip HTML tags
  d = d.replace(/<[^>]*>/g, '');
  // Collapse whitespace
  d = d.replace(/\s+/g, ' ').trim();
  // Remove "undefined", "null"
  d = d.replace(/undefined|null/gi, '').trim();
  // Cap at 170 chars
  if (d.length > 170) d = d.slice(0, 167) + '...';
  return d || DEFAULT_DESC;
}

function getSchemaType(type) {
  switch (type) {
    case 'tool': return 'SoftwareApplication, WebPage';
    case 'portfolio': return 'CreativeWork, BreadcrumbList';
    case 'product': return 'Product, Offer';
    case 'blog': return 'Article, BreadcrumbList';
    case 'service': return 'Service, BreadcrumbList';
    default: return 'WebPage';
  }
}

function generateSchema(type, item, url, title, description, image) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    image,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  if (type === 'tool') {
    return { ...base, '@type': 'SoftwareApplication', applicationCategory: 'UtilitiesApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };
  }
  if (type === 'portfolio') {
    return { ...base, '@type': 'CreativeWork', creator: { '@id': `${SITE_URL}/#organization` } };
  }
  if (type === 'product' && item.priceUSD) {
    return { ...base, '@type': 'Product', offers: { '@type': 'Offer', price: String(item.priceUSD), priceCurrency: 'USD', availability: 'https://schema.org/InStock' } };
  }
  if (type === 'blog') {
    return { ...base, '@type': 'Article', author: { '@id': `${SITE_URL}/#organization' } };
  }
  if (type === 'service') {
    return { ...base, '@type': 'Service', provider: { '@id': `${SITE_URL}/#organization' } };
  }
  return base;
}

module.exports = { generateSEO, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_DESC };
