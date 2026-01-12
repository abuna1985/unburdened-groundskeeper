/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // The "Safety" Palette (ADR 001 - Section 3)
        industrial: {
          bg: "#000000", // Absolute Black (OLED efficient)
          surface: "#18181b", // Zinc-900 (Visual depth for cards)
          text: "#f4f4f5", // High-Vis White
          muted: "#71717a", // Zinc-500 (Secondary info)
          action: "#fbbf24", // Safety Yellow
          danger: "#ef4444", // Stop/Delete Red
        },
      },
    },
  },
  plugins: [],
};
