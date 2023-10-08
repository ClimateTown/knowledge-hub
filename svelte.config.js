import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"

// Adapted from [Stack overflow](https://stackoverflow.com/questions/72730192/how-to-host-a-sveltekit-adapter-static-project-on-github-pages)
// and [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#github-pages)
const dev = process.argv.includes("dev")

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
    }),
    alias: { "lib/": "./src/lib/" },
    prerender: {
      entries: ["*"],
    },
    paths: {
      base: dev ? "" : "/knowledge-hub",
    },
  },
}

export default config
