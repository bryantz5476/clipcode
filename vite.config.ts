import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,ico,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
      manifest: {
        name: 'ClipCode | Desarrollo Web Profesional',
        short_name: 'ClipCode',
        description: 'Desarrollo web profesional para tu negocio',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          { src: '/logoicono.png', sizes: '192x192', type: 'image/png' },
          { src: '/logoicono.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
    ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
      ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer(),
        ),
        await import("@replit/vite-plugin-dev-banner").then((m) =>
          m.devBanner(),
        ),
      ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('framer-motion')) return 'framer';
          if (id.includes('@tanstack')) return 'query';
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('wouter')) return 'vendor';
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
