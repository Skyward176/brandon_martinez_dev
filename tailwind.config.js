/** @type {import('tailwindcss').Config} */
module.exports = {
  // The class names are written in the Leptos view!{} macros in src/**/*.rs,
  // so Tailwind must scan Rust source, not just HTML/JSX.
  content: ["./src/**/*.rs"],
  theme: {
    extend: {},
  },
  plugins: [],
};
