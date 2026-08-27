import { FreeTemplateItem } from '../types';
import { generateTemplatePreviewSvg } from '../utils/templatePreviewGenerator';

export const FREE_TEMPLATES_CATEGORIES = [
  { slug: 'all', name: 'All Templates', path: '/free-templates' },
  { slug: 'website', name: 'Website Templates', path: '/free-templates/website' },
  { slug: 'canva', name: 'Canva Templates', path: '/free-templates/canva' },
  { slug: 'social-media', name: 'Social Media Templates', path: '/free-templates/social-media' },
  { slug: 'business', name: 'Business Templates', path: '/free-templates/business' },
  { slug: 'resume', name: 'Resume & CV Templates', path: '/free-templates/resume' },
  { slug: 'presentation', name: 'Presentation Templates', path: '/free-templates/presentation' },
  { slug: 'notion', name: 'Notion Templates', path: '/free-templates/notion' },
  { slug: 'spreadsheet', name: 'Spreadsheet Templates', path: '/free-templates/spreadsheet' }
];

export const INITIAL_FREE_TEMPLATES: FreeTemplateItem[] = [
  // 1. Website Templates (Real Assets)
  {
    id: 'ft-modern-saas-landing',
    slug: 'modern-saas-landing-page',
    title: 'Modern SaaS Landing Page Starter',
    category: 'Website Templates',
    categorySlug: 'website',
    shortDescription: 'Clean, conversion-focused single page HTML5 & Tailwind CSS template for modern software tools.',
    fullDescription: 'A production-ready responsive landing page built with semantic HTML5, Tailwind CSS CDN, and high-contrast typography. Includes hero section with animated CTA, feature grids, pricing table toggle, testimonial cards, and an accessible FAQ accordion. Free to download and customize for personal and commercial projects.',
    fileFormat: 'HTML5 + Tailwind CSS',
    fileSize: '15.2 KB',
    isFree: true,
    featured: true,
    status: 'published',
    sortOrder: 1,
    downloadUrl: '/downloads/templates/modern-saas-landing-starter.html',
    license: 'MIT License — 100% Free for Commercial & Personal Use',
    previewImage: generateTemplatePreviewSvg('modern-saas-landing-page', 'Modern SaaS Landing Page Starter', 'Website Templates', 'HTML5'),
    features: [
      'Clean modular semantic HTML5 structure with zero build step needed',
      'Tailwind CSS styling with fully responsive breakpoints',
      'Hero section with high-contrast typography & interactive CTAs',
      'Feature grid architecture and KPI impact dashboard preview',
      'Transparent 3-tier pricing section with feature checklist',
      'Accessible interactive FAQ accordion and feedback testimonials'
    ],
    whatsIncluded: [
      '1x Complete standalone index.html file with CDN Tailwind CSS',
      'Full semantic section markup (Nav, Hero, Product, Features, Pricing, Testimonials, FAQ, Footer)',
      'Customization guide comments throughout the source code'
    ],
    tags: ['HTML5', 'Tailwind', 'SaaS', 'Landing Page', 'Website', 'Starter'],
    seoTitle: 'Modern SaaS Landing Page Starter Template — 100% Free Download | BRANIFY',
    metaDescription: 'Download this free, high-converting HTML5 & Tailwind CSS SaaS landing page template. Clean code, fully responsive, MIT licensed.',
    seoKeywords: 'free saas landing page, html5 template, tailwind css landing page, website starter, free web templates',
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-01T00:00:00.000Z'
  },
  {
    id: 'ft-creative-portfolio-starter',
    slug: 'creative-developer-portfolio',
    title: 'Creative Developer & Designer Portfolio',
    category: 'Website Templates',
    categorySlug: 'website',
    shortDescription: 'Minimalist dark-theme developer portfolio layout to showcase client case studies and tech stack.',
    fullDescription: 'Showcase your software engineering work, technical competencies, and client case studies with this dark-mode HTML5 & Tailwind portfolio template. Features interactive project repository cards, skills chips, career experience timeline, and a functional contact brief form structure.',
    fileFormat: 'HTML5 + Tailwind CSS',
    fileSize: '13.8 KB',
    isFree: true,
    featured: false,
    status: 'published',
    sortOrder: 2,
    downloadUrl: '/downloads/templates/developer-portfolio-starter.html',
    license: 'MIT License — 100% Free for Commercial & Personal Use',
    previewImage: generateTemplatePreviewSvg('creative-developer-portfolio', 'Creative Developer & Designer Portfolio', 'Website Templates', 'HTML5'),
    features: [
      'Developer-centric dark mode theme with JetBrains Mono typography',
      'Interactive hero code terminal with customizable JSON object',
      'Skills and technical competencies matrix across Frontend, Backend & DevOps',
      'Featured projects grid with live demo and repository links',
      'Work experience timeline and client consultation intake form'
    ],
    whatsIncluded: [
      '1x Complete standalone portfolio HTML5 file with Tailwind CSS CDN',
      'Modular section components ready for instant static hosting deployment',
      'Step-by-step customization instructions'
    ],
    tags: ['Portfolio', 'HTML5', 'Tailwind', 'Dark Mode', 'Developer', 'Engineer'],
    seoTitle: 'Developer Portfolio HTML5 Starter Template — Free Download | BRANIFY',
    metaDescription: 'Download a clean, modern developer & software engineer portfolio template in HTML5 and Tailwind CSS. 100% Free.',
    seoKeywords: 'developer portfolio template, html5 portfolio, software engineer resume site, free web template',
    createdAt: '2026-03-02T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-02T00:00:00.000Z'
  },

  // 2. Business Templates (Real Assets)
  {
    id: 'ft-master-services-agreement',
    slug: 'client-master-services-agreement',
    title: 'Client Master Services Agreement (MSA) & SOW',
    category: 'Business Templates',
    categorySlug: 'business',
    shortDescription: 'Standard legal services contract, statement of work, payment terms, and intellectual property agreement.',
    fullDescription: 'A comprehensive, structured Master Services Agreement (MSA) and Statement of Work (SOW) template for digital agencies, freelance developers, and consultants. Covers scope of work, milestone payments (50/25/25), revision caps, intellectual property assignment upon final payment, confidentiality non-disclosure, and liability protections.',
    fileFormat: 'Plain Text / Word Ready (.txt)',
    fileSize: '7.8 KB',
    isFree: true,
    featured: true,
    status: 'published',
    sortOrder: 3,
    downloadUrl: '/downloads/templates/client-master-services-agreement.txt',
    license: 'Free to use and adapt for personal and commercial business purposes',
    disclaimer: 'This template is provided for general informational and drafting purposes only and does not constitute legal advice. Consult a qualified legal professional for advice specific to your situation.',
    previewImage: generateTemplatePreviewSvg('client-master-services-agreement', 'Client Master Services Agreement', 'Business Templates', 'Legal Document'),
    features: [
      'Complete 13-clause legal framework covering Scope, Deliverables & SOW',
      'Milestone payment terms (50% upfront deposit, 25% midpoint, 25% handover)',
      'Clear intellectual property rights assignment upon invoice settlement',
      'Confidentiality, non-disclosure & revision change order clauses',
      'Prominent legal disclaimer and fill-in placeholders [YOUR AGENCY]'
    ],
    whatsIncluded: [
      '1x Master Services Agreement (.txt) ready to paste into DocuSign, Word, or Google Docs',
      'Statement of Work & Deliverables Schedule A breakdown',
      'Standard Signatures & Execution block'
    ],
    tags: ['Contract', 'Legal', 'Agency', 'Freelance', 'Agreement', 'MSA'],
    seoTitle: 'Client Master Services Agreement & SOW Template — Free Download | BRANIFY',
    metaDescription: 'Free Master Services Agreement (MSA) and Statement of Work template for digital agencies and freelancers.',
    seoKeywords: 'agency contract template, freelance master services agreement, sow template, free legal agreement',
    createdAt: '2026-03-03T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-03T00:00:00.000Z'
  },
  {
    id: 'ft-client-discovery-brief',
    slug: 'client-discovery-project-brief',
    title: 'Client Discovery Questionnaire & Project Brief',
    category: 'Business Templates',
    categorySlug: 'business',
    shortDescription: '20-question onboarding questionnaire to uncover project requirements and align scope.',
    fullDescription: 'Save hours in client meetings and eliminate scope creep before kick-off. This 20-question discovery template helps agencies and freelancers extract business objectives, target audience demographics, technical requirements, competitor benchmarks, and launch timeline expectations.',
    fileFormat: 'Plain Text Questionnaire (.txt)',
    fileSize: '5.6 KB',
    isFree: true,
    featured: false,
    status: 'published',
    sortOrder: 4,
    downloadUrl: '/downloads/templates/client-discovery-project-brief.txt',
    license: 'Free for agency, freelance, and client onboarding use',
    previewImage: generateTemplatePreviewSvg('client-discovery-project-brief', 'Client Discovery Questionnaire', 'Business Templates', 'Questionnaire'),
    features: [
      '20 strategic discovery questions organized across 7 core business pillars',
      'Business model, competitor positioning & value proposition audit',
      'Technical requirements checklist (CMS, Stripe, CRM, Analytics)',
      'Budget tier validation and stakeholder decision-maker mapping'
    ],
    whatsIncluded: [
      '1x Complete Client Discovery Brief (.txt) formatted for immediate client emailing or Notion intake'
    ],
    tags: ['Discovery', 'Brief', 'Onboarding', 'Agency', 'Project Management'],
    seoTitle: 'Client Discovery Questionnaire & Project Brief Template — Free | BRANIFY',
    metaDescription: 'Extract client goals, scope, and technical requirements with this 20-question discovery questionnaire template.',
    seoKeywords: 'client discovery questionnaire, project brief template, agency onboarding questionnaire, free template',
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-04T00:00:00.000Z'
  },

  // 3. Resume / CV Templates (Real Assets)
  {
    id: 'ft-ats-tech-resume',
    slug: 'ats-optimized-tech-resume',
    title: 'ATS-Optimized Tech Resume Template',
    category: 'Resume / CV Templates',
    categorySlug: 'resume',
    shortDescription: 'Clean, ATS-parser compliant single-column resume formatted for engineers, designers & tech PMs.',
    fullDescription: 'Engineered specifically to pass Applicant Tracking Systems (ATS) algorithms. Uses clean single-column structure, standard section headers, keyword optimization placeholders, and impact-driven action verb bullet formulas ([Action] + [Context] + [Measurable Outcome %]).',
    fileFormat: 'ATS Plain Text / Markdown (.txt)',
    fileSize: '4.8 KB',
    isFree: true,
    featured: true,
    status: 'published',
    sortOrder: 5,
    downloadUrl: '/downloads/templates/ats-optimized-tech-resume.txt',
    license: 'Free to use and modify for personal career development',
    previewImage: generateTemplatePreviewSvg('ats-optimized-tech-resume', 'ATS-Optimized Tech Resume', 'Resume / CV Templates', 'ATS Resume'),
    features: [
      'Single-column structure proven to score 95%+ on major ATS parsers (Workday, Greenhouse, Lever)',
      'Pre-formatted sections for Technical Skills, Work Experience, Projects, and Certifications',
      'Formula-based bullet points emphasizing quantifiable metrics and p95 performance gains',
      'Clearly labeled [PLACEHOLDERS] for effortless personal customization'
    ],
    whatsIncluded: [
      '1x ATS-compliant Plain Text / Markdown resume structure (.txt)',
      'ATS optimization tips and formatting guidelines'
    ],
    tags: ['Resume', 'CV', 'ATS', 'Tech Careers', 'Software Engineer', 'Developer'],
    seoTitle: 'ATS-Optimized Tech Resume Template — Free Download | BRANIFY',
    metaDescription: 'Download this free single-column ATS-friendly resume template for software engineers, designers, and tech professionals.',
    seoKeywords: 'ats resume template, tech resume template, software engineer cv, free resume download',
    createdAt: '2026-03-05T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-05T00:00:00.000Z'
  },

  // 4. Presentation Templates (Real Assets)
  {
    id: 'ft-startup-pitch-deck',
    slug: 'seed-startup-pitch-deck',
    title: 'Seed Startup Pitch Deck Structure & Blueprint',
    category: 'Presentation Templates',
    categorySlug: 'presentation',
    shortDescription: '15-slide investor pitch deck framework covering Problem, Solution, Market, Traction & The Ask.',
    fullDescription: 'The battle-tested 15-slide pitch deck structure utilized by venture-backed startups to raise Pre-Seed and Seed capital. For every slide, this guide details the exact Purpose, What to Include, Key Metrics to Highlight, and Common Mistakes to avoid before pitching angel investors and VC partners.',
    fileFormat: 'Investor Blueprint (.txt)',
    fileSize: '8.4 KB',
    isFree: true,
    featured: true,
    status: 'published',
    sortOrder: 6,
    downloadUrl: '/downloads/templates/seed-startup-pitch-deck-structure.txt',
    license: 'Free for startup fundraising and pitch deck creation',
    previewImage: generateTemplatePreviewSvg('seed-startup-pitch-deck', 'Seed Startup Pitch Deck Blueprint', 'Presentation Templates', 'Slide Deck Blueprint'),
    features: [
      'Complete 15-slide sequential story arc (Problem, Solution, TAM/SAM/SOM, Traction, Moat, GTM, Ask)',
      'Detailed slide-by-slide guidance with suggested financial & engagement metrics',
      'Analysis of common pitfalls that cause early investor rejections',
      'Fund allocation breakdown template (Engineering, Sales/GTM, Operations)'
    ],
    whatsIncluded: [
      '1x 15-Slide Seed Pitch Deck Master Blueprint (.txt) ready for PowerPoint, Keynote, or Canva'
    ],
    tags: ['Pitch Deck', 'Startup', 'Fundraising', 'Venture Capital', 'Seed Round', 'Presentation'],
    seoTitle: 'Seed Startup Pitch Deck Structure & Blueprint — Free Download | BRANIFY',
    metaDescription: '15-slide pitch deck framework for founders raising Seed & Pre-Seed capital. Free download from BRANIFY.',
    seoKeywords: 'startup pitch deck template, seed round pitch deck, investor presentation framework, free deck structure',
    createdAt: '2026-03-06T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-06T00:00:00.000Z'
  },

  // 5. Spreadsheet Templates (Real Assets)
  {
    id: 'ft-startup-runway-cashflow',
    slug: 'startup-runway-cashflow-model',
    title: 'Startup Runway & Cash Flow Financial Model',
    category: 'Spreadsheet Templates',
    categorySlug: 'spreadsheet',
    shortDescription: '12-month financial forecasting model with burn rate, payroll, MRR, and runway calculations.',
    fullDescription: 'A 12-month cash flow and runway projection spreadsheet model formatted in standard CSV. Seamlessly importable into Excel, Google Sheets, Apple Numbers, or Notion. Includes monthly beginning cash, recurring MRR, services revenue, granular operating expenses (payroll, marketing, software, cloud), net burn rate, and calculated runway months.',
    fileFormat: 'Comma-Separated Values (.csv)',
    fileSize: '1.4 KB',
    isFree: true,
    featured: true,
    status: 'published',
    sortOrder: 7,
    downloadUrl: '/downloads/templates/startup-runway-cashflow-model.csv',
    license: 'Free to use and adapt for personal and commercial financial modeling',
    previewImage: generateTemplatePreviewSvg('startup-runway-cashflow-model', 'Startup Runway & Cash Flow Model', 'Spreadsheet Templates', 'Financial Spreadsheet'),
    features: [
      '12-month structured cash flow tracking from starting cash to year-end run-rate',
      'Granular expense categorization: Payroll, Contractors, Ad Spend, SaaS, Cloud & Legal',
      'Net monthly burn rate and runway calculation logic',
      '100% compatible with Microsoft Excel, Google Sheets, and Numbers'
    ],
    whatsIncluded: [
      '1x 12-Month Startup Runway & Cash Flow Model (.csv) with sample benchmark data'
    ],
    tags: ['Spreadsheet', 'Cash Flow', 'Runway', 'Finance', 'Financial Model', 'CSV', 'Excel'],
    seoTitle: 'Startup Runway & Cash Flow Financial Model (CSV/Excel) — Free | BRANIFY',
    metaDescription: 'Calculate startup burn rate, cash flow, and runway with this 12-month financial model spreadsheet. Free CSV download.',
    seoKeywords: 'startup runway calculator, cash flow spreadsheet, burn rate model, free financial template csv',
    createdAt: '2026-03-07T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-07T00:00:00.000Z'
  },

  // 6. Social Media Templates (Real Assets)
  {
    id: 'ft-social-media-content-calendar',
    slug: 'social-media-content-calendar',
    title: 'Multi-Platform Social Media Content Calendar',
    category: 'Social Media Templates',
    categorySlug: 'social-media',
    shortDescription: 'Multi-channel editorial publishing matrix with content pillars, hooks, CTAs, and KPI tracking.',
    fullDescription: 'Organize your brand publishing strategy across LinkedIn, Twitter/X, Instagram, TikTok, and Newsletters. This multi-channel editorial matrix spreadsheet includes fields for publishing dates, target pillars, hooks/headlines, caption copy, call-to-action triggers, visual asset statuses, and engagement goals.',
    fileFormat: 'Content Matrix (.csv)',
    fileSize: '2.1 KB',
    isFree: true,
    featured: false,
    status: 'published',
    sortOrder: 8,
    downloadUrl: '/downloads/templates/social-media-content-calendar.csv',
    license: 'Free for personal and commercial marketing management',
    previewImage: generateTemplatePreviewSvg('social-media-content-calendar', 'Social Media Content Calendar', 'Social Media Templates', 'Content Matrix'),
    features: [
      'Cross-platform columns for LinkedIn, Twitter/X, Instagram, YouTube & Email newsletters',
      'Categorized by Content Pillar (Thought Leadership, Design, Case Study, Product)',
      'Dedicated columns for Hook, Full Caption Body, CTA, Asset File, and Status',
      'Target audience and engagement KPI benchmarking'
    ],
    whatsIncluded: [
      '1x Multi-Platform Social Media Content Calendar (.csv) with realistic pre-filled sample campaigns'
    ],
    tags: ['Social Media', 'Content Calendar', 'Marketing', 'LinkedIn', 'Instagram', 'CSV'],
    seoTitle: 'Multi-Platform Social Media Content Calendar (CSV) — Free Download | BRANIFY',
    metaDescription: 'Plan, schedule, and organize social media posts across LinkedIn, Twitter, and Instagram with this free content calendar matrix.',
    seoKeywords: 'social media calendar template, content calendar csv, marketing planner, free social media template',
    createdAt: '2026-03-08T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
    publishedAt: '2026-03-08T00:00:00.000Z'
  },

  // 7. Canva Templates (Coming Soon - Staging)
  {
    id: 'ft-agency-brand-guidelines-canva',
    slug: 'agency-brand-guidelines-canva',
    title: 'Agency Brand Guidelines Presentation Deck',
    category: 'Canva Templates',
    categorySlug: 'canva',
    shortDescription: '25-slide minimalist brand identity presentation kit. Logo rules, typography scales & color palettes.',
    fullDescription: 'A 25-slide Canva presentation template crafted for branding agencies and identity designers to present brand guidelines to enterprise clients. Includes slides for brand mission, typography hierarchy, primary and secondary color palettes, logo exclusion zones, photography art direction, and digital asset usage rules.',
    fileFormat: 'Canva Template Link',
    fileSize: 'Cloud Access',
    isFree: true,
    featured: false,
    status: 'coming_soon',
    sortOrder: 9,
    license: 'Free to edit in Canva for personal & commercial client deliverables',
    previewImage: generateTemplatePreviewSvg('agency-brand-guidelines-canva', 'Agency Brand Guidelines Deck', 'Canva Templates', 'Canva Presentation'),
    features: [
      '25 modern, minimalist brand guideline presentation slides',
      'Pre-formatted sections for Logo Usage, Color Science, Typography & Art Direction',
      'Fully editable with a 100% free Canva account (no Canva Pro required)',
      'Instant access link with easy 1-click duplicate into your Canva workspace'
    ],
    tags: ['Canva', 'Branding', 'Presentation', 'Brand Guidelines', 'Design'],
    seoTitle: 'Agency Brand Guidelines Canva Template — Coming Soon | BRANIFY',
    metaDescription: '25-slide minimalist brand identity presentation kit in Canva. Coming soon to BRANIFY Free Templates.',
    seoKeywords: 'canva brand guidelines template, branding presentation canva, free canva template',
    createdAt: '2026-03-09T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z'
  },

  // 8. Notion Templates (Coming Soon - Staging)
  {
    id: 'ft-freelance-client-portal-notion',
    slug: 'freelance-client-portal-notion',
    title: 'Freelance Client Portal & Project Hub',
    category: 'Notion Templates',
    categorySlug: 'notion',
    shortDescription: 'All-in-one client dashboard for asynchronous deliverables, invoices, assets & feedback.',
    fullDescription: 'A streamlined client portal dashboard built in Notion. Gives your clients a unified, transparent view of project milestones, asset deliverables, shared Google Drive folders, meeting notes, invoice statuses, and feedback revision logs.',
    fileFormat: 'Notion Workspace Duplicate',
    fileSize: 'Cloud Workspace',
    isFree: true,
    featured: false,
    status: 'coming_soon',
    sortOrder: 10,
    license: 'Free to duplicate and share with unlimited clients',
    previewImage: generateTemplatePreviewSvg('freelance-client-portal-notion', 'Freelance Client Portal Hub', 'Notion Templates', 'Notion Workspace'),
    features: [
      'Single shared dashboard for real-time project milestone tracking',
      'Asset delivery database with status chips (In Review, Approved, Needs Edits)',
      'Invoice payment log and shared meeting notes calendar',
      'Clean client-facing layout with customizable agency branding'
    ],
    tags: ['Notion', 'Client Portal', 'Freelance', 'Project Management', 'Workspace'],
    seoTitle: 'Freelance Client Portal Notion Template — Coming Soon | BRANIFY',
    metaDescription: 'All-in-one client dashboard in Notion for asynchronous project delivery and feedback. Coming soon to BRANIFY.',
    seoKeywords: 'notion client portal template, freelance notion workspace, project management template',
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z'
  }
];

// Backwards compatibility alias
export const FREE_TEMPLATES_DATA = INITIAL_FREE_TEMPLATES;
