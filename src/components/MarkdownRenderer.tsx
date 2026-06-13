import React, { useMemo } from 'react';
import { processMarkdown } from '@/lib/markdown';

interface MarkdownRendererProps {
  /** Raw markdown source. Ignored when `html` is provided. */
  markdown?: string;
  /**
   * Pre-rendered, sanitized HTML (e.g. from `processMarkdown`). Preferred when
   * the caller also needs the heading list, so the document is only parsed once.
   */
  html?: string;
  className?: string;
}

const MarkdownRenderer = ({ markdown = '', html, className = '' }: MarkdownRendererProps) => {
  const rendered = useMemo(() => {
    try {
      if (html !== undefined) return html;
      if (typeof markdown !== 'string' || markdown.trim() === '') {
        return '<p class="text-muted-foreground italic">No content available.</p>';
      }
      return processMarkdown(markdown).html;
    } catch (err) {
      console.error('Failed to render markdown:', err);
      return '<p class="text-destructive">This content could not be displayed.</p>';
    }
  }, [html, markdown]);

  return (
    <div
      className={`prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none break-words ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default MarkdownRenderer;
