import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";

// https://astro.build/config
export default defineConfig({
  site: "https://devopen.io",
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    icon(),
    sitemap(),
    react(),
    simpleStackForm(),
  ],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
