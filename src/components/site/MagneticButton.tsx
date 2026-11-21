import { useRef, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MagneticLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - rect.left - rect.width / 2) * 0.15));
    const y = Math.max(-8, Math.min(8, (event.clientY - rect.top - rect.height / 2) * 0.15));
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <a ref={ref} href={href} data-cursor="link" onMouseMove={move} onMouseLeave={leave} style={{ transition: "transform .35s cubic-bezier(.22,1,.36,1)" }} className={`${variant === "primary" ? "button-primary" : "button-ghost"} ${className}`}>
      {children}
    </a>
  );
}
