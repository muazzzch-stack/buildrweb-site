import { useRef } from "react";
import { FileText, Layout, MessageSquare, Rocket } from "lucide-react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { SectionIntro } from "./primitives";

const STEPS = [{ n: "01", Icon: MessageSquare, title: "Discovery", body: "We learn your business, service area and goals — from website enquiries to calls and follow-ups." }, { n: "02", Icon: Layout, title: "System Design", body: "We map your website, AI voice agent and automations to your brand and customer journey." }, { n: "03", Icon: FileText, title: "Build and Connect", body: "We build your website, configure your AI receptionist and connect booking, follow-ups and CRM workflows." }, { n: "04", Icon: Rocket, title: "Go Live", body: "Everything is tested, then handed over. Website typically live within 14 days, voice agent and automations from week 3." }];

export function Process() {
  const ref = useRef<HTMLElement>(null);

  // Effect: a line is drawn by the scroll itself; each step lights up (orange icon, lifted card) as the line reaches it.
  useScrollFx(ref, ({ q, desktop }) => {
    const list = q("[data-steps]")[0];
    const line = q("[data-step-line]")[0];
    const steps = q("[data-step]");
    if (!list) return;
    if (line) gsap.fromTo(line, desktop ? { scaleX: 0 } : { scaleY: 0 }, { ...(desktop ? { scaleX: 1 } : { scaleY: 1 }), transformOrigin: desktop ? "left center" : "top center", ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 60%", scrub: true } });
    steps.forEach((step) => {
      const icon = step.querySelector("[data-step-icon]");
      const body = step.querySelector("[data-step-body]");
      gsap.set(body, { opacity: 0.35, y: 24 });
      ScrollTrigger_activate(step, icon, body);
    });
    function ScrollTrigger_activate(step: Element, icon: Element | null, body: Element | null) {
      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_OUT, duration: 0.9 } });
      tl.to(body, { opacity: 1, y: 0 }, 0).to(icon, { backgroundColor: "#f06a22", color: "#070806", borderColor: "#f06a22", scale: 1.08 }, 0);
      gsap.timeline({ scrollTrigger: { trigger: step, start: "top 70%", onEnter: () => void tl.play(), onLeaveBack: () => void tl.reverse() } });
    }
  });

  return (
    <section ref={ref} id="process" className="section-y overflow-hidden border-y border-border bg-secondary/40">
      <div className="container-x">
        <SectionIntro index="05 / 07" label="The process" variant="scale" copy="Your website typically goes live within 14 days, with the voice agent and automations added from week 3." title={[{ text: "From brief to live" }, { text: "and connected.", tone: "primary" }]} />
        <ol data-steps className="relative mt-20 grid gap-0 md:grid-cols-4">
          <span aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-border md:block" />
          <span aria-hidden data-step-line className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-primary md:block" />
          <span aria-hidden className="absolute top-8 bottom-8 left-8 w-px bg-border md:hidden" />
          {STEPS.map(({ n, Icon, title, body }) => (
            <li key={n} data-step className="relative grid grid-cols-[64px_1fr] gap-5 border-t border-border py-8 md:block md:border-t-0 md:px-5">
              <span data-step-icon className="relative z-10 grid h-16 w-16 place-items-center border border-border bg-background text-primary"><Icon size={20} strokeWidth={1.3} /></span>
              <div data-step-body className="md:mt-10"><p className="font-mono text-[9px] tracking-[.16em] text-primary">STEP {n}</p><h3 className="mt-3 font-display text-xl uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
