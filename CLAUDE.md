# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Insiya Arsiwala's personal portfolio (v3). A **TanStack Start** (React 19, SSR) single-user site with a project showcase, photo gallery, and an interactive "game mode" easter egg. Builds to a Cloudflare-module SSR bundle via nitro.

## Commands

The package manager is **Bun** (`bun.lock`, `bunfig.toml`).

```bash
bun install        # install deps (respects the 24h supply-chain guard in bunfig.toml)
bun run dev        # vite dev server
bun run build      # production build (SSR via nitro, cloudflare target by default)
bun run preview    # preview the production build
bun run lint       # eslint .
bun run format     # prettier --write .
```

There is **no test suite** and **no typecheck script** — `tsc` runs with `noEmit` for editor/IDE diagnostics only (`tsconfig.json`). Verify changes by running `bun run dev` and `bun run lint`.

## Architecture

### Routing — TanStack Start file-based routing
- Routes live in `src/routes/`. Every `.tsx` there is a route. See `src/routes/README.md` for the naming table (`$param`, `{-$optional}`, `$.tsx` splat, `_layout`, `__root`).
- `src/routes/__root.tsx` is the app shell: sets `<head>` meta, wraps every page in `QueryClientProvider` + `GameModeProvider`, renders `SiteNav` / `SiteFooter` / `GameCanvas`, and defines the 404 + error boundaries.
- `routeTree.gen.ts` is **auto-generated** — never edit by hand.
- Do **not** introduce Next.js/Remix conventions (`src/pages/`, `app/layout.tsx`, the `server-only` package — eslint blocks the last one).

### SSR error handling (three layers)
The site deliberately never leaks a raw 500 to visitors:
- `src/start.ts` — request middleware that catches thrown errors and returns a rendered error page (re-throws framework redirects/`statusCode` errors).
- `src/server.ts` — the SSR server entry (wired via `vite.config.ts` `tanstackStart.server.entry`). Unwraps errors that **h3 swallows** into a generic JSON 500 and replaces them with `renderErrorPage()`.
- `src/routes/__root.tsx` `ErrorComponent` — client-side React error boundary.
- Shared helpers: `src/lib/error-capture.ts`, `src/lib/error-page.ts`.

### Content is data, not CMS
Site content lives in typed modules under `src/lib/`, imported directly by components:
- `projects.ts` — the `Project[]` array + `getProject(slug)`. Adding a project = adding an entry here (slug is a union type) and importing a thumbnail image.
- `photos.ts` — the `Photo[]` gallery array.
- `site.ts` — contact links (email, github, linkedin, resume).

### Assets
Images live in `src/assets/` (project thumbnails, portraits) and `src/assets/photos/` and are imported directly — Vite hashes and bundles them, the import resolves to the final URL string:
```ts
import thumb from "@/assets/mediscribe.png";
// thumb → "/assets/mediscribe-<hash>.png"
<img src={thumb} />
```
(The `photos/*.jpg` files are PNG data under a `.jpg` name — a historical label; the extension is cosmetic and Vite serves them by content.)

### Game mode
A site-wide easter egg with three cooperating pieces:
- `src/lib/game-mode.tsx` — `GameModeProvider` / `useGameMode()`. Persists to `localStorage` (`insiya:game-mode`), toggles a `game-mode` class on `<html>`, and reads persisted state only after mount to avoid SSR hydration mismatch (`hydrated` flag).
- `src/components/game-canvas.tsx` — a fixed, `pointer-events: none` overlay canvas (page stays interactive) where items fall and are caught with arrow/WASD/on-screen dpad. Respects `prefers-reduced-motion`.
- CSS driven off the `.game-mode` class.

### UI stack
- **Tailwind CSS v4** via `@tailwindcss/vite` (config-less; styles in `src/styles.css`). Theme uses CSS variables / oklab color-mix.
- **shadcn/ui** (`new-york` style) components in `src/components/ui/` — managed via `components.json`. `@/lib/utils` `cn()` is the class-merge helper.
- **Radix UI** primitives, **motion** (`motion/react`) for animation, **lucide-react** for icons.
- Path alias `@/*` → `src/*`. Fonts via `@fontsource/*` (serif = instrument-serif, mono = jetbrains-mono).

### Build config — `vite.config.ts`
A standard TanStack Start Vite config (this project was previously wrapped by a Lovable config package that has since been removed). It wires up, in order: `tailwindcss`, `vite-tsconfig-paths`, `tanstackStart` (with `server.entry: "server"` → `src/server.ts`, and `server-only` import protection), `nitro` (build only, `cloudflare-module` preset), and `viteReact`. It also sets the `@` → `src` alias, React/Query `dedupe`, `optimizeDeps` prebundling, `css.transformer: "lightningcss"`, and `VITE_`-prefixed env injection. `bunfig.toml` enforces a 24h supply-chain guard (`minimumReleaseAge`); confirm with the user before adding any exclusion.

## Style
Prettier: 100-col, double quotes, semicolons, trailing commas (`.prettierrc`). ESLint has `@typescript-eslint/no-unused-vars` off and enforces the no-`server-only` rule.
