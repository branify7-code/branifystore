import React, { useMemo, useState } from 'react';
import { Search, Sparkles, ArrowUpRight, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const AI_TOOLS = [
  // Chat Assistants
  { name: "ChatGPT", desc: "General-purpose AI assistant for writing, coding, research, and images.", category: "Chat Assistants", pricing: "Freemium", url: "https://chat.openai.com" },
  { name: "Claude", desc: "AI assistant strong at writing, coding, and reasoning-heavy tasks.", category: "Chat Assistants", pricing: "Freemium", url: "https://claude.ai" },
  { name: "Gemini", desc: "Google's AI assistant, integrated with Gmail, Docs, and Sheets.", category: "Chat Assistants", pricing: "Freemium", url: "https://gemini.google.com" },
  { name: "Grok", desc: "AI chatbot with fact-checking and image/video generation.", category: "Chat Assistants", pricing: "Freemium", url: "https://grok.com" },

  // Writing & Content
  { name: "Jasper", desc: "AI writing assistant for marketing and long-form content.", category: "Writing & Content", pricing: "Paid", url: "https://www.jasper.ai" },
  { name: "Copy.ai", desc: "AI copywriting tool for ads, emails, and product descriptions.", category: "Writing & Content", pricing: "Freemium", url: "https://www.copy.ai" },
  { name: "Grammarly", desc: "AI-powered grammar, tone, and clarity checker.", category: "Writing & Content", pricing: "Freemium", url: "https://www.grammarly.com" },

  // Image Generation
  { name: "Midjourney", desc: "AI image generator known for stylized, artistic visuals.", category: "Image Generation", pricing: "Paid", url: "https://www.midjourney.com" },
  { name: "Leonardo.Ai", desc: "AI image generator with a generous free daily token tier.", category: "Image Generation", pricing: "Freemium", url: "https://leonardo.ai" },
  { name: "Ideogram", desc: "AI image generator that renders text accurately inside images.", category: "Image Generation", pricing: "Freemium", url: "https://ideogram.ai" },
  { name: "Adobe Firefly", desc: "Adobe's generative AI for images and design assets.", category: "Image Generation", pricing: "Freemium", url: "https://firefly.adobe.com" },

  // Video Generation
  { name: "Runway", desc: "AI video generation and editing platform.", category: "Video Generation", pricing: "Freemium", url: "https://runwayml.com" },
  { name: "Synthesia", desc: "Creates business and training videos from text scripts.", category: "Video Generation", pricing: "Paid", url: "https://www.synthesia.io" },
  { name: "Veo", desc: "Google's AI video generator from text or image prompts.", category: "Video Generation", pricing: "Freemium", url: "https://deepmind.google/technologies/veo/" },

  // Voice & Audio
  { name: "ElevenLabs", desc: "Realistic AI voice generation, cloning, and text-to-speech.", category: "Voice & Audio", pricing: "Freemium", url: "https://elevenlabs.io" },
  { name: "Murf AI", desc: "AI voiceover generator for videos and presentations.", category: "Voice & Audio", pricing: "Freemium", url: "https://murf.ai" },

  // Coding
  { name: "GitHub Copilot", desc: "AI pair programmer that suggests code as you type.", category: "Coding", pricing: "Paid", url: "https://github.com/features/copilot" },
  { name: "Cursor", desc: "AI-first code editor that understands your whole codebase.", category: "Coding", pricing: "Freemium", url: "https://www.cursor.com" },
  { name: "Replit", desc: "Browser-based AI coding environment with instant deployment.", category: "Coding", pricing: "Freemium", url: "https://replit.com" },

  // No-code Builders
  { name: "Lovable", desc: "Builds full web apps — frontend, backend, database — from prompts.", category: "No-code Builders", pricing: "Freemium", url: "https://lovable.dev" },
  { name: "Bolt", desc: "Generates full-stack web apps from natural language in seconds.", category: "No-code Builders", pricing: "Freemium", url: "https://bolt.new" },

  // Productivity & Research
  { name: "Perplexity", desc: "AI answer engine that cites sources for research queries.", category: "Productivity & Research", pricing: "Freemium", url: "https://www.perplexity.ai" },
  { name: "NotebookLM", desc: "Answers questions grounded in your own uploaded documents.", category: "Productivity & Research", pricing: "Free", url: "https://notebooklm.google" },
  { name: "Gamma", desc: "Turns notes and outlines into polished presentations.", category: "Productivity & Research", pricing: "Freemium", url: "https://gamma.app" },

  // Automation
  { name: "Zapier", desc: "No-code AI workflow automation across thousands of apps.", category: "Automation", pricing: "Freemium", url: "https://zapier.com" },
  { name: "n8n", desc: "Developer-friendly workflow automation with AI steps.", category: "Automation", pricing: "Freemium", url: "https://n8n.io" },
];

const CATEGORIES = ["All", ...Array.from(new Set(AI_TOOLS.map((t) => t.category)))];

interface AIToolsPageProps {
  navigate: (path: string) => void;
}

export const AIToolsPage: React.FC<AIToolsPageProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.desc.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="27+ AI Tools for Work & Productivity | BRANIFY"
        description="Discover useful AI tools for productivity, business, content, design and everyday workflows from BRANIFY."
        canonicalPath="/ai-tools"
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-zinc-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#5A8DFF]" />
          <span>Curated AI Directory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
          AI <span className="text-[#5A8DFF]">Tools</span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Discover and explore 27+ top-tier artificial intelligence tools for writing, coding, image generation, video creation, and automation.
        </p>
      </div>

      {/* Controls: Search & Category Filters */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search AI tools by name, feature, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5A8DFF] transition-all shadow-xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#5A8DFF] text-black shadow-lg shadow-[#5A8DFF]/20"
                  : "bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/20"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const pricingLower = tool.pricing.toLowerCase();
          const badgeStyle =
            pricingLower === "free"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : pricingLower === "freemium"
              ? "bg-[#5A8DFF]/20 text-[#5A8DFF] border border-[#5A8DFF]/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30";

          return (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#12131A] hover:bg-zinc-900/90 border border-white/10 hover:border-[#5A8DFF]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5A8DFF]/0 group-hover:via-[#5A8DFF] to-transparent transition-all duration-500" />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5A8DFF]">
                      {tool.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#5A8DFF] transition-colors flex items-center gap-2">
                      {tool.name}
                      <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[#5A8DFF] transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-wider shrink-0 ${badgeStyle}`}>
                    {tool.pricing}
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                <span className="font-mono text-[11px] text-zinc-500 truncate max-w-[200px]">
                  {tool.url.replace('https://', '')}
                </span>
                <span className="flex items-center gap-1 text-[#5A8DFF] font-extrabold text-xs">
                  Visit Tool <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </a>
          );
        })}

        {filteredTools.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-3 bg-zinc-950/40 border border-white/10 rounded-2xl">
            <Sparkles className="w-8 h-8 text-zinc-600 mx-auto animate-pulse" />
            <p className="text-zinc-400 font-semibold text-sm">No AI tools found matching your search query.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="px-4 py-2 bg-[#5A8DFF]/10 border border-[#5A8DFF]/30 text-[#5A8DFF] rounded-xl text-xs font-bold hover:bg-[#5A8DFF] hover:text-black transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
