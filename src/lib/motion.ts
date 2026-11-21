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
export function useScrollFx(ref: RefObject<HTMLElement | null>, setup: (context: FxContext) => void | (() => void)) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (context) => {
      const desktop = Boolean(context.conditions?.["desktop"]);
      const q = gsap.utils.selector(root) as (selector: string) => HTMLElement[];
      return setup({ root, q, desktop });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Smoothly scroll to a pixel offset or element, using Lenis when it is running. */
export function scrollToPosition(target: number | HTMLElement, duration = 1.4) {
  if (window.__lenis) window.__lenis.scrollTo(target, { duration });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
}
