
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '@/services/blogService';
import Layout from '@/components/Layout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug),
    retry: 1,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error("Error fetching blog post:", error);
          toast.error("Couldn't load the article you requested.");
          navigate('/');
        }
      }
    }
  });

  useEffect(() => {
    // Update document title when post data loads
    if (post?.meta_tags?.title) {
      document.title = post.meta_tags.title;
    }

    // Update meta description
    if (post?.meta_tags?.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.meta_tags.description);
      }
    }

    return () => {
      // Reset document title when component unmounts
      document.title = 'Digital Software Planet';
    };
  }, [post?.meta_tags]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-primary/10 rounded w-3/4"></div>
              <div className="h-4 bg-primary/10 rounded w-1/2"></div>
              <div className="space-y-4">
                <div className="h-4 bg-primary/10 rounded"></div>
                <div className="h-4 bg-primary/10 rounded"></div>
                <div className="h-4 bg-primary/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-12 bg-destructive/10 rounded-lg">
            <h1 className="text-2xl font-bold text-destructive">Article Not Found</h1>
            <p className="mt-4">
              We couldn't find the article you were looking for. It may have been removed or the URL might be incorrect.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {post.meta_tags.title}
            </h1>
            <div className="mt-4 flex items-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={post.timestamp?.split('_')[0] || ''}>
                {formatDate(post.timestamp)}
              </time>
            </div>
            <p className="mt-6 text-xl text-muted-foreground">
              {post.meta_tags.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MarkdownRenderer markdown={post.content} />
          </motion.div>

          <motion.div 
            className="mt-16 pt-8 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay:.3 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-primary">Share this article</p>
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

// Helper function to format date from timestamp string like "2025-03-21_07-01-15"
const formatDate = (timestamp?: string): string => {
  if (!timestamp) return 'Unknown date';
  
  try {
    const [datePart] = timestamp.split('_');
    const date = new Date(datePart);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }).format(date);
  } catch (e) {
    return 'Unknown date';
  }
};

export default BlogPost;
