/** @type {import('tailwindcss').Config} */
module.exports = {
  // The class names are written in the Leptos view!{} macros in src/**/*.rs,
  // so Tailwind must scan Rust source, not just HTML/JSX.
  content: ["./src/**/*.rs"],
  // Use the 'class' strategy: look for .dark on the root element (set by
  // leptos_use via classList.toggle("dark", ...)).  The default 'media'
  // strategy wraps everything in @media (prefers-color-scheme: dark) which
  // ignores the DOM class entirely.
  darkMode: "class",
  // Leptos view!{} macros embed class strings inside Rust code that the
  // Tailwind CLI scanner does not parse.  Explicitly safelist everything
  // the homepage and navbar use so the build-time pipeline picks them up.
  safelist: [
    // Layout
    "min-h-screen", "flex", "flex-col", "flex-row", "flex-wrap",
    "flex-1", "mx-auto", "w-full", "min-w-0",
    "items-center", "justify-between",
    "gap-2", "gap-3", "gap-4", "gap-5", "gap-6",
    "space-y-4",
    // Spacing
    "mx-auto", "px-4", "px-3", "px-1",
    "py-8", "py-1", "py-1.5",
    "mb-4", "mt-1",
    // Typography
    "text-3xl", "text-lg", "text-sm", "text-base", "text-xs",
    "font-bold", "font-semibold", "font-medium",
    "tracking-wide", "tracking-wider", "uppercase",
    "leading-tight",
    // Sizing
    "h-14",
    // Colors — base (zinc palette)
    "bg-white", "bg-zinc-100", "bg-zinc-200", "bg-zinc-800", "bg-zinc-900",
    "text-zinc-900", "text-zinc-700", "text-zinc-600", "text-zinc-500",
    "text-zinc-400", "text-zinc-300", "text-zinc-100",
    "border-zinc-200", "border-zinc-900",
    // Borders & rounding
    "border-b", "rounded",
    // Effects & transitions
    "hover:bg-zinc-200", "hover:bg-zinc-700",
    "hover:underline", "underline-offset-4",
    "transition-colors",
    // Responsive
    "sm:gap-5", "sm:text-base",
    // Dark mode variants (these are the ones that were silently dropped)
    "dark:bg-white", "dark:bg-zinc-900", "dark:bg-zinc-800",
    "dark:text-zinc-900", "dark:text-zinc-100", "dark:text-zinc-400",
    "dark:text-zinc-300", "dark:border-zinc-900",
    "dark:hover:bg-zinc-100", "dark:hover:bg-zinc-700",
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
  plugins: [],
};
