import React, { useState, useEffect } from 'react';
import {
  Download,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Share2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  FileCheck,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FreeTemplateDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const FreeTemplateDetailPage: React.FC<FreeTemplateDetailPageProps> = ({
  slug,
  navigate
}) => {
  const { freeTemplates, addToast } = useApp();

  const template = freeTemplates.find((t) => t.slug === slug);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (template) {
      setActiveImage(template.previewImage);
      // Dynamic Title & Meta
      document.title = template.seoTitle || `${template.title} — Free Download | BRANIFY`;
    }
  }, [template]);

  // If slug is not found in catalog, render dedicated 404 Not Found state
  if (!template) {
    return (
      <div className="min-h-[70vh] bg-[#050505] text-zinc-100 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-5 bg-zinc-900/60 border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Template Not Found</h1>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              The free template "{slug}" does not exist or may have been updated. Browse our full catalog below.
            </p>
          </div>
          <button
            onClick={() => navigate('/free-templates')}
            className="w-full py-3.5 btn-gradient-primary uppercase tracking-widest text-xs font-black rounded-xl cursor-pointer"
          >
            Back to Free Templates Catalog
          </button>
        </div>
      </div>
    );
  }

  const relatedTemplates = freeTemplates
    .filter((t) => t.status === 'published' || t.status === 'coming_soon')
    .filter((t) => t.slug !== template.slug && t.categorySlug === template.categorySlug)
    .slice(0, 3);

  const fallbackRelated =
    relatedTemplates.length > 0
      ? relatedTemplates
      : freeTemplates
          .filter((t) => t.status === 'published' || t.status === 'coming_soon')
          .filter((t) => t.slug !== template.slug)
          .slice(0, 3);

  const handleDownload = () => {
    if (template.status === 'coming_soon' || !template.downloadUrl) {
      addToast(
        `"${template.title}" is in final staging and will be released in the upcoming update.`,
        'info'
      );
      return;
    }

    const link = document.createElement('a');
    link.href = template.downloadUrl;
    link.download = template.downloadUrl.split('/').pop() || `${template.slug}-template`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Downloaded "${template.title}" (${template.fileSize})`, 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Template URL copied to clipboard!', 'info');
  };

  const allGalleryImages = [
    template.previewImage,
    ...(template.galleryImages || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 pb-20">
      {/* Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-zinc-950/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/free-templates')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Free Templates
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/free-templates/${template.categorySlug}`)}
              className="hover:text-[#5A8DFF] transition-colors cursor-pointer"
            >
              {template.category}
            </button>
            <span>/</span>
            <span className="text-zinc-200 font-semibold truncate max-w-xs">{template.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/free-templates')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Free Templates</span>
        </button>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Big Image Preview & Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl relative">
              <img
                src={activeImage || template.previewImage}
                alt={`Full resolution preview of ${template.title}`}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg ${
                    template.status === 'coming_soon'
                      ? 'bg-amber-500 text-black'
                      : 'bg-[#5A8DFF] text-black'
                  }`}
                >
                  {template.status === 'coming_soon' ? 'COMING SOON' : '100% FREE'}
                </span>
                <span className="px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-zinc-200 text-xs font-bold rounded-lg">
                  {template.fileFormat}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails (if multiple images) */}
            {allGalleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allGalleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === imgUrl
                        ? 'border-[#5A8DFF] scale-105 shadow-md'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Template Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900/60 border border-white/10 rounded-2xl text-center">
              <div>
                <div className="text-[10px] uppercase font-mono text-zinc-500">File Type</div>
                <div className="text-xs font-bold text-white mt-0.5">{template.fileFormat}</div>
              </div>
              <div className="border-x border-white/10">
                <div className="text-[10px] uppercase font-mono text-zinc-500">File Size</div>
                <div className="text-xs font-bold text-white mt-0.5">{template.fileSize}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-zinc-500">License</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5 line-clamp-1">
                  {template.license.includes('MIT') ? 'MIT License' : 'Free Download'}
                </div>
              </div>
            </div>

            {/* License Details Note */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 text-[11px] text-zinc-400">
              <span className="font-bold text-zinc-300">License terms: </span>
              {template.license}
            </div>

            {/* Optional Legal Disclaimer */}
            {template.disclaimer && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300/80 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Disclaimer: </span>
                  {template.disclaimer}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Template Info & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] text-xs font-bold uppercase tracking-wider">
                  {template.category}
                </span>
                <button
                  onClick={handleShare}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Share template"
                  aria-label="Share template link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                {template.title}
              </h1>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {template.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            {template.features && template.features.length > 0 && (
              <div className="p-5 bg-zinc-900/70 border border-white/10 rounded-2xl space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A8DFF]" />
                  <span>Key Features</span>
                </h2>
                <ul className="space-y-2">
                  {template.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8DFF] shrink-0 mt-1.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {template.whatsIncluded && template.whatsIncluded.length > 0 && (
              <div className="p-5 bg-zinc-900/70 border border-white/10 rounded-2xl space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>What's Included</span>
                </h2>
                <ul className="space-y-2">
                  {template.whatsIncluded.map((item, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {template.status === 'coming_soon' ? (
                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>IN STAGING — COMING SOON</span>
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="w-full py-4 btn-gradient-primary rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#5A8DFF]/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD 100% FREE</span>
                </button>
              )}

              <p className="text-[11px] text-zinc-500 text-center">
                Instant direct access • No email or registration required • Verified safe
              </p>
            </div>

            {/* Customization CTA Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#0A0D18] border border-[#5A8DFF]/30 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5A8DFF]" />
                <h3 className="text-sm font-bold text-white">
                  Need this customized for your business?
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                BRANIFY can customize the template or build a complete bespoke software or branding solution for you.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="w-full py-3 bg-[#5A8DFF]/15 hover:bg-[#5A8DFF] text-[#5A8DFF] hover:text-black border border-[#5A8DFF]/40 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A8DFF] cursor-pointer"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Free Templates */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">
                More Free Templates You Might Like
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Explore additional templates in {template.category} and related categories.
              </p>
            </div>
            <button
              onClick={() => navigate('/free-templates')}
              className="text-xs font-bold text-[#5A8DFF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Free Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackRelated.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/free-templates/${rel.slug}`);
                }}
                className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/10 hover:border-[#5A8DFF]/40 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-zinc-950 relative">
                    <img
                      src={rel.previewImage}
                      alt={`Preview of ${rel.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                          rel.status === 'coming_soon'
                            ? 'bg-amber-500/90 text-black'
                            : 'bg-[#5A8DFF] text-black'
                        }`}
                      >
                        {rel.status === 'coming_soon' ? 'COMING SOON' : '100% FREE'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] font-black uppercase text-[#5A8DFF] mb-1">
                      {rel.category}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#5A8DFF] transition-colors leading-snug line-clamp-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-[#5A8DFF]">
                  <span>{rel.status === 'coming_soon' ? 'View Details →' : 'Get Template →'}</span>
                  <span className="text-[10px] text-zinc-500 font-normal">{rel.fileFormat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
