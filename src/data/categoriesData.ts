import { ServiceCategoryItem, ProductCategoryItem, AIToolItem } from '../types';

export const INITIAL_SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: 'cat-web',
    name: 'Website & Development',
    slug: 'web',
    shortDescription: 'Modern, high-performance web applications, bespoke business platforms, and e-commerce architectures.',
    description: 'Full-stack engineering leveraging modern frameworks like React, Next.js, and TypeScript paired with scalable backend services and responsive aesthetics.',
    icon: 'Code',
    featuredImage: '/portfolio/playbeat.png',
    seoTitle: 'Web Development Services | BRANIFY',
    seoDescription: 'Bespoke web application development, corporate websites, and eCommerce engineering by BRANIFY.',
    displayOrder: 1,
    published: true
  },
  {
    id: 'cat-branding',
    name: 'Design & Branding',
    slug: 'branding',
    shortDescription: 'Distinctive brand identities, logo suites, design systems, and brand strategy for industry leaders.',
    description: 'Complete visual identity architecture including vector logos, typography hierarchies, brand guidelines, and collateral design.',
    icon: 'Palette',
    featuredImage: '/portfolio/artline.png',
    seoTitle: 'Brand Identity & Design Studio | BRANIFY',
    seoDescription: 'Signature visual identities, logo suites, and typography guidelines engineered by BRANIFY.',
    displayOrder: 2,
    published: true
  },
  {
    id: 'cat-growth',
    name: 'Growth & Technology',
    slug: 'marketing',
    shortDescription: 'Conversion rate optimization, SEO infrastructure, analytics tracking, and digital scale strategies.',
    description: 'Data-driven growth systems, search engine architecture, and technical marketing infrastructure designed for compounding ROI.',
    icon: 'TrendingUp',
    featuredImage: '/portfolio/property-atlas.png',
    seoTitle: 'Digital Growth & Technology | BRANIFY',
    seoDescription: 'Scalable technical marketing, SEO architecture, and conversion optimization by BRANIFY.',
    displayOrder: 3,
    published: true
  },
  {
    id: 'cat-ai',
    name: 'AI Solutions & Automation',
    slug: 'ai',
    shortDescription: 'Custom AI agent integrations, workflow automation, and smart prompt toolkits for enterprise agility.',
    description: 'Modern AI interfaces, LLM orchestrations, automated business pipelines, and custom intelligence tools.',
    icon: 'Sparkles',
    featuredImage: '/portfolio/blockexchange.png',
    seoTitle: 'AI Solutions & Automation | BRANIFY',
    seoDescription: 'Bespoke AI integrations, smart assistant widgets, and custom intelligence workflows by BRANIFY.',
    displayOrder: 4,
    published: true
  },
  {
    id: 'cat-consulting',
    name: 'Strategic Advisory & Audits',
    slug: 'consulting',
    shortDescription: 'Deep architectural audits, UX heuristic reviews, and technology roadmaps for scaling startups.',
    description: 'One-on-one technical advisory, performance bottleneck identification, and actionable execution roadmaps.',
    icon: 'Layers',
    seoTitle: 'Strategic Technology Consulting | BRANIFY',
    seoDescription: 'Executive technology audits, UX reviews, and roadmap consultations by BRANIFY.',
    displayOrder: 5,
    published: true
  }
];

export const INITIAL_PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    id: 'pcat-canva',
    name: 'Canva Templates',
    slug: 'canva-templates',
    description: 'Designer-crafted, fully customizable Canva templates for social media, pitch decks, and brand collateral.',
    icon: 'Layout',
    displayOrder: 1,
    published: true
  },
  {
    id: 'pcat-spreadsheet',
    name: 'Spreadsheet Templates',
    slug: 'spreadsheet-templates',
    description: 'Executive financial models, project trackers, budget planners, and dynamic KPI dashboards for Excel & Google Sheets.',
    icon: 'Table',
    displayOrder: 2,
    published: true
  },
  {
    id: 'pcat-website',
    name: 'Website Templates',
    slug: 'website-templates',
    description: 'Production-ready React, Tailwind, and HTML responsive landing pages and component kits.',
    icon: 'Globe',
    displayOrder: 3,
    published: true
  },
  {
    id: 'pcat-notion',
    name: 'Notion Templates',
    slug: 'notion-templates',
    description: 'All-in-one Notion operating systems for freelancers, agencies, client portals, and productivity.',
    icon: 'FileText',
    displayOrder: 4,
    published: true
  },
  {
    id: 'pcat-ai',
    name: 'AI Resources & Prompts',
    slug: 'ai-resources',
    description: 'Curated prompt engineering packs, system prompt blueprints, and AI workflow cheat sheets.',
    icon: 'Sparkles',
    displayOrder: 5,
    published: true
  },
  {
    id: 'pcat-social',
    name: 'Social Media Templates',
    slug: 'social-media-templates',
    description: 'High-converting Instagram carousels, LinkedIn post packs, and Twitter header bundles.',
    icon: 'Share2',
    displayOrder: 6,
    published: true
  },
  {
    id: 'pcat-business',
    name: 'Business & Legal Kits',
    slug: 'business-templates',
    description: 'Commercial client contract agreements, proposal decks, invoice generators, and SOP templates.',
    icon: 'Briefcase',
    displayOrder: 7,
    published: true
  }
];

export const INITIAL_AI_TOOLS: AIToolItem[] = [
  {
    id: 'ai-1',
    name: 'Smart Brand Name Generator',
    slug: 'brand-name-generator',
    description: 'Generate high-impact, memorable brand and startup names with instant domain availability insights.',
    category: 'Branding & Naming',
    icon: 'Sparkles',
    routeUrl: '/ai-tools',
    features: ['Industry specific ideation', 'Phonetic resonance scoring', 'Domain slug verification'],
    featured: true,
    published: true,
    displayOrder: 1,
    seoTitle: 'AI Brand Name Generator | BRANIFY',
    seoDescription: 'Generate creative, memorable business and startup brand names instantly.'
  },
  {
    id: 'ai-2',
    name: 'SEO Meta Description Architect',
    slug: 'seo-meta-generator',
    description: 'Craft high-CTR, search-optimized meta titles and descriptions tailored to search intent.',
    category: 'SEO & Content',
    icon: 'FileText',
    routeUrl: '/ai-tools',
    features: ['Pixel-width estimation', 'Search intent alignment', 'Keyword density checks'],
    featured: true,
    published: true,
    displayOrder: 2,
    seoTitle: 'AI SEO Meta Generator | BRANIFY',
    seoDescription: 'Generate optimized meta titles and descriptions for improved search visibility.'
  },
  {
    id: 'ai-3',
    name: 'Social Post & Hook Generator',
    slug: 'social-hook-generator',
    description: 'Turn raw concepts into viral hooks, thread outlines, and engaging LinkedIn & X post frameworks.',
    category: 'Social Media',
    icon: 'Share2',
    routeUrl: '/ai-tools',
    features: ['10+ proven hook formats', 'Platform-specific tone tuning', 'Call to action optimization'],
    featured: true,
    published: true,
    displayOrder: 3,
    seoTitle: 'AI Social Hook Generator | BRANIFY',
    seoDescription: 'Generate viral hooks and engaging social media copy in seconds.'
  }
];
