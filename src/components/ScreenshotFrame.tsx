import React, { useState, useRef, useEffect } from 'react';
import { Lock, AlertTriangle, Expand, Maximize2 } from 'lucide-react';

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  label?: string;
  previewHeight?: number;
  showOverlay?: boolean;
  onView?: () => void;
  className?: string;
}

/**
 * ScreenshotFrame — browser-mockup frame rendering a COMPLETE full-page
 * website screenshot at its NATURAL ASPECT RATIO (never cropped, never
 * object-fit: cover). In preview mode the frame is a fixed-height, vertically
 * scrollable mini-browser so the entire screenshot is present and explorable.
 * Dark BRANIFY loading shimmer + dark error fallback (never a white box).
 */
export const ScreenshotFrame: React.FC<ScreenshotFrameProps> = ({
  src,
  alt,
  label,
  previewHeight,
  showOverlay = false,
  onView,
  className = '',
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewHeight == null) return;
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0;
      setProgress(pct);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [previewHeight, status]);

  const isPreview = previewHeight != null;

  return (
    <div
      className={
        'group relative overflow-hidden rounded-xl border border-white/10 bg-[#0E0E14] shadow-2xl shadow-black/40 ' +
        className
      }
    >
      {/* Browser chrome top bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#15151C] px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/40 px-2.5 py-1 text-[11px] text-zinc-400 ring-1 ring-white/5">
          <Lock className="h-3 w-3 shrink-0 text-emerald-500/80" />
          <span className="truncate font-mono">
            {label ? `branify.studio / ${label}` : 'branify.studio'}
          </span>
        </div>
        <button
          type="button"
          className="ml-1 hidden shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white sm:inline-flex"
          title="Screenshot"
        >
          <Expand className="h-3 w-3" />
          <span className="hidden sm:inline">Full</span>
        </button>
      </div>

      <div className="relative">
        {status === 'loading' && (
          <div
            className="flex items-center justify-center bg-[#0E0E14]"
            style={{ height: isPreview ? previewHeight : 420 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#E2C27B]" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                Loading screenshot…
              </span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            className="flex items-center justify-center bg-gradient-to-br from-[#0E0E14] to-[#15151C]"
            style={{ height: isPreview ? previewHeight : 420 }}
          >
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <AlertTriangle className="h-7 w-7 text-amber-400/80" />
              <p className="text-sm font-semibold text-zinc-200">Screenshot unavailable</p>
              <p className="text-[11px] text-zinc-500">BRANIFY · asset failed to load</p>
            </div>
          </div>
        )}

        {status !== 'error' && (
          <div
            ref={scrollRef}
            className={isPreview ? 'branify-scroll overflow-y-auto overflow-x-hidden' : 'block'}
            style={isPreview ? { height: previewHeight } : undefined}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
              className="block h-auto w-full select-none bg-white"
              draggable={false}
            />
          </div>
        )}

        {isPreview && status === 'loaded' && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0E0E14] via-[#0E0E14]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#E2C27B] to-[#E2C27B] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress < 2 && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 animate-pulse rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-300 backdrop-blur">
                Scroll to explore ↓
              </div>
            )}
          </>
        )}

        {showOverlay && status === 'loaded' && onView && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              className="relative inline-flex items-center gap-1.5 rounded-lg bg-[#E2C27B] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E2C27B]/30 transition-colors hover:bg-[#C9A45C]"
            >
              <Maximize2 className="h-3.5 w-3.5" /> Case Study
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
