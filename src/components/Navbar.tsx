
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Navbar = () => {
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
            >
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">DS</span>
              <span className="font-display text-lg font-medium">Digital Software Planet</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
          <div className="flex md:hidden">
            <button 
              className="text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "relative inline-flex items-center px-1 py-2 text-sm font-medium transition-colors",
        "text-primary/80 hover:text-primary"
      )}
    >
      <span className="relative">
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </Link>
  );
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default Navbar;
