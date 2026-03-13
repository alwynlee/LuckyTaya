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
        teal: "#0B704E",
        orange: "#E53C0E",
        red: "#CC0B1A",
        yellow: "#FFE100",
        offwhite: "#FEFAF5",
        dark: "#02110A",
        gold: "#AF5700",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
