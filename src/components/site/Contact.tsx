import { useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Instagram, Loader2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, EASE_OUT, useScrollFx } from "@/lib/motion";
import { SectionIntro } from "./primitives";

type FormValues = { name: string; email: string; phone?: string; need: string; trade: string; message: string; _gotcha?: string };
const FORM_ENDPOINT = "https://formspree.io/f/xvzjlaqd";
const TRADES = ["Plumber", "Electrician", "Roofer", "Gas Engineer", "HVAC", "Scaffolder", "Builder", "Garage Specialist", "Dentist", "Restaurant", "Estate Agent", "Other"];
const METHODS = [{ Icon: Mail, label: "hello@buildrweb.com", href: "mailto:hello@buildrweb.com" }, { Icon: MessageCircle, label: "Chat on WhatsApp", href: "https://wa.me/447916999893" }, { Icon: Instagram, label: "@buildrweb_", href: "https://www.instagram.com/buildrweb_" }];
const controlClass = "peer w-full border-0 border-b border-border bg-transparent px-0 pt-6 pb-3 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-primary";

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return <div data-field className="relative"><div>{children}</div><label htmlFor={id} className="pointer-events-none absolute top-0 left-0 font-mono text-[9px] uppercase tracking-[.14em] text-faint transition-colors peer-focus:text-primary">{label}</label>{error ? <p className="mt-2 text-xs text-primary">{error}</p> : null}</div>;
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
  const [detail, setDetail] = useState("");
  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setDetail("");
    // Honeypot: real visitors never fill this field, so a value means a bot. Pretend success and send nothing.
    if (values._gotcha) { setStatus("success"); return; }
    const body = new FormData();
    body.append("name", values.name);
    body.append("email", values.email);
    body.append("phone", values.phone ?? "");
    body.append("service_needed", values.need);
    body.append("trade", values.trade);
    body.append("message", values.message);
    body.append("_subject", `New BuildrWeb enquiry: ${values.need} (${values.trade})`);
    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body });
      if (response.ok) { setStatus("success"); return; }
      const data = (await response.json().catch(() => null)) as { error?: string; errors?: { message?: string }[] } | null;
      setDetail(data?.errors?.map((item) => item.message).filter(Boolean).join(" ") || data?.error || `Form service responded with status ${response.status}.`);
      setStatus("error");
    } catch {
      setDetail("Could not reach the form service. Check your connection and try again.");
      setStatus("error");
    }
  };

  // Effect: the form panel rises as one glass sheet and its fields cascade in; direct-line rows slide from the left.
  useScrollFx(ref, ({ q }) => {
    const panel = q("[data-panel]")[0];
    if (panel) gsap.from(panel, { opacity: 0, y: 70, scale: 0.97, duration: 1.5, ease: EASE_OUT, scrollTrigger: { trigger: panel, start: "top 88%", once: true } });
    const fields = q("[data-field], [data-submit]");
    if (fields.length) gsap.from(fields, { opacity: 0, y: 24, duration: 1, stagger: 0.07, ease: EASE_OUT, scrollTrigger: { trigger: panel ?? ref.current, start: "top 80%", once: true } });
    q("[data-method]").forEach((el, i) => gsap.from(el, { opacity: 0, x: -40, duration: 1.2, delay: i * 0.08, ease: EASE_OUT, scrollTrigger: { trigger: el, start: "top 92%", once: true } }));
  });

  return (
    <section ref={ref} id="contact" className="section-y border-t border-border">
      <div className="container-x">
        <SectionIntro index="07 / 07" label="Start a project" variant="rise" title={[{ text: "Let's build your" }, { text: "system.", tone: "primary" }]} copy="Tell us about your business and the website, AI voice agent or automations you need. We reply within one working day." />
        <div className="mt-20 grid gap-16 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="font-display text-2xl uppercase">Prefer a direct line?</p>
            <div className="mt-8 border-t border-border">{METHODS.map(({ Icon, label, href }) => <a key={label} data-method href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between border-b border-border py-5"><span className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground"><Icon size={17} className="text-primary" />{label}</span><ArrowUpRight size={15} className="text-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}</div>
          </div>
          <div data-panel className="glass relative p-6 md:p-10">
            {status === "success" ? (
              <div className="swap-in flex min-h-96 flex-col justify-center"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">Message received</p><h3 className="mt-6 font-display text-4xl uppercase md:text-6xl">Thank you.</h3><p className="mt-5 text-muted-foreground">Thank you for getting in touch. We will reply within one working day.</p></div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-9 md:grid-cols-2" noValidate>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("_gotcha")} />
                <Field id="name" label="Full name" error={errors.name?.message}><input id="name" type="text" placeholder="Full name" className={controlClass} {...register("name", { required: "Please enter your name" })} /></Field>
                <Field id="email" label="Email address" error={errors.email?.message}><input id="email" type="email" placeholder="Email address" className={controlClass} {...register("email", { required: "Please enter your email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} /></Field>
                <Field id="phone" label="Phone number"><input id="phone" type="tel" placeholder="Phone number" className={controlClass} {...register("phone")} /></Field>
                <Field id="need" label="What do you need?" error={errors.need?.message}><select id="need" className={controlClass} defaultValue="" {...register("need", { required: "Please select what you need" })}><option value="" disabled>Select a service</option>{["Website", "AI Voice Agent", "Automation", "All of the above"].map((need) => <option key={need} value={need}>{need}</option>)}</select></Field>
                <Field id="trade" label="Your trade" error={errors.trade?.message}><select id="trade" className={controlClass} defaultValue="" {...register("trade", { required: "Please select your trade" })}><option value="" disabled>Select your trade</option>{TRADES.map((trade) => <option key={trade} value={trade}>{trade}</option>)}</select></Field>
                <div className="md:col-span-2"><Field id="message" label="Project details" error={errors.message?.message}><textarea id="message" rows={4} placeholder="Project details" className={`${controlClass} resize-none`} {...register("message", { required: "Please add a short message" })} /></Field></div>
                {status === "error" ? <div role="alert" className="border border-primary p-4 text-xs leading-6 text-primary md:col-span-2"><p>Your message could not be sent. {detail}</p><p className="mt-2">Please email us directly at <a href="mailto:hello@buildrweb.com" className="underline">hello@buildrweb.com</a> or message us on WhatsApp.</p></div> : null}
                <Button data-submit type="submit" disabled={status === "loading"} className="button-primary h-auto rounded-none shadow-none whitespace-normal md:col-span-2">{status === "loading" ? <>Sending <Loader2 size={15} className="animate-spin" /></> : <>Send enquiry <ArrowUpRight size={15} /></>}</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
