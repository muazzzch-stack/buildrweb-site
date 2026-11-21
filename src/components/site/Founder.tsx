import { useRef } from "react";
import { MapPin, Wrench } from "lucide-react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import founder from "@/assets/founder.webp";
import { SectionIntro } from "./primitives";

export function Founder() {
  const ref = useRef<HTMLElement>(null);

  // Effect: the portrait block is unveiled with a clip-path wipe while the big letter drifts; copy rises in beside it.
  useScrollFx(ref, ({ q }) => {
    const mark = q("[data-founder-mark]")[0];
    const photo = q("[data-founder-photo]")[0];
    if (mark) gsap.fromTo(mark, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.7, ease: "expo.inOut", scrollTrigger: { trigger: mark, start: "top 82%", once: true } });
    if (photo) gsap.fromTo(photo, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: mark ?? ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    q("[data-founder-copy]").forEach((el, i) => gsap.from(el, { opacity: 0, y: 36, duration: 1.3, delay: i * 0.05, ease: EASE_OUT, scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
  });

  return (
    <section ref={ref} className="section-y">
      <div className="container-x">
        <SectionIntro index="06 / 07" label="The founder" variant="blur" title={[{ text: "Built by a founder" }, { text: "you deal with directly.", tone: "stroke" }]} />
        <div className="mt-20 grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div data-founder-mark className="founder-mark relative aspect-[4/5] max-w-md overflow-hidden border border-border"><img data-founder-photo src={founder} alt="Muaz, founder of BuildrWeb" width={800} height={868} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-[50%_20%]" /><span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[.16em] text-foreground">Muaz / Founder</span></div>
          <div className="flex flex-col justify-center">
            <p data-founder-copy className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">Muaz / Founder, BuildrWeb</p>
            <p data-founder-copy className="mt-8 max-w-3xl font-display text-[clamp(1.75rem,4vw,3.5rem)] uppercase leading-[1.06]">Great tradespeople and local service businesses should never lose work because their website, calls or follow-ups cannot keep up with their reputation.</p>
            <p data-founder-copy className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">BuildrWeb builds websites, AI voice agents and automations for UK tradespeople and local service businesses. The aim is simple: fast pages that get found, calls that get answered, and follow-ups that actually happen. You work with the founder directly, from the first conversation through to launch.</p>
            <div data-founder-copy className="mt-10 flex flex-wrap gap-3"><span className="flex items-center gap-3 border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em]"><MapPin size={15} className="text-primary" />Remote-first</span><span className="flex items-center gap-3 border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em]"><Wrench size={15} className="text-primary" />Trades &amp; local services</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
