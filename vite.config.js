import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ["**/*.{test,spec}.{js,ts}"],
  },
}

export default config
