import { useEffect, useRef } from "react";
import portraitAsset from "@/assets/portrait-pixel.png";

/**
 * Particle repulsion portrait.
 *
 * Samples the pixel portrait image on an offscreen canvas, turns dark pixels
 * into particles that render on a single <canvas>, and runs a rAF loop that
 * repels particles from the cursor and springs them back to their home
 * coordinates. Honors prefers-reduced-motion (static render only).
 */
export function ParticlePortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x0: number;
      y0: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    };

    let particles: P[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let imgBitmap: HTMLImageElement | null = null;
    const mouse = { x: -9999, y: -9999, active: false };

    // Tunables
    const REPEL_RADIUS = 90;
    const REPEL_STRENGTH = 1.1;
    const SPRING = 0.06;
    const DAMPING = 0.86;

    const sampleParticles = () => {
      if (!imgBitmap) return;
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density: aim for ~ (width/step) x (height/step) samples.
      const step = Math.max(3, Math.round(Math.min(width, height) / 140));

      // Draw image into offscreen canvas at fitted (contain) size.
      const off = document.createElement("canvas");
      const pad = Math.min(width, height) * 0.06;
      const availW = width - pad * 2;
      const availH = height - pad * 2;
      const ratio = imgBitmap.width / imgBitmap.height;
      let drawW = availW;
      let drawH = availW / ratio;
      if (drawH > availH) {
        drawH = availH;
        drawW = availH * ratio;
      }
      const offW = Math.floor(drawW);
      const offH = Math.floor(drawH);
      off.width = offW;
      off.height = offH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(imgBitmap, 0, 0, offW, offH);
      const data = octx.getImageData(0, 0, offW, offH).data;

      const offsetX = (width - offW) / 2;
      const offsetY = (height - offH) / 2;

      const next: P[] = [];
      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          const i = (y * offW + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 40) continue;
          // Perceived luminance; treat dark pixels as ink.
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          if (lum > 0.55) continue;
          const px = x + offsetX;
          const py = y + offsetY;
          next.push({
            x0: px,
            y0: py,
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            r: Math.max(1, step * 0.42),
          });
        }
      }
      particles = next;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const fg =
        getComputedStyle(document.documentElement).getPropertyValue("--color-foreground").trim() ||
        "#1a1a1a";
      ctx.fillStyle = fg;

      for (const p of particles) {
        if (!reduced && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < REPEL_RADIUS * REPEL_RADIUS) {
            const dist = Math.sqrt(dist2) || 0.001;
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        if (!reduced) {
          // spring back to home
          p.vx += (p.x0 - p.x) * SPRING;
          p.vy += (p.y0 - p.y) * SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(() => sampleParticles());

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = portraitAsset;
    img.onload = () => {
      imgBitmap = img;
      sampleParticles();
      raf = requestAnimationFrame(draw);
      ro.observe(wrap);
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-md rounded-2xl border border-border/60 bg-muted/40"
    >
      {/* tape corners for pinned-print feel */}
      <span
        className="absolute -left-2 -top-2 h-6 w-16 rotate-[-8deg] bg-brand/25 mix-blend-multiply"
        aria-hidden
      />
      <span
        className="absolute -right-2 -bottom-2 h-6 w-16 rotate-[6deg] bg-brand/25 mix-blend-multiply"
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Interactive pixel portrait of Insiya Arsiwala"
        role="img"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 3px)",
        }}
      />
      <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        insiya.exe
      </span>
      <span className="pointer-events-none absolute top-3 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
        ● hover me
      </span>
    </div>
  );
}
