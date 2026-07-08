import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, Sparkles } from "lucide-react";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }] };
    return {
      meta: [
        { title: `${p.name} — Insiya Arsiwala` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Insiya Arsiwala` },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Project not found</h1>
      <p className="mt-3 text-muted-foreground">
        That project doesn't exist (yet).
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back home
      </Link>
    </div>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: NonNullable<ReturnType<typeof getProject>> };
  const others = projects.filter((x) => x.slug !== p.slug);


  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> index
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            /projects/{p.slug}
          </span>
          {p.ai && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand ring-1 ring-brand/30">
              <Sparkles className="h-3 w-3" /> ai
            </span>
          )}
        </div>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight">
          {p.name}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">{p.tagline}</p>
        <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:grid-cols-3">
          <div>
            <div className="text-[10px] text-muted-foreground/60">role</div>
            <div className="mt-1 text-foreground">{p.role}</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground/60">timeline</div>
            <div className="mt-1 text-foreground">{p.timeline}</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground/60">status</div>
            <div className="mt-1 text-foreground">{p.status}</div>
          </div>
        </div>
      </header>

      <div
        className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border"
        style={{
          background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}05)`,
        }}
      >
        <img
          src={p.thumbnail}
          alt={`${p.name} screenshot`}
          className="h-full w-full object-cover object-top"
        />
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">The problem</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{p.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">What I built</h2>
        <ul className="mt-4 space-y-3">
          {p.built.map((b) => (
            <li key={b} className="flex gap-3 text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {p.highlights.length > 0 && (
        <section className="mt-10 space-y-4">
          {p.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-lg border border-border bg-muted/40 p-5"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                {h.label}
              </div>
              <p className="mt-2 text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {p.repo && (
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/80 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
        >
          <Github className="h-3.5 w-3.5" /> view repo
        </a>
      )}

      <nav className="mt-20 flex flex-wrap gap-3 border-t border-border pt-8">
        <span className="w-full font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          other projects
        </span>
        {others.map((o) => (
          <Link
            key={o.slug}
            to="/projects/$slug"
            params={{ slug: o.slug }}
            className="rounded-md border border-border px-4 py-2 font-mono text-xs hover:border-foreground/60"
          >
            {o.name} →
          </Link>
        ))}
      </nav>
    </article>
  );
}
