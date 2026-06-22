import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { CommandPaletteTrigger } from './CommandPalette';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes (covers back/forward
  // navigation and programmatic redirects, not just link clicks).
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Robustness for narrow-screen edge cases: close on Escape, and close if the
  // viewport grows past the md breakpoint (e.g. tablet rotation) so a stale
  // open-state can't linger while the desktop nav is showing.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mql = window.matchMedia('(min-width: 768px)');
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    mql.addEventListener('change', onDesktop);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      mql.removeEventListener('change', onDesktop);
    };
  }, [open]);

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
              <span aria-hidden="true" className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-brand" style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--brand)), hsl(var(--brand-2)))' }}>DS</span>
              <span className="font-display text-lg font-medium">Digital Software Planet</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={location.pathname === item.href}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger />
            <ThemeToggle />
            <button
              className="md:hidden text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
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
                  aria-current={location.pathname === item.href ? 'page' : undefined}
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
    aria-current={active ? 'page' : undefined}
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
