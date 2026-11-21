import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToPosition } from "@/lib/motion";

const TERMINAL_LINES = ["BOOT / BUILDRWEB", "LOADING WEB + AI SYSTEMS", "CALIBRATING PERFORMANCE", "READY"];

function announceReady() {
  document.documentElement.dataset["siteReady"] = "true";
  window.dispatchEvent(new Event("buildrweb:ready"));
}

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setDone(true); announceReady(); return; }
    let current = 0;
    let assetsReady = document.readyState === "complete";
    const markReady = () => { assetsReady = true; };
    window.addEventListener("load", markReady, { once: true });
    const cap = window.setTimeout(markReady, 1100);
    const timer = window.setInterval(() => {
      current = Math.min(assetsReady ? 100 : 92, current + Math.max(2, Math.round((100 - current) / 6)));
      setProgress(current);
      if (current >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => { setDone(true); announceReady(); }, 160);
      }
    }, 32);
    return () => { window.clearInterval(timer); window.clearTimeout(cap); window.removeEventListener("load", markReady); };
  }, [reduced]);

  const [gone, setGone] = useState(false);
  useEffect(() => { if (!done) return; const t = window.setTimeout(() => setGone(true), 720); return () => window.clearTimeout(t); }, [done]);
  if (gone) return null;

  return (
    <div className={`fixed inset-0 z-[20000] flex items-center justify-center bg-background px-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${done ? "pointer-events-none scale-[1.02] opacity-0" : "opacity-100"}`}>
      <div className="w-full max-w-xl font-mono text-[11px] uppercase tracking-[0.12em]">
        <div className="mb-8 flex justify-between text-faint"><span>BuildrWeb system</span><span>{String(progress).padStart(3, "0")}%</span></div>
        <div className="space-y-3">
          {TERMINAL_LINES.map((line, index) => <p key={line} className={progress > index * 24 ? "text-foreground" : "text-faintest"}><span className="mr-3 text-primary">{progress > index * 24 ? ">" : "·"}</span>{line}</p>)}
        </div>
        <div className="mt-8 h-px bg-border"><div className="h-px bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}

/**
 * Inertia scrolling (Lenis) wired to GSAP ScrollTrigger, plus smooth in-page anchors.
 * Skipped for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let destroyed = false;
    let cleanup = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
        if (!link) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
        const target = document.querySelector<HTMLElement>(url.hash);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: 0, duration: 1.6 });
        window.history.pushState(null, "", url.hash);
      };
      document.addEventListener("click", onClick);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("buildrweb:ready", refresh);
      void document.fonts?.ready.then(refresh);

      // Land on a hash target correctly once pinned sections have added their spacing.
      const jumpToHash = () => {
        if (!window.location.hash) return;
        const target = document.querySelector<HTMLElement>(window.location.hash);
        if (target) lenis.scrollTo(target, { offset: 0, immediate: true });
      };
      const hashTimer = window.setTimeout(jumpToHash, 900);

      cleanup = () => {
        window.clearTimeout(hashTimer);
        document.removeEventListener("click", onClick);
        window.removeEventListener("load", refresh);
        window.removeEventListener("buildrweb:ready", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete window.__lenis;
      };
    });

    return () => { destroyed = true; cleanup(); };
  }, []);
  return null;
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      if (!bar.current) return;
      const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div ref={bar} aria-hidden className="fixed top-0 left-0 z-[10000] h-[2px] w-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const update = () => setShow(window.scrollY > 700); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <button type="button" aria-label="Back to top" tabIndex={show ? 0 : -1} onClick={() => scrollToPosition(0, 1.8)} className={`fixed right-5 bottom-5 z-50 grid h-12 w-12 place-items-center border border-border bg-card text-foreground transition-[opacity,transform,border-color,color] duration-300 hover:border-primary hover:text-primary ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}><ArrowUp size={17} /></button>;
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-active");
    let tx = -100, ty = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.32; cy += (ty - cy) * 0.32;
      const t = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = t;
      if (ring.current) ring.current.style.transform = t + (ring.current.dataset["active"] === "true" ? " scale(1.45)" : "");
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (event: MouseEvent) => { tx = event.clientX; ty = event.clientY; setActive(Boolean((event.target as HTMLElement | null)?.closest("a,button,input,select,textarea,[data-cursor]"))); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); document.body.classList.remove("cursor-active"); window.removeEventListener("mousemove", move); };
  }, []);
  if (!enabled) return null;
  return <><div ref={dot} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[20001] h-1.5 w-1.5 rounded-full bg-primary" /><div ref={ring} aria-hidden data-active={active} className={`pointer-events-none fixed top-0 left-0 z-[20000] h-9 w-9 rounded-full border border-primary transition-opacity duration-200 ${active ? "opacity-45" : "opacity-75"}`} /></>;
}
