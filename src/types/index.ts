export type Currency = 
  | 'USD' 
  | 'PKR' 
  | 'AED' 
  | 'EUR' 
  | 'GBP' 
  | 'SAR' 
  | 'INR' 
  | 'CAD' 
  | 'AUD' 
  | 'QAR' 
  | 'KWD' 
  | 'OMR' 
  | 'BHD' 
  | 'SGD' 
  | 'JPY' 
  | 'TRY' 
  | 'MYR' 
  | 'IDR' 
  | 'NGN' 
  | 'ZAR' 
  | 'BRL' 
  | 'MXN' 
  | 'CHF' 
  | 'SEK' 
  | 'NOK' 
  | 'DKK' 
  | 'NZD' 
  | 'BDT' 
  | 'EGP' 
  | 'PHP' 
  | 'CNY' 
  | 'HKD'
  | string;

export interface CurrencyRate {
  code: string;
  symbol: string;
  rate: number; // base USD = 1.0
  format: (amountUSD: number) => string;
}

export interface DetectedCountryInfo {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  city?: string;
  flag: string;
  ip?: string;
}

export type ServicePackageTier = 'basic' | 'professional' | 'premium' | 'on_demand';

export interface ServicePackage {
  id: string;
  name: string; // e.g. "Basic", "Professional", "Premium", "Client On-Demand"
  tier: ServicePackageTier;
  priceUSD: number; // Base USD price (starts at 0)
  deliveryTime: string;
  revisions: string;
  description: string;
  features: string[];
  highlight?: boolean; // e.g. true for "Most Popular" on Professional
  badge?: string; // e.g. "Most Popular", "Enterprise Ready", "Tailored"
  isActive?: boolean;
  sortOrder?: number;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  title?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  startingPriceUSD: number;
  deliveryTimeline: string;
  iconName: string;
  category: 'web' | 'branding' | 'design' | 'marketing' | 'ai' | 'consulting';
  packages: ServicePackage[];
  features: string[];
  benefits: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  deliverables: string[];
  techStack?: string[];
  active?: boolean;
  seoTitle?: string;
  metaDescription?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isSubscription?: boolean;
  subscriptionPlan?: string;
  provider?: string;
  deliveryMethod?: string;
  description: string;
  features: string[];
  downloadUrl?: string;
  previewUrl?: string;
  images: string[];
  tags: string[];
  terms?: string;
}

export type ToolCategory = 
  | 'PDF Tools' 
  | 'Image Tools' 
  | 'Text & Content Tools' 
  | 'Text Tools'
  | 'Developer Tools' 
  | 'SEO Tools' 
  | 'Business Tools' 
  | 'Finance Tools'
  | 'Marketing Tools' 
  | 'Security & Utility Tools'
  | 'Security / Utility Tools';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  featured?: boolean;
  popular?: boolean;
  inputType: 'text' | 'textarea' | 'image' | 'file' | 'multiline' | 'numbers' | 'json' | 'form' | 'none';
  outputType: 'text' | 'textarea' | 'image' | 'file' | 'json' | 'preview' | 'styled';
  placeholder?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export type PortfolioCategory =
  | 'All'
  | 'Web Development'
  | 'E-commerce'
  | 'Business Websites'
  | 'Real Estate'
  | 'Beauty & Wellness'
  | 'Entertainment'
  | 'Web3'
  | 'UI/UX'
  | 'Branding'
  | 'WordPress'
  | 'Marketing'
  | string;

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  category: PortfolioCategory;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  coverImage: string;
  galleryImages: string[];
  featured?: boolean;
  liveUrl?: string; // Admin-only / internal record keeping - NEVER rendered on public portfolio
  keyFeatures?: string[];
  desktopScreenshot?: string;
  mobileScreenshot?: string;
  servicesProvided?: string[];
  sortOrder?: number;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  isDemo?: boolean;
}

export interface BrandAssetSettings {
  logoUrl?: string; // Main brand logo (custom or default)
  logoLightUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
  mobileLogoUrl?: string;
  footerLogoUrl?: string;
}

export interface CompanyDetails {
  companyName: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  foundedYear: string;
  industry: string;
  primaryLocation: string;
  country: string;
  timezone: string;
  businessEmail: string;
  phone: string;
  whatsappNumber: string;
  websiteUrl: string;
}

