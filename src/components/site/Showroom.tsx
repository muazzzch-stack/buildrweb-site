import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, scrollToPosition, useScrollFx } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionIntro, type TitleLine } from "./primitives";

// Images are matched by file name, so replacing a file in src/assets/showroom/ updates the site.
const images = import.meta.glob<string>("@/assets/showroom/*.webp", { eager: true, query: "?url", import: "default" });
const imageFor = (file: string) => Object.entries(images).find(([path]) => path.endsWith(`/${file}`))?.[1] ?? "";

const SYSTEMS = [
  { title: "Rowan & Reed", badge: "Garden Design", file: "garden.webp", href: "https://garden-design.buildrweb.com/" },
  { title: "Marlow Dental Studio", badge: "Dentistry", file: "dentist.webp", href: "https://dentist.buildrweb.com/" },
  { title: "Kestrel Electrical", badge: "Electrical", file: "electrician.webp", href: "https://electrician.buildrweb.com/" },
  { title: "Hale & Thorn", badge: "Building", file: "builder.webp", href: "https://builder.buildrweb.com/" },
  { title: "Clearwall", badge: "Damp & Insulation", file: "insulation.webp", href: "https://insulation.buildrweb.com/" },
  { title: "Ashdown Roofing", badge: "Roofing", file: "roofing.webp", href: "https://roofing.buildrweb.com/" },
];

const TITLE: TitleLine[] = [{ text: "Built for the" }, { text: "real world.", tone: "primary" }];
const COPY = "Concept websites showing our approach for different trades: clear layouts, fast pages and strong calls to action.";
const pad = (value: number) => String(value).padStart(2, "0");
const hostOf = (href: string) => new URL(href).host;

