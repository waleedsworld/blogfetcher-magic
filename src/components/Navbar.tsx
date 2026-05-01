import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full glass-effect border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary transition-opacity hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">DS</span>
              <span className="font-display text-lg font-medium">Digital Software Planet</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={location.pathname === item.href}
              />
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="md:hidden text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden border-t bg-background/95 backdrop-blur-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'py-3 px-2 rounded-md text-base font-medium transition-colors',
                    location.pathname === item.href
                      ? 'text-primary bg-primary/5'
                      : 'text-primary/80 hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, label, active }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      'relative inline-flex items-center px-1 py-2 text-sm font-medium transition-colors',
      active ? 'text-primary' : 'text-primary/80 hover:text-primary'
    )}
  >
    <span className="relative">
      {label}
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
          active ? 'w-full' : 'w-0'
        )}
      />
    </span>
  </Link>
);

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default Navbar;
