import React from 'react';
import { ArrowUpRight, Calendar, Tag, Star } from 'lucide-react';
import { ScreenshotFrame } from './ScreenshotFrame';
import type { PortfolioItem } from '../types';

export const PortfolioCard: React.FC<{
  item: PortfolioItem;
  onView: (slug: string) => void;
}> = ({ item, onView }) => {
  return (
    <article
      onClick={() => onView(item.slug)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E14] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E2C27B]/40 hover:shadow-2xl hover:shadow-[#E2C27B]/10"
    >
      {/* Featured ribbon */}
      {item.featured && (
        <div className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-[#E2C27B] px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#E2C27B]/40">
          <Star className="h-2.5 w-2.5 fill-current" /> Featured
        </div>
      )}

      {/* Screenshot — COMPLETE, never cropped, scrollable mini-browser */}
      <div className="p-3">
        <ScreenshotFrame
          src={item.coverImage}
          alt={`${item.title} — complete full-page website screenshot`}
          label={item.slug}
          previewHeight={440}
          showOverlay
          onView={() => onView(item.slug)}
        />
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col gap-3.5 px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#E2C27B]">
              <Tag className="h-3 w-3" />
              {item.category}
            </div>
            <h3 className="mt-1.5 truncate text-xl font-bold text-white transition-colors group-hover:text-[#E2C27B]">
              {item.title}
            </h3>
            <p className="mt-0.5 truncate text-sm text-zinc-500">{item.industry}</p>
          </div>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-300 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[#E2C27B] group-hover:text-white group-hover:ring-[#E2C27B]">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {item.challenge}
        </p>

        {/* Tech chips */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {item.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-400 ring-1 ring-white/5 transition-colors group-hover:text-zinc-300"
            >
              {t}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-500 ring-1 ring-white/5">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-zinc-500">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Calendar className="h-3 w-3" /> {item.year || '2026'}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#E2C27B] transition-colors group-hover:text-white">
            View Case Study
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
