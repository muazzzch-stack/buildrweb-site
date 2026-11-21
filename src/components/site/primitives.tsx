import { Fragment, useRef, type ReactNode } from "react";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="label-eyebrow">{children}</p>;
}

/** One line of a headline. `tone` styles the whole line. */
export type TitleLine = { text: string; tone?: "primary" | "stroke" };

/** Renders headline lines word by word so each word can animate inside its own mask. */
export function SplitTitle({ lines }: { lines: TitleLine[] }) {
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.text.split(" ").map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              {wordIndex > 0 ? " " : null}
              <span className="split-word">
                <span data-word className={`inline-block will-change-transform ${line.tone === "primary" ? "text-primary" : line.tone === "stroke" ? "text-stroke" : ""}`}>{word}</span>
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}

/** Each section picks a different headline reveal. */
export type HeadingVariant = "rise" | "blur" | "wipe" | "scale" | "tilt";

export function SectionIntro({ index, label, title, copy, variant = "rise", compact = false }: { index: string; label: string; title: TitleLine[]; copy?: string; variant?: HeadingVariant; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFx(ref, ({ q }) => {
    const heading = q("[data-heading]")[0];
    const words = q("[data-word]");
    const meta = q("[data-meta]");
    const rule = q("[data-rule]");
    if (!heading) return;
    const trigger = { trigger: heading, start: "top 88%", once: true };

    gsap.from(rule, { scaleX: 0, transformOrigin: "left center", duration: 1.6, ease: EASE_OUT, scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } });
    gsap.from(meta, { opacity: 0, y: 14, duration: 1.1, stagger: .08, ease: EASE_OUT, scrollTrigger: trigger });
    const copyEls = q("[data-copy]");
    if (copyEls.length) gsap.from(copyEls, { opacity: 0, y: 24, duration: 1.3, delay: .35, ease: EASE_OUT, scrollTrigger: trigger });

    switch (variant) {
      case "blur":
        gsap.from(words, { opacity: 0, y: 36, filter: "blur(14px)", duration: 1.4, stagger: .07, ease: EASE_OUT, scrollTrigger: trigger });
        break;
      case "wipe":
        gsap.from(heading, { clipPath: "inset(0 100% 0 0)", duration: 1.5, ease: "power4.inOut", scrollTrigger: trigger });
        gsap.from(words, { x: -40, duration: 1.5, stagger: .06, ease: EASE_OUT, scrollTrigger: trigger });
        break;
      case "scale":
        gsap.from(words, { opacity: 0, scale: 1.35, yPercent: 20, duration: 1.3, stagger: .08, ease: EASE_OUT, scrollTrigger: trigger });
        break;
      case "tilt":
        gsap.from(words, { opacity: 0, rotateX: -85, yPercent: 60, transformOrigin: "50% 100%", transformPerspective: 700, duration: 1.4, stagger: .08, ease: EASE_OUT, scrollTrigger: trigger });
        break;
      default:
        gsap.from(words, { yPercent: 115, duration: 1.4, stagger: .08, ease: EASE_OUT, scrollTrigger: trigger });
    }
  });

  return (
    <div ref={ref} className={`relative grid gap-8 pt-6 ${compact ? "" : "md:grid-cols-[140px_1fr]"}`}>
      <span aria-hidden data-rule className="absolute inset-x-0 top-0 h-px bg-border" />
      <div data-meta className="font-mono text-[11px] tracking-[0.16em] text-faint">{index}</div>
      <div>
        <div data-meta><SectionLabel>{label}</SectionLabel></div>
        <h2 data-heading className={`${compact ? "h2-compact mt-5" : "h2-display mt-7"} max-w-5xl`}><SplitTitle lines={title} /></h2>
        {copy ? <p data-copy className={`${compact ? "mt-5" : "mt-7"} max-w-2xl text-base leading-7 text-muted-foreground`}>{copy}</p> : null}
      </div>
    </div>
  );
}
