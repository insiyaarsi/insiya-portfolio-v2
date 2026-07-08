import { Link } from "@tanstack/react-router";
import { Menu, Gamepad2, X, FileText } from "lucide-react";
import { useState } from "react";
import { useGameMode } from "@/lib/game-mode";
import { site } from "@/lib/site";

const links = [
  { to: "/", hash: "projects", label: "projects" },
  { to: "/", hash: "journey", label: "journey" },
  { to: "/", hash: "photos", label: "gallery" },
  { to: "/", hash: "about", label: "about" },
  { to: "/uses", label: "uses" },
  { to: "/", hash: "contact", label: "contact" },
] as const;

export function SiteNav() {
  const { enabled, toggle, hydrated } = useGameMode();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-1">
          <Link to="/" className="font-serif text-xl leading-none tracking-tight hover:text-brand">
            insiya arsiwala
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label="Toggle game mode"
            className="group inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brand game:text-magenta"
          >
            <Gamepad2 className="h-3 w-3" />
            <span>
              game mode{" "}
              <span
                className={`inline-block min-w-6 border-b border-current pb-px text-center ${
                  hydrated && enabled ? "text-brand game:text-magenta" : ""
                }`}
              >
                {hydrated ? (enabled ? "on" : "off") : "—"}
              </span>
            </span>
          </button>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/60 bg-brand/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand hover:bg-brand hover:text-brand-foreground"
          >
            <FileText className="h-3 w-3" /> résumé
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-[0.18em] text-brand hover:opacity-80"
            >
              <FileText className="h-3.5 w-3.5" /> résumé
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
