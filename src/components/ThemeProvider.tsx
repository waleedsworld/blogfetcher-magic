import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Thin wrapper around next-themes so the whole app can flip between
 * light and dark. Defaults to the visitor's system preference.
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
