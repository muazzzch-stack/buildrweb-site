import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { MagneticLink } from "./MagneticButton";
import heroLg from "@/assets/hero-1920.webp";
import heroSm from "@/assets/hero-960.webp";

const TRADES = ["Plumbers", "Electricians", "Roofers", "HVAC Engineers", "Gas Fitters", "Scaffolders", "Builders", "Landscapers", "Garage Specialists", "Dentists", "Restaurants", "Estate Agents"];
const METRICS = [{ value: "14 days", label: "Typical launch" }, { value: "24/7", label: "Call answering" }, { value: "95+", label: "PageSpeed target" }];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useScrollFx(ref, ({ root, q }) => {
    const background = q("[data-hero-bg]");
    const parallax = q("[data-hero-par]");
    const lines = q("[data-hero-line]");
    const fades = q("[data-hero-fade]");
    const content = q("[data-hero-content]");

    // Start hidden (the loader covers the page until it is ready), then play the intro.
    gsap.set(lines, { yPercent: 118 });
    gsap.set(fades, { opacity: 0, y: 28 });
    gsap.set(background, { scale: 1.2, opacity: 0 });

    const intro = gsap.timeline({ paused: true, defaults: { ease: EASE_OUT } });
    intro
      .to(background, { scale: 1, opacity: 1, duration: 2.4 }, 0)
      .to(lines, { yPercent: 0, duration: 1.5, stagger: 0.14 }, 0.15)
      .to(fades, { opacity: 1, y: 0, duration: 1.2, stagger: 0.09 }, 0.55);

    const play = () => { intro.play(); };
    if (document.documentElement.dataset["siteReady"] === "true") play();
    else window.addEventListener("buildrweb:ready", play, { once: true });

    // Scroll-linked: the photo drifts slower than the page, the copy lifts away.
    gsap.to(parallax, { yPercent: 14, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(content, { opacity: 0, y: -70, ease: "none", scrollTrigger: { trigger: root, start: "25% top", end: "bottom 15%", scrub: true } });

    return () => window.removeEventListener("buildrweb:ready", play);
  });

  return (
    <section ref={ref} className="relative min-h-[94svh] overflow-hidden border-b border-border pt-24">
      <div data-hero-bg className="absolute inset-0 overflow-hidden" aria-hidden>
        <div data-hero-par className="noise-mask absolute inset-x-0 -top-[8%] -bottom-[8%]"><img src={heroLg} srcSet={`${heroSm} 960w, ${heroLg} 1920w`} sizes="100vw" alt="" width={1920} height={1280} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-[50%_70%]" /></div>
      </div>
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="grid-field absolute inset-0 opacity-30" aria-hidden />
      <div data-hero-content className="container-x relative flex min-h-[calc(94svh-96px)] flex-col justify-between py-12 md:py-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <p data-hero-fade className="label-eyebrow">Web, AI and automation studio</p>
            <h1 className="display-xl mt-8">
              <span className="block overflow-hidden pb-[.08em]"><span data-hero-line className="block max-[480px]:text-[34px]">Websites, AI Voice Agents</span></span>
              <span className="block overflow-hidden pb-[.08em]"><span data-hero-line className="block text-primary max-[480px]:text-[34px]">&amp; Automations.</span></span>
            </h1>
          </div>
          <div data-hero-fade className="border-l border-border pl-6">
            <p className="text-[15px] leading-7 text-muted-foreground">We build fast websites, AI receptionists that answer calls when you cannot, and automations that follow up for you. Stop losing enquiries to missed calls and slow replies.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col"><MagneticLink href="#contact">Launch your system <ArrowUpRight size={15} /></MagneticLink><MagneticLink href="#automations" variant="ghost">See the demos</MagneticLink></div>
          </div>
        </div>

        <div data-hero-fade className="mt-16 grid gap-8 border-t border-border pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid grid-cols-3 gap-4">{METRICS.map((metric) => <div key={metric.label}><p className="font-display text-2xl font-medium md:text-4xl">{metric.value}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-faint">{metric.label}</p></div>)}</div>
          <a href="#services" className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground md:flex">Scroll to explore <ArrowDownRight size={15} className="text-primary" /></a>
        </div>
      </div>
      <div className="relative overflow-hidden border-t border-border bg-background/70 py-4 backdrop-blur-md">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">{[...TRADES, ...TRADES, ...TRADES].map((trade, index) => <span key={`${trade}-${index}`} className="font-mono text-[10px] uppercase tracking-[.18em] text-faint">{trade} <span className="ml-8 text-primary">/</span></span>)}</div>
      </div>
    </section>
  );
}
