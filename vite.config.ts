import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";

// The site origin is fixed at build time. Preview deploys self-reference the workers.dev
// host so canonicals and sitemap URLs name the host that actually serves them; the cutover
// build sets SITE_URL=https://dwaiconsulting.com and nothing else changes.
const SITE_URL = (process.env.SITE_URL ?? "https://dwaiconsulting.com").replace(/\/$/, "");

export default defineConfig({
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  plugins: [
    vinext({
      cache: { cdn: staticAssetsAdapter() },
      prerender: { routes: "*" },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
