import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import {
  Home,
  Newspaper,
  Info,
  Mail,
  FileText,
  Moon,
  Sun,
  Search,
} from 'lucide-react';
import { fetchRecentBlogPosts } from '@/services/blogService';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

/**
 * Event other components (e.g. the Navbar search button) can dispatch to open
 * the palette without prop-drilling: window.dispatchEvent(new Event('open-command-palette')).
 */
export const OPEN_COMMAND_PALETTE_EVENT = 'open-command-palette';

/**
 * A global ⌘K / Ctrl-K quick-search palette. Lets visitors jump between pages,
 * find a recent article by title, or flip the theme — all from the keyboard.
 * Self-contained: mount it once inside the router and it wires up its own
 * shortcut + event listeners.
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Only fetch the article list once the palette has been opened at least once.
  const [hasOpened, setHasOpened] = useState(false);
  const { data: posts = [] } = useQuery({
    queryKey: ['recentBlogPosts'],
    queryFn: fetchRecentBlogPosts,
    enabled: hasOpened,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (open) setHasOpened(true);
  }, [open]);

  // Keyboard shortcut: ⌘K (mac) / Ctrl+K (win/linux) toggles the palette.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Let any component open the palette via a custom window event.
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, openHandler);
  }, []);

  // Run an action and close the palette in one go.
  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const pages = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Blog', to: '/blog', icon: Newspaper },
    { label: 'About', to: '/about', icon: Info },
    { label: 'Contact', to: '/contact', icon: Mail },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages and articles…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Go to">
          {pages.map((page) => (
            <CommandItem
              key={page.to}
              value={`page ${page.label}`}
              onSelect={() => runCommand(() => navigate(page.to))}
            >
              <page.icon className="mr-2 h-4 w-4" />
              <span>{page.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {posts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Articles">
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  value={`article ${post.title}`}
                  onSelect={() => runCommand(() => navigate(`/${post.slug}`))}
                >
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle theme dark light mode"
            onSelect={() => runCommand(() => setTheme(isDark ? 'light' : 'dark'))}
          >
            {isDark ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Switch to {isDark ? 'light' : 'dark'} mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

/**
 * A tiny "search" affordance for the Navbar. Clicking it (or pressing ⌘K)
 * opens the palette. Kept here so the palette owns its own trigger styling.
 */
export const CommandPaletteTrigger = () => {
  const open = () => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open quick search"
      className="hidden sm:inline-flex items-center gap-2 rounded-md border border-input bg-background/60 px-2.5 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
    >
      <Search className="h-4 w-4" />
      <span className="hidden md:inline">Search</span>
      <kbd className="hidden md:inline pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
};

export default CommandPalette;
