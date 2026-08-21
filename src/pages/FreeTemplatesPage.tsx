import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Download,
  Eye,
  Sparkles,
  ArrowRight,
  FileCode,
  Layers,
  Share2,
  FileText,
  Briefcase,
  Presentation,
  Check,
  ShieldCheck,
  X,
  Clock
} from 'lucide-react';
import {
  FREE_TEMPLATES_CATEGORIES
} from '../data/freeTemplatesData';
import { FreeTemplateItem } from '../types';
import { useApp } from '../context/AppContext';

interface FreeTemplatesPageProps {
  navigate: (path: string) => void;
  categoryFilter?: string;
}

export const FreeTemplatesPage: React.FC<FreeTemplatesPageProps> = ({
  navigate,
  categoryFilter
}) => {
  const { freeTemplates, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [previewTemplate, setPreviewTemplate] = useState<FreeTemplateItem | null>(null);

  // Sync state if categoryFilter prop changes
  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  // Escape key handler for preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewTemplate) {
        setPreviewTemplate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewTemplate]);

  const handleCategorySelect = (slug: string, path: string) => {
    setSelectedCategory(slug);
    navigate(path);
  };

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return freeTemplates
      .filter((item) => item.status === 'published' || item.status === 'coming_soon')
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all' || item.categorySlug === selectedCategory;
        const matchesSearch =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.fileFormat.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [freeTemplates, selectedCategory, searchQuery]);

  const handleDownload = (template: FreeTemplateItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (template.status === 'coming_soon' || !template.downloadUrl) {
      addToast(
        `"${template.title}" is currently in staging and will be released shortly.`,
        'info'
      );
      return;
    }

    // Trigger real verified file download
    const link = document.createElement('a');
    link.href = template.downloadUrl;
    link.download = template.downloadUrl.split('/').pop() || `${template.slug}-template`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Downloaded "${template.title}" (${template.fileSize})`, 'success');
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'website':
        return <FileCode className="w-3.5 h-3.5" />;
      case 'canva':
        return <Layers className="w-3.5 h-3.5" />;
      case 'social-media':
        return <Share2 className="w-3.5 h-3.5" />;
      case 'business':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'resume':
        return <FileText className="w-3.5 h-3.5" />;
      case 'presentation':
        return <Presentation className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-14 border-b border-white/10 bg-gradient-to-b from-[#0A0B10] to-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5A8DFF]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% FREE ASSETS & STARTERS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Free Templates
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-8">
              Professional templates you can download, customize and use for free.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Free Templates (e.g. HTML5, Resume, Pitch Deck, CSV)..."
                aria-label="Search Free Templates"
                className="w-full pl-12 pr-10 py-3.5 bg-zinc-900/90 border border-white/15 focus:border-[#5A8DFF] rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="sticky top-[64px] z-30 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist">
            {FREE_TEMPLATES_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategorySelect(cat.slug, cat.path)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#5A8DFF] text-black shadow-lg shadow-[#5A8DFF]/20 font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Active Filters / Result Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>
                {selectedCategory === 'all'
                  ? 'All Free Templates'
                  : FREE_TEMPLATES_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono font-normal">
                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
              </span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Real downloads and verified resources for modern creators, developers, and founders.
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleCategorySelect('all', '/free-templates')}
              className="text-xs text-[#5A8DFF] hover:underline font-bold"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Template Cards Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-900/40 rounded-2xl border border-white/10">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No templates found for "{searchQuery}"</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Try adjusting your search terms or explore all free template categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                navigate('/free-templates');
              }}
              className="px-5 py-2.5 btn-gradient-primary uppercase tracking-wider text-xs rounded-xl font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-[#5A8DFF]/40 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Card Image Preview */}
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
                    onClick={() => navigate(`/free-templates/${template.slug}`)}
                  >
                    <img
                      src={template.previewImage}
                      alt={`Preview of ${template.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Badge Top Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-black uppercase rounded shadow-md tracking-wider ${
                          template.status === 'coming_soon'
                            ? 'bg-amber-500/90 text-black'
                            : 'bg-[#5A8DFF] text-black'
                        }`}
                      >
                        {template.status === 'coming_soon' ? 'COMING SOON' : '100% FREE'}
                      </span>
                    </div>

                    {/* File Format Badge Top Right */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/10 text-zinc-300 text-[10px] font-bold rounded">
                        {template.fileFormat}
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        aria-label={`Quick preview for ${template.title}`}
                        className="px-3.5 py-1.5 bg-white text-black text-xs font-bold rounded-lg shadow hover:bg-zinc-200 flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Preview</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#5A8DFF]">
                        {template.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {template.fileSize}
                      </span>
                    </div>
                    <h3
                      onClick={() => navigate(`/free-templates/${template.slug}`)}
                      className="text-base font-bold text-white group-hover:text-[#5A8DFF] transition-colors leading-snug mb-2 cursor-pointer"
                    >
                      {template.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {template.shortDescription}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-1 mb-4">
                      {template.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-[#5A8DFF] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 border-t border-white/5 mt-auto flex items-center gap-2 pt-4">
                  <button
                    onClick={() => navigate(`/free-templates/${template.slug}`)}
                    className="flex-1 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  {template.status === 'coming_soon' ? (
                    <button
                      onClick={(e) => handleDownload(template, e)}
                      className="flex-1 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Coming Soon</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleDownload(template, e)}
                      className="flex-1 py-2.5 px-3 btn-gradient-primary rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post-Download / Discovery Lead-Gen Callout */}
        <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-[#0A0F1D] border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5A8DFF]/15 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] text-[11px] font-black uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CUSTOM IMPLEMENTATION & BRANDING</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Need a custom version?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              We can customize this template or create a complete website/business solution for you. Get a tailored development roadmap and fixed quote within 24 hours.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 btn-gradient-primary uppercase tracking-widest text-xs font-extrabold rounded-xl shadow-xl flex items-center gap-2 shrink-0 relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A8DFF]"
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-zinc-900 border border-white/15 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                    previewTemplate.status === 'coming_soon'
                      ? 'bg-amber-500/90 text-black'
                      : 'bg-[#5A8DFF] text-black'
                  }`}
                >
                  {previewTemplate.status === 'coming_soon' ? 'COMING SOON' : '100% FREE'}
                </span>
                <h4 id="preview-modal-title" className="text-sm font-bold text-white truncate max-w-md">
                  {previewTemplate.title}
                </h4>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                aria-label="Close preview"
                className="p-1 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                <img
                  src={previewTemplate.previewImage}
                  alt={`Full preview of ${previewTemplate.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#5A8DFF] uppercase tracking-wider">
                  {previewTemplate.category} • {previewTemplate.fileFormat}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  {previewTemplate.fullDescription}
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Included in this template:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewTemplate.features.map((f, i) => (
                    <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#5A8DFF] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-zinc-950 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const slug = previewTemplate.slug;
                  setPreviewTemplate(null);
                  navigate(`/free-templates/${slug}`);
                }}
                className="px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white"
              >
                View Full Details Page
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                {previewTemplate.status === 'coming_soon' ? (
                  <button
                    onClick={() => {
                      const t = previewTemplate;
                      setPreviewTemplate(null);
                      handleDownload(t);
                    }}
                    className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Coming Soon</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const t = previewTemplate;
                      setPreviewTemplate(null);
                      handleDownload(t);
                    }}
                    className="px-5 py-2 btn-gradient-primary uppercase tracking-wider text-xs font-black rounded-xl flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
