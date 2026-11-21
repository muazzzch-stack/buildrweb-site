import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.webp";
import wordmark from "@/assets/wordmark.webp";
import { gsap, useScrollFx } from "@/lib/motion";

const LINKS = [{ label: "Services", href: "/#services" }, { label: "Our Work", href: "/#work" },
  { label: "Automations", href: "/#automations" }, { label: "Why Us", href: "/#why" }, { label: "Process", href: "/#process" }, { label: "Contact", href: "/#contact" }];
const SOCIALS = [{ label: "Instagram", href: "https://www.instagram.com/buildrweb_", Icon: Instagram }, { label: "WhatsApp", href: "https://wa.me/447916999893", Icon: MessageCircle }, { label: "Facebook", href: "https://www.facebook.com/share/1EDkjiDMri/", Icon: Facebook }];

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  // Effect: the giant letter rises and fades in, scrubbed to the scroll, as the footer comes into view.
  useScrollFx(ref, ({ q }) => {
    const mark = q("[data-footer-mark]")[0];
    if (mark) gsap.fromTo(mark, { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 0.3, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } });
  });

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border bg-background pt-24">
      <img aria-hidden alt="" data-footer-mark src={logo} width={160} height={160} loading="lazy" decoding="async" className="pointer-events-none absolute -bottom-[6vw] left-1/2 w-[min(46vw,26rem)] -translate-x-1/2 opacity-30" />
      <div className="container-x relative grid gap-16 pb-24 md:grid-cols-[1.4fr_.8fr_.8fr]">
        <div>
          <div className="flex items-center gap-3"><img src={logo} alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8" /><img src={wordmark} alt="BuildrWeb" width={133} height={20} loading="lazy" decoding="async" className="h-5 w-auto" /></div>
          <p className="mt-7 max-w-md font-display text-[clamp(2rem,4vw,4rem)] uppercase leading-[.95]">Websites, AI voice agents and automations.</p>
          <a href="mailto:hello@buildrweb.com" className="mt-8 inline-block border-b border-primary pb-2 font-mono text-xs text-primary">hello@buildrweb.com</a>
        </div>
        <div><p className="label-eyebrow">Navigate</p><ul className="mt-7 space-y-3">{LINKS.map((link) => <li key={link.label}><a href={link.href} className="footer-link inline-block text-sm text-muted-foreground"><span>{link.label}</span><span aria-hidden>{link.label}</span></a></li>)}<li><Link to="/privacy" className="footer-link inline-block text-sm text-muted-foreground"><span>Privacy Policy</span><span aria-hidden>Privacy Policy</span></Link></li></ul></div>
        <div><p className="label-eyebrow">Connect</p><div className="mt-7 flex gap-2">{SOCIALS.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Icon size={16} /></a>)}</div><p className="mt-7 font-mono text-[10px] uppercase tracking-[.14em] text-faint">UK trades &amp; local services<br />Remote-first studio</p></div>
      </div>
      <div className="container-x relative flex flex-col gap-2 border-t border-border py-6 font-mono text-[10px] uppercase tracking-[.14em] text-faint md:flex-row md:justify-between"><p>© 2026 BuildrWeb. All rights reserved.</p><p>Serving UK businesses</p></div>
    </footer>
  );
}
