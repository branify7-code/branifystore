import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { SEOHead } from '../components/SEOHead';
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Download,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Layers,
  FileCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';

interface DigitalProductDetailPageProps {
  navigate: (path: string) => void;
  categorySlug?: string;
  productSlug: string;
}

export const DigitalProductDetailPage: React.FC<DigitalProductDetailPageProps> = ({
  navigate,
  categorySlug,
  productSlug
}) => {
  const { products, formatPrice, addToCart, wishlist, toggleWishlist, addToast } = useApp();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === productSlug || p.id === productSlug
  );

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-black text-white uppercase">Product Not Found</h1>
        <p className="text-zinc-400 text-sm">
          The requested digital product could not be located or has been unpublished.
        </p>
        <button
          onClick={() => navigate('/digital-products')}
          className="px-6 py-3 btn-gradient-primary rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Digital Products
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'success');
    }
  };

  const productCanonical = categorySlug
    ? `/digital-products/${categorySlug}/${product.slug}`
    : `/digital-products/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${product.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title={`${product.title} — Digital Template & Asset | BRANIFY`}
        description={`${product.description} Instant download with commercial license, lifetime updates, and documentation.`}
        canonicalPath={productCanonical}
        ogType="product"
        ogImage={product.images[0] || product.thumbnailUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Digital Products', url: '/digital-products' },
          { name: product.category, url: `/digital-products/${categorySlug || product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
          { name: product.title, url: productCanonical }
        ]}
        productSchema={{
          name: product.title,
          description: product.description,
          price: product.priceUSD || 0,
          currency: 'USD',
          sku: product.id,
          image: product.images[0] || product.thumbnailUrl,
          category: product.category
        }}
      />
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 overflow-x-auto whitespace-nowrap py-1">
        <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
        <button onClick={() => navigate('/digital-products')} className="hover:text-white transition-colors">
          Digital Products
        </button>
        {categorySlug && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <button
              onClick={() => navigate(`/digital-products/${categorySlug}`)}
              className="hover:text-white transition-colors capitalize"
            >
              {categorySlug.replace(/-/g, ' ')}
            </button>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
        <span className="text-zinc-200 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video sm:aspect-[16/10] bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-2xl border backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-lg'
                  : 'bg-zinc-950/70 border-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Add to Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md text-[#5A8DFF] text-xs font-bold border border-[#5A8DFF]/30">
              {product.category}
            </div>
          </div>

          {/* Thumbnail Strip if multiple images */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-[#5A8DFF] shadow-md scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* What's Included & Details */}
          <div className="bg-[#08080A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#5A8DFF]" />
              <span>What's Included in this Asset Pack</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {product.features && product.features.length > 0 ? (
                product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/5">
                    <Check className="w-4 h-4 text-[#5A8DFF] shrink-0 mt-0.5" />
                    <span className="text-zinc-200">{feat}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/5">
                    <Check className="w-4 h-4 text-[#5A8DFF] shrink-0 mt-0.5" />
                    <span className="text-zinc-200">Full Commercial License & Redistribution Rights</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/5">
                    <Check className="w-4 h-4 text-[#5A8DFF] shrink-0 mt-0.5" />
                    <span className="text-zinc-200">Instant Download & Free Lifetime Updates</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Pricing, CTA & Metadata */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#08080A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} verified downloads)</span>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-white/10 transition-colors"
                  title="Share Product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {product.title}
              </h1>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                  Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#5A8DFF]">
                    {formatPrice(product.priceUSD)}
                  </span>
                  {product.originalPriceUSD && (
                    <span className="text-sm text-zinc-500 line-through">
                      {formatPrice(product.originalPriceUSD)}
                    </span>
                  )}
                </div>
              </div>

              <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                Instant Access
              </span>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    title: product.title,
                    priceUSD: product.priceUSD,
                    type: product.isSubscription ? 'subscription' : 'product',
                    image: product.images[0]
                  });
                  navigate('/cart');
                }}
                className="w-full py-4 btn-gradient-primary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>Buy Now & Instant Download</span>
              </button>

              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    title: product.title,
                    priceUSD: product.priceUSD,
                    type: product.isSubscription ? 'subscription' : 'product',
                    image: product.images[0]
                  });
                  addToast(`Added "${product.title}" to cart!`, 'success');
                }}
                className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs rounded-2xl transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Virus-free verified digital asset & documentation.</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#5A8DFF] shrink-0" />
                <span>Immediate delivery link sent upon checkout completion.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Related {product.category}
            </h2>
            <button
              onClick={() => navigate('/digital-products')}
              className="text-xs text-[#5A8DFF] hover:underline font-bold"
            >
              Browse All Products →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <TiltCard key={rel.id} className="h-full flex flex-col justify-between p-5 space-y-4">
                <div className="aspect-video bg-zinc-950 rounded-2xl overflow-hidden">
                  <img src={rel.images[0]} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3
                    onClick={() => navigate(`/digital-products/${rel.slug}`)}
                    className="text-sm font-bold text-white hover:text-[#5A8DFF] transition-colors cursor-pointer line-clamp-1"
                  >
                    {rel.title}
                  </h3>
                  <span className="text-xs text-[#5A8DFF] font-black">{formatPrice(rel.priceUSD)}</span>
                </div>
                <button
                  onClick={() => navigate(`/digital-products/${rel.slug}`)}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  View Details
                </button>
              </TiltCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
