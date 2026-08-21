import { SiteSettings, Testimonial } from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: 'BRANIFY',
  tagline: 'BUILD. BRAND. GROW.',
  announcementText: 'Launch Offer — Quality Web Development, Design & Digital Solutions',
  announcementCtaText: 'Start a Project →',
  announcementLink: '/contact',
  announcementActive: true,
  contactEmail: 'admin@branify.store',
  contactPhone: '+1 (581) 907-2960',
  contactWhatsApp: '+1 581 907-2960',
  location: 'Serving Clients Worldwide — US, UK, UAE & Global',
  businessHours: 'Mon - Sat: 9:00 AM - 9:00 PM (EST / GMT / GST)',
  socials: {
    instagram: 'https://instagram.com/branify.store',
    linkedin: 'https://linkedin.com/company/branify',
    facebook: 'https://facebook.com/branify.store',
    twitter: 'https://x.com/branify_store',
    github: 'https://github.com/branify',
    youtube: 'https://youtube.com/@branify',
    tiktok: 'https://tiktok.com/@branify',
    pinterest: 'https://pinterest.com/branify'
  },
  brandAssets: {
    logoUrl: '/branify-logo.png',
    logoLightUrl: '/branify-logo.png',
    logoDarkUrl: '/branify-logo-dark.png',
    faviconUrl: '/branify-icon.png',
    ogImageUrl: '/branify-logo-dark.png',
    mobileLogoUrl: '/branify-icon.png',
    footerLogoUrl: '/branify-logo.png'
  },
  companyDetails: {
    companyName: 'BRANIFY',
    legalName: 'BRANIFY Digital Studio LLC',
    tagline: 'BUILD. BRAND. GROW.',
    shortDescription: 'Executive web engineering, bespoke branding, and digital growth accelerators for high-conviction brands worldwide.',
    fullDescription: 'BRANIFY is a premier full-stack design and web development agency crafting resilient digital experiences, enterprise web platforms, custom brand identities, and high-performance digital tools for global entrepreneurs.',
    foundedYear: '2024',
    industry: 'Web Development, Brand Identity & Digital Products',
    primaryLocation: 'Worldwide Remote (US, UK, UAE, Pakistan)',
    country: 'Global',
    timezone: 'UTC / EST / PKT / GST',
    businessEmail: 'admin@branify.store',
    phone: '+1 (581) 907-2960',
    whatsappNumber: '+1 581 907-2960',
    websiteUrl: 'https://branify.store'
  },
  whatsappConfig: {
    whatsappNumber: '+1 581 907-2960',
    displayName: 'BRANIFY Executive Team',
    defaultMessage: 'Hi BRANIFY, I am visiting your website and would like to discuss a project / custom quote.',
    buttonEnabled: true,
    floatingButtonEnabled: true
  },
  contactInfo: {
    businessEmail: 'admin@branify.store',
    whatsappNumber: '+1 581 907-2960',
    phoneNumber: '+1 (581) 907-2960',
    address: 'Executive Digital Hub',
    city: 'Global Delivery',
    country: 'United States & Worldwide',
    workingHours: 'Mon - Sat: 9:00 AM - 9:00 PM EST',
    googleMapsUrl: '',
    socials: [
      { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/branify.store', enabled: true },
      { id: 'soc-2', platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/branify', enabled: true },
      { id: 'soc-3', platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/branify.store', enabled: true },
      { id: 'soc-4', platform: 'twitter', label: 'X (Twitter)', url: 'https://x.com/branify_store', enabled: true },
      { id: 'soc-5', platform: 'github', label: 'GitHub', url: 'https://github.com/branify', enabled: true },
      { id: 'soc-6', platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@branify', enabled: false },
      { id: 'soc-7', platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@branify', enabled: false },
      { id: 'soc-8', platform: 'pinterest', label: 'Pinterest', url: 'https://pinterest.com/branify', enabled: false }
    ]
  },
  homepageContent: {
    announcementText: 'Launch Offer — Quality Web Development, Design & Digital Solutions',
    announcementCtaText: 'Start a Project →',
    announcementLink: '/contact',
    announcementActive: true,
    heroBadge: 'Premium Web Development & Brand Studio',
    heroHeading: 'We Build High-Impact Digital Experiences That',
    heroHighlightText: 'Scale Your Business.',
    heroDescription: 'From high-converting web applications and bespoke brand identities to production-ready digital toolkits — BRANIFY equips ambitious founders with the tech stack to win.',
    primaryCtaText: 'Explore Services & Pricing',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Book Free Consultation',
    secondaryCtaLink: '/contact',
    trustStats: [
      { label: 'Live Projects Delivered', value: '100+', subtext: 'Global Client Roster' },
      { label: 'Client Satisfaction', value: '99.4%', subtext: 'Verified 5-Star Reviews' },
      { label: 'Global Currency Support', value: '30+', subtext: 'Automatic Geo Detection' },
      { label: 'Turnaround Guarantee', value: '5-14 Days', subtext: 'Sprint Deliveries' }
    ],
    sections: {
      announcement: true,
      hero: true,
      trustStats: true,
      services: true,
      portfolio: true,
      pricing: true,
      digitalProducts: true,
      freeTemplates: true,
      freeTools: true,
      aiTools: true,
      testimonials: true,
      blog: true,
      ctaBanner: true,
      footerCta: true
    }
  },
  seoSettings: {
    siteTitle: 'BRANIFY — Web Development, Branding & Digital Growth Studio',
    siteDescription: 'Executive web engineering, tailored brand identities, and high-performance digital templates for ambitious businesses worldwide.',
    defaultKeywords: 'web development, brand identity, digital agency, UI/UX design, custom websites, digital products, templates',
    defaultOgImage: '/branify-logo-dark.png',
    faviconUrl: '/branify-icon.png',
    twitterHandle: '@branify_store',
    twitterImage: '/branify-logo-dark.png',
    googleSiteVerification: '',
    robotsSettings: 'index, follow'
  }
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Zaid K.',
    position: 'Founder',
    company: 'PlayBeat Digital',
    rating: 5,
    review: 'BRANIFY delivered an exceptional, responsive web experience for our digital audio platform. Fast turnaround, clean code architecture, and great communication throughout.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  },
  {
    id: 'test-2',
    name: 'Sarah M.',
    position: 'Director',
    company: 'Property Atlas',
    rating: 5,
    review: 'The luxury aesthetic and clean property discovery interface built by BRANIFY exceeded our expectations. The design is elegant, fast, and mobile-friendly.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  },
  {
    id: 'test-3',
    name: 'Elena R.',
    position: 'Wellness Coordinator',
    company: 'Alaya Spa & Wellness',
    rating: 5,
    review: 'Working with BRANIFY was a seamless experience. They captured our serene brand essence and created a smooth treatment inquiry flow that our clients love.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  }
];
