/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#0E7C7B",
        "blue-secondary": "#0B6362",
        "blue-tertiary": "rgba(14, 124, 123, 0.3)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
