import { useEffect, useRef, useState } from "react";
import { useGameMode } from "@/lib/game-mode";

/**
 * Pixel Insiya: a small fixed overlay canvas that runs while game mode is on.
 * Items fall from the top; catch them with arrow keys / WASD / on-screen dpad.
 * pointer-events: none on the canvas — page underneath stays fully interactive.
 */
type Item = { x: number; y: number; vy: number; kind: 0 | 1 | 2 | 3 };

const KIND_LABELS = ["book", "dumbbell", "pick", "coffee"] as const;
const FACTS: Record<(typeof KIND_LABELS)[number], string[]> = {
  book: ["+1 book — currently reading The Name of the Wind"],
  dumbbell: ["+1 rep — chasing a new squat 1RM"],
  pick: ["+1 riff — learning 'Black' by Pearl Jam"],
  coffee: ["+1 ☕ — fuel acquired"],
};

export function GameCanvas() {
  const { enabled, hydrated } = useGameMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [fact, setFact] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || !hydrated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener("resize", resize);

    const sprite = { x: 80, y: 0, w: 22, h: 32, vx: 0, dir: 1 };
    const keys: Record<string, boolean> = {};
    const onDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };
    const onUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);

    // expose for on-screen dpad
    (window as any).__pixelInsiya = { press: (k: string, v: boolean) => (keys[k] = v) };

    const items: Item[] = [];
    let spawnTimer = 0;
    let last = performance.now();
    let raf = 0;

    const drawSprite = (x: number, y: number, dir: number) => {
      // 8x11 pixel figure scaled up
      const px = 2;
      const P = (col: number, row: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + col * px * (dir === -1 ? -1 : 1), y + row * px, px * dir, px);
      };
      // simplified — just draw a chunky figure
      const skin = "#f2c9a8";
      const hair = "#2b1a12";
      const shirt = "#ff5b2e";
      const pants = "#1a1a1a";
      // head
      ctx.fillStyle = hair;
      ctx.fillRect(x + 4, y, 14, 4);
      ctx.fillStyle = skin;
      ctx.fillRect(x + 4, y + 4, 14, 8);
      // eye
      ctx.fillStyle = "#000";
      ctx.fillRect(x + (dir === 1 ? 14 : 6), y + 7, 2, 2);
      // shirt
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 2, y + 12, 18, 10);
      // arms
      ctx.fillStyle = skin;
      ctx.fillRect(x, y + 12, 2, 8);
      ctx.fillRect(x + 20, y + 12, 2, 8);
      // pants
      ctx.fillStyle = pants;
      ctx.fillRect(x + 4, y + 22, 6, 8);
      ctx.fillRect(x + 12, y + 22, 6, 8);
      // avoid unused warnings
      void P; void skin;
    };

    const drawItem = (it: Item) => {
      const s = 18;
      const label = KIND_LABELS[it.kind];
      if (label === "book") {
        ctx.fillStyle = "#f5f2ea";
        ctx.fillRect(it.x, it.y, s, s * 0.75);
        ctx.fillStyle = "#ff5b2e";
        ctx.fillRect(it.x, it.y, 3, s * 0.75);
      } else if (label === "dumbbell") {
        ctx.fillStyle = "#7fff9a";
        ctx.fillRect(it.x, it.y + 6, s, 4);
        ctx.fillRect(it.x - 2, it.y + 2, 4, 12);
        ctx.fillRect(it.x + s - 2, it.y + 2, 4, 12);
      } else if (label === "pick") {
        ctx.fillStyle = "#ff3ea5";
        ctx.beginPath();
        ctx.moveTo(it.x + s / 2, it.y);
        ctx.lineTo(it.x + s, it.y + s * 0.7);
        ctx.lineTo(it.x, it.y + s * 0.7);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = "#8a5a3b";
        ctx.fillRect(it.x, it.y + 4, s, s - 6);
        ctx.fillStyle = "#f5f2ea";
        ctx.fillRect(it.x + 2, it.y + 6, s - 4, 2);
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(40, t - last);
      last = t;
      ctx.clearRect(0, 0, W, H);

      const speed = 0.35;
      sprite.vx = 0;
      if (keys["arrowleft"] || keys["a"]) sprite.vx = -speed;
      if (keys["arrowright"] || keys["d"]) sprite.vx = speed;
      if (sprite.vx !== 0) sprite.dir = sprite.vx > 0 ? 1 : -1;
      sprite.x = Math.max(0, Math.min(W - sprite.w, sprite.x + sprite.vx * dt));
      sprite.y = H - sprite.h - 24;

      if (!reduced) {
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          items.push({
            x: Math.random() * (W - 20),
            y: -20,
            vy: 0.14 + Math.random() * 0.12,
            kind: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
          });
          spawnTimer = 900 + Math.random() * 700;
        }
        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i];
          it.y += it.vy * dt;
          drawItem(it);
          const hit =
            it.y + 18 >= sprite.y &&
            it.y <= sprite.y + sprite.h &&
            it.x + 18 >= sprite.x &&
            it.x <= sprite.x + sprite.w;
          if (hit) {
            const label = KIND_LABELS[it.kind];
            const msg = FACTS[label][0];
            setScore((s) => s + 1);
            setFact(msg);
            window.setTimeout(() => setFact(null), 1800);
            items.splice(i, 1);
          } else if (it.y > H) {
            items.splice(i, 1);
          }
        }
      }

      drawSprite(sprite.x, sprite.y, sprite.dir);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      delete (window as any).__pixelInsiya;
    };
  }, [enabled, hydrated]);

  if (!hydrated || !enabled) return null;

  const press = (key: string, v: boolean) =>
    (window as any).__pixelInsiya?.press(key, v);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed right-6 top-24 z-40 rounded-md border border-phosphor/40 bg-black/60 px-3 py-1.5 font-mono text-xs text-phosphor"
        aria-live="polite"
      >
        score: {score.toString().padStart(3, "0")}
      </div>
      {fact && (
        <div className="pointer-events-none fixed left-1/2 top-32 z-40 -translate-x-1/2 rounded-md border border-phosphor/50 bg-black/70 px-3 py-1.5 font-mono text-xs text-phosphor">
          {fact}
        </div>
      )}
      {touch && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 select-none">
          <div className="flex gap-3">
            <button
              onPointerDown={() => press("arrowleft", true)}
              onPointerUp={() => press("arrowleft", false)}
              onPointerCancel={() => press("arrowleft", false)}
              className="h-14 w-14 rounded-full border border-phosphor/50 bg-black/60 font-mono text-lg text-phosphor active:bg-phosphor/20"
              aria-label="Move left"
            >
              ◀
            </button>
            <button
              onPointerDown={() => press("arrowright", true)}
              onPointerUp={() => press("arrowright", false)}
              onPointerCancel={() => press("arrowright", false)}
              className="h-14 w-14 rounded-full border border-phosphor/50 bg-black/60 font-mono text-lg text-phosphor active:bg-phosphor/20"
              aria-label="Move right"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </>
  );
}