export function Showroom() {
  const ref = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const total = SYSTEMS.length;
  const current = SYSTEMS[active] ?? SYSTEMS[0]!;

  // Effect: the section pins to the screen. Scrolling raises the next website up over the previous one,
  // which steps back into the stack (smaller, dimmer). Scrolling back up reverses it.
  useScrollFx(ref, ({ q }) => {
    const pin = q("[data-stack-pin]")[0];
    const layers = q("[data-layer]");
    const dims = q("[data-dim]");
    const count = layers.length;
    if (!pin || count < 2) return;

    const depthState = (depth: number) => { const d = Math.min(depth, 4); return { scale: 1 - 0.035 * d, yPercent: -2.6 * d }; };
    gsap.set(layers, { transformOrigin: "50% 0%", transformPerspective: 1400 });
    layers.forEach((layer, index) => gsap.set(layer, { zIndex: index + 1, yPercent: index === 0 ? 0 : 112, rotateX: index === 0 ? 0 : 7 }));

    const timeline = gsap.timeline({ defaults: { ease: "none", immediateRender: false } });
    for (let index = 1; index < count; index++) {
      timeline.fromTo(layers[index]!, { yPercent: 112, rotateX: 7 }, { yPercent: 0, rotateX: 0, duration: 1, ease: "power2.inOut" }, index - 1);
      for (let below = 0; below < index; below++) {
        const depth = index - below;
        timeline.fromTo(layers[below]!, depthState(depth - 1), { ...depthState(depth), duration: 1, ease: "power2.inOut" }, index - 1);
        timeline.fromTo(dims[below]!, { opacity: Math.min(0.75, 0.17 * (depth - 1)) }, { opacity: Math.min(0.75, 0.17 * depth), duration: 1, ease: "power2.inOut" }, index - 1);
      }
    }

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: () => `+=${Math.round((count - 1) * Math.max(window.innerHeight * 0.8, 420))}`,
      pin: true,
      scrub: 0.9,
      animation: timeline,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (count - 1));
        setActive((previous) => (previous === index ? previous : index));
      },
    });
    trigger.current = st;
    return () => { trigger.current = null; };
  });

  const goTo = useCallback((index: number) => {
    const st = trigger.current;
    if (!st) return;
    const target = Math.max(0, Math.min(total - 1, index));
    scrollToPosition(st.start + (target / (total - 1)) * (st.end - st.start), 1.5);
  }, [total]);

  // Reduced motion: a plain, fully visible grid instead of the pinned stack.
  if (reduced) {
    return (
      <section ref={ref} id="work" className="section-y border-y border-border bg-secondary/40">
        <div className="container-x">
          <SectionIntro index="02 / 07" label="Sample websites" title={TITLE} copy={COPY} />
          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {SYSTEMS.map((system) => (
              <a key={system.title} href={system.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${system.title} live website`} className="group block border border-border bg-card">
                <img src={imageFor(system.file)} alt={`${system.title} website preview`} width={1280} height={720} loading="lazy" decoding="async" className="aspect-video w-full object-cover object-left-top" />
                <div className="border-t border-border p-5"><p className="font-mono text-[9px] uppercase tracking-[.16em] text-primary">{system.badge}</p><h3 className="mt-2 font-display text-xl uppercase">{system.title}</h3></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="work" className="relative border-y border-border bg-secondary/40">
      <div data-stack-pin className="relative h-[100svh] overflow-hidden">
        <div className="container-x grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-4 pt-24 pb-6 lg:grid-cols-[.78fr_1.22fr] lg:grid-rows-[1fr_1fr] lg:gap-x-12 lg:gap-y-0 lg:pt-28 lg:pb-10">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <SectionIntro compact index="02 / 07" label="Sample websites" title={TITLE} variant="tilt" />
            <p className="mt-5 hidden max-w-md text-sm leading-7 text-muted-foreground lg:block">{COPY}</p>
          </div>

          <div className="relative mt-3 h-full min-h-[13rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-[min(64svh,32rem)] lg:self-center [clip-path:inset(0_-4%_0_-4%)] lg:[clip-path:inset(-16%_-4%_0_-4%)]">
            {SYSTEMS.map((system, index) => (
              <div key={system.title} data-layer className="absolute inset-0 will-change-transform" style={{ zIndex: index + 1, pointerEvents: index === active ? "auto" : "none" }}>
                <a href={system.href} target="_blank" rel="noopener noreferrer" tabIndex={index === active ? 0 : -1} aria-hidden={index !== active} aria-label={`Open ${system.title} live website`} data-cursor="link" className="group relative block h-full overflow-hidden border border-border bg-card shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                  <div className="flex h-9 items-center gap-2 border-b border-border bg-background px-3">
                    <span className="h-2 w-2 rounded-full border border-faintest" /><span className="h-2 w-2 rounded-full border border-faintest" /><span className="h-2 w-2 rounded-full border border-faintest" />
                    <span className="ml-3 truncate font-mono text-[9px] tracking-[.08em] text-faint">{hostOf(system.href)}</span>
                  </div>
                  <img src={imageFor(system.file)} alt={`${system.title} website preview`} width={1280} height={720} loading="lazy" decoding="async" className="h-[calc(100%-2.25rem)] w-full object-cover object-left-top transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" />
                  <span className="absolute top-12 right-4 grid h-10 w-10 place-items-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={17} /></span>
                  <span data-dim aria-hidden className="pointer-events-none absolute inset-0 bg-background opacity-0" />
                </a>
              </div>
            ))}
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-8">
            <div key={active} className="swap-in">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">{current.badge}</p>
              <h3 className="mt-2 font-display text-2xl uppercase md:text-4xl">{current.title}</h3>
              <a href={current.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground transition-colors hover:text-primary">Open live website <ArrowUpRight size={14} /></a>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-display text-xl tabular-nums">{pad(active + 1)} <span className="text-faint">/ {pad(total)}</span></span>
              <div className="hidden gap-1.5 sm:flex">{SYSTEMS.map((system, index) => <button key={system.title} type="button" aria-label={`Show ${system.title}`} aria-current={index === active} onClick={() => goTo(index)} className={`h-1 transition-all duration-500 ${index === active ? "w-8 bg-primary" : "w-4 bg-border hover:bg-faint"}`} />)}</div>
              <div className="ml-auto mr-14 flex gap-2 lg:mr-0">
                <button type="button" aria-label="Previous website" disabled={active === 0} onClick={() => goTo(active - 1)} className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"><ArrowLeft size={16} /></button>
                <button type="button" aria-label="Next website" disabled={active === total - 1} onClick={() => goTo(active + 1)} className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"><ArrowRight size={16} /></button>
              </div>
            </div>
            <p className="mt-5 hidden font-mono text-[9px] uppercase tracking-[.16em] text-faint lg:block">Scroll to browse the systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}
