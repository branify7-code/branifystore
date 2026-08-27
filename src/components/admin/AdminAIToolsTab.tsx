import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Plus, Trash2, Edit2, ExternalLink, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { AIToolItem } from '../../types';

export const AdminAIToolsTab: React.FC = () => {
  const { aiTools, addAITool, updateAITool, deleteAITool } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: 'Autonomous Agents',
    categorySlug: 'agents',
    badge: 'Popular',
    tagline: '',
    description: '',
    icon: 'Bot',
    url: '',
    status: 'live' as AIToolItem['status'],
    sortOrder: 1,
    featured: true,
    isPublic: true
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      category: 'Autonomous Agents',
      categorySlug: 'agents',
      badge: 'New',
      tagline: '',
      description: '',
      icon: 'Bot',
      url: '',
      status: 'live',
      sortOrder: aiTools.length + 1,
      featured: true,
      isPublic: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (tool: AIToolItem) => {
    setEditingId(tool.id);
    setForm({
      name: tool.name,
      slug: tool.slug,
      category: tool.category,
      categorySlug: tool.categorySlug || 'agents',
      badge: tool.badge || '',
      tagline: tool.tagline || '',
      description: tool.description || '',
      icon: tool.icon || 'Bot',
      url: tool.url || '',
      status: tool.status || 'live',
      sortOrder: tool.sortOrder || 1,
      featured: tool.featured ?? true,
      isPublic: tool.isPublic ?? true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      await updateAITool(editingId, form);
    } else {
      await addAITool(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950/60 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Tools & Autonomous Ecosystem Directory</h2>
            <p className="text-xs text-zinc-400">Manage internal AI agents, prompt suites, workflows, and external ecosystem tools.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F27D26] to-[#FF9D42] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#F27D26]/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add AI Tool
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiTools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 bg-zinc-950/60 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">#{tool.sortOrder || 1}</span>
                <div className="flex items-center gap-1.5">
                  {tool.badge && (
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-wider rounded-md border border-purple-500/20">
                      {tool.badge}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                      tool.status === 'live'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : tool.status === 'beta'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-[#F27D26]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">{tool.name}</h3>
                  <div className="text-[10px] text-zinc-500">{tool.category}</div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2">{tool.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="text-[10px] font-mono text-zinc-500 truncate max-w-[150px]">
                {tool.url || 'No URL'}
              </div>
              <div className="flex items-center gap-1">
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => openEditModal(tool)}
                  className="p-1.5 hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete "${tool.name}"?`)) deleteAITool(tool.id);
                  }}
                  className="p-1.5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">{editingId ? 'Edit' : 'Add'} AI Tool</h3>
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
                <label className="block text-zinc-400 font-semibold mb-1">Tool Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. Branify NeuroAgent Studio"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  >
                    <option value="Autonomous Agents">Autonomous Agents</option>
                    <option value="Prompt Suites">Prompt Suites</option>
                    <option value="Code Generators">Code Generators</option>
                    <option value="Voice & Media AI">Voice & Media AI</option>
                    <option value="Enterprise Workflows">Enterprise Workflows</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                    placeholder="e.g. Popular, v2.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="e.g. Multi-agent code synthesis & audit engine"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="Detailed description of tool capabilities..."
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Destination URL / Deep Link</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F27D26]"
                  >
                    <option value="live">Live / Production</option>
                    <option value="beta">Beta Access</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
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
                  {editingId ? 'Update' : 'Save'} AI Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
