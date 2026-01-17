/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // The "Field Ledger" Palette
        ledger: {
          bg: "#f8fafc",      // Slate-50 (Paper White)
          surface: "#ffffff", // White (Cards)
          ink: "#0f172a",     // Slate-900 (High Contrast Text)
          muted: "#64748b",   // Slate-500 (Labels/Secondary)
          action: "#2563eb",  // Blue-600 (Primary Action)
          success: "#16a34a", // Green-600 (Money)
          danger: "#ef4444",  // Red-500 (Delete/Stop)
        },
      },
    },
  },
  plugins: [],
};
