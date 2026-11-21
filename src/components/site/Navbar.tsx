import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.webp";
import wordmark from "@/assets/wordmark.webp";

const NAV = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Automations", href: "/#automations" },
  { label: "Why Us", href: "/#why" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    return () => { document.body.style.overflow = ""; window.__lenis?.start(); };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-[999] px-3 pt-3 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${scrolled ? "md:pt-2" : "md:pt-5"}`}>
      <div className={`mx-auto grid h-16 max-w-[1240px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border px-4 transition-all duration-700 md:px-6 lg:flex lg:justify-between ${open ? "relative z-[10002]" : ""} ${scrolled ? "glass border-border" : "border-transparent bg-transparent"}`}>
        <Link to="/" className="relative z-10 flex min-w-0 items-center gap-3" aria-label="BuildrWeb home">
          <img src={logo} alt="" width={28} height={28} loading="eager" fetchPriority="high" decoding="sync" className="h-7 w-7 shrink-0" />
          <img src={wordmark} alt="BuildrWeb" width={117} height={18} loading="eager" decoding="sync" className="h-[18px] w-auto shrink-0" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} data-cursor="link" className="group relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
              <span className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <a href="/#contact" data-cursor="link" className="button-primary min-h-10 px-5">Start a project</a>
          </div>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative z-[10002] grid h-11 w-11 place-items-center border border-border bg-background/70 text-foreground lg:hidden">
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div aria-hidden={!open} className="fixed inset-0 z-[10001] bg-background lg:hidden" style={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", visibility: open ? "visible" : "hidden", transition: `clip-path .7s cubic-bezier(.22,1,.36,1), visibility 0s linear ${open ? "0s" : ".7s"}` }} onClick={() => setOpen(false)}>
        <div className="container-x flex min-h-screen flex-col justify-center" onClick={(event) => event.stopPropagation()}>
          <p className="label-eyebrow mb-10">Navigation</p>
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAV.map((item, index) => (
              <a key={`${item.label}-${open}`} href={item.href} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b border-border py-5 font-display text-[clamp(2.2rem,12vw,4rem)] uppercase leading-none ${open ? "menu-in" : ""}`} style={{ animationDelay: `${0.2 + index * 0.06}s` }}>
                {item.label}<span className="font-mono text-[10px] text-primary">0{index + 1}</span>
              </a>
            ))}
          </nav>
          <a href="mailto:hello@buildrweb.com" className="mt-10 font-mono text-xs text-muted-foreground">hello@buildrweb.com</a>
        </div>
      </div>
    </header>
  );
}
