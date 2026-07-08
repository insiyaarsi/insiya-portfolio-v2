import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function PhotoLightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, onClose, onNext, onPrev]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full border border-border bg-background/60 p-2 text-foreground/70 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground/70 hover:text-foreground"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground/70 hover:text-foreground"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[82vh] max-w-full rounded-md object-contain shadow-2xl"
        />
        {photo.caption && (
          <figcaption className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {photo.caption} · <span className="text-foreground/60">{index + 1} / {photos.length}</span>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
