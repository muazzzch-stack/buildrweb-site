import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { useInView } from "react-intersection-observer";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";

const STATS = [{ end: 14, suffix: "d", decimals: 0, label: "Days to launch", note: "Typical website timeline, brief to live" }, { end: 24, suffix: "/7", decimals: 0, label: "Call answering", note: "AI voice agents that pick up when you cannot" }, { end: 95, suffix: "+", decimals: 0, label: "PageSpeed target", note: "Performance goal on every website we build" }, { end: 3, suffix: "", decimals: 0, label: "Services, one system", note: "Websites, AI voice agents and automations" }];

function Value({ end, suffix, decimals, active }: { end: number; suffix: string; decimals: number; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { start } = useCountUp({ ref: ref as never, end, suffix, decimals, duration: 2.2, startOnMount: false });
  useEffect(() => { if (active) start(); }, [active, start]);
  return <span ref={ref}>{`0${suffix}`}</span>;
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, rootMargin: "-60px" });

  // Effect: each stat scales up out of depth while a signal line draws across its top edge.
  useScrollFx(ref, ({ root, q }) => {
    const trigger = { trigger: root, start: "top 85%", once: true };
    gsap.from(q("[data-stat-line]"), { scaleX: 0, transformOrigin: "left center", duration: 1.8, stagger: 0.12, ease: EASE_OUT, scrollTrigger: trigger });
    gsap.from(q("[data-stat]"), { opacity: 0, y: 50, scale: 0.92, duration: 1.5, stagger: 0.12, ease: EASE_OUT, scrollTrigger: trigger });
  });

  return (
    <section ref={ref} className="border-b border-border">
      <div ref={inViewRef} className="container-x grid md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <article key={stat.label} data-stat className={`relative py-10 md:p-9 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
            <span aria-hidden data-stat-line className="absolute inset-x-0 top-0 h-px bg-primary/60" />
            <span className="absolute top-4 right-4 font-mono text-[9px] text-faint">0{index + 1}</span>
            <p className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-none text-primary"><Value {...stat} active={inView} /></p>
            <h2 className="mt-5 font-display text-sm uppercase">{stat.label}</h2>
            <p className="mt-2 text-xs text-faint">{stat.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
