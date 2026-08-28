/**
 * Prerender SEO — generates route-specific HTML files with correct metadata.
 * Runs as a post-build step after `vite build`.
 *
 * AUTO-DISCOVERY: reads data files at build time to discover all dynamic
 * routes (tools, portfolio, products, blog, services). No manual slug lists.
 *
 * Uses the centralized SEO generator (src/lib/seoGenerator.ts) for consistent
 * metadata across all content types.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';

const SITE_URL = 'https://branify.store';
const DIST_DIR = 'dist';
const SOURCE_HTML = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
const SRC_DIR = 'src/data';

// ── Auto-discover slugs from data files ─────────────────────────
function extractSlugs(filePath, nameField = 'name') {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const slugs = [];
    const names = [];
    const descField = content.match(/shortDescription|description|excerpt/) ? content.match(/shortDescription|description|excerpt/) : null;

    // Match slug: 'value'
    const slugMatches = content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
    for (const m of slugMatches) slugs.push(m[1]);

    // Match name: 'value' or title: 'value'
    const nameMatches = content.matchAll(new RegExp(`${nameField}:\\s*['"\`]([^'"\`]+)['"\`]`, 'g'));
    for (const m of nameMatches) names.push(m[1]);

    return { slugs, names };
  } catch {
    return { slugs: [], names: [] };
  }
}

function extractFields(filePath, fields = ['slug', 'name', 'title', 'description', 'shortDescription', 'excerpt', 'coverImage', 'image', 'priceUSD']) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const items = [];
    // Split by object boundaries (opening brace at start of object)
    const objPattern = /\{[^}]*\}/gs;
    const matches = [...content.matchAll(objPattern)];
    for (const m of matches) {
      const objStr = m[0];
      const item = {};
      for (const field of fields) {
        const fieldMatch = objStr.match(new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`));
        if (fieldMatch) item[field] = fieldMatch[1];
        // Also try numeric fields
        const numMatch = objStr.match(new RegExp(`${field}:\\s*(\\d+(?:\\.\\d+)?)`));
        if (numMatch && !item[field]) item[field] = parseFloat(numMatch[1]);
      }
      if (item.slug) items.push(item);
    }
    return items;
  } catch {
    return [];
  }
}

// ── Static routes (manually curated hub pages) ──────────────────
const staticRoutes = [
  { path: '/', title: 'Custom Web Development & Digital Agency | BRANIFY', description: 'Professional web development, custom branding, AI automation, and digital products built to scale ambitious modern businesses worldwide.' },
  { path: '/portfolio', title: 'Website Design & Development Portfolio | BRANIFY', description: "Explore BRANIFY's website design, web development, branding and digital projects created for ambitious businesses." },
  { path: '/services', title: 'Digital Agency Services | Web, Branding, AI & SEO | BRANIFY', description: 'BRANIFY offers website development, WordPress, UI/UX design, branding, SEO, AI solutions, and business consultation services for ambitious brands.' },
  { path: '/tools', title: '100+ Free Online Tools | Browser Utilities | BRANIFY', description: 'Use free online browser tools for productivity, development, text, images and everyday tasks from BRANIFY.' },
  { path: '/ai-tools', title: 'AI Tools for Business & Productivity | BRANIFY', description: 'Discover useful AI tools for productivity, business, content, design and everyday workflows from BRANIFY.' },
  { path: '/digital-products', title: 'Premium Digital Products & Templates | BRANIFY', description: 'Browse premium digital products, templates, and resources for businesses, agencies, and creators from BRANIFY.' },
  { path: '/pricing', title: 'Transparent Pricing & Packages | BRANIFY', description: 'View BRANIFY pricing and packages for web development, branding, AI solutions, and digital products. Clear, upfront, no hidden fees.' },
  { path: '/about', title: 'About BRANIFY | International Digital Agency', description: 'BRANIFY is an international full-stack digital agency providing custom web development, brand identity design, AI solutions, and digital products worldwide.' },
  { path: '/contact', title: 'Contact BRANIFY | Start Your Digital Project', description: 'Get in touch with BRANIFY to start your web development, branding, or AI project. Fast response, transparent quotes, global delivery.' },
  { path: '/blog', title: 'BRANIFY Blog | Digital Agency Insights & Guides', description: 'Read the latest insights, guides, and articles on web development, branding, AI, and digital growth from the BRANIFY team.' },
  { path: '/free-templates', title: 'Free Digital Templates | BRANIFY', description: 'Download free website, Canva, social media, business, resume, and Notion templates from BRANIFY. No signup required.' },
];

// ── Build all routes ────────────────────────────────────────────
const routes = [...staticRoutes];
let toolCount = 0, portfolioCount = 0, productCount = 0, blogCount = 0, serviceCount = 0;

// Tools — auto-discover from src/data/toolsData.ts
const tools = extractFields(join(SRC_DIR, 'toolsData.ts'), ['slug', 'name', 'description', 'shortDescription', 'category']);
for (const tool of tools) {
  const name = tool.name || tool.slug;
  const desc = tool.shortDescription || tool.description || `${name} — a free online browser tool from BRANIFY.`;
  routes.push({
    path: `/tools/${tool.slug}`,
    title: `${name} | BRANIFY`,
    description: sanitize(desc),
  });
  toolCount++;
}

// Portfolio — auto-discover from src/data/portfolioData.ts
const portfolio = extractFields(join(SRC_DIR, 'portfolioData.ts'), ['slug', 'title', 'challenge', 'category', 'industry']);
for (const item of portfolio) {
  const name = item.title || item.slug;
  const desc = item.challenge || `${name} — a premium digital project designed and engineered by BRANIFY.`;
  routes.push({
    path: `/portfolio/${item.slug}`,
    title: `${name} — Case Study | BRANIFY`,
    description: sanitize(desc),
  });
  portfolioCount++;
}

// Digital Products — auto-discover from src/data/productsData.ts
const products = extractFields(join(SRC_DIR, 'productsData.ts'), ['slug', 'title', 'description', 'category']);
for (const product of products) {
  const name = product.title || product.slug;
  const desc = product.description || `${name} — a premium digital product available from BRANIFY.`;
  routes.push({
    path: `/digital-products/${product.slug}`,
    title: `${name} | Digital Product | BRANIFY`,
    description: sanitize(desc),
  });
  productCount++;
}

// Blog — auto-discover from src/data/blogData.ts
const blogs = extractFields(join(SRC_DIR, 'blogData.ts'), ['slug', 'title', 'excerpt']);
for (const blog of blogs) {
  const name = blog.title || blog.slug;
  const desc = blog.excerpt || `Read ${name} and other digital agency insights on the BRANIFY blog.`;
  routes.push({
    path: `/blog/${blog.slug}`,
    title: `${name} | BRANIFY Blog`,
    description: sanitize(desc),
  });
  blogCount++;
}

// Services — auto-discover from src/data/servicesData.ts
const services = extractFields(join(SRC_DIR, 'servicesData.ts'), ['slug', 'name', 'shortDescription']);
for (const service of services) {
  const name = service.name || service.slug;
  const desc = service.shortDescription || `Professional ${name} services for businesses and brands. Solutions built by BRANIFY.`;
  routes.push({
    path: `/services/${service.slug}`,
    title: `${name} Services | BRANIFY`,
    description: sanitize(desc),
  });
  serviceCount++;
}

// ── HTML metadata replacement ──────────────────────────────────
function sanitize(str) {
  let s = str.trim();
  s = s.replace(/<[^>]*>/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  s = s.replace(/undefined|null|\[object Object\]/gi, '').trim();
  if (s.length > 170) s = s.slice(0, 167) + '...';
  return s || 'BRANIFY builds high-performance websites, web apps, brands and AI-powered digital solutions for businesses worldwide.';
}

function generateHtml(route) {
  const canonical = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  let html = SOURCE_HTML;
  const title = (route.title || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const desc = (route.description || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`);

  return html;
}

// ── Generate files ──────────────────────────────────────────────
let count = 0;
for (const route of routes) {
  if (route.path === '/') continue;

  const filePath = join(DIST_DIR, route.path, 'index.html');
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const html = generateHtml(route);
  writeFileSync(filePath, html);
  count++;
}

console.log(`✓ Prerendered ${count} route-specific HTML files with unique SEO metadata`);
console.log(`  Auto-discovered: ${toolCount} tools, ${portfolioCount} portfolio, ${productCount} products, ${blogCount} blog, ${serviceCount} services`);
console.log(`  Total: ${routes.length} routes (${staticRoutes.length} static + ${routes.length - staticRoutes.length} dynamic)`);
