import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  Upload,
  RefreshCw,
  ExternalLink,
  Shield,
  X,
  AlertTriangle,
  FileCode,
  Image as ImageIcon,
  Loader2,
  Check,
  FileArchive,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FreeTemplateItem, FreeTemplateStatus } from '../../types';
import { FREE_TEMPLATES_CATEGORIES } from '../../data/freeTemplatesData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface AdminFreeTemplatesTabProps {
  navigate: (path: string) => void;
}

function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function detectFileFormat(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'zip':
      return 'ZIP Archive (.zip)';
    case 'html':
    case 'htm':
      return 'HTML5 + Tailwind CSS';
    case 'pdf':
      return 'PDF Document (.pdf)';
    case 'docx':
    case 'doc':
      return 'Word Document (.docx)';
    case 'csv':
      return 'Comma-Separated Values (.csv)';
    case 'xlsx':
    case 'xls':
      return 'Excel Spreadsheet (.xlsx)';
    case 'pptx':
    case 'ppt':
      return 'PowerPoint Presentation (.pptx)';
    case 'fig':
      return 'Figma Design File (.fig)';
    case 'txt':
      return 'Plain Text / Markdown (.txt)';
    case 'json':
      return 'JSON Data Asset (.json)';
    default:
      return ext ? ext.toUpperCase() + ' File' : 'Document';
  }
}

