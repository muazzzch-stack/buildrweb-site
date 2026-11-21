import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import fontDisplay from "@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2?url";
import fontSans from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff2?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Go home</Link></div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { void router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "BuildrWeb" },
      { property: "og:site_name", content: "BuildrWeb" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#070806" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [
      { rel: "preload", as: "font", type: "font/woff2", href: fontDisplay, crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: fontSans, crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "ard", href: "/.well-known/ard.json", type: "application/json" },
      { rel: "alternate", type: "text/markdown", href: "/llms.txt", title: "LLM-readable site summary" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": "https://buildrweb.com/#website", url: "https://buildrweb.com/", name: "BuildrWeb", inLanguage: "en-GB", publisher: { "@id": "https://buildrweb.com/#org" } },
            {
              "@type": "ProfessionalService",
              "@id": "https://buildrweb.com/#org",
              name: "BuildrWeb",
              url: "https://buildrweb.com/",
              logo: "https://buildrweb.com/icon-512.png",
              image: "https://buildrweb.com/og-image.jpg",
              email: "hello@buildrweb.com",
              telephone: "+447916999893",
              description: "Remote-first websites, AI voice agents and automations for UK tradespeople and local service businesses",
              areaServed: { "@type": "Country", name: "United Kingdom" },
              knowsAbout: ["WordPress websites", "AI voice agents", "Business automation", "Local SEO"],
              hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: ["WordPress Websites", "AI-Powered Website Development", "AI Voice Agents", "Business Automations", "Local SEO and Speed"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) },
              sameAs: ["https://www.instagram.com/buildrweb_", "https://www.facebook.com/share/1EDkjiDMri/"],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
