import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

/**
 * Experimental A/B landing hero (variant "b").
 *
 * Deliberately distinct from the default hero:
 *  - Left-aligned, asymmetric two-column layout (vs. the centered default).
 *  - Benefit-led headline + urgency-driven CTA copy ("Activate" vs "Get Started").
 *  - Trust-signal stat row and a gradient/blurred visual panel.
 *
 * Rendered only when the URL carries `?variant=b` (see useVariant).
 */
const stats = [
  { value: '10k+', label: 'Licenses delivered' },
  { value: '99.9%', label: 'Activation rate' },
  { value: '24/7', label: 'Support' },
];

const HeroVariantB = () => {
  return (
    <section
      data-variant="b"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-background to-primary/5" />
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <span className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600">
              Microsoft-partnered platform
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Genuine software,
              <br />
              <span className="text-blue-600">activated in minutes.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Skip the resellers and inflated retail pricing. Buy official
              licenses at wholesale rates and get an activation key delivered
              instantly, backed by real support.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-full px-8 py-6 text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/contact">Activate My License</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-blue-500/60 text-blue-600 hover:bg-blue-500/5 transition-all"
              >
                <Link to="/blog">See How It Works</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-3xl border bg-background/60 p-8 shadow-xl backdrop-blur">
              <div className="flex items-center gap-2 border-b pb-4">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-sm text-muted-foreground">
                  license-activation.exe
                </span>
              </div>
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-3">
                  <span className="text-sm font-medium text-primary">
                    Product key
                  </span>
                  <span className="font-mono text-sm text-blue-600">
                    XXXXX-XXXXX-XXXXX
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-3">
                  <span className="text-sm font-medium text-primary">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Activated
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-full rounded-full bg-blue-600" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Delivered in under 2 minutes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroVariantB;
