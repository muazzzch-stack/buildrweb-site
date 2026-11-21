import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void;
      stop: () => void;
      start: () => void;
    };
  }
}

export { gsap, ScrollTrigger };

/** The one easing used across the site: a long, soft deceleration (Apple-style). */
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power3.inOut";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type FxContext = {
  root: HTMLElement;
  /** Scoped selector: returns matching elements inside `root`. */
  q: (selector: string) => HTMLElement[];
  /** True on screens 1024px wide and up. */
  desktop: boolean;
};

/**
 * Runs scroll effects for a component, scoped to `ref`.
 * - Skipped entirely for visitors who prefer reduced motion (content stays fully visible).
 * - Everything is reverted on unmount and when the viewport crosses the desktop breakpoint.
 * - Return a function from `setup` to run extra cleanup.
 */
// Effects for sections below the fold are set up one at a time, in order, while the browser is idle.
// This keeps hydration from producing one long main-thread task (better TBT) without changing the result.
const queue: Array<() => void> = [];
let draining = false;
const whenIdle = (fn: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 900 });
  else window.setTimeout(fn, 40);
};
function drain() {
  const job = queue.shift();
  if (job) job();
  if (queue.length) whenIdle(drain);
  else { draining = false; ScrollTrigger.refresh(); }
}
function enqueue(job: () => void) {
  queue.push(job);
  if (!draining) { draining = true; whenIdle(drain); }
}

export function useScrollFx(ref: RefObject<HTMLElement | null>, setup: (context: FxContext) => void | (() => void), options: { defer?: boolean } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let mm: gsap.MatchMedia | null = null;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      mm = gsap.matchMedia(root);
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (context) => {
        const desktop = Boolean(context.conditions?.["desktop"]);
        const q = gsap.utils.selector(root) as (selector: string) => HTMLElement[];
        return setup({ root, q, desktop });
      });
    };
    if (options.defer === false) run(); else enqueue(run);
    return () => { cancelled = true; mm?.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Smoothly scroll to a pixel offset or element, using Lenis when it is running. */
export function scrollToPosition(target: number | HTMLElement, duration = 1.4) {
  if (window.__lenis) window.__lenis.scrollTo(target, { duration });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
}
