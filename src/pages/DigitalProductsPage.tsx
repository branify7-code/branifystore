import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import {
  Package,
  Search,
  Filter,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

interface DigitalProductsPageProps {
  navigate: (path: string) => void;
  categoryFilter?: string;
}

export const DigitalProductsPage: React.FC<DigitalProductsPageProps> = ({ navigate, categoryFilter }) => {
  const { products, formatPrice, addToCart, wishlist, toggleWishlist } = useApp();

  // Extract unique categories dynamically from real products in Supabase
  const dynamicCategories: string[] = ['All', ...Array.from(new Set<string>(products.map((p) => p.category)))];

  const categorySlugToName: Record<string, string> = {
    'canva-templates': 'Canva Templates',
    'notion-templates': 'Notion Templates',
    'spreadsheet-templates': 'Spreadsheet Templates',
    'website-templates': 'Website Templates',
    'presentation-templates': 'Presentation Templates',
    'business-templates': 'Business Templates',
    'ai-prompts': 'AI Prompts',
    'ai-tools': 'AI Tools',
    'social-media-kits': 'Social Media Kits',
    'subscription-products': 'Subscription Products'
  };

  const initialCategory = categoryFilter
    ? categorySlugToName[categoryFilter] || categoryFilter.replace(/-/g, ' ')
    : 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (categoryFilter) {
      const match = categorySlugToName[categoryFilter] || categoryFilter.replace(/-/g, ' ');
      setSelectedCategory(match);
    }
  }, [categoryFilter]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategorySlug = (catName: string) => {
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb if category filter */}
      {categoryFilter && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <button onClick={() => navigate('/digital-products')} className="hover:text-white transition-colors">
            Digital Products
          </button>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-bold capitalize">{selectedCategory}</span>
        </nav>
      )}

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          Digital Assets Marketplace
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          {categoryFilter ? `${selectedCategory}` : 'Digital Products & Templates'}
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Instant download AI prompt kits, agency Canva templates, Notion workspaces, and startup financial models designed for rapid execution.
        </p>
      </div>

      {/* Subscriptions Callout Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-zinc-900 to-blue-950/40 border border-[#5A8DFF]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold text-[#5A8DFF] flex items-center justify-center sm:justify-start gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Looking for Authorized Software Subscriptions?
          </div>
          <div className="text-xs text-zinc-300">
            Get 1-year commercial access keys for AI productivity, design suites, and cloud storage.
          </div>
        </div>

        <button
          onClick={() => navigate('/subscriptions')}
          className="px-5 py-2.5 btn-gradient-primary rounded-xl flex items-center gap-1.5 shrink-0 text-xs font-bold uppercase tracking-wider text-black"
        >
          View Subscriptions Catalog
          <ArrowUpRight className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter products..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#5A8DFF]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs py-1">
            {dynamicCategories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat === 'All') {
                      navigate('/digital-products');
                    } else {
                      navigate(`/digital-products/${getCategorySlug(cat)}`);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-bold ${
                    isSelected
                      ? 'btn-gradient-primary shadow-md'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
          <Package className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-white uppercase">No Products Found</h3>
          <p className="text-xs text-zinc-400">
            No items currently available in this category. Check back soon or browse all products.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigate('/digital-products');
            }}
            className="px-4 py-2 btn-gradient-primary rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const isWishlisted = wishlist.includes(prod.id);
            const catSlug = getCategorySlug(prod.category);
            const productUrl = `/digital-products/${catSlug}/${prod.slug}`;

            return (
              <TiltCard
                key={prod.id}
                className="h-full flex flex-col justify-between p-0 overflow-hidden bg-[#08080A] border border-white/10"
              >
                <div className="relative aspect-video bg-zinc-950 overflow-hidden rounded-t-2xl">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-md transition-colors z-20 ${
                      isWishlisted
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[#5A8DFF] text-[10px] font-bold border border-[#5A8DFF]/30">
                    {prod.category}
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{prod.rating}</span>
                      <span className="text-zinc-500">({prod.reviewsCount} reviews)</span>
                    </div>

                    <h3
                      onClick={() => navigate(productUrl)}
                      className="text-base font-bold text-white hover:text-[#5A8DFF] transition-colors line-clamp-2 cursor-pointer"
                    >
                      {prod.title}
                    </h3>

                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      {prod.originalPriceUSD && (
                        <span className="text-zinc-500 line-through text-[11px] block">
                          {formatPrice(prod.originalPriceUSD)}
                        </span>
                      )}
                      <span className="font-extrabold text-[#5A8DFF] text-base">
                        {formatPrice(prod.priceUSD)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(productUrl)}
                        className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-xs rounded-xl font-bold transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() =>
                          addToCart({
                            id: prod.id,
                            title: prod.title,
                            priceUSD: prod.priceUSD,
                            type: prod.isSubscription ? 'subscription' : 'product',
                            image: prod.images[0]
                          })
                        }
                        className="px-3.5 py-2 btn-gradient-primary rounded-xl text-xs flex items-center gap-1.5 font-bold text-black"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-black" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
