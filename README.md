# insiya arsiwala — portfolio

My personal portfolio: a project showcase, a photography gallery, and an
interactive **game mode** easter egg. Built as a server-rendered
[TanStack Start](https://tanstack.com/start) app (React 19) and deployed on
Vercel.

🔗 **Live:** [insiya-portfolio-v2.vercel.app](https://insiya-portfolio-v2.vercel.app/)

## Highlights

- **Project showcase** — MediScribe AI, DoodleLift, and ThriftEx, each with its
  own detail page.
- **Photography gallery** (`/photos`) with a lightbox and a "through my lens"
  teaser on the home page.
- **Game mode** — toggle a site-wide easter egg: a fixed overlay canvas where
  items fall and are caught with the arrow keys / WASD / an on-screen dpad. The
  page underneath stays fully interactive, and it respects
  `prefers-reduced-motion`.
- **Interactive particle portrait** that repels from the cursor.
- **Terminal-style about** section you can type commands into.
- Smooth in-page navigation, a resilient SSR error boundary, and a warm
  editorial theme with light/dark and game-mode palettes.

## Tech stack

| Area        | Choice                                                              |
| ----------- | ------------------------------------------------------------------ |
| Framework   | TanStack Start (React 19, SSR) with file-based routing             |
| Styling     | Tailwind CSS v4, shadcn/ui (new-york), Radix UI primitives         |
| Animation   | `motion` (Framer Motion), plus a hand-rolled canvas game loop      |
| Build       | Vite 8, nitro (SSR server build), Lightning CSS                    |
| Package mgr | [Bun](https://bun.sh)                                              |
| Deploy      | Vercel (nitro `vercel` preset)                                     |

## Getting started

Requires [Bun](https://bun.sh).

```bash
bun install     # install dependencies
bun run dev     # start the dev server (http://localhost:8080)
```

### Other commands

```bash
bun run build   # production build (SSR)
bun run preview # preview the production build locally
bun run lint    # eslint
bun run format  # prettier --write .
```

There is no test suite; `tsc` runs with `noEmit` for editor diagnostics only.

## Project structure

```
src/
├── routes/          # file-based routes (index, photos, uses, projects/$slug, __root)
├── components/      # UI + feature components (game canvas, portraits, nav, etc.)
│   └── ui/          # shadcn/ui primitives
├── lib/             # typed content + helpers
│   ├── projects.ts  #   the Project[] data
│   ├── photos.ts    #   the Photo[] gallery data
│   ├── site.ts      #   contact links
│   └── game-mode.tsx#   game-mode context/provider
├── assets/          # images (bundled by Vite)
└── styles.css       # Tailwind v4 theme + tokens
```

Content is data, not a CMS — projects and photos live in typed modules under
`src/lib/` and are imported directly by components.

## Deployment

The app deploys to **Vercel**. The nitro preset is chosen per environment: on
Vercel (which sets `VERCEL=1` during builds) it uses the `vercel` preset; locally
it defaults to `cloudflare-module`. Set `NITRO_PRESET` to override.

To deploy: import the repo at [vercel.com/new](https://vercel.com/new). Vercel
auto-detects the build (`bun run build`) and serves the SSR output — no extra
configuration needed.

## License

Personal project — all rights reserved. Code is here to browse, not to reuse
wholesale. Feel free to take inspiration.
