import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Moon, Sun, Mail, Phone, Facebook, ExternalLink, ArrowRight, Workflow,
  Settings2, Calendar, MessageSquare, BarChart3, Bot, Sparkles, Briefcase,
  GraduationCap, MapPin, Send, Linkedin
} from "lucide-react";
import photoAsset from "@/assets/rean-pineda.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rean Pineda — Technical VA & Automation Specialist" },
      { name: "description", content: "Technical Virtual Assistant specializing in GoHighLevel, n8n workflow automation, and CRM management." },
      { property: "og:title", content: "Rean Pineda — Technical VA & Automation Specialist" },
      { property: "og:description", content: "Workflow automation, CRM, and virtual assistance backed by 10+ years of corporate experience." },
      { property: "og:image", content: photoAsset.url },
      { property: "twitter:image", content: photoAsset.url },
    ],
  }),
  component: Portfolio,
});

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function rippleHandler(e: React.MouseEvent<HTMLElement>) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple";
  span.style.width = span.style.height = `${size}px`;
  span.style.left = `${e.clientX - rect.left - size / 2}px`;
  span.style.top = `${e.clientY - rect.top - size / 2}px`;
  target.appendChild(span);
  setTimeout(() => span.remove(), 700);
}

const nav = [
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "sample-work", label: "Sample Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const { dark, toggle } = useTheme();
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BackgroundFX />
      <Header scrolled={scrolled} dark={dark} toggle={toggle} />
      <main className="relative">
        <Hero />
        <Services />
        <Skills />
        <SampleWork />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-grad-hero">
      <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-grad-primary opacity-30 blur-3xl animate-float" />
      <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-grad-accent opacity-25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-grad-primary opacity-20 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-grad-primary font-display text-base font-bold text-white shadow-glow transition-transform group-hover:scale-110">
        R
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Rean<span className="text-grad">Pineda</span>
      </span>
    </a>
  );
}

function Header({ scrolled, dark, toggle }: { scrolled: boolean; dark: boolean; toggle: () => void }) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 backdrop-blur-xl bg-background/70 border-b border-border" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { rippleHandler(e); toggle(); }}
            aria-label="Toggle theme"
            className="relative overflow-hidden grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-all hover:scale-110 hover:shadow-glow"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            onClick={rippleHandler}
            className="relative overflow-hidden hidden sm:inline-flex items-center gap-2 rounded-full bg-grad-primary px-4 py-2 text-sm font-medium text-white shadow-elegant transition-transform hover:scale-105"
          >
            Hire me <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for projects
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-grad">Rean Pineda</span>
            <br />
            <span className="text-foreground/90">Automation</span> meets execution.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Technical Virtual Assistant specializing in <span className="text-foreground font-medium">GoHighLevel</span>,
            <span className="text-foreground font-medium"> n8n workflow automation</span>, and CRM management — backed by
            10+ years of corporate sales & trade-marketing experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" onClick={rippleHandler}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-grad-primary px-6 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-105">
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" onClick={rippleHandler}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full border border-border glass px-6 py-3 text-sm font-semibold transition-transform hover:scale-105">
              View services
            </a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { n: "10+", l: "Years corporate" },
              { n: "4+", l: "Automation tools" },
              { n: "100%", l: "Client focus" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-grad sm:text-3xl">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-grad-primary opacity-40 blur-3xl animate-pulse-glow" />
            <div className="absolute -inset-1 rounded-full bg-grad-primary animate-pulse-glow" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-background sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <img
                src={photoAsset.url}
                alt="Rean Pineda — Technical Virtual Assistant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-elegant animate-float">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Bot className="h-4 w-4 text-primary" />
                n8n + GoHighLevel
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-elegant animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-accent" />
                Workflow Pro
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-grad">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const services = [
  { icon: Bot, title: "Workflow Automation", desc: "Design and deploy n8n workflows that connect your tools, eliminate repetitive tasks, and run 24/7." },
  { icon: Workflow, title: "GoHighLevel Setup", desc: "Funnels, pipelines, calendars, and automations configured end-to-end inside GoHighLevel." },
  { icon: Settings2, title: "CRM Management", desc: "Clean databases, lead routing, pipeline hygiene, and reporting that actually drives decisions." },
  { icon: Calendar, title: "Calendar & Inbox", desc: "Email triage, scheduling, follow-ups, and admin support so you can focus on the work that matters." },
  { icon: BarChart3, title: "Reporting & Ops", desc: "Excel dashboards, KPI tracking, and operations coordination from 10+ years of corporate practice." },
  { icon: MessageSquare, title: "Client Communication", desc: "Account management, stakeholder updates, and customer relationship workflows." },
];

function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Services" title="What I help with" subtitle="A blend of virtual assistance and modern automation — tailored to small teams and growing businesses." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              onClick={rippleHandler}
              className="reveal group relative overflow-hidden rounded-2xl border border-border glass p-6 transition-all hover:-translate-y-1 hover:shadow-elegant cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-grad-primary" style={{ mixBlendMode: "soft-light" }} />
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-grad-primary text-white shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const skills = [
  "Virtual Assistance", "Administrative Support", "Calendar & Email Management",
  "CRM Management", "GoHighLevel", "n8n Automation", "Workflow Automation",
  "Zapier", "Make.com", "Claude AI", "Sales & Client Management",
  "Microsoft Excel", "Microsoft Word", "PowerPoint", "Communication", "Problem Solving",
];

