import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera } from "lucide-react";
import { motion } from "motion/react";
import { photos } from "@/lib/photos";

export function PhotoTeaser() {
  const strip = photos.slice(0, 4);

  return (
    <section id="photos" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Camera className="h-3 w-3" /> /through-my-lens
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">
            what I notice when I'm not at a keyboard.
          </h2>
        </div>
        <Link
          to="/photos"
          className="group hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
        >
          full gallery
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {strip.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-muted/40"
          >
            <Link
              to="/photos"
              aria-label={`View gallery: ${photo.alt}`}
              className="block h-full w-full"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        to="/photos"
        className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        full gallery <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}
