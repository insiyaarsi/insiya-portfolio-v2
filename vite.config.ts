import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command, mode }) => {
  // Inject VITE_-prefixed env vars so `import.meta.env.VITE_*` resolves in
  // both client and SSR bundles.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define,
    // Lightning CSS in both dev and build so the preview matches the built
    // output (Vite otherwise uses PostCSS in dev, Lightning CSS at build).
    css: { transformer: "lightningcss" },
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      // Keep a single copy of React / Query so hooks and context work across
      // duplicated transitive installs.
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Redirect TanStack Start's bundled server entry to src/server.ts
        // (our SSR error wrapper). nitro/vite builds from this.
        server: { entry: "server" },
        // Block accidental server-only imports from client code.
        importProtection: {
          behavior: "error",
          client: {
            files: ["**/server/**"],
            specifiers: ["server-only"],
          },
        },
      }),
      // Nitro produces the SSR server build. Build-only. The deploy target is
      // chosen per-environment: Vercel sets VERCEL=1 during its builds (→ vercel
      // preset), otherwise fall back to cloudflare-module. An explicit
      // NITRO_PRESET env var overrides both.
      ...(command === "build"
        ? [
            nitro({
              preset:
                process.env.NITRO_PRESET ??
                (process.env.VERCEL ? "vercel" : "cloudflare-module"),
            }),
          ]
        : []),
      viteReact(),
    ],
  };
});
