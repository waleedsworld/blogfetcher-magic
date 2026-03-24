
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

const MarkdownRenderer = ({ markdown, className = "" }: MarkdownRendererProps) => {
  // Parse the markdown to HTML
  const getHtml = () => {
    const rawHtml = marked.parse(markdown) as string;
    return DOMPurify.sanitize(rawHtml);
  };

  return (
    <div
      className={`prose prose-sm sm:prose lg:prose-lg dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: getHtml() }}
    />
  );
};

export default MarkdownRenderer;
