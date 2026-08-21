import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Currency,
  CurrencyRate,
  DetectedCountryInfo,
  ServiceItem,
  ServicePackage,
  ProductItem,
  ToolItem,
  PortfolioItem,
  BlogPost,
  Testimonial,
  ProjectRequestLead,
  SiteSettings,
  CartItem,
  FreeTemplateItem,
  ServiceCategoryItem,
  ProductCategoryItem,
  AIToolItem,
  MediaLibraryItem
} from '../types';
import {
  CurrencyConfig,
  DetectedCountry,
  SUPPORTED_CURRENCIES,
  getExchangeRates,
  detectVisitorCountry,
  formatCurrencyPrice,
  convertCurrencyAmount
} from '../utils/currency';
import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_PRODUCTS } from '../data/productsData';
import { INITIAL_TOOLS } from '../data/toolsData';
import { INITIAL_PORTFOLIO } from '../data/portfolioData';
import { INITIAL_BLOGS } from '../data/blogData';
import { INITIAL_FREE_TEMPLATES } from '../data/freeTemplatesData';
import { INITIAL_SITE_SETTINGS, INITIAL_TESTIMONIALS } from '../data/initialState';
import { INITIAL_SERVICE_CATEGORIES, INITIAL_PRODUCT_CATEGORIES, INITIAL_AI_TOOLS } from '../data/categoriesData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Backward-compatible rates lookup
export const CURRENCY_RATES: Record<string, CurrencyRate> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amt) => `$${amt.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  },
  PKR: {
    code: 'PKR',
    symbol: 'PKR ',
    rate: 278.5,
    format: (amt) => `PKR ${(amt * 278.5).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rate: 3.67,
    format: (amt) => `AED ${(amt * 3.67).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  }
};

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface SupabaseOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  paymentMethod?: string;
  paymentId?: string;
  createdAt: string;
  items?: SupabaseOrderItem[];
}

export interface SupabaseOrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface AppContextType {
  // Currency & Location Detection
  currency: Currency;
  setCurrency: (c: Currency, isExplicitUserAction?: boolean) => void;
  detectedCountry: DetectedCountryInfo | null;
  isAutoDetected: boolean;
  isDetectingLocation: boolean;
  resetToAutoDetected: () => void;
  formatPrice: (amountUSD: number, options?: { showCode?: boolean }) => string;
  convertPrice: (amountUSD: number) => number;
  exchangeRates: Record<string, number>;
  supportedCurrencies: Record<string, CurrencyConfig>;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Announcement Bar
  announcementDismissed: boolean;
  setAnnouncementDismissed: (d: boolean) => void;

  // Data Collections (Admin Editable)
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => Promise<void> | void;

  services: ServiceItem[];
  serviceCategories: ServiceCategoryItem[];
  products: ProductItem[];
  productCategories: ProductCategoryItem[];
  tools: ToolItem[];
  aiTools: AIToolItem[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  leads: ProjectRequestLead[];
  newsletterSubscriptions: NewsletterSubscription[];
  orders: SupabaseOrder[];
  freeTemplates: FreeTemplateItem[];
  mediaLibrary: MediaLibraryItem[];

  // Admin CRUD
  addLead: (lead: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: ProjectRequestLead['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addNewsletterSubscription: (email: string) => Promise<boolean>;
  deleteNewsletterSubscription: (id: string) => Promise<void>;

  // Services & Categories CRUD
  addService: (service: ServiceItem) => Promise<void>;
  updateServicePackage: (serviceId: string, packageId: string, updates: Partial<ServicePackage>) => Promise<void>;
  updateService: (serviceId: string, updates: Partial<ServiceItem>) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  duplicateService: (serviceId: string) => Promise<void>;
  resetServicesToDefault: () => void;

  addServiceCategory: (cat: Omit<ServiceCategoryItem, 'id'>) => Promise<void>;
  updateServiceCategory: (id: string, updates: Partial<ServiceCategoryItem>) => Promise<void>;
  deleteServiceCategory: (id: string) => Promise<void>;

  // Products & Categories CRUD
  addProduct: (product: Omit<ProductItem, 'id' | 'rating' | 'reviewsCount'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<ProductItem>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => Promise<void>;

  addProductCategory: (cat: Omit<ProductCategoryItem, 'id'>) => Promise<void>;
  updateProductCategory: (id: string, updates: Partial<ProductCategoryItem>) => Promise<void>;
  deleteProductCategory: (id: string) => Promise<void>;

  // Free Templates CRUD
  addFreeTemplate: (template: Omit<FreeTemplateItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFreeTemplate: (id: string, template: Partial<FreeTemplateItem>) => Promise<void>;
  deleteFreeTemplate: (id: string) => Promise<void>;
  publishFreeTemplate: (id: string) => Promise<void>;
  unpublishFreeTemplate: (id: string) => Promise<void>;
  archiveFreeTemplate: (id: string) => Promise<void>;
  resetFreeTemplatesToDefault: () => void;

  // AI Tools CRUD
  addAITool: (tool: Omit<AIToolItem, 'id'>) => Promise<void>;
  updateAITool: (id: string, updates: Partial<AIToolItem>) => Promise<void>;
  deleteAITool: (id: string) => Promise<void>;

  // Media Library
  addMediaItem: (item: Omit<MediaLibraryItem, 'id' | 'uploadedAt'>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  uploadFileToStorage: (file: File, bucket?: string, folder?: string) => Promise<{ url: string; error?: string }>;

  // Blogs CRUD
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  duplicateBlogPost: (id: string) => Promise<void>;

  // Portfolio CRUD
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  duplicatePortfolioItem: (id: string) => Promise<void>;

  // Orders CRUD
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  isAdminChecking: boolean;
  adminLogin: (email: string, pwd: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // PWA Prompt
  pwaDeferredPrompt: any;
  setPwaDeferredPrompt: (prompt: any) => void;

  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Currency & Location State
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('branify_currency') as Currency) || 'USD';
  });

  const [detectedCountry, setDetectedCountry] = useState<DetectedCountryInfo | null>(() => {
    try {
      const cached = localStorage.getItem('branify_detected_country_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.data) return parsed.data;
      }
    } catch {}
    return null;
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    return localStorage.getItem('branify_currency_user_override') !== 'true';
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(() => {
    const fallbackRates: Record<string, number> = {};
    Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
      fallbackRates[code] = SUPPORTED_CURRENCIES[code].defaultRate;
    });
    return fallbackRates;
  });

  // Set currency with override tracking
  const setCurrency = useCallback((newCurrency: Currency, isExplicitUserAction: boolean = true) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('branify_currency', newCurrency);
    if (isExplicitUserAction) {
      localStorage.setItem('branify_currency_user_override', 'true');
      setIsAutoDetected(false);
    }
  }, []);

  const resetToAutoDetected = useCallback(() => {
    localStorage.removeItem('branify_currency_user_override');
    setIsAutoDetected(true);
    if (detectedCountry && detectedCountry.currencyCode) {
      setCurrencyState(detectedCountry.currencyCode);
      localStorage.setItem('branify_currency', detectedCountry.currencyCode);
    } else {
      setCurrencyState('USD');
      localStorage.setItem('branify_currency', 'USD');
    }
  }, [detectedCountry]);

  // Fetch exchange rates and perform automatic country detection on mount
  useEffect(() => {
    let isMounted = true;

    // 1. Fetch live exchange rates
    getExchangeRates().then((rates) => {
      if (isMounted && rates && Object.keys(rates).length > 0) {
        setExchangeRates(rates);
      }
    });

    // 2. Perform Automatic Country Detection
    const runGeoDetection = async () => {
      const hasUserOverride = localStorage.getItem('branify_currency_user_override') === 'true';
      setIsDetectingLocation(true);

      try {
        const detected = await detectVisitorCountry();
        if (isMounted && detected) {
          setDetectedCountry(detected);

          // If visitor has not manually overridden, auto-set their currency
          if (!hasUserOverride && detected.currencyCode) {
            setCurrencyState(detected.currencyCode);
            localStorage.setItem('branify_currency', detected.currencyCode);
            setIsAutoDetected(true);
          }
        }
      } catch (err) {
        console.error('Geo detection error:', err);
      } finally {
        if (isMounted) {
          setIsDetectingLocation(false);
        }
      }
    };

    runGeoDetection();

    return () => {
      isMounted = false;
    };
  }, []);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('branify_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('branify_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('branify_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('branify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Announcement Bar
  const [announcementDismissed, setAnnouncementDismissed] = useState(() => {
    return localStorage.getItem('branify_announcement_dismissed') === 'true';
  });

  // Site Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('branify_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize any legacy emails
        if (parsed.contactEmail === 'branify7@gmail.com') {
          parsed.contactEmail = 'admin@branify.store';
        }
        if (parsed.companyDetails?.businessEmail === 'branify7@gmail.com') {
          parsed.companyDetails.businessEmail = 'admin@branify.store';
        }
        if (parsed.contactInfo?.businessEmail === 'branify7@gmail.com') {
          parsed.contactInfo.businessEmail = 'admin@branify.store';
        }
        return {
          ...INITIAL_SITE_SETTINGS,
          ...parsed,
          contactEmail: parsed.contactEmail || 'admin@branify.store',
          brandAssets: { ...INITIAL_SITE_SETTINGS.brandAssets, ...parsed.brandAssets },
          companyDetails: { ...INITIAL_SITE_SETTINGS.companyDetails, ...parsed.companyDetails, businessEmail: 'admin@branify.store' },
          whatsappConfig: { ...INITIAL_SITE_SETTINGS.whatsappConfig, ...parsed.whatsappConfig },
          contactInfo: { ...INITIAL_SITE_SETTINGS.contactInfo, ...parsed.contactInfo, businessEmail: 'admin@branify.store' },
          homepageContent: { ...INITIAL_SITE_SETTINGS.homepageContent, ...parsed.homepageContent },
          seoSettings: { ...INITIAL_SITE_SETTINGS.seoSettings, ...parsed.seoSettings }
        };
      }
    } catch {}
    return INITIAL_SITE_SETTINGS;
  });

  const updateSettings = async (updated: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const newSettings: SiteSettings = {
        ...prev,
        ...updated,
        brandAssets: updated.brandAssets ? { ...prev.brandAssets, ...updated.brandAssets } : prev.brandAssets,
        companyDetails: updated.companyDetails ? { ...prev.companyDetails, ...updated.companyDetails } : prev.companyDetails,
        whatsappConfig: updated.whatsappConfig ? { ...prev.whatsappConfig, ...updated.whatsappConfig } : prev.whatsappConfig,
        contactInfo: updated.contactInfo ? { ...prev.contactInfo, ...updated.contactInfo } : prev.contactInfo,
        homepageContent: updated.homepageContent ? { ...prev.homepageContent, ...updated.homepageContent } : prev.homepageContent,
        seoSettings: updated.seoSettings ? { ...prev.seoSettings, ...updated.seoSettings } : prev.seoSettings
      };
      localStorage.setItem('branify_settings', JSON.stringify(newSettings));
      return newSettings;
    });

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('site_settings').upsert({
          id: 'default',
          site_name: updated.siteName || settings.siteName,
          tagline: updated.tagline || settings.tagline,
          announcement_text: updated.announcementText ?? settings.announcementText,
          announcement_cta_text: updated.announcementCtaText ?? settings.announcementCtaText,
          announcement_link: updated.announcementLink ?? settings.announcementLink,
          announcement_active: updated.announcementActive ?? settings.announcementActive,
          contact_email: updated.contactEmail || settings.contactEmail,
          contact_phone: updated.contactPhone || settings.contactPhone,
          contact_whatsapp: updated.contactWhatsApp || settings.contactWhatsApp,
          location: updated.location || settings.location,
          business_hours: updated.businessHours || settings.businessHours,
          socials: updated.socials || settings.socials,
          brand_assets: updated.brandAssets || settings.brandAssets,
          company_details: updated.companyDetails || settings.companyDetails,
          whatsapp_config: updated.whatsappConfig || settings.whatsappConfig,
          contact_info: updated.contactInfo || settings.contactInfo,
          homepage_content: updated.homepageContent || settings.homepageContent,
          seo_settings: updated.seoSettings || settings.seoSettings,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Supabase site_settings upsert error:', e);
      }
    }
    addToast('Site settings updated successfully!', 'success');
  };

  // Service Categories State
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_service_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SERVICE_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_service_categories', JSON.stringify(serviceCategories));
    } catch {}
  }, [serviceCategories]);

  // Product Categories State
  const [productCategories, setProductCategories] = useState<ProductCategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_product_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_PRODUCT_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_product_categories', JSON.stringify(productCategories));
    } catch {}
  }, [productCategories]);

  // AI Tools State
  const [aiTools, setAiTools] = useState<AIToolItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_ai_tools');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_AI_TOOLS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_ai_tools', JSON.stringify(aiTools));
    } catch {}
  }, [aiTools]);

  // Media Library State
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_media_library');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 'med-1',
        fileName: 'branify-logo.png',
        fileUrl: '/branify-logo.png',
        fileType: 'image/png',
        fileSize: '48 KB',
        category: 'Brand',
        uploadedAt: new Date().toISOString(),
        storagePath: 'brand/branify-logo.png'
      },
      {
        id: 'med-2',
        fileName: 'branify-logo-dark.png',
        fileUrl: '/branify-logo-dark.png',
        fileType: 'image/png',
        fileSize: '52 KB',
        category: 'Brand',
        uploadedAt: new Date().toISOString(),
        storagePath: 'brand/branify-logo-dark.png'
      },
      {
        id: 'med-3',
        fileName: 'playbeat-full.png',
        fileUrl: '/portfolio/playbeat.png',
        fileType: 'image/png',
        fileSize: '380 KB',
        category: 'Portfolio',
        uploadedAt: new Date().toISOString(),
        storagePath: 'portfolio/playbeat.png'
      },
      {
        id: 'med-4',
        fileName: 'artline-full.png',
        fileUrl: '/portfolio/artline.png',
        fileType: 'image/png',
        fileSize: '340 KB',
        category: 'Portfolio',
        uploadedAt: new Date().toISOString(),
        storagePath: 'portfolio/artline.png'
      },
      {
        id: 'med-5',
        fileName: 'property-atlas.png',
        fileUrl: '/portfolio/property-atlas.png',
        fileType: 'image/png',
        fileSize: '410 KB',
        category: 'Portfolio',
        uploadedAt: new Date().toISOString(),
        storagePath: 'portfolio/property-atlas.png'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_media_library', JSON.stringify(mediaLibrary));
    } catch {}
  }, [mediaLibrary]);

  // Services State (Persisted in LocalStorage & synchronized)
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_services_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return INITIAL_SERVICES.map((initial) => {
            const found = parsed.find((p: any) => p.id === initial.id || p.slug === initial.slug);
            if (found) {
              return {
                ...initial,
                ...found,
                packages: initial.packages.map((initPkg) => {
                  const foundPkg = (found.packages || []).find((p: any) => p.id === initPkg.id || p.tier === initPkg.tier);
                  return foundPkg ? { ...initPkg, ...foundPkg } : initPkg;
                })
              };
            }
            return initial;
          });
        }
      }
    } catch (e) {
      console.error('Error loading services from local storage:', e);
    }
    return INITIAL_SERVICES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_services_v2', JSON.stringify(services));
    } catch (e) {
      console.error('Error saving services to local storage:', e);
    }
  }, [services]);

  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [tools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);

  // Free Templates State (Persisted in LocalStorage & synchronized)
  const [freeTemplates, setFreeTemplates] = useState<FreeTemplateItem[]>(() => {
    try {
      const saved = localStorage.getItem('branify_free_templates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading free templates from local storage:', e);
    }
    return INITIAL_FREE_TEMPLATES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('branify_free_templates', JSON.stringify(freeTemplates));
    } catch (e) {
      console.error('Error saving free templates to local storage:', e);
    }
  }, [freeTemplates]);

  // Leads
  const [leads, setLeads] = useState<ProjectRequestLead[]>(() => {
    const saved = localStorage.getItem('branify_leads');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'lead-1',
            name: 'Alexander Wright',
            email: 'alex@apexglobal.co.uk',
            company: 'Apex Global Tech',
            country: 'United Kingdom',
            service: 'Website Development',
            budget: '$1,000 - $3,000',
            timeline: '2-3 Weeks',
            description: 'Redesign of our SaaS platform homepage with AI chatbot widget.',
            status: 'Proposal Sent',
            createdAt: new Date().toISOString()
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('branify_leads', JSON.stringify(leads));
  }, [leads]);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminChecking, setIsAdminChecking] = useState(true);

  // Function to fetch data from Supabase if configured
  const refreshData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      // 1. Fetch Products
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!prodErr && dbProducts && dbProducts.length > 0) {
        const mappedProducts: ProductItem[] = dbProducts.map((p: any) => ({
          id: p.id,
          slug: p.slug || p.id,
          title: p.title,
          category: p.category,
          priceUSD: Number(p.price) || 0,
          originalPriceUSD: p.sale_price ? Number(p.sale_price) : undefined,
          rating: 5,
          reviewsCount: 12,
          featured: p.is_featured ?? false,
          description: p.description || '',
          features: p.download_info?.features || [],
          images: p.image ? [p.image] : [],
          tags: p.download_info?.tags || [p.category],
          downloadUrl: p.download_info?.file_url
        }));
        setProducts(mappedProducts);
      }

      // 2. Fetch Blog Posts
      const { data: dbBlogs, error: blogErr } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!blogErr && dbBlogs && dbBlogs.length > 0) {
        const mappedBlogs: BlogPost[] = dbBlogs.map((b: any) => ({
          id: b.id,
          slug: b.slug || b.id,
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          category: b.category,
          author: {
            name: b.author || 'BRANIFY Editorial',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            role: 'Tech Strategist'
          },
          publishedAt: b.date || b.created_at,
          readTime: b.read_time || '5 min read',
          coverImage: b.image,
          tags: b.tags || [],
          featured: b.is_published
        }));
        setBlogs(mappedBlogs);
      }

      // 3. Fetch Portfolio
      const { data: dbPort, error: portErr } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!portErr && dbPort && dbPort.length > 0) {
        const mappedPortfolio: PortfolioItem[] = dbPort.map((pt: any) => ({
          id: pt.id,
          slug: pt.slug || pt.id,
          title: pt.title,
          client: pt.client || 'Private Client',
          industry: pt.category || 'Technology',
          year: '2026',
          category: (pt.category as any) || 'Web Development',
          challenge: pt.challenge || pt.description || '',
          solution: pt.solution || '',
          results: pt.results ? (Array.isArray(pt.results) ? pt.results : [pt.results]) : [],
          technologies: pt.tags || [],
          coverImage: pt.image,
          galleryImages: [pt.image],
          liveUrl: pt.live_url || pt.website_url || pt.liveUrl || '',
          keyFeatures: pt.key_features || pt.keyFeatures || [],
          featured: true
        }));
        setPortfolio(mappedPortfolio);
      }

      // Fetch Free Templates from Supabase
      const { data: dbFreeTemplates } = await supabase
        .from('free_templates')
        .select('*')
        .order('sort_order', { ascending: true });

      if (dbFreeTemplates && dbFreeTemplates.length > 0) {
        const mappedFreeTemplates: FreeTemplateItem[] = dbFreeTemplates.map((t: any) => ({
          id: t.id,
          slug: t.slug,
          title: t.title,
          category: t.category,
          categorySlug: t.category_slug,
          shortDescription: t.short_description || '',
          fullDescription: t.full_description || '',
          fileFormat: t.file_format || t.format || 'Document',
          fileSize: t.file_size || '0 KB',
          downloadUrl: t.download_url || t.download_path,
          previewImage: t.preview_image,
          galleryImages: t.gallery_images || [],
          features: t.features || [],
          whatsIncluded: t.whats_included || [],
          license: t.license || 'Free for Commercial & Personal Use',
          disclaimer: t.disclaimer,
          isFree: true,
          status: t.status || 'draft',
          featured: !!t.featured,
          sortOrder: t.sort_order || 1,
          seoTitle: t.seo_title,
          metaDescription: t.meta_description,
          seoKeywords: t.seo_keywords,
          canonicalUrl: t.canonical_url,
          ogTitle: t.og_title,
          ogDescription: t.og_description,
          ogImage: t.og_image,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
          publishedAt: t.published_at,
          tags: t.tags || []
        }));
        setFreeTemplates(mappedFreeTemplates);
      }

      // 4. Fetch Site Settings from Supabase
      const { data: dbSettings } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (dbSettings) {
        setSettings((prev) => ({
          ...prev,
          siteName: dbSettings.site_name || prev.siteName,
          tagline: dbSettings.tagline || prev.tagline,
          announcementText: dbSettings.announcement_text ?? prev.announcementText,
          announcementCtaText: dbSettings.announcement_cta_text ?? prev.announcementCtaText,
          announcementLink: dbSettings.announcement_link ?? prev.announcementLink,
          announcementActive: dbSettings.announcement_active ?? prev.announcementActive,
          contactEmail: dbSettings.contact_email || prev.contactEmail,
          contactPhone: dbSettings.contact_phone || prev.contactPhone,
          contactWhatsApp: dbSettings.contact_whatsapp || prev.contactWhatsApp,
          location: dbSettings.location || prev.location,
          businessHours: dbSettings.business_hours || prev.businessHours,
          socials: dbSettings.socials || prev.socials,
          brandAssets: dbSettings.brand_assets ? { ...prev.brandAssets, ...dbSettings.brand_assets } : prev.brandAssets,
          companyDetails: dbSettings.company_details ? { ...prev.companyDetails, ...dbSettings.company_details } : prev.companyDetails,
          whatsappConfig: dbSettings.whatsapp_config ? { ...prev.whatsappConfig, ...dbSettings.whatsapp_config } : prev.whatsappConfig,
          contactInfo: dbSettings.contact_info ? { ...prev.contactInfo, ...dbSettings.contact_info } : prev.contactInfo,
          homepageContent: dbSettings.homepage_content ? { ...prev.homepageContent, ...dbSettings.homepage_content } : prev.homepageContent,
          seoSettings: dbSettings.seo_settings ? { ...prev.seoSettings, ...dbSettings.seo_settings } : prev.seoSettings
        }));
      }

      // 5. Fetch Service Categories
      const { data: dbServiceCats } = await supabase
        .from('service_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (dbServiceCats && dbServiceCats.length > 0) {
        setServiceCategories(dbServiceCats.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon,
          badge: c.badge,
          sortOrder: c.sort_order,
          isActive: c.is_active
        })));
      }

      // 6. Fetch Product Categories
      const { data: dbProdCats } = await supabase
        .from('product_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (dbProdCats && dbProdCats.length > 0) {
        setProductCategories(dbProdCats.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon,
          badge: c.badge,
          sortOrder: c.sort_order,
          isActive: c.is_active
        })));
      }

      // 7. Fetch AI Tools
      const { data: dbAiTools } = await supabase
        .from('ai_tools')
        .select('*')
        .order('sort_order', { ascending: true });

      if (dbAiTools && dbAiTools.length > 0) {
        setAiTools(dbAiTools.map((t: any) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          category: t.category,
          categorySlug: t.category_slug,
          badge: t.badge,
          tagline: t.tagline,
          description: t.description,
          icon: t.icon,
          url: t.url,
          status: t.status,
          sortOrder: t.sort_order,
          featured: t.featured,
          isPublic: t.is_public
        })));
      }

      // 8. Fetch Media Library
      const { data: dbMedia } = await supabase
        .from('media_library')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (dbMedia && dbMedia.length > 0) {
        setMediaLibrary(dbMedia.map((m: any) => ({
          id: m.id,
          fileName: m.file_name,
          fileUrl: m.file_url,
          fileType: m.file_type,
          fileSize: m.file_size,
          category: m.category,
          uploadedAt: m.uploaded_at,
          altText: m.alt_text,
          storagePath: m.storage_path
        })));
      }

      // If Admin is logged in, fetch admin-protected tables
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch Contact Submissions
        const { data: dbLeads } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbLeads) {
          const mappedLeads: ProjectRequestLead[] = dbLeads.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            company: '',
            country: 'Global',
            service: c.subject || 'General Inquiry',
            budget: 'N/A',
            timeline: 'N/A',
            description: c.message,
            status: (c.status as any) || 'New',
            createdAt: c.created_at
          }));
          setLeads(mappedLeads);
        }

        // Fetch Newsletter Subscriptions
        const { data: dbNews } = await supabase
          .from('newsletter_subscriptions')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbNews) {
          setNewsletterSubscriptions(dbNews.map((n: any) => ({
            id: n.id,
            email: n.email,
            status: n.status,
            createdAt: n.created_at
          })));
        }

        // Fetch Orders
        const { data: dbOrders } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (dbOrders) {
          setOrders(dbOrders.map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            totalAmount: Number(o.total_amount),
            status: o.status,
            paymentMethod: o.payment_method,
            paymentId: o.payment_id,
            createdAt: o.created_at,
            items: (o.order_items || []).map((oi: any) => ({
              id: oi.id,
              orderId: oi.order_id,
              productId: oi.product_id,
              productTitle: oi.product_title,
              quantity: oi.quantity,
              unitPrice: Number(oi.unit_price),
              totalPrice: Number(oi.total_price)
            }))
          })));
        }
      }
    } catch (err) {
      console.error('Error fetching Supabase data:', err);
    }
  }, []);

  // Check admin auth state on mount and subscribe to session changes
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsAdminChecking(false);
      return;
    }

    const checkAdminSession = async (session: any) => {
      if (!session?.user) {
        setIsAdminLoggedIn(false);
        setIsAdminChecking(false);
        return;
      }

      try {
        const isOwner = session.user.email === 'admin@branify.store' || session.user.email === 'branify7@gmail.com';
        if (isOwner) {
          setIsAdminLoggedIn(true);
          return;
        }

        const { data: adminRow, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        if (adminRow && !error) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
          await supabase.auth.signOut();
        }
      } catch (err) {
        setIsAdminLoggedIn(false);
      } finally {
        setIsAdminChecking(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData, isAdminLoggedIn]);

  // Admin Auth Methods
  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured() || !supabase) {
      const error = 'Supabase client is not configured.';
      addToast(error, 'error');
      return { success: false, error };
    }

    try {
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authErr || !authData.user) {
        const error = authErr?.message || 'Invalid email or password credentials.';
        addToast(error, 'error');
        return { success: false, error };
      }

      // Primary owner email check or admin_users check
      const isOwnerEmail = authData.user.email === 'admin@branify.store' || authData.user.email === 'branify7@gmail.com';
      
      let isAllowedAdmin = isOwnerEmail;

      if (!isAllowedAdmin) {
        // Check if logged in user's ID exists in admin_users table
        const { data: adminRow, error: adminErr } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', authData.user.id)
          .maybeSingle();

        if (adminRow && !adminErr) {
          isAllowedAdmin = true;
        }
      }

      // If user is owner email, also try to ensure admin_users row exists in background
      if (isOwnerEmail) {
        Promise.resolve(
          supabase.from('admin_users').upsert({
            id: authData.user.id,
            email: authData.user.email,
            role: 'owner'
          })
        ).catch(() => {});
      }

      if (!isAllowedAdmin) {
        await supabase.auth.signOut();
        setIsAdminLoggedIn(false);
        const error = 'Unauthorized access: Account is not listed in admin_users.';
        addToast(error, 'error');
        return { success: false, error };
      }

      setIsAdminLoggedIn(true);
      addToast('Welcome back, Admin! Session authenticated.', 'success');
      await refreshData();
      return { success: true };
    } catch (err: any) {
      const error = err?.message || 'An error occurred during authentication.';
      addToast(error, 'error');
      return { success: false, error };
    }
  };

  const adminLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAdminLoggedIn(false);
    addToast('Logged out of admin dashboard.', 'info');
  };

  // Public/Admin CRUD Functions

  // Leads / Contact Submissions
  const addLead = async (leadData: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ProjectRequestLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').insert([
          {
            name: leadData.name,
            email: leadData.email,
            subject: leadData.service || 'Project Inquiry',
            message: `Company: ${leadData.company || 'N/A'}\nCountry: ${leadData.country || 'N/A'}\nBudget: ${leadData.budget || 'N/A'}\nTimeline: ${leadData.timeline || 'N/A'}\n\n${leadData.description}`,
            status: 'new'
          }
        ]);
      } catch (err) {
        console.error('Error inserting contact submission to Supabase:', err);
      }
    }

    addToast('Project request submitted successfully! Our strategy team will contact you within 24 hours.', 'success');
  };

  const updateLeadStatus = async (id: string, status: ProjectRequestLead['status'], notes?: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l))
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Error updating contact submission in Supabase:', err);
      }
    }

    addToast(`Lead status updated to "${status}"`, 'info');
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting contact submission from Supabase:', err);
      }
    }
    addToast('Lead deleted.', 'info');
  };

  // Newsletter Subscriptions
  const addNewsletterSubscription = async (email: string): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('newsletter_subscriptions').insert([
          { email, status: 'subscribed' }
        ]);
        if (error) {
          if (error.code === '23505') {
            addToast('You are already subscribed to BRANIFY Insider!', 'info');
            return true;
          }
          console.error('Supabase newsletter insert error:', error);
        }
      } catch (err) {
        console.error('Newsletter error:', err);
      }
    }
    setNewsletterSubscriptions((prev) => [
      { id: `news-${Date.now()}`, email, status: 'subscribed', createdAt: new Date().toISOString() },
      ...prev
    ]);
    addToast('Thank you for subscribing to BRANIFY Insider!', 'success');
    return true;
  };

  const deleteNewsletterSubscription = async (id: string) => {
    setNewsletterSubscriptions((prev) => prev.filter((n) => n.id !== id));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('newsletter_subscriptions').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting newsletter subscriber from Supabase:', err);
      }
    }
    addToast('Subscriber removed.', 'info');
  };

  // Products CRUD
  const addProduct = async (productData: Omit<ProductItem, 'id' | 'rating' | 'reviewsCount'>) => {
    const slug = productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('products').insert([
          {
            title: productData.title,
            slug,
            description: productData.description,
            category: productData.category,
            image: productData.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
            price: productData.priceUSD,
            sale_price: productData.originalPriceUSD || null,
            product_type: 'digital',
            download_info: {
              features: productData.features,
              tags: productData.tags,
              file_url: productData.downloadUrl
            },
            is_featured: productData.featured || false,
            is_active: true
          }
        ]);
        if (error) {
          addToast(`Failed to add product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding product:', err);
      }
    }

    await refreshData();
    addToast(`Product "${productData.title}" created successfully!`, 'success');
  };

  const updateProduct = async (id: string, updates: Partial<ProductItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.description) dbUpdates.description = updates.description;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.priceUSD !== undefined) dbUpdates.price = updates.priceUSD;
        if (updates.originalPriceUSD !== undefined) dbUpdates.sale_price = updates.originalPriceUSD;
        if (updates.featured !== undefined) dbUpdates.is_featured = updates.featured;
        if (updates.images && updates.images.length > 0) dbUpdates.image = updates.images[0];

        const { error } = await supabase.from('products').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating product:', err);
      }
    }

    await refreshData();
    addToast('Product updated successfully!', 'success');
  };

  const deleteProduct = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product deleted.', 'info');
  };

  // Services & Packages CRUD
  const addService = async (serviceData: ServiceItem) => {
    setServices((prev) => [serviceData, ...prev]);
    addToast(`Service "${serviceData.title}" created successfully!`, 'success');
  };

  const deleteService = async (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId && s.slug !== serviceId));
    addToast('Service removed.', 'info');
  };

  const duplicateService = async (serviceId: string) => {
    const s = services.find((srv) => srv.id === serviceId || srv.slug === serviceId);
    if (!s) return;
    const duplicated: ServiceItem = {
      ...s,
      id: `srv-${Date.now()}`,
      slug: `${s.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${s.title} (Copy)`
    };
    setServices((prev) => [duplicated, ...prev]);
    addToast(`Duplicated "${s.title}"`, 'success');
  };

  const updateServicePackage = async (
    serviceId: string,
    packageId: string,
    updates: Partial<ServicePackage>
  ) => {
    setServices((prevServices) => {
      const updated = prevServices.map((srv) => {
        if (srv.id !== serviceId && srv.slug !== serviceId) return srv;
        const updatedPackages = srv.packages.map((pkg) => {
          if (pkg.id !== packageId && pkg.tier !== updates.tier) return pkg;
          return { ...pkg, ...updates };
        });

        // Recalculate starting price as the minimum non-zero price
        const nonZeroPrices = updatedPackages.map((p) => p.priceUSD).filter((p) => p > 0);
        const newMinPrice = nonZeroPrices.length > 0 ? Math.min(...nonZeroPrices) : 0;

        return {
          ...srv,
          startingPriceUSD: newMinPrice,
          packages: updatedPackages
        };
      });

      return updated;
    });

    addToast('Service package updated successfully!', 'success');
  };

  const updateService = async (serviceId: string, updates: Partial<ServiceItem>) => {
    setServices((prevServices) => {
      return prevServices.map((srv) => {
        if (srv.id !== serviceId && srv.slug !== serviceId) return srv;
        return { ...srv, ...updates };
      });
    });

    addToast('Service updated successfully!', 'success');
  };

  const resetServicesToDefault = () => {
    localStorage.removeItem('branify_services_v2');
    setServices(INITIAL_SERVICES);
    addToast('Reset all services and packages to initial defaults.', 'info');
  };

  // Service Categories CRUD
  const addServiceCategory = async (catData: Omit<ServiceCategoryItem, 'id'>) => {
    const newId = `scat-${Date.now()}`;
    const newCat: ServiceCategoryItem = {
      ...catData,
      id: newId,
      slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sortOrder: catData.sortOrder || serviceCategories.length + 1,
      isActive: catData.isActive ?? true
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('service_categories').insert([{
          id: newId,
          name: newCat.name,
          slug: newCat.slug,
          description: newCat.description,
          icon: newCat.icon,
          badge: newCat.badge,
          sort_order: newCat.sortOrder,
          is_active: newCat.isActive
        }]);
      } catch (err) {
        console.warn('Supabase service_categories insert warning:', err);
      }
    }

    setServiceCategories((prev) => [...prev, newCat]);
    addToast(`Category "${newCat.name}" added successfully!`, 'success');
  };

  const updateServiceCategory = async (id: string, updates: Partial<ServiceCategoryItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
        if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
        if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;
        if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
        await supabase.from('service_categories').update(dbUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase service_categories update warning:', err);
      }
    }

    setServiceCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addToast('Service category updated.', 'success');
  };

  const deleteServiceCategory = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('service_categories').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase service_categories delete warning:', err);
      }
    }
    setServiceCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Service category removed.', 'info');
  };

  // Product Categories CRUD
  const addProductCategory = async (catData: Omit<ProductCategoryItem, 'id'>) => {
    const newId = `pcat-${Date.now()}`;
    const newCat: ProductCategoryItem = {
      ...catData,
      id: newId,
      slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sortOrder: catData.sortOrder || productCategories.length + 1,
      isActive: catData.isActive ?? true
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('product_categories').insert([{
          id: newId,
          name: newCat.name,
          slug: newCat.slug,
          description: newCat.description,
          icon: newCat.icon,
          badge: newCat.badge,
          sort_order: newCat.sortOrder,
          is_active: newCat.isActive
        }]);
      } catch (err) {
        console.warn('Supabase product_categories insert warning:', err);
      }
    }

    setProductCategories((prev) => [...prev, newCat]);
    addToast(`Product category "${newCat.name}" added!`, 'success');
  };

  const updateProductCategory = async (id: string, updates: Partial<ProductCategoryItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
        if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
        if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;
        if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
        await supabase.from('product_categories').update(dbUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase product_categories update warning:', err);
      }
    }

    setProductCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addToast('Product category updated.', 'success');
  };

  const deleteProductCategory = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('product_categories').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase product_categories delete warning:', err);
      }
    }
    setProductCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Product category removed.', 'info');
  };

  // Duplicate Product
  const duplicateProduct = async (productId: string) => {
    const prod = products.find((p) => p.id === productId || p.slug === productId);
    if (!prod) return;
    await addProduct({
      ...prod,
      title: `${prod.title} (Copy)`,
      slug: `${prod.slug}-copy-${Date.now().toString().slice(-4)}`
    });
  };

  // AI Tools CRUD
  const addAITool = async (toolData: Omit<AIToolItem, 'id'>) => {
    const newId = `ai-${Date.now()}`;
    const newTool: AIToolItem = {
      ...toolData,
      id: newId,
      slug: toolData.slug || toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sortOrder: toolData.sortOrder || aiTools.length + 1,
      status: toolData.status || 'live',
      isPublic: toolData.isPublic ?? true
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('ai_tools').insert([{
          id: newId,
          name: newTool.name,
          slug: newTool.slug,
          category: newTool.category,
          category_slug: newTool.categorySlug,
          badge: newTool.badge,
          tagline: newTool.tagline,
          description: newTool.description,
          icon: newTool.icon,
          url: newTool.url,
          status: newTool.status,
          sort_order: newTool.sortOrder,
          featured: newTool.featured,
          is_public: newTool.isPublic
        }]);
      } catch (err) {
        console.warn('Supabase ai_tools insert warning:', err);
      }
    }

    setAiTools((prev) => [...prev, newTool]);
    addToast(`AI Tool "${newTool.name}" created!`, 'success');
  };

  const updateAITool = async (id: string, updates: Partial<AIToolItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.categorySlug !== undefined) dbUpdates.category_slug = updates.categorySlug;
        if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
        if (updates.tagline !== undefined) dbUpdates.tagline = updates.tagline;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
        if (updates.url !== undefined) dbUpdates.url = updates.url;
        if (updates.status !== undefined) dbUpdates.status = updates.status;
        if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;
        if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
        if (updates.isPublic !== undefined) dbUpdates.is_public = updates.isPublic;
        await supabase.from('ai_tools').update(dbUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase ai_tools update warning:', err);
      }
    }

    setAiTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    addToast('AI Tool updated.', 'success');
  };

  const deleteAITool = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('ai_tools').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase ai_tools delete warning:', err);
      }
    }
    setAiTools((prev) => prev.filter((t) => t.id !== id));
    addToast('AI Tool deleted.', 'info');
  };

  // Media Library CRUD & Upload
  const uploadFileToStorage = async (file: File, bucket = 'media', folder = 'uploads'): Promise<{ url: string; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const ext = file.name.split('.').pop() || 'png';
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${folder}/${Date.now()}_${cleanName}`;
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

        if (!error && data) {
          const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(fileName);
          if (publicData?.publicUrl) {
            return { url: publicData.publicUrl };
          }
        }
      } catch (err: any) {
        console.warn('Supabase storage upload fallback to Data URL:', err);
      }
    }

    // Client-side fallback to FileReader DataURL for zero-setup previews
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({ url: (e.target?.result as string) || '' });
      };
      reader.onerror = () => {
        resolve({ url: '', error: 'Failed to read file on device' });
      };
      reader.readAsDataURL(file);
    });
  };

  const addMediaItem = async (itemData: Omit<MediaLibraryItem, 'id' | 'uploadedAt'>) => {
    const newId = `med-${Date.now()}`;
    const now = new Date().toISOString();
    const newItem: MediaLibraryItem = {
      ...itemData,
      id: newId,
      uploadedAt: now
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('media_library').insert([{
          id: newId,
          file_name: newItem.fileName,
          file_url: newItem.fileUrl,
          file_type: newItem.fileType,
          file_size: newItem.fileSize,
          category: newItem.category,
          uploaded_at: now,
          alt_text: newItem.altText,
          storage_path: newItem.storagePath
        }]);
      } catch (err) {
        console.warn('Supabase media_library insert warning:', err);
      }
    }

    setMediaLibrary((prev) => [newItem, ...prev]);
    addToast(`File "${newItem.fileName}" saved to media library!`, 'success');
  };

  const deleteMediaItem = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('media_library').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase media_library delete warning:', err);
      }
    }
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));
    addToast('File removed from media library.', 'info');
  };

  // Duplicate Blog & Portfolio
  const duplicateBlogPost = async (blogId: string) => {
    const post = blogs.find((b) => b.id === blogId || b.slug === blogId);
    if (!post) return;
    await addBlogPost({
      ...post,
      title: `${post.title} (Draft Copy)`,
      slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
      featured: false
    });
  };

  const duplicatePortfolioItem = async (portfolioId: string) => {
    const item = portfolio.find((p) => p.id === portfolioId || p.slug === portfolioId);
    if (!item) return;
    await addPortfolioItem({
      ...item,
      title: `${item.title} (Copy)`,
      slug: `${item.slug}-copy-${Date.now().toString().slice(-4)}`
    });
  };

  // Free Templates CRUD
  const addFreeTemplate = async (templateData: Omit<FreeTemplateItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = `ft-${Date.now()}`;
    const slug = templateData.slug || templateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const now = new Date().toISOString();

    const newTemplate: FreeTemplateItem = {
      ...templateData,
      id: newId,
      slug,
      isFree: true,
      sortOrder: templateData.sortOrder || freeTemplates.length + 1,
      createdAt: now,
      updatedAt: now,
      publishedAt: templateData.status === 'published' ? now : undefined
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('free_templates').insert([
          {
            id: newId,
            slug,
            title: newTemplate.title,
            category: newTemplate.category,
            category_slug: newTemplate.categorySlug,
            short_description: newTemplate.shortDescription,
            full_description: newTemplate.fullDescription,
            file_format: newTemplate.fileFormat,
            file_size: newTemplate.fileSize,
            download_url: newTemplate.downloadUrl,
            preview_image: newTemplate.previewImage,
            gallery_images: newTemplate.galleryImages,
            features: newTemplate.features,
            whats_included: newTemplate.whatsIncluded,
            license: newTemplate.license,
            disclaimer: newTemplate.disclaimer,
            status: newTemplate.status,
            featured: newTemplate.featured,
            sort_order: newTemplate.sortOrder,
            seo_title: newTemplate.seoTitle,
            meta_description: newTemplate.metaDescription,
            seo_keywords: newTemplate.seoKeywords,
            canonical_url: newTemplate.canonicalUrl,
            og_title: newTemplate.ogTitle,
            og_description: newTemplate.ogDescription,
            og_image: newTemplate.ogImage,
            tags: newTemplate.tags
          }
        ]);
      } catch (err) {
        console.warn('Supabase sync warning for free_templates insert:', err);
      }
    }

    setFreeTemplates((prev) => [newTemplate, ...prev]);
    addToast(`Template "${newTemplate.title}" created successfully!`, 'success');
  };

  const updateFreeTemplate = async (id: string, updates: Partial<FreeTemplateItem>) => {
    const now = new Date().toISOString();
    
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = { updated_at: now };
        if (updates.title !== undefined) dbUpdates.title = updates.title;
        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.categorySlug !== undefined) dbUpdates.category_slug = updates.categorySlug;
        if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
        if (updates.fullDescription !== undefined) dbUpdates.full_description = updates.fullDescription;
        if (updates.fileFormat !== undefined) dbUpdates.file_format = updates.fileFormat;
        if (updates.fileSize !== undefined) dbUpdates.file_size = updates.fileSize;
        if (updates.downloadUrl !== undefined) dbUpdates.download_url = updates.downloadUrl;
        if (updates.previewImage !== undefined) dbUpdates.preview_image = updates.previewImage;
        if (updates.galleryImages !== undefined) dbUpdates.gallery_images = updates.galleryImages;
        if (updates.features !== undefined) dbUpdates.features = updates.features;
        if (updates.whatsIncluded !== undefined) dbUpdates.whats_included = updates.whatsIncluded;
        if (updates.license !== undefined) dbUpdates.license = updates.license;
        if (updates.disclaimer !== undefined) dbUpdates.disclaimer = updates.disclaimer;
        if (updates.status !== undefined) dbUpdates.status = updates.status;
        if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
        if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;
        if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
        if (updates.seoTitle !== undefined) dbUpdates.seo_title = updates.seoTitle;
        if (updates.metaDescription !== undefined) dbUpdates.meta_description = updates.metaDescription;
        if (updates.seoKeywords !== undefined) dbUpdates.seo_keywords = updates.seoKeywords;
        if (updates.canonicalUrl !== undefined) dbUpdates.canonical_url = updates.canonicalUrl;
        if (updates.ogTitle !== undefined) dbUpdates.og_title = updates.ogTitle;
        if (updates.ogDescription !== undefined) dbUpdates.og_description = updates.ogDescription;
        if (updates.ogImage !== undefined) dbUpdates.og_image = updates.ogImage;

        await supabase.from('free_templates').update(dbUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync warning for free_templates update:', err);
      }
    }

    setFreeTemplates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates, updatedAt: now };
          if (updates.status === 'published' && !t.publishedAt) {
            updated.publishedAt = now;
          }
          return updated;
        }
        return t;
      })
    );
    addToast('Template updated successfully!', 'success');
  };

  const deleteFreeTemplate = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('free_templates').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase sync warning for free_templates delete:', err);
      }
    }
    setFreeTemplates((prev) => prev.filter((t) => t.id !== id));
    addToast('Template deleted.', 'info');
  };

  const publishFreeTemplate = async (id: string) => {
    await updateFreeTemplate(id, { status: 'published' });
  };

  const unpublishFreeTemplate = async (id: string) => {
    await updateFreeTemplate(id, { status: 'draft' });
  };

  const archiveFreeTemplate = async (id: string) => {
    await updateFreeTemplate(id, { status: 'archived' });
  };

  const resetFreeTemplatesToDefault = () => {
    setFreeTemplates(INITIAL_FREE_TEMPLATES);
    localStorage.setItem('branify_free_templates', JSON.stringify(INITIAL_FREE_TEMPLATES));
    addToast('Reset Free Templates catalog to defaults.', 'info');
  };

  // Blog Posts CRUD
  const addBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('blog_posts').insert([
          {
            title: postData.title,
            slug,
            excerpt: postData.excerpt,
            content: postData.content,
            author: postData.author.name,
            category: postData.category,
            image: postData.coverImage,
            read_time: postData.readTime,
            date: new Date().toISOString().split('T')[0],
            tags: postData.tags,
            is_published: postData.featured ?? true
          }
        ]);
        if (error) {
          addToast(`Failed to add blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding blog post:', err);
      }
    }

    await refreshData();
    addToast(`Blog post "${postData.title}" published!`, 'success');
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.excerpt) dbUpdates.excerpt = updates.excerpt;
        if (updates.content) dbUpdates.content = updates.content;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.coverImage) dbUpdates.image = updates.coverImage;
        if (updates.readTime) dbUpdates.read_time = updates.readTime;
        if (updates.tags) dbUpdates.tags = updates.tags;
        if (updates.featured !== undefined) dbUpdates.is_published = updates.featured;

        const { error } = await supabase.from('blog_posts').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating blog post:', err);
      }
    }

    await refreshData();
    addToast('Blog post updated.', 'success');
  };

  const deleteBlogPost = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting blog post:', err);
      }
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    addToast('Blog post deleted.', 'info');
  };

  // Portfolio Items CRUD
  const addPortfolioItem = async (itemData: Omit<PortfolioItem, 'id'>) => {
    const slug = itemData.slug || itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('portfolio_items').insert([
          {
            title: itemData.title,
            slug,
            description: itemData.challenge,
            category: itemData.category,
            client: itemData.client,
            image: itemData.coverImage,
            tags: itemData.technologies,
            challenge: itemData.challenge,
            solution: itemData.solution,
            results: itemData.results[0] || '',
            live_url: itemData.liveUrl || ''
          }
        ]);
        if (error) {
          addToast(`Failed to add portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding portfolio item:', err);
      }
    }

    await refreshData();
    addToast(`Portfolio item "${itemData.title}" created!`, 'success');
  };

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.client) dbUpdates.client = updates.client;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.coverImage) dbUpdates.image = updates.coverImage;
        if (updates.challenge) dbUpdates.challenge = updates.challenge;
        if (updates.solution) dbUpdates.solution = updates.solution;
        if (updates.results) dbUpdates.results = updates.results[0] || '';
        if (updates.technologies) dbUpdates.tags = updates.technologies;
        if (updates.liveUrl !== undefined) dbUpdates.live_url = updates.liveUrl;

        const { error } = await supabase.from('portfolio_items').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating portfolio item:', err);
      }
    }

    await refreshData();
    addToast('Portfolio item updated.', 'success');
  };

  const deletePortfolioItem = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting portfolio item:', err);
      }
    }
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    addToast('Portfolio item deleted.', 'info');
  };

  // Orders CRUD
  const updateOrderStatus = async (id: string, status: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Error updating order status:', err);
      }
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addToast(`Order status updated to ${status}.`, 'info');
  };

  const deleteOrder = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('orders').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting order:', err);
      }
    }
    setOrders((prev) => prev.filter((o) => o.id !== id));
    addToast('Order deleted.', 'info');
  };

  // Cart Functions
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addToast(`Added "${item.title}" to cart!`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalUSD = cart.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Currency Helpers
  const formatPrice = (amountUSD: number, options?: { showCode?: boolean }) => {
    return formatCurrencyPrice(amountUSD, currency, exchangeRates, options);
  };

  const convertPrice = (amountUSD: number) => {
    return convertCurrencyAmount(amountUSD, currency, exchangeRates);
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // PWA Prompt
  const [pwaDeferredPrompt, setPwaDeferredPrompt] = useState<any>(null);

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        detectedCountry,
        isAutoDetected,
        isDetectingLocation,
        resetToAutoDetected,
        formatPrice,
        convertPrice,
        exchangeRates,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalUSD,
        wishlist,
        toggleWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        announcementDismissed,
        setAnnouncementDismissed,
        settings,
        updateSettings,
        services,
        serviceCategories,
        products,
        productCategories,
        tools,
        aiTools,
        portfolio,
        blogs,
        testimonials,
        leads,
        newsletterSubscriptions,
        orders,
        freeTemplates,
        mediaLibrary,
        addLead,
        updateLeadStatus,
        deleteLead,
        addNewsletterSubscription,
        deleteNewsletterSubscription,
        addService,
        updateServicePackage,
        updateService,
        deleteService,
        duplicateService,
        resetServicesToDefault,
        addServiceCategory,
        updateServiceCategory,
        deleteServiceCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        addProductCategory,
        updateProductCategory,
        deleteProductCategory,
        addFreeTemplate,
        updateFreeTemplate,
        deleteFreeTemplate,
        publishFreeTemplate,
        unpublishFreeTemplate,
        archiveFreeTemplate,
        resetFreeTemplatesToDefault,
        addAITool,
        updateAITool,
        deleteAITool,
        addMediaItem,
        deleteMediaItem,
        uploadFileToStorage,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        duplicateBlogPost,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        duplicatePortfolioItem,
        updateOrderStatus,
        deleteOrder,
        isAdminLoggedIn,
        isAdminChecking,
        adminLogin,
        adminLogout,
        toasts,
        addToast,
        removeToast,
        pwaDeferredPrompt,
        setPwaDeferredPrompt,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

