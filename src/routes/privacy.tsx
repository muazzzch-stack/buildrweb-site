import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BackToTop, CustomCursor, ScrollProgress, SmoothScroll } from "@/components/site/Chrome";
import { LAST_UPDATED, SECTIONS } from "@/lib/privacy-content";

const DESCRIPTION = "How BuildrWeb handles personal data for websites, AI voice agents and automations: what we collect, the apps we use, the access we request, retention, transfers and your UK GDPR rights.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | BuildrWeb: Websites, AI Voice Agents & Automations" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Privacy Policy | BuildrWeb" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://buildrweb.com/privacy" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://buildrweb.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://buildrweb.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://buildrweb.com/privacy" }],
  }),
  component: PrivacyPage,
});

const slug = (index: number) => `s${index + 1}`;
const pad = (index: number) => String(index + 1).padStart(2, "0");

function PrivacyPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative overflow-hidden pt-36 pb-28">
        <div className="grid-field absolute inset-0 opacity-20" aria-hidden />
        <div className="container-x relative">
          <p className="label-eyebrow">Legal / Privacy</p>
          <h1 className="swap-in mt-8 font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[.86]">
            Privacy<br /><span className="text-stroke">policy.</span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-border pt-6 md:grid-cols-[1fr_auto]">
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              A detailed explanation of the data BuildrWeb collects for websites, AI voice agents and automations, the apps and access involved, how a remote-first studio protects it, and the control you keep under UK GDPR and the Data Protection Act 2018.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-faint">Last updated / {LAST_UPDATED}</p>
          </div>

          <nav aria-label="Privacy policy contents" className="glass mx-auto mt-16 max-w-4xl p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">Contents</p>
            <ol className="mt-6 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {SECTIONS.map((section, index) => (
                <li key={section.title}>
                  <a href={`#${slug(index)}`} className="group flex gap-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <span className="font-mono text-[10px] text-primary">{pad(index)}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="glass relative mx-auto mt-8 max-w-4xl p-6 md:p-12">
            {SECTIONS.map((section, index) => (
              <section key={section.title} id={slug(index)} className="grid gap-5 border-b border-border py-9 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[80px_1fr]">
                <p className="font-mono text-[10px] text-primary">{pad(index)}</p>
                <div>
                  <h2 className="font-display text-xl uppercase md:text-2xl">{section.title}</h2>
                  {section.paragraphs ? <div className="mt-4 space-y-3">{section.paragraphs.map((line) => <p key={line} className="text-sm leading-7 text-muted-foreground">{line}</p>)}</div> : null}
                  {section.table ? (
                    <dl className="mt-5 border-t border-border">
                      {section.table.map(([label, text]) => (
                        <div key={label} className="grid gap-1 border-b border-border py-3 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.4fr)] md:gap-6">
                          <dt className="text-sm font-semibold leading-6 text-foreground">{label}</dt>
                          <dd className="text-sm leading-6 text-muted-foreground">{text}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {section.bullets ? <ul className="mt-5 space-y-2 border-l border-border pl-4">{section.bullets.map((line) => <li key={line} className="text-sm leading-7 text-muted-foreground">{line}</li>)}</ul> : null}
                  {section.closing ? <div className="mt-5 space-y-3">{section.closing.map((line) => <p key={line} className="text-sm leading-7 text-muted-foreground">{line}</p>)}</div> : null}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
