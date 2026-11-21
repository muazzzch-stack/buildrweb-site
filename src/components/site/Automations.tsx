import { useRef } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { SectionIntro } from "./primitives";
import { FlowDiagram, FLOW_ASPECT } from "./FlowDiagram";

const DEMOS = [
  {
    filename: "dental-automation",
    kind: "dental",
    level: "Simple",
    badge: "Bright Smile Dental · Sample demo",
    title: "Booking Confirmation + Reminder",
    description: "A patient books online or by phone. Their details are saved to a sheet, a confirmation email goes out automatically, the dentist is alerted, and a reminder follows the next day.",
    steps: ["Booking received", "Confirm + alert", "Reminder sent"],
    alt: "Automation flow for Bright Smile Dental: booking, confirmation, dentist alert and reminder",
  },
  {
    filename: "restaurant-automation",
    kind: "restaurant",
    level: "Medium",
    badge: "The Olive & Oak · Sample demo",
    title: "Table Booking + Smart Alerts",
    description: "Every reservation is logged and confirmed. A smart router then sends allergy alerts to the chef, large groups to the events manager and celebrations to the host, so nothing is missed.",
    steps: ["Booking logged", "Guest confirmed", "Right person alerted"],
    alt: "Automation flow for The Olive & Oak: reservation logging, guest confirmation and allergy, group and celebration alerts",
  },
  {
    filename: "realestate-automation",
    kind: "realestate",
    level: "Advanced",
    badge: "Harbour Lane Estates · Sample demo",
    title: "AI Lead Scoring + Viewing Booking",
    description: "After a call, AI reads the summary and scores the buyer hot, warm or cold. Hot leads alert the agent and book a viewing, warm leads get a next-day follow-up and cold leads get a thank-you.",
    steps: ["AI scores the lead", "Router picks the path", "Viewing booked"],
    alt: "Automation flow for Harbour Lane Estates: AI lead scoring, hot, warm and cold routing, viewing booking and follow-up",
  },
] as const;

function Diagram({ demo, large = false }: { demo: (typeof DEMOS)[number]; large?: boolean }) {
  return (
    <div className={`dot-field ${large ? "mx-auto w-full max-w-[34rem] p-4 sm:p-8" : "h-full w-full p-2.5"}`} style={{ aspectRatio: FLOW_ASPECT }}>
      <FlowDiagram kind={demo.kind} label={demo.alt} live={large} className="h-full w-full" />
    </div>
  );
}

export function Automations() {
  const ref = useRef<HTMLElement>(null);

  // Effect: the three cards arrive from different directions (left, below, right). Once a card is in view its
  // diagram builds itself: connectors draw, nodes cascade in step order, then signal pulses start travelling.
  useScrollFx(ref, ({ q, desktop }) => {
    q("[data-card]").forEach((card, index) => {
      const from = desktop ? ([{ x: -90 }, { y: 100 }, { x: 90 }][index] ?? { y: 60 }) : { y: 60 };
      gsap.from(card, { ...from, opacity: 0, scale: 0.94, duration: 1.4, ease: EASE_OUT, scrollTrigger: { trigger: card, start: "top 90%", once: true } });

      const svg = card.querySelector<SVGSVGElement>("[data-flow-svg]");
      if (!svg) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 70%", once: true, onEnter: () => { window.setTimeout(() => svg.setAttribute("data-live", "true"), 1800); } } });
      const ord = (el: Element) => Number(el.getAttribute("data-ord") ?? 0) * 0.11;
      svg.querySelectorAll("[data-fe]").forEach((el) => tl.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, ord(el)));
      svg.querySelectorAll("[data-fn], [data-fp]").forEach((el) => tl.from(el, { opacity: 0, y: 12, scale: 0.97, duration: 0.6, ease: EASE_OUT }, ord(el)));
    });
    const note = q("[data-note]")[0];
    if (note) gsap.from(note, { opacity: 0, y: 16, duration: 1.2, ease: EASE_OUT, scrollTrigger: { trigger: note, start: "top 95%", once: true } });
  });

  return (
    <section ref={ref} id="automations" className="section-y border-b border-border">
      <div className="container-x">
        <SectionIntro index="03 / 07" label="Automations" variant="blur" title={[{ text: "Automations in" }, { text: "action.", tone: "primary" }]} copy="Example workflows that run behind the scenes after a call or enquiry. Sample demos for fictional businesses." />
        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {DEMOS.map((demo) => (
            <div key={demo.filename} data-card className="min-w-0">
              <article className="flex h-full min-w-0 flex-col border border-border bg-card">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" aria-label={`Enlarge ${demo.title} flow diagram`} className="group relative block w-full cursor-pointer overflow-hidden border-b border-border bg-background p-0 text-left">
                      <Diagram demo={demo} />
                      <span aria-hidden className="absolute top-4 right-4 grid h-11 w-11 place-items-center border border-border bg-background text-primary transition-colors group-hover:border-primary"><Expand size={18} /></span>
                    </button>
                  </DialogTrigger>
                  <DialogContent overlayClassName="z-[30010]" className="z-[30011] max-h-[90svh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-none border-border sm:rounded-none">
                    <DialogTitle className="pr-8 font-display text-xl uppercase tracking-normal">{demo.title}</DialogTitle>
                    <DialogDescription className="font-mono text-[10px] uppercase tracking-[.12em]">{demo.badge}</DialogDescription>
                    <div className="border border-border bg-background"><Diagram demo={demo} large /></div>
                  </DialogContent>
                </Dialog>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[.16em] text-primary">{demo.level}</p>
                  <p className="mt-3 self-start border border-border px-2 py-1 font-mono text-[9px] uppercase leading-5 text-muted-foreground">{demo.badge}</p>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight">{demo.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{demo.description}</p>
                  <div className="mt-auto pt-6">
                    <p className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">How it works</p>
                    <ol className="mt-3 flex flex-wrap gap-2">{demo.steps.map((step) => <li key={step} className="border border-border px-2 py-2 font-mono text-[9px] uppercase leading-4 text-muted-foreground">{step}</li>)}</ol>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        <p data-note className="mt-8 font-mono text-[10px] leading-6 text-faint">All businesses shown are fictional samples, built to demonstrate what we can create for you.</p>
      </div>
    </section>
  );
}
