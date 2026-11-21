import { useRef } from "react";
import { Code2, LifeBuoy, MapPin, PenTool, Timer } from "lucide-react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { SectionIntro } from "./primitives";

const ROWS = [{ Icon: Code2, title: "Built Around Enquiries", body: "Websites, AI voice agents and automations planned around how your customers find and contact you." }, { Icon: PenTool, title: "Business-Specific Messaging", body: "Website copy, voice agent scripts and follow-ups written for your customers." }, { Icon: MapPin, title: "Local SEO Foundations", body: "Local schema, structured data and Google Business Profile guidance built in from the start." }, { Icon: Timer, title: "A Connected Launch", body: "Your website typically goes live within 14 days, with the voice agent and automations added from week 3." }, { Icon: LifeBuoy, title: "Support After Launch", body: "We stay available for fixes, changes and questions once you are live." }];
const GUARANTEES = ["Designed around your business.", "Fast, mobile-first and SEO-ready.", "Your website and content belong to you."];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  // Effect: the quote stays pinned on the left while the reasons slide in from the right and a signal line fills down their edge.
  useScrollFx(ref, ({ q, desktop }) => {
    const rows = q("[data-why-row]");
    rows.forEach((row) => gsap.from(row, { opacity: 0, x: desktop ? 80 : 0, y: desktop ? 0 : 30, duration: 1.3, ease: EASE_OUT, scrollTrigger: { trigger: row, start: "top 88%", once: true } }));
    q("[data-why-guarantee]").forEach((item, i) => gsap.from(item, { opacity: 0, y: 20, duration: 1, delay: i * 0.08, ease: EASE_OUT, scrollTrigger: { trigger: item, start: "top 92%", once: true } }));
    const list = q("[data-why-list]")[0];
    const fill = q("[data-why-fill]")[0];
    if (list && fill) gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: true } });
  });

  return (
    <section ref={ref} id="why" className="section-y">
      <div className="container-x">
        <SectionIntro index="04 / 07" label="The difference" variant="wipe" title={[{ text: "More than a website." }, { text: "A connected system.", tone: "stroke" }]} />
        <div className="mt-20 grid gap-16 lg:grid-cols-[.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <blockquote className="font-display text-[clamp(1.8rem,4vw,3.75rem)] uppercase leading-[1.04]">“We connect your website, AI receptionist and automations into one system, so more enquiries turn into booked work.”</blockquote>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[.15em] text-primary">Built for UK trades and local services.</p>
            <ul className="mt-12 border-t border-border">{GUARANTEES.map((guarantee, index) => <li key={guarantee} data-why-guarantee className="flex items-center gap-5 border-b border-border py-4 text-sm"><span className="font-mono text-[9px] text-primary">0{index + 1}</span>{guarantee}</li>)}</ul>
          </div>
          <div data-why-list className="relative border-t border-border">
            <span aria-hidden data-why-fill className="absolute top-0 -left-px hidden h-full w-px bg-primary lg:block" />
            {ROWS.map(({ Icon, title, body }, index) => (
              <article key={title} data-why-row className="group grid gap-5 border-b border-border py-7 md:grid-cols-[55px_1fr] md:items-start">
                <span className="grid h-11 w-11 place-items-center border border-border text-primary transition-colors group-hover:border-primary"><Icon size={18} strokeWidth={1.4} /></span>
                <div><div className="flex justify-between gap-4"><h3 className="font-display text-xl uppercase md:text-2xl">{title}</h3><span className="font-mono text-[9px] text-faint">0{index + 1}</span></div><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
