import React, { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  serviceSchema?: {
    name: string;
    description: string;
    serviceType?: string;
    providerName?: string;
    areaServed?: string;
  };
  productSchema?: {
    name: string;
    description: string;
    price: number | string;
    currency?: string;
    sku?: string;
    image?: string;
    category?: string;
  };
  softwareSchema?: {
    name: string;
    description: string;
    applicationCategory?: string;
    operatingSystem?: string;
    offers?: {
      price: string;
      priceCurrency: string;
    };
  };
}

const DEFAULT_TITLE = 'BRANIFY | Web Development, Branding & AI Solutions';
const DEFAULT_DESC = 'BRANIFY builds high-performance websites, web apps, brands and AI-powered digital solutions for businesses worldwide.';
const SITE_URL = 'https://branify.store';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESC,
  keywords = [
    'BRANIFY',
    'digital agency',
    'web development',
    'custom website development',
    'business website development',
    'WordPress development',
    'UI UX design',
    'brand identity design',
    'AI automation solutions',
    'free online tools',
    'digital products',
    'templates'
  ],
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData,
  breadcrumbs,
  faqs,
  serviceSchema,
  productSchema,
  softwareSchema
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title ? (title.includes('BRANIFY') ? title : `${title} | BRANIFY`) : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to update or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Standard Meta
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    setMetaTag('robots', 'index, follow');

    // Canonical URL Calculation (exact self-referencing preferred URL)
    const cleanCanonical = canonicalPath === '/' || !canonicalPath
      ? '/'
      : (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`);
    const currentUrl = cleanCanonical === '/' ? `${SITE_URL}/` : `${SITE_URL}${cleanCanonical}`;
    setLinkTag('canonical', currentUrl);

    // OpenGraph
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'BRANIFY', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Dynamic JSON-LD Graph Construction
    const graphNodes: Record<string, any>[] = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'BRANIFY',
        url: SITE_URL,
        logo: `${SITE_URL}/branify-logo.png`,
        description: 'BRANIFY is an international full-stack digital agency providing custom web development, brand identity design, AI solutions, and digital products.',
        email: 'admin@branify.store',
        telephone: '+92-332-1029333',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+92-332-1029333',
            contactType: 'customer service',
            email: 'admin@branify.store',
            availableLanguage: ['English', 'Bengali', 'Urdu', 'Arabic']
          },
          {
            '@type': 'ContactPoint',
            telephone: '+1-581-907-2960',
            contactType: 'head office',
            email: 'admin@branify.store',
            availableLanguage: ['English']
          }
        ],
        sameAs: [
          'https://www.instagram.com/branify001',
          'https://www.facebook.com/share/14mz5a1BDXB/',
          'https://linkedin.com/company/branify',
          'https://x.com/branify_store',
          'https://github.com/branify'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'BRANIFY',
        description: 'Custom Web Development, Brand Identity, and Digital Solutions Agency',
        publisher: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}#webpage`,
        url: currentUrl,
        name: fullTitle,
        description: description,
        isPartOf: { '@id': `${SITE_URL}/#website` }
      }
    ];

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      graphNodes.push({
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url.startsWith('/') ? b.url : `/${b.url}`}`
        }))
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      graphNodes.push({
        '@type': 'FAQPage',
        '@id': `${currentUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    // Service Schema
    if (serviceSchema) {
      graphNodes.push({
        '@type': 'Service',
        '@id': `${currentUrl}#service`,
        name: serviceSchema.name,
        description: serviceSchema.description,
        serviceType: serviceSchema.serviceType || serviceSchema.name,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: serviceSchema.areaServed || 'Worldwide'
      });
    }

    // Product Schema
    if (productSchema) {
      graphNodes.push({
        '@type': 'Product',
        '@id': `${currentUrl}#product`,
        name: productSchema.name,
        description: productSchema.description,
        image: productSchema.image || DEFAULT_IMAGE,
        sku: productSchema.sku || `PROD-${productSchema.name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`,
        brand: { '@id': `${SITE_URL}/#organization` },
        category: productSchema.category || 'Digital Product',
        offers: {
          '@type': 'Offer',
          url: currentUrl,
          priceCurrency: productSchema.currency || 'USD',
          price: productSchema.price || '0.00',
          availability: 'https://schema.org/InStock'
        }
      });
    }

    // SoftwareApplication Schema (for free tools)
    if (softwareSchema) {
      graphNodes.push({
        '@type': 'SoftwareApplication',
        '@id': `${currentUrl}#software`,
        name: softwareSchema.name,
        description: softwareSchema.description,
        applicationCategory: softwareSchema.applicationCategory || 'UtilitiesApplication',
        operatingSystem: softwareSchema.operatingSystem || 'All Modern Web Browsers',
        offers: softwareSchema.offers || {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        }
      });
    }

    // Additional structured data
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        graphNodes.push(...structuredData);
      } else {
        graphNodes.push(structuredData);
      }
    }

    const completeSchema = {
      '@context': 'https://schema.org',
      '@graph': graphNodes
    };

    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(completeSchema);
  }, [
    title,
    description,
    keywords,
    canonicalPath,
    ogType,
    ogImage,
    structuredData,
    breadcrumbs,
    faqs,
    serviceSchema,
    productSchema,
    softwareSchema
  ]);

  return null;
};