export const AdminFreeTemplatesTab: React.FC<AdminFreeTemplatesTabProps> = ({ navigate }) => {
  const {
    freeTemplates,
    addFreeTemplate,
    updateFreeTemplate,
    deleteFreeTemplate,
    resetFreeTemplatesToDefault,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'sortOrder' | 'title' | 'createdAt'>('sortOrder');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewModalTemplate, setPreviewModalTemplate] = useState<FreeTemplateItem | null>(null);

  // Upload progress states
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Website Templates' as FreeTemplateItem['category'],
    categorySlug: 'website' as FreeTemplateItem['categorySlug'],
    shortDescription: '',
    fullDescription: '',
    fileFormat: 'ZIP Archive (.zip)',
    fileSize: '0 KB',
    downloadUrl: '',
    previewImage: '',
    galleryImages: [] as string[],
    featuresText: '',
    whatsIncludedText: '',
    license: 'MIT License — 100% Free for Commercial & Personal Use',
    disclaimer: '',
    status: 'published' as FreeTemplateStatus,
    featured: false,
    sortOrder: 1,
    tagsText: 'Templates, Free, Asset',
    seoTitle: '',
    metaDescription: '',
    seoKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });

  // Filtered & Sorted Templates
  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return freeTemplates
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all' || item.categorySlug === selectedCategory;
        const matchesStatus =
          selectedStatus === 'all' || item.status === selectedStatus;
        const matchesSearch =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.fileFormat.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'createdAt') {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });
  }, [freeTemplates, selectedCategory, selectedStatus, searchQuery, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: freeTemplates.length,
      published: freeTemplates.filter((t) => t.status === 'published').length,
      comingSoon: freeTemplates.filter((t) => t.status === 'coming_soon').length,
      drafts: freeTemplates.filter((t) => t.status === 'draft').length,
      archived: freeTemplates.filter((t) => t.status === 'archived').length
    };
  }, [freeTemplates]);

  const handleOpenAddModal = () => {
    setEditingTemplateId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Website Templates',
      categorySlug: 'website',
      shortDescription: '',
      fullDescription: '',
      fileFormat: 'ZIP Archive (.zip)',
      fileSize: '0 KB',
      downloadUrl: '',
      previewImage: '',
      galleryImages: [],
      featuresText: 'Clean modular structure\nProduction ready & fully customizable\nComprehensive documentation included',
      whatsIncludedText: '1x Complete template source archive\nSetup & installation instructions\nLicense & documentation',
      license: 'MIT License — 100% Free for Commercial & Personal Use',
      disclaimer: '',
      status: 'published',
      featured: false,
      sortOrder: freeTemplates.length + 1,
      tagsText: 'Free, Template, Asset, Production',
      seoTitle: '',
      metaDescription: '',
      seoKeywords: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (template: FreeTemplateItem) => {
    setEditingTemplateId(template.id);
    setFormData({
      title: template.title,
      slug: template.slug,
      category: template.category,
      categorySlug: template.categorySlug,
      shortDescription: template.shortDescription,
      fullDescription: template.fullDescription,
      fileFormat: template.fileFormat,
      fileSize: template.fileSize,
      downloadUrl: template.downloadUrl || '',
      previewImage: template.previewImage,
      galleryImages: template.galleryImages || [],
      featuresText: (template.features || []).join('\n'),
      whatsIncludedText: (template.whatsIncluded || []).join('\n'),
      license: template.license,
      disclaimer: template.disclaimer || '',
      status: template.status,
      featured: !!template.featured,
      sortOrder: template.sortOrder || 1,
      tagsText: (template.tags || []).join(', '),
      seoTitle: template.seoTitle || '',
      metaDescription: template.metaDescription || '',
      seoKeywords: template.seoKeywords || '',
      canonicalUrl: template.canonicalUrl || '',
      ogTitle: template.ogTitle || '',
      ogDescription: template.ogDescription || '',
      ogImage: template.ogImage || ''
    });
    setIsModalOpen(true);
  };

  const handleCategoryChange = (newCat: string) => {
    let catSlug: FreeTemplateItem['categorySlug'] = 'website';
    let format = 'ZIP Archive (.zip)';

    switch (newCat) {
      case 'Website Templates':
        catSlug = 'website';
        format = 'HTML5 + Tailwind CSS';
        break;
      case 'Canva Templates':
        catSlug = 'canva';
        format = 'Canva Template Link';
        break;
      case 'Social Media Templates':
        catSlug = 'social-media';
        format = 'Content Matrix (.csv)';
        break;
      case 'Business Templates':
        catSlug = 'business';
        format = 'Plain Text / Word Ready (.txt)';
        break;
      case 'Resume / CV Templates':
        catSlug = 'resume';
        format = 'ATS Plain Text / Markdown (.txt)';
        break;
      case 'Presentation Templates':
        catSlug = 'presentation';
        format = 'Investor Blueprint (.txt)';
        break;
      case 'Notion Templates':
        catSlug = 'notion';
        format = 'Notion Workspace Duplicate';
        break;
      case 'Spreadsheet Templates':
        catSlug = 'spreadsheet';
        format = 'Comma-Separated Values (.csv)';
        break;
    }

    setFormData((prev) => ({
      ...prev,
      category: newCat as any,
      categorySlug: catSlug,
      fileFormat: format
    }));
  };

  const handleTitleChange = (newTitle: string) => {
    const autoSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: editingTemplateId ? prev.slug : autoSlug,
      seoTitle: editingTemplateId ? prev.seoTitle : `${newTitle} — Free Download | BRANIFY`,
      ogTitle: editingTemplateId ? prev.ogTitle : `${newTitle} — Free Download | BRANIFY`
    }));
  };

  // Upload Download File to Supabase Storage Bucket 'free-template-files'
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeFormatted = formatFileSize(file.size);
    const detectedFormat = detectFileFormat(file.name);
    setIsUploadingFile(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `templates/${Date.now()}_${cleanName}`;

        const { error } = await supabase.storage
          .from('free-template-files')
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.warn('Storage bucket upload issue, using data reader fallback:', error);
          const reader = new FileReader();
          reader.onload = (ev) => {
            setFormData((prev) => ({
              ...prev,
              fileSize: sizeFormatted,
              fileFormat: detectedFormat,
              downloadUrl: ev.target?.result as string
            }));
            addToast(`Attached file "${file.name}" (${sizeFormatted})`, 'success');
          };
          reader.readAsDataURL(file);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('free-template-files')
            .getPublicUrl(storagePath);

          setFormData((prev) => ({
            ...prev,
            fileSize: sizeFormatted,
            fileFormat: detectedFormat,
            downloadUrl: publicUrlData.publicUrl
          }));
          addToast(`Uploaded "${file.name}" to Supabase Storage! (${sizeFormatted})`, 'success');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setFormData((prev) => ({
            ...prev,
            fileSize: sizeFormatted,
            fileFormat: detectedFormat,
            downloadUrl: ev.target?.result as string
          }));
          addToast(`Attached file "${file.name}" (${sizeFormatted})`, 'success');
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      addToast(`File upload failed: ${err?.message || 'Unknown error'}`, 'error');
    } finally {
      setIsUploadingFile(false);
    }
  };

  // Upload Main Preview Image to Supabase Storage Bucket 'free-template-previews'
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `previews/${Date.now()}_${cleanName}`;

        const { error } = await supabase.storage
          .from('free-template-previews')
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.warn('Storage bucket preview upload issue, using local reader:', error);
          const reader = new FileReader();
          reader.onload = (ev) => {
            const res = ev.target?.result as string;
            setFormData((prev) => ({
              ...prev,
              previewImage: res,
              ogImage: prev.ogImage || res
            }));
            addToast(`Selected preview image "${file.name}"`, 'success');
          };
          reader.readAsDataURL(file);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('free-template-previews')
            .getPublicUrl(storagePath);

          setFormData((prev) => ({
            ...prev,
            previewImage: publicUrlData.publicUrl,
            ogImage: prev.ogImage || publicUrlData.publicUrl
          }));
          addToast(`Uploaded preview image to Supabase Storage!`, 'success');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          setFormData((prev) => ({
            ...prev,
            previewImage: res,
            ogImage: prev.ogImage || res
          }));
          addToast(`Selected preview image "${file.name}"`, 'success');
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      addToast(`Image upload failed: ${err?.message || 'Unknown error'}`, 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Upload Additional Gallery Preview Images
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    const newUploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (isSupabaseConfigured() && supabase) {
          const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const storagePath = `gallery/${Date.now()}_${i}_${cleanName}`;

          const { error } = await supabase.storage
            .from('free-template-previews')
            .upload(storagePath, file, { cacheControl: '3600', upsert: true });

          if (!error) {
            const { data: pUrl } = supabase.storage
              .from('free-template-previews')
              .getPublicUrl(storagePath);
            newUploadedUrls.push(pUrl.publicUrl);
          }
        }
      }

      if (newUploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...newUploadedUrls]
        }));
        addToast(`Uploaded ${newUploadedUrls.length} gallery image(s)`, 'success');
      }
    } catch (err: any) {
      addToast(`Gallery upload issue: ${err?.message || 'Error'}`, 'error');
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      addToast('Please enter a template title', 'error');
      return;
    }

    if (!formData.previewImage.trim()) {
      addToast('Please upload or provide a preview image for this template', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const features = formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const whatsIncluded = formData.whatsIncludedText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const tags = formData.tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      if (editingTemplateId) {
        await updateFreeTemplate(editingTemplateId, {
          title: formData.title,
          slug: formData.slug,
          category: formData.category,
          categorySlug: formData.categorySlug,
          shortDescription: formData.shortDescription,
          fullDescription: formData.fullDescription,
          fileFormat: formData.fileFormat,
          fileSize: formData.fileSize,
          downloadUrl: formData.downloadUrl || undefined,
          previewImage: formData.previewImage,
          galleryImages: formData.galleryImages,
          features,
          whatsIncluded,
          license: formData.license,
          disclaimer: formData.disclaimer || undefined,
          status: formData.status,
          featured: formData.featured,
          sortOrder: Number(formData.sortOrder) || 1,
          tags,
          seoTitle: formData.seoTitle || undefined,
          metaDescription: formData.metaDescription || undefined,
          seoKeywords: formData.seoKeywords || undefined,
          canonicalUrl: formData.canonicalUrl || undefined,
          ogTitle: formData.ogTitle || undefined,
          ogDescription: formData.ogDescription || undefined,
          ogImage: formData.ogImage || undefined
        });
      } else {
        await addFreeTemplate({
          title: formData.title,
          slug: formData.slug,
          category: formData.category,
          categorySlug: formData.categorySlug,
          shortDescription: formData.shortDescription,
          fullDescription: formData.fullDescription,
          fileFormat: formData.fileFormat,
          fileSize: formData.fileSize,
          downloadUrl: formData.downloadUrl || undefined,
          previewImage: formData.previewImage,
          galleryImages: formData.galleryImages,
          features,
          whatsIncluded,
          license: formData.license,
          disclaimer: formData.disclaimer || undefined,
          isFree: true,
          status: formData.status,
          featured: formData.featured,
          sortOrder: Number(formData.sortOrder) || freeTemplates.length + 1,
          tags,
          seoTitle: formData.seoTitle || undefined,
          metaDescription: formData.metaDescription || undefined,
          seoKeywords: formData.seoKeywords || undefined,
          canonicalUrl: formData.canonicalUrl || undefined,
          ogTitle: formData.ogTitle || undefined,
          ogDescription: formData.ogDescription || undefined,
          ogImage: formData.ogImage || undefined
        });
      }

      setIsModalOpen(false);
    } catch (err: any) {
      addToast(`Error saving template: ${err?.message || 'Unknown error'}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (deleteConfirmId) {
      await deleteFreeTemplate(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const getStatusBadge = (status: FreeTemplateStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Published
          </span>
        );
      case 'coming_soon':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-zinc-700/30 text-zinc-400 border border-zinc-700/50">
            <Edit2 className="w-3 h-3" />
            Draft
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Archive className="w-3 h-3" />
            Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#5A8DFF]/15 border border-[#5A8DFF]/30 text-[#5A8DFF] text-[10px] font-black uppercase tracking-widest">
                SUPABASE STORAGE &amp; CATALOG ENGINE
              </span>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                Free Templates Manager
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Upload real template archives (.zip, .pdf, .csv, .fig), configure metadata, upload preview assets, and publish to the live BRANIFY store.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#5A8DFF] hover:bg-blue-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-[#5A8DFF]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Free Template
            </button>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Reset all Free Templates to the official high-quality starter defaults? Custom templates will be overwritten.'
                  )
                ) {
                  resetFreeTemplatesToDefault();
                }
              }}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold rounded-xl border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset templates catalog to verified default assets"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <button
              onClick={() => navigate('/free-templates')}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-[#5A8DFF] text-xs font-bold rounded-xl border border-[#5A8DFF]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="View public free templates catalog"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Catalog ↗
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/5">
          <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Total Templates
            </div>
            <div className="text-2xl font-black text-white mt-1">{stats.total}</div>
          </div>
          <div className="bg-zinc-950/60 border border-emerald-500/10 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Live Published
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{stats.published}</div>
          </div>
          <div className="bg-zinc-950/60 border border-amber-500/10 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Coming Soon
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">{stats.comingSoon}</div>
          </div>
          <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Drafts / Archived
            </div>
            <div className="text-2xl font-black text-zinc-400 mt-1">
              {stats.drafts + stats.archived}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates by title, slug, tag, or format..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#5A8DFF]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter templates by category"
            className="px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#5A8DFF]"
          >
            <option value="all">All Categories</option>
            {FREE_TEMPLATES_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter templates by status"
            className="px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#5A8DFF]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="coming_soon">Coming Soon</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort templates by criteria"
            className="px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#5A8DFF]"
          >
            <option value="sortOrder">Sort Order (Default)</option>
            <option value="title">Title (A-Z)</option>
            <option value="createdAt">Date Created (Newest)</option>
          </select>
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {filteredTemplates.length === 0 ? (
          <div className="p-12 bg-[#080808] border border-white/10 rounded-2xl text-center space-y-3">
            <Sparkles className="w-8 h-8 text-zinc-600 mx-auto" />
            <div className="text-sm font-bold text-white">No templates found</div>
            <p className="text-xs text-zinc-500">
              Try modifying your search filter or upload a new free template to the catalog.
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[#080808] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left Column: Image Preview + Title + Badges */}
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                {/* Thumbnail Preview */}
                <div
                  onClick={() => setPreviewModalTemplate(template)}
                  className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-zinc-950 border border-white/10 shrink-0 cursor-pointer group relative"
                  title="Click to view full preview"
                >
                  <img
                    src={template.previewImage}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                      {template.title}
                    </h3>
                    {template.featured && (
                      <span className="px-2 py-0.5 bg-[#5A8DFF]/20 text-[#5A8DFF] border border-[#5A8DFF]/40 text-[9px] font-black uppercase rounded-md">
                        Featured
                      </span>
                    )}
                    {getStatusBadge(template.status)}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
                    <span className="font-medium text-[#5A8DFF]">{template.category}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-zinc-400">
                      {template.fileFormat}
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-zinc-400">{template.fileSize}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px] text-zinc-400">/{template.slug}</span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                    {template.shortDescription}
                  </p>
                </div>
              </div>

              {/* Right Column: Quick Status Toggles & Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {/* Download Verifier Button */}
                {template.downloadUrl ? (
                  <a
                    href={template.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-colors"
                    title="Verify / Test Download Asset"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                ) : (
                  <span
                    className="p-2 bg-zinc-900/60 text-zinc-600 rounded-xl text-xs border border-white/5"
                    title="No download asset attached"
                  >
                    <Download className="w-4 h-4" />
                  </span>
                )}

                {/* View Live Detail Page */}
                <button
                  onClick={() => navigate(`/free-templates/${template.slug}`)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 rounded-xl transition-colors cursor-pointer"
                  title="View Public Details Page"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEditModal(template)}
                  className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-[#5A8DFF] hover:bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Edit Template"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {/* Quick Status Dropdown */}
                <select
                  value={template.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as FreeTemplateStatus;
                    updateFreeTemplate(template.id, { status: newStatus });
                  }}
                  aria-label={`Change status for template ${template.title}`}
                  className="px-2.5 py-1.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#5A8DFF] cursor-pointer"
                >
                  <option value="published">Published</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteConfirmId(template.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
                  title="Delete Template"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-rose-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 rounded-xl bg-rose-500/10">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Free Template?</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Are you sure you want to delete this template from the catalog? This will remove the record and public access.
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-zinc-900 text-zinc-400 text-xs font-bold rounded-xl hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase rounded-xl cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Template Full Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0c0c0c] border border-white/15 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative text-left max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-[#0c0c0c] z-10">
              <div>
                <span className="text-[10px] font-black text-[#5A8DFF] uppercase tracking-widest">
                  MANUAL ASSET UPLOAD &amp; MANAGEMENT
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {editingTemplateId ? 'Edit Free Template' : 'Add New Free Template'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-5">
              {/* SECTION 1: GENERAL INFORMATION */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#5A8DFF] uppercase tracking-wider">
                  1. General Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Template Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Modern SaaS Landing Page Starter"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5A8DFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. modern-saas-landing-page"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-[#5A8DFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#5A8DFF]"
                    >
                      {FREE_TEMPLATES_CATEGORIES.filter((c) => c.slug !== 'all').map((c) => (
                        <option key={c.slug} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as any })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#5A8DFF]"
                    >
                      <option value="published">Published (Live Catalog)</option>
                      <option value="coming_soon">Coming Soon (Staging)</option>
                      <option value="draft">Draft (Admin Only)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, sortOrder: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#5A8DFF]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#5A8DFF] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="featured-checkbox"
                    className="text-xs text-zinc-300 font-bold cursor-pointer"
                  >
                    Feature this template at top of catalog
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                    Short Description (Card Summary) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    placeholder="1-sentence summary for cards and search"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5A8DFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                    Full Description (Detail Page Overview) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, fullDescription: e.target.value })
                    }
                    placeholder="Comprehensive description of what the template is, use cases, and how to use it..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5A8DFF]"
                  />
                </div>
              </div>

              {/* SECTION 2: TEMPLATE ASSETS (MANUAL UPLOAD) */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <span>2. Template Download File &amp; Asset Attachment</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Bucket: free-template-files
                  </span>
                </div>

                {/* Upload or Attach File */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                        File Format Label
                      </label>
                      <input
                        type="text"
                        value={formData.fileFormat}
                        onChange={(e) =>
                          setFormData({ ...formData, fileFormat: e.target.value })
                        }
                        placeholder="e.g. ZIP Archive (.zip), HTML5, CSV, Figma (.fig)"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                        File Size Label
                      </label>
                      <input
                        type="text"
                        value={formData.fileSize}
                        onChange={(e) =>
                          setFormData({ ...formData, fileSize: e.target.value })
                        }
                        placeholder="e.g. 14.2 MB, 350 KB, Cloud Access"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Download File Asset (Manual Upload or URL)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={formData.downloadUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, downloadUrl: e.target.value })
                        }
                        placeholder="Direct URL or click 'Upload File' to select your real .zip / .pdf / .html asset"
                        className="flex-1 px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white font-mono"
                      />
                      <label className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                        {isUploadingFile ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploadingFile ? 'Uploading...' : 'Upload File'}</span>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          disabled={isUploadingFile}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Supports ZIP, PDF, HTML, CSV, DOCX, XLSX, PPTX, Figma, etc. Uploaded files are securely stored in Supabase Storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: VISUAL PREVIEW & GALLERY (MANUAL UPLOAD) */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-[#5A8DFF] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>3. Preview Images &amp; Mockup Assets</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Bucket: free-template-previews
                  </span>
                </div>

                {/* Main Preview Image */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                    Main Preview Image * (16:9 or 4:3 high-res mockup)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={formData.previewImage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              previewImage: e.target.value,
                              ogImage: formData.ogImage || e.target.value
                            })
                          }
                          placeholder="Paste image URL, CDN link, or click 'Upload Image'"
                          className="flex-1 px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white font-mono"
                        />
                        <label className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl border border-white/10 flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                          {isUploadingImage ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{isUploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {formData.previewImage && (
                      <div className="w-28 h-18 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                        <img
                          src={formData.previewImage}
                          alt="Main preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Gallery Images */}
                <div className="pt-3 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase">
                      Additional Preview Images (Optional Gallery)
                    </label>
                    <label className="text-[10px] text-[#5A8DFF] hover:underline flex items-center gap-1 cursor-pointer">
                      <Plus className="w-3 h-3" />
                      <span>Add Gallery Image(s)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        disabled={isUploadingGallery}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {formData.galleryImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden bg-black border border-white/10 group"
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-600 text-white rounded-md transition-colors"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-zinc-600 italic">
                      No additional gallery images attached.
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 4: FEATURES & WHAT'S INCLUDED */}
              <div className="space-y-4">
                <div className="text-[11px] font-black text-[#5A8DFF] uppercase tracking-wider">
                  4. Template Specifications
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Key Features (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.featuresText}
                      onChange={(e) =>
                        setFormData({ ...formData, featuresText: e.target.value })
                      }
                      placeholder="Clean modular structure&#10;Zero dependencies&#10;Fully responsive layout"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5A8DFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      What's Included (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.whatsIncludedText}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsIncludedText: e.target.value })
                      }
                      placeholder="1x Complete source archive&#10;Documentation &amp; quickstart guide&#10;Commercial license agreement"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5A8DFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      License Terms *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.license}
                      onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                      placeholder="e.g. MIT License — 100% Free for Commercial & Personal Use"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tagsText}
                      onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                      placeholder="HTML5, Tailwind, Web, Free, Landing Page"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                    Legal Disclaimer (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.disclaimer}
                    onChange={(e) => setFormData({ ...formData, disclaimer: e.target.value })}
                    placeholder="e.g. For general informational and drafting purposes only. Does not constitute legal advice."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600"
                  />
                </div>
              </div>

              {/* SECTION 5: SEO & OPENGRAPH METADATA */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-[11px] font-black text-[#F27D26] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>5. SEO &amp; OpenGraph Metadata</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Template Title — Free Download | BRANIFY"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      SEO Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) =>
                        setFormData({ ...formData, seoKeywords: e.target.value })
                      }
                      placeholder="free template, landing page, download"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                    placeholder="Download this free production template from BRANIFY..."
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      OG Title
                    </label>
                    <input
                      type="text"
                      value={formData.ogTitle}
                      onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                      placeholder="OpenGraph title for social media cards"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                      OG Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="Leave blank to use main preview image"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#0c0c0c] py-2 z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingFile || isUploadingImage}
                  className="px-6 py-2.5 bg-[#5A8DFF] hover:bg-blue-400 text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#5A8DFF]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingTemplateId ? 'Save Changes' : 'Publish Template'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Preview Image Modal */}
      {previewModalTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewModalTemplate(null)}
        >
          <div
            className="bg-zinc-950 border border-white/15 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white">{previewModalTemplate.title}</h4>
              <button
                onClick={() => setPreviewModalTemplate(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
              <img
                src={previewModalTemplate.previewImage}
                alt={previewModalTemplate.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-zinc-400">
                {previewModalTemplate.category} • {previewModalTemplate.fileFormat} •{' '}
                {previewModalTemplate.fileSize}
              </span>
              <button
                onClick={() => setPreviewModalTemplate(null)}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
