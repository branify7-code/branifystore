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
  },
  {
    id: 'meridian-marketplace',
    slug: 'meridian-marketplace',
    title: 'Meridian Marketplace',
    client: 'Meridian Prime Direct',
    industry: 'Verified Showroom & Luxury Classifieds',
    year: '2026',
    category: 'E-commerce',
    challenge: 'A curated luxury direct-to-consumer marketplace and verified showroom platform presenting authenticated, pre-owned high-value assets (motors, real estate, electronics, watches) with inspection guarantees and zero intermediary fees.',
    solution: 'Engineered an elegant, searchable multi-category catalog with verified-inventory badges, showroom-hub filtering, trending search tags, and direct-inquiry flows for private viewings and test drives.',
    keyFeatures: [
      'Verified-showroom catalog across motors, real estate, electronics & watches',
      'Faceted search with department + showroom-hub filters and trending tags',
      'Inspection-guarantee badges and direct-showroom warranty presentation',
      'Private-viewing and test-drive inquiry funnels per listing'
    ],
    results: [
      'Premium managed-marketplace experience with zero intermediary friction',
      'High-trust, conversion-ready catalog optimized for high-net-worth buyers'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Vite'],
    coverImage: '/portfolio/meridian-marketplace.png',
    galleryImages: [
      '/portfolio/meridian-marketplace.png'
    ],
    liveUrl: '',
    featured: true
  },
  {
    id: 'tatka-bazar',
    slug: 'tatka-bazar',
    title: 'Tatka Bazar',
    client: 'Tatka Bazar Supermarket',
    industry: 'Online Grocery & Express Delivery',
    year: '2026',
    category: 'E-commerce',
    challenge: 'An online grocery store and supermarket delivering fresh food, household items, and personal care products to doors across Dubai with express delivery.',
    solution: 'Engineered a fast, mobile-first e-commerce grocery platform with category browsing, cart, checkout, and real-time delivery slot selection.',
    keyFeatures: [
      'Fresh grocery catalog with category sorting and search',
      'Express delivery slot booking and order tracking',
      'Responsive cart and streamlined checkout funnel',
      'Mobile-optimized shopping flow for daily groceries'
    ],
    results: [
      'Streamlined daily grocery ordering with express delivery',
      'Mobile-first catalog optimized for repeat purchases'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Vite'],
    coverImage: '/portfolio/tatka-bazar.png',
    galleryImages: [
      '/portfolio/tatka-bazar.png'
    ],
    liveUrl: '',
    featured: true
  },
  {
    id: 'cinestream',
    slug: 'cinestream',
    title: 'CineStream',
    client: 'CineStream',
    industry: 'Entertainment & Movie Streaming',
    year: '2026',
    category: 'Web Development',
    challenge: 'A cinematic movie and TV streaming platform letting users watch trending films, series, and global cinema content.',
    solution: 'Built an immersive streaming experience with a cinematic dark UI, browse-by-genre discovery, and smooth playback interfaces.',
    keyFeatures: [
      'Cinematic dark UI for movie and series discovery',
      'Browse-by-genre and trending content carousels',
      'Smooth playback interfaces and media controls',
      'Responsive streaming layout for mobile and desktop'
    ],
    results: [
      'Immersive cinematic streaming experience',
      'Fast content discovery across genres and trending titles'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Next.js'],
    coverImage: '/portfolio/cinestream.png',
    galleryImages: [
      '/portfolio/cinestream.png'
    ],
    liveUrl: '',
    featured: true
  },
  {
    id: 'la-cava-dxb',
    slug: 'la-cava-dxb',
    title: 'LA CAVA DXB',
    client: 'LA CAVA DXB',
    industry: 'Premium Skincare & Beauty Clinic',
    year: '2026',
    category: 'Beauty & Wellness',
    challenge: 'A premium skincare sanctuary and beauty clinic in Dubai offering personalized facial aesthetic treatments and rejuvenation rituals.',
    solution: 'Designed an elegant, editorial digital presence with treatment menus, practitioner bios, and a frictionless consultation booking flow.',
    keyFeatures: [
      'Editorial treatment menu with detailed service breakdowns',
      'Practitioner profiles and treatment guides',
      'Consultation booking and inquiry funnels',
      'Luxury aesthetic reflecting the premium clinic brand'
    ],
    results: [
      'Premium clinic presentation with effortless booking',
      'Editorial layout optimized for high-end clientele'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Vite'],
    coverImage: '/portfolio/la-cava-dxb.png',
    galleryImages: [
      '/portfolio/la-cava-dxb.png'
    ],
    liveUrl: '',
    featured: true
  },
  {
    id: 'world-dollar-quest',
    slug: 'world-dollar-quest',
    title: 'World Dollar Quest',
    client: 'World Dollar Quest',
    industry: 'AI Tools, Freelance & Online Earning',
    year: '2026',
    category: 'Web Development',
    challenge: 'A digital ecosystem and resource hub providing free AI tools, freelance guides, and educational pathways to help users earn money online.',
    solution: 'Engineered a content-rich platform with curated AI tool directories, learning paths, and earn-online resources organized for easy discovery.',
    keyFeatures: [
      'Curated AI tools directory with category browsing',
      'Freelance guides and earn-online learning paths',
      'Resource hub with search and filtering',
      'Responsive content layout optimized for reading'
    ],
    results: [
      'Comprehensive earn-online resource hub',
      'Structured learning paths for online income'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'AI'],
    coverImage: '/portfolio/world-dollar-quest.png',
    galleryImages: [
      '/portfolio/world-dollar-quest.png'
    ],
    liveUrl: '',
    featured: true
  }
];
