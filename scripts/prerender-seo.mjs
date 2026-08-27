/**
 * Prerender SEO — generates route-specific HTML files with correct metadata.
 * Runs as a post-build step after `vite build`.
 *
 * Reads dist/index.html, replaces the title/description/canonical/OG/Twitter
 * tags for each known route, and writes dist/<route>/index.html.
 * Vercel serves these static files before the catch-all rewrite, so crawlers
 * see the correct metadata without executing JavaScript.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const SITE_URL = 'https://branify.store';
const DIST_DIR = 'dist';
const SOURCE_HTML = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

// ── Route metadata map ──────────────────────────────────────────
const routes = [
  // Homepage
  {
    path: '/',
    title: 'Custom Web Development & Digital Agency | BRANIFY',
    description: 'Professional web development, custom branding, AI automation, and digital products built to scale ambitious modern businesses worldwide.',
  },
  // Portfolio
  {
    path: '/portfolio',
    title: 'Website Design & Development Portfolio | BRANIFY',
    description: "Explore BRANIFY's website design, web development, branding and digital projects created for ambitious businesses.",
  },
  // Services
  {
    path: '/services',
    title: 'Digital Agency Services | Web, Branding, AI & SEO | BRANIFY',
    description: 'BRANIFY offers website development, WordPress, UI/UX design, branding, SEO, AI solutions, and business consultation services for ambitious brands.',
  },
  // Free Tools
  {
    path: '/tools',
    title: '100+ Free Online Tools | Browser Utilities | BRANIFY',
    description: 'Use free online browser tools for productivity, development, text, images and everyday tasks from BRANIFY.',
  },
  // AI Tools
  {
    path: '/ai-tools',
    title: 'AI Tools for Business & Productivity | BRANIFY',
    description: 'Discover useful AI tools for productivity, business, content, design and everyday workflows from BRANIFY.',
  },
  // Digital Products
  {
    path: '/digital-products',
    title: 'Premium Digital Products & Templates | BRANIFY',
    description: 'Browse premium digital products, templates, and resources for businesses, agencies, and creators from BRANIFY.',
  },
  // Pricing
  {
    path: '/pricing',
    title: 'Transparent Pricing & Packages | BRANIFY',
    description: 'View BRANIFY pricing and packages for web development, branding, AI solutions, and digital products. Clear, upfront, no hidden fees.',
  },
  // About
  {
    path: '/about',
    title: 'About BRANIFY | International Digital Agency',
    description: 'BRANIFY is an international full-stack digital agency providing custom web development, brand identity design, AI solutions, and digital products worldwide.',
  },
  // Contact
  {
    path: '/contact',
    title: 'Contact BRANIFY | Start Your Digital Project',
    description: 'Get in touch with BRANIFY to start your web development, branding, or AI project. Fast response, transparent quotes, global delivery.',
  },
  // Blog
  {
    path: '/blog',
    title: 'BRANIFY Blog | Digital Agency Insights & Guides',
    description: 'Read the latest insights, guides, and articles on web development, branding, AI, and digital growth from the BRANIFY team.',
  },
  // Free Templates
  {
    path: '/free-templates',
    title: 'Free Digital Templates | BRANIFY',
    description: 'Download free website, Canva, social media, business, resume, and Notion templates from BRANIFY. No signup required.',
  },
];

// ── Dynamic routes from data files ─────────────────────────────
const serviceSlugs = [
  'website-development', 'wordpress-development', 'landing-pages', 'ui-ux-design',
  'logo-design', 'brand-identity', 'social-media-design', 'business-presentation',
  'seo', 'ai-solutions', 'business-consultation',
];
for (const slug of serviceSlugs) {
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  routes.push({
    path: `/services/${slug}`,
    title: `${name} Services | BRANIFY`,
    description: `Professional ${name.toLowerCase()} services for businesses and brands. Fast, responsive and scalable solutions built by BRANIFY.`,
  });
}

const portfolioSlugs = [
  'playbeat', 'blockexchange', 'property-atlas', 'alaya-spa-wellness',
  'artline-gents-salon', 'maison-elixir-salon', 'taqdeer-by-jts',
  'meridian-marketplace', 'tatka-bazar', 'cinestream', 'la-cava-dxb', 'world-dollar-quest',
];
for (const slug of portfolioSlugs) {
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  routes.push({
    path: `/portfolio/${slug}`,
    title: `${name} — Case Study | BRANIFY`,
    description: `Explore the ${name} case study — a premium digital project designed and engineered by BRANIFY.`,
  });
}

const productSlugs = [
  'ai-prompts-masterkit', 'canva-agency-kit', 'notion-agency-os',
  'startup-pitch-deck-ppt', 'nextjs-saas-starter', 'excel-financial-model',
  'ai-writing-pro-pass', 'design-cloud-annual', 'cloud-storage-workspace',
];
for (const slug of productSlugs) {
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  routes.push({
    path: `/digital-products/${slug}`,
    title: `${name} | Digital Product | BRANIFY`,
    description: `${name} — a premium digital product available from BRANIFY. Boost your productivity and workflow.`,
  });
}

const blogSlugs = [
  '2026-brand-identity-trends', 'wordpress-vs-custom-react-2026', 'ai-automation-small-business-growth',
];
for (const slug of blogSlugs) {
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  routes.push({
    path: `/blog/${slug}`,
    title: `${name} | BRANIFY Blog`,
    description: `Read about ${name.toLowerCase()} and other digital agency insights on the BRANIFY blog.`,
  });
}

// ── HTML metadata replacement ──────────────────────────────────
function generateHtml(route) {
  const canonical = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  let html = SOURCE_HTML;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(route.description)}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(route.title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(route.description)}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(route.title)}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeHtml(route.description)}"`);

  return html;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Generate files ──────────────────────────────────────────────
let count = 0;
for (const route of routes) {
  if (route.path === '/') continue; // homepage already has correct metadata in index.html

  const filePath = join(DIST_DIR, route.path, 'index.html');
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const html = generateHtml(route);
  writeFileSync(filePath, html);
  count++;
}

console.log(`✓ Prerendered ${count} route-specific HTML files with unique SEO metadata`);
console.log(`  Routes: ${routes.filter(r => r.path !== '/').map(r => r.path).join(', ')}`);
