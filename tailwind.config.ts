import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal:     "#0B704E",
        orange:   "#E53C0E",
        red:      "#CC0B1A",
        yellow:   "#FFE100",
        offwhite: "#FEFAF5",
        dark:     "#02110A",
        gold:     "#AF5700",
        muted:    "#52443A",
        surface:  "#F4F0E8",
        stroke:   "#E8E0D4",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
