import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Loader, SmoothScroll, BackToTop, CustomCursor, ScrollProgress } from "@/components/site/Chrome";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Showroom } from "@/components/site/Showroom";
import { Automations } from "@/components/site/Automations";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Founder } from "@/components/site/Founder";
import { Contact } from "@/components/site/Contact";
import heroLg from "@/assets/hero-1920.webp";
import heroSm from "@/assets/hero-960.webp";

const TITLE = "BuildrWeb | Websites, AI Voice Agents & Automations for UK Businesses";
const DESCRIPTION = "Fast websites, 24/7 AI voice agents and business automations for UK tradespeople and local service businesses. Answer calls, book appointments and follow up.";
const OG = "https://buildrweb.com/og-image.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "websites for UK businesses, WordPress websites, AI voice agents UK, AI receptionists, business automations, local SEO, BuildrWeb" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://buildrweb.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "https://buildrweb.com/" },
      { rel: "preload", as: "image", fetchPriority: "high", href: heroLg, imageSrcSet: `${heroSm} 960w, ${heroLg} 1920w`, imageSizes: "100vw" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Showroom />
        <Automations />
        <WhyUs />
        <Process />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
