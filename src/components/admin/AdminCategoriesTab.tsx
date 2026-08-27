import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Plus, Trash2, Edit2, CheckCircle2, X, Sparkles, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { ServiceCategoryItem, ProductCategoryItem } from '../../types';

export const AdminCategoriesTab: React.FC = () => {
  const {
    serviceCategories,
    addServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    productCategories,
    addProductCategory,
    updateProductCategory,
    deleteProductCategory
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'services' | 'products'>('services');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Layers',
    badge: '',
    sortOrder: 1,
    isActive: true
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      icon: 'Layers',
      badge: '',
      sortOrder: (activeSubTab === 'services' ? serviceCategories.length : productCategories.length) + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ServiceCategoryItem | ProductCategoryItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      icon: item.icon || 'Layers',
      badge: item.badge || '',
      sortOrder: item.sortOrder || 1,
      isActive: item.isActive ?? true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (activeSubTab === 'services') {
      if (editingId) {
        await updateServiceCategory(editingId, form);
      } else {
        await addServiceCategory(form);
      }
    } else {
      if (editingId) {
        await updateProductCategory(editingId, form);
      } else {
        await addProductCategory(form);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#5A8DFF]/10 border border-[#5A8DFF]/20 flex items-center justify-center text-[#5A8DFF]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Category Architecture & Taxonomies</h2>
            <p className="text-xs text-zinc-400">Manage classification structures, filter badges, and sorting for Services and Digital Products.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add {activeSubTab === 'services' ? 'Service' : 'Product'} Category
        </button>
      </div>

      {/* Sub tabs toggle */}
      <div className="flex gap-2 p-1 bg-zinc-900 border border-white/10 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveSubTab('services')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'services' ? 'bg-[#F27D26] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Service Categories ({serviceCategories.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('products')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'products' ? 'bg-[#F27D26] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Product Categories ({productCategories.length})
        </button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(activeSubTab === 'services' ? serviceCategories : productCategories).map((cat) => (
          <div
            key={cat.id}
            className="p-5 bg-zinc-950/60 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">#{cat.sortOrder || 1}</span>
                <div className="flex items-center gap-1.5">
                  {cat.badge && (
                    <span className="px-2 py-0.5 bg-[#F27D26]/10 text-[#F27D26] text-[10px] font-black uppercase tracking-wider rounded-md border border-[#F27D26]/20">
                      {cat.badge}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      cat.isActive !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {cat.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-bold text-sm tracking-tight">{cat.name}</h3>
              <p className="text-xs text-zinc-400 line-clamp-2">{cat.description || 'No description provided.'}</p>
              <div className="text-[11px] font-mono text-zinc-500">slug: /{cat.slug}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => openEditModal(cat)}
                className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg transition-all"
                title="Edit Category"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${cat.name}"?`)) {
                    if (activeSubTab === 'services') deleteServiceCategory(cat.id);
                    else deleteProductCategory(cat.id);
                  }
                }}
                className="p-2 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 rounded-lg transition-all"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit' : 'Add'} {activeSubTab === 'services' ? 'Service' : 'Product'} Category
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. AI Engineering & Agents"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                    placeholder="ai-engineering"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                    placeholder="e.g. Popular, New"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="Brief description for SEO and UI filtering..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Sort Order #</label>
                  <input
                    type="number"
                    min={1}
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="rounded border-zinc-700 text-[#F27D26] focus:ring-[#F27D26] w-4 h-4"
                    />
                    Active & Published
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black font-black uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110"
                >
                  {editingId ? 'Update' : 'Save'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
