import { useEffect, useState } from "react";
import { Music, BookOpen, Dumbbell, GitCommit, Clapperboard } from "lucide-react";

const items = [
  {
    icon: Music,
    label: "now playing",
    value: "learning the intro to 'Anastasia' — Guns N Roses, on guitar",
  },
  {
    icon: BookOpen,
    label: "now reading",
    value: "Before the Coffee Gets Cold — Toshikazu Kawaguchi",
  },
  {
    icon: Dumbbell,
    label: "gym pr",
    value: "back squat, chasing a new 1RM this cycle",
  },
  {
    icon: Clapperboard,
    label: "watching next",
    // TODO(insiya): swap in the film you're actually watching next.
    value: "Michael — Antoine Fuqua",
  },
  {
    icon: GitCommit,
    label: "last shipped",
    value: "MediScribe: 520+ clinical-term dictionary merge",
  },
];

export function NowPlayingStrip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, []);
  const Item = items[i];
  const Icon = Item.icon;
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex items-center gap-4 rounded-full border border-border/60 bg-muted/50 px-5 py-3 font-mono text-xs">
        <span className="flex items-center gap-2 text-brand">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <Icon className="h-3.5 w-3.5" />
          <span className="uppercase tracking-[0.18em]">{Item.label}</span>
        </span>
        <span className="truncate text-muted-foreground">{Item.value}</span>
      </div>
    </div>
  );
}
