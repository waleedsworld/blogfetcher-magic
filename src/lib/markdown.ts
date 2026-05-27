import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface ProcessedMarkdown {
  html: string;
  headings: Heading[];
}

/**
 * Turn arbitrary heading text into a URL-safe slug. Kept deliberately simple
 * and deterministic so anchor IDs are stable across renders and shareable.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // drop punctuation
    .replace(/\s+/g, '-') // spaces -> dashes
    .replace(/-+/g, '-') // collapse repeats
    .replace(/^-|-$/g, ''); // trim edge dashes
}

/**
 * Ensures each generated slug is unique within a single document by suffixing
 * duplicates with an incrementing counter (foo, foo-1, foo-2, ...).
 */
class Slugger {
  private seen = new Map<string, number>();

  slug(raw: string): string {
    const base = slugify(raw) || 'section';
    const count = this.seen.get(base) ?? 0;
    this.seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }
}

/**
 * Single source of truth for rendering a post's markdown. Produces the
 * sanitized HTML (with stable `id`s injected on every h2/h3/h4) alongside a
 * flat list of headings that powers the table of contents. Rendering once and
 * sharing the result guarantees the TOC anchors always match the DOM.
 */
export function processMarkdown(markdown: string): ProcessedMarkdown {
  if (!markdown) return { html: '', headings: [] };

  const rawHtml = marked.parse(markdown, { async: false }) as string;
  const clean = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target', 'rel', 'loading', 'decoding'],
  });

  // DOMParser is available in the browser; guard for any SSR/test context.
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return { html: clean, headings: [] };
  }

  const doc = new DOMParser().parseFromString(clean, 'text/html');
  const slugger = new Slugger();
  const headings: Heading[] = [];

  doc.querySelectorAll('h2, h3, h4').forEach((el) => {
    const text = (el.textContent || '').trim();
    if (!text) return;
    const id = slugger.slug(text);
    el.id = id;
    // Mark headings so the reader can visually anchor / deep-link them.
    el.setAttribute('data-anchor', 'true');
    headings.push({
      id,
      text,
      level: Number(el.tagName.substring(1)),
    });
  });

  // Wrap wide tables so they scroll instead of forcing horizontal page
  // overflow on phones/tablets.
  doc.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('table-scroll')) return;
    const wrapper = doc.createElement('div');
    wrapper.className = 'table-scroll';
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Lazy/async images so slow or broken assets never block layout.
  doc.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // External links open safely in a new tab.
  doc.querySelectorAll('a[href^="http"]').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  return { html: doc.body.innerHTML, headings };
}
