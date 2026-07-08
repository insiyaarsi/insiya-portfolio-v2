import { useEffect, useRef } from "react";

/**
 * Dot-grid portrait: canvas fills its parent, dots displace toward the cursor
 * with an elastic magnetic effect. Honors prefers-reduced-motion by rendering
 * a static grid.
 */
export function DotGridHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Simple silhouette mask derived from a stylized bust shape.
    // Returns density 0..1 for a normalized (x,y) in [0,1]^2.
    const silhouette = (x: number, y: number) => {
      // head
      const hx = 0.5, hy = 0.28, hr = 0.15;
      const dh = Math.hypot(x - hx, (y - hy) * 1.15) < hr ? 1 : 0;
      // neck
      const nk = x > 0.44 && x < 0.56 && y > 0.4 && y < 0.5 ? 1 : 0;
      // shoulders/torso ellipse
      const tx = 0.5, ty = 0.78;
      const trx = 0.38, tryv = 0.32;
      const dt =
        ((x - tx) * (x - tx)) / (trx * trx) +
        ((y - ty) * (y - ty)) / (tryv * tryv) <
        1 && y > 0.48
          ? 1
          : 0;
      return Math.max(dh, nk, dt);
    };

    type Dot = {
      bx: number;
      by: number;
      x: number;
      y: number;
      r: number;
      inside: boolean;
    };

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = Math.max(10, Math.min(width, height) / 55);
      dots = [];
      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const nx = x / width;
          const ny = y / height;
          const inside = silhouette(nx, ny) > 0.5;
          dots.push({ bx: x, by: y, x, y, r: inside ? 2.4 : 1.1, inside });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const fg = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-foreground")
        .trim() || "#1a1a1a";
      const mute = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-muted-foreground")
        .trim() || "#8a8578";

      for (const d of dots) {
        if (!reduced && pointer.active) {
          const dx = d.bx - pointer.x;
          const dy = d.by - pointer.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 110;
          if (dist2 < radius * radius) {
            const dist = Math.sqrt(dist2) || 0.001;
            const force = (1 - dist / radius) * 22;
            const tx = d.bx + (dx / dist) * force;
            const ty = d.by + (dy / dist) * force;
            d.x += (tx - d.x) * 0.18;
            d.y += (ty - d.y) * 0.18;
          } else {
            d.x += (d.bx - d.x) * 0.12;
            d.y += (d.by - d.y) * 0.12;
          }
        } else {
          d.x = d.bx;
          d.y = d.by;
        }
        ctx.beginPath();
        ctx.fillStyle = d.inside ? fg : mute;
        ctx.globalAlpha = d.inside ? 0.92 : 0.32;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);
    build();
    raf = requestAnimationFrame(draw);
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
      className="relative aspect-square w-full max-w-md rounded-2xl border border-border/60 bg-muted/40"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        insiya.dot
      </span>
    </div>
  );
}
