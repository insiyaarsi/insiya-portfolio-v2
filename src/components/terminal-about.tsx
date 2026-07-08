import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type Line = { kind: "cmd" | "out"; text: string };

const responses: Record<string, string[]> = {
  whoami: [
    "insiya arsiwala — full-stack + backend engineer, ~1 yr shipping.",
    "currently pointing everything at AI engineering.",
    "based in mumbai · builds quirky side projects on weekends.",
  ],
  currently: [
    "day-job  → sole dev on aonix's ai-lms (next.js + gemini + socket.io)",
    "side     → mediscribe (clinical audio → SOAP) + doodlelift (ai gym coach)",
    "learning → rag beyond top-k, whisper fine-tuning on medical audio",
  ],
  skills: [
    "backend  → python, fastapi, node, express, postgres, mysql, mongodb",
    "ai       → whisper, scispaCy, gemini, openai, langchain, rag",
    "frontend → react, next, tanstack, typescript, tailwind, motion",
    "infra    → vercel, aws, docker, github actions, cloudflare workers",
  ],
  books: [
    "reading  → the name of the wind — patrick rothfuss",
    "recent   → mistborn (era 1), piranesi, project hail mary",
    "vibe     → fantasy fiction · escape > efficiency",
  ],
  guitar: [
    "learning → 'black' — pearl jam (intro)",
    "genres   → 90s alt, indie folk, indian classical",
    "gear     → acoustic + a very patient tuning app",
  ],
  gym: [
    "split    → push / pull / legs · 4-5x per week",
    "chasing  → back squat 1rm this cycle",
    "why      → the ceiling is always higher than i think.",
  ],
  resume: [
    "opening résumé in a new tab… (drive.google.com)",
  ],
  photos: [
    "opening /photos — a small gallery of sunsets, water, and skies.",
  ],
  contact: [
    `email    → ${site.email}`,
    "github   → github.com/insiyaarsi",
    "linkedin → linkedin.com/in/insiya-arsi",
  ],
  help: [
    "commands → whoami · currently · skills · books · guitar · gym · resume · contact · clear · help",
  ],
  clear: [],
};

const chips = ["whoami", "currently", "skills", "books", "gym", "resume"] as const;


export function TerminalAbout() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "welcome to insiya.term — type 'help' or click a chip." },
    { kind: "cmd", text: "whoami" },
    ...responses.whoami.map((t) => ({ kind: "out" as const, text: t })),
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "resume") {
      setLines((prev) => [
        ...prev,
        { kind: "cmd", text: cmd },
        { kind: "out", text: "opening résumé in a new tab… (drive.google.com)" },
      ]);
      if (typeof window !== "undefined") {
        window.open(site.resume, "_blank", "noopener,noreferrer");
      }
      return;
    }
    if (cmd === "photos" || cmd === "gallery") {
      setLines((prev) => [
        ...prev,
        { kind: "cmd", text: cmd },
        { kind: "out", text: "opening /photos …" },
      ]);
      if (typeof window !== "undefined") {
        window.location.assign("/photos");
      }
      return;
    }
    const out = responses[cmd];
    setLines((prev) => [
      ...prev,
      { kind: "cmd", text: cmd },
      ...(out
        ? out.map((t) => ({ kind: "out" as const, text: t }))
        : [{ kind: "out" as const, text: `command not found: ${cmd} — try 'help'` }]),
    ]);
  };


  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          insiya.term — ~ /portfolio
        </span>
        <span className="w-10" />
      </div>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="h-72 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "cmd" ? "text-brand" : "text-foreground"}>
            {l.kind === "cmd" ? (
              <span>
                <span className="text-muted-foreground">$</span> {l.text}
              </span>
            ) : (
              <span>{l.text}</span>
            )}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
          className="mt-1 flex items-center gap-2"
        >
          <span className="text-muted-foreground">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-foreground caret-brand outline-none placeholder:text-muted-foreground"
            placeholder="type a command…"
            aria-label="Terminal input"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border bg-muted/30 px-4 py-3">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
