import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Filter, Search, FileText, Download, ExternalLink } from 'lucide-react';
import { MediaLibraryItem } from '../../types';

export const AdminMediaLibraryTab: React.FC = () => {
  const { mediaLibrary, addMediaItem, deleteMediaItem, uploadFileToStorage, addToast } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const category = filterCategory === 'all' ? 'general' : filterCategory;
      const { url } = await uploadFileToStorage(file, 'media', category);

      if (url) {
        await addMediaItem({
          fileName: file.name,
          fileUrl: url,
          fileType: file.type || 'application/octet-stream',
          fileSize: file.size,
          category,
          altText: file.name.replace(/\.[^/.]+$/, ''),
          storagePath: `media/${category}/${file.name}`
        });
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('File URL copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredItems = mediaLibrary.filter((item) => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Central Media & Asset Library</h2>
            <p className="text-xs text-zinc-400">Upload, organize, and retrieve direct CDN asset URLs for websites, brand packs, products, and blogs.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? 'Uploading...' : 'Upload Media File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-white/15 hover:border-[#F27D26]/50 bg-zinc-950/30 rounded-2xl text-center cursor-pointer transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400 group-hover:text-[#F27D26] group-hover:scale-110 transition-all mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-white">Drag & drop files here or click to browse</div>
        <p className="text-xs text-zinc-500 mt-1">Supports PNG, JPG, WebP, SVG, PDF, ZIP (Auto compressed & synced with Supabase storage)</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-zinc-900 border border-white/10 rounded-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['all', 'brand', 'portfolio', 'products', 'blog', 'templates', 'general'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-[#F27D26] text-black'
                  : 'text-zinc-400 hover:text-white bg-zinc-950/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full bg-zinc-950 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F27D26]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-zinc-950/60 border border-white/10 rounded-xl flex flex-col justify-between space-y-3 group hover:border-white/20 transition-all"
          >
            {/* Image / File Preview */}
            <div className="relative w-full h-36 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
              {item.fileType?.startsWith('image/') || item.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp|svg)/i) ? (
                <img
                  src={item.fileUrl}
                  alt={item.altText || item.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center p-3">
                  <FileText className="w-10 h-10 text-[#5A8DFF] mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">{item.fileName.split('.').pop()}</span>
                </div>
              )}

              <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-[9px] font-bold text-zinc-300 rounded uppercase">
                {item.category || 'general'}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-white truncate" title={item.fileName}>
                {item.fileName}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                <span>{item.fileSize ? formatBytes(item.fileSize) : 'Asset'}</span>
                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => copyToClipboard(item.fileUrl, item.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] font-bold rounded-lg transition-all"
                title="Copy Direct URL"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === item.id ? 'Copied' : 'Copy URL'}
              </button>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg transition-all"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${item.fileName}" from media library?`)) {
                    deleteMediaItem(item.id);
                  }
                }}
                className="p-1.5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 rounded-lg transition-all"
                title="Delete Media File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
