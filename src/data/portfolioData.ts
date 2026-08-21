import { PortfolioItem } from '../types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'playbeat',
    slug: 'playbeat',
    title: 'PlayBeat',
    client: 'PlayBeat Digital',
    industry: 'Entertainment & Audio Streaming',
    year: '2026',
    category: 'Web Development',
    challenge: 'A modern digital audio streaming platform and music showcase built with clean frontend architecture and responsive interactive audio player controls.',
    solution: 'Engineered an interactive, responsive web experience featuring digital playlist browsing, smooth media playback interfaces, and bespoke brand identity.',
    keyFeatures: [
      'Interactive digital audio player controls and track playlist system',
      'High-performance client-side responsive interface for mobile and desktop',
      'Sleek dark theme typography and media discovery components',
      'Optimized asset loading and smooth playback transitions'
    ],
    results: [
      'Fast client-side playback and zero-buffer UI transitions',
      'Fully responsive audio controls across mobile, tablet, and desktop'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Next.js'],
    coverImage: '/portfolio/playbeat.png',
    galleryImages: [
      '/portfolio/playbeat.png'
    ],
    liveUrl: 'https://playbeat.digital/',
    featured: true
  },
  {
    id: 'blockexchange',
    slug: 'blockexchange',
    title: 'BlockExchange',
    client: 'BlockExchange',
    industry: 'Web3 & Fintech',
    year: '2026',
    category: 'Web3',
    challenge: 'A high-performance Web3 exchange and digital token hub designed for modern crypto traders with real-time market data presentation.',
    solution: 'Developed a high-contrast dark Web3 interface with token exchange modules, secure wallet integration layouts, and responsive market tracking.',
    keyFeatures: [
      'Token swap & crypto market overview dashboard',
      'High-performance Web3 dark interface design',
      'Responsive trading layout with real-time feedback',
      'Modular token discovery and wallet connectivity UI'
    ],
    results: [
      'Seamless multi-device crypto trading and wallet experience',
      'Clean market data layout with instantaneous view rendering'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web3', 'Ethers.js'],
    coverImage: '/portfolio/blockexchange.png',
    galleryImages: [
      '/portfolio/blockexchange.png'
    ],
    liveUrl: 'https://www.blockexchange.buzz/',
    featured: true
  },
  {
    id: 'property-atlas',
    slug: 'property-atlas',
    title: 'Property Atlas',
    client: 'Property Atlas Lifestyle',
    industry: 'Real Estate & Luxury Developments',
    year: '2026',
    category: 'Real Estate',
    challenge: 'A luxury real estate discovery website and lifestyle property catalog designed to showcase premium residential developments.',
    solution: 'Designed and built an elegant property showcase with high-resolution gallery viewports, dynamic property spec sheets, and clean inquiry workflows.',
    keyFeatures: [
      'Curated luxury property listing viewports and specifications',
      'High-resolution visual asset galleries with immersive presentation',
      'Direct client inquiry and consultation lead capture forms',
      'Neighborhood amenity highlights and architectural overview'
    ],
    results: [
      'High-conversion luxury property showcase with seamless inquiry funnel',
      'Engaging editorial property layouts optimized for high-net-worth buyers'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Next.js'],
    coverImage: '/portfolio/propertyatlas.png',
    galleryImages: [
      '/portfolio/propertyatlas.png'
    ],
    liveUrl: 'https://propertyatlas.lifestyle/',
    featured: true
  },
  {
    id: 'alaya-spa-wellness',
    slug: 'alaya-spa-wellness',
    title: 'Alaya Spa & Wellness',
    client: 'Alaya Spa & Wellness',
    industry: 'Beauty & Wellness',
    year: '2026',
    category: 'Beauty & Wellness',
    challenge: 'A serene, holistic digital experience for a premium spa and wellness retreat, presenting service menus, treatment guides, and appointment booking.',
    solution: 'Crafted an earthy, calming wellness website with treatment category navigation, interactive service menus, and frictionless appointment booking inquiries.',
    keyFeatures: [
      'Holistic treatment menu with detailed service breakdowns',
      'Calming, organic typography and visual atmosphere',
      'Direct WhatsApp & online booking appointment funnel',
      'Interactive wellness package discovery and gift consultation'
    ],
    results: [
      'Streamlined digital appointment booking experience',
      'Cohesive, tranquil brand atmosphere reflecting premium wellness values'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Vite'],
    coverImage: '/portfolio/alaya-spa.png',
    galleryImages: [
      '/portfolio/alaya-spa.png'
    ],
    liveUrl: 'https://alaya-spa-wellness.vercel.app/',
    featured: true
  },
  {
    id: 'artline-gents-salon',
    slug: 'artline-gents-salon',
    title: 'Artline Gents Salon',
    client: 'Artline Gents Salon',
    industry: 'Men\'s Grooming & Luxury Salon',
    year: '2026',
    category: 'Beauty & Wellness',
    challenge: 'A modern grooming and barbershop digital presence crafted to showcase VIP styling services, packages, and master barber appointments.',
    solution: 'Created a sharp, masculine dark-aesthetic digital storefront featuring service packages, price lists, and fast mobile booking options.',
    keyFeatures: [
      'VIP grooming packages and transparent pricing cards',
      'Mobile-first appointment scheduling and location details',
      'High-contrast barber styling showcase and service guides',
      'Instant WhatsApp booking integration'
    ],
    results: [
      'Direct-to-barber booking flow with zero booking friction',
      'Polished VIP aesthetic aligned with premium salon standards'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    coverImage: '/portfolio/artline-salon.png',
    galleryImages: [
      '/portfolio/artline-salon.png'
    ],
    liveUrl: 'https://artline-gents-salon.vercel.app/',
    featured: false
  },
  {
    id: 'maison-elixir-salon',
    slug: 'maison-elixir-salon',
    title: 'Maison Elixir Salon',
    client: 'Maison Elixir Salon',
    industry: 'Haute Coiffure & Beauty Studio',
    year: '2026',
    category: 'Beauty & Wellness',
    challenge: 'An upscale Parisian-inspired beauty salon and hair atelier website highlighting luxury treatments, styling portfolios, and VIP client consultations.',
    solution: 'Designed a refined editorial aesthetic with clean booking integration, service lookbooks, and seamless responsive performance.',
    keyFeatures: [
      'Editorial lookbook and treatment portfolio showcase',
      'Luxury service menu with transparent pricing and duration guides',
      'Integrated VIP consultation and booking workflows',
      'Mobile-optimized beauty atelier digital catalog'
    ],
    results: [
      'Elegant haute coiffure presentation with effortless inquiry path',
      'Fast client-side loading across international mobile devices'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vite'],
    coverImage: '/portfolio/maison-elixir.png',
    galleryImages: [
      '/portfolio/maison-elixir.png'
    ],
    liveUrl: 'https://maison-elixir-salon.vercel.app/',
    featured: false
  },
  {
    id: 'taqdeer-by-jts',
    slug: 'taqdeer-by-jts',
    title: 'Taqdeer by JTS',
    client: 'Taqdeer by JTS',
    industry: 'Fashion, Apparel & Lifestyle',
    year: '2026',
    category: 'E-commerce',
    challenge: 'A boutique fashion brand and e-commerce storefront presenting artisan apparel collections with a smooth mobile-optimized shopping flow.',
    solution: 'Engineered an elegant apparel catalog with product imagery grids, fabric and sizing details, and instant order placement pathways.',
    keyFeatures: [
      'Apparel collection catalog with category sorting and zoomable previews',
      'Responsive shopping cart and streamlined checkout funnel',
      'Bespoke brand identity celebrating artisanal craftsmanship',
      'Instant customer inquiry and order support channels'
    ],
    results: [
      'Streamlined artisan fashion catalog with frictionless shopping flow',
      'Vibrant visual merchandising layout optimized for mobile commerce'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Vite'],
    coverImage: '/portfolio/taqdeer-jts.png',
    galleryImages: [
      '/portfolio/taqdeer-jts.png'
    ],
    liveUrl: 'https://taqdeer-by-jts.vercel.app/',
    featured: false
  }
];
