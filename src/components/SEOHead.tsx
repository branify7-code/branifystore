import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  structuredData?: Record<string, any>;
}

const DEFAULT_TITLE = 'BRANIFY — Build. Brand. Grow. | Digital Agency & Software Marketplace';
const DEFAULT_DESC = 'International digital agency, digital products marketplace, and 100+ free online browser tools. Empowering high-growth startups and global brands.';
const SITE_URL = 'https://branify.store';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESC,
  keywords = [
    'BRANIFY',
    'digital agency',
    'web development',
    'WordPress',
    'UI UX design',
    'AI solutions',
    'brand identity',
    'free online tools',
    'digital products',
    'templates'
  ],
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData
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

    // Canonical
    const currentUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
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

    // JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'BRANIFY',
          url: SITE_URL,
          logo: `${SITE_URL}/assets/logo.png`,
          description: DEFAULT_DESC,
          email: 'admin@branify.store',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+1-555-019-2831',
              contactType: 'customer service',
              availableLanguage: ['English', 'Urdu', 'Arabic']
            }
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'BRANIFY',
          publisher: { '@id': `${SITE_URL}/#organization` }
        },
        ...(structuredData ? [structuredData] : [])
      ]
    };

    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(defaultSchema);
  }, [title, description, keywords, canonicalPath, ogType, ogImage, structuredData]);

  return null;
};
