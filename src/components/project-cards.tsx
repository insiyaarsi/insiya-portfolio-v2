import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

function StatusDot({ status }: { status: Project["status"] }) {
  const color =
    status === "in progress"
      ? "bg-brand"
      : status === "shipping"
        ? "bg-yellow-500"
        : "bg-emerald-500";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {status}
    </span>
  );
}

export function ProjectCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((p, idx) => (
        <Link
          key={p.slug}
          to="/projects/$slug"
          params={{ slug: p.slug }}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]"
        >
          {/* thumbnail preview */}
          <div
            className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-md border border-border/60"
            style={{ background: `linear-gradient(135deg, ${p.accent}18, ${p.accent}05)` }}
          >
            <img
              src={p.thumbnail}
              alt={`${p.name} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-2 left-2 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              side {String.fromCharCode(65 + idx)}
            </span>
          </div>

          {p.ai && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand ring-1 ring-brand/30">
              <Sparkles className="h-3 w-3" /> ai
            </span>
          )}

          <StatusDot status={p.status} />

          <h3 className="mt-2 font-serif text-2xl">{p.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
            {p.stack.length > 4 && (
              <span className="font-mono text-[10px] text-muted-foreground">
                +{p.stack.length - 4}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-xs">
            <span className="text-muted-foreground">{p.timeline}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}
