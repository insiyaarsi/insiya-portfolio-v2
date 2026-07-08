import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Github, Linkedin, ArrowRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { ParticlePortrait } from "@/components/particle-portrait";
import { NowPlayingStrip } from "@/components/now-playing-strip";
import { ProjectCards } from "@/components/project-cards";
import { TerminalAbout } from "@/components/terminal-about";
import { Manifesto } from "@/components/manifesto";
import { JourneyTimeline } from "@/components/journey-timeline";
import { WritingStrip } from "@/components/writing-strip";
import { QuickStats } from "@/components/quick-stats";
import { PhotoTeaser } from "@/components/photo-teaser";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
        {/* faint grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--color-foreground) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <ParticlePortrait />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="order-1 md:order-2"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" />
              full-stack → ai engineering
            </span>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              hi, <span className="italic text-brand">insiya</span> here.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              I'm a full-stack + backend engineer teaching my code to think. Right now I'm building{" "}
              <span className="text-foreground">MediScribe</span> and{" "}
              <span className="text-foreground">DoodleLift</span> — one turns doctor visits into
              notes, the other turns gym anxiety into plate-math doodles.
            </p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Off the clock: guitar, fantasy novels, and chasing a new squat 1RM.
            </p>

            <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              currently → further exploring my interests + sharpening the toolkit.
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/80 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-all hover:bg-foreground hover:text-background"
              >
                <Mail className="h-3.5 w-3.5" />
                say hi
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                <FileText className="h-3.5 w-3.5" />
                résumé
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                github
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <NowPlayingStrip />

      <Manifesto />

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              /projects
            </span>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">
              things I've built, am building, or refuse to abandon.
            </h2>
          </div>
        </div>
        <ProjectCards />
      </section>

      <JourneyTimeline />

      <WritingStrip />

      <PhotoTeaser />

      <QuickStats />

      {/* ABOUT / TERMINAL */}
      <section
        id="about"
        className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.2fr] scroll-mt-24"
      >
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            /about
          </span>
          <h2 className="mt-2 font-serif text-4xl">the short version, in a terminal.</h2>
          <p className="mt-4 text-muted-foreground">
            Click a chip or type a command. This is the fastest way to skim me.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            try: <span className="text-brand">skills</span> ·{" "}
            <span className="text-brand">books</span> · <span className="text-brand">gym</span>
          </p>
        </div>
        <TerminalAbout />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-muted/40 p-10 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            /contact
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">
            found a bug in the plan, or want to build one together?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background hover:bg-foreground/90"
            >
              <Mail className="h-3.5 w-3.5" /> email
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-brand hover:bg-brand hover:text-brand-foreground"
            >
              <FileText className="h-3.5 w-3.5" /> résumé
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:border-foreground/60"
            >
              <Github className="h-3.5 w-3.5" /> github
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:border-foreground/60"
            >
              <Linkedin className="h-3.5 w-3.5" /> linkedin
            </a>
            <Link
              to="/uses"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:border-foreground/60"
            >
              /uses
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
