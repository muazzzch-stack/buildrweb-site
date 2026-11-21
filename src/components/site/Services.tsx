import { useRef } from "react";
import { Gauge, Workflow, PhoneCall, Code2, PanelsTopLeft } from "lucide-react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { SectionIntro } from "./primitives";

const SERVICES = [
  { n: "01", Icon: PanelsTopLeft, title: "WordPress Websites", body: "Fast, SEO-ready websites that are easy to edit. Keep your pages current and turn visitors into enquiries.", tag: "Easy to edit" },
  { n: "02", Icon: Code2, title: "AI-Powered Website Development", body: "Custom designs delivered faster with AI-assisted development. Every page is structured around getting you more enquiries.", tag: "Custom builds" },
  { n: "03", Icon: PhoneCall, title: "AI Voice Agents", body: "Answer calls around the clock, take bookings and capture lead details. An AI receptionist that keeps your business reachable when you cannot pick up.", tag: "Always answering" },
  { n: "04", Icon: Workflow, title: "Business Automations", body: "Connect lead capture, confirmations, reminders and CRM updates. Follow up consistently without the repetitive admin.", tag: "Connected workflows" },
  { n: "05", Icon: Gauge, title: "Local SEO and Speed", body: "Local SEO foundations, Google Business Profile guidance and websites built to target 95+ PageSpeed. Help local customers find you and load pages quickly.", tag: "Local SEO & speed" },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);

  // Effect: rows sweep in from the left; the icon spins into place and the text follows in sequence.
  useScrollFx(ref, ({ q }) => {
    q("[data-service]").forEach((row) => {
      const timeline = gsap.timeline({ defaults: { ease: EASE_OUT }, scrollTrigger: { trigger: row, start: "top 90%", once: true } });
      timeline
        .from(row, { opacity: 0, x: -70, duration: 1.4 }, 0)
        .from(row.querySelectorAll("[data-service-icon]"), { rotate: -90, scale: 0.4, duration: 1.5 }, 0.1)
        .from(row.querySelectorAll("[data-service-text]"), { opacity: 0, y: 22, duration: 1.2, stagger: 0.08 }, 0.2);
    });
  });

  return (
    <section ref={ref} id="services" className="section-y">
      <div className="container-x">
        <SectionIntro index="01 / 07" label="Capabilities" variant="rise" title={[{ text: "Websites, voice and automation," }, { text: "engineered to work together.", tone: "stroke" }]} copy="Fast websites, AI voice agents and connected automations for UK tradespeople and local service businesses. One system to capture enquiries, answer calls and follow up." />
        <div className="mt-20 border-t border-border">
          {SERVICES.map(({ n, Icon, title, body, tag }) => (
            <article key={title} data-service className="group grid gap-6 border-b border-border py-9 transition-colors hover:bg-card/50 md:grid-cols-[80px_1fr_1fr_auto] md:items-center md:px-5">
              <p data-service-text className="font-mono text-[10px] text-faint">{n}</p>
              <div className="flex items-center gap-4"><span data-service-icon className="inline-flex"><Icon size={22} strokeWidth={1.3} className="text-primary" /></span><h3 data-service-text className="font-display text-xl uppercase md:text-2xl">{title}</h3></div>
              <p data-service-text className="max-w-lg text-sm leading-6 text-muted-foreground">{body}</p>
              <span data-service-text className="font-mono text-[9px] uppercase tracking-[.14em] text-primary">{tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