function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Core Skills" title="Tools & strengths" subtitle="Practical capabilities across automation, CRM, and day-to-day virtual assistance." />
        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          {skills.map((s) => (
            <span
              key={s}
              onClick={rippleHandler}
              className="relative overflow-hidden cursor-pointer rounded-full border border-border glass px-4 py-2 text-sm font-medium transition-all hover:scale-105 hover:bg-grad-primary hover:text-white hover:border-transparent"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleWork() {
  return (
    <section id="sample-work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Portfolio"
          title="Sample Web Design Work"
          subtitle="A live project I built — click to explore the booking experience."
        />
        <div className="reveal mt-14 flex justify-center">
          <a
            href="https://mclife-works-website-2v90.bolt.host/#booking"
            target="_blank"
            rel="noreferrer"
            onClick={rippleHandler}
            className="relative overflow-hidden inline-flex items-center gap-3 rounded-2xl border border-border glass px-8 py-6 text-center transition-all hover:scale-105 hover:shadow-elegant"
          >
            <ExternalLink className="h-5 w-5 text-primary" />
            <div>
              <div className="font-display text-lg font-semibold">View Live Sample Project</div>
              <div className="mt-1 text-xs text-muted-foreground">McLife Works — Booking Website</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

const experience = [
  {
    role: "Sales Executive",
    company: "Cosmic Technologies Inc.",
    period: "2023 — 2026",
    points: [
      "Managed key client accounts and maintained strong customer relationships.",
      "Coordinated with buyers and stakeholders across the supply chain.",
      "Prepared reports, monitored inventory, and ensured operational excellence.",
    ],
  },
  {
    role: "Merchandising Coordinator — Trade Marketing",
    company: "Cosmic Technologies Inc.",
    period: "2016 — 2023",
    points: [
      "Coordinated merchandising operations and supervised field teams.",
      "Managed reports, scheduling, and communication across departments.",
      "Ensured execution of marketing campaigns and retail standards.",
    ],
  },
  {
    role: "Continuous Learning",
    company: "n8n · GoHighLevel · Zapier · Make.com · Claude AI",
    period: "Ongoing",
    points: [
      "Currently enrolled in n8n Workflow Automation online course.",
      "Currently enrolled in GoHighLevel CRM & Funnel Building.",
      "Self-learning AI tools, business automation, and process optimization.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle eyebrow="Experience" title="Work history" />
        <div className="mt-14 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-1/2" />
          {experience.map((e, i) => (
            <div
              key={e.role}
              className={`reveal relative mb-10 grid gap-4 sm:grid-cols-2 ${i % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}
            >
              <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                <div className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-grad-primary shadow-glow sm:left-1/2" />
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{e.period}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{e.role}</h3>
                <div className="text-sm text-grad font-medium">{e.company}</div>
              </div>
              <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h4 className="font-display text-lg font-semibold">Education</h4>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">College Undergraduate</p>
          </div>
          <div className="glass rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-accent" />
              <h4 className="font-display text-lg font-semibold">Objective</h4>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Combine corporate experience with modern automation to help businesses grow productivity and customer experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const message = data.get("message") as string;
    const body = encodeURIComponent(`From: ${name}\n\n${message}`);
    window.location.href = `mailto:rean.castillo.pineda20@gmail.com?subject=${encodeURIComponent("Project inquiry from " + name)}&body=${body}`;
    setSent(true);
    formRef.current?.reset();
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Contact" title="Let's automate something" subtitle="Send a message or reach me directly — happy to discuss your workflow needs." />
        <div className="reveal mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="glass rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">Direct channels</h3>
            <div className="mt-6 space-y-4 text-sm">
              <ContactRow icon={Mail} label="Email" value="rean.castillo.pineda20@gmail.com" href="mailto:rean.castillo.pineda20@gmail.com" />
              <ContactRow icon={Phone} label="Phone / Viber" value="09513293913" href="tel:09513293913" />
              <ContactRow icon={Facebook} label="Facebook" value="facebook.com/kissnaer" href="https://facebook.com/kissnaer" />
              <ContactRow icon={Linkedin} label="Upwork" value="View profile" href="https://www.upwork.com/freelancers/~01f9fee7cdb9de9302" />
              <ContactRow icon={ExternalLink} label="OnlineJobs.PH" value="View profile" href="https://v2.onlinejobs.ph/jobseekers/info/5104901" />
              <ContactRow icon={MapPin} label="Location" value="Philippines · Remote worldwide" />
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="glass rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">Send a message</h3>
            <div className="mt-6 grid gap-4">
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="message" label="What do you need help automating?" textarea required />
              <button
                type="submit"
                onClick={rippleHandler}
                className="relative overflow-hidden mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-grad-primary px-6 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                {sent ? "Opening your mail app..." : <>Send message <Send className="h-4 w-4" /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const inner = (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary hover:shadow-glow">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-grad-primary text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" onClick={rippleHandler} className="relative block overflow-hidden rounded-xl">{inner}</a> : inner;
}

function Field({ name, label, type = "text", textarea, required }: { name: string; label: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls = "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:shadow-glow";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <Logo />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rean Pineda · Technical VA & Automation Specialist
        </p>
      </div>
    </footer>
  );
}
