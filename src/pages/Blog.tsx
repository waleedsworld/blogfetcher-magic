import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchRecentBlogPosts } from '@/services/blogService';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search, CalendarDays, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['recentBlogPosts'],
    queryFn: fetchRecentBlogPosts,
  });

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!blogPosts) return [];
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [blogPosts, query]);

  return (
    <Layout>
      <Seo
        title="Blog — Software Licensing Guides & Insights"
        description="Clear, practical guides on Windows, Microsoft 365, Azure, AWS and volume licensing. Search articles instantly."
        path="/blog"
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              The <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
              Plain-English guides on software licensing, cloud, and the tools
              that keep your business running.
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto mb-12 relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="pl-12 h-12 rounded-full text-base"
            aria-label="Search articles"
          />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-live="polite">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} aria-hidden="true" className="rounded-2xl border bg-card p-6 shadow-elegant">
                <div className="h-4 w-28 rounded-full shimmer" />
                <div className="mt-4 h-5 w-3/4 rounded shimmer" />
                <div className="mt-3 h-4 w-full rounded shimmer" />
                <div className="mt-2 h-4 w-5/6 rounded shimmer" />
                <div className="mt-6 h-4 w-24 rounded-full shimmer" />
              </div>
            ))}
            <span className="sr-only">Loading articles…</span>
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-destructive/10 rounded-lg max-w-lg mx-auto">
            <h3 className="text-xl font-medium text-destructive">Error loading blog posts</h3>
            <p className="mt-2 text-muted-foreground">Please try again later.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-12 bg-secondary/30 rounded-lg max-w-lg mx-auto">
            <h3 className="text-xl font-medium text-primary">No matching articles</h3>
            <p className="mt-2 text-muted-foreground">
              Nothing matched “{query}”. Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
              >
                <BlogCard title={post.title} description={post.description} slug={post.slug} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
}

const BlogCard = ({ title, description, slug }: BlogCardProps) => (
  <Link
    to={`/${slug}`}
    className="group card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-elegant"
  >
    <div className="h-1 w-full bg-gradient-to-r from-[hsl(var(--brand))] via-[hsl(var(--brand-2))] to-[hsl(var(--brand-3))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-2 flex items-center text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4 mr-1.5 text-[hsl(var(--brand))]" />
        <time dateTime="2025-03-21">March 21, 2025</time>
      </div>
      <h3 className="text-lg font-semibold text-primary transition-colors group-hover:text-[hsl(var(--brand))]">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground flex-1">
        {description}
      </p>
      <div className="mt-4 flex items-center text-sm font-medium text-[hsl(var(--brand))]">
        Read more
        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default Blog;
