import { motion, useReducedMotion } from "motion/react";
import portraitAsset from "@/assets/portrait-pixel.png";

/**
 * Pixelated black-and-white portrait for the hero.
 * - `image-rendering: pixelated` keeps the sharp 8-bit look at any size.
 * - Subtle idle float + scanline overlay hint at the CRT / game-mode
 *   layer without stealing focus in default mode.
 */
export function PixelPortrait() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* soft paper card behind the portrait */}
      <div className="absolute inset-0 rounded-2xl border border-border/60 bg-muted/40" />

      {/* tape corners for that pinned-print feel */}
      <span
        className="absolute -left-2 -top-2 h-6 w-16 rotate-[-8deg] bg-brand/25 mix-blend-multiply"
        aria-hidden
      />
      <span
        className="absolute -right-2 -bottom-2 h-6 w-16 rotate-[6deg] bg-brand/25 mix-blend-multiply"
        aria-hidden
      />

      {/* portrait */}
      <motion.img
        src={portraitAsset}
        alt="Pixel-art portrait of Insiya Arsiwala"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain p-6 [image-rendering:pixelated]"
        initial={reduced ? false : { y: 0 }}
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* scanlines overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 3px)",
        }}
      />

      {/* corner label */}
      <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        insiya.exe
      </span>
      <span className="pointer-events-none absolute top-3 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
        ● rec
      </span>
    </div>
  );
}
