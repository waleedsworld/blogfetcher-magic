
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchRecentBlogPosts } from '@/services/blogService';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['recentBlogPosts'],
    queryFn: fetchRecentBlogPosts,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Digital Software Planet
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
              Your trusted partner for all official software licensing needs
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 max-w-3xl mx-auto p-8 bg-secondary/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">About Us</h2>
          <p className="text-muted-foreground">
            We are proud to be partnered with Microsoft, offering a wide range of official licenses that cater to your business requirements. 
            Get instant access to the finest software solutions. Our wholesale and bulk purchase options ensure that you get the best deals on 
            official licenses, without compromising on quality.
          </p>
        </motion.div>

        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl mb-8">
          Latest Articles
        </h2>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-destructive/10 rounded-lg">
            <h3 className="text-xl font-medium text-destructive">Error loading blog posts</h3>
            <p className="mt-2">Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts?.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard
                  title={post.title}
                  description={post.description}
                  slug={post.slug}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
}

const BlogCard = ({ title, description, slug }: BlogCardProps) => {
  return (
    <Link 
      to={`/${slug}`}
      className="group block overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
    >
      <div className="p-6">
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          <time dateTime="2024-03-21">March 21, 2024</time>
        </div>
        <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
