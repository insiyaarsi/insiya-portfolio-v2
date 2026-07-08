import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/uses")({
  head: () => ({
    meta: [
      { title: "/uses — what Insiya is learning right now" },
      {
        name: "description",
        content:
          "The papers, models, tools, and rabbit holes Insiya is currently in.",
      },
      { property: "og:title", content: "/uses — Insiya Arsiwala" },
      {
        property: "og:description",
        content: "What I'm learning, reading, and building with right now.",
      },
    ],
  }),
  component: UsesPage,
});

const sections = [
  {
    title: "learning right now",
    items: [
      "RAG patterns beyond naive top-k — hybrid + reranking",
      "Whisper fine-tuning on domain audio (medical vocab)",
      "Prompt design for persona-driven LLM coaches (DoodleLift)",
      "Cloudflare Workers + edge-first Python (thinking about MediScribe deploys)",
    ],
  },
  {
    title: "tooling",
    items: [
      "editor: VS Code, Cursor when I'm feeling fancy",
      "shell: zsh + starship",
      "notes: Obsidian for project journals, Notion for shared docs",
      "browser: Arc (I know, I know)",
    ],
  },
  {
    title: "on the shelf",
    items: [
      "The Name of the Wind — Patrick Rothfuss (reading)",
      "Designing Data-Intensive Applications — Kleppmann (re-reading)",
      "The Mistborn Trilogy — Sanderson (queued)",
    ],
  },
  {
    title: "in the ears",
    items: [
      "Pearl Jam, Fleetwood Mac, Bon Iver",
      "Indian classical when I need to focus",
      "Lo-fi guitar loops when I'm writing code",
    ],
  },
];

function UsesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> index
      </Link>

      <header className="mt-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          /uses
        </span>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight">
          what I'm learning, reading, and running.
        </h1>
        <p className="mt-4 text-muted-foreground">
          A snapshot, not a manifesto. This page changes often.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              {s.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {s.items.map((i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/60" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
