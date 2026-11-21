# BuildrWeb

buildrweb.com: TanStack Start + React 19 + Tailwind v4, static prerender, GSAP + Lenis scroll animation.

    npm install
    npm run dev        # local dev
    npm run build      # static output in dist/client

Deploy on Netlify: build `npm run build`, publish `dist/client` (netlify.toml already set).

Where things live
- src/assets/logo.webp, wordmark.webp  header/footer logo (from your supplied files); public/favicon*, apple-touch-icon.png, og-image.jpg
- src/assets/showroom/*.webp            real site screenshots (swap by filename)
- src/components/site/FlowDiagram.tsx   the three automation diagrams (edit labels/steps in this file)
- src/lib/privacy-content.ts            the full privacy policy text
- reference/                            original Activepieces screenshots (not shipped)
- Contact form posts to Formspree form xvzjlaqd (see Contact.tsx)
