/** @type {import('tailwindcss').Config} */
module.exports = {
  // The class names are written in the Leptos view!{} macros in src/**/*.rs,
  // so Tailwind must scan Rust source, not just HTML/JSX.
  content: [
    "./src/**/*.rs",
  ],
  theme: {
    extend: {
      // The site's default typeface is serif: Tailwind's preflight applies
      // the `sans` stack to `:host, html`, so overriding it with a serif
      // stack switches the whole page. Must match the `body` rule in
      // style/main.scss (the cargo-leptos stylesheet).
      fontFamily: {
        sans: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};
