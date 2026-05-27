import React, { useEffect, useMemo, useRef, useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
  /** Ref to the rendered article body; used for the reading-progress bar. */
  contentRef: React.RefObject<HTMLElement>;
}

/**
 * Auto-generated, scroll-synced table of contents for a blog post.
 *
 *  - A slim reading-progress bar tracks how far through the article you are.
 *  - The active section is highlighted via IntersectionObserver scroll-spy.
 *  - Clicking an entry smooth-scrolls and updates the URL hash (deep-linkable).
 *  - On desktop it sticks alongside the article; on mobile it collapses into a
 *    toggle so it never crowds the reading column.
 */
const TableOfContents = ({ headings, contentRef }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeIdRef = useRef('');

  // Normalize heading levels so the shallowest heading is the left margin,
  // regardless of whether an article starts at h2 or h3.
  const minLevel = useMemo(
    () => (headings.length ? Math.min(...headings.map((h) => h.level)) : 2),
    [headings]
  );

  // Reading-progress bar driven by the article's scroll position.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 100 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(Math.round((scrolled / total) * 100));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [contentRef, headings]);

  // Scroll-spy: highlight the heading nearest the top of the viewport.
  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer entries currently intersecting near the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const id = visible[0].target.id;
          activeIdRef.current = id;
          setActiveId(id);
          return;
        }

        // Nothing intersecting (e.g. between sections): fall back to the last
        // heading that has scrolled above the top edge.
        const aboveTop = elements
          .filter((el) => el.getBoundingClientRect().top < 120)
          .pop();
        if (aboveTop && aboveTop.id !== activeIdRef.current) {
          activeIdRef.current = aboveTop.id;
          setActiveId(aboveTop.id);
        }
      },
      { rootMargin: '-96px 0px -66% 0px', threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
    setMobileOpen(false);
    // Update the hash without triggering the browser's own jump.
    if (window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  if (headings.length < 2) return null;

  const list = (
    <ul className="space-y-1 text-sm">
      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <li key={h.id} style={{ paddingLeft: `${(h.level - minLevel) * 0.85}rem` }}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'block border-l-2 py-1 pl-3 leading-snug transition-colors',
                isActive
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
              )}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav aria-label="Table of contents" className="toc">
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block sticky top-24">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <List className="h-4 w-4" />
          On this page
        </div>
        {/* Reading-progress bar */}
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          />
        </div>
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">{list}</div>
      </div>

      {/* Mobile: collapsible panel pinned near the top of the article */}
      <div className="lg:hidden mb-8 rounded-xl border bg-background/60 backdrop-blur">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-primary"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            On this page
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              mobileOpen && 'rotate-180'
            )}
          />
        </button>
        <div className="h-1 w-full overflow-hidden bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {mobileOpen && <div className="px-4 py-3">{list}</div>}
      </div>
    </nav>
  );
};

export default TableOfContents;
