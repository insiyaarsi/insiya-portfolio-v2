import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera } from "lucide-react";
import { PhotoMasonry } from "@/components/photo-masonry";

export const Route = createFileRoute("/photos")({
  component: PhotosPage,
  head: () => ({
    meta: [
      { title: "photos — insiya arsiwala" },
      { name: "description", content: "A gallery of quiet moments, sunsets, and reflections — captured through Insiya's phone camera between projects." },
      { property: "og:title", content: "photos — insiya arsiwala" },
      { property: "og:description", content: "Sunsets, water, and the occasional skyline — what I notice when I'm not at a keyboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PhotosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        back home
      </Link>

      <header className="mt-6 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
          <Camera className="h-3 w-3" /> /photos
        </span>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
          through <span className="italic text-brand">my</span> lens.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Mostly phone photos. Mostly sunsets. A rolling record of the sky, the water, and whatever
          made me stop walking. Hover to bring the colour back — click any frame to open it larger.
        </p>
      </header>

      <div className="mt-12">
        <PhotoMasonry />
      </div>
    </div>
  );
}
