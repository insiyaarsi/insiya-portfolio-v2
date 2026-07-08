import { useState } from "react";
import { motion } from "motion/react";
import { photos } from "@/lib/photos";
import { PhotoLightbox } from "./photo-lightbox";

export function PhotoMasonry() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: "easeOut" }}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-md border border-border bg-muted/40 text-left"
            aria-label={`Open photo: ${photo.alt}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {photo.caption && (
                <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))}
        onNext={() => setOpen((i) => (i === null ? i : (i + 1) % photos.length))}
      />
    </>
  );
}
