// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind, tsconfig paths,
// the "@" alias and more. Do not add those plugins manually.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: { base: "/" },
  // Fully static deployment. Let TanStack emit its native dist/server/server.js entry
  // so the prerender step can load it directly.
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    // Static HTML for every route so Netlify (static hosting) serves crawlable markup.
    pages: [{ path: "/" }, { path: "/privacy" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
