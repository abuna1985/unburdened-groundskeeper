/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // The "Safety" Palette (ADR 001 - Section 3)
        industrial: {
          bg: "#09090b", // Zinc-950 (Pitch Black)
          surface: "#18181b", // Zinc-900 (Panel Grey)
          text: "#f4f4f5", // Zinc-100 (High-Vis White)
          muted: "#a1a1aa", // Zinc-400 (Secondary Text)
          action: "#fbbf24", // Amber-400 (Safety Yellow)
          danger: "#ef4444", // Red-500 (Delete/Stop)
        },
      },
    },
  },
  plugins: [],
};