export interface WhatsAppConfig {
  whatsappNumber: string; // E.g., "+1 581 907-2960" or "15819072960"
  displayName: string;
  defaultMessage: string;
  buttonEnabled: boolean;
  floatingButtonEnabled: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'github' | 'youtube' | 'tiktok' | 'pinterest' | 'custom';
  label: string;
  url: string;
  enabled: boolean;
}

export interface ContactInfoSettings {
  businessEmail: string;
  whatsappNumber: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  workingHours: string;
  googleMapsUrl: string;
  socials: SocialLinkItem[];
}

export interface ServiceCategoryItem {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  icon?: string;
  badge?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder?: number;
  sortOrder?: number;
  published?: boolean;
  isActive?: boolean;
}

export interface ProductCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  badge?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder?: number;
  sortOrder?: number;
  published?: boolean;
  isActive?: boolean;
}

export interface HomepageSectionVisibility {
  announcement: boolean;
  hero: boolean;
  trustStats: boolean;
  services: boolean;
  portfolio: boolean;
  pricing: boolean;
  digitalProducts: boolean;
  freeTemplates: boolean;
  freeTools: boolean;
  aiTools: boolean;
  testimonials: boolean;
  blog: boolean;
  ctaBanner: boolean;
  footerCta: boolean;
}

export interface HomepageContentSettings {
  announcementText: string;
  announcementCtaText: string;
  announcementLink: string;
  announcementActive: boolean;
  heroBadge: string;
  heroHeading: string;
  heroHighlightText: string;
  heroDescription: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustStats: { label: string; value: string; subtext?: string }[];
  sections: HomepageSectionVisibility;
}

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  defaultKeywords: string;
  defaultOgImage: string;
  faviconUrl: string;
  twitterHandle: string;
  twitterImage: string;
  googleSiteVerification?: string;
  robotsSettings?: string;
  pageMeta?: Record<string, { title: string; description: string; keywords?: string; ogImage?: string }>;
}

export interface MediaLibraryItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  category: 'Brand' | 'Services' | 'Products' | 'Portfolio' | 'Blog' | 'Homepage' | 'General' | string;
  altText?: string;
  uploadedAt: string;
  storagePath: string;
}

export interface AIToolItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  categorySlug?: string;
  tagline?: string;
  badge?: string;
  icon?: string;
  url?: string;
  routeUrl?: string;
  features?: string[];
  featured?: boolean;
  published?: boolean;
  isPublic?: boolean;
  status?: string;
  displayOrder?: number;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProjectRequestLead {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  referenceUrl?: string;
  status: 'New' | 'In Contact' | 'Proposal Sent' | 'Converted' | 'Closed';
  createdAt: string;
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  announcementText: string;
  announcementCtaText: string;
  announcementLink: string;
  announcementActive: boolean;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  location: string;
  businessHours: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    github: string;
    youtube?: string;
    tiktok?: string;
    pinterest?: string;
  };
  // Extended centralized configuration
  brandAssets?: BrandAssetSettings;
  companyDetails?: CompanyDetails;
  whatsappConfig?: WhatsAppConfig;
  contactInfo?: ContactInfoSettings;
  homepageContent?: HomepageContentSettings;
  seoSettings?: SEOSettings;
}

export interface CartItem {
  id: string;
  title: string;
  priceUSD: number;
  type: 'service' | 'product' | 'subscription';
  image?: string;
  details?: string;
  quantity: number;
}

export type FreeTemplateStatus = 'draft' | 'published' | 'coming_soon' | 'archived';

export interface FreeTemplateItem {
  id: string;
  slug: string;
  title: string;
  category: 
    | 'Website Templates'
    | 'Canva Templates'
    | 'Social Media Templates'
    | 'Business Templates'
    | 'Resume / CV Templates'
    | 'Presentation Templates'
    | 'Notion Templates'
    | 'Spreadsheet Templates';
  categorySlug: 
    | 'website'
    | 'canva'
    | 'social-media'
    | 'business'
    | 'resume'
    | 'presentation'
    | 'notion'
    | 'spreadsheet';
  shortDescription: string;
  fullDescription: string;
  fileFormat: string;
  fileSize: string;
  downloadUrl?: string;
  previewImage: string;
  galleryImages?: string[];
  features: string[];
  whatsIncluded?: string[];
  license: string;
  disclaimer?: string;
  isFree: boolean;
  status: FreeTemplateStatus;
  featured?: boolean;
  sortOrder: number;
  seoTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
}

