import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split large, rarely-changing dependencies into their own long-cacheable
    // vendor chunks so an app-code change doesn't bust the whole bundle and the
    // browser can parallelise downloads.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "markdown-vendor": ["marked", "dompurify"],
          "query-vendor": ["@tanstack/react-query"],
        },
      },
    },
    // Route + vendor splitting keeps individual chunks well under this; the
    // default 500 kB warning was firing only on the old monolithic bundle.
    chunkSizeWarningLimit: 600,
  },
});
