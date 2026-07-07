
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentBlogPosts } from '@/services/blogService';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroVariantB from '@/components/HeroVariantB';
import { useVariant } from '@/hooks/useVariant';

const Index = () => {
  const variant = useVariant();
  const { data: recentPosts } = useQuery({
    queryKey: ['recentBlogPosts'],
    queryFn: fetchRecentBlogPosts,
  });

  return (
    <Layout>
      <Seo
        title="Digital Software Planet — Official Software Licensing & Blog"
        description="Your trusted partner for official software licensing, with a fast, clean blog on Windows, Office, Azure and more."
        path="/"
      />
      {/* Hero Section — A/B tested via ?variant=b */}
      {variant === 'b' ? (
        <HeroVariantB />
      ) : (
      <section className="relative overflow-hidden py-24 sm:py-36">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-[0.06]"></div>
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>
        <div className="aurora left-[8%] top-[-4rem] h-72 w-72 bg-[hsl(var(--brand)/0.5)]" aria-hidden="true"></div>
        <div className="aurora right-[6%] top-[2rem] h-80 w-80 bg-[hsl(var(--brand-2)/0.45)]" style={{ animationDelay: '2.5s' }} aria-hidden="true"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand)/0.3)] bg-[hsl(var(--brand)/0.08)] px-4 py-1.5 text-sm font-medium text-[hsl(var(--brand-strong))] shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--brand))] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--brand))]"></span>
                </span>
                Microsoft-partnered · Genuine licenses
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                Official Software <br />
                <span className="text-gradient text-gradient-animate">Licensing Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
                Your trusted partner for all official software licensing needs.
                Get instant access to premium software with our wholesale and bulk purchase options.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="rounded-full px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg font-medium border-primary text-primary hover:bg-primary/5 transition-all"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Premium Software Solutions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
              Experience the best in software licensing with our exclusive features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group card-lift bg-card rounded-2xl p-8 border border-border shadow-elegant"
              >
                <div className="h-12 w-12 rounded-xl bg-[hsl(var(--brand)/0.12)] flex items-center justify-center mb-6 text-[hsl(var(--brand))] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Latest Articles
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                Stay updated with our latest insights about software licensing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Link
                    to={`/${post.slug}`}
                    className="group card-lift block overflow-hidden rounded-2xl border bg-card shadow-elegant"
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
                        <time dateTime="2025-03-21">March 21, 2025</time>
                      </div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                        {post.description}
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
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 border border-primary rounded-full text-primary bg-transparent hover:bg-primary/5 transition-colors"
              >
                View All Articles
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-5xl mx-auto text-center overflow-hidden rounded-3xl px-6 py-16 sm:py-20 text-white shadow-brand"
            style={{ backgroundImage: 'linear-gradient(120deg, hsl(var(--brand-strong)), hsl(var(--brand-2)) 55%, hsl(var(--brand-3)))' }}
          >
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>
            <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl opacity-90">
              Get instant access to official software licenses with our wholesale and bulk purchase options.
            </p>
            <div className="mt-10">
              <Button
                asChild
                className="rounded-full px-8 py-6 text-lg font-medium bg-white text-[hsl(var(--brand-strong))] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/contact">Get Started Now</Link>
              </Button>
            </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

const features = [
  {
    title: "Instant Setup",
    description: "Get your software up and running in no time with our easy installation guides.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
  {
    title: "Official Licenses",
    description: "Get authentic software licenses from our Microsoft-partnered platform.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    title: "Wholesale Options",
    description: "Take advantage of our exclusive deals on bulk purchasing and get the best value for your money.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"></path>
        <path d="M6 9.01V9"></path>
        <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path>
      </svg>
    ),
  },
];

export default Index;
