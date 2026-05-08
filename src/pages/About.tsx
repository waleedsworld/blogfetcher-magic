import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, Package, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Official & Genuine',
    description:
      'Every license we supply is authentic and traceable — no grey-market keys, no surprises at activation.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Delivery',
    description:
      'Keys and setup guides land in your inbox the moment your order clears. No waiting, no tickets.',
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: 'Wholesale Pricing',
    description:
      'Buying for a team or a fleet? Our bulk tiers keep per-seat costs low without cutting corners.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Real Support',
    description:
      'Humans, not bots. If activation ever hiccups, we walk you through it until it works.',
  },
];

const About = () => (
  <Layout>
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About Digital Software Planet
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          We make official software licensing simple, fast, and fairly priced —
          for individuals, growing teams, and enterprises alike.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12 max-w-3xl mx-auto p-8 bg-secondary/30 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          Digital Software Planet started with a frustrating truth: buying
          legitimate software licenses was slower and murkier than it had any
          right to be. So we built a partner-backed platform that puts genuine
          licenses, transparent pricing, and instant setup in one place — and
          wrapped it in a blog that actually explains the stuff nobody else does.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 text-primary">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild className="rounded-full px-8 py-6 text-lg">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </div>
    </div>
  </Layout>
);

export default About;
